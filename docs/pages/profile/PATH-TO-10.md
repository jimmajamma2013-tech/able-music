# Artist Profile — Path to 10
**File: `able-v7.html` | Created: 2026-03-15**
**From: 6.9/10 average → Target: 9.7+/10**

Each angle is addressed in ascending order of impact × build effort.

---

## ANGLE 8 — Empty State Experience: 3/10 → 9/10

This is the highest-impact single change. Everything else is refinement. This is structural.

### Current state
An artist who finishes onboarding and opens their profile sees:
- Artist name: "Artist Name" placeholder
- Artwork: gradient in default accent
- No music, no shows, no snap cards
- Empty sections with "No releases added yet" text

It looks like a template. It looks abandoned. Any fan who lands on it immediately leaves.

### The fix: Spotify auto-import

**Trigger:** Artist pastes Spotify URL during onboarding (Screen 0 of `start.html`).

**What fires (already specced in V8_BUILD_AUTHORITY.md §2.2):**
1. Spotify Web API: artist name, photos, top tracks, discography, genre
2. Last.fm artist.getInfo: 30-day listeners, bio text, tags → vibe suggestion
3. Ticketmaster Discovery API: upcoming shows → events section
4. (Async) MusicBrainz: credits enrichment

**Result:** Profile 70% populated in under 10 seconds. Artist arrives on their page with:
- Their name set
- Their artwork/photo in the hero
- Their top 3 releases visible
- Any upcoming shows populated
- A suggested bio (Last.fm, editable)

**Code change in `start.html` Screen 0:**
```javascript
async function importFromSpotify(url) {
  const artistId = extractSpotifyArtistId(url);
  if (!artistId) return;

  showImportProgress('Fetching your music...');

  const [spotify, lastfm, ticketmaster] = await Promise.allSettled([
    fetchSpotifyArtist(artistId),
    fetchLastfmArtist(name),
    fetchTicketmasterShows(name)
  ]);

  const profile = buildProfileFromImport({ spotify, lastfm });
  const shows = ticketmaster.status === 'fulfilled' ? ticketmaster.value : [];

  localStorage.setItem('able_v3_profile', JSON.stringify(profile));
  localStorage.setItem('able_shows', JSON.stringify(shows));

  showImportSuccess('Your music is ready. Let\'s set the look.');
  advanceToScreen(1); // Skip directly to vibe/theme screens
}
```

**Until Spotify import is built — immediate fix:**
- Hide empty sections from fan view entirely
- In owner mode only: show edit prompts per section (see COPY.md §14)
- Change profile defaults: no "Artist Name" placeholder; show nothing if not set

---

## ANGLE 5 — Copy Voice: 6/10 → 9/10

The second-highest leverage change after empty state. Every default needs rewriting.

### Changes required

**1. Section headers — add `My` to music section:**
```javascript
// In renderMusicSection():
const title = profile.musicSectionTitle || 'My music';
document.querySelector('.music-section .section-title').textContent = title;
```

**2. Events section header:**
```javascript
const title = profile.showsSectionTitle || 'Shows';
```

**3. Fan sign-up heading default:**
```javascript
const heading = profile.fanCaptureHeading || 'Stay close.';
```

**4. Fan sign-up sub default:**
```javascript
const sub = profile.fanCaptureSub
  || `Just your email. I'll reach out when something's actually happening.`;
```

**5. Fan submit button:**
```javascript
const btnText = profile.fanCaptureBtn || 'I\'m in';
```

**6. OG/meta description default:**
```javascript
const desc = profile.bio
  ? profile.bio.slice(0, 120) + ' — Music, shows, and more.'
  : `Music, shows, and more — direct from ${profile.name}.`;
document.getElementById('og-description').content = desc;
```

**7. Post-submit confirmation text:**
```javascript
// Replace the toast-only confirmation with an inline confirmation
document.querySelector('.fan-capture__heading').textContent =
  profile.fanCaptureConfirm || 'You\'re in. I\'ll keep you close.';
```

---

## ANGLE 6 — Fan Sign-up Completion: 7/10 (UI) → 9/10

The UI is good. The backend wiring is the gap.

### Required changes

**1. Supabase write on sign-up:**
```javascript
async function captureFan(email, source) {
  // 1. Write to localStorage immediately (optimistic)
  const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
  fans.push({ email, ts: Date.now(), source });
  localStorage.setItem('able_fans', JSON.stringify(fans));

  // 2. Write to Supabase
  const { error } = await supabase.from('fans').insert({
    artist_id: profile.artistId,
    email,
    source,
    double_opted_in: false,
    signed_up_at: new Date().toISOString()
  });

  if (!error) {
    // 3. Trigger Resend confirmation email via edge function
    await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        artistName: profile.name,
        artistId: profile.artistId,
        fanEmail: email
      })
    });
  }
}
```

**2. Resend edge function (Netlify):**
```javascript
// netlify/functions/send-confirmation.js
export default async (req) => {
  const { artistName, artistId, fanEmail } = await req.json();

  await resend.emails.send({
    from: `${artistName} via ABLE <noreply@ablemusic.co>`,
    to: fanEmail,
    subject: `Confirm you want to hear from ${artistName}`,
    html: `
      <p>${artistName} asked me to check this is actually you.</p>
      <p><a href="https://ablemusic.co/confirm?token=${token}">Confirm your email →</a></p>
      <p style="color:#999;font-size:12px;">If you didn't sign up, ignore this.</p>
    `
  });
};
```

---

## ANGLE 13 — Gig Mode: 6/10 → 9/10

Three additions: tonight note, post-show state, going tonight counter.

### 1. Tonight note field

**In admin.html gig mode panel — add text area:**
```html
<label>Write something about tonight (optional)</label>
<textarea
  id="tonightNote"
  placeholder="I've been looking forward to this for weeks. The room is small."
  maxlength="280"
  rows="3"
></textarea>
```

**On profile page — render above ticket CTA:**
```javascript
function renderGigMode(profile) {
  const note = profile.tonightNote;
  if (note) {
    const noteEl = document.getElementById('gig-tonight-note');
    noteEl.textContent = note;
    noteEl.style.display = 'block';
  }
}
```

```html
<!-- In hero section, gig state -->
<p class="gig-tonight-note" id="gig-tonight-note"
   style="display:none; font-size:var(--text-sm); color:var(--color-text-2);
          line-height:1.6; padding: var(--sp-3) 0; font-style:italic;">
</p>
```

### 2. Post-show state

```javascript
function computeGigPhase() {
  const expires = parseInt(localStorage.getItem('able_gig_expires') || '0');
  const showEndTime = parseInt(localStorage.getItem('able_gig_show_end') || '0');
  const now = Date.now();

  if (expires > now) return 'pre-show';
  if (showEndTime > 0 && now < showEndTime + 72 * 3600000) return 'post-show';
  return 'off';
}

function applyGigPhase(phase) {
  if (phase === 'pre-show') {
    document.getElementById('hero-cta-primary').textContent = 'Get tickets';
    document.getElementById('hero-cta-secondary').textContent = 'Stay close';
  }
  if (phase === 'post-show') {
    document.getElementById('hero-cta-primary').textContent = 'Stay close';
    document.getElementById('hero-cta-secondary').textContent = 'Merch';
    document.getElementById('gig-tonight-note').textContent =
      profile.postShowNote || 'Good night.';
  }
}
```

### 3. Going tonight counter

```javascript
async function tapGoingTonight() {
  const stored = localStorage.getItem('able_going_tonight_' + profile.gigId);
  if (stored) return; // Already tapped

  localStorage.setItem('able_going_tonight_' + profile.gigId, '1');

  // Optimistic increment
  const current = parseInt(document.getElementById('going-count').textContent) || 0;
  document.getElementById('going-count').textContent = current + 1;

  // Write to Supabase
  await supabase.from('gig_attendance').insert({
    artist_id: profile.artistId,
    gig_id: profile.gigId,
    ts: new Date().toISOString()
  });
}
```

```html
<div class="going-tonight" id="goingTonight" style="display:none">
  <span id="going-count">0</span> people going tonight
  <button onclick="tapGoingTonight()">I'm going</button>
</div>
```

---

## ANGLE 14 — Pre-release Mode: 7/10 → 9/10

### 1. Release note field (mirrors tonight note)

**In admin.html pre-release panel:**
```html
<label>Write something about this release (optional)</label>
<textarea
  id="releaseNote"
  placeholder="Two years making this. It's done. Wednesday."
  maxlength="280"
  rows="3"
></textarea>
```

**Renders in hero above pre-save CTA**, italic, artist voice.

### 2. Final 24h intensity shift

```javascript
function getCountdownIntensity(releaseDate) {
  const hoursLeft = (releaseDate - Date.now()) / 3600000;
  if (hoursLeft <= 24) return 'final-day';
  if (hoursLeft <= 72) return 'near';
  return 'normal';
}

function applyCountdownIntensity(intensity) {
  const hero = document.getElementById('app-shell');
  hero.setAttribute('data-countdown', intensity);
}
```

```css
/* Final 24h: countdown digits grow, background shifts toward accent */
[data-countdown="final-day"] .countdown__value {
  font-size: calc(var(--text-hero) * 1.15);
  color: var(--color-accent);
}
[data-countdown="final-day"] .hero__gradient {
  opacity: 0.85; /* slightly more intense */
}
```

---

## ANGLE 17 — Accessibility: 6/10 → 9/10

### 1. Skip navigation link

```html
<!-- First element inside <body> -->
<a href="#main-content" class="skip-nav">Skip to main content</a>
```

```css
.skip-nav {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-accent);
  color: var(--color-on-accent);
  padding: 8px 16px;
  z-index: 9999;
  text-decoration: none;
  font-weight: 600;
  transition: top 0.2s;
}
.skip-nav:focus {
  top: 0;
}
```

### 2. Section ARIA landmarks

```html
<section id="music-section" aria-labelledby="music-heading">
  <h2 id="music-heading" class="section-title sr-only">My music</h2>
  <!-- ... -->
</section>

<section id="events-section" aria-labelledby="events-heading">
  <h2 id="events-heading" class="section-title sr-only">Shows</h2>
</section>
```

### 3. Contrast audit pass

All accent × theme combinations need contrast check:
```javascript
// Utility — run at build/test time
function checkContrast(fg, bg) {
  // Returns WCAG contrast ratio
  const lum = (c) => {
    const s = parseInt(c, 16) / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const [r1,g1,b1] = [fg.slice(1,3), fg.slice(3,5), fg.slice(5,7)].map(lum);
  const [r2,g2,b2] = [bg.slice(1,3), bg.slice(3,5), bg.slice(5,7)].map(lum);
  const l1 = 0.2126*r1 + 0.7152*g1 + 0.0722*b1;
  const l2 = 0.2126*r2 + 0.7152*g2 + 0.0722*b2;
  return (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05);
}
```

Flag any accent × background combination below 4.5:1 for AA text.

### 4. Reduced motion — complete audit

```css
@media (prefers-reduced-motion: reduce) {
  /* Ensure ALL animations stop, not just the documented ones */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* Exception: opacity transitions for show/hide (not motion) */
  .fade-in {
    transition-duration: 300ms !important;
  }
}
```

---

## ANGLE 18 — Trust and Data Ownership: 6/10 → 9/10

### Single addition — trust line near fan sign-up

```html
<!-- Below the fan-capture input, above the submit button -->
<p class="fan-capture__trust">
  Your email goes to <span class="trust-artist-name"></span> directly.
  Not to any platform. You can leave any time.
</p>
```

```css
.fan-capture__trust {
  font-size: var(--text-xs);
  color: var(--color-text-3);
  line-height: 1.5;
  margin-top: var(--sp-2);
  text-align: center;
}
```

```javascript
// Populate artist name
document.querySelector('.trust-artist-name').textContent = profile.name || 'the artist';
```

This single line adds enormous trust weight without being verbose. The key phrases: "directly", "not to any platform", "you can leave any time."

---

## ANGLE 3 — Hero CTA Zone: 7/10 → 9/10

### Vibe-specific default CTA copy

```javascript
const VIBE_CTA_DEFAULTS = {
  electronic: { primary: 'Stream now',  secondary: 'Stay close.' },
  hiphop:     { primary: 'Stream now',  secondary: 'Stay close.' },
  rnb:        { primary: 'Listen',       secondary: 'Stay close.' },
  indie:      { primary: 'My music',     secondary: 'Stay close.' },
  pop:        { primary: 'Stream now',  secondary: 'Stay close.' },
  rock:       { primary: 'Stream now',  secondary: 'Stay close.' },
  acoustic:   { primary: 'Listen',       secondary: 'Stay close.' }
};

function getDefaultCTAs(vibe, state) {
  const defaults = VIBE_CTA_DEFAULTS[vibe] || VIBE_CTA_DEFAULTS.indie;
  if (state === 'gig')         return { primary: 'Get tickets',   secondary: 'Stay close.' };
  if (state === 'pre-release') return { primary: 'Pre-save',       secondary: 'My music' };
  if (state === 'live')        return { primary: defaults.primary, secondary: 'Stay close.' };
  return defaults;
}
```

---

## ANGLE 1 — First 3 Seconds: 7/10 → 9/10

### 1. Fix OG description default
Change the default meta description from "Artist profile powered by ABLE" to "[Artist Name] — Music, shows, and more."

```javascript
function setMetaTags(profile) {
  const name = profile.name || 'Artist on ABLE';
  const bio  = profile.bio ? profile.bio.slice(0, 120) : null;
  const desc = bio
    ? `${bio} — Music, shows, and more.`
    : `${name} — Music, shows, and more.`;

  document.getElementById('og-title').content       = name;
  document.getElementById('og-description').content  = desc;
  document.getElementById('tw-title').content        = name;
  document.getElementById('tw-description').content  = desc;
  document.title = `${name} — ABLE`;
}
```

### 2. FOUI fix — critical CSS inline for identity

The brief flash of default accent/vibe before `applyIdentity()` runs creates a visible reflow. Fix by inlining the identity CSS in a `<style>` block populated from localStorage before the first paint:

```javascript
// In <head>, before any render:
(function() {
  try {
    const p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
    const accent = p.accent || '#e07b3a';
    const vibe   = p.vibe   || 'indie';
    const theme  = p.theme  || 'dark';
    document.documentElement.style.setProperty('--color-accent', accent);
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-vibe', vibe);
  } catch(e) {}
})();
```

This runs before CSS parses. No visible flash.

---

## ANGLE 16 — Edit Mode: 5/10 → 8/10

Edit mode needs a complete rebuild — this is a Phase 1 admin task, not a quick fix. The plan:

### Zone coverage required

| Zone | Fields | Edit trigger |
|---|---|---|
| Identity | Name, bio, location, genre, theme, vibe, accent | Tap artist name |
| Top card | Artwork URL, embed URL, media type | Tap artwork |
| Hero CTAs | Primary text, primary URL, secondary text, secondary URL | Tap CTA zone |
| Quick actions | Platform name, URL, order | Tap pills row |
| Snap cards | Title, body, image, CTA | Tap any snap card |
| Releases | Title, artwork, stream URL, type, credits | Tap any release card |
| Shows | Venue, date, time, ticket URL | Tap any show card |

### Auto-save architecture

```javascript
// Debounced save on every field change:
function setupAutoSave(fieldEl, key, path) {
  let timer;
  fieldEl.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
      setNestedValue(profile, path, fieldEl.value);
      localStorage.setItem('able_v3_profile', JSON.stringify(profile));
      // When Supabase is wired: supabase.from('profiles').update({...}).eq('id', artistId)
      showSavedToast();
    }, 800);
  });
}
```

---

## ANGLE 19 — Cross-page Coherence: 7/10 → 9/10

### Verify and wire view-transition: artist-name

In `able-v7.html`, add to the hero artist name:
```css
.hero__name {
  view-transition-name: artist-name;
}
```

This must exactly match the name used in `start.html` Done screen:
```css
/* start.html */
.done-preview-artist-name {
  view-transition-name: artist-name;
}
```

Both pages need:
```css
@view-transition {
  navigation: auto;
}
```

### Admin → Profile transition

```css
/* able-v7.html */
.able-brand-name { view-transition-name: able-logo; }

/* admin.html */
.sb-logo-type { view-transition-name: able-logo; }
```

Already specced in admin DESIGN-SPEC.md. Verify it fires on the "Edit page →" link.

---

## PRIORITY ORDER FOR IMPLEMENTATION

1. **Empty state fix** — Spotify import (most impact, unlocks the whole artist journey)
2. **Fan activation chain** — Supabase write + Resend confirmation email (completes the core fan journey)
3. **Copy voice defaults** — artist-first defaults everywhere (no-code-change required, just copy change)
4. **Gig mode: tonight note** — single textarea in admin → render on profile (1–2 hours)
5. **Trust line** — single HTML element near sign-up (30 minutes)
6. **OG/meta fix** — correct the default description (15 minutes)
7. **FOUI fix** — inline identity CSS in head (30 minutes)
8. **Skip nav + ARIA landmarks** — accessibility pass (2 hours)
9. **Gig mode: post-show state** (2–3 hours)
10. **Pre-release: release note + final-day intensity** (2–3 hours)
11. **View-transition wiring** — verify artist-name transition fires (1 hour)
12. **Edit mode rebuild** — Phase 1, significant effort

---

## SCORE PROJECTION AFTER ALL CHANGES

| Angle | Current | After path-to-10 |
|---|---|---|
| 1. First 3 Seconds | 7 | 9 |
| 2. Primary Job | 7 | 9 |
| 3. Hero CTA Zone | 7 | 9 |
| 4. Page State System | 8 | 9.5 |
| 5. Copy Voice | 6 | 9 |
| 6. Fan Sign-up | 7 | 9.5 |
| 7. Music Section | 7 | 9 |
| 8. Empty State | 3 | 9 |
| 9. Mobile Experience | 8 | 9 |
| 10. Performance | 7 | 9 |
| 11. Theme System | 8 | 9 |
| 12. Identity System | 8 | 9.5 |
| 13. Gig Mode | 6 | 9.5 |
| 14. Pre-release Mode | 7 | 9 |
| 15. Micro-interactions | 8 | 9 |
| 16. Edit Mode | 5 | 8 |
| 17. Accessibility | 6 | 9 |
| 18. Trust and Data | 6 | 9.5 |
| 19. Cross-page | 7 | 9.5 |
| 20. Big Picture | 7 | 9.5 |
| **Average** | **6.9** | **9.2** |
