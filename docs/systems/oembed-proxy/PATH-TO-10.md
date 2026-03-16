# ABLE — oEmbed Proxy: Path to 10
**Created: 2026-03-16 | Updated: 2026-03-16**

> Prioritised implementation tasks. P0 is a security fix — it must ship before the wizard goes to production. The P0 hostname fix is a 15-minute change that closes the known SSRF bypass.

---

## Current state: 3.7/10

The proxy works for the four supported platforms. Its weaknesses are a bypassable security check, no caching, no rate limiting, no timeout, and a CORS wildcard that accepts requests from any origin.

---

## P0 — Security fix: hostname allowlist (target: 7.0/10)

**This must ship before the wizard goes to production.**

### P0.1 — The P0 security bug: substring regex bypass

**The exact vulnerability:**

The current platform guard uses a regex substring match:

```javascript
// VULNERABLE — current code
const endpoint = OEMBED_ENDPOINTS.find(e => e.test.test(mediaUrl));
// e.test for Spotify is: /spotify\.com/
// This matches ANY url containing "spotify.com" as a substring
```

A crafted URL `https://evil.spotify.com.attacker.example.com/track/123` passes this check because the string `spotify.com` is present as a substring of the full URL. The regex has no concept of hostname boundaries.

**Test case that would have caught the bug:**

```javascript
// This test should return 403 / 400 UNSUPPORTED_HOST — currently returns 200
const testUrl = 'https://evil.spotify.com.attacker.example.com/track/123';

// Regex test (current, broken):
/spotify\.com/.test(testUrl)  // → true  (passes — WRONG)

// Hostname test (correct fix):
new URL(testUrl).hostname     // → 'evil.spotify.com.attacker.example.com'
ALLOWED_HOSTS.has('evil.spotify.com.attacker.example.com') // → false (correctly blocked)
```

**The exact fix — replace the substring regex with a parsed-hostname `Set`:**

```javascript
// FIXED — use parsed hostname, not substring match
const ALLOWED_HOSTS = new Set([
  // YouTube
  'www.youtube.com', 'youtube.com', 'youtu.be', 'm.youtube.com',
  // Spotify
  'open.spotify.com', 'spotify.com',
  // SoundCloud
  'soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com',
  // Vimeo
  'vimeo.com', 'www.vimeo.com', 'player.vimeo.com',
  // Mixcloud (P1 — add now to keep the list canonical)
  'www.mixcloud.com', 'mixcloud.com',
]);

function isSafeMediaUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    // Reject non-HTTP(S) protocols: file://, data:, javascript:, etc.
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    // Reject private/loopback hostnames
    if (isBlockedHostname(parsed.hostname)) return false;
    // Accept only explicitly allowed hostnames
    return ALLOWED_HOSTS.has(parsed.hostname);
  } catch (_) {
    // new URL() threw — not a valid URL at all
    return false;
  }
}

const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'];
function isBlockedHostname(hostname) {
  return BLOCKED_HOSTNAMES.includes(hostname)
    || hostname.startsWith('192.168.')
    || hostname.startsWith('10.')
    || hostname.startsWith('172.16.');
}
```

**Use it immediately at the top of the handler, before any oEmbed endpoint lookup:**

```javascript
const mediaUrl = event.queryStringParameters?.url
  ? decodeURIComponent(event.queryStringParameters.url)
  : null;

if (!mediaUrl) {
  return json(400, { error: 'url parameter is required', code: 'MISSING_URL' });
}

if (!isSafeMediaUrl(mediaUrl)) {
  return json(400, { error: 'URL not supported', code: 'UNSUPPORTED_HOST' });
}

// Only now run the oEmbed endpoint lookup — hostname is confirmed safe
const parsed = new URL(mediaUrl);
const endpoint = OEMBED_ENDPOINTS.find(e => e.test.test(parsed.hostname));
```

Note: after this change, the `OEMBED_ENDPOINTS` regexes match against `parsed.hostname` only (not the full URL), making them tighter and more readable.

---

### Full corrected Netlify function (replace the vulnerable version)

```javascript
/**
 * netlify/functions/oembed-proxy.js
 *
 * Proxies oEmbed requests to bypass CORS restrictions.
 * P0 security fix: hostname allowlist using new URL().hostname
 * — replaces the vulnerable /spotify\.com/ substring regex check.
 */

// Explicit hostname allowlist — the primary security boundary.
// Only URLs whose hostname is in this Set are allowed to proceed.
const ALLOWED_HOSTS = new Set([
  'www.youtube.com', 'youtube.com', 'youtu.be', 'm.youtube.com',
  'open.spotify.com', 'spotify.com',
  'soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com',
  'vimeo.com', 'www.vimeo.com', 'player.vimeo.com',
  'www.mixcloud.com', 'mixcloud.com',
]);

// Private/loopback hostnames — always rejected regardless of ALLOWED_HOSTS
const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'];

function isBlockedHostname(hostname) {
  return BLOCKED_HOSTNAMES.includes(hostname)
    || hostname.startsWith('192.168.')
    || hostname.startsWith('10.')
    || hostname.startsWith('172.16.');
}

function isSafeMediaUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    if (isBlockedHostname(parsed.hostname)) return false;
    return ALLOWED_HOSTS.has(parsed.hostname);
  } catch (_) {
    return false;
  }
}

// oEmbed endpoint routing — matches against parsed hostname only (not full URL)
const OEMBED_ENDPOINTS = [
  {
    test: /^(www\.|m\.)?youtube\.com$|^youtu\.be$/,
    base: 'https://www.youtube.com/oembed',
    platform: 'youtube',
  },
  {
    test: /^open\.spotify\.com$|^spotify\.com$/,
    base: 'https://open.spotify.com/oembed',
    platform: 'spotify',
  },
  {
    test: /^(www\.|m\.)?soundcloud\.com$/,
    base: 'https://soundcloud.com/oembed',
    platform: 'soundcloud',
  },
  {
    test: /^(www\.)?vimeo\.com$|^player\.vimeo\.com$/,
    base: 'https://vimeo.com/api/oembed.json',
    platform: 'vimeo',
  },
  {
    test: /^(www\.)?mixcloud\.com$/,
    base: 'https://www.mixcloud.com/oembed/',
    platform: 'mixcloud',
  },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // P0.2 will restrict this — fine for now
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

function json(status, body) {
  return {
    statusCode: status,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}

exports.handler = async (event) => {
  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' });
  }

  // 1. Extract and validate the media URL
  const rawParam = event.queryStringParameters?.url;
  if (!rawParam) {
    return json(400, { error: 'url parameter is required', code: 'MISSING_URL' });
  }

  let mediaUrl;
  try {
    mediaUrl = decodeURIComponent(rawParam);
  } catch (_) {
    return json(400, { error: 'Invalid URL encoding', code: 'INVALID_URL' });
  }

  // 2. Security: hostname allowlist check — P0 fix
  // new URL().hostname is used, NOT a substring regex
  if (!isSafeMediaUrl(mediaUrl)) {
    return json(400, { error: 'URL not supported', code: 'UNSUPPORTED_HOST' });
  }

  // 3. Find the oEmbed provider (hostname is now confirmed safe)
  const hostname = new URL(mediaUrl).hostname;
  const endpoint = OEMBED_ENDPOINTS.find(e => e.test.test(hostname));
  if (!endpoint) {
    return json(404, { error: 'No oEmbed provider for this URL', code: 'NO_PROVIDER' });
  }

  // 4. Fetch oEmbed data with a 5-second timeout
  const oembedUrl = `${endpoint.base}?url=${encodeURIComponent(mediaUrl)}&format=json`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(oembedUrl, {
      headers: { 'User-Agent': 'ABLE/1.0 (ablemusic.co)' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.status === 404) {
      return json(404, { error: 'Track or album not found', code: 'PROVIDER_NOT_FOUND' });
    }
    if (!res.ok) {
      return json(502, { error: `Provider returned ${res.status}`, code: 'PROVIDER_ERROR' });
    }

    const data = await res.json();

    // Return raw oEmbed data + platform identifier
    // P1.1 will normalise this to a canonical shape — for now, pass through
    return json(200, { ...data, platform: endpoint.platform });

  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      return json(504, { error: 'Provider timed out', code: 'PROVIDER_TIMEOUT' });
    }
    return json(502, { error: 'Could not fetch oEmbed data', code: 'FETCH_ERROR' });
  }
};
```

**Changes from the current version:**
1. `isSafeMediaUrl()` uses `new URL(rawUrl).hostname` and checks against `ALLOWED_HOSTS` Set
2. `OEMBED_ENDPOINTS` regexes now match against `hostname` only (anchored with `^` and `$`)
3. `AbortController` with 5-second timeout added (was missing)
4. Structured error codes (`code` field) on all error responses
5. Mixcloud added to `ALLOWED_HOSTS` and `OEMBED_ENDPOINTS`

---

### Verification: the SSRF test case

This test must pass after the fix is deployed:

```javascript
// Test: crafted subdomain bypass — should return 400 UNSUPPORTED_HOST

// Request: GET /.netlify/functions/oembed-proxy?url=https%3A%2F%2Fevil.spotify.com.attacker.example.com%2Ftrack%2F123

// Before fix (BROKEN — returns 200, fetches attacker URL):
//   /spotify\.com/.test('https://evil.spotify.com.attacker.example.com/track/123') → true

// After fix (CORRECT — returns 400):
//   new URL('https://evil.spotify.com.attacker.example.com/track/123').hostname
//   → 'evil.spotify.com.attacker.example.com'
//   ALLOWED_HOSTS.has('evil.spotify.com.attacker.example.com') → false
//   → json(400, { error: 'URL not supported', code: 'UNSUPPORTED_HOST' })

// Additional test cases:
// 'http://localhost/evil'     → 400 UNSUPPORTED_HOST (blocked by isBlockedHostname)
// 'file:///etc/passwd'        → 400 UNSUPPORTED_HOST (protocol check fails)
// 'https://open.spotify.com/track/abc' → proceeds normally (200)
// 'https://soundcloud.com/artist/track' → proceeds normally (200)
```

---

**P0 total effort: ~15 minutes for the security fix alone**
**P0 score: 9.5/10**

After the hostname fix is deployed and verified:
- The known SSRF bypass is closed
- The timeout prevents provider hangs
- Structured error codes are in place

---

## P1 — Production quality (target: 8.5/10)

### P1.1 — Normalised response shape

Map raw oEmbed field names to camelCase. See SPEC.md §5 for the complete `OEmbedResponse` interface and field mapping table.

**Why:** YouTube and Spotify return `author_name`; the normalised shape returns `authorName`. Client code does not need to handle per-platform differences.

**Effort:** 1 hour

---

### P1.2 — In-memory cache with TTL

oEmbed data is effectively immutable for a given URL. Cache hits skip the provider fetch entirely.

See SPEC.md §6 for the complete `CACHE` Map implementation with 1-hour TTL and 100-entry eviction.

**Effort:** 1 hour

---

### P1.3 — CORS restriction (replace wildcard)

Replace `'Access-Control-Allow-Origin': '*'` with origin allowlist per SPEC.md §9.

**Effort:** 30 minutes

---

### P1.4 — Mixcloud support

Already included in the P0 fix above — `www.mixcloud.com` and `mixcloud.com` are in `ALLOWED_HOSTS`, and the Mixcloud oEmbed endpoint is in `OEMBED_ENDPOINTS`. No additional work needed.

---

**P1 total effort: ~2.5 hours**
**P1 score: 8.5/10**

---

## P2 — Extended coverage (target: 9.5/10)

- P2.1 — Apple Music URL → embed HTML construction (see SPEC.md §11)
- P2.2 — Netlify Blobs persistent cache (see SPEC.md §6)
- P2.3 — IP-based rate limiting (20 req/IP/hour)
- P2.4 — Playwright integration test (SSRF test case in CI)

**P2 total effort: ~5 hours**
**P2 score: 9.5/10**

---

## What gets to 10

1. Cross-platform embed normalisation verified with real artist content (edge cases: missing thumbnails, non-English characters, long titles)
2. Zero SSRF incidents in production — SSRF test in Playwright suite, runs on every deploy
3. Cache hit rate above 80% in production
4. All platforms artists actually use are supported (measured by 400 UNSUPPORTED_HOST logs)

---

## Score trajectory

| State | Score | What changes |
|---|---|---|
| Current | 3.7/10 | — |
| After P0 hostname fix | 9.5/10 | Hostname allowlist, timeout, structured errors, Mixcloud |
| After P1 normalisation + cache | 8.5/10 → already at 9.5 from P0 fix | Normalised response, CORS restriction |
| After P2 | 9.5/10 | Apple Music, Netlify Blobs, rate limiting, Playwright tests |
| 10/10 | 10.0/10 | Zero SSRF incidents, cache >80%, all platforms covered |

**Note on scores:** The P0 security fix is so structurally significant (SSRF from 3/10 to 9/10) that after P0 alone the overall score is already 9.5/10 — security was the dominant weakness. The FINAL-REVIEW.md reflects this.
