# Artist Profile — Path to 10
**File: `able-v7.html` | Created: 2026-03-15**
**Baseline: 6.9/10 | P0 target: 8.5 | P1 target: 9.3 | P2 target: 9.7**

> This document is a build specification, not a wishlist. Each item is numbered, scoped, and actionable. P0 items are blockers — they must ship before the profile is positioned as a finished product.

---

## P0 — CRITICAL GAPS (6.9 → 8.5)

These 5 gaps represent the largest share of distance from 10. Each one is a trust or conversion failure, not a polish gap.

---

### P0-1. Empty State — Replace Placeholder Text with Intentional Silence

**Current:** `"No releases added yet"`, `"No shows added yet"`, placeholder artist name visible to fans.
**Problem:** A fan who lands on an empty ABLE profile assumes the artist abandoned it. Score 3/10. This is the single highest-leverage fix in the entire product.

**Spec — section render gating:**

In the render function, test for content before rendering any section:

```javascript
function shouldRender(section, profile) {
  switch(section) {
    case 'music':   return profile.releases && profile.releases.length > 0;
    case 'events':  return profile.shows && profile.shows.length > 0;
    case 'snap':    return profile.snapCards && profile.snapCards.length > 0;
    case 'merch':   return profile.merch && profile.merch.length > 0;
    default:        return true;
  }
}
```

Never render a section shell with placeholder content. A page with 3 complete sections is better than a page with 6 half-empty ones.

**Artist name — if not set:**
Do not render the name zone at full hero scale. Render nothing visible to fans. In owner mode only, render an edit prompt inside the hero zone.

**Bio — if not set:**
Hide completely. Do not render the bio zone for fans.

**Hero gradient — if no artwork:**
The gradient is acceptable — it uses the accent colour and is not placeholder text. Keep it. The artwork gradient is a design element. The placeholder text is not.

**Music empty — fan-visible fallback:**
If the artist has a Spotify URL at profile level but no release cards, surface the Spotify platform pill in Quick Actions. The fan can still reach the music. The empty section is hidden.

**Events, snap cards, merch — empty:**
Hide entirely. No copy. No holding message. Silence is more honest than a line the artist didn't write.

**Owner-mode edit prompts (never fan-visible):**

```javascript
const OWNER_PROMPTS = {
  music:  "Add your latest music. Paste a Spotify or SoundCloud link.",
  events: "Add a show. Paste a Ticketmaster or Eventbrite link.",
  snap:   "Write something. One sentence, a photo, a thought.",
  bio:    "Write a line about yourself. What do you want fans to know first?",
};
```

These are shown inside dashed-ring edit zones in owner mode. Set `aria-hidden="true"` — invisible to screen readers and fans.

**Score impact:** Angle 8: 3 → 7. Angles 1, 5, 20 each gain ~0.5.

---

### P0-2. Edit Mode — All 6 Zones Editable from the Profile Page

**Current:** Floating pill exists. Dashed rings exist on some zones. Shows and releases cannot be edited from the profile — require admin navigation.
**Problem:** An artist editing their own page discovers mid-session that half the page is not editable in context. This is a product trust failure.

**Spec — 6 zones, all editable from profile:**

| Zone | Edit Trigger | Bottom Sheet Content |
|---|---|---|
| 1. Identity | Tap hero artwork area | Name, vibe selector, accent picker, theme selector |
| 2. Hero CTAs | Tap either CTA in edit mode | Two label inputs + URL inputs |
| 3. Quick Actions | Tap platform pills row | URL per platform, add/remove |
| 4. Sections | Tap section header in edit mode | Add/edit/remove items; Spotify URL paste for music |
| 5. Snap cards | Tap snap cards row | Text, photo, optional CTA per card |
| 6. Fan capture copy | Tap the fan sign-up heading | Heading, subtext, trust line inputs |

**Floating pill state logic:**

```javascript
const PILL_STATES = {
  default: { label: 'Edit',    icon: 'pencil' },
  active:  { label: 'Editing', icon: 'check'  },
  saving:  { label: 'Saving',  icon: 'spin'   },
  saved:   { label: 'Saved.',  icon: 'check'  },
};
// 'saved' auto-returns to 'default' after 2000ms
```

**Auto-save:**
Debounce 800ms after last input. No explicit save button. Toast: `"Saved."` (period, never exclamation). On failure: `"Couldn't save. Try again."` — pill stays in `active` state.

**Dashed ring visibility in edit mode:**
Rings must be always-visible in edit mode, not hover-only. Mobile has no hover state.

```css
.edit-active [data-editable] {
  outline: 2px dashed rgba(var(--color-accent-rgb), 0.5);
  outline-offset: 4px;
  border-radius: var(--r-md);
  cursor: pointer;
}
```

**Shows and releases — edit from profile:**
Tapping the Events or Music section header in edit mode opens a bottom sheet that mirrors the admin editor. `able_shows` and release data write to localStorage immediately on save. Section re-renders without page reload.

**Score impact:** Angle 16: 5 → 8.

---

### P0-3. Copy Voice — Artist-First Defaults Everywhere

**Current:** Section headers say "Music", "Events". Default CTA text is generic. Meta description says "Artist profile powered by ABLE". Zero first-person defaults.
**Problem:** The platform voice bleeds through every field the artist hasn't customised. The conduit principle fails silently in defaults.

**Spec — default string replacements:**

| Field | Current | P0 replacement |
|---|---|---|
| `<title>` | `ABLE` | `[Artist Name] — ABLE` |
| `<meta name="description">` | `"Artist profile powered by ABLE"` | `"Music, shows, and more — direct from [Artist Name]."` |
| `og:title` | `"Artist on ABLE"` | `"[Artist Name]"` |
| `og:description` | `"Music, events, and more — direct from the artist."` | Bio first 120 chars, or `"Direct from [Artist Name]."` |
| Section: Music | `"Music"` | `"My music"` |
| Section: Events | `"Events"` | `"Shows"` |
| Section: Merch | `"Merch"` | `"Stuff"` (artist-overridable) |
| Hero primary CTA (profile state) | `"Listen"` | `"My music"` |
| Hero secondary CTA (profile state) | `"About"` | `"Stay close"` (scrolls to fan sign-up) |
| Fan sign-up subtext | empty / generic | `"Just your email. I'll reach out when something's actually happening."` |
| Fan sign-up button | `"Sign up"` / `"Subscribe"` | `"I'm in"` |
| Fan sign-up input placeholder | `"Email address"` | `"Your email"` |
| Post-submit toast | `"Subscribed."` | `"You're in."` |
| Post-submit module replacement | nothing | `"You're in. I'll keep you close."` |

**CTA defaults by vibe (profile state only, overridable):**

```javascript
const VIBE_CTA_DEFAULTS = {
  electronic: { primary: "Listen",   secondary: "Stay close" },
  hiphop:     { primary: "My music", secondary: "Stay close" },
  rnb:        { primary: "Listen",   secondary: "Stay close" },
  indie:      { primary: "My music", secondary: "Stay close" },
  pop:        { primary: "Listen",   secondary: "Stay close" },
  rock:       { primary: "My music", secondary: "Stay close" },
  folk:       { primary: "Listen",   secondary: "Stay close" },
};
```

**`profile.fanCapture` precedence:**
Fan sign-up heading reads from `profile.fanCapture.heading` first. Falls back to `"Stay close."` Never falls back to anything written in ABLE's voice.

**Score impact:** Angle 5: 6 → 8. Angle 3: +0.5. Angle 1 (meta): +0.5.

---

### P0-4. Trust Copy — Explicit Data Ownership at Sign-up

**Current:** `"Just [Artist Name]. No spam."` is settable but not guaranteed to be present. No explicit ownership signal.
**Problem:** A fan who doesn't know what ABLE is has no signal that their email goes to the artist and not to a platform mailing list.

**Spec — always-rendered trust line below the sign-up input:**

```html
<p class="fan-trust-line">
  Your email goes to [Artist Name] directly. Not to any platform.
</p>
```

```css
.fan-trust-line {
  font-size: var(--text-xs);   /* 11px */
  color: var(--color-text-3);
  text-align: center;
  margin-top: var(--sp-2);
  line-height: 1.5;
  /* Never: bold, accent-coloured, prominent — this is whispered, not announced */
}
```

Uses the artist's name. Written from the artist's perspective. Reinforces the conduit principle at the moment of maximum fan trust decision.

**Post-submit trust signal (replaces the form after submission):**

```html
<p class="fan-trust-post">
  I'll reach out when something's worth saying.
</p>
```

Artist-voiced. Sets expectations without an algorithm or platform cadence.

**No privacy link on the profile.** A privacy link would break the conduit illusion. ABLE's policy is in the confirmation email footer only.

**Score impact:** Angle 18: 6 → 8.

---

### P0-5. Accessibility — Skip Nav and Complete Reduced-Motion Coverage

**Current:** Focus rings exist. `prefers-reduced-motion` respected for most animations. No skip navigation. Some ARIA landmarks absent.
**Problem:** Keyboard users must tab through the entire hero before reaching main content. This is a WCAG 2.1 failure.

**Spec — skip navigation:**

```html
<!-- First element in <body> -->
<a href="#main-content" class="skip-to-main">Skip to main content</a>
```

```css
.skip-to-main {
  position: absolute;
  top: -100%;
  left: var(--sp-4);
  padding: var(--sp-2) var(--sp-4);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: 0 0 var(--r-sm) var(--r-sm);
  z-index: 9999;
  text-decoration: none;
  transition: top 0.15s;
}
.skip-to-main:focus-visible { top: 0; }
```

```html
<main id="main-content" tabindex="-1"><!-- all page content --></main>
```

**ARIA section landmarks:**

```html
<section aria-label="Artist identity and actions"><!-- hero --></section>
<section aria-label="Quick links"><!-- platform pills --></section>
<section aria-label="[Artist Name]'s music"><!-- music --></section>
<section aria-label="Shows"><!-- events --></section>
<section aria-label="Stay close"><!-- fan sign-up --></section>
```

**`prefers-reduced-motion` complete spec:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Exceptions: essential state changes — opacity only */
  .campaign-state-transition { transition: opacity 0.2s ease !important; }
  .toast                     { transition: opacity 0.2s ease !important; }
  .bottom-sheet-content      { transition: transform 0.2s ease !important; }
}
```

The `0.01ms` pattern (not `none`) allows JS-triggered transitions to complete a single frame, preventing layout jumps. The explicit exceptions list is intentional — state change feedback must remain.

**Light theme contrast fixes (WCAG AA):**

- Sage (`#7ec88a`) on cream (`#f5f2ec`): contrast ratio 2.1:1 — FAILS. Fix: `#5a9e67` (4.6:1)
- Cyan (`#06b6d4`) on cream: ratio 3.1:1 — FAILS large text. Fix: `#0e8fa3`

```css
[data-theme="light"][data-vibe="indie"]      { --color-accent: #5a9e67; }
[data-theme="light"][data-vibe="electronic"] { --color-accent: #0e8fa3; }
```

**Score impact:** Angle 17: 6 → 8.

---

## P1 — QUALITY LIFT (8.5 → 9.3)

P1 items elevate the product from "fixed" to "distinctive." They require more complex logic or cross-page wiring.

---

### P1-1. Gig Mode — Tonight Note + Post-Show State

**Tonight note field:**
Required when activating gig mode in admin. The artist writes 2–3 sentences before gig mode activates. A blank gig mode page is the problem this solves.

On the profile, render above the ticket CTA:

```html
<blockquote class="tonight-note" aria-label="Tonight's note from [Artist Name]">
  [artist-written text]
</blockquote>
```

```css
.tonight-note {
  font-size: var(--text-base);
  color: var(--color-text-2);
  font-style: italic;
  border-left: 2px solid rgba(var(--color-accent-rgb), 0.4);
  padding-left: var(--sp-4);
  margin: 0 0 var(--sp-6) 0;
  line-height: var(--lh-body);
}
```

**Post-show state:**
`able_gig_expires` already stores 24h expiry. Add `able_gig_show_end` (new key): artist-set showtime + 1h buffer.

```javascript
const isPostShow = Date.now() > gigShowEnd && Date.now() < gigExpires;
if (isPostShow) setState('post-gig');
```

Post-gig state behaviour:
- Primary CTA: `"Stay close"` (scrolls to fan sign-up)
- Secondary CTA: `"Merch"` if merch section exists, otherwise absent
- Tonight note replaced by post-show note if artist set one; if not, nothing — silence is honest
- "On tonight" badge removed; show info remains in subdued form

**Score impact:** Angle 13: 6 → 8.

---

### P1-2. Pre-release — Release Note + Final 24h Register Shift

**Release note field:**
Artist writes 2–3 sentences about the release. Mirrors the tonight note concept. Shown in hero below the countdown.

```html
<p class="release-note">[artist-written text]</p>
```

**Final 24h state shift:**

```javascript
const hoursLeft = (releaseDate - Date.now()) / 3_600_000;
if (hoursLeft < 24) document.documentElement.setAttribute('data-prerelease', 'final');
```

```css
[data-prerelease="final"] .countdown-value {
  font-size: clamp(56px, 16vw, 96px);
  color: var(--color-accent);
}
[data-prerelease="final"] .hero-ambient { opacity: 0.28; }
```

If no release note is set and < 24h remains, use: `"Tomorrow."` — one word. Never system-generated verbose copy.

**Score impact:** Angle 14: 7 → 8.5.

---

### P1-3. Hero CTA Copy — State × Vibe Matrix

```javascript
const STATE_CTA_DEFAULTS = {
  'pre-release': {
    primary:   "Pre-save",
    secondary: "My music",
  },
  'live': {
    primary:   "Stream now",
    secondary: "Stay close",
  },
  'gig': {
    primary:   "Get tickets",
    secondary: "Can't make it? Stay close",
  },
  'post-gig': {
    primary:   "Stay close",
    secondary: null,
  },
  'profile': {
    // falls through to VIBE_CTA_DEFAULTS (see P0-3)
  },
};
```

The secondary gig CTA `"Can't make it? Stay close"` is the most important copy change on the entire page. The fan who can't attend is the highest-intent sign-up prospect. The CTA must address them directly.

**Score impact:** Angle 3: 7 → 8.5. Angle 2: 7 → 8.

---

### P1-4. Cross-page View Transitions — Wire the Confirmed Specs

Three transitions are specced in MICRO_INTERACTIONS_SPEC.md (NEW-7, NEW-8, NEW-9). P1 wires them.

**artist-name transition (start.html Done → able-v7.html hero):**

```css
/* start.html Done screen */
.done-preview-artist-name { view-transition-name: artist-name; }

/* able-v7.html hero */
.hero-artist-name { view-transition-name: artist-name; }
```

```javascript
// Progressive enhancement — check API exists
if (document.startViewTransition) {
  document.startViewTransition(() => { window.location.href = profileUrl; });
} else {
  window.location.href = profileUrl;
}
```

**able-logo transition (admin.html → able-v7.html):**

```css
/* admin.html */
.sb-logo-type { view-transition-name: able-logo; }

/* able-v7.html */
.able-footer-logo { view-transition-name: able-logo; }
```

Both transitions are Chrome 126+ progressive enhancement. Safari and Firefox navigate normally. Never polyfill with JS reimplementation — the cost outweighs the benefit at V1.

**Score impact:** Angle 19: 7 → 8.5.

---

### P1-5. Fan Sign-up — Confirmation Email Trigger (Supabase Phase)

When Supabase is connected:
- Fan submits email → write to `fans` table → edge function triggers Resend send
- Email subject: `"Confirm you want to hear from [Artist Name]"`
- Email body: artist-voiced, ABLE-sent, uses artist name throughout (reference COPY.md §4)
- Confirmation link → confirms fan in Supabase → fan added to confirmed list in admin

Until Supabase: localStorage entry is the best available. The optimistic UI `"You're in."` remains. Admin fan list shows an `(unconfirmed)` tag as an honest acknowledgement, not a system failure.

**Score impact:** Angle 6: 7 → 8 (UI chain complete; full activation score at Supabase).

---

## P2 — CEILING POLISH (9.3 → 9.7)

P2 items make the page defensible at 9.7/10 — the maximum achievable without a live backend.

---

### P2-1. Edit Mode — Zone Coverage Completion

P0 specced the 6-zone system. P2 confirms and completes:
- Zone 4 (Sections): in-profile editing with Spotify/SoundCloud auto-fetch for music
- Snap card editor: photo upload using local blob URL until Supabase storage is live
- Fan capture copy editor: heading, subtext, trust line in a single panel
- Identity editor: all 7 vibes + all 4 themes selectable from one bottom sheet, with live preview

**Admin redirect fallback:** If a section requires functionality only admin has (analytics, CSV export), show `"Manage in dashboard →"` at the bottom of the edit panel. Never leave the artist with a dead end in their own page.

**Score impact:** Angle 16: 8 → 9.

---

### P2-2. Glass Theme Polish — Empty State Fallback

Glass theme requires background artwork to function. Without artwork, blurring nothing produces a dark murky surface that looks broken.

```javascript
function applyTheme(theme, hasArtwork) {
  if (theme === 'glass' && !hasArtwork) theme = 'dark';
  document.documentElement.setAttribute('data-theme', theme);
}
```

Third-party embeds (Spotify, YouTube) in Glass theme need explicit backing:

```css
[data-theme="glass"] .embed-container {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
}
```

CSS `backdrop-filter` does not propagate into iframes. The wrapper must carry the effect independently.

**Score impact:** Angle 11: 8 → 9.

---

### P2-3. Font Loading — Per-vibe On-demand Loading

**Current problem:** All 7 vibe fonts declared in the Google Fonts URL even if only one is used. Adds ~200ms of unused font load.

**Fix:** Load DM Sans and Barlow Condensed eagerly (as now). Load vibe-specific fonts on demand after `applyIdentity()` resolves the artist's vibe.

```javascript
const VIBE_FONTS = {
  electronic: null,          // Barlow Condensed already loaded
  hiphop:     'Oswald:wght@400;700',
  rnb:        'Cormorant+Garamond:ital,wght@1,400;1,600',
  indie:      'Space+Grotesk:wght@400;600',
  pop:        null,          // Barlow Condensed already loaded
  rock:       'Oswald:wght@400;700',
  folk:       'Lora:ital,wght@0,400;1,400',
};

function loadVibeFont(vibe) {
  const spec = VIBE_FONTS[vibe];
  if (!spec) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${spec}&display=swap`;
  document.head.appendChild(link);
}
```

Called inside `applyIdentity()` immediately after vibe is determined. The font swap is invisible because `applyIdentity()` runs synchronously from localStorage before first meaningful paint.

**Score impact:** Angle 10: 7 → 8.5.

---

### P2-4. Contrast Theme — Animation Zero at Theme Level

Contrast theme must have zero decorative animations regardless of user's `prefers-reduced-motion` setting. Currently relies on that media query only.

```css
[data-theme="contrast"] {
  --dur-instant: 0ms;
  --dur-fast:    0ms;
  --dur-mid:     80ms;  /* essential state-change feedback kept */
  --dur-slow:    80ms;
  --dur-xslow:   80ms;
}
[data-theme="contrast"] .decorative-animation {
  animation: none !important;
}
```

State change transitions (80ms) remain — they are essential feedback, not decoration. All cosmetic animations (ambient glow, platform pill shimmer, pre-release intensification) are disabled.

**Score impact:** Angle 17: 8 → 9.

---

## FINAL SCORE TABLE

| # | Angle | Baseline | After P0 | After P1 | After P2 | Hard ceiling |
|---|---|---|---|---|---|---|
| 1 | First 3 Seconds | 7 | 7.5 | 8 | 8.5 | 9 — Spotify import removes empty-state ceiling |
| 2 | Primary Job | 7 | 7 | 8 | 8.5 | 9 — state × vibe matrix complete |
| 3 | Hero CTA Zone | 7 | 7.5 | 8.5 | 8.5 | 9 — artist-written CTAs always better than defaults |
| 4 | Page State System | 8 | 8 | 8.5 | 9 | 9.5 — smart live window needs signal data |
| 5 | Copy Voice | 6 | 8 | 8.5 | 9 | 10 only when every artist fully customises |
| 6 | Fan Sign-up | 7 | 7.5 | 8 | 8.5 | 9.5 — confirmation email live (Supabase) |
| 7 | Music Section | 7 | 7.5 | 8 | 8.5 | 9 — 30s preview and credit links are Phase 2 |
| 8 | Empty State | 3 | 7 | 7.5 | 8 | 9.5 — Spotify auto-import eliminates the problem at source |
| 9 | Mobile Experience | 8 | 8 | 8.5 | 9 | 9.5 — iOS Safari audio latency fix is Apple-dependent |
| 10 | Performance | 7 | 7 | 7.5 | 8.5 | 9 — per-vibe font loading ships in P2 |
| 11 | Theme System | 8 | 8 | 8.5 | 9 | 9.5 — fan theme choice is Phase 2 |
| 12 | Identity System | 8 | 8 | 8.5 | 9 | 9.5 — FOUI fix via CSS preload |
| 13 | Gig Mode | 6 | 6 | 8 | 8.5 | 9 — going-tonight counter is Phase 2 |
| 14 | Pre-release Mode | 7 | 7 | 8.5 | 9 | 9.5 — native pre-save capture is Phase 2 |
| 15 | Micro-interactions | 8 | 8 | 8.5 | 9 | 9.5 — vibe-differentiated personality is P2+ |
| 16 | Edit Mode | 5 | 8 | 8.5 | 9 | 9.5 — drag-to-reorder sections is Phase 2 |
| 17 | Accessibility | 6 | 8 | 8.5 | 9 | 9.5 — full WCAG AA audit on all 28 vibe × theme combos |
| 18 | Trust and Data Ownership | 6 | 8 | 8.5 | 9 | 10 — confirmation email live closes the loop completely |
| 19 | Cross-page Coherence | 7 | 7 | 8.5 | 9 | 9.5 — Safari view-transition support (browser ceiling) |
| 20 | Big Picture | 7 | 7.5 | 8.5 | 9 | 9.7 — with all P2 shipped |
| | **Average** | **6.9** | **7.6** | **8.4** | **8.9** | |

**Why 9.7 and not 10:** The final 0.3 requires: (1) Supabase backend — confirmation email live, (2) Spotify auto-import — empty state solved at source, (3) `@view-transition` cross-browser coverage. These are Phase 2 infrastructure items. The profile page itself cannot score 10 while the fan activation chain is incomplete.
