# ABLE — Freelancer Auth + Features: Path to 10/10
**System:** Freelancer Auth + Features
**Date:** 2026-03-16

---

## Current state assessment

The base freelancer spec (FREELANCER_SPEC.md) is solid on profile components and the discovery mechanism. The auth question was unresolved. Extended features (Discord, before/after player, advanced enquiry analytics, specialisms for discovery) were not fully specced.

**Current score: 4/10** (good foundation spec, no auth decision, limited feature depth, nothing built)

---

## Path to 10

### Step 1: Magic link auth for freelancers (prerequisite)
**Moves score to: 5/10**

Supabase Auth magic link flow extended to support `profileType: 'freelancer'` at account creation. The onboarding wizard branches at the start: "I'm an artist" / "I'm a creative professional (producer, engineer, photographer, etc.)".

- Supabase profile record created with `profile_type: 'freelancer'`
- freelancer-start.html wizard (5 steps per SPEC.md §8)
- Done screen with share options and "add to email signature" snippet
- Profile live at `ablemusic.co/[handle]`

---

### Step 2: Core freelancer profile (credits, rate card, availability, basic portfolio)
**Moves score to: 6.5/10**

Build the freelancer-facing public profile (able-v7.html rendering in freelancer mode):
- Identity header (name, role tag, location, hero CTAs: "Book me" + "Listen to work")
- Credits section (confirmed / pending / unverified states, visual distinction)
- Rate card section (when shown)
- Availability status with dot indicator
- Basic portfolio (audio embed, video embed)
- Booking enquiry bottom sheet (form, ABLE relay)
- Artists on ABLE section (auto-populated from confirmed credits)
- Tab bar: Home / Credits / Work / Rates / Contact

---

### Step 3: Credit verification system
**Moves score to: 7.5/10**

Both confirmation flows (freelancer-initiated and artist-initiated):
- Freelancer adds credit → notification sent to artist
- Artist adds credit on release → notification sent to freelancer
- Both parties confirm → ✓ confirmed state
- Deny flow: removes credit, notifies the claimant
- 30-day pending expiry → unverified state
- Anti-abuse: rate limits, manual review queue for first 5 credits on new profiles
- `able_credits` table in Supabase: confirmed credits are indexed across both artist and freelancer profiles

---

### Step 4: Discord OAuth integration
**Moves score to: 8.0/10**

- "Connect Discord" in freelancer settings
- Full OAuth 2.0 flow (per SPEC.md §1.5)
- ABLE Community Member badge displayed if server member
- Discord handle optional display on profile
- Graceful error handling (Discord down, not a server member)
- Discord DM notifications for new enquiries (requires ABLE Discord bot — Phase 2 dependency)

---

### Step 5: Extended portfolio (before/after player, photo grid)
**Moves score to: 8.5/10**

- Before/after audio comparison player (per SPEC.md §6.1)
- Photo grid portfolio type
- All four portfolio item types working (audio, video, photo grid, before/after)
- oEmbed loading for audio and video
- Portfolio reorder (drag in dashboard, or up/down on mobile)
- Portfolio item analytics shell (counter on each item, Phase 2 to query enquiry linkage)

---

### Step 6: Freelancer dashboard (full)
**Moves score to: 9.0/10**

- All dashboard sections built: Overview, Credits, Portfolio, Enquiries, Availability, Settings
- Profile completeness score + actionable nudge
- Enquiry list with reply CTA
- Credit management (confirm, deny, add new)
- Availability toggle with auto-expiry notification
- Specialism selection (primary + secondary)
- "Discovered via credits" analytics: how many profile views came from which credits

---

### Step 7: Discovery and "discovered via" link
**Moves score to: 9.5/10**

- Every confirmed credit on an artist's release renders as a live link if the freelancer is on ABLE
- Plain text fallback for freelancers not yet on ABLE
- Notification to freelancer on first credit link conversion
- Discovery analytics: per-credit profile visit count in freelancer dashboard

---

### Step 8: Premium Freelancer tier + booking deposits
**Moves score to: 10/10**

Phase 2:
- Premium Freelancer tier (£9/month) with feature gates
- Unlimited portfolio items on Premium
- Portfolio item enquiry attribution analytics
- Featured placement on credits display
- Discord booking DM notifications
- Booking deposit facilitation (Stripe Connect, 3% take)
- Priority support for Premium freelancers

---

## Honest ceilings

**The credits system requires artist adoption first.** The freelancer profile is only as valuable as the credits backing it up. If there are 20 freelancers on ABLE but their artists haven't confirmed any credits, the profiles look weak. The credit confirmation flow must be a priority in artist onboarding, not an afterthought.

**Discord will help but won't be transformative.** The ABLE Community badge is a nice signal. Discord DM notifications are a genuine convenience. But the core value — verified credits, booking enquiries, professional profile — doesn't depend on Discord at all. Build Discord as enrichment, not infrastructure.

**The before/after player is genuinely differentiating** for mixing and mastering engineers. No other platform has this. It is a direct demonstration of skill, not a portfolio link. Prioritise building it correctly over building it fast.

**Free freelancers may strain infrastructure at scale.** If ABLE has 10,000 active freelancers on the free tier, the enquiry relay and notification systems become meaningful infrastructure costs. Model this before Scale. The Phase 2 Premium tier is partly a response to this — highly active freelancers who want analytics are also the ones most likely to value and pay for Premium.
