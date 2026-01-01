
const fs = require('fs');

const mainFile = 'db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json';
const outputFile = 'db/DONE_20260101_COL_ENG_1484_chinese_remediated.json';

const mainData = JSON.parse(fs.readFileSync(mainFile, 'utf8'));

const batchFiles = [
    'batch1_translated.json',
    'batch2_translated.json',
    'batch3_translated.json',
    'batch4_translated.json'
];

let updates = {};

batchFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const batchData = JSON.parse(fs.readFileSync(file, 'utf8'));
        batchData.forEach(item => {
            updates[item.id] = item.chinese;
        });
        console.log(`Loaded ${batchData.length} updates from ${file}`);
    } else {
        console.error(`File not found: ${file}`);
    }
});

let updatedCount = 0;
mainData.forEach(item => {
    if (updates[item.id]) {
        item.chinese = updates[item.id];
        updatedCount++;
    }
});

fs.writeFileSync(outputFile, JSON.stringify(mainData, null, 2));
console.log(`Successfully updated ${updatedCount} records.`);
console.log(`Saved to ${outputFile}`);
