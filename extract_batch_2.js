
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

// Extract IDs 251-450
const batch2 = data.filter(item => item.id >= 251 && item.id <= 450).map(item => ({
    id: item.id,
    primary: item.primary
}));

console.log(JSON.stringify(batch2, null, 2));
