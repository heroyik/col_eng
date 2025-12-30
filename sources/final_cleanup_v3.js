const fs = require('fs');

const FILE_PATH = 'c:\\Users\\heroy\\COL_ENG\\sources\\opical_ready.json';

try {
  let data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  const initialLength = data.length;
  console.log(`Current Item Count: ${initialLength}`);

  const explicitDeletes = [
    "smitten", "off", "At least", "curse", "curse,", 
    "Out of question", "Out of question for dinner", 
    "Shevron", "airborne", "Speculator", "Sauté diced beef", 
    "I am challenged", "I doubt it", "historical drama", 
    "CreAm butter", "Butter cream", "Kids Labs Milkids,", "키즈랩스 밀키즈"
  ];

  data = data.filter(item => {
    // 1. Explicit delete (case-insensitive check)
    if (explicitDeletes.some(d => d.toLowerCase() === item.primary.toLowerCase())) {
        console.log(`Removing Explicit Item: ${item.primary}`);
        return false;
    }

    // 2. Korean in Primary (Regex) - Only allow English and basic punctuation
    if (/[가-힣]/.test(item.primary)) {
        console.log(`Removing Korean Primary: ${item.primary}`);
        return false;
    }

    // 3. URL
    if (item.primary.startsWith('http') || item.primary.startsWith('www')) {
        console.log(`Removing URL: ${item.primary}`);
        return false;
    }

    // 4. Raw GPT Meaning (contains **)
    if (item.meaning && item.meaning.includes('**')) {
        console.log(`Removing Raw GPT Item: ${item.primary}`);
        return false;
    }

    // 5. Incomplete items (Missing examples, meaning, or similar)
    if (!item.examples || item.examples.length === 0) {
        console.log(`Removing Empty Examples: ${item.primary}`);
        return false;
    }
    if (!item.meaning || item.meaning.trim() === '') {
        console.log(`Removing Empty Meaning: ${item.primary}`);
        return false;
    }
    if (!item.similar || item.similar.length === 0) {
        console.log(`Removing Empty Similar: ${item.primary}`);
        return false;
    }

    return true;
  });

  console.log(`Removed ${initialLength - data.length} items.`);
  console.log(`Final Item Count: ${data.length}`);

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully saved final cleaned data to ${FILE_PATH}`);

} catch (err) {
  console.error("Error processing file:", err);
}
