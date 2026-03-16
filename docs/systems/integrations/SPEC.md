# Integrations — Build Spec
**Date: 2026-03-16 | Authority: Primary build spec**

> This is the build-ready specification for all integrations. Build directly from this.
> Research source: `docs/reference/research/INTEGRATIONS_AND_AI_RESEARCH.md` (Parts 1–8).
> Companion: `ANALYSIS.md` (current state scores), `PATH-TO-10.md` (priority list).

---

## Priority 1 — V1 Must-Haves

### 1.1 Spotify Artist Import

**Status:** Netlify function built. Not deployed. Spec complete.
**Spec:** `docs/systems/spotify-import/SPEC.md` (canonical, 10/10)
**API spec:** `docs/apis/spotify.md`

**Key corrected facts (from Part 7 API Reality Check):**
- Monthly listeners is NOT in any public Spotify API endpoint — do not surface this
- `followers.total` is deprecated and is a different metric — do not label as "monthly listeners"
- `popularity` is a 0–100 integer, also deprecated — do not surface as headline metric
- Available without OAuth: name, images, genres, top tracks, full discography, related artists
- Use Last.fm `artist.getInfo` as listener proxy (see §2.4 below)

**Deployment checklist:**
- [ ] Set `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in Netlify environment variables
- [ ] Apply for Extended Quota Mode in Spotify Developer Dashboard before launch
- [ ] Confirm `/v1/artists/{id}`, `/v1/artists/{id}/top-tracks`, `/v1/artists/{id}/albums` endpoints still active

---

### 1.2 YouTube / SoundCloud / Bandcamp oEmbed

**Status:** Netlify function `oembed-proxy.js` built. Operational.
**API spec:** `docs/apis/oembed.md`

**What it does:**
- Accepts any YouTube, SoundCloud, or Bandcamp URL
- Returns oEmbed JSON: HTML embed code, thumbnail, title, author
- Used by: snap cards, release cards, top card video

**No further build required.** Score ceiling is 7/10 for SoundCloud and Bandcamp (no public API for data import). YouTube Data API import is a P2 enhancement, not a blocker.

---

## Priority 2 — High Value, V1 or V2

### 2.1 Events Import: Ticketmaster Discovery API (PRIMARY)

**Status:** Not built. Not specced. Zero implementation.
**Priority: P0 — build alongside Spotify import.**

**Why Ticketmaster over Bandsintown:**
- Single platform-wide API key — no per-artist setup
- Free tier: 5,000 calls/day, 5 calls/second
- Coverage: ~80% of UK independent artists playing 200–2,000 capacity venues
- Bandsintown requires per-artist keys (generated from a Bandsintown for Artists account)

**Coverage gap:** Artists self-promoting via Eventbrite, Dice, or door-only sales will not appear. Manual event entry fallback in `admin.html` covers these cases.

**Required attribution:** "Shows via Ticketmaster" — small, below the events list.

#### Netlify Function: `netlify/functions/ticketmaster-import.js`

```javascript
// netlify/functions/ticketmaster-import.js
// Netlify serverless function — Node 18+
// Environment variable: TICKETMASTER_API_KEY (single platform-wide key)

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let artistName;
  try {
    const body = JSON.parse(event.body);
    artistName = (body.artistName || '').trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body', code: 'BAD_REQUEST' }) };
  }

  if (!artistName) {
    return { statusCode: 400, body: JSON.stringify({ error: 'artistName is required', code: 'BAD_REQUEST' }) };
  }

  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured', code: 'CONFIG_ERROR' }) };
  }

  // Step 1: Resolve artist to Ticketmaster attractionId
  const searchUrl = new URL('https://app.ticketmaster.com/discovery/v2/attractions.json');
  searchUrl.searchParams.set('keyword', artistName);
  searchUrl.searchParams.set('classificationName', 'music');
  searchUrl.searchParams.set('apikey', apiKey);

  const searchRes = await fetch(searchUrl.toString());
  if (!searchRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Ticketmaster search failed', code: 'SEARCH_FAILED' }) };
  }

  const searchData = await searchRes.json();
  const attractions = searchData?._embedded?.attractions || [];
  if (attractions.length === 0) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Artist not found', code: 'NOT_FOUND' }) };
  }

  // Pick the best match — first result (Ticketmaster ranks by relevance)
  const attraction = attractions[0];
  const attractionId = attraction.id;

  // Step 2: Get upcoming events for this artist
  const eventsUrl = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
  eventsUrl.searchParams.set('attractionId', attractionId);
  eventsUrl.searchParams.set('countryCode', 'GB');   // Start with GB; clients can pass countryCode
  eventsUrl.searchParams.set('sort', 'date,asc');
  eventsUrl.searchParams.set('size', '20');
  eventsUrl.searchParams.set('apikey', apiKey);

  const eventsRes = await fetch(eventsUrl.toString());
  if (!eventsRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Ticketmaster events fetch failed', code: 'EVENTS_FAILED' }) };
  }

  const eventsData = await eventsRes.json();
  const events = eventsData?._embedded?.events || [];

  // Map to able_shows format
  const shows = events.map(ev => {
    const venue = ev._embedded?.venues?.[0];
    return {
      venue:      venue?.name || 'TBC',
      city:       venue?.city?.name || '',
      country:    venue?.country?.name || '',
      date:       ev.dates?.start?.localDate || '',
      doorsTime:  ev.dates?.start?.localTime || '',
      ticketUrl:  ev.url || '',
      featured:   false,
      source:     'ticketmaster',
    };
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // restrict to ablemusic.co in production
    },
    body: JSON.stringify({
      artistName: attraction.name,
      shows,
      source: 'ticketmaster',
      attribution: 'Shows via Ticketmaster',
    }),
  };
};
```

#### Client-side integration (admin.html)

```javascript
// In admin.html — "Import shows" flow
async function importShowsFromTicketmaster(artistName) {
  showImportingShows();
  try {
    const res = await fetch('/.netlify/functions/ticketmaster-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artistName }),
    });
    if (!res.ok) {
      const err = await res.json();
      showShowsImportError(err.code || 'BLOCKED');
      return;
    }
    const data = await res.json();
    // data.shows is an array of show objects
    // Merge with existing able_shows (deduplicate by date + venue)
    const existing = JSON.parse(localStorage.getItem('able_shows') || '[]');
    const merged = mergeShows(existing, data.shows);
    localStorage.setItem('able_shows', JSON.stringify(merged));
    showShowsImportSuccess(data.shows.length, data.attribution);
  } catch (err) {
    showShowsImportError('TIMEOUT');
  }
}

function mergeShows(existing, incoming) {
  const keys = new Set(existing.map(s => `${s.date}__${s.venue}`));
  const newShows = incoming.filter(s => !keys.has(`${s.date}__${s.venue}`));
  return [...existing, ...newShows].sort((a, b) => a.date.localeCompare(b.date));
}
```

#### UX copy for shows import

```
Button: "Import shows →"
Loading: "Finding your shows…"
Success: "[N] shows found. Review them below."
Empty result: "We didn't find any upcoming shows for that name. Add them manually."
Error: "Couldn't reach Ticketmaster right now. Add your shows manually."
Attribution (small, below list): "Shows via Ticketmaster"
```

**Environment variable:** `TICKETMASTER_API_KEY` — register free at developer.ticketmaster.com.

---

### 2.2 Events Import: Bandsintown (SECONDARY, opt-in)

**Status:** Not built. Bandsintown requires per-artist API keys.

**Build plan:** "Connect Bandsintown" flow in `admin.html` settings. Artist generates their key at Bandsintown for Artists → pastes into ABLE → events auto-import via the Bandsintown API.

**API call:**
```
GET https://rest.bandsintown.com/artists/{artist-name}/events?app_id={ARTIST_KEY}&date=upcoming
```

Returns: array of events with venue, city, country, datetime, ticketUrl.
Maps to: `able_shows` array.

**This is a secondary path.** Ticketmaster handles the zero-friction case. Bandsintown is for artists who already have a Bandsintown account and prefer it.

**Netlify function:** `netlify/functions/bandsintown-import.js`

```javascript
// netlify/functions/bandsintown-import.js
// Accepts: { artistName: string, apiKey: string } — the artist's own Bandsintown API key
// Note: This key is user-supplied; do not store it in ABLE's environment variables.

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let artistName, apiKey;
  try {
    const body = JSON.parse(event.body);
    artistName = (body.artistName || '').trim();
    apiKey     = (body.apiKey || '').trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body', code: 'BAD_REQUEST' }) };
  }

  if (!artistName || !apiKey) {
    return { statusCode: 400, body: JSON.stringify({ error: 'artistName and apiKey required', code: 'BAD_REQUEST' }) };
  }

  const encodedName = encodeURIComponent(artistName);
  const url = `https://rest.bandsintown.com/artists/${encodedName}/events?app_id=${encodeURIComponent(apiKey)}&date=upcoming`;

  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' }
  });

  if (res.status === 404) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Artist not found on Bandsintown', code: 'NOT_FOUND' }) };
  }
  if (!res.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Bandsintown API error', code: 'API_ERROR' }) };
  }

  const events = await res.json();

  // Map to able_shows format
  const shows = events.slice(0, 20).map(ev => ({
    venue:     ev.venue?.name || 'TBC',
    city:      ev.venue?.city || '',
    country:   ev.venue?.country || '',
    date:      ev.datetime ? ev.datetime.split('T')[0] : '',
    doorsTime: ev.datetime ? ev.datetime.split('T')[1]?.slice(0, 5) : '',
    ticketUrl: ev.offers?.[0]?.url || ev.url || '',
    featured:  false,
    source:    'bandsintown',
  }));

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ shows, source: 'bandsintown' }),
  };
};
```

---

### 2.3 Linktree Import

**Status:** Not built. Not specced. Mentioned in `docs/systems/spotify-import/SPEC.md` §8 as future spec at `DESIGN-SPEC.md §17.2` — that spec is not written yet.

**Why this is the best onboarding conversion tool:**
- ABLE's primary acquisition target is currently on Linktree
- Importing their Linktree CTAs removes the switching cost entirely
- Low-effort build: Linktree pages are public HTML, no API required
- The Netlify function fetches the public page and parses it

**Netlify function: `netlify/functions/linktree-import.js`**

```javascript
// netlify/functions/linktree-import.js
// Fetches a public Linktree page and extracts all link titles + URLs.
// No Linktree API needed — pages are public HTML.
// Input: { url: "https://linktr.ee/username" }
// Output: { links: [{ title, url, platform }] }

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let ltUrl;
  try {
    const body = JSON.parse(event.body);
    ltUrl = (body.url || '').trim();
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid body', code: 'BAD_REQUEST' }) };
  }

  // Validate it's a Linktree URL
  if (!/^https?:\/\/(www\.)?linktr\.ee\//.test(ltUrl)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Not a Linktree URL', code: 'NOT_LINKTREE' }) };
  }

  let html;
  try {
    const res = await fetch(ltUrl, {
      headers: {
        'User-Agent': 'ABLE/1.0 (ablemusic.co) contact@ablemusic.co',
        'Accept': 'text/html',
      },
    });
    if (!res.ok) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Linktree page not found', code: 'NOT_FOUND' }) };
    }
    html = await res.text();
  } catch {
    return { statusCode: 502, body: JSON.stringify({ error: 'Could not fetch Linktree page', code: 'FETCH_FAILED' }) };
  }

  // Linktree embeds its link data in a __NEXT_DATA__ JSON script tag.
  // This is the most reliable parse target — far more stable than scraping button elements.
  const nextDataMatch = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/.exec(html);

  if (!nextDataMatch) {
    return { statusCode: 422, body: JSON.stringify({ error: 'Could not parse Linktree page', code: 'PARSE_FAILED' }) };
  }

  let links = [];
  try {
    const nextData = JSON.parse(nextDataMatch[1]);
    // Path may vary across Linktree versions — check multiple locations
    const rawLinks =
      nextData?.props?.pageProps?.account?.links ||
      nextData?.props?.pageProps?.links ||
      [];

    links = rawLinks
      .filter(l => l.url && l.title)
      .map(l => ({
        title:    l.title,
        url:      l.url,
        platform: detectPlatform(l.url),
      }));
  } catch {
    return { statusCode: 422, body: JSON.stringify({ error: 'Could not read links from Linktree page', code: 'PARSE_FAILED' }) };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ links, source: 'linktree' }),
  };
};

function detectPlatform(url) {
  const u = url.toLowerCase();
  if (u.includes('spotify.com'))    return 'spotify';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('instagram.com'))  return 'instagram';
  if (u.includes('tiktok.com'))     return 'tiktok';
  if (u.includes('soundcloud.com')) return 'soundcloud';
  if (u.includes('bandcamp.com'))   return 'bandcamp';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('discord.gg'))     return 'discord';
  if (u.includes('facebook.com'))   return 'facebook';
  if (u.includes('apple.com/music') || u.includes('music.apple.com')) return 'apple';
  return 'link';
}
```

**Client-side integration (start.html, step 0):**

```
- Artist pastes linktr.ee/username
- ABLE fetches and parses the page
- Shows preview: "We found [N] links. Which ones do you want to keep?"
- Artist toggles which links to import
- Selected links become Quick Action pills in their ABLE profile
```

**UX copy:**
```
Heading: "Coming from Linktree?"
Sub: "Paste your Linktree URL and we'll bring your links across."
Input placeholder: https://linktr.ee/yourname
Loading: "Reading your Linktree…"
Success: "Found [N] links. Pick the ones to bring over."
Error: "Couldn't read that page — paste your links manually."
```

---

### 2.4 Last.fm Listener Proxy

**Status:** Not built. Specced in `INTEGRATIONS_AND_AI_RESEARCH.md` Part 8.

**Why:** Spotify's monthly listener count is not in any public API. Last.fm `artist.getInfo` returns 30-day unique listeners — a genuine engagement metric. Use it as a reach proxy in the artist's private admin dashboard (not fan-facing).

**API call (no auth required, single platform key):**
```
GET https://ws.audioscrobbler.com/2.0/
  ?method=artist.getInfo
  &artist={artistName}
  &api_key={ABLE_LASTFM_KEY}
  &format=json
```

Returns: `artist.stats.listeners` (30-day), `artist.stats.playcount` (all-time), `artist.bio.summary`, genre tags.

**Display rule:**
- Label as "Last.fm listeners" not "monthly listeners"
- Show only in admin.html — not on public artist profile
- Fall back silently if artist not found on Last.fm (many emerging artists won't be)

**Environment variable:** `LASTFM_API_KEY` — register free at last.fm/api.

---

## Priority 3 — Phase 2

### 3.1 Stripe Payments

**Status:** Architecture specced, not built.
**API spec:** `docs/apis/stripe.md`
**Scope:** Stripe Connect for marketplace splits (Close Circle support packs, Stage Can tips). Artists never interact with Stripe directly — ABLE handles the payment infrastructure.

### 3.2 Apple Music MusicKit JS

**Status:** Not specced.
**Reality check:** Requires Apple Developer Program membership ($99/year). MusicKit JS gives catalog embeds + song/album data. Worth adding after backend is live.
**Low priority:** iTunes Search API (free, no auth) handles Apple Music link resolution now.

### 3.3 YouTube Data API v3

**Status:** oEmbed covers embedding. Data API import is an enhancement.
**Build:** `netlify/functions/youtube-import.js` — pull latest video by channel name or video URL → returns thumbnail, title, view count, embed ID.

### 3.4 DistroKid / MusicBrainz Credits

**Status:** MusicBrainz specced in Part 7. No distributor has a public API.
**Rate limit:** 1 request/second enforced by IP blocking. Async background job only.
**Data quality caveat:** Emerging UK artists often absent. Enrichment pass, not primary source.

---

## Priority 4 — Link Paste (No API Needed)

These platforms provide value through link paste + correct icon detection. No API integration warranted.

| Platform | Reason | ABLE approach |
|---|---|---|
| Instagram | API deprecated (2024), app review required | Link paste → platform pill |
| TikTok | High-friction API | Link paste → platform pill |
| Facebook | API access costs money, privacy concerns | Link paste → platform pill |
| Twitter/X | API severely rate-limited (2023+) | Link paste → platform pill |
| Bandcamp | Intentionally closed API | oEmbed + link paste |
| Apple Music | iTunes Search for link resolution | Link paste + URL constructor |
| PayPal | PayPal.me links as CTA type | Link paste → CTA pill |
| Ko-fi | Link paste, optional webhook future | Link paste → CTA pill |
| Discord | Invite link as first-class CTA type | Link paste → CTA pill |

**Link platform detection function (shared across `able-v7.html` and `admin.html`):**

```javascript
function detectLinkPlatform(url) {
  const u = (url || '').toLowerCase();
  const MAP = [
    [/spotify\.com/,              'spotify'],
    [/open\.spotify\.com\/artist/,'spotify'],
    [/youtube\.com|youtu\.be/,   'youtube'],
    [/soundcloud\.com/,           'soundcloud'],
    [/bandcamp\.com/,             'bandcamp'],
    [/instagram\.com/,            'instagram'],
    [/tiktok\.com/,               'tiktok'],
    [/twitter\.com|x\.com/,       'twitter'],
    [/discord\.gg/,               'discord'],
    [/facebook\.com/,             'facebook'],
    [/music\.apple\.com|apple\.com\/music/, 'apple'],
    [/paypal\.me|paypal\.com/,    'paypal'],
    [/ko-fi\.com/,                'kofi'],
    [/patreon\.com/,              'patreon'],
    [/twitch\.tv/,                'twitch'],
    [/linktr\.ee/,                'linktree'],
    [/ra\.co/,                    'ra'],
  ];
  for (const [regex, platform] of MAP) {
    if (regex.test(u)) return platform;
  }
  return 'link';
}
```

---

## Environment Variables Required

| Variable | Service | Where to register | Priority |
|---|---|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify | developer.spotify.com | P0 |
| `SPOTIFY_CLIENT_SECRET` | Spotify | developer.spotify.com | P0 |
| `TICKETMASTER_API_KEY` | Ticketmaster | developer.ticketmaster.com | P0 |
| `LASTFM_API_KEY` | Last.fm | last.fm/api | P1 |
| `STRIPE_SECRET_KEY` | Stripe | dashboard.stripe.com | P2 |
| `STRIPE_WEBHOOK_SECRET` | Stripe | dashboard.stripe.com | P2 |

All variables set in Netlify UI → Site settings → Environment variables. Never committed to git.

---

## Data Mapping: Integrations → localStorage

| Integration | Data | localStorage key | Field path |
|---|---|---|---|
| Spotify import | Artist name | `able_v3_profile` | `.name` |
| Spotify import | Artwork | `able_v3_profile` | `.artworkUrl` |
| Spotify import | Spotify URL | `able_v3_profile` | `.spotifyUrl` |
| Ticketmaster import | Shows list | `able_shows` | Array of show objects |
| Bandsintown import | Shows list | `able_shows` | Array of show objects |
| Linktree import | Quick Action links | `able_v3_profile` | `.ctaLinks[]` |
| Last.fm | Listener count (admin only) | `able_v3_profile` | `.lastfmListeners` |

**All localStorage keys will map 1:1 to Supabase tables when backend lands. Do not rename keys.**
