const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '잉툰.json');
const uploadFile = path.join(__dirname, '잉툰upload.json');

const sourceData = JSON.parse(fs.readFileSync(sourceFile, 'utf8'));
const uploadData = JSON.parse(fs.readFileSync(uploadFile, 'utf8'));

console.log(`Source count: ${sourceData.length}`);
console.log(`Upload count: ${uploadData.length}`);

let errors = [];

sourceData.forEach((s, index) => {
    const u = uploadData[index];
    if (!u) {
        errors.push(`Missing entry for index ${index} (${s.english})`);
        return;
    }
    
    // Check primary/english
    if (s.english.trim() !== u.primary.trim()) {
        errors.push(`Mismatch at index ${index}: Source "${s.english}" vs Upload "${u.primary}"`);
    }
    
    // Check meaning
    if (s.korean.trim() !== u.meaning.trim()) {
        errors.push(`Meaning mismatch at index ${index}: Source "${s.korean}" vs Upload "${u.meaning}"`);
    }
    
    // Check structure
    if (!u.id || u.id !== (680 + index)) {
        errors.push(`ID mismatch at index ${index}: Expected ${680 + index}, got ${u.id}`);
    }
    
    if (!u.similar || u.similar.length !== 5) {
        errors.push(`Similar count mismatch at index ${index}: Got ${u.similar ? u.similar.length : 0}`);
    }
    
    if (!u.example || u.example.split('\n').length !== 6) {
        errors.push(`Example line count mismatch at index ${index}: Got ${u.example ? u.example.split('\n').length : 0}`);
    }
});

if (errors.length === 0) {
    console.log("✅ Verification successful! All 41 entries match 잉툰.json perfectly.");
} else {
    console.log("❌ Verification failed:");
    errors.forEach(e => console.log(e));
}
