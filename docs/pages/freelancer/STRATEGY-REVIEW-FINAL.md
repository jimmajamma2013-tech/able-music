# Freelancer Profile — Strategy Review
**File: `freelancer.html` | Created: 2026-03-16**
**Concept score: 6.7/10 | Projected ceiling: 9.2/10**

---

## THE STRATEGIC INSIGHT

The freelancer profile's entire credibility engine is the credit link.

A credit on a real artist's ABLE page that becomes a live link — "Produced by Maya Beats ●" → `ablemusic.co/mayabeats` — is worth more to the freelancer than any badge, any star rating, any self-written bio, any portfolio upload, any platform endorsement. Here is why:

**It is contextual authority.** The visitor (fan or artist) encountered the credit while engaging with music they already care about. They heard the track. The production moved them. They followed the name. By the time they land on Maya's freelancer profile, their ear has already made the primary judgment call. The profile's job is to confirm and convert, not to persuade from cold.

This is the opposite of a marketplace. On SoundBetter or Fiverr, the freelancer competes on a feed against dozens of similar-looking profiles, differentiated only by star rating and price. The credit link delivers a visitor who already has a reason to care. The entire value architecture of the freelancer profile flows from this single entry point.

---

## WHY THE CREDIT SYSTEM IS THE CORE ARCHITECTURE, NOT A FEATURE

The rest of the profile — the booking form, the rate card, the portfolio, the availability chip — exists to serve the traffic the credit system delivers. Build the credit system wrong and the rest of the page is irrelevant. Build the credit system right and the page becomes a self-reinforcing discovery engine.

The mechanism:
1. Maya produces a track for Nadia
2. Maya adds a credit; Nadia confirms it (one tap)
3. Nadia's release card now shows "Produced by Maya ●" — a live link
4. Every future visitor to Nadia's ABLE page who taps that credit arrives at Maya's profile as warm, pre-validated traffic
5. Maya produces a track for Jordan R. → same process → another credit link → more warm traffic
6. Each credit is a passive acquisition channel with zero ongoing effort from Maya

The flywheel compounds. Every artist Maya works with is a new discovery channel. The career network that previously existed only in private text threads now has a public surface.

---

## THE TRUST HIERARCHY (what actually converts)

The research is clear about what music industry clients trust:

1. **Named credits on real, known releases** — contextual authority. Non-fabricatable.
2. **Specific testimonials from named artists** — "Maya understood exactly what the record needed." Not "Great to work with."
3. **Portfolio samples aligned to what the client is seeking** — genre/aesthetic match, not bulk upload
4. **Honest, current availability signal** — "Selective right now" (honest) > "Available" (stale)
5. **Transparent rate starting points** — "From £300/track" eliminates the "can I even afford this?" anxiety before a conversation starts

What does not convert: platform badges, "verified" labels without clear source, stream count boasting, generic bio copy, star ratings without context.

The freelancer profile is built around this hierarchy in section order:
- Credits (1, 2) → Portfolio (3) → Rates + Availability (4, 5) → Booking form

---

## THE MOST IMPORTANT BUILD DECISION: KEEP THE BOOKING FORM CLEAN

The single most differentiating design decision in the entire freelancer profile is what the booking form does NOT contain:

- No budget field
- No "select a service" dropdown
- No timeline selector
- No file upload
- No "how did you hear about us"

The research is unambiguous: every additional field reduces completion rate. More critically: "select a budget" and "select a service" fields create marketplace energy — they make the artist feel like they are shopping, not reaching out to a collaborator. They lower the quality of the enquiry and lower the conversion rate simultaneously.

Four fields: name, email, what you're working on, what you need. That is the whole form. The conversation starts with these four things and continues over email. ABLE is the door, not the inbox.

If this form is ever expanded — for any reason — it should be treated as a regression until proven otherwise.

---

## THE EMPTY STATE IS THE HARDEST PROBLEM

The concept scores 5/10 on empty state. This is the platform's most significant cold-start challenge for the freelancer product.

A new freelancer who signs up today has a live profile with their name, role, availability, and booking form — and nothing else. No confirmed credits. No portfolio. A visitor who arrives (perhaps via a direct link the freelancer shared themselves) sees a page that is trying to be something it is not yet.

Three mitigations are specced in PATH-TO-10.md:
1. Wizard blocks publish until at least one portfolio sample is added (takes 30 seconds)
2. Pending credits show as "awaiting confirmation" rather than as absent — the profile has something to say about its own state
3. Optional first-person bio captures what credits will eventually prove

But the honest assessment is: the page only reaches its potential when the credit system has real density. A freelancer who completes onboarding, adds 3 credits, gets 2 confirmed within the first week, and has a SoundCloud link on their profile has a compelling page. The first credit confirmation is the tipping point.

This means the peer-confirmation notification to the artist (P0.2) is the highest-priority UX decision after the data model. If the confirmation rate is low, the flywheel never starts.

---

## BUILD PRIORITY RECOMMENDATION

The freelancer profile should not be built until:
1. The artist profile (able-v7.html) is complete with a release card that supports credits
2. The artist admin (admin.html) has the peer-confirmation notification UI
3. The credit data model (P0.1) is finalised

This is Phase 13 in the existing roadmap (as specified in FREELANCER_SPEC.md). The profile reuses 80% of the artist profile rendering code — the Surface 1 design system, the theme system, the booking form bottom sheet pattern, the tab bar. The incremental build cost is lower than it appears.

**The one thing to do first before any build starts:** Get the credit confirmation notification into artist admin.html. Even before freelancer.html exists, artists should be able to confirm credits for freelancers. This builds the credit graph that makes the page valuable at launch.

---

## SCORE TRAJECTORY

| Stage | Score | What unlocks it |
|---|---|---|
| Concept (today) | 6.7/10 | Spec and architecture sound; nothing built |
| P0 complete | ~7.4/10 | Credit system, booking form, availability auto-expiry |
| P1 complete | ~8.2/10 | Portfolio facades, credit-linked audio, admin inbox, empty state UX |
| P2 complete | ~8.6/10 | Directory, realtime, testimonials, source attribution |
| With real data (6+ confirmed credits per freelancer) | ~9.2/10 | The system is working as designed |

**The 9.2/10 ceiling** is not a build ceiling — it is a data ceiling. The page cannot score higher than this without real confirmed credits from real artists. No amount of spec refinement changes this. The page reaches its ceiling when the flywheel is running.

---

## WHAT MAKES THIS PAGE UNLIKE ANYTHING ELSE

Not the design. Not the animations. Not the booking form fields.

The fact that every producer, mixer, and engineer who works with an artist on ABLE gets a passive discovery channel — for free, without any marketing effort — simply because they made something good and an artist credited them for it.

That is the whole product. Every other feature serves it.
