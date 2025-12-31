const fs = require('fs');
const path = 'c:\\Users\\heroy\\COL_ENG\\db\\20260101_COL_ENG_1484_backupjson';

console.log('Starting Spanish Translation Verification...\n');

try {
  const data = JSON.parse(fs.readFileSync(path, 'utf8'));
  
  let totalRecords = 0;
  let hasSpanish = 0;
  let potentialIssues = [];
  
  data.forEach(item => {
    totalRecords++;
    
    if (item.spanish && item.spanish.trim() !== '') {
      hasSpanish++;
      
      // Check for generic/placeholder patterns that might indicate incorrect translations
      const spanish = item.spanish.toLowerCase();
      const primary = item.primary.toLowerCase();
      
      // Flag potential issues
      let issues = [];
      
      // Check if Spanish contains the ID number (placeholder pattern)
      if (spanish.includes(`${item.id}`)) {
        issues.push('Contains ID number (likely placeholder)');
      }
      
      // Check if Spanish is too generic
      if (spanish.includes('expresión') && spanish.includes('español')) {
        issues.push('Generic placeholder text detected');
      }
      
      // Check if both expressions are identical (shouldn't happen)
      const spanishParts = item.spanish.split('/').map(s => s.trim());
      if (spanishParts.length === 2 && spanishParts[0] === spanishParts[1]) {
        issues.push('Both Spanish expressions are identical');
      }
      
      // Check if Spanish is suspiciously short (less than 5 characters)
      if (item.spanish.length < 5) {
        issues.push('Spanish translation too short');
      }
      
      // Check if Spanish doesn't have the expected format (two expressions separated by /)
      if (!item.spanish.includes('/')) {
        issues.push('Missing "/" separator between expressions');
      }
      
      if (issues.length > 0) {
        potentialIssues.push({
          id: item.id,
          primary: item.primary,
          spanish: item.spanish,
          meaning: item.meaning,
          issues: issues
        });
      }
    }
  });
  
  console.log('=== VERIFICATION SUMMARY ===');
  console.log(`Total Records: ${totalRecords}`);
  console.log(`Records with Spanish: ${hasSpanish}`);
  console.log(`Records without Spanish: ${totalRecords - hasSpanish}`);
  console.log(`Potential Issues Found: ${potentialIssues.length}\n`);
  
  if (potentialIssues.length > 0) {
    console.log('=== POTENTIAL ISSUES ===\n');
    potentialIssues.slice(0, 20).forEach(issue => {
      console.log(`ID ${issue.id}: ${issue.primary}`);
      console.log(`  Spanish: ${issue.spanish}`);
      console.log(`  Korean: ${issue.meaning}`);
      console.log(`  Issues: ${issue.issues.join(', ')}`);
      console.log('');
    });
    
    if (potentialIssues.length > 20) {
      console.log(`... and ${potentialIssues.length - 20} more issues\n`);
    }
    
    // Save full report to file
    const reportPath = 'c:\\Users\\heroy\\COL_ENG\\db\\spanish_verification_report.json';
    fs.writeFileSync(reportPath, JSON.stringify(potentialIssues, null, 2), 'utf8');
    console.log(`Full report saved to: ${reportPath}`);
  } else {
    console.log('✅ No obvious issues detected!');
    console.log('All Spanish translations appear to have proper format.');
  }
  
} catch (error) {
  console.error('Error during verification:', error);
}
