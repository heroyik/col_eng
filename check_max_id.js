const https = require('https');

const projectId = 'engdb-11b7f';
const collectionId = 'EnglishExpressions';
const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;

const query = JSON.stringify({
  structuredQuery: {
    from: [{ collectionId }],
    select: { fields: [{ fieldPath: 'id' }] },
    orderBy: [{ field: { fieldPath: 'id' }, direction: 'DESCENDING' }],
    limit: 1
  }
});

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': query.length
  }
};

const req = https.request(url, options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const results = JSON.parse(data);
      console.log(JSON.stringify(results, null, 2));
    } catch (e) {
      console.error('Failed to parse response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
});

req.write(query);
req.end();
