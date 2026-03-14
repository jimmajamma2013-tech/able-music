# Guided Identity System — Onboarding + Admin Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the Guided Identity System into the artist-facing surfaces — a "how does your music feel?" step in the onboarding wizard (`start.html`) and a Profile Identity card with AI nudge buttons in the admin dashboard (`admin.html`).

**Architecture:** `start.html` already has a 4-step wizard; we insert a new step 2 (feel selection) between the existing name/vibe step and the colour step, shifting current steps 2–4 to 3–5. On save, `profile.identity` is written alongside the existing `able_v3_profile` key. In `admin.html`, a self-contained Profile Identity card is inserted after the Campaign HQ section — it reads `profile.identity` from localStorage, renders current genre/feel, and provides 5 nudge buttons that apply +1/-1 deltas to `profile.identity.refinements`.

**Tech Stack:** Vanilla JS, CSS custom properties, localStorage. No build step. Playwright MCP for verification.

---

## Chunk 1: `start.html` — feel step insertion

### Files
- Modify: `start.html` (HTML steps, step counter, `P` state object, `goStep`, save logic)

---

### Task 1: Add feel data and CSS to `start.html`

**Files:**
- Modify: `start.html` (CSS block, before `</style>`)

- [ ] **Step 1: Add feel option CSS**

Find the closing `</style>` tag in `start.html` and insert before it:

```css
/* ── FEEL GRID ── */
.feel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 4px;
}
.feel-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 14px 12px;
  border-radius: 10px;
  border: 1.5px solid var(--bm);
  background: var(--card);
  cursor: pointer;
  transition: border-color .18s, background .18s;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}
.feel-card:hover { border-color: rgba(255,255,255,.25); }
.feel-card.on {
  border-color: var(--acc);
  background: rgba(var(--acc-rgb), .08);
}
.feel-card__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text);
  line-height: 1.2;
}
.feel-card__desc {
  font-size: 11px;
  color: var(--t2);
  line-height: 1.4;
}
.feel-card.on .feel-card__label { color: var(--acc); }
```

- [ ] **Step 2: Verify CSS doesn't break parse**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('start.html','utf8');
const match = src.match(/<script>([\s\S]*?)<\/script>/g);
let ok = true;
(match||[]).forEach((b,i)=>{ try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block '+i+':',e.message);ok=false} });
console.log(ok?'OK':'FAIL');
"
```
Expected: `OK`

---

### Task 2: Insert the feel step HTML (new step 2)

**Files:**
- Modify: `start.html` (HTML between step 1 and current step 2)

The existing steps are numbered 1–4 in the HTML. We need to:
- Renumber old steps 2/3/4 → 3/4/5 in eyebrow text and button `onclick` targets
- Insert new step 2 (feel) between old step 1 and old step 2

- [ ] **Step 1: Renumber old step 2 eyebrow + back button**

Find:
```html
    <div class="step" id="step2">
      <div class="step-eyebrow">Step 2 of 4</div>
      <h1 class="step-title">Your<br>colour.</h1>
```
Replace with:
```html
    <div class="step" id="step3">
      <div class="step-eyebrow">Step 3 of 5</div>
      <h1 class="step-title">Your<br>colour.</h1>
```

Also update its nav buttons:
```html
      <div class="step-nav" style="margin-top:28px;">
        <button class="btn-back" onclick="goStep(1)">← Back</button>
        <button class="btn-next" onclick="goStep(3)">Continue →</button>
```
→
```html
      <div class="step-nav" style="margin-top:28px;">
        <button class="btn-back" onclick="goStep(2)">← Back</button>
        <button class="btn-next" onclick="goStep(4)">Continue →</button>
```

- [ ] **Step 2: Renumber old step 3**

Find:
```html
    <div class="step" id="step3">
      <div class="step-eyebrow">Step 3 of 4</div>
      <h1 class="step-title">How it<br>feels.</h1>
```
Replace with:
```html
    <div class="step" id="step4">
      <div class="step-eyebrow">Step 4 of 5</div>
      <h1 class="step-title">How it<br>feels.</h1>
```

Update nav:
```html
      <div class="step-nav">
        <button class="btn-back" onclick="goStep(2)">← Back</button>
        <button class="btn-next" onclick="goStep(4)">Continue →</button>
```
→
```html
      <div class="step-nav">
        <button class="btn-back" onclick="goStep(3)">← Back</button>
        <button class="btn-next" onclick="goStep(5)">Continue →</button>
```

- [ ] **Step 3: Renumber old step 4**

Find:
```html
    <div class="step" id="step4">
      <div class="step-eyebrow">Step 4 of 4</div>
      <h1 class="step-title">One thing,<br>front and centre.</h1>
```
Replace with:
```html
    <div class="step" id="step5">
      <div class="step-eyebrow">Step 5 of 5</div>
      <h1 class="step-title">One thing,<br>front and centre.</h1>
```

Update back button:
```html
        <button class="btn-back" onclick="goStep(3)">← Back</button>
        <button class="btn-next" onclick="tryStep4()">Create my page →</button>
```
→
```html
        <button class="btn-back" onclick="goStep(4)">← Back</button>
        <button class="btn-next" onclick="tryStep5()">Create my page →</button>
```

- [ ] **Step 4: Insert new step 2 (feel) HTML**

After the closing `</div>` of step 1 (after `<!-- STEP 2 -->` comment area, before old step 2 which is now step 3), insert:

```html
    <!-- STEP 2 — FEEL -->
    <div class="step" id="step2">
      <div class="step-eyebrow">Step 2 of 5</div>
      <h1 class="step-title">How does<br>your music feel?</h1>
      <p class="step-sub">This shapes how your page moves and carries itself — not just how it looks.</p>

      <div class="feel-grid" id="feelGrid">
        <button class="feel-card" data-feel="intimate-raw" onclick="selectFeel('intimate-raw')">
          <span class="feel-card__label">Stripped back</span>
          <span class="feel-card__desc">Personal, unfinished-on-purpose, close</span>
        </button>
        <button class="feel-card" data-feel="intimate-refined" onclick="selectFeel('intimate-refined')">
          <span class="feel-card__label">Warm and cinematic</span>
          <span class="feel-card__desc">Unhurried, warm, quietly premium</span>
        </button>
        <button class="feel-card" data-feel="bold-raw" onclick="selectFeel('bold-raw')">
          <span class="feel-card__label">Underground and direct</span>
          <span class="feel-card__desc">High contrast, no softening, forward</span>
        </button>
        <button class="feel-card" data-feel="bold-refined" onclick="selectFeel('bold-refined')">
          <span class="feel-card__label">Clean and confident</span>
          <span class="feel-card__desc">Polished, assured, editorial</span>
        </button>
      </div>

      <div class="step-nav">
        <button class="btn-back" onclick="goStep(1)">← Back</button>
        <button class="btn-next" onclick="goStep(3)">Continue →</button>
      </div>
    </div>
```

---

### Task 3: Update JS — state object, navigation, save

**Files:**
- Modify: `start.html` (JS block)

- [ ] **Step 1: Add `feel` to `P` state object**

Find:
```javascript
const P = {
  name:'', genre:'Electronic', bio:'', spotify:'',
  vibe:'electronic',
  accent:'#f4b942', theme:'dark',
```
Replace with:
```javascript
const P = {
  name:'', genre:'Electronic', bio:'', spotify:'',
  vibe:'electronic',
  feel:'bold-refined',
  accent:'#f4b942', theme:'dark',
```

- [ ] **Step 2: Add `selectFeel` function**

After `function tryStep1()` block, insert:

```javascript
function selectFeel(feel) {
  P.feel = feel;
  document.querySelectorAll('.feel-card').forEach(c => {
    c.classList.toggle('on', c.dataset.feel === feel);
  });
  // Apply feel to the live preview shell
  const previewShell = document.getElementById('previewShell');
  if (previewShell) previewShell.dataset.feel = feel;
}
```

- [ ] **Step 3: Rename `tryStep4` → `tryStep5`**

Find `function tryStep4()` and rename it to `function tryStep5()`. No other changes to the function body.

- [ ] **Step 4: Update `goStep` progress bar + indicator**

Find in `goStep`:
```javascript
  const num = n === 'done' ? 5 : Number(n);
  document.getElementById('progressFill').style.width = (num === 5 ? 100 : num*25) + '%';
  document.getElementById('stepInd').textContent = n === 'done' ? 'All done' : `Step ${n} of 4`;
```
Replace with:
```javascript
  const num = n === 'done' ? 6 : Number(n);
  document.getElementById('progressFill').style.width = (num >= 6 ? 100 : (num/5)*100) + '%';
  document.getElementById('stepInd').textContent = n === 'done' ? 'All done' : `Step ${n} of 5`;
```

- [ ] **Step 5: Write `profile.identity` on save**

In `goStep`, inside the `if (n === 'done')` block, find where `v3profile` is built and add the `identity` field:

Find:
```javascript
    const v3profile = {
      name:          P.name,
      handle:        slug(P.name),
      bio:           P.bio,
      vibe:          P.vibe,
      accent:        P.accent,
      theme:         P.theme,
      genres:        P.genre ? [P.genre] : [],
      stateOverride: null,
      ctaPrimary:    { label: P.ctaLabel,  url: P.ctaUrl    || '' },
      ctaSecondary:  { label: P.secLabel,  url: P.ctaSecUrl || '' },
      platforms:     P.spotify ? [{ label: 'Spotify', url: P.spotify, type: 'spotify' }] : [],
    };
```
Replace with:
```javascript
    const v3profile = {
      name:          P.name,
      handle:        slug(P.name),
      bio:           P.bio,
      vibe:          P.vibe,
      accent:        P.accent,
      theme:         P.theme,
      genres:        P.genre ? [P.genre] : [],
      stateOverride: null,
      ctaPrimary:    { label: P.ctaLabel,  url: P.ctaUrl    || '' },
      ctaSecondary:  { label: P.secLabel,  url: P.ctaSecUrl || '' },
      platforms:     P.spotify ? [{ label: 'Spotify', url: P.spotify, type: 'spotify' }] : [],
      identity: {
        genre:       P.vibe,
        feel:        P.feel || 'bold-refined',
        accent:      P.accent,
        accentSource:'artist',
        refinements: { darkness:0, spacing:0, sharpness:0, contrast:0, warmth:0 }
      },
    };
```

- [ ] **Step 6: Initialise feel card selection on page load**

At the bottom of the `DOMContentLoaded` / init block (near where `buildVibeGrid()` is called), add:

```javascript
  // Pre-select default feel card
  selectFeel(P.feel);
```

- [ ] **Step 7: Parse check**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('start.html','utf8');
const match = src.match(/<script>([\s\S]*?)<\/script>/g);
let ok = true;
(match||[]).forEach((b,i)=>{ try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block '+i+':',e.message);ok=false} });
console.log(ok?'OK':'FAIL');
"
```
Expected: `OK`

- [ ] **Step 8: Playwright smoke test — wizard flow**

```javascript
// Via Playwright MCP:
// 1. Navigate to file:///…/start.html
// 2. Snapshot — confirm "Step 1 of 5" in step indicator
// 3. Fill artist name input with "Test Artist"
// 4. Click "Continue →"
// 5. Snapshot — confirm step2 is active, feel cards visible
// 6. Click "Warm and cinematic" feel card
// 7. Snapshot — confirm .feel-card[data-feel="intimate-refined"].on present
// 8. Click "Continue →" (step 3 — colour)
// 9. Snapshot — confirm "Step 3 of 5" in eyebrow
```

- [ ] **Step 9: Commit**

```bash
git add start.html
git commit -m "feat(onboarding): insert feel step — wizard is now 5 steps

New step 2 'How does your music feel?' with 4 named quadrant options.
Saves profile.identity.feel to able_v3_profile on wizard completion.
Old steps 2-4 renumbered to 3-5."
```

---

## Chunk 2: `admin.html` — Profile Identity card

### Files
- Modify: `admin.html` (CSS, HTML card, JS init)

---

### Task 4: Add Profile Identity card CSS to `admin.html`

**Files:**
- Modify: `admin.html` (CSS block)

- [ ] **Step 1: Add identity card CSS**

Find the end of the `<style>` block in `admin.html` (before `</style>`) and insert:

```css
/* ── PROFILE IDENTITY CARD ── */
.identity-card {
  background: var(--card, #16181f);
  border-radius: 14px;
  padding: 18px 16px 16px;
  margin-bottom: 12px;
}
.identity-card__title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: var(--t2, rgba(255,255,255,.45));
  margin-bottom: 14px;
}
.identity-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid rgba(255,255,255,.06);
}
.identity-row:first-of-type { border-top: none; }
.identity-row__label {
  font-size: 12px;
  color: var(--t2, rgba(255,255,255,.45));
  font-weight: 500;
}
.identity-row__value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text, #fff);
}
.identity-row__change {
  font-size: 12px;
  color: var(--acc, #f4b942);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0 4px 12px;
  font-weight: 500;
}
.identity-row__change:hover { opacity: .75; }
.identity-nudges {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.nudge-btn {
  padding: 6px 13px;
  border-radius: 20px;
  border: 1.5px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  color: var(--text, #fff);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color .15s, background .15s;
}
.nudge-btn:hover {
  border-color: var(--acc, #f4b942);
  background: rgba(255,255,255,.07);
}
.nudge-btn.applied {
  border-color: var(--acc, #f4b942);
  color: var(--acc, #f4b942);
}
.identity-preview {
  margin-top: 14px;
  border-radius: 10px;
  overflow: hidden;
  height: 130px;
  background: var(--bg, #09090f);
  position: relative;
  border: 1px solid rgba(255,255,255,.07);
}
.identity-preview__label {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 10px;
  color: rgba(255,255,255,.4);
  font-weight: 500;
  letter-spacing: .04em;
}
.identity-preview__name {
  position: absolute;
  bottom: 22px;
  left: 10px;
  font-size: 22px;
  font-weight: var(--font-display-weight, 700);
  color: #fff;
  line-height: 1;
  letter-spacing: -.01em;
}
.identity-preview__accent {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--acc, #f4b942);
}
.identity-preview__feel {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 10px;
  color: var(--acc, #f4b942);
  font-weight: 600;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.identity-nudge-hint {
  font-size: 11px;
  color: var(--t2, rgba(255,255,255,.45));
  margin-top: 6px;
}
```

- [ ] **Step 2: Parse check**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('admin.html','utf8');
const match = src.match(/<script>([\s\S]*?)<\/script>/g);
let ok = true;
(match||[]).forEach((b,i)=>{ try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block '+i+':',e.message);ok=false} });
console.log(ok?'OK':'FAIL');
"
```
Expected: `OK`

---

### Task 5: Add Profile Identity card HTML to `admin.html`

**Files:**
- Modify: `admin.html` (HTML — after Campaign HQ section)

- [ ] **Step 1: Find insertion point**

Run to identify Campaign HQ closing tag:
```bash
grep -n "campaign-hq\|Campaign HQ\|<!-- end\|</section\|</div>.*hq" admin.html | head -20
```

The card goes immediately after the Campaign HQ `</div>` or `</section>` block, before any "Analytics" or "Fan list" sections.

- [ ] **Step 2: Insert card HTML**

At the identified insertion point, add:

```html
<!-- ── PROFILE IDENTITY CARD ── -->
<div class="identity-card" id="identityCard">
  <div class="identity-card__title">Profile Identity</div>

  <div class="identity-row">
    <span class="identity-row__label">Sound</span>
    <span class="identity-row__value" id="idGenreVal">—</span>
    <button class="identity-row__change" onclick="identityChangeGenre()">Change →</button>
  </div>
  <div class="identity-row">
    <span class="identity-row__label">Feel</span>
    <span class="identity-row__value" id="idFeelVal">—</span>
    <button class="identity-row__change" onclick="identityChangeFeel()">Change →</button>
  </div>

  <div class="identity-nudges" id="identityNudges">
    <button class="nudge-btn" data-nudge="darkness"  data-dir="1"  onclick="applyNudge(this)">Darker</button>
    <button class="nudge-btn" data-nudge="spacing"   data-dir="1"  onclick="applyNudge(this)">More space</button>
    <button class="nudge-btn" data-nudge="sharpness" data-dir="-1" onclick="applyNudge(this)">Softer</button>
    <button class="nudge-btn" data-nudge="contrast"  data-dir="1"  onclick="applyNudge(this)">Bolder</button>
    <button class="nudge-btn" data-nudge="warmth"    data-dir="1"  onclick="applyNudge(this)">Warmer</button>
  </div>
  <p class="identity-nudge-hint" id="nudgeHint"></p>

  <div class="identity-preview" id="identityPreview">
    <div class="identity-preview__accent" id="idPrevAccent"></div>
    <div class="identity-preview__feel"   id="idPrevFeel"></div>
    <div class="identity-preview__name"   id="idPrevName"></div>
    <div class="identity-preview__label">Profile preview</div>
  </div>
</div>
```

---

### Task 6: Add Profile Identity JS to `admin.html`

**Files:**
- Modify: `admin.html` (JS block — add new functions, call `initIdentityCard()` from init)

The feel quadrant slug maps to the human label defined in the spec:
- `intimate-raw` → "Stripped back"
- `intimate-refined` → "Warm and cinematic"
- `bold-raw` → "Underground and direct"
- `bold-refined` → "Clean and confident"

- [ ] **Step 1: Add identity card JS functions**

Find the end of the main JS block (before `</script>`) and insert:

```javascript
// ── PROFILE IDENTITY CARD ─────────────────────────────────────────────────

const FEEL_LABELS = {
  'intimate-raw':      'Stripped back',
  'intimate-refined':  'Warm and cinematic',
  'bold-raw':          'Underground and direct',
  'bold-refined':      'Clean and confident',
};

const GENRE_LABELS = {
  'electronic': 'Electronic', 'hiphop': 'Hip-hop', 'rnb': 'R&B',
  'indie': 'Indie', 'pop': 'Pop', 'rock': 'Rock', 'acoustic': 'Acoustic',
};

// Free tier: max 3 nudge uses total before upgrade gate
let nudgeUsesLeft = null; // null = Artist+ (unlimited)

function initIdentityCard() {
  const profile = safeGetProfile();
  const id = profile.identity || {};
  const feel = id.feel || 'bold-refined';
  const genre = id.genre || profile.vibe || 'indie';
  const accent = id.accent || profile.accent || '#f4b942';

  // Populate rows
  const genreEl = document.getElementById('idGenreVal');
  const feelEl  = document.getElementById('idFeelVal');
  if (genreEl) genreEl.textContent = GENRE_LABELS[genre] || genre;
  if (feelEl)  feelEl.textContent  = FEEL_LABELS[feel]   || feel;

  // Set free tier nudge counter
  const tier = profile.tier || 'free';
  if (tier === 'free') {
    const used = parseInt(localStorage.getItem('able_nudge_uses') || '0', 10);
    nudgeUsesLeft = Math.max(0, 3 - used);
  }
  updateNudgeHint();

  // Update mini-preview
  updateIdentityPreview(profile);
}

function updateNudgeHint() {
  const hint = document.getElementById('nudgeHint');
  if (!hint) return;
  if (nudgeUsesLeft === null) {
    hint.textContent = '';
  } else if (nudgeUsesLeft > 0) {
    hint.textContent = `${nudgeUsesLeft} nudge${nudgeUsesLeft === 1 ? '' : 's'} remaining on free.`;
  } else {
    hint.textContent = 'Upgrade to Artist for unlimited nudges.';
  }
}

function applyNudge(btn) {
  // Gate free tier
  if (nudgeUsesLeft !== null && nudgeUsesLeft <= 0) {
    // TODO: open upgrade sheet — for now, surface hint
    updateNudgeHint();
    return;
  }

  const profile = safeGetProfile();
  if (!profile.identity) {
    profile.identity = { genre: profile.vibe || 'indie', feel: 'bold-refined',
      accent: profile.accent || '#f4b942', accentSource: 'artist',
      refinements: { darkness:0, spacing:0, sharpness:0, contrast:0, warmth:0 } };
  }
  const r = profile.identity.refinements;
  const axis = btn.dataset.nudge;
  const dir  = parseInt(btn.dataset.dir, 10);
  // Clamp to -3/+3
  r[axis] = Math.max(-3, Math.min(3, (r[axis] || 0) + dir));

  // Persist
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));

  // Consume free use
  if (nudgeUsesLeft !== null) {
    nudgeUsesLeft = Math.max(0, nudgeUsesLeft - 1);
    const used = parseInt(localStorage.getItem('able_nudge_uses') || '0', 10);
    localStorage.setItem('able_nudge_uses', String(used + 1));
  }

  // Visual feedback on button
  btn.classList.add('applied');
  setTimeout(() => btn.classList.remove('applied'), 900);

  updateNudgeHint();
  updateIdentityPreview(profile);
}

function updateIdentityPreview(profile) {
  const id = profile.identity || {};
  const feel   = id.feel  || 'bold-refined';
  const accent = id.accent || profile.accent || '#f4b942';
  const name   = profile.name || 'Artist';

  const prevAccent = document.getElementById('idPrevAccent');
  const prevFeel   = document.getElementById('idPrevFeel');
  const prevName   = document.getElementById('idPrevName');
  if (prevAccent) prevAccent.style.background = accent;
  if (prevFeel)   prevFeel.textContent = FEEL_LABELS[feel] || feel;
  if (prevName)   prevName.textContent = name.toUpperCase();
}

function identityChangeGenre() {
  // Phase 2: open genre picker sheet. For now, redirect to start.html
  if (confirm('Re-run genre setup? This will take you back to onboarding.')) {
    window.location.href = 'start.html';
  }
}

function identityChangeFeel() {
  // Phase 2: open feel picker sheet inline. For now, simple prompt approach.
  const options = Object.entries(FEEL_LABELS);
  const msg = 'Choose feel:\n' + options.map(([k,v],i) => `${i+1}. ${v}`).join('\n');
  const choice = prompt(msg);
  const idx = parseInt(choice, 10) - 1;
  if (idx >= 0 && idx < options.length) {
    const profile = safeGetProfile();
    if (!profile.identity) profile.identity = {};
    profile.identity.feel = options[idx][0];
    localStorage.setItem('able_v3_profile', JSON.stringify(profile));
    initIdentityCard();
  }
}

function safeGetProfile() {
  try {
    return JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  } catch(e) {
    return {};
  }
}
```

> **Note:** `admin.html` may already have a `safeGetProfile` or `getProfile` helper — check before adding. If it exists, use the existing name in `initIdentityCard`, `applyNudge`, `updateIdentityPreview`.

- [ ] **Step 2: Call `initIdentityCard()` from admin init**

Find where the admin page initialises (likely a `DOMContentLoaded` listener or an `init()` function near the bottom of the JS). Add:

```javascript
initIdentityCard();
```

- [ ] **Step 3: Parse check**

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('admin.html','utf8');
const match = src.match(/<script>([\s\S]*?)<\/script>/g);
let ok = true;
(match||[]).forEach((b,i)=>{ try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block '+i+':',e.message);ok=false} });
console.log(ok?'OK':'FAIL');
"
```
Expected: `OK`

- [ ] **Step 4: Playwright smoke test — admin identity card**

```javascript
// Via Playwright MCP:
// 1. Navigate to admin.html
// 2. Snapshot — confirm #identityCard is present in DOM
// 3. Confirm #idFeelVal text is one of the 4 FEEL_LABELS values
// 4. Click "Darker" nudge button
// 5. Snapshot — confirm button briefly gets .applied class (or is still visible)
// 6. Confirm #idPrevAccent has a background-color style
```

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): Profile Identity card — feel/genre display, 5 nudge buttons, mini-preview

Reads profile.identity from localStorage. Free tier: 3 nudge uses
(tracked in able_nudge_uses). Artist+: unlimited. Each nudge applies
±1 delta to profile.identity.refinements and persists immediately.
Mini-preview strip shows accent bar, feel label, artist name."
```

---

## Final: Update scope doc

- [ ] **Step 1: Update `docs/v6/01_V6_SCOPE_AND_STATUS.md`**

Add rows to the build status table:
```
| Onboarding feel step (`start.html` step 2 of 5) | Complete |
| Admin Profile Identity card (genre, feel, nudges, preview) | Complete |
```

- [ ] **Step 2: Commit**

```bash
git add docs/v6/01_V6_SCOPE_AND_STATUS.md
git commit -m "docs: mark onboarding feel step + admin identity card complete"
```

---

*Spec reference: `docs/v6/operational/GUIDED_IDENTITY_SYSTEM_SPEC.md` §6 (onboarding) and §8.2 (admin)*
