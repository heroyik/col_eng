import fs from 'fs';

const PROJECT_ID = 'engdb-11b7f';
const COLLECTION = 'EnglishExpressions';
const BATCH_SIZE = 500;
const DELAY_MS = 2000;
const OUTPUT_FILE = 'initial_data.json';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchBatch(pageToken = null) {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}?pageSize=${BATCH_SIZE}${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${await response.text()}`);
    }
    return await response.json();
}

function mapDocument(doc) {
    const fields = doc.fields || {};

    // Helper to get string value
    const s = (name) => fields[name]?.stringValue || "";

    // Helper to get array/list value
    const l = (name) => {
        const list = fields[name]?.arrayValue?.values || [];
        return list.map(v => v.stringValue).filter(v => v !== undefined);
    };

    // Helper to get number/integer value
    const n = (name) => {
        const val = fields[name]?.integerValue || fields[name]?.doubleValue;
        return val !== undefined ? Number(val) : null;
    };

    return {
        id: n("id"),
        primary: s("primary"),
        meaning: s("meaning"),
        similar: l("similar"),
        example: s("example"),
        japanese: s("japanese"),
        chinese: s("chinese"),
        spanish: s("spanish"),
        vietnamese: s("vietnamese")
    };
}

async function main() {
    let allRecords = [];
    let pageToken = null;
    let batchCount = 0;

    console.log(`Starting data extraction from ${COLLECTION}...`);

    try {
        while (true) {
            batchCount++;
            console.log(`Fetching batch ${batchCount}...`);
            const data = await fetchBatch(pageToken);

            if (data.documents) {
                const mapped = data.documents.map(mapDocument);
                allRecords.push(...mapped);
                console.log(`  Added ${mapped.length} records. Total: ${allRecords.length}`);
            }

            pageToken = data.nextPageToken;
            if (!pageToken) {
                break;
            }

            console.log(`  Waiting ${DELAY_MS}ms before next batch...`);
            await sleep(DELAY_MS);
        }

        // Sort by ID to match initial_data.json style
        allRecords.sort((a, b) => (a.id || 0) - (b.id || 0));

        console.log(`Writing ${allRecords.length} records to ${OUTPUT_FILE}...`);
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allRecords, null, 2), 'utf8');
        console.log("Success!");

    } catch (error) {
        console.error("Extraction failed:", error);
        process.exit(1);
    }
}

main();
