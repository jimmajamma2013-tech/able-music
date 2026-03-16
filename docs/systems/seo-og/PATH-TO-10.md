# SEO + Open Graph System — Path to 10
**Date: 2026-03-15 | Revised: 2026-03-16**
**Current score: 5.7/10 → Target: 9.5/10 (spec-complete)**

---

## What this doc is

A prioritised execution plan in three levels. Each level specifies exact changes, files, and the score improvement unlocked. Work top-to-bottom.

---

## P0 — Close the critical gaps (current 5.7 → 7.5)

These are regressions or near-regressions that actively hurt ABLE today. Every P0 item can be shipped in a single session without backend changes.

---

### P0.1 — Fix `og:image` blank card problem

**File**: `able-v7.html`
**The critical bug**: `injectSEO()` currently sets `og:image` to `artworkUrl` without checking if it's a real URL. `data:` and `blob:` URLs are invisible to social crawlers — artists sharing their link get blank preview cards on every platform.

**Why `data:` URIs appear:** Artists who upload artwork via a local file picker get a `data:` base64 string in the profile. This string is thousands of characters long and is stored in localStorage. Social crawlers (Facebook, Twitter, iMessage, WhatsApp) make an HTTP request to the URL in `og:image`. A `data:` URI is not an HTTP URL — the request silently fails, producing a blank card.

**The fix — in `injectSEO()`, add a URL scheme check before assigning the OG image:**

```javascript
// Current (broken for local file uploads):
// setMeta('og-image', art)

// Fix — add this scheme check:
const FALLBACK_OG = 'https://ablemusic.co/og-fallback.jpg'
const artUrl = profile.topCard?.artworkUrl || ''
const ogImage = (artUrl.startsWith('https://') || artUrl.startsWith('http://'))
  ? artUrl
  : FALLBACK_OG
setMeta('og-image', ogImage)
setMeta('tw-image', ogImage)  // twitter:image needs the same value — see P0.3
```

**Also required**: The fallback OG image file must actually exist at `https://ablemusic.co/og-fallback.jpg`. Until it does, the fallback points to a 404 and the card is still blank. Design spec in P1.5 below.

**Static HTML fix** — change the default content of the og:image tag from empty string to the fallback:
```html
<!-- Current (broken): -->
<meta property="og:image" id="og-image" content="">

<!-- Fix: -->
<meta property="og:image" id="og-image" content="https://ablemusic.co/og-fallback.jpg">
```

**Score impact**: OG image dimension 4/10 → 6.5/10 (still not perfect — fallback only works once the file exists and is deployed)

---

### P0.2 — Fix missing `<meta name="description">` update

**File**: `able-v7.html`
**The bug**: `injectSEO()` calls `setMeta('og-description', ...)` but the `<meta name="description">` tag does not have an `id` attribute, so it is never updated. Google's search snippets for artist pages show the generic fallback "Artist profile powered by ABLE."

**Change 1** (HTML): Add `id="meta-description"` to the existing description tag:
```html
<!-- Current: -->
<meta name="description" content="Artist profile powered by ABLE">

<!-- Fix: -->
<meta name="description" id="meta-description" content="Artist profile powered by ABLE">
```

**Change 2** (JS): Add to `injectSEO()`:
```javascript
// After computing desc (155-char cap):
setMeta('meta-description', desc)
```

**Score impact**: Meta description 5/10 → 7/10

---

### P0.3 — Add missing Twitter tags to artist profile

**File**: `able-v7.html`
**The bug**: `twitter:image` and `twitter:site` are present on landing.html but absent from able-v7.html. Twitter may fall back to `og:image` but the explicit tag is more reliable and required for guaranteed `summary_large_image` rendering.

**Change** (HTML): Add two tags to `<head>`:
```html
<meta name="twitter:image" id="tw-image"   content="https://ablemusic.co/og-fallback.jpg">
<meta name="twitter:site"  content="@ablefm">
```

**Change** (JS): In `injectSEO()`, `setMeta('tw-image', ogImage)` — already specified in P0.1 above.

**Score impact**: Twitter/X card 6/10 → 7.5/10

---

### P0.4 — Add noindex to admin.html and fan.html

**File**: `admin.html` and `fan.html`
**The bug**: Neither page has a robots noindex tag. Private dashboards should never appear in search results. admin.html is also missing the tag from `start.html` which already has it correctly.

**admin.html change** — add after `<meta name="theme-color">`:
```html
<meta name="robots" content="noindex, nofollow">
```

**fan.html change** — add after `<meta name="theme-color">`:
```html
<meta name="robots" content="noindex, nofollow">
```

**Score impact**: Robots/noindex 5/10 → 8.5/10

---

### P0.5 — Add `og:image:width` and `og:image:height` to artist profile

**File**: `able-v7.html`
**The bug**: Some platforms (especially Twitter/X) require explicit dimensions for `summary_large_image` to render at full size. Without them, the card may appear as a small thumbnail rather than the large image format.

**Change** (HTML): Add after existing `og:image` tag:
```html
<meta property="og:image:width"  content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt"    id="og-image-alt" content="Artist on ABLE">
```

**Change** (JS): Add to `injectSEO()`:
```javascript
setMeta('og-image-alt', `${name} on ABLE — music, shows & more`)
```

**Score impact**: Minor (+0.2) — but prevents the "thumbnail instead of large card" bug on Twitter/X.

---

### P0.6 — Improve title pattern and description cap

**File**: `able-v7.html`
**The bug**: `"[Name] — ABLE"` is thin. The keyword surface is minimal. Also: no character cap on bio used as description — a 400-character bio will spill or be truncated by crawlers without the ellipsis appearing at a sensible point.

**Change** in `injectSEO()`:
```javascript
// Current:
document.title = `${name} — ABLE`

// Fix:
document.title = `${name} — Music, shows & more | ABLE`

// Add bio capping (add before setMeta calls):
const desc = rawBio
  ? rawBio.replace(/\s+/g, ' ').trim().substring(0, 152) + (rawBio.length > 152 ? '...' : '')
  : `${name}'s music, upcoming shows, and more. Follow on ABLE for direct updates.`
```

**Score impact**: Title tags 6/10 → 7/10, OG description 6/10 → 7/10

---

### P0 total score after: ~7.5/10

---

## P1 — Strengthen the system (7.5 → 8.5)

These require more thought but no backend changes.

---

### P1.1 — Add `<link rel="canonical">` to able-v7.html

**File**: `able-v7.html`
**The bug**: `og:url` is set (social sharing only). `<link rel="canonical">` for Google deduplication is absent. These are separate things and both are needed.

**Change** (HTML): Add to `<head>`:
```html
<link rel="canonical" id="canonical-url" href="https://ablemusic.co/">
```

**Change** (JS): Add to `injectSEO()`:
```javascript
const setHref = (id, val) => {
  const el = document.getElementById(id)
  if (el) el.setAttribute('href', val)
}
setHref('canonical-url', url)
```

Note: the canonical will be JS-set, which Google sees eventually but not on first crawl. The long-term solution is server-side rendering (see P2). This is still better than nothing.

**Score impact**: Canonical URL 5.5/10 → 7/10

---

### P1.2 — Strengthen structured data with `sameAs` and `@id`

**File**: `able-v7.html`
**The bug**: The current `MusicGroup` JSON-LD is missing `@id` (required for Knowledge Graph linking) and `sameAs` (how Google connects the schema node to known entities on Spotify, Instagram, etc.).

**Change** in `_injectStructuredData()`:
```javascript
const artistNode = {
  '@type':       'MusicGroup',
  '@id':         url,           // canonical IRI for the entity — required for Knowledge Graph
  name,
  description:   profile.bio || '',
  url,
  image:         image || undefined,
  genre:         profile.genres || [],
  sameAs: [                     // link to verified platform profiles
    profile.spotifyUrl,
    profile.appleMusicUrl,
    profile.instagramUrl,
    profile.tiktokUrl,
    profile.youtubeUrl,
  ].filter(Boolean),
}
```

**Score impact**: Structured data 7/10 → 8.5/10

---

### P1.3 — Add structured data to landing.html

**File**: `landing.html`
**The bug**: Landing has no structured data. An `Organization` schema would help Google connect the ABLE brand across its digital footprint.

**Change** — add before `</head>`:
```html
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

**Score impact**: Landing page SEO 7/10 → 8/10

---

### P1.4 — Update landing.html title and description for search intent

**File**: `landing.html`
**The bug**: The current title doesn't target `link in bio for musicians` — the primary search query for this product category.

**Change**:
```html
<!-- Current: -->
<title>ABLE — Your fans. Direct.</title>
<meta name="description" content="A page that moves with your music...">

<!-- Fix: -->
<title>ABLE — The link-in-bio for musicians | Free forever</title>
<meta name="description" content="The link-in-bio for musicians who mean it. Fans, shows, releases, support — all in one place. Free forever.">
```

Also update matching OG and Twitter title/description tags to stay consistent with the new title.

**Score impact**: Landing page SEO 8/10 → 8.5/10

---

### P1.5 — Create and deploy the platform OG fallback image

**What**: `og-fallback.jpg` is referenced from P0.1 but doesn't exist yet. This is a design task, not a code task, but it is blocking P0 from fully working.

**Spec:**
- Dimensions: 1200×630px
- Format: JPEG, quality 85–90 (file must be under 300KB for all platforms)
- Background: Midnight Navy (`#0d0e1a`)
- ABLE wordmark: white, large (120px+ equivalent), centred horizontally, vertically centred at approximately 50% of height
- Tagline below wordmark: "Your music. Your people." — DM Sans Regular, white at 50% opacity, ~32px equivalent
- Subtle noise texture overlay at ~4% opacity (matches the admin.html grain aesthetic)
- No artist faces, no third-party logos, no QR codes

**Deploy to**: `https://ablemusic.co/og-fallback.jpg`

**Verify**: Load `https://ablemusic.co/og-fallback.jpg` in a browser — the file should return a JPEG. Then paste an artist ABLE URL into the Twitter Card Validator — the fallback image should appear in the card preview.

**Note**: The landing.html OG image is `og-image.jpg` (not `og-fallback.jpg`). Both files are needed. The landing one can be the same design or a variation — ABLE branded, 1200×630. Deploy both.

**Score impact**: Makes P0.1 fully functional. Without this file the fallback is a 404.

---

### P1 total score after: ~8.5/10

---

## P2 — Production-grade (8.5 → 9.5)

These require backend infrastructure and are post-Supabase tasks.

---

### P2.1 — Dynamic OG image generation (V2 approach)

**What**: A Netlify serverless function generates a 1200×630 JPEG per artist on demand, using their real artwork and name. This is the V2 approach that replaces the static fallback with a per-artist social card.

**Endpoint**: `GET /api/og?artist=nadia` → `image/jpeg`

**The `og:image` tag that must go in every artist profile's `<head>`** (set by JS in V2):
```html
<meta property="og:image" id="og-image"
      content="https://ablemusic.co/api/og?artist=nadia">
```

**V1 approach (static fallback — implement now):**
```html
<!-- Single hosted JPEG for all artists — use until V2 dynamic generation is live -->
<meta property="og:image" id="og-image"
      content="https://ablemusic.co/og-fallback.jpg">
```

**V2 Netlify function implementation:**
```javascript
// netlify/functions/og.js
const { createCanvas, loadImage } = require('canvas')  // npm: canvas

exports.handler = async (event) => {
  const slug    = event.queryStringParameters.artist
  if (!slug) return { statusCode: 400, body: 'Missing artist param' }

  // Fetch profile from Supabase
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url, bio, accent')
    .eq('artist_slug', slug)
    .single()

  if (!profile) return { statusCode: 404, body: 'Artist not found' }

  const canvas = createCanvas(1200, 630)
  const ctx    = canvas.getContext('2d')

  // Dark background using artist's accent or fallback navy
  ctx.fillStyle = '#0d0e1a'
  ctx.fillRect(0, 0, 1200, 630)

  // Artist artwork — left square (630×630)
  if (profile.avatar_url?.startsWith('https://')) {
    try {
      const img = await loadImage(profile.avatar_url)
      ctx.drawImage(img, 0, 0, 630, 630)
      // Fade right edge into navy
      const grad = ctx.createLinearGradient(380, 0, 630, 0)
      grad.addColorStop(0, 'rgba(13,14,26,0)')
      grad.addColorStop(1, 'rgba(13,14,26,1)')
      ctx.fillStyle = grad
      ctx.fillRect(380, 0, 250, 630)
    } catch (e) { /* artwork load failed — continue without it */ }
  }

  // Artist name — right side
  ctx.fillStyle = '#ffffff'
  ctx.font      = 'bold 72px "Barlow Condensed", sans-serif'
  ctx.fillText(profile.name || 'Artist', 670, 280)

  // Artist bio (first line, capped)
  if (profile.bio) {
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font      = '28px "DM Sans", sans-serif'
    const bioLine = profile.bio.substring(0, 55) + (profile.bio.length > 55 ? '...' : '')
    ctx.fillText(bioLine, 670, 330)
  }

  // ABLE wordmark — bottom right
  ctx.fillStyle = 'rgba(255,255,255,0.35)'
  ctx.font      = '24px "DM Sans", sans-serif'
  ctx.fillText('ABLE', 670, 590)

  return {
    statusCode: 200,
    headers: {
      'Content-Type':  'image/jpeg',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
    body:            canvas.toBuffer('image/jpeg', { quality: 0.92 }).toString('base64'),
    isBase64Encoded: true,
  }
}
```

**When to build**: After Supabase Storage is live and artwork URLs are real `https://` URLs.

**Score impact**: OG image 6.5/10 → 9.5/10. The single biggest quality jump in the whole system.

---

### P2.2 — Server-side head rendering (Netlify On-demand Builders)

**What**: Pre-render the `<head>` content with artist-specific title, description, and canonical URL before serving the page. This means crawlers (iMessage, WhatsApp, Facebook, Google's first crawl) see the artist's content immediately — without waiting for JS to execute.

**Why it matters**: Without this, iMessage and WhatsApp link previews always show fallback content. JS never runs in those crawlers. This is the fundamental ceiling of client-side-only SEO.

**Approach**:
- Netlify On-demand Builder function handles `GET /[slug]`
- Fetches profile from Supabase
- Returns `able-v7.html` with `<head>` populated with artist-specific meta tags
- Response is cached at CDN edge for 1 hour

**Score impact**: Canonical URL 7/10 → 10/10, iMessage/WhatsApp previews begin working.

---

### P2.3 — Sitemap.xml generation

**What**: A sitemap listing all public artist profile URLs. Helps Google discover and crawl profiles.

**Generated by**: a Netlify scheduled function (`netlify/functions/sitemap.js`) that queries Supabase for all public profiles.

**`robots.txt`** — must also exist:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /start
Sitemap: https://ablemusic.co/sitemap.xml
```

**Score impact**: Discoverability housekeeping. Ensures crawl budget isn't wasted.

---

### P2.4 — Performance: preload OG image (client-side)

When artwork URL is a real `https://` URL (post-Supabase), preload it to improve LCP:
```javascript
// In injectSEO(), after ogImage is resolved:
if (ogImage !== FALLBACK_OG) {
  const link = document.createElement('link')
  link.rel  = 'preload'
  link.as   = 'image'
  link.href = ogImage
  document.head.appendChild(link)
}
```

**Score impact**: Performance improvement — Lighthouse LCP improves. Not a direct SEO score change but affects Core Web Vitals ranking factor.

---

### P2 total score after: ~9.5/10

---

## What gets to 10/10

A score of 10/10 is a real-world validation score, not a spec-complete score. It requires:

1. Lighthouse SEO audit showing 100/100 on a live artist profile URL
2. Google Search Console indexing confirmed — artist profiles appearing in search results
3. Google Knowledge Panel appearing for at least one artist (confirms structured data is read)
4. Social sharing manually tested and verified on Twitter/X, iMessage, WhatsApp, and Instagram Stories link sticker
5. Twitter Card Validator showing `summary_large_image` rendering correctly with artwork — after static OG image is created and deployed = 8.5/10; after dynamic per-artist OG image via Netlify function = 9.5/10; after all meta tags verified via Twitter Card Validator = 10/10
6. Facebook Debugger (`developers.facebook.com/tools/debug/`) showing correct OG data
7. Search result snippets showing artist bio, not platform fallback copy

**Estimated timeline**: P0 → 1 session. P1 → 1–2 sessions (plus design task for og-fallback.jpg). P2 → post-backend, 2–3 sessions. Score of 10 → requires live traffic + GSC data (weeks/months after launch).

---

## Score milestone table

| Milestone | Score | Key unlock |
|---|---|---|
| Current | 5.7/10 | — |
| After P0 (critical gaps closed) | 7.5/10 | URL check in injectSEO(); twitter:image added; noindex on admin/fan |
| After P0 + `og-fallback.jpg` deployed | 8/10 | Fallback card shows ABLE brand instead of 404 |
| After P1 (strengthened) | 8.5/10 | Canonical link tag; sameAs in structured data; landing title/desc updated |
| After static OG image created and deployed | **8.5/10** | Twitter Card Validator shows real image |
| After P2.1 (dynamic per-artist OG image) | **9.5/10** | Every artist gets their artwork in share cards |
| After all meta tags verified via Twitter Card Validator | **10/10** | Live validation across all major platforms |

---

## Summary

| Level | Score | Effort | Requires backend? |
|---|---|---|---|
| P0 (close gaps) | 7.5/10 | 1 session | No |
| P1 (strengthen) | 8.5/10 | 1–2 sessions | No (except fallback image design) |
| Static OG image created | 8.5/10 | Design task | No (just deploy the file) |
| P2 (production) | 9.5/10 | 2–3 sessions | Yes (Supabase + Netlify) |
| Twitter Card Validator verified | 10/10 | Post-launch validation | Yes (live URL required) |
