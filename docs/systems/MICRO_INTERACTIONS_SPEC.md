# ABLE — Micro-Interactions System Spec
**Created: 2026-03-15 | Strategy score: 9.5/10**

> "Felt, not seen." Every interaction should make the page feel alive without drawing attention to itself. Test: if you remove it, the page feels slightly dead. If the user consciously notices it, it has failed.

---

## 1. SYSTEM STATUS

### Implemented in able-v7.html (confirmed in STATUS.md)
```
A4   — Sticky artist bar (frosted glass, fan-view, 70% hero trigger) ✅
A6   — Tab bar hide on scroll down / reveal up ✅ (A6 implied)
A10/D3 — Platform pill entrance (horizontal wave, translateX -8px→0, 50ms stagger) ✅
A11  — Artist name scale compression on scroll (48px→24px lerp over hero height) ✅
B1   — Scale-down on press (0.97) ✅
B3   — CTA background flash on tap (color-mix lighter accent) ✅
B4   — CTA glow on press (::after opacity pulse) ✅
B9   — Swipe-to-dismiss on bottom sheet ✅
B18  — Icon button scale on press ✅
B19  — Card tilt on hover (desktop, glass theme) ✅
C1   — Tab sliding indicator (spring, with overshoot) ✅
C2   — Campaign state hero crossfade ✅
C4   — Gig mode activation flash (one-time, session-flagged) ✅
C5   — Countdown digit flip (split-flap clock) ✅
C6   — "Out Now" live pulsing dot ✅
C7   — Gig badge warm glow pulse (::after opacity) ✅
D1   — Staggered card bloom on page load ✅
D2   — Hero name slide-up reveal ✅
D5   — Bottom sheet slide-up (spring entry) ✅
D12  — World Map modal enter ✅
D15  — Platform pill first-load shimmer (session-flagged) ✅
D20  — Snap card section slide-up on first visibility ✅
E1   — Fan sign-up input focus glow ✅
E4   — Fan sign-up email validation ✅
E6   — Fan sign-up button loading state ✅
E9   — Fan sign-up spring confirmation ✅
E11  — Error message delayed reveal (400ms after shake) ✅
E15  — Email blur validation (validate on blur, clear on retype) ✅
F1   — Skeleton shimmer loading state ✅
F9   — Progressive image load with placeholder ✅
F15  — Accent shimmer on artwork placeholder (loading state) ✅
G1   — Fan sign-up confetti-style spring particles ✅
G5   — Support purchase confirmation spring ✅
G7/E18 — Copy flash on share (300ms accent flash) ✅
H1   — Gig mode ambient glow (background intensification) ✅
H3   — Glass theme depth (backdrop-filter, multiple layers) ✅
H4   — Pre-release background intensification (H9: 0.12+0.16×(1-daysLeft/14)) ✅
H5   — Platform pill accent colour on active platform ✅
H9   — Pre-release ambient intensification (clamped 0.12–0.28) ✅
I2   — Section header fade-in on scroll ✅
I5   — Active tab tracking ✅
I7   — Tab scroll sync ✅
A4   — A11 confirmed ✅
```

**Confirmed in start.html:**
```
E10  — Progress bar spring easing (--spring, 0.55s) ✅
```

**Confirmed in admin.html:**
```
C16  — Gig mode countdown bar (thin depletion bar, time remaining) ✅
D13  — Fan list row stagger entrance (40ms per row, first load only) ✅
G14  — Stats counter animation (first load, session-flagged) ✅
```

---

## 2. GAP ANALYSIS — WHAT'S NOT YET CONFIRMED

### High priority gaps (should be in able-v7.html but not confirmed)

| Code | Interaction | Expected location | Why critical |
|---|---|---|---|
| B16 | `touch-action: manipulation` on all | able-v7.html `*` | Eliminates 300ms tap delay |
| C17 | Pre-release background intensification (day-by-day) | able-v7.html | Different from H9 — graduated tension |
| D7 | Skeleton → real content crossfade (200ms) | Music section cards | Polish |
| E15 | Email blur validation (admin fields) | admin.html profile fields | Input quality |

**STATUS.md confirms:** `touch-action: manipulation on * confirmed` ✅

### New interactions needed (not in MASTER doc, emerging from strategy cycle)

| New # | Interaction | Location | Spec |
|---|---|---|---|
| NEW-1 | Campaign HQ state button spring | admin.html | `stateSpringIn` keyframe on `.chq-state-btn.on` |
| NEW-2 | Timeline arc re-draw on state change | admin.html | arc-fill width transition 300ms |
| NEW-3 | Milestone card entrance (fan #1 etc) | admin.html | fadeSlide 0.3s var(--ease) |
| NEW-4 | "It's working" card entrance | admin.html | fadeSlide 0.3s var(--ease) |
| NEW-5 | First-run checklist completion | admin.html | individual step fades → completion line |
| NEW-6 | Contextual greeting sub-line cross-fade | admin.html | opacity 0→1 on text change |
| NEW-7 | @view-transition artist-name (wizard → profile) | start.html + able-v7.html | `view-transition-name: artist-name` |
| NEW-8 | @view-transition hero-cta (landing → wizard) | landing.html + start.html | `view-transition-name: hero-cta` |
| NEW-9 | @view-transition able-logo (admin → profile) | admin.html + able-v7.html | `view-transition-name: able-logo` |
| NEW-10 | Focus ring glow pattern (all pages) | All pages | `box-shadow: 0 0 0 2px bg, 0 0 0 4px acc, 0 0 0 6px rgba(acc, 0.25)` |
| NEW-11 | Fan list "new" badge appearance | admin.html + fan.html | No animation — just static badge, 24h TTL |
| NEW-12 | Gig mode bottom sheet (mobile) | admin.html | Standard bottom sheet spring |
| NEW-13 | Upgrade bottom sheet | admin.html | Standard bottom sheet spring |

---

## 3. THE COMPLETE INTERACTION SET (confirmed + new)

### Hierarchy of importance

**Tier 1 — Non-negotiable (every interactive element)**
- B1: Scale-down on press (0.97) — already implemented
- B16: `touch-action: manipulation` — confirmed
- B20 / NEW-10: Focus ring glow — confirmed on artist profile, needs glow version on admin
- E11/E15: Form validation — confirmed

**Tier 2 — Page-defining (make the page feel alive)**
- A4/A11: Sticky bar + artist name compression — confirmed
- A10/D3: Platform pill wave — confirmed
- C1: Tab sliding indicator — confirmed
- C4/C7: Gig mode flash + badge pulse — confirmed
- C5: Countdown digit flip — confirmed
- D1/D2: Page load bloom + hero name reveal — confirmed
- G1: Fan sign-up spring particles — confirmed
- H9: Pre-release ambient intensification — confirmed

**Tier 3 — Polish (elevate from good to exceptional)**
- D15: Platform pill shimmer (first load, session-flagged) — confirmed
- G7/E18: Copy flash on share — confirmed
- F15: Artwork placeholder shimmer — confirmed
- NEW-1 through NEW-6: Admin dashboard interactions (see above)

**Tier 4 — Progressive enhancement (Chrome 126+ / CSS-only bonus)**
- NEW-7, NEW-8, NEW-9: @view-transition shared elements

---

## 4. INTERACTION RULES (non-negotiable)

### The 10 laws

1. **`prefers-reduced-motion` throughout** — every animation that moves pixels must respect `@media (prefers-reduced-motion: reduce)`. Opacity fades are acceptable. Scale and translate must pause.

2. **`touch-action: manipulation` on everything tappable** — `* { touch-action: manipulation; }` globally. No 300ms delay anywhere.

3. **Spring for entrances, deceleration for exits** — spring (0.34,1.56,0.64,1) when things arrive. Deceleration (0.25,0.46,0.45,0.94) when things leave. Never the same easing both ways.

4. **Session-flag one-time animations** — any first-load animation (platform pill shimmer, stats counter, fan row stagger) must be session-flagged. Never replay on second visit.

5. **Never animate `box-shadow` in a loop** — use `::after` opacity or `filter: drop-shadow` for breathing effects. `box-shadow` repaint is expensive.

6. **Never animate `filter: blur()` in a loop** — it causes constant GPU repaints. Use `opacity` for breathing. Use `blur` only on entrance/exit (once).

7. **Cap stagger at 6 items** — beyond 6 items in a stagger sequence, reduce to 30ms per item or use only first 6. Long staggers feel slow on mobile.

8. **rAF for scroll-driven animations** — scroll listeners must be requestAnimationFrame-throttled. Never call DOM mutations directly in scroll events.

9. **`will-change: transform` only when needed** — add it before an animation starts and remove it after. Never add it statically to dozens of elements.

10. **All 4 themes must work** — Dark, Light, Glass, Contrast. Test every new interaction on all 4. Glass theme has the richest interactions (backdrop-filter, ambient glow). Contrast theme must have zero decorative animations.

---

## 5. CROSS-PAGE INTERACTION COHERENCE

### Shared animation language

All pages use the same easing tokens:
```css
--spring: cubic-bezier(0.34,1.56,0.64,1);
--ease:   cubic-bezier(0.25,0.46,0.45,0.94);
```

### Cross-page view transitions (NEW)
```css
/* landing.html → start.html */
.hero-cta-primary    { view-transition-name: hero-cta; }

/* start.html Done → able-v7.html */
.done-preview-artist-name { view-transition-name: artist-name; }

/* admin.html → able-v7.html */
.sb-logo-type        { view-transition-name: able-logo; }
```

These create shared-element transitions when navigating between pages. Progressive enhancement: Chrome 126+, graceful degradation in all other browsers.

---

## 6. PERFORMANCE BUDGET FOR INTERACTIONS

| Metric | Budget | Enforcement |
|---|---|---|
| Initial interaction (first tap) | ≤ 100ms perceived | Spring easing, no JS dependencies |
| Animation frame budget | 60fps / 16ms per frame | rAF for scroll, CSS for touch |
| GPU layers created at once | ≤ 10 | `will-change` management |
| `prefers-reduced-motion` compliance | 100% | Test with DevTools override |

---

## 7. IMPLEMENTATION CHECKLIST

For each new page build:

```
□ * { touch-action: manipulation; }
□ @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
□ *:focus-visible { glow ring pattern }
□ Session flags on all first-load animations
□ Test all 4 themes: Dark, Light, Glass, Contrast
□ Test on 375px (iPhone SE) and 430px (iPhone Pro)
□ Scroll animations: rAF-throttled
□ No box-shadow in loops (use ::after opacity)
□ No filter: blur in loops (use opacity)
□ Max 6 items in any stagger sequence
□ @view-transition added (Chrome 126+ progressive enhancement)
```

---

## 8. SCORE ASSESSMENT

**Current score: 9.5 → 10 path documented in MICRO_INTERACTIONS_PATH_TO_10.md**

What's excellent:
- 30+ interactions confirmed implemented in able-v7.html
- All major patterns correct (spring easing, session-flagging, rAF for scroll, prefers-reduced-motion)
- New interaction additions specced for admin.html (6 new interactions)
- Cross-page view transitions specced for all 3 transition points

What prevents 10:
- `@view-transition` is Chrome 126+ only — the 0.5 gap is browser coverage
- Focus ring on admin.html uses flat 2px outline — glow pattern needed
- admin.html interactions (NEW-1 through NEW-6) are specced but not yet built

**Ceiling at 9.7/10:** The 0.3 gap is cross-browser view-transition coverage. A 10 would require a JavaScript polyfill for Firefox/Safari (available via `startViewTransition` API check + fallback).
