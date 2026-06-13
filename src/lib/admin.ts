import { getGenerativeModel, type AI } from "firebase/ai";
import {
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  type CollectionReference,
  type Firestore,
  type Query as FirestoreQuery,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { SYNC_CHANNEL_NAME } from "./sync";

export const ADMIN_EMAIL = "heroyik@gmail.com";
export const ESTIMATED_TOTAL = 40000;
export const ADMIN_BATCH_SIZE = 500;
export const MIN_START_ID = 1484;

export interface PrimaryRecord {
  raw: string;
  normalized: string;
}

export interface AdminPayload {
  primary: string;
  meaning: string;
  similar: string[];
  example: string | string[];
  japanese: string;
  chinese: string;
  spanish: string;
  vietnamese: string;
  [key: string]: unknown;
}

export interface SavedExpression {
  id: number;
  primary: string;
  meaning: string;
  similar: string[];
  example: string | string[];
  japanese: string;
  chinese: string;
  spanish: string;
  vietnamese: string;
}

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function findSimilarMatch(input: string, primaries: PrimaryRecord[]): string | null {
  const normalizedInput = normalizeText(input);
  if (!normalizedInput) return null;

  for (const item of primaries) {
    if (!item.normalized) continue;
    if (normalizedInput === item.normalized) return item.raw;
    if (isFuzzySimilar(normalizedInput, item.normalized)) return item.raw;
  }

  return null;
}

export async function loadPrimaries(
  expressionsRef: CollectionReference,
  onProgress?: (loaded: number, total: number, done?: boolean) => void
): Promise<PrimaryRecord[]> {
  const primaries: PrimaryRecord[] = [];
  let lastDoc: QueryDocumentSnapshot | null = null;
  let loaded = 0;

  while (true) {
    const baseQuery: FirestoreQuery = lastDoc
      ? query(expressionsRef, orderBy("id", "asc"), startAfter(lastDoc), limit(ADMIN_BATCH_SIZE))
      : query(expressionsRef, orderBy("id", "asc"), limit(ADMIN_BATCH_SIZE));

    const snapshot = await getDocs(baseQuery);
    if (snapshot.empty) break;

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && typeof data.primary === "string") {
        primaries.push({
          raw: data.primary,
          normalized: normalizeText(data.primary),
        });
      }
    });

    loaded += snapshot.size;
    lastDoc = snapshot.docs[snapshot.docs.length - 1] ?? null;
    onProgress?.(loaded, ESTIMATED_TOTAL);

    if (snapshot.size < ADMIN_BATCH_SIZE) break;
  }

  onProgress?.(loaded, ESTIMATED_TOTAL, true);
  return primaries;
}

export function parseJsonPayload(rawText: string): AdminPayload {
  return JSON.parse(extractJson(rawText)) as AdminPayload;
}

export function sanitizePayload(payload: AdminPayload): { payload: AdminPayload; fixes: string[] } {
  const fixes: string[] = [];

  if (Array.isArray(payload.similar)) {
    if (payload.similar.length > 5) {
      fixes.push(`similar: trimmed from ${payload.similar.length} to 5`);
      payload.similar = payload.similar.slice(0, 5);
    } else if (payload.similar.length < 5) {
      fixes.push(`similar: only ${payload.similar.length} items (need 5) - manual fix required`);
    }
  }

  if (typeof payload.example === "string") {
    const lines = payload.example.split("\n").map((line) => line.trim()).filter(Boolean);
    const validLines = lines.filter((line) => /^(A:|B:)/.test(line));
    if (validLines.length !== lines.length) {
      fixes.push(`example: removed ${lines.length - validLines.length} non-dialogue lines`);
    }
    if (validLines.length > 6) {
      fixes.push(`example: trimmed from ${validLines.length} to 6 lines`);
      validLines.length = 6;
    }
    if (validLines.length === 6) {
      payload.example = validLines.join("\n");
    } else if (validLines.length > 0) {
      fixes.push(`example: only ${validLines.length} dialogue lines (need 6) - manual fix required`);
    }
  }

  for (const field of ["japanese", "chinese", "spanish", "vietnamese"] as const) {
    if (typeof payload[field] !== "string" || !payload[field]) continue;

    let parts = payload[field].split(" / ").map((part) => part.trim()).filter(Boolean);
    if (parts.length <= 1) {
      parts = payload[field].split(/\s*\/\s*/).map((part) => part.trim()).filter(Boolean);
    }
    if (parts.length > 2) {
      fixes.push(`${field}: trimmed from ${parts.length} to 2 expressions`);
      parts = parts.slice(0, 2);
    }
    if (parts.length === 2) {
      payload[field] = parts.join(" / ");
    } else if (parts.length > 0) {
      fixes.push(`${field}: ${parts.length}/2 expressions - manual fix required`);
    }
  }

  return { payload, fixes };
}

export function validatePayload(payload: unknown, primary: string): string[] {
  const errors: string[] = [];
  if (!payload || typeof payload !== "object") {
    return ["JSON must be an object."];
  }

  const data = payload as Partial<AdminPayload>;
  if (data.primary !== primary) errors.push("primary must match the input expression exactly.");
  if (!data.meaning || typeof data.meaning !== "string") {
    errors.push("meaning must be a string.");
  } else if (!/[\uAC00-\uD7AF]/.test(data.meaning)) {
    errors.push("meaning must be in Korean (Hangul required).");
  } else if (/[a-zA-Z]{3,}/.test(data.meaning)) {
    errors.push("meaning must be Korean only - English words detected.");
  }
  if (!Array.isArray(data.similar) || data.similar.length !== 5) {
    errors.push("similar must be an array with 5 items.");
  }

  const example = data.example;
  if (!example) {
    errors.push("example field is missing.");
  } else {
    let lines: string[] = [];
    if (Array.isArray(example)) {
      lines = example.map((line) => String(line).trim()).filter(Boolean);
    } else if (typeof example === "string") {
      lines = example.split("\n").map((line) => line.trim()).filter(Boolean);
    } else {
      errors.push("example must be a string or an array of strings.");
    }
    if (lines.length > 0 && !(lines.length === 6 && lines.every((line) => /^(A:|B:)/.test(line)))) {
      errors.push("example must have 6 lines starting with A: or B:.");
    }
  }

  for (const field of ["japanese", "chinese", "spanish", "vietnamese"] as const) {
    const value = data[field];
    if (!value || typeof value !== "string") {
      errors.push(`${field} must be a string with 2 expressions separated by ' / '.`);
    } else if (value.split(" / ").length !== 2) {
      errors.push(`${field} must contain 2 expressions separated by ' / '.`);
    }
  }

  return errors;
}

export function buildGenerationPrompt(primary: string): string {
  return `Generate a JSON object for the expression below. Output JSON only (no markdown).\n\nPrimary: "${primary}"\n\nRules (STRICT - follow exactly):\n\n1. primary: Must equal the input expression exactly.\n2. meaning: MUST be in Korean (한글) ONLY. NO English allowed. Natural Korean colloquial translation (구어체). Example: "말도 안 돼", "배가 더부룩해"\n3. similar: EXACTLY 5 strings in the array. NOT 4, NOT 6. Exactly 5.\n4. example: EXACTLY 6 lines of dialogue, alternating A: and B:.\n   Format (no exceptions):\n   A: [dialogue line 1]\n   B: [dialogue line 2]\n   A: [dialogue line 3]\n   B: [dialogue line 4]\n   A: [dialogue line 5]\n   B: [dialogue line 6]\n   - No blank lines, no numbering, no extra text\n   - Each line MUST start with "A: " or "B: "\n\n5. japanese: EXACTLY 2 expressions separated by " / ".\n   Format: "expression1 / expression2"\n   If Kanji is used, MUST include Yomigana in parentheses.\n\n6. chinese: EXACTLY 2 expressions separated by " / ".\n   Format: "expression1 (pinyin1) / expression2 (pinyin2)"\n   Each expression MUST include pinyin in parentheses.\n\n7. spanish: EXACTLY 2 expressions separated by " / ".\n   Format: "expression1 / expression2"\n   Level: present, present perfect, future, simple past, past perfect, imperfect.\n\n8. vietnamese: EXACTLY 2 expressions separated by " / ".\n   Format: "expression1 / expression2"\n   Level: Opic IM2.\n\nCRITICAL: Before outputting, verify:\n- similar array has exactly 5 items\n- example has exactly 6 lines starting with A: or B:\n- japanese has exactly 2 parts separated by " / "\n- chinese has exactly 2 parts separated by " / "\n- spanish has exactly 2 parts separated by " / "\n- vietnamese has exactly 2 parts separated by " / "`;
}

export function buildReviewPrompt(primary: string, jsonText: string): string {
  return `Review the JSON for the primary expression below. Fix any field that does not match the meaning or intent of the primary. Return JSON only.\n\nPrimary: "${primary}"\n\nCRITICAL RULE for meaning: The meaning field MUST be in Korean (한글) ONLY. NO English allowed. If the meaning contains English, rewrite it as a natural Korean colloquial translation (구어체).\n\nJSON:\n${jsonText}`;
}

export async function callVertexAI(
  ai: AI,
  { model, temperature, prompt }: { model: string; temperature: number; prompt: string }
): Promise<string> {
  const generativeModel = getGenerativeModel(ai, {
    model,
    generationConfig: {
      temperature,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });
  const result = await generativeModel.generateContent(prompt);
  const response = await result.response;
  if (!response.candidates || response.candidates.length === 0) {
    throw new Error("No candidates returned from model.");
  }
  return response.text();
}

export async function fetchNextId(expressionsRef: CollectionReference): Promise<number> {
  const snapshot = await getDocs(query(expressionsRef, orderBy("id", "desc"), limit(1)));
  if (snapshot.empty) return MIN_START_ID;

  const lastId = Number(snapshot.docs[0]?.data().id);
  if (Number.isNaN(lastId)) return Date.now();
  return Math.max(lastId + 1, MIN_START_ID);
}

export async function saveExpression(
  db: Firestore,
  expressionsRef: CollectionReference,
  primary: string,
  payload: AdminPayload
): Promise<{ record: SavedExpression; docId: string; updatedAt: string }> {
  const errors = validatePayload(payload, primary);
  if (errors.length > 0) {
    throw new Error(`Fix JSON before saving: ${errors.join(" ")}`);
  }

  const nextId = await fetchNextId(expressionsRef);
  const record: SavedExpression = {
    id: nextId,
    primary,
    meaning: payload.meaning,
    similar: payload.similar,
    example: payload.example,
    japanese: payload.japanese,
    chinese: payload.chinese,
    spanish: payload.spanish,
    vietnamese: payload.vietnamese,
  };

  const paddedId = String(nextId).padStart(4, "0");
  const docId = `expression_${paddedId}`;
  await setDoc(doc(expressionsRef, docId), record);

  const updatedAt = new Date().toISOString();
  await setDoc(doc(db, "metadata", "sync"), { lastId: nextId, updatedAt });

  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
    channel.postMessage({ type: "expression-saved", lastId: nextId, updatedAt });
    channel.close();
  }

  return { record, docId, updatedAt };
}

export async function deleteExpression(
  db: Firestore,
  expressionsRef: CollectionReference,
  expression: { id: number; docId?: string }
): Promise<{ deletedId: number; docId: string; updatedAt: string }> {
  const docId = expression.docId && !expression.docId.startsWith("static_")
    ? expression.docId
    : `expression_${String(expression.id).padStart(4, "0")}`;
  const updatedAt = new Date().toISOString();

  await deleteDoc(doc(expressionsRef, docId));
  await setDoc(doc(db, "metadata", "sync"), { updatedAt, deletedId: expression.id }, { merge: true });

  if (typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
    channel.postMessage({ type: "expression-deleted", deletedId: expression.id, docId, updatedAt });
    channel.close();
  }

  return { deletedId: expression.id, docId, updatedAt };
}

function extractJson(text: string): string {
  if (!text) throw new Error("Received empty response from model.");
  const trimmed = text.trim();
  const startIdx = trimmed.indexOf("{");
  const endIdx = trimmed.lastIndexOf("}");

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return trimmed.slice(startIdx, endIdx + 1);
  }
  if (startIdx !== -1 && endIdx === -1) {
    return `${trimmed.slice(startIdx)}\n  "truncated": true\n}`;
  }
  throw new Error(`No JSON object found in response. Raw response: ${text.slice(0, 100) || "empty"}`);
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const alen = a.length;
  const blen = b.length;
  if (alen === 0 || blen === 0) return Math.max(alen, blen);

  const v0 = new Array<number>(blen + 1);
  const v1 = new Array<number>(blen + 1);
  for (let i = 0; i <= blen; i += 1) v0[i] = i;
  for (let i = 0; i < alen; i += 1) {
    v1[0] = i + 1;
    for (let j = 0; j < blen; j += 1) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= blen; j += 1) v0[j] = v1[j];
  }
  return v0[blen] ?? 0;
}

function isFuzzySimilar(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen < 6 || Math.abs(a.length - b.length) > 10) return false;
  const distance = levenshtein(a, b);
  return 1 - distance / maxLen >= 0.84;
}
