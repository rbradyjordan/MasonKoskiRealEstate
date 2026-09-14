# Mason Koski Real Estate

*Community-first real estate for Atlanta's first-time buyers.*

The marketing site for Mason Koski, an Atlanta REALTOR® with Compass —
live at **[www.masonkoskirealestate.com](https://www.masonkoskirealestate.com)**.
Framework-free HTML: no bundler, no dependencies, one small build script.

---

## Pages

| Page | Source | Deployed at |
|---|---|---|
| Homepage | `mason-koski-template.html` → `index.html` | `/` |
| My Story | `my-story-template.html` → `my-story.html` | `/my-story` |

`vercel.json` sets `cleanUrls`, so `.html` never appears in production URLs.
Both pages share one design system (Compass-monochrome: near-black surface,
near-white text, a few bands flipped to white for rhythm) and one nav.

## Rebuilding from source

`index.html` and `my-story.html` are **generated — never hand-edit them.**
Edit a template, then:

```bash
node build.js            # PROD — what gets committed and deployed
node build.js local      # file:// preview (images inlined as base64)
node build.js artifact <storyUrl> <homeUrl>   # hosted preview
```

The prod build references the keyword-named JPEGs
(`mason-koski-atlanta-realtor.jpg`, `mason-koski-realtor-compass-atlanta.jpg`)
as separate cacheable files and uses clean cross-page URLs (`/`, `/my-story`). The other
modes inline `portrait.b64` / `standing.b64` so a single file is portable.
Inlining is preview-only on purpose: base64 pushed index.html to ~340KB and
every byte of it blocked first paint; as files, the document is ~56KB.

**No AVIF** — see the note in `build.js`. macOS `sips` AVIF output decodes to
solid black in Chrome while looking perfect in Safari. Don't reintroduce it
without a real encoder and a pixel check in Chrome.

## SEO

The head of each template carries the full stack — keep it intact and
per-page when adding pages:

- Written `<title>` + meta description per page (query-led, not brand-led)
- Canonical URLs on the `www.masonkoskirealestate.com` host
- Open Graph / Twitter cards → `og.jpg` (1200×630, cut from the headshot)
- JSON-LD: `RealEstateAgent` (with the two services from the "doors"
  section) + `Person` (UGA, Virginia-Highland, VoyageATL feature, Compass
  profile in `sameAs`) + `WebSite` on the homepage; `ProfilePage` +
  `BreadcrumbList` on My Story. It must always describe what's visibly on
  the page. GeorgiaMLS is deliberately **not** in `sameAs` until it stops
  listing Keller Williams. **No review/rating
  markup** — self-serving `AggregateRating` is against Google policy; the
  Zillow numbers stay visible on-page instead.
- `robots.txt` + `sitemap.xml` at the root — add new pages to the sitemap
- `vercel.json` 308s the `*.vercel.app` twin onto the real domain so the
  preview host can't index as duplicate content
- Heading outline is strict: one `h1` (it contains the visible
  "Atlanta REALTOR® · Compass" eyebrow), no skipped levels, footer labels are
  `h2`. The pillars label is `<h2 class="eyebrow">`, which is why the
  section-title size rule is `.sec-head h2:not(.eyebrow)`.
- Every neighborhood card has an id — `/#virginia-highland`, `/#decatur`,
  `/#old-fourth-ward`… — so GBP posts and Instagram can deep-link a card
- `robots` meta allows large image previews; `llms.txt` gives AI answer
  engines a factual summary; `404.html` is branded and `noindex`
- `vercel.json` adds cache headers for images and basic security headers
- Hero portrait is the LCP element: `fetchpriority="high"`, explicit
  dimensions everywhere, below-fold images `loading="lazy"`. Measured
  locally: CLS 0, LCP = the hero `h1`

Off-site work (Google Business Profile, citations, reviews) lives in
[`SEO-PLAN.md`](SEO-PLAN.md).

## Project structure

```
.
├── index.html / my-story.html      ← generated (do not hand-edit)
├── mason-koski-template.html       ← homepage source
├── my-story-template.html          ← My Story source
├── build.js                        ← stitches templates + assets
├── mason-koski-atlanta-realtor.jpg         ← hero headshot (prod)
├── mason-koski-realtor-compass-atlanta.jpg ← office portrait (prod)
├── portrait.b64 / standing.b64     ← same photos, inlined by preview builds
├── og.jpg                          ← 1200×630 social/link-preview card
├── robots.txt · sitemap.xml        ← crawl plumbing (sitemap lists images)
├── llms.txt                        ← factual summary for AI answer engines
├── 404.html                        ← branded, noindex
├── vercel.json                     ← cleanUrls, vercel.app → domain 308, headers
└── SEO-PLAN.md                     ← keyword map + off-site checklist
```

## Deployment

Static site on Vercel, no framework preset; every push to `main` deploys.
Apex 308s to `www` (dashboard-level), and `vercel.json` folds the
`.vercel.app` host into the domain.

## Compliance notes

Broker attribution (Compass, 1409 Peachtree St NE) and Equal Housing
Opportunity marking appear in the footer of both pages per GREC advertising
rules. **Pending:** Mason's license number in the footer — get it from her
and add it. Market statistics and review figures are dated and sourced
inline; verify before republishing them anywhere else.

---

Built by [ClipPlayMedia](https://github.com/rbradyjordan).
