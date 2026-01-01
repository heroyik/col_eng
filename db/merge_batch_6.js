const fs = require('fs');
const mainFile = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const translationsFile = 'C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\temp_spanish_batch_6.json';

console.log('Starting merge for Batch 6...');

try {
  const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));
  const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  let updatedCount = 0;

  data.forEach(item => {
    if (translations[item.id]) {
      item.spanish = translations[item.id];
      updatedCount++;
    }
  });

  fs.writeFileSync(mainFile, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} records with Spanish translations.`);
} catch (error) {
  console.error('Error updating file:', error.message);
}
