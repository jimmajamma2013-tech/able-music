# ABLE — oEmbed Proxy: Final Review
**Created: 2026-03-16 | Spec-complete target: 8.5/10 | True 10 requires production verification**

> Post-spec review. The proxy is a thin function — changes are additive. P0 is a security fix that must ship before production.

---

## Score progression

| # | Dimension | Current | After P0 | After P1 | After P2 | Ceiling |
|---|---|---|---|---|---|---|
| 1 | Supported platforms | 5/10 | 5/10 | 7/10 | 8.5/10 | 9 — Bandcamp requires scraping |
| 2 | CORS handling | 7/10 | 9/10 | 9/10 | 9/10 | 9.5 — restricted + Vary header |
| 3 | Error handling | 5/10 | 7.5/10 | 9/10 | 9/10 | 9.5 — Playwright-tested edge cases |
| 4 | Caching | 1/10 | 1/10 | 7/10 | 9.5/10 | 9.5 — Netlify Blobs persistence |
| 5 | Rate limiting | 1/10 | 1/10 | 4/10 | 8/10 | 9 — provider quota monitoring |
| 6 | Security (SSRF) | 3/10 | 9/10 | 9/10 | 9.5/10 | 9.5 — zero-incident production record |
| **Overall** | **3.7/10** | **5.4/10** | **7.5/10** | **8.9/10** | **~9.3** |

**Spec-complete target: 8.5/10** (achievable after P0+P1)

Note: P0 jumps security from 3 to 9 — the SSRF fix is structural, not incremental.

---

## Dimension notes

### 1. Supported platforms — ceiling 9/10

After P1: YouTube, Spotify, SoundCloud, Vimeo, and Mixcloud are all supported with correct hostname-based routing. After P2: Apple Music via constructed embed.

The ceiling is 9 rather than 10 because Bandcamp support requires scraping the Bandcamp page HTML to extract the embed ID — a scraping dependency that introduces fragility and maintenance burden. If Bandcamp changes their page structure, the integration breaks. This is a known trade-off. Implement only if Bandcamp URL requests appear regularly in production logs.

---

### 2. CORS handling — ceiling 9.5/10

After P0: origin allowlist replaces wildcard. The remaining 0.5 gap to ceiling: Netlify preview deploy URLs need to be handled dynamically (they change per deploy). A pattern match on `*.netlify.app` rather than a static set is the correct approach, but it re-introduces substring matching logic. The spec uses a static set — this is the right call for production, with the development exception documented.

---

### 3. Error handling — ceiling 9.5/10

After P0: timeout added (504 PROVIDER_TIMEOUT). After P1: structured error codes replace string-only errors. The remaining 0.5 gap: edge cases around provider-specific errors. SoundCloud returns different error formats for rate-limited vs not-found states. A provider-specific error normaliser would close this gap. It is a P3 concern, not a P1 concern.

---

### 4. Caching — ceiling 9.5/10

After P1: in-memory cache with 1-hour TTL. After P2: Netlify Blobs persistent cache. The ceiling is 9.5 rather than 10 because even Netlify Blobs cache can become stale if a provider removes content (a deleted SoundCloud track returns 404 from the provider, but a cached response would return the old metadata until the TTL expires). Cache invalidation on 404 responses is a known pattern but adds complexity — document it as P3.

---

### 5. Rate limiting — ceiling 9/10

After P2: 20 requests per IP per hour. The ceiling is 9 because provider quota exhaustion is not fully preventable — SoundCloud's oEmbed quota is not published and cannot be monitored from our side. The mitigation is caching (reducing provider hits per user request) and logging (detecting unusual volumes). True protection requires SoundCloud API key-based access, which is a different integration pattern.

---

### 6. Security (SSRF) — ceiling 9.5/10

After P0: hostname allowlist prevents the known SSRF bypass. The remaining 0.5 gap: DNS rebinding attacks (where a domain resolves to an internal IP after the hostname check) are theoretically possible but practically unlikely in a Netlify serverless environment. There is no internal network to reach. The 9.5 ceiling acknowledges this theoretical gap without treating it as a practical risk.

---

## The most critical change

**P0.1 — URL allowlist.** This is the only change that must happen before the wizard goes to production. The current regex check is bypassable with a crafted URL. The fix is 10 lines of code and eliminates the known attack vector. Everything else in P0 (CORS restriction, timeout) is good hygiene. The allowlist is a correctness fix.

---

## What "spec-complete 8.5/10" means

- URL allowlist in place — known SSRF bypass is closed
- CORS restricted to ABLE's own domains
- 5-second timeout on provider fetches
- Normalised response shape — clients do not handle raw oEmbed JSON
- In-memory cache reduces repeated provider hits
- Structured error codes — clients switch on `code`, not string patterns
- Mixcloud supported

What it does not mean:
- Bandcamp is supported (requires scraping)
- Apple Music is supported (requires URL construction)
- Rate limiting is in place (P2)
- Cache hit rate has been measured (requires production traffic)
- SSRF test is automated in CI (P2.4)

---

## What this spec covers that the current function does not implement

| Item | Status |
|---|---|
| Hostname-based URL allowlist | Not implemented — P0.1 (security fix) |
| CORS origin restriction | Not implemented — P0.2 |
| Provider fetch timeout | Not implemented — P0.3 |
| Normalised response shape | Not implemented — P1.1 |
| In-memory cache | Not implemented — P1.2 |
| Structured error codes | Not implemented — P1.3 |
| Mixcloud support | Not implemented — P1.4 |
| Apple Music embed construction | Not implemented — P2.1 |
| Netlify Blobs persistent cache | Blocked on configuration — P2.2 |
| IP-based rate limiting | Not implemented — P2.3 |
| Playwright integration tests | Not started — P2.4 |
