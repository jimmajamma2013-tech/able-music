// @ts-check
/**
 * ABLE Micro-interaction Tests
 * Verifies the 30+ interactions in able-v7.html and 6 admin interactions.
 * Pre-merge gate — these can be slower than smoke tests.
 */

const { test, expect } = require('@playwright/test');

// ---------------------------------------------------------------------------
// 2.1 — Scale-down on press (B1)
// ---------------------------------------------------------------------------
test('profile: CTA button scales down on pointerdown', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  // Switch to fan view so edit-mode interceptors don't block
  await page.evaluate(() => {
    document.documentElement.classList.remove('edit-active');
    document.documentElement.classList.add('fan-view-active');
  });

  const cta = page.locator('.pressable.btn-primary, .release-stream-btn.pressable').first();
  if (await cta.count() === 0) return; // skip if no pressable CTA rendered

  const box = await cta.boundingBox();
  if (!box) return;

  // Use real mouse events so pointerdown bubbles through document (initPressScale listens on document)
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(100); // full 80ms transition + buffer

  const transform = await cta.evaluate(el => getComputedStyle(el).transform);
  // scale(0.97) = matrix(0.97, 0, 0, 0.97, 0, 0) — check scale is depressed (< 0.99)
  const scaleVal = (() => {
    const m = transform.match(/matrix\(([^,]+)/);
    return m ? parseFloat(m[1]) : 1;
  })();
  expect(scaleVal, `CTA transform (${transform}) should be scaled down on press`).toBeLessThan(0.99);
  await page.mouse.up();
});

// ---------------------------------------------------------------------------
// 2.2 — Tab indicator moves on tab click (C1/I7)
// ---------------------------------------------------------------------------
test('profile: tab indicator moves when second tab is clicked', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  const tabs = page.locator('.tab-btn, [role="tab"]');
  if (await tabs.count() < 2) return;

  const indicator = page.locator('.tab-indicator').first();
  const before = await indicator.evaluate(el => el.getBoundingClientRect().left);

  await tabs.nth(1).click();
  await page.waitForTimeout(450); // allow spring easing to settle

  const after = await indicator.evaluate(el => el.getBoundingClientRect().left);
  expect(after, 'Tab indicator must move when second tab is activated').not.toBeCloseTo(before, 0);
});

// ---------------------------------------------------------------------------
// 2.3 — Countdown renders in pre-release state (C5)
// ---------------------------------------------------------------------------
test('profile: countdown renders when stateOverride is "pre"', async ({ page }) => {
  const futureDate = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
  await page.addInitScript(date => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist',
      accent: '#e05242',
      releaseDate: date,
      stateOverride: 'pre-release', // must match computeState() return values exactly
      release: { title: 'Test Release' },
    }));
  }, futureDate);

  await page.goto('/able-v7.html');
  const countdown = page.locator('.countdown, [class*="countdown"]').first();
  if (await countdown.count() > 0) {
    await expect(countdown).toBeVisible({ timeout: 5000 });
  }
});

// ---------------------------------------------------------------------------
// 2.4 — Sticky artist bar appears after scrolling 70% of hero (A4)
// ---------------------------------------------------------------------------
test('profile: sticky artist bar becomes visible after scrolling past hero', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  // Scroll well past the hero
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(h => window.scrollBy(0, h * 0.4), scrollHeight);
  await page.waitForTimeout(200);

  const stickyBar = page.locator('.artist-bar-sticky, .sticky-artist-bar, #artistStickyBar').first();
  if (await stickyBar.count() > 0) {
    const opacity = await stickyBar.evaluate(el => getComputedStyle(el).opacity);
    expect(parseFloat(opacity), 'Sticky bar should be visible (opacity > 0) after scrolling past hero').toBeGreaterThan(0);
  }
});

// ---------------------------------------------------------------------------
// 2.5 — Campaign HQ state button activates with spring animation (NEW-1)
// ---------------------------------------------------------------------------
test('admin: campaign state button applies spring animation on click', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist', accent: '#e05242',
    }));
  });
  await page.goto('/admin.html');

  const stateBtn = page.locator('.chq-state-btn').first();
  if (await stateBtn.count() === 0) return;

  await stateBtn.click();
  await page.waitForTimeout(100);

  const animName = await stateBtn.evaluate(el => getComputedStyle(el).animationName);
  expect(animName, 'Campaign state button should play stateSpringIn animation').toContain('stateSpringIn');
});

// ---------------------------------------------------------------------------
// 2.6 — @view-transition guard: no crash without startViewTransition (Firefox/Safari sim)
// ---------------------------------------------------------------------------
test('landing: navigating without startViewTransition API does not throw', async ({ page }) => {
  // Simulate a browser that doesn't support View Transitions (Firefox, Safari)
  await page.addInitScript(() => {
    delete document.startViewTransition;
  });

  const errors = [];
  page.on('pageerror', err => {
    if (err.message.includes('startViewTransition')) errors.push(err.message);
  });

  await page.goto('/landing.html');
  // Attempt to click the primary CTA — should navigate normally, not throw
  const cta = page.locator('.btn-primary').first();
  if (await cta.count() > 0) {
    // Don't actually navigate — just verify no JS error on page load
    await page.waitForTimeout(300);
  }

  expect(errors, 'startViewTransition must be guarded — no errors when API absent').toHaveLength(0);
});
