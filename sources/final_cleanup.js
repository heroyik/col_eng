const fs = require('fs');

const FILE_PATH = 'c:\\Users\\heroy\\COL_ENG\\sources\\opical_ready.json';

try {
  let data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  const initialLength = data.length;
  console.log(`Initial Item Count: ${initialLength}`);

  // 1. Define items to DELETE (Exact Primary Match or partial match for safety)
  const itemsToDelete = [
    "MY WINDOWS AND PHONE SCREEN WILL SHATTER!!!!!!",
    "Do one long ways too",
    "키즈랩스 밀키즈",
    "Kids Labs Milkids,",
    "인대",
    "식빵",
    "생크림",
    "custard cream",
    "Sauté diced beef",
    "Speculator",
    "I am challenged",
    "I doubt it",
    "CreAm butter",
    "Butter cream",
    "historical drama"
  ];

  // Filter out garbage
  data = data.filter(item => !itemsToDelete.includes(item.primary));
  console.log(`Removed ${initialLength - data.length} garbage items.`);

  // 2. Define items to UPDATE
  const updates = {
    "It Figures": {
      meaning: "그럼 그렇지. (예상대로야)",
      similar: ["No surprise.", "Typical.", "Expected.", "Just my luck.", "Of course."],
      examples: [
        "A: The bus is late.", 
        "B: It figures. It's raining.", 
        "A: Always happens.", 
        "B: We should have walked.", 
        "A: Too wet.", 
        "B: Too late."
      ]
    },
    "Out of question for dinner": {
      newPrimary: "Out of the question",
      meaning: "말도 안 돼. (절대 불가능해)",
      similar: ["Impossible.", "No way.", "Not happening.", "Forget it.", "Off the table."],
      examples: [
        "A: Can I borrow your car?", 
        "B: Out of the question.", 
        "A: Why?", 
        "B: You crashed the last one.", 
        "A: That was an accident.", 
        "B: Exactly."
      ]
    }
  };

  // Apply updates
  let updatedCount = 0;
  data = data.map(item => {
    if (updates[item.primary]) {
      console.log(`Updating: ${item.primary}`);
      const updateData = updates[item.primary];
      
      const newItem = { ...item };
      if (updateData.newPrimary) newItem.primary = updateData.newPrimary;
      if (updateData.meaning) newItem.meaning = updateData.meaning;
      if (updateData.similar) newItem.similar = updateData.similar;
      if (updateData.examples) newItem.examples = updateData.examples;
      
      updatedCount++;
      return newItem;
    }
    return item;
  });
  console.log(`Updated ${updatedCount} items.`);

  // Write back to file
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log(`Successfully saved cleaned data to ${FILE_PATH}`);
  console.log(`Final Item Count: ${data.length}`);

} catch (err) {
  console.error("Error processing file:", err);
}
