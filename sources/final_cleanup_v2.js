const fs = require('fs');

const FILE_PATH = 'c:\\Users\\heroy\\COL_ENG\\sources\\opical_ready.json';

try {
  let data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  const initialLength = data.length;
  console.log(`Current Item Count: ${initialLength}`);

  // Explicit delete list (from visual inspection)
  const explicitDeletes = [
    "smitten",
    "off",
    "curse",
    "curse,",
    "At least",
    "Out of question", // Typo/duplicate check
    "Out of question for dinner", // Typo check
  ];

  // Filter function
  data = data.filter(item => {
    // 1. Remove explicit deletes
    if (explicitDeletes.includes(item.primary)) return false;

    // 2. Remove items with "의 의미" in meaning (Raw GPT) IF they have no examples (incomplete)
    // Note: Some valid items might have "의 의미" but if they are enriched, keep them?
    // Actually, the logs showed these items were missing examples. So unsafe to keep.
    if (item.meaning && item.meaning.includes('**') && (!item.examples || item.examples.length === 0)) {
        console.log(`Removing Raw GPT Item: ${item.primary}`);
        return false;
    }

    // 3. Remove items appearing to be prompts
    if (item.meaning && item.meaning.includes('이 두 표현 모두 native가 자주 사용해?')) {
        console.log(`Removing Prompt Item: ${item.primary}`);
        return false;
    }
    
    // 4. Remove items with specific corruption (from logs)
    if (["Flex", "Terminal list", "wood-fired pizza", "Brisket", "Eat up", "Inevitable"].includes(item.primary) && (!item.examples || item.examples.length === 0)) {
         console.log(`Removing Incomplete Item: ${item.primary}`);
         return false;
    }

    return true;
  });

  console.log(`Removed ${initialLength - data.length} items.`);
  console.log(`Final Item Count: ${data.length}`);

  // Write back to file
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully saved final cleaned data to ${FILE_PATH}`);

} catch (err) {
  console.error("Error processing file:", err);
}
