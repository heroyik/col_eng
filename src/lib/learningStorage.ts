import type { LearningCard, LearningProgress, ReviewEvent } from "../types";
import { getStorageItem, hasLocalStorage, removeStorageItem, setStorageItem } from "./storage";

export const LEARNING_CARDS_KEY = "col_eng_learning_cards_v1";
export const REVIEW_EVENTS_KEY = "col_eng_review_events_v1";
export const LEARNING_PROGRESS_KEY = "col_eng_learning_progress_v1";
export const LEARNING_SCHEMA_VERSION_KEY = "col_eng_learning_schema_version";
export const LEARNING_SCHEMA_VERSION = "1";

const STORAGE_WARNING_THRESHOLD_BYTES = 4.5 * 1024 * 1024;

export interface LearningState {
  cards: LearningCard[];
  reviewEvents: ReviewEvent[];
  progress: LearningProgress;
}

export interface StorageUsage {
  bytes: number;
  warning: boolean;
}

export function loadLearningState(): LearningState {
  return {
    cards: loadCards(),
    reviewEvents: loadReviewEvents(),
    progress: loadProgress(),
  };
}

export function loadCards(): LearningCard[] {
  return readJson<LearningCard[]>(LEARNING_CARDS_KEY, []);
}

export function saveCards(cards: LearningCard[]): void {
  writeJson(LEARNING_CARDS_KEY, cards);
  markSchemaVersion();
}

export function upsertCard(card: LearningCard): LearningCard[] {
  const cards = loadCards();
  const nextCards = cards.some((item) => item.expressionId === card.expressionId)
    ? cards.map((item) => item.expressionId === card.expressionId ? card : item)
    : [...cards, card];
  saveCards(nextCards);
  return nextCards;
}

export function loadReviewEvents(): ReviewEvent[] {
  return readJson<ReviewEvent[]>(REVIEW_EVENTS_KEY, []);
}

export function appendReviewEvent(event: ReviewEvent): ReviewEvent[] {
  const events = [...loadReviewEvents(), event];
  writeJson(REVIEW_EVENTS_KEY, events);
  markSchemaVersion();
  return events;
}

export function removeLearningExpression(expressionId: number): { cards: LearningCard[]; reviewEvents: ReviewEvent[] } {
  const cards = loadCards().filter((card) => card.expressionId !== expressionId);
  const reviewEvents = loadReviewEvents().filter((event) => event.expressionId !== expressionId);
  saveCards(cards);
  writeJson(REVIEW_EVENTS_KEY, reviewEvents);
  markSchemaVersion();
  return { cards, reviewEvents };
}

export function loadProgress(): LearningProgress {
  return readJson<LearningProgress>(LEARNING_PROGRESS_KEY, createDefaultProgress());
}

export function saveProgress(progress: LearningProgress): void {
  writeJson(LEARNING_PROGRESS_KEY, progress);
  markSchemaVersion();
}

export function createDefaultProgress(today = new Date()): LearningProgress {
  return {
    today: {
      date: toDateKey(today),
      reviewed: 0,
      newIntroduced: 0,
    },
    streak: {
      current: 0,
      longest: 0,
      lastActiveDate: null,
    },
    lifetime: {
      totalReviews: 0,
      totalExpressionsLearned: 0,
    },
  };
}

export function checkLearningStorageUsage(): StorageUsage {
  if (!hasLocalStorage()) return { bytes: 0, warning: false };

  const bytes = [
    LEARNING_CARDS_KEY,
    REVIEW_EVENTS_KEY,
    LEARNING_PROGRESS_KEY,
  ].reduce((total, key) => total + byteLength(getStorageItem(key) || ""), 0);

  return {
    bytes,
    warning: bytes >= STORAGE_WARNING_THRESHOLD_BYTES,
  };
}

export function clearLearningState(): void {
  if (!hasLocalStorage()) return;
  removeStorageItem(LEARNING_CARDS_KEY);
  removeStorageItem(REVIEW_EVENTS_KEY);
  removeStorageItem(LEARNING_PROGRESS_KEY);
  removeStorageItem(LEARNING_SCHEMA_VERSION_KEY);
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasLocalStorage()) return fallback;

  const raw = getStorageItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!hasLocalStorage()) return;
  setStorageItem(key, JSON.stringify(value));
}

function markSchemaVersion(): void {
  if (!hasLocalStorage()) return;
  setStorageItem(LEARNING_SCHEMA_VERSION_KEY, LEARNING_SCHEMA_VERSION);
}

function toDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function byteLength(value: string): number {
  return new Blob([value]).size;
}
