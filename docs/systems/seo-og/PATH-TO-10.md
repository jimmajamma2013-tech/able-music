# SEO + Open Graph System — Path to 10
**Date: 2026-03-15**
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
**What**: `injectSEO()` currently sets `og:image` to `artworkUrl` without checking if it's a real URL. `data:` and `blob:` URLs are invisible to social crawlers — artists sharing their link get blank preview cards.

**Change**: In `injectSEO()`, add a URL scheme check before assigning the OG image. Also update the static fallback in the HTML from `content=""` to the platform fallback URL.

```javascript
// Current (broken for local file uploads):
setMeta('og-image', art)

// Fix:
const FALLBACK_OG = 'https://ablemusic.co/og-fallback.jpg'
const ogImage = (art.startsWith('https://') || art.startsWith('http://'))
  ? art : FALLBACK_OG
setMeta('og-image', ogImage)
setMeta('tw-image', ogImage)  // also needs to exist — see P0.3
```

**Also**: Create the fallback OG image file at `og-fallback.jpg` (1200×630, dark navy, ABLE wordmark). Until this file exists the fallback is still broken.

**Score impact**: +0.8 (OG image dimension goes from 4 to 6.5)

---

### P0.2 — Fix missing `<meta name="description">` update
**File**: `able-v7.html`
**What**: `injectSEO()` calls `setMeta('og-description', ...)` but the `<meta name="description">` tag does not have an `id` attribute, so it is never updated. Google's search snippets for artist pages show "Artist profile powered by ABLE".

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

**Score impact**: +0.5 (meta description dimension goes from 5 to 7)

---

### P0.3 — Add missing Twitter tags to artist profile
**File**: `able-v7.html`
**What**: `twitter:image` and `twitter:site` are present on landing.html but absent from able-v7.html. Twitter may fall back to `og:image` but the explicit tag is more reliable.

**Change** (HTML): Add two tags to `<head>`:
```html
<meta name="twitter:image" id="tw-image"   content="https://ablemusic.co/og-fallback.jpg">
<meta name="twitter:site"  content="@ablefm">
```

**Change** (JS): Already specified in SPEC.md — `setMeta('tw-image', ogImage)`.

**Score impact**: +0.3 (Twitter dimension goes from 6 to 7)

---

### P0.4 — Add noindex to admin.html and fan.html
**File**: `admin.html` and `fan.html`
**What**: Neither page has a robots noindex tag. Private dashboards should never appear in search results.

**admin.html change** — add after `<meta name="theme-color">`:
```html
<meta name="robots" content="noindex, nofollow">
```

**fan.html change** — add after `<meta name="theme-color">`:
```html
<meta name="robots" content="noindex, nofollow">
```

**Score impact**: +0.5 (robots/noindex dimension goes from 5 to 8)

---

### P0.5 — Add `og:image:width` and `og:image:height` to artist profile
**File**: `able-v7.html`
**What**: Some platforms (especially Twitter/X) require explicit dimensions for `summary_large_image` to render at full size.

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

**Score impact**: +0.2

---

### P0.6 — Improve title pattern and description cap
**File**: `able-v7.html`
**What**: `"[Name] — ABLE"` is thin. `"[Name] — Music, shows & more | ABLE"` adds keyword surface without being spammy. Also add the 155-char cap on bio used as description.

**Change** in `injectSEO()`:
```javascript
// Current:
document.title = `${name} — ABLE`

// Fix:
document.title = `${name} — Music, shows & more | ABLE`

// Add bio capping:
const desc = rawBio
  ? rawBio.replace(/\s+/g, ' ').trim().substring(0, 152) + (rawBio.length > 152 ? '...' : '')
  : `${name}'s music, upcoming shows, and more. Follow on ABLE for direct updates.`
```

**Score impact**: +0.3 (title dimension goes from 6 to 7, description from 6 to 7)

---

### P0 total score after: ~7.5/10

---

## P1 — Strengthen the system (7.5 → 8.5)

These require more thought but no backend changes.

---

### P1.1 — Add `<link rel="canonical">` to able-v7.html
**File**: `able-v7.html`
**What**: `og:url` is set (social sharing only). `<link rel="canonical">` for Google deduplication is absent.

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

**Score impact**: +0.5

---

### P1.2 — Strengthen structured data with `sameAs` and `@id`
**File**: `able-v7.html`
**What**: The current `MusicGroup` JSON-LD is missing `@id` (required for Knowledge Graph linking) and `sameAs` (how Google connects the schema node to known entities on Spotify, Instagram, etc.).

**Change** in `_injectStructuredData()`:
```javascript
const artistNode = {
  '@type':       'MusicGroup',
  '@id':         url,           // add this — canonical IRI for the entity
  name,
  description:   profile.bio || '',
  url,
  image:         image || undefined,
  genre:         profile.genres || [],
  sameAs: [                     // add this — populate from profile link fields
    profile.spotifyUrl,
    profile.appleMusicUrl,
    profile.instagramUrl,
    profile.tiktokUrl,
    profile.youtubeUrl,
  ].filter(Boolean),
}
```

**Score impact**: +0.5 (structured data goes from 7 to 8.5)

---

### P1.3 — Add structured data to landing.html
**File**: `landing.html`
**What**: Landing has no structured data. An `Organization` schema would help Google connect the ABLE brand across its digital footprint.

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

**Score impact**: +0.3 (landing page SEO from 7 to 8)

---

### P1.4 — Update landing.html title and description for search intent
**File**: `landing.html`
**What**: The current title doesn't target `link in bio for musicians` — the money keyword.

**Change**:
```html
<!-- Current: -->
<title>ABLE — Your fans. Direct.</title>
<meta name="description" content="A page that moves with your music...">

<!-- Spec: -->
<title>ABLE — The link-in-bio for musicians | Free forever</title>
<meta name="description" content="The link-in-bio for musicians who mean it. Fans, shows, releases, support — all in one place. Free forever.">
```

Also update matching OG and Twitter title/description tags to stay consistent.

**Score impact**: +0.3 (landing page SEO from 8 to 8.5)

---

### P1.5 — Create the platform OG fallback image
**What**: `og-fallback.jpg` is referenced in P0.1 but doesn't exist yet. This is a design task, not a code task.

Spec:
- Dimensions: 1200×630px
- Format: JPEG, quality 85-90 (keeps file under 300KB)
- Background: Midnight Navy (#0d0e1a)
- ABLE wordmark: white, 120px+, centred horizontally, vertically centred
- Tagline: "Your music. Your people." — DM Sans, white at 50% opacity, 32px, below wordmark
- Subtle noise texture overlay at ~4% opacity

Deploy to: `https://ablemusic.co/og-fallback.jpg`

**Score impact**: Makes P0.1 fully functional. Without this file the fallback is a 404.

---

### P1 total score after: ~8.5/10

---

## P2 — Production-grade (8.5 → 9.5)

These require backend infrastructure and are post-Supabase tasks.

---

### P2.1 — Dynamic OG image generation (Option B)
**What**: A Netlify serverless function generates a 1200×630 JPEG per artist on demand, using their real artwork and name.

**Endpoint**: `GET /api/og?artist=nadia` → `image/jpeg`

Full implementation spec in `SPEC.md §6`.

**When to build**: After Supabase Storage is live and artwork URLs are real `https://` URLs.

**Score impact**: OG image dimension goes from 6.5 to 9.5. The single biggest quality jump in the whole system.

---

### P2.2 — Server-side head rendering (Netlify On-demand Builders)
**What**: Pre-render the `<head>` content with artist-specific title, description, and canonical URL before serving the page. This means crawlers (iMessage, WhatsApp, Google's first crawl) see the artist's content immediately.

**Why it matters**: Without this, iMessage and WhatsApp link previews always show fallback content — the JS never runs in those crawlers.

**Approach**:
- Netlify On-demand Builder function handles `GET /nadia`
- Fetches profile from Supabase
- Returns `able-v7.html` with `<head>` populated
- Response is cached at CDN edge for 1 hour

**Score impact**: Canonical URL dimension 7→10, meta description 7→9.5, overall +1.0

---

### P2.3 — Sitemap.xml generation
**What**: A sitemap listing all public artist profile URLs. Helps Google discover and crawl profiles.

Format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ablemusic.co/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ablemusic.co/nadia</loc>
    <changefreq>weekly</changefreq>
    <lastmod>2026-03-15</lastmod>
    <priority>0.8</priority>
  </url>
  <!-- ... one entry per artist -->
</urlset>
```

Generated by a Netlify scheduled function (`netlify/functions/sitemap.js`) that queries Supabase for all public profiles. Referenced in `robots.txt`:
```
Sitemap: https://ablemusic.co/sitemap.xml
```

**Score impact**: +0.3 (overall discoverability)

---

### P2.4 — robots.txt spec
**What**: The file `https://ablemusic.co/robots.txt` must exist.

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /start
Sitemap: https://ablemusic.co/sitemap.xml
```

Note: `noindex` meta tags on admin/start already block indexing — `robots.txt` Disallow prevents crawling entirely (saves crawl budget).

**Score impact**: Housekeeping. Ensures crawl budget isn't wasted.

---

### P2.5 — Performance: preload OG image
**What**: If the artist's artwork URL is known at serve time, add a `<link rel="preload">` for it. This speeds up LCP (Largest Contentful Paint) which affects Google's Core Web Vitals score.

```html
<!-- Add when artwork URL is known server-side -->
<link rel="preload" as="image" href="[artwork-url]">
```

Client-side equivalent (lower priority but still valid):
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

**Score impact**: Performance-adjacent, not directly an SEO score change. Lighthouse SEO stays at 100 but Core Web Vitals improve.

---

### P2 total score after: ~9.5/10

---

## What gets to 10/10

A score of 10/10 is a real-world validation score, not a spec-complete score. It requires:

1. Lighthouse SEO audit showing 100/100 on a live artist profile URL
2. Google Search Console indexing confirmed — artist profiles appearing in search results
3. Google Knowledge Panel appearing for at least one artist (confirms structured data is read)
4. Social sharing manually tested and verified on Twitter/X, iMessage, WhatsApp, and Instagram Stories link sticker
5. Twitter Card Validator showing `summary_large_image` rendering correctly with artwork
6. Facebook Debugger showing correct OG data (proxy for Instagram Stories)
7. Search result snippets showing artist bio, not platform fallback copy

**Estimated timeline**: P0 → 1 session. P1 → 1-2 sessions. P2 → post-backend, 2-3 sessions. Score of 10 → requires live traffic + GSC data (weeks/months after launch).

---

## Summary

| Level | Score | Effort | Requires backend? |
|---|---|---|---|
| P0 (close gaps) | 7.5/10 | 1 session | No |
| P1 (strengthen) | 8.5/10 | 1-2 sessions | No (except fallback image design) |
| P2 (production) | 9.5/10 | 2-3 sessions | Yes (Supabase + Netlify) |
| 10/10 | 10/10 | Weeks post-launch | Yes (live traffic + GSC) |
