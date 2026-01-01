const fs = require('fs');

const mainFile = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const part1File = 'C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\temp_spanish_batch_4_part1.json';
const part2File = 'C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\temp_spanish_batch_4_part2.json';

try {
  console.log('Reading files...');
  const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  const part1 = JSON.parse(fs.readFileSync(part1File, 'utf8'));
  const part2 = JSON.parse(fs.readFileSync(part2File, 'utf8'));

  const translations = { ...part1, ...part2 };
  let updatedCount = 0;

  data.forEach(item => {
    if (translations[item.id]) {
      item.spanish = translations[item.id];
      updatedCount++;
    }
  });

  console.log('Writing updated data...');
  fs.writeFileSync(mainFile, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} records for Batch 4.`);
} catch (error) {
  console.error('Error during merge:', error);
}
