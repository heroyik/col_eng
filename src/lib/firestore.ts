import type { Expression, RawExpression, TextValue } from "../types";

export const EXPRESSIONS_COLLECTION = "EnglishExpressions";

export function valueToText(value: TextValue): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return value.map(valueToText).filter(Boolean).join("\n");
  }
  if (typeof value === "object") {
    return Object.values(value).map(valueToText).filter(Boolean).join("\n");
  }
  return String(value);
}

function normalizeSimilar(value: TextValue): string[] {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.map(valueToText).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as TextValue;
      if (Array.isArray(parsed)) {
        return parsed.map(valueToText).map((item) => item.trim()).filter(Boolean);
      }
    } catch {
      // Fall through and wrap the original string.
    }
  }

  const text = valueToText(value).trim();
  return text ? [text] : [];
}

function normalizeTranslation(value: TextValue): string | undefined {
  const text = valueToText(value).replace(/\n+/g, " / ").trim();
  return text || undefined;
}

export function normalizeExpression(item: RawExpression): Expression {
  return {
    docId: item.docId,
    id: Number(item.id),
    primary: valueToText(item.primary).trim(),
    meaning: valueToText(item.meaning).trim(),
    similar: normalizeSimilar(item.similar),
    example: valueToText(item.example).trim(),
    japanese: normalizeTranslation(item.japanese),
    chinese: normalizeTranslation(item.chinese),
    spanish: normalizeTranslation(item.spanish),
    vietnamese: normalizeTranslation(item.vietnamese),
  };
}

export function getSearchableText(item: Expression | RawExpression): string {
  return [
    item.primary,
    item.meaning,
    item.similar,
    item.example,
    item.japanese,
    item.chinese,
    item.vietnamese,
    item.spanish,
  ].map(valueToText).join("\n").toLowerCase();
}
