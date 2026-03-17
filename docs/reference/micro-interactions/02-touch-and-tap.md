# 02 — Touch & Tap Feedback (16–30)

These interactions happen in milliseconds and are almost unconscious. They're the difference between a UI that feels like glass and one that feels like tapping a PDF. Every interactive element in ABLE must have at least one of these.

---

## 16. Scale-Down on Press — The Universal Press State
**Verdict: [BUILD] — mandatory for every interactive element**

**What it is:** When a user presses down on a button, card, or pill, it scales to 0.97 of its original size. The compression gives physical feedback: this thing responds to force.

**Trigger → Rule → Feedback:**
- Trigger: `touchstart` / `mousedown` / `pointerdown`
- Rule: apply `transform: scale(0.97)` instantly (no delay)
- Feedback: element shrinks under finger, communicating it's been pressed

**Implementation:**
```css
.interactive {
  transition: transform 80ms ease-out, opacity 80ms ease-out;
}
.interactive:active {
  transform: scale(0.97);
  opacity: 0.9;
}
```

**ABLE thoughts:** This is the single highest-value micro-interaction for perceived quality. The Doherty Threshold (DESIGN_RESEARCH_2026, #60) demands feedback within 100ms. The CSS `:active` state triggers in ~16ms — well within threshold. The problem: `:active` on iOS requires a `touchstart` listener on the document (legacy fix) OR using `@media (hover: none)` scoped active states. Test on iOS Safari — `:active` without this trick often doesn't fire. The scale should be `0.97` not `0.95` — anything below 0.95 feels like the element is being crushed, not pressed.

---

## 17. Spring-Back Release — Overshoot on Tap Release
**Verdict: [BUILD] — pairs with #16 for satisfying tap feel**

**What it is:** When the user releases a button, it doesn't just return to 1.0 scale linearly. It springs back to full size with a tiny overshoot to 1.02, then settles — like pressing a physical button.

**Trigger → Rule → Feedback:**
- Trigger: `touchend` / `pointerup`
- Rule: transition from 0.97 → 1.02 → 1.0 using spring easing
- Feedback: the element "bounces back" as if physically weighted

**Implementation:**
```css
/* On release, the transition changes to the spring curve */
.interactive {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* JS toggles a .pressing class on touchstart/touchend */
.interactive.pressing {
  transform: scale(0.97);
  transition: transform 80ms ease-out; /* fast compress */
}
```

**ABLE thoughts:** The spring overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)` — ABLE's established spring curve) is what makes this feel like quality hardware. Without it, the release feels like snapping back — clinical. With it, it feels like the button is alive. The key technical detail: you need JavaScript to toggle the class on `touchstart`/`touchend`, because CSS-only `:active` states can't switch the transition curve mid-animation. A small JS abstraction that applies to all `.interactive` elements is worth the 30 lines of code.

---

## 18. Ripple Effect — Origin-Point Expansion
**Verdict: [CONSIDER] — Material Design's signature, needs ABLE-appropriate treatment**

**What it is:** When an element is tapped, a circular ripple expands from the exact point of touch, fading out as it reaches the edge of the element. The ripple colour is the accent colour at low opacity.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` event — captures `clientX` / `clientY` for origin point
- Rule: inject a `<span>` at the touch position, animate from `scale(0)` to `scale(2.5)` while fading to `opacity: 0`
- Feedback: a radial wave of light emanates from the fingertip

**Implementation:**
```js
function createRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  circle.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top: ${e.clientY - rect.top - size / 2}px;
    position: absolute; border-radius: 50%;
    background: rgba(var(--color-accent-rgb), 0.25);
    transform: scale(0); animation: ripple 500ms linear;
    pointer-events: none;
  `;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(circle);
  circle.addEventListener('animationend', () => circle.remove());
}
```

**ABLE thoughts:** Ripples are strongly associated with Material Design — they can feel "Googley" if not done right. For ABLE, the ripple should be subtle (0.25 accent opacity, not 0.5), slower (500ms not 300ms), and should NOT appear on ghost/secondary buttons — only on filled primary CTAs. This preserves the premium feel. The folk artist profile should feel calm; the electronic artist profile can have a more vivid ripple because the accent cyan will read as electric, not intrusive. Consider making this a per-theme decision.

---

## 19. Colour Flash on Tap — Accent Pulse in Button Background
**Verdict: [BUILD] — simpler alternative to ripple, same result**

**What it is:** On tap, a filled CTA button briefly flashes a brighter version of the accent colour (the `--color-accent-dark` shifted lighter) and then returns to the normal accent. Duration: ~150ms total.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` on primary CTA
- Rule: transition `background-color` to a lighter accent shade, then back
- Feedback: button "flashes" confirming the tap

**Implementation:**
```css
.cta-primary {
  background: var(--color-accent);
  transition: background-color 80ms ease-out, transform 80ms ease-out;
}
.cta-primary:active {
  background: color-mix(in srgb, var(--color-accent) 80%, white 20%);
  transform: scale(0.97);
}
```

**ABLE thoughts:** This is the CSS-only version of the ripple, and honestly might be preferable. It's two lines of CSS, requires no JavaScript, and achieves the same goal: confirming the tap happened. The `color-mix()` function (supported in all modern browsers) creates a dynamic lighter accent without hardcoding a second colour. Combined with #16's scale-down, this gives the button a two-axis tap response: size compression + colour brightening. For most of ABLE's buttons, this is enough.

---

## 20. Tab Bar Icon Bounce on Selection
**Verdict: [BUILD] — the most distinctive ABLE navigation signature**

**What it is:** When a tab is selected, its icon doesn't just switch to the active colour. It briefly scales up to 1.15, then settles back to 1.0 with a spring bounce. The dot indicator simultaneously slides to the new position.

**Trigger → Rule → Feedback:**
- Trigger: `click` on a tab bar item
- Rule: add `.selected` class to new tab, remove from previous; spring animate the icon scale and the dot position
- Feedback: selected icon "bounces" up slightly; dot slides across the bar to land under the new tab

**Implementation:**
```css
.tab-icon {
  transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1),
              color 200ms var(--ease-standard);
}
.tab-item.active .tab-icon {
  transform: scale(1.15);
  color: var(--color-accent);
}
/* After settling */
.tab-item.active.settled .tab-icon {
  transform: scale(1.0);
}
```

**ABLE thoughts:** This is the micro-interaction that makes the tab bar feel like ABLE's own, not a copy of every other mobile app. The bounce communicates selection with energy — appropriate for music. The dot sliding between tabs (covered in #31) turns a state change into a small piece of narrative: "you went from here to there." Don't apply the bounce to the already-selected tab if it's tapped again — instead, trigger the scroll-to-top interaction (#99).

---

## 21. Platform Pill Press State — Dim and Scale
**Verdict: [BUILD] — must feel tappable, not static**

**What it is:** Platform pills (Spotify, Instagram, etc.) compress to 0.95 scale and their background dims slightly on press, communicating they're interactive links, not decorative chips.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` on pill
- Rule: `transform: scale(0.95)`, `opacity: 0.8` on press
- Feedback: pill visibly responds to touch

**ABLE thoughts:** Don Norman's principle (DESIGN_RESEARCH_2026, #38): signifiers matter more than affordances. Platform pills don't currently look tappable on a first visit. The press state retrospectively confirms they were. But the problem is that there's no pre-tap signal. Consider adding a very subtle right-arrow icon `›` at the end of each pill — 8px, 40% opacity — to signal navigability. The press state then confirms what the arrow suggested. This two-signal approach (signifier + press feedback) eliminates ambiguity about whether pills are tappable links or decorative labels.

---

## 22. CTA Button Glow on Press — Accent Glow Expands then Collapses
**Verdict: [BUILD] — the signature primary CTA moment**

**What it is:** When the primary CTA (e.g., "Pre-save", "Stream Now") is pressed, a glow radiates outward from the button in the accent colour, expanding then collapsing back in ~300ms. It's a moment of energy release.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` on `.cta-primary`
- Rule: `box-shadow` expands from `0 0 0 0 rgba(accent, 0.4)` to `0 0 0 20px rgba(accent, 0)` — the glow expands and fades
- Feedback: a "pulse" of accent energy radiates from the button

**Implementation:**
```css
.cta-primary {
  box-shadow: 0 0 0 0 rgba(var(--color-accent-rgb), 0.4);
  transition: box-shadow 300ms var(--ease-decel),
              transform 80ms ease-out;
}
.cta-primary:active {
  box-shadow: 0 0 0 12px rgba(var(--color-accent-rgb), 0);
  transform: scale(0.97);
}
```

**ABLE thoughts:** This is iOS's tap highlight generalised into ABLE's design language. It's the difference between a button that feels like a button and a button that feels like a moment. On the gig mode state especially — where the primary CTA is "Get Tickets" and the page is in its most urgent, excited state — this glow is the right energy level. Caution: `box-shadow` is not GPU-composited, so animating it triggers a repaint. For performance, use a `::after` pseudo-element with `opacity` transition instead (Ahlin's technique, DESIGN_RESEARCH_2026 #25). Slightly more complex but keeps 60fps.

---

## 23. Long-Press Reveal — Share Options on Track Card
**Verdict: [CONSIDER] — useful but hidden discoverability**

**What it is:** Long-pressing (500ms+) on a track card reveals a contextual menu: Share, Add to playlist, Copy link. The menu appears from below the card with a spring entrance.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` held for 500ms without movement
- Rule: show contextual panel, cancel if `pointermove` detected
- Feedback: card slightly dims, a bottom-up panel rises with 3 options

**ABLE thoughts:** Long-press is a gesture that iOS users know but Android users are less confident with. In a fan-facing context, most fans don't know they can long-press on anything — discoverability is zero. For the artist profile, the primary share mechanism should be visible (a share icon or "Share" link), not hidden behind a gesture. Long-press could make sense in the admin dashboard for power interactions (archive a snap card, reorder fan list entries). On the public profile: documented here, but recommend explicit share buttons instead.

---

## 24. Double-Tap Heart Animation — Artwork Reaction
**Verdict: [CONSIDER] — Instagram-trained behaviour**

**What it is:** Double-tapping on the hero artwork or an album art card triggers a heart animation — a heart scales up from the point of touch, fades out. The fan has "liked" the release.

**Trigger → Rule → Feedback:**
- Trigger: two taps within 300ms on an artwork element
- Rule: inject a `♥` element at tap position, animate `scale(0 → 1.5 → 0)` and `opacity(1 → 0)` over 600ms
- Feedback: a heart blooms from the fingertip and disappears

**ABLE thoughts:** Instagram trained a generation of users to associate double-tap-heart with affection. The problem: what does it actually do? If it does nothing persistent (no fan list entry, no notification to the artist), it's a hollow gesture. ABLE's philosophy is honest — "never add a feature that looks like it means something but doesn't." If double-tap-heart added the fan to a "favourited releases" list, or sent a subtle notification to the artist, it would earn its place. Without the backend support, it's a parlour trick. Defer this until the fan dashboard and activity signals are built.

---

## 25. Swipe-to-Dismiss — Bottom Sheet Panels
**Verdict: [BUILD] — essential for any bottom sheet in ABLE**

**What it is:** Bottom sheet panels (when a snap card is expanded, when the overflow pills appear, when a platform detail opens) can be dragged downward and released to dismiss. If dragged past 30% of panel height, the panel springs closed. If released earlier, it springs back.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` on panel drag handle, then `pointermove` downward
- Rule: follow the drag, then on `pointerup`: if deltaY > panelHeight * 0.3, dismiss; else spring back
- Feedback: panel follows the finger realistically; spring animation on release

**Implementation:**
```js
let startY, currentY;
handle.addEventListener('pointerdown', e => { startY = e.clientY; });
document.addEventListener('pointermove', e => {
  currentY = e.clientY;
  const delta = Math.max(0, currentY - startY);
  panel.style.transform = `translateY(${delta}px)`;
});
document.addEventListener('pointerup', () => {
  const delta = currentY - startY;
  if (delta > panel.offsetHeight * 0.3) {
    dismissPanel(panel);
  } else {
    panel.style.transform = '';
    panel.style.transition = `transform 400ms ${easingSpring}`;
  }
});
```

**ABLE thoughts:** Frank Chimero's principle (DESIGN_RESEARCH_2026, #9): "design should follow the natural properties of its medium." Swipe-to-dismiss is the most natural mobile gesture for closing a panel. Placing a close button in the top-right of a panel violates the thumb-zone guidance (CLAUDE.md: "Close/dismiss buttons in the lower half, never top-right"). The drag handle, a small pill-shaped indicator, signals dismissability better than a button. Make the drag handle at least 44px tall (hit target). The spring back when released early feels reassuring — the panel remembers where it belongs.

---

## 26. Swipe-Reveal on Fan List Item — Delete/Archive
**Verdict: [CONSIDER] — admin dashboard only**

**What it is:** Swiping left on a fan list row in admin.html reveals an "Archive" or "Remove" action button. This is the iOS Mail / iOS Reminders pattern.

**ABLE thoughts:** This belongs in admin.html's fan list, not on the public profile. On the public profile there are no deletable list items. In admin, artists occasionally want to remove test sign-ups (their own email) or archive inactive fans. Swipe-reveal is the right mobile-native pattern for this — but implement it only after the fan list itself is built and working. Don't build the dismissal interaction before the list it belongs to.

---

## 27. Edge Swipe Navigation — Swipe Right to Go Back
**Verdict: [BUILD] — essential when panels are open**

**What it is:** When a panel or sub-view is open over the main profile, swiping rightward from the left edge of the screen returns the user to the underlying view — mirroring iOS's system-level back gesture.

**Trigger → Rule → Feedback:**
- Trigger: `pointerdown` within 20px of the left edge, `pointermove` rightward by 40px+
- Rule: panel follows the swipe; if threshold met, spring-dismiss; else spring-back
- Feedback: panel slides with the finger, creating a parallax reveal of the content behind it

**ABLE thoughts:** This is the most natural "back" gesture for panels that have been pushed from the left (if any). For bottom-sheet panels (the ABLE standard), swipe-down (#25) is the correct dismiss gesture. Edge-swipe is more relevant if ABLE ever implements a "push navigation" pattern (panel slides in from the right). For the current architecture with bottom sheets, document this but don't build it until push navigation is needed. When it is: the 20px edge zone must be detected before any other touch handler to avoid conflicts with horizontal scroll areas.

---

## 28. Visual Haptic Pattern — Flash + Scale Confirm
**Verdict: [BUILD] — the visual equivalent of haptic feedback on iOS**

**What it is:** For actions that cross a threshold (fan sign-up submitted, support pack purchased), the button that triggered the action does a more emphatic version of the press state: a single `scale(0.95) → scale(1.05) → scale(1.0)` animation with a brief colour flash. This is a "physical" confirmation that something meaningful just happened.

**Trigger → Rule → Feedback:**
- Trigger: form submission success, action confirmed
- Rule: sequence: `scale(0.95)` (10ms) → `scale(1.05)` (150ms spring) → `scale(1.0)` (200ms decel)
- Feedback: button "pops" outward after confirmation, distinct from the normal spring-back

**Implementation:**
```js
function confirmPop(el) {
  el.style.transition = 'transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1)';
  el.style.transform = 'scale(1.05)';
  setTimeout(() => {
    el.style.transition = 'transform 200ms var(--ease-decel)';
    el.style.transform = 'scale(1.0)';
  }, 150);
}
```

**ABLE thoughts:** This is the "you did a thing that mattered" animation. The fan sign-up button should do this on submission success. The "Pre-save" button should do this when the save is confirmed from the DSP API. The normal scale-down (#16) is for every press. This pop is only for moments that deserve acknowledgement. Using it on every tap would dilute it to meaninglessness. Reserve it for conversions and completions.

---

## 29. Drag Resistance on Snap Card Overflow
**Verdict: [CONSIDER] — elegant but complex**

**What it is:** When horizontally scrolling through snap cards and the user tries to drag past the last card, the scroll resists with increasing friction — like pulling a rubber band. Release and it springs back to the last valid card.

**Trigger → Rule → Feedback:**
- Trigger: horizontal scroll position exceeds `maxScrollLeft`
- Rule: apply a diminishing scale factor to additional scroll delta (`delta * 0.3`)
- Feedback: the overscroll feels like pulling against elastic; release snaps back

**ABLE thoughts:** CSS `scroll-snap` with `overscroll-behavior: none` gives some of this for free — native scroll containers already resist overscroll on iOS. The custom version gives more control over the "feel" of the resistance. Worth implementing if the snap cards become a central UI element (which they are for Artist tier users). For now, the native CSS behaviour is sufficient and zero-cost. Custom drag resistance adds ~50 lines of JavaScript for a subtle improvement. Revisit when the snap card UX is finalised.

---

## 30. Force-Touch / Long-Press Preview — Linked Content Peek
**Verdict: [SKIP] — complexity vs. discoverability problem**

**What it is:** Long-pressing a link to an external platform (Spotify profile, YouTube) shows a preview of that page in a modal before navigating — a "peek" before committing to leaving the page.

**ABLE thoughts:** This solves a real problem (fans hesitate to leave the artist page) but creates a larger one (implementing a full web preview is a WebView, not a micro-interaction, and involves significant security and sandboxing complexity). The better solution is simpler: platform links should clearly signal they open in a new tab (`target="_blank"`) and platform logos are sufficient signifiers of the destination. A fan who taps the Spotify logo knows they're going to Spotify. No preview needed. Documented here to close the question definitively.
