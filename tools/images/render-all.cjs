// Rebuild every generated case-study image, desktop and phone. Run: npm run images
const { execFileSync } = require('child_process');
const path = require('path');
const scripts = ['pmi-screens', 'pmi-diagrams', 'uw-diagrams', 'uw-map', 'lr-screens', 'lr-system', 'lr-timeline', 'mobile'];
for (const s of scripts) {
  console.log(s);
  execFileSync(process.execPath, [path.join(__dirname, s + '.cjs')], { stdio: 'inherit' });
}
