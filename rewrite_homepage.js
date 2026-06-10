const fs = require('fs');
let code = fs.readFileSync('app/(shop)/page.tsx', 'utf8');

// Remove LiveProductLanes component definition
const liveProductLanesRegex = /async function LiveProductLanes\(\) \{[\s\S]*?\}\n\n/g;
code = code.replace(liveProductLanesRegex, '');

// Remove imports for OilUsageSection and FAQSection
code = code.replace(/import \{ OilUsageSection \} from "@\/components\/shop\/OilUsageSection";\n/, '');
code = code.replace(/import \{ FAQSection \} from "@\/components\/shop\/FAQSection";\n/, '');

// Remove Suspense LiveProductLanes block
code = code.replace(/\{\/\* 3\. Live product lanes from DB.*?<\/Suspense>\n\n/s, '');

// Remove OilUsageSection block
code = code.replace(/\{\/\* 5\. Which Oil for Which Use \*\/\}\n\s*<OilUsageSection \/>\n\n/g, '');

// Remove FAQSection block
code = code.replace(/\{\/\* 12\. FAQ \*\/\}\n\s*<FAQSection \/>\n\n/g, '');

fs.writeFileSync('app/(shop)/page.tsx', code);
console.log('Homepage rewritten.');
