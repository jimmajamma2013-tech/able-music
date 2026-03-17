# Dimension I5 — Cookie Handling
**Category:** Legal, Compliance & Accessibility
**Phase:** 9

*ABLE's current architecture is designed to use no third-party cookies — a deliberate and legally advantageous choice. localStorage is used instead of cookies for all persistence, and first-party analytics avoids client-side tracking scripts. This dimension audits whether that commitment is being maintained, identifies the specific vectors (YouTube embeds, Spotify embeds, Supabase auth) that could introduce cookies, and establishes the governance required before any tracking script is ever added.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit all four pages for `document.cookie` calls — there should be none in ABLE's own JavaScript | ALL | 5 | 1 | H | 1 |
| 2 | Confirm no `Set-Cookie` response header is sent by Netlify for any non-Supabase-auth request — check Netlify function responses and `_headers` file | ALL | 5 | 2 | H | 1 |
| 3 | Confirm no `Set-Cookie` header is set by the main HTML pages served by Netlify static hosting | ALL | 5 | 1 | H | 1 |
| 4 | Confirm the current favicon.ico or manifest.json requests do not set cookies — occasionally these misconfigure cache headers | ALL | 3 | 1 | L | 2 |
| 5 | Audit localStorage usage across all pages — document every key currently in use with its purpose and data content | ALL | 4 | 2 | L | 1 |
| 6 | Confirm every localStorage key is in the canonical schema in `docs/systems/data-architecture/SPEC.md` — no orphaned keys | ALL | 4 | 2 | M | 1 |
| 7 | Confirm localStorage usage is first-party only — no third-party JavaScript reads or writes to ABLE's localStorage keys | ALL | 5 | 1 | H | 1 |
| 8 | Confirm sessionStorage usage — document what, if anything, is stored in sessionStorage and why | ALL | 3 | 1 | L | 2 |
| 9 | Confirm no JavaScript on any ABLE page uses `navigator.sendBeacon()` to third-party endpoints — this is a tracking vector | ALL | 5 | 1 | H | 1 |
| 10 | Confirm no JavaScript on any ABLE page loads a third-party analytics pixel or script — no Google Tag Manager, no Facebook Pixel, no Hotjar | ALL | 5 | 1 | H | 1 |
| 11 | Confirm Google Fonts is loaded via the `fonts.googleapis.com` CDN and that this request does not set cookies — Google Fonts does not set persistent cookies, but verify | ALL | 3 | 2 | L | 2 |
| 12 | Consider self-hosting the Google Fonts files to eliminate the Google Fonts CDN request entirely — better for privacy, better for performance | ALL | 3 | 4 | L | 3 |
| 13 | Audit all `<iframe>` elements across all four pages — list each iframe's origin | ALL | 5 | 2 | H | 1 |
| 14 | Confirm YouTube embed iframes use the `youtube-nocookie.com` domain — standard `youtube.com` iframes set third-party cookies; `youtube-nocookie.com` does not set cookies until the user interacts | V8 | 5 | 2 | H | 1 |
| 15 | Test whether `youtube-nocookie.com` iframes set any cookies on page load (before user interaction) in Chrome — open DevTools → Application → Cookies and verify no youtube domain cookies are present | V8 | 5 | 2 | H | 1 |
| 16 | Test whether `youtube-nocookie.com` iframes set cookies after the user clicks play — document whether these are classified as essential (video delivery) or tracking | V8 | 4 | 2 | M | 2 |
| 17 | If YouTube iframes set cookies after play: add a consent layer before the iframe loads — show a thumbnail with a "Play (loads YouTube)" button; only embed after consent | V8 | 4 | 4 | M | 2 |
| 18 | Confirm Spotify embed iframes — check whether `open.spotify.com` embeds set third-party cookies on load | V8 | 5 | 2 | H | 1 |
| 19 | Test Spotify embed cookie behaviour in Chrome DevTools — if Spotify sets cookies on load, a consent mechanism is required before the embed loads | V8 | 5 | 3 | H | 1 |
| 20 | If Spotify embeds set cookies on load: implement the same deferred embed pattern as recommended for YouTube — thumbnail + consent button | V8 | 4 | 4 | M | 2 |
| 21 | Confirm SoundCloud embeds (if used) do not set third-party cookies on load | V8 | 4 | 2 | M | 2 |
| 22 | Confirm Bandcamp embeds (if used) do not set third-party cookies on load | V8 | 4 | 2 | M | 2 |
| 23 | Confirm Vimeo embeds (if used) — check whether `player.vimeo.com` sets cookies; Vimeo has a "do not track" embed parameter | V8 | 4 | 2 | M | 2 |
| 24 | Document the cookie behaviour of each embed type in a table in `docs/systems/` — reference for future build decisions | DOC | 3 | 3 | L | 3 |
| 25 | Confirm the Supabase JS CDN (`cdn.jsdelivr.net`) does not set cookies when loaded — CDN scripts should not set cookies; verify | ALL | 4 | 1 | L | 2 |
| 26 | Plan for the Supabase auth cookie — when Supabase authentication is added, it will set a first-party `sb-` session cookie; this is essential for login and does not require a cookie banner under UK GDPR for functional cookies | ADM | 4 | 3 | M | 2 |
| 27 | Confirm the Supabase auth session cookie will be `HttpOnly`, `Secure`, and `SameSite=Strict` — these flags prevent XSS theft and CSRF | ADM | 5 | 3 | H | 2 |
| 28 | Confirm the Supabase auth cookie is a session cookie (deleted on browser close) or document the expiry period | ADM | 4 | 2 | M | 3 |
| 29 | Update privacy.html when the Supabase auth cookie is added — functional cookies used for login must be disclosed even if consent is not required | PRV | 4 | 2 | M | 2 |
| 30 | Confirm there is no cookie banner currently on any ABLE page — under UK GDPR and the ICO's guidance, a banner is not required for first-party functional cookies or first-party analytics without cross-site tracking | ALL | 3 | 1 | L | 1 |
| 31 | Confirm that no cookie banner will be added until a non-essential cookie is actually set — do not add a banner pre-emptively; it signals that cookies exist when they may not | ALL | 4 | 1 | L | 1 |
| 32 | Design the cookie consent mechanism for if/when a non-essential cookie is ever needed — use a minimal banner that blocks no content and stores consent in localStorage (not a cookie!) | DOC | 3 | 4 | L | 3 |
| 33 | Confirm that if a consent mechanism is ever added, it does not use a cookie to store the consent decision — this is a common ironic failure; use localStorage instead | DOC | 5 | 2 | H | 3 |
| 34 | Confirm localStorage keys are not confused with cookies in the privacy policy — current policy says "session storage only" which is technically incorrect; localStorage is used | PRV | 4 | 1 | M | 1 |
| 35 | Update privacy.html to correctly describe localStorage — "We use your browser's local storage (not cookies) to save your preferences and the artist's page settings." | PRV | 4 | 2 | M | 1 |
| 36 | Confirm localStorage data is not accessible across subdomains — localStorage is origin-bound, but if ABLE ever uses subdomains (e.g. `artist.ablemusic.co`) they would have separate localStorage | ALL | 4 | 2 | M | 2 |
| 37 | Confirm the theme preference stored in localStorage is purely functional — it is not a tracking mechanism and does not require consent | ALL | 4 | 1 | L | 1 |
| 38 | Confirm the `able_tier` value stored in localStorage is not replicated to any third-party system without consent | ALL | 4 | 1 | M | 1 |
| 39 | Confirm analytics events stored in `able_clicks` and `able_views` localStorage keys are strictly first-party — they are never transmitted to a third-party analytics service without consent | ALL | 5 | 1 | H | 1 |
| 40 | Document the decision to use first-party analytics only (no Google Analytics) as a feature and a compliance advantage in ABLE's marketing copy | DOC | 3 | 2 | L | 3 |
| 41 | Confirm the service worker registration does not set any cookies — service workers do not set cookies by design, but verify the registration script does not call `document.cookie` | ALL | 4 | 1 | L | 2 |
| 42 | Confirm the service worker cache does not store cookies from third-party responses — the SW cache strategy caches ABLE's own files only | ALL | 4 | 2 | M | 2 |
| 43 | Confirm the Netlify analytics (if enabled) is server-side only — Netlify's built-in analytics is server-side log analysis with no client-side script; verify this is how it is configured | ALL | 4 | 2 | M | 1 |
| 44 | If Netlify analytics is server-side: confirm it does not require a cookie banner — server-side analytics that doesn't track individuals doesn't require consent under UK GDPR/PECR | ALL | 4 | 1 | L | 1 |
| 45 | Confirm the PWA manifest.json is served without `Set-Cookie` headers | ALL | 3 | 1 | L | 2 |
| 46 | Confirm the service worker script is served without `Set-Cookie` headers | ALL | 3 | 1 | L | 2 |
| 47 | Verify the `netlify.toml` does not set any cookie-related headers globally that would affect all pages | ALL | 4 | 1 | M | 1 |
| 48 | Add a `_headers` rule in Netlify that sets `Set-Cookie: none` as a default policy — prevents any accidental cookie from being set | ALL | 3 | 2 | L | 3 |
| 49 | Confirm the Content Security Policy does not inadvertently allow a third-party script that would set cookies — `script-src` should only allow ABLE's own scripts and defined CDNs | ALL | 5 | 2 | H | 2 |
| 50 | Confirm the `frame-src` CSP directive only allows known embed origins — `youtube-nocookie.com`, `open.spotify.com`, `player.vimeo.com` (only if actually used) | ALL | 5 | 2 | H | 2 |
| 51 | Confirm the `connect-src` CSP directive only allows ABLE's Supabase URL and known CDNs — no arbitrary third-party connections | ALL | 5 | 2 | H | 2 |
| 52 | Run a full Cookie audit using Chrome DevTools Application panel on each page — document every cookie set by any origin and its classification | ALL | 5 | 3 | M | 2 |
| 53 | Run the cookie audit again after triggering every user interaction — click all CTAs, open all modals, play media — any interaction that might trigger a third-party call | ALL | 5 | 3 | M | 2 |
| 54 | Run the cookie audit on a fresh browser profile with no prior ABLE visits — ensures no cookies from a previous session pollute the audit | ALL | 5 | 2 | M | 2 |
| 55 | Run the cookie audit on Safari with ITP (Intelligent Tracking Prevention) enabled — document any functional difference in cookie behaviour | ALL | 4 | 3 | L | 3 |
| 56 | Run the cookie audit on Firefox with Enhanced Tracking Protection enabled — document any blocked requests that affect functionality | ALL | 4 | 3 | L | 3 |
| 57 | Document the outcome of all cookie audits in a `docs/audit/cookie-audit.md` file with date, tester, browser, and findings | DOC | 3 | 3 | L | 3 |
| 58 | Confirm no A/B testing tool is ever added without a cookie consent mechanism — A/B tools typically use cookies to maintain cohort assignment | DOC | 4 | 1 | L | 1 |
| 59 | Confirm no customer support chat widget (e.g. Intercom, Crisp) is ever added without a cookie consent mechanism | DOC | 4 | 1 | L | 1 |
| 60 | Confirm no social media share buttons (Facebook, Twitter/X) are embedded — these set third-party cookies on page load | ALL | 4 | 1 | M | 1 |
| 61 | If social sharing is ever added: use plain HTML links (`<a href="https://twitter.com/intent/tweet?...">`) rather than embedded widgets | DOC | 3 | 2 | L | 2 |
| 62 | Confirm no retargeting pixel (Google Ads, Meta Pixel) is ever added without explicit user consent — these are advertising cookies requiring opt-in | DOC | 5 | 1 | H | 1 |
| 63 | Confirm no heatmap or session recording tool (Hotjar, FullStory, Microsoft Clarity) is ever added without explicit user consent | DOC | 5 | 1 | H | 1 |
| 64 | Add a "no tracking" philosophy statement to ABLE's landing page copy — this is a differentiator and a trust signal for artists who care about their fans' privacy | LND | 4 | 2 | L | 3 |
| 65 | Confirm the fan-facing profile page (able-v8.html) specifically does not set any cookies — fans arrive via an artist's social bio link and should not be tracked | V8 | 5 | 1 | H | 1 |
| 66 | Confirm the admin page does not set unnecessary cookies — only the Supabase auth session cookie is acceptable | ADM | 5 | 1 | H | 1 |
| 67 | Confirm start.html (onboarding) does not set any cookies before the artist creates an account | STR | 4 | 1 | M | 1 |
| 68 | Confirm landing.html does not set any cookies — a marketing landing page with no cookies is a significant trust signal | LND | 4 | 1 | M | 1 |
| 69 | Confirm fan.html (when built) does not set non-essential cookies — the fan dashboard will likely need a session cookie for auth but nothing else | FAN | 4 | 2 | M | 2 |
| 70 | Confirm the privacy.html and terms.html pages do not set cookies | PRV | 4 | 1 | L | 1 |
| 71 | Add a `permissions-policy` header to Netlify `_headers` restricting access to sensitive browser APIs — `interest-cohort=()` disables FLoC/Topics, `camera=()`, `microphone=()` | ALL | 4 | 2 | L | 2 |
| 72 | Add `Referrer-Policy: strict-origin-when-cross-origin` header — prevents the full URL (which may include tokens) from being sent to third-party resources | ALL | 4 | 2 | M | 2 |
| 73 | Confirm the `Referrer-Policy` header does not expose unsubscribe tokens to third-party embed origins — the fan's unsubscribe URL must not leak | ALL | 5 | 2 | H | 2 |
| 74 | Add `Cross-Origin-Opener-Policy: same-origin` header to prevent cross-origin window access | ALL | 3 | 2 | L | 3 |
| 75 | Confirm none of ABLE's pages are embedded in third-party iframes without consent — add `X-Frame-Options: SAMEORIGIN` or CSP `frame-ancestors` directive | ALL | 4 | 2 | M | 2 |
| 76 | Confirm Google Fonts CSS is not setting cookies by using `font-display: swap` correctly — fonts loaded from `fonts.gstatic.com` CDN; verify no cookies set | ALL | 3 | 2 | L | 2 |
| 77 | Consider loading only the specific font character ranges needed (Latin only) to reduce the font request payload and eliminate any additional CDN subdomain | ALL | 3 | 3 | L | 4 |
| 78 | Confirm the `preconnect` hints for Google Fonts are not opening connections to tracking infrastructure — `fonts.googleapis.com` and `fonts.gstatic.com` are content delivery only | ALL | 3 | 1 | L | 2 |
| 79 | Confirm no `<link rel="preload">` tags are loading from third-party cookie-setting origins | ALL | 4 | 1 | L | 2 |
| 80 | Confirm no fingerprinting techniques are used — no canvas fingerprinting, no AudioContext fingerprinting, no battery API | ALL | 5 | 1 | H | 1 |
| 81 | Confirm the `navigator.userAgent` is only used for legitimate feature detection (e.g. detecting iOS for safe-area handling) and not for tracking | ALL | 4 | 1 | L | 2 |
| 82 | Confirm localStorage is cleared when an artist deletes their account — no orphaned data remaining after account deletion | ADM | 5 | 2 | H | 2 |
| 83 | Confirm localStorage is not used to track fans across different artists' pages — each artist's data is isolated by key design | V8 | 5 | 1 | H | 1 |
| 84 | Define the localStorage expiry policy for analytics events — `able_clicks` and `able_views` should be pruned to the most recent 60 days to respect data minimisation | V8 | 4 | 2 | M | 2 |
| 85 | Confirm the analytics pruning policy is documented in `docs/systems/analytics/SPEC.md` | DOC | 3 | 1 | L | 2 |
| 86 | Confirm the data minimisation principle (UK GDPR Article 5(1)(c)) is applied to localStorage — only collect and retain what is necessary for the stated purpose | ALL | 5 | 2 | H | 2 |
| 87 | Add a periodic localStorage cleanup function that runs on admin.html load — prunes events older than 60 days, verifies schema integrity | ADM | 4 | 3 | M | 3 |
| 88 | Confirm the `able_dismissed_nudges` localStorage key is included in the cleanup policy | ADM | 2 | 1 | L | 3 |
| 89 | Confirm the `admin_visit_dates` localStorage key is trimmed to the last 60 entries as specified in the data architecture schema | ADM | 3 | 1 | L | 2 |
| 90 | Run a Chrome Lighthouse audit on each page and check the Privacy/Security section for any flagged cookie issues | ALL | 4 | 2 | L | 2 |
| 91 | Run a Mozilla Observatory scan on ablemusic.co and address any cookie security header recommendations | ALL | 4 | 2 | L | 2 |
| 92 | Run a Qualys SSL Labs test on ablemusic.co — SSL/TLS configuration affects cookie security | ALL | 4 | 2 | L | 2 |
| 93 | Confirm the `SameSite` attribute consideration for any future Netlify-set cookies — default in modern browsers is `SameSite=Lax`; confirm this is appropriate for ABLE's auth flow | ADM | 4 | 2 | M | 3 |
| 94 | Add ABLE's cookie/localStorage policy summary to the admin help documentation — artists should understand what data is stored in their browser | ADM | 3 | 2 | L | 3 |
| 95 | Document the "no cookie banner" decision and its reasoning in `docs/systems/` — explains the ICO guidance basis for not requiring a banner for first-party functional storage | DOC | 3 | 2 | L | 3 |
| 96 | Reference the ICO's guidance document "Cookies and similar technologies" in the decision document — confirms the legal basis for the no-banner approach | DOC | 3 | 1 | L | 3 |
| 97 | Schedule an annual cookie re-audit — as ABLE adds features, new cookie vectors may be introduced; this must be checked proactively | DOC | 4 | 2 | L | 4 |
| 98 | Add a "last audited" date to the cookie audit document and update it when new embed types or third-party scripts are added | DOC | 3 | 1 | L | 3 |
| 99 | Confirm the approach is reviewed when Stripe is added — Stripe.js sets first-party cookies for fraud detection; these are functional and should be disclosed but do not require opt-in consent | DOC | 4 | 3 | M | 3 |
| 100 | Final check: open each of the four main pages in a fresh Chrome profile, inspect Application → Cookies after all user interactions, and confirm the cookie jar is either empty or contains only the expected first-party functional cookies with no third-party entries | ALL | 5 | 2 | H | 4 |

## Wave Summary
**Wave 1 — Immediate verification**: items #1–#3, #7, #9–#10, #13–#15, #18–#19, #30–#31, #34–#35, #39, #43–#44, #47, #60, #62–#63, #65–#68, #70, #80, #83
**Wave 2 — Embed and third-party audit**: items #4–#6, #8, #11, #16, #21–#29, #36–#38, #41–#42, #45–#46, #49–#51, #69, #71–#73, #75–#79, #82, #84–#86
**Wave 3 — Documentation and headers**: items #12, #17, #20, #24, #32–#33, #40, #48, #52–#57, #58–#59, #61, #64, #74, #81, #87–#92, #94–#96
**Wave 4 — Ongoing governance**: items #77, #93, #97–#100
