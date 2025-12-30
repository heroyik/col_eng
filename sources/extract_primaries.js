const fs = require('fs');
const data = require('./firebase_import_ready_20240820.json');
fs.writeFileSync('primaries.json', JSON.stringify(data.map(i => i.primary), null, 2));
console.log('Done');
