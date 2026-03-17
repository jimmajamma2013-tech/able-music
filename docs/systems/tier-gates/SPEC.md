# Tier Gate System — Canonical Spec
**Date: 2026-03-15**
**Status: Authoritative — build directly from this**
**Applies to: admin.html, able-v7.html, start.html**

---

## 2.0 Tier reference

| Tier | Price | localStorage value |
|---|---|---|
| Free | £0 | `"free"` |
| Artist | £9/mo | `"artist"` |
| Artist Pro | £19/mo | `"artist-pro"` |
| Label | £49/mo | `"label"` |

**Storage key:** `able_tier` — string, one of the four values above. Default: `"free"`.

```javascript
function getCurrentTier() {
  return localStorage.getItem('able_tier') || 'free';
}

function tierAtLeast(required) {
  const order = { free: 0, artist: 1, 'artist-pro': 2, label: 3 };
  return order[getCurrentTier()] >= order[required];
}
```

---

## 2.1 Gate visual component

The `.tier-gate` wrapper is applied around any gated feature. It is the only pattern used — no bare padlock icons, no redirect banners.

### 2.1.1 HTML structure

```html
<!-- Tier gate wrapper -->
<div class="tier-gate" data-tier="artist-pro" data-feature="email-broadcasts">

  <!-- The actual feature UI — blurred, aria-hidden, non-interactive -->
  <div class="tier-gate-content" aria-hidden="true" tabindex="-1">
    <!-- Real feature markup goes here, or a skeleton approximation -->
  </div>

  <!-- Overlay: always visible, always interactive -->
  <div class="tier-gate-overlay" role="complementary" aria-label="Feature locked">
    <span class="tier-gate-icon" aria-hidden="true">✦</span>
    <p class="tier-gate-headline">[Specific value prop — see §2.2]</p>
    <button
      class="tier-gate-cta"
      onclick="openUpgradeSheet('[feature-id]')"
      aria-label="See plans to unlock [feature name]"
    >
      See Artist Pro plans
    </button>
  </div>

</div>
```

The `data-tier` attribute indicates the *minimum tier required*. The `data-feature` attribute identifies the feature for analytics and for pre-populating the upgrade sheet context.

### 2.1.2 CSS

```css
/* ── Tier gate wrapper ── */
.tier-gate {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

/* ── Blurred preview ── */
.tier-gate-content {
  filter: blur(4px);
  pointer-events: none;
  user-select: none;
  opacity: 0.55;
  /* Prevent any interactive element inside from receiving focus */
  visibility: visible;
}

/* ── Overlay ── */
.tier-gate-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  background: rgba(9, 9, 15, 0.72);          /* --bg at 72% */
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 12px;
  border: 1px solid rgba(201, 168, 76, 0.22); /* --acc at 22% */
  text-align: center;
}

/* ── Icon ── */
.tier-gate-icon {
  font-size: 18px;
  color: var(--acc);                          /* #c9a84c amber */
  line-height: 1;
}

/* ── Headline ── */
.tier-gate-headline {
  font-family: var(--font);
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  line-height: 1.45;
  max-width: 260px;
  margin: 0;
}

/* ── CTA button ── */
.tier-gate-cta {
  margin-top: 4px;
  padding: 8px 18px;
  font-family: var(--font);
  font-size: 12px;
  font-weight: 700;
  color: var(--acc);
  background: rgba(var(--acc-rgb), 0.12);
  border: 1px solid rgba(var(--acc-rgb), 0.30);
  border-radius: 100px;
  cursor: pointer;
  transition: background 0.14s ease, border-color 0.14s ease;
  min-height: 36px;
  white-space: nowrap;
}

.tier-gate-cta:hover {
  background: rgba(var(--acc-rgb), 0.20);
  border-color: rgba(var(--acc-rgb), 0.48);
}

.tier-gate-cta:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--acc), 0 0 0 6px rgba(var(--acc-rgb), 0.25);
}
```

### 2.1.3 JS gate check (apply on render)

```javascript
function applyGates() {
  document.querySelectorAll('.tier-gate').forEach(gate => {
    const required = gate.dataset.tier;
    if (tierAtLeast(required)) {
      // Artist has access — remove gate, show content
      gate.classList.remove('tier-gate');
      const overlay = gate.querySelector('.tier-gate-overlay');
      const content = gate.querySelector('.tier-gate-content');
      if (overlay) overlay.remove();
      if (content) {
        content.removeAttribute('aria-hidden');
        content.removeAttribute('tabindex');
        content.style.filter = '';
        content.style.opacity = '';
        content.style.pointerEvents = '';
      }
    }
    // else: gate remains as-is, overlay is visible
  });
}
// Call on page load after profile is read
```

---

## 2.2 Gate copy — complete inventory

Every gated feature has one headline and one CTA label. No placeholders.

Format: **[Specific thing they get]. [Tier name].**

### Artist tier gates (requires "artist" — £9/mo)

**Unlimited snap cards**
- Gate context: Artist has 1 snap card and tries to add another
- Headline: "Add as many snap cards as you want. Artist."
- CTA: "See Artist plans"

**Campaign modes (pre-release, live, gig)**
- Gate context: Artist tries to switch to a campaign state in Campaign HQ
- Headline: "Set a release date, run a live window, or go into gig mode. Artist."
- CTA: "See Artist plans"

**Connections (collaborator links)**
- Gate context: Artist tries to add a connection / freelancer credit
- Headline: "Link to the people you've made music with. Artist."
- CTA: "See Artist plans"

**Fan email list above 100**
- Gate context: Fan list has reached 100, artist is on Free
- Headline: "You've reached 100 fans. Your next 1,900 are one step away. Artist."
- CTA: "See Artist plans"

---

### Artist Pro tier gates (requires "artist-pro" — £19/mo)

**Email broadcasts**
- Gate context: "Message fans" section in Fans page
- Headline: "Send a message directly to every fan on your list. Artist Pro."
- CTA: "See Artist Pro plans"

**Full fan CRM (starred, filtered, sorted list)**
- Gate context: Fans page advanced filtering / segmentation
- Headline: "See your most engaged fans, filter by source, and act on it. Artist Pro."
- CTA: "See Artist Pro plans"

**Advanced analytics (click breakdown, source attribution, sparklines over 7 days)**
- Gate context: Analytics section beyond basic view/fan/click counts
- Headline: "See where your fans come from, what they tap, and when they show up. Artist Pro."
- CTA: "See Artist Pro plans"

**Support packs (direct financial support from fans)**
- Gate context: "Add support option" in profile / merch section
- Headline: "Let fans support you directly — on your terms. Artist Pro."
- CTA: "See Artist Pro plans"

**Fan email broadcasts — scheduling**
- Gate context: Artist Pro user tries to schedule a broadcast (schedule is Pro+)
- Headline: "Schedule a message to go out when the moment's right. Artist Pro."
- CTA: "See Artist Pro plans"

**Export fan list as CSV**
- Gate context: Export button on Fans page (Artist tier gets in-app viewing; export is Pro)
- Headline: "Download your full fan list and take it anywhere. Artist Pro."
- CTA: "See Artist Pro plans"

---

### Label tier gates (requires "label" — £49/mo)

**Multiple artist pages (beyond 1)**
- Gate context: Artist tries to add a second page from their account
- Headline: "Manage up to 10 artist pages from one account. Label."
- CTA: "See Label plans"

**Team access**
- Gate context: Artist tries to invite a team member or manager
- Headline: "Give your team access without sharing your login. Label."
- CTA: "See Label plans"

**Aggregate analytics (across multiple pages)**
- Gate context: Label-level analytics view
- Headline: "See how all your artists are performing in one place. Label."
- CTA: "See Label plans"

**API access**
- Gate context: Settings → API section (hidden on lower tiers)
- Headline: "Connect your own tools to your fan data. Label."
- CTA: "See Label plans"

---

## 2.3 Upgrade bottom sheet spec

### 2.3.1 Trigger

```javascript
function openUpgradeSheet(featureId) {
  const sheet = document.getElementById('upgradeSheet');
  // Optionally pre-populate context headline from feature ID
  if (featureId && GATE_COPY[featureId]) {
    document.getElementById('upgradeSheetContext').textContent =
      GATE_COPY[featureId].headline;
  } else {
    document.getElementById('upgradeSheetContext').textContent = '';
  }
  sheet.style.display = 'block';
  requestAnimationFrame(() => sheet.classList.add('open'));
}

function closeUpgradeSheet() {
  const sheet = document.getElementById('upgradeSheet');
  sheet.classList.remove('open');
  setTimeout(() => sheet.style.display = 'none', 320);
}
```

### 2.3.2 Full DOM

```html
<div class="bottom-sheet" id="upgradeSheet" role="dialog" aria-modal="true"
     aria-labelledby="upgradeSheetTitle">

  <div class="bottom-sheet-backdrop" onclick="closeUpgradeSheet()"></div>

  <div class="bottom-sheet-content upgrade-sheet-content">
    <div class="bottom-sheet-handle" aria-hidden="true"></div>

    <!-- Context line (pre-populated with the specific gate headline when opened) -->
    <p class="upgrade-sheet-context" id="upgradeSheetContext"></p>

    <h2 class="upgrade-sheet-title" id="upgradeSheetTitle">Your plan</h2>

    <!-- Tier cards row -->
    <div class="upgrade-tier-row">

      <!-- Free (shown as "current" if on Free) -->
      <div class="upgrade-tier-card" data-tier="free" id="upgradeTierFree">
        <div class="upgrade-tier-name">Free</div>
        <div class="upgrade-tier-price">£0</div>
        <ul class="upgrade-tier-benefits">
          <li>Basic profile</li>
          <li>1 snap card</li>
          <li>100 fans</li>
        </ul>
        <div class="upgrade-tier-current-badge">Current plan</div>
      </div>

      <!-- Artist -->
      <div class="upgrade-tier-card upgrade-tier-card--featured" data-tier="artist"
           id="upgradeTierArtist">
        <div class="upgrade-tier-name">Artist</div>
        <div class="upgrade-tier-price">£9<span>/mo</span></div>
        <ul class="upgrade-tier-benefits">
          <li>Unlimited snap cards</li>
          <li>2,000 fans</li>
          <li>Campaign modes</li>
        </ul>
        <button class="upgrade-tier-cta" onclick="handleTierSelect('artist')">
          Try Artist
        </button>
      </div>

      <!-- Artist Pro -->
      <div class="upgrade-tier-card" data-tier="artist-pro" id="upgradeTierPro">
        <div class="upgrade-tier-name">Artist Pro</div>
        <div class="upgrade-tier-price">£19<span>/mo</span></div>
        <ul class="upgrade-tier-benefits">
          <li>Email broadcasts</li>
          <li>Full fan list + export</li>
          <li>Advanced analytics</li>
        </ul>
        <button class="upgrade-tier-cta" onclick="handleTierSelect('artist-pro')">
          Try Artist Pro
        </button>
      </div>

    </div>

    <!-- Continue free — low-emphasis, honest -->
    <button class="upgrade-sheet-dismiss" onclick="closeUpgradeSheet()">
      Stay on Free for now
    </button>

    <!-- Label upsell — text only, no card at this tier -->
    <p class="upgrade-sheet-label-note">
      Managing multiple artists? <a href="#" onclick="handleTierSelect('label')">Label plans from £49/mo.</a>
    </p>

  </div>
</div>
```

### 2.3.3 CSS

```css
/* ── Upgrade sheet specific ── */
.upgrade-sheet-content {
  max-height: 88vh;
  padding-bottom: calc(24px + env(safe-area-inset-bottom));
}

.upgrade-sheet-context {
  font-size: 13px;
  font-weight: 500;
  color: var(--acc);
  margin: 0 0 8px;
  min-height: 18px;   /* reserve space even when empty */
  text-align: center;
}

.upgrade-sheet-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--dash-text);
  margin: 0 0 20px;
  text-align: center;
}

/* ── Tier row ── */
.upgrade-tier-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 4px;
  /* Hide scrollbar */
  scrollbar-width: none;
}
.upgrade-tier-row::-webkit-scrollbar { display: none; }

/* ── Tier card ── */
.upgrade-tier-card {
  flex: 0 0 auto;
  width: 140px;
  background: var(--dash-field);
  border: 1px solid var(--dash-border);
  border-radius: 12px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.upgrade-tier-card--featured {
  border-color: rgba(var(--acc-rgb), 0.45);
  background: rgba(var(--acc-rgb), 0.06);
}

/* Current tier: muted, no CTA */
.upgrade-tier-card[data-current="true"] {
  opacity: 0.6;
}

.upgrade-tier-name {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--dash-t2);
}

.upgrade-tier-card--featured .upgrade-tier-name {
  color: var(--acc);
}

.upgrade-tier-price {
  font-family: var(--font-d);
  font-size: 26px;
  font-weight: 700;
  color: var(--dash-text);
  line-height: 1;
  letter-spacing: 0.02em;
}

.upgrade-tier-price span {
  font-family: var(--font);
  font-size: 12px;
  font-weight: 400;
  color: var(--dash-t2);
}

.upgrade-tier-benefits {
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.upgrade-tier-benefits li {
  font-size: 11px;
  font-weight: 500;
  color: var(--dash-t2);
  padding-left: 12px;
  position: relative;
}

.upgrade-tier-benefits li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--dash-t3);
}

.upgrade-tier-cta {
  margin-top: auto;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--dash-text);
  background: var(--dash-amber);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font);
  transition: opacity 0.14s;
}

.upgrade-tier-cta:hover { opacity: 0.88; }

.upgrade-tier-current-badge {
  margin-top: auto;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--dash-t3);
  text-align: center;
  padding: 6px 0;
}

/* ── Dismiss ── */
.upgrade-sheet-dismiss {
  display: block;
  width: 100%;
  margin-top: 16px;
  padding: 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--dash-t3);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font);
  text-align: center;
  transition: color 0.14s;
}

.upgrade-sheet-dismiss:hover { color: var(--dash-t2); }

/* ── Label note ── */
.upgrade-sheet-label-note {
  font-size: 11px;
  color: var(--dash-t3);
  text-align: center;
  margin: 4px 0 0;
}

.upgrade-sheet-label-note a {
  color: var(--acc);
  text-decoration: none;
}
```

### 2.3.4 Tier highlighting logic

```javascript
function highlightCurrentTier() {
  const current = getCurrentTier();
  const cards = document.querySelectorAll('.upgrade-tier-card');
  cards.forEach(card => {
    if (card.dataset.tier === current) {
      card.dataset.current = 'true';
      const cta = card.querySelector('.upgrade-tier-cta');
      if (cta) cta.remove();
    } else {
      card.dataset.current = 'false';
    }
  });
}

function handleTierSelect(tier) {
  // Interim (pre-Stripe): open waitlist/notification flow
  // Once Stripe is wired: redirect to checkout session
  closeUpgradeSheet();
  showToast(`Noted. We'll reach out when ${tier === 'artist' ? 'Artist' : tier === 'artist-pro' ? 'Artist Pro' : 'Label'} billing is ready.`);
  // TODO: POST to waitlist endpoint with { tier, artist_id }
}
```

### 2.3.5 Current tier: shown in sheet heading

When the artist is on Free:
- Context: populated with specific gate headline
- Featured card: Artist

When the artist is on Artist:
- Context: populated with specific gate headline
- Featured card: Artist Pro

When the artist is on Artist Pro and hits a Pro+ gate (Label feature):
- Featured card: Label (add as third card in the row)

---

## 2.4 Limit warning system

### 2.4.1 Fan count warnings

```javascript
const FAN_LIMIT_FREE   = 100;
const FAN_LIMIT_ARTIST = 2000;

function checkFanLimitWarnings() {
  const fans  = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const tier  = getCurrentTier();
  const limit = tier === 'free' ? FAN_LIMIT_FREE
              : tier === 'artist' ? FAN_LIMIT_ARTIST
              : Infinity;

  if (limit === Infinity) return;

  const count   = fans.length;
  const pct     = count / limit;
  const key80   = `fan_warn_80_${limit}`;
  const key95   = `fan_warn_95_${limit}`;

  // 80% warning — amber toast, once per limit level
  if (pct >= 0.80 && pct < 0.95 && !localStorage.getItem(key80)) {
    localStorage.setItem(key80, '1');
    showToast(
      `You've had ${count} fan sign-ups. Your ${tier === 'free' ? 'free' : 'plan'} limit is ${limit}.`,
      { type: 'warning', duration: 6000 }
    );
  }

  // 95% warning — persistent banner in admin, dismissible once
  if (pct >= 0.95 && count < limit && !localStorage.getItem(key95)) {
    localStorage.setItem(key95, '1');
    showLimitBanner(limit - count, limit, tier);
  }
}
```

### 2.4.2 Persistent limit banner

```html
<!-- Injected into admin home page when 95% fan threshold is reached -->
<div class="limit-banner" id="limitBanner" role="alert">
  <span class="limit-banner-text" id="limitBannerText"></span>
  <button class="limit-banner-cta" onclick="openUpgradeSheet('fan-list')">
    See plans
  </button>
  <button class="limit-banner-dismiss" onclick="dismissLimitBanner()"
          aria-label="Dismiss warning">×</button>
</div>
```

```css
.limit-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(var(--acc-rgb), 0.10);
  border: 1px solid rgba(var(--acc-rgb), 0.28);
  border-radius: 10px;
  margin-bottom: 16px;
}

.limit-banner-text {
  flex: 1;
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
}

.limit-banner-cta {
  font-size: 11px;
  font-weight: 700;
  color: var(--acc);
  background: none;
  border: 1px solid rgba(var(--acc-rgb), 0.35);
  border-radius: 100px;
  padding: 4px 10px;
  cursor: pointer;
  font-family: var(--font);
  white-space: nowrap;
}

.limit-banner-dismiss {
  font-size: 16px;
  color: var(--t2);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}
```

```javascript
function showLimitBanner(spotsLeft, limit, tier) {
  const banner = document.getElementById('limitBanner');
  const text   = document.getElementById('limitBannerText');
  if (!banner || !text) return;
  text.textContent = spotsLeft === 1
    ? `1 spot left on your ${tier === 'free' ? 'free' : 'plan'} list.`
    : `${spotsLeft} spots left on your ${tier === 'free' ? 'free' : 'plan'} list.`;
  banner.style.display = 'flex';
}

function dismissLimitBanner() {
  const banner = document.getElementById('limitBanner');
  if (banner) banner.style.display = 'none';
}
```

### 2.4.3 Snap card limit warning

```javascript
const SNAP_LIMIT_FREE = 1;

function checkSnapCardLimit() {
  const tier = getCurrentTier();
  if (tierAtLeast('artist')) return; // No limit
  const snaps = JSON.parse(localStorage.getItem('able_snap_cards') || '[]');
  if (snaps.length >= SNAP_LIMIT_FREE) {
    // Hide "Add snap card" button; show gate instead
    const addBtn = document.getElementById('addSnapCardBtn');
    if (addBtn) addBtn.style.display = 'none';
    const gate = document.getElementById('snapCardGate');
    if (gate) gate.style.display = 'flex';
  }
}
```

---

## 2.5 Limit reached UX — fan sign-up form on able-v7.html

When the artist is on Free and fans.length >= 100:

**Fan-facing experience (able-v7.html):** The sign-up form does not disappear. It converts:

```javascript
// In able-v7.html fan sign-up section:
function checkFanCapOnPublicPage() {
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  const tier = localStorage.getItem('able_tier') || 'free';
  if (tier === 'free' && fans.length >= 100) {
    // Swap sign-up form for a neutral holding message
    // Fans see nothing broken — just a closed list
    document.getElementById('fanSignupForm').style.display = 'none';
    document.getElementById('fanCapMessage').style.display = 'block';
  }
}
```

```html
<!-- Fan-facing cap message — on able-v7.html, shown when Free cap is hit -->
<div class="fan-cap-message" id="fanCapMessage" style="display:none;">
  <p>This list is currently closed.</p>
</div>
```

This is intentionally minimal. Fans don't need to know why. They don't see upgrade prompts — that is the artist's problem, not the fan's.

**Artist-facing experience (admin.html):** Fans page shows a persistent upgrade prompt:

```html
<div class="fan-list-cap-prompt" id="fanListCapPrompt" style="display:none;">
  <p class="fan-cap-prompt-line1">You've reached 100 fans.</p>
  <p class="fan-cap-prompt-line2">That's a real audience. Your next 1,900 are one step away.</p>
  <button class="tier-gate-cta" onclick="openUpgradeSheet('fan-list')">See Artist plans</button>
</div>
```

```css
.fan-list-cap-prompt {
  padding: 20px;
  text-align: center;
  background: rgba(var(--acc-rgb), 0.06);
  border: 1px solid rgba(var(--acc-rgb), 0.18);
  border-radius: 12px;
  margin-bottom: 16px;
}

.fan-cap-prompt-line1 {
  font-size: 14px;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 4px;
}

.fan-cap-prompt-line2 {
  font-size: 13px;
  font-weight: 400;
  color: var(--t2);
  margin: 0 0 16px;
}
```

---

## 2.6 Free tier philosophy — UI decisions

Free must feel like a gift, not a crippled product.

**Explicit decisions:**

| Feature | Free behaviour |
|---|---|
| Fan sign-up form on profile | Fully functional up to 100 fans |
| Snap cards | 1 snap card fully functional; "+ Add" button replaced by gate (not hidden) |
| Campaign HQ | Profile state only; pre-release/live/gig show gate in state button |
| Basic stats (views, clicks, fans, click rate) | Fully visible, no blur |
| Sparklines | Visible for first 7 days; after that, gated (Artist Pro for extended history) |
| Fan list | Fully visible and searchable up to 100; export is gated (Artist Pro) |
| Analytics deep-dive | Gated; visible stat totals are Free, breakdowns are Pro |
| Snap card gate | Gate overlay on the "+ Add snap card" slot, not a toast or redirect |
| Campaign state buttons (pre/live/gig) | Visible but wrapped in `.tier-gate` at the button level |

**Copy principle for Free limits:** Never phrase a limit as a failure or as punishment.

- "You've reached 100 fans. That's a real audience." — not "Upgrade to continue"
- "1 snap card on Free." — not "You've run out of snap cards"
- "Campaign modes are available on Artist." — not "This feature is locked"

---

## 2.7 Tier indicator in admin

### Location
- **Desktop:** Artist identity card in sidebar, below artist name — small pill
- **Mobile:** "More" bottom sheet header, below artist name — small pill

### HTML

```html
<!-- Sidebar identity card (desktop) -->
<div class="sb-identity">
  <div class="sb-avatar"><!-- initials or artwork --></div>
  <div class="sb-name" id="sbName">Artist name</div>
  <span class="tier-pill" id="tierPill">Free</span>
</div>
```

### CSS

```css
.tier-pill {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 2px 7px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--t3);
  background: transparent;
}

/* Active paid tier: amber accent */
.tier-pill[data-tier="artist"],
.tier-pill[data-tier="artist-pro"],
.tier-pill[data-tier="label"] {
  color: var(--acc);
  border-color: rgba(var(--acc-rgb), 0.30);
  background: rgba(var(--acc-rgb), 0.08);
}
```

### JS

```javascript
function applyTierPill() {
  const tier = getCurrentTier();
  const labels = { free: 'Free', artist: 'Artist', 'artist-pro': 'Artist Pro', label: 'Label' };
  document.querySelectorAll('.tier-pill').forEach(pill => {
    pill.textContent = labels[tier] || 'Free';
    pill.dataset.tier = tier;
  });
}
```

---

## 2.8 Gate copy lookup table (for use in JS)

```javascript
const GATE_COPY = {
  'snap-cards': {
    headline: 'Add as many snap cards as you want. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'campaign-modes': {
    headline: 'Set a release date, run a live window, or go into gig mode. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'connections': {
    headline: 'Link to the people you\'ve made music with. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'fan-list': {
    headline: 'You\'ve reached 100 fans. Your next 1,900 are one step away. Artist.',
    cta: 'See Artist plans',
    tier: 'artist'
  },
  'email-broadcasts': {
    headline: 'Send a message directly to every fan on your list. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'fan-crm': {
    headline: 'See your most engaged fans, filter by source, and act on it. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'advanced-analytics': {
    headline: 'See where your fans come from, what they tap, and when they show up. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'support-packs': {
    headline: 'Let fans support you directly — on your terms. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'broadcast-scheduling': {
    headline: 'Schedule a message to go out when the moment\'s right. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'export-fans': {
    headline: 'Download your full fan list and take it anywhere. Artist Pro.',
    cta: 'See Artist Pro plans',
    tier: 'artist-pro'
  },
  'multiple-pages': {
    headline: 'Manage up to 10 artist pages from one account. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'team-access': {
    headline: 'Give your team access without sharing your login. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'aggregate-analytics': {
    headline: 'See how all your artists are performing in one place. Label.',
    cta: 'See Label plans',
    tier: 'label'
  },
  'api-access': {
    headline: 'Connect your own tools to your fan data. Label.',
    cta: 'See Label plans',
    tier: 'label'
  }
};
```

---

## 2.9 localStorage keys for tier gate state

| Key | Value | Purpose |
|---|---|---|
| `able_tier` | `"free"` / `"artist"` / `"artist-pro"` / `"label"` | Current artist tier |
| `fan_warn_80_100` | `"1"` | 80% toast shown for 100-fan limit |
| `fan_warn_95_100` | `"1"` | 95% banner shown for 100-fan limit |
| `fan_warn_80_2000` | `"1"` | 80% toast shown for 2000-fan limit |
| `fan_warn_95_2000` | `"1"` | 95% banner shown for 2000-fan limit |

All keys will map 1:1 to Supabase fields when backend lands. Do not rename them.
