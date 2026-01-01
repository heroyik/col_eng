
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

let duplicates = {};

data.forEach((item) => {
    if (duplicates[item.chinese]) {
        duplicates[item.chinese].push(item);
    } else {
        duplicates[item.chinese] = [item];
    }
});

console.log("--- DUPLICATE REPORT ---");
for (let key in duplicates) {
    if (duplicates[key].length > 1) {
        console.log(`Chinese: ${key}`);
        duplicates[key].forEach(item => {
            console.log(`  ID: ${item.id} | Primary: ${item.primary}`);
        });
        console.log('----------------');
    }
}
