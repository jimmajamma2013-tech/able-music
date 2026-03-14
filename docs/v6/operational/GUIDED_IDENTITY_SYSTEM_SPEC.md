# ABLE — Guided Identity System
**Version 1.0 — 2026-03-14**
**Status: ACTIVE**

*The identity/styling system for ABLE artist profiles. Replaces "genre = preset" with "genre + feel + moment = identity."*

---

## 1. Model Overview

Three layers, one coherent output.

```
Layer 1: Sound           Genre/vibe cluster (structural foundation)
Layer 2: Feel            Artist character (2 axes, 4 quadrants)
Layer 3: Moment          Current objective (auto-computed from campaign state)
                              ↓
                    AI interprets all three
                              ↓
               One strong, personal profile identity
```

---

## 2. Layer 1: Sound (Genre)

Genre sets *structural defaults* — not the final feel.

### What genre controls

- Typography cluster (display font weight and tracking, body font size)
- Card radius (sharp for electronic/hip-hop; softer for acoustic/folk)
- Spacing density (tight for urban vibes; airy for acoustic/indie)
- Motion flavour (spring constants — snappier for energetic, slower for intimate)
- Default accent palette (3–5 curated suggestions, never forced)

### What genre does NOT control

- Final colour/accent (always artist-set or AI-suggested)
- Whether the profile feels warm or cool (Feel layer)
- Whether it feels polished or raw (Feel layer)
- Content hierarchy or CTA prominence (Moment layer)

### V1 genre list

`electronic` / `hiphop` / `rnb` / `indie` / `pop` / `rock` / `acoustic`

Broad enough to be non-embarrassing. The Feel layer handles distinction within genre. Multi-genre is Phase 2.

---

## 3. Layer 2: Feel (Artist Character)

Two axes, four quadrants, one selection.

**Axis A — Energy:**
```
Intimate  ←————————————→  Bold
```

**Axis B — Polish:**
```
Raw  ←————————————→  Refined
```

### The four feel quadrants

| | Intimate | Bold |
|---|---|---|
| **Raw** | `intimate-raw` — stripped-back, personal, unfinished-on-purpose | `bold-raw` — underground, direct, high-contrast |
| **Refined** | `intimate-refined` — warm, cinematic, premium-quiet | `bold-refined` — clean, glossy, confident |

### Feel modifiers per quadrant

| Quadrant | Typography | Cards | Motion | Image treatment |
|---|---|---|---|---|
| `intimate-raw` | Smaller tracking, weight 500 | Flat, r=4px | 150ms, no spring | Desaturated 85%, grain overlay |
| `intimate-refined` | Elegant weight 400, generous leading | Soft r=12px | 600ms deceleration, unhurried | Warm-toned, soft shadows |
| `bold-raw` | Heavy weight 800, high tracking | Sharp r=2px | 200ms, aggressive spring | High contrast, full-bleed |
| `bold-refined` | Clean weight 700, precise | Medium r=8px | 350ms, confident spring | Editorial, crisp |

### In the UI

Not sliders. Not abstract axes. Four named options in onboarding and admin:
- **"Stripped back"** → `intimate-raw`
- **"Warm and cinematic"** → `intimate-refined`
- **"Underground and direct"** → `bold-raw`
- **"Clean and confident"** → `bold-refined`

One tap. No explanation needed.

---

## 4. Layer 3: Moment (Objective)

Auto-computed from campaign state. Not a separate artist input.

| Campaign state | Moment objective | Visual/structural effect |
|---|---|---|
| `profile` | Artist introduction | Bio prominent; music section elevated |
| `pre-release` | Build anticipation | Countdown prominent; pre-save CTA dominant |
| `live` | Celebrate the release | Top card dominant; stream CTA leads; credits surfaced |
| `gig` | Drive ticket sales | Date/venue prominent; ticket CTA full-width; shows elevated |
| `near-future` (≤7d) | Surface upcoming moment | Calendar chip prominent; reminder CTA surfaced |

Purely hierarchical — which sections get prominence. Identity doesn't visually reinvent itself between states; information architecture re-orders.

---

## 5. AI's Role

### What AI does

1. **First-pass interpretation** — on genre + feel completion, AI outputs a specific identity: accent colour, font weight, spacing mode, card style. Constrained recommendation within the design system's valid range.

2. **Artwork/image reading** — paste a Spotify URL or upload a photo → AI reads dominant colours → suggests an accent + theme that harmonises. One suggestion, not a carousel.

3. **Guided nudges** — 5 refinement directions available in admin after first identity is set:
   - *Darker* — shifts base tone
   - *More space* — increases spacing density
   - *Softer* — reduces card sharpness, lightens weight
   - *Bolder* — increases contrast and CTA prominence
   - *Warmer* — shifts accent toward warm end of palette

   Each nudge is a small delta within the valid system range.

### What AI does NOT do

- Generate arbitrary CSS
- Produce multiple wildly different theme options to choose between
- Re-run every time the artist opens admin
- Replace the design system's constraints
- Touch content or copy

**AI output is always a delta on the existing system.** The system defines the valid range. AI fills in the best position within it.

---

## 6. 90-Second Onboarding Flow (`start.html`)

Five questions:

1. **Name your sound** — genre selection (7 tiles, one tap)
2. **How does your music feel?** — feel selection (4 named options, one tap)
3. **What are you working towards right now?** — objective seed:
   "Releasing something" / "Playing shows" / "Just building my page" / "Getting bookings"
4. **Your accent colour** — AI suggests 3 options based on steps 1–2 (or artwork if pasted). Artist picks one or types a hex. Skip: AI picks the best match.
5. **Preview** — full phone render of the generated profile. One refinement nudge allowed before first publish.

**Not in first-run:** Typography precision, custom spacing, background image treatment, advanced card styling. All in admin after first publish.

---

## 7. Canonical Identity Model

```javascript
// Stored in able_v3_profile.identity
{
  genre: 'electronic',        // one of 7 genre slugs
  feel: 'bold-refined',       // one of 4 quadrant slugs
  accent: '#c49438',          // hex — artist-set or AI-recommended
  accentSource: 'ai',         // 'ai' | 'artist' | 'artwork'

  // AI refinement deltas — applied on top of genre+feel defaults
  // Integer steps, range -3 to +3, default 0
  refinements: {
    darkness: 0,     // -3 (lighter) to +3 (darker)
    spacing: 0,      // -3 (tighter) to +3 (more space)
    sharpness: 0,    // -3 (softer) to +3 (sharper)
    contrast: 0,     // -3 (quieter) to +3 (bolder)
    warmth: 0,       // -3 (cooler) to +3 (warmer)
  }

  // Derived at render time (not stored):
  // fontWeight, cardRadius, durNorm, spacingDensity
}
```

### CSS architecture

```html
<div id="app-shell" data-theme="dark" data-vibe="electronic" data-feel="bold-refined">
```

CSS selectors on `[data-feel]` apply the quadrant modifier set as custom property overrides:

```css
[data-feel="intimate-refined"] {
  --font-display-weight: 400;
  --r-card: 12px;
  --dur-norm: 600ms;
  --spacing-density: 1.1;
  --ease-primary: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
[data-feel="bold-raw"] {
  --font-display-weight: 800;
  --r-card: 2px;
  --dur-norm: 200ms;
  --spacing-density: 0.90;
  --ease-primary: cubic-bezier(0.34, 1.56, 0.64, 1);
}
/* etc for all 4 */
```

Refinement deltas applied as inline custom property overrides via `applyIdentity()`.

---

## 8. Surface Translation

### `able-v6.html`

`data-feel` attribute on shell drives CSS cascade. All four feel values tested across all 7 vibes × 4 themes. Visible changes: font weight, card radius, spacing, motion duration. Stable: font family (DM Sans always), section structure, tab bar, CTA zone architecture, accessibility tokens.

### `admin.html`

**Profile Identity card** (below Campaign HQ):
- Genre: current selection + "Change →"
- Feel: current quadrant + "Change →"
- AI refinements: 5 nudge buttons
- Live mini-preview strip: 390×180px cropped hero render, updates as artist taps nudges

Free: 3 refinement nudge uses total. Artist+: unlimited.

### `start.html`

Steps 1–4 as defined in §6. Step 5 is a full phone preview + one refinement nudge. After publish: artist lands in admin.

### `landing.html`

Three-state demo phone cycling through feel quadrants:
`intimate-refined` → `bold-raw` → `bold-refined`

Same artist. Same music. Different feel. 3 seconds per state, crossfade.

Below the phone: *"Built around your sound, your mood, and your moment."*

No mention of genres, templates, or themes.

---

## 9. Free vs Premium

| Capability | Free | Artist (£9) | Artist Pro (£19) |
|---|---|---|---|
| Genre selection | ✅ | ✅ | ✅ |
| Feel selection (4 options) | ✅ | ✅ | ✅ |
| AI first-pass identity | ✅ | ✅ | ✅ |
| 5 refinement nudges | ✅ (3 uses) | ✅ unlimited | ✅ unlimited |
| Custom accent hex | ✅ | ✅ | ✅ |
| AI artwork colour read | ✅ | ✅ | ✅ |
| Live preview in admin | ✅ | ✅ | ✅ |
| Secondary accent | ❌ | ✅ | ✅ |
| Background image/gradient | ❌ | ✅ | ✅ |
| Saved style variants (3) | ❌ | ❌ | ✅ |
| Campaign-specific styles | ❌ | ❌ | ✅ |

Free profiles look genuinely personal. Premium adds control and precision, not personality.

---

## 10. Visual / Motion / Performance

### Motion flavour by feel

- `bold-raw`: spring at full aggression (`cubic-bezier(0.34,1.56,0.64,1)`), 200ms
- `bold-refined`: spring present, tighter (less overshoot), 350ms
- `intimate-refined`: all deceleration easing, 450ms, unhurried
- `intimate-raw`: near-instant 150ms, no spring, no bounce. Restraint as personality.

### Image treatment by feel

- `bold-raw`: full colour, no softening, high contrast
- `bold-refined`: clean bleed, subtle vignette at edges
- `intimate-refined`: warm bias (`filter: saturate(0.9) sepia(0.05)`)
- `intimate-raw`: desaturation-slight (`filter: saturate(0.85)`), 4% grain texture overlay

### Performance

All feel modifiers are CSS custom property changes on `data-feel` attribute changes — no class churn, no DOM re-render. Paint cost only.

### Reduced-motion

`prefers-reduced-motion: reduce` collapses all `dur-norm` to 100ms and removes spring bounces regardless of feel setting.

---

## 11. V1 Scope

### In V1

- 7 genres, 4 feel quadrants (2×2 axis model)
- 1 AI first-pass identity interpretation
- 5 refinement nudge directions (3 free, unlimited Artist+)
- AI accent suggestion from artwork read
- `data-feel` CSS attribute system
- Live mini-preview strip in admin Profile Identity card
- Onboarding steps 1–4 + preview with one nudge

### Deferred (Phase 2)

- Multi-genre blend (second genre at reduced weight)
- Secondary accent colour
- Background image/gradient editor
- Saved style variants
- Campaign-specific style variants
- Custom font pairing (curated selection)
- AI copy-tone detection (reads bio to suggest feel)

### Never

- Open CSS editor
- Arbitrary font upload
- Full colour palette editor with unlimited colours
- AI-generated layouts (structure stays fixed)
- "Surprise me" random generation
- Per-section style overrides
- Animation speed sliders

---

## 12. The Three User-Facing Truths

**1. Genre is where you start, not where you stop.**
Your sound shapes the profile — but your mood, your energy, and what you're working towards shape it further.

**2. Personal within structure.**
Not a template. Not a blank canvas. A premium system that interprets your world and shapes itself around it — without making you a designer.

**3. Built around your moment.**
Release mode, live mode, building mode — the profile changes emphasis with you. Same identity, different weight.

---

## 13. The 10/10 Standard

The Guided Identity System is ready when:

1. An artist gets from zero to "this feels like me" in under 90 seconds
2. Two artists in the same genre look unmistakably different because their feel quadrant differs
3. The profile shifts emphasis when the artist is releasing vs playing a gig — without touching anything
4. AI makes one good recommendation and stays quiet until asked for a nudge
5. Free profiles look genuinely personal, not like a generic preset
6. Premium profiles look precisely dialled, not just "more options"
7. No profile looks broken across any genre + feel + theme + state combination
8. The landing page never uses the word "template"

---

*This spec is the single source of truth for the Guided Identity System. Implementation cross-references V6_BUILD_AUTHORITY.md (§7 design tokens) and VISUAL_SYSTEM.md (genre vibe defaults). Amendments update this document directly.*
