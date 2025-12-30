const fs = require('fs');
const data = require('./opical_ready.json');

const pattern = /.+\s\([가-힣\s\?]+\)$/; // Regex for "English (Korean)" roughly

const matches = data.filter(item => {
    // Check if primary matches the pattern
    return pattern.test(item.primary);
});

console.log(`Total items: ${data.length}`);
console.log(`Matching items: ${matches.length}`);
console.log('Sample matches:', matches.slice(0, 5).map(m => m.primary));
