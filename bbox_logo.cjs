const fs = require('fs');
const content = fs.readFileSync('./src/assets/logo_potrace_fixed.svg', 'utf8');
const match = content.match(/d="([^"]+)"/);
if (match) {
  const d = match[1];
  const coords = d.match(/-?[\d.]+/g).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < coords.length; i += 2) {
    if (coords[i] < minX) minX = coords[i];
    if (coords[i] > maxX) maxX = coords[i];
    if (coords[i+1] < minY) minY = coords[i+1];
    if (coords[i+1] > maxY) maxY = coords[i+1];
  }
  console.log({minX, minY, maxX, maxY});
}
