// regenerate_all_spanish.js
// This script regenerates the 'spanish' field for all records in the main JSON file
// without using any external AI services. It uses a simple word‑to‑word dictionary
// (english_to_spanish_dict.json) and basic heuristics to produce two colloquial
// Spanish expressions per record: a direct translation and a future‑tense version.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '20260101_COL_ENG_1484_backupjson');
const DICT_FILE = path.join(__dirname, 'english_to_spanish_dict.json');

// Load data and dictionary
const rawData = fs.readFileSync(DATA_FILE, 'utf8');
let records = JSON.parse(rawData);
const dict = JSON.parse(fs.readFileSync(DICT_FILE, 'utf8'));

// Helper: translate a phrase word‑by‑word using the dictionary.
function translatePhrase(phrase) {
  // lower‑case, split on spaces and punctuation, keep punctuation.
  return phrase
    .toLowerCase()
    .split(/\b/)
    .map(token => {
      const trimmed = token.trim();
      if (!trimmed) return token; // whitespace or punctuation
      // If token is a word present in dict, replace it.
      if (dict[trimmed]) return dict[trimmed];
      // Preserve original token (capitalisation) if not found.
      return token;
    })
    .join('')
    .replace(/\s+/g, ' ') // collapse multiple spaces
    .trim();
}

// Helper: create a future‑tense version.
function futureVersion(translation) {
  // Simple heuristic: prepend "Voy a " if the phrase does not already start with it.
  const cleaned = translation.charAt(0).toUpperCase() + translation.slice(1);
  if (/^Voy a /i.test(cleaned)) return cleaned;
  return `Voy a ${cleaned}`;
}

// Process each record
records = records.map(rec => {
  const eng = rec.primary || '';
  const direct = translatePhrase(eng);
  const future = futureVersion(direct);
  // Combine two expressions separated by " / "
  rec.spanish = `${direct} / ${future}`;
  return rec;
});

// Write back to file (pretty‑printed for readability)
fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
console.log('Spanish translations regenerated for', records.length, 'records.');
