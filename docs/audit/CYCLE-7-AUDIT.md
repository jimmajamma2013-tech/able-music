# ABLE — Cycle 7 Audit
**Generated: 2026-03-17 | Targeting lowest-scoring dimensions after Cycle 6**
**Scores entering Cycle 7: Tier gates 7.5/10 · Data architecture 7.5/10 · UX system 7.8/10 · Accessibility 7.8/10 · UI system 8.0/10 · Analytics 8.8/10**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Artist Success system | 7.5/10 | 9.0/10 | Day 1 share card; milestone moments; 30-day nudge; first fan moment |
| B — Accessibility depth | 7.8/10 | 9.0/10 | Fieldsets for radio groups, start.html a11y, fan form aria improvements |
| C — fan.html foundation | (unscored) | 8.0/10 | Fan dashboard empty state, followed artists stub, upcoming shows |
| D — Performance baselines | (unscored) | 8.5/10 | Lighthouse run, RAF on stats, font preload, lazy-load audit |
| E — Start.html UX | 8.0/10 | 9.0/10 | 375px spacing, wizard completion flow, handle slug preview |

---

## Dimension A — Artist Success System
*Score: 7.5/10 → target 9.0/10. Milestone moments, share mechanics, long-term retention nudges.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | First fan moment: when `able_fans` goes from 0 to 1, show a one-time toast: "Your first fan. That's real." (dismiss key: `able_first_fan`) — triggered in `checkAndShowMilestone()` | ADM | 5 | 1 | L | 1 |
| 2 | 30-day milestone nudge: when `admin_visit_dates` spans > 30 unique calendar days, show nudge card: "30 days in. [N] fans. [M] clicks. That's yours." — dismiss key: `30day-milestone` | ADM | 4 | 3 | M | 2 |
| 3 | Day 1 share card: after completing start.html wizard, show a large share card: "Your page is live. Share it now." with the artist profile URL and a copy button | STR | 5 | 3 | M | 2 |
| 4 | Artist Pro trial hook: when tier is free and fan count >= 10, show once: "10 fans in. Ready to send them a message? Try Artist Pro free for 7 days." (key: `able_trial_nudge`) | ADM | 5 | 3 | M | 2 |
| 5 | Fan milestone copy review: current milestones at 1,10,50,100,250,500,1000 — verify copy is in ABLE voice for each — read `MILESTONE_COPY` object and compare to copy philosophy | ADM | 3 | 1 | L | 1 |
| 6 | Profile completeness celebration: when completeness bar hits 100%, show a one-time toast: "Profile complete. Fans get the full picture now." — triggered in `updateCompletenessBar()` | ADM | 4 | 2 | L | 1 |
| 7 | Share prompt after first fan: when first fan signs up and artist is in admin, show nudge: "You have your first fan. Share your page to reach more." — after the milestone toast | ADM | 4 | 2 | L | 2 |
| 8 | Weekly summary nudge: on admin load, if 7 days have passed since last load, show: "This week: [N] fans · [M] visits · [K] taps." — dismiss key: `able_weekly_${isoWeek}` | ADM | 4 | 3 | M | 3 |
| 9 | Upgrade CTA click tracking: clicking upgrade link in completeness bar or gold overlay → log to `able_clicks` as `{label:'upgrade-cta',type:'upgrade',ts}` | ADM | 3 | 2 | L | 2 |
| 10 | State history log: admin shows compact state history — "Pre-release 12 Mar · Live 19 Mar" — stored in `profile.stateHistory[]` max 10 entries, appended in `saveCampaignHQ()` | ADM | 3 | 4 | M | 3 |

---

## Dimension B — Accessibility Depth
*Score: 7.8/10 → target 9.0/10. Fieldsets, fieldset legends, form landmark improvements.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Campaign HQ radio group: wrap the 4 state radio buttons (Profile / Pre-release / Live / Gig) in `<fieldset><legend class="sr-only">Page mode</legend>` | ADM | 4 | 1 | L | 1 |
| 12 | Vibe/feel picker: wrap the feel buttons in `<fieldset role="group" aria-labelledby="feelPickerLegend">` — they're currently a flat div | ADM | 3 | 2 | L | 1 |
| 13 | Start.html step indicators: verify each wizard step has `aria-current="step"` on the active step indicator — check `.wizard-step-dot` markup | STR | 3 | 1 | L | 1 |
| 14 | Fan form `aria-describedby`: link the fan email input to the consent text below via `aria-describedby="fan-consent-text"` — screen readers should read the consent on focus | V8 | 4 | 1 | L | 1 |
| 15 | Admin sheet role: `#adminSheet` has `role="dialog"` — verify `aria-labelledby` points to `adminSheetTitle` — check current markup | ADM | 3 | 1 | L | 1 |
| 16 | Colour contrast — completeness nudge: `completenessNudge` text at `var(--t3)` (#595959) — verify ≥4.5:1 on `--dash-card` (#f8f5f0) | ADM | 3 | 1 | L | 1 |
| 17 | Source badge colour contrast: `.source-badge` uses `--source-ig` (#e1306c) on `--dash-card` — verify ≥3:1 for UI component (WCAG 1.4.11) | ADM | 3 | 1 | L | 1 |
| 18 | Start.html form labels: verify every input in the wizard has an explicit `<label for="...">` — no placeholder-only labels | STR | 4 | 1 | L | 1 |
| 19 | Mobile nav `aria-current`: verify `showPage()` sets `aria-current="page"` on `.mn-item` — check existing code (may already be done) | ADM | 3 | 1 | L | 1 |
| 20 | Skip link on fan profile: verify `able-v8.html` has `<a class="sr-only" href="#main-content">Skip to content</a>` as first child of body | V8 | 3 | 1 | L | 1 |

---

## Dimension C — fan.html Foundation
*Score: unscored → target 8.0/10. Build the fan-facing dashboard to support future fan journey.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | fan.html empty state: load `able_followed_artists` from localStorage — if empty, show: "Follow an artist to see their updates here." with a search placeholder | FAN | 4 | 2 | M | 1 |
| 22 | fan.html artist card: for each followed artist in `able_followed_artists`, render a card with: avatar, name, last active, upcoming show date if any | FAN | 5 | 4 | M | 2 |
| 23 | fan.html upcoming shows: query `able_shows` for the followed artist, render any upcoming shows with date + venue | FAN | 4 | 3 | M | 2 |
| 24 | fan.html page title: `<title>Your Artists — ABLE</title>` — meta + OG card | FAN | 2 | 1 | L | 1 |
| 25 | fan.html navigation: tab bar or top nav — "Artists" | "Shows" | "Settings" — at minimum stub | FAN | 3 | 3 | M | 3 |

---

## Dimension D — Performance
*Score: unscored → target 8.5/10. Run baselines, fix worst regressions.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 26 | Lighthouse baseline — able-v8.html: run mobile throttled — record LCP, FCP, CLS, TBT, Score | V8 | 5 | 2 | L | 1 |
| 27 | Lighthouse baseline — admin.html: same for admin | ADM | 4 | 2 | L | 1 |
| 28 | Image lazy-load audit: all `<img>` below-fold on able-v8.html must have `loading="lazy"` | V8 | 4 | 1 | L | 1 |
| 29 | Font preload: add `<link rel="preload" as="font" crossorigin>` for Barlow Condensed 700 woff2 | ALL | 3 | 1 | L | 2 |
| 30 | RAF on admin stat writes: wrap fan count, click count, view count DOM writes in `requestAnimationFrame()` | ADM | 3 | 2 | L | 2 |
| 31 | `will-change` audit: grep 4 active pages for `will-change:` — verify each has `isolation:isolate` on parent | ALL | 2 | 2 | L | 2 |
| 32 | AbortController on fan sign-up fetch: wrap Netlify `fan-confirmation` fetch in AbortController 8000ms — already planned in C4 #46 | V8 | 4 | 2 | M | 1 |

---

## Dimension E — Start.html UX
*Score: 8.0/10 → target 9.0/10. Mobile spacing, wizard completion flow, slug handling.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 33 | Mobile spacing at 375px: open start.html at 375px — verify wizard cards have `padding-bottom: env(safe-area-inset-bottom, 24px)` or equivalent | STR | 4 | 1 | L | 1 |
| 34 | Wizard re-entry hydration: start.html "Set it up now →" — verify it hydrates from existing `able_v3_profile` not a reset — check `loadExistingProfile()` | STR | 5 | 1 | L | 1 |
| 35 | Handle auto-slug: when artist types their name, auto-generate slug suggestion: `name.toLowerCase().replace(/[^a-z0-9]+/g,'-')` — show in preview, artist can override | ADM | 3 | 2 | L | 2 |
| 36 | Start.html final step — share CTA: after wizard completion, show a large "Share your page" button with the profile URL | STR | 5 | 3 | M | 2 |
| 37 | Wizard step 4 — release date hint: below the date picker, show: "Don't have a release date? Leave this blank — you can set it any time." | STR | 3 | 1 | L | 1 |
| 38 | Wizard handle validation: when artist types a handle with uppercase or spaces, auto-lowercase and replace spaces with `-` inline — not on submit | STR | 3 | 2 | L | 1 |
| 39 | Wizard success state: after completing wizard, show a ✓ checkmark animation before redirecting to admin | STR | 3 | 2 | L | 2 |
| 40 | Start.html OG card: add `<meta property="og:title" content="Set up your ABLE page">` and relevant tags | STR | 2 | 1 | L | 2 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (first fan toast) → #5 (milestone copy audit) → #6 (completeness celebration toast) → #11 (Campaign HQ fieldset) → #14 (fan form describedby) → #15 (admin sheet aria) → #19 (mn-item aria-current) → #20 (skip link V8) → #21 (fan.html empty state) → #24 (fan.html title) → #26/#27 (Lighthouse baselines) → #28 (lazy-load audit) → #32 (AbortController) → #33 (start.html 375px) → #34 (wizard hydration) → #37 (release date hint) → #38 (handle validation)

**Wave 2 (after Wave 1 committed):**
#2 (30-day milestone), #4 (Artist Pro trial hook), #7 (share nudge after first fan), #9 (upgrade CTA tracking), #12 (feel picker fieldset), #13 (wizard aria-current), #16/#17 (contrast checks), #18 (start.html labels), #22 (fan.html artist cards), #23 (fan.html shows), #29 (font preload), #30 (RAF stats), #31 (will-change), #35 (handle auto-slug), #36 (start.html share CTA), #39 (wizard success), #40 (start.html OG)

**Wave 3 (polish):**
#3 (Day 1 share card), #8 (weekly summary), #10 (state history log), #25 (fan.html nav)
