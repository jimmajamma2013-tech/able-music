# ABLE UI System — Honest Audit
**Date: 2026-03-16 | Scope: able-v7.html (artist profile) + admin.html (dashboard)**

This is a 20-angle audit of the ABLE UI system as it stands today. Scores are honest. A 6 is not a failure — it's an accurate reading that tells you where effort should go.

---

## Scoring Summary

| # | Angle | Score | Finding |
|---|---|---|---|
| 1 | Design token system completeness | 8/10 | Tokens are thorough on profile; admin uses a separate flat-token set with no cross-file consistency guarantee |
| 2 | Typography hierarchy | 8/10 | All four levels defined and named; admin body type is Plus Jakarta Sans with no formal type scale tokens |
| 3 | Colour system | 8/10 | Profile colour system is well-structured with warm cream text and 4 surface levels; admin has partial duplication of tokens with different names |
| 4 | Component consistency | 6/10 | Bottom sheet and button patterns are documented in COMPONENT-LIBRARY.md but the two surfaces diverge in naming, animation, and structure |
| 5 | Theme system | 8/10 | All 4 themes defined with correct values; glass theme correctly requires real artwork behind it; light theme --color-on-accent override is present |
| 6 | Motion system | 9/10 | 4 easings, 5 durations, per-vibe spring personality — this is genuinely sophisticated; only gap is no formal "what animation uses which duration" decision table |
| 7 | Icon system | 4/10 | No icon system defined; icons appear to be inline SVG or emoji with no size/weight/visual-language standard anywhere in the token files |
| 8 | Spacing system | 9/10 | 4px base, named tokens --sp-1 through --sp-16, consistently applied; minor gap is no --sp-7 or --sp-9 (14px/36px) which appear ad-hoc in places |
| 9 | Border radius | 8/10 | --r-sm/md/lg/xl computed via JS from r-mult is elegant; --r-pill correctly reserved for pills only; only concern is the feel quadrant --r-card token isn't wired to all card types |
| 10 | Shadow/elevation system | 5/10 | --shadow-card is defined per theme but there's no elevation ladder (shadow-1 through shadow-4); admin uses ad-hoc box-shadow values inline rather than tokens |
| 11 | Responsive design | 6/10 | Profile is mobile-first 375-430px with desktop shell — correct; admin has sidebar layout but no documented breakpoints for collapse; no systematic breakpoint token set |
| 12 | Mobile-first discipline | 8/10 | 44px --tap-min token defined, touch-action: manipulation on all interactive elements, 16px input font-size to prevent iOS zoom — the key rules are followed |
| 13 | Focus/keyboard states | 7/10 | admin.html has *:focus-visible correctly scoped to --acc; profile focus ring is defined in DESIGN-SPEC.md but needs verification it's wired to all interactive elements |
| 14 | Empty/error/loading states | 7/10 | Empty state component specified in COMPONENT-LIBRARY.md for owner mode; skeleton shimmer defined; error shake animation defined; fan-facing error states less detailed |
| 15 | Form design system | 6/10 | Fan capture input is well-specified (16px, autocomplete, inputmode); admin forms use ad-hoc styling with no formal input/label/validation token system |
| 16 | Dark mode quality | 8/10 | 4-level surface hierarchy (#0a0b10 → #0f1018 → #16161e → #1e1e2a), warm cream text (#f0ede8), warm white borders — this is true dark, not grey-on-grey |
| 17 | Glass theme quality | 7/10 | Correct backdrop-filter spec (blur(28px) saturate(180%)), fixed background artwork requirement documented, fallback to dark when no artwork — glass on iframes noted as a known limitation |
| 18 | Animation performance | 8/10 | V6_BUILD_AUTHORITY.md §7.1 explicitly bans animating box-shadow, width, height, filter, backdrop-filter in loops; opacity + transform only rule is documented |
| 19 | Artist accent system | 9/10 | applyDerivedTokens() sets all derived accent vars from a single hex; r-mult per vibe computed simultaneously; --color-on-accent auto-calculated from luminance — single CSS var rebrand works |
| 20 | Visual debt | 5/10 | admin.html tokens use different naming conventions (--bg, --acc, --card vs --color-bg, --color-accent, --color-card); no unified cross-file token layer; several admin values are hardcoded rather than tokenised |

---

## Total: **7.1 / 10**

This is a well-designed system with a clear philosophy and strong execution on the profile surface. The main gaps are: (1) no icon system at all, (2) cross-file token divergence between profile and admin, (3) missing elevation/shadow ladder, (4) admin form design is ad-hoc, and (5) visual debt from admin using flat differently-named tokens.

---

## Angle-by-Angle Detail

### 1. Design token system completeness — 8/10

The profile surface (able-v7.html) has a complete token hierarchy: static tokens in `:root`, theme overrides on `[data-theme]`, vibe overrides on `[data-vibe]`, feel quadrant deltas on `[data-feel]`, and JS-derived accent tokens via `applyDerivedTokens()`. This is a four-layer system and it's coherent.

Admin.html uses a separate flat `:root` block: `--bg`, `--acc`, `--card`, `--border`, `--text`, `--t2`, `--t3`. These are functionally equivalent to profile tokens but named differently and not connected. There is no shared token file or layer. When the artist accent appears in admin (e.g. in the QR code or profile preview), it would need to be manually synced.

**Gap:** No cross-file shared token layer. Admin tokens are functional but informal.

---

### 2. Typography hierarchy — 8/10

Profile defines all four levels:
- Display: `--font-d` (vibe-controlled), `--text-hero` clamp(48px, 14vw, 80px), section titles at clamp(32px, 9vw, 40px)
- Heading: 17–24px range (release titles, section actions, stat cards)
- Body: `--text-base` 15px, `--lh-body` 1.5
- Label: 11px (`--text-xs`), `--ls-label`, uppercase, weight 600–700

The DESIGN-SPEC.md typography table is exhaustive — every element is specified. This is excellent.

Admin gaps: Plus Jakarta Sans body font, but no formal `--text-*` scale tokens. Font sizes are hardcoded throughout admin CSS (font-size: 10px; font-size: 28px; etc.) rather than referencing shared scale tokens.

**Gap:** Admin type sizes are not tokenised. A future style refresh would require hunting hardcoded values.

---

### 3. Colour system — 8/10

Profile has:
- 4 backgrounds: `--color-bg`, `--color-surface`, `--color-card`, `--color-card-raised`
- 3 text levels: `--color-text`, `--color-text-2`, `--color-text-3`
- Border: single `--color-border` token per theme (warm white opacity on dark, black opacity on light)
- Accent: derived set (accent, accent-rgb, accent-glow, accent-soft, accent-subtle, on-accent)
- State colours: 4 campaign states, frozen and named
- Ambient: `--color-ambient` extracted from artwork

Admin has separate state colours (`--dash-green`, `--dash-red`) and source badge colours (`--source-ig`, `--source-sp`) — these are contextually correct but not connected to the profile system.

**Gap:** No semantic colour tokens (e.g. --color-success, --color-error) shared across files.

---

### 4. Component consistency — 6/10

COMPONENT-LIBRARY.md documents bottom sheet, toast, pill/tag, primary button, ghost button, section header, and empty state. The patterns are correct on the profile surface.

Where consistency breaks:
- Bottom sheet on admin uses different JS function names (`openAdminSheet` vs `openSheet`) and different HTML structure (no `role="dialog"`, no `aria-modal`, no `aria-labelledby` in the admin version)
- Toast is admin-only; profile uses a separate toast container with different animation
- Button patterns in admin use `.tb-btn`, `.tb-btn-ghost`, `.tb-btn-acc` — separate class names, separate styles, no shared component origin
- Stat cards in admin are not documented in COMPONENT-LIBRARY.md

**Gap:** Cross-surface component consistency requires active maintenance. The two surfaces effectively have independent component implementations.

---

### 5. Theme system — 8/10

All four themes (Dark, Light, Glass, Contrast) are specified with exact values in V6_BUILD_AUTHORITY.md §3.2 and implemented in able-v7.html. The spec explicitly resolves the "Mid theme" false positive from earlier docs. Glass theme law (real artwork required, fallback to dark) is documented and implementation-ready.

Minor issue: `--shadow-card` is missing from glass and contrast theme definitions (it appears only in dark and light). Glass cards may inherit the dark value inconsistently.

**Gap:** `--shadow-card` not defined for glass or contrast themes.

---

### 6. Motion system — 9/10

Four named easing curves, five duration tokens, per-vibe `--dur-mid` override with distinct spring character per genre — electronic snaps, acoustic lingers. The feel quadrant adds a second layer (--ease-primary). Reduced-motion law is thorough (V6_BUILD_AUTHORITY.md §5.1). The 17 Phase 1 interactions are itemised with exact parameters.

One missing piece: there is no formal table mapping "which animation uses which duration token." The spec describes each interaction individually but a developer implementing a new animation has to infer the right duration by analogy. A 3-line lookup table (instant: state flips, fast: press/hover, mid: reveal, slow: panel slide) would close this.

**Gap:** No duration-usage decision table; developers must infer by analogy.

---

### 7. Icon system — 4/10

There is no icon system defined anywhere in the documentation. Looking at admin.html, icons appear to be inline SVG with ad-hoc size values (width/height hardcoded per context: 16px, 18px, 20px, 24px). No icon size token. No weight/stroke-width standard. No named icon set. No visual language rule (filled vs outlined, sharp vs rounded).

This is the biggest missing system in the spec. A product of ABLE's visual quality needs a consistent icon system.

**Gap:** No icon specification at all — size tokens, stroke weight, visual language, named set.

---

### 8. Spacing system — 9/10

`--sp-1` through `--sp-16` on a 4px base grid: 4/8/12/16/20/24/32/40/48/64px. Named and consistent on the profile surface. `--tap-min: 44px` is a distinct named token separate from the spacing scale.

Small gaps: no `--sp-7` (28px) or `--sp-9` (36px) in the token set, which occasionally appear hardcoded. The scale jumps from 24px to 32px — a 28px value would close this gap cleanly.

**Gap:** Missing 28px step between --sp-6 and --sp-8; currently appears as a hardcoded value in some places.

---

### 9. Border radius — 8/10

`--r-sm/md/lg/xl` computed from `r-mult × base` via `applyDerivedTokens()` — elegant, vibe-responsive, JavaScript-set in px. `--r-pill: 999px` is explicitly reserved for pills only (Quick Action pills, state chips). Hero CTAs correctly use `--r-sm` not `--r-pill`.

The feel quadrant introduces `--r-card` which overrides card radius. This is correctly scoped to card elements but the wiring list in DESIGN-SPEC.md may not cover every card type added later.

**Gap:** --r-card from feel quadrant needs an explicit enumeration of every card class it applies to.

---

### 10. Shadow/elevation system — 5/10

Profile: `--shadow-card` defined in dark and light themes — a single named shadow token. Admin: `box-shadow` values are hardcoded inline (e.g. `0 3px 12px rgba(var(--acc-rgb),.3)` on buttons). No elevation ladder (shadow-1 through shadow-4 for different depth levels). No documented relationship between z-index and shadow depth.

The z-index table in DESIGN-SPEC.md §5.2 is excellent but has no shadow counterpart.

**Gap:** No shadow elevation system; single token covers cards but buttons/panels/modals use hardcoded values.

---

### 11. Responsive design — 6/10

Profile: mobile-first 375–430px, centered phone shell on desktop, documented and correct. But "desktop behaviour" is a shell, not a responsive layout — the profile page does not scale to use desktop real estate, it just centers a 430px max-width container.

Admin: sidebar layout with `--sidebar: 220px`, `--topbar: 56px`. Responsive collapse for mobile is not documented in any spec file. No breakpoint tokens. No defined behaviour at 768px tablet or 375px mobile for the admin dashboard. The grid (`grid-template-columns: repeat(4,1fr)` for stat cards) will break below ~600px with no fallback.

**Gap:** Admin has no documented responsive strategy; stat card grid breaks at narrow widths; no breakpoint tokens defined.

---

### 12. Mobile-first discipline — 8/10

Strong fundamentals: `--tap-min: 44px` token, `touch-action: manipulation` on all interactive elements, `16px` on fan capture input to prevent iOS zoom, `env(safe-area-inset-top/bottom)` for iOS notch/home bar, hidden scrollbar, `overscroll-behavior-y: contain`, scroll padding to prevent content hiding behind tab bar.

Two areas to verify in implementation: (1) Quick Action pills — small pills may fail 44px height if CSS isn't enforcing `--tap-min`; (2) credit accordion toggle — 13px text in a small row.

**Gap:** Implementation verification needed on pills and accordion rows for tap target compliance.

---

### 13. Focus/keyboard states — 7/10

Admin has `*:focus:not(:focus-visible) { outline: none }` + `*:focus-visible { outline: 2px solid var(--acc); outline-offset: 2px }` — correct WCAG 2.2 pattern, correct amber accent.

Profile: DESIGN-SPEC.md documents focus ring requirement (2px solid accent, 2px offset) but this is in the spec doc, not confirmed as implemented in every interactive element. V6_BUILD_AUTHORITY.md §5 marks WCAG 2.2 AA as a release gate, which is the right posture.

**Gap:** Focus states documented in spec but implementation completeness unverified; skip-to-main link referenced in DESIGN-SPEC.md as a P0 gap.

---

### 14. Empty/error/loading states — 7/10

Empty state: fully specified in COMPONENT-LIBRARY.md (5 CSS classes, exact copy style, owner-mode-only visibility). Correct pattern — fans never see empty sections.

Error state: error shake animation documented in V6_BUILD_AUTHORITY.md (translateX sequence, 400ms, border goes to --color-state-live). Fan capture input has this specified.

Loading/skeleton: shimmer animation (`animation: shimmer 1.5s ease-in-out infinite`) in admin with correct keyframes. Profile skeleton system referenced in V6 checkpoints.

Fan-facing error states (API failure, no events, no releases) are documented at the architecture level (degrade gracefully, never blank a section) but individual error copy/visual patterns are not fully specified per section.

**Gap:** Fan-facing per-section degraded states need individual copy + visual specs.

---

### 15. Form design system — 6/10

Fan capture: thoroughly specified — `type="email"`, `autocomplete="email"`, `inputmode="email"`, `autocapitalize="off"`, 16px font-size, 44px button height, focus glow with accent border and 3px soft shadow.

Admin forms: no shared form token system. Input styling is per-component, field heights and border styles are hardcoded. No `--input-height`, `--input-border`, `--input-focus-ring` tokens. Label placement and validation copy patterns are not documented.

**Gap:** Admin has no form design system; fields, labels, validation states, and placeholders are all ad-hoc.

---

### 16. Dark mode quality — 8/10

The profile dark theme is true dark without being pure black. Four distinct surface levels: `#0a0b10` / `#0f1018` / `#16161e` / `#1e1e2a` — each step is +6-8 lightness points, creating genuine depth without colour cast. Text is warm cream `#f0ede8`, not harsh white. Borders are warm white at very low opacity (0.065) — they read as structure without screaming. The admin dashboard uses `--dash-shell: #1a1a2e` (cool navy, slightly different from profile) for the sidebar.

The warm vs cool undertone difference between admin and profile is a minor tension — not a problem at current scale but could feel inconsistent when the two surfaces are shown side by side.

**Gap:** Admin sidebar background has a slightly cooler undertone than the profile dark bg; coherent by surface but perceptible if shown together.

---

### 17. Glass theme quality — 7/10

Glass theme spec is correct: `rgba(255,255,255,0.08)` cards, `rgba(255,255,255,0.14)` borders, `backdrop-filter: blur(28px) saturate(180%)`, `color-panel` overrides to solid dark `#1a1a24` for edit drawers. The fallback (no artwork → switch to dark) is documented and correct.

Noted limitation: `backdrop-filter` does not propagate into iframes. Spotify/YouTube embeds inside the glass theme will not inherit the glass effect — they need an explicit wrapper with `backdrop-filter` applied, or they render as opaque rectangles. This is documented in DESIGN-SPEC.md but it's a visual quality risk for artists using glass theme with embeds.

**Gap:** Iframe embed wrappers need explicit backdrop-filter application in glass theme; risk of opaque rectangles breaking the glass feel.

---

### 18. Animation performance — 8/10

The rule is clear and documented: only animate `opacity` and `transform`. Box-shadow, width, height, filter, backdrop-filter are forbidden in loops. For glows: animate `opacity` on a `::after` pseudo-element. `will-change: transform` is marked as use-sparingly. The 17 Phase 1 interactions all use transform/opacity only.

The live pulsing dot animation uses `scale` + `opacity` — correct. The panel slide uses `translateY` — correct.

Minor concern: admin CSS has `transition: all .16s` on several elements (e.g. `.sb-artist:hover`, `.sb-item`). `transition: all` is a performance anti-pattern — it catches layout properties unnecessarily.

**Gap:** admin.html uses `transition: all` in sidebar hover states — should be scoped to `transition: background-color, color, opacity`.

---

### 19. Artist accent system — 9/10

`applyDerivedTokens(accentHex)` sets: `--color-accent`, `--color-accent-rgb`, `--color-accent-glow`, `--color-accent-soft`, `--color-accent-subtle`. Luminance calculation sets `--color-on-accent` (black or white) automatically. The r-mult is applied simultaneously. A single `profile.accent` hex value propagates to buttons, section borders, focus rings, fan capture glow, state chips, section header accent rule, pills, and the hero ambient colour.

This is the right architecture. The `--color-accent-rgb` format (comma-separated triplet) enables `rgba()` composition throughout without CSS color-mix overhead.

Minor gap: `--color-state-gig` (`#8b1e1e`) is a fixed platform colour, not artist-accent-derived. This is intentional and correct — gig urgency should not change colour with accent. But worth documenting explicitly.

**Gap:** Note in spec that --color-state-gig is intentionally fixed (not accent-derived) to preserve urgency signal.

---

### 20. Visual debt — 5/10

Known technical debt:

1. **Token naming divergence:** profile uses `--color-*` namespace; admin uses `--bg`, `--acc`, `--card`, `--t2` etc. Future maintainers will need to know which set applies to which file.

2. **`transition: all` in admin sidebar:** catches layout properties. Replace with explicit property list.

3. **Hardcoded colours in admin:** `--dash-shell: #1a1a2e` and `#121a24` (avatar background) appear multiple times without being derived from a shared base token.

4. **Admin stat card font-sizes hardcoded:** `font-size:28px; font-size:10px; font-size:11px` — none reference `--text-*` tokens.

5. **Mixed border radius in admin:** `border-radius: 12px`, `border-radius: 14px`, `border-radius: 100px`, `border-radius: 20px` — none reference `--r-*` tokens.

6. **`--acc` in admin vs `--color-accent` in profile:** The admin accent is `#c9a84c` (a different gold from the admin spec value of `#f4b942`). Minor discrepancy — the actual rendered value differs from the CLAUDE.md spec.

**Gap:** Six distinct categories of technical debt; all manageable, none critical, but they'll compound as the codebase grows.

---

## Overall Assessment

ABLE's UI system has a strong conceptual foundation: the 4-layer token architecture on the profile, the per-vibe motion personality, the single-var accent rebrand, and the explicit reduced-motion law are all production-quality decisions. The profile surface is well-specified.

The debt is concentrated in admin.html (informal tokens, ad-hoc forms, no responsive spec) and the cross-cutting absence of an icon system. Fix those and the overall system score rises from 7.1 to 8.5+.
