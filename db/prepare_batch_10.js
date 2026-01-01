
const fs = require('fs');

const filePath = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const outputBatchPath = 'c:\\Users\\heroy\\COL_ENG\\db\\batch_10_input.json';

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  // Extract records 901-1000 (index 900-999)
  const batch = json.slice(900, 1000);

  fs.writeFileSync(outputBatchPath, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`Successfully extracted ${batch.length} records to ${outputBatchPath}.`);

} catch (err) {
  console.error('Error processing file:', err);
}
