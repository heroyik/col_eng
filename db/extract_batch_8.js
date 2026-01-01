const fs = require('fs');
const source = JSON.parse(fs.readFileSync('c:/Users/heroy/COL_ENG/db/20260101_COL_ENG_1484_spanish_complete.json', 'utf8'));
const batch = source.slice(700, 800).map(i => ({id: i.id, primary: i.primary, meaning: i.meaning}));
fs.writeFileSync('c:/Users/heroy/COL_ENG/db/temp_batch_8.json', JSON.stringify(batch, null, 2));
