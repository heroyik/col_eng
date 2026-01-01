const fs = require('fs');
const data = JSON.parse(fs.readFileSync('db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json', 'utf8'));
const ids = [295, 479, 802, 804, 814];
ids.forEach(id => {
    const r = data.find(x => x.id === id);
    if(r) console.log(`ID ${id}: ${JSON.stringify(r.chinese)}`);
});
