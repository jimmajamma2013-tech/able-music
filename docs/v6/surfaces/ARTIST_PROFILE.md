# ABLE Surface — Artist Profile (`able-v6.html`)
**Status: ⛔ SUPERSEDED — DO NOT USE FOR BUILD DECISIONS**
**Last updated: 2026-03-14 | Superseded: 2026-03-15**

> **This document is superseded by `docs/pages/profile/DESIGN-SPEC.md`.**
> The V8 strategy process produced a complete, scored, build-ready spec. Use that.
> This file is retained for historical reference only.

---

*This doc describes how product engines translate into the artist profile page. It does not define engine logic — it defines rendering rules.*

---

## What this surface is

The fan-facing page. The artist puts this link in their bio. A fan lands here. Everything that matters happens in the next 30 seconds.

The surface is mobile-first (390px baseline), desktop-constrained (430px max shell width), and renders local-first from `localStorage('able_v3_profile')`.

---

## Which engines drive which sections

| Section | Driven by |
|---|---|
| Hero top card, state chip, CTA prominence | Moment Engine (campaign state) |
| Artist name weight, card radius, motion timing | Guided Identity (feel quadrant) |
| Font family, accent defaults, spacing density | Guided Identity (genre/vibe) |
| World Map cells, lock-ring dots | Moment Engine + Close Circle |
| Close Circle hero entry, join sheet | Close Circle engine |
| Fan capture form | Fan Product engine |
| Listen / Shows / Merch / Support | Artist profile data (Moment Engine drives ordering in gig state) |
| Credits accordion | Credits engine |
| Footer visibility | Tier model (Free = visible, paid = hidden) |

---

## Section order (non-negotiable)

```
iOS status bar
↓
Hero / Top card
  Artist name · genre tag · state chip
  Bio strip (2–3 lines, tap More)
  Primary CTA (56px, full-width, accent fill)
  Secondary CTA (ghost, same height)
  Close Circle entry (tertiary text link, if cc.enabled)
↓
Quick Action pills (horizontal scroll, max 6 + More)
↓
Fan capture (screenful 3)
↓
Listen section
↓
Shows section [Shows before Listen in gig state]
↓
World Map
↓
Snap cards (horizontal scroll)
↓
Merch section [hidden if empty]
↓
Support section [hidden if empty]
↓
Credits (collapsed accordion)
↓
Recommendations (max 5, optional)
↓
Footer
↓
Bottom tab bar (fixed, 5 tabs)
```

---

## Campaign state rendering rules

| State | Hero changes | CTA zone | Section emphasis |
|---|---|---|---|
| `profile` | Bio chip hidden | Stream CTA primary | Listen elevated |
| `pre-release` | Countdown chip | Pre-save CTA primary | Countdown widget above Listen |
| `live` | "Out now" chip | Stream CTA full-width, pre-save secondary | Top card prominent |
| `gig` | "On tonight" chip + pulsing dot | Ticket CTA full-width | Shows before Listen |
| Near-future | World Map chip in hero | Reminder CTA surfaced | World Map World Map elevated |

---

## Identity system rendering

`data-feel` on `#app-shell` drives CSS cascade. `data-vibe` on `#app-shell` drives font + radius defaults. Both set by `renderProfile()` via `applyVibe()` then `applyIdentity()`.

Shell element: `<div id="app-shell" data-theme="dark" data-vibe="indie" data-feel="bold-refined">`

When profile.identity.refinements has non-zero values, inline CSS custom properties override the feel defaults.

---

## Performance rules (hard)

- LCP ≤ 2.5s on mid-range Android at 75th percentile
- INP ≤ 200ms
- CLS ≤ 0.10
- HTML (minified + gzipped) ≤ 340kB
- Render from localStorage immediately — no API blocking
- Degrade gracefully if any external API fails (Spotify, YouTube, Bandsintown)
- No render-blocking scripts in `<head>`

---

## Accessibility gates (WCAG 2.2 AA — not optional)

- Visible focus on all interactive elements
- All primary flows keyboard-reachable
- All interactive elements ≥ 44×44px
- Meaningful ARIA labels on all icon-only controls
- Contrast compliant across all 4 themes × 7 vibes
- `prefers-reduced-motion` respected (collapses all durations to 100ms)

---

## Theme × vibe × feel verification matrix

Every release must pass spot-checks across:
- 4 themes × 7 vibes × 4 campaign states (minimum 12 of 112 combinations)
- All 4 feel quadrants across at least Dark and Light themes

The checkpoints log in `V1_SCOPE.md` records what has been verified.
