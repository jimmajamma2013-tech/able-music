# ABLE Onboarding Wizard — Design Specification
**Stage 6B | File: `start.html` | Last updated: 2026-03-15**

> This document is the single source of truth for building `start.html`. A developer must be able to build the entire file from this document without asking a single question. Every pixel, every state, every animation, every piece of copy is defined here.

---

## Table of Contents

1. [Design System Tokens](#1-design-system-tokens)
2. [Architecture Overview](#2-architecture-overview)
3. [Layout Structure](#3-layout-structure)
4. [Global Wrapper — Persistent Elements](#4-global-wrapper--persistent-elements)
5. [Screen 0 — Hook / Import](#5-screen-0--hook--import)
6. [Screen 1 — Name](#6-screen-1--name)
7. [Screen 2 — Vibe](#7-screen-2--vibe)
8. [Screen 3 — Accent Colour](#8-screen-3--accent-colour)
9. [Screen 4 — Theme](#9-screen-4--theme)
10. [Screen 5 — Links](#10-screen-5--links)
11. [Screen 6 — Fan Capture CTA](#11-screen-6--fan-capture-cta)
12. [Screen 7 — Current Moment](#12-screen-7--current-moment)
13. [Screen 8 — Done](#13-screen-8--done)
14. [Live Preview Panel](#14-live-preview-panel)
15. [Step Transitions](#15-step-transitions)
16. [Storage Behaviour](#16-storage-behaviour)
17. [Netlify Import Functions](#17-netlify-import-functions)
18. [Accessibility](#18-accessibility)
19. [Playwright Verification Checklist](#19-playwright-verification-checklist)

---

## 1. Design System Tokens

Define these as CSS custom properties on `:root`. All values in this document reference these tokens only — never use raw hex values or px values outside of the token definition block.

```css
:root {
  /* Backgrounds */
  --color-bg:      #0d0e1a;
  --color-card:    #12152a;

  /* Borders */
  --color-border:  rgba(255, 255, 255, 0.08);

  /* Accent — default; overridden via JS after Screen 3 */
  --color-accent:  #e05242;

  /* Text */
  --color-text:    #f0f0f5;
  --color-muted:   rgba(240, 240, 245, 0.5);

  /* Semantic colours */
  --color-success: #78c47b;
  --color-amber:   #f4b942;
  --color-error:   #e05242;

  /* Typography */
  --font-body:     'DM Sans', sans-serif;
  --font-display:  'Barlow Condensed', sans-serif;

  /* Easing */
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-decel:    cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Font loading.** Load both fonts via Google Fonts in `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

**Accent override.** When the user selects an accent colour on Screen 3, update `--color-accent` on `:root` via JavaScript:

```js
document.documentElement.style.setProperty('--color-accent', selectedHex);
```

This single operation updates every accent-coloured element on the page including the preview panel with no additional work.

**Cross-document View Transition.** Add this at-rule to enable shared-element transition when navigating from `start.html` → `able-v7.html` (Chrome 126+, progressive enhancement):

```css
/* start.html */
@view-transition {
  navigation: auto;
}

/* Artist name element in Done screen phone preview */
.done-preview-artist-name {
  view-transition-name: artist-name;
}
```

The matching declaration in `able-v7.html` (hero artist name) must also have `view-transition-name: artist-name`. When the artist taps "See your live page", their name flies from the preview to the hero. Falls back to normal navigation on browsers without support.

**Complete type scale.** Add these to `:root` and use throughout:

| Element | CSS |
|---|---|
| Step headline H1 | `font: 800 clamp(38px,9.5vw,60px)/0.95 var(--font-display); text-transform: uppercase; letter-spacing: -0.02em` |
| Done screen headline | `font: 800 clamp(42px,11vw,72px)/0.9 var(--font-display); text-transform: uppercase; letter-spacing: -0.02em` |
| Step eyebrow | `font: 600 11px/1.4 var(--font-body); text-transform: uppercase; letter-spacing: 0.12em; color: var(--color-accent)` |
| Step subtitle | `font: 400 clamp(15px,3.8vw,17px)/1.65 var(--font-body)` |
| Card label | `font: 700 15px/1.3 var(--font-body)` |
| Card description | `font: 400 13px/1.55 var(--font-body); color: var(--color-muted)` |
| Field label | `font: 600 12px/1.4 var(--font-body); text-transform: uppercase; letter-spacing: 0.08em` |
| Field input | `font: 400 16px/1.5 var(--font-body)` — **minimum 16px: prevents iOS Safari viewport zoom** |
| Field hint | `font: 400 12px/1.5 var(--font-body); color: var(--color-muted)` |
| Field error | `font: 500 12px/1.4 var(--font-body); color: var(--color-error)` |
| Progress text | `font: 500 11px/1.4 var(--font-body); letter-spacing: 0.04em` |
| Continue button | `font: 700 15px/1 var(--font-body)` |
| Back button | `font: 500 14px/1 var(--font-body); color: var(--color-muted)` |

---

## 2. Architecture Overview

The wizard is a single HTML page (`start.html`) with 9 screens (0–8). Only one screen is visible at any time. There is no routing — screens are shown/hidden by toggling a CSS class.

**Screen list:**

| Index | ID | Title |
|---|---|---|
| 0 | `screen-hook` | Hook / Import |
| 1 | `screen-name` | Name |
| 2 | `screen-vibe` | Vibe |
| 3 | `screen-accent` | Accent colour |
| 4 | `screen-theme` | Theme |
| 5 | `screen-links` | Links |
| 6 | `screen-fan-cta` | Fan capture CTA |
| 7 | `screen-moment` | Current moment |
| 8 | `screen-done` | Done |

**Step numbering.** The progress bar and step counter count steps 1–7, corresponding to screens 1–7. Screen 0 and Screen 8 are outside the numbered flow.

**State object.** A single JS object `wizardState` holds all collected values:

```js
const wizardState = {
  importUrl:       null,   // raw pasted URL
  importedName:    null,   // from Spotify/import
  importedGenres:  [],     // from Spotify
  importedLinks:   [],     // from Linktree/import
  name:            '',
  vibe:            null,   // one of the 8 vibe slugs
  accent:          '#e05242',
  theme:           'dark', // 'dark' | 'light' | 'glass' | 'contrast'
  links:           [],     // [{ url, platform, label }]
  fanCta:          null,   // 'stay-close' | 'hear-first' | 'come-show' | 'support'
  moment:          null,   // 'just-dropped' | 'coming-soon' | 'tonight' | 'evergreen'
  releaseDate:     null,   // ISO date string (moment = 'coming-soon')
  streamLink:      '',     // optional (moment = 'just-dropped')
  venueName:       '',     // optional (moment = 'tonight')
  ticketUrl:       '',     // optional (moment = 'tonight')
  slug:            '',     // generated on Screen 8
};
```

---

## 3. Layout Structure

### 3.1 HTML skeleton

```html
<body>
  <div id="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="7"></div>
  <div id="wizard-shell">
    <div id="left-panel">
      <div id="wizard-topbar">
        <button id="btn-back">← Back</button>
        <span id="step-counter">Step 1 of 7</span>
      </div>
      <div id="screens-container">
        <!-- screens injected or present in DOM, toggled via class -->
      </div>
    </div>
    <div id="right-panel">
      <div id="preview-wrapper">
        <!-- phone frame + preview content -->
      </div>
    </div>
  </div>
</body>
```

### 3.2 Global layout values

| Property | Desktop (≥768px) | Mobile (<768px) |
|---|---|---|
| `#wizard-shell` display | `flex`, `flex-direction: row`, `gap: 48px` | `flex`, `flex-direction: column` |
| `#wizard-shell` max-width | `1200px` | `100%` |
| `#wizard-shell` margin | `0 auto` | `0` |
| `#wizard-shell` padding | `40px 48px` | `0` |
| `#left-panel` max-width | `560px` | `100%` |
| `#left-panel` flex | `1 1 560px` | `1` |
| `#left-panel` padding | `0` | `24px 20px 0 20px` |
| `#right-panel` max-width | `420px` | `100%` |
| `#right-panel` flex | `0 0 420px` | none (see §3.4) |
| `#right-panel` position | `sticky`, `top: 40px` | static |

**Page background:** `background-color: var(--color-bg)`. Applied on `<body>`.

**Minimum body height:** `min-height: 100svh`. Use `100svh` (small viewport height — address bar always counted) as the safe default. **Do NOT use `100dvh` for the keyboard problem** — on iOS Safari, `dvh` does NOT shrink when the virtual keyboard opens (the layout viewport is unchanged). The keyboard is handled separately via `visualViewport` API (see Section 3.5).

**Viewport meta tag (required):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, interactive-widget=resizes-visual">
```
The `interactive-widget=resizes-visual` attribute enforces consistent keyboard behaviour cross-browser (only visual viewport shrinks), enabling the `visualViewport` pattern to work uniformly on Android Chrome and iOS Safari.

### 3.3 Desktop right panel

The right panel is sticky so it stays in view as the user scrolls through longer screens. It holds the phone frame preview.

```css
#right-panel {
  position: sticky;
  top: 40px;
  align-self: flex-start;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
```

The phone frame has an intrinsic size of 390×844px. It is scaled down to fit the panel width using `transform: scale(0.65)` with `transform-origin: top center`. The containing element must be explicitly sized to the post-scale footprint so the layout does not collapse:

```css
#preview-wrapper {
  width: 390px;              /* intrinsic frame width */
  height: 844px;             /* intrinsic frame height */
  transform: scale(0.65);
  transform-origin: top center;
  /* Post-scale footprint hack — container collapses to scaled size */
  margin-bottom: calc((844px * 0.65) - 844px); /* ≈ -295px */
}
```

Practical note: set `#right-panel` height to `calc(844px * 0.65)` = `548.6px` and use `overflow: visible` so the transform does not clip.

### 3.4 Mobile preview — floating pill + bottom sheet

**Research basis:** No production app shows a side-by-side live preview at 390px. The production pattern (Linktree, Beacons, Squarespace mobile editor) is a floating pill that opens a full-screen bottom sheet. The 200px peek pattern was superseded by this research finding.

**Floating pill** — appears from Step 2 onwards (once vibe is selected and the preview has meaningful content):

```css
#preview-pill {
  position: fixed;
  bottom: 96px;           /* above the Continue button */
  right: 16px;
  height: 40px;
  padding: 0 16px;
  background: rgba(18, 21, 42, 0.92);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  touch-action: manipulation;
  z-index: 50;
  transition: opacity 200ms ease, transform 200ms ease;
}
```

Copy: `👁 See your page` — tapping opens the preview sheet.

**Preview bottom sheet:**

```css
#preview-sheet {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
}

#preview-sheet__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
}

#preview-sheet__panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 92vh;
  background: var(--color-card);
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  transform: translateY(100%);
  transition: transform 320ms cubic-bezier(0.25,0.46,0.45,0.94);
  will-change: transform;
}

#preview-sheet__panel.is-open {
  transform: translateY(0);
}
```

Sheet contains: drag handle (40×4px pill, muted, centred, mt-12) + "Your page" heading (DM Sans 14px 500, muted, mt-8) + the phone preview at `scale(0.82)` centred + "Close" pill button at bottom (48px height, full-width, muted border).

**On mobile, `#right-panel` is hidden entirely** (`display: none` at `max-width: 767px`). All preview access is via the pill/sheet pattern.

### 3.5 Keyboard handling (mobile — critical)

**The problem:** On iOS Safari, `100dvh` does NOT shrink when the virtual keyboard opens. The layout viewport is unchanged. Only the visual viewport shrinks. This means your fixed-position Continue button can be hidden behind the keyboard.

**The fix — `visualViewport` API:**

```javascript
function handleKeyboard() {
  const vv = window.visualViewport;
  const continueBtn = document.querySelector('.continue-btn');
  if (!continueBtn) return;

  // Pin the button to bottom of visual viewport
  const offset = window.innerHeight - (vv.height + vv.offsetTop);
  continueBtn.style.transform = `translateY(-${Math.max(0, offset)}px)`;
}

if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', handleKeyboard);
  window.visualViewport.addEventListener('scroll', handleKeyboard);
}
```

The Continue button must be `position: fixed; bottom: 24px` as default, and the JS lifts it above the keyboard. This is the same pattern Duolingo uses for their "Check" button on mobile web.

**`touch-action: manipulation` on all interactive elements** — removes 300ms tap delay on all buttons and cards:

```css
button, .vibe-card, .theme-card, .cta-card, .swatch, a {
  touch-action: manipulation;
}
```

**`overscroll-behavior: contain` on wizard container** — prevents iOS background bounce:

```css
#wizard-shell {
  overscroll-behavior: contain;
}
```

---

## 4. Global Wrapper — Persistent Elements

These elements live outside the screens container and are always in the DOM. Their visibility changes per screen.

### 4.1 Progress bar

**Element:** `<div id="progress-bar">`

| Property | Value |
|---|---|
| Position | `fixed`, `top: 0`, `left: 0`, `right: 0` |
| Height | `3px` |
| Background | `var(--color-accent)` |
| z-index | `100` |
| Initial width | `0%` |
| Width formula | `calc((currentStep / 7) * 100%)` where `currentStep` is 1–7 |
| Width transition | `width 300ms var(--ease-standard)` |
| Visibility | Visible on screens 1–7. `width: 0` and `opacity: 0` on screens 0 and 8. |

ARIA attributes update on every step advance:

```js
bar.setAttribute('aria-valuenow', currentStep);
```

### 4.2 Step counter

**Element:** `<span id="step-counter">`

| Property | Value |
|---|---|
| Font | DM Sans, 12px, weight 400 |
| Colour | `var(--color-muted)` |
| Position | Top-left of `#wizard-topbar` |
| Content | "Step N of 7" — N is current screen index (1–7) |
| Visibility | Hidden on screens 0 and 8. `display: none`. |

### 4.3 Back button

**Element:** `<button id="btn-back">`

| Property | Value |
|---|---|
| Font | DM Sans, 14px, weight 400 |
| Colour | `var(--color-muted)` |
| Background | none |
| Border | none |
| Cursor | `pointer` |
| Content | "← Back" |
| Visibility | Hidden on screens 0 and 8. `display: none`. |
| Hover | Colour transitions to `var(--color-text)`, 200ms linear |
| Min tap target | 44×44px (apply `padding: 10px` to enlarge hit area) |

**Back behaviour:** Clicking navigates to the previous screen using the reverse slide transition (see §15). State is preserved — inputs retain their values.

### 4.4 Top bar layout

```css
#wizard-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;         /* desktop */
  height: 40px;
}

@media (max-width: 767px) {
  #wizard-topbar {
    margin-bottom: 24px;
  }
}
```

---

## 5. Screen 0 — Hook / Import

**ID:** `screen-hook`
**Step counter:** hidden
**Back button:** hidden
**Progress bar:** `width: 0`, `opacity: 0`

### 5.1 Background

Applied to `screen-hook` element (not `body`), so it covers the full viewport:

```css
#screen-hook {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(224, 82, 66, 0.08) 0%, transparent 70%),
    var(--color-bg);
  padding: 48px 24px;
  text-align: center;
}
```

### 5.2 Headline

```
Text:         "Your page. No algorithm."
Font:         Barlow Condensed
Weight:       700
Size:         64px (desktop) / 44px (mobile, breakpoint 767px)
Line-height:  1.0
Letter-spacing: -0.5px
Colour:       var(--color-text) — white
Alignment:    centre
Margin-bottom: 16px
```

### 5.3 Sub-headline

```
Text:         "Set up in 3 minutes. Share the link. The rest is yours."
Font:         DM Sans
Weight:       400
Size:         16px (desktop and mobile)
Line-height:  1.6
Colour:       var(--color-muted)
Alignment:    centre
Max-width:    480px
Margin:       auto (horizontal), 0 0 32px 0 (bottom)
```

### 5.4 Import input

**Container:** `width: 100%`, `max-width: 520px`, `position: relative`

**Input element `<input type="url" id="import-input">`:**

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `56px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `0 52px 0 16px` (right side reserved for icons/spinner) |
| Font | DM Sans, 16px, weight 400 |
| Colour | `var(--color-text)` |
| Placeholder colour | `var(--color-muted)` |
| Outline | none |
| Focus border | `border-color: var(--color-accent)`, transition `200ms var(--ease-standard)` |

**Placeholder cycling.** The placeholder text cycles through 4 strings on a timer. Each string is shown for 2500ms with a 300ms crossfade. Use a `<span>` overlay positioned absolutely inside the container rather than the native `placeholder` attribute — this allows crossfade animation.

Cycle strings (in order, looping):
1. "Paste any link to your music or socials"
2. "linktr.ee/yourname"
3. "open.spotify.com/artist/..."
4. "soundcloud.com/yourname"

Crossfade implementation:

```css
.placeholder-cycling {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font: 400 16px/1 var(--font-body);
  color: var(--color-muted);
  transition: opacity 300ms var(--ease-standard);
}
/* Hide native placeholder when overlay is active */
#import-input::placeholder { color: transparent; }
/* Hide overlay when input has a value */
#import-input:not(:placeholder-shown) + .placeholder-cycling { display: none; }
```

**Platform icon badges.** When the pasted URL matches a known platform, 1–2 small icons (20px diameter circle, bg `var(--color-card)`, border `1px solid var(--color-border)`) appear in the right side of the input. They fade in: `opacity 0 → 1`, 200ms decel. Platforms detected: Spotify, SoundCloud, Linktree, Apple Music, Bandcamp, YouTube, Instagram, TikTok.

### 5.5 Import states

**Idle (default):** Border `1.5px solid var(--color-border)`.

**Typing / URL pasted:** Platform badges appear (see above). Button text: "Import →".

**Loading (import in flight):**
- Border: `1.5px solid var(--color-border)`
- Right side of input: dot-pulse animation (3 dots, 4px diameter, `var(--color-muted)`, animating scale 0.5→1→0.5 at 400ms stagger). 20px total width.
- Input `disabled`.

**Import success:**
- Border: `1.5px solid var(--color-success)`
- Left of input value: check icon (16px, `var(--color-success)`)
- Below input — two lines:
  - Line 1: "We found you on Spotify." — DM Sans 14px, weight 600, `var(--color-success)`, `margin-top: 8px`
  - Line 2: "[N] monthly listeners · [X] releases imported" — DM Sans 13px, weight 400, `var(--color-muted)`, `margin-top: 2px`
  - `N` = `followers.total` from Spotify API response (format with comma separator, e.g. "45,200")
  - `X` = count of albums/singles returned by import
- Auto-advance to Screen 1 after 1200ms (slightly longer to let artist read the data)

**Linktree import success:**
- Same success border and check icon
- Below input: "[N] links imported ✓" — DM Sans 14px, weight 400, `var(--color-success)`, `margin-top: 8px`
- `N` = number of links extracted from Linktree page

**Import failure:**
- Border: `1.5px solid var(--color-amber)`
- Below input: failure message in `var(--color-amber)`, DM Sans 14px, weight 400, `margin-top: 8px`
- Failure messages per error code:

| Code | Copy |
|---|---|
| `RATE_LIMITED` | "Spotify is busy right now — enter your name below and we'll skip it." |
| `BLOCKED` | "Couldn't reach that page. Enter your name below and carry on." |
| `NOT_FOUND` | "We couldn't find that artist. Check the link or start from scratch." |
| `TIMEOUT` | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |
| `PARSE_ERROR` | "Something went wrong reading that page. Enter your name below and carry on." |
| default | "Couldn't reach Spotify right now — that's on us. Enter your name below →" |

### 5.6 Import submit trigger

- User pastes a URL containing "spotify", "soundcloud", "linktree", or known platform domains → immediately trigger import (no button press needed)
- User presses Enter → trigger import
- Pressing Enter when input is empty → advance to Screen 1 directly

### 5.7 "Start from scratch →" link

```
Element:     <button> styled as link (no button appearance)
Text:        "Start from scratch →"
Font:        DM Sans, 14px, weight 400
Colour:      var(--color-muted)
Margin-top:  12px
Alignment:   centre
Hover:       colour → var(--color-text), transition 200ms linear
Display:     block, margin: 12px auto 0 auto
```

Clicking this advances directly to Screen 1 without attempting any import. No data is pre-filled.

### 5.7b Artist mini-spotlight card

Shown between the import input and the trust line. Position: below import controls, above trust line.

```
Container:   flex row, align-items: center, gap: 12px
             320px max-width, background: var(--color-card), border-radius: 12px
             border: 1px solid var(--color-border), padding: 12px 14px
             full width on mobile
```

Left — avatar:
```
Size:        40×40px, border-radius: 50%, object-fit: cover
Fallback:    accent-colour gradient circle if no image
```

Middle — text:
```
Name:        DM Sans, 15px, weight 600, var(--color-text)
Sub-line:    "[City] · set up in [N] mins"
             DM Sans, 12px, weight 400, var(--color-muted)
```

Right — chevron:
```
SVG:         chevron-right, 16×16px, var(--color-accent)
Animation:   single CSS pulse on page load: scale(1) → scale(1.3) → scale(1), 0.8s ease-in-out,
             iteration-count: 1, prefers-reduced-motion: none
```

Label above card:
```
Text:        "What an ABLE page looks like →"
Font:        DM Sans, 11px, weight 500, var(--color-muted)
Margin-bottom: 8px
```

Interaction:
```
Element:     <button> styled as a flex container (not <a> — accessibility)
On tap:      window.open(featuredArtistUrl, '_blank')
Hover:       border-color → rgba(var(--color-accent-rgb), 0.4), 200ms linear
Active:      transform: scale(0.98), 80ms ease-out
```

**Content source:** `ABLE_SPOTLIGHT` constant in start.html `<script>` block. Update with founder's artist page data after first page is live:
```js
const ABLE_SPOTLIGHT = {
  name: 'Declan Forde',
  city: 'London',
  setupMins: 4,
  avatarUrl: 'https://...', // actual photo URL
  pageUrl: 'https://able.fm/declan'
};
```
If `ABLE_SPOTLIGHT` is null, the spotlight card is not rendered (pre-first-page mode).

### 5.8 Trust line

```
Text:        "No card. No catch. Your page is free. Privacy policy →"
Font:        DM Sans, 12px, weight 400
Colour:      var(--color-muted)
Alignment:   centre
Margin-top:  16px
```

"Privacy policy →" is an `<a>` tag linking to the Iubenda privacy policy URL. Opens in new tab.

### 5.9 Social proof line

```
Text:        "Set up by artists in London, Manchester, Berlin, Bogotá, LA."
Font:        DM Sans, 11px, weight 400
Colour:      rgba(240, 240, 245, 0.3)   /* muted at 30% — more subtle than --color-muted */
Alignment:   centre
Margin-top:  8px
```

### 5.10 Resume banner

On page load, check `localStorage.getItem('able_wizard_draft')`. If the stored value exists and its `savedAt` timestamp is less than 24 hours ago:

**Show amber banner above the hook content:**

```
Background:  rgba(244, 185, 66, 0.12)
Border:      1px solid rgba(244, 185, 66, 0.3)
Border-radius: 10px
Padding:     12px 16px
Font:        DM Sans, 14px, weight 400
Colour:      var(--color-amber)
Text:        "Picking up where you left off."
```

On banner click (or tapping "Continue →" within the banner): restore `wizardState` from draft and navigate to the saved screen index (using forward transition, no animation on initial restore).

**Dismiss:** Small "✕" button (28×28px tap target) right side of banner. Dismisses banner without restoring state.

---

## 6. Screen 1 — Name

**ID:** `screen-name`
**Step:** 1 of 7
**Progress bar width:** `calc(1/7 * 100%)` = 14.28%

### 6.1 Headline

**Conditional on import state:**

If `wizardState.importedName !== null` (Spotify import succeeded):
```
Eyebrow:     "Good to meet you, [first name]."
Headline:    "Is [importedName] right?"
Sub-copy:    "Exactly right — keep going. Or type a different name below."
```
Name field is pre-filled with `importedName`. Cursor positioned at end of field.

If no import (`wizardState.importedName === null`):
```
Eyebrow:     "Step 1 of 7"
Headline:    "What do you go by?"
Sub-copy:    "Nothing goes live until you finish. Take your time."
```

**Headline spec (both paths):**
```
Font:        Barlow Condensed
Weight:      700
Size:        clamp(38px, 9.5vw, 60px)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 32px
```

### 6.2 Name input

**Element:** `<input type="text" id="input-name" autocomplete="name" spellcheck="false">`

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `56px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `0 16px` |
| Font | DM Sans, 16px, weight 400 |
| Colour | `var(--color-text)` |
| Placeholder | "Your artist name" |
| Placeholder colour | `var(--color-muted)` |
| Outline | none |
| Focus border | `border-color: var(--color-accent)`, transition `200ms var(--ease-standard)` |

**Auto-focus.** When Screen 1 becomes active, call `.focus()` on this input after the screen transition completes (150ms delay, aligns with transition timing).

**Pre-fill from import.** If `wizardState.importedName` is set, populate the input value with that name and position the cursor at the end. Also show the contextual micro-copy below the input (see §6.3).

### 6.3 Micro-copy

Two separate `<p>` elements below the input:

**Pre-fill micro-copy** (only shown when input was pre-filled from import):

```
Text:     "From your Spotify profile — edit if needed."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   8px 0 0 0
```

**Always-shown micro-copy:**

```
Text:     "Nothing goes live until you finish. Take your time."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   8px 0 0 0  (or 4px if pre-fill copy is also shown)
```

### 6.4 Continue button

This button spec applies to all Continue buttons across Screens 1–6. Screen 7 has a variant (see §12.6).

**Contextual CTA copy — each screen has its own label (not generic "Continue →"):**

| Screen | Primary CTA text | Secondary / skip text |
|---|---|---|
| Screen 0 | "Find me on Spotify →" | "Start without Spotify →" |
| Screen 1 | "That's my name →" | — |
| Screen 2 | "That's my vibe →" | — |
| Screen 3 | "That's my colour →" | — |
| Screen 4 | "Add my release →" | "Skip for now →" |
| Screen 5 | "Those are my links →" | — |
| Screen 6 | "Yes, capture my fans →" | "Skip fan sign-up →" |
| Screen 7 | "Build my page →" | — |
| Screen 8 | "See your live page" | — |

| Property | Value |
|---|---|
| Text | Per screen label above |
| Font | DM Sans, 16px, weight 600 |
| Height | `56px` |
| Width | `100%` on mobile; `min-width: 320px`, `max-width: 320px` on desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border | none |
| Border-radius | `12px` |
| Margin-top | `28px` |
| Cursor | `pointer` |
| Display | `block` |
| Desktop alignment | `margin-left: 0` (left-aligned in left panel) |

**Hover state (enabled):**

```css
button.continue:hover {
  filter: brightness(1.08);
  transform: translate(-1px, -2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: all 200ms var(--ease-spring);
}
```

**Disabled state:**

```css
button.continue:disabled {
  opacity: 0.35;
  cursor: not-allowed;
  transform: none;
  filter: none;
}
```

**Enabled condition.** Enabled as soon as the input contains ≥1 non-whitespace character.

**Enter key.** When the input is focused and contains ≥1 character, pressing Enter triggers Continue.

**Preview update.** On every keystroke in the name input, update the artist name displayed in the preview panel.

---

## 7. Screen 2 — Vibe

**ID:** `screen-vibe`
**Step:** 2 of 7
**Progress bar width:** `calc(2/7 * 100%)` = 28.57%

### 7.1 Headline

```
Text:        "What kind of music do you make?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 7.2 Vibe grid

```css
#vibe-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);   /* mobile default */
  gap: 10px;
  margin-bottom: 28px;
}

@media (min-width: 480px) {
  #vibe-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**Total cards:** 8 (7 genre vibes + 1 "My own thing.")

### 7.3 Vibe card spec

**Element structure (updated from research — native radio pattern gives arrow-key navigation free):**

```html
<fieldset id="vibe-grid" aria-required="true">
  <legend class="sr-only">What kind of music do you make?</legend>
  <label class="vibe-card" data-vibe="indie-alt">
    <input type="radio" name="vibe" value="indie-alt" class="sr-only">
    <span class="vibe-card__name">Indie / Alternative</span>
    <span class="vibe-card__artists">Wet Leg, Yard Act, The Smile</span>
  </label>
  <!-- ...repeat for each vibe... -->
</fieldset>
```

The `<label>` wraps the entire card, making the full card the tap target. The native `<input type="radio">` is visually hidden with `.sr-only` but fully accessible. Selected state is driven by `:has(input:checked)` CSS. Arrow keys navigate between cards automatically (native radio group behaviour — no JS needed).

**Selection animation — spring tap feedback (research-validated pattern):**

```css
/* Immediate press response — 0ms delay */
.vibe-card:active {
  transform: scale(0.97);
  transition: transform 50ms ease-out;
}

/* Selected state — spring return to scale(1.0) via CSS linear() spring */
.vibe-card:has(input:checked) {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.10);
  transform: scale(1.0);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.20);
  transition:
    border-color 150ms ease-out,
    background 150ms ease-out,
    box-shadow 150ms ease-out,
    transform var(--spring-duration) var(--spring-easing);
}
```

**The spring press sequence:**
1. `pointerdown` → `scale(0.97)` in 50ms (immediate, confirms tap felt)
2. Radio `checked` activates → browser springs from 0.97 → 1.04 (overshoot) → 1.0 via `var(--spring-easing)`
3. Border and background transition simultaneously at 150ms ease-out
4. The 4% overshoot (`scale(1.04)` at spring peak) is the craft — not visible as overshoot, felt as "alive"

If the user changes selection, the previous card snaps back to default (150ms). If JS is available, a `layoutId`-style shared indicator can glide between cards — spec this as a progressive enhancement via Framer Motion if the project adds it later.

Each card is a label+radio with:

| Property | Value |
|---|---|
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `14px` |
| Padding | `16px` |
| Cursor | `pointer` |
| Text-align | `left` |
| Touch-action | `manipulation` (removes 300ms tap delay) |
| Transition | per above — spring for transform, 150ms for colour properties |

**Card content layout:**

```
Genre name:     DM Sans, 16px, weight 600, var(--color-text), margin-bottom: 4px
Artist examples: DM Sans, 12px, weight 400, var(--color-muted), line-height 1.4
```

**Hover state (non-selected):**

```css
.vibe-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.01);
  transition: transform 150ms var(--ease-decel), border-color 150ms var(--ease-standard);
}
```

**Selected state:**

```css
.vibe-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
  transform: scale(1.02);
  transition: transform 200ms var(--ease-spring);
}
```

Note: `--color-accent-rgb` must be computed from `--color-accent` in JS whenever the accent changes, storing the R,G,B components without `rgba()` wrapper, for use in `rgba()` expressions.

**Pre-selected state (genres matched from Spotify import).** Same visual as selected, plus a tag:

```
Tag text:     "matched"
Font:         DM Sans, 10px, weight 400
Colour:       var(--color-muted)
Background:   rgba(255,255,255,0.06)
Border-radius: 4px
Padding:      2px 6px
Margin-top:   6px
Display:      inline-block
```

### 7.4 Vibe card data

| Slug | Genre name | Artist examples |
|---|---|---|
| `indie-alt` | Indie / Alt | Phoebe Bridgers, Soccer Mommy, Big Thief |
| `electronic` | Electronic | Four Tet, Bonobo, Bicep |
| `hiphop-rnb` | Hip-Hop / R&B | Loyle Carner, Little Simz, Sampha |
| `folk-acoustic` | Folk / Acoustic | Nick Mulvey, Laura Marling, Sufjan Stevens |
| `pop` | Pop | Raye, Dua Lipa, Charli XCX |
| `jazz-soul` | Jazz / Soul | Nubya Garcia, Ezra Collective, Jordan Rakei |
| `metal-rock` | Metal / Rock | Fontaines D.C., Idles, Sleep Token |
| `own-thing` | My own thing. | I'll choose my own colours and feel. |

For the `own-thing` card, the second line replaces "artist examples":

```
Text:    "I'll choose my own colours and feel."
Font:    DM Sans, 11px, weight 400
Colour:  var(--color-muted)
```

### 7.5 Continue

Enabled as soon as any card is selected (`aria-checked="true"`). Disabled otherwise.

### 7.6 Accent pre-selection trigger

When a vibe card is selected, immediately set `--color-accent` per this mapping (if the user has not manually chosen a colour on Screen 3 yet):

| Vibe slug | Accent hex |
|---|---|
| `indie-alt` | `#78c47b` |
| `electronic` | `#5b8ef0` |
| `hiphop-rnb` | `#d4874a` |
| `folk-acoustic` | `#c8a96e` |
| `pop` | `#e05242` |
| `jazz-soul` | `#8b63c8` |
| `metal-rock` | `#d4cfc8` |
| `own-thing` | no change (retain default `#e05242`) |

This pre-selection is visible in the preview panel immediately.

---

## 8. Screen 3 — Accent Colour

**ID:** `screen-accent`
**Step:** 3 of 7
**Progress bar width:** `calc(3/7 * 100%)` = 42.86%

### 8.1 Headline

```
Text:        "Pick a colour that feels like you."
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 32px
```

### 8.2 Swatch grid

```css
#swatch-grid {
  display: grid;
  grid-template-columns: repeat(4, 44px);
  gap: 12px;
  margin-bottom: 20px;
}
```

**Total swatches:** 8 (one row of 4 on mobile is fine — 4 columns always)

### 8.3 Swatch spec

**Element:** `<button class="swatch" aria-label="[Colour name]" data-hex="[hex]" style="background: [hex];">`

| Property | Value |
|---|---|
| Width | `44px` |
| Height | `44px` |
| Border-radius | `50%` |
| Border | none (default) |
| Cursor | `pointer` |
| Transition | `transform 150ms var(--ease-decel), box-shadow 150ms var(--ease-decel)` |

**Hover state:**

```css
.swatch:hover {
  transform: scale(1.05);
}
```

**Selected state:**

```css
.swatch.selected {
  transform: scale(1.1);
  box-shadow: 0 0 0 3px #ffffff, 0 0 0 6px var(--color-accent);
  transition: transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-spring);
}
```

Note: `box-shadow` uses the current swatch colour for the outer ring. Update this dynamically when selection changes.

### 8.4 Swatch colour data

| Label | Hex |
|---|---|
| Green | `#78c47b` |
| Blue | `#5b8ef0` |
| Amber | `#d4874a` |
| Sand | `#c8a96e` |
| Coral | `#e05242` |
| Purple | `#8b63c8` |
| Bone | `#d4cfc8` |
| Teal | `#1a9e6e` |

**Default pre-selection.** Pre-select the swatch matching the vibe-to-accent mapping from §7.6. If vibe is `own-thing`, no swatch is pre-selected by default.

### 8.5 Preview update timing

On every swatch click, immediately (0ms debounce) call:

```js
document.documentElement.style.setProperty('--color-accent', selectedHex);
wizardState.accent = selectedHex;
// Also update accent-rgb for rgba() use:
const [r, g, b] = hexToRgb(selectedHex);
document.documentElement.style.setProperty('--color-accent-rgb', `${r}, ${g}, ${b}`);
```

The preview panel updates instantaneously with the new accent colour.

### 8.6 Custom hex input

```
Trigger:      text link "Use my own colour →" below swatch grid
Font:         DM Sans, 13px, weight 400
Colour:       var(--color-muted)
Hover:        var(--color-text), 200ms linear
Margin-top:   4px
```

On click, the text link is replaced by an inline hex input:

```
Element:      <input type="text" id="input-hex" maxlength="7" placeholder="#e05242">
Width:        140px
Height:       44px
Background:   var(--color-card)
Border:       1.5px solid var(--color-border)
Border-radius: 10px
Padding:      0 12px
Font:         DM Sans, 14px, weight 400, monospace
Colour:       var(--color-text)
```

**Validation on blur.** On `blur` event:
- If value matches `/^#[0-9a-fA-F]{6}$/` → apply as accent, add a ninth swatch at the end of the grid showing this colour in selected state.
- If invalid → border turns `var(--color-error)`, show error message below input:

```
Text:     "Use a hex code like #e05242"
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-error)
Role:     alert
```

### 8.7 Continue

Enabled as soon as any swatch is selected or a valid custom hex is entered.

---

## 9. Screen 4 — Theme

**ID:** `screen-theme`
**Step:** 4 of 7
**Progress bar width:** `calc(4/7 * 100%)` = 57.14%

### 9.1 Headline

```
Text:        "How should your page feel?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 9.2 Theme card grid

```css
#theme-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 28px;
}
```

Always 2 columns — on both mobile and desktop.

### 9.3 Theme card spec

**Element:** `<button role="radio" aria-checked="false" class="theme-card" data-theme="[slug]">`

| Property | Value |
|---|---|
| Height | `160px` |
| Border-radius | `16px` |
| Overflow | `hidden` |
| Position | `relative` |
| Border | `1.5px solid var(--color-border)` |
| Cursor | `pointer` |
| Transition | `border 150ms, transform 200ms` |

**Selected state:**

```css
.theme-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  transform: scale(1.02);
  transition: transform 200ms var(--ease-spring);
}
```

**Name overlay.** Positioned at bottom of card:

```css
.theme-card__name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 14px;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%);
  font: 600 14px/1.2 var(--font-body);
}
```

**Text colour per theme:**
- Dark, Glass, Contrast: `#ffffff`
- Light: `#1a1a2e` (dark text on light background)

### 9.4 Theme card backgrounds

| Slug | Display name | Background |
|---|---|---|
| `dark` | Dark | `linear-gradient(135deg, #0d0e1a 0%, #1a1d35 100%)` |
| `light` | Light | `linear-gradient(135deg, #f0ede8 0%, #e5e0d8 100%)` |
| `glass` | Glass | See below |
| `contrast` | Contrast | `#000000` |

**Glass card background:** The glass card uses a gradient that hints at frosted glass. It cannot actually be `backdrop-filter` inside a card, so simulate it:

```css
[data-theme="glass"] {
  background:
    linear-gradient(135deg,
      rgba(255,255,255,0.12) 0%,
      rgba(255,255,255,0.04) 100%);
  border: 1px solid rgba(255,255,255,0.18);
}
```

Add a small frosted glass indicator label inside the card:

```
Text:     "Backdrop blur"
Font:     DM Sans, 10px, weight 400
Colour:   rgba(255,255,255,0.5)
Position: top-right, padding 8px
```

This communicates the effect visually in lieu of a live backdrop filter demonstration.

### 9.5 Default selection

`dark` is pre-selected when the screen is first shown.

### 9.6 Preview update

On each theme card selection, apply the corresponding class to the preview panel:

```js
previewRoot.dataset.theme = selectedTheme;
// The preview uses the same CSS as able-v7.html
// which applies theme rules based on data-theme attribute
```

### 9.7 Continue

Enabled immediately (a theme is always pre-selected).

---

## 10. Screen 5 — Links

**ID:** `screen-links`
**Step:** 5 of 7
**Progress bar width:** `calc(5/7 * 100%)` = 71.43%

### 10.1 Headline

```
Text:        "Where can people find your music?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 8px
```

### 10.2 Sub-headline

Shown conditionally:

```
If links were imported:
  Text:   "We brought your links across."

If no import:
  Text:   "Paste any links — we'll recognise the platform."

Font:     DM Sans, 16px, weight 400
Colour:   var(--color-muted)
Margin-bottom: 24px
```

### 10.3 Imported links list

Only shown when `wizardState.importedLinks.length > 0`.

**Container:**

```css
#imported-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
```

**Each link row** (`<label>` wrapping a checkbox + content):

```css
.link-row {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 16px;
  background: var(--color-card);
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
}
```

**Row content (left to right):**

1. Checkbox `<input type="checkbox" checked>`:
   - 20×20px, border-radius 6px, accent-coloured when checked
   - Checked by default (all imported links included)

2. Platform icon: 20×20px SVG or image. Source: inline SVGs per platform stored in a `PLATFORM_ICONS` object in JS.

3. Platform name: DM Sans, 14px, weight 600, `var(--color-text)`

4. URL (truncated): DM Sans, 12px, weight 400, `var(--color-muted)`, `overflow: hidden`, `text-overflow: ellipsis`, `white-space: nowrap`, max-width `160px`

5. Check badge: "✓" character, 14px, `var(--color-success)`, `margin-left: auto`

**Unchecked state:** Row opacity drops to `0.5`. Badge hidden.

### 10.4 "Add another link" input

**Element:** `<input type="url" id="input-add-link">`

| Property | Value |
|---|---|
| Width | `100%` |
| Height | `48px` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `12px` |
| Padding | `0 44px 0 16px` |
| Font | DM Sans, 14px, weight 400 |
| Placeholder | "Paste a link..." |
| Focus border | `var(--color-accent)`, 200ms |

**Platform detection on paste.** On the `paste` or `input` event, check the URL against known platform domains. If matched:
- Show platform icon (20px) in right side of input, fading in over 200ms
- After 500ms, add the link to the list above and clear the input

**No links fallback link:**

```
Text:     "No links yet — that's fine."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin-top: 12px
Display:  block, text-align: centre
```

Clicking this advances to Screen 6 without requiring any link. It is a `<button>` styled as a text link, not a `<a>`.

### 10.5 Platform detection domains

| Platform | Matched domains |
|---|---|
| Spotify | `open.spotify.com`, `spotify.com` |
| Apple Music | `music.apple.com`, `itunes.apple.com` |
| SoundCloud | `soundcloud.com` |
| Bandcamp | `bandcamp.com` |
| YouTube | `youtube.com`, `youtu.be` |
| Instagram | `instagram.com` |
| TikTok | `tiktok.com` |
| Linktree | `linktr.ee`, `linktree.com` |
| Songkick | `songkick.com` |
| Dice | `dice.fm` |
| Generic | (fallback for unrecognised URLs) |

### 10.6 Continue

Enabled immediately. Links are optional.

---

## 11. Screen 6 — Fan Capture CTA

**ID:** `screen-fan-cta`
**Step:** 6 of 7
**Progress bar width:** `calc(6/7 * 100%)` = 85.71%

### 11.1 Headline

```
Text:        "What do you want fans to do?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 11.2 Choice cards

4 cards stacked vertically, full-width, not a grid.

**Container:**

```css
#fan-cta-choices {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
  role: "radiogroup";
}
```

**Each card:** `<button role="radio" aria-checked="false" class="choice-card" data-cta="[slug]">`

| Property | Value |
|---|---|
| Height | `64px` |
| Width | `100%` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `12px` |
| Padding | `0 20px` |
| Display | `flex` |
| Align-items | `center` |
| Gap | `12px` |
| Cursor | `pointer` |
| Text-align | `left` |

**Card content:**

```
Icon:          24px, colour var(--color-muted), flex-shrink: 0
CTA copy:      DM Sans, 16px, weight 500, var(--color-text), flex: 1
Description:   DM Sans, 13px, weight 400, var(--color-muted)
               Mobile: below CTA copy (column layout at <480px)
               Desktop: right side (margin-left: auto)
```

**Selected state:**

```css
.choice-card[aria-checked="true"] {
  border: 2px solid var(--color-accent);
  background: rgba(var(--color-accent-rgb), 0.08);
}
.choice-card[aria-checked="true"] .card-icon {
  color: var(--color-accent);
}
```

**Hover (non-selected):**

```css
.choice-card:hover {
  border-color: rgba(255,255,255,0.18);
}
```

### 11.3 Choice card data

| Slug | Icon | CTA copy | Description |
|---|---|---|---|
| `stay-close` | heart | "Stay close." | "I'll keep them updated" |
| `hear-first` | bell | "Hear it first." | "My next release, before anyone else" |
| `come-show` | map-pin | "Come to the show." | "Where I'm playing next" |
| `support` | sparkle | "Support me directly." | "Merch, downloads, or a tip" |

**Icons.** Use inline SVG. Icon size `24px × 24px`. SVG `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="1.5"`.

Icon paths (Heroicons-compatible outline style):
- heart: `M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z`
- bell: `M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0`
- map-pin: `M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z`
- sparkle: `M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z`

### 11.4 Preview update

When a choice card is selected, update the fan CTA button in the preview panel to show the exact copy from the selected card (e.g. "Stay close.", "Hear it first.").

### 11.5 Trust line

```
Text:     "Your fans. Your data. They're yours — we can't contact them."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 16px
```

**North star line (below trust line):**

```
Text:     "Their email is yours. Not Instagram's. Not TikTok's. Not ours."
Font:     DM Sans, 12px, weight 500
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 6px
```

### 11.6 Continue

Enabled as soon as any choice is selected.

---

## 12. Screen 7 — Current Moment

**ID:** `screen-moment`
**Step:** 7 of 7
**Progress bar width:** `calc(7/7 * 100%)` = 100%

### 12.1 Headline

```
Text:        "What's happening right now?"
Font:        Barlow Condensed, 700
Size:        52px (desktop) / 36px (mobile)
Line-height: 1.05
Letter-spacing: -0.3px
Colour:      var(--color-text)
Margin-bottom: 24px
```

### 12.2 Choice cards

4 cards, same spec as §11.2. Container is `role="radiogroup"`.

### 12.3 Choice card data

| Slug | CTA copy | Description |
|---|---|---|
| `just-dropped` | "Music just dropped." | "It's out now, stream it" |
| `coming-soon` | "Something's coming." | "Pre-release mode, build anticipation" |
| `tonight` | "Playing tonight." | "Gig mode, tickets front" |
| `evergreen` | "Just me, being an artist." | "Evergreen profile, no campaign" |

No icons on this screen's cards. Cards are otherwise identical in structure to §11.2 but with no icon slot.

### 12.4 Conditional inline inputs

When a card is selected, an additional input area slides in below that card. All slide-in animations:

```css
.moment-extra {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 200ms var(--ease-decel),
    opacity 200ms var(--ease-decel),
    margin-top 200ms var(--ease-decel);
}
.moment-extra.visible {
  max-height: 200px;   /* enough for 2 stacked inputs */
  opacity: 1;
  margin-top: 10px;
}
```

Initial reveal also applies `translateY(8px) → translateY(0)` on the inner content:

```css
.moment-extra .inner {
  transform: translateY(8px);
  transition: transform 200ms var(--ease-decel);
}
.moment-extra.visible .inner {
  transform: translateY(0);
}
```

**Input style (shared for all conditional inputs):**

| Property | Value |
|---|---|
| Height | `44px` |
| Width | `100%` |
| Background | `var(--color-card)` |
| Border | `1.5px solid var(--color-border)` |
| Border-radius | `10px` |
| Padding | `0 12px` |
| Font | DM Sans, 14px, weight 400 |
| Colour | `var(--color-text)` |
| Margin-top | `8px` (between label and input; `12px` between inputs) |

**Label style:**

```
Font:   DM Sans, 12px, weight 400
Colour: var(--color-muted)
```

---

**"Music just dropped" extras:**

```
Label:       "Add a streaming link (optional)"
Input:       placeholder "open.spotify.com/album/..." , type url
```

On paste: detect platform, show badge (same behaviour as §10.4).

---

**"Something's coming" extras:**

```
Label:       "When does it drop?"
Input:       <input type="date">
             Min date: tomorrow (today + 1 day, computed from JS Date)
             Styled to match spec above
```

Styling `<input type="date">`:

```css
input[type="date"] {
  /* Override native appearance */
  -webkit-appearance: none;
  appearance: none;
  color-scheme: dark;
  /* Apply the same look as other inputs */
  height: 44px;
  background: var(--color-card);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  padding: 0 12px;
  font: 400 14px var(--font-body);
  color: var(--color-text);
  width: 100%;
}
input[type="date"]:focus {
  border-color: var(--color-accent);
  outline: none;
}
```

On date change: immediately update the preview panel's countdown display. The preview must compute the days remaining from the selected date and render it in the profile countdown component.

---

**"Playing tonight" extras:**

Two inputs, stacked, gap `12px`:

```
Input 1: label "Venue name (optional)", placeholder "Fabric, London"
Input 2: label "Ticket link (optional)", placeholder "dice.fm/...", type url
```

---

**"Just me, being an artist." extras:** None. No additional input slides in.

---

### 12.5 None-selected state

When the screen is first shown, no card is selected. All `moment-extra` panels are `max-height: 0, opacity: 0`.

When a different card is selected, any previously open extra panel closes (animation reverses: `max-height → 0, opacity → 0`) before the new panel opens. Run both simultaneously (no sequencing needed for simplicity).

### 12.5b North star reassurance (above submit button)

```
Text:     "Everything on this page is yours. No algorithm decides who sees it."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-bottom: 16px
```

### 12.6 Submit button — "Build my page →"

This replaces the standard Continue button on Screen 7.

| Property | Value |
|---|---|
| Text | "Build my page →" |
| Font | Barlow Condensed, 20px, weight 700 |
| Height | `56px` |
| Width | same as Continue button: full-width mobile, 320px desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border-radius | `12px` |
| Margin-top | `32px` |
| Letter-spacing | `-0.2px` |

Hover and disabled states: same as Continue button (§6.4).

**Enabled condition.** Enabled as soon as any moment card is selected. (All inline inputs are optional.)

**Submit action:**

1. Read all `wizardState` values.
2. Generate a slug from the artist name: lowercase, spaces → hyphens, remove non-alphanumeric except hyphens, max 32 chars.
3. Set `wizardState.slug = generatedSlug`.
4. Write `able_v3_profile` to localStorage (see §16.2).
5. Delete `able_wizard_draft` from localStorage.
6. Advance to Screen 8.

---

## 13. Screen 8 — Done

**ID:** `screen-done`
**Step counter:** hidden
**Back button:** hidden
**Progress bar:** `width: 100%`, retained

### 13.1 Background

```css
#screen-done {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(ellipse 100% 80% at 50% 20%, rgba(var(--color-accent-rgb), 0.15) 0%, transparent 60%),
    var(--color-bg);
  padding: 64px 24px 48px;
  text-align: center;
}
```

Note: on Screen 8 the two-column layout is abandoned. Content is a single centred column. `#right-panel` is hidden (`display: none`) on this screen.

### 13.2 Headline

```
Text:        "Your page is live."
Font:        Barlow Condensed
Weight:      800
Size:        72px (desktop) / 52px (mobile)
Line-height: 0.95
Letter-spacing: -0.5px
Colour:      var(--color-text) — white
Alignment:   centre
```

**Done screen animation sequence (3-beat orchestration — research validated):**

**Beat 1 (0ms) — Labor illusion "building" sequence (3s before Screen 8 appears):**

Before Screen 8 renders, show a full-screen loading state with three micro-steps (Harvard research: 15% higher satisfaction even when result is instant):

```css
#building-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  z-index: 300;
}

.building-step {
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--color-muted);
  opacity: 0;
  animation: build-step 400ms ease-out forwards;
}
.building-step.done { color: var(--color-success); }

@keyframes build-step {
  from { opacity: 0; translate: 0 6px; }
  to   { opacity: 1; translate: 0 0; }
}
```

JS sequence:
```javascript
// Steps appear at 0ms, 900ms, 1800ms, then overlay fades at 2600ms
const steps = ['Adding your name...', 'Setting your colour...', 'Your page is live.'];
steps.forEach((text, i) => {
  setTimeout(() => showBuildStep(text, i === 2), i * 900);
});
setTimeout(() => {
  buildOverlay.style.transition = 'opacity 400ms ease-out';
  buildOverlay.style.opacity = '0';
  setTimeout(() => {
    buildOverlay.remove();
    showScreen8();
  }, 400);
}, 2600);
```

**Beat 2 (Screen 8 enters — 0ms) — Headline spring entrance:**

```css
#done-headline {
  opacity: 0;
  transform: scale(0.88);
  animation: done-entrance var(--spring-duration) var(--spring-easing) forwards;
}

@keyframes done-entrance {
  to {
    opacity: 1;
    transform: scale(1.0);
  }
}
```

**Beat 3 (280ms delay) — Accent pulse ring radiates from behind headline (one loop only):**

```css
#done-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid rgba(var(--color-accent-rgb), 0.6);
  animation: pulse-ring 800ms ease-out 280ms forwards;
  pointer-events: none;
}

@keyframes pulse-ring {
  from {
    transform: scale(0.8);
    opacity: 0.8;
  }
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
```

One loop. Stops. No repeating pulse — that would feel anxious, not celebratory. Tonally correct for ABLE.

**Beat 4 (460ms) — Slug and CTAs stagger in:**

```css
#done-slug      { animation: content-enter 280ms ease-out 460ms both; }
#done-cta-primary   { animation: content-enter 280ms ease-out 540ms both; }
#done-cta-secondary { animation: content-enter 280ms ease-out 600ms both; }
#done-share-row     { animation: content-enter 280ms ease-out 660ms both; }
```

No confetti. The accent ring, the spring scale, the staggered arrival of each element — this is the celebration. ABLE's tone does not permit generic confetti.

```css
@media (prefers-reduced-motion: reduce) {
  #done-headline, #done-slug, #done-cta-primary,
  #done-cta-secondary, #done-share-row, #done-pulse-ring {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  #building-overlay { display: none !important; }
}
```

### 13.3 Slug display

```
Container:  margin-top: 24px, display: inline-flex, align-items: centre, gap: 8px
Text:       "ablemusic.co/[slug]"
Font:       DM Sans, 18px, weight 500
Colour:     var(--color-text)
```

**Pencil icon.** 16px SVG inline, `var(--color-muted)`, `cursor: pointer`. On hover: `var(--color-text)`, 150ms.

**Inline edit.** On pencil icon click (or click on the slug text itself):
- Replace the `<span>` containing the slug text with `<input type="text">` having the same font/size/colour.
- Input gains focus automatically.
- On blur or Enter: validate (alphanumeric + hyphens only, 3–32 chars). If valid: update `wizardState.slug` and revert to text display. If invalid: show error below in `var(--color-error)`, 12px: "Slugs can only contain letters, numbers, and hyphens."
- Input style: background transparent, border-bottom `1.5px solid var(--color-accent)`, no other border.

**Slug note:**

```
Text:     "Slugs are first-come, first-served."
Font:     DM Sans, 11px, weight 400
Colour:   var(--color-muted)
Margin-top: 6px
```

### 13.3b North star line (below URL slug)

```
Text:     "No algorithm between you and your fans."
Font:     DM Sans, 13px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 6px
```

### 13.4 Linktree notice (conditional)

Only shown when `wizardState.importedLinks` came from a Linktree URL and at least 1 link was imported.

```
Text:     "Your Linktree can stay up or come down — that's your call."
Font:     DM Sans, 13px, weight 400
Colour:   var(--color-muted)
Alignment: centre
Margin-top: 8px
```

### 13.5 Primary CTA — "See your live page"

| Property | Value |
|---|---|
| Text | "See your live page" |
| Font | Barlow Condensed, 18px, weight 700 |
| Height | `52px` |
| Width | `100%` on mobile; `280px` on desktop |
| Background | `var(--color-accent)` |
| Colour | `#ffffff` |
| Border-radius | `12px` |
| Margin-top | `32px` |

On click: open `able-v7.html` in the same tab. The profile renders from `localStorage.able_v3_profile`.

### 13.6 Secondary CTA — "Open my dashboard →"

| Property | Value |
|---|---|
| Text | "Open my dashboard →" |
| Font | DM Sans, 16px, weight 500 |
| Height | `48px` |
| Width | `100%` on mobile; `280px` on desktop |
| Background | transparent |
| Border | `1.5px solid var(--color-accent)` |
| Colour | `var(--color-accent)` |
| Border-radius | `12px` |
| Margin-top | `12px` |

Hover: `background: rgba(var(--color-accent-rgb), 0.08)`, 200ms.

On click: open `admin.html` in the same tab.

### 13.7 Dashboard context line

```
Text:     "From there, you can see who signs up, switch campaign modes,
           and update anything on your page."
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Max-width: 320px
Margin:   8px auto 0 auto
```

### 13.8 Share row

**Label:**

```
Text:     "Share your page"
Font:     DM Sans, 12px, weight 400
Colour:   var(--color-muted)
Margin:   32px 0 12px 0
```

**Icon buttons container:**

```css
#share-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
```

**Instagram Story button** `<button id="btn-share-instagram">`:

```
Width:  40px
Height: 40px
Border-radius: 50%
Background: var(--color-card)
Border: 1.5px solid var(--color-border)
Cursor: pointer
```

Contains Instagram logo SVG (20px, `var(--color-muted)`). Hover: border `var(--color-accent)`, icon `var(--color-accent)`, 150ms.

On click: open Instagram Stories share sheet with the page URL pre-loaded (use `navigator.share` API if available; fallback: copy URL and show toast "Link copied — paste it into your Instagram Story").

**Copy Link button** `<button id="btn-copy-link">`:

Same dimensions as Instagram button. Contains copy/link SVG icon (20px).

On click:
- Copy `https://ablemusic.co/[slug]` to clipboard using `navigator.clipboard.writeText()`
- Button shows "Copied ✓" text (replacing icon) for 2000ms, then resets.
- Text: DM Sans, 10px, weight 500, `var(--color-success)`

### 13.9 Free tier line

```
Text:     "Your first 100 fan sign-ups are free. After that, £9/month removes the cap."
Font:     DM Sans, 12px, weight 400
Colour:   rgba(240, 240, 245, 0.3)
Alignment: centre
Position: bottom of screen, margin-top: 40px
```

No confetti. No fireworks. No celebration animation beyond the headline entrance. The confidence of the design is the celebration.

---

## 14. Live Preview Panel

### 14.1 Overview

The preview panel renders a scaled-down version of the artist's `able-v7.html` profile inside a phone frame SVG. It updates in real-time as the wizard state changes.

**Implementation approach.** The preview is NOT an `<iframe>`. It is a fully inlined mini-render of the profile using the same CSS custom properties. The preview HTML structure is a subset of `able-v7.html`'s top section — enough to show the artist name, accent colour, theme, and fan CTA. Full scroll is not required in the preview.

This avoids cross-origin issues and allows instant CSS variable propagation.

### 14.2 Phone frame

Use an SVG shell overlaid on top of the preview content:

```
Frame dimensions:  390px wide × 844px tall (intrinsic)
Border-radius:     44px
Frame colour:      rgba(255,255,255,0.08) stroke, 2px
Status bar:        simple SVG notch at top (12px height, centered)
Home indicator:    5px rounded bar at bottom (120px wide, rgba(255,255,255,0.3))
```

**SVG frame structure:**

```html
<div id="preview-wrapper">
  <svg id="phone-frame" viewBox="0 0 390 844" fill="none" xmlns="http://www.w3.org/2000/svg"
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 2;">
    <rect x="1" y="1" width="388" height="842" rx="43" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
    <!-- notch -->
    <rect x="155" y="12" width="80" height="6" rx="3" fill="rgba(255,255,255,0.2)"/>
    <!-- home indicator -->
    <rect x="135" y="820" width="120" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
  </svg>
  <div id="preview-content">
    <!-- Profile mini-render -->
  </div>
</div>
```

The `#preview-content` div sits behind the SVG frame (`z-index: 1`), clipped to the phone shape:

```css
#preview-content {
  position: absolute;
  top: 0; left: 0;
  width: 390px; height: 844px;
  border-radius: 44px;
  overflow: hidden;
  z-index: 1;
  background: var(--color-bg);
}
```

### 14.3 Preview content structure

The preview renders a simplified version of the profile top card. Minimum required elements:

```html
<div id="preview-content" data-theme="dark">

  <!-- Hero background — uses artist accent as gradient -->
  <div class="preview-hero-bg"></div>

  <!-- Avatar placeholder -->
  <div class="preview-avatar"></div>

  <!-- Artist name -->
  <div class="preview-artist-name">[Artist name or "Your name"]</div>

  <!-- Genre tag -->
  <div class="preview-genre">[Selected vibe display name]</div>

  <!-- Primary CTA button — mirrors fan CTA choice -->
  <button class="preview-cta">[Fan CTA copy]</button>

  <!-- Page state badge — mirrors current moment -->
  <div class="preview-state-badge">[State copy]</div>

</div>
```

**Empty state (before name is entered):**

The preview-artist-name shows:

```
Text:     "Your page is taking shape."
Font:     DM Sans, 16px, weight 400
Colour:   var(--color-muted)
Alignment: centre
```

**After name is entered:** Artist name is shown in `--font-display`, Barlow Condensed, weight 700, `var(--color-text)`.

### 14.4 Preview CSS (mini-render)

The `#preview-content` element uses the same CSS variables as the main page. All that changes per wizard selection is CSS custom properties and `data-theme` attribute.

```css
/* Hero background */
.preview-hero-bg {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 340px;
  background: radial-gradient(ellipse at 50% 0%, rgba(var(--color-accent-rgb), 0.3) 0%, transparent 70%),
              var(--color-card);
}

/* Avatar circle */
.preview-avatar {
  position: relative;
  width: 88px; height: 88px;
  border-radius: 50%;
  background: rgba(var(--color-accent-rgb), 0.2);
  border: 2px solid rgba(var(--color-accent-rgb), 0.4);
  margin: 60px auto 16px;
}

/* Artist name */
.preview-artist-name {
  font: 700 32px/1.0 var(--font-display);
  color: var(--color-text);
  text-align: centre;
  letter-spacing: -0.5px;
  padding: 0 24px;
}

/* Genre */
.preview-genre {
  font: 400 14px/1.4 var(--font-body);
  color: var(--color-muted);
  text-align: centre;
  margin-top: 4px;
}

/* Primary CTA */
.preview-cta {
  display: block;
  margin: 24px auto 0;
  height: 52px;
  padding: 0 28px;
  background: var(--color-accent);
  color: #fff;
  font: 600 16px/1 var(--font-body);
  border: none;
  border-radius: 12px;
  pointer-events: none;   /* preview is non-interactive */
}

/* State badge */
.preview-state-badge {
  display: inline-flex;
  align-items: center;
  margin: 16px auto 0;
  padding: 5px 12px;
  background: rgba(var(--color-accent-rgb), 0.15);
  border: 1px solid rgba(var(--color-accent-rgb), 0.3);
  border-radius: 20px;
  font: 500 12px/1 var(--font-body);
  color: var(--color-accent);
}
```

**Theme variants on preview-content:**

```css
#preview-content[data-theme="light"] {
  background: #f0ede8;
  --color-text: #1a1a2e;
  --color-muted: rgba(26, 26, 46, 0.5);
  --color-card: rgba(255,255,255,0.8);
}
#preview-content[data-theme="contrast"] {
  background: #000000;
}
#preview-content[data-theme="glass"] {
  background: linear-gradient(135deg, rgba(20,22,40,0.9), rgba(13,14,26,0.95));
}
```

### 14.5 Preview update triggers

| Trigger | What updates |
|---|---|
| Name input keystroke | `preview-artist-name` text content |
| Vibe card selected | `preview-genre` text content + accent pre-selection |
| Accent swatch clicked | `--color-accent` CSS variable on `:root` |
| Custom hex valid | `--color-accent` CSS variable on `:root` |
| Theme card selected | `data-theme` attribute on `#preview-content` |
| Fan CTA card selected | `preview-cta` text content |
| Moment card selected | `preview-state-badge` text content |
| Release date changed | Countdown number in `preview-state-badge` |

**Debounce policy:** All updates are immediate (0ms debounce). CSS variable changes propagate synchronously in the browser.

### 14.6 Preview pulse animation

On every CSS variable change or content update:

```css
#preview-content {
  transition: transform 150ms var(--ease-decel);
}
```

```js
// Called on every update
function pulsePreview() {
  previewContent.style.transform = 'scale(0.995)';
  requestAnimationFrame(() => {
    previewContent.style.transform = 'scale(1.0)';
  });
}
```

The pulse is subtle (0.5% scale decrease) and resolves within the decel curve over 150ms.

### 14.7 Screen 0 and Screen 8

- Screen 0: `#right-panel` is `display: none`. No preview on the hook screen.
- Screen 8: `#right-panel` is `display: none`. The done screen is single-column.

---

## 15. Step Transitions

### 15.1 Spring easing values (CSS `linear()` — Baseline 2023, no JS needed)

Pre-generated from the physics-accurate spring curve (stiffness: 300, damping: 28):

```css
:root {
  --spring-easing: linear(
    0, 0.012, 0.05 2.6%, 0.198, 0.352 10.5%,
    0.896 21%, 1.031, 1.06 27.4%, 1.065,
    1.054 33.3%, 1 40%, 0.985, 0.984 48.5%,
    0.998 57.8%, 1 70%, 1
  );
  --spring-duration: 560ms;
}
```

Use `var(--spring-easing)` and `var(--spring-duration)` on card selections and done-screen entrances. Use `var(--ease-decel)` for step-to-step slides (fixed duration, no overshoot wanted).

### 15.2 Forward transition — `@starting-style` pattern (Baseline 2024)

Use `@starting-style` + `transition-behavior: allow-discrete` to animate step entry/exit without JavaScript class-toggle hacks. Each step is absolutely positioned within an `overflow: hidden` wrapper:

```css
/* Step wrapper */
#screens-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

/* Each step */
.screen {
  position: absolute;
  inset: 0;
  opacity: 1;
  translate: 0 0;
  transition:
    opacity 220ms ease-in,
    translate 220ms ease-in,
    display 220ms allow-discrete;
}

/* Active step enters — @starting-style triggers on DOM insertion / display:block */
.screen.active {
  display: block;
  opacity: 1;
  translate: 0 0;
  transition:
    opacity 300ms var(--ease-decel),
    translate 300ms var(--ease-decel),
    display 300ms allow-discrete;
}

@starting-style {
  .screen.active {
    opacity: 0;
    translate: 28px 0;   /* enters from right (forward navigation) */
  }
}

/* Inactive step exits */
.screen:not(.active) {
  opacity: 0;
  translate: -28px 0;   /* exits to left */
  pointer-events: none;
}
```

**JS step advance:**
```javascript
function goToStep(n, direction = 'forward') {
  const updateFn = () => {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screens[n].classList.add('active');
    // Adjust @starting-style direction via data attribute
    screens[n].dataset.direction = direction;
  };

  if (document.startViewTransition) {
    document.startViewTransition(updateFn);
  } else {
    updateFn();
  }

  // Focus management
  setTimeout(() => {
    const heading = screens[n].querySelector('h1, h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  }, 320);
}
```

**View Transitions API enhancement (Chrome 111+, Safari 18+):** Wrapping the step update in `document.startViewTransition()` automatically crossfades between old and new step content. The artist preview card can persist as a shared element:

```css
#preview-phone {
  view-transition-name: artist-preview;
}
::view-transition-old(artist-preview),
::view-transition-new(artist-preview) {
  animation-duration: 300ms;
  animation-timing-function: var(--ease-decel);
}
```

This means the preview card morphs in-place while step content slides — the preview appears continuous across steps.

### 15.3 Back transition

Reverse direction — swap `28px` and `-28px`:

```css
.screen.active[data-direction="back"] {
  /* active screen enters from left */
}
@starting-style {
  .screen.active[data-direction="back"] {
    translate: -28px 0;
  }
}
.screen:not(.active)[data-direction="back"] {
  translate: 28px 0;  /* exits to right */
}
```

### 15.4 Content stagger within each step

After the step enters, content elements stagger in with 60ms intervals. Apply via CSS `animation-delay`:

```css
.screen.active h1          { animation: content-enter 220ms ease-out both; }
.screen.active .step-sub   { animation: content-enter 220ms ease-out 60ms both; }
.screen.active .step-cards > *:nth-child(1) { animation: content-enter 220ms ease-out 120ms both; }
.screen.active .step-cards > *:nth-child(2) { animation: content-enter 220ms ease-out 160ms both; }
.screen.active .step-cards > *:nth-child(3) { animation: content-enter 220ms ease-out 200ms both; }
/* ...continue +40ms per card... */

@keyframes content-enter {
  from { opacity: 0; translate: 0 6px; }
  to   { opacity: 1; translate: 0 0; }
}
```

Total step entrance (heading → last card): ≤ 400ms.

### 15.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .screen,
  .screen.active,
  .screen:not(.active) {
    transition: opacity 150ms linear !important;
    translate: 0 0 !important;
    animation: none !important;
  }
  .screen.active { opacity: 1; }
  .screen:not(.active) { opacity: 0; }
}
```

Opacity-only crossfade, 150ms, no translation. All stagger animations disabled.

### 15.4 Focus management

After a transition completes, focus must move to the screen's headline:

```js
function advanceToScreen(index) {
  // ... run transition ...
  setTimeout(() => {
    const headline = screens[index].querySelector('h1, h2');
    if (headline) {
      headline.setAttribute('tabindex', '-1');
      headline.focus();
    }
  }, 350); // after full transition duration
}
```

All screen headlines have `tabindex="-1"` applied programmatically (not in HTML).

---

## 16. Storage Behaviour

### 16.1 Draft autosave (`able_wizard_draft`)

**Write trigger:** After every screen advance (not on every keystroke). Save on the `continue` button click, before transition starts.

**Format:**

```js
{
  savedAt: Date.now(),         // unix ms timestamp
  currentScreen: 3,            // screen index user is now going TO
  state: { ...wizardState }    // full wizardState snapshot
}
```

**Write call:**

```js
localStorage.setItem('able_wizard_draft', JSON.stringify(draft));
```

**Resume check (page load):**

1. `const raw = localStorage.getItem('able_wizard_draft')`
2. If null: normal start.
3. Parse JSON. If `Date.now() - savedAt > 86_400_000` (24 hours): treat as stale, show normal start.
4. If fresh: restore `wizardState` from `draft.state`, navigate to `draft.currentScreen`, show resume banner on Screen 0 (or, if navigating directly, show a small toast: "Resuming from where you left off.").

### 16.2 Profile write (`able_v3_profile`)

Written on Screen 7 submit, before navigating to Screen 8.

**Format (maps to `able_v3_profile` key):**

```js
{
  name:          wizardState.name,
  vibe:          wizardState.vibe,
  accent:        wizardState.accent,
  theme:         wizardState.theme,
  links:         wizardState.links,
  fanCta:        wizardState.fanCta,
  stateOverride: mapMomentToState(wizardState.moment),
  releaseDate:   wizardState.releaseDate,    // ISO string or null
  streamLink:    wizardState.streamLink,
  venueName:     wizardState.venueName,
  ticketUrl:     wizardState.ticketUrl,
  slug:          wizardState.slug,
  createdAt:     Date.now(),
}
```

**`mapMomentToState` function:**

```js
function mapMomentToState(moment) {
  const map = {
    'just-dropped': 'live',
    'coming-soon':  'pre-release',
    'tonight':      'gig',
    'evergreen':    'profile',
  };
  return map[moment] || 'profile';
}
```

**Write call:**

```js
localStorage.setItem('able_v3_profile', JSON.stringify(profile));
```

### 16.3 Draft deletion

After writing `able_v3_profile`, immediately:

```js
localStorage.removeItem('able_wizard_draft');
```

### 16.4 Gig mode expiry (conditional)

If `wizardState.moment === 'tonight'`, also write:

```js
localStorage.setItem('able_gig_expires', Date.now() + 86_400_000); // +24h
```

---

## 17. Netlify Import Functions

### 17.1 Function: `spotify-import`

**Endpoint:** `/.netlify/functions/spotify-import`
**Method:** POST
**Timeout:** 8000ms client-side (use `AbortController` with 8s timeout)

**Request body:**

```json
{ "url": "https://open.spotify.com/artist/..." }
```

**Success response (HTTP 200):**

```json
{
  "name": "Phoebe Bridgers",
  "genres": ["indie folk", "chamber pop"],
  "avatarUrl": "https://...",
  "spotifyId": "1234abc"
}
```

**Error response (HTTP 4xx/5xx):**

```json
{ "error": "Could not find artist", "code": "NOT_FOUND" }
```

**Client handling:**

```js
async function runSpotifyImport(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    showImportLoading();
    const res = await fetch('/.netlify/functions/spotify-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const err = await res.json();
      showImportFailure(err.code || 'default');
      return;
    }

    const data = await res.json();
    wizardState.importedName = data.name;
    wizardState.importedGenres = data.genres;
    // Map genres to vibe slug
    wizardState.vibe = detectVibeFromGenres(data.genres);
    showImportSuccess(data.name);
    setTimeout(() => advanceToScreen(1), 800);

  } catch (e) {
    clearTimeout(timeout);
    if (e.name === 'AbortError') {
      showImportFailure('TIMEOUT');
    } else {
      showImportFailure('default');
    }
  }
}
```

**`detectVibeFromGenres` mapping:**

```js
function detectVibeFromGenres(genres) {
  const lower = genres.map(g => g.toLowerCase());
  if (lower.some(g => g.includes('electronic') || g.includes('techno') || g.includes('house') || g.includes('ambient'))) return 'electronic';
  if (lower.some(g => g.includes('hip hop') || g.includes('rap') || g.includes('r&b') || g.includes('soul') && g.includes('urban'))) return 'hiphop-rnb';
  if (lower.some(g => g.includes('folk') || g.includes('acoustic') || g.includes('singer-songwriter'))) return 'folk-acoustic';
  if (lower.some(g => g.includes('pop') && !g.includes('indie'))) return 'pop';
  if (lower.some(g => g.includes('jazz'))) return 'jazz-soul';
  if (lower.some(g => g.includes('metal') || g.includes('punk') || g.includes('hardcore'))) return 'metal-rock';
  if (lower.some(g => g.includes('indie') || g.includes('alternative') || g.includes('art rock'))) return 'indie-alt';
  return null; // no match — user picks manually
}
```

### 17.2 Function: `linktree-import`

**Endpoint:** `/.netlify/functions/linktree-import`
**Method:** POST
**Timeout:** 8000ms (same `AbortController` pattern)

**Request body:**

```json
{ "url": "https://linktr.ee/artistname" }
```

**Success response:**

```json
{
  "links": [
    { "url": "https://open.spotify.com/artist/...", "platform": "spotify", "label": "Spotify" },
    { "url": "https://instagram.com/artistname", "platform": "instagram", "label": "Instagram" }
  ]
}
```

**Error response:**

```json
{ "error": "Could not parse page", "code": "PARSE_ERROR" }
```

**Client handling:** Same pattern as Spotify import. On success, populate `wizardState.importedLinks`. Trigger both imports if URL contains both Linktree and Spotify patterns (run in parallel with `Promise.allSettled`).

**URL detection rules:**
- If URL contains `linktr.ee` or `linktree.com` → trigger `linktree-import`
- If URL contains `open.spotify.com/artist` → trigger `spotify-import`
- If URL contains `soundcloud.com` → trigger `linktree-import` (scrape the SC page for links) — same endpoint handles multiple platforms

---

## 18. Accessibility

### 18.1 Roles and ARIA

| Element | Role / Attribute |
|---|---|
| `#progress-bar` | `role="progressbar"`, `aria-valuenow="[0-7]"`, `aria-valuemin="0"`, `aria-valuemax="7"`, `aria-label="Wizard progress"` |
| Vibe card container | `role="radiogroup"`, `aria-label="Music vibe"` |
| Each vibe card | `role="radio"`, `aria-checked="true/false"`, `aria-label="[Genre name]"` |
| Theme card container | `role="radiogroup"`, `aria-label="Page theme"` |
| Each theme card | `role="radio"`, `aria-checked="true/false"`, `aria-label="[Theme name]"` |
| Fan CTA container | `role="radiogroup"`, `aria-label="Fan call to action"` |
| Each CTA card | `role="radio"`, `aria-checked="true/false"` |
| Moment container | `role="radiogroup"`, `aria-label="Current moment"` |
| Each moment card | `role="radio"`, `aria-checked="true/false"` |
| Error messages | `role="alert"`, `aria-live="assertive"` |
| Import success/failure | `role="status"` for success; `role="alert"` for failure |
| All inputs | `<label>` associated via `for`/`id` pair, or `aria-label` |
| Screen headline (on focus) | `tabindex="-1"` (set programmatically) |

### 18.2 Keyboard navigation

| Key | Behaviour |
|---|---|
| Tab | Standard DOM order. All interactive elements reachable. |
| Enter | On focused Continue/Submit button: trigger action. On focused input with valid value: trigger Continue. |
| Space | On focused `role="radio"` card: select it. |
| Arrow keys (within radiogroup) | Move selection between radio cards. |
| Escape | On preview modal (mobile): close modal. On hex input: discard and close. |

### 18.3 Colour contrast

All body text against backgrounds must meet WCAG AA (4.5:1 for text <18pt, 3:1 for text ≥18pt or bold ≥14pt).

Critical pairs to verify:
- `var(--color-muted)` on `var(--color-bg)` — passes at approximately 3.5:1 for 12px body (flagged: check at all screen sizes)
- `var(--color-text)` on `var(--color-card)` — passes at >7:1
- Button text `#ffffff` on `var(--color-accent)` (#e05242) — passes at >4.5:1 for all accent swatches except bone (#d4cfc8): bone must never be used as a button background — it is a page-accent choice only. If accent is light, button text switches to `#1a1a2e`.

**Auto text colour on CTA button:** If the selected accent is light (luminance > 0.4), set button text to `#1a1a2e` instead of `#ffffff`. Compute luminance in JS on accent change:

```js
function isLightColour(hex) {
  const [r, g, b] = hexToRgb(hex).map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4;
}
```

### 18.4 Focus visibility

All interactive elements must have a visible `:focus-visible` ring:

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

Override this for specific elements that have their own selected state (e.g. radio cards already show a border — do not double up). Use:

```css
.vibe-card:focus-visible,
.choice-card:focus-visible,
.theme-card:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### 18.5 Reduced motion

All animations must check `prefers-reduced-motion`. The global rule:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Exceptions where a minimal fade is better than no transition:
- Screen transitions: replace slide+opacity with opacity-only, 200ms (see §15.3)
- Headline entrance (Screen 8): replace scale+opacity with opacity-only, 200ms

---

## 19. Playwright Verification Checklist

Use this checklist to verify the build. Run Playwright tests using the MCP tools. All screenshots must be saved to `screenshots/onboarding/`.

### 19.1 Viewport screenshots

- [ ] Screenshot of Screen 0 at 375px width (iPhone SE)
- [ ] Screenshot of Screen 0 at 390px width (iPhone 14 Pro)
- [ ] Screenshot of Screen 0 at 768px width (iPad)
- [ ] Screenshot of Screen 0 at 1280px width (laptop)
- [ ] Screenshot of Screen 2 (vibe grid) at 375px — verify 2-column grid
- [ ] Screenshot of Screen 2 at 768px — verify 3-column grid
- [ ] Screenshot of Screen 8 at 375px and 1280px

### 19.2 Layout checks

- [ ] No horizontal scroll at 375px on any screen
- [ ] No horizontal scroll at 390px on any screen
- [ ] Right panel is sticky on 1280px — verify by scrolling Screen 5 (links) if it is tall
- [ ] Mobile preview peek is exactly 200px visible below Continue button
- [ ] Tap-to-expand preview modal opens on mobile preview tap
- [ ] Preview modal closes on "✕" tap or Escape key

### 19.3 Progress and navigation

- [ ] Progress bar advances on each Continue: 14.28% → 28.57% → 42.86% → 57.14% → 71.43% → 85.71% → 100%
- [ ] Step counter reads "Step N of 7" correctly on screens 1–7
- [ ] Back button hidden on Screen 0 and Screen 8
- [ ] Step counter hidden on Screen 0 and Screen 8
- [ ] Back navigation restores previous screen with correct values in inputs and selections

### 19.4 Screen 0 — Import

- [ ] Placeholder cycles through all 4 strings with crossfade
- [ ] Paste a valid Spotify URL → loading state visible (dots pulse in input right side)
- [ ] Mock Spotify success response → success state visible, green border, success message, auto-advances after 800ms
- [ ] Mock Spotify failure (TIMEOUT code) → amber border, correct failure copy shown
- [ ] "Start from scratch →" link visible, styled correctly (no button appearance)
- [ ] Clicking "Start from scratch →" advances to Screen 1 with empty name input
- [ ] Resume banner visible when `able_wizard_draft` in localStorage with savedAt < 24h ago
- [ ] Resume banner NOT visible when draft is stale (> 24h)

### 19.5 Screen 1 — Name

- [ ] Input is auto-focused when screen becomes active
- [ ] Continue button disabled when input is empty
- [ ] Continue button enabled when ≥1 character entered
- [ ] Enter key triggers Continue when input is valid
- [ ] Pre-fill micro-copy visible when name came from import
- [ ] Preview panel updates artist name on every keystroke

### 19.6 Screen 2 — Vibe

- [ ] All 8 cards render with correct genre name and artist examples
- [ ] "My own thing." card renders second line in correct smaller style
- [ ] Card selection applies border + scale + accent-tinted bg
- [ ] Pre-selected card (from Spotify genres) shows "matched" tag
- [ ] Selecting vibe updates accent colour in preview immediately
- [ ] Continue disabled until a card is selected

### 19.7 Screen 3 — Accent colour

- [ ] All 8 swatches visible, correct colours
- [ ] Default swatch pre-selected based on vibe choice
- [ ] Selected swatch shows white ring + accent outer ring + scale(1.1)
- [ ] Tapping a swatch immediately updates `--color-accent` on `:root` (0 frames delay)
- [ ] Preview panel reflects new accent colour immediately
- [ ] "Use my own colour →" link visible below swatches
- [ ] Tapping link reveals hex input
- [ ] Valid hex updates accent colour and adds ninth swatch
- [ ] Invalid hex shows error message with role="alert"

### 19.8 Screen 4 — Theme

- [ ] All 4 theme cards visible with correct backgrounds
- [ ] Glass card has frosted-glass appearance hint and "Backdrop blur" label
- [ ] Dark theme pre-selected on first visit
- [ ] Selecting a theme updates `data-theme` on preview content
- [ ] Light theme shows dark text in preview
- [ ] Selected card has accent border + scale

### 19.9 Screen 5 — Links

- [ ] Imported links shown with checkboxes, platform icons, truncated URLs, green badges
- [ ] Unchecking a link sets row opacity to 0.5
- [ ] "Add another link" input present
- [ ] Pasting a Spotify URL into add-link input shows platform badge after detection
- [ ] Link appears in list after paste detection
- [ ] "No links yet — that's fine." link advances screen

### 19.10 Screen 6 — Fan CTA

- [ ] All 4 choice cards render with correct icons, copy, and descriptions
- [ ] Icons are SVG outlines at 24px, muted colour
- [ ] Selecting a card turns icon to accent colour
- [ ] Selecting a card updates preview CTA button text immediately
- [ ] Trust line visible below cards
- [ ] Continue disabled until a card is selected

### 19.11 Screen 7 — Current moment

- [ ] All 4 moment cards render with correct copy and descriptions
- [ ] No card selected on first visit
- [ ] "Something's coming" selection slides in date picker
- [ ] Date picker min-date is tomorrow
- [ ] Changing date updates preview countdown badge
- [ ] "Music just dropped" selection slides in stream link input
- [ ] "Playing tonight" selection slides in venue + ticket inputs
- [ ] "Just me" shows no extra inputs
- [ ] Switching between cards closes previous extra panel and opens new one
- [ ] "Build my page →" button uses Barlow Condensed 20px weight 700
- [ ] "Build my page →" disabled until a card is selected
- [ ] Clicking "Build my page →" writes `able_v3_profile` to localStorage
- [ ] Clicking "Build my page →" deletes `able_wizard_draft` from localStorage
- [ ] `able_gig_expires` written if "Playing tonight" was selected

### 19.12 Screen 8 — Done

- [ ] Single-column layout, right panel hidden
- [ ] Headline animates in (scale 0.9→1.0, opacity 0→1, 400ms spring)
- [ ] Slug displays correctly formatted from artist name
- [ ] Pencil icon visible; clicking enters inline edit mode
- [ ] Valid slug edit accepted; invalid shows error
- [ ] Linktree conditional copy shown only when import was from Linktree
- [ ] "Go to my page →" opens `able-v7.html` in same tab
- [ ] `able-v7.html` renders correctly using the saved profile
- [ ] "Open my dashboard →" opens `admin.html` in same tab
- [ ] Copy Link button copies correct URL and shows "Copied ✓" for 2000ms
- [ ] Free tier line visible at bottom

### 19.13 Tap target sizes

Measure every interactive element using Playwright's `getBoundingClientRect()`. All must be ≥ 44×44px:

- [ ] Back button: ≥ 44×44px (padding compensates)
- [ ] Every vibe card: height ≥ 64px
- [ ] Every colour swatch: 44×44px exactly
- [ ] Every theme card: 160px height (far exceeds minimum)
- [ ] Every choice card (fan CTA, moment): 64px height
- [ ] All Continue / Submit buttons: 56px height
- [ ] "Go to my page →" button: 52px height (acceptable; primary prominence)
- [ ] "Open my dashboard →" button: 48px height
- [ ] Share row icon buttons: 40×40px (borderline — pad to 44×44 tap area with padding)
- [ ] Pencil edit icon: ≥ 44×44px tap area (use padding)

### 19.14 Storage assertions

- [ ] After advancing from Screen 1: `localStorage.getItem('able_wizard_draft')` is not null
- [ ] Stored draft contains `savedAt` within last 60 seconds
- [ ] After Screen 7 submit: `localStorage.getItem('able_v3_profile')` is not null
- [ ] After Screen 7 submit: `localStorage.getItem('able_wizard_draft')` is null
- [ ] `able_v3_profile` contains `name`, `vibe`, `accent`, `theme`, `links`, `fanCta`, `stateOverride`, `slug`

---

*End of specification.*
*A developer reading this document has everything needed to build `start.html` in its entirety.*
