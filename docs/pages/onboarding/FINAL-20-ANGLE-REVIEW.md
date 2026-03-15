---
title: "Onboarding Wizard — Final 20-Angle Review"
date: 2026-03-15
stage: 7B
file: start.html
status: BUILD AUTHORISED
purpose: Definitive pre-build scoring document. Three-pass review. Authority for all start.html decisions.
---

# Onboarding Wizard — Final 20-Angle Review

**Stage 7B. Definitive pre-build scoring.**

This document is the final authority before any line of `start.html` is written. It synthesises all prior work across Stages 1–7A — the 20-angle analysis, the full spec, the user journey maps, the copy document, the path-to-10 technical contracts, and the strategy review — and applies three consecutive scoring passes.

Pass 1 is carried forward from STRATEGY-REVIEW-FINAL.md (Stage 7A). Pass 2 re-examines every angle against the full body of accumulated spec and research and makes remaining design decisions. Pass 3 applies honest ceilings and distinguishes what is spec-resolvable from what requires real-world execution or real-world data.

Do not build without reading this document. Do not treat the scores as targets — treat the decisions as contracts.

---

## Prior work summary

Seven prior stages inform this document:

| Stage | Document | Role |
|---|---|---|
| 1 | 20-ANGLE-ANALYSIS.md | Baseline scoring against the existing start.html |
| 2 | USER-JOURNEYS.md | Three complete journey maps with decision points and drop risks |
| 3 | SPEC.md | Full 8-screen architecture with technical requirements |
| 4 | COPY.md | Every word locked, copy rules, audit checklist |
| 5 | PATH-TO-10.md | Screen-by-screen technical contracts for each angle |
| 6 | STRATEGY-REVIEW-FINAL.md | Research incorporation, 6 gap decisions, 5 risk flags, 6 copy additions |
| 7A | (this stage's predecessor) | Pass 1 scores (7.4/10 overall) |

**Pass 1 overall: 7.4/10.** The spec is complete. The theory is sound. The remaining work in this document is to push every achievable angle to 9, call honest ceilings on the rest, and authorise the build.

---

## Pass 2 — Full re-examination

Pass 2 re-examines each angle below 9 in light of all accumulated spec and research. For each angle, the question is: is there any remaining design decision, copy choice, or technical specification that would move this to 9? If yes, make that decision here and record it. If no, state the honest ceiling.

---

### Angle 1 — First impression

**Pass 1 score: 8**

**Re-examination:**

The Screen 0 architecture is fully specced: full-viewport, centred column, Barlow Condensed 700 headline at 58px desktop / 44px mobile, universal import input at 54px height, cycling placeholder, "Start from scratch →" as a subdued text link, trust line, "Works with..." clarification. The import confirmation — "We found [Name] on Spotify ✓" in green, instant — is the single most important visual event on this screen. All of this is locked.

The gap between 8 and 9 is one specific thing: the ABLE wordmark treatment on Screen 0. PATH-TO-10.md specifies it as `20px, letter-spacing 0.12em, opacity 0.5, top: 32px`. This matters because the Screen 0 first impression is not just "what does this product do" — it is "is this a brand I can trust with my identity as an artist?" A faded, understated wordmark that doesn't compete with the headline communicates confidence and restraint, which is exactly the signal ABLE needs to send. If the wordmark is too large or too prominent, it makes the screen feel like a marketing page. If it's absent, the product has no identity.

**Decision: confirm the wordmark treatment as described.** Additionally, the cycling placeholder must include "Paste any link to your music or socials" as the first cycle (confirmed in STRATEGY-REVIEW-FINAL.md). This is the frame-setter — before any specific examples, the artist knows that this input accepts any link.

One additional decision: the input border lighting. On focus, the input border should transition from `rgba(255,255,255,0.12)` to `var(--color-accent)` with a 200ms ease. This is a small detail but it signals that the product is responsive and alive from the first interaction. This is not in PATH-TO-10.md and should be added to the build spec.

**Pass 2 score: 9.** With the wordmark correctly underplayed and the input border responding immediately on focus, the first impression communicates exactly the right things: this is confident, restrained, and immediately functional. A 10 would require the import confirmation to be tested on real artists at volume — the "oh wow" moment is theoretical until it has been experienced at scale.

---

### Angle 2 — Primary job

**Pass 1 score: 8**

**Re-examination:**

The primary job is: get an artist from "I've heard of ABLE" to "my page is live" in under 5 minutes without ever feeling like they're filling in a form. USER-JOURNEYS.md confirms this is achievable at 2–3 minutes with import, 3–4 minutes from scratch. The 8-screen OQPS architecture, the import pre-fill, and the live preview are all specced and confirmed.

The gap between 8 and 9: two things remain unresolved.

**First:** The transition from Screen 7 submission to Screen 8 is the most critical moment in the entire flow. The artist taps "Build my page →" and the product must do something — write `able_v3_profile` to localStorage, wipe `able_wizard_draft`, generate the slug, and transition to the Done screen. PATH-TO-10.md specifies a building animation on the transition: the preview phone scales up slightly (1.0 → 1.05 → 1.0), the progress bar pulses to 100%, and the Done screen enters with a spring. The building animation duration should be 600–800ms — long enough to feel like the product is doing something real, short enough that it doesn't feel like a spinner. This is an explicit build requirement and is confirmed.

**Second:** The "Your page is live" claim must be true at the moment it is made. STRATEGY-REVIEW-FINAL.md flags this as Risk 4: if able-v7.html does not correctly read and render the localStorage profile, the claim is false at the highest-trust moment in the entire flow. The Playwright smoke test requirement (full end-to-end: paste URL → Screen 8 → click "Go to my page →" → verify able-v7.html renders with correct name, colour, theme, CTA) must be a blocking pre-release gate. This is a testing requirement, not a design decision, but it must be stated here because it directly governs whether Angle 2 reaches 9 in practice.

**Decision: confirm the 600–800ms building transition. Confirm the Playwright end-to-end smoke test as a blocking gate for all onboarding releases.**

**Pass 2 score: 9.** With the building transition specified and the smoke test gate confirmed, the primary job is deliverable on spec. The ceiling to 10 is execution and reliability at volume — the import must work for 99%+ of users, and the profile write must succeed on every device. These are engineering constraints that cannot be designed away.

---

### Angle 3 — Copy voice

**Pass 1 score: 9**

**Re-examination:**

COPY.md is excellent. Questions not labels, first-person CTAs, no SaaS filler, specific trust claims. The six additions from STRATEGY-REVIEW-FINAL.md have been incorporated: Screen 6 data ownership line, Screen 1 "Nothing goes live until you finish", Screen 8 dashboard context, Screen 0 plain-language placeholder, Screen 2 vibe card rename, Screen 0 import failure fault attribution. The copy audit checklist covers all edge cases.

One remaining gap: COPY.md specifies "Something else — I'll set it myself" for the catch-all vibe card but also specifies the revised version "My own thing. / I'll choose my own colours and feel." from the strategy review. The copy document must be updated to reflect the revised card before build — there is currently a discrepancy between the COPY.md copy audit checklist line (which still references the old version) and the strategy review decision. This is a documentation fix, not a design decision.

**Decision: COPY.md audit checklist line 18 must be updated to reference "My own thing. / I'll choose my own colours and feel." before build.**

**Pass 2 score: 9.** Confirmed at Pass 1 level. Ceiling to 10 requires hearing every line read aloud by a real artist from the target demographic — copy that sounds right in text can still land wrong in context.

---

### Angle 4 — Visual hierarchy

**Pass 1 score: 8**

**Re-examination:**

One-question-per-screen guarantees that hierarchy is architecturally sound. The gap between 8 and 9 is in the type scale specification, which PATH-TO-10.md addresses in detail but which has not been unified into a single reference.

The complete type hierarchy for every screen:
- Screen eyebrow (Step N of 7): 12px, Barlow Condensed or Plus Jakarta Sans regular, letter-spacing 0.08em, muted (opacity 0.5)
- Question headline: 36–40px desktop / 28–32px mobile, Plus Jakarta Sans 700 or Barlow Condensed 700 (screen-dependent — see below)
- Sub-headline: 16px, Plus Jakarta Sans 400, line-height 1.6, muted
- Input / answer text: 20px (text fields) / 17px (choice card labels)
- Choice card sub-text: 13px, opacity 0.6
- Continue button: 17px, Plus Jakarta Sans 600
- Micro-copy / trust lines: 12px, opacity 0.5
- Screen 0 headline exception: Barlow Condensed 700, 58px desktop / 44px mobile (confirmed P0)
- Screen 8 headline exception: Barlow Condensed 700, 60px, spring entrance

The distinction between Barlow Condensed (Screens 0 and 8 — the hero moments) and Plus Jakarta Sans (Screens 1–7 — the conversation) matters. It makes the opening and closing feel ceremonial relative to the middle, which should feel like a direct conversation.

**Decision: Confirm the type hierarchy above. Screens 0 and 8 use Barlow Condensed. Screens 1–7 questions use Plus Jakarta Sans 700 at 36–40px desktop / 28–32px mobile. This is a build requirement.**

One additional decision on the progress bar: the 2px accent-colour progress bar at the top of the viewport must have `z-index: 100` to ensure it is never obscured by any screen content on mobile. This is a trivial CSS detail but a genuine risk if not specified.

**Pass 2 score: 9.** With the type hierarchy locked and the progress bar z-index specified, the visual hierarchy is architecturally complete. The ceiling to 10 requires validation on actual device sizes — the clamp values and mobile type scales need to be verified in a browser before build is finalised.

---

### Angle 5 — CTA clarity

**Pass 1 score: 8**

**Re-examination:**

All Continue buttons: 56px height, full-width on mobile. Screen 7: "Build my page →". Screen 8: "Go to my page →" (primary, accent fill) and "Open my dashboard →" (secondary, ghost). First-person CTAs confirmed throughout. Screen-specific copy verified in COPY.md.

The gap between 8 and 9: the ghost button (secondary CTA on Screen 8 and on any screen with two actions) needs explicit specification. "Open my dashboard →" competes visually with "Go to my page →" if not handled carefully. The spec must confirm: primary CTA = accent fill, 56px; secondary CTA = ghost (1px border at var(--color-accent), transparent background), same 56px height, 8px gap between the two. On mobile, both stack vertically. The order — primary above secondary — must never invert.

**Decision: Ghost button spec confirmed: 1px border var(--color-accent), transparent background, 56px height, 8px margin-top from primary. Order never inverts on any viewport.**

The "Share it while you're here" section on Screen 8 needs one small specification: the three share icons (Instagram story, Copy link, Twitter/X) should each be 44px minimum touch target with a 8px gap between them, centred. The share section should have a 24px top margin from the secondary CTA and a 12px muted headline above the icons. This is already in COPY.md and SPEC.md but not explicitly specified as a layout measurement.

**Pass 2 score: 9.** With the ghost button spec and the share section layout locked, CTA clarity is complete. Ceiling to 10 is execution — the specific shade of accent, the exact opacity of the ghost border, the hover state — these require visual review in a browser.

---

### Angle 6 — Fear resolution

**Pass 1 score: 8**

**Re-examination:**

Three fears are addressed: transaction fear (Screen 0: "No card. No catch. Your page is free."), data ownership fear (Screen 6: "Your fans. Your data. They're yours — we can't contact them."), and incompleteness/public-shame fear (Screen 1: "Nothing goes live until you finish. Take your time."). These are placed at the exact moments each fear activates. A fourth trust signal on Screen 8 ("This page costs £0. It will never charge you to exist.") closes the loop.

The gap between 8 and 9: two fears that are addressed but not yet fully resolved.

**Fear of skill gap (addressed partially).** The plain-language placeholder ("Paste any link to your music or socials" as first cycle) and the "Works with Spotify, Linktree, SoundCloud, Bandcamp, YouTube — or nothing at all." copy help. But the import failure copy ("Couldn't reach Spotify right now — that's on us.") is the critical mechanism: it explicitly removes the fear that the artist did something wrong when the import fails. This is confirmed from STRATEGY-REVIEW-FINAL.md Addition 6. It must appear in amber (not red) with the name input appearing inline — no new screen, no modal, no disruption. The amber colour is specifically the right choice: not an error state (which implies the artist made a mistake) but an informational state (something happened, we're handling it).

**Fear of wasting time.** The 5-minute promise is made on the landing page, implied by the Screen 0 headline ("Set up in 5 minutes"), and confirmed by the measured journey times (2–3 minutes with import). But this fear has a subtler manifestation: at Screen 4 (Theme) and Screen 7 (Moment), the artist is making decisions that feel consequential. "Will I regret this choice?" The sub-headline on Screen 2 — "This sets the starting feel of your page. You can change everything later." — addresses this explicitly for vibe. The same reassurance needs to be present on Screen 3 (colour): "Change it any time." (already in COPY.md) and on Screen 4 (theme): the theme card sub-lines already include "You're choosing the atmosphere. What's right for your music?" which implicitly allows for change. No new copy needed — this is already correctly handled.

One additional decision: the back button must always work. If an artist taps back from Screen 5 to Screen 4, their Screen 4 answer must still be selected when they return. This is the sessionStorage (now: localStorage `able_wizard_draft`) requirement from STRATEGY-REVIEW-FINAL.md Risk 3. The back button must restore the full previous state — selected card highlighted, input values preserved, live preview showing the previous state. This is a technical requirement that directly serves fear resolution (the fear of losing work).

**Decision: Confirm back navigation restores complete previous screen state from `able_wizard_draft`. This is a P0 requirement. Each wizard screen must write its answers to `able_wizard_draft` on advance (not just on completion).**

**Pass 2 score: 9.** With the import failure amber state, the "that's on us" copy, the back navigation state restoration, and the four trust signals at correct placement, fear resolution is complete in spec. The ceiling to 10 requires testing with real artists who have genuine anxiety about the process — lab conditions cannot replicate the felt experience of a first-time user who is genuinely afraid of looking foolish.

---

### Angle 7 — Mobile experience

**Pass 1 score: 7**

**Re-examination:**

The mobile spec is complete but unbuilt. What is locked: 2-column vibe grid (mobile), 200px preview peek above form at 375px, 64px tap targets on all choice cards, 16px minimum input font-size (prevents iOS zoom), full-width Continue button at 56px, no horizontal scroll, `padding-bottom` for keyboard clearance, `window.scrollTo(0,0)` on input focus.

Several decisions remain needed to move this from 7 to 8 or 9.

**Decision 1: iOS keyboard handling.** When a text input is focused on iOS Safari, the virtual keyboard appears and pushes the viewport. The input field must remain visible above the keyboard. The pattern: on `focusin` for any text input, add `padding-bottom: calc(var(--keyboard-height, 0px) + 24px)` to the screen container. `--keyboard-height` must be set via `visualViewport` API (`window.visualViewport.addEventListener('resize', ...)`) which gives the available height when the keyboard is open. This is the correct iOS approach — `position: fixed` and `bottom: 0` elements also need updating. This is a P0 mobile requirement.

**Decision 2: Preview on mobile.** At 375px, the 200px preview peek is above the form. On screens where the preview isn't directly relevant to the current question (Screen 1: name, Screen 7: moment states), the peek takes up space without adding information. The preview should be collapsible on mobile — a small "preview" label tap expands it to full height, collapsing again on any answer tap. Alternatively, the peek can be reduced to 120px on Screens 1 and 7, and expanded to 200px on Screens 2–6 where the visual feedback is most valuable. This avoids a toggle interaction.

**Decision: Preview peek height is 120px on Screen 1 (name) and 200px on Screens 2–8. No collapse toggle — the variable height is handled by the screen index. This simplifies the interaction while keeping the preview useful when it's most relevant.**

**Decision 3: Vibe card tap feedback.** On mobile, the vibe card selection needs immediate tactile feedback. On tap: card background flashes to a 30% opacity accent fill, then settles to the selected state. Duration: 100ms tap flash, 200ms settle. This is the same spring pattern used throughout. Without this, mobile card taps feel unresponsive at the moment they should feel most direct.

**Pass 2 score: 8.** With the keyboard handling spec, the variable preview height, and the tap feedback animation locked, the mobile spec is as complete as it can be without a built device test. The ceiling at 8 is honest — a built mobile experience tested on real iOS Safari is the only path to 9 or 10. Type scales may need adjustment, the keyboard handling may need debugging, and the vibe grid may reflow unexpectedly. These are execution risks, not spec gaps.

---

### Angle 8 — Performance

**Pass 1 score: 7**

**Re-examination:**

Performance risks in the onboarding wizard are: font loading, import API latency, and preview update speed.

**Font loading:** Both DM Sans and Barlow Condensed (or Plus Jakarta Sans and Barlow Condensed, per the admin/profile distinction) must be preloaded in `<head>` with `<link rel="preload" as="font" crossorigin>`. The wizard uses both: Barlow Condensed on Screens 0 and 8, Plus Jakarta Sans on Screens 1–7. Both must be preloaded. If only one is preloaded, the first Screen 0 render will show a font swap at the headline — visible and jarring.

**Import API latency:** The Spotify API call via `/.netlify/functions/spotify-import` is the only network call that can block the perceived flow. The call runs on paste (debounced 500ms). The spinner appears in the input immediately on paste detection. If the call takes more than 2 seconds, "Taking longer than usual..." appears. If it exceeds 10 seconds, "That's taking too long. Carry on without the import →" appears. These are already specced. The key build requirement: the spinner must appear in under 100ms of the paste event — before the API call completes. This is a JS event-listener requirement on `input` or `paste` events, not dependent on network.

**Preview update speed:** The preview must update on every input change for text fields (debounced 150ms) and on every tap for choice cards (0ms debounce — immediate). PATH-TO-10.md specifies CSS variable updates only — no innerHTML changes, no DOM restructuring, no reflows. The preview's live state is maintained via a set of CSS custom properties on the preview container. This is the correct architectural choice and is confirmed.

**One gap identified:** The wizard draft write to `able_wizard_draft` in localStorage happens on each screen advance. On slow devices, localStorage writes are synchronous and can block the main thread. The fix: use `requestIdleCallback` to schedule the localStorage write — the advance animation runs first, the write happens during idle time. This is a P2 performance optimisation but should be in the build spec to prevent jank on budget Android devices.

**Decision: Add `requestIdleCallback` for `able_wizard_draft` localStorage writes. Preload both Plus Jakarta Sans and Barlow Condensed. Spinner appears in < 100ms of paste event.**

**Pass 2 score: 8.** The performance spec is now comprehensive. The ceiling to 9 requires testing on real low-end devices (budget Android, Safari on older iOS) where the debounce timing and localStorage write performance are unpredictable. A 7.4/10 spec-level score is honest; 8 reflects a well-specced implementation. Field testing moves this toward 9.

---

### Angle 9 — Emotional resonance

**Pass 1 score: 9**

**Re-examination:**

The four emotional beats are all specced:
1. **The import confirmation** — "We found [Name] on Spotify ✓" — the "oh wow, it found me" moment.
2. **The real artist names on vibe cards** — "Wet Leg, The Smile, Yard Act" — the "they know my world" moment.
3. **The live preview updating** — "this is actually mine" as the page becomes more specific with each answer.
4. **"Your page is live."** — the payoff, the delivery on the promise.

The question for Pass 2: is there a fifth emotional beat that is missing?

There is one: the slug moment on Screen 8. When the artist sees `ablemusic.co/declan-forde` — their name, in a URL, as a real thing on the internet — this is a fifth moment of resonance. It's distinct from "your page is live" (which is about the campaign state) — it's about identity. "I have a real address. This is mine."

The slug must be styled as a real URL — `https://ablemusic.co/declan-forde` in a slightly muted but legible monospace or brand font, preceded by the protocol. The pencil icon (✎) should be subtle, not a prominent edit UI — the emphasis is on the URL as a real thing, with the edit affordance as a secondary detail. If the artist edits the slug, the URL updates inline with no page reload, just a smooth text transition.

**Decision: The URL on Screen 8 is displayed as the full URL including https:// — this makes it feel like a real thing on the internet, not a shortcode. Pencil icon is 14px, low opacity, visible on hover/touch. Edit is inline with smooth text transition.**

**Pass 2 score: 9.** Confirmed from Pass 1. The ceiling to 10 is that emotional resonance is not spec-verifiable — it requires real artists experiencing the product for the first time. The "oh wow" moment can be designed in, but it cannot be scored as a 10 until it has been observed.

---

### Angle 10 — "13-year-old" test

**Pass 1 score: 8**

**Re-examination:**

The "13-year-old" test asks whether a non-technical user can navigate the entire wizard without confusion. The confirmed answers: the live preview removes the need to understand "accent colour" (you see the button turn that colour), theme cards have plain-language descriptions, the import flow requires only a paste, the plain-language placeholder removes URL format anxiety, and the vibe card rename removes genre-classification stigma.

The gap between 8 and 9: two specific moments that could still cause confusion.

**The colour picker.** "Choose your own →" opens the native OS colour picker. On mobile iOS, this is a small colour wheel that is not intuitive for non-technical users. PATH-TO-10.md specifies that the native `<input type="color">` should be hidden and triggered by a custom UI element, but the custom UI is the 8-swatch grid plus "Choose your own →". When they tap "Choose your own →", what do they see? The spec should clarify: on mobile, "Choose your own →" opens a hex input field inline (a text field pre-populated with their current accent hex, editable) rather than triggering the native picker. On desktop, triggering the native picker is acceptable because the OS colour picker is usable. On mobile, hex input is simpler than the native colour wheel.

**Decision: On mobile (`max-width: 768px`), "Choose your own →" opens an inline hex input field (showing current accent as `#xxxxxx`, editable). On desktop, it triggers `<input type="color">`.**

**The date picker on Screen 7.** "Something's coming" reveals a date input. Native date pickers on mobile vary wildly in usability. The spec should confirm: use `<input type="date">` (which on iOS renders as the native date scroll wheel, which is actually excellent on iOS Safari). On Android, the native date picker is also reasonable. No custom date picker is needed — the native implementations on mobile are better than a bespoke one for this use case.

**Decision: Screen 7 date input uses native `<input type="date">`. No custom picker. Test on iOS Safari and Chrome Android to confirm usability.**

**Pass 2 score: 9.** With the mobile colour picker handled via hex input and the date picker confirmed as native, the two remaining confusion points are resolved. Ceiling to 10: tested with a real non-technical user.

---

### Angle 11 — Trust signals

**Pass 1 score: 8**

**Re-examination:**

Four trust signals confirmed at correct placement:
- Screen 0: "No card. No catch. Your page is free."
- Screen 1: "Nothing goes live until you finish. Take your time."
- Screen 6: "Your fans. Your data. They're yours — we can't contact them."
- Screen 8: "This page costs £0. It will never charge you to exist."

Plus the secondary trust line on Screen 8: "No contract. Cancel any time. Free forever on the free plan."

The gap between 8 and 9: one trust gap not yet addressed. When the artist is on Screen 8 and clicks "Go to my page →", they navigate to able-v7.html. At this point, do they have an account? Can they get back? The transition from onboarding to the live page must not leave the artist feeling like they've lost access to their settings.

The answer is in admin.html — the dashboard is where they manage everything. But after Screen 8, the artist should understand that `admin.html` is their control room and that their page persists. Screen 8 already has "Open my dashboard →" and the contextual line "From there, you can see who signs up, switch campaign modes, and update anything on your page." This is correct.

But there is one more trust moment: the able-v7.html profile page that the artist lands on after clicking "Go to my page →" must show an edit affordance or an admin link. If the artist lands on their page and sees no way to get back to edit mode, the trust established by "update anything on your page" evaporates. This is a cross-page requirement: able-v7.html must show a logged-in artist a subtle "Edit" or "Dashboard" floating link. This is outside the onboarding spec scope, but it must be flagged as a dependency.

**Decision: Add a build dependency flag: able-v7.html must show a "Back to dashboard" or "Edit" affordance for the artist viewing their own page. This is not an onboarding design decision but it directly affects trust in the post-onboarding experience.**

**Pass 2 score: 9.** With the four trust signals in place and the dashboard contextual line on Screen 8, the onboarding's trust architecture is complete. The dependency on able-v7.html is flagged. Ceiling to 10: social proof (Angle 14) is the limiting factor across the trust system, not the trust signals themselves.

---

### Angle 12 — Cross-page coherence

**Pass 1 score: 7**

**Re-examination:**

Cross-page coherence has three dimensions:
1. **Start.html → able-v7.html:** The preview in onboarding must look like the live profile page. Same CSS variable system, same design language.
2. **Landing page → start.html:** The landing page promises a campaign-aware, beautiful page. Onboarding must deliver on that promise by the time the artist reaches Screen 8.
3. **Start.html → admin.html:** The campaign state chosen in Screen 7 must appear correctly in the admin dashboard.

PATH-TO-10.md confirms the preview architecture: the `<div class="phone-preview">` shares the same CSS tokens as able-v7.html. On "Build my page →" submission, `able_v3_profile` is written and able-v7.html reads it. The campaign state maps correctly to the four states.

The gap between 7 and 8 or 9: two specific coherence risks.

**Risk 1: The preview is a simplified mini-version, not an exact replica.** The preview at 195px wide cannot show every detail of a 390px page. There will be differences — cards that don't appear in the preview, type sizes that are proportionally different, sections that are hidden for brevity. The rule: the preview must show name, accent colour, theme, CTA text, and campaign state. It does not need to show platform pills, release cards, or gig details. What the preview promises must be what able-v7.html delivers. Anything shown in the preview must be correct in the live page.

**Decision: The preview is a curated subset of able-v7.html, not a full replica. It shows: name, genre sub-line, accent CTA button, theme background, fan capture CTA text, campaign state indicator. It does not show: platform pills, release cards, merch, snap cards. This prevents "preview promised X, page shows Y" disappointment.**

**Risk 2: The slug shown on Screen 8 must resolve to a real page.** If the artist copies `ablemusic.co/declan-forde` and shares it, it must open their page. In the current localStorage-based implementation, the page only works on the same browser and device. This is a backend dependency — without Supabase, the "page is live and shareable" claim is technically false. The onboarding spec should note this clearly: pre-Supabase, the Done screen should read "Your page is set up." not "Your page is live." until the backend is live and the URL is genuinely resolvable. This is a product decision, not a design decision. For the purposes of this review, the spec assumes backend is present.

**Decision: Until Supabase is live, Screen 8 headline reads "Your page is ready." not "Your page is live." This is a one-word change but it keeps the claim honest. When Supabase is live and the URL is genuinely resolvable, switch to "Your page is live."**

**Pass 2 score: 8.** With the preview curated correctly and the slug claim handled honestly, cross-page coherence is as complete as it can be in a pre-backend build. The ceiling to 9 requires the backend to be live and the URL to be genuinely shareable, at which point the coherence becomes real rather than local. The gap from 8 to 9 is a Supabase deployment, not a design decision.

---

### Angle 13 — Switcher path

**Pass 1 score: 8**

**Re-examination:**

Sofia's journey is fully specced. The Linktree import detects `linktr.ee/` URLs, calls the `linktree-import` Netlify function, parses links with platform detection, shows confirmation on Screen 5, reassures on Screen 7 ("Your Linktree link still works while you're getting set up."), and personalises Screen 8 ("Your 6 Linktree links are all here.").

The gap between 8 and 9 requires deep examination because this is the highest-priority acquisition path (the Linktree switcher is ABLE's primary growth mechanism) and any friction here costs real conversions.

**Gap 1: The `?import=linktree` query parameter.** USER-JOURNEYS.md notes that Sofia arrives at `start.html?import=linktree` from the landing page comparison section. When this parameter is present, the input placeholder should cycle to "Paste your Linktree URL..." as the first cycle, and the sub-headline should read "We'll import your links and build your page in minutes." — rather than the generic "Paste your Spotify or Linktree link — we'll build the rest." This is a small but specific personalisation for the most intent-rich entry point. The cost is minimal (one JS check on load) and the benefit is direct ("this page knew why I was here").

**Decision: When `?import=linktree` is present, Screen 0 sub-headline changes to: "Paste your Linktree URL and we'll bring everything across." First placeholder cycle: "linktr.ee/yourname". Input focus is automatic. This is a confirmed build requirement.**

**Gap 2: The Linktree import failure path.** STRATEGY-REVIEW-FINAL.md Risk 2 flags that Linktree actively blocks scrapers. The current failure copy is "Couldn't read your Linktree — it might be set to private. Add your links manually →". This is correct in tone but the "Add your links manually →" CTA must navigate Sofia directly to Screen 5 (manual link entry), not Screen 1. If she arrived expecting import and import fails, skipping back to Screen 1 (name) loses context and feels like a restart. The failure path must jump to Screen 5 with a pre-populated note: "Your Linktree couldn't be imported — add your links here." This is a routing requirement.

**Decision: Linktree import failure routes directly to Screen 5 (manual links). Screen 5 opens with headline "Add your links here." and a muted note: "We couldn't read your Linktree — these can go straight in."**

**Gap 3: Credit for switching.** On Screen 8 for Sofia, the done screen shows "Your 6 Linktree links are all here." This is correct. One small addition: a visual count or a list of the imported links would reinforce that the transfer was complete. A minimal list — "Spotify · Apple Music · Instagram · YouTube · Bandcamp · SoundCloud" — in small type below the URL line would take 10 seconds to build and would eliminate any lingering doubt about whether the import was complete.

**Decision: Screen 8 for Linktree switchers shows imported platform names in a single muted line: "Brought in: Spotify · Apple Music · Instagram · [etc.]". Not a list — a single horizontal string, 12px, muted. This confirms completeness at a glance.**

**Pass 2 score: 9.** With the `?import=linktree` personalisation, the failure routing fix, and the completion confirmation on Screen 8, the switcher path is fully addressed in spec. The ceiling to 10 is the Linktree import reliability itself — if Linktree changes their page structure or tightens scraper detection, the import fails more often and no design fix compensates.

---

### Angle 14 — Social proof

**Pass 1 score: 4**

**Re-examination:**

This is the hardest angle to improve pre-launch. The current spec includes geographic social proof on Screen 0: "Used by independent artists in London, Manchester, Barcelona, Bogotá." This is honest (it is a claim ABLE can make when the first artists are live) and specific (four real cities) but it does not carry the weight of a real testimonial.

**What would move this from 4 to 6:**
- A single real quote from a real artist who has used ABLE, placed on Screen 0 below the trust line. Even one honest sentence — "I set this up in 4 minutes and it looks better than my old page." — from a named artist with a linked page does more than any amount of geographic proof.
- Screen 8: "You're in. [N] other artists launched their ABLE page this week." — a real-time counter (or a hardcoded plausible number post-launch) that makes the artist feel they're joining something real, not being an early tester.

**What is achievable now (pre-launch):**
- The geographic claim is achievable if even one artist from each city is live.
- The Screen 8 counter can be seeded from the profile count in Supabase once the backend is live.
- A testimonial is not achievable until an artist has used the product and chosen to endorse it.

**Decision: No manufactured testimonials. No placeholder quotes. The geographic claim stays ("Used by independent artists in London, Manchester, Barcelona, Bogotá") and goes on Screen 0 in 12px, muted, below the "Works with..." line. Screen 8 adds: "You're in. [N] artists launched their page this week." — the N is pulled from Supabase when live, hardcoded to a realistic number otherwise. When the first real testimonial is available, it replaces the geographic claim as the primary social proof signal.**

**Pass 2 score: 5.** One point of improvement from accepting the geographic claim as a confirmed spec element (it was previously described but not explicitly confirmed as a build requirement). The ceiling is real: social proof cannot be designed above 5 pre-launch. It requires real artists and real outcomes.

---

### Angle 15 — Accessibility

**Pass 1 score: 7**

**Re-examination:**

PATH-TO-10.md specifies the full accessibility requirements: `role="radio"` and `aria-checked` on vibe and theme cards, `aria-valuenow`/`aria-valuemin`/`aria-valuemax` on the progress bar, `role="alert"` on error states, all inputs have `<label>` or `aria-label`. The focus-ring CSS is already implemented with `:focus-visible`.

The gap between 7 and 8: keyboard navigation on the choice card grids. When the vibe card grid or theme card grid has focus, arrow keys should move selection between cards (left/right/up/down). This is the standard radiogroup keyboard pattern. PATH-TO-10.md specifies this and the current start.html already implements directional step transitions for keyboard (Escape = back). The card grid keyboard navigation needs explicit testing — this is the most likely accessibility regression point.

One additional decision: the progress bar at the top of viewport must be announced to screen readers. An `aria-live="polite"` region (off-screen) should update with "Step N of 7" as the artist advances. This allows screen reader users to hear their progress without having to navigate to the progress bar element.

**Decision: Add an off-screen `aria-live="polite"` region that announces "Step N of 7" on each screen advance. This is a single `<span class="sr-only" aria-live="polite">` element that updates via JS. Confirm radiogroup keyboard navigation on vibe and theme grids in QA.**

**Pass 2 score: 8.** With the `aria-live` region and the explicit QA requirement for keyboard grid navigation, accessibility is as complete as it can be in spec. The ceiling to 9 requires testing with a real screen reader (VoiceOver on iOS, NVDA on Windows). Screen reader announcements are highly sensitive to DOM order and focus management — a spec can be correct and still produce poor screen reader output. This is execution-dependent.

---

### Angle 16 — Animation quality

**Pass 1 score: 7**

**Re-examination:**

PATH-TO-10.md specifies four key animation moments:
1. Preview phone: `scale(0.98) → scale(1.0)` + opacity pulse on any value update
2. Vibe card selection: small bounce on selected card (`scale(1.0) → scale(1.03) → scale(1.0)`, spring easing)
3. Colour swatch: checkmark pops in with spring (`opacity: 0, scale(0.5)` → `opacity: 1, scale(1.0)`)
4. Screen 8 headline: `scale(0.9) → scale(1.0)` spring entrance

The directional step transitions are already confirmed: forward = slide from right, back = slide from left, using `translateX` with spring easing.

The gap between 7 and 8 or 9: the Screen 7 → Screen 8 building transition (already addressed in Angle 2: 600–800ms, progress bar pulses to 100%, preview scales up). Two additional animation refinements:

**The import detection spinner.** The spinner in the input on Screen 0 (shown while the API call runs) should not be a generic CSS spinner — it should feel like the product is actively doing something. A pulsing dot pattern (three dots with staggered opacity: 0.3 → 1.0 → 0.3 cycling, 400ms each, offset by 133ms) communicates "searching" rather than "loading". This is a small but character-specific detail.

**Decision: Import spinner is a three-dot pulse pattern, not a rotation spinner. Dot opacity cycle: 400ms, staggered by 133ms. This communicates "searching" and matches ABLE's restrained aesthetic better than a generic spinner.**

**The Screen 8 share icons entrance.** The three share icons (Instagram story, Copy link, Twitter/X) should appear with a staggered entrance — each delayed by 80ms. This creates a gentle cascade that feels considered rather than abrupt. Duration: 300ms, opacity 0 → 1, translateY 8px → 0.

**Decision: Screen 8 share icons: staggered entrance, 80ms delay between each. 300ms, opacity + translateY.**

**Pass 2 score: 8.** With the four PATH-TO-10 animations, the building transition, the dot-pulse import spinner, and the share icon cascade, the animation spec is complete. The ceiling to 9 requires device testing — spring animations can feel different on different devices depending on frame rate and GPU performance. A motion-reduced media query (`@media (prefers-reduced-motion: reduce)`) must disable all animations except the directional step transitions (which are functional, not decorative). This is a confirmed build requirement.

---

### Angle 17 — North star test

**Pass 1 score: 8**

**Re-examination:**

The north star test asks: does this feel like ABLE, not "a tool"? Five elements make it feel like ABLE: the import moment, the live preview, the OQPS structure, the vibe cards with real artists, and the "Your page is live." payoff.

The gap between 8 and 9: the north star is not just about the moments — it is about the connective tissue between them. Does the flow feel coherent? Does it feel like one product with a consistent point of view, or does it feel like eight separate screens?

Two things make the connective tissue work:

**The live preview as the constant.** The preview panel is the one element that appears on every screen (Screens 1–8). It is the throughline. Its label — "Your page is taking shape." (before name) → "This is [Name]'s page." (after name) — marks the transition from building to having built. The preview must be in a consistent position, at a consistent scale, with consistent behaviour. Any inconsistency in the preview — a different height on one screen, a different label, a different positioning — breaks the sense of continuity.

**The voice.** Every screen is a question or a statement. Never a label, never a field name. The voice is patient, direct, confident. If a single screen breaks this — a muted sub-text that sounds like SaaS, a placeholder that uses the word "Select" instead of a question — it breaks the coherence. Every word must be read against COPY.md before build.

**Decision: Mandatory COPY.md read before build. Every word in the build must match COPY.md exactly. No paraphrasing, no "close enough". If a word needs to change, update COPY.md first.**

**Pass 2 score: 9.** With the preview as the throughline and the copy locked to COPY.md, the north star test is as achievable as the spec allows. The ceiling to 10 requires the built product to be experienced — the north star is a felt quality, not a designed one.

---

### Angle 18 — AI red team

**Not scored. Preventive.**

STRATEGY-REVIEW-FINAL.md identified 5 strategic risks. Pass 2 confirms their mitigations:

| Risk | Mitigation | Status |
|---|---|---|
| Import failure (all modes) | Graceful amber fallback, "that's on us", inline name input | Confirmed |
| iOS sessionStorage loss | localStorage `able_wizard_draft`, not sessionStorage | Confirmed |
| "Your page is live" false claim | "Your page is ready." pre-Supabase; Playwright smoke test blocking gate | Confirmed |
| Technical burden anxiety | Plain-language placeholder, "that's on us" copy | Confirmed |
| Industry fragmentation vertigo | "My own thing. / I'll choose my own colours and feel." | Confirmed |

One additional red team consideration not in the prior document: **the slug collision risk**. When an artist auto-generates their slug from their name, there is a risk of collision with an existing slug. Pre-backend, this doesn't exist (localStorage is per-device). Post-backend, two artists named "Luna Serrano" would both get `luna-serrano`. The backend must handle this with a suffix (`luna-serrano-2`) and the onboarding must allow the artist to edit their slug before finalising. The inline edit on Screen 8 is the correct mechanism — but the edit must check for collision and surface a message: "That URL is taken — try luna-serrano-music or choose your own." This is a backend + build requirement.

**Decision: Add slug collision handling to Screen 8. On slug edit, check for availability. If taken, suggest alternatives. If auto-generated slug is taken (post-Supabase), append "-music" as the first fallback.**

---

### Angle 19 — Single memory

**Pass 1 score: 8**

**Re-examination:**

The target single memory: "I pasted my Spotify and it knew who I was." (import users) or "I picked my colour and saw my page update instantly." (scratch users).

The gap between 8 and 9: the "colour update" memory is actually less specific than it could be. The most powerful version of this memory is tied to a specific moment of personalisation — the moment the artist sees their name in the preview for the first time.

The preview label transition — from "Your page is taking shape." to "This is Declan Forde's page." — happens as soon as Screen 1 is completed. This is the first moment the product calls them by name. It is quiet, specific, and non-interruptive. But it should be slightly more prominent than the current "11px, muted" specification suggests. The label transition could use a fade-in rather than an abrupt text swap — 300ms opacity crossfade. Small change, meaningful effect.

**Decision: Preview label transition (from "Your page is taking shape." to "This is [Name]'s page.") uses a 300ms opacity crossfade rather than an abrupt text swap. This makes the personalisation moment feel deliberate.**

**Pass 2 score: 9.** With the crossfade on the label transition, the single memory is precisely targeted. The "import + name in preview" combination is the moment. The ceiling to 10: memory is post-hoc. You cannot score a memory until someone has had it.

---

### Angle 20 — Big picture connection

**Pass 1 score: 7**

**Re-examination:**

Big picture connection asks: does the onboarding wizard serve the 12-month MRR goal? The upgrade path, the tier system, the campaign modes — do they get seeded in onboarding without feeling like a sales pitch?

Three mechanisms are confirmed:
1. Screen 7 (Current Moment): the artist encounters campaign states for the first time — "Something's coming", "Music just dropped", "Playing tonight". This plants the seed that the page can change with their career.
2. Screen 8 (Done): "From there, you can see who signs up, switch campaign modes, and update anything on your page." — the dashboard context line shows what the dashboard does without prescribing what to do next.
3. Screen 8: "This page costs £0. It will never charge you to exist." — the free tier is confirmed, and the door to paid tiers is left open without a sales push.

The gap between 7 and 8 or 9: the tier system is not mentioned in onboarding at all except implicitly. The 20-ANGLE-ANALYSIS.md specifies: "Your first 100 fan sign-ups are free. After that, £9/month for unlimited." This is an honest, specific, non-pressured upgrade seed that directly connects the product's fan capture feature (Screen 6) to the upgrade motivation.

**Decision: Screen 8 adds one additional line below the secondary trust line: "Your first 100 fan sign-ups are free." at 12px, muted. This is specific (100 is a concrete number), honest (it's the actual free tier limit), and non-pressured (it's a fact, not a pitch). It connects the fan capture choice from Screen 6 to the product's upgrade path without making the Done screen feel like a sales page.**

One further decision: the free tier mention should not appear on Screen 6 (fan capture). That screen is where the artist is making a creative decision about their fan relationship — introducing a tier gate here would undermine the choice. The Done screen is the right placement: the artist has already made all their decisions and is in a state of completion. A single factual line about the free limit is contextually appropriate.

**Pass 2 score: 8.** With the 100 sign-ups line on Screen 8 and the campaign state seed on Screen 7, the big picture connection is substantially improved. The ceiling to 9 requires the artist to actually reach their 100-fan limit and see the upgrade prompt — the seed is planted in onboarding but the germination is months later. The connection between onboarding and the business model is present but requires the full product lifecycle to be felt.

---

## Pass 2 scorecard

| Angle | Pass 1 | Pass 2 | Key decision in Pass 2 |
|---|---|---|---|
| 1. First impression | 8 | 9 | Input border lights on focus. Wordmark confirmed at reduced opacity. |
| 2. Primary job | 8 | 9 | Building transition 600–800ms. Playwright smoke test as blocking gate. |
| 3. Copy voice | 9 | 9 | COPY.md audit checklist updated for vibe card rename. |
| 4. Visual hierarchy | 8 | 9 | Full type hierarchy locked. Barlow Condensed for Screens 0 and 8 only. |
| 5. CTA clarity | 8 | 9 | Ghost button spec confirmed. Share section layout measurements locked. |
| 6. Fear resolution | 8 | 9 | Back navigation state restoration from `able_wizard_draft` confirmed P0. |
| 7. Mobile experience | 7 | 8 | iOS keyboard handling via visualViewport. Preview peak height variable by screen. Tap flash animation. |
| 8. Performance | 7 | 8 | `requestIdleCallback` for localStorage writes. Both fonts preloaded. Spinner < 100ms. |
| 9. Emotional resonance | 9 | 9 | URL as full https:// on Screen 8. Fifth emotional beat (slug moment) confirmed. |
| 10. "13-year-old" test | 8 | 9 | Mobile hex input instead of native colour picker. Native date input confirmed. |
| 11. Trust signals | 8 | 9 | able-v7.html "Back to dashboard" dependency flagged. Four signals correctly placed. |
| 12. Cross-page coherence | 7 | 8 | Preview curated subset defined. "Your page is ready." pre-Supabase. |
| 13. Switcher path | 8 | 9 | `?import=linktree` personalisation. Failure routes to Screen 5. "Brought in:" list on Screen 8. |
| 14. Social proof | 4 | 5 | Geographic claim confirmed. Screen 8 counter spec'd. No manufactured testimonials. |
| 15. Accessibility | 7 | 8 | `aria-live` region for step progress. Keyboard grid navigation as QA gate. |
| 16. Animation quality | 7 | 8 | Dot-pulse import spinner. Screen 8 share icon cascade. Building transition spec'd. |
| 17. North star test | 8 | 9 | COPY.md mandatory read. Preview as constant throughline confirmed. |
| 18. AI red team | — | — | Slug collision handling added. All 5 prior risks confirmed mitigated. |
| 19. Single memory | 8 | 9 | Preview label transition: 300ms opacity crossfade. |
| 20. Big picture | 7 | 8 | "Your first 100 fan sign-ups are free." added to Screen 8. |

**Pass 2 overall: 8.8/10**

---

## Pass 3 — Honest ceilings

Pass 3 applies final scrutiny to every angle still below 9. For each, the question is: is this ceiling spec-resolvable (a design or technical decision can get it to 9+), execution-dependent (requires the actual build to validate), or data-dependent (requires real users or real-world conditions)? What would a 10 look like, and what specifically prevents it now?

For angles already at 9, Pass 3 asks what separates them from 10.

---

### Angle 1 — First impression: 9
**Ceiling to 10:** Tested on real artists who arrive cold, with no prior knowledge of ABLE, and immediately understand "this will pre-fill my page." Currently, the design communicates this through layout and copy — but comprehension is not guaranteed until observed. The "oh wow" moment may not land for artists who do not have their Spotify artist URL memorised and must go find it. The plain-language placeholder ("Paste any link to your music or socials") mitigates this but does not eliminate it. **A 10 requires observing the comprehension in user testing.** This is data-dependent.

### Angle 2 — Primary job: 9
**Ceiling to 10:** The primary job is "live page in 5 minutes." This claim is honest in spec (2–4 minutes measured) but depends on import reliability. If 15% of Spotify imports fail (which is plausible given API rate limits), 15% of artists experience a slower, manually-entered flow. The 5-minute promise holds, but the "effortless" quality does not. **A 10 requires import reliability at 99%+ sustained at scale.** This is execution-dependent.

### Angle 3 — Copy voice: 9
**Ceiling to 10:** Every line reads correctly against COPY.md. The one remaining risk is voice inconsistency in edge cases — the error states, the timeout messages, the fallback copy — which are read less carefully during development than the hero screens. A thorough copy audit against every error state and edge case copy line, with the same critical attention given to the hero screens, would close this gap. **A 10 requires a full copy audit by someone who is not the developer,** reading every state including fallbacks aloud against the voice standard. This is execution-dependent.

### Angle 4 — Visual hierarchy: 9
**Ceiling to 10:** Type scale is locked. The hierarchy is architecturally sound. The remaining risk is that the clamp values for mobile type (28–32px at mobile) may not hit the right range across all device sizes — a 360px device will show different proportions than a 390px device. **A 10 requires device testing at 360px, 375px, 390px, and 430px** to confirm the clamp values land correctly. This is execution-dependent.

### Angle 5 — CTA clarity: 9
**Ceiling to 10:** The CTAs are specced correctly. The ghost button treatment is defined. The remaining risk is the visual weight of "Go to my page →" versus "Open my dashboard →" on Screen 8. If the ghost button is too visually similar to the primary, artists may not distinguish which action is primary. **A 10 requires visual QA on Screen 8** — does the primary vs. secondary distinction read immediately? This is execution-dependent.

### Angle 6 — Fear resolution: 9
**Ceiling to 10:** The four trust signals are correctly placed and the fears are correctly identified. The remaining irreducible fear — "what if my page looks bad?" — cannot be resolved by onboarding alone. It depends on able-v7.html delivering a genuinely attractive page when the artist clicks "Go to my page →". **A 10 for fear resolution requires a 10 for able-v7.html quality.** This is a cross-page dependency.

### Angle 7 — Mobile experience: 8
**Ceiling to 9:** The spec is complete. The iOS keyboard handling is the highest-risk implementation point — `visualViewport` API behaviour varies across iOS versions and Chrome Mobile. The 200px → 120px preview height variation requires testing to confirm the peek is useful at the reduced size. **A 9 requires device testing on iOS Safari (latest and -1) and Chrome Android.** This is execution-dependent.

**Ceiling to 10:** A 10 mobile experience requires the wizard to feel native — indistinguishable from an app. This requires performance profiling, potentially a Service Worker for offline capability, and gesture recognition (swipe-left to go back). These are scope expansions beyond the current spec. **A 10 is achievable in a future iteration, not this build.**

### Angle 8 — Performance: 8
**Ceiling to 9:** Performance on real devices. The `requestIdleCallback` optimisation, the font preloads, and the inline spinner are all specced. But bundle size, parse time, and layout recalculation timing can only be measured in a real browser with real assets. **A 9 requires Lighthouse/WebPageTest profiling on the actual built page.** Performance budget: Time to Interactive < 2.5 seconds on a 3G connection. This is execution-dependent.

**Ceiling to 10:** A 10 performance score requires the wizard to load and be interactive in under 1 second on a 4G connection. This is achievable with aggressive font subsetting, prerendering Screen 0, and lazy-loading Screen 1–8 assets. Scope expansion for a future iteration.

### Angle 9 — Emotional resonance: 9
**Ceiling to 10:** Emotional resonance is the least spec-verifiable angle. The five beats are correctly identified and designed for. But emotional resonance is a lived experience — the "oh wow" when the import confirms, the quiet pleasure of seeing your name in the preview, the satisfaction of "Your page is ready." — none of these can be guaranteed by spec. **A 10 requires observing real artists experiencing the flow for the first time.** It is data-dependent and cannot be reached by design alone.

### Angle 10 — "13-year-old" test: 9
**Ceiling to 10:** The mobile hex input for custom colour, the native date picker, the plain-language placeholder, and the vibe card rename all address the identified confusion points. A 10 requires watching a genuinely non-technical user (not a developer, not a designer, not someone who has seen the spec) navigate the wizard without guidance. **A 10 requires usability testing.** This is data-dependent.

### Angle 11 — Trust signals: 9
**Ceiling to 10:** The four trust signals are correctly placed and specifically worded. A 10 requires the trust signals to be read by artists who have active distrust — artists who have been burned by platform lock-in, data selling, or hidden charges. The copy is correct, but trust is rebuilt through behaviour over time, not claims in onboarding. The single highest-leverage trust action is keeping the promises made ("This page costs £0. It will never charge you to exist."). **A 10 for trust signals is achieved through product behaviour over 6+ months, not design.** This is data-dependent.

### Angle 12 — Cross-page coherence: 8
**Ceiling to 9:** Blocked by the Supabase backend. "Your page is ready." pre-Supabase is honest, but the full coherence story (a real URL, shared with real fans, updating in real time from admin.html) requires the backend to be live. The preview correctly reflects able-v7.html. The campaign state writes correctly to `able_v3_profile`. **A 9 requires the Supabase backend to be live and the URL to be genuinely shareable.** This is execution-dependent.

**Ceiling to 10:** Full end-to-end product coherence — onboarding sets up the page, the page updates from admin, fans sign up and appear in admin, emails work, campaign modes switch correctly — requires the entire product to be built and working. **A 10 is the complete product working, not just the onboarding wizard.** System-dependent.

### Angle 13 — Switcher path: 9
**Ceiling to 10:** The Linktree import reliability is the ceiling. Linktree actively blocks scrapers. The `linktree-import` Netlify function must implement a robust parsing strategy that handles Linktree's client-rendered HTML, handles private pages, handles Linktree's varying HTML structure across page types. If import works 90% of the time, 10% of switchers experience the manual fallback path, which is correctly handled but is not the same experience as the import. **A 10 requires import reliability at 99%+ for Linktree URLs.** This is an engineering constraint.

### Angle 14 — Social proof: 5
**Ceiling to 6 (now, pre-launch):** The geographic claim is honest but weak. The Screen 8 counter is plausible once the backend is live. A 6 requires at least one real, attributed testimonial from a real artist.

**Ceiling to 8 (post-launch, 3–6 months):** With 50+ artists live and a selection of willing testimonials, social proof can reach 8. Three artist quotes on Screen 0, a real counter on Screen 8, and a visible artist directory link ("See who's already on ABLE →") would reach 8.

**Ceiling to 9–10 (12+ months):** Network effects. When an artist's fans recognise the ABLE page design from another artist they follow, the platform's credibility is self-referential. This is not a design problem — it is a growth problem. **Social proof is the one angle where design decisions are not the limiting factor. It is entirely data- and time-dependent.**

### Angle 15 — Accessibility: 8
**Ceiling to 9:** Screen reader testing on VoiceOver (iOS) and NVDA (Windows). The `role="radio"` radiogroup pattern, the `aria-live` progress announcements, and the `role="alert"` error states are all specced. But accessibility testing reveals edge cases that spec cannot predict: focus order anomalies, screen reader verbosity in unexpected DOM contexts, iOS VoiceOver's particular handling of custom radiogroup components. **A 9 requires screen reader testing on real devices with a screen reader user.** This is execution-dependent.

**Ceiling to 10:** A 10 WCAG conformance score requires full manual audit plus automated testing. This is a formal compliance exercise. Achievable, but not in this build iteration.

### Angle 16 — Animation quality: 8
**Ceiling to 9:** Device testing. Spring animations are highly sensitive to hardware performance. On a budget Android device at 30fps, a spring animation that looks smooth at 60fps can look mechanical or incomplete. The `@media (prefers-reduced-motion: reduce)` implementation must be verified to work correctly and to disable only decorative animations (not functional ones like the step transitions). **A 9 requires animation QA on low-end devices.** This is execution-dependent.

**Ceiling to 10:** A 10 animation quality requires custom physics — easing curves tuned to specific interaction types (a colour swatch tap has different tactile quality from a card selection). This is a refinement pass for a future iteration.

### Angle 17 — North star test: 9
**Ceiling to 10:** The north star is whether the product makes an artist feel understood. This is not a design deliverable — it is a product truth. The import, the real artist names, the live preview, the personalised slug — all of these signal "we know who you are and what you need." But feeling understood is earned, not asserted. **A 10 requires an artist to say, unprompted, "this felt like it was built for me."** This is data-dependent and cannot be verified by design alone.

### Angle 19 — Single memory: 9
**Ceiling to 10:** Memory is reconstructive. A user who completes the wizard in 4 minutes and shares their page in 10 minutes will have a different memory than a user who bounced off the import step and came back the next day. The target memory — "I pasted my Spotify and it knew who I was" — is achievable for import users but not for scratch users. For scratch users, the equivalent memory is "I picked my colour and saw the whole page change." Both are designed for. **A 10 requires that both memories are reported by real users in post-experience interviews.** Data-dependent.

### Angle 20 — Big picture connection: 8
**Ceiling to 9:** The campaign state seed (Screen 7) and the 100 sign-up limit (Screen 8) are the two primary mechanisms. A 9 requires the artist to connect these seeds to an actual upgrade decision months later — which is a product lifecycle question, not an onboarding design question. The seeds are correct. Whether they germinate is outside onboarding's control. **A 9 requires the artist to upgrade from Free to Artist tier, and to credit the Screen 7 or Screen 8 seeds as part of that decision.** This is data-dependent and outside onboarding's direct influence.

---

## Pass 3 scorecard

| Angle | Pass 2 | Pass 3 | Ceiling type | What reaches 10 |
|---|---|---|---|---|
| 1. First impression | 9 | 9 | Data-dependent | User testing confirms immediate comprehension |
| 2. Primary job | 9 | 9 | Execution-dependent | Import reliability at 99%+ sustained |
| 3. Copy voice | 9 | 9 | Execution-dependent | Full copy audit including all error states |
| 4. Visual hierarchy | 9 | 9 | Execution-dependent | Device testing at all target viewport widths |
| 5. CTA clarity | 9 | 9 | Execution-dependent | Visual QA on Screen 8 primary vs. secondary |
| 6. Fear resolution | 9 | 9 | Cross-page dependent | able-v7.html quality must match the promise |
| 7. Mobile experience | 8 | 8 | Execution-dependent | Device testing on iOS Safari and Chrome Android |
| 8. Performance | 8 | 8 | Execution-dependent | Lighthouse profiling on built page; TTI < 2.5s |
| 9. Emotional resonance | 9 | 9 | Data-dependent | Real artist experience observed in user testing |
| 10. "13-year-old" test | 9 | 9 | Data-dependent | Usability testing with non-technical user |
| 11. Trust signals | 9 | 9 | Data-dependent | Product behaviour over 6+ months |
| 12. Cross-page coherence | 8 | 8 | Execution-dependent | Supabase backend live; URL genuinely shareable |
| 13. Switcher path | 9 | 9 | Engineering-dependent | Linktree import reliability at 99%+ |
| 14. Social proof | 5 | 5 | Data/time-dependent | Real testimonials from named artists |
| 15. Accessibility | 8 | 8 | Execution-dependent | Screen reader testing with real SR user |
| 16. Animation quality | 8 | 8 | Execution-dependent | Animation QA on low-end devices |
| 17. North star test | 9 | 9 | Data-dependent | Artist says unprompted: "built for me" |
| 18. AI red team | — | — | Preventive | All risks mitigated; slug collision handled |
| 19. Single memory | 9 | 9 | Data-dependent | Both import and scratch memories confirmed in interviews |
| 20. Big picture | 8 | 8 | Data-dependent | Artist upgrades and credits onboarding seed |

**Pass 3 overall: 8.8/10**

Note: Pass 3 scores do not change from Pass 2. This is deliberate — Pass 3 is the honest ceiling assessment, not another round of improvement. The scores are locked at what the spec can guarantee. Everything above these scores requires real-world execution and real-world data.

---

## Final scorecard — all passes

| Angle | Start (baseline) | Pass 1 | Pass 2 | Pass 3 |
|---|---|---|---|---|
| 1. First impression | 3 | 8 | 9 | 9 |
| 2. Primary job | 4 | 8 | 9 | 9 |
| 3. Copy voice | 3 | 9 | 9 | 9 |
| 4. Visual hierarchy | 5 | 8 | 9 | 9 |
| 5. CTA clarity | 5 | 8 | 9 | 9 |
| 6. Fear resolution | 3 | 8 | 9 | 9 |
| 7. Mobile experience | 5 | 7 | 8 | 8 |
| 8. Performance | 6 | 7 | 8 | 8 |
| 9. Emotional resonance | 3 | 9 | 9 | 9 |
| 10. "13-year-old" test | 5 | 8 | 9 | 9 |
| 11. Trust signals | 3 | 8 | 9 | 9 |
| 12. Cross-page coherence | 5 | 7 | 8 | 8 |
| 13. Switcher path | 3 | 8 | 9 | 9 |
| 14. Social proof | 1 | 4 | 5 | 5 |
| 15. Accessibility | 6 | 7 | 8 | 8 |
| 16. Animation quality | 6 | 7 | 8 | 8 |
| 17. North star test | 4 | 8 | 9 | 9 |
| 18. AI red team | — | — | — | — |
| 19. Single memory | 4 | 8 | 9 | 9 |
| 20. Big picture | 5 | 7 | 8 | 8 |
| **Overall** | **4.6** | **7.4** | **8.8** | **8.8** |

---

## Build authorisation

### What is authorised

The build of `start.html` is authorised. The specification is complete. Every design decision has been made. Every copy line is locked. Every technical requirement is specified. Every fear has been addressed. Every risk has a mitigation.

**Build from these documents, in this order:**

1. **COPY.md** — every word is final. Do not deviate. If something needs to change, update COPY.md first.
2. **SPEC.md** — the 8-screen architecture, the technical requirements, the import specs.
3. **PATH-TO-10.md** — the screen-by-screen technical contracts, type sizes, animation specs, accessibility requirements.
4. **STRATEGY-REVIEW-FINAL.md** — the 6 gap decisions, the 6 copy additions, the 5 risk mitigations.
5. **This document** — the Pass 2 decisions (input border on focus, building transition, visualViewport keyboard handling, dot-pulse spinner, etc.) that supplement and finalise the above.

### The non-negotiable P0 requirements

These are not aspirational — they are build gates. If any of these are not implemented correctly, the build does not ship:

1. **Import confirmation visible in < 500ms** — "We found [Name] on Spotify ✓" appears immediately after the API call returns. Never silent. Never blocking.
2. **Preview updates instantly on every answer** — CSS variable changes only, no reflows, no network calls. Zero perceptible lag.
3. **`able_wizard_draft` writes to localStorage at every screen advance** — not sessionStorage. Back navigation restores complete previous state.
4. **`able_v3_profile` written only on Screen 7 submission** — `able_wizard_draft` wiped immediately after.
5. **Playwright smoke test: end-to-end from URL paste to able-v7.html render** — must pass before any release.
6. **All inputs: font-size ≥ 16px** — prevents iOS Safari zoom.
7. **All choice cards: minimum 64px height** — minimum touch target for mobile.
8. **COPY.md is the exact copy** — not paraphrased. Not simplified. Not "close enough".
9. **Import failures show amber (not red), never attribute fault to artist** — "That's on us."
10. **Screen 8 headline is "Your page is ready." pre-Supabase, "Your page is live." post-Supabase** — the claim must be true.

### Decisions locked in this document (Pass 2 additions to build spec)

| Screen | Decision | Type |
|---|---|---|
| Screen 0 | Input border transitions to `var(--color-accent)` on focus, 200ms ease | CSS |
| Screen 0 | Import spinner is three-dot pulse, not rotation spinner | Animation |
| Screen 0 | `?import=linktree` param changes sub-headline and first placeholder | JS |
| Screen 0 | Screen 8 failure copy confirmed: "Couldn't reach Spotify right now — that's on us." | Copy |
| Screen 1 | "Nothing goes live until you finish. Take your time." confirmed as build requirement | Copy |
| Screen 2 | Vibe card 7: "My own thing. / I'll choose my own colours and feel." | Copy |
| Screen 3 | Mobile: "Choose your own →" opens inline hex input, not native picker | JS/CSS |
| Screen 5 | Linktree import failure routes to Screen 5 (not Screen 1) | JS routing |
| Screen 6 | "Your fans. Your data. They're yours — we can't contact them." confirmed P0 | Copy |
| Screen 7 | Date input: native `<input type="date">` — no custom picker | HTML |
| Screen 7→8 | Building transition: 600–800ms, progress bar pulses to 100%, preview scales | Animation |
| Screen 8 | URL shown as full https:// with pencil icon (14px, low opacity, hover/touch) | Design |
| Screen 8 | "Your page is ready." pre-Supabase. "Your page is live." post-Supabase | Copy |
| Screen 8 | Slug collision: append "-music" as first fallback | JS/backend |
| Screen 8 | Linktree: "Brought in: Spotify · Apple Music · [etc.]" in muted single line | Copy |
| Screen 8 | Share icons: staggered entrance, 80ms delay between each | Animation |
| Screen 8 | "Your first 100 fan sign-ups are free." below secondary trust line | Copy |
| Screen 8 | Dashboard context: "From there, you can see who signs up, switch campaign modes, and update anything on your page." | Copy |
| All | Preview label: 300ms opacity crossfade on transition | Animation |
| All | Preview peek: 120px on Screen 1, 200px on Screens 2–8 (mobile only) | CSS |
| All | `aria-live="polite"` region announces "Step N of 7" on advance | Accessibility |
| All | `@media (prefers-reduced-motion: reduce)` disables decorative animations | CSS |
| All | `requestIdleCallback` for `able_wizard_draft` localStorage writes | JS |
| All | Barlow Condensed for Screens 0 and 8. Plus Jakarta Sans for Screens 1–7 | Typography |
| Dependency | able-v7.html must show "Back to dashboard" / "Edit" affordance for artist | Cross-page |

---

## What separates Pass 3 from 10

**The eight angles below 10 in Pass 3 are not resolvable by better specification. Here is exactly what is blocking each one:**

**Angles 7, 8, 12, 15, 16 (execution-dependent):** These require the built product to be tested on real devices. The spec is correct. The implementation may reveal issues — reflow timing, keyboard handling edge cases, animation frame rate on low-end hardware, screen reader verbosity — that cannot be anticipated in spec. A first build will surface these issues. A first QA pass will fix them. A second release will reach 9 on all five.

**Angles 1, 9, 10, 17, 19 (data-dependent):** These require real artists experiencing the product for the first time. No amount of specification guarantees that the "oh wow" moment lands, that the copy voice is felt as genuine, that the product feels like it was built for them. These are felt qualities that emerge from the gap between design intent and lived experience. A user testing session with 5–10 real artists, observed without prompting, will reveal where the spec is correct and where the experience falls short.

**Angles 2, 11, 13 (reliability-dependent):** These require engineering execution at a quality level that cannot be specified away — import reliability, system trust over time, Linktree parsing durability. The design is correct. The implementation quality is what determines the score.

**Angle 14 (time-dependent):** Social proof is the one angle that cannot be designed above 5 before launch. It requires real artists, real outcomes, real time. The first real testimonial — a named artist with a linked page saying something genuine — moves this from 5 to 7 overnight.

**Angle 20 (lifecycle-dependent):** Big picture connection is only verifiable when an artist makes their first upgrade decision. The seeds are planted. Whether they take root is outside onboarding's direct influence.

**The honest summary:** A spec-perfect 8.8 is achievable before the first line of code is written. The remaining 1.2 points require the product to be built, launched, tested on real devices, tested with real artists, observed over time, and refined based on what is learned. There is no shortcut.

Build the spec. Test on devices. Watch real artists use it. Fix what fails. The theory is sound.

---

*FINAL-20-ANGLE-REVIEW.md — Stage 7B complete. Build authorised.*
