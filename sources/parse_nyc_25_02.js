const fs = require('fs');

const INPUT_FILE = 'c:\\Users\\heroy\\COL_ENG\\sources\\뉴욕 구어체 학습 25.02.txt';
const OUTPUT_FILE = 'c:\\Users\\heroy\\COL_ENG\\sources\\nyc_colloquial_25_02.json';

function parseText() {
    const text = fs.readFileSync(INPUT_FILE, 'utf8');
    // Split by "나의 말:" start to identify blocks
    const blocks = text.split(/나의 말:/g).slice(1); // skip preamble

    const results = [];

    blocks.forEach((block, index) => {
        try {
            // 1. Extract User Prompt (Topic/Primary candidate)
            const promptEnd = block.indexOf('ChatGPT의 말:');
            if (promptEnd === -1) return;
            
            const userPrompt = block.substring(0, promptEnd).trim();
            const gptResponse = block.substring(promptEnd + 'ChatGPT의 말:'.length).trim();

            // --- TABLE PARSING STRATEGY ---
            // Check if response contains tab-separated table lines
            // Typical format: "Expression\tMeaning\tSimilar"
            const lines = gptResponse.split('\n');
            const tableItems = [];
             
             // Very heuristic: check if multiple lines have tabs
            let tabLineCount = 0;
            lines.forEach(l => { if (l.includes('\t')) tabLineCount++; });

            if (tabLineCount > 5) { // It's likely a table block!
                lines.forEach(line => {
                    const parts = line.split('\t');
                    if (parts.length >= 2) {
                        const p = parts[0].trim();
                        const m = parts[1].trim();
                        if (p === '영어 표현' || p.includes('-------')) return; // Header or separator
                        
                        let sims = [];
                        if (parts.length >= 3) {
                             sims = parts[2].split(/;|,\s/).map(s => s.trim()).filter(s => s.length > 0);
                        }
                        
                        tableItems.push({
                            primary: p,
                            meaning: m,
                            similar: sims,
                            examples: [] // Tables often don't have examples inline, or we'd need to fetch them from context? usually none.
                        });
                    }
                });
            }

            if (tableItems.length > 0) {
                results.push(...tableItems);
                return; // Done with this block (it was a table)
            }

            // --- CONVERSATIONAL PARSING STRATEGY ---

            let entry = {
                primary: "",
                meaning: "",
                similar: [],
                examples: []
            };

            // Detect if User Prompt is English (Primary)
            const isEnglishPrompt = /^[A-Za-z\s.,?!']+$/.test(userPrompt);

            // Extract Examples first (usually at the end under ✅)
            const exampleSectionMatch = gptResponse.match(/✅ 자연스러운 대화 예시([\s\S]*?)($|✅|🔥)/);
            if (exampleSectionMatch) {
                const exampleLines = exampleSectionMatch[1].trim().split('\n').filter(l => l.trim().length > 0);
                entry.examples = exampleLines.filter(l => l.includes(':')).map(l => l.replace(/\r/g, ''));
            }

            // Extract content: "1. [Expression] -> [Meaning]" or "✅ [Expression] -> [Meaning]"
            let potentialPrimaries = [];
            
            lines.forEach(line => {
                line = line.trim();
                // Match "1. Phrase -> Meaning" or "✅ Phrase -> Meaning"
                // Also handle cases without number: "Phrase → Meaning"
                const arrowMatch = line.match(/^(\d+\.|✅)?\s*([A-Za-z\s’'.,?!]+?)\s*(?:→|->)\s*(.+)/);
                
                if (arrowMatch) {
                    const phrase = arrowMatch[2].trim();
                    const definition = arrowMatch[3].trim();
                    if (phrase.length < 2) return;
                    potentialPrimaries.push({ phrase, definition });
                }
            });

            if (isEnglishPrompt) {
                entry.primary = userPrompt;
                
                // Try to find meaning for this distinct prompt
                // Look for bold definition: "**Expression** means..." or "**Expression** -> ..."
                // Or just look at the first arrow match if it matches the prompt
                const match = potentialPrimaries.find(p => p.phrase.toLowerCase() === userPrompt.toLowerCase());
                if (match) {
                     entry.meaning = match.definition;
                } else {
                     // Look for bold text explanation
                     const boldMatch = gptResponse.match(/\*\*(.+?)\*\*(.*)/);
                     if (boldMatch && boldMatch[1].toLowerCase().includes(userPrompt.toLowerCase())) {
                          const quoteInput = boldMatch[2].match(/['"](.+?)['"]/);
                          if(quoteInput) entry.meaning = quoteInput[1];
                          else {
                              // Maybe the text after ** is the meaning?
                              // " **Word** -> Meaning"
                              if (boldMatch[2].includes('→') || boldMatch[2].includes('->')) {
                                   entry.meaning = boldMatch[2].replace(/.*(→|->)\s*/, '').trim();
                              }
                          }
                     }
                }
                
                if (!entry.meaning && potentialPrimaries.length > 0) {
                     // Fallback: use first definition found if close enough? or just use context?
                     // entry.meaning = potentialPrimaries[0].definition; 
                     // Actually often the block explains ONE concept with MANY synonyms.
                     // The meaning applies to all.
                     // entry.meaning = potentialPrimaries[0].definition;
                }

                // Synonyms: all potential primaries that aren't the main one
                entry.similar = potentialPrimaries
                    .filter(p => p.phrase.toLowerCase() !== userPrompt.toLowerCase())
                    .map(p => p.phrase);

                // Add "Similar Expressions" section if exists
                // "✅ 비슷한 표현"
                 const similarSectionMatch = gptResponse.match(/✅ 비슷한 표현([\s\S]*?)(✅|$)/);
                 if (similarSectionMatch) {
                      const simLines = similarSectionMatch[1].split('\n');
                      simLines.forEach(sl => {
                           const m = sl.match(/^(\d+\.|✅)?\s*([A-Za-z\s’'.,?!]+?)\s*(?:→|->)/);
                           if (m) {
                                if (m[2].trim().toLowerCase() !== userPrompt.toLowerCase()) {
                                     entry.similar.push(m[2].trim());
                                }
                           }
                      });
                 }
                 // Dedupe similar
                 entry.similar = [...new Set(entry.similar)];

            } else {
                // User Prompt is Korean
                // If we found potential primaries, we might want to CREATE MULTIPLE RECORDS?
                // Or one record with synonyms?
                // Given "Same way", let's try to create one record if they are synonyms.
                // But "사춘기" example had "Going through a phase", "Teen angst"... distinctly.
                
                if (potentialPrimaries.length > 0) {
                     // Strategy: Create MULTIPLE entries if they have distinct definitions
                     potentialPrimaries.forEach(p => {
                          let newEntry = {
                               primary: p.phrase,
                               meaning: p.definition,
                               similar: potentialPrimaries.filter(x => x.phrase !== p.phrase).map(x => x.phrase),
                               examples: entry.examples // Share examples for now?
                          };
                          results.push(newEntry);
                     });
                     return; // handled
                } else {
                     entry.primary = "Unknown";
                     entry.meaning = userPrompt;
                }
            }

             // Cleanup Meaning
            if (entry.meaning) {
                 entry.meaning = entry.meaning.replace(/\(.*\)/g, '').trim(); 
                 entry.meaning = entry.meaning.replace(/['"]/g, '');
            }

            if (entry.primary && entry.primary !== "Unknown") {
                 results.push(entry);
            }

        } catch (e) {
            console.error("Error parsing block " + index, e);
        }
    });

    console.log(`Parsed ${results.length} items.`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf8');
}

parseText();
