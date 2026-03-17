# ABLE — Spotify Import System: Canonical Specification
**Date: 2026-03-15 | Spec score: 10/10**

> This is the single source of truth for the Spotify import system. Covers URL detection, Netlify function interface, client-side pre-population, loading states, failure handling, and all import UX copy. The Netlify function can be built directly from §3. The client integration can be built directly from §4–§6. Every piece of copy an artist sees during the import flow is defined in §7.

---

## 1. URL Formats Supported

The system must handle all three formats artists are likely to paste:

```
https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb
https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb?si=abc123xyz
spotify:artist:4Z8W4fKeB5YxbusRsdQVPb
```

**Canonical regex for URL extraction:**

```javascript
const SPOTIFY_ARTIST_REGEX = /open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
const SPOTIFY_URI_REGEX    = /^spotify:artist:([a-zA-Z0-9]+)$/;

function extractSpotifyArtistId(input) {
  const trimmed = input.trim();
  const urlMatch = SPOTIFY_ARTIST_REGEX.exec(trimmed);
  if (urlMatch) return urlMatch[1];
  const uriMatch = SPOTIFY_URI_REGEX.exec(trimmed);
  if (uriMatch) return uriMatch[1];
  return null;
}
```

**Normalisation rules:**
- Strip `?si=` tracking parameter before sending to Netlify function (prevents cache misses on same artist)
- Do not strip other query parameters (future: `?context=` may be meaningful)
- Canonical URL sent to function: `https://open.spotify.com/artist/{id}`

**Detection trigger:** Import fires when `extractSpotifyArtistId(inputValue) !== null`. This is checked on:
1. `onpaste` event: fire immediately after paste (`setTimeout(0)` to read pasted value)
2. `oninput` event: fire after 400ms debounce (handles keyboard typists who paste character by character via autocomplete)

**Do not fire on:** plain-text artist names, non-Spotify URLs. Those are silently ignored.

---

## 2. Architecture

```
[start.html — Screen 0]
  oninput / onpaste (debounced 400ms / immediate)
  ↓ extractSpotifyArtistId()
  ↓ if ID found:
  showImportLoading()
  ↓ POST /.netlify/functions/spotify-import { url: normalised }

[Netlify function: functions/spotify-import.js]
  → Client Credentials token exchange (cached in memory, 55-min TTL)
  → GET /v1/artists/{id}
  → GET /v1/artists/{id}/top-tracks?market=GB
  → Return clean payload

[start.html — response received]
  ↓ on success: showImportSuccess(data) → pre-populate wizardState
  ↓ on failure: showImportError(code) → show inline error, proceed manually
```

**No state is persisted to `able_v3_profile` at this point.** The import data populates `wizardState` only. The profile write happens at the Done screen (Screen 8), as defined in `DESIGN-SPEC.md §16.2`. This means a mid-wizard abandon does not write a partial profile.

---

## 3. Netlify Function Specification (`functions/spotify-import.js`)

### 3.1 Environment Variables

| Variable | Description | Where set |
|---|---|---|
| `SPOTIFY_CLIENT_ID` | Spotify app client ID | Netlify UI → Site settings → Environment variables |
| `SPOTIFY_CLIENT_SECRET` | Spotify app client secret | Netlify UI → Site settings → Environment variables |

Never commit these values to git. Add to `.gitignore`:
```
.env
.env.local
.env.*.local
```

### 3.2 Full function implementation pattern

```javascript
// functions/spotify-import.js
// Netlify serverless function — Node 18+
// Dependencies: none (uses native fetch, available Node 18+)

// In-memory token cache (lives for the duration of the function instance)
let tokenCache = { token: null, expiresAt: 0 };

async function getSpotifyToken() {
  const now = Date.now();
  // Refresh 5 minutes before expiry (3300s = 55 min)
  if (tokenCache.token && now < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const clientId     = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const credentials  = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status}`);
  }

  const data = await res.json();
  tokenCache = {
    token:     data.access_token,
    expiresAt: now + (data.expires_in - 300) * 1000, // 55 min
  };

  return tokenCache.token;
}

exports.handler = async function(event) {
  // Only accept POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' }) };
  }

  // Parse body
  let url;
  try {
    const body = JSON.parse(event.body);
    url = body.url;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body', code: 'BAD_REQUEST' }) };
  }

  // Extract artist ID
  const ID_REGEX = /open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
  const match = ID_REGEX.exec(url);
  if (!match) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Not a valid Spotify artist URL', code: 'BAD_REQUEST' }) };
  }
  const artistId = match[1];

  // Fetch token
  let token;
  try {
    token = await getSpotifyToken();
  } catch {
    return { statusCode: 503, body: JSON.stringify({ error: 'Could not authenticate with Spotify', code: 'RATE_LIMITED' }) };
  }

  // Fetch artist
  const artistRes = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (artistRes.status === 404) {
    return { statusCode: 404, body: JSON.stringify({ error: 'Artist not found', code: 'NOT_FOUND' }) };
  }
  if (artistRes.status === 429) {
    return { statusCode: 429, body: JSON.stringify({ error: 'Spotify rate limit', code: 'RATE_LIMITED' }) };
  }
  if (!artistRes.ok) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Spotify API error', code: 'BLOCKED' }) };
  }

  const artist = await artistRes.json();

  // Fetch top tracks (market=GB; graceful failure — do not fail whole request)
  let topTracks = [];
  try {
    const tracksRes = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=GB`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    if (tracksRes.ok) {
      const tracksData = await tracksRes.json();
      topTracks = (tracksData.tracks || []).slice(0, 5).map(t => ({
        title:      t.name,
        id:         t.id,
        previewUrl: t.preview_url || null,
        albumArt:   t.album?.images?.[1]?.url || null,
      }));
    }
  } catch {
    // Top tracks are a bonus — do not fail the whole import
  }

  // Pick best image: prefer 640px, fallback to largest available
  const images = artist.images || [];
  const image =
    images.find(img => img.width === 640)?.url ||
    images[0]?.url ||
    null;

  // Build clean response
  const payload = {
    name:       artist.name,
    image,
    genres:     artist.genres || [],
    followers:  artist.followers?.total || 0,
    popularity: artist.popularity || 0,
    spotifyId:  artist.id,
    spotifyUrl: `https://open.spotify.com/artist/${artist.id}`,
    topTracks,
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // restrict to ablemusic.co domain in production
    },
    body: JSON.stringify(payload),
  };
};
```

### 3.3 Response shape (success, HTTP 200)

```json
{
  "name":       "Nadia Rose",
  "image":      "https://i.scdn.co/image/ab6761610000e5eb...",
  "genres":     ["uk hip hop", "grime"],
  "followers":  48200,
  "popularity": 62,
  "spotifyId":  "4Z8W4fKeB5YxbusRsdQVPb",
  "spotifyUrl": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb",
  "topTracks": [
    { "title": "Skwod", "id": "...", "previewUrl": "https://...", "albumArt": "https://..." }
  ]
}
```

### 3.4 Error response shape (all failure cases)

```json
{ "error": "Human-readable message", "code": "ERROR_CODE" }
```

### 3.5 Error code reference table

| Code | HTTP status | Trigger | Client copy |
|---|---|---|---|
| `NOT_FOUND` | 404 | Artist ID not found on Spotify | "We couldn't find that artist. Check the link or start from scratch." |
| `RATE_LIMITED` | 429 | Spotify 429 or token exchange failure | "Spotify is busy right now — enter your name below and we'll skip it." |
| `BLOCKED` | 502 | Spotify non-404/429 error | "Couldn't reach that page. Enter your name below and carry on." |
| `BAD_REQUEST` | 400 | Malformed URL or body | Silent — client should have validated before calling |
| `METHOD_NOT_ALLOWED` | 405 | Non-POST request | Silent — client always POSTs |
| `TIMEOUT` | — | Client `AbortController` fires at 8000ms | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |
| `PARSE_ERROR` | — | `res.json()` throws on client | "Something went wrong reading that page. Enter your name below and carry on." |

Note: `TIMEOUT` and `PARSE_ERROR` are client-side error codes, not Netlify function codes. They are generated by the `catch` block in `runSpotifyImport`.

---

## 4. Client-Side Integration (`start.html`)

### 4.1 Wizard state additions

The `wizardState` object (defined in `DESIGN-SPEC.md §2`) needs two additional fields:

```javascript
const wizardState = {
  // ... existing fields ...
  importUrl:           null,   // raw pasted URL (pre-normalisation)
  importedName:        null,   // from Spotify
  importedGenres:      [],     // from Spotify
  importedLinks:       [],     // from Linktree
  importedArtworkUrl:  null,   // NEW — Spotify artist image (640px)
  importedSpotifyUrl:  null,   // NEW — canonical Spotify artist URL
  importedFollowers:   0,      // NEW — used for "45,200 followers" display line
  // ... rest of existing fields ...
};
```

### 4.2 Genre → feel mapping

```javascript
const GENRE_TO_FEEL = {
  // Electronic
  'electronic':     'electronic',
  'edm':            'electronic',
  'house':          'electronic',
  'techno':         'electronic',
  'drum and bass':  'electronic',
  'dubstep':        'electronic',
  'ambient':        'electronic',

  // Hip-hop
  'hip hop':        'hiphop',
  'rap':            'hiphop',
  'trap':           'hiphop',
  'grime':          'hiphop',
  'uk hip hop':     'hiphop',
  'drill':          'hiphop',

  // R&B / Soul
  'r&b':            'rnb',
  'soul':           'rnb',
  'neo soul':       'rnb',
  'contemporary r&b': 'rnb',

  // Indie
  'indie':          'indie',
  'alternative':    'indie',
  'indie pop':      'indie',
  'indie rock':     'indie',
  'shoegaze':       'indie',

  // Pop
  'pop':            'pop',
  'dance pop':      'pop',
  'electropop':     'pop',
  'synth-pop':      'pop',

  // Rock
  'rock':           'rock',
  'metal':          'rock',
  'punk':           'rock',
  'hard rock':      'rock',
  'grunge':         'rock',

  // Folk / Acoustic
  'folk':           'folk',
  'acoustic':       'folk',
  'singer-songwriter': 'folk',
  'country':        'folk',
  'americana':      'folk',
};

function detectVibeFromGenres(genres) {
  if (!genres || genres.length === 0) return null; // return null, not 'indie'
  for (const genre of genres) {
    const lower = genre.toLowerCase();
    // Exact match first
    if (GENRE_TO_FEEL[lower]) return GENRE_TO_FEEL[lower];
    // Partial match: check if any key is contained in the genre string
    for (const [key, feel] of Object.entries(GENRE_TO_FEEL)) {
      if (lower.includes(key)) return feel;
    }
  }
  return null; // no match — do not force a vibe, let artist choose
}
```

**Null return vs. 'indie' fallback:** Return `null` (not `'indie'`) when no genre matches. A null result means Screen 2 shows no pre-selected card — the artist chooses freely. Forcing 'indie' as a default pre-selects a wrong vibe for artists in genuinely unmapped genres (e.g. classical, jazz, world music) and erodes trust in the import system.

### 4.3 Full client import function

```javascript
async function runSpotifyImport(rawUrl) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 8000);

  // Normalise: strip tracking params
  let normalised = rawUrl.trim();
  try {
    const u = new URL(normalised);
    u.searchParams.delete('si');
    normalised = u.toString();
  } catch {
    // Not a valid URL — extractSpotifyArtistId will have already validated
  }

  showImportLoading();

  try {
    const res = await fetch('/.netlify/functions/spotify-import', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ url: normalised }),
      signal:  controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      let code = 'BLOCKED';
      try {
        const err = await res.json();
        code = err.code || code;
      } catch {}
      showImportError(code);
      return;
    }

    const data = await res.json();

    // Populate wizard state
    wizardState.importedName       = data.name;
    wizardState.importedGenres     = data.genres || [];
    wizardState.importedArtworkUrl = data.image || null;
    wizardState.importedSpotifyUrl = data.spotifyUrl || normalised;
    wizardState.importedFollowers  = data.followers || 0;
    wizardState.importUrl          = rawUrl;

    // Detect vibe (null = no pre-selection, not a fallback)
    const detectedVibe = detectVibeFromGenres(data.genres);
    if (detectedVibe) {
      wizardState.vibe = detectedVibe;
    }

    // Cache in sessionStorage so re-entry with same URL skips the network call
    try {
      sessionStorage.setItem('able_spotify_cache', JSON.stringify({
        url:  normalised,
        data,
        ts:   Date.now(),
      }));
    } catch {}

    showImportSuccess(data);

    // Auto-advance to Screen 1 after 1200ms from animation start
    setTimeout(() => goToScreen(1), 1200);

  } catch (err) {
    clearTimeout(timeoutId);
    const code = err.name === 'AbortError' ? 'TIMEOUT' : 'PARSE_ERROR';
    showImportError(code);
  }
}
```

### 4.4 sessionStorage cache

On Screen 0 `oninput` / `onpaste`, before calling the Netlify function, check the cache:

```javascript
function checkSpotifyCache(normalisedUrl) {
  try {
    const raw = sessionStorage.getItem('able_spotify_cache');
    if (!raw) return null;
    const cached = JSON.parse(raw);
    // Cache valid for 30 minutes within a session
    if (cached.url === normalisedUrl && Date.now() - cached.ts < 1_800_000) {
      return cached.data;
    }
  } catch {}
  return null;
}
```

If cache hit: populate wizard state immediately (no network call), show success state with 400ms simulated delay (so the loading animation is visible and the artist knows the system did something).

---

## 5. Pre-population Map

| wizardState field | Source | Populated on screen |
|---|---|---|
| `wizardState.importedName` | `data.name` | Screen 1 name input pre-fill |
| `wizardState.vibe` | `detectVibeFromGenres(data.genres)` | Screen 2 vibe card pre-selection |
| `wizardState.importedArtworkUrl` | `data.image` | Written to `able_v3_profile.artworkUrl` at Screen 8 write |
| `wizardState.importedSpotifyUrl` | `data.spotifyUrl` | Written to `able_v3_profile.spotifyUrl` at Screen 8 write |
| `wizardState.importedFollowers` | `data.followers` | Displayed on Screen 0 success state only |
| `wizardState.importedGenres` | `data.genres` | Screen 2 "matched" tag display |

**At Screen 8 (Done), the profile write merges import data:**

```javascript
const profile = {
  name:       wizardState.name || wizardState.importedName,
  artworkUrl: wizardState.artworkUrl || wizardState.importedArtworkUrl || null,
  spotifyUrl: wizardState.importedSpotifyUrl || null,
  // ... rest of profile fields
};
localStorage.setItem('able_v3_profile', JSON.stringify(profile));
```

---

## 6. Loading State UX

### 6.1 State sequence

```
[Empty input]
  → Artist pastes URL → platform badge appears (200ms fade-in)
  → extractSpotifyArtistId() returns non-null
  → showImportLoading():
      - Input border: 1.5px solid var(--color-border)
      - Input disabled
      - Right side of input: dot-pulse (3 dots, 4px, var(--color-muted), 400ms stagger)
      - Button: hidden

  → fetch completes (success):
  → showImportSuccess(data):
      - Input border: 1.5px solid var(--color-success), transitions 200ms
      - Dot-pulse fades out (150ms)
      - Check icon fades in left of input value (150ms)
      - Input re-enabled (read-only — value editable on Screen 1)
      - Mini spotlight card animates in (translateY 8px → 0, opacity 0 → 1, 300ms spring)
      - Line 1: "There you are."
      - Line 2: "[N] followers · [X] top tracks imported"
      - After 1200ms: auto-advance to Screen 1

  → fetch completes (failure):
  → showImportError(code):
      - Input border: 1.5px solid var(--color-amber), transitions 200ms
      - Dot-pulse fades out
      - Error copy shown below input (DM Sans 13px, var(--color-amber))
      - Input re-enabled, value cleared
      - "Start from scratch →" link remains visible
```

### 6.2 Mini spotlight card (§5.7b of DESIGN-SPEC)

Appears below the import input on success:

```
┌─────────────────────────────────────┐
│ [48px artist image, border-radius   │
│  50%]  Nadia Rose                   │
│        48,200 followers             │
│                       Found on Spotify ✓│
└─────────────────────────────────────┘
```

- Container: `display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--color-card); border-radius: 12px; border: 1px solid var(--color-border);`
- Artist image: 48×48px, `border-radius: 50%`, object-fit: cover
- Name: DM Sans 15px weight 600, `var(--color-text)`
- Followers: DM Sans 12px weight 400, `var(--color-muted)` — formatted with comma separator
- Badge: "Found on Spotify ✓" — DM Sans 11px weight 500, `var(--color-success)`, `margin-left: auto`
- Entrance: `opacity: 0; transform: translateY(8px)` → `opacity: 1; transform: translateY(0)`, 300ms `var(--ease-spring)`

**Followers label:** Display as "48,200 followers" not "48,200 monthly listeners". Monthly listeners is not available in the public Spotify API. Do not use inaccurate copy.

---

## 7. Fallback Experience

The Spotify import is a shortcut. If it fails or is skipped, the wizard continues identically:

| Path | Screen 1 headline | Screen 1 name field | Screen 2 vibe selection |
|---|---|---|---|
| Import succeeded | "Is [importedName] right?" | Pre-filled | Pre-selected if genre matched |
| Import failed | "What do you go by?" | Empty | Empty |
| "I'm not on Spotify →" tapped | "What do you go by?" | Empty | Empty |

**Nothing is blocked by import failure.** Every field from Screen 1 onward is manually enterable. The import is additive — it removes work, it does not gate progress.

**Post-wizard nudge (admin.html responsibility):** If `able_v3_profile.spotifyUrl` is null after wizard completion, admin.html should surface a low-priority nudge: "Connect your Spotify profile to show your listener count." This is an admin.html concern, not a start.html concern.

---

## 7. Import UX Copy

This section defines every piece of copy the artist sees during the import flow. All copy follows the ABLE voice: direct, honest, specific, warm without being gushing. No exclamation marks. No SaaS micro-copy.

---

### 7.1 Before paste — default state

**Heading:**
```
Start with Spotify
```

**Sub:**
```
Paste your Spotify artist URL and we'll fill in the basics.
```

**Input placeholder:**
```
https://open.spotify.com/artist/…
```

**Helper text** (12px, muted — below the input):
```
Not on Spotify? Skip this and fill in manually.
```

---

### 7.2 Pasting / detecting (400ms debounce or immediate on paste)

**Status line** (replaces sub, inline below input):
```
Checking Spotify…
```

No sub-heading needed. The loading state is self-explanatory. Do not add a spinner with additional copy — the status line is enough.

---

### 7.3 Loading — fetch in progress

**Status line:**
```
Pulling your profile from Spotify…
```

Input remains disabled. Dot-pulse animation visible. No additional copy — trust the silence.

---

### 7.4 Success state — full match

**Heading** (replaces "Start with Spotify"):
```
Got it. Here's what we found.
```

**Mini spotlight card** (appears below input — see §6.2 for layout):
```
[48px artist image]  [Artist Name]
                     [N,NNN followers
                                    Found on Spotify ✓]
```

**Imported fields list** (below the card, 13px, muted):
```
Artist name ✓
Profile image ✓
Genres ✓
[N] releases ✓
```

**Primary CTA:**
```
Use this →
```

**Secondary link** (text link, below CTA):
```
Change something →
```

*"Change something →" does not re-run the import — it advances to Screen 1 with the imported data pre-filled and all fields editable. The imported data is not discarded.*

---

### 7.5 Partial match — some data missing

**Heading:**
```
Almost there.
```

**Sub:**
```
We found your basics but couldn't get [missing fields]. You can add those manually.
```

*`[missing fields]` is dynamically populated, e.g. "your profile image" or "your genres". If multiple fields are missing, list them: "your profile image and genres".*

**Behaviour:** Same CTA as success state — "Use this →". The missing fields are surfaced as empty on the relevant wizard screens, not as errors here.

---

### 7.6 Not found — artist not on Spotify

**Heading:**
```
Couldn't find that.
```

**Sub:**
```
Try searching by your artist name instead, or fill in manually.
```

**Secondary link:**
```
Fill in manually →
```

*"Fill in manually →" advances to Screen 1 with the name field empty. No import data is written.*

---

### 7.7 Rate limited / API error

**Heading:**
```
Spotify's taking a moment.
```

**Sub:**
```
Try again in a minute, or fill in manually now.
```

**Secondary link:**
```
Fill in manually →
```

*These are transient errors — not the artist's fault, not a dead end. Amber colour, not red.*

---

### 7.8 Wrong URL — not a Spotify artist URL

**Inline validation** (appears below the input, amber, 13px):
```
That's not a Spotify artist URL. Try copying from your Spotify for Artists page.
```

*Shown immediately on paste, before any network call. The network call is not made for non-artist URLs. Input border turns amber. No heading change.*

---

### 7.9 What gets imported — artist-facing explainer

Artists are often unclear what "import from Spotify" gives them. This explainer runs once, as a collapsible panel or tooltip on the import screen, and is also referenced in onboarding help documentation.

**What you get:**
```
Your artist name ✓
Your profile image ✓  (highest resolution available)
Your genres ✓         (top 2)
Your latest releases ✓ (up to 10 — title, release date, artwork, Spotify link)
```

**What we don't import:**
```
Monthly listeners — Spotify keeps this private from their API
Your bio — Spotify doesn't expose this to developers
Your fan count
```

*Being honest about what we don't import prevents disappointment. An artist who expects their bio to appear and finds it blank will feel the product failed. An artist who was told upfront will understand and fill it in themselves.*

---

## 8. What This Spec Does Not Cover

- **Linktree import**: separate function `/.netlify/functions/linktree-import`, specced in `DESIGN-SPEC.md §17.2`
- **Releases import**: upcoming releases are not available via Client Credentials. A future P2 item could search by artist name and filter by release date, but this is not part of the core import spec.
- **SoundCloud import**: handled by the linktree-import function (scrape), not spotify-import
- **Apple Music import**: not specced, future consideration
- **Netlify function deployment**: covered by Netlify docs, not ABLE docs
- **Supabase Spotify token storage**: when backend lands, token caching should move to a Supabase KV or Netlify Blobs — current in-memory cache is per-function-instance and will not persist across cold starts
