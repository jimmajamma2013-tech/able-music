# ABLE UI System — Final Review
**Date: 2026-03-16 | Cross-reference: ANALYSIS.md (baseline) · PATH-TO-10.md (fixes)**

This is the same 20 angles as ANALYSIS.md, reassessed after the SPEC is written. Scores reflect current implementation plus anticipated improvements from P0 and P1 fixes. Score projections are honest.

---

## Score Table

| # | Angle | Current | After P0 | After P1 | Final ceiling |
|---|---|---|---|---|---|
| 1 | Design token system completeness | 8 | 8 | 9 | 9 |
| 2 | Typography hierarchy | 8 | 8 | 8.5 | 9 |
| 3 | Colour system | 8 | 9 | 9 | 9.5 |
| 4 | Component consistency | 6 | 7 | 7.5 | 8 |
| 5 | Theme system | 8 | 9 | 9 | 9.5 |
| 6 | Motion system | 9 | 9 | 9 | 9.5 |
| 7 | Icon system | 4 | 4 | 7 | 8 |
| 8 | Spacing system | 9 | 9 | 9.5 | 9.5 |
| 9 | Border radius | 8 | 8 | 9 | 9 |
| 10 | Shadow/elevation system | 5 | 5 | 8 | 8.5 |
| 11 | Responsive design | 6 | 7 | 7 | 8 |
| 12 | Mobile-first discipline | 8 | 8.5 | 9 | 9.5 |
| 13 | Focus/keyboard states | 7 | 8.5 | 9 | 9.5 |
| 14 | Empty/error/loading states | 7 | 7 | 7.5 | 8.5 |
| 15 | Form design system | 6 | 6 | 8 | 8.5 |
| 16 | Dark mode quality | 8 | 8 | 8.5 | 9 |
| 17 | Glass theme quality | 7 | 8 | 8 | 8.5 |
| 18 | Animation performance | 8 | 9 | 9 | 9.5 |
| 19 | Artist accent system | 9 | 9 | 9 | 9.5 |
| 20 | Visual debt | 5 | 6 | 7.5 | 8.5 |

**Current total: 7.1/10**
**After P0: 7.9/10**
**After P1: 8.6/10**
**Final ceiling (after P2): 9.1/10**

A 9.1 is a genuinely excellent UI system for a single-developer, no-bundler product. The remaining gap to 10 is the kind of cross-file consistency that would require a proper design token infrastructure (shared CSS, or a design system tool) — not achievable cleanly without a build pipeline.

---

## Angle Reassessment

### 1. Design token system completeness

**Current: 8/10 | After P1: 9/10**

The profile token architecture is mature: four-layer (static → theme → vibe → feel quadrant), JS-derived accent tokens, full spacing/typography/easing/duration sets. Writing the SPEC has clarified what admin needs to align to.

After P1-2 and P1-3 (tokenising admin font-sizes and border-radii), admin will have a genuine token system instead of hardcoded values. The gap from 9 to 10 is the absence of a shared token file between the two surfaces — achievable via P2-2 (`shared/tokens.css`) but not before launch.

**What 10/10 requires:** Shared token foundation in a single source file, both surfaces importing it. Not a launch blocker.

---

### 2. Typography hierarchy

**Current: 8/10 | After P1: 8.5/10**

Profile is strong: display / heading / body / label all defined with exact values in DESIGN-SPEC.md. Every element in able-v7.html is specified. The vibe system correctly routes display font through CSS custom properties.

Admin typography gains from P1-2 (token scale). The remaining gap: admin has no formal body type scale applied via tokens — font-sizes are still semantic ("stat card number" rather than "text-xl").

**What 9/10 requires:** Admin text scale tokens applied consistently. 10/10 would require a unified type scale across both surfaces, which needs the shared token foundation.

---

### 3. Colour system

**Current: 8/10 | After P0: 9/10**

The P0-1 fix (adding `--shadow-card` to glass and contrast themes) closes the main gap. After that, both dark themes have complete token sets. The warm cream text, 4-level surface hierarchy, and accent derivation system are genuinely well-designed.

The remaining gap to 9.5: no semantic colour tokens (`--color-success`, `--color-error`, `--color-warning`) shared across files. Currently error states use `--color-state-live` (red), success states use hardcoded greens. A semantic layer would make error/success states more intentional.

**What 9.5/10 requires:** Add `--color-error`, `--color-success`, `--color-info` semantic tokens, derived from the state colour palette but named for their semantic purpose.

---

### 4. Component consistency

**Current: 6/10 | After P1: 7.5/10**

COMPONENT-LIBRARY.md documents the components but the two surfaces still have independent implementations. P0-5 closes the admin bottom sheet ARIA gap. P1-6 adds admin form tokens. But button class naming (`btn-primary` on profile vs `tb-btn-acc` on admin), animation parameters, and focus ring implementations will remain different.

This is the correct architecture decision for now — the two surfaces have genuinely different design languages. The score reflects the tradeoff honestly.

**What 8/10 requires:** Explicit "component parity table" documenting where the two surfaces deliberately differ vs where they should match. Right now the divergence is partially accidental.

---

### 5. Theme system

**Current: 8/10 | After P0: 9/10**

P0-1 (shadow tokens for glass/contrast) is the main fix. After that, all 4 themes are complete and coherent. The glass fallback logic (no artwork → dark) is correct. The `--color-panel` solid dark override for edit drawers within glass theme is a smart detail that prevents unreadable editing on glass.

The specification work done in SPEC.md §7 formalises what each theme must define — this alone raises the score by eliminating ambiguity about what a new theme implementation would need.

**What 9.5/10 requires:** Add a CSS test file that renders all 4 themes × 7 vibes in a grid (the "112 combinations" test from V6 Checkpoint 7). Having a visual regression test harness would make theme quality a verifiable gate rather than a manual check.

---

### 6. Motion system

**Current: 9/10 | Final ceiling: 9.5/10**

The motion system is genuinely sophisticated. Per-vibe spring personalities are the kind of detail that separates a real product from a template. The 17 Phase 1 interactions are precisely specified. The reduced-motion implementation is thorough.

The SPEC.md §6 duration usage table (added in this documentation cycle) closes the main gap — developers now have a lookup for which duration token to use for a new animation, rather than inferring by analogy.

**What 9.5/10 requires:** A code-level motion test: a page that plays all 17 Phase 1 interactions on a loop, showing the vibe spring personality side-by-side. Visual confirmation that the motion personality difference between electronic (mechanical) and acoustic (organic) reads correctly.

**What would prevent 10/10:** The feel quadrant `--ease-primary` and vibe `--ease-spring` can conflict on compound interactions. There's no documented resolution priority. The spec implies "feel quadrant overrides vibe" but this isn't written anywhere explicitly.

---

### 7. Icon system

**Current: 4/10 | After P1: 7/10**

This is the largest gap in the system. P1-4 defines the standard: size tokens (`--icon-xs` through `--icon-xl`), stroke weight rules, visual language rules (rounded linecap on profile, stroke-only throughout), and a recommended source (Lucide).

The jump from 4 to 7 happens when those standards are documented. The jump from 7 to 8 requires a full audit of existing inline SVGs in both files — measuring each against the new standard, replacing non-conforming ones. That's a 2-hour task, not a complex design problem.

**What 8/10 requires:** Complete audit and replacement of all existing icons in both files. One consistent icon family, one consistent stroke weight per size.

**What 9/10 requires:** Icon documentation in COMPONENT-LIBRARY.md — a catalogue of every icon used, which size token it uses, and what the SVG source is.

---

### 8. Spacing system

**Current: 9/10 | After P1: 9.5/10**

The spacing system is good. P1-1 (`--sp-7: 28px`) fills the only real gap. After that, the token set covers every common use case without leaving gaps that invite hardcoded values.

**What 10/10 would require:** Systematic replacement of all hardcoded pixel values with token references — a code search pass that's boring but thorough. `grep -r "px" *.html` and review every result. Most are tokens already; some are not.

---

### 9. Border radius

**Current: 8/10 | After P1: 9/10**

The JS-computed radius system (`r-mult × base` per vibe) is elegant and correct. The `--r-pill` restriction (pills only, never CTAs) is the right design decision and it's documented.

P1-7 (explicit enumeration of all card types using `--r-card`) closes the feel quadrant wiring gap.

**What 9.5/10 requires:** The admin radius tokens (P1-3: `--adm-r-sm/md/lg/pill`) applied consistently throughout admin. Currently admin has `border-radius: 12px` and `border-radius: 14px` in adjacent components — one token value applied consistently would eliminate this.

---

### 10. Shadow/elevation system

**Current: 5/10 | After P1: 8/10**

The biggest jump in the system. P0-1 adds shadow tokens to glass and contrast themes. P1-5 adds `--shadow-elevated` and `--shadow-floating` to all 4 themes, plus `--shadow-glow-acc` for the primary CTA.

With these additions, the shadow system goes from "single token for cards, everything else hardcoded" to "three-level elevation ladder (card → elevated → floating) for each theme." That's an 8/10 system.

**What 9/10 requires:** Replace all hardcoded box-shadow values in both files with the new tokens. Document in SPEC.md which elements use which elevation level (cards = `--shadow-card`, panels/modals = `--shadow-elevated`, sheets/dropdowns = `--shadow-floating`).

---

### 11. Responsive design

**Current: 6/10 | After P0: 7/10**

P0-3 (admin stat card grid breakpoints) is the most critical fix — it prevents layout breakage on tablets and phones. The profile page's "phone shell" model is intentional and correct for its use case.

The score reaches 7 after P0 and stays there through P1 because the underlying architecture of admin.html (full-width desktop layout) hasn't changed. P2-3 (sidebar responsive collapse) would move it to 8/10 — the admin is genuinely usable on mobile only with that change.

**What 8/10 requires:** P2-3 (sidebar collapse) + documented breakpoint strategy for admin. The profile page is correctly scoped to 375–430px and doesn't need breakpoint work.

---

### 12. Mobile-first discipline

**Current: 8/10 | After P0: 8.5/10**

P0-4 (skip-to-main link) is a keyboard/mobile accessibility fix that benefits all users but especially mobile keyboard users (external keyboards on iPads, etc.).

P2-6 (Quick Action pill tap target audit) would move this to 9/10. The 44px tap target rule is the most commonly violated mobile-first principle — pills are a known risk area.

**What 9/10 requires:** Verified 44px tap targets on pills, accordion toggles, and all close buttons. A Playwright test that measures the bounding box of every interactive element and asserts `>= 44px`.

---

### 13. Focus/keyboard states

**Current: 7/10 | After P0: 8.5/10**

P0-4 (skip-to-main) and P0-5 (admin sheet ARIA) are the main P0 fixes. Together they close the most critical keyboard navigation gaps.

After P0, both surfaces have correct `*:focus-visible` rules, appropriate ARIA on dialogs, and skip navigation. The score reaches 8.5.

**What 9/10 requires:** Full keyboard navigation test of the artist profile — every interactive element reachable by Tab, every modal/sheet openable and closeable by keyboard, all ARIA live regions verified with a screen reader. This is a test task, not a build task.

**What 9.5/10 requires:** The same test run on admin.html. Admin has more interactive surface area (forms, data tables, bottom sheets) and is more likely to have keyboard traps in the sheet body.

---

### 14. Empty/error/loading states

**Current: 7/10 | After P1: 7.5/10**

The owner-mode empty state pattern is solid. Skeleton shimmer is defined. Error shake is specified. The gap is fan-facing section degradation — P2-4 documents what each section does when empty or when an API fails.

This stays at 7.5 after P1 because documenting the states in PATH-TO-10.md doesn't implement them. The implementation requires building the per-section degradation logic.

**What 8.5/10 requires:** Every section in able-v7.html has its API-failure degradation logic implemented and tested — cached data shown, fallback to hide-section if no cache, never a blank section shell.

---

### 15. Form design system

**Current: 6/10 | After P1: 8/10**

P1-6 adds a complete admin form token system: `.adm-label`, `.adm-input`, `.adm-textarea`, `.adm-select`, `.adm-helper`, `.adm-error-msg`. This is the single highest-leverage P1 fix for admin.

The fan capture form on the profile is already well-specified — the work is admin-side.

**What 8.5/10 requires:** P1-6 CSS implemented and applied to every existing form in admin.html (show add form, snap card form, profile settings form). Validation copy standardised. No mismatched label styles.

---

### 16. Dark mode quality

**Current: 8/10 | After P1: 8.5/10**

The profile dark theme is genuinely well-done — 4 surface levels, warm cream text, warm white borders at very low opacity. This is "true dark" not "grey soup."

The admin/profile temperature tension (admin sidebar: `#1a1a2e` slightly cool navy vs profile bg: `#0a0b10` warm graphite) is a deliberate design choice but it introduces a slight visual inconsistency when both surfaces are visible simultaneously (e.g. on a split desktop setup). Not a problem for v1 launch.

**What 9/10 requires:** Align admin sidebar background temperature with profile dark background, or explicitly document the intentional difference. One or the other — the tension should be resolved, not ignored.

---

### 17. Glass theme quality

**Current: 7/10 | After P0: 8/10**

P0-6 (iframe wrapper backdrop-filter) is the main fix. Without it, Spotify and YouTube embeds in the glass theme render as flat opaque panels that completely break the visual effect.

After P0-6, the glass theme should render correctly for the common case (artwork set, iframes wrapped, backdrop-filter applied). The fallback to dark when no artwork is already implemented.

**What 8.5/10 requires:** Test glass theme on a real profile with: (1) Spotify embed, (2) YouTube embed, (3) Snap cards section — verify all three render with the blur effect rather than opaque fallback.

---

### 18. Animation performance

**Current: 8/10 | After P0: 9/10**

P0-2 (replacing `transition: all` in admin sidebar) is the primary fix. After that, both surfaces follow the opacity/transform-only rule consistently.

**What 9.5/10 requires:** A Playwright performance test that runs the 17 Phase 1 interactions and asserts no paint layer counts increase beyond baseline. This is "profiling, not guessing" — the best way to guarantee 60fps on mid-range Android.

---

### 19. Artist accent system

**Current: 9/10 | Final ceiling: 9.5/10**

This is the strongest system in the product. The single-hex-to-full-system derivation via `applyDerivedTokens()` is clean, the luminance-based `--color-on-accent` auto-calculation is correct, and the `r-mult` simultaneous radius update is elegant.

P2-5 (documenting `--color-state-gig` as intentionally non-accent-derived) closes the only documentation gap.

**What 9.5/10 requires:** A visual regression test that verifies the accent system works for edge cases: near-white accent (should set `--color-on-accent: #000000`), near-black accent (should work), highly saturated accent (should not cause contrast failure in text-on-accent scenarios).

**What would prevent 10/10:** The accent colour picker in `start.html` has no WCAG contrast check. An artist could pick an accent colour that fails contrast with `--color-on-accent` text inside CTAs (e.g. mid-grey accent where neither black nor white text passes 4.5:1 ratio). A luminance-aware contrast checker on accent colour selection would close this.

---

### 20. Visual debt

**Current: 5/10 | After P1: 7.5/10**

Six debt categories were identified in ANALYSIS.md. P0 and P1 work addresses four of them:
- P0-2: `transition: all` → explicit properties (Performance debt)
- P1-2: Admin font-size tokens (Hardcoded values debt)
- P1-3: Admin border-radius tokens (Mixed radii debt)
- P1-6: Admin form token system (Ad-hoc forms debt)

The two remaining after P1:
- Token naming divergence (`--color-*` vs `--bg`/`--acc`) — won't fully close until P2-2 (shared token file)
- `--acc` in admin (#c9a84c) vs CLAUDE.md spec value (#f4b942) — a minor colour discrepancy. Fix: align `--acc` to match `--dash-amber` for sidebar active states, or document the intentional difference.

**What 8.5/10 requires:** P2-2 (shared token foundation) + complete `--acc`/`--dash-amber` alignment audit in admin.

---

## Summary Assessment

### What the system gets right

1. **The artist accent architecture** is production-quality. One hex value, full system rebrand, luminance-aware text colour. This is the right way to do per-artist theming.

2. **Per-vibe motion personality** is the kind of detail that separates a real music product from a generic template. Electronic snaps; acoustic lingers. It's implemented correctly.

3. **The profile dark theme** is genuine quality dark — not blue-grey soup. Warm cream text, four distinct surface levels, warm white borders. Music-platform-appropriate.

4. **The token layer architecture** (static → theme → vibe → feel quadrant) is well-designed for a product that needs deep customisation without losing coherence.

5. **The reduced-motion implementation** is thorough. It distinguishes between "stop entirely" and "keep but instant" — not just a blanket duration override.

### What needs the most work

1. **No icon system.** This is the biggest gap. Fix via P1-4.

2. **Admin is an informal implementation** compared to the profile surface. The token system, component patterns, and responsive behaviour are all underdeveloped. P1-2, P1-3, P1-6, P0-3, P0-5 together move admin to a defensible state.

3. **Cross-file token divergence** will compound as the product grows. Plan P2-2 (shared token file) early so the refactor doesn't become expensive.

### Pre-launch minimum (P0 complete)

Score: **7.9/10**

The product is launchable with P0 fixes applied. Users will not encounter broken layouts, accessibility failures, or visual glitches in the critical paths.

### Recommended for public beta (P0 + P1 complete)

Score: **8.6/10**

With P1 complete, ABLE has a genuine UI system — not just a well-styled product. Admin has tokens, components have specs, the icon system has standards. This is the level where the system starts to enforce consistency on new code rather than requiring discipline from individual developers.
