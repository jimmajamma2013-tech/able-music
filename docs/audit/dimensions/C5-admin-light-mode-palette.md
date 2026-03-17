# Dimension C5 — Admin Light-Mode Palette
**Category:** Colour, Contrast & Themes
**Phase:** 6 (Colour)
**Status:** Not started

The admin dashboard uses a purpose-built warm cream palette with `--dash-bg: #e4dfd7` as the floor, `--dash-card: #f8f5f0` as card surfaces, and `--dash-shell: #1a1a2e` as the persistent tab shell. This is an always-on light mode — admin never goes dark by default. The primary accessibility risk is the amber accent `--dash-amber: #f4b942` which has only a ~1.8:1 contrast ratio against the cream card surface, making it unsafe for text. A secondary risk is outdoor use: artists check their dashboards on phones in daylight, where low-luminance screens compound borderline ratios. Every text/background pair in the admin must independently pass WCAG AA (4.5:1 for normal text, 3:1 for large text), and the entire palette must be verified not just in a browser devtools simulator but under simulated low-brightness conditions.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify `--dash-amber` (#f4b942) is never used as text colour on any cream surface — audit every CSS rule | ADM | 5 | 1 | H | 1 |
| 2 | Fix any use of `--dash-amber` (#f4b942) as text on cream — replace with `--dash-link` (#8c6200) which passes 4.5:1 | ADM | 5 | 2 | H | 1 |
| 3 | Verify `.rel-status-upcoming` text colour (#f4b942) on its rgba(244,185,66,0.15) tinted card background — likely fails | ADM | 5 | 2 | H | 1 |
| 4 | Fix `.rel-status-upcoming` text to use `--dash-link` (#8c6200) or a darker amber token on cream | ADM | 5 | 2 | H | 1 |
| 5 | Verify `.page-next-moment` text (uses `--acc` which is amber) on `--dash-bg` (#e4dfd7) floor — calculate ratio | ADM | 5 | 1 | H | 1 |
| 6 | Fix `.page-next-moment` if amber on cream fails — use `--dash-link` (#8c6200) for on-cream amber text | ADM | 5 | 2 | H | 1 |
| 7 | Verify `.rel-status-current` text (#34c759 bright green) on rgba(52,199,89,0.15) tint on cream — bright green fails | ADM | 5 | 2 | H | 1 |
| 8 | Fix `.rel-status-current` — replace #34c759 text with `--dash-green` (#1e9650) which passes on cream | ADM | 5 | 2 | H | 1 |
| 9 | Verify `--source-sp` (#1ed760 Spotify green) as text on cream `--dash-card` — bright green will fail 4.5:1 | ADM | 5 | 1 | H | 1 |
| 10 | Fix `--source-sp` text rendering on cream — use a darker green (#1a7a3c or similar) for admin light mode | ADM | 5 | 2 | H | 1 |
| 11 | Verify `--source-direct` (#999999) as text on `--dash-card` (#f8f5f0) — #999 on near-white is ~2.85:1, fails | ADM | 5 | 1 | H | 1 |
| 12 | Fix `--source-direct` for admin light mode — use #767676 minimum (4.54:1 on white) | ADM | 5 | 2 | H | 1 |
| 13 | Verify `.snap-btn.published` text (#7ec88a sage) on `--dash-card` (#f8f5f0) — sage on near-white fails 4.5:1 | ADM | 4 | 1 | H | 1 |
| 14 | Fix `.snap-btn.published` text — use `--dash-green` (#1e9650) not #7ec88a | ADM | 4 | 2 | H | 1 |
| 15 | Verify `.ci-btn-connected` text (#7ec88a) on rgba(120,200,138,0.1) tint on card — sage on near-white tint | ADM | 4 | 2 | H | 1 |
| 16 | Fix `.ci-btn-connected` text if sage fails — replace with `--dash-green` (#1e9650) | ADM | 4 | 2 | H | 1 |
| 17 | Verify `--dash-t2` (#555555) on `--dash-bg` (#e4dfd7) — calculate exact ratio; expected ~5.3:1, confirm | ADM | 4 | 1 | M | 1 |
| 18 | Verify `--dash-t2` (#555555) on `--dash-card` (#f8f5f0) — calculate; expected ~5.7:1, confirm | ADM | 4 | 1 | M | 1 |
| 19 | Verify `--dash-t3` (#595959) on `--dash-card` (#f8f5f0) — code comment claims ≥4.5:1, independently calculate | ADM | 4 | 1 | M | 1 |
| 20 | Verify `--dash-t3` (#595959) on `--dash-bg` (#e4dfd7) — floor is darker than card, recalculate separately | ADM | 4 | 1 | M | 1 |
| 21 | Verify `--dash-t3` (#595959) on `--dash-field` (#e4dfd7) — same value as floor but verify field backgrounds | ADM | 4 | 1 | M | 1 |
| 22 | Verify `--dash-link` (#8c6200) on `--dash-card` (#f8f5f0) — stated ≥4.5:1, independently verify | ADM | 4 | 1 | M | 1 |
| 23 | Verify `--dash-link` (#8c6200) on `--dash-bg` (#e4dfd7) — darker floor reduces ratio, recalculate | ADM | 4 | 1 | M | 1 |
| 24 | Verify `--dash-green` (#1e9650) on `--dash-card` (#f8f5f0) — green on cream, calculate | ADM | 4 | 1 | M | 1 |
| 25 | Verify `--dash-green` (#1e9650) on `--dash-bg` (#e4dfd7) — calculate | ADM | 4 | 1 | M | 1 |
| 26 | Verify `--dash-red` (#c04030) on `--dash-card` (#f8f5f0) — red on cream, calculate | ADM | 4 | 1 | M | 1 |
| 27 | Verify `--dash-red` (#c04030) on `--dash-bg` (#e4dfd7) — calculate | ADM | 4 | 1 | M | 1 |
| 28 | Verify `--source-ig` (#e1306c) as text on `--dash-card` (#f8f5f0) — pink on cream, calculate | ADM | 3 | 1 | M | 1 |
| 29 | Verify `--source-tt` (#777777) on `--dash-card` (#f8f5f0) — mid-grey on near-white | ADM | 3 | 1 | M | 1 |
| 30 | Verify tab bar inactive label text on `--dash-shell` (#1a1a2e) — dark shell uses light text, calculate | ADM | 4 | 1 | M | 1 |
| 31 | Verify tab bar active label text on `--dash-shell` (#1a1a2e) — calculate | ADM | 4 | 1 | M | 1 |
| 32 | Verify the `.tb-btn-acc` button: text (#121a24) on `--acc` (#c9a84c) — calculate ratio | ADM | 4 | 1 | M | 1 |
| 33 | Confirm admin focus ring visibility: amber (`--acc`) ring on cream `--dash-bg` passes WCAG 1.4.11 (3:1) | ADM | 5 | 2 | H | 1 |
| 34 | Fix admin focus ring if amber on cream fails 3:1 non-text contrast — per WCAG 1.4.11 | ADM | 5 | 2 | H | 1 |
| 35 | Verify `.chq-state-pill.profile` text (#6b4a00) on rgba amber tint on cream — dark amber on light amber tint | ADM | 3 | 2 | M | 1 |
| 36 | Verify `.chq-state-pill.pre` text (#5c4e00) on rgba yellow tint on cream — calculate | ADM | 3 | 2 | M | 1 |
| 37 | Verify `.chq-state-pill.live` text (#a01010) on rgba red tint on cream — dark red on light red tint | ADM | 3 | 2 | M | 1 |
| 38 | Verify `.chq-state-pill.gig` text (#8c3200) on rgba orange tint on cream — calculate | ADM | 3 | 2 | M | 1 |
| 39 | Verify `.gig-label` text (#b34000) on `.gig-strip` background on cream — calculate | ADM | 3 | 1 | M | 1 |
| 40 | Verify `#1a1a2e` text on `--dash-amber` (#f4b942) badge/tag backgrounds — dark on gold | ADM | 4 | 1 | L | 1 |
| 41 | Verify `.stat-label` (10px/700) text at `--dash-t3` on card — 10px bold may not qualify as large text | ADM | 3 | 1 | M | 1 |
| 42 | Verify `.stat-delta` (`--dash-t3`, 11px) on card — normal small text, 4.5:1 required | ADM | 3 | 1 | M | 1 |
| 43 | Verify `.empty-state__body` (`--dash-t2`, 12px) on card — calculate | ADM | 3 | 1 | M | 1 |
| 44 | Verify `.field-label` (`--dash-t3`, 10px/700) on `--dash-field` (#e4dfd7) — field label on field background | ADM | 3 | 1 | M | 1 |
| 45 | Verify `.field-hint` (`--dash-t3`, 11px) on card — calculate | ADM | 3 | 1 | M | 1 |
| 46 | Verify field input text (`--dash-text`, 13px) on `--dash-field` (#e4dfd7) — calculate | ADM | 3 | 1 | L | 1 |
| 47 | Verify field placeholder text on `--dash-field` — browser renders placeholder at reduced opacity; calculate with opacity applied | ADM | 4 | 1 | M | 1 |
| 48 | Verify admin disabled field text (reduced opacity of `--dash-t2`) on `--dash-field` — opacity compounds | ADM | 3 | 1 | M | 1 |
| 49 | Verify admin disabled button text and background combination | ADM | 3 | 1 | M | 1 |
| 50 | Verify `.stat-value` (`--dash-text`, 32px/700) on card — large display text uses 3:1 threshold | ADM | 2 | 1 | L | 1 |
| 51 | Verify `.page-title` (`--dash-text`, 22px/700) on `--dash-bg` — large text, 3:1 minimum applies | ADM | 2 | 1 | L | 1 |
| 52 | Verify `.page-sub` (`--dash-t2`, 13px) on `--dash-bg` — calculate | ADM | 3 | 1 | M | 1 |
| 53 | Verify `.chq-title` (`--dash-text`, 13px/600 uppercase) on card — uppercase may qualify as large, confirm threshold | ADM | 2 | 1 | L | 1 |
| 54 | Verify all fan list row text (`--dash-text`, `--dash-t2`, `--dash-t3`) on card — three levels in one view | ADM | 3 | 1 | M | 1 |
| 55 | Verify `.snap-label` (`--dash-text`, 12px/600) on card | ADM | 2 | 1 | L | 1 |
| 56 | Verify `.ci-name` (`--dash-text`, 13px/600) on card | ADM | 2 | 1 | L | 1 |
| 57 | Verify `.ci-status` (`--dash-t3`, 10px) on card — very small text | ADM | 2 | 1 | L | 1 |
| 58 | Verify `.milestone-text` (`--dash-text`, 13px/500) on milestone strip background | ADM | 3 | 1 | L | 1 |
| 59 | Verify `.milestone-dismiss` (`--dash-t3`) on milestone strip — calculate | ADM | 2 | 1 | L | 1 |
| 60 | Verify the admin welcome greeting text (`--dash-text`) on `--dash-bg` floor | ADM | 2 | 1 | L | 1 |
| 61 | Verify upgrade overlay text on the gold lock overlay background — calculate | ADM | 3 | 1 | M | 1 |
| 62 | Verify `.upgrade-bar-text` (`--dash-t2`) on upgrade bar background — calculate | ADM | 3 | 1 | M | 1 |
| 63 | Verify `.ai-suggestion-label span` (`--dash-t3`, 10px) on `--dash-bg-card` — small text on card | ADM | 2 | 1 | L | 1 |
| 64 | Verify `.arc-node.done .arc-label` (`--dash-t3`) on `--dash-bg` floor — arc nodes sit on floor | ADM | 2 | 1 | L | 1 |
| 65 | Verify campaign arc active node text and background combination | ADM | 2 | 1 | L | 1 |
| 66 | Verify `.chq-auto-hint strong` (`--dash-t2`) and body text (`--dash-t3`) on cream card — borderline tokens | ADM | 2 | 1 | L | 1 |
| 67 | Verify `.sb-qr-download` label text (`--dash-t3`) on card — rendered at 10px, very small | ADM | 2 | 1 | L | 1 |
| 68 | Verify `.dc-title` (`--dash-text`, 13px/600) on card | ADM | 2 | 1 | L | 1 |
| 69 | Verify `.tb-btn-ghost` text (`--dash-t2`) on card border area — ghost button text colour | ADM | 3 | 1 | M | 1 |
| 70 | Verify `.chq-state-btn` text (`--dash-t3`) on card/border | ADM | 3 | 1 | M | 1 |
| 71 | Verify `--dash-border` (#cdc8c0) provides sufficient separation — UI indicator 3:1 against adjacent surfaces | ADM | 3 | 1 | M | 1 |
| 72 | Verify card borders (`--dash-border`) are visually distinct against `--dash-bg` floor in all viewing conditions | ADM | 3 | 1 | L | 1 |
| 73 | Verify the admin onboarding nudge strip background and text contrast | ADM | 3 | 1 | M | 1 |
| 74 | Verify primary CTA button text and background in admin — calculate across button states | ADM | 4 | 1 | M | 1 |
| 75 | Verify `--acc` (#c9a84c) used as interactive highlight on cream — which background does it sit on? | ADM | 3 | 1 | M | 1 |
| 76 | Verify admin colour swatch indicator borders are distinguishable on cream | ADM | 2 | 1 | L | 2 |
| 77 | Verify `.recs-pool-item__handle` (`--dash-t3`, 10px) on card — drag handle very small text | ADM | 2 | 1 | L | 1 |
| 78 | Verify analytics chart labels on cream — if canvas-rendered, check canvas fillStyle against background | ADM | 3 | 2 | M | 2 |
| 79 | Verify admin progress bar fill colour against empty bar background — non-text, WCAG 1.4.11 applies | ADM | 2 | 1 | L | 2 |
| 80 | Verify `.ai-dot.view` (#7ec88a decorative dot) — note if ever used with adjacent text label | ADM | 2 | 1 | L | 2 |
| 81 | Verify `.ai-dot.share` (#9b7cf4 decorative dot) — note if used with text label | ADM | 2 | 1 | L | 2 |
| 82 | Verify `.gig-strip.active` border (#f46442) as UI indicator on cream — decorative; confirm it's not required for meaning | ADM | 2 | 1 | L | 2 |
| 83 | Test admin at 50% screen brightness (simulates outdoor daylight use by artists on phones) | ADM | 4 | 3 | H | 3 |
| 84 | Test amber badge (#f4b942 on cream) under bright-light simulation — measure perceived contrast degradation | ADM | 4 | 3 | H | 3 |
| 85 | Test the entire admin palette at 375px (iPhone SE) in browser devtools with reduced brightness | ADM | 4 | 3 | H | 3 |
| 86 | Add `@media (prefers-contrast: more)` override block to admin CSS — increase borderline tokens | ADM | 3 | 3 | M | 3 |
| 87 | In `prefers-contrast: more`, raise `--dash-t3` to #444444 (minimum safe mid-grey on cream) | ADM | 3 | 2 | M | 3 |
| 88 | In `prefers-contrast: more`, raise `--dash-t2` to #404040 for additional safety margin | ADM | 3 | 2 | M | 3 |
| 89 | In `prefers-contrast: more`, replace amber focus ring with a high-contrast navy ring on cream | ADM | 4 | 2 | H | 3 |
| 90 | Add WCAG ratio comments to every `--dash-*` token declaration in admin CSS that has a ratio below 7:1 | ADM | 3 | 2 | L | 4 |
| 91 | Create a contrast audit table in docs documenting every admin text/bg pair with verified ratio and pass/fail | ALL | 4 | 3 | L | 4 |
| 92 | Document the admin cream palette in `docs/systems/DESIGN_SYSTEM_SPEC.md` with all verified ratios | ALL | 3 | 2 | L | 4 |
| 93 | Verify admin palette renders correctly in Chrome, Safari, and Firefox — colour spaces can differ slightly | ADM | 3 | 2 | M | 3 |
| 94 | Verify admin in iOS Safari specifically — artists use this most; check system font rendering on cream | ADM | 4 | 2 | M | 3 |
| 95 | Verify the admin pale divider lines (rgba black on cream) pass 1.4.11 for separating regions | ADM | 2 | 1 | L | 2 |
| 96 | Check `.chq-auto-hint` section entire block contrast — the hint area uses nested text with smaller tokens | ADM | 2 | 1 | L | 1 |
| 97 | Verify all admin tooltip text and background combinations | ADM | 3 | 2 | M | 2 |
| 98 | Write Playwright test that queries computed colour of every `.stat-label` and `.stat-delta` and verifies contrast | ADM | 4 | 3 | L | 5 |
| 99 | Write Playwright test that confirms `--dash-amber` is never the `color` property on a cream background element | ADM | 5 | 3 | L | 5 |
| 100 | Write Playwright test that loads admin at 375px and screenshots every card section for manual contrast review | ADM | 3 | 3 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–77 | All text/bg calculations, critical amber and green failures, badge fixes, focus ring, small text |
| 2 | 76, 78–82, 95, 97 | Decorative elements, canvas text, tooltips, divider lines |
| 3 | 83–89, 93–94 | Outdoor simulation, prefers-contrast overrides, Safari/Chrome verification |
| 4 | 90–92 | Token documentation, contrast audit table |
| 5 | 98–100 | Automated Playwright contrast checks |
