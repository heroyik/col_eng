const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = 'engdb-11b7f';
const COLLECTION = 'EnglishExpressions';
const API_KEY = 'AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M';

const uploadDocument = (docId, data) => {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            fields: {
                id: { integerValue: data.id },
                primary: { stringValue: data.primary },
                meaning: { stringValue: data.meaning },
                similar: {
                    arrayValue: {
                        values: data.similar.map(s => ({ stringValue: s }))
                    }
                },
                example: { stringValue: data.example },
                updatedAt: { timestampValue: data.updatedAt || new Date().toISOString() }
            }
        });

        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${docId}?key=${API_KEY}`;
        
        const req = https.request(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    console.log(`Successfully uploaded ${docId}`);
                    resolve();
                } else {
                    console.error(`Failed to upload ${docId}: ${res.statusCode} ${body}`);
                    reject(new Error(body));
                }
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
};

const bulkUpload = async () => {
    const jsonPath = path.join(__dirname, 'expressions_upload.json');
    const expressions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const docIds = Object.keys(expressions);

    console.log(`Starting bulk upload of ${docIds.length} expressions...`);

    // Process in batches of 10 to avoid hitting limits or overwhelming the connection
    const batchSize = 10;
    for (let i = 0; i < docIds.length; i += batchSize) {
        const batch = docIds.slice(i, i + batchSize);
        await Promise.all(batch.map(docId => uploadDocument(docId, expressions[docId])));
        console.log(`Completed batch ${i / batchSize + 1} / ${Math.ceil(docIds.length / batchSize)}`);
    }

    console.log('Bulk upload complete!');
};

bulkUpload().catch(console.error);
