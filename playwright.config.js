// @ts-check
/**
 * ABLE — Playwright configuration
 * Runs a local HTTP server so service workers, fonts, and localStorage
 * all behave identically to production. No build step needed.
 *
 * Usage:
 *   npx playwright test                    # all tests
 *   npx playwright test tests/smoke.spec.js # single suite
 *   npx playwright test --reporter=list    # verbose output
 */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 20_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  workers: 4,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'http://localhost:8080',
    viewport: { width: 375, height: 812 },
    // Don't slow things down in CI — no video by default
    video: 'off',
    screenshot: 'only-on-failure',
    // Google Fonts will 404 in tests — suppress network failures from third-party
    ignoreHTTPSErrors: true,
  },

  // Spin up `npx serve` pointing at the project root before tests run.
  // `reuseExistingServer` means you can also run `npx serve . -p 8080` yourself
  // and skip the automatic start (handy when iterating on tests).
  webServer: {
    command: 'npx serve . -p 8080 --no-clipboard --no-port-switching',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 15_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  projects: [
    {
      name: 'chromium-mobile',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'chromium-desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
  ],
});
