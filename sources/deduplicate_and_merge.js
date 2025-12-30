const fs = require('fs');
const path = require('path');

const FULL_JSON_PATH = path.join(__dirname, 'full.json');
const FIREBASE_IMPORT_PATH = path.join(__dirname, 'firebase_import_ready_20240820.json');
const OPIC_AL_PATH = path.join(__dirname, 'OPIC_AL_LEVEL_ONLY.json');
const OUTPUT_PATH = path.join(__dirname, 'importable.json');

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

try {
    // 1. Load full.json (Reference Schema)
    console.log('Loading full.json...');
    const fullData = JSON.parse(fs.readFileSync(FULL_JSON_PATH, 'utf8'));
    
    // full.json structure is { "EnglishExpressions": [ ... ] }
    const existingExpressions = fullData.EnglishExpressions || [];
    
    // Create a Set of normalized primaries for fast lookup
    const existingPrimaries = new Set();
    existingExpressions.forEach(item => {
        if (item.primary) {
            existingPrimaries.add(normalize(item.primary));
        }
    });
    console.log(`Loaded ${existingPrimaries.size} unique primaries from full.json`);

    // 2. Load Source Files
    console.log('Loading source files...');
    const firebaseData = JSON.parse(fs.readFileSync(FIREBASE_IMPORT_PATH, 'utf8'));
    const opicData = JSON.parse(fs.readFileSync(OPIC_AL_PATH, 'utf8'));

    // Both source files are arrays of objects
    console.log(`Loaded ${firebaseData.length} items from firebase_import_ready_20240820.json`);
    console.log(`Loaded ${opicData.length} items from OPIC_AL_LEVEL_ONLY.json`);

    const allCandidates = [...firebaseData, ...opicData];
    console.log(`Total candidates before deduplication: ${allCandidates.length}`);

    // 3. Filter and Deduplicate
    const uniqueNewItems = [];
    const seenCandidates = new Set(); // To avoid duplicates within the sources themselves

    allCandidates.forEach(item => {
        const rawPrimary = item.primary;
        const normPrimary = normalize(rawPrimary);

        if (!normPrimary) return; // Skip empty primaries

        // Check if it already exists in the "full" database
        if (existingPrimaries.has(normPrimary)) {
            return; // It's a duplicate of an existing item
        }

        // Check if we've already added it to our "new" list (internal deduplication)
        if (seenCandidates.has(normPrimary)) {
            return; // It's a duplicate within the sources
        }

        // If we get here, it's new!
        seenCandidates.add(normPrimary);
        uniqueNewItems.push(item);
    });

    console.log(`Filtering complete.`);
    console.log(`Items to import: ${uniqueNewItems.length}`);
    console.log(`Items filtered out: ${allCandidates.length - uniqueNewItems.length}`);

    // 4. Save to importable.json
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueNewItems, null, 2), 'utf8');
    console.log(`Successfully saved to ${OUTPUT_PATH}`);

} catch (error) {
    console.error('Error during processing:', error);
}
