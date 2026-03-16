# ABLE — PostHog Analytics Spec
**Created: 2026-03-16 | Covers: event tracking across all 4 active pages**

> PostHog is not yet integrated. Nothing is tracked. This file is the complete integration spec: which events to track, on which pages, with which properties, and how to add the PostHog script to each page. A developer reading this file can implement the full V1 analytics layer end-to-end.

---

## Why PostHog over Google Analytics

| Factor | PostHog | Google Analytics 4 |
|---|---|---|
| GDPR compliance | EU Cloud: compliant without cookie banner for first-party analytics | Requires cookie consent banner in EU |
| Data ownership | ABLE owns the data; exportable in full | Google holds the data |
| Self-hostable | Yes — ABLE can self-host if needed | No |
| EU data residency | EU Cloud (`eu.posthog.com`) | Data may leave EU |
| Feature flags | Built-in | Requires separate tool |
| Session recordings | Built-in (useful for UX debugging) | Limited |

Confirm GDPR compliance details with current PostHog documentation before launch. Use EU Cloud endpoint.

---

## Auth

PostHog uses a **publishable API key** — it is safe to include in client-side JavaScript. There is no secret involved in sending events from the browser.

```javascript
posthog.init('phc_YOUR_PROJECT_API_KEY', {
  api_host: 'https://eu.i.posthog.com',  // EU Cloud
  person_profiles: 'identified_only',     // GDPR: only create profiles for identified users
})
```

Get the API key from: PostHog Dashboard → Project → Settings → API Keys → Project API Key.

---

## Script installation (add to all 4 active pages)

Add inside `<head>` on: `able-v7.html`, `admin.html`, `start.html`, `landing.html`.

```html
<!-- PostHog analytics — EU Cloud -->
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]);t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+" (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('phc_YOUR_PROJECT_API_KEY', {
    api_host: 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
  })
</script>
```

Replace `phc_YOUR_PROJECT_API_KEY` with the actual key once the PostHog project is created.

---

## Events to track: `able-v7.html` (fan-facing profile)

These are the events with the highest signal value — they tell ABLE which CTAs drive action and how fans arrive.

```javascript
// Page view — fire once on load
posthog.capture('profile_view', {
  artist_handle: artistSlug,     // e.g. 'nadia'
  source: urlSource,             // from ?src= param — 'ig'|'tt'|'sp'|'qr'|'direct'
  page_state: currentPageState,  // 'profile'|'pre-release'|'live'|'gig'
  theme: profile.theme,          // 'dark'|'light'|'glass'|'contrast'
})

// CTA tapped — hero zone, quick actions, section actions
posthog.capture('cta_tapped', {
  label: cta.label,         // e.g. 'Pre-save Echoes'
  type: cta.type,           // 'stream'|'presave'|'tickets'|'merch'|'support'|'custom'
  zone: ctaZone,            // 'hero'|'quick_action'|'section'
  artist_handle: artistSlug,
  page_state: currentPageState,
})

// Fan sign-up
posthog.capture('fan_signup', {
  artist_handle: artistSlug,
  source: signupSource,    // from ?src= param
  page_state: currentPageState,
})

// Platform pill tapped
posthog.capture('platform_pill_tapped', {
  platform: platformName,  // 'Spotify'|'Instagram'|'TikTok'|'Apple Music'|'Bandcamp'
  artist_handle: artistSlug,
})
```

---

## Events to track: `admin.html` (artist dashboard)

These events answer "which dashboard features are artists actually using?"

```javascript
// Profile saved
posthog.capture('profile_saved', {
  has_release: !!profile.releaseTitle,
  page_state: profile.state,
  theme: profile.theme,
  feel: profile.feel,
})

// Campaign state changed
posthog.capture('campaign_state_changed', {
  from: previousState,
  to: newState,
})

// Gig mode activated
posthog.capture('gig_mode_activated')

// Fan list viewed
posthog.capture('fan_list_viewed', {
  fan_count: fans.length,
  starred_count: fans.filter(f => f.isStarred).length,
})

// Release added / edited
posthog.capture('release_saved', {
  release_type: release.type,  // 'album'|'single'|'ep'
  has_artwork: !!release.artworkUrl,
})

// Section reordered or toggled
posthog.capture('section_toggled', {
  section: sectionId,   // 'music'|'events'|'merch'|'snap-cards'|'support'
  visible: isVisible,
})
```

---

## Events to track: `start.html` (onboarding wizard)

Funnel events — where do artists drop off?

```javascript
// Wizard step reached
posthog.capture('wizard_step_viewed', { step: stepNumber })

// Spotify import outcome
posthog.capture('spotify_import', {
  result: 'success'|'failed'|'skipped',
  error_code: errorCode || null,
})

// Wizard completed
posthog.capture('wizard_completed', {
  has_release: !!wizardState.releaseTitle,
  has_artwork: !!wizardState.importedArtworkUrl,
  used_import: !!wizardState.importedSpotifyUrl,
  vibe: wizardState.vibe,
})
```

---

## Events to track: `landing.html` (marketing page)

Conversion funnel — landing page to wizard start.

```javascript
// Demo phone interacted with
posthog.capture('demo_interacted', {
  state: currentDemoState,  // which of the 4 profile states is showing
})

// Pricing viewed (scroll into view)
posthog.capture('pricing_viewed')

// CTA tapped — any "Get started" / "Your page is free →" button
posthog.capture('landing_cta_tapped', {
  tier: tierName,  // 'free'|'artist'|'pro'|'label'
  position: 'hero'|'pricing',
})

// Wizard started (artist arrived at start.html from landing.html)
posthog.capture('wizard_started', {
  referrer: document.referrer,
})
```

---

## Identifying artists (once auth is wired)

After an artist signs in via Supabase auth, identify them in PostHog so events are attributed to a real user:

```javascript
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  posthog.identify(user.id, {
    email: user.email,
    artist_slug: profile.artistSlug,
    tier: profile.tier,
  });
}
```

Do not identify fans — fan events on `able-v7.html` are anonymous and should stay that way.

---

## GDPR note

PostHog EU Cloud (`eu.i.posthog.com`) stores data in the EU. With `person_profiles: 'identified_only'`, PostHog does not create profiles for anonymous visitors — only for identified artists. This configuration is designed to be compliant without a cookie banner for first-party analytics.

Verify this remains accurate against current PostHog documentation before launch.

---

## Current score and path to complete

**Score: 0/10 → 8/10**

Nothing is tracked currently.

Path to 8/10:
1. Create PostHog project at `eu.posthog.com`
2. Get the publishable API key
3. Add the PostHog init script to all 4 active pages
4. Add the events listed above to each page — start with `profile_view`, `cta_tapped`, `fan_signup`, `wizard_completed`
5. Verify events appear in PostHog Live Events view
6. Set up the core funnel: `landing_cta_tapped → wizard_step_viewed(0) → wizard_completed → fan_signup`
