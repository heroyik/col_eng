
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

// Extract IDs 651-700
const batch4 = data.filter(item => item.id >= 651 && item.id <= 700).map(item => ({
    id: item.id,
    primary: item.primary
}));

console.log(JSON.stringify(batch4, null, 2));
