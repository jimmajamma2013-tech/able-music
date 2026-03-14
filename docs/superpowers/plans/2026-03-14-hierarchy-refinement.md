# Hierarchy Refinement — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the 6 V1 items from the Hierarchy Refinement Spec so `able-v6.html` goes from "styled as moment-aware" to "built as moment-aware."

**Architecture:** All changes are in `able-v6.html` (JS + HTML) and `admin.html` (HTML + JS). No new files. The section ordering system replaces the current hardcoded DOM insertion order. Email capture copy variants replace hardcoded strings. Inline credits extend existing `renderListenSection`. Top card credit line extends existing `renderHero`. Section visibility toggles are a new admin feature writing to `profile.sectionVisibility`.

**Tech Stack:** Vanilla JS, CSS custom properties, localStorage. No build step. Parse-check after every edit: `node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"`. Playwright MCP for smoke tests.

---

## Chunk 1: Section ordering system

### Task 1: Add `computeSectionOrder()` to able-v6.html

**Files:**
- Modify: `able-v6.html` (JS — after `computeState()` function, ~line 4295)

- [ ] **Step 1: Insert STATE_PROMOTIONS and computeSectionOrder()**

Find the line immediately after `computeState()` closes (the line with just `}`):

```javascript
    }
    // Gig state set manually via admin toggle.
```

Insert after that closing brace block:

```javascript
    // === SECTION ORDER SYSTEM =====================================
    // STATE_PROMOTIONS: lower number = higher position.
    // null = section stays visible but loses promotion.
    const STATE_PROMOTIONS = {
      'profile':     {},
      'pre-release': { 'listen-section': 6, 'world-map-section': 4 },
      'live':        { 'listen-section': 2, 'shows-section': 4, 'merch-section': 5 },
      'gig':         { 'shows-section': 2, 'listen-section': 6 },
      'near-future': { 'world-map-section': 2 }
    }

    const DEFAULT_SECTION_ORDER = [
      'listen-section', 'shows-section', 'world-map-section',
      'snap-cards-section', 'merch-section', 'support-section', 'recommendations-section'
    ]

    function computeSectionOrder(profile) {
      const state = computeState(profile)
      const base = profile.sectionOrder || DEFAULT_SECTION_ORDER
      const vis  = profile.sectionVisibility || {}
      const promos = STATE_PROMOTIONS[state] || {}

      return base
        .filter(id => vis[id] !== false)
        .sort((a, b) => {
          const pa = promos[a] !== undefined ? promos[a] : (base.indexOf(a) + 10)
          const pb = promos[b] !== undefined ? promos[b] : (base.indexOf(b) + 10)
          return pa - pb
        })
    }

    function applySectionOrder(profile) {
      const order = computeSectionOrder(profile)
      const vis   = profile.sectionVisibility || {}
      const container = document.getElementById('scroll-container')
      if (!container) return

      // Hidden sections
      DEFAULT_SECTION_ORDER.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        el.hidden = vis[id] === false
      })

      // Re-order: find anchor after fan-capture (the first configurable zone element)
      const fanCapture = document.getElementById('fan-capture')
      if (!fanCapture) return
      let anchor = fanCapture.nextElementSibling

      order.forEach(id => {
        const el = document.getElementById(id)
        if (!el || el.hidden) return
        container.insertBefore(el, anchor)
      })
    }
```

- [ ] **Step 2: Parse-check**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```
Expected: `OK`

---

### Task 2: Add section IDs to HTML + replace gig reorder hack

**Files:**
- Modify: `able-v6.html` (HTML sections, renderProfile JS)

- [ ] **Step 1: Verify section IDs exist**

Run:
```bash
grep -n 'id="listen-section"\|id="shows-section"\|id="world-map-section"\|id="snap-cards-section"\|id="merch-section"\|id="support-section"\|id="recommendations-section"' able-v6.html
```

Expected: each ID should appear once. Note which are missing (world-map-section, snap-cards-section, recommendations-section may need adding).

- [ ] **Step 2: Add missing section wrapper IDs**

For any section without an `id`, wrap it. Example — find the snap cards section element and ensure it has `id="snap-cards-section"`. Same for world-map, recommendations.

- [ ] **Step 3: Replace gig reorder hack with applySectionOrder()**

Find:
```javascript
      // §6.1: Shows before Listen in gig state
      const state = computeState(profile)
      if (state === 'gig') {
        const listenEl = document.getElementById('listen-section')
        const showsEl  = document.getElementById('shows-section')
        if (listenEl && showsEl && listenEl.previousElementSibling !== showsEl) {
          listenEl.parentNode.insertBefore(showsEl, listenEl)
        }
      }
```

Replace with:
```javascript
      // Dynamic section ordering — state-driven + artist preference
      applySectionOrder(profile)
```

- [ ] **Step 4: Parse-check + Playwright smoke test**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

Playwright: navigate to `able-v6.html`, set state to `gig`, snapshot — confirm shows-section appears before listen-section in DOM.

- [ ] **Step 5: Commit**

```bash
git add able-v6.html
git commit -m "feat(hierarchy): computeSectionOrder() replaces hardcoded section order

STATE_PROMOTIONS table drives section prominence per campaign state.
applySectionOrder() re-inserts sections after fan-capture in computed
order. Replaces gig state manual DOM hack. Respects profile.sectionOrder
(artist preference) and profile.sectionVisibility (show/hide)."
```

---

## Chunk 2: Email capture copy variants

### Task 3: Add CAPTURE_VARIANTS and update renderFanCapture()

**Files:**
- Modify: `able-v6.html` (JS — after computeSectionOrder, before renderFanCapture ~line 5622)

- [ ] **Step 1: Insert CAPTURE_VARIANTS constant**

Find `function renderFanCapture(profile) {` and insert before it:

```javascript
    const CAPTURE_VARIANTS = {
      'profile':     { heading: 'Stay close.',                        cta: "I'm in",      trust: 'Just {artist}. No spam.' },
      'pre-release': { heading: 'Be the first to hear it.',           cta: 'Notify me',   trust: 'First listen, nothing else.' },
      'live':        { heading: 'Stay on everything I do.',           cta: 'Count me in', trust: 'Just {artist}. No spam.' },
      'gig':         { heading: "I'll let you know about future dates.", cta: 'Let me know', trust: 'Show news only.' },
      'near-future': { heading: 'Remind me.',                         cta: "I'm coming",  trust: 'One email, when it matters.' }
    }
```

- [ ] **Step 2: Update renderFanCapture() to apply variants**

Find inside `renderFanCapture(profile)`:
```javascript
      fc1.hidden = false
      fc2.hidden = false
    }
```

Replace with:
```javascript
      // Apply state-driven copy variant
      const state = computeState(profile)
      const variant = CAPTURE_VARIANTS[state] || CAPTURE_VARIANTS['profile']
      const artistName = profile.name || 'the artist'

      const h1 = document.getElementById('fan-capture-heading')
      const sub1 = document.getElementById('fan-capture-sub')
      const btn1 = fc1.querySelector('.fan-capture__btn')
      const trust1 = document.getElementById('fan-trust')

      if (h1)    h1.textContent = variant.heading
      if (sub1)  sub1.hidden = true  // sub is replaced by trust-line variant
      if (btn1)  btn1.textContent = variant.cta
      if (trust1) trust1.textContent = variant.trust.replace('{artist}', artistName)

      // Gig state: no confetti on submit — handled in initFanForms via state check
      fc1.dataset.captureState = state

      fc1.hidden = false
      fc2.hidden = false
    }
```

- [ ] **Step 3: Parse-check**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

- [ ] **Step 4: Playwright verification**

```javascript
// 1. Navigate to able-v6.html with profile.stateOverride = 'pre-release'
// 2. Snapshot — confirm fan-capture-heading reads "Be the first to hear it."
// 3. Confirm submit button text is "Notify me"
// 4. Set stateOverride = 'gig', reload
// 5. Confirm heading reads "I'll let you know about future dates."
```

- [ ] **Step 5: Commit**

```bash
git add able-v6.html
git commit -m "feat(capture): contextual email capture copy variants by campaign state

5 copy variants (profile/pre-release/live/gig/near-future) applied
via CAPTURE_VARIANTS table in renderFanCapture(). Heading, CTA label,
and trust line all change with state."
```

---

## Chunk 3: Inline credits on release cards

### Task 4: Add renderInlineCredits() + wire into renderListenSection()

**Files:**
- Modify: `able-v6.html` (JS — add helper function, modify release card HTML)

- [ ] **Step 1: Add renderInlineCredits() helper**

Find `function renderListenSection(profile) {` and insert before it:

```javascript
    const ROLE_ABBR = {
      'Production': 'Prod.', 'Producing': 'Prod.', 'Producer': 'Prod.',
      'Mastering': 'Mstrd.', 'Mixing': 'Mix.', 'Mixed': 'Mix.',
      'Direction': 'Dir.', 'Director': 'Dir.',
      'Photography': 'Photo.'
    }
    function abbrRole(role) {
      if (!role) return ''
      for (const [k, v] of Object.entries(ROLE_ABBR)) {
        if (role.toLowerCase().includes(k.toLowerCase())) return v
      }
      return role
    }

    function renderInlineCredits(credits) {
      if (!credits || credits.length === 0) return ''
      const shown = credits.slice(0, 2)
      const overflow = credits.length - 2
      const parts = shown.map(c => `<span class="credit-name">${escHtml(abbrRole(c.role))} ${escHtml(c.name)}</span>`)
      const line = parts.join(' <span class="credit-sep">·</span> ')
      const extra = overflow > 0 ? ` <span class="credit-overflow">+ ${overflow} more</span>` : ''
      return `<div class="release-card__credits">${line}${extra}</div>`
    }
```

- [ ] **Step 2: Add CSS for inline credits**

Find the end of the `/* LISTEN / RELEASES */` CSS block in able-v6.html and add:

```css
    .release-card__credits {
      font-size: 11px;
      color: var(--color-text-3);
      letter-spacing: 0.03em;
      padding-top: 8px;
      margin-top: 8px;
      border-top: 1px solid var(--color-border);
      line-height: 1.4;
    }
    .credit-sep { opacity: 0.5; margin: 0 2px; }
    .credit-overflow { opacity: 0.6; }
    .credit-name { white-space: nowrap; }
```

- [ ] **Step 3: Wire renderInlineCredits into release card HTML**

In `renderListenSection`, find where the release card `innerHTML` or template is constructed. At the end of the card content (after track list, before the closing element), add:

```javascript
        const creditsHtml = renderInlineCredits(rel.credits)
        // append creditsHtml inside card.innerHTML
```

The exact insertion point depends on how the card is built. Find the line where `card.innerHTML = ...` is set (or where the last child is appended), and ensure `creditsHtml` is included at the bottom of the card content.

- [ ] **Step 4: Parse-check + Playwright**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

Playwright: navigate to able-v6.html, snapshot — confirm `.release-card__credits` element exists within a release card and contains credit text.

- [ ] **Step 5: Commit**

```bash
git add able-v6.html
git commit -m "feat(credits): inline credits on release cards (layer 1 of 3)

renderInlineCredits() renders up to 2 credits with role abbreviation
+ overflow count. CSS: secondary text, border-top separator. Tappable
names planned for Phase 2 (ABLE profile links)."
```

---

## Chunk 4: Top card optional credit line

### Task 5: Render profile.topCard.creditLine in hero

**Files:**
- Modify: `able-v6.html` (HTML hero section, renderHero JS)

- [ ] **Step 1: Add credit line element to hero HTML**

Find the hero HTML block — locate the genre/location tag element (`.hero__tag`). After it, add:

```html
        <p class="hero__credit-line" id="hero-credit-line" hidden></p>
```

- [ ] **Step 2: Add CSS for hero credit line**

Find the `.hero__tag` CSS block and add after it:

```css
    .hero__credit-line {
      font-size: 11px;
      color: var(--color-text-3);
      letter-spacing: 0.04em;
      margin-top: 4px;
      line-height: 1.3;
    }
    [data-theme="light"] .hero__credit-line { color: rgba(13,14,26,0.4); }
```

- [ ] **Step 3: Wire into renderHero()**

Find `function renderHero(profile)` and inside it, after the code that sets `.hero__tag`, add:

```javascript
      const creditLineEl = document.getElementById('hero-credit-line')
      if (creditLineEl) {
        const cl = profile.topCard?.creditLine || null
        if (cl) {
          creditLineEl.textContent = cl
          creditLineEl.hidden = false
        } else {
          creditLineEl.hidden = true
        }
      }
```

- [ ] **Step 4: Add creditLine to DEMO_PROFILE.topCard**

Find `DEMO_PROFILE.topCard` and add:

```javascript
      creditLine: 'Produced by LUNA · Mix. James Reid',
```

- [ ] **Step 5: Parse-check + Playwright**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

Playwright: snapshot — confirm `.hero__credit-line` is visible and contains the credit text.

- [ ] **Step 6: Commit**

```bash
git add able-v6.html
git commit -m "feat(credits): optional top card credit line in hero

profile.topCard.creditLine renders below hero tag in secondary text.
Default null (hidden). Artist-configured via admin (Phase 2 field).
DEMO_PROFILE seeded with example."
```

---

## Chunk 5: Section visibility toggles in admin

### Task 6: Add sectionVisibility toggles to admin.html

**Files:**
- Modify: `admin.html` (CSS, HTML, JS)

- [ ] **Step 1: Add CSS for section visibility panel**

Find end of admin `<style>` block and add:

```css
/* ── SECTION VISIBILITY ── */
.section-vis-card {
  background: var(--card, #16181f);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 12px;
}
.section-vis-card__title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .10em;
  text-transform: uppercase;
  color: var(--t2, rgba(255,255,255,.45));
  margin-bottom: 12px;
}
.section-vis-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  border-top: 1px solid rgba(255,255,255,.06);
}
.section-vis-row:first-of-type { border-top: none; }
.section-vis-label {
  font-size: 13px;
  color: var(--text, #fff);
  font-weight: 500;
}
.section-vis-toggle {
  width: 40px;
  height: 24px;
  border-radius: 12px;
  background: rgba(255,255,255,.15);
  border: none;
  cursor: pointer;
  position: relative;
  transition: background .2s;
  flex-shrink: 0;
}
.section-vis-toggle::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform .2s var(--ease-spring, cubic-bezier(0.34,1.56,0.64,1));
}
.section-vis-toggle[aria-pressed="true"] {
  background: var(--acc, #f4b942);
}
.section-vis-toggle[aria-pressed="true"]::after {
  transform: translateX(16px);
}
```

- [ ] **Step 2: Add HTML card**

Find a sensible insertion point in admin.html — after the Profile Identity card or at the bottom of the main settings column. Insert:

```html
<!-- ── SECTION VISIBILITY ── -->
<div class="section-vis-card" id="sectionVisCard">
  <div class="section-vis-card__title">Sections</div>
  <div class="section-vis-row">
    <span class="section-vis-label">Music</span>
    <button class="section-vis-toggle pressable" data-section="listen-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
  <div class="section-vis-row">
    <span class="section-vis-label">Shows</span>
    <button class="section-vis-toggle pressable" data-section="shows-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
  <div class="section-vis-row">
    <span class="section-vis-label">World Map</span>
    <button class="section-vis-toggle pressable" data-section="world-map-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
  <div class="section-vis-row">
    <span class="section-vis-label">Updates</span>
    <button class="section-vis-toggle pressable" data-section="snap-cards-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
  <div class="section-vis-row">
    <span class="section-vis-label">Merch</span>
    <button class="section-vis-toggle pressable" data-section="merch-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
  <div class="section-vis-row">
    <span class="section-vis-label">Support</span>
    <button class="section-vis-toggle pressable" data-section="support-section" aria-pressed="true" onclick="toggleSectionVis(this)"></button>
  </div>
</div>
```

- [ ] **Step 3: Add JS**

Find end of admin JS block and insert:

```javascript
// ── SECTION VISIBILITY ────────────────────────────────────────────────────

function initSectionVisibility() {
  const profile = safeGetProfile()
  const vis = profile.sectionVisibility || {}
  document.querySelectorAll('.section-vis-toggle').forEach(btn => {
    const sectionId = btn.dataset.section
    const isVisible = vis[sectionId] !== false  // default true
    btn.setAttribute('aria-pressed', String(isVisible))
  })
}

function toggleSectionVis(btn) {
  const sectionId = btn.dataset.section
  const current = btn.getAttribute('aria-pressed') === 'true'
  const next = !current
  btn.setAttribute('aria-pressed', String(next))

  const profile = safeGetProfile()
  if (!profile.sectionVisibility) profile.sectionVisibility = {}
  profile.sectionVisibility[sectionId] = next
  localStorage.setItem('able_v3_profile', JSON.stringify(profile))
}
```

- [ ] **Step 4: Call initSectionVisibility() from admin init**

Find where admin initialises (DOMContentLoaded or init function) and add:
```javascript
initSectionVisibility();
```

- [ ] **Step 5: Parse-check**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('admin.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

- [ ] **Step 6: Playwright verification**

Navigate to admin.html, snapshot — confirm `.section-vis-toggle` buttons exist. Click "Merch" toggle, confirm `aria-pressed` changes. Open able-v6.html, confirm merch section is hidden.

- [ ] **Step 7: Commit**

```bash
git add admin.html
git commit -m "feat(admin): section visibility toggles — show/hide per configurable section

Reads/writes profile.sectionVisibility to localStorage. Toggle buttons
with spring animation. 6 configurable sections: Music, Shows, World Map,
Updates, Merch, Support. applySectionOrder() in able-v6.html reads
sectionVisibility to filter hidden sections from order computation."
```

---

## Chunk 6: Gig mode extended spec

### Task 7: Extend gig mode in able-v6.html

**Files:**
- Modify: `able-v6.html` (renderHero, renderShowsSection — venue photo, set time, reframed capture)

- [ ] **Step 1: Add venueImage and setTime to DEMO_PROFILE events**

Find `DEMO_PROFILE.events[0]` (the Fabric show) and add:

```javascript
          venueImageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
          setTime: '23:30',
          supportAct: 'Dj Stingray',
```

- [ ] **Step 2: Wire venue photo into hero top card in gig state**

In `renderHero(profile)`, find where `stateChip` is set for gig state. Before or in that block, add:

```javascript
      // Gig mode: use venue photo as top card background if available
      if (state === 'gig') {
        const gigEvent = (profile.events || []).find(e => {
          const d = new Date(e.date)
          const now = Date.now()
          return d.getTime() > now - 86400000 && d.getTime() < now + 86400000
        })
        if (gigEvent?.venueImageUrl) {
          const artworkEl = document.getElementById('hero-artwork')
          if (artworkEl) {
            artworkEl.src = gigEvent.venueImageUrl
            artworkEl.style.filter = 'brightness(0.75)'
          }
        }
      }
```

- [ ] **Step 3: Update gig hero chip text to include set time**

Find where the gig state chip text is set in `renderHero`. Currently it likely says "On tonight" or similar. Update to:

```javascript
      if (state === 'gig') {
        const gigEvent = (profile.events || []).find(e => {
          const d = new Date(e.date)
          const now = Date.now()
          return d.getTime() > now - 86400000 && d.getTime() < now + 86400000
        })
        if (gigEvent) {
          const timeStr = gigEvent.setTime || gigEvent.time || ''
          const chipText = timeStr
            ? `On tonight — ${gigEvent.venue}, ${gigEvent.city} — ${timeStr}`
            : `On tonight — ${gigEvent.venue}, ${gigEvent.city}`
          // set chip text here (depends on existing chip element structure)
        }
      }
```

- [ ] **Step 4: Set gig override in DEMO_PROFILE for testing**

Temporarily set `stateOverride: 'gig'` in DEMO_PROFILE to test. (Revert before final commit — use admin toggle in real use.)

- [ ] **Step 5: Parse-check + Playwright**

```bash
node -e "const fs=require('fs'),src=fs.readFileSync('able-v6.html','utf8'),m=src.match(/<script>([\s\S]*?)<\/script>/g);let ok=true;(m||[]).forEach((b,i)=>{try{new Function(b.replace(/<\/?script>/g,''))}catch(e){console.error('Block'+i,e.message);ok=false}});console.log(ok?'OK':'FAIL')"
```

Playwright: navigate with `stateOverride: 'gig'` — confirm hero shows venue image with dimmed overlay, state chip includes venue + time, shows section is first configurable section, fan capture heading reads "I'll let you know about future dates."

- [ ] **Step 6: Revert demo stateOverride to null, commit**

```bash
git add able-v6.html
git commit -m "feat(gig): extended gig mode — venue photo, set time in chip, hierarchy

Gig state: venue photo (if venueImageUrl on event) replaces artist
artwork in hero with brightness(0.75). State chip: 'On tonight —
[Venue], [City] — [setTime]'. Fan capture copy: 'I'll let you know
about future dates.' via CAPTURE_VARIANTS['gig']."
```

---

## Final: Update docs

- [ ] **Step 1: Update V1_SCOPE.md — mark all 6 items complete**

```bash
git add docs/v6/V1_SCOPE.md
git commit -m "docs: mark hierarchy refinement V1 items complete"
```

---

## Verification matrix (run after all chunks complete)

Use Playwright MCP to verify:

| State | Section order | Capture copy | Credits | Gig top card |
|---|---|---|---|---|
| `profile` | Listen first | "Stay close." | Inline credits on release | n/a |
| `pre-release` | Listen second (world-map higher) | "Be the first to hear it." | Credits hidden | n/a |
| `live` | Listen first | "Stay on everything I do." | Credits visible | n/a |
| `gig` | Shows first | "I'll let you know..." | Credits hidden | Venue photo if available |
| All | Top card credit line visible | — | — | — |

---

*Spec reference: `docs/v6/operational/HIERARCHY_REFINEMENT_SPEC.md`*
