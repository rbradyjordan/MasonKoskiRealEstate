// Build script — stitches templates into the two deployable pages.
//
// Modes:
//   node build.js            → PROD (what gets committed & deployed):
//                              images as separate cacheable files and clean
//                              cross-page URLs (/ and /my-story — vercel.json
//                              sets cleanUrls, so .html never appears)
//   node build.js local      → file:// preview: JPEGs inlined as base64,
//                              links point at the .html files directly
//   node build.js artifact <storyUrl> <homeUrl>
//                            → hosted preview: base64 images + full URLs
//
// PROD keeps the base64 out of the HTML on purpose: inlining the two
// portraits made index.html ~340KB, and every byte of it blocked first
// paint. As files they cache once.
//
// No AVIF, deliberately: macOS `sips -s format avif` output decodes to solid
// black in Chromium (verified in Chrome 152 by sampling canvas pixels) while
// rendering perfectly in Safari — so it looks fine on the Mac you build on
// and blanks the hero for every Chrome visitor. Use a real encoder
// (avifenc / squoosh) and pixel-check in Chrome before reintroducing it.
const fs = require('fs');

const mode = process.argv[2] || 'prod';
const prod = mode === 'prod';

const IMAGES = {
  PORTRAIT: { file: 'mason-koski-atlanta-realtor', b64: 'portrait.b64' },
  STANDING: { file: 'mason-koski-realtor-compass-atlanta', b64: 'standing.b64' },
};

const fill = {};
for (const [key, img] of Object.entries(IMAGES)) {
  fill[key] = prod
    ? `${img.file}.jpg`
    : 'data:image/jpeg;base64,' + fs.readFileSync(img.b64, 'utf8').trim();
}

fill.STORYLINK =
  mode === 'artifact' ? process.argv[3] : mode === 'local' ? 'my-story.html' : '/my-story';
fill.HOMELINK =
  mode === 'artifact' ? process.argv[4] : mode === 'local' ? 'index.html' : '/';

function build(tpl, out) {
  let html = fs.readFileSync(tpl, 'utf8');
  for (const key of Object.keys(fill)) {
    html = html.split(`%%${key}%%`).join(fill[key]);
  }
  fs.writeFileSync(out, html);
  const left = (html.match(/%%[A-Z]+%%/g) || []).length;
  console.log(`${out}: ${fs.statSync(out).size} bytes, placeholders left: ${left}`);
  if (left) process.exitCode = 1;
}

build('mason-koski-template.html', 'index.html');
build('my-story-template.html', 'my-story.html');
