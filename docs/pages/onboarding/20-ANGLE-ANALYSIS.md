# Onboarding — 20-Angle Analysis
**File: `start.html` | Date: 2026-03-15**
**Overall score: 4.6/10 → Target: 9/10**

---

## CONTEXT

**Who lands here:** An independent artist who has seen ABLE on Instagram, been recommended by another artist, or clicked through from the landing page. They're cautiously interested. They have an aversion to slow, clunky sign-up flows and have probably abandoned Beacons or Koji's onboarding before.

**Primary fear:** "This is going to take 20 minutes and I'll end up with a shit-looking page."
**Secondary fear:** "They're going to ask for my card before I've seen anything good."

**The job of onboarding:** Remove both fears in the first 10 seconds, then build momentum so they reach a live page.

---

## THE 20 ANGLES

### 1. First impression — 3/10

**What's understood before any reading or interaction?**

Current: A dark form with 3 tabs. Looks like an admin panel. Artist name is visible as a label — "Artist Name" is not a question, it's a database field.

**Path to 10:**
- Screen 0 must show a bold headline + the universal link input — nothing else
- The artist should understand "this is going to pre-fill my page for me" before typing a single letter
- Design must feel like a product, not a form

---

### 2. Primary job — 4/10

**Does the flow deliver on "artist has a live page in 5 minutes"?**

Current: The wizard produces a profile that works, but requires too many decisions upfront. The "name, bio, links" structure feels like filling in a spreadsheet.

**Path to 10:**
- Spotify/Linktree import as the dominant first action collapses most of the work
- One-question-per-screen removes overwhelm
- Live preview turns abstract choices into concrete outcomes that feel real

---

### 3. Copy voice — 3/10

**Does every line sound like ABLE, not generic SaaS?**

Current: "Artist Name", "Choose your genre", "Select theme" — these are field labels. They could be from any SaaS form ever built.

**Path to 10:**
- "What do you go by?" beats "Artist Name" in every way
- "What kind of music do you make?" beats "Genre"
- "How should your page feel?" beats "Choose theme"
- Questions require curiosity and answers. Labels require compliance.

---

### 4. Visual hierarchy — 5/10

**Can a scanner understand it without reading?**

Current: The 3-tab layout has reasonable hierarchy but the step content is dense. Multiple fields per screen compete for attention.

**Path to 10:**
- One question per screen = perfect hierarchy by default (there's only one thing to look at)
- Headline: 52–58px. Input/answer: 54px height. Continue button: 56px. Everything else subordinate.
- Progress bar at top gives spatial orientation without explanation

---

### 5. CTA clarity — 5/10

**Is the action clear? Is the button sized correctly?**

Current: "Continue" exists but is undersized on mobile (40px). The final "Create my page" is correct in intent but the pre-live moment lacks ceremony.

**Path to 10:**
- All Continue buttons: 56px height, full-width on mobile
- Screen 7: "Build my page →" — this is the moment that matters
- Screen 8: "Go to my page →" and "Open my dashboard →" — clear, distinct destinations

---

### 6. Fear resolution — 3/10

**Does this flow reduce or accidentally trigger user fears?**

Current fears triggered:
- "How many steps are there?" — current flow is opaque
- "Do I need a card?" — not addressed until too late
- "Will this look bad?" — no preview means they can't know

**Path to 10:**
- Screen 0: "No card. No catch. Your page is free." — in the hero, above the fold
- Step counter "Step 3 of 7" — they always know where they are
- Live preview — they can see their page taking shape, fear of bad output dissolves

---

### 7. Mobile experience — 5/10

**Does this work at 375px? All tap targets ≥ 48px?**

Current: Mostly works, but two-column layout on desktop becomes cramped stacking on mobile. Vibe grid is 4-column which becomes tight at 375px.

**Path to 10:**
- Vibe grid: 2-column on mobile (7 vibes = 4 rows with 1 full-width)
- Theme grid: 2-column always (as now)
- Continue button: full-width on mobile, 56px height
- Live preview: 200px peek above form at mobile — visible but not intrusive

---

### 8. Performance — 6/10

**Does onboarding add meaningful load time?**

Current: DM Sans + Barlow loaded via Google Fonts (preconnected). No heavy assets. Spotify import would add one async API call.

**Path to 10:**
- Fonts already preloaded — good
- Spotify import: async, doesn't block UI (show spinner in input, not full-page loader)
- Linktree import: same pattern — spinner inline, never blocks
- Preview: CSS-only, zero extra requests

---

### 9. Emotional resonance — 3/10

**Does it make the target artist feel understood?**

Current: The form feels clinical. There's no moment where the artist thinks "they get me."

**Path to 10:**
- Spotify import showing "We found Luna Serrano on Spotify ✓" — this is an "oh wow" moment
- Vibe cards with real artist names (Wet Leg, Four Tet, etc.) — they see their peers
- Live preview updating as they answer — "this is actually MY page"
- Screen 8: "Your page is live." in large type — the payoff is explicit

---

### 10. The "13-year-old" test — 5/10

**Non-technical user: does this confuse them?**

Current: "Vibe" label is understood. "Accent colour" is not obvious to a non-technical artist. "Theme" is vague.

**Path to 10:**
- Colour step: show the phone preview updating — they don't need to know what "accent" means if they can see the button turning that colour
- Theme step: "How should your page feel?" with visual previews — no jargon
- Import step: "We found 6 links on your Linktree ✓" — concrete, human confirmation

---

### 11. Trust signals — 3/10

**Does this screen build or erode trust?**

Current: No trust signals anywhere in onboarding. No "no card" claim. No "your data" assurance. No social proof.

**Path to 10:**
- Screen 0: "No card. No catch. Your page is free." — above CTA
- Screen 5 (fan capture): "Every sign-up is yours. We can't contact your fans." — brief, specific
- Screen 8: "This page costs £0. It will never charge you to exist." — the final reassurance
- No fine print, no cookie banner mid-flow — defer to footer

---

### 12. Cross-page coherence — 5/10

**Does onboarding connect to the landing page and the live profile?**

Current: Landing page implies the page will be beautiful and campaign-aware. Onboarding doesn't deliver on either — no demo of campaign states, no visual match to the landing page aesthetic.

**Path to 10:**
- The live preview in onboarding must look like able-v7.html — same CSS system
- Campaign state question (Screen 7) directly connects to the landing page demo's 4 states
- The "Done" screen must feel continuous with able-v7.html — same design language

---

### 13. The switcher path — 3/10

**Does this serve someone switching from Linktree?**

Current: There is no Linktree importer. A Linktree user lands in the same blank form as everyone else. This is a critical missed opportunity — the switcher is ABLE's primary acquisition target.

**Path to 10:**
- Screen 0 universal input detects `linktr.ee/` URLs specifically
- On Linktree paste: "We found your 6 links ✓ — bringing them in now"
- Screen 5 shows imported links with platform badges, lets them confirm/remove
- The message: "Your Linktree links are already here. Your new page is better."

---

### 14. Social proof — 1/10

**Does this section earn belief?**

Current: Zero social proof in onboarding.

**Path to 10 (short term — before real testimonials exist):**
- Screen 0: "Used by independent artists in London, Manchester, Barcelona, Bogotá" — geographic social proof
- When first 10 artists are live: show a rotating quote from one of them
- Screen 8 (Done): "You're in. [N] artists launched their ABLE page this week."

---

### 15. Accessibility — 6/10

**Works with screen reader? Sufficient contrast?**

Current: Focus rings visible (`:focus-visible` implemented). Labels exist. Some contrast ratios marginal.

**Path to 10:**
- All choice cards need `role="radio"` + `aria-checked` for screen reader navigation
- Progress bar needs `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- Error states need `role="alert"` so screen readers announce them
- All form inputs need `<label>` or `aria-label` — field labels as uppercase text may not associate correctly

---

### 16. Animation quality — 6/10

**Only opacity + transform. Spring feel. Purposeful.**

Current: Directional step transitions exist (slide from right forward, slide from left back) — this is good. Spring easing implemented. But the preview doesn't animate on updates.

**Path to 10:**
- Preview phone: scale(0.98) → scale(1.0) + opacity pulse when any value updates — subtle "it's responding" signal
- Vibe card selection: small bounce on the selected card
- Colour swatch selection: checkmark pops in with spring
- Screen 8 headline: scale-up entrance (0.9 → 1.0) — the payoff deserves ceremony

---

### 17. The north star test — 4/10

**Does this feel like ABLE, not "a tool"?**

Current: It feels like a form. A competent, well-designed form, but a form.

**Path to 10:**
- The import moment is the north star: one URL in, page half-built, artist name pre-filled. That's ABLE.
- One question per screen is the physical embodiment of "we know what we need, we're not wasting your time."
- Vibe cards with real artist names says: "we know your world."
- Screen 8 live page slug says: "we already made you a real thing."

---

### 18. AI red team — what would kill this?

**P0 kills:**
1. Spotify import fails / Linktree scrape blocked — artist pastes URL, nothing happens, no feedback. They assume ABLE is broken.
   → Fix: always show clear feedback ("trying to import...") and a graceful fallback ("couldn't reach Linktree — add links manually?")

2. Live preview breaks after theme/colour choice — preview shows blank or error state
   → Fix: preview always shows a valid state even with incomplete data (empty-state copy in the preview)

3. Session not preserved on accidental back-navigation (browser back button)
   → Fix: sessionStorage preserves all answers; browser back restores to previous wizard screen, not the landing page

**P1 kills:**
4. Mobile keyboard covers the input field — iOS issue where keyboard pushes viewport
   → Fix: `window.scrollTo(0, 0)` on focus + `padding-bottom` when keyboard detected

5. Colour picker opens native OS picker on mobile which is tiny and hard to use
   → Fix: custom 8-swatch grid is the primary picker; custom hex input as fallback; native color input is hidden but triggered by the custom option

---

### 19. The single memory — 4/10

**If they close the tab after screen 3, what sticks?**

Current: "I started setting up a music page. It was a dark form."

**Path to 10:**
- The single memory should be: "I pasted my Spotify and it knew who I was."
- Or, for artists without Spotify: "I picked my colour and saw my page update instantly."
- The live preview + import is the memory. Everything else is plumbing.

---

### 20. Big picture connection — 5/10

**Does onboarding serve the 12-month MRR goal?**

Current: Onboarding ends and the artist has a profile. They don't know about campaign states, fan capture, or broadcasts — the features that drive upgrade.

**Path to 10:**
- Screen 7 (campaign state) plants the seed: "Oh — my page can switch modes?"
- Screen 8 (Done): "Your page is live. When you're ready to release something, you can put it in pre-release mode from your dashboard." — one line, no pressure
- The free tier ceiling (100 fan sign-ups) should be mentioned at the Done screen: "Your first 100 fan sign-ups are free. After that, £9/month for unlimited."
- This is honest, specific, and doesn't feel like a trick

---

## SUMMARY SCORECARD

| Angle | Score | Priority |
|---|---|---|
| 1. First impression | 3 | P0 |
| 2. Primary job | 4 | P0 |
| 3. Copy voice | 3 | P0 |
| 4. Visual hierarchy | 5 | P1 |
| 5. CTA clarity | 5 | P1 |
| 6. Fear resolution | 3 | P0 |
| 7. Mobile experience | 5 | P1 |
| 8. Performance | 6 | P2 |
| 9. Emotional resonance | 3 | P0 |
| 10. "13-year-old" test | 5 | P1 |
| 11. Trust signals | 3 | P0 |
| 12. Cross-page coherence | 5 | P1 |
| 13. Switcher path | 3 | P0 |
| 14. Social proof | 1 | P2 |
| 15. Accessibility | 6 | P2 |
| 16. Animation quality | 6 | P2 |
| 17. North star test | 4 | P1 |
| 18. AI red team | — | P0 (preventive) |
| 19. Single memory | 4 | P1 |
| 20. Big picture | 5 | P2 |

**Overall: 4.6/10**

---

## TOP 5 CHANGES (ordered by impact)

1. **Universal link input on Screen 0 with Spotify + Linktree import** — this is the entire conversion argument. One URL in, page half-built. Without this, onboarding is just another form.

2. **Live preview updating per-keystroke** — makes every answer feel real. The artist isn't filling in a form; they're watching their page build.

3. **One question per screen** — eliminates overwhelm, makes progress feel fast, mobile-native.

4. **Copy rewrite: questions not labels** — "What do you go by?" vs "Artist Name". This takes 2 hours and changes the entire tone.

5. **Trust signals on Screen 0 and Done screen** — "No card. No catch." on entry, "This page costs £0. It will never charge you to exist." on exit. Simple, specific, credible.
