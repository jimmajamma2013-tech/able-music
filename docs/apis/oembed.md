# ABLE — oEmbed Proxy Spec
**Created: 2026-03-16 | Covers: embed resolution for Spotify, YouTube, SoundCloud, Bandcamp, Vimeo**

> oEmbed is a web standard that lets you paste a URL and get back rich embed HTML. ABLE proxies these requests server-side to avoid CORS issues that would block direct browser calls. The proxy function is already built at `netlify/functions/oembed-proxy.js`. This file covers what it does, what the supported sources are, and what happens when it fails.

---

## What oEmbed is

When an artist pastes a URL into admin.html (a Spotify track, a YouTube video, a Bandcamp album), ABLE needs to render that URL as an embed. oEmbed is the standard for this: paste a URL, get back an HTML iframe.

Every major platform implements it. The response looks like:

```json
{
  "type": "rich",
  "html": "<iframe src=\"https://open.spotify.com/embed/track/xxx\" ...></iframe>",
  "width": 456,
  "height": 152,
  "title": "Echoes by Nadia Rose",
  "thumbnail_url": "https://i.scdn.co/image/..."
}
```

ABLE then injects the `html` field into the page. No API keys required for any of these services — oEmbed is an open standard.

---

## Why a server-side proxy is needed

Direct browser calls to oEmbed endpoints fail with CORS errors. For example:
```
Access to fetch at 'https://soundcloud.com/oembed' from origin 'https://ablemusic.co'
has been blocked by CORS policy
```

The `oembed-proxy.js` Netlify function makes the request from the server, where CORS does not apply, and returns the result to the client.

---

## Supported sources

| Service | oEmbed endpoint | Format | Notes |
|---|---|---|---|
| Spotify | `https://open.spotify.com/oembed?url={url}` | JSON | Tracks, albums, playlists, artists |
| YouTube | `https://www.youtube.com/oembed?url={url}&format=json` | JSON | Videos and playlists |
| SoundCloud | `https://soundcloud.com/oembed?url={url}&format=json` | JSON | Tracks and playlists |
| Bandcamp | `https://bandcamp.com/oembed?url={url}&format=json` | JSON | Albums and tracks |
| Vimeo | `https://vimeo.com/api/oembed.json?url={url}` | JSON | Videos |

---

## Function: `netlify/functions/oembed-proxy.js`

### Status: Built — no environment variables needed

### Request
```javascript
GET /.netlify/functions/oembed-proxy?url={encodedUrl}
// or
POST /.netlify/functions/oembed-proxy
{ "url": "https://open.spotify.com/track/xxx" }
```

### Success response (HTTP 200)
```json
{
  "type": "rich",
  "html": "<iframe ...></iframe>",
  "width": 456,
  "height": 152,
  "title": "Echoes by Nadia Rose",
  "thumbnail_url": "https://i.scdn.co/image/..."
}
```

### Error response
```json
{ "error": "not_supported", "message": "No oEmbed endpoint for this URL" }
{ "error": "fetch_failed",  "message": "Could not reach oEmbed endpoint" }
{ "error": "timeout",       "message": "oEmbed request timed out" }
{ "error": "parse_error",   "message": "oEmbed response was not valid JSON" }
```

### Platform detection

The function detects which oEmbed endpoint to call based on the URL:

```javascript
function getOembedEndpoint(url) {
  if (url.includes('open.spotify.com'))   return `https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`;
  if (url.includes('youtube.com') || url.includes('youtu.be'))
                                          return `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  if (url.includes('soundcloud.com'))     return `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  if (url.includes('bandcamp.com'))       return `https://bandcamp.com/oembed?url=${encodeURIComponent(url)}&format=json`;
  if (url.includes('vimeo.com'))          return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`;
  return null; // unsupported source
}
```

---

## Client-side usage (admin.html)

When an artist pastes a URL into a URL field, admin.html checks if it is an oEmbed-able source and calls the proxy:

```javascript
async function resolveEmbed(rawUrl) {
  // Check sessionStorage cache first
  const cacheKey = `oembed_${btoa(rawUrl)}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s max

  try {
    const res = await fetch(`/.netlify/functions/oembed-proxy?url=${encodeURIComponent(rawUrl)}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const err = await res.json();
      showEmbedError(err.error);
      return null;
    }

    const data = await res.json();
    // Cache the result for this session — same URL should not call the API twice
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;

  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') showEmbedError('timeout');
    else showEmbedError('fetch_failed');
    return null;
  }
}
```

---

## Fallback behaviour (what to do when oEmbed fails)

When `resolveEmbed()` returns null, do not block the artist from saving the URL. Fall back gracefully:

1. Display: "We couldn't read that link. It will appear as a standard link on your page."
2. Store the raw URL as a `link` type snap card or CTA — not an embed
3. The fan-facing page renders it as a tappable link with a platform icon

Do not show the artist a technical error message. The failure is ABLE's problem, not theirs.

---

## Timeout and caching requirements

**Timeout:** 5 seconds maximum per oEmbed request. If the external service does not respond within 5 seconds, fail gracefully with the fallback above. Do not let a slow oEmbed server block the admin.html UI.

**Session caching:** The same URL should not result in more than one network call per session. Use `sessionStorage` with the URL as the cache key. Cache lifetime: session (no explicit TTL needed — the session ends when the tab closes).

**Why caching matters:** An artist editing their profile may paste the same URL multiple times (undo/redo, copy-paste from another field). Without caching, each paste triggers a network call.

---

## Current score and path to complete

**Score: 7/10 → 9/10**

What's done: function built, platform detection implemented, core proxy logic works.

What's needed:
1. Verify all 5 platforms return valid responses with real test URLs
2. Add explicit error handling for all 4 failure cases (`not_supported`, `fetch_failed`, `timeout`, `parse_error`)
3. Add the 5-second AbortController timeout inside the Netlify function itself (not just the client)
4. Add sessionStorage caching in admin.html before the fetch call
5. Wire the graceful fallback UI in admin.html (store as link type when oEmbed fails)
