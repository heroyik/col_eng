const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'firebase_import_ready_20240820.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    let modifiedCount = 0;

    jsonData.forEach(item => {
        if (item.examples && Array.isArray(item.examples)) {
            const splitIndex = item.examples.findIndex(ex => ex.includes('관련 표현') || ex.includes('관련 표현:') || ex.includes('Related expressions'));

            if (splitIndex !== -1) {
                // Extract part to move
                const toMove = item.examples.slice(splitIndex + 1);
                
                // Keep part to stay
                const toKeep = item.examples.slice(0, splitIndex);

                // Filter junk from toMove and add to similar
                const cleanedMoves = toMove.filter(line => {
                    const l = line.trim();
                    if (!l) return false;
                    if (l.includes('이 표현들이 이해되셨나요')) return false;
                    if (l.includes('추가적인 질문이')) return false;
                    if (l.includes('궁금한 점이')) return false;
                    if (l.includes('도움이 되셨나요')) return false;
                    if (l.includes('언제든지 말씀해 주세요')) return false;
                    return true;
                });

                if (cleanedMoves.length > 0) {
                     if (!item.similar) item.similar = [];
                     item.similar.push(...cleanedMoves);
                }

                item.examples = toKeep;
                modifiedCount++;
            }
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`Successfully processed file. Modified ${modifiedCount} entries.`);

} catch (err) {
    console.error('Error processing file:', err);
}
