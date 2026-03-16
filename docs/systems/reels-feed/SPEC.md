# Reels Feed — Full Specification
**System: `docs/systems/reels-feed/`**
**Date: 2026-03-16**
**Authority: V8_BUILD_AUTHORITY.md + this document**

---

## Section 1: What a clip is in ABLE's context

A clip is not a TikTok repost. It is not a Reel repurposed from Instagram. It is not
content recycled from one platform and dumped into another.

A clip is a video moment an artist creates — or chooses — specifically for the people
who are already following them on ABLE. It is addressed to people who already care, not
broadcast to an algorithm for discovery.

### The distinction that matters

When an artist posts a Reel on Instagram, they are performing for an algorithm that will
decide how many people see it. The content is shaped by that relationship — it needs a
hook in the first second, it needs watch-time, it optimises for attention from strangers.

When an artist posts a clip on ABLE, they are talking to their fans. There is no
algorithm. The clip goes to the people who signed up. It can be slower, more honest,
less produced. It can be the stuff that didn't make the cut for social — the studio
session before the album drops, the soundcheck from the venue tonight, the voice note
they recorded at 2am.

### What a clip can be

- A 30-second show highlight (raw, from a phone)
- A studio session fragment ("mixing the bridge right now")
- A track walk-through (the artist talking over the song)
- An announcement in their own voice (not a text post — a video)
- A behind-the-scenes moment from a shoot or production day
- An audio-as-video: album artwork looping behind audio (common on YouTube)
- A YouTube Short or TikTok they made, shared here for fans who don't follow them elsewhere

### What a clip should not be

- A promotional asset from a label campaign
- Anything that requires high production value to make sense
- A viral hook repurposed from TikTok — the fan is already here, the hook is unnecessary
- Anything designed to make the artist look good rather than feel present

### Name

The feature is called **Clips** in all user-facing copy. Not "Reels." Not "Videos." Not
"Content." The section header on the artist profile reads "Clips." The add button reads
"Add a clip." The admin section header reads "Clips."

The technical system is called `reels-feed` internally for consistency with Instagram's
vocabulary. Only the user-facing name is "Clips."

---

## Section 2: Clip data object

```javascript
{
  id:           string,         // uuid — generated client-side (crypto.randomUUID())
  artistHandle: string,         // matches able_v3_profile.slug
  type:         'youtube_short' | 'tiktok' | 'video_url' | 'hosted',
  videoUrl:     string,         // the raw source URL (as pasted by artist)
  embedUrl:     string | null,  // resolved embed URL (null if video_url type)
  thumbnailUrl: string | null,  // auto-fetched or manually set
  caption:      string | null,  // max 280 chars — artist voice, optional
  published:    boolean,        // false = draft, true = visible to fans
  access:       'public' | 'fan' | 'supporter',
  // public: visible to any page visitor
  // fan: visible to fans who have signed up (localStorage check or Supabase auth)
  // supporter: Close Circle members get it 48h early, then it opens to fans after
  supporterUnlocksAt: number | null, // Unix timestamp — when supporter-first clip opens to fans
  ts:           number,         // Unix timestamp — date the clip was created/added
  sortOrder:    number,         // lower = appears first in artist's clips section
  duration:     number | null,  // seconds — optional metadata, max 60
}
```

**localStorage key:** `able_clips` — array of clip objects, same pattern as `able_shows`.

**Supabase table (Phase 2):** `clips` — columns match the object above. `artistHandle`
is a foreign key on `profiles.slug`.

---

## Section 3: Artist profile view (`able-v7.html`)

### Placement

The clips section appears:
- Below snap cards in the page content hierarchy
- Above the music section
- Only rendered when the artist has at least one published clip

Section header: **"Clips"** — same style as all other section headers (Barlow Condensed,
uppercase, muted colour, 12px letter-spacing).

### Default layout (fan view)

Horizontal scroll on mobile. 3 clips visible at once, with the edge of a 4th peeking to
signal scrollability. Each clip card is 9:16 aspect ratio. No auto-play.

```
[ card 1 ] [ card 2 ] [ card 3 ] [ p→
```

**Clip card anatomy:**
- Thumbnail fills the card (object-fit: cover)
- Play button centred over thumbnail (44px minimum tap target)
- Caption below the card (if set): max 2 lines, ellipsis overflow, 13px, `--color-text-2`
- Access badge (if `access !== 'public'`): top-right corner, small pill — "Fans" or
  "Close Circle" — applies the same lock treatment as snap card gating

### Full-screen player (on tap)

Tapping the play button on any clip card opens a full-screen vertical player modal:
- Fills the screen (no border, no outer chrome)
- Video plays with sound OFF by default (muted autoplay, per browser policy)
- Sound-on icon: bottom-left corner, tap to unmute
- Caption: bottom overlay, below sound icon, artist's voice text, max 3 lines
- Close button: top-right, 44px, X icon
- Swipe down or tap X to dismiss
- Swipe left/right to navigate between clips in sequence

**The modal is an overlay**, not a page navigation. Back button / swipe-down dismisses it.
The artist profile page remains behind it — no scroll position loss on close.

### Owner mode

When the artist is viewing their own profile (owner mode):
- A "+ Add a clip" placeholder card appears at the start of the clips row (leftmost)
- Each existing clip has a tap-to-edit affordance: long-press or a small edit icon on hover
- Tapping a clip in owner mode opens the clip edit sheet (see Section 4)
- Drag-to-reorder is available in owner mode: press-hold a card, drag left/right

**Owner empty state** (no clips yet):
```
Got a clip? Studio footage, a live moment, anything. Drop it here.
```
With a "+ Add a clip" button below it.

---

## Section 4: Admin management (`admin.html`)

### Section placement

In `admin.html`, the Clips section appears:
- After the Snap Cards section
- Before the Music section
- In the same accordion/expandable panel pattern as other sections

Section header: **"Clips"**

### Clip management UI

**List view:** Each existing clip appears as a row:
```
[ thumbnail ] [ caption preview / "No caption" ] [ access badge ] [ published toggle ] [ edit ] [ delete ]
```

Published toggle: same pattern as snap card publish state.

**Empty state:**
```
No clips yet.
```
With "Add a clip" CTA.

### Adding a clip

Artist taps "Add a clip." A bottom sheet opens (same `openAdminSheet` pattern already
built). The sheet has:

**Step 1: Source**

```
Paste a link to your clip

YouTube Short, TikTok, or any video URL
```

URL input field. On paste/blur, the oEmbed proxy (`netlify/functions/oembed-proxy.js`)
is called to auto-fetch:
- Thumbnail URL
- Title (pre-fills caption if caption is blank)
- Platform type detection (sets `type` field automatically)

Platform detection logic:
```javascript
function detectClipType(url) {
  if (url.includes('youtube.com/shorts') || url.includes('youtu.be')) return 'youtube_short';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('instagram.com/reel')) return 'video_url'; // V1: treat as generic
  return 'video_url';
}
```

If oEmbed succeeds: thumbnail loads, type badge appears. If oEmbed fails: a neutral
placeholder thumbnail is shown. Never block saving because oEmbed failed.

**Step 2: Details**

```
Caption (optional)
```
Textarea, 280 chars max. Character count fades in at 220+, turns amber at 260+, red
at 280 (same E3 pattern already on admin.html bio field).

```
Who can see this?
```
Radio group:
- Everyone — visible to all page visitors
- Fans only — fans who've signed up
- Supporters first — Close Circle members get it 48 hours early

When "Supporters first" is selected: an explanatory note appears:
```
Close Circle members see this for 48 hours. After that, it opens to all fans.
```

**Step 3: Confirm**

"Add clip" button (accent fill, full width). Saves to `able_clips` in localStorage.
Toast: "Clip added." Published: false by default. Artist publishes via the list view toggle.

### Editing a clip

Same bottom sheet, pre-filled. "Save changes" and "Delete clip" buttons at the bottom.
Delete triggers confirmation: "Remove this clip?" — confirm/cancel.

---

## Section 5: Fan feed (`fan.html`)

The clips feed on `fan.html` is the reason this system exists. It is the most compelling
part of the feature.

### Where it lives

Clips from followed artists appear in the **Following** tab of `fan.html`. They are
feed items alongside releases, events, and snap card updates — not in a separate tab,
not in a separate scroll, not in a dedicated clips view.

**Why not a separate TikTok-style vertical scroll tab?**

Because that would make clips a destination — a "Videos" tab the fan navigates to
intentionally. That is the wrong model. The right model is: the fan opens their following
view, sees what their artists have shared this week, and some of those items happen to
be video clips. The clips live in the same flow as everything else. The fan encounters
them in context, not in isolation.

A TikTok-style dedicated clips scroll is Phase 3 scope. It requires high clip volume
(many artists posting regularly) to feel good. At V1 launch, clip volume will be low
— a dedicated clips tab would feel sparse and wrong.

### Clip item in the following feed

Feed item type: `clip`

```
[ artist accent-colour left border ]
[ 9:16 thumbnail, constrained, with centred play icon ]
[ artist name ]  [ "Clip" type badge ]  [ time ago ]
[ caption excerpt — 2 lines max ]
[ "Watch" button ]
```

Tapping anywhere on the item (thumbnail, "Watch" button) opens the full-screen clip
player within `fan.html` — the same modal pattern as on `able-v7.html`.

**Artist name text:** Weight 500, `--color-text-2` — the most important text in the
item, as specified in PATH-TO-10.md P0.6.

**Type badge copy:** "Clip" — consistent with the "Clips" vocabulary used everywhere.

### Autoplay on scroll

When a clip item scrolls into the viewport on `fan.html`:
- The thumbnail animates in (same entrance animation as other feed items)
- No autoplay of the video itself — the fan must tap play
- Rationale: autoplay in a vertically scrolled list creates audio noise and data costs
  the fan did not consent to. ABLE respects both.

**Exception for Phase 3 (dedicated clips tab only):** In a full-screen TikTok-style view,
muted autoplay as the clip scrolls into the full-screen viewport is appropriate. That
context implies the fan is browsing clips intentionally. In the standard following feed
it does not.

### Clip-only feed (Phase 3)

A dedicated "Clips" tab on `fan.html` — vertical, full-screen, swipe-up to advance —
appears only when:
- The fan follows 5+ artists
- At least 3 of those artists have published clips in the last 30 days

Until both conditions are met, clips appear only in the Following feed as standard
items. The tab does not appear for fans with insufficient clip volume — a sparse
TikTok-style scroll is worse than no tab at all.

---

## Section 6: Video source handling

Different source types require different embed strategies. ABLE must handle each
correctly without requiring the artist to understand the technical distinction.

### YouTube Short

**Detection:** URL contains `youtube.com/shorts/` or `youtu.be/` with a short video ID.

**Embed URL construction:**
```javascript
function youtubeEmbedUrl(originalUrl) {
  // https://youtube.com/shorts/ABC123 → https://www.youtube.com/embed/ABC123
  const shortMatch = originalUrl.match(/shorts\/([a-zA-Z0-9_-]+)/);
  const watchMatch = originalUrl.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  const id = shortMatch?.[1] || watchMatch?.[1];
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`;
}
```

**Thumbnail URL:**
```javascript
// No API key required for this endpoint
`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
```

**Embed note:** YouTube iframes must have `loading="lazy"` and `allow="autoplay"`.
The `playsinline=1` parameter prevents YouTube from hijacking fullscreen on iOS.

---

### TikTok

**Detection:** URL contains `tiktok.com`.

**Embed via oEmbed proxy:**
```javascript
// netlify/functions/oembed-proxy.js already handles this
// TikTok oEmbed endpoint: https://www.tiktok.com/oembed?url={encodedUrl}
// Returns: {thumbnail_url, title, html (contains <blockquote> + script)}
```

**V1 approach:** Use TikTok's oEmbed thumbnail for the card thumbnail. For the
full-screen player, embed using the TikTok `<blockquote>` + script pattern.

**Known limitation:** TikTok embed scripts load asynchronously. The full-screen player
must wait for the TikTok script to initialise before the video can play. Show a loading
spinner on the poster frame until `TikTok.onload` fires or timeout after 5 seconds.

---

### Direct video URL (.mp4, .webm)

**V1 scope:** Supported for direct links to video files the artist already hosts
(e.g., from their own server, Dropbox, or Supabase Storage in Phase 2).

**Element:**
```html
<video
  src="{videoUrl}"
  poster="{thumbnailUrl || ''}"
  controls
  playsinline
  preload="none"
  loading="lazy"
>
</video>
```

`preload="none"` is mandatory. Loading video data on page load (not play) is a
performance violation.

**Thumbnail for direct .mp4:** If no manual thumbnail is set, show a neutral dark
placeholder with a play icon. First-frame extraction requires server-side FFmpeg
(Phase 2). Do not attempt client-side canvas extraction — it is unreliable and
introduces CORS complexity.

---

### Instagram Reel

**V1 scope: Not supported.**

Instagram's oEmbed API requires authentication and is frequently restricted. Embedding
Instagram content reliably is not feasible for V1 without a backend session managing
the Instagram API token.

**Artist guidance (shown in the admin URL paste field if Instagram URL detected):**
```
Instagram embeds are restricted. Download the clip and paste a direct video link, or
share it to YouTube or TikTok first.
```

---

### iframe containment rules

All iframes used for video embed must:
- Have `width="100%" height="100%"` (container controls dimensions, not the iframe)
- Be wrapped in a `div.clip-embed-wrap` with `aspect-ratio: 9 / 16`
- Have `loading="lazy"` to prevent offscreen iframe load
- Have `referrerpolicy="strict-origin-when-cross-origin"`
- Have `sandbox="allow-scripts allow-same-origin allow-presentation"` (TikTok and
  YouTube iframes require these three; no `allow-popups` unless specifically needed)
- Never have a fixed pixel height set by JavaScript

---

## Section 7: Copy

All clip-related copy in ABLE voice — direct, specific, no exclamation marks.

### Section header (able-v7.html and admin.html)
```
Clips
```

### Add button (owner mode on able-v7.html and admin.html)
```
Add a clip
```

### Owner empty state (able-v7.html)
```
Got a clip? Studio footage, a live moment, anything. Drop it here.
```

### Owner empty state (admin.html)
```
No clips yet.
```
With "Add a clip" CTA link.

### Fan empty state (following feed — artist has no clips)
Clips are never "expected" in the following feed. If an artist has no clips, nothing
renders for clips from that artist. No empty state. Absence is honest.

### Fan cold-start (following feed — fan follows no artists with clips)
No empty state for clips specifically. The following feed handles its own empty states.
Clips are just one item type among several.

### Gated clip teaser (public view when access is 'fan' or 'supporter')
```
Fans get this first.
```
Sub-line (supporter tier):
```
Close Circle members get this 48 hours early.
```

### Caption placeholder (admin add clip sheet)
```
What's this?
```

### Full-screen player: unmute prompt (first clip play, muted)
```
Tap to turn sound on
```
Small text below the sound icon, disappears after 3 seconds.

### Platform detection confirmation (admin — after URL paste)
```
YouTube Short found.
```
or
```
TikTok found.
```
or
```
Video link found.
```

### Error: unsupported URL
```
That URL isn't supported yet.
```
Sub-line:
```
Try a YouTube Short, TikTok, or a direct video link.
```

---

## Section 8: V1 scope

V1 is localStorage-only. No Supabase. No upload. This is the correct constraint —
prove the concept with the minimal working version before building storage.

### V1 includes
- YouTube Short and TikTok via URL paste + oEmbed
- Thumbnail auto-fetch via oEmbed proxy
- Caption field, access selector (UI only — gating not enforced in V1 without auth)
- Publish toggle
- Clips section on `able-v7.html` — horizontal scroll, full-screen player modal
- Clips management in `admin.html` — list view + add/edit/delete
- Clip items in `fan.html` following feed — as standard feed item cards with thumbnail

### V1 explicitly excludes
- File upload (requires Supabase Storage)
- Supporter-first embargo enforcement (requires auth to identify supporter)
- Fan-only gating enforcement (requires auth to identify fan)
- First-frame thumbnail for .mp4 (requires server-side processing)
- Dedicated clips tab on fan.html (requires clip volume that does not exist at launch)
- Analytics (which clips are watched, completion rate — Phase 2)
- Swipe-between-clips navigation (nice to have, not V1 critical)
- Instagram embed (blocked by auth requirement)

### V1 data flow

```
Artist pastes YouTube Short URL in admin.html
→ oEmbed proxy fetches thumbnail + title
→ Clip object created with type='youtube_short'
→ Saved to able_clips in localStorage
→ Artist publishes (toggle)
→ able-v7.html reads able_clips, renders Clips section
→ fan.html reads able_clips from the followed artist's localStorage window
   (V1 limitation: fan.html and able-v7.html must share the same browser session
    for fan.html to read the artist's localStorage. This is the primary V1 constraint
    that Supabase solves.)
```

**V1 localStorage cross-origin note:** `fan.html` and `able-v7.html` share the same
origin (same domain). `localStorage` is origin-scoped — if both files are served from
the same domain, they share the same `localStorage` object. `fan.html` can read
`able_clips` because it was written by `admin.html` on the same origin.

This works correctly for the single-artist demo use case (James demoing his own page
in the same browser). It will not work when a fan visits `fan.html` in their own
browser — they will have an empty `able_clips` because they have never visited the
artist's admin. This limitation is documented and expected. Phase 2 (Supabase) solves it.

---

## Section 9: Supabase schema (Phase 2)

```sql
CREATE TABLE clips (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_handle   text NOT NULL REFERENCES profiles(slug),
  type            text NOT NULL CHECK (type IN ('youtube_short','tiktok','video_url','hosted')),
  video_url       text NOT NULL,
  embed_url       text,
  thumbnail_url   text,
  caption         text CHECK (char_length(caption) <= 280),
  published       boolean NOT NULL DEFAULT false,
  access          text NOT NULL DEFAULT 'public' CHECK (access IN ('public','fan','supporter')),
  supporter_unlocks_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  sort_order      integer NOT NULL DEFAULT 0,
  duration        integer CHECK (duration <= 60)
);

CREATE INDEX clips_artist_handle_published ON clips(artist_handle, published);
CREATE INDEX clips_created_at ON clips(created_at DESC);
```

**Row-level security (Phase 2):**
- `public` access clips: readable by anyone
- `fan` access clips: readable by authenticated users in `fan_follows` for this artist
- `supporter` clips before `supporter_unlocks_at`: readable by users in `close_circle`
  for this artist only

---

## Section 10: Analytics hooks (Phase 2)

When Supabase is live, clip events are tracked in the `clicks` table (existing, extends
it):

```javascript
{
  event:      'clip_play' | 'clip_complete' | 'clip_unmute' | 'clip_share',
  clipId:     string,
  artistSlug: string,
  source:     'artist_profile' | 'fan_dashboard',
  ts:         number
}
```

Artist admin.html dashboard shows:
- Total plays per clip
- Completion rate (plays where duration ≥ 80% of clip length)
- Most played clip this week

These analytics are Phase 2. V1 tracks nothing. Do not build analytics infrastructure
in V1 — keep the file size budget intact.
