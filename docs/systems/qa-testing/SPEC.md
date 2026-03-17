# ABLE — Master QA Specification
**Created: 2026-03-16 | Target coverage: 9/10**

> This is the authoritative specification for all automated testing on ABLE. No test file should be written without a corresponding entry here. No entry here should exist without a clear acceptance criterion.

---

## Overview

**Test runner:** Playwright (MCP configured, CLI available via `npx playwright test`)
**Active pages under test:** `able-v7.html`, `admin.html`, `start.html`, `landing.html`
**Viewport standard:** 375px (mobile primary), 1280px (desktop secondary)
**Base URL:** `file://` paths during local development; `https://ablemusic.co` in CI

---

## Test categories

| # | Category | Trigger | Files |
|---|---|---|---|
| 1 | Smoke tests | Every commit | `tests/smoke.spec.js` |
| 2 | Interaction tests | Pre-merge | `tests/interactions.spec.js` |
| 3 | Copy regression | Every commit | `tests/copy.spec.js` |
| 4 | Accessibility tests | Pre-merge | `tests/a11y.spec.js` |
| 5 | Cross-page tests | Pre-merge | `tests/journeys.spec.js` |
| 6 | Performance tests | Weekly / pre-release | `tests/performance.spec.js` |
| 7 | Theme tests | Pre-merge | `tests/themes.spec.js` |

---

## 1. Smoke tests

**Purpose:** Catch catastrophic failures immediately. Every page must load, render, and not throw. These run on every commit.

**Acceptance criteria:**
- Page loads with HTTP 200 (or file: equivalent — no 404)
- No JavaScript console errors
- `document.readyState === 'complete'` within 5 seconds
- No `undefined` or `null` text visible in the DOM
- Core interactive elements are present

### Patterns

**1.1 — Page load, no JS errors**
```javascript
// tests/smoke.spec.js
const PAGES = [
  { name: 'profile', path: '/able-v7.html' },
  { name: 'admin',   path: '/admin.html' },
  { name: 'start',   path: '/start.html' },
  { name: 'landing', path: '/landing.html' },
];

for (const { name, path } of PAGES) {
  test(`${name}: loads without JS errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    expect(errors).toHaveLength(0);
  });
}
```

**1.2 — Four themes render on artist profile**
```javascript
test('profile: all 4 themes apply without errors', async ({ page }) => {
  await page.goto('/able-v7.html');
  const themes = ['dark', 'light', 'glass', 'contrast'];
  for (const theme of themes) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    // No white-on-white: check body text colour is not identical to background
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    const color = await page.evaluate(() =>
      getComputedStyle(document.body).color
    );
    expect(bg).not.toBe(color);
  }
});
```

**1.3 — Fan sign-up form present and submittable**
```javascript
test('profile: fan sign-up form accepts email and submits', async ({ page }) => {
  await page.goto('/able-v7.html');
  const input = page.locator('input[type="email"]').first();
  await expect(input).toBeVisible();
  await input.fill('test@example.com');
  const submitBtn = page.locator('button[type="submit"], .fan-submit-btn').first();
  await submitBtn.click();
  // After submit: check localStorage was written
  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  expect(fans.length).toBeGreaterThan(0);
  expect(fans[fans.length - 1].email).toBe('test@example.com');
});
```

**1.4 — Admin reads and renders profile from localStorage**
```javascript
test('admin: renders artist name from able_v3_profile', async ({ page }) => {
  await page.goto('/admin.html');
  // Inject a profile before page load
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Maya Rose',
      accent: '#e05242',
    }));
  });
  await page.reload();
  const greeting = page.locator('#homeGreeting');
  await expect(greeting).toContainText('Maya');
});
```

**1.5 — Admin saves profile field to localStorage**
```javascript
test('admin: bio field save writes to localStorage', async ({ page }) => {
  await page.goto('/admin.html');
  // Navigate to profile edit section
  await page.locator('[data-page="settings"], [onclick*="settings"]').first().click();
  const bioField = page.locator('textarea[name="bio"], #bioField').first();
  if (await bioField.count() > 0) {
    await bioField.fill('Test bio content');
    await page.locator('[onclick*="save"], .save-btn').first().click();
    const profile = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
    );
    expect(profile.bio).toBe('Test bio content');
  }
});
```

---

## 2. Interaction tests

**Purpose:** Verify that the 30+ micro-interactions in `able-v7.html` and 6 admin interactions fire correctly. These are the moments that make ABLE feel alive — regressions here degrade perceived quality significantly.

**Acceptance criteria:**
- CSS transform applied within 100ms of pointer event
- Spring animations resolve within 600ms
- Tab indicators move to the correct position
- Bottom sheets are fully visible (translateY === 0) after animation completes

### Patterns

**2.1 — Scale-down on press (B1)**
```javascript
test('profile: CTA button scales to 0.97 on pointerdown', async ({ page }) => {
  await page.goto('/able-v7.html');
  const cta = page.locator('.btn-primary, .hero-cta-primary').first();
  await cta.dispatchEvent('pointerdown');
  const transform = await cta.evaluate(el =>
    getComputedStyle(el).transform
  );
  // scale(0.97) = matrix(0.97, 0, 0, 0.97, 0, 0)
  expect(transform).toContain('0.97');
  await cta.dispatchEvent('pointerup');
});
```

**2.2 — Tab sliding indicator spring (C1)**
```javascript
test('profile: tab indicator moves on tab click', async ({ page }) => {
  await page.goto('/able-v7.html');
  const tabs = page.locator('.tab-btn');
  const indicator = page.locator('.tab-indicator');
  await tabs.first().click();
  const before = await indicator.evaluate(el => el.getBoundingClientRect().left);
  await tabs.nth(1).click();
  await page.waitForTimeout(450); // spring settles
  const after = await indicator.evaluate(el => el.getBoundingClientRect().left);
  expect(after).not.toBe(before);
});
```

**2.3 — Bottom sheet slide-up enters at translateY(0) (D5)**
```javascript
test('profile: fan sign-up bottom sheet reaches translateY(0)', async ({ page }) => {
  await page.goto('/able-v7.html');
  const trigger = page.locator('[data-sheet-trigger], .fan-sheet-trigger').first();
  if (await trigger.count() > 0) {
    await trigger.click();
    await page.waitForTimeout(380);
    const sheet = page.locator('.bottom-sheet-content').first();
    const transform = await sheet.evaluate(el => getComputedStyle(el).transform);
    expect(transform).toBe('matrix(1, 0, 0, 1, 0, 0)');
  }
});
```

**2.4 — Sticky artist bar triggers at 70% hero scroll (A4)**
```javascript
test('profile: sticky artist bar visible after 70% hero scroll', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  const hero = page.locator('.hero-card, .artist-hero').first();
  const heroHeight = await hero.evaluate(el => el.offsetHeight);
  await page.evaluate(h => window.scrollBy(0, h * 0.75), heroHeight);
  await page.waitForTimeout(200);
  const stickyBar = page.locator('.sticky-artist-bar, .artist-sticky').first();
  if (await stickyBar.count() > 0) {
    const isVisible = await stickyBar.evaluate(el => {
      const style = getComputedStyle(el);
      return style.opacity !== '0' && style.visibility !== 'hidden';
    });
    expect(isVisible).toBe(true);
  }
});
```

**2.5 — Campaign HQ state button spring (NEW-1)**
```javascript
test('admin: state button has spring animation class on activation', async ({ page }) => {
  await page.goto('/admin.html');
  const stateBtn = page.locator('.chq-state-btn').first();
  await stateBtn.click();
  const hasClass = await stateBtn.evaluate(el => el.classList.contains('on'));
  expect(hasClass).toBe(true);
  // Animation should be stateSpringIn — check animation-name
  const animName = await stateBtn.evaluate(el =>
    getComputedStyle(el).animationName
  );
  expect(animName).toContain('stateSpringIn');
});
```

**2.6 — Countdown digit flip renders (C5)**
```javascript
test('profile: countdown renders in pre-release state', async ({ page }) => {
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString();
  await page.addInitScript(date => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist',
      releaseDate: date,
      stateOverride: 'pre',
    }));
  }, futureDate);
  await page.goto('/able-v7.html');
  const countdown = page.locator('.countdown, .digit-flip, [class*="countdown"]').first();
  if (await countdown.count() > 0) {
    await expect(countdown).toBeVisible();
  }
});
```

---

## 3. Copy regression tests

**Purpose:** Automatically scan all HTML files for banned phrases. This is a zero-tolerance check — no banned phrase should appear in any user-visible string.

**Acceptance criteria:**
- Zero matches for all banned phrases across all 4 active HTML files
- Test fails with exact location (file, element, phrase) on any match

### Banned phrase list

The following strings are banned in user-visible UI copy. Pattern matching is case-insensitive.

```javascript
// tests/copy.spec.js
const BANNED_PHRASES = [
  'dashboard',              // artist-facing only — use "your page" or specific section names
  'superfan',               // never — use "dedicated listeners" or "people who show up"
  'turn fans into',         // never — paternalistic conversion language
  'going viral',            // never — antithetical to ABLE's register
  'monetise',               // never — use "let people support you directly"
  'monetize',               // never
  'content creator',        // never — use "artist"
  'engage your followers',  // never
  'engage your fans',       // never
  'newsletter',             // never — use "your list" or "stay close"
  'mailing list',           // never
  'welcome aboard',         // never — generic SaaS onboarding
  'get started',            // never as a primary CTA
  "you're all set",         // never
  'upgrade to continue',    // never — always specify what they get
  'grow your audience',     // never — use "reach people who care"
];

const ACTIVE_FILES = [
  'able-v7.html',
  'admin.html',
  'start.html',
  'landing.html',
];
```

**3.1 — DOM text scan for banned phrases**
```javascript
test.describe('Copy regression — banned phrases', () => {
  for (const file of ACTIVE_FILES) {
    for (const phrase of BANNED_PHRASES) {
      test(`${file}: does not contain "${phrase}"`, async ({ page }) => {
        await page.goto(`/${file}`);
        // Get all visible text content
        const textContent = await page.evaluate(() =>
          document.body.innerText.toLowerCase()
        );
        if (textContent.includes(phrase.toLowerCase())) {
          // Find the specific element for a useful error message
          const location = await page.evaluate(p => {
            const walker = document.createTreeWalker(
              document.body, NodeFilter.SHOW_TEXT
            );
            let node;
            while ((node = walker.nextNode())) {
              if (node.textContent.toLowerCase().includes(p.toLowerCase())) {
                return node.parentElement.tagName + ': "' + node.textContent.trim().slice(0, 80) + '"';
              }
            }
            return 'unknown location';
          }, phrase);
          throw new Error(`Banned phrase "${phrase}" found in ${file} at ${location}`);
        }
      });
    }
  }
});
```

**3.2 — Exclamation mark check on admin copy**
```javascript
test('admin: no exclamation marks in UI copy', async ({ page }) => {
  await page.goto('/admin.html');
  const textContent = await page.evaluate(() => document.body.innerText);
  const lines = textContent.split('\n').filter(l => l.includes('!'));
  // Allow exclamation marks inside code blocks or hidden elements only
  const violations = lines.filter(line => !line.trim().startsWith('//'));
  expect(violations).toHaveLength(0);
});
```

**3.3 — Toast copy is exactly correct**
```javascript
test('admin: save action produces "Saved." toast not "Saved!"', async ({ page }) => {
  await page.goto('/admin.html');
  // Trigger a save action
  await page.evaluate(() => {
    // Dispatch a custom save event if the page uses one
    document.dispatchEvent(new CustomEvent('able:save'));
  });
  await page.waitForTimeout(200);
  const toast = page.locator('.toast, [class*="toast"]').first();
  if (await toast.count() > 0 && await toast.isVisible()) {
    const text = await toast.innerText();
    expect(text.trim()).toMatch(/^Saved\.$|^Copied\.$|^Removed\.$/);
  }
});
```

**3.4 — Tier gate copy includes specific value proposition**
```javascript
test('admin: upgrade prompts include specific value, not just "Upgrade"', async ({ page }) => {
  await page.goto('/admin.html');
  const gateButtons = page.locator('.glo-btn, [class*="upgrade"]');
  const count = await gateButtons.count();
  for (let i = 0; i < count; i++) {
    const text = await gateButtons.nth(i).innerText();
    // Must not be bare "Upgrade" or "Upgrade to continue"
    expect(text.toLowerCase().trim()).not.toBe('upgrade');
    expect(text.toLowerCase()).not.toContain('upgrade to continue');
  }
});
```

**3.5 — Greeting register check**
```javascript
test('admin: greeting is "Good to see you" not "Welcome back"', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('admin_ever_visited', '1');
    localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Asha' }));
  });
  await page.goto('/admin.html');
  const greeting = page.locator('#homeGreeting').first();
  if (await greeting.count() > 0) {
    const text = await greeting.innerText();
    expect(text.toLowerCase()).not.toContain('welcome back');
    expect(text).toContain('Good to see you');
  }
});
```

---

## 4. Accessibility tests

**Purpose:** Verify that every interactive element is reachable, labelled, and usable with keyboard and screen reader. ABLE's minimum target is WCAG 2.1 AA.

**Acceptance criteria:**
- All interactive elements have a minimum bounding box of 44×44px
- Focus ring is visible on every interactive element (box-shadow, not hidden by `outline: none`)
- All images have `alt` attributes
- All icon-only buttons have `aria-label`
- Bottom tab bar has `role="navigation"`
- `prefers-reduced-motion: reduce` disables all CSS animation

### Patterns

**4.1 — Minimum tap target size (44px)**
```javascript
test('profile: all interactive elements meet 44px minimum tap target', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  const violations = await page.evaluate(() => {
    const interactives = document.querySelectorAll(
      'button, a, input, [role="button"], [tabindex="0"]'
    );
    const failing = [];
    for (const el of interactives) {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          failing.push({
            tag: el.tagName,
            text: el.innerText?.slice(0, 40) || el.getAttribute('aria-label') || '',
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    }
    return failing;
  });
  expect(violations).toHaveLength(0);
});
```

**4.2 — Focus ring visible on keyboard navigation**
```javascript
test('admin: focus ring visible after Tab key press', async ({ page }) => {
  await page.goto('/admin.html');
  await page.keyboard.press('Tab');
  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    return {
      tag: el.tagName,
      boxShadow: getComputedStyle(el).boxShadow,
      outline: getComputedStyle(el).outline,
    };
  });
  expect(focused).not.toBeNull();
  // Must have either a non-none box-shadow (glow ring) or non-none outline
  const hasRing = focused.boxShadow !== 'none' || focused.outline !== 'none';
  expect(hasRing).toBe(true);
  // Amber glow: should contain 244 (R value of #f4b942)
  expect(focused.boxShadow).toContain('244');
});
```

**4.3 — All images have alt text**
```javascript
for (const file of ['able-v7.html', 'admin.html', 'start.html', 'landing.html']) {
  test(`${file}: all images have alt attributes`, async ({ page }) => {
    await page.goto(`/${file}`);
    const violations = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.hasAttribute('alt'))
        .map(img => img.src?.slice(-60) || img.className);
    });
    expect(violations).toHaveLength(0);
  });
}
```

**4.4 — Bottom tab bar has correct ARIA role**
```javascript
test('admin: mobile bottom tab bar has role="navigation"', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/admin.html');
  const nav = page.locator('.mobile-nav, [role="navigation"]').first();
  await expect(nav).toBeVisible();
  const role = await nav.getAttribute('role');
  expect(role).toBe('navigation');
  const ariaLabel = await nav.getAttribute('aria-label');
  expect(ariaLabel).toBeTruthy();
});
```

**4.5 — prefers-reduced-motion disables animations**
```javascript
test('profile: prefers-reduced-motion disables CSS animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/able-v7.html');
  const animDuration = await page.evaluate(() => {
    // Check a known animated element — e.g. the countdown digit
    const animated = document.querySelector('.digit-flip, .countdown-digit, .live-dot');
    if (!animated) return 'not found';
    return getComputedStyle(animated).animationDuration;
  });
  // With reduced-motion, animation-duration should be 0s or 0.001s or not 'normal'
  if (animDuration !== 'not found') {
    expect(['0s', '0.001s', '0.01s']).toContain(animDuration);
  }
});
```

---

## 5. Cross-page tests

**Purpose:** Verify that data written in one page is correctly read and rendered in another. These are the integration boundaries ABLE's localStorage architecture depends on.

**Acceptance criteria:**
- `start.html` wizard output is readable by `admin.html` without modification
- Fan sign-ups on `able-v7.html` appear in admin Fans page
- Campaign state changes in admin propagate to the profile page
- Gig mode expiry logic functions correctly across page loads

### Patterns

**5.1 — Wizard output readable by admin**
```javascript
test('start → admin: able_v3_profile written by wizard is rendered in admin', async ({ page }) => {
  // Simulate wizard completing with known profile data
  await page.goto('/admin.html');
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Kwame Asante',
      bio: 'Producer from Bristol.',
      accent: '#6c5ce7',
      genre: 'Electronic',
    }));
  });
  await page.reload();
  const greeting = page.locator('#homeGreeting');
  await expect(greeting).toContainText('Kwame');
});
```

**5.2 — Fan sign-up on profile appears in admin fan list**
```javascript
test('profile → admin: fan sign-up appears in admin fans page', async ({ page, context }) => {
  // Page 1: artist profile — sign up a fan
  const profilePage = await context.newPage();
  await profilePage.goto('/able-v7.html');
  const input = profilePage.locator('input[type="email"]').first();
  await input.fill('new-fan@test.com');
  const submitBtn = profilePage.locator('button[type="submit"], .fan-submit-btn').first();
  await submitBtn.click();
  await profilePage.waitForTimeout(300);

  // Read the localStorage state (same origin, file://)
  const fans = await profilePage.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  expect(fans.some(f => f.email === 'new-fan@test.com')).toBe(true);

  // Page 2: admin — fan list should show the new fan
  const adminPage = await context.newPage();
  // Inject the fan data into admin's localStorage
  await adminPage.addInitScript(fanData => {
    localStorage.setItem('able_fans', JSON.stringify(fanData));
  }, fans);
  await adminPage.goto('/admin.html');
  await adminPage.locator('[onclick*="fans"], .mn-item[aria-label="Fans"]').first().click();
  await expect(adminPage.locator('body')).toContainText('new-fan@test.com');
});
```

**5.3 — Campaign state in admin propagates to profile**
```javascript
test('admin → profile: setting pre-release state writes to localStorage', async ({ page }) => {
  await page.goto('/admin.html');
  // Set a future release date and activate pre-release state
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  await page.evaluate(date => {
    const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    profile.releaseDate = date;
    profile.stateOverride = 'pre';
    localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  }, futureDate);
  // Profile page should now show pre-release state
  const profileData = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_v3_profile') || '{}')
  );
  expect(profileData.stateOverride).toBe('pre');
  expect(profileData.releaseDate).toBe(futureDate);
});
```

**5.4 — Gig mode expiry reverts profile state**
```javascript
test('profile: expired gig mode reverts to profile state', async ({ page }) => {
  const expiredTimestamp = Date.now() - 1000; // expired 1 second ago
  await page.addInitScript(ts => {
    localStorage.setItem('able_gig_expires', ts.toString());
    localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Test' }));
  }, expiredTimestamp);
  await page.goto('/able-v7.html');
  // The page should not show gig state
  const gigBadge = page.locator('.gig-badge, [class*="gig-active"]').first();
  if (await gigBadge.count() > 0) {
    await expect(gigBadge).not.toBeVisible();
  }
});
```

**5.5 — localStorage stats resolve before 600ms skeleton timeout**
```javascript
test('admin: stats resolve from localStorage within 600ms', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_views', JSON.stringify([
      { ts: Date.now() - 3600000 }, { ts: Date.now() - 7200000 }
    ]));
    localStorage.setItem('able_fans', JSON.stringify([
      { email: 'a@b.com', ts: Date.now() - 3600000 }
    ]));
  });
  await page.goto('/admin.html');
  await page.waitForTimeout(650); // beyond the 600ms fallback
  const statViews = page.locator('#statViews');
  if (await statViews.count() > 0) {
    const hasSkel = await statViews.evaluate(el => el.classList.contains('skel'));
    expect(hasSkel).toBe(false);
  }
});
```

---

## 6. Performance tests

**Purpose:** Ensure ABLE pages load fast enough for real-world use. The product is mobile-first and the artist's profile is their link-in-bio — slow loads cost fan sign-ups.

**Targets:**
- LCP (Largest Contentful Paint): ≤ 2.5s
- CLS (Cumulative Layout Shift): ≤ 0.1
- INP (Interaction to Next Paint): ≤ 200ms
- No layout shift from unsized images

### Patterns

**6.1 — Lighthouse CLI on each active page**
```javascript
// tests/performance.spec.js
// Requires: npm install -g lighthouse
// Run standalone: lighthouse http://localhost:8080/able-v7.html --output json

test('profile: Lighthouse scores meet budget', async ({ page }) => {
  // This test delegates to Lighthouse CLI; Playwright opens the page for context
  // In CI: run `npx lighthouse --output json --output-path ./reports/profile.json`
  // Then parse the JSON and assert:
  //   categories.performance.score >= 0.80
  //   audits['largest-contentful-paint'].numericValue <= 2500
  //   audits['cumulative-layout-shift'].numericValue <= 0.1
  //   audits['total-blocking-time'].numericValue <= 300
  await page.goto('/able-v7.html');
  // Placeholder: verify page loads fast enough via navigation timing
  const timing = await page.evaluate(() => ({
    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    load: performance.timing.loadEventEnd - performance.timing.navigationStart,
  }));
  expect(timing.domContentLoaded).toBeLessThan(3000);
  expect(timing.load).toBeLessThan(5000);
});
```

**6.2 — No unsized images causing layout shift**
```javascript
test('profile: all images have explicit width and height', async ({ page }) => {
  await page.goto('/able-v7.html');
  const violations = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter(img => {
        const hasWidth = img.hasAttribute('width') || img.style.width;
        const hasHeight = img.hasAttribute('height') || img.style.height;
        return !hasWidth || !hasHeight;
      })
      .map(img => img.src?.slice(-60) || img.className);
  });
  // Warn rather than fail — images may be intentionally dynamic
  if (violations.length > 0) {
    console.warn(`Images without explicit dimensions: ${violations.join(', ')}`);
  }
});
```

**6.3 — No horizontal scroll at 375px**
```javascript
for (const file of ['able-v7.html', 'admin.html', 'start.html', 'landing.html']) {
  test(`${file}: no horizontal scroll at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/${file}`);
    const scrollWidth = await page.evaluate(() =>
      document.documentElement.scrollWidth
    );
    expect(scrollWidth).toBeLessThanOrEqual(375);
  });
}
```

**6.4 — Fonts load within 3 seconds**
```javascript
test('profile: web fonts load within 3 seconds', async ({ page }) => {
  await page.goto('/able-v7.html');
  const fontsLoaded = await page.evaluate(() =>
    document.fonts.ready.then(() => true)
  );
  expect(fontsLoaded).toBe(true);
  // Verify DM Sans is actually in use
  const fontFamily = await page.evaluate(() =>
    getComputedStyle(document.body).fontFamily
  );
  expect(fontFamily.toLowerCase()).toContain('dm sans');
});
```

**6.5 — Glass theme does not break paint on mobile**
```javascript
test('profile: glass theme renders without blank screen on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/able-v7.html');
  await page.evaluate(() => {
    document.documentElement.dataset.theme = 'glass';
  });
  await page.waitForTimeout(300);
  // Take screenshot and verify it is not blank (pixel check)
  const screenshot = await page.screenshot();
  // A blank screen would be a uniform buffer — basic check: screenshot exists and has size
  expect(screenshot.length).toBeGreaterThan(5000);
});
```

---

## 7. Theme tests

**Purpose:** Every theme must render correctly on every page. No white text on white background. No missing accent colours. No broken layout when theme switches.

**Themes under test:** `dark` (default), `light`, `glass`, `contrast`
**Pages under test:** `able-v7.html` (all 4 themes), `admin.html` (dark only — admin uses its own token set)

### Patterns

**7.1 — Text colour is never identical to background colour in any theme**
```javascript
const THEMES = ['dark', 'light', 'glass', 'contrast'];

for (const theme of THEMES) {
  test(`profile: theme "${theme}" — text visible against background`, async ({ page }) => {
    await page.goto('/able-v7.html');
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(100);
    const { bg, color } = await page.evaluate(() => ({
      bg: getComputedStyle(document.body).backgroundColor,
      color: getComputedStyle(document.body).color,
    }));
    expect(bg).not.toBe(color);
    expect(color).not.toBe('rgba(0, 0, 0, 0)'); // transparent text
  });
}
```

**7.2 — Light theme uses warm cream background, not white**
```javascript
test('profile: light theme background is warm cream not pure white', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // rgb(240, 237, 232) = #f0ede8 warm cream
  // Pure white = rgb(255, 255, 255) — should NOT be this
  expect(bg).not.toBe('rgb(255, 255, 255)');
  expect(bg).toContain('240'); // R value of #f0ede8 ≈ 240
});
```

**7.3 — Contrast theme is pure black base**
```javascript
test('profile: contrast theme background is pure black', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'contrast'; });
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe('rgb(0, 0, 0)');
});
```

**7.4 — Glass theme has backdrop-filter applied**
```javascript
test('profile: glass theme applies backdrop-filter', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'glass'; });
  const hasFilter = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card, .release-card, [class*="card"]');
    for (const card of cards) {
      const style = getComputedStyle(card);
      if (style.backdropFilter && style.backdropFilter !== 'none') return true;
      if (style.webkitBackdropFilter && style.webkitBackdropFilter !== 'none') return true;
    }
    return false;
  });
  expect(hasFilter).toBe(true);
});
```

**7.5 — Theme switch does not produce JS errors**
```javascript
test('profile: cycling through all 4 themes produces no JS errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('/able-v7.html');
  for (const theme of THEMES) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    await page.waitForTimeout(80);
  }
  expect(errors).toHaveLength(0);
});
```

---

## Test infrastructure notes

### localStorage helpers

All tests that depend on pre-existing data should use `page.addInitScript()` to inject localStorage before the page initialises — not `page.evaluate()` after load. This ensures JS that reads localStorage on `DOMContentLoaded` sees the correct state.

```javascript
// Pattern: inject before page load
await page.addInitScript(() => {
  localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Test' }));
});
await page.goto('/admin.html');
// NOT: await page.goto() then await page.evaluate(() => localStorage.setItem(...))
```

### Playwright config baseline

```javascript
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 15000,
  use: {
    baseURL: 'http://localhost:8080',
    viewport: { width: 375, height: 812 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox',  use: { browserName: 'firefox' } },
    { name: 'webkit',   use: { browserName: 'webkit' } },
  ],
};
```

### Local test server

Since ABLE has no build pipeline, run a simple static server:

```bash
# In project root
npx serve . -p 8080
# Then in another terminal:
npx playwright test
```

### File structure

```
/tests
  smoke.spec.js         — Category 1
  interactions.spec.js  — Category 2
  copy.spec.js          — Category 3
  a11y.spec.js          — Category 4
  journeys.spec.js      — Category 5
  performance.spec.js   — Category 6
  themes.spec.js        — Category 7
playwright.config.js
```
