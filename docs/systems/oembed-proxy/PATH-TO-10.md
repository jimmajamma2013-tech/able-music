# ABLE — oEmbed Proxy: Path to 10
**Created: 2026-03-16**

> Prioritised implementation tasks. P0 is a security fix — it must ship before anything else. P1 adds production quality. P2 extends platform coverage.

---

## Current state: 3.7/10

The proxy works for the four supported platforms. Its weaknesses are a bypassable security check, no caching, no rate limiting, and no timeout — plus a CORS wildcard that accepts requests from any origin.

---

## P0 — Security fix (target: 7.0/10)

**This must ship before the wizard goes to production. The current regex-based URL check is a known security gap.**

### P0.1 — URL allowlist (SSRF prevention)

**What:** Replace the regex-based endpoint lookup as the primary security gate with a parsed-hostname allowlist check. Implement `isSafeMediaUrl()` and `isBlockedHostname()` as defined in SPEC.md §3.

**The specific risk:** A URL like `https://spotify.com.attacker.example.com/oembed` passes the current `/spotify\.com/` regex test but is not a Spotify URL. The fix is to parse the URL with `new URL()`, extract `.hostname`, and check it against an explicit `Set` of allowed hostnames.

**Pass criteria:**
- `https://evil.spotify.com.example.com/track/123` → 400 UNSUPPORTED_HOST
- `https://open.spotify.com/track/123` → proceeds normally
- `http://localhost/evil` → 400 UNSUPPORTED_HOST
- `file:///etc/passwd` → 400 INVALID_URL

**Effort:** 1–2 hours

---

### P0.2 — CORS restriction

**What:** Replace `Access-Control-Allow-Origin: '*'` with an origin allowlist (SPEC.md §9). Only allow requests from `ablemusic.co`, `ablemusic.co`, and Netlify preview deploy URLs.

**Pass criteria:** A request from `https://attacker.example.com` receives CORS headers with `Access-Control-Allow-Origin: https://ablemusic.co` (the default), not the attacker's origin. Browser will block the cross-origin response.

**Effort:** 30 minutes

---

### P0.3 — Timeout on provider fetch

**What:** Add an `AbortController` with a 5-second timeout on the `fetch()` call to the oEmbed provider (SPEC.md §7). Return `504 PROVIDER_TIMEOUT` with a user-friendly error message.

**Pass criteria:** With the provider URL pointed at a mock server that sleeps for 10 seconds, the proxy returns 504 within 5.5 seconds.

**Effort:** 30 minutes

---

**P0 total effort: ~2.5 hours**
**P0 score: 7.0/10**

---

## P1 — Production quality (target: 8.5/10)

### P1.1 — Normalised response shape

**What:** Implement the normalised `OEmbedResponse` structure (SPEC.md §5). Map raw oEmbed field names (`author_name`, `thumbnail_url`, etc.) to camelCase equivalents. Add `platform` and `cachedAt` fields.

**Why it matters:** The current function returns raw provider JSON. YouTube, Spotify, and SoundCloud return slightly different field names. The client must handle platform-specific differences. Normalisation moves that complexity into the proxy where it belongs.

**Pass criteria:** A Spotify call and a YouTube call return identical top-level field names. A field present in one but absent in the other returns `null` (not `undefined` or missing entirely).

**Effort:** 1 hour

---

### P1.2 — In-memory cache with TTL

**What:** Implement the `CACHE` Map with a 1-hour TTL (SPEC.md §6). Cache hits skip the provider fetch. Add `cachedAt` to the response so the client can tell whether the response is live or cached.

**Cache eviction:** When the cache exceeds 100 entries, evict the oldest entry before adding a new one.

**Pass criteria:** Two consecutive identical requests (within the TTL) result in one provider fetch, not two. Verified by checking provider request logs.

**Effort:** 1 hour

---

### P1.3 — Structured error codes

**What:** Replace the current string-only error responses with structured `{ error, code }` objects as defined in SPEC.md §10. The `code` field is machine-readable; the `error` field is human-readable.

**Pass criteria:** The wizard's error handler can switch on `code` values to show the right message. No string matching required.

**Effort:** 30 minutes

---

### P1.4 — Mixcloud support

**What:** Add Mixcloud (`www.mixcloud.com`) to the platform support list. Add hostname to the allowlist. Add oEmbed endpoint to the endpoint mapping.

**Rationale:** Mixcloud is the primary platform for DJ sets and electronic music long-form content — exactly ABLE's Electronic/Club vibe user. Its oEmbed implementation is standard and straightforward.

**Pass criteria:** `https://www.mixcloud.com/some-dj/some-set/` returns a valid normalised oEmbed response.

**Effort:** 30 minutes

---

**P1 total effort: ~3 hours**
**P1 score: 8.5/10**

---

## P2 — Extended coverage (target: 9.5/10)

### P2.1 — Apple Music URL → embed HTML construction

**What:** For Apple Music URLs (`music.apple.com/*`), skip the oEmbed fetch and construct the embed HTML from the URL pattern (SPEC.md §11). Return a normalised response with `platform: 'apple-music'` and `html` set to the constructed embed.

**Effort:** 1 hour

---

### P2.2 — Netlify Blobs persistent cache

**What:** When Netlify Blobs is available, use it as a persistent cache layer with a 24-hour TTL. This gives near-100% cache hit rate for any URL that has been requested before.

**Blocked on:** Netlify Blobs availability and configuration in the ABLE Netlify account.

**Effort:** 2 hours

---

### P2.3 — IP-based rate limiting

**What:** 20 requests per IP per hour. Log all requests. Set up monitoring alert if requests exceed 1,000/day from a single IP.

**Effort:** 1 hour (in-memory counter; Netlify Blobs version for persistence)

---

### P2.4 — Playwright integration test

**What:** Automated test that:
1. Calls the proxy with a valid Spotify URL and verifies normalised response shape
2. Calls the proxy with a crafted SSRF URL and verifies 400 UNSUPPORTED_HOST
3. Calls the proxy with a URL for an unsupported platform and verifies 400 UNSUPPORTED_HOST
4. Calls the proxy with no `url` param and verifies 400 MISSING_URL

**Pass criteria:** All four test cases pass on CI. SSRF test failure would block the build.

**Effort:** 1 hour

---

**P2 total effort: ~5 hours**
**P2 score: 9.5/10**

---

## What gets to 10

**1. Cross-platform embed normalisation verified with real artist content.** The normalised response shape is correct on paper. 10/10 requires it to be verified against real Spotify tracks, SoundCloud sets, YouTube videos, and Mixcloud mixes — with edge cases (missing thumbnails, long titles, non-English characters).

**2. Zero SSRF incidents in production.** The allowlist test must be in the Playwright suite and must run on every deploy. Zero logged violations over 90 days.

**3. Cache hit rate above 80% in production.** Measured by logging whether each response was a cache hit or miss. 80% means most wizard paste events are served from cache, not from the provider.

**4. Supported all platforms artists actually use.** Measured by tracking "unsupported URL" 400 responses in production — if Bandcamp or Apple Music appears frequently, it justifies P2 implementation.

---

## Score trajectory

| State | Score | What changes |
|---|---|---|
| Current | 3.7/10 | — |
| After P0 | 7.0/10 | URL allowlist, CORS restriction, timeout |
| After P1 | 8.5/10 | Normalised response, in-memory cache, structured errors, Mixcloud |
| After P2 | 9.5/10 | Apple Music, Netlify Blobs cache, rate limiting, Playwright tests |
| 10/10 | 10.0/10 | Zero SSRF incidents, cache hit >80%, all artist-used platforms covered |
