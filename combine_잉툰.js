const fs = require('fs');
const path = require('path');

const parts = [
    '잉툰upload_part1.json',
    '잉툰upload_part2.json',
    '잉툰upload_part3.json',
    '잉툰upload_part4.json'
];

let combined = [];

parts.forEach(part => {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, part), 'utf8'));
    combined = combined.concat(data);
});

fs.writeFileSync(path.join(__dirname, '잉툰upload.json'), JSON.stringify(combined, null, 2), 'utf8');
console.log(`Combined ${combined.length} expressions into 잉툰upload.json`);
