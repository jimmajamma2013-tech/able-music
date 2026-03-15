# fan.html — Path to 10
**Date: 2026-03-15**
**Baseline score: 5.85/10**
**Target: 9.4/10 (V1 ceiling — final 0.6 requires Supabase realtime)**

---

## The governing problem

The page scores 5.85 not because of what it contains, but because of what happens before a fan gets to see it. A fan signs up through an artist's page. They receive a confirmation email. They tap the link. They land on fan.html — and the page has no idea who they are, why they are there, or which artist brought them.

That moment of arrival — cold, blank, generic — is the page's most damaging failure. Fix it and the score jumps from 5.85 to approximately 8.0 before touching anything else.

Everything in P0 addresses arrival. P1 addresses completeness. P2 addresses permanence.

---

## P0 — Critical gaps (5.85 → 7.5)

### P0.1 — Post-sign-up arrival flow (Angle 13: 2/10)

**The problem:** Fan clicks the confirmation email link. They land on fan.html. Nothing acknowledges the artist they just signed up through. The page shows generic demo data or a blank state. The relationship's most fragile moment — the first 10 seconds after sign-up — is completely wasted.

**The fix: URL parameter arrival scheme**

The confirmation email link (or the in-page post-sign-up CTA) must carry the artist slug:

```
fan.html?artist=nadia&ref=signup
```

On load, fan.html reads these parameters:

```javascript
const params = new URLSearchParams(window.location.search);
const artistSlug = params.get('artist');   // 'nadia'
const ref = params.get('ref');             // 'signup'

if (artistSlug) {
  // 1. Add artist to fan's following list in localStorage
  const following = JSON.parse(localStorage.getItem('fan_following') || '[]');
  if (!following.includes(artistSlug)) {
    following.push(artistSlug);
    localStorage.setItem('fan_following', JSON.stringify(following));
  }

  // 2. If first visit (ref=signup or ref=email-confirm), set first-visit flag
  if (ref === 'signup' || ref === 'email-confirm') {
    localStorage.setItem('fan_first_visit_artist', artistSlug);
    localStorage.setItem('fan_first_visit_ts', Date.now().toString());
  }

  // 3. Clean URL — replace state so back button still works
  window.history.replaceState({}, '', 'fan.html');
}
```

**What happens next on first arrival:**

The Following tab renders the artist slug's content at the top. If Nadia has items in her data, Today strip shows them first. If not, the cold-start suggestion row appears below an honest message:

```
You followed Nadia. Here's what she's shared.
```

If Nadia has nothing new today:
```
Nothing new from Nadia today — but she's here when she is.
```

No blank state ever.

**Canonical URL scheme:**

| Scenario | URL |
|---|---|
| In-page post-sign-up tap | `fan.html?artist=nadia&ref=signup` |
| Confirmation email link | `fan.html?artist=nadia&ref=email-confirm` |
| QR code scan at venue | `fan.html?artist=nadia&ref=qr` |
| Direct URL (returning fan) | `fan.html` (no params) |
| Pre-save email link | `fan.html?artist=nadia&ref=presave` |

---

### P0.2 — Empty state redesign (Angle 10: 5/10 and Angle 11: 3/10)

Three distinct scenarios. Three distinct responses.

**Scenario A: First visit, just arrived from sign-up (`fan_first_visit_artist` set)**

```
You followed [Artist name].

They're here when they have something to share.

While you're here —
```

Followed immediately by the cold-start row (P0.4 below).

**Scenario B: Fan has followed artists but nothing new today**

```
Nothing new from your artists today.
```

If last item was yesterday: `[Artist name] posted something yesterday.`
If last item was 7+ days ago: `It's been a quiet week. Your artists will be back.`
If only one artist followed: `Nothing new from [Artist name] today.`

**Scenario C: Returning fan, no artists followed (new device or cleared localStorage)**

```
Your following list is empty.

Find artists from their pages, or look through Discover.

→ Discover artists
```

**Rules for all empty states:**
- No emoji (violates ABLE's register)
- No exclamation marks
- No "all caught up" (generic SaaS copy)
- Direct CTA to Discover when the list is genuinely empty
- Never apologise for the empty state — acknowledge it honestly
- First-visit state and returning-fan state are treated differently

---

### P0.3 — Artist-to-fan sign-up handoff (Angle 12: 4/10)

**The problem:** The link from able-v7.html's sign-up success state does not carry the artist context. A fan signs up for Nadia, taps "Your ABLE page →", lands on fan.html with no awareness of who they just signed up through.

**The fix:** When the sign-up success UI renders on able-v7.html, the link to fan.html must be constructed from the artist profile in localStorage:

```javascript
// On able-v7.html sign-up success:
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const slug = profile.slug || profile.name?.toLowerCase().replace(/\s+/g, '-') || 'artist';
const fanDashUrl = `fan.html?artist=${encodeURIComponent(slug)}&ref=signup`;
// Render: <a href="${fanDashUrl}">Your ABLE page →</a>
```

**Confirmation email footer (when wired to Supabase):**

```
See everything from [Artist Name] — and find artists you might love.
[Your ABLE page →] → fan.html?artist={slug}&ref=email-confirm
```

`ref=email-confirm` is distinct from `ref=signup` so arrival analytics can separate the two paths. Both register the same way on fan.html — they set `fan_first_visit_artist` — but the source difference is visible in admin analytics.

---

### P0.4 — Cold-start suggestions on first arrival

When `fan_first_visit_artist` is set and the fan follows exactly one artist, show an inline suggestion row below the feed:

```
Because you follow [Artist name] —
```

Followed by 2–3 artist cards with honest reason strings:
- "Same sound" (shared genre)
- "Produced by [Producer name]" (credit connection)
- "Also from [City]" (location match)
- "New to ABLE" (recently joined)

Never: "You might like", "Recommended for you", "People like you also follow."

This is the cold-start mechanism V8_BUILD_AUTHORITY §6.1 requires. A fan following 3+ artists has dramatically higher 30-day retention. This row is the mechanism to get them there. It requires no backend — it works with DEMO_CONNECTED data in v1.

---

### P0.5 — Page title and vocabulary audit (Angle 3: 5/10)

**Page title:**
```html
<!-- Current (wrong) -->
<title>ABLE — Your feed</title>

<!-- Correct -->
<title>ABLE</title>
```

**Bottom tab bar label:**
```
Feed → Following
```

The word "feed" appears 3 times in the current build. All three instances must be changed. "Following" is correct. "Feed" belongs to Instagram.

**Personalised greeting (v1 — localStorage only):**

When `fan_name` is set (from sign-up form capture):
- 05:00–11:59 → `Good morning, [Name].`
- 12:00–17:59 → `Good afternoon, [Name].`
- 18:00–04:59 → `Good evening, [Name].`

When `fan_name` is not set: No greeting copy. The ABLE wordmark is sufficient. Do not render "Hello" or "Welcome back" — they add nothing and feel generic.

**Sub-greeting line (conditional — only show when true):**

```javascript
const todayCount = getTodayItemCount();
const showTonight = getShowTonightCount();

if (todayCount > 1) {
  subGreeting = `${todayCount} new things from your artists today.`;
} else if (todayCount === 1) {
  subGreeting = `Something new from ${getFirstTodayArtistName()} today.`;
} else if (showTonight > 0) {
  subGreeting = `${getShowTonightArtistName()} is playing near you tonight.`;
} else {
  subGreeting = null; // render nothing
}
```

Never manufacture context. If there is nothing to say, say nothing.

---

### P0.6 — Feed item quality fixes (Angle 4: 7/10)

**Newest first — always:**
```javascript
items.sort((a, b) => b.age - a.age); // descending — most recent at top
```

**Caught-up state rewrite:**
```
— you're up to date —
```
Sub-line: only show `Refreshed just now` when a real Supabase fetch completed. Remove it entirely in v1.

**Type badge copy changes:**
| Type | Current | Correct |
|---|---|---|
| release | Release | New music |
| event | Show | Show |
| merch | Merch | Merch |
| snap | Update | From the artist |

**Artist name in feed items:** Raise from `var(--color-text-3)` to `var(--color-text-2)`, weight 500. The artist name is the most important piece of information in a feed item. It cannot be the dimmest text on the row.

---

## P1 — Completeness (7.5 → 8.8)

### P1.1 — Discover tab (Angle 5: 6/10 and Angle 17: 7/10)

**Default filter change:** Connected becomes the default (not Emerging). Connected is the most ABLE-specific filter — artists discovered through human relationships (production credits), not algorithms. Landing here first differentiates ABLE from every other music platform.

**Filter pill copy changes:**
| Current | Correct |
|---|---|
| Emerging | New to ABLE |
| Connected | Connected |
| By vibe | By sound |
| Just dropped | Just dropped |

"Emerging" implies velocity ranking. "New to ABLE" is honest.
"By vibe" is acceptable but "By sound" is more specific to music.

**Remove follower counts from all artist cards.** Follower counts introduce a popularity hierarchy, discourage following smaller artists, and imply the kind of algorithmic ranking ABLE is built to avoid. Replace with: location and genre only.

**Creatives section:** Rename from `Creatives` to `The people behind the music`. Add sub-label: "Producers, mixers, and collaborators who worked on music from artists you follow." Show only on the Connected filter — it has no logical home on the other filters.

**Connected filter section header:**
Current: `Connected to artists you follow`
Correct: `Artists connected to yours`

---

### P1.2 — Near me tab (Angle 6: 6/10)

**Location input on first Near me visit:**

When `fan_location` is not set and the fan first taps Near me:

```
Where are you based?

We'll tell you when your artists are playing near you.

[Enter your city]
```

One input. No account required. Saves to `fan_location` in localStorage on blur or Enter.

**Correct date-relative grouping:**
```javascript
const now = new Date();

function groupShow(show) {
  const showDate = new Date(show.date); // ISO date string from able_shows
  const tonightEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  const thisWeekEnd = new Date(now.getTime() + 7 * 86400000);

  if (showDate <= tonightEnd) return 'tonight';
  if (showDate <= thisWeekEnd) return 'this-week';
  return 'coming-up';
}
```

This replaces the broken `parseInt(s.day) <= 20` logic entirely. Show group labels:
```
TONIGHT     ← new — for shows within today
THIS WEEK
COMING UP
```

**Show items for followed artists:** Show both the artist's accent-colour left strip AND a ticket button when `ticketUrl` is present. The current build shows only a "Following" badge but a fan already following the artist may still want tickets.

**Show items for non-followed artists:** Add a one-tap "Follow" button inline. A fan seeing a show from an artist they don't know yet is the best cold-start moment in the entire product.

**Followed artists prioritised at top** of each group.

**"Tonight note" from gig mode:** When an artist has set a gig mode note, display it as artist voice beneath the venue line:
```
[Artist name]
[Venue] · [City]
"The room holds 800. It's been a long time coming." ← artist's own words
[Tonight →]
```

**Location edit label:** Change "Change" to "Change city".

---

### P1.3 — Pre-release strip (feeds Angle 2 and Angle 20)

When a followed artist has `stateOverride = 'pre-release'` or a future `releaseDate`, fan.html shows a countdown strip at the top of the Following view, above the Today section:

```
COUNTING DOWN
[Artist name] — [Release title] — [N days / N hours]
→ Pre-save
```

Strip uses the artist's accent colour as the left border, consistent with feed item design language.

Maximum 3 strips. If more: "And [N] more upcoming releases →" collapses the rest.

**v1 localStorage check:**
```javascript
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const releaseDate = profile.releaseDate ? new Date(profile.releaseDate) : null;
const isPreRelease = releaseDate && releaseDate > new Date();
```

---

### P1.4 — Source tracking from fan.html (cross-page)

All taps from fan.html to artist profiles must tag the source:

```javascript
function openArtistProfile(slug) {
  window.location.href = `able-v7.html?slug=${slug}&src=fan-dashboard`;
}
```

`src=fan-dashboard` maps to the canonical `fan_dash` value in `SOURCE_VALUES` (CROSS_PAGE_JOURNEYS.md). This makes fan.html clickthrough visible in artist analytics on admin.html.

---

### P1.5 — Notification bell (Angle 12: 4/10)

The notification pip is currently hardcoded visible and does nothing on tap. Fix both:

**Pip visibility — only show when there are genuine unread items:**
```javascript
const unreadCount = getUnreadItemCount(); // items added since fan_last_seen_ts
pip.style.display = unreadCount > 0 ? 'block' : 'none';
```

**Bell tap:** Opens a bottom sheet using the shared bottom sheet pattern from DESIGN_SYSTEM_SPEC.md §9. Title: `Updates from your artists`. Empty state: `Nothing new right now.`

**New localStorage key:** `fan_last_seen_ts` — unix timestamp of the last time the fan opened the Following tab. Used to calculate unread count.

---

### P1.6 — Accessibility fixes (Angle 15: 7/10)

**`color-text-3` contrast:** Current `rgba(224,230,240,.38)` = ~3.2:1 on `#0d0e1a`. WCAG AA requires 4.5:1. Fix: `rgba(224,230,240,.55)` = ~4.6:1. This is a global Surface 1 token change — applies to fan.html and able-v7.html.

**Filter pills:** Add `aria-pressed` to active state:
```javascript
pill.setAttribute('aria-pressed', String(p === pill));
```

**Feed item accessible names:** Include time-ago:
```javascript
el.setAttribute('aria-label',
  `${artist.name} — ${item.title}, ${typeBadgeLabel}, ${formatAge(item.age)}`);
```

**Notification pip:** Add `aria-live="polite"` with count:
```html
<span class="notif-pip" aria-live="polite" aria-label="3 unread updates from your artists"></span>
```

---

## P2 — Permanence (8.8 → 9.4)

### P2.1 — Offline / no-connection graceful state

When Supabase data fails to load:
```
Couldn't reach the server.
Showing what we have cached.
```

Fan sees their cached localStorage data. No blank screen. No error modal. Small inline notice at the top of the Following tab only. Service worker caches fan.html, fonts, and last known data.

---

### P2.2 — PWA manifest and add-to-home-screen

**PWA manifest spec:**
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

**Add-to-home-screen prompt:** Triggered after 3rd visit. One quiet prompt, once. Dismissed = never show again.

**Visit tracking:**
```javascript
const visitCount = parseInt(localStorage.getItem('fan_visit_count') || '0') + 1;
localStorage.setItem('fan_visit_count', visitCount.toString());

if (visitCount === 3 && !localStorage.getItem('fan_pwa_dismissed')) {
  showAddToHomeScreenNudge();
}
```

---

### P2.3 — Supabase realtime updates

When Supabase is live, fan.html subscribes to real-time changes on `moments` and `shows` for followed artists:

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

Supabase realtime unlocks the final 0.6 points to reach a theoretical 10:
- True cross-device following persistence
- Live "an artist just dropped something" without page reload
- Push notifications via Web Push API
- Close Circle dispatch delivery

---

### P2.4 — Push notification opt-in

After a fan has 2+ followed artists and has visited 3+ times:

```
Get notified when [Artist name] drops something.

We'll only message you when something real happens.

[Turn on]     [Not now]
```

Uses Web Push API. Permission deferred until moment of genuine value — never on first visit. `fan_push_opted_in` prevents repeat asking.

---

### P2.5 — View transition from artist profile to fan.html

Progressive enhancement (Chrome 126+):

```css
/* able-v7.html */
.fan-dashboard-link {
  view-transition-name: fan-nav;
}

/* fan.html */
.shell-header {
  view-transition-name: fan-nav;
}
```

The ABLE wordmark slides from the artist profile header into the fan dashboard header. Fallback: standard navigation. No degradation for unsupported browsers.

---

## Score trajectory

| Phase | Score | Key changes |
|---|---|---|
| Baseline | 5.85/10 | Current state |
| P0 complete | 7.5/10 | Arrival URL scheme + empty states + page title + sign-up handoff |
| P1 complete | 8.8/10 | Discover improvements + Near me fixes + pre-release strip + source tracking |
| P2 complete | 9.4/10 | PWA + offline + Supabase realtime |
| Supabase live | ~10/10 | Real data + push notifications + Close Circle |

---

## New localStorage keys introduced by this spec

| Key | Type | Set by | Used by | Notes |
|---|---|---|---|---|
| `fan_following` | `string[]` | fan.html on URL param arrival | fan.html | Confirm canonical name — already in SPEC.md |
| `fan_location` | `string` | fan.html Near me input | fan.html Near me | Confirm canonical name — already in SPEC.md |
| `fan_first_visit_artist` | `string` | fan.html on `?ref=signup` or `?ref=email-confirm` | first-visit orientation | New |
| `fan_first_visit_ts` | `number` | fan.html on arrival params | analytics | New |
| `fan_name` | `string` | sign-up form (Phase 2 with auth) | fan.html greeting | New — Phase 2 |
| `fan_last_seen_ts` | `number` | fan.html when Following tab is opened | notification pip unread count | New |
| `fan_visit_count` | `number` | fan.html on every load | PWA prompt logic | New |
| `fan_pwa_dismissed` | `boolean` | fan.html PWA prompt dismiss | PWA prompt | New |
| `fan_push_opted_in` | `boolean` | push notification opt-in | notification prompt | New — Phase 2 |
