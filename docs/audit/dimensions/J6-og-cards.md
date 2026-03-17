# Dimension J6 — OG Cards
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

All four pages have correct OG meta tags. OG images exist as real files at the correct paths. Twitter card shows correctly. Tested via opengraph.xyz or similar tool. Full compliance means that when a fan shares an artist's ABLE profile link on Twitter, iMessage, or WhatsApp, the preview card shows the artist's name, their artwork, and a compelling description — not a blank card, not the ABLE default, and not a broken image. The artist profile page is the highest-priority surface: it is the page artists share most, and a broken OG card makes the link look like spam or a scam to cautious fans.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `landing.html` has `<meta property="og:title">` tag present and not empty | LND | 5 | 1 | H | 1 |
| 2 | Confirm `landing.html` has `<meta property="og:description">` that is compelling and within 200 characters | LND | 5 | 1 | H | 1 |
| 3 | Confirm `landing.html` has `<meta property="og:image">` pointing to an absolute URL | LND | 5 | 1 | H | 1 |
| 4 | Confirm `landing.html` has `<meta property="og:url">` set to `https://ablemusic.co` | LND | 4 | 1 | M | 1 |
| 5 | Confirm `landing.html` has `<meta property="og:type" content="website">` | LND | 4 | 1 | M | 1 |
| 6 | Confirm `landing.html` has `<meta name="twitter:card" content="summary_large_image">` | LND | 4 | 1 | M | 1 |
| 7 | Confirm `landing.html` has `<meta name="twitter:title">` matching the og:title | LND | 4 | 1 | M | 1 |
| 8 | Confirm `landing.html` has `<meta name="twitter:description">` matching the og:description | LND | 4 | 1 | M | 1 |
| 9 | Confirm `landing.html` has `<meta name="twitter:image">` pointing to the same absolute URL as og:image | LND | 4 | 1 | M | 1 |
| 10 | Confirm the OG image file referenced by `landing.html` exists at the declared path and returns HTTP 200 | LND | 5 | 1 | H | 1 |
| 11 | Confirm the OG image for `landing.html` is 1200×630px — the standard for `summary_large_image` cards | LND | 4 | 1 | M | 1 |
| 12 | Confirm the OG image file is under 8MB — Twitter rejects images above this limit | LND | 4 | 1 | M | 2 |
| 13 | Confirm the OG image file is under 300KB for fast social crawler fetching | LND | 4 | 1 | M | 2 |
| 14 | Confirm the OG image is JPEG or PNG — not SVG or WebP (both unsupported by most OG crawlers) | LND | 4 | 1 | M | 2 |
| 15 | Test `landing.html` OG card via opengraph.xyz — confirm title, description, and image render correctly | LND | 5 | 1 | H | 1 |
| 16 | Test `landing.html` Twitter card via cards-dev.twitter.com/validator — confirm large image card renders | LND | 4 | 1 | M | 1 |
| 17 | Confirm `admin.html` has `<meta name="robots" content="noindex">` instead of OG tags — the dashboard should not be shared | ADM | 4 | 1 | M | 2 |
| 18 | Confirm `start.html` has `<meta name="robots" content="noindex">` — the wizard should not be shared or indexed | STR | 4 | 1 | M | 2 |
| 19 | Confirm `able-v7.html` has `<meta property="og:title">` dynamically set to the artist's name from `able_v3_profile` | V8 | 5 | 2 | H | 1 |
| 20 | Confirm `able-v7.html` has `<meta property="og:description">` dynamically set to the artist's bio (truncated at 200 chars) | V8 | 5 | 2 | H | 1 |
| 21 | Confirm `able-v7.html` has `<meta property="og:image">` dynamically set to the artist's artwork URL | V8 | 5 | 2 | H | 1 |
| 22 | Confirm `able-v7.html` OG image falls back to `/og-default.jpg` when no artist artwork is set | V8 | 4 | 2 | M | 2 |
| 23 | Confirm `/og-default.jpg` exists at the root of the project and returns HTTP 200 in production | ALL | 5 | 1 | H | 1 |
| 24 | Confirm `able-v7.html` has `<meta property="og:url">` dynamically set to the artist's canonical profile URL | V8 | 4 | 2 | M | 2 |
| 25 | Confirm `able-v7.html` has `<meta property="og:type" content="profile">` — profile pages use this type | V8 | 3 | 1 | L | 3 |
| 26 | Confirm `able-v7.html` `<meta property="og:site_name" content="ABLE">` is set | V8 | 3 | 1 | L | 3 |
| 27 | Confirm `able-v7.html` has `<meta name="twitter:card" content="summary_large_image">` | V8 | 4 | 1 | M | 2 |
| 28 | Confirm `able-v7.html` `<meta name="twitter:title">` is set dynamically to the artist name | V8 | 4 | 2 | M | 2 |
| 29 | Confirm `able-v7.html` `<meta name="twitter:description">` is set dynamically | V8 | 4 | 2 | M | 2 |
| 30 | Confirm `able-v7.html` `<meta name="twitter:image">` is set dynamically to the artist's artwork | V8 | 4 | 2 | M | 2 |
| 31 | Confirm the dynamic OG tag update in `able-v7.html` runs on `DOMContentLoaded` before the page is fully rendered | V8 | 4 | 2 | M | 2 |
| 32 | Test `able-v7.html` OG card via opengraph.xyz with a live Netlify preview URL — confirm artist name and artwork appear | V8 | 5 | 2 | H | 1 |
| 33 | Confirm the OG image for the artist profile correctly reflects the campaign state — e.g. a pre-save image vs a post-release image | V8 | 3 | 3 | L | 4 |
| 34 | Confirm the OG description for the artist profile does not contain any banned phrases from the copy doctrine | V8 | 3 | 1 | L | 3 |
| 35 | Confirm the landing page OG description does not contain banned phrases | LND | 3 | 1 | L | 3 |
| 36 | Confirm the landing page OG title is under 60 characters — titles are truncated by most social platforms above this | LND | 4 | 1 | M | 2 |
| 37 | Confirm the artist profile OG title template is under 60 characters with a typical artist name | V8 | 4 | 1 | M | 2 |
| 38 | Confirm the OG image for the landing page uses the ABLE brand colours and is not just a screenshot | LND | 4 | 2 | M | 2 |
| 39 | Confirm the OG image background is `#0d0e1a` (Midnight Navy) matching the ABLE brand | LND | 3 | 1 | L | 3 |
| 40 | Confirm the OG image includes the ABLE wordmark or logo | LND | 3 | 1 | L | 3 |
| 41 | Confirm the OG image text (if any) is legible at the 1200×630 preview size — test at 50% scale | LND | 3 | 1 | L | 3 |
| 42 | Confirm the OG image does not include a URL or "ablemusic.co" text that will become stale | LND | 2 | 1 | L | 5 |
| 43 | Test sharing the artist profile link in iMessage on an iPhone — confirm the rich preview card appears | V8 | 4 | 2 | M | 2 |
| 44 | Test sharing the artist profile link on WhatsApp — confirm the preview card appears | V8 | 4 | 2 | M | 2 |
| 45 | Test sharing the landing page link on Twitter — confirm the large image card appears | LND | 4 | 2 | M | 2 |
| 46 | Test sharing the artist profile link on Facebook — confirm the OG card renders correctly | V8 | 3 | 2 | L | 3 |
| 47 | Test sharing the artist profile link on Instagram DM — confirm the link preview is functional | V8 | 3 | 2 | L | 3 |
| 48 | Confirm the OG image URL is absolute (starts with `https://`) not relative — relative URLs break on social crawlers | ALL | 5 | 1 | H | 1 |
| 49 | Confirm the OG image URL does not contain `localhost` or `127.0.0.1` in any hardcoded reference | ALL | 5 | 1 | H | 1 |
| 50 | Confirm the Twitter `<meta name="twitter:site">` is set to `@ablemusic` or the correct Twitter handle | ALL | 2 | 1 | L | 5 |
| 51 | Confirm the Twitter `<meta name="twitter:creator">` is set for the artist profile page to the artist's Twitter handle (if known) | V8 | 2 | 3 | L | 6 |
| 52 | Confirm `<meta property="og:locale" content="en_GB">` is set on all four pages | ALL | 2 | 1 | L | 5 |
| 53 | Confirm `<meta property="og:image:width" content="1200">` and `<meta property="og:image:height" content="630">` are set | ALL | 3 | 1 | L | 3 |
| 54 | Confirm `<meta property="og:image:type" content="image/jpeg">` is set matching the actual file type | ALL | 3 | 1 | L | 3 |
| 55 | Confirm `<meta property="og:image:alt">` is set with a descriptive text for each OG image | ALL | 3 | 1 | L | 3 |
| 56 | Confirm the fan.html page (if built) also has OG tags — a fan sharing their artist collection should have a good preview | ALL | 3 | 2 | L | 4 |
| 57 | Purge the Facebook OG cache for landing.html via the Facebook Sharing Debugger after any OG changes | LND | 3 | 1 | L | 3 |
| 58 | Purge the Twitter Card cache via the Twitter Card Validator after any OG changes | ALL | 3 | 1 | L | 3 |
| 59 | Confirm LinkedIn OG card renders for the landing page — LinkedIn has slightly different OG requirements | LND | 3 | 2 | L | 4 |
| 60 | Confirm Slack link preview renders correctly for the artist profile URL | V8 | 3 | 2 | L | 4 |
| 61 | Confirm Discord link preview renders correctly for the artist profile URL | V8 | 3 | 2 | L | 4 |
| 62 | Confirm that a fan sharing a gig-state artist page gets an OG description reflecting the "on tonight" context | V8 | 3 | 3 | L | 5 |
| 63 | Confirm that a fan sharing a pre-release artist page gets an OG description reflecting the "first to know" context | V8 | 3 | 3 | L | 5 |
| 64 | Confirm the default OG fallback image `og-default.jpg` has descriptive alt text in the `og:image:alt` meta tag | ALL | 3 | 1 | L | 3 |
| 65 | Confirm the dynamic OG title in `able-v7.html` correctly handles artist names with special characters | V8 | 3 | 1 | L | 3 |
| 66 | Confirm the dynamic OG description in `able-v7.html` strips any HTML tags from the bio before inserting into the meta tag | V8 | 4 | 1 | M | 2 |
| 67 | Confirm the dynamic OG image URL in `able-v7.html` is URL-encoded correctly when it contains spaces or special characters | V8 | 4 | 1 | M | 2 |
| 68 | Confirm the dynamic OG tags are set via `document.querySelector('meta[property="og:title"]').setAttribute('content', ...)` not innerHTML | V8 | 4 | 1 | M | 2 |
| 69 | Confirm the `<head>` OG tags are set before any third-party scripts run to avoid race conditions | V8 | 3 | 1 | L | 3 |
| 70 | Confirm the OG image for each page has been regenerated after the most recent design change | ALL | 4 | 2 | M | 2 |
| 71 | Document OG image specifications (dimensions, format, max file size) in `docs/systems/seo-og/SPEC.md` | DOC | 2 | 1 | L | 5 |
| 72 | Confirm `docs/systems/seo-og/SPEC.md` reflects the current implementation, not the originally planned one | DOC | 3 | 1 | L | 3 |
| 73 | Confirm the OG image for `landing.html` is stored at `/og-landing.jpg` (separate from `/og-default.jpg`) | LND | 3 | 1 | L | 3 |
| 74 | Confirm the OG image for `able-v7.html` default state is stored at `/og-default.jpg` | V8 | 3 | 1 | L | 3 |
| 75 | Confirm there are no 404 errors in the network tab when the social crawler fetches the OG image URL | ALL | 5 | 1 | H | 1 |
| 76 | Confirm the Netlify headers do not prevent social crawlers from fetching OG images via CSP image-src directive | NET | 4 | 1 | M | 2 |
| 77 | Confirm Googlebot can access the OG image — check `robots.txt` does not disallow `/og-*.jpg` | NET | 4 | 1 | M | 2 |
| 78 | Confirm Twitterbot user agent is not blocked in `robots.txt` | NET | 4 | 1 | M | 2 |
| 79 | Confirm Facebookbot user agent is not blocked in `robots.txt` | NET | 3 | 1 | L | 3 |
| 80 | Confirm the `og:image` URL for the artist profile does not depend on JavaScript to resolve — social crawlers do not run JS | V8 | 5 | 3 | H | 1 |
| 81 | Investigate Netlify Edge Functions or a `_redirects` trick for server-side OG tag injection per-artist (Phase 2) | NET | 3 | 5 | L | 6 |
| 82 | Confirm the artist profile OG card works correctly when shared from an iOS Share Sheet | V8 | 4 | 2 | M | 2 |
| 83 | Confirm the OG image URL on able-v7.html does not use a data URI — crawlers cannot process data URIs | V8 | 4 | 1 | M | 2 |
| 84 | Confirm the OG image URL on able-v7.html does not use a blob URL — crawlers cannot process blob URLs | V8 | 4 | 1 | M | 2 |
| 85 | Confirm the current `og-default.jpg` matches the latest brand identity — not an older logo or colour scheme | ALL | 3 | 1 | L | 3 |
| 86 | Confirm the OG image has sufficient contrast for the overlaid text — test at 1200×630 actual pixels | LND | 3 | 1 | L | 3 |
| 87 | Confirm the OG image does not exceed the Twitter safe area: keep key content within the central 800×418px zone | LND | 3 | 2 | L | 3 |
| 88 | Confirm the landing page OG description ends with a call-to-action that fits the ABLE voice | LND | 3 | 1 | L | 3 |
| 89 | Confirm the artist profile OG description does not truncate awkwardly at 200 characters for long bios | V8 | 3 | 1 | L | 3 |
| 90 | Add a sentence-boundary truncation for the OG description — do not cut mid-word or mid-sentence | V8 | 3 | 2 | L | 3 |
| 91 | Confirm the OG tags for privacy.html and terms.html have `noindex` and minimal OG tags — they don't need rich previews | NET | 2 | 1 | L | 5 |
| 92 | Confirm there are no duplicate `og:title` or `og:image` meta tags on any page — duplicates cause unpredictable crawler behaviour | ALL | 4 | 1 | M | 2 |
| 93 | Confirm each page's `og:title` is unique — do not reuse the same title across multiple pages | ALL | 4 | 1 | M | 2 |
| 94 | Confirm each page's `og:description` is unique — duplicate descriptions are a SEO and social signal quality issue | ALL | 4 | 1 | M | 2 |
| 95 | Confirm the OG test via opengraph.xyz uses the production URL, not a Netlify preview URL | ALL | 4 | 1 | M | 2 |
| 96 | Save a screenshot of the passing OG card test from opengraph.xyz and store it in `screenshots/` for reference | DOC | 2 | 1 | L | 5 |
| 97 | Confirm Facebook Sharing Debugger shows no warnings for `landing.html` | LND | 3 | 1 | L | 3 |
| 98 | Confirm Facebook Sharing Debugger shows no warnings for `able-v7.html` with a test artist profile | V8 | 3 | 1 | L | 3 |
| 99 | Document the OG card test procedure in `docs/systems/seo-og/SPEC.md` so future changes are tested consistently | DOC | 2 | 2 | L | 5 |
| 100 | Confirm `STATUS.md` is updated to mark J6 complete with the date and tool used for OG verification | DOC | 2 | 1 | L | 6 |
