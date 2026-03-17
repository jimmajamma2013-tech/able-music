# ABLE — Spotify Import System: Final Review
**Date: 2026-03-15 | Spec score: 9.0/10 | Live score: pending**

> Post-spec review. Scores reflect the state after SPEC.md is written and PATH-TO-10.md P0 is complete. The function is not yet built — all scores in the "after P1" and "after P2" columns are projections.

---

## Scores per dimension

| Dimension | Before (ANALYSIS.md) | After P0 (spec complete) | After P1 (core build) | After P2 (polish) | Notes |
|---|---|---|---|---|---|
| URL detection | 5/10 | 9/10 | 9.5/10 | 9.5/10 | All 3 formats, normalisation, debounce strategy fully defined |
| Prefetch timing | 5/10 | 9/10 | 9.5/10 | 9.5/10 | Paste-immediate + oninput 400ms debounce, abort on re-entry |
| Data completeness | 6/10 | 8/10 | 8/10 | 8.5/10 | Monthly listeners gap documented; top tracks add depth at P2 |
| Pre-population accuracy | 6/10 | 9/10 | 9.5/10 | 9.5/10 | wizardState complete; genre→vibe mapping defined; null fallback |
| Loading state UX | 6/10 | 8.5/10 | 9.5/10 | 9.5/10 | Mini-card sequencing resolved; auto-advance timing from animation |
| Failure handling | 7/10 | 9.5/10 | 9.5/10 | 9.5/10 | All error codes + HTTP statuses; retry at P2 |
| API security | 4/10 | 8/10 | 8.5/10 | 9.5/10 | Token caching specced; CORS locked at P2; rate limiting still manual |
| Fallback experience | 8/10 | 9/10 | 9.5/10 | 9.5/10 | Post-wizard nudge added at P2 |
| **Overall** | **5.2/10** | **9.0/10** | **9.2/10** | **9.4/10** | |

**10/10 requires:** Netlify function live + Playwright test suite passing + quality gate verified (< 3s to pre-filled Screen 1).

---

## Exact function signature

```javascript
// functions/spotify-import.js
exports.handler = async function(event: NetlifyEvent): Promise<NetlifyResponse>
```

**Request:**
```
POST /.netlify/functions/spotify-import
Content-Type: application/json

{ "url": string }   // normalised Spotify artist URL (no ?si= tracking param)
```

**Success response:**
```
HTTP 200
Content-Type: application/json

{
  "name":       string,           // artist display name
  "image":      string | null,    // 640px image URL from Spotify
  "genres":     string[],         // Spotify genre strings (may be empty)
  "followers":  number,           // cumulative followers (NOT monthly listeners)
  "popularity": number,           // 0–100 Spotify popularity score
  "spotifyId":  string,           // Spotify artist ID
  "spotifyUrl": string,           // canonical https://open.spotify.com/artist/{id}
  "topTracks":  TopTrack[]        // up to 5 entries (may be empty if fetch failed)
}

type TopTrack = {
  title:      string;
  id:         string;
  previewUrl: string | null;      // 30s preview MP3 — null if not available
  albumArt:   string | null;      // 300px album art
}
```

**Error response (all failure cases):**
```
HTTP [see table below]
Content-Type: application/json

{ "error": string, "code": ErrorCode }

type ErrorCode =
  | "NOT_FOUND"          // artist ID does not exist on Spotify
  | "RATE_LIMITED"       // Spotify 429 or token exchange failure
  | "BLOCKED"            // Spotify API returned non-404/429 error
  | "BAD_REQUEST"        // malformed URL or missing url field
  | "METHOD_NOT_ALLOWED" // non-POST request
```

---

## Error response codes: complete reference table

| Code | HTTP status | Trigger condition | Client display |
|---|---|---|---|
| `NOT_FOUND` | 404 | Spotify GET /artists/{id} returns 404 | "We couldn't find that artist. Check the link or start from scratch." |
| `RATE_LIMITED` | 429 | Spotify returns 429 on any call; or token exchange fails | "Spotify is busy right now — enter your name below and we'll skip it." |
| `BLOCKED` | 502 | Spotify returns any non-404, non-429 error | "Couldn't reach that page. Enter your name below and carry on." |
| `BAD_REQUEST` | 400 | Request body is not valid JSON; `url` field missing; URL does not match artist regex | Client should not hit this in production — validate before calling |
| `METHOD_NOT_ALLOWED` | 405 | HTTP method is not POST | Client always POSTs — this is a defensive guard |
| `TIMEOUT` | — (client) | `AbortController` fires at 8000ms on client side | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |
| `PARSE_ERROR` | — (client) | `res.json()` throws on client (malformed response body) | "Something went wrong reading that page. Enter your name below and carry on." |

Note: `TIMEOUT` and `PARSE_ERROR` are client-generated error codes. They are not returned by the Netlify function — they arise from the `catch` block in `runSpotifyImport()`. They use the same display pattern as function-returned codes.

---

## Remaining gaps at 9.0/10

These are the honest gaps that prevent a 10 even after the spec is complete:

1. **Monthly listeners is not available.** Spotify's public API exposes `followers.total` (a cumulative count, not a monthly active figure). The DESIGN-SPEC copy "45,200 monthly listeners" is wrong. This spec corrects it to "followers" but the artist-facing copy will feel slightly less impressive. No workaround is available without user OAuth. Documented, accepted.

2. **Token caching is per-function-instance.** Netlify functions can spin up multiple cold instances. The in-memory token cache means each new instance makes one token exchange call on its first request. This is not a problem at current scale (one session = one import call) but will need to move to Netlify Blobs or similar when traffic increases. Documented.

3. **No function-level rate limiting.** The Netlify function accepts any POST request. A bot could hammer it and exhaust the Spotify Client Credentials quota. Mitigation at P2: CORS restricted to ablemusic.co domain; mitigation at P3: add a simple request counter in Netlify Blobs and return 429 if > 100 calls/minute from a single IP. Not in this spec version.

4. **Upcoming releases are not importable.** Spotify does not expose upcoming release dates via Client Credentials. The Screen 7 (Current Moment) wizard screen will always be manually filled. A future P3 item could search `/v1/search?q=artist:{name}&type=album&limit=5` and filter by `release_date` to show recent releases, but this is speculative and not in scope.

5. **Playwright tests are not yet written.** The PATH-TO-10.md P3 section defines the test patterns. Until they run in CI, the system is verified by manual QA only.

---

## What "done" looks like

The system is done when:

- An artist pastes `https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ` (The Weeknd)
- Within 2 seconds: the mini spotlight card shows "The Weeknd · [N] followers · Found on Spotify ✓"
- After 1.2 more seconds: Screen 1 appears with "Is The Weeknd right?" and the name pre-filled
- Screen 2 shows the R&B/Pop vibe card pre-selected with "matched" tag
- Screen 8 Done writes a profile where `artworkUrl` is The Weeknd's Spotify image and `spotifyUrl` is the canonical URL
- `able-v7.html` renders with that artwork and a Spotify platform pill populated
- The artist did not type their name, choose their genre, or upload any artwork

That is the quality gate. That is what the system is for.
