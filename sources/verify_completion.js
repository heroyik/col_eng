const fs = require('fs');

try {
  const data = fs.readFileSync('c:\\Users\\heroy\\COL_ENG\\sources\\opical_ready.json', 'utf8');
  const json = JSON.parse(data);

  console.log(`Total Total Items: ${json.length}`);

  let enrichedCount = 0;
  let missingMeaning = 0;
  let missingSimilar = 0;
  let missingExamples = 0;

  json.forEach((item, index) => {
    let isEnriched = true;
    if (!item.meaning || item.meaning.trim() === '') {
        missingMeaning++;
        isEnriched = false;
        console.log(`Missing meaning: [${index}] ${item.primary}`);
    }
    if (!item.similar || item.similar.length === 0) {
        // missingSimilar++; // Count is already incremented
        // isEnriched = false;
         console.log(`Missing similar: [${index}] ${item.primary}`);
    }
    if (!item.examples || item.examples.length === 0) {
        // missingExamples++;
        // isEnriched = false;
        console.log(`Missing examples: [${index}] ${item.primary}`);
    }

    if (isEnriched) enrichedCount++;
  });

  console.log(`Fully Enriched Items: ${enrichedCount}`);
  console.log(`Items Missing Meaning: ${missingMeaning}`);
  console.log(`Items Missing Similar: ${missingSimilar}`);
  console.log(`Items Missing Examples: ${missingExamples}`);

  if (enrichedCount === json.length) {
      console.log("SUCCESS: All items are enriched.");
  } else {
      console.log("WARNING: Some items are incomplete.");
  }

} catch (err) {
  console.error("Error reading or parsing file:", err);
}
