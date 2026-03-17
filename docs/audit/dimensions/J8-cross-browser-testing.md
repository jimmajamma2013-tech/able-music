# Dimension J8 — Cross-Browser Testing
**Category:** Launch Readiness & Cross-Page Coherence
**Phase:** 10 (Launch)
**Status:** Not started

All four pages tested in: Safari iOS 17, Chrome Android, Chrome desktop, Firefox desktop, Safari macOS. No layout breaks, JS errors, or missing features in any tested browser. Full compliance means that every fan — regardless of their device — sees the same high-quality ABLE experience. The known critical failure is the Glass theme: `backdrop-filter: blur(28px) saturate(180%)` is not supported in Firefox, and there is currently no documented fallback. A Firefox user on the Glass theme sees a completely transparent panel over the background artwork, which makes text unreadable. This must be resolved before the Glass theme is offered to any artist.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add a `@supports (backdrop-filter: blur(1px))` guard around Glass theme styles — browsers that don't support it get a fallback background | ALL | 5 | 2 | H | 1 |
| 2 | Define the Glass theme fallback background for Firefox: `background: rgba(13, 14, 26, 0.92)` — opaque dark panel instead of transparent | ALL | 5 | 2 | H | 1 |
| 3 | Test the Glass theme in Firefox desktop — confirm the fallback renders text legibly | V8 | 5 | 1 | H | 1 |
| 4 | Test all four themes (Dark, Light, Contrast, Glass) in Safari iOS 17 on a real iPhone | V8 | 5 | 2 | H | 1 |
| 5 | Test all four themes in Chrome Android on a real device | V8 | 5 | 2 | H | 1 |
| 6 | Test all four themes in Chrome desktop (macOS) | V8 | 4 | 1 | M | 1 |
| 7 | Test all four themes in Firefox desktop (macOS) | V8 | 4 | 1 | M | 1 |
| 8 | Test all four themes in Safari macOS 17 | V8 | 4 | 1 | M | 1 |
| 9 | Confirm `admin.html` loads and functions correctly in Safari iOS 17 | ADM | 5 | 2 | H | 1 |
| 10 | Confirm `admin.html` loads and functions correctly in Chrome Android | ADM | 5 | 2 | H | 1 |
| 11 | Confirm `admin.html` loads and functions correctly in Chrome desktop | ADM | 4 | 1 | M | 1 |
| 12 | Confirm `admin.html` loads and functions correctly in Firefox desktop | ADM | 4 | 1 | M | 1 |
| 13 | Confirm `admin.html` loads and functions correctly in Safari macOS | ADM | 4 | 1 | M | 1 |
| 14 | Confirm `start.html` wizard completes successfully in Safari iOS 17 | STR | 5 | 2 | H | 1 |
| 15 | Confirm `start.html` wizard completes successfully in Chrome Android | STR | 5 | 2 | H | 1 |
| 16 | Confirm `start.html` wizard completes successfully in Chrome desktop | STR | 4 | 1 | M | 1 |
| 17 | Confirm `start.html` wizard completes successfully in Firefox desktop | STR | 4 | 1 | M | 1 |
| 18 | Confirm `landing.html` renders correctly in Safari iOS 17 | LND | 4 | 2 | H | 1 |
| 19 | Confirm `landing.html` renders correctly in Chrome Android | LND | 4 | 2 | H | 1 |
| 20 | Confirm `landing.html` renders correctly in Chrome desktop | LND | 4 | 1 | M | 1 |
| 21 | Confirm `landing.html` renders correctly in Firefox desktop | LND | 4 | 1 | M | 1 |
| 22 | Confirm `landing.html` renders correctly in Safari macOS | LND | 4 | 1 | M | 1 |
| 23 | Confirm no `console.error` or `console.warn` messages appear in any browser's developer console on any page | ALL | 4 | 2 | M | 2 |
| 24 | Confirm no unhandled JavaScript exceptions appear in any browser on any page | ALL | 5 | 2 | H | 1 |
| 25 | Confirm CSS custom properties (`var(--color-bg)`) resolve correctly in all tested browsers | ALL | 3 | 1 | L | 2 |
| 26 | Confirm `font-display: swap` is applied on all Google Font imports in all tested browsers | ALL | 3 | 1 | L | 3 |
| 27 | Confirm DM Sans and Barlow Condensed load correctly in Safari iOS — confirm no font-face 404 | V8 | 4 | 2 | M | 2 |
| 28 | Confirm Plus Jakarta Sans and Barlow Condensed load correctly in all tested browsers for admin.html | ADM | 4 | 2 | M | 2 |
| 29 | Confirm `position: sticky` works correctly in Safari iOS 17 — Safari had historical bugs with sticky in scroll containers | V8 | 3 | 2 | L | 3 |
| 30 | Confirm `100dvh` viewport unit is used instead of `100vh` to prevent layout overflow on iOS Safari | ALL | 4 | 2 | M | 2 |
| 31 | Confirm no layout breaks at 375px width in Safari iOS 17 | ALL | 5 | 2 | H | 1 |
| 32 | Confirm no horizontal scroll at 390px width in Chrome Android | ALL | 5 | 2 | H | 1 |
| 33 | Confirm no horizontal scroll at 375px width in Safari iOS 17 | ALL | 5 | 2 | H | 1 |
| 34 | Confirm `scroll-behavior: smooth` works in all tested browsers | ALL | 3 | 1 | L | 3 |
| 35 | Confirm `CSS Grid` layouts render identically across all tested browsers | ALL | 4 | 2 | M | 2 |
| 36 | Confirm `CSS Flexbox` layouts render identically across all tested browsers | ALL | 4 | 2 | M | 2 |
| 37 | Confirm `CSS gap` property in Flexbox works in all tested browsers (Safari < 14.1 had a bug — target is 15+) | ALL | 3 | 1 | L | 3 |
| 38 | Confirm `aspect-ratio` CSS property works in all tested browsers — Safari 15+ required | ALL | 3 | 1 | L | 3 |
| 39 | Confirm `clip-path` CSS property works correctly across all tested browsers | ALL | 3 | 1 | L | 3 |
| 40 | Confirm `mix-blend-mode` CSS property works in all tested browsers | ALL | 3 | 1 | L | 3 |
| 41 | Confirm spring easing `cubic-bezier(0.34,1.56,0.64,1)` renders visually correctly in all tested browsers | ALL | 3 | 1 | L | 3 |
| 42 | Confirm CSS transitions on hover and interaction work in all tested browsers | ALL | 4 | 1 | M | 2 |
| 43 | Confirm CSS animations (loading states, pulses) work in all tested browsers | ALL | 3 | 1 | L | 3 |
| 44 | Confirm `IntersectionObserver` API works in all tested browsers — used for lazy loading or scroll-triggered animations | ALL | 4 | 1 | M | 2 |
| 45 | Confirm `ResizeObserver` API works in all tested browsers if used | ALL | 3 | 1 | L | 3 |
| 46 | Confirm `localStorage` is available in all tested browsers — including Safari Private Browsing | ALL | 5 | 1 | H | 1 |
| 47 | Confirm a localStorage try/catch fallback exists for Safari Private Browsing where quota may be severely limited | ALL | 4 | 2 | M | 2 |
| 48 | Confirm `navigator.clipboard.writeText` (share/copy) works in all tested browsers — requires HTTPS | ALL | 4 | 1 | M | 2 |
| 49 | Confirm `navigator.share` (Web Share API) is used where available with a clipboard fallback for desktop | V8 | 4 | 2 | M | 2 |
| 50 | Confirm `navigator.serviceWorker` is feature-detected before registration — Firefox Private mode blocks SW registration | ALL | 4 | 1 | M | 2 |
| 51 | Confirm the fan sign-up form submits correctly in Safari iOS 17 | V8 | 5 | 2 | H | 1 |
| 52 | Confirm the fan sign-up form submits correctly in Chrome Android | V8 | 5 | 2 | H | 1 |
| 53 | Confirm the fan sign-up form submits correctly in Firefox desktop | V8 | 4 | 1 | M | 2 |
| 54 | Confirm `<input type="email">` shows the email keyboard with `@` on iOS Safari | V8 | 4 | 1 | M | 2 |
| 55 | Confirm iOS Safari does not auto-zoom on `<input>` focus — font size must be ≥ 16px on all inputs | ALL | 4 | 1 | M | 2 |
| 56 | Confirm `<input type="color">` (accent picker in admin) renders acceptably in Firefox | ADM | 3 | 2 | L | 3 |
| 57 | Confirm `<input type="date">` (release date in admin) renders acceptably in Firefox — native pickers differ | ADM | 3 | 2 | L | 3 |
| 58 | Confirm `<input type="range">` renders correctly in all tested browsers | ADM | 3 | 1 | L | 3 |
| 59 | Confirm custom-styled `<select>` elements render acceptably in all tested browsers | ALL | 3 | 2 | L | 3 |
| 60 | Confirm `<details>` and `<summary>` elements render correctly in all tested browsers | ALL | 3 | 1 | L | 3 |
| 61 | Confirm `<dialog>` element works in all tested browsers — Safari iOS 15.4+ required | ALL | 3 | 2 | L | 3 |
| 62 | Confirm `:focus-visible` CSS pseudo-class works in all tested browsers | ALL | 3 | 1 | L | 3 |
| 63 | Confirm `scroll-snap` CSS property works correctly in all tested browsers for card carousels | V8 | 3 | 2 | L | 3 |
| 64 | Confirm `overscroll-behavior: contain` works in all tested browsers for scroll containers | V8 | 3 | 1 | L | 3 |
| 65 | Confirm iFrame embeds (YouTube, SoundCloud, Spotify) render correctly in all tested browsers | V8 | 4 | 2 | M | 2 |
| 66 | Confirm iFrame embeds are correctly sized at 375px width in all tested browsers — no overflow | V8 | 4 | 2 | M | 2 |
| 67 | Confirm the countdown timer (pre-release state) renders correctly in all tested browsers | V8 | 3 | 2 | L | 3 |
| 68 | Confirm `Intl.NumberFormat` for analytics numbers renders correctly in all tested browsers | ADM | 3 | 1 | L | 3 |
| 69 | Confirm `Date.toLocaleDateString` output is consistent across browsers for show dates | V8 | 3 | 2 | L | 3 |
| 70 | Confirm `requestAnimationFrame` animations run correctly in Safari iOS — older Safari had frame timing issues | ALL | 3 | 1 | L | 3 |
| 71 | Confirm `matchMedia` queries work correctly in all tested browsers for responsive JS logic | ALL | 3 | 1 | L | 3 |
| 72 | Confirm `document.querySelectorAll` result iteration uses `Array.from()` not spread — for maximum compatibility | ALL | 3 | 1 | L | 3 |
| 73 | Confirm `at()` array method is not used without a polyfill check — Safari 15.4+ required | ALL | 3 | 1 | L | 3 |
| 74 | Confirm `optional chaining (?.)` works in all five target browsers natively (all support it) | ALL | 3 | 1 | L | 3 |
| 75 | Confirm `nullish coalescing (??)` works in all targeted browsers without a transpiler | ALL | 3 | 1 | L | 3 |
| 76 | Confirm `Promise.allSettled` is supported in all tested browsers | ALL | 3 | 1 | L | 3 |
| 77 | Test `able-v7.html` on Firefox Android (not just Firefox desktop) | V8 | 3 | 2 | L | 4 |
| 78 | Test `able-v7.html` on Samsung Internet (Android) — significant market share | V8 | 3 | 2 | L | 4 |
| 79 | Test `admin.html` on iPad Safari in landscape — confirm the layout adapts correctly to a tablet viewport | ADM | 3 | 2 | L | 4 |
| 80 | Test `landing.html` on iPad Safari — confirm the hero section scales correctly | LND | 3 | 2 | L | 4 |
| 81 | Confirm CSS `env(safe-area-inset-*)` is applied correctly for notch/Dynamic Island padding in all tested iOS browsers | ALL | 4 | 2 | M | 2 |
| 82 | Confirm sticky header on `admin.html` does not cause layout shifts in Safari iOS 17 | ADM | 3 | 2 | L | 3 |
| 83 | Confirm the bottom UI bar (if present) on `able-v7.html` does not overlap content in Chrome Android | V8 | 4 | 2 | M | 2 |
| 84 | Confirm tap highlight colour is suppressed via `-webkit-tap-highlight-color: transparent` for all interactive elements | ALL | 3 | 1 | L | 3 |
| 85 | Confirm `touch-action: manipulation` is set on all buttons and links to eliminate 300ms tap delay on older Android | ALL | 4 | 1 | M | 2 |
| 86 | Confirm text selection is not accidentally disabled on readable content sections | ALL | 3 | 1 | L | 3 |
| 87 | Confirm `user-select: none` is only applied to interactive UI elements, not to readable text | ALL | 3 | 1 | L | 3 |
| 88 | Confirm font rendering looks correct on macOS Retina displays in both Chrome and Safari | ALL | 3 | 1 | L | 4 |
| 89 | Confirm `able-v7.html` does not trigger "Request Desktop Site" on iPad Safari | V8 | 3 | 2 | L | 3 |
| 90 | Confirm all browser tests are conducted on real devices (at least iOS and one Android), not only emulators | ALL | 4 | 1 | L | 2 |
| 91 | Confirm Safari iOS 16 (not just 17) is tested — a significant portion of users have not yet updated | ALL | 3 | 2 | L | 4 |
| 92 | Confirm Chrome iOS (which uses WebKit, not Blink) is tested separately from Chrome Android | ALL | 3 | 2 | L | 4 |
| 93 | Confirm the Light theme passes contrast checks in Safari iOS — some CSS filter interactions can reduce contrast | V8 | 4 | 2 | M | 2 |
| 94 | Confirm the Contrast theme renders pure black `#000000` background correctly in all tested browsers | V8 | 3 | 1 | L | 3 |
| 95 | Confirm `will-change: transform` is not overused — excessive use causes memory issues on mobile Safari | ALL | 3 | 1 | L | 3 |
| 96 | Confirm there are no `webkit-` prefixed CSS properties missing their unprefixed versions | ALL | 3 | 1 | L | 3 |
| 97 | Run an automated cross-browser test via BrowserStack Automate or Playwright for the most critical journey | ALL | 3 | 4 | L | 4 |
| 98 | Document the cross-browser test matrix (browsers, versions, devices, pass/fail per page) in `docs/` | DOC | 3 | 2 | L | 4 |
| 99 | Confirm the Glass theme `@supports` fallback is also tested in Safari macOS — Safari supports `backdrop-filter` but the fallback must still be valid CSS | ALL | 3 | 1 | L | 3 |
| 100 | Confirm `STATUS.md` is updated to mark J8 complete with the list of browsers and device OS versions tested | DOC | 2 | 1 | L | 6 |
