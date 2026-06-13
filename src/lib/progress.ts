import type { LearningCard, ReviewEvent } from "../types";

export interface LearningSummary {
  dueToday: number;
  cardsInReview: number;
  reviewedToday: number;
  totalReviews: number;
  currentStreak: number;
}

export function summarizeLearning(cards: LearningCard[], events: ReviewEvent[], now = new Date()): LearningSummary {
  const today = dateKey(now);
  const uniqueReviewDates = [...new Set(events.map((event) => dateKey(new Date(event.reviewedAt))))].sort();

  return {
    dueToday: cards.filter((card) => new Date(card.dueAt).getTime() <= now.getTime()).length,
    cardsInReview: cards.length,
    reviewedToday: events.filter((event) => dateKey(new Date(event.reviewedAt)) === today).length,
    totalReviews: events.length,
    currentStreak: calculateCurrentStreak(uniqueReviewDates, today),
  };
}

function calculateCurrentStreak(sortedDateKeys: string[], today: string): number {
  const dates = new Set(sortedDateKeys);
  let cursor = dates.has(today) ? new Date(`${today}T00:00:00.000Z`) : previousDate(today);
  let streak = 0;

  while (dates.has(dateKey(cursor))) {
    streak += 1;
    cursor = previousDate(dateKey(cursor));
  }

  return streak;
}

function previousDate(value: string): Date {
  const date = new Date(`${value}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date;
}

function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}
