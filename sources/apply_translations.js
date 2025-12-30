const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'firebase_import_ready_20240820.json');
const translationsPath = path.join(__dirname, 'translations.json');

try {
    const targetData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
    const translations = JSON.parse(fs.readFileSync(translationsPath, 'utf8'));

    // Create a map for faster lookup
    const translationMap = new Map();
    translations.forEach(t => translationMap.set(t.primary, t.meaning));

    let updatedCount = 0;

    targetData.forEach(item => {
        if (translationMap.has(item.primary)) {
            item.meaning = translationMap.get(item.primary);
            updatedCount++;
        }
    });

    fs.writeFileSync(targetPath, JSON.stringify(targetData, null, 2), 'utf8');
    console.log(`Successfully updated ${updatedCount} entries.`);

} catch (err) {
    console.error('Error applying translations:', err);
}
