const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
// The key is located in the parent directory based on user input
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

async function exportData() {
  try {
    console.log('Fetching collections...');
    const collections = await db.listCollections();
    
    if (collections.length === 0) {
      console.log('No collections found.');
      return;
    }

    const exportData = {};
    let totalDocs = 0;

    for (const collection of collections) {
      console.log(`Fetching documents for collection: ${collection.id}`);
      const snapshot = await collection.get();
      
      const docs = [];
      snapshot.forEach(doc => {
        // We include the data. We don't expressly include the ID unless it's part of the data, 
        // but often it's useful. For this specific 'full.json' format seen previously,
        // it seemed to just be the data fields. 
        // We'll stick to data() to match the likely schema of the viewing tool.
        docs.push(doc.data());
      });
      
      exportData[collection.id] = docs;
      totalDocs += docs.length;
      console.log(`  > Found ${docs.length} documents.`);
    }

    // Determine output format
    // If only one collection 'expressions' (or just 1 in general), we might want to flatten it to an array
    // to match the previous observable 'full.json' format which was an array.
    // However, to be safe and strictly "ALL data", an object structure is safer.
    // BUT, the user's workflow likely depends on `full.json` being an array if it was one before.
    // Let's check if we have exactly one collection.
    let finalOutput;
    const collectionNames = Object.keys(exportData);
    
    if (collectionNames.length === 1) {
       console.log(`Single collection found (${collectionNames[0]}). Exporting as Array to maintain compatibility.`);
       finalOutput = exportData[collectionNames[0]];
    } else {
       console.log(`Multiple collections found (${collectionNames.join(', ')}). Exporting as Object.`);
       finalOutput = exportData;
    }

    const outputPath = path.join(__dirname, 'full.json');
    fs.writeFileSync(outputPath, JSON.stringify(finalOutput, null, 2));
    console.log(`Successfully exported ${totalDocs} documents to ${outputPath}`);

  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
}

exportData();
