const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const extracted = data.map(item => ({
  id: item.id,
  primary: item.primary,
  japanese: item.japanese
}));

fs.writeFileSync('c:\\Users\\heroy\\COL_ENG\\db\\debug_comparison.json', JSON.stringify(extracted, null, 2), 'utf8');
console.log(`Extracted ${extracted.length} records for comparison.`);
