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

const runSearch = async () => {
    const docs = await fetchAllDocuments();
    let log = [];
    log.push(`Total documents in Firestore: ${docs.length}`);

    const similarities = [];
    for (let i = 0; i < docs.length; i++) {
        for (let j = i + 1; j < docs.length; j++) {
            const score = findSimilarity(docs[i].primary, docs[j].primary);
            if (score > 0.7) {
                similarities.push({
                    score,
                    doc1: docs[i],
                    doc2: docs[j]
                });
            }
        }
    }

    if (similarities.length === 0) {
        log.push("No similar records found.");
    } else {
        log.push(`Found ${similarities.length} similar pairs:\n`);
        similarities.sort((a, b) => b.score - a.score).forEach(sim => {
            log.push(`[Score: ${sim.score}]`);
            log.push(`  ID ${sim.doc1.id} (${sim.doc1.docId}): "${sim.doc1.primary}"`);
            log.push(`  ID ${sim.doc2.id} (${sim.doc2.docId}): "${sim.doc2.primary}"`);
            log.push('---');
        });
    }

    fs.writeFileSync(path.join(__dirname, 'similarity_report.txt'), log.join('\n'), 'utf8');
};

runSearch().catch(console.error);
