# ABLE — Brand Typography Doctrine
**Created: 2026-03-16 | Status: canonical — do not override without explicit revision**

> This document records why ABLE's typography system is the way it is. It is a doctrine, not a spec. The spec (DESIGN_SYSTEM_SPEC.md) says *what*. This says *why* — so future decisions stay consistent and the system doesn't drift.

---

## The three-typeface principle

ABLE uses exactly three typefaces. This is a decision, not an accident.

| Role | Typeface | Where |
|---|---|---|
| Display / brand moments | Barlow Condensed 700 | Wordmark, section titles, page titles, major CTAs, hero headlines |
| Artist profile body | DM Sans 400/500 | able-v8.html, start.html — all body text, labels, metadata |
| Admin body | Plus Jakarta Sans 400/500/600 | admin.html — UI chrome, descriptions, navigation |

**Why three:** One display face creates brand cohesion (every context feels like ABLE). Two body faces are justified because the artist-facing page and the admin backstage serve different registers — DM Sans is slightly warmer and more casual, appropriate for fan-facing copy; Plus Jakarta Sans has more structure, appropriate for dashboard controls and data.

Adding a fourth typeface is not permitted. If a new design surface needs typography, use one of the three above.

---

## Barlow Condensed: the ABLE display voice

Barlow Condensed 700 is the typeface that makes ABLE feel like ABLE. It appears in:
- The ABLE wordmark
- Admin section page titles (`.page-title`)
- Landing hero headline (`.hero__headline`)
- Artist profile hero name (`.artist-name`)
- Campaign state labels and mode indicators
- Any screen heading that announces a significant context shift

### Why Barlow Condensed

It is editorial without being precious. It has the verticality of a concert poster, the legibility of good wayfinding type, and the authority of a press headline. It says "this matters" without shouting.

The condensed form is load-bearing: it lets large type take a lot of horizontal space without crowding out content. At 32px–84px it is visually dominant. At 22px–24px (wordmark, nav) it is confident but not aggressive.

### Rules (do not bend)

- **Weight: always 700** — no other weight is sanctioned. Barlow Condensed 500 or 600 is not the ABLE voice.
- **Case: ALL CAPS for the wordmark only** — section titles are Title Case or sentence case depending on context (page titles: Title Case; inline section headers: sentence case)
- **Letter-spacing:** `-0.01em` to `-0.02em` for display sizes (≥28px). At navigation scale (22–24px), `-0.01em`. Never positive letter-spacing.
- **Line height:** 1.0–1.1 for multi-line display text. Never use default line-height with Barlow Condensed at large sizes.
- **Pairing:** Never use Barlow Condensed for body copy, labels, or anything below 18px.

### Sizes by surface

| Surface | Size | Notes |
|---|---|---|
| ABLE wordmark (hero / OG) | 48px | Letter-spacing: -0.02em |
| ABLE wordmark (admin sidebar) | 22px | Letter-spacing: -0.02em |
| Admin page titles | 32px | Letter-spacing: -0.01em |
| Landing hero headline | clamp(52px, 6vw, 84px) | With editorial em variant |
| Artist profile name (able-v7) | clamp(42px, 8vw, 72px) | Artist sets name, Barlow Condensed always |
| Campaign state label | 20px | Uppercase, letter-spacing: 0.06em (exception — all-caps label) |

---

## The accent doctrine

The artist's accent colour is not a customisation option. It is a philosophical statement.

**One CSS variable — `--color-accent` — controls everything:**
- Hero CTA background
- Selected state indicators
- Campaign countdown ring
- Fan sign-up confirmation
- The "live" mode indicator

This means every artist's page is a fundamentally different visual experience while remaining recognisably ABLE. The system is the brand. The accent is the artist.

### Admin accent is fixed

The admin dashboard uses `--acc: #c9a84c` (muted gold). This is not configurable. It creates the backstage-vs-stage contrast:
- On stage (able-v8.html): artist's accent colour
- Backstage (admin.html): ABLE gold

This contrast is intentional. The artist should feel the shift when they move from "what my fans see" to "my dashboard."

### Colour variants: the two surfaces

| Surface | Background | Accent logic |
|---|---|---|
| Artist profile (fan-facing) | `#0d0e1a` dark / `#f0ede8` light / artwork for glass | Artist-owned `--color-accent` |
| Admin dashboard | `#ddd8d0` (warm off-white light mode default) | Fixed `#f4b942` amber |
| Landing page | `#0d0e1a` + section variation | `#c9a84c` warm gold accent |

---

## What "brand unity" means in ABLE's context

ABLE is a hosting platform. The artist's page must feel like *theirs*, not like ABLE's. This creates a design tension:
- ABLE needs to be recognisable to build trust and word-of-mouth
- But ABLE's brand presence on the artist's page should be a whisper, not a shout

**The resolution:**
- On the artist's page: ABLE is present in the typography (Barlow Condensed for the artist's name), the "Made with ABLE" footer only, and the structural quality of the layout. The accent colour is the artist's.
- On the landing page and admin: ABLE is assertive — the wordmark is prominent, the amber accent is consistent, the Barlow Condensed page titles announce each section.

ABLE is loud when you're signing up. Silent when your fans are watching.

---

## Typography anti-patterns

These must not appear in any ABLE surface:

| Anti-pattern | Why it's wrong |
|---|---|
| Barlow Condensed at body size (<18px) | Illegible at small sizes; loses its authority |
| Plus Jakarta Sans as a display face | It's a UI face — it looks like SaaS at display size |
| DM Sans at 700 weight for emphasis | DM Sans bold at large size looks heavy without authority |
| Multiple font weights of Barlow (500, 600) | Dilutes the 700 weight's distinctiveness |
| Inline `font-family` overrides in HTML | All type must come from CSS tokens — never hardcode |
| Positive letter-spacing on Barlow Condensed at large sizes | It opens up the letters and loses the condensed tension |

---

## Relationship to DESIGN_SYSTEM_SPEC.md

DESIGN_SYSTEM_SPEC.md records the canonical token values. This document records the reasoning behind them. When there is a conflict:
- DESIGN_SYSTEM_SPEC.md is the authority on *what values to use*
- This document is the authority on *why those values exist* and whether a proposed change preserves the intent

Do not change the type tokens without updating this doctrine to record why.

---

## The surface background doctrine
**Added: 2026-03-22 (Quality Phase 3)**

ABLE has exactly two surface categories. Every surface belongs to one. No third category exists.

### Category A — Artist World
**Surfaces:** `able-v8.html` · `start.html` · `landing.html` · `fan.html` (when built)
**Base background:** `#0d0e1a` (Midnight Navy)
**Card surfaces:** `#16161e` (surface-1) · `#1e1e2a` (surface-2)

These surfaces face outward — toward fans, prospects, and arriving artists. They are all portals into the same place. A fan visiting a profile, a prospective artist on the landing page, and a new artist going through onboarding should all feel the same darkness and warmth. The Midnight Navy is warm-dark: not cold, not blue, not pure black. It holds a rich palette without competing with it.

### Category B — Tool World
**Surfaces:** `admin.html`
**Base background:** `#09090f` (near-black)
**Card surfaces:** `#f8f5f0` (cream — warm white, "paper on dark surface")

Admin is a production surface, not a presentation surface. Near-black communicates backstage. The step-down from Midnight Navy to near-black is intentional: it signals the shift from "what fans see" to "where you work." The cream card system is the visual engine of the Tool World and is not used anywhere in the Artist World.

### The retired value
`#0f1624` (blue-steel) is not part of the doctrine. It belongs to neither category. Its cooler, bluer character drifts toward a generic SaaS register. Any surface currently using `#0f1624` must be updated to `#0d0e1a`.

### Rules
1. **New surfaces** — decide which category before choosing any colour.
2. **Artist World surfaces share one base.** They must be visually indistinguishable at the floor level.
3. **Tool World surfaces** may introduce additional depth layers but must not borrow Artist World card colours or vice versa.
4. **Exceptions require this document to be updated** with a written rationale before implementation.
