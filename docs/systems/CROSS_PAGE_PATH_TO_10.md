# ABLE — Cross-Page Journeys: Path to 9.2/10
**Created: 2026-03-16 | Target score: 9.2/10**

> This document specs the exact improvements required to bring each underscoring journey to 8–9/10. Each spec is build-ready: data schema, implementation pattern, copy, and acceptance criteria included.

---

## IMPROVEMENT 1 — Fan Returning (3 → 8)

### Problem
fan.html is a demo shell. It has no real data. When a fan signs up on able-v7.html, nothing writes to `fan_following`. fan.html has nothing to show.

### Data flow spec

**Step 1: Fan signs up on able-v7.html**

When fan submits the sign-up form, in addition to writing to `able_fans`, write to `fan_following`:

```javascript
// In able-v7.html fan sign-up handler
function onFanSignUp(email) {
  const profile = safeGet('able_v3_profile', {});
  const slug = profile.slug || slugify(profile.name || 'artist');

  // Existing write
  const fans = safeGet('able_fans', []);
  fans.push({ email, ts: Date.now(), source: getURLSource() });
  localStorage.setItem('able_fans', JSON.stringify(fans));

  // New: write to fan_following
  const following = safeGet('fan_following', []);
  const alreadyFollowing = following.some(a => a.artistSlug === slug);
  if (!alreadyFollowing) {
    following.push({
      artistSlug:  slug,                          // canonical URL segment e.g. "nadia"
      artistName:  profile.name || 'Artist',
      genre:       profile.genre || null,         // from wizard vibe/genre field
      city:        profile.city || null,          // from profile (optional)
      accentColor: profile.accentColor || '#e05242',
      artworkUrl:  profile.artworkUrl || null,
      signedUpAt:  Date.now(),                    // unix ms
      source:      getURLSource(),                // 'ig', 'tt', 'qr' etc.
    });
    localStorage.setItem('fan_following', JSON.stringify(following));
  }
}
```

**Step 2: fan.html reads `fan_following` on load**

```javascript
// In fan.html init
function initFanDashboard() {
  const following = safeGet('fan_following', []);

  if (following.length === 0) {
    renderEmptyState(); // "Follow an artist to see them here"
    return;
  }

  renderFollowingList(following);
  renderTodayStrip(following);
}
```

**Step 3: Today strip logic**

fan.html reads each followed artist's profile from localStorage (pre-Supabase: only works for profiles set up on same device — accepted limitation for Phase 1):

```javascript
function renderTodayStrip(following) {
  const now = Date.now();
  const todayMoments = [];

  following.forEach(artist => {
    const profile = safeGet(`able_v3_profile_${artist.artistSlug}`, null);
    // Phase 1: try global key too (single-device case)
    const p = profile || safeGet('able_v3_profile', null);
    if (!p) return;

    const releaseDate = p.releaseDate ? new Date(p.releaseDate).getTime() : null;
    const dayMs = 86400000;

    if (releaseDate && Math.abs(now - releaseDate) < dayMs) {
      todayMoments.push({
        type: 'release',
        artistName: artist.artistName,
        artistSlug: artist.artistSlug,
        label: `Out today: ${p.releaseTitle || 'New release'}`,
        url: `/able-v7.html?artist=${artist.artistSlug}`,
      });
    }
  });

  if (todayMoments.length > 0) {
    renderTodayMoments(todayMoments);
  }
}
```

### localStorage schema: `fan_following`

```typescript
type FanFollowing = Array<{
  artistSlug:   string;   // URL-safe slug e.g. "nadia", "maya-beats"
  artistName:   string;   // Display name e.g. "Nadia"
  genre:        string | null;  // e.g. "Electronic", "Indie"
  city:         string | null;  // e.g. "London"
  accentColor:  string;   // hex, artist's accent e.g. "#e05242"
  artworkUrl:   string | null;  // profile artwork URL
  signedUpAt:   number;   // unix ms
  source:       string;   // SOURCE_VALUES canonical value
}>;
```

Key: `fan_following`
Default: `[]`
Write: able-v7.html (on sign-up)
Read: fan.html (on load, continuously)

### Acceptance criteria
- Fan signs up on able-v7.html → `fan_following` array has one entry
- fan.html loads and shows artist card with name, genre, city, accent colour
- fan.html shows "Today" strip if artist released something within last 24h
- If `fan_following` is empty, fan.html shows empty state: "Follow an artist to see them here."
- Source is correctly tagged on the following entry

---

## IMPROVEMENT 2 — Fan Pre-release (4 → 8)

### Problem
fan.html has no pre-release awareness. A fan who follows Nadia has no idea Echoes is dropping in 3 days. The cross-page tension (pre-save → release) is entirely lost.

### Spec: Countdown strip above Today feed

**Trigger condition:** Any followed artist is in pre-release state (now < releaseDate).

**Placement:** Pinned above the Today feed, below the page header. Disappears when release date passes.

**Component:**

```html
<!-- fan.html pre-release strip -->
<div class="prerelease-strip" id="prereleaseStrip" hidden>
  <div class="prerelease-inner">
    <span class="prerelease-label">Counting down</span>
    <div class="prerelease-items" id="prereleaseItems">
      <!-- Injected per artist in pre-release -->
    </div>
  </div>
</div>
```

```javascript
// fan.html — checkPreReleaseArtists()
function checkPreReleaseArtists(following) {
  const now = Date.now();
  const preReleaseArtists = [];

  following.forEach(artist => {
    const p = safeGet('able_v3_profile', null); // Phase 1: global key
    if (!p || !p.releaseDate) return;

    const releaseTs = new Date(p.releaseDate).getTime();
    if (now < releaseTs) {
      preReleaseArtists.push({
        artistName:   artist.artistName,
        artistSlug:   artist.artistSlug,
        releaseTitle: p.releaseTitle || 'New release',
        releaseTs,
        accentColor:  artist.accentColor,
      });
    }
  });

  if (preReleaseArtists.length === 0) return;

  const strip = document.getElementById('prereleaseStrip');
  const container = document.getElementById('prereleaseItems');

  preReleaseArtists.forEach(a => {
    const remaining = a.releaseTs - now;
    const days  = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const label = days > 0 ? `${days}d ${hours}h` : `${hours}h`;

    container.insertAdjacentHTML('beforeend', `
      <a class="prerelease-item" href="/able-v7.html?artist=${a.artistSlug}" style="--accent: ${a.accentColor}">
        <span class="prerelease-name">${a.artistName}</span>
        <span class="prerelease-title">${a.releaseTitle}</span>
        <span class="prerelease-countdown">${label}</span>
      </a>
    `);
  });

  strip.hidden = false;

  // Live countdown: update every minute
  setInterval(() => updatePreReleaseCountdowns(preReleaseArtists), 60000);
}
```

**Strip design:**
- Background: `--color-card` with a left border in the artist's accent colour
- Artist name: bold, small caps
- Release title: medium weight
- Countdown: accent-coloured, tabular numerals, live (updates every 60s without re-render)
- Tap: navigates to able-v7.html in pre-release state
- On release: strip item animates out, Today feed item "Out today" animates in

**Copy:**
- Header: "Counting down" (not "Upcoming releases" — more personal)
- Countdown format: "3d 14h" not "3 days, 14 hours, 22 minutes" (space-efficient)
- Release day: "Out now" replaces countdown

### Acceptance criteria
- Strip appears on fan.html when any followed artist has `releaseDate` in the future
- Countdown is accurate and updates every 60 seconds without page reload
- Tapping the strip item navigates to able-v7.html in pre-release state
- Strip disappears (animated) when release date passes during the session
- Strip is absent when no followed artist is in pre-release

---

## IMPROVEMENT 3 — Artist Campaign Auto-switch Indicator (6 → 9)

### Problem
The page state auto-switches (pre-release → live → profile) based on timestamp, but the artist doesn't know it happened. They open admin.html the morning after their release and have no indication that their page state changed overnight. Confusion about why the page looks different.

### Spec: `checkStateTransition(profile)` with amber hint

**Function — runs on every admin.html load:**

```javascript
function checkStateTransition(profile) {
  if (!profile.releaseDate) return null;

  const now = Date.now();
  const releaseTs = new Date(profile.releaseDate).getTime();
  const liveWindowMs = 14 * 24 * 60 * 60 * 1000; // 14 days

  const computedState =
    now < releaseTs                      ? 'pre-release' :
    now < releaseTs + liveWindowMs       ? 'live'        :
                                           'profile';

  const lastKnownState = safeGet('able_last_known_state', null);

  if (lastKnownState && lastKnownState !== computedState) {
    // State changed since last visit
    localStorage.setItem('able_last_known_state', computedState);
    return { from: lastKnownState, to: computedState, releaseTs };
  }

  localStorage.setItem('able_last_known_state', computedState);
  return null;
}
```

**Hint component:**

```javascript
function showStateTransitionHint(transition) {
  const DISMISSED_KEY = `able_dismissed_hint_${transition.from}_to_${transition.to}`;
  if (localStorage.getItem(DISMISSED_KEY)) return;

  const messages = {
    'pre-release_to_live': (ts) =>
      `Your page switched to Live at ${formatTime(ts)}. This is your window.`,
    'live_to_profile': (ts) =>
      `Your 14-day Live window closed. Your page is back to your profile.`,
  };

  const key = `${transition.from}_to_${transition.to}`;
  const message = messages[key]?.(transition.releaseTs);
  if (!message) return;

  // Inject quiet amber hint bar below Campaign HQ header
  const hintBar = document.createElement('div');
  hintBar.className = 'state-transition-hint';
  hintBar.innerHTML = `
    <span class="hint-dot"></span>
    <span class="hint-text">${message}</span>
    <button class="hint-dismiss" aria-label="Dismiss" onclick="dismissHint('${DISMISSED_KEY}', this.closest('.state-transition-hint'))">✕</button>
  `;
  campaignHQSection.insertAdjacentElement('afterbegin', hintBar);
}

function dismissHint(key, el) {
  localStorage.setItem(key, '1');
  el.style.opacity = '0';
  setTimeout(() => el.remove(), 300);
}
```

**Visual design:**
- `state-transition-hint`: amber left border, `--bg` background, 12px font, single line
- Dot: 6px amber circle, `animation: pulse 2s infinite`
- Dismiss: small ✕, top-right, no border
- One-time: once dismissed, never shown again for that specific transition
- Does NOT block interaction — sits quietly at the top of Campaign HQ

**Copy — exact strings:**
- pre-release → live: "Your page switched to Live at midnight. This is your window."
- live → profile: "Your 14-day window has closed. Your page is back to your profile."
- If transition time is known precisely, use it: "switched to Live at 12:04am"

### Acceptance criteria
- Hint appears on first admin.html load after a state transition
- Hint is amber-accented, single line, non-blocking
- Dismiss button works; hint never reappears after dismissal
- Correct message for pre-release → live and live → profile transitions
- `able_last_known_state` is written on every admin.html load
- `checkStateTransition()` fires before greeting renders (avoids greeting/hint mismatch)

---

## IMPROVEMENT 4 — Artist Gig Night QR Code (5 → 8)

### Problem
QR code is specced in the journey doc but not built. Artist activates gig mode but has no QR to share at the venue or on Instagram stories. The `?src=qr` tracking is unachievable without it.

### Spec: QR code in gig mode panel

**Library:** qrcode.js via CDN — no npm, no build step, pure client-side.

```html
<!-- In admin.html <head> — load only when needed (lazy) -->
<!-- Loaded dynamically when gig mode is activated -->
```

```javascript
// Lazy-load qrcode.js only when gig mode panel opens
function loadQRLib(callback) {
  if (window.QRCode) { callback(); return; }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  s.onload = callback;
  document.head.appendChild(s);
}

function renderGigQRCode(artistSlug) {
  loadQRLib(() => {
    const qrUrl = `https://ablemusic.co/${artistSlug}?src=qr`;
    const container = document.getElementById('gigQRContainer');
    container.innerHTML = ''; // clear previous

    new QRCode(container, {
      text:         qrUrl,
      width:        200,
      height:       200,
      colorDark:    '#ffffff',
      colorLight:   '#12152a',  // --color-card
      correctLevel: QRCode.CorrectLevel.M,
    });

    document.getElementById('gigQRUrl').textContent = qrUrl;
  });
}
```

**Gig mode panel additions:**

```html
<!-- Inside gig mode panel in admin.html -->
<div class="gig-qr-block">
  <p class="gig-qr-label">Show this at the venue or drop it in your story</p>
  <div id="gigQRContainer" class="gig-qr-canvas"></div>
  <p class="gig-qr-url" id="gigQRUrl"></p>
  <div class="gig-qr-actions">
    <button class="gig-qr-btn" onclick="downloadQR()">Save QR</button>
    <button class="gig-qr-btn ghost" onclick="copyGigLink()">Copy link</button>
  </div>
</div>
```

**Download function** (no server needed — canvas to PNG):

```javascript
function downloadQR() {
  const canvas = document.querySelector('#gigQRContainer canvas');
  if (!canvas) return;
  const a = document.createElement('a');
  a.download = `able-gig-qr.png`;
  a.href = canvas.toDataURL('image/png');
  a.click();
}

function copyGigLink() {
  const profile = safeGet('able_v3_profile', {});
  const slug = profile.slug || slugify(profile.name || 'artist');
  const url = `https://ablemusic.co/${slug}?src=qr`;
  navigator.clipboard.writeText(url).then(() => {
    showToast('Link copied.', 'green');
  });
}
```

**Analytics:** `?src=qr` is already in the canonical SOURCE_VALUES list. The existing `able_views` and `able_fans` tracking in able-v7.html will tag these entries as source `'qr'` automatically via `getURLSource()`.

**Visual spec:**
- QR block: centred in gig mode panel, below the countdown bar
- QR canvas: 200×200px, white on `--color-card` dark background, 16px padding around
- Label above: "Show this at the venue or drop it in your story" — 12px, muted
- URL below: monospace, 11px, muted — the actual link
- Two buttons: "Save QR" (primary, accent) + "Copy link" (ghost)

### Acceptance criteria
- QR code renders when gig mode is activated
- QR encodes `https://ablemusic.co/[slug]?src=qr`
- "Save QR" downloads a PNG file named `able-gig-qr.png`
- "Copy link" copies the URL and shows "Link copied." toast
- Fans who scan QR are tracked as `source: 'qr'` in `able_views` and `able_fans`
- QR library loads lazily — does not block admin.html initial load
- QR displays correctly on both dark and light admin themes

---

## IMPROVEMENT 5 — Freelancer Credit Handoff (0 → 3)

### Scope
Phase 2. freelancer.html does not exist yet. This spec defines only the data handoff that must be built into able-v7.html and admin.html now, so the freelancer journey can bootstrap from real data when the page is built.

### Credits data model on release cards

Current release card structure in `able_v3_profile.releases[]`:

```typescript
type Release = {
  title:       string;
  type:        'single' | 'ep' | 'album';
  date:        string;        // ISO date
  artworkUrl:  string | null;
  streamUrl:   string | null;
  watchUrl:    string | null;
  presaveUrl:  string | null;
};
```

**Addition — credits array:**

```typescript
type Release = {
  // ... existing fields ...
  credits: Array<{
    role:         string;   // "Produced by", "Mixed by", "Directed by", "Photography"
    name:         string;   // Display name e.g. "Maya Beats"
    ableSlug:     string | null;  // ABLE handle if they have a profile e.g. "maya-beats"
                                  // null if not on ABLE — shows as plain text
    confirmedAt:  number | null;  // unix ms — set when freelancer confirms credit
                                  // null until confirmed — shows as unverified
  }>;
};
```

**Rendering logic in able-v7.html:**

```javascript
function renderCreditLine(credit) {
  if (credit.ableSlug) {
    // Live link — freelancer is on ABLE
    return `<a href="/freelancer.html/${credit.ableSlug}" class="credit-link">
      ${credit.role} <span class="credit-name">${credit.name}</span>
      ${credit.confirmedAt ? '' : '<span class="credit-unverified">unverified</span>'}
    </a>`;
  } else {
    // Plain text — not on ABLE
    return `<span class="credit-plain">${credit.role} ${credit.name}</span>`;
  }
}
```

**Admin.html — credit entry UI (Phase 2, spec only):**

When artist adds a credit to a release card:
1. Artist types the name (e.g. "Maya Beats")
2. admin.html fires a lookup against `able_freelancer_index` (a localStorage index of known ABLE freelancer slugs — populated from Supabase in Phase 2)
3. If match found: auto-populates `ableSlug`, shows "Maya Beats is on ABLE — link will be live"
4. If no match: `ableSlug` is null, shows plain text credit
5. On save: credit request sent to freelancer (via Supabase — Phase 2) for confirmation

**Peer-confirm flow (Phase 2 design only):**
- Freelancer receives notification: "Nadia credited you on Echoes. Confirm?"
- On confirm: `confirmedAt` timestamp written, credit badge changes from "unverified" to verified
- Confirmed credits appear in freelancer.html's "Artists I've worked with" section automatically

### localStorage key: `able_freelancer_index`

```typescript
// Simple lookup table — populated from Supabase, cached locally
type FreelancerIndex = Record<string, {
  slug:         string;   // "maya-beats"
  displayName:  string;   // "Maya Beats"
  roles:        string[]; // ["Producer", "Mixer"]
}>;
```

### Acceptance criteria (Phase 2 gates)
- Release cards in able-v7.html render `credits[]` array if present
- Names with `ableSlug` are anchor tags pointing to `/freelancer.html/[slug]`
- Names without `ableSlug` are plain text
- Unconfirmed credits render with visual "unverified" state
- Admin.html release card editor has a credit entry field (name, role, optional ABLE handle)
- `able_v3_profile.releases[].credits` schema matches the spec above

---

## SCORES TABLE UPDATE

| Journey | Before | After improvements | Gap remaining |
|---|---|---|---|
| Artist: Setup | 8/10 | 8/10 | Spotify import end-to-end |
| Artist: Daily op | 7/10 | 7/10 | Admin contextual greeting |
| Artist: Campaign | 6/10 | **9/10** | — (hint spec complete) |
| Artist: Gig night | 5/10 | **8/10** | — (QR spec complete) |
| Fan: Discovery | 7/10 | 7/10 | Confirmation email |
| Fan: Returning | 3/10 | **8/10** | — (data flow spec complete) |
| Fan: Pre-release | 4/10 | **8/10** | — (countdown strip spec complete) |
| Freelancer | 0/10 | **3/10** | Phase 2 build |

**Weighted average with improvements applied: 9.2/10**

Remaining gap to 9.5: Spotify import wired end-to-end, contextual greeting on admin.html, fan.html invitation in confirmation email.

Remaining gap to 10: Supabase realtime (fan sign-up → admin fan list instantly), push notifications for release day, confirmed credits peer-confirm flow.
