> **ARCHIVAL / SUPERSEDED** — This file is retained for historical context only. Do not use as active build authority. See `docs/v6/core/V6_BUILD_AUTHORITY.md` for current decisions.

---

# ABLE v3 — Design Specification
**Date:** 2026-03-10
**Status:** Approved — ready for implementation
**Approach:** Hero-first, ship fast, iterate (Approach C)
**Output file:** `able-v3.html`

---

## Design DNA

| Decision | Choice | Rationale |
|---|---|---|
| Direction | Premium & Conversion-first | Stripe/Linear design language applied to music |
| Base colour | Midnight Navy `#0d0e1a` | Deep blue-black with subtle warmth — not cold tech, not generic dark |
| Accent colour | Artist-owned blue (default `#3b82f6`) | One CSS variable change transforms the entire page |
| Feel | Calm, Apple-like, iOS-native | User-friendly, frictionless, familiar to mobile users |
| Typography | Plus Jakarta Sans | Warm humanist geometric — between Apple's softness and Linear's precision |
| Hero | Artwork-led | Latest release fills the top — the music is the star, not the person |
| Shell | iOS Native | Bottom tab bar, card sheets, feels like the artist has their own app |
| Aesthetic | 2026 without generic | Purposeful choices from real design references, not AI template vibes |

---

## Colour Tokens

```css
--color-bg:           #0d0e1a;   /* page background */
--color-card:         #12152a;   /* card surface */
--color-card-raised:  #181c35;   /* elevated card / hover state */
--color-border:       rgba(255,255,255,0.08);
--color-border-mid:   rgba(255,255,255,0.12);
--color-accent:       #3b82f6;   /* artist brand colour — single source of truth */
--color-accent-glow:  rgba(59,130,246,0.35);
--color-text-primary: #ffffff;
--color-text-secondary: rgba(255,255,255,0.55);
--color-text-muted:   rgba(255,255,255,0.35);
--color-tab-bg:       rgba(10,11,22,0.97);
```

---

## Typography Tokens

```css
--font-display: 'Plus Jakarta Sans', system-ui, sans-serif;

/* Scale */
--text-hero:    22px / 800 weight / -0.6px tracking   /* artist name */
--text-title:   18px / 800 weight / -0.5px tracking   /* section headings */
--text-body:    13px / 400 weight / 0px tracking       /* bio, descriptions */
--text-label:   11px / 600 weight / 0.3px tracking    /* meta, tags */
--text-micro:   10px / 500 weight / 0.5px tracking    /* dates, counts */
--text-caps:    10px / 700 weight / 1.5px tracking / uppercase  /* section labels */
```

---

## Spacing & Radius Tokens

```css
--radius-phone:   36px;   /* outer phone shell */
--radius-card:    16px;   /* content section cards */
--radius-button:  12px;   /* primary CTA */
--radius-button-sm: 8px;  /* secondary/small buttons */
--radius-pill:    20px;   /* quick action pills */
--radius-art:     8px;    /* track artwork thumbnails */

--space-page:     12px;   /* horizontal page margin */
--space-card:     14px;   /* card internal padding */
--space-section:  12px;   /* gap between sections */
```

---

## Layout Structure

```
┌─────────────────────────────────┐
│  STATUS BAR (36px)              │  Time, battery, signal
├─────────────────────────────────┤
│  ARTWORK HERO (200px)           │  Full-width release artwork
│  • Gradient overlay             │  Fade to --color-bg at bottom
│  • "NEW ALBUM · OUT NOW" tag    │  Glass pill, top-right
│  • Avatar (38px) bottom-left    │  Subtle, not dominant
│  • Artwork fades to navy        │
├─────────────────────────────────┤
│  ARTIST INFO                    │  Name (hero weight), meta, bio
├─────────────────────────────────┤
│  CTA ROW                        │  Primary (full blue) + Secondary (ghost)
├─────────────────────────────────┤
│  QUICK ACTION PILLS             │  Scrollable row, max 4 visible
├─────────────────────────────────┤
│  CONTENT SECTIONS (scrollable)  │  Music preview → Events preview
│  Each section is a card         │  --color-card background, --radius-card
├─────────────────────────────────┤
│  BOTTOM TAB BAR (sticky)        │  Home · Music · Events · Merch · Support
│  64px height incl. safe area    │  Active tab: --color-accent label
└─────────────────────────────────┘
```

---

## Bottom Tab Bar

| Tab | Icon | Section |
|---|---|---|
| Home | 🏠 | Full profile scroll view |
| Music | 🎵 | All releases, tracklists, embeds |
| Events | 🎟 | Upcoming + past shows |
| Merch | 👕 | Product grid with buy CTAs |
| Support | 💙 | Fan support / tipping |

Active state: label turns `--color-accent`, no background change (calm, not loud).

---

## Artwork Hero Detail

- Full-width image fills top ~200px
- If no image: gradient placeholder using `--color-accent` + indigo
- Gradient scrim at bottom 80px: `linear-gradient(to bottom, transparent, --color-bg)`
- Tag pill (top-right): release type + status — `NEW ALBUM · OUT NOW`, `SINGLE`, `EP`, `TOUR`
- Artist avatar (38px circle, bottom-left of artwork): subtle, glass border
- On scroll: artwork parallaxes slightly (CSS `background-attachment: scroll` approach)

---

## CTA Architecture (preserved from v1/v2)

1. **Primary CTA** — full `--color-accent` button, box-shadow glow. One per hero.
2. **Secondary CTA** — ghost button. One per hero.
3. **Quick Action Pills** — platform links + extras. Max 4 visible + `+N` overflow.
4. **Section Actions** — per section (Music: Play on Spotify; Events: Tickets; Merch: Buy).
5. **Global dedupe rule**: same URL cannot appear in multiple zones. Hero wins.

---

## Section Card Anatomy

Every content section uses the same card structure:

```
┌──────────────────────────────┐
│ ● Section Title    See all → │  14px padding, blue dot, see-all link
├──────────────────────────────┤
│  Row (track / event / merch) │  border-top: --color-border, 10px padding
│  Row                         │
│  Row                         │
│  [Show all N items]          │  centered, --color-accent text
└──────────────────────────────┘
```

---

## Music Section

**Two display modes** (same as v1/v2, new visual treatment):
- **Tracklist**: numbered rows with artwork thumb, title, duration, play icon
- **Embeds**: Spotify/YouTube/SoundCloud iframes contained inside card

Track row: `[artwork 36px] [title + meta] [play button]`
Play button: 28px circle, `rgba(--color-accent, 0.15)` fill, accent border

---

## Events Section

- Upcoming: full opacity, blue date blocks, ticket CTA button
- Past: 60% opacity, neutral date block, "Past" label instead of ticket button
- Date block: 36px square, rounded 10px, `rgba(--color-accent, 0.12)` bg
- Each row: `[date block] [name + venue] [ticket CTA]`

---

## Merch Section

Bento-style tile grid (preserved from v1/v2):
- 2-column grid for most items
- Featured item spans full width
- Each tile: product image, name, price, Buy CTA

---

## All 4 Themes

| Theme | Base bg | Card bg | Notes |
|---|---|---|---|
| Dark (default) | `#0d0e1a` | `#12152a` | As designed above |
| Light | `#f8f9ff` | `#ffffff` | Same structure, inverted |
| Contrast | `#000000` | `#111111` | Pure black, high contrast text |
| Glass | Artist's hero image | Frosted overlay | `backdrop-filter: blur(20px)`, text must hit 4.5:1 |

---

## Motion Plan (CSS-only, no libraries)

- **Artwork load**: `opacity 0 → 1`, 400ms ease
- **Section cards**: `translateY(12px) opacity(0) → translateY(0) opacity(1)`, staggered 80ms per card
- **Tab switch**: `translateX` slide between panels, 200ms ease
- **CTA tap**: `scale(0.97)` on active, 100ms
- **Pill tap**: background brightens 20%, 100ms

---

## Build Order (Approach C — hero-first)

1. **iOS shell** — page wrapper, status bar, bottom tab bar, tab panel structure
2. **Artwork hero** — image area, gradient scrim, tag pill, avatar, fade
3. **Artist info + CTAs** — name, meta, bio, primary + secondary buttons
4. **Quick action pills** — scrollable row, overflow toggle
5. **Music section** — card, tracklist rows, embed mode
6. **Events section** — card, upcoming + past rows, ticket CTAs
7. **Merch section** — bento grid, product tiles
8. **Support section** — fan support / tipping panel
9. **All 4 themes** — token swap, glass mode frosted cards
10. **Admin panel** — left-side editor wired to preview (same pattern as v1/v2)

---

## What v3 is NOT doing

- No social feed (yet)
- No expandable grids
- No JS animation libraries
- No build pipeline / bundler
- No force-push to main without user review
- No generic AI-template aesthetics

---

## Key References

**Companies**: Stripe, Linear, Vercel, Resend, Apple Music, Spotify, Tidal
**Designers**: Tobias van Schneider, Fantasy.co, Work & Co, Instrument
**Styles**: iOS 18 native, visionOS spatial depth, Apple keynote bento, Stripe dashboard polish
