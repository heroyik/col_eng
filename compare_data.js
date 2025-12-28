const fs = require('fs');
const path = require('path');

const compareData = () => {
    const jsonPath = path.join(__dirname, 'expressions_upload.json');
    const txtPath = path.join(__dirname, '권아나 300.txt');

    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const txtData = fs.readFileSync(txtPath, 'utf8');
    const txtLines = txtData.split('\n').map(l => l.replace('\r', '')).filter(line => line.trim() !== '');

    let log = [];
    log.push(`JSON count: ${Object.keys(jsonData).length}`);
    log.push(`TXT line count: ${txtLines.length}`);

    let mismatches = [];
    let missing = [];

    txtLines.forEach((line, index) => {
        const parts = line.split(' - ');
        if (parts.length < 2) return;
        
        const primaryTxt = parts[0].replace(/^\d+:\s*/, '').trim();
        const meaningTxt = parts[1].trim();
        
        const key = `expression_${380 + index}`;
        const jsonEntry = jsonData[key];

        if (!jsonEntry) {
            missing.push(`Missing key: ${key} (Original: ${primaryTxt})`);
        } else {
            if (jsonEntry.primary.trim().toLowerCase() !== primaryTxt.toLowerCase()) {
                mismatches.push(`${key} PRIMARY: JSON("${jsonEntry.primary}") vs TXT("${primaryTxt}")`);
            }
            if (jsonEntry.meaning.trim() !== meaningTxt) {
                mismatches.push(`${key} MEANING: JSON("${jsonEntry.meaning}") vs TXT("${meaningTxt}")`);
            }
        }
    });

    if (mismatches.length === 0 && missing.length === 0 && Object.keys(jsonData).length === txtLines.length) {
        log.push("SUCCESS: 100% coverage and accuracy confirmed!");
    } else {
        log.push("VERIFICATION FAILED:");
        if (missing.length > 0) log.push("MISSING:\n" + missing.join('\n'));
        if (mismatches.length > 0) log.push("MISMATCHES:\n" + mismatches.join('\n'));
        if (Object.keys(jsonData).length !== txtLines.length) {
            log.push(`Count discrepancy: JSON(${Object.keys(jsonData).length}) vs TXT(${txtLines.length})`);
        }
    }

    fs.writeFileSync(path.join(__dirname, 'comparison_report.txt'), log.join('\n'), 'utf8');
};

compareData();
