# Freelancer Profile — 20-Angle Analysis (Concept Stage)
**File: `freelancer.html` | Scored: 2026-03-16**
**Methodology: honest scoring of the concept as specced. The page does not exist yet. Scores reflect what would be delivered if built to the current SPEC.md. Many angles score 6–7 because the mechanism is sound but untested.**

---

## SCORING SUMMARY

| # | Angle | Score | Direction |
|---|---|---|---|
| 1 | First 3 Seconds | 6/10 | Strong if credits exist; weak if none |
| 2 | Primary Job | 7/10 | Booking CTA is clear; trust path needs credits |
| 3 | Hero Zone | 6/10 | Identity is clean; credits not above fold |
| 4 | Credits System | 7/10 | Architecture is correct; UX depends on density |
| 5 | Copy Voice | 7/10 | Principles are right; execution untested |
| 6 | Portfolio | 6/10 | Embed-reliant; no hosting = friction |
| 7 | Rate Card | 7/10 | Transparent format; freelancer control is good |
| 8 | Availability System | 8/10 | Auto-expiry is the strongest mechanical idea here |
| 9 | Booking Form | 8/10 | Four fields, no marketplace signals — correct |
| 10 | Mobile Experience | 7/10 | Shares Surface 1 tokens; needs specific tap-target audit |
| 11 | Performance | 7/10 | Single-file architecture; embed performance unknown |
| 12 | Identity System | 6/10 | Vibe system works; freelancer accent feels inherited not owned |
| 13 | Discovery Entry Point | 8/10 | Credit link from artist profile is the best possible warm entry |
| 14 | Trust Signals | 7/10 | Confirmed credits are the right trust architecture |
| 15 | Micro-interactions | 6/10 | Shared system; freelancer-specific moments not yet specced |
| 16 | Edit Mode | 5/10 | Not specced for freelancer context; inherited from artist edit |
| 17 | Accessibility | 6/10 | Inherited tokens are solid; bottom sheet needs audit |
| 18 | Cross-page Coherence | 7/10 | Credit link is bidirectional; booking enquiry in admin not built |
| 19 | Empty State | 5/10 | New freelancer with no credits is a hard cold-start problem |
| 20 | Big Picture | 7/10 | The concept is distinctive; execution determines whether it feels like ABLE or a template |

**Concept average: 6.7/10**
**Target after P0+P1: 8.5/10 | Target after P2: 9.2/10**

---

## ANGLE 1 — First 3 Seconds (6/10)

**What a visitor sees in the first 3 seconds:**
They arrived via a credit link on an artist's release card. They already heard the track. They tapped a name and arrived at this profile. In those 3 seconds they see: the freelancer's name (display font, accent colour), their role and location, the hero CTAs, and — critically — whether any credits are visible above the fold.

**What works at concept:**
- The name is large, display-font, immediate
- Role tag ("Producer · Manchester") answers the primary identity question instantly
- Availability chip answers the second most pressing question before the visitor has to look for it
- There is no ABLE branding noise in the hero — the freelancer's world from pixel 1

**What is risky:**
- Credits are Section 2, not Section 1. Depending on section heights, the visitor may need to scroll before seeing what makes this person credible. On a cold visit with no visual context, name + role alone is not enough.
- If no avatar is set, the monogram initial is functional but anonymous
- No audio plays on load (correct — autoplay would be wrong) but there is no visual signal that audio exists without scrolling

**Gap:** The first 3 seconds are entirely dependent on credits density. A freelancer with 8 confirmed credits has a compelling page from the moment it loads. A freelancer with 0 confirmed credits has an identity header and nothing else.

**Path to 8:** Ensure at least one credit is visible above the fold on a 375px screen without scrolling. Compress the hero header to give credits first-screen presence.

---

## ANGLE 2 — Primary Job (7/10)

**The primary job of this page:** Convert a visitor — who already has some level of curiosity or intent — into a booking enquiry.

**What works:**
- "Get in touch" is the right CTA copy — direct, low-friction, not "Book now" or "Hire me"
- The form has 4 fields and no marketplace signals. No budget selector. No service dropdown.
- The booking enquiry reaches the freelancer's email without exposing it to the public

**What is risky:**
- The trust path to "Get in touch" requires credits. If a visitor arrives and sees no confirmed credits, the CTA is asking them to trust someone with no evidence. This is a cold-start problem for new freelancers, not a design flaw — but it means the page's primary job can only fully function once the credit system has density.
- "Get in touch" as a CTA label is slightly generic. "Work with Maya" is more specific and carries the freelancer's name.

**Gap:** The CTA works once trust is established. Without trust signals (credits, portfolio), it asks too much too early.

**Path to 8:** Pin the booking CTA but make its visibility conditional on context — if no credits exist, the CTA tone shifts: "I'm just getting set up — check back soon or reach out directly." Honest, not hollow.

---

## ANGLE 3 — Hero Zone (6/10)

**What's in the hero zone (above fold, 375px screen):**
Avatar, name, role + location, availability chip, two CTAs.

**What works:**
- The hierarchy is clear: who you are → what you do → whether you're free → how to reach you
- Two CTAs max — consistent with the artist profile's hero discipline
- Availability chip is below the CTAs, not competing with them

**What is risky:**
- No credits are visible above the fold. The hero carries identity but not evidence. An artist visiting a producer's page wants to see credits before they decide whether to scroll.
- The hero has no visual representation of the work. On the artist profile, artwork fills the hero. On the freelancer profile, the hero is typographic. This is intentional (freelancers don't have a campaign artwork) but it makes the above-fold experience text-heavy.
- The secondary CTA "Hear the work" scrolls down — but if the visitor doesn't scroll, they leave without knowing there's audio.

**Path to 8:** Introduce a compact credit strip directly below the CTAs — 3 small artwork tiles with artist names, clipped to one row. The hero zone then carries: identity + evidence + CTAs. Above the fold, a visitor sees that this person has real, named credits before they make any decision.

---

## ANGLE 4 — Credits System (7/10)

**Architecture assessment:**
The credit system design is conceptually correct and well-considered. Confirmed credits have ✓ badges, are bidirectionally linked, and are sourced from peer confirmation. Unverified credits are shown honestly with visual distinction. The confirmation flow is one tap for the artist.

**What works:**
- One-tap confirmation is the right decision. Industry evidence is clear: multi-step confirmation will not be completed. One tap removes all friction.
- The "ask me later" snooze (7 days, one re-prompt) is respectful of the artist's attention
- Self-claimed credits are visible but visually distinct — honest, not punitive
- Credits sort confirmed-first — the strongest signals are immediately visible

**What is risky:**
- The system depends on artists responding to confirmation requests. An artist who has moved on from a project and is not active on their ABLE admin will never confirm. The freelancer may have a legitimate credit that remains unverified indefinitely.
- Credit disputes ("Not quite") require a freeform correction flow that has not been fully specced
- New freelancers cannot add credits for artists who don't have ABLE profiles — the credit is unverifiable by design, but this creates a dead zone for freelancers who work primarily with artists outside the ABLE ecosystem

**Gap:** The system is sound for the steady-state case. The cold-start and non-ABLE-artist cases need more thought.

---

## ANGLE 5 — Copy Voice (7/10)

**Principles established (from SPEC.md and copy philosophy):**
- Professional but human (not "Industry professional with 10+ years experience")
- Credits speak louder than self-description
- Rate card: "From £500/day" not "Competitive rates"
- Availability: "Taking on work now" not "Available for hire"
- Booking CTA: "Get in touch" not "Book now"
- Empty credits: "Credits appear here once artists confirm them" not "No credits yet"

**What works at the principle level:**
- All of these are correct decisions. The register is right.
- The section header "Working together" (instead of "Pricing" or "Services") is exactly the right register — it frames the rate card as a conversation start, not a price menu
- "Artists on ABLE" (not "Clients") — correct
- "Get in touch with Maya" (booking form header uses the person's name) — warm and specific

**What is risky:**
- Copy has not been written for every state and edge case yet (see COPY.md)
- The one-line bio field is critical and entirely up to the freelancer. If they write "I make beats. DM me." the copy voice is lost. The wizard should model good bio copy with placeholder examples.
- Admin-side copy (booking enquiry inbox, credit confirmation notifications) is not specced and will need the same care

---

## ANGLE 6 — Portfolio (6/10)

**What's specced:**
- SoundCloud or direct URL embeds for audio (max 6)
- YouTube embeds for video (max 3)
- Instagram or direct image grid for photos (max 9)
- One-line context label per item written by the freelancer
- No ABLE hosting in v1 — all content is external-linked

**What works:**
- SoundCloud embeds are the right choice for audio (Spotify doesn't give audio control; SoundCloud does)
- YouTube is the standard for video — widely available and mobile-optimised
- The one-line context label is the right amount of friction: enough to make the item mean something, not so much that the freelancer avoids filling it in

**What is risky:**
- External hosting means embed failures. SoundCloud links die. YouTube videos get taken down. The freelancer's portfolio may be partially broken at any given time without them knowing.
- "Max 6 audio" is the right ceiling but the right default is different — a freelancer with 6 mediocre samples is worse positioned than one with 2 exceptional ones. The spec should guide freelancers toward curation, not completeness.
- No audio preview from within the credits section. A visitor has to scroll to portfolio to hear the work. The opportunity to pair audio directly with its corresponding credit card is missed.

**Path to 8:** Allow one audio sample to be associated directly with a credit card — a waveform strip on the credit row. Tap to play. This collapses the journey from "heard the credit" to "heard the actual sound" to one tap.

---

## ANGLE 7 — Rate Card (7/10)

**What's specced:**
- Three price formats: fixed / range / "Let's talk"
- Freelancer controls whether to show rates at all
- Section header: "Working together"
- Availability, response time, and service lines in the same section

**What works:**
- Freelancer control over rate display is the right call. Established professionals who filter on project fit benefit from "Let's talk" for everything. Emerging freelancers who need to lower contact friction benefit from transparent starting prices. Both needs are met.
- "From £300/track" is honest specificity. "Competitive rates" is noise.
- Response time field is optional but practically powerful — "Usually within 2 days" reduces the anxiety of reaching out cold

**What is risky:**
- No guidance in the wizard for how to fill in rates. The freelancer has to know what to write. First-time users will either leave it blank or write something generic.
- Currency: the spec shows £ (GBP) but the platform will be international. Currency display needs localisation consideration.

---

## ANGLE 8 — Availability System (8/10)

**This is the strongest conceptual mechanic on the page.**

Three states: "Taking on work now" (green) / "Selective right now" (amber) / "Not booking at the moment" (dim).

Auto-expiry: "Taking on work now" auto-transitions to "Selective" after 30 days unless re-confirmed.

**Why this is strong:**
- Stale availability is a genuine problem across every freelance platform. Profiles claiming "Available" from 6 months ago are useless noise. Auto-expiry solves this structurally.
- Three states are the right number. Binary (available / not) is too coarse. More than three requires cognitive overhead for no additional clarity.
- The amber "Selective" state is honest and aspirational simultaneously — it signals that the freelancer is active but not desperate. Established professionals will often leave themselves on Selective permanently.
- The chip is a status signal, not a CTA — it informs without competing with the booking CTA

**What needs to be specced:**
- How does the auto-expiry notify the freelancer? ("Your availability is showing as Selective now. Update it if you're ready for new work." — one notification in admin, no email unless requested.)
- What happens during the transition? Is there a grace period or is it immediate on day 31?

**Path to 9:** Admin notification for the auto-expiry should land as a warm, specific nudge. Not a system alert — a prompt from the page itself: "It's been 30 days since you updated your availability. Still taking on work?"

---

## ANGLE 9 — Booking Form (8/10)

**What's specced:** 4 fields: name, email, what you're working on, what you need. Optional 5th field (ABLE page handle).

**Why this is strong:**
- No budget field: removing the budget field is the single most important booking form design decision. "Select your budget" dropdowns create transactional energy and price-consciousness before any conversation has happened. The freelancer decides their rate; the artist shouldn't be pre-screening themselves out.
- No service dropdown: music work is too varied. A "select a service" menu imposes categories on a conversation that should start open.
- The project description field (free text, ~100 chars) and the ask field (~200 chars) together give the freelancer enough to qualify the lead before replying.
- ABLE page handle field: if the enquirer is an artist on ABLE, the freelancer can see their profile — their sound, their vibe, their credits — before deciding whether to reply. This is the most distinctive feature of the ABLE booking form vs any other platform.

**What is risky:**
- 4 fields is near the edge of "minimal but sufficient." Any more fields and completion rate will drop measurably.
- Rate limiting (3/day/email) is necessary but needs a user-facing message if hit. "Maya receives a lot of enquiries — try again tomorrow" is honest.

---

## ANGLE 10 — Mobile Experience (7/10)

**Inherited from Surface 1 tokens:**
375px base. 44px tap targets. No horizontal scroll. DM Sans / Barlow Condensed. Spring easing.

**What works by inheritance:**
- The design tokens are mobile-first and tested on the artist profile
- Bottom sheet for the booking form is the right pattern for mobile — full viewport, dismissible
- Credits list with collapsed state (4 visible, expand to all) is the right mobile list pattern

**What needs freelancer-specific work:**
- The portfolio section with embedded audio and video players on mobile is the highest-risk zone. SoundCloud embeds are notoriously poorly optimised on mobile — they render with large iframes that can cause scroll blocking.
- The credits section with artwork tiles + text columns needs a specific layout pass at 375px — the four-column layout (artwork / release / artist / year) may collapse poorly on small screens.
- No tap-target audit has been done on the "Confirm / Not quite / Ask me later" confirmation prompt in admin — this is a 3-way action on a small screen.

---

## ANGLE 11 — Performance (7/10)

**Inherited performance profile:**
Single HTML file (no bundler, no build pipeline). Same pattern as all other ABLE pages. Two font families from Google Fonts (same as Surface 1). Embed iframes are lazy-loaded.

**Freelancer-specific risks:**
- Multiple SoundCloud embeds may degrade performance on first load — each iframe fetches its own bundle
- YouTube embeds add similar weight
- The initial concept has no lazy-loading spec for embedded media beyond the shared pattern

**Path to 8:** Use facade pattern for embeds — show a thumbnail/waveform image with a play button; only load the actual iframe on tap. This is standard practice and eliminates most of the embed performance cost.

---

## ANGLE 12 — Identity System (6/10)

**Shared mechanism:**
Freelancer picks a vibe (same 7 options as artist profile — Electronic / Hip Hop / R&B / Indie / Pop / Rock / Folk). This sets their accent colour default. They can override. The vibe aesthetic then governs the page's typographic and motion register.

**What works:**
- The vibe system is correct — a hip-hop producer's page should feel different from a folk session musician's page. The single-accent-variable mechanism achieves this at zero additional complexity.
- The monogram initial avatar fallback is better than a blank circle — it gives the page some colour even without a photo.

**What is risky:**
- The freelancer is not an artist. The "vibe" concept maps well onto creative identity but may feel less instinctive for, say, a mastering engineer than for a producer. The wizard needs to translate "vibe" into something like "what kind of records do you work on most?" for the role types where aesthetic identity is less front-of-mind.
- There is no photo at the top of an artist profile (the artwork fills the hero). For the freelancer profile, the avatar is the only human signal. A profile with no avatar and no photo feels anonymous. The monogram helps but doesn't substitute for a face.

---

## ANGLE 13 — Discovery Entry Point (8/10)

**The credit link from an artist's release card is the strongest possible warm entry point.**

A visitor who taps "Produced by Maya Beats" on Nadia's ABLE profile has already:
- Found an artist whose music they care about
- Heard or seen the release that Maya worked on
- Made an active choice to find out more about the person who made it

This is higher intent than any cold browse. The ear has been converted before the profile loads.

**What works:**
- The credit link fires from within the artist's existing release card — no additional page, no redirect, no context loss
- The destination (freelancer profile) shows that credit immediately and prominently
- The bidirectional graph (artist credits → freelancer profile; freelancer credits → artist profile) creates a closed loop that benefits both sides

**What is risky:**
- The entry point depends entirely on the artist having confirmed the credit. An unconfirmed credit shows as plain text with no link. This creates urgency for the freelancer to chase confirmations — but also means the highest-value entry point is not available until the credit system has real density.
- Fan discovery (curious fan taps a credit out of interest) is high-signal but low-conversion. The page should acknowledge this visitor type — no booking pressure, just portfolio + identity.

---

## ANGLE 14 — Trust Signals (7/10)

**The right trust architecture:**
Confirmed credits on real ABLE profiles are the primary trust signal. Industry evidence is clear: named credits on real, known releases convert better than any badge, review, or rating system. The peer-confirmation mechanism delivers this.

**Supplementary trust signals specced:**
- ✓ badge on confirmed credits (clear, non-flashy)
- Availability chip (honest, current, auto-expiring)
- "Artists on ABLE" section (recognisable artist names = calibration of the freelancer's level)
- Response time field ("Usually within 2 days" — reduces the anxiety of reaching out)

**What is missing at concept stage:**
- Testimonials: the spec doesn't include a testimonial mechanism. Short, specific quotes from artists they've worked with would be highly effective — but they are also the easiest thing to fabricate. If testimonials are added, they should require the artist to write them from within their own admin (same peer-confirmation approach).
- "Last active" signal: a profile that shows the freelancer was last active recently reduces the "is this person still working?" concern. Not intrusive — just a small "Active this month" indicator if applicable.

---

## ANGLE 15 — Micro-interactions (6/10)

**Inherited from the shared micro-interactions spec:**
Spring easing (cubic-bezier(0.34,1.56,0.64,1)) for bounce moments. Deceleration easing for scroll and settle. Bottom sheet entrance/exit. CTA press state.

**Freelancer-specific moments not yet specced:**
- Credit confirmation: the moment a credit gets verified ✓ should have a brief celebration — not confetti, just a clean transition from unverified to verified state. The freelancer should feel that moment.
- Portfolio audio play: the waveform animation on play. Not a generic spinner — a waveform that responds to the playback state.
- Booking form submit: the send confirmation animation. Something that feels like the message actually went somewhere, not a static "Submitted."
- Availability toggle in admin: the state transition between "Taking on work" / "Selective" / "Not booking" should feel deliberate, not binary.

**Path to 8:** Spec these 4 freelancer-specific moments with the same rigour as the 30+ artist profile interactions.

---

## ANGLE 16 — Edit Mode (5/10)

**Current state:** Not specced for freelancer context. The artist profile's edit mode (floating pill, dashed rings, bottom sheet per section) is the likely inheritance pattern — but the sections are different enough that a direct port will feel wrong.

**What the freelancer edit mode needs:**
- Adding credits: search for a release → self-add → triggers confirmation request to artist. This is a multi-step flow that doesn't fit the artist profile's "tap a section → edit in place" pattern.
- Managing portfolio: adding a SoundCloud or YouTube URL with a label. Closest to the artist's snap card flow.
- Updating availability: a prominent, easy update — one of the most frequent reasons a freelancer opens their admin.
- Managing booking enquiries: separate section in admin.

**Path to 8:** Spec the freelancer admin (freelancer-admin.html or admin.html?mode=freelancer) with its own section hierarchy. The shared admin design system handles 80% — the difference is which sections appear and which flows operate.

---

## ANGLE 17 — Accessibility (6/10)

**Inherited from Surface 1:**
44px tap targets. Colour contrast via token system. Focus rings present.

**Freelancer-specific gaps:**
- Bottom sheet for booking form needs focus trap — when the sheet opens, keyboard focus must be confined to it
- SoundCloud and YouTube embeds are notoriously poor for keyboard navigation and screen reader accessibility — this is an upstream problem but ABLE's wrapper needs to handle it gracefully
- The ✓ badge on credits needs an accessible label: "Confirmed credit" not just a checkmark icon
- Credits table-like layout needs a semantic structure that works for screen readers — ARIA roles on the credit rows

---

## ANGLE 18 — Cross-page Coherence (7/10)

**What the spec has:**
- The credit link from artist profile → freelancer profile is the primary cross-page moment
- Freelancer profile → artist profile (tapping a credit) closes the loop
- Booking enquiry submitted → appears in freelancer admin

**What is not yet built or fully specced:**
- Booking enquiry inbox in admin.html (freelancer variant)
- Credit confirmation flow in artist admin — the "Maya says she produced your track" notification
- Freelancer admin greeting and nudge system (parallel to artist admin)
- Source tracking: "how did this visitor arrive?" — credit link? direct URL? directory?

**Path to 8:** The cross-page coherence score rises primarily from the booking enquiry → admin notification loop. Once that pipeline is specced and built, the freelancer journey feels complete.

---

## ANGLE 19 — Empty State (5/10)

**The hardest problem for the freelancer profile.**

A new freelancer who signs up today has:
- Their name and role
- Their availability set to "Taking on work now"
- No confirmed credits (confirmations are pending at best)
- No portfolio items (they may have skipped the wizard step)
- No "Artists on ABLE" section (< 2 confirmed credits)

This is the most common state a new freelancer profile will be in for the first 1–4 weeks after sign-up.

**What the empty state must communicate:**
- This person is real and is actively building their presence
- Credits are coming (confirmations are pending)
- There is still a way to reach them

**What the empty state must not communicate:**
- "This profile is empty" energy
- "No credits yet" — as if they failed to have credits

**At concept stage, this is the weakest link.** The empty state copy exists in SPEC.md but the visual design of the empty state is not worked out. A new freelancer's first visitor — if they have any via a credit that goes live quickly — may see a sparse profile and leave.

**Path to 8:** Three-part approach:
1. Wizard should not let a freelancer go live without at least one portfolio item. One SoundCloud link takes 30 seconds. Make it the single blocking step.
2. If credits are pending confirmation, show a "Credits pending" state — "1 credit awaiting artist confirmation" with a visual placeholder that gives the sense of a coming credit without false-claiming it.
3. Add a temporary "just setting up" bio option: "Getting my profile set up — check back soon or get in touch directly." Honest, human, not broken.

---

## ANGLE 20 — Big Picture (7/10)

**The concept is genuinely distinctive.** No other platform:
- Discovers freelancers through a credit link on a live artist profile
- Uses peer-confirmation as the trust mechanism (not reviews, not badges)
- Removes marketplace pricing signals from the booking form entirely
- Has auto-expiring availability that prevents ghost profiles

**The gap between concept and reality:**
This is a page that will only work well when the credit system has density. A freelancer profile with 8 confirmed credits, 4 portfolio samples, transparent rates, and an accurate availability chip is a 9/10 page. The same page with 0 confirmed credits and no portfolio is a 5/10 page that does nothing.

The big picture question is: can enough freelancers get their first confirmed credit quickly enough to see the page working? The wizard's credit-search flow (find releases on ABLE → self-add → trigger confirmation) is the critical path. If that flow is smooth and the artist confirmation rate is reasonable (even 30% is enough), the page becomes valuable to early users within a week.

**What would make this a 9+:**
- The first confirmed credit being a moment the freelancer actually notices and feels (not just a data update)
- The booking form ABLE handle field being used — a freelancer who can see an enquiring artist's ABLE profile before deciding whether to reply has a capability that no other platform offers
- The discovery flywheel working: artist releases → credits accumulate → each credit is a passive acquisition channel → freelancer profile grows without any active marketing effort

**The ceiling is 9.2/10** at this concept level — higher requires real data (real credits from real confirmed artists) and real booking conversion data that can only come from users.
