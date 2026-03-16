# Reels Feed — Final Review
**System: `docs/systems/reels-feed/`**
**Date: 2026-03-16**
**Spec quality score: 7.5/10**

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

A fan who watches that clip the day before the album drops is not a passive viewer.
They are being let in early. That is the basis of a real relationship.

---

## Does it compete with TikTok?

No. And the design must continue to make this clear.

ABLE clips are intentionally isolated from discovery. There is no For You feed. There
is no algorithm deciding who sees a clip. A clip posted by an artist goes to the fans
who signed up — and only them (until the supporter embargo lifts, at which point it goes
to all fans of that artist, not to a wider audience).

An artist cannot build an audience through clips on ABLE. That is not the job. ABLE
clips are for deepening existing relationships, not creating new ones. Discovery happens
through the Discover tab on fan.html — and even that is human-signal-based (credits,
location, genre) rather than algorithmic.

The risk is framing. If clips are called "Reels" in the UI, the artist will think of
them as Instagram Reels — content that should be polished, performative, and optimised
for reach. If clips are called "Clips" in the UI and positioned as "something you made
for the people who signed up," the mental model is completely different.

Every copy decision in this spec enforces that distinction. "Fans get this first" is
not a viral hook — it is a statement that the content belongs to the fan relationship,
not to a feed algorithm.

---

## What is the ABLE voice distinction?

**"Your fans, not an algorithm."**

This must be felt at every design decision:

- No view counts on clips (on the artist profile). A public view count turns a clip
  into a popularity contest. The fan should not see whether 3 people watched this or
  3,000. The relationship is between the artist and this specific fan — no comparison.

- No likes, comments, or reactions. ABLE is not a community platform. There is no
  mechanism for fans to respond to clips publicly. This is intentional.
  Direct artist-to-fan is what ABLE does. Fans reacting publicly to artist content
  turns fans into participants in each other's experience. That is a different product.

- No trending clips. Nowhere in ABLE does a clip surface because it is popular or
  because engagement metrics placed it higher. Clips appear in chronological order in
  the fan's following view. Newest first. That is the only ranking.

- The copy never says "your most popular clip" or "this is taking off." Admin analytics
  show play counts because artists need that information to understand what resonates.
  But the display language is "340 plays this week" — not "trending" or "top performer."

---

## Primary risk: clips become a dumping ground

**The risk:** Artists use the clips section to repost TikToks and Reels they already
made for other platforms. The "made for your ABLE fans" positioning erodes. The clips
section becomes a second-rate version of what the fan has already seen on TikTok.

**Why this risk is real:** The path of least resistance for an artist is to paste the
same TikTok URL they just posted to TikTok. It is the same mechanism (URL paste),
it takes the same time, and it produces a visible clip immediately. The product does
not prevent this.

**The mitigation is copy, not restriction:**

The admin clip creation sheet should communicate the intent without lecturing. The
caption placeholder ("What's this?") invites the artist to say something specific —
a reposted TikTok with no caption is a missed opportunity, and the artist knows it.

The onboarding moment for clips (the first time an artist adds a clip) can include a
brief, honest prompt:
```
Clips are for your fans, not the algorithm.
Something you wouldn't post anywhere else is perfect here.
```

This is not a restriction. The artist can still post a TikTok repost. But the product
is designed to nudge them toward something more valuable. Whether they follow that
nudge is their choice.

**Long-term mitigation:** Analytics. When an artist sees that a raw studio clip
has 68% completion and their reposted TikTok has 22% completion, they have data that
shows the ABLE-specific content performs better with their fans. The product teaches
its own lesson over time.

---

## What is missing from this spec (honest gaps)

**1. The full-screen player component is under-specified**

The spec describes the modal overlay pattern but does not specify:
- Gesture model: does swipe-down always dismiss, or does it pause the video first?
- Sound state persistence: if a fan unmutes one clip, does the next clip auto-play
  with sound, or does it reset to muted?
- Clip navigation in the full-screen player: does the artist profile show all clips
  navigable, or only the tapped clip?
- What happens when the clip ends: does it loop, stop, or advance to the next clip?

These are UX decisions that need to be made before the component is built. The
spec author's recommendation: stop on end (no loop, no auto-advance in V1), muted
resets each clip independently, swipe-down dismisses regardless of play state.

**2. The fan.html clip card layout is not precisely specified**

The spec gives the anatomy (thumbnail, artist name, type badge, caption excerpt,
Watch button) but does not specify:
- Exact card height in the following feed
- Whether the thumbnail is full-width or constrained
- How the 9:16 aspect ratio of the thumbnail affects the feed rhythm
  (a 9:16 thumbnail in a horizontal list of cards will make clip items taller than
  other feed item types — this creates visual inconsistency that needs a design decision)

Recommendation: constrain the clip item thumbnail to a fixed 16:9 crop of the 9:16
original (letterboxed or top-cropped) so it matches the height of other feed items.
Reserve the full 9:16 for the full-screen player only.

**3. The Supabase schema does not address clips in the existing analytics pipeline**

The current `clicks` table records CTA tap events. Clip play events are a different
type — they are not "clicks" in the CTA sense. The analytics spec
(`docs/systems/analytics/SPEC.md`) needs to be updated to include clip events before
Phase 2 build. This is noted in SPEC.md Section 10 but not resolved.

---

## Relationship to existing systems

| System | Relationship | Status |
|---|---|---|
| Snap cards (`admin.html`) | Clips use the same add/edit/delete pattern. The bottom sheet component is shared. | Resolved — SPEC.md Section 4 |
| oEmbed proxy | Needs extension to return clip-specific fields. | Resolved — SPEC.md Section 6 |
| Tier gates (`docs/systems/tier-gates/SPEC.md`) | Access gating (`public / fan / supporter`) extends the existing gate system. | Resolved — SPEC.md Section 2 and 4 |
| fan.html following feed | Clip items are a new feed item type alongside existing types. | Resolved — SPEC.md Section 5 |
| CROSS_PAGE_JOURNEYS.md | No new cross-page journeys introduced in V1. Phase 2 adds clip deep-link URL. | Not yet updated |
| Data architecture (`docs/systems/data-architecture/SPEC.md`) | `able_clips` key needs to be added to the data architecture table. | Not yet updated |
| CONTEXT.md | `able_clips` must be added to the data keys table. | Not yet updated |

---

## Final score: spec quality 7.5/10

**What earns it:**
- Concept is correctly positioned (not competing with TikTok, artist-fan relationship focus)
- V1 scope is realistic and achievable without backend
- Data model is complete and maps cleanly to Supabase when backend lands
- Copy is consistent with ABLE voice throughout
- Video source handling covers the real-world cases correctly
- Phase progression is honest about what each phase requires and why

**What holds it back from 9+:**
- Full-screen player UX decisions are not fully resolved (gap documented above)
- fan.html clip card layout needs a design decision on thumbnail aspect ratio
- Analytics integration with existing pipeline is deferred, not resolved
- The spec assumes `oembed-proxy.js` can be extended to handle clip fields — this
  needs to be confirmed against the existing proxy code before build begins
- The V1 cross-origin localStorage limitation is a significant product constraint that
  needs to be communicated clearly to the artist at setup, not just documented in the spec

**What would push it to 9+:**
- A design mockup of the full-screen player states (play, pause, unmuted, caption visible)
- A resolved answer to the fan.html thumbnail aspect ratio question
- Confirmation from code review that the oEmbed proxy extension is straightforward
- A written note in admin.html onboarding copy for clips about the V1 limitation
  ("Clips appear on your page immediately. Your fans need to visit your page in this
  browser to see them — full cross-device clips arrive with the backend update.")
