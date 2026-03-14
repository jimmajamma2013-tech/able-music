# ABLE — Credits and Professional Ecosystem
**Status: ACTIVE — spec complete. Implementation Phase 2.**
**Last updated: 2026-03-14**
**Detail specs:** `operational/PROFESSIONAL_ECOSYSTEM_SPEC.md`, `operational/PROFESSIONAL_DISCOVERY.md`, `operational/FREELANCER_SPEC.md`

---

## What this engine does

Credits make the professional ecosystem work. Every release card on an artist's ABLE profile can list who made it — producer, mixer, mastering engineer, session musician. Those credits become the discovery surface for the freelancers behind the music.

The Credits engine handles: credit attribution, verification, freelancer profile discovery, and the trust layer between artists and professionals.

---

## Credits (artist-side — V1)

On each release, an artist can add credits:

```javascript
{
  name:       'James Reid',
  role:       'Mastering',
  ableHandle: 'jamesreid',  // null if not on ABLE
  confirmed:  false,         // true after peer confirmation
  external:   null           // LinkedIn / SoundBetter URL if not on ABLE
}
```

Credits are displayed in a collapsed accordion on the artist profile. They are not prominent — they are there for the fans who care and for the professionals who want to be found.

**First 5 credits from new accounts** enter a confirmation workflow before being treated as publicly trusted. No public review system.

---

## Freelancer profile (Phase 2)

A freelancer (producer, mixer, videographer, session musician) who is on ABLE gets:
- A profile page (`able.fm/handle`) with: credits (verified), role/speciality, rate card, portfolio audio/video, availability status, booking CTA
- Discovery via artist release cards — "Mixed by [name] →" links to their profile
- No algorithm — discovery is entirely via credits on artist pages

**What freelancer profiles don't have:** Campaign states, gig mode, fan sign-up, top card. Different use case entirely.

**Detail:** `operational/FREELANCER_SPEC.md`

---

## Professional discovery (Phase 2)

Artists can find collaborators via the credits they see on other artists' profiles. The discovery directory (`operational/PROFESSIONAL_DISCOVERY.md`) defines:
- How credits surface in the `able.fm/directory` view
- Filter by role, location, genre
- Verification badge system (peer-confirmed credits)

**V1:** Credits display only. No directory UI.

---

## Trust model

- Credits are artist-entered in V1. Peer confirmation is the verification mechanism (the credited professional taps "confirm this credit" from their ABLE account).
- Unconfirmed credits display without a verification badge.
- Artists can credit people who aren't on ABLE (name + role only, no link).
- No rating system. No reviews. Discovery is through work quality, not scores.

---

## What the Credits engine does NOT do

- Create a marketplace (ABLE is not a booking platform)
- Replace SoundBetter or Fiverr (ABLE is not a transactional freelance platform)
- Build an "ecosystem" of managed relationships (the artist manages their own relationships)
- Gate credits behind a paid tier (credits are available to all tiers — free includes credits)
