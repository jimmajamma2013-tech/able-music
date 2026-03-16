# ABLE v3 — Ten Out of Ten Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring every aspect of `able-v3.html` from its audited 6.1/10 to a genuine 10/10 — fixing broken features, redesigning empty states, polishing copy, and tightening every detail.

**Architecture:** Single-file HTML with no build pipeline. All changes are direct edits to `able-v3.html`. CSS and JS live inside `<style>` and `<script>` tags. Testing is visual (browser open) + JS parse-check (`node -e "new Function(src)"`).

**Tech Stack:** Vanilla HTML/CSS/JS · DM Sans + Barlow Condensed fonts · Supabase JS CDN (already loaded) · localStorage data model

**Audit reference:** See `docs/STATUS.md` and the 50-aspect audit in the session that created this plan.

**Parse-check command (run after every JS change):**
```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('able-v3.html','utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
new Function(js);
console.log('JS OK');
"
```

---

## Chunk 1 — Critical Bugs (steps 1–12)

These are broken features that cause visible failures today.

---

### Task 1: Fix pill overflow click handler (broken — no listener)

**Files:**
- Modify: `able-v3.html` — JS block, `initSnapFeed` area, pill renderer in `applyProfile`

- [ ] **Step 1:** Read `able-v3.html` lines 2511–2530. Locate the `v3PillsToggle` button creation. Confirm no click listener exists anywhere in the file for `v3PillsToggle`.

- [ ] **Step 2:** In `applyProfile`, after the overflow button is created, add a click listener inline at the point of creation. Replace the overflow button construction:

```js
// REPLACE this line (around line 2524):
? `<button class="v3-pill v3-pill--overflow" id="v3PillsToggle">+${overflow.length} more</button>`

// WITH this (inline handler, no separate wiring needed):
? `<button class="v3-pill v3-pill--overflow" id="v3PillsToggle" onclick="(function(btn){
    const extra = ${JSON.stringify(overflow.map(p =>
      `<a href='${p.url}' target='_blank' rel='noopener' class='v3-pill' style='text-decoration:none;'>${p.label}</a>`
    ).join(''))};
    btn.insertAdjacentHTML('beforebegin', extra);
    btn.remove();
  })(this)">+${overflow.length} more</button>`
```

Note: The `overflow` array is in scope at time of render so use template literal to bake the HTML in.

- [ ] **Step 3:** Run parse-check. Expected: `JS OK`

- [ ] **Step 4:** Open `able-v3.html` in browser. Go to profile with >4 platform links in localStorage. Tap "+N more". Verify extra pills appear and button disappears.

- [ ] **Step 5:** Commit.
```bash
git add able-v3.html
git commit -m "fix: wire pill overflow click handler — was silently broken"
```

---

### Task 2: Fix `--color-on-accent` undefined token

**Files:**
- Modify: `able-v3.html` — CSS `:root` block

- [ ] **Step 6:** In the `:root` token block (around line 22), add the missing token after `--color-accent-subtle`:

```css
--color-on-accent: #ffffff;
```

This is referenced by `.v3-stay-close__btn` but never defined, causing silent fallback.

- [ ] **Step 7:** Verify the light theme override. In `[data-theme="light"]` block add:
```css
--color-on-accent: #0d0e1a;
```
Because on a light accent colour, white text is unreadable.

- [ ] **Step 8:** Commit.
```bash
git add able-v3.html
git commit -m "fix: define missing --color-on-accent token for light theme"
```

---

### Task 3: Fix event ticket button tap target (36px → 44px)

**Files:**
- Modify: `able-v3.html` — `.v3-event__ticket` CSS

- [ ] **Step 9:** Find `.v3-event__ticket` (around line 1035). Change `min-height: 36px` to `min-height: 44px`. Also bump padding from `6px 12px` to `8px 14px` for visual balance.

- [ ] **Step 10:** Verify `.v3-event__ticket--past` and `.v3-event__ticket--tba` variants still look right at the new height. They inherit from `.v3-event__ticket` via class stacking so check visually.

- [ ] **Step 11:** Run parse-check. Expected: `JS OK`

- [ ] **Step 12:** Commit.
```bash
git add able-v3.html
git commit -m "fix: raise event ticket button to 44px min tap target"
```

---

## Chunk 2 — Fan-Facing Empty States (steps 13–36)

These are the 3.5/10 problem. Every empty panel currently shows a generic "No X yet" message. Each needs personality, artistic voice, and a fan action.

**Design rule for all empty states:**
- Never say "not set up yet" or "no X listed"
- Always give the fan something to do (sign up, check back, explore)
- Tone: the artist is speaking, not the platform
- Visual: icon in an accent-tinted circle, 1-line headline, 1-line sub, optional action pill

---

### Task 4: Redesign Events panel empty state

**Files:**
- Modify: `able-v3.html` — `renderEventsPanel` JS function (around line 2344)

- [ ] **Step 13:** Replace the empty state block in `renderEventsPanel`:

```js
// REPLACE:
if (!upcoming.length && !past.length) {
  html += `<div class="v3-empty-state"><div class="v3-empty-state__icon">🗓</div><div class="v3-empty-state__text">No shows listed yet</div></div>`;
  el.innerHTML = html; return;
}

// WITH:
if (!upcoming.length && !past.length) {
  html += `
    <div class="v3-empty-state v3-empty-state--rich">
      <div class="v3-empty-state__circle">🎤</div>
      <div class="v3-empty-state__headline">Nothing booked yet.</div>
      <div class="v3-empty-state__sub">Sign up below — you'll hear about dates before anywhere else.</div>
      <a class="v3-empty-state__action" href="#v3StayClose" onclick="document.getElementById('v3Scroll').scrollTo({top:99999,behavior:'smooth'});document.getElementById('v3Email')?.focus();return false;">
        Get notified
      </a>
    </div>`;
  el.innerHTML = html; return;
}
```

- [ ] **Step 14:** Add the `.v3-empty-state--rich` CSS. Find `.v3-empty-state` (around line 1446) and extend it:

```css
.v3-empty-state--rich {
  padding: 52px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.v3-empty-state__circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-accent-subtle);
  border: 1.5px solid rgba(var(--color-accent-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 4px;
}
.v3-empty-state__headline {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-text);
  letter-spacing: -0.3px;
}
.v3-empty-state__sub {
  font-size: 13px;
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.55;
  max-width: 240px;
}
.v3-empty-state__action {
  margin-top: 6px;
  padding: 9px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-accent-subtle);
  border: 1px solid rgba(var(--color-accent-rgb), 0.28);
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.v3-empty-state__action:hover {
  background: rgba(var(--color-accent-rgb), 0.18);
  border-color: rgba(var(--color-accent-rgb), 0.4);
}
```

- [ ] **Step 15:** Also update the panel header subline when empty: change `${upcoming.length} upcoming` to handle zero gracefully — `upcoming.length ? \`${upcoming.length} upcoming\` : 'No shows yet'`

- [ ] **Step 16:** Run parse-check. Expected: `JS OK`

- [ ] **Step 17:** Commit.
```bash
git add able-v3.html
git commit -m "feat(empty-states): events panel — voice + fan action instead of dead message"
```

---

### Task 5: Redesign Music panel empty state

**Files:**
- Modify: `able-v3.html` — `renderMusicPanel` (around line 2251)

- [ ] **Step 18:** Replace the music empty state:

```js
// REPLACE:
el.innerHTML = `<div class="v3-panel-header"><h2>Music</h2></div><div class="v3-empty-state"><div class="v3-empty-state__icon">🎵</div><div class="v3-empty-state__text">No releases yet</div></div>`;
return;

// WITH:
el.innerHTML = `
  <div class="v3-panel-header"><h2>Music</h2><p>More coming.</p></div>
  <div class="v3-empty-state v3-empty-state--rich">
    <div class="v3-empty-state__circle">🎵</div>
    <div class="v3-empty-state__headline">Something's being made.</div>
    <div class="v3-empty-state__sub">Sign up and you'll hear it first — before it hits the platforms.</div>
    <a class="v3-empty-state__action" href="#" onclick="document.getElementById('v3Scroll').scrollTo({top:99999,behavior:'smooth'});document.getElementById('v3Email')?.focus();return false;">
      Hear it first
    </a>
  </div>`;
return;
```

- [ ] **Step 19:** Run parse-check. Expected: `JS OK`

- [ ] **Step 20:** Commit.
```bash
git add able-v3.html
git commit -m "feat(empty-states): music panel — forward-looking voice, not absence message"
```

---

### Task 6: Redesign Merch panel empty state

**Files:**
- Modify: `able-v3.html` — `renderMerchPanel` (around line 2394)

- [ ] **Step 21:** Replace the merch empty state:

```js
// REPLACE:
html += `<div class="v3-empty-state"><div class="v3-empty-state__icon">🛍</div><div class="v3-empty-state__text">No merch listed yet</div></div>`;
el.innerHTML = html; return;

// WITH:
html += `
  <div class="v3-empty-state v3-empty-state--rich">
    <div class="v3-empty-state__circle">🛒</div>
    <div class="v3-empty-state__headline">Drop coming.</div>
    <div class="v3-empty-state__sub">Sign up to get first access when the store goes live.</div>
    <a class="v3-empty-state__action" href="#" onclick="document.getElementById('v3Scroll').scrollTo({top:99999,behavior:'smooth'});document.getElementById('v3Email')?.focus();return false;">
      Get first access
    </a>
  </div>`;
el.innerHTML = html; return;
```

- [ ] **Step 22:** Run parse-check. Expected: `JS OK`

- [ ] **Step 23:** Commit.
```bash
git add able-v3.html
git commit -m "feat(empty-states): merch panel — anticipation framing instead of absence"
```

---

### Task 7: Redesign Support panel empty state

**Files:**
- Modify: `able-v3.html` — `renderSupportPanel` (around line 2430)

The current "Support not set up yet" is the worst empty state — fans read it and feel like they found a draft.

- [ ] **Step 24:** Replace:

```js
// REPLACE:
html += `<div class="v3-empty-state"><div class="v3-empty-state__icon">💙</div><div class="v3-empty-state__text">Support not set up yet</div></div>`;
el.innerHTML = html; return;

// WITH — hide support tab entirely when not enabled:
el.innerHTML = `
  <div class="v3-panel-header"><h2>Support</h2><p>Direct support</p></div>
  <div class="v3-empty-state v3-empty-state--rich">
    <div class="v3-empty-state__circle">💙</div>
    <div class="v3-empty-state__headline">More ways to support coming.</div>
    <div class="v3-empty-state__sub">For now — sharing the music is everything.</div>
  </div>`;
return;
```

- [ ] **Step 25:** Additionally, when support is disabled: hide the Support tab in the tab bar entirely. In `applyProfile`, after `renderSupportPanel(data)`, add:

```js
// Hide support tab if not enabled
const supportTab = document.getElementById('tab-support');
if (supportTab) {
  supportTab.style.display = (!data.support?.enabled && !(data.support?.packs||[]).filter(p=>p.label).length) ? 'none' : '';
}
```

- [ ] **Step 26:** Run parse-check. Expected: `JS OK`

- [ ] **Step 27:** Commit.
```bash
git add able-v3.html
git commit -m "feat(empty-states): support panel — dignified empty state + hide tab when unused"
```

---

## Chunk 3 — Home Tab Structure When Empty (steps 28–42)

The home tab currently shows nothing when data is absent. The fix: show structural skeleton sections with ghost UI visible to all users (fans and owners alike), so the profile always has physical presence.

---

### Task 8: Add skeleton/ghost event rows for empty home events section

**Files:**
- Modify: `able-v3.html` — home panel HTML + `applyProfile` JS + CSS

- [ ] **Step 28:** In `applyProfile`, find the home events preview block (around line 2560). Currently it does `eventsSection.style.display = ''` only when there are upcoming events, hiding it otherwise. Change to always show the section, with either real data or a ghost:

```js
// REPLACE the entire home events block (lines ~2560-2583):
const eventsSection = document.getElementById('v3HomeEventsSection');
const eventsList = document.getElementById('v3HomeEventsList');
const eventsAll = (data.events || []).filter(e => e.venue);
if (eventsSection && eventsList) {
  const now = Date.now();
  const upcoming = eventsAll.filter(e => !e.date || new Date(e.date).getTime() >= now);
  if (upcoming.length) {
    eventsList.innerHTML = upcoming.slice(0, 2).map(e => {
      const d = e.date ? new Date(e.date) : null;
      const month = d ? d.toLocaleString('en', {month:'short'}) : '';
      const day   = d ? d.getDate() : '';
      return `<div class="v3-event">
        <div class="v3-event__date"><span class="v3-event__month">${month}</span><span class="v3-event__day">${day}</span></div>
        <div class="v3-event__info">
          <div class="v3-event__name">${e.venue}</div>
          <div class="v3-event__venue">${e.city || ''}${e.city && e.time ? ' · ' : ''}${e.time || ''}</div>
        </div>
        ${e.ticketUrl ? `<a href="${e.ticketUrl}" target="_blank" rel="noopener" class="v3-event__ticket">Tickets</a>` : ''}
      </div>`;
    }).join('');
    eventsSection.style.display = '';
    eventsSection.classList.remove('is-ghost');
  } else {
    // Ghost — structural presence even when empty
    eventsList.innerHTML = `
      <div class="v3-event v3-event--ghost">
        <div class="v3-event__date v3-ghost-block" style="width:42px;height:44px;border-radius:10px;"></div>
        <div class="v3-event__info">
          <div class="v3-ghost-line" style="width:65%;height:12px;border-radius:4px;margin-bottom:6px;"></div>
          <div class="v3-ghost-line" style="width:45%;height:9px;border-radius:4px;"></div>
        </div>
        <div class="v3-ghost-block" style="width:60px;height:30px;border-radius:8px;"></div>
      </div>
      <div class="v3-event v3-event--ghost" style="opacity:0.5;">
        <div class="v3-event__date v3-ghost-block" style="width:42px;height:44px;border-radius:10px;"></div>
        <div class="v3-event__info">
          <div class="v3-ghost-line" style="width:75%;height:12px;border-radius:4px;margin-bottom:6px;"></div>
          <div class="v3-ghost-line" style="width:40%;height:9px;border-radius:4px;"></div>
        </div>
        <div class="v3-ghost-block" style="width:60px;height:30px;border-radius:8px;"></div>
      </div>`;
    eventsSection.style.display = '';
    eventsSection.classList.add('is-ghost');
    // Update section title to hint
    const titleEl = eventsSection.querySelector('.v3-section__title');
    if (titleEl) titleEl.textContent = 'Upcoming Shows';
    const actionEl = eventsSection.querySelector('.v3-section__action');
    if (actionEl) actionEl.style.display = 'none';
  }
}
```

- [ ] **Step 29:** Add ghost CSS. After `.v3-empty-state__action` styles, add:

```css
/* ── GHOST / SKELETON UI ─────────────────────────────────────── */
.v3-ghost-block {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 100%);
  background-size: 200% 100%;
  animation: ghostShimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
  flex-shrink: 0;
}
.v3-ghost-line {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.07) 50%,
    rgba(255,255,255,0.04) 100%);
  background-size: 200% 100%;
  animation: ghostShimmer 1.8s ease-in-out infinite;
}
@keyframes ghostShimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
.v3-event--ghost { pointer-events: none; }
/* Stagger shimmer on second ghost row */
.v3-event--ghost:nth-child(2) .v3-ghost-block,
.v3-event--ghost:nth-child(2) .v3-ghost-line {
  animation-delay: 0.3s;
}
/* Ghost section — section header still shows, action hidden */
.v3-section.is-ghost .v3-section__footer { display: none; }
```

- [ ] **Step 30:** Run parse-check. Expected: `JS OK`

- [ ] **Step 31:** Commit.
```bash
git add able-v3.html
git commit -m "feat: ghost skeleton events on home tab — structural presence when empty"
```

---

### Task 9: Ghost music rows on home tab when empty

**Files:**
- Modify: `able-v3.html` — home music preview block in `applyProfile` (around line 2538)

- [ ] **Step 32:** Replace the home music block to always show (ghost when empty):

```js
// REPLACE lines ~2538-2558:
const musicSection = document.getElementById('v3HomeMusicSection');
const musicList = document.getElementById('v3HomeMusicList');
const releases = data.releases || [];
if (musicSection && musicList) {
  const accent = data.accent || '#06b6d4';
  if (releases.length) {
    musicList.innerHTML = releases.slice(0, 2).map(rel => {
      const artBg = rel.artworkUrl
        ? `url(${rel.artworkUrl}) center/cover`
        : `linear-gradient(135deg,rgba(${hexToRgb(accent)},.35),rgba(0,0,0,.6))`;
      return `<div class="v3-track">
        <div class="v3-track__art" style="background:${artBg};"></div>
        <div class="v3-track__info">
          <div class="v3-track__name">${rel.title || 'Untitled'}</div>
          <div class="v3-track__meta">${rel.type || 'Release'}${rel.year ? ' · ' + rel.year : ''}</div>
        </div>
        <div class="v3-track__play-wrap"><div class="v3-track__play">▶</div></div>
      </div>`;
    }).join('');
    musicSection.style.display = '';
    musicSection.classList.remove('is-ghost');
  } else {
    musicList.innerHTML = `
      <div class="v3-track" style="pointer-events:none;">
        <div class="v3-ghost-block" style="width:44px;height:44px;border-radius:10px;flex-shrink:0;"></div>
        <div class="v3-track__info">
          <div class="v3-ghost-line" style="width:70%;height:12px;border-radius:4px;margin-bottom:6px;"></div>
          <div class="v3-ghost-line" style="width:45%;height:9px;border-radius:4px;"></div>
        </div>
        <div class="v3-ghost-block" style="width:28px;height:28px;border-radius:50%;"></div>
      </div>
      <div class="v3-track" style="pointer-events:none;opacity:0.5;">
        <div class="v3-ghost-block" style="width:44px;height:44px;border-radius:10px;flex-shrink:0;animation-delay:0.25s;"></div>
        <div class="v3-track__info">
          <div class="v3-ghost-line" style="width:55%;height:12px;border-radius:4px;margin-bottom:6px;animation-delay:0.25s;"></div>
          <div class="v3-ghost-line" style="width:35%;height:9px;border-radius:4px;animation-delay:0.25s;"></div>
        </div>
        <div class="v3-ghost-block" style="width:28px;height:28px;border-radius:50%;animation-delay:0.25s;"></div>
      </div>`;
    musicSection.style.display = '';
    musicSection.classList.add('is-ghost');
    const actionEl = musicSection.querySelector('.v3-section__action');
    if (actionEl) actionEl.style.display = 'none';
  }
}
```

- [ ] **Step 33:** Run parse-check. Expected: `JS OK`

- [ ] **Step 34:** Commit.
```bash
git add able-v3.html
git commit -m "feat: ghost skeleton music on home tab — always shows structural presence"
```

---

### Task 10: Show both ghost sections even before profile loads

**Files:**
- Modify: `able-v3.html` — home panel HTML, static default state

- [ ] **Step 35:** The `v3HomeEventsSection` and `v3HomeMusicSection` both have `style="display:none"` in the HTML. Remove those inline styles — they're now controlled entirely by JS (which shows ghost or real content). This prevents FOUC where sections flash from hidden to visible.

Find in HTML:
```html
<div class="v3-section" id="v3HomeMusicSection" style="display:none">
```
Change to:
```html
<div class="v3-section" id="v3HomeMusicSection">
```

And:
```html
<div class="v3-section" id="v3HomeEventsSection" style="display:none">
```
Change to:
```html
<div class="v3-section" id="v3HomeEventsSection">
```

Sections will show ghost content immediately on paint, replaced with real content by JS.

- [ ] **Step 36:** Pre-populate both sections with a static ghost state in HTML so they look intentional even before JS runs:

Inside `v3HomeMusicSection`, replace the empty `<div id="v3HomeMusicList"></div>` with ghost rows:
```html
<div id="v3HomeMusicList">
  <div class="v3-track" style="pointer-events:none;">
    <div class="v3-ghost-block" style="width:44px;height:44px;border-radius:10px;flex-shrink:0;"></div>
    <div class="v3-track__info">
      <div class="v3-ghost-line" style="width:68%;height:12px;border-radius:4px;margin-bottom:6px;"></div>
      <div class="v3-ghost-line" style="width:42%;height:9px;border-radius:4px;"></div>
    </div>
    <div class="v3-ghost-block" style="width:28px;height:28px;border-radius:50%;"></div>
  </div>
</div>
```

- [ ] **Step 37:** Run parse-check. Expected: `JS OK`

- [ ] **Step 38:** Commit.
```bash
git add able-v3.html
git commit -m "feat: home tab shows ghost skeleton before JS runs — no layout shift"
```

---

## Chunk 4 — Owner Placeholder Redesign (steps 39–52)

The current owner placeholders (dashed border, tiny underlined text) are too quiet. Artists miss them. They need to feel like an opportunity, not a footnote.

---

### Task 11: Redesign owner placeholder CSS and HTML

**Files:**
- Modify: `able-v3.html` — `.v3-ph` CSS + 3× placeholder HTML blocks

- [ ] **Step 39:** Replace the `.v3-ph` CSS block (around line 1191):

```css
/* ── OWNER PLACEHOLDER SECTIONS ── */
.v3-ph {
  margin: 0 var(--space-page) var(--space-gap);
  padding: 20px 18px;
  border-radius: var(--radius-card);
  border: 1.5px dashed rgba(var(--color-accent-rgb), 0.25);
  background:
    linear-gradient(160deg, rgba(var(--color-accent-rgb),0.04) 0%, transparent 50%),
    var(--color-card);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s cubic-bezier(0.25,0.46,0.45,0.94);
}
.v3-ph.owner-visible {
  opacity: 1;
  pointer-events: auto;
}
.v3-ph__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--color-accent-subtle);
  border: 1px solid rgba(var(--color-accent-rgb), 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 2px;
}
.v3-ph__label {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.4;
}
.v3-ph__sub {
  font-size: 12px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  max-width: 220px;
}
.v3-ph__cta {
  margin-top: 4px;
  padding: 10px 20px;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.3px;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.15s;
}
.v3-ph__cta:hover { opacity: 0.88; }
.v3-ph__owner-badge {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: rgba(var(--color-accent-rgb), 0.5);
  margin-bottom: 2px;
}
```

- [ ] **Step 40:** Update the music placeholder HTML (around line 1592):

```html
<!-- Music placeholder — owner only -->
<div class="v3-ph" id="v3PhMusic">
  <div class="v3-ph__owner-badge">Only you can see this</div>
  <div class="v3-ph__icon">🎵</div>
  <div class="v3-ph__label">Add your music</div>
  <div class="v3-ph__sub">Paste a Spotify, Apple Music, or SoundCloud link and it appears here instantly.</div>
  <button class="v3-ph__cta" onclick="window.location.href='admin.html'">Add music →</button>
</div>
```

- [ ] **Step 41:** Update the events placeholder HTML (around line 1611):

```html
<!-- Events placeholder — owner only -->
<div class="v3-ph" id="v3PhEvents">
  <div class="v3-ph__owner-badge">Only you can see this</div>
  <div class="v3-ph__icon">🎤</div>
  <div class="v3-ph__label">Add a show date</div>
  <div class="v3-ph__sub">When you add a show, the ticket button goes front and centre for every fan who visits.</div>
  <button class="v3-ph__cta" onclick="window.location.href='admin.html'">Add a show →</button>
</div>
```

- [ ] **Step 42:** Find snap card placeholder if it exists (check for `v3PhSnaps`). If found, update similarly. If it doesn't exist yet, add it after the events placeholder:

```html
<!-- Snap cards placeholder — owner only -->
<div class="v3-ph" id="v3PhSnaps">
  <div class="v3-ph__owner-badge">Only you can see this</div>
  <div class="v3-ph__icon">⚡</div>
  <div class="v3-ph__label">Add a snap card</div>
  <div class="v3-ph__sub">Quick moments — show announcements, merch drops, behind-the-scenes. Fans swipe through them.</div>
  <button class="v3-ph__cta" onclick="window.location.href='admin.html'">Add snap card →</button>
</div>
```

- [ ] **Step 43:** Run parse-check. Expected: `JS OK`

- [ ] **Step 44:** Commit.
```bash
git add able-v3.html
git commit -m "feat(owner-placeholders): accent-coloured cards with clear labels and CTA buttons"
```

---

## Chunk 5 — Snap Cards Personalization (steps 45–56)

Snap cards are currently hardcoded demo data — every artist gets "Fabric, London" and "my debut album" in their snap feed. They need to be driven by real profile data.

---

### Task 12: Drive snap cards from profile data

**Files:**
- Modify: `able-v3.html` — `SNAP_CARDS` constant + `initSnapFeed` function

- [ ] **Step 45:** Remove the static `SNAP_CARDS` array. Replace `initSnapFeed` with a version that builds cards from profile data:

```js
function initSnapFeed() {
  const feed = document.getElementById('v3SnapFeed');
  if (!feed) return;
  const data = safeGet(V3_KEY, V3_DEFAULTS);
  const params = new URLSearchParams(window.location.search);
  const activeId = params.get('snap') || params.get('from') || null;

  const cards = [];

  // Release card — only if there's a release title
  const releaseTitle = data.release?.title || data.releases?.[0]?.title;
  if (releaseTitle) {
    cards.push({
      id: 'release',
      eyebrow: data.release?.type || 'New Release',
      msg: `${releaseTitle} — out now on all platforms.`,
      cta: 'Stream Now',
      bg: `linear-gradient(160deg, var(--color-accent) 0%, rgba(0,0,0,0.88) 100%)`,
    });
  }

  // Show card — only if upcoming events exist
  const now = Date.now();
  const nextShow = (data.events || [])
    .filter(e => e.venue && e.date && new Date(e.date).getTime() >= now)
    .sort((a,b) => new Date(a.date) - new Date(b.date))[0];
  if (nextShow) {
    const d = new Date(nextShow.date);
    const dateStr = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    cards.push({
      id: 'show',
      eyebrow: 'Live',
      msg: `${nextShow.venue}, ${nextShow.city} — ${dateStr}.`,
      cta: nextShow.ticketUrl ? 'Get Tickets' : 'Find out more',
      bg: 'linear-gradient(160deg, #1e3a5f, #05080f)',
    });
  }

  // Merch card — only if merch items exist
  const firstMerch = (data.merch?.items || [])[0];
  if (firstMerch) {
    cards.push({
      id: 'merch',
      eyebrow: firstMerch.badge || 'Merch',
      msg: `${firstMerch.title} — ${firstMerch.price}.`,
      cta: 'Shop Now',
      bg: 'linear-gradient(160deg, #3a1a08, #080808)',
    });
  }

  // Support card — only if support is enabled
  const firstPack = (data.support?.packs || []).filter(p => p.label)[0];
  if (data.support?.enabled && firstPack) {
    cards.push({
      id: 'support',
      eyebrow: 'Support',
      msg: firstPack.description || 'If this music has meant something — thank you.',
      cta: firstPack.label || 'Support me',
      bg: 'linear-gradient(160deg, #1a0a2a, #05080f)',
    });
  }

  // Fallback: if no cards built (totally fresh profile), show one placeholder card
  if (!cards.length) {
    cards.push({
      id: 'release',
      eyebrow: 'New Release',
      msg: 'Something's being made. You're early.',
      cta: 'Stay close',
      bg: `linear-gradient(160deg, var(--color-accent) 0%, rgba(0,0,0,0.88) 100%)`,
    });
  }

  feed.innerHTML = '';
  cards.forEach(card => {
    const el = document.createElement('div');
    el.className = 'v3-snap-card' + (card.id === activeId ? ' is-active' : '');
    el.innerHTML = `
      <div class="v3-snap-card__bg" style="background:${card.bg};"></div>
      <div class="v3-snap-card__overlay"></div>
      <div class="v3-snap-card__content">
        <div class="v3-snap-card__eyebrow">${card.eyebrow}</div>
        <div class="v3-snap-card__msg">${card.msg}</div>
        <button class="v3-snap-card__btn">${card.cta}</button>
      </div>`;
    if (card.id === activeId) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }), 300);
    }
    feed.appendChild(el);
  });
}
```

- [ ] **Step 46:** Move `initSnapFeed()` call to *after* `applyProfile(v3Profile)` so it has access to the loaded data. Currently `initSnapFeed` is called separately at the bottom — it now needs data context. Change the call at the end of the script from `initSnapFeed()` to just ensure it's called after `applyProfile`.

- [ ] **Step 47:** Run parse-check. Expected: `JS OK`

- [ ] **Step 48:** Test: open browser, check snap feed shows data from the profile (release title, venue, etc). Test with empty profile — should show single "Something's being made" fallback card.

- [ ] **Step 49:** Increase snap card message font size. Find `.v3-snap-card__msg` (around line 875). Change `font-size: 11.5px` to `font-size: 12.5px`. Also increase `.v3-snap-card__eyebrow` from `8.5px` to `9px`.

- [ ] **Step 50:** Commit.
```bash
git add able-v3.html
git commit -m "feat(snap-cards): driven by real profile data — no more hardcoded Fabric London demo"
```

---

### Task 13: Re-init snap feed when profile saves

**Files:**
- Modify: `able-v3.html` — `saveAdmin` function

- [ ] **Step 51:** In `saveAdmin()`, after `applyProfile(updated)`, call `initSnapFeed()` so snap cards update immediately when artist saves:

```js
// After applyProfile(updated):
initSnapFeed();
```

- [ ] **Step 52:** Run parse-check. Expected: `JS OK`

- [ ] **Step 53:** Commit.
```bash
git add able-v3.html
git commit -m "feat(snap-cards): re-init feed on profile save so changes appear instantly"
```

---

## Chunk 6 — Visual Polish (steps 54–72)

---

### Task 14: Fix colour token drift

**Files:**
- Modify: `able-v3.html` — `:root` CSS block

- [ ] **Step 54:** Align `--color-bg` with CLAUDE.md spec. Change `#0f1624` → `#0d0e1a`. Change `--color-card: #192438` → `#12152a`. Change `--color-card-raised: #1f2d45` → `#1a1e35`. This brings all three base colours in line with the documented design system.

- [ ] **Step 55:** Verify all 4 themes still look correct after the token change. The dark theme will shift slightly cooler. Check light, mid, glass are unaffected (they override --color-bg).

- [ ] **Step 56:** Commit.
```bash
git add able-v3.html
git commit -m "fix: align color-bg/card tokens with CLAUDE.md spec — remove drift"
```

---

### Task 15: Fix glass theme (needs background image fallback)

**Files:**
- Modify: `able-v3.html` — `[data-theme="glass"]` CSS + `applyProfile` JS

- [ ] **Step 57:** The glass theme requires `body` to have a `background-image` with artwork to make the blur meaningful. When glass theme is active and no hero image exists, it looks flat. Add a fallback in `applyProfile`:

```js
// After setting the theme attribute, add glass body bg:
if ((data.theme || 'dark') === 'glass') {
  const heroUrl = data.heroImageUrl || data.release?.artworkUrl || '';
  if (heroUrl) {
    document.body.style.backgroundImage = `url(${heroUrl})`;
  } else {
    // Fallback: use accent gradient as background for glass effect to blur
    document.body.style.backgroundImage =
      `radial-gradient(ellipse at 30% 20%, rgba(${hexToRgb(data.accent)},0.6) 0%, transparent 55%),
       radial-gradient(ellipse at 70% 80%, rgba(${hexToRgb(data.accent)},0.3) 0%, transparent 45%),
       linear-gradient(160deg, #050510 0%, #0a0a1a 100%)`;
  }
} else {
  document.body.style.backgroundImage = '';
}
```

- [ ] **Step 58:** Run parse-check. Expected: `JS OK`

- [ ] **Step 59:** Commit.
```bash
git add able-v3.html
git commit -m "fix(glass-theme): accent gradient fallback background — no longer renders flat"
```

---

### Task 16: Improve status bar

**Files:**
- Modify: `able-v3.html` — status bar HTML

- [ ] **Step 60:** Replace the `●●●` text signal indicator with proper SVG signal bars (already have the pattern from the existing SVG signal bars in the status bar — the WiFi icon needs to become actual cellular bars):

Find in HTML (around line 1474):
```html
<span>●●●</span>
```
Replace with:
```html
<svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true">
  <rect x="0"  y="8"  width="3" height="4"  rx="0.8" opacity="0.35"/>
  <rect x="4"  y="5.5" width="3" height="6.5" rx="0.8" opacity="0.55"/>
  <rect x="8"  y="3"  width="3" height="9"  rx="0.8" opacity="0.75"/>
  <rect x="12" y="0"  width="3" height="12" rx="0.8"/>
</svg>
```

- [ ] **Step 61:** Commit.
```bash
git add able-v3.html
git commit -m "fix: replace ●●● with proper SVG cellular signal bars in status bar"
```

---

### Task 17: Increase hero height and secondary CTA opacity

**Files:**
- Modify: `able-v3.html` — `.v3-hero` CSS + `.v3-cta--secondary` CSS

- [ ] **Step 62:** Find `.v3-hero` (around line 235). Change `height: 260px` to `height: 300px`. This gives the artist name more visual room and makes the entrance feel more cinematic.

- [ ] **Step 63:** Update the gradient scrim height to match. Find `.v3-hero__scrim` (around line 266). Change `height: 160px` to `height: 180px`.

- [ ] **Step 64:** Find `.v3-cta--secondary` (around line 622). Change `color: rgba(255,255,255,0.65)` to `color: rgba(255,255,255,0.85)`. The secondary CTA was too dim to read comfortably.

- [ ] **Step 65:** Commit.
```bash
git add able-v3.html
git commit -m "feat(visual): hero 260→300px height, secondary CTA text more legible"
```

---

### Task 18: CTA default state — don't render dead buttons

**Files:**
- Modify: `able-v3.html` — `applyProfile` JS, CTA wiring (around line 2500)

- [ ] **Step 66:** Currently both CTAs always render even when their URL is `'#'`. Tapping them does nothing and gives no feedback. Add visual feedback for missing URLs:

```js
// Replace CTA wiring block (around lines 2500-2509):
const primary = document.getElementById('v3CtaPrimary');
const secondary = document.getElementById('v3CtaSecondary');
if (primary && data.ctaPrimary) {
  primary.textContent = data.ctaPrimary.label;
  const url = data.ctaPrimary.url;
  if (url && url !== '#') {
    primary.onclick = () => { trackClick(primary.textContent.trim(), 'primary_cta'); window.open(url, '_blank'); };
    primary.disabled = false;
    primary.style.opacity = '';
  } else {
    // No URL — still render but visually hint and track intent
    primary.onclick = () => trackClick(primary.textContent.trim() + ' (no URL)', 'primary_cta_no_url');
    primary.disabled = false;
  }
}
if (secondary && data.ctaSecondary) {
  secondary.textContent = data.ctaSecondary.label;
  const url = data.ctaSecondary.url;
  if (url && url !== '#') {
    secondary.onclick = () => { trackClick(secondary.textContent.trim(), 'secondary_cta'); window.open(url, '_blank'); };
    secondary.disabled = false;
    secondary.style.opacity = '';
  } else {
    secondary.onclick = () => trackClick(secondary.textContent.trim() + ' (no URL)', 'secondary_cta_no_url');
    secondary.disabled = false;
  }
}
```

- [ ] **Step 67:** Run parse-check. Expected: `JS OK`

- [ ] **Step 68:** Commit.
```bash
git add able-v3.html
git commit -m "fix(cta): track intent even on no-URL buttons — no silent dead taps"
```

---

### Task 19: Desktop ambient glow on body

**Files:**
- Modify: `able-v3.html` — `@media (min-width: 480px)` CSS block

- [ ] **Step 69:** The desktop body background uses a static accent gradient in CSS. But the gradient is set before JS can update it. Move the desktop background radial gradient to be dynamically updated by `applyAmbientGlow`:

```js
// In applyAmbientGlow, after setting the CSS var, also update desktop body bg:
function applyAmbientGlow(accentHex) {
  const r = parseInt(accentHex.slice(1,3), 16);
  const g = parseInt(accentHex.slice(3,5), 16);
  const b = parseInt(accentHex.slice(5,7), 16);
  document.documentElement.style.setProperty('--color-ambient', `rgba(${r},${g},${b},0.18)`);
  // Update desktop body background to reflect artist's accent
  if (window.innerWidth >= 480) {
    document.body.style.setProperty('background-image',
      `radial-gradient(ellipse at 50% 0%, rgba(${r},${g},${b},0.12) 0%, transparent 60%)`);
  }
}
```

- [ ] **Step 70:** Run parse-check. Expected: `JS OK`

- [ ] **Step 71:** Commit.
```bash
git add able-v3.html
git commit -m "feat(visual): desktop body glow dynamically updates to artist accent colour"
```

---

### Task 20: Snap card dimensions and visual variety

**Files:**
- Modify: `able-v3.html` — `.v3-snap-card` CSS

- [ ] **Step 72:** The snap cards are all the same size and share similar gradient backgrounds. Add visual variety — alternate heights for the first card to create a bento-grid feel:

```css
/* First snap card is taller — anchors the row */
.v3-snap-feed .v3-snap-card:first-child {
  height: 220px;
  width: 170px;
}
```

Also round `.v3-snap-card` border-radius from `16px` to `18px` for more softness.

- [ ] **Step 73:** Commit.
```bash
git add able-v3.html
git commit -m "feat(snap-cards): first card taller, rounder corners — visual rhythm in the row"
```

---

## Chunk 7 — Copy Overhaul (steps 74–84)

---

### Task 21: Fix all remaining weak copy

**Files:**
- Modify: `able-v3.html` — scattered HTML and JS strings

- [ ] **Step 74:** Fix the engagement nudge (around line 1631). Current: `"Drop a comment on my latest — it genuinely helps."` This is good but generic. It should reference the current release. Update the JS to populate it dynamically in `applyProfile`:

```js
// After setText('v3ArtistBio', data.bio):
const nudgeEl = document.querySelector('.v3-engage');
if (nudgeEl) {
  const title = data.release?.title || data.releases?.[0]?.title;
  if (title) {
    nudgeEl.innerHTML = `Drop a comment on <strong>${title}</strong> — it genuinely helps.`;
  }
}
```

Remove the static content from the HTML div:
```html
<!-- Change the static engage div to empty — JS fills it -->
<div class="v3-engage" id="v3Engage"></div>
```

- [ ] **Step 75:** Fix the support panel header copy. Find in `renderSupportPanel`: `<p>Help the music keep going</p>`. Change to `<p>Direct support</p>` — cleaner, less generic.

- [ ] **Step 76:** Fix the "0 upcoming" panel header copy. In `renderEventsPanel`, when upcoming.length is 0 but past shows exist, the panel header reads "0 upcoming · 2 past". Change to:

```js
const upcomingStr = upcoming.length ? `${upcoming.length} upcoming` : 'Nothing booked yet';
const pastStr = past.length ? ` · ${past.length} past` : '';
let html = `<div class="v3-panel-header"><h2>Shows</h2><p>${upcomingStr}${pastStr}</p></div>`;
```

- [ ] **Step 77:** Fix the "Edit in Admin" credit placeholder. In `V3_DEFAULTS`, change:
```js
credits: [
  { name: 'Edit in Admin',  role: 'Replace with your credits' },
],
```
to:
```js
credits: [],
```
An empty credits array renders nothing (the credits toggle won't show). This is cleaner than showing meta-instructions as fake credits.

- [ ] **Step 78:** Fix the admin save button copy. Find `id="v3AdminSave"` HTML. Change text from `"Save changes"` to just `"Save"` — shorter, more confident.

- [ ] **Step 79:** Run parse-check. Expected: `JS OK`

- [ ] **Step 80:** Commit.
```bash
git add able-v3.html
git commit -m "fix(copy): dynamic engagement nudge, clean support copy, remove fake credits"
```

---

### Task 22: Fix platform pills empty state copy

**Files:**
- Modify: `able-v3.html` — `applyProfile` JS (platform pills section, around line 2511)

- [ ] **Step 81:** When no platform URLs are set, the pill row renders empty. For owners, show a ghost placeholder. For fans, hide the row entirely:

```js
if (pillsWrap) {
  const activePlatforms = (data.platforms || []).filter(p => p.url && p.url.trim());
  const isOwner = !!(localStorage.getItem('able_v3_profile') || localStorage.getItem('able_profile'));
  if (activePlatforms.length) {
    const MAX_VISIBLE = 4;
    const visible  = activePlatforms.slice(0, MAX_VISIBLE);
    const overflow = activePlatforms.slice(MAX_VISIBLE);
    pillsWrap.innerHTML = visible.map(p =>
      `<a href="${p.url}" target="_blank" rel="noopener" class="v3-pill"
         onclick="trackClick('${p.label}','pill')" style="text-decoration:none;">
        ${platformIconHtml(p.type, 12)} ${p.label}
       </a>`
    ).join('') + (overflow.length
      ? `<button class="v3-pill v3-pill--overflow" id="v3PillsToggle" onclick="...">+${overflow.length} more</button>`
      : '');
  } else if (isOwner) {
    // Owner: show ghost pills as invitation to add platforms
    pillsWrap.innerHTML = `
      <div class="v3-ghost-block" style="width:90px;height:38px;border-radius:20px;"></div>
      <div class="v3-ghost-block" style="width:80px;height:38px;border-radius:20px;animation-delay:0.15s;"></div>
      <div class="v3-ghost-block" style="width:75px;height:38px;border-radius:20px;animation-delay:0.3s;"></div>`;
  } else {
    pillsWrap.innerHTML = '';
  }
}
```

(Keep the overflow handler logic from Task 1 intact here.)

- [ ] **Step 82:** Run parse-check. Expected: `JS OK`

- [ ] **Step 83:** Commit.
```bash
git add able-v3.html
git commit -m "feat(pills): ghost skeletons for owner when no platforms set; hidden for fans"
```

---

## Chunk 8 — Accessibility & Technical Hygiene (steps 84–94)

---

### Task 23: Focus management in admin panel

**Files:**
- Modify: `able-v3.html` — `openAdmin` and `closeAdmin` JS functions

- [ ] **Step 84:** When admin opens, move focus to first input. When admin closes, return focus to the admin button:

```js
function openAdmin() {
  populateAdmin(safeGet(V3_KEY, V3_DEFAULTS));
  adminOverlay.removeAttribute('hidden');
  requestAnimationFrame(() => {
    adminOverlay.classList.add('is-open');
    // Focus first input after animation
    setTimeout(() => {
      const first = adminSheet.querySelector('input, textarea, button:not(.v3-admin-head__done)');
      if (first) first.focus();
    }, 350);
  });
}

function closeAdmin() {
  adminOverlay.classList.remove('is-open');
  adminSheet.addEventListener('transitionend', () => {
    adminOverlay.setAttribute('hidden', '');
    // Return focus to admin button
    document.getElementById('v3AdminBtn')?.focus();
  }, { once: true });
}
```

- [ ] **Step 85:** Add `aria-label` to the hero image container. Find `<div class="v3-hero__image" id="v3HeroImage">` and add `role="img"`. Then in `applyProfile`, set its aria-label:

```js
const heroEl = document.getElementById('v3HeroImage');
if (heroEl) heroEl.setAttribute('aria-label', `${data.name || 'Artist'} — profile artwork`);
```

- [ ] **Step 86:** Add `aria-label` to the snap feed. Find `<div class="v3-snap-feed"` in HTML. Add `aria-label="Quick updates"` and `role="region"`.

- [ ] **Step 87:** Run parse-check. Expected: `JS OK`

- [ ] **Step 88:** Commit.
```bash
git add able-v3.html
git commit -m "feat(a11y): admin focus management, hero aria-label, snap feed region"
```

---

### Task 24: Fix fan count social proof (device-local problem)

**Files:**
- Modify: `able-v3.html` — fan count IIFE at bottom of script (around line 2975)

- [ ] **Step 89:** The fan count reads only from localStorage — shows different numbers on different devices. Fix: only show social proof if local count > 3 (meaning this device has seen actual signups, not just the artist's own tests), AND use copy that doesn't imply a global total:

```js
// REPLACE the fan count IIFE:
(function() {
  try {
    const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
    const note = document.getElementById('v3FanNote');
    if (note && fans.length >= 3) {
      // Only show if enough local signups to feel real
      note.textContent = `${fans.length} people have signed up from this link. No noise. Unsubscribe any time.`;
    }
    // Otherwise show default copy (already set in HTML)
  } catch(e) {}
})();
```

- [ ] **Step 90:** Run parse-check. Expected: `JS OK`

- [ ] **Step 91:** Commit.
```bash
git add able-v3.html
git commit -m "fix: fan count social proof only shown when locally meaningful (≥3)"
```

---

### Task 25: Ensure snap feed re-fires after admin save

**Files:**
- Modify: `able-v3.html` — already done in step 51. Verify it's in place.

- [ ] **Step 92:** Read `saveAdmin()` and confirm `initSnapFeed()` is called after `applyProfile(updated)`. If not, add it.

- [ ] **Step 93:** Also re-render ghost/real sections after save. Confirm `applyProfile` already calls both `renderEventsPanel` and `renderMusicPanel` — it does (line 2532–2536). Ghost logic in home tab also runs inside `applyProfile`. Confirm this is the case.

---

## Chunk 9 — Final Verification & Commit (steps 94–100)

---

### Task 26: Full smoke test across all themes and states

- [ ] **Step 94:** Open `able-v3.html` in browser. Check home tab: ghost music rows visible, ghost event rows visible. Verify shimmer animation runs.

- [ ] **Step 95:** Switch to Dark theme. All tokens correct. Hero gradient visible. Snap feed shows data.

- [ ] **Step 96:** Switch to Light theme. Cards legible. Accent renders correctly. `--color-on-accent: #0d0e1a` means dark text on coloured buttons.

- [ ] **Step 97:** Switch to Glass theme. Verify accent gradient background blurs behind glass cards.

- [ ] **Step 98:** Switch to Mid theme. Dark body, white cards, correct contrast.

- [ ] **Step 99:** Test empty profile state. Clear localStorage. Reload. Verify: ghost skeletons on home tab, snap feed shows "Something's being made" fallback card, empty panel states show rich copy with fan actions.

- [ ] **Step 100:** Run final parse-check. All themes verified. Commit.
```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('able-v3.html','utf8');
const js = src.match(/<script>([\s\S]*?)<\/script>/)?.[1]||'';
new Function(js);
console.log('JS OK');
"
git add able-v3.html
git commit -m "feat: able-v3 ten-out-of-ten polish — all 50 audit points addressed"
```

---

## Summary of Changes

| Chunk | Steps | What it fixes |
|-------|-------|---------------|
| 1 — Critical bugs | 1–12 | Pill overflow, missing token, tap target |
| 2 — Fan empty states | 13–27 | All 4 panel empty states with voice + actions |
| 3 — Home tab | 28–38 | Ghost skeleton always visible — no more hollow home |
| 4 — Owner placeholders | 39–44 | Accent-card design, "Only you can see this" badge |
| 5 — Snap cards | 45–53 | Driven by real data, fallback card for new artists |
| 6 — Visual polish | 54–73 | Token drift, glass theme, status bar, hero height, ambient glow |
| 7 — Copy | 74–83 | Dynamic engagement nudge, clean panel copy, ghost pills |
| 8 — A11y & technical | 84–93 | Focus management, aria labels, fan count fix |
| 9 — Verification | 94–100 | Smoke tests across all 4 themes and empty states |

**Files changed:** `able-v3.html` only.
**No new files.** No build step. No dependencies added.
