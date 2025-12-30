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
const END_ID = 1442; // Or slightly higher to catch all

async function renameDocuments() {
  console.log(`Querying ${COLLECTION_NAME} for IDs ${START_ID} to ${END_ID}...`);
  
  const snapshot = await db.collection(COLLECTION_NAME)
    .where('id', '>=', START_ID)
    .where('id', '<=', END_ID)
    .get();

  if (snapshot.empty) {
    console.log('No matching documents found.');
    return;
  }

  console.log(`Found ${snapshot.size} documents to rename.`);

  let batch = db.batch();
  let opCount = 0;
  let batchCount = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    const oldId = doc.id;
    const newId = `expression_${data.id}`;

    // Skip if already correct to avoid redundant writes/deletes
    if (oldId === newId) {
      console.log(`Skipping ${oldId} (already renamed)`);
      continue;
    }

    const newDocRef = db.collection(COLLECTION_NAME).doc(newId);
    const oldDocRef = db.collection(COLLECTION_NAME).doc(oldId);

    // Copy to new ID
    batch.set(newDocRef, data);
    // Delete old ID
    batch.delete(oldDocRef);

    opCount += 2; // 1 set + 1 delete

    // Commit if batch is getting full (limit is 500 ops)
    // Using 200 ops (100 docs) to be safe
    if (opCount >= 200) {
      console.log(`Committing batch ${++batchCount}...`);
      await batch.commit();
      batch = db.batch();
      opCount = 0;
      // Rate limit safety
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Commit remaining
  if (opCount > 0) {
    console.log(`Committing final batch ${++batchCount}...`);
    await batch.commit();
  }

  console.log('Renaming complete.');
}

renameDocuments().catch(console.error);
