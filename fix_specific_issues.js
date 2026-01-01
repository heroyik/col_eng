const fs = require('fs');
const filePath = 'db/DONE_20260101_COL_ENG_1484_vietnamese_complete.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Fixers
const fixes = {
    // 295: "Delulu is the solulu" (Internet slang)
    295: (s) => s.replace(/\s*\(Internet slang:.*?\)/i, ''),
    
    // 479: Note about context
    479: (s) => s.replace(/\s*\(Depends on context.*?\)/i, ''),
    
    // 802: "感觉不太对劲 / 身体不太舒服 (Gǎnjué bù tài duìjìn / Shēntǐ bù tài shūfu)"
    // -> "感觉不太对劲 (Gǎnjué bù tài duìjìn) / 身体不太舒服 (Shēntǐ bù tài shūfu)"
    802: (s) => {
        // Hardcode fix to be safe
        return "感觉不太对劲 (Gǎnjué bù tài duìjìn) / 身体不太舒服 (Shēntǐ bù tài shūfu)";
    },
    
    // 804: "你的最佳选择 / 首选 (Nǐ de zuìjiā xuǎnzé / Shǒuxuǎn)"
    804: (s) => "你的最佳选择 (Nǐ de zuìjiā xuǎnzé) / 首选 (Shǒuxuǎn)",

    // 814: "请便吧 / 随你便 (Qǐngbiàn ba / Suí nǐ biàn)"
    814: (s) => "请便吧 (Qǐngbiàn ba) / 随你便 (Suí nǐ biàn)"
};

let count = 0;
data.forEach(r => {
    if (fixes[r.id]) {
        const old = r.chinese;
        const newer = fixes[r.id](old);
        if (old !== newer) {
            r.chinese = newer;
            count++;
            console.log(`Fixed ID ${r.id}:`);
            console.log(`  Old: ${old}`);
            console.log(`  New: ${newer}`);
        }
    }
});

if (count > 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Saved ${count} corrections.`);
}
