# ABLE v3 — Design Research Upgrades
**Date:** 2026-03-10
**Status:** Brainstorm — ready for planning
**Context:** 80 design references researched (20 music companies, 20 UX designers, 20 UI designers, 20 design styles). This document maps findings against the v3 spec to identify specific upgrades.

---

## What We're Building

A set of targeted upgrades to the v3 spec — not a redesign, not new features. The v3 foundation is strong. The research identifies 6 specific places where the current spec falls short of what the industry's best practitioners are doing, and each has a concrete fix.

---

## Current v3 Strengths (Already Research-Aligned)

- ✅ Dark base (#0d0e1a) — aligned with 15/20 music companies defaulting dark
- ✅ One accent variable — aligned with Spotify, Beatport, Ableton (single signature color)
- ✅ Album art as hero — aligned with Spotify, Apple Music, Beatport approach
- ✅ Glass theme with backdrop-filter — glassmorphism is now a settled standard
- ✅ Bento grid for merch — aligned with Apple WWDC23 pattern
- ✅ iOS shell pattern — spatial/AI-native direction, premium signal
- ✅ CTA architecture (3 zones, dedupe rule) — genuine differentiator

---

## 6 Research-Backed Upgrades

### Upgrade 1: Display Typeface Pairing
**Current:** Plus Jakarta Sans 800 weight for artist name
**Gap:** Every premium music brand uses a more distinctive typeface for display moments. Research shows letterforms carry emotional weight before content is read (Jessica Hische). Plus Jakarta Sans reads as "warm SaaS product," not "premium artist profile."
**Fix:** Add one editorial serif (e.g. Cormorant Garamond, or Playfair Display) as `--font-display` used exclusively for the artist name H1. Keep Plus Jakarta Sans for all body/UI text. One Google Fonts import, zero build complexity.
**Impact:** The artist name goes from "app label" to "magazine cover moment." Single biggest visual quality uplift.
**Precedent:** Tidal, Net-A-Porter, A24 Films all use serif display + sans body pairing.

---

### Upgrade 2: Spring-Feel Motion (No Library Required)
**Current:** Spec uses `ease`, `ease-out`, and linear curves. CTA tap: `scale(0.97) 100ms`. Tab switch: `translateX 200ms ease`.
**Gap:** Emil Kowalski, Rauno Freiberg, Andy Chung (Arc Browser) all use spring physics as default. Easing that feels physical is the 2026 baseline expectation for premium mobile UI. Current CSS ease curves feel "computational."
**Fix:** Replace all timing functions with spring-approximating cubic-beziers:
- Bounce-in (buttons, pills): `cubic-bezier(0.34, 1.56, 0.64, 1)` — slight overshoot, snaps back
- Smooth deceleration (panels, cards): `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — feels weighted
- Hover reveals: `cubic-bezier(0.16, 1, 0.3, 1)` — fast out, slow settle
**Impact:** Zero new dependencies. Every interaction starts feeling physical and premium.
**Precedent:** Framer Motion's spring defaults, Arc Browser's sidebar animations, Emil Kowalski's emilkowal.ski portfolio.

---

### Upgrade 3: Stronger Glass Values
**Current:** `backdrop-filter: blur(20px)` — this is the minimum readable value.
**Gap:** Research minimum for readability on photographic backgrounds is 24px. Premium implementations (Apple Vision Pro, Meng To's design system, Rauno Freiberg at Vercel) use 28–40px blur + explicit saturation boost.
**Fix:** Upgrade glass theme to:
- `backdrop-filter: blur(28px) saturate(180%)`
- Add subtle accent tint to glass surface: `background: rgba(var(--color-accent-rgb), 0.06)` (not just neutral white)
- Strengthen glass border: `border: 1px solid rgba(255,255,255,0.2)` (up from 0.08)
- Glass card box-shadow: `0 8px 32px rgba(0,0,0,0.3)` for depth
**Impact:** Glass mode goes from "barely there" to genuinely frosted. The artist's photo bleeds through correctly on mobile.
**Precedent:** Apple macOS Big Sur, Apple Music web player, Meng To's Design+Code glassmorphism patterns.

---

### Upgrade 4: Hero Typography Scale
**Current:** Artist name: 22px / 800 weight / -0.6px tracking
**Gap:** 22px is modest for the most important element on the page. The research shows premium music profiles (Tidal, Net-A-Porter) and typographic specialists (Paula Scher, Tobias van Schneider's Spotify work) use dramatically larger display type. This is the magazine cover moment.
**Fix:**
- Artist name: 28–32px on mobile (currently 22px) — a full 30–45% larger
- Tracking: -0.02em (relative, not fixed px — scales better)
- If adding display serif: 36px at regular weight reads as large as 28px at 800 weight
- Maintain the `--text-hero` token — just change the value
**Impact:** The hero feels like an artist's page, not an app's profile screen.
**Precedent:** Every major music platform makes the artist name/album title the visual anchor. Spotify's artist pages push display type to the extreme.

---

### Upgrade 5: Ambient Glow System
**Current:** `--color-accent-glow: rgba(59,130,246,0.35)` exists but is only used on the primary CTA.
**Gap:** The research shows premium music UI uses the artist's accent color as ambient lighting — it bleeds into backgrounds, card edges, and section headers (Beatport's neon green bleeds into everything; SoundCloud's orange is in every interactive element). The v3 accent propagates to fewer places than it should.
**Fix:** Ensure the accent propagates to all of these:
- Primary CTA: `box-shadow: 0 8px 24px var(--color-accent-glow)` ✅ (exists)
- Hero gradient placeholder: `radial-gradient(accent, transparent)` ✅ (partially exists)
- Section header dots: accent color ✅ (spec mentions blue dot)
- Quick action pill borders on hover: 1px solid `rgba(accent, 0.4)`
- Date blocks: `rgba(accent, 0.12)` background ✅ (in spec)
- Play button: accent border ✅ (in spec)
- Scroll track tint (subtle): accent at 0.04 opacity
- Tab active indicator dot: accent ✅ (exists)
- Add: `--color-accent-subtle-bg: rgba(var(--color-accent-rgb), 0.06)` for hover states on cards
**Impact:** The page starts to feel like it's lit from the artist's color — the key difference between "themed" and "owned."

---

### Upgrade 6: Dynamic Artwork Ambient Color (Optional but High-Value)
**Current:** Accent color is a static CSS variable set by admin. The hero gradient placeholder uses the accent.
**Gap:** Apple Music's most praised feature is that the background ambient color changes with whatever album art is playing. Jason Yuan coined this in his Mercury OS concept — the "ambient color bloom" technique. This makes each artist's page feel alive and unique.
**Fix:** Add a small JS function (~15 lines) that:
1. Loads the hero artwork into a canvas
2. Samples the dominant color (e.g. 10x10 pixel sample from center)
3. Sets `--color-ambient-r`, `--color-ambient-g`, `--color-ambient-b` CSS vars
4. Background gradients use these vars instead of (or in addition to) the static accent
This only triggers when the artwork image loads — pure progressive enhancement.
**Impact:** The page responds to the artist's visual identity automatically, not just their chosen accent hex. High emotional impact, low implementation complexity (~15 lines JS).
**Precedent:** Apple Music, Jason Yuan (Mercury OS), Material You (wallpaper-derived palettes).

---

## What We Are NOT Changing

- Not replacing Plus Jakarta Sans for body text (it's the right choice there)
- Not adding motion libraries (CSS-only spec stays)
- Not changing the token architecture (it's solid)
- Not redesigning any section layouts
- Not changing the CTA architecture (it's a genuine differentiator)
- Not changing the iOS shell approach
- Not altering the 4-theme structure

---

## Priority Order

| Priority | Upgrade | Complexity | Impact |
|---|---|---|---|
| P1 | Spring-feel motion (cubic-bezier values) | Low — find+replace timing functions | High — every interaction |
| P1 | Glass theme strengthening | Low — 3 token changes | High — most distinctive theme |
| P1 | Hero typography scale | Low — change one token value | High — first impression |
| P2 | Display typeface pairing | Low — one Google Fonts import | High — display moments |
| P2 | Ambient glow propagation | Medium — audit all accent uses | Medium — cohesion |
| P3 | Dynamic artwork ambient color | Medium — ~15 lines JS | High — emotional impact |

---

## Key Decisions Made

1. **Augment v3 spec, don't replace it** — the foundation is correct, the research adds precision
2. **No new dependencies** — Upgrades 1–5 are zero-dependency changes to existing tokens and CSS values
3. **Plus Jakarta Sans stays for body text** — distinctive display type is for artist name only
4. **Dynamic ambient color is progressive enhancement** — it adds to static accent, doesn't replace it
5. **Spring physics without JS** — cubic-bezier approximation is sufficient for v3's needs

---

## Open Questions

None — all decisions are clear and bounded. Ready to plan.
