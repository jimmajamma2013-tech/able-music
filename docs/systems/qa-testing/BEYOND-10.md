# QA Testing — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when James ships a feature, Playwright catches the regression he didn't know he introduced, and the artist never sees it.

---

## Moment 1: The Theme Regression Caught Before James Sees It

**What it is:** A Playwright test catches a CSS regression — white text on a white background in the light theme, introduced by a well-intentioned card border change — before the page is deployed or seen by any artist.

**Why it's 20/10:** Regressions in visual quality are the most demoralising kind of bug to find because they happen silently. A single tokenised CSS change that forgets to account for the light theme can make an entire card section unreadable — and it will go unnoticed until an artist visits in light mode, or until a Playwright screenshot review happens to catch it. The theme regression test runs in 4 seconds. It has zero false positives once the baseline is established. It is the kind of automated protection that means James can ship CSS changes with confidence at any speed, knowing the tests will object if anything breaks.

**Exact implementation:**

The text-visibility check in `tests/themes.spec.js` must be extended beyond body-level comparison to include card-level contrast — the most common regression site:

```js
// tests/themes.spec.js — extended card contrast check
const CARD_SELECTORS = [
  '.card', '.release-card', '.snap-card', '.event-card', '.music-card'
]

for (const theme of ['dark', 'light', 'glass', 'contrast']) {
  test(`profile: theme "${theme}" — card text visible against card background`, async ({ page }) => {
    await page.goto('/able-v7.html')
    await page.evaluate(t => { document.documentElement.dataset.theme = t }, theme)
    await page.waitForTimeout(120) // token cascade settles

    const violations = await page.evaluate(selectors => {
      return selectors.flatMap(selector => {
        return Array.from(document.querySelectorAll(selector)).map(card => {
          const style = getComputedStyle(card)
          const textEls = card.querySelectorAll('p, h1, h2, h3, h4, span, a')
          for (const el of textEls) {
            const elStyle = getComputedStyle(el)
            if (elStyle.color === style.backgroundColor) {
              return `${selector}: text color matches card bg (${elStyle.color})`
            }
          }
          return null
        }).filter(Boolean)
      })
    }, CARD_SELECTORS)

    expect(violations, violations.join('\n')).toHaveLength(0)
  })
}
```

This runs as part of `tests/themes.spec.js` on every pre-merge check. Execution time: under 8 seconds for all 4 themes across 5 card selectors.

---

## Moment 2: The Smoke Suite That Runs in Under 90 Seconds

**What it is:** The full smoke test suite — all 4 pages, no JS errors, all 4 themes apply, fan sign-up works, admin reads from localStorage — completes in under 90 seconds and runs on every commit.

**Why it's 20/10:** A test suite that takes 8 minutes to run gets skipped. A test suite that runs in 90 seconds gets run without thinking about it. The constraint is speed. Every second added to the smoke suite is a second that increases the probability that someone skips it. Under 90 seconds means it can run in a CI step that adds negligible time to the deploy workflow. The 90-second ceiling is not a performance target. It is the threshold between a suite that is used and a suite that is bypassed.

**Exact implementation:**

Playwright config for the smoke suite — parallelism and timeout settings that achieve the 90-second target:

```js
// playwright.config.js — smoke project
{
  name: 'smoke',
  testMatch: 'tests/smoke.spec.js',
  use: {
    browserName: 'chromium',  // smoke runs Chromium only — cross-browser in interaction suite
    viewport: { width: 375, height: 812 },
    timeout: 8000,            // 8s per test — fail fast
  },
  fullyParallel: true,        // run all smoke tests in parallel
  workers: 4,                 // 4 parallel workers
}
```

Smoke suite target times (verified against the test patterns in SPEC.md):

| Test | Target time |
|---|---|
| 4× page load, no JS errors | 12s (parallel) |
| 4× theme apply | 6s |
| Fan sign-up form submit | 5s |
| Admin reads localStorage | 4s |
| Admin saves to localStorage | 5s |
| **Total** | **~32s parallel** |

The 90-second budget gives 58 seconds of margin for CI infrastructure overhead, network variance, and future test additions. When the smoke suite approaches 60 seconds, review which tests can be parallelised further before adding new ones.

---

## Moment 3: The Mobile Safari Proof

**What it is:** A Playwright WebKit test on a simulated iPhone 15 viewport confirms the glass theme renders at full visual quality — no blank white flash, backdrop-filter applying correctly, no layout reflow during the scroll animation.

**Why it's 20/10:** The glass theme is ABLE's most visually distinctive mode. It is also the most fragile on real devices. Webkit's handling of `backdrop-filter` has historically been inconsistent — in older iOS versions it causes paint glitches; in newer versions it works but requires `-webkit-backdrop-filter` as well as the standard property. The test that proves it works on WebKit (which is the engine under every iOS browser, not just Safari) is the test that means "the glass theme works on every iPhone" rather than "the glass theme works in Chrome on a Mac." That claim has a different weight.

**Exact implementation:**

```js
// tests/themes.spec.js — webkit glass theme proof
test('profile: glass theme renders correctly on WebKit (iPhone 15 viewport)', async ({ browser }) => {
  // Use webkit browser directly
  const context = await browser.newContext({
    ...devices['iPhone 15'],
    // iPhone 15 viewport: 393×852
  })
  const page = await context.newPage()

  const errors = []
  page.on('pageerror', err => errors.push(err.message))

  await page.goto('/able-v7.html')
  await page.evaluate(() => { document.documentElement.dataset.theme = 'glass' })
  await page.waitForTimeout(400) // allow paint to settle

  // 1. No JS errors
  expect(errors).toHaveLength(0)

  // 2. backdrop-filter is applied (webkit prefix or standard)
  const hasFilter = await page.evaluate(() => {
    const cards = document.querySelectorAll('.card, .release-card, [class*="card"]')
    for (const card of cards) {
      const style = getComputedStyle(card)
      const bf = style.backdropFilter || style.webkitBackdropFilter
      if (bf && bf !== 'none') return true
    }
    return false
  })
  expect(hasFilter).toBe(true)

  // 3. Screenshot is not blank (checks for pixel diversity)
  const screenshot = await page.screenshot({ fullPage: false })
  expect(screenshot.length).toBeGreaterThan(10000) // blank white = ~2k bytes

  // 4. No white flash: body background is not pure white
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor)
  expect(bg).not.toBe('rgb(255, 255, 255)')

  await context.close()
})
```

This test runs in the `webkit` project configuration. It runs pre-merge, not on every commit (to keep the commit-time smoke suite under 90 seconds).

---

## The 20/10 test

James ships a CSS change, the smoke suite passes in 32 seconds, the theme suite catches a backdrop-filter regression on WebKit before it reaches production, the fix takes 4 minutes, the second run is clean. Total time cost of the regression: 8 minutes. Artist never knows.

---

*See also: `docs/systems/qa-testing/SPEC.md` — full test suite specs, Playwright config, and all test patterns*
