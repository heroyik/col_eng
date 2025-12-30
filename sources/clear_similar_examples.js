const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'firebase_import_ready_20240820.json');

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(data);

    let modifiedCount = 0;

    jsonData.forEach(item => {
        // Clear similar array if it has items
        if (item.similar && item.similar.length > 0) {
            item.similar = [];
            modifiedCount++;
        }
        
        // Clear examples array if it has items
        if (item.examples && item.examples.length > 0) {
            item.examples = [];
            modifiedCount++;
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`Successfully processed file. Cleared fields in ${modifiedCount} entries (approximated, as one entry counts once for either or both changes).`);

} catch (err) {
    console.error('Error processing file:', err);
}
