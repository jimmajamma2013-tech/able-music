---
title: "Onboarding Wizard — Path to 10"
date: 2026-03-15
stage: 6A
file: start.html
current_score: 4.6/10
target_score: 9/10
---

# Onboarding Wizard — Path to 10

**Stage 6A of the ABLE build process.**

This document defines, for each of the 20 scored angles, exactly what a 10 looks like, the specific design and technical decisions required to reach it, and an honest ceiling for where we are at this stage. It is the implementation contract for the onboarding wizard rebuild.

The onboarding wizard (`start.html`) is not a sign-up form. It is the first product experience. Every decision here — copy, motion, import logic, preview architecture — either builds or erodes the artist's belief that ABLE is different. The baseline score of 4.6/10 reflects a competent form, not a product moment. The rebuild changes that.

---

## Angle 1 — First Impression

**Current score: 3/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

Within 2 seconds of landing, the artist understands: "This is going to pre-fill my page for me. I don't have to build anything from scratch." No reading required. The visual design alone communicates that this is a product, not an admin panel.

### Exact spec to get there

**Screen 0 layout — no tabs, no form chrome, no header navigation:**

```
[full viewport]
  padding: 0
  background: var(--color-bg, #0d0e1a)

  [centred column, max-width: 540px, padding: 0 24px]
    ABLE wordmark — 20px, letter-spacing 0.12em, opacity 0.5, top: 32px

    [hero block, margin-top: clamp(64px, 12vh, 100px)]
      headline: Barlow Condensed 700, 58px desktop / 44px mobile
      line-height: 1.0
      text: "Your page. Set up in 5 minutes."

      sub: DM Sans 400, 18px, opacity 0.65, margin-top: 12px
      text: "Paste your Spotify or Linktree link — we'll build the rest."

    [input block, margin-top: 32px]
      input: height 56px, border-radius 12px, font-size 16px
      border: 1.5px solid rgba(255,255,255,0.12)
      background: rgba(255,255,255,0.04)
      padding: 0 48px 0 16px (right padding holds spinner space)

      placeholder cycling (CSS only, see animation spec below)

      on focus: border-color transitions to var(--color-accent, #e05242)
                transition: border-color 200ms cubic-bezier(0.25,0.46,0.45,0.94)

    [trust line, margin-top: 12px]
      font-size: 12px, opacity: 0.45, text-align: center
      text: "No card. No catch. Your page is free."

    [scratch link, margin-top: 20px]
      font-size: 14px, opacity: 0.5, text-decoration: underline
      text: "Start from scratch →"
      cursor: pointer
```

**Placeholder cycling animation (CSS-only, no JS):**

```css
@keyframes placeholder-cycle {
  0%, 28%   { content: "linktr.ee/yourname"; opacity: 1; }
  33%, 61%  { content: "open.spotify.com/artist/..."; opacity: 1; }
  66%, 94%  { content: "soundcloud.com/yourname"; opacity: 1; }
  100%      { content: "linktr.ee/yourname"; opacity: 1; }
}
```

Implement via a sibling `<span class="placeholder-animator">` that animates while input is empty (hide it once the user starts typing via `input:not(:placeholder-shown) ~ .placeholder-animator { display: none }`).

**Split layout on desktop (≥ 768px):**
- Left: hook copy + input (50% width)
- Right: phone preview (50% width, slight right offset, `transform: rotate(2deg)` for personality, animate to `rotate(0deg)` on first load with spring easing)

The preview visible on Screen 0 — even before the artist types anything — communicates "your page exists, it just needs your name". Use an empty-state preview with copy: `Your page is taking shape.` in the hero slot.

### Honest ceiling

Screen 0 can reach 9/10 at this stage. It cannot reach 10/10 until there are real social proof quotes from real artists. A single testimonial from an artist the visitor recognises would push it to 10. Without real testimonials, the trust line and geographic proof are placeholders.

---

## Angle 2 — Primary Job

**Current score: 4/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

An artist with a Spotify profile pastes one URL, sees their name pre-filled, sees their vibe pre-selected, and understands they are 3 quick choices away from a live page. An artist without Spotify answers 7 short questions and reaches a live page in under 5 minutes. Neither flow feels like data entry.

### Exact spec to get there

**Import path (Spotify) — the happy path:**

1. Artist pastes `open.spotify.com/artist/[ID]`
2. Debounce 500ms → call `/.netlify/functions/spotify-import?id=[ID]`
3. Function returns `{ name, genres, imageUrl, followersTotal }` (or error)
4. On success: input border turns accent green (`#78c47b`) for 800ms → reverts to accent
5. Below input: `"We found Luna Serrano on Spotify ✓"` slides in (translateY: 8px → 0, opacity 0 → 1, 300ms deceleration)
6. Auto-advance to Screen 1 after 1200ms (with "Continue" button available immediately for impatient users)
7. Screen 1 name field pre-filled, cursor at end of text
8. Screen 2 vibe card pre-selected based on genre mapping (card has a `ring: 2px solid accent` to show selection)

**Import path (Linktree) — the switcher path:**

1. Artist pastes `linktr.ee/[handle]`
2. Debounce 500ms → call `/.netlify/functions/oembed-proxy?url=[encoded_url]`
3. Parse response for known platform patterns
4. On success: `"We found 6 links on your Linktree ✓"` — or exact count
5. Screen 5 becomes a confirmation view (see Angle 13 for full spec)
6. Net effect: 3 screens effectively pre-filled — name (if scraped), links, import confirmation

**Manual / scratch path:**

- "Start from scratch →" advances to Screen 1 immediately with no pre-filling
- Every screen is still fast — one question, one answer, continue
- Live preview still updates on every input — the feedback loop is intact regardless of import

**One-question-per-screen is non-negotiable:**

The single biggest contributor to "primary job" completion is removing the decision stack. Three questions per screen = cognitive cost. One question = forward momentum. The 8-screen structure is the spec; do not collapse screens for expedience.

### Honest ceiling

The primary job reaches 9/10 with Spotify import working. It cannot reach 10/10 until the Netlify functions are fully deployed and tested against real artist Spotify URLs, including edge cases: artists with no genres, artists with unusual character sets in names, artists with private Spotify profiles.

---

## Angle 3 — Copy Voice

**Current score: 3/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

Every line in the wizard sounds like it was written by an artist for artists. Labels are questions. Instructions are absent — the interface is self-explanatory. Nothing could be mistaken for generic SaaS.

### Exact copy for every screen

**Screen 0:**
- Headline: `Your page. Set up in 5 minutes.`
- Sub: `Paste your Spotify or Linktree link — we'll build the rest.`
- Trust: `No card. No catch. Your page is free.`
- Scratch: `Start from scratch →`
- Success state: `We found [Name] on Spotify ✓` / `We found [N] links on your Linktree ✓`
- Error state: `Couldn't reach Linktree — they might have links hidden. Add manually?`

**Screen 1 (Name):**
- Eyebrow: `Step 1 of 7`
- Question: `What do you go by?`
- Sub: `Your artist name, your real name — whatever you put on the poster.`
- Placeholder: `Your name here`
- CTA: `Continue →`

**Screen 2 (Vibe):**
- Eyebrow: `Step 2 of 7`
- Question: `What kind of music do you make?`
- Sub: `Sets the starting feel of your page. You can change everything later.`
- CTA: `Continue →`

**Screen 3 (Colour):**
- Eyebrow: `Step 3 of 7`
- Question: `Pick a colour that feels like you.`
- Sub: `This becomes your accent — CTAs, links, highlights.`
- Helper text (below swatches): `This is the colour your fans will tap to sign up, stream, or get tickets.`
- CTA: `Continue →`

**Screen 4 (Theme):**
- Eyebrow: `Step 4 of 7`
- Question: `How should your page feel?`
- Dark description: `Midnight black. Classic, editorial.`
- Light description: `Clean and warm. Works for stripped-back.`
- Glass description: `Your artwork bleeding through. Needs strong artwork.`
- Contrast description: `Pure black. Maximum impact.`
- CTA: `Continue →`

**Screen 5 (Links — import confirmed):**
- Eyebrow: `Step 5 of 7`
- Question: `Here's what we found.`
- Sub: `Remove anything you don't want. Add more below.`
- Empty state (no import): `Where can fans find your music?`
- Add link placeholder: `Paste a link...`
- CTA: `Continue →`

**Screen 6 (Fan Capture):**
- Eyebrow: `Step 6 of 7`
- Question: `What do you want fans to do when they land?`
- Sub: `One action. What matters most right now?`
- Choice labels (exactly as shown to the fan, not option names):
  - `Stay close.`
  - `Stay in the loop.`
  - `Hear it first.`
  - `Support me directly.`
- Trust insert (below choices, 12px, muted): `Every sign-up is yours. We can't contact your fans.`
- CTA: `Continue →`

**Screen 7 (Current Moment):**
- Eyebrow: `Step 7 of 7`
- Question: `What's happening right now?`
- Sub: `Your page shifts with your moment.`
- Choices:
  - `Just me, being an artist` (Profile mode)
  - `Something's coming` (Pre-release)
  - `Music just dropped` (Live)
  - `I'm playing tonight` (Gig mode)
- Conditional sub-inputs use plain language — see Screen 7 spec
- CTA: `Build my page →` — this is the payoff tap, not "Continue"

**Screen 8 (Done):**
- Headline: `Your page is live.`
- Sub: `ablemusic.co/[slug] — ready to share.`
- Primary CTA: `Go to my page →`
- Secondary CTA: `Open my dashboard →`
- Free tier disclosure: `Your first 100 fan sign-ups are free. After that, £9/month for unlimited.`
- Trust close: `This page costs £0. It will never charge you to exist.`
- Upgrade seed (one line, 14px, muted): `When you're ready to release something, you can put it in pre-release mode from your dashboard.`

**Banned words and patterns throughout:**
- "Get started", "You're all set", "Almost there", "Congrats", any exclamation mark
- "Content", "creator", "fanbase", "monetise", "grow", "engage"
- "Artist Name", "Genre", "Select theme", "Choose colour" — never use labels as headings

### Honest ceiling

Copy voice can reach 9/10 within this build. It cannot reach 10/10 until tested on 10 real artists across genres — what resonates with a hip-hop artist may not land for a folk artist. Iteration based on real usage is required for the final point.

---

## Angle 4 — Visual Hierarchy

**Current score: 5/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

A scanner can understand every screen without reading. There is one primary element per screen (the question or the choice grid), one secondary element (the sub text or helper), and one action (the continue button). The eye never has to choose between competing elements.

### Exact spec to get there

**Type scale (desktop):**
```
Eyebrow:  DM Sans 600, 11px, letter-spacing 0.12em, uppercase, opacity 0.45
Question: Barlow Condensed 700, 52px, line-height 1.0
Sub:      DM Sans 400, 16px, line-height 1.5, opacity 0.65
Input:    DM Sans 400, 20px, height 56px
Card:     DM Sans 600, 16px (label) + DM Sans 400, 13px (sub text)
CTA:      DM Sans 600, 16px, height 56px
```

**Type scale (mobile, ≤ 480px):**
```
Question: Barlow Condensed 700, 40px
Input:    DM Sans 400, 16px (minimum — prevents iOS zoom)
CTA:      DM Sans 600, 15px, height 56px (unchanged — always 56px)
```

**Spacing system:**
```
Screen padding:     24px horizontal (mobile), 48px (desktop)
Question to sub:    12px gap
Sub to input/cards: 28px gap
Cards to CTA:       32px gap
Progress bar:       fixed, top: 0, height: 3px (not 2px — 3px is more visible at 375px)
```

**Progress bar (top of viewport, always visible):**
```css
.progress-bar {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  width: 0%;
  background: var(--color-accent);
  transition: width 400ms cubic-bezier(0.34,1.56,0.64,1);
  z-index: 100;
}
```
Screen percentages: 0 (Screen 0), 14% (S1), 28% (S2), 43% (S3), 57% (S4), 71% (S5), 85% (S6), 100% (S7), stays 100% on Done.

**Grid layouts:**
- Vibe cards: `grid-template-columns: repeat(3, 1fr)` desktop / `repeat(2, 1fr)` mobile
- Theme cards: `grid-template-columns: repeat(2, 1fr)` always
- Fan capture choices: `grid-template-columns: 1fr` always (stacked — these are action choices, not visual picks)
- Current moment choices: `grid-template-columns: 1fr` always

### Honest ceiling

Visual hierarchy can reach 9/10 within this build. The ceiling is the live preview — when both columns are visible on desktop, the question column and the preview column compete at some screens. This is acceptable (the preview always defers to the question) but a 10/10 layout would require user testing to confirm.

---

## Angle 5 — CTA Clarity

**Current score: 5/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

On every screen, there is exactly one primary action. Its label exactly matches what happens next. The button is physically large enough to never miss on mobile. Screen 7's CTA feels ceremonial — this is the moment the artist has been building to.

### Exact spec to get there

**Button spec (all Continue buttons, Screens 1–6):**
```css
.btn-continue {
  width: 100%;
  height: 56px;
  border-radius: 12px;
  background: var(--color-accent);
  color: #fff;
  font: 600 16px/1 'DM Sans', sans-serif;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  transition: transform 120ms cubic-bezier(0.34,1.56,0.64,1),
              opacity 120ms ease;
}
.btn-continue:hover  { transform: scale(1.02); }
.btn-continue:active { transform: scale(0.97); opacity: 0.9; }
```

Desktop: `max-width: 360px; margin: 0 auto; display: block;`
Mobile (≤ 480px): `width: 100%; max-width: none;`

**Screen 7 CTA (the payoff):**
- Label: `Build my page →`
- Same dimensions as above
- On tap: button text changes to a subtle loading state: `Building...` with a CSS spinner (2px wide, 16px diameter, same accent colour, spins at 600ms)
- After 1.5s (or actual completion): advances to Screen 8

**Screen 8 primary CTA:**
```css
.btn-live {
  height: 64px;   /* bigger on the Done screen — this is the most important tap */
  border-radius: 14px;
  font-size: 18px;
}
```
- Label: `Go to my page →`
- Background: accent colour
- Opens `able-v7.html` in the same tab (not a new tab — the artist's journey continues there)

**Screen 8 secondary CTA:**
```css
.btn-dashboard {
  height: 56px;
  border-radius: 12px;
  background: rgba(255,255,255,0.07);
  border: 1.5px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.8);
  font: 600 15px/1 'DM Sans', sans-serif;
}
```
- Label: `Open my dashboard →`
- Opens `admin.html`

**Back button (Screens 1–7):**
```css
.btn-back {
  position: absolute;
  top: 20px; left: 20px;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  font: 500 13px/1 'DM Sans', sans-serif;
  opacity: 0.7;
  cursor: pointer;
}
.btn-back:hover { opacity: 1; }
```

### Honest ceiling

CTA clarity can reach 9/10. The Screen 7 "Build my page →" button is the emotional peak of the wizard — its ceremony depends entirely on the animation quality (Angle 16). Without the loading animation and screen transition, it reads as just another Continue.

---

## Angle 6 — Fear Resolution

**Current score: 3/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

Every named fear — "how long is this?", "will they charge me?", "will it look good?" — is resolved before the artist can voice it. Trust language is specific and placed at the exact moment the fear would arise, not buried in footer copy.

### Exact spec to get there

**Fear 1: "How long is this?" — resolved at Screen 0**

The input is the only action on Screen 0. No form. No multi-field horror. The sub text says "5 minutes" explicitly. The progress eyebrow on Screen 1 says `Step 1 of 7` — they know the total immediately.

Do not ever use a generic progress bar without a number. `Step 3 of 7` is specific and honest. A bare progress bar is vague and breeds anxiety.

**Fear 2: "Will they ask for my card?" — resolved at Screen 0**

Trust line placement: immediately below the input, not below the fold.
```html
<p class="trust-line">No card. No catch. Your page is free.</p>
```
```css
.trust-line {
  font-size: 12px;
  text-align: center;
  opacity: 0.45;
  margin-top: 10px;
  letter-spacing: 0.01em;
}
```
This line must never be removed for any layout reason. It is load-bearing.

**Fear 3: "Will it look bad?" — resolved by the live preview**

The live preview (right column desktop, top peek mobile) is the primary fear-resolution mechanism. An artist who can see their page building cannot simultaneously fear that it will look bad. This is why the live preview is P0, not P1.

Preview empty state copy: `Your page is taking shape.` — not "preview will appear here". The first phrase implies something real is forming; the second implies a placeholder.

**Fear 4: "Will they contact my fans without asking?" — resolved at Screen 6**

Insert below the fan capture choices, before the Continue button:
```html
<p class="fan-trust">Every sign-up is yours. We can't contact your fans.</p>
```
```css
.fan-trust {
  font-size: 12px;
  opacity: 0.45;
  text-align: center;
  margin-top: 16px;
}
```

**Fear 5: "What if I want to change this later?" — resolved at Screen 2**

The sub text `"You can change everything later."` is not a throwaway line. It is anti-abandonment copy. Include it specifically on Screen 2 (vibe — this is the most "permanent-feeling" choice) and Screen 4 (theme).

**Fear 6: "This will cost money once I'm in" — resolved at Screen 8**

Done screen bottom line:
```html
<p class="free-forever">This page costs £0. It will never charge you to exist.</p>
```
Plus the honest free tier disclosure: `Your first 100 fan sign-ups are free. After that, £9/month for unlimited.`

This specificity is more reassuring than "free forever" — because it names the ceiling and the cost clearly. An artist who knows the terms can relax.

**Implementation note — what NOT to do:**

Do not add a popup/modal/overlay at any point in the flow for consent, cookies, or terms. Defer all legal copy to the Done screen footer. Any mid-flow interruption raises the abandonment risk.

### Honest ceiling

Fear resolution can reach 9/10. It cannot reach 10/10 until the Spotify import is live and working reliably — because "will it look good?" is fully resolved only when the artist sees their own name and artwork pre-filled. Until then, the live preview with empty-state copy does the job imperfectly.

---

## Angle 7 — Mobile Experience

**Current score: 5/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

Every tap target is reachable with a thumb. No horizontal scroll at 375px. The iOS keyboard does not cover the active input. The live preview is visible but does not dominate — it's context, not competition.

### Exact spec to get there

**Layout breakpoint: 768px**

At ≥ 768px: two-column layout (question left, preview right, 50/50 split with 32px gap).
At < 768px: single column. Preview collapses to a `200px`-height peek at the top, above the question block. Preview is `position: sticky; top: 0; z-index: 10; overflow: hidden;`.

**Preview on mobile:**
```css
@media (max-width: 767px) {
  .preview-panel {
    height: 200px;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 10;
    /* Fade out the bottom to suggest more is there */
    -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
    mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  }
}
```

**Tap targets — minimum specs:**
```
All choice cards (vibe, theme, fan capture, current moment): min-height 64px
Continue button: height 56px, width 100%
Back button: height 36px, min-width 48px (smaller is acceptable here — not a primary action)
Colour swatches: 48px × 48px each, 8px gap
```

**Vibe grid on mobile:**
```css
@media (max-width: 767px) {
  .vibe-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  /* 7 items = 3 rows of 2 + 1 full-width "Other" card */
  .vibe-card:last-child {
    grid-column: 1 / -1;
  }
}
```

**iOS keyboard handling:**

When any text input receives focus:
```javascript
input.addEventListener('focus', () => {
  // Give iOS a moment to raise the keyboard, then scroll input into view
  setTimeout(() => {
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 300);
});
```

Additionally: `font-size: 16px` on all inputs is mandatory. iOS zooms the viewport for any input smaller than 16px, which breaks the layout.

**No horizontal scroll:**
- All content uses `box-sizing: border-box` and `max-width: 100%`
- The preview `<div>` must never exceed viewport width. Use `width: min(390px, 100%)` for the phone mock.
- Audit at 375px after every layout change.

**Orientation change:**
On `orientationchange`, recalculate preview height and progress bar position. No hard-coded pixel values that assume portrait orientation.

### Honest ceiling

Mobile experience can reach 9/10. It cannot reach 10/10 without testing on physical iOS and Android devices — specifically iPhone 13 mini (375px), iPhone 15 Pro Max (430px), and a mid-range Android at 360px. Simulator testing will miss iOS-specific scroll bounce and keyboard behaviour.

---

## Angle 8 — Performance

**Current score: 6/10**
**Priority: P2**
**Target score: 8/10**

### What a 10 looks like (and why we're targeting 8)

The page loads in under 1 second on a 4G connection. The import API call never blocks the UI. The live preview updates without any jank. There are no unnecessary network requests during the wizard.

A true 10/10 requires backend infrastructure (CDN, edge functions) that is out of scope at this stage. 8/10 is the honest achievable target.

### Exact spec to get there

**Font loading (already in place — preserve):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Barlow+Condensed:wght@700&display=swap" rel="stylesheet">
```
`display=swap` is correct — text renders immediately with fallback, swaps when font loads.

**Import API call pattern (non-blocking):**
```javascript
async function detectAndImport(url) {
  const input = document.querySelector('.url-input');
  const spinner = document.querySelector('.input-spinner');

  // Show spinner in input (right side)
  spinner.style.display = 'block';
  input.style.paddingRight = '48px';

  try {
    const result = await fetchWithTimeout(importEndpoint, { timeout: 5000 });
    showImportSuccess(result);
  } catch (err) {
    showImportError(err.type); // specific error types: 'timeout', 'notfound', 'blocked'
  } finally {
    spinner.style.display = 'none';
    input.style.paddingRight = '16px';
  }
}

function fetchWithTimeout(url, { timeout = 5000 } = {}) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => setTimeout(() => reject({ type: 'timeout' }), timeout))
  ]);
}
```

Never use a full-page loader. The spinner lives inside the input field. The rest of the UI remains interactive.

**Live preview performance:**

The preview must use CSS custom properties only — no DOM diffing, no React-style reconciliation. Each wizard answer maps to a CSS variable or a direct `textContent` update:

```javascript
function updatePreview(field, value) {
  const preview = document.querySelector('.preview-root');
  switch(field) {
    case 'name':    preview.querySelector('.preview-name').textContent = value; break;
    case 'accent':  preview.style.setProperty('--color-accent', value); break;
    case 'theme':   preview.className = `preview-root theme-${value}`; break;
    case 'vibe':    preview.style.setProperty('--color-accent', VIBE_ACCENTS[value]); break;
    case 'cta':     preview.querySelector('.preview-cta').textContent = value; break;
  }
}
```

Debounce text inputs at 150ms (not more — the preview must feel live). Card selections update immediately (0ms debounce — they're already instantaneous).

**No additional network requests during the wizard** after the initial import call. All preview updates are local DOM manipulation.

### Honest ceiling

8/10. A true 10 requires real CDN, optimised Netlify function cold-start times, and potentially Supabase edge functions. Not in scope for this stage.

---

## Angle 9 — Emotional Resonance

**Current score: 3/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

At least once during the flow, the artist thinks "they get me." This is the ABLE equivalent of the iPhone "slide to unlock" moment — a small action that produces a disproportionately satisfying result. Two specific candidates exist: the Spotify import recognition moment, and the live preview first update.

### Exact spec to get there

**The Spotify import moment — design it for delight:**

When `spotify-import` returns successfully, the success message is not just text. It has ceremony:

```javascript
function showSpotifySuccess(data) {
  const el = document.querySelector('.import-result');

  // If avatar available, show it
  if (data.imageUrl) {
    el.innerHTML = `
      <img src="${data.imageUrl}" alt="" class="import-avatar" width="32" height="32">
      <span class="import-text">We found <strong>${data.name}</strong> on Spotify ✓</span>
    `;
  } else {
    el.innerHTML = `<span class="import-text">We found <strong>${data.name}</strong> on Spotify ✓</span>`;
  }

  // Entrance animation
  el.style.transform = 'translateY(8px)';
  el.style.opacity = '0';
  el.offsetHeight; // force reflow
  el.style.transition = 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), opacity 250ms ease';
  el.style.transform = 'translateY(0)';
  el.style.opacity = '1';
}
```

```css
.import-avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.import-result {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-top: 12px;
  padding: 10px 14px;
  background: rgba(120, 196, 123, 0.1);
  border: 1px solid rgba(120, 196, 123, 0.25);
  border-radius: 8px;
}
```

The avatar from Spotify appearing in a small circle next to the success text is the "oh wow" moment. This is what makes the import feel real, not functional.

**The vibe card moment — seeing your peers:**

Under each vibe card, the example artist names must be real and current. The moment an artist sees "Wet Leg, Yard Act, The Smile" under Indie/Alternative and thinks "yes, that's me" — that is emotional resonance. The names are doing work.

Typography for example names:
```css
.vibe-examples {
  font-size: 11px;
  opacity: 0.5;
  line-height: 1.4;
  margin-top: 4px;
}
```

Vibe cards with full example artist lists:
- Indie / Alternative: Wet Leg, Yard Act, The Smile
- Electronic / Club: Four Tet, Floating Points, Peggy Gou
- Hip-Hop / R&B: Little Simz, Kojey Radical, Knucks
- Folk / Acoustic: Phoebe Bridgers, First Aid Kit, Nick Mulvey
- Pop: Charli XCX, Beabadoobee, Rina Sawayama
- Jazz / Soul: Ezra Collective, Celeste, Alfa Mist
- Metal / Rock: Spiritbox, Sleep Token, Loathe

**The live preview first update — the page responding to them:**

When the artist types the first letter of their name on Screen 1, the preview name updates immediately. This is the first moment the preview becomes "theirs" rather than a generic demo. Add a micro-animation to make it felt:

```javascript
function updatePreviewName(name) {
  const nameEl = preview.querySelector('.preview-name');
  nameEl.textContent = name || 'Your name';

  // Micro-pulse to draw attention to the update
  nameEl.style.transition = 'none';
  nameEl.style.opacity = '0.6';
  nameEl.offsetHeight;
  nameEl.style.transition = 'opacity 200ms ease';
  nameEl.style.opacity = '1';
}
```

**Screen 8 — the payoff must be explicit:**

`Your page is live.` in 60px Barlow Condensed, spring entrance (`scale(0.9) → scale(1.0)`, 400ms spring easing). The URL `ablemusic.co/[slug]` below it in 18px. The artist sees their URL for the first time. That is the emotional payoff. Do not bury it.

### Honest ceiling

Emotional resonance can reach 9/10. It cannot reach 10/10 until the Spotify avatar import is live with real data. The avatar is the highest-resonance element — seeing your own face in a music product for the first time is different from seeing your name. That last point requires the backend to be reliable.

---

## Angle 10 — The "13-Year-Old" Test

**Current score: 5/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

A non-technical 19-year-old artist with no product experience completes the wizard without confusion. No jargon. Every choice is self-evident because they can see the result immediately.

### Exact spec to get there

**Jargon elimination checklist:**

- "Accent colour" → never use this phrase. The screen says `Pick a colour that feels like you.` and the preview shows the colour on the CTA button. The artist doesn't need to know the word "accent".
- "Theme" → the screen says `How should your page feel?` The four cards show visual previews, not swatches. The artist chooses by seeing, not by reading a technical label.
- "Campaign state" → never use this phrase anywhere in onboarding. Screen 7 says `What's happening right now?` — it's temporal, not technical.
- "CTA" → never in copy. Screen 6 says `What do you want fans to do when they land?`
- "localStorage", "sessionStorage", "slug" → the slug is presented as `ablemusic.co/[their-name]` with an inline edit field. Never expose the word "slug".

**The Linktree import confirmation — concrete and human:**

When links are imported, show them with platform icons and plain labels:

```
Spotify          [green Spotify icon]
Apple Music      [pink Apple Music icon]
Instagram        [purple gradient Instagram icon]
YouTube          [red YouTube icon]
[Remove]         on each row (text button, right side)
```

Not: `{ type: "spotify", url: "...", platform: "spotify" }` — never show data structure.

**Colour swatch — show the result, not the concept:**

Below the colour swatches, the preview phone updates in real time. A non-technical artist who sees their CTA button change colour doesn't need to know what "accent" means. The preview is the teacher.

**Screen 7 conditional inputs — use natural language:**

When "Something's coming" is selected:
```
When?  [date picker — inline, large, touch-friendly]
```
Not: `Release date:` — too formal.

When "Music just dropped" is selected:
```
Where can people hear it?  [URL input]
```
Not: `Track URL:`.

When "I'm playing tonight" is selected:
```
Where?  [text input, optional]
What time?  [time input, optional]
```

These appear via a smooth slide-in (height 0 → auto, opacity 0 → 1, 250ms deceleration). No new screen. No scroll required.

### Honest ceiling

This angle can reach 9/10 within this build. The last point requires user testing with actual non-technical artists. It is possible that specific wording that seems natural to the builder is still confusing in practice.

---

## Angle 11 — Trust Signals

**Current score: 3/10**
**Priority: P0**
**Target score: 8/10**

### What a 10 looks like (and why we're targeting 8)

The artist never has to wonder about pricing, data, or whether ABLE will disappear. Every trust signal is specific, not generic. A true 10/10 requires real social proof from real artists — which doesn't exist yet. 8/10 is the honest achievable target at this stage.

### Exact spec to get there

**Trust signals by placement:**

Screen 0 (pricing fear):
```html
<p class="trust-line">No card. No catch. Your page is free.</p>
```
Position: immediately below the input. Never move this.

Screen 6 (data fear):
```html
<p class="fan-trust">Every sign-up is yours. We can't contact your fans.</p>
```
Position: below the four choices, above the Continue button.

Screen 8 (pricing ceiling):
```html
<p class="free-tier">Your first 100 fan sign-ups are free. After that, £9/month for unlimited.</p>
<p class="free-forever">This page costs £0. It will never charge you to exist.</p>
```
Position: below the share section, above the legal footnote.

**Social proof placeholder (until real quotes exist):**

Screen 0, below the trust line, small and subdued:
```html
<p class="geo-proof">Used by independent artists in London, Manchester, Glasgow, Barcelona, Bogotá.</p>
```
```css
.geo-proof {
  font-size: 11px;
  opacity: 0.35;
  text-align: center;
  margin-top: 6px;
  letter-spacing: 0.01em;
}
```

This is honest (if true — confirm geographic spread before publishing). It is specific without being fabricated.

Screen 8 (launch count — once data exists):
```html
<p class="launch-count">[N] artists launched their ABLE page this week.</p>
```
Start showing this once N ≥ 10. Before that, omit it — an empty counter is worse than no counter.

**No fake trust signals:**
- Do not add logos of platforms "as seen in" unless ABLE has actually been covered
- Do not add "★★★★★ 4.9/5 from 2 reviews" type copy
- Do not use generic "Trusted by thousands" — this is immediately detected as hollow

**Explicit data commitment (Screen 5, fan capture section):**
The phrase `We can't contact your fans.` is load-bearing. It is not "we won't" (a policy that could change) but "we can't" (an architectural claim). This should be technically true — ABLE should never hold fan email addresses in a way that allows ABLE-initiated broadcast. When Supabase is added, this claim must be verifiable in the schema.

### Honest ceiling

8/10. The path to 9/10 requires one real, named testimonial from a real artist who can be linked. The path to 10/10 requires 3–5 testimonials across genres. Neither exists at this stage.

---

## Angle 12 — Cross-Page Coherence

**Current score: 5/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

The artist who completes onboarding lands on `able-v7.html` and recognises it immediately. The page looks exactly like the preview they were watching throughout the wizard. The dashboard (`admin.html`) uses the same tone, the same terminology, and extends the same sense of calm competence.

### Exact spec to get there

**Shared CSS variables — the preview must use the same token system as `able-v7.html`:**

The preview panel in `start.html` is not a mock — it is a reduced version of the actual profile page. It must import the same CSS custom properties:

```css
/* In start.html, preview root element */
.preview-root {
  --color-bg: #0d0e1a;
  --color-card: #12152a;
  --color-accent: #e05242;  /* overridden per artist choice */
  --font: 'DM Sans', sans-serif;
  --font-display: 'Barlow Condensed', sans-serif;
}
```

When the artist picks an accent or theme, these variables update. When they open `able-v7.html`, it reads the same values from `localStorage` → the page looks identical to the preview.

**localStorage flush on Screen 7 submission:**

```javascript
function finishOnboarding(data) {
  const profile = {
    name: data.name,
    vibe: data.vibe,
    accent: data.accent,
    theme: data.theme,
    links: data.links,
    fanCta: data.fanCta,
    stateOverride: data.currentMoment,
    releaseDate: data.releaseDate || null,
    trackUrl: data.trackUrl || null,
    gigVenue: data.gigVenue || null,
    gigTime: data.gigTime || null,
    slug: data.slug,
    createdAt: Date.now()
  };
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));

  // Clear session storage (wizard answers)
  sessionStorage.removeItem('able_wizard_draft');

  // Advance to Screen 8
  showScreen(8);
}
```

**Terminology consistency — wizard → dashboard:**

| Wizard phrase | Dashboard equivalent |
|---|---|
| `What's happening right now?` | `Campaign HQ` (the section in admin) |
| `Something's coming` | `Pre-release` state in Campaign HQ |
| `Music just dropped` | `Live` state in Campaign HQ |
| `I'm playing tonight` | `Gig mode` toggle in Campaign HQ |
| `What do you want fans to do?` | `Fan capture CTA` in admin |

The wizard introduces these concepts in plain language. The dashboard names them slightly more formally — but the connection must be recognisable. When the artist opens admin.html for the first time, they should see "Campaign HQ" and immediately map it to the "What's happening right now?" question they just answered.

**Screen 8 language — sets expectation for dashboard:**

`When you're ready to release something, you can put it in pre-release mode from your dashboard.` — this sentence explicitly tells the artist that the dashboard is where they manage campaign states. It seeds the admin.html journey.

### Honest ceiling

Cross-page coherence can reach 9/10 within this build. The last point requires `able-v7.html` and `admin.html` to have been updated to consume the same `able_v3_profile` structure that the new wizard writes. If either page reads legacy keys or ignores new fields, the coherence breaks.

---

## Angle 13 — The Switcher Path

**Current score: 3/10**
**Priority: P0**
**Target score: 9/10**

### What a 10 looks like

A Linktree user pastes their URL on Screen 0, sees their links imported with platform badges, and understands within 30 seconds that their ABLE page will be better than their Linktree page — not just equivalent, but better. They do not need to believe ABLE's marketing claims; they can see the evidence.

### Exact spec to get there

**URL detection — Linktree pattern:**
```javascript
function detectUrlType(url) {
  if (/open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/.test(url)) {
    return { type: 'spotify', id: url.match(/artist\/([a-zA-Z0-9]+)/)[1] };
  }
  if (/linktr\.ee\/(.+)/.test(url)) {
    return { type: 'linktree', handle: url.match(/linktr\.ee\/(.+)/)[1] };
  }
  if (/soundcloud\.com\/(.+)/.test(url)) {
    return { type: 'soundcloud', handle: url.match(/soundcloud\.com\/(.+)/)[1] };
  }
  if (/youtube\.com\/@(.+)/.test(url)) {
    return { type: 'youtube', handle: url.match(/@(.+)/)[1] };
  }
  return { type: 'custom', url };
}
```

**Linktree import function call:**
```javascript
async function importLinktree(handle) {
  const encodedUrl = encodeURIComponent(`https://linktr.ee/${handle}`);
  const res = await fetchWithTimeout(`/.netlify/functions/oembed-proxy?url=${encodedUrl}`);
  const data = await res.json();
  return parseLinksList(data.html || data.content || '');
}

function parseLinksList(html) {
  const patterns = [
    { regex: /open\.spotify\.com\/artist/, type: 'spotify', label: 'Spotify' },
    { regex: /music\.apple\.com/, type: 'apple-music', label: 'Apple Music' },
    { regex: /youtube\.com\/(channel|@)/, type: 'youtube', label: 'YouTube' },
    { regex: /soundcloud\.com/, type: 'soundcloud', label: 'SoundCloud' },
    { regex: /bandcamp\.com/, type: 'bandcamp', label: 'Bandcamp' },
    { regex: /instagram\.com/, type: 'instagram', label: 'Instagram' },
    { regex: /tiktok\.com\/@/, type: 'tiktok', label: 'TikTok' },
  ];
  const urls = [...html.matchAll(/https?:\/\/[^\s"'<>]+/g)].map(m => m[0]);
  return urls.map(url => {
    const match = patterns.find(p => p.regex.test(url));
    return match ? { type: match.type, url, label: match.label } : { type: 'custom', url, label: 'Link' };
  }).filter((v, i, a) => a.findIndex(t => t.url === v.url) === i); // dedupe
}
```

**Screen 5 — import confirmation UI (switcher flow):**

```html
<div class="import-confirm">
  <p class="import-intro">Here's what we found on your Linktree.</p>
  <ul class="import-list">
    <!-- One row per detected link -->
    <li class="import-row">
      <span class="platform-icon platform-spotify"></span>
      <span class="import-label">Spotify</span>
      <button class="import-remove" aria-label="Remove Spotify link">Remove</button>
    </li>
    <!-- etc -->
  </ul>
  <p class="import-add-more">Add more links below.</p>
  <!-- Same URL paste input for additional links -->
</div>
```

```css
.import-row {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
  padding: 0 16px;
  background: rgba(255,255,255,0.04);
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.08);
  margin-bottom: 8px;
}
.import-remove {
  margin-left: auto;
  font-size: 12px;
  opacity: 0.45;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}
.import-remove:hover { opacity: 0.9; color: #e05242; }
```

**The switcher value message — the line that does the work:**

On Screen 5 (import confirmation), below the links list, a single line:
```html
<p class="switcher-hook">Your Linktree links are already here. Your new page does more with them.</p>
```

```css
.switcher-hook {
  font-size: 13px;
  opacity: 0.55;
  margin-top: 16px;
  line-height: 1.5;
}
```

This is not marketing copy. It is a factual statement of the product's advantage over Linktree — campaign states, fan capture, live previews — positioned at the exact moment the switcher has seen the import working. Do not oversell. Let the live preview do the heavy lifting.

**Failure state (blocked or private Linktree):**

```html
<div class="import-error">
  <p>We couldn't read your Linktree — links might be private or hidden.</p>
  <p><a href="#" class="add-manually">Add them manually →</a></p>
</div>
```

Never fail silently. Never show a generic error. Always offer the manual path immediately.

### Honest ceiling

The switcher path can reach 9/10 if the Linktree oembed-proxy returns parseable HTML. It cannot reach 10/10 because Linktree actively obstructs scraping — the import success rate will not be 100%. The failure state handling must be excellent to compensate. When the import fails, the manual path must be frictionless.

---

## Angle 14 — Social Proof

**Current score: 1/10**
**Priority: P2**
**Target score: 6/10**

### What a 10 looks like (and why we're targeting 6)

Named testimonials from recognisable artists, with links to their live ABLE pages. A launch counter that shows real numbers. Artist photos in the Done screen's "You're in." moment. None of this exists yet, and fabricating it is worse than omitting it. 6/10 is the honest achievable target at launch.

### Exact spec to get there

**Phase 1 (now — before any real proof):**

Geographic social proof on Screen 0:
```html
<p class="geo-proof">Independent artists in London, Manchester, Glasgow, Barcelona, Bogotá.</p>
```

This is the minimum. It is honest if true. It implies community without fabricating testimonials.

**Phase 2 (once 10+ artists are live and have consented to be named):**

Add to Screen 0 a single rotating quote:
```html
<div class="proof-quote">
  <img src="[avatar]" alt="" class="proof-avatar" width="32" height="32">
  <blockquote>"[Direct, specific quote about the import or the live preview moment.]"</blockquote>
  <cite>— [Name], [genre], [city]</cite>
</div>
```

Requirements for any testimonial included:
- Must be a real, named artist
- Quote must be specific (not "ABLE is great" — something about what changed for them)
- Must link to their live ABLE page

**Screen 8 launch counter (once data exists):**

```html
<p class="launch-count" id="launch-count"></p>
```

```javascript
// Only show if count >= 10
if (weeklyLaunches >= 10) {
  document.getElementById('launch-count').textContent =
    `${weeklyLaunches} artists launched their ABLE page this week.`;
}
```

### Honest ceiling

6/10 at launch. 8/10 once the first cohort of real artist testimonials exists. The path to 9/10 requires ongoing curation of testimonials as the product evolves — this is a content job, not a build job.

---

## Angle 15 — Accessibility

**Current score: 6/10**
**Priority: P2**
**Target score: 8/10**

### What a 10 looks like

Full keyboard navigation. Screen reader announces every state change. WCAG AA contrast on all text. All interactive elements have accessible names.

### Exact spec to get there

**Choice cards (vibe, theme, fan capture, current moment) — radio group pattern:**

```html
<div role="radiogroup" aria-labelledby="screen-question-2" class="vibe-grid">
  <div role="radio"
       aria-checked="false"
       tabindex="0"
       class="vibe-card"
       data-vibe="indie"
       onkeydown="handleCardKeydown(event)">
    <span class="vibe-label">Indie / Alternative</span>
    <span class="vibe-examples">Wet Leg, Yard Act, The Smile</span>
  </div>
  <!-- etc -->
</div>
```

```javascript
function handleCardKeydown(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    e.currentTarget.click();
  }
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    focusNextCard(e.currentTarget);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    focusPrevCard(e.currentTarget);
  }
}
```

When a card is selected, update `aria-checked="true"` on the selected card and `aria-checked="false"` on all others.

**Progress bar:**
```html
<div role="progressbar"
     aria-valuemin="0"
     aria-valuemax="100"
     aria-valuenow="28"
     aria-label="Setup progress"
     class="progress-bar">
</div>
```

Update `aria-valuenow` on each screen transition.

**Error states:**
```html
<div role="alert" aria-live="polite" class="import-error" id="import-error">
  <!-- Content injected by JS when error occurs -->
</div>
```

The `role="alert"` with `aria-live="polite"` causes screen readers to announce the error as soon as it appears. Always use `polite` not `assertive` — `assertive` interrupts mid-sentence, which is worse.

**Contrast ratios:**

| Element | Background | Text colour | Ratio | WCAG AA |
|---|---|---|---|---|
| Question text | #0d0e1a | #ffffff | 18.1:1 | Pass |
| Sub text (opacity 0.65) | #0d0e1a | rgba(255,255,255,0.65) = ~#a7a8b8 | 8.2:1 | Pass |
| Trust line (opacity 0.45) | #0d0e1a | rgba(255,255,255,0.45) = ~#757689 | 5.1:1 | Pass (AA large text, fail AA small) |
| Vibe card label | #12152a | #ffffff | 14.8:1 | Pass |
| CTA button (accent #e05242) | #e05242 | #ffffff | 3.8:1 | Fail AA (3.9 required) |

**The CTA button contrast issue** — #e05242 on white text fails WCAG AA by a small margin. Two options:
1. Darken the default accent slightly: `#d44332` → ratio 4.6:1 → Pass
2. Use dark text on the button when accent is a light colour

Implement option 1 for the default accent. When artist selects a custom light accent (e.g. pale yellow), switch button text to `#1a1a2e` (dark navy) automatically:

```javascript
function getContrastTextColor(hexAccent) {
  // Convert hex to luminance
  const lum = getLuminance(hexAccent);
  return lum > 0.4 ? '#1a1a2e' : '#ffffff';
}
```

**Focus rings:**
```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 4px;
}
```

**Form inputs:**
Every input needs either a `<label>` element (preferred) or an `aria-label`. The question heading `<h2>` is not sufficient — it needs to be explicitly associated:

```html
<label id="name-label" for="name-input" class="visually-hidden">Artist name</label>
<input id="name-input" aria-labelledby="name-label screen-question-1" type="text" ...>
```

`.visually-hidden` is the standard clip pattern:
```css
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

### Honest ceiling

8/10. A true 10/10 requires testing with VoiceOver (iOS and macOS) and NVDA (Windows), which is out of scope for this build stage. The spec above will produce a well-structured, WCAG AA-compliant baseline.

---

## Angle 16 — Animation Quality

**Current score: 6/10**
**Priority: P2**
**Target score: 9/10**

### What a 10 looks like

Every animation serves communication. The spring easing makes interactions feel physical. Nothing loops or distracts. The "Build my page →" submission moment is the most ceremonial animation in the wizard.

### Exact spec to get there

**Screen transition (existing — preserve and refine):**

```css
/* Entering screen (forward) */
.screen-enter {
  animation: screen-enter-forward 350ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
}
@keyframes screen-enter-forward {
  from { transform: translateX(40px); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}

/* Entering screen (back) */
.screen-enter-back {
  animation: screen-enter-back 350ms cubic-bezier(0.25,0.46,0.45,0.94) forwards;
}
@keyframes screen-enter-back {
  from { transform: translateX(-40px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
```

The 40px offset (not 100%) prevents the screen from feeling like a full page slide — this is a drawer, not a page flip.

**Preview pulse on update:**

```javascript
function pulsePreview() {
  const preview = document.querySelector('.preview-root');
  preview.style.transition = 'none';
  preview.style.transform = 'scale(0.98)';
  preview.offsetHeight; // force reflow
  preview.style.transition = 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)';
  preview.style.transform = 'scale(1.0)';
}
```

Call `pulsePreview()` whenever any value updates. The scale is subtle (0.98 → 1.0, not 0.9 → 1.0) — barely visible consciously, but felt.

**Vibe card selection:**

```javascript
function selectVibeCard(card) {
  // Deselect all
  document.querySelectorAll('.vibe-card').forEach(c => {
    c.classList.remove('selected');
    c.setAttribute('aria-checked', 'false');
  });
  // Select this one
  card.classList.add('selected');
  card.setAttribute('aria-checked', 'true');

  // Bounce
  card.style.transition = 'none';
  card.style.transform = 'scale(0.95)';
  card.offsetHeight;
  card.style.transition = 'transform 350ms cubic-bezier(0.34,1.56,0.64,1)';
  card.style.transform = 'scale(1.0)';
}
```

```css
.vibe-card.selected {
  border-color: var(--color-accent);
  background: rgba(var(--accent-rgb), 0.08);
}
.vibe-card.selected::after {
  content: '✓';
  position: absolute;
  top: 8px; right: 10px;
  font-size: 14px;
  color: var(--color-accent);
  animation: checkmark-pop 300ms cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes checkmark-pop {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}
```

**Colour swatch selection:**

Same checkmark-pop animation as vibe cards. Swatch grows slightly on selection:

```css
.swatch.selected {
  transform: scale(1.15);
  box-shadow: 0 0 0 3px var(--color-bg), 0 0 0 5px var(--color-accent);
  transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1),
              box-shadow 200ms ease;
}
```

**Screen 8 entrance — the payoff:**

```css
.done-headline {
  animation: done-entrance 500ms cubic-bezier(0.34,1.56,0.64,1) both;
  animation-delay: 100ms;
}
@keyframes done-entrance {
  from { transform: scale(0.88); opacity: 0; }
  to   { transform: scale(1.0);  opacity: 1; }
}

.done-url {
  animation: done-entrance 400ms cubic-bezier(0.34,1.56,0.64,1) both;
  animation-delay: 250ms;
}

.done-ctas {
  animation: slide-up 350ms cubic-bezier(0.25,0.46,0.45,0.94) both;
  animation-delay: 400ms;
}
@keyframes slide-up {
  from { transform: translateY(16px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
```

**No animation where it doesn't serve:**
- Do not animate the progress bar text (only the width)
- Do not animate the eyebrow text on screen transitions
- Do not loop or auto-play any animation
- Do not add a skeleton loader to the live preview — show empty state copy instead

### Honest ceiling

9/10. The last point is the physical feel of the animations on real devices — specifically the spring easing on the preview pulse. This feels correct on a 60fps screen and may need adjustment on 120Hz ProMotion displays (the spring timings may need halving). Requires device testing.

---

## Angle 17 — The North Star Test

**Current score: 4/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

The wizard feels like ABLE — the product — not a form that happens to have a dark background. The import moment, the preview, and the one-question-per-screen format are all evidence of a product that has a point of view. The artist finishes and thinks "that was different."

### Exact spec to get there

The north star is not a single feature — it is the cumulative effect of:

1. **The import moment** — pasting a URL and seeing your name appear is the strongest signal that ABLE is not generic. This must work.

2. **One question per screen** — this is a philosophical choice, not a UX trend. It says: "we know exactly what we need from you, and we're not going to waste your time asking for anything else." Every screen is a promise kept.

3. **Real artist names on vibe cards** — this says "we know your world." Not "musicians" or "artists" in the abstract. Wet Leg. Four Tet. Little Simz. These names are doing product work.

4. **The live preview as the primary feature** — the preview is not a nice-to-have. It is the reason the wizard feels like a product. An artist watching their page build in real time is not filling in a form. They are making something.

5. **Screen 8 "Your page is live."** — this is the north star moment made explicit. The artist has arrived. Do not undersell it with neutral copy. The headline must be direct and physical: `Your page is live.`

**North star check — read every screen and ask:**

"Does this screen feel like a product, or does it feel like a form?"

- Screen 0: Large headline + one input = product. ✓
- Screen 1: One question, pre-filled if Spotify, preview updates = product. ✓
- Screen 2: Vibe cards with real artists + preview updates = product. ✓
- Screen 3: Colour changes in real time on preview = product. ✓
- Screen 4: Visual theme cards + preview = product. ✓
- Screen 5: Imported links with badges = product. ✓ (or: manual input = form — acceptable)
- Screen 6: 4 fan capture options + trust line = product. ✓
- Screen 7: Campaign state connected to real page mode = product. ✓
- Screen 8: Headline + URL + CTAs = product. ✓

### Honest ceiling

9/10 once the import and preview are working. The last point is that the product must deliver what the wizard promises — if `able-v7.html` and `admin.html` are not at the same level as the onboarding experience, the north star fails on arrival. The wizard can only be as strong as the product it delivers to.

---

## Angle 18 — AI Red Team (Preventive)

**Current score: N/A (preventive)**
**Priority: P0**

This angle does not have a score — it is a checklist of what would kill the wizard. Each item must have a specific defensive implementation.

### Kill list and defences

**P0 Kill 1: Spotify import fails silently**

Scenario: Artist pastes a valid Spotify URL. The Netlify function times out or returns a 500. The input shows nothing. The artist assumes ABLE is broken.

Defence:
```javascript
try {
  const data = await importSpotify(artistId);
  showImportSuccess(data);
} catch (err) {
  if (err.type === 'timeout') {
    showImportError("Taking too long to reach Spotify. Continue manually?");
  } else if (err.type === 'notfound') {
    showImportError("Couldn't find that artist on Spotify. Check the URL or continue without import.");
  } else {
    showImportError("Something went wrong reaching Spotify. You can still add your details manually.");
  }
  showManualPath(); // Make "Start from scratch →" more prominent
}
```

Never show a generic error. Always offer the forward path.

**P0 Kill 2: Live preview breaks mid-wizard**

Scenario: Artist picks a custom colour via hex input. The preview renders with `--color-accent: undefined` or `--color-accent: #######`. The preview goes blank.

Defence:
```javascript
function validateAndSetAccent(value) {
  const validHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
  if (validHex) {
    updatePreview('accent', value);
  }
  // Never update if invalid — keep previous value
}
```

The preview must always show a valid state. If the input is mid-edit (e.g. "#e0" — incomplete), hold the previous valid accent value. Never clear the preview.

**P0 Kill 3: Browser back navigation resets the wizard**

Scenario: Artist is on Screen 4. They press the browser Back button (not the wizard Back button). Browser pops the history stack to the previous page (landing page or wherever they came from). All progress lost.

Defence:
```javascript
// Push wizard state into browser history on each screen advance
function advanceToScreen(n) {
  const state = { wizardScreen: n, draft: getWizardDraft() };
  history.pushState(state, '', `#step-${n}`);
  showScreen(n);
}

// Handle browser back
window.addEventListener('popstate', (e) => {
  if (e.state && typeof e.state.wizardScreen === 'number') {
    showScreen(e.state.wizardScreen, { direction: 'back' });
  } else {
    // User has navigated out of wizard — confirm?
    // Do not ask. Let them leave. Their draft is in sessionStorage.
  }
});

// Save draft to sessionStorage on every field change
function saveDraft(field, value) {
  const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
  draft[field] = value;
  sessionStorage.setItem('able_wizard_draft', JSON.stringify(draft));
}

// Restore draft on wizard load
function restoreDraft() {
  const draft = JSON.parse(sessionStorage.getItem('able_wizard_draft') || '{}');
  if (draft && draft.name) {
    // Artist has a draft — offer to continue
    showResumeBanner(draft);
  }
}
```

**P1 Kill 4: iOS keyboard covers active input**

Scenario: Artist is on Screen 1 on iPhone. They tap the name input. iOS keyboard rises and covers the input entirely. The artist can't see what they're typing.

Defence:
```javascript
document.querySelectorAll('input, textarea').forEach(el => {
  el.addEventListener('focus', () => {
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 350); // iOS keyboard animation is ~300ms
  });
});
```

Also: `padding-bottom: env(keyboard-inset-height, 300px)` on the wizard container when any input is focused (iOS 15+):
```css
.wizard-screen:focus-within {
  padding-bottom: env(keyboard-inset-height, 260px);
}
```

**P1 Kill 5: Native colour picker opens on mobile**

Scenario: Artist taps "Choose your own →" on Screen 3. On iOS, this opens the native colour picker, which is a small, difficult-to-use wheel that rarely lands on the exact colour.

Defence: The 8 preset swatches are the primary interaction. "Choose your own →" triggers a custom hex input (text field, `<input type="text" placeholder="#e05242">`) rather than `<input type="color">`. The native colour picker is available as a tertiary option but never the primary flow.

**P2 Kill 6: Artist returns to wizard after having an existing profile**

Scenario: Artist completes onboarding. They come back a week later (maybe to show a friend). The wizard loads with a blank state, and if they complete it, it overwrites their existing profile.

Defence:
```javascript
// On wizard load
function checkExistingProfile() {
  const existing = localStorage.getItem('able_v3_profile');
  if (existing) {
    const profile = JSON.parse(existing);
    // Show a prompt: "You already have a page, [Name]. Edit it in your dashboard?"
    showExistingProfileBanner(profile.name);
  }
}
```

Do not silently overwrite. Do not block the wizard either — some artists may want to reset. Give them the choice.

---

## Angle 19 — The Single Memory

**Current score: 4/10**
**Priority: P1**
**Target score: 9/10**

### What a 10 looks like

If the artist closes the tab after Screen 3, they remember one specific, positive thing. Not "I started a sign-up form." Not "I filled in some fields." The target memory:

- **With Spotify import:** "I pasted my Spotify and it knew who I was."
- **Without Spotify:** "I picked my colour and saw my page update instantly."

Both are specific, visual, and connected to something ABLE does that other tools don't.

### Exact spec to get there

**The import memory is created by:**
1. The success message appearing with the avatar: `We found Luna Serrano on Spotify ✓`
2. The name pre-filling on Screen 1
3. The spring entrance animation on the success message

This is a 3-part experience that takes 2 seconds and leaves a specific memory. Every element of this sequence is important.

**The colour memory is created by:**
1. The preview updating in real time as the artist taps a swatch
2. The CTA button, links, and highlights all changing to the chosen colour simultaneously
3. The swatch selection animation (scale up + checkmark pop)

The memory is the specific visual: "I tapped orange and my page turned orange." That specificity is the memory.

**What destroys the single memory:**

- A generic form that requires reading: the memory becomes "I had to fill in a lot of fields"
- A broken import: the memory becomes "it didn't work"
- A non-responsive preview: the memory becomes "I couldn't tell what it would look like"
- Any friction or confusion between Screen 0 and Screen 3: the memory becomes general frustration

**Session resume:**

If an artist returns within 72 hours and has a draft in sessionStorage, show a banner on Screen 0:

```html
<div class="resume-banner">
  <p>You started building your page. Pick up where you left off?</p>
  <button class="btn-resume">Continue →</button>
  <button class="btn-restart">Start over</button>
</div>
```

This creates a second-chance single memory: "It remembered where I was."

### Honest ceiling

9/10. The single memory is fully within this build's control. The last point is whether the Spotify import is reliable enough to be the primary memory for Spotify users — if it fails for a significant portion, the fallback memory (colour picker) must be equally strong.

---

## Angle 20 — Big Picture Connection

**Current score: 5/10**
**Priority: P2**
**Target score: 8/10**

### What a 10 looks like (and why we're targeting 8)

The onboarding wizard is the start of a commercial journey. A 10/10 would mean the wizard explicitly seeds awareness of campaign states, fan capture, and the upgrade path — and does so in a way that feels helpful rather than pushy. An 8/10 is achievable now; a 10/10 requires real upgrade data to justify specific claims.

### Exact spec to get there

**Campaign state seeding — Screen 7:**

Screen 7 (`What's happening right now?`) is the most strategically important screen in the wizard. When an artist selects a campaign state, they are discovering that their page can shift modes. This is the first time most artists will understand that ABLE is not just a static link page.

The sub text on Screen 7 reinforces this:
```
Your page shifts with your moment.
```

This single line plants the concept of dynamic page states without using jargon.

**Done screen — the upgrade seed:**

On Screen 8, a single line below the primary CTAs (not highlighted, not promoted — just there):
```html
<p class="upgrade-seed">
  When you're ready to release something, you can put it in pre-release mode from your dashboard.
</p>
```

This is specific, non-pushy, and directly useful. It tells the artist what pre-release mode is and where to find it. No pricing mention here — the Done screen is not a sales page.

**Free tier ceiling — honest and specific:**

```html
<p class="tier-info">
  Your first 100 fan sign-ups are free. After that, £9/month for unlimited.
</p>
```

This is placed below the upgrade seed. It is honest. It tells the artist exactly what the ceiling is and what it costs to raise it. An artist who knows this leaves the wizard with correct expectations — no bad surprises later.

**What NOT to do:**

- Do not add an upgrade CTA on the Done screen. The artist just completed onboarding. They are not ready to evaluate pricing.
- Do not show a comparison table. Save it for the landing page.
- Do not add "unlock more features →" banners anywhere in the wizard. The wizard is not a funnel page.

**The 12-month MRR connection:**

The wizard's job is completion rate. A completed artist profile is the unit of value. A completed profile with fan capture active is a future fan list that becomes the upgrade trigger. The wizard's commercial contribution is:

1. High completion rate → more live profiles → more social proof for acquisition
2. Fan capture question answered → artist understands the core value proposition → lower churn when they upgrade
3. Campaign state question answered → artist has discovered a reason to log in tomorrow → improved retention

None of this is communicated to the artist. It is structural. The wizard's design serves it by removing friction and building genuine enthusiasm, not by adding conversion optimisations.

### Honest ceiling

8/10 at launch. The path to 10/10 is longitudinal — it requires tracking whether artists who complete onboarding with higher engagement scores (Spotify import, campaign state set, fan capture chosen) show higher 30-day retention and upgrade rates. This is a data question, not a build question.

---

## Build Order

Steps in dependency and impact order. Complete each step before starting the next — do not parallelise these.

### Step 1: Scaffold — 8-screen structure with direction-aware transitions (P0)

Build the empty wizard container with screen management:
- `showScreen(n, { direction: 'forward' | 'back' })` function
- Direction-aware slide animations (enter-forward, enter-back)
- Progress bar (fixed, 3px, accent, spring easing on width)
- Back button on screens 1–7 (absolute position, top-left)
- `history.pushState` on each screen advance
- `popstate` handler to navigate back through wizard history
- `sessionStorage` draft persistence on every field change
- Draft restore banner on wizard load (if draft exists)
- Screen 0 layout with headline, input, trust line, geo-proof

This is the skeleton. Nothing else can be built until this exists and works.

### Step 2: Screen 0 — Universal link input with import logic (P0)

Build the URL detection and import pipeline:
- URL type detector (Spotify, Linktree, SoundCloud, YouTube, other)
- `fetchWithTimeout` wrapper with specific error types
- Spotify import: call `/.netlify/functions/spotify-import` → success state (avatar + name) + error state
- Linktree import: call `/.netlify/functions/oembed-proxy` → `parseLinksList()` → success state (link count) + error state
- Placeholder cycling animation (CSS only)
- Import success slide-in (translateY + opacity, spring)
- "Start from scratch →" link

Test: paste 5 real Spotify artist URLs (include one with non-ASCII characters), 3 Linktree URLs (include one private), 1 SoundCloud URL. All must produce the correct success or error state.

### Step 3: Live preview panel (P0)

Build the preview panel before any individual screens — every screen depends on it:
- `<div class="preview-root">` with same CSS token system as `able-v7.html`
- Scale transform for 50% size on desktop: `transform: scale(0.5); transform-origin: top center;`
- Mobile: 200px-height sticky peek at top, fade mask on bottom edge
- `updatePreview(field, value)` dispatcher
- Preview pulse animation (scale 0.98 → 1.0, spring)
- Empty state: "Your page is taking shape." in the preview name slot
- Phone chrome (subtle border-radius frame, optional notch at top)

Desktop: preview panel is right column (50% width, fixed position so it stays visible while scrolling through questions).
Mobile: preview is `position: sticky; top: 0;` at top of page, 200px height, fades at bottom.

### Step 4: Screens 1–4 (P0–P1)

Build in order — each is fast once the scaffold and preview exist:

**Screen 1 (Name):**
- Single `<input>` with `aria-labelledby` pointing to the question heading
- Enter key advances
- `updatePreview('name', value)` on every keystroke (150ms debounce)
- Auto-fill from Spotify import result if available
- Cursor positioned at end of pre-filled text

**Screen 2 (Vibe):**
- 7 vibe cards with `role="radiogroup"` / `role="radio"`
- Arrow key navigation
- On select: `updatePreview('vibe', value)` (preview accent + background shift)
- Bounce animation on selected card
- Pre-select from Spotify genre mapping if available
- Example artists in 11px text below each vibe label

**Screen 3 (Accent Colour):**
- 8 preset swatches (48×48px each, `border-radius: 50%`)
- Vibe-mapped default pre-selected (based on Screen 2 answer)
- Swatch selection: scale + checkmark pop animation
- `updatePreview('accent', hex)` on select (immediate, no debounce)
- Custom hex input (text, not `<input type="color">`)
- `validateAndSetAccent()` — only updates preview if valid hex
- Helper text: "This is the colour your fans will tap to sign up, stream, or get tickets."

**Screen 4 (Theme):**
- 4 theme cards (2-column grid always)
- Each card shows a visual preview (mini phone mock with theme applied)
- Glass card shows sample artwork bleeding through (static image)
- On select: `updatePreview('theme', value)` → preview root gets `theme-[value]` class
- Default: Dark pre-selected

### Step 5: Screens 5–7 (P0–P1)

**Screen 5 (Links):**
- Conditional: if Linktree import succeeded → show import confirmation with `removable` rows
- Conditional: if no import → show URL paste input with platform auto-detection
- Platform icon display for Spotify, Apple Music, YouTube, SoundCloud, Instagram, TikTok, Bandcamp
- Up to 6 links total
- `updatePreview('links', linksList)` — shows platform pills in preview

**Screen 6 (Fan Capture):**
- 4 stacked choice cards (full-width, 64px height, `role="radiogroup"`)
- Fan trust line: "Every sign-up is yours. We can't contact your fans."
- On select: `updatePreview('cta', value)` — fan capture CTA text updates in preview
- No skip option

**Screen 7 (Current Moment):**
- 4 stacked choices with contextual sub-inputs that slide in on selection
- "Something's coming" → date picker inline (250ms slide-in)
- "Music just dropped" → URL input inline
- "I'm playing tonight" → optional venue + time inputs inline
- `updatePreview('campaignState', value)` — preview switches to the selected campaign state visual
- CTA: "Build my page →" with loading animation on submission
- `finishOnboarding(draft)` on CTA tap → flush sessionStorage draft to localStorage `able_v3_profile`

### Step 6: Screen 8 — Done screen (P1)

- Spring entrance sequence: headline (100ms delay) → URL (250ms delay) → CTAs (400ms delay)
- Inline editable slug: `ablemusic.co/[slug]` with pencil icon → inline text input on click
- Slug generation: `name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').slice(0, 24)`
- Primary CTA: "Go to my page →" — navigates to `able-v7.html` (same tab)
- Secondary CTA: "Open my dashboard →" — navigates to `admin.html`
- Share section: 3 icons (Instagram story, Twitter/X, Copy link) — 44px touch targets
- Free tier disclosure
- Trust close
- Upgrade seed (single line, 14px, muted)
- Launch count (conditional — only show if data exists)

### Step 7: Error states and fallbacks (P0)

- All import error states (timeout, notfound, blocked, generic)
- Preview never-blank guarantee (always shows valid state)
- Existing profile detection banner
- Draft restore banner
- Session resume logic
- Keyboard focus trap within active screen (tab key should not reach offscreen elements)

### Step 8: Mobile polish (P1)

At 375px:
- Preview sticky peek (200px, fade mask)
- Vibe grid 2-column (7th card full-width)
- All tap targets ≥ 64px on choice cards
- Continue button full-width, 56px
- iOS keyboard handling (`scrollIntoView` + `keyboard-inset-height` padding)
- No horizontal scroll audit (check every screen at 375px)
- Input `font-size: 16px` minimum on all inputs
- Landscape orientation: recalculate preview height

### Step 9: Animation layer (P2)

After all screens are built and functional:
- Screen transition timing fine-tuning (test on real device, not just simulator)
- Preview pulse calibration (0.98 might be too subtle on small screens — test)
- Vibe card bounce tuning
- Screen 8 entrance sequence timing
- Progress bar spring easing
- Placeholder cycling CSS animation
- Import success slide-in

Animation layer is last because it depends on the structure being final. Re-animating after layout changes wastes time.

---

## Playwright Verification Checklist

Run these checks after completing the build. Use the Playwright MCP browser tools.

### Screen 0

- [ ] Page loads with headline visible above fold at 375px without scrolling
- [ ] Trust line visible below input without scrolling at 375px
- [ ] Placeholder text cycles every 3 seconds
- [ ] Paste a valid Spotify artist URL → success message appears within 6 seconds with artist name
- [ ] Paste an invalid URL → no error shown, "Start from scratch →" link visible
- [ ] Paste a Linktree URL → success message shows link count within 6 seconds
- [ ] Paste a URL that returns an error → specific error message shown, manual path offered
- [ ] "Start from scratch →" advances to Screen 1 without import

### Screen 1

- [ ] Step counter shows "Step 1 of 7"
- [ ] Progress bar at 14%
- [ ] Name input pre-filled if Spotify import succeeded
- [ ] Typing in the name input updates the preview name within 200ms
- [ ] Preview visible (desktop: right column; mobile: top peek)
- [ ] Enter key advances to Screen 2
- [ ] "Continue →" button is 56px height, full-width at 375px

### Screen 2

- [ ] 7 vibe cards visible (3-column desktop, 2-column mobile)
- [ ] 7th card ("Other") is full-width on mobile
- [ ] Example artist names visible below each vibe label (11px text)
- [ ] Tapping a vibe card: card shows selection state (ring + checkmark)
- [ ] Tapping a vibe card: preview accent updates immediately
- [ ] Pre-selected card visible if Spotify genre was detected
- [ ] Arrow keys navigate between cards
- [ ] "Continue →" advances to Screen 3

### Screen 3

- [ ] 8 colour swatches visible (48×48px)
- [ ] Pre-selected swatch matches vibe mapping from Screen 2
- [ ] Tapping a swatch: swatch shows selected state (scale + ring)
- [ ] Tapping a swatch: preview CTA button colour updates immediately
- [ ] Custom hex input accepts valid hex values and updates preview
- [ ] Custom hex input with invalid value does not update preview
- [ ] Helper text visible below swatches

### Screen 4

- [ ] 4 theme cards in 2-column grid
- [ ] Glass card shows sample artwork
- [ ] Dark theme pre-selected by default
- [ ] Tapping a theme: preview root gets correct theme class
- [ ] Preview updates immediately to selected theme

### Screen 5 (import confirmed path)

- [ ] Shows imported links with platform icons
- [ ] Remove button on each row — click removes that row from list
- [ ] "Add more links" input visible below list
- [ ] Switcher hook line visible: "Your Linktree links are already here..."
- [ ] Preview shows platform pills update

### Screen 5 (manual path)

- [ ] URL paste input visible
- [ ] Paste Spotify URL → Spotify chip appears
- [ ] Platform icon visible for each detected platform

### Screen 6

- [ ] 4 choice cards stacked, 64px height each, full-width
- [ ] Fan trust line visible below choices
- [ ] Selecting a choice updates preview CTA text
- [ ] "Continue →" advances to Screen 7

### Screen 7

- [ ] 4 choices visible
- [ ] Selecting "Something's coming" → date picker slides in below choice
- [ ] Selecting "Music just dropped" → URL input slides in below choice
- [ ] Selecting "I'm playing tonight" → venue + time inputs slide in
- [ ] CTA reads "Build my page →" (not "Continue →")
- [ ] Tapping "Build my page →" shows loading state ("Building...")
- [ ] After submission: localStorage `able_v3_profile` contains all wizard answers
- [ ] After submission: sessionStorage `able_wizard_draft` is cleared
- [ ] After submission: Screen 8 shown

### Screen 8

- [ ] Headline "Your page is live." visible, spring entrance animation plays
- [ ] URL slug visible and correct format
- [ ] Slug is editable inline (click pencil icon or slug text → input appears)
- [ ] "Go to my page →" CTA navigates to `able-v7.html`
- [ ] "Open my dashboard →" CTA navigates to `admin.html`
- [ ] Free tier disclosure visible
- [ ] Trust close visible

### Navigation and resilience

- [ ] Back button on Screens 1–7: returns to previous screen with left-slide animation
- [ ] Browser back button on Screen 3: returns to Screen 2 (not to landing page)
- [ ] Refresh on Screen 4: restores draft from sessionStorage if available
- [ ] Existing localStorage `able_v3_profile` → banner shown on Screen 0 offering to go to dashboard

### Mobile at 375px

- [ ] No horizontal scroll on any screen
- [ ] All choice card tap targets ≥ 64px height
- [ ] Continue button full-width on all screens
- [ ] Preview visible as 200px peek, sticky at top
- [ ] iOS keyboard: tapping an input scrolls it into view within 400ms
- [ ] Input font-size 16px minimum (tap and check — no iOS zoom on focus)

### Accessibility

- [ ] Tab key navigates through all interactive elements in logical order
- [ ] Vibe grid: arrow keys move between cards
- [ ] Screen reader (VoiceOver or NVDA): progress bar announces current step
- [ ] Import error state: screen reader announces the error message
- [ ] All inputs have accessible names (check with browser accessibility inspector)
