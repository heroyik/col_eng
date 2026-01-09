const fs = require('fs');
const path = require('path');

const backups = [
    '../sources/full.json',
    '../db/20260101_COL_ENG_1484_backupjson',
    '../db/20260101_COL_ENG_1484_spanish_complete.json',
    '../db/DONE_20260101_COL_ENG_1484_chinese_remediated.json',
    '../db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json'
];

const mergedMap = new Map();

backups.forEach(relativePath => {
    const fullPath = path.join(__dirname, relativePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`Skipping missing file: ${fullPath}`);
        return;
    }

    console.log(`Processing ${relativePath}...`);
    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const json = JSON.parse(content);

        let items = [];
        if (Array.isArray(json)) {
            items = json;
        } else if (json.EnglishExpressions && Array.isArray(json.EnglishExpressions)) {
            items = json.EnglishExpressions;
        } else {
            // Maybe object with keys as IDs? or other structure.
            // Attempt to just values if it's an object of objects
            if (typeof json === 'object') {
                // check if it looks like { "1": {...}, "2": {...} }
                const values = Object.values(json);
                if (values.length > 0 && values[0].primary) {
                    items = values;
                }
            }
        }

        items.forEach(item => {
            if (item.id) {
                // Merge strategy: New data overwrites old, but since we want the *most complete* data,
                // we might want to be careful.
                // The backups seem to be variants (Spanish complete, Chinese remediation).
                // Best approach: Initialize if new, merge fields if exists.

                const existing = mergedMap.get(item.id) || {};

                // Merge logic: prefer non-empty values
                const merged = { ...existing, ...item };

                // Ensure we don't overwrite good data with empty strings if that happens
                // But spread operator usually implies "newer is better" if passed later in the list.
                // Let's stick to simple spread for now, assuming later files are "more complete" or "remediated".

                mergedMap.set(item.id, merged);
            }
        });
        console.log(`  Merged. Total items so far: ${mergedMap.size}`);

    } catch (err) {
        console.error(`  Error parsing ${relativePath}:`, err.message);
    }
});

const sortedItems = Array.from(mergedMap.values()).sort((a, b) => a.id - b.id);

console.log(`Final count: ${sortedItems.length} items.`);

const outputPath = path.join(__dirname, '../public/initial_data.json');
fs.writeFileSync(outputPath, JSON.stringify(sortedItems, null, 2));
console.log(`Written to ${outputPath}`);
