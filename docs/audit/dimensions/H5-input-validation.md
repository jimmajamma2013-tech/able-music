# Dimension H5 — Input Validation
**Category:** Security, Data & Performance
**Phase:** 8

All Netlify function inputs must be validated server-side before any processing. Client-side validation is UX; server-side validation is security. The `fan-confirmation.js` function currently validates `fanEmail` with `includes('@')` (insufficient), requires `artistName` (good), and accepts `artistSlug`, `campaignState`, `accentHex`, and `releaseTitle` without length or format constraints. The CORS headers across all functions use `Access-Control-Allow-Origin: *`, which means any origin can POST. Rate limiting is absent across all functions.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Upgrade `fanEmail` validation in `fan-confirmation.js` from `includes('@')` to RFC-compliant regex: `/^[^\s@]{1,64}@[^\s@]{1,255}$/` | netlify/functions/fan-confirmation.js | 5 | 1 | H | 1 |
| 2 | Add maximum length check for `fanEmail`: reject if longer than 254 characters (RFC 5321 maximum) | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 3 | Add minimum length check for `fanEmail`: reject if shorter than 6 characters (`a@b.co`) | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 4 | Add a check that `fanEmail` does not contain control characters, newlines, or null bytes | netlify/functions/fan-confirmation.js | 4 | 1 | H | 1 |
| 5 | Add maximum length check for `artistName` in `fan-confirmation.js`: reject if longer than 100 characters | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 6 | Add minimum length check for `artistName`: reject if empty string after trim | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 7 | Trim whitespace from `artistName` before using in email body and subject | netlify/functions/fan-confirmation.js | 3 | 1 | L | 1 |
| 8 | Add validation for `artistSlug` in `fan-confirmation.js`: must match `/^[a-z0-9-]{1,60}$/` if provided, or be empty | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 9 | Add validation for `accentHex` in `fan-confirmation.js`: must match `/^#[0-9a-fA-F]{6}$/` if provided, or fall back to default | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 10 | Add validation for `campaignState` in `fan-confirmation.js`: must be one of `['profile', 'pre-release', 'live', 'gig']`, else default to `'profile'` | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 11 | Add maximum length check for `releaseTitle` in `fan-confirmation.js`: reject if longer than 200 characters | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 12 | Add a type check for all `fan-confirmation.js` inputs — reject if `fanEmail` is not a string (could be array or object from a crafted POST body) | netlify/functions/fan-confirmation.js | 4 | 1 | H | 1 |
| 13 | Add a type check: `artistName` must be a string | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 14 | Add a type check: `artistSlug` must be a string if provided | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 15 | Add a type check: `accentHex` must be a string if provided | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 16 | Add a type check: `campaignState` must be a string if provided | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 17 | Add a type check: `releaseTitle` must be a string or null if provided | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 18 | Verify the `JSON.parse(event.body || '{}')` in `fan-confirmation.js` handles `null` body correctly — `event.body` can be `null` for requests with no body; `null || '{}'` evaluates to `'{}'` which is safe | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 19 | Verify the try/catch around `JSON.parse` in `fan-confirmation.js` returns 400 for malformed JSON — confirmed present | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 20 | Audit `oembed-proxy.js` input validation — the `url` parameter is validated by `isSafeMediaUrl()` which checks hostname and HTTPS protocol; this is sufficient for SSRF but not for type safety | netlify/functions/oembed-proxy.js | 4 | 1 | M | 1 |
| 21 | Add a type check for the `url` parameter in `oembed-proxy.js`: must be a string | netlify/functions/oembed-proxy.js | 3 | 1 | M | 1 |
| 22 | Add a maximum length check for the `url` parameter in `oembed-proxy.js`: reject if longer than 2048 characters | netlify/functions/oembed-proxy.js | 3 | 1 | M | 1 |
| 23 | Audit `spotify-import.js` input validation — the `url` query parameter is validated by `extractSpotifyArtistId()` which uses a strict regex | netlify/functions/spotify-import.js | 4 | 1 | M | 1 |
| 24 | Add a maximum length check for the `url` parameter in `spotify-import.js`: reject if longer than 500 characters | netlify/functions/spotify-import.js | 3 | 1 | M | 1 |
| 25 | Audit `ai-copy.js` input validation — list every field it accepts and verify each has type, length, and format validation | netlify/functions/ai-copy.js | 5 | 2 | H | 1 |
| 26 | Audit `linktree-import.js` input validation — list every field it accepts and verify each has validation | netlify/functions/linktree-import.js | 5 | 2 | H | 1 |
| 27 | Audit `artist-welcome.js` input validation — confirm all fields are validated | netlify/functions/artist-welcome.js | 4 | 2 | H | 1 |
| 28 | Audit `ticketmaster-import.js` input validation — confirm query parameters are validated | netlify/functions/ticketmaster-import.js | 4 | 1 | M | 1 |
| 29 | Confirm all functions check `event.httpMethod` and reject non-POST/GET calls — `fan-confirmation.js` returns 405 for non-POST; verify other functions do the same | netlify/functions/ | 4 | 1 | M | 1 |
| 30 | Confirm all functions handle `event.body === null` gracefully | netlify/functions/ | 4 | 1 | M | 1 |
| 31 | Assess the `CORS_HEADERS: 'Access-Control-Allow-Origin': '*'` setting across all functions — for functions that accept user data, `*` allows any website to POST; consider restricting to `https://ablemusic.co` | netlify/functions/ | 4 | 2 | M | 1 |
| 32 | Implement `Origin` header validation in `fan-confirmation.js` — check `event.headers.origin` matches `https://ablemusic.co` or `https://*.netlify.app` | netlify/functions/fan-confirmation.js | 4 | 2 | M | 2 |
| 33 | Implement `Origin` header validation in `ai-copy.js` — only the admin panel should call this | netlify/functions/ai-copy.js | 4 | 2 | M | 2 |
| 34 | Consider whether `oembed-proxy.js` and `spotify-import.js` should be restricted to origin `https://ablemusic.co` — they are called from the admin panel | netlify/functions/ | 3 | 2 | M | 2 |
| 35 | Add rate limiting to `fan-confirmation.js` — without rate limiting, an attacker can flood a fan's inbox with confirmation emails | netlify/functions/fan-confirmation.js | 5 | 4 | H | 1 |
| 36 | Implement simple IP-based rate limiting using Netlify Edge Functions as middleware for `fan-confirmation.js` | netlify/functions/fan-confirmation.js | 4 | 4 | M | 2 |
| 37 | Alternatively, use Supabase to track fan sign-up attempts per artist per hour and reject above a threshold | netlify/functions/fan-confirmation.js | 3 | 4 | M | 3 |
| 38 | Add rate limiting to `ai-copy.js` — AI API calls have real monetary cost | netlify/functions/ai-copy.js | 5 | 3 | H | 1 |
| 39 | Add rate limiting to `spotify-import.js` — Spotify API rate limits are shared across all callers | netlify/functions/spotify-import.js | 4 | 3 | M | 2 |
| 40 | Add rate limiting to `oembed-proxy.js` — prevents abuse of the proxy for scanning external hosts | netlify/functions/oembed-proxy.js | 4 | 3 | M | 2 |
| 41 | Verify that `Content-Type: application/json` is required on POST bodies — `fan-confirmation.js` uses `JSON.parse(event.body)` regardless of content type; add a check for `Content-Type: application/json` header | netlify/functions/fan-confirmation.js | 3 | 1 | M | 2 |
| 42 | Consider adding a maximum request body size check — Netlify has a 6MB function payload limit but an explicit check at 10KB for `fan-confirmation.js` prevents abuse | netlify/functions/fan-confirmation.js | 3 | 2 | M | 2 |
| 43 | Define a shared validation utility module for Netlify functions — create `netlify/functions/_validate.js` with reusable validators (email, hex colour, slug, string length) | netlify/functions/ | 4 | 3 | M | 2 |
| 44 | Import the shared validation utility in `fan-confirmation.js` once created — reduces code duplication | netlify/functions/fan-confirmation.js | 3 | 1 | M | 3 |
| 45 | Import the shared validation utility in all other Netlify functions — consistent validation across all endpoints | netlify/functions/ | 3 | 2 | M | 3 |
| 46 | Add client-side validation in `able-v8.html` for the fan email capture form — email format, max length — to reduce server round-trips | able-v8.html | 4 | 2 | M | 2 |
| 47 | Add client-side validation for CTA URLs in `admin.html` — must start with `https://` or be a relative path | admin.html | 4 | 2 | M | 2 |
| 48 | Add client-side validation for show date in `admin.html` — must be a valid date string | admin.html | 3 | 1 | M | 2 |
| 49 | Add client-side validation for accent colour in `admin.html` colour picker — must be a valid 6-digit hex | admin.html | 4 | 1 | M | 2 |
| 50 | Add client-side validation for bio length in `admin.html` and `start.html` — enforce the 280-character limit that `spotify-import.js` applies | admin.html | 3 | 1 | L | 2 |
| 51 | Add server-side validation of artist name length in any function that accepts it — max 100 characters | netlify/functions/ | 4 | 1 | M | 1 |
| 52 | Verify that `artist-welcome.js` validates the email address it sends to | netlify/functions/artist-welcome.js | 4 | 1 | H | 1 |
| 53 | Verify that `artist-welcome.js` validates the artist name length | netlify/functions/artist-welcome.js | 3 | 1 | M | 1 |
| 54 | Verify that `linktree-import.js` validates the Linktree username or URL format before making any fetch | netlify/functions/linktree-import.js | 5 | 1 | H | 1 |
| 55 | Verify that `ai-copy.js` enforces a maximum token/character budget on input fields before sending to the AI API | netlify/functions/ai-copy.js | 4 | 2 | H | 1 |
| 56 | Add an allowlist of permitted `Content-Type` values for POST requests — reject `multipart/form-data` to prevent unexpected parsing | netlify/functions/ | 3 | 1 | M | 2 |
| 57 | Verify that function input validation errors return JSON, not HTML — Netlify's default error pages are HTML; the functions must catch all errors and return `json(400, { error: '...' })` | netlify/functions/ | 3 | 1 | M | 1 |
| 58 | Add a descriptive error message for each validation failure — the error must tell the caller what was wrong without exposing internal logic | netlify/functions/ | 3 | 1 | M | 2 |
| 59 | Verify that validation error messages do not echo back the invalid input — echoing untrusted input in error messages is a potential XSS vector in JSON APIs consumed by other services | netlify/functions/ | 4 | 1 | M | 1 |
| 60 | Consider returning generic error messages for security-sensitive fields (e.g. "Invalid email" not "Email must be under 254 characters and match RFC 5321") — avoid giving attackers information about bypass strategies | netlify/functions/fan-confirmation.js | 3 | 1 | L | 3 |
| 61 | Add input validation for the `ticketmaster-import.js` artist name parameter — must be a string, max 200 characters | netlify/functions/ticketmaster-import.js | 3 | 1 | M | 1 |
| 62 | Add input validation for the `ticketmaster-import.js` country code parameter — must be a 2-letter ISO code if provided | netlify/functions/ticketmaster-import.js | 3 | 1 | M | 1 |
| 63 | Verify that the `oembed-proxy.js` correctly rejects empty `url` parameters with a 400 response — confirmed: `if (!rawUrl) return json(400, { error: 'url param required' })` | netlify/functions/oembed-proxy.js | 3 | 1 | M | 1 |
| 64 | Verify that the `spotify-import.js` correctly rejects missing `url` parameters with a 400 response — confirmed: `if (!url) return json(400, { error: 'url param required' })` | netlify/functions/spotify-import.js | 3 | 1 | M | 1 |
| 65 | Add schema documentation to each Netlify function JSDoc comment specifying every input field, its type, required/optional, min/max length, and format constraints | netlify/functions/ | 3 | 2 | L | 3 |
| 66 | Consider adding a JSON Schema validation library (`ajv`) — since this is a no-build project, inject it via CDN into functions only (Netlify functions can require npm packages) | netlify/functions/ | 3 | 4 | M | 4 |
| 67 | Alternatively, keep validation as hand-written code and ensure all validation logic is covered by tests — simpler for a no-build project | netlify/functions/ | 4 | 2 | M | 2 |
| 68 | Write unit tests for `fan-confirmation.js` input validation — test each field with valid, invalid, missing, and edge-case values | netlify/functions/fan-confirmation.js | 5 | 3 | M | 2 |
| 69 | Write unit tests for `oembed-proxy.js` URL validation | netlify/functions/oembed-proxy.js | 4 | 3 | M | 2 |
| 70 | Write unit tests for `spotify-import.js` artist ID extraction | netlify/functions/spotify-import.js | 4 | 2 | M | 2 |
| 71 | Add tests for the `getLuminance()` function in `fan-confirmation.js` — verify it handles malformed hex values gracefully | netlify/functions/fan-confirmation.js | 2 | 2 | L | 3 |
| 72 | Verify that `getLuminance()` handles a short hex value (e.g. `#fff`) without returning `NaN` — currently `parseInt(c.slice(0,2))` on a 3-char string without `#` would be `parseInt('ff')` which is fine, but `#fff` after `replace('#','')` gives `fff` — `parseInt('ff')=255`, `parseInt('ff')=255`, `parseInt('')=NaN` — this is a bug | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 73 | Fix `getLuminance()` to handle 3-digit hex colour shorthand (`#rgb`) by expanding to `#rrggbb` before parsing | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 74 | Verify `getLuminance()` handles an invalid hex string (e.g. `#xyz`) — `parseInt` returns `NaN`, luminance becomes `NaN`, comparison `NaN > 0.4` is `false`, so text defaults to white — this is safe but silently wrong | netlify/functions/fan-confirmation.js | 3 | 1 | M | 2 |
| 75 | Add a fallback in `getLuminance()` for `NaN` results — return `0` (dark, use white text) as the safe default | netlify/functions/fan-confirmation.js | 3 | 1 | M | 2 |
| 76 | Validate that `accentHex` passes the 6-digit hex check before it reaches `getLuminance()` — this prevents the silent `NaN` path | netlify/functions/fan-confirmation.js | 4 | 1 | M | 1 |
| 77 | Add integration tests for the complete `fan-confirmation.js` flow with valid inputs — assert 200 response, `sent: true` | netlify/functions/fan-confirmation.js | 4 | 3 | M | 2 |
| 78 | Add integration tests for the complete `fan-confirmation.js` flow with each invalid input — assert 400 response for each | netlify/functions/fan-confirmation.js | 5 | 3 | H | 2 |
| 79 | Document the validation policy in `CLAUDE.md`: "All Netlify function inputs require server-side type, length, and format validation before processing" | CLAUDE.md | 3 | 1 | L | 3 |
| 80 | Create a validation test script at `netlify/functions/test/validate.test.js` (runnable with Node.js, no test framework required) | netlify/functions/ | 4 | 3 | M | 2 |
| 81 | Ensure the validation logic is synchronous and runs before any async operations — fail fast on invalid input | netlify/functions/ | 4 | 1 | M | 1 |
| 82 | Verify that destructured variables from the parsed body default to `undefined`, not throwing — confirmed: JS destructuring returns `undefined` for missing keys | netlify/functions/fan-confirmation.js | 3 | 1 | L | 2 |
| 83 | Add a check for unexpected fields in the request body — log a warning if fields outside the expected schema are sent (helps detect probing) | netlify/functions/fan-confirmation.js | 2 | 2 | L | 4 |
| 84 | Consider returning a 422 (Unprocessable Entity) status code for validation errors instead of 400 (Bad Request) — 422 is more semantically correct for validation failures | netlify/functions/ | 2 | 1 | L | 4 |
| 85 | Confirm that the `fan-confirmation.js` returns 400 (not 500) for all validation failures — a 500 response for a validation error leaks that the server had an exception | netlify/functions/fan-confirmation.js | 3 | 1 | M | 1 |
| 86 | Add a health check endpoint (`netlify/functions/health.js`) that returns 200 with build metadata — useful for monitoring without exposing internals | netlify/functions/ | 2 | 2 | L | 4 |
| 87 | Verify that the `artist-welcome.js` function validates that the artist completing onboarding is authenticated — it should check for a valid Supabase auth token in the request header | netlify/functions/artist-welcome.js | 5 | 2 | H | 1 |
| 88 | Add Supabase JWT verification to any Netlify function that performs privileged operations — parse the `Authorization: Bearer <token>` header and verify it with the Supabase JWT secret | netlify/functions/ | 5 | 3 | H | 1 |
| 89 | Note: `fan-confirmation.js` is called by unauthenticated fans and should NOT require auth — this is correct and intentional | netlify/functions/fan-confirmation.js | 3 | 1 | L | 2 |
| 90 | Note: `oembed-proxy.js` and `spotify-import.js` are called by authenticated artists from the admin panel — consider requiring a Supabase auth token | netlify/functions/ | 4 | 2 | M | 2 |
| 91 | Create a validation checklist for new Netlify functions — before deploying any new function, verify: types checked, lengths bounded, formats validated, auth checked where required | netlify/functions/ | 4 | 2 | M | 2 |
| 92 | Add input validation for all form fields in `start.html` — wizard inputs are stored in localStorage and later sent to Netlify functions; validate at submission time | start.html | 4 | 2 | M | 2 |
| 93 | Add input validation for all form fields in `admin.html` — profile saves, CTA additions, show additions | admin.html | 4 | 2 | M | 2 |
| 94 | Verify that the `start.html` wizard does not allow an artist to submit step 2 (vibe selection) with an invalid vibe ID — the vibe must match the allowed enum | start.html | 3 | 1 | M | 2 |
| 95 | Verify that the `admin.html` CTA URL field validates the URL before saving — prevent non-URL strings from being stored as CTA URLs | admin.html | 4 | 1 | M | 1 |
| 96 | Verify that the `admin.html` show ticket URL field validates the URL before saving | admin.html | 3 | 1 | M | 1 |
| 97 | Add a maximum fan sign-up count per artist per day at the Supabase RLS level — an INSERT policy that counts existing rows and rejects above a threshold | Supabase dashboard | 4 | 3 | M | 3 |
| 98 | Consider adding honeypot fields to the fan sign-up form to catch bot submissions — a hidden input that should always be empty | able-v8.html | 3 | 2 | L | 3 |
| 99 | Add a `__version` field to the request body of `fan-confirmation.js` — allows future backward-compatible schema changes | netlify/functions/fan-confirmation.js | 2 | 1 | L | 5 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once all validation tests pass and the shared validation utility exists | docs/STATUS.md | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — email validation upgrade, type checks, all function audits, auth on privileged functions | 1–19, 25–30, 35, 38, 51–55, 57, 59, 72–76, 81–82, 85, 87–88 |
| 2 | Testing and CORS — integration tests, origin validation, rate limiting | 20–24, 31–34, 36, 39–47, 50, 56, 58, 67–70, 77–78, 80, 90–96 |
| 3 | Shared utility and documentation | 43–45, 60, 65, 79, 84, 91, 97–98 |
| 4 | Nice-to-have — JSON Schema, health check, version field | 66, 83–84, 86, 99–100 |
| 5 | Future improvements | 99 |
