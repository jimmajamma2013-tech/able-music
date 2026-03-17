// @ts-check
/**
 * ABLE Copy Regression Tests — runs on every commit
 * Scans all active HTML files for banned phrases.
 * One failing test per phrase × file combination — exact failure location reported.
 *
 * Banned phrase list lives here (not in a shared file) so the test is self-contained.
 */

const { test, expect } = require('@playwright/test');

/** @type {string[]} */
const BANNED_PHRASES = [
  'dashboard',            // use "your page" or the specific section name
  'superfan',             // use "dedicated listeners" or "people who show up"
  'turn fans into',       // paternalistic conversion language
  'going viral',          // antithetical to ABLE's register
  'monetise',             // use "let people support you directly"
  'monetize',
  'content creator',      // use "artist"
  'engage your followers',
  'engage your fans',
  'newsletter',           // use "your list" or "stay close"
  'mailing list',
  'welcome aboard',       // generic SaaS onboarding
  "you're all set",
  'upgrade to continue',  // always specify what the artist gets
  'grow your audience',   // use "reach people who care"
];

/**
 * Files to scan. These are the 4 active user-facing pages.
 * Do NOT add admin.html CSS tokens or shared utilities — they contain token names,
 * not user-facing copy, and token names are exempt from the banned list.
 */
const ACTIVE_FILES = [
  '/able-v7.html',
  '/admin.html',
  '/start.html',
  '/landing.html',
];

// ---------------------------------------------------------------------------
// 3.1 — DOM text scan: one test per (file × phrase)
// ---------------------------------------------------------------------------
// We use test.describe.configure to avoid a parallelism collision on the same page.
test.describe('Copy regression — banned phrases', () => {
  for (const file of ACTIVE_FILES) {
    for (const phrase of BANNED_PHRASES) {
      test(`${file}: does not contain "${phrase}"`, async ({ page }) => {
        await page.goto(file);

        const visibleText = await page.evaluate(() =>
          document.body.innerText.toLowerCase()
        );

        if (!visibleText.includes(phrase.toLowerCase())) {
          // ✓ phrase not present in visible text — pass
          return;
        }

        // Find the exact element to produce a useful failure message
        const location = await page.evaluate(p => {
          const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
          );
          let node;
          while ((node = walker.nextNode())) {
            const text = node.textContent || '';
            if (text.toLowerCase().includes(p.toLowerCase())) {
              const parent = node.parentElement;
              const tag = parent ? parent.tagName : 'TEXT';
              const cls = parent ? parent.className.slice(0, 40) : '';
              return `${tag}.${cls}: "${text.trim().slice(0, 80)}"`;
            }
          }
          return 'location not found in text nodes (may be in attribute)';
        }, phrase);

        throw new Error(
          `Banned phrase "${phrase}" found in visible text of ${file}\n` +
          `  Location: ${location}\n` +
          `  Fix: replace with approved alternative from docs/systems/copy/SPEC.md`
        );
      });
    }
  }
});

// ---------------------------------------------------------------------------
// 3.2 — No exclamation marks in admin UI copy
// (Exception: error messages with ! are fine, but dashboard copy should not)
// ---------------------------------------------------------------------------
test('admin: no exclamation marks in visible UI copy', async ({ page }) => {
  await page.goto('/admin.html');
  const textLines = await page.evaluate(() =>
    document.body.innerText.split('\n').map(l => l.trim()).filter(Boolean)
  );
  const violations = textLines.filter(line => {
    if (line.startsWith('//') || line.startsWith('/*')) return false; // code comments
    if (line.length < 3) return false;
    return line.includes('!');
  });
  // Log all violations for debugging before asserting
  if (violations.length > 0) {
    console.log('Exclamation mark violations:', violations.slice(0, 5));
  }
  expect(violations, `Exclamation marks found in admin UI copy:\n${violations.join('\n')}`).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// 3.3 — Greeting register: "Good to see you" not "Welcome back"
// ---------------------------------------------------------------------------
test('admin: greeting uses correct register (not "Welcome back")', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('able_v3_profile', JSON.stringify({ name: 'Asha' }));
    localStorage.setItem('admin_visit_dates', JSON.stringify(['2026-01-01', '2026-01-02']));
    // admin_ever_visited must be set to trigger "Good to see you" (return-visitor path)
    localStorage.setItem('admin_ever_visited', '1');
  });
  await page.goto('/admin.html');
  const greeting = page.locator('#homeGreeting').first();
  if (await greeting.count() > 0) {
    const text = await greeting.innerText();
    expect(text.toLowerCase()).not.toContain('welcome back');
    expect(text).toContain('Good to see you');
  }
});

// ---------------------------------------------------------------------------
// 3.4 — Tier gate copy is specific (not bare "Upgrade")
// ---------------------------------------------------------------------------
test('admin: upgrade prompts include specific value, not bare "Upgrade"', async ({ page }) => {
  await page.goto('/admin.html');
  const gateButtons = page.locator('.glo-btn');
  const count = await gateButtons.count();
  for (let i = 0; i < count; i++) {
    const text = (await gateButtons.nth(i).innerText()).toLowerCase().trim();
    expect(text, `Gold lock button must not be bare "Upgrade"`).not.toBe('upgrade');
    expect(text, `Gold lock button must not say "upgrade to continue"`).not.toContain('upgrade to continue');
  }
});
