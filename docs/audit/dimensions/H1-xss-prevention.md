# Dimension H1 — XSS Prevention
**Category:** Security, Data & Performance
**Phase:** 8

All user-generated content must be escaped before it is written into the DOM. `innerHTML` must never receive untrusted data; `textContent` should be the default for text nodes. The `escHtml()` helper (defined in `fan-confirmation.js` as `esc()`) must exist in every page that renders profile data, and every field path from localStorage into the DOM must pass through it.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Audit every `innerHTML` assignment in `able-v8.html` (43 occurrences) — confirm none receives raw profile data without escaping | able-v8.html | 5 | 3 | H | 1 |
| 2 | Audit every `innerHTML` assignment in `admin.html` (57 occurrences) — highest count in codebase, highest risk surface | admin.html | 5 | 3 | H | 1 |
| 3 | Confirm `escHtml()` is defined at the top of `able-v8.html` before any render call | able-v8.html | 5 | 1 | H | 1 |
| 4 | Confirm `escHtml()` is defined at the top of `admin.html` before any render call | admin.html | 5 | 1 | H | 1 |
| 5 | Confirm `escHtml()` is defined in `start.html` and used for any wizard preview that reflects user input | start.html | 4 | 1 | H | 1 |
| 6 | Confirm `escHtml()` is defined in `fan.html` and used for all artist-name and release-title renders | fan.html | 4 | 1 | H | 1 |
| 7 | Confirm `escHtml()` is defined in `landing.html` and used for any dynamic content | landing.html | 3 | 1 | H | 1 |
| 8 | Trace artist name (`able_v3_profile.name`) from localStorage read to every DOM write — verify each write uses `escHtml()` or `textContent` | able-v8.html | 5 | 2 | H | 1 |
| 9 | Trace artist name render in `admin.html` — all greeting and heading renders must escape | admin.html | 5 | 2 | H | 1 |
| 10 | Trace bio text (`able_v3_profile.bio`) from localStorage to every DOM insertion — biography field is freeform and highest-risk | able-v8.html | 5 | 2 | H | 1 |
| 11 | Trace bio text render in `admin.html` preview panel — must not use raw `innerHTML` | admin.html | 5 | 2 | H | 1 |
| 12 | Trace release title (`able_v3_profile.releaseTitle`) to every DOM insertion — appears in hero, countdown, and fan capture heading | able-v8.html | 5 | 2 | H | 1 |
| 13 | Trace release title render in `admin.html` campaign HQ — must escape | admin.html | 4 | 1 | H | 1 |
| 14 | Trace show venue (`able_shows[n].venue`) to every DOM insertion in the events section | able-v8.html | 4 | 2 | H | 1 |
| 15 | Trace show venue render in `admin.html` shows list — must escape | admin.html | 4 | 1 | H | 1 |
| 16 | Trace snap card content (title, body text) to every DOM insertion | able-v8.html | 4 | 2 | H | 1 |
| 17 | Trace snap card content render in `admin.html` snap card editor preview | admin.html | 4 | 1 | H | 1 |
| 18 | Trace CTA label text to every DOM insertion in hero and quick-action zones | able-v8.html | 5 | 2 | H | 1 |
| 19 | Trace CTA label render in `admin.html` CTA editor preview | admin.html | 4 | 1 | H | 1 |
| 20 | Trace credit name field to every DOM insertion (freelancer credits section) | able-v8.html | 4 | 2 | H | 1 |
| 21 | Trace fan email display in `admin.html` fan list — email addresses can contain special characters | admin.html | 5 | 2 | H | 1 |
| 22 | Verify fan email render in starred fans section of `admin.html` also escapes | admin.html | 4 | 1 | H | 1 |
| 23 | Verify fan email in CSV export does not inject formula characters (prepend apostrophe or quote-wrap for Excel safety) | admin.html | 3 | 2 | M | 2 |
| 24 | Audit error messages that include user-supplied values — verify they escape the echoed value before inserting into DOM | all pages | 4 | 2 | H | 1 |
| 25 | Audit the `?ref=` URL parameter — verify it is never reflected into the DOM unescaped (source attribution capture reads this param) | able-v8.html | 5 | 2 | H | 1 |
| 26 | Audit the `?artist=` URL parameter in `fan.html` — verify it is never reflected into DOM unescaped | fan.html | 5 | 2 | H | 1 |
| 27 | Audit `?source=` and UTM parameters — if any are shown in UI (e.g. "You came from..."), they must be escaped | able-v8.html | 4 | 1 | H | 1 |
| 28 | Audit all template literal strings that interpolate profile data — ensure the interpolated value is wrapped in `escHtml()` at the point of interpolation | able-v8.html | 5 | 3 | H | 1 |
| 29 | Audit all template literal strings in `admin.html` that interpolate fan or artist data | admin.html | 5 | 3 | H | 1 |
| 30 | Verify the `esc()` function in `fan-confirmation.js` covers all five required replacements: `&`, `<`, `>`, `"`, `'` — note: current implementation omits single-quote (`'`) escaping | netlify/functions/fan-confirmation.js | 4 | 1 | H | 1 |
| 31 | Add single-quote (`&#39;`) escaping to the `esc()` function in `fan-confirmation.js` — protects against injection in HTML attribute values delimited by single quotes | netlify/functions/fan-confirmation.js | 4 | 1 | H | 1 |
| 32 | Verify the `esc()` function result is used for the email `<title>` element (currently `${esc(headingLine)}` — confirmed correct) | netlify/functions/fan-confirmation.js | 3 | 1 | L | 2 |
| 33 | Verify the `esc()` function is applied to `accent` colour value in email template — protects against CSS injection if accent comes from user input (currently `${esc(accent)}` — confirmed correct) | netlify/functions/fan-confirmation.js | 4 | 1 | L | 2 |
| 34 | Verify the `esc()` function is applied to `fanDashboard` URL in email CTA href — protects against `javascript:` injection (currently `${esc(fanDashboard)}` — confirmed correct) | netlify/functions/fan-confirmation.js | 5 | 1 | H | 1 |
| 35 | Verify the `esc()` function is applied to `profile` URL in email footer — same URL injection risk | netlify/functions/fan-confirmation.js | 4 | 1 | H | 1 |
| 36 | Add URL scheme validation in `fan-confirmation.js` to reject non-`https://` URLs before they reach the `esc()` function — `javascript:` survives HTML escaping in href context | netlify/functions/fan-confirmation.js | 5 | 2 | H | 1 |
| 37 | Audit merch product name field render path from localStorage to DOM | able-v8.html | 4 | 2 | H | 1 |
| 38 | Audit merch product description render path | able-v8.html | 4 | 2 | H | 1 |
| 39 | Audit platform link label render path — labels can be user-edited | able-v8.html | 4 | 1 | H | 1 |
| 40 | Audit platform link URL render path — URLs inserted into `href` attributes must be scheme-validated, not just HTML-escaped | able-v8.html | 5 | 2 | H | 1 |
| 41 | Audit `admin.html` connections section — any imported Linktree link title must be escaped on render | admin.html | 4 | 2 | H | 1 |
| 42 | Audit the `linktree-import.js` function — does it sanitise or pass through link titles as-is? | netlify/functions/linktree-import.js | 4 | 2 | H | 1 |
| 43 | Audit the `ai-copy.js` function response — AI-generated text returned to the client must be treated as untrusted and escaped before DOM insertion | able-v8.html | 5 | 2 | H | 1 |
| 44 | Audit `start.html` wizard preview panel — any step that renders a live preview of artist name or bio must use `textContent` or `escHtml()` | start.html | 4 | 2 | H | 1 |
| 45 | Audit `start.html` confetti/success screen — does it reflect any user-entered name into the DOM? Must escape. | start.html | 3 | 1 | H | 1 |
| 46 | Define a project-wide `escHtml()` utility in a shared module (e.g. `shared/able.js`) so all pages use one implementation rather than copying the function | all pages | 4 | 3 | M | 3 |
| 47 | Add a lint/grep CI check that flags any `innerHTML` assignment not preceded by `escHtml(` on the same line — prevents regression | all pages | 4 | 3 | M | 3 |
| 48 | Audit the `able_tier` localStorage value — if rendered in UI (e.g. tier badge), ensure it is displayed via `textContent` or escaped | admin.html | 3 | 1 | M | 2 |
| 49 | Audit the `able_dismissed_nudges` array — if nudge IDs are ever reflected into DOM text, they must be escaped | admin.html | 2 | 1 | L | 4 |
| 50 | Audit the `admin_visit_dates` array — if dates are rendered into UI labels, ensure they pass through a safe formatter | admin.html | 2 | 1 | L | 4 |
| 51 | Audit the `able_gig_expires` timestamp — if formatted and rendered, use a safe number formatter | admin.html | 2 | 1 | L | 4 |
| 52 | Audit the `able_starred_fans` array — fan emails shown in starred list must be escaped | admin.html | 4 | 1 | H | 1 |
| 53 | Confirm that the `able-v8.html` `innerHTML` count (43) is not higher than `admin.html` after next refactor — profile page is fan-facing and thus higher risk | able-v8.html | 4 | 2 | H | 1 |
| 54 | Verify that `start.html`'s 6 `innerHTML` uses are all for static or already-escaped content | start.html | 4 | 1 | H | 1 |
| 55 | Verify that `fan.html`'s 16 `innerHTML` uses are all for static or already-escaped content | fan.html | 4 | 2 | H | 1 |
| 56 | Verify that `landing.html`'s 2 `innerHTML` uses are for static content only | landing.html | 3 | 1 | M | 2 |
| 57 | Establish a rule: all new `innerHTML` assignments require a code comment citing the escaping justification | all pages | 3 | 1 | L | 3 |
| 58 | Review the artist accent colour CSS injection path — `--color-accent: ${accentHex}` set via JS must validate the hex format before insertion | able-v8.html | 4 | 2 | H | 1 |
| 59 | Add regex validation for `accentHex` in `able-v8.html` before it is written to `style.setProperty()` — must match `/^#[0-9a-fA-F]{6}$/` | able-v8.html | 5 | 1 | H | 1 |
| 60 | Add same regex validation for `accentHex` in `admin.html` before `style.setProperty()` | admin.html | 5 | 1 | H | 1 |
| 61 | Verify the oEmbed response from `oembed-proxy.js` — the `title` and `author_name` fields are rendered in the admin oEmbed preview and must be escaped | admin.html | 4 | 2 | H | 1 |
| 62 | Verify the oEmbed `html` field (embed iframe string) — if inserted via `innerHTML`, the embed code may contain unexpected content; prefer inserting only a sanitised `<iframe>` constructed from known-safe attributes | admin.html | 5 | 3 | H | 1 |
| 63 | Audit the Spotify import result fields (`name`, `bio`, `releases[n].title`) — all pass through `spotifyFetch()` and are stored in localStorage, then rendered; they must be escaped at render time, not at import time | able-v8.html | 4 | 2 | H | 1 |
| 64 | Audit the Last.fm bio — `stripHtml()` in `spotify-import.js` strips tags but does not HTML-encode entities; the bio is stored raw in localStorage and rendered later; ensure render-time escaping | able-v8.html | 4 | 2 | H | 1 |
| 65 | Audit the Ticketmaster show titles — `ev.name` from external API stored in `able_shows` and rendered in events section; must be escaped at render | able-v8.html | 4 | 2 | H | 1 |
| 66 | Audit `ticketmaster-import.js` response — all string fields passed through to client must be treated as untrusted | netlify/functions/ticketmaster-import.js | 4 | 1 | H | 1 |
| 67 | Confirm that the `esc()` function in `fan-confirmation.js` is not shared with the frontend — both definitions must be kept in sync or merged into one shared utility | netlify/functions/fan-confirmation.js | 3 | 2 | M | 3 |
| 68 | Add integration test: submit a fan sign-up with `fanEmail = 'test@test.com"><img src=x onerror=alert(1)>'` and verify the confirmation email renders it safely | netlify/functions/fan-confirmation.js | 5 | 3 | H | 2 |
| 69 | Add integration test: render artist name `<script>alert(1)</script>` in `able-v8.html` and verify no alert fires | able-v8.html | 5 | 3 | H | 2 |
| 70 | Add integration test: store `<img src=x onerror=alert(1)>` as bio in localStorage and load `able-v8.html` — verify no execution | able-v8.html | 5 | 3 | H | 2 |
| 71 | Add integration test: store XSS payload in show venue and load events section — verify no execution | able-v8.html | 4 | 3 | H | 2 |
| 72 | Add integration test: store XSS payload in snap card title and load snap cards section — verify no execution | able-v8.html | 4 | 3 | H | 2 |
| 73 | Add integration test: store XSS payload in CTA label and load hero section — verify no execution | able-v8.html | 5 | 3 | H | 2 |
| 74 | Add integration test: fan signs up with email containing XSS — verify admin fan list renders it safely | admin.html | 5 | 3 | H | 2 |
| 75 | Add integration test: open admin with artist name containing XSS — verify greeting renders safely | admin.html | 5 | 3 | H | 2 |
| 76 | Ensure `textContent` is preferred over `escHtml()` + `innerHTML` wherever only plain text is being inserted — `textContent` is inherently safe and more readable | all pages | 4 | 3 | M | 3 |
| 77 | Document the escaping policy in `CLAUDE.md` / a code comment header in each active file: "All user-generated content must use `textContent` or `escHtml()` before `innerHTML`" | all pages | 3 | 1 | L | 4 |
| 78 | Verify the `fan.html` `?artist=` slug is not reflected into a `<title>` or `<h1>` without escaping (slug comes from URL, not localStorage) | fan.html | 4 | 2 | H | 1 |
| 79 | Verify the `fan.html` `?ref=` parameter is not reflected into any visible text | fan.html | 4 | 1 | H | 1 |
| 80 | Verify the `landing.html` query parameters (if any) are not reflected into DOM text | landing.html | 3 | 1 | H | 1 |
| 81 | Audit the error state rendering in `start.html` — wizard validation errors that echo the invalid input must escape it | start.html | 4 | 1 | H | 1 |
| 82 | Audit the error state rendering in `admin.html` — any error that includes user-supplied content (e.g. "Could not save '[title]'") must escape | admin.html | 4 | 1 | H | 1 |
| 83 | Audit the toast/notification system across all pages — if toast messages include profile data, they must be escaped before DOM insertion | all pages | 4 | 2 | H | 1 |
| 84 | Verify the profile URL constructed as `baseUrl + '/' + slug` — the `slug` is user-supplied and must be URL-safe validated before concatenation | admin.html | 4 | 1 | H | 1 |
| 85 | Add slug validation (alphanumeric + hyphens only, `/^[a-z0-9-]+$/`) in `start.html` wizard before the slug is stored | start.html | 4 | 2 | H | 1 |
| 86 | Verify that `escHtml()` is not used on URL values that go into `href` attributes — URL encoding is different from HTML entity encoding; use `encodeURIComponent()` for URL components | all pages | 4 | 2 | H | 1 |
| 87 | Audit `admin.html` analytics section — if chart labels include profile data (e.g. CTA labels), they must be escaped before rendering into SVG text nodes | admin.html | 3 | 2 | M | 3 |
| 88 | Audit the `able_clicks` event `label` field — click events store the CTA label; if this is ever rendered back into the UI (e.g. in an analytics breakdown table), it must be escaped | admin.html | 4 | 2 | H | 1 |
| 89 | Audit the `able_views` event `source` field — source attribution strings stored with view events; if rendered in UI, must be escaped | admin.html | 3 | 1 | M | 2 |
| 90 | Audit the freelancer credit confirmation flow — when a confirmed credit links to the freelancer's profile, the credit text displayed on the artist's page is user-supplied and must be escaped | able-v8.html | 4 | 2 | H | 1 |
| 91 | Verify that SVG inline content is not constructed from user data — SVG `<text>` elements are also XSS vectors if built with `innerHTML` | all pages | 3 | 2 | H | 2 |
| 92 | Confirm that the rate card section on freelancer profiles escapes all user-supplied rate and service description fields | able-v8.html | 4 | 1 | H | 1 |
| 93 | Confirm the booking enquiry form does not reflect submitted values back into the DOM without escaping | able-v8.html | 4 | 1 | H | 1 |
| 94 | Add a `sanitiseUrl()` utility that validates a URL is `https://` scheme before any URL is inserted into an `href` attribute | all pages | 5 | 2 | H | 1 |
| 95 | Verify artist avatar/artwork URL stored in `able_v3_profile.photo` is scheme-validated before insertion into `src` attribute | able-v8.html | 4 | 1 | H | 1 |
| 96 | Verify Spotify artwork URLs from import are inserted into `src` attributes with scheme validation — they come from `i.scdn.co` CDN but must still be validated | able-v8.html | 3 | 1 | M | 2 |
| 97 | Write a security checklist entry in `docs/STATUS.md`: "XSS audit complete — date, pages covered, open items" | docs/STATUS.md | 3 | 1 | L | 4 |
| 98 | Run a Playwright security smoke test that loads each active page with XSS payloads in localStorage and asserts `window.alert` was never called | all pages | 5 | 4 | H | 2 |
| 99 | Review the Netlify function `CORS_HEADERS` — `Access-Control-Allow-Origin: *` means any origin can call the fan-confirmation endpoint; ensure this is intentional (it is, for a public fan-sign-up endpoint) | netlify/functions/fan-confirmation.js | 3 | 1 | M | 3 |
| 100 | Establish a recurring XSS review checklist: before every new feature that writes user data to the DOM, the developer must trace the data path and document the escaping point | all pages | 4 | 2 | M | 3 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — escaping gaps, `innerHTML` audit, URL injection, accent CSS injection | 1–26, 28–36, 38–46, 48, 52–66, 78–89, 91–96 |
| 2 | Integration tests — XSS payloads in localStorage and URL params | 68–75, 97–98 |
| 3 | Structural improvements — shared utility, lint rules, policy docs | 46–47, 67, 76–77 |
| 4 | Low-risk housekeeping — dismissed nudges, visit dates, gig expiry renders | 49–51, 77, 97 |
