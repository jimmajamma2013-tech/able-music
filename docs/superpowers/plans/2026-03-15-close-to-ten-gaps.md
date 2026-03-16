# ABLE — Close to 10 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the 10 UX/UI quality gaps identified in the design review to bring the product from 8.1 to ~9.5/10 — all gaps that the rethink spec left unresolved or undesigned.

**Architecture:** Direct edits to `admin.html`, `able-v7.html`, and `start.html`. No build pipeline. Each chunk targets one surface at a time. Playwright MCP used for before/after visual verification at the end of every chunk. No new localStorage keys are introduced — all state uses existing keys.

**Tech Stack:** Vanilla HTML/CSS/JS. Inline SVG where needed. Playwright MCP for smoke checks. No npm, no bundler.

**Read before starting:**
- `docs/superpowers/specs/2026-03-15-ux-rethink-design.md` — the primary spec
- `CLAUDE.md` — design tokens, copy rules, CTA architecture
- `docs/v6/core/V6_BUILD_AUTHORITY.md` — resolved decisions

**Prerequisite:** The main rethink (`2026-03-15-ux-rethink-implementation.md`) should be complete or substantially complete before running this plan. These are quality polish tasks, not structural ones.

---

## The 10 gaps this plan closes

| # | Gap | Surface | Type |
|---|---|---|---|
| 1 | Empty states for zero-data dashboard | admin.html | Code |
| 2 | "Edit goes live immediately" — surface this clearly in edit mode | able-v7.html | Code |
| 3 | Settings screen — Connected platforms + slug edit | admin.html | Code |
| 4 | Vibe picker expanded + wired to live preview | start.html | Code |
| 5 | Timeline arc — animate node transitions | admin.html | Code |
| 6 | Fan confirmation landing (post email-confirm state) | able-v7.html | Code |
| 7 | Two-column dashboard mobile breakpoint | admin.html | Code |
| 8 | Ambient glow fallback when CORS fails | able-v7.html | Code |
| 9 | Real-time fan spike nudge on dashboard | admin.html | Code |
| 10 | Fan capture customisation guardrail in edit mode | able-v7.html | Code |

---

## Files modified

| File | What changes |
|---|---|
| `admin.html` | Gaps 1, 3, 5, 7, 9 |
| `able-v7.html` | Gaps 2, 6, 8, 10 |
| `start.html` | Gap 4 |

---

## Chunk 1: Admin — Empty States

**Gap closed:** #1

When an artist has zero fans, zero clicks, no shows, and no release set, the dashboard should feel like potential — not abandonment. Each empty state needs copy and a single action that resolves the emptiness.

**Target empty states:**
- Stat cards (all zeros + flat sparklines)
- Latest fans column (no fans yet)
- What fans tapped today column (no clicks)
- Campaign strip (no release title or date set)

**Design rules:**
- Empty state copy uses the same voice as the rest of the dashboard — direct, honest, no filler
- Each empty state has one action link (amber, small) that takes the artist where they need to go
- Stat cards with zero data show the number as `—` not `0` — zero implies failure, dash implies "not yet"
- Sparklines with no data show a flat dashed line, not a solid flat line (dashed = "no data yet", solid = "the number is actually zero")

**Empty state copy:**

| Location | Copy | Action |
|---|---|---|
| Fans column (empty) | "No one's signed up yet. That's about to change." | `Put the link in your bio →` (links to able-v7.html) |
| Taps column (empty) | "No link taps yet. Once fans land, you'll see what they care about." | — (no action, just context) |
| Campaign strip (no release set) | "Got something coming? Set a release date and your page switches automatically." | `Set a date →` (focuses the release date field) |
| Stat card — views (zero) | Show `—` with sparkline as flat dashed line, label "Page views" | `View live page →` |
| Stat card — fans (zero) | Show `—`, copy below: "First fan incoming." | — |

**Files:**
- Modify: `admin.html` — stat card rendering, fan column empty state, taps column empty state, campaign strip

---

- [ ] **Step 1: Screenshot the current zero-data state**

Open admin.html in Playwright. Note what the stat cards, fan column, and taps column look like with no real data.

Use Playwright MCP: navigate to `file:///[path]/admin.html`, take screenshot `before-empty-states.png`.

- [ ] **Step 2: Stat cards — change zero display to `—`**

In `admin.html`, find the stat card rendering logic (the JS function that sets the big number in each card).

Change: when the value is `0` or `null`, render `—` instead of `0`.

Also change the sparkline SVG: when all 7 data points are 0, render the path as a dashed line (`stroke-dasharray: 4 4`) rather than a solid flat line.

```js
// Pattern to find and apply:
function renderStatValue(val) {
  return (val === 0 || val === null) ? '—' : val.toLocaleString();
}

function renderSparkline(points, color) {
  const allZero = points.every(p => p === 0);
  const path = buildSparklinePath(points); // existing function
  return `<path d="${path}" stroke="${color}" stroke-width="1.5" fill="none"
    ${allZero ? 'stroke-dasharray="4 4" opacity="0.4"' : ''} />`;
}
```

- [ ] **Step 3: Fans column — empty state**

In `admin.html`, find where the "Latest fans" left column renders. Add a conditional: when `ableFans` array is empty, render the empty state instead of the list.

```html
<!-- Empty state for fans column -->
<div class="empty-col">
  <p class="empty-copy">No one's signed up yet. That's about to change.</p>
  <a href="able-v7.html" class="empty-action">Put the link in your bio →</a>
</div>
```

CSS for `.empty-col`:
```css
.empty-col {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.empty-copy {
  font-size: 12px;
  color: #999;
  line-height: 1.5;
}
.empty-action {
  font-size: 11px;
  color: var(--dash-amber, #f4b942);
  text-decoration: none;
  font-weight: 600;
}
```

- [ ] **Step 4: Taps column — empty state**

Same pattern. When `ableClicks` array is empty or no clicks today, render:

```html
<div class="empty-col">
  <p class="empty-copy">No link taps yet. Once fans land, you'll see what they care about.</p>
</div>
```

No action link here — just honest context.

- [ ] **Step 5: Campaign strip — no release set**

In the campaign strip area, add a conditional: if `able_v3_profile.releaseTitle` is empty/null, show the empty state copy and wire the action to focus the release title input field.

```js
// On "Set a date →" tap:
document.querySelector('#release-title-input').focus();
```

Empty state markup:
```html
<div class="campaign-empty">
  <span class="campaign-empty-copy">Got something coming? Set a release date and your page switches automatically.</span>
  <button class="campaign-empty-action" onclick="focusReleaseTitle()">Set a date →</button>
</div>
```

- [ ] **Step 6: Verify visually**

Temporarily set `ableFans = []` and `ableClicks = []` in the JS (or via browser console), reload, take Playwright screenshot `after-empty-states.png`. Confirm:
- Stat cards show `—` not `0`
- Sparklines are dashed flat lines
- Fan column shows the empty copy + amber link
- Taps column shows the context copy
- Campaign strip (if no release) shows the prompt

- [ ] **Step 7: Restore test data, commit**

```bash
git add admin.html
git commit -m "feat(admin): empty states for zero-data dashboard — dash over zero, honest copy per column"
```

---

## Chunk 2: Admin — Arc Transition Animation

**Gap closed:** #5

When an artist taps a node on the timeline arc to switch campaign mode, the change should feel consequential — the arc fill should animate to the new position, the active node should pulse briefly, and the mode badge should update with a subtle fade.

**Design rules:**
- Arc fill transition: 400ms, `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (deceleration easing from design system)
- Active node on arrival: scale up to 1.2 then back to 1.0 over 300ms (spring feel)
- Mode badge text update: cross-fade 200ms (opacity 0 → 1 on new text)
- No confirmation dialog — the animation IS the confirmation

**Files:**
- Modify: `admin.html` — timeline arc click handler + CSS transitions

---

- [ ] **Step 1: Find the arc node click handler**

In `admin.html`, search for the function that handles tapping a timeline arc node. It likely calls something like `setPageMode(mode)` or updates `able_v3_profile.stateOverride`.

Identify: (a) where the arc fill width/position is set, (b) where the active node class is applied, (c) where the mode badge text is updated.

- [ ] **Step 2: Add CSS transitions to the arc**

Find the arc fill element (likely a `<div>` or SVG `<rect>` that represents the filled portion of the track line).

Add:
```css
.arc-fill {
  transition: width 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.arc-node {
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1); /* spring */
}

.arc-node.arc-node--active {
  transform: scale(1.0); /* resting state */
}

.mode-badge {
  transition: opacity 200ms ease;
}
```

- [ ] **Step 3: Add the pulse animation on node arrival**

In the node click handler, after setting the new active node class, add a brief pulse:

```js
function onArcNodeTap(newMode) {
  // 1. Fade out mode badge
  modeBadge.style.opacity = '0';

  // 2. Update arc fill (CSS transition handles animation)
  updateArcFill(newMode); // existing function

  // 3. Remove active from all nodes, add to new one
  arcNodes.forEach(n => n.classList.remove('arc-node--active'));
  newNode.classList.add('arc-node--active');

  // 4. Pulse the new active node
  newNode.style.transform = 'scale(1.25)';
  setTimeout(() => { newNode.style.transform = 'scale(1.0)'; }, 300);

  // 5. Update mode badge text, fade back in
  setTimeout(() => {
    modeBadge.textContent = getModeLabel(newMode);
    modeBadge.style.opacity = '1';
  }, 150);

  // 6. Save to localStorage
  savePageMode(newMode); // existing function
}
```

- [ ] **Step 4: Verify the animation**

Open admin.html in Playwright. Tap each arc node in sequence. Verify:
- Arc fill animates smoothly (not a jump)
- Active node pulses briefly on arrival
- Mode badge cross-fades

Take screenshot `arc-transition.png` at rest state after switching to "Pre-release".

- [ ] **Step 5: Commit**

```bash
git add admin.html
git commit -m "feat(admin): arc node transitions — fill animation, active pulse, badge cross-fade"
```

---

## Chunk 3: Admin — Real-Time Fan Spike Nudge

**Gap closed:** #9

When fans are actively signing up (during a TikTok or Instagram moment), the artist should feel it. A lightweight polling mechanism checks for new fans every 60 seconds. If 3+ new fans have signed up since last check, surface a live nudge at the top of the fan column.

**Design rules:**
- Poll interval: 60 seconds (localStorage only — no server round trip)
- Threshold: 3+ new fans in one interval = spike
- Nudge appears at top of fan column, amber left border, dismissible with ✕
- Copy: "N fans just signed up. Something's working." — honest, not hype
- Auto-dismisses after 30 seconds if not manually dismissed
- Only one spike nudge at a time (same rule as the main nudge card)
- Does NOT interrupt or replace the main nudge card — this lives in the fan column specifically

**Files:**
- Modify: `admin.html` — fan column + polling JS

---

- [ ] **Step 1: Add the spike nudge markup to the fan column**

In the fan column HTML, add a hidden nudge container above the fan rows:

```html
<div class="fan-spike-nudge" id="fanSpikeNudge" hidden>
  <span class="fan-spike-copy" id="fanSpikeText"></span>
  <button class="fan-spike-dismiss" onclick="dismissSpikeNudge()" aria-label="Dismiss">✕</button>
</div>
```

CSS:
```css
.fan-spike-nudge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--dash-card, #fff);
  border-left: 3px solid var(--dash-amber, #f4b942);
  border-radius: 6px;
  margin-bottom: 10px;
  animation: nudge-in 300ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.fan-spike-copy {
  font-size: 12px;
  color: #333;
  line-height: 1.4;
}

.fan-spike-dismiss {
  background: none;
  border: none;
  color: #bbb;
  cursor: pointer;
  font-size: 12px;
  padding: 0 0 0 8px;
  flex-shrink: 0;
}

@keyframes nudge-in {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Add the polling function**

In the admin.html `<script>`, add after the existing init code:

```js
let lastFanCount = null;
let spikeNudgeTimer = null;

function pollForFanSpike() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const currentCount = fans.length;

  if (lastFanCount === null) {
    lastFanCount = currentCount;
    return;
  }

  const newFans = currentCount - lastFanCount;
  if (newFans >= 3) {
    showSpikeNudge(newFans);
  }

  lastFanCount = currentCount;
}

function showSpikeNudge(count) {
  const nudge = document.getElementById('fanSpikeNudge');
  const text = document.getElementById('fanSpikeText');
  if (!nudge || !text) return;

  text.textContent = `${count} fans just signed up. Something's working.`;
  nudge.hidden = false;

  // Auto-dismiss after 30s
  clearTimeout(spikeNudgeTimer);
  spikeNudgeTimer = setTimeout(dismissSpikeNudge, 30000);
}

function dismissSpikeNudge() {
  const nudge = document.getElementById('fanSpikeNudge');
  if (nudge) nudge.hidden = true;
  clearTimeout(spikeNudgeTimer);
}

// Start polling 60s after load
setTimeout(() => {
  lastFanCount = JSON.parse(localStorage.getItem('able_fans') || '[]').length;
  setInterval(pollForFanSpike, 60000);
}, 5000); // 5s delay so page is settled
```

- [ ] **Step 3: Test the spike nudge manually**

Open admin.html in browser console. Run:
```js
// Simulate 5 fans appearing
const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
for (let i = 0; i < 5; i++) {
  fans.push({ email: `test${i}@test.com`, ts: Date.now(), source: 'direct' });
}
localStorage.setItem('able_fans', JSON.stringify(fans));
// Then call manually:
lastFanCount = fans.length - 5;
pollForFanSpike();
```

Verify the nudge appears with correct copy and dismisses on ✕.

Take Playwright screenshot `fan-spike-nudge.png`.

- [ ] **Step 4: Commit**

```bash
git add admin.html
git commit -m "feat(admin): real-time fan spike nudge — polls localStorage 60s, surfaces amber nudge on 3+ new fans"
```

---

## Chunk 4: Admin — Two-Column Mobile Breakpoint + Settings Screen

**Gaps closed:** #7, #3

**Gap 7 — Two-column breakpoint:**
At 375px, the two-column fan body (latest fans left / what they tapped today right) must stack vertically. Fan list on top, taps below. Each becomes full width.

**Gap 3 — Settings screen:**
The Settings nav item currently leads nowhere defined. It needs:
- Slug edit (with live `ablemusic.co/[slug]` preview + duplicate check pattern)
- Connected platforms section (Spotify Artist ID + YouTube Channel ID — manual entry only, "Auto-import coming soon" note per spec §4 infrastructure note)
- Account section (email displayed, magic link re-send)

**Design rules for Settings:**
- Same light card style as the rest of the dashboard
- Slug field: live preview below the input showing `ablemusic.co/[value]` as the artist types
- Slug validation: lowercase, hyphens only, 3–30 chars — inline error, not alert
- Platform fields: `--dash-field` background, amber border on focus
- "Auto-import coming soon" shown as a muted chip next to the Connect button — not a disabled button, not hidden
- Account email is read-only (shown, not editable — magic link is the auth mechanism)

**Files:**
- Modify: `admin.html` — two-column CSS breakpoint + Settings panel HTML/JS

---

- [ ] **Step 1: Fix the two-column mobile breakpoint**

Find the CSS rule that sets the two-column fan body layout (likely `display: grid; grid-template-columns: 1fr 1fr` or `display: flex; flex-direction: row`).

Add a breakpoint:
```css
@media (max-width: 480px) {
  .fan-body-columns {
    flex-direction: column; /* or grid-template-columns: 1fr */
    gap: 16px;
  }

  .fan-col {
    width: 100%;
    min-width: 0;
  }
}
```

- [ ] **Step 2: Verify at 375px**

Use Playwright to resize the viewport to 375×812 and take screenshot `mobile-375-fan-body.png`. Confirm columns stack and neither truncates content.

```js
// Playwright resize check
await page.setViewportSize({ width: 375, height: 812 });
```

- [ ] **Step 3: Build the Settings panel — slug section**

Find where the Settings nav item renders its content panel in admin.html. Replace the empty/placeholder content with:

```html
<section class="settings-section">
  <h3 class="settings-heading">Your page address</h3>
  <div class="settings-field-group">
    <label class="settings-label" for="slugInput">Page slug</label>
    <input
      type="text"
      id="slugInput"
      class="settings-input"
      placeholder="yourname"
      maxlength="30"
      pattern="[a-z0-9\-]+"
      autocomplete="off"
    />
    <p class="slug-preview" id="slugPreview">ablemusic.co/<span id="slugPreviewValue">yourname</span></p>
    <p class="slug-error" id="slugError" hidden></p>
  </div>
  <button class="settings-save-btn" onclick="saveSlug()">Save address</button>
</section>
```

CSS:
```css
.settings-section {
  background: var(--dash-card, #fff);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  border: 1px solid var(--dash-border, #d4cfc8);
}
.settings-heading {
  font-size: 13px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 14px;
}
.settings-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #bbb;
  display: block;
  margin-bottom: 6px;
}
.settings-input {
  width: 100%;
  background: var(--dash-field, #f5f2ee);
  border: 1.5px solid #e0dbd4;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 13px;
  color: #1a1a2e;
  box-sizing: border-box;
}
.settings-input:focus {
  outline: none;
  border-color: #c4880a;
}
.slug-preview {
  font-size: 11px;
  color: #999;
  margin: 6px 0 0;
}
.slug-preview span {
  color: var(--dash-amber, #f4b942);
  font-weight: 600;
}
.slug-error {
  font-size: 11px;
  color: var(--dash-red, #c04030);
  margin: 4px 0 0;
}
.settings-save-btn {
  margin-top: 12px;
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}
```

- [ ] **Step 4: Wire up slug live preview + validation**

```js
const slugInput = document.getElementById('slugInput');
const slugPreviewValue = document.getElementById('slugPreviewValue');
const slugError = document.getElementById('slugError');

// Load existing slug
slugInput.value = JSON.parse(localStorage.getItem('able_v3_profile') || '{}').slug || '';
slugPreviewValue.textContent = slugInput.value || 'yourname';

slugInput.addEventListener('input', () => {
  const raw = slugInput.value.toLowerCase().replace(/[^a-z0-9\-]/g, '');
  slugInput.value = raw; // enforce pattern inline
  slugPreviewValue.textContent = raw || 'yourname';

  if (raw.length > 0 && raw.length < 3) {
    slugError.textContent = 'Needs to be at least 3 characters.';
    slugError.hidden = false;
  } else {
    slugError.hidden = true;
  }
});

function saveSlug() {
  const val = slugInput.value;
  if (val.length < 3) return;
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  profile.slug = val;
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  // Brief "Saved ✓" confirmation
  const btn = document.querySelector('.settings-save-btn');
  btn.textContent = 'Saved ✓';
  setTimeout(() => { btn.textContent = 'Save address'; }, 2000);
}
```

- [ ] **Step 5: Build the Settings panel — Connected platforms**

Below the slug section, add:

```html
<section class="settings-section">
  <h3 class="settings-heading">Connected platforms</h3>

  <div class="platform-row">
    <div class="platform-row-label">
      <span class="platform-name">Spotify</span>
      <span class="platform-note">Artist ID — found in your Spotify for Artists URL</span>
    </div>
    <input type="text" id="spotifyIdInput" class="settings-input" placeholder="e.g. 6eUKZXaKkcviH0Ku9w2n3V" />
    <div class="platform-actions">
      <button class="platform-save-btn" onclick="savePlatformId('spotify')">Save</button>
      <span class="platform-coming-soon">Auto-import coming soon</span>
    </div>
  </div>

  <div class="platform-row" style="margin-top: 16px;">
    <div class="platform-row-label">
      <span class="platform-name">YouTube</span>
      <span class="platform-note">Channel ID — from your YouTube channel URL</span>
    </div>
    <input type="text" id="youtubeIdInput" class="settings-input" placeholder="e.g. UCxxxxxxxxxxxxxxxxxxxxxx" />
    <div class="platform-actions">
      <button class="platform-save-btn" onclick="savePlatformId('youtube')">Save</button>
      <span class="platform-coming-soon">Auto-import coming soon</span>
    </div>
  </div>
</section>
```

CSS additions:
```css
.platform-row-label {
  margin-bottom: 8px;
}
.platform-name {
  font-size: 12px;
  font-weight: 700;
  color: #1a1a2e;
  display: block;
}
.platform-note {
  font-size: 10px;
  color: #bbb;
}
.platform-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
}
.platform-save-btn {
  background: #1a1a2e;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}
.platform-coming-soon {
  font-size: 10px;
  color: #bbb;
  border: 1px solid #e0dbd4;
  border-radius: 20px;
  padding: 3px 8px;
}
```

JS:
```js
function savePlatformId(platform) {
  const input = document.getElementById(platform + 'IdInput');
  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  profile[platform + 'Id'] = input.value.trim();
  localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  const btn = input.closest('.platform-row').querySelector('.platform-save-btn');
  btn.textContent = 'Saved ✓';
  setTimeout(() => { btn.textContent = 'Save'; }, 2000);
}

// Load existing values on init
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
if (document.getElementById('spotifyIdInput')) {
  document.getElementById('spotifyIdInput').value = profile.spotifyId || '';
  document.getElementById('youtubeIdInput').value = profile.youtubeId || '';
}
```

- [ ] **Step 6: Build the Settings panel — Account section**

```html
<section class="settings-section">
  <h3 class="settings-heading">Account</h3>
  <div class="account-email-row">
    <span class="settings-label">Email</span>
    <span class="account-email" id="accountEmail">—</span>
  </div>
  <p class="account-note">ABLE uses magic links — no password. To change your email, <a href="#" class="amber-link">contact support</a>.</p>
</section>
```

CSS:
```css
.account-email {
  font-size: 13px;
  color: #1a1a2e;
  font-weight: 500;
}
.account-note {
  font-size: 11px;
  color: #999;
  margin-top: 8px;
  line-height: 1.5;
}
.amber-link {
  color: var(--dash-amber, #f4b942);
  text-decoration: none;
  font-weight: 600;
}
```

JS:
```js
const emailEl = document.getElementById('accountEmail');
if (emailEl) {
  const p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  emailEl.textContent = p.email || '—';
}
```

- [ ] **Step 7: Playwright smoke test — Settings**

Navigate to admin.html, click/tap the Settings nav item, take screenshot `settings-screen.png`. Verify three sections visible: page address, connected platforms, account. Resize to 375px, take `settings-mobile.png`.

- [ ] **Step 8: Commit**

```bash
git add admin.html
git commit -m "feat(admin): settings screen — slug editor, platform IDs, account section; mobile two-col breakpoint fix"
```

---

## Chunk 5: Profile — Ambient Glow Fallback

**Gap closed:** #8

The ambient colour glow at the bottom of the top card is auto-extracted from the artwork image using Canvas. When CORS prevents canvas access (most external image hosts), the extraction silently fails and no glow appears. This needs a designed fallback.

**Fallback hierarchy:**
1. **Success:** Extracted colour from artwork → radial gradient glow
2. **CORS fail / canvas error:** Fall back to artist's `--color-accent` (their chosen accent colour) as the glow source — still looks intentional
3. **No accent set:** Fall back to `rgba(255,255,255,0.08)` — a subtle neutral glow that's barely visible but better than nothing

**Design rules:**
- Fallback glow using accent colour should use `opacity: 0.35` — slightly more muted than the extracted colour path (`opacity: 0.45`) to avoid clashing if the accent is bright
- The transition between states should never be jarring — the glow fades in regardless of which source it uses
- The glow element itself is a `position: absolute` radial gradient div at the bottom of the top card

**Files:**
- Modify: `able-v7.html` — colour extraction function + glow render logic

---

- [ ] **Step 1: Find the colour extraction code**

In `able-v7.html`, search for `canvas` or `getContext` or `drawImage` — this is the artwork colour extraction function. Also find the glow element (likely a div with `position: absolute; bottom: 0` inside the hero card).

- [ ] **Step 2: Wrap extraction in try/catch with fallback**

The extraction function likely looks something like:
```js
function extractArtworkColour(imgEl, callback) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imgEl, 0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  callback(`rgb(${r},${g},${b})`);
}
```

Replace with:
```js
function extractArtworkColour(imgEl, callback) {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, 0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    // Check if we got something non-black (black usually = CORS failure)
    if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
      throw new Error('CORS likely blocked — black pixel returned');
    }
    callback(`rgb(${data[0]},${data[1]},${data[2]})`, 0.45);
  } catch (e) {
    // Fallback: use artist accent colour
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent').trim() || '#e05242';
    callback(accent, 0.35);
  }
}
```

- [ ] **Step 3: Wire fallback into glow render**

Find where the glow div's background is set. Ensure it uses the opacity param from the callback:

```js
function applyAmbientGlow(colour, opacity = 0.45) {
  const glowEl = document.querySelector('.hero-ambient-glow');
  if (!glowEl) return;
  glowEl.style.background = `radial-gradient(ellipse 80% 60% at 50% 100%,
    ${colour.replace(')', `, ${opacity})`).replace('rgb', 'rgba')},
    transparent 70%)`;
  glowEl.style.opacity = '1';
}
```

If the colour is already in `rgba` format, adjust the string replacement accordingly.

- [ ] **Step 4: Verify both paths**

Open able-v7.html. Confirm glow renders with artwork loaded (path 1).

Then in browser console, temporarily override:
```js
// Test fallback path
applyAmbientGlow(getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim(), 0.35);
```
Confirm glow still renders — different colour, slightly more muted, still looks intentional. Take screenshot `glow-fallback.png`.

- [ ] **Step 5: Commit**

```bash
git add able-v7.html
git commit -m "fix(profile): ambient glow fallback — accent colour at 0.35 opacity when CORS blocks artwork extraction"
```

---

## Chunk 6: Profile — Edit Mode "Live Immediately" Clarity

**Gap closed:** #2

The spec auto-saves on blur, meaning edits go live to fans immediately. But this is never surfaced to the artist. An artist editing their bio at midnight doesn't know whether fans are seeing a half-edited page or a queued draft.

**Solution:** A single persistent line in the floating edit pill that resolves the ambiguity. No modal, no warning, no confirmation dialog — just the right micro-copy in the right place.

**Also:** Fan capture customisation guardrail (Gap #10) — the edit sheet for the fan capture section should show the default copy as placeholder text and enforce a character limit, making it easy to keep quality high.

**Files:**
- Modify: `able-v7.html` — floating edit pill + fan capture edit sheet

---

- [ ] **Step 1: Add "live to fans now" label to the edit pill**

Find the floating edit/fan-view pill in `able-v7.html`. It likely has two tab buttons: Edit | Fan view. Add a small label below or within the pill:

```html
<div class="edit-pill">
  <button class="edit-tab edit-tab--active">✎ Edit</button>
  <button class="edit-tab">👁 Fan view</button>
  <span class="edit-live-label">Changes are live to fans immediately</span>
</div>
```

CSS:
```css
.edit-live-label {
  display: block;
  font-size: 9px;
  color: rgba(255,255,255,0.45);
  text-align: center;
  margin-top: 4px;
  letter-spacing: 0.03em;
}
```

This line only shows when the Edit tab is active. Hide it when Fan view is active:
```js
// When switching to Fan view tab:
document.querySelector('.edit-live-label').style.display = 'none';
// When switching back to Edit tab:
document.querySelector('.edit-live-label').style.display = 'block';
```

- [ ] **Step 2: Fan capture edit sheet — character limits and placeholder defaults**

Find the edit sheet for the fan capture section (the bottom sheet that opens when the artist taps the fan capture zone in edit mode). It should have inputs for the heading and sub-copy.

Add `maxlength`, `placeholder` values showing the recommended defaults, and a character counter:

```html
<!-- Heading field -->
<label class="sheet-label">Heading</label>
<div class="field-wrapper">
  <input
    type="text"
    id="fanCaptureHeading"
    class="sheet-input"
    placeholder="Stay close."
    maxlength="40"
  />
  <span class="char-count" id="fanCaptureHeadingCount">0 / 40</span>
</div>
<p class="field-hint">Default: "Stay close." — it works. Change it if you have something better.</p>

<!-- Sub-copy field -->
<label class="sheet-label">Sub-copy</label>
<div class="field-wrapper">
  <textarea
    id="fanCaptureCopy"
    class="sheet-input sheet-input--textarea"
    placeholder="No noise. Just the things that matter."
    maxlength="80"
    rows="2"
  ></textarea>
  <span class="char-count" id="fanCaptureCopyCount">0 / 80</span>
</div>
<p class="field-hint">One honest sentence. "I'll only reach out when something's actually happening." works well.</p>
```

CSS:
```css
.field-wrapper {
  position: relative;
}
.char-count {
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-size: 9px;
  color: #bbb;
}
.field-hint {
  font-size: 10px;
  color: #bbb;
  margin: 4px 0 12px;
  line-height: 1.5;
}
```

JS — live char counter:
```js
['fanCaptureHeading', 'fanCaptureCopy'].forEach(id => {
  const el = document.getElementById(id);
  const counter = document.getElementById(id + 'Count');
  if (!el || !counter) return;
  const max = el.getAttribute('maxlength');
  el.addEventListener('input', () => {
    counter.textContent = `${el.value.length} / ${max}`;
    counter.style.color = el.value.length > max * 0.9 ? '#c04030' : '#bbb';
  });
});
```

- [ ] **Step 3: Verify**

Open able-v7.html with `?edit=1`. Check the floating pill shows the live label. Open the fan capture edit sheet, confirm placeholder copy is visible, character counter updates as you type, warning colour kicks in near the limit. Take screenshot `edit-mode-clarity.png`.

- [ ] **Step 4: Commit**

```bash
git add able-v7.html
git commit -m "feat(edit): live-immediately label on edit pill; fan capture char limits and quality hints"
```

---

## Chunk 7: Profile — Fan Confirmation Landing

**Gap closed:** #6

When a fan clicks the confirmation link in their email, they currently land on... nothing defined. This plan adds a lightweight confirmation state to the fan capture section on able-v7.html that activates via URL param `?confirmed=1&artist=[slug]`.

**What it shows:**
- The fan capture section transforms into a confirmation card
- Copy: "You're in. [Artist name] will reach out when something's actually happening."
- Soft share nudge below: "Know someone who'd be into [Artist name]? Send them here." + Copy link button
- No redirect, no new page — the profile IS the destination, the section just shifts state

**Design rules:**
- The confirmation card uses the same dark card styling as the profile
- The share nudge is soft — one line of copy + a copy-link button, nothing more
- After 5 seconds, the card fades back to the normal fan capture state so the rest of the page is still explorable

**Files:**
- Modify: `able-v7.html` — fan capture section + URL param check on init

---

- [ ] **Step 1: Add the confirmation state markup to the fan capture section**

Find the fan capture section HTML. Add a hidden confirmation state alongside the existing form:

```html
<div class="fan-confirmed" id="fanConfirmed" hidden>
  <p class="fan-confirmed-copy" id="fanConfirmedCopy">
    You're in. <!-- artist name injected by JS --> will reach out when something's actually happening.
  </p>
  <div class="fan-confirmed-share">
    <p class="fan-confirmed-share-copy" id="fanConfirmedShareCopy">
      Know someone who'd be into <!-- artist name -->? Send them here.
    </p>
    <button class="fan-confirmed-copy-link" onclick="copyProfileLink()">Copy link</button>
  </div>
</div>
```

CSS:
```css
.fan-confirmed {
  text-align: center;
  padding: 20px 0;
  animation: fade-in 400ms ease forwards;
}
.fan-confirmed-copy {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  line-height: 1.5;
  margin-bottom: 16px;
}
.fan-confirmed-share {
  opacity: 0.6;
}
.fan-confirmed-share-copy {
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 8px;
}
.fan-confirmed-copy-link {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: #fff;
  border-radius: 20px;
  padding: 7px 16px;
  font-size: 11px;
  cursor: pointer;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 2: Wire the URL param check on init**

In the profile init JS, after the page loads:

```js
function checkConfirmationParam() {
  const params = new URLSearchParams(location.search);
  if (params.get('confirmed') !== '1') return;

  const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  const artistName = profile.name || 'This artist';

  // Update copy with artist name
  document.getElementById('fanConfirmedCopy').textContent =
    `You're in. ${artistName} will reach out when something's actually happening.`;
  document.getElementById('fanConfirmedShareCopy').textContent =
    `Know someone who'd be into ${artistName}? Send them here.`;

  // Show confirmation, hide form
  document.getElementById('fanConfirmed').hidden = false;
  const fanForm = document.querySelector('.fan-capture-form'); // adjust selector
  if (fanForm) fanForm.hidden = true;

  // Scroll to the fan capture section
  document.querySelector('.fan-capture-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // After 8 seconds, fade back to normal form
  setTimeout(() => {
    document.getElementById('fanConfirmed').hidden = true;
    if (fanForm) fanForm.hidden = false;
  }, 8000);
}

// Call after init
checkConfirmationParam();
```

- [ ] **Step 3: Test the confirmation state**

Navigate to `able-v7.html?confirmed=1` in Playwright. Take screenshot `fan-confirmed.png`. Confirm:
- Confirmation card visible in the fan capture area
- Artist name injected correctly
- Share nudge present below
- After 8 seconds the form returns (test with reduced timeout in console)

- [ ] **Step 4: Commit**

```bash
git add able-v7.html
git commit -m "feat(profile): fan confirmation landing state — ?confirmed=1 shows in-page success + share nudge"
```

---

## Chunk 8: Onboarding — Vibe Picker Expansion

**Gap closed:** #4

The current vibe picker has 4 options (Atmospheric / Hype / Raw / Chill). This covers electronic, pop, and rock artists but leaves jazz, folk, hip-hop, classical, R&B, reggae, country, and metal artists unrepresented. Picking a vibe is the first moment of product identity — it should feel like it was built for every artist, not just four archetypes.

**New vibe set (8 options in a 2×4 grid on mobile):**
| Vibe | Emoji | For |
|---|---|---|
| Atmospheric | 🌙 | Electronic, ambient, cinematic |
| Hype | 🔥 | Hip-hop, grime, drill, club |
| Raw | 🎸 | Rock, punk, metal, indie |
| Chill | 🌊 | Lo-fi, soul, R&B, bedroom pop |
| Deep | 🎷 | Jazz, blues, neo-soul |
| Bright | ☀️ | Pop, folk, singer-songwriter |
| Heavy | ⚡ | Metal, hardcore, noise |
| Free | 🎲 | I'll set my own vibe |

**"Free" option:** Deselects all vibes, no token suggestion applied — artist gets the base dark theme and picks their own accent colour.

**What vibe selection changes (connect to live preview):**
- Accent colour swatch pre-selects to a suggested colour (still overridable)
- Background gradient on the preview card shifts subtly to match vibe mood

**Suggested accent colours per vibe:**
| Vibe | Suggested accent |
|---|---|
| Atmospheric | `#7b68ee` (soft indigo) |
| Hype | `#ff4500` (hot orange-red) |
| Raw | `#e05242` (default red) |
| Chill | `#4ecdc4` (teal) |
| Deep | `#c9a96e` (warm gold) |
| Bright | `#f7c948` (yellow) |
| Heavy | `#b0b0b0` (steel grey) |
| Free | no change |

**Files:**
- Modify: `start.html` — vibe picker grid + live preview wiring

---

- [ ] **Step 1: Take a screenshot of the current vibe picker**

Navigate to `start.html` in Playwright, go to Step 1. Screenshot `before-vibe-picker.png`.

- [ ] **Step 2: Replace the vibe picker grid with 8 options**

Find the vibe picker HTML in start.html. Replace with:

```html
<div class="vibe-grid" id="vibePicker">
  <button class="vibe-card" data-vibe="atmospheric" data-accent="#7b68ee" type="button">
    <span class="vibe-emoji">🌙</span>
    <span class="vibe-label">Atmospheric</span>
  </button>
  <button class="vibe-card" data-vibe="hype" data-accent="#ff4500" type="button">
    <span class="vibe-emoji">🔥</span>
    <span class="vibe-label">Hype</span>
  </button>
  <button class="vibe-card" data-vibe="raw" data-accent="#e05242" type="button">
    <span class="vibe-emoji">🎸</span>
    <span class="vibe-label">Raw</span>
  </button>
  <button class="vibe-card" data-vibe="chill" data-accent="#4ecdc4" type="button">
    <span class="vibe-emoji">🌊</span>
    <span class="vibe-label">Chill</span>
  </button>
  <button class="vibe-card" data-vibe="deep" data-accent="#c9a96e" type="button">
    <span class="vibe-emoji">🎷</span>
    <span class="vibe-label">Deep</span>
  </button>
  <button class="vibe-card" data-vibe="bright" data-accent="#f7c948" type="button">
    <span class="vibe-emoji">☀️</span>
    <span class="vibe-label">Bright</span>
  </button>
  <button class="vibe-card" data-vibe="heavy" data-accent="#b0b0b0" type="button">
    <span class="vibe-emoji">⚡</span>
    <span class="vibe-label">Heavy</span>
  </button>
  <button class="vibe-card" data-vibe="free" data-accent="" type="button">
    <span class="vibe-emoji">🎲</span>
    <span class="vibe-label">Free</span>
  </button>
</div>
```

CSS:
```css
.vibe-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

@media (max-width: 480px) {
  .vibe-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.vibe-card {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: border-color 200ms, background 200ms;
}

.vibe-card:hover {
  background: rgba(255,255,255,0.1);
}

.vibe-card.vibe-card--selected {
  border-color: var(--color-accent, #e05242);
  background: rgba(var(--accent-rgb, 224,82,66), 0.15);
}

.vibe-emoji {
  font-size: 22px;
}

.vibe-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255,255,255,0.7);
}
```

- [ ] **Step 3: Wire vibe selection to accent colour pre-select and live preview**

```js
const vibeCards = document.querySelectorAll('.vibe-card');
const accentSwatches = document.querySelectorAll('.accent-swatch'); // existing swatch elements
const previewCard = document.querySelector('.onboarding-preview'); // the live preview element

vibeCards.forEach(card => {
  card.addEventListener('click', () => {
    // Deselect all
    vibeCards.forEach(c => c.classList.remove('vibe-card--selected'));
    // Select this one
    card.classList.add('vibe-card--selected');

    const vibe = card.dataset.vibe;
    const suggestedAccent = card.dataset.accent;

    // Store vibe selection
    const draft = JSON.parse(sessionStorage.getItem('onboarding_draft') || '{}');
    draft.vibe = vibe;
    sessionStorage.setItem('onboarding_draft', JSON.stringify(draft));

    // Pre-select the matching accent swatch (if it exists in the palette)
    if (suggestedAccent) {
      accentSwatches.forEach(s => {
        if (s.dataset.colour === suggestedAccent) {
          s.click(); // triggers existing accent selection + live preview logic
        }
      });
    }
  });
});
```

- [ ] **Step 4: Verify at 375px**

Resize Playwright to 375px. Navigate to step 1 of onboarding. Screenshot `vibe-picker-mobile.png`. Confirm 2×4 grid (8 options, 2 per row). Tap "Atmospheric" — confirm selection state and accent colour pre-selects. Tap "Free" — confirm no forced accent change.

- [ ] **Step 5: Commit**

```bash
git add start.html
git commit -m "feat(onboarding): vibe picker expanded to 8 — Deep/Bright/Heavy/Free added; wired to accent pre-select"
```

---

## Final Smoke Test

After all chunks are complete, run a full visual pass across all three files.

- [ ] **Open able-v7.html** — scroll full page, confirm: glow renders (or fallback visible), fan capture section has no duplicate, confirmation landing works with `?confirmed=1`
- [ ] **Open able-v7.html?edit=1** — confirm: floating pill shows "live immediately" label, fan capture sheet shows char counters and hints
- [ ] **Open admin.html with empty localStorage** — confirm: empty states visible (dashes, dashed sparklines, empty-col copy)
- [ ] **Open admin.html with data** — confirm: arc animates on node tap, spike nudge shows when simulated via console, Settings panel renders fully
- [ ] **Open start.html** — confirm: 8 vibe options, accent pre-selects on vibe tap
- [ ] **Resize all three to 375px** — confirm no horizontal overflow on any surface
- [ ] **Commit final smoke test confirmation** (or note any issues found)

---

## What this plan does NOT cover

These remain open for future plans:
- Push notifications (requires service worker + backend)
- Supabase auth migration
- Full PostHog analytics integration
- Drag-to-reorder sections (Artist tier)
- Fan dashboard (fan.html) — Phase 2
- Email broadcast backend
