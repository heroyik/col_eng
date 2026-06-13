import { useMemo, useState } from "react";
import type { Expression, LearningCard, ReviewEvent, SrsRating } from "../../types";
import { appendReviewEvent, upsertCard } from "../../lib/learningStorage";
import { reviewCard } from "../../lib/srs";
import StudyCard from "./StudyCard";

interface Props {
  expressions: Expression[];
  queue: LearningCard[];
  showTranslations: boolean;
  onCardsChange: (cards: LearningCard[]) => void;
  onReviewEventsChange: (events: ReviewEvent[]) => void;
  onFinish: () => void;
}

export default function LearningSession({
  expressions,
  queue,
  showTranslations,
  onCardsChange,
  onReviewEventsChange,
  onFinish,
}: Props) {
  const [index, setIndex] = useState(0);
  const expressionsById = useMemo(
    () => new Map(expressions.map((expression) => [expression.id, expression])),
    [expressions]
  );
  const currentCard = queue[index];
  const currentExpression = currentCard ? expressionsById.get(currentCard.expressionId) : undefined;

  function handleRate(rating: SrsRating): void {
    if (!currentCard) return;

    const reviewed = reviewCard(currentCard, rating);
    const nextCards = upsertCard(reviewed.card);
    const nextEvents = appendReviewEvent(reviewed.event);
    onCardsChange(nextCards);
    onReviewEventsChange(nextEvents);

    if (index + 1 >= queue.length) {
      onFinish();
      return;
    }

    setIndex((current) => current + 1);
  }

  if (!currentCard || !currentExpression) {
    return (
      <section className="study-session empty-state" aria-label="Review session">
        <p>No review cards are ready yet.</p>
        <button className="btn-text" type="button" onClick={onFinish}>
          Back to learning home
        </button>
      </section>
    );
  }

  return (
    <StudyCard
      expression={currentExpression}
      current={index + 1}
      total={queue.length}
      showTranslations={showTranslations}
      onRate={handleRate}
    />
  );
}
