const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, '../engdb-11b7f-firebase-adminsdk-fbsvc-85239282ab.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`Error: Service account key not found at ${serviceAccountPath}`);
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const COLLECTION_NAME = 'EnglishExpressions';
const START_ID = 951;

async function uploadData() {
  const sourcePath = path.join(__dirname, 'importable.json');
  if (!fs.existsSync(sourcePath)) {
    console.error('Error: sources/importable.json not found.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(sourcePath, 'utf8');
  const records = JSON.parse(rawData);

  console.log(`Found ${records.length} records to upload.`);

  let batch = db.batch();
  let operationCount = 0;
  let currentId = START_ID;
  let batchCount = 0;

  for (const record of records) {
    // Map fields
    const docData = {
      id: currentId,
      primary: record.primary,
      meaning: record.meaning,
      similar: record.similar || [], // Ensure array
      example: Array.isArray(record.examples) ? record.examples.join('\n') : (record.examples || ''),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Create a new document reference. 
    // We could use the ID as the document ID (db.collection(NAME).doc(String(currentId)))
    // OR likely use auto-generated ID but store 'id' field.
    // Looking at previous 'full.json', 'EnglishExpressions' had integer IDs inside the doc, 
    // but the document ID itself isn't visible in the export. 
    // Usually with integer IDs, they might be used as the doc key too.
    // To be safe and avoid overwriting if IDs are keys, check if we should use ID as key.
    // However, usually auto-ID is safer if we aren't sure. 
    // But specific "start from 951" implies a sequence.
    // Let's assume we create a new doc ref (auto-id) and put 'id' field inside, 
    // UNLESS the user implies the doc ID should be the number.
    // The previous export showed `id` as a field.
    // I will use `doc()` to generate a random ID, and include `id: 951` in the body.
    
    const docRef = db.collection(COLLECTION_NAME).doc(); 
    batch.set(docRef, docData);

    currentId++;
    operationCount++;

    // Commit batch if limit reached (500)
    if (operationCount >= 400) { // Using 400 to be safe
      console.log(`Committing batch ${++batchCount} (records ${currentId - 400} to ${currentId - 1})...`);
      await batch.commit();
      batch = db.batch();
      operationCount = 0;
      // Small delay to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Commit remaining
  if (operationCount > 0) {
    console.log(`Committing final batch ${++batchCount} (${operationCount} records)...`);
    await batch.commit();
  }

  console.log('Upload complete.');
}

uploadData().catch(console.error);
