import type { Expression, TextValue } from "../types";
import { getSearchableText, valueToText } from "./firestore";

export function searchExpressions(expressions: Expression[], searchTerm: string): Expression[] {
  const term = searchTerm.trim().toLowerCase();

  if (!term) return [];
  if (term === "*") return expressions;
  if (term.length < 2) return [];

  return expressions.filter((item) => getSearchableText(item).includes(term));
}

export function highlightKeywords(text: TextValue, keywords: TextValue[]): string {
  const safeText = valueToText(text);

  if (!safeText || keywords.length === 0) {
    return safeText;
  }

  const sortedKeywords = keywords
    .map(valueToText)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);

  if (sortedKeywords.length === 0) {
    return safeText;
  }

  const pattern = new RegExp(
    `(${sortedKeywords.map(escapeRegExp).join("|")})`,
    "gi"
  );

  return safeText.replace(pattern, '<span class="highlight">$1</span>');
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
