const APP_VERSION = "20260117.08";
console.info(`COL_ENG App Version: ${APP_VERSION} (Firebase 11.10.0)`);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  getDocsFromCache,
  getDocsFromServer,
  query,
  orderBy,
  limit,
  where,
  terminate,
  clearIndexedDbPersistence,
  getCountFromServer
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = window.COL_ENG_CONFIG.FIREBASE_CONFIG;
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
const auth = getAuth(app);
const expressionsRef = collection(db, "expressions");

const CACHE_DATE_KEY = "col_eng_last_cache_date";
const VERSION_KEY = "col_eng_app_version";
const LOCAL_ID_KEY = "col_eng_last_id";
const COOLDOWN_KEY = "col_eng_quota_cooldown";

let expressions = [];
let dailyExpression = null;
let debounceTimer;

// DOM Elements
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer"); // Fixed ID
const loadingState = document.getElementById("loadingState");
const loadingMessage = document.getElementById("loadingMessage");
const errorState = document.getElementById("errorState");
const noResultsState = document.getElementById("noResultsState");
const initialState = document.getElementById("initialState");
const resultCount = document.getElementById("resultCount");
const dailyExpressionContainer = document.getElementById("dailyExpressionContainer"); // Fixed ID
const initialStateMessage = document.getElementById("initialStateMessage");
const statsDisplay = document.getElementById("statsDisplay");
const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

// Fetch expressions with persistence and delta-sync logic
async function fetchAllExpressions(forceUpdate = false) {
  try {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    const cachedVersion = localStorage.getItem(VERSION_KEY);

    // 0. Version Check: If app version changed, clear EVERYTHING
    if (cachedVersion !== APP_VERSION) {
      console.warn("App version mismatch. Performing aggressive universal reset...");

      // Clear all possible Storage metadata
      localStorage.removeItem(CACHE_DATE_KEY);
      localStorage.removeItem(LOCAL_ID_KEY);
      localStorage.setItem(VERSION_KEY, APP_VERSION);

      // 1. Unregister any Service Workers (Aggressive)
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
          await registration.unregister();
          console.log("Service Worker unregistered.");
        }
      }

      // 2. Clear Cache Storage API (Aggressive)
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        for (const name of cacheNames) {
          await caches.delete(name);
          console.log(`CacheStorage [${name}] deleted.`);
        }
      }

      // 3. Clear Firestore's internal IndexedDB
      try {
        await terminate(db).catch(() => { });
        await clearIndexedDbPersistence(db);
        console.log("Firestore persistence cleared.");

        // Final Reload with cache-busting parameter
        window.location.href = window.location.pathname + "?v=" + Date.now();
        return;
      } catch (e) {
        console.error("Reset failed:", e);
      }
    }

    // 1. Initial Load: Load everything from local cache first (instant)
    if (expressions.length === 0) {
      console.log("Loading initial data from local cache...");
      const localQ = query(expressionsRef, orderBy("id", "asc"));
      const localSnapshot = await getDocsFromCache(localQ).catch(() => null);

      if (localSnapshot && !localSnapshot.empty) {
        expressions = [];
        localSnapshot.forEach(doc => {
          const data = doc.data();
          // Use docId for the Firestore document ID to avoid overwriting the numeric id
          expressions.push({ docId: doc.id, ...data });
        });
        console.log(`Loaded ${expressions.length} expressions from local cache.`);
      }
    }

    // 1.5. Static Bundle Fallback: If persistent cache is empty, load static JSON
    if (expressions.length === 0) {
      console.log("Cache empty. Attempting to load static initial_data.json...");
      try {
        const response = await fetch(`initial_data.json?t=${Date.now()}`);
        if (response.ok) {
          const jsonData = await response.json();
          if (Array.isArray(jsonData) && jsonData.length > 0) {
            expressions = jsonData.map(item => ({
              // Fallback docId, though delta sync uses numeric 'id'
              docId: item.docId || `static_${item.id}`,
              ...item
            }));
            console.log(`Loaded ${expressions.length} expressions from static bundle.`);

            // Allow UI to render immediately with this data
            updateProgress(expressions.length, expressions.length + 500); // Temporary estimated total
          }
        } else {
          console.warn("Static bundle request failed:", response.status);
        }
      } catch (e) {
        console.warn("Could not load initial_data.json:", e);
      }
    }

    // 2. Cooldown Check: If hit 429 recently, skip server check
    const cooldownUntil = localStorage.getItem(COOLDOWN_KEY);
    if (cooldownUntil && Date.now() < parseInt(cooldownUntil)) {
      const remainingMin = Math.ceil((parseInt(cooldownUntil) - Date.now()) / 60000);
      console.warn(`Sync is in cooldown due to previous quota limit. ${remainingMin}m remaining.`);
      renderEmptyState();
      return;
    }

    // 3. Decide if we need to sync with server
    if (!forceUpdate && expressions.length > 0 && cachedDate === today) {
      console.log("Database is up to date for today.");
    } else {
      if (forceUpdate) {
        console.log("Forced update triggered. Checking for new data...");
        renderLoading(true, "Checking for updates...");
      } else {
        console.log("Cache expired or missing. Syncing with Firestore...");
        renderLoading(true, "Syncing database...");
      }

      // 4. Determine if we need to sync (Robust check: Query for ANY ID > max local ID)
      let needsSync = false;
      let lastId = expressions.reduce((max, e) => {
        const numericId = Number(e.id);
        return isNaN(numericId) ? max : Math.max(max, numericId);
      }, 0);

      try {
          if (forceUpdate) console.log("Force update: ignoring count check, looking for new data...");
          
          // Check if there is anything newer than our last ID
          const checkQuery = query(
            expressionsRef, 
            where("id", ">", lastId), 
            limit(1)
          );
          
          // Use server check to guarantee freshness
          const checkSnapshot = await getDocsFromServer(checkQuery);
          if (!checkSnapshot.empty) {
             console.log(`Found new data (ID > ${lastId}). Triggering sync.`);
             needsSync = true;
          } else {
             console.log(`No new data found on server (nothing > ${lastId}).`);
          }
      } catch (e) {
          console.error("Failed to check for new data:", e);
      }

      if (needsSync) {
        // Fetch Server Total for Progress Bar only (optional, don't fail if it fails)
        let serverTotal = expressions.length; 
        try {
           const countSnap = await getCountFromServer(expressionsRef);
           serverTotal = countSnap.data().count;
           console.log(`Server Total Estimate: ${serverTotal}`);
        } catch(e) { console.warn("Could not get total count for progress bar", e); }
        
        // Use a heuristic for progress if serverTotal is smaller than local (delta-only server)
        const progressTotal = Math.max(serverTotal, expressions.length + 10); 
        updateProgress(expressions.length, progressTotal);

        // 5. Delta Fetch: Only download missing records
        const existingIds = new Set(expressions.map(e => e.id));
        console.log(`Fetching new records starting from ID > ${lastId}...`);
        console.time('SyncDuration');

        let fetchedCount = 0;
        let processedCount = expressions.length;
        const BATCH_SIZE = 500;

        while (true) {
            const q = query(
              expressionsRef,
              orderBy("id", "asc"),
              where("id", ">", lastId),
              limit(BATCH_SIZE)
            );

            const querySnapshot = await getDocsFromServer(q);
            if (querySnapshot.empty) break;

            let batchMaxId = lastId;
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              processedCount++;
              if (data.id > batchMaxId) batchMaxId = data.id;

              if (!existingIds.has(data.id)) {
                expressions.push({ docId: doc.id, ...data });
                existingIds.add(data.id);
                fetchedCount++;
              }
            });

            lastId = batchMaxId;
            updateProgress(Math.min(processedCount, progressTotal), progressTotal);
            console.log(`Synced batch: ${processedCount}/${progressTotal}... (Last ID: ${lastId})`);
        }

        console.timeEnd('SyncDuration');
        if (fetchedCount > 0) {
            console.log(`Delta sync complete. Fetched ${fetchedCount} new records.`);
            localStorage.setItem(CACHE_DATE_KEY, today);
        } else {
            console.log("No actual new records fetched after sync.");
        }
        updateProgress(progressTotal, progressTotal);
      } else {
         console.log("Database matches local state.");
         if (!forceUpdate) localStorage.setItem(CACHE_DATE_KEY, today);
         renderEmptyState();
      }
    }

    // Final UI updates
    if (expressions.length > 0) {
      dailyExpression = expressions[Math.floor(Math.random() * expressions.length)];
    }

    if (expressions.length === 0) {
      console.warn("No expressions found.");
    }

    renderEmptyState();
  } catch (error) {
    if (error.code === 'failed-precondition' || error.code === 'unavailable') {
      console.warn("Sync failed (offline or multiple tabs), showing local data only.");
      renderEmptyState();
    } else if (error.code === 'resource-exhausted') {
      console.error("Quota exceeded (429). Entering 2-hour cooldown...");
      const cooldownUntil = Date.now() + (2 * 60 * 60 * 1000);
      localStorage.setItem(COOLDOWN_KEY, cooldownUntil.toString());
      renderErrorState(error);
    } else {
      console.error("Error fetching expressions:", error);
      renderErrorState(error);
    }
  } finally {
    renderLoading(false);
  }
}

function updateProgress(current, total) {
  const percentage = Math.round((current / total) * 100);
  progressBar.style.width = `${percentage}%`;
  progressText.textContent = `${current} / ${total} expressions loaded (${percentage}%)`;

  if (current > 0) {
    progressContainer.classList.remove("hidden");
  }
}


function renderErrorState(error) {
  loadingState.classList.add("hidden");
  initialState.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  errorState.classList.remove("hidden");

  // Log specific error for debugging (visible in console)
  if (error.code === "unavailable") {
    console.error("Firestore offline or unreachable.");
  } else if (error.code === "permission-denied") {
    console.error("Firestore permission denied.");
  } else if (error.code === "resource-exhausted") {
    console.error("Firestore quota exceeded (429). Please wait for the daily reset.");
  } else {
    console.error("Detailed Error:", error);
  }
}

// Search function
function performSearch(searchTerm) {
  const lowerSearch = searchTerm.toLowerCase();

  if (lowerSearch === "forcedownload") {
    console.log("Forced download command detected.");
    searchInput.value = ""; // Clear input

    // Disable input while downloading
    searchInput.disabled = true;
    searchInput.placeholder = "Downloading data...";

    fetchAllExpressions(true).then(() => {
      // Re-enable input
      searchInput.disabled = false;

      if (expressions.length > 0) {
        // Show inline success message
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const hh = String(now.getHours()).padStart(2, '0');
        const min = String(now.getMinutes()).padStart(2, '0');
        const dateString = `${yyyy}${mm}${dd} ${hh}:${min}`;

        searchInput.value = `${dateString} Totally ${expressions.length} expressions downloaded!`;
        searchInput.classList.add("success-message");

        // Revert after 3 seconds or on focus
        const revertInput = () => {
          // Check if value matches our time-based pattern roughly or starts with date
          if (searchInput.value.includes("expressions downloaded!")) {
            searchInput.value = "";
          }
          searchInput.classList.remove("success-message");
          searchInput.placeholder = "Type '*' to view all saved expressions";
          searchInput.removeEventListener("focus", revertInput);
          searchInput.removeEventListener("input", revertInput);
        };

        setTimeout(revertInput, 4000);
        searchInput.addEventListener("focus", revertInput);
        searchInput.addEventListener("input", revertInput);

      } else {
        // Show inline empty message - reusing success style but maybe different text
        searchInput.value = "Download complete but no expressions found.";
        searchInput.classList.add("success-message"); // keep consistent style for system msg
        setTimeout(() => {
          searchInput.value = "";
          searchInput.classList.remove("success-message");
        }, 4000);
      }
    });
    return;
  }

  if (searchTerm === "*") {
    console.log("Wildcard search triggered");
    renderAllExpressionsWithProgress();
    return;
  }

  if (!searchTerm || searchTerm.length < 2) {
    renderEmptyState();
    return;
  }

  renderLoading(true);

  try {
    // Filter logic: Search in 'primary', 'meaning', 'similar', and 'example'
    const results = expressions.filter((item) => {
      const inPrimary = item.primary?.toLowerCase().includes(lowerSearch);
      const inMeaning = item.meaning?.toLowerCase().includes(lowerSearch);
      const inSimilar = item.similar?.some((s) =>
        s.toLowerCase().includes(lowerSearch)
      );
      const inExample = item.example?.toLowerCase().includes(lowerSearch);
      // Optional: Search in translations too? 
      // User didn't explicitly ask for search in translations, but it might be useful. 
      // Staying strict to requirement: "User did not ask for search update, only display."
      // So I will stick to existing search logic for now to avoid scope creep and I/O implications (though strictly local).

      return inPrimary || inMeaning || inSimilar || inExample;
    });

    renderResults(results);
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    renderLoading(false);
  }
}

function createExpressionCardHTML(item) {
  const translations = [
    { lang: 'Japanese', value: item.japanese },
    { lang: 'Chinese', value: item.chinese },
    { lang: 'Vietnamese', value: item.vietnamese },
    { lang: 'Spanish', value: item.spanish }
  ].filter(t => t.value); // Only show if translation exists

  const translationBlock = translations.length > 0
    ? `
      <div class="translation-container">
        ${translations.map(t => `
          <div class="translation-row">
            <span class="lang-label">${t.lang}</span>
            <span class="lang-text">${t.value}</span>
          </div>
        `).join('')}
      </div>
    `
    : '';

  return `
        <article class="expression-card">
            <div class="card-header">
                <h3 class="text">${item.primary}</h3>
                ${item.meaning
      ? `<span class="meaning">${item.meaning}</span>`
      : ""
    }
            </div>
            ${item.similar && Array.isArray(item.similar)
      ? `
                <div class="synonyms-list">
                    ${item.similar
        .map((syn) => `<span class="synonym-tag">${syn}</span>`)
        .join("")}
                </div>
            `
      : ""
    }
            ${item.example
      ? `
                <div class="example-box">
                    <span class="example-label">Example Usage</span>
                    <p class="example-text">${highlightKeywords(item.example, [
        item.primary,
        ...(item.similar || []),
      ])}</p>
                </div>
            `
      : ""
    }
            ${translationBlock}
        </article>
    `;
}

function renderResults(results) {
  resultsContainer.innerHTML = "";

  if (results.length === 0) {
    resultCount.classList.add("hidden");
    noResultsState.classList.remove("hidden");
    return;
  }

  const suffix = results.length === 1 ? "result" : "results";
  resultCount.textContent = `${results.length} ${suffix} found`;
  resultCount.classList.remove("hidden");
  resultsContainer.classList.remove("hidden"); // Show container when results exist

  noResultsState.classList.add("hidden");
  initialState.classList.add("hidden");

  resultsContainer.innerHTML = results.map(createExpressionCardHTML).join("");
}

function highlightKeywords(text, keywords) {
  if (!text || !keywords || keywords.length === 0)
    return text || "";

  // Sort keywords by length (longest first) to avoid partial matching issues
  const sortedKeywords = keywords
    .filter((k) => k && typeof k === "string")
    .sort((a, b) => b.length - a.length);

  // Escape regex special characters
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let processedText = text;

  // Create a single regex for all keywords
  const pattern = new RegExp(
    `(${sortedKeywords.map(escapeRegExp).join("|")})`,
    "gi"
  );

  return processedText.replace(pattern, '<span class="highlight">$1</span>');
}

function renderAllExpressionsWithProgress() {
  // 1. Reset UI State
  renderLoading(true, "Loading all expressions...");

  // Force display of progress elements immediately
  progressContainer.classList.remove("hidden");
  progressBar.style.width = "0%";
  progressText.textContent = `0 / ${expressions.length} loaded (0%)`;

  const total = expressions.length;
  // Decrease chunk size to ensure UI thread remains responsive (prevent freezing)
  const CHUNK_SIZE = 100;
  let processed = 0;

  // Use an array for performance (faster than repeated string concatenation)
  let accumulatedChunks = [];

  function processChunk() {
    const chunkEnd = Math.min(processed + CHUNK_SIZE, total);

    // Build HTML for this chunk
    for (let i = processed; i < chunkEnd; i++) {
      accumulatedChunks.push(createExpressionCardHTML(expressions[i]));
    }

    processed = chunkEnd;

    // Update Progress UI
    updateProgress(processed, total);

    if (processed < total) {
      // Use setTimeout(..., 0) to yield to the event loop, ensuring the browser has a chance to paint the progress bar update.
      // requestAnimationFrame can sometimes stack up if processing time varies.
      setTimeout(processChunk, 0);
    } else {
      // Rendering complete: Join all chunks and inject
      resultsContainer.innerHTML = accumulatedChunks.join("");

      const suffix = total === 1 ? "result" : "results";
      resultCount.textContent = `${total} ${suffix} found`;

      // Update UI states
      resultCount.classList.remove("hidden");
      resultsContainer.classList.remove("hidden");
      noResultsState.classList.add("hidden");
      initialState.classList.add("hidden");
      loadingState.classList.add("hidden");

      console.log("Finished rendering all expressions");
    }
  }

  // Start processing after a brief delay to allow the "Loading" UI to render first
  setTimeout(processChunk, 50);
}

function renderLoading(isLoading, message = "Searching the database...") {
  if (isLoading) {
    loadingMessage.textContent = message;
    loadingState.classList.remove("hidden");
    errorState.classList.add("hidden"); // Hide error if we start loading again
    initialState.classList.add("hidden");
    noResultsState.classList.add("hidden");
    resultCount.classList.add("hidden");
    resultsContainer.innerHTML = "";

    // Reset progress UI
    progressBar.style.width = "0%";
    progressText.textContent = "";
    progressContainer.classList.add("hidden");
  } else {
    loadingState.classList.add("hidden");
  }
}

function renderEmptyState() {
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("hidden"); // Hide container to remove gap
  loadingState.classList.add("hidden");
  errorState.classList.add("hidden"); // Hide error on success
  noResultsState.classList.add("hidden");

  if (expressions.length > 0) {
    const cacheDate = localStorage.getItem(CACHE_DATE_KEY);
    let displayDate = "";

    if (cacheDate) {
      // Convert YYYY-MM-DD to YYYY/MM/DD for display
      displayDate = cacheDate.replace(/-/g, "/");
    } else {
      const now = new Date();
      displayDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")}`;
    }

    statsDisplay.innerHTML = `
      <p class="stats-count">${expressions.length} expressions as of ${displayDate}</p>
      <a href="#" class="stats-link" id="downloadDataBtn">Feel free to download all expressions in json format</a>
    `;
    statsDisplay.classList.remove("hidden");

    // Add click listener for download
    document.getElementById("downloadDataBtn").addEventListener("click", (e) => {
      e.preventDefault();
      downloadCacheData();
    });

    console.log("Rendering Empty State. Daily Expression:", dailyExpression);


    if (dailyExpression) {
      initialStateMessage.classList.add("hidden");
      dailyExpressionContainer.innerHTML = `
        <div class="daily-expression-container">
          <h2 class="daily-header">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Expression of the Day
          </h2>
          ${createExpressionCardHTML(dailyExpression)}
        </div>
      `;
    }
  } else {
    statsDisplay.classList.add("hidden");
    initialStateMessage.classList.remove("hidden");
    dailyExpressionContainer.innerHTML = "";
  }

  // Ensure resultCount is hidden and empty
  resultCount.textContent = "";
  resultCount.classList.add("hidden");

  initialState.classList.remove("hidden");
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
  clearTimeout(debounceTimer);
  const searchTerm = e.target.value.trim();
  debounceTimer = setTimeout(() => {
    performSearch(searchTerm);
  }, 300);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    clearTimeout(debounceTimer);
    const searchTerm = e.target.value.trim();
    performSearch(searchTerm);
  }
});

// Download Functionality
function downloadCacheData() {
  if (!expressions || expressions.length === 0) {
    console.warn("No data available for download.");
    return;
  }

  const now = new Date();
  const dateStringForFile = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const filename = `${dateStringForFile}_COL_ENG_${expressions.length}.json`;
  console.log("Generating download:", filename);

  // Map to include requested fields: primary, meaning, similar, example AND translations
  const exportData = expressions.map(({ primary, meaning, similar, example, japanese, chinese, vietnamese, spanish }) => ({
    primary,
    meaning,
    similar,
    example,
    japanese,
    chinese,
    vietnamese,
    spanish
  }));

  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a); // Append to body for Safari support
  a.click();
  document.body.removeChild(a);

  setTimeout(() => URL.revokeObjectURL(url), 100);
}

// Initial Fetch
fetchAllExpressions();
window.hardReset = async function () {
  if (confirm("This will clear all local cache, service workers, and refresh everything. Proceed?")) {
    console.warn("Hard Reset triggered manually...");

    // Clear Meta
    localStorage.clear();
    sessionStorage.clear();

    // Clear SW & CacheStorage
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      for (let r of regs) await r.unregister();
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      for (let k of keys) await caches.delete(k);
    }

    // Clear Firestore
    try {
      await terminate(db).catch(() => { });
      await clearIndexedDbPersistence(db).catch(() => { });
    } catch (e) { }

    // Hard refresh
    window.location.href = window.location.pathname + "?full_reset=" + Date.now();
  }
};
