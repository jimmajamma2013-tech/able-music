# SEO + Open Graph System — Final Review
**Date: 2026-03-15 | Revised: 2026-03-16**
**Spec-complete target: 9.5/10**

---

## What this doc is

Projected scores per dimension after P0, P1, and P2 implementation. The "spec-complete" state is after P2 — 9.5/10 is achievable on paper. A real 10/10 requires live indexing, GSC verification, and cross-platform social sharing testing, which can only be validated post-launch.

---

## Scores: before and after

| Dimension | Current | After P0 | After P1 | After P2 | Notes |
|---|---|---|---|---|---|
| Title tags | 6/10 | 7/10 | 7.5/10 | 9/10 | P0: richer format; P2: SSR means Google sees artist name immediately |
| Meta description | 5/10 | 7/10 | 7.5/10 | 9/10 | P0: JS updates the tag correctly; P2: SSR makes it reliable on first crawl |
| OG title | 6/10 | 7/10 | 7.5/10 | 9/10 | Richer format in P0; SSR in P2 |
| OG description | 6/10 | 7/10 | 7.5/10 | 9/10 | Bio cap in P0; SSR in P2 |
| OG image | 4/10 | 6.5/10 | 7/10 | **9.5/10** | P0: https:// check + fallback; P1: og-fallback.jpg deployed; P2: dynamic per-artist |
| Twitter/X card | 6/10 | 7.5/10 | 8/10 | 9/10 | P0: adds twitter:image + twitter:site + image dimensions |
| Canonical URL | 5/10 | 5.5/10 | 7/10 | 9.5/10 | P1: link rel canonical; P2: SSR |
| Structured data | 7/10 | 7/10 | 8.5/10 | 9.5/10 | P1: sameAs + @id; P2: Organisation schema on landing |
| Robots/noindex | 5/10 | 8.5/10 | 8.5/10 | 9.5/10 | P0: admin + fan noindex; P2: robots.txt |
| Landing page SEO | 7/10 | 7/10 | 8.5/10 | 9/10 | P1: title + structured data + desc update |
| **Overall** | **5.7/10** | **7.1/10** | **8.2/10** | **9.3/10** | |

---

## Score milestone table — what gets you to each number

| Score | What's required |
|---|---|
| 5.7/10 | Current state |
| 7.5/10 | P0 complete — all critical gaps closed in able-v7.html, admin.html, fan.html |
| 8/10 | Static `og-fallback.jpg` created and deployed to `https://ablemusic.co/og-fallback.jpg` |
| 8.5/10 | P1 complete — canonical link, sameAs in schema, landing.html title/desc, Organisation schema |
| 9.5/10 | P2 complete — dynamic per-artist OG image via Netlify function, SSR head rendering, sitemap |
| 10/10 | Post-launch validation: Twitter Card Validator passes, Google Search Console live, iMessage previews verified with real artist account |

---

## The OG image problem — honest explanation

The single most important dimension. This is what every artist's Instagram/TikTok/Twitter share preview depends on.

**The problem in one sentence:** Most ABLE artists who share their link today get a blank grey box in their social share card because their artwork is stored as a `data:` URI, which social crawlers cannot fetch.

**Why `data:` URIs appear:** When an artist uploads artwork via a local file picker (the current V1 method), the browser reads the file and creates a base64 string like `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAA...`. This string is stored in localStorage as `artworkUrl`. When `injectSEO()` runs, it sets `og:image` to this string. Social crawlers (Facebook's `facebookexternalhit`, Twitter's `Twitterbot`, Apple's `Applebot`) make an HTTP GET request to the URL in `og:image`. A `data:` URI is not an HTTP URL — the request fails, the image is blank.

**The fix hierarchy:**

1. **V1 (implement now — P0):** Check if `artworkUrl` is a real `https://` URL. If not, use the platform fallback image. Artists with locally-uploaded artwork get the branded fallback instead of a blank card. Not perfect, but infinitely better.

2. **Static fallback (design task — P1):** Create `og-fallback.jpg` (1200×630, Midnight Navy background, ABLE wordmark). Deploy to `https://ablemusic.co/og-fallback.jpg`. Now the fallback is a proper branded card instead of a 404.

3. **V2 (after Supabase — P2):** Artwork uploads to Supabase Storage, getting real `https://` URLs. The `og:image` can then point directly to the artwork. Combined with the Netlify dynamic OG image function, every artist gets a custom social card with their actual artwork.

**Until V2:** Any artist who shared their link today and got a blank card will continue to get the branded fallback after P0 is shipped. This is the honest V1 state. The share card will look professional (ABLE brand, not blank) but not personalised to each artist.

---

## Social sharing test matrix

What the share preview card shows when an artist pastes their ABLE link on each platform.

| Platform | Current state | After P0 | After P1 (og-fallback deployed) | After P2 (SSR + dynamic OG) |
|---|---|---|---|---|
| Twitter/X | Generic fallback title/desc, likely blank image | Artist name + bio (capped) + artwork if https://, else fallback URL (may 404) | Artist name + bio + ABLE branded fallback card | Custom per-artist artwork card, correct in all cases |
| iMessage | Blank — Applebot doesn't execute JS | Blank — JS constraint unchanged | Blank — SSR not yet in place | Correct artist name, bio, and artwork — SSR pre-renders head |
| WhatsApp | Blank | Blank — same JS constraint | Blank | Correct — SSR unblocks this |
| Instagram Stories (link sticker) | Blank | Blank — Facebook crawler doesn't execute JS | Blank | Correct — SSR + og:image |
| Facebook / Messenger | Blank | Blank | Blank | Correct after SSR |
| Slack | Partial — may show fallback | Better — explicit tags more reliable | Shows ABLE branded card | Per-artist card |
| Google (search snippet) | "Artist profile powered by ABLE" | Artist name + bio (JS-set, seen on second crawl) | Same | Correct on first crawl via SSR |

**The honest summary**: iMessage, WhatsApp, and Instagram Stories are the platforms artists care most about for link sharing. These all require P2 (SSR) to work correctly. P0 and P1 fix Twitter/X and Slack, and improve Google indexing. The headline social sharing use case requires P2.

This should not delay shipping P0 — Twitter/X cards, Google snippet quality, and the noindex fixes are all valuable. But it should be communicated honestly to artists: "Your share card will look great on Twitter. Full personalisation coming soon."

---

## The ceiling of client-side-only SEO

ABLE is currently a static file deployment with no server-side rendering. The fundamental ceiling of this architecture on SEO:

1. **Social sharing crawlers** (iMessage Applebot, WhatsApp, Facebook `facebookexternalhit`) do not execute JavaScript. They see whatever is in the HTML at initial load. Currently that means "Artist on ABLE" as the title and a blank OG image.

2. **Google does execute JavaScript**, but on a second crawl pass (often days later). The first time Googlebot sees a page, it indexes the static content. This means Google's cached version of an artist profile may show the generic fallback for days after a new profile is created.

3. **Canonical URLs set via JS** are seen by Google but with a delay. Duplicate content signals may accumulate before Google processes the JS-set canonical.

None of this blocks shipping P0 and P1 — improvements are real and measurable. But it sets expectations: the full 9.5/10 score requires server-side rendering.

---

## What "spec-complete 9.5/10" means

The 9.5/10 spec-complete score means:

- All meta tags are populated with artist-specific content (not platform fallbacks) via either JS or SSR
- All private pages are noindexed
- Structured data passes Google Rich Results Test with zero errors
- Twitter Card Validator shows `summary_large_image` rendering correctly for a test artist
- The OG image is a real hosted JPEG — either the branded fallback or a dynamic per-artist card
- Landing page title and description target the right search intent (`link in bio for musicians`)
- A `<link rel="canonical">` exists on every public page
- `robots.txt` is present and correct
- Sitemap is live and submitted to Google Search Console

What it does not guarantee (and why it's not 10):
- Google has actually indexed and ranked artist pages
- Share cards verified across all platforms with real artist accounts
- Google Search Console shows no coverage errors
- Core Web Vitals are passing

---

## Recommended order of operations

1. **Session 1 (P0, ~2 hours)** — Fix `injectSEO()` URL check, add `meta-description` id, add `twitter:image` and `twitter:site`, add image dimensions, add noindex to admin.html and fan.html, update title format. All in `able-v7.html`, `admin.html`, `fan.html`.

2. **Design task (og-fallback.jpg)** — Create 1200×630 JPEG, Midnight Navy background, ABLE wordmark, tagline. Deploy to `https://ablemusic.co/og-fallback.jpg` and `https://ablemusic.co/og-image.jpg`. This unblocks the fallback working at all.

3. **Session 2 (P1, ~2 hours)** — Add canonical link tag to able-v7.html, strengthen structured data with `sameAs`/`@id`, update landing.html title/desc/structured data.

4. **Post-backend (P2)** — Dynamic OG image function, SSR head rendering, sitemap, robots.txt. Schedule after Supabase is live.

5. **Post-launch validation** — Set up Google Search Console, submit sitemap, run Twitter Card Validator, test iMessage sharing with a real artist account, verify Lighthouse SEO 100/100.

---

## Status tracker

| Phase | Status | Completed |
|---|---|---|
| ANALYSIS.md | Complete | 2026-03-15 |
| SPEC.md | Complete | 2026-03-15 |
| PATH-TO-10.md | Updated | 2026-03-16 |
| FINAL-REVIEW.md | Updated | 2026-03-16 |
| P0 implementation | Not started | — |
| og-fallback.jpg design | Not started | — |
| og-image.jpg design (landing) | Not started | — |
| P1 implementation | Not started | — |
| P2 implementation | Not started | — |
| Twitter Card Validator verification | Not started | — |
| Google Search Console setup | Not started | — |
