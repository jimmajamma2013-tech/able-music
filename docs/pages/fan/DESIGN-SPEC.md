# fan.html — Complete Design Specification
**Last updated: 2026-03-16**
**Stage 6B of the 8-stage strategy process**
**Authority: This file. Supersedes all earlier v6 operational fan specs for visual decisions.**

---

## Design Philosophy for fan.html

fan.html must feel different from both admin.html and able-v7.html.

- **admin.html** is a management tool. It is amber, purposeful, transactional in a good sense — you come here to do things.
- **able-v7.html** is an artist's public profile. It is the artist's world, designed for every fan who lands on it.
- **fan.html** is intimate. It is personal. It is yours.

The design register is: a quiet, well-lit room that belongs to you. Not a stage. Not a dashboard. A room.

Each artist who appears on this page brings their own colour — their own accent — into your space. The page is dark by default (it lives in ABLE's world) but each artist element glows in their own light. The fan's experience of fan.html is, over time, an experience of multiple artists in one personal space — each distinct, none dominant.

---

## How fan.html differs from other ABLE pages

| Quality | able-v7.html (artist profile) | admin.html (artist dashboard) | fan.html (fan dashboard) |
|---|---|---|---|
| Primary feeling | "This is my world — come in" | "I'm in control here" | "I'm close to something real" |
| Palette | Artist-defined accent, deep navy | Amber, near-black | Deep navy, artist accents as guests |
| Typography weight | Display-heavy (Barlow Condensed hero) | Utilitarian (Plus Jakarta Sans) | Quiet (DM Sans, lighter weights) |
| Density | Rich, layered, art-directed | Information-dense, functional | Sparse, deliberate, unhurried |
| Motion | Expressive, spring-feel | Precise, purposeful | Gentle, slow to enter, slow to leave |
| White space | Artwork-driven (hero fills screen) | Tight grid, efficient use of space | Generous — content breathes |

---

## Colour system

### Base palette

```css
--fan-bg:           #0d0e1a    /* Midnight Navy — same as artist profiles */
--fan-card:         #12152a    /* Card surface — same as artist profiles */
--fan-surface-2:    #1a1e35    /* Slightly lighter surface for nested elements */
--fan-border:       rgba(255, 255, 255, 0.06)  /* Subtle borders */
--fan-border-hover: rgba(255, 255, 255, 0.12)  /* Hover borders */
```

### Platform accent (ABLE's own colour — not an artist colour)

```css
--fan-accent:   #8b7cf4    /* Soft indigo — distinct from all artist accent options */
```

This colour is used only for:
- Active tab indicator (bottom tab bar)
- Active filter pill
- Notification pip
- Focus rings
- Close Circle invitation secondary accent

It is never used on artist-specific content. When you see `#8b7cf4`, you are looking at ABLE's UI, not an artist's content.

### Artist accent bleed

Each artist that appears on fan.html brings their own accent colour (`artist.accent` from profile data). This colour is applied as:
- A 3px left border on feed items for that artist
- The background of artist initials (when no artwork is available)
- The left border on pre-release countdown strips
- The left border on the Close Circle invitation card
- The primary CTA colour in the Close Circle "Come closer" button

```javascript
// Applied inline — CSS custom properties via inline style
el.style.setProperty('--this-artist-accent', artist.accent);
```

The fan's experience: over time, each artist is recognisable by their colour before you read their name. Priya knows rose-gold is Maya. Tom knows deep amber is Tendai. The colour bleed makes the dashboard feel like multiple artist-owned spaces rather than a neutral platform feed.

### Text colours (same as able-v7.html for consistency)

```css
--color-text-1: rgba(240, 237, 232, 1.00)    /* Primary — 8.2:1 on #0d0e1a */
--color-text-2: rgba(240, 237, 232, 0.72)    /* Secondary — 5.9:1 on #0d0e1a */
--color-text-3: rgba(240, 237, 232, 0.55)    /* Tertiary — 4.6:1 on #0d0e1a [WCAG AA] */
--color-text-4: rgba(240, 237, 232, 0.35)    /* Decorative only — not used for readable text */
```

**WCAG AA requirement:** All text used for reading must be `color-text-3` or above. `color-text-4` (0.35 opacity) fails WCAG AA — use only for decorative rules, not text.

Previous versions used 0.38 opacity for `color-text-3` which failed WCAG AA (≈ 3.2:1). The correct value is 0.55 (≈ 4.6:1).

---

## Typography

### Font

```css
font-family: 'DM Sans', -apple-system, sans-serif;
```

Same font as able-v7.html artist profiles. This is intentional — fan.html lives in the same typographic world as the artist pages fans came from.

**No Barlow Condensed on fan.html.** That font belongs to artist hero moments. fan.html is not a stage. No display-font hero copy.

### Scale

```css
/* Page elements */
--fs-label:     11px    /* Section labels: TODAY, THIS WEEK */
--fs-meta:      12px    /* Time-ago, type badges, subtle metadata */
--fs-body:      15px    /* Feed item titles, card copy */
--fs-sub:       13px    /* Feed item subtitles, secondary copy */
--fs-title:     17px    /* Section headings, dispatch reader */
--fs-display:   22px    /* Artist name in large cards (Discover) */
```

### Weights

```css
/* Used in fan.html */
--fw-regular:   400    /* Body copy, sub-lines */
--fw-medium:    500    /* Artist names in feed items, key metadata */
--fw-semibold:  600    /* Section labels, active tab labels */
--fw-bold:      700    /* Used sparingly — Tonight badge label */
```

### Letter spacing

```css
/* Section labels (TODAY, THIS WEEK) */
letter-spacing: 0.06em;
text-transform: uppercase;
font-size: var(--fs-label);
font-weight: var(--fw-semibold);
color: var(--color-text-3);
```

---

## Layout

### Mobile shell

```css
/* Shell container */
.fan-shell {
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
  min-height: 100dvh;
  background: var(--fan-bg);
  display: flex;
  flex-direction: column;
  position: relative;
}
```

### Header bar (fixed, 56px)

```css
.fan-header {
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--fan-bg);
  /* Subtle backdrop for content scrolling beneath */
  border-bottom: 1px solid var(--fan-border);
}
```

Elements:
- Left: ABLE wordmark (SVG, `height: 20px`)
- Right: notification bell icon + avatar circle (initials or profile image, 32px diameter)

Sub-greeting (conditional — sits below header, not inside it):

```css
.fan-subgreeting {
  padding: 0 20px 12px;
  font-size: var(--fs-sub);
  color: var(--color-text-2);
  font-weight: var(--fw-medium);
  /* Only renders when there is genuine content to show */
  /* Never rendered as empty or placeholder */
}
```

### Content tabs (44px, sticky below header)

```css
.fan-tabs {
  height: 44px;
  display: flex;
  align-items: stretch;
  padding: 0 16px;
  gap: 4px;
  border-bottom: 1px solid var(--fan-border);
  position: sticky;
  top: 56px;
  z-index: 99;
  background: var(--fan-bg);
}

.fan-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fw-medium);
  color: var(--color-text-3);
  border-bottom: 2px solid transparent;
  transition: color 200ms ease, border-color 200ms ease;
  cursor: pointer;
  min-height: 44px;  /* tap target */
}

.fan-tab[aria-selected="true"] {
  color: var(--fan-accent);
  border-bottom-color: var(--fan-accent);
  font-weight: var(--fw-semibold);
}
```

### Scroll area

```css
.fan-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding-bottom: calc(64px + env(safe-area-inset-bottom));
  /* 64px = bottom tab bar, plus safe area */
}
```

### Bottom tab bar (64px + safe area)

```css
.fan-tabbar {
  height: calc(64px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  background: var(--fan-bg);
  border-top: 1px solid var(--fan-border);
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  z-index: 100;
}

.fan-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 12px;
  gap: 4px;
  min-height: 56px;  /* tap target */
  color: var(--color-text-3);
  font-size: 10px;
  font-weight: var(--fw-medium);
  transition: color 200ms ease;
}

.fan-tabbar-item.active {
  color: var(--fan-accent);
}
```

Tab bar icons: SVG inline (24px), stroke-based. Following: person with radio waves. Artists: music note. Me: person outline.

---

## Feed items (Following view)

```css
.feed-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 0 10px 10px 0;
  background: transparent;
  cursor: pointer;
  transition: background 150ms ease;
  min-height: 56px;
}

.feed-item:active {
  background: rgba(255, 255, 255, 0.04);
  transform: scale(0.99);
}
```

### Feed item internal layout

```
┌─────────────────────────────────────────────────────┐
│ [Artwork 40px]  [Artist name]              [time-ago]│
│                 [Item title — weight 500]  [type badge│
│                 [Item subtitle — dim]               ] │
└─────────────────────────────────────────────────────┘
```

- **Artwork (40×40px):** Square, `border-radius: 8px`. Background: `artist.accent`. Content: artist initials in white 60% opacity. When `artist.artworkUrl` available: `background-image`, cover, no initials.
- **Artist name:** `color-text-2`, `fw-medium`, `fs-sub (13px)`. Above the title. This is the most important piece of information — which artist.
- **Item title:** `color-text-1`, `fw-medium`, `fs-body (15px)`.
- **Item subtitle:** `color-text-3`, `fw-regular`, `fs-meta (12px)`.
- **Time-ago:** `color-text-3`, `fw-regular`, `fs-meta (12px)`. Right-aligned, top row.
- **Type badge:** `color-text-3`, `fw-medium`, `fs-meta (11px)`. Right-aligned, second row.

### Tonight badge (show items within today)

Replaces the standard "Show" type badge when the show is today:

```css
.badge-tonight {
  background: rgba(244, 185, 66, 0.15);  /* amber-tinted background */
  color: #f4b942;                         /* amber */
  font-weight: var(--fw-bold);
  font-size: 10px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  /* Optional pulse — disabled when prefers-reduced-motion */
  animation: tonight-pulse 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .badge-tonight { animation: none; }
}

@keyframes tonight-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

## Section labels

```css
.section-label {
  font-size: var(--fs-label);    /* 11px */
  font-weight: var(--fw-semibold);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-3);
  padding: 20px 20px 8px;
}
```

---

## Pre-release countdown strip

```css
.prerelease-strip {
  margin: 8px 20px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 56px;
}
```

Internal layout:
```
┌─────────────────────────────────────────────┐
│ COUNTING DOWN          [N] days / [N] hours  │
│ [Artist] — [Title]            [Pre-save →]   │
└─────────────────────────────────────────────┘
```

---

## Caught-up state

```css
.caught-up {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px 20px;
  color: var(--color-text-3);
  font-size: var(--fs-sub);  /* 13px */
}

.caught-up::before,
.caught-up::after {
  content: '';
  height: 1px;
  flex: 1;
  background: var(--fan-border);
}
```

Copy: `— you're up to date —`

---

## Artist cards (Discover view)

```css
.artist-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--fan-card);
  border: 1px solid var(--fan-border);
  border-left: 3px solid var(--this-artist-accent, var(--fan-accent));
  cursor: pointer;
  transition: border-color 150ms ease, background 150ms ease;
}

.artist-card:active {
  background: rgba(255, 255, 255, 0.06);
  transform: scale(0.99);
}
```

Internal layout:
```
┌─────────────────────────────────────────────────────┐
│ [Avatar 52px]  [Artist name — display size]         │
│                [Genre · City]                       │
│                [Reason string — e.g. "Same sound"]  │
│                                    [Follow button]  │
└─────────────────────────────────────────────────────┘
```

**No follower count.** Location and genre only.

### Follow button on artist cards

```css
.artist-follow-btn {
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: var(--fw-semibold);
  border: 1.5px solid var(--fan-accent);
  color: var(--fan-accent);
  background: transparent;
  transition: background 150ms ease, color 150ms ease;
  min-height: 36px;
  min-width: 80px;
}

.artist-follow-btn.following {
  background: rgba(139, 124, 244, 0.15);
  color: var(--fan-accent);
  border-color: transparent;
}
```

---

## Show items (Near me view)

```css
.show-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--fan-border);
  cursor: pointer;
  min-height: 64px;
}

/* Date block */
.show-date-block {
  width: 44px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: var(--fw-semibold);
}

.show-date-block .month {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-3);
}

.show-date-block .day {
  font-size: 22px;
  line-height: 1;
  color: var(--color-text-1);
}

/* Followed artist shows: accent left strip */
.show-item.followed {
  border-left: 3px solid var(--this-artist-accent);
  padding-left: 17px;  /* 20 - 3 */
}
```

Ticket button on show items:
```css
.show-ticket-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: var(--fw-semibold);
  background: var(--this-artist-accent, var(--fan-accent));
  color: #fff;
  white-space: nowrap;
  min-height: 44px;
}
```

---

## Empty states

### Structural design

Empty states use no emoji. No icon. Just text and (when applicable) a CTA.

```css
.empty-state {
  padding: 40px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.empty-state__heading {
  font-size: var(--fs-title);   /* 17px */
  font-weight: var(--fw-medium);
  color: var(--color-text-1);
  line-height: 1.4;
}

.empty-state__body {
  font-size: var(--fs-sub);    /* 13px */
  color: var(--color-text-2);
  line-height: 1.6;
}

.empty-state__cta {
  margin-top: 16px;
  font-size: 14px;
  font-weight: var(--fw-semibold);
  color: var(--fan-accent);
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

---

## Close Circle section (Phase 2)

### Dispatch card

```css
.dispatch-card {
  margin: 0 20px 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border-left: 3px solid var(--this-artist-accent);
  cursor: pointer;
}

.dispatch-preview {
  font-size: var(--fs-sub);     /* 13px */
  color: var(--color-text-2);
  line-height: 1.6;
  /* Truncate at 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Dispatch reader (bottom sheet)

```css
/* Inside the bottom sheet */
.dispatch-reader {
  padding: 24px 24px 32px;
}

.dispatch-reader__date {
  font-size: var(--fs-meta);    /* 12px */
  color: var(--color-text-3);
  margin-bottom: 16px;
}

.dispatch-reader__body {
  font-size: 16px;              /* Slightly larger for reading comfort */
  line-height: 1.75;
  color: var(--color-text-1);
  font-weight: var(--fw-regular);
  letter-spacing: -0.01em;
}
```

No like button. No comment section. No share button. No read receipt. This is a letter. It reads like one.

### Close Circle invitation card

```css
.cc-invitation {
  margin: 12px 20px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid var(--this-artist-accent);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cc-invitation__body {
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text-2);
}

.cc-invitation__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 4px;
}

.cc-btn-primary {
  padding: 10px 20px;
  border-radius: 22px;
  font-size: 14px;
  font-weight: var(--fw-semibold);
  background: var(--this-artist-accent);
  color: #fff;
  min-height: 44px;
}

.cc-btn-secondary {
  font-size: 13px;
  color: var(--color-text-3);
  padding: 10px 0;
  min-height: 44px;
}
```

---

## Animation

### Entrance animation (feed items, artist cards, show items)

```css
@keyframes bloom-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bloom-in {
  animation: bloom-in 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* Stagger: each item 40ms after previous */
.feed-item:nth-child(1) { animation-delay: 0ms; }
.feed-item:nth-child(2) { animation-delay: 40ms; }
.feed-item:nth-child(3) { animation-delay: 80ms; }
/* ... up to 8 items staggered */
```

- Duration: 320ms (unhurried — this is not a game, items do not pop in)
- Easing: deceleration `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — items arrive and settle
- Properties: `opacity` and `translateY` only — compositor-safe, no layout jank
- Stagger: 40ms per item — gentle cascade, not overwhelming

**No spring bounce on fan.html.** The spring easing (`cubic-bezier(0.34,1.56,0.64,1)`) belongs to the artist profile — it is expressive and energetic. fan.html is quieter. Items arrive; they don't bounce in.

### Tab transitions (view panels)

```css
.fan-view {
  transition: opacity 200ms ease;
}

.fan-view.entering {
  opacity: 0;
}

.fan-view.active {
  opacity: 1;
}
```

200ms crossfade only. No slide. Tab switching is a context change, not a navigation event.

### Touch feedback

```css
.feed-item:active,
.artist-card:active,
.show-item:active {
  transform: scale(0.99);
  transition: transform 80ms ease;
}
```

Scale 0.99 — just perceptible. Not 0.95 (that's too much). Fan.html is not bouncy. It is settled.

### Close Circle invitation reveal

On first show (after 14 days of following, non-supporter):
```css
.cc-invitation {
  animation: bloom-in 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 120ms;  /* Slight delay — arrives after feed items */
}
```

On dismiss:
```css
.cc-invitation.dismissing {
  animation: bloom-out 200ms ease forwards;
}

@keyframes bloom-out {
  to { opacity: 0; height: 0; padding: 0; margin: 0; overflow: hidden; }
}
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .bloom-in,
  .cc-invitation,
  .badge-tonight {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .fan-view {
    transition: none;
  }

  .feed-item:active,
  .artist-card:active {
    transform: none;
  }
}
```

No motion at all under `prefers-reduced-motion: reduce`. All transitions disabled. Content is still readable and usable.

---

## Skeleton loading states

Used when real Supabase data is loading (Phase 2):

```css
@keyframes skeleton-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.3; }
}

.skeleton {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

/* Feed item skeleton */
.skeleton-feed-item {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  margin-left: 20px;
  margin-right: 20px;
}

.skeleton-artwork {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
}

.skeleton-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.skeleton-line {
  height: 12px;
  border-radius: 4px;
}

.skeleton-line.wide { width: 60%; }
.skeleton-line.medium { width: 40%; }
.skeleton-line.narrow { width: 25%; }
```

Skeleton dimensions match real item dimensions precisely — prevents CLS (Cumulative Layout Shift) when real data replaces skeletons.

---

## View Transition (CSS View Transitions API — P2, progressive enhancement)

```css
/* able-v7.html */
.fan-dashboard-link {
  view-transition-name: fan-nav-wordmark;
}

/* fan.html */
.fan-header .wordmark {
  view-transition-name: fan-nav-wordmark;
}
```

The ABLE wordmark slides from the artist profile header into the fan dashboard header. The transition takes approximately 280ms with the system's default transition easing.

**Progressive enhancement:** Chrome 126+ only. Standard navigation as fallback on all other browsers. No polyfill needed — degradation is graceful and invisible.

---

## PWA manifest (P2)

```json
{
  "name": "ABLE",
  "short_name": "ABLE",
  "description": "The artists you follow, in one place.",
  "start_url": "/fan.html",
  "display": "standalone",
  "background_color": "#0d0e1a",
  "theme_color": "#8b7cf4",
  "icons": [
    { "src": "/icons/able-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/able-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

`theme_color: #8b7cf4` applies ABLE's platform accent to the Android status bar when the PWA is running standalone. On iOS: `<meta name="theme-color" content="#8b7cf4">`.

---

## Spacing and layout constants

```css
:root {
  --fan-page-margin:    20px;    /* Horizontal margin for all content */
  --fan-card-radius:    14px;    /* Standard card radius */
  --fan-pill-radius:    20px;    /* Pills and badges */
  --fan-gap-sm:         8px;
  --fan-gap-md:         12px;
  --fan-gap-lg:         20px;
  --fan-gap-section:    28px;    /* Between major sections */
}
```

---

## Component summary

| Component | Where used | Key design decision |
|---|---|---|
| Feed item | Following view | Artist accent left border, artist name as `color-text-2` |
| Section label | Following, Near me | 11px uppercase, 0.06em tracking, `color-text-3` |
| Pre-release strip | Following view (above Today) | Accent left border, Barlow Condensed countdown NOT used |
| Tonight badge | Feed items + Near me | Amber `#f4b942`, subtle pulse |
| Caught-up state | Below feed items | `— you're up to date —` with decorative rules |
| Empty state | All empty contexts | No emoji, honest copy, only CTA when actionable |
| Cold-start row | First visit, Following | "Because you follow [Artist] —" label |
| Artist card | Discover view | Accent left border, no follower count |
| Show item | Near me view | Date block + ticket button, followed = accent left strip |
| CC invitation | Following view (14d+) | Accent left border, "Come closer" / "Keep as is" |
| Dispatch card | Following, Close Circle | 2-line preview, opens to full bottom sheet |
| Dispatch reader | Bottom sheet | 16px / 1.75 line height, no social metadata |
| Notification panel | Bottom sheet (bell tap) | "Updates from your artists," specific per-type copy |
| Me tab settings | Bottom sheet (me tap) | "You" as page title, data ownership statement |
| Skeleton | Loading states | Matches real item dimensions precisely |
| PWA prompt | After 3rd visit, once | "One tap to see what's new from your artists." |

---

## What fan.html must never look like

- **A social media app** — no engagement counts, no like buttons, no share counts
- **A streaming app** — no waveforms, no visualisers, no album art grids for browsing
- **A ticketing app** — tickets are present (Near me) but the page is not organised around them
- **A Patreon page** — no tier comparison, no benefit checklists, no "you're missing out" pressure
- **A generic SaaS dashboard** — no "last 30 days" charts, no "engagement rate" stats, no empty widgets

It is a quiet room where the artists you chose are present. Design for that.
