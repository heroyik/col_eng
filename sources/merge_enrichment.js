const fs = require('fs');
const path = require('path');

const mainFile = 'c:/Users/heroy/COL_ENG/sources/opical_ready.json';
const batchFile = 'c:/Users/heroy/COL_ENG/sources/enrichment_batch_12.js';

const mainData = require(mainFile);
const batchData = require(batchFile);

let updateCount = 0;

batchData.forEach(batchItem => {
    // Find item in mainData by originalPrimary
    // We trim and normalize just in case
    const index = mainData.findIndex(item => item.primary.trim() === batchItem.originalPrimary.trim());
    
    if (index !== -1) {
        // Update the item
        mainData[index] = {
            ...mainData[index],
            ...batchItem.update
        };
        updateCount++;
    } else {
        console.warn(`Could not find item matching: "${batchItem.originalPrimary}"`);
    }
});

console.log(`Successfully merged ${updateCount} items.`);
fs.writeFileSync(mainFile, JSON.stringify(mainData, null, 2), 'utf8');
