const fs = require('fs');
const filePath = 'db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Verifying ${data.length} records...`);

let issues = [];

data.forEach(record => {
    // 1. Check basic format "Chinese (Pinyin) / Chinese (Pinyin)"
    // Allow single expression too if that's the style, but usually we have two.
    // Regex for: characters + space + (pinyin)
    // Note: Pinyin can include spaces, apostrophes, tones.
    
    const hasSeparator = record.chinese.includes(' / ');
    const parts = record.chinese.split(' / ');
    
    parts.forEach((part, index) => {
        // Check for (Pinyin)
        const openParen = part.lastIndexOf('(');
        const closeParen = part.lastIndexOf(')');
        
        if (openParen === -1 || closeParen === -1 || closeParen < openParen) {
            issues.push(`ID ${record.id}: Missing pinyin parentheses in part ${index + 1}: "${part}"`);
        } else {
            // Check content inside parens
            const pinyin = part.slice(openParen + 1, closeParen);
            if (pinyin.length < 2) {
                 issues.push(`ID ${record.id}: Suspicious pinyin length in part ${index + 1}: "${pinyin}"`);
            }
            
            // Check for potential English notes inside parens (heuristic: Capital letter + space + lowercase)
            // e.g. "Use lightly"
            if (/[A-Z]/.test(pinyin) && /\s/.test(pinyin) && /[a-z]/.test(pinyin)) {
                // exclude standard pinyin which might have capitals at start of sentence (Wǒ...)
                // Standard pinyin usually doesn't have words like "Use", "slang".
                // Heuristic: if it contains words not resembling pinyin syllables?
                // Hard to do strictly, but let's flag if it contains "," or matches known note words.
                if (pinyin.includes(',') || pinyin.includes('slang') || pinyin.includes('Use') || pinyin.includes('Negative')) {
                     issues.push(`ID ${record.id}: Potential note in pinyin area: "${pinyin}"`);
                }
            }
            
            // Check for garbled characters or notes outside parens?
        }
    });

    if (record.chinese.includes("Note:")) {
        issues.push(`ID ${record.id}: Contains "Note:" text`);
    }
});

// Check for ID gaps
for (let i = 0; i < data.length - 1; i++) {
    if (data[i+1].id !== data[i].id + 1) {
        issues.push(`ID Gap or Disorder: ${data[i].id} -> ${data[i+1].id}`);
    }
}

if (issues.length > 0) {
    console.log(`Found ${issues.length} potential issues:`);
    issues.slice(0, 50).forEach(msg => console.log(msg)); // limit output
    if (issues.length > 50) console.log("...and more.");
} else {
    console.log("No formatting issues found.");
}
