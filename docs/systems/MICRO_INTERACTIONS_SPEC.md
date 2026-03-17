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

---

## 9. COMPREHENSIVE GAP AUDIT — 2026-03-16

> Every moment in the product that previously had no specified micro-interaction, empty state, loading state, or success/error state. All gaps below are now fully specced.

---

### LOADING STATES

---

### LS-1: Profile page initial load (cold visit — no localStorage)

**State:** able-v7.html, first visit, no artist data
**Trigger:** Page mounts, `safeGet('able_v3_profile', null)` returns null
**Duration:** 0ms–600ms max (resolves as soon as localStorage loads or times out)
**Visual:**
```css
/* Skeleton shimmer — applied to .hero-skel, .cta-skel, .fan-capture-skel */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
}
.skel {
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.6s ease-in-out infinite;
  border-radius: var(--r-md);
  aria-hidden: true;
}

/* Hero name skeleton: 60% width, 56px height, centred */
.hero-skel-name { width: 60%; height: 56px; margin: 0 auto; }

/* CTA skeleton: full width, 56px height */
.hero-skel-cta  { width: 100%; height: 56px; }

/* Fan capture skeleton: 100% width, 44px height */
.fan-skel-input { width: 100%; height: 44px; }
```
**Fallback timeout:** `setTimeout(resolveSkeletons, 600)` — after 600ms, if data still hasn't loaded, silently continue with defaults. Never leave skeletons indefinitely.
**Accessibility:** All `.skel` elements must carry `aria-hidden="true"` and `aria-busy="true"` on their container. When resolved: `aria-busy="false"`.
**Copy:** None (skeletons are visual only)

---

### LS-2: Profile page warm visit (localStorage exists)

**State:** able-v7.html, return visit with profile data
**Trigger:** Page mounts, `safeGet('able_v3_profile', null)` returns a valid profile
**Duration:** 0ms — render is immediate from localStorage, no loading state shown
**Visual:** No skeleton. Content renders in a single frame. `D1` (staggered card bloom) and `D2` (hero name slide-up) play as normal entrance animations.
**Copy:** N/A

---

### LS-3: Fan sign-up submission

**State:** able-v7.html, fan capture section
**Trigger:** Fan taps submit with a valid email
**Duration:** 300ms loading phase → then success or error
**Visual:**
```css
/* Button loading state — replace label with spinner inline */
.fan-capture__btn.loading {
  pointer-events: none;
  opacity: 0.8;
}
.fan-capture__btn.loading .btn-label { opacity: 0; }
.fan-capture__btn.loading .btn-spinner { display: inline-block; }

/* Spinner — CSS-only, no SVG dependency */
.btn-spinner {
  display: none;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: var(--color-on-accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
@keyframes spin { to { transform: translateX(-50%) rotate(360deg); } }
```
**Optimistic pattern:** Loading state fires immediately on submit (before any Supabase call). Fan never sees a blocked UI.
**Accessibility:** `aria-busy="true"` on button during loading; `aria-live="polite"` on `#signupMessage` for result announcement.

---

### LS-4: Spotify import in progress (start.html)

**State:** start.html, Screen 0 or Screen 5 (Links)
**Trigger:** Artist pastes a Spotify URL and presses import / focus leaves field
**Duration:** Up to 5s max (Netlify function timeout); shows inline spinner
**Visual:**
```css
/* Inline spinner next to the URL input field */
.spotify-import-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--color-muted);
  margin-top: 6px;
  height: 20px;
}
.spotify-import-status .import-spinner {
  width: 14px; height: 14px;
  border: 1.5px solid rgba(255,255,255,0.2);
  border-top-color: #1ed760;  /* Spotify green */
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.spotify-import-status .import-text {
  font-size: 12px;
  color: var(--color-muted);
}
```
**Copy during load:** "Looking up your Spotify..."
**On success (field population):** Spinner → green checkmark (✓) + "Found [Artist Name]" for 1.5s → checkmark fades out. Fields populate with spring animation (scale 0.98 → 1, 200ms).
**On failure:** See error states ES-5.
**Never block the wizard** — if import takes >5s or fails, silently continue to manual entry.
**Accessibility:** `aria-live="polite"` on `.spotify-import-status`. When import completes, announce "Profile imported from Spotify."

---

### LS-5: Show list loading (admin.html)

**State:** admin.html, Shows section
**Trigger:** Section mounts, loading from localStorage/Supabase
**Duration:** 0ms (localStorage is synchronous); for Supabase: skeleton persists until data resolves
**Visual:**
```html
<!-- 3 skeleton show rows while loading -->
<div class="show-row skel" aria-hidden="true">
  <div class="skel-date-block skel" style="width:44px;height:52px;"></div>
  <div class="skel-show-info">
    <div class="skel" style="width:55%;height:14px;"></div>
    <div class="skel" style="width:35%;height:11px;margin-top:6px;"></div>
  </div>
</div>
```
**Resolve:** Skeleton rows crossfade to real content (opacity 0→1, 200ms `--ease-decel`) once data arrives.
**Max wait:** 600ms timeout — resolves skeleton regardless, shows empty state if no data.

---

### LS-6: Fan list loading (admin.html)

**State:** admin.html, Fans page
**Trigger:** Page mounts, `safeGet('able_fans', [])` called
**Duration:** 0ms for localStorage; Supabase: up to 600ms
**Visual:** 3 skeleton fan rows (same shimmer pattern), each with circular avatar block + two line skeletons. First load only — session-flagged after first resolution.
**Resolve:** `D13` (fan list row stagger entrance) plays on first load. On subsequent loads: instant render with no stagger (session-flagged).

---

### LS-7: Analytics data loading (admin.html)

**State:** admin.html, Home page stat cards
**Trigger:** Page mounts, resolveStats() called
**Duration:** 0ms for localStorage; up to 600ms
**Visual:**
```css
/* Stat value skeleton — same width as a 3-digit number */
.stat-value.skel { width: 64px; height: 28px; border-radius: var(--r-sm); }
.stat-label.skel { width: 48px; height: 10px; border-radius: var(--r-sm); margin-top: 4px; }
```
**Resolve:** `G14` (stats counter animation) plays on first load when count > 0. On first load with all zeros: no counter animation, numbers appear immediately (counting 0 to 0 is meaningless).
**Max wait:** `setTimeout(resolveStats, 600)` — hard timeout.

---

### LS-8: Email broadcast sending (admin.html — Artist Pro tier)

**State:** admin.html, Broadcasts compose screen
**Trigger:** Artist taps "Send to [N] fans"
**Duration:** 2–8s (Netlify function → Resend)
**Visual:**
```css
/* Full-button loading state on send button */
.broadcast-send-btn.loading {
  pointer-events: none;
  background: rgba(var(--acc-rgb), 0.5);
}
/* Replace label text with spinner + "Sending..." */
```
**Copy during send:** "Sending to [N] fans..."
**Progress indication:** A thin amber progress bar under the button animates from 0% to 90% over 4s (CSS animation, not tied to actual progress — gives sense of movement). On completion: snaps to 100% → fades out.
**On success:** See SS-4.
**On failure:** See ES-6.
**Accessibility:** `aria-live="assertive"` on result announcement (broadcast sends are high-stakes).

---

### LS-9: Snap card publishing (admin.html)

**State:** admin.html, Snap Cards section
**Trigger:** Artist taps "Publish" or "Save"
**Duration:** 300ms (localStorage write; Supabase when backend lands)
**Visual:** Button transitions to loading state (spinner replaces label, 150ms). On success: immediate toast "Saved." + card appears in list with `fadeSlide 0.3s var(--ease)` animation.
**Accessibility:** Toast carries `role="status"` + `aria-live="polite"`.

---

### EMPTY STATES

---

### ES-1: No shows added yet

**State:** able-v7.html (fan view) + admin.html
**Trigger:** `able_shows` is empty array or absent

**Fan view (able-v7.html):** Shows section hidden entirely. No "no shows" message. The page renders as if the section does not exist. This is intentional — fans should never see a placeholder for content the artist hasn't created.

**Admin view (admin.html):**
```html
<div class="state-empty">
  <p class="state-empty__text">No shows listed yet.</p>
  <p class="state-empty__text" style="margin-top:4px;font-size:12px;opacity:0.6;">
    Add one and it'll appear on your profile.
  </p>
  <button class="state-empty__action" onclick="openAddShowSheet()">Add a show</button>
</div>
```
**Copy:** "No shows listed yet." / "Add one and it'll appear on your profile." / Button: "Add a show"
**Visual:** `.state-empty` as defined in error-states/SPEC.md. No icon. No emoji. Neutral tone.

---

### ES-2: No fans signed up yet

**State:** admin.html, Fans page
**Trigger:** `safeGet('able_fans', [])` returns empty array

**Visual:**
```html
<div class="state-empty" style="text-align:center;padding:40px 24px;">
  <p class="state-empty__text" style="font-size:14px;font-weight:600;">No fans yet.</p>
  <p class="state-empty__text" style="margin-top:8px;font-size:12px;max-width:240px;margin-left:auto;margin-right:auto;">
    When someone signs up, they'll appear here.
  </p>
  <div style="margin-top:20px;">
    <p style="font-size:11px;color:var(--dash-t3);">Your page link:</p>
    <button onclick="copyPageLink()" class="copy-link-btn">
      ablemusic.co/[slug] — tap to copy
    </button>
  </div>
</div>
```
**Copy:** "No fans yet." / "When someone signs up, they'll appear here." + page URL with copy button.
**The copy button** is the key — an empty fan list is solved by sharing the link. The empty state makes this the obvious next action.

---

### ES-3: No snap cards created

**State:** admin.html, Snap Cards section + able-v7.html (fan view)
**Trigger:** `able_snap_cards` is empty or absent

**Fan view:** Snap card strip hidden entirely.

**Admin view:**
```html
<div class="state-empty">
  <p class="state-empty__text" style="font-size:14px;font-weight:600;">Nothing posted yet.</p>
  <p class="state-empty__text" style="font-size:12px;margin-top:4px;">
    Snap cards are short updates that appear on your profile — a note, a photo, a thought.
  </p>
  <button class="state-empty__action" onclick="openNewSnapCard()">Post your first update</button>
</div>
```
**Copy:** "Nothing posted yet." / "Snap cards are short updates that appear on your profile — a note, a photo, a thought." / Button: "Post your first update"

---

### ES-4: No broadcasts sent (admin.html — Artist Pro tier)

**State:** admin.html, Broadcasts section
**Trigger:** No broadcast records, Artist Pro tier

**Visual:** Blurred preview of the broadcast compose screen + overlay:
```html
<div class="tier-gate-overlay">
  <p class="tgo-heading">Send an email to your list.</p>
  <p class="tgo-sub">[N] people are waiting to hear from you.</p>
  <button class="tgo-cta" onclick="openUpgradeSheet('broadcasts')">
    Artist plan — £9/mo
  </button>
</div>
```
**Copy:** "Send an email to your list." / "[N] people are waiting to hear from you." / Button: "Artist plan — £9/mo"
Note: The `[N]` fan count is live — pulls from `able_fans.length`. The specific number makes the upgrade CTA personal, not generic.

**For artists already on Artist Pro tier with no broadcasts sent:**
```html
<div class="state-empty">
  <p class="state-empty__text">No broadcasts yet.</p>
  <p class="state-empty__text" style="font-size:12px;margin-top:4px;">
    Write something worth sharing. It doesn't have to be a big announcement.
  </p>
  <button class="state-empty__action" onclick="openBroadcastCompose()">Write a broadcast</button>
</div>
```
**Copy:** "No broadcasts yet." / "Write something worth sharing. It doesn't have to be a big announcement."

---

### ES-5: No merch added

**State:** able-v7.html (fan view) + admin.html
**Trigger:** `profile.merch` is empty or absent

**Fan view:** Merch section hidden entirely. No placeholder.

**Admin view:**
```html
<div class="state-empty">
  <p class="state-empty__text">No merch added.</p>
  <p class="state-empty__text" style="font-size:12px;margin-top:4px;">
    Add a link to your merch store or individual products.
  </p>
  <button class="state-empty__action" onclick="openAddMerchSheet()">Add merch</button>
</div>
```

---

### ES-6: Fan dashboard — following no artists yet

**State:** fan.html, Following tab
**Trigger:** `fan_following` is empty or absent
**Visual:**
```html
<div class="empty-state">
  <p class="empty-state__heading">No artists here yet.</p>
  <p class="empty-state__body">
    Find artists from their pages, or look through Discover.
  </p>
  <a class="empty-state__cta" href="#discover">Go to Discover →</a>
</div>
```
**Copy:** "No artists here yet." / "Find artists from their pages, or look through Discover." / Link: "Go to Discover →"
**Visual rules:** `.empty-state` as defined in fan.html DESIGN-SPEC.md. No emoji. No icon. Text and optional CTA only.

---

### ES-7: Analytics — no data yet (new artist, Day 1)

**State:** admin.html, stat cards with all-zero data
**Trigger:** `isDay1 = views.length === 0 && fans.length === 0`
**Visual:** Stat cards show `0` but replace the standard delta with a contextual nudge:
```javascript
// In resolveStats():
if (isDay1) {
  viewDelta.textContent = 'Day 1 ✦';
  viewDelta.style.color = 'var(--dash-amber)';
}
```
**Copy on stat cards:** Views: "Day 1 ✦" / Clicks: "Day 1 ✦" / Fans: "Day 1 ✦"
**Below stat cards:** A specific nudge card appears (session-flagged, dismissible):
```html
<div class="nudge-card" id="day1Nudge">
  <p style="font-size:13px;font-weight:600;">Share your page to start seeing numbers.</p>
  <button onclick="copyPageLink()" style="margin-top:8px;">Copy your page link</button>
</div>
```
**Copy:** "Share your page to start seeing numbers." Not "No data yet." — the stat cards already communicate zero. The nudge card communicates the action.

---

### ES-8: Admin first visit — nothing configured

**State:** admin.html, first-ever visit (`!localStorage.getItem('admin_ever_visited')`)
**Trigger:** Admin loads with `frc_done` not set
**Visual:** `data-stage="new"` triggers the First-Run Checklist card to appear at position 1 (above Campaign HQ). See admin DESIGN-SPEC.md §13 for full first-run checklist spec.
**Copy (key strings):** "Four things, then you're live." / Steps as defined in admin DESIGN-SPEC.md §13.
**No other special treatment** — the admin page is fully functional from day 1. The checklist supplements rather than replaces the dashboard.

---

### SUCCESS STATES

---

### SS-1: Fan signs up

**State:** able-v7.html, fan capture section
**Trigger:** Valid email submitted, `safeSet('able_fans', [...])` succeeds
**Duration:** 80ms loading → 300ms confirm animation → echo persists on page
**Visual sequence:**
1. Button spinner (LS-3) fires optimistically before localStorage call
2. On success: button transitions from spinner → checkmark (`✓`) with spring scale (scale 0.8→1, 250ms `--ease-spring`)
3. Confetti burst: `G1` — 40 particles, accent + white, spring-out from button, 600ms
4. Form fades out (opacity 1→0, 200ms)
5. Echo message fades in (opacity 0→1, 300ms, delayed 200ms after form fade):

```html
<p class="fan-capture__echo" role="status" aria-live="polite">
  We've got you — [email] is on [Artist Name]'s list.
</p>
```

**Echo CSS:**
```css
.fan-capture__echo {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text);
  text-align: center;
  line-height: 1.5;
  animation: fadeIn 300ms 200ms var(--ease-decel) both;
}
.fan-capture__echo em {
  color: var(--color-accent);
  font-style: normal;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
```

**Copy:** "We've got you — [email] is on [Artist Name]'s list."
**The form does not reset** — it is replaced by the echo. Prevents double submission. Echo persists for the session.
**Accessibility:** `role="status"` + `aria-live="polite"` on echo. Screen reader announces the confirmation.

---

### SS-2: Artist publishes a snap card

**State:** admin.html, Snap Cards section
**Trigger:** Save confirmed (localStorage write successful)
**Duration:** 150ms
**Visual:**
- Button loading state resolves to normal state (no special success animation on the button — the card appearing IS the confirmation)
- New snap card appears in the list with `fadeSlide 0.3s var(--ease) both` entrance
- Toast: "Saved." (2200ms, auto-dismiss)
**Copy:** Toast: "Saved."

---

### SS-3: Artist sets a show live

**State:** admin.html, Shows section
**Trigger:** Show saved successfully
**Duration:** 150ms
**Visual:**
- New show row enters list with `fadeSlide 0.3s var(--ease) both`
- Toast: "Show added."
- Admin.html mini phone preview (CHQ iframe, desktop only) will reflect the change on next iframe load
**Copy:** Toast: "Show added."

---

### SS-4: Artist sends a broadcast

**State:** admin.html, Broadcasts section
**Trigger:** Netlify function returns success (all emails queued)
**Duration:** 2–8s (see LS-8) → success
**Visual:**
- Progress bar snaps to 100% → fades out (200ms)
- Button returns to normal state
- Send button label changes to "Sent to [N] fans" for 3s then returns to default
- Toast: "Sent to [N] fans." — amber tone (not green — this is a significant action, amber signals importance)
- A broadcast record appears in the broadcast history list with `fadeSlide 0.3s var(--ease) both`
**Copy:** Button: "Sent to [N] fans" / Toast: "Sent to [N] fans."

---

### SS-5: Artist upgrades their tier

**State:** admin.html, upgrade bottom sheet
**Trigger:** Stripe payment confirmed (webhook → Supabase → admin.html receives success signal)
**Duration:** 300ms
**Visual:**
- Upgrade sheet closes with spring exit (translateY 0 → 100%, 250ms `--ease-accel`)
- Page re-renders with tier gates removed (any blurred/locked sections unlock)
- Toast: "You're on Artist plan." (amber, persists until dismissed)
- Previously locked features gain a brief accent flash (200ms `--color-accent` background flash on their container, then returns to normal) — signals "this is now yours"
**Copy:** Toast: "You're on Artist plan." (or "Pro" / "Label" as appropriate)

---

### SS-6: Artist's release goes live (countdown hits zero)

**State:** able-v7.html, pre-release state → live state auto-switch
**Trigger:** `releaseDate` timestamp reached (`now >= releaseDate`)
**Duration:** 300ms crossfade
**Visual:**
- Campaign state crossfade: `C2` fires — pre-release hero content crossfades to live state content (opacity 0→1, 300ms `--ease-decel`)
- State chip animates: amber "Pre-release" chip → red "Out now" chip with `stateSpringIn` keyframe
- Hero background intensification resets: `H9` gradient overlay reduces (release tension resolves)
- `C6` ("Out now" pulsing dot) activates

**Artist-facing (admin.html):**
- Admin.html detects state change on next load/refresh
- Greeting sub-line updates to: "[Title] is out. This is your window."
- Campaign HQ pill changes from amber "Pre-release" to red "Live"
- A one-time nudge card: "Your release is live. You have 14 days of peak momentum — share your page now."

**Fan-facing:** Transition happens silently on their next page view. No animation triggers mid-session — state is recalculated on each page load. If a fan happens to have the page open at the moment of release (unlikely), the state chip will update on the next scroll-triggered render cycle.

**Copy (admin nudge):** "Your release is live. You have 14 days of peak momentum — share your page now."
**Accessibility:** State chip aria-label updates from "Pre-release" to "Out now". `aria-live="polite"` on the chip container for screen reader announcement.

---

### ERROR STATES (Gaps not covered by error-states/SPEC.md)

---

### ER-1: Sign-up fails (network error)

**State:** able-v7.html, fan capture
**Trigger:** Supabase insert fails due to network error (`navigator.onLine === false` or fetch rejection)
**Visual:** Optimistic UI fires regardless (confetti, echo — see SS-1). Error is **silent to the fan**. The sign-up attempt is queued for retry when online.
**Retry logic:**
```javascript
// Queue failed sign-up for retry
function queueFailedSignup(email, fanData) {
  const queue = safeGet('able_signup_queue', []);
  queue.push({ ...fanData, queued_at: Date.now() });
  safeSet('able_signup_queue', queue);

  // Retry on reconnect
  window.addEventListener('online', flushSignupQueue, { once: true });
}

function flushSignupQueue() {
  const queue = safeGet('able_signup_queue', []);
  if (!queue.length) return;
  queue.forEach(item => submitFanSignup(item));
  safeSet('able_signup_queue', []);
}
```
**Copy:** None shown to fan — the optimistic state is the truth as far as they know.
**Log:** `console.warn('[ABLE] Sign-up queued for retry', email)` for debugging.

---

### ER-2: Sign-up fails (already signed up)

**State:** able-v7.html, fan capture
**Trigger:** `validateFanSignUp()` detects duplicate email (already in `able_fans`)
**Visual:** Form does not submit. No error shake. Below the input:
```html
<p class="signup-message signup-message--success">You're already on the list.</p>
```
**Copy:** "You're already on the list."
**Colour:** Green (`#34c759`) — this is reassurance, not an error.
**No confetti** — the fan is already on the list. Confetti would misrepresent the situation.
**Accessibility:** `aria-live="polite"` announces the message to screen readers.

---

### ER-3: Spotify import fails (start.html)

**Trigger / copy:** All 5 failure modes are specced in error-states/SPEC.md PATTERN 4. The gap closed here is the **visual recovery animation**:

After the error message appears, the "Skip and fill in manually" button appears with `fadeIn 200ms var(--ease-decel)`. The input border transitions to amber (not red — this is not a user mistake, it is a service failure) in 150ms. On "Skip" tap: the error message fades out, the input border returns to normal, and the wizard advances to the next screen with standard slide-right transition.

**CSS:**
```css
.spotify-url-input.import-error {
  border-color: var(--color-amber);
  transition: border-color 150ms var(--ease-standard);
}
```

---

### ER-4: Show save fails (admin.html)

**State:** admin.html, Shows section, add/edit sheet
**Trigger:** localStorage write fails (`safeSet` returns false) or Supabase insert fails
**Visual:**
- Save button returns to normal state (not loading)
- Inline error below the form (not a toast — the user needs to see it adjacent to the action):
```html
<p class="field-error" aria-live="assertive">
  Didn't save — try again?
</p>
```
**Copy:** "Didn't save — try again?"
**The sheet stays open** — user should not have to re-enter their show data. Error clears on next valid save attempt.

---

### ER-5: Broadcast send fails (admin.html)

**State:** admin.html, Broadcasts
**Trigger:** Netlify function returns non-2xx, or network failure
**Visual:**
- Progress bar pauses at its current position → transitions to red (`var(--dash-red)`) in 200ms
- Button returns to normal state with label "Try again"
- Toast (red): "Broadcast didn't send — try again?"
- Toast persists until dismissed (does not auto-dismiss — this is a high-stakes failure)
**Copy:** Toast: "Broadcast didn't send — try again?" / Button: "Try again"
**Accessibility:** `aria-live="assertive"` — high-stakes failure must be announced immediately.

---

### ER-6: Payment fails (upgrade sheet)

**State:** admin.html, upgrade bottom sheet → Stripe redirect/embed
**Trigger:** Stripe webhook returns `payment_intent.payment_failed`
**Visual:**
- User is returned to admin.html with `?payment=failed` query param
- Admin.html detects param on init and shows toast (red): "Payment didn't go through — try a different card?"
- Upgrade bottom sheet does not re-open automatically — the artist can tap any gate CTA to retry
- Query param is cleaned from URL: `history.replaceState({}, '', window.location.pathname)`
**Copy:** "Payment didn't go through — try a different card?"

---

### CAMPAIGN STATE TRANSITIONS

---

### CST-1: Profile → Pre-release (artist sets a release date)

**Artist sees (admin.html):**
- Campaign HQ: `stateSpringIn` on pre-release button (scale 0.94→1, 280ms `--spring`)
- Accent left border transitions to amber (`#fbbf24`, 300ms)
- Timeline arc re-draws: `NEW-2` — arc-fill animates to new pre-release position (300ms)
- Greeting sub-line crossfades: `NEW-6` — fades to "[N] days until [Title]."
- Auto-switch hint appears below state buttons: "Switches to Live automatically on [date]."

**Fan sees (able-v7.html):**
- Next page visit: state chip crossfades (80ms `--dur-instant`) from cyan "Profile" chip to amber "Pre-release" countdown
- Hero artwork transitions: release artwork slides in (translateX -20px→0, opacity 0→1, 400ms `--ease-decel`)
- `H9` pre-release ambient intensification begins: overlay opacity at `0.12 + 0.16 × (1 - daysLeft/14)` (clipped to max 0.28)
- Fan capture copy updates to pre-release state strings (see UX SPEC Part 6)
- No visual flash or jarring transition — state chip is the only element that changes above the fold

---

### CST-2: Pre-release → Live (release date arrives)

**Artist sees (admin.html):**
- Same spring-in on Live button
- Accent left border transitions to red (`#ef4444`, 300ms)
- Greeting sub-line: "[Title] is out. This is your window."
- One-time nudge card: "Your release is live. You have 14 days of peak momentum — share your page now." (fadeSlide 0.3s entrance, dismissible via ×)

**Fan sees (able-v7.html):**
- `C2` hero crossfade: pre-release countdown fades out, live artwork fades in (crossfade 300ms `--ease-decel`)
- `C5` countdown disappears: chip animates out (scale 1→0.9, opacity 1→0) then "Out now" chip animates in (scale 0.9→1, opacity 0→1) via `stateSpringIn`
- `C6` pulsing dot activates on "Out now" chip
- `H9` ambient intensification clears: overlay opacity reduces back to 0.12 (transition 600ms `--ease-decel`)
- Primary CTA copy changes from "Pre-save" to "Stream [Title]" — this is the biggest change above the fold

---

### CST-3: Live → Profile (14 days after release)

**Artist sees (admin.html):**
- Greeting sub-line: "Your page, your list, your relationship." (post-release default)
- Campaign HQ returns to profile state
- No special card or notification — the window closing is not a loss event, it's a return to normal

**Fan sees (able-v7.html):**
- `C2` crossfade: "Out now" chip fades out, primary CTA changes to streaming link
- No dramatic transition — profile state is the quiet default

---

### CST-4: Profile → Gig (gig mode toggled)

**Artist sees (admin.html):**
- `C4` gig mode activation flash: one-time `#8b1e1e` background flash on Campaign HQ header (200ms, session-flagged)
- `H1` ambient glow intensification begins in admin mini-phone preview
- `C16` gig countdown bar appears: thin depletion bar under Campaign HQ, amber → depletes over 24h
- Greeting sub-line: "You're on tonight."

**Fan sees (able-v7.html):**
- Next page visit: "On tonight" chip with `C7` warm glow pulse (::after opacity animation, 2s infinite)
- `H1` ambient glow: background intensification behind the hero
- Primary CTA changes to "Get tickets"
- Fan capture heading: "I'm playing tonight."

**Gig mode is a manual toggle** — the transition does not happen on a schedule. The fan sees it on their next page load.

---

### CST-5: Gig → Profile (gig expires after 24h)

**Artist sees (admin.html):**
- `C16` countdown bar depletes to 0 and fades out (opacity 1→0, 300ms)
- Gig toggle returns to off state
- Greeting sub-line (within 24h of gig ending): "Last night at [Venue]. [N] fan[s] joined."
- After 24h: returns to default sub-line

**Fan sees (able-v7.html):**
- Next page visit: "On tonight" chip fades out, profile state chip appears
- Ambient glow clears
- Fan capture copy returns to profile-state strings

---

### ADDITIONAL GAPS CLOSED

---

### AG-1: Duplicate fan sign-up — admin notification

**State:** admin.html, Fan list
**What was missing:** When a fan who is already on the list re-submits their email (returning to the page), the fan sees the reassurance message (ER-2). The admin never sees a duplicate entry or any notification. This is correct behaviour and is now explicitly specced: **duplicate sign-up attempts are silently discarded at the client level. No admin notification. No admin fan list entry.** The fan count stays accurate.

---

### AG-2: Fan capture consent checkbox state

**State:** able-v7.html, fan capture section
**What was missing:** The consent checkbox transition is not specced.
- Default: unchecked (`<input type="checkbox" required>`)
- On check: a spring scale pulse on the checkbox container (scale 0.97→1.03→1, 150ms)
- Submit button: disabled until checkbox is checked. The visual difference between enabled and disabled submit: `opacity: 0.4` on the button label when unchecked; full opacity + glow when checked. Transition: 150ms.
- If user taps submit without checking: checkbox container shakes (`error-shake` keyframe, 400ms) + inline copy below: "Just tick the box — then you're in."
**Copy:** "Just tick the box — then you're in."

---

### AG-3: Artist name compression scroll state (A11) — cross-theme check

**State:** able-v7.html, all 4 themes, on scroll
**What was missing:** Glass theme behaviour when artist name compresses. The sticky bar uses `backdrop-filter: blur(28px) saturate(180%)` in glass theme — this must not degrade when the artist name compresses into it. The sticky bar must remain legible against both the blurred artwork background AND the unblurred page content scrolling behind it.
**Spec addition:** In glass theme, `.sticky-artist-bar` uses `backdrop-filter: blur(20px) saturate(140%)` (reduced from the standard glass theme backdrop — too much saturation on the thin bar looks garish). Additionally, `background: rgba(255,255,255,0.06)` is set explicitly on the sticky bar in glass theme to give it slight distinction from the general glass surface.

---

### AG-4: First-run checklist step completion animations

**State:** admin.html, First-Run Card (data-stage="new")
**What was missing:** Individual step completion animations.
- On step tap (navigating to the relevant section): step label fades to accent colour (150ms) + a thin amber underline slides in from left (width 0→100%, 200ms `--ease-decel`)
- On return with step completed: step row transitions to completed style (checkmark appears with `stateSpringIn` scale animation, 200ms; label opacity drops to 0.5)
- On all 4 steps complete: `onFirstRunComplete()` as specced in admin DESIGN-SPEC.md §13

---

### AG-5: Tier gate gold lock overlay animation

**State:** All pages, tier-gated features
**What was missing:** The gold lock overlay entrance animation.
- On first render: overlay fades in (opacity 0→1, 200ms `--ease-decel`). Not a spring — the lock overlay should feel inevitable, not bouncy.
- On hover (desktop): overlay `background-color` lightens slightly (`rgba(var(--acc-rgb), 0.06)` → `rgba(var(--acc-rgb), 0.10)`, 150ms)
- On tap: brief scale pulse (0.99→1, 100ms) before opening upgrade sheet
- Blur on gated content: `filter: blur(4px)` on the preview content. Transition: `filter 200ms` on mount. Do not animate blur in a loop.

---

### AG-6: PWA install prompt (fan.html, Phase 2)

**State:** fan.html, after 3rd visit
**What was missing:** The PWA install prompt interaction is referenced in fan.html DESIGN-SPEC.md but not specced in detail.
- Trigger: `beforeinstallprompt` event, 3rd visit or later (session-count stored in localStorage), shown once only
- Presentation: a bottom-of-screen banner (not a modal, not the browser default prompt):
```html
<div class="pwa-prompt" id="pwaBanner" aria-live="polite">
  <p class="pwa-prompt__text">One tap to see what's new from your artists.</p>
  <div class="pwa-prompt__actions">
    <button onclick="installPWA()">Add to home screen</button>
    <button onclick="dismissPWA()">Not now</button>
  </div>
</div>
```
- Entry animation: `translateY(100%)→translateY(0)`, `--ease-spring`, 350ms — same as bottom sheet
- Dismiss: `translateY(0)→translateY(100%)`, `--ease-accel`, 250ms
- "Not now" sets `pwa_prompt_dismissed = true` in localStorage — never shows again

---

## 10. AUDIT SUMMARY

| Category | Total specced in this audit |
|---|---|
| Loading states | 9 (LS-1 through LS-9) |
| Empty states | 8 (ES-1 through ES-8) |
| Success states | 6 (SS-1 through SS-6) |
| Error states | 6 (ER-1 through ER-6) |
| Campaign state transitions | 5 (CST-1 through CST-5) |
| Additional gaps closed | 6 (AG-1 through AG-6) |
| **Total** | **40 gaps closed** |

**Interactions already specced before this audit:** 30+ (Sections 1–8)
**Total interaction spec count:** 70+

All 40 gaps above were either completely absent from the spec or existed as vague references ("a spinner", "a toast") without exact CSS, copy, duration, or accessibility spec.
