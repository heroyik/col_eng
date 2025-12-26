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
        const results = expressions.filter(item => {
            const inPrimary = item.primary?.toLowerCase().includes(lowerSearch);
            const inMeaning = item.meaning?.toLowerCase().includes(lowerSearch);
            const inSimilar = item.similar?.some(s => s.toLowerCase().includes(lowerSearch));
            const inExample = item.example?.toLowerCase().includes(lowerSearch);
            
            return inPrimary || inMeaning || inSimilar || inExample;
        });

        renderResults(results);
    } catch (error) {
        console.error("Search error:", error);
        resultsContainer.innerHTML = `<div class="empty-state"><p>Error processing search. Please try again.</p></div>`;
    } finally {
        renderLoading(false);
    }
}

function renderResults(results) {
    if (results.length === 0) {
        resultsContainer.innerHTML = `<div class="empty-state"><p>No matching expressions found. Try a different keyword!</p></div>`;
        return;
    }

    resultsContainer.innerHTML = results
        .map(
            (item) => `
        <article class="expression-card">
            <div class="card-header">
                <h3 class="text">${item.primary}</h3>
                ${item.meaning ? `<span class="meaning">${item.meaning}</span>` : ""}
            </div>
            ${item.similar && Array.isArray(item.similar) ? `
                <div class="synonyms-list">
                    ${item.similar.map((syn) => `<span class="synonym-tag">${syn}</span>`).join("")}
                </div>
            ` : ""}
            ${item.example ? `
                <div class="example-box">
                    <p class="example-text">${item.example.replace(/\n/g, '<br>')}</p>
                </div>
            ` : ""}
        </article>
    `
        )
        .join("");
}

function renderLoading(isLoading) {
    const loader = document.querySelector(".loading-state");
    const empty = document.querySelector(".empty-state");

    if (isLoading) {
        loader.classList.remove("hidden");
        if (empty) empty.classList.add("hidden");
        resultsContainer.querySelectorAll(".expression-card").forEach((el) => el.remove());
    } else {
        loader.classList.add("hidden");
    }
}

function renderEmptyState() {
    resultsContainer.innerHTML = `<div class="empty-state"><p>Type at least 2 characters to start searching!</p></div>`;
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
