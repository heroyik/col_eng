
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

// Extract IDs 51-250
const batch1 = data.filter(item => item.id >= 51 && item.id <= 250).map(item => ({
    id: item.id,
    primary: item.primary
}));

console.log(JSON.stringify(batch1, null, 2));
