import assert from "node:assert/strict";
import test from "node:test";
import type { Expression, ReviewEvent } from "../../src/types/index.ts";
import { buildDailyQueue, createLearningCard, reviewCard } from "../../src/lib/srs.ts";
import { summarizeLearning } from "../../src/lib/progress.ts";

test("reviewCard advances ratings and records append-only events", () => {
  const now = new Date("2026-06-09T00:00:00.000Z");
  const card = createLearningCard(101, now);
  const reviewed = reviewCard(card, "good", now);

  assert.equal(reviewed.card.expressionId, 101);
  assert.equal(reviewed.card.state, "learning");
  assert.equal(reviewed.card.repetitions, 1);
  assert.equal(reviewed.card.lapses, 0);
  assert.equal(reviewed.event.expressionId, 101);
  assert.equal(reviewed.event.rating, "good");
  assert.equal(reviewed.event.previousDueAt, card.dueAt);
});

test("again rating schedules a short relearning review and tracks lapses", () => {
  const now = new Date("2026-06-09T00:00:00.000Z");
  const card = {
    ...createLearningCard(102, now),
    state: "review" as const,
    repetitions: 5,
    intervalDays: 12,
    dueAt: now.toISOString(),
  };
  const reviewed = reviewCard(card, "again", now);

  assert.equal(reviewed.card.state, "relearning");
  assert.equal(reviewed.card.repetitions, 0);
  assert.equal(reviewed.card.lapses, 1);
  assert.equal(reviewed.card.dueAt, "2026-06-09T00:10:00.000Z");
});

test("buildDailyQueue prioritizes due cards and caps new introductions", () => {
  const now = new Date("2026-06-09T00:00:00.000Z");
  const due = { ...createLearningCard(1, now), dueAt: "2026-06-08T00:00:00.000Z" };
  const future = { ...createLearningCard(2, now), dueAt: "2026-06-10T00:00:00.000Z" };
  const expressions: Expression[] = [
    expression(1),
    expression(2),
    expression(3),
    expression(4),
  ];

  const queue = buildDailyQueue([future, due], expressions, {
    dailyNewLimit: 2,
    dailyReviewLimit: 1,
    now,
    random: () => 0.99,
  });

  assert.deepEqual(queue.map((card) => card.expressionId), [1, 3]);
});

test("buildDailyQueue randomizes new introductions", () => {
  const now = new Date("2026-06-09T00:00:00.000Z");
  const expressions: Expression[] = [
    expression(1),
    expression(2),
    expression(3),
  ];

  const queue = buildDailyQueue([], expressions, {
    dailyNewLimit: 1,
    dailyReviewLimit: 0,
    now,
    random: () => 0,
  });

  assert.deepEqual(queue.map((card) => card.expressionId), [2]);
});

test("summarizeLearning calculates due, review totals, and streak", () => {
  const now = new Date("2026-06-09T12:00:00.000Z");
  const cards = [
    { ...createLearningCard(1, now), dueAt: "2026-06-09T00:00:00.000Z" },
    { ...createLearningCard(2, now), dueAt: "2026-06-10T00:00:00.000Z" },
  ];
  const events: ReviewEvent[] = [
    reviewEvent(1, "2026-06-07T09:00:00.000Z"),
    reviewEvent(1, "2026-06-08T09:00:00.000Z"),
    reviewEvent(2, "2026-06-09T09:00:00.000Z"),
  ];

  const summary = summarizeLearning(cards, events, now);

  assert.equal(summary.dueToday, 1);
  assert.equal(summary.cardsInReview, 2);
  assert.equal(summary.reviewedToday, 1);
  assert.equal(summary.totalReviews, 3);
  assert.equal(summary.currentStreak, 3);
});

function expression(id: number): Expression {
  return {
    id,
    primary: `Expression ${id}`,
    meaning: "meaning",
    similar: [],
    example: "example",
  };
}

function reviewEvent(expressionId: number, reviewedAt: string): ReviewEvent {
  return {
    id: `${expressionId}-${reviewedAt}`,
    expressionId,
    rating: "good",
    reviewedAt,
    previousDueAt: null,
    nextDueAt: reviewedAt,
  };
}
