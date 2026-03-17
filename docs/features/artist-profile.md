# Feature: Artist Profile Page (able-v7.html)
**Status: ✅ Built | V1**

---

## What it is

The fan-facing page. The link an artist puts in their Instagram bio. The place a fan lands and decides whether to sign up. Every design decision on this page exists to serve one outcome: fan signs up.

It is not a social profile. It is not a portfolio. It is a conversion page that feels like the artist's world.

---

## Page structure (top to bottom)

1. **Top card** — artwork / video embed / Spotify embed. State-dependent.
2. **Hero CTAs** — max 2. Primary (accent fill) + secondary (ghost). State-dependent.
3. **Quick Action pills** — max 4 narrow / 6 wide. Platform links, secondary actions.
4. **Music section** — releases with oEmbed previews, stream CTAs.
5. **Events/shows section** — upcoming shows with ticket links.
6. **Merch section** — merch items with buy links.
7. **Snap cards** — short-form content cards (links, notes, video clips).
8. **Fan capture** — email sign-up with trust line.
9. **Footer** — "Made with ABLE ✦" (growth loop).

---

## CTA architecture

Three zones, strict caps — must never regress:

| Zone | Cap | Notes |
|---|---|---|
| Hero CTAs | Max 2 | Primary = accent fill, secondary = ghost |
| Quick Action pills | Max 4 narrow / 6 wide | + overflow toggle |
| Section Actions | Max 2 per section | Music, Events, Merch, Support |

**Global dedupe rule:** same URL cannot appear in more than one zone. Hero wins.

---

## Campaign state rendering

The top card and hero CTAs change based on campaign state:

| State | Top card | Primary CTA |
|---|---|---|
| `profile` | Artist artwork | "Stream [release]" |
| `pre-release` | Countdown timer | "Pre-save [release]" |
| `live` | Music/video embed | "Stream [release]" — dominant |
| `gig` | Venue info / artwork | "Get tickets" |

---

## Design tokens

```css
--color-bg:     #0d0e1a    /* Midnight Navy */
--color-card:   #12152a
--color-accent: artist-set  /* default #e05242 */
--font:         'DM Sans'
--font-display: 'Barlow Condensed'  /* hero artist name only */
```

---

## Four themes

All four must work after any CSS change:

| Theme | Base | Notes |
|---|---|---|
| Dark (default) | `#0d0e1a` | Standard |
| Light | `#f0ede8` | Warm cream, dark text |
| Glass | backdrop-filter blur | Requires background artwork |
| Contrast | `#000000` | Maximum contrast |

---

## Analytics on fan page

- `recordView()` — once per session (deduped by sessionId)
- `recordClick(label, type, url)` — on every CTA tap
- `isArtistVisit()` — tags artist's own views, excluded from display stats
- PostHog and Clarity: **admin.html only** — not on this page (privacy policy conflict)

---

## Key localStorage reads

| Key | Used for |
|---|---|
| `able_v3_profile` | Everything — name, bio, accent, CTAs, release info, state |
| `able_shows` | Events section |
| `able_gig_expires` | Gig mode check |
| `able_fan_following` | Fan's own following state (for returning fans) |

---

## Files

| File | Role |
|---|---|
| `able-v7.html` | Complete fan-facing page |
| `netlify/functions/oembed-proxy.js` | oEmbed proxy for music embeds (SSRF-fixed) |
| `netlify/functions/fan-confirmation.js` | Called after fan sign-up |

---

## Spec reference

`docs/pages/profile/DESIGN-SPEC.md` — full page spec
`docs/systems/MICRO_INTERACTIONS_SPEC.md` — motion spec
`docs/systems/copy/SPEC.md` — copy register and banned phrases
