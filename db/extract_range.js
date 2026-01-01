const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'DONE_20260101_COL_ENG_1484_vietnamese_complete.json');
const startId = parseInt(process.argv[2]);
const endId = parseInt(process.argv[3]);
const batchNum = process.argv[4];

try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const subset = data.filter(r => r.id >= startId && r.id <= endId).map(r => ({ id: r.id, primary: r.primary }));
    
    fs.writeFileSync(`db/batch_${batchNum}_input.json`, JSON.stringify(subset, null, 2));
    console.log(`Extracted ${subset.length} records for Batch ${batchNum} to db/batch_${batchNum}_input.json`);
} catch (err) {
    console.error(err);
}
