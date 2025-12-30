const fs = require('fs');
const path = require('path');

const inputFile = 'c:/Users/heroy/COL_ENG/sources/OPICAL영어.txt';
const outputFile = 'c:/Users/heroy/COL_ENG/sources/opical_ready.json';

function cleanText(text) {
    if (!text) return '';
    // Normalize unicode (NFC)
    let cleaned = text.normalize('NFC');
    // Replace non-breaking spaces
    cleaned = cleaned.replace(/\u00A0/g, ' ');
    // Remove zero-width spaces
    cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, '');
    return cleaned.trim();
}

const rawData = fs.readFileSync(inputFile, 'utf8');
const chunks = rawData.split('You said:');

const results = [];

// Helper to determine if a string contains Korean
const hasKorean = (str) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(str);

chunks.forEach((chunk, index) => {
    if (index === 0) return; // Skip preamble

    const [userPart, ...gptParts] = chunk.split('ChatGPT said:');
    const userLine = cleanText(userPart);
    const gptContent = cleanText(gptParts.join('ChatGPT said:')); // Rejoin just in case

    if (!gptContent) return;

    // --- Strategy 1: Check for "List" pattern ---
    // Pattern often involves: "Phrase" \n "뜻: ..." \n "예문: ..."
    // allowing for empty lines.
    
    // We'll split the GPT content by double newlines or clear delimiters to find blocks
    const potentialItems = gptContent.split(/\n\s*\n/);
    
    let extractedFromList = false;
    
    if (potentialItems.length > 5) { // Only apply if it looks like a list response
        potentialItems.forEach(block => {
            // Check if block has "뜻:" and "예문:"
            const meaningMatch = block.match(/뜻:\s*(.+)/);
            const exampleMatch = block.match(/예문:\s*(.+)/);
            
            if (meaningMatch) {
                // The primary phrase is usually the first line of the block
                const lines = block.split('\n');
                let phraseCandidate = lines[0].trim();
                
                // Cleanup phrase candidate (remove numbered list markers if any "1. ")
                phraseCandidate = phraseCandidate.replace(/^\d+\.\s*/, '');
                
                // If the block has meaning/example, treat as item
                if (phraseCandidate && meaningMatch[1]) {
                    results.push({
                        primary: phraseCandidate,
                        meaning: meaningMatch[1].trim(),
                        similar: [],
                        examples: exampleMatch ? [exampleMatch[1].trim()] : []
                    });
                    extractedFromList = true;
                }
            }
        });
    }

    if (extractedFromList) return; // Skip Strategy 2 if we found a list


    // --- Strategy 2: Standard Single Expression ---
    let primary = '';
    let meaning = '';
    let examples = [];
    let similar = [];

    // 1. Determine Primary and Meaning
    // If User Input is English, that's the primary.
    // If User Input is Korean, Primary is likely in the first sentence of GPT response.
    
    const firstLine = gptContent.split('\n')[0];
    
    if (!hasKorean(userLine)) {
        // User input is likely English (Primary)
        primary = userLine;
        // Meaning might be the first sentence explanation
        meaning = firstLine; 
    } else {
        // User input is Korean. Look for English translation.
        // Format often: "KO"는 영어로 "EN"라고 표현할 수 있습니다.
        const translationMatch = firstLine.match(/"([^"]+)"라고 표현할 수 있습니다/);
        const translationMatch2 = firstLine.match(/영어로 "([^"]+)"/);
        
        if (translationMatch2) {
             primary = translationMatch2[1];
             meaning = userLine; // Use user's Korean query as meaning, or the explanation?
             // Actually, typically the user query IS the meaning they want Expressing.
        } else if (translationMatch) {
             primary = translationMatch[1];
             meaning = userLine;
        } else {
            // Fallback: Try to parse english from the start?
            // "Stutter"는...
            const quoteMatch = firstLine.match(/"([^"]+)"/);
            if (quoteMatch) {
                primary = quoteMatch[1];
                meaning = userLine;
            }
        }
    }

    // Refine Meaning: Remove "는 영어로 ... 입니다" boilerplate if we grabbed the full sentence
    meaning = meaning.replace(/".*"는 영어로 ".*"라고.*/, '').trim(); 
    if (meaning === '') meaning = userLine; // Fallback


    // 2. Extract Examples
    const exampleSection = gptContent.split(/예문:|자연스러운 표현:/)[1];
    if (exampleSection) {
        const exampleLines = exampleSection.split(/사용된 문법|회화에서|비슷한 표현/)[0].trim().split('\n');
        examples = exampleLines.map(l => cleanText(l)).filter(l => l.length > 5);
        // Sometimes examples have Korean translation in parens. Keep it? Yes, usually good.
    }

    // 3. Extract Similar
    const similarSection = gptContent.split('비슷한 표현 5개:')[1];
    if (similarSection) {
        const similarLines = similarSection.split('이 표현들로')[0].trim().split('\n');
        similar = similarLines.map(l => cleanText(l)).filter(l => l.length > 2);
    }

    if (primary && primary.length < 100 && !primary.includes('\n')) {
        results.push({
            primary: cleanText(primary),
            meaning: cleanText(meaning),
            similar: similar,
            examples: examples
        });
    }
});

// Final cleanup: Remove duplicate primaries if any, and clean meanings
const uniqueResults = [];
const seen = new Set();

results.forEach(item => {
    // 1. Clean Meaning repetition
    // Regex to match start of string: optional quote + primary + optional quote + optional marker (은/는)
    // We treat special chars in primary carefully
    const escapedPrimary = item.primary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
    
    // 1. Clean Meaning repetition
    
    // Helper to escape regex chars but allow flexibility for apostrophes and spaces
    const createFuzzyPattern = (str) => {
        let pattern = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special regex chars

        // Enhanced: Handle common contractions where user might have omitted apostrophe
        // e.g. "Im" matches "I'm", "Its" matches "It's"
        const contractions = [
            { key: /Im/gi, val: "I[''’]?m" },
            { key: /Its/gi, val: "It[''’]?s" },
            { key: /Youre/gi, val: "You[''’]?re" },
            { key: /Were/gi, val: "We[''’]?re" },
            { key: /Thats/gi, val: "That[''’]?s" },
            { key: /Dont/gi, val: "Don[''’]?t" },
            { key: /Cant/gi, val: "Can[''’]?t" },
            { key: /Wont/gi, val: "Won[''’]?t" }
        ];

        contractions.forEach(c => {
             // We use a lookahead/lookbehind or just distinct replacer if we can, 
             // but simple text replacement on the specific words is usually safe in this context.
             // We use word boundaries to avoid replacing parts of other words (e.g. "Simple" -> "SImple")
             pattern = pattern.replace(new RegExp(`\\b${c.key.source}\\b`, 'gi'), c.val);
        });

        return pattern
            .replace(/[''’]/g, "[''’]?")            // Make existing apostrophes optional
            .replace(/\s+/g, "\\s+");                // Allow flexible whitespace
    };

    // Normalize primary for regex (remove trailing punctuation)
    const primaryBase = item.primary.replace(/[.,!?]$/, '').trim();
    const fuzzyPrimary = createFuzzyPattern(primaryBase);
    
    // Pattern 1: "Phrase"는 / "Phrase" means / "Phrase" is (Specific match)
    // We allow for the original primary (with potential punctuation) OR the base
    const repetitionRegex1 = new RegExp(`^["']?(${fuzzyPrimary})[.,!?]?["']?\\s*(은|는|라는 표현은|이라는 표현은|\\s*is a common|\\s*is)?\\s*`, 'i');
    
    // Pattern 2: Your sentence "Phrase" is / Your phrase "Phrase" is (Specific match)
    const repetitionRegex2 = new RegExp(`^Your (sentence|phrase|expression) ["']?${fuzzyPrimary}[.,!?]?["']? is\\s*`, 'i');

    // Pattern 3: Generic Quoted Subject Removal (Aggressive)
    // Captures any English-like phrase at the start followed by Korean markers.
    // This handles cases where Primary is "Wish washy" but Meaning is '"Wishy-washy"는...' (typo/variation)
    const genericRepetitionRegex = /^["']([A-Za-z0-9\s\-'?!.,]+)["']\s*(은|는|라는 표현은|이라는 표현은)\s*/;

    let cleanedMeaning = item.meaning
        .replace(repetitionRegex1, '')
        .replace(repetitionRegex2, '')
        .replace(genericRepetitionRegex, '')
        .trim();
    
    // Capitalize first letter if it was an english sentence that got chopped
    if (cleanedMeaning.length > 0 && /^[a-z]/.test(cleanedMeaning)) {
        cleanedMeaning = cleanedMeaning.charAt(0).toUpperCase() + cleanedMeaning.slice(1);
    }

    item.meaning = cleanedMeaning;

    if (!seen.has(item.primary.toLowerCase())) {
        seen.add(item.primary.toLowerCase());
        uniqueResults.push(item);
    }
});

console.log(`Parsed ${uniqueResults.length} items.`);
fs.writeFileSync(outputFile, JSON.stringify(uniqueResults, null, 2), 'utf8');
