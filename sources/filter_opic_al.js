const fs = require('fs');

const INPUT_FILE = 'c:\\Users\\heroy\\COL_ENG\\sources\\opical_ready.json';
const OUTPUT_FILE = 'c:\\Users\\heroy\\COL_ENG\\sources\\OPIC_AL_LEVEL_ONLY.json';

try {
  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  console.log(`Total Source Items: ${data.length}`);

  // Criteria for Exclusion:
  // 1. Single nouns that are just vocabulary (not slang/idioms).
  // 2. Extremely basic travel phrases that lack idiomatic flavor (Intermediate level).
  // 3. Items flagged as low value during inspection.

  const excludeList = [
    "Vermicelli", "Japchae", "Pulled pork", "Janitor", "Allowance", "Senior", 
    "Savory", "Appealing", "Cross-eyed", "Historical drama", "Cliquey", 
    "Speculator", "Sauté diced beef", "In awe", "Have a limp",
    // Basic travel questions (functional but not necessarily AL "expressions" unless enriched heavily)
    // "Where is the nearest restroom?", // Keeping because examples might be colloquial
    // "When is boarding?", // Keeping
    // "How long is the flight?" // Keeping
  ];

  const alLevelData = data.filter(item => {
    // Exclude based on explicit list
    if (excludeList.some(e => e.toLowerCase() === item.primary.toLowerCase())) return false;

    // Filter out simple 1-word text that isn't slang
    // (We rely on the exclude list for most, but this catches some)
    // Slang whitelist (1 words): Dibs, Shotgun, Homie, Legit, Meh, Roomy, Smitten (if exists), Troll
    const slangOneWords = ["Dibs", "Shotgun", "Homie", "Legit", "Meh", "Roomy", "Troll", "Smitten", "Senior"];
    // checking if 1 word and NOT in slang whitelist
    if (!item.primary.includes(' ') && !slangOneWords.some(s => s.toLowerCase() === item.primary.toLowerCase())) {
         // Check if it's likely a simple noun/adjective we missed
         // console.log(`Potential Exclude (1 word): ${item.primary}`);
         // Decided to keep them if not explicitly excluded, to be safe, easier to remove than add.
    }

    return true;
  });

  console.log(`Filtered AL Level Items: ${alLevelData.length}`);

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(alLevelData, null, 2), 'utf8');
  console.log(`Successfully created ${OUTPUT_FILE}`);

} catch (err) {
  console.error("Error processing file:", err);
}
