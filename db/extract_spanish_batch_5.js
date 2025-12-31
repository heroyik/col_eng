const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const outputPath = 'c:\\Users\\heroy\\COL_ENG\\db\\temp_spanish_batch_5.json';

try {
  console.log(`Reading file from ${path}...`);
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  const startId = 801;
  const endId = 1000;
  
  const batch = data.filter(item => item.id >= startId && item.id <= endId).map(item => ({
    id: item.id,
    p: item.primary,
    m: item.meaning
  }));

  console.log(`Writing filtered batch to ${outputPath}...`);
  fs.writeFileSync(outputPath, JSON.stringify(batch, null, 2), 'utf8');
  console.log(`Extracted ${batch.length} items to ${outputPath}`);
} catch (error) {
  console.error('Error extracting batch:', error);
}
