# ABLE — Guided Identity Engine
**Status: ACTIVE**
**Last updated: 2026-03-14**
**Detail spec:** `operational/GUIDED_IDENTITY_SYSTEM_SPEC.md`

---

## What this engine does

The Guided Identity Engine gives every artist a profile that looks like their world — not a template. It does this through three layers stacked in sequence, with AI as the interpreter between them and the final output.

The result: two artists in the same genre look unmistakably different. The profile shifts emphasis automatically when the artist is releasing vs playing a gig. The whole thing takes 90 seconds to set up.

---

## Three layers

```
Layer 1: Sound (genre)      → structural defaults — typography, radius, density
Layer 2: Feel (character)   → artist personality — 2 axes, 4 quadrants
Layer 3: Moment (objective) → auto-computed from campaign state — section emphasis
                                   ↓
                       AI interprets all three
                                   ↓
                  One strong, personal profile identity
```

---

## Layer 1 — Sound (genre)

7 genre slugs: `electronic` / `hiphop` / `rnb` / `indie` / `pop` / `rock` / `acoustic`

Genre sets CSS structural defaults via `data-vibe` on `#app-shell`. Controls:
- Display font family and weight
- Card border radius multiplier
- Default accent colour suggestion (3–5 options; never forced)
- Label letter-spacing

Genre does NOT control feel, warmth, motion timing, or CTA prominence.

**Detail:** `core/VISUAL_SYSTEM.md` (authoritative vibe table)

---

## Layer 2 — Feel (character)

Two axes → four quadrants → one selection.

**Axis A — Energy:** Intimate ←→ Bold
**Axis B — Polish:** Raw ←→ Refined

| | Intimate | Bold |
|---|---|---|
| **Raw** | `intimate-raw` — stripped-back, personal | `bold-raw` — underground, direct, high-contrast |
| **Refined** | `intimate-refined` — warm, cinematic, premium-quiet | `bold-refined` — clean, glossy, confident |

Applied via `data-feel` on `#app-shell`. CSS selectors per quadrant override:

```css
[data-feel="intimate-raw"]     { --font-display-weight: 500; --r-card: 4px;  --dur-norm: 150ms; }
[data-feel="intimate-refined"] { --font-display-weight: 400; --r-card: 12px; --dur-norm: 600ms; }
[data-feel="bold-raw"]         { --font-display-weight: 800; --r-card: 2px;  --dur-norm: 200ms; }
[data-feel="bold-refined"]     { --font-display-weight: 700; --r-card: 8px;  --dur-norm: 350ms; }
```

**User-facing names (never show the slugs):**
- `intimate-raw` → "Stripped back"
- `intimate-refined` → "Warm and cinematic"
- `bold-raw` → "Underground and direct"
- `bold-refined` → "Clean and confident"

---

## Layer 3 — Moment (objective)

Auto-computed from campaign state — not a separate artist input.

| State | Effect on identity |
|---|---|
| `profile` | Bio prominent; music section elevated |
| `pre-release` | Countdown prominent; pre-save CTA dominant |
| `live` | Top card dominant; stream CTA leads |
| `gig` | Date/venue prominent; ticket CTA full-width |
| Near-future | Calendar chip surfaced; reminder CTA prominent |

Purely hierarchical — section ordering and CTA prominence. The visual identity doesn't change between states; information architecture re-orders.

---

## AI role

AI operates within the design system's valid range. It never generates arbitrary CSS.

1. **First-pass interpretation** — on genre + feel selection, AI outputs accent colour, font weight modifier, spacing mode. Constrained recommendation within valid range. One output, not a carousel.

2. **Artwork reading** — paste a Spotify URL or upload artwork → AI reads dominant colours → suggests accent that harmonises. One suggestion.

3. **Guided nudges** — 5 directions available in admin after first identity is set:
   - **Darker** — shifts base tone
   - **More space** — increases spacing density
   - **Softer** — reduces card sharpness
   - **Bolder** — increases contrast and CTA prominence
   - **Warmer** — shifts accent toward warm end

   Each nudge is a ±1 delta on a -3 to +3 integer axis. Range clamps prevent going outside the system.

   **Free:** 3 total nudge uses. **Artist+:** unlimited.

---

## Canonical identity model

```javascript
profile.identity = {
  genre: 'electronic',       // one of 7 genre slugs
  feel:  'bold-refined',     // one of 4 feel quadrant slugs
  accent: '#c49438',         // hex — artist-set or AI-recommended
  accentSource: 'ai',        // 'ai' | 'artist' | 'artwork'
  refinements: {
    darkness:  0,  // -3 to +3
    spacing:   0,  // -3 to +3
    sharpness: 0,  // -3 to +3
    contrast:  0,  // -3 to +3
    warmth:    0   // -3 to +3
  }
}
```

`applyIdentity(profile, shell)` — sets `data-feel`, then applies refinement deltas as inline CSS custom property overrides.

**Full canonical object:** `data/CANONICAL_OBJECT_MODEL.md §4`

---

## V1 scope

**In V1:** 7 genres, 4 feel quadrants, AI first-pass, 5 nudge directions, `data-feel` CSS system, live mini-preview in admin, onboarding 5-step feel selection.

**Phase 2:** Multi-genre blend, secondary accent, background image editor, saved style variants, campaign-specific styles, custom font pairing, AI copy-tone detection.

**Never:** Open CSS editor, arbitrary font upload, unlimited colour palette, per-section overrides, animation sliders, "Surprise me" random generation.

---

## What this engine does NOT do

- Drive section ordering or CTA prominence (that's Moment Engine Layer 3)
- Handle fan access gating (that's Close Circle)
- Generate copy or bio text (that's the AI features in `V6_BUILD_AUTHORITY.md §11`)
