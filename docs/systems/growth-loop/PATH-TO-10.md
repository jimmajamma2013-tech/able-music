# ABLE Growth Loop — Path to 10
**Updated: 2026-03-16**

> P0 and P1 require no backend. The `?ref=` fix is a one-afternoon implementation of already-written spec code. The "I make music too →" fork is now fully specced. 9/10 is achievable before first artist signs up.

---

## Current score: 7/10 (spec complete, code not shipped)

The spec is written. The copy is decided. The JavaScript functions exist as documentation. The gap between 7/10 and 9/10 is: putting that code into the live files.

---

## P0 — The attribution fix (implement today, no backend required)

**Score impact: 7/10 → 9/10**

### P0.1 — `?ref=` injection on the footer link

**File:** `able-v7.html`
**The fix:** One function call on DOMContentLoaded.

The exact function is already written in SPEC.md §3. Copy it into able-v7.html. The function reads the artist slug from the URL path or `localStorage.getItem('able_v3_profile').slug`, then sets the footer link href:

```javascript
function initFooterLink() {
  const footerLink = document.getElementById('able-footer-cta');
  if (!footerLink) return;

  footerLink.addEventListener('click', () => {
    recordClick('Made with ABLE', 'footer', footerLink.href);
  });

  let slug = null;

  // Priority 1: URL path slug
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) slug = pathParts[pathParts.length - 1];

  // Priority 2: localStorage profile slug
  if (!slug) {
    try {
      const profile = JSON.parse(localStorage.getItem('able_v3_profile') || 'null');
      if (profile && profile.slug) slug = profile.slug;
    } catch (e) { /* fallback to plain URL */ }
  }

  const base = 'https://ablemusic.co/';
  footerLink.href = slug ? `${base}?ref=${encodeURIComponent(slug)}` : base;
}

document.addEventListener('DOMContentLoaded', initFooterLink);
```

Acceptance criteria:
- Footer link contains `?ref=[slug]` at any artist profile URL
- Falls back to plain `https://ablemusic.co/` if no slug is available
- No JS error if `able_v3_profile` is absent, null, or corrupt
- Footer click is tracked in `able_clicks` as `type: 'footer'`

---

### P0.2 — Landing page referral detection and personalisation

**File:** `landing.html`

The exact function is already written in SPEC.md §4. Add to landing.html:

```javascript
function initReferralLanding() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');
  if (!ref) return;

  sessionStorage.setItem('able_referral', ref);
  personaliseHero(ref);
}

function personaliseHero(slug) {
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const headline = document.getElementById('landing-headline');
  const subline  = document.getElementById('landing-subline');
  const heroCta  = document.getElementById('landing-hero-cta');

  if (headline) headline.textContent = `${displayName} is on ABLE.`;
  if (subline)  subline.textContent  = 'Create your own free page. It takes about 8 minutes.';
  if (heroCta)  heroCta.textContent  = 'Create your free page →';

  // Phase 2: replace with real artist name from Supabase
  // fetchArtistName(slug).then(name => { if (name && headline) headline.textContent = `${name} is on ABLE.`; });
}

document.addEventListener('DOMContentLoaded', initReferralLanding);
```

Also add the IDs to landing.html's hero elements:
- `id="landing-headline"` on the hero headline element
- `id="landing-subline"` on the hero sub-headline element
- `id="landing-hero-cta"` on the hero CTA link

Acceptance criteria:
- `landing.html?ref=nadia` shows "Nadia is on ABLE."
- `landing.html?ref=the-1975` shows "The 1975 Is On ABLE." (acceptable Phase 1 approximation)
- `landing.html` with no `?ref=` shows the standard hero — zero regression
- `sessionStorage.getItem('able_referral')` is set after the landing page loads with a valid `?ref=`

---

### P0.3 — "I make music too →" fork on referred landing

**File:** `landing.html`
**This is now fully specced in ANALYSIS.md**

Below the main hero CTA, when `?ref=` is present, add a secondary text link:

```html
<!-- Only rendered when ?ref= is present — added by personaliseHero() -->
<div class="landing-fork" id="landing-fork" style="display:none">
  <p class="landing-fork-prompt">Already here as a fan?</p>
  <a href="#" class="landing-fork-link" id="landing-fork-cta">I make music too →</a>
</div>
```

In `personaliseHero()`, after personalising the hero:

```javascript
// Show the fork and set its URL
const fork = document.getElementById('landing-fork');
const forkCta = document.getElementById('landing-fork-cta');

if (fork) fork.style.display = 'block';
if (forkCta) forkCta.href = `start.html?ref=${encodeURIComponent(slug)}&source=artist-page`;
```

CSS (consistent with ABLE's muted-attribution aesthetic):

```css
.landing-fork {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}

.landing-fork-prompt {
  font-size: 13px;
  color: var(--color-text-3);
  opacity: 0.6;
  margin: 0 0 8px;
}

.landing-fork-link {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-2);
  text-decoration: none;
  letter-spacing: 0.01em;
  transition: color 0.15s ease;
}

.landing-fork-link:hover {
  color: var(--color-text);
}
```

The fork is invisible on the standard landing page. It only appears when `personaliseHero()` runs, which only runs when `?ref=` is present.

Acceptance criteria:
- Fork is invisible at `landing.html` (no ref) — standard hero only
- Fork is visible at `landing.html?ref=nadia` — below primary CTA, with separator
- Fork link points to `start.html?ref=nadia&source=artist-page`
- Fork link text is exactly: "I make music too →"
- Prompt text is exactly: "Already here as a fan?"
- No horizontal overflow at 375px

---

### P0.4 — start.html referral capture

**File:** `start.html`

Already specced in SPEC.md §5. Add to the existing `saveProfile()` function:

```javascript
function captureReferral() {
  return sessionStorage.getItem('able_referral') || null;
}

// In saveProfile(profileData):
const referral = captureReferral();

// Read source from URL params
const urlParams = new URLSearchParams(window.location.search);
const source = urlParams.get('source') || null;

const profile = {
  ...profileData,
  ...(referral ? { referredBy: referral } : {}),
  ...(source   ? { signupSource: source } : {}),
  createdAt: Date.now(),
};

localStorage.setItem('able_v3_profile', JSON.stringify(profile));

if (referral) sessionStorage.removeItem('able_referral');
```

When `source=artist-page` is present, also show a one-line contextual note on the wizard opening screen:

```javascript
// At start.html DOMContentLoaded
function initWizardContext() {
  const params = new URLSearchParams(window.location.search);
  const ref    = params.get('ref');
  const source = params.get('source');

  if (source === 'artist-page' && ref) {
    const displayName = ref
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const contextEl = document.getElementById('wizard-context-note');
    if (contextEl) {
      contextEl.textContent = `You found us through ${displayName}.`;
      contextEl.style.display = 'block';
    }
  }
}
```

Add `id="wizard-context-note"` as a hidden paragraph near the top of the wizard first step. Style as `font-size: 13px; color: var(--color-text-3); opacity: 0.7;`. Shown only when `source=artist-page`.

Acceptance criteria:
- Completing the wizard after `landing.html?ref=nadia` → `able_v3_profile.referredBy = 'nadia'`
- Completing via `start.html?ref=nadia&source=artist-page` → `able_v3_profile.referredBy = 'nadia'`, `signupSource: 'artist-page'`
- Completing without a referral → no `referredBy` field (absent, not null)
- `sessionStorage` cleared after capture
- Wizard context note "You found us through Nadia." appears only on the artist-page path

---

### P0.5 — Add canonical source values

**Files:** `docs/systems/CROSS_PAGE_JOURNEYS.md`, `docs/systems/analytics/SPEC.md`

Two new source values to add:
- `'footer'` — visitor arrived at landing.html via a "Made with ABLE ✦" footer tap
- `'artist-page'` — new artist completed wizard via the "I make music too →" fork

In `SOURCE_VALUES`:
```javascript
const SOURCE_VALUES = {
  // ... existing ...
  footer:        'footer',       // Arrived at landing.html from artist profile footer
  'artist-page': 'artist-page',  // Completed wizard via "I make music too →" fork
};
```

In `SOURCE_LABELS` (admin display):
```javascript
const SOURCE_LABELS = {
  // ... existing ...
  footer:        'ABLE footer',
  'artist-page': 'Artist page fork',
};
```

In `detectSource()` — add after existing `?src=` check:
```javascript
if (referrer.includes('ablemusic.co/')) return 'footer';
```

---

**P0 score impact: 7/10 → 9/10**

These five items are the entire gap between the spec and the live system. None require a backend. All are implementable in one focused afternoon.

---

## P1 — Artist visibility (no backend required)

### P1.1 — Admin nudge: referred signups count

**File:** `admin.html`
**Copy:** "1 artist has created a page after visiting yours." (singular) / "3 artists have created their pages after visiting yours." (plural)

In the Fans section of admin.html, after loading fan data, scan localStorage for any profiles with `referredBy === currentArtistSlug`. Show the nudge if count >= 1. Dismissable via `able_dismissed_nudges`.

Note: this works reliably only in single-device scenarios (same browser). It becomes cross-device accurate when Supabase is live. Mark in the UI: "On same device — full count available when synced."

### P1.2 — `'footer'` label in admin analytics

**File:** `admin.html`

Ensure the source breakdown bar chart renders `'footer'` with label "ABLE footer" and `'artist-page'` with label "Artist page fork".

---

**P1 score impact: maintains 9/10, increases confidence**

---

## P2 — Supabase-dependent improvements (after backend is live)

These items cannot be built without a backend. They are not blocking 9/10.

| Item | Gap it closes | Effort |
|---|---|---|
| Real artist name on personalised landing | "Dj Shadow" → "DJ Shadow" | 20 lines + Supabase query |
| Referred signup count across devices | Admin nudge becomes accurate for all devices | Supabase query swap |
| "Artists like this" discovery strip | Referred landing shows 3 similar artists | New Supabase query |
| Platform growth loop analytics (top referring artists) | Measure which artists generate most signups | SQL view in SPEC.md §6 |
| PostHog attribution tracking | Footer conversion rate measured, A/B test possible | PostHog integration |

---

## Score summary

| Phase | Key actions | Score | Backend required |
|---|---|---|---|
| Today (spec) | Nothing implemented yet | 7/10 | No |
| P0 shipped | ?ref= fix + landing personalisation + "I make music too →" fork | 9/10 | No |
| P1 shipped | Admin nudge + source labels | 9/10 (more visible) | No |
| P2 shipped | Real names + cross-device counts + discovery strip | 9.5/10 | Yes |
| 10/10 | Real data, A/B tested copy, PostHog attribution confirmed | 10/10 | Yes + time |

---

## What prevents a true 10

A true 10 requires things that can only be observed, not specced:
1. Does the `?ref=` personalisation ("Nadia is on ABLE.") convert better than the generic headline? Requires traffic + A/B test.
2. What percentage of footer taps become new artist profiles? Set a target (2% is a reasonable benchmark) before measuring — so the measurement is meaningful.
3. Does the "I make music too →" fork produce a different-quality artist than cold signups? Requires cohort analysis after 50+ referred signups.

None of these need more spec. They need shipped code and real users.

---

## The single action that unlocks everything

**Implement `initFooterLink()` in able-v7.html.** Today.

20 lines of JavaScript. Already written. Already in SPEC.md §3.

Without this, every other item in this document is theoretical. With it, the attribution chain closes and the entire growth loop becomes measurable.
