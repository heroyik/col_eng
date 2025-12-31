const fs = require('fs');
const OpenAI = require('openai');

// OpenAI API 키를 여기에 입력하세요
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_API_KEY_HERE'
});

const mainFile = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

async function generateSpanishTranslations(batchData) {
  const itemsText = batchData.map(item => 
    `ID ${item.id}: "${item.primary}" (${item.meaning})`
  ).join('\n');

  const prompt = `다음 영어 구어체 표현들을 스페인어로 번역해주세요.
각 표현마다 2개의 자연스러운 구어체 스페인어 표현을 제공하되, 다음 시제들을 적절히 활용하세요:
- Presente (Present)
- Futuro (Future)
- Pretérito Perfecto Compuesto (Present Perfect)
- Pretérito Indefinido (Preterite/Simple Past)
- Pretérito Imperfecto (Imperfect)

형식: "스페인어 표현1 / 스페인어 표현2"

응답은 반드시 다음 JSON 형식으로만 제공해주세요:
{
  "ID번호": "스페인어 표현1 / 스페인어 표현2",
  ...
}

영어 표현들:
${itemsText}`;

  console.log('Calling OpenAI API...');
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ 
      role: "user", 
      content: prompt 
    }],
    temperature: 0.7,
    response_format: { type: "json_object" }
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

async function processBatch(startId, endId, batchNum) {
  console.log(`\n=== Processing Batch ${batchNum} (IDs ${startId}-${endId}) ===`);
  
  const data = JSON.parse(fs.readFileSync(mainFile, 'utf8'));
  const batch = data.filter(item => item.id >= startId && item.id <= endId)
    .map(item => ({ id: item.id, primary: item.primary, meaning: item.meaning }));
  
  console.log(`Extracted ${batch.length} items`);
  
  // OpenAI API 호출
  const translations = await generateSpanishTranslations(batch);
  
  // 스크립트 생성
  const scriptContent = `const fs = require('fs');
const path = 'c:\\\\Users\\\\heroy\\\\COL_ENG\\\\db\\\\20260101_COL_ENG_1484_backupjson';

console.log('Starting script...');

const translations = ${JSON.stringify(translations, null, 2)};

try {
  console.log(\`Reading file from \${path}...\`);
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  let updatedCount = 0;

  data.forEach(item => {
    if (translations[item.id]) {
      item.spanish = translations[item.id];
      updatedCount++;
    }
  });

  console.log(\`Writing file...\`);
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  console.log(\`Successfully updated \${updatedCount} records with Spanish translations.\`);
} catch (error) {
  console.error('Error updating file:', error);
}
`;

  const scriptFile = `c:\\Users\\heroy\\COL_ENG\\db\\enrich_spanish_batch_${batchNum}.js`;
  fs.writeFileSync(scriptFile, scriptContent, 'utf8');
  console.log(`Created script: ${scriptFile}`);
  
  return scriptFile;
}

async function processAllBatches() {
  const batches = [
    { start: 601, end: 800, num: 4 },
    { start: 801, end: 1000, num: 5 },
    { start: 1001, end: 1200, num: 6 },
    { start: 1201, end: 1400, num: 7 },
    { start: 1401, end: 1483, num: 8 }
  ];

  for (const batch of batches) {
    try {
      const scriptFile = await processBatch(batch.start, batch.end, batch.num);
      console.log(`✓ Batch ${batch.num} completed`);
      
      // API rate limit 방지를 위한 대기
      if (batch.num < 8) {
        console.log('Waiting 3 seconds before next batch...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (error) {
      console.error(`✗ Error processing Batch ${batch.num}:`, error.message);
      break;
    }
  }
  
  console.log('\n=== All batches processed! ===');
}

// 실행
processAllBatches().catch(console.error);
