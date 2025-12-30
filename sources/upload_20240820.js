const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../engdb-11b7f-firebase-adminsdk-fbsvc-85239282ab.json');
const DATA_FILE_PATH = path.join(__dirname, 'firebase_import_ready_20240820.json');
const COLLECTION_NAME = 'expressions';
const BATCH_SIZE = 100; // Smaller batches to be safe and avoid "Payload too large" or rate spikes
const DELAY_BETWEEN_BATCHES_MS = 2000; // 2 second delay to respect rate limits

// --- INITIALIZATION ---
if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
    console.error(`Error: Service account key not found at ${SERVICE_ACCOUNT_PATH}`);
    process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- UTILS ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function uploadData() {
    try {
        const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        const items = JSON.parse(rawData);
        
        console.log(`Loaded ${items.length} items for upload.`);
        console.log(`Configuration: Batch Size = ${BATCH_SIZE}, Delay = ${DELAY_BETWEEN_BATCHES_MS}ms`);

        const totalBatches = Math.ceil(items.length / BATCH_SIZE);
        
        for (let i = 0; i < totalBatches; i++) {
            const start = i * BATCH_SIZE;
            const end = start + BATCH_SIZE;
            const chunk = items.slice(start, end);
            
            const batch = db.batch();
            let operationCount = 0;

            chunk.forEach(item => {
                // Sanitize ID: Remove slashes which are invalid in document IDs
                const docId = item.primary.replace(/\//g, '_');
                const docRef = db.collection(COLLECTION_NAME).doc(docId);

                // Map fields to Firestore Schema
                const docData = {
                    text: item.primary,
                    meaning: item.meaning,
                    synonyms: item.similar || [],
                    examples: item.examples || [],
                    source: '영어20240820_txt',
                    uploadedAt: admin.firestore.FieldValue.serverTimestamp()
                };

                batch.set(docRef, docData, { merge: true }); // Merge to avoid overwriting existing fields if any
                operationCount++;
            });

            if (operationCount > 0) {
                console.log(`[Batch ${i + 1}/${totalBatches}] Committing ${operationCount} items...`);
                await batch.commit();
                console.log(`[Batch ${i + 1}/${totalBatches}] Success.`);
                
                if (i < totalBatches - 1) {
                    console.log(`Waiting ${DELAY_BETWEEN_BATCHES_MS}ms to respect quota...`);
                    await sleep(DELAY_BETWEEN_BATCHES_MS);
                }
            }
        }

        console.log('Upload complete!');

    } catch (error) {
        console.error('Upload failed:', error);
        
        // Detailed Quota Error Diagnosis
        if (error.code === 8 || error.message.includes('quota')) {
            console.error('\n!!! QUOTA EXCEEDED ERROR RESTORATION GUIDE !!!');
            console.error('1. Daily Free Tier Limit: You may have hit the 20,000 writes/day limit on the Spark plan.');
            console.error('   -> Solution: Upgrade to Blaze plan (Pay-as-you-go) or wait 24 hours.');
            console.error('2. Rate Limit: Too many writes per second.');
            console.error(`   -> Solution: Increase 'DELAY_BETWEEN_BATCHES_MS' in this script (Currently: ${DELAY_BETWEEN_BATCHES_MS}ms).`);
        }
    }
}

uploadData();
