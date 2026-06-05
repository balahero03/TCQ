const Jimp = require('jimp');

Jimp.read('./src/assets/logo.png')
  .then(image => {
    return image.invert().writeAsync('./src/assets/logo_inverted.png');
  })
  .then(() => {
    console.log("Inverted!");
    const potrace = require('potrace');
    const fs = require('fs');

    potrace.trace('./src/assets/logo_inverted.png', {
      color: '#F0EAE2',
      background: 'transparent',
      optTolerance: 0.2,
      turdSize: 2,
      alphaMax: 1,
      optCurve: true
    }, function(err, svg) {
      if (err) throw err;
      fs.writeFileSync('./src/assets/logo_potrace.svg', svg);
      console.log("Done tracing inverted logo.");
    });
  })
  .catch(err => {
    console.error(err);
  });
