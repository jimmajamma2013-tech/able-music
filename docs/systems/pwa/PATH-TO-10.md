# ABLE — PWA / Installability: Path to 10
**Created: 2026-03-16 | Updated: 2026-03-16 (session 12) | ~~Current: 2/10~~ Updated: 5/10 (P0 complete) | Spec-complete target: 8.5/10**

> This is a copy-paste implementation guide. Every code block is ready to use. The spec is done — this PATH-TO-10 is the literal checklist to get from 0 to deployed.

---

## P0 — Manifest + iOS meta tags (2 → 5/10)
**Effort: 30 minutes**

These are static file additions. No JavaScript. No service worker. Just files and `<head>` tags.

---

### ✅ P0.1 — Create `site.webmanifest`

**File location:** `/manifest.json` (project root — served at `https://ablemusic.co/manifest.json`)

**Complete JSON — copy-paste ready:**

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
- `theme_color: "#0d0e1a"` — Midnight Navy matches ABLE's dark background
- `display: "standalone"` — no browser chrome when launched from home screen
- `purpose: "any maskable"` — required for Android adaptive icon safe-zone support
- `screenshots` is optional but improves the install prompt on Chrome Android — add when fan-home screenshot is available

**Icons required:**
- Create `/icons/` directory
- Export `able-logo-instagram.svg` as `icon-192.png` (192×192, square, content in 80% safe zone circle)
- Export `able-logo-instagram.svg` as `icon-512.png` (512×512, same rules)
- The icon must work on dark AND light backgrounds (the maskable safe zone is painted in the OS's adaptive colour)

---

### ✅ P0.2 — `<link rel="manifest">` tag

**Add to `<head>` of each file listed:**

```html
<link rel="manifest" href="/manifest.json">
```

Files to add this to: `fan.html`, `able-v7.html`, `landing.html`

---

### ✅ P0.3 — iOS meta tags for Add to Home Screen

**Add to `<head>` of `fan.html` (required) and `able-v7.html` (recommended):**

```html
<!-- PWA: iOS standalone mode -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ABLE">
<link rel="apple-touch-icon" href="/icons/icon-192.png">

<!-- Theme colour (also for Android Chrome toolbar) -->
<meta name="theme-color" content="#0d0e1a">
```

**`black-translucent` status bar:** The page content extends behind the iOS status bar. Add this CSS to `fan.html` to prevent content hiding behind the clock:

```css
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: env(safe-area-inset-top);
  }
}
```

**Why `black-translucent`:** fan.html has a `#0d0e1a` background. The translucent status bar lets the dark page bleed through, making the install look intentional rather than bolted on.

---

**Test P0:**
- Open fan.html in Chrome DevTools → Application → Manifest → confirm parses with no errors, all icon paths resolve
- On real iPhone or iOS Simulator: Safari → Share → "Add to Home Screen" → confirm name shows "ABLE", icon shows ABLE logo (not a screenshot), opens in standalone mode

**Score after P0: 5/10**

---

## P1 — Service worker + add to home screen prompt (5 → 8.5/10)
**Effort: 3–4 hours**

---

### P1.1 — Service worker registration (3 lines)

**Add to the bottom of `fan.html` and `able-v7.html`, before `</body>`:**

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[ABLE] SW registered:', reg.scope))
        .catch(err => console.warn('[ABLE] SW registration failed:', err));
    });
  }
</script>
```

That is the complete registration. Three functional lines.

**Deployment note:** Service workers require HTTPS. They work on `localhost` for development. Any Netlify preview URL uses HTTPS — the service worker will function correctly in preview deploys.

---

### P1.2 — Create `sw.js` (minimal service worker for offline support)

**File location:** `/sw.js` (project root — service workers are scoped to their directory)

**Complete `sw.js` — copy-paste ready:**

```javascript
/**
 * ABLE Service Worker
 *
 * Strategies:
 *   Static assets (icons, manifest): cache-first
 *   HTML pages (fan.html, able-v7.html): network-first, cache fallback
 *   API calls (Netlify functions, Supabase): network-only (pass through)
 *
 * To deploy updates: bump CACHE_VERSION. Activate handler deletes old caches.
 */

const CACHE_VERSION   = 'able-v1';
const STATIC_CACHE    = `${CACHE_VERSION}-static`;
const PAGE_CACHE      = `${CACHE_VERSION}-pages`;

// Pre-cache on install — these are fetched and stored before SW activates
const PRECACHE_ASSETS = [
  '/fan.html',
  '/able-v7.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ---- Install: pre-cache shell ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()) // activate immediately, don't wait for tab close
  );
});

// ---- Activate: delete old cache versions ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim()) // take control of all open tabs immediately
  );
});

// ---- Fetch: routing strategy ----
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only intercept same-origin requests — pass through all external calls
  // (Supabase, Google Fonts, Netlify functions, PostHog) unmodified
  if (url.origin !== self.location.origin) return;

  // Network-only for Netlify function API calls
  if (url.pathname.startsWith('/.netlify/')) return;

  // HTML pages: network-first (always try to get latest content first)
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Everything else (icons, manifest, images): cache-first
  event.respondWith(cacheFirst(request));
});

// Network-first: try network, update cache, fall back to cache or offline page
async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(PAGE_CACHE);
    cache.put(request, networkResponse.clone()); // update cache in background
    return networkResponse;
  } catch (err) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    // Last resort: fan.html as offline fallback for any HTML request
    // fan.html detects navigator.onLine and shows the offline banner
    const fallback = await caches.match('/fan.html');
    if (fallback) return fallback;

    return new Response('<h1 style="font-family:sans-serif;padding:2rem">No connection</h1>', {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// Cache-first: serve from cache if available, else fetch and cache
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    return new Response('', { status: 408, statusText: 'Request Timeout' });
  }
}
```

**To deploy updates:** Change `CACHE_VERSION` from `'able-v1'` to `'able-v2'`. The activate handler automatically deletes old caches. Users receive fresh content on their next visit.

---

### P1.3 — Add to Home Screen prompt (fan.html only)

The install prompt belongs on `fan.html` only. Fans are the install audience. Artists access admin by bookmark — they don't need a prompt.

See SPEC.md File 4 for the complete JavaScript (the `beforeinstallprompt` capture, `maybeShowInstallHint()`, `triggerInstall()`, `dismissInstallHint()`, iOS-specific hint variant) and the full CSS block.

**The trigger condition:** Show after 3 visits, never show again if dismissed or already installed.

---

### P1.4 — Offline indicator in fan.html

See SPEC.md File 4 (offline indicator section) for the complete `initOfflineIndicator()` function and `.offline-banner` CSS.

Call `initOfflineIndicator()` from `fan.html` DOMContentLoaded.

---

**Test P1:**
- Open fan.html in Chrome (served over HTTP, not `file://`)
- DevTools → Application → Service Workers → confirm registered
- Load page, toggle Network to "Offline", reload → page serves from cache (no browser error screen)
- Update `CACHE_VERSION` to `'able-v2'`, reload → old caches cleared, new content served

**Test matrix:**
- [ ] SW registers without errors on fan.html
- [ ] SW registers without errors on able-v7.html
- [ ] Offline reload: fan.html serves from cache
- [ ] Offline reload: able-v7.html serves from cache
- [ ] CACHE_VERSION bump: old caches deleted, new content served
- [ ] After install accepted: "ABLE added to your home screen." toast shown
- [ ] After dismiss: hint never shown again

**Score after P1: 8.5/10**

---

## P2 — Background sync + push notifications (8.5 → 9/10)
**Effort: 6–8 hours | Dependency: Supabase backend (not yet built)**

### P2.1 — Background sync for new releases

Requires Supabase realtime subscription in sw.js or periodic background sync. Do not implement until Supabase is live.

### P2.2 — Push notification opt-in

After fan installs the app, offer push notification opt-in for new releases from followed artists.

**Copy:**
- Opt-in prompt: "Get notified when the artists you follow drop something."
- Notification title: "[Artist Name] just dropped [Release Title]"
- Notification body: "Tap to stream."

**iOS note:** Web Push on iOS requires iOS 16.4+ and the site installed as a PWA. This is why P0 (manifest + iOS meta tags) must come first.

---

## What gets to 10

**10/10 requires:**

1. **Lighthouse PWA audit at 100.** DevTools → Lighthouse → PWA. After P0+P1: target 80+. To reach 100: every check must pass including HTTPS, valid manifest, service worker, maskable icons, installability. One audit pass typically surfaces the remaining gaps.

2. **Tested on real iOS Safari.** Must test on a physical iPhone:
   - Add to Home Screen flow
   - Standalone launch (no browser chrome)
   - Status bar rendering with `black-translucent`
   - iOS-specific install hint (share sheet instruction)
   - Service worker functioning under iOS WebKit

3. **Tested on real Android Chrome.** Install flow, icon, standalone mode, `beforeinstallprompt` timing.

4. **Push notification delivery.** End-to-end: artist publishes release → fan receives push on locked screen within 60 seconds. Requires Supabase + P2.2.

With manifest + service worker implemented: **7/10**
With offline support + install prompt: **8.5/10**
With 60fps on iOS confirmed + Lighthouse 100: **9/10**
With push notifications working end-to-end: **10/10**

---

## Summary table

| Phase | Tasks | Effort | Score gain |
|---|---|---|---|
| P0 | manifest.json + iOS meta tags + icons | 30 min | 2 → 5 |
| P1 | sw.js + service worker registration + install prompt | 3–4 hrs | 5 → 8.5 |
| P2 | Background sync + push opt-in | 6–8 hrs + Supabase | 8.5 → 9 |
| QA | Lighthouse 100 + real iOS + Android testing | 2–3 hrs | 9 → 10 |

**P0 should happen immediately** — it is 30 minutes, requires no JavaScript, and unblocks P1.
