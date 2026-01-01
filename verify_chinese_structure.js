
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));

let missingChinese = [];
let emptyChinese = [];
let formatIssues = []; // No pinyin or unexpected format
let duplicates = {};
let total = data.length;

data.forEach((item, index) => {
    if (!item.chinese) {
        missingChinese.push(item.id);
    } else if (item.chinese.trim() === "") {
        emptyChinese.push(item.id);
    } else {
        // Check for basic format: "Characters (Pinyin)" or just check for presence of parentheses
        if (!item.chinese.includes('(') || !item.chinese.includes(')')) {
            formatIssues.push({ id: item.id, content: item.chinese });
        }

        // Check duplicates
        if (duplicates[item.chinese]) {
            duplicates[item.chinese].push(item.id);
        } else {
            duplicates[item.chinese] = [item.id];
        }
    }
});

let duplicateReport = [];
for (let key in duplicates) {
    if (duplicates[key].length > 1) {
        duplicateReport.push({ content: key, ids: duplicates[key] });
    }
}

console.log(`Total records: ${total}`);
console.log(`Missing Chinese: ${missingChinese.length} (IDs: ${missingChinese.join(', ')})`);
console.log(`Empty Chinese: ${emptyChinese.length} (IDs: ${emptyChinese.join(', ')})`);
console.log(`Format Issues (No parenthesis): ${formatIssues.length}`);
if (formatIssues.length > 0) {
    console.log('Sample format issues:', formatIssues.slice(0, 5));
}
console.log(`Duplicates: ${duplicateReport.length}`);
if (duplicateReport.length > 0) {
    console.log('Duplicate examples:', duplicateReport.slice(0, 5));
}
