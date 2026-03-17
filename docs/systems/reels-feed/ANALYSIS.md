# Reels Feed — Current State Analysis
**System: `docs/systems/reels-feed/`**
**Date: 2026-03-16**
**Baseline score: 0/10 — nothing exists**

---

## What this document is

An honest audit of where the reels feed system stands today, what needs to exist, and
why each gap matters. This is not a wishlist — it is the diagnosis that justifies the
specification in SPEC.md.

---

## What exists today

Nothing. Zero. There is no reels or clips feature anywhere in the ABLE codebase. The
closest analogue is snap cards — artist text/image updates that appear as a horizontal
scroll on `able-v7.html`. Snap cards are spec'd, built, and working. Clips are not spec'd,
not built, and not referenced anywhere in the existing docs.

This is an intentional gap. The strategy docs for `fan.html` (`docs/pages/fan/SPEC.md`,
`PATH-TO-10.md`) describe a vertically-scrolling following feed — "items from followed
artists" — but the items currently defined are: releases, events, merch, and snap card
updates. Video clips are not in the data model. `fan.html` has no video player
infrastructure.

---

## Dimension-by-dimension audit

### 1. Concept clarity — 0/10

There is no shared vocabulary for this feature. The brief calls it "reels." Instagram calls
it "Reels." TikTok calls it "videos." ABLE's design philosophy (COPY_AND_DESIGN_PHILOSOPHY.md)
explicitly avoids language borrowed from platforms that use algorithmic feeds. The feature
needs its own name. "Clips" is the right word — see SPEC.md §7 for the reasoning.

The concept is also undefined in relation to snap cards. Snap cards are text + image
moments in the artist's voice. Clips are video moments in the artist's voice. They are
not the same thing and should not be conflated in the UI. The distinction must be designed
explicitly — not left to the user to figure out.

**Gap:** No vocabulary. No concept definition. No distinction from snap cards. No placement
in the product hierarchy.

---

### 2. Artist upload flow — 0/10

There is no mechanism for an artist to add a video clip anywhere in the admin dashboard.
`admin.html` has snap card management (CRUD), show management, merch management, and
section visibility controls. None of these accommodate video.

The upload flow requires decisions that have not been made:
- Does the artist paste a URL (YouTube Short, TikTok, Instagram Reel) or upload a file?
- If URL: which platforms are supported? How is the thumbnail fetched?
- If upload: what format, what size limit, what storage backend?
- What does the preview look like before publishing?
- Is there a caption field? A character limit?
- Can access be gated (public vs fans only vs supporter-first)?

None of these are answered anywhere.

**Gap:** No admin UI. No upload or URL-paste flow. No preview. No publishing state. No
access gate configuration.

---

### 3. Fan feed UX — 0/10

`fan.html` has a Following view that shows feed items from artists the fan follows.
Those items are cards in a vertically-scrolled list: title, type badge, artist name,
timestamp, action button. There is no full-screen vertical video player. There is no
autoplay-on-scroll behaviour. There is no mechanism to distinguish a video item from a
text item in the feed rendering.

The fan-facing clips feed on `able-v7.html` (the artist profile) does not exist either —
there is no clips section in the page content hierarchy as currently built.

**Gap:** No video player component anywhere in the product. No full-screen player.
No autoplay-on-scroll. No clips section on the artist profile. No clip items in the
fan.html following feed.

---

### 4. Cross-platform video format compatibility — 0/10

ABLE's oEmbed proxy (`netlify/functions/oembed-proxy.js`) exists and handles link
auto-fill. It is not specifically designed for video thumbnail/embed extraction.

The relevant platforms — YouTube Shorts, TikTok, Instagram Reels, direct .mp4 — have
different embed requirements:

| Platform | Embed method | Thumbnail availability | Autoplay policy |
|---|---|---|---|
| YouTube Short | `<iframe>` with YouTube embed URL | YouTube thumbnail API (free, no auth) | Blocked by browser autoplay policy without muted |
| TikTok | TikTok oEmbed iframe | TikTok oEmbed thumbnail URL | No autoplay in iframe |
| Instagram Reel | Instagram oEmbed (authentication required) | Unreliable | Blocked |
| Direct .mp4 | `<video>` element | First-frame capture requires server-side FFmpeg | Browser-controlled |

None of this is accounted for in the current build. There is no iframe containment
strategy, no thumbnail caching plan, no muted autoplay fallback.

**Gap:** No platform-specific embed handling. No thumbnail strategy. No autoplay
policy compliance. No iframe containment for 9:16 format.

---

### 5. Mobile experience — 0/10

9:16 vertical video is mobile-native. Displaying it correctly requires:
- Correct aspect ratio enforcement (the container must not collapse or letterbox)
- Touch-based swipe navigation between clips (optional at V1 — see SPEC.md)
- Full-screen on tap (requires the Fullscreen API or a custom modal shell)
- Play/pause on tap (basic, but must not conflict with tap-to-like on social platforms)
- Caption visibility while video plays (requires overlay layout)

None of these patterns exist in the codebase.

**Gap:** No 9:16 video container. No full-screen modal. No mobile video controls.
No caption overlay. No swipe navigation.

---

### 6. Access gating — 0/10

The tier gate system (`docs/systems/tier-gates/SPEC.md`) defines three content access
levels: public, fan (signed-up), and supporter (Close Circle). The clips system needs
to participate in this gate:

- A public clip: visible to any page visitor
- A fan clip: visible only after email sign-up (fan list)
- A supporter-first clip: visible to Close Circle members 48 hours before going public

The mechanism for gating on `able-v7.html` exists (the snap card lock overlay is built).
It has not been extended to a video clip container. The `access` field on the clip data
object is entirely unspecced.

**Gap:** No access field in any data model. No gating UI for clips. No supporter-first
embargo timer. No integration with the tier gate system.

---

### 7. Performance — 0/10

Video is the most performance-sensitive content type in the product. Key concerns:

- **LCP impact:** a video thumbnail or poster frame becomes LCP. Must be lazy-loaded
  below the fold. The hero card (first clip in the section) must have `loading="eager"`
  to avoid LCP regression.
- **iframe offscreen loading:** YouTube and TikTok iframes load significant JavaScript
  even before play. The `loading="lazy"` attribute on iframes is now broadly supported
  and must be used.
- **Autoplay + sound:** autoplay with sound is blocked by every major browser unless
  triggered by user gesture. Muted autoplay is permitted. This must be designed in from
  the start — not patched later.
- **File size budget:** `able-v7.html` is currently 78kB gzipped. Adding video embed
  infrastructure (the player shell, fullscreen modal, clip management JS) must not push
  the file over the 340kB HTML budget.
- **Self-hosted .mp4:** If Supabase Storage is used for uploads (Phase 2), the video
  file must be transcoded server-side to ensure consistent playback. This is a Phase 2
  concern only.

**Gap:** No lazy-load strategy for iframes. No LCP-aware poster loading. No muted
autoplay policy. No performance budget allocation for this system.

---

## Why this gap exists (and why now is the right time to close it)

Snap cards were the right first step. They proved that artists will create first-person
content for their ABLE page without being prompted. The natural evolution is video —
artists already make Reels and TikToks. The friction is: those videos go to TikTok's
algorithm, not to their own fans.

The clips feature is the mechanism by which ABLE becomes the artist's own video layer.
It does not compete with TikTok (the fan has to be following the artist first). It is
not a discovery tool (no algorithm, no For You). It is specifically the place where the
artist shares a video moment with the people who already care about them.

`fan.html` is the reason this feature is strategically essential. The fan dashboard's
"Following" view currently shows text cards. Adding video makes that view feel alive in
a way that text alone cannot achieve. A fan who opens their ABLE dashboard and sees a
30-second clip from an artist they follow — recorded the day before a release — will
come back to the dashboard again. That is the retention mechanic the product currently
lacks.

---

## Score summary

| Dimension | Score | Primary gap |
|---|---|---|
| Concept clarity | 0/10 | No vocabulary, no placement, no distinction from snap cards |
| Artist upload flow | 0/10 | No admin UI for video at all |
| Fan feed UX | 0/10 | No video component, no player, no clips section on profile |
| Cross-platform compatibility | 0/10 | No embed handling, no thumbnail strategy |
| Mobile experience | 0/10 | No 9:16 container, no full-screen, no touch controls |
| Access gating | 0/10 | No data model field, no gate UI |
| Performance | 0/10 | No lazy-load, no LCP strategy, no autoplay policy |
| **Overall** | **0/10** | **Nothing exists** |

---

## What solving this unlocks

| Outcome | Mechanism |
|---|---|
| Fan dashboard feels alive | Video clips become the most engaging item type in the following feed |
| Artist retention increases | Artists who post clips have a reason to return to admin.html regularly |
| Differentiation from link-in-bio tools | No other link-in-bio platform has an artist-owned video feed without algorithmic ranking |
| Fan retention increases | A fan who sees video content from artists they follow has more reason to open fan.html |
| Supporter tier value increases | Supporter-first clips give Close Circle members something concrete — not a badge, a real reward |

None of these outcomes require the clips feature to be perfect at V1. They require it
to exist, work reliably on mobile, and feel like it belongs in the product.
