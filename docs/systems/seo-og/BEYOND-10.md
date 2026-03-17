# SEO + Open Graph — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the share card that makes a stranger tap before they've read a word — and the Google result that shows the artist's name and story, not "Artist on ABLE."

---

## Moment 1: The Campaign-State Share Card

**What it is:** The OG image dynamically reflects the artist's current campaign state — a pre-release image includes a countdown badge, a live-window image includes a "Out now" banner, a gig-mode image reads "On tonight." The image changes with the page without any action from the artist.

**Why it's 20/10:** A fan shares the link the morning of a release. Everyone who receives the WhatsApp preview sees an image that says "Out now." The artist did nothing. The card already knew. This is the kind of moment that gets screenshotted and reposted — not because it's flashy, but because it's attentive.

**Exact implementation:**

The Netlify OG function (from SPEC.md §6 Option B) reads `stateOverride` from the Supabase profile before rendering the canvas:

```javascript
// netlify/functions/og.js — additions to the existing spec
const state = profile.state_override || 'profile'

// State badge — overlaid bottom-left of artwork zone
const BADGE = {
  'pre-release': { text: 'Coming soon', bg: '#1a1b2e', accent: profile.accent_color },
  'live':        { text: 'Out now',     bg: '#1a1b2e', accent: '#4caf82' },
  'gig':         { text: 'On tonight',  bg: '#1a1b2e', accent: '#f4b942' },
  'profile':     null
}

if (BADGE[state]) {
  const b = BADGE[state]
  // Draw pill badge: bottom-left, 16px padding, accent border
  ctx.fillStyle = b.bg
  roundRect(ctx, 16, 590, 160, 28, 14)
  ctx.fillStyle = b.accent
  ctx.font = 'bold 13px DM Sans'
  ctx.fillText(b.text, 32, 609)
}
```

OG image URL becomes: `https://ablemusic.co/api/og?artist=nadia&v={updated_at_unix_timestamp}` — the `v` parameter busts the CDN cache when campaign state changes. The artist's Supabase `updated_at` timestamp provides this automatically.

**Cache-Control header:** `public, max-age=3600` (1-hour cache) — balances CDN performance with state freshness.

---

## Moment 2: The Google Result That Reads Like a Person

**What it is:** When an artist's page appears in Google search results, the snippet reads like a byline, not a platform listing. For an artist with an upcoming show: "Nadia Rose · Music, shows & more — 'Playing London this Thursday. Pre-save my new single Flicker.'" The description pulls from the artist's actual bio and current campaign state, formatted for the 155-character snippet limit.

**Why it's 20/10:** Almost every artist's current Google result says "Linktree | @nadiaxrose" or worse, nothing. An ABLE result that reads like the artist's own words is the first time they've seen their name in search and felt proud of it. That moment creates word-of-mouth. "Have you seen how my Google result looks now?"

**Exact implementation:**

Extension to the `injectSEO()` function from SPEC.md §1.2. Add a `campaignDesc()` helper that generates a state-aware description:

```javascript
function campaignDesc(profile, state) {
  const name = profile.name || 'Artist'

  if (state === 'pre-release' && profile.releaseTitle) {
    const date = new Date(profile.releaseDate)
    const days = Math.ceil((date - Date.now()) / 86400000)
    return `${name} — '${profile.releaseTitle}' drops in ${days} day${days !== 1 ? 's' : ''}. Pre-save now.`
  }

  if (state === 'live' && profile.releaseTitle) {
    return `${name} — '${profile.releaseTitle}' is out now. Stream it, get tickets, stay close.`
  }

  if (state === 'gig' && profile.gigVenue) {
    return `${name} — Playing ${profile.gigVenue} tonight. Get tickets and find out more.`
  }

  // Default: bio-first, 155-char cap
  const bio = (profile.bio || '').replace(/\s+/g, ' ').trim()
  const base = bio ? bio.substring(0, 120) : `${name}'s music, shows, and more — direct from the artist.`
  return base.length < bio.length ? base + '…' : base
}
```

Called inside `injectSEO()` before the existing `setMeta` block:

```javascript
const currentState = computePageState(profile)  // existing function
const desc = campaignDesc(profile, currentState)
setMeta('meta-description', desc)
setMeta('og-description', desc)
setMeta('tw-description', desc)
```

---

## Moment 3: iMessage and WhatsApp Previews That Work Before SSR

**What it is:** Every ABLE artist profile link shared in iMessage or WhatsApp shows the artist's name, artwork, and a real description — not "Artist on ABLE." This works even before server-side rendering is live, using a lightweight Netlify On-demand Builder that pre-renders only the `<head>` of the page server-side, at the URL the artist actually shares.

**Why it's 20/10:** Artists share their link in group chats. The preview is the first impression. An artist who shares `ablemusic.co/nadiaxrose` in a chat and sees their own artwork appear in the preview — that is the moment they believe the product is real. It costs the artist nothing. It costs ABLE a Netlify function and a `_redirects` rule.

**Exact implementation:**

Level 2 canonical setup from SPEC.md §7 — `_redirects` file routes clean URLs to the HTML file with a query param:

```
# _redirects
/:handle  /able-v7.html?h=:handle  200
```

Netlify On-demand Builder (not a full ODB render — just the `<head>` swap) using the `@netlify/functions` Edge Function pattern:

```javascript
// netlify/edge-functions/artist-head.js
export default async (request, context) => {
  const handle = new URL(request.url).searchParams.get('h')
  if (!handle) return context.next()

  const { data: profile } = await supabase
    .from('profiles').select('name,bio,artwork_url,handle').eq('handle', handle).single()

  if (!profile) return context.next()

  // Fetch the base HTML, inject head tags, return
  const response = await context.next()
  const html = await response.text()

  const title = `${profile.name} — Music, shows & more | ABLE`
  const desc = (profile.bio || `${profile.name}'s music, shows, and more.`).substring(0, 155)
  const image = profile.artwork_url || 'https://ablemusic.co/og-fallback.jpg'

  const injected = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/id="og-title" content="[^"]*"/, `id="og-title" content="${title}"`)
    .replace(/id="og-image" content="[^"]*"/, `id="og-image" content="${image}"`)
    .replace(/id="og-description" content="[^"]*"/, `id="og-description" content="${desc}"`)
    .replace(/id="meta-description" content="[^"]*"/, `id="meta-description" content="${desc}"`)

  return new Response(injected, response)
}
```

This runs only on first request per URL (then CDN-cached for 1 hour). WhatsApp and iMessage crawlers see fully populated `<head>` tags. Zero JS required.

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when an artist shares their link in a group chat, sees their artwork and a real sentence of their story appear in the preview, and screenshots it to post as proof that something changed.
