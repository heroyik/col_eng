/**
 * Download ALL records from Firestore EnglishExpressions collection.
 * Uses gcloud Application Default Credentials (ADC) — no service account file needed.
 * 
 * Usage: node db/download_all_data.js
 * Output: YYYY-MM-DD-data.json (in project root)
 * 
 * I/O Optimizations:
 * - Streams results into memory, writes once at the end
 * - Uses parallel batch reads with throttling
 * - Minimal JSON serialization overhead
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────
const COLLECTION = 'EnglishExpressions';
const BATCH_SIZE = 500;          // Firestore max per query
const DELAY_MS = 200;            // Throttle between batches

// ─── Init Firebase with ADC ───────────────────────────────────────────────────
admin.initializeApp({
  projectId: 'engdb-11b7f'
  // No credential — uses gcloud auth ADC
});

const db = admin.firestore();
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ─── Main ─────────────────────────────────────────────────────────────────────
async function downloadAll() {
  const startTime = Date.now();
  console.log(`[${new Date().toISOString()}] Starting Firestore download...`);
  console.log(`Collection: ${COLLECTION}`);
  console.log(`Batch size: ${BATCH_SIZE}`);

  // Phase 1: Count total documents
  console.log('\n[Phase 1] Counting documents...');
  const countSnap = await db.collection(COLLECTION).count().get();
  const totalCount = countSnap.data().count;
  console.log(`Total documents: ${totalCount}`);

  if (totalCount === 0) {
    console.log('No documents found. Exiting.');
    process.exit(0);
  }

  // Phase 2: Parallel batch download
  console.log(`\n[Phase 2] Downloading in batches of ${BATCH_SIZE}...`);
  const allRecords = [];
  let lastId = 0;
  let fetched = 0;
  let batchNum = 0;

  while (fetched < totalCount) {
    // Fetch one batch
    const q = db.collection(COLLECTION)
      .orderBy('id', 'asc')
      .where('id', '>', lastId)
      .limit(BATCH_SIZE);

    const snap = await q.get();
    if (snap.empty) break;

    snap.forEach(doc => {
      const data = doc.data();
      allRecords.push({ _docId: doc.id, ...data });

      if (data.id > lastId) lastId = data.id;
    });

    fetched += snap.size;
    batchNum++;

    // Progress bar
    const pct = Math.round((fetched / totalCount) * 100);
    const bar = '█'.repeat(Math.floor(pct / 5)) + '░'.repeat(20 - Math.floor(pct / 5));
    process.stdout.write(`\r  ${bar} ${pct}% (${fetched}/${totalCount})`);

    // Throttle
    if (snap.size === BATCH_SIZE) {
      await sleep(DELAY_MS);
    }
  }

  console.log('\n');

  // Phase 3: Write JSON file (single I/O write)
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const filename = `${dateStr}-data.json`;
  const outputPath = path.join(__dirname, '..', filename);

  console.log(`[Phase 3] Writing ${allRecords.length} records to ${filename}...`);
  fs.writeFileSync(outputPath, JSON.stringify(allRecords), 'utf8');

  const fileSizeMB = (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log(`\n✅ Done!`);
  console.log(`   File: ${filename}`);
  console.log(`   Records: ${allRecords.length}`);
  console.log(`   Size: ${fileSizeMB} MB`);
  console.log(`   Time: ${elapsed}s`);

  // Phase 4: Quick meaning analysis
  console.log(`\n[Phase 4] Analyzing 'meaning' field...`);
  const noKorean = allRecords.filter(r => r.meaning && !/[\uAC00-\uD7AF]/.test(r.meaning));
  const empty = allRecords.filter(r => !r.meaning || r.meaning.trim() === '');
  const hasKorean = allRecords.filter(r => r.meaning && /[\uAC00-\uD7AF]/.test(r.meaning));

  console.log(`   Total records:      ${allRecords.length}`);
  console.log(`   Has Korean meaning: ${hasKorean.length}`);
  console.log(`   English meaning:    ${noKorean.length}`);
  console.log(`   Empty meaning:      ${empty.length}`);

  if (noKorean.length > 0) {
    console.log(`\n   📋 English meaning records (first 20):`);
    noKorean.slice(0, 20).forEach((r, i) => {
      console.log(`   ${(i + 1).toString().padStart(3)}. [${r.id}] "${r.primary}" → "${r.meaning}"`);
    });
  }

  return { allRecords, noKorean, empty, hasKorean };
}

downloadAll()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('\n❌ Download failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  });
