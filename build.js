// Build script — injects base64 assets, dachshund SVGs, and cross-page links.
// Usage: node build.js local | node build.js artifact <storyUrl> <homeUrl>
const fs = require('fs');

const mode = process.argv[2] || 'local';
const storyLink = mode === 'artifact' ? process.argv[3] : 'my-story.html';
const homeLink  = mode === 'artifact' ? process.argv[4] : 'index.html';

const logo = fs.readFileSync('logo.b64', 'utf8').trim();
const portrait = fs.readFileSync('portrait.b64', 'utf8').trim();
let vamo = fs.readFileSync('vamo-logo.svg', 'utf8').trim()
  .replace(/ role="img" aria-label="[^"]*"/, '')
  .replace(/<title>.*?<\/title>\n?/, '');

// Dachshund, side view, facing right. Simple shapes only — body, head,
// snout, ear, four legs, wagging tail. One drawing, two costumes.
// ear = a darker shade of the body (reads as an ear, not a hole);
// face = eye + nose dots
const pupBody = (ear, face) => `
  <g class="tail"><rect x="16" y="28" width="30" height="9" rx="4.5" transform="rotate(-30 46 37)"/></g>
  <rect x="30" y="38" width="118" height="34" rx="17"/>
  <rect x="44" y="62" width="10" height="26" rx="5"/>
  <rect x="66" y="62" width="10" height="26" rx="5"/>
  <rect x="106" y="62" width="10" height="26" rx="5"/>
  <rect x="128" y="62" width="10" height="26" rx="5"/>
  <circle cx="152" cy="34" r="17"/>
  <rect x="158" y="28" width="34" height="14" rx="7"/>
  <circle cx="191" cy="32" r="2.6" fill="${face}"/>
  <g class="ear"><ellipse cx="143" cy="42" rx="6" ry="12" fill="${ear}"/></g>
  <circle class="eye" cx="160" cy="29" r="2.8" fill="${face}"/>`;

// Parade: cream silhouettes on the cobalt band; subtle same-family details.
const PUP = `<svg class="pup" viewBox="0 0 200 92" aria-hidden="true" fill="currentColor">${pupBody('#c8d9f7', '#2d4d9c')}</svg>`;

// Feature dog: powder blue on ink-deep; darker-blue ear, ink face, gold collar.
const BIGPUP = `<svg class="bigpup" viewBox="0 0 200 92" role="img" aria-label="A dachshund, tail wagging" fill="currentColor">
  ${pupBody('#7d97cf', '#191309')}
  <rect x="136" y="42" width="9" height="20" rx="4" fill="#f2c14e"/>
</svg>`;

function build(tpl, out) {
  let html = fs.readFileSync(tpl, 'utf8');
  html = html
    .split('%%LOGO%%').join(logo)
    .split('%%PORTRAIT%%').join(portrait)
    .split('%%VAMOSVG%%').join(vamo)
    .split('%%PUP%%').join(PUP)
    .split('%%BIGPUP%%').join(BIGPUP)
    .split('%%STORYLINK%%').join(storyLink)
    .split('%%HOMELINK%%').join(homeLink);
  fs.writeFileSync(out, html);
  const left = (html.match(/%%[A-Z]+%%/g) || []).length;
  console.log(`${out}: ${fs.statSync(out).size} bytes, placeholders left: ${left}`);
}

build('mason-koski-template.html', 'index.html');
build('my-story-template.html', 'my-story.html');
