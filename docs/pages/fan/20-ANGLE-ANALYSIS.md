# fan.html — 20-Angle Analysis (Pass 1)
**Date: 2026-03-15**
**Version assessed: current fan.html (localStorage / demo data, no Supabase)**

Scores are honest assessments of the page as it exists today. 10 means nothing meaningful to improve. 1 means broken or absent.

---

## Angle 1 — First 3 Seconds
**Score: 6/10**

What happens when a fan lands on their dashboard for the first time?

The page loads cleanly. The dark background matches the artist profiles they signed up from. The header shows "ABLE" in a clean wordmark, which is correct. The content tabs (Following / Discover / Near me) are clear and make sense immediately.

What's missing: the first thing a fan sees is a header with no personalisation and demo data items that feel generic. There is no acknowledgement of who they are or why they're here. The title is literally "ABLE — Your feed" — using the word "feed" is a direct violation of ABLE's copy philosophy. There's no orientation moment: "You signed up from [Artist Name]'s page. Here's what's happening."

The first 3 seconds work at the structural level but miss the emotional moment of connection entirely.

**What would make this 9/10:** A personalised header ("Good morning, Maya — here's what's new") + the first item being from the artist they signed up through + page title changed from "Your feed" to something honest.

---

## Angle 2 — Primary Job
**Score: 7/10**

The page's primary job is: show fans what is happening with the artists they follow, so they never miss something they care about.

The Following tab with Today / This week strips does this job adequately with demo data. The structure is correct. Items have artist name, content title, type badge, and time-ago. Feed items are scannable at a glance. Tap targets are large enough on mobile.

What's missing: the "Today" section shows demo items with made-up timestamps. The logic correctly filters to 24h / 7-day windows, but when real data arrives, there is no handling for an empty Today with items only in "This week" — the page would show "Nothing new today." which is correct, but abrupt. No fallback context ("Last time an artist posted was 3 days ago"). The primary job works in demo mode but hasn't been stress-tested against real usage patterns.

The ordering within Today is chronological (oldest first based on the demo data array). It should be newest first.

**What would make this 9/10:** Newest-first ordering, honest empty-state that names when something last happened, contextual header line ("2 new things from your artists today").

---

## Angle 3 — Copy Voice
**Score: 5/10**

Several violations of ABLE's voice present in the current build:

**Violations found:**
- `<title>ABLE — Your feed</title>` — "feed" is explicitly banned vocabulary
- Empty state: "No one in your feed yet" — "feed" again
- Empty state body: "Follow artists from their ABLE page" — corporate, not warm
- Near me empty state: "We'll show you shows from artists near your location as they get added" — passive SaaS copy
- Discover label: "Emerging artists" — acceptable but generic
- "Connected to artists you follow" — acceptable
- Artist card: `${followers} fans` — using "fans" here is fine, but the number is presented with no context
- Caught-up state: "You're all caught up / Updated moments ago" — "You're all caught up" is classic generic SaaS. "Updated moments ago" is meaningless.
- `type-badge` labels: "Release", "Show", "Merch", "Update" — "Update" for snap cards is weak. Could be "From the artist" or just removed as a badge for snaps.
- Tab label: "Feed" (bottom tab bar) — the word "feed" appears 3 times in the UI

**What's right:**
- "Follow" / "Following" button text is neutral and correct
- "This week" / "Today" labels are clean and temporal, not algorithmic
- "Near me" is honest language
- Type badge "Show" (not "Event") is good — more human

**What would make this 9/10:** Systematically replace "feed" throughout. Rewrite empty states in artist voice. Replace "You're all caught up" with something specific and warm. Full copy audit in COPY.md.

---

## Angle 4 — Following Feed
**Score: 7/10**

The structural split of Today / This week is correct and the right call. Chronological within each strip is sensible. The visual treatment of feed items is clean: artist initials in accent colour, title, subtitle, type badge, time-ago.

**Issues:**
1. Items ordered oldest-to-newest within sections (the first item in Today in demo data is "2h ago", then "5h ago" — that's not reverse-chronological, actually both are within Today, but the ordering isn't explicitly newest-first)
2. The "Caught up" state fires even when there are items — it shows after any feed renders. Logic: `if (feed.length) caughtUp.style.display = 'block'` — this fires whenever feed.length > 0, meaning it always shows after items. That's arguably correct (the user is "caught up" having just seen all items) but it immediately shows after render which feels odd.
3. No visual distinction between unread and already-seen items (requires persistence — not possible without auth, fair for v1)
4. The "Nothing new today." text when todayItems is empty is bare — no context about when something last happened
5. `feed-item__artist` is shown in `color-text-3` (dim) but is one of the most important pieces of information — which artist this is from. It should be more prominent.
6. Feed items don't have a clear tap affordance. The click handler opens `item.url` if it exists — but in demo data, no items have URLs. So taps do nothing, which is a dead-end interaction.

**What would make this 9/10:** Newest-first guarantee in sort logic, fix the silent tap-does-nothing interaction with a clear destination, dim the caught-up state instead of showing it immediately after render.

---

## Angle 5 — Discovery
**Score: 6/10**

Four filter tabs: Emerging / Connected / By vibe / Just dropped. The structure is correct and the Connected filter is genuinely the most interesting ABLE-specific feature — artists discovered through production credits, not algorithmic similarity. This is the credits network in action from the fan's perspective.

**Issues:**
1. The "Emerging" filter copies use "emerging" language which implies velocity/momentum signals — but the demo data just shows any artists, not actually velocity-sorted. The honest version would be "New to ABLE" or "Rising" with an honest explanation of what "emerging" means
2. The "Why" reason strings in demo data ("Similar to artists you follow", "Based in London") are correct in principle but inconsistently applied — some cards have reasons, some don't
3. Discovery shows follower counts: "1.2k fans", "843 fans" — this is a metric that creates a popularity hierarchy. It's a slippery slope toward algorithmic thinking. Better to show location and genre, not audience size.
4. The "Just dropped" filter is release-only. The section only shows new releases, not new artists who just joined ABLE or just dropped their first record (which would be more interesting and more ABLE-specific)
5. The Creatives section appears under both Emerging and Connected filters with no clear logic for when it appears vs. doesn't. It's disconnected from the filter context.
6. Genre filter works but the label above the grid just changes to the genre name without explaining what it's showing ("Electronic" alone as a section header is weak)

**What would make this 9/10:** Remove follower counts from discovery cards. Make Connected the default filter (it's the most ABLE-specific and most differentiated). Be honest about what "Emerging" means. Creatives section only on Connected filter.

---

## Angle 6 — Near Me
**Score: 6/10**

The Near me tab works at a structural level. Shows are grouped into This week / Coming up. Each show item has date block, artist name, venue, city, time, and either a "Following" badge or a "Tickets" button.

**Issues:**
1. Location is hardcoded to "London, UK" — there is no mechanism to actually detect or store fan location in the current build. The "Change" button does nothing. This is a dead interaction.
2. The date-splitting logic is naive: `parseInt(s.day) <= 20` for "this week" — this will break immediately with real data (day 20 in April is not "this week" relative to today)
3. Show items from non-followed artists appear without a "Follow" option — you can get tickets but there's no prompt to follow them. This is a missed cold-start moment.
4. The show item for a followed artist shows a "Following" badge but no ticket button — the fan is already following them but may still want tickets. Both pieces of information are useful.
5. No empty state for "no shows from your artists" separately from "no shows in your city" — these are different situations with different emotional weight.
6. The "Near me" section currently shows all artists (followed and not-followed) in the same list. The spec says "artists near you" — this should prioritise followed artists at the top.

**What would make this 9/10:** Real location storage (even just manually entered city in localStorage), correct date-relative grouping, show both "Following" badge AND ticket button, add "Follow" to non-followed show items.

---

## Angle 7 — Mobile Experience
**Score: 8/10**

The core mobile experience is strong. The shell width of 390px is correct for the iOS simulator target. Bottom tab bar with `env(safe-area-inset-bottom)` is handled. Scroll area has `overscroll-behavior: contain` and `-webkit-overflow-scrolling: touch`. Touch feedback on press with `transform: scale(0.98)` feels right. The `-webkit-tap-highlight-color: transparent` is applied.

**Issues:**
1. The content tabs (Following / Discover / Near me) are not horizontally scrollable — if a fourth or fifth tab were added, they would overflow. This is fine for now but worth noting.
2. The filter pills in Discover have `overflow-x: auto` with `scrollbar-width: none` — correct, but there's no scroll shadow or gradient to indicate more content to the right.
3. The bottom tab bar is 3 tabs — exactly right. The active state is colour-only (no label weight change or underline) — accessible given the text label is always visible, but colour contrast should be verified on the platform accent.
4. Feed items at 44px minimum height — need to verify this holds. The feed-item padding is `12px 16px` with 46px artwork, which gives adequate height.
5. No pull-to-refresh gesture handling — with real data this will be missed.
6. The page shell uses `min-height: 100dvh` correctly.

**What would make this 9/10:** Pull-to-refresh stub (even just visual), scroll shadow on filter pill overflow, ensure all interactive items are ≥ 44px in hit target.

---

## Angle 8 — Performance
**Score: 8/10**

Single HTML file. No external JS bundles. Fonts loaded via Google Fonts with `preconnect`. CSS is inline — no render-blocking stylesheet. Demo data renders immediately on `DOMContentLoaded` — no API wait. Lazy rendering: Discover and Near Me only render when their tab is first activated.

**Issues:**
1. PostHog and Microsoft Clarity analytics scripts load synchronously in `<head>` — PostHog in particular uses `document.createElement('script')` with `p.async=1` but the initialisation code still runs synchronously. Could be moved to `defer` or bottom of body.
2. No explicit `loading="lazy"` on any images — not relevant yet since there are no real images (only CSS-generated initials), but needed for when real artist artwork is loaded.
3. The `bloom-in` animation runs on every `feed-item`, `artist-card`, and `show-item` — with many items this could cause layout jank if not GPU-composited. The animation uses only `opacity` and `translateY` which are compositor-safe, but worth noting.
4. No skeleton states — when real data loads asynchronously, there will be a blank-then-populate flash.
5. Correctly honours `prefers-reduced-motion` — all animations disabled.

**What would make this 9/10:** Analytics scripts deferred, skeleton loading states for when real Supabase data is being fetched, confirmed LCP/CLS metrics.

---

## Angle 9 — Artist Card Design
**Score: 7/10**

Artist cards in the Discover view are well-structured. The left accent strip with the artist's colour is a good design decision — it makes the card feel like it belongs to that artist. Initials in accent colour. Name, genre, follower count, "why" reason, and follow button.

Feed items in the Following view use a simpler treatment — square artwork block with initials, artist name dimmed above the title, type badge and time-ago on the right. This is clean and scannable.

**Issues:**
1. Artist initials only — no real artwork even when URLs might be available. This is a v1 constraint but worth naming clearly.
2. The `feed-item__artist` (the artist name above the content title in the feed) is rendered in `var(--color-text-3)` — the dimmest text colour. The artist name is actually the most critical piece of information in a feed item and should be more prominent or at least equal to the title.
3. Artist cards in Discover show `${artist.followers} fans` — the follower count is presented as a social signal. This runs counter to ABLE's non-algorithmic philosophy. It also makes less popular artists look smaller, which discourages follow.
4. The "active" dot indicator on some cards (green dot) is a nice touch but the signal it's based on ("active recently") is undefined in real terms — what triggers this?
5. No real artwork or photo treatment defined — when real artwork is added, the CSS will need updating.
6. Cards have no clear tap destination. Tapping an artist card should navigate to their ABLE profile.

**What would make this 9/10:** Remove follower counts from cards, artist name more prominent in feed items, define what "active" means and wire it to real data, all artist cards tap to their ABLE profile URL.

---

## Angle 10 — Empty State
**Score: 5/10**

There are three empty state scenarios the page handles:

1. **Empty following (no artists followed):** Shows emoji + "No one in your feed yet" + "Follow artists from their ABLE page and you'll see their releases, shows, and drops right here." — The copy is functional but cold. Uses "feed" (banned). Doesn't orient the fan to what to do next or acknowledge how they got here.

2. **Empty Today (nothing new today but has followed artists):** Shows "Nothing new today." in small muted text inline within the Today section. This is honest but bare. No context about when something last happened. No warmth.

3. **Near me empty:** Shows emoji + "No shows nearby" + passive platform copy ("We'll show you shows...").

**What's missing:**
- First-visit empty state is different from returning-fan empty state — they are treated the same. A first-time visitor needs orientation. A returning visitor who has been away for a week and has nothing new needs a different message.
- The empty Following state has no "Discover artists" CTA — the clearest recovery action is not surfaced.
- No cold-start support: when a fan signs up from one artist's page, they should be shown 2–3 connected artists immediately. V8_BUILD_AUTHORITY.md §6.1 explicitly mandates this as part of the cold-start strategy ("surface 2–3 connected or similar artists immediately post-sign-up"). This is absent.

**What would make this 9/10:** Rewrite all empty state copy in ABLE voice. Add "Find artists" CTA to empty following state. Implement cold-start surfacing of 2–3 connected artists on first visit.

---

## Angle 11 — Onboarding (First Visit)
**Score: 3/10**

The current fan.html has no first-visit experience at all. There is no:
- Orientation: "You signed up from [Artist]'s page. Here's their latest."
- Cold-start suggestion: "People who follow [Artist] also follow..." (V8_BUILD_AUTHORITY.md §6.1)
- Location setup: "Where are you based? We'll tell you about shows near you." — the page assumes London
- Name/preference collection: not needed immediately but the hook isn't there
- Explanation of what this page is and why it exists

The fan lands on a page with demo data and no context. If they have real data (they followed one artist), they see one artist's items and nothing else. The 30-day retention target of 40–55% (V8_BUILD_AUTHORITY §6.1) requires a minimum of 3 followed artists. There is no mechanism to get there from the first visit.

The onboarding is not a multi-step wizard — it should be a gentle in-context moment: "You're following 1 artist. Follow 2 more and you'll never miss a drop."

**What would make this 9/10:** First-visit detection via localStorage flag, cold-start 2–3 connected-artist suggestions shown inline in the Following feed, location collection prompt on first visit to Near me, soft nudge toward following more artists.

---

## Angle 12 — Notification / Signal Design
**Score: 4/10**

There is a notification bell icon in the header with a purple pip (indicating unread notifications). Tapping it does nothing — no notification panel, no dropdown, no navigation. It is a visual decoration.

There is no push notification infrastructure wired. There is no in-app notification centre. The pip is always visible (hardcoded in HTML) regardless of whether there are actual notifications.

The signal design for individual items (type badges, time-ago) is clean and correct. But the higher-level signalling — what's new, what needs attention — is absent.

What the notification system should do, per V8_BUILD_AUTHORITY.md:
- Pre-release countdown for followed artists
- New release from followed artist
- Show tonight from followed artist in fan's city
- Close Circle dispatch (supporter-only)
- Post-show notification (after gig mode ends)

None of this is wired.

**What would make this 9/10:** Notification panel as a bottom sheet (tapping bell opens it), real unread state from localStorage or Supabase, clear action per notification type, notification pip only shown when there are actual unread items.

---

## Angle 13 — Close Circle
**Score: 2/10**

Close Circle does not appear on fan.html at all. There is no section, no entry point, no mention of the supporter tier anywhere in the fan dashboard.

Per V8_BUILD_AUTHORITY.md §7 and §6.1, Close Circle is a key part of the fan experience:
- Fan dashboard should show "Close Circle status" per followed artist
- For each artist where the fan is a supporter: status, recent dispatches
- For artists where they are not: tasteful invitation surfaced at the right moment

The V8 copy for this is settled: "You've been following [Artist Name] since [month]. Some fans go a bit further — they hear new music a few days early, they get first access to shows. It's £5 a month, directly to [Artist Name]. Keep things as they are, or come closer."

None of this exists in fan.html.

**What would make this 9/10:** Close Circle section in the Following view, per-artist supporter status, invitation copy at the right moment (minimum 14 days after sign-up), dispatches shown for supporters in the feed with a supporter-only indicator.

---

## Angle 14 — Privacy and Trust
**Score: 7/10**

The current build stores data in localStorage only. There is no data leaving the device. No personal information is collected on this page. Fan identity is not tracked or sold.

The trust messaging from ABLE's philosophy ("Your list. Not Spotify's.") is not present anywhere in fan.html — it doesn't need to be front-and-centre, but a settings page or a small "why ABLE" moment would reinforce the promise.

**Issues:**
1. PostHog and Microsoft Clarity analytics are installed on fan.html. These third-party scripts track user behaviour. This is legitimate product analytics but somewhat at odds with the "no algorithm, your data" positioning.
2. No data export option visible to fans — the fan can't download their following list
3. No notification preference controls per artist (V8_BUILD_AUTHORITY.md §6.1 specifies "Fan settings: notification preferences per artist, privacy, export list")
4. The "Me" tab in the bottom bar leads nowhere — it does nothing in the current build

**What would make this 9/10:** Fan settings accessible from "Me" tab with per-artist notification preferences, export option, transparent statement about what data is stored and why.

---

## Angle 15 — Accessibility (WCAG 2.2 AA)
**Score: 7/10**

The accessibility fundamentals are in place:
- `role="tablist"` and `role="tab"` with `aria-selected` on content tabs
- `role="tabpanel"` with `aria-labelledby` on view panels
- `role="article"` on feed items
- `aria-label` on icon buttons
- `:focus-visible` ring defined (2px solid rgba accent)
- `prefers-reduced-motion` respected — all animations disabled

**Issues:**
1. `aria-label` on feed items uses the format `${artist.name} — ${item.title}, ${typeBadgeLabel}` — this is reasonable but the time-ago (`${formatAge(item.age)}`) is not included in the accessible name, which means screen reader users don't get the timing context
2. The filter pills in Discover have `role="group"` but no `aria-pressed` or `aria-selected` to indicate which is active — the active state is visual only
3. Colour contrast: `var(--color-text-3)` at `rgba(240, 237, 232, 0.38)` on `#0d0e1a` — this is approximately 3.2:1 contrast ratio. AA requires 4.5:1 for normal text. All text using `color-text-3` fails WCAG AA.
4. The notification pip has no screen reader text — it signals "unread notifications" visually but not semantically (there is no `aria-live` or `aria-label` on the pip)
5. The "Change" location button in Near me has `aria-label="Change location"` — correct
6. Focus ring uses `rgba(139, 124, 244, 0.75)` opacity — at 75% opacity the ring may not meet contrast requirements on all backgrounds

**What would make this 9/10:** Fix `color-text-3` contrast ratio (increase opacity to ~0.55–0.60), add `aria-pressed` to filter pills, add `aria-live="polite"` to notification pip with count, include time-ago in feed item accessible names.

---

## Angle 16 — Cross-page Coherence
**Score: 7/10**

fan.html shares the same dark theme (`--color-bg: #0d0e1a`) and DM Sans font as able-v7.html. The overall visual language feels consistent with the artist profiles fans signed up from.

**Issues:**
1. The artist profiles (able-v7.html) use accent colours heavily — the fan profile uses a single neutral platform accent (`#8b7cf4`) for all ABLE UI. This is correct for ABLE's own UI but the artist cards do show individual accent colours via inline style, which maintains coherence.
2. Feed items use initials only. Artist profiles use real artwork. When a fan goes from a polished artist profile back to fan.html, the text-initials feel like a downgrade.
3. The "bottom bar has the label 'Feed'" — on artist profiles there is no bottom bar. The fan dashboard introduces a navigation paradigm that doesn't exist on artist profiles. This is fine and expected but should be visually consistent with any future fan-facing navigation.
4. Page title is "ABLE — Your feed" — this doesn't match the voice of artist profile pages which use the artist's name.
5. The platform accent `#8b7cf4` is close to but distinct from the indigo vibe accent `#9b7cf4`. This is intentional — ABLE's UI colour should not be mistaken for an artist's accent.

**What would make this 9/10:** Artist artwork displayed when available (even as background-image with initials fallback), consistent motion language (same spring easing as v7), page title changed from "Your feed" to something honest.

---

## Angle 17 — Discovery vs Following Balance
**Score: 7/10**

The tab structure correctly puts Following first (default) and Discover second. The fan lands on their artists, not on recommendations. This is the right architecture.

**Issues:**
1. The word "Emerging" as the default filter in Discover has algorithmic energy — it implies ABLE is sorting by growth metrics. The honest equivalent is "New to ABLE" or "Artists nearby your favourites". Connected should be the default because it is ABLE-specific and non-algorithmic.
2. The "Just dropped" filter shows releases from artists the fan doesn't follow — this is fine for discovery but the line between "new from artists I follow" (Following tab) and "new from artists I don't follow" (Just dropped in Discover) could blur. Needs to be clearly distinguished in UI.
3. There is no cap on how much of the fan's time Discovery could consume vs. Following. On TikTok, discovery is the product. On ABLE, following is the product. The design should make it harder to live in Discover and easier to act from it (follow an artist, then return to your feed).
4. Follower counts on discovery cards subtly introduce popularity-ranking. Remove them.
5. The Creatives section in Discover is a genuinely differentiated feature — it's not discovery-by-algorithm, it's discovery-by-human-relationship (credits). This should be more prominent.

**What would make this 9/10:** Make Connected the default Discover filter. Remove follower counts. Rename "Emerging" to something honest. Clear visual distinction between followed-artist content and discovery content across all tabs.

---

## Angle 18 — Fan Identity
**Score: 4/10**

Who is the fan in this system? Currently: nobody. They are anonymous. There is no logged-in state. There is no name. The "Me" tab at the bottom goes nowhere. There is no representation of the fan's identity anywhere on the page.

This is a v1 constraint (no auth yet), but the consequence is that the page feels impersonal. The fan signed up from an artist's page — they gave their email — but on fan.html they have no presence. The page could be anyone's.

Per V8_BUILD_AUTHORITY.md §6.1, fan settings should include: notification preferences per artist, privacy, export list. None of this exists.

The fan's identity in the ABLE system should be:
- The artists they follow (shown in the Artists tab)
- Their location (used for Near me)
- Their Close Circle memberships (per followed artist)
- Their notification preferences
- Their history (shows attended, dispatches opened — internal signals only, never shown to the fan or other fans)

The Artists tab in the bottom bar (the middle icon) also leads nowhere currently — it shows no content when tapped.

**What would make this 9/10:** "Me" tab opens a simple fan settings view. Artists tab shows a clean list of followed artists with last-active indicators. First-name greeting in the header once auth is in place.

---

## Angle 19 — Real Data Readiness
**Score: 4/10**

The demo data is well-chosen — it makes the page look good and covers all the content types (release, event, merch, snap card). But the gap between demo and real is large.

**Issues:**
1. **Data model mismatch:** The feed items have `age: timestamp` (a number representing when the item was published). Real Supabase data will have ISO date strings. The `formatAge` function subtracts `item.age` from `Date.now()` — this works for demo data but breaks with real data unless the data transformation layer handles it.
2. **No real follow persistence:** `able_fan_following` in localStorage will not survive the auth transition. When Supabase is added, the fan's follows need to be in `fan_follows` table, not localStorage.
3. **No artist-specific accent colour in real data:** Artist accent colour is in `able_v3_profile.accent`. When fan.html pulls from Supabase, it needs to fetch each followed artist's profile to get their accent colour. This is a non-trivial join.
4. **Near me date logic is broken:** The naive `parseInt(s.day) <= 20` grouping will not work with real data.
5. **Discover data has no real source:** The "Emerging" and "Connected" artists need real Supabase queries — emerging requires velocity/recent-join logic, connected requires the credits network graph.
6. **No skeleton states:** First load with Supabase data will show a flash of blank content before data arrives.
7. **No error states:** What happens if the Supabase query fails? Currently the page silently falls back to demo data. This is fine for v1 but needs a real fallback strategy.

**What would make this 9/10:** Data transformation layer that normalises ISO dates to the same age format. Explicit Supabase query map per section. Skeleton loading states. Clear error fallback that degrades to cached data, per V8_BUILD_AUTHORITY §3.4 rendering law.

---

## Angle 20 — Big Picture
**Score: 6/10**

Is this the product fans would actually want to use?

The honest answer: maybe, with real data. Currently, it's a promise. The structure is right — Following / Discover / Near me is the correct three-part architecture for a music fan's relationship to artists. The design is clean and feels premium. The mobile experience is solid. The conduit principle (no algorithm, artists' own colours, artist-voiced copy) is directionally correct.

But the page is a demo. Nothing is wired to real data. The empty states are weak. The fan has no identity. Close Circle doesn't exist. Notifications do nothing. The Near me section hardcodes London. The first visit experience is nonexistent.

The gap between "fan.html as it is" and "fan.html that would make a fan open it weekly" is real. The 30-day retention target of 40–55% from V8_BUILD_AUTHORITY.md §6.1 is achievable — but requires: real data, cold-start artist suggestions, location handling, notification system, and Close Circle integration.

The bones are good. The product is not yet there.

**What would make this 9.5/10:** Real Supabase data. Cold-start. Close Circle section. Real notification system. Fan identity via "Me" tab. Location that works. Copy audit. These are all Phase 2 items — they are not excuses to score higher now, they are the roadmap.

---

## Overall Score: 5.85 / 10

| Angle | Score |
|---|---|
| 1. First 3 seconds | 6 |
| 2. Primary job | 7 |
| 3. Copy voice | 5 |
| 4. Following feed | 7 |
| 5. Discovery | 6 |
| 6. Near me | 6 |
| 7. Mobile experience | 8 |
| 8. Performance | 8 |
| 9. Artist card design | 7 |
| 10. Empty state | 5 |
| 11. Onboarding | 3 |
| 12. Notification / Signal | 4 |
| 13. Close Circle | 2 |
| 14. Privacy and Trust | 7 |
| 15. Accessibility | 7 |
| 16. Cross-page coherence | 7 |
| 17. Discovery vs Following | 7 |
| 18. Fan identity | 4 |
| 19. Real data readiness | 4 |
| 20. Big picture | 6 |
| **Total** | **117 / 200** |
| **Average** | **5.85 / 10** |

The areas pulling the score down most significantly are structural gaps: no Close Circle (2), no onboarding (3), no notifications wired (4), no fan identity (4), and low real data readiness (4). These are all Phase 2 items. The angles that score well (mobile 8, performance 8, artist card 7, mobile 8) confirm the foundation is solid.
