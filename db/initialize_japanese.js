const fs = require('fs');

const filePath = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  let updatedCount = 0;

  json.forEach(item => {
    item.japanese = "";
    updatedCount++;
  });

  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  
  console.log(`Successfully updated ${updatedCount} records. All 'japanese' fields set to empty string.`);
  console.log('File saved.');

} catch (err) {
  console.error('Error processing file:', err);
}
