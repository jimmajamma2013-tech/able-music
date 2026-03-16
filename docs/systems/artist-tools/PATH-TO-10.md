# Artist Tools — Path to 10
**Last updated: 2026-03-16 | Current score: 6.8/10 | Target: 9/10**

> Prioritised fix list across all 13 admin tools. P0 = blocks launch quality. P1 = ships in V1. P2 = V2. P3 = Phase 2+.
> Full spec for each tool in `SPEC.md`. Analysis in `ANALYSIS.md`.

---

## P0 — Blocking (Fix Before Any Artist Touches the Product)

These 4 fixes are each under 2 hours. They should be done before any other admin work begins.

---

### P0-1: Shows manager — date sort and past show archiving

**Tool:** Shows manager (#4)
**Current score:** 6/10 → 7/10 after this fix
**Effort:** ~1 hour

**Why P0:** An artist entering their first 3 shows will immediately see them in entry order, not chronological order. If they enter a March show first, then a February show, the list shows March above February. This is wrong, obviously wrong, and will cause artists to distrust the admin immediately.

Past shows staying permanently in the active list creates noise. An artist with 5 past shows and 2 upcoming sees a confusing 7-item list with no way to tell what's current.

**Exact JS fix — shows date sort:**

In `renderShowsList()` (or wherever `able_shows` is rendered in `admin.html`), sort before rendering:

```javascript
// Sort shows chronologically (ascending — soonest first)
shows.sort((a, b) => new Date(a.date) - new Date(b.date));
```

`new Date(a.date)` works correctly when `date` is stored as `YYYY-MM-DD` (ISO format). If `date` is stored as a different format, convert to ISO first. Confirm the date format in `able_shows` before applying this fix.

**Alternative using string comparison (faster, works for ISO dates only):**

```javascript
shows.sort((a, b) => a.date.localeCompare(b.date));
```

`localeCompare` on ISO date strings (`YYYY-MM-DD`) sorts chronologically because the string comparison matches date order for this format. Use `new Date()` comparison if date format is not confirmed as ISO.

**Exact JS fix — past show archiving:**

After sorting, split into upcoming and past:

```javascript
const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
const upcoming = shows.filter(s => s.date >= today);
const past = shows.filter(s => s.date < today);

// Render upcoming shows
renderShowItems(upcoming, container);

// Render past shows as a collapsed section
if (past.length > 0) {
  const pastSection = document.createElement('div');
  pastSection.className = 'shows-past-section';
  pastSection.innerHTML = `
    <button class="shows-past-toggle" onclick="togglePastShows(this)" aria-expanded="false">
      Past shows (${past.length})
    </button>
    <div class="shows-past-list" hidden>
      <!-- past show items rendered here -->
    </div>
  `;
  renderShowItems(past, pastSection.querySelector('.shows-past-list'));
  container.appendChild(pastSection);
}
```

`togglePastShows(btn)` toggles `aria-expanded` and removes/adds `hidden` on the list div.

**Copy for the past shows toggle button:**
```
Past shows (3)
```
On expand, the button text does not need to change — the section expands visually. No "Hide past shows" toggle needed. A chevron icon rotating from ▶ to ▼ is sufficient.

**Note on "today" boundary:** A show on today's date is considered upcoming (`s.date >= today`). A show from yesterday is considered past (`s.date < today`). This is correct — an artist entering tonight's show should see it in the upcoming list even if the current time is past the doors time.

---

### P0-2: Close Circle — "Payments setup required" gate state

**Tool:** Support / Close Circle (#7)
**Current score:** 5/10 → 6/10 after this fix
**Effort:** ~2 hours

**Why P0:** Close Circle cannot process payments without Stripe Connect. If an artist enables Close Circle and puts their ABLE page in their bio, fans who tap the support section see packs they cannot buy. The artist looks unprofessional. The product looks broken. The trust cost is immediate and severe.

The fix is not Stripe (that is P2). The fix is a clear gate state that tells the artist exactly what they've done (set up support packs — correct) and what they still need to do (connect Stripe — required for payments).

**Exact HTML for the "Payments setup required" gate state:**

```html
<!-- Show this block when Close Circle is enabled AND Stripe is not connected -->
<div class="close-circle-stripe-gate" id="closeCircleStripeGate">
  <div class="cc-gate-icon">💳</div>
  <p class="cc-gate-heading">You've set up your support packs.</p>
  <p class="cc-gate-body">
    Now connect Stripe to start receiving payments.<br>
    <span class="cc-gate-note">0% taken by ABLE. Stripe standard fee only.</span>
  </p>
  <a href="https://connect.stripe.com/oauth/authorize?[STRIPE_PARAMS]"
     class="btn btn-accent cc-connect-btn"
     target="_blank"
     rel="noopener">
    Connect Stripe →
  </a>
</div>
```

**Styling notes:**
- `cc-gate-heading`: weight 600, `--color-text` (not muted — this is important information)
- `cc-gate-body`: weight 400, `--color-text-2`, 14px
- `cc-gate-note`: smaller, `--color-text-3` (the "0% taken" line is secondary context)
- `cc-connect-btn`: accent fill button, full width on mobile

**Logic — when to show this gate state:**

```javascript
function renderCloseCircleSection(profile) {
  const isEnabled = profile.closeCircle?.enabled;
  const isStripeConnected = profile.closeCircle?.stripeConnected; // false until Stripe is wired

  if (isEnabled && !isStripeConnected) {
    document.getElementById('closeCircleStripeGate').removeAttribute('hidden');
    document.getElementById('closeCirclePacks').setAttribute('hidden', '');
    return;
  }

  // Normal render...
}
```

**What happens on `able-v7.html` when Close Circle is enabled but Stripe is not:**

The support section on `able-v7.html` should NOT show the support packs if Stripe is not connected. Options:
1. Hide the section entirely (simplest — no confusing UI for fans)
2. Show "Support coming soon" (transparent but may raise questions)

Recommended: hide the section entirely until `stripeConnected: true`. An artist who has enabled Close Circle but not connected Stripe does not yet have a live support product.

**Implementation note:** `profile.closeCircle?.stripeConnected` does not exist in the current data model. Add it as a boolean field defaulting to `false`. When Stripe Connect is wired (P2), this field is set to `true` after the OAuth callback completes.

---

### P0-3: Accent colour picker in admin.html

**Tool:** Profile identity (#11)
**Current score:** 7/10 → 8/10 after this fix
**Effort:** ~2 hours

**Why P0:** The accent colour is the most visible expression of an artist's brand on their ABLE page. It is set in the wizard but cannot be changed in admin.html after onboarding. An artist who launches a new EP with a different visual identity has no way to update their ABLE colour. This is a basic CRUD operation that is completely absent for a core profile attribute.

**Exact HTML for the accent colour picker:**

Add this to the Profile Identity card in `admin.html`, after the genre and feel selectors:

```html
<div class="identity-row" id="accentPickerRow">
  <label class="identity-label">Accent colour</label>
  <div class="accent-picker-wrap">
    <!-- 8 preset swatches -->
    <div class="accent-presets" role="group" aria-label="Preset accent colours">
      <button class="acc-swatch" style="--c:#e05242" onclick="setAccent('#e05242')"
              aria-label="Coral red" title="Coral red"></button>
      <button class="acc-swatch" style="--c:#f4b942" onclick="setAccent('#f4b942')"
              aria-label="Amber" title="Amber"></button>
      <button class="acc-swatch" style="--c:#3b82f6" onclick="setAccent('#3b82f6')"
              aria-label="Blue" title="Blue"></button>
      <button class="acc-swatch" style="--c:#22c55e" onclick="setAccent('#22c55e')"
              aria-label="Green" title="Green"></button>
      <button class="acc-swatch" style="--c:#a855f7" onclick="setAccent('#a855f7')"
              aria-label="Purple" title="Purple"></button>
      <button class="acc-swatch" style="--c:#ef4444" onclick="setAccent('#ef4444')"
              aria-label="Red" title="Red"></button>
      <button class="acc-swatch" style="--c:#ec4899" onclick="setAccent('#ec4899')"
              aria-label="Pink" title="Pink"></button>
      <button class="acc-swatch" style="--c:#06b6d4" onclick="setAccent('#06b6d4')"
              aria-label="Cyan" title="Cyan"></button>
    </div>
    <!-- Custom colour input -->
    <label class="acc-custom-wrap" title="Custom colour">
      <input type="color" id="accentInput" value="#e05242"
             oninput="setAccent(this.value)"
             aria-label="Custom accent colour">
      <span class="acc-hex" id="accentHex">#e05242</span>
    </label>
  </div>
</div>
```

**CSS for swatches:**

```css
.acc-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--c);
  border: 2px solid transparent;
  cursor: pointer;
  transition: border-color 150ms;
}
.acc-swatch.active,
.acc-swatch:focus-visible {
  border-color: var(--color-text);
  outline: none;
}
.acc-custom-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
input[type="color"] {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}
.acc-hex {
  font-size: 12px;
  font-family: monospace;
  color: var(--color-text-2);
}
```

**JS for `setAccent()`:**

```javascript
function setAccent(hex) {
  // Update the CSS variable on the document root
  document.documentElement.style.setProperty('--artist-accent', hex);
  document.documentElement.style.setProperty('--color-accent', hex);

  // Update hex display
  const hexEl = document.getElementById('accentHex');
  if (hexEl) hexEl.textContent = hex;

  // Sync color input
  const colorInput = document.getElementById('accentInput');
  if (colorInput) colorInput.value = hex;

  // Mark active swatch
  document.querySelectorAll('.acc-swatch').forEach(s => {
    s.classList.toggle('active', s.style.getPropertyValue('--c') === hex);
  });

  // Save to profile
  const profile = getProfile();
  profile.accent = hex;
  saveProfile(profile);
  syncProfile();
}
```

**Where to call `syncProfile()` matters:** The accent colour change must propagate to `able-v7.html` in real time via the shared localStorage key. Confirm `syncProfile()` writes to `able_v3_profile` and that `able-v7.html` reads `able_v3_profile.accent` on load.

**Initialise the picker on admin load:**

```javascript
function initAccentPicker(profile) {
  const hex = profile.accent || '#e05242';
  document.documentElement.style.setProperty('--artist-accent', hex);
  document.getElementById('accentInput').value = hex;
  document.getElementById('accentHex').textContent = hex;
  // Mark matching swatch as active
  document.querySelectorAll('.acc-swatch').forEach(s => {
    s.classList.toggle('active', s.style.getPropertyValue('--c') === hex);
  });
}
```

Call `initAccentPicker(profile)` in `showPage('identity')` or wherever the identity section initialises.

---

### P0-4: Star toggle wired in fan row

**Tool:** Fan list (#2)
**Current score:** 8/10 → confirmed 8/10 (if wired) or 7/10 (if not)
**Effort:** ~1 hour

**Why P0:** `able_starred_fans` exists as a documented localStorage key in the data architecture. The spec mentions a star toggle in the fan row. If the UI element exists but is not writing to/reading from `able_starred_fans`, the feature is dead. If it is wired, no action needed. The P0 action is to confirm.

**Confirmation checklist:**
- [ ] Open admin.html fan list
- [ ] Confirm there is a star/bookmark icon in each fan row
- [ ] Tap a star — does the fan's email appear in `localStorage.getItem('able_starred_fans')`?
- [ ] Reload the page — does the star persist?
- [ ] If yes to all: mark this P0 as complete
- [ ] If the star UI exists but is not wired: apply the fix below

**Fix (if star toggle is not wired):**

```javascript
function toggleStar(email) {
  const starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
  const idx = starred.indexOf(email);
  if (idx === -1) {
    starred.push(email);
  } else {
    starred.splice(idx, 1);
  }
  localStorage.setItem('able_starred_fans', JSON.stringify(starred));

  // Update the star button state in the UI
  const btn = document.querySelector(`[data-star-email="${email}"]`);
  if (btn) {
    const isStarred = idx === -1; // after toggle, true if we just added
    btn.classList.toggle('starred', isStarred);
    btn.setAttribute('aria-label', isStarred ? 'Unstar fan' : 'Star fan');
  }
}

function isStarred(email) {
  const starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
  return starred.includes(email);
}
```

**Fan row HTML (the star button):**

```html
<button class="fan-star-btn ${isStarred(fan.email) ? 'starred' : ''}"
        data-star-email="${fan.email}"
        onclick="toggleStar('${fan.email}')"
        aria-label="${isStarred(fan.email) ? 'Unstar fan' : 'Star fan'}">
  ★
</button>
```

---

## P1 — Ships in V1

### P1-1: Campaign HQ — state change toast
**Effort:** 30 minutes

```javascript
function setCampaignState(state) {
  // ... existing logic ...
  const COPY = {
    profile: 'Profile mode.',
    pre: 'Pre-release.',
    live: 'Live.',
    gig: 'Gig mode on.'
  };
  showToast(COPY[state]);
}
```

---

### P1-2: Analytics — UTM source tracking
**Effort:** ~3 hours. Pure client-side. No API required.

When artist copies their page link from admin, append UTM parameters:
- "Copy Instagram link" → `?utm_source=instagram&utm_medium=bio`
- "Copy TikTok link" → `?utm_source=tiktok&utm_medium=bio`

`able-v7.html` reads UTM params on load, stores in fan/view/click events:

```javascript
function getUtmSource() {
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_source') || 'direct';
}
```

---

### P1-3: Music manager — release status badges
**Effort:** ~2 hours

```javascript
function getReleaseStatus(releaseDate) {
  if (!releaseDate) return 'draft';
  const d = new Date(releaseDate);
  const now = new Date();
  const liveWindowMs = 14 * 24 * 60 * 60 * 1000; // 14 days in ms
  if (d > now) return 'upcoming';
  if (now - d < liveWindowMs) return 'live';
  return 'archive';
}
```

Render as a pill badge in the release list row:
- `upcoming`: amber pill, copy "Upcoming"
- `live`: accent (red) pill, copy "Live"
- `archive`: muted pill, copy "Archive"

---

### P1-4: Section order — empty-section warning
**Effort:** ~2 hours

In `renderSectionOrder()`, check if each section has content:

```javascript
function sectionHasContent(sectionKey, profile) {
  switch (sectionKey) {
    case 'music':    return (profile.releases || []).length > 0;
    case 'events':   return (JSON.parse(localStorage.getItem('able_shows') || '[]')).length > 0;
    case 'merch':    return (profile.merch || []).length > 0;
    case 'snaps':    return (profile.snapCards || []).some(c => c.published);
    case 'support':  return profile.closeCircle?.enabled;
    default:         return true;
  }
}
```

If `isVisible(section) && !sectionHasContent(section, profile)`:
```html
<span class="section-empty-badge">Empty</span>
```
Copy: amber pill, 11px, "Empty". Tooltip on hover: "This section is visible but has no content — fans will see an empty section header."

---

### P1-5: Connections — URL validation + RA field
**Effort:** ~2 hours

Add debounced validation on blur:
```javascript
function validatePlatformUrl(input) {
  const val = input.value.trim();
  if (val && !val.startsWith('https://')) {
    input.setCustomValidity("That doesn't look like a valid URL — try starting with https://");
    input.reportValidity();
  } else {
    input.setCustomValidity('');
  }
}
```

Add RA field in the connections form:
```html
<div class="conn-field">
  <label for="connRA">Resident Advisor</label>
  <input type="url" id="connRA" name="ra"
         placeholder="https://ra.co/dj/..."
         onblur="validatePlatformUrl(this); savePlatformLinks();">
</div>
```

---

### P1-6: Your World — moment editing + "next moment" on admin home
**Effort:** ~3 hours

**Moment editing:** When a moment row is tapped, expand it inline to show the add-form pre-filled. "Save changes" and "Delete" buttons at the bottom. Same form as the add form — no new UI patterns needed.

**"Next moment" on admin home:** Below the greeting sub-line, add:

```javascript
function buildNextMoment(profile) {
  const moments = (profile.moments || [])
    .filter(m => m.date >= new Date().toISOString().split('T')[0])
    .sort((a, b) => a.date.localeCompare(b.date));

  if (moments.length === 0) return '';
  const next = moments[0];
  const formatted = new Date(next.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
  return `Next: ${next.title} — ${formatted}`;
}
```

---

### P1-7: Document ANTHROPIC_API_KEY in deployment checklist
**Effort:** 15 minutes

Add `ANTHROPIC_API_KEY` to the environment variables table in `SPEC.md` (already exists there) and to any Netlify deployment checklist document. Register at console.anthropic.com. Set in Netlify UI → Site settings → Environment variables.

---

## P2 — V2 Improvements

### P2-1: Ticketmaster shows import
**Tool:** Shows manager (#4)
After `ticketmaster-import.js` is built (see `docs/systems/integrations/PATH-TO-10.md P0-1`):
- Add "Import shows →" button to shows manager header
- Prompt: "Enter your artist name to find upcoming shows"
- On success: preview with checkboxes, "Add all" button
- Merge with existing shows (deduplicate by date + venue)

**Effort:** ~3 hours (after ticketmaster function exists)

---

### P2-2: Snap card drag-to-reorder
Using HTML5 Drag and Drop API with touch fallback. Up/down arrows remain for accessibility.
**Effort:** ~4 hours

---

### P2-3: Merch manager — reorder arrows + sold-out toggle
Mirror snap card reorder pattern. Add `sold_out` boolean. Sold-out items display with grey badge.
**Effort:** ~3 hours

---

### P2-4: Broadcasts send function
Build `netlify/functions/broadcast-send.js` using Resend API. Full spec in `docs/systems/email/SPEC.md`.
Add preview step. Set `RESEND_API_KEY` in Netlify environment variables.
**Effort:** ~6 hours

---

### P2-5: Analytics — time-range selector
Segmented control: 7d / 30d / All time. Filter `able_views`, `able_clicks`, `able_fans` by timestamp.
**Effort:** ~3 hours

---

### P2-6: Your World — state integration nudges
Adding a release-type moment for a future date: offer "Switch to pre-release mode →"
Adding a gig-type moment for today: offer "Turn on gig mode →"
**Effort:** ~2 hours

---

## P3 — Phase 2+

### P3-1: Stripe Connect for Close Circle
Enables actual payment processing. Requires full Stripe Connect OAuth flow.
See `docs/apis/stripe.md` and `docs/systems/monetisation/SPEC.md`.
**Score impact: Close Circle 5/10 → 9/10**

### P3-2: PostHog analytics integration
Persistent cross-device analytics. See `docs/apis/posthog.md`. Requires backend.

### P3-3: Spotify discography import in music manager
Pull full discography from Spotify import payload: `/v1/artists/{id}/albums`

### P3-4: Shopify/Big Cartel merch import
Live product cards with real prices and images.

---

## Score Projection

| After | Expected admin toolset score |
|---|---|
| P0 complete (shows sort + archive, Close Circle gate, accent picker, star toggle confirmed) | 8/10 |
| P1 complete (toast, UTM, release badges, empty warnings, RA field, moments edit, next moment) | 8.5/10 |
| P2 complete (events import, broadcasts send, analytics range, drag reorder) | 9/10 |
| P3 complete (Stripe Connect, PostHog, discography import) | 9.5/10 |

**The highest-impact 8 hours of work in admin.html:**
1. Shows date sort + archive (1 hour)
2. Close Circle gate state (2 hours)
3. Accent colour picker (2 hours)
4. Star toggle confirmed/wired (1 hour)
5. UTM source tracking (3 hours) — makes the analytics actually useful

These 5 items move admin.html from 6.8/10 to 8/10. Everything after that is refinement.
