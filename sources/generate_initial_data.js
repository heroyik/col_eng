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

async function generateInitialData() {
    try {
        console.log('Fetching EnglishExpressions...');
        const snapshot = await db.collection('EnglishExpressions').orderBy('id', 'asc').get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        const expressions = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            // Include docId as app.js seems to use it, though primarily relies on numeric 'id'
            expressions.push({
                docId: doc.id,
                ...data
            });
        });

        console.log(`Fetched ${expressions.length} expressions.`);

        const outputPath = path.join(__dirname, '../public/initial_data.json');
        fs.writeFileSync(outputPath, JSON.stringify(expressions, null, 2)); // Prettified for debug, can be minified later if needed

        console.log(`Successfully generated ${outputPath}`);
        console.log(`Size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);

    } catch (error) {
        console.error('Error generating data:', error);
        process.exit(1);
    }
}

generateInitialData();
