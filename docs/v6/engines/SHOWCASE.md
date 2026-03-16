# ABLE — Showcase / Campaign System
**Status: ACTIVE — spec complete. Implementation Phase 2.**
**Last updated: 2026-03-14**
**Detail specs:** `operational/SHOWCASE_CAMPAIGN_MODE_SPEC.md`, `operational/SHOWCASE_INTERACTION_LAYER.md`

---

## What this engine does

The Showcase system lets an artist turn their ABLE profile into a shareable campaign object — a version of the profile specifically optimised for a specific moment (a release, a tour, a press campaign) that can be shared with press, playlist curators, and anyone who needs to understand the artist's current momentum.

It is not a separate page. It is a mode the profile can enter.

---

## Three showcase contexts

**1. Release campaign**
The profile becomes a release-focused view: top card is the artwork, stream CTA leads, credits are prominent, pre-save / early access / live-now states sequence automatically.

**2. Press mode**
A press-optimised layout: bio at top, high-res artwork, embeds, download links for assets, credits in full. Shareable link generates a `?mode=press` URL. No fan capture in press mode — wrong context.

**3. Tour / gig campaign**
Shows section elevated. Full tour dates visible. Ticket CTAs prominent. Share card optimised for "on tour now" messaging.

---

## Shareable campaign object

```javascript
{
  campaignId:    uuid,
  artistHandle:  'luna',
  type:          'release' | 'press' | 'tour',
  title:         'Echo Chamber — campaign',
  releaseId:     'release-uuid',  // links to specific release
  activeFrom:    ISO date,
  activeTo:      ISO date,
  publicUrl:     'ablemusic.co/luna?campaign=echo-chamber',
  shareCardUrl:  'ablemusic.co/luna/card/echo-chamber.png',
  style: {
    accentOverride: null,  // null = use profile identity
    featureImage:   'https://…',
  }
}
```

**Full canonical object:** `data/CANONICAL_OBJECT_MODEL.md §6`

---

## Share card

A static 1200×630px image (OG image) generated from the current campaign state:
- Hero artwork (full bleed)
- Artist name overlay
- Release title or tour dates
- ABLE branding (subtle, bottom-right)
- Accent-coloured accent bar

Used for Twitter/X cards, Instagram DM previews, press email attachments.

Generation: Netlify function + `@vercel/og` or similar. Phase 2.

---

## Interaction layer

The showcase has specific interaction behaviour distinct from the main profile:
- Progressive reveal on entry: staggered 0ms / 80ms / 200ms / 360ms
- Skeleton states for async asset loads
- Press quote cards: tap to expand, attribution visible
- Download rows: tap to initiate, progress feedback
- Token-gated content: blur state + unlock CTA for supporter-only sections

**Full interaction detail:** `operational/SHOWCASE_INTERACTION_LAYER.md`

---

## V1 status

**Not in V1.** Specs are complete and implementation-ready. Surface-level hooks exist (campaign state machine can drive showcase-style layouts). Full showcase implementation is Phase 2.

**V1 available:** Campaign state machine (profile / pre-release / live / gig) already drives profile section emphasis. This is the functional equivalent of showcase mode for most artists in V1.
