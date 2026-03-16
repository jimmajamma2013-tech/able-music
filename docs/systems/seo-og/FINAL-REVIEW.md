# SEO + Open Graph System — Final Review
**Date: 2026-03-15**
**Spec-complete target: 9.0/10**

---

## What this doc is

Projected scores per dimension after P0, P1, and P2 implementation. The "spec-complete" state is after P2 — 9.0/10 is achievable on paper. A real 10/10 requires live indexing, GSC verification, and cross-platform social sharing testing, which can only be validated post-launch.

---

## Scores: before and after

| Dimension | Current | After P0 | After P1 | After P2 | Notes |
|---|---|---|---|---|---|
| Title tags | 6/10 | 7/10 | 7.5/10 | 9/10 | P2 SSR means Google sees artist name immediately |
| Meta description | 5/10 | 7/10 | 7.5/10 | 9/10 | P0 fixes JS update; P2 SSR makes it reliable |
| OG title | 6/10 | 7/10 | 7.5/10 | 9/10 | Richer format in P0; SSR in P2 |
| OG description | 6/10 | 7/10 | 7.5/10 | 9/10 | Bio cap in P0; SSR in P2 |
| OG image | 4/10 | 6.5/10 | 7/10 | 9.5/10 | P0: URL check + fallback; P2: dynamic generation |
| Twitter/X card | 6/10 | 7.5/10 | 8/10 | 9/10 | P0: adds twitter:image + twitter:site |
| Canonical URL | 5/10 | 5.5/10 | 7/10 | 9.5/10 | P1: adds link rel canonical; P2: SSR |
| Structured data | 7/10 | 7/10 | 8.5/10 | 9.5/10 | P1: sameAs + @id; P2: Organisation schema |
| Robots/noindex | 5/10 | 8.5/10 | 8.5/10 | 9.5/10 | P0: admin + fan noindex; P2: robots.txt |
| Landing page SEO | 7/10 | 7/10 | 8.5/10 | 9/10 | P1: title + structured data + desc update |
| **Overall** | **5.7/10** | **7.1/10** | **8.2/10** | **9.3/10** | |

---

## Social sharing test matrix

Testing what the share preview card looks like when an artist pastes their ABLE link.

| Platform | Current state | After P0 | After P1 | After P2 |
|---|---|---|---|---|
| Twitter/X | Generic fallback title/desc, likely blank image | Artist name, bio (capped), artwork (if https://) or fallback card | Same + explicit twitter:image tag for reliability | Dynamic artwork card, correct in all cases |
| iMessage | Blank — JS doesn't run in Apple crawler | Blank — JS still doesn't run. Shows static fallback: "Artist on ABLE" + platform fallback image | Same — SSR not yet in place | Correct artist name, bio, and artwork — SSR serves pre-rendered head |
| WhatsApp | Blank | Blank — same constraint as iMessage | Same | Correct — SSR unblocks this |
| Instagram Stories (link sticker) | Blank | Blank — Facebook crawler doesn't execute JS | Blank | Correct — SSR unblocks this |
| Facebook / Messenger | Blank | Blank | Blank | Correct — SSR + og:image |
| LinkedIn | Blank | Blank | Blank (aggressive caching) | Correct after Post Inspector cache clear |
| Slack | Uses OG tags, partial JS | Partial — may show fallback | Better — explicit tags more reliable | Correct |

**The honest summary**: Most social sharing preview improvements are blocked by the JS-only constraint until P2 (SSR). P0 and P1 fix the cases where JS does run (Twitter/X crawler, Slack, some preview generators). The platforms artists care most about — iMessage sharing with friends, Instagram Stories link stickers — require P2 to work correctly.

This should inform priority: P0 is still worth shipping (fixes Twitter/X cards, improves Google indexing, fixes admin/fan noindex) but the headline artist social sharing use case requires P2.

---

## The ceiling of client-side-only SEO

This is worth being direct about. ABLE is currently a static file deployment with no server-side rendering. The fundamental ceiling of this architecture on SEO:

1. **Social sharing crawlers** (iMessage Applebot, WhatsApp, Facebook facebookexternalhit) do not execute JavaScript. They see whatever is in the HTML at initial load. Currently that means "Artist on ABLE" as the title and a blank OG image.

2. **Google does execute JavaScript**, but on a second crawl pass (often days later). The first time Googlebot sees a page, it indexes the static content. This means Google's cached version of an artist profile may show "Artist profile powered by ABLE" as the snippet even if `injectSEO()` eventually runs.

3. **Canonical URLs set via JS** are seen by Google but with a delay. Duplicate content signals may accumulate before Google processes the JS-set canonical.

None of this blocks shipping P0 and P1 — improvements are real and measurable. But it sets expectations: the full 9.5/10 score requires server-side rendering.

---

## What "spec-complete 9.0/10" means

The 9.0/10 spec-complete score means:

- All meta tags are populated with artist-specific content (not platform fallbacks)
- All private pages are noindexed
- Structured data passes Google Rich Results Test with zero errors
- Twitter Card Validator shows `summary_large_image` rendering correctly for a test artist
- The OG image is a real hosted JPEG, not a data: URI
- Landing page title and description target the right search intent
- A `<link rel="canonical">` exists on every public page
- `robots.txt` is present and correct

What it does not guarantee (and why it's not 10):
- Google has actually indexed and ranked artist pages
- Share cards are verified across all platforms (requires live testing)
- Google Search Console shows no coverage errors
- Core Web Vitals are passing

---

## Recommended order of operations

1. **Session 1 (P0)** — Fix `injectSEO()` URL check, add `meta-description` id, add `twitter:image` and `twitter:site`, add noindex to admin/fan, update title format, add `og:image:width/height`. All in `able-v7.html`, `admin.html`, `fan.html`. ~2 hours.

2. **Design task** — Create `og-fallback.jpg` (1200×630, navy, ABLE wordmark). This unblocks the fallback working at all.

3. **Session 2 (P1)** — Add canonical link tag to able-v7.html, strengthen structured data with `sameAs`/`@id`, update landing.html title/desc/structured data. ~2 hours.

4. **Post-backend (P2)** — Dynamic OG image function, SSR head rendering, sitemap, robots.txt. Schedule after Supabase is live.

5. **Post-launch validation** — Set up Google Search Console, submit sitemap, run Twitter Card Validator, test iMessage sharing with a real artist account, verify Lighthouse SEO 100/100.
