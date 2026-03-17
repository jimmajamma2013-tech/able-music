# Dimension E1 — Tap Target Completeness
**Category:** Mobile UX & Touch
**Phase:** 3

Every interactive element on every ABLE page must present a minimum 44×44px tap target. On a product used almost entirely on mobile — often one-handed, in low-light post-gig conditions — an undersized target is a broken interaction. This audit covers every button, link, toggle, icon trigger, pill, and form element across all four active pages.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit snap-btn computed height: `padding: 5px 10px` + `font-size: 11px` likely renders at ~28px — must reach 44px minimum | V8 | 5 | 2 | L | 1 |
| 2 | Add `min-height: 44px` to `.snap-btn` and verify it reflows correctly at 375px | V8 | 5 | 1 | L | 1 |
| 3 | The `.dc-action` pill button: measure computed height at 390px — small font + tight padding may fall below 44px | ADM | 5 | 2 | L | 1 |
| 4 | Add `min-height: 44px` to `.dc-action` pill if computed height fails audit | ADM | 5 | 1 | L | 1 |
| 5 | Card close icons (`×` or `✕`): typically 24px rendered — wrap in a transparent 44×44px hit area using `::before` or padding | V8 | 4 | 2 | L | 1 |
| 6 | Admin card close icons: same issue — verify all dismissible card close buttons meet 44×44px | ADM | 4 | 2 | L | 1 |
| 7 | Theme-chip selector elements on the profile page: measure click area — small pill shape may under-deliver on tap target | V8 | 3 | 2 | L | 2 |
| 8 | The `.chq-state-btn` has `min-height: 56px` — confirm this is applied via CSS and not overridden anywhere | ADM | 4 | 1 | L | 1 |
| 9 | Info tooltip trigger (single `?` character): must be wrapped in an element with at least `min-width: 44px; min-height: 44px` | ADM | 4 | 2 | L | 1 |
| 10 | If info tooltip trigger is currently a plain `<span>`, replace with `<button>` and apply 44px sizing | ADM | 4 | 2 | L | 1 |
| 11 | Platform pill links on the profile page: current padding — measure computed height at 375px; streaming service pill row | V8 | 5 | 2 | L | 1 |
| 12 | Fan capture submit button: verify `min-height: 44px` is set and not collapsed by flex container | V8 | 5 | 1 | L | 1 |
| 13 | Gig strip toggle button: the "on tonight" toggle — measure tap area; toggle switches are often too small | ADM | 4 | 2 | L | 1 |
| 14 | Admin bottom tab bar items: each tab icon + label must total at least 44px height; tab bar height should be ≥56px | ADM | 5 | 2 | L | 1 |
| 15 | Landing nav links in the header: often styled as inline text links — measure tap targets, add padding to reach 44px | LND | 3 | 2 | L | 2 |
| 16 | Landing FAQ accordion buttons: frequently styled with minimal padding — add `min-height: 44px` | LND | 3 | 1 | L | 2 |
| 17 | Bottom sheet handle (drag indicator bar): this element should be at least 44px tall to serve as a reliable drag target | V8 | 3 | 2 | L | 2 |
| 18 | Bottom sheet handle in admin: same — the sheet drag handle should have a padded hit area ≥44px | ADM | 3 | 2 | L | 2 |
| 19 | Fan email input field: `width: 100%` is expected but verify height — should be `min-height: 44px` | V8 | 5 | 1 | L | 1 |
| 20 | All `<input>` elements in admin form: set `min-height: 44px` globally for admin inputs via the `.adm-input` class | ADM | 4 | 1 | L | 1 |
| 21 | Start.html wizard next/back navigation buttons: measure rendered height — typically fine if styled but verify | STR | 4 | 1 | L | 1 |
| 22 | Start.html step indicator dots (progress): if these are tappable, they need 44×44px; if decorative, no action needed | STR | 3 | 2 | L | 2 |
| 23 | Start.html vibe-selector chips: genre/vibe selection chips must be ≥44px height; small chips lose taps | STR | 4 | 2 | L | 1 |
| 24 | Start.html colour picker swatches: small circles are common — add `min-width: 44px; min-height: 44px` padding | STR | 4 | 2 | L | 1 |
| 25 | Accordion expand/collapse buttons in admin (connections, shows): measure computed height — often under 44px | ADM | 3 | 1 | L | 2 |
| 26 | Show list item action buttons (edit/delete): icon-only buttons in lists must have 44×44px tap areas | ADM | 4 | 2 | L | 1 |
| 27 | CTA pill edit/delete buttons in admin CTA manager: icon buttons in pill row often fail tap target | ADM | 4 | 2 | L | 1 |
| 28 | Gold lock overlay CTA button: must be ≥44px height — this is the upgrade tap, every miss costs revenue | ADM | 5 | 1 | L | 1 |
| 29 | Profile page social/platform pill — "more" overflow toggle: the `+N more` toggle must be ≥44px | V8 | 4 | 2 | L | 1 |
| 30 | Hero CTA primary button: verify `min-height: 52px` or similar — hero CTA is the highest-value tap | V8 | 5 | 1 | L | 1 |
| 31 | Hero CTA secondary (ghost) button: same check — ghost buttons often have less visual mass but same tap requirement | V8 | 5 | 1 | L | 1 |
| 32 | Pre-save CTA button: in pre-release state, verify this dedicated CTA is ≥44px height | V8 | 5 | 1 | L | 1 |
| 33 | Gig mode "get tickets" button: in gig state, verify prominent ticket CTA is ≥44px | V8 | 5 | 1 | L | 1 |
| 34 | Admin "save changes" button: if this sits in a footer bar, confirm it clears the safe-area-inset and is ≥44px | ADM | 5 | 1 | L | 1 |
| 35 | Admin "add show" button: in the shows section, the add-new action button — measure height | ADM | 3 | 1 | L | 2 |
| 36 | Admin "add snap card" button: same — secondary add actions often under-sized | ADM | 3 | 1 | L | 2 |
| 37 | Landing primary CTA button: the hero "get started" equivalent — verify ≥44px height, likely fine but confirm | LND | 5 | 1 | L | 1 |
| 38 | Landing secondary CTA (if present): ghost or outline button alongside primary — same 44px requirement | LND | 4 | 1 | L | 1 |
| 39 | Landing pricing tier selection/CTA buttons: each pricing card CTA must be ≥44px | LND | 4 | 1 | L | 1 |
| 40 | Profile page back/share native action — if a custom back button is rendered, measure it | V8 | 3 | 1 | L | 2 |
| 41 | Admin nudge dismiss button: the `×` on nudge cards — must be ≥44×44px tap area | ADM | 3 | 2 | L | 1 |
| 42 | Fan sign-up form — the input itself must be touchable full-width, not clipped by container | V8 | 5 | 1 | L | 1 |
| 43 | Admin stat card "view details" link if present: small inline links in stat cards often fail | ADM | 3 | 2 | L | 2 |
| 44 | Bottom sheet close button (if rendered separately from drag handle): must be ≥44×44px | ALL | 4 | 2 | L | 1 |
| 45 | Admin connections section link/unlock buttons: verify each action in connections panel | ADM | 3 | 2 | L | 2 |
| 46 | Start.html CTA-type selector (stream / pre-save / show): radio-style selector cards — measure height | STR | 4 | 2 | L | 1 |
| 47 | Start.html artwork upload trigger: the file upload area / "add artwork" button — measure tap area | STR | 3 | 2 | L | 2 |
| 48 | Profile page merch card links: each merch item that is a link needs ≥44px height | V8 | 3 | 2 | L | 2 |
| 49 | Profile page events "get tickets" per-show button: small pill button per show row — measure | V8 | 4 | 2 | L | 1 |
| 50 | Profile page fan support tier buttons (support packs): each support tier CTA must be ≥44px | V8 | 4 | 1 | L | 1 |
| 51 | Admin release title input in campaign section: `min-height: 44px` for all single-line inputs | ADM | 3 | 1 | L | 2 |
| 52 | Admin release date input: date pickers are notoriously small on mobile — verify height | ADM | 4 | 2 | M | 1 |
| 53 | Admin accent colour hex input: small colour preview swatch + input — swatch needs 44×44px tap area | ADM | 3 | 2 | L | 2 |
| 54 | Admin theme selector chips: four theme options (Dark/Light/Glass/Contrast) — measure chip tap area | ADM | 3 | 2 | L | 2 |
| 55 | Admin fan list action buttons (star, export row): icon-only actions in fan table rows — measure | ADM | 3 | 2 | L | 2 |
| 56 | Admin fan list filter/sort controls: small dropdown or toggle controls above fan list | ADM | 3 | 2 | L | 2 |
| 57 | Landing testimonial navigation (if carousel): prev/next arrows must be ≥44×44px | LND | 3 | 1 | L | 2 |
| 58 | Landing feature comparison toggle (if present): any plan toggle (monthly/annual billing switch) | LND | 3 | 2 | L | 2 |
| 59 | Profile music section "play" button overlaid on artwork: measure this overlay button specifically | V8 | 4 | 2 | L | 1 |
| 60 | Profile oEmbed player controls: if custom controls are rendered over the iframe, they must be ≥44px; note: native Spotify controls are not our responsibility | V8 | 3 | 3 | M | 3 |
| 61 | Admin "copy profile link" button: small icon-text button in page header — verify 44px height | ADM | 3 | 2 | L | 2 |
| 62 | Admin "preview profile" button: same — action buttons in the header row of admin | ADM | 3 | 2 | L | 2 |
| 63 | Profile page snap card action buttons (if snap cards have CTAs): inline buttons within snap cards | V8 | 3 | 2 | L | 2 |
| 64 | Apply `touch-action: manipulation` globally to all interactive elements to eliminate the 300ms tap delay on older Android | ALL | 4 | 1 | L | 1 |
| 65 | Use CSS `min-height` not `height` for all button sizing — `height` clips content, `min-height` allows expansion | ALL | 4 | 1 | L | 1 |
| 66 | For icon-only buttons, use padding instead of fixed dimensions — ensures text scaling doesn't break targets | ALL | 3 | 2 | L | 2 |
| 67 | Add a visual test page (audit tool) that highlights all elements under 44px on a given page — run against V8 and ADM | ALL | 4 | 3 | L | 3 |
| 68 | Admin tab bar: confirm that tab items span the full height of the bar and don't have padding that reduces the tappable area to less than 44px | ADM | 5 | 1 | L | 1 |
| 69 | Check that `pointer-events: none` is not accidentally applied to parent wrappers of interactive elements in admin | ADM | 3 | 2 | M | 2 |
| 70 | Admin campaign state switcher (profile/pre-release/live/gig): each state button must be ≥44px — the `.chq-state-btn` audit | ADM | 5 | 1 | L | 1 |
| 71 | Start.html back button in wizard header: often a `<` icon — measure and pad to 44×44px | STR | 3 | 1 | L | 2 |
| 72 | Profile page "scroll to fan sign-up" anchor link if present: must be ≥44px | V8 | 4 | 1 | L | 2 |
| 73 | Landing "watch demo" or "see example" secondary link: verify this is ≥44px height | LND | 3 | 1 | L | 2 |
| 74 | Profile page genre/vibe label: if this is a tappable filter, it needs 44px; if decorative, mark `aria-hidden` | V8 | 2 | 1 | L | 3 |
| 75 | Admin email broadcast compose button: once feature is built, ensure compose CTA is ≥44px | ADM | 3 | 2 | L | 3 |
| 76 | Fan sign-up success — "done" or "close" button on the confirmation message: must be ≥44px | V8 | 4 | 1 | L | 1 |
| 77 | Error state retry buttons (e.g., "try again" in failed fan sign-up): must be ≥44px | V8 | 4 | 1 | L | 1 |
| 78 | Admin show row delete confirmation: the inline delete confirm appears as a small "yes/no" — must both be ≥44px | ADM | 4 | 2 | L | 1 |
| 79 | All `<select>` dropdowns must render ≥44px height on iOS Safari; native select height can vary by OS | ALL | 4 | 2 | M | 2 |
| 80 | Admin tier gate "learn more" links: inline text links within gold lock overlays — pad to 44px height | ADM | 3 | 2 | L | 2 |
| 81 | Profile page share button (if native share API is invoked): typically an icon — must be ≥44×44px | V8 | 3 | 1 | L | 2 |
| 82 | Start.html progress step indicators: if clickable to navigate steps, they need 44×44px targets; if not clickable, no action | STR | 3 | 2 | L | 2 |
| 83 | Admin snap card drag-to-reorder handle: drag handle icons are often tiny — add 44px width to the handle region | ADM | 3 | 2 | L | 3 |
| 84 | Admin "upgrade" button in tier section: this is a high-value conversion button — verify ≥44px height | ADM | 5 | 1 | L | 1 |
| 85 | Admin "sign out" or account menu trigger: often small text link — pad to 44px | ADM | 2 | 1 | L | 3 |
| 86 | All modal confirm/cancel button pairs: confirm gets primary style, cancel gets ghost — both must be ≥44px height | ALL | 4 | 1 | L | 1 |
| 87 | Landing pricing FAQ "open/close" icon button: the accordion caret button in FAQ rows | LND | 3 | 1 | L | 2 |
| 88 | Landing footer links: if ABLE footer has navigation links, they need ≥44px height — common oversight | LND | 2 | 1 | L | 3 |
| 89 | Admin section collapse toggles (if sections are collapsible): the toggle header must be ≥44px | ADM | 3 | 1 | L | 2 |
| 90 | Profile page video/audio play overlay — if a custom play button is overlaid on a thumbnail, min 44×44px | V8 | 4 | 2 | L | 2 |
| 91 | Add a Playwright test that asserts every `<button>`, `<a>`, and `[role="button"]` has a bounding box ≥44px on both axes at 390px viewport | ALL | 5 | 4 | L | 4 |
| 92 | Audit: the `<label>` for each checkbox/radio — the label itself should be the tap target, not just the control | ALL | 3 | 2 | L | 2 |
| 93 | Confirm that hover-only tooltip triggers (no keyboard equivalent) also have ≥44px tap target for touch devices | ALL | 3 | 2 | L | 2 |
| 94 | Admin CTA type selector (stream / presave / direct link): radio-card UI — ensure full card is tappable, not just the radio dot | ADM | 4 | 2 | L | 1 |
| 95 | Use `appearance: none` on custom radio/checkbox inputs and ensure the custom replacement is ≥44×44px | ALL | 4 | 2 | L | 2 |
| 96 | Verify that `overflow: hidden` on parent containers is not clipping the tap area of child buttons | ALL | 3 | 2 | M | 2 |
| 97 | Profile page: if the artist avatar is a tappable element (e.g., expands photo), the avatar image needs a 44×44px minimum size, which at current sizing should be satisfied — confirm | V8 | 2 | 1 | L | 3 |
| 98 | Create a mobile-tap-target token: `--touch-min: 44px` and reference it in all `min-height`/`min-width` rules for interactive elements | ALL | 3 | 2 | L | 3 |
| 99 | Document all confirmed tap target sizes in `docs/audit/dimensions/E1-tap-targets.md` results column after implementation so regressions can be caught in future | ALL | 3 | 2 | L | 4 |
| 100 | Final Playwright visual regression: screenshot every button at 375px and 390px after all E1 fixes, store in `screenshots/e1-tap-targets/` for comparison | ALL | 4 | 3 | L | 4 |

## Wave Summary

| Wave | Items | Focus |
|---|---|---|
| 1 | 1–16, 18–19, 21, 23–24, 26–38, 40–41, 44, 46, 48–53, 55, 59, 64–65, 68, 70, 72, 76–78, 84, 86 | All critical tap targets — hero CTAs, snap-btn, dc-action, fan capture, admin primary actions |
| 2 | 17, 20, 22, 25, 39, 42–43, 45, 47, 54, 56–58, 60–63, 66, 69, 71, 73–75, 79–83, 85, 87–89, 92–93, 95–96 | Secondary actions, tooltips, admin panels, landing elements |
| 3 | 60, 67, 74, 83, 85, 97 | Low-priority and complex items (native controls, audit tooling) |
| 4 | 91, 99, 100 | Playwright automation and documentation |
