const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

console.log('=== DETAILED SEMANTIC VERIFICATION ===\n');
console.log('Sampling records from each batch to verify translation accuracy...\n');

try {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  // Sample IDs from each batch for manual review
  const sampleIds = [
    1, 50, 100, 150, 200,        // Batch 1
    250, 300, 350, 400,           // Batch 2
    450, 500, 550, 600,           // Batch 3
    650, 700, 750, 800,           // Batch 4
    850, 900, 950, 1000,          // Batch 5
    1050, 1100, 1150, 1200,       // Batch 6
    1250, 1300, 1350, 1400,       // Batch 7
    1425, 1450, 1475, 1483        // Batch 8
  ];
  
  console.log('Sample Records for Review:\n');
  console.log('=' .repeat(80));
  
  sampleIds.forEach(id => {
    const record = data.find(item => item.id === id);
    if (record) {
      console.log(`\nID ${record.id}:`);
      console.log(`  English: "${record.primary}"`);
      console.log(`  Korean:  "${record.meaning}"`);
      console.log(`  Spanish: "${record.spanish}"`);
      console.log('-'.repeat(80));
    }
  });
  
  console.log('\n\n=== ANALYSIS NOTES ===');
  console.log('Please review the above samples to verify:');
  console.log('1. Spanish translations match the English meaning');
  console.log('2. Both Spanish expressions are contextually appropriate');
  console.log('3. Verb tenses are correctly applied where relevant');
  console.log('4. Colloquial/informal tone is maintained');
  
  // Save detailed sample report
  const samples = sampleIds.map(id => data.find(item => item.id === id)).filter(Boolean);
  const reportPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_sample_verification.json';
  fs.writeFileSync(reportPath, JSON.stringify(samples, null, 2), 'utf8');
  console.log(`\nDetailed sample report saved to: ${reportPath}`);
  
} catch (error) {
  console.error('Error during verification:', error);
}
