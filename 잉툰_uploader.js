const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = 'engdb-11b7f';
const COLLECTION = 'EnglishExpressions';
const API_KEY = 'AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M';

const uploadDocument = (id, data) => {
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

        // Use the ID as the document ID for consistency
        const docId = String(id);
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
                    console.log(`Successfully uploaded ID ${id}`);
                    resolve();
                } else {
                    console.error(`Failed to upload ID ${id}: ${res.statusCode} ${body}`);
                    reject(new Error(body));
                }
            });
        });

        req.on('error', reject);
        req.write(payload);
        req.end();
    });
};

const runUpload = async () => {
    const jsonPath = path.join(__dirname, '잉툰upload.json');
    const expressions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    console.log(`Starting upload of ${expressions.length} 잉툰 expressions...`);

    const batchSize = 5; // Smaller batch just to be safe with rate limits
    for (let i = 0; i < expressions.length; i += batchSize) {
        const batch = expressions.slice(i, i + batchSize);
        await Promise.all(batch.map(item => uploadDocument(item.id, item)));
        console.log(`Completed batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(expressions.length / batchSize)}`);
    }

    console.log('Upload complete!');
};

runUpload().catch(console.error);
