const fs = require('fs');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const mainFile = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

async function generateSpanishTranslations(batchData) {
  const itemsText = batchData.map(item => 
    `ID ${item.id}: English: "${item.primary}", Korean Meaning: "${item.meaning}"`
  ).join('\n');

  const prompt = `Translate the following English expressions into colloquial Spanish. 
IMPORTANT: Your translations MUST semantically match the English "primary" and Korean "meaning" fields. 
DO NOT use generic idioms or proverbs unless they directly match the meaning of the English phrase. 
Provide 2 natural colloquial Spanish expressions for each, varying the tenses (Present, Future, Present Perfect, Preterite, or Imperfect) as appropriate for the context.

Response Format:
{
  "ID": "Spanish Expression 1 / Spanish Expression 2",
  ...
}

Expressions to translate:
${itemsText}`;

  console.log('Requesting translations from OpenAI...');
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

async function processBatch(startId, endId, batchNum) {
  console.log(`\n--- Batch ${batchNum} (IDs ${startId}-${endId}) ---`);
  const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  const batch = data.filter(item => item.id >= startId && item.id <= endId);
  
  if (batch.length === 0) {
    console.log('No items found in this range.');
    return;
  }

  const translations = await generateSpanishTranslations(batch);
  
  // Save to individual temp file in brain dir for record keeping
  const tempFile = `C:\\Users\\heroy\\.gemini\\antigravity\\brain\\f0452e26-ea54-47ec-a85c-7de7353cc7b5\\corrected_spanish_batch_${batchNum}.json`;
  fs.writeFileSync(tempFile, JSON.stringify(translations, null, 2), 'utf8');
  console.log(`Saved corrected translations to ${tempFile}`);

  // Merge into main file immediately to ensure progress is saved
  let updatedCount = 0;
  data.forEach(item => {
    if (translations[item.id]) {
      item.spanish = translations[item.id];
      updatedCount++;
    }
  });

  fs.writeFileSync(mainFile, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully updated ${updatedCount} records in main file.`);
}

async function runFix() {
  const batches = [
    { start: 556, end: 740, num: 4 },
    // { start: 741, end: 925, num: 5 },
    // { start: 926, end: 1110, num: 6 },
    // { start: 1111, end: 1295, num: 7 },
    // { start: 1296, end: 1484, num: 8 }
  ];

  for (const b of batches) {
    await processBatch(b.start, b.end, b.num);
    // console.log(`Waiting 5s to avoid rate limits...`);
    // await new Promise(r => setTimeout(r, 5000));
  }
  console.log('\nBatch 4 fixed!');
}

runFix().catch(console.error);
