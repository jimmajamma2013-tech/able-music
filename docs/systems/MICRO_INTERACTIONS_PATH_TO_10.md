# ABLE — Micro-Interactions: Path to 10/10
**Created: 2026-03-16 | References: MICRO_INTERACTIONS_SPEC.md**

> This document closes the 0.5-point gap between the current 9.5/10 micro-interactions system and a true 10. Three gaps to close: browser coverage, focus ring, and 6 unbuilt admin interactions.

---

## Current State: 9.5/10 — Ceiling 9.7/10 (without polyfill)

### What is excellent

- 30+ interactions confirmed implemented in `able-v7.html` — the richest single-file interaction layer in the codebase
- All major patterns correct: spring easing, session-flagging, rAF for scroll, `prefers-reduced-motion` compliance
- 6 new admin interactions specced (NEW-1 through NEW-6)
- 3 cross-page `@view-transition` transitions specced for all navigation points
- `touch-action: manipulation` confirmed globally

### The ceiling explained

The spec scores the system at 9.5/10 with a hard ceiling of 9.7/10 due to `@view-transition` browser coverage (Chrome 126+ only). With a proper JS polyfill check, the ceiling rises to 10/10 — cross-browser parity means the progressive enhancement is actually safe to ship rather than just bonus behaviour.

---

## Gap 1 — `@view-transition` browser coverage

### The problem

`@view-transition` with `view-transition-name` is Chrome 126+ only. Firefox and Safari do not support `document.startViewTransition()`. Without a guard, the transition-name properties linger in the DOM on unsupported browsers, causing potential paint artefacts and layout isolation issues (elements with `view-transition-name` create their own stacking context).

### The fix — polyfill check pattern

Every page that uses `@view-transition` (`able-v7.html`, `start.html`, `admin.html`, `landing.html`) must wrap the `startViewTransition` call in a capability check. Any JavaScript that triggers a cross-page navigation should use this pattern:

```javascript
// Pattern: startViewTransition with graceful fallback
function navigateWithTransition(url) {
  if (!document.startViewTransition) {
    // Browser does not support View Transitions — just navigate
    window.location.href = url;
    return;
  }
  document.startViewTransition(() => {
    window.location.href = url;
  });
}
```

For same-page transitions (e.g. campaign state change in `admin.html`):

```javascript
function transitionState(updateFn) {
  if (!document.startViewTransition) {
    updateFn();
    return;
  }
  document.startViewTransition(updateFn);
}
```

### Additional safety: CSS isolation guard

Add this alongside the `view-transition-name` declarations so the stacking context only activates when the API is available:

```css
/* Only apply view-transition-name when the API is supported */
@supports (view-transition-name: none) {
  .hero-cta-primary    { view-transition-name: hero-cta; }
  .done-preview-artist-name { view-transition-name: artist-name; }
  .sb-logo-type        { view-transition-name: able-logo; }
}
```

This means Firefox and Safari never create the stacking context. The `@supports` rule fails gracefully.

### Testing requirement

Test all 3 transition points in Chrome 126+, Firefox, and Safari:
- `landing.html` → `start.html` (hero-cta transition)
- `start.html` done screen → `able-v7.html` (artist-name transition)
- `admin.html` → `able-v7.html` (able-logo transition)

In Chrome: shared element should morph. In Firefox/Safari: standard navigation with no visual artefacts.

---

## Gap 2 — Focus ring on admin.html

### The problem

`admin.html` currently uses a flat 2px outline for focus:

```css
*:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px; }
```

This provides only one layer of contrast. On the warm cream admin background (`--dash-bg: #e8e4dd`), the amber outline merges with the background at small sizes and is particularly weak on amber-tinted UI elements like the Campaign HQ card.

### The fix — exact CSS

Replace the existing focus rule in `admin.html` with the canonical 3-layer glow pattern:

```css
*:focus:not(:focus-visible) { outline: none; }
*:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--dash-bg),
    0 0 0 4px var(--dash-amber),
    0 0 0 6px rgba(244,185,66,0.25);
}
```

**Why this works:** The inner 2px ring in `--dash-bg` (cream) creates a visible gap between the element and the focus ring, regardless of background colour. The 4px amber ring is the primary indicator. The 6px semi-transparent halo adds depth without visual noise.

**WCAG note:** This pattern passes WCAG 2.1 SC 2.4.11 (Focus Appearance, AA) — the focus indicator has a minimum area of the perimeter of the unfocused component × 2 CSS pixels.

---

## Gap 3 — NEW-1 through NEW-6 unbuilt

These 6 admin interactions are specced but not implemented. Priority order and exact specs follow.

### Priority classification

**P1 — Ship with next admin.html build pass:**

| Code | Interaction | Why P1 |
|---|---|---|
| NEW-6 | Contextual greeting sub-line cross-fade | Every session, every user sees this. Dead text swap feels broken. |
| NEW-1 | Campaign HQ state button spring | Campaign HQ is the primary admin action. A state change with no feedback feels unresponsive. |
| NEW-3 | Milestone card entrance (fan #1, fan #50, etc.) | Milestone moments are the emotional high points of the dashboard. No animation = wasted opportunity. |

**P2 — Ship in the following build pass:**

| Code | Interaction | Why P2 |
|---|---|---|
| NEW-5 | First-run checklist completion | Only visible once per artist — impactful but not recurring. |
| NEW-4 | "It's working" card entrance | Depends on data state; polish pass item. |
| NEW-2 | Timeline arc re-draw on state change | Visual chrome — reinforces NEW-1 but not a blocker. |

### Implementation specs

**NEW-6 — Contextual greeting sub-line cross-fade**

The sub-line under the greeting (e.g. "Your fan list grew by 3 this week") changes based on data. Swap must feel like a new thought arriving, not a flash.

```css
@keyframes subLineFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.greeting-subline {
  animation: none;
}
.greeting-subline.updating {
  animation: subLineFadeIn 0.3s var(--ease) forwards;
}
```

```javascript
function updateGreetingSubline(newText) {
  const el = document.querySelector('.greeting-subline');
  el.classList.remove('updating');
  void el.offsetWidth; // force reflow
  el.textContent = newText;
  el.classList.add('updating');
}
```

**NEW-1 — Campaign HQ state button spring**

When an artist taps a state button (pre-release / live / gig / profile), the selected button should spring in:

```css
@keyframes stateSpringIn {
  0%   { transform: scale(0.94); }
  60%  { transform: scale(1.04); }
  100% { transform: scale(1); }
}
.chq-state-btn.on {
  animation: stateSpringIn 0.4s var(--spring) forwards;
}
```

**NEW-3 — Milestone card entrance**

Fan #1, fan #50, fan #100 cards enter when first rendered:

```css
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.milestone-card {
  animation: fadeSlideUp 0.3s var(--ease) both;
}
```

**NEW-5 — First-run checklist step completion**

Each step fades and strikes through on completion. Final step triggers a full-checklist completion line:

```css
.frc-step.completing {
  animation: fadeSlideUp 0.25s var(--ease) reverse both;
}
.frc-complete-line {
  animation: fadeSlideUp 0.35s var(--spring) both;
  animation-delay: 0.1s;
}
```

**NEW-4 — "It's working" card entrance**

Same `fadeSlideUp` pattern as NEW-3. `animation-delay: 0.15s` to land after any adjacent stats counter.

**NEW-2 — Timeline arc re-draw on state change**

The arc-fill element transitions its width on state change:

```css
.timeline-arc-fill {
  transition: width 0.3s var(--ease);
}
```

Trigger by updating the element's inline width after the state button is tapped.

---

## 10/10 Criteria

The system reaches 10/10 when all of the following are true:

1. All 6 admin interactions (NEW-1 through NEW-6) are implemented and visually verified
2. `@view-transition` is wrapped in `if (!document.startViewTransition)` guards on all 3 transition points
3. `@supports (view-transition-name: none)` CSS guard added around all `view-transition-name` declarations
4. Focus ring glow pattern applied consistently in `admin.html`, `start.html`, and `landing.html`
5. `@view-transition` transitions tested and confirmed: morph in Chrome, clean fallback in Firefox and Safari

---

## Playwright Test Spec

Add these tests to the Playwright smoke suite. Tests verify the 3 most critical interaction patterns: press feedback, tab indicator, and bottom sheet.

```javascript
// tests/interactions.spec.js

const { test, expect } = require('@playwright/test');

test.describe('Micro-interaction smoke tests', () => {

  test('Scale-down on press — CTA button', async ({ page }) => {
    await page.goto('/able-v7.html');
    const cta = page.locator('.btn-primary').first();
    await cta.dispatchEvent('pointerdown');
    const transform = await cta.evaluate(el =>
      getComputedStyle(el).getPropertyValue('transform')
    );
    // scale(0.97) = matrix(0.97, 0, 0, 0.97, 0, 0)
    expect(transform).toContain('0.97');
    await cta.dispatchEvent('pointerup');
  });

  test('Tab indicator spring — moves on tab click', async ({ page }) => {
    await page.goto('/able-v7.html');
    const secondTab = page.locator('.tab-btn').nth(1);
    const indicator = page.locator('.tab-indicator');
    const beforeLeft = await indicator.evaluate(el => el.style.left || getComputedStyle(el).left);
    await secondTab.click();
    await page.waitForTimeout(400); // allow spring to settle
    const afterLeft = await indicator.evaluate(el => el.style.left || getComputedStyle(el).left);
    expect(afterLeft).not.toBe(beforeLeft);
  });

  test('Bottom sheet slide-up — spring entrance', async ({ page }) => {
    await page.goto('/able-v7.html');
    // Trigger any bottom sheet open action (e.g. fan sign-up)
    const trigger = page.locator('[data-sheet-trigger]').first();
    if (await trigger.count() > 0) {
      await trigger.click();
      await page.waitForTimeout(350); // allow sheet to open
      const sheet = page.locator('.bottom-sheet-content');
      const transform = await sheet.evaluate(el => getComputedStyle(el).transform);
      // translateY(0) = matrix(1,0,0,1,0,0)
      expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
    }
  });

  test('Focus ring glow — admin.html keyboard nav', async ({ page }) => {
    await page.goto('/admin.html');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    const boxShadow = await focused.evaluate(el => getComputedStyle(el).boxShadow);
    // Should contain the amber glow, not a flat outline
    expect(boxShadow).not.toBe('none');
    // 244,185,66 = #f4b942 amber
    expect(boxShadow).toContain('244');
  });

  test('@view-transition guard — no crash in any browser', async ({ page }) => {
    // Disable startViewTransition to simulate Firefox/Safari
    await page.addInitScript(() => {
      delete document.startViewTransition;
    });
    await page.goto('/landing.html');
    // Should navigate without JS error
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    const cta = page.locator('.hero-cta-primary').first();
    if (await cta.count() > 0) {
      await cta.click();
      await page.waitForTimeout(300);
    }
    expect(errors.filter(e => e.includes('startViewTransition'))).toHaveLength(0);
  });

});
```

Run with: `npx playwright test tests/interactions.spec.js`
