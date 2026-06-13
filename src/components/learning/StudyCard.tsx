import { useEffect, useState } from "react";
import type { Expression, SrsRating } from "../../types";

interface Props {
  expression: Expression;
  current: number;
  total: number;
  showTranslations: boolean;
  onRate: (rating: SrsRating) => void;
}

const RATING_OPTIONS: { rating: SrsRating; label: string; icon: string; hint: string }[] = [
  { rating: "again", label: "Again", icon: "↺", hint: "I missed it" },
  { rating: "hard", label: "Hard", icon: "◆", hint: "Barely got it" },
  { rating: "good", label: "Good", icon: "✓", hint: "I know it" },
  { rating: "easy", label: "Easy", icon: "⚡", hint: "Too easy" },
];

const SWIPE_THRESHOLD = 90;

export default function StudyCard({ expression, current, total, showTranslations, onRate }: Props) {
  const [revealed, setRevealed] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const translations = [
    { lang: "Vietnamese", value: expression.vietnamese },
    { lang: "Japanese", value: expression.japanese },
    { lang: "Chinese", value: expression.chinese },
    { lang: "Spanish", value: expression.spanish },
  ].filter((translation) => translation.value);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if (!revealed && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        setRevealed(true);
        return;
      }

      if (!revealed) return;

      const keyRatings: Record<string, SrsRating> = {
        ArrowLeft: "again",
        ArrowDown: "hard",
        ArrowRight: "good",
        ArrowUp: "easy",
      };
      const rating = keyRatings[event.key];
      if (!rating) return;

      event.preventDefault();
      onRate(rating);
      setRevealed(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onRate, revealed]);

  function rateAndReset(rating: SrsRating): void {
    onRate(rating);
    setRevealed(false);
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  }

  function handlePointerUp(): void {
    if (!dragStart || !revealed) {
      setDragStart(null);
      setDragOffset({ x: 0, y: 0 });
      return;
    }

    const absX = Math.abs(dragOffset.x);
    const absY = Math.abs(dragOffset.y);

    // 수직 스와이프(위/아래)는 스크롤로 처리, 평점 없음
    // 수평 스와이프(왼쪽/오른쪽)만 평점 처리
    if (absX < SWIPE_THRESHOLD || absX <= absY) {
      setDragStart(null);
      setDragOffset({ x: 0, y: 0 });
      return;
    }

    rateAndReset(dragOffset.x < 0 ? "again" : "good");
  }

  const swipeRating = getSwipeRating(dragOffset);
  const transform = revealed
    ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${Math.max(-12, Math.min(12, dragOffset.x / 16))}deg)`
    : undefined;

  return (
    <section className="study-session" aria-label="Review session">
      <div className="session-progress" aria-label={`Card ${current} of ${total}`}>
        <span>{current}</span>
        <div className="session-progress-track">
          <div className="session-progress-bar" style={{ width: `${(current / total) * 100}%` }} />
        </div>
        <span>{total}</span>
      </div>

      <article
        className={revealed ? "study-card revealed" : "study-card"}
        data-swipe-rating={swipeRating || undefined}
        onPointerDown={(event) => {
          if (!revealed) return;
          setDragStart({ x: event.clientX, y: event.clientY });
        }}
        onPointerMove={(event) => {
          if (!dragStart || !revealed) return;
          const dx = event.clientX - dragStart.x;
          const dy = event.clientY - dragStart.y;
          // 수직 제스처는 스크롤로 처리 — 시각적 변형 없이 브라우저 스크롤이 우선
          if (Math.abs(dy) > Math.abs(dx)) {
            setDragOffset({ x: 0, y: 0 });
            return;
          }
          setDragOffset({ x: dx, y: 0 });
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          setDragStart(null);
          setDragOffset({ x: 0, y: 0 });
        }}
        style={{ transform }}
      >
        {swipeRating && <div className={`swipe-cue ${swipeRating}`}>{ratingLabel(swipeRating)}</div>}
        <div className="study-card-face">
          <span className="study-kicker">Expression</span>
          <h2>{expression.primary}</h2>
          {!revealed && (
            <button className="btn-reveal" type="button" onClick={() => setRevealed(true)}>
              Hit it
            </button>
          )}
        </div>

        {revealed && (
          <div className="study-card-answer">
            <p className="study-meaning">{expression.meaning}</p>
            {expression.similar.length > 0 && (
              <div className="study-similar">
                {expression.similar.slice(0, 5).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
            {expression.example && <p className="study-example">{expression.example}</p>}
            {showTranslations && translations.length > 0 && (
              <div className="study-translations">
                {translations.map((translation) => (
                  <div className="study-translation-row" key={translation.lang}>
                    <span>{translation.lang}</span>
                    <strong>{translation.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </article>

      <div className="rating-controls" aria-label="Rate this card">
        {RATING_OPTIONS.map((option) => (
          <button
            className={`rating-btn ${option.rating}`}
            type="button"
            disabled={!revealed}
            key={option.rating}
            onClick={() => {
              rateAndReset(option.rating);
            }}
          >
            <span className="rating-label">
              <span className="rating-badge" aria-hidden="true">{option.icon}</span>
              <span>{option.label}</span>
            </span>
            <small>{option.hint}</small>
          </button>
        ))}
      </div>
    </section>
  );
}

function getSwipeRating(offset: { x: number; y: number }): SrsRating | null {
  const absX = Math.abs(offset.x);
  const absY = Math.abs(offset.y);

  // 수직 스와이프는 스크롤 — 큐 표시 안 함
  if (absX < 30 || absX <= absY) return null;
  return offset.x < 0 ? "again" : "good";
}

function ratingLabel(rating: SrsRating): string {
  return RATING_OPTIONS.find((option) => option.rating === rating)?.label || rating;
}
