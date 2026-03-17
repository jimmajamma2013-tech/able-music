# ABLE — Error States: Canonical Spec
**Created: 2026-03-16**

> This is the single source of truth for how ABLE handles every error state. All implementations must follow these patterns. Copy is final — do not substitute generic alternatives.

---

## PATTERN 1 — Safe localStorage reads

Every localStorage read in every ABLE page must use this function. No direct `JSON.parse(localStorage.getItem(...))` calls anywhere.

```javascript
/**
 * safeGet — safe localStorage read with fallback
 * @param {string} key — localStorage key
 * @param {*} fallback — value to return if key is missing or JSON is corrupt
 * @returns parsed value or fallback
 */
function safeGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn(`[ABLE] localStorage parse error for "${key}"`, e);
    return fallback;
  }
}

/**
 * safeSet — safe localStorage write
 * @param {string} key
 * @param {*} value — will be JSON.stringify'd
 * @returns boolean — false if write failed (storage full etc.)
 */
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    if (e.name === 'QuotaExceededError') {
      showToast('Your device is running low on storage. Time to sync your data.', 'amber', {
        action: { label: 'Learn more', href: '/docs/sync' }
      });
    } else {
      console.error(`[ABLE] localStorage write error for "${key}"`, e);
    }
    return false;
  }
}
```

**Usage:**
```javascript
// Before
const profile = JSON.parse(localStorage.getItem('able_v3_profile')) || {};

// After
const profile = safeGet('able_v3_profile', {});
```

All pages: able-v7.html, admin.html, start.html, fan.html, landing.html.

---

## PATTERN 2 — Network status

Applies to: admin.html (primary), start.html (Spotify import context).
Does NOT apply to: able-v7.html profile page (fan experience — stay silent, page works offline).

```javascript
// Admin and start.html: quiet amber banner on disconnect
window.addEventListener('offline', () => {
  showToast('No connection — your changes will save when you\'re back online.', 'amber');
});

window.addEventListener('online', () => {
  showToast('Back online.', 'green');
});

// Check on page load too — user may already be offline
if (!navigator.onLine) {
  showToast('No connection — working offline.', 'amber');
}
```

**Toast component spec:**
```javascript
/**
 * showToast — renders a non-blocking notification bar
 * @param {string} message
 * @param {'green'|'amber'|'red'} tone
 * @param {{ action?: { label: string, href: string } }} options
 */
function showToast(message, tone = 'amber', options = {}) {
  const existing = document.getElementById('ableToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'ableToast';
  toast.className = `able-toast able-toast--${tone}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');

  toast.innerHTML = `
    <span class="toast-dot"></span>
    <span class="toast-message">${message}</span>
    ${options.action ? `<a class="toast-action" href="${options.action.href}">${options.action.label}</a>` : ''}
    <button class="toast-close" onclick="document.getElementById('ableToast').remove()" aria-label="Dismiss">✕</button>
  `;

  document.body.appendChild(toast);

  // Auto-dismiss after 5s for green, stays for amber/red
  if (tone === 'green') {
    setTimeout(() => toast?.remove(), 5000);
  }
}
```

**CSS tokens:**
```css
.able-toast { position: fixed; top: 0; left: 0; right: 0; z-index: 9999; padding: 10px 16px; display: flex; align-items: center; gap: 8px; font-size: 13px; }
.able-toast--amber { background: rgba(244,185,66,0.12); border-bottom: 1px solid rgba(244,185,66,0.3); color: #f4b942; }
.able-toast--green  { background: rgba(52,199,89,0.12); border-bottom: 1px solid rgba(52,199,89,0.3); color: #34c759; }
.able-toast--red    { background: rgba(255,69,58,0.12); border-bottom: 1px solid rgba(255,69,58,0.3); color: #ff453a; }
.toast-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
.toast-message { flex: 1; }
.toast-action { color: currentColor; text-decoration: underline; margin-left: 4px; }
.toast-close { background: none; border: none; color: currentColor; cursor: pointer; opacity: 0.6; padding: 0; margin-left: 4px; }
```

---

## PATTERN 3 — Image fallback with initials avatar

Every `<img>` that loads from an external URL must have an `onerror` handler. The fallback is an initials avatar — first letter of the artist name, rendered as an SVG on the artist's accent colour.

```javascript
/**
 * generateInitialsAvatarSVG — creates an inline SVG data URI
 * @param {string} name — artist name
 * @param {string} accentColor — hex colour e.g. "#e05242"
 * @returns string — data URI safe to use as img src
 */
function generateInitialsAvatarSVG(name, accentColor = '#e05242') {
  const initial = (name || 'A').charAt(0).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" fill="${accentColor}"/>
    <text x="100" y="100" font-family="DM Sans, sans-serif" font-size="88" font-weight="700"
          fill="white" text-anchor="middle" dominant-baseline="central">${initial}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
```

**Usage in HTML:**
```html
<!-- able-v7.html artwork image -->
<img
  id="artistArtwork"
  src=""
  alt="Artist artwork"
  onerror="this.src = generateInitialsAvatarSVG(
    safeGet('able_v3_profile', {}).name,
    safeGet('able_v3_profile', {}).accentColor
  ); this.onerror = null;"
>
```

**Usage in JavaScript (for dynamically created images):**
```javascript
function createArtworkImg(src, name, accent) {
  const img = document.createElement('img');
  img.src = src || generateInitialsAvatarSVG(name, accent);
  img.onerror = () => {
    img.src = generateInitialsAvatarSVG(name, accent);
    img.onerror = null; // prevent infinite loop
  };
  return img;
}
```

The `this.onerror = null` guard is non-negotiable — prevents infinite error loop if the SVG data URI itself somehow fails.

---

## PATTERN 4 — Spotify import failure states

All five failure modes must be handled. Error is shown inline, directly below the Spotify URL input field. Always includes a "Skip and continue" escape.

```javascript
async function importFromSpotify(rawUrl) {
  const input = document.getElementById('spotifyUrlInput');
  const errorEl = document.getElementById('spotifyImportError');
  const skipBtn = document.getElementById('spotifySkipBtn');

  // Clear previous error
  errorEl.textContent = '';
  errorEl.hidden = true;

  // Validate URL format before firing network request
  const SPOTIFY_ARTIST_PATTERN = /open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
  const match = rawUrl.match(SPOTIFY_ARTIST_PATTERN);

  if (!match) {
    showImportError("That doesn't look like a Spotify artist page. Paste the URL from the artist's Spotify page.");
    return;
  }

  if (!navigator.onLine) {
    showImportError("No connection — skip for now and fill in your details manually.");
    return;
  }

  setImportLoading(true);

  try {
    const artistId = match[1];
    const data = await fetchSpotifyArtist(artistId); // throws on non-2xx
    populateFromSpotify(data);
    setImportLoading(false);

  } catch (err) {
    setImportLoading(false);

    if (err.status === 404) {
      showImportError("Couldn't find that artist. Double-check the URL, or skip and fill in manually.");
    } else if (err.status === 429) {
      showImportError("Spotify is busy right now. Try again in a moment, or skip and fill in manually.");
    } else if (err.status === 401 || err.status === 403) {
      showImportError("Spotify import isn't available right now. Fill in your details manually.");
    } else if (!navigator.onLine || err.name === 'TypeError') {
      showImportError("No connection — skip for now and fill in manually.");
    } else {
      showImportError("Spotify import failed. Fill in your details manually.");
    }
  }
}

function showImportError(message) {
  const errorEl = document.getElementById('spotifyImportError');
  errorEl.textContent = message;
  errorEl.hidden = false;
  document.getElementById('spotifySkipBtn').hidden = false; // always show Skip on error
}
```

**Inline error element (start.html):**
```html
<p id="spotifyImportError" class="field-error" hidden aria-live="polite"></p>
<button id="spotifySkipBtn" class="link-btn" hidden onclick="skipSpotifyImport()">
  Skip and fill in manually
</button>
```

---

## PATTERN 5 — Form validation copy

### Fan sign-up (able-v7.html)

```javascript
function validateFanSignUp(email) {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !email.trim()) {
    return { valid: false, message: "Drop your email here and I'll keep you close." };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { valid: false, message: "That doesn't look right — try a different email?" };
  }

  const fans = safeGet('able_fans', []);
  const alreadySignedUp = fans.some(f => f.email.toLowerCase() === email.trim().toLowerCase());
  if (alreadySignedUp) {
    return { valid: false, message: "You're already on the list.", tone: 'reassurance' };
  }

  return { valid: true };
}
```

Copy is written in the artist's voice (first person for the profile page):
- Empty: "Drop your email here and I'll keep you close."
- Bad format: "That doesn't look right — try a different email?"
- Duplicate: "You're already on the list." (reassurance, not an error — render in green)

### Wizard inputs (start.html)

| Field | Empty error | Format error |
|---|---|---|
| Artist name | "What should we call you?" | — |
| Spotify URL | "Paste your Spotify artist URL, or skip." | "That doesn't look like a Spotify artist URL." |
| Release title | "What are you releasing?" | — |
| Release date | "When is it dropping?" | "That date is in the past — is that right?" |

---

## CANONICAL ERROR COPY REFERENCE

### By context

| Context | Tone | Copy |
|---|---|---|
| Network offline (admin.html) | Amber toast | "No connection — your changes will save when you're back online." |
| Network offline (start.html) | Amber toast | "No connection — you can still fill in your details." |
| Network back online | Green toast | "Back online." |
| Spotify: bad URL format | Inline, below field | "That doesn't look like a Spotify artist URL." |
| Spotify: 404 | Inline, below field | "Couldn't find that artist. Double-check the URL, or skip and fill in." |
| Spotify: 429 rate limit | Inline, below field | "Spotify is busy right now. Try again in a moment, or skip and fill in manually." |
| Spotify: network error | Inline, below field | "No connection — skip for now and continue." |
| Spotify: other error | Inline, below field | "Spotify import failed. Fill in your details manually." |
| Fan sign-up: empty | Inline, below field | "Drop your email here and I'll keep you close." |
| Fan sign-up: bad format | Inline, below field | "That doesn't look right — try a different email?" |
| Fan sign-up: duplicate | Inline, green (reassurance) | "You're already on the list." |
| Fan sign-up: save failed | Inline, below field | "Something's off — try a different email?" |
| Image load failed | Visual fallback (initials) | No text — initials avatar is self-explanatory |
| localStorage full | Amber toast | "Your device is running low on storage. Time to sync your data." |
| localStorage corrupt (profile) | Amber nudge in admin | "Your profile data may be incomplete. Re-run setup or contact support." |
| Shows load error | Inline in shows section | "Couldn't load your shows. Try refreshing." |
| Empty shows | Empty state (neutral) | "No shows added yet." + "Add a show" action |
| Empty fan list | Empty state (neutral) | "When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way." |

### Voice rules for error copy
- Never: "Something went wrong" without a specific follow-up action
- Never: "Error" as a standalone word (always explain what errored)
- Never: exclamation marks in error messages
- Always: one sentence max
- Always: if there's something the user can do, say it
- Profile page errors: first-person artist voice
- Admin errors: second-person ("your"), warm but direct
- Never blame the user ("invalid input") — frame as the thing being different ("that doesn't look right")

---

## PATTERN 6 — Empty state vs error state CSS

These two states must be visually distinct at all times.

```css
/* Empty state — neutral, no data yet, encouraging */
.state-empty {
  padding: 32px 16px;
  text-align: center;
  color: var(--text-muted, rgba(255,255,255,0.4));
}
.state-empty__icon { font-size: 32px; margin-bottom: 8px; opacity: 0.4; }
.state-empty__text { font-size: 14px; line-height: 1.5; }
.state-empty__action { margin-top: 12px; }

/* Error state — amber indicator, data should be here but isn't */
.state-error {
  padding: 16px;
  border-left: 2px solid #f4b942;
  background: rgba(244,185,66,0.06);
  border-radius: 0 8px 8px 0;
}
.state-error__text { font-size: 13px; color: #f4b942; }
.state-error__action { margin-top: 8px; font-size: 12px; opacity: 0.8; }
```

Rule: `.state-empty` = "you haven't done this yet" / `.state-error` = "this should be here but isn't."
Never use `.state-empty` copy for an `.state-error` condition, and vice versa.
