const https = require('https');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = 'engdb-11b7f';
const COLLECTION = 'EnglishExpressions';
const API_KEY = 'AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M';

const fetchAllDocuments = async () => {
    let allDocuments = [];
    let nextPageToken = null;

    do {
        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}?key=${API_KEY}&pageSize=1000${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
        
        const response = await new Promise((resolve, reject) => {
            https.get(url, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => resolve(JSON.parse(body)));
            }).on('error', reject);
        });

        if (response.documents) {
            allDocuments = allDocuments.concat(response.documents);
        }
        nextPageToken = response.nextPageToken;
    } while (nextPageToken);

    return allDocuments.map(doc => ({
        docId: doc.name.split('/').pop(),
        id: doc.fields.id ? parseInt(doc.fields.id.integerValue) : null,
        primary: doc.fields.primary ? doc.fields.primary.stringValue : ''
    }));
};

const findSimilarity = (s1, s2) => {
    const normalize = s => s.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const n1 = normalize(s1);
    const n2 = normalize(s2);
    
    if (n1 === n2) return 1.0;
    if (n1.length > 3 && n2.length > 3 && (n1.includes(n2) || n2.includes(n1))) return 0.8;
    return 0;
};

const deleteDocument = (docId) => {
    return new Promise((resolve, reject) => {
        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${docId}?key=${API_KEY}`;
        
        const req = https.request(url, { method: 'DELETE' }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log(`Successfully deleted ${docId}`);
                resolve();
            } else {
                console.error(`Failed to delete ${docId}: ${res.statusCode}`);
                resolve(); // Continue even if one fails
            }
        });

        req.on('error', reject);
        req.end();
    });
};

const runCleanup = async () => {
    const docs = await fetchAllDocuments();
    const deleteIds = new Set();

    for (let i = 0; i < docs.length; i++) {
        for (let j = i + 1; j < docs.length; j++) {
            if (deleteIds.has(docs[i].docId) || deleteIds.has(docs[j].docId)) continue;

            const score = findSimilarity(docs[i].primary, docs[j].primary);
            if (score > 0.7) {
                // Determine which one to delete (choose the higher ID as redundant)
                const toDelete = docs[i].id > docs[j].id ? docs[i] : docs[j];
                deleteIds.add(toDelete.docId);
                console.log(`Marked for deletion (Similarity ${score}): ID ${toDelete.id} (${toDelete.docId}) - "${toDelete.primary}"`);
            }
        }
    }

    const idsArray = Array.from(deleteIds);
    console.log(`\nTotal redundant documents identified: ${idsArray.length}`);
    
    if (idsArray.length === 0) {
        console.log("Nothing to delete.");
        return;
    }

    console.log("Starting deletion in batches...");
    const batchSize = 10;
    for (let i = 0; i < idsArray.length; i += batchSize) {
        const batch = idsArray.slice(i, i + batchSize);
        await Promise.all(batch.map(id => deleteDocument(id)));
        console.log(`Deleted batch ${i / batchSize + 1} / ${Math.ceil(idsArray.length / batchSize)}`);
    }

    console.log("Cleanup complete!");
};

runCleanup().catch(console.error);
