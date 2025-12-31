const fs = require('fs');

const filePath = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

try {
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  let totalRecords = json.length;
  let hasJapaneseField = 0;
  let populatedJapaneseField = 0;

  json.forEach(item => {
    if ('japanese' in item) {
      hasJapaneseField++;
      if (item.japanese && item.japanese.trim() !== "") {
        populatedJapaneseField++;
      }
    }
  });

  console.log(`Total Records: ${totalRecords}`);
  console.log(`Has 'japanese' field: ${hasJapaneseField}`);
  console.log(`Populated 'japanese' field: ${populatedJapaneseField}`);

} catch (err) {
  console.error('Error reading or parsing file:', err);
}
