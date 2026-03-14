# ABLE — Discovery & Directory Spec
**Version: 1.0 | Created: 2026-03-13 | Build phase: Phase 10**

ABLE is not an algorithmic discovery platform. The directory exists for one reason: when someone has heard of an artist and wants to find their page, or wants to browse artists in a genre they love, ABLE should be able to help. It is a map, not a recommendation engine.

**What the directory is NOT:**
- Not a TikTok-style "For You" feed
- Not an algorithmic recommendation engine
- Not a promotional platform where artists can pay for placement
- Not a popularity contest

**What the directory IS:**
- A browsable map of artists on ABLE, organised by vibe
- A search tool for finding a specific artist by name
- An editorial layer (hand-curated) that surfaces quality without algorithmic manipulation

---

## URL structure

```
able.fm/artists              → directory home (browse by vibe)
able.fm/artists/electronic   → vibe-filtered browse
able.fm/artists/search?q=... → search results
able.fm/artists/new          → recently joined (last 30 days)
able.fm/artists/playing      → artists with upcoming shows (geo-aware)
```

---

## Directory home (`able.fm/artists`)

### Page structure

**1. Headline**
```
Find artists on ABLE
Independent. Unfiltered. Theirs.
```

**2. Vibe filters (horizontal scroll strip)**
```
[All]  [Electronic]  [Hip Hop]  [R&B]  [Indie]  [Pop]  [Rock]  [Folk]
```
- Accent dot per vibe (each vibe's `--color-accent`)
- Active state: filled pill
- URL updates to `/artists/[vibe]` on tap (no page reload — JS state)

**3. Browse section (below filters)**

Default view: grid of artist cards, 2 columns mobile / 3–4 columns desktop.

```
[Mara J. artwork]       [Novo Amor artwork]
Mara J.                 Novo Amor
R&B · Bristol           Folk · Oxford
3.2k fans on ABLE       1.8k fans on ABLE
```

Sort order (non-algorithmic):
- Recently active (last snap card or release in last 30 days) first
- Then alphabetical by artist name
- No sorting by follower count or streams — this would entrench existing inequality

**Artist cards show:**
- Hero artwork (60px square, rounded `--r-md`)
- Artist name
- Vibe + city
- Fan count on ABLE (only if artist has opted in to show it — off by default)
- If showing fan count: real number only. Never approximated.

**4. Now playing near you (conditional)**

Only shown to users with location enabled (or manually set city).
```
Playing near Bristol
──────────────────────────────────────────
[Mara J.]     SWX · Fri 21 Mar
[Fontaines]   O2 Academy · Sat 5 Apr
```
- Powered by events table (Bandsintown-synced)
- Up to 5 events shown, "See all shows near you →" link

**5. New to ABLE (last 30 days)**
```
Just joined
──────────────────────────────────────────────────
[artwork] [artwork] [artwork] [artwork] [artwork]
```
- Horizontal scroll strip, 5 cards
- Only artists who have completed their profile (name + bio + at least 1 CTA + accent set)
- "Joined this week" label in `--color-text-3`

**6. Hand-picked (editorial — by ABLE team)**
```
ABLE Recommends
──────────────────────────────────────────
[Greentea Peng]         [Loyle Carner]
R&B · London            Hip Hop · London
```
- Manually curated by the ABLE team (no algorithm)
- Refreshed weekly
- Stored in a `featured_artists` table (admin-only write access)
- The editorial voice: same restraint as all ABLE copy. No superlatives. "Artists we've been listening to lately." Never "THESE ARE THE BEST ARTISTS ON ABLE."
- Free tier artists can appear in editorial picks — this is not a paid feature

---

## Vibe-filtered view (`able.fm/artists/[vibe]`)

- Header: vibe name in vibe display font, vibe accent colour background tint
- Same grid layout as directory home, filtered to that vibe only
- Short vibe descriptor line:
  - Electronic: "Precise. Atmospheric. Club-ready."
  - Hip Hop: "Direct. Confident. Present."
  - R&B/Soul: "Warm. Intimate. Late-night."
  - Indie/Alt: "Honest. Unforced. Guitar-warm."
  - Pop: "Hook-forward. Bright. Accessible."
  - Rock/Metal: "Amplified. Physical. No apology."
  - Folk/Acoustic: "Unhurried. Lyric-forward. Made slowly."

---

## Search (`able.fm/artists/search`)

**Search field:**
- Full-width, prominent
- Placeholder: "Search by name or location"
- `type="search"`, `inputmode="text"`, `autocomplete="off"`

**Search matches against:**
- `profiles.name` (fuzzy, case-insensitive)
- `profiles.handle`
- `profiles.location`

**Results layout:**
- Inline below the search field (no page reload)
- Same 2-col card grid
- Debounce: 300ms before API call
- Min 2 characters before searching

**No results state:**
```
No artists found for "[query]"
They might not be on ABLE yet.
```
- Do NOT show: "Did you mean...?" autocorrect suggestions. If they're not on ABLE, they're not on ABLE.
- Do NOT suggest: "Here are similar artists you might like." This is search, not recommendation.

---

## SEO and indexability

Every artist profile is publicly indexable. The directory gives search engines a crawlable path to every artist.

### Meta tags per artist profile (`able-v5.html`)
```html
<title>[Artist Name] — ABLE</title>
<meta name="description" content="[Bio first sentence]. Releases, shows, and fan sign-up at able.fm/[handle]">
<meta property="og:title" content="[Artist Name]">
<meta property="og:description" content="[Bio first sentence]">
<meta property="og:image" content="[og:image URL — dynamically generated by Worker]">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://able.fm/[handle]">
<meta name="twitter:card" content="summary_large_image">
```

### OG image generation (Worker)
- Background: `--color-bg` for that artist's theme
- Artist artwork: left half, full-bleed
- Right half: artist name in vibe display font, genre + city, "On ABLE" wordmark
- Generated on-demand, cached in R2 for 24h
- Endpoint: `able.fm/og/[handle].png`

### Sitemap
- `able.fm/sitemap.xml` — auto-generated, lists all public profiles
- Updated on new profile creation + updates
- Max 50,000 URLs per sitemap; split into `sitemap-1.xml` etc. as needed

### `robots.txt`
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Sitemap: https://able.fm/sitemap.xml
```

---

## What artists see in their dashboard (directory settings)

In admin.html → Settings → Discoverability:

```
Appear in ABLE directory
☑ Show my profile in the artist directory
☐ Show my fan count on my directory card
☑ Appear in "Playing near [city]" when I have upcoming shows

My vibe in the directory:   [Indie / Alt ▾]
My city:                    [Bristol      ]
```

- Directory opt-in is ON by default (privacy-conscious artists can opt out)
- Fan count opt-in is OFF by default
- Vibe and city can be changed without affecting profile (but they're pre-filled from wizard)

---

## What never appears in the directory

- Superfan scores or fan tier counts (private data)
- Revenue or earnings
- Social follower counts (not on ABLE, not mentioned)
- Artists who have opted out
- Incomplete profiles (no bio, no accent set, no CTA) — they appear in search but not in browse

---

## Technical notes for Phase 10

- Directory home is a server-rendered page (Worker generates HTML from D1 query) — fast first paint, no JS dependency for content
- Vibe filter and search switch to client-side JS after initial load
- Artist cards lazy-load: intersection observer, artwork fades in as cards scroll into view
- Search uses `LIKE '%query%'` on name/handle/location — full-text search (FTS5) upgrade in Phase 2 if needed
- Rate limit on search: 30 requests per IP per minute

---

*The directory is ABLE's public face. Every artist page on the web links back to `able.fm`. The directory should feel like flipping through a well-curated record shop — not browsing a streaming app. Quality over quantity. Restraint over maximalism.*
