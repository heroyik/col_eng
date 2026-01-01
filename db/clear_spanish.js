
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  if (!Array.isArray(json)) {
    console.error('Error: File content is not an array.');
    process.exit(1);
  }

  const updatedJson = json.map(record => ({
    ...record,
    spanish: ''
  }));

  fs.writeFileSync(filePath, JSON.stringify(updatedJson, null, 2), 'utf8');
  console.log(`Successfully cleared spanish fields for ${updatedJson.length} records.`);

} catch (err) {
  console.error('Error processing file:', err);
}
