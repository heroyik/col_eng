const fs = require('fs');
const path = require('path');

const mainFilePath = path.join(__dirname, 'firebase_import_ready_20240820.json');
const part1Path = path.join(__dirname, 'enrichment_part1.json');
const part2Path = path.join(__dirname, 'enrichment_part2.json');
const part3Path = path.join(__dirname, 'enrichment_part3.json');
const part4Path = path.join(__dirname, 'enrichment_part4.json');

const mainData = JSON.parse(fs.readFileSync(mainFilePath, 'utf8'));
const part1 = JSON.parse(fs.readFileSync(part1Path, 'utf8'));
const part2 = JSON.parse(fs.readFileSync(part2Path, 'utf8'));
const part3 = JSON.parse(fs.readFileSync(part3Path, 'utf8'));
const part4 = JSON.parse(fs.readFileSync(part4Path, 'utf8'));

const enrichedDataMap = new Map();

[...part1, ...part2, ...part3, ...part4].forEach(item => {
    enrichedDataMap.set(item.primary, item);
});

let updatedCount = 0;

const updatedMainData = mainData.map(item => {
    const enrichedItem = enrichedDataMap.get(item.primary);
    if (enrichedItem) {
        updatedCount++;
        return {
            ...item,
            similar: enrichedItem.similar,
            examples: enrichedItem.examples
        };
    } else {
        console.warn(`Warning: No enrichment data found for "${item.primary}"`);
        return item;
    }
});

fs.writeFileSync(mainFilePath, JSON.stringify(updatedMainData, null, 2), 'utf8');

console.log(`Successfully updated ${updatedCount} entries.`);
