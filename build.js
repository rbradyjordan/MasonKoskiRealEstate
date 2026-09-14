// Build script — stitches templates into the two deployable pages.
//
// Modes:
//   node build.js            → PROD (what gets committed & deployed):
//                              images as separate cacheable files, clean
//                              cross-page URLs (/ and /my-story — vercel.json
//                              sets cleanUrls, so .html never appears)
//   node build.js local      → file:// preview: images inlined as base64,
//                              links point at the .html files directly
//   node build.js artifact <storyUrl> <homeUrl>
//                            → hosted preview: base64 images + full URLs
//
// PROD keeps the base64 out of the HTML on purpose: inlining the two
// portraits made index.html ~340KB, and every byte of it blocked first
// paint. As files they cache once and the document drops to ~50KB.
const fs = require('fs');

const mode = process.argv[2] || 'prod';

const inline = mode !== 'prod';
const b64 = (f) => 'data:image/jpeg;base64,' + fs.readFileSync(f, 'utf8').trim();

const portrait = inline ? b64('portrait.b64') : 'portrait.jpg';
const standing = inline ? b64('standing.b64') : 'standing.jpg';

const storyLink =
  mode === 'artifact' ? process.argv[3] :
  mode === 'local'    ? 'my-story.html' : '/my-story';
const homeLink =
  mode === 'artifact' ? process.argv[4] :
  mode === 'local'    ? 'index.html' : '/';

function build(tpl, out) {
  let html = fs.readFileSync(tpl, 'utf8');
  html = html
    .split('%%PORTRAIT%%').join(portrait)
    .split('%%STANDING%%').join(standing)
    .split('%%STORYLINK%%').join(storyLink)
    .split('%%HOMELINK%%').join(homeLink);
  fs.writeFileSync(out, html);
  const left = (html.match(/%%[A-Z]+%%/g) || []).length;
  console.log(`${out}: ${fs.statSync(out).size} bytes, placeholders left: ${left}`);
}

build('mason-koski-template.html', 'index.html');
build('my-story-template.html', 'my-story.html');
