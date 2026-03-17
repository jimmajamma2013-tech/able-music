# Dimension A2 — Two-Surface Separation
**Category:** Visual Design & Design System
**Phase:** 2 (Visual)
**Status:** In progress via Wave system

*Surface 1 covers able-v8.html (artist profile), landing.html, and start.html — all fan/artist-facing experiences using the `--color-*` token namespace and DM Sans / Barlow Condensed typography. Surface 2 is admin.html exclusively — it uses `--dash-*` tokens, Plus Jakarta Sans, and the fixed amber `--acc`. Token bleed between surfaces means the admin and the public-facing product look and feel the same, destroying the deliberate distinction between "your workspace" and "your public presence".*

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|
| 1 | Audit admin.html for any `--color-*` token references (V8 namespace) — grep confirms `--color-accent` and `--artist-accent` are used in admin for the live chip; these are intentional cross-surface reads but must be documented | ADM | 4 | 1 | L | 1 |
| 2 | Document the intentional cross-surface read: admin reads `--artist-accent` (a V8/profile value) to display the artist's colour on the live chip — this is correct and must never be "fixed" | ADM | 4 | 1 | L | 1 |
| 3 | Confirm `--artist-accent-rgb` is set by admin.html `renderProfile()` from `able_v3_profile.accent` — if it falls back to `--acc-rgb` (amber) the live chip shows amber not artist colour | ADM | 4 | 2 | M | 1 |
| 4 | Grep V8 (able-v8.html) for any `--dash-*` token references — should be zero; any found are surface bleed | V8 | 5 | 1 | L | 1 |
| 5 | Grep start.html for any `--dash-*` token references — should be zero | STR | 5 | 1 | L | 1 |
| 6 | Grep landing.html for any `--dash-*` token references — should be zero | LND | 5 | 1 | L | 1 |
| 7 | Grep admin.html for `--color-bg`, `--color-card`, `--color-surface`, `--color-text` references that should be `--dash-*` equivalents | ADM | 5 | 1 | L | 1 |
| 8 | Confirm admin.html does NOT load DM Sans (V8 body font) — it correctly uses Plus Jakarta Sans; verify `<link>` tags in `<head>` | ADM | 4 | 1 | L | 1 |
| 9 | Confirm V8 does NOT load Plus Jakarta Sans (admin body font) — it correctly uses DM Sans; verify `<link>` tags in `<head>` | V8 | 4 | 1 | L | 1 |
| 10 | Confirm start.html uses the same base font as landing.html (not admin's font) — start is Surface 1 | STR | 3 | 1 | L | 1 |
| 11 | Both admin.html and able-v8.html use `--font-d: 'Barlow Condensed'` — this shared token is correct (Barlow Condensed is cross-surface for display text); document this as intentional | ALL | 3 | 1 | L | 1 |
| 12 | Verify admin's `--font-d` token is not inherited by any element that should be using `--font` (Plus Jakarta Sans) — check `.stat-value` and headline elements | ADM | 3 | 1 | L | 2 |
| 13 | Admin sidebar uses `rgba(255,255,255,.08)` for dividers — this is a dark-shell pattern, correct for `--dash-shell` surface; ensure this is not replicated on the light `--dash-card` surface | ADM | 3 | 1 | L | 2 |
| 14 | Admin top bar and sidebar use `--dash-shell: #1a1a2e` (dark) while the content area uses `--dash-bg: #e4dfd7` (light cream) — verify that no admin content card uses the shell token | ADM | 4 | 1 | L | 2 |
| 15 | V8 dark theme `--color-card: #16161e` and admin `--dash-card: #f8f5f0` are different surfaces (dark vs light) — confirm no component class is shared between pages that would pull the wrong token | ALL | 4 | 2 | M | 2 |
| 16 | The `--r-sm/md/lg/xl` tokens are shared by name across both surfaces but have different values: V8 `--r-lg: 20px` vs admin `--r-lg: 12px` — document this deliberate difference (admin is tighter) | ALL | 4 | 1 | L | 1 |
| 17 | Check that V8's `applyDerivedTokens()` which mutates `--r-sm/md/lg/xl` on the shell element does NOT affect admin styles — admin defines its own `:root` radius values | V8 | 4 | 2 | M | 1 |
| 18 | Confirm duration tokens are consistent: V8 uses `--dur-fast: 150ms`, admin uses `--dur-fast: .14s` — these are the same value but in different units; standardise to `ms` | ALL | 3 | 1 | L | 2 |
| 19 | Confirm that `--dur` (admin, `.16s`) and `--dur-mid` (V8, `250ms`) are not the same semantic concept named differently — admin's `--dur` is V8's `--dur-fast`; resolve naming gap | ALL | 4 | 2 | M | 2 |
| 20 | V8 defines `--color-border: rgba(255,255,255,0.065)` (dark theme); admin defines `--dash-border: #cdc8c0` (light) — different colours appropriate to each surface, but both need to be the token used for all borders on their surface; verify no hardcoded border colour is used instead | ALL | 4 | 2 | L | 2 |
| 21 | Admin uses `var(--border)` in some legacy rules (e.g. inside skeleton shimmer keyframe using `rgba(138,180,206,.06)`) — this `--border` token belongs to landing/start namespace; replace with `--dash-border` | ADM | 4 | 2 | M | 1 |
| 22 | The skeleton shimmer in admin uses `rgba(138,180,206,...)` values — these are the blue-tinted Surface 1 border colours bleeding into Surface 2 admin | ADM | 4 | 1 | M | 1 |
| 23 | Admin defines `--card` and `--card-hv` tokens using `rgba(138,180,206,...)` — these are the landing/start card tokens that have leaked into admin's `:root`; remove or rename | ADM | 5 | 2 | M | 1 |
| 24 | Admin defines `--bm`, `--t2`, `--t3` tokens using `rgba(204,221,239,...)` values — these are the blue/slate Surface 1 text colours from landing; they should be `--dash-t2` equivalents | ADM | 5 | 2 | M | 1 |
| 25 | The `--card: rgba(138,180,206,.06)` token in admin `:root` is unused if `--dash-card` is the correct admin card token — confirm usage and remove if redundant | ADM | 3 | 1 | L | 2 |
| 26 | V8 uses `--color-panel` and `--color-panel-raised` tokens for Glass/Contrast theme panels — confirm these are never referenced in admin.html | ADM | 3 | 1 | L | 2 |
| 27 | Admin's focus ring is `0 0 0 2px var(--dash-bg), 0 0 0 4px var(--acc)` using amber — V8's focus ring uses `--color-accent-rgb`; both are correct for their surface; document that focus ring colours MUST NOT be swapped | ALL | 4 | 1 | L | 1 |
| 28 | Admin uses `--acc: #c9a84c` (slightly desaturated amber) while `--dash-amber: #f4b942` is a second amber shade; confirm which is the true accent and whether two ambers are intentional | ADM | 4 | 1 | L | 2 |
| 29 | `--acc-rgb: 201,168,76` on admin should correspond to `--acc: #c9a84c` — verify this hex-to-rgb conversion is correct (201,168,76 = #c9a84c ✓) | ADM | 3 | 1 | L | 2 |
| 30 | V8 glass theme sets `--color-bg: transparent` and `--color-surface: rgba(255,255,255,0.06)` — confirm admin has NO glass theme variant; if admin ever needed one it would use a separate `[data-theme="glass"]` block scoped to admin | ADM | 4 | 1 | L | 2 |
| 31 | Glass theme only exists on Surface 1 (V8); verify there is no `backdrop-filter: blur()` applied to any admin element | ADM | 3 | 1 | L | 2 |
| 32 | Contrast theme only exists on Surface 1 (V8); verify there is no `[data-theme="contrast"]` CSS block in admin | ADM | 3 | 1 | L | 2 |
| 33 | Confirm the 4-state campaign system (profile/pre-release/live/gig) colours are defined on Surface 1 only — `--color-state-pre`, `--color-state-live`, `--color-state-gig`, `--color-state-prof` belong to V8 | V8 | 3 | 1 | L | 2 |
| 34 | Admin uses its own campaign pill colours (`.chq-state-pill.pre`, `.live`, `.gig`) with hardcoded rgba values — these should be admin-scoped tokens like `--dash-state-pre` rather than inheriting from V8 | ADM | 3 | 2 | L | 3 |
| 35 | The `.able-toast` component in V8 uses `font-family: 'DM Sans', sans-serif` hardcoded — correct for Surface 1; confirm admin has its own toast using `var(--font)` (Plus Jakarta Sans) | ALL | 3 | 1 | L | 2 |
| 36 | Both surfaces use Barlow Condensed for `--font-d` — the `--font-d-weight: 700` token is shared; confirm this is intentional and both are loading the same Google Fonts URL | ALL | 3 | 1 | L | 2 |
| 37 | Admin sidebar artist avatar uses `linear-gradient(135deg, var(--acc), #e05242)` — the `#e05242` is the V8 default artist accent bleeding into admin; replace with `--dash-red` or a surface-2 token | ADM | 3 | 1 | L | 2 |
| 38 | The `data-theme` attribute system exists on V8 and start.html; admin has no `data-theme` — confirm admin is intentionally always in its light-cream mode with dark shell and this is not missing | ADM | 4 | 1 | L | 1 |
| 39 | V8's `[data-theme="light"]` block resets `--color-on-accent: #0d0e1a` (dark) because light backgrounds need dark accent text — admin's fixed amber always uses `#121a24`; confirm these are equivalent intent | ALL | 3 | 1 | L | 2 |
| 40 | Admin's `.mode-card` component uses `var(--dash-border)` correctly; `.field-input` uses `var(--dash-field)` and `var(--dash-border)` correctly — document these as the model for correct Surface 2 token usage | ADM | 3 | 1 | L | 1 |
| 41 | V8 edit bar (`.edit-bar`) when rendered for artist preview uses Surface 1 tokens; if admin ever injects edit-bar HTML it must use admin tokens — confirm edit bar is only in V8 | V8 | 3 | 1 | L | 2 |
| 42 | Landing.html and start.html share the same `--bg: #0f1624` token (blue-navy), which is different from V8's `--color-bg: #0a0b10` (midnight black) — this is intentional (different darkness level for landing) but must be documented | LND | 4 | 1 | L | 1 |
| 43 | Landing uses `--accent: #c9a84c` (same value as admin `--acc`) — this is the ABLE brand gold used on the marketing site; it must never appear on V8 profile pages as the artist accent | LND | 4 | 1 | L | 1 |
| 44 | Start.html uses `--acc: #8ab4ce` (blue-grey) for its accent — this is the onboarding accent, not the artist accent; confirm this token does not bleed into any localStorage-persisted value | STR | 4 | 1 | L | 1 |
| 45 | The `--font-editorial` token on landing (`'Barlow Condensed'`) shares the same font as V8's `--font-d` but is given a different token name — this is a surface separation gap; either align the names or document the distinction | LND | 3 | 1 | L | 2 |
| 46 | Landing uses `font-variation-settings: 'opsz' 56` on `.pricing-card__price` — this is a variable font axis not available on V8 or admin; confirm the font used on landing actually supports optical size axis | LND | 2 | 1 | M | 3 |
| 47 | Start.html `--ok: #34c759` and V8's `--color-success` (to be created) should use the same value; align to a shared success semantic | STR | 3 | 1 | L | 3 |
| 48 | Start.html `--warn: #f4b942` matches admin's `--dash-amber: #f4b942` — this is a cross-surface shared value; decide if `--warn` should be a shared utility token | ALL | 2 | 1 | L | 3 |
| 49 | Admin uses `--dash-link: #8c6200` for amber-on-light links — this is a Surface 2 token; confirm no link on V8 or landing uses this value | ADM | 3 | 1 | L | 2 |
| 50 | Confirm the `.release-card` component class is not shared between V8 and admin — both pages have release card concepts but they must be independently styled per surface | ALL | 4 | 2 | M | 2 |
| 51 | Confirm `.stat-card` component styling in admin does not conflict with any `.stat-*` class in V8 | ALL | 3 | 1 | L | 2 |
| 52 | Confirm `.snap-card` in V8 and `.snap-btn`/`.snap-item` in admin are independently styled and do not share class names that could cause style pollution if pages were ever concatenated | ALL | 3 | 1 | L | 3 |
| 53 | The `.dash-card` class in admin should never appear in V8 markup — grep confirms it does not | V8 | 4 | 1 | L | 1 |
| 54 | The `.hero` class in V8 should never appear in admin markup — grep confirms it does not | ADM | 4 | 1 | L | 1 |
| 55 | Both surfaces use `--r-pill: 100px` or `999px` for pill shapes — the values differ (admin `100px`, V8 `999px`) which is functionally identical but technically inconsistent; standardise to `999px` | ALL | 2 | 1 | L | 4 |
| 56 | Admin `--spring: cubic-bezier(0.34,1.56,0.64,1)` matches V8's spring easing — this is a shared motion token; confirm both surfaces reference the same definition and consider a shared `tokens.css` comment block | ALL | 2 | 1 | L | 4 |
| 57 | Confirm `--dur-slow: .22s` in admin and `--dur-slow: 400ms` in V8 are NOT the same semantic duration — admin `.22s` = 220ms, V8 `400ms` — these are different, which may cause animation timing differences on components that visually bridge surfaces | ALL | 4 | 1 | L | 2 |
| 58 | V8 has `--dur-mid: 250ms` while admin has no `--dur-mid`; admin uses `--dur: .16s` (160ms) as its standard duration — the naming gap means future shared components will use wrong timings | ALL | 3 | 1 | L | 2 |
| 59 | V8 has `--dur-xslow: 600ms` with no admin equivalent — confirm no V8 component has an 'xslow' animation that the admin dashboard attempts to mirror | V8 | 2 | 1 | L | 3 |
| 60 | Admin `--bg-mid: #141d2e` is a dark background token for the sidebar gradient area — confirm this is only used in dark-shell admin areas and not in the light `--dash-bg` content area | ADM | 3 | 1 | L | 2 |
| 61 | Admin defines `--dash-field: #e4dfd7` which matches `--dash-bg` — this intentional visual recessing of inputs is a Surface 2 UX pattern; document it and confirm it has no equivalent in V8 (V8 inputs use `--color-card` with a border) | ADM | 3 | 1 | L | 2 |
| 62 | Confirm the gold lock overlay component (`.lock-overlay`, `.tier-lock`) is only styled on admin — it should never appear on V8 profile pages seen by fans | ADM | 4 | 1 | L | 2 |
| 63 | Admin nudge cards use `--dash-card` and `--dash-border` correctly — confirm nudge card component is never rendered in V8 | ADM | 3 | 1 | L | 2 |
| 64 | V8 `--color-ambient` RGB triplet token powers the ambient glow behind the hero artwork — admin has no ambient glow; confirm `--color-ambient` is never referenced in admin CSS | ADM | 3 | 1 | L | 2 |
| 65 | V8 defines `--color-accent-glow: rgba(accent, 0.30)` while admin uses `rgba(var(--acc-rgb),.3)` inline — both express the same concept; create `--acc-glow` token in admin | ADM | 2 | 1 | L | 3 |
| 66 | V8 defines `--color-accent-soft: rgba(accent, 0.12)` while admin inline uses `rgba(var(--acc-rgb),.12)` inline many times — create `--acc-soft` token in admin | ADM | 3 | 2 | L | 3 |
| 67 | Landing uses `--accent-glow: rgba(201,168,76,0.13)` as a separate token — this is a Surface 1 (landing) accent glow; it should not appear in V8 which has its own artist-set accent glow | LND | 3 | 1 | L | 2 |
| 68 | Landing uses `--wisp-*` tokens (`--wisp-sage`, `--wisp-rose` etc.) for background atmosphere effects — confirm these are landing-only and do not appear in V8 or admin | LND | 2 | 1 | L | 3 |
| 69 | Landing uses `--state-live`, `--state-pre`, `--state-gig`, `--state-stream` tokens which mirror V8's `--color-state-*` tokens with different values — these are decorative "feature showcase" colours on landing, NOT the actual campaign state colours; document the difference | LND | 4 | 1 | L | 2 |
| 70 | Confirm landing's `--state-live: #7eaac8` (muted blue) is deliberately different from V8's `--color-state-live: #ef4444` (red) — landing uses softer visual language for feature showcase; this is correct | LND | 3 | 1 | L | 2 |
| 71 | The `--dp-bg`, `--dp-text`, `--dp-border`, `--dp-surface`, `--dp-text2` tokens on landing are scoped to the demo phone component — confirm these are not used outside the `.demo-phone` scope | LND | 3 | 1 | L | 2 |
| 72 | Confirm `.demo-phone` on landing never uses V8-specific tokens like `--color-card` — the phone mockup simulates V8 but should not actually reference V8 tokens | LND | 3 | 1 | L | 2 |
| 73 | Landing uses `font-family: var(--font-body)` which resolves to... what? Confirm `--font-body` is declared on landing and resolves to the correct Surface 1 font (DM Sans or the editorial font) | LND | 4 | 2 | M | 2 |
| 74 | Admin's `.field-label` class uses `letter-spacing: .16em` vs V8's `.stat-label` using `.12em` — both are eyebrow labels but with different spacing; confirm this is intentional (tighter labels in admin = more data density) | ALL | 2 | 1 | L | 3 |
| 75 | V8's `--color-text-2: rgba(240,237,232,0.60)` and admin's `--dash-t2: #555555` are expressing the same secondary text concept but in fundamentally different ways (alpha vs solid) — document this as a surface architecture difference | ALL | 3 | 1 | L | 2 |
| 76 | Admin's `--dash-t3: #595959` is a WCAG AA-compliant solid colour for light backgrounds; V8's `--color-text-3: rgba(218,213,207,0.45)` is alpha-based for dark backgrounds — both correct for their surface; document | ALL | 3 | 1 | L | 2 |
| 77 | Confirm admin never uses `data-theme` attribute-based CSS overrides (V8 mechanism) — admin's theme is fixed (dark shell + light content) and set via class, not data attribute | ADM | 4 | 1 | L | 2 |
| 78 | Confirm start.html uses the same `data-theme` attribute system as V8 (they share the same theme tokens by design since onboarding previews the artist profile experience) | STR | 4 | 2 | M | 2 |
| 79 | The `.live-chip` component appears in both admin (showing artist's live status) and V8 (same chip in readonly form) — confirm the CSS class is defined in BOTH files independently with appropriate tokens per surface | ALL | 4 | 2 | M | 2 |
| 80 | V8 `--color-card-raised: #1e1e2a` and admin `--dash-card: #f8f5f0` are both "elevated card" surfaces — confirm neither file references the other's token | ALL | 4 | 1 | L | 1 |
| 81 | Confirm landing's `--card: #192438` (blue-navy card) is never referenced in V8 or admin | V8 | 3 | 1 | L | 1 |
| 82 | Confirm admin's `--dash-shell: #1a1a2e` is never referenced in V8 | V8 | 3 | 1 | L | 1 |
| 83 | Confirm V8's `--color-overlay: rgba(10,11,16,0.82)` is never referenced in admin | ADM | 3 | 1 | L | 1 |
| 84 | V8 has `--color-surface: #0f1018` and admin has `--bg-mid: #141d2e` — both are "mid-tone surface" but different colours and different token names; document that surface naming is intentionally diverged | ALL | 3 | 1 | L | 2 |
| 85 | Confirm the `data-feel` attribute (intimate-raw, intimate-refined, bold-raw, bold-refined) is exclusively a V8/Surface 1 concept and has no admin equivalent | V8 | 3 | 1 | L | 2 |
| 86 | Confirm `applyIdentity()` function in V8 is never called from admin — identity refinements (darkness, spacing, sharpness, contrast) are profile-level settings only | V8 | 4 | 2 | M | 2 |
| 87 | Confirm `applyVibe()` function in V8 is never called from admin except to read the current vibe for display purposes — admin may set the vibe value but should not apply its visual effects to the admin shell | ADM | 4 | 2 | M | 2 |
| 88 | Admin displays the artist's profile in an iframe or preview panel — if this exists, confirm it loads able-v8.html (Surface 1 tokens) not admin's own CSS | ADM | 4 | 1 | L | 2 |
| 89 | Landing `.pricing-card__price` uses `--font-editorial` (Barlow Condensed on landing) — confirm this never bleeds to V8 where `--font-d` serves the same role | LND | 3 | 1 | L | 2 |
| 90 | Landing `.hero-number` uses `font-family: var(--font-d)` and `font-size: 120px` — this is a Surface 1 display number; confirm it uses the Surface 1 font-d token, not an admin font | LND | 3 | 1 | L | 2 |
| 91 | Write a comment block at the top of each file's `<style>` block explicitly declaring: "Surface 1 tokens — do not use --dash-* here" or "Surface 2 tokens — do not use --color-* here" | ALL | 4 | 2 | L | 3 |
| 92 | Add a developer lint note: any PR adding `--dash-` to a Surface 1 file or `--color-bg` / `--color-card` to admin should be rejected | ALL | 4 | 1 | L | 3 |
| 93 | Admin's `.mode-card.gig-mode` uses `rgba(244,100,66,.4)` — this gig-orange is also used in V8 campaign state; create `--dash-gig` token on admin side to avoid relying on implied colour matching | ADM | 3 | 1 | L | 2 |
| 94 | Confirm the artist-profile preview inside admin (if it exists) is served as a separate V8 page in an iframe, not re-rendered inline with admin's token set | ADM | 4 | 1 | L | 2 |
| 95 | V8's `.fan-capture` section and admin's fan list section both reference fan data — they are different visual treatments; confirm no CSS class is shared | ALL | 3 | 1 | L | 3 |
| 96 | Admin uses `--bg: #09090f` as its root dark background (for the shell area) while landing uses `--bg: #0f1624` — both use the same token name `--bg` but with different values; if they were ever merged into a shared file this would conflict; document this risk | ALL | 4 | 1 | L | 2 |
| 97 | Confirm the ABLE wordmark renders identically on both surfaces at its respective sizes — admin sidebar (22px Barlow) vs landing nav (20px Barlow) vs V8 footer | ALL | 3 | 1 | L | 3 |
| 98 | Create a "two-surface boundary" section in `docs/systems/DESIGN_SYSTEM_SPEC.md` that explicitly lists which tokens cross surfaces (shared border-radius names, shared Barlow font) and which must never cross | ALL | 4 | 2 | L | 3 |
| 99 | Confirm `--dash-link: #8c6200` is never used on any Surface 1 page — hyperlinks on V8/landing/start should use `--color-accent` not the admin amber link colour | ALL | 3 | 1 | L | 2 |
| 100 | Final audit: grep each file for the other surface's primary token prefix — zero `--dash-` in V8/LND/STR, zero `--color-bg/--color-card` in ADM (excluding documented intentional cross-surface reads of `--artist-accent`) | ALL | 5 | 2 | L | 6 |

## Wave Summary
**Wave 1 — Foundation** (boundary verification, unblocks all): items #1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11, #16, #17, #21, #22, #23, #24, #37, #38, #42, #43, #44, #45, #53, #54, #80, #81, #82, #83
**Wave 2 — Token bleed fixes**: items #12, #13, #14, #15, #18, #19, #20, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #39, #40, #41, #46, #49, #50, #51, #57, #58, #60, #62, #63, #64, #67, #69, #70, #71, #72, #73, #77, #78, #79, #84, #85, #86, #87, #88, #96, #99
**Wave 3 — Token creation for surface-scoped concepts**: items #25, #47, #48, #52, #55, #56, #59, #61, #65, #66, #74, #75, #76, #89, #90, #93, #95
**Wave 4 — Documentation and developer guardrails**: items #91, #92, #97, #98
**Wave 5 — Cross-surface timing and motion alignment**: items #19, #57, #58, #59
**Wave 6 — Final verification grep**: item #100
