const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const lines = data.map(item => `${item.id}|${item.primary}|${item.japanese || 'MISSING'}`);
fs.writeFileSync('c:\\Users\\heroy\\COL_ENG\\db\\debug_compact.txt', lines.join('\n'), 'utf8');
