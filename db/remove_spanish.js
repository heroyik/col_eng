// remove_spanish.js
// Script to delete the 'spanish' field from all records in the main JSON file.

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '20260101_COL_ENG_1484_backupjson');

// Load data
const raw = fs.readFileSync(DATA_FILE, 'utf8');
let records = JSON.parse(raw);

// Remove spanish field from each record
records = records.map(rec => {
  delete rec.spanish;
  return rec;
});

// Write back
fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), 'utf8');
console.log('Removed spanish field from', records.length, 'records.');
