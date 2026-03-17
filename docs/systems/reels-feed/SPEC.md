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

---

### Full-screen player: complete UX specification

This section resolves every open UX decision in the full-screen player so the component can be built without ambiguity.

**How it opens:**

Tapping the play button on a clip card (44px minimum tap target, centred over the thumbnail)
opens the full-screen player modal. The modal animates in from the bottom — a `translateY` from
`100vh` to `0` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (deceleration easing), duration 280ms.

**What it shows:**

```
┌─────────────────────────────────────┐
│                                     │
│   [ X close — top right, 44px ]     │
│                                     │
│                                     │
│       video fills full height       │
│       9:16 aspect ratio             │
│       black bars on sides if        │
│       viewport is wider than 9:16   │
│                                     │
│                                     │
│  [ 🔇 tap to unmute ]  [ caption ]  │
└─────────────────────────────────────┘
```

- Background: `#000000` (pure black — the video is the only thing)
- The video fills the screen. On a phone wider than 9:16, the video centres with black side bars.
  Do not stretch or crop the video to fill — preserve the 9:16 aspect ratio. The content matters
  more than filling every pixel.
- Caption: positioned at bottom-left, above the sound icon row. Max 3 lines. Font: DM Sans 14px,
  `rgba(255,255,255,0.9)`. Fades in 300ms after the modal opens (gives the video a moment to start).

**Sound state:**

Every clip opens muted. This is not configurable. Browser autoplay policies require muted start.

Sound state does NOT persist between clips. Each clip opens muted regardless of whether the
previous clip was unmuted. Rationale: a fan who unmutes one clip and then swipes to the next
should not be surprised by audio starting at full volume. The unmute gesture must be intentional
per clip.

The unmute icon: bottom-left corner. `🔇` (muted state) → tap → `🔊` (unmuted state). Tap again
to re-mute. The icon has a `44px` tap target minimum. A brief label "Tap to turn sound on" appears
below the icon for the first 3 seconds, then fades out.

**Gesture model:**

| Gesture | Action |
|---|---|
| Swipe down | Dismiss modal — regardless of play state. The video does not pause first. It dismisses immediately. |
| Tap X button | Dismiss modal |
| Swipe left | Advance to next clip (if more clips exist in the section) |
| Swipe right | Go to previous clip (if not the first clip) |
| Tap outside video (black side bars) | No action — do not dismiss on tap-outside. The black bars are a visual frame, not a dismiss target. |
| Escape key | Dismiss modal (keyboard accessibility) |

**Clip navigation behaviour:**

- In the full-screen player opened from `able-v7.html`: all clips in the artist's Clips section
  are navigable. The player shows "clip 2 of 5" as a small indicator (bottom-right, `rgba(255,255,255,0.5)`,
  12px) — not prominent, just orientation.
- In the full-screen player opened from `fan.html`: only the tapped clip is shown. No swipe
  navigation between clips in the following feed context. Rationale: in the feed context, clips
  from different artists are interleaved — swiping between them would create a confusing multi-artist
  experience.
- When the last clip is reached and the fan swipes left: the swipe gesture bounces back
  (rubber-band elastic effect, 150ms) with no navigation. Do not loop back to clip 1.

**When the clip ends:**

The video stops. It does not loop. It does not auto-advance to the next clip. The poster frame
(thumbnail) reappears. The play button reappears. The fan can replay or swipe to the next clip
manually.

Rationale: auto-advance is an algorithmic behaviour. ABLE does not use algorithms to sequence
content. The fan decides what to watch next.

**Focus trap:**

When the full-screen player is open, keyboard focus is trapped inside the modal. Tab cycles
between: close button → sound toggle → (if navigable) previous clip button → next clip button →
close button. The artist profile page behind the modal is inert (`aria-hidden="true"` while modal
is open). Escape key closes the modal and returns focus to the clip card that was tapped.

**Implementation note:**

The modal HTML structure:

```html
<div id="clipPlayerModal" role="dialog" aria-modal="true" aria-label="Clip player"
     class="clip-player-modal" hidden>
  <button class="clip-close-btn" aria-label="Close" onclick="closeClipPlayer()">✕</button>
  <div class="clip-video-wrap">
    <!-- iframe or <video> inserted here by JS when clip is opened -->
  </div>
  <div class="clip-player-footer">
    <button class="clip-sound-btn" aria-label="Toggle sound" onclick="toggleClipSound()">🔇</button>
    <p class="clip-caption" aria-live="polite"></p>
  </div>
  <div class="clip-nav-indicator" aria-hidden="true"><!-- "2 of 5" --></div>
</div>
```

The modal is appended to `<body>` once on page load. Opening a clip inserts the video element and
removes the `hidden` attribute. Closing removes the `hidden` attribute and clears the video element
(prevents audio continuing after close on some browsers).

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

---

### fan.html clip thumbnail: confirmed aspect ratio and implementation

**Resolved: 16:9 aspect ratio with `object-fit: cover`.**

This decision is explicit and intentional. ABLE is not TikTok. Clips are supplementary
content within a vertically-scrolled following feed — they are one item type among several
(releases, events, snap card updates). Displaying clips as 9:16 thumbnails in this context
would make clip items significantly taller than all other feed item types, breaking the
visual rhythm of the feed.

**The correct implementation:**

```css
.feed-item-clip .clip-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;      /* Confirmed: 16:9, not 9:16 */
  object-fit: cover;          /* Crops to fill — not letterboxed */
  object-position: center top; /* Bias toward the upper portion of the frame */
  border-radius: var(--radius-sm);
}
```

`object-position: center top` is preferred over `center center` because:
- 9:16 source video thumbnails often have the subject's face in the upper half
- Top-biased crop preserves more of the recognisable content
- For landscape thumbnails (YouTube), `center center` is fine — the `top` bias is a better
  default when the source aspect ratio is unknown

**Why not 9:16 in the feed:**

A 9:16 thumbnail at, say, 343px wide (full-width on an iPhone 14) would be 610px tall — nearly
the full viewport height. That forces the fan to scroll through an enormous single card to see
any other feed items. The feed becomes a de facto full-screen video experience, which is not
what the following feed is designed to be. The full 9:16 experience is reserved for the
full-screen player modal, where it is appropriate and intentional.

**Summary:**
- Feed card thumbnail: **16:9 with `object-fit: cover`**
- Full-screen player modal video: **9:16, fills screen height**
- Artist profile clips row cards: **9:16** (horizontal scroll, tall cards, correct for that layout)

---

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

## Section 10: Analytics pipeline integration (Phase 2)

> V1 tracks nothing. Do not build analytics infrastructure in V1 — keep the file size
> budget intact. This section specifies the Phase 2 analytics design in full so it can
> be built correctly when the time comes, without redesign.

---

### Why clips need their own event types (not just the existing `clicks` table)

The existing `clicks` table records CTA tap events — a fan tapping a button or link
on the artist's profile. Clip plays are a fundamentally different event type:

- They are consumption events, not navigation events
- They have duration (completion rate is the meaningful metric, not just whether the
  clip was tapped)
- They require a separate source dimension (`artist_profile` vs `fan_dashboard`)
- They are not "clicks" in the user's mental model — an artist looking at their analytics
  should see "clicks" and "plays" as clearly different categories

For these reasons, clip events are tracked separately from the `clicks` table.

---

### V2 analytics: intersection observer — when a clip is played

A clip "play" event fires when the full-screen player modal opens (user taps the play
button). This is intentional — it does not fire on view (the clip card appearing in the
viewport), only on explicit play intent.

**The trigger for a `clip_play` event:**

```javascript
// In the openClipPlayer() function, when the modal opens:
function openClipPlayer(clipId) {
  // ... modal open logic ...

  // Fire analytics event
  trackClipEvent({
    event: 'clip_play',
    clipId: clipId,
    artistSlug: getCurrentArtistSlug(),
    source: detectPlaySource(),   // 'profile' if on able-v7.html, 'fan_feed' if on fan.html
    duration: null                // populated later by clip_complete event
  });
}
```

**Source detection:**

```javascript
function detectPlaySource() {
  // Check page context — which page is currently active
  if (document.body.dataset.page === 'fan' || window.location.pathname.includes('fan.html')) {
    return 'fan_feed';
  }
  return 'profile';
}
```

---

### The `clip_play` event object (full specification)

```javascript
{
  event:       'clip_play',         // event type — distinct from CTA click events
  clipId:      string,              // uuid from the clip data object
  artistSlug:  string,              // matches able_v3_profile.slug
  source:      'profile' | 'fan_feed',  // where the clip was played from
  duration:    number | null,       // clip duration in seconds (null if unknown at play time)
  ts:          number               // Unix timestamp in milliseconds
}
```

---

### `clip_complete` event (Phase 2)

Fires when the clip has been watched for ≥ 80% of its duration. Requires knowing the clip
duration and tracking playback position — only possible for `<video>` elements (direct mp4).
For YouTube/TikTok iframes, `clip_complete` is not available due to cross-origin restrictions
on reading iframe playback state.

**For hosted video (Phase 2, after upload is built):**

```javascript
videoEl.addEventListener('timeupdate', function() {
  if (!this._completeFired && this.duration && (this.currentTime / this.duration) >= 0.8) {
    this._completeFired = true;
    trackClipEvent({
      event: 'clip_complete',
      clipId: currentClipId,
      artistSlug: getCurrentArtistSlug(),
      source: detectPlaySource(),
      duration: Math.round(this.duration),
      ts: Date.now()
    });
  }
});
```

**For YouTube/TikTok iframes:** `clip_complete` is not tracked. Record only `clip_play`.

---

### Supabase table for clip events (Phase 2)

Clip events are stored in a separate `clip_events` table — not in the existing `clicks` table.

```sql
CREATE TABLE clip_events (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event        text NOT NULL CHECK (event IN ('clip_play', 'clip_complete', 'clip_unmute', 'clip_share')),
  clip_id      uuid NOT NULL REFERENCES clips(id) ON DELETE CASCADE,
  artist_slug  text NOT NULL REFERENCES profiles(slug),
  source       text NOT NULL CHECK (source IN ('profile', 'fan_feed')),
  duration     integer,           -- clip duration at time of event (seconds)
  fan_id       uuid,              -- null if fan is not authenticated
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX clip_events_clip_id ON clip_events(clip_id, event);
CREATE INDEX clip_events_artist_slug ON clip_events(artist_slug, created_at DESC);
```

**No foreign key on `fan_id`:** Fan may be unauthenticated (public clips) — nullable reference
is correct. When auth is implemented, authenticated play events will have a `fan_id`.

---

### Artist admin analytics for clips (Phase 2)

In `admin.html`, the clips management section gains a per-clip analytics row:

```
[ thumbnail ] [ caption ] [ published ] [ plays: 340 ] [ completions: 68% ] [ edit ] [ delete ]
```

- **Plays**: total `clip_play` events for this clip
- **Completions**: `clip_complete` events / `clip_play` events × 100, formatted as %
  (shown as "—" for YouTube/TikTok where completions are not tracked)

An aggregate "clips" stat card on the admin analytics page:
- Total clip plays this week
- Most played clip this week (title/caption excerpt)
- No "trending" language — show "most played this week" only

**Copy:**
```
Plays this week: 1,240
Most watched: "Studio session, day before the drop" — 340 plays
```

Not: "Your top performer" or "trending clip."

---

### V1 position

V1 tracks nothing. The analytics infrastructure above is Phase 2. In V1:
- No event objects are created
- No analytics rows are created
- The admin clips section shows no play counts
- The correct V1 state: clips section in admin shows only the management UI (add/edit/delete/publish)

Do not add any analytics placeholder UI in V1 — an empty "0 plays" stat is worse than
no stat at all. Analytics appear only when data exists.
