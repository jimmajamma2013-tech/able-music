# Dimension I7 — Screen Reader Compatibility
**Category:** Legal, Compliance & Accessibility
**Phase:** 9 (Legal)
**Status:** Not started

Screen reader compatibility is not a niche requirement — roughly 1 in 30 web users relies on assistive technology, and the Equality Act 2010 (UK) requires that digital services make reasonable adjustments to be accessible. For ABLE, this means every artist profile page, dashboard, onboarding flow, and landing page must be usable by someone navigating with VoiceOver on iOS or Mac. Full compliance means: all images carry meaningful `alt` text or are explicitly hidden from assistive technology with `aria-hidden="true"`; all icon-only buttons carry descriptive `aria-label` attributes; dynamic content changes — campaign state switches, fan sign-up confirmations, error messages — are announced via `aria-live` regions; page headings create a logical outline that VoiceOver can navigate; and no information is conveyed by colour or visual position alone.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Add `aria-live="polite"` to the fan sign-up success message container in `able-v7.html` so VoiceOver announces "You're on the list" when it appears | V8 | 5 | 1 | L | 1 |
| 2 | Add `aria-live="assertive"` to the fan sign-up error message container so VoiceOver immediately announces validation failures | V8 | 5 | 1 | L | 1 |
| 3 | Add `alt` text to every artist artwork image in `able-v7.html` describing the image content (e.g. "[Artist name] — [album/artwork description]") | V8 | 5 | 2 | M | 1 |
| 4 | Add `aria-hidden="true"` to all purely decorative SVG icons in `able-v7.html` that are accompanied by visible text labels | V8 | 4 | 2 | L | 1 |
| 5 | Add `aria-label` to all icon-only buttons in `able-v7.html` (e.g. the share button, close button on the snap card) | V8 | 5 | 2 | L | 1 |
| 6 | Add `aria-label` to all icon-only buttons in `admin.html` (e.g. the dismiss nudge button, the settings gear icon) | ADM | 5 | 2 | L | 1 |
| 7 | Add `aria-label` to all icon-only buttons in `start.html` (e.g. back arrow, step indicator dots) | STR | 4 | 1 | L | 1 |
| 8 | Add `aria-label` to all icon-only buttons in `landing.html` (e.g. the mobile menu toggle, social media icons) | LND | 4 | 1 | L | 1 |
| 9 | Add a visually hidden `<h1>` to `able-v7.html` that announces the artist's name to screen readers if the visual heading is replaced by an image | V8 | 5 | 1 | L | 1 |
| 10 | Verify that the heading hierarchy on `able-v7.html` is logical: `<h1>` for artist name, `<h2>` for sections (Music, Events, Merch), `<h3>` for subsections | V8 | 4 | 2 | M | 2 |
| 11 | Verify that the heading hierarchy on `admin.html` is logical: `<h1>` for the dashboard name, `<h2>` for section titles | ADM | 4 | 2 | M | 2 |
| 12 | Verify that the heading hierarchy on `landing.html` follows a single `<h1>` for the hero, with `<h2>` for feature sections | LND | 4 | 2 | M | 2 |
| 13 | Verify that the heading hierarchy on `start.html` uses `<h1>` for the wizard step title and no heading is skipped | STR | 3 | 1 | L | 2 |
| 14 | Add `aria-live="polite"` to the campaign state indicator in `admin.html` so VoiceOver announces when the state changes (e.g. "Profile state changed to Pre-release") | ADM | 4 | 1 | L | 1 |
| 15 | Add `aria-live="polite"` to the gig mode countdown timer in `able-v7.html` so screen readers receive state change updates | V8 | 3 | 2 | M | 2 |
| 16 | Add `role="status"` to the campaign state badge on `able-v7.html` (e.g. "On tonight", "Pre-save now") | V8 | 4 | 1 | L | 1 |
| 17 | Confirm all inline SVG icons across all pages have either `aria-hidden="true"` or a descriptive `<title>` element within the SVG | ALL | 4 | 3 | L | 1 |
| 18 | Add `<img alt="">` (empty alt, not missing alt) to all decorative background images so screen readers skip them correctly | ALL | 4 | 2 | L | 1 |
| 19 | Add descriptive `alt` text to every artist release artwork thumbnail in `able-v7.html` | V8 | 4 | 2 | L | 1 |
| 20 | Add descriptive `alt` text to the ABLE logo in `landing.html` (`alt="ABLE Music"`) | LND | 4 | 1 | L | 1 |
| 21 | Add descriptive `alt` text to the ABLE logo in `admin.html` | ADM | 3 | 1 | L | 1 |
| 22 | Add descriptive `alt` text to the artist avatar image in `admin.html` (e.g. "[Artist name]'s profile photo") | ADM | 3 | 1 | L | 1 |
| 23 | Confirm that the VoiceOver rotor on iOS can navigate between all landmark regions on `able-v7.html` (`<main>`, `<nav>`, `<footer>`) | V8 | 4 | 2 | M | 2 |
| 24 | Add `<main>` landmark to `able-v7.html` wrapping the primary content area | V8 | 4 | 1 | L | 1 |
| 25 | Add `<nav aria-label="Artist navigation">` to the bottom tab bar in `able-v7.html` | V8 | 4 | 1 | L | 1 |
| 26 | Add `<nav aria-label="Dashboard navigation">` to the bottom tab bar in `admin.html` | ADM | 4 | 1 | L | 1 |
| 27 | Add `<header>` landmark to every page for VoiceOver landmark navigation | ALL | 3 | 1 | L | 2 |
| 28 | Add `<footer>` landmark to every page with the privacy/terms links | ALL | 3 | 1 | L | 2 |
| 29 | Confirm that the snap card accordion open/close state is announced by VoiceOver (requires `aria-expanded` on the toggle button) | V8 | 4 | 1 | L | 1 |
| 30 | Add `aria-controls` linking each accordion toggle button to the panel it controls in `able-v7.html` | V8 | 4 | 1 | L | 2 |
| 31 | Confirm that the bottom sheet (e.g. fan sign-up sheet, gig mode sheet) is announced by VoiceOver when it opens | V8 | 4 | 2 | M | 2 |
| 32 | Add `role="dialog"` and `aria-labelledby` to every bottom sheet in `able-v7.html` | V8 | 4 | 1 | L | 2 |
| 33 | Add `role="dialog"` and `aria-labelledby` to every modal in `admin.html` | ADM | 4 | 1 | L | 2 |
| 34 | Confirm that when a bottom sheet opens in `able-v7.html`, VoiceOver focus moves to the sheet title or first interactive element | V8 | 4 | 2 | M | 2 |
| 35 | Confirm that when a modal closes in `admin.html`, VoiceOver focus returns to the button that triggered the modal | ADM | 4 | 2 | M | 2 |
| 36 | Add `aria-live="polite"` region for the nudge notification area in `admin.html` so new nudges are announced | ADM | 3 | 1 | L | 3 |
| 37 | Add `role="alert"` to error messages in the onboarding wizard in `start.html` | STR | 5 | 1 | L | 1 |
| 38 | Add `role="alert"` to all form validation error messages in `able-v7.html` | V8 | 5 | 1 | L | 1 |
| 39 | Confirm that the tier gate overlay in `admin.html` is announced by VoiceOver and includes a description of the upgrade benefit | ADM | 3 | 2 | M | 3 |
| 40 | Add `aria-describedby` pointing to the upgrade description on every locked feature element in `admin.html` | ADM | 3 | 2 | M | 3 |
| 41 | Add `aria-label` to the fan count stat in `admin.html` (e.g. `aria-label="247 fans signed up"`) | ADM | 3 | 1 | L | 2 |
| 42 | Add `aria-label` to each stat card in `admin.html` that reads the full context (e.g. "48 link taps in the last 7 days") | ADM | 3 | 1 | L | 2 |
| 43 | Confirm that the campaign state selector in `admin.html` announces the currently selected state to VoiceOver | ADM | 4 | 2 | M | 2 |
| 44 | Add `aria-live="polite"` to the success toast notification area in `admin.html` so save confirmations are announced | ADM | 4 | 1 | L | 1 |
| 45 | Confirm that the release date countdown on `able-v7.html` is readable as text by screen readers (not just a visual number display) | V8 | 4 | 1 | L | 2 |
| 46 | Add a visually hidden text equivalent for the countdown timer (e.g. "3 days until release") alongside the visual countdown | V8 | 4 | 2 | M | 2 |
| 47 | Confirm that platform pill buttons in `able-v7.html` (Spotify, Apple Music, etc.) have descriptive `aria-label` values including the platform name | V8 | 4 | 1 | L | 1 |
| 48 | Ensure the `aria-label` on platform pills reads the destination, not just the icon name (e.g. "Listen on Spotify" not "Spotify") | V8 | 4 | 1 | L | 1 |
| 49 | Confirm that the shows/events list in `able-v7.html` uses a semantic list (`<ul>/<li>`) so VoiceOver announces the item count | V8 | 4 | 1 | L | 2 |
| 50 | Confirm that the shows/events list in `admin.html` uses semantic list markup | ADM | 3 | 1 | L | 2 |
| 51 | Confirm that the merch grid in `able-v7.html` uses semantic `<article>` or `<li>` elements with descriptive accessible names for each item | V8 | 3 | 2 | M | 3 |
| 52 | Add `alt` text to all merch product images in `able-v7.html` | V8 | 4 | 2 | L | 2 |
| 53 | Confirm that the video embed in `able-v7.html` includes a title attribute on the iframe (e.g. `title="[Artist] — [Song] music video"`) | V8 | 4 | 1 | L | 1 |
| 54 | Confirm that the audio preview embed in `able-v7.html` includes a title on the iframe | V8 | 4 | 1 | L | 1 |
| 55 | Add `<track kind="captions">` references (or a note that captions are provided by the embedded platform) for video content | V8 | 3 | 2 | M | 4 |
| 56 | Confirm that the onboarding wizard progress indicator in `start.html` announces current step to VoiceOver (e.g. "Step 2 of 5") | STR | 4 | 2 | M | 2 |
| 57 | Add `aria-current="step"` to the active step indicator in `start.html` | STR | 3 | 1 | L | 2 |
| 58 | Confirm that all toggle switches in `admin.html` (e.g. gig mode toggle) use `role="switch"` with `aria-checked` | ADM | 4 | 1 | L | 2 |
| 59 | Confirm all toggle switches announce their label when focused by VoiceOver (e.g. "Gig mode, switch, off") | ADM | 4 | 1 | L | 2 |
| 60 | Add `aria-label` to the colour picker / accent selector in `start.html` and `admin.html` | STR | 3 | 1 | L | 3 |
| 61 | Ensure colour swatches in the accent selector have descriptive labels (e.g. "Red — #e05242") not just hex values | STR | 3 | 1 | L | 3 |
| 62 | Confirm that the `admin.html` chart/analytics section has a text summary accessible to screen readers (not just a visual chart) | ADM | 4 | 3 | M | 3 |
| 63 | Add an accessible data table as a fallback for any chart that cannot be made screen-reader-friendly natively | ADM | 4 | 3 | M | 3 |
| 64 | Confirm that the snap cards in `able-v7.html` are announced with their title and content when focused | V8 | 3 | 1 | L | 3 |
| 65 | Confirm that newly revealed snap card content is announced by VoiceOver when the card expands | V8 | 3 | 2 | M | 3 |
| 66 | Perform a VoiceOver swipe test on `able-v7.html` to confirm logical reading order from top to bottom | V8 | 5 | 2 | L | 2 |
| 67 | Perform a VoiceOver swipe test on `admin.html` to confirm logical reading order | ADM | 5 | 2 | L | 2 |
| 68 | Perform a VoiceOver swipe test on `start.html` to confirm logical reading order across all wizard steps | STR | 4 | 2 | L | 2 |
| 69 | Perform a VoiceOver swipe test on `landing.html` to confirm logical reading order | LND | 4 | 2 | L | 2 |
| 70 | Confirm that the ABLE logo mark in `landing.html` hero is not a text image — it must be real text or an SVG with `aria-label` | LND | 3 | 1 | L | 2 |
| 71 | Confirm no content is communicated by colour alone on any page — e.g. stat increases shown in green must also have a text label | ALL | 4 | 2 | M | 2 |
| 72 | Add screen reader announcements for the "new fans since last visit" notification in `admin.html` | ADM | 3 | 2 | M | 3 |
| 73 | Confirm that dismissing a nudge in `admin.html` moves focus to a logical next element rather than dropping to the page top | ADM | 3 | 2 | M | 3 |
| 74 | Ensure `<button>` elements are used for all interactive controls — never `<div onclick>` or `<span onclick>` patterns | ALL | 5 | 3 | M | 1 |
| 75 | Confirm that all `<a>` elements with `href="#"` or `href="javascript:void(0)"` are replaced with `<button>` elements | ALL | 4 | 2 | M | 2 |
| 76 | Confirm the share sheet in `able-v7.html` (if present) is correctly announced by VoiceOver as a dialog | V8 | 3 | 2 | M | 3 |
| 77 | Add `lang="en"` to the `<html>` element of every page so VoiceOver uses the correct pronunciation engine | ALL | 4 | 1 | L | 1 |
| 78 | Confirm that `<title>` elements on all pages are descriptive and unique (not just "ABLE" on every page) | ALL | 3 | 1 | L | 2 |
| 79 | Confirm that VoiceOver reads the onboarding wizard step transition without announcing extraneous CSS content | STR | 3 | 2 | M | 3 |
| 80 | Add `aria-live="polite"` to the "X fans signed up" counter in `admin.html` so it announces updates without being disruptive | ADM | 3 | 1 | L | 3 |
| 81 | Confirm that the CTA button labels in `able-v7.html` are descriptive enough to understand out of context (e.g. "Pre-save Midnight" not just "Pre-save") | V8 | 4 | 2 | M | 2 |
| 82 | Audit every `<a>` element on `landing.html` for descriptive link text — remove all "Click here" or "Learn more" links | LND | 4 | 2 | M | 2 |
| 83 | Confirm that the artist's genre/vibe tag in `able-v7.html` is readable by VoiceOver as text (not just a visual pill) | V8 | 3 | 1 | L | 3 |
| 84 | Add `aria-label` to the scroll-more indicator / chevron at the bottom of `able-v7.html` | V8 | 2 | 1 | L | 4 |
| 85 | Confirm that `able-v7.html` passes the Axe accessibility audit with zero critical violations | V8 | 5 | 3 | M | 2 |
| 86 | Confirm that `admin.html` passes the Axe accessibility audit with zero critical violations | ADM | 5 | 3 | M | 2 |
| 87 | Confirm that `start.html` passes the Axe accessibility audit with zero critical violations | STR | 4 | 3 | M | 2 |
| 88 | Confirm that `landing.html` passes the Axe accessibility audit with zero critical violations | LND | 4 | 3 | M | 2 |
| 89 | Add an `aria-label` to the fan email input in `able-v7.html` as a fallback for when the visible label is not associated correctly | V8 | 5 | 1 | L | 1 |
| 90 | Add `aria-hidden="true"` to visual separator elements (horizontal rules, decorative lines) across all pages | ALL | 2 | 1 | L | 4 |
| 91 | Confirm that the "copied to clipboard" notification in `admin.html` is announced by VoiceOver | ADM | 3 | 1 | L | 3 |
| 92 | Confirm that the countdown timer in gig mode does not announce every second via `aria-live` — announce only state transitions | V8 | 3 | 2 | M | 3 |
| 93 | Add `aria-busy="true"` to any section that is loading data asynchronously in `admin.html` | ADM | 3 | 2 | M | 3 |
| 94 | Confirm that image-based snap cards in `able-v7.html` have `alt` text that describes the image content | V8 | 3 | 2 | L | 2 |
| 95 | Add a "Skip to main content" link as the first focusable element on every page | ALL | 4 | 2 | L | 2 |
| 96 | Confirm that the "Skip to main content" link becomes visible on keyboard focus (not just present in DOM) | ALL | 4 | 1 | L | 2 |
| 97 | Add a Playwright test using axe-core to run an automated accessibility scan on `able-v7.html` | V8 | 4 | 3 | L | 2 |
| 98 | Add a Playwright test using axe-core to run an automated accessibility scan on `admin.html` | ADM | 4 | 3 | L | 2 |
| 99 | Document a quarterly manual VoiceOver testing checklist and assign responsibility for running it | ALL | 3 | 2 | L | 3 |
| 100 | Add a VoiceOver compatibility statement to the accessibility section of `privacy.html` or a dedicated `accessibility.html` page | PRV | 3 | 2 | L | 4 |
