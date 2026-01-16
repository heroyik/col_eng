const APP_VERSION = "20260117.09";
console.info(`COL_ENG Intake App Version: ${APP_VERSION} (Firebase 11.10.0)`);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import {
  getVertexAI,
  getGenerativeModel,
  HarmCategory,
  HarmBlockThreshold,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-vertexai.js";

// Firebase configuration from env_config.js
const firebaseConfig = window.COL_ENG_CONFIG?.FIREBASE_CONFIG;
if (!firebaseConfig) {
  console.error("Firebase configuration missing! Make sure env_config.js is loaded.");
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const expressionsRef = collection(db, "EnglishExpressions");
const auth = getAuth(app);
const vertexAI = getVertexAI(app, { location: "global" });

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
// const STORAGE_KEY = "GEMINI_API_KEY"; // DEPRECATED

// function getApiKey() {
//   const windowKey = window[CONFIG_KEY]?.GEMINI_API_KEY;
//   const storageKey = localStorage.getItem(STORAGE_KEY);
//   console.log("API Key Trace:", { 
//     fromWindow: !!windowKey, 
//     fromStorage: !!storageKey,
//     searchKey: STORAGE_KEY 
//   });
//   return windowKey || storageKey || "";
// }
//
// let API_KEY = getApiKey();

const state = {
  primaries: [],
  primariesLoaded: false,
  primariesPromise: null,
};

let isAuthorized = false;

function updateApiKeyStatus() {
  if (!apiKeyStatus) return;
  // Legacy API Key check removed.
  // We now rely on Firebase Auth + Vertex AI SDK.
  
  if (isAuthorized) {
    apiKeyStatus.textContent = "Authorized for Vertex AI.";
    apiKeyStatus.className = "hint success";
  } else {
    apiKeyStatus.textContent = "Sign in required for generation.";
    apiKeyStatus.className = "hint warning";
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
  if (candidate.finishReason && candidate.finishReason !== "STOP") {
    console.warn("Gemini Finish Reason:", candidate.finishReason);
    if (candidate.safetyRatings) {
      console.warn("Safety Ratings:", candidate.safetyRatings);
    }
  }
  const textPart = candidate.content.parts.find(
    (part) => typeof part.text === "string"
  );
  const text = textPart ? textPart.text : "";
  console.log("Gemini Raw Text (truncated):", text.slice(0, 200) + (text.length > 200 ? "..." : ""));
  return text;
}

function extractJson(text) {
  if (!text) throw new Error("Received empty response from model.");
  const trimmed = text.trim();
  
  // Try to find the first '{' and last '}'
  const startIdx = trimmed.indexOf("{");
  const endIdx = trimmed.lastIndexOf("}");
  
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return trimmed.slice(startIdx, endIdx + 1);
  }
  
  // If no closing brace, but starts with one, try to close it (for preview resilience)
  if (startIdx !== -1 && endIdx === -1) {
    console.warn("Truncated JSON detected. Attempting to close it.");
    return trimmed.slice(startIdx) + '\n  "truncated": true\n}';
  }

  console.error("No JSON block found in text:", text);
  throw new Error("No JSON object found in response. Raw response: " + (text.slice(0, 100) || "empty"));
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
  if (!payload.example) {
    errors.push("example field is missing.");
  } else {
    let lines = [];
    if (Array.isArray(payload.example)) {
      lines = payload.example.map((l) => l.trim()).filter((l) => l);
    } else if (typeof payload.example === "string") {
      lines = payload.example.split("\n").map((l) => l.trim()).filter((l) => l);
    } else {
      errors.push("example must be a string or an array of strings.");
    }

    if (lines.length > 0) {
      const validLines =
        lines.length === 6 && lines.every((line) => /^(A:|B:)/.test(line));
      if (!validLines) {
        errors.push("example must have 6 lines starting with A: or B:.");
      }
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
  return `Generate a JSON object for the expression below. Output JSON only (no markdown).\n\nPrimary: "${primary}"\n\nRules:\n- primary must equal the input exactly.\n- meaning: colloquial Korean translation.\n- similar: 5 NYC colloquial expressions (Opic AL level).\n- example: 6 lines dialogue using A: and B: prefixes, casual NYC tone.\n- japanese: 2 colloquial expressions (Opic AL level), separated by " / ". If Kanji is used, MUST provide Yomigana in parentheses immediately following the Kanji (e.g., 脳(のう)みそが溶(と)ける).\n- chinese: 2 colloquial expressions (HSK4), include pinyin in parentheses, separated by " / ".\n- spanish: 2 colloquial expressions for a learner who studied present, present perfect, future, simple past, past perfect, imperfect; separated by " / ".\n- vietnamese: 3 colloquial expressions (Opic IM2 level), separated by " / ".\n- Do a final self-check that all fields directly relate to the primary expression before output.`;
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
        maxOutputTokens: 1500,
        response_mime_type: "application/json"
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

async function callVertexAI({ model, temperature, prompt }) {
  console.log("Calling Vertex AI for model:", model);
  const generativeModel = getGenerativeModel(vertexAI, { 
    model,
    generationConfig: {
      temperature,
      maxOutputTokens: 4096,
      response_mime_type: "application/json"
    },
    safetySettings: [
      { category: HarmCategory.HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ]
  });

  try {
    const result = await generativeModel.generateContent(prompt);
    const response = await result.response;
    
    // Log full response for debugging
    console.log("Vertex AI Debug Response:", response);
    
    const candidate = response.candidates && response.candidates[0];
    if (candidate) {
      console.log("Finish Reason:", candidate.finishReason);
    }
    
    if (!response.candidates || response.candidates.length === 0) {
      console.error("Vertex AI returned no candidates.");
      throw new Error("No candidates returned from model.");
    }

    const text = response.text();
    console.log("Vertex AI Raw Text Length:", text.length);
    return text;
  } catch (err) {
    console.error("Vertex AI Call Error:", err);
    throw err;
  }
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
  console.log("handleGenerate started");
  if (!isAuthorized) {
    console.warn("Not authorized");
    setStatusMessage(matchMessage, "Please sign in with the admin account first.", "warning");
    return;
  }
  const primary = primaryInput.value.trim();
  // const apiKey = getApiKey(); // REMOVED
  const model = modelInput.value;
  const temperature = Number(temperatureInput.value);

  console.log("Input parameters:", { primary, isAuthorized, model, temperature });
  setStatusMessage(saveMessage, "", "");

  if (!primary) {
    setStatusMessage(matchMessage, "Please enter a primary expression.", "warning");
    return;
  }
  
  // Checking model
  if (!model) {
    setStatusMessage(matchMessage, "Model is required.", "warning");
    return;
  }

  try {
    console.log("Loading primaries...");
    await loadPrimaries();
    const match = findSimilarMatch(primary);
    if (match) {
      console.log("Match found:", match);
      setStatusMessage(matchMessage, `A similar expression already exists: "${match}"`, "warning");
      return;
    }

    appendStatusLine(`Using ${model} (Vertex AI / Account: ${ADMIN_EMAIL})`);

    const prompt = buildGenerationPrompt(primary);
    let rawText;
    
    // Always use Vertex AI
    rawText = await callVertexAI({ model, temperature, prompt });
    
    console.log("Gemini raw response length:", rawText?.length);
    if (!rawText || rawText.length === 0) {
      throw new Error("Primary generation returned an empty response.");
    }
    const payload = parseJsonPayload(rawText);

    const reviewPrompt = buildReviewPrompt(primary, JSON.stringify(payload, null, 2));
    appendStatusLine("Running consistency review...");
    console.log("Calling Gemini for review...");
    
    let reviewRawText;
    try {
      // Always use Vertex AI
      reviewRawText = await callVertexAI({ 
        model, 
        temperature: Math.max(0.1, temperature - 0.2), 
        prompt: reviewPrompt 
      });
      console.log("Gemini review response length:", reviewRawText?.length);
    } catch (err) {
      console.warn("Consistency review failed:", err);
      appendStatusLine("Consistency review failed. Using initial result.");
      reviewRawText = ""; // Fallback
    }

    let reviewedPayload;
    if (reviewRawText && reviewRawText.length > 0) {
      reviewedPayload = parseJsonPayload(reviewRawText);
    } else {
      reviewedPayload = payload;
    }
    jsonOutput.value = JSON.stringify(reviewedPayload, null, 2);

    const errors = validatePayload(reviewedPayload, primary);
    if (errors.length > 0) {
      console.warn("Validation errors:", errors);
      setStatusMessage(
        matchMessage,
        `Generated JSON needs edits: ${errors.join(" ")}`,
        "warning"
      );
      saveBtn.disabled = true;
    } else {
      console.log("Generation and review successful");
      setStatusMessage(
        matchMessage,
        "Generation complete. JSON looks valid.",
        "success"
      );
      saveBtn.disabled = false;
    }
  } catch (error) {
    console.error("handleGenerate error:", error);
    setStatusMessage(matchMessage, `Error: ${error.message}`, "error");
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
  
  // Static bundle has 1483 records. We must continue from there.
  const MIN_START_ID = 1484;

  if (snapshot.empty) {
    return MIN_START_ID;
  }
  const data = snapshot.docs[0].data();
  const lastId = Number(data.id);
  
  if (Number.isNaN(lastId)) {
    return Date.now();
  }
  
  // Ensure we never generate an ID that overlaps with the static bundle
  return Math.max(lastId + 1, MIN_START_ID);
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

    const paddedId = String(nextId).padStart(4, "0");
    await setDoc(doc(expressionsRef, `expression_${paddedId}`), record);

    // Update Metadata for Sync
    await setDoc(doc(db, "SystemMetadata", "sync"), {
      totalCount: nextId,
      lastUpdatedAt: new Date().toISOString()
    });
    appendStatusLine("Updated SystemMetadata/sync to trigger client downloads.");

    appendStatusLine(`Saved to Firestore successfully with ID [expression_${paddedId}].`);
    appendStatusLine(`데이터 동기화가 필요합니다. 입력창에 'forcedownload'를 입력하거나 Antigravity에게 'sync'를 요청하세요.`);
    setStatusMessage(saveMessage, "Sync Required: Type 'forcedownload' to sync.", "success");
    saveBtn.disabled = true;

    state.primaries.push({ raw: primary, normalized: normalizeText(primary) });
  } catch (error) {
    console.error(error);
    setStatusMessage(saveMessage, "Save failed.", "error");
    appendStatusLine(`Save error: ${error.message}`);
  } finally {
    saveBtn.disabled = false;
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
