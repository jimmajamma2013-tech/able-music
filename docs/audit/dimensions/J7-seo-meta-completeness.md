# Dimension J7 — SEO Meta Completeness
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

All four pages have unique `<title>`, `<meta description>`, `<link rel="canonical">`. Title tags 50–60 characters. Descriptions 150–160 characters. No duplicate meta descriptions. Full compliance means every ABLE page is correctly represented in search results from day one. The artist profile page is particularly important: when a fan searches for an artist by name, the ABLE profile should appear with a compelling title and description — not a blank snippet or placeholder text. The `/admin` canonical URL issue (artists currently land on `/admin.html` not `/admin`) means the canonical URL and the actual URL are different, which creates a duplicate content signal that must be resolved before launch.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `landing.html` has a `<title>` tag that is unique and between 50–60 characters | LND | 5 | 1 | H | 1 |
| 2 | Confirm `landing.html` has a `<meta name="description">` between 150–160 characters | LND | 5 | 1 | H | 1 |
| 3 | Confirm `landing.html` has a `<link rel="canonical" href="https://ablemusic.co/">` | LND | 4 | 1 | M | 1 |
| 4 | Confirm `able-v7.html` has a `<title>` tag dynamically set to the artist's name plus a suffix | V8 | 5 | 2 | H | 1 |
| 5 | Confirm `able-v7.html` `<title>` template produces a title between 50–60 characters for a typical artist name | V8 | 4 | 2 | M | 2 |
| 6 | Confirm `able-v7.html` has a `<meta name="description">` dynamically set from the artist's bio | V8 | 5 | 2 | H | 1 |
| 7 | Confirm `able-v7.html` meta description is between 150–160 characters — truncate bio at sentence boundary | V8 | 4 | 2 | M | 2 |
| 8 | Confirm `able-v7.html` has a `<link rel="canonical">` dynamically set to the artist's canonical URL | V8 | 5 | 2 | H | 1 |
| 9 | Confirm `admin.html` has `<meta name="robots" content="noindex, nofollow">` — the dashboard must not be indexed | ADM | 5 | 1 | H | 1 |
| 10 | Confirm `start.html` has `<meta name="robots" content="noindex, nofollow">` — the wizard must not be indexed | STR | 5 | 1 | H | 1 |
| 11 | Confirm `admin.html` has `<link rel="canonical" href="https://ablemusic.co/admin">` — clean URL not file extension | ADM | 4 | 1 | M | 2 |
| 12 | Add a Netlify redirect `from = "/admin.html" to = "/admin" status = 301` to enforce the canonical clean URL | NET | 4 | 1 | M | 2 |
| 13 | Add a Netlify redirect `from = "/start.html" to = "/start" status = 301` to enforce the canonical clean URL | NET | 4 | 1 | M | 2 |
| 14 | Add a Netlify redirect `from = "/landing.html" to = "/" status = 301` to enforce the root as the landing canonical | NET | 4 | 1 | M | 2 |
| 15 | Add a Netlify redirect `from = "/able-v7.html" to = "/:slug" status = 301` if any artist links directly to the file path | NET | 3 | 2 | L | 3 |
| 16 | Confirm the `landing.html` title follows the ABLE copy voice — specific, not generic; no exclamation marks | LND | 4 | 1 | M | 2 |
| 17 | Confirm the `landing.html` description ends with a clear statement of what ABLE is, not a call-to-action | LND | 4 | 1 | M | 2 |
| 18 | Confirm the `landing.html` description does not contain banned phrases ("grow your audience", "monetise") | LND | 4 | 1 | M | 2 |
| 19 | Confirm the `able-v7.html` title template is `"[Artist Name] — ABLE"` or similar consistent pattern | V8 | 4 | 1 | M | 2 |
| 20 | Confirm the `able-v7.html` description does not start with the artist's name — the title already has it | V8 | 3 | 1 | L | 3 |
| 21 | Confirm the `able-v7.html` description does not contain HTML entities or raw markdown when derived from the bio | V8 | 4 | 1 | M | 2 |
| 22 | Confirm the `able-v7.html` description falls back to a generic ABLE description when no bio is set | V8 | 4 | 1 | M | 2 |
| 23 | Confirm the `able-v7.html` title falls back to `"ABLE — Music for Independent Artists"` when no artist name is set | V8 | 3 | 1 | L | 3 |
| 24 | Confirm `landing.html` does not share a title or description with any other page — duplicates hurt SEO | LND | 4 | 1 | M | 2 |
| 25 | Confirm `privacy.html` has a unique `<title>` and a `<meta name="robots" content="noindex">` | NET | 3 | 1 | L | 3 |
| 26 | Confirm `terms.html` has a unique `<title>` and a `<meta name="robots" content="noindex">` | NET | 3 | 1 | L | 3 |
| 27 | Confirm `404.html` (when created) has `<meta name="robots" content="noindex">` | NET | 3 | 1 | L | 3 |
| 28 | Confirm `index.html` (redirect stub) has `<meta name="robots" content="noindex">` | NET | 3 | 1 | L | 3 |
| 29 | Confirm all `<title>` tags are inside `<head>`, not `<body>` — this is a common templating error | ALL | 4 | 1 | M | 2 |
| 30 | Confirm all `<meta name="description">` tags are inside `<head>`, not `<body>` | ALL | 4 | 1 | M | 2 |
| 31 | Confirm all `<link rel="canonical">` tags are inside `<head>` | ALL | 4 | 1 | M | 2 |
| 32 | Confirm there is only one `<title>` tag per page — multiple title tags cause unpredictable behaviour | ALL | 5 | 1 | H | 1 |
| 33 | Confirm there is only one `<meta name="description">` tag per page | ALL | 5 | 1 | H | 1 |
| 34 | Confirm there is only one `<link rel="canonical">` per page | ALL | 4 | 1 | M | 2 |
| 35 | Confirm the canonical URL for able-v7.html uses the slug route (`https://ablemusic.co/maya-gold`) not the file path | V8 | 5 | 2 | H | 1 |
| 36 | Confirm the canonical URL is HTTPS in all cases — no `http://` canonicals | ALL | 4 | 1 | M | 2 |
| 37 | Confirm the canonical URL does not include a trailing slash inconsistently — pick one convention and stick to it | ALL | 3 | 1 | L | 3 |
| 38 | Confirm `landing.html` has `<html lang="en-GB">` — affects search language targeting | LND | 3 | 1 | L | 3 |
| 39 | Confirm all four active HTML pages have `<html lang="en-GB">` | ALL | 3 | 1 | L | 3 |
| 40 | Confirm `landing.html` has a `<meta charset="UTF-8">` tag | LND | 3 | 1 | L | 3 |
| 41 | Confirm all four active HTML pages have `<meta charset="UTF-8">` | ALL | 3 | 1 | L | 3 |
| 42 | Confirm all four active HTML pages have `<meta name="viewport" content="width=device-width, initial-scale=1">` | ALL | 4 | 1 | M | 2 |
| 43 | Confirm the `landing.html` title does not start with a number — Google truncates ranked titles in certain contexts | LND | 2 | 1 | L | 5 |
| 44 | Confirm the `landing.html` title does not end with the domain name — Google strips this and it wastes characters | LND | 2 | 1 | L | 5 |
| 45 | Confirm the `landing.html` description is a complete sentence — fragment descriptions get rewritten by Google | LND | 3 | 1 | L | 3 |
| 46 | Confirm the `landing.html` description is not pulled from the first paragraph of body text — it must be a deliberate meta description | LND | 3 | 1 | L | 3 |
| 47 | Confirm the artist profile description is not just the artist name repeated — it must add new information | V8 | 3 | 1 | L | 3 |
| 48 | Run a Google Search Console fetch for `landing.html` after launch to confirm the title and description are indexed correctly | LND | 4 | 1 | L | 3 |
| 49 | Run a Google Search Console fetch for a test artist profile URL after launch | V8 | 4 | 1 | L | 3 |
| 50 | Set up Google Search Console property for `ablemusic.co` and verify ownership via DNS TXT record | NET | 3 | 2 | L | 3 |
| 51 | Submit `sitemap.xml` to Google Search Console after it is created | NET | 3 | 2 | L | 4 |
| 52 | Confirm `sitemap.xml` includes `landing.html` canonical URL and lastmod date | NET | 3 | 2 | L | 4 |
| 53 | Confirm artist profile URLs are not included in a static `sitemap.xml` until a Supabase-driven generator is built | NET | 3 | 2 | L | 4 |
| 54 | Confirm `robots.txt` includes `Sitemap: https://ablemusic.co/sitemap.xml` directive | NET | 3 | 1 | L | 4 |
| 55 | Confirm the `<title>` tag for `landing.html` is rendered server-side (as static HTML), not set by JavaScript | LND | 4 | 1 | M | 2 |
| 56 | Confirm the `<meta name="description">` for `landing.html` is rendered server-side (as static HTML) | LND | 4 | 1 | M | 2 |
| 57 | Acknowledge that `able-v7.html` title and description are set by JS from localStorage — document this SEO limitation | V8 | 4 | 1 | M | 2 |
| 58 | Investigate whether Netlify Edge Functions can inject artist name and bio into `<head>` server-side for better SEO (Phase 2) | NET | 3 | 5 | L | 6 |
| 59 | Confirm `<meta name="author" content="ABLE">` is set on `landing.html` | LND | 2 | 1 | L | 5 |
| 60 | Confirm `<meta name="application-name" content="ABLE">` is set on all pages with the manifest linked | ALL | 2 | 1 | L | 5 |
| 61 | Confirm the landing page `<title>` includes a primary keyword ("independent artists" or "music") | LND | 3 | 1 | L | 3 |
| 62 | Confirm the landing page description includes the primary keyword in the first 120 characters | LND | 3 | 1 | L | 3 |
| 63 | Confirm the artist profile `<title>` dynamically includes the artist name which acts as a long-tail keyword | V8 | 4 | 1 | M | 2 |
| 64 | Confirm `<meta name="theme-color">` is set correctly on landing.html for browser chrome colouring | LND | 2 | 1 | L | 5 |
| 65 | Confirm the `<meta name="theme-color">` on `able-v7.html` is dynamically set to the artist's accent colour | V8 | 3 | 2 | L | 3 |
| 66 | Confirm the landing page title character count is verified using a SERP preview tool such as seoptimer.com | LND | 3 | 1 | L | 3 |
| 67 | Confirm the landing page description character count is verified using a SERP preview tool | LND | 3 | 1 | L | 3 |
| 68 | Confirm the artist profile title character count with a 20-character artist name does not exceed 60 characters | V8 | 3 | 1 | L | 3 |
| 69 | Confirm the artist profile title character count with a 5-character artist name is still descriptive above 50 characters | V8 | 3 | 1 | L | 3 |
| 70 | Confirm there are no `<frame>` or `<frameset>` elements on any page — obsolete and harmful to SEO | ALL | 3 | 1 | L | 3 |
| 71 | Confirm there are no empty `href` attributes in navigation links — empty hrefs can be indexed as broken links | ALL | 3 | 1 | L | 3 |
| 72 | Confirm `<h1>` on `landing.html` contains the primary keyword and matches the intent of the title tag | LND | 3 | 1 | L | 3 |
| 73 | Confirm `<h1>` on `able-v7.html` is the artist's name — one H1 per page, not a branded ABLE H1 | V8 | 4 | 1 | M | 2 |
| 74 | Confirm `landing.html` has only one `<h1>` tag | LND | 3 | 1 | L | 3 |
| 75 | Confirm `able-v7.html` has only one `<h1>` tag | V8 | 3 | 1 | L | 3 |
| 76 | Confirm heading hierarchy is correct (H1 → H2 → H3) with no skipped levels on landing.html | LND | 3 | 1 | L | 3 |
| 77 | Confirm image `alt` attributes are set on all meaningful images on landing.html | LND | 3 | 1 | L | 3 |
| 78 | Confirm image `alt` attributes are descriptive (not empty, not "image", not the filename) | LND | 3 | 1 | L | 3 |
| 79 | Confirm `able-v7.html` artist artwork has a meaningful `alt` attribute derived from the artist name | V8 | 3 | 1 | L | 3 |
| 80 | Confirm structured data (JSON-LD) for `MusicGroup` is added to able-v7.html for the artist profile | V8 | 3 | 3 | L | 4 |
| 81 | Confirm structured data for `WebSite` with sitelinks searchbox potential is added to landing.html | LND | 2 | 3 | L | 5 |
| 82 | Confirm structured data for `Organization` is added to landing.html | LND | 2 | 3 | L | 5 |
| 83 | Validate JSON-LD structured data via Google's Rich Results Test tool | ALL | 3 | 1 | L | 4 |
| 84 | Confirm there are no duplicate JSON-LD blocks on any page | ALL | 3 | 1 | L | 4 |
| 85 | Confirm `landing.html` loads without any console errors — search bots can interpret JS errors as quality signals | LND | 3 | 1 | L | 3 |
| 86 | Confirm `able-v7.html` loads without any console errors | V8 | 3 | 1 | L | 3 |
| 87 | Confirm Lighthouse SEO score is 90+ for `landing.html` in Chrome DevTools | LND | 4 | 1 | M | 2 |
| 88 | Confirm Lighthouse SEO score is 90+ for `able-v7.html` in Chrome DevTools | V8 | 4 | 1 | M | 2 |
| 89 | Run Ahrefs or SEMrush site audit on `ablemusic.co` after launch to identify any crawl issues | ALL | 3 | 2 | L | 4 |
| 90 | Confirm no broken internal links exist on `landing.html` | LND | 4 | 1 | M | 2 |
| 91 | Confirm no broken internal links exist on `able-v7.html` | V8 | 4 | 1 | M | 2 |
| 92 | Confirm the page speed score for `landing.html` is 90+ in Google PageSpeed Insights | LND | 4 | 2 | M | 2 |
| 93 | Confirm the page speed score for `able-v7.html` is 90+ in Google PageSpeed Insights | V8 | 4 | 2 | M | 2 |
| 94 | Confirm Core Web Vitals (LCP, FID, CLS) meet Google's "Good" thresholds for landing.html | LND | 4 | 2 | M | 2 |
| 95 | Confirm Core Web Vitals meet Google's "Good" thresholds for able-v7.html | V8 | 4 | 2 | M | 2 |
| 96 | Confirm `<meta name="robots" content="max-snippet:-1, max-image-preview:large">` is set on able-v7.html to allow rich snippets | V8 | 3 | 1 | L | 4 |
| 97 | Confirm `<meta name="robots" content="max-snippet:-1, max-image-preview:large">` is set on landing.html | LND | 3 | 1 | L | 4 |
| 98 | Document SEO meta strategy (title templates, description formulas) in `docs/systems/seo-og/SPEC.md` | DOC | 3 | 2 | L | 4 |
| 99 | Confirm `docs/systems/seo-og/SPEC.md` contains the current title and description for each page, not planned copy | DOC | 3 | 1 | L | 3 |
| 100 | Confirm `STATUS.md` is updated to mark J7 complete with the date Lighthouse SEO scores were verified | DOC | 2 | 1 | L | 6 |
