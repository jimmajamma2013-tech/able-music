# Dimension C1 — WCAG AA Contrast Compliance
**Category:** Colour, Contrast & Themes
**Phase:** 6

Every text/background combination across all four pages and all four themes must meet WCAG AA: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold). The dark theme carries the most risk because multiple secondary text tokens are defined as rgba opacity values whose actual contrast ratio depends on the exact background they render against. The admin cream palette carries a separate risk: muted amber and grey tokens that sit close to the 4.5:1 boundary in daylight conditions.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Verify `--color-text` (#f0ede8) on `--color-bg` (#0a0b10) dark theme — expected ~15:1, confirm | able-v8.html | 2 | 1 | L | 1 |
| 2 | Calculate `--color-text-2` (rgba(240,237,232,0.60)) on `--color-card` (#16161e) — approx 5.2:1, needs measurement | able-v8.html | 4 | 1 | M | 1 |
| 3 | Calculate `--color-text-3` (rgba(218,213,207,0.45)) on `--color-card` (#16161e) — expected ~3.2:1, likely fails 4.5:1 for normal text | able-v8.html | 5 | 2 | H | 1 |
| 4 | Audit all uses of `--color-text-3` to confirm every instance is large text (≥18pt) or decorative only | able-v8.html | 4 | 2 | M | 1 |
| 5 | Verify `--color-text-2` in light theme (rgba(13,14,26,0.60)) on `--color-card` (#ffffff) — approx 5.8:1, confirm | able-v8.html | 3 | 1 | L | 1 |
| 6 | Verify `--color-text-3` in light theme (rgba(13,14,26,0.38)) on `--color-card` (#ffffff) — likely ~4.0:1, may fail | able-v8.html | 4 | 2 | H | 1 |
| 7 | Check `--color-text-2` in contrast theme (rgba(255,255,255,0.85)) on #000000 — approx 17:1, confirm no issue | able-v8.html | 2 | 1 | L | 1 |
| 8 | Verify `--color-text-3` in contrast theme (rgba(255,255,255,0.65)) on #000000 — approx 12:1, confirm | able-v8.html | 2 | 1 | L | 1 |
| 9 | Verify `--color-text-2` in glass theme (rgba(240,237,232,0.75)) on translucent card — no fixed background to calculate against | able-v8.html | 4 | 3 | H | 2 |
| 10 | Measure `--color-text-3` in glass theme (rgba(240,237,232,0.55)) — requires real backdrop measurement in browser | able-v8.html | 4 | 3 | H | 2 |
| 11 | Verify `--dash-text` (#1a1a2e) on `--dash-card` (#f8f5f0) admin — expected ~14:1 (good) | admin.html | 2 | 1 | L | 1 |
| 12 | Calculate `--dash-t2` (#555555) on `--dash-card` (#f8f5f0) — expected ~5.7:1, at AA threshold | admin.html | 4 | 1 | M | 1 |
| 13 | Verify `--dash-t3` (#595959) on `--dash-card` (#f8f5f0) — calculate exact: #595959 relative luminance is ~0.108, #f8f5f0 is ~0.957, ratio ≈ 8.3:1, passes | admin.html | 3 | 1 | L | 1 |
| 14 | Verify `--dash-t3` (#595959) on `--dash-bg` (#e4dfd7) floor — slightly lower contrast than on card, calculate | admin.html | 3 | 1 | M | 1 |
| 15 | Check `--dash-t3` on `--dash-field` (#e4dfd7) — same as floor colour, calculate | admin.html | 3 | 1 | M | 1 |
| 16 | Verify `--dash-link` (#8c6200) on `--dash-card` (#f8f5f0) — stated ≥4.5:1 in comment, independently verify | admin.html | 4 | 1 | L | 1 |
| 17 | Check `--dash-link` (#8c6200) on `--dash-bg` (#e4dfd7) floor — slightly lower than on card, may be close to 4.5:1 | admin.html | 4 | 1 | M | 1 |
| 18 | Verify `--dash-green` (#1e9650) on `--dash-card` (#f8f5f0) — calculate ratio, green at this value may be borderline | admin.html | 4 | 1 | M | 1 |
| 19 | Verify `--dash-red` (#c04030) on `--dash-card` (#f8f5f0) — calculate, strong red on cream | admin.html | 3 | 1 | L | 1 |
| 20 | Check `--dash-amber` (#f4b942) as text on `--dash-card` (#f8f5f0) — amber on cream almost certainly fails 4.5:1 | admin.html | 5 | 2 | H | 1 |
| 21 | Confirm #f4b942 is never used as text colour directly on cream in admin — flag any instance | admin.html | 5 | 1 | H | 1 |
| 22 | Verify admin stat values (#1a1a2e, 32px bold) on #f8f5f0 — large text threshold, 3:1 minimum | admin.html | 2 | 1 | L | 1 |
| 23 | Check `.stat-label` at 10px font-weight 700 on #f8f5f0 — 10px/700 is borderline large-text classification | admin.html | 4 | 2 | M | 1 |
| 24 | Verify stat-delta (#595959) at 11px on #f8f5f0 — 11px normal text must meet 4.5:1 | admin.html | 4 | 1 | M | 1 |
| 25 | Check `.field-label` (#595959) at 10px/700 on #e4dfd7 — small text on floor, may fail | admin.html | 4 | 1 | M | 1 |
| 26 | Verify `.field-hint` (#595959) at 11px on #f8f5f0 — same concern as stat-delta | admin.html | 3 | 1 | M | 1 |
| 27 | Audit `.chq-state-pill.profile` with color #6b4a00 on rgba amber background on cream — calculate | admin.html | 3 | 2 | M | 2 |
| 28 | Audit `.chq-state-pill.pre` with color #5c4e00 on rgba yellow background — calculate | admin.html | 3 | 2 | M | 2 |
| 29 | Audit `.chq-state-pill.live` with color #a01010 on rgba red background on cream — calculate | admin.html | 3 | 2 | M | 2 |
| 30 | Audit `.chq-state-pill.gig` with color #8c3200 on rgba orange background on cream — calculate | admin.html | 3 | 2 | M | 2 |
| 31 | Verify `.gig-label` (#b34000) on `.gig-strip` background — calculate ratio | admin.html | 3 | 1 | M | 2 |
| 32 | Check hero CTA button: `--color-on-accent` (#ffffff) on default accent (#e07b3a) — verify 3.2:1 (large text) passes | able-v8.html | 5 | 1 | M | 1 |
| 33 | Verify white (#ffffff) on default rock accent (#e05242) — expected ~3.8:1, borderline for large text only | able-v8.html | 5 | 1 | H | 1 |
| 34 | Check `--color-on-accent` (#ffffff) on indie accent (#7ec88a) — sage green with white text likely fails 3:1 | able-v8.html | 5 | 2 | H | 1 |
| 35 | Check on-accent for pop accent (#9b7cf4) with white text — purple at this value may be borderline | able-v8.html | 4 | 1 | M | 1 |
| 36 | Verify on-accent for hiphop accent (#f4b942) — gold with white text certainly fails; must use dark text | able-v8.html | 5 | 2 | H | 1 |
| 37 | Verify light theme on-accent override (#0d0e1a) on `--color-accent` — dark text on accent in light theme, needs calculation | able-v8.html | 4 | 1 | M | 1 |
| 38 | Confirm `applyDerivedTokens()` sets `--color-on-accent` based on luminance check, not static value | able-v8.html | 5 | 2 | H | 1 |
| 39 | Check ghost button text (`--color-text`) on `--color-card` in dark theme — should be passing | able-v8.html | 2 | 1 | L | 1 |
| 40 | Check ghost button border: rgba accent 0.45 opacity on dark card — decorative, but verify visual discernibility | able-v8.html | 2 | 1 | L | 2 |
| 41 | Verify platform pill text colour on dark card — platform pills use `--color-text-2` | able-v8.html | 3 | 1 | M | 1 |
| 42 | Verify platform pill text in light theme on white card — `--color-text-2` at 60% on white | able-v8.html | 3 | 1 | M | 1 |
| 43 | Check fan capture heading text on fan capture section background | able-v8.html | 5 | 1 | M | 1 |
| 44 | Verify fan capture input placeholder text — placeholder typically rendered at reduced opacity | able-v8.html | 4 | 1 | M | 1 |
| 45 | Check fan capture submit button: on-accent on accent — critical CTA | able-v8.html | 5 | 1 | H | 1 |
| 46 | Verify countdown number text on pre-release card background | able-v8.html | 4 | 1 | M | 1 |
| 47 | Check countdown label text at 10-11px on card background | able-v8.html | 3 | 1 | M | 1 |
| 48 | Verify bio text at `--color-text` on `--color-card` in all 4 themes | able-v8.html | 3 | 1 | L | 1 |
| 49 | Check `.bio-strip__more` button text in dark theme | able-v8.html | 3 | 1 | L | 1 |
| 50 | Check snap card title and body text across all 4 themes | able-v8.html | 3 | 1 | M | 1 |
| 51 | Check release card title text on `--color-card` in dark theme | able-v8.html | 3 | 1 | L | 1 |
| 52 | Check release card credit text at `--color-text-2` on `--color-card` | able-v8.html | 3 | 1 | M | 1 |
| 53 | Check merch card price text on card background | able-v8.html | 3 | 1 | L | 1 |
| 54 | Check events venue and date text on card background | able-v8.html | 3 | 1 | L | 1 |
| 55 | Check landing `.quiet-line` text — identify token and background, calculate ratio | landing.html | 4 | 1 | M | 1 |
| 56 | Check landing hero sub-headline text on `--bg-deep` | landing.html | 4 | 1 | M | 1 |
| 57 | Check landing proof strip numbers and labels on dark background | landing.html | 3 | 1 | M | 1 |
| 58 | Verify landing proof strip numbers if using accent gold (#c9a84c) on `--bg-deep` — calculate | landing.html | 4 | 1 | M | 1 |
| 59 | Check landing CTA button text on gold accent (#c9a84c) background — light gold may fail with dark text | landing.html | 5 | 1 | H | 1 |
| 60 | Check landing feature card description text at secondary colour on card | landing.html | 3 | 1 | M | 1 |
| 61 | Verify landing comparison table `.ft-no` colour — muted red/grey on card — calculate | landing.html | 3 | 1 | M | 1 |
| 62 | Check landing comparison table `.ft-yes` checkmark text — accent on card | landing.html | 3 | 1 | M | 1 |
| 63 | Check landing pricing card description text — secondary colour on card | landing.html | 3 | 1 | M | 1 |
| 64 | Verify landing nav link text on `--bg` | landing.html | 2 | 1 | L | 1 |
| 65 | Check landing footer text and links on dark background | landing.html | 2 | 1 | L | 1 |
| 66 | Verify start.html form labels on dark navy background | start.html | 3 | 1 | L | 1 |
| 67 | Check start.html hint text — secondary colour on dark background | start.html | 3 | 1 | M | 1 |
| 68 | Verify start.html step indicator text on dark background | start.html | 2 | 1 | L | 1 |
| 69 | Check start.html input text on field background | start.html | 3 | 1 | L | 1 |
| 70 | Verify start.html placeholder text — typically 60% opacity | start.html | 4 | 1 | M | 1 |
| 71 | Check start.html CTA button on-accent text in each step | start.html | 4 | 1 | M | 1 |
| 72 | Verify start.html vibe selector labels on dark card | start.html | 3 | 1 | L | 1 |
| 73 | Check disabled input text: admin field in disabled state — opacity applied to `--dash-t2` | admin.html | 3 | 1 | M | 2 |
| 74 | Check disabled button text in admin — verify opacity reduction doesn't drop below 3:1 | admin.html | 3 | 1 | M | 2 |
| 75 | Check disabled button text on able-v8.html — verify same | able-v8.html | 3 | 1 | M | 2 |
| 76 | Verify `.rel-status-current` (#34c759 on rgba(52,199,89,0.15)) — green text on light green bg on cream | admin.html | 3 | 2 | M | 2 |
| 77 | Verify `.rel-status-upcoming` (#f4b942 on rgba(244,185,66,0.15)) — amber text on amber tint on cream | admin.html | 4 | 2 | H | 2 |
| 78 | Check `.ci-btn-connected` (#7ec88a) on rgba(120,200,138,0.1) tint on card — green on light green | admin.html | 3 | 2 | M | 2 |
| 79 | Verify `.snap-btn.published` (#7ec88a) on cream card — sage green text on cream | admin.html | 3 | 1 | M | 2 |
| 80 | Check `.ai-dot.view` (#7ec88a) — decorative but check if used as a text colour anywhere | admin.html | 2 | 1 | L | 2 |
| 81 | Check `.ai-body` text (`--dash-t2`) at 12px on `--dash-card` — small text must meet 4.5:1 | admin.html | 4 | 1 | M | 1 |
| 82 | Verify `.ai-time` (`--dash-t3`) at 10px on `--dash-card` — 10px is very small, borderline | admin.html | 3 | 1 | M | 1 |
| 83 | Check `.sb-qr-download` at `--dash-t3` 10px — same concern | admin.html | 2 | 1 | L | 1 |
| 84 | Verify admin tab bar inactive text colour on `--dash-shell` (#1a1a2e) background | admin.html | 3 | 1 | M | 1 |
| 85 | Verify admin tab bar active text colour on `--dash-shell` | admin.html | 2 | 1 | L | 1 |
| 86 | Check `#f4b942` (amber) text on `--bg-mid` (#141d2e) in admin header area | admin.html | 3 | 1 | M | 1 |
| 87 | Check `--text` (#ccddef) on `--bg` (#09090f) in admin landing header area | admin.html | 2 | 1 | L | 1 |
| 88 | Verify hero text-shadow text is not relied upon for contrast — text must pass without shadow | able-v8.html | 4 | 1 | M | 2 |
| 89 | Check hero artist name at Barlow Condensed large size on artwork background — overlay gradient must provide sufficient bg luminance | able-v8.html | 5 | 2 | H | 2 |
| 90 | Verify play button overlay text (white on rgba(0,0,0,0.4)) on dark background — calculate | able-v8.html | 3 | 1 | L | 2 |
| 91 | Check support pack title and price text on card across all 4 themes | able-v8.html | 3 | 1 | M | 1 |
| 92 | Verify section heading text (`--color-text`) at h2 equivalent size across 4 themes | able-v8.html | 2 | 1 | L | 1 |
| 93 | Check bottom sheet heading text on sheet background in dark theme | able-v8.html | 3 | 1 | L | 1 |
| 94 | Check bottom sheet heading text in light theme | able-v8.html | 3 | 1 | L | 1 |
| 95 | Verify admin upgrade bar text (`--dash-t2` and `--dash-text`) on upgrade bar background | admin.html | 3 | 1 | L | 2 |
| 96 | Check `.page-next-moment` text (amber #f4b942) on `--dash-bg` (#e4dfd7) — amber on warm cream | admin.html | 4 | 1 | H | 1 |
| 97 | Confirm all links in privacy.html and terms.html meet contrast on their backgrounds | privacy.html / terms.html | 2 | 1 | L | 3 |
| 98 | Create a contrast audit spreadsheet documenting every verified pair with actual ratios and pass/fail | all | 3 | 3 | L | 4 |
| 99 | Add contrast ratio comments to every token declaration that is near the 4.5:1 boundary | all | 3 | 2 | L | 4 |
| 100 | Write automated contrast check in Playwright test suite using computed styles + WCAG formula | all | 4 | 4 | L | 5 |

## Wave Summary

| Wave | Points | Theme |
|---|---|---|
| 1 | 1–40, 55–72, 81–87 | Confirm passing combos, flag failures, critical text tokens |
| 2 | 41–54, 73–80, 88–91 | Interactive states, disabled states, compound backgrounds |
| 3 | 92–97 | Remaining pages and contexts |
| 4 | 98–99 | Documentation and token annotation |
| 5 | 100 | Automated regression test |
