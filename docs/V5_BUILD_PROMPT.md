# ABLE v5 — Master Build Prompt
**Use this prompt to start a new Claude Code session for the v5 redesign.**
**Drop it in as-is. Do not summarise it. Do not skip phases.**

---

## CONTEXT

You are building ABLE v5 — a single HTML file (`able-v5.html`) that is the artist-facing public profile page for ABLE (Artist Before Label), a premium mobile-first platform for independent musicians.

This is a **clean-sheet redesign**. You are not extending v3 or v4. You are starting from first principles using a deep research archive accumulated specifically for this rebuild. Your job is to read that research in full before touching a single line of code.

**One file. No bundler. No npm. No framework. Vanilla JS + CSS custom properties only.**

---

## WHAT THE RESEARCH HAS ALREADY TOLD US

*Read this section first. It pre-answers the most important questions so you build with intention, not guesswork.*

### The product and the person it serves

ABLE is not a link-in-bio tool. It is the owned infrastructure between an artist and their audience — the one thing in the fan discovery chain that belongs entirely to the artist. Every other platform (Instagram, TikTok, Spotify) optimises for its own engagement. ABLE optimises for the artist-fan relationship.

The artist ABLE serves earns £8k–£25k/year from music. They release regularly, build genuine audiences, operate without major label backing. Myers-Briggs: predominantly INFP, INFJ, ISFP — introverted feelers who make product decisions based on whether something *feels right*. They are deeply sensitive to inauthenticity and will read the copy on this page and know within three sentences whether it was written by someone who understands them.

**The fan** arrives from a reel or short-form video — they were watching a clip of this artist's music. They have 10 seconds to decide whether to stay. The top card of the ABLE profile **must show the exact same content as the reel they just came from** — same artwork, same track, same energy. There must be no context switch. The fan is mid-experience; ABLE must continue it, not replace it with a corporate profile page. 2% of fans are superfans who drive 18% of streams and 50% of ticket sales (Spotify/Luminate 2025). The fan email capture form is the most important conversion moment on the page.

**The industry person** (manager, booker, journalist) needs to understand the artist within 5 seconds: who they are, what they've released, where they're playing. The page is also an EPK. They're scanning, not reading. Everything must be legible at speed.

**The single most important thing ABLE does:** Every artist on ABLE owns their fan data. Every fan list is exportable. No lock-in. Ever. This is the thing that makes music industry journalists write about ABLE. Build it into the product. Build it into the homepage copy. Say it simply. Mean it completely.

### The visual register the research demands

From 80+ design references and 60 expert entries (DESIGN_RESEARCH_2026.md):

- **Restraint communicates trust.** Dieter Rams: nothing decorative that doesn't serve a function. Jony Ive: materials (spacing, depth, blur) communicate quality before a user reads a word. The glass theme's `backdrop-filter: blur(28px) saturate(180%)` should feel like frosted aluminium, not a CSS trick.
- **The artist name IS the design.** Paula Scher: typography is image. The name in the display typeface at poster scale is the single most impactful design decision on the page. At 375px mobile, it should fill the viewport width. Never shrink it for layout convenience.
- **Identity permeates.** Stefan Sagmeister: if 20 artist profiles look interchangeable at a glance, the accent system has failed. The accent must touch CTAs, active tabs, pills, section dividers, tag chips — enough of the UI that the page reads as *this artist's identity*, not a template.
- **Layer the easing.** Tobias Ahlin: spring `cubic-bezier(0.34,1.56,0.64,1)` for CTA bounce and entrances. Deceleration `(0.25,0.46,0.45,0.94)` for content panels sliding in. Acceleration `(0.55,0,1,0.45)` for exits. Standard `(0.4,0.0,0.2,1)` for state changes and colour shifts. Never one curve for everything.
- **Only animate opacity and transform in loops.** Never animate `box-shadow`, `width`, `height`, or `filter` in a looping animation — these trigger repaints and drop below 60fps on mid-range Android. Use `opacity` and `transform` with `will-change: transform` only.
- **Skeleton screens approximate shape.** When no artist photo exists, show the accent colour as background with initials in the display typeface — not a grey rectangle.
- **Premium in 2026 means editorial restraint + material quality + authentic identity.** Not maximalism. Not dark-mode-with-neon. The reference aesthetic: Spotify Canvas × Bandcamp's artist-first ethics × Linear's execution quality.

### The 1000 true fans lens

Kevin Kelly's foundational insight applies directly: an artist needs only 1,000 people who will each spend £100/year to build a sustainable career. ABLE's job is not to get artists millions of streams — it is to help them identify and deepen relationships with their 1,000. Every feature should be evaluated through this lens. The fan email capture form is the most important element on the page because it is how the 1,000 are found.

### What the competition doesn't do

Linktree is a utility. Bandcamp is a store. Neither of them make the fan feel like they've arrived somewhere that belongs to the artist. ABLE's edge: the page literally *changes* based on what's happening in the artist's world. A fan who arrives the day before a release sees a countdown. The night of a show, they see tickets front and centre. This is not a feature — it is the thesis of the product.

### Restraint creates trust. Trust enables depth. Depth creates superfans.

---

## PHASE 0 — READ EVERYTHING FIRST

Before writing a single line of HTML, read every file below in full. Do not skim. Take notes as you go.

### Research documents (read in this order):
```
docs/USER_RESEARCH.md                    — 50 real artists, fans, industry pros; Spotify data
docs/DESIGN_RESEARCH_2026.md             — 60 entries: designers, UI experts, UX experts, developers, strategists
docs/VISUAL_SYSTEM.md                    — 7 genre vibes, fonts (AUTHORITATIVE — trust this over anything else)
docs/brainstorms/2026-03-13-top-minds-insights.md  — 160 entries: Kevin Kelly, DHH, Nathan Barry, Jack Conte, etc.
docs/MASTER_PLAN.md                      — full strategy; Section 16 is the research synthesis
docs/PLATFORM_STRATEGY.md               — tiers, fan journey, superfan system, support packs
docs/PRODUCT_HIERARCHY_AND_TRUST.md     — build priority, collaboration discovery, credits system
docs/INTEGRATIONS_AND_AI_RESEARCH.md    — AI tools, integration priorities, Linktree importer
docs/DISCOVERY_AND_GROWTH.md            — organic growth mechanics (recommendation trail, QR codes, fan amplifier)
docs/ECOSYSTEM_AND_PARTNERSHIPS.md      — Ablers, Rooms, press packs
docs/PRODUCT_SPEC.md                    — legacy v1 spec (vocabulary reference)
```

### Brainstorm files (read all):
```
docs/brainstorms/                        — list and read every .md file inside
```

### Micro-interaction library (read all 9 files + README — these are your implementation spec):
```
docs/micro-interactions/README.md
docs/micro-interactions/01-scroll-and-momentum.md
docs/micro-interactions/02-touch-and-tap.md
docs/micro-interactions/03-state-transitions.md
docs/micro-interactions/04-entrance-and-exit.md
docs/micro-interactions/05-form-and-input.md
docs/micro-interactions/06-loading-and-skeleton.md
docs/micro-interactions/07-reward-and-success.md
docs/micro-interactions/08-ambient-and-passive.md
docs/micro-interactions/09-navigation-and-wayfinding.md
```

### Design reference archives (rich HTML mockups — read as source):
```
design-references/design-styles.html
design-references/music-companies.html
design-references/ui-designers.html
design-references/ux-designers.html
.superpowers/brainstorm/12988-1773342870/full-product.html    — product map + build phases
.superpowers/brainstorm/12988-1773342870/onboarding.html      — 4-step smart onboarding spec
.superpowers/brainstorm/12988-1773342870/fan-feed.html        — fan feed: Digest+Snap model
.superpowers/brainstorm/12988-1773342870/top-card.html        — top card model
.superpowers/brainstorm/12988-1773342870/hero-treatment.html  — hero typography treatments
.superpowers/brainstorm/12988-1773342870/colour-mockups.html  — accent colour mockups
.superpowers/brainstorm/12988-1773342870/states.html          — campaign state mockups
```

### Existing implementation (read for context, not to copy):
```
able-v3.html     — what was built before; screenshots: v3-home.png, v3-events.png, review-home-dark.png, review-glass.png
CLAUDE.md        — project rules, data architecture, design tokens, copy constraints
HANDOFF.md       — current state notes
```

### What already exists — do not duplicate, do build on:

**start.html (wizard — already built):**
- 4 steps + done: name/vibe/bio/Spotify → colour picker → theme grid → hero+secondary CTA → done screen
- Writes to `able_profile` localStorage key (separate from `able_v3_profile` — see note below)
- Vibes available: electronic, indie, hiphop, pop, rnb, folk, ambient, experimental
- Done screen: generated URL + copy button + WhatsApp/Twitter/SMS share + dashboard link
- Hero CTA categories: Stream/Listen / Connect / Engage / Shop

**landing.html (marketing page — already built, has good bones):**
- Hero headline confirmed: "When they click, be **ready.**" — do not change this
- Proof strip: 12k+ artists / 3.2M fan sign-ups / £0 platform cut / 5 min setup
- 2 hero feature cards (colour system, campaign modes) + 4 numbered feature cards
- Real artist quote: "I dropped a single with no label, no budget. Put the ABLE link in my bio the night before. Woke up to 340 fan sign-ups and 12 pre-saves." — Mara J., Bristol
- Preserved copy: "One link that's always the right one" / "No algorithm in the way"
- Pricing: Free / Silver £7/mo / Gold £19/mo (3 tiers — needs updating to 4-tier model in CLAUDE.md)

**admin.html (dashboard — already built, 12 tabs):**
- Tabs: Home · Profile · Music · Shows · Snap Cards · Connections · Merch · Support · Analytics · Fans · Send to fans · Settings
- Home greeting: "Good to see you, [Name]." (exact wording — preserve this)
- Broadcast tab (Send to fans): Gold-locked — compose + send
- Gold lock pattern: blurred preview + overlay with specific value prop (not generic "Upgrade")
- localStorage keys used: `able_profile`, `able_v3_profile`, `able_fans`, `able_clicks`, `able_views`, `able_gig_expires`

**localStorage key clarification (important for v5):**
- `able_profile` — wizard output from start.html — basic setup
- `able_v3_profile` — full profile from able-v3.html and admin.html — the authoritative key
- In v5: `able_v3_profile` is the single source of truth. Wizard output must write to it, not `able_profile`. Do not rename — Supabase/D1 migration maps 1:1.

**Do not proceed to Phase 1 until all files above are read.**

---

## PHASE 1 — SYNTHESISE INTO A MASTER BRIEF

After reading everything, create `docs/V5_MASTER_BRIEF.md`. The sections below are pre-populated with research findings — verify them against the full documents, deepen where the research adds nuance, adjust where you find contradictions.

---

### 1.1 — Who this page is for

**The artist** has spent months (or years) making this release. They are not a content creator — they are an artist with something to say. They set up their ABLE page because they want the people who find them through a reel or a playlist to land somewhere that feels like them. They are suspicious of anything that looks corporate or templated. The page must pass the "did a real person make this for me" test within 3 seconds.

**The fan** arrived because they already care. They watched the reel twice. They clicked the bio link. They don't need to be sold to — they need to be given the obvious next thing. **Critically: the top card must show the same content as the reel they came from.** This is the no-context-switch rule. The fan is mid-experience; ABLE continues it, not replaces it. Usually the next thing is: hear more of this music. Sometimes it's: I'm playing near you tonight. Occasionally it's: I want to support this person. Lead with the music. Never lead with money.

**The industry person** is scanning, not reading. Manager: is this artist tour-ready, what's their draw, what's their release cadence. Booker: where are they playing, what's their ticket price, do they have a following in my city. Journalist: is there a story here, what's the angle. The page communicates all of this without a dedicated press section — through the events list, the snap cards, the fan numbers (where shown), the genre and location.

---

### 1.2 — The visual register

The research points to a specific aesthetic: **editorial dark luxury**. Not dystopian black. Not generic dark mode. The reference point is a well-designed vinyl record sleeve, a premium magazine spread, a live music poster that's been designed rather than templated.

Specific constraints from research:
- Base background: Midnight Navy `#0d0e1a` — validated by research as premium without being harsh. Keep it.
- The glass theme must use a real background (artist artwork at low opacity, blurred) — glass on nothing is meaningless.
- Typography hierarchy: vibe display font + DM Sans body. Never add a third typeface within a vibe. Never use Inter or Arial as display type — they signal "no design budget."
- Motion: physically grounded — Tobias Ahlin's principle. Different properties animate with different timing curves to produce curved, natural paths.
- Glows: appear in exactly three places — hero gradient (ambient, low opacity), primary CTA box-shadow (medium opacity), active tab indicator glow. Nowhere else. The restraint is what makes them meaningful.
- The hero artwork ambient glow should also respond to the artwork's dominant colour (canvas extraction) — `--color-ambient` separate from `--color-accent`.
- **CTA border radius**: Hero CTAs use `--r-sm` (4–8px) — NOT pill radius. Pill buttons read as "consumer app." Primary CTAs with slightly squared corners signal premium confidence (source: Native Instruments 2px radius, dark luxury brand research). Pills (`--r-pill: 999px`) are for Quick Action pills ONLY.

**ABLE's design DNA** (synthesised from 80 music industry and design references):
- 40% Dark Luxury — near-black surfaces, generous negative space, warm white text, slow deliberate motion
- 25% Glassmorphism — frosted surfaces over photography, `backdrop-filter: blur(28px) saturate(180%)`
- 15% Editorial Web — artist bio sections feel like magazine profiles, not LinkedIn summaries
- 10% Aurora/Gradient — ambient colour derived from artwork, atmospheric depth
- 7% Spatial/AI-Native — ultra-thin panels, 0.5px borders, depth through glass layers
- 3% Bento Grid — sections and statistics in mosaic layout
The platform must feel like it disappears, leaving only the artist.

---

### 1.3 — The 7-vibe genre system (fully specced — matches VISUAL_SYSTEM.md exactly)

This is the core differentiator of v5. Each vibe makes the page feel like it was built *for* that type of music. Build these as composable CSS classes that stack with theme classes.

**How vibes work technically:**
`<body class="theme-dark vibe-electronic">` produces the Electronic dark experience.

Each vibe overrides: `--font-display` (display typeface), `--color-accent`, `--color-accent-rgb`, `--r-mult` (border radius multiplier — multiplied against `--r-base` to compute all radius tokens), `--ls-display` (letter spacing on display text), `--grad-angle`.

---

#### Vibe 1: Electronic / Club
```css
.vibe-electronic {
  --font-display: 'Barlow Condensed', sans-serif;   /* geometric, condensed, forward */
  --color-accent: #06b6d4;                           /* cyan — electric, precise */
  --color-accent-rgb: 6,182,212;
  --r-mult: 0.8;                                     /* slightly sharper — precision */
  --ls-display: 0.06em;                              /* tracked uppercase */
  --grad-angle: 135deg;
}
```
- **Accent palette**: `#06b6d4` primary / `#22d3ee` light / `#0891b2` deep
- **Display treatment**: Barlow Condensed 700, uppercase, tight letter-spacing reads like a synthesiser interface
- **Emotional quality**: technical precision, forward momentum, the physical space of a club at 2am
- **Copy tone**: "Out now." / "Doors at 10." / "Stream the set." — minimal, functional
- **Example CTA**: "Stream" / "Tickets" / "Stream the set"
- **Gradient character**: angular, directional — suggests movement and energy
- **Reference artists**: Floating Points, Four Tet, Jon Hopkins, Bonobo

---

#### Vibe 2: Hip Hop / Rap
```css
.vibe-hiphop {
  --font-display: 'Oswald', sans-serif;             /* condensed authority, not decorative */
  --color-accent: #f4b942;                           /* gold — heat, presence */
  --color-accent-rgb: 244,185,66;
  --r-mult: 0.7;                                     /* sharp corners — confidence */
  --ls-display: 0.04em;
  --grad-angle: 180deg;
}
```
- **Accent palette**: `#f4b942` primary / `#ffd06a` light / `#cc9220` deep. Alternative: `#e05242` hot coral for harder styles.
- **Display treatment**: Oswald 700, uppercase — the authority of a poster, not a logo
- **Emotional quality**: confidence, presence, directness, the authority of someone with something to say
- **Copy tone**: "Out now." / "Stream it." / "Catch me live." — declarative, unqualified
- **Example CTA**: "Stream" / "Tickets" / "Get the merch"
- **Reference artists**: Little Simz, Loyle Carner, Dave, Pa Salieu

---

#### Vibe 3: R&B / Soul
```css
.vibe-rnb {
  --font-display: 'Cormorant Garamond', serif;      /* editorial, intimate, warm */
  --color-accent: #e06b7a;                           /* rose — warmth, intimacy */
  --color-accent-rgb: 224,107,122;
  --r-mult: 1.2;                                     /* softer, more rounded */
  --ls-display: 0.02em;
  --grad-angle: 160deg;
}
```
- **Accent palette**: `#e06b7a` primary / `#f4a0b0` light / `#c04060` deep. Gold `#d4a96a` as secondary.
- **Display treatment**: Cormorant Garamond 600 italic at large sizes — feels like a Vogue music feature. Only use at 28px+.
- **Emotional quality**: warmth, intimacy, late-night, the feeling of hearing something recorded close-up
- **Copy tone**: "New music — I hope it reaches you." / "Playing London in April." — warm, personal, specific
- **Example CTA**: "Listen" / "Stay close" / "Support"
- **Reference artists**: Cleo Sol, Greentea Peng, Jordan Rakei, Arlo Parks

---

#### Vibe 4: Indie / Alternative
```css
.vibe-indie {
  --font-display: 'Space Grotesk', sans-serif;      /* honest, direct, slightly quirky */
  --color-accent: #7ec88a;                           /* sage green — natural, warm */
  --color-accent-rgb: 126,200,138;
  --r-mult: 1.0;                                     /* standard — unforced */
  --ls-display: -0.01em;                             /* slightly tight — grounded */
  --grad-angle: 150deg;
}
```
- **Accent palette**: `#7ec88a` primary / `#a4d8ae` light / `#5a9a68` deep
- **Display treatment**: Space Grotesk 700 — geometric but human, feels like a well-designed band poster
- **Emotional quality**: honest, DIY, guitar-warmth, the smell of a small venue, the authenticity of something handmade
- **Copy tone**: "New song — hope it finds you well." / "I'm playing London in April. Come if you can." — personal, unforced
- **Example CTA**: "Listen" / "Come to a show" / "Buy the record"
- **Reference artists**: Alvvays, Wet Leg, Fontaines DC, Inhaler, Beabadoobee

---

#### Vibe 5: Pop
```css
.vibe-pop {
  --font-display: 'Barlow Condensed', sans-serif;   /* clean, confident, accessible */
  --color-accent: #9b7cf4;                           /* indigo/violet — vivid, accessible */
  --color-accent-rgb: 155,124,244;
  --r-mult: 1.4;                                     /* pill-friendly, approachable */
  --ls-display: 0.03em;
  --grad-angle: 120deg;
}
```
- **Accent palette**: `#9b7cf4` primary / `#c4aeff` light / `#7c5cd4` deep. Rose `#f472b6` as secondary.
- **Display treatment**: Barlow Condensed 700 — readable at all sizes, energetic without being aggressive
- **Emotional quality**: bright, hook-forward, accessible, the feeling of a song that won't leave your head
- **Copy tone**: "My new single is out and I'm obsessed with it." / "Come see me live." — direct, warm, slightly revealing
- **Example CTA**: "Stream now" / "Pre-save" / "Get tickets"
- **Reference artists**: Olivia Dean, Maisie Peters, Holly Humberstone, Raye

---

#### Vibe 6: Rock / Metal
```css
.vibe-rock {
  --font-display: 'Oswald', sans-serif;             /* heavy, no-compromise */
  --color-accent: #e05242;                           /* hot red — energy, live performance */
  --color-accent-rgb: 224,82,66;
  --r-mult: 0.6;                                     /* sharp, hard, uncompromising */
  --ls-display: 0.08em;                              /* tracked uppercase — power */
  --grad-angle: 145deg;
}
```
- **Accent palette**: `#e05242` primary / `#ff7060` light / `#b83030` deep
- **Display treatment**: Oswald 700, uppercase — the authority of a festival banner, not a logo. Maximum weight.
- **Emotional quality**: energy, live performance, the physicality of amplified music, the release of volume
- **Copy tone**: "New single out Friday." / "We're on tour. Come." — terse, direct, no softening
- **Example CTA**: "Listen" / "Tickets" / "Merch"
- **Reference artists**: Idles, BCNR, Squid, Fontaines DC (heavier material), Wet Leg

---

#### Vibe 7: Acoustic / Folk / World
```css
.vibe-folk {
  --font-display: 'Lora', serif;                    /* warm serif, humanist */
  --color-accent: #d4a96a;                           /* warm ochre — natural, unhurried */
  --color-accent-rgb: 212,169,106;
  --r-mult: 1.3;                                     /* natural, organic */
  --ls-display: 0.01em;
  --grad-angle: 170deg;
}
```
- **Accent palette**: `#d4a96a` primary / `#eac890` light / `#b08040` deep. Sage `#7ec88a` as secondary.
- **Display treatment**: Lora 700 — the warmth of a handwritten setlist, the craft of something made slowly
- **Emotional quality**: intimate, lyric-forward, the feeling of a song written in a room, not a studio
- **Copy tone**: "New song — hope it finds you well." / "Playing a few shows this spring." — gentle, unhurried, specific
- **Example CTA**: "Listen" / "Come to a show" / "Stay close"
- **Reference artists**: Phoebe Bridgers, Nick Mulvey, Laura Marling, Lankum, Novo Amor

---

### 1.4 — The design token system

**Static tokens (global — never change between themes or vibes):**
```css
:root {
  /* Body font */
  --font-body: 'DM Sans', system-ui, sans-serif;

  /* Spacing scale */
  --sp-1: 4px;  --sp-2: 8px;   --sp-3: 12px;  --sp-4: 16px;
  --sp-5: 20px; --sp-6: 24px;  --sp-8: 32px;  --sp-10: 40px;
  --sp-12: 48px; --sp-16: 64px;

  /* Tap target minimum */
  --tap-min: 44px;

  /* Border radius base — multiplied by --r-mult per vibe via JS */
  --r-base: 8px;
  --r-pill: 999px;
  /* These are computed by JS: --r-sm, --r-md, --r-lg, --r-xl */

  /* Type scale */
  --text-xs: 11px;   --text-sm: 13px;   --text-base: 15px;
  --text-lg: 17px;   --text-xl: 20px;   --text-2xl: 24px;
  --text-3xl: 32px;  --text-4xl: 40px;  --text-hero: clamp(48px, 14vw, 80px);

  /* Line heights */
  --lh-tight: 0.88;   /* hero name — condensed typefaces need this */
  --lh-display: 1.0;  /* large headings */
  --lh-body: 1.5;     /* body copy */
  --lh-label: 1.2;    /* labels, pills */

  /* Motion — easing curves (these 4 cover every animation) */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);    /* bounce — entrances, CTAs */
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94);  /* smooth stop — panels, content in */
  --ease-accel:    cubic-bezier(0.55, 0, 1, 0.45);        /* fast exit — dismissals */
  --ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1.0);     /* state changes, colour shifts */

  /* Motion — durations */
  --dur-instant: 80ms;    /* press feedback */
  --dur-fast: 150ms;      /* hover / focus states */
  --dur-mid: 250ms;       /* panel transitions */
  --dur-slow: 400ms;      /* entrance animations */
  --dur-xslow: 600ms;     /* hero reveals */
}
```

**Theme-switched tokens (change when theme class changes on `<body>`):**
```css
.theme-dark {
  --color-bg:       #0d0e1a;
  --color-surface:  #111427;
  --color-card:     #12152a;
  --color-card-raised: #1a1e38;
  --color-border:   rgba(255,255,255,0.06);
  --color-text:     #f0ede8;
  --color-text-2:   rgba(240,237,232,0.6);
  --color-text-3:   rgba(240,237,232,0.35);
  --color-overlay:  rgba(13,14,26,0.7);
  --shadow-card:    0 2px 16px rgba(0,0,0,0.4);
  --shadow-cta:     0 8px 28px var(--color-accent-glow);
}

.theme-light {
  --color-bg:       #f0ede8;   /* warm cream — not clinical white */
  --color-surface:  #e8e4de;
  --color-card:     #ffffff;
  --color-card-raised: #f8f5f2;
  --color-border:   rgba(0,0,0,0.08);
  --color-text:     #0d0e1a;
  --color-text-2:   rgba(13,14,26,0.6);
  --color-text-3:   rgba(13,14,26,0.35);
  --color-overlay:  rgba(240,237,232,0.7);
  --shadow-card:    0 2px 16px rgba(0,0,0,0.08);
  --shadow-cta:     0 8px 28px var(--color-accent-glow);
}

.theme-glass {
  --color-bg:       transparent;  /* needs a background behind */
  --color-surface:  rgba(255,255,255,0.06);
  --color-card:     rgba(255,255,255,0.08);
  --color-card-raised: rgba(255,255,255,0.12);
  --color-border:   rgba(255,255,255,0.12);
  --color-text:     #f0ede8;
  --color-text-2:   rgba(240,237,232,0.7);
  --color-text-3:   rgba(240,237,232,0.4);
  --backdrop:       blur(28px) saturate(180%);
  /* Sections use: backdrop-filter: var(--backdrop) */
  /* Glass requires a real blurred background — artist artwork fixed behind */
}

.theme-contrast {
  --color-bg:       #000000;
  --color-surface:  #0a0a0a;
  --color-card:     #111111;
  --color-card-raised: #1a1a1a;
  --color-border:   rgba(255,255,255,0.2);
  --color-text:     #ffffff;
  --color-text-2:   rgba(255,255,255,0.8);
  --color-text-3:   rgba(255,255,255,0.5);
  /* All accent colours remain — contrast is about legibility */
}
```

**Vibe-switched tokens** — see Section 1.3. The properties that change per vibe:
`--font-display`, `--color-accent`, `--color-accent-rgb`, `--r-mult`, `--ls-display`, `--grad-angle`

**Derived tokens (computed from above — set via JS on load and on vibe/accent change):**
```js
function applyDerivedTokens(root, accentHex, rMult) {
  const [r,g,b] = hexToRgb(accentHex)
  root.style.setProperty('--color-accent-rgb',  `${r},${g},${b}`)
  root.style.setProperty('--color-accent-glow', `rgba(${r},${g},${b},0.35)`)
  root.style.setProperty('--color-accent-soft', `rgba(${r},${g},${b},0.12)`)
  root.style.setProperty('--r-sm',  `${4  * rMult}px`)
  root.style.setProperty('--r-md',  `${8  * rMult}px`)
  root.style.setProperty('--r-lg',  `${16 * rMult}px`)
  root.style.setProperty('--r-xl',  `${24 * rMult}px`)
}
```

**State indicator colours (hardcoded — not accent-driven):**
```css
--color-pre-release: #fbbf24;   /* amber — anticipation */
--color-live:        #ef4444;   /* red — urgency, live energy */
--color-profile:     #06b6d4;   /* cyan — platform default */
--color-gig:         #ef4444;   /* red — on tonight */
```

---

### 1.5 — The micro-interaction vocabulary for v5

*Reference: `docs/micro-interactions/` (9 files, 100 interactions with verdicts). What follows selects the non-negotiable interactions for v5 launch. Read the full files — they have complete implementations.*

**Touch & press (from `02-touch-and-tap.md`):**
- **Scale-down on press (#16)**: ALL interactive elements — `scale(0.97)` on `pointerdown`, spring back on release. Use `:active` pseudo-class. Critical iOS fix: document needs a `touchstart` listener or use `@media (hover: none)`.
- **Spring-back release (#17)**: Release transitions from `0.97 → 1.02 → 1.0` using `--ease-spring`. Needs JS class toggle — CSS-only can't change curves mid-animation.
- **CTA press glow (#22)**: Primary CTA — on press, `box-shadow` expands then collapses. Use `::after` pseudo-element with `opacity` transition (NOT animating `box-shadow` directly — avoids repaint).
- **Platform pill press (#21)**: Pills scale to `0.95` + `opacity: 0.8` on press. Add subtle right-arrow `›` icon to signal tap-ability.
- **Glass depth on press (#93)**: Glass theme only — `backdrop-filter: blur(28px) → blur(36px)` on press. Guard with `[data-theme="glass"]`.

**Scroll (from `01-scroll-and-momentum.md`):**
- **iOS overscroll (#1)**: `.v3-shell { overscroll-behavior-y: contain; -webkit-overflow-scrolling: touch; }` — prevents chain-scrolling.
- **Overscroll colour tint (#11)**: `html { background: color-mix(in srgb, var(--color-bg) 85%, var(--color-accent) 15%); }` — accent briefly peeks through on rubber-band bounce.
- **Tab bar hide on scroll down (#8)**: Detect scroll direction. Down + past 100px: `transform: translateY(100%)` with `--ease-accel` (200ms). Up: reveal with `--ease-decel` (200ms).
- **Scroll-triggered entrances (#7)**: `IntersectionObserver` on `.will-animate` elements. `opacity: 0, translateY: 20px` → visible, 300ms decel. Stagger: `(i % 6) * 60ms` via `--stagger` CSS var. Cap at 6 items — item 7+ appears instantly.
- **Artist name scale compression (#13)**: Interpolate font-size from hero (48px) to sticky header (24px) as user scrolls through hero zone.
- **Section header pin (#10)**: `.v3-section-label { position: sticky; top: calc(var(--header-height, 52px) + 8px); }` — pure CSS, no JS.

**State transitions (from `03-state-transitions.md`):**
- **Tab indicator spring (#31)**: A single sliding dot element under the tab bar. `indicator.style.left = target.offsetLeft + 'px'` — CSS `transition: left 350ms var(--ease-spring)`. Spring means the dot overshoots and bounces.
- **Tab icon bounce (#20)**: Icon scales `1.0 → 1.15` on activation with `--ease-spring`. Do NOT bounce on re-tap of active tab.
- **Scroll-to-top on re-tap active tab (#99)**: If fan taps the already-active tab, smooth scroll to top (`scrollTo({ top: 0, behavior: 'smooth' })`). Tab bounce should NOT fire.
- **Campaign state crossfade (#32)**: On state change, `opacity: 1 → 0` (300ms), apply new state, `opacity: 0 → 1` (300ms). Never hard-switch.
- **Gig mode flash (#34)**: ONE flash on session when gig mode first activates. `opacity: 0 → 0.2 → 0` overlay over the whole page. Never repeat in same session — session flag.
- **Gig breathing glow (#91)**: In gig mode, ambient glow breathing cycle accelerates from 4s to 2.5s, opacity range shifts from `0.12–0.18` to `0.15–0.25`. Use CSS var override on `data-state="gig"`.
- **Live pulsing dot (#36)**: 2px dot, `breathe` keyframe, `2s ease-in-out infinite`. Animate ONLY `opacity` and `scale` — not `box-shadow`. Pair with gig badge only.
- **Profile state return (#38)**: SLOWEST transition in the system — 500ms, no spring, just ease. Emotional gesture: the page is settling back.
- **Theme switch (#33)**: Use `::before` opacity trick — NOT transitioning `backdrop-filter` directly (too expensive). On the wrapping element, a `::before` pseudoelement fades.
- **Digit flip countdown (#35)**: `rotateX(-90deg)` exit with `perspective: 200px`, then `rotateX(90deg → 0)` entrance. Each unit (hours, minutes, seconds) animates independently.
- **Connection badge (#45)**: "Connected as Novo Amor" — pull artist name from platform API, show in badge.

**Entrance & exit (from `04-entrance-and-exit.md`):**
- **Staggered card bloom (#46)**: On page load, elements bloom in waves. Hero: `transition-delay: 0ms` (instant). Below-fold via IntersectionObserver. Two separate systems.
- **Hero name reveal (#47)**: `opacity: 0, translateY: 12px → 1, 0` over 400ms decel. Fire 50ms after load (font availability). Better: `document.fonts.ready.then(triggerAnimation)`.
- **Platform pill shimmer (#60)**: One-time, first-load only — left-to-right gradient sweep on each pill. Session-store whether fired.
- **Artist name gloss pass (#90)**: Single white highlight sweep across the hero name on first load (400ms delay after name arrives). Only on Dark + Glass themes. `::after` absolute position, `animation: glossPass 600ms ease-out forwards`.
- **Panel slide-up (#50)**: Bottom sheet: `translateY(100%) → translateY(0)` with `--ease-spring` 350ms. Backdrop: `opacity: 0 → 0.55` with `--ease-standard` 250ms.
- **Panel exit (#57)**: `--ease-accel` 250ms — exits faster than entries. Asymmetric is correct.
- **Tab bar slide-up (#49)**: Navigation starts `translateY(60px), opacity: 0`. Arrives 200ms after hero — content first, navigation second.
- **Stats counter animation (#59)**: Admin dashboard — numbers count from 0 to actual value over 800ms, `ease-out cubic`.

**Form & input (from `05-form-and-input.md`):**
- **Email focus glow (#61)**: `border-color: var(--color-accent)`, `box-shadow: 0 0 0 3px var(--color-accent-soft)`. Kills the default browser blue ring.
- **Submit loading → checkmark (#64)**: Spinner appears instantly on submit (before any network). Spinner → checkmark morph on success. Optimistic: assume success.
- **Error shake (#65)**: `translateX(-8px, 8px, -5px, 5px)` — 400ms. Border turns `--color-live`. Suppress shake when fan starts retyping.
- **Confetti burst (#79)**: 40 particles, accent + white. `angle: -60° to +60°`, gravity `+80px` on y-axis. Fire from button origin. `prefers-reduced-motion`: skip entirely, show success state only.
- **Email echo (#85)**: After confetti: "We've got you — [email@address] is on [Artist]'s list." — email highlighted in accent colour `rgba(accent, 0.12)` background, `border-radius: 4px`.
- **Paste flash (#69)**: On `paste` event, input background flashes `rgba(accent, 0.1)` and fades over 400ms.
- **Wizard progress spring (#70)**: Progress bar width transitions with `--ease-spring` — overshoots the target, bounces back. 3px height, top of screen.

**Loading & skeleton (from `06-loading-and-skeleton.md`):**
- **Skeleton shimmer (#71)**: `background: linear-gradient(90deg, --color-card 25%, --color-card-raised 50%, --color-card 75%)`. `background-size: 200%`. `animation: shimmer 1.5s ease-in-out infinite`. All elements share same phase (`animation-delay: 0s`).
- **Lazy image fade (#3)**: Hero artwork: eager-loaded (preload if URL known). All below-fold images: `IntersectionObserver`, fade `opacity: 0 → 1` on load. `rootMargin: '100px'`.
- **Progressive image blur-up (#73)**: Placeholder: CSS gradient in accent colour at full dimensions. Real image fades over on load. Prevents blank white rectangle on slow 4G.
- **Artwork colour extraction (#74 + #88)**: Canvas sample hero artwork (4×4 downsample → average RGB). Set `--color-ambient-rgb`. Glow uses ambient, NOT accent. Artist's chosen accent is preserved; artwork only drives the atmospheric background.

**State detail (from `03-state-transitions.md`):**
- **Support tier card lift (#42)**: On tap/select, the chosen tier card lifts `translateY(-4px)`, gains `border-color: var(--color-accent)` with low-opacity accent `box-shadow`. Unselected cards simultaneously dim to `opacity: 0.6`. The CTA below activates. This is step 1 of the purchase — the visual feedback for "you've made a choice."
- **Release badge swap (#43)**: State tag copy changes (e.g. "Out now" → "Dropping 28 Mar"). Old text exits in 100ms, new text enters in 200ms — **asymmetric**: content exits faster than it enters. Never hard-swap.
- **Platform connection badge (#45)**: On OAuth success, badge slides in from the right: `opacity: 0, translateX(8px)` → `opacity: 1, translateX(0)` over 300ms. Show artist name from Spotify: "✓ Connected as Novo Amor" — not just "✓ Spotify connected." Precision signals competence.
- **Overflow pill expansion (#40)**: "More" pill expands all hidden pills inline — NOT a modal. Hidden pills bloom with 60ms stagger: `opacity: 0, scale(0.8)` → `opacity: 1, scale(1)`. Use `max-height` animation or Web Animations API for row height (avoid CSS `height` transition — triggers layout).
- **Campaign state glow interpolation**: When state changes, `--color-ambient` must also transition. CSS transitions on custom properties require `@property` registration; use a JS tween instead: `requestAnimationFrame` loop interpolating RGB values over 300ms.

**Reward & success (from `07-reward-and-success.md`):**
- **Support pack celebration (#82)**: Purchased tier card gains full accent glow + checkmark. Confirmation: "You're supporting [Artist Name] at the [Tier] level." — specific, warm. Not "Payment successful."
- **Copy link flash (#83)**: "Copied!" label for 2s, button bg flashes `rgba(accent, 0.15)`. Show artist's `able.fm/handle` — not full URL. Seeing their identity in that format is a brand moment.
- **Pre-save star burst (#84)**: 8 star particles radiate ~40px outward from button. More contained than confetti — the pre-save is a quiet, personal commitment.
- **Fan count tick (#81)**: Admin — fan counter `scale(1.1)` → digit change → spring back to 1.0.

**Ambient & passive (from `08-ambient-and-passive.md`):**
- **Ambient glow breathing (#87)**: `radial-gradient` behind hero, `opacity: 0.12 → 0.18` over 4s `ease-in-out infinite`. Use dedicated layer — only animate `opacity`, never `background`.
- **Active gig atmosphere (#91)**: Gig mode: breathing cycle 4s → 2.5s, opacity range shifts to `0.15–0.25`. Warmer.
- **Platform equaliser (#94)**: Only when Spotify real-time API is integrated — animated equaliser bars in pill. Never fake data.

**Navigation (from `09-navigation-and-wayfinding.md`):**
- **Section fade-in on entry (#96)**: Section label `opacity: 0 → 1` (200ms) as section enters viewport.
- **Deep link highlight (#98)**: URL hash `#music`, `#shows`, `#merch`, `#support` → scroll to section + brief accent border pulse (1.5s). Delay 400ms for entrance animations to complete first.
- **Tab dot resting state (#95)**: After spring animation completes, dot settles with slightly wider, softer glow. `transitionend` event fires `.settled` class.
- **Back navigation parallax (#97)**: When panel closes, underlying content scales `0.95 → 1.0` (`--ease-decel`, 300ms) — the previous layer "rises" to meet the returning user.

**Performance rules (cross-cutting):**
- Only animate: `opacity`, `transform`, `will-change: transform` in loops
- Never animate: `box-shadow`, `width`, `height`, `filter`, `background-color` in loops
- Use `::after` pseudo-element + `opacity` trick instead of animating `box-shadow` directly
- `touch-action: manipulation` on all interactive elements — kills 300ms tap delay
- `prefers-reduced-motion`: skip all entrance animations, confetti, gloss pass. Show static states only.
- 60fps on mid-range Android is a hard requirement — test on Pixel 5a or Samsung A-series equivalent

---

### 1.6 — The copy system

**Never write (and what to write instead):**

| Banned | Replace with |
|---|---|
| "monetise" | "let people support you directly" |
| "grow your audience" | "reach people who care" |
| "engage your followers" | "stay close to the people who show up" |
| "content creator" | "artist" |
| "superfans" (in public UI) | "your most dedicated listeners" |
| "going viral" | never mention this |
| "get started" / "let's go" | plain action verb: "Done." |
| "you're all set" | "Done." or nothing at all |
| "Subscribe" | "Stay close." |
| "Sign up" (fan capture CTA) | "Stay close." |
| "Followers" | not used — ever |
| "Join my mailing list" | "I'll only reach out when something's actually happening." |
| "Content" | the actual thing: "music", "show", "release" |
| exclamation marks on any UI | not used |
| "Fan CRM dashboard" | "Your list. Your relationship." |

**Section naming (non-negotiable):**

| Section | Correct | Never |
|---|---|---|
| Streaming | "Listen" | "Music", "Discography", "Songs" |
| Live shows | "Shows" | "Events", "Tour Dates", "Gigs" |
| Fan capture heading | "Stay close." | "Newsletter", "Subscribe", "Sign up" |
| Direct support | "Support" | "Buy", "Shop", "Donate", "Tip" |
| Short updates | "From [Name]" or no header | "Snap Cards", "Updates", "Posts" |

**Artist voice rules:**
- First person on the profile page ("I'm playing tonight" not "Artist is playing tonight")
- Present tense ("My new EP is out" not "Artist has released an EP")
- The profile should feel like the artist wrote it themselves, not a publicist

**Fan capture — the exact words:**
- Input placeholder: "your email"
- Submit button: "Stay close."
- Post-submit: "I'll only reach out when something's actually happening."
- Email echo: "We've got you — [email@example.com] is on [Artist Name]'s list."
- Duplicate: "You're already on the list."
- Error: "That didn't go through. Try again?"

**Release state tags:**
- Pre-release: "Dropping [date]" or "Out [date]" — amber `#fbbf24`
- Live: "Out now" — red `#ef4444`
- Gig: "On tonight" + pulsing red dot `#ef4444`
- Profile: no tag, or "Latest" label on most recent release in muted text

**Copy tone per vibe:**
- Electronic: "Out now." / "Doors at 10." — minimal, functional, no sentiment
- Hip Hop: "Out now." / "Stream it." — declarative, unqualified, confident
- R&B/Soul: "New music — I hope it reaches you." — warm, personal, specific
- Indie: "New song — hope it finds you well." / "Come if you can." — unforced, genuine
- Pop: "My new single is out and I love it." — direct, warm, slightly revealing
- Rock: "New single out Friday." / "We're on tour." — terse, no softening
- Folk: "New song, written last winter." — slow, honest, specific

**Empty states — always artist voice, never blank or generic:**
- No shows: "Nothing booked right now — check back soon." (muted text)
- No music: hide the section entirely — never show an empty section header
- No bio: hide bio strip — don't show a placeholder field
- No merch: hide section entirely

**Dashboard copy (for admin.html reference):**
- Greeting: "Good to see you, [Name]." — warm, one beat, done
- Stats: "People who came to your page this week" not "Page views"
- Fan list: "People who signed up" not "Subscribers" or "Leads"
- Campaign state: "You're in pre-release mode" not "Status: PRE_RELEASE"
- Fan data promise (always visible): "Your fan list. Export any time. No lock-in."

---

### 1.7 — CTA architecture

Three zones with strict caps. **Global dedupe rule**: same URL cannot appear in multiple zones. Hero zone wins.

**Zone 1 — Hero CTAs** (max 2)
- Primary: accent fill, 56px height minimum, full-width on mobile. Border radius: `--r-sm` (4–8px) — NOT pill. Hard edges on primary signal confidence and premium positioning. Label: continuation of the experience — "Listen on Spotify", "Watch on YouTube", "Get tickets", "Pre-save". Never a transactional CTA as primary.
- Secondary: ghost/outline, same height, same radius. Label: "Buy tickets", "Stream the album", "View merch".

**Zone 2 — Quick Action pills** (max 4 visible + overflow "More" toggle)
- 36px height, accent border or `--color-accent-soft` background, icon + label
- Platforms: Spotify, Apple Music, SoundCloud, YouTube, Bandcamp, Instagram, TikTok, Dice, etc.
- "More" toggle reveals additional pills with spring entrance

**Zone 3 — Section Actions** (max 2 per section)
- Inline CTAs within Listen, Shows, Merch, Support
- Lower visual weight than hero CTAs

**CTA library (all types the system must support):**
`stream` / `presave` / `tickets` / `follow` / `merch` / `support` / `rsvp` / `discord` / `pre-order` / `bandsintown` / `book-me` / `custom`

---

### 1.8 — Page sections and information hierarchy

**The no-context-switch rule**: The top card of the profile must show the same content the fan was just watching in the reel — same artwork, same track, same energy. The fan is mid-experience. ABLE continues it. Choose the top card content type that matches what got the fan there: Video / Artwork full-bleed / Music embed.

**Profile state** (default):
1. Top card — artist artwork, hero name, location+genre, bio strip
2. Hero CTAs (stream primary, secondary)
3. Quick Action pills
4. Listen (latest release + tracks)
5. Shows (upcoming)
6. Snap cards (recent artist updates)
7. Merch (if configured)
8. Support (if configured)
9. Fan capture ("Stay close.")
10. Credits + recommendations

**Pre-release state:**
1. Top card — release artwork teaser (at reduced opacity), countdown prominent, "Dropping [date]" tag
2. Pre-save CTA primary
3. Quick Action pills
4. Pre-save details / track listing preview
5. Shows
6. Fan capture (more prominent — "be first to hear it")
7. Snap cards

**Live state:**
1. Top card — release artwork full-bleed, "Out now" tag (red), stream CTA dominant
2. Quick Action pills (all streaming platforms)
3. Listen (this release prominent, embed)
4. Snap cards (launch content)
5. Shows
6. Fan capture
7. Merch / Support

**Gig state:**
1. Top card — venue/event, "On tonight" tag + red pulsing dot, tickets CTA primary
2. Shows (moved to position 2 — the tonight show becomes the hero)
3. Listen (artist context)
4. Fan capture
5. Merch / Support
6. Snap cards

---

### 1.9 — Campaign state transitions

**State trigger logic:**
```js
function computeState(profile) {
  const now = Date.now()
  const releaseDate = profile.releaseDate ? new Date(profile.releaseDate).getTime() : null
  const gigExpiry = profile.gigExpires || 0

  if (gigExpiry > now) return 'gig'                                      // manual override
  if (!releaseDate) return 'profile'                                      // no release set
  if (now < releaseDate) return 'pre-release'                             // before release
  if (now < releaseDate + 14 * 24 * 60 * 60 * 1000) return 'live'       // 0–14 days post
  return 'profile'                                                         // 14+ days post
}
```

**State stored in `able_v3_profile` localStorage key — never rename this key.**

**Auto-Spotify state switching (future backend feature — design for it now):** When backend is available, ABLE polls the Spotify API daily (via a scheduled Worker). If a new release is detected: auto-switch to "live" state, update top card artwork, extract new ambient colour from artwork. Artist wakes up and their page has already updated. This is the "always correct" promise. In localStorage v5: artist can manually set `stateOverride: "auto"` to signal that they want auto-switching when the backend lands.

**Visual changes per state:**

| Element | Profile | Pre-release | Live | Gig |
|---|---|---|---|---|
| State tag | None / "Latest" | "Dropping [date]" `#fbbf24` | "Out now" `#ef4444` | "On tonight" 🔴 `#ef4444` |
| Top card | Artwork 60% opacity | Artwork 40% (teaser) | Artwork full-bleed | Dark venue overlay |
| Primary CTA | "Listen on [platform]" | "Pre-save" | "Stream now" | "Get tickets" |
| Glow intensity | Standard | Reduced (anticipation) | Increased (energy) | High (urgency), faster breathing |
| Countdown | Hidden | Prominent (digit flip) | Hidden | Optional (doors open) |

**Transition animation**: hero content `opacity: 1 → 0` (150ms, ease-out), then new state content `opacity: 0 → 1, translateY: 8px → 0` (250ms, deceleration).

---

### 1.10 — The admin model for v5

The artist admin is a **slide-up panel on the profile page itself**, not a separate admin.html file. When the artist views their own profile (authenticated), a small edit trigger is visible. Tapping it opens a bottom sheet (60% screen height) — the profile remains visible behind, scaled to 0.95 with dimmed backdrop.

The slide-up admin panel contains:
- Campaign state switcher (profile / pre-release / live / gig toggle)
- Release date input (for pre-release/live state)
- Top card type selector (artwork / video / embed)
- Accent colour picker (swatches + hex input — live preview)
- Theme selector (Dark / Light / Glass / Contrast)
- Vibe selector (7 options — live preview)
- CTA editor (primary + secondary)
- Fan count (counts up animation from stats) — exact number ("127 fans"), never approximations
- "View fan list" → separate bottom sheet
- **Living QR Code**: a QR code that always points to the artist's current most important action — tickets when touring, stream when live, pre-save when building. Never needs reprinting. Artist prints it on: merch, setlist backdrops, venue posters, social graphics. QR code is just `able.fm/@handle` — the profile's smart state switching makes it contextually correct.
- **Revenue attribution**: show which CTA drove which action. "Stream Now → 3,400 Spotify opens this week." "Tickets → 89 opens." Not conversions (ABLE can't track purchases on external sites) but opens are a strong proxy. This is what artists can't get from Linktree.
- **On desktop (>768px)**: admin is split-screen — left = edit forms (all sections), right = live mobile preview updating as they type. Slide-up pattern still applies on mobile. Desktop unlocks the full editor view.
- **"View as fan"**: toggle between edit mode (dashed borders, edit icons) and fan view (exactly what fans see). One tap. No page reload.

This means `able-v5.html` contains both the public profile AND the authenticated admin panel as a single file — URL-based auth state determines what's visible.

---

### 1.11 — Onboarding flow (4 steps, 60 seconds)

*Full spec: `.superpowers/brainstorm/12988-1773342870/onboarding.html`*

**Step 1: Find your artist profile**
- Search Spotify by artist name
- API returns: name, bio, photo, genres, discography, city, streaming links
- One-tap import: "Importing from Spotify — name, bio, photo, 8 tracks ✓"

**Step 2: Confirm import**
- Card preview showing what was pulled: Bio ✓, Photo ✓, 8 tracks ✓, Spotify ✓, Apple Music ✓
- "This is me →" — one tap to confirm. Edit any field.

**Step 3: One goal question — sets the page state**
- "Dropping something new" → pre-release state
- "Something just dropped" → live state
- "Touring / shows" → profile + shows prominent
- "General presence" → profile state

**Step 4: Pick your colour**
- Live preview: a CTA button shows in the selected accent
- 8 suggested swatches (can paste custom hex)
- "My page is ready →"

Progress bar: 3px, spring-filled, top of screen. Steps in order. No account creation until after this flow.

---

### 1.12 — Fan feed pattern (for fan.html — future page)

*Full spec: `.superpowers/brainstorm/12988-1773342870/fan-feed.html`*

**Default view = Digest (C)**: Fan opens app, sees what dropped today from artists they follow. Scannable in 5 seconds. Date-grouped. Release / Event / Merch / Video type chips. "Today · Thursday — 4 updates from artists you follow."

**Tap any row = Snap card view (B)**: Full-screen snap-scroll mode. Fan goes through that artist's latest drops. Finite — "3 of 7 · swipe up." Shows a counter, has an end state. NOT infinite scroll.

**No infinite scroll**: Shows at most 7 days back. When exhausted: "You're all caught up." Respectful of the fan's time.

---

### 1.13 — Credits system

Three trust levels for credits on releases:

```
Unverified → Peer-confirmed (✓) → Metadata-verified
```

- **Unverified**: Artist adds "Produced by Maya Beats" → link to Maya's ABLE profile if they have one. No tick.
- **Peer-confirmed**: Maya gets notification: "Confirm you produced [Track Name]?" → [Confirm] → credit gets ✓. One tap.
- **Metadata-verified**: Via DistroKid/TuneCore distributor metadata. ISRC match. Gold standard, no manual input.

Never add ✓ automatically. Never sell verification. Show credits collapsed by default — a fan who cares will look; most won't, and that's correct.

---

### 1.14 — Performance requirements

- **First meaningful paint (hero)**: under 1.5 seconds on 4G mobile
- **Total page load**: under 3 seconds on 4G mobile
- **No render-blocking scripts**: all `<script>` tags at bottom of body or `defer`
- **No horizontal scroll at 375px**: test with Playwright at 375px width — hard requirement
- **Tap targets**: all interactive elements ≥ 44×44px — non-negotiable
- **Font loading**: only load the active vibe's display font. Use `font-display: swap`. Don't preload all 7.
- **Image loading**: hero image critical path (preload if URL known). All below-fold: `loading="lazy"` + IntersectionObserver fade-in.
- **No CDN dependencies** except Google Fonts (1 font per vibe, on demand)
- **Skeleton screens**: shown immediately before profile data — approximate real content shape

---

### 1.15 — Backend stack recommendation

When moving beyond localStorage, the recommended stack is:
- **Hosting**: Cloudflare Pages (static) + Workers (API routes)
- **Database**: Cloudflare D1 (SQLite at edge — same Worker, near-zero latency)
- **Auth**: Magic link email (Resend or Cloudflare Email Workers — no passwords)
- **Storage**: Cloudflare R2 (artist photos, artwork — S3-compatible, no egress fees)
- **OG Images**: Cloudflare Workers + Canvas API — dynamic `og:image` per artist at build time

API routes needed:
```
GET  /api/profile/:handle
PUT  /api/profile/:handle
POST /api/upload
POST /api/fan-capture
GET  /api/feed        (fan feed)
POST /api/bio-writer  (Claude API proxy)
```

All localStorage keys map 1:1 to future database rows. Do not rename keys — Supabase or D1 migration is a flush-to-API operation.

---

**Review the brief above before writing code. Adjust anything that contradicts what the full research docs say. Then proceed.**

---

## PHASE 2 — BUILD THE DESIGN SYSTEM

Create `able-v5.html` as an empty file with only the design system — no visible content yet. Get the token layer perfect before building structure.

**2.1 — HTML shell:**
```html
<!DOCTYPE html>
<html lang="en" class="theme-dark vibe-indie">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0d0e1a">
  <meta name="description" content="">
  <title>ABLE — Artist Name</title>
  <!-- Single Google Font loaded: vibe display font only -->
  <!-- preconnect to fonts.googleapis.com -->
</head>
<body data-theme="dark" data-vibe="indie" data-state="profile">
  <!-- All sections render here -->
  <!-- Design system specimen (hidden) -->
  <div id="ds-specimen" aria-hidden="true" style="display:none"></div>
</body>
</html>
```

**2.2 — Write the complete CSS token system** as specified in Section 1.4. Then the 4 theme overrides and 7 vibe overrides.

**2.3 — Typography specimen**: Hidden `#ds-specimen` showing every typographic level in every vibe + theme. Toggle with `?specimen=1` URL param for verification. Useful for design review.

**2.4 — Motion system**: All 4 easing curves as CSS custom properties. Core `@keyframes`: `fadeUp`, `shimmer`, `glowBreathe`, `starBurst`, `countdownFlip`, `shake`, `glossPass`, `eqPulse`. Reusable JS animate wrapper:
```js
function animate(el, keyframes, options = {}) {
  return el.animate(keyframes, {
    duration: options.duration || 250,
    easing: options.easing || getComputedStyle(document.documentElement)
                              .getPropertyValue('--ease-decel').trim(),
    fill: options.fill || 'both',
    ...options
  })
}
```

**2.5 — Derived token JS**: `applyDerivedTokens()` function (see Section 1.4). Call on load + whenever accent or vibe changes.

**2.6 — Verify** with Playwright: all 7 vibes render correct display font, all 4 themes switch cleanly, no horizontal scroll at 375px. Screenshot each combination.

---

## PHASE 3 — BUILD THE PAGE STRUCTURE

Mobile-first. 375px is the primary canvas. 768px+ adapts to centred iOS shell (430px max-width for content, 1200px for desktop wrapper).

Build sections in order. After each section: Playwright screenshot at 375px and 768px.

**3.1 — iOS shell + status bar**
- `max-width: 430px`, centred, `border-radius: 44px` on desktop (matches iPhone Pro shell)
- Status bar: static "9:41", signal/wifi/battery icons (SVG inline)
- `overscroll-behavior-y: contain` on the scroll container — iOS rubber-band without chain-scroll
- Desktop: shell centred with `#080810` behind, subtle accent edge glow

**3.2 — Bottom tab bar** (build before hero — structural foundation)
- 5 tabs: Home / Listen / Shows / Merch / Support
- `position: fixed; bottom: 0; env(safe-area-inset-bottom)` safe area padding
- Sliding dot indicator: single element, `transition: left 350ms var(--ease-spring)`
- Tab icons: SVG, 24px, `color: var(--color-text-3)` inactive, `color: var(--color-accent)` active
- Tab bar hide-on-scroll-down: `translateY(100%)` with `--ease-accel` 200ms. Reveal on scroll up.
- Scroll-to-top on re-tap active tab — NO bounce animation on re-tap

**3.3 — Hero / Top card** (most important section — get this right before anything else)
- Full-bleed content area (artwork, video, or embed — artist's choice)
- Artist photo avatar: 48px circle, bottom-left of top card
- Ambient glow layer (separate `<div>`) — `radial-gradient` using `--color-ambient-rgb`, breathing animation
- Artist name: `font-family: var(--font-display)`, `font-size: var(--text-hero)`, `line-height: var(--lh-tight)`, `letter-spacing: var(--ls-display)`. Uppercase for condensed vibes.
- Genre tag + location: `font-size: var(--text-sm)`, `color: var(--color-text-2)`, `letter-spacing: 0.06em` uppercase
- State tag chip: per-state colour (see 1.9), per-state copy
- Bio strip: 2-3 sentences, tap "More" to expand. First person. `--lh-body`.
- Primary CTA: 56px height, full-width, accent fill, icon + label
- Secondary CTA: ghost/outline, same height
- Hero name reveal animation (#47) on page load

**3.4 — Quick Action pills**
- Horizontal scroll row with `overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none`
- Max 4 visible + "More" overflow toggle
- `height: 36px`, `padding: 0 var(--sp-4)`, `--color-accent-soft` background
- Platform icon (SVG) + label
- Left-to-right wave entrance animation with spring bounce (#48 + #60 shimmer)
- Subtle `›` arrow inside each pill — signals tap-ability

**3.5 — Listen section**
- "Listen" header with accent dot, section header pin (sticky below top bar)
- Latest release card: artwork 1:1, title, subtitle, stream CTA
- Track list below: artwork thumbnail 40px, title, type (Single/EP/Album), year, play button
- "Show all releases" link for overflow
- Section fades in as fan scrolls to it (IntersectionObserver)

**3.6 — Shows section**
- "Shows" header with accent dot, sticky header
- Each show: date block (day number in accent colour, month in `--color-text-3`), venue, city, "Tickets" CTA
- Sort order: future events first (ascending by date), past events below at `opacity: 0.5`
- Max display: 6 events in bento grid (overflow behind "See all shows" link)
- Empty state: "Nothing booked right now — check back soon." in `--color-text-3`, muted
- In gig state: tonight's show moves to position 2 on the page (after top card)
- **Geo-aware surfacing**: if fan's geolocation is available (browser permission), the nearest upcoming show within 150 miles floats to the top with a "Near you" chip. Non-blocking — geolocation is optional. "There's a show near you in Manchester on Saturday."
- **Smart link expiry**: ticket links auto-expire post-show (detect when `event.date < now` and mark as past — no longer show "Tickets" CTA, replace with "Stream the music" for that event). No dead links ever.
- **Sold-out waitlist**: if ticketing provider returns sold-out status (DICE API, Eventbrite API), swap "Get tickets" for "Join waitlist" — passes fan email to provider's waitlist.

**3.7 — Snap cards** (artist updates)
- Horizontal scroll carousel
- Each card: coloured or image background, short text (artist voice, first person), optional CTA
- "From [Name]" section header, or no header
- Card entrance: spring scale from 0.95 as it enters viewport

**3.8 — Merch section**
- "Merch" header
- 2-column grid (or single-column for fewer items)
- Product image, name, price, "Get it" CTA
- Empty state: hide section entirely — no empty header

**3.9 — Support section**
- "Support" header
- 1-3 tier cards with name, price, included items, CTA
- First-person tone: "Join my inner circle" not "Buy premium tier"
- Tier examples: Inner Circle £5/mo, One-time tip buttons (£3/£5/£10/£20)
- **Tier select interaction** (#42): Tap a tier card → it lifts `translateY(-4px)`, gains accent border, CTA activates. Other cards dim to `opacity: 0.6`. The page communicates "you've made a choice" before any purchase is initiated.

**3.10 — Fan capture**
- "Stay close." as the section heading (implicit: "I'll only reach out when something's actually happening.")
- Email input: `autocomplete="email"`, accent focus glow, paste flash
- Submit button: "Stay close." — spinner on submit, checkmark on success, confetti burst, email echo
- `prefers-reduced-motion`: skip confetti, show static success state
- **GDPR compliance** (non-negotiable for EU fans): below the input, always show "By signing up you're joining [Artist Name]'s list, managed by ABLE. We'll handle your data with care." Consent checkbox if required by jurisdiction (auto-detect for .eu domains or `navigator.language` EU locales). Store: `{ email, ts, source, consent: true, consentMethod: "checkbox|implied", jurisdiction: "EU|UK|other" }`.
- **Pre-save to fan capture pipeline**: if fan arrives in pre-release state, the fan capture can act as a "notify me when it drops" — submit email → tagged as `source: "presave"` → fan gets email on release day (if artist sends it). This is opt-in fan communication, not auto-email.
- **Fan source tracking**: always store `source` in the fan record (where they came from: `direct | tiktok | ig | yt | email | qr`). This is the `?src=` param from the link. Artists see which channel drives the most loyal fans.

**3.11 — Credits section** (collapsed by default)
- "Credits" collapsed accordion below fan capture
- Shows peer-confirmed (✓) and metadata-verified credits for current release
- Unverified credits shown without mark
- Link to credited ABLE artists if they have profiles

**3.12 — Recommendations** (optional)
- "[Artist Name] is into:" followed by up to 5 artist pills
- ABLE artists: link to their profiles. Non-ABLE: plain text name.

**3.13 — Setlist mode** (optional, future — note here for architecture)
- Artist activates during or after a live show. Profile transforms to show setlist.
- Each track: clickable → stream it (opens Spotify/Apple Music/etc.)
- Fans scan the QR code during or after the show to see what was played + stream it
- Post-show engagement that extends the gig state meaningfully
- Not in v5 scope but the data model must support it: each release has a boolean `inCurrentSetlist` flag

**3.14 — Footer**
- "Made with ABLE" in `--color-text-3`, `--text-xs`
- Hidden on Artist Pro tier (white-label)
- "Your fan list — exported any time. No lock-in." — the ownership promise, always visible

---

## PHASE 4 — IMPLEMENT THE MICRO-INTERACTIONS

Work through the interactions from Section 1.5 in complexity order (low → high). Each is a self-contained CSS block or JS function. Comment each: `/* MI-16: Scale-down on press (02-touch-and-tap.md) */`.

Full implementations with exact code are in `docs/micro-interactions/` — read each file, don't guess at values.

After all interactions: Playwright screenshot full scroll-through. Test fan capture form end-to-end.

Priority order for v5 launch:

| Priority | Interaction | File ref |
|---|---|---|
| Must | Scale-down on press | 02 #16 |
| Must | Spring-back release | 02 #17 |
| Must | Tab indicator spring | 03 #31 |
| Must | Scroll-triggered entrances | 01 #7 |
| Must | Staggered card bloom | 04 #46 |
| Must | Skeleton shimmer | 06 #71 |
| Must | Submit loading → checkmark | 05 #64 |
| Must | Fan signup confetti | 07 #79 |
| Must | Email focus glow | 05 #61 |
| Must | Hero name reveal | 04 #47 |
| Must | Panel slide-up | 04 #50 |
| Must | Scroll-to-top on re-tap | 09 #99 |
| Must | Tab bar hide on scroll | 01 #8 |
| Must | Campaign state crossfade | 03 #32 |
| Must | Live pulsing dot | 03 #36 |
| Must | Email echo | 07 #85 |
| Must | Lazy image fade | 01 #3 |
| Next | Gig mode flash | 03 #34 |
| Next | Digit flip countdown | 03 #35 |
| Next | Copy link flash | 07 #83 |
| Next | Ambient glow breathing | 08 #87 |
| Next | Artwork colour extraction | 06 #74 |
| Next | Platform pill shimmer | 04 #60 |
| Next | Artist name gloss pass | 08 #90 |
| Next | Swipe-to-dismiss | 02 #25 |
| Next | Section header pin | 01 #10 |
| Next | Deep link highlight | 09 #98 |
| Next | Stats counter (admin) | 04 #59 |
| Next | Support tier card lift | 03 #42 |
| Next | Release badge swap (asymmetric) | 03 #43 |
| Next | Connection badge slide-in | 03 #45 |
| Next | Overflow pill inline expansion | 03 #40 |

---

## PHASE 5 — ALL 4 THEMES

Implement and verify: Dark (default), Light, Glass, Contrast. Theme switcher in demo mode: 4 icons, class swap on `<body>` and `data-theme` attribute. Smooth `transition` on all themed elements (150ms `--ease-standard`).

**Glass theme requirement**: There must be a real background behind the glass — artist's hero artwork at `blur(40px) scale(1.1)` as `position: fixed; inset: 0; z-index: -1`. Glass on nothing is meaningless.

**Light theme**: Background is warm cream `#f0ede8`, not clinical white. Dark text. Accent stays the same — this is a colour relationship that must be tested per vibe.

For each theme: Playwright screenshot of hero, music section, fan capture section.

---

## PHASE 6 — ALL 4 CAMPAIGN STATES

Implement state auto-switching using the `computeState()` logic from Section 1.9. Store state in `able_v3_profile.stateOverride` (localStorage).

Build a demo state switcher in demo mode (4 buttons: Profile / Pre-release / Live / Gig). For each state: Playwright screenshot on mobile and desktop.

State visual changes must include:
- Tag chip colour and copy
- Hero content rearrangement
- Primary CTA label change
- Ambient glow intensity change (profile → live → gig = increasing energy)
- Gig: faster breathing glow, pulsing dot

---

## PHASE 7 — THE 7-VIBE SYSTEM LIVE

Wire vibe classes to CSS token overrides (Section 1.3). Fonts load on demand — only the selected vibe's Google Font fetches.

Build hidden vibe switcher in demo mode (7 buttons). Show live preview as accent colour, display font, and radius all update simultaneously.

Playwright screenshot of each vibe on dark theme — hero section only. Check that each vibe reads as a **different artist world**, not just a colour swap. The display typeface should be doing most of the heavy lifting.

---

## PHASE 8 — DEMO MODE + localStorage WIRING

**Demo mode** (when no localStorage data exists): Page renders with sample data for **MAYA** — a UK indie artist. Real-feeling, not obviously fake.

MAYA's profile:
```js
const DEMO_PROFILE = {
  name: "MAYA",
  bio: "Making music in South London. My new EP came out of a strange winter. I think it shows.",
  genre: "Indie / Alternative",
  vibe: "indie",
  location: "South London",
  accentColor: "#7ec88a",
  theme: "dark",
  stateOverride: null,
  releaseDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago → live state
  releaseTitle: "Strange Winter EP",
  releaseType: "EP",
  releaseArtwork: null,  // will use accent gradient placeholder
  ctaPrimary:   { label: "Listen on Spotify", url: "https://spotify.com", type: "stream" },
  ctaSecondary: { label: "Buy the EP", url: "https://bandcamp.com", type: "merch" },
  platforms: [
    { name: "Spotify",     url: "https://spotify.com",        icon: "spotify" },
    { name: "Apple Music", url: "https://music.apple.com",    icon: "apple-music" },
    { name: "Bandcamp",    url: "https://bandcamp.com",       icon: "bandcamp" },
    { name: "Instagram",   url: "https://instagram.com",      icon: "instagram" }
  ],
  music: [
    { title: "Strange Winter",  type: "EP track",  year: 2026, artwork: null, url: "https://spotify.com" },
    { title: "Blue Coat",       type: "EP track",  year: 2026, artwork: null, url: "https://spotify.com" },
    { title: "Home Again",      type: "EP track",  year: 2026, artwork: null, url: "https://spotify.com" },
    { title: "A Small Defeat",  type: "Single",    year: 2025, artwork: null, url: "https://spotify.com" }
  ],
  events: [
    { date: "2026-04-12", venue: "Moth Club",     city: "London",  country: "UK", ticketUrl: "https://dice.fm" },
    { date: "2026-04-20", venue: "The Hug & Pint", city: "Glasgow", country: "UK", ticketUrl: "https://dice.fm" }
  ],
  snapCards: [
    { text: "Strange Winter EP is out. I don't know how to talk about it yet. Just listen.",     cta: null },
    { text: "Playing Moth Club in April. It's a small room. I like small rooms.",                ctaLabel: "Get tickets", ctaUrl: "https://dice.fm" }
  ],
  support: {
    tiers: [
      { name: "Inner Circle", price: 5, period: "month", description: "Exclusive demos, behind the scenes, early ticket access and direct messages." }
    ],
    tips: [3, 5, 10, 20]
  },
  credits: [
    { role: "Mixed by",     name: "Studio Zero",  url: "https://able.fm/studiozero",  verified: true },
    { role: "Mastered by",  name: "Abbey Road",   url: null,                           verified: false }
  ],
  recommendations: [
    { name: "Olive",  url: "https://able.fm/olive" },
    { name: "Mimi",  url: null }
  ]
}
```

**localStorage wiring**: Read `able_v3_profile` key on load. If present and valid, override all demo data. Schema must match v3's key exactly for migration compatibility.

**Demo mode UI**: In demo mode, a small "Demo mode" chip is visible at the top of the page. Clicking it opens a panel with: state switcher / vibe switcher / theme switcher. This is for design review, not production.

---

## PHASE 9 — AI LAYER (Claude API)

Add the bio writer as the first AI feature. Dashboard/demo panel trigger.

**Bio writer** (Netlify function / Cloudflare Worker at `/api/bio-writer`):
```js
{
  model: 'claude-haiku-4-5-20251001',  // cheap + fast for copy tasks
  max_tokens: 150,
  system: `Write artist bios. First person. 2-3 sentences. Present tense. Warm, honest, specific.
           Sound like the artist wrote it, not a publicist.
           Never use: passionate, journey, authentic, monetise, content creator.
           UK register — slightly understated. Specific over generic.`,
  messages: [{ role: 'user', content: `Genre: ${genre}. Influences: ${influences}. Note: ${note}.` }]
}
```

Show 3 variants. Artist picks one, edits it inline, saves to `able_v3_profile.bio`. Never auto-save without confirmation.

**Caption writer** (second AI feature — future): Same pattern, shorter output, for snap card copy.

---

## PHASE 10 — PERFORMANCE AUDIT

Run Lighthouse via Playwright. Fix anything below these targets:
- First Meaningful Paint: < 1.5s
- Time to Interactive: < 3s
- No horizontal scroll at 375px — hard fail if not met
- All below-fold images lazy-loaded
- No render-blocking scripts
- Hero image preloaded where URL is known

Parse-check all JS after editing:
```
node -e "require('fs').readFileSync('able-v5.html','utf8').match(/<script>([\s\S]*?)<\/script>/g).forEach(s=>new Function(s.replace(/<\/?script>/g,''))())"
```

---

## PHASE 11 — FINAL REVIEW

Complete Playwright screenshot set:

1. Mobile (375px): Dark theme, Indie vibe — all 4 campaign states
2. Mobile (375px): Light theme, R&B vibe — hero + fan capture
3. Mobile (375px): Glass theme, Electronic vibe — hero
4. Mobile (375px): Contrast theme, any vibe — hero + fan capture (accessibility check)
5. Desktop (1200px): Dark theme, Indie vibe — full page
6. All 7 vibes: Dark theme, mobile, hero section only

Review checklist:
- [ ] Hero name feels poster-scale — fills the viewport width on 375px
- [ ] Accent colour appears in 7+ places on the page
- [ ] Glass theme has a real background behind the glass (not glass on nothing)
- [ ] Each vibe looks like a different artist world — not just a colour swap
- [ ] Zero banned phrases anywhere in the UI
- [ ] Fan capture copy is in the artist's first-person voice
- [ ] Section headings: "Listen", "Shows" — not "Music", "Events"
- [ ] Every empty state has thoughtful copy — no blank sections
- [ ] Every button has scale-down press state (`:active`)
- [ ] Fan capture: focus glow → loading spinner → confetti → email echo
- [ ] Campaign states crossfade smoothly — no hard cuts
- [ ] Tab indicator slides with spring
- [ ] Scroll-to-top fires on active tab re-tap (no bounce on re-tap)
- [ ] Tab bar hides on scroll down, reappears on scroll up
- [ ] No horizontal scroll at 375px
- [ ] All below-fold images lazy-loaded
- [ ] Gig state has pulsing red dot + faster glow breathing
- [ ] Platform pills have `›` arrow signifier
- [ ] Demo mode shows MAYA with real-feeling data in live state
- [ ] Artist name gloss pass fires once on load (Dark + Glass themes)
- [ ] State tag colours: pre-release=amber, live=red, gig=red, profile=none
- [ ] "Your fan list — exported any time. No lock-in." is visible
- [ ] All 7 vibe display fonts load correctly (no fallback system font visible)
- [ ] iOS overscroll has accent tint behind the rubber-band bounce area
- [ ] Hero CTAs use 4–8px border radius (`--r-sm`), NOT pill radius — hard edges = confidence
- [ ] Support tier card lifts and dims unselected cards on selection
- [ ] Past shows display at 50% opacity below future shows (sorted ascending by date)
- [ ] Release badge text swaps with 100ms exit / 200ms entry (asymmetric, never hard-swap)
- [ ] Platform connection badge shows artist name: "Connected as [Name]" not just platform name
- [ ] Panel close releases scroll lock — no locked scroll after sheet dismissal

---

## NON-NEGOTIABLE CONSTRAINTS

**Code:**
- Single HTML file — no external CSS or JS files
- Vanilla JS only — no libraries, no frameworks, no jQuery
- CSS custom properties for all design decisions — no magic numbers
- Parse-check all JS after editing
- All 4 themes must work after any CSS change — test them
- No inline styles except where JS dynamically sets computed values

**Design:**
- Mobile-first: 375px is the primary canvas
- 44px minimum tap target — non-negotiable
- No horizontal scroll at 375px — non-negotiable
- Spring easing for entrances, deceleration for panels, acceleration for exits, standard for state changes
- One accent colour — `--color-accent` — never a second accent, never a gradient on the accent itself
- Only animate `opacity` and `transform` in loops — never `box-shadow`, `width`, `height`, `filter`
- 60fps on mid-range Android — test before shipping any looping animation
- Hero CTAs: `--r-sm` border radius (4–8px), NOT `--r-pill` — pill = consumer app, square = premium confidence
- `backdrop-filter` cannot be animated directly — use `::before` opacity trick for glass theme transitions

**Copy:**
- Never: monetise / grow your audience / content creator / followers / going viral / exclamation marks on UI copy / "you're all set" / "get started" / "superfans" (public UI)
- Always: first-person artist voice on profile, UK register (understated), specific over generic
- Section names: "Listen" (not Music), "Shows" (not Events)
- Fan capture: "Stay close." as the CTA and heading

**Architecture:**
- `able_v3_profile` localStorage key — do not rename (migration compatibility)
- All localStorage keys map 1:1 to future database rows
- Demo mode with MAYA sample data when no localStorage exists
- No context switch from reel — top card continues the experience the fan was having

**Data integrity** (from PRODUCT_HIERARCHY_AND_TRUST.md — §6):
- If a platform integration is broken or returns stale data, show nothing — never display stale or misleading metrics
- Fan count on the public profile is opt-in only; never show it unless the artist has enabled it, and always show the real number
- Language precision: "Fan sign-ups" not "followers", "People who came to your page" not "Page views" — the words we use communicate whether we're honest
- Credits: never add a ✓ automatically, never sell verification, never gamify it

**Git:**
- Commit after each phase: `git commit -m "feat(v5): phase N — [description]"`
- Never push to main without explicit user instruction
- Never force-push, never reset --hard

---

## WHAT GOOD LOOKS LIKE

When v5 is done, three reactions must be possible:

**A UK indie artist opens it and feels:** "That looks like me. That's the best page I've ever had." The vibe system, the colour, the typeface, the copy register all feel chosen by them, not by a platform. The motion feels alive without showing off.

**An industry person (manager, booker, journalist) opens it and thinks:** "This is a serious artist." The page communicates career stage, release cadence, live presence, and fan depth — without a dedicated press section.

**A fan clicks through from a reel and feels:** "I'm close to this person. I want to stay." The top card continues what they were watching. The fan capture form is there when they're ready. Nothing is pushy. Everything is there.

That is the bar. Build to it.

---

## THE SINGLE MOST IMPORTANT SENTENCE

*Every artist on ABLE owns their fan data. Every fan list is exportable. No lock-in. Ever.*

Build this into the product. Build it into the homepage. Say it simply. Mean it completely. This is what turns a cautious artist into an advocate.

---

*Research basis: docs/USER_RESEARCH.md, docs/DESIGN_RESEARCH_2026.md, docs/VISUAL_SYSTEM.md (authoritative for font specs), docs/brainstorms/2026-03-13-top-minds-insights.md, docs/INTEGRATIONS_AND_AI_RESEARCH.md, docs/MASTER_PLAN.md (Section 16), docs/PLATFORM_STRATEGY.md, docs/PRODUCT_HIERARCHY_AND_TRUST.md, docs/PROFESSIONAL_DISCOVERY.md (authoritative for all Studio mode / credits / professional discovery decisions). Full micro-interaction library: docs/micro-interactions/ (9 files, 100 interactions). Design brainstorms: .superpowers/brainstorm/12988-1773342870/ (onboarding, fan-feed, full-product, top-card, states, hero-treatment, colour-mockups). Screenshots: v3-home.png, review-home-dark.png, review-glass.png, review-light.png, review-support.png.*

*Build prompt version: 5.2 — Updated 2026-03-13. This version adds: professional discovery system (artist-first Studio mode framing, credits as discovery graph, IMDb model, 3 professional types, credit verification, "People in my world", what ABLE does NOT build — full spec in docs/PROFESSIONAL_DISCOVERY.md). Previous 5.1: Living QR, GDPR consent schema, geo-aware events, smart link expiry, sold-out waitlist, auto-Spotify state switching. Previous 5.0: multi-role single login, shop architecture, fan feed commerce, freelancer profile spec, landing page 3-persona spec, wizard all entry angles, complete CTA library, embed hierarchy, bio writer detailed spec. Previous: ABLE design DNA, CTA border-radius signal, 20+ micro-interactions, backend stack, vibe corrections, admin slide-up model.*

---

## PART II — EXPANDED PRODUCT ARCHITECTURE

*Sections 2.1–2.12 expand the product scope beyond the single profile page. Read these before building any page beyond able-v5.html.*

---

### 2.1 — All pages: the complete ABLE product map

| Page | URL | Who sees it | Status for v5 |
|---|---|---|---|
| **Landing page** | `/` or `landing.html` | Anyone | Build with 3-persona sections |
| **Wizard / Onboarding** | `/start` or `start.html` | New artists/freelancers | 5 entry paths |
| **Artist profile** | `/@handle` or `able-v5.html` | Anyone (public) | PRIMARY BUILD |
| **Admin panel** | `/@handle?edit=1` | Artist (authenticated) | Slide-up on same page |
| **Fan feed** | `/home` or `fan.html` | Fans (authenticated) | Build after profile |
| **Freelancer profile** | `/@handle?mode=studio` | Anyone (public) | Same URL, mode toggle |
| **Fan profile** | `/@handle?mode=fan` | The fan themselves | Low-priority |
| **404 / Not found** | `/404` | Anyone | Simple, on-brand |
| **Login / Auth** | `/login` | Returning users | Magic link only |

**The key principle**: One account, one handle, multiple faces. `/@handle` is always the artist profile. `/@handle?mode=studio` shows the freelancer face. There is no separate URL for a freelancer — it's the same person, the same handle, a toggle.

---

### 2.2 — Multi-role single login

An artist is often also a fan (of other artists) and a freelancer (producer, mixer, engineer). Creating separate accounts for each role creates friction and breaks the trust relationship. ABLE uses a single account with profile modes.

**Account structure:**
```
User account (email, magic link auth)
  └── Artist profile (enabled if artist)
  └── Freelancer mode (enabled if checked "I also work as a producer/engineer/etc.")
  └── Fan activity (always: follows artists, gets notifications, signs up to lists)
```

**Profile mode toggle logic:**
- The profile URL `/@handle` always shows the **artist profile** by default
- If freelancer mode is enabled, a small "Studio" tab/pill appears on the profile
- Tapping it surfaces the freelancer view within the same page — a second "face" of the same person
- A fan visiting the profile can see both: "Artists she's worked with" and "Her releases"

**Data that flows from artist → freelancer (zero re-entry):**
```
Artist name       → Freelancer name (same)
Profile photo     → Freelancer photo (same)
Genre/vibe        → Freelancer speciality context ("specialises in indie, folk")
Bio              → Freelancer bio prefix (editable, defaults to artist bio)
Location         → Freelancer location (same)
Credits on releases → Freelancer credits (verified, auto-populated)
Social links     → Freelancer contact links (same)
```

**New fields only on freelancer profile (additional setup):**
```
Role(s)          → Producer / Mixer / Mastering engineer / Songwriter / Session musician / etc.
Rate card        → Day rate, half-day rate, project rate, or "enquire"
Availability     → Available now / Booked until [date] / Closed
Portfolio        → Links to specific tracks they worked on (can point to artist profiles)
Credits          → Already populated from release data
Booking CTA      → "Book a session" → email or Calendly link
```

**MBTI lens for this decision:** Artists (INFP/INFJ/ISFP) deeply dislike admin overhead. The promise "your artist profile already has your credits — no re-entry" is what converts a producer into also having a freelancer profile. The laziest possible path to a professional studio presence.

---

### 2.3 — Shop & commerce architecture

**The problem this solves:** Not every artist has a Shopify store. Many have nothing. But they still want to sell things — vinyl pressings, handmade items, prints. And some have associated products (gear they use, brands they work with) they want to surface to fans. The fan buying something is a deeper engagement act than streaming.

**Four commerce tiers (artist enables what's relevant):**

**Tier 1: Merch (existing)** — Products the artist controls. Physical: T-shirts, vinyl, prints. Digital: sample packs, stems, sheet music, VST presets. Artist uploads artwork, sets price, links to their own store or platform.

**Tier 2: External shop link** — Artist has an existing shop elsewhere. ABLE shows a "Shop" CTA that opens their Etsy, Bandcamp, Shopify, Spring/Teespring, or Big Cartel store in a modal (or new tab). No inventory management in ABLE. One link, one CTA.

**Tier 3: Print-on-demand pass-through** — Artist uploads artwork. ABLE generates a Printful/Printify product link. Fan clicks → prints on demand. Artist earns margin. ABLE takes a small platform fee. No inventory risk. This is the "I want merch but don't have any" solution.

**Tier 4: Associated products** — Things the artist uses, endorses, or loves. Gear: their guitar, their audio interface, their headphones. Clothing: a brand they wear. Music tools: a plugin, a sample library. These can be affiliate links (Amazon, Affiliate Window). Copy must be in the artist's voice: "I've been using these headphones for 3 years. Worth every penny." NOT a commercial banner.

**The best commerce in creator tools is the one fans don't notice is commerce.** Spotify's Artist Pick with a product and a sentence in the artist's voice reads as a recommendation. A product grid at the bottom of a profile reads as a store. The difference is context and curation.

**ABLE's shop section should feel like the artist is showing you something they made — not selling you something they stock.**

**Commerce section naming:**
- If artist has their own merchandise: "Shop" (not "Merch" in the tab bar)
- If purely external links to associated products: "Picks" or "Gear"
- Artist sets the section name — default to "Shop"

**Five integration paths (build in order, stop when sufficient):**

**Path 1 — External link card (MVP, build first):**
```
Artist fills: "Shop URL" → https://artistname.etsy.com (or Bandcamp, Fourthwall, Big Cartel, etc.)
ABLE scrapes: OG image + title + price from URL (simple scraper endpoint)
Profile shows: up to 3 styled product cards with image, name, price, "[Platform] ↗"
No checkout in ABLE. Fan taps → goes to external store.
Copy: every card has a 1–2 line artist-written context field.
  "Designed after the Berlin run. Ships in 4 weeks."
  NOT: "Premium cotton tee featuring exclusive album artwork."
```

**Path 2 — Fourthwall connect (recommended first real integration):**
```
Fourthwall powers Spotify's merch shelf — proven, music-native, creator-first.
Connect flow: OAuth, artist authenticates → ABLE pulls their product list.
Artist selects up to 4 products to feature (not the whole catalogue — restraint is the design).
Products sync automatically when artist updates Fourthwall.
Fan taps → goes to that specific product on Fourthwall checkout.
```

**Path 3 — Shopify Storefront API:**
```
Shopify Storefront API: public read access — no merchant access needed.
Artist pastes their Shopify store URL → ABLE pulls featured products.
Product cards displayed; fan taps → Shopify checkout. ABLE never touches payment data.
```

**Path 4 — Everpress campaign model (vinyl drops, limited runs):**
```
Campaign window + minimum order + print-on-success.
Artist sets: closes [date], minimum 50 orders to print.
ABLE shows: campaign countdown chip, "Pre-order closes [date]", order counter.
This is how vinyl pre-orders feel culturally. Fans are participants, not customers.
```

**Path 5 — Print-on-demand via Printful (post-backend, 3–6 month build):**
```
Printful API: Catalog, Products, Orders, Mockup Generator endpoints.
Rate limit: 120 calls/min. OAuth 2.0 available.
CRITICAL: Printful handles fulfilment, NOT checkout. ABLE must build own Stripe layer.
Do not build this in v1. Build Paths 1–2 first.
```

**Artist-voice copy is non-negotiable on every product card.** If the artist hasn't written their own context, show a prompt in the admin: "What do you want to say about this? (Optional — but fans read it.)"

**Max 3 products in the default view.** Anything more goes behind "See all in the shop →". A fan seeing 3 curated products feels like a recommendation. 20 products feels like a catalogue.

**Associated products / "Things I'm Into" snap card type:**
```
A dedicated snap card type (not a separate section, not a shop).
Artist adds: product name + image + 1-line in their voice + URL
URL routing: Geniuslink handles international smart routing (one link → correct Amazon/retailer per country)
Examples of the right tone:
  "The reverb pedal I use on everything. Sounds like a cave."
  "The book I read on tour. Made me change a lyric."
  "The headphones I mix on. Worth the money."
Max 5 items per card. Curation, not a gear list.
Differentiated: no other link-in-bio tool for musicians has this.
```

**Scarcity rules — authentic vs. dark pattern:**
```
ALLOWED: "Limited to 100 copies" (if literally true)
ALLOWED: "Campaign closes [specific date]" (Everpress model)
ALLOWED: "Ships when we hit 50 orders"
BANNED:  "Only 3 left!" (unless literally true — verify before showing)
BANNED:  Countdown timers not tied to a real event
BANNED:  "Selling fast" / "Popular item" (fake urgency)
```

---

### 2.4 — Fan feed commerce integration

The fan feed (fan.html) is where fans see what their followed artists have been up to. Commerce must appear here in a way that feels like a recommendation from a trusted person — never an advertisement.

**The 1-in-5 rule:** No more than 1 commerce card per 4 content cards. If the feed has 8 content updates, it can have at most 2 commerce cards. This is non-negotiable. Below this threshold, it reads as editorial. Above it, it reads as advertising.

**Research basis:** Instagram Shopping's proven model — product tags appear *inside* content, never as separate ad slots. Pinterest's shoppable pins work because discovery happens in browsing mode. Both work because commerce is secondary to content, always.

**Commerce card types in the fan feed:**

**Type A: New product launch**
- Triggered when: artist adds a new product to their shop
- Card shows: product artwork, product name, price, "Shop" CTA
- Copy: in the artist's voice (same as what they wrote in ABLE admin) — "Just got the first batch of vinyl back. 100 copies." NOT "Check out our new vinyl release!"
- Visual: same card style as content cards, but with a "Shop" type chip

**Type B: Shop spotlight (manual)**
- Artist manually adds a snap card with type "Shop"
- They write the copy themselves — ABLE never auto-generates commerce copy
- Looks exactly like a regular snap card but tagged "Shop"
- Example: "I've been making candles. Strange, I know. Link in bio."

**Type C: Associated product pick**
- Only shown if artist has Tier 4 (Associated products) configured
- Card shows: product photo, product name, artist's one-line endorsement
- Type chip: "From [Artist's] Picks" — clearly editorial not ad
- Frequency: max 1 associated product pick per week per artist in a fan's feed

**Type D: External shop CTA**
- Low-key, small — a row at the bottom of an artist's digest section
- "Also: their Etsy shop has new items →"
- Not a card. A single line. No image. Respectful of the fan's time.

**Fan feed card visual hierarchy:**
```
MOST SPACE:    New release card / Event card (largest — 100% height)
MEDIUM SPACE:  Snap card / Video card (medium — 100% height)
LEAST SPACE:   Commerce card (same width, 80% height — quieter but present)
SMALLEST:      "Also: their shop has new items →" (text row, no image — least intrusive)
```

**Commerce card copy rules (fan feed):**
```
ALLOWED:    Artist's own words from the product context field
ALLOWED:    "[Artist] just added to the shop" (neutral, factual)
ALLOWED:    "New merch from [Artist] — limited run" (if truly limited)
BANNED:     "Shop Now" / "Buy Now" — CTA labels that feel like ads
BANNED:     Auto-generated commerce copy (ABLE never writes this)
BANNED:     Commerce cards for artists the fan doesn't follow
```

**Commerce never replaces music.** A fan feed must always lead with music and events. Commerce is always secondary. An artist who hasn't released or announced anything in 30 days should not have their shop card appearing weekly — commerce cards are triggered by new additions to the shop, not on a schedule.

---

### 2.5 — Professional discovery and Studio profile

**Full spec:** `docs/PROFESSIONAL_DISCOVERY.md` is the authoritative document for this entire system. Read it before building anything in Section 2.5. What follows is a summary of the key principles and implementation notes for the build.

---

**The fundamental framing:** Studio mode is not a "freelancer product." It is an additional face of an artist. The primary identity is always the artist. Someone who produces for other artists is an artist who also produces — not a freelancer who also makes music. The toggle is understated, not prominent. Fans mostly don't tap it. Industry people do.

**ABLE never positions the professional discovery system as a marketplace, a platform for freelancers, or a competitor to SoundBetter/Fiverr.** It is a credit trail that leads somewhere real. Professionals are found through music people already love.

---

**Three professional types — different needs, different profiles:**

**Type 1 — Artist who also freelances (primary case)**
The most common. A producer who releases their own music. A session musician who also has a band. Full ABLE artist profile + Studio mode toggle (`?mode=studio`). Same handle, same photo, different face of the same person. Discovery path: their credits on other artists' releases → click → lands on Studio mode automatically.

**Type 2 — Freelancer without own releases (studio-only profile)**
A mixing engineer who only mixes for others. No artist sections (no Listen tab, no Shows, no campaign states). Profile is: header + bio + credits + portfolio links + rates + contact. Can "Add artist profile" at any time.

**Type 3 — Industry professional (manager, booking agent, lawyer, A&R)**
Contact card only. Name, role, which artists they work with (links to ABLE profiles), contact email. Artist creates it by listing their team. The professional can claim and edit it. Not a full profile — just findability. Shown in a small "Team" section on the artist profile footer. Fans mostly don't engage with it.

---

**Credit verification — 3 levels:**

| Level | Display | How earned |
|---|---|---|
| Unverified | "Produced by Maya Beats" (no mark) | Artist adds manually |
| Peer-confirmed | "Produced by Maya Beats ✓" (linked) | Professional taps Confirm in dashboard |
| Metadata-verified | "Produced by Maya Beats ✓✓" | ISRC match via distributor |

Peer-confirm flow: artist adds credit + professional's ABLE handle → professional gets notification → one-tap confirm → credit becomes ✓ and links to their Studio profile. **Never auto-confirm. Never sell verification. The ✓ means the professional themselves confirmed it.**

---

**The discovery mechanism — credits as graph edges:**

Each credit is a directed edge. Following an edge takes you from music you love → the person who made it → their other work → other artists they've worked with → more music you might love. This is discovery through quality trails, not search through listings.

**ABLE has no "search for a producer" feature.** This is not a bug — it is the design. If you want to find a producer, start with music you love and see who made it. This keeps discovery intentional and quality-driven.

---

**Studio profile sections (within artist's profile, on `?mode=studio`):**

**Section 1: Studio header**
- Same profile photo, name, location as artist profile
- Role chips: "Producer · Songwriter · Mixer" (set in admin, can stack up to 3)
- Availability badge: "Available" (green) / "Booking from [Month]" (amber) / "Closed" (dimmed)
- Contact CTA: "Work with [Name] →" — opens email client (subject pre-filled: "Enquiry — found you via ABLE") OR Calendly link

**Section 2: Credits — the portfolio**
- Auto-populated from peer-confirmed credits across all ABLE artist profiles
- Verified (✓) credits shown first, then unverified
- Format: `✓ [Role] — "[Release]" — [Artist] ([Year])` — links to that artist's release on ABLE
- Unverified credits show as plain text — not linked, no ✓
- Prompt on unverified: "Is this correct? [Confirm →]"
- **The portfolio writes itself.** A producer credited on 12 ABLE artist profiles has a 12-release portfolio with zero manual work.

**Section 3: Portfolio highlights**
- Max 4 cards (not 6 — curated, not comprehensive)
- Each card: artwork + title + artist + role + year — taps through to that artist's release on ABLE
- In the professional's own voice: "My favourite mix from last year." — never a spec sheet

**Section 4: Rate card (optional)**
- Many professionals prefer "Enquire" over public rates — that's correct
- If shown: Day rate / Half-day / Project rate / Per-track
- Note field in their voice: "I work remotely. Happy to travel for larger projects."
- Never label it "Pricing" or "Services" — label it "Working with me"

**Section 5: People in my world**
- The artist's curated signal of who they trust — **always the artist's choice, never auto-populated**
- Up to 8 entries: other artists, producers/engineers/session musicians they'd work with again, booking agent/manager, visual artists who made work for them
- Never more than 8 — this is curation, not a directory
- Can link to ABLE profiles (artist or studio) or show name + role only
- Section header: "People I rate" / "People I make things with" / "In my world" — artist chooses, or no header
- **Never:** "Recommended Artists" / "My Team" / "Collaborators" — admin labels, not human language
- Why this matters for discovery: if 5 artists you follow all list the same producer in their "People in my world," that's a strong trust signal. You found them through three degrees of trust, not a search.

**Section 6: Fan capture (unchanged)**
- Same "Stay close." form — fans can follow a producer's own releases too

---

**What the Studio profile looks like:**
```
[Header]
[Photo]  Danny L Harle
         Producer · Songwriter · Mixer
         South London  |  Available for sessions
         "Work with Danny →"

[Bio]
"I make pop records with people who care about pop music. I also make
strange club music. I try to keep the two worlds separate, mostly
unsuccessfully."

[Credits]
✓ Produced "So Hot You're Hurting My Feelings" — Caroline Polachek (2023)
✓ Produced "Bunny Is a Rider" — Caroline Polachek (2022)
✓ Mixed "Chalk" — Chalk (2025)
  Produced "Home Session" — Arima Ederra (unverified — not yet on ABLE)
[Show more credits →]

[Portfolio highlights] — 4 cards

[Working with me]
Day rate: £600  |  Half-day: £350  |  Project: Enquire
"I work primarily with indie, pop, and alternative artists."

[People in my world]
[pill: Caroline Polachek →]  [pill: Danny L Harle (own) →]  ...

[Also see: Danny's music →] (links to artist profile)
```

---

**Artist → Studio toggle UI:**
- On artist profile: small "Studio" pill near the bio/role tags — understated, not a nav item
- On studio profile: small "Music" pill — "See [Name]'s releases →"
- Crossfade transition (300ms, opacity) — same person, different face
- Tab bar shift: Music → Credits, Shows → Portfolio, Shop → Rates
- **No separate signup.** Studio mode is activated from within an existing ABLE account.

**URL pattern:**
- `/@dannyharle` → artist profile (default, always)
- `/@dannyharle?mode=studio` → studio profile
- Both shareable — a booker sends `?mode=studio` to other bookers. A fan shares the artist URL.

---

**What ABLE deliberately does NOT build for professional discovery:**
- No ratings or reviews (the credit + artist endorsement is more meaningful than 47 five-stars)
- No "search for a producer" feature (discovery through quality trails only)
- No in-platform messaging (email and Calendly prevent ABLE becoming a support obligation)
- No contracts or payment processing for services (ABLE makes the introduction; the transaction is theirs)
- No "apply to a brief" / job board (marketplace positioning — the opposite of what ABLE is)
- No "top professionals" or "featured" rankings (favours activity over quality)
- No commission (professionals keep everything; ABLE charges subscription, not transaction fees)

---

### 2.6 — Landing page specification (3 personas)

**The landing page must speak to three audiences without feeling like a product catalogue.** The copy never identifies the audience — the audience recognises themselves.

**Page structure:**

**Hero (dark mode default, light mode available):**
```
Headline (dark mode):  "When they click, be ready."
Subhead (dark mode):   "Your page. Your fans. Your data."
Tertiary line:         "Set up in 60 seconds."
CTA:                   "Get your page →" (accent fill, --r-sm radius)
Social proof line:     "12,000 artists already. No lock-in."
```

```
Headline (light mode): "Your music. Your page. Theirs to find."
Subhead:               "The link in your bio that knows what moment it is."
```

**Hero visual:** A split-frame showing 3 moments — pre-release countdown / release night / a show poster. Crossfades slowly. The page literally shows what it means by "the page knows what moment it is."

---

**Artist section (the primary audience):**

Headline: "The page that changes when you do."

Three-column bento moment (dark):
- Column 1: "Set a release date. The page switches automatically." (shows pre-release → live crossfade)
- Column 2: "Toggle gig mode. Tonight's show goes front and centre." (shows gig state)
- Column 3: "Your fans. Yours forever. Export any time." (shows fan list, no lock-in badge)

Copy block:
```
Your Linktree links to your Spotify. Your Spotify doesn't know you're playing
Leeds next Friday. Your ABLE page does.

Every artist on ABLE owns their fan list. We don't hold it hostage. We don't
email your fans on your behalf. We don't show them other artists' content.
It's their address. You keep it.
```

Features grid (show, don't list):
- Campaign states (4 cards)
- 7 genre vibes (colour swatches)
- Fan sign-up with email echo
- Credits system
- Shop integration

Artist CTA: "Start with Spotify →" (imports profile in 30 seconds)

---

**Fan section (secondary, lower on page):**

Headline: "Stay close to the artists you actually love."

Copy:
```
Not an algorithm. Not a playlist curated by a streaming platform.
Just the artists you follow, with what they're actually doing.

New music. Upcoming shows. Direct messages when something matters.
You're on their list because they want you there.
```

Fan CTA: "Find your artists →"

---

**Freelancer section (tertiary, lowest):**

Headline: "Your credits, in one place."

Copy:
```
You've produced, mixed, or co-written on records that matter.
Those credits live buried in liner notes and Discogs pages.

ABLE Studio puts them on your profile, verified by the artists
you worked with. One page. Every credit. Findable by anyone looking
for someone who sounds like you.
```

Freelancer features:
- Verified credits (peer-confirm, one tap)
- Artist connections (links from their profiles to yours)
- Rate card (show or hide as you choose)
- Booking enquiry (no middleman, no platform commission)

Freelancer CTA: "Claim your studio profile →"

---

**Pricing section (landing page):**

Never lead with price. Show it after showing value.

```
Free                     Artist                   Artist Pro
£0                       £9/mo                    £19/mo
─────────────────────    ─────────────────────    ─────────────────────
Your page                Everything in Free       Everything in Artist
100 fan sign-ups         Unlimited sign-ups       Full fan CRM
Campaign states          Campaign modes           Email broadcasts
1 snap card              Unlimited snap cards     Support packs
Basic stats              Fan analytics            Advanced analytics
                         Connections              White-label (no ABLE footer)
```

Copy under pricing: "We'll tell you when you're about to hit a limit — not when you already have. No surprise bills."

---

**The no-lock-in promise (must appear on landing page, prominently):**

```
Your fan list is yours.

Every email address collected through ABLE belongs to you.
Export it any time. CSV, one click. No "you need to upgrade to export."
No fee for leaving. No hostage data.

This is how we'd want to be treated.
```

This goes in a visually distinct block — dark box with accent text or a standout typographic moment. This is ABLE's editorial statement. It's not a feature — it's a value.

---

### 2.7 — Wizard: all entry angles

The wizard is not a form. It's a conversation. The artist never sees a blank form — every field has an example or is pre-filled from import.

**Five entry angles:**

**Entry 1: Spotify import (primary path — 70% of artists)**
```
Step 1: "Search for your Spotify artist profile"
  → Artist types name → Spotify API returns results → one-tap confirm
  → Imports: name, bio, photo, genres, city, discography (up to 20 releases)
  → Shows: "Importing from Spotify... name ✓ bio ✓ photo ✓ 8 tracks ✓"

Step 2: "Confirm — this is me"
  → Shows import card with all populated fields
  → Artist can edit any field by tapping it (inline edit, not a separate form)
  → "This is me →" to confirm

Step 3: "What are you focused on right now?"
  → Four choices (sets the page state):
      🚀 "I'm dropping something new" → pre-release state (asks release date)
      🔥 "Something just dropped" → live state (asks release title/link)
      🎭 "I'm touring" → profile state with shows prominent
      ⚓ "Just want a clean page" → profile state
  → Never show this as a step number. Never call it "Step 3."

Step 4: "Make it yours"
  → Live preview of their page
  → 8 accent colour swatches + hex input
  → Vibe selector (7 options) — show as small cards with display font preview
  → "My page is ready →"

Post-wizard: "Your page is at able.fm/[handle]"
  → Show the handle, confirm it, allow change
  → Magic link sent to confirm email → logged in
```

**Entry 2: Linktree importer (biggest acquisition — Linktree has 50M+ users)**
```
Step 1: "Paste your Linktree URL"
  → ABLE fetches the public Linktree page (HTML parse)
  → Extracts: all links with labels and icons
  → Shows: "Found 8 links — importing as CTAs and platform pills"
  → Maps automatically: Spotify → platform pill, Bandcamp → platform pill,
    custom → CTA link

Step 2: "Add your photo and bio" (what Linktree doesn't have)
  → Photo upload or URL
  → Bio field (pre-shown with genre-based example in muted text)
  → One-line "About" text

Step 3: Goal question (same as Entry 1 Step 3)
Step 4: Make it yours (same as Entry 1 Step 4)
```

**Entry 3: Manual setup (artist not on Spotify / new artist)**
```
Step 1: "What's your artist name?"
  → Name field — as you type, shows "Your page will be at able.fm/[handle-preview]"
  → Handle auto-generated from name (slugified), editable

Step 2: "Tell me a bit about what you make"
  → Genre chips to tap (not a dropdown): Indie / Electronic / Hip Hop / R&B / Rock / Folk / Pop / Other
  → Optional: "And in your own words?" (short bio field)
  → On genre select, vibe is auto-suggested: "Based on indie, I'd suggest this colour →"

Step 3: "Add your best link"
  → Single URL field — detects platform from URL
  → This becomes the primary CTA
  → "You can add more later."

Step 4: Goal question (same)
Step 5: Photo + make it yours
```

**Entry 4: Fan upgrading to artist**
```
Context: A fan has been using fan.html to follow artists. They now want their own page.
Step 1: "You're already on ABLE — let's set up your artist page."
  → Their fan account auto-fills: name (from fan profile), email
  → "Are you on Spotify?" → leads to Entry 1 from Step 1

(Fan data is preserved — follows, sign-ups, etc. are all kept on the same account)
```

**Entry 5: Freelancer-only setup (no artist releases yet)**
```
Step 1: "What do you do?"
  → Role chips: Producer / Mixer / Mastering / Songwriter / Session musician / Video director / Other
  → Multiple select (they can be all of these)

Step 2: "Have you worked on any releases?"
  → Search by track name or artist name → ABLE links to existing artist profiles
  → Or: "I'll add them manually" → free-text credit entry

Step 3: "Your contact"
  → Email for booking enquiries (can be different from account email)
  → Optional: Calendly/notion link for booking

Step 4: Accent + vibe (same as artist but labelled "your studio aesthetic")
```

**Wizard copy rules:**
- Never use the word "step" or show step numbers
- Progress bar: 3px, spring-animated, accent colour, top of screen — that's the only progress indicator
- Each question is the only thing on screen — not a multi-field form
- Example text shows at 40% opacity in every input — the artist never sees a blank
- "→" is the only next button label. No "Next", no "Continue", no "Save and continue"
- If artist pauses > 3 minutes, show: "Your progress is saved. Come back any time." — then nothing more
- Post-wizard: the first time the artist sees their page, it should look genuinely close to ready. If it doesn't, the wizard failed.

---

### 2.8 — Complete CTA library with copy

**The CTA's job is to continue the experience the fan is already having.** Not to interrupt it. A fan on a post-release page should see "Stream the EP" not "Check out my music."

**Primary CTA by state and vibe:**

| State | Electronic | Hip Hop | R&B/Soul | Indie | Pop | Rock | Folk |
|---|---|---|---|---|---|---|---|
| Pre-release | "Pre-save" | "Pre-save" | "Pre-save — I'll let you know" | "Save it for the day" | "Pre-save my new single" | "Pre-save" | "Save it for when it's out" |
| Live (first 14 days) | "Stream now." | "Stream it." | "Listen" | "Listen" | "Stream my new single" | "Listen" | "Hear it" |
| Profile (evergreen) | "Stream on Spotify" | "Stream on Spotify" | "Listen on Spotify" | "Listen on Spotify" | "Stream on Spotify" | "Listen" | "Listen on Bandcamp" |
| Gig | "Get tickets" | "Get tickets" | "Come to the show" | "Come if you can" | "Get tickets →" | "Tickets" | "Come to the show" |

**Secondary CTA by state:**

| State | Secondary |
|---|---|
| Pre-release | "Stay close." (fan capture) |
| Live | "Buy the [EP/album/single]" (if Bandcamp link) or "See shows" |
| Profile | "Come to a show" (if events) or "Support" |
| Gig | "Stream the music" |

**Quick Action pill labels (the micro-CTAs — maximum 12 chars):**

| Platform | Pill label |
|---|---|
| Spotify | "Spotify" |
| Apple Music | "Apple Music" |
| YouTube | "YouTube" |
| Bandcamp | "Bandcamp" |
| SoundCloud | "SoundCloud" |
| Tidal | "Tidal" |
| Dice | "Dice" |
| RA (Resident Advisor) | "RA" |
| Eventbrite | "Eventbrite" |
| Instagram | "Instagram" |
| TikTok | "TikTok" |
| Twitter/X | "X" |
| Discord | "Discord" |
| Patreon | "Patreon" |

**Section action copy (within Listen, Shows, Shop, Support sections):**

| Section | Action | Copy |
|---|---|---|
| Listen | Stream all | "Stream on Spotify →" or "Open in Apple Music →" |
| Listen | Buy | "Buy the record →" |
| Shows | All shows | "All shows →" |
| Shows | Tonight only | "Get tickets for tonight →" |
| Shop | Browse | "Visit the shop →" |
| Shop | Single item | "Get it on Etsy →" / "Get it on Bandcamp →" |
| Support | Subscribe | "Join the inner circle →" |
| Support | Tip | "Send a tip" |

**Copy rules for CTAs:**
- Never start with "Click here", "Check out", "Visit", "Explore"
- Always use present-tense continuation: "Listen", "Stream", "Watch", "Come", "Get"
- Avoid possessives in CTAs: "Listen to my music" → "Listen"
- Directional arrows `→` are for external links only — links that open in new tab
- Phrasing that ends with `→` communicates "this leaves ABLE" — be consistent

---

### 2.9 — Embed hierarchy: all the ways artists show their work

An artist doesn't just have Spotify tracks. They have YouTube videos, TikTok clips, SoundCloud streams, Bandcamp embeds, studio footage, live session recordings. ABLE must support all of these. What goes in the top card vs the Listen section is a decision the artist makes — ABLE guides but doesn't force.

**Top card options (the hero moment):**

| Type | Best for | When to use |
|---|---|---|
| Release artwork | Pre-release, profile state, any artist | Default — clean, works everywhere |
| YouTube embed | Artists with official videos, live sessions | If fan likely came from YouTube |
| TikTok embed | Artists with viral TikTok moments | If fan likely came from TikTok |
| Instagram Reel | Artists with IG-first content | If fan likely came from Instagram |
| Spotify embed | Artists who want in-page streaming | But: low conversion — fan stays in ABLE, not on Spotify |

**The top card source-matching rule:**
When ABLE knows where the fan came from (UTM params on the link: `?src=tiktok`, `?src=yt`, `?src=ig`), the top card auto-selects the matching content type:
```js
function selectTopCard(profile, source) {
  if (source === 'tiktok' && profile.topCard.tiktok) return 'tiktok'
  if (source === 'yt' || source === 'youtube') {
    if (profile.topCard.youtube) return 'youtube'
  }
  if (source === 'ig' || source === 'instagram') {
    if (profile.topCard.reel) return 'reel'
  }
  return profile.topCard.default || 'artwork'  // fallback: artwork always works
}
```
This means: an artist can set up multiple top card types (one YouTube video, one TikTok, one artwork), and the profile automatically shows the right one based on where the fan came from. Zero context switch.

**Listen section embed types:**

| Type | Best for |
|---|---|
| Tracklist (no embeds) | Clean look, fast load, focus on track names |
| Spotify embed | Full streaming, track preview plays in page |
| SoundCloud embed | Good for unreleased / demo material |
| Bandcamp embed | Sells + streams, best for DIY artists |
| YouTube playlist | For video-first artists |
| Apple Music embed | iOS users, high fidelity |

Default: Tracklist. If artist has a Spotify link, offer "Switch to Spotify embed" option. Artist controls this per release.

**Snap cards as video:**
Snap cards can be:
- Text + background colour (default)
- Text + artwork/photo background
- Embedded vertical video (YouTube Shorts, TikTok embed) — full-screen snap card
- Behind-the-scenes photo

**External embeds (for the "About" or snap cards):**
- SoundCloud streaming widget
- Bandcamp album player
- YouTube video (not shorts — full video)
- Spotify Canvas (where API allows)
- Mixcloud (for DJ sets)
- Twitch (when live — for DJs/producers who stream)
- Substack post card (for artists with writing)

---

### 2.10 — What's editable on the profile vs the admin panel

This distinction matters for build. The artist should be able to edit their page in two ways:
1. In-place editing on the profile (long-press or edit-mode CTA — for simple copy tweaks)
2. The admin panel (slide-up) for structural changes

**Editable directly on the profile (in-place):**
- Artist name (tap to edit, saves immediately)
- Bio text (tap to edit, Markdown-lite supported)
- Individual snap card text (tap card → edit overlay)
- Each CTA label (long-press CTA → label input appears)

**Editable in the admin panel (slide-up, structural):**
- Campaign state (profile / pre-release / live / gig)
- Release date (for auto-switching)
- Top card type (artwork / video / embed) + URL
- Theme (Dark / Light / Glass / Contrast)
- Vibe (7 options)
- Accent colour
- Platform pills (add/remove/reorder)
- Fan list (view and export)
- Stats (views, fan sign-ups, CTA clicks)
- Shop settings (external URL, products)
- Support tier configuration

**Editable only in a dedicated section (tab-based admin):**
- Full music/release library (too complex for slide-up)
- Full events list (date fields, ticket URLs)
- Full merch/shop inventory
- Credits management
- Freelancer profile settings

**The principle:** Fast edits should be fastest. "I mistyped my bio" should be: tap → edit → done. No modal, no page refresh, no save button beyond the blurred text field accepting the edit.

---

### 2.11 — Bio writer: detailed specification

The bio writer is the primary AI feature for v5. It removes the blank page problem — the single biggest reason artists abandon setup flows.

**Entry points:**
1. During wizard Step 2 (confirm import): "Bio looks a bit generic — want me to help?" CTA below the bio field
2. In admin panel profile section: "✨ Help with bio" button
3. Any time the bio field is focused for > 2 seconds with < 3 words in it

**Input collection:**
```
Required (pre-filled from profile/import):
  - Genre/vibe
  - Location
  - Release history (titles, dates)
  - Platform presence (Spotify monthly listeners if available)

Artist provides (wizard-style, one at a time):
  Q1: "Name an artist you're inspired by" (free text)
  Q2: "What makes your music different from that?" (free text, max 100 chars)
  Q3: "What's your most recent release about?" (optional, max 140 chars)
  Q4: "Anything else you want in there?" (optional, max 100 chars)
```

**API call:**
```js
{
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 200,
  system: `You write artist bios. Rules:
- First person ("I make", "My music", "I've been")
- 2-3 sentences maximum
- Present tense
- Warm, honest, specific — not promotional
- UK register — slightly understated, never boastful
- Specific details beat generic claims: "my music started from a breakdown in 2022" > "I'm passionate about music"
- Never use: passionate / journey / authentic / unique sound / genre-defying / content creator / monetise
- Never end with: "I hope you enjoy the music" or "thank you for listening"
- Never mention streaming numbers
- Never use exclamation marks`,
  messages: [{
    role: 'user',
    content: `Genre: ${vibe}. Location: ${location}.
Inspired by: ${q1}. What's different: ${q2}.
Recent release: ${q3 || 'N/A'}.
Extra: ${q4 || 'N/A'}.
Latest release: "${latestRelease?.title || 'unreleased'}".
Write 3 different bio options. Label them A, B, C. Short, different tones.`
  }]
}
```

**Output:**
- Show 3 variants side by side (mobile: swipeable)
- Each under 3 sentences
- Artist taps the one they want → it populates the bio field (editable)
- "Try again" re-runs with same inputs
- "Adjust the tone" shows tone selector: "More personal" / "More minimal" / "More descriptive"
- Never auto-save. Artist must confirm. "Use this bio →"

**Bio variant examples (for MAYA, indie/alternative, South London):**

```
Variant A (minimal):
"Making music in South London. My new EP came out of a strange winter.
I think it shows."

Variant B (personal):
"I've been making music in South London for four years. The new EP is
about a period I'd rather forget but can't stop thinking about."

Variant C (descriptive):
"Indie songwriter based in South London. My third EP 'Strange Winter'
is out now — melodic, unhurried, recorded during a grey January."
```

**Caption writer (snap cards — next AI feature):**
Same pattern but for 1-sentence snap card updates. Prompt: "Describe what you want to say in one line" → 3 one-sentence options in artist's vibe tone.

---

### 2.12 — Top card source matching (enhanced)

The fan arrived from somewhere. That somewhere has a specific energy — a specific video clip, a specific visual aesthetic. The top card must not break that continuity.

**How ABLE knows where the fan came from:**
```
Link in artist's Instagram bio:  able.fm/@handle?src=ig
Link in TikTok bio:              able.fm/@handle?src=tiktok
Link in YouTube description:     able.fm/@handle?src=yt
Link in Twitter/X bio:           able.fm/@handle?src=x
Direct link:                     able.fm/@handle (no src param)
```

Artists set these links up once in the admin panel. ABLE provides the correct UTM-appended URL for each platform.

**Content matching matrix:**

| Source | Top card to show | Fallback |
|---|---|---|
| TikTok (`?src=tiktok`) | TikTok embed (if set) | Artwork |
| Instagram (`?src=ig`) | Instagram Reel embed (if set) | Artwork |
| YouTube (`?src=yt`) | YouTube embed (if set) | Artwork |
| Spotify (`?src=spotify`) | Spotify embed | Artwork |
| Twitter/X (`?src=x`) | Artwork (Twitter content is diverse) | Artwork |
| None / direct | Artist's default top card | Artwork |
| Email (`?src=email`) | Latest release artwork | Artwork |

**Artist sets per-source top cards in admin:**
```
Admin panel → "Top card" section:
  ├── Default: [artwork/video/embed] (always required)
  ├── When from TikTok: [paste TikTok URL] (optional)
  ├── When from Instagram: [paste Reel URL] (optional)
  └── When from YouTube: [paste YouTube URL] (optional)
```

**The rule:** If the source-specific card is not set, fall back to the default. Never fail silently or show a blank top card.

---

## PART III — RESEARCH SYNTHESIS: THE 1% THAT MATTERS

*From MASTER_PLAN.md Section 16. ~300 sources, 400+ people/companies researched. What follows is the 1% that actually changes ABLE.*

---

### From the world's best designers:

**Dieter Rams / Jony Ive — restraint is material.** Every element must earn its place. Not minimalism for its own sake, but because everything serves a purpose. The glass theme's `backdrop-filter` should feel like frosted aluminium, not a CSS trick. The moment decorative chrome competes with the artwork, it has failed.

**Paula Scher — the artist name IS the design.** In Barlow Condensed, the name should fill the hero width. At 375px mobile, it should span nearly the full viewport. Resist shrinking it for layout convenience. It is the single most impactful typographic decision. Protect it.

**Stefan Sagmeister — each artist's page must feel like *them*.** If 20 profiles look interchangeable at a glance, the accent colour system has failed. Accent must permeate enough UI (CTAs, tabs, pills, dividers, section dots) that the page reads as *this artist's identity*, not a template.

**Tobias Ahlin — layer the easing types.** Spring `cubic-bezier(0.34,1.56,0.64,1)` for CTA bounce. Content panels sliding up: deceleration `(0.25,0.46,0.45,0.94)`. Mixing easing makes the UI feel alive. One curve everywhere = mechanical.

**Airbnb Design — skeleton screens approximate shape.** No artist photo = show accent colour background with initials in Barlow Condensed. Not a grey rectangle. The placeholder communicates the *shape* of content arriving — never a blank void.

**Stripe Design — the dashboard earns trust through precision.** "127 fans" not "100+ fans." Exact numbers. The artist is running a micro-business. Approximations feel dismissive. Exact numbers feel respectful.

**Linear Design — state transitions feel instant.** Switching profile/pre-release/live/gig modes should be perceptible within 200ms. No layout shift on transition. This is not visual polish — it communicates product intelligence.

---

### From the world's best UX experts:

**Don Norman — emotional design has three levels:** Visceral (looks right), behavioural (works), reflective (represents who I am). ABLE passes all three for INFP/ISFP artists: looks like their world (visceral), works without confusion (behavioural), feels proudly put in their bio (reflective). Every link-in-bio tool passes behavioural; ABLE must pass all three.

**Jakob Nielsen — the first 10 seconds determine everything.** Fan arrives from a reel. Decides within 10 seconds to stay or leave. Artist name, artwork, primary CTA all in viewport immediately — no scroll required to reach them. Nothing else matters until the fan decides to stay.

**Luke Wroblewski — mobile-first is a decision, not a setting.** 44px minimum tap targets are non-negotiable. ABLE is a mobile product. Desktop is secondary.

**Steve Krug — don't make the fan think.** Primary CTA is obvious. One thing. Not three options. The fan came from a reel — they want continuation, not a decision. "Listen on Spotify" = continuation. "Check out all my music" = a task.

**Kara Pernice (Nielsen Norman) — 57% of viewing time is above the fold; 65% in the top 40%.** Everything that matters for the fan's decision to stay must be in the top half of the screen.

**Peak-End Rule (Kahneman):** Users judge experiences by the most intense moment and the final moment. For fans: the intense moment is the top card and the primary CTA. The final moment is the fan capture form. Design these two moments with extra care. Everything else is important but these two are judged.

---

### From 50 real artist profiles (USER_RESEARCH.md):

**Gig mode is not a nice-to-have.** Cork/Manchester/Dublin artists (Kneecap, Cardinals, CMAT) rely on live shows for a significant portion of their income. The night before a show, their bio link should show "On tomorrow — get tickets" not "Listen on Spotify." Gig mode is the feature that makes ABLE irreplaceable for gigging artists.

**TikTok-native artists need owned infrastructure.** Chloe Qisha, Silver Gore, Chalk — viral moments from TikTok drive spikes of traffic that have nowhere to land. A fan who finds them from a 47-second clip and hits their ABLE page in the first 10 seconds of their interest is the conversion opportunity. The top card must continue what they were watching. The fan capture form must be within scroll.

**The opening act problem.** Alessi Rose (opened for Dua Lipa), Nectar Woode (toured with Joy Crookes), Florence Road (toured with Wolf Alice) — all have brief windows of exposure to much larger audiences. Fan capture during that support slot is the difference between a career moment and a career-building moment. ABLE's fan capture form is the infrastructure for this.

**Record buyers are deep fans.** Katherine Priddy, Lankum, Nick Mulvey audiences buy records, travel for shows, write messages. These are the 1,000 true fans. The fan capture form on ABLE reaches them at the moment of peak intent — right after they've heard the music and decided to find out more.

**The freelancer market is bigger than it appears.** Every released track has: a producer, a mixer, a mastering engineer, often a co-writer. Many of these people earn their living from session work but have no professional web presence. Danny L Harle (producer for Caroline Polachek, Grammy-nominated) is more discoverable as an artist than as a producer-for-hire. ABLE Studio solves this without requiring a separate signup.

---

### Implementation precision: rules from DESIGN_RESEARCH_2026.md with no wiggle room:

**Never animate `box-shadow` directly.** Shadow animation on Android causes dropped frames. Instead, place shadow on a `::before` or `::after` pseudo-element and animate its `opacity`. Only animate `transform` and `opacity` at 60fps on mid-range Android.

**`data-theme` attribute for theme switching — not class toggles.** Theme change = one DOM attribute change on `<body>`. All 4 theme tokens defined as CSS variable overrides on `[data-theme="dark"]`, `[data-theme="light"]` etc. Never scattered class toggling.

**Fluid typography with `clamp()` — no breakpoint jumps:**
```css
artist name: font-size: clamp(2.5rem, 8vw, 5rem)
section titles: clamp(1.25rem, 4vw, 2rem)
body: clamp(0.875rem, 2vw, 1rem)
```
At 375px the name fills the hero. At 430px it's slightly larger. Never a sudden jump.

**Bento grid (events/merch): `auto-fill` not hardcoded widths:**
```css
grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
```
At 375px: 2 columns. At 600px+: 3 columns. Never `width: calc(50% - 8px)`.

**Staggered entrance animations — 60ms delay between items:**
First platform pill / track card / event card = 0ms delay. Each subsequent = 60ms more. Max ~360ms for 6th item. Spring easing `(0.34,1.56,0.64,1)`, 300ms duration per item. Creates "bloom" — page arrives, not "blinks in all at once."

**Fan capture form — exact HTML attributes for 45% better mobile conversion:**
```html
<input type="email" autocomplete="email" inputmode="email">
```
Single field, single button, full width. No confirm-email field. No name field unless artist explicitly requests it. Name field halves conversion.

**Doherty Threshold (400ms):** CTA tap feedback must start within 100ms — scale to `0.97` immediately on `touchstart`, spring back on `touchend`. Never wait for async operations before showing feedback. Animate immediately, load in background.

**Von Restorff Effect — gig mode must be unmissable.** In gig mode, one element on the profile must be so visually distinct from the normal layout that a fan arriving at 7pm understands the artist is playing tonight within 2 seconds, without reading text. A pulsing accent dot, full-bleed accent strip, or large "tonight" badge — not a subtle colour change.

**Fan capture success state — never generic.** "Success" toast is wrong. The success state should show: "You're on [Artist Name]'s list." Uses recognition (fan sees their email echoed back or sees the artist's name), not recall. "You're in" is sufficient. Never: "Thank you for subscribing!"

**Stats copy framing (admin.html and analytics):** Never raw numbers in isolation. Not "247 fan sign-ups." Instead: "247 people chose to give you their email — they're in your corner." Not "1,200 views." Instead: "1,200 people landed on your page from social this month." The number earns meaning through context.

**Accent colour derivation from one token (Material Design 3 logic applied):** From `--color-accent`, derive all tonal variants at build time or via CSS:
- CTA button background = `--color-accent`
- Active tab indicator = `--color-accent`
- Platform pill active border = `rgba(accent, 0.4)`
- Section divider dot = `--color-accent`
- Focus ring = `rgba(accent, 0.6)` outline
Never hand-code these separately. All derive from the one `--color-accent` variable.

**Touch target rules (non-negotiable):** Min 44px × 44px hit target. Adjacent targets: min 8px spacing. Primary hero CTA: min 56px height (not 44px — this is the primary action). Secondary CTAs: 48px. Verify with `outline: 1px solid red` in dev mode before shipping.

**Progress indicator on wizard (Goal-Gradient Effect):** Show "Step 2 of 4" progress bar that fills visually. As artist approaches completion, completion button becomes more prominent (bolder border, slightly larger — not a different colour, just more weight). Motivation increases as goal approaches.

---

### From top-minds-insights.md (160 entries, 400+ sources):

**Kevin Kelly's 1,000 True Fans (updated to 100 True Fans):** In 2023 Kelly updated the thesis: 100 fans spending £1,000/year is sufficient. Fan depth beats fan breadth. Every product decision must serve the relationship between the artist and their 100–1,000 deepest fans. Feature velocity is irrelevant if it doesn't serve this relationship.

**Nathan Barry (ConvertKit / Kit) — own your distribution:** "The algorithm doesn't owe you anything." An artist with 500,000 TikTok followers and 200 email addresses is more fragile than an artist with 10,000 TikTok followers and 5,000 email addresses. ABLE's fan capture form is the most important element on the page because it is the distribution infrastructure the algorithm cannot take away.

**Jack Conte (Patreon) — sustainable not viral:** The creator economy's original sin is optimising for peak attention rather than sustained relationships. Patreon's model — predictable income from people who specifically chose to support — is the right direction. ABLE's Support Packs are the same thesis. Help the artist build the predictable income layer, not the viral moment.

**DHH — calm software:** ABLE should feel like it has strong opinions and isn't trying to impress anyone. No viral growth hacks. No engagement loops. The artist opens their admin, sees exactly what they need, does exactly what they came to do, closes it. Calm, useful, trustworthy.

**Andrej Karpathy — clean data beats complex AI:** The fan data ABLE collects (email, timestamp, source, context) is more valuable than any AI feature. The architecture of that data — clean, structured, exportable — is the product. Everything else is presentation.

**Sam Altman — the blank page is the largest barrier:** The wizard must pre-fill every field from the best available data. An artist should never see a blank form. The Spotify import means they confirm data, not create it. The bio writer provides 3 options, not an empty textarea. The vibe selector shows their music's genre. ABLE removes the blank page from artist setup.

### From quantitative research (USER_RESEARCH.md — build numbers, not feelings):

**Fan type breakdown — every UI decision should serve the right tier:**

| Type | % of audience | Behaviour | Conversion trigger |
|---|---|---|---|
| **Casual listener** | ~80% | Discovered via algorithm, 3–10 streams, won't visit bio link unprompted | Nothing ABLE can do; capture them if they arrive |
| **Dedicated fan** | 15–18% | Follows on 2+ platforms, visits bio within 48h of release announcement, buys tickets and physical | Personal framing: "be first to know when I announce shows" vs "subscribe" |
| **Superfan** | 2–5% | Seen live multiple times, owns merch, notifications on, will travel, buys everything direct | Direct support option; confirmation the artist knows they exist |
| **Discovery fan** | variable | Actively hunts new music (r/indieheads, Bandcamp Friday, music press), converts to Dedicated fast | A landing experience that pays off the quality that sent them |

**Superfan data:** 2% of monthly listeners drive 18% of total streams and 50% of ticket sales (Spotify super-listener data). 20% of US listeners qualify as superfans and spend 4× more (Luminate 2025). Goldman Sachs values the global superfan opportunity at $4.3 billion annually (2026).

**The KAMAUU ratio:** 1,756 Patreon followers, 116 paid members (~6.6%). For ABLE: a 100-fan email list where 6 people buy a support pack at £5/month = £360/year. 1,000 such artists = real product traction.

---

**Discovery channels — ranked by fan-to-lasting-relationship conversion:**

1. Friend / word of mouth — highest; personal trust transfer
2. Editorial playlist (RADAR, Fresh Finds, BBC Introducing) — high; curated trust
3. Support slot at a live show — high; captive, warm audience
4. TikTok / Instagram Reels — high reach, **lowest conversion** without follow-up mechanism
5. Algorithmic (Spotify Radio, YouTube suggested) — wide reach, lowest intent
6. Music press / blogs (DIY, Line of Best Fit, Clash) — smaller reach, deeply converted readers
7. Bandcamp Friday — niche, buyers are already true fans

**Critical implication:** "TikTok is the biggest discovery channel in 2024–2026 but has the worst conversion to lasting fan relationship. The bio link is the critical bridge. ABLE must convert TikTok-referred visitors faster than any competitor. UTM source matching (`?src=tiktok` → TikTok embed on top card) directly addresses this."

---

**Artist priorities — design to serve these in this order:**

1. A page that looks like *them*, immediately, without a design degree
2. To know the people who found them can find them again (they own the email list)
3. To not feel like they're running a business every time they log in
4. Clarity on what's actually working (simple, honest analytics)
5. Tools to do what they already do, better (releases, tickets, merch, support)

**What makes artists leave:** if ABLE starts feeling like Patreon (too monetisation-forward), if the language shifts to "grow your audience" and "maximise conversions," if the data is used without consent, or if the platform changes rules in ways that disadvantage them.

---

**Upgrade copy — the gold lock pattern requires specific value, never generic:**

| Trigger | Wrong | Right |
|---|---|---|
| Approaching fan cap | "Upgrade to collect more fans" | "You've had 87 sign-ups. Your free limit is 100. Upgrade to keep capturing." |
| Analytics depth | "See more analytics" | "Your release dropped 3 days ago. Upgrade to see what your top fans clicked." |
| Superfan detection | "Upgrade to identify superfans" | "3 fans spent over 90 seconds on your page. Upgrade to see who they are." |
| Manchester show | "Upgrade to message fans" | "You have 23 fans in Manchester. Upgrade to send them a message before your show." |

**Business target:** 2,000 artists on Artist tier (£9/mo) = £18,000 MRR. Every feature should be evaluated against: does it help the artist identify and serve their 1,000 deepest fans? Feature velocity is irrelevant if it doesn't serve that relationship.

---

**Industry professional signal checklist — what they look for when they land on an ABLE page:**

*Booking agents / promoters:* up-to-date social follower counts, Spotify monthly listeners, past live history, evidence of ticket sales, mobile-friendly page to forward to venue buyers.

*A&R (independent label):* monthly listeners trajectory, TikTok engagement rate, live show attendance, quality of fanbase, direct fan relationships. Values 1,500 dedicated fans over 50,000 passive listeners.

*Sync licensing supervisors:* fast audio sample, rights clarity, ISRC codes, PRO registration, professional visual presence.

*Music journalists:* press shots, biography that tells a story (not a CV), embeddable audio, artist's own words, direct contact. BBC Introducing DJs play based on what they find when they look the artist up.

*Playlist curators:* completed Spotify profile with artist pick, bio, upcoming events. Genre accuracy. Pre-release pitching 7+ days ahead. 40,000+ active curators on SubmitHub.

*Implications for able-v5.html:* The page must serve these industry visitors without being designed for them. A professional enough bio, a complete release with streams/Spotify link, an up-to-date shows section — these already satisfy industry requirements if done well. No "Industry" toggle needed in v5. ABLE must just be professionally presented.

---

### From strategy research (the frames that explain why ABLE's architecture is the way it is):

**Clayton Christensen — Jobs to Be Done.** The job artists hire ABLE for is not "have a link in bio." It is: "Convert the attention I'm getting on social into something I own — a fan relationship that doesn't depend on the algorithm staying kind." The workarounds that reveal this job: copying Linktree links from notes apps, tracking sign-ups in Instagram DMs, manually switching bio links on release day. Each workaround is ABLE's feature list written by artists themselves.

**Ben Thompson — Aggregation Theory.** Spotify doesn't own music — it owns the listening moment. Instagram doesn't own artists — it owns the attention moment. Aggregators extract value from artists by sitting between them and their fans. ABLE is the artist's escape valve. Structurally analogous to Substack vs. Medium, Shopify vs. Amazon, Bandcamp vs. Spotify. The moat is the switching cost: 2,000 fan emails collected through ABLE is 2,000 direct relationships the artist would lose by leaving. That's the defensibility.

**Li Jin — 100 True Fans (updated from Kelly's 1,000).** 100 fans paying £50/year is more achievable and more sustainable than 1,000 paying £5. The support pack system is the product answer. An artist with 100 fans on a £5/month support pack earns £500/month from their music without streaming, without a label, without a sync deal. The Support tab is not the last tab — for this segment of artist, it's the most important.

---

## PHASE 12 — FAN FEED (fan.html)

*Build after able-v5.html is complete. The fan feed depends on artists existing in the system.*

**Architecture:** The fan feed is a separate page (`fan.html`) but shares the same design system (tokens, themes, vibes don't apply — fan feed has its own neutral dark aesthetic). The fan's accent colour is a softer version of the platform default.

**Structure:**

```
fan.html
├── Header: "Your artists today" + date
├── Digest view (default):
│   ├── Date groups: "Today · 4 updates" / "Yesterday · 2 updates"
│   ├── Content rows (80% of rows):
│   │   ├── Release card
│   │   ├── Event card
│   │   └── Video card
│   └── Commerce rows (max 20% of rows):
│       ├── New product card (shop)
│       └── Shop spotlight card
├── "Tap any update to go deeper" (tap → snap card view)
├── "You're all caught up" (end state — max 7 days shown)
└── Tab bar: Discover / Feed / Artists / Profile
```

**Digest row visual:**
```
[Artwork 44px] [Artist name — Type badge] [Time ago]
               [Title / Description short]
               [Accent-coloured type chip: RELEASE / EVENT / SHOP]
```

**Snap card view (fullscreen, triggered from digest tap):**
```
[Counter: 3 of 7 · swipe up]
[Artist avatar + name + timestamp]
[Full artwork or video]
[Release title]
[Primary CTA] [Secondary CTA]
[Dot progress indicators at bottom]
→ "You're caught up on [Artist]" (end of their updates)
→ Back to digest
```

**Commerce card in digest (respectful UX):**
```
[Shop icon 44px] [Artist name — "Shop" badge] [Time ago]
                 [Product name — in artist's voice]
                 [Price tag] [→ Shop]
```
Max visual weight = 70% of a regular content card. Commerce is quieter.

**Fan feed empty state:**
```
"Nothing new from your artists today.
Check back tomorrow — or explore someone new →"
```
Link to artist discovery (future feature).

---

## PHASE 13 — FREELANCER PROFILE (able-v5.html mode toggle)

*No new file needed. The freelancer profile is a mode within able-v5.html.*

**Implementation approach:**
- Add `data-mode="artist"` / `data-mode="studio"` to `<body>`
- CSS: `.mode-studio .section-listen { display: none }` + show freelancer sections
- JS: Read `?mode=studio` from URL params → set body data attribute
- Transition: `opacity` crossfade (300ms) when switching between modes
- Both modes share: hero, bio, fan capture
- Only artist mode shows: Listen, Shows, Shop (own releases)
- Only studio mode shows: Credits, Portfolio, Rate card, Artist connections
- Both show: Snap cards (artist writes both types)

**Tab bar changes by mode:**

| Mode | Tab 1 | Tab 2 | Tab 3 | Tab 4 | Tab 5 |
|---|---|---|---|---|---|
| Artist | Home | Listen | Shows | Shop | Support |
| Studio | Home | Credits | Portfolio | Rates | Contact |

---

## PHASE 14 — LANDING PAGE (landing.html)

*The landing page is `landing.html`. Dark mode default. Light mode toggle in header.*

**Dark / Light toggle:**
- Small sun/moon icon top-right of landing page navigation
- Persists to `localStorage('able_landing_theme')`
- Dark: `#09090f` base, near-black, editorial luxury
- Light: `#f5f0e8` base, warm cream, same accent

**Key copy moments (never change without re-reading the copy rules):**

```
Hero headline:        "When they click, be ready."
Hero sub:             "Your page. Your fans. Your data."
Artist feature:       "The page that changes when you do."
Fan ownership:        "Your fan list. Yours forever. Export any time."
No lock-in block:     "Every email address collected through ABLE belongs to you."
Freelancer:           "Your credits, in one place."
Pricing note:         "We'll tell you when you're about to hit a limit — not when you already have."
Footer philosophy:    "Made for artists who take their work seriously."
```

**Visual language on landing (different from artist profile):**
- The landing page is not a profile. It is a magazine spread about profiles.
- Full-width editorial sections, generous negative space
- Photography: real artists (not stock), dark rooms, live performance, studio sessions
- Mockups: show the iOS shell of able-v5.html at all 4 states + 3 vibes
- Typography: Barlow Condensed for section headings (the platform's own voice), DM Sans for body

---

## PHASE 15 — SHOP INTEGRATION

*Build in Path order: 1 → 2 → 3 → 4. Do not skip to Path 5 (Printful) until backend is complete.*

**Phase 15a — Path 1: External link cards (MVP)**

No backend required. Add to the `able-v5.html` shop section:

```html
<!-- Shop card: product image (from OG scrape) + name + price + external link -->
<div class="shop-product-card">
  <img class="product-img" src="[og:image]" alt="[product name]">
  <div class="product-info">
    <p class="product-name">[Product name]</p>
    <p class="product-context">[Artist's own words about the product]</p>  <!-- Required field -->
    <div class="product-footer">
      <span class="product-price">[Price]</span>
      <a href="[url]" target="_blank" rel="noopener" class="product-cta">
        [Platform name] ↗
      </a>
    </div>
  </div>
</div>
```

Shop section shows max 3 products. "See all in the shop →" opens full list or external store.

Shop section hiding rule: if `profile.shop.products.length === 0 && !profile.shop.externalUrl`, do not render the shop section header at all.

**Phase 15b — Path 2: Fourthwall connect**

When backend is available: OAuth connect, product sync, artist selects up to 4 products.

```js
// Fourthwall API integration (add to api routes)
GET  /api/shop/fourthwall/connect   → OAuth initiation
GET  /api/shop/fourthwall/callback  → OAuth callback, store tokens
GET  /api/shop/fourthwall/products  → Pull artist's product list
POST /api/shop/fourthwall/select    → Store which 4 products to feature
```

**Phase 15c — "Things I'm Into" snap card type**

Add `type: "gear"` to the snap card schema. Renders as a list of up to 5 items (image + 1 line + Geniuslink URL). Admin UI: "Share what you're into" — different from "Write an update".

```js
// Schema addition to able_v3_profile.snapCards
{
  id: "snap_xxx",
  type: "gear",          // new type
  title: "Things I use",  // artist sets this
  items: [
    { name: "...", image: "...", line: "...", url: "https://geni.us/..." }
  ]
}
```

---

## UPDATED NON-NEGOTIABLE CONSTRAINTS (v5.0 additions)

**Multi-role:**
- One account handles artist, fan, and freelancer faces
- Same `able_v3_profile` localStorage key — freelancer data appended as `able_v3_profile.studio`
- Never create separate localStorage keys for freelancer data

**Shop & commerce:**
- Commerce in fan feed: max 1 card per 4 content cards — never exceed this
- Commerce copy always in artist's own voice — ABLE never generates commercial copy autonomously
- Associated products: max 5 per artist — this is curation not a catalogue
- Print-on-demand: artist must approve each mockup before activating
- Shop section only shows if artist has enabled it — never show empty shop header

**Freelancer:**
- Credits from artist releases auto-populate freelancer profile — no re-entry
- Freelancer mode toggle is always a gentle affordance, never a prominent navigation item on the artist profile
- `?mode=studio` URL param enables the view — backward compatible (old links still work)

**Landing page:**
- Never use "Linktree alternative" or "link in bio" in copy — ABLE is not a comparison, it's a category
- The no-lock-in promise must appear above the fold on desktop, within 1 scroll on mobile
- Social proof: real numbers only. Never "thousands of artists" — use the real count

**Bio writer:**
- Never auto-save to profile — always require artist confirmation
- Always show 3 variants — never just one
- `claude-haiku-4-5-20251001` — not a heavier model. The bio task doesn't need it.
- Rate limit: 5 bio generations per artist per day (abuse prevention)

**Wizard:**
- Never show more than 1 question on screen at a time (mobile mental load)
- Pre-fill every field from best available data (import, examples, or previous session)
- 60 seconds from start to "Your page is ready" — this is a hard target
- If Spotify import fails: graceful fallback to manual Entry 3 — never show an error that blocks progress

---

*Build prompt version: 5.2 — Updated 2026-03-13.*

*Version 5.2 additions: Professional discovery system — complete rewrite of Section 2.5 with artist-first framing (Studio mode = additional face of artist, not separate freelancer product), 3 professional types (artist-who-freelances / freelancer-only / industry-card), credit verification 3-level system (unverified / peer-confirmed ✓ / metadata-verified ✓✓ via ISRC), "People in my world" section spec, discovery graph model (credits as directed edges, not search listings), what ABLE deliberately does NOT build (no ratings, no search, no commission, no marketplace positioning). Full spec in `docs/PROFESSIONAL_DISCOVERY.md`.*

*Version 5.1 additions: Living QR code (always points to current CTA, no reprint), revenue attribution per CTA tap, geo-aware event surfacing (150-mile radius, "Near you" chip), smart link expiry (ticket CTAs auto-expire when event.date < now), sold-out waitlist (same fan capture form, different label), GDPR consent schema (email, ts, source, consent, consentMethod, jurisdiction), auto-Spotify state switching (backend polls Spotify API daily), setlist mode (single-track focus, show-night only), pre-save → fan capture pipeline (fan saves = fan captured).*

*Version 5.0 additions: multi-role single login (artist/fan/freelancer as profile modes on one account), shop & commerce architecture (5 integration paths: external link cards → Fourthwall connect → Shopify Storefront API → Everpress campaign model → Printful POD; Fourthwall is the recommended first real integration as it already powers Spotify's merch shelf), fan feed commerce (1-in-5 rule, 4 commerce card types, Instagram Shopping + Substack + Spotify Artist Picks research basis), complete freelancer profile spec (credits auto-populate from releases, rate card, portfolio, artist connections, Studio mode toggle on same URL), landing page 3-persona spec (artist/fan/freelancer, dark/light modes, full copy direction, no-lock-in promise placement), wizard all 5 entry angles (Spotify import/Linktree importer/manual/fan-upgrade/freelancer-only), complete CTA library (copy by vibe and state), embed hierarchy (top card source matching via UTM params, Listen section options, all embed types), what's editable where (in-place vs admin panel vs dedicated section), bio writer detailed spec (3-variant output, input collection flow, Claude haiku-4-5 API prompt, 5/day rate limit), "Things I'm Into" snap card type for gear/affiliate links (Geniuslink routing), Phase 15 shop build plan, scarcity rules (authentic vs dark patterns).*

*Professional discovery research basis: `docs/PROFESSIONAL_DISCOVERY.md` (authoritative spec), IMDb credits model (passive documentation → active discovery with "here's how to hire me"), SoundBetter/Fiverr analysis (what to avoid: race to bottom, rating anxiety, application process degradation), Spotify "Behind the Song" credits, Apple Music credits display, AllMusic/Discogs credits infrastructure, music industry informal hiring practices (referrals > search), graph-based discovery (Dribbble, LinkedIn, Behance), DistroKid/TuneCore ISRC metadata verification.*

*Commerce research basis: Printful API (full REST, 120 req/min, own checkout required), Fourthwall (best music-native integration, Spotify shelf proven), Redbubble (external link only — no API), Everpress (campaign model, authentic to music culture), Shopify Storefront API (public read), Instagram Shopping (product tags inside content not separate), Substack (paywall-as-honest-acknowledgement model), Spotify Artist Pick + Merch Shelf (proven integration patterns), Linktree/Beacons/Stan.store analysis (what's tacky vs authentic), Geniuslink (international affiliate routing).*

*All other sources: .superpowers/brainstorm/12988-1773342870/ (fan-feed, full-product, onboarding, top-card, states, product-logic, 30-ideas, 100-more, design-considerations), docs/DESIGN_RESEARCH_2026.md (60 entries: 11 top designers, 15 UI experts, 19 UX experts, 8 Laws of UX applications), docs/brainstorms/2026-03-13-top-minds-insights.md (160 entries), start.html/landing.html/admin.html implementations, able-v3.html full technical summary.*
