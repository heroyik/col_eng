import type { Expression } from "../../types";
import { highlightKeywords } from "../../lib/search";

interface Props {
  expression: Expression;
  inReview?: boolean;
  onAddToReview?: (expression: Expression) => void;
  showExample?: boolean;
  showTranslations?: boolean;
}

export default function ExpressionCard({
  expression,
  inReview = false,
  onAddToReview,
  showExample = true,
  showTranslations = true,
}: Props) {
  const translations = [
    { lang: "Japanese", value: expression.japanese },
    { lang: "Chinese", value: expression.chinese },
    { lang: "Vietnamese", value: expression.vietnamese },
    { lang: "Spanish", value: expression.spanish },
  ].filter((translation) => translation.value);

  const highlightedExample = highlightKeywords(expression.example, [
    expression.primary,
    ...expression.similar,
  ]);

  return (
    <article className="expression-card">
      <div className="card-header">
        <h3 className="text">{expression.primary}</h3>
        {expression.meaning && <span className="meaning">{expression.meaning}</span>}
      </div>

      {expression.similar.length > 0 && (
        <div className="synonyms-list">
          {expression.similar.map((synonym) => (
            <span className="synonym-tag" key={synonym}>{synonym}</span>
          ))}
        </div>
      )}

      {showExample && expression.example && (
        <div className="example-box">
          <span className="example-label">Example Usage</span>
          <p
            className="example-text"
            dangerouslySetInnerHTML={{ __html: highlightedExample }}
          />
        </div>
      )}

      {showTranslations && translations.length > 0 && (
        <div className="translation-container">
          {translations.map((translation) => (
            <div className="translation-row" key={translation.lang}>
              <span className="lang-label">{translation.lang}</span>
              <span className="lang-text">{translation.value}</span>
            </div>
          ))}
        </div>
      )}

      {onAddToReview && (
        <button
          className={inReview ? "review-action in-review" : "review-action"}
          type="button"
          disabled={inReview}
          onClick={() => onAddToReview(expression)}
        >
          {inReview ? "In Review" : "Add to Review"}
        </button>
      )}
    </article>
  );
}
