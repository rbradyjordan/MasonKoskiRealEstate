# SEO Plan — masonkoskirealestate.com

*Written 2026-09-14. The technical layer shipped with this commit; everything
below is ranked by impact. Search compounds with a lag measured in months —
the profile + review work carries leads while the rankings build.*

## Where this stands

A solo agent site will not outrank Zillow for "atlanta homes for sale," and
shouldn't try. The winnable searches are **the ones with Mason's name on
them, the map pack, and the long tail** — neighborhood + intent queries where
the competition is other agents' template sites, most of which have no
metadata, no schema, and no local content depth. That's the field this plan
plays on.

## Keyword map

| Query cluster | Intent | Page that owns it | Status |
|---|---|---|---|
| `mason koski` / `mason koski realtor` | Navigational | `/` | ✅ owns it — schema + titles shipped |
| `atlanta real estate agent`, `realtor atlanta` | Transactional | `/` | Title/H1/schema shipped; map pack does the heavy lifting (see GBP) |
| `first time home buyer agent atlanta` | Transactional | `/` today → dedicated buyer page | Positioning matches ("community-first, first-time buyers") — underserved query, build the page |
| `[neighborhood] realtor` × 9 (Va-Hi, Midtown, Decatur, O4W, Inman Park, Kirkwood, Smyrna, Buckhead, Alpharetta) | Transactional | Homepage section today → one page each | **Biggest content gap.** Cards exist; pages don't |
| `best neighborhoods in atlanta for first time buyers` | Commercial | New guide page | Nobody local answers it well; strong fit |
| `how much does a buyers agent cost atlanta` | Commercial | New FAQ/guide | The unasked pricing question — answering it visibly is the wedge |

Rules already in force: one page per cluster; content that must rank is in
the HTML (this site is static — keep it that way); every new page gets its
own title, description, canonical, OG, and a sitemap entry.

## Off-site — this is most of the ranking, in order

1. **Google Business Profile** — the map pack outranks every website in this
   category. Claim/create "Mason Koski, REALTOR® — Compass": primary category
   *Real estate agent*, service area metro Atlanta, phone (404) 884-3134,
   website the naked domain, 20+ real photos, services listed by name.
   Mason does this herself (Google verifies identity). *Without this, the
   on-page work is fighting with one hand.*
2. **Fix the NAP break.** GeorgiaMLS (agent MK5777) still says **Keller
   Williams** *and* lists the old team email `mason@thedammannteam.com`;
   Homes.com and other citations predate Compass. Same name,
   brokerage, and phone everywhere — the inconsistency is an invisible drag,
   and stale KW listings actively confuse Google about who she is.
3. **Review velocity.** Zillow shows 5.0 × 10 reviews. Target: **2/month,
   steady, split between Google (once GBP exists) and Zillow** — recency
   beats totals. Ask at closing, text the link, respond to every one.
4. **Citations that matter for agents:** realtor.com, Zillow (done),
   Homes.com (update). **Her Compass profile
   ([compass.com/agents/mason-koski](https://www.compass.com/agents/mason-koski/))
   shows no website link** — getting this domain added there is the single
   most authoritative backlink available to her, and it's a form field.
   LinkedIn (link the site), Instagram bio link → domain, not Linktree.
5. **Links she already earned:** the VoyageATL feature exists — ask them to
   link the domain. VAMO Rising Professionals site/socials should link her
   site. Every future panel, market, or press mention: ask for the link.

## Content roadmap (the ranking ceiling)

Two pages can't cover nine neighborhoods. In order:

1. **Neighborhood pages** (start with 3: Virginia-Highland — she lives
   there, Decatur — her roots, Midtown). Each needs *real* content: her
   actual deals/knowledge, walkability, price bands, "who this fits."
   Boilerplate with the name swapped is a doorway page — worse than nothing.
2. **First-time buyer guide** — the positioning page. Process, costs,
   Georgia specifics, her role. Targets the underserved commercial cluster.
3. **Seller page** — exists as a homepage card; needs its own URL.
4. Case-study style "recent moves" as she closes — `[neighborhood] + proof`.

Each: written from an interview with Mason, not generated filler. Facts only
she can supply are the moat.

## Housekeeping / pending

- [ ] License number in the footer (GREC) — get from Mason
- [ ] Search Console: verify domain, submit sitemap, watch CWV field data
- [ ] Analytics with the Formspree submit + tel/mailto taps as goals;
      **capture the baseline now** so the work can be proven
- [ ] Accessibility statement page — parked on branch
      `accessibility-page-aug27`, predates the redesign; rebuild against the
      black theme when touched next
- [ ] The old cream-era claims (market stats) — verify dates before reuse

## Pass 2 — what shipped (2026-09-14)

- **Heading outline repaired.** Pillars had `h3`s under no `h2`; footer
  jumped to `h4`; My Story's narrative had **no content headings at all**.
  All fixed without any visual change.
- **H1 keyword made visible, not hidden.** Pass 1 put "Atlanta real estate
  agent" in sr-only text that no sighted user sees — defensible, but hidden
  text that differs from the visible headline is exactly what Google's
  spam guidance is wary of. The eyebrow "Atlanta REALTOR® · Compass" now sits
  *inside* the `h1` instead: real, visible, identical on screen.
- **Neighborhood deep links.** 9 cards all linked to `#neighborhoods` — the
  section they're already in. Each now has its own anchor for sharing.
- **Schema depth.** Services offered, UGA, home neighborhood, the VoyageATL
  feature as `subjectOf`, Compass profile in `sameAs`, neighborhoods nested
  inside Atlanta. GeorgiaMLS **removed** from `sameAs` — it still says Keller
  Williams, and declaring it the same entity feeds Google the stale
  brokerage. Re-add once corrected.
- **Crawl extras.** Image sitemap, `max-image-preview:large`, `og:type
  profile` on My Story, `llms.txt`, branded `noindex` 404, cache + security
  headers, keyword image filenames, a Formspree honeypot, one unused font
  weight dropped.
- **Caught before shipping:** an AVIF upgrade (images at ~25% of JPEG size)
  decoded to **solid black in Chrome** — verified by sampling pixels — while
  looking perfect in Safari. Reverted; documented in `build.js`.

## Pass 1 — what shipped (2026-09-14)

Proper HTML skeleton (`doctype`/`lang` — the pages had none); query-led
titles + descriptions; canonicals; OG/Twitter + `og.jpg`; favicon;
`RealEstateAgent`/`Person`/`WebSite`/`ProfilePage`/`Breadcrumb` JSON-LD;
robots.txt + sitemap.xml; cleanUrls + `.vercel.app` → domain 308 (duplicate
host was live and indexable); base64 images moved to cacheable files
(index.html 341KB → 53KB, hero `fetchpriority="high"`); keyword-bearing H1
(sr-only, visible copy untouched); no rating markup (self-serving
`AggregateRating` violates Google policy — reviews stay visible on-page).
