const fs = require('fs');
const path = require('path');

const SOURCE_FILE = '20260101_COL_ENG_1484_spanish_complete.json';
const OUTPUT_FILE = '20260101_COL_ENG_1484_vietnamese_complete.json';
const BATCH_PATTERN = /^vietnamese_batch_(\d+)\.json$/;

async function mergeBatches() {
  try {
    const dbDir = __dirname;
    const sourcePath = path.join(dbDir, SOURCE_FILE);
    const outputPath = path.join(dbDir, OUTPUT_FILE);

    console.log(`Reading source file: ${SOURCE_FILE}`);
    const sourceData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    
    // Create a map for faster lookup
    const recordMap = new Map(sourceData.map(item => [item.id, item]));

    const files = fs.readdirSync(dbDir);
    const batchFiles = files.filter(file => BATCH_PATTERN.test(file));
    
    // Sort batch files numerically
    batchFiles.sort((a, b) => {
      const numA = parseInt(a.match(BATCH_PATTERN)[1]);
      const numB = parseInt(b.match(BATCH_PATTERN)[1]);
      return numA - numB;
    });

    console.log(`Found ${batchFiles.length} batch files.`);

    let updateCount = 0;

    for (const file of batchFiles) {
      console.log(`Processing ${file}...`);
      const batchPath = path.join(dbDir, file);
      const batchData = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

      if (!Array.isArray(batchData)) {
        console.warn(`Warning: ${file} is not an array. Skipping.`);
        continue;
      }

      for (const update of batchData) {
        if (recordMap.has(update.id)) {
          const record = recordMap.get(update.id);
          record.vietnamese = update.vietnamese;
          updateCount++;
        } else {
          console.warn(`Warning: ID ${update.id} found in ${file} but not in source.`);
        }
      }
    }

    console.log(`Updated ${updateCount} records.`);
    
    // Convert back to array
    const finalData = Array.from(recordMap.values());
    
    // Verify all records have vietnamese field
    const missing = finalData.filter(item => !item.vietnamese);
    if (missing.length > 0) {
        console.warn(`WARNING: ${missing.length} records are missing the 'vietnamese' field.`);
    }

    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf8');
    console.log(`Successfully merged to ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('Error merging batches:', error);
  }
}

mergeBatches();
