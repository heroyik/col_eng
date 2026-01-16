const APP_VERSION = "2026.01.13.1";
console.info(`COL_ENG Intake App Version: ${APP_VERSION}`);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  projectId: "engdb-11b7f",
  appId: "1:221994477836:web:2344c5b5230a266dd4c129",
  storageBucket: "engdb-11b7f.firebasestorage.app",
  apiKey: "AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M",
  authDomain: "engdb-11b7f.firebaseapp.com",
  messagingSenderId: "221994477836",
  measurementId: "G-QCHLDW446Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expressionsRef = collection(db, "EnglishExpressions");
const auth = getAuth(app);

const primaryInput = document.getElementById("primaryInput");
const checkBtn = document.getElementById("checkBtn");
const generateBtn = document.getElementById("generateBtn");
const modelInput = document.getElementById("modelInput");
const temperatureInput = document.getElementById("temperatureInput");
const statusBox = document.getElementById("statusBox");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const matchMessage = document.getElementById("matchMessage");
const jsonOutput = document.getElementById("jsonOutput");
const validateBtn = document.getElementById("validateBtn");
const saveBtn = document.getElementById("saveBtn");
const saveMessage = document.getElementById("saveMessage");
const apiKeyStatus = document.getElementById("apiKeyStatus");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");
const authStatus = document.getElementById("authStatus");

const ESTIMATED_TOTAL = 40000;
const BATCH_SIZE = 500;
const ADMIN_EMAIL = "heroyik@gmail.com";
const CONFIG_KEY = "COL_ENG_CONFIG";
const STORAGE_KEY = "GEMINI_API_KEY";

let API_KEY = window[CONFIG_KEY]?.GEMINI_API_KEY || localStorage.getItem(STORAGE_KEY) || "";

const state = {
  primaries: [],
  primariesLoaded: false,
  primariesPromise: null,
};

let isAuthorized = false;

function updateApiKeyStatus() {
  if (!apiKeyStatus) return;
  if (window[CONFIG_KEY]?.GEMINI_API_KEY) {
    apiKeyStatus.textContent = "API key loaded from GitHub Secrets.";
    apiKeyStatus.className = "hint success";
  } else if (localStorage.getItem(STORAGE_KEY)) {
    apiKeyStatus.textContent = "API key loaded from developer storage.";
    apiKeyStatus.className = "hint success";
  } else {
    apiKeyStatus.textContent = "";
    apiKeyStatus.className = "hint";
  }
}

updateApiKeyStatus();

function setStatusMessage(el, message, type) {
  el.textContent = message;
  el.classList.remove("success", "error", "warning");
  if (type) {
    el.classList.add(type);
  }
}

function setUiEnabled(enabled) {
  const controls = [
    primaryInput,
    checkBtn,
    generateBtn,
    modelInput,
    temperatureInput,
    jsonOutput,
    validateBtn,
    saveBtn,
  ];
  controls.forEach((el) => {
    if (!el) {
      return;
    }
    if (el === generateBtn || el === saveBtn) {
      el.disabled = !enabled || el.disabled;
      return;
    }
    el.disabled = !enabled;
  });
}

function updateAuthUi(user) {
  if (!user) {
    isAuthorized = false;
    setStatusMessage(authStatus, "Please sign in to continue.", "warning");
    signInBtn.disabled = false;
    signOutBtn.disabled = true;
    setUiEnabled(false);
    return;
  }

  if (user.email !== ADMIN_EMAIL) {
    isAuthorized = false;
    setStatusMessage(
      authStatus,
      "Access denied. Use heroyik@gmail.com.",
      "error"
    );
    signInBtn.disabled = true;
    signOutBtn.disabled = false;
    setUiEnabled(false);
    return;
  }

  isAuthorized = true;
  setStatusMessage(authStatus, `Signed in as ${user.email}.`, "success");
  signInBtn.disabled = true;
  signOutBtn.disabled = false;
  setUiEnabled(true);
}

async function handleSignIn() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    setStatusMessage(authStatus, "Google sign-in failed.", "error");
  }
}

async function handleSignOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
    setStatusMessage(authStatus, "Sign-out failed.", "error");
  }
}

function clearStatusBox() {
  statusBox.innerHTML = "";
}

function appendStatusLine(message) {
  const line = document.createElement("div");
  line.className = "status-line";
  line.textContent = message;
  statusBox.appendChild(line);
  statusBox.scrollTop = statusBox.scrollHeight;
}

function setProgress(loaded, total, done = false) {
  const safeTotal = total || ESTIMATED_TOTAL;
  const ratio = safeTotal > 0 ? Math.min(loaded / safeTotal, 1) : 0;
  const percent = done ? 100 : Math.min(95, Math.round(ratio * 100));
  progressBar.style.width = `${percent}%`;
  if (loaded > 0) {
    progressText.textContent = `Loaded ${loaded} primary expressions...`;
  } else {
    progressText.textContent = "";
  }
  if (done) {
    progressText.textContent = `Loaded ${loaded} primary expressions.`;
  }
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  if (a === b) {
    return 0;
  }
  const alen = a.length;
  const blen = b.length;
  if (alen === 0 || blen === 0) {
    return Math.max(alen, blen);
  }
  const v0 = new Array(blen + 1);
  const v1 = new Array(blen + 1);
  for (let i = 0; i <= blen; i += 1) {
    v0[i] = i;
  }
  for (let i = 0; i < alen; i += 1) {
    v1[0] = i + 1;
    for (let j = 0; j < blen; j += 1) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= blen; j += 1) {
      v0[j] = v1[j];
    }
  }
  return v0[blen];
}

function isFuzzySimilar(a, b) {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 6 || Math.abs(a.length - b.length) > 10) {
    return false;
  }
  const distance = levenshtein(a, b);
  const score = 1 - distance / maxLen;
  return score >= 0.84;
}

async function loadPrimaries() {
  if (state.primariesLoaded) {
    return state.primaries;
  }
  if (state.primariesPromise) {
    return state.primariesPromise;
  }
  clearStatusBox();
  appendStatusLine("Loading primary expressions from Firestore...");
  setProgress(0, ESTIMATED_TOTAL);

  state.primariesPromise = (async () => {
    let lastDoc = null;
    let loaded = 0;

    while (true) {
      const baseQuery = lastDoc
        ? query(
            expressionsRef,
            orderBy("id", "asc"),
            startAfter(lastDoc),
            limit(BATCH_SIZE)
          )
        : query(expressionsRef, orderBy("id", "asc"), limit(BATCH_SIZE));

      const snapshot = await getDocs(baseQuery);
      if (snapshot.empty) {
        break;
      }

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        if (data && typeof data.primary === "string") {
          state.primaries.push({
            raw: data.primary,
            normalized: normalizeText(data.primary),
          });
        }
      });

      loaded += snapshot.size;
      lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setProgress(loaded, ESTIMATED_TOTAL);

      if (snapshot.size < BATCH_SIZE) {
        break;
      }
    }

    setProgress(loaded, ESTIMATED_TOTAL, true);
    appendStatusLine(`Primary expressions loaded: ${loaded}`);
    state.primariesLoaded = true;
    return state.primaries;
  })();

  return state.primariesPromise;
}

function findSimilarMatch(input) {
  const normalizedInput = normalizeText(input);
  if (!normalizedInput) {
    return null;
  }
  for (const item of state.primaries) {
    if (!item.normalized) {
      continue;
    }
    if (
      item.normalized.includes(normalizedInput) ||
      normalizedInput.includes(item.normalized) ||
      isFuzzySimilar(normalizedInput, item.normalized)
    ) {
      return item.raw;
    }
  }
  return null;
}

function extractResponseText(data) {
  if (!data || !Array.isArray(data.candidates) || data.candidates.length === 0) {
    return "";
  }
  const candidate = data.candidates[0];
  if (
    !candidate ||
    !candidate.content ||
    !Array.isArray(candidate.content.parts)
  ) {
    return "";
  }
  const textPart = candidate.content.parts.find(
    (part) => typeof part.text === "string"
  );
  return textPart ? textPart.text : "";
}

function extractJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || start >= end) {
    throw new Error("No JSON object found in response.");
  }
  return text.slice(start, end + 1);
}

function parseJsonPayload(rawText) {
  const jsonText = extractJson(rawText);
  return JSON.parse(jsonText);
}

function validatePayload(payload, primary) {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    errors.push("JSON must be an object.");
    return errors;
  }
  if (payload.primary !== primary) {
    errors.push("primary must match the input expression exactly.");
  }
  if (!payload.meaning || typeof payload.meaning !== "string") {
    errors.push("meaning must be a string.");
  }
  if (!Array.isArray(payload.similar) || payload.similar.length !== 5) {
    errors.push("similar must be an array with 5 items.");
  }
  if (!payload.example || typeof payload.example !== "string") {
    errors.push("example must be a string with 6 lines.");
  } else {
    const lines = payload.example.split("\n").filter((line) => line.trim());
    const validLines =
      lines.length === 6 && lines.every((line) => /^(A:|B:)/.test(line));
    if (!validLines) {
      errors.push("example must have 6 lines starting with A: or B:.");
    }
  }
  if (!payload.japanese || typeof payload.japanese !== "string") {
    errors.push(
      "japanese must be a string with 2 expressions separated by ' / '."
    );
  }
  if (!payload.chinese || typeof payload.chinese !== "string") {
    errors.push(
      "chinese must be a string with 2 expressions separated by ' / '."
    );
  }
  if (!payload.spanish || typeof payload.spanish !== "string") {
    errors.push(
      "spanish must be a string with 2 expressions separated by ' / '."
    );
  }
  if (!payload.vietnamese || typeof payload.vietnamese !== "string") {
    errors.push(
      "vietnamese must be a string with 3 expressions separated by ' / '."
    );
  }

  const slashCheck = [
    { field: "japanese", count: 2 },
    { field: "chinese", count: 2 },
    { field: "spanish", count: 2 },
    { field: "vietnamese", count: 3 },
  ];

  slashCheck.forEach(({ field, count }) => {
    if (payload[field] && typeof payload[field] === "string") {
      const parts = payload[field].split(" / ");
      if (parts.length !== count) {
        errors.push(
          `${field} must contain ${count} expressions separated by ' / '.`
        );
      }
    }
  });

  return errors;
}

function buildGenerationPrompt(primary) {
  return `Generate a JSON object for the expression below. Output JSON only (no markdown).\n\nPrimary: "${primary}"\n\nRules:\n- primary must equal the input exactly.\n- meaning: colloquial Korean translation.\n- similar: 5 NYC colloquial expressions (Opic AL level).\n- example: 6 lines dialogue using A: and B: prefixes, casual NYC tone.\n- japanese: 2 colloquial expressions (Opic AL level), separated by " / ".\n- chinese: 2 colloquial expressions (HSK4), include pinyin in parentheses, separated by " / ".\n- spanish: 2 colloquial expressions for a learner who studied present, present perfect, future, simple past, past perfect, imperfect; separated by " / ".\n- vietnamese: 3 colloquial expressions (Opic IM2 level), separated by " / ".\n- Do a final self-check that all fields directly relate to the primary expression before output.`;
}

function buildReviewPrompt(primary, jsonText) {
  return `Review the JSON for the primary expression below. Fix any field that does not match the meaning or intent of the primary. Return JSON only.\n\nPrimary: "${primary}"\n\nJSON:\n${jsonText}`;
}

async function callGemini({ apiKey, model, temperature, prompt }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature,
        maxOutputTokens: 900,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const text = extractResponseText(data);
  if (!text) {
    throw new Error("Gemini response was empty.");
  }
  return text;
}

async function handleCheck() {
  if (!isAuthorized) {
    setStatusMessage(
      matchMessage,
      "Please sign in with the admin account first.",
      "warning"
    );
    return;
  }
  const primary = primaryInput.value.trim();
  setStatusMessage(matchMessage, "", "");
  setStatusMessage(saveMessage, "", "");
  jsonOutput.value = "";
  saveBtn.disabled = true;
  generateBtn.disabled = true;

  if (!primary) {
    setStatusMessage(
      matchMessage,
      "Please enter a primary expression.",
      "warning"
    );
    return;
  }

  try {
    await loadPrimaries();
    const match = findSimilarMatch(primary);
    if (match) {
      setStatusMessage(
        matchMessage,
        `A similar expression already exists: "${match}"`,
        "warning"
      );
      return;
    }
    setStatusMessage(
      matchMessage,
      "No similar expression found. You can generate JSON now.",
      "success"
    );
    generateBtn.disabled = false;
  } catch (error) {
    console.error(error);
    setStatusMessage(matchMessage, "Failed to load Firestore data.", "error");
    appendStatusLine(`Error: ${error.message}`);
  }
}

async function handleGenerate() {
  if (!isAuthorized) {
    setStatusMessage(
      matchMessage,
      "Please sign in with the admin account first.",
      "warning"
    );
    return;
  }
  const primary = primaryInput.value.trim();
  const apiKey = window[CONFIG_KEY]?.GEMINI_API_KEY || localStorage.getItem(STORAGE_KEY) || "";
  const model = modelInput.value;
  const temperature = Number(temperatureInput.value);

  setStatusMessage(saveMessage, "", "");

  if (!primary) {
    setStatusMessage(
      matchMessage,
      "Please enter a primary expression.",
      "warning"
    );
    return;
  }
  if (!apiKey) {
    setStatusMessage(
      matchMessage,
      "Google AI Studio API key is missing. For local testing, set GEMINI_API_KEY in config.js or localStorage.",
      "warning"
    );
    return;
  }
  if (!model) {
    setStatusMessage(matchMessage, "Model is required.", "warning");
    return;
  }

  try {
    await loadPrimaries();
    const match = findSimilarMatch(primary);
    if (match) {
      setStatusMessage(
        matchMessage,
        `A similar expression already exists: "${match}"`,
        "warning"
      );
      return;
    }

    generateBtn.disabled = true;
    appendStatusLine("Generating JSON with Gemini...");

    const prompt = buildGenerationPrompt(primary);
    const rawText = await callGemini({ apiKey, model, temperature, prompt });
    const payload = parseJsonPayload(rawText);

    const reviewPrompt = buildReviewPrompt(
      primary,
      JSON.stringify(payload, null, 2)
    );
    appendStatusLine("Running consistency review...");
    const reviewedText = await callGemini({
      apiKey,
      model,
      temperature: Math.max(0.2, temperature - 0.2),
      prompt: reviewPrompt,
    });

    const reviewedPayload = parseJsonPayload(reviewedText);
    jsonOutput.value = JSON.stringify(reviewedPayload, null, 2);

    const errors = validatePayload(reviewedPayload, primary);
    if (errors.length > 0) {
      setStatusMessage(
        matchMessage,
        `Generated JSON needs edits: ${errors.join(" ")}`,
        "warning"
      );
      saveBtn.disabled = true;
    } else {
      setStatusMessage(
        matchMessage,
        "Generation complete. JSON looks valid.",
        "success"
      );
      saveBtn.disabled = false;
    }
  } catch (error) {
    console.error(error);
    setStatusMessage(matchMessage, error.message, "error");
    appendStatusLine(`Error: ${error.message}`);
  } finally {
    generateBtn.disabled = false;
  }
}

function handleValidate() {
  if (!isAuthorized) {
    setStatusMessage(
      saveMessage,
      "Please sign in with the admin account first.",
      "warning"
    );
    return;
  }
  const primary = primaryInput.value.trim();
  if (!jsonOutput.value.trim()) {
    setStatusMessage(saveMessage, "JSON is empty.", "warning");
    return;
  }

  try {
    const payload = JSON.parse(jsonOutput.value);
    const errors = validatePayload(payload, primary);
    if (errors.length > 0) {
      setStatusMessage(
        saveMessage,
        `Validation issues: ${errors.join(" ")}`,
        "warning"
      );
      saveBtn.disabled = true;
      return;
    }
    setStatusMessage(saveMessage, "JSON validated successfully.", "success");
    saveBtn.disabled = false;
  } catch (error) {
    setStatusMessage(saveMessage, "JSON parsing failed.", "error");
    saveBtn.disabled = true;
  }
}

async function fetchNextId() {
  const q = query(expressionsRef, orderBy("id", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    return 1;
  }
  const data = snapshot.docs[0].data();
  const lastId = Number(data.id);
  if (Number.isNaN(lastId)) {
    return Date.now();
  }
  return lastId + 1;
}

async function handleSave() {
  if (!isAuthorized) {
    setStatusMessage(
      saveMessage,
      "Please sign in with the admin account first.",
      "warning"
    );
    return;
  }
  const primary = primaryInput.value.trim();
  if (!primary) {
    setStatusMessage(saveMessage, "Primary expression is required.", "warning");
    return;
  }

  try {
    const payload = JSON.parse(jsonOutput.value);
    const errors = validatePayload(payload, primary);
    if (errors.length > 0) {
      setStatusMessage(
        saveMessage,
        `Fix JSON before saving: ${errors.join(" ")}`,
        "warning"
      );
      saveBtn.disabled = true;
      return;
    }

    const nextId = await fetchNextId();
    const record = {
      id: nextId,
      primary: primary,
      meaning: payload.meaning,
      similar: payload.similar,
      example: payload.example,
      japanese: payload.japanese,
      chinese: payload.chinese,
      spanish: payload.spanish,
      vietnamese: payload.vietnamese,
    };

    await addDoc(expressionsRef, record);
    appendStatusLine(`Saved to Firestore with id ${nextId}.`);
    setStatusMessage(saveMessage, "Saved successfully.", "success");
    saveBtn.disabled = true;

    state.primaries.push({ raw: primary, normalized: normalizeText(primary) });
  } catch (error) {
    console.error(error);
    setStatusMessage(saveMessage, "Save failed.", "error");
    appendStatusLine(`Save error: ${error.message}`);
  }
}

checkBtn.addEventListener("click", handleCheck);
generateBtn.addEventListener("click", handleGenerate);
validateBtn.addEventListener("click", handleValidate);
saveBtn.addEventListener("click", handleSave);
signInBtn.addEventListener("click", handleSignIn);
signOutBtn.addEventListener("click", handleSignOut);

onAuthStateChanged(auth, (user) => {
  updateAuthUi(user);
});
