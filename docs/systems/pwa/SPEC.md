# ABLE — PWA / Installability: Spec
**Created: 2026-03-16**

> Complete implementation spec for ABLE's PWA infrastructure. All files are static — no build pipeline needed. Implements for fan.html first (primary beneficiary), then able-v7.html.

---

## FILE 1 — manifest.json

**Location:** `/manifest.json` (project root)
**Linked from:** fan.html (primary), able-v7.html, landing.html

```json
{
  "name": "ABLE",
  "short_name": "ABLE",
  "description": "Your artists. All in one place.",
  "start_url": "/fan.html",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#0d0e1a",
  "theme_color": "#0d0e1a",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "categories": ["music", "entertainment"],
  "screenshots": [
    {
      "src": "/screenshots/fan-home.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ]
}
```

**Notes:**
- `start_url: "/fan.html"` — the fan dashboard is the install destination, not the root
- `purpose: "any maskable"` — required for Android adaptive icons (safe zone spec: 80% circle)
- `background_color` and `theme_color` both set to Midnight Navy — consistent with ABLE design system
- `screenshots` is optional but improves the install prompt on Chrome Android
- Icons directory `/icons/` needs to be created with 192px and 512px PNG files

**`<link>` tag** (in `<head>` of fan.html, able-v7.html, landing.html):
```html
<link rel="manifest" href="/manifest.json">
```

---

## FILE 2 — iOS meta tags

**Location:** In `<head>` of fan.html (required). Optionally in able-v7.html.

```html
<!-- PWA: iOS standalone mode -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ABLE">
<link rel="apple-touch-icon" href="/icons/icon-192.png">

<!-- PWA: Web manifest (already covered above) -->
<link rel="manifest" href="/manifest.json">

<!-- Theme colour (also for Android Chrome toolbar) -->
<meta name="theme-color" content="#0d0e1a">
```

**`black-translucent` status bar:** The page content extends behind the status bar. Requires top padding on the page body to avoid content hiding behind the clock/battery icons. In fan.html, add:

```css
/* Accounts for iOS status bar in standalone mode */
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: env(safe-area-inset-top);
  }
}
```

**Why `black-translucent`:** fan.html and able-v7.html have a dark `#0d0e1a` background. Translucent status bar looks intentional — the dark page bleeds through. The alternative `black` (opaque black bar) looks like a separate element stuck on top of the design.

---

## FILE 3 — sw.js (Service Worker)

**Location:** `/sw.js` (project root — service workers are scoped to their directory)

```javascript
/**
 * ABLE Service Worker
 * Strategy:
 *   - Cache-first: static assets (CSS, fonts, icons)
 *   - Network-first: HTML pages (always get latest content)
 *   - Offline fallback: /fan.html (cached on install)
 *
 * Version bump CACHE_VERSION to invalidate all caches on deploy.
 */

const CACHE_VERSION = 'able-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE   = `${CACHE_VERSION}-pages`;

// Assets to pre-cache on service worker install
const PRECACHE_ASSETS = [
  '/fan.html',
  '/able-v7.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Fonts — loaded from Google Fonts CDN, cache at runtime
  // CSS — inline in HTML pages, no separate fetch needed
];

// ---- Install ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// ---- Activate ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map(key => caches.delete(key)) // remove old cache versions
      )
    ).then(() => self.clients.claim()) // take control of all clients immediately
  );
});

// ---- Fetch ----
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // HTML pages: network-first (always try to get latest)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Static assets: cache-first
  event.respondWith(cacheFirst(request));
});

// Network-first: try network, fall back to cache, fall back to offline page
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(PAGE_CACHE);
    cache.put(request, networkResponse.clone()); // update cache
    return networkResponse;
  } catch (err) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    // Last resort: serve fan.html as offline fallback for any HTML request
    const fallback = await caches.match('/fan.html');
    if (fallback) {
      // Fan.html will show offline state via navigator.onLine check
      return fallback;
    }

    // No cache at all — return a minimal offline response
    return new Response('<h1>No connection</h1>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Cache-first: serve from cache, fetch and update if not in cache
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    // Silently fail for non-critical assets (icons, fonts)
    return new Response('', { status: 408 });
  }
}
```

**Registration** (in fan.html `<script>`, before closing `</body>`):

```javascript
// Register service worker (fan.html + able-v7.html)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('[ABLE] SW registered:', reg.scope))
      .catch(err => console.warn('[ABLE] SW registration failed:', err));
  });
}
```

**Cache versioning:** When deploying updates, bump `CACHE_VERSION` from `'able-v1'` to `'able-v2'`. The activate handler deletes all caches not matching the current version. Users get fresh content on next visit.

---

## FILE 4 — Add to home screen prompt (fan.html only)

Fans are the install audience, not artists. The prompt should appear on fan.html only, after the fan has visited 3 times — enough to establish that they're a returning user, not a passerby.

```javascript
// fan.html — Add to Home Screen prompt
// Runs after page init, not blocking

let deferredInstallPrompt = null;

// Capture the browser's native install prompt
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); // prevent auto-showing
  deferredInstallPrompt = event;
  maybeShowInstallHint();
});

function maybeShowInstallHint() {
  // Check visit count
  const visits = parseInt(localStorage.getItem('able_fan_visits') || '0');
  const newCount = visits + 1;
  localStorage.setItem('able_fan_visits', newCount);

  const dismissed = localStorage.getItem('able_pwa_prompt_dismissed');
  const installed = localStorage.getItem('able_pwa_installed');

  // Show on 3rd visit onwards, if not dismissed, not already installed
  if (newCount >= 3 && !dismissed && !installed && deferredInstallPrompt) {
    setTimeout(showInstallHint, 2000); // short delay — page settles first
  }
}

function showInstallHint() {
  const hint = document.createElement('div');
  hint.id = 'ableInstallHint';
  hint.className = 'install-hint';
  hint.setAttribute('role', 'complementary');
  hint.innerHTML = `
    <div class="install-hint-inner">
      <img src="/icons/icon-192.png" alt="ABLE" class="install-hint-icon" width="40" height="40">
      <div class="install-hint-text">
        <strong>Add ABLE to your home screen</strong>
        <span>Always one tap away.</span>
      </div>
      <div class="install-hint-actions">
        <button class="install-hint-btn" onclick="triggerInstall()">Add</button>
        <button class="install-hint-dismiss" onclick="dismissInstallHint()" aria-label="Not now">✕</button>
      </div>
    </div>
  `;
  document.body.appendChild(hint);

  // Slide in from bottom
  requestAnimationFrame(() => hint.classList.add('install-hint--visible'));
}

async function triggerInstall() {
  if (!deferredInstallPrompt) return;

  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;

  if (outcome === 'accepted') {
    localStorage.setItem('able_pwa_installed', '1');
    showToast('ABLE added to your home screen.', 'green');
  }

  deferredInstallPrompt = null;
  document.getElementById('ableInstallHint')?.remove();
}

function dismissInstallHint() {
  localStorage.setItem('able_pwa_prompt_dismissed', '1');
  const hint = document.getElementById('ableInstallHint');
  hint?.classList.remove('install-hint--visible');
  setTimeout(() => hint?.remove(), 300);
}

// Listen for install (covers cases where user installs via browser menu)
window.addEventListener('appinstalled', () => {
  localStorage.setItem('able_pwa_installed', '1');
  document.getElementById('ableInstallHint')?.remove();
});
```

**CSS for install hint (fan.html):**
```css
.install-hint {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  background: var(--color-card, #12152a);
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 12px 16px;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 800;
}
.install-hint--visible { transform: translateY(0); }
.install-hint-inner { display: flex; align-items: center; gap: 12px; max-width: 480px; margin: 0 auto; }
.install-hint-icon { border-radius: 10px; flex-shrink: 0; }
.install-hint-text { flex: 1; }
.install-hint-text strong { display: block; font-size: 14px; font-weight: 600; }
.install-hint-text span { font-size: 12px; opacity: 0.6; }
.install-hint-actions { display: flex; align-items: center; gap: 8px; }
.install-hint-btn {
  background: var(--color-accent, #e05242);
  color: white;
  border: none; border-radius: 20px;
  padding: 8px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
  white-space: nowrap;
}
.install-hint-dismiss {
  background: none; border: none; color: rgba(255,255,255,0.4);
  cursor: pointer; font-size: 16px; padding: 4px;
}
```

**iOS note:** `beforeinstallprompt` does not fire on iOS Safari. iOS users must use the Share sheet → "Add to Home Screen". For iOS, show a different hint:

```javascript
// iOS-specific hint (shows after 3 visits, once only)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isInStandaloneMode = window.navigator.standalone === true;

if (isIOS && !isInStandaloneMode) {
  const visits = parseInt(localStorage.getItem('able_fan_visits') || '0');
  if (visits >= 3 && !localStorage.getItem('able_pwa_prompt_dismissed')) {
    showIOSInstallHint();
  }
}

function showIOSInstallHint() {
  // Same hint component, different copy
  // Shows share icon + "Add to Home Screen" instruction
  // Copy: "Tap ⎙ then 'Add to Home Screen' to keep ABLE one tap away."
}
```

---

## Offline indicator for fan.html

When fan.html loads offline (served from service worker cache), show a quiet, non-blocking indicator:

```javascript
// fan.html — offline state indicator
function initOfflineIndicator() {
  if (!navigator.onLine) {
    showOfflineBanner();
  }
  window.addEventListener('offline', showOfflineBanner);
  window.addEventListener('online', hideOfflineBanner);
}

function showOfflineBanner() {
  const banner = document.getElementById('offlineBanner');
  if (banner) { banner.hidden = false; return; }

  const el = document.createElement('div');
  el.id = 'offlineBanner';
  el.className = 'offline-banner';
  el.innerHTML = `
    <span>No connection — showing your last update.</span>
  `;
  document.body.prepend(el);
}

function hideOfflineBanner() {
  const banner = document.getElementById('offlineBanner');
  if (banner) {
    banner.style.opacity = '0';
    setTimeout(() => banner.remove(), 300);
  }
}
```

```css
.offline-banner {
  background: rgba(244,185,66,0.1);
  border-bottom: 1px solid rgba(244,185,66,0.2);
  color: #f4b942;
  font-size: 12px;
  text-align: center;
  padding: 6px 16px;
}
```
