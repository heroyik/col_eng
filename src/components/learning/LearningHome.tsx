import type { Expression, LearningCard } from "../../types";
import type { LearningSummary } from "../../lib/progress";
import DailyExpression from "../search/DailyExpression";

interface Props {
  expressions: Expression[];
  cards: LearningCard[];
  summary: LearningSummary;
  dailyExpression: Expression | null;
  dailyExpressionExampleEnabled: boolean;
  dailyExpressionTranslationsEnabled: boolean;
  onDailyExpressionPrevious?: () => void;
  onDailyExpressionNext?: () => void;
  onDailyExpressionAddToReview?: (expression: Expression) => void;
  onDailyExpressionDelete?: (expression: Expression) => void;
  dailyExpressionPreviousDisabled?: boolean;
  dailyExpressionNextDisabled?: boolean;
  dailyExpressionDeleteDisabled?: boolean;
  dailyExpressionInReview?: boolean;
}

export default function LearningHome({
  expressions,
  cards,
  summary,
  dailyExpression,
  dailyExpressionExampleEnabled,
  dailyExpressionTranslationsEnabled,
  onDailyExpressionPrevious,
  onDailyExpressionNext,
  onDailyExpressionAddToReview,
  onDailyExpressionDelete,
  dailyExpressionPreviousDisabled = false,
  dailyExpressionNextDisabled = false,
  dailyExpressionDeleteDisabled = false,
  dailyExpressionInReview = false,
}: Props) {
  const newAvailable = Math.max(0, expressions.length - cards.length);

  return (
    <section className="learning-home" aria-label="Learning summary">
      <DailyExpression
        expression={dailyExpression}
        showExample={dailyExpressionExampleEnabled}
        showTranslations={dailyExpressionTranslationsEnabled}
        onPrevious={onDailyExpressionPrevious}
        onNext={onDailyExpressionNext}
        onAddToReview={onDailyExpressionAddToReview}
        onDelete={onDailyExpressionDelete}
        previousDisabled={dailyExpressionPreviousDisabled}
        nextDisabled={dailyExpressionNextDisabled}
        deleteDisabled={dailyExpressionDeleteDisabled}
        inReview={dailyExpressionInReview}
      />

      <div className="learning-summary">
        <div className="learning-stat">
          <span className="learning-stat-icon">⏰</span>
          <span className="learning-stat-value">{summary.dueToday}</span>
          <span className="learning-stat-label">due today</span>
        </div>
        <div className="learning-stat">
          <span className="learning-stat-icon">✅</span>
          <span className="learning-stat-value">{summary.reviewedToday}</span>
          <span className="learning-stat-label">reviewed today</span>
        </div>
        <div className="learning-stat">
          <span className="learning-stat-icon">✨</span>
          <span className="learning-stat-value">{newAvailable}</span>
          <span className="learning-stat-label">new available</span>
        </div>
        <div className="learning-stat">
          <span className="learning-stat-icon">📚</span>
          <span className="learning-stat-value">{summary.cardsInReview}</span>
          <span className="learning-stat-label">in review</span>
        </div>
        <div className="learning-stat">
          <span className="learning-stat-icon">🔁</span>
          <span className="learning-stat-value">{summary.totalReviews}</span>
          <span className="learning-stat-label">total reviews</span>
        </div>
        <div className="learning-stat">
          <span className="learning-stat-icon">🔥</span>
          <span className="learning-stat-value">{summary.currentStreak}</span>
          <span className="learning-stat-label">day streak</span>
        </div>
      </div>
    </section>
  );
}
