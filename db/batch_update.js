const fs = require('fs');
const path = require('path');

const DB_PATH = 'c:/Users/heroy/COL_ENG/db/20260101_COL_ENG_1484_backupjson';

function updateBatch(transPath) {
    const translations = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    
    let count = 0;
    data.forEach(item => {
        if (translations[item.id]) {
            item.chinese = translations[item.id];
            count++;
        }
    });
    
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${count} records.`);
}

if (require.main === module) {
    const transPath = process.argv[2];
    if (transPath) {
        updateBatch(transPath);
    } else {
        console.error('Usage: node batch_update.js <path_to_translations_json>');
    }
}
