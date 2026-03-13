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
**Font — body:** Plus Jakarta Sans
**Letter spacing:** tight on headings (0.06em), open on caps labels (0.22em)
**Default accent:** Cyan `#06b6d4` or Amber `#f4b942`
**Hero gradient:** Stark, single-direction, strong contrast
**Border radius:** Sharp (`--r-mult: 0.8`)
**Vibe tokens:** geometric, minimal, high contrast, no softness
**Google Font to load:** (none — Barlow Condensed already loaded)

---

### 2. Hip Hop / Rap
**Artist context:** rapper, producer, trap, grime, drill, UK rap
**Font — display:** Oswald 700
**Font — body:** Plus Jakarta Sans
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
**Font — body:** Plus Jakarta Sans
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
**Font — body:** Plus Jakarta Sans
**Letter spacing:** slightly off (`-0.01em`), feels intentional not polished
**Default accent:** Sage `#7ec88a`, Muted Rose
**Hero gradient:** Mixed, impure colours, slight grain
**Border radius:** Medium (`--r-mult: 1.0`)
**Vibe tokens:** raw, authentic, imperfect, real
**Google Font to load:** Space+Grotesk:700

---

### 5. Pop
**Artist context:** pop, synth-pop, electropop, mainstream
**Font — display:** Barlow Condensed 700 (already loaded) — or Nunito for softer pop
**Font — body:** Plus Jakarta Sans
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
**Font — body:** Plus Jakarta Sans
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
**Font — body:** Plus Jakarta Sans
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
- All 4 themes (Dark/Light/Mid/Glass) work with all 7 vibes — the vibe affects font + gradient style, the theme affects bg/text/surface colours

---

## Accent Colour Suggestions Per Vibe

When the artist reaches Step 2 (colour picker), the preset swatches reorder to front-load the genre-appropriate colours:

| Vibe | Suggested accents (in order) |
|---|---|
| Electronic | Cyan, Amber, White, Indigo |
| Hip Hop | Gold, Red, White, Amber |
| R&B | Rose, Gold, Lavender, White |
| Indie | Sage, Muted Rose, White, Amber |
| Pop | Indigo, Rose, Cyan, Amber |
| Rock | Red, White, Amber, Black |
| Acoustic | Ochre, Sage, Rose, White |

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
