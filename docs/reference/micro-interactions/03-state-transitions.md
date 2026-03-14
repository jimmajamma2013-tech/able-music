# 03 — State Transitions (31–45)

State transitions are the most semantically important micro-interactions in ABLE. They carry meaning: the page is different now because something real has changed in the artist's world. Every transition should communicate that shift clearly, not just look pretty.

---

## 31. Tab Switch Sliding Indicator
**Verdict: [BUILD] — already the right approach, needs implementation verification**

**What it is:** The active state indicator under the tab bar (a dot, line, or accent fill) doesn't jump to the new tab on selection. It slides there — a physical object moving from one position to another.

**Trigger → Rule → Feedback:**
- Trigger: tab item `click`
- Rule: calculate new indicator position using `getBoundingClientRect()`, interpolate with spring easing
- Feedback: the dot/line travels across the bar, arrives under the new tab with a slight bounce

**Implementation:**
```js
function moveIndicator(newTab) {
  const rect = newTab.getBoundingClientRect();
  const barRect = tabBar.getBoundingClientRect();
  const targetLeft = rect.left - barRect.left + rect.width / 2;
  indicator.style.transition = `left 350ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
  indicator.style.left = `${targetLeft}px`;
}
```

**ABLE thoughts:** This is documented in DESIGN_RESEARCH_2026 (Pattern #10) as a named pattern to implement. The sliding indicator is the clearest signal that tab selection has happened — not the icon colour change (which is subtle), not the content switch (which takes 200ms to animate). The dot is immediate and physical. One technical note: use `left` (not `transform: translateX`) only if the indicator is `position: absolute` within the bar. If using `transform`, calculate the relative offset from the indicator's current position. The spring overshoot makes it feel like the dot has momentum, which it conceptually does — it was "thrown" from the previous position.

---

## 32. Campaign State Morphing — Hero Crossfade
**Verdict: [BUILD] — the most important transition in ABLE**

**What it is:** When the artist's campaign state changes (profile → pre-release → live → gig), the hero section doesn't snap to the new state. It crossfades: old content fades to 0 while new content fades in, over 300ms. The background glow colour transitions simultaneously.

**Trigger → Rule → Feedback:**
- Trigger: `stateOverride` change in localStorage, or page load with a different state
- Rule: current hero content fades out (`opacity: 0, transition: 300ms`), new content fades in (`opacity: 0 → 1, transition: 300ms`)
- Feedback: the hero feels like it's breathing between states — not switching like a slide projector

**Implementation:**
```js
function transitionState(newState) {
  heroContent.style.opacity = '0';
  setTimeout(() => {
    applyState(newState);
    heroContent.style.opacity = '1';
  }, 300);
}
```

**ABLE thoughts:** Jakob Nielsen's heuristic (DESIGN_RESEARCH_2026, #36): system status changes must be immediate and unmistakable. The crossfade achieves both: it's immediate (starts instantly) and unmistakable (the visual change is significant). The ambient glow should also interpolate: pre-release's warm amber glow should blend into live state's brighter, more urgent red-orange. This requires transitioning the `--color-ambient` CSS variable, which can be done with a JavaScript tween since CSS transitions on custom properties require `@property` registration. Worth the complexity: the glow is the "atmospheric" layer that fans absorb subconsciously.

---

## 33. Theme Transition — Smooth Colour Interpolation
**Verdict: [BUILD] — already partially implemented, improve the transition**

**What it is:** When the artist or fan switches between themes (Dark → Light → Glass → Mid), all colour values interpolate simultaneously rather than snapping. The page appears to "transform" rather than switch.

**Trigger → Rule → Feedback:**
- Trigger: `data-theme` attribute change on the shell element
- Rule: CSS `transition` on all colour-related properties: `background-color`, `color`, `border-color`, `box-shadow`
- Feedback: all surfaces, borders, and text shift simultaneously over 300ms

**Implementation:**
```css
/* Apply to the shell, inherits through CSS cascade */
.v3-shell {
  transition: background-color 300ms var(--ease-standard),
              color 300ms var(--ease-standard);
}
/* But individual components need it too */
.v3-card, .v3-section, .v3-button {
  transition: background-color 300ms var(--ease-standard),
              border-color 300ms var(--ease-standard),
              color 300ms var(--ease-standard);
}
```

**ABLE thoughts:** The four themes (Dark, Light, Glass, Mid) are not just colour swaps — they're entirely different atmospheric registers. Dark feels like a backstage room. Light feels like daylight. Glass feels like looking through frosted crystal. The transition between them should feel like a room changing around you, not a CSS class toggle. The limiting factor is performance: transitioning `backdrop-filter` (used on the Glass theme) is expensive. Animate the `opacity` of a glass overlay `::before` element rather than transitioning the `backdrop-filter` value directly.

---

## 34. Gig Mode Activation Flash
**Verdict: [BUILD] — the most dramatic moment in ABLE's interaction vocabulary**

**What it is:** When an artist activates gig mode (either from admin or via an automatic time trigger), a brief full-screen flash of the accent colour occurs — like a spotlight turning on — and then the page resolves into the gig state. Duration: 200ms.

**Trigger → Rule → Feedback:**
- Trigger: gig mode becomes active (first load in gig state, or real-time toggle)
- Rule: an absolutely-positioned overlay at opacity 0 flashes to 0.25 then back to 0 over 200ms
- Feedback: the page "comes to life" with a burst of colour energy

**Implementation:**
```css
.gig-flash {
  position: fixed; inset: 0; z-index: 100;
  background: var(--color-accent);
  opacity: 0; pointer-events: none;
  transition: opacity 100ms ease-out;
}
.gig-flash.active { opacity: 0.2; }
```
```js
function activateGigMode() {
  const flash = document.querySelector('.gig-flash');
  flash.classList.add('active');
  setTimeout(() => flash.classList.remove('active'), 100);
  // Then apply gig state to page
  setTimeout(() => applyState('gig'), 150);
}
```

**ABLE thoughts:** Von Restorff effect (DESIGN_RESEARCH_2026, #59): gig mode should be the most visually distinctive thing ABLE does. An artist is playing tonight — that's significant, urgent, exciting. A flash is the right gesture. This is the one moment in ABLE's vocabulary where restraint gives way to expressiveness. The caveat: this flash should only happen on the initial load into gig mode, not on every page refresh while gig mode is active. Store a session flag so the flash fires once per session. Nobody wants a strobe effect every time they reload the page.

---

## 35. Pre-Release Countdown Digit Flip
**Verdict: [BUILD] — the single most engaging interaction on the pre-release state**

**What it is:** The countdown timer on the pre-release state (days, hours, minutes to release) uses a "digit flip" animation — when a digit changes, the old digit folds away downward and the new digit folds in from above, like a mechanical split-flap display.

**Trigger → Rule → Feedback:**
- Trigger: second/minute/hour tick (depending on how much time remains)
- Rule: animate the outgoing digit with `rotateX(-90deg)` and the incoming digit from `rotateX(90deg)` to `rotateX(0)`
- Feedback: each digit change has physical, tactile weight

**Implementation:**
```css
.digit {
  display: inline-block;
  transform-origin: center;
  backface-visibility: hidden;
  perspective: 200px;
}
.digit.flip-out { animation: flipOut 200ms ease-in forwards; }
.digit.flip-in  { animation: flipIn  200ms ease-out forwards; }
@keyframes flipOut { to { transform: rotateX(-90deg); opacity: 0; } }
@keyframes flipIn  { from { transform: rotateX(90deg); opacity: 0; } to { transform: rotateX(0); opacity: 1; } }
```

**ABLE thoughts:** The pre-release state is ABLE's "anticipation" moment — the artist has something coming, fans can feel the build-up. A static number is functional but emotionally inert. A mechanical digit flip turns the countdown into a performance. Airport departures boards, analogue clocks, vinyl record counters — these references all live in the music world. It's the right energy for a pre-release. Performance note: `backface-visibility: hidden` and `perspective` trigger GPU compositing. Keep the number of animated elements to ≤8 digits (DD:HH:MM:SS).

---

## 36. Live State Pulsing Dot — "Out Now" Breathing Indicator
**Verdict: [BUILD] — communicates live status as an ongoing state, not a past event**

**What it is:** The "Out Now" badge in the live campaign state includes a small dot that breathes — a slow, rhythmic pulse from opacity 1 to 0.4 to 1, roughly in time with a heartbeat (~1 pulse per 2 seconds).

**Trigger → Rule → Feedback:**
- Trigger: live state is active (ongoing, not one-time)
- Rule: CSS animation loop on the dot element
- Feedback: the live state feels present and current, not archived

**Implementation:**
```css
.live-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--color-live-dot, #ef4444);
  animation: breathe 2s ease-in-out infinite;
}
@keyframes breathe {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.8); }
}
```

**ABLE thoughts:** The pulsing dot is a convention fans will recognise from Instagram Live, YouTube Live, TikTok Live. It communicates "this is happening now." For ABLE, the live state means the release is current — not literally streaming live, but actively in its primary promotion window. The 2-second rhythm is slow enough to be calm but fast enough to feel alive. Use `var(--color-live-dot)` from the token system (defined as `#ef4444` in able-v3.html) rather than hardcoding red. Ensure `@media (prefers-reduced-motion: reduce)` stops the animation and shows the dot at full opacity.

---

## 37. Gig Mode Pulsing Badge — "On Tonight" With Warm Glow
**Verdict: [BUILD] — pairs with #34, maintains gig mode energy throughout the session**

**What it is:** The "On Tonight" gig badge (the most prominent surface in gig mode) has a slow, warm glow pulsing around it — like a neon sign in a music venue. The glow is the accent colour at low opacity, expanding and contracting.

**Trigger → Rule → Feedback:**
- Trigger: gig mode is active (ongoing, looping animation)
- Rule: `box-shadow` from `0 0 0 0 rgba(accent, 0.5)` to `0 0 0 16px rgba(accent, 0)` in a 2s loop
- Feedback: badge breathes with urgency and warmth

**Implementation:**
```css
.gig-badge {
  animation: gig-pulse 2s ease-out infinite;
}
@keyframes gig-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(var(--color-accent-rgb), 0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(var(--color-accent-rgb), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--color-accent-rgb), 0); }
}
```

**ABLE thoughts:** Animating `box-shadow` is technically against the performance guidance (#22 caveat) because it triggers layout recalculation. For a looping animation, use the `::after` pseudo-element opacity trick instead: an absolutely-positioned `::after` on the badge that pulses `opacity: 0.5 → 0`, set to the accent glow via a radial gradient background. Zero layout cost, same visual result. The gig mode is the "loudest" ABLE state — this is the right level of visual energy for it. But ensure `prefers-reduced-motion` stops it.

---

## 38. Profile State Default Crossfade — The Quiet Return
**Verdict: [BUILD] — the calm after the urgency**

**What it is:** When the page returns to the default profile state (after a release window closes, after gig mode expires), the transition is the gentlest of all — a slow, 500ms fade from the previous state's visual language to the soft, permanent profile state.

**ABLE thoughts:** The profile state is "just me, as I am." After the urgency of a release or a gig, the return to default should feel like a breath out. The other state transitions are fast (gig flash: 200ms, live state entry: 300ms). The return to profile should be the slowest — 500ms crossfade, no spring, just ease. This pacing communicates: the campaign is over, but the artist is still here. It's an emotional gesture, not just a technical state change.

---

## 39. Platform Pill Active State — Accent Fill on Selection
**Verdict: [BUILD] — if pills are ever "selected" rather than just "tapped"**

**What it is:** If platform pills have a selectable state (e.g., a music player that lets fans choose which platform they prefer), the selected pill fills with the accent colour and its text switches from grey to white.

**Trigger → Rule → Feedback:**
- Trigger: tap on a platform pill (in a context where selection is meaningful)
- Rule: add `.selected` class, transition background from transparent to `--color-accent-subtle` to `--color-accent`
- Feedback: pill transforms from an outline chip to a filled accent chip over 200ms

**ABLE thoughts:** In the current able-v3.html architecture, platform pills are direct links — they navigate away rather than toggling state. This interaction is only relevant if ABLE introduces a "preferred platform" preference that persists across sessions. If implemented: the deselect state should fade back smoothly, not snap. And only one pill should be selected at a time. This would be a meaningful UX improvement for returning fans who always use the same platform.

---

## 40. Overflow Toggle Expansion — Pills Expand Inline
**Verdict: [BUILD] — the current overflow pattern, needs the right animation**

**What it is:** The "+3 more" overflow pill, when tapped, expands the pill row inline — the hidden pills slide in from the right, the "+3" pill fades out, and the row gracefully lengthens. No modal, no separate view.

**Trigger → Rule → Feedback:**
- Trigger: `click` on the overflow toggle pill
- Rule: hidden pills get `display: flex` and immediately animate from `opacity: 0, scale(0.8)` to `opacity: 1, scale(1)` with a 60ms stagger
- Feedback: pills bloom into view in sequence

**Implementation:**
```css
.pill-hidden {
  opacity: 0; transform: scale(0.8);
  transition: opacity 200ms var(--ease-decel),
              transform 200ms var(--ease-spring);
  display: none;
}
.pills-expanded .pill-hidden {
  display: flex;
  opacity: 1;
  transform: scale(1);
}
```

**ABLE thoughts:** Progressive disclosure (DESIGN_RESEARCH_2026, #45) says show 4 primary platforms, offer "+N more" toggle. The expansion should be inline — never a modal — because modals for small lists feel like architectural overkill. The row lengthening is the "interesting" part of this animation: if the pill container wraps to a second line, the height changes. Height transitions are expensive in CSS. Use `max-height` with a generous maximum to animate the row expansion, or use a more sophisticated approach with the Web Animations API to animate the row height based on its `scrollHeight`.

---

## 41. Section Expand/Collapse — Content Accordion
**Verdict: [CONSIDER] — may conflict with the scroll-first navigation**

**What it is:** Sections on the profile can be collapsed to just their header if the artist has no content (no events, no merch). Tapping the header expands the section, revealing an empty state or prompting content addition.

**Trigger → Rule → Feedback:**
- Trigger: tap on section header when section is empty
- Rule: animate `max-height: 0 → contentHeight` with ease-out
- Feedback: section expands below the header, content fades in

**ABLE thoughts:** This is a fan-facing interaction pattern but it only matters for sections with content. Empty sections in the fan view should show a graceful empty state ("No shows announced yet") and remain expanded at their minimum height — not collapsed. Collapsing empty sections might confuse fans who wonder why sections disappear. On admin.html, collapsible sections make more sense: the artist might want to collapse the Stats section to focus on the Fan List. Accordion behaviour belongs more in admin than in the public profile.

---

## 42. Support Pack Tier Select — Card Lifts and Glows
**Verdict: [BUILD] — the purchase moment needs ceremony**

**What it is:** On the Support section, when a fan taps a support pack tier, the selected card lifts (subtle `translateY(-4px)`) and gains an accent glow border. Unselected cards dim slightly. The CTA button below the cards activates.

**Trigger → Rule → Feedback:**
- Trigger: tap on a support pack card
- Rule: selected card: `translateY(-4px)`, `border-color: var(--color-accent)`, `box-shadow` glow. Unselected: `opacity: 0.6`
- Feedback: the page communicates "you've made a choice" before any purchase is initiated

**ABLE thoughts:** The Goal-Gradient Effect (DESIGN_RESEARCH_2026, #58): as fans get closer to completing the support action, the visual feedback should increase. Selecting a tier is step 1 of the purchase. The lift + glow is the "you've started something" signal. The CTA button transitioning from greyed-out to fully active is step 2. Together they create a committed flow. Apply the peak-end rule (#57): the peak of this interaction is the purchase confirmation, not the tier selection. Design the confirmation moment to be warm and specific: "You're supporting [Artist Name] at the [Tier Name] level. Thank you."

---

## 43. Release Badge Swap — Out Now → Dropping DD MMM
**Verdict: [BUILD] — small but semantically important**

**What it is:** When the page transitions between campaign states, the status badge text changes. "Out Now" → "Dropping 28 Mar" or "On Tonight". The old text fades out, the new text fades in — a brief staggered crossfade on a single-line element.

**Trigger → Rule → Feedback:**
- Trigger: state change event
- Rule: badge text fades to `opacity: 0` (100ms), new text set, fades to `opacity: 1` (200ms)
- Feedback: the badge changes gracefully, not abruptly

**ABLE thoughts:** A small thing — but the badge is the first thing fans read to understand "what's happening with this artist right now." If it snaps, it feels broken. If it crossfades, it feels intentional. The 100ms out / 200ms in timing is asymmetric deliberately: content exits faster than it enters. Content leaving should feel swift; content arriving should feel settled.

---

## 44. Admin Campaign State Toggle — Button Morphs Between States
**Verdict: [BUILD] — the artist's primary control in admin.html**

**What it is:** In admin.html's Campaign HQ, the state toggle buttons (Profile / Pre-release / Live / Gig) morph when activated — the button background fills with the accent colour, the icon changes, and the label transitions. Other buttons simultaneously dim.

**ABLE thoughts:** This is the admin equivalent of the tab sliding indicator (#31). The artist's campaign state is the most important control they have. When they switch from "Profile" to "Gig Mode", that action should feel significant and reversible. The active state button should be visually dominant (full accent fill), others should be clearly deprioritised (reduced opacity, no fill). The 24-hour countdown on gig mode — a thin progress bar depleting under the gig button — is a secondary interaction that communicates the time-limited nature of gig mode without any additional controls.

---

## 45. Connection Status Badge — Fade-In on Successful Link
**Verdict: [BUILD] — trust signal that earns its animation**

**What it is:** When an artist successfully links their Spotify account (or any platform) in admin.html, a connection badge ("✓ Spotify connected") fades into view next to the platform name. It doesn't pop — it materialises gently, as if the connection just became real.

**Trigger → Rule → Feedback:**
- Trigger: OAuth callback success, or Spotify API data successfully fetched
- Rule: badge starts at `opacity: 0, translateX(8px)`, transitions to `opacity: 1, translateX(0)` over 300ms
- Feedback: the badge arrives from the right — subtle but directional (it "came from" the external service)

**ABLE thoughts:** Trust is built in these small confirmations. The Stripe design team principle (DESIGN_RESEARCH_2026, #18): competence is communicated through precision, not decoration. A badge that says "Spotify connected" with an accuracy-signalling checkmark communicates that ABLE knows what it's doing. The subtle slide-in from the right (the direction of the external service, conceptually) is a tiny spatial metaphor. Don't overthink it — the animation is one line of CSS. The content of the badge is more important than the animation: show the artist name pulled from Spotify ("✓ Connected as Novo Amor") not just "✓ Spotify connected".
