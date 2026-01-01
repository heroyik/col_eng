
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

// Extract IDs 451-650
const batch3 = data.filter(item => item.id >= 451 && item.id <= 650).map(item => ({
    id: item.id,
    primary: item.primary
}));

console.log(JSON.stringify(batch3, null, 2));
