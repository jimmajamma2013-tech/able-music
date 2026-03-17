# ABLE — Cycle 4 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 3**
**Scores entering Cycle 4: Artist tools 7.8/10 · CRM 7.8/10 · Error states 8.0/10 · Analytics 8.2/10 · Tier gates 6.5/10 · Data architecture 6.8/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Admin UX polish wave 2 | 7.8/10 | 8.8/10 | Bio word count, handle preview, fan relative dates — small but high-visibility |
| B — Analytics depth | 8.2/10 | 9.0/10 | SessionId in views, fan sign-up sparkline, Lighthouse baseline |
| C — Performance + code quality | (unscored) | 8.5/10 | Lighthouse score, will-change audit, RAF on stat updates |
| D — Profile completeness UX wave 2 | 7.8/10 | 9.0/10 | First-load blank state, wizard re-entry guard, bio/handle previews |
| E — Resilience wave 3 | 8.0/10 | 9.0/10 | AbortController timeout, admin `prefers-reduced-motion` audit, error state doc |

---

## Dimension A — Admin UX Polish Wave 2
*Score: 7.8/10 → target 8.8/10. Tactile micro-improvements that make the admin feel finished.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Bio word count: admin bio textarea shows live character count — "48 / 120" — already exists; verify it updates `oninput` not `onblur`. If onblur only, switch to `oninput` | ADM | 3 | 1 | L | 1 |
| 2 | Bio character count colour: at < 80 chars show neutral; at 80–100 show amber; at 110+ show red — drives artists to write more | ADM | 3 | 1 | L | 1 |
| 3 | Handle preview on slug field: admin settings slug input shows `ablemusic.co/HANDLE` preview updating on `input` event — verify `updateSlugPreview()` is wired to `input` not just `change` | ADM | 3 | 1 | L | 1 |
| 4 | Fan last-seen relative date: each fan row already shows `relTime(f.ts)` — verify it produces human-friendly copy for all ranges: "just now", "3h ago", "2 days ago", "14 Mar" (use locale date for > 7 days) | ADM | 3 | 1 | L | 1 |
| 5 | Fan sort default verify: confirm `renderFanList()` sorts descending by `ts` — check the sort call before the `filtered.slice()` | ADM | 4 | 1 | L | 1 |
| 6 | Fan search placeholder: update search input placeholder from generic to "Search by email or campaign…" — reflects that campaign name is now searchable | ADM | 2 | 1 | L | 1 |
| 7 | Fan campaign search: extend `renderFanList()` filter to include `f.campaignName` in the search match — artists want to find all fans from a specific campaign | ADM | 4 | 2 | L | 1 |
| 8 | Show delete confirmation: `deleteEvent()` in admin shows tab uses `confirm()` — replace with inline two-step (same pattern as fan delete C3 #28) | ADM | 3 | 2 | L | 1 |
| 9 | Snap card delete confirmation: snap card delete button — confirm before removal with inline two-step | ADM | 3 | 2 | L | 2 |
| 10 | "Copy profile link" success state: when artist copies their profile link in admin, show button text swap "✓ Copied!" → restore after 2s | ADM | 3 | 1 | L | 1 |
| 11 | Show date localised format: admin show cards display date as `"Tue 14 Apr"` — verify they use `toLocaleDateString('en-GB', {weekday:'short', day:'numeric', month:'short'})` | ADM | 2 | 1 | L | 1 |
| 12 | Fan count milestone copy: when `able_fans` length crosses 1, 5, 10, 50, 100 — show a once-only toast: "You have 5 fans. That's a real thing." Dismiss key: `able_milestone_fans_{N}` | ADM | 4 | 2 | M | 2 |
| 13 | Admin section empty states: when shows list is empty on the Shows page, show: "No shows yet. Add one — even one date tells fans you're active." Not just an empty div | ADM | 3 | 2 | L | 2 |
| 14 | Snap card empty state: when no snap cards on Snap tab, show: "Add a snap card — give fans somewhere to go." with a direct "Add your first →" button | ADM | 3 | 2 | L | 2 |
| 15 | 30-day milestone nudge: when `admin_visit_dates` spans > 30 unique calendar days, show nudge: "30 days in. [N] fans. [M] clicks. That's yours." — dismiss key: `'30day-milestone'` | ADM | 4 | 3 | M | 3 |

---

## Dimension B — Analytics Depth
*Score: 8.2/10 → target 9.0/10. Close the remaining gaps in the analytics story.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 16 | SessionId in page views: `trackView()` on `able-v8.html` must include `sessionId` alongside `ts`, `source`, `campaign` — grep `trackView` and verify | V8 | 5 | 1 | L | 1 |
| 17 | Fan sign-up 30-day sparkline: admin analytics shows a 30-bar sparkline of fan sign-ups by day — `able_fans.filter(f=>f.ts>Date.now()-2592000000)` grouped by ISO day — 30 bars, relative height, rendered as inline SVG | ADM | 4 | 4 | M | 2 |
| 18 | By-source % breakdown: verify `renderSourceBreakdown()` shows percentage of total not just count — the existing implementation divides by total; confirm the `%` label is shown | ADM | 3 | 1 | L | 1 |
| 19 | CTA tap rate: in admin analytics, show "Taps per view" — `(able_clicks.length / able_views.length * 100).toFixed(1) + '%'` — the engagement rate metric artists need most | ADM | 5 | 2 | M | 1 |
| 20 | Fan conversion rate: admin analytics shows "Conversion rate: X% of visitors sign up" — `(fans / views * 100).toFixed(1)` — next to fan count stat | ADM | 5 | 2 | M | 1 |
| 21 | Peak day insight: admin shows "Your busiest day: [day], [N] fans" — find max from 30-day daily fan counts — "You had 12 sign up in one day — that was your peak." | ADM | 4 | 2 | M | 2 |
| 22 | Most-tapped CTA: admin analytics shows which CTA label has the most taps — `able_clicks.reduce()` over `label` field — "Fans tap '[label]' most often." | ADM | 4 | 2 | M | 2 |
| 23 | Source breakdown > 4 sources: current breakdown only shows ig/tt/sp/direct — extend to include any `source` value from the fan object, not just the 4 hardcoded ones | ADM | 3 | 2 | M | 2 |
| 24 | Campaign analytics on home tab: show a compact "Latest campaign: [name] · [N] fans" stat chip in the home tab stats row — so the artist doesn't need to navigate to analytics | ADM | 4 | 2 | L | 2 |
| 25 | Analytics page view count: `renderAnalyticsPage()` must show total page views from `able_views` — verify stat card #3 reads from `able_views.length` not a hardcoded value | ADM | 3 | 1 | L | 1 |

---

## Dimension C — Performance + Code Quality
*Score: unscored → target 8.5/10. Lighthouse baseline, then fix the worst regressions.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 26 | Lighthouse baseline (able-v8.html): run Lighthouse in Chrome DevTools — mobile, simulated throttling — record LCP, FCP, CLS, TBT, Score. Write to `docs/systems/qa-testing/PERF-BASELINE-2026-03-17.md` | V8 | 5 | 2 | L | 1 |
| 27 | Lighthouse baseline (admin.html): same for admin — LCP and Score. Both baselines needed before the session ends so regressions are detectable | ADM | 4 | 2 | L | 1 |
| 28 | `will-change` audit: grep all 4 active pages for `will-change:` — for each instance, verify the parent element has `isolation: isolate` to prevent stacking context bleed | ALL | 3 | 2 | L | 1 |
| 29 | `requestAnimationFrame` on admin stat updates: wrap fan count, click count, view count DOM writes in `requestAnimationFrame()` — prevents forced reflow when multiple stats update simultaneously | ADM | 3 | 2 | L | 2 |
| 30 | Unused CSS audit: grep admin.html for any classes defined in `<style>` that have no matching `class="..."` in the HTML — flag but do not delete automatically (too risky) | ADM | 3 | 2 | M | 2 |
| 31 | Image lazy-load verify: all `<img>` elements below-the-fold on able-v8.html must have `loading="lazy"` — grep and fix any missing | V8 | 4 | 1 | L | 1 |
| 32 | Font preconnect: verify `<link rel="preconnect" href="https://fonts.googleapis.com">` and `fonts.gstatic.com` are present in the `<head>` of all 4 active pages | ALL | 3 | 1 | L | 1 |
| 33 | `prefers-reduced-motion` admin audit: grep admin.html for CSS `transition`, `animation`, `transform` rules — wrap non-essential ones in `@media (prefers-reduced-motion: no-preference)` | ADM | 4 | 3 | L | 2 |
| 34 | JS parse time: verify there are no `var` declarations in admin.html — grep and replace with `const`/`let` per global code rules | ADM | 2 | 1 | L | 1 |
| 35 | Self-hosting critical fonts: Barlow Condensed woff2 is loaded from Google Fonts — consider adding a `<link rel="preload" as="font">` for the bold weight used in display headings | ALL | 3 | 1 | L | 2 |

---

## Dimension D — Profile Completeness UX Wave 2
*Score: 7.8/10 → target 9.0/10. Polish the setup experience for new artists.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 36 | First-load blank state: when admin loads with no name, bio, or artwork — show 3 action cards below the completeness bar: "Add your name", "Write a bio", "Pick your accent colour" — each taps into that section | ADM | 4 | 3 | M | 2 |
| 37 | Wizard re-entry guard: `start.html` "Set it up now →" link — verify start.html hydrates from existing `able_v3_profile` if present — not a reset | STR | 5 | 2 | M | 1 |
| 38 | Setup prompt bar expansion: existing `#setup-prompt-bar` shows when `!v3data.name` — extend to show when bio or artwork is also missing: "Complete your setup: add a bio and artwork." | ADM | 3 | 2 | L | 1 |
| 39 | Bio word count inline hint: show "Tell fans who you are. One honest sentence." below bio field when empty — using the `data-hint` pattern already on other fields | ADM | 3 | 1 | L | 1 |
| 40 | Handle auto-slug: when artist types their name, auto-generate slug suggestion: `name.toLowerCase().replace(/[^a-z0-9]+/g, '-')` — show in preview, artist can override | ADM | 3 | 2 | L | 2 |
| 41 | Completeness bar on profile tab: completeness bar currently only on home tab — also show a compact version at the top of the Profile edit page (`#page-profile`) | ADM | 3 | 2 | L | 2 |
| 42 | Snap card count in completeness: completeness bar uses `able_snap_cards` — verify this reads correctly when snap cards are stored in `profile.snapCards` vs the top-level key | ADM | 4 | 1 | L | 1 |
| 43 | Shows count in completeness: completeness bar uses `able_shows` — verify this reads the correct key (admin uses `able_shows`; profile uses `profile.events`) | ADM | 4 | 1 | L | 1 |
| 44 | First-run checklist sync: after adding a show from the Shows tab, `initFirstRun()` should re-check completion — verify FRC step 4 ("Set release date") auto-marks done when `profile.releaseDate` is set | ADM | 3 | 2 | M | 2 |
| 45 | Profile preview button wired: verify admin topbar "View page →" button opens `able-v8.html?handle=HANDLE&owner=true` in a new tab — not just `able-v8.html` | ADM | 4 | 1 | L | 1 |

---

## Dimension E — Resilience Wave 3
*Score: 8.0/10 → target 9.0/10. Remaining network failure and degraded state handling.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 46 | AbortController timeout on fan sign-up: wrap the Netlify `fan-confirmation` fetch in AbortController with 8000ms — after timeout, show: "Email confirmation taking a while. Check your inbox in a moment." | V8 | 4 | 2 | M | 1 |
| 47 | Network retry on Supabase writes: when a Supabase write fails with a network error (not a constraint error), retry once after 2s before surfacing an error toast | V8/ADM | 4 | 3 | M | 2 |
| 48 | Error state doc: write `docs/systems/error-states/IMPLEMENTED.md` — list every error state built across all pages: what triggers it, what the user sees, what the recovery is | ALL | 3 | 3 | L | 2 |
| 49 | Admin `window.onerror` handler: verify `window.onerror` is set on admin.html to catch uncaught JS errors and log them — not just the DOMContentLoaded crash boundary | ADM | 3 | 1 | L | 1 |
| 50 | Netlify function 404 state: when `fan-confirmation.js` returns 404 (function not deployed), show: "Can't reach the confirmation server. Your email is saved — we'll reach out." — not a generic error | V8 | 3 | 2 | L | 1 |
| 51 | Fan form spam guard: rate-limit fan sign-up to 1 attempt per email per 60s in localStorage — if the same email is submitted within 60s, show "You're already on the list." without another write | V8 | 4 | 2 | L | 1 |
| 52 | LocalStorage full state: when `setLS()` triggers QuotaExceededError on admin.html and cannot free space, surface a clear action: "Export your fans as CSV, then clear old data." — link to export button | ADM | 4 | 2 | L | 1 |
| 53 | `able_views` cap: cap `able_views` at 500 entries max in `trackView()` — prune oldest 100 when cap is hit. Current prune only runs on QuotaExceeded — add proactive cap | V8 | 3 | 1 | L | 1 |
| 54 | `able_clicks` cap: same as views — cap at 500 in `trackCTATap()`, prune oldest 100 when hit | V8 | 3 | 1 | L | 1 |
| 55 | Admin back-navigation state: when artist navigates to a sub-page (e.g. Shows) and presses browser back, the admin should restore to the last active page — use `history.pushState` on `showPage()` | ADM | 3 | 3 | M | 3 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#5 (fan sort verify) → #7 (campaign search) → #8 (show delete confirm) → #10 (copy link state) → #16 (sessionId in views) → #18 (by-source %) → #19 (CTA tap rate) → #20 (fan conversion rate) → #25 (analytics view count) → #26/#27 (Lighthouse baselines) → #28 (will-change audit) → #31 (image lazy-load) → #32 (font preconnect) → #34 (var → const) → #37 (wizard re-entry) → #38 (setup prompt bar) → #42/#43 (completeness bar key verify) → #45 (profile preview button) → #46 (AbortController) → #49 (window.onerror) → #50 (404 state) → #51 (spam guard) → #52 (LocalStorage full) → #53/#54 (views/clicks cap)

**Wave 2 (after Wave 1 is committed):**
#1-4 (bio/handle UX), #6 (search placeholder), #9 (snap delete), #11 (show date format), #17 (sparkline), #21 (peak day), #22 (most-tapped CTA), #23 (source breakdown extended), #24 (campaign stat chip), #29 (RAF stats), #30 (CSS audit), #33 (reduced-motion), #36 (blank state), #39 (bio hint), #41 (completeness on profile tab), #44 (FRC sync), #47 (Supabase retry), #48 (error state doc)

**Wave 3 (polish — do last):**
#12 (milestone toast), #13/#14 (section empty states), #15 (30-day milestone), #35 (font preload), #40 (handle auto-slug), #55 (browser back-nav)
