# Reels Feed — Final Review
**System: `docs/systems/reels-feed/`**
**Last updated: 2026-03-16**
**Spec quality score: 8.5/10 (updated from 7.5 — full-screen player resolved, thumbnail spec confirmed, analytics pipeline integrated)**

---

## What changed to earn 8.5

Three gaps from the previous review are now resolved:

**1. Full-screen player UX — resolved**

The four open questions are now answered in SPEC.md (Section 3, "Full-screen player: complete UX specification"):

- Gesture model: swipe-down always dismisses regardless of play state. No pause-first intermediary.
- Sound state: resets to muted on every new clip independently. Sound state does not persist between clips.
- Clip navigation context: navigable on `able-v7.html` (all clips in sequence), not navigable on `fan.html` (single clip only — multi-artist feed context makes swipe-between confusing).
- When clip ends: stops. Does not loop. Does not auto-advance. Fan decides what to watch next.

The focus trap implementation is also now fully specified — `aria-modal`, `aria-hidden` on background, Escape key, tab cycle through interactive elements.

**2. fan.html thumbnail aspect ratio — confirmed 16:9**

SPEC.md now contains the explicit, reasoned decision: clip thumbnails in the fan.html following feed are 16:9 with `object-fit: cover`, not 9:16.

The reasoning is documented: a 9:16 thumbnail in a vertically-scrolled mixed-content feed would be 610px tall on a standard phone — nearly full-viewport, forcing the fan to scroll through an enormous single card to see anything else. The full 9:16 format is reserved for the full-screen player modal, where the full aspect ratio is appropriate and intentional.

`object-position: center top` is specified as the preferred default for the crop bias — better than `center center` for 9:16 source content where subject matter tends to be in the upper portion of the frame.

**3. Analytics pipeline integration — specified**

The previous spec deferred analytics to Phase 2 without specifying how they would work. SPEC.md Section 10 now contains:

- Why clip events need a separate table from the existing `clicks` table (consumption events vs navigation events, duration tracking, different source dimensions)
- The full `clip_play` event object with all fields and types
- `clip_complete` event specification with the 80% threshold and the YouTube/TikTok limitation (cross-origin iframes cannot report playback position)
- Source detection function (`detectPlaySource()` — returns `'profile'` or `'fan_feed'`)
- Intersection observer pattern: play event fires on modal open (explicit intent), not on viewport entry (passive exposure)
- Full Supabase `clip_events` table schema with correct constraints and indexes
- V1 position: tracks nothing, no placeholder UI

---

## Does this feature strengthen the artist-fan relationship?

Yes. Unambiguously.

Snap cards prove that artists will create first-person content specifically for their
ABLE fans — they are using the platform to communicate, not just to park links. Video
is the natural next step. A 30-second clip from the studio the day before a drop is
more intimate than a text card. The artist's voice, environment, and energy are present
in a way that words cannot replicate.

The key distinction is the audience. When an artist posts to Instagram, they are
broadcasting to an algorithm. When they post a clip to ABLE, they are talking to the
people who already signed up. The content can be different — less polished, more honest,
more direct. That difference is what makes it relational rather than performative.

---

## Does it compete with TikTok?

No. And the design must continue to make this clear.

ABLE clips are intentionally isolated from discovery. There is no For You feed. There
is no algorithm deciding who sees a clip. A clip posted by an artist goes to the fans
who signed up — and only them (until the supporter embargo lifts, at which point it goes
to all fans of that artist, not to a wider audience).

An artist cannot build an audience through clips on ABLE. That is not the job. ABLE
clips are for deepening existing relationships, not creating new ones.

The risk is framing. If clips are called "Reels" in the UI, the artist will think of
them as Instagram Reels — content that should be polished, performative, and optimised
for reach. "Clips" in the UI and "Clips are for your fans, not the algorithm" as the
first onboarding prompt set the right mental model.

---

## What is the ABLE voice distinction?

**"Your fans, not an algorithm."**

This must be felt at every design decision:

- No view counts on clips on the artist's public profile. The fan should not see whether 3 or 3,000 people watched this. The relationship is between the artist and this fan.
- No likes, comments, or reactions. ABLE is not a community platform. Direct artist-to-fan is what ABLE does.
- No trending clips anywhere. Clips appear in chronological order. Newest first. That is the only ranking.
- Analytics language: "340 plays this week" — not "trending" or "top performer."

---

## Primary risk: clips become a dumping ground

Artists may use the clips section to repost TikToks and Reels they already made for other platforms.

The mitigation is copy, not restriction. The caption placeholder ("What's this?") invites the artist to say something specific. The first-clip onboarding prompt:

```
Clips are for your fans, not the algorithm.
Something you wouldn't post anywhere else is perfect here.
```

Long-term mitigation: analytics. When an artist sees that a raw studio clip has 68% completion and their reposted TikTok has 22%, the product teaches its own lesson.

---

## What is still missing from this spec

**1. The `oembed-proxy.js` extension is not confirmed**

SPEC.md assumes `netlify/functions/oembed-proxy.js` can return `thumbnail_url`,
`provider_name`, and `embed_url` for clip-specific use. The extension is described in
SPEC.md (Section 4, admin flow — URL paste → oEmbed proxy) but the existing proxy code
has not been audited to confirm the extension is straightforward. A 30-minute code review
of the existing proxy against the TikTok and YouTube oEmbed endpoints is required before
build begins.

**2. The V1 cross-origin localStorage limitation needs in-product communication**

The V1 constraint — fan.html can only display clips from artists whose admin has been
opened in the same browser — is documented in the spec but not addressed in the product
UX. Artists should see a brief note when they publish their first clip:

```
Clips appear on your page immediately. Your fans will see them when they visit your page.
Full cross-device support arrives with the next update.
```

This is copy work, not engineering work. It should be in the admin clip publish confirmation toast.

**3. CONTEXT.md and data architecture docs not yet updated**

`able_clips` must be added to the localStorage key table in CONTEXT.md and in
`docs/systems/data-architecture/SPEC.md`. This is documented in this file but not yet done.

---

## Score trajectory

| Phase | Score | Primary change |
|---|---|---|
| Baseline | 0/10 | Nothing exists |
| Spec complete | 8.5/10 | Full-screen player resolved, 16:9 confirmed, analytics pipeline specified |
| V1 built | 7.5/10 (product) | Clips on profile + admin + fan feed (embeds only, no auth) — product scores lower than spec because V1 constraints apply |
| V2 built | 8.5/10 (product) | Supabase + upload + auth-enforced gating + analytics |
| V3 built | 10/10 (product) | Push notifications + dedicated clips tab |

---

## Relationship to existing systems

| System | Relationship | Status |
|---|---|---|
| Snap cards (`admin.html`) | Clips use the same add/edit/delete pattern. The bottom sheet component is shared. | Resolved — SPEC.md Section 4 |
| oEmbed proxy | Needs extension to return clip-specific fields. | Described — code review needed before build |
| Tier gates | Access gating (`public / fan / supporter`) extends the existing gate system. | Resolved — SPEC.md Section 2 and 4 |
| fan.html following feed | Clip items are a new feed item type alongside existing types. 16:9 thumbnail confirmed. | Resolved — SPEC.md Section 5 |
| Full-screen player | Modal overlay, focus trap, gesture model, sound state all resolved. | Resolved — SPEC.md Section 3 |
| Analytics pipeline | Separate `clip_events` table, intersection-based tracking, `clip_play` and `clip_complete` events specified. | Resolved — SPEC.md Section 10 |
| CONTEXT.md | `able_clips` must be added to the data keys table. | Not yet updated |
| Data architecture | `able_clips` must be added to the data architecture table. | Not yet updated |

---

*Next review: after V1 build is complete*
