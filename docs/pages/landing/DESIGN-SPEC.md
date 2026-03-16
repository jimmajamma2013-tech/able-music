# Landing Page — Design Spec
**Stage 5 of the ABLE Build Process**
**Created: 2026-03-15 | This document makes every build decision unambiguous.**

> A developer should be able to build the entire page from this document without asking a single question. Every px, every colour, every animation, every state is defined here.

---

## GLOBAL TOKENS

```css
/* Typography */
--font-display: 'Barlow Condensed', sans-serif;   /* headlines */
--font-body:    'DM Sans', sans-serif;             /* everything else */

/* Colours */
--bg-deep:      #09090f;    /* primary background */
--bg-mid:       #0d0f1a;    /* alternate sections */
--bg-footer:    #070709;    /* footer */
--text:         #e8eaf2;    /* primary text */
--text-2:       rgba(232,234,242,0.62);   /* secondary text */
--text-3:       rgba(232,234,242,0.38);   /* muted / trust lines */
--accent:       #e05242;    /* primary accent — CTAs, highlights */
--accent-rgb:   224,82,66;
--border:       rgba(255,255,255,0.08);
--border-mid:   rgba(255,255,255,0.14);

/* Easing */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-decel:   cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
```

**Font loading (in `<head>`, before any other styles):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap">
```

---

## HEAD — SEO + META

```html
<title>ABLE — Your artist page, built for real fans</title>
<meta name="description" content="Your page shifts with your moment. Release day, gig night, new drop — ABLE knows. Every fan sign-up goes straight to your list. Free forever.">

<!-- Open Graph -->
<meta property="og:title" content="ABLE — Your artist page, built for real fans">
<meta property="og:description" content="Build your fan list. Own your relationship. Free forever.">
<meta property="og:image" content="https://ablemusic.co/og-image.jpg">
<meta property="og:url" content="https://ablemusic.co">
<meta property="og:type" content="website">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="ABLE — Your artist page, built for real fans">
<meta name="twitter:description" content="Your page shifts with your moment. Free forever.">
<meta name="twitter:image" content="https://ablemusic.co/og-image.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://ablemusic.co">
```

**OG image spec:** 1200×630px. Dark background `#09090f`. ABLE wordmark centred top-third. Demo phone (Profile state, Luna's page) right side. Tagline left: `Your page. Built for real fans.` in Barlow Condensed white. Export as `og-image.jpg`.

---

## SECTION 1 — NAVIGATION

**Height:** 56px
**Position:** `position: fixed; top: 0; left: 0; right: 0; z-index: 100`
**Background (initial):** `transparent`
**Background (on scroll > 40px):** `rgba(9,9,15,0.88)` + `backdrop-filter: blur(16px) saturate(160%)`
**Transition:** `background 300ms var(--ease-decel), backdrop-filter 300ms`
**Border-bottom (on scroll):** `1px solid rgba(255,255,255,0.07)`

**Layout:**
```
padding: 0 40px (desktop) / 0 20px (mobile)
display: flex
align-items: center
justify-content: space-between
```

**Left — wordmark:**
- Text: `ABLE`
- Font: Barlow Condensed 700
- Size: 20px
- Letter-spacing: 0.06em
- Colour: `#e8eaf2`

**Right — desktop:**
- `Sign in` — DM Sans 500, 14px, `var(--text-2)`, no decoration, `padding: 8px 12px`
- `Your page is free →` — accent pill: `background: var(--accent)`, `color: white`, `font-size: 14px`, `font-weight: 600`, `height: 36px`, `padding: 0 16px`, `border-radius: 100px`
- Gap between: 8px

**Right — mobile (≤ 768px):**
- Single button: `Start →`
- Same accent pill style, `height: 36px`, `padding: 0 14px`
- `Sign in` hidden on mobile nav (appears in footer)

**Scroll detection:**
```javascript
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
```

---

## SECTION 2 — HERO

**Background:** `var(--bg-deep)` `#09090f`
**Min-height:** `100vh` desktop, `auto` mobile
**Padding:** `140px 40px 80px` desktop (140px top accounts for fixed nav + breathing room), `100px 20px 60px` mobile

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 420px
gap: 64px
align-items: center
max-width: 1200px
margin: 0 auto
```

**Layout — mobile (≤ 768px):**
```
display: flex
flex-direction: column
gap: 48px
```

### Left column — copy

**Eyebrow:**
- Text: `For independent artists`
- Font: DM Sans 700
- Size: 11px
- Letter-spacing: 0.2em
- Text-transform: uppercase
- Colour: `var(--accent)` `#e05242`
- Margin-bottom: 16px

**Headline:**
- Text: `100 real fans beat 10,000 strangers.`
- Font: Barlow Condensed 800
- Size: 64px desktop / 44px mobile
- Line-height: 0.92
- Letter-spacing: -0.01em
- Colour: `var(--text)` `#e8eaf2`
- Margin-bottom: 20px

**Sub-headline:**
- Text: (see COPY.md — full-stop separated sentences)
- Font: DM Sans 400
- Size: 20px desktop / 17px mobile
- Line-height: 1.7
- Colour: `var(--text-2)`
- Margin-bottom: 36px

**Primary CTA:**
- Text: `Your page is free →`
- Background: `var(--accent)` `#e05242`
- Colour: white
- Font: DM Sans 600, 17px
- Height: 52px
- Padding: `0 32px`
- Border-radius: 12px
- Border: none
- Cursor: pointer
- Hover: `filter: brightness(1.08)` + `transform: translate(-1px, -2px)` + `box-shadow: 0 8px 28px rgba(224,82,66,0.38)`
- Hover transition: `all 200ms var(--ease-spring)`
- Active: `transform: translate(0, 0)` + shadow reduces
- Mobile: `width: calc(100% - 0px)` full-width

**Secondary CTA:**
- Text: `Already have a page? Sign in →`
- Font: DM Sans 500, 14px
- Colour: `var(--text-3)`
- Display: block
- Margin-top: 12px
- No underline, hover: `color: var(--text-2)`

**Trust line:**
- Text: `No card required. Free forever.`
- Font: DM Sans 400, 12px
- Colour: `var(--text-3)`
- Display: block
- Margin-top: 10px

**Entrance animation (all hero copy):**
```css
@keyframes heroIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: none; }
}
.hero-eyebrow  { animation: heroIn 600ms var(--ease-out) 100ms both; }
.hero-headline { animation: heroIn 600ms var(--ease-out) 200ms both; }
.hero-sub      { animation: heroIn 600ms var(--ease-out) 300ms both; }
.hero-cta      { animation: heroIn 600ms var(--ease-out) 400ms both; }
```

### Right column — demo phone

**Phone container:**
```css
.phone-wrap {
  position: relative;
  width: 390px;
  height: 844px;
  transform: scale(0.7);
  transform-origin: top center;
  flex-shrink: 0;
}
```
*(Note: scale(0.7) renders at 273px × 591px visual size)*

**On mobile:** `transform: scale(0.82)`, `transform-origin: top center`, `width: 100%`

**Phone frame:**
- SVG overlay, `position: absolute; inset: 0; z-index: 2; pointer-events: none`
- Subtle drop shadow: `filter: drop-shadow(0 32px 64px rgba(0,0,0,0.6))`
- Corner radius on screen: 44px (matches iPhone 14 Pro)

**Screen area:**
```css
.phone-screen {
  position: absolute;
  inset: 12px;
  border-radius: 44px;
  overflow: hidden;
  background: #000;
  z-index: 1;
}
```

**Entrance animation:**
```css
.phone-wrap {
  animation: phoneIn 700ms var(--ease-spring) 300ms both;
}
@keyframes phoneIn {
  from { opacity: 0; transform: scale(0.7) scale(0.94); }
  to   { opacity: 1; transform: scale(0.7) scale(1); }
}
```

**Hero phone — Profile state content (default):**
- Artist name: Luna Serrano, Barlow Condensed 800, 36px, white
- Accent: `#5bbfcc` (cyan)
- Top 45%: YouTube poster image (not iframe on page load — load poster only)
- Below: `Stay close.` fan sign-up button in cyan
- Platform pills: Spotify, Apple Music, Instagram
- State chip: `● Profile` top-right, 10px, green dot

---

## SECTION 3 — DEMO ("See it shift")

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `96px 40px` desktop / `64px 20px` mobile
**Max-width:** 1200px, centred

**Section headline:**
- Font: Barlow Condensed 700, 42px desktop / 32px mobile
- Colour: `var(--text)`
- Text-align: centre
- Margin-bottom: 12px

**Section sub:**
- Font: DM Sans 400, 18px desktop / 16px mobile
- Colour: `var(--text-2)`
- Text-align: centre
- Max-width: 560px
- Margin: 0 auto 56px

**Demo phone — same dimensions as hero phone, centred:**
- Width: 390px intrinsic, `transform: scale(0.72)`
- Margin: 0 auto 40px
- ID: `demo-phone` — this is where iframe loading targets

**State buttons row:**
```css
.state-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: 48px;
}
/* Mobile */
@media (max-width: 768px) {
  .state-buttons {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    justify-content: flex-start;
    padding: 0 20px 12px;
    gap: 10px;
    -webkit-overflow-scrolling: touch;
  }
}
```

**Each state button:**
```css
.state-btn {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 140px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1.5px solid var(--border);
  background: rgba(255,255,255,0.04);
  cursor: pointer;
  transition: all 200ms var(--ease-decel);
  scroll-snap-align: start;
  flex-shrink: 0;
}
.state-btn:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--border-mid);
}
.state-btn.active {
  background: rgba(255,255,255,0.10);
  border-color: rgba(255,255,255,0.28);
  border-left: 3px solid var(--accent);
}
.state-btn-name {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
}
.state-btn-sub {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--text-3);
}
```

**Mobile scroll fade — right edge:**
```css
.state-buttons-wrap::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0; bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, var(--bg-mid));
  pointer-events: none;
}
```

**Interaction prompt (above buttons):**
- Text: `Tap to see how your page changes →`
- Font: DM Sans 400, 11px
- Colour: `var(--text-3)`
- Text-align: centre
- Margin-bottom: 14px

**State transition:**
```javascript
function switchState(state) {
  // Fade out current content
  phoneContent.style.opacity = '0';
  phoneContent.style.transform = 'scale(0.98)';

  setTimeout(() => {
    renderState(state);  // update DOM
    // Fade in
    phoneContent.style.opacity = '1';
    phoneContent.style.transform = 'scale(1)';
  }, 150);
}
phoneContent.style.transition = 'opacity 150ms ease, transform 150ms ease';
```

**Phone content per state:**

*Profile:* Artist Luna, cyan accent, YouTube poster image, `Stay close.` CTA, Spotify/Apple Music/Instagram pills, `● Profile` chip

*Pre-release:* Artwork blurred `brightness(0.3)` with cyan glow, countdown: `3 DAYS 14:22:07` in Barlow Condensed 52px white, `Hear it first →` CTA in purple/indigo, `● Something's coming` chip, purple dot with `box-shadow: 0 0 8px rgba(139,92,246,0.6)`

*Live:* Spotify iframe loads (src set on first activation), `Stream it now →` CTA prominent green, `47 fans signed up` small line below CTA, `● Out now` chip, green dot

*Gig Tonight:* Background warm amber overlay, venue `Moth Club, London` in Barlow Condensed 40px white, `Tonight · Doors 7pm` 18px, `Get tickets →` full-width amber fill CTA, `● Tonight` chip with pulse animation

**Pulse animation (Gig state chip):**
```css
@keyframes chipPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(244,185,66,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(244,185,66,0); }
}
.gig-dot { animation: chipPulse 2s ease infinite; }
```

**Countdown timer (Pre-release state):**
```javascript
function updateCountdown() {
  // Demo target: 3 days from now
  const target = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const diff = target - new Date();
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  countdownEl.textContent = `${d} DAYS ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(updateCountdown, 1000);
```

**Quiet line below everything:**
- Text: `Artists don't change their Linktree on release day. ABLE changes for you.`
- Font: DM Sans 400 italic, 18px desktop / 16px mobile
- Colour: `var(--text-2)`
- Text-align: centre
- Max-width: 600px
- Margin: 0 auto

**Iframe lazy loading:**
```javascript
const demoObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    isDemoVisible = true;
    demoObserver.disconnect();
  }
}, { rootMargin: '200px' });
demoObserver.observe(document.getElementById('demo-section'));

// Only create Spotify iframe when Live state first activated AND section is visible
function activateLiveState() {
  if (!spotifyLoaded && isDemoVisible) {
    createSpotifyIframe();
    spotifyLoaded = true;
  }
}
```

---

## SECTION 4 — LINKTREE COMPARISON

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` desktop / `64px 20px` mobile

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 1fr
gap: 80px
align-items: start
max-width: 1100px
margin: 0 auto
```

**Layout — mobile:** single column, stacked

**Left column — copy:**

Headline:
- Font: Barlow Condensed 700, 42px / 32px mobile
- Colour: `var(--text)`
- Margin-bottom: 12px

Sub:
- Font: DM Sans 400, 18px / 16px
- Colour: `var(--text-2)`
- Line-height: 1.6
- Margin-bottom: 40px

**Right column — comparison table:**

```css
.comparison-table {
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}
.comparison-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: rgba(255,255,255,0.04);
  padding: 12px 20px;
  border-bottom: 1px solid var(--border);
}
.comparison-header span:first-child {
  font-size: 12px; font-weight: 600; color: var(--text-3);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.comparison-header span:last-child {
  font-size: 12px; font-weight: 600; color: var(--accent);
  letter-spacing: 0.1em; text-transform: uppercase;
}
.comparison-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);
  gap: 16px;
}
.comparison-row:last-child { border-bottom: none; }
.col-linktree {
  font-size: 14px; color: var(--text-3); line-height: 1.5;
}
.col-able {
  font-size: 14px; color: var(--text); line-height: 1.5;
  display: flex; align-items: flex-start; gap: 8px;
}
.col-able::before {
  content: '✓';
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}
```

**Below comparison table — CTA block:**

Ghost button:
```css
.switcher-cta {
  display: inline-flex;
  align-items: center;
  height: 48px;
  padding: 0 24px;
  border: 1.5px solid rgba(255,255,255,0.25);
  border-radius: 10px;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;
  background: transparent;
  transition: all 200ms var(--ease-decel);
  margin-top: 28px;
  width: 100%;
  justify-content: center;
}
.switcher-cta:hover {
  border-color: rgba(255,255,255,0.45);
  background: rgba(255,255,255,0.05);
}
```

Small copy below button:
- Font: DM Sans 400, 13px
- Colour: `var(--text-3)`
- Margin-top: 10px
- Line-height: 1.6

Reassurance line:
- Font: DM Sans 400, 13px
- Colour: `var(--text-3)`
- Margin-top: 8px
- Line-height: 1.6

---

## SECTION 5 — FAN OWNERSHIP

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `112px 40px` desktop / `80px 20px` mobile

**Layout:** single column, centred
**Max-width:** 680px, `margin: 0 auto`
**Text-align:** centre (desktop), left (mobile ≤ 480px)

**Headline:**
- Font: Barlow Condensed 700, 52px / 38px mobile
- Colour: `var(--text)`
- Margin-bottom: 20px

**Insight line:**
- Font: DM Sans 500, 16px
- Colour: `var(--accent)`
- Margin-bottom: 28px

**Body paragraphs:**
- Font: DM Sans 400, 18px / 16px mobile
- Line-height: 1.8
- Colour: `var(--text-2)`
- Paragraph gap: 20px

**No CTA in this section.**

---

## SECTION 6 — HOW IT WORKS

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** centred, Barlow Condensed 700, 42px / 32px

**Steps — desktop layout:**
```
display: grid
grid-template-columns: repeat(3, 1fr)
gap: 48px
max-width: 1000px
margin: 56px auto 48px
```

**Steps — mobile:** single column, gap 40px

**Each step:**

Icon area:
```css
.step-icon {
  width: 48px; height: 48px;
  background: rgba(224,82,66,0.12);
  border: 1px solid rgba(224,82,66,0.25);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
```

Step number (inside icon):
- Font: Barlow Condensed 700, 22px
- Colour: `var(--accent)`

Step headline:
- Font: DM Sans 700, 18px
- Colour: `var(--text)`
- Margin-bottom: 10px

Step body:
- Font: DM Sans 400, 15px
- Line-height: 1.7
- Colour: `var(--text-2)`

**CTA below steps (centred):**
Same primary CTA button style as hero. `margin: 0 auto`. Display: block. Width: fit-content. (Mobile: full-width)

---

## SECTION 7 — PRICING

**Background:** `var(--bg-mid)` `#0d0f1a`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** centred, Barlow Condensed 700, 42px

**Cards — desktop:**
```
display: grid
grid-template-columns: repeat(4, 1fr)
gap: 16px
max-width: 1100px
margin: 56px auto 0
```

**Cards — tablet (≤ 1024px):** 2×2 grid
**Cards — mobile:** single column

**Each tier card:**
```css
.tier-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tier-card.featured {  /* Free tier */
  border-color: rgba(224,82,66,0.35);
  background: rgba(224,82,66,0.06);
}
```

Card structure (in order):
1. Tier name — DM Sans 700, 13px, letter-spacing 0.1em, uppercase, `var(--text-2)`
2. Price — Barlow Condensed 700, 40px, `var(--text)`, margin-top 8px
3. Per month label — DM Sans 400, 13px, `var(--text-3)`, margin-top 2px
4. Descriptor — DM Sans 400, 14px, `var(--text-2)`, margin-top 12px, padding-bottom 16px, border-bottom `var(--border)`
5. Key line — DM Sans 500, 13px, `var(--accent)`, margin-top 16px
6. Feature list — 3 items, DM Sans 400, 13px, `var(--text-2)`, gap 8px, margin-top 12px
7. CTA button — margin-top auto, padding-top 24px

**Feature list item:**
```css
.feature-item::before {
  content: '—';
  color: var(--text-3);
  margin-right: 8px;
}
```

**CTA buttons per tier:**
- Free: accent fill, `Your page is free →`
- Artist: accent fill, `Start Artist →`
- Pro: accent fill, `Start Pro →`
- Label: ghost/outline, `Talk to us →`

All tier CTAs: 44px height, `border-radius: 8px`, full-width within card

**Upgrade trigger (below Free tier card only):**
```html
<p class="upgrade-hint">When 100 fans sign up, Artist tier removes the cap.</p>
```
DM Sans 400, 12px, `var(--text-3)`, margin-top 8px, text-align centre

---

## SECTION 8 — FAQ

**Background:** `var(--bg-deep)` `#09090f`
**Padding:** `96px 40px` / `64px 20px` mobile

**Section headline:** `Questions.` — Barlow Condensed 700, 42px, left-aligned (not centred — intentional)

**FAQ items:**
```
max-width: 720px
margin: 48px auto 0
display: flex
flex-direction: column
gap: 0
```

**Each FAQ item:**
```css
.faq-item {
  border-bottom: 1px solid var(--border);
  padding: 0;
}
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  user-select: none;
  gap: 16px;
}
.faq-question:hover { color: var(--text); }
.faq-chevron {
  width: 20px; height: 20px;
  flex-shrink: 0;
  transition: transform 250ms var(--ease-decel);
  color: var(--text-3);
}
.faq-item.open .faq-chevron { transform: rotate(180deg); }
.faq-answer {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-2);
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms var(--ease-decel), padding 300ms var(--ease-decel);
}
.faq-item.open .faq-answer {
  max-height: 300px;
  padding-bottom: 20px;
}
```

**Interaction:** click question → toggle `.open` class. One open at a time.

---

## SECTION 9 — FOOTER

**Background:** `var(--bg-footer)` `#070709`
**Padding:** `64px 40px 40px` / `48px 20px 32px` mobile
**Border-top:** `1px solid var(--border)`

**Layout — desktop:**
```
display: grid
grid-template-columns: 1fr 1fr
gap: 80px
max-width: 1100px
margin: 0 auto
```

**Left column:**
- ABLE wordmark — Barlow Condensed 700, 18px, letter-spacing 0.06em
- `Sign in` link — DM Sans 500, 14px, `var(--text-3)`, margin-top 20px, display block
- `Start free →` link — DM Sans 500, 14px, `var(--accent)`, margin-top 8px, display block

**Right column:**
- `Privacy Policy` — DM Sans 400, 14px, `var(--text-3)`
- `Terms of Service` — DM Sans 400, 14px, `var(--text-3)`
- Fan entry point: `Not an artist?` then `Find artists on ABLE →` — 13px, `var(--text-3)` + link in `var(--text-2)`, margin-top 16px

**Authenticity line (full-width, above bottom bar):**
```css
.auth-line {
  grid-column: 1 / -1;
  font-family: var(--font-body);
  font-size: 13px;
  font-style: italic;
  color: var(--text-3);
  border-top: 1px solid var(--border);
  padding-top: 24px;
  margin-top: 40px;
}
```
Text: `Built by an independent artist who got tired of Linktree not knowing when a release was dropping.`

**Bottom bar:**
```css
.footer-bottom {
  grid-column: 1 / -1;
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--text-3);
  margin-top: 12px;
}
```
Text: `© 2026 ABLE Music Ltd. Built for artists, not algorithms.`

---

## SOCIAL PROOF SECTION — READY TO INSERT

**Position:** Between Section 8 (FAQ) and Section 9 (footer) — add when first real testimonials exist.

**Structure (do not build yet — spec only):**

```html
<section class="social-proof" id="social-proof">
  <!-- Hidden until populated -->
</section>
```

```css
.social-proof {
  background: var(--bg-mid);
  padding: 80px 40px;
  display: none; /* show when quotes exist */
}
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1000px;
  margin: 48px auto 0;
}
.testimonial-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
}
.testimonial-quote {
  font-size: 15px; line-height: 1.7; color: var(--text-2);
  font-style: italic; margin-bottom: 16px;
}
.testimonial-attribution {
  font-size: 13px; font-weight: 600; color: var(--text-3);
}
```

**Populate when you have:** Name, City, one specific quote with a real number (`47 sign-ups in 3 days`). Do not use vague quotes (`"this changed everything"`).

---

## SCROLL ENTRANCE ANIMATIONS

Apply to all major section elements:

```javascript
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
```

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms var(--ease-out), transform 500ms var(--ease-out);
}
.fade-in.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .fade-in { opacity: 1; transform: none; transition: none; }
}
```

Apply `.fade-in` to: section headlines, step cards, tier cards, FAQ items, comparison table rows.

---

## PLAYWRIGHT VERIFICATION CHECKLIST

Run after build. All must pass before Stage 6 is complete.

**Screenshots to capture:**
- [ ] 375px (iPhone SE) — full page
- [ ] 390px (iPhone 14 Pro) — full page
- [ ] 768px (tablet)
- [ ] 1280px (laptop)
- [ ] 1440px (wide desktop)

**Checks:**
- [ ] No horizontal scroll at 375px
- [ ] Hero CTA visible above fold at 1280px (no scrolling needed)
- [ ] Demo phone not cropped at any viewport
- [ ] State buttons scroll horizontally at 375px (no wrapping)
- [ ] All tap targets ≥ 48px (measure 4 CTAs + 4 state buttons)
- [ ] Nav background activates on scroll
- [ ] FAQ open/close works
- [ ] Pre-release countdown is ticking (not static)
- [ ] Gig Tonight chip is pulsing
- [ ] Lighthouse mobile score: LCP ≤ 2.5s, Performance ≥ 85

**Anything that fails: fix before shipping.**
