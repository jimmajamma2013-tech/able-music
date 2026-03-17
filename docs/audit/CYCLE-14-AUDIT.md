# ABLE — Cycle 14 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 13**
**Scores entering Cycle 14: World map 8.6/10 · SEO/OG 9.2/10 · Copy system 9.2/10 · oEmbed 9.0/10 · Landing page 9.7/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — SEO / OG | 9.2/10 | 9.5/10 | Structured data completeness, canonical handling, OpenSearch |
| B — oEmbed / media | 9.0/10 | 9.4/10 | Error recovery, audio support, embed fallbacks |
| C — Copy system | 9.2/10 | 9.5/10 | Final microcopy audit, completeness nudge, fan detail heading |
| D — Fan journey | 8.8/10 | 9.2/10 | fan.html onboarding, close circle, unsubscribe confirmation |
| E — Performance | 8.5/10 | 9.0/10 | LCP, CLS, image loading, font subsetting |

---

## Dimension A — SEO / OG
*Score: 9.2/10 → target 9.5/10. Structured data and dynamic OG.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Dynamic OG image: `og:image` currently static `og-default.jpg` — when artist has artworkUrl, update `og:image` to artist artwork URL in `applyProfile()` | V8 | 4 | 1 | L | 1 |
| 2 | MusicAlbum structured data: when artist has releases, inject `@type:MusicAlbum` schema alongside MusicGroup — verify `buildStructuredData()` or add it | V8 | 4 | 2 | M | 2 |
| 3 | Canonical URL handles trailing slash: `canonEl.href` — verify it produces `https://ablemusic.co/artist-slug` (no trailing slash) | V8 | 3 | 1 | L | 1 |
| 4 | OpenSearch description: `<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml">` in `<head>` — verify it exists | ALL | 2 | 2 | L | 2 |
| 5 | `robots.txt` verified: `User-agent: *\nAllow: /\nSitemap: https://ablemusic.co/sitemap.xml` — verify content is correct | ALL | 3 | 1 | L | 1 |
| 6 | `sitemap.xml` artist entries: when profile has a `handle`, verify `sitemap.xml` entry exists for `ablemusic.co/{handle}` (even if static for now) | ALL | 3 | 1 | L | 1 |
| 7 | Twitter card type: `<meta name="twitter:card" content="summary_large_image">` — verify it's on all 4 pages (V8, admin, start, landing) | ALL | 3 | 1 | L | 1 |
| 8 | JSON-LD Event `eventStatus`: JSON-LD Event schema — verify `eventStatus: "EventScheduled"` is set on all shows | V8 | 3 | 1 | L | 1 |
| 9 | JSON-LD MusicGroup `sameAs`: if artist has platform URLs, include them as `sameAs` array in MusicGroup schema | V8 | 3 | 2 | M | 2 |
| 10 | hreflang: `<link rel="alternate" hreflang="en-gb" href="…">` — add for GB-targetted pages | V8 | 2 | 1 | L | 2 |
| 11 | OG locale: `<meta property="og:locale" content="en_GB">` — verify it exists on able-v8.html | V8 | 2 | 1 | L | 1 |
| 12 | Meta viewport: verify `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` on all 4 pages | ALL | 3 | 1 | L | 1 |

---

## Dimension B — oEmbed / Media
*Score: 9.0/10 → target 9.4/10. Error recovery and SoundCloud support.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 13 | oEmbed timeout recovery: `oembed-proxy.js` — verify it returns 502 (not hang) after 10s if upstream oEmbed API fails | API | 4 | 2 | M | 2 |
| 14 | SoundCloud embed: `renderReleaseCard()` — verify SoundCloud URLs produce a proper iframe embed (not just artwork + link) | V8 | 4 | 2 | M | 2 |
| 15 | Bandcamp embed: Bandcamp track URLs — verify `getEmbedUrl()` extracts track ID and produces `bandcamp.com/EmbeddedPlayer/track=ID` | V8 | 4 | 2 | M | 2 |
| 16 | Embed error fallback: when oEmbed proxy returns non-200, show artist artwork + "Listen on [Platform]" link — not a broken iframe | V8 | 4 | 1 | L | 1 |
| 17 | YouTube embed no-cookie: all YouTube embeds — verify they use `youtube-nocookie.com` not `youtube.com` (privacy) | V8 | 3 | 1 | L | 1 |
| 18 | Release card loading skeleton: while artwork loads, show a `ghost-block` placeholder instead of blank space | V8 | 3 | 2 | M | 2 |
| 19 | Embed `allow` attribute: iframes — verify `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"` is on all embeds | V8 | 3 | 1 | L | 1 |
| 20 | Vimeo embed: Vimeo track URLs — verify `getEmbedUrl()` handles `vimeo.com/VIDEO_ID` format | V8 | 3 | 2 | M | 2 |
| 21 | Mixcloud embed: `getEmbedUrl()` — verify Mixcloud URLs produce `mixcloud.com/widget/iframe/` format | V8 | 3 | 1 | L | 1 |
| 22 | Embed poster image: Spotify embeds — verify `loading="lazy"` on iframe and no Flash-era `allowfullscreen` attributes | V8 | 2 | 1 | L | 1 |

---

## Dimension C — Copy System
*Score: 9.2/10 → target 9.5/10. Final microcopy polish.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 23 | Fan detail heading: fan detail sheet — verify heading uses `email.split('@')[0]` not the full email address | ADM | 3 | 1 | L | 1 |
| 24 | Completeness nudge copy: first-missing dimension nudge text — verify it reads "Add your [thing]. [artist-voice reason]." not "Complete your profile" | ADM | 3 | 1 | L | 1 |
| 25 | "Artist before label" tagline: verify it appears in landing.html hero headline, not just `og:description` | LND | 3 | 1 | L | 1 |
| 26 | Start.html final CTA: verify step 3 final button reads "Set up your page →" | STR | 2 | 1 | L | 1 |
| 27 | Admin loading copy: while admin loads, the loading state shows artist name + "Loading your dashboard…" — verify not generic spinner | ADM | 2 | 1 | L | 1 |
| 28 | Release card placeholder copy: release with no artwork shows "No artwork — add one in your dashboard." (owner view only) — verify not shown to fans | V8 | 2 | 1 | L | 1 |
| 29 | Gig strip empty venue: gig strip shows "Tonight" when no venue set — verify it doesn't show "undefined" | V8 | 3 | 1 | L | 1 |
| 30 | Campaign HQ state labels: pill labels — "Pre-release" "Live" "Gig" "Profile" — verify no "Pre Release" (space, no hyphen) | ADM | 2 | 1 | L | 1 |
| 31 | Share URL copy: `copyPageUrl()` success toast reads "Link copied — share it everywhere." — verify | V8 | 2 | 1 | L | 1 |
| 32 | Error copy — fan not found: if fan detail opens with no match, sheet shows "Fan not found." — verify specific | ADM | 2 | 1 | L | 1 |
| 33 | Fan email export success toast: after CSV export, toast reads "Fan list downloaded." — verify not generic "Done." | ADM | 2 | 1 | L | 1 |
| 34 | Snap card image alt: snap card image in able-v8.html — verify `alt` uses `card.alt || card.title` | V8 | 3 | 1 | L | 1 |

---

## Dimension D — Fan Journey
*Score: 8.8/10 → target 9.2/10. fan.html onboarding and close circle.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 35 | fan.html first visit: on first load with no followed artists, show "Discover artists you'll love." state not empty list | FAN | 4 | 1 | L | 1 |
| 36 | Unsubscribe confirmation: after unsubscribe action in fan.html, show "You've left [artist]'s list." toast — verify | FAN | 4 | 1 | L | 1 |
| 37 | fan.html loading state: while `able_fan_following` is read, show 2 ghost cards — not blank flash | FAN | 3 | 2 | M | 2 |
| 38 | fan.html followed count: header subtitle shows "Following N artists" — verify it updates from `able_fan_following.length` | FAN | 3 | 1 | L | 1 |
| 39 | fan.html profile link: each followed artist card links to their profile `ablemusic.co/{slug}` — verify `href` is set | FAN | 4 | 1 | L | 1 |
| 40 | Fan receipt email unsubscribe: verify `fan.html?action=unsubscribe&artist=[slug]` triggers the unsubscribe handler (not 404) | FAN | 4 | 1 | L | 1 |
| 41 | Close circle badge: artist's "close fans" (isStarred) — verify Close Circle on able-v8.html renders a badge or different CTA | V8 | 3 | 2 | M | 2 |
| 42 | Fan join date: fan detail sheet shows `"Joined [date]"` formatted as "12 Jan 2026" — verify `toLocaleDateString` is used | ADM | 3 | 1 | L | 1 |
| 43 | Fan campaign attribution: fan detail sheet shows which campaign brought them — verify `f.campaignName` renders | ADM | 3 | 1 | L | 1 |
| 44 | Fan geo attribution: if `f.country` is set, show flag emoji in fan row — verify `f.country` is written on signup | V8 | 3 | 3 | M | 3 |

---

## Dimension E — Performance
*Score: 8.5/10 → target 9.0/10. Core Web Vitals and resource hints.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 45 | `rel="preconnect"` for fonts: verify `<link rel="preconnect" href="https://fonts.googleapis.com">` is in `<head>` of all 4 pages | ALL | 4 | 1 | L | 1 |
| 46 | Hero artwork LCP: hero `artworkUrl` image — verify it has `loading="eager"` and `fetchpriority="high"` | V8 | 4 | 1 | L | 1 |
| 47 | DM Sans font-display: `font-display: swap` in the Google Fonts URL — verify `?display=swap` is in the font URL | V8 | 3 | 1 | L | 1 |
| 48 | Non-critical CSS: snap card CSS (below fold) could be loaded lazily — verify there's no `render-blocking` CSS for off-screen content | V8 | 3 | 2 | M | 3 |
| 49 | Image `srcset`: hero artwork — verify `srcset` or `sizes` is used for responsive images | V8 | 3 | 3 | M | 3 |
| 50 | Release card width/height: `<img>` in release cards — verify `width` and `height` attributes are set to prevent CLS | V8 | 3 | 1 | L | 1 |
| 51 | `dns-prefetch` for Supabase: `<link rel="dns-prefetch" href="https://jgspraqrnjrerzhnnhtb.supabase.co">` — verify | ALL | 3 | 1 | L | 1 |
| 52 | Admin CSS audit: admin.html is large — verify no unused `@keyframes` or orphaned selectors from removed features | ADM | 2 | 3 | M | 3 |
| 53 | JS defer: all non-critical `<script src>` tags — verify they have `defer` or `async` attribute | ALL | 3 | 1 | L | 1 |
| 54 | Artwork `object-position`: hero artwork `object-position: top center` — verify faces/key details are not cropped | V8 | 2 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (dynamic OG image) → #3 (canonical no trailing slash) → #5 (robots.txt verify) → #6 (sitemap verify) → #7 (twitter:card all pages) → #8 (JSON-LD eventStatus) → #11 (og:locale) → #12 (meta viewport all pages) → #16 (embed error fallback) → #17 (YouTube nocookie) → #19 (embed allow attr) → #21 (Mixcloud embed) → #22 (Spotify loading lazy) → #23 (fan detail heading) → #24 (completeness nudge copy) → #25 (ABLE tagline landing) → #26 (start.html final CTA) → #27 (admin loading copy) → #29 (gig strip venue) → #30 (CHQ state labels) → #31 (share copy) → #32 (fan not found) → #33 (export toast) → #34 (snap card alt) → #35 (fan.html first visit) → #36 (unsubscribe confirmation) → #38 (fan following count) → #39 (fan profile link) → #40 (unsubscribe URL) → #42 (fan join date) → #43 (fan campaign) → #45 (preconnect fonts) → #46 (hero LCP) → #47 (font-display swap) → #50 (release card width/height) → #51 (dns-prefetch Supabase) → #53 (script defer) → #54 (artwork object-position)

**Wave 2 (after Wave 1 committed):**
#2 (MusicAlbum schema), #4 (OpenSearch), #9 (MusicGroup sameAs), #13 (oEmbed timeout), #14 (SoundCloud embed), #15 (Bandcamp embed), #18 (release skeleton), #20 (Vimeo embed), #37 (fan loading state), #41 (close circle badge)

**Wave 3 (polish):**
#10 (hreflang), #28 (release placeholder copy), #44 (fan geo flag), #48 (CSS lazy), #49 (srcset), #52 (admin CSS audit)
