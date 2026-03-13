# ABLE Visual System — Genre Presets

## Philosophy

Within 90 seconds of starting the wizard an artist should see a profile that looks and feels like *them*. The vibe picker in Step 1 is the engine of this. Genre + name → a page that already has the right fonts, gradients, spacing rhythm and accent suggestions. The artist shouldn't need to think about typography. It should just feel right.

This is not a gimmick. Genre shapes culture shapes aesthetics. A techno DJ and a folk singer are communicating different things to the world. Their page should reflect that before they've done anything.

**Core rule:** Always tasteful. Never clip art. The presets are starting points, not constraints.

---

## The 7 Vibes

### 1. Electronic / Club
**Artist context:** DJ, producer, club music, techno, house, dance, EDM
**Font — display:** Barlow Condensed 700 (already loaded)
**Font — body:** DM Sans
**Letter spacing:** tight on headings (0.06em), open on caps labels (0.22em)
**Default accent:** Cyan `#06b6d4` or Amber `#f4b942`
**Hero gradient:** Stark, single-direction, strong contrast
**Border radius:** Sharp (`--r-mult: 0.6`)
**Vibe tokens:** geometric, minimal, high contrast, no softness
**Google Font to load:** (none — Barlow Condensed already loaded)

---

### 2. Hip Hop / Rap
**Artist context:** rapper, producer, trap, grime, drill, UK rap
**Font — display:** Oswald 700
**Font — body:** DM Sans
**Letter spacing:** very tight on display (0em), wide on labels (0.28em)
**Default accent:** Gold `#f4b942`, Red `#e05242`
**Hero gradient:** High contrast, dark, strong diagonal or flat dark
**Border radius:** Square-ish (`--r-mult: 0.7`)
**Vibe tokens:** bold, confident, street, cultural weight
**Google Font to load:** Oswald:700

---

### 3. R&B / Soul
**Artist context:** R&B singer, soul, neo-soul, contemporary
**Font — display:** Cormorant Garamond 600 (italic for headlines)
**Font — body:** DM Sans
**Letter spacing:** 0.02em — elegant, not shouting
**Default accent:** Rose `#e06b7a`, Warm Gold `#f4b942`
**Hero gradient:** Warm, sunset-toned, soft transitions
**Border radius:** Soft (`--r-mult: 1.2`)
**Vibe tokens:** warmth, intimacy, elegance, emotional
**Google Font to load:** Cormorant+Garamond:600italic,600

---

### 4. Indie / Alternative
**Artist context:** indie rock, alt-pop, bedroom pop, lo-fi, singer-songwriter (less acoustic)
**Font — display:** Space Grotesk 700
**Font — body:** DM Sans
**Letter spacing:** slightly off (`-0.01em`), feels intentional not polished
**Default accent:** Sage `#7ec88a`, Muted Rose
**Hero gradient:** Mixed, impure colours, slight grain
**Border radius:** Medium (`--r-mult: 1.0`)
**Vibe tokens:** raw, authentic, imperfect, real
**Google Font to load:** Space+Grotesk:700

---

### 5. Pop
**Artist context:** pop, synth-pop, electropop, mainstream
**Font — display:** Barlow Condensed 700 (already loaded)
**Font — body:** DM Sans
**Letter spacing:** 0.04em
**Default accent:** Indigo `#9b7cf4`, Rose `#e06b7a`
**Hero gradient:** Bright, clean, aspirational
**Border radius:** Rounded (`--r-mult: 1.4`)
**Vibe tokens:** bright, confident, commercial, accessible
**Google Font to load:** (none)

---

### 6. Rock / Metal
**Artist context:** rock, metal, punk, alternative rock, grunge
**Font — display:** Oswald 700 (same as hip hop but different accent/contrast)
**Font — body:** DM Sans
**Letter spacing:** 0em — blunt
**Default accent:** Red `#e05242`, White `#ffffff`
**Hero gradient:** Dark, heavy, near-black, high drama
**Border radius:** Sharp (`--r-mult: 0.6`)
**Vibe tokens:** power, grit, darkness, directness
**Google Font to load:** Oswald:700 (same as hip hop)

---

### 7. Acoustic / Folk / World
**Artist context:** folk, acoustic, country, world music, classical adjacent
**Font — display:** Lora 700 (serif — warmth, handcrafted feel)
**Font — body:** DM Sans
**Letter spacing:** 0.01em
**Default accent:** Warm Ochre `#d4a96a`, Sage `#7ec88a`
**Hero gradient:** Warm, earthy, soft sunrise
**Border radius:** Soft (`--r-mult: 1.3`)
**Vibe tokens:** organic, warm, human, honest
**Google Font to load:** Lora:700

---

## CSS Variables Controlled Per Genre

```css
--font-d        /* display font family */
--ls-d          /* letter spacing for display headings */
--ls-label      /* letter spacing for caps labels */
--r-base        /* base border radius (14px default) */
--grad-angle    /* hero gradient angle */
--grad-spread   /* hero gradient spread: 'stark' | 'warm' | 'soft' */
```

---

## Implementation Notes

- Fonts load **on select only** via dynamic `<link>` injection — no upfront cost
- If artist has Spotify URL in Step 1, we can attempt genre detection via Spotify Web API (future: auto-select vibe)
- Vibe tiles in wizard show a small visual swatch — the genre name rendered in *its own font at tiny size* (once the font is loaded) OR in Barlow Condensed initially, swapping after load
- The `P.vibe` field stores the selected vibe ID and persists to localStorage
- The admin dashboard Profile page should let artists change vibe at any time
- All 4 themes (Dark/Light/Glass/Contrast) work with all 7 vibes — the vibe affects font + gradient style, the theme affects bg/text/surface colours

---

## Base Colour System (applies to all vibes and all pages)

**Philosophy:** ABLE lives in music culture, not the startup world. The palette feels like the sleeve of a record on a serious independent label — controlled, warm, deliberate. Every colour earns its place. The accent is never decoration; it is signal.

All base colours use a warm graphite foundation, not cold blue-black. Text is warm cream, not harsh pure white. Borders use warm white at low opacity.

### Tokens

```css
/* FOUNDATION */
--base:            #0e0d0b;   /* warm graphite */
--base-mid:        #141210;   /* one step raised */
--surface-1:       #1c1a17;   /* card background */
--surface-2:       #242220;   /* raised card / panel */
--surface-3:       #2e2b27;   /* modal, popover */

/* BORDER — warm white, never pure #fff */
--border-faint:    rgba(255,252,240,0.045);
--border-subtle:   rgba(255,252,240,0.08);
--border-default:  rgba(255,252,240,0.12);
--border-strong:   rgba(255,252,240,0.22);

/* TEXT — warm cream */
--text:            #e4dfd2;
--text-2:          rgba(228,223,210,0.58);
--text-3:          rgba(228,223,210,0.35);
--text-4:          rgba(228,223,210,0.20);

/* ACCENT — pale editorial gold (landing/admin context) */
--accent:          #c9b76c;
--accent-rgb:      201,183,108;
--accent-glow:     rgba(201,183,108,0.11);
--accent-dim:      rgba(201,183,108,0.10);
--accent-border:   rgba(201,183,108,0.22);

/* STATE PASTELS — functional only, never brand */
--state-live:      #b87870;   /* dusty terracotta */
--state-pre:       #b8a860;   /* muted ochre */
--state-gig:       #b89068;   /* warm sand */
--state-stream:    #6890b0;   /* steel blue */
--state-ok:        #78a880;   /* dusty sage */
--state-pro:       #9870a8;   /* dusty mauve */
```

### Pill / Tag System

Three tiers — strict rules:

**Tier 1 — Default pill** (platform names, genre tags)
```css
background: rgba(255,252,240,0.05);
border: 1px solid rgba(255,252,240,0.08);
color: rgba(228,223,210,0.60);
```
Near invisible. Sits quietly. Never grabs attention.

**Tier 2 — Active / accent pill**
```css
background: rgba(201,183,108,0.10);
border: 1px solid rgba(201,183,108,0.22);
color: #c9b76c;
```

**Tier 3 — State pill** (Live, Pre-release, Gig, etc)
```css
background: rgba([state-rgb], 0.10);
border: 1px solid rgba([state-rgb], 0.20);
color: var(--state-[name]);
```

Rules: never solid fill, never border above 0.25 opacity, never candy colours.

---

## Accent Colour Suggestions Per Vibe

All vibe accents are desaturated to match the editorial colour system. Artists can choose any hex but these starting points sit beautifully on dark backgrounds.

When the artist reaches Step 2 (colour picker), the preset swatches reorder to front-load the genre-appropriate colours:

| Vibe | Suggested accents (in order) | Hex values |
|---|---|---|
| Electronic | Steel Cyan, Pale Gold, Off-White, Slate | `#5898b0`, `#c9b76c`, `#d8d0c0`, `#7890a8` |
| Hip Hop | Terracotta, Pale Gold, Off-White, Sage | `#b07858`, `#c9b76c`, `#d8d0c0`, `#78a880` |
| R&B | Dusty Violet, Pale Gold, Dusty Rose, Off-White | `#8870a8`, `#c9b76c`, `#b87880`, `#d8d0c0` |
| Indie | Sage, Pale Gold, Dusty Rose, Off-White | `#7aaa68`, `#c9b76c`, `#b87880`, `#d8d0c0` |
| Pop | Soft Purple, Dusty Violet, Pale Gold, Steel Blue | `#8870b0`, `#8870a8`, `#c9b76c`, `#6890b0` |
| Rock | Muted Red, Off-White, Pale Gold, Slate | `#ae6060`, `#d8d0c0`, `#c9b76c`, `#7890a8` |
| Acoustic | Warm Taupe, Sage, Pale Gold, Off-White | `#a89060`, `#78a880`, `#c9b76c`, `#d8d0c0` |

---

## Copy Tone Per Vibe

The copy on cards, CTAs, and snap cards should feel like the artist. Vibe informs tone:

| Vibe | CTA copy style | Example |
|---|---|---|
| Electronic | Minimal, action-only | "Hear it" / "On now" |
| Hip Hop | Direct, possessive | "Get the tape" / "Stream it" |
| R&B | Intimate, inviting | "Come listen" / "It's out" |
| Indie | Low-key, genuine | "New one's up" / "Come if you're near" |
| Pop | Energetic, inclusive | "Stream now" / "We're going on tour" |
| Rock | Blunt, no fluff | "Tickets" / "New record out" |
| Acoustic | Warm, personal | "New song — hope it finds you well" |
