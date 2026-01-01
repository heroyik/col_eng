
const fs = require('fs');

const file = 'db/DONE_20260101_COL_ENG_1484_chinese_remediated.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Sample checks
const samples = [51, 100, 200, 300, 400, 500, 600, 700];

console.log("--- Sample Verification ---");
samples.forEach(id => {
    const item = data.find(i => i.id === id);
    if (item) {
        console.log(`ID: ${item.id}`);
        console.log(`Primary: ${item.primary}`);
        console.log(`Chinese: ${item.chinese}`); // Should be the new value
        console.log('---------------------------');
    } else {
        console.log(`ID ${id} not found!`);
    }
});

// Check range 51-700 for empty values
let emptyCount = 0;
for (let i = 51; i <= 700; i++) {
    const item = data.find(it => it.id === i);
    if (!item || !item.chinese || item.chinese.trim() === "") {
        emptyCount++;
        console.error(`Error at ID ${i}: Missing Chinese`);
    }
}

if (emptyCount === 0) {
    console.log("No empty Chinese fields found in range 51-700.");
} else {
    console.log(`Found ${emptyCount} empty fields.`);
}

console.log(`Total records: ${data.length}`);
