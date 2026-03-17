# ABLE "Made with ABLE" Growth Loop — Canonical Spec
**Created: 2026-03-16 | Authority: primary**

> This is the single source of truth for the growth loop system: footer component, referral tracking, landing page personalisation, analytics, and artist visibility. The growth loop is ABLE's primary organic acquisition channel — every artist's profile is a passive ad for the platform.

---

## 1. Overview

The "Made with ABLE ✦" footer appears on every artist profile page (able-v7.html). When a fan taps it, they are sent to landing.html with the referring artist's slug as a URL parameter. Landing.html personalises its headline based on that slug. If the visitor completes the start.html wizard, their profile records which artist referred them.

This is the complete loop:

```
Artist profile (able-v7.html)
  Fan taps "Made with ABLE ✦"
         ↓
landing.html?ref=[artist-slug]
  "Nadia's fans are on ABLE. Create your free page →"
         ↓
start.html wizard
  sessionStorage carries referral through all screens
         ↓
Profile saved
  profile.referredBy = 'nadia' (artist slug)
         ↓
admin.html (new artist)
  Referral recorded
         ↓
admin.html (referring artist — Phase 1)
  "3 artists have signed up from your page"
```

---

## 2. Footer component

### HTML

```html
<footer class="able-footer">
  <a href="#" class="able-footer-link" id="able-footer-cta">
    Made with ABLE ✦
  </a>
</footer>
```

The `href` is set to `#` in HTML and overridden at runtime by `initFooterLink()` (see section 3). This ensures the link is never a broken hardcoded URL if the script fails — it simply doesn't navigate.

### CSS

```css
.able-footer {
  padding: 32px 20px 48px; /* bottom padding clears iOS home bar */
  text-align: center;
}

.able-footer-link {
  /* Typography */
  font-family: var(--font, 'DM Sans', sans-serif);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.03em;
  text-decoration: none;

  /* Colour — muted, not promotional */
  color: var(--color-text-3);
  opacity: 0.6;

  /* Tap target: visual size is 11px but hit area must be 44px minimum */
  display: inline-block;
  padding: 14px 20px; /* 14px vertical + 11px font = ~39px, supplement with margin trick */
  margin: -14px -20px; /* counteract padding visually */
  min-height: 44px;
  line-height: 44px;

  /* Transition */
  transition: opacity 0.15s ease;
}

.able-footer-link:hover,
.able-footer-link:focus-visible {
  opacity: 1;
}

/* Theme overrides */
[data-theme="light"] .able-footer-link {
  color: var(--color-text-3); /* inherits dark-on-light text token */
  opacity: 0.5;
}

[data-theme="contrast"] .able-footer-link {
  color: rgba(255, 255, 255, 0.4);
  opacity: 1; /* opacity already baked in; do not stack */
}

[data-theme="glass"] .able-footer-link {
  color: rgba(255, 255, 255, 0.5);
  /* glass background may be dark or light depending on artwork — use white with low opacity as safe default */
}
```

### Why these design decisions

- **11px, 500 weight, 0.6 opacity**: the footer is attribution, not a CTA. It should be visible to the curious but invisible to the uninvested. It must not compete with the artist's content.
- **44px tap target**: required by the mobile-first rules in CLAUDE.md. The padding/negative-margin trick achieves the tap target size without changing the visual footprint.
- **No ABLE logo mark or wordmark**: the ✦ symbol in the text copy is the only brand element. Adding a logo would make the footer feel like a promotional banner on the artist's page — which contradicts ABLE's positioning.

---

## 3. Referral link injection

This script runs on able-v7.html at DOMContentLoaded. It reads the artist's slug from the profile data and builds the footer URL with the `?ref=` parameter.

```javascript
/**
 * initFooterLink()
 * Sets the "Made with ABLE ✦" footer href to include the artist's slug
 * as a referral parameter. Falls back to the plain landing URL if no
 * slug is available.
 *
 * Called once on DOMContentLoaded.
 */
function initFooterLink() {
  const footerLink = document.getElementById('able-footer-cta');
  if (!footerLink) return;

  // Also record a click event when the footer is tapped
  footerLink.addEventListener('click', () => {
    recordClick('Made with ABLE', 'footer', footerLink.href);
  });

  // Determine the artist slug
  // Priority: URL path slug > localStorage profile slug > no slug (fallback)
  let slug = null;

  // 1. Read from URL path: ablemusic.co/nadia → 'nadia'
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    slug = pathParts[pathParts.length - 1];
  }

  // 2. Fallback: read from localStorage profile
  if (!slug) {
    try {
      const profile = JSON.parse(localStorage.getItem('able_v3_profile') || 'null');
      if (profile && profile.slug) slug = profile.slug;
    } catch (e) {
      // localStorage unavailable or profile corrupt — use fallback URL
    }
  }

  // 3. Set the href
  const base = 'https://ablemusic.co/';
  footerLink.href = slug
    ? `${base}?ref=${encodeURIComponent(slug)}`
    : base;
}

document.addEventListener('DOMContentLoaded', initFooterLink);
```

### Notes
- `encodeURIComponent` on the slug handles any unusual characters in artist slugs safely.
- The `recordClick` call uses type `'footer'` — a new click type added in the growth loop spec. See section 6 for the analytics extension.
- The click event listener is added inside `initFooterLink` to ensure the href is set before any analytics event fires.

---

## 4. Landing page — referral detection and personalisation

### URL parameter detection

```javascript
/**
 * initReferralLanding()
 * Reads ?ref= from the landing page URL.
 * Stores referral in sessionStorage so it persists to start.html.
 * Personalises the headline if a ref is present.
 *
 * Called once on DOMContentLoaded in landing.html.
 */
function initReferralLanding() {
  const params = new URLSearchParams(window.location.search);
  const ref = params.get('ref');

  if (!ref) return; // No referral — show standard landing experience

  // Persist referral across the session so start.html can capture it
  sessionStorage.setItem('able_referral', ref);

  // Attempt to personalise the headline
  // Phase 1: use the slug itself (capitalise first letter as name approximation)
  // Phase 2 (Supabase): query artist name from API and replace
  personaliseHero(ref);
}

/**
 * personaliseHero(slug)
 * Replaces the landing page hero headline and sub-headline with
 * a referral-aware version.
 *
 * @param {string} slug  Artist slug from ?ref= parameter
 */
function personaliseHero(slug) {
  // Phase 1: derive a display name from the slug
  // 'nadia-rose' → 'Nadia Rose', 'the-1975' → 'The 1975'
  const displayName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Target elements — IDs defined in landing.html hero section
  const headline  = document.getElementById('landing-headline');
  const subline   = document.getElementById('landing-subline');
  const heroCta   = document.getElementById('landing-hero-cta');

  if (headline) {
    headline.textContent = `${displayName} is on ABLE.`;
  }

  if (subline) {
    subline.textContent = 'Create your own free page. It takes about 8 minutes.';
  }

  if (heroCta) {
    heroCta.textContent = 'Create your free page →';
    // href already points to start.html — no change needed
  }

  // Phase 2 (Supabase): replace displayName with actual artist name from DB
  // fetchArtistName(slug).then(name => { if (name) headline.textContent = `${name} is on ABLE.`; });
}

document.addEventListener('DOMContentLoaded', initReferralLanding);
```

### Headline copy

The personalised headline has been through copy review. The final form:

| Context | Headline | Sub-headline |
|---|---|---|
| With `?ref=nadia` | "Nadia is on ABLE." | "Create your own free page. It takes about 8 minutes." |
| With `?ref=the-1975` | "The 1975 is on ABLE." | "Create your own free page. It takes about 8 minutes." |
| No `?ref=` | Standard landing hero | Standard landing sub-headline |

**Copy alternatives considered and rejected:**

| Candidate | Why rejected |
|---|---|
| "You found ABLE through Nadia." | Presumptuous — the fan may have tapped the footer out of curiosity, not because of Nadia specifically. |
| "Nadia's fans are on ABLE. Create your page →" | Implies ABLE is a fan platform — confusing. The visitor is potentially an artist. |
| "Nadia uses ABLE. You should too." | "You should too" is marketing-speak. Avoid. |
| "Join Nadia on ABLE." | "Join" implies a social network. ABLE is not a social network. |

**"[Name] is on ABLE." is correct because:**
- It is a statement of fact, not a marketing claim
- It lets the visitor draw their own conclusion
- It acknowledges the referral without over-explaining it
- It is consistent with ABLE's direct, honest tone

---

## 5. Referral capture in start.html

The referral slug persists through the wizard via `sessionStorage`. On wizard completion, it is written into the profile as `referredBy`.

```javascript
/**
 * captureReferral()
 * Called at the start of start.html to check for a carried referral.
 * Returns the referring artist's slug, or null if none.
 *
 * @returns {string|null}
 */
function captureReferral() {
  return sessionStorage.getItem('able_referral') || null;
}

/**
 * saveProfile(profileData)
 * Called on wizard completion in start.html.
 * Merges referral data into the profile before saving.
 *
 * @param {Object} profileData  Wizard output
 */
function saveProfile(profileData) {
  const referral = captureReferral();

  const profile = {
    ...profileData,
    ...(referral ? { referredBy: referral } : {}),
    createdAt: Date.now(),
  };

  localStorage.setItem('able_v3_profile', JSON.stringify(profile));

  // Clear referral from sessionStorage after capture
  // (sessionStorage clears on tab close anyway, but explicit is cleaner)
  if (referral) sessionStorage.removeItem('able_referral');
}
```

### Data schema addition

The `able_v3_profile` object gains one optional field:

```javascript
// Existing able_v3_profile shape (partial)
{
  name:          string,
  slug:          string,
  bio:           string,
  accent:        string,
  theme:         string,
  stateOverride: string | null,
  // ... other fields ...

  // New — optional, present only for referred signups
  referredBy:    string | null, // artist slug of the referring artist
  createdAt:     number,        // Unix ms timestamp of profile creation — also new
}
```

`referredBy` maps 1:1 to a `referred_by` column in the Supabase `profiles` table when the backend lands.

---

## 6. Analytics — growth loop events

### New ClickType value

`'footer'` is added to the `ClickType` union:

```typescript
type ClickType =
  | 'platform'
  | 'cta'
  | 'snap'
  | 'presave'
  | 'support'
  | 'share'
  | 'event'
  | 'footer';  // NEW — "Made with ABLE ✦" tap
```

### New AnalyticsSource value

`'footer'` is added to `AnalyticsSource` to represent visitors who arrived at landing.html via an artist's footer link:

```typescript
type AnalyticsSource =
  | 'ig'
  | 'tt'
  | 'sp'
  | 'qr'
  | 'story'
  | 'direct'
  | 'email'
  | 'fan-dashboard'
  | 'twitter'
  | 'footer'  // NEW — visitor arrived via "Made with ABLE ✦" footer tap
  | 'other';
```

This value must also be added to the canonical `SOURCE_VALUES` array in `docs/systems/CROSS_PAGE_JOURNEYS.md` and the `detectSource()` function in `docs/systems/analytics/SPEC.md`.

### Source detection extension

In `detectSource()` (analytics/SPEC.md §2.2), add:

```javascript
// After existing ?src= check, before referrer fallback
// If visitor arrived from an ABLE artist profile page
if (referrer.includes('ablemusic.co/')) return 'footer';
```

Note: `?ref=` is a referral parameter (who referred), not a source parameter (where visitor came from). They are complementary, not overlapping.

### Growth loop click event (fired on able-v7.html)

```javascript
// Fired inside initFooterLink() click listener
recordClick('Made with ABLE', 'footer', footerLink.href);
```

This is visible in the artist's admin analytics breakdown — they can see how many fans tapped the footer.

### Platform-level attribution (future — requires Supabase)

When Supabase is live:

```sql
-- Count signups referred by each artist
select
  p.slug        as referring_artist,
  p.name        as referring_artist_name,
  count(r.id)   as referred_signups
from profiles p
join profiles r on r.referred_by = p.slug
group by p.slug, p.name
order by referred_signups desc;
```

This is the "top referring artists" leaderboard — relevant for Phase 2 artist incentive evaluation.

---

## 7. Artist visibility — referred signups in admin.html (Phase 1)

Artists should know their page is generating growth. This is a signal of value, not a financial incentive.

### Admin nudge copy

When `referredSignups > 0`, show a nudge in the admin Fans section:

```
[artists-referred nudge]
"[N] artist[s] [has/have] created [their/a] page after visiting yours."
```

Examples:
- 1 signup: "1 artist has created a page after visiting yours."
- 3 signups: "3 artists have created their pages after visiting yours."

**Copy note:** "after visiting yours" is accurate and modest. It does not say "because of you" (too causal) or "inspired by you" (sentimental). The fact speaks for itself.

### Admin stat card (Phase 2)

A small stat in the "Your impact" section of admin — not a hero metric, but visible:

```
[Referrals card]
Label:  "Pages started from yours"
Value:  [N]
Delta:  "+[N] this month"
```

This card is only shown once `referredSignups >= 1`. Zero state: not shown — the card appearing for the first time is itself the milestone signal.

---

## 8. Edge cases and failure handling

| Scenario | Behaviour |
|---|---|
| Artist slug not available (no profile in localStorage, URL has no path slug) | Footer link points to `https://ablemusic.co/` without `?ref=` — no referral tracked, no broken link |
| Visitor taps footer from a slow connection | `initFooterLink()` is synchronous and runs at DOMContentLoaded — should always complete before tap is possible |
| `?ref=` contains an invalid/non-existent slug | Phase 1: `personaliseHero()` still runs with capitalised slug — display name may look odd but no crash. Phase 2: Supabase query returns null, fall back to generic headline |
| Multiple `?ref=` params in URL | `URLSearchParams.get('ref')` returns the first value. Subsequent values ignored. Acceptable. |
| Fan taps footer after already having visited landing.html with a different `?ref=` | `sessionStorage.setItem` overwrites the previous referral. The most recent referral wins. |
| Artist views their own profile (edit preview) | Footer link is visible and functional in preview. Click is tracked as `type: 'footer'` in `able_clicks`. Artist clicks are tagged `isArtist: true` on views but click events are not filtered — this is acceptable (artist testing their own footer is a meaningful signal). |
| start.html is opened directly without a `?ref=` session value | `captureReferral()` returns null. `referredBy` is omitted from profile. No error. |

---

## 9. What this spec does not cover

| Out of scope | Rationale |
|---|---|
| Artist directory (browsable grid of ABLE artists) | Requires Supabase — Phase 2 |
| "Artists like this" similar-artist strip on referred landing | Requires genre-clustered Supabase query — Phase 2 |
| Referral reward system (credits, discounts) | Deliberate V1 omission — re-evaluate if organic growth plateaus |
| "I'm on ABLE ✦" first-person variant of footer copy | Requires artist opt-in — evaluate after V1 ships |
| Growth loop for freelancer profiles (freelancer.html) | Phase 2 — freelancer profile spec not started |
| Fan.html "Made with ABLE ✦" footer | fan.html is an internal page — no growth loop footer needed |

---

## 10. Relation to other system docs

| Doc | Relationship |
|---|---|
| `docs/systems/CROSS_PAGE_JOURNEYS.md` | Add `'footer'` to `SOURCE_VALUES`. Update data flow table for landing.html (writes `able_referral` to sessionStorage). |
| `docs/systems/analytics/SPEC.md` | Add `'footer'` to `ClickType` and `AnalyticsSource`. Add referrer-based footer detection in `detectSource()`. |
| `docs/systems/data-architecture/SPEC.md` | Add `referredBy` and `createdAt` fields to `able_v3_profile` schema. |
| `docs/pages/landing/DESIGN-SPEC.md` | Add `id="landing-headline"`, `id="landing-subline"`, `id="landing-hero-cta"` to hero section elements. Document `initReferralLanding()` call. |
| `docs/pages/admin/DESIGN-SPEC.md` | Add "Pages started from yours" stat card (Phase 1 nudge, Phase 2 card). |
