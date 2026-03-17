---
title: "Onboarding Wizard — Strategy Review Final"
date: 2026-03-15
stage: 7A
file: start.html
purpose: Synthesise all prior work + research findings. Inform the final 20-angle review.
---

# Onboarding Wizard — Strategy Review Final

**Stage 7A. Pre-design synthesis.**

This document synthesises all prior work (Stages 1–6A) against the research findings. It makes strategic decisions on the 6 identified gaps, flags any risks not yet addressed, identifies copy additions needed, and produces the first revised angle scorecard with research incorporated.

The current design proposal (SPEC.md + PATH-TO-10.md) is already significantly better than the baseline. This review's job is to stress-test it against research data before the design spec (6B) locks everything in.

---

## 1. What the research confirms, changes, and adds new

### What research confirms (no change needed)

**One-question-per-screen is the right call.** The 72% abandon rate for "too many steps" is about cognitive load per screen, not screen count alone. The current 8-screen OQPS design is specifically engineered to defeat this. Each screen is a single choice, typically 5–20 seconds. This is confirmed by the Appcues data: the 30% step reduction / 50% completion uplift is about perceived effort, not absolute count. An 8-screen OQPS wizard feels shorter than a 3-screen multi-question form. The current architecture is correct.

**The import pre-fill is the single most important conversion mechanism.** The Intercom finding — personalised flows deliver 65% higher completion — is exactly what the Spotify/Linktree import delivers. The moment `We found Declan Forde on Spotify ✓` appears, the personalisation effect activates. The research validates the existing P0 prioritisation of import reliability.

**Skippable steps are beneficial, but ABLE has addressed this correctly.** UserIQ's 25% completion lift from skippable steps does not mean every step should be skippable. ABLE's design already handles this: the "Something else — I'll set it myself" vibe option, the manual-entry fallback, and the "No links yet — that's fine" copy on Screen 5 all provide psychological exits without actual skip buttons.

**Quick wins early in the flow drive retention.** The 80% better retention figure for early quick wins is validated by the import moment on Screen 0. This is the earliest possible win — before any question is answered, the product has already done something for them. No competitor does this.

**First-person CTAs outperform second-person by ~90%.** COPY.md already uses this correctly throughout: "Build my page →", "Go to my page →", "Open my dashboard →". This is confirmed and does not need to change.

**The live preview is correctly scoped as P0.** Research and all three user journeys point to the preview as the mechanism that sustains momentum through screens 2–7. The architecture is right. The implementation must be tight.

---

### What research changes (adjustments required)

**Progress visibility must be elevated from P1 to P0.** The 40% completion lift from visible step counters is too large to treat as a secondary concern. The current spec includes "Step N of 7" eyebrows and a 2px progress bar — this is correct, but the spec does not explicitly call out the progress bar as P0. It should be. An artist must always be able to answer "how much of this is left?" without reading anything.

**Data ownership needs to appear earlier.** The research-identified artist psychology — "platforms own my fan list" — is a live fear for the artist arriving at onboarding. Currently the data ownership trust signal appears on Screen 8 (Done). The research suggests this fear needs to be addressed at the point it first activates: Screen 0 (Hook) and Screen 6 (fan capture). This is a copy addition, not an architecture change.

**The "looking foolish publicly" fear is not fully addressed.** Research identified this as one of the top psychological blockers: an incomplete or half-done profile is experienced as worse than no profile at all. The current design does not have an explicit mechanism for preventing an artist from going live before they feel ready. This needs a decision.

---

### What research adds (new information not in prior stages)

**The 72% abandon boundary is not primarily about step count — it's about activation rate at step 1.** If Screen 0 (import/hook) succeeds, the artist is already committed. The most critical abandon window is Screen 0 → Screen 1. Once an artist has seen "We found [Name] on Spotify ✓", their likelihood of completing rises dramatically. This reinforces the existing P0 priority on import reliability but adds a new framing: everything before the first import feedback is the true abandonment battleground.

**Industry fragmentation vertigo — "is this the right tool for my music type?"** — is not fully addressed. The vibe cards with real artist names help, but the research suggests artists from genres that feel niche (e.g. South Asian diaspora music, Afrobeats, ambient drone) may not see themselves in the current 7-vibe lineup. The "Something else — I'll set it myself" option is the correct escape, but it needs to be presented without stigma. Currently it is the last item with the most self-deprecating framing ("I'll set it myself"). Small fix.

**Technical burden anxiety.** Research confirms that artists fear onboarding will expose a skill gap. This shows up most acutely at the import step — if the URL doesn't work, they blame themselves before they blame the product. The current fallback copy ("Couldn't reach Spotify right now. Enter your name below and we'll carry on.") is correct in not attributing fault to the artist, but it could be more explicit: "That's on us, not you."

---

## 2. Strategic decisions on the 6 identified gaps

---

### Gap 1 — Import confirmation: add a dedicated confirmation step, or is ✓ + pre-fill sufficient?

**Decision: No separate confirmation screen. The ✓ confirmation + pre-filled Screen 1 is sufficient. But add one enhancement.**

Reasoning: A separate confirmation screen ("We found Declan Forde — is that right?") adds a step for the 80% of cases where the import is correct. It introduces friction where there should be flow. The pre-filled Screen 1 already functions as the confirmation — the artist sees their name, recognises it, and presses Enter. This is implicitly confirming the import without a dedicated confirmation modal.

The one enhancement: on Screen 1, when the name field is pre-filled from import, the micro-copy reads "From your Spotify profile — edit if needed." This is already in COPY.md. It is sufficient. The ✓ on Screen 0 is the visual confirmation. The pre-fill is the functional confirmation. Screen 1's micro-copy is the explicit confirmation. Three layers are enough.

What would make this fail: if the import pulls a wrong name (Spotify stage name vs. legal name mismatch) and the artist doesn't notice because the auto-focus is on the Continue button. Fix: don't auto-focus Continue when the field is pre-filled. Auto-focus the input itself, with the cursor at the end. This makes the artist look at the value before advancing.

**Action: Update SPEC.md — on Screen 1 with pre-fill, auto-focus the input (not Continue button). No new confirmation screen.**

---

### Gap 2 — Data ownership early: Screen 0 or Screen 6?

**Decision: Both. Screen 0 and Screen 6. Different messages, different framing.**

Reasoning: The trust line on Screen 0 already reads "No card. No catch. Your page is free." This addresses the transaction fear but not the data ownership fear. These are different anxieties. The data ownership fear ("who owns my fans' email addresses?") is not front-of-mind when landing on Screen 0. It activates at Screen 6, when the artist is explicitly choosing a fan capture CTA and thinking "wait — where do these sign-ups go? Who can reach these people?"

The right placement:
- Screen 0: keep "No card. No catch. Your page is free." — this addresses the transaction fear appropriately at first contact.
- Screen 6 (fan capture): add a new trust line directly below the choice cards. This is the moment the data question activates, so this is where to answer it.

Screen 6 addition (new copy): `Your fans. Your data. They're yours — we can't contact them.` — 12px, muted, below the choice cards. Direct, specific, not a legalese disclaimer.

This does not require moving anything from Screen 0. It's an addition to Screen 6 only.

**Action: Add data ownership copy to Screen 6. Do not add it to Screen 0 (too early, wrong fear).**

---

### Gap 3 — Save & come back later: add to screens 1–7?

**Decision: Add session recovery, not a "save and quit" button. The distinction matters.**

Reasoning: A "Save & finish later" button on every screen signals that abandonment is expected. This is the wrong message. The entire design is built around the opposite belief: this will be fast, you won't need to stop. Adding an exit button undermines that.

What the research actually demands is not a visible exit button but a robust session recovery mechanism. The SPEC.md already specifies this: each completed screen writes to `sessionStorage`, and the copy doc already includes a session recovery line: "Picking up where you left off." — shown at the top of the screen they were on when they returned.

The addition needed is not a button but a behavioural guarantee: if the artist closes the tab mid-wizard, returns within 24 hours (same browser/device), and the sessionStorage is intact, they land back on the correct screen with their answers preserved, and see "Picking up where you left off." at the top.

The "looking foolish publicly" fear is addressed by the sessionStorage design: the profile is only written to localStorage on Screen 7 submission. Until then, nothing is live. The artist cannot accidentally publish an incomplete profile.

One copy addition is needed: on Screen 1 (or Screen 0 scratch flow), add 12px sub-text:
`Nothing goes live until you finish. Take your time.` — this directly addresses the "looking foolish" fear without adding an exit mechanism.

**Action: Do not add a "Save & finish later" button. Add "Nothing goes live until you finish. Take your time." on Screen 1. Ensure sessionStorage recovery is explicitly specced as P0.**

---

### Gap 4 — 8 screens: reduce to 6, merge steps, or keep 8 with compensating speed?

**Decision: Keep 8 screens. Compensate with extreme per-screen speed, not structural reduction.**

Reasoning: The 72% abandon rate for "too many steps" is a measure of perceived effort, not absolute screen count. Two things counteract it in the current design:

1. The import pre-fill on Screen 0 means Screens 1 and 2 are confirmation screens, not effort screens. A pre-filled name screen takes 3 seconds. A pre-selected vibe takes 5 seconds. These aren't real steps in the psychological sense — they're moments of pleasure ("it already knows").

2. The progress bar + "Step N of 7" counter gives full transparency. The research finding — 40% completion lift from progress visibility — means that an artist who can see they're on Step 4 of 7 feels closer to done than one in the middle of an opaque form. Transparency converts.

Merging vibe + colour (the obvious reduction path) would be a mistake. Each screen's live preview update is a micro-reward. Showing two questions on one screen halves the number of "I can see it updating" moments. The preview's retention power comes from frequency of updates, not density of questions.

If the 5-minute promise needs defending: the measured time (USER-JOURNEYS.md) is 2–3 minutes with import, 3–4 from scratch. Both are under 5. The promise holds at 8 screens.

Risk to monitor: if real-world completion data shows drop-offs at screens 5–6 (the Links and Fan CTA screens), that's where to look for a merge. But until there is data, do not pre-optimise by removing screens that have clear distinct value.

**Action: Keep 8 screens. No merge. Ensure per-screen speed is P0 implementation requirement.**

---

### Gap 5 — Quick win via preview: is the live preview sufficient, or show a full rendered profile on Screen 2?

**Decision: Live preview is sufficient. Full rendered profile on Screen 2 would be premature and counterproductive.**

Reasoning: A "full rendered profile preview" on Screen 2 (before the artist has chosen colour, theme, links, or CTA) would show a half-built page with placeholder data. This creates the opposite of a quick win — it shows incompleteness, not progress. The artist would see their name on a generic dark page with a default accent colour and no real content. That doesn't build excitement; it shows them how much is missing.

The live preview works because it is correctly scoped: it shows the elements that have been configured, not the final page. Each screen's answer makes the preview incrementally more theirs. The emotional arc is: "it's starting to look like me" → "that colour is right" → "that's exactly what my fans will see."

The quick win moment is not visual completeness. It is the import confirmation on Screen 0. That is already the highest-leverage moment. The preview's job from Screen 1 onward is to maintain momentum, not to deliver the initial win.

One enhancement: by Screen 4 (Theme), the preview should show enough — name, genre, accent, theme, fan CTA placeholder — that it genuinely looks like an artist's page in early form. The preview architecture must ensure these elements are layered in accurately, not all-or-nothing.

**Action: No change to preview architecture. Confirm in 6B design spec that preview accumulates all configured values (name, vibe, colour, theme, CTA text) and shows them in combination from Screen 3 onward.**

---

### Gap 6 — Dashboard preview post-done: mock of dashboard on Screen 8, or just a link?

**Decision: Link only, but with a single contextual line about what the dashboard does. No mock.**

Reasoning: A mock of the dashboard on Screen 8 is a distraction from the primary payoff — "Your page is live." The artist has just finished building something. Their attention is on their new page, not on an admin panel they've never used. A dashboard preview competes with the celebration moment.

What the research actually flags is not that artists need to see the dashboard — it's that they feel anxiety about what happens next. The unknown is the problem, not the absence of a preview. The fix is a single line of copy, not a visual mock.

After the secondary CTA ("Open my dashboard →"), add a 12px muted line:
`From there, you can see who signs up, switch campaign modes, and update anything on your page.`

This answers the "what does the dashboard do?" question in one sentence without pulling attention away from the page-live moment. It is specific (three concrete things they can do) and reassuring (they have control) without being a product tour.

The campaign state mention ("switch campaign modes") also plants the upgrade seed identified in the original 20-angle analysis — angle 20 (big picture connection) — by making the artist aware that the page is not static.

**Action: Add one contextual line after "Open my dashboard →" on Screen 8. No visual mock.**

---

## 3. New strategic risks

The following risks were not flagged in the original 20-angle analysis and require attention before design spec locks.

---

### Risk 1 — The "industry fragmentation vertigo" edge case in vibe selection

The 7 vibe cards cover mainstream Western genres well. The research-identified fear ("is this the right tool for my music type?") could be triggered by artists in underrepresented genres who look at the vibe grid and don't see themselves clearly. This isn't about adding more genres — adding more cards increases cognitive load. The fix is the framing of "Something else — I'll set it myself." Currently it reads as a form residue ("Other"). It should read as an empowerment option.

Suggested copy change:
- Current: "Something else / I'll set it myself"
- Revised: "My own thing / I'll choose my own colours and feel"

This reframes "I didn't fit your categories" as "I prefer to define my own aesthetic" — which is more accurate to how artists in those genres actually think. It removes the stigma of being last in the list.

This is a minor copy change but addresses a real psychological barrier for a meaningful audience segment.

---

### Risk 2 — Import reliability as a single point of failure

The USER-JOURNEYS.md analysis already flags this, but the research quantifies it more starkly: a silent import failure at Screen 0 is responsible for a 40–60% completion drop. The current fallback copy is good (amber, not red, never artist's fault) but the contingency path needs to be explicit in the spec.

The risk is not just API failure — it's:
- Rate limiting (Spotify Client Credentials tokens have rate limits)
- Linktree actively blocking scrapers (they do this)
- Network timeouts on slow connections
- URL pasted with trailing characters or query params that break parsing

Each of these is a distinct failure mode. The 10-second timeout fallback ("That's taking too long. Carry on without the import →") addresses timeouts, but rate limiting and scraper blocking need their own graceful paths. The Netlify function spec should explicitly handle all four failure modes.

This is a build risk, not a design risk. It must be specced in the 6B technical design document.

---

### Risk 3 — The "session not preserved" mobile scenario

Browser tab management on iOS Safari means tabs can be discarded when the device is low on memory or the tab has been in the background for more than a few minutes. This makes sessionStorage unreliable for the recovery mechanism if the artist switches apps to check something (e.g. goes to Spotify to look up their URL, comes back).

The SPEC.md currently specifies sessionStorage for mid-wizard data. This is correct for preventing profile pollution (don't write to localStorage until Screen 7 is submitted), but sessionStorage is lost on iOS tab discard.

Solution: write wizard progress to localStorage under a separate key (`able_wizard_draft`) at each screen, and on completion write to `able_v3_profile` and delete `able_wizard_draft`. On Screen 0 load, check for `able_wizard_draft` and resume if found.

This is not a new screen — it's an implementation decision. The "Picking up where you left off." copy already handles the UX. The underlying storage needs to be localStorage, not sessionStorage.

---

### Risk 4 — The "Your page is live" claim needs to be true

Screen 8 says "Your page is live." If able-v7.html does not correctly read and render the localStorage profile, this claim is false at the moment of making it. The "Go to my page →" CTA must resolve to a real, correctly-rendered page. If there is any rendering gap, the artist sees a blank or broken page immediately after the highest-trust moment of the entire flow.

This is a testing requirement: Playwright smoke tests after every onboarding change must include a full end-to-end flow (paste URL → Screen 8 → click "Go to my page →" → verify able-v7.html renders with correct name, colour, theme, CTA). This should be a blocking test before any onboarding release.

---

### Risk 5 — Technical burden anxiety at the import step

Research identified that artists fear exposing a skill gap. If the import input looks too technical (placeholder cycles `open.spotify.com/artist/...` — not the URL format most artists have memorised), some artists will assume they're doing it wrong even before any error occurs.

The placeholder cycling is correct in principle but may need a fourth cycle:
- Current: linktr.ee/yourname → open.spotify.com/artist/... → soundcloud.com/yourname
- Addition: "Paste any link to your music or socials"

A plain-language cycle anchors the interaction as paste-any-link, not paste-the-exact-right-URL-format. Artists do not always know the difference between their Spotify artist URL and their Spotify profile URL. The "any link" option removes that anxiety.

---

## 4. Copy additions needed from research

The following copy lines are new — not currently in COPY.md. Each has a clear placement and purpose.

---

### Addition 1 — Screen 6 (Fan Capture): Data ownership trust signal

**Placement:** 12px, muted, directly below the four choice cards, above the Continue button.

**Copy:**
```
Your fans. Your data. They're yours — we can't contact them.
```

**Purpose:** Addresses the data ownership anxiety identified in the research at the precise moment it activates (when the artist is explicitly setting up fan capture). Specific claim, not a platitude.

---

### Addition 2 — Screen 1 (Name): "Nothing is live yet" reassurance

**Placement:** 12px, muted, below the name input (distinct from the "From your Spotify profile" micro-copy, which only shows when pre-filled).

**Copy:**
```
Nothing goes live until you finish. Take your time.
```

**Purpose:** Addresses the "looking foolish publicly" fear. Makes explicit that incomplete profiles cannot be seen by fans. Should show for all users (import and scratch), replacing or sitting alongside the "From your Spotify profile — edit if needed" line.

Note on implementation: these two lines serve different purposes. If the field is pre-filled, show both — the Spotify attribution line above the input, the "nothing is live" reassurance below. If not pre-filled, show only the "nothing is live" line.

---

### Addition 3 — Screen 8 (Done): Dashboard contextual line

**Placement:** 12px, muted, directly below the "Open my dashboard →" CTA.

**Copy:**
```
From there, you can see who signs up, switch campaign modes, and update anything on your page.
```

**Purpose:** Addresses post-done anxiety ("what happens next?") without a visual mock. Makes the dashboard feel like a place with specific, legible value. Plants the campaign state seed (angle 20 — big picture connection).

---

### Addition 4 — Screen 0 (Hook): Linktree/import placeholder addition

**Placement:** Fourth cycle in the rotating input placeholder.

**Copy:**
```
Paste any link to your music or socials
```

**Purpose:** Addresses technical burden anxiety (Risk 5 above). Anchors the interaction as "any link", not "the exact URL format". Should appear as the first cycle, before the specific examples, to set the frame:
- Cycle 0: "Paste any link to your music or socials" (new — sets frame)
- Cycle 1: "linktr.ee/yourname"
- Cycle 2: "open.spotify.com/artist/..."
- Cycle 3: "soundcloud.com/yourname"

---

### Addition 5 — Screen 2 (Vibe): "Something else" card revised copy

**Placement:** The last vibe card, replacing existing copy.

**Old copy:**
```
Something else
I'll set it myself
```

**New copy:**
```
My own thing.
I'll choose my own colours and feel.
```

**Purpose:** Reframes the catch-all from "I didn't fit" to "I prefer to define my own aesthetic" — addresses the industry fragmentation vertigo for artists in underrepresented genres. The period after "My own thing." matches the voice of the Screen 7 choices ("Just me, being an artist.").

---

### Addition 6 — Spotify import failure: attribution of fault

**Placement:** Amber fallback state on Screen 0, replacing or augmenting the existing copy.

**Existing copy:**
```
Couldn't reach Spotify right now. Enter your name below and we'll carry on.
```

**Revised copy:**
```
Couldn't reach Spotify right now — that's on us.
Enter your name below and we'll carry on.
```

**Purpose:** Makes the fault attribution explicit. Research confirms artists fear exposing skill gaps. "That's on us" removes any ambiguity about whether they did something wrong. One additional phrase, zero structural change.

---

## 5. Updated scorecard — Pass 1 (Research incorporated)

This scorecard shows each angle's original score and its new score after applying:
- The 6 gap decisions above
- The copy additions from section 4
- The strategic risk responses from section 3

"New score" reflects the design as it will be specced in 6B, not as it currently exists in start.html.

| Angle | Original | New | What changed |
|---|---|---|---|
| 1. First impression | 3 | 8 | Screen 0 redesign (import input, headline, trust line, placeholder cycling) confirmed in spec. Import-first architecture delivers the "this is going to pre-fill my page" understanding without any reading. |
| 2. Primary job | 4 | 8 | 8-screen OQPS confirmed. Import reduces effort to ~2–3 mins. "Your page is live" delivers. One-question-per-screen is right. Ceiling is 8 not 10 because import can still fail. |
| 3. Copy voice | 3 | 9 | COPY.md is excellent throughout. Questions not labels, first-person CTAs, no SaaS filler. Additions from section 4 improve Screen 6, 8, and vibe card. No regressions possible if build follows COPY.md. |
| 4. Visual hierarchy | 5 | 8 | One-question-per-screen guarantees hierarchy. Progress bar + eyebrow eyebrow confirmed P0. Design spec (6B) must specify type sizes explicitly. Ceiling: 8 until 6B renders are validated. |
| 5. CTA clarity | 5 | 8 | 56px minimum confirmed, full-width on mobile, specific copy per screen. "Build my page →" on Screen 7 is correct. Screen-by-screen CTA copy all specced in COPY.md. |
| 6. Fear resolution | 3 | 8 | Data ownership on Screen 6 (Addition 1) added. "Nothing goes live until you finish" on Screen 1 (Addition 2) added. "No card. No catch." on Screen 0 confirmed. Three fears addressed (transaction, data, incompleteness). |
| 7. Mobile experience | 5 | 7 | 2-column vibe grid, 200px preview peek, 64px tap targets, ≥16px inputs all specced. Remains 7 because mobile hasn't been built/tested yet. |
| 8. Performance | 6 | 7 | Fonts preloaded. Import async with spinner. Preview CSS-only. No new performance regressions introduced. +1 for confirming preview is CSS variables only (zero extra requests). |
| 9. Emotional resonance | 3 | 9 | Import confirmation is the "oh wow" moment. Vibe cards with real artist names are the "they know my world" moment. Preview updating is the "this is actually mine" moment. "Your page is live." is the payoff. All four emotional beats are specced. |
| 10. "13-year-old" test | 5 | 8 | Colour preview shows what accent means without explaining it. Theme cards have plain descriptions. Import flow requires only a paste. Addition 4 (plain-language placeholder) removes the URL-format anxiety. "Something else" renamed removes the "last item stigma." |
| 11. Trust signals | 3 | 8 | "No card. No catch." on Screen 0. Data ownership ("Your fans. Your data.") on Screen 6 (new). "This page costs £0." on Screen 8. "Nothing goes live until you finish." on Screen 1 (new). Four trust signals, correctly placed. |
| 12. Cross-page coherence | 5 | 7 | Preview shares CSS system with able-v7.html — confirmed in spec. Campaign state question (Screen 7) connects to the 4 landing page states. Ceiling: 7 until design spec (6B) confirms shared visual system renders correctly. |
| 13. Switcher path | 3 | 8 | Linktree import confirmed, link confirmation on Screen 5 confirmed, "Your Linktree link still works" reassurance confirmed, done screen personalisation confirmed. Strong switcher path. Import reliability (Risk 2) is the remaining ceiling. |
| 14. Social proof | 1 | 4 | Pre-live: no real testimonials available yet. Addition of "Used by independent artists in London, Manchester, Barcelona, Bogotá" on Screen 0 remains in spec. Realistic ceiling is 4 pre-launch and 7 post-launch with real quotes. Do not manufacture proof. |
| 15. Accessibility | 6 | 7 | ARIA roles for vibe cards, progress bar ARIA attributes, role="alert" for errors all specced in PATH-TO-10.md. +1 for explicit speccing. Ceiling: 7 until tested with screen reader. |
| 16. Animation quality | 6 | 7 | Spring easing confirmed. Directional step transitions confirmed. Preview pulse on update confirmed. Screen 8 entrance confirmed. +1 for four animation moments being explicitly specced. |
| 17. North star test | 4 | 8 | The import moment, the live preview, the OQPS structure, the vibe cards with real artists, the "Your page is live." payoff — all of these together make this feel like ABLE, not a form. The gap between 8 and 10 is real-world execution. |
| 18. AI red team | — | — | New risks added (Risk 2–5). Import failure modes, iOS sessionStorage loss, "Your page is live" truth claim, technical burden anxiety all flagged. These are build requirements, not design scores. |
| 19. Single memory | 4 | 8 | "I pasted my Spotify and it knew who I was." or "I picked my colour and saw my page change instantly." Both are available in the current spec. The memory is the import + preview, and both are P0. |
| 20. Big picture connection | 5 | 7 | Campaign state screen plants the seed. Addition 3 (dashboard contextual line) answers "what next" without a sales pitch. Free tier ceiling mentioned on Done screen. Upgrade path suggested, not pushed. |

**Pass 1 overall score: 7.4/10**

Up from 4.6/10. The theoretical score once the spec is fully implemented.

---

## 6. What separates the current state from 10

The following is an honest assessment of the ceiling — what prevents a 10 even with perfect execution of the current spec.

---

**Social proof ceiling (Angle 14: capped at 4 pre-launch, 7 post-launch)**

No real testimonials exist. Geographic social proof ("Used by artists in London, Manchester...") is better than nothing but is not specific or credible in the way a real artist quote is. A single genuine quote — "I switched from Linktree in 4 minutes and my page looked better immediately." — would do more than any copy rewrite. This ceiling lifts only with time.

**Import reliability (structural risk, not design gap)**

The import-first architecture makes the entire flow dependent on the Spotify API and Linktree parsing working reliably. No design decision can fully mitigate an API failure. The fallback paths are excellent, but they are not the same experience. A 90% reliable import is different from a 99% reliable import in terms of how many artists feel the "oh wow" moment. This is an engineering constraint.

**Mobile visual quality (Angles 7, 12: ceiling until 6B design spec and build)**

The mobile experience specification is complete but unrendered. It is not possible to score a 9 on mobile experience based on a spec alone. The ceiling on mobile-related angles lifts only when the actual build is in front of a device. The 7 scores on Angles 7 and 12 reflect "the spec is correct and complete" but cannot confirm the execution.

**First-time-live artist anxiety (unresolvable by onboarding alone)**

Research identified the "looking foolish publicly" fear. The spec addresses it with "Nothing goes live until you finish." and by gating the localStorage write until Screen 7. But the underlying anxiety — "what if my page looks bad?" — cannot be fully resolved by onboarding. The only real resolution is a page that reliably looks good. Angle 9 (emotional resonance) is capped at 9 rather than 10 because the payoff of "Your page is live" is only as good as the page the artist sees when they click "Go to my page →." The able-v7.html quality is outside onboarding's control.

**The "my genre isn't here" edge case**

The "My own thing." vibe card helps but does not fully resolve for artists who need genre-specific visual cues. The fix — adding more vibe cards — creates its own cognitive load problem. This is a genuine tension in the design, and there is no perfect resolution at the current level of product maturity.

---

## Summary

The research confirms the core architecture is correct. One-question-per-screen, import-first, live preview, COPY.md voice — all validated.

Six specific changes result from this review:
1. No separate import confirmation screen. Auto-focus input (not Continue) when pre-filled.
2. Data ownership trust copy added to Screen 6, not Screen 0.
3. No "Save & finish later" button. "Nothing goes live until you finish." on Screen 1. Draft stored in localStorage (not sessionStorage) under `able_wizard_draft`.
4. Keep 8 screens. No merge. Compensate with per-screen speed.
5. Live preview sufficient. Accumulate all configured values from Screen 3. No full rendered profile preview.
6. Link to dashboard only, with one contextual line about what it does. No mock.

Six copy additions (all new, none conflicting with existing COPY.md):
1. Screen 6 data ownership: "Your fans. Your data. They're yours — we can't contact them."
2. Screen 1 incompleteness reassurance: "Nothing goes live until you finish. Take your time."
3. Screen 8 dashboard context: "From there, you can see who signs up, switch campaign modes, and update anything on your page."
4. Screen 0 plain-language placeholder cycle: "Paste any link to your music or socials" (new first cycle)
5. Screen 2 vibe card: "My own thing. / I'll choose my own colours and feel."
6. Screen 0 import failure: "Couldn't reach Spotify right now — that's on us."

Five strategic risks to address in 6B (design + technical spec):
- Import failure modes (rate limiting, scraper blocking, timeout, bad URL parsing)
- iOS sessionStorage loss → localStorage `able_wizard_draft` solution
- "Your page is live" truth claim → end-to-end Playwright smoke test as blocking requirement
- Technical burden anxiety at import step → plain-language placeholder
- Industry fragmentation vertigo → "My own thing." vibe card rename

Pass 1 score: 7.4/10. Ceiling to 10 requires real social proof, import reliability at 99%+, and mobile build execution.

The theory is sound. Build Stage 6B.
