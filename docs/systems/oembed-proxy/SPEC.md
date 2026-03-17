# ABLE — oEmbed Proxy: Canonical Spec
**Created: 2026-03-16 | Authority doc for all oEmbed proxy decisions**

> This is the canonical specification for the oEmbed proxy function. It defines supported URL formats, response shape, caching strategy, rate limiting, and security requirements. All implementation must follow this document.

---

## 1. Overview

The oEmbed proxy (`netlify/functions/oembed-proxy.js`) proxies oEmbed requests to bypass CORS restrictions in the browser. It is used:

1. **In the onboarding wizard** — when an artist pastes a music URL, the wizard calls the proxy to auto-fill the platform field and display a preview card.
2. **In admin.html** — when an artist sets or edits their music embed URL, the proxy provides preview metadata.
3. **In able-v7.html** (future) — to resolve embed metadata for display without embedding the full player.

The proxy's job is simple: receive a music platform URL, identify the oEmbed provider, fetch the oEmbed data, validate it, and return a normalised response.

---

## 2. Supported URL formats

### Canonical platform support

| Platform | Supported URL patterns | oEmbed endpoint | Notes |
|---|---|---|---|
| Spotify | `open.spotify.com/track/*`, `open.spotify.com/album/*`, `open.spotify.com/artist/*`, `open.spotify.com/playlist/*` | `https://open.spotify.com/oembed` | Requires `?url=` + encoded URL |
| SoundCloud | `soundcloud.com/*/` (track, set, user) | `https://soundcloud.com/oembed` | Returns iframe embed HTML |
| YouTube | `youtube.com/watch?v=*`, `youtu.be/*`, `youtube.com/shorts/*` | `https://www.youtube.com/oembed` | Returns iframe embed HTML |
| Vimeo | `vimeo.com/*` (any video path) | `https://vimeo.com/api/oembed.json` | Returns iframe embed HTML |
| Mixcloud | `mixcloud.com/*/` | `https://www.mixcloud.com/oembed/` | Returns iframe embed HTML |

### Planned platform support (P2)

| Platform | Approach | Notes |
|---|---|---|
| Bandcamp | Constructed iframe — no oEmbed. Extract `artist` and `track` from URL, construct embed. | `https://bandcamp.com/EmbeddedPlayer/album={id}/` — requires scraping or Bandcamp API |
| Apple Music | No oEmbed. Construct embed URL from Apple Music link. | `https://embed.music.apple.com/{country}/album/{id}` — URL pattern is extractable |

### URL patterns that are explicitly not supported

- Any platform not in the supported list above
- `file://` URLs
- `localhost` or RFC 1918 private IP ranges
- Any URL that does not resolve to `http://` or `https://`

---

## 3. Security: URL allowlist

**This is the primary security control. It must be implemented before anything else.**

The current regex-based check is insufficient because a crafted URL (e.g., `https://evil.spotify.com.attacker.example.com/`) passes the regex test but is not a Spotify URL. The allowlist must be based on parsed hostname, not substring matching.

### Implementation

```javascript
const ALLOWED_HOSTS = new Set([
  // YouTube
  'www.youtube.com', 'youtube.com', 'youtu.be', 'm.youtube.com',
  // Spotify
  'open.spotify.com', 'spotify.com',
  // SoundCloud
  'soundcloud.com', 'www.soundcloud.com', 'm.soundcloud.com',
  // Vimeo
  'vimeo.com', 'www.vimeo.com', 'player.vimeo.com',
  // Mixcloud
  'www.mixcloud.com', 'mixcloud.com',
]);

function isSafeMediaUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    return ALLOWED_HOSTS.has(parsed.hostname);
  } catch (_) {
    return false;
  }
}
```

Reject immediately if `isSafeMediaUrl(mediaUrl)` is false:

```javascript
if (!isSafeMediaUrl(mediaUrl)) {
  return json(400, { error: 'URL not supported', code: 'UNSUPPORTED_HOST' });
}
```

This replaces the current regex-based endpoint lookup as the primary security gate. The oEmbed endpoint mapping continues to use regexes, but they now run only on URLs that have already passed the hostname check.

### Private IP protection

Explicitly reject any URL whose resolved IP would be in private ranges. In a Netlify function environment, add an explicit check against known internal hostnames:

```javascript
const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '[::1]'];
function isBlockedHostname(hostname) {
  return BLOCKED_HOSTNAMES.includes(hostname)
    || hostname.startsWith('192.168.')
    || hostname.startsWith('10.')
    || hostname.startsWith('172.16.');
}
```

---

## 4. oEmbed endpoint mapping

After the hostname allowlist check passes, map the URL to the correct oEmbed endpoint:

```javascript
const OEMBED_ENDPOINTS = [
  {
    test: /^(www\.)?youtube\.com|^youtu\.be/,
    base: 'https://www.youtube.com/oembed',
    platform: 'youtube',
  },
  {
    test: /^open\.spotify\.com/,
    base: 'https://open.spotify.com/oembed',
    platform: 'spotify',
  },
  {
    test: /^(www\.|m\.)?soundcloud\.com/,
    base: 'https://soundcloud.com/oembed',
    platform: 'soundcloud',
  },
  {
    test: /^(www\.)?vimeo\.com/,
    base: 'https://vimeo.com/api/oembed.json',
    platform: 'vimeo',
  },
  {
    test: /^(www\.)?mixcloud\.com/,
    base: 'https://www.mixcloud.com/oembed/',
    platform: 'mixcloud',
  },
];
```

Note: regexes now match against the **hostname only**, not the full URL, making them more precise.

---

## 5. Response shape — normalised

The function must not return raw provider JSON. It must normalise to a consistent ABLE response shape:

```typescript
interface OEmbedResponse {
  platform:       string;     // 'spotify' | 'youtube' | 'soundcloud' | 'vimeo' | 'mixcloud'
  title:          string;
  authorName:     string;
  authorUrl:      string | null;
  thumbnailUrl:   string | null;
  thumbnailWidth: number | null;
  thumbnailHeight: number | null;
  html:           string | null;   // The embed HTML — null for Spotify (uses iframe directly)
  width:          number | null;
  height:         number | null;
  providerName:   string;
  cachedAt:       number;          // Unix timestamp of when this response was cached
}
```

### Normalisation mapping from raw oEmbed fields

| Raw field (from provider) | Normalised field |
|---|---|
| `title` | `title` |
| `author_name` | `authorName` |
| `author_url` | `authorUrl` |
| `thumbnail_url` | `thumbnailUrl` |
| `thumbnail_width` | `thumbnailWidth` |
| `thumbnail_height` | `thumbnailHeight` |
| `html` | `html` |
| `width` | `width` |
| `height` | `height` |
| `provider_name` | `providerName` |
| — | `platform` (from endpoint match) |
| — | `cachedAt` (from cache or `Date.now()`) |

### Handling missing fields

All nullable fields must default to `null`, not `undefined`. This ensures the client can check `response.thumbnailUrl !== null` without `undefined` check edge cases.

---

## 6. Caching strategy

oEmbed data is effectively immutable for a given URL — a track title and thumbnail do not change. Caching is safe and beneficial.

### Phase 1 (P1): In-memory cache with TTL

```javascript
const CACHE = new Map();   // url → { data, expiresAt }
const CACHE_TTL_MS = 60 * 60 * 1000;  // 1 hour

function getCached(url) {
  const entry = CACHE.get(url);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { CACHE.delete(url); return null; }
  return entry.data;
}

function setCached(url, data) {
  CACHE.set(url, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}
```

**Limitation:** In-memory cache resets on cold starts. For a low-traffic function this is acceptable — cache hit rate will be low but the cache prevents repeated calls within the same warm function instance.

**Cache size limit:** Evict oldest entries when cache exceeds 100 entries. Prevents memory growth on long-lived instances.

### Phase 2 (P2): Netlify Blobs persistent cache

When Netlify Blobs is available, use it as a persistent cache layer:

```javascript
// Key: sha256(mediaUrl)
// Value: JSON-serialised OEmbedResponse
// TTL: 24 hours
```

This gives near-100% cache hit rate for the same URL across all function invocations.

---

## 7. Timeout

Add a 5-second timeout on the provider fetch:

```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const res = await fetch(oembedUrl, {
    headers: { 'User-Agent': 'ABLE/1.0 (ablemusic.co)' },
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  // ...
} catch (e) {
  clearTimeout(timeoutId);
  if (e.name === 'AbortError') {
    return json(504, { error: 'Provider timed out', code: 'PROVIDER_TIMEOUT' });
  }
  return json(502, { error: 'Could not fetch oEmbed data', code: 'PROVIDER_ERROR' });
}
```

**Timeout value: 5 seconds.** Provides a graceful bound without being too tight for slow providers.

---

## 8. Rate limiting

Rate limiting on the oEmbed proxy is lower priority than on the AI copy function (no expensive API key at risk), but provider quota exhaustion is a real concern.

### P1: Request logging and alerting

Log each request with `console.log({ url: mediaUrl, platform, ts: Date.now() })`. Netlify function logs are queryable. Set up an alert if requests exceed 1,000/day (a threshold that suggests abuse rather than organic usage).

### P2: IP-based rate limiting

20 requests per IP per hour. Implemented with in-memory counter (same approach as AI copy P0.3). Use Netlify Blobs for persistence when available.

```
HTTP 429 { "error": "Too many requests", "code": "RATE_LIMITED" }
```

---

## 9. CORS restriction

Restrict `Access-Control-Allow-Origin` to ABLE's own domains:

```javascript
const ALLOWED_ORIGINS = new Set([
  'https://ablemusic.co',
  'https://www.ablemusic.co',
  'https://ablemusic.co',
]);

// In the handler:
const origin = event.headers.origin || '';
const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://ablemusic.co';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': allowedOrigin,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
  'Vary': 'Origin',
};
```

Add `Vary: Origin` to prevent caching issues with CDNs.

**Development exception:** When `NODE_ENV === 'development'` or the origin is a Netlify preview deploy URL (`*.netlify.app`), allow the request.

---

## 10. Error response codes

| Code | HTTP | Trigger | Client display |
|---|---|---|---|
| `MISSING_URL` | 400 | `url` param absent | Show URL field with hint |
| `INVALID_URL` | 400 | URL decoding failed or not `http/https` | "That doesn't look like a valid URL" |
| `UNSUPPORTED_HOST` | 400 | Hostname not in allowlist | "We don't support that platform yet" |
| `NO_PROVIDER` | 404 | No oEmbed endpoint matched | "No embed available for this URL" |
| `PROVIDER_NOT_FOUND` | 404 | Provider returned 404 | "That track or album wasn't found" |
| `PROVIDER_TIMEOUT` | 504 | AbortController fired | "That platform is slow right now — try again" |
| `PROVIDER_ERROR` | 502 | Provider returned non-200 | "Couldn't reach that platform right now" |
| `FETCH_ERROR` | 502 | Network error on provider fetch | "Network error — check the URL and try again" |
| `METHOD_NOT_ALLOWED` | 405 | Non-GET request | — (client should not hit this) |

All error responses follow:
```json
{ "error": "Human-readable message", "code": "MACHINE_READABLE_CODE" }
```

---

## 11. Additional platform workarounds (P2)

### Apple Music

Apple Music does not have an oEmbed endpoint. The embed URL can be constructed from the Apple Music link:

```
Input:  https://music.apple.com/gb/album/title/1234567890
Output: https://embed.music.apple.com/gb/album/title/1234567890

iframe: <iframe allow="autoplay *; encrypted-media *;" height="175"
        src="https://embed.music.apple.com/gb/album/title/1234567890"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation">
        </iframe>
```

For Apple Music URLs, skip the oEmbed fetch and return a constructed response:

```json
{
  "platform": "apple-music",
  "title": null,
  "authorName": null,
  "html": "<iframe ...constructed embed...>",
  "providerName": "Apple Music",
  "cachedAt": 0
}
```

Note: `title` and `authorName` will be null because they are not available without scraping or Apple MusicKit API. The embed will still render correctly.

### Bandcamp

Bandcamp's embed URL structure:

```
Track: https://bandcamp.com/EmbeddedPlayer/track={id}/size=large/
Album: https://bandcamp.com/EmbeddedPlayer/album={id}/size=large/
```

The track/album ID is embedded in the Bandcamp page HTML — extracting it requires an HTTP fetch of the Bandcamp page and regex extraction of `data-item-id`. This introduces additional latency and a scraping dependency. Implement only if artist demand warrants it.

---

## 12. Integration contract for the wizard

The wizard calls the proxy on URL paste (after debounce of 400ms). Expected call pattern:

```javascript
const oembedData = await fetch(
  `/.netlify/functions/oembed-proxy?url=${encodeURIComponent(mediaUrl)}`
).then(r => r.json());

if (oembedData.error) {
  // Handle per error code
} else {
  // oembedData.title, oembedData.authorName, oembedData.thumbnailUrl are available
  // oembedData.html is the embed HTML for the preview card
}
```

The wizard must handle a `null` response for `html` (Spotify sometimes returns null for `html` — render a fallback embed iframe directly).
