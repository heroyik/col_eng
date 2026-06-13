import type { Auth } from "firebase/auth";
import { signInAnonymously } from "firebase/auth";
import {
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
  type Firestore,
} from "firebase/firestore";
import type { LearningCard, ReviewEvent } from "../types";
import { getStorageItem, hasLocalStorage, removeStorageItem, setStorageItem } from "./storage";

export const LEARNING_SYNC_OPT_IN_KEY = "col_eng_learning_sync_opt_in";
export const LEARNING_SYNC_UID_KEY = "col_eng_learning_sync_uid";

const MAX_EVENTS_PER_SYNC = 200;
const MAX_BATCH_WRITES = 450;
const LEARNING_SYNC_FINGERPRINT_PREFIX = "col_eng_learning_sync_fingerprint";
const LEARNING_SYNC_ITEM_FINGERPRINTS_PREFIX = "col_eng_learning_sync_item_fingerprints";
const LEARNING_SYNC_COOLDOWN_PREFIX = "col_eng_learning_sync_cooldown";
const LEARNING_SYNC_COOLDOWN_MS = 2 * 60 * 60 * 1000;

export interface LearningSyncPayload {
  cards: LearningCard[];
  reviewEvents: ReviewEvent[];
}

export type LearningSyncResult = "synced" | "skipped" | "cooldown";

export interface LearningSyncOptions {
  force?: boolean;
}

export function isLearningSyncEnabled(): boolean {
  return hasLocalStorage() && getStorageItem(LEARNING_SYNC_OPT_IN_KEY) === "true";
}

export function getLearningSyncUid(): string | null {
  return hasLocalStorage() ? getStorageItem(LEARNING_SYNC_UID_KEY) : null;
}

export function disableLearningSync(): void {
  if (!hasLocalStorage()) return;
  removeStorageItem(LEARNING_SYNC_OPT_IN_KEY);
  removeStorageItem(LEARNING_SYNC_UID_KEY);
}

export async function enableLearningSync(auth: Auth): Promise<string> {
  const currentUser = auth.currentUser;
  const user = currentUser ?? (await signInAnonymously(auth)).user;

  if (hasLocalStorage()) {
    setStorageItem(LEARNING_SYNC_OPT_IN_KEY, "true");
    setStorageItem(LEARNING_SYNC_UID_KEY, user.uid);
  }

  return user.uid;
}

export async function syncLearningState(
  db: Firestore,
  userId: string,
  payload: LearningSyncPayload,
  options: LearningSyncOptions = {}
): Promise<LearningSyncResult> {
  if (isLearningSyncInCooldown(userId)) return "cooldown";

  const cards = payload.cards.slice(0, MAX_BATCH_WRITES);
  const recentEvents = payload.reviewEvents.slice(-MAX_EVENTS_PER_SYNC);
  const fingerprint = createLearningSyncFingerprint(cards, recentEvents);
  const fingerprintKey = getUserScopedKey(LEARNING_SYNC_FINGERPRINT_PREFIX, userId);
  const itemFingerprintKey = getUserScopedKey(LEARNING_SYNC_ITEM_FINGERPRINTS_PREFIX, userId);
  const nextItemFingerprints = createItemFingerprints(cards, recentEvents);
  const previousItemFingerprints = readItemFingerprints(itemFingerprintKey);

  if (!options.force && hasLocalStorage() && getStorageItem(fingerprintKey) === fingerprint) {
    if (!previousItemFingerprints) writeItemFingerprints(itemFingerprintKey, nextItemFingerprints);
    return "skipped";
  }

  const writes = [
    ...cards
      .filter((card) => options.force || previousItemFingerprints?.cards[String(card.expressionId)] !== nextItemFingerprints.cards[String(card.expressionId)])
      .map((card) => ({
      path: `users/${userId}/learningCards/${card.expressionId}`,
      value: card,
    })),
    ...recentEvents
      .filter((event) => options.force || previousItemFingerprints?.reviewEvents[event.id] !== nextItemFingerprints.reviewEvents[event.id])
      .map((event) => ({
      path: `users/${userId}/reviewEvents/${event.id}`,
      value: event,
    })),
  ];
  const chunks = chunkWrites(writes);

  try {
    for (const chunk of chunks) {
      const batch = writeBatch(db);
      chunk.forEach((item) => batch.set(doc(db, item.path), item.value, { merge: true }));
      await batch.commit();
    }

    await setDoc(doc(db, `users/${userId}/metadata/learningSync`), {
      cardCount: payload.cards.length,
      reviewEventCount: payload.reviewEvents.length,
      syncedAt: serverTimestamp(),
      schemaVersion: 1,
    }, { merge: true });

    if (hasLocalStorage()) {
      setStorageItem(fingerprintKey, fingerprint);
      writeItemFingerprints(itemFingerprintKey, nextItemFingerprints);
      removeStorageItem(getUserScopedKey(LEARNING_SYNC_COOLDOWN_PREFIX, userId));
    }

    return "synced";
  } catch (error) {
    handleLearningSyncError(userId, error);
    throw error;
  }
}

function chunkWrites<T>(items: T[]): T[][] {
  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += MAX_BATCH_WRITES) {
    chunks.push(items.slice(index, index + MAX_BATCH_WRITES));
  }
  return chunks;
}

function isLearningSyncInCooldown(userId: string): boolean {
  if (!hasLocalStorage()) return false;
  const cooldownUntil = Number(getStorageItem(getUserScopedKey(LEARNING_SYNC_COOLDOWN_PREFIX, userId)) || 0);
  return Boolean(cooldownUntil && Date.now() < cooldownUntil);
}

function handleLearningSyncError(userId: string, error: unknown): void {
  const code = typeof error === "object" && error && "code" in error
    ? String((error as { code?: unknown }).code)
    : "";

  if (code === "resource-exhausted" && hasLocalStorage()) {
    setStorageItem(
      getUserScopedKey(LEARNING_SYNC_COOLDOWN_PREFIX, userId),
      String(Date.now() + LEARNING_SYNC_COOLDOWN_MS)
    );
  }
}

function getUserScopedKey(prefix: string, userId: string): string {
  return `${prefix}_${userId}`;
}

function createLearningSyncFingerprint(cards: LearningCard[], reviewEvents: ReviewEvent[]): string {
  return stableStringify({
    cardCount: cards.length,
    reviewEventCount: reviewEvents.length,
    cards: cards.map((card) => ({
      expressionId: card.expressionId,
      state: card.state,
      easeFactor: card.easeFactor,
      intervalDays: card.intervalDays,
      dueAt: card.dueAt,
      repetitions: card.repetitions,
      lapses: card.lapses,
      lastReviewedAt: card.lastReviewedAt,
      updatedAt: card.updatedAt,
    })),
    reviewEvents: reviewEvents.map((event) => ({
      id: event.id,
      expressionId: event.expressionId,
      rating: event.rating,
      reviewedAt: event.reviewedAt,
      previousDueAt: event.previousDueAt,
      nextDueAt: event.nextDueAt,
    })),
  });
}

function stableStringify(value: unknown): string {
  return JSON.stringify(value);
}

interface LearningSyncItemFingerprints {
  cards: Record<string, string>;
  reviewEvents: Record<string, string>;
}

function createItemFingerprints(cards: LearningCard[], reviewEvents: ReviewEvent[]): LearningSyncItemFingerprints {
  return {
    cards: Object.fromEntries(cards.map((card) => [
      String(card.expressionId),
      stableStringify({
        state: card.state,
        easeFactor: card.easeFactor,
        intervalDays: card.intervalDays,
        dueAt: card.dueAt,
        repetitions: card.repetitions,
        lapses: card.lapses,
        lastReviewedAt: card.lastReviewedAt,
        updatedAt: card.updatedAt,
      }),
    ])),
    reviewEvents: Object.fromEntries(reviewEvents.map((event) => [
      event.id,
      stableStringify({
        expressionId: event.expressionId,
        rating: event.rating,
        reviewedAt: event.reviewedAt,
        previousDueAt: event.previousDueAt,
        nextDueAt: event.nextDueAt,
      }),
    ])),
  };
}

function readItemFingerprints(key: string): LearningSyncItemFingerprints | null {
  if (!hasLocalStorage()) return null;
  try {
    const value = getStorageItem(key);
    if (!value) return null;
    const parsed = JSON.parse(value) as Partial<LearningSyncItemFingerprints>;
    if (!parsed.cards || !parsed.reviewEvents) return null;
    return {
      cards: parsed.cards,
      reviewEvents: parsed.reviewEvents,
    };
  } catch {
    return null;
  }
}

function writeItemFingerprints(key: string, fingerprints: LearningSyncItemFingerprints): void {
  if (!hasLocalStorage()) return;
  setStorageItem(key, JSON.stringify(fingerprints));
}
