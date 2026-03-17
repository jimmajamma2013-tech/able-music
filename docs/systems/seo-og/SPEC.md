# SEO + Open Graph System — Canonical Spec
**Date: 2026-03-15**
**Target score after full implementation: 9.5/10**

---

## Scope

This spec covers all meta, OG, Twitter/X, structured data, robots, and canonical URL requirements for every ABLE page. It is the single source of truth for what the `<head>` of each page must contain.

---

## 1. able-v7.html (artist profile) — the most important page

### 1.1 Static `<head>` scaffolding

The following tags must be present in the HTML before JS runs. They serve as fallbacks for crawlers that don't execute JS, and as targets for the `injectSEO()` function to populate.

```html
<title>Artist on ABLE</title>

<!-- Standard SEO -->
<meta name="description"  id="meta-description" content="Music, events, and more — direct from the artist.">
<meta name="robots"       content="index, follow">

<!-- Open Graph -->
<meta property="og:type"        content="profile">
<meta property="og:site_name"   content="ABLE">
<meta property="og:title"       id="og-title"       content="Artist on ABLE">
<meta property="og:description" id="og-description" content="Music, events, and more — direct from the artist.">
<meta property="og:url"         id="og-url"         content="">
<meta property="og:image"       id="og-image"       content="https://ablemusic.co/og-fallback.jpg">
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt"   id="og-image-alt"  content="Artist on ABLE">

<!-- Twitter / X -->
<meta name="twitter:card"        content="summary_large_image">
<meta name="twitter:site"        content="@ablefm">
<meta name="twitter:title"       id="tw-title"       content="Artist on ABLE">
<meta name="twitter:description" id="tw-description" content="Music, events, and more — direct from the artist.">
<meta name="twitter:image"       id="tw-image"       content="https://ablemusic.co/og-fallback.jpg">

<!-- Canonical (updated by JS; server-side render for full credit) -->
<link rel="canonical" id="canonical-url" href="https://ablemusic.co/">

<!-- Structured data (populated by injectSEO()) -->
<script type="application/ld+json" id="structured-data">{}</script>
```

Key changes from current state:
- Added `id="meta-description"` to the standard description tag so JS can update it
- Added `og:image:width`, `og:image:height`, `og:image:alt` tags
- Added `twitter:image` (separate from og:image — Twitter prefers this explicit)
- Added `twitter:site` (@ablefm)
- Added `<link rel="canonical" id="canonical-url">` (currently absent)
- Default `og:image` and `twitter:image` point to the platform fallback, not empty string

---

### 1.2 The `injectSEO()` function — full spec

Replace the current `injectSEO()` implementation with this:

```javascript
function injectSEO(profile) {
  const name   = profile.name || 'Artist'
  const rawBio = profile.bio  || ''
  const handle = (profile.handle || name).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const url    = `https://ablemusic.co/${handle}`

  // ── Title ────────────────────────────────────────────────────────
  // Format: "[Name] — Music, shows & more | ABLE"
  // Richer keyword surface than "[Name] — ABLE"
  document.title = `${name} — Music, shows & more | ABLE`

  // ── Meta description (standard — Google uses this for snippets) ──
  // Must update the <meta name="description"> tag, not just OG tags.
  // Cap at 155 characters. If no bio, use the platform description.
  const desc = rawBio
    ? rawBio.replace(/\s+/g, ' ').trim().substring(0, 152) + (rawBio.length > 152 ? '...' : '')
    : `${name}'s music, upcoming shows, and more. Follow on ABLE for direct updates.`
  setMeta('meta-description', desc)

  // ── OG image strategy ────────────────────────────────────────────
  // Option A (V1): Use the artist's uploaded artwork URL directly.
  // IMPORTANT: data: and blob: URLs will NOT work with social crawlers.
  // The image must be a real https:// URL. Until Supabase Storage is live,
  // artists who uploaded images via file picker will get the fallback.
  const FALLBACK_OG = 'https://ablemusic.co/og-fallback.jpg'
  const artUrl = profile.topCard?.artworkUrl || ''
  // Only use artUrl if it's a real https URL — not data: or blob:
  const ogImage = (artUrl.startsWith('https://') || artUrl.startsWith('http://'))
    ? artUrl
    : FALLBACK_OG

  // ── Set all tags ──────────────────────────────────────────────────
  const setMeta = (id, val) => {
    const el = document.getElementById(id)
    if (el) el.setAttribute('content', val)
  }
  const setHref = (id, val) => {
    const el = document.getElementById(id)
    if (el) el.setAttribute('href', val)
  }

  // Standard SEO
  setMeta('meta-description', desc)

  // Open Graph
  setMeta('og-title',       `${name} — Music, shows & more`)
  setMeta('og-description', desc)
  setMeta('og-url',         url)
  setMeta('og-image',       ogImage)
  setMeta('og-image-alt',   `${name} on ABLE`)

  // Twitter / X
  setMeta('tw-title',       `${name} — Music, shows & more`)
  setMeta('tw-description', desc)
  setMeta('tw-image',       ogImage)

  // Canonical
  setHref('canonical-url', url)

  // ── Structured data (JSON-LD) ──────────────────────────────────
  _injectStructuredData(profile, name, url, ogImage)
}
```

Note: `setMeta` needs to be defined before the OG block that calls it, or defined once at the top of the function. The order above assumes hoisting — put the `const setMeta = ...` definition before its first use.

---

### 1.3 Structured data — full spec

```javascript
function _injectStructuredData(profile, name, url, image) {
  const shows = (profile.events || [])
    .filter(e => e.date && new Date(e.date) > new Date())

  // Use MusicArtist for solo artists, MusicGroup for bands.
  // ABLE doesn't distinguish these yet — use MusicGroup as safe default,
  // or conditionally switch on profile.artistType when that field exists.
  const artistNode = {
    '@type':       'MusicGroup',    // update to 'MusicArtist' for solo artists
    '@id':         url,             // canonical IRI — required for Knowledge Graph linking
    name,
    description:   profile.bio || '',
    url,
    image:         image || undefined,
    genre:         profile.genres  || [],
    // sameAs: link to verified platform profiles — high value for Google Knowledge Graph
    // Populate from profile.links when that data is available
    sameAs: [
      profile.spotifyUrl,
      profile.instagramUrl,
      profile.appleMusicUrl,
    ].filter(Boolean),
  }

  const eventNodes = shows.map(e => ({
    '@type':     'Event',
    name:        `${name} at ${e.venue || 'Venue TBC'}`,
    startDate:   e.date,
    ...(e.doorsTime ? { doorTime: e.doorsTime } : {}),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type':   'Place',
      name:      e.venue   || 'Venue TBC',
      address:   e.city    || '',
    },
    performer: { '@type': 'MusicGroup', name },
    organizer: { '@type': 'MusicGroup', name, url },
    url:       e.ticketUrl || url,
    ...(e.ticketUrl ? {
      offers: {
        '@type':       'Offer',
        url:           e.ticketUrl,
        availability:  'https://schema.org/InStock',
        validFrom:     new Date().toISOString(),
      }
    } : {}),
  }))

  const schema = {
    '@context': 'https://schema.org',
    '@graph':   [artistNode, ...eventNodes],
  }

  const el = document.getElementById('structured-data')
  if (el) el.textContent = JSON.stringify(schema, null, 0)
}
```

---

## 2. landing.html

Landing is already in good shape. Required additions only:

```html
<!-- Add inside <head> — currently missing -->
<meta name="robots" content="index, follow">

<!-- Organization structured data — add before </head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ABLE",
  "url": "https://ablemusic.co/",
  "description": "The link-in-bio for musicians. Fans, shows, releases, and support — all in one place.",
  "logo": "https://ablemusic.co/favicon.svg",
  "sameAs": [
    "https://twitter.com/ablefm",
    "https://instagram.com/ablefm"
  ]
}
</script>
```

Title recommendation (current vs spec):

```
Current:  "ABLE — Your fans. Direct."
Spec:     "ABLE — The link-in-bio for musicians | Free forever"
```

Rationale: targets the search query `link in bio for musicians`, which is the most commercially relevant query. "Free forever" answers the first objection.

Meta description (current vs spec):

```
Current:  "A page that moves with your music. Pre-save before the drop..."
Spec:     "The link-in-bio for musicians who mean it. Fans, shows,
           releases, support — all in one place. Free forever."
```

Rationale: front-loads the keyword, shorter and more scannable in SERPs, ends on the strongest differentiator (free + forever).

OG image: the file `https://ablemusic.co/og-image.jpg` must exist and be 1200×630px.

Design spec for the OG image:
- Background: Midnight Navy (#0d0e1a)
- ABLE wordmark (white, large, centred or left-aligned)
- Tagline below: "The link-in-bio for musicians." (DM Sans, white/70% opacity)
- Subtle noise texture or gradient
- No artist faces, no third-party logos

---

## 3. admin.html

Must add noindex. No other SEO work needed.

```html
<!-- Add to <head> — currently missing -->
<meta name="robots" content="noindex, nofollow">
```

Current state: `<title>Dashboard — ABLE</title>` — fine to leave as-is.

---

## 4. start.html

Already has `<meta name="robots" content="noindex, nofollow">`. No changes needed.

---

## 5. fan.html

Currently has no robots tag, no description, no OG tags. It is a personal dashboard.

```html
<!-- Add to <head> -->
<meta name="robots" content="noindex, nofollow">
```

No other SEO work needed. The page should never appear in search results.

---

## 6. OG image strategy — Option A vs Option B

### Option A (V1 — implement now)

Use the artist's `artworkUrl` directly as the OG image. Already implemented in `injectSEO()` — the fix needed is to check the URL scheme and fall back to the platform image if it's a `data:` or `blob:` URL.

```javascript
const ogImage = (artUrl.startsWith('https://') || artUrl.startsWith('http://'))
  ? artUrl
  : 'https://ablemusic.co/og-fallback.jpg'
```

This works once artwork is stored in Supabase Storage (real https:// URLs). For now, any artist who uploaded from a file picker will show the platform fallback instead of a blank card.

Effort: 30 minutes. Deploy: immediate.

### Option B (V2 — design once backend exists)

A Netlify serverless function generates a 1200×630 image dynamically per artist.

```
GET /api/og?artist=nadia
→ Returns: image/jpeg 1200×630
```

Implementation approach (Netlify function):
```javascript
// netlify/functions/og.js
const { createCanvas, loadImage } = require('canvas')  // npm: canvas

exports.handler = async (event) => {
  const slug   = event.queryStringParameters.artist
  const profile = await supabase.from('profiles').select('*').eq('handle', slug).single()

  const canvas  = createCanvas(1200, 630)
  const ctx     = canvas.getContext('2d')

  // Dark background
  ctx.fillStyle = '#0d0e1a'
  ctx.fillRect(0, 0, 1200, 630)

  // Artist artwork (left 630×630 square)
  if (profile.artwork_url) {
    const img = await loadImage(profile.artwork_url)
    ctx.drawImage(img, 0, 0, 630, 630)
    // gradient overlay: fade right edge into navy
    const grad = ctx.createLinearGradient(400, 0, 630, 0)
    grad.addColorStop(0, 'rgba(13,14,26,0)')
    grad.addColorStop(1, 'rgba(13,14,26,1)')
    ctx.fillStyle = grad
    ctx.fillRect(400, 0, 230, 630)
  }

  // Artist name (right side)
  ctx.fillStyle = '#ffffff'
  ctx.font      = 'bold 72px Barlow Condensed'
  ctx.fillText(profile.name, 680, 280)

  // ABLE wordmark (bottom right)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.font      = '28px DM Sans'
  ctx.fillText('ABLE', 680, 580)

  return {
    statusCode: 200,
    headers:    { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=86400' },
    body:       canvas.toBuffer('image/jpeg', { quality: 0.92 }).toString('base64'),
    isBase64Encoded: true,
  }
}
```

Then the OG image tag becomes:
```html
<meta property="og:image" content="https://ablemusic.co/api/og?artist=nadia">
```

Effort: 1-2 days. Requires: Supabase backend live, Node canvas package, Netlify function deployment.

**Recommendation: Option A for V1, Option B for V2.**

---

## 7. Canonical URL architecture

The canonical URL pattern for artist profiles: `https://ablemusic.co/[handle]`

Currently ABLE is a static file deployment — `able-v7.html` is served at `/able-v7.html` or `/`. The canonical URL set by JS (`https://ablemusic.co/nadia`) may not match the actual URL of the page. This is the fundamental ceiling of client-side-only canonicals.

Levels of implementation:

**Level 1 (now)**: Set via JS as already done. Better than nothing. Google will eventually see it.

**Level 2 (with Netlify redirects)**: Add a `_redirects` file so `https://ablemusic.co/nadia` → serves `able-v7.html` with query param `?h=nadia`. JS reads the param to load the right profile. Canonical URL then matches the actual page URL.

**Level 3 (with SSR/pre-rendering)**: Netlify On-demand Builders pre-render the `<head>` server-side before serving. Canonical, title, and description are in the HTML before JS runs. This is what Google (and iMessage/WhatsApp link previews) see.

**Level 3 is the long-term target. Level 1 unblocks social sharing now.**

---

## 8. Platform-specific notes

### iMessage / SMS
- Uses Apple's link preview crawler (Applebot)
- Respects `og:image`, `og:title`, `og:description`
- Does NOT execute JavaScript — sees only the static HTML fallbacks
- This means until SSR is live, iMessage previews always show the fallback content

### WhatsApp
- Uses WhatsApp's own crawler
- Respects `og:image`, `og:title`, `og:description`
- Does NOT execute JavaScript
- Same constraint as iMessage

### Twitter/X
- Twitterbot does execute JavaScript, but results are inconsistent
- Explicit `twitter:image` tag is more reliable than relying on `og:image` fallback
- `summary_large_image` requires image to be at least 300×157px and under 5MB

### Instagram Stories link sticker
- Uses Facebook's crawler (facebookexternalhit)
- Does NOT execute JavaScript
- Respects `og:image`, `og:title`, `og:description`

### LinkedIn
- Respects OG tags
- Caches aggressively — clearing cache via Post Inspector tool needed after changes
