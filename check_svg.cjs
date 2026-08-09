const fs = require('fs');
const code = fs.readFileSync('src/components/Hero.jsx', 'utf8');
const match = code.match(/const CAT_PATH = "(.*?)";/);
if (match) {
  const path = match[1];
  const subpaths = path.split(' M ').map((p, i) => (i === 0 ? p : 'M ' + p));
  subpaths.forEach((p, i) => {
    console.log('Subpath', i, 'starts with', p.substring(0, 30));
  });
}
