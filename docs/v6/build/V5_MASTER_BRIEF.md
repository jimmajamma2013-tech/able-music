# ABLE v5 — Master Design Brief

> **Build doc — rank 4 in authority chain.** Where values in this document conflict with `V6_BUILD_AUTHORITY.md` (rank 1) or `V5_RESEARCH_ADDENDUM.md` (rank 2), those documents win. Known divergences in this doc: body font is listed as Plus Jakarta Sans (superseded — use DM Sans for v6 profile page); vibe r-mult values for Hip Hop (0.5 → 0.7), R&B (1.4 → 1.2), Pop (1.6 → 1.4), Rock (0.4 → 0.6) differ from V6_BUILD_AUTHORITY.md Section 3.1 — use the authority table; Pop font lists "Nunito 800 OR Barlow Condensed 800" — resolved to Barlow Condensed 700 only; dark bg is `#0a0a0f` — resolved to `#0d0e1a`; letter spacing values for Electronic and Hip Hop use negative values (tight) — resolved in authority doc Section 3.1. This document remains useful for its strategic and structural content; use Section 3.1 of V6_BUILD_AUTHORITY.md for all exact token values.

**Synthesised from: 80+ design references, 50+ artist profiles, 12 strategy documents, 100-interaction library**
**Last updated: 2026-03-13**

---

## 1. Who this page is for

### The artist (who built this page)
A UK independent musician earning £8k–£25k/year. They release music regularly, have 5k–80k social followers, and are deeply suspicious of anything that feels corporate, generic, or transactional. They read your landing page copy in three sentences and know whether it was written by someone who understands them. They chose ABLE because the page looks like them — not like every other link-in-bio. Their biggest anxiety: being dependent on an algorithm that can vanish tomorrow. Their biggest desire: a direct line to the people who actually show up.

### The fan (arrives from a social bio link)
Landed here from an Instagram Reel or TikTok video. They are already interested — they clicked. They need three things in five seconds: who this person is, what they're releasing right now, and one obvious thing to do. They do not want to be bombarded. They want to feel close. If they sign up to an email list, it should feel like a choice they made, not a form they filled in.

### The industry person (manager, label, booker, journalist)
Arrived via a referral or Google. They are assessing credibility. They need: real numbers, professional presentation, a clear sense of the artist's world and fanbase. They will notice if the page looks like a template. They need to feel: "This is a serious artist."

---

## 2. Visual register the research demands

### Emotional target
Premium without coldness. Music-first without chaos. Artist-specific without being bespoke-built. The page should feel like the artist is speaking directly — not a platform presenting them.

### What 80 references collectively demand for 2026
- **Darkness is the ground** — 15 of the top 20 music companies default dark. Dark = premium in music. It makes artwork glow. It creates focus. It is not a trend — it is the correct register for this audience.
- **Artwork is the content** — The UI should recede behind the artist's imagery. Spotify's lesson: the artwork is the hero; the interface is the frame.
- **One signature colour** — Spotify green, SoundCloud orange, Beatport neon. ABLE gives this to the artist. Their accent colour is their identity. It must bleed into 7+ places: CTAs, pill borders, glow, scroll track, active tabs, date blocks, input focus.
- **Typography at poster scale** — Paula Scher's principle: typography IS the image. The artist name should feel like a concert poster headline, not an app label. Genre-specific display fonts are not a nice-to-have — they are the single strongest differentiator.
- **Spring physics as baseline** — Tobias van Schneider, Emil Kowalski, Jason Yuan all point the same direction: spring-feel motion is now the baseline for premium UI. `ease` and `linear` feel broken by comparison.
- **Artwork-derived ambient colour** — Jason Yuan's Apple Music work. The dominant colour from the hero artwork bleeds into the background gradient. The page literally responds to the artist's visual world. This is the highest-value single feature in the design system.
- **Surgical restraint** — Jony Ive, Paco Coursey, Rasmus Andersson. Every element must justify its existence. If in doubt, remove it. Density is the enemy of premium.

### Colour system philosophy
**Do not anchor to Midnight Navy.** The base dark colour should be near-black but not pure black — warm enough to feel musical, cool enough to feel modern. `#0a0a0f` to `#0e0e1a` range. The artwork ambient colour system means the background is never truly static — it breathes with the artist's content. This makes every artist's page feel unique without custom development.

---

## 3. The 7-vibe genre system

The foundational differentiator. One vibe class on `<body>` changes the entire visual language.

### Electronic / Club
- **Display font**: Barlow Condensed 700, uppercase, tight tracking (`--ls-d: -0.02em`)
- **Accent palette**: Cyan `#06b6d4` primary / Amber `#f59e0b` alternative
- **Border radius**: `--r-mult: 0.6` (sharp, geometric)
- **Gradient**: stark angle (135°), high contrast, minimal spread
- **Letter spacing labels**: `0.15em` uppercase
- **Copy tone**: Minimal, action-only. "Hear it." "On now." "Get in."
- **Emotional quality**: Precision. The grid is everything. Energy without chaos.

### Hip Hop / Rap
- **Display font**: Oswald 700, uppercase, very tight (`--ls-d: -0.03em`)
- **Accent palette**: Gold `#f4b942` primary / Red `#e05242` alternative
- **Border radius**: `--r-mult: 0.5` (square, authoritative)
- **Gradient**: bold angle (120°), stark, high contrast
- **Letter spacing labels**: `0.1em`
- **Copy tone**: Direct, possessive. "Get the tape." "Stream it." "I'm on tonight."
- **Emotional quality**: Confidence without apology. Cultural authority. Realness.

### R&B / Soul
- **Display font**: Cormorant Garamond 600 Italic, mixed case, loose (`--ls-d: 0.01em`)
- **Accent palette**: Rose `#e06b7a` primary / Gold `#c9973a` alternative
- **Border radius**: `--r-mult: 1.4` (soft, intimate)
- **Gradient**: warm angle (160°), diffuse, romantic
- **Letter spacing labels**: `0.08em`
- **Copy tone**: Intimate, inviting. "Come listen." "It's out." "Stay close."
- **Emotional quality**: Warmth, vulnerability, elegance. The velvet underground.

### Indie / Alternative
- **Display font**: Space Grotesk 700, mixed case, natural (`--ls-d: -0.01em`)
- **Accent palette**: Sage `#7ec88a` primary / Rust `#c4602a` alternative
- **Border radius**: `--r-mult: 1.0` (neutral, honest)
- **Gradient**: offset angle (150°), slightly imperfect, textured feel
- **Letter spacing labels**: `0.06em`
- **Copy tone**: Low-key, genuine. "New one's up." "Come if you're near." "Just released this."
- **Emotional quality**: Raw authenticity. Imperfect on purpose. Not trying to impress.

### Pop
- **Display font**: Barlow Condensed 800 OR Nunito 800, uppercase/mixed, wide (`--ls-d: 0.02em`)
- **Accent palette**: Indigo `#9b7cf4` primary / Rose `#f472b6` alternative
- **Border radius**: `--r-mult: 1.6` (rounded, approachable)
- **Gradient**: bright angle (140°), wide spread, energetic
- **Letter spacing labels**: `0.12em`
- **Copy tone**: Energetic, inclusive. "Stream now!" "We're going on tour." "New era."
- **Emotional quality**: Joyful confidence. Inclusive energy. Built for sharing.

### Rock / Metal
- **Display font**: Oswald 800, uppercase, very tight (`--ls-d: -0.04em`)
- **Accent palette**: Red `#e05242` primary / White `#f0f0f0` alternative
- **Border radius**: `--r-mult: 0.4` (sharp, aggressive)
- **Gradient**: dark angle (125°), stark, almost none
- **Letter spacing labels**: `0.2em` uppercase
- **Copy tone**: Blunt, no fluff. "Tickets." "New record out." "Watch it."
- **Emotional quality**: Power, grit. Darkness as aesthetic choice. Unapologetic.

### Acoustic / Folk / World
- **Display font**: Lora 700, mixed case, natural (`--ls-d: 0.005em`)
- **Accent palette**: Ochre `#d4a96a` primary / Sage `#7ec88a` alternative
- **Border radius**: `--r-mult: 1.3` (soft, organic)
- **Gradient**: warm angle (155°), diffuse, gentle
- **Letter spacing labels**: `0.05em`
- **Copy tone**: Warm, personal. "New song — hope it finds you well." "Playing near you." "From my living room."
- **Emotional quality**: Organic warmth. The handwritten note. Human above all else.

---

## 4. Design token system

```css
:root {
  /* === COLOUR === */
  --color-bg:          #0a0a0f;       /* near-black base */
  --color-surface:     #111118;       /* elevated surface */
  --color-card:        #16161f;       /* card background */
  --color-border:      rgba(255,255,255,0.08);
  --color-border-acc:  rgba(var(--acc-rgb), 0.3);

  --color-text:        #f0f0f4;       /* primary text */
  --color-text-2:      rgba(240,240,244,0.6);  /* secondary */
  --color-text-3:      rgba(240,240,244,0.35); /* tertiary / muted */

  --color-accent:      #e05242;       /* artist-set, single source of truth */
  --acc-rgb:           224,82,66;     /* for rgba() usage */
  --color-accent-hi:   color-mix(in oklch, var(--color-accent) 80%, white); /* hover */
  --color-accent-lo:   color-mix(in oklch, var(--color-accent) 60%, black); /* pressed */
  --color-accent-ghost: rgba(var(--acc-rgb), 0.12); /* ghost fill */
  --color-accent-glow:  rgba(var(--acc-rgb), 0.25); /* glow / shadow */

  --color-ambient:     0,0,0;         /* overridden by artwork extraction JS */

  /* === TYPOGRAPHY === */
  --font-body:   'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif;
  --font-d:      'Barlow Condensed', sans-serif;  /* overridden per vibe */

  --text-xs:     0.6875rem;   /* 11px */
  --text-sm:     0.8125rem;   /* 13px */
  --text-base:   0.9375rem;   /* 15px */
  --text-md:     1.0625rem;   /* 17px */
  --text-lg:     1.25rem;     /* 20px */
  --text-xl:     1.5rem;      /* 24px */
  --text-2xl:    2rem;        /* 32px */
  --text-3xl:    2.5rem;      /* 40px */
  --text-hero:   clamp(2.5rem, 10vw, 4rem); /* artist name */

  --ls-d:        -0.02em;     /* display letter-spacing — overridden per vibe */
  --ls-label:    0.08em;      /* caps label spacing */
  --ls-body:     0;

  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;
  --fw-black:    800;

  /* === SPACING === */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* === SHAPE === */
  --r-base:  14px;
  --r-mult:  1;    /* overridden per vibe */
  --r-sm:    calc(var(--r-base) * var(--r-mult) * 0.5);
  --r-md:    calc(var(--r-base) * var(--r-mult));
  --r-lg:    calc(var(--r-base) * var(--r-mult) * 1.5);
  --r-xl:    calc(var(--r-base) * var(--r-mult) * 2.5);
  --r-pill:  999px;

  /* === MOTION === */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);   /* bouncy entrance */
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94); /* content sliding in */
  --ease-accel:    cubic-bezier(0.55, 0.00, 1.00, 0.45); /* exit / dismiss */
  --ease-standard: cubic-bezier(0.40, 0.00, 0.20, 1.00); /* state changes */

  --dur-instant:  80ms;
  --dur-fast:     150ms;
  --dur-base:     250ms;
  --dur-slow:     400ms;
  --dur-xslow:    600ms;

  /* === COMPONENTS === */
  --tap-min:      44px;
  --cta-h:        56px;
  --pill-h:       40px;
  --tab-h:        64px;
  --status-bar-h: 44px;
  --safe-bottom:  env(safe-area-inset-bottom, 20px);

  /* === ELEVATION === */
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2);
  --shadow-md:  0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg:  0 8px 32px rgba(0,0,0,0.5);
  --shadow-acc: 0 4px 20px var(--color-accent-glow);
}
```

**Token override strategy:**
- **Theme classes** override: `--color-bg`, `--color-surface`, `--color-card`, `--color-text`, `--color-border`
- **Vibe classes** override: `--font-d`, `--ls-d`, `--ls-label`, `--r-mult`, gradient variables, default `--color-accent`
- **Artist accent**: Set via JS from profile data → overrides `--color-accent` and `--acc-rgb` on `:root`

---

## 5. Micro-interaction shortlist (40 non-negotiable for v5)

### Form & capture (9)
| # | Interaction | Mechanism |
|---|-------------|-----------|
| 61 | Email input focus glow | CSS: border + box-shadow in accent, 150ms standard |
| 62 | Floating label | CSS: label transforms up on focus/filled |
| 64 | Submit loading → checkmark | JS: spinner 100ms → checkmark 300ms spring |
| 65 | Error shake | CSS: @keyframes horizontal oscillation + red border |
| 66 | Success morph | JS: button collapses to circle, checkmark appears |
| 69 | Paste detection | JS: flash input background on paste event |
| 70 | Wizard progress | CSS: progress bar fills with decel easing |
| 79 | Fan signup confetti | JS: 40 particles, 3 accent-tinted colours, spring physics |
| 85 | Email shown back | JS: "We've got you — email@address.com" replaces form |

### Navigation & state (10)
| # | Interaction | Mechanism |
|---|-------------|-----------|
| 31 | Tab slide indicator | JS: dot translates to active tab, spring bounce |
| 32 | Campaign state crossfade | JS: hero content fades out, new fades in, 400ms |
| 33 | Theme transition | CSS: transition on bg/color, 300ms standard |
| 34 | Gig mode flash | JS: full-screen accent overlay 200ms, then fade |
| 35 | Countdown digit flip | JS: 3D rotateX, 300ms per digit |
| 36 | Live pulsing dot | CSS: @keyframes opacity 1→0.4, 2s loop |
| 37 | Gig badge pulse | CSS: scale 1→1.05→1, 1.5s loop |
| 99 | Scroll-to-top on re-tap | JS: smooth scroll if already on active tab |
| 50 | Bottom sheet slide-up | JS: translateY 100%→0, spring easing |
| 8  | Tab bar hide on scroll | JS: IntersectionObserver → translateY(100%) on scroll down |

### Entrance & loading (11)
| # | Interaction | Mechanism |
|---|-------------|-----------|
| 7  | Scroll-triggered entrances | JS: IntersectionObserver, fade + translateY(20px), 60ms stagger |
| 46 | Staggered card bloom | JS: cards appear in waves, 60ms between, spring |
| 47 | Hero name reveal | CSS: @keyframes slide-up + fade, 300ms decel, on load |
| 48 | Platform pill wave | JS: pills appear with 40ms stagger, spring |
| 49 | Tab bar slide up | CSS: slides up from bottom on load, 400ms decel |
| 52 | Skeleton → content crossfade | JS: skeleton fades out 100ms, content fades in 200ms |
| 55 | Toast slide-in | JS: translateY(-100%) → 0, spring, auto-dismiss 3s |
| 59 | Stats counter count-up | JS: requestAnimationFrame, easeOutQuart, 1.5s |
| 71 | Shimmer skeleton | CSS: @keyframes shimmer gradient, 1.5s loop |
| 73 | Progressive blur-up | CSS: blur(20px)→blur(0) as image loads, 300ms |
| 3  | Lazy image fade-in | JS: IntersectionObserver, opacity 0→1, 250ms |

### Touch & tap (6)
| # | Interaction | Mechanism |
|---|-------------|-----------|
| 16 | Scale-down on press | CSS: active → scale(0.97) opacity(0.9), instant |
| 17 | Spring-back release | CSS: → scale(1.02) → scale(1.0), spring |
| 19 | Colour flash on tap | CSS: active → background flashes accent 150ms |
| 21 | Platform pill press | CSS: active → scale(0.95) + accent border |
| 22 | CTA glow on press | CSS: active → box-shadow accent spreads |
| 83 | Copy-link flash | JS: button text → "Copied!" + accent flash, 2s |

### Ambient & reward (4)
| # | Interaction | Mechanism |
|---|-------------|-----------|
| 74 | Artwork ambient colour | JS: canvas.getImageData → --color-ambient-rgb |
| 87 | Accent glow breathing | CSS: @keyframes box-shadow pulse, 3s loop, subtle |
| 80 | CTA success ripple | CSS: @keyframes radial expand from tap point |
| 84 | Pre-save star burst | JS: 8 stars radiate from button, spring |

---

## 6. Copy system

### Banned phrases (never appear in any UI)
`grow`, `audience`, `monetise`, `convert`, `engage`, `content creator`, `followers`, `going viral`, `superfans` (in public UI), `get started`, `unlock`, `leverage`, `power up`, `boost`, `you're all set`, `sign up`, `subscribe`

### Section naming canon
| Wrong | Right |
|-------|-------|
| Music | Listen |
| Events | Shows |
| Buy / Shop | Support |
| Subscribe | Stay close |
| Followers | — (never show) |
| Content | — (never use this word) |

### Artist-voice principle
Every word on the profile page is the artist speaking. Not ABLE introducing them. Not a platform describing them. The artist.

- Bio: first person. "I make music that..." not "Artist makes music that..."
- Fan capture: "I'll only reach out when something's actually happening." (artist's promise)
- Gig tag: "I'm playing tonight" not "Gig mode activated"
- Release tag: "Out now" / "Dropping [date]" (present tense, direct)

### Fan capture wording (non-negotiable)
- Input placeholder: `your email`
- Submit button: `Stay close.`
- Post-submit: `We've got you — [email]` then below: `I'll only reach out when something's actually happening.`

### Empty states (every section needs one — never blank)
- No shows: `Nothing booked right now — check back soon.`
- No music: `First release coming.`
- No merch: `Nothing in the shop yet.`
- No snap cards: `[silence is intentional]` — don't render the section at all

### Register by vibe (CTAs adapt)
- Electronic: "Hear it" / "On now" / "Get in"
- Hip Hop: "Get the tape" / "Stream it" / "I'm on"
- R&B: "Come listen" / "It's out" / "Stay close"
- Indie: "New one's up" / "Come if you're near"
- Pop: "Stream now" / "We're on tour" / "New era"
- Rock: "Tickets" / "New record" / "Watch it"
- Folk: "New song" / "Playing near you" / "From my living room"

---

## 7. CTA architecture

### Three zones, strict caps
1. **Hero CTAs** — max 2. Full width. Primary = accent fill (`--cta-h: 56px`). Secondary = ghost border.
2. **Quick Action pills** — max 4 visible at 375px, max 6 on wider viewports. Overflow toggle reveals rest.
3. **Section Actions** — max 2 per section (Listen, Shows, Support). Never exceed.

### Global dedupe rule
Same URL cannot appear in multiple zones. Hero wins. If Spotify is a Hero CTA, it cannot also be a Quick Action pill.

### CTA types
`stream` / `pre-save` / `follow` / `support` / `merch` / `tickets` / `watch` / `custom`

Each type has a default icon and a default label suggestion (can be overridden by artist).

### Visual hierarchy
- **Primary**: accent background, white text, full shadow
- **Secondary / ghost**: accent border, accent text, transparent fill
- **Pill**: surface background, secondary text, accent border on hover/active
- **Section action**: ghost, smaller, inline with section content

---

## 8. Page sections and information hierarchy

### Universal order (all states)
1. iOS shell / status bar
2. **Hero** (artwork, name, release tag, 2 CTAs)
3. Bio strip (2–3 sentences, expandable)
4. Quick action pills (platforms)
5. **Fan capture** (email sign-up — above the fold on mobile where possible)
6. Listen section
7. Shows section
8. Snap cards (horizontal scroll)
9. Merch section
10. Support section
11. Artists I'm digging (optional)
12. Credits strip

### State overrides
- **Pre-release**: countdown replaces release tag in hero; primary CTA → pre-save; fan capture copy changes to "Be first to hear it."
- **Live**: hero artwork maximised; primary CTA → stream; energy tokens increase (glow stronger)
- **Gig**: Shows section floats to position 3 (below bio); gig badge in hero; primary CTA → tickets; pulsing everywhere

---

## 9. Campaign states

| State | Trigger | Hero changes | CTA changes | Colour intensity |
|-------|---------|-------------|-------------|-----------------|
| `profile` | Default / >14d post-release | Latest artwork, soft glow | "Listen" primary | Normal |
| `pre-release` | `releaseDate` in future | Countdown overlay on artwork | "Pre-save" primary | Builds toward release |
| `live` | `releaseDate` to +14d | Artwork full bleed, max glow | "Stream it" primary | Maximum |
| `gig` | Manual toggle, 24hr TTL | Venue/time overlay | "Get tickets" primary | Pulsing, urgent |

### Auto-switch logic
```js
const now = Date.now();
const rel = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null;
const gigExp = localStorage.getItem('able_gig_expires');

if (gigExp && now < parseInt(gigExp)) return 'gig';
if (rel && now < rel) return 'pre-release';
if (rel && now < rel + 14 * 86400000) return 'live';
return 'profile';
```

### State transitions
- Any → any: hero content crossfade 400ms (`--ease-standard`)
- Any → gig: full-screen accent flash 200ms first, then crossfade
- Gig → profile: slowest (500ms), calm return

---

## 10. Performance requirements

| Requirement | Target | Method |
|-------------|--------|--------|
| First meaningful paint | <2s on 4G | Critical path = hero only; all else lazy |
| Tap targets | ≥44px all interactive | CSS min-height/min-width |
| Horizontal scroll | None at 375px | overflow-x: hidden on shell |
| Image loading | Lazy below fold | loading="lazy" + IntersectionObserver fade |
| Font loading | Active vibe only | Dynamic link tag injection on vibe select |
| JS blocking | None | All script tags deferred, bottom of body |
| Ambient colour | Non-blocking | requestIdleCallback for canvas extraction |

### Critical path (must render without waiting for anything)
- Artist name
- Hero artwork (with blur-up placeholder)
- Primary + secondary CTAs

### Lazy-loaded
- Platform pills (after 100ms)
- Music section
- Events (Bandsintown API)
- Merch
- Snap cards
- Support packs
- Artists I'm digging

---

## Demo mode (no localStorage data)

When no `able_v3_profile` key exists, page renders sample data for:

**MAYA** — South London indie/soul artist. Vibe: R&B. Accent: Rose `#e06b7a`. Theme: Dark. State: Live (just released "All Your Doors"). Primary CTA: "Stream it" → Spotify. Secondary: "Watch it" → YouTube. 3 upcoming shows. Fan capture active. 2 snap cards.

This demo mode should make the page look completely alive. It is the primary showcase for anyone evaluating ABLE.
