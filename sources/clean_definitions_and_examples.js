const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'firebase_import_ready_20240820.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    let modifiedCount = 0;

    const cleanSimilar = (arr) => {
        if (!Array.isArray(arr)) return arr;
        
        // Filter out full sentences (ending in .)
        let newArr = arr.filter(line => !line.trim().endsWith('.'));

        return newArr.map(line => {
            // Remove junk like "Confront: ," -> "Confront"
            if (line.includes(':')) {
                const parts = line.split(':');
                const beforeColon = parts[0].trim();
                return beforeColon; // Aggressively take only the part before colon for similar
            }
            return line;
        });
    };

    const cleanExamples = (arr) => {
        if (!Array.isArray(arr)) return arr;

        return arr.filter(line => {
            const trimmed = line.trim();
            // Remove lines that don't have at least one letter (English/Korean) or number
            // This catches ",   .", ".    !", etc.
            if (!/[a-zA-Z0-9\u3131-\uD79D]/.test(trimmed)) return false;
            // Remove lines starting with "예:"
            if (trimmed.startsWith('예:')) return false;
            return true;
        });
    };

    jsonData.forEach(item => {
        let changed = false;
        
        // Check similar
        if (item.similar) {
            const originalSimilar = JSON.stringify(item.similar);
            item.similar = cleanSimilar(item.similar);
            if (JSON.stringify(item.similar) !== originalSimilar) changed = true;
        }

        // Check examples
        if (item.examples) {
             const originalExamples = JSON.stringify(item.examples);
             item.examples = cleanExamples(item.examples);
             if (JSON.stringify(item.examples) !== originalExamples) changed = true;
        }

        if (changed) modifiedCount++;
    });

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`Successfully processed file. Modified ${modifiedCount} entries.`);

} catch (err) {
    console.error('Error processing file:', err);
}
