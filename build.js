// Build script — injects the base64 portrait and cross-page links.
// Usage: node build.js local | node build.js artifact <storyUrl> <homeUrl>
const fs = require('fs');

const mode = process.argv[2] || 'local';
const storyLink = mode === 'artifact' ? process.argv[3] : 'my-story.html';
const homeLink  = mode === 'artifact' ? process.argv[4] : 'index.html';

const portrait = fs.readFileSync('portrait.b64', 'utf8').trim();
const standing = fs.readFileSync('standing.b64', 'utf8').trim();

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
