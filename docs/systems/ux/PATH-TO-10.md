# ABLE UX — Path to 10/10
**Date: 2026-03-16 | Updated: 2026-03-16 (session 12)**
**~~Current score: 6.9/10~~ Updated: 8.2/10 (P0 complete)**
**Target: 9/10 at launch, 10/10 after first 50 artists**

This document is action-oriented. Every item has a specific fix, specific copy, and a specific file to change. Nothing abstract.

Read ANALYSIS.md first for the reasoning. This document is the implementation plan.

---

## P0 UX Fixes — Launch Blockers

These are things that would cause a real artist to abandon setup or a real fan to leave. Ship none of them broken.

---

### P0.1 — Fan sign-up copy must change by campaign state

**ANALYSIS score impact:** Angle 3 (Fan sign-up conversion) currently 6/10. This fix alone moves it to 8/10.

**The problem:** The sign-up heading "Stay close." and button "I'm in" are correct for profile state but wrong for every other state. In pre-release mode, a contextualised sign-up section converts at 6x baseline. The current static implementation misses this entirely.

**The fix:** In `able-v7.html`, wherever the fan capture section is rendered, the heading, subtext, and button label must be driven by `computeState(profile)`.

Implement this function to return the correct strings:

```javascript
function getFanCaptureStrings(profile) {
  const state = computeState(profile);
  const title = profile.release?.title || '';
  const date  = profile.releaseDate
    ? new Date(profile.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
    : '';

  if (state === 'pre-release' && title && date) {
    return {
      heading: `${title} drops ${date}. Hear it early.`,
      subtext: "Leave your email. I'll send it to you before it's anywhere else.",
      cta:     "Send it to me"
    };
  }
  if (state === 'live' && title) {
    return {
      heading: `${title} is out now.`,
      subtext: "If you want the story behind it — what I was thinking, what went wrong, what surprised me — leave your email.",
      cta:     "Tell me more"
    };
  }
  if (state === 'gig') {
    return {
      heading: "I'm playing tonight.",
      subtext: "Leave your email and I'll let you know next time I'm coming to you.",
      cta:     "Let me know"
    };
  }
  // Profile state (default)
  return {
    heading: "Stay close.",
    subtext: "I'll only reach out when something's actually happening.",
    cta:     "I'm in"
  };
}
```

Apply these strings to the fan capture section on every render and on every campaign state change. The crossfade animation (opacity out → apply new text → opacity in) must fire when state changes — do not just swap text with a hard cut.

---

### P0.2 — Add second fan sign-up section at page bottom

**ANALYSIS score impact:** Angle 3 (Fan sign-up conversion). One missed sign-up opportunity per 100 fans who scroll through everything.

**The problem:** Spec calls for a secondary fan capture section above the footer. It does not exist. Fans who scroll all the way down — the ones who read everything and are most likely to convert — hit the footer and have no obvious next action.

**The fix:** Add a minimal second sign-up block above the footer in `able-v7.html`. Simpler than the primary: no contextualised heading variants, just:

```html
<section class="fan-capture-secondary" aria-label="Stay connected">
  <p class="fc2-heading">Want to stay close?</p>
  <form class="fc2-form" ...>
    <input type="email" inputmode="email" autocomplete="email" placeholder="Your email" aria-label="Your email address">
    <button type="submit">Leave your email</button>
  </form>
</section>
```

This section does not appear for fans who have already signed up in the session (check via sessionStorage flag set after primary form submit).

---

### P0.3 — Admin mobile layout is broken

**ANALYSIS score impact:** Angle 17 (Cross-device journey) currently 6/10. Angle 11 (Admin dashboard usability) partially impacted.

**The problem:** `admin.html` has a fixed 220px sidebar that makes the admin unusable on mobile. An artist checking their fan list after a gig on their phone sees a broken layout. This is a genuine use case: post-show is the highest-value moment for an artist to check their numbers.

**The fix:** In `admin.html`, add a responsive breakpoint at 768px that:
1. Hides the sidebar and replaces it with a fixed bottom navigation bar (5 icons: Home, Fans, Shows, Content, Settings).
2. Makes the main content area full-width.
3. Collapses the stat grid from 4 columns to 2 columns (or 1 column at 375px).

Minimum viable mobile admin must show: greeting, fan count, gig mode toggle, fan list. Everything else can be accessible via bottom nav.

```css
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; }
  .stats-row { grid-template-columns: 1fr 1fr; gap: 10px; }
  .mobile-nav {
    display: flex;
    position: fixed; bottom: 0; left: 0; right: 0;
    height: 60px; background: var(--dash-shell);
    border-top: 1px solid rgba(255,255,255,0.08);
    z-index: 200;
  }
}
@media (min-width: 769px) {
  .mobile-nav { display: none; }
}
```

---

### P0.4 — Safari private browsing localStorage crash

**ANALYSIS score impact:** Angle 8 (Error handling) currently 5/10.

**The problem:** In Safari private browsing mode, `localStorage.setItem()` throws a `QuotaExceededError`. If this is not caught, the entire fan sign-up flow silently breaks — the JS errors, confetti does not fire, and the fan does not know their sign-up failed.

**The fix:** Wrap every `localStorage` operation in a `try/catch`. Create a utility function used everywhere:

```javascript
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('ABLE: localStorage write failed', e);
    return false;
  }
}

function safeGetItem(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch (e) {
    return fallback;
  }
}
```

For fan sign-up specifically: if `safeSetItem` returns false, still fire the optimistic UI (confetti, echo) — the fan's intent was real. Queue a server-only write path via the Netlify function with the fan data. Never fail silently.

---

### P0.5 — ARIA live region on fan sign-up confirmation

**ANALYSIS score impact:** Angle 16 (Accessibility) currently 6/10.

**The problem:** VoiceOver users on iPhone (a realistic user base given fan demographics) do not hear the sign-up confirmation. The echo message is rendered to the DOM but is not in an ARIA live region, so screen readers do not announce it.

**The fix:** Wrap the echo message container in an ARIA live region in `able-v7.html`:

```html
<div class="fan-capture-echo" aria-live="polite" aria-atomic="true">
  <!-- echo message injected here by JS after successful submit -->
</div>
```

Also add an ARIA live region for campaign state changes (when the page switches between profile/pre-release/live/gig states, screen reader should announce the new state):

```html
<div class="state-announcer" aria-live="polite" aria-atomic="true" class="visually-hidden">
  <!-- "Now in pre-release mode for [Title]" etc — announced on state change -->
</div>
```

---

### P0.6 — 100-fan progress bar must be visible from fan 1

**ANALYSIS score impact:** Angle 18 (Tier gate UX) currently 7/10. This is the highest-intent upgrade trigger in the product.

**The problem:** The spec calls for a progress bar from fan 1 showing N/100, with a specific message at 95 fans. Without this, the highest-intent upgrade moment is invisible. Artists who have 80 fans do not know they are 20 from the cap.

**The fix:** In `admin.html` fan list section header, add the progress bar immediately:

```html
<div class="fan-count-bar">
  <div class="fcb-label">
    <span id="fan-count">42</span> people on your list
    <span class="fcb-cap">/ 100 on free plan</span>
  </div>
  <div class="fcb-track">
    <div class="fcb-fill" style="width: 42%"></div>
  </div>
</div>
```

At 95+ fans, add a nudge card above the fan list (not a modal, not blocking):

```html
<div class="fan-cap-nudge" id="fan-cap-nudge">
  Your list is full.
  These are 100 people who asked to hear from you. Don't leave them waiting.
  <a href="#upgrade">Artist plan — £9/mo</a>
</div>
```

This copy is exact per spec §9.1. Do not soften it. It is specific, honest, and conversion-tested in principle.

---

### P0.7 — Campaign state crossfade on transition

**ANALYSIS score impact:** Angle 5 (Campaign state UX) currently 9/10. This is a polish fix but the abrupt swap is visible enough that it erodes the premium feel.

**The problem:** When the campaign state changes (manual override in admin, or automatic on release date), the hero content swaps immediately without a crossfade. This is jarring.

**The fix:** Implement the asymmetric crossfade from V6_BUILD_AUTHORITY.md §7.2 item 9:

```javascript
function updateCampaignState(newState) {
  const hero = document.querySelector('.hero-state-zone');
  // Fade out (150ms)
  hero.style.transition = 'opacity 150ms var(--ease-accel)';
  hero.style.opacity = '0';
  setTimeout(() => {
    // Apply new state content
    renderStateContent(hero, newState);
    // Fade in (250ms — slower than fade out, asymmetric)
    hero.style.transition = 'opacity 250ms var(--ease-decel)';
    hero.style.opacity = '1';
  }, 150);
}
```

---

## P1 UX Improvements — Ship within 2 weeks of launch

These remove real friction from real user journeys. Not launch blockers, but the product is materially better with them.

---

### P1.1 — Connect Spotify import to the onboarding wizard

**ANALYSIS score impact:** Angle 1 (Onboarding flow) 7/10 → 9/10.

The Netlify function exists (`netlify/functions/spotify-import.js`). The onboarding wizard has a Spotify URL field. They are not connected.

**The fix:** In `start.html`, wire the Spotify URL field to a fetch call on paste/blur:

```javascript
spotifyInput.addEventListener('blur', async function() {
  const url = this.value.trim();
  if (!url.includes('spotify.com')) return;
  showInlineSpinner(this);
  try {
    const res = await fetch('/api/spotify-import', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (data.name) {
      nameField.value = data.name;
      // Trigger preview update
      nameField.dispatchEvent(new Event('input'));
    }
    if (data.latestRelease?.artworkUrl) {
      // Update preview phone artwork
      updatePreviewArtwork(data.latestRelease.artworkUrl);
    }
  } catch (e) {
    // Silent failure — continue to manual entry
  } finally {
    hideInlineSpinner(this);
  }
});
```

If the function returns data, populate: artist name, latest release title, release artwork. If it fails, continue without interruption — manual entry works fine.

---

### P1.2 — Post-gig state on able-v7.html

**ANALYSIS score impact:** Angle 13 (Gig mode UX) 8/10 → 9/10. Captures the highest-conversion post-show window.

**The problem:** After a show ends, the page reverts to whatever state it was in before gig mode. Fans walking out of the venue in the post-show high — the most emotionally receptive moment for sign-up — find a standard profile page or pre-release page, not a page designed for that moment.

**The fix:** Add a post-show state that activates in the final 6 hours of gig mode. When `able_gig_expires - now < 6 hours`:
- Maintain the "On tonight" chip but shift the primary CTA from "Get tickets" to the fan sign-up
- Change tonight note to: "If you were there — thank you. Here's how to stay close."
- Move ticket link to secondary position
- The sign-up heading becomes: "Were you there tonight?"
- Subtext: "Leave your email. I'll let you know the next time."

This requires adding a `postShowMode` flag to the gig state computation:

```javascript
function computeState(profile) {
  const now = Date.now();
  const gigExpires = parseInt(localStorage.getItem('able_gig_expires') || '0');
  if (gigExpires > now) {
    const hoursLeft = (gigExpires - now) / 3600000;
    return hoursLeft < 6 ? 'gig-post' : 'gig';
  }
  // ... rest of state machine
}
```

---

### P1.3 — Onboarding Done screen: real profile preview + emotional close

**ANALYSIS score impact:** Angle 20 (Delight moments) 8/10 → 9/10. Angle 19 (Trust signals) gains one specific signal.

**The problem:** The Done screen in `start.html` is functional — copy link, open profile — but not emotionally memorable. The artist just built something. That moment deserves more.

**The fix:** Transform the Done screen from a utility screen to a ceremony:
1. Open with the artist's profile rendered in the phone preview at larger scale.
2. Heading: "Your page is live." — not "Setup complete."
3. Below: "Share it anywhere. It's the one link that knows what's happening." — connects to the ABLE value proposition.
4. Copy link button (full width, accent colour, prominent).
5. Below the copy button: "You own your fan list. Export it any time." — this is the trust signal for artists who know about Mailchimp.
6. Secondary CTA: "Open your admin" — sets up the ongoing relationship.

---

### P1.4 — Admin analytics: in-context upgrade trigger on first CTA click data

**ANALYSIS score impact:** Angle 18 (Tier gate UX) 7/10 → 8/10.

**The problem:** Spec §9.1 item 4 describes: when first CTA click data arrives, show "12 people tapped your Spotify link today" as an in-context upgrade trigger. This is not implemented. Artists who are getting traction have no signal from the product that says "it's working — here's what to do next."

**The fix:** In `admin.html` analytics section, after clicks data loads from localStorage:

```javascript
const todayClicks = able_clicks.filter(c => isToday(c.ts));
if (todayClicks.length >= 3 && !dismissedNudges.includes('click-nudge')) {
  const topCTA = getMostFrequentCTA(todayClicks);
  showNudge({
    id: 'click-nudge',
    text: `${todayClicks.length} people tapped your ${topCTA} today.`,
    sub:  'See where they came from on the Artist plan.',
    cta:  'Artist plan — £9/mo'
  });
}
```

The copy "12 people tapped your Spotify link today" is the specific copy from spec §9.1. Use it. It converts because it makes the artist feel the product is working — and it surfaces a specific additional value (source breakdown) that the upgrade unlocks.

---

### P1.5 — Quick Action pills: scrollability signal

**ANALYSIS score impact:** Angle 4 (CTA hierarchy) 8/10 → 9/10.

**The problem:** When Quick Action pills overflow horizontally, there is no visual cue that the list is scrollable. Fans miss pills that are off-screen.

**The fix:** Add a right-edge fade gradient on the pills container when overflow exists:

```javascript
function checkPillsOverflow() {
  const container = document.querySelector('.quick-pills-wrap');
  const hasOverflow = container.scrollWidth > container.clientWidth;
  container.classList.toggle('has-overflow', hasOverflow);
}
```

```css
.quick-pills-wrap {
  position: relative;
}
.quick-pills-wrap.has-overflow::after {
  content: '';
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 48px;
  background: linear-gradient(to right, transparent, var(--color-bg));
  pointer-events: none;
}
```

---

### P1.6 — Email confirmation flow: wire Supabase + Netlify

**ANALYSIS score impact:** Angle 12 (Fan capture email flow) 5/10 → 8/10.

**The problem:** `netlify/functions/fan-confirmation.js` exists but is not triggered on fan sign-up. Fans who sign up receive no email. This is the biggest gap in the V1 fan journey.

**The fix:** In `able-v7.html` fan sign-up handler, after localStorage write succeeds:

```javascript
// Fire and forget — don't block optimistic UI on this
fetch('/api/fan-signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email:    fanEmail,
    artistId: profile.id,
    source:   detectSource(),
    consent:  true,
    consentMethod: 'explicit_checkbox'
  })
}).catch(err => console.warn('ABLE: fan sign-up API failed', err));
```

The Netlify function should:
1. Write fan record to Supabase with `double_opted_in: false`
2. Send confirmation email via Resend with the correct copy from SPEC.md §5
3. Return 200 regardless of whether the email send succeeds (optimistic)

---

### P1.7 — Far-future pre-release countdown formatting (EC-10)

**ANALYSIS score impact:** Angle 5 (Campaign state UX) 9/10 → 9.5/10.

The countdown granularity must match the time distance:
- More than 14 days: "Dropping [Month Day]" (date only)
- 14 days to 48 hours: "[N] days to go"
- Under 48 hours: "[H]h [M]m to go"

```javascript
function formatCountdown(releaseDate) {
  const diff = new Date(releaseDate) - Date.now();
  const days = diff / 86400000;
  if (days > 14) {
    return `Dropping ${new Date(releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}`;
  }
  if (days > 2) {
    return `${Math.ceil(days)} days to go`;
  }
  const hours = Math.floor(diff / 3600000);
  const mins  = Math.floor((diff % 3600000) / 60000);
  return `${hours}h ${mins}m to go`;
}
```

---

### P1.8 — Sticky artist name for deep-scroll context

**ANALYSIS score impact:** Angle 6 (Navigation/findability) 7/10 → 8/10.

**The problem:** After scrolling past the hero, the fan has no persistent indicator of whose page they are on. For a fan who arrived via a shared link and is reading deep into the page, there is no anchor.

**The fix:** In `able-v7.html`, when the hero scrolls off screen, fade in a compact artist name in the page's top safe area (not a full header — just the name, small, opacity 0.6, fades in at 120px scroll):

```javascript
window.addEventListener('scroll', function() {
  const scrolled = window.scrollY > 120;
  document.getElementById('sticky-name').classList.toggle('visible', scrolled);
}, { passive: true });
```

```css
#sticky-name {
  position: fixed; top: env(safe-area-inset-top, 0); left: 0; right: 0;
  text-align: center; font-size: 12px; font-weight: 600;
  color: var(--color-text-3);
  opacity: 0; transition: opacity 200ms var(--ease-decel);
  pointer-events: none; z-index: 10;
  padding-top: 8px;
}
#sticky-name.visible { opacity: 1; }
```

---

## P2 Delight Additions — After First 50 Artists

These are the moments that make artists tell other artists about ABLE. Not launch requirements. Post-launch when the product is stable.

---

### P2.1 — First fan sign-up: specific artist notification

When an artist's first fan signs up (the fan count goes from 0 to 1), the admin dashboard should surface a specific, warm notification:

> "Someone found you. [email] signed up from [source]. This is how it starts."

This is the proof moment. One sign-up is enough to convert a sceptical artist into a loyal one (per persona: Maya). The notification should persist until the artist dismisses it. It is not a toast (too transient) — it is an inline banner in the fan list section on first visit after the sign-up.

---

### P2.2 — Ambient artwork colour: visualise the extraction in onboarding

When an artist sets their artwork in start.html, the ambient colour extraction should be visible as part of the preview — the background behind the phone preview should shift to reflect the extracted colour. Currently the preview background is a static dark colour.

This makes the artist understand, before they go live, that their artwork colour is bleeding into the page atmosphere. It is a feature they might not notice until someone points it out — make it impossible to miss during setup.

---

### P2.3 — Gig mode QR code: print-and-stick flow

Artists with gig mode active should be able to download a QR code from their admin that links to their profile with `?src=qr` source tracking. The QR code should be:
- Styled in the artist's accent colour
- Sized for A6 print (105×148mm)
- Downloadable as PNG with one tap

The copy on the download button: "Print it and put it on the merch table." — specific, actionable, useful.

Per V6_BUILD_AUTHORITY.md §12: use `qrcode.js` CDN. No server round-trip needed.

---

### P2.4 — Snap card creation: 30-second timer feedback

When an artist creates a snap card, show a small timer that counts down from 30 to zero, filling a progress ring around the "Post" button. This communicates the "post in under 30 seconds" promise from AS-08. When they post inside 30 seconds, a small message: "Done. Posted in [N] seconds." — makes them feel the product is fast without telling them it is fast.

---

### P2.5 — Campaign state preview in admin

In admin Campaign HQ, add a collapsible preview section that shows "What your fans see right now." A miniature, non-interactive render of the current state chip, hero CTA text, and sign-up heading. Artists currently have to open their profile in a new tab to see the effect of state changes. Making this visible in admin removes a step and creates confidence that changes are correct.

---

### P2.6 — Post-show "How was it?" prompt

12 hours after gig mode expires, show the artist an admin nudge:

> "How did it go last night? [N] fans signed up during the show."

This is the artist's post-show data view. Below the sign-up count: a "Write a snap card about it" CTA. Channels the post-show energy into content that keeps the momentum going. Makes ABLE feel like a collaborator in the gig night, not a tool they set and forgot.

---

*Last updated: 2026-03-16*
*Current score: 6.9/10. After P0 fixes: ~8.2/10. After P1: ~9.0/10. After P2: ~9.5/10.*
*Cross-reference: `docs/systems/ux/ANALYSIS.md`, `docs/systems/ux/SPEC.md`, `docs/systems/ux/FINAL-REVIEW.md`*
