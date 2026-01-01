
const fs = require('fs');
const path = require('path');

const dbDir = 'c:\\Users\\heroy\\COL_ENG\\db';
const outputFile = path.join(dbDir, '20260101_COL_ENG_1484_spanish_complete.json');

let allRecords = [];

try {
  for (let i = 1; i <= 15; i++) {
    const batchFile = path.join(dbDir, `spanish_batch_${i}.json`);
    if (!fs.existsSync(batchFile)) {
      throw new Error(`Batch file missing: ${batchFile}`);
    }
    const data = fs.readFileSync(batchFile, 'utf8');
    const records = JSON.parse(data);
    console.log(`Read ${records.length} records from batch ${i}`);
    allRecords = allRecords.concat(records);
  }

  // Sort by ID to ensure order
  allRecords.sort((a, b) => a.id - b.id);

  console.log(`Total records merged: ${allRecords.length}`);

  // Verification check for empty spanish fields
  let missingSpanish = 0;
  allRecords.forEach(r => {
      if (!r.spanish || r.spanish.trim() === "") {
          console.warn(`Warning: Record ID ${r.id} has empty Spanish field.`);
          missingSpanish++;
      }
  });

  if (missingSpanish > 0) {
      console.warn(`Total records with missing Spanish: ${missingSpanish}`);
  } else {
      console.log("Verification Passed: All records have Spanish translations.");
  }

  fs.writeFileSync(outputFile, JSON.stringify(allRecords, null, 2), 'utf8');
  console.log(`Successfully merged to ${outputFile}`);

} catch (err) {
  console.error('Error merging batches:', err);
}
