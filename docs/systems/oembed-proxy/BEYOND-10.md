# oEmbed Proxy — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is an embed that loads before the artist finishes typing the URL, looks like it was designed for the page, and makes a fan feel like they never left.

---

## Moment 1: The Sub-300ms Embed Resolution

**What it is:** When an artist pastes a Spotify or YouTube URL anywhere in ABLE — wizard, admin, snap card editor — the oEmbed proxy resolves and the preview appears in under 300ms for any URL the system has seen before, because the in-memory cache returns the result before the network request even starts.

**Why it's 20/10:** In a platform built for artists who are mobile-first and often on slow connections, a slow embed resolution creates doubt. "Did it work? Is it loading?" An embed that appears almost instantly — especially for commonly used tracks — eliminates that doubt entirely. The cache hit is silent. The artist pastes the URL and sees their track appear. There is no spinner. There is no latency. The speed is the feature. It is the small, invisible sign that the platform was engineered carefully, not assembled quickly.

**Exact implementation:**

The in-memory cache from SPEC.md §6 is the mechanism. The 20/10 detail is the client-side optimistic preview that renders while the proxy call is in flight for cache misses:

```javascript
// In admin.html and start.html — URL paste handler with optimistic preview
async function resolveOEmbed(url) {
  // Optimistic: if we've seen this URL this session, preview immediately
  const sessionKey = `oembed_${btoa(url).slice(0, 24)}`;
  const cached = sessionStorage.getItem(sessionKey);
  if (cached) {
    try {
      renderEmbedPreview(JSON.parse(cached));
      return; // Done — no network call needed
    } catch (_) { /* fall through to network */ }
  }

  // Show skeleton loader while network call is in flight
  showEmbedSkeleton();

  try {
    const res = await fetch(
      `/.netlify/functions/oembed-proxy?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(8000) } // 8s client timeout
    );

    if (!res.ok) {
      const err = await res.json();
      showEmbedError(oembedErrorCopy(err.code));
      return;
    }

    const data = await res.json();

    // Cache in sessionStorage for instant re-use this session
    sessionStorage.setItem(sessionKey, JSON.stringify(data));

    hideEmbedSkeleton();
    renderEmbedPreview(data);

  } catch (err) {
    hideEmbedSkeleton();
    if (err.name === 'TimeoutError') {
      showEmbedError("That platform is slow right now — try again in a moment.");
    } else {
      showEmbedError("Couldn't load a preview for that URL.");
    }
  }
}
```

The skeleton loader is a simple shimmer card — not a spinner. It sets the correct height expectation so the page does not jump when the embed resolves. The transition from skeleton to embed uses `opacity: 0 → 1` over 150ms.

---

## Moment 2: The Embed That Looks Native

**What it is:** Spotify, SoundCloud, and YouTube embeds on the artist profile page do not look like iframes pasted into a webpage. They are contained, rounded, and sized to the same visual rhythm as every other card on the page. The Spotify embed uses the compact player (height 80px), not the full player. The SoundCloud embed uses the visual player. The YouTube embed hides the default chrome via `?controls=0` until the fan taps it.

**Why it's 20/10:** Every platform that supports embeds has the same problem: the embed looks foreign. It has its own colour scheme, its own typography, its own spacing. ABLE's approach is not to customise the embed's internals (impossible for iframes) but to control the container — the border-radius, the shadow, the margin, the background behind the iframe — so the embed appears to belong to the page. The fan does not think "this is a Spotify player." They think "this is the track." The technical constraint of iframes is solved by excellent containment.

**Exact implementation:**

```css
/* Shared embed container — used for all oEmbed iframes */
.able-embed-wrap {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  background: var(--color-card);

  /* Prevent iframe from bleeding outside border-radius on Safari */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

/* Spotify compact player */
.able-embed-wrap--spotify {
  height: 80px;
}

/* SoundCloud visual player */
.able-embed-wrap--soundcloud {
  height: 166px;
}

/* YouTube — 16:9 ratio via padding trick */
.able-embed-wrap--youtube {
  padding-top: 56.25%;
  height: 0;
}

.able-embed-wrap--youtube iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}

/* All embed iframes */
.able-embed-wrap iframe {
  width: 100%;
  border: none;
  display: block;
}
```

The `onerror` fallback for any embed failure shows the thumbnail image (from `oembedData.thumbnailUrl`) with a play button overlay — the embed never leaves a blank box.

---

## Moment 3: The Artist Pastes Any URL and It Just Works

**What it is:** An artist pastes a Spotify track URL. ABLE resolves it, embeds the Spotify compact player, and shows the track title and artist name below the player. They paste a YouTube URL. Same result, different player. SoundCloud. Same. The artist does not select a platform from a dropdown. They do not choose embed type. They paste. It works. The platform is detected, the correct embed is constructed, the preview renders.

**Why it's 20/10:** Asking an artist to select a platform type before pasting a URL is friction. It implies the platform might not recognise their URL. Every dropdown is a micro-doubt. When ABLE resolves any supported URL without a dropdown, it communicates confidence: we know what this is. The artist pastes and moves on. The security model (ALLOWED_HOSTS hostname allowlist) ensures this confidence is backed by a robust implementation — not a regex that can be bypassed, but a parsed hostname check that is exact and explicit.

**Exact implementation:**

The `isSafeMediaUrl()` function from PATH-TO-10.md P0 is the security foundation. The UX is built on top of it:

```javascript
// In admin.html and start.html — handles any URL paste in an embed field
// No platform selection dropdown. Just paste.
document.getElementById('embedUrlInput').addEventListener('paste', async (e) => {
  const pastedText = (e.clipboardData || window.clipboardData).getData('text');
  if (!pastedText) return;

  // Brief delay — let the paste complete into the input
  await new Promise(r => setTimeout(r, 50));

  const url = document.getElementById('embedUrlInput').value.trim();
  if (!url.startsWith('http')) return;

  await resolveOEmbed(url);
});

// Also handle direct typing (debounced — fires 800ms after last keypress)
let embedDebounce;
document.getElementById('embedUrlInput').addEventListener('input', (e) => {
  clearTimeout(embedDebounce);
  embedDebounce = setTimeout(() => {
    const url = e.target.value.trim();
    if (url.startsWith('http') && url.length > 15) {
      resolveOEmbed(url);
    }
  }, 800);
});
```

Error copy for unsupported platforms — shown inline below the input field:

```javascript
function oembedErrorCopy(code) {
  const map = {
    'UNSUPPORTED_HOST':   "We don't support embeds from that platform yet. Try YouTube, Spotify, or SoundCloud.",
    'PROVIDER_NOT_FOUND': "That track or album wasn't found — double check the URL.",
    'PROVIDER_TIMEOUT':   "That platform is slow right now. Try again in a moment.",
    'PROVIDER_ERROR':     "Couldn't reach that platform. Try again shortly.",
    'INVALID_URL':        "That doesn't look like a valid URL.",
  };
  return map[code] || "Couldn't load a preview for that URL.";
}
```

---

## The 20/10 test

You know the oEmbed proxy has crossed into extraordinary when an artist shares their page with a friend and the friend asks "did you build that player yourself?" — because the embed looks like it was designed for the page, not dropped into it.
