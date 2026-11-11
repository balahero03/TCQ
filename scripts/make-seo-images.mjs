// One-off generator for the SEO/social images in public/. Re-run after a logo change:
//   node scripts/make-seo-images.mjs
import sharp from 'sharp';

const BROWN = '#382525';
const CREAM = '#FAF3E6';

// 1200×630 share card: the official white lockup centred on brand brown.
const lockup = await sharp('src/assets/brand/logo-lockup-white.webp')
  .resize({ width: 760, height: 380, fit: 'inside' })
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: BROWN } })
  .composite([{ input: lockup, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png');

// Square icons: the official brown icon on cream, with breathing room.
async function icon(size, file) {
  const inner = Math.round(size * 0.72);
  const mark = await sharp('src/assets/brand/logo-icon-brown.webp')
    .resize({ width: inner, height: inner, fit: 'inside' })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(`public/${file}`);
}
await icon(180, 'apple-touch-icon.png');
await icon(192, 'icon-192.png');
await icon(512, 'icon-512.png');
console.log('SEO images written to public/');
