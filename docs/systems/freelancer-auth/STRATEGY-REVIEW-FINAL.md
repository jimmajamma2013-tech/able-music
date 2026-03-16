# ABLE — Freelancer / Professional Layer: Strategy Review Final
**Last updated: 2026-03-16**
**Score: 5.5/10 (spec 9/10, execution 0/10)**
**V1 ceiling: 9.2/10**

---

## The governing insight

The freelancer layer has a genuinely strong strategic wedge that most platforms have never found: **a professional is discovered through the work they actually did**, not through their self-promotion. Every release an artist posts can contain a live credit link. The fan who loved the production follows it. The artist looking for a producer with that sound follows it. The professional never had to market themselves. The work spoke.

No other platform does this. SoundBetter is a marketplace. LinkedIn is a credential display. Fiverr is a race to the bottom. None of them put the professional inside the artist's world as a natural extension of the release itself. ABLE does.

**This is the real strategic moat.** Not the profile. Not the portfolio. The credited trust trail.

---

## What the layer should fundamentally be

Not a marketplace. Not a directory. Not a portfolio site.

It is a **professional identity layer inside an artist ecosystem.** A producer's profile gains credibility because real artists they worked with are right there, and those artists' pages are the primary surfaces where fans discover ABLE. The trust flows from that ecosystem — not from a star rating, not from a review count, not from platform certification.

The smallest truest version of this job:
> A professional has a presence on ABLE that is made credible by their confirmed credits. When a fan or artist encounters their name on a release card, they can tap it and land somewhere real.

The bigger long-term version:
> ABLE becomes the music industry's trust graph. Credits are verified. Recommendations are peer-attested. Booking enquiries are contextual. The professional's reputation compounds over time through real relationships, not platform gamification.

---

## Why the layer is not 10 yet

1. **Zero execution.** The spec is excellent. The profile page does not exist. The credit claiming flow does not exist. The auth is not configured. No freelancer has ever used this. Score floor: 5.5/10 until any of these exist.

2. **The profile experience is underspecified as UX.** The SPEC.md covers auth and credits thoroughly but the visual and emotional register of the profile itself is not deeply specced. What does a professional land on when they open their profile? What is the first thing they see? What is the hierarchy? This gap matters.

3. **Admin.html activation layers are not built.** The model (artist and freelancer layers in one admin.html, context-appropriate sections) is correct but nothing in admin.html reflects it yet. This is the most expensive missing piece.

4. **No concrete freelancer onboarding flow.** `freelancer-start.html` is referenced but does not exist. There's no designed entry path for a professional arriving at ABLE.

5. **Credits on artist releases not implemented.** The release card in admin.html has no credits field. This is the most critical pre-work item. Without it, the entire discovery mechanic cannot function.

6. **Rate card and availability signal are underspecified.** Research confirms these are the two things that matter most to prospective clients (can this person do my project? can they do it on my timeline?). The spec mentions them but doesn't fully resolve the UX.

---

## The 10 highest-leverage improvements

**1. Add credits[] to release cards in admin.html (pre-work)**
- What: Each release object gets a `credits` array with `{ name, role, handle }` fields. Handle is null until a freelancer account exists.
- Why: This is the entire acquisition mechanic. Without it, no professional can be discovered through an artist's page. Every release created today without this field needs retroactive migration.
- Type: product strategy / data architecture
- Difficulty: low (one form field, one data key)
- Lift: unlocks the whole system

**2. Credit live-link rendering in able-v7.html**
- What: On release cards, credits with a non-null handle render as tappable links to the professional's profile.
- Why: This is the moment fans and artists encounter the professional for the first time.
- Type: UX / discovery
- Difficulty: low
- Lift: makes the credits architecture visible and real

**3. freelancer-start.html onboarding wizard**
- What: Minimal wizard. Role selection, positioning statement, first audio sample, rate card/availability, release credit claim.
- Why: First impression, professional confidence. Must feel serious, not generic.
- Type: product / activation
- Difficulty: medium
- Lift: creates the first real freelancer account

**4. Professional profile page (freelancer.html or admin.html activated layer)**
- What: The public-facing professional profile. Credits, portfolio, role, positioning, rate/availability signal, booking enquiry.
- Why: This is what people land on when they follow a credit link.
- Type: UX / trust
- Difficulty: medium-high
- Lift: makes the layer real

**5. Credit claiming and confirmation flow**
- What: Freelancer claims a credit on an artist's release. Artist receives confirmation request. If confirmed: credit becomes live link. If denied/expired: credit stays as plain text or is removed.
- Why: The trust model depends on this. Self-claimed unverified credits undermine everything.
- Type: trust / product strategy
- Difficulty: medium (requires Supabase + email notification)
- Lift: critical for trust

**6. Booking enquiry form (4 fields, relay-protected)**
- What: Name, project brief, timeline, budget (optional). Submitted to ABLE relay, not direct email. Freelancer's email never exposed until they choose to reply.
- Why: Enquiry-first, not marketplace-first. Low friction, high trust.
- Type: UX / commercial
- Difficulty: medium (requires Netlify function for relay)
- Lift: creates first conversion path

**7. Availability signal**
- What: Simple 3-state indicator: "Available now", "Available from [Month]", "Not taking on work right now." Set in profile. Shown prominently on profile and on credit links.
- Why: The single most practically useful piece of information for prospective clients. Prevents wasted enquiries.
- Type: UX
- Difficulty: low
- Lift: high for conversion

**8. Professional profile emotional register**
- What: The profile must feel like a serious creative's space, not a marketplace listing. Sparse, typographically precise, led by the work (audio samples / credits), not by marketing.
- Why: The emotional register of the page determines whether serious professionals want to be on it. Bandcamp understood this for artists. ABLE needs to find it for professionals.
- Type: design / premium feel
- Difficulty: medium (design decisions)
- Lift: high for reputation

**9. Fan-facing credit discovery**
- What: From a fan's perspective, when they're on fan.html Discover, "The people behind the music" section shows professionals credited on artists they follow. Tapping takes them to the professional's profile.
- Why: Fans discover professionals through their love of specific recordings. This is a genuinely new discovery path that doesn't exist on any other platform.
- Type: discovery / strategic
- Difficulty: low (already stubbed in fan.html Discover)
- Lift: medium-high (positions ABLE as music industry's trust graph)

**10. Testimonials / artist recommendations**
- What: Artists who worked with a professional can leave a short written recommendation (1–2 sentences). Shown on professional profile. Not a star rating — a human voice.
- Why: SoundBetter runs on star ratings, which are gameable. Artist recommendations in their own voice are much more credible. "She mixed my EP and made it feel like it was supposed to sound that way." That line is worth more than 50 five-star ratings.
- Type: trust
- Difficulty: medium (requires UI in admin.html for artists to write recommendations)
- Lift: high for premium feel and credibility

---

## The single most important strategic improvement

**Add credits[] to release cards in admin.html now, before any freelancer is invited.**

This is the pre-work item from PATH-TO-10.md and it cannot wait. Every release card created without it will need retroactive migration. The data model costs almost nothing to add today. Without it, the entire "discovered through your work" acquisition mechanic is impossible.

---

## The single most important trust improvement

**Credit verification with hard asymmetry.** Unconfirmed credits must render differently (plain text, 70% opacity) from confirmed credits (live link, full opacity). The moment a platform allows self-claimed unverified credits to appear identical to confirmed ones, the trust model is broken. This asymmetry rule must be enforced at the rendering layer — not just a policy.

---

## What specifically brings the layer to 10

1. Credits in release cards (admin.html) — data model exists, rendering exists
2. Credit live links on artist profile pages (able-v7.html) — tappable
3. freelancer-start.html onboarding (role, positioning, first audio sample, first credit claim)
4. Professional profile page — credits, portfolio, rate/availability, booking enquiry
5. Credit confirmation flow with Supabase notifications
6. Booking enquiry relay (Netlify function)
7. "The people behind the music" on fan.html Discover populated by real credits data
8. Artist recommendations in own voice (admin.html → professional profile)

With Supabase: realtime credit confirmation, booking history, testimonial management. V1 ceiling: 9.2/10.

---

## What must never be added

- Star ratings or review scores (gameable, cheapens the brand)
- Price listings with "Starting at £X" marketplace-style tiles (race to bottom energy)
- Trending / popular / featured professionals discovery (algorithmic, wrong philosophy)
- Public metrics (client count, response rate, profile views visible to others)
- Cold outreach tools (professionals reaching out to artists they don't know)
- Services packages / gig format (this is not Fiverr)
- Any mechanism that makes the professional feel like they need to compete on price
- Fan-to-professional direct contact without artist mediation in V1 (fan → artist → professional is the right trust path)

---

## 10/10 freelancer / professional layer doctrine

This layer is not a marketplace and it is not a portfolio. It is the professional world behind the artist world — visible because of real credited work, credible because of peer confirmation, and discoverable in the same places fans already spend time. A producer who made a record you love is one tap away from their work. They don't advertise. Their credits speak for them.

---

## Build order (no exceptions)

1. Add `credits[]` to admin.html release model (pre-work — unblocks everything)
2. Render credit live links on able-v7.html release cards (handle = live link, no handle = plain text)
3. `freelancer-start.html` minimal wizard (role, positioning, first credit claim)
4. Professional profile page (credits-led, portfolio, availability, booking enquiry form)
5. Credit confirmation flow (Supabase notification → artist confirms/denies → handle populated/removed)
6. Booking enquiry Netlify relay function
7. "The people behind the music" on fan.html Discover populated from real data
8. Artist recommendations (admin.html + professional profile)
9. Discord optional connect (settings only, Phase 2)
10. Before/after audio comparison player (Phase 2, needs portfolio first)

---

## File updates — what belongs where

- `docs/systems/freelancer-auth/SPEC.md`: Add "profile emotional register" section (sparse, credits-led, not marketplace-style). Add clear note that the page's visual hierarchy should be: name/role, credits, availability, portfolio, booking enquiry — in that order. Currently the spec covers auth and credits mechanics thoroughly but the profile hierarchy is not specified.

- `docs/v6/core/V6_BUILD_AUTHORITY.md` §8.3 and §11.3: Add note that credits pre-work in admin.html is now the highest-priority unblocked item across the entire roadmap. The window closes the moment any freelancer joins.

- `docs/pages/profile/DESIGN-SPEC.md`: Add `credits` rendering specification for release cards in able-v7.html. Handle non-null = `<a href="/[handle]">[name]</a>`. Handle null = `<span>[name]</span>`. Confirmed = full opacity. Pending = 70% opacity. Style: small, below release title, grey-text with artist accent on hover.
