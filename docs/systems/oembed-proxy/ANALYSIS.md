# ABLE — oEmbed Proxy: Analysis
**File: `netlify/functions/oembed-proxy.js` | Created: 2026-03-16**

> Audit of the current oEmbed proxy function. Scored across 6 dimensions. This is the honest starting state before SPEC.md defines the target.

---

## Scores — current state

| # | Dimension | Score | Notes |
|---|---|---|---|
| 1 | Supported platforms | 5/10 | See below |
| 2 | CORS handling | 7/10 | See below |
| 3 | Error handling | 5/10 | See below |
| 4 | Caching | 1/10 | See below |
| 5 | Rate limiting | 1/10 | See below |
| 6 | Security (SSRF risk) | 3/10 | See below |
| **Overall** | | **3.7/10** | Pre-spec state |

---

## Dimension 1: Supported platforms — 5/10

The function supports 4 platforms via regex matching:

```javascript
const OEMBED_ENDPOINTS = [
  { test: /youtube\.com|youtu\.be/,    base: 'https://www.youtube.com/oembed' },
  { test: /spotify\.com/,              base: 'https://open.spotify.com/oembed' },
  { test: /soundcloud\.com/,           base: 'https://soundcloud.com/oembed' },
  { test: /vimeo\.com/,                base: 'https://vimeo.com/api/oembed.json' },
];
```

**Missing platforms that matter for ABLE artists:**

- **Apple Music** — no oEmbed support natively, but the embed can be constructed from the track URL. Significant omission given UK/European artist audience.
- **Bandcamp** — no official oEmbed endpoint, but artists who link to Bandcamp are exactly ABLE's core user. Bandcamp tracks are embeddable via iframe with a known URL pattern.
- **Tidal** — no oEmbed. Lower priority but present in artist tech stacks.
- **Deezer** — no oEmbed. Lower priority.
- **Mixcloud** — `https://www.mixcloud.com/oembed/` — relevant for DJ/Electronic artists who host long sets there.

**Platform regex fragility:**
- `spotify\.com` matches any Spotify URL — not just music content. A Spotify podcast URL would pass the regex and Spotify's oEmbed endpoint would return podcast metadata. This is not necessarily wrong, but it is unfiltered.
- `youtube\.com|youtu\.be` is correct and handles both URL formats.
- No handling for `open.spotify.com` vs bare `spotify.com` — in practice these are the same, but the regex would also match `accounts.spotify.com`, `support.spotify.com`, etc.

**Response normalisation:**
The function returns the raw oEmbed JSON from the provider without any normalisation. YouTube returns `{"title": "...", "author_name": "...", "thumbnail_url": "..."}`. Spotify returns a structurally similar but not identical shape. The client must handle platform-specific differences. No normalisation layer exists.

Score of 5: the core four platforms work, but missing Mixcloud, Bandcamp workaround, and platform regex is looser than it should be.

---

## Dimension 2: CORS handling — 7/10

The CORS setup is correct for a Netlify function:

```javascript
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};
```

The OPTIONS preflight handler returns 204 with the correct headers. GET requests include CORS headers. This is the standard Netlify function pattern and works correctly.

**The gap:** `Access-Control-Allow-Origin: '*'` is a wildcard. Any website can call this function. Combined with the lack of an allowlist and rate limiting, this means the proxy is effectively a public oEmbed proxy that anyone can use. This is not a security vulnerability per se, but it means ABLE is paying for requests from any site that discovers the function URL.

Restricting to `Access-Control-Allow-Origin: https://ablemusic.co` (or the Netlify deploy URL) would prevent cross-origin abuse without affecting ABLE's own pages.

Score of 7: functionally correct but over-permissive for a production system.

---

## Dimension 3: Error handling — 5/10

**What exists:**
- `405` for non-GET methods — correct
- `400` for missing `url` param — correct
- `400` for invalid URL encoding — correct
- `404` for unknown provider — correct (no oEmbed provider matched)
- `res.status` forwarding when the provider returns a non-200 — correct
- `502` for network errors when fetching the provider — correct

**What is missing:**

**1. No timeout.** If Spotify's oEmbed endpoint is slow (it occasionally is), the Netlify function will wait until the provider responds or until Netlify's function timeout (26 seconds). There is no `AbortController` or `signal` with a timeout. A slow provider means a slow wizard experience.

**2. No distinction between provider errors.** If SoundCloud returns a 404 (track not found), the function returns `{ error: "Provider returned 404" }`. The client receives no information about *why* the 404 occurred — was the URL valid but the content removed? Or was the URL format wrong? This matters for user-facing error messages in the wizard.

**3. No validation of the `url` parameter format beyond `startsWith('http')`.** The function accepts any string that starts with `http`. The SSRF check comes later (via the platform regex), but the regex is not strict enough to be the primary security boundary (see Dimension 6).

**4. The response body on provider error is just `{ error: "Provider returned 404" }`.** No error code, no recovery suggestion. The client has to pattern-match error strings to decide what to show the user.

Score of 5: basic cases handled, timeout and structured errors missing.

---

## Dimension 4: Caching — 1/10

No caching exists. Every call to the oEmbed proxy makes a live request to the provider's oEmbed endpoint. This means:

- If an artist pastes the same Spotify link twice in a session (e.g., they go back and re-enter the URL), two requests are made.
- If the Spotify oEmbed endpoint is slow, every call is slow regardless of whether the data was recently fetched.
- If the wizard auto-calls oEmbed on input debounce (as the Spotify import spec contemplates), each keystroke could trigger a request.

oEmbed data is static for a given URL. A track's title, thumbnail, and author name do not change. Caching is appropriate and safe.

**The Netlify constraint:** Netlify functions are stateless. In-memory caching resets on each cold start. For meaningful caching, Netlify Blobs or a Supabase edge function with a persistent cache would be required. At low traffic volumes, no-cache is acceptable — but it is worth noting.

Score of 1: no caching, which is the honest starting state for a stateless serverless function.

---

## Dimension 5: Rate limiting — 1/10

Like the AI copy function, there is no rate limiting on the oEmbed proxy. Any caller can make unlimited requests. The cost exposure here is different — there is no paid API key involved, so the financial risk is low. The risk is:

- **Exhausting provider quotas.** SoundCloud has rate limits on its oEmbed endpoint. Heavy usage could result in ABLE's Netlify function IP being rate-limited by SoundCloud, degrading the experience for all ABLE artists simultaneously.
- **Netlify function invocation cost.** At scale, unlimited proxy calls could accumulate Netlify function invocation costs.

Score of 1: no rate limiting, low-urgency gap at current traffic.

---

## Dimension 6: Security (SSRF risk) — 3/10

This is the most significant gap in the current implementation.

**The SSRF risk:**

Server-Side Request Forgery (SSRF) occurs when an attacker supplies a URL that the server fetches, targeting internal infrastructure. In the context of a Netlify function, the attack surface is lower than a traditional server (there is no internal network to pivot to), but the risk exists:

**1. The URL allowlist is a regex, not a strict parser.** The current check:

```javascript
const endpoint = OEMBED_ENDPOINTS.find(e => e.test.test(mediaUrl));
if (!endpoint) return json(404, { error: 'No oEmbed provider for this URL' });
```

A URL like `https://evil-site.spotify.com.evil.example.com/oembed?...` would pass the `/spotify\.com/` regex because the string `spotify.com` is present anywhere in the URL. The regex test is a substring match, not a domain match.

**2. No URL parsing before the regex check.** The function does not parse the URL with `new URL()` before running the regex. `new URL()` would expose the hostname for a strict comparison.

**3. `mediaUrl.startsWith('http')` is insufficient.** A `file://` protocol URL would not pass this check, but other protocol-relative or data URL forms might slip through if the `startsWith` check were different.

**The correct approach:** Parse the URL with `new URL()`, extract the `hostname`, and check it against an explicit allowlist of known domains:

```javascript
const ALLOWED_HOSTS = new Set([
  'www.youtube.com', 'youtube.com', 'youtu.be',
  'open.spotify.com', 'spotify.com',
  'soundcloud.com',
  'vimeo.com',
  'www.mixcloud.com', 'mixcloud.com',
]);
```

Any hostname not in this set is rejected before the oEmbed endpoint lookup.

**4. The oEmbed provider URL is constructed directly from user input.** `encodeURIComponent(mediaUrl)` is used, which is correct — but the `mediaUrl` is still being included in a request to a third-party provider. If the media URL were somehow malformed to redirect, the server would follow the redirect. `fetch()` follows redirects by default.

Score of 3: the regex provides a partial guard, but the guard is bypassable with a crafted URL. This is a P0 security fix.

---

## Summary

The oEmbed proxy is a thin, functional pass-through that works for the happy path. Its weaknesses are:

1. **Security:** The platform guard is regex-based, not domain-allowlist-based. A crafted URL can bypass it.
2. **Caching:** Every call hits the provider live. No in-memory or persistent cache.
3. **Rate limiting:** No limits. Provider quota exhaustion is a real risk.
4. **Platform coverage:** Mixcloud, Apple Music, and a Bandcamp workaround are missing for the full ABLE artist roster.
5. **Timeouts:** Slow providers block the function with no escape.

The function's architecture is sound — the changes needed are additions, not rewrites.
