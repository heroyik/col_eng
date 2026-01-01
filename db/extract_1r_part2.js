const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db/20260101_COL_ENG_1484_backupjson', 'utf8'));
const batch = data.filter(i => i.id >= 91 && i.id <= 185).map(i => ({id: i.id, primary: i.primary, meaning: i.meaning}));
fs.writeFileSync('temp_batch_1r_part2_data.json', JSON.stringify(batch, null, 2));
console.log('Data saved to temp_batch_1r_part2_data.json');
