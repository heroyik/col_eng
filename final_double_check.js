const fs = require('fs');
const path = require('path');
const https = require('https');

const PROJECT_ID = 'engdb-11b7f';
const COLLECTION = 'EnglishExpressions';
const API_KEY = 'AIzaSyC-WalCvtgdBIGTUYNhnWjoFoNFAMSUi3M';

const fetchDocument = (docId) => {
    return new Promise((resolve, reject) => {
        const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${docId}?key=${API_KEY}`;
        
        https.get(url, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const doc = JSON.parse(body);
                    resolve({
                        id: parseInt(doc.fields.id.integerValue),
                        primary: doc.fields.primary.stringValue,
                        meaning: doc.fields.meaning.stringValue
                    });
                } else {
                    reject(new Error(`Failed to fetch ${docId}: ${res.statusCode} ${body}`));
                }
            });
        }).on('error', reject);
    });
};

const verifyAll = async () => {
    const txtPath = path.join(__dirname, '권아나 300.txt');
    const txtData = fs.readFileSync(txtPath, 'utf8');
    const txtLines = txtData.split('\n').map(l => l.replace('\r', '')).filter(line => line.trim() !== '');

    console.log(`Verifying ${txtLines.length} expressions from Firestore against ${txtPath}...`);

    let mismatches = [];
    let missing = [];

    // Fetch and check in batches for efficiency
    const batchSize = 10;
    for (let i = 0; i < txtLines.length; i += batchSize) {
        const batchLines = txtLines.slice(i, i + batchSize);
        const checks = batchLines.map(async (line, indexInBatch) => {
            const index = i + indexInBatch;
            const parts = line.split(' - ');
            if (parts.length < 2) return;

            const primaryTxt = parts[0].replace(/^\d+:\s*/, '').trim();
            const meaningTxt = parts[1].trim();
            const docId = `expression_${380 + index}`;

            try {
                const fsDoc = await fetchDocument(docId);
                if (fsDoc.primary.trim().toLowerCase() !== primaryTxt.toLowerCase()) {
                    mismatches.push(`${docId} PRIMARY: FIRESTORE("${fsDoc.primary}") vs TXT("${primaryTxt}")`);
                }
                if (fsDoc.meaning.trim() !== meaningTxt) {
                    mismatches.push(`${docId} MEANING: FIRESTORE("${fsDoc.meaning}") vs TXT("${meaningTxt}")`);
                }
            } catch (err) {
                missing.push(`${docId} (Original: ${primaryTxt}) - Error: ${err.message}`);
            }
        });

        await Promise.all(checks);
        console.log(`Verified up to expression ${380 + i + batchLines.length - 1}`);
    }

    const reportPath = path.join(__dirname, 'final_verification_report.txt');
    let report = [];
    report.push(`Verification Date: ${new Date().toISOString()}`);
    report.push(`Total TXT Lines: ${txtLines.length}`);
    
    if (mismatches.length === 0 && missing.length === 0) {
        report.push("SUCCESS: All 300 expressions correctly uploaded and verified 1:1!");
    } else {
        report.push("VERIFICATION ISSUES FOUND:");
        if (missing.length > 0) report.push("\nMISSING/ERROR DOCUMENTS:\n" + missing.join('\n'));
        if (mismatches.length > 0) report.push("\nCONTENT MISMATCHES:\n" + mismatches.join('\n'));
    }

    fs.writeFileSync(reportPath, report.join('\n'), 'utf8');
    console.log(`Verification complete. Report saved to ${reportPath}`);
    console.log(report.join('\n'));
};

verifyAll().catch(console.error);
