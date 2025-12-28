const https = require('https');

const API_KEY = 'AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M';
const PROJECT_ID = 'engdb-11b7f';
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/EnglishExpressions`;

async function uploadDocument(doc) {
  const docId = `expression_${doc.id}`;
  const url = `${BASE_URL}/${docId}?key=${API_KEY}`;
  
  const payload = JSON.stringify({
    fields: {
      id: { integerValue: doc.id },
      primary: { stringValue: doc.primary },
      meaning: { stringValue: doc.meaning },
      similar: {
        arrayValue: {
          values: doc.similar.map(s => ({ stringValue: s }))
        }
      },
      example: { stringValue: doc.example },
      updatedAt: { timestampValue: new Date().toISOString() }
    }
  });

  return new Promise((resolve, reject) => {
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
          console.error(`Failed to upload ${docId}: ${res.statusCode}`, body);
          reject(new Error(body));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function uploadBatch(batch) {
  for (const doc of batch) {
    try {
      await uploadDocument(doc);
    } catch (e) {
      console.error(`Error uploading ${doc.id}, continuing...`);
    }
  }
}

module.exports = { uploadBatch };
