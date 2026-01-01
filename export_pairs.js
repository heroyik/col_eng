
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

let output = '';
data.forEach(item => {
    output += `ID: ${item.id}\nPrimary: ${item.primary}\nChinese: ${item.chinese}\n-------------------\n`;
});

fs.writeFileSync('review_pairs.txt', output);
console.log('Exported review_pairs.txt');
