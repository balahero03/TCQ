const potrace = require('potrace');
const fs = require('fs');

potrace.trace('./src/assets/logo.png', {
  color: '#F0EAE2',
  background: 'transparent',
  optTolerance: 0.2,
  turdSize: 2,
  alphaMax: 1,
  optCurve: true
}, function(err, svg) {
  if (err) throw err;
  fs.writeFileSync('./src/assets/logo_potrace.svg', svg);
  console.log("Done tracing logo.");
});
