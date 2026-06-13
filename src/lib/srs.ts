import type { Expression, LearningCard, ReviewEvent, SrsRating, SrsState } from "../types";

const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;
const MAX_EASE_FACTOR = 3;
const MAX_INTERVAL_DAYS = 365;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const RATING_EASE_DELTA: Record<SrsRating, number> = {
  again: -0.2,
  hard: -0.15,
  good: 0,
  easy: 0.15,
};

export function createLearningCard(expressionId: number, now = new Date()): LearningCard {
  const timestamp = now.toISOString();
  return {
    expressionId,
    state: "new",
    easeFactor: INITIAL_EASE_FACTOR,
    intervalDays: 0,
    dueAt: timestamp,
    repetitions: 0,
    lapses: 0,
    lastReviewedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function reviewCard(
  card: LearningCard,
  rating: SrsRating,
  now = new Date()
): { card: LearningCard; event: ReviewEvent } {
  const reviewedAt = now.toISOString();
  const previousDueAt = card.dueAt;
  const easeFactor = clampEase(card.easeFactor + RATING_EASE_DELTA[rating]);
  const repetitions = rating === "again" ? 0 : card.repetitions + 1;
  const lapses = rating === "again" ? card.lapses + 1 : card.lapses;
  const state = nextState(card.state, rating, repetitions);
  const intervalDays = nextIntervalDays(card, rating, repetitions, easeFactor);
  const dueAt = nextDueAt(now, rating, intervalDays);

  const nextCard: LearningCard = {
    ...card,
    state,
    easeFactor,
    intervalDays,
    dueAt,
    repetitions,
    lapses,
    lastReviewedAt: reviewedAt,
    updatedAt: reviewedAt,
  };

  return {
    card: nextCard,
    event: {
      id: `${card.expressionId}-${now.getTime()}-${rating}`,
      expressionId: card.expressionId,
      rating,
      reviewedAt,
      previousDueAt,
      nextDueAt: dueAt,
    },
  };
}

export function buildDailyQueue(
  cards: LearningCard[],
  expressions: Expression[],
  options: { dailyNewLimit: number; dailyReviewLimit: number; now?: Date; random?: () => number }
): LearningCard[] {
  const nowTime = (options.now || new Date()).getTime();
  const random = options.random || Math.random;
  const cardsById = new Map(cards.map((card) => [card.expressionId, card]));
  const dueCards = shuffle(
    cards.filter((card) => new Date(card.dueAt).getTime() <= nowTime),
    random
  )
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    .slice(0, options.dailyReviewLimit);

  const newCards = shuffle(
    expressions.filter((expression) => !cardsById.has(expression.id)),
    random
  )
    .slice(0, Math.max(0, options.dailyNewLimit - dueCards.filter((card) => card.state === "new").length))
    .map((expression) => createLearningCard(expression.id, options.now));

  return [...dueCards, ...newCards];
}

export function isDue(card: LearningCard, now = new Date()): boolean {
  return new Date(card.dueAt).getTime() <= now.getTime();
}

function nextState(current: SrsState, rating: SrsRating, repetitions: number): SrsState {
  if (rating === "again") {
    return current === "review" ? "relearning" : "learning";
  }

  if (repetitions >= 3) return "review";
  return current === "relearning" ? "relearning" : "learning";
}

function nextIntervalDays(
  card: LearningCard,
  rating: SrsRating,
  repetitions: number,
  easeFactor: number
): number {
  if (rating === "again") return 0;
  if (rating === "hard") return Math.max(1, Math.round(Math.max(card.intervalDays, 1) * 1.2));
  if (repetitions <= 1) return rating === "easy" ? 1 : 0;
  if (repetitions === 2) return rating === "easy" ? 3 : 1;

  const multiplier = rating === "easy" ? easeFactor + 0.3 : easeFactor;
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(Math.max(card.intervalDays, 1) * multiplier)));
}

function nextDueAt(now: Date, rating: SrsRating, intervalDays: number): string {
  if (rating === "again") return new Date(now.getTime() + 10 * MINUTE_MS).toISOString();
  if (intervalDays === 0) return new Date(now.getTime() + DAY_MS).toISOString();
  return new Date(now.getTime() + intervalDays * DAY_MS).toISOString();
}

function clampEase(value: number): number {
  return Math.min(MAX_EASE_FACTOR, Math.max(MIN_EASE_FACTOR, Number(value.toFixed(2))));
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}
