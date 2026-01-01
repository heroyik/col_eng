const fs = require('fs');
const filePath = 'db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const idsToClean = [1275, 1298, 1407, 1434, 1473, 1291, 1472]; // Added 1291/1472 just in case, though they looked fine in my manual check, but checking for consistent formatting.

// Manual cleanups defined based on review
const cleaners = {
    1275: (s) => s.replace(/\s*\(Also:.*?\)/, ''),
    1298: (s) => s.replace(/\s*\(inside out\/backwards generic\)/, ''),
    1407: (s) => s.replace(/\s*\(if music\/speech\)/, ''),
    1434: (s) => "交际花 (Jiāojìhuā) / 社交达人 (Shèjiāo dárén)", // Hard replacement to be safe since the note is interleaved
    1473: (s) => s.replace(/\s*\(slang, harsh\)/, '')
};

let modifiedCount = 0;

data.forEach(record => {
    if (cleaners[record.id]) {
        const oldChinese = record.chinese;
        let newChinese = cleaners[record.id](oldChinese);
        
        // Specific fix for 1434 to remove the "(Positive)" if I didn't catch it
        if (record.id === 1434) {
             newChinese = "交际花 (Jiāojìhuā) / 社交达人 (Shèjiāo dárén)"; // Force clean
        }

        if (oldChinese !== newChinese) {
            console.log(`Cleaning ID ${record.id}:`);
            console.log(`  Old: ${oldChinese}`);
            console.log(`  New: ${newChinese}`);
            record.chinese = newChinese;
            modifiedCount++;
        }
    }
    
    // Scan for other potential English notes (heuristic: long parentheticals or non-pinyin chars?)
    // This is just a warning scan
    const parenthesisMatches = record.chinese.match(/\((.*?)\)/g);
    if (parenthesisMatches) {
        parenthesisMatches.forEach(match => {
            const content = match.slice(1, -1);
            // If content has spaces and looks like English (not just pinyin)
            // Pinyin usually doesn't have many spaces unless it's a phrase, but notes often have "Use...", "slang", etc.
            if (content.match(/[A-Z]/) && content.includes(' ')) {
                // Filter out standard pinyin like (Wǒ ... ...)
                // Notes often have explanatory words.
                // Let's just log IDs 1250+ that look suspicious for manual check
                if (record.id > 1250 && !cleaners[record.id]) {
                     // Check if it looks like pinyin or note.
                     // Pinyin: [a-zA-Z0-9\s]+ with tones.
                     // Notes: often start with Capital or have non-pinyin words.
                }
            }
        });
    }
});

if (modifiedCount > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`\nUpdated ${modifiedCount} records.`);
} else {
    console.log('No changes needed.');
}
