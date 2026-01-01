const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

console.log('Total records:', data.length);
console.log('Last record ID:', data[data.length - 1].id);

const idsToCheck = [1275, 1298, 1407, 1434, 1473];
idsToCheck.forEach(id => {
    const record = data.find(r => r.id === id);
    if (record) {
        console.log(`ID ${id}: ${record.chinese}`);
    } else {
        console.log(`ID ${id} not found.`);
    }
});
