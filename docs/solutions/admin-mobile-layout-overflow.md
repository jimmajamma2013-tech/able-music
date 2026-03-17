# Solution: admin.html mobile layout overflow
**Commit:** `7e09139` — `fix(admin): mobile layout — 2×2 stats grid, topbar, ghost btn contrast`
**Date:** 2026 (session series)
**Files affected:** `admin.html`

---

## Problem

On mobile viewports (375–430px), `admin.html` had three layout failures:
1. **Stats row**: Four stat cards overflowed horizontally — they were laid out in a single-row flex container that didn't wrap, so cards on the right were clipped off-screen.
2. **Topbar**: The topbar was rendering behind the sidebar on mobile — `z-index` stacking order was wrong for narrow viewports where the sidebar collapses to a bottom nav.
3. **Ghost button contrast**: Secondary "ghost" style buttons failed WCAG AA contrast requirements on the light theme — the ghost button's transparent background against `--dash-card` produced text that was below 4.5:1.

## Root cause

1. Stats grid: The stats container used `display: flex; gap: 12px` without `flex-wrap: wrap` or a `grid-template-columns` for narrow widths. On desktop (sidebar + main column), four cards fit. On 375px, they did not.
2. Topbar: `admin.html` uses a fixed sidebar on desktop that becomes a bottom nav on mobile via a media query. The topbar's `z-index: 100` was the same as the sidebar — causing stacking conflicts at the breakpoint.
3. Ghost buttons: The ghost button style used `color: var(--text)` which is `#ccddef` — correct on dark background, but admin's light theme uses `--dash-bg: #e4dfd7` as the page floor. `#ccddef` on `#e4dfd7` fails AA.

## Solution

1. **Stats grid**: Changed stats container to `display: grid; grid-template-columns: 1fr 1fr` — 2×2 grid on all widths. Desktop gets the same 2×2 (which looks correct given the sidebar takes 220px). No breakpoint gymnastics needed.

2. **Topbar**: Gave topbar `z-index: 110` (above sidebar's `z-index: 100`). At mobile breakpoint, the topbar collapses into the layout flow (not fixed) so the stacking issue disappears naturally.

3. **Ghost button contrast**: Added a light-theme override for ghost buttons: `[data-theme="light"] .btn-ghost { color: var(--dash-shell); }` — `--dash-shell: #1a1a2e` on `--dash-card: #f8f5f0` passes AA (contrast 13.7:1).

## Pattern

**Rule:** Always design admin components for `375px` first. The sidebar takes 220px on desktop — any component designed "desktop first" will assume 900px+ available width. The stats grid failure is the canonical example of this mistake.

**Rule:** On `admin.html`, ghost button text must have a light-theme override. The dark theme text colour (`--text: #ccddef`) is a light-on-dark colour — it fails on light backgrounds. Any new ghost button must check both themes.

**Rule:** When using fixed/sticky elements with `z-index`, ensure the stacking context is clear across breakpoints. Use a comment: `/* z-index: 110 — above sidebar (100) */`.

## How to check

- Load `admin.html` at `375px` viewport — no horizontal scroll, 2×2 stats grid visible
- Switch to light theme at `375px` — ghost buttons are readable
- `axe` contrast check on light theme ghost buttons — must pass AA
