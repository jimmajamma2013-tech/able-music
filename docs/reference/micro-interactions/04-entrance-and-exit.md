# 04 — Entrance & Exit Animations (46–60)

How things arrive and depart says a lot about the product's personality. ABLE's entrance language is spring-and-decelerate: content arrives with energy and settles into place. Exits are swift and confident — content leaves cleanly, without overstaying.

---

## 46. Staggered Card Bloom — The Page Assembling Itself
**Verdict: [BUILD] — the single most impactful visual impression on page load**

**What it is:** On first load, the various card elements of the profile don't all appear simultaneously. They bloom into view in waves: the hero first, then platform pills, then music cards, each with a 60ms stagger per element.

**Trigger → Rule → Feedback:**
- Trigger: page load / DOM ready
- Rule: elements start `opacity: 0, translateY(16px)`, gain `.visible` class in sequence
- Feedback: the page feels like it's assembling itself around the fan — a performance, not a load

**Implementation:**
```js
const elements = [
  '.v3-hero',
  '.platform-pill',
  '.music-card',
  '.event-card',
  '.merch-card',
  '.fan-capture'
];
elements.forEach((selector, groupIndex) => {
  document.querySelectorAll(selector).forEach((el, itemIndex) => {
    el.style.transitionDelay = `${(groupIndex * 100) + (itemIndex * 60)}ms`;
    el.classList.add('will-animate');
  });
});
// Trigger on rAF after paint
requestAnimationFrame(() => {
  document.querySelectorAll('.will-animate').forEach(el => el.classList.add('visible'));
});
```

**ABLE thoughts:** This is the first 2 seconds of every fan's experience. The Codrops/Awwwards research in DESIGN_RESEARCH_2026 (#34) specifically recommends staggered entrances for this exact scenario. One important rule: **the hero must appear instantly** — `transition-delay: 0ms` for the hero card. Fans should never see the above-fold area empty for even a moment. The stagger is for below-fold content only, and even then, elements already in view on load should appear immediately. Elements not in viewport start with `opacity: 0` and reveal via IntersectionObserver (#7) — not the initial stagger. These are two separate systems: initial bloom for above-fold, IntersectionObserver for below-fold.

---

## 47. Hero Name Reveal — Barlow Condensed Slides Up
**Verdict: [BUILD] — the page's opening statement**

**What it is:** The artist name (the dominant typographic element) slides up from 12px below its final position and fades in on load, arriving with a deceleration curve. It's the first "sentence" the page speaks.

**Trigger → Rule → Feedback:**
- Trigger: page load, triggered ~50ms after page paint (slight delay to ensure fonts are loaded)
- Rule: `opacity: 0, translateY(12px) → opacity: 1, translateY(0)` over 400ms with `--ease-decel`
- Feedback: the artist name "lands" with authority

**Implementation:**
```css
.v3-artist-name {
  opacity: 0;
  transform: translateY(12px);
  animation: nameReveal 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 50ms forwards;
}
@keyframes nameReveal {
  to { opacity: 1; transform: translateY(0); }
}
```

**ABLE thoughts:** Paula Scher's principle (DESIGN_RESEARCH_2026, #4): the artist name IS the design. It should arrive with presence. The 50ms delay ensures the font has finished loading (DM Sans and Barlow Condensed are Google Fonts, preconnected). Without the delay, there's a risk of FOUT (Flash of Unstyled Text) — the name appears in the fallback system font for a frame, then swaps to Barlow Condensed, causing a layout jump. With a 50ms delay, the font is almost certainly loaded. A more robust approach: use `document.fonts.ready.then(() => triggerAnimation())` to guarantee font availability.

---

## 48. Platform Pill Wave — Left to Right Entrance
**Verdict: [BUILD] — horizontal stagger for a horizontal element**

**What it is:** Platform pills enter the page in a left-to-right wave, each 50ms after the previous. Combined with the translateY entrance (#46), they appear to rise up and sequence from left to right.

**Trigger → Rule → Feedback:**
- Trigger: pill container enters viewport (IntersectionObserver or initial load)
- Rule: same stagger system as #46, but pills additionally have a slight `translateX(-8px)` start
- Feedback: pills sequence in like a reading sentence, reinforcing the left-to-right priority order

**ABLE thoughts:** The platform pills represent the artist's most important presence: Spotify first (where their music lives), then Apple Music, Instagram, YouTube, etc. The left-to-right ordering reinforces this hierarchy — the eye is drawn to the first element. If the pills were to appear simultaneously or in random order, the priority signal is lost. The left-to-right wave encodes "read these in this order" into the entrance animation itself.

---

## 49. Tab Bar Slide Up — Navigation Arrives After Content
**Verdict: [BUILD] — navigation should be available but not first**

**What it is:** On page load, the tab bar starts below the viewport (`translateY(100%)`) and slides up into its fixed bottom position after the hero content has loaded — about 200ms into the page load sequence.

**Trigger → Rule → Feedback:**
- Trigger: 200ms after page load (or after hero animation begins)
- Rule: tab bar transitions from `translateY(60px), opacity: 0` to `translateY(0), opacity: 1` with `--ease-decel`
- Feedback: navigation arrives after the content — content is what matters, navigation is how you explore it

**ABLE thoughts:** Cognitive priority: the hero content (artist name, artwork, CTAs) should arrive first in the visual sequence. Navigation arrives second. This mirrors how fans actually think: "who is this person?" before "where can I go?" The 200ms delay for navigation after hero content reinforces this priority without making navigation feel unavailable — 200ms is imperceptible in practice. If the tab bar were to appear simultaneously with the hero, the fan's eye might land on navigation first, which is the wrong first impression.

---

## 50. Panel Slide Up — Bottom Sheet Entrance
**Verdict: [BUILD] — the primary ABLE modal pattern**

**What it is:** Any content that opens in a bottom sheet (expanded snap card, overflow pills in a list, extended track info) slides up from the bottom with a spring ease. The backdrop fades in simultaneously.

**Trigger → Rule → Feedback:**
- Trigger: user action that opens a panel (tap on snap card, overflow toggle)
- Rule: panel starts at `translateY(100%)`, transitions to `translateY(0)` with spring; backdrop `opacity: 0 → 0.6`
- Feedback: panel rises like a physical sheet of paper being lifted from a surface

**Implementation:**
```css
.bottom-sheet {
  transform: translateY(100%);
  transition: transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.bottom-sheet.open {
  transform: translateY(0);
}
.sheet-backdrop {
  opacity: 0;
  transition: opacity 250ms var(--ease-standard);
}
.sheet-backdrop.open {
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.6);
}
```

**ABLE thoughts:** Bottom sheets are the correct ABLE modal pattern — not centred modals (too desktop), not full-screen overlays (too aggressive), not inline expansions (too layout-disruptive). The spring easing on entry gives the sheet a physical quality — it arrives with momentum and settles. The spring overshoot is small (the sheet rises to its final position with a 2-3px overshoot then settles). On the Glass theme, the bottom sheet should use `backdrop-filter: blur(28px)` on its surface. On Dark theme, `--color-card-raised` background. Dismiss with swipe-down (#25) and tap-backdrop patterns.

---

## 51. Panel Backdrop Fade — The Context Retreats
**Verdict: [BUILD] — pairs with #50**

**What it is:** When a bottom sheet or panel opens, the underlying content dims behind a semi-transparent backdrop. The backdrop doesn't just appear — it fades in over 250ms, and critically, remains interactive for a tap-to-dismiss gesture.

**Implementation:**
```css
.sheet-backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0);
  transition: background 250ms var(--ease-standard);
  pointer-events: none;
}
.sheet-backdrop.active {
  background: rgba(0, 0, 0, 0.55);
  pointer-events: all; /* Enable tap-to-dismiss */
}
```

**ABLE thoughts:** The backdrop serves two functions: visual focus (drawing attention to the panel) and spatial context (the content behind is still there, just temporarily de-prioritised). The semi-transparency is intentional — unlike a full black overlay, the artist's page remains dimly visible behind the panel, reminding the fan they're still on that page. `pointer-events: all` on the active backdrop enables tap-to-dismiss (#25 alternative). The dismiss tap should trigger the same spring-down animation as the swipe gesture.

---

## 52. Content Fade-in After Skeleton — The Reveal
**Verdict: [BUILD] — the completion of the loading sequence**

**What it is:** When the artist profile data loads and the skeleton screen has served its purpose, the real content doesn't just replace the skeleton — it crossfades in over 200ms. Skeleton fades to 0 while content fades in from 0, both simultaneously.

**Implementation:**
```js
function revealContent(skeleton, content) {
  content.style.opacity = '0';
  content.style.display = 'block';
  // Fade out skeleton, fade in content simultaneously
  skeleton.style.transition = 'opacity 200ms var(--ease-standard)';
  content.style.transition = 'opacity 200ms var(--ease-standard)';
  skeleton.style.opacity = '0';
  content.style.opacity = '1';
  skeleton.addEventListener('transitionend', () => skeleton.remove(), { once: true });
}
```

**ABLE thoughts:** The crossfade hides the "swap" moment — without it, there's a one-frame flash where neither skeleton nor content is fully visible. The 200ms is short enough that the fan doesn't notice a delay, but long enough to be smooth. One risk: if skeleton shapes don't match the real content shapes closely, the crossfade will reveal a layout jump underneath. The skeleton must approximate real content dimensions accurately (square for artwork, ~2 lines for text, etc.). DESIGN_RESEARCH_2026 (#54) covers this: skeletons should approximate shape, not be generic grey blocks.

---

## 53. Section Reveal on First Visit — Below-Fold Bloom
**Verdict: [BUILD] — see also #7, this is the below-fold version**

**What it is:** Sections below the fold (Music, Events, Merch, Support) only animate their entrance when the fan first scrolls to them. On subsequent visits, sections are instantly visible (animation has already fired; don't replay it).

**ABLE thoughts:** "First visit" detection can be session-based: if `sessionStorage.getItem('hasScrolled')` is set, skip the entrance animations for sections below the fold. This is a quality-of-life detail for fans who reload the page or return during the same session — seeing the same entrance animations twice feels mechanical, not alive. On a new session, the animations tell the story of the page. On a reload, they'd just slow the fan down.

---

## 54. Modal Entrance Scale — Slight Scale from Below 1.0
**Verdict: [BUILD] — if any centred modals are used**

**What it is:** Any centred modal (if used — currently ABLE prefers bottom sheets) enters from a scale of 0.92 to 1.0 with a 300ms spring ease, simultaneously fading in. This gives modals a "materialising" quality.

**Implementation:**
```css
.modal {
  transform: scale(0.92);
  opacity: 0;
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 200ms var(--ease-standard);
}
.modal.open {
  transform: scale(1.0);
  opacity: 1;
}
```

**ABLE thoughts:** Scale from 0.92 (not 0.0, not 0.5) is critical — it should appear to rise from a near-visible state rather than grow from nothing. The spring overshoot in the scale curve means it briefly reaches 1.03 before settling at 1.0, giving it a "pop" quality. Use this for the wizard steps in start.html more than the profile page. The profile page should rely on bottom sheets for everything — centred modals on mobile feel anachronistic.

---

## 55. Toast Notification Slide-In — From Bottom Edge
**Verdict: [BUILD] — for admin.html feedback messages**

**What it is:** Toast notifications (e.g., "Profile saved", "Link copied", "Gig mode activated") slide in from the bottom of the screen, sit briefly, then slide back down. They appear above the tab bar.

**Implementation:**
```css
.toast {
  position: fixed;
  bottom: calc(64px + env(safe-area-inset-bottom)); /* above tab bar */
  left: 50%; transform: translateX(-50%) translateY(100px);
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 300ms var(--ease-standard);
  opacity: 0;
}
.toast.visible {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}
```

**ABLE thoughts:** The spring entrance for toasts is correct — they should feel like they "pop" into the fan's awareness. The dismiss animation should be an ease-in (acceleration): `transform: translateY(40px)` with `--ease-accel` over 200ms. Content exits faster than it enters — it's leaving, not arriving. Position above the tab bar is non-negotiable: a toast that overlaps the tab bar looks like a bug, not a feature. The `env(safe-area-inset-bottom)` ensures it clears the iPhone home indicator on devices with no home button.

---

## 56. Gig Mode Banner Drop — "On Tonight" Falls from Above
**Verdict: [CONSIDER] — dramatic but context-specific**

**What it is:** In gig mode, a "On Tonight" banner drops from the top of the hero section with a spring bounce — like a venue banner being unfurled. It's the first thing the fan sees when landing on a gig-state page.

**Trigger → Rule → Feedback:**
- Trigger: page load in gig state (once per session)
- Rule: banner starts at `translateY(-100%)`, springs to `translateY(0)` with a strong overshoot
- Feedback: the banner "falls into place" with physical momentum, settling with a small bounce

**ABLE thoughts:** The gig activation flash (#34) handles the initial moment. If a banner drop is added, it should happen after the flash — as if the lights came on and the banner is now visible. The risk: two dramatic entrance animations in sequence can feel like the page is performing too hard. Choose one: the flash (instant, surprise) or the banner drop (theatrical, sustained). My recommendation: the flash for the state transition moment, the pulsing badge (#37) for the ongoing state communication. The banner drop is third-choice — document it but don't build unless the first two feel insufficient.

---

## 57. Exit Animation for Panels — Spring Down, Not Snap
**Verdict: [BUILD] — the missing half of the entrance animation**

**What it is:** When a bottom sheet is dismissed, it slides back down with an ease-in acceleration (content exits fast, like it's being pulled down by gravity). It should NOT use the same spring curve as entry.

**Implementation:**
```css
.bottom-sheet.closing {
  transform: translateY(100%);
  transition: transform 250ms cubic-bezier(0.55, 0, 1, 0.45); /* --ease-accel */
}
```

**ABLE thoughts:** Asymmetric easing for entry vs. exit is a fundamental quality signal. Entry uses spring (energy, arrival). Exit uses acceleration (decisiveness, gravity). A panel that exits with the same spring curve as its entry will overshoot past the viewport edge and back — which looks like a bug. The acceleration curve (`cubic-bezier(0.55, 0, 1, 0.45)`) takes the panel from its position to off-screen with increasing speed. The fan's eye reads this as "gone, confidently." The 250ms exit is faster than the 350ms entry — dismissals should feel swift, arrivals should feel settled.

---

## 58. Staggered Fan List Rows — Admin Dashboard
**Verdict: [BUILD] — makes the fan list feel populated and alive**

**What it is:** When the fan list in admin.html first loads (after data fetch), rows don't all appear at once. They enter from the top with a 40ms stagger — first fan row, then second, etc. — creating a waterfall of fan arrivals.

**ABLE thoughts:** Stripe's design principle (DESIGN_RESEARCH_2026, #18): data products communicate competence through precision and order. A fan list that assembles itself row by row communicates that each row is a distinct record — a real person. It's a subtle way of saying "these are not just numbers." The stagger also prevents the jarring flash of a large list appearing instantly. Cap the stagger at the first 8 visible rows — beyond that, rows should appear instantly. A 320ms total stagger (8 rows × 40ms) is barely noticeable but significant in feel.

---

## 59. Stats Counter Animation — Numbers Count Up From Zero
**Verdict: [BUILD] — one of the most satisfying interactions in analytics products**

**What it is:** In admin.html's analytics section, when stats load (views, fans, clicks), the numbers count up from 0 to their actual value over 800ms with an ease-out curve. "127 fans" counts: 0 → 12 → 47 → 97 → 120 → 127.

**Implementation:**
```js
function countUp(element, target, duration = 800) {
  let start = null;
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    element.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else element.textContent = target; // Ensure exact final value
  }
  requestAnimationFrame(step);
}
```

**ABLE thoughts:** This is the interaction that artists will show other artists. "Look, it counts up." That moment of delight — a number assembling itself before your eyes — is memorable in a way that static numbers never are. It also prevents the visual shock of a large number appearing instantly. An artist who had 2,000 views last month sees "2,000" count up and feels each view more individually. Stripe does this. Linear does this. ABLE should do this. The 800ms duration is long enough to be visible, short enough not to feel slow. Only count up on first load, not on every page visit.

---

## 60. Platform Pill Exit Shimmer — On First Load
**Verdict: [CONSIDER] — the 0.1-second brand moment**

**What it is:** When platform pills first appear after the page loads, they have a brief shimmer pass — a left-to-right gradient sweep across each pill, like chrome catching light. This is a one-time, first-load-only effect.

**Implementation:**
```css
.platform-pill::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255,255,255,0.25) 50%,
    transparent 100%
  );
  animation: shimmer 600ms ease-out forwards;
  animation-delay: var(--stagger, 0ms);
}
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(200%); }
}
```

**ABLE thoughts:** This is a premium onboarding moment — the kind of detail that designers notice and that music fans feel without knowing why. The pills arriving with a shimmer is like a product being unwrapped: the light catches it once as it comes into view. One-time is critical: if the shimmer loops, it becomes the loading skeleton, not a reveal. If it replays on every tab switch, it becomes annoying. Session-store whether the shimmer has fired. A small detail with a meaningful quality cost: ~20 lines of CSS. Worth it for the first impression.
