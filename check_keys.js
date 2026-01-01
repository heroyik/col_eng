const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));
console.log(Object.keys(data[0]));
