# ABLE v3 — Refined Design Specification
**Date:** 2026-03-12
**Status:** Active — supersedes 2026-03-10-able-v3-design.md for product logic and visual decisions
**Output file:** `able-v3.html`

---

## What changed from v3 original spec

The original spec (2026-03-10) established the shell, token system, and layout. This spec adds:

1. **Product logic** — fan arrival flow from social reels
2. **Three page states** — Pre-release / Live / Profile
3. **Top card model** — artist-chosen content type per release
4. **Admin model** — slide-up panel with live preview
5. **Colour update** — accent changed from `#3b82f6` to electric cyan `#06b6d4`
6. **Typography update** — DM Sans replaces Plus Jakarta Sans

---

## Design DNA (updated)

| Decision | Choice | Rationale |
|---|---|---|
| Base colour | Midnight Navy `#0d0e1a` | Unchanged — deep, premium, not cold tech |
| Accent colour | Electric cyan `#06b6d4` | Brighter, more distinctive than generic blue. High contrast on dark. |
| Typography | DM Sans | Friendly, warm, fan-first — slightly rounder than Plus Jakarta Sans |
| Feel | iOS-native app, not link-in-bio | Bottom tab bar, card sheets, spring easing |
| Hero model | Fan-arrival continuation | Fan came from a reel → page feels like the reel continued, not a landing page |
| Top card | Artist-chosen per release | Video / artwork / embed — set in admin |
| Sections | Tab-based deep sections | Home panel converts; Music/Events/Merch/Support are discovery tabs |

---

## Colour Tokens (updated)

```css
--color-bg:             #0d0e1a;
--color-card:           #12152a;
--color-card-raised:    #181c35;
--color-border:         rgba(255,255,255,0.08);
--color-border-mid:     rgba(255,255,255,0.12);
--color-accent:         #06b6d4;   /* electric cyan — artist brand colour */
--color-accent-dark:    #0891b2;   /* darker variant for gradients */
--color-accent-glow:    rgba(6,182,212,0.35);
--color-accent-soft:    rgba(6,182,212,0.08);
--color-text-primary:   #ffffff;
--color-text-secondary: rgba(255,255,255,0.55);
--color-text-muted:     rgba(255,255,255,0.35);
--color-tab-bg:         rgba(10,11,22,0.97);

/* State colours */
--color-pre-release:    #fbbf24;   /* amber — anticipation */
--color-live:           #ef4444;   /* red — out now */
--color-profile:        #06b6d4;   /* cyan — evergreen */
```

---

## Typography Tokens (updated)

```css
--font-body: 'DM Sans', system-ui, sans-serif;

/* Scale */
--text-hero:   22px / 700 weight / -0.5px tracking   /* artist name */
--text-title:  17px / 700 weight / -0.4px tracking   /* section headings */
--text-body:   13px / 400 weight / 0px tracking       /* bio, descriptions */
--text-label:  11px / 600 weight / 0.04em tracking    /* caps labels */
--text-small:  10px / 500 weight / 0px tracking       /* metadata */
--text-micro:   9px / 600 weight / 0.06em tracking    /* badges, tags */
```

---

## Fan Arrival Flow (core product logic)

```
Fan watches a reel/short on Instagram / TikTok / YouTube
    ↓
Caption: "check my link in bio ↑"
    ↓
Fan taps link → lands on ABLE profile
    ↓
TOP CARD = the same video/content they were just watching
No context switch. Continuation of the scroll.
    ↓
CTAs sit directly on the card: Stream / Pre-save / Tickets
    ↓
Conversion happens before they read the bio
    ↓
They scroll down → artist info → music / events / merch (discovery)
```

**Design implication:** The top card is not decorative — it is the primary conversion surface.

---

## Three Page States

### Pre-release
- Top card shows: release artwork + countdown timer
- Primary CTA: Pre-save (Spotify / Apple Music)
- Secondary CTA: Notify me (email/push)
- Accent override: amber `#fbbf24` for countdown elements
- Auto-activates: when release date is set but not yet reached

### Live / Out Now
- Top card shows: video embed (artist's reel/video) OR artwork if no video
- Primary CTA: Stream Now
- Secondary CTA: context-dependent (Tickets / Follow / Buy Merch)
- Auto-activates: on release date
- "Out Now" badge shown

### Profile / Evergreen
- Top card shows: artist info (avatar, name, genre, bio snippet)
- Primary CTA: Stream (latest release)
- Secondary CTA: Most relevant action (tickets if touring, merch if selling)
- Platform pills (Spotify, Apple Music, etc.)
- Default state when no active release

### State switching
- **Default**: Auto by release date (artist sets date → system handles transitions)
- **Override**: Manual toggle in admin panel — artist can force any state at any time
- **Use case for override**: Delayed drop, label hold, exclusive window

---

## Top Card — Content Types

Artist picks one per release. Set in admin. Can be changed at any time.

| Type | Content | Best for |
|---|---|---|
| Video | YouTube / TikTok / Instagram embed | Artists with a reel/MV/short — seamless fan arrival |
| Artwork | Release cover art + title + artist name | Pre-release, no video yet, clean aesthetic |
| Music embed | Spotify / Apple Music / SoundCloud player | Artists who want fans to listen right there |

**Fallback order:** if no type set → artwork. If no artwork → artist avatar + name.

---

## Music Section — Display Modes

Artist picks one per release. Set in admin.

| Mode | What it shows |
|---|---|
| Tracklist | Clean numbered list with artwork thumbnails — platform-agnostic |
| Embeds | Native Spotify / Apple Music / SoundCloud / YouTube players |
| Both | Tracklist above, embeds below (for artists with multiple platforms) |

---

## Admin Experience — Slide-up Panel

Artist views their own page exactly as a fan does.

Unlocked by: being logged in (auth layer TBD — could be URL param for now).

**Edit button**: floating in bottom-right corner when logged in. Tap → slide-up panel.

**Panel contains:**
- Page state (Pre-release / Live / Profile) + release date picker
- Top card type selector (Video / Artwork / Embed) + URL input
- Music display mode (Tracklist / Embeds / Both)
- Active CTAs (primary + secondary URL + label)
- Theme picker (Dark / Light / Contrast / Glass)
- Save button

**UX rules:**
- Panel slides up 60% of screen height — fan page still visible behind it
- Changes apply live to the page behind the panel (no page reload)
- Save persists to localStorage (or API when backend exists)

---

## Layout Structure

### Home panel (primary conversion)

```
┌─────────────────────────────┐
│ Status bar                  │
│─────────────────────────────│
│                             │
│  TOP CARD                   │ ← video / artwork / embed
│  [content area]             │   artist-chosen per release
│  [CTAs: primary + secondary]│
│                             │
│─────────────────────────────│
│  Artist name + genre        │ ← identity strip (always visible)
│  Platform pills             │
│─────────────────────────────│
│  Music section preview      │ ← 2-3 tracks or mini embed
│  [→ See all in Music tab]   │
│                             │
└─────────────────────────────┘
│ Tab bar: Home · Music · Events · Merch · Support │
```

### Deep tabs (discovery)

Each tab is a full scrollable panel. Music, Events, Merch, Support follow card-grid patterns established in current v3.html.

---

## CTA Architecture (unchanged from CLAUDE.md)

1. **Hero CTAs** — max 2 (primary + secondary). On the top card.
2. **Quick Action pills** — max 4 narrow / 6 wide. Platform links.
3. **Section Action Buttons** — max 2 per section.

Global dedupe: same URL cannot appear in multiple zones. Hero wins.

---

## Themes (unchanged)

All four must work:
- **Dark** (default): `#0d0e1a` base
- **Light**: inverted surface, dark text
- **Contrast**: pure black / pure white, max legibility
- **Glass**: backdrop-filter blur(28px) saturate(180%), frosted surfaces

---

## Implementation notes for able-v3.html

- Update `--color-accent` from `#3b82f6` → `#06b6d4`
- Update `--color-accent-glow` accordingly
- Update font import: DM Sans replaces Plus Jakarta Sans
- Add `--color-accent-dark: #0891b2` token
- Add state system: `data-state="pre-release|live|profile"` on `<body>` or root element
- Top card: conditional rendering based on `profile.topCard.type`
- Admin panel: slide-up sheet with `transform: translateY()` animation
- State colours: CSS variables per state, swapped via JS class on root

---

## Open questions (decide during implementation)

1. Auth: how does the artist "log in" to see the edit button? URL param `?edit=true` for now?
2. Persistence: localStorage for v1, API for v2?
3. Onboarding: how does a new artist set up their first page?
4. Analytics: click tracking on CTAs (which zone, which link)?
