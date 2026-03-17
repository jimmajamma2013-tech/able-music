# AI-Enhanced Sign-Up UX Rethink — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `start.html` into an AI-assisted, grandma-friendly onboarding wizard that gets any artist from zero to a genuinely *them* live page in under 3 minutes — with zero jargon, real-time page preview, and AI filling in what it can so the artist only has to review and tweak.

**Architecture:** Single-file HTML (`start.html`) — no build pipeline, no npm. All AI calls are simulated client-side using realistic stub data (real Claude API integration is a backend task once Supabase is live). The Spotify oEmbed API is used live (no auth required) to pre-fill profile data. All other intelligence is local heuristic + mock. JS is inline in the file, structured in clear named sections.

**Tech Stack:** Vanilla JS, CSS custom properties, Supabase JS CDN (auth only), Spotify oEmbed API (public, no key needed), Claude API via `fetch` to a serverless function stub.

---

## What's changing vs current wizard

| Current | New |
|---|---|
| Step 1 of 8 counter | "Your page is X% there" progress fill |
| Blank bio text box | Conversational prompt → AI drafts it |
| CTA picker (jargon-heavy) | "What's happening for you right now?" big-choice screen |
| Spotify URL buried in Step 1 | **Pre-step 0**: paste link → AI pre-fills everything |
| No fan capture mention until done | Fan list value prop introduced in moment step |
| Generic "Step X of Y" headings | Plain-language questions only |
| AI bio + AI CTA helpers (existing) | Keep + improve + add AI vibe match + AI colour from artwork |
| Static feel cards | AI pre-selects best match based on genre, user can override |

---

## File Map

| File | Change |
|---|---|
| `start.html` | Full rewrite of HTML structure + CSS + JS |

No new files needed. Everything stays in one file.

---

## Chunk 1: Pre-step 0 — Spotify/Music Import

### Task 1: Pre-step 0 UI — "Start with your music link"

**Files:**
- Modify: `start.html` — add pre-step before Step 1

**What it does:** First thing the user sees. One large input: "Paste your Spotify artist link, SoundCloud, or YouTube — we'll fill in the rest." Below it, a text link: "I don't have a link — set up manually →". If they paste and hit Go, we call the oEmbed/metadata endpoint and pre-fill: artist name, bio suggestion, colour (from artwork average), genre guess, music embed URL. Then skip them to a review screen showing what was found.

- [ ] **Step 1.1: Add pre-step HTML block**

Add before `<!-- STEP 1 -->`:

```html
<!-- STEP 0 — IMPORT -->
<div class="step active" id="step0">
  <div class="step-eyebrow">Let's get you set up</div>
  <h1 class="step-title">Where does<br>your music live?</h1>
  <p class="step-sub">Paste a link and we'll fill in your name, bio, and look automatically. Takes about 10 seconds.</p>

  <div class="import-input-wrap" id="importWrap">
    <input class="field-input import-input" type="url" id="iImportUrl"
      placeholder="open.spotify.com/artist/… or soundcloud.com/… or youtu.be/…"
      autocomplete="off" spellcheck="false"
      oninput="onImportInput(this.value)">
    <div class="import-status" id="importStatus" hidden></div>
    <div class="import-preview" id="importPreview" hidden>
      <div class="import-preview__art" id="importArt"></div>
      <div>
        <div class="import-preview__name" id="importName"></div>
        <div class="import-preview__meta" id="importMeta"></div>
      </div>
      <div class="import-preview__check">✓</div>
    </div>
  </div>

  <div class="import-why">
    <span class="import-why__icon">✦</span>
    We pull your artist name, suggest a bio, and pick a colour from your artwork — you just review and adjust.
  </div>

  <div class="step-nav" style="flex-direction:column;gap:10px;">
    <button class="btn-next" id="importBtn" onclick="doImport()" disabled>
      Fill it in for me →
    </button>
    <button class="btn-skip" onclick="skipImport()">
      I'll fill it in myself →
    </button>
  </div>
</div>
```

- [ ] **Step 1.2: Add import CSS**

```css
/* ── IMPORT STEP ── */
.import-input-wrap { position:relative; margin-bottom:16px; }
.import-input { font-size:14px; padding:14px 16px; }
.import-status {
  margin-top:8px; font-size:12px; color:var(--acc); display:flex;
  align-items:center; gap:6px;
}
.import-preview {
  display:flex; align-items:center; gap:12px;
  padding:12px 14px; margin-top:10px;
  background:var(--card); border:1.5px solid rgba(var(--acc-rgb),.3);
  border-radius:12px; animation:stepIn .3s var(--ease) both;
}
.import-preview__art {
  width:44px; height:44px; border-radius:8px; flex-shrink:0;
  background:linear-gradient(135deg,var(--acc),rgba(var(--acc-rgb),.4));
  background-size:cover; background-position:center;
}
.import-preview__name { font-size:14px; font-weight:700; color:var(--text); }
.import-preview__meta { font-size:11px; color:var(--t2); margin-top:2px; }
.import-preview__check {
  margin-left:auto; color:var(--acc); font-size:18px; font-weight:700;
}
.import-why {
  display:flex; align-items:flex-start; gap:8px;
  padding:12px 14px; background:rgba(var(--acc-rgb),.06);
  border-radius:10px; font-size:12px; color:var(--t2); line-height:1.55;
  margin-bottom:20px;
}
.import-why__icon { color:var(--acc); flex-shrink:0; font-size:13px; margin-top:1px; }
```

- [ ] **Step 1.3: Add import JS**

```js
// ── IMPORT STEP ──────────────────────────────────────────────────
let importData = {};

function onImportInput(val) {
  const btn = document.getElementById('importBtn');
  const isUrl = val.startsWith('http') || val.includes('spotify.com') || val.includes('soundcloud.com') || val.includes('youtu');
  btn.disabled = !isUrl;
  document.getElementById('importPreview').hidden = true;
}

async function doImport() {
  const url = document.getElementById('iImportUrl').value.trim();
  const status = document.getElementById('importStatus');
  const preview = document.getElementById('importPreview');
  status.hidden = false;
  status.textContent = '⟳ Fetching your music…';
  document.getElementById('importBtn').disabled = true;

  try {
    // Spotify oEmbed (public, no auth)
    if (url.includes('spotify.com')) {
      const oembed = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`).then(r => r.json());
      importData = {
        name: oembed.provider_name !== 'Spotify' ? oembed.provider_name : (oembed.title || ''),
        artUrl: oembed.thumbnail_url || '',
        platform: 'Spotify',
        embedUrl: url,
        genre: '' // enriched by heuristic below
      };
    } else {
      // Generic oEmbed fallback
      importData = { name: '', artUrl: '', platform: 'link', embedUrl: url, genre: '' };
    }

    // Show preview
    document.getElementById('importName').textContent = importData.name || 'Found your music';
    document.getElementById('importMeta').textContent = importData.platform + ' · ' + (importData.artUrl ? 'artwork found' : 'no artwork');
    if (importData.artUrl) {
      document.getElementById('importArt').style.backgroundImage = `url(${importData.artUrl})`;
    }
    preview.hidden = false;
    status.textContent = '✓ Looks good — hit the button to continue';
    document.getElementById('importBtn').textContent = 'Use this →';
    document.getElementById('importBtn').disabled = false;
    document.getElementById('importBtn').onclick = applyImportAndContinue;

  } catch(e) {
    status.textContent = '⚠ Couldn\'t fetch that link — fill in manually below';
    document.getElementById('importBtn').disabled = false;
    document.getElementById('importBtn').textContent = 'Continue manually →';
    document.getElementById('importBtn').onclick = skipImport;
  }
}

function applyImportAndContinue() {
  // Pre-fill fields from import
  if (importData.name) document.getElementById('iName').value = importData.name;
  if (importData.embedUrl) {
    // pre-fill music step
    document.getElementById('iMusicUrl').value = importData.embedUrl;
  }
  // Trigger bio generation from imported name
  P.name = importData.name;
  P.importedArtUrl = importData.artUrl;
  goStep(1);
  // Auto-trigger bio generation after short delay
  setTimeout(() => { if (P.name) generateBioAuto(); }, 400);
}

function skipImport() {
  importData = {};
  goStep(1);
}
```

- [ ] **Step 1.4: Change initial active step from `step1` to `step0`**

In HTML, change:
```html
<div class="step active" id="step1">
```
to:
```html
<div class="step" id="step1">
```
And `step0` gets the `active` class (already added in Step 1.1).

Update `goStep` to handle step `0` and update progress counter to start at `0`.

- [ ] **Step 1.5: Commit**
```bash
git add start.html
git commit -m "feat(start): add pre-step 0 — Spotify/music link import with oEmbed pre-fill"
```

---

## Chunk 2: "What's happening right now?" — Moment Detector

### Task 2: Replace CTA jargon with human moment question

**Files:**
- Modify: `start.html` — redesign Step 5 (CTA picker)

**What it does:** Instead of "One thing, front and centre" + a grid of CTA options labelled with jargon, show 4 big illustrated cards: "Dropping something soon", "Just released something", "I've got a show coming up", "Just getting started". Each maps to a page state + pre-selects the right CTA automatically. The detailed CTA URL input still appears below, but only after a moment is chosen.

- [ ] **Step 2.1: Replace Step 5 HTML**

```html
<!-- STEP 5 — MOMENT -->
<div class="step" id="step5">
  <div class="step-eyebrow">Step 5 of 8</div>
  <h1 class="step-title">What's<br>happening<br>for you<br>right now?</h1>
  <p class="step-sub">Your page leads with whatever makes most sense for where you are. Pick the closest thing.</p>

  <div class="moment-grid" id="momentGrid">
    <button class="moment-card" data-moment="pre" onclick="selectMoment('pre')">
      <span class="moment-card__icon">⏳</span>
      <div>
        <span class="moment-card__label">Dropping something soon</span>
        <span class="moment-card__desc">Your page counts down to the release and lets fans pre-save.</span>
      </div>
    </button>
    <button class="moment-card" data-moment="live" onclick="selectMoment('live')">
      <span class="moment-card__icon">▶</span>
      <div>
        <span class="moment-card__label">Just released something</span>
        <span class="moment-card__desc">Stream links take front and centre. Music plays right on your page.</span>
      </div>
    </button>
    <button class="moment-card" data-moment="gig" onclick="selectMoment('gig')">
      <span class="moment-card__icon">🎤</span>
      <div>
        <span class="moment-card__label">I've got a show coming up</span>
        <span class="moment-card__desc">Tickets go to the top. Fans see exactly what to do when they land.</span>
      </div>
    </button>
    <button class="moment-card" data-moment="profile" onclick="selectMoment('profile')">
      <span class="moment-card__icon">✦</span>
      <div>
        <span class="moment-card__label">Just getting started</span>
        <span class="moment-card__desc">Your full profile leads — music, links, and who you are.</span>
      </div>
    </button>
  </div>

  <!-- Context note — updates based on selection -->
  <div class="moment-context" id="momentContext" hidden>
    <span class="moment-context__icon">✓</span>
    <span id="momentContextText"></span>
  </div>

  <!-- Fan capture value prop — shown after moment selected -->
  <div class="fan-prop" id="fanProp" hidden>
    <span class="fan-prop__icon">📬</span>
    <div>
      <span class="fan-prop__title">Your page also captures fan emails.</span>
      <span class="fan-prop__desc">Anyone who signs up is yours — not Spotify's, not Instagram's. You can email them any time from your dashboard.</span>
    </div>
  </div>

  <!-- URL input — shown only when moment needs a link -->
  <div class="field" id="momentUrlWrap" style="display:none; margin-top:16px;">
    <label class="field-label" for="iMomentUrl" id="momentUrlLbl">Link</label>
    <input class="field-input" type="url" id="iMomentUrl" placeholder="https://…">
    <div class="field-hint" id="momentUrlHint"></div>
  </div>

  <div class="step-nav">
    <button class="btn-back" onclick="goStep(4)">← Back</button>
    <button class="btn-next" id="momentNext" onclick="applyMomentAndContinue()" disabled>Continue →</button>
  </div>
</div>
```

- [ ] **Step 2.2: Add moment card CSS**

```css
/* ── MOMENT CARDS ── */
.moment-grid { display:flex; flex-direction:column; gap:10px; margin-bottom:16px; }
.moment-card {
  display:flex; align-items:flex-start; gap:14px;
  padding:16px 18px; border-radius:14px;
  background:var(--card); border:1.5px solid var(--border);
  text-align:left; cursor:pointer;
  transition:border-color .2s, background .2s, transform .2s var(--spring);
}
.moment-card:hover { border-color:var(--bm); transform:translateY(-1px); }
.moment-card.on {
  border-color:var(--acc); background:rgba(var(--acc-rgb),.08);
}
.moment-card__icon { font-size:22px; flex-shrink:0; margin-top:1px; }
.moment-card__label {
  display:block; font-size:14px; font-weight:700; color:var(--text);
  margin-bottom:3px; transition:color .15s;
}
.moment-card.on .moment-card__label { color:var(--acc); }
.moment-card__desc { display:block; font-size:12px; color:var(--t2); line-height:1.5; }

.moment-context {
  display:flex; align-items:flex-start; gap:8px;
  padding:12px 14px; background:rgba(var(--acc-rgb),.07);
  border-radius:10px; font-size:12px; color:var(--t2); line-height:1.55;
  margin-bottom:12px; animation:stepIn .3s var(--ease) both;
}
.moment-context__icon { color:var(--acc); flex-shrink:0; }

.fan-prop {
  display:flex; align-items:flex-start; gap:12px;
  padding:14px 16px; margin-bottom:16px;
  background:var(--card); border:1.5px solid var(--border);
  border-radius:12px; animation:stepIn .35s var(--ease) both;
}
.fan-prop__icon { font-size:20px; flex-shrink:0; }
.fan-prop__title { display:block; font-size:13px; font-weight:700; color:var(--text); margin-bottom:3px; }
.fan-prop__desc { display:block; font-size:12px; color:var(--t2); line-height:1.5; }
```

- [ ] **Step 2.3: Add moment JS**

```js
// ── MOMENT DETECTOR ──────────────────────────────────────────────
const MOMENT_CONFIG = {
  pre: {
    state: 'pre-release',
    ctaLabel: 'Pre-save',
    ctaType: 'presave',
    context: 'Your page will count down to your release date and show a pre-save button at the top.',
    urlLabel: 'Pre-save link',
    urlHint: 'Your Spotify pre-save, DistroKid, or similar link.',
    needsUrl: true,
  },
  live: {
    state: 'live',
    ctaLabel: 'Stream Now',
    ctaType: 'stream',
    context: 'Your page leads with your latest release. Fans stream without leaving your page.',
    urlLabel: 'Streaming link',
    urlHint: 'Your Spotify, Apple Music, or any streaming link.',
    needsUrl: false,
  },
  gig: {
    state: 'gig',
    ctaLabel: 'Get Tickets',
    ctaType: 'tickets',
    context: 'Tickets go straight to the top. Your fans see exactly what to do the moment they land.',
    urlLabel: 'Ticket link',
    urlHint: 'DICE, RA, Eventbrite, Ticketmaster — anywhere you sell tickets.',
    needsUrl: true,
  },
  profile: {
    state: 'profile',
    ctaLabel: 'Stream my music',
    ctaType: 'stream',
    context: 'Your full profile leads — who you are, your music, your links. Always ready.',
    needsUrl: false,
  },
};

let selectedMoment = null;

function selectMoment(key) {
  selectedMoment = key;
  const cfg = MOMENT_CONFIG[key];

  // Visual selection
  document.querySelectorAll('.moment-card').forEach(c => c.classList.toggle('on', c.dataset.moment === key));

  // Context note
  const ctx = document.getElementById('momentContext');
  document.getElementById('momentContextText').textContent = cfg.context;
  ctx.hidden = false;

  // Fan prop
  document.getElementById('fanProp').hidden = false;

  // URL field
  const urlWrap = document.getElementById('momentUrlWrap');
  if (cfg.needsUrl) {
    urlWrap.style.display = 'block';
    document.getElementById('momentUrlLbl').textContent = cfg.urlLabel;
    document.getElementById('momentUrlHint').textContent = cfg.urlHint;
  } else {
    urlWrap.style.display = 'none';
  }

  document.getElementById('momentNext').disabled = false;

  // Pre-configure profile
  P.stateOverride = cfg.state;
  P.ctaLabel = cfg.ctaLabel;
  P.ctaType = cfg.ctaType;

  updatePreview();
}

function applyMomentAndContinue() {
  if (!selectedMoment) return;
  const cfg = MOMENT_CONFIG[selectedMoment];
  if (cfg.needsUrl) {
    const url = document.getElementById('iMomentUrl').value.trim();
    if (url) P.ctaUrl = url;
  }
  goStep(6);
}
```

- [ ] **Step 2.4: Remove old Step 5 CTA grid HTML** (the `.cta-groups`, `.cta-preview`, `.cta-grp-hd`, secondary CTA section)

- [ ] **Step 2.5: Commit**
```bash
git add start.html
git commit -m "feat(start): replace jargon CTA picker with moment detector + fan capture prop"
```

---

## Chunk 3: Progress Redesign — "Your page is X% there"

### Task 3: Progress indicator that feels like momentum

**Files:**
- Modify: `start.html` — progress bar + header indicator

**What it does:** Replace "Step 3 of 8" with a warm progress message that changes as they go. The top bar shows "Your page is 40% there" with an animated fill bar. The bar colour shifts from muted to accent as it fills. Each step has a specific % and a short message.

- [ ] **Step 3.1: Define progress messages in JS**

```js
const PROGRESS_STEPS = {
  0:    { pct: 5,  msg: 'Let\'s get started' },
  1:    { pct: 20, msg: 'Looking good already' },
  2:    { pct: 35, msg: 'Your page has a personality' },
  3:    { pct: 50, msg: 'The look is yours' },
  4:    { pct: 62, msg: 'Almost there' },
  5:    { pct: 72, msg: 'Your fans will know what to do' },
  6:    { pct: 82, msg: 'Music on the page' },
  7:    { pct: 90, msg: 'One last thing' },
  8:    { pct: 95, msg: 'Nearly live' },
  done: { pct: 100, msg: 'You\'re live on ABLE ✓' },
};
```

- [ ] **Step 3.2: Update progress HTML in header**

Change:
```html
<div class="step-indicator" id="stepInd">Step 1 of 5</div>
```
To:
```html
<div class="step-indicator" id="stepInd">Let's get started</div>
```

- [ ] **Step 3.3: Update `goStep` to use new progress messages**

In the `goStep` function, replace the step counter logic with:
```js
function updateProgress(step) {
  const s = PROGRESS_STEPS[step] || PROGRESS_STEPS[0];
  document.getElementById('progressFill').style.width = s.pct + '%';
  document.getElementById('stepInd').textContent = s.msg;
}
```
Call `updateProgress(step)` inside `goStep`.

- [ ] **Step 3.4: Update progress bar CSS for better visual**

```css
.progress { position:fixed; top:56px; left:0; right:0; z-index:99; height:3px; background:var(--border); }
.progress-fill {
  height:100%; background:var(--acc);
  transition:width .65s var(--ease);
  box-shadow:0 0 12px rgba(var(--acc-rgb),.6), 0 0 4px rgba(var(--acc-rgb),.4);
}
```

- [ ] **Step 3.5: Remove all `step-eyebrow` "Step X of Y" text** from every step HTML — replace with a single plain-language eyebrow per step:

| Step | New eyebrow |
|---|---|
| 0 | `Let's get you set up` |
| 1 | `First things first` |
| 2 | `The feel of it` |
| 3 | `Your colour` |
| 4 | `The atmosphere` |
| 5 | `Your moment` |
| 6 | `Your music` |
| 7 | `Any shows coming up?` |
| 8 | `Save your page` |

- [ ] **Step 3.6: Commit**
```bash
git add start.html
git commit -m "feat(start): progress redesign — momentum messages replace step counter"
```

---

## Chunk 4: Plain-language rewrite + inline "why this matters" notes

### Task 4: Jargon elimination throughout

**Files:**
- Modify: `start.html` — all field labels, hints, step subtitles, button text

**What it does:** Every field gets an inline "why this matters" note that's always visible (not a tooltip). No jargon. No SaaS terms. Labels speak to a person who's never set up a website.

- [ ] **Step 4.1: Rewrite Step 1 field hints**

Update existing `field-hint` content:

```html
<!-- Bio hint -->
<div class="field-hint">One sentence — what makes you, you. Sits right under your name on your page. Keep it real.</div>

<!-- Location hint -->
<div class="field-hint">Shows next to your genre. Gives fans a sense of where you're from.</div>

<!-- Spotify hint -->
<div class="field-hint">Your music plays directly on your page — fans hear it without going anywhere else.</div>
```

- [ ] **Step 4.2: Rewrite Step 2 subtitle**

```html
<p class="step-sub">Not just visual — it shapes how your page moves. Pick the one that sounds like how your music feels.</p>
```

- [ ] **Step 4.3: Rewrite Step 3 (colour) subtitle and add hint**

```html
<h1 class="step-title">Your<br>colour.</h1>
<p class="step-sub">This runs through every button, chip, and detail on your page. Change one thing — everything shifts. Pick something from your artwork or your brand.</p>
```

- [ ] **Step 4.4: Rewrite Step 4 (theme) subtitle**

```html
<p class="step-sub">Dark, light, glass, or high-contrast — pick the atmosphere that suits your music. You can change this any time from your dashboard.</p>
```

- [ ] **Step 4.5: Rewrite Step 6 (music) subtitle**

```html
<h1 class="step-title">Your music,<br>right here.</h1>
<p class="step-sub">Paste a Spotify album, SoundCloud track, or YouTube link. Fans listen without leaving your page — the player loads right inside it.</p>
```

- [ ] **Step 4.6: Rewrite Step 7 (shows) subtitle and labels**

```html
<h1 class="step-title">Playing<br>anywhere?</h1>
<p class="step-sub">Add your next show and a ticket link — it goes to the top of your page the moment you turn on Show Mode from your dashboard.</p>
```

- [ ] **Step 4.7: Rewrite Step 8 (account) subtitle**

```html
<h1 class="step-title">Make it<br>permanent.</h1>
<p class="step-sub">Your page is already built. Create a free account so it lives at your own URL and you can update it from any device.</p>
```

Below the auth options, add a reassurance line:
```html
<p class="auth-reassure">Free forever. No card. No lock-in.</p>
```

CSS:
```css
.auth-reassure { font-size:12px; color:var(--t3); text-align:center; margin-top:12px; }
```

- [ ] **Step 4.8: Commit**
```bash
git add start.html
git commit -m "feat(start): plain-language rewrite — jargon eliminated, inline hints throughout"
```

---

## Chunk 5: AI Auto-Vibe Match + Improved Bio Helper

### Task 5: AI pre-selects feel and colour, improves bio UX

**Files:**
- Modify: `start.html` — vibe auto-select logic + bio helper UX

**What it does:**
- After genre is selected in Step 1, Step 2's feel cards automatically pre-select the closest match (heuristic map). The user still sees all 4 options and can override. A subtle "We've suggested this based on your genre — tap to change" message appears.
- Bio helper conversational prompt replaces blank placeholder. A "Let me think of something" link triggers generation immediately without opening a panel.
- `generateBioAuto()` fires silently when the user comes from import, without them having to click anything.

- [ ] **Step 5.1: Add genre → feel mapping heuristic**

```js
const GENRE_FEEL_MAP = {
  'electronic':      'bold-refined',
  'hip-hop':         'bold-raw',
  'indie':           'intimate-raw',
  'r-and-b':         'intimate-refined',
  'pop':             'bold-refined',
  'folk':            'intimate-raw',
  'jazz':            'intimate-refined',
  'rock':            'bold-raw',
  'classical':       'intimate-refined',
  'metal':           'bold-raw',
  'ambient':         'intimate-refined',
  'singer-songwriter': 'intimate-raw',
};

function autoSelectFeel(genre) {
  const feel = GENRE_FEEL_MAP[genre] || 'intimate-refined';
  selectFeel(feel);
  // Show the "we suggested this" note
  const note = document.getElementById('feelSuggestionNote');
  if (note) {
    note.hidden = false;
    note.textContent = `We've suggested this based on your genre — tap any card to change it.`;
  }
}
```

- [ ] **Step 5.2: Add feel suggestion note HTML to Step 2**

After `.feel-grid`:
```html
<p class="feel-suggestion-note" id="feelSuggestionNote" hidden></p>
```

CSS:
```css
.feel-suggestion-note {
  font-size:11.5px; color:var(--acc); margin-top:8px; margin-bottom:4px;
  opacity:.8; line-height:1.5;
}
```

- [ ] **Step 5.3: Trigger `autoSelectFeel` when genre is selected**

In the existing `selectVibe` / genre selection JS, add:
```js
autoSelectFeel(genreKey); // genreKey = the data attribute value
```

- [ ] **Step 5.4: Add `generateBioAuto()` — silent background generation**

```js
async function generateBioAuto() {
  // Runs silently when coming from import — pre-populates bio draft
  const name = P.name || document.getElementById('iName').value;
  const genre = P.genre || '';
  if (!name) return;

  // Stub — replace with real Claude API call when backend is live
  const drafts = [
    `${name} makes ${genre || 'music'} that sounds like somewhere you've never been but instantly recognise.`,
    `${genre ? genre.charAt(0).toUpperCase() + genre.slice(1) + ' artist' : 'Artist'} based wherever the music takes them.`,
    `${name} — independent music, on their own terms.`,
  ];
  const draft = drafts[Math.floor(Math.random() * drafts.length)];
  document.getElementById('iBio').value = draft;
  document.getElementById('iBio').style.borderColor = 'rgba(var(--acc-rgb),.4)';

  // Show subtle "AI drafted this" indicator
  const hint = document.querySelector('#iBio + .field-hint') || document.querySelector('[for="iBio"]');
  const badge = document.createElement('span');
  badge.style.cssText = 'font-size:10px;color:var(--acc);margin-left:6px;opacity:.8;';
  badge.textContent = '✦ AI drafted';
  // Only add once
  const existing = document.querySelector('.ai-drafted-badge');
  if (!existing && hint) {
    badge.className = 'ai-drafted-badge';
    hint.appendChild(badge);
  }
}
```

- [ ] **Step 5.5: Improve bio helper placeholder**

Change bio input placeholder from:
```
e.g. Making music from my bedroom to yours.
```
To:
```
e.g. "Making electronic music in East London since I was 16."
```

And add below the input (before the AI button):
```html
<div class="field-hint">One sentence. Sits under your name. Don't overthink it — say something real.<br>
<button class="inline-ai-link" type="button" onclick="openBioHelper();generateBio()">✦ Write it for me</button></div>
```

CSS:
```css
.inline-ai-link {
  color:var(--acc); font-size:11.5px; font-weight:600; background:none;
  border:none; cursor:pointer; padding:0; margin-top:4px;
  text-decoration:underline; text-decoration-color:rgba(var(--acc-rgb),.3);
}
.inline-ai-link:hover { text-decoration-color:var(--acc); }
```

- [ ] **Step 5.6: Commit**
```bash
git add start.html
git commit -m "feat(start): AI auto-vibe match from genre + silent bio generation from import"
```

---

## Chunk 6: Visual polish — step transitions, card hover lifts, done screen

### Task 6: Final UX polish pass

**Files:**
- Modify: `start.html` — animations, done screen, mobile responsiveness

- [ ] **Step 6.1: Improve step transition animation**

```css
@keyframes stepIn {
  from { opacity:0; transform:translateY(18px) scale(0.99); }
  to   { opacity:1; transform:none; }
}
@keyframes stepOut {
  from { opacity:1; transform:none; }
  to   { opacity:0; transform:translateY(-10px); }
}
```

In `goStep()`, add brief outgoing animation before switching:
```js
function goStep(n) {
  const current = document.querySelector('.step.active');
  if (current) {
    current.style.animation = 'stepOut .2s var(--ease) both';
    setTimeout(() => {
      current.classList.remove('active');
      _activateStep(n);
    }, 180);
  } else {
    _activateStep(n);
  }
}
```

- [ ] **Step 6.2: Improve done screen**

Replace done screen content with richer version:

```html
<!-- DONE -->
<div class="step" id="stepDone">
  <div class="step-eyebrow">You're live on ABLE</div>
  <h1 class="step-title">Your page<br>is real.</h1>
  <p class="step-sub">Put the link in your bio on every platform. Anyone who taps it lands somewhere that actually feels like you.</p>

  <div class="done-link">
    <div class="done-url" id="doneUrl">ablemusic.co/artist</div>
    <button class="done-copy" id="doneCopy" onclick="copyLink()">Copy</button>
  </div>

  <div class="done-next">
    <div class="done-next__title">What's next</div>
    <a href="admin.html" class="done-next__item">
      <span class="done-next__icon">📊</span>
      <div>
        <span class="done-next__label">Go to your dashboard</span>
        <span class="done-next__desc">Add a release date, check your fan list, edit anything.</span>
      </div>
      <span class="done-next__arrow">→</span>
    </a>
    <a href="able-v3.html" class="done-next__item" target="_blank">
      <span class="done-next__icon">✦</span>
      <div>
        <span class="done-next__label">See your page</span>
        <span class="done-next__desc">This is what your fans see when they tap your link.</span>
      </div>
      <span class="done-next__arrow">→</span>
    </a>
  </div>
</div>
```

CSS:
```css
.done-next { margin-top:28px; }
.done-next__title { font-size:10px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--t3); margin-bottom:10px; }
.done-next__item {
  display:flex; align-items:center; gap:12px;
  padding:14px 16px; border-radius:12px;
  background:var(--card); border:1.5px solid var(--border);
  margin-bottom:8px; cursor:pointer;
  transition:border-color .2s, transform .2s var(--spring);
}
.done-next__item:hover { border-color:var(--bm); transform:translateY(-2px); }
.done-next__icon { font-size:20px; flex-shrink:0; }
.done-next__label { display:block; font-size:13px; font-weight:700; color:var(--text); }
.done-next__desc { display:block; font-size:11px; color:var(--t2); margin-top:2px; }
.done-next__arrow { margin-left:auto; color:var(--t3); font-size:16px; flex-shrink:0; }
```

- [ ] **Step 6.3: Mobile — ensure single-column layout on < 768px**

```css
@media (max-width: 768px) {
  .layout { grid-template-columns: 1fr; }
  .preview-side { display: none; }
  .form-side { padding: 32px 24px; }
  .step-title { font-size: 40px; }
  .moment-grid { gap: 8px; }
  .moment-card { padding: 13px 14px; }
}
```

- [ ] **Step 6.4: Verify preview side updates on all new steps**

Check that `updatePreview()` is called:
- After `selectMoment()`
- After `applyImportAndContinue()`
- After `autoSelectFeel()`

- [ ] **Step 6.5: Smoke test — walk through full wizard**

Manual checks:
1. Pre-step 0 loads first ✓
2. Paste Spotify URL → preview shows ✓
3. Skip import → Step 1 loads ✓
4. Genre select → feel auto-selects in Step 2 ✓
5. Moment cards → fan prop shows ✓
6. Progress messages update at every step ✓
7. Done screen shows both next-step cards ✓
8. Mobile at 375px — no horizontal scroll ✓

- [ ] **Step 6.6: Commit**
```bash
git add start.html
git commit -m "feat(start): polish — transitions, done screen rework, mobile layout"
```

---

## Post-implementation notes

**What's stubbed (needs real backend):**
- `generateBio()` / `generateBioAuto()` — currently returns heuristic drafts. Replace with `fetch('/api/generate-bio', { name, genre, feel })` → Claude API call via Netlify function.
- Spotify artwork colour extraction — currently uses CSS gradient fallback. Full implementation: fetch artwork → `<canvas>` average colour → set `--color-accent`.
- oEmbed for non-Spotify URLs (SoundCloud, YouTube) — currently falls back gracefully. Full implementation: server-side oEmbed proxy to avoid CORS.

**What's live immediately:**
- Spotify oEmbed pre-fill (public API, no auth)
- All UX/copy/flow changes
- Moment detector → profile state mapping
- AI bio + CTA helpers (existing, improved)
- Vibe auto-select from genre
