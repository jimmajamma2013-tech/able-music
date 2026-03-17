# Dimension F2 — Active/Pressed State
**Category:** Interaction States & Motion
**Phase:** 7

*Every tappable element must have an active/pressed state that gives immediate tactile feedback on touch devices. Hover states don't fire on mobile — the pressed state is the only motion feedback a fan or artist gets when tapping. Spring easing on active states creates the physical, springy feel that distinguishes ABLE from generic SaaS products.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit all `:active` rules across able-v7.html — list every element covered | V7 | 3 | 1 | L | 1 |
| 2 | Audit all `:active` rules across admin.html | ADM | 3 | 1 | L | 1 |
| 3 | Audit all `:active` rules across start.html | STR | 3 | 1 | L | 1 |
| 4 | Audit all `:active` rules across landing.html | LND | 3 | 1 | L | 1 |
| 5 | Verify the fan capture submit button has `:active { transform: scale(0.96); }` with spring easing | V7 | 5 | 1 | L | 1 |
| 6 | Verify the hero primary CTA button has `:active { transform: scale(0.96); }` on able-v7.html | V7 | 5 | 1 | L | 1 |
| 7 | Verify the hero secondary ghost CTA button has a distinct pressed state (scale 0.97) | V7 | 4 | 1 | L | 1 |
| 8 | Confirm `.chq-state-btn:active { transform: scale(0.97) }` exists and uses `--spring` easing | ADM | 4 | 1 | L | 1 |
| 9 | Add `:active` scale(0.96) to the snap card publish/edit buttons | ADM | 3 | 1 | L | 1 |
| 10 | Add `:active` to the snap add button (`.snap-add-btn`) — scale(0.97) | ADM | 3 | 1 | L | 1 |
| 11 | Verify the platform pills on able-v7.html have `:active { transform: scale(0.95); }` | V7 | 4 | 1 | L | 1 |
| 12 | Add `:active` scale(0.97) to event card tap area on able-v7.html | V7 | 3 | 1 | L | 1 |
| 13 | Add `:active` scale(0.97) to merch card tap area on able-v7.html | V7 | 3 | 1 | L | 1 |
| 14 | Add `:active` scale(0.97) to release card tap area on able-v7.html | V7 | 3 | 1 | L | 1 |
| 15 | Add `:active` to the landing primary CTA button — scale(0.96) with spring | LND | 4 | 1 | L | 1 |
| 16 | Add `:active` to the landing secondary CTA link — opacity(0.7) | LND | 3 | 1 | L | 1 |
| 17 | Add `:active` to the landing pricing tier CTA buttons | LND | 3 | 1 | L | 1 |
| 18 | Add `:active` to the admin save/apply button — scale(0.97) | ADM | 3 | 1 | L | 1 |
| 19 | Add `:active` to the admin modal confirm buttons | ADM | 3 | 1 | L | 1 |
| 20 | Add `:active` to the admin modal cancel buttons | ADM | 3 | 1 | L | 1 |
| 21 | Add `:active` to the bottom sheet option rows | ADM | 3 | 1 | L | 1 |
| 22 | Add `:active` to the bottom sheet close button — scale(0.9) | ADM | 2 | 1 | L | 1 |
| 23 | Verify onboarding next button in start.html has `:active { transform: scale(0.97) }` | STR | 4 | 1 | L | 1 |
| 24 | Verify onboarding back button in start.html has `:active` scale(0.97) | STR | 3 | 1 | L | 1 |
| 25 | Add `:active` to start.html genre/vibe chips — scale(0.95) | STR | 3 | 1 | L | 1 |
| 26 | Add `:active` to start.html colour swatch buttons | STR | 3 | 1 | L | 1 |
| 27 | Add `:active` to the Spotify import button in start.html | STR | 3 | 1 | L | 1 |
| 28 | Add `:active` to start.html CTA type selector buttons | STR | 3 | 1 | L | 1 |
| 29 | Add `:active` to start.html theme selector chips | STR | 3 | 1 | L | 2 |
| 30 | Verify the `.pressable` utility class is defined — `transform: scale(0.97); transition: transform var(--dur-fast) var(--spring)` | ALL | 4 | 1 | L | 1 |
| 31 | Check whether able-v7.html uses the `.pressable` class consistently on all tappable elements | V7 | 4 | 1 | L | 1 |
| 32 | Check whether admin.html uses `.pressable` or equivalent on icon buttons | ADM | 3 | 1 | L | 1 |
| 33 | Verify spring easing token `--spring: cubic-bezier(0.34,1.56,0.64,1)` is declared on all pages | ALL | 4 | 1 | L | 1 |
| 34 | Confirm active state transitions use `var(--spring)` easing, not `var(--decel)` | V7 | 4 | 1 | L | 1 |
| 35 | Confirm active state transitions use `var(--spring)` easing in admin.html | ADM | 4 | 1 | L | 1 |
| 36 | Confirm active state transition duration uses `--dur-fast` (0.14s), not longer values | V7 | 3 | 1 | L | 1 |
| 37 | Add `:active` to the fan list star button in admin | ADM | 3 | 1 | L | 2 |
| 38 | Add `:active` to the fan list row delete button in admin | ADM | 3 | 1 | L | 2 |
| 39 | Add `:active` to the admin add show button | ADM | 2 | 1 | L | 2 |
| 40 | Add `:active` to the admin add CTA button | ADM | 3 | 1 | L | 2 |
| 41 | Add `:active` to the admin export CSV button | ADM | 2 | 1 | L | 2 |
| 42 | Add `:active` to the admin gig mode toggle — tactile feel for a consequential action | ADM | 4 | 1 | L | 1 |
| 43 | Add `:active` to the DC action pills | ADM | 3 | 1 | L | 2 |
| 44 | Add `:active` to the upgrade bar dismiss button | ADM | 2 | 1 | L | 2 |
| 45 | Add `:active` to the nudge dismiss (×) in admin | ADM | 2 | 1 | L | 2 |
| 46 | Verify icon-only buttons (edit, delete, copy) have `:active` scale(0.88) — smaller scale for small targets | ADM | 3 | 1 | L | 1 |
| 47 | Verify the snap card in able-v7.html (update card) has an `:active` if it is an expandable/tappable element | V7 | 3 | 1 | L | 2 |
| 48 | Add `:active` to the support pack CTA button on able-v7.html | V7 | 3 | 1 | L | 2 |
| 49 | Add `:active` to the FAQ accordion trigger in landing.html | LND | 2 | 1 | L | 2 |
| 50 | Add `:active` to landing nav items | LND | 2 | 1 | L | 2 |
| 51 | Verify that `:active` states do NOT use `transition: all` — each must name specific properties | ALL | 4 | 1 | L | 1 |
| 52 | Verify that pressing a button while holding (long press) does not show unwanted text selection | V7 | 3 | 1 | L | 2 |
| 53 | Add `user-select: none` to all button and pill elements to prevent long-press text selection | ALL | 3 | 1 | L | 2 |
| 54 | Add `-webkit-tap-highlight-color: transparent` to interactive elements to remove grey iOS tap flash | ALL | 4 | 1 | L | 1 |
| 55 | Verify the platform pill pressed state scale is appropriate (0.95) for a small pill target | V7 | 4 | 1 | L | 1 |
| 56 | Verify that hero CTA active scale(0.96) doesn't cause content reflow due to outline changes | V7 | 3 | 1 | L | 1 |
| 57 | Add `:active` to the admin `.ci-btn-connected` connection toggle button | ADM | 2 | 1 | L | 2 |
| 58 | Add `:active` to the admin `.ci-btn` connection add button | ADM | 2 | 1 | L | 2 |
| 59 | Verify the admin `.tb-btn-acc` top bar accent button has a strong `:active` (scale 0.95) | ADM | 3 | 1 | L | 1 |
| 60 | Add `:active` to the landing sticky nav CTA — the primary acquisition button | LND | 4 | 1 | L | 1 |
| 61 | Verify that the start.html Spotify import success state doesn't conflict with the button's `:active` | STR | 2 | 1 | L | 2 |
| 62 | Add `:active` to start.html "done" or completion button | STR | 3 | 1 | L | 1 |
| 63 | Verify able-v7.html gig mode ticket CTA has a strong `:active` — consequential action | V7 | 4 | 1 | L | 1 |
| 64 | Add `:active` to able-v7.html pre-save CTA button | V7 | 5 | 1 | L | 1 |
| 65 | Add `:active` to able-v7.html countdown section share button (if present) | V7 | 3 | 1 | L | 2 |
| 66 | Confirm the admin `.btn-del` delete buttons have a distinctive `:active` (scale + red tint) | ADM | 3 | 1 | L | 2 |
| 67 | Add `:active` to the able-v7.html social share button | V7 | 3 | 1 | L | 2 |
| 68 | Verify the admin profile photo change button has an `:active` | ADM | 2 | 1 | L | 2 |
| 69 | Add `:active` to the admin colour picker swatch buttons | ADM | 3 | 1 | L | 2 |
| 70 | Add `:active` to the admin `.rel-action` release action links | ADM | 2 | 1 | L | 2 |
| 71 | Confirm pressed states restore to rest state within `--dur-fast` after release | V7 | 3 | 1 | L | 1 |
| 72 | Confirm pressed states in admin restore correctly with the spring bounce-back feel | ADM | 3 | 1 | L | 1 |
| 73 | Verify that disabled buttons do NOT show an `:active` state (they should be inert) | ALL | 4 | 1 | L | 1 |
| 74 | Add `:active` to the able-v7.html bio link (artist's external URL if clickable) | V7 | 2 | 1 | L | 3 |
| 75 | Add `:active` to the admin analytics date range picker buttons | ADM | 2 | 1 | L | 3 |
| 76 | Verify the landing mobile hamburger menu button has `:active` | LND | 2 | 1 | L | 3 |
| 77 | Add `:active` to the admin feedback/support link (if present) | ADM | 1 | 1 | L | 3 |
| 78 | Verify the start.html file upload / artwork upload button has `:active` | STR | 3 | 1 | L | 2 |
| 79 | Add `:active` to the able-v7.html scroll indicator arrow (if interactive) | V7 | 1 | 1 | L | 3 |
| 80 | Verify that `:active` states have `will-change: transform` declared to prevent compositing issues on iOS | ALL | 3 | 1 | L | 2 |
| 81 | Confirm that `will-change: transform` is removed after animation completes (not permanently set) | ALL | 3 | 2 | M | 2 |
| 82 | Verify the landing testimonial / quote card is not interactive (no false `:active` cursor) | LND | 2 | 1 | L | 2 |
| 83 | Add `:active` to admin `.analytics-tab` tabs | ADM | 2 | 1 | L | 2 |
| 84 | Add `:active` to admin shows list edit row buttons | ADM | 2 | 1 | L | 2 |
| 85 | Verify the able-v7.html quick action pills (platform links) have scale(0.95) on `:active` | V7 | 4 | 1 | L | 1 |
| 86 | Add `:active` to admin nudge "take action" CTA button | ADM | 2 | 1 | L | 2 |
| 87 | Confirm spring easing is applied consistently — not `ease` or `ease-in-out` on any active state | V7 | 3 | 1 | L | 1 |
| 88 | Confirm spring easing on all admin active states | ADM | 3 | 1 | L | 1 |
| 89 | Verify the admin page state indicator pill has `:active` if interactive | ADM | 2 | 1 | L | 2 |
| 90 | Add `:active` to any anchor tag (`<a>`) that is styled as a button — ensure the spring feedback is consistent | ALL | 3 | 1 | L | 2 |
| 91 | Add `:active` to the start.html "import from Spotify" secondary action chip | STR | 3 | 1 | L | 2 |
| 92 | Verify the gold lock overlay "upgrade" buttons in admin have `:active` | ADM | 3 | 1 | L | 2 |
| 93 | Check for any `pointer-events: none` that accidentally prevents `:active` on intended interactive elements | ALL | 3 | 1 | L | 2 |
| 94 | Verify pressed states work correctly on the Glass theme (background-blur still renders correctly during scale) | V7 | 3 | 2 | M | 2 |
| 95 | Verify pressed states work on the Contrast theme — confirm scale is visible on pure black background | V7 | 3 | 1 | L | 2 |
| 96 | Verify pressed states on the Light theme — scale must be visible on cream background | V7 | 3 | 1 | L | 2 |
| 97 | Add `:active` to the able-v7.html "join the list" or fan count social proof link (if interactive) | V7 | 2 | 1 | L | 3 |
| 98 | Verify that the confetti trigger in start.html does not conflict with the button's `:active` animation | STR | 2 | 1 | L | 2 |
| 99 | Final audit: every `cursor: pointer` element on all four pages has a corresponding `:active` rule | ALL | 4 | 2 | L | 1 |
| 100 | Document the canonical pressed state pattern in DESIGN_SYSTEM_SPEC.md — `scale(0.96–0.97)`, `--dur-fast`, `var(--spring)` — so it is not reinvented per component | ALL | 3 | 1 | L | 1 |

## Wave Summary

| Wave | Points | Focus |
|---|---|---|
| Wave 1 | 1–4, 5–12, 15, 18–20, 23–24, 30–36, 42, 46, 51, 54–56, 59–64, 71–73, 85, 87–88, 99–100 | Hero CTAs, fan capture, campaign buttons, `.pressable` class, spring token, core pages |
| Wave 2 | 13–14, 16–17, 21–22, 25–29, 37–50, 52–53, 57–58, 65–70, 74–81, 83–86, 89–96, 98 | Cards, lists, admin rows, themed states, iOS fixes, edge cases |
| Wave 3 | 74, 76–79, 82, 97 | Non-critical elements, polish pass |
