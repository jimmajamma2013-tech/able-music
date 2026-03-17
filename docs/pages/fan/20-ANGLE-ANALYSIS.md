# fan.html — 20-Angle Analysis (Pass 1 + Competitive Context)
**Last updated: 2026-03-16**
**Version assessed: current fan.html (localStorage / demo data, no Supabase)**
**Stage 4 of the 8-stage strategy process**

Scores are honest assessments of the page as it exists today. 10 means nothing meaningful to improve. 1 means broken or absent.

---

## Stage 0 Context

**User type who encounters this page first:**
A fan who just signed up from an artist's ABLE profile. They gave their email. They tapped the link in the confirmation email. They are curious, slightly uncertain, mobile, and have a 15-second patience window.

**Their primary fear at this moment:**
"Did I just sign up for something that's going to spam me or feel like marketing?"

**The one thing this page must make them think/feel/do:**
"I'm glad I signed up. Something real is coming."

---

## Competitive Context (from Stage 3 research)

Before scoring, what the landscape reveals:

**What competitors get wrong:**
- **Patreon for musicians:** Content treadmill model. Musicians who release an album every 18 months have nothing to post. Fans who pay £5/month start to feel ripped off during quiet periods. The interface (tiers, benefit checkboxes, payment reminders) makes the relationship feel like a subscription box service.
- **Weverse/bemyfriends:** Works for K-pop specifically because HYBE controls both artists and platform. Participation is not optional. Not transferable to independent Western artists with genuine creative autonomy.
- **Community (SMS):** 98% open rate. Enterprise-priced. Broadcast-only — not a relationship. "Personalised" SMS still feels like a template. The 98% open rate is because people check texts, not because they care about the message.
- **Amazon Music Fan Groups (2025):** Community-first — forums, shared listening, chat. This is the wrong direction for intimate artist-fan connection. It creates fan-to-fan relationships not artist-to-fan relationships.
- **TopFan:** White-labelled community apps with forums, live Q&A, exclusive events. Requires the artist to maintain a community. Most independent artists don't have the bandwidth.
- **FanCircles:** Superfan apps with forums, live streams, member profiles. Same problem as TopFan — requires the artist to post constantly. The content treadmill disguised as a community.
- **Spotify Music Pro (superfan tier — 2025/2026, $5.99/month add-on):** Offers higher-quality audio, early ticket access, remixing tools. Critical structural problem: fan stays inside Spotify's walled garden. Artist does not own the fan's email. If the fan cancels Spotify Premium, the relationship is severed. Labels are slowing the launch (Hypebot, 2025). For independent artists, Spotify is a distribution channel — not a home.

**What competitors get right (learn from these):**
- **Bandcamp fan pages:** Clean, non-algorithmic, purchase-history based. "You bought this — here's what else they made." Not a feed — a collection. The fan feels ownership over the music. ABLE should feel like this: personal, not broadcast.
- **Community (SMS) 98% open rate insight:** The channel matters. A direct message in an inbox, without an algorithm, creates a different felt relationship than a social media post. ABLE's email capture and fan.html serve this same need — direct, not mediated.
- **Spotify superfans = 2% of listeners, 52% of merch purchases:** True for ABLE too. Most artists on ABLE will have a small core of genuine loyalists. fan.html should be built for them — not for the 98%.

**ABLE's differentiation (confirmed, not claimed):**
1. The artist owns the fan's email — portable, not platform-locked
2. No content treadmill — Close Circle rewards existing moments, doesn't require new content
3. No algorithm — Following tab shows exactly what the fan chose, nothing more
4. The credits network — Connected discovery has no analogue on any competing platform
5. The campaign state machine — the profile changes based on what the artist is doing right now

---

## Angle 1 — First 3 Seconds
**Score: 6/10**

What happens when a fan lands on fan.html for the first time?

The page loads cleanly. The dark background matches the artist profiles they signed up from. The header shows "ABLE" — correct. The content tabs (Following / Discover / Near me) are clear.

What's missing: the first thing a fan sees is a header with no personalisation and demo data items that feel generic. There is no acknowledgement of who they are or why they're here. The page title is "ABLE — Your feed" — using the word "feed" is a direct violation of ABLE's copy philosophy. There is no orientation moment.

The first 3 seconds work structurally but miss the emotional moment of connection entirely. A fan who just signed up from Maya's page lands here and sees nothing about Maya.

**Path to 10:** Personalised arrival via `?artist=slug&ref=signup` URL param. First item is from the artist they signed up through. Page title changed to `ABLE`. Sub-greeting when there is something genuinely new. First-name greeting when auth exists.

---

## Angle 2 — Primary Job
**Score: 7/10**

Primary job: show fans what is happening with the artists they follow, so they never miss something they care about.

The Following tab with Today / This week strips does this job adequately with demo data. The structure is correct. Items have artist name, content title, type badge, and time-ago. Feed items are scannable at a glance.

What's missing: the "Today" section shows demo items with static timestamps. Feed items are ordered oldest-first — should be newest-first. When Today is empty and items exist in This week, the empty Today state says "Nothing new today." with no context about when something last happened. All feed item taps go nowhere (no destination URL in demo data).

**Path to 10:** Newest-first sort. Empty Today state names when something last happened. All feed items route to artist profiles with source tracking. Pre-release strip above Today for artists with future releases. Real Supabase data (Phase 2 ceiling item).

---

## Angle 3 — Copy Voice
**Score: 5/10**

Six copy violations present in the current build:

| Violation | Location | Priority |
|---|---|---|
| "Your feed" | `<title>` | Critical |
| "No one in your feed yet" | Empty following state | Critical |
| "Feed" | Bottom tab bar label | Critical |
| "You're all caught up" | Caught-up state | High |
| "Updated moments ago" | Caught-up sub-line | Medium |
| "We'll show you shows..." | Near me empty state | High |
| "Update" | Snap card type badge | Medium |
| "Emerging artists" | Discover filter label | Medium |

"Feed" is not a vocabulary problem. It is an ideology problem. The word "feed" carries the entire mental model of algorithmic social media — it implies content is served to you, not chosen by you. Every instance of "feed" on fan.html sends a contradictory signal to ABLE's core premise. All three instances must go.

"You're all caught up" is SaaS template copy. It belongs on a task management app. It does not belong on a platform for music fans.

What's right: "Following" / "Today" / "This week" labels are correct. "Near me" is honest. Type badge "Show" (not "Event") is correct.

**Path to 10:** Systematic removal of all banned vocabulary. Rewrite empty states in ABLE voice. See COPY.md for all replacement strings.

---

## Angle 4 — Following Feed
**Score: 7/10**

The structural split of Today / This week is correct. The visual treatment of feed items is clean: artist initials in accent colour, title, subtitle, type badge, time-ago.

**Issues:**
1. Items ordered oldest-to-newest within sections — should be newest-first
2. The "Caught up" state fires immediately after render, not after the fan has actually scrolled to the bottom
3. No visual distinction between unread and already-seen items (requires auth)
4. When Today is empty, no context about when something last happened
5. Artist name in `color-text-3` (dimmest text) — should be `color-text-2`, weight 500. The artist name is the most critical piece of information in a feed item.
6. Feed items with no URL destination — taps do nothing. Dead interaction.

**Path to 10:** Newest-first sort (one-line fix). Artist name to `color-text-2`. Feed item taps route to artist profile. Caught-up state via IntersectionObserver (fires when fan has scrolled to bottom, not on render). Tonight badge for same-day events.

---

## Angle 5 — Discovery
**Score: 6/10**

Four filter tabs: Emerging / Connected / By vibe / Just dropped. The Connected filter is the most ABLE-specific and most valuable — artists discovered through production credits, not algorithmic similarity. This is the credits network in action from the fan's perspective.

**Issues:**
1. Default filter is "Emerging" — which implies velocity/popularity signals. Connected should be the default because it is most ABLE-specific and most non-algorithmic.
2. "Emerging" implies ranking by growth metrics. Change to "New to ABLE" — honest.
3. "By vibe" is less specific than "By sound."
4. Follower counts on discovery cards introduce a popularity hierarchy. Remove them.
5. Creatives section appears across filters without clear logic for when it shows. It belongs only on Connected.
6. All artist cards are tappable to nowhere (no destination wired in demo).

**Path to 10:** Connected as default. Remove follower counts (location + genre instead). Rename filters per COPY.md. Creatives section on Connected only, with the "The people behind the music" label. All artist cards tap to artist profiles.

---

## Angle 6 — Near Me
**Score: 6/10**

The Near me tab works structurally. Shows grouped into This week / Coming up. Each show item has date block, artist name, venue, city, time.

**Issues:**
1. Location hardcoded to "London, UK" — the "Change" button does nothing. Dead interaction.
2. Date-splitting logic: `parseInt(s.day) <= 20` — this will break with any real data (day 20 in April is not "this week" relative to today). Replace with ISO date comparison.
3. Non-followed artists in Near me have no "Follow" option — missed cold-start moment.
4. Followed artists show "Following" badge but no ticket button — fan may still want tickets.
5. No "Tonight" grouping — the highest-urgency show notification.
6. No "Set your city" prompt when location is not stored.

**Path to 10:** Real location storage via city input (manual, no GPS request). ISO date comparison replacing broken day-of-month logic. TONIGHT / THIS WEEK / COMING UP groupings. Both accent-colour strip and ticket button for followed artists. Follow button for non-followed show artists. City prompt on first Near me tab visit.

---

## Angle 7 — Mobile Experience
**Score: 8/10**

Core mobile experience is strong. Shell width 390px correct. Bottom tab bar handles `env(safe-area-inset-bottom)`. `overscroll-behavior: contain` and `-webkit-overflow-scrolling: touch`. Touch feedback on press with `transform: scale(0.98)`. `-webkit-tap-highlight-color: transparent` applied.

**Issues:**
1. Filter pills in Discover have no scroll shadow/gradient to indicate more content to the right.
2. Bottom tab bar active state is colour-only — no label weight change.
3. No pull-to-refresh gesture — will be missed with real data.
4. `min-height: 100dvh` used correctly.

**Path to 10:** Scroll shadow on filter pill overflow. Pull-to-refresh visual stub. All interactive elements verified at ≥ 44px hit target.

---

## Angle 8 — Performance
**Score: 8/10**

Single HTML file. No external JS bundles. Fonts loaded via Google Fonts with `preconnect`. CSS inline — no render-blocking stylesheet. Demo data renders immediately on `DOMContentLoaded` — no API wait. Lazy rendering: Discover and Near Me only render when their tab is first activated.

**Issues:**
1. PostHog and Microsoft Clarity analytics load synchronously in `<head>` — should be deferred.
2. No skeleton loading states — Supabase fetch will cause blank-then-populate flash.
3. No explicit `loading="lazy"` on images.
4. No service worker for offline graceful state.

**Path to 10:** Analytics deferred to bottom of body. Skeleton shimmer states (CSS only, compositor-safe). Service worker for cache-first strategy. Confirmed LCP < 100ms from localStorage render.

---

## Angle 9 — Artist Card Design
**Score: 7/10**

Artist cards in Discover are well-structured. Left accent strip using artist colour is a good design decision. Feed items are clean and scannable.

**Issues:**
1. Artist initials only — no real artwork.
2. Artist name in feed items is `color-text-3` (dimmest) — should be `color-text-2`, weight 500.
3. Follower counts on Discover cards introduce popularity hierarchy — remove.
4. "Active" dot indicator is undefined — what triggers this signal?
5. Artist card taps go nowhere.

**Path to 10:** Remove follower counts. Artist name to `color-text-2`. Active dot defined as "activity in last 48 hours" (based on `moments.published_at`). All cards tap to artist ABLE profiles. Real artwork when Supabase storage is live.

---

## Angle 10 — Empty State
**Score: 5/10**

Three empty state scenarios: empty following (no artists followed), empty Today (no new items), Near me empty.

**All three fail:**
- Empty following: "No one in your feed yet" — uses banned word "feed", feels cold
- Empty Today: "Nothing new today." alone — no context, no warmth, no recovery path
- Near me empty: passive SaaS copy

**What's missing:**
- First-visit orientation state vs. returning-fan empty state — treated identically
- Cold-start suggestions not present
- No context about when something last happened

**Competitive insight:** This is where every competitor fails. Patreon shows tier comparison tables on empty creator pages. Weverse shows recommended artists you didn't ask for. Community shows nothing. The empty state that makes a fan think "I'm glad I signed up" doesn't exist anywhere in the market — ABLE can own this moment.

**Path to 10:** Three-scenario empty state system (Scenario A: first visit, Scenario B: nothing new, Scenario C: empty list). All copy per COPY.md. Cold-start row in Scenario A. No emoji. No apology. Direct CTA to Discover on Scenario C.

---

## Angle 11 — Onboarding (First Visit)
**Score: 3/10**

The current fan.html has no first-visit experience. No orientation. No cold-start. No location prompt. No explanation of what the page is.

The fan who just signed up from an artist's page lands on generic demo data. The most fragile moment in the fan relationship — the first 10 seconds after sign-up — is completely wasted.

**The 3-artist threshold (from fan retention research):** Fans who follow 3+ artists have dramatically higher 30-day and 90-day retention. The cold-start mechanism to get fans from 1 to 3 followed artists is the single highest-impact retention feature on this page.

**Path to 10:** `?artist=slug&ref=signup` URL parameter arrival scheme. First-visit detection via `fan_first_visit_artist` flag. Cold-start 2–3 connected-artist suggestions shown inline. Location collection prompt on first Near me visit. Soft nudge: "Follow 2 more artists and your dashboard comes alive."

---

## Angle 12 — Notification / Signal Design
**Score: 4/10**

Notification bell with purple pip — hardcoded visible, tapping does nothing. Dead interaction.

No push notification infrastructure. No in-app notification centre. Pip always visible regardless of whether there are actual notifications.

**Path to 10:** Pip hidden by default. Shown only when `getUnreadItemCount()` > 0 (items newer than `fan_last_seen_ts`). Bell tap opens bottom sheet: "Updates from your artists." Empty state: "Nothing new right now." Push notification opt-in after 2+ followed artists and 3+ visits.

---

## Angle 13 — Close Circle
**Score: 2/10**

Close Circle does not appear on fan.html at all. No section. No entry point. No mention.

This is the most significant product gap. The fan who is a Close Circle supporter — paying £5/month directly to an artist — has no experience on the fan dashboard that reflects this. They are treated identically to a fan who signed up yesterday.

**The dispatch reading experience** (dispatches rendered as full-text, no like button, no comment section — "a letter, not a post") has no home on the current fan.html.

**The "you heard this early" indicator** — confirming to a supporter that they had early access — does not exist.

**Competitive context:** Patreon has a patron dashboard but it emphasises content consumption metrics. Weverse has a fan hub but it's community-first (posts, comments, reactions). None of them have an experience built around the idea that a dispatch is a letter and should be read like one. ABLE can own this.

**Path to 10:** Close Circle section in Following view with: supporter status per artist, dispatch reading experience (full-text bottom sheet, no social metadata), "you heard this early" indicator on release items, "supporting since [month]" label, Close Circle invitation for non-supporters (per COPY.md). Phase 2: functional Stripe payment.

---

## Angle 14 — Privacy and Trust
**Score: 7/10**

localStorage only — no data leaving the device. No personal information tracked on this page. This is correct.

**Issues:**
1. PostHog and Microsoft Clarity analytics are installed — third-party tracking. Somewhat at odds with "your data" positioning.
2. No data export visible to fans.
3. No per-artist notification preferences.
4. "Me" tab goes nowhere.

**Path to 10:** "Me" tab functional: following count, data ownership statement, export, "Stop using ABLE." Analytics scripts deferred. Consent approach before public launch.

---

## Angle 15 — Accessibility (WCAG 2.2 AA)
**Score: 7/10**

Fundamentals in place: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `role="article"` on feed items, `:focus-visible` ring, `prefers-reduced-motion` respected.

**Issues:**
1. `color-text-3` at `rgba(240,237,232,0.38)` on `#0d0e1a` ≈ 3.2:1 contrast — WCAG AA requires 4.5:1. Fails.
2. Filter pills have no `aria-pressed` — active state is visual only.
3. Feed item accessible names don't include time-ago.
4. Notification pip has no screen reader text.

**Path to 10:** `color-text-3` opacity to ≈ 0.55 (≈ 4.6:1). `aria-pressed` on filter pills. Time-ago in feed item `aria-label`. `aria-live="polite"` on notification pip.

---

## Angle 16 — Cross-page Coherence
**Score: 7/10**

fan.html shares the same dark theme (`#0d0e1a`) and DM Sans as able-v7.html. Visual language feels consistent.

**Issues:**
1. Feed items use initials only — visual downgrade from polished artist profiles.
2. Page title "ABLE — Your feed" doesn't match voice of artist profiles.
3. Spring easing tokens should be confirmed consistent with able-v7.html.
4. No view transition between artist profiles and fan dashboard.

**Path to 10:** Page title to "ABLE." Artist artwork when available (CSS background-image, initials fallback). Source tracking `?src=fan-dashboard` on all taps from fan.html to artist profiles. View transition (P2 — CSS View Transitions API, progressive enhancement).

---

## Angle 17 — Discovery vs Following Balance
**Score: 7/10**

Tab structure correctly puts Following first (default) and Discover second. Fan lands on their artists, not on recommendations. This is right.

**Issues:**
1. "Emerging" as default Discover filter has algorithmic energy. Connected should be default.
2. Follower counts on discovery cards subtly introduce popularity-ranking.
3. No cap preventing the fan from living in Discover rather than Following.
4. After following from Discover, no clear "return to Following" affordance.

**Path to 10:** Connected as default. After following from Discover, toast: "Following [Artist] — See your artists →" (link to Following tab). Remove follower counts. Creatives section on Connected only.

---

## Angle 18 — Fan Identity
**Score: 4/10**

Who is the fan in this system? Currently: nobody. Anonymous. No logged-in state. No name. "Me" tab goes nowhere. "Artists" tab shows nothing. The page could be anyone's.

This is a v1 constraint but the consequence is that fan.html feels impersonal. The fan gave their email — they have an identity in this system. The page doesn't reflect that.

**Path to 10:** "Me" tab functional with following count, city, data preferences. "Artists" tab shows followed artist list. First-name greeting when auth exists. First-visit orientation anchors identity to the artist who brought them.

---

## Angle 19 — Real Data Readiness
**Score: 4/10**

Demo data is well-chosen but the gap to real Supabase data is large:

1. `item.age` is a number in demo (Unix ms). Real Supabase data will have ISO date strings. `normaliseAge()` needed.
2. `fan_following` stores slugs. Supabase `fan_follows` uses UUIDs. Slug → UUID lookup layer unspecced.
3. Near me date grouping broken (`parseInt(s.day) <= 20`).
4. Discover data has no real source — credits graph required.
5. No skeleton states for Supabase fetch delay.
6. No error handling for failed Supabase queries.

**Path to 10:** `normaliseAge()` data normalisation layer. ISO date comparison throughout. Supabase query map per section (specced in PATH-TO-10.md P2). Skeleton states. Error handling: cached data fallback with honest inline notice.

---

## Angle 20 — Big Picture
**Score: 6/10**

Is this the product fans would actually want to use?

The structure is right. The design is clean. The mobile experience is solid. The conduit principle is directionally correct.

But: nothing is wired to real data. Empty states are weak. The fan has no identity. Close Circle doesn't exist. Notifications do nothing. Near me hardcodes London. First visit is nonexistent.

**Competitive context:** The best fan experience in the market right now is not a fan dashboard product — it is an artist who sends a genuine email newsletter and maintains a direct email list. fan.html can be better than this. A personal dashboard that updates when your artists do something real, that tells you about shows before they sell out, that holds your Close Circle correspondence — this is better than any newsletter. It just has to work.

**Path to 10:** Real data (Phase 2). Cold-start. Close Circle functional (Phase 2). Real notification system. Fan identity via Me tab. Location that works. The bones are good. The product is not yet there.

---

## Overall Score: 5.9 / 10

| Angle | Score | Priority |
|---|---|---|
| 1. First 3 seconds | 6 | P0 |
| 2. Primary job | 7 | P0 |
| 3. Copy voice | 5 | P0 |
| 4. Following feed | 7 | P0 |
| 5. Discovery | 6 | P1 |
| 6. Near me | 6 | P1 |
| 7. Mobile experience | 8 | P1 |
| 8. Performance | 8 | P1 |
| 9. Artist card design | 7 | P1 |
| 10. Empty state | 5 | P0 |
| 11. Onboarding | 3 | P0 |
| 12. Notification / Signal | 4 | P1 |
| 13. Close Circle | 2 | P2 |
| 14. Privacy and Trust | 7 | P1 |
| 15. Accessibility | 7 | P1 |
| 16. Cross-page coherence | 7 | P1 |
| 17. Discovery vs Following | 7 | P1 |
| 18. Fan identity | 4 | P1 |
| 19. Real data readiness | 4 | P2 |
| 20. Big picture | 6 | P2 |
| **Average** | **5.9 / 10** | |

---

## The 5 Highest-Impact Changes

1. **Arrival URL scheme (`?artist=slug&ref=signup`)** — 20 lines of code that make every first visit coherent. Without this, the most fragile fan relationship moment is wasted.

2. **Empty state rewrites** — the copy that makes a new fan think "I'm glad I signed up" rather than "what is this." The highest-return per-word investment on the page.

3. **Remove the word "feed" everywhere** — not cosmetic. Ideological. Belongs to Instagram and TikTok.

4. **Cold-start connected-artist suggestions** — the mechanism that gets fans from 1 to 3 followed artists. The 3-artist threshold predicts dramatically higher 30-day retention.

5. **Close Circle section (even as copy-only stub)** — the fan paying £5/month to an artist deserves an experience that reflects that relationship. Without it, the most important fan on the platform has no home.
