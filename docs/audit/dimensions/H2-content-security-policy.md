# Dimension H2 — Content Security Policy
**Category:** Security, Data & Performance
**Phase:** 8

CSP headers are the last line of defence if XSS escaping fails. Currently `netlify.toml` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `X-XSS-Protection` — but there is no `Content-Security-Policy` header. A `_headers` file does not exist. This dimension covers adding and calibrating a full CSP that permits all legitimate resources (Google Fonts, Supabase CDN, oEmbed iframes) without using `unsafe-inline` or `unsafe-eval` in `script-src`.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm that a `_headers` file does not exist — current security headers are in `netlify.toml` only | netlify.toml | 5 | 1 | H | 1 |
| 2 | Decide whether to add CSP via `netlify.toml` `[[headers]]` block or a separate `_headers` file — prefer `netlify.toml` for consistency with current setup | netlify.toml | 4 | 1 | M | 1 |
| 3 | Add a `Content-Security-Policy` header to the `[[headers]]` block in `netlify.toml` for `/*` | netlify.toml | 5 | 2 | H | 1 |
| 4 | Set `default-src 'self'` as the base fallback directive | netlify.toml | 5 | 1 | H | 1 |
| 5 | Set `script-src 'self'` initially — then extend with specific CDN hashes or nonces | netlify.toml | 5 | 2 | H | 1 |
| 6 | Add Supabase CDN to `script-src`: `https://cdn.jsdelivr.net` (for `@supabase/supabase-js@2`) | netlify.toml | 5 | 1 | H | 1 |
| 7 | Audit whether any Google Fonts JS is loaded — if not, `fonts.googleapis.com` does not need to be in `script-src` | all pages | 3 | 1 | M | 1 |
| 8 | Audit all third-party `<script src="...">` tags across `able-v8.html`, `admin.html`, `start.html`, `landing.html` — list every CDN that needs to be in `script-src` | all pages | 5 | 2 | H | 1 |
| 9 | Determine whether `'unsafe-inline'` is currently required in `script-src` — if any inline `<script>` blocks exist on active pages, migrate them to external files or use a nonce | all pages | 5 | 3 | H | 1 |
| 10 | Audit all active pages for inline `<script>` blocks — each is a blocker for removing `unsafe-inline` | all pages | 5 | 3 | H | 1 |
| 11 | Audit all active pages for `onclick=`, `onload=`, `onerror=` HTML attributes — each is a blocker for removing `unsafe-inline` | all pages | 4 | 2 | H | 1 |
| 12 | Note: Google Fonts `font-display: swap` technique uses an `onload` attribute on `<link>` — this is a style attribute, not a script attribute, so it does not require `script-src unsafe-inline` | all pages | 3 | 1 | L | 2 |
| 13 | Set `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` — `unsafe-inline` in `style-src` is lower risk than in `script-src` and is required for CSS custom properties set via `style.setProperty()` | netlify.toml | 4 | 1 | M | 1 |
| 14 | Investigate whether `style-src` can use nonces instead of `unsafe-inline` — would require server-side nonce injection, which Netlify functions can do but adds complexity | netlify.toml | 3 | 4 | M | 4 |
| 15 | Set `font-src 'self' https://fonts.gstatic.com` for Google Fonts woff2 files | netlify.toml | 4 | 1 | M | 1 |
| 16 | Verify no other font CDNs are used — if only Google Fonts, `fonts.gstatic.com` is the only needed entry | all pages | 3 | 1 | L | 2 |
| 17 | Set `img-src 'self' data: blob:` as the base — `data:` needed for any inline base64 images, `blob:` needed if service worker creates blob URLs | netlify.toml | 4 | 1 | M | 1 |
| 18 | Add `https://images.unsplash.com` to `img-src` — used for artist artwork placeholders in `able-v8.html` | netlify.toml | 4 | 1 | M | 1 |
| 19 | Add `https://i.scdn.co` to `img-src` — Spotify CDN for album artwork returned by `spotify-import.js` | netlify.toml | 4 | 1 | M | 1 |
| 20 | Add `https://*.scdn.co` or audit exact Spotify image CDN hostnames — `i.scdn.co` may not be the only hostname used | netlify.toml | 3 | 1 | M | 1 |
| 21 | Add Apple Music artwork CDN hostname to `img-src` if Apple Music import is planned | netlify.toml | 3 | 1 | L | 3 |
| 22 | Add `https://is1-ssl.mzstatic.com` (Apple CDN pattern) to `img-src` — research exact hostnames when Apple integration is built | netlify.toml | 3 | 2 | L | 3 |
| 23 | Set `connect-src 'self'` as base — then extend | netlify.toml | 4 | 1 | M | 1 |
| 24 | Add Supabase project URL to `connect-src`: `https://jgspraqrnjrerzhnnhtb.supabase.co` | netlify.toml | 5 | 1 | H | 1 |
| 25 | Add Supabase realtime URL to `connect-src` if realtime subscriptions are used: `wss://jgspraqrnjrerzhnnhtb.supabase.co` | netlify.toml | 3 | 1 | M | 2 |
| 26 | Add Resend API to `connect-src` — note: Resend is called from Netlify functions (server-side), so it does NOT need to be in the browser-side CSP `connect-src` | netlify.toml | 3 | 1 | L | 2 |
| 27 | Add `/.netlify/functions/` to `connect-src` — the fan sign-up flow calls `fan-confirmation` directly from the browser | netlify.toml | 4 | 1 | M | 1 |
| 28 | Confirm whether `https://api.resend.com` appears in any client-side fetch call — if it does, it must be in `connect-src` and the API key exposure must be reviewed immediately | all pages | 5 | 1 | H | 1 |
| 29 | Set `frame-src` to allow YouTube and Spotify embeds: `https://www.youtube.com https://open.spotify.com` | netlify.toml | 4 | 1 | M | 1 |
| 30 | Add SoundCloud and Vimeo to `frame-src`: `https://soundcloud.com https://player.vimeo.com` — these are in the `oembed-proxy.js` allowed list | netlify.toml | 4 | 1 | M | 1 |
| 31 | Add Mixcloud to `frame-src`: `https://www.mixcloud.com` — in the `oembed-proxy.js` allowed list | netlify.toml | 3 | 1 | M | 2 |
| 32 | Verify that oEmbed `html` field from `oembed-proxy.js` produces an `<iframe>` — the `frame-src` directive controls which domains those iframes can load from | all pages | 4 | 2 | M | 1 |
| 33 | Set `object-src 'none'` — prevents Flash and other plugin content | netlify.toml | 4 | 1 | L | 1 |
| 34 | Set `base-uri 'self'` — prevents `<base>` tag injection attacks | netlify.toml | 4 | 1 | M | 1 |
| 35 | Set `form-action 'self'` — prevents form submission hijacking to external URLs | netlify.toml | 4 | 1 | M | 1 |
| 36 | Set `upgrade-insecure-requests` — upgrades all HTTP sub-resource requests to HTTPS | netlify.toml | 3 | 1 | L | 1 |
| 37 | Consider `block-all-mixed-content` — stricter than `upgrade-insecure-requests`, blocks rather than upgrades | netlify.toml | 3 | 1 | L | 3 |
| 38 | Verify `X-Frame-Options: SAMEORIGIN` in `netlify.toml` is correct — this prevents the ABLE pages themselves from being embedded in third-party iframes, which is the right default | netlify.toml | 4 | 1 | L | 1 |
| 39 | Verify whether any ABLE page needs to be embeddable in a third-party iframe — if not, `DENY` is stricter than `SAMEORIGIN` | netlify.toml | 3 | 1 | L | 3 |
| 40 | Verify `X-Content-Type-Options: nosniff` is set — confirmed in `netlify.toml` | netlify.toml | 4 | 1 | L | 1 |
| 41 | Verify `Referrer-Policy: strict-origin-when-cross-origin` is appropriate — this sends the full URL to same-origin but only the origin to cross-origin; fine for analytics | netlify.toml | 3 | 1 | L | 2 |
| 42 | Consider tightening `Referrer-Policy` to `no-referrer-when-downgrade` or `same-origin` — the current setting may send artist profile URLs to third-party services (Spotify, YouTube) in the `Referer` header | netlify.toml | 3 | 1 | L | 3 |
| 43 | Verify `X-XSS-Protection: 1; mode=block` — this header is deprecated in modern browsers but harmless to keep for older browser compatibility | netlify.toml | 2 | 1 | L | 4 |
| 44 | Remove `X-XSS-Protection` header or document the deliberate keep decision — modern browsers ignore it and it can cause issues in some scenarios | netlify.toml | 2 | 1 | L | 4 |
| 45 | Set `Permissions-Policy` — already set in `netlify.toml` to disable camera, microphone, geolocation; verify this is complete | netlify.toml | 3 | 1 | L | 2 |
| 46 | Consider adding `payment=()` and `usb=()` to `Permissions-Policy` | netlify.toml | 2 | 1 | L | 4 |
| 47 | Test the initial CSP in Report-Only mode (`Content-Security-Policy-Report-Only`) before switching to enforcement — prevents breaking legitimate features | netlify.toml | 5 | 2 | M | 1 |
| 48 | Set up a CSP reporting endpoint (can be a simple Netlify function `csp-report.js`) to capture violations in Report-Only mode | netlify.toml | 3 | 3 | M | 2 |
| 49 | Check whether `admin.html` uses `eval()` anywhere — if so, `unsafe-eval` in `script-src` would be required, which significantly weakens CSP | admin.html | 5 | 1 | H | 1 |
| 50 | Check whether `admin.html` uses `new Function()` anywhere — same concern as `eval()` | admin.html | 5 | 1 | H | 1 |
| 51 | Check whether `able-v8.html` uses `eval()` or `new Function()` — if yes, refactor to remove the dependency | able-v8.html | 5 | 2 | H | 1 |
| 52 | Verify the Supabase JS SDK itself does not use `eval()` at runtime — if it does, `unsafe-eval` would be unavoidable without a build step | all pages | 4 | 2 | H | 1 |
| 53 | Check whether the confetti library in `start.html` uses `eval()` — many animation libraries do | start.html | 3 | 1 | M | 2 |
| 54 | Research whether `cdn.jsdelivr.net` is sufficiently trusted for `script-src` — consider pinning to a specific version hash instead of a CDN URL | all pages | 4 | 2 | M | 2 |
| 55 | Consider using Subresource Integrity (SRI) hashes on all CDN script tags — add `integrity="sha384-..."` attribute to each external script | all pages | 4 | 3 | M | 2 |
| 56 | Generate SRI hash for the Supabase CDN script and add `integrity` + `crossorigin="anonymous"` attributes | able-v8.html | 4 | 2 | M | 2 |
| 57 | Generate SRI hashes for any other CDN scripts (Google Fonts, if any JS is loaded) | all pages | 3 | 2 | M | 2 |
| 58 | Document in `CLAUDE.md` that any new external script must have an SRI hash before being added | all pages | 3 | 1 | L | 3 |
| 59 | Set separate CSP for Netlify functions endpoints — the `/.netlify/functions/*` path serves JSON, not HTML; it should not inherit the HTML CSP | netlify.toml | 3 | 2 | M | 3 |
| 60 | Verify that the `artist-welcome.js` function (email sending) is not callable from the browser with a service key — CORS headers on functions are `*` but the function should validate that it only accepts POST from known origins or with a shared secret | netlify/functions/artist-welcome.js | 5 | 2 | H | 1 |
| 61 | Add a rate-limit response header convention to Netlify functions — even without server-side rate limiting, returning `Retry-After` on repeated failures is good practice | netlify/functions/ | 3 | 2 | M | 3 |
| 62 | Verify that `landing.html` does not load any third-party analytics scripts — if it does (e.g. Plausible, GA), those hosts must be in `script-src` and `connect-src` | landing.html | 4 | 1 | M | 1 |
| 63 | If Plausible analytics is added, ensure `https://plausible.io` is in both `script-src` and `connect-src` | landing.html | 3 | 1 | M | 3 |
| 64 | Verify that no page loads a script from `https://cdn.jsdelivr.net` other than Supabase — to keep the allowlist tight | all pages | 4 | 1 | M | 1 |
| 65 | Verify that no page loads a script from `unpkg.com` — if so, add to allowlist or migrate to `jsdelivr` | all pages | 3 | 1 | M | 1 |
| 66 | Test the CSP against the oEmbed iframe embed path: load `able-v8.html` with a Spotify embed and verify the iframe renders without CSP violations | able-v8.html | 4 | 2 | M | 2 |
| 67 | Test the CSP against the YouTube embed path — `www.youtube.com/embed/` iframes must not be blocked | able-v8.html | 4 | 2 | M | 2 |
| 68 | Test the CSP against the Google Fonts CSS load — `fonts.googleapis.com` stylesheet must not be blocked by `style-src` | all pages | 4 | 2 | M | 2 |
| 69 | Test the CSP against `style.setProperty()` calls for accent colour — these are inline style mutations; confirm `style-src unsafe-inline` is correctly covering this | all pages | 4 | 2 | M | 2 |
| 70 | Test the CSP against Supabase JS auth calls — `connect-src` must allow the Supabase URL and the `wss://` WebSocket endpoint | all pages | 5 | 2 | H | 1 |
| 71 | Test the CSP on `admin.html` after Supabase integration — `connect-src` errors will appear in the browser console | admin.html | 5 | 2 | H | 1 |
| 72 | Test the PWA service worker registration — `worker-src 'self'` may need to be set explicitly for service worker installs | all pages | 3 | 1 | M | 2 |
| 73 | Set `worker-src 'self'` in CSP to permit service worker registration | netlify.toml | 3 | 1 | M | 2 |
| 74 | Set `manifest-src 'self'` in CSP to permit PWA manifest loading | netlify.toml | 3 | 1 | L | 2 |
| 75 | Verify the CSP `report-uri` or `report-to` directive is set once a reporting endpoint exists | netlify.toml | 3 | 2 | M | 3 |
| 76 | Document the final CSP policy in `docs/systems/seo-og/SPEC.md` or a new `docs/systems/csp/SPEC.md` | docs/ | 3 | 2 | L | 4 |
| 77 | Evaluate adding `require-trusted-types-for 'script'` as a future improvement — Trusted Types API enforces XSS prevention at the platform level | all pages | 3 | 5 | M | 5 |
| 78 | Verify the Netlify deploy preview URLs (`deploy-preview-*.netlify.app`) are not accidentally excluded from the CSP `connect-src` allowlist during development | netlify.toml | 3 | 1 | M | 2 |
| 79 | Consider using an environment variable for the CSP header value so it can be different in staging vs production | netlify.toml | 3 | 3 | M | 4 |
| 80 | Verify that the `Cache-Control: public, max-age=31536000, immutable` for `.css` and `.js` files is compatible with the CSP — if a hash-based CSP is used, updating a CDN script hash will require a deploy | netlify.toml | 3 | 1 | M | 2 |
| 81 | Confirm that `img-src` allows `blob:` for any canvas-generated images (e.g. if the admin exports a chart as an image) | admin.html | 2 | 1 | L | 4 |
| 82 | Confirm that `img-src` allows `data:` — base64-encoded inline images are used in some email previews | admin.html | 2 | 1 | L | 4 |
| 83 | Set a tight CSP specifically for `landing.html` — it has the fewest third-party dependencies and should be the most restricted page | landing.html | 4 | 2 | M | 2 |
| 84 | Set a tight CSP specifically for `start.html` — wizard has no embeds, so `frame-src` can be `'none'` | start.html | 4 | 2 | M | 2 |
| 85 | Set a permissive `frame-src` only for `able-v8.html` and `admin.html` — these are the only pages with oEmbed iframes | able-v8.html | 4 | 2 | M | 2 |
| 86 | Run a CSP audit using the browser's CSP evaluator extension after deployment to verify no `'unsafe-eval'` or `'unsafe-inline'` remains in `script-src` | all pages | 5 | 2 | H | 2 |
| 87 | Use the Google CSP Evaluator tool (`csp-evaluator.withgoogle.com`) to score the final policy | netlify.toml | 4 | 1 | M | 2 |
| 88 | Verify that the `netlify.toml` header syntax is correct — Netlify uses TOML inline table syntax for header values; a syntax error silently drops all headers | netlify.toml | 5 | 1 | H | 1 |
| 89 | Confirm that `netlify.toml` `[[headers]]` blocks are applied in order — more specific paths (`/admin.html`) should appear after the wildcard (`/*`) | netlify.toml | 3 | 1 | M | 2 |
| 90 | After CSP is live, verify it does not break the Supabase magic-link auth flow — the redirect from `supabase.co` to `/auth/callback` must be covered by `connect-src` and `navigate-to` | netlify.toml | 5 | 2 | H | 1 |
| 91 | Verify that `form-action 'self'` does not break any form that posts to a Netlify function path — `/.netlify/functions/` is same-origin, so it should be permitted | netlify.toml | 4 | 1 | M | 1 |
| 92 | Test the CSP on iOS Safari 17 — Safari's CSP support has historically lagged Chrome; verify `frame-src` and `worker-src` work correctly | all pages | 4 | 2 | M | 2 |
| 93 | Add the final CSP enforcement date to `docs/STATUS.md` | docs/STATUS.md | 2 | 1 | L | 4 |
| 94 | Review whether `Content-Security-Policy-Report-Only` should be kept permanently in staging alongside enforcement in production | netlify.toml | 3 | 2 | M | 3 |
| 95 | Confirm that the existing `Permissions-Policy` disabling `geolocation=()` is intentional given that `fan.html` uses `navigator.geolocation` — the policy controls what origins can request, not same-origin JS | netlify.toml | 4 | 1 | M | 1 |
| 96 | Correct `Permissions-Policy: geolocation=()` if `fan.html` needs geolocation — change to `geolocation=(self)` | netlify.toml | 4 | 1 | M | 1 |
| 97 | Add `Cross-Origin-Opener-Policy: same-origin-allow-popups` — needed if any OAuth popup flows are added (e.g. Spotify auth) | netlify.toml | 3 | 1 | M | 3 |
| 98 | Add `Cross-Origin-Resource-Policy: same-origin` for HTML files — prevents cross-origin reads of page content | netlify.toml | 3 | 1 | M | 3 |
| 99 | Schedule a quarterly CSP review to add new CDN sources as features expand — CSP drift is common as products grow | docs/ | 2 | 1 | L | 5 |
| 100 | Write a final CSP verification step into the launch checklist in `docs/audit/100-DIMENSIONS.md` Phase 10 — dimension J5 (Netlify deployment) must verify CSP headers are live | docs/audit/100-DIMENSIONS.md | 3 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical setup — add CSP header, audit `unsafe-inline`/`unsafe-eval` dependencies, set base directives | 1–11, 13, 15, 17–19, 23–29, 33–36, 38, 40, 49–52, 60, 62, 64–65, 70–71, 88, 90–91, 95–96 |
| 2 | Testing and SRI — test CSP against all live features, add Subresource Integrity hashes | 12, 47–48, 54–57, 66–70, 72–74, 78, 80, 83–87, 92 |
| 3 | Hardening — CSP reporting endpoint, tighten per-page policies, review third-party scripts | 37, 39, 41–42, 44, 58–59, 61, 75–76, 79, 94 |
| 4 | Housekeeping — remove deprecated headers, document policy, add to STATUS.md | 43–46, 81–82, 93, 99–100 |
| 5 | Future — Trusted Types API | 77 |
