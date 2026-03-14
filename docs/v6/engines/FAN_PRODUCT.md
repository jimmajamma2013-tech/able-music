# ABLE — Fan-Side Product
**Status: ACTIVE — fan capture V1 complete. Fan dashboard Phase 2.**
**Last updated: 2026-03-14**
**Detail specs:** `operational/FAN_DASHBOARD_SPEC.md`, `operational/SUPERFAN_SCORING_ALGORITHM.md`, `operational/DISCOVERY_DIRECTORY_SPEC.md`

---

## What this engine does

The fan-side product is what the person on the other side of the link-in-bio experiences. In V1, that's primarily the artist profile itself — a fan lands, sees something beautiful and specific, does something (streams, signs up, buys a ticket).

Phase 2 is where the fan gets their own surface: a dashboard showing every artist they follow, upcoming shows, new releases, and the ability to manage their own relationship with each.

---

## V1 fan experience

### Fan capture
The primary fan-side interaction in V1. The fan gives their email. The artist owns it.

- Placement: after hero, bio, and pills (screenful 3). Never above fold.
- Copy: "Stay close." — first-person CTA ("I'm in" / "Count me in")
- Trust line: "Just [Artist Name]. No spam."
- GDPR: double opt-in. Optimistic UI (confetti + echo fires immediately). Confirmation email sent in background. Unconfirmed fans marked `○` in fan list, excluded from broadcasts.
- Secondary capture: bottom of page above footer (for fans who read everything)

### Fan-side World Map
Public moments on the World Map are visible to all visitors. Fan-gated moments show as locked cells until email sign-up. Supporter-gated moments show lock-ring dots until supporter join.

### Close Circle (supporter tier)
The fan-side of Close Circle is handled by the Close Circle engine. See `engines/CLOSE_CIRCLE.md`.

---

## Phase 2 — Fan dashboard (`fan.html`)

The fan gets their own dashboard: every artist they follow in one place. Shows upcoming moments (shows, releases, sessions) across all followed artists in a unified calendar view.

Key fan dashboard features (Phase 2):
- Artist cards: latest release, next show, unread dispatches
- Unified moment calendar (cross-artist)
- Notification preferences per artist
- Fan profile (name, location — artist can see this in their analytics)
- Manage supporter subscriptions

**Detail:** `operational/FAN_DASHBOARD_SPEC.md`

---

## Superfan scoring (Phase 2)

An internal score (not shown to fans) that ranks fan engagement for an artist:
- Sign-up date (how early?)
- CTA taps (how active?)
- Supporter tier (how committed?)
- Show attendance (via check-in or ticket match)
- Broadcast opens (how responsive?)

Used to power: "You have 12 superfans in Manchester" analytics for the artist. Used to prioritise invite-only moment access. Never shown to the fan as a public score.

**Detail:** `operational/SUPERFAN_SCORING_ALGORITHM.md`

---

## Discovery directory (Phase 2)

How fans discover new artists via ABLE. Not an algorithm — a directory with intent.

- Browse by genre, location, upcoming shows
- "Artists followed by artists you follow" — social graph without a feed
- Velocity leaderboard (which artists are growing fastest in your area) — Phase 2+

**Detail:** `operational/DISCOVERY_DIRECTORY_SPEC.md`

---

## Fan analytics (V1 — artist-facing)

The artist sees fan data, not the fan. In V1:
- Fan count (confirmed vs unconfirmed)
- Source breakdown (direct / instagram / tiktok / youtube / qr / email / other)
- Geographic distribution (country level — Phase 2 for city level)
- CTA tap events (which CTAs fans tap, when)
- View events (traffic, peak times)

---

## What this engine does NOT do

- Create a social feed (no posts, no comments, no likes)
- Give fans influence over the artist's profile (the artist controls everything)
- Score fans publicly (superfan scoring is internal and artist-visible only)
- Enable fan-to-fan interaction (ABLE is not a community platform)
