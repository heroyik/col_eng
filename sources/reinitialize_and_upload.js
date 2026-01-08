const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('../engdb-11b7f-firebase-adminsdk-fbsvc-85239282ab.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();
const COLLECTION_NAME = 'EnglishExpressions';
const INPUT_FILE = path.join(__dirname, '../db/20260101_COL_ENG_1479_backupjson');

async function deleteCollection(collectionPath) {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.limit(500);

    return new Promise((resolve, reject) => {
        deleteQueryBatch(query, resolve).catch(reject);
    });
}

async function deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
        resolve();
        return;
    }

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Deleted ${batchSize} documents...`);

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
        deleteQueryBatch(query, resolve);
    });
}

async function uploadData() {
    console.log(`Reading data from ${INPUT_FILE}...`);
    const rawData = fs.readFileSync(INPUT_FILE, 'utf8');
    const data = JSON.parse(rawData);
    console.log(`Found ${data.length} records to upload.`);

    console.log(`Deleting all existing documents in ${COLLECTION_NAME}...`);
    await deleteCollection(COLLECTION_NAME);
    console.log('Collection reinitialized successfully.');

    console.log('Starting upload...');
    let count = 0;
    const batchSize = 500;
    
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = db.batch();
        const chunk = data.slice(i, i + batchSize);

        chunk.forEach((item, index) => {
            const idValue = i + index + 1;
            const docId = `expression_${idValue.toString().padStart(4, '0')}`;
            const docRef = db.collection(COLLECTION_NAME).doc(docId);
            
            batch.set(docRef, {
                ...item,
                id: idValue
            });
        });

        await batch.commit();
        count += chunk.length;
        console.log(`Uploaded ${count} / ${data.length} documents...`);
        
        // Brief pause to avoid overwhelming Firestore
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // New: Update Metadata Document
    console.log('Updating sync metadata...');
    const now = new Date();
    const metadataRef = db.collection('SystemMetadata').doc('sync');
    await metadataRef.set({
        totalCount: count,
        lastUpdatedAt: admin.firestore.Timestamp.fromDate(now),
        version: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
    });
    console.log('Metadata updated successfully.');

    console.log('Upload completed successfully!');
}

uploadData().catch(error => {
    console.error('Error during reinitialization and upload:', error);
    process.exit(1);
});
