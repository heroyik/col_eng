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

const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("resultsContainer");
const loadingState = document.getElementById("loadingState");
const initialState = document.getElementById("initialState");
const noResultsState = document.getElementById("noResultsState");

let expressions = [];
let debounceTimer;

// Fetch expressions once on load
async function fetchAllExpressions() {
  try {
    const q = query(expressionsRef, orderBy("primary", "asc"));
    const querySnapshot = await getDocs(q);
    expressions = [];
    querySnapshot.forEach((doc) => {
      expressions.push({ id: doc.id, ...doc.data() });
    });
    console.log(`Loaded ${expressions.length} expressions.`);
  } catch (error) {
    console.error("Error fetching expressions:", error);
  }
}

// Search function
function performSearch(searchTerm) {
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
    noResultsState.classList.remove("hidden");
    return;
  }

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
    return text ? text.replace(/\n/g, "<br>") : "";

  // Sort keywords by length (longest first) to avoid partial matching issues
  const sortedKeywords = keywords
    .filter((k) => k && typeof k === "string")
    .sort((a, b) => b.length - a.length);

  // Escape regex special characters
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  let processedText = text.replace(/\n/g, "<br>");

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
    resultsContainer.innerHTML = "";
  } else {
    loadingState.classList.add("hidden");
  }
}

function renderEmptyState() {
  resultsContainer.innerHTML = "";
  loadingState.classList.add("hidden");
  noResultsState.classList.add("hidden");
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

// Initial Fetch
fetchAllExpressions();
