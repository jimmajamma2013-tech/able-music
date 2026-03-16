# ABLE — Whole-System UX Authority Review
**Date: 2026-03-16**
**GPT-assessed: strong but not 10/10 | My score: 7.8/10 | Target: 10/10**
**Scope: All active surfaces, all three user journeys, cross-page continuity**

---

## 1. Current UX score

**7.8/10.** This is higher than the docs/systems/ux/FINAL-REVIEW.md baseline (6.9/10) because the activation fixes implemented in this session (fan confirmation email wiring, Near me location capture, first-fan moment) have already closed several of the most critical UX gaps.

Breakdown:
- Artist profile (fan experience): **8.5/10** — clear, confident, conversion-ready
- Dashboard (artist experience): **7.8/10** — useful, occasionally overloading
- Onboarding: **8.3/10** — strong but the ending is underpowered
- Landing: **7.9/10** — clear path to action, one weak conversion handoff
- Editing UX: **6.8/10** — the biggest gap in the whole product
- Fan-side UX: **7.5/10** — improved significantly with arrival flow and Near me fix
- Cross-page continuity: **7.4/10** — the email arrival chain is now wired, but the artist's edit→profile round trip is still the seam that shows most

---

## 2. Long UX review

ABLE's UX is strong where it is most visible: the artist profile, the onboarding wizard, and the landing page all present a clear, well-considered user journey. A fan arriving at an artist's profile knows exactly what to do: see the content, tap a CTA, sign up. The fan capture form is well-designed, GDPR-compliant, and doesn't ask for anything it doesn't need. The CTA architecture (hero, quick actions, section actions) gives the fan a clear hierarchy of what matters most without overwhelming them.

The onboarding wizard is similarly well-considered. The Spotify import at step 0 is a smart shortcut that reduces setup friction substantially. The live preview phone (showing the profile being built in real time) is the right idea — it gives the artist confidence that what they're building is real. The steps are logical and progressive. Where it underdelivers: the final state. The artist completes the wizard, sees a "Done" state, and lands on their admin — but there's no felt transition from "I built something" to "here it is." The magic of the first time is not properly captured.

The dashboard is increasingly useful. Campaign HQ is a well-designed control system once you understand what the modes mean. The fan list has a good UX — names, sources, timestamps, star system. The stats row gives a real-time picture of activity. But there are two persistent UX problems: the first is that the Campaign HQ mode system ("Pre-release", "Live", "Gig") is jargon-dense for an artist who has never used a campaign tool before. The second is that the editing UX is architecturally broken.

The editing UX problem: to edit any meaningful aspect of their profile, the artist must leave able-v7.html entirely, navigate to admin.html (different font, different colour palette, different mental model), find the right section, make a change, save, then navigate back to able-v7.html to see the result. This is not a small friction — it creates a persistent "I'm in two separate products" feeling. The admin has a "Fan view" pill that helps, but the round trip is still jarring. At the 7.8/10 UX level, this is the single gap between the current product and an 8.5+ experience.

The fan-side UX has been improved substantially by the implementation work in this session:
- The arrival chain is now wired: fan confirms sign-up → email links to `fan.html?artist=slug&ref=email-confirm` → fan.html shows first-visit state with context
- Near me now captures location rather than hardcoding London
- The first-visit state correctly introduces the artist the fan just followed

What remains: the Discover tab defaults to Connected (the right choice), but connected artists are demo data. The fan's quality of experience before any real data exists is dependent on good demo data quality — which is mostly there but still reads as demo.

---

## 3. Where I agree/disagree with GPT's UX assessment

**"Biggest UX gains are now cross-page and journey-level"** — agree strongly. Individual screens are largely good. The gaps are at the handoffs. The email → fan.html handoff has now been fixed. The wizard → first live page moment is the next key handoff to improve.

**"Activation is still the most important UX sequence"** — agree. The chain: start → wizard → live page → bio link → first fan → first fan in admin → "this works." Three moments in this chain have now been strengthened in this session. The remaining weak link is the wizard → first live page transition.

**"Product should feel like guidance, not labour"** — agree strongly. The first-run checklist is the most visible embodiment of this. It currently feels like a task list (which is what it is). The aspiration is that it feels like the product knowing what matters next and gently surfacing it — not a checklist, but a "here's what would be worth doing."

**"Editing confidence is still a major gap"** — agree. The admin editing forms are functional but feel detached from the profile they're editing. The form for editing the bio is in admin; the bio is displayed in able-v7.html. The artist has to hold two mental models simultaneously.

**"Fan-side UX should feel meaningful, not noisy"** — agree. The fan.html is notably better than social feed equivalents — no algorithmic injection, no engagement metrics, just the artists you follow. The "Following" tab defaults to real signal. The Discover tab is curated by connection to artists you already follow. This is the right model. The risk is demo data that reads as content — it should never be mistaken for a real activity feed.

**"Narrative intelligence is one of the strongest UX levers"** — agree strongly. Admin already has some of this: the greeting, the "Your list. Your relationship." sub-copy, the fan count contextual text. But the product can go deeper. Post-gig greeting ("Last night at Fabric. 7 fans joined.") is specced but not wired. That moment would be the best example of narrative intelligence in the product.

**"UX should preserve richness while reducing friction"** — agree. ABLE's richness (4 campaign modes, vibe system, per-artist theming) is not the problem. The problem is friction at specific handoffs. The answer is not simplification — it is better transitions, better context-passing, and better first-time explanations of what the richness does.

**"Product should always make the user feel more certain"** — agree completely. This is the exact right standard. After every action: "what happened, what changed, what is live, what comes next." The weakest area is save feedback in admin — some edits save silently, some have toast notifications, some have no confirmation at all. Standardising save feedback would raise confidence significantly.

---

## 4. Why the UX is not 10 yet

1. **The editing round trip.** Artist edits in admin, sees result in profile (different page, different visual context). This is the most persistent UX friction in the product. It makes ABLE feel like two tools rather than one.

2. **Campaign mode comprehension barrier.** "Pre-release," "Live," "Gig" mean nothing to an artist who has never used a campaign mode before. A one-sentence tooltip per mode (not the mode name, but what it does) would remove this barrier almost entirely.

3. **Wizard→first live page moment is underpowered.** The artist finishes the wizard and lands on their admin — but there's no "here is your page" moment. The transition from "I built it" to "it's real" should be more emotionally present.

4. **Save feedback inconsistency.** Some admin saves produce a toast ("Saved"), some are silent, some have no feedback. An artist who isn't sure if their change went live will either not trust the product or try to confirm by loading the profile page in another tab.

5. **Post-gig reveal not wired.** "Last night at [venue]. [N] fans joined." is specced in DESIGN-SPEC.md §5.2 but not implemented. This is the best single example of ABLE's narrative intelligence — and it's missing.

6. **Fan.html Discover demo dependency.** The Connected and New to ABLE sections contain demo data. An artist with 0 connections sees demo connections. This is fine for launch but creates a moment where the product stops being real.

7. **No clear "what is next" signal on the dashboard home.** After the first-run checklist dismisses, the home page shows stats + fan list. Good. But there's no ambient "this is what would make things better right now" signal — the nudge system is conditional and not always present.

---

## 5. The 12 highest-leverage UX improvements

### 1. Campaign mode one-sentence explanations
- **What**: Tooltip or inline sub-copy under each mode in Campaign HQ: "Profile: your default page — no active release or show." "Pre-release: you're building anticipation for something coming." "Live: it dropped — fans can stream it now." "Gig: you're playing tonight — tickets front and centre."
- **Journey**: Artist dashboard — first-time use
- **Type**: Clarity, comprehension
- **Difficulty**: Very low
- **Lift**: High — removes the main comprehension barrier in the most important section of admin

### 2. Wizard done state → first profile view
- **What**: The wizard "Done" state should show the artist's actual profile URL prominently, with a primary CTA "See your page →" that opens able-v7.html in context. Not just "You're done" — "Here it is."
- **Journey**: Onboarding → first live page moment
- **Type**: Activation, emotional payoff
- **Difficulty**: Low
- **Lift**: High — this is the artist's first moment of "I made something real"

### 3. Save feedback standardisation in admin
- **What**: Every admin save action (profile fields, releases, shows, snap cards, CTAs, section order) produces a consistent acknowledgement: either a brief inline "Saved" text appearing next to the save button (300ms, then fades) or a bottom toast. Currently: inconsistent. Some silent, some toast.
- **Journey**: Artist dashboard — editing
- **Type**: Confidence, certainty
- **Difficulty**: Medium (systematic audit + consistent pattern)
- **Lift**: High — removes "is my change live?" uncertainty entirely

### 4. Post-gig greeting wire-up
- **What**: When gig mode expires, the next admin.html load detects the expiry and shows: "Last night at [venue]. [N] fans joined." as the home greeting sub-copy, replacing the default "Your page, your list, your relationship." Persists for 24 hours after gig expires.
- **Journey**: Artist dashboard — post-event
- **Type**: Narrative intelligence, emotional payoff
- **Difficulty**: Low (logic exists, spec exists in §5.2, needs wire-up)
- **Lift**: High — the best single example of ABLE's narrative intelligence; makes the product feel alive

### 5. "Preview your page →" persistent link in admin
- **What**: A low-key "Preview your page →" link in the admin top bar (right side, secondary colour) that opens able-v7.html in a new tab. Makes the edit→preview round trip one tap rather than navigating away from admin.
- **Journey**: Editing
- **Type**: Friction reduction, confidence
- **Difficulty**: Very low (one link element)
- **Lift**: Medium-high — directly reduces the editing model's biggest friction point without requiring architecture change

### 6. Profile completeness signal
- **What**: In admin home, below the greeting, show a single line: "Your page is [N]% complete. [One specific next step]." Derived from: release exists (25%), bio set (20%), artwork/photo set (20%), shows added (15%), platforms linked (20%). If all done: nothing shown.
- **Journey**: Artist dashboard — ongoing use
- **Type**: Guidance, activation
- **Difficulty**: Low
- **Lift**: Medium — gives artists who completed 40% a specific next action without nagging

### 7. First-run checklist simplification
- **What**: Combine "Copy your page link" + "Put the link in your Instagram bio" into one step: "Share your link." The current 2-step split creates two small friction points where one moment would serve better. The artist doesn't need to complete them sequentially.
- **Journey**: Onboarding → first use
- **Type**: Friction reduction, clarity
- **Difficulty**: Very low
- **Lift**: Medium

### 8. Fan.html empty discovered artists copy
- **What**: In Discover, when Connected shows no real data (fan follows 0 artists): "Connect with artists to see who made the music you love." Currently falls through to demo data. The distinction between "demo because you follow no one" and "real because you follow someone" should be explicit.
- **Journey**: Fan → discover
- **Type**: Clarity, trust
- **Difficulty**: Low
- **Lift**: Medium — prevents demo data from masking as real content

### 9. Campaign mode auto-switch explain-on-first
- **What**: First time the page state auto-switches (e.g. pre-release automatically becomes "Live" when release date passes), show a one-time notification: "Your page switched to Live mode. [Release title] dropped today." Auto-dismiss after 5 seconds. Never show again.
- **Journey**: Artist dashboard — returning use
- **Type**: Clarity, certainty, narrative intelligence
- **Difficulty**: Low
- **Lift**: Medium — removes the confusion of "why did my page change?"

### 10. Admin top-level page title
- **What**: On the admin home page, the page section title is currently just the greeting ("Good to see you, [Name]."). Adding a subtle "ablemusic.co/[handle]" as the ambient page identity (already exists in the top right — just needs visual prominence) ensures the artist always knows they're editing their specific live page URL.
- **Journey**: Artist dashboard — daily use
- **Type**: Confidence, certainty
- **Difficulty**: Very low
- **Lift**: Low-medium

### 11. Onboarding step 0 success animation
- **What**: When Spotify import succeeds and fills in name/release data, the auto-populated fields should flash briefly with the artist's accent colour (or ABLE's platform accent before accent is set). Currently the auto-fill just appears. A brief visual acknowledgement of "ABLE just did something useful" creates a first moment of trust.
- **Journey**: Onboarding
- **Type**: Emotional payoff, trust
- **Difficulty**: Low
- **Lift**: Medium

### 12. Fan.html arrival state copy refinement
- **What**: The first-visit copy on fan.html ("You followed [Artist name]. They're here when they have something to share.") is currently set. Refine the cold start fallback for the "no new items" scenario copy — currently reads well but could be slightly more specific about what "something to share" means in practice.
- **Journey**: Fan → first visit
- **Type**: Clarity, warmth, trust
- **Difficulty**: Very low
- **Lift**: Low-medium

---

## 6. Single most important UX improvement

**Post-gig greeting wire-up.**

Why: This is the single moment in the product that most demonstrates narrative intelligence — the product knowing what happened and acknowledging it. "Last night at Fabric. 7 fans joined." is a sentence that would make an artist feel that ABLE is paying attention. Currently, the morning after a gig looks identical to any other morning in admin. Wiring this spec (which already exists) is the highest-leverage remaining UX moment in the product.

---

## 7. Single most important activation improvement

**Wizard done state → first live page view.**

Why: The activation chain is: start → wizard → live page → bio link → first fan → first fan seen. The weakest handoff in this chain is wizard → live page. The artist finishes the wizard and sees their admin, not their page. The "here it is" moment — the first time they see the profile that will represent them to fans — is delayed and implicit. Making the wizard "Done" state explicitly navigate to the artist's profile (with an "edit" overlay confirming they're the owner) would make this the most emotionally impactful moment in the onboarding flow.

---

## 8. Single most important confidence improvement

**Save feedback standardisation.**

Why: An artist who isn't certain their change went live has zero trust in the product. Currently, some admin changes produce visible feedback (toast, input animation) and some don't. This inconsistency is more damaging than the worst individual case — because it makes the reliability of the product unclear. "Did that save?" is a question artists should never have to ask. A systematic audit of all save paths and a consistent 300ms feedback pattern on every one of them would eliminate this uncertainty entirely.

---

## 9. What specifically brings the UX to 10

1. Campaign mode explanations (removes comprehension barrier — 30 min)
2. Wizard done state → first profile view (activation handoff — 45 min)
3. Save feedback standardisation (confidence — 1hr audit)
4. Post-gig greeting wire-up (narrative intelligence — 30 min)
5. "Preview your page →" in admin (edit friction — 15 min)
6. Profile completeness signal (guidance — 30 min)
7. Fan.html demo/real distinction in Discover (trust — 30 min)
8. Campaign auto-switch explanation (certainty — 45 min)

Items 1-4 together close most of the gap from 7.8 to 9+. Items 5-8 close the remaining distance.

The structural cap (not reaching 10 without architectural change): the editing model. An artist editing their profile in admin.html and seeing results in able-v7.html will always create some discontinuity until the edit experience either lives on the profile page itself or the two surfaces are visually unified enough that the round trip feels deliberate rather than disruptive.

---

## 10. Exact changes to make

### Onboarding UX
- Wizard done state: make "See your page →" the primary CTA, opening able-v7.html
- Step completion: spring animation on step row (already in ring/bar — add to step icon)
- Spotify import success: brief field flash on auto-populate

### Artist profile UX
- Campaign state behaviour: already clear; no changes needed
- Fan capture UX: already well-designed; no changes needed
- Owner mode: add "Preview as fan →" in edit bar (overrides "Fan view" pill — clearer language)

### Editing UX
- "Preview your page →" persistent link in admin top bar
- Save feedback: systematic audit, consistent 300ms feedback on every save action
- Artist accent in admin focus rings: makes editing environment feel like it belongs to the artist

### Dashboard UX
- Campaign mode one-sentence explanations (tooltip or inline sub-copy per mode)
- Post-gig greeting wire-up (detect gig expiry, show "Last night" greeting on next load)
- Profile completeness signal (below greeting, specific next step)
- First-run checklist: combine link/bio steps into one

### Landing UX
- "Get your free page →" is already the right CTA — keep it
- Below the hero: consider shortening the proof strip paragraph copy slightly — the numbers speak; the text below them slightly over-explains

### Fan UX
- First-visit state: already implemented (this session)
- Near me location capture: already implemented (this session)
- Discover: clarify demo vs real data state with appropriate copy
- Fan.html sub-greeting: already implemented

### Cross-page continuity
- Fan confirmation email → fan.html?artist=slug&ref=email-confirm: already implemented (this session)
- Artist profile → admin: "Admin →" pill already exists; improve its visibility
- Admin → profile: "Preview your page →" persistent link

### Activation flow
- Wizard → profile: as above
- First-fan moment: already implemented (this session)
- Post-gig reveal: wire-up

### User confidence
- Save feedback standardisation
- Campaign auto-switch notification

### Friction reduction
- Campaign mode explanations
- "Preview your page →" link

### Emotional payoff
- Post-gig greeting
- Wizard done → first profile view
- Spotify import success flash

### Mobile feel
- Fan.html tab labels: 12px → 13px (already noted in UI review)
- Admin stat cards: prevent 3-column squeeze below 380px width

---

## 11. What to remove, simplify, or refuse

**Remove:**
- Any progress bar gamification or completion percentage shown on profile to fans
- Fan-to-fan features of any kind
- Any feed that could become addictive scroll sludge

**Quiet down:**
- The "it's working" card in admin after first week — it should self-dismiss gracefully, not require manual dismissal every session
- The first-run checklist after all items are complete — it should exit the visual space completely

**Simplify:**
- First-run checklist: 3 steps, not 4

**Delay:**
- Campaign auto-switch notification (good idea, not launch-critical)
- Fan.html demo/real data distinction (works fine for launch with demo data)
- In-page editing model (architectural; Phase 2)

**Never:**
- Streak tracking or "days active" gamification
- AI-generated "you should post now" suggestions
- Engagement score or "profile strength" percentage visible to fans
- Any mechanism that makes the artist anxious about their metrics

---

## 12. Revised 10/10 UX doctrine

ABLE at 10/10 UX feels like the product was built by someone who has managed a music career and understands what a working day actually looks like.

Not a "user journey." An experience.

The artist opens admin after a gig and sees "Last night at Fabric. 7 fans joined." and knows the product was paying attention. They tap to see who, and three of them are from Edinburgh — fans they didn't know were there.

The fan who got the confirmation email arrives at fan.html already following the artist. The first thing they see is why — "You followed [Artist]." — and then two artists connected to that same sound, with a reason that makes sense.

The onboarding ends not with a checklist but with a page that exists. The artist's first impression of ABLE is their own music, their own name, their own page — not a form.

At 10/10 UX: the product meets the user where they are, tells them what matters, and then gets out of the way.

---

## 13. Build order for UX improvements

1. Campaign mode one-sentence explanations (30 min, removes primary comprehension barrier)
2. Post-gig greeting wire-up (30 min, best narrative intelligence moment — already specced)
3. "Preview your page →" persistent link in admin (15 min, most impactful editing friction reduction)
4. Wizard done state → first live profile CTA (45 min, activation chain final link)
5. Save feedback audit + standardisation (1hr, confidence)
6. Profile completeness signal (30 min, guidance)
7. First-run checklist step consolidation (15 min)
8. Fan.html Discover demo/real clarity (30 min)

---

## 14. File updates required

| File | What to add | Why |
|---|---|---|
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Add "Wizard done state → first live page view" as a specified journey step. Add "Campaign mode auto-switch" as a journey event that needs explanation handling. | These journeys are now identified as critical UX handoffs that need explicit spec |
| `docs/pages/admin/DESIGN-SPEC.md` | Add §: Post-gig greeting wire-up spec — detect `able_gig_expires` < now, compare fan count at gig-start vs now, show "Last night at [venue]. [N] fans joined." | Spec exists in §5.2 — needs to be in the DESIGN-SPEC as an implementation task |
| `docs/IMPLEMENTATION-AUTHORITY.md` | Add UX build chunk: campaign mode explanations, post-gig greeting, preview-your-page link, save feedback audit | Keeps implementation authority current with what's next |
| `docs/pages/onboarding/DESIGN-SPEC.md` | Add note: Wizard done state should show "See your page →" as primary CTA, opening able-v7.html. This is the activation handoff moment and must not land flat. | Currently underdescribed in the spec |
| `docs/STATUS.md` | Update UX system score from 6.9 baseline to 7.8/10 current | Status file was written before these improvements were made |
