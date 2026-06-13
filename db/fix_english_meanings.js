/**
 * Translate English meanings to Korean colloquial using Gemini AI (Vertex AI).
 * Uses gcloud ADC auth — no API key or service account needed.
 *
 * Usage:
 *   node db/fix_english_meanings.js              # Dry run (preview only)
 *   node db/fix_english_meanings.js --apply       # Save translations to JSON
 *   node db/fix_english_meanings.js --upload      # Apply + upload to Firestore
 *
 * Input:  2026-06-07-data.json (project root)
 * Output: db/translated_meanings.json (review file)
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const { VertexAI } = require('@google-cloud/vertexai');

// ─── Config ───────────────────────────────────────────────────────────────────
const PROJECT_ID = 'engdb-11b7f';
const LOCATION = 'us-central1';
const MODEL = 'gemini-2.5-flash';
const TEMPERATURE = 0.3;
const DELAY_MS = 1500;          // Throttle between API calls

// ─── CLI args ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = !args.includes('--apply') && !args.includes('--upload');
const DO_UPLOAD = args.includes('--upload');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Init ─────────────────────────────────────────────────────────────────────
const dataPath = path.join(__dirname, '..', '2026-06-07-data.json');
if (!fs.existsSync(dataPath)) {
  console.error(`❌ Data file not found: ${dataPath}`);
  console.error('   Run "node db/download_all_data.js" first.');
  process.exit(1);
}

const allRecords = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
console.log(`Loaded ${allRecords.length} records from 2026-06-07-data.json`);

// Filter: meaning exists but has NO Korean characters
const targets = allRecords.filter(r => r.meaning && !/[\uAC00-\uD7AF]/.test(r.meaning));
console.log(`Found ${targets.length} records with English meanings\n`);

if (targets.length === 0) {
  console.log('Nothing to translate. Exiting.');
  process.exit(0);
}

// ─── Gemini setup ─────────────────────────────────────────────────────────────
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const model = vertexAI.getGenerativeModel({
  model: MODEL,
  generationConfig: {
    temperature: TEMPERATURE,
    maxOutputTokens: 256,
  },
});

// ─── Translation prompt ───────────────────────────────────────────────────────
function buildPrompt(primary, englishMeaning) {
  return `You are a Korean language expert specializing in natural, everyday Korean (구어체).
Translate the English meaning below into ONE natural Korean colloquial sentence.
The translation should sound like how a Korean person would explain this expression in casual conversation.

Primary expression: "${primary}"
English meaning: "${englishMeaning}"

Rules:
- Output ONLY the Korean translation, nothing else.
- Keep it concise (1-2 short phrases max).
- Use casual/colloquial Korean (반말 or ~해요 style, whichever feels more natural).
- Do NOT include the English text in your response.
- Do NOT add explanations, quotes, or punctuation marks around the translation.`;
}

// ─── Translate single record ─────────────────────────────────────────────────
async function translateOne(primary, englishMeaning) {
  const prompt = buildPrompt(primary, englishMeaning);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const candidate = response.candidates && response.candidates[0];
  if (!candidate || !candidate.content || !candidate.content.parts) {
    throw new Error('No candidates returned from model');
  }
  const textPart = candidate.content.parts.find(p => typeof p.text === 'string');
  if (!textPart) {
    throw new Error('No text part in response');
  }
  const text = textPart.text.trim();

  // Validate: must contain Korean characters
  if (!/[\uAC00-\uD7AF]/.test(text)) {
    console.warn(`  ⚠️ Warning: Response has no Korean characters: "${text}"`);
  }

  return text;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE — no files will be written\n');
  }

  console.log('─'.repeat(70));
  console.log('English → Korean Translation Preview');
  console.log('─'.repeat(70));

  // Show all targets first
  targets.forEach((r, i) => {
    console.log(`\n  ${(i + 1).toString().padStart(2)}. [ID:${r.id}] "${r.primary}"`);
    console.log(`      English: ${r.meaning}`);
  });

  console.log('\n' + '─'.repeat(70));
  console.log(`Translating ${targets.length} records (1 at a time)...\n`);

  // Translate one record at a time
  const results = [];

  for (let i = 0; i < targets.length; i++) {
    const record = targets[i];
    const progress = `${i + 1}/${targets.length}`;

    process.stdout.write(`  [${progress}] "${record.primary}"... `);

    try {
      const newMeaning = await translateOne(record.primary, record.meaning);

      results.push({
        docId: record._docId,
        id: record.id,
        primary: record.primary,
        oldMeaning: record.meaning,
        newMeaning,
      });

      console.log(`✅ ${newMeaning}`);
    } catch (err) {
      console.log(`❌ ${err.message}`);
      results.push({
        docId: record._docId,
        id: record.id,
        primary: record.primary,
        oldMeaning: record.meaning,
        newMeaning: null,
        error: err.message,
      });
    }

    if (i < targets.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // ─── Summary ──────────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(70));
  console.log('Summary');
  console.log('─'.repeat(70));

  const success = results.filter(r => r.newMeaning);
  const failed = results.filter(r => !r.newMeaning);

  console.log(`  ✅ Translated: ${success.length}`);
  console.log(`  ❌ Failed:     ${failed.length}`);

  if (success.length > 0) {
    console.log('\n  Translation results:');
    success.forEach((r, i) => {
      console.log(`    ${(i + 1).toString().padStart(2)}. [${r.id}] "${r.primary}"`);
      console.log(`        ${r.oldMeaning}`);
      console.log(`        → ${r.newMeaning}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n  Failed records:');
    failed.forEach((r, i) => {
      console.log(`    ${(i + 1).toString().padStart(2)}. [${r.id}] "${r.primary}" — ${r.error}`);
    });
  }

  // ─── Save results ────────────────────────────────────────────────────────
  if (!DRY_RUN) {
    const outputPath = path.join(__dirname, 'translated_meanings.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf8');
    console.log(`\n  💾 Saved to: db/translated_meanings.json`);
  } else {
    console.log('\n  🔍 DRY RUN — no files written');
    console.log('  Run with --apply to save translations to JSON');
  }

  // ─── Upload to Firestore ────────────────────────────────────────────────
  if (DO_UPLOAD && success.length > 0) {
    console.log('\n' + '─'.repeat(70));
    console.log('Uploading to Firestore...');
    console.log('─'.repeat(70));

    // Validate _docId before upload
    const missingDocId = success.filter(r => !r.docId);
    if (missingDocId.length > 0) {
      console.error(`\n  ❌ ${missingDocId.length} records missing _docId. Cannot upload.`);
      console.error('     Re-run download_all_data.js to refresh the data file.');
      process.exit(1);
    }

    try {
      admin.initializeApp({ projectId: PROJECT_ID });
    } catch (err) {
      if (!err.message.includes('already initialized')) {
        console.error(`\n  ❌ Firebase init failed: ${err.message}`);
        console.error('     Run "gcloud auth application-default login" first.');
        process.exit(1);
      }
    }
    const db = admin.firestore();
    const COLLECTION = 'EnglishExpressions';

    let uploaded = 0;
    for (let i = 0; i < success.length; i += 400) {
      const batch = success.slice(i, i + 400);
      const firestoreBatch = db.batch();

      batch.forEach(r => {
        const docRef = db.collection(COLLECTION).doc(r.docId);
        firestoreBatch.update(docRef, { meaning: r.newMeaning });
      });

      await firestoreBatch.commit();
      uploaded += batch.length;
      console.log(`  ✓ Uploaded ${uploaded}/${success.length}`);

      if (i + 400 < success.length) await sleep(500);
    }

    console.log(`\n  ✅ Firestore updated: ${uploaded} records`);
  } else if (DO_UPLOAD) {
    console.log('\n  ⚠️ No successful translations to upload.');
  }

  console.log('\n✅ Done.');
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('\n❌ Fatal error:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
