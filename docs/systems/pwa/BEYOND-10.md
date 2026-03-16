# PWA — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the moment a fan adds ABLE to their home screen, opens it on release day, and it feels like an app they paid for — not a website that happened to be installable.

---

## Moment 1: The Install Prompt After Sign-Up

**What it is:** The install prompt for ABLE does not appear on the first visit, or after a time delay, or because a script decided the fan has been "engaged enough." It appears after a fan has signed up to their first artist's list — because that is the exact moment they have declared they care. The prompt slides up from the bottom: "Add ABLE to your home screen. Always one tap away." Two buttons: "Add" and a quiet "✕".

**Why it's 20/10:** Every platform that offers a PWA install prompt gets the timing wrong. They show it too early, when the fan has not yet invested anything. ABLE waits for the sign-up — a concrete action that signals intent — and then makes the offer. The fan who has just given their email to an artist they care about is also the fan most likely to want to come back. The prompt arrives at the exact moment when "yes, I want this on my phone" is the natural next thought. Timing is everything. The install prompt that fires at the wrong moment is annoying. The same prompt at the right moment feels like the platform is reading your mind.

**Exact implementation:**

```javascript
// fan.html — extended trigger condition that checks for recent sign-up
function maybeShowInstallHint() {
  const dismissed = localStorage.getItem('able_pwa_prompt_dismissed');
  const installed = localStorage.getItem('able_pwa_installed');
  if (dismissed || installed || !deferredInstallPrompt) return;

  // Condition 1: fan has just signed up (set by the sign-up success handler)
  const justSignedUp = sessionStorage.getItem('able_just_signed_up');

  // Condition 2: 3+ visits (fallback for fans who signed up on a previous session)
  const visits = parseInt(localStorage.getItem('able_fan_visits') || '0') + 1;
  localStorage.setItem('able_fan_visits', visits);

  if (justSignedUp || visits >= 3) {
    // Slight delay after sign-up — let the success state settle
    const delay = justSignedUp ? 1500 : 2000;
    setTimeout(showInstallHint, delay);
    sessionStorage.removeItem('able_just_signed_up'); // clear single-use flag
  }
}

// Called from the fan sign-up success handler in able-v7.html
// The sessionStorage key travels across the page transition to fan.html
function onFanSignUpSuccess() {
  sessionStorage.setItem('able_just_signed_up', '1');
  // ... existing sign-up success UI
}
```

The install hint copy is exactly: `"Add ABLE to your home screen"` (strong, 14px) with a subline `"Always one tap away."` (12px, 0.6 opacity). The ABLE icon is 40px, border-radius 10px. The "Add" button is the artist's accent colour, not ABLE's amber. It looks like part of the artist's page, not a platform chrome intrusion.

---

## Moment 2: The Offline Page That Doesn't Break

**What it is:** When a fan opens the ABLE app with no connection — on the Tube, at a festival, anywhere — fan.html loads from the service worker cache and shows a quiet amber banner at the top: "No connection — showing your last update." Below it, everything that was cached renders normally. The artists they follow. Their shows. Their releases. Nothing is broken. When the connection returns, the banner fades and the page silently refreshes.

**Why it's 20/10:** A broken page when offline is a violation of the implicit promise that a home screen icon makes. The icon says: this thing works on my phone. A blank screen or a browser error says: it lied. ABLE's offline state keeps that promise. "No connection — showing your last update" is honest copy — it does not pretend the content is live. It says: this is what we have, and it is enough for now. The fan can still see their followed artists. They can still read the upcoming shows they bookmarked. The platform worked for them at the moment they needed it without a network connection. That experience builds more trust than any feature.

**Exact implementation:**

```javascript
// fan.html — offline state management
function initOfflineIndicator() {
  if (!navigator.onLine) showOfflineBanner();
  window.addEventListener('offline', showOfflineBanner);
  window.addEventListener('online', hideOfflineBanner);
}

function showOfflineBanner() {
  // Idempotent — if banner already shown, do nothing
  if (document.getElementById('offlineBanner')) return;

  const el = document.createElement('div');
  el.id = 'offlineBanner';
  el.className = 'offline-banner';
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.innerHTML = '<span>No connection — showing your last update.</span>';
  document.body.prepend(el); // At the top, not covering content
}

function hideOfflineBanner() {
  const banner = document.getElementById('offlineBanner');
  if (!banner) return;

  // Fade out gracefully — the content is still there, the banner just goes away
  banner.style.transition = 'opacity 0.3s ease';
  banner.style.opacity = '0';
  setTimeout(() => {
    banner.remove();
    // Silently refresh content — the fan should not have to pull-to-refresh
    refreshFollowedArtists();
  }, 300);
}
```

```css
.offline-banner {
  background: rgba(244, 185, 66, 0.1);
  border-bottom: 1px solid rgba(244, 185, 66, 0.18);
  color: #f4b942;
  font-size: 12px;
  text-align: center;
  padding: 6px 16px;
  /* Does not push content — it sits above it without reflow */
}
```

The service worker's network-first strategy for HTML pages means the cached version is always the most recent successful load. The fan sees their page as it was last time they had a connection — which is, in most cases, exactly what they need.

---

## Moment 3: The Home Screen Icon Moment

**What it is:** When a fan installs ABLE on their home screen — whether via the install prompt, the iOS Share sheet, or the browser menu — the icon that appears is a clean, dark square with the ABLE wordmark, correctly sized for the device's adaptive icon system. On Android, it has a safe zone so the icon fits any launcher shape. On iOS, it looks indistinguishable from a native app icon. When the fan taps it, the app opens in standalone mode: no browser chrome, no URL bar, no forward/back buttons. It is an app.

**Why it's 20/10:** The delta between a PWA that looks like a PWA and one that looks like an app is entirely in the icon and the manifest. The `purpose: "any maskable"` on the icon, the `background_color: "#0d0e1a"` on the manifest, the `black-translucent` iOS status bar meta tag — these are details that take 30 minutes to implement and result in a home screen icon that a fan does not look twice at because it looks exactly right. When a fan's phone has ABLE on it, they see the artist's ecosystem — the shows, the releases, the list they're on — every time they look at their home screen. The icon is a constant, quiet reminder.

**Exact implementation:**

The manifest.json from SPEC.md is the correct implementation. The 20/10 detail is the launch screen transition:

```html
<!-- fan.html <head> — the complete PWA meta tag set -->
<link rel="manifest" href="/manifest.json">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="ABLE">
<link rel="apple-touch-icon" href="/icons/icon-192.png">
<meta name="theme-color" content="#0d0e1a">
```

```css
/* Prevents the status bar from overlapping content in iOS standalone mode */
@supports (padding-top: env(safe-area-inset-top)) {
  body {
    padding-top: env(safe-area-inset-top);
  }
}

/* Smooth entry animation when launching from home screen */
/* The page fades in rather than snapping — matches native app launch behaviour */
@media (display-mode: standalone) {
  body {
    animation: able-launch 0.2s ease-out;
  }
}

@keyframes able-launch {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

After a successful install, `showToast('ABLE added to your home screen.', 'green')` fires. The copy is deliberately quiet — not "You're all set!" or "Welcome to ABLE." Just confirmation of the action, in the same register as every other ABLE message. The fan has done something. ABLE acknowledged it. Done.

---

## The 20/10 test

You know the PWA system has crossed into extraordinary when a fan opens ABLE from their home screen at 08:00 on release day, sees the new track from an artist they follow, and plays it — all without a browser, all from cache, all before their WiFi has reconnected.
