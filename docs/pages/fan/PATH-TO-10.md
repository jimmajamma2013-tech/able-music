# fan.html — Path to 10
**Last updated: 2026-03-16**
**Stage 6A of the 8-stage strategy process**
**Baseline score: 5.9/10 → Current: ~7.8/10 (P0 + P1 implemented)**
**Target: 10/10**
**V1 ceiling (localStorage only): 9.4/10**

## Implementation status

### P0 — IMPLEMENTED 2026-03-16
- [x] P0.1 — URL arrival flow (`?artist=slug&ref=signup`)
- [x] P0.2 — Empty state rewrites (three scenarios, no emoji, no "all caught up")
- [x] P0.4 — Cold-start suggestions row ("Because you follow X —")
- [x] P0.5 — Title fix (`ABLE`), "Feed" → "Following", caught-up copy, snap badge copy, artist name weight/color
- [x] P0.6 — Feed artist name raised to color-text-2 / weight 500; release badge "New music"; snap "From the artist"

### P1 — IMPLEMENTED 2026-03-16
- [x] P1.1 — Discover defaults to Connected (not Emerging)
- [x] P1.1 — Filter copy: "Emerging" → "New to ABLE", "By vibe" → "By sound"
- [x] P1.1 — Follower counts removed; location shown instead
- [x] P1.1 — "Creatives" → "The people behind the music"
- [x] P1.1 — "Artists connected to yours" Connected section header
- [x] P1.2 — Near me location input on first visit (near-location-capture UI in place, session 17)
- [x] P1.3 — Pre-release countdown strip in Following view (renderPreReleaseStrips implemented, session 13)
- [ ] P1.4 — Notification pip real logic (needs Supabase backend)

### P2 — TODO
- [ ] Close Circle invitation copy stub
- [ ] Supabase query specs
- [ ] View transitions

---

## The governing problem

The page scores 5.9 not because of what it contains, but because of what happens before a fan gets to see it.

A fan signs up through an artist's page. They receive a confirmation email. They tap the link. They land on fan.html — and the page has no idea who they are, why they are there, or which artist brought them.

That moment of arrival — cold, blank, generic — is the page's most damaging failure. Fix it and the score jumps from 5.9 to approximately 8.0 before touching anything else.

Everything in P0 addresses arrival. P1 addresses completeness. P2 addresses permanence.

---

## What the three fan personas need (distilled)

**Priya (The Loyalist):** History honoured. Pre-release countdown for her followed artist. Close Circle as a natural next step. Show alerts before they sell out.

**Tom (The New Convert):** Cold-start suggestions the moment he lands. Near me show if his artist is playing his city. Pre-release countdown if his artist has one. Nothing new today is honest, not a failure.

**Amara (The Superfan):** Close Circle that works. Dispatch reading experience as a letter. "You heard this N days early" on release items. Supporter status that persists.

---

## P0 — Critical gaps (5.9 → 7.5)

### P0.1 — Post-sign-up arrival flow

**The problem:** Fan clicks the confirmation email link. They land on fan.html. Nothing acknowledges the artist they just signed up through.

**The fix: URL parameter arrival scheme**

```javascript
const params = new URLSearchParams(window.location.search);
const artistSlug = params.get('artist');
const ref = params.get('ref');

if (artistSlug) {
  const following = JSON.parse(localStorage.getItem('fan_following') || '[]');
  if (!following.includes(artistSlug)) {
    following.push(artistSlug);
    localStorage.setItem('fan_following', JSON.stringify(following));
  }

  if (ref === 'signup' || ref === 'email-confirm') {
    localStorage.setItem('fan_first_visit_artist', artistSlug);
    localStorage.setItem('fan_first_visit_ts', Date.now().toString());
  }

  // Clean URL
  window.history.replaceState({}, '', 'fan.html');
}
```

**Canonical URL scheme:**

| Scenario | URL |
|---|---|
| In-page post-sign-up tap | `fan.html?artist=nadia&ref=signup` |
| Confirmation email link | `fan.html?artist=nadia&ref=email-confirm` |
| QR code scan at venue | `fan.html?artist=nadia&ref=qr` |
| Direct URL (returning fan) | `fan.html` (no params) |
| Pre-save email link | `fan.html?artist=nadia&ref=presave` |

---

### P0.2 — Empty state system

Three distinct scenarios. Three distinct responses. Never the same response.

**Scenario A: First visit, just arrived from sign-up (`fan_first_visit_artist` set)**

```
You followed [Artist name].

They're here when they have something to share.

While you're here —
```

Followed immediately by the cold-start row.

**Why this works:** Names the artist who brought them (the relationship is named). Sets honest expectation (the artist posts when they have something real). Signals worth returning to. Opens the door to discovery without demanding it.

**Scenario B: Fan has followed artists but nothing new today**

If last item was yesterday:
```
Nothing new today. [Artist name] shared something yesterday.
```

If last item was 2–6 days ago:
```
Nothing new from your artists today.
```

If last item was 7+ days ago:
```
It's been a quiet week. Your artists will be back.
```

If only one artist followed:
```
Nothing new from [Artist name] today.
```

**Scenario C: Returning fan — no artists followed**

```
Your following list is empty.

Find artists from their pages, or look through Discover.

→ Discover artists
```

**Rules:** No emoji. No exclamation marks. No "all caught up." Direct CTA to Discover only when the list is genuinely empty. Never apologise for the empty state — acknowledge it honestly.

---

### P0.3 — Artist-to-fan sign-up handoff from able-v7.html

**The fix:** When sign-up success UI renders on able-v7.html, the link to fan.html must carry the artist context:

```javascript
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const slug = profile.slug || profile.name?.toLowerCase().replace(/\s+/g, '-') || 'artist';
const fanDashUrl = `fan.html?artist=${encodeURIComponent(slug)}&ref=signup`;
// Render: <a href="${fanDashUrl}">Your ABLE page →</a>
```

**Confirmation email footer (when Supabase is live):**
```
See everything from [Artist Name] — and find artists you might love.
[Your ABLE page →] → fan.html?artist={slug}&ref=email-confirm
```

---

### P0.4 — Cold-start suggestions on first arrival

When `fan_first_visit_artist` is set and the fan follows exactly one artist, show an inline suggestion row below the feed:

```
Because you follow [Artist name] —
```

Followed by 2–3 artist cards with honest reason strings:
- "Produced [Artist name]'s last record" (most specific — use first)
- "Co-wrote with [Artist name]"
- "Same sound" (shared genre — use as fallback)
- "Also from [City]" (location match)
- "New to ABLE" (last resort)

**Never:** "You might like", "Recommended for you", "People like you also follow."

**Why this matters:** The 3-artist threshold — fans who follow 3+ artists have dramatically higher 30-day and 90-day retention. This row is the mechanism to get them there. It requires no backend — works with demo `CONNECTED_DATA` in v1.

---

### P0.5 — Page title and vocabulary audit

```html
<!-- Current (wrong) -->
<title>ABLE — Your feed</title>

<!-- Correct -->
<title>ABLE</title>
```

Bottom tab bar:
```
Feed → Following
```

"Feed" appears 3 times in the current build. All three instances changed. "Following" is correct. "Feed" belongs to Instagram.

**Personalised greeting (v1 — localStorage only):**
When `fan_name` is set:
- 05:00–11:59: `Good morning, [Name].`
- 12:00–17:59: `Good afternoon, [Name].`
- 18:00–04:59: `Good evening, [Name].`

When `fan_name` not set: No greeting. Do not render "Hello" or "Welcome back."

**Sub-greeting (conditional):**
```javascript
const todayCount = getTodayItemCount();
const showTonight = getShowTonightCount();
const preReleaseCount = getPreReleaseCount();

if (showTonight > 0) {
  subGreeting = `${getShowTonightArtistName()} is playing near you tonight.`;
} else if (todayCount > 1) {
  subGreeting = `${todayCount} new things from your artists today.`;
} else if (todayCount === 1) {
  subGreeting = `Something new from ${getFirstTodayArtistName()} today.`;
} else if (preReleaseCount > 0) {
  subGreeting = `${getNextReleaseArtistName()} drops in ${getDaysUntilRelease()} days.`;
} else {
  subGreeting = null;
}
```

Never manufacture context. If nothing is genuinely true, say nothing.

---

### P0.6 — Feed item quality fixes

**Newest first — always:**
```javascript
items.sort((a, b) => normaliseAge(b) - normaliseAge(a));
```

**Caught-up state rewrite:**
```
— you're up to date —
```

Sub-line: only show `Refreshed just now` when a real Supabase fetch completed. Remove in v1.

**Type badge copy:**
```
Release → New music
Show → Show (unchanged)
Merch → Merch (unchanged)
Snap → From the artist
```

**Artist name in feed items:** Raise from `var(--color-text-3)` to `var(--color-text-2)`, weight 500. The artist name is the most important piece of information in a feed item.

**Data normalisation:**
```javascript
function normaliseAge(item) {
  if (typeof item.age === 'number') return item.age;
  if (typeof item.age === 'string') return new Date(item.age).getTime();
  if (item.published_at) return new Date(item.published_at).getTime();
  return 0;
}
```

---

## P1 — Completeness (7.5 → 8.8)

### P1.1 — Discover tab

**Default filter:** Connected (not "Emerging"). Connected is the most ABLE-specific filter — artists discovered through human relationships (production credits), not algorithms. Landing here first differentiates ABLE from every other music platform.

**Filter pill copy:**
```
Emerging → New to ABLE
By vibe → By sound
```

**Remove follower counts.** Replace with location and genre.

**Creatives section:** Rename from "Creatives" to "The people behind the music." Sub-label: "Producers, mixers, and collaborators who worked on music from artists you follow." Show on Connected filter only.

**Connected filter section header:**
```
Artists connected to yours
```

---

### P1.2 — Near me tab

**Location input on first Near me visit:**

When `fan_location` not set and fan first taps Near me:
```
Where are you based?

We'll tell you when your artists are playing near you.

[Enter your city]
```

One input. No account required. Saves to `fan_location` in localStorage.

**Correct date-relative grouping:**
```javascript
function groupShow(show) {
  const now = new Date();
  const showDate = new Date(show.date);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const thisWeekEnd = new Date(now.getTime() + 7 * 86400000);

  if (showDate <= todayEnd) return 'tonight';
  if (showDate <= thisWeekEnd) return 'this-week';
  return 'coming-up';
}
```

Show group labels: TONIGHT / THIS WEEK / COMING UP

**Show items for followed artists:** Both accent-colour left strip AND ticket button when `ticketUrl` present.

**Show items for non-followed artists:** One-tap "Follow" button inline. Best cold-start moment in the product.

**Tonight note from gig mode:**
```
[Artist name]
[Venue] · [City]
"[Artist's own words, in quotes]"
[Tonight →]
```

---

### P1.3 — Pre-release strip

When a followed artist has `stateOverride = 'pre-release'` or a future `releaseDate`:

```
COUNTING DOWN
[Artist name] — [Release title] · [N days] / [N hours]
→ Pre-save
```

Strip uses the artist's accent colour as left border. Maximum 3 strips. If more: "And [N] more upcoming releases →"

**V1 localStorage check:**
```javascript
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const releaseDate = profile.releaseDate ? new Date(profile.releaseDate) : null;
const isPreRelease = releaseDate && releaseDate > new Date();
```

---

### P1.4 — Source tracking from fan.html

All taps from fan.html to artist profiles tag the source:

```javascript
function openArtistProfile(slug) {
  window.location.href = `able-v7.html?slug=${slug}&src=fan-dashboard`;
}
```

`src=fan-dashboard` maps to the canonical `fan_dash` value in `SOURCE_VALUES`. This makes fan.html clickthrough visible in artist analytics on admin.html.

---

### P1.5 — Notification bell

**Pip visibility:**
```javascript
const unreadCount = getUnreadItemCount(); // items added since fan_last_seen_ts
pip.style.display = unreadCount > 0 ? 'block' : 'none';
pip.setAttribute('aria-label', `${unreadCount} unread updates from your artists`);
```

**Bell tap:** Opens bottom sheet. Title: `Updates from your artists`. Empty state: `Nothing new right now.`

**`fan_last_seen_ts`:** Unix timestamp of the last time the fan opened the Following tab.

---

### P1.6 — Accessibility fixes

**`color-text-3` contrast:** `rgba(240,237,232,.55)` = ≈ 4.6:1 on `#0d0e1a`. WCAG AA compliant.

**Filter pills `aria-pressed`:**
```javascript
pill.setAttribute('aria-pressed', String(p === pill));
```

**Feed item accessible names include time-ago:**
```javascript
el.setAttribute('aria-label',
  `${artist.name} — ${item.title}, ${typeBadgeLabel}, ${formatAge(normaliseAge(item))}`);
```

**Notification pip:**
```html
<span class="notif-pip" aria-live="polite" aria-label="3 unread updates from your artists"></span>
```

---

## P2 — Permanence (8.8 → 9.4)

### P2.1 — Offline graceful state

When Supabase data fails to load:
```
Couldn't reach the server.
Showing what we have cached.
```

Fan sees cached localStorage data. No blank screen. No error modal. Small inline notice at top of Following tab only.

Service worker caches fan.html, fonts, and last known localStorage state. Cache-first strategy.

---

### P2.2 — PWA manifest

```json
{
  "name": "ABLE",
  "short_name": "ABLE",
  "description": "The artists you follow, in one place.",
  "start_url": "/fan.html",
  "display": "standalone",
  "background_color": "#0d0e1a",
  "theme_color": "#8b7cf4",
  "icons": [
    { "src": "/icons/able-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/able-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Add-to-home-screen prompt after 3rd visit. Once only. Copy:
```
Add ABLE to your home screen?

One tap to see what's new from your artists.

[Add]     [Not now]
```

Visit tracking:
```javascript
const visitCount = parseInt(localStorage.getItem('fan_visit_count') || '0') + 1;
localStorage.setItem('fan_visit_count', visitCount.toString());

if (visitCount === 3 && !localStorage.getItem('fan_pwa_dismissed')) {
  showAddToHomeScreenNudge();
}
```

---

### P2.3 — Supabase realtime subscriptions

```javascript
supabase
  .channel('fan-moments')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'moments',
    filter: `artist_slug=in.(${followedSlugs.join(',')})`
  }, (payload) => {
    prependFeedItem(payload.new);
    updateUnreadPip();
  })
  .subscribe();
```

Supabase realtime unlocks the final ~0.6 points to approach 10:
- True cross-device following persistence
- Live feed update without page reload
- Push notifications via Web Push API
- Close Circle dispatch delivery

---

### P2.4 — Push notification opt-in

After 2+ followed artists and 3+ visits:

```
Get notified when [Artist name] drops something.

We'll only message you when something real happens.

[Turn on]     [Not now]
```

Permission deferred until moment of genuine value — never on first visit. `fan_push_opted_in` prevents repeat asking.

**Notification types that qualify as "something real":**
1. New release from followed artist
2. Show tonight from followed artist in fan's city
3. Close Circle dispatch from followed artist (for supporters)

No other notification type should ever be sent. This is a product contract created by the opt-in copy.

---

### P2.5 — View transition from artist profile to fan.html

Progressive enhancement (Chrome 126+):

```css
/* able-v7.html */
.fan-dashboard-link {
  view-transition-name: fan-nav-wordmark;
}

/* fan.html */
.fan-header .wordmark {
  view-transition-name: fan-nav-wordmark;
}
```

ABLE wordmark slides between pages. Fallback: standard navigation. No degradation for unsupported browsers.

---

### P2.6 — Slug → UUID resolution

**The problem:** fan.html localStorage stores artist slugs (`fan_following = ['nadia', 'tendai']`). Supabase `fan_follows` uses UUIDs.

**The solution:** On sign-up handoff, resolve the UUID at the point of artist profile sign-up and store both:

```javascript
// On able-v7.html sign-up success, before generating fan.html link:
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const slug = profile.slug;
const uuid = profile.uuid;  // stored when Supabase auth is live

// Store both in fan.html localStorage:
const following = JSON.parse(localStorage.getItem('fan_following_full') || '[]');
if (!following.find(a => a.slug === slug)) {
  following.push({ slug, uuid });
  localStorage.setItem('fan_following_full', JSON.stringify(following));
}
```

Phase 1 (v1): `fan_following` stores slugs only — works for localStorage-only mode.
Phase 2 (Supabase): `fan_following_full` stores `{slug, uuid}` objects — used for Supabase queries.

---

## Score trajectory

| Phase | Score | Key changes |
|---|---|---|
| Baseline | 5.9/10 | Current state |
| P0 complete | 7.5/10 | Arrival URL scheme, empty state rewrites, page title, cold-start |
| P1 complete | 8.8/10 | Discover defaults, Near me location, pre-release strip, source tracking |
| P2 complete | 9.4/10 | PWA, offline, view transitions, Supabase query specs |
| Supabase live | ~9.8/10 | Real data, realtime feed, Close Circle functional, push notifications |
| Auth live | ~10/10 | First-name greeting, cross-device following, CC dispatches reading as letters |

---

## New localStorage keys introduced by this spec

| Key | Type | Set by | Used by |
|---|---|---|---|
| `fan_following` | `string[]` | fan.html URL param arrival | fan.html |
| `fan_following_full` | `{slug, uuid}[]` | fan.html Phase 2 | Supabase queries |
| `fan_location` | `string` | fan.html Near me input | fan.html Near me |
| `fan_first_visit_artist` | `string` | fan.html on `?ref=signup` | first-visit orientation |
| `fan_first_visit_ts` | `number` | fan.html on arrival | analytics |
| `fan_name` | `string` | sign-up form (Phase 2) | fan.html greeting |
| `fan_last_seen_ts` | `number` | fan.html Following tab open | notification pip unread count |
| `fan_visit_count` | `number` | fan.html every load | PWA prompt logic |
| `fan_pwa_dismissed` | `boolean` | PWA prompt dismiss | PWA prompt |
| `fan_push_opted_in` | `boolean` | push opt-in prompt | notification prompt |
| `cc_invited_[slug]` | `boolean` | CC invitation dismiss | CC invitation shown once per artist |

---

## What requires Supabase (cannot be done in v1)

| Feature | Why |
|---|---|
| Real feed items | `moments` table |
| Cross-device following | `fan_follows` table |
| Close Circle payments | Stripe Connect requires server-side |
| Dispatch delivery | `dispatches` table + email sending |
| Real-time feed update | Supabase realtime subscriptions |
| Push notification delivery | Web Push requires server-side key management |
| First-name greeting | Auth required |
| Per-artist notification prefs | `fan_notification_preferences` table |
| Functional data export | Server-side query of all fan data |

---

## What can be done before Supabase (V1, localStorage only)

All P0 items: arrival URL scheme, empty state rewrites, page title, cold-start, type badges, caught-up copy.
All P1 items: Discover defaults, Near me location + date fix, pre-release strip, source tracking, notification pip, accessibility.
All P2 items: PWA manifest, service worker (basic), view transition, push notification prompt (UI only — no actual push delivery until Supabase), CC invitation copy stub, data export (JSON from localStorage).
