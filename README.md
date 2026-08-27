# Mason Koski Real Estate

*Community-first real estate for Atlanta's first-time buyers.*

A two-page marketing site for Mason Koski, an Atlanta REALTOR® with Keller
Williams Metro Atlanta. Self-contained, framework-free HTML — no build
tooling required to view it, no bundler, no dependencies to install.

---

## Pages

| Page | File | What's on it |
|---|---|---|
| Homepage | [`index.html`](index.html) | Hero, why-work-with-me pillars, 9 neighborhood guides (intown + North Fulton), buyer/seller paths, Zillow reviews, market snapshot, FAQ, guide capture |
| My Story | [`my-story.html`](my-story.html) | A four-chapter narrative from Decatur through VAMO Rising Professionals |

Both pages share one design system, one nav (with a mobile hamburger menu
below 960px), and cross-link to each other.

## Quick start

Nothing to install. Open a file directly in a browser, or serve the
directory so relative links and routing behave the way they would in
production:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Rebuilding from source

`index.html` and `my-story.html` are generated, not hand-edited. The real
source is the `*-template.html` files plus the assets below — `build.js`
stitches them together:

```bash
node build.js local
```

| Placeholder | Filled with |
|---|---|
| `%%LOGO%%` | `logo.b64` — the wordmark, inlined as base64 |
| `%%PORTRAIT%%` | `portrait.b64` — the hero portrait, inlined as base64 |
| `%%VAMOSVG%%` | `vamo-logo.svg` — a hand-traced vector of the VAMO logo |
| `%%HOMELINK%%` / `%%STORYLINK%%` | Cross-page URLs — relative filenames locally, or full URLs when publishing to hosted previews (`node build.js artifact <storyUrl> <homeUrl>`) |

Edit a template or swap an asset, then rerun the build — never edit
`index.html` or `my-story.html` directly, since the next build overwrites them.

## Design system

**"Porcelain & porch light"** — a warm cream ground with a single china-blue
accent, sampled from Mason's own portrait and wardrobe rather than picked
off a color wheel.

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#f7f2e9` | Default ground |
| `--paper-alt` | `#efe6d6` | Alternating band |
| `--ink` | `#241d14` | Primary text, light grounds |
| `--ink-deep` | `#191309` | Deepest ground (reviews, footer) |
| `--blue` | `#b7cdf4` | Accent on dark grounds |
| `--blue-deep` | `#2d4d9c` | Accent on light grounds |

Every text/background pairing is contrast-checked against WCAG AA
(computed, not eyeballed) — `ink` on `paper` runs 14.9:1, `blue-deep` holds
7.1:1 on `paper` and 6.4:1 even on the alternating band.

**Type:** [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4)
for display, [Public Sans](https://fonts.google.com/specimen/Public+Sans)
for body copy, both loaded from Google Fonts.

**Motion:** scroll-triggered cascades and a word-by-word hero reveal, all
`transform`/`opacity` only. `prefers-reduced-motion` gets a fully finished
static state, not just motion switched off.

## Project structure

```
.
├── index.html                 ← generated homepage (do not hand-edit)
├── my-story.html              ← generated About page (do not hand-edit)
├── mason-koski-template.html  ← homepage source
├── my-story-template.html     ← About page source
├── build.js                   ← stitches templates + assets into output
├── logo.b64                   ← wordmark, base64
├── portrait.b64               ← hero portrait, base64
├── vamo-logo.svg              ← traced VAMO Rising Professionals logo
└── mason-portrait.jpg         ← original portrait (source for portrait.b64)
```

## Deployment

Static site, deployed on [Vercel](https://vercel.com) with no framework
preset. `index.html` is required at the repo root — Vercel serves it as `/`
automatically on every push to `main`.

## Compliance notes

Broker attribution, license number, and Equal Housing Opportunity marking
appear in the footer of both pages per GREC advertising rules. Market
statistics and Zillow review figures are dated and sourced inline; treat
anything marked for verification as pending a final accuracy pass before
this goes fully live.

---

Built by [ClipPlayMedia](https://github.com/rbradyjordan).
