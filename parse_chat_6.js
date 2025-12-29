const fs = require('fs');

const inputFile = 'c:\\Users\\heroy\\COL_ENG\\sources\\영어6.txt';
const outputFile = 'c:\\Users\\heroy\\COL_ENG\\sources\\firebase_import_ready_6.json';

try {
    const content = fs.readFileSync(inputFile, 'utf8');
    // Split by "ChatGPT said:" to process each response block
    const blocks = content.split('ChatGPT said:');
    const results = [];

    // Skip the first block as it's usually the intro or previous context
    for (let i = 1; i < blocks.length; i++) {
        let block = blocks[i];
        
        // Stop at the next "You said:" or end of file
        const nextUserIndex = block.indexOf('You said:');
        if (nextUserIndex !== -1) {
            block = block.substring(0, nextUserIndex);
        }

        const lines = block.split('\n').map(l => l.trim()).filter(l => l);

        // Indices
        const similarIndex = lines.findIndex(l => l.includes('비슷한 표현'));
        const exampleIndex = lines.findIndex(l => l.includes('예문 5개'));

        if (similarIndex === -1 || exampleIndex === -1) {
            // Not a standard definition block, skip
            continue;
        }

        // Extract Synonyms
        const synonyms = [];
        for (let j = similarIndex + 1; j < exampleIndex; j++) {
            const line = lines[j];
            // Basic cleanup: remove bullets if any, allow English text
            if (line.match(/[a-zA-Z]/)) {
                synonyms.push(line.replace(/^[-*]\s*/, '').trim());
            }
        }

        // Extract Examples
        const examples = [];
        for (let j = exampleIndex + 1; j < lines.length; j++) {
            const line = lines[j];
            // Stop if we hit something that looks like the end or next section header keys (unlikely in this block)
            if (line.includes('다른 표현') || line.includes('이해되셨나요')) break;
            
            // Should be English sentence
            if (line.match(/[a-zA-Z]/)) {
                 examples.push(line.replace(/^[-*]\s*/, '').trim());
            }
        }

        // Extract Primary and Meaning from the section BEFORE '비슷한 표현'
        // Strategy: Look for lines wrapped in quotes
        const preSimilarLines = lines.slice(0, similarIndex);
        let primary = "";
        let meaning = "";

        const quotedLines = preSimilarLines.filter(l => l.startsWith('"') && l.endsWith('"'));
        
        if (quotedLines.length >= 2) {
            // Assume first is English Primary, Second is Meaning
            // Check for English characters to be sure
            if (/[a-zA-Z]/.test(quotedLines[0])) {
                primary = quotedLines[0].replace(/"/g, '');
                meaning = quotedLines[1].replace(/"/g, '');
            } else if (/[a-zA-Z]/.test(quotedLines[1])) {
                // Rare case where they are swapped?
                primary = quotedLines[1].replace(/"/g, '');
                meaning = quotedLines[0].replace(/"/g, '');
            }
        } else if (quotedLines.length === 1) {
            // Maybe one is quoted, the other is not?
            // Or maybe the primary is the very first line of the block if it's not quoted?
            // Let's stick to strict Quoted for now to avoid grabbing "Sure!" or "Okay"
            const potential = quotedLines[0].replace(/"/g, '');
             if (/[a-zA-Z]/.test(potential)) {
                primary = potential;
                // Try to find meaning in non-quoted lines?
                 // Usually meaning is Korean.
                 const koreanLine = preSimilarLines.find(l => /[가-힣]/.test(l) && !l.includes('비슷한 표현'));
                 if (koreanLine) meaning = koreanLine.replace(/"/g, '');
            } else {
                 meaning = potential; // It was Korean
                 // Find primary in other lines
                 const engLine = preSimilarLines.find(l => /[a-zA-Z]/.test(l) && !l.includes('ChatGPT') && l.length < 50); // Heuristic
                 if (engLine) primary = engLine.replace(/"/g, '');
            }
        }

        // Fallback: If no quotes, look for strictly English line and strict Korean line close to each other
        if (!primary || !meaning) {
             const engLine = preSimilarLines.find(l => /[a-zA-Z]/.test(l) && !l.includes('ChatGPT') && !l.startsWith('You said') && !l.startsWith('의미:') && l.length > 2);
             const korLine = preSimilarLines.find(l => /[가-힣]/.test(l) && !l.includes('비슷한 표현') && !l.startsWith('의미:'));

             if (engLine && !primary) primary = engLine;
             if (korLine && !meaning) meaning = korLine;
        }

        if (primary && meaning && synonyms.length > 0) {
            // Clean up Primary: sometimes it has punctuation like "Hello." -> Hello
            primary = primary.replace(/[.,!?]$/, '');
            
            results.push({
                primary: primary,
                meaning: meaning,
                similar: synonyms.slice(0, 5), // Take top 5
                examples: examples.slice(0, 5) // Take top 5
            });
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
    console.log(`Successfully parsed ${results.length} items.`);

} catch (e) {
    console.error("Error parsing file:", e);
}
