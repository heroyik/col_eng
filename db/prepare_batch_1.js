
const fs = require('fs');

const filePath = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_1_input.json';

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  if (!Array.isArray(json)) {
    console.error('Error: File content is not an array.');
    process.exit(1);
  }

  // Extract records 1-100 (index 0-99)
  const batch = json.slice(0, 100);

  fs.writeFileSync(outputBatchPath, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`Successfully extracted ${batch.length} records to ${outputBatchPath}.`);

} catch (err) {
  console.error('Error processing file:', err);
}
