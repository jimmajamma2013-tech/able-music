# freelancer.html — Design Spec
**Score: 7.9/10 | Status: Build-ready (P0 + P1)**
**Created: 2026-03-16**

> This spec is complete enough to build from. A build agent reading this document should produce a correct freelancer profile page without needing to ask questions. If something is unclear here, that is a spec gap — not a build decision.

---

## 1. PURPOSE

A professional profile for music-industry freelancers (producers, mixing engineers, mastering engineers, session musicians, videographers, photographers, graphic designers). Discoverable primarily via credits on artist ABLE profiles. Primary conversion: visitor taps "Get in touch" and submits a booking enquiry.

**What this page is not:** a link-in-bio, a social network, a marketplace, a portfolio template. It is a booking and portfolio tool that earns its authority through peer-confirmed credits on real artist releases.

---

## 2. SURFACE CLASSIFICATION

**Surface 1** — dark premium. Same token set as able-v7.html (artist profile).

NOT Surface 2 (admin). The freelancer profile is a public-facing page, not a dashboard. It shares the visual register of the artist profile, not the warm cream admin aesthetic.

---

## 3. DESIGN TOKENS

```css
:root {
  /* Foundation — warm graphite, not cold navy */
  --base:          #0e0d0b;
  --base-mid:      #141210;
  --surface-1:     #1c1a17;
  --surface-2:     #242220;
  --surface-3:     #2e2b27;

  /* Border — warm white, never pure #fff */
  --border-faint:    rgba(255,252,240,0.045);
  --border-subtle:   rgba(255,252,240,0.08);
  --border-default:  rgba(255,252,240,0.12);
  --border-strong:   rgba(255,252,240,0.22);

  /* Text — warm cream */
  --text:   #e4dfd2;
  --text-2: rgba(228,223,210,0.58);
  --text-3: rgba(228,223,210,0.35);
  --text-4: rgba(228,223,210,0.20);

  /* Accent — freelancer-set, default editorial gold */
  --accent:     #c9b76c;
  --accent-rgb: 201,183,108;
  --accent-glow: rgba(201,183,108,0.11);
  --accent-dim:  rgba(201,183,108,0.10);
  --accent-border: rgba(201,183,108,0.22);

  /* Availability state colours */
  --avail-open:    #78a880;   /* dusty sage green */
  --avail-limited: #c9b76c;   /* amber/gold */
  --avail-closed:  rgba(228,223,210,0.25);  /* dim */

  /* Fonts */
  --font:   'DM Sans', sans-serif;
  --font-d: 'Barlow Condensed', sans-serif; /* display — freelancer name */

  /* Easing */
  --spring: cubic-bezier(0.34,1.56,0.64,1);
  --ease:   cubic-bezier(0.25,0.46,0.45,0.94);

  /* Border radius multiplier — set by vibe */
  --r-base: 12px;
  --r-mult: 1.0;
}
```

### Accent loading
The freelancer's chosen accent colour overrides `--accent` and `--accent-rgb` on page load:
```javascript
const profile = JSON.parse(localStorage.getItem('able_freelancer_profile') || '{}');
if (profile.accent) {
  const hex = profile.accent.replace('#','');
  const r = parseInt(hex.substr(0,2),16);
  const g = parseInt(hex.substr(2,2),16);
  const b = parseInt(hex.substr(4,2),16);
  document.documentElement.style.setProperty('--accent', profile.accent);
  document.documentElement.style.setProperty('--accent-rgb', `${r},${g},${b}`);
}
```

### Vibe font loading
Same mechanism as artist profile. On page load, if `profile.vibe` is set:
```javascript
const VIBE_FONTS = {
  electronic: null,         // Barlow Condensed already loaded
  hiphop:     'Oswald:700',
  rnb:        'Cormorant+Garamond:600italic,600',
  indie:      'Space+Grotesk:700',
  pop:        null,
  rock:       'Oswald:700',
  acoustic:   'Lora:700',
};
const VIBE_FONT_FAMILY = {
  electronic: "'Barlow Condensed'",
  hiphop:     "'Oswald'",
  rnb:        "'Cormorant Garamond'",
  indie:      "'Space Grotesk'",
  pop:        "'Barlow Condensed'",
  rock:       "'Oswald'",
  acoustic:   "'Lora'",
};
```

---

## 4. TYPOGRAPHY SCALE

| Element | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Freelancer name | `var(--font-d)` | 36px | 700 | Barlow Condensed default; vibe override |
| Role + location | DM Sans | 14px | 400 | `--text-2` |
| Availability chip | DM Sans | 12px | 600 | pill format |
| Section header | DM Sans | 11px | 700 | uppercase, ls: 0.16em, `--text-3` |
| Section divider | DM Sans | 10px | 700 | uppercase label + ruled line |
| Credit release title | DM Sans | 14px | 500 | `--text` |
| Credit artist name | DM Sans | 13px | 400 | `--text-2` |
| Credit year | DM Sans | 12px | 400 | `--text-3` |
| Portfolio item title | DM Sans | 14px | 500 | `--text` |
| Portfolio item label | DM Sans | 12px | 400 | `--text-2` |
| Rate service name | DM Sans | 14px | 400 | `--text` |
| Rate price | DM Sans | 14px | 500 | `--text` or `var(--accent)` |
| Booking form label | DM Sans | 10px | 700 | uppercase, ls: 0.14em |
| Booking form input | DM Sans | 16px | 400 | **must be 16px on mobile — prevents iOS zoom** |
| CTA primary | DM Sans | 14px | 600 | |
| CTA secondary | DM Sans | 14px | 500 | |
| Bio text | DM Sans | 15px | 400 | `--text-2`, max-width: 320px |
| Empty state | DM Sans | 13px | 400 | `--text-3` |

---

## 5. LAYOUT ARCHITECTURE

### Mobile (base — 375px)
```
┌────────────────────────────────────────┐
│  HERO SECTION                          │  Section 1
│  avatar + name + role + availability   │
│  + hero CTAs + credit strip            │
├────────────────────────────────────────┤
│  CREDITS SECTION                       │  Section 2
│  confirmed-first sorted list           │
├────────────────────────────────────────┤
│  ARTISTS ON ABLE SECTION               │  Section 3
│  (hidden if < 2 confirmed ABLE credits)│
├────────────────────────────────────────┤
│  WORK SECTION (portfolio)              │  Section 4
│  audio facades + video facades         │
├────────────────────────────────────────┤
│  WORKING TOGETHER SECTION              │  Section 5
│  rate card + availability + response   │
├────────────────────────────────────────┤
│  FOOTER                                │
│  "Made with ABLE"                      │
└────────────────────────────────────────┘
│  BOOKING FORM (bottom sheet)           │  Overlaid
│  triggered by "Get in touch" CTA       │
└────────────────────────────────────────┘
```

### Global padding
```css
.fl-page {
  max-width: 480px;
  margin: 0 auto;
  padding: 0 20px 80px;
  background: var(--base);
  min-height: 100vh;
}

@media (max-width: 480px) {
  .fl-page { padding: 0 16px 80px; }
}
```

---

## 6. SECTION SPECS

### 6.1 HERO SECTION

```html
<section class="fl-hero" id="flHero" aria-label="Profile header">
  <!-- Avatar -->
  <div class="fl-avatar" id="flAvatar" aria-hidden="true">
    <!-- If avatar URL set: <img src="[url]" alt="[name]" width="80" height="80"> -->
    <!-- Fallback: initials monogram -->
    <div class="fl-avatar-monogram" style="background: rgba(var(--accent-rgb),0.18);">
      <span class="fl-avatar-initial" style="color: var(--accent);">M</span>
    </div>
  </div>

  <!-- Identity -->
  <h1 class="fl-name" id="flName">MAYA BEATS</h1>
  <p class="fl-role-loc" id="flRoleLoc">Producer · Manchester</p>

  <!-- Hero CTAs -->
  <div class="fl-hero-ctas" role="group" aria-label="Primary actions">
    <button class="fl-cta-primary" id="flCtaContact" aria-label="Get in touch with Maya">
      Get in touch
    </button>
    <button class="fl-cta-secondary" id="flCtaWork" aria-label="Hear the work">
      Hear the work
    </button>
  </div>

  <!-- Availability chip -->
  <div class="fl-avail-chip" id="flAvailChip" role="status" aria-label="Availability: Taking on work now">
    <span class="fl-avail-dot fl-avail-open" aria-hidden="true"></span>
    <span class="fl-avail-label" id="flAvailLabel">Taking on work now</span>
  </div>

  <!-- Hero credit strip (conditional: rendered only if ≥ 1 confirmed credit) -->
  <div class="fl-hero-credit-strip" id="flHeroCreditStrip" aria-label="Recent confirmed credits">
    <!-- max 3 items, generated from credits array -->
  </div>
</section>
```

#### Avatar CSS
```css
.fl-avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px;
  border: 2px solid var(--border-default);
  flex-shrink: 0;
}
.fl-avatar img { width: 100%; height: 100%; object-fit: cover; }
.fl-avatar-monogram {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.fl-avatar-initial {
  font-family: var(--font-d);
  font-size: 32px; font-weight: 700;
  line-height: 1;
}
```

#### Name CSS
```css
.fl-name {
  font-family: var(--font-d);
  font-size: 36px; font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--text);
  text-align: center;
  margin: 0 0 4px;
  text-transform: uppercase;
}
```

#### CTA CSS
```css
.fl-hero-ctas {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 16px 0 12px;
}

.fl-cta-primary {
  background: var(--accent);
  color: #000;
  border: none;
  border-radius: calc(var(--r-base) * var(--r-mult));
  padding: 12px 24px;
  font-family: var(--font);
  font-size: 14px; font-weight: 600;
  min-height: 44px;
  cursor: pointer;
  transition: transform 80ms ease, box-shadow 200ms ease;
  box-shadow: 0 0 0 rgba(var(--accent-rgb),0);
}
.fl-cta-primary:hover {
  box-shadow: 0 4px 20px rgba(var(--accent-rgb),0.3);
}
.fl-cta-primary:active { transform: scale(0.97); }

.fl-cta-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--border-default);
  border-radius: calc(var(--r-base) * var(--r-mult));
  padding: 12px 24px;
  font-family: var(--font);
  font-size: 14px; font-weight: 500;
  min-height: 44px;
  cursor: pointer;
  transition: transform 80ms ease, border-color 200ms ease;
}
.fl-cta-secondary:hover { border-color: var(--border-strong); }
.fl-cta-secondary:active { transform: scale(0.97); }
```

#### Availability chip CSS
```css
.fl-avail-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 100px;
  border: 1px solid var(--border-subtle);
  background: var(--surface-1);
  margin: 0 auto;
}
.fl-avail-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.fl-avail-open    { background: var(--avail-open); }
.fl-avail-limited { background: var(--avail-limited); }
.fl-avail-closed  { background: var(--avail-closed); }
.fl-avail-label {
  font-size: 12px; font-weight: 600;
  color: var(--text-2);
}
```

#### Hero credit strip CSS
```css
.fl-hero-credit-strip {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 14px 0 0;
  flex-wrap: wrap;
}
.fl-hero-credit-item {
  display: flex; align-items: center; gap: 6px;
  text-decoration: none;
  min-height: 44px; padding: 6px 0;
}
.fl-hero-credit-art {
  width: 32px; height: 32px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--surface-2);
}
.fl-hero-credit-name {
  font-size: 12px; font-weight: 500;
  color: var(--text-2);
}
.fl-hero-credit-more {
  font-size: 11px;
  color: var(--text-3);
  padding: 6px 0;
}
```

#### Hero credit strip JS
```javascript
function renderHeroCreditStrip(credits) {
  const confirmed = credits.filter(c => c.confirmed);
  const strip = document.getElementById('flHeroCreditStrip');
  if (confirmed.length === 0) { strip.style.display = 'none'; return; }

  const shown = confirmed.slice(0, 3);
  const remainder = confirmed.length - shown.length;

  strip.innerHTML = shown.map(c => `
    <a class="fl-hero-credit-item"
       href="${c.artistHandle ? `ablemusic.co/${c.artistHandle}` : '#'}"
       ${!c.artistHandle ? 'aria-disabled="true" tabindex="-1"' : ''}
       title="${c.releaseTitle} — ${c.artistName}">
      ${c.artworkUrl
        ? `<img class="fl-hero-credit-art" src="${c.artworkUrl}" alt="${c.releaseTitle}" width="32" height="32" loading="lazy">`
        : `<div class="fl-hero-credit-art fl-hero-credit-art-fallback" aria-hidden="true" style="display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--text-3);">${c.artistName[0]}</div>`
      }
      <span class="fl-hero-credit-name">${c.artistName}</span>
    </a>
  `).join('') + (remainder > 0 ? `<span class="fl-hero-credit-more">+ ${remainder} more</span>` : '');
}
```

---

### 6.2 SECTION DIVIDER (reusable)

```html
<div class="fl-section-divider" role="separator">
  <span class="fl-section-label">Credits</span>
  <span class="fl-section-rule" aria-hidden="true"></span>
</div>
```

```css
.fl-section-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 32px 0 16px;
}
.fl-section-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-3);
  white-space: nowrap;
  flex-shrink: 0;
}
.fl-section-rule {
  flex: 1;
  height: 1px;
  background: var(--border-faint);
}
```

---

### 6.3 CREDITS SECTION

```html
<section class="fl-credits-section" id="flCreditsSection" aria-label="Credits">
  <div class="fl-section-divider">
    <span class="fl-section-label">Credits</span>
    <span class="fl-section-rule" aria-hidden="true"></span>
  </div>

  <!-- Pending count note (visible if unverified credits exist) -->
  <p class="fl-credits-pending-note" id="flCreditsPendingNote" aria-live="polite">
    <!-- "[N] credit[s] awaiting confirmation" — generated by JS -->
  </p>

  <ul class="fl-credits-list" id="flCreditsList" role="list">
    <!-- credit rows generated by JS -->
  </ul>

  <button class="fl-credits-expand" id="flCreditsExpand" aria-expanded="false">
    <!-- "+ [N] more credits" — generated by JS -->
  </button>

  <!-- Empty state — rendered by JS if no credits at all -->
  <div class="fl-credits-empty" id="flCreditsEmpty" role="status">
    <p class="fl-empty-text">Credits appear here once artists confirm them.</p>
  </div>
</section>
```

#### Credit row HTML
```html
<li class="fl-credit-row confirmed" role="listitem">
  <a class="fl-credit-inner"
     href="ablemusic.co/nadia#release-dissolve"
     aria-label="Dissolve by Nadia, confirmed credit, 2026">

    <!-- Artwork -->
    <div class="fl-credit-art" aria-hidden="true">
      <img src="[artworkUrl]" alt="" width="36" height="36" loading="lazy">
    </div>

    <!-- Text block -->
    <div class="fl-credit-text">
      <span class="fl-credit-title">Dissolve</span>
      <span class="fl-credit-artist">Nadia</span>
    </div>

    <!-- Check badge -->
    <span class="fl-credit-check" aria-label="Confirmed by Nadia" role="img">✓</span>

    <!-- Year -->
    <span class="fl-credit-year">2026</span>
  </a>

  <!-- Optional: credit-linked audio sample (P1.2, added when portfolio_sample_id set) -->
  <!-- <div class="fl-credit-audio-strip" data-sample-id="[id]"> ... </div> -->
</li>

<!-- Unverified credit row -->
<li class="fl-credit-row unverified" role="listitem">
  <div class="fl-credit-inner" aria-label="Unravel EP by Novo Amor, awaiting confirmation, 2025">
    <div class="fl-credit-art" aria-hidden="true">
      <!-- artwork or fallback tile -->
    </div>
    <div class="fl-credit-text">
      <span class="fl-credit-title">Unravel EP</span>
      <span class="fl-credit-artist">Novo Amor</span>
    </div>
    <span class="fl-credit-pending-label" aria-label="Awaiting confirmation">·</span>
    <span class="fl-credit-year">2025</span>
  </div>
</li>
```

#### Credits CSS
```css
.fl-credits-list {
  list-style: none;
  margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 2px;
}

.fl-credit-row {
  border-radius: calc(var(--r-base) * 0.75);
  transition: background 150ms ease;
}
.fl-credit-row:hover { background: var(--surface-1); }

.fl-credit-inner {
  display: grid;
  grid-template-columns: 36px 1fr auto auto;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  min-height: 44px;
  text-decoration: none;
  color: inherit;
}

@media (max-width: 420px) {
  .fl-credit-inner {
    grid-template-columns: 36px 1fr auto;
  }
  .fl-credit-year { display: none; }
}

.fl-credit-art {
  width: 36px; height: 36px;
  border-radius: 4px;
  overflow: hidden;
  background: var(--surface-2);
  flex-shrink: 0;
}
.fl-credit-art img { width: 100%; height: 100%; object-fit: cover; display: block; }

.fl-credit-text {
  display: flex; flex-direction: column; gap: 1px;
  overflow: hidden;
}
.fl-credit-title {
  font-size: 14px; font-weight: 500;
  color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.fl-credit-artist {
  font-size: 12px; font-weight: 400;
  color: var(--text-2);
}

.fl-credit-check {
  font-size: 12px;
  color: var(--avail-open);
  flex-shrink: 0;
}
.fl-credit-year {
  font-size: 12px;
  color: var(--text-3);
  flex-shrink: 0;
}

/* Unverified state */
.fl-credit-row.unverified .fl-credit-inner {
  pointer-events: none;
  cursor: default;
}
.fl-credit-row.unverified .fl-credit-title { opacity: 0.55; }
.fl-credit-row.unverified .fl-credit-artist { opacity: 0.55; }
.fl-credit-pending-label {
  font-size: 11px;
  color: var(--text-4);
  letter-spacing: 0.1em;
}

/* Credits expand button */
.fl-credits-expand {
  width: 100%; padding: 10px;
  background: none; border: none;
  font-family: var(--font); font-size: 12px;
  color: var(--text-3); cursor: pointer;
  text-align: left; min-height: 44px;
}
.fl-credits-expand:hover { color: var(--text-2); }

/* Pending note */
.fl-credits-pending-note {
  font-size: 11px; color: var(--text-3);
  margin: 0 0 8px; letter-spacing: 0.04em;
}

/* Empty state */
.fl-credits-empty { padding: 16px 0; }
.fl-empty-text {
  font-size: 13px; color: var(--text-3); margin: 0;
}
```

#### Credits JS
```javascript
const CREDITS_INITIAL_COUNT = 4;

function renderCredits(credits) {
  const list = document.getElementById('flCreditsList');
  const expandBtn = document.getElementById('flCreditsExpand');
  const emptyEl = document.getElementById('flCreditsEmpty');
  const pendingNote = document.getElementById('flCreditsPendingNote');

  if (credits.length === 0) {
    list.style.display = 'none';
    expandBtn.style.display = 'none';
    emptyEl.style.display = 'block';
    pendingNote.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';

  // Sort: confirmed first, then unverified; within each group, most recent first
  const sorted = [...credits].sort((a, b) => {
    if (a.confirmed !== b.confirmed) return b.confirmed - a.confirmed;
    return b.year - a.year;
  });

  // Pending count note
  const pendingCount = credits.filter(c => !c.confirmed).length;
  if (pendingCount > 0) {
    pendingNote.textContent = `${pendingCount} credit${pendingCount > 1 ? 's' : ''} awaiting confirmation`;
    pendingNote.style.display = 'block';
  }

  const renderCredit = (c) => {
    const isLink = c.confirmed && c.artistHandle;
    const artworkHtml = c.artworkUrl
      ? `<img src="${c.artworkUrl}" alt="" width="36" height="36" loading="lazy">`
      : `<div style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--text-3);">${c.artistName[0]}</div>`;

    return `
      <li class="fl-credit-row ${c.confirmed ? 'confirmed' : 'unverified'}" role="listitem">
        ${isLink
          ? `<a class="fl-credit-inner" href="ablemusic.co/${c.artistHandle}" aria-label="${c.releaseTitle} by ${c.artistName}, ${c.confirmed ? 'confirmed credit' : 'awaiting confirmation'}, ${c.year}">`
          : `<div class="fl-credit-inner" aria-label="${c.releaseTitle} by ${c.artistName}, awaiting confirmation, ${c.year}">`
        }
          <div class="fl-credit-art" aria-hidden="true">${artworkHtml}</div>
          <div class="fl-credit-text">
            <span class="fl-credit-title">${c.releaseTitle}</span>
            <span class="fl-credit-artist">${c.artistName}</span>
          </div>
          ${c.confirmed
            ? `<span class="fl-credit-check" aria-label="Confirmed by ${c.artistName}" role="img">✓</span>`
            : `<span class="fl-credit-pending-label" aria-hidden="true"></span>`
          }
          <span class="fl-credit-year">${c.year}</span>
        ${isLink ? '</a>' : '</div>'}
      </li>`;
  };

  // Initial render: first CREDITS_INITIAL_COUNT
  list.innerHTML = sorted.slice(0, CREDITS_INITIAL_COUNT).map(renderCredit).join('');

  const remainder = sorted.length - CREDITS_INITIAL_COUNT;
  if (remainder > 0) {
    expandBtn.style.display = 'block';
    expandBtn.textContent = `+ ${remainder} more credit${remainder > 1 ? 's' : ''}`;
    expandBtn.setAttribute('aria-expanded', 'false');
    expandBtn.onclick = () => {
      list.innerHTML = sorted.map(renderCredit).join('');
      expandBtn.style.display = 'none';
      // Spring entrance on new rows
      list.querySelectorAll('.fl-credit-row:nth-child(n+5)').forEach((row, i) => {
        row.style.animation = `creditEnter 300ms var(--ease) ${i * 30}ms both`;
      });
    };
  } else {
    expandBtn.style.display = 'none';
  }
}
```

---

### 6.4 ARTISTS ON ABLE SECTION

Rendered only if `credits.filter(c => c.confirmed && c.artistHandle).length >= 2`.

```html
<section class="fl-artists-section" id="flArtistsSection" aria-label="Artists on ABLE">
  <div class="fl-section-divider">
    <span class="fl-section-label">Artists on ABLE</span>
    <span class="fl-section-rule" aria-hidden="true"></span>
  </div>
  <div class="fl-artists-row" id="flArtistsRow" role="list">
    <!-- avatar + name items generated by JS -->
  </div>
</section>
```

```css
.fl-artists-row {
  display: flex; flex-wrap: wrap;
  gap: 12px; align-items: center;
}
.fl-artist-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  text-decoration: none;
  min-width: 44px; min-height: 44px;
}
.fl-artist-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--surface-2);
  border: 1px solid var(--border-subtle);
}
.fl-artist-avatar img { width: 100%; height: 100%; object-fit: cover; }
.fl-artist-name {
  font-size: 11px; color: var(--text-3);
  max-width: 52px; text-align: center;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.fl-artists-more {
  font-size: 12px; color: var(--text-3);
  align-self: center;
}
```

---

### 6.5 PORTFOLIO (WORK) SECTION

```html
<section class="fl-work-section" id="flWorkSection" aria-label="Work samples">
  <div class="fl-section-divider">
    <span class="fl-section-label">Work</span>
    <span class="fl-section-rule" aria-hidden="true"></span>
  </div>

  <div class="fl-portfolio-list" id="flPortfolioList">
    <!-- portfolio items generated by JS -->
  </div>

  <!-- Empty state -->
  <div class="fl-work-empty" id="flWorkEmpty" style="display:none;">
    <p class="fl-empty-text">No samples yet.</p>
    <p class="fl-empty-sub">Check back soon.</p>
  </div>
</section>
```

#### Audio portfolio item (facade pattern)
```html
<div class="fl-portfolio-item fl-portfolio-audio"
     data-url="[soundcloud-url]"
     data-loaded="false"
     data-title="[track title]"
     data-label="[freelancer label]">

  <!-- Facade: visible until tapped -->
  <div class="fl-audio-facade" role="button" tabindex="0"
       aria-label="Play: [track title] — [label]">
    <!-- Static decorative waveform -->
    <div class="fl-facade-waveform" aria-hidden="true">
      <span class="fl-wbar"></span><span class="fl-wbar"></span>
      <span class="fl-wbar"></span><span class="fl-wbar"></span>
      <span class="fl-wbar"></span><span class="fl-wbar"></span>
      <span class="fl-wbar"></span><span class="fl-wbar"></span>
    </div>
    <!-- Play button -->
    <div class="fl-facade-play" aria-hidden="true">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M6 4l12 6-12 6V4z" fill="currentColor"/>
      </svg>
    </div>
    <div class="fl-facade-meta">
      <span class="fl-facade-title">[track title]</span>
      <span class="fl-facade-label">[freelancer label]</span>
    </div>
  </div>

  <!-- Embed target: populated on tap -->
  <div class="fl-audio-embed-target"></div>
</div>
```

#### Video portfolio item (facade pattern)
```html
<div class="fl-portfolio-item fl-portfolio-video"
     data-video-id="[youtube-id]"
     data-loaded="false">
  <div class="fl-video-facade" role="button" tabindex="0" aria-label="Play video: [title]">
    <img class="fl-video-thumb"
         src="https://img.youtube.com/vi/[youtube-id]/mqdefault.jpg"
         alt="[title]" loading="lazy">
    <div class="fl-facade-play fl-video-play" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M8 5l13 7-13 7V5z" fill="currentColor"/>
      </svg>
    </div>
    <div class="fl-facade-meta">
      <span class="fl-facade-title">[title]</span>
      <span class="fl-facade-label">[label]</span>
    </div>
  </div>
  <div class="fl-video-embed-target"></div>
</div>
```

#### Portfolio CSS
```css
.fl-portfolio-list {
  display: flex; flex-direction: column; gap: 10px;
}

.fl-portfolio-item {
  border-radius: calc(var(--r-base) * var(--r-mult));
  border: 1px solid var(--border-subtle);
  background: var(--surface-1);
  overflow: hidden;
}

/* Audio facade */
.fl-audio-facade {
  display: grid;
  grid-template-columns: 60px auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  min-height: 60px;
}
.fl-audio-facade:hover { background: var(--surface-2); }
.fl-audio-facade:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

.fl-facade-waveform {
  display: flex; align-items: flex-end; gap: 2px;
  height: 28px;
}
.fl-wbar {
  width: 4px;
  background: var(--accent);
  border-radius: 2px;
  opacity: 0.4;
}
.fl-wbar:nth-child(1)  { height: 40%; }
.fl-wbar:nth-child(2)  { height: 70%; }
.fl-wbar:nth-child(3)  { height: 100%; }
.fl-wbar:nth-child(4)  { height: 60%; }
.fl-wbar:nth-child(5)  { height: 80%; }
.fl-wbar:nth-child(6)  { height: 50%; }
.fl-wbar:nth-child(7)  { height: 90%; }
.fl-wbar:nth-child(8)  { height: 40%; }

.fl-facade-play {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(var(--accent-rgb), 0.15);
  border: 1px solid rgba(var(--accent-rgb), 0.3);
  display: flex; align-items: center; justify-content: center;
  color: var(--accent);
  flex-shrink: 0;
}

.fl-facade-meta {
  display: flex; flex-direction: column; gap: 2px;
  overflow: hidden;
}
.fl-facade-title {
  font-size: 14px; font-weight: 500;
  color: var(--text);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.fl-facade-label {
  font-size: 12px; color: var(--text-2);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

/* Embed containers */
.fl-audio-embed-target iframe,
.fl-video-embed-target iframe {
  width: 100%; display: block; border: none;
}
.fl-audio-embed-target iframe { height: 116px; }
.fl-video-embed-target iframe { aspect-ratio: 16/9; height: auto; }

/* Video facade */
.fl-video-facade {
  position: relative;
  cursor: pointer;
}
.fl-video-thumb {
  width: 100%; display: block;
  aspect-ratio: 16/9; object-fit: cover;
}
.fl-video-play {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 48px; height: 48px;
  background: rgba(0,0,0,0.6);
  border-radius: 50%;
  color: white;
}

/* Playing state — waveform animation */
.fl-portfolio-item.playing .fl-wbar {
  opacity: 1;
}
.fl-portfolio-item.playing .fl-wbar:nth-child(1) { animation: wavePulse 1.2s ease-in-out 0.00s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(2) { animation: wavePulse 1.2s ease-in-out 0.08s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(3) { animation: wavePulse 1.2s ease-in-out 0.16s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(4) { animation: wavePulse 1.2s ease-in-out 0.24s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(5) { animation: wavePulse 1.2s ease-in-out 0.10s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(6) { animation: wavePulse 1.2s ease-in-out 0.18s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(7) { animation: wavePulse 1.2s ease-in-out 0.26s infinite; }
.fl-portfolio-item.playing .fl-wbar:nth-child(8) { animation: wavePulse 1.2s ease-in-out 0.06s infinite; }

@keyframes wavePulse {
  0%, 100% { transform: scaleY(0.3); }
  50%       { transform: scaleY(1.0); }
}
```

#### Portfolio embed JS
```javascript
function initPortfolioFacades() {
  document.querySelectorAll('.fl-audio-facade').forEach(facade => {
    facade.addEventListener('click', () => loadAudioEmbed(facade.closest('.fl-portfolio-item')));
    facade.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadAudioEmbed(facade.closest('.fl-portfolio-item'));
      }
    });
  });

  document.querySelectorAll('.fl-video-facade').forEach(facade => {
    facade.addEventListener('click', () => loadVideoEmbed(facade.closest('.fl-portfolio-item')));
  });
}

function loadAudioEmbed(item) {
  if (item.dataset.loaded === 'true') return;
  item.dataset.loaded = 'true';
  item.classList.add('playing');

  const facade = item.querySelector('.fl-audio-facade');
  facade.style.display = 'none';

  const accent = getComputedStyle(document.documentElement)
    .getPropertyValue('--accent').trim().replace('#', '');

  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '116';
  iframe.scrolling = 'no';
  iframe.allow = 'autoplay';
  iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(item.dataset.url)}&color=%23${accent}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`;

  item.querySelector('.fl-audio-embed-target').appendChild(iframe);
}

function loadVideoEmbed(item) {
  if (item.dataset.loaded === 'true') return;
  item.dataset.loaded = 'true';

  const facade = item.querySelector('.fl-video-facade');
  facade.style.display = 'none';

  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'width:100%;aspect-ratio:16/9;border:none;display:block;';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  iframe.src = `https://www.youtube.com/embed/${item.dataset.videoId}?autoplay=1&rel=0&modestbranding=1`;

  item.querySelector('.fl-video-embed-target').appendChild(iframe);
}
```

---

### 6.6 WORKING TOGETHER SECTION (Rate Card)

```html
<section class="fl-rates-section" id="flRatesSection" aria-label="Rates and availability">
  <div class="fl-section-divider">
    <span class="fl-section-label">Working together</span>
    <span class="fl-section-rule" aria-hidden="true"></span>
  </div>

  <div class="fl-rates-list" id="flRatesList">
    <!-- service rows generated by JS -->
  </div>
</section>
```

```html
<!-- Rate row — generated per service -->
<div class="fl-rate-row" role="row">
  <span class="fl-rate-service">Production</span>
  <span class="fl-rate-price">From £300/track</span>
</div>

<!-- Divider row before availability -->
<hr class="fl-rate-divider" aria-hidden="true">

<!-- Availability row -->
<div class="fl-rate-row" role="row">
  <span class="fl-rate-service">Availability</span>
  <span class="fl-rate-avail taking-on">Taking on work now</span>
</div>

<!-- Response time row (optional) -->
<div class="fl-rate-row" role="row">
  <span class="fl-rate-service">Response time</span>
  <span class="fl-rate-price">Usually within 2 days</span>
</div>
```

```css
.fl-rates-list {
  display: flex; flex-direction: column; gap: 0;
  background: var(--surface-1);
  border-radius: calc(var(--r-base) * var(--r-mult));
  border: 1px solid var(--border-subtle);
  overflow: hidden;
}

.fl-rate-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  min-height: 44px;
}
.fl-rate-row + .fl-rate-row {
  border-top: 1px solid var(--border-faint);
}

.fl-rate-service {
  font-size: 14px; font-weight: 400;
  color: var(--text-2);
}
.fl-rate-price {
  font-size: 14px; font-weight: 500;
  color: var(--text);
  text-align: right;
}
.fl-rate-avail {
  font-size: 14px; font-weight: 500;
  text-align: right;
}
.fl-rate-avail.taking-on  { color: var(--avail-open); }
.fl-rate-avail.selective  { color: var(--avail-limited); }
.fl-rate-avail.not-booking { color: var(--text-3); }

.fl-rate-divider {
  border: none;
  border-top: 1px solid var(--border-subtle);
  margin: 0;
}
```

---

### 6.7 BOOKING FORM (Bottom Sheet)

```html
<!-- Bottom sheet — hidden by default -->
<div class="fl-sheet-overlay" id="flSheetOverlay" aria-hidden="true"></div>

<div class="fl-booking-sheet" id="flBookingSheet"
     role="dialog"
     aria-modal="true"
     aria-label="Get in touch with Maya"
     aria-hidden="true">

  <div class="fl-sheet-handle" aria-hidden="true"></div>

  <div class="fl-sheet-head">
    <span class="fl-sheet-title" id="flSheetTitle">Get in touch with Maya</span>
    <button class="fl-sheet-close"
            id="flSheetClose"
            aria-label="Close booking form">×</button>
  </div>

  <form class="fl-booking-form" id="flBookingForm" novalidate>
    <div class="fl-field">
      <label class="fl-field-label" for="enquiryName">YOUR NAME</label>
      <input class="fl-field-input" type="text" id="enquiryName"
             name="name" autocomplete="name" required
             aria-required="true" placeholder="">
    </div>
    <div class="fl-field">
      <label class="fl-field-label" for="enquiryEmail">YOUR EMAIL</label>
      <input class="fl-field-input" type="email" id="enquiryEmail"
             name="email" autocomplete="email" required
             aria-required="true" placeholder="">
    </div>
    <div class="fl-field">
      <label class="fl-field-label" for="enquiryProject">WHAT YOU'RE WORKING ON</label>
      <input class="fl-field-input" type="text" id="enquiryProject"
             name="project" maxlength="120" required
             aria-required="true"
             placeholder="EP, single, live session — the basics">
    </div>
    <div class="fl-field">
      <label class="fl-field-label" for="enquiryAsk">WHAT YOU NEED</label>
      <textarea class="fl-field-input fl-field-textarea"
                id="enquiryAsk" name="ask" maxlength="280" required
                aria-required="true"
                placeholder="What are you looking for from Maya?"
                rows="3"></textarea>
    </div>
    <div class="fl-field">
      <label class="fl-field-label" for="enquiryHandle">YOUR ABLE PAGE (OPTIONAL)</label>
      <div class="fl-handle-input-wrap">
        <span class="fl-handle-prefix" aria-hidden="true">ablemusic.co/</span>
        <input class="fl-field-input fl-handle-field" type="text" id="enquiryHandle"
               name="handle" autocomplete="off"
               placeholder="your-handle"
               aria-describedby="enquiryHandleHint">
      </div>
      <p class="fl-field-hint" id="enquiryHandleHint">
        Maya can see your page before deciding whether to reply.
      </p>
    </div>

    <button type="submit" class="fl-submit-btn" id="flSubmitBtn">Send</button>

    <!-- Success state (hidden until submitted) -->
    <p class="fl-form-success" id="flFormSuccess" role="alert" aria-live="assertive"
       style="display:none;">
      Sent. Maya will get back to you.
    </p>

    <!-- Rate limit message -->
    <p class="fl-form-ratelimit" id="flFormRateLimit" role="alert"
       style="display:none;">
      Maya receives a lot of enquiries. Try again tomorrow.
    </p>
  </form>
</div>
```

#### Booking sheet CSS
```css
.fl-sheet-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 300;
  opacity: 0; pointer-events: none;
  transition: opacity 300ms var(--ease);
}
.fl-sheet-overlay.open {
  opacity: 1; pointer-events: all;
}

.fl-booking-sheet {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  max-height: 90vh;
  background: var(--surface-2);
  border-radius: 20px 20px 0 0;
  border-top: 1px solid var(--border-subtle);
  z-index: 301;
  padding: 0 20px calc(20px + env(safe-area-inset-bottom));
  overflow-y: auto;
  overscroll-behavior: contain;
  transform: translateY(100%);
  transition: transform 350ms var(--ease);
}
.fl-booking-sheet.open {
  transform: translateY(0);
}

.fl-sheet-handle {
  width: 36px; height: 4px;
  background: var(--border-default);
  border-radius: 2px;
  margin: 12px auto 0;
}

.fl-sheet-head {
  display: flex; justify-content: space-between;
  align-items: center;
  padding: 16px 0 20px;
}
.fl-sheet-title {
  font-size: 16px; font-weight: 600;
  color: var(--text);
}
.fl-sheet-close {
  width: 32px; height: 32px;
  background: var(--surface-3);
  border: none; border-radius: 50%;
  font-size: 18px; color: var(--text-2);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  min-height: 44px; min-width: 44px;
}

/* Fields */
.fl-booking-form { display: flex; flex-direction: column; gap: 16px; }
.fl-field { display: flex; flex-direction: column; gap: 6px; }
.fl-field-label {
  font-family: var(--font); font-size: 10px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--text-3);
}
.fl-field-input {
  background: var(--surface-3);
  border: 1px solid var(--border-subtle);
  border-radius: calc(var(--r-base) * 0.75);
  padding: 12px 14px;
  font-family: var(--font); font-size: 16px; /* 16px — prevents iOS zoom */
  color: var(--text);
  width: 100%; box-sizing: border-box;
  transition: border-color 150ms ease;
  min-height: 44px;
}
.fl-field-input:focus {
  outline: none;
  border-color: rgba(var(--accent-rgb), 0.5);
}
.fl-field-textarea { resize: none; min-height: 80px; }

/* Handle input with prefix */
.fl-handle-input-wrap {
  display: flex; align-items: center;
  background: var(--surface-3);
  border: 1px solid var(--border-subtle);
  border-radius: calc(var(--r-base) * 0.75);
  overflow: hidden;
}
.fl-handle-prefix {
  padding: 12px 0 12px 14px;
  font-size: 16px; color: var(--text-3);
  white-space: nowrap; flex-shrink: 0;
}
.fl-handle-field {
  background: transparent;
  border: none; border-radius: 0;
  padding: 12px 14px 12px 2px;
  flex: 1;
}
.fl-handle-field:focus { outline: none; }

.fl-field-hint {
  font-size: 11px; color: var(--text-3);
  margin: 0;
}

/* Submit button */
.fl-submit-btn {
  width: 100%;
  background: var(--accent);
  color: #000;
  border: none;
  border-radius: calc(var(--r-base) * var(--r-mult));
  padding: 14px;
  font-family: var(--font); font-size: 14px; font-weight: 600;
  cursor: pointer;
  min-height: 48px;
  transition: transform 80ms ease, box-shadow 200ms ease;
  margin-top: 4px;
}
.fl-submit-btn:active { transform: scale(0.98); }
.fl-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* Send animation */
.fl-submit-btn.sending::after {
  content: ''; position: absolute; inset: 0;
  background: var(--accent);
  border-radius: inherit;
  animation: sendFill 400ms var(--ease) both;
  transform-origin: left;
}
@keyframes sendFill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

/* Success / error messages */
.fl-form-success, .fl-form-ratelimit {
  text-align: center; padding: 12px 0;
  font-size: 14px;
}
.fl-form-success  { color: var(--avail-open); }
.fl-form-ratelimit { color: var(--text-3); }
```

#### Booking sheet JS
```javascript
function openBookingSheet() {
  const sheet = document.getElementById('flBookingSheet');
  const overlay = document.getElementById('flSheetOverlay');

  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // iOS: explicit focus on first field
  requestAnimationFrame(() => {
    document.getElementById('enquiryName').focus();
  });
}

function closeBookingSheet() {
  const sheet = document.getElementById('flBookingSheet');
  const overlay = document.getElementById('flSheetOverlay');

  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Return focus to trigger button
  document.getElementById('flCtaContact').focus();
}

// Handle validation on submit
document.getElementById('flBookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('flSubmitBtn');
  if (btn.disabled) return;

  const name    = document.getElementById('enquiryName').value.trim();
  const email   = document.getElementById('enquiryEmail').value.trim();
  const project = document.getElementById('enquiryProject').value.trim();
  const ask     = document.getElementById('enquiryAsk').value.trim();
  const handle  = document.getElementById('enquiryHandle').value.trim();

  if (!name || !email || !project || !ask) return; // HTML5 required handles display

  btn.disabled = true;
  btn.textContent = 'Sending...';

  // V1: localStorage storage (replace with Netlify function when backend is live)
  const enquiry = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36),
    from_name: name,
    from_email: email,
    project,
    ask,
    able_handle: handle || null,
    ts: Date.now(),
    read: false,
    archived: false
  };

  const existing = JSON.parse(localStorage.getItem('able_booking_enquiries') || '[]');
  existing.push(enquiry);
  localStorage.setItem('able_booking_enquiries', JSON.stringify(existing));

  // Simulate network delay in v1
  await new Promise(r => setTimeout(r, 400));

  // Success state
  const profile = JSON.parse(localStorage.getItem('able_freelancer_profile') || '{}');
  const firstName = (profile.name || '').split(' ')[0] || 'them';
  document.getElementById('flFormSuccess').textContent = `Sent. ${firstName} will get back to you.`;
  document.getElementById('flFormSuccess').style.display = 'block';
  document.getElementById('flBookingForm').querySelectorAll('.fl-field').forEach(f => f.style.display = 'none');
  btn.style.display = 'none';

  // Close sheet after 2.5s
  setTimeout(closeBookingSheet, 2500);
});

// ABLE handle field: strip full URLs, allow only handle characters
document.getElementById('enquiryHandle').addEventListener('input', function() {
  this.value = this.value
    .replace(/^https?:\/\/(www\.)?able\.fm\/?/, '')
    .replace(/[^a-z0-9\-_]/gi, '');
});

// Keyboard: close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const sheet = document.getElementById('flBookingSheet');
    if (sheet.classList.contains('open')) closeBookingSheet();
  }
});

// Close on overlay tap
document.getElementById('flSheetOverlay').addEventListener('click', closeBookingSheet);
document.getElementById('flSheetClose').addEventListener('click', closeBookingSheet);

// Open on hero CTA tap
document.getElementById('flCtaContact').addEventListener('click', openBookingSheet);

// Scroll to work on secondary CTA tap
document.getElementById('flCtaWork').addEventListener('click', () => {
  document.getElementById('flWorkSection').scrollIntoView({ behavior: 'smooth' });
});
```

---

## 7. STATE SYSTEM (Availability)

Three availability states. Stored in `profile.availability`:

| State | Value | Display | Chip colour |
|---|---|---|---|
| Taking on work now | `'open'` | "Taking on work now" | `var(--avail-open)` — dusty sage |
| Selective right now | `'limited'` | "Selective right now" | `var(--avail-limited)` — amber |
| Not booking at the moment | `'closed'` | "Not booking at the moment" | dim, no dot |

### Auto-expiry logic (run on admin page load)
```javascript
function getEffectiveAvailability(profile) {
  if (!profile.availabilitySetAt) return profile.availability || 'open';
  const daysSince = (Date.now() - profile.availabilitySetAt) / 86400000;
  if (profile.availability === 'open' && daysSince > 30) return 'limited';
  return profile.availability || 'open';
}
```

The public profile always calls `getEffectiveAvailability(profile)` rather than reading `profile.availability` directly. This ensures auto-expiry is reflected even before the admin notifies the freelancer.

### Admin availability update
The floating edit pill (admin mode only) provides one-tap state change. Tapping "Update" opens a compact action sheet with the three options. Tapping any option updates `profile.availability`, sets `profile.availabilitySetAt = Date.now()`, saves to localStorage, and updates the availability chip live.

---

## 8. DATA SHAPE

### `able_freelancer_profile` (localStorage)
```javascript
{
  profileType: 'freelancer',          // always 'freelancer' on freelancer.html
  name: 'Maya Beats',
  handle: 'mayabeats',
  role: ['producer', 'mixer'],        // role taxonomy: see below
  location: 'Manchester',
  bio: 'I make records. Primarily indie and alternative.',
  accent: '#c9b76c',
  theme: 'dark',                      // 'dark' | 'light' | 'glass' | 'contrast'
  vibe: 'indie',                      // 7-vibe system, same as artist profile
  avatar: null,                       // URL or null
  availability: 'open',               // 'open' | 'limited' | 'closed'
  availabilitySetAt: 1741875600000,   // Unix ms timestamp
  responseTime: 'Usually within 2 days',  // null if not set
  bookingCTA: { type: 'form' },       // 'form' | 'link'
  bookingUrl: null,                   // if type === 'link'
  rateCard: {
    shown: true,
    services: [
      { name: 'Production', type: 'fixed', price: 'From £300/track' },
      { name: 'Mixing',     type: 'range', price: '£150–£250/track' },
      { name: 'Full EP',    type: 'open',  price: "Let's talk" }
    ]
  },
  portfolio: [
    {
      id: 'abc123',
      type: 'audio',                  // 'audio' | 'video' | 'photo'
      url: 'https://soundcloud.com/mayabeats/dissolve',
      videoId: null,                  // YouTube video ID if type === 'video'
      label: 'Production and arrangement for Nadia\'s debut single',
      creditId: 'dissolve-nadia'     // optional link to a credit
    }
  ],
  credits: [
    {
      id: 'dissolve-nadia',
      releaseTitle: 'Dissolve',
      artistName: 'Nadia',
      artistHandle: 'nadia',          // null if artist not on ABLE
      role: 'producer',
      year: 2026,
      confirmed: true,
      confirmedAt: 1741875600000,
      artworkUrl: 'https://...',      // null if not available
      releaseId: 'nadia-dissolve',    // ABLE release ID if linked
      portfolioSampleId: 'abc123',    // null if no linked audio sample
      correctionNote: null            // populated if artist said "not quite"
    }
  ]
}
```

### Role taxonomy (complete)
```
producer | co-producer | executive-producer
mixing-engineer | mastering-engineer | recording-engineer
session-musician | session-vocalist
videographer | photographer | director
graphic-designer | artwork
songwriter | arranger
other
```

### `able_booking_enquiries` (localStorage — V1; Supabase table in production)
```javascript
[{
  id: 'nanoid',
  from_name: 'Alex',
  from_email: 'alex@example.com',
  project: 'Debut EP, 6 tracks, post-punk / art-rock',
  ask: 'Production and arrangement.',
  able_handle: 'alex-music',         // null if not provided
  ts: 1741875600000,
  read: false,
  archived: false
}]
```

---

## 9. TIER GATING

| Feature | Free | Pro (£9/mo) |
|---|---|---|
| Live profile | Yes | Yes |
| Portfolio items | Max 2 | Unlimited |
| Credits (display) | 1 unverified | Unlimited (confirmed + unverified) |
| Booking form + enquiry sent to email | Yes | Yes |
| Booking enquiry inbox (admin) | No | Yes |
| Availability auto-expiry + nudge | Yes (basic) | Yes + reminder system |
| Analytics (views, sources) | No | Yes |
| Hero credit strip | Only if ≥ 1 confirmed | Yes |
| Artists on ABLE section | Only if ≥ 2 confirmed | Yes |

### Pro gate visual (when a Pro feature is encountered by a Free user in admin)
```html
<div class="fl-pro-gate" role="status">
  <span class="fl-pro-badge">Pro</span>
  <span class="fl-pro-text">See all your enquiries in one place.</span>
  <a class="fl-pro-link" href="/upgrade">See what Pro includes →</a>
</div>
```
```css
.fl-pro-gate {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  background: rgba(var(--accent-rgb), 0.06);
  border: 1px solid rgba(var(--accent-rgb), 0.15);
  border-radius: calc(var(--r-base) * 0.75);
  filter: blur(0px); /* never blur real content — just gate it */
}
.fl-pro-badge {
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--accent-border);
  padding: 2px 6px; border-radius: 4px;
  flex-shrink: 0;
}
```

---

## 10. INTERACTIONS — COMPLETE SPEC

### Every interaction with timing and easing

| Interaction | Trigger | Duration | Easing | Effect |
|---|---|---|---|---|
| CTA primary press | touchstart / mousedown | 80ms | ease | `scale(0.97)` |
| CTA primary release | touchend / mouseup | 200ms | `var(--spring)` | `scale(1)` with bounce |
| Booking sheet open | Button tap | 350ms | `var(--ease)` | translateY(100%) → translateY(0) |
| Overlay fade in | Sheet open | 300ms | `var(--ease)` | opacity 0 → 0.5 |
| Booking sheet close | Escape / close tap | 300ms | `var(--ease)` | translateY(0) → translateY(100%) |
| Credits list expand | "Show more" tap | 300ms staggered | `var(--ease)` | `creditEnter` animation per row |
| Credit confirmed transition | Status update | 400ms | `var(--ease)` | `creditConfirm` — slide + opacity |
| Check badge appear | Credit confirmed | 300ms | `var(--spring)` | `scale(0) → scale(1)` |
| Audio embed load | Facade tap | instant | — | Facade hide; iframe inject |
| Waveform pulse (playing) | Embed loaded | 1.2s loop | ease-in-out | Staggered bar scaleY |
| Form submit — sending | Send tap | 500ms | `var(--ease)` | Button text "Sending..." |
| Form submit — success | After 500ms | 200ms | `var(--spring)` | Success message fadeSlide in |
| Bottom sheet close after success | 2.5s after success | 350ms | `var(--ease)` | Sheet slides down |
| Availability chip update | Admin mode tap | 260ms | `var(--spring)` | `availActivate` spring |
| Section hover | Mouse enter | 150ms | ease | Background `var(--surface-1)` |
| Hero credit strip appear | Page load (conditional) | 400ms | `var(--ease)` | `fadeSlide` entrance |

### Animation keyframes (all)
```css
@keyframes creditEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes creditConfirm {
  0%   { opacity: 0.55; transform: translateX(0); }
  30%  { opacity: 1;    transform: translateX(3px); }
  60%  { opacity: 1;    transform: translateX(-1px); }
  100% { opacity: 1;    transform: translateX(0); }
}

@keyframes checkAppear {
  from { transform: scale(0); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

@keyframes availActivate {
  from { transform: scale(0.97); opacity: 0.7; }
  to   { transform: scale(1);    opacity: 1; }
}

@keyframes fadeSlide {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 11. THEME SUPPORT

All 4 themes must work. The freelancer profile uses the same theme system as able-v7.html (artist profile).

```javascript
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
```

```css
/* Dark (default) — no overrides needed, base tokens are dark */

[data-theme="light"] {
  --base:          #f0ede8;
  --base-mid:      #e8e4dd;
  --surface-1:     #ffffff;
  --surface-2:     #f5f2ee;
  --surface-3:     #ede9e2;
  --text:          #1a1a24;
  --text-2:        rgba(26,26,36,0.60);
  --text-3:        rgba(26,26,36,0.38);
  --text-4:        rgba(26,26,36,0.20);
  --border-faint:  rgba(26,26,36,0.04);
  --border-subtle: rgba(26,26,36,0.08);
  --border-default:rgba(26,26,36,0.12);
  --border-strong: rgba(26,26,36,0.22);
}

[data-theme="contrast"] {
  --base:          #000000;
  --surface-1:     #111111;
  --surface-2:     #191919;
  --text:          #ffffff;
  --text-2:        rgba(255,255,255,0.75);
  --text-3:        rgba(255,255,255,0.45);
  /* Other tokens scale proportionally */
}

[data-theme="glass"] {
  /* Same as dark tokens, but cards use backdrop-filter */
}
[data-theme="glass"] .fl-portfolio-item,
[data-theme="glass"] .fl-rates-list,
[data-theme="glass"] .fl-booking-sheet {
  background: rgba(20,18,16,0.6);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
}
[data-theme="glass"] .fl-avail-chip {
  background: rgba(20,18,16,0.8); /* more opaque for readability over blurred bg */
}
```

---

## 12. MOBILE BREAKPOINTS

```css
/* 375px base — all styles written mobile-first */

@media (max-width: 420px) {
  .fl-credit-inner {
    grid-template-columns: 36px 1fr auto;
  }
  .fl-credit-year { display: none; }
  .fl-name { font-size: 30px; }
}

@media (min-width: 480px) {
  .fl-page { padding: 0 24px 80px; }
  .fl-hero { padding-top: 20px; }
}

@media (min-width: 640px) {
  /* Side-by-side portfolio grid on wider screens */
  .fl-portfolio-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  /* Credits list can show year on wider screens */
  .fl-credit-year { display: block; }
}
```

---

## 13. BUILD PRIORITY (P0 / P1 / P2)

### P0 — Must ship for the page to work

| Component | Notes |
|---|---|
| Profile data load + render | `able_freelancer_profile` from localStorage |
| Identity header (name, role, location, availability chip) | Core |
| Hero CTAs (Get in touch + Hear the work) | Core |
| Credits section (confirmed + unverified display, expand) | Core — the whole reason the page exists |
| Booking form bottom sheet (4 + 1 optional fields) | Core conversion |
| Booking enquiry save to localStorage | V1 storage |
| Section dividers | Visual system |
| All 4 themes | System requirement |
| Vibe + accent loading | System requirement |
| Availability auto-expiry logic | Structural trust |
| Rate card display | Core |

### P1 — Must ship for the page to be compelling

| Component | Notes |
|---|---|
| Hero credit strip | Brings evidence above the fold |
| Portfolio section with facade pattern | No embed load on page load |
| Artists on ABLE section (conditional on ≥ 2 confirmed) | Auto-generated social proof |
| Audio facade → SoundCloud embed on tap | Performance + UX |
| Video facade → YouTube embed on tap | Performance + UX |
| Waveform playing animation | Micro-interaction |
| Booking form send animation + success state | Micro-interaction |
| Focus trap on booking sheet | Accessibility |
| iOS scroll-lock fix (`overscroll-behavior: contain`) | Bug fix |
| ABLE handle field sanitisation | Bug prevention |
| Credit confirmed animation (for real-time update) | Micro-interaction |

### P2 — Scale and enhancement

| Component | Notes |
|---|---|
| Credit-linked audio sample on credit row | P1.2 in PATH-TO-10.md |
| Analytics tracking (views, sources) | Requires backend |
| Real-time credit confirmation | Requires Supabase realtime |
| Source attribution (credit_link vs direct vs directory) | Requires backend |
| Testimonials section | Requires peer-confirmation variant |
| Freelancer admin variant (enquiry inbox) | P1.4 in PATH-TO-10.md |
| Last-active indicator | Requires server-side tracking |

---

## 14. PLAYWRIGHT TESTS

```javascript
// Test 1: Profile renders from localStorage
test('renders freelancer profile from localStorage', async ({ page }) => {
  await page.goto('/freelancer.html');
  await page.evaluate(() => {
    localStorage.setItem('able_freelancer_profile', JSON.stringify({
      profileType: 'freelancer',
      name: 'Maya Beats',
      role: ['producer', 'mixer'],
      location: 'Manchester',
      availability: 'open',
      availabilitySetAt: Date.now(),
      accent: '#c9b76c',
      theme: 'dark',
      credits: [],
      portfolio: [],
      rateCard: { shown: false, services: [] }
    }));
  });
  await page.reload();
  await expect(page.locator('.fl-name')).toHaveText('MAYA BEATS');
  await expect(page.locator('.fl-role-loc')).toContainText('Producer · Mixer');
  await expect(page.locator('.fl-avail-label')).toHaveText('Taking on work now');
});

// Test 2: Credits render — confirmed first
test('credits sort confirmed before unverified', async ({ page }) => {
  await page.evaluate(() => {
    const profile = JSON.parse(localStorage.getItem('able_freelancer_profile'));
    profile.credits = [
      { id: '1', releaseTitle: 'Unravel', artistName: 'Novo', year: 2025, confirmed: false },
      { id: '2', releaseTitle: 'Dissolve', artistName: 'Nadia', year: 2026, confirmed: true, artistHandle: 'nadia' }
    ];
    localStorage.setItem('able_freelancer_profile', JSON.stringify(profile));
  });
  await page.reload();
  const rows = page.locator('.fl-credit-row');
  const first = rows.first();
  await expect(first).toHaveClass(/confirmed/);
  await expect(first.locator('.fl-credit-title')).toHaveText('Dissolve');
});

// Test 3: Booking form opens, submits, shows confirmation
test('booking form flow', async ({ page }) => {
  await page.locator('#flCtaContact').click();
  await expect(page.locator('#flBookingSheet')).toHaveClass(/open/);
  await expect(page.locator('#enquiryName')).toBeFocused();
  await page.fill('#enquiryName', 'Test Artist');
  await page.fill('#enquiryEmail', 'test@ablemusic.co');
  await page.fill('#enquiryProject', 'Debut EP, 5 tracks, indie folk');
  await page.fill('#enquiryAsk', 'Looking for mixing and arrangement');
  await page.locator('#flSubmitBtn').click();
  await expect(page.locator('#flFormSuccess')).toBeVisible();
  await expect(page.locator('#flFormSuccess')).toContainText('Sent.');
});

// Test 4: Booking sheet closes on Escape
test('booking sheet closes on Escape key', async ({ page }) => {
  await page.locator('#flCtaContact').click();
  await expect(page.locator('#flBookingSheet')).toHaveClass(/open/);
  await page.keyboard.press('Escape');
  await expect(page.locator('#flBookingSheet')).not.toHaveClass(/open/);
  await expect(page.locator('#flCtaContact')).toBeFocused();
});

// Test 5: Portfolio facade — iframe not in DOM on load, injected on tap
test('portfolio facade lazy loads embed', async ({ page }) => {
  await page.evaluate(() => {
    const profile = JSON.parse(localStorage.getItem('able_freelancer_profile'));
    profile.portfolio = [{
      id: 'p1', type: 'audio',
      url: 'https://soundcloud.com/mayabeats/test',
      label: 'Test sample'
    }];
    localStorage.setItem('able_freelancer_profile', JSON.stringify(profile));
  });
  await page.reload();
  // No iframe on load
  await expect(page.locator('.fl-audio-embed-target iframe')).toHaveCount(0);
  // Tap facade
  await page.locator('.fl-audio-facade').first().click();
  // Iframe now present
  await expect(page.locator('.fl-audio-embed-target iframe')).toHaveCount(1);
});

// Test 6: Tap targets at 375px
test('all interactive elements meet 44px min height at 375px', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const selector of ['#flCtaContact', '#flCtaWork', '#flSubmitBtn', '#flSheetClose']) {
    const el = page.locator(selector).first();
    if (await el.isVisible()) {
      const box = await el.boundingBox();
      if (box) expect(box.height).toBeGreaterThanOrEqual(44);
    }
  }
});

// Test 7: All 4 themes load without error
test('theme compatibility', async ({ page }) => {
  for (const theme of ['dark', 'light', 'glass', 'contrast']) {
    await page.evaluate((t) => {
      const p = JSON.parse(localStorage.getItem('able_freelancer_profile'));
      p.theme = t;
      localStorage.setItem('able_freelancer_profile', JSON.stringify(p));
    }, theme);
    await page.reload();
    // No console errors
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.waitForLoadState('networkidle');
    expect(errors).toHaveLength(0);
    await page.screenshot({ path: `screenshots/freelancer-theme-${theme}.png`, fullPage: false });
  }
});

// Test 8: Credits expand / collapse
test('credits list expand button shows remaining credits', async ({ page }) => {
  await page.evaluate(() => {
    const profile = JSON.parse(localStorage.getItem('able_freelancer_profile'));
    profile.credits = Array.from({ length: 7 }, (_, i) => ({
      id: `c${i}`, releaseTitle: `Release ${i}`, artistName: `Artist ${i}`,
      year: 2025, confirmed: i < 5
    }));
    localStorage.setItem('able_freelancer_profile', JSON.stringify(profile));
  });
  await page.reload();
  // Initial: 4 visible
  await expect(page.locator('.fl-credit-row')).toHaveCount(4);
  // Expand
  await page.locator('#flCreditsExpand').click();
  // All 7 visible
  await expect(page.locator('.fl-credit-row')).toHaveCount(7);
});

// Test 9: Availability auto-expiry
test('availability auto-expiry: open → limited after 31 days', async ({ page }) => {
  await page.evaluate(() => {
    const profile = JSON.parse(localStorage.getItem('able_freelancer_profile'));
    profile.availability = 'open';
    profile.availabilitySetAt = Date.now() - (31 * 24 * 60 * 60 * 1000);
    localStorage.setItem('able_freelancer_profile', JSON.stringify(profile));
  });
  await page.reload();
  await expect(page.locator('.fl-avail-label')).toHaveText('Selective right now');
});

// Test 10: Hero credit strip renders when confirmed credits exist
test('hero credit strip renders with ≥ 1 confirmed credit', async ({ page }) => {
  await page.evaluate(() => {
    const profile = JSON.parse(localStorage.getItem('able_freelancer_profile'));
    profile.credits = [{
      id: 'c1', releaseTitle: 'Dissolve', artistName: 'Nadia', year: 2026,
      confirmed: true, artistHandle: 'nadia', artworkUrl: null
    }];
    localStorage.setItem('able_freelancer_profile', JSON.stringify(profile));
  });
  await page.reload();
  await expect(page.locator('#flHeroCreditStrip')).toBeVisible();
  await expect(page.locator('.fl-hero-credit-name')).toContainText('Nadia');
});
```

---

## 15. KNOWN ISSUES TO FIX BEFORE BUILD

1. **SoundCloud CORS on non-approved domains**: Test SoundCloud oEmbed from the production URL before deploying. The `w.soundcloud.com/player/` URL does not require approval, but the oEmbed endpoint for metadata can fail on new domains. Use the player URL directly (not the oEmbed API) for all audio items.

2. **iOS bottom sheet scroll lock**: Add `overscroll-behavior: contain` to `.fl-booking-sheet`. Without this, scrolling to the end of the form triggers iOS rubber-band scroll on the page behind the sheet.

3. **iOS input zoom on font-size < 16px**: All form inputs on the booking form must have `font-size: 16px`. The `.fl-field-input` rule covers this but any variant must be verified.

4. **Credit grid column overflow at 375px**: The 4-column credit grid (artwork / text / check / year) must collapse to 3 columns below 420px (hide year column). CSS breakpoint at `max-width: 420px` handles this — verify in Playwright at exact 375px viewport.

5. **Availability chip in Glass theme**: The chip background must be at least 80% opaque against blurred artwork backgrounds. `background: rgba(20,18,16,0.8)` is specified but should be visual-tested against high-contrast artwork colours.

6. **Focus trap completeness**: When the booking sheet is open, Tab and Shift+Tab must cycle only through elements within `#flBookingSheet`. A focus trap polyfill may be needed for older browsers. At minimum: last focusable element's `keydown` handler should redirect Tab back to first focusable element.

7. **`crypto.randomUUID` browser support**: The booking form uses `crypto.randomUUID()` for enquiry IDs. This is available in all modern browsers but not in Safari 14 or below. Fallback: `Date.now().toString(36) + Math.random().toString(36).slice(2)` — sufficient uniqueness for localStorage storage.

8. **Lazy loading on credit artwork images**: `loading="lazy"` must be set on all `<img>` tags within `.fl-credit-art` and `.fl-artists-row`. The JS template strings in `renderCredits()` and `renderHeroCreditStrip()` include this, but must be verified in the actual build output.
