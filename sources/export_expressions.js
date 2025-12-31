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
const OUTPUT_FILE = path.join(__dirname, '../db/20260101_COL_ENG.json');

async function exportData() {
    console.log(`Starting optimized export from collection: ${COLLECTION_NAME}...`);
    
    try {
        // Optimized I/O: Select only the required fields
        const snapshot = await db.collection(COLLECTION_NAME)
            .select('primary', 'meaning', 'similar', 'example')
            .get();

        console.log(`Successfully retrieved ${snapshot.size} documents.`);

        const data = snapshot.docs.map(doc => {
            const docData = doc.data();
            return {
                primary: docData.primary || "",
                meaning: docData.meaning || "",
                similar: docData.similar || [],
                example: docData.example || ""
            };
        });

        // Ensure the directory exists
        const dir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Data successfully saved to: ${OUTPUT_FILE}`);
        
    } catch (error) {
        console.error('Error exporting data:', error);
        process.exit(1);
    }
}

exportData().then(() => {
    process.exit(0);
});
