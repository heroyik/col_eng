const https = require('https');

const projectId = "engdb-11b7f";
const collection = "EnglishExpressions";

async function deleteDoc(docId) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'firestore.googleapis.com',
      path: `/v1/projects/${projectId}/databases/(default)/documents/${collection}/${docId}`,
      method: 'DELETE',
    };

    const req = https.request(options, (res) => {
      if (res.statusCode === 200 || res.statusCode === 404) {
        console.log(`Successfully deleted ${docId}${res.statusCode === 404 ? ' (already gone)' : ''}`);
        resolve();
      } else {
        console.error(`Error deleting ${docId}: ${res.statusCode}`);
        resolve(); // Continue even on error
      }
    });

    req.on('error', (e) => {
      console.error(`Request error for ${docId}: ${e.message}`);
      resolve();
    });

    req.end();
  });
}

async function runDeletion(startId, endId) {
  for (let i = startId; i <= endId; i++) {
    const docId = `expression_${i}`;
    await deleteDoc(docId);
    // Add a small delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 100));
  }
}

const start = 380;
const end = 681;

console.log(`Starting deletion of IDs ${start} to ${end}...`);
runDeletion(start, end).then(() => {
  console.log("Deletion process completed.");
});
