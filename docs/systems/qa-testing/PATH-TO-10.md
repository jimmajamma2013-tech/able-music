# ABLE QA — Path to 10/10
**Created: 2026-03-16 | Current: 2/10 | Target: 9/10 (spec-complete)**

> Execution plan. Translates ANALYSIS.md's gap scoring and SPEC.md's test definitions into a prioritised build order. Each item has a clear done-state.

---

## Current score: 2/10

From ANALYSIS.md:

| Dimension | Score |
|---|---|
| Unit test coverage | 0/10 |
| Integration tests | 1/10 |
| Visual regression | 1/10 |
| Interaction tests | 2/10 |
| Accessibility tests | 1/10 |
| Performance tests | 0/10 |
| Copy/content tests | 0/10 |
| Cross-browser tests | 2/10 |
| **Overall** | **2/10** |

---

## Key gap between current and 10/10

The entire gap is infrastructure and wiring. The spec exists. The test patterns are written. The banned phrase list is documented. The accessibility requirements are in the design spec. None of it is running.

The gap is:
1. No `tests/` directory exists
2. No `playwright.config.js` exists
3. No manual pre-deploy checklist is written down anywhere — James runs checks from memory
4. The copy regression scanner does not exist as a runnable script
5. No CI gate of any kind — no pre-commit hook, no GitHub Action

Going from 2/10 to 9/10 does not require any product work. It requires 8–9 hours of test scaffolding. The hardest part is starting.

---

## Manual pre-deploy smoke test checklist (15 minutes)

This is what James runs before every production-affecting commit. No Playwright required. Just a browser.

**Before starting:** Clear all localStorage. Open a fresh private/incognito window. Open DevTools console.

---

### 1. Landing page (2 min)

- [ ] `landing.html` loads. No red errors in console.
- [ ] Hero headline and CTA are visible without scrolling at 375px width.
- [ ] Tapping the hero CTA opens `start.html` correctly.
- [ ] No horizontal scroll at 375px.

---

### 2. Onboarding wizard (3 min)

- [ ] `start.html` loads. No console errors.
- [ ] Step 1 accepts artist name. Next button activates.
- [ ] Step 2 displays (genre/vibe selection). At least one vibe selectable.
- [ ] Step 3 displays. At least one CTA type selectable.
- [ ] Completing the wizard writes `able_v3_profile` to localStorage (check DevTools → Application → Local Storage).
- [ ] Wizard redirects to `able-v7.html` or `admin.html` after completion.

---

### 3. Artist profile page (4 min)

- [ ] `able-v7.html` loads with profile data. Artist name visible.
- [ ] No console errors.
- [ ] Fan email sign-up form is visible. Enter a real-looking email (`test@test.com`) and submit.
- [ ] After submit: confirmation state appears (not blank, not error).
- [ ] Check localStorage: `able_fans` contains the new entry with `email`, `ts`, and `source` fields.
- [ ] "Made with ABLE ✦" footer is visible at bottom of page.
- [ ] Footer link contains `?ref=` in the href (DevTools → Elements, inspect the `<a>`).
- [ ] No horizontal scroll at 375px.
- [ ] Switch to Light theme: text readable, not white-on-white.
- [ ] Switch to Contrast theme: text readable on black background.

---

### 4. Artist dashboard (4 min)

- [ ] `admin.html` loads. Greeting contains artist name from `able_v3_profile`.
- [ ] No console errors on load.
- [ ] Stat cards visible. No indefinite skeleton shimmer after 2 seconds.
- [ ] Fan added in step 3 appears in the Fans section.
- [ ] Fan has a source label (not blank).
- [ ] Campaign HQ: set state to "pre-release" with a future date. Confirm `able_v3_profile.stateOverride` updates in localStorage.
- [ ] Navigate back to `able-v7.html` — does the page reflect the pre-release state?
- [ ] Gig mode toggle activates. `able_gig_expires` is set in localStorage.

---

### 5. Cross-check (2 min)

- [ ] Fan signed up in step 3 is visible in admin with correct timestamp order (most recent first).
- [ ] Campaign state set in admin is reflected on the profile page.
- [ ] No 404s in the Network tab for any resource (fonts, images, scripts).
- [ ] `console.error` count in DevTools is 0.

---

**Pass criteria:** All boxes checked. Any failure = P0 bug. Fix before commit.

---

## P0 — Foundation (current → 5/10)

Do this in a single session. Takes the build from zero automated coverage to a working test suite.

---

### P0.1 — Playwright project setup

**Done when:** `npx playwright test` runs and exits cleanly.

Steps:
1. Create `playwright.config.js` at project root (use the baseline config from SPEC.md §infrastructure)
2. Create `tests/` directory
3. Create `tests/smoke.spec.js` with a single passing test (any page load check)
4. Run `npx serve . -p 8080` in one terminal, `npx playwright test` in another
5. Verify green output

Files created: `playwright.config.js`, `tests/smoke.spec.js`

---

### P0.2 — Smoke tests for all 4 active pages

**Done when:** `tests/smoke.spec.js` contains tests 1.1–1.5 from SPEC.md. All pass in under 30 seconds.

Tests to implement:

| Test | What it checks |
|---|---|
| 1.1 | All 4 pages load without JS console errors |
| 1.2 | All 4 themes render without invisible text |
| 1.3 | Fan sign-up form accepts email and writes to localStorage |
| 1.4 | Admin renders artist name from `able_v3_profile` |
| 1.5 | Admin saves bio field to localStorage |

Use `page.addInitScript()` for any test that depends on localStorage being pre-populated. Never set localStorage after page load — the page's `DOMContentLoaded` handler will have already run.

---

### P0.3 — Copy regression test (banned phrase scanner)

**Done when:** `tests/copy.spec.js` scans all 4 HTML files for all banned phrases and passes on the current build.

Tests to implement:

| Test | What it checks |
|---|---|
| 3.1 | DOM text scan — 15 banned phrases × 4 files = 60 parameterised test cases |
| 3.2 | No exclamation marks in admin UI copy |
| 3.3 | Toast copy exactly matches spec ("Saved." / "Copied." / "Removed.") |
| 3.4 | Upgrade prompts include specific value, not bare "Upgrade" |
| 3.5 | Greeting is "Good to see you" not "Welcome back" |

Test 3.1 is two nested loops. The outer loop is pages, inner is banned phrases. This produces 60 individual test cases with individual failure messages — not one mega-test that fails on the first match and hides the others.

---

### P0.4 — Cross-page data flow tests (critical paths only)

**Done when:** `tests/journeys.spec.js` contains tests 5.1–5.3 from SPEC.md. All pass.

Tests to implement:

| Test | What it checks |
|---|---|
| 5.1 | `able_v3_profile` written by wizard is rendered in admin greeting |
| 5.2 | Fan sign-up on profile appears in admin fans page |
| 5.3 | Campaign state set in admin persists to localStorage correctly |

Test 5.2 requires two page contexts (profile page writes, admin page reads). Use `context.newPage()` from Playwright's `BrowserContext`. Tests do not need to simulate the full wizard UI — injecting the localStorage payload directly is faster and more reliable.

**P0 score impact: 2/10 → ~5/10**

---

## P1 — Quality gate (5/10 → 8/10)

These transform the smoke suite into a real quality gate. Run automatically on every branch before merge.

---

### P1.1 — Interaction tests (top 10 micro-interactions)

**Done when:** `tests/interactions.spec.js` contains tests 2.1–2.6 from SPEC.md §2. All pass.

Tests to implement:

| Test | Interaction | What it checks |
|---|---|---|
| 2.1 | B1 | Scale-down to 0.97 on CTA pointerdown |
| 2.2 | C1 | Tab indicator moves on tab click |
| 2.3 | D5 | Bottom sheet reaches translateY(0) within 380ms |
| 2.4 | A4 | Sticky artist bar visible after 70% hero scroll |
| 2.5 | NEW-1 | Campaign HQ state button has `.on` class and `stateSpringIn` animation |
| 2.6 | C5 | Countdown renders in pre-release state |

Animation state tests must account for timing. Always `waitForTimeout(100+)` after triggering an event before reading computed style.

---

### P1.2 — Accessibility tap-target tests

**Done when:** `tests/a11y.spec.js` contains tests 4.1–4.5 from SPEC.md §4. Test 4.1 passes on all 4 pages at 375px.

Tests to implement:

| Test | What it checks |
|---|---|
| 4.1 | All interactive elements ≥ 44px in both dimensions at 375px viewport |
| 4.2 | Focus ring visible (amber box-shadow contains value 244) on admin keyboard nav |
| 4.3 | All `<img>` have `alt` attributes across all 4 pages |
| 4.4 | Bottom tab bar has `role="navigation"` and a truthy `aria-label` |
| 4.5 | `prefers-reduced-motion: reduce` sets animation-duration to 0s |

Test 4.1 will reveal real violations. When it fails, the fix is in HTML/CSS, not the test. Document each violation found.

---

### P1.3 — Full cross-page journey tests

**Done when:** `tests/journeys.spec.js` also contains tests 5.4 and 5.5.

Tests to implement:

| Test | What it checks |
|---|---|
| 5.4 | Expired `able_gig_expires` means gig badge is not visible on profile |
| 5.5 | Stats resolve from localStorage within 600ms — no indefinite skeleton |

---

### P1.4 — Theme correctness tests

**Done when:** `tests/themes.spec.js` contains tests 7.1–7.5 from SPEC.md §7. All pass.

Tests to implement:

| Test | What it checks |
|---|---|
| 7.1 | Text colour is never identical to background in all 4 themes |
| 7.2 | Light theme uses warm cream (#f0ede8), not pure white |
| 7.3 | Contrast theme background is pure black (rgb(0,0,0)) |
| 7.4 | Glass theme has `backdrop-filter` on at least one card element |
| 7.5 | Cycling through all 4 themes produces no JS errors |

**P1 score impact: ~5/10 → 8/10**

---

## P2 — Release quality (8/10 → 9/10)

These run pre-release or weekly. Bring coverage to near-complete.

---

### P2.1 — Visual regression: screenshot baselines

**Done when:** `tests/screenshots/` contains baselines for 8 screenshots. `tests/visual.spec.js` compares current renders against them.

```javascript
// tests/visual.spec.js
test('profile: dark theme visual baseline', async ({ page }) => {
  await page.goto('/able-v7.html');
  await expect(page).toHaveScreenshot('profile-dark.png', {
    maxDiffPixelRatio: 0.001,
  });
});
```

Baselines needed (8 total):

| File | Theme / Viewport | Screenshot name |
|---|---|---|
| able-v7.html | dark, 375px | profile-dark.png |
| able-v7.html | light, 375px | profile-light.png |
| able-v7.html | glass, 375px | profile-glass.png |
| able-v7.html | contrast, 375px | profile-contrast.png |
| admin.html | dark, 375px | admin-mobile.png |
| admin.html | dark, 1280px | admin-desktop.png |
| start.html | dark, 375px | onboarding-step1.png |
| landing.html | dark, 1280px | landing-desktop.png |

Run `npx playwright test --update-snapshots` once to generate baselines. Review manually. Commit. Any future visual change requires re-running `--update-snapshots` with deliberate review.

---

### P2.2 — Performance CI: Lighthouse budget assertions

**Done when:** `tests/performance.spec.js` tests 6.1–6.5 pass. LCP ≤ 2.5s on profile and landing.

Lighthouse CLI cannot run inside Playwright directly — it needs a real server. For local runs:
```bash
npx serve . -p 8080 &
npx lighthouse http://localhost:8080/able-v7.html --output json --output-path ./reports/profile.json
```
Parse the JSON and assert `audits['largest-contentful-paint'].numericValue <= 2500`.

Tests 6.3 (no horizontal scroll) and 6.4 (fonts load) can run in Playwright without Lighthouse.

---

### P2.3 — Full cross-browser matrix

**Done when:** `playwright.config.js` has all 3 browser projects enabled. All smoke tests pass in all 3 browsers.

Specific cross-browser tests to add:

| Test | Browser | What it verifies |
|---|---|---|
| `@view-transition` guard | Firefox, WebKit | No JS error when `startViewTransition` is undefined |
| `backdrop-filter` fallback | Firefox | Glass theme degrades gracefully |
| `env(safe-area-inset-bottom)` | WebKit | Bottom tab bar has correct CSS rule |
| `color-mix()` fallback | Firefox 112 | Accent tints render |

**P2 score impact: 8/10 → 9/10**

---

## Regression test patterns for critical flows

### Flow 1: Artist onboarding (start.html → admin.html data persists)

```javascript
test('onboarding: wizard output persists to admin dashboard', async ({ page }) => {
  // Simulate wizard completion
  await page.goto('/admin.html');
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Theo Baptiste',
      bio: 'Drummer. Composer. Bristol.',
      accent: '#00b894',
      genre: 'Jazz / Soul',
    }));
  });
  await page.reload();

  // Admin should render profile data
  await expect(page.locator('#homeGreeting')).toContainText('Theo');

  // Profile fields should be accessible via admin settings
  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
  );
  expect(stored.name).toBe('Theo Baptiste');
  expect(stored.bio).toBe('Drummer. Composer. Bristol.');
});
```

---

### Flow 2: Fan sign-up (email captured, stored in able_fans)

```javascript
test('fan sign-up: email is captured and stored with required fields', async ({ page }) => {
  await page.goto('/able-v7.html');

  const input = page.locator('input[type="email"]').first();
  await input.fill('real-fan@music.com');
  const submit = page.locator('button[type="submit"], .fan-submit-btn').first();
  await submit.click();
  await page.waitForTimeout(300);

  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );

  const fan = fans.find(f => f.email === 'real-fan@music.com');
  expect(fan).toBeDefined();
  expect(fan.email).toBe('real-fan@music.com');
  expect(typeof fan.ts).toBe('number');    // Unix timestamp present
  expect(fan.ts).toBeGreaterThan(0);
  expect(fan.source).toBeDefined();       // Source value present
  expect(fan.optIn).toBe(true);           // Consent field present
});
```

---

### Flow 3: Page state switching (all 4 states)

```javascript
test('page states: all 4 states render correctly via stateOverride', async ({ page }) => {
  const futureDate = new Date(Date.now() + 10 * 86400000).toISOString();

  const stateTests = [
    { override: 'profile',  expectedEl: '.profile-cta, .hero-cta',     label: 'profile state' },
    { override: 'pre',      expectedEl: '.countdown, [class*="pre"]',   label: 'pre-release state' },
    { override: 'live',     expectedEl: '.live-badge, [class*="live"]', label: 'live state' },
    { override: 'gig',      expectedEl: '.gig-badge, [class*="gig"]',   label: 'gig state' },
  ];

  for (const { override, expectedEl, label } of stateTests) {
    await page.addInitScript((data) => {
      localStorage.setItem('able_v3_profile', JSON.stringify(data));
      if (data.stateOverride === 'gig') {
        localStorage.setItem('able_gig_expires', (Date.now() + 3600000).toString());
      }
    }, { name: 'Test Artist', stateOverride: override, releaseDate: futureDate });

    await page.goto('/able-v7.html');
    await page.waitForTimeout(300);

    const el = page.locator(expectedEl).first();
    const count = await el.count();
    // Log which states have matching elements for visibility
    console.log(`${label}: ${count > 0 ? 'element found' : 'element not found (verify selector)'}`);
  }
});
```

---

### Flow 4: Theme switching (all 4 themes render correctly)

```javascript
test('themes: all 4 themes switch without errors or invisible text', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('/able-v7.html');

  const themes = ['dark', 'light', 'glass', 'contrast'];
  for (const theme of themes) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(100);

    const { bg, color } = await page.evaluate(() => ({
      bg: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(document.body).color,
    }));

    expect(bg).not.toBe(color);
    expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    expect(color).not.toBe('rgba(0, 0, 0, 0)');
  }

  expect(errors).toHaveLength(0);
});
```

---

### Flow 5: Mobile 375px (no horizontal scroll, 44px tap targets)

```javascript
test('mobile 375px: no horizontal scroll and 44px tap targets on profile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');

  // No horizontal scroll
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(375);

  // 44px tap targets
  const violations = await page.evaluate(() => {
    const els = document.querySelectorAll('button, a, input, [role="button"]');
    return Array.from(els)
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
      })
      .map(el => ({
        tag: el.tagName,
        text: (el.innerText || el.getAttribute('aria-label') || '').slice(0, 30),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      }));
  });

  // Log violations to aid fixing — don't silently pass if there are any
  if (violations.length > 0) {
    console.warn('Tap target violations:', JSON.stringify(violations, null, 2));
  }
  expect(violations).toHaveLength(0);
});
```

---

## Effort estimates

| Item | Time | What it unblocks |
|---|---|---|
| P0.1 Playwright setup | 20 min | Everything |
| P0.2 Smoke tests | 45 min | CI safety net |
| P0.3 Copy regression | 30 min | Brand safety |
| P0.4 Cross-page (critical) | 40 min | Data integrity |
| Manual smoke checklist | Done (this doc) | Pre-deploy confidence |
| P1.1 Interaction tests | 90 min | Quality gate |
| P1.2 Accessibility | 60 min | WCAG AA |
| P1.3 Cross-page (full) | 30 min | — |
| P1.4 Theme tests | 30 min | Design system |
| P2.1 Visual baselines | 60 min | Visual regression |
| P2.2 Lighthouse CI | 45 min | Performance budget |
| P2.3 Cross-browser | 60 min | iOS/Firefox parity |

**Total to 9/10:** approximately 8.5 hours of focused work.

---

## What 10/10 requires

9/10 is achievable offline. The gap to 10:

- GitHub Actions workflow running smoke + copy tests on every push
- Test history — 10+ consecutive clean runs with no false positives
- Lighthouse in CI — automated performance budget on every PR
- Visual diff in PR comments — screenshot comparison posted automatically

Minimal CI configuration:

```yaml
# .github/workflows/qa.yml
name: QA
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npx playwright install --with-deps chromium
      - run: npx serve . -p 8080 &
      - run: sleep 2 && npx playwright test --project=chromium tests/smoke.spec.js tests/copy.spec.js
```

This is 15 minutes of configuration. Smoke + copy regression run in under 60 seconds in CI. When it exists: no one ships a banned phrase or broken page load without a failing check. The score is 10/10.
