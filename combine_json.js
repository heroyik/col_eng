const fs = require('fs');
const path = require('path');

const combineJsonParts = () => {
    let combined = {};
    for (let i = 1; i <= 6; i++) {
        const filePath = path.join(__dirname, `expressions_part${i}.json`);
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        combined = { ...combined, ...data };
    }

    const outputPath = path.join(__dirname, 'expressions_upload.json');
    fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2), 'utf8');
    console.log(`Successfully combined 6 parts into ${outputPath}`);
    console.log(`Total expressions: ${Object.keys(combined).length}`);
};

combineJsonParts();
