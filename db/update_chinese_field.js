const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Configuration
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../engdb-11b7f-firebase-adminsdk-fbsvc-85239282ab.json');
const DATA_FILE_PATH = path.join(__dirname, 'DONE_20260101_COL_ENG_1484_vietnamese_complete.json');
const COLLECTION_NAME = 'EnglishExpressions';
const BATCH_SIZE = 400; // Slightly conservative batch size
const DELAY_BETWEEN_BATCHES_MS = 1000; // Rate limiting
const DRY_RUN = false; // Set to false to perform actual writes

// Initialize Firebase
if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`Error: Service account file not found at ${SERVICE_ACCOUNT_PATH}`);
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Helper function for delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function updateChineseField() {
  try {
    // 1. Read Data
    console.log(`Reading data from ${DATA_FILE_PATH}...`);
    const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf8');
    const records = JSON.parse(rawData);
    
    console.log(`Loaded ${records.length} records.`);

    // 2. Validate Data
    const validRecords = records.filter(r => r.id && r.chinese);
    if (validRecords.length !== records.length) {
      console.warn(`Warning: ${records.length - validRecords.length} records skipped due to missing ID or Chinese field.`);
    }

    // 3. Process in Batches
    const totalBatches = Math.ceil(validRecords.length / BATCH_SIZE);
    
    console.log(`Starting update process. Total batches: ${totalBatches}`);
    if (DRY_RUN) {
        console.log("!!! DRY RUN MODE: No changes will be written to Firestore. !!!");
    }

    for (let i = 0; i < totalBatches; i++) {
        const start = i * BATCH_SIZE;
        const end = start + BATCH_SIZE;
        const chunk = validRecords.slice(start, end);
        const batch = db.batch();

        chunk.forEach(record => {
            // Format ID: expression_0001
            const docId = `expression_${String(record.id).padStart(4, '0')}`;
            const docRef = db.collection(COLLECTION_NAME).doc(docId);
            
            // Log update for first item of first batch for verification
            if (i === 0 && chunk.indexOf(record) === 0) {
                console.log(`[Sample Update] Doc ID: ${docId}, Chinese: ${record.chinese}`);
            }

            // Only update the 'chinese' field
            batch.update(docRef, { chinese: record.chinese });
        });

        if (!DRY_RUN) {
            try {
                await batch.commit();
                console.log(`Batch ${i + 1}/${totalBatches} committed successfully. (${chunk.length} records)`);
            } catch (batchError) {
                console.error(`Error committing batch ${i + 1}:`, batchError);
                // In production, might retry. Here, throw to stop.
                throw batchError; 
            }

            // Rate limiting
            if (i < totalBatches - 1) {
                await sleep(DELAY_BETWEEN_BATCHES_MS);
            }
        } else {
            console.log(`[DRY RUN] Batch ${i + 1}/${totalBatches} would be committed. (${chunk.length} records)`);
        }
    }

    console.log('Update process completed successfully!');

  } catch (error) {
    console.error('Update failed:', error);
    process.exit(1);
  }
}

updateChineseField();
