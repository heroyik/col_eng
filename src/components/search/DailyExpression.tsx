import type { Expression } from "../../types";
import ExpressionCard from "./ExpressionCard";

interface Props {
  expression: Expression | null;
  showExample?: boolean;
  showTranslations?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onAddToReview?: (expression: Expression) => void;
  onDelete?: (expression: Expression) => void;
  previousDisabled?: boolean;
  nextDisabled?: boolean;
  deleteDisabled?: boolean;
  inReview?: boolean;
}

export default function DailyExpression({
  expression,
  showExample = true,
  showTranslations = true,
  onPrevious,
  onNext,
  onAddToReview,
  onDelete,
  previousDisabled = false,
  nextDisabled = false,
  deleteDisabled = false,
  inReview = false,
}: Props) {
  if (!expression) return null;
  const hasControls = Boolean(onPrevious || onNext || onAddToReview || onDelete);

  return (
    <div className="daily-expression-container">
      <div className="daily-header-row">
        <h2 className="daily-header">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Expression of the Day
        </h2>
        {hasControls && (
          <div className="daily-expression-actions" aria-label="Expression navigation">
            {onAddToReview && (
              <button
                type="button"
                className="daily-expression-badge review"
                onClick={() => onAddToReview(expression)}
                disabled={inReview}
                aria-label={inReview ? "이미 Review에 추가됨" : "Review에 추가"}
                title={inReview ? "이미 Review에 추가됨" : "Review에 추가"}
              >
                <span aria-hidden="true">{inReview ? "✓" : "+"}</span>
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="daily-expression-badge delete"
                onClick={() => onDelete(expression)}
                disabled={deleteDisabled}
                aria-label="표현 삭제"
                title="표현 삭제"
              >
                <span aria-hidden="true">×</span>
              </button>
            )}
            <button
              type="button"
              className="daily-expression-badge"
              onClick={onPrevious}
              disabled={previousDisabled || !onPrevious}
              aria-label="이전 표현"
              title="이전 표현"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              className="daily-expression-badge next"
              onClick={onNext}
              disabled={nextDisabled || !onNext}
              aria-label="다음 표현"
              title="다음 표현"
            >
              <span aria-hidden="true">↯</span>
            </button>
          </div>
        )}
      </div>
      <ExpressionCard expression={expression} showExample={showExample} showTranslations={showTranslations} />
    </div>
  );
}
