const fs = require('fs');
const mainFile = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

try {
  const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  console.log(`Total records: ${data.length}`);

  let missingSpanish = [];
  let invalidFormat = [];

  data.forEach(item => {
    if (!item.spanish) {
      missingSpanish.push(item.id);
    } else if (!item.spanish.includes(' / ')) {
      invalidFormat.push(item.id);
    }
  });

  if (missingSpanish.length === 0 && invalidFormat.length === 0) {
    console.log('Verification SUCCESS: All 1484 records have a validly formatted "spanish" field.');
  } else {
    if (missingSpanish.length > 0) {
      console.log(`Verification FAILED: ${missingSpanish.length} records are missing the "spanish" field.`);
      console.log('Missing IDs:', missingSpanish.join(', '));
    }
    if (invalidFormat.length > 0) {
      console.log(`Verification FAILED: ${invalidFormat.length} records have an invalid "spanish" field format (missing " / ").`);
      console.log('Invalid Format IDs:', invalidFormat.join(', '));
    }
  }

} catch (error) {
  console.error('Error reading or parsing file:', error.message);
}
