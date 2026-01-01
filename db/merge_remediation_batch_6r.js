const fs = require('fs');
const path = require('path');

const mainDbPath = path.join(__dirname, '20260101_COL_ENG_1484_backupjson');
const part1Path = 'C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\temp_spanish_remediation_6r_part1.json';
const part2Path = 'C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\temp_spanish_remediation_6r_part2.json';

const mainDb = JSON.parse(fs.readFileSync(mainDbPath, 'utf8'));
const part1 = JSON.parse(fs.readFileSync(part1Path, 'utf8'));
const part2 = JSON.parse(fs.readFileSync(part2Path, 'utf8'));

const allRemediation = { ...part1, ...part2 };

let updatedCount = 0;
const updatedDb = mainDb.map(item => {
    const idStr = item.id.toString();
    if (allRemediation[idStr]) {
        item.spanish = allRemediation[idStr];
        updatedCount++;
    }
    return item;
});

fs.writeFileSync(mainDbPath, JSON.stringify(updatedDb, null, 2));
console.log(`Successfully updated ${updatedCount} records in the main database with remediation translations.`);
