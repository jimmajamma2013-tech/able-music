# ABLE — Spotify Web API Spec
**Created: 2026-03-16 | Covers: Client Credentials import only**

> This file covers the Spotify Web API used in the onboarding wizard (start.html) to pre-populate an artist's profile. It does not cover Spotify OAuth for fans (that is a separate Phase 2 spec). A developer reading this file has everything needed to build and maintain the `spotify-import.js` Netlify function.

---

## What we use it for

- Artist search by name → get Spotify artist ID, image, genres, followers count
- Get artist's top tracks → populate releases preview in wizard
- **Not used for:** monthly listeners (not in public API), per-track stream counts (not available), fan pre-saves (requires Spotify OAuth — separate flow), biographical text (no bio field in Spotify's artist object)

---

## Auth: Client Credentials flow (server-side only)

This is the correct auth flow when ABLE needs Spotify data on behalf of its platform — not on behalf of a specific user.

```
POST https://accounts.spotify.com/api/token
Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)
Content-Type: application/x-www-form-urlencoded
Body: grant_type=client_credentials
```

Returns `access_token` (string) and `expires_in` (integer, typically 3600 seconds).

**The token is cached in memory inside the Netlify function.** It is refreshed 5 minutes before expiry to avoid a mid-request failure. On a cold start the function fetches a fresh token automatically.

**NEVER expose `SPOTIFY_CLIENT_SECRET` in client-side code.** It must only exist in Netlify environment variables and be accessed inside `spotify-import.js`.

---

## Endpoints used

### 1. Artist search
```
GET https://api.spotify.com/v1/search?q={name}&type=artist&limit=5
Authorization: Bearer {access_token}
```
Use this when the artist provides a plain name rather than a Spotify URL. Returns up to 5 artist candidates. The wizard sends this via the Netlify function.

### 2. Get artist by ID
```
GET https://api.spotify.com/v1/artists/{id}
Authorization: Bearer {access_token}
```
Returns: `name`, `images[]`, `genres[]`, `followers.total`, `popularity`, `external_urls.spotify`.

### 3. Get artist's top tracks
```
GET https://api.spotify.com/v1/artists/{id}/top-tracks?market=GB
Authorization: Bearer {access_token}
```
Returns up to 10 tracks. The function slices to 5. Each track includes `preview_url` (30s audio preview) and `album.images`.

---

## Data mapping (Spotify response → `able_v3_profile`)

These mappings are applied at Screen 8 (Done) in start.html, not at import time. Import data lives in `wizardState` until the profile is committed.

```javascript
// Spotify artist → wizardState (then profile at Screen 8)
wizardState.importedName       = artist.name
wizardState.importedGenres     = artist.genres            // full genres array
wizardState.importedArtworkUrl = artist.images[0]?.url   // prefer 640px image
wizardState.importedSpotifyUrl = artist.external_urls.spotify
wizardState.importedFollowers  = artist.followers.total

// At Screen 8 profile write:
profile.name       = wizardState.name || wizardState.importedName
profile.artworkUrl = wizardState.artworkUrl || wizardState.importedArtworkUrl
profile.spotifyUrl = wizardState.importedSpotifyUrl

// Genre → feel mapping runs separately (see spotify-import SPEC.md §4.2)
// Returns one of: 'electronic'|'hiphop'|'rnb'|'indie'|'pop'|'rock'|'folk'|null
```

---

## URL formats accepted

The function handles all three forms artists might paste:

```
https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb
https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb?si=abc123xyz
spotify:artist:4Z8W4fKeB5YxbusRsdQVPb
```

The `?si=` tracking parameter is stripped before the API call to maximise sessionStorage cache hits.

---

## Rate limits

- Client Credentials flow: 100 requests per 30 seconds per app
- No per-user rate limits apply — all requests are made by the ABLE Netlify function, not individual users
- Token endpoint: shared rate limit with API calls; do not call it more than once per token lifetime

---

## Error handling

| HTTP status | Cause | Client-facing copy |
|---|---|---|
| 401 | Token expired | Refresh token automatically, retry once. If still 401: "Couldn't reach Spotify right now — enter your name below." |
| 404 | Artist ID not in Spotify database | "We couldn't find that artist. Check the link or start from scratch." |
| 429 | Rate limit hit | "Spotify is busy right now — enter your name below and we'll skip it." |
| 5xx | Spotify service error | "Couldn't reach that page. Enter your name below and carry on." |
| AbortError | Client timeout (8s) | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |

Error handling rule: **import failure is never blocking.** The wizard continues identically whether the import succeeded, failed, or was skipped. See `docs/systems/spotify-import/SPEC.md §7` for the full fallback matrix.

---

## Netlify function spec (`netlify/functions/spotify-import.js`)

The function is already built at `netlify/functions/spotify-import.js`. Full implementation is in `docs/systems/spotify-import/SPEC.md §3.2`.

**Request:**
```json
POST /.netlify/functions/spotify-import
{ "url": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb" }
```

**Success response (HTTP 200):**
```json
{
  "name": "Nadia Rose",
  "image": "https://i.scdn.co/image/ab6761610000e5eb...",
  "genres": ["uk hip hop", "grime"],
  "followers": 48200,
  "popularity": 62,
  "spotifyId": "4Z8W4fKeB5YxbusRsdQVPb",
  "spotifyUrl": "https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb",
  "topTracks": [
    { "title": "Skwod", "id": "...", "previewUrl": "https://...", "albumArt": "https://..." }
  ]
}
```

**Error response:**
```json
{ "error": "Human-readable message", "code": "NOT_FOUND" }
```

Error codes: `NOT_FOUND` | `RATE_LIMITED` | `BLOCKED` | `BAD_REQUEST` | `METHOD_NOT_ALLOWED`

---

## Required environment variables

```
SPOTIFY_CLIENT_ID      → Spotify Developer Dashboard → Your App → Client ID
SPOTIFY_CLIENT_SECRET  → Spotify Developer Dashboard → Your App → Client Secret
```

Set in Netlify UI → Site settings → Environment variables. Never in `.env` files committed to git.

---

## What Spotify import does NOT do

- Does not get monthly listeners (this field does not exist in the Client Credentials API)
- Does not get per-track stream counts (not available in any public Spotify API)
- Does not set up fan pre-saves (that requires Spotify OAuth — a Phase 2 flow)
- Does not import biographical text (Spotify artist objects have no bio field)
- Does not import artist's albums for the profile releases section (top-tracks used instead; full album import is Phase 2)

Do not describe or promise any of these in UI copy.

---

## Current score and path to complete

**Score: 5/10 → 9/10**

What's done: function built, URL detection working, response shape correct.

What's needed:
1. Add `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` to Netlify environment variables
2. Test the function against 5 real artist URLs covering different genre types
3. Confirm genre → feel mapping covers the test artists correctly
4. Verify sessionStorage cache works correctly across a wizard session
5. Add `CORS_HEADERS` restriction to `ablemusic.co` domain in production (currently `*`)
