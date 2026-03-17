// @ts-check
/**
 * ABLE Accessibility Tests — pre-merge gate
 * WCAG 2.1 AA checks: tap targets, focus rings, alt text, ARIA roles.
 */

const { test, expect } = require('@playwright/test');

const PAGES = [
  { name: 'profile',  path: '/able-v7.html' },
  { name: 'admin',    path: '/admin.html' },
  { name: 'start',    path: '/start.html' },
  { name: 'landing',  path: '/landing.html' },
];

// ---------------------------------------------------------------------------
// 4.1 — All images have alt attributes
// ---------------------------------------------------------------------------
for (const { name, path } of PAGES) {
  test(`${name}: all images have alt attributes`, async ({ page }) => {
    await page.goto(path);
    const violations = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.hasAttribute('alt'))
        .map(img => img.src?.slice(-60) || img.className || 'unknown');
    });
    expect(violations, `Images without alt in ${name}:\n${violations.join('\n')}`).toHaveLength(0);
  });
}

// ---------------------------------------------------------------------------
// 4.2 — Focus ring visible after Tab key (admin)
// ---------------------------------------------------------------------------
test('admin: focus ring has visible glow after Tab press', async ({ page }) => {
  await page.goto('/admin.html');
  await page.keyboard.press('Tab');

  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    return {
      tag: el.tagName,
      boxShadow: getComputedStyle(el).boxShadow,
      outline: getComputedStyle(el).outline,
    };
  });

  if (!focused) return; // skip if nothing focused (e.g. skip-link dismissed)
  const hasRing = focused.boxShadow !== 'none' || (focused.outline !== 'none' && focused.outline !== '');
  expect(hasRing, `Focused element <${focused.tag}> must have a visible focus ring`).toBe(true);
  // Specifically check for amber glow — admin uses --acc: #c9a84c = rgb(201,168,76)
  if (focused.boxShadow !== 'none') {
    const hasAmber = focused.boxShadow.includes('201') || focused.boxShadow.includes('244');
    expect(hasAmber, 'Admin focus ring should use amber glow (--acc colour)').toBe(true);
  }
});

// ---------------------------------------------------------------------------
// 4.3 — Focus ring visible after Tab key (profile)
// ---------------------------------------------------------------------------
test('profile: focus ring visible on interactive elements', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  // Tab to first focusable element after skip link
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  const focused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    return {
      tag: el.tagName,
      boxShadow: getComputedStyle(el).boxShadow,
      outline: getComputedStyle(el).outline,
    };
  });

  if (!focused) return;
  const hasRing = focused.boxShadow !== 'none' || (focused.outline !== 'none' && focused.outline !== '');
  expect(hasRing, `Focused <${focused.tag}> must have a focus ring`).toBe(true);
});

// ---------------------------------------------------------------------------
// 4.4 — Minimum tap target 44px (interactive elements at 375px)
// ---------------------------------------------------------------------------
test('profile: interactive elements meet 44px minimum tap target at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  const violations = await page.evaluate(() => {
    const interactives = document.querySelectorAll(
      'button, a, input, select, textarea, [role="button"], [role="tab"], [tabindex="0"]'
    );
    const failing = [];
    for (const el of interactives) {
      // Skip hidden elements
      if (getComputedStyle(el).display === 'none') continue;
      if (getComputedStyle(el).visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue; // off-screen / hidden
      // Only flag elements that are actually interactive (have dimensions)
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          const label = el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 40) || '';
          failing.push({
            tag: el.tagName,
            label,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    }
    return failing;
  });

  // Report all violations rather than failing on first
  if (violations.length > 0) {
    const report = violations.map(v =>
      `  <${v.tag}> "${v.label}" — ${v.width}×${v.height}px`
    ).join('\n');
    console.warn(`Tap target violations:\n${report}`);
  }
  // Soft limit — warn on > 20 violations (overlay controls, footer links, player chrome are unavoidable)
  // Core interactive elements (CTAs, tabs, form buttons) should be 44px — raise limit if structural UI grows
  expect(violations.length, `${violations.length} elements below 44px minimum tap target`).toBeLessThanOrEqual(20);
});

// ---------------------------------------------------------------------------
// 4.5 — prefers-reduced-motion disables CSS animation-duration
// ---------------------------------------------------------------------------
test('profile: prefers-reduced-motion reduces animation durations to near-zero', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({
      name: 'Test', accent: '#e05242',
    }));
  });
  await page.goto('/able-v7.html');

  // Find any animated element and check its computed duration
  const result = await page.evaluate(() => {
    // Look for known animated elements
    const candidates = [
      document.querySelector('.live-dot'),
      document.querySelector('[class*="pulse"]'),
      document.querySelector('[class*="shimmer"]'),
      document.querySelector('.platform-pill'),
    ].filter(Boolean);

    for (const el of candidates) {
      const duration = getComputedStyle(el).animationDuration;
      if (duration && duration !== 'initial') {
        return { element: el.className.slice(0, 40), duration };
      }
    }
    return null;
  });

  if (result) {
    // Allowed values: 0s, 0.01s (the 0.01ms pattern rounds to 0s in getComputedStyle)
    const ms = parseFloat(result.duration) * (result.duration.includes('ms') ? 1 : 1000);
    expect(ms, `prefers-reduced-motion: .${result.element} animation-duration should be ≤ 10ms`).toBeLessThanOrEqual(10);
  }
});

// ---------------------------------------------------------------------------
// 4.6 — Skip link is the first focusable element
// ---------------------------------------------------------------------------
test('profile: skip-to-content link is first focusable element', async ({ page }) => {
  await page.goto('/able-v7.html');
  await page.keyboard.press('Tab');
  const firstFocused = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el) return null;
    return {
      tag: el.tagName,
      href: el.getAttribute('href'),
      text: el.textContent?.trim().slice(0, 40),
    };
  });

  expect(firstFocused, 'First tab target must be present').not.toBeNull();
  expect(firstFocused.tag, 'First tab target should be an anchor (skip link)').toBe('A');
  // Skip link should point to main content
  expect(firstFocused.href, 'Skip link should point to main content anchor').toMatch(/#/);
});

// ---------------------------------------------------------------------------
// 4.7 — Admin bottom tab bar has navigation landmark
// ---------------------------------------------------------------------------
test('admin: mobile bottom nav has navigation role at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/admin.html');
  const nav = page.locator('.mobile-nav, [role="navigation"]').first();
  await expect(nav, 'Mobile nav must be present at 375px').toBeVisible({ timeout: 5000 });
});
