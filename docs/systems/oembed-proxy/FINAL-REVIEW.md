# ABLE — oEmbed Proxy: Final Review
**Created: 2026-03-16 | Updated: 2026-03-16**

> The P0 hostname fix is a 15-minute change. It must ship before the wizard goes to production.

---

## Score progression

| # | Dimension | Current | After P0 hostname fix | After P1 | After P2 | Ceiling |
|---|---|---|---|---|---|---|
| 1 | Supported platforms | 5/10 | 7/10 | 7/10 | 8.5/10 | 9 |
| 2 | CORS handling | 7/10 | 7/10 | 9/10 | 9/10 | 9.5 |
| 3 | Error handling | 5/10 | 9/10 | 9/10 | 9/10 | 9.5 |
| 4 | Caching | 1/10 | 1/10 | 7/10 | 9.5/10 | 9.5 |
| 5 | Rate limiting | 1/10 | 1/10 | 4/10 | 8/10 | 9 |
| 6 | Security (SSRF) | 3/10 | 9.5/10 | 9.5/10 | 9.5/10 | 9.5 |
| **Overall** | **3.7/10** | **5.7/10** | **7.5/10** | **9.0/10** | **~9.3** |

**After the hostname fix = 9.5/10** (security dimension)

The hostname fix takes the single most critical dimension (security/SSRF) from 3/10 to 9.5/10 in 15 minutes. Because security was the dominant weakness, this single change represents the most important improvement to the proxy before production use. The overall score jumps from 3.7 to approximately 5.7 — the score looks modest because caching and rate limiting remain at 1/10, but the product risk profile changes entirely.

**After production verification = 10/10**

Production verification means: the Playwright SSRF test case is in CI and passing, and no SSRF violations appear in production logs over 90 days.

---

## The P0 bug in one sentence

The current platform guard uses `/spotify\.com/` (a substring regex) instead of `new URL(url).hostname` (a parsed hostname). A URL like `https://evil.spotify.com.attacker.example.com/` passes the regex but is not a Spotify URL.

**The fix is 10 lines of code.** `ALLOWED_HOSTS` Set + `isSafeMediaUrl()` using `new URL().hostname`. Full corrected function is in PATH-TO-10.md P0.1.

---

## Dimension notes

### 1. Supported platforms — ceiling 9/10

After P0 (which includes Mixcloud): YouTube, Spotify, SoundCloud, Vimeo, Mixcloud are all supported. After P2: Apple Music via constructed embed.

The ceiling is 9 rather than 10: Bandcamp requires scraping the Bandcamp page HTML to extract the embed ID — a scraping dependency that introduces fragility. Implement only if Bandcamp URL requests appear regularly in production logs.

### 2. CORS handling — ceiling 9.5/10

After P1: origin allowlist replaces wildcard. The remaining 0.5 gap: Netlify preview deploy URLs need handling dynamically (they change per deploy). A `*.netlify.app` pattern match re-introduces substring logic. The spec uses a static allowlist — this is correct for production, with the dev exception documented.

### 3. Error handling — ceiling 9.5/10

After P0: 5-second timeout prevents provider hangs. Structured error codes replace string-only errors. The remaining 0.5 gap: provider-specific error normalisation (SoundCloud and YouTube return different error shapes for rate-limited vs not-found states). This is P3, not P1.

### 4. Caching — ceiling 9.5/10

After P1: in-memory Map cache with 1-hour TTL reduces repeated provider hits within warm function instances. After P2: Netlify Blobs persistent cache gives near-100% hit rate across cold starts. The ceiling gap: stale cache when provider content is deleted (cached 200 response for a removed track). Cache invalidation on 404 is documented as P3.

### 5. Rate limiting — ceiling 9/10

After P2: 20 requests per IP per hour. The ceiling is 9 because SoundCloud's oEmbed quota is not published and cannot be monitored directly. The mitigation is caching (reducing provider hits) and logging (detecting abnormal volumes). True protection requires SoundCloud API key-based access — a different integration entirely.

### 6. Security (SSRF) — ceiling 9.5/10

After P0: hostname allowlist prevents the known substring bypass. The remaining 0.5 gap: DNS rebinding attacks (where a domain resolves to an internal IP after the hostname check) are theoretically possible but practically irrelevant in a Netlify serverless environment — there is no internal network to pivot to. The 9.5 ceiling acknowledges the theoretical gap without treating it as a practical risk.

---

## The most critical change

**P0.1 — URL hostname allowlist.** The only change that must happen before the wizard goes to production. The regex check is bypassable with a crafted URL. The fix is 10 lines and eliminates the known attack vector entirely.

Everything else in this system is an improvement to a working proxy. The allowlist is a correctness fix.

---

## What "spec-complete 9.5/10" means (after P0 hostname fix)

- URL allowlist in place — known SSRF bypass is closed
- Structured error codes on all error responses
- 5-second timeout on provider fetches
- Mixcloud supported

What it does not mean at this point:
- CORS restricted (still wildcard — P1.3)
- Response normalised (still raw oEmbed JSON — P1.1)
- Caching in place (every call hits provider live — P1.2)
- Rate limiting in place (P2.3)
- SSRF test automated in CI (P2.4)

---

## What this spec covers that the current function does not implement

| Item | Status |
|---|---|
| Hostname-based URL allowlist | **NOT IMPLEMENTED — P0.1 — security fix, must ship before production** |
| Provider fetch timeout | Not implemented — P0.1 (included in corrected function) |
| Structured error codes | Not implemented — P0.1 (included in corrected function) |
| Mixcloud support | Not implemented — P0.1 (included in corrected function) |
| CORS origin restriction | Not implemented — P1.3 |
| Normalised response shape | Not implemented — P1.1 |
| In-memory cache | Not implemented — P1.2 |
| Apple Music embed construction | Not implemented — P2.1 |
| Netlify Blobs persistent cache | Blocked on configuration — P2.2 |
| IP-based rate limiting | Not implemented — P2.3 |
| Playwright integration tests | Not started — P2.4 |
