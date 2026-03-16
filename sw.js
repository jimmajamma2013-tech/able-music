/**
 * ABLE Service Worker
 * Strategy:
 *   - Cache-first: static assets (icons)
 *   - Network-first: HTML pages (always get latest content)
 *   - Offline fallback: /fan.html (cached on install)
 *
 * Bump CACHE_VERSION to invalidate all caches on deploy.
 */

const CACHE_VERSION = 'able-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const PAGE_CACHE   = `${CACHE_VERSION}-pages`;

const PRECACHE_ASSETS = [
  '/fan.html',
  '/able-v7.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// ---- Install ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ---- Activate ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ---- Fetch ----
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // HTML pages: network-first
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Static assets: cache-first
  event.respondWith(cacheFirst(request));
});

async function networkFirstWithFallback(request) {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(PAGE_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const fallback = await caches.match('/fan.html');
    if (fallback) return fallback;
    return new Response('<h1>No connection</h1>', { headers: { 'Content-Type': 'text/html' } });
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    return new Response('', { status: 408 });
  }
}
