const fs = require('fs');
const path = require('path');

const mainFilePath = path.join(__dirname, '20260101_COL_ENG_1484_backupjson');
const correctedPath = path.join(__dirname, 'corrected_spanish_batch_2.json');

const mainData = JSON.parse(fs.readFileSync(mainFilePath, 'utf8'));
const correctedData = JSON.parse(fs.readFileSync(correctedPath, 'utf8'));

let updatedCount = 0;
mainData.forEach(item => {
  if (correctedData[item.id]) {
    item.spanish = correctedData[item.id];
    updatedCount++;
  }
});

fs.writeFileSync(mainFilePath, JSON.stringify(mainData, null, 2), 'utf8');
console.log(`Successfully updated ${updatedCount} records in Batch 2.`);
