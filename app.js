console.info("COL_ENG App Version: 20251231.4");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  projectId: "engdb-11b7f",
  appId: "1:221994477836:web:2344c5b5230a266dd4c129",
  storageBucket: "engdb-11b7f.firebasestorage.app",
  apiKey: "AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M",
  authDomain: "engdb-11b7f.firebaseapp.com",
  messagingSenderId: "221994477836",
  measurementId: "G-QCHLDW446Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expressionsRef = collection(db, "EnglishExpressions");

// Cache Configuration
const CACHE_KEY = "col_eng_expressions";
const CACHE_DATE_KEY = "col_eng_last_fetch_date";



const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const loadingState = document.getElementById("loadingState");
const initialState = document.getElementById("initialState");
const noResultsState = document.getElementById("noResultsState");
const resultCount = document.getElementById("resultCount");
const statsDisplay = document.getElementById("statsDisplay");
const dailyExpressionContainer = document.getElementById(
  "dailyExpressionContainer"
);
const initialStateMessage = document.getElementById("initialStateMessage");
const errorState = document.getElementById("errorState");

let expressions = [];
let dailyExpression = null;
let debounceTimer;

// Fetch expressions with caching
async function fetchAllExpressions(forceUpdate = false) {
  try {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);

    if (!forceUpdate && cachedData && cachedDate === today) {
      expressions = JSON.parse(cachedData);
      console.log(`Loaded ${expressions.length} expressions from cache (Date: ${cachedDate}).`);
    } else {
      if (forceUpdate) {
        console.log("Forced update triggered. Fetching fresh data from Firestore...");
        renderLoading(true);
      } else {
        console.log("Cache expired or missing. Fetching from Firestore...");
      }

      const q = query(expressionsRef, orderBy("primary", "asc"));
      const querySnapshot = await getDocs(q);
      
      expressions = [];
      querySnapshot.forEach((doc) => {
        expressions.push({ id: doc.id, ...doc.data() });
      });

      if (expressions.length > 0) {
        // Update cache
        localStorage.setItem(CACHE_KEY, JSON.stringify(expressions));
        localStorage.setItem(CACHE_DATE_KEY, today);
        console.log(`Fetched and cached ${expressions.length} expressions.`);
      }
    }

    // Always pick a random expression from the available list
    if (expressions.length > 0) {
      dailyExpression = expressions[Math.floor(Math.random() * expressions.length)];
    }


    if (expressions.length === 0) {
      console.warn("No expressions found.");
    }

    renderEmptyState();
  } catch (error) {
    console.error("Error fetching expressions:", error);
    renderErrorState(error);
  } finally {
    if (forceUpdate) renderLoading(false);
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
  }
}

// Search function
function performSearch(searchTerm) {
  if (searchTerm.toLowerCase() === "forcedownload") {
    console.log("Forced download command detected.");
    searchInput.value = ""; // Clear input
    fetchAllExpressions(true); // Trigger forced update
    return;
  }

  if (searchTerm === "*") {
    console.log("Wildcard search triggered");
    renderResults(expressions);
    return;
  }

  if (!searchTerm || searchTerm.length < 2) {
    renderEmptyState();
    return;
  }

  renderLoading(true);

  try {
    const lowerSearch = searchTerm.toLowerCase();

    // Filter logic: Search in 'primary', 'meaning', 'similar' (synonyms), and 'example'
    const results = expressions.filter((item) => {
      const inPrimary = item.primary?.toLowerCase().includes(lowerSearch);
      const inMeaning = item.meaning?.toLowerCase().includes(lowerSearch);
      const inSimilar = item.similar?.some((s) =>
        s.toLowerCase().includes(lowerSearch)
      );
      const inExample = item.example?.toLowerCase().includes(lowerSearch);

      return inPrimary || inMeaning || inSimilar || inExample;
    });

    renderResults(results);
  } catch (error) {
    console.error("Search error:", error);
  } finally {
    renderLoading(false);
  }
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

  resultsContainer.innerHTML = results
    .map(
      (item) => `
        <article class="expression-card">
            <div class="card-header">
                <h3 class="text">${item.primary}</h3>
                ${
                  item.meaning
                    ? `<span class="meaning">${item.meaning}</span>`
                    : ""
                }
            </div>
            ${
              item.similar && Array.isArray(item.similar)
                ? `
                <div class="synonyms-list">
                    ${item.similar
                      .map((syn) => `<span class="synonym-tag">${syn}</span>`)
                      .join("")}
                </div>
            `
                : ""
            }
            ${
              item.example
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
        </article>
    `
    )
    .join("");
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

function renderLoading(isLoading) {
  if (isLoading) {
    loadingState.classList.remove("hidden");
    initialState.classList.add("hidden");
    noResultsState.classList.add("hidden");
    resultCount.classList.add("hidden");
    resultsContainer.innerHTML = "";
  } else {
    loadingState.classList.add("hidden");
  }
}

function renderEmptyState() {
  resultsContainer.innerHTML = "";
  resultsContainer.classList.add("hidden"); // Hide container to remove gap
  loadingState.classList.add("hidden");
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
          <article class="expression-card">
              <div class="card-header">
                  <h3 class="text">${dailyExpression.primary}</h3>
                  <span class="meaning">${dailyExpression.meaning}</span>
              </div>
              ${
                dailyExpression.similar &&
                Array.isArray(dailyExpression.similar)
                  ? `
                  <div class="synonyms-list">
                      ${dailyExpression.similar
                        .map((syn) => `<span class="synonym-tag">${syn}</span>`)
                        .join("")}
                  </div>
              `
                  : ""
              }
              ${
                dailyExpression.example
                  ? `
                  <div class="example-box">
                      <span class="example-label">Example Usage</span>
                      <p class="example-text">${highlightKeywords(
                        dailyExpression.example,
                        [
                          dailyExpression.primary,
                          ...(dailyExpression.similar || []),
                        ]
                      )}</p>
                  </div>
              `
                  : ""
              }
          </article>
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

  // Map to only include requested fields: primary, meaning, similar, example
  const exportData = expressions.map(({ primary, meaning, similar, example }) => ({
    primary,
    meaning,
    similar,
    example
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
