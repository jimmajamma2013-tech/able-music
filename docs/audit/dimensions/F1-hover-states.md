# Dimension F1 — Hover State Completeness
**Category:** Interaction States & Motion
**Phase:** 7

*Every interactive element across all four pages must have a defined :hover state. Elements that change nothing on hover feel dead and broken — especially on a premium product where every interaction is a trust signal. This audit covers all clickable elements: buttons, pills, links, cards, icon buttons, toggles, and nav items.*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit every CSS rule ending in `:hover` across able-v7.html — produce a complete list of elements that DO have hover states | V7 | 3 | 1 | L | 1 |
| 2 | Audit every CSS rule ending in `:hover` across admin.html — produce a complete list | ADM | 3 | 1 | L | 1 |
| 3 | Audit every CSS rule ending in `:hover` across start.html | STR | 3 | 1 | L | 1 |
| 4 | Audit every CSS rule ending in `:hover` across landing.html | LND | 3 | 1 | L | 1 |
| 5 | Verify the `.snap-btn` hover state (scale + brightness) is correctly defined and not overridden | ADM | 3 | 1 | L | 1 |
| 6 | Verify the `.snap-add-btn` hover state uses the correct accent-glow and lift pattern | ADM | 3 | 1 | L | 1 |
| 7 | Verify the `.theme-chip` hover state on admin uses the correct surface lift | ADM | 2 | 1 | L | 1 |
| 8 | Add hover state to `.platform-pill` on able-v7.html — currently only has active/focus, no hover | V7 | 4 | 1 | L | 1 |
| 9 | Verify `.event-card` on able-v7.html has a defined hover (brightness or lift) | V7 | 3 | 1 | L | 1 |
| 10 | Verify `.merch-card` on able-v7.html has a defined hover (scale or glow) | V7 | 3 | 1 | L | 1 |
| 11 | Verify `.release-card` or equivalent on able-v7.html has a defined hover | V7 | 3 | 1 | L | 1 |
| 12 | Add hover state to all landing nav links — currently only underline appears, no background lift | LND | 3 | 1 | L | 1 |
| 13 | Add hover state to landing feature cards — slight lift (translateY(-2px) + shadow) | LND | 3 | 1 | L | 1 |
| 14 | Check `.proof-strip` items — do they have hover states given they are not interactive? If not interactive, remove cursor: pointer | LND | 2 | 1 | L | 2 |
| 15 | Add hover state to admin `.dc-action` pill — should lift and brighten | ADM | 3 | 1 | L | 1 |
| 16 | Verify admin stat cards (`.stat-card`) have a hover state (lift or accent-glow) | ADM | 3 | 1 | L | 1 |
| 17 | Add hover state to the fan list row items in admin — subtle row highlight | ADM | 3 | 1 | L | 2 |
| 18 | Add hover state to the `.chq-state-btn` campaign buttons — different from active/selected | ADM | 3 | 1 | L | 1 |
| 19 | Verify the hero primary CTA button on able-v7.html has a hover (brightness + scale) | V7 | 4 | 1 | L | 1 |
| 20 | Verify the hero secondary ghost CTA button has a hover (fill change or border brightening) | V7 | 4 | 1 | L | 1 |
| 21 | Add hover state to the fan capture submit button — should lift, not just darken | V7 | 4 | 1 | L | 1 |
| 22 | Verify admin save/apply buttons have hover state using `--dash-acc` brightening | ADM | 3 | 1 | L | 1 |
| 23 | Add hover state to modal action buttons — consistent with other button hover patterns | ADM | 3 | 1 | L | 2 |
| 24 | Add hover state to the bottom sheet close button (×) — opacity lift | ADM | 2 | 1 | L | 2 |
| 25 | Add hover state to bottom sheet option rows — row highlight | ADM | 3 | 1 | L | 2 |
| 26 | Verify landing primary CTA button has hover using spring easing (physical movement) | LND | 4 | 1 | L | 1 |
| 27 | Add hover to landing secondary "See how it works" link-button | LND | 3 | 1 | L | 1 |
| 28 | Add hover state to the admin sidebar or tab bar items — accent underline or fill | ADM | 3 | 1 | L | 2 |
| 29 | Verify onboarding next/back buttons in start.html have hover states | STR | 3 | 1 | L | 1 |
| 30 | Add hover state to the start.html genre/vibe chips — scale + border colour change | STR | 3 | 1 | L | 1 |
| 31 | Add hover state to the start.html colour swatch buttons — ring or scale | STR | 3 | 1 | L | 1 |
| 32 | Verify the Spotify import button in start.html has a hover state | STR | 3 | 1 | L | 1 |
| 33 | Add hover state to FAQ accordion headers on landing — background highlight | LND | 2 | 1 | L | 2 |
| 34 | Add hover to the landing footer links — underline + opacity | LND | 2 | 1 | L | 2 |
| 35 | Add hover state to the admin `.release-row` items in the releases list | ADM | 2 | 1 | L | 2 |
| 36 | Add hover state to the admin `.show-row` items in the shows list | ADM | 2 | 1 | L | 2 |
| 37 | Add hover state to the admin connections cards (`.ci-card`) | ADM | 3 | 1 | L | 2 |
| 38 | Verify the admin profile avatar upload button has a hover state | ADM | 2 | 1 | L | 2 |
| 39 | Verify the admin `.tb-btn` (top bar buttons) all have hover states | ADM | 3 | 1 | L | 1 |
| 40 | Add hover state to the snap card edit icon button in admin | ADM | 3 | 1 | L | 1 |
| 41 | Add hover state to the snap card delete icon button in admin — red tint on hover | ADM | 3 | 1 | L | 1 |
| 42 | Verify the `.upgrade-bar` dismiss button has a hover state | ADM | 2 | 1 | L | 2 |
| 43 | Add hover state to admin analytics period selector tabs | ADM | 2 | 1 | L | 2 |
| 44 | Add hover state to the gold lock overlay CTA buttons | ADM | 3 | 1 | L | 2 |
| 45 | Add hover state to the notification/nudge dismiss (×) in admin | ADM | 2 | 1 | L | 2 |
| 46 | Verify the landing pricing tier cards have hover (lift + shadow) | LND | 3 | 1 | L | 2 |
| 47 | Add hover state to the landing social proof avatar group | LND | 1 | 1 | L | 3 |
| 48 | Add hover state to the artist name link on landing demo phone (if interactive) | LND | 2 | 1 | L | 3 |
| 49 | Verify the able-v7.html snap card (update card) row has a hover state if interactive | V7 | 3 | 1 | L | 2 |
| 50 | Add hover state to the able-v7.html support pack cards | V7 | 3 | 1 | L | 2 |
| 51 | Verify hover states use `transition` with `--dur-fast` token, not raw `0.15s` | V7 | 3 | 1 | L | 1 |
| 52 | Verify hover states use `transition` with `--dur-fast` token in admin.html | ADM | 3 | 1 | L | 1 |
| 53 | Verify hover states use `transition` with `--dur-fast` token in landing.html | LND | 3 | 1 | L | 1 |
| 54 | Verify hover states use `transition` with `--dur-fast` token in start.html | STR | 3 | 1 | L | 1 |
| 55 | Confirm no hover state uses `transition: all` — every hover transition names explicit properties | V7 | 4 | 1 | L | 1 |
| 56 | Confirm no hover state uses `transition: all` in admin.html | ADM | 4 | 1 | L | 1 |
| 57 | Confirm no hover state uses `transition: all` in landing.html | LND | 4 | 1 | L | 1 |
| 58 | Confirm no hover state uses `transition: all` in start.html | STR | 4 | 1 | L | 1 |
| 59 | Add hover to the admin export CSV button | ADM | 2 | 1 | L | 2 |
| 60 | Add hover state to the gig mode 24hr toggle switch — border colour change | ADM | 3 | 1 | L | 2 |
| 61 | Verify the admin `.field-input` elements have a hover state (border brightening before focus) | ADM | 3 | 1 | L | 2 |
| 62 | Verify the start.html text inputs have a hover state before focus | STR | 3 | 1 | L | 2 |
| 63 | Add hover to the able-v7.html media embed overlay play button | V7 | 3 | 1 | L | 2 |
| 64 | Add hover to the able-v7.html scroll-to-top button (if present) | V7 | 2 | 1 | L | 3 |
| 65 | Add hover state to the landing "Watch the demo" link/button | LND | 3 | 1 | L | 2 |
| 66 | Verify the admin gig mode countdown display has no misleading hover cursor | ADM | 2 | 1 | L | 2 |
| 67 | Add hover to the landing mobile nav hamburger (if present) | LND | 2 | 1 | L | 3 |
| 68 | Verify the start.html step indicator dots do not have hover cursor if non-interactive | STR | 2 | 1 | L | 2 |
| 69 | Add hover state to the able-v7.html bio "read more" expand toggle | V7 | 2 | 1 | L | 3 |
| 70 | Add hover state to admin connection toggle buttons (connect/disconnect) | ADM | 3 | 1 | L | 2 |
| 71 | Ensure hover state on stat cards does NOT use spring easing — use decel for state changes | ADM | 3 | 1 | L | 1 |
| 72 | Ensure hover states on cards (event, merch, release) use decel easing, not spring | V7 | 3 | 1 | L | 1 |
| 73 | Ensure hover on platform pills uses decel easing (state change, not spatial movement) | V7 | 3 | 1 | L | 1 |
| 74 | Add hover state to the admin `.nudge-card` action buttons | ADM | 2 | 1 | L | 2 |
| 75 | Add hover state to the admin freelancer toggle chips (when Professionals layer active) | ADM | 2 | 1 | L | 3 |
| 76 | Add hover state to `.fan-row .star-btn` (star fan button) — amber fill on hover | ADM | 3 | 1 | L | 2 |
| 77 | Add hover to the start.html CTA type selector buttons (pre-save, stream, tickets) | STR | 3 | 1 | L | 1 |
| 78 | Add hover to the start.html theme selector (Dark/Light/Glass/Contrast) chips | STR | 3 | 1 | L | 2 |
| 79 | Verify the able-v7.html countdown section has no interactive hover confusion | V7 | 2 | 1 | L | 2 |
| 80 | Add hover to landing testimonial cards if they are interactive (e.g. expandable) | LND | 2 | 1 | L | 3 |
| 81 | Add hover state to the admin `.analytics-tab` selector buttons | ADM | 2 | 1 | L | 2 |
| 82 | Add hover to the admin sparkline chart — tooltip trigger area needs a cursor change | ADM | 2 | 2 | M | 3 |
| 83 | Confirm the landing sticky nav CTA button has the correct hover (spring lift) | LND | 3 | 1 | L | 1 |
| 84 | Add hover to admin `.mode-card` campaign state cards (not buttons within them, but the cards themselves if selectable) | ADM | 3 | 1 | L | 2 |
| 85 | Verify hover on the able-v7.html fan capture form submit is distinct from the active/pressed state | V7 | 4 | 1 | L | 1 |
| 86 | Add hover state to the admin upgrade prompt inline CTA | ADM | 2 | 1 | L | 2 |
| 87 | Verify icon-only buttons (edit, delete, copy link) in admin have hover background circle/pill | ADM | 3 | 1 | L | 1 |
| 88 | Add hover to the able-v7.html merch "view item" link within a merch card | V7 | 3 | 1 | L | 2 |
| 89 | Add hover to admin `.shows-add-btn` — consistent with other add buttons | ADM | 2 | 1 | L | 2 |
| 90 | Verify the landing comparison table row items have row-level hover highlight | LND | 2 | 1 | L | 3 |
| 91 | Check that all hover states are suppressed under `@media (hover: none)` for touch devices | V7 | 3 | 2 | M | 2 |
| 92 | Check that all hover states are suppressed under `@media (hover: none)` in admin | ADM | 3 | 2 | M | 2 |
| 93 | Check that all hover states are suppressed under `@media (hover: none)` in landing | LND | 3 | 2 | M | 2 |
| 94 | Check that all hover states are suppressed under `@media (hover: none)` in start | STR | 3 | 2 | M | 2 |
| 95 | Verify hover state brightness values are consistent — use `brightness(1.08)` not arbitrary values | V7 | 2 | 1 | L | 3 |
| 96 | Verify hover translateY values are consistent — use `-2px` for cards, `0` with scale for buttons | V7 | 2 | 1 | L | 3 |
| 97 | Audit the admin `.cta-row` CTA list items for hover state | ADM | 3 | 1 | L | 2 |
| 98 | Add hover to landing "already on ABLE?" or sign-in link (if present) | LND | 1 | 1 | L | 3 |
| 99 | Add hover to the start.html "skip this step" links (if present) | STR | 2 | 1 | L | 3 |
| 100 | Final grep verification: confirm every `cursor: pointer` rule has a corresponding `:hover` rule on the same selector or its parent | ALL | 4 | 2 | L | 1 |

## Wave Summary

| Wave | Points | Focus |
|---|---|---|
| Wave 1 | 1–4, 8, 12, 15, 16, 18–27, 29–31, 51–58, 71–73, 83, 85, 87, 100 | Core buttons, platform pills, hero CTAs, token compliance |
| Wave 2 | 5–7, 9–11, 13–14, 17, 28, 32–44, 59–66, 74–82, 84, 86, 88–91 | Cards, admin rows, lists, secondary actions, hover: none guards |
| Wave 3 | 45–50, 67–70, 75, 80, 90, 92–99 | Edge cases, freelancer layer, landing polish, consistency sweep |
