# Dimension H4 — oEmbed SSRF Protection
**Category:** Security, Data & Performance
**Phase:** 8 (Security)
**Status:** Not started

The `oembed-proxy.js` Netlify function accepts a user-supplied media URL and makes a server-side outbound request to an oEmbed provider. Without strict URL validation, an attacker could supply an internal IP address or cloud metadata endpoint, causing the server to leak internal data — a classic Server-Side Request Forgery attack. Full compliance means the function validates every incoming URL against a strict hostname allowlist of known streaming platforms before making any outbound request, rejects non-HTTPS protocols, enforces timeouts and response size limits, sanitises the returned `html` field before passing it to the client, and has no code path that fetches an arbitrary user-supplied URL.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Confirm `oembed-proxy.js` calls `isSafeMediaUrl()` before every outbound `fetch()` with no bypass path | NET | 5 | 1 | H | 1 |
| 2 | Confirm `isSafeMediaUrl()` checks `parsed.protocol === 'https:'` and rejects anything else | NET | 5 | 1 | H | 1 |
| 3 | Confirm the `OEMBED_ENDPOINTS` allowlist is a `Set` of exact hostname strings with no wildcards | NET | 5 | 1 | H | 1 |
| 4 | Verify `www.youtube.com`, `youtu.be`, `m.youtube.com` are all in the allowlist | NET | 4 | 1 | H | 1 |
| 5 | Verify `open.spotify.com`, `spotify.com` are in the allowlist | NET | 4 | 1 | H | 1 |
| 6 | Verify `soundcloud.com`, `m.soundcloud.com` are in the allowlist | NET | 4 | 1 | H | 1 |
| 7 | Verify `vimeo.com`, `player.vimeo.com` are in the allowlist | NET | 4 | 1 | H | 1 |
| 8 | Verify `www.mixcloud.com`, `mixcloud.com` are in the allowlist | NET | 3 | 1 | M | 1 |
| 9 | Test `isSafeMediaUrl('http://localhost')` returns false — HTTP is blocked by protocol check | NET | 5 | 2 | H | 1 |
| 10 | Test `isSafeMediaUrl('http://169.254.169.254')` returns false — AWS metadata endpoint | NET | 5 | 2 | H | 1 |
| 11 | Test `isSafeMediaUrl('https://169.254.169.254/latest/meta-data/')` returns false — hostname not in allowlist | NET | 5 | 2 | H | 1 |
| 12 | Test `isSafeMediaUrl('https://192.168.1.1')` returns false — private IP not in allowlist | NET | 5 | 2 | H | 1 |
| 13 | Test `isSafeMediaUrl('javascript:alert(1)')` returns false — non-HTTPS protocol | NET | 5 | 2 | H | 1 |
| 14 | Test `isSafeMediaUrl('data:text/html,<script>alert(1)</script>')` returns false | NET | 5 | 2 | H | 1 |
| 15 | Test `isSafeMediaUrl('https://evil.com@open.spotify.com/track/123')` — `new URL()` parses hostname as `open.spotify.com`; verify behaviour is safe | NET | 5 | 2 | H | 1 |
| 16 | Test `isSafeMediaUrl('https://open.spotify.com.evil.com/track/123')` — hostname is `open.spotify.com.evil.com`, must return false | NET | 5 | 2 | H | 1 |
| 17 | Confirm `new URL(urlString)` throws for malformed inputs and the catch block returns `false` | NET | 4 | 1 | M | 1 |
| 18 | Confirm `decodeURIComponent(rawUrl)` is called before `isSafeMediaUrl()` to prevent URL-encoding bypasses | NET | 5 | 1 | H | 1 |
| 19 | Test with double-encoded URL `https%3A%2F%2Fopen.spotify.com%2Ftrack%2F123` — single decode produces safe URL; verify correct handling | NET | 4 | 2 | M | 1 |
| 20 | Test with `https%3A%2F%2F169.254.169.254` — after decode yields HTTPS metadata URL; must be blocked by hostname check | NET | 5 | 2 | H | 1 |
| 21 | Add an `AbortController` timeout of 5 seconds to the outbound `fetch()` in `oembed-proxy.js` | NET | 4 | 2 | M | 1 |
| 22 | Distinguish `AbortError` (timeout) from network errors in the catch block and return 504 vs 502 appropriately | NET | 3 | 2 | M | 2 |
| 23 | Add a maximum response body size limit — abort the read after 64KB for oEmbed responses | NET | 4 | 3 | M | 2 |
| 24 | Implement response size limit using a streaming reader with a counter rather than buffering the full body | NET | 3 | 3 | M | 3 |
| 25 | Verify error handling when provider returns non-200 status — function must return `{ error: 'Provider returned N' }` with the provider's status code, not pass it silently | NET | 3 | 1 | L | 2 |
| 26 | Verify error handling when provider returns non-JSON body — `res.json()` throws; outer `try/catch` must return 502 | NET | 4 | 1 | M | 1 |
| 27 | Sanitise the oEmbed `html` field server-side in `oembed-proxy.js` — strip all tags except `<iframe>` before returning to the client | NET | 5 | 3 | H | 1 |
| 28 | If returning a raw `html` field from the provider, strip `<script>`, `<link>`, `<style>`, and event-handler attributes from it | NET | 5 | 3 | H | 1 |
| 29 | Consider constructing a safe `<iframe>` server-side from known embed URL patterns rather than trusting the provider's `html` field at all | NET | 5 | 4 | H | 2 |
| 30 | Ensure the frontend uses `innerHTML` only with the sanitised `html` field, or preferably sets `src` on a pre-existing `<iframe>` element | ADM | 5 | 2 | H | 1 |
| 31 | Set `redirect: 'error'` on the outbound `fetch()` to prevent SSRF via open-redirect from an allowlisted host | NET | 4 | 1 | M | 2 |
| 32 | Alternatively, document the explicit choice of `redirect: 'follow'` with rationale if open redirects on oEmbed providers are not a concern | NET | 2 | 1 | L | 4 |
| 33 | Verify `Content-Type: application/json` is returned even when proxying a provider that returns something unexpected | NET | 3 | 1 | M | 2 |
| 34 | Verify `res.json()` properly parses the provider response; if the provider returns HTML (error page), `res.json()` throws and returns 502, not the raw HTML | NET | 4 | 1 | M | 1 |
| 35 | Restrict CORS on `oembed-proxy.js` from `Access-Control-Allow-Origin: *` to `https://ablemusic.co` | NET | 4 | 1 | M | 2 |
| 36 | Restrict CORS on `fan-confirmation.js` from `*` to `https://ablemusic.co` | NET | 4 | 1 | M | 2 |
| 37 | Restrict CORS on `spotify-import.js` from `*` to `https://ablemusic.co` | NET | 4 | 1 | M | 2 |
| 38 | Allow the Netlify deploy preview origin alongside production in CORS for all functions during development | NET | 3 | 1 | L | 3 |
| 39 | Verify `spotify-import.js` SSRF surface is limited — it only constructs Spotify API URLs from a validated base62 artist ID | NET | 4 | 1 | M | 1 |
| 40 | Verify `extractSpotifyArtistId()` regex `/[A-Za-z0-9]+/` matches only base62 characters | NET | 4 | 1 | M | 1 |
| 41 | Verify the extracted artist ID is interpolated into a hardcoded Spotify API URL template with no other user-supplied path segments | NET | 4 | 1 | M | 1 |
| 42 | Verify `artistName` passed to `lastfmFetch()` is URL-encoded via `encodeURIComponent()` before interpolation | NET | 4 | 1 | M | 1 |
| 43 | Verify `artistName` passed to `ticketmasterFetch()` is also URL-encoded before interpolation | NET | 4 | 1 | M | 1 |
| 44 | Add a 5-second `AbortController` timeout to the Spotify token fetch in `getSpotifyToken()` | NET | 4 | 2 | M | 1 |
| 45 | Add a 5-second `AbortController` timeout to the `spotifyFetch()` call inside `spotify-import.js` | NET | 4 | 2 | M | 1 |
| 46 | Add a 5-second timeout to `lastfmFetch()` in `spotify-import.js` | NET | 3 | 2 | M | 2 |
| 47 | Add a 5-second timeout to `ticketmasterFetch()` in `spotify-import.js` | NET | 3 | 2 | M | 2 |
| 48 | Audit `linktree-import.js` — if it fetches a user-supplied URL server-side, it needs the same `isSafeMediaUrl()` allowlist validation | NET | 5 | 2 | H | 1 |
| 49 | Verify `linktree-import.js` does not make DNS lookups to user-supplied hostnames | NET | 5 | 1 | H | 1 |
| 50 | If `linktree-import.js` calls the Linktree API, confirm the API URL is hardcoded and not constructed from user input | NET | 4 | 1 | H | 1 |
| 51 | Audit `artist-welcome.js` — verify it makes no outbound requests to user-supplied URLs | NET | 4 | 1 | M | 1 |
| 52 | Audit `ai-copy.js` — verify the AI API URL is hardcoded and not constructed from user input | NET | 4 | 1 | M | 1 |
| 53 | Audit `ai-copy.js` for prompt injection — artist bio or track names sent to an AI API must be bounded in length and system-prompted to constrain output | NET | 4 | 2 | M | 1 |
| 54 | Add a maximum character length (500 chars) for artist-supplied inputs to `ai-copy.js` before they are sent to the AI API | NET | 4 | 1 | M | 1 |
| 55 | Upgrade email validation in `fan-confirmation.js` from `includes('@')` to a proper regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | NET | 4 | 1 | H | 1 |
| 56 | Add a maximum length check of 254 characters for `fanEmail` in `fan-confirmation.js` (RFC 5321) | NET | 3 | 1 | M | 1 |
| 57 | Add a check that `fanEmail` contains no commas or semicolons to prevent multiple-recipient injection | NET | 4 | 1 | M | 1 |
| 58 | Strip newline characters from `artistName` before using it in the email `subject` or `from` display name | NET | 4 | 1 | M | 1 |
| 59 | Validate `accentHex` against the pattern `#[0-9a-fA-F]{6}` and fall back to `#f4b942` if it does not match | NET | 4 | 1 | H | 1 |
| 60 | Validate `artistSlug` against `[a-z0-9-]+` before interpolating into the profile URL in the email template | NET | 4 | 1 | H | 1 |
| 61 | Confirm the `esc()` function in `fan-confirmation.js` HTML-encodes `&`, `<`, `>`, `"`, and `'` | NET | 5 | 1 | H | 1 |
| 62 | Confirm `esc()` is called on every user-supplied value that appears in the email HTML body | NET | 5 | 1 | H | 1 |
| 63 | Verify the Resend API call URL is hardcoded as `https://api.resend.com/emails` and not constructed from any external input | NET | 4 | 1 | L | 1 |
| 64 | Verify the `to` field in the Resend payload is always an array with exactly one element | NET | 4 | 1 | M | 1 |
| 65 | Consider removing the POST method support from `oembed-proxy.js` — GET is sufficient and reduces attack surface | NET | 3 | 1 | M | 3 |
| 66 | If POST is kept in `oembed-proxy.js`, confirm `JSON.parse(event.body || '{}')` is wrapped in `try/catch` | NET | 4 | 1 | M | 1 |
| 67 | Verify both GET and POST paths in `oembed-proxy.js` apply the same `isSafeMediaUrl()` validation | NET | 4 | 1 | M | 1 |
| 68 | Add rate limiting to `oembed-proxy.js` — it makes outbound requests and could amplify traffic against oEmbed providers | NET | 4 | 3 | M | 2 |
| 69 | Add rate limiting to `spotify-import.js` — repeated calls exhaust the Spotify API rate limit | NET | 4 | 3 | M | 2 |
| 70 | Consider adding a Netlify Edge Function rate limiter in front of all `/.netlify/functions/*` routes | NET | 4 | 4 | M | 3 |
| 71 | Add a security test: call `oembed-proxy.js` with `url=https://example.com` (valid HTTPS, not in allowlist) and assert 400 | NET | 5 | 2 | H | 1 |
| 72 | Add a security test: call `oembed-proxy.js` with `url=http://open.spotify.com/track/123` (HTTP not HTTPS) and assert 400 | NET | 5 | 2 | H | 1 |
| 73 | Add a security test: call `fan-confirmation.js` with `fanEmail=notanemail` and assert 400 | NET | 4 | 2 | H | 1 |
| 74 | Add a security test: call `oembed-proxy.js` with the 20 most common SSRF bypass patterns and assert all return 400 | NET | 5 | 4 | H | 2 |
| 75 | Add a security test: call `fan-confirmation.js` with an artist name containing `\n`, `\r`, and `CC:` and assert no email injection occurs | NET | 4 | 3 | H | 2 |
| 76 | Add the `User-Agent: ABLE/1.0 (ablemusic.co)` header on all outbound `fetch()` calls in `oembed-proxy.js` — already confirmed present; verify it is consistent | NET | 2 | 1 | L | 3 |
| 77 | Add the same `User-Agent` to `spotify-import.js` outbound calls where permitted | NET | 2 | 1 | L | 4 |
| 78 | Verify Netlify function logs do not output the full raw URL being proxied — log only the hostname for debugging | NET | 3 | 1 | M | 2 |
| 79 | Verify Netlify function logs are not publicly accessible — only visible to authenticated Netlify project members | NET | 3 | 1 | M | 2 |
| 80 | Verify no Netlify function calls `console.log(process.env)` — this would expose all environment variable secrets in logs | NET | 5 | 1 | H | 1 |
| 81 | Consider caching `oembed-proxy.js` responses for the same URL in a short-lived Supabase table row — reduces outbound requests | NET | 3 | 4 | L | 4 |
| 82 | Consider caching `spotify-import.js` results for the same artist ID for up to 1 hour | NET | 3 | 4 | L | 4 |
| 83 | Add Apple Music oEmbed endpoint to `OEMBED_ENDPOINTS` when Apple Music integration is built: `music.apple.com` | NET | 3 | 1 | L | 3 |
| 84 | Add Bandcamp oEmbed endpoint when Bandcamp integration is built: `bandcamp.com` | NET | 3 | 1 | L | 4 |
| 85 | Add Tidal oEmbed endpoint when Tidal integration is built | NET | 2 | 1 | L | 5 |
| 86 | Add each new oEmbed hostname to the `frame-src` CSP directive in `netlify.toml` at the same time as adding it to the allowlist | NET | 4 | 1 | M | 3 |
| 87 | Add a JSDoc comment to `isSafeMediaUrl()` explaining the SSRF threat model and why the allowlist approach is used | NET | 3 | 2 | L | 3 |
| 88 | Add a JSDoc comment to each Netlify function's main handler documenting its SSRF mitigations | NET | 3 | 2 | L | 4 |
| 89 | Confirm `oembed-proxy.js` `try/catch` logs errors via `console.error` — confirmed: `console.error('oembed-proxy error:', e.message)` | NET | 2 | 1 | L | 3 |
| 90 | Verify Netlify function error responses include no internal stack traces in the JSON body | NET | 3 | 1 | M | 2 |
| 91 | Verify all Netlify functions return `Content-Type: application/json` in their response headers | NET | 3 | 1 | M | 2 |
| 92 | Verify `oembed-proxy.js` does not pass through any response headers from the oEmbed provider to the client | NET | 3 | 1 | M | 2 |
| 93 | Verify that the `ticketmaster-import.js` function only constructs URLs from the Ticketmaster API domain and a validated keyword | NET | 4 | 1 | H | 1 |
| 94 | Assess whether any Netlify function should require an `X-ABLE-Key` shared secret header to prevent abuse from outside the ABLE frontend | NET | 4 | 3 | M | 2 |
| 95 | Document the SSRF mitigation approach and allowlist update procedure in `docs/systems/seo-og/SPEC.md` or a dedicated security doc | NET | 3 | 2 | L | 4 |
| 96 | Add a path traversal test: call `oembed-proxy.js` with `https://open.spotify.com/../../../etc/passwd` and verify the provider either 404s or the SSRF protection limits the damage | NET | 3 | 2 | M | 2 |
| 97 | Review whether Netlify's built-in DDoS protection is sufficient for the `oembed-proxy.js` endpoint or whether additional rate limiting is needed | NET | 3 | 2 | M | 3 |
| 98 | Add this dimension's passing status to the launch checklist in `docs/STATUS.md` | NET | 2 | 1 | L | 4 |
| 99 | Mark all SSRF bypass tests as passing in the QA log before launch | NET | 4 | 2 | M | 2 |
| 100 | Schedule a review of the oEmbed allowlist whenever a new streaming platform integration is added to ensure the new hostname is added in both the function and CSP | NET | 3 | 1 | L | 5 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — allowlist verification, SSRF bypass tests, HTML sanitisation, email validation, timeout | 1–20, 21, 27–30, 34, 39–43, 48–53, 55–67, 71–73, 80, 93 |
| 2 | Response safety, CORS restriction, redirect control, rate limiting, integration tests | 22–26, 31, 33, 35–38, 68–70, 74–75, 78–79, 91–92, 94, 96, 99 |
| 3 | Hardening — remove POST method, shared secret, Edge rate limiter, new provider prep | 44–47, 65, 70, 83, 86–88, 90, 97 |
| 4 | Documentation, caching, housekeeping | 32, 76–77, 81–82, 84, 89, 95, 98 |
| 5 | Future integrations | 85, 100 |
