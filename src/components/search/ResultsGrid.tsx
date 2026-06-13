import type { Expression, LearningCard } from "../../types";
import ExpressionCard from "./ExpressionCard";

interface Props {
  results: Expression[];
  learningCards?: LearningCard[];
  onAddToReview?: (expression: Expression) => void;
}

export default function ResultsGrid({ results, learningCards = [], onAddToReview }: Props) {
  if (results.length === 0) return null;
  const learningIds = new Set(learningCards.map((card) => card.expressionId));

  return (
    <>
      <div className="result-count">
        {results.length} {results.length === 1 ? "result" : "results"} found
      </div>
      <div className="results-grid">
        {results.map((expression) => (
          <ExpressionCard
            expression={expression}
            inReview={learningIds.has(expression.id)}
            onAddToReview={onAddToReview}
            key={expression.docId || expression.id}
          />
        ))}
      </div>
    </>
  );
}
