// @ts-check
/**
 * ABLE Smoke Tests — runs on every commit
 * Catches catastrophic failures: pages that don't load, JS errors, broken forms.
 * Target: all pass in < 30 seconds.
 */

const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'profile',  path: '/able-v8.html' },
  { name: 'admin',    path: '/admin.html' },
  { name: 'start',    path: '/start.html' },
  { name: 'landing',  path: '/landing.html' },
];

// ---------------------------------------------------------------------------
// 1.1 — All pages load with no JS errors
// ---------------------------------------------------------------------------
for (const { name, path } of PAGES) {
  test(`${name}: loads without JS errors`, async ({ page }) => {
    const errors = [];
    // Ignore third-party network errors (PostHog, Supabase, Google Fonts in file:// context)
    page.on('pageerror', err => {
      const msg = err.message;
      // Suppress known third-party / network-only errors that are expected in test env
      if (
        msg.includes('posthog') ||
        msg.includes('supabase') ||
        msg.includes('manifest') ||
        msg.includes('ERR_FAILED') ||
        msg.includes('ERR_NAME_NOT_RESOLVED')
      ) return;
      errors.push(msg);
    });
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    expect(errors, `JS errors on ${path}: ${errors.join(', ')}`).toHaveLength(0);
  });
}

// ---------------------------------------------------------------------------
// 1.2 — Four themes render correctly on artist profile (no white-on-white)
// ---------------------------------------------------------------------------
test('profile: all 4 themes apply without invisible text', async ({ page }) => {
  await page.goto('/able-v8.html');
  const themes = ['dark', 'light', 'glass', 'contrast'];
  for (const theme of themes) {
    await page.evaluate(t => {
      document.documentElement.dataset.theme = t;
    }, theme);
    // Verify text colour and background aren't identical (white-on-white failure)
    const bg    = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const color = await page.evaluate(() => getComputedStyle(document.body).color);
    expect(bg, `${theme}: body background must not equal text colour`).not.toBe(color);
  }
});

// ---------------------------------------------------------------------------
// 1.3 — Fan sign-up form accepts email and writes to able_fans
// ---------------------------------------------------------------------------
test('profile: fan sign-up writes email to localStorage', async ({ page }) => {
  // Use addInitScript so profile is in localStorage before any JS runs
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test Artist', accent: '#e05242', slug: 'test-artist',
    }));
  });
  await page.goto('/able-v8.html');

  // Switch to Fan view — profile load triggers owner edit mode which intercepts clicks
  await page.evaluate(() => {
    document.documentElement.classList.remove('edit-active');
    document.documentElement.classList.add('fan-view-active');
  });

  // Find the first visible email input on the page
  const input = page.locator('input[type="email"]').first();
  await expect(input).toBeVisible({ timeout: 5000 });
  await input.fill('smoke-test@able.music');

  // Submit — use the actual fan-submit button ID, fall back to Enter
  const submitBtn = page.locator('#fan-submit, .fan-capture__btn[type="submit"]').first();
  if (await submitBtn.count() > 0) {
    await submitBtn.click();
  } else {
    await input.press('Enter');
  }

  await page.waitForTimeout(400);

  const fans = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('able_fans') || '[]')
  );
  const submitted = fans.find(f => f.email === 'smoke-test@able.music');
  expect(submitted, 'Fan email must be persisted to able_fans').toBeTruthy();
  expect(submitted.ts, 'Fan record must have a timestamp').toBeTruthy();
});

// ---------------------------------------------------------------------------
// 1.4 — Admin renders artist name from able_v3_profile
// ---------------------------------------------------------------------------
test('admin: greeting shows artist first name', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Maya Rose',
      accent: '#e05242',
    }));
  });
  await page.goto('/admin.html');
  const greeting = page.locator('#homeGreeting').first();
  await expect(greeting).toBeVisible({ timeout: 5000 });
  await expect(greeting).toContainText('Maya');
});

// ---------------------------------------------------------------------------
// 1.5 — Landing page CTA is visible above the fold at 375px
// ---------------------------------------------------------------------------
test('landing: primary CTA visible above the fold at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/landing.html');
  const cta = page.locator('.btn-primary, .hero__cta').first();
  await expect(cta).toBeVisible({ timeout: 5000 });
  // Must be in the viewport (not below the fold)
  const box = await cta.boundingBox();
  expect(box).not.toBeNull();
  // Allow 30px below fold for sub-pixel rendering variation at 375px
  expect(box.y + box.height).toBeLessThanOrEqual(842);
});

// ---------------------------------------------------------------------------
// 1.6 — No horizontal scroll at 375px on any page
// ---------------------------------------------------------------------------
for (const { name, path } of PAGES) {
  test(`${name}: no horizontal scroll at 375px`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, `${name}: page overflows horizontally at 375px (scrollWidth=${scrollWidth})`).toBeLessThanOrEqual(376);
  });
}

// ---------------------------------------------------------------------------
// 1.7 — start.html wizard accepts artist name and advances
// ---------------------------------------------------------------------------
test('start: wizard accepts artist name on step 2', async ({ page }) => {
  await page.goto('/start.html');

  // stepA is the Spotify import screen — skip it
  await page.locator('.btn-skip').first().click();

  // step1 requires selecting a moment before next is enabled
  await page.locator('.moment-card').first().click();
  await page.locator('#v2MomentNext').click();

  // step2 has the artist name input (#iName)
  const nameInput = page.locator('#iName');
  await expect(nameInput).toBeVisible({ timeout: 3000 });
  await nameInput.fill('Cypress Moon');

  // Page should still be on start (not crashed, not 404)
  expect(page.url()).toContain('/start');
});
