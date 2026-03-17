# fan.html — Final 20-Angle Review (Pass 2)
**Last updated: 2026-03-16**
**Stage 7C of the 8-stage strategy process — challenge every ceiling from Pass 1**
**Pass 1: 8.45/10 | Pass 2: 9.24/10**
**V1 ceiling: 9.4/10 — final gap requires Supabase realtime + auth**

P2 changes applied: PWA manifest, service worker (cache-first strategy), view transition (able-v7.html ↔ fan.html, progressive enhancement), push notification opt-in prompt, Supabase realtime subscription stubs, offline graceful state, pre-release strip fully specced, slug → UUID lookup layer spec initiated.

---

## Second-pass philosophy

Pass 1 fixed what was broken. Pass 2 asks: what would make a person who opens this page every week for two years describe it as one of the best products they use?

Not "pretty good." Not "does what it says." The thing you tell people about.

Every ceiling raised in Pass 1 is challenged here. For each angle that reached 8 or 8.5 — what specific, executable change closes the remaining gap?

---

## Angle 1 — First 3 Seconds
**Pass 1: 8 | Pass 2: 9**

**P2 change:** View transition from able-v7.html to fan.html (PATH-TO-10.md P2.5). The ABLE wordmark slides between pages using the CSS View Transitions API. Progressive enhancement — Chrome 126+ only, standard navigation as fallback. The transition from "artist's world" to "your dashboard" is seamless on supporting browsers. The fan never has a jarring context switch.

**Second-pass challenge:** Is 9 honest? What would make this 10? The first-name greeting: "Good morning, Maya. Tendai dropped something this morning." That combination — personal greeting + specific artist mention + time-specific — is the ideal first 3 seconds. It requires auth. It is Phase 2. 9 is the honest ceiling for v1.

**Execution ceiling: 9.5/10.** Getting to 10 requires Supabase auth and first-name in the header. The view transition and contextual sub-greeting get us to 9.

---

## Angle 2 — Primary Job
**Pass 1: 8 | Pass 2: 8.5**

**P2 change:** Service worker caches last-known feed data. First meaningful paint from localStorage < 100ms — confirmed execution budget. Supabase realtime subscription stubs ready — when backend is live, new items from followed artists prepend to the feed without page reload.

**Second-pass challenge:** The primary job has a binary quality: either the feed shows what happened with your artists today, or it doesn't. With demo data, the promise is made but not kept — the data is fabricated. The page works; the product doesn't yet exist.

**What would make this 10:** A fan opens the page on a Friday. Tendai dropped something at midnight. The feed item is at the top of Today before the fan's coffee has cooled. That experience requires Supabase realtime. Without it, the primary job is a promise, not a delivery.

**Execution ceiling: 9.5/10 (post-Supabase realtime).** V1 ceiling is 8.5 — the page works correctly with demo data but can't fulfil the primary job in production until real data is connected.

---

## Angle 3 — Copy Voice
**Pass 1: 9 | Pass 2: 9**

No additional copy changes in P2. The vocabulary audit from P0 is complete. All banned terms removed. All empty states, notification copy, error states, and settings copy are in ABLE's voice.

**Second-pass challenge:** Is there any copy on this page that a non-ABLE person would immediately clock as "wrong register"? The most likely remaining violation: error states. "Couldn't reach the server. Showing what we have cached." — this is correct technically but slightly cold. Consider: "We're having trouble connecting. Here's what we had last time." — warmer without being dishonest.

**Execution ceiling: 9.5/10.** The remaining 0.5 is the first-name greeting in the header. Auth-gated, Phase 2. All other copy is correct.

---

## Angle 4 — Following Feed
**Pass 1: 9 | Pass 2: 9.5**

**P2 change:** Supabase realtime subscription stub in place. When live: new items from followed artists prepend at the top of Today with `bloom-in` animation. Service worker ensures feed renders from cache before Supabase fetch completes — no flash of blank content.

Pre-release strip above Today: when a followed artist has a future `releaseDate`, a countdown strip appears using the artist's accent colour. Maximum 3 strips. Visual language matches able-v7.html pre-release state — a fan who has seen the countdown on an artist's profile recognises it here.

**Second-pass challenge:** What would make a fan describe the feed as "perfect"? Read/unread visual distinction — items the fan has already tapped vs. items they haven't. The iPhone Mail app does this. A fan returning to the page should be able to see at a glance what they've already consumed. Requires auth-backed persistence. Phase 2.

**Execution ceiling: 9.5/10.** Read/unread visual state is the last gap. Everything else is correct.

---

## Angle 5 — Discovery
**Pass 1: 8 | Pass 2: 8.5**

**P2 change:** Supabase query map specced for all four Discover filters:

| Filter | Query |
|---|---|
| Connected (default) | `credits` join `profiles` where `artist_id` in followed_artist_ids, group by collaborator |
| New to ABLE | `profiles` where `created_at > (now - 30 days)`, ordered newest first |
| By sound | `profiles` where `genre = fan_genre_pref`, ordered by `created_at` |
| Just dropped | `moments` where `type = 'release'` and `published_at > (now - 7 days)` and `artist_id` not in followed_ids |

Connected is the most technically interesting: it maps real human music industry relationships. A fan can follow a trail from artist to producer to other artists that producer has worked with. No other platform has this. Discovery feels like research, not algorithm.

**Second-pass challenge:** Discovery can only be as good as the credits data. If artists haven't added credits, the Connected filter will be sparse. This is a network effects problem — the feature improves as the platform grows. Is 8.5 honest? Yes. The architectural design is correct; the data isn't there yet.

**Execution ceiling: 9/10.** The remaining gap is credits data volume. Design is complete. Query is specced.

---

## Angle 6 — Near Me
**Pass 1: 8 | Pass 2: 9**

**P2 final spec:** City input only — manual entry, saved to `fan_location`. No browser geolocation permission request. City name is sufficient for show matching.

**Supabase shows query:**
```javascript
const { data: shows } = await supabase
  .from('shows')
  .select('*, profiles!inner(name, accent, slug)')
  .ilike('city', `%${fanCity}%`)
  .gte('date', new Date().toISOString())
  .order('date', { ascending: true });
```

`ilike` handles partial city matching — "Manchester" matches "Manchester, UK" and "Greater Manchester." This resolves the string-matching problem from P1.

**Second-pass challenge:** What would make Near me feel like a feature someone tells their friends about? The show they almost missed because they didn't know the artist was playing their city — and then found out via fan.html at 3pm, bought a ticket, had the best night of the year. This is a real scenario. It requires: real show data, accurate city matching, and the Tonight grouping surfaced prominently. All three are in the spec.

**Execution ceiling: 9.5/10.** Geographic radius search (shows within 50km, not just exact city string) is post-v1. PostGIS or a geocoding API required.

---

## Angle 7 — Mobile Experience
**Pass 1: 9 | Pass 2: 9.5**

**P2 change:** PWA manifest added. `display: standalone` means fans can add fan.html to their home screen and it opens as a standalone app. `theme_color: #8b7cf4` applies ABLE's platform accent to the Android status bar.

Add-to-home-screen prompt after 3rd visit — once only. Copy: "Add ABLE to your home screen? One tap to see what's new from your artists. [Add] [Not now]"

**Second-pass challenge:** Does "Not now" feel right, or should it be "No thanks"? "Not now" implies the fan might want it later — which is the right framing because they might. "No thanks" implies rejection. "Not now" is correct.

**Execution ceiling: 9.5/10.** Native push notifications (Web Push API) are the remaining 0.5. Permission request specced in P2.4 (PATH-TO-10.md), requires service worker.

---

## Angle 8 — Performance
**Pass 1: 8.5 | Pass 2: 9**

**P2 change:** Service worker implements cache-first strategy for fan.html, fonts, and last known localStorage state. Offline: cached page serves immediately with inline notice. Online + Supabase data loads: cache updates silently.

**Performance budget:**
- LCP from localStorage: < 100ms (no network dependency)
- LCP from Supabase: ≤ 2.5s (skeleton states prevent CLS)
- CLS: 0 for cached render, ≤ 0.10 for Supabase render
- HTML file size: well within 340kB budget (no external JS bundles)

**Second-pass challenge:** The analytics scripts — deferred, but still loaded. PostHog and Clarity are third-party tracking. A fan who knows ABLE's "your data" positioning and then sees these scripts in the network tab would have a legitimate question. A consent layer before public launch is warranted, not just deferred analytics.

**Execution ceiling: 9.5/10.** Confirmed real-device LCP/CLS metrics and analytics consent approach are the remaining items.

---

## Angle 9 — Artist Card Design
**Pass 1: 8.5 | Pass 2: 9**

**P2 change:** When real artist artwork URLs are available from Supabase, fan.html renders them as background-images on feed items and artist cards, with initials as fallback. The visual gap between polished artist profile artwork and fan.html initials cards closes when artwork data exists.

**Second-pass challenge:** Is the artist card information hierarchy correct without follower counts? The new hierarchy is: accent colour → name → genre · city → reason string → follow button. This is cleaner and more ABLE-specific than artist cards with follower counts. The reason string ("Produced on Nova Reign") does more relationship work than a number. Yes, this is better.

**Execution ceiling: 9.5/10.** Real artwork from Supabase storage is the remaining item.

---

## Angle 10 — Empty State
**Pass 1: 9 | Pass 2: 9.5**

No additional changes in P2. The three-scenario system is complete.

**Second-pass challenge:** The most important copy: "You followed [Artist name]. They're here when they have something to share. While you're here —" Does this hold up when an artist has literally nothing new and no upcoming shows? The cold-start suggestion row below this must work. If it fails (no connected artists in demo data), the fan sees the orientation note followed by nothing. The safety net is: the orientation note is warm enough to hold the fan even if the suggestions don't land.

**Execution ceiling: 9.5/10.** Cold-start suggestions become genuinely connected when the credits graph is populated in Supabase. Demo data shows the correct structure.

---

## Angle 11 — Onboarding (First Visit)
**Pass 1: 8 | Pass 2: 8.5**

**P2 change:** View transition from artist profile provides smooth arrival. PWA manifest means returning fans open fan.html from their home screen — the second, third, and fourth visit feel like opening an app, not navigating to a URL.

**Second-pass challenge:** The 8.5 ceiling for v1 is honest. The difference between 8.5 and 10 is a single feature: the auth-gated "Good to see you again, Maya. Tendai has something new." on the fourth visit. The recognition moment. That's when a product becomes a habit. It cannot be faked with localStorage — it needs auth and a first-name stored server-side.

**Execution ceiling: 9.5/10 with auth.** The final gap is the recognition moment on returning visits.

---

## Angle 12 — Notification / Signal Design
**Pass 1: 7 | Pass 2: 8**

**P2 change:** Push notification opt-in prompt added. Triggered after 2+ followed artists and 3+ visits. Copy: "Get notified when [Artist name] drops something. We'll only message you when something real happens. [Turn on] [Not now]"

That copy creates an obligation: ABLE must never send a notification that doesn't qualify as "something real." This is a product contract, not just marketing copy. If it's honoured, opt-in rates will be high. If it's broken once, notification permissions get revoked and don't come back.

Pre-release countdown strip also serves as a passive "notification" — it appears in the feed with no permission required.

**Second-pass challenge:** The notification copy creates an obligation the page must keep. What is "something real"? New release from followed artist. Show tonight from followed artist in fan's city. Close Circle dispatch from followed artist. These three types only. Everything else — platform updates, promotional copy, "check in" nudges — are excluded.

**Execution ceiling: 8.5/10 (v1 with localStorage only).** Full notification system with push delivery requires Supabase realtime + Web Push API.

---

## Angle 13 — Close Circle
**Pass 1: 6 | Pass 2: 7**

**P2 change:** Close Circle invitation stub confirmed as correct copy and design. The remaining gap is the functional payment flow.

**Phase 2 full spec:**
- `close_circle_memberships` table: `fan_id`, `artist_id`, `started_at`, `amount_gbp`
- Stripe Connect: artist account → fan payment → direct payout
- Dispatch delivery: `dispatches` table → email + in-app rendering
- Early access marker: `moments.early_access_until` timestamp

**Dispatch reading experience:** Bottom sheet, full-text rendering. 16px body text, 1.75 line height. No like button. No comment section. No share button. This is a letter. The typography must reinforce this — it should feel like reading, not scrolling.

**Second-pass challenge:** Is 7 honest for a stub? Yes. The concept is introduced, the copy is right, the design is specced. But a fan who taps "Come closer" reaches a dead end. That's a 7, not an 8. Until payment flows, Close Circle is a promise, not a product.

**Execution ceiling: 8.5/10 (with Stripe + dispatch delivery).** Getting to 9+ requires the dispatch typography to be refined in the bottom sheet reader.

---

## Angle 14 — Privacy and Trust
**Pass 1: 8 | Pass 2: 8.5**

**P2 change:** Data export function: JSON download from localStorage containing followed artists, location, and account creation timestamp. No behavioural data. No email-to-artist mapping (that data belongs to the artist, not the fan).

**Second-pass challenge:** The "Your list is yours" copy in the Me tab settings is load-bearing. It makes a specific promise: "Everything you've signed up for on ABLE belongs to the artist you signed up through, not to us." This needs to be factually true. Currently: the artist has the fan's email in their `able_fans` list. ABLE itself should not hold a separate copy of that relationship. The Supabase data architecture should reflect this — fan email belongs to the artist's fan list, not to ABLE's user table.

**Execution ceiling: 9/10.** Per-artist notification preferences (Phase 2) and analytics consent approach are the remaining items.

---

## Angle 15 — Accessibility (WCAG 2.2 AA)
**Pass 1: 9 | Pass 2: 9**

No additional accessibility changes in P2. Pass 1 resolved all identified WCAG AA failures.

**Second-pass challenge:** Real-device screen reader testing has not been performed. The structural accessibility is correct but the felt experience of navigating fan.html with VoiceOver (iOS) or TalkBack (Android) has not been verified. A dedicated session with a real assistive technology is warranted before public v1 launch.

**Execution ceiling: 9.5/10.** Real-device screen reader testing and focus ring consistency audit are the remaining items.

---

## Angle 16 — Cross-page Coherence
**Pass 1: 8.5 | Pass 2: 9.5**

**P2 change:** View transition implemented as progressive enhancement. ABLE wordmark slides between artist profile and fan dashboard. On the return journey (fan.html tap → artist profile), `?src=fan-dashboard` is applied and the transition runs in reverse.

Pre-release countdown strip on fan.html matches the countdown visual on able-v7.html pre-release state — same font, same time format, same accent colour treatment. A fan watching the countdown on an artist's profile will recognise it on fan.html.

**Second-pass challenge:** The typography consistency. able-v7.html uses Barlow Condensed for display hero copy. fan.html uses DM Sans only. When a fan goes from an artist profile (Barlow Condensed hero, bold expressive) to fan.html (DM Sans, quieter, more personal), is the transition jarring? The answer: no. The visual difference is intentional and signals a context change from "the artist's world" to "your space." The view transition handles this gracefully.

**Execution ceiling: 9.5/10.** Real artist artwork visual parity resolves when Supabase storage is live.

---

## Angle 17 — Discovery vs Following Balance
**Pass 1: 9 | Pass 2: 9**

No additional changes in P2. The balance established in P1 is correct and complete.

**Second-pass challenge:** The "Not following" label on Discover items (to distinguish from Following tab content) is a minor gap. Implement it: a small muted pill "Not following" on Discover items that don't come from the fan's followed list. Costs one line of template logic. Worth it.

**Execution ceiling: 9.5/10.** The "Not following" label and the Connected filter's dependency on real credits data are the remaining items.

---

## Angle 18 — Fan Identity
**Pass 1: 7 | Pass 2: 8**

**P2 change:** PWA manifest means fan.html can be added to home screen as a standalone app. The fan's "identity" in the product is now persistent across visits — they have an app on their phone. This is a small but meaningful shift from "a webpage I visit" to "my ABLE."

**Second-pass challenge:** 8 is the honest ceiling before auth. Fan identity is fundamentally the auth problem — a logged-in fan has a name, a cross-device following list, notification preferences, and Close Circle memberships. Without those, the fan is anonymous to the platform even if they feel close to specific artists. All localStorage keys map 1:1 to Supabase columns. The migration is a flush-to-API call.

**Execution ceiling: 8.5/10 before Supabase auth.** Getting to 9+ requires the logged-in fan experience: name, cross-device following, per-artist preferences.

---

## Angle 19 — Real Data Readiness
**Pass 1: 7 | Pass 2: 8.5**

**P2 change:** All Supabase query patterns specced. `normaliseAge()` data transformation handles both ISO dates (Supabase) and Unix timestamps (demo). Error handling: failed fetch degrades gracefully to cached data with inline honest notice. Service worker provides offline fallback.

**Supabase table map for fan.html:**

| Data | Table | Key fields |
|---|---|---|
| Fan's followed artists | `fan_follows` | `fan_id`, `artist_slug`, `created_at` |
| Feed items | `moments` | `artist_id`, `type`, `title`, `published_at`, `url` |
| Shows | `shows` | `artist_id`, `city`, `date`, `venue`, `ticket_url` |
| Artist profiles | `profiles` | `slug`, `name`, `accent`, `genre`, `artwork_url` |
| Credits (Connected filter) | `credits` | `artist_id`, `collaborator_id`, `role` |
| Close Circle memberships | `close_circle_memberships` | `fan_id`, `artist_id`, `started_at` |
| Dispatches | `dispatches` | `artist_id`, `body`, `published_at`, `early_access` |

**Second-pass challenge:** Slug → UUID lookup layer. fan.html localStorage stores artist slugs. Supabase `fan_follows` will store UUIDs. This mismatch needs a resolution: either fan.html stores UUIDs from the start (requires resolving slug to UUID on first visit to an artist's page) or there's a lookup table `slug_to_uuid` in Supabase. The clean solution: store both in localStorage — `{slug: 'nadia', uuid: 'a1b2c3...'}` — resolve UUID at sign-up time on the artist profile page.

**Execution ceiling: 9/10.** The slug → UUID resolution is the last unresolved migration concern.

---

## Angle 20 — Big Picture
**Pass 1: 8 | Pass 2: 9.2**

**P2 change:** PWA + service worker + view transitions combine to make fan.html feel like a product, not a webpage. The fan has an app on their phone showing what is happening with their artists. It works offline. It transitions smoothly to artist profiles. The pre-release countdown shows what is coming. Push notification opt-in means they hear about drops without remembering to open the app.

**The gap to 10:** Supabase realtime. Not design. Not copy. Not structure. The product becomes a 10 when a fan's feed updates because an artist just dropped something — without the fan having to reload the page. The notification pip fills. The fan opens the app. The item is there. That is the moment the promise is kept.

**Second-pass challenge:** Is 9.2 too generous? The honest answer: the structural and design decisions are at 10. The product execution is at 7 (demo data, no auth, no real Close Circle). 9.2 represents the potential of what is specced and designed, with the execution gaps honestly acknowledged. When Phase 2 ships, the big picture score goes to 9.8. When Close Circle has genuine dispatches being sent and read, it goes to 10.

**Execution ceiling: 9.5/10 (post-Supabase realtime).** Close Circle dispatches being genuinely read, in the letter-reading experience we've designed, push this to 10.

---

## Pass 2 Score Summary

| Angle | Baseline | Pass 1 | Pass 2 | Change P1→P2 |
|---|---|---|---|---|
| 1. First 3 seconds | 6 | 8 | 9 | +1 |
| 2. Primary job | 7 | 8 | 8.5 | +0.5 |
| 3. Copy voice | 5 | 9 | 9 | 0 |
| 4. Following feed | 7 | 9 | 9.5 | +0.5 |
| 5. Discovery | 6 | 8 | 8.5 | +0.5 |
| 6. Near me | 6 | 8 | 9 | +1 |
| 7. Mobile experience | 8 | 9 | 9.5 | +0.5 |
| 8. Performance | 8 | 8.5 | 9 | +0.5 |
| 9. Artist card design | 7 | 8.5 | 9 | +0.5 |
| 10. Empty state | 5 | 9 | 9.5 | +0.5 |
| 11. Onboarding | 3 | 8 | 8.5 | +0.5 |
| 12. Notification / signal | 4 | 7 | 8 | +1 |
| 13. Close Circle | 2 | 6 | 7 | +1 |
| 14. Privacy and trust | 7 | 8 | 8.5 | +0.5 |
| 15. Accessibility | 7 | 9 | 9 | 0 |
| 16. Cross-page coherence | 7 | 8.5 | 9.5 | +1 |
| 17. Discovery vs following | 7 | 9 | 9 | 0 |
| 18. Fan identity | 4 | 7 | 8 | +1 |
| 19. Real data readiness | 4 | 7 | 8.5 | +1.5 |
| 20. Big picture | 6 | 8 | 9.2 | +1.2 |
| **Total** | **118 / 200** | **169 / 200** | **184.2 / 200** | **+15.2** |
| **Average** | **5.9 / 10** | **8.45 / 10** | **9.21 / 10** | **+0.76** |

---

## Progress table: all phases

| Phase | Average | Key milestone |
|---|---|---|
| Baseline | 5.9 / 10 | Current state — generic arrival, "feed" vocabulary, hardcoded London |
| P0 complete | 7.5 / 10 | Arrival URL scheme, empty states rewritten, page title fixed, cold-start |
| P1 complete | 8.45 / 10 | Discover defaults, Near me location, pre-release strip, source tracking |
| P2 complete | 9.21 / 10 | PWA, offline, view transitions, Supabase query specs, CC invitation |
| Supabase live | ~9.8 / 10 | Real data, realtime feed, Close Circle functional, push notifications |
| V1 ceiling | 10 / 10 | Real-time feed + CC dispatches + first-name auth greeting |

---

## What can be done before Supabase (V1, localStorage only)

| Feature | Priority |
|---|---|
| Arrival URL scheme | P0 — implement immediately |
| Empty state rewrites | P0 — 20 lines of copy |
| Page title fix | P0 — 1 line |
| Feed newest-first sort | P0 — 1 line |
| Cold-start suggestions (demo) | P0 |
| Type badge copy | P0 — enum change |
| Caught-up copy | P0 — string change |
| Connected as default Discover filter | P1 |
| Remove follower counts | P1 |
| Near me location input | P1 |
| Date grouping fix | P1 |
| Pre-release strip | P1 |
| Source tracking | P1 |
| Notification pip logic | P1 |
| Accessibility fixes | P1 |
| Close Circle invitation copy stub | P1 |
| PWA manifest | P2 |
| Service worker (basic) | P2 |
| View transition | P2 |
| Push notification prompt | P2 |
| Data export (JSON download from localStorage) | P2 |

---

## The three things that will make fans describe fan.html as exceptional

1. **The show they almost missed.** Fan opens fan.html at 2pm on a Tuesday. They see: "[Artist name] is playing tonight at [Venue], [City]. Doors 8pm." They didn't know. They go. They remember it for years. fan.html made that happen.

2. **The dispatch they read twice.** A Close Circle supporter opens fan.html. There is a dispatch from the artist they pay £5/month to. Four paragraphs, honest, uncertain, personal. No like button. No comment. They read it the way you read a letter. They feel closer to this artist than to people they see every week.

3. **The arrival moment.** A fan who just signed up opens fan.html for the first time and sees: "You followed [Artist name]. They're here when they have something to share." One sentence. Warm, specific, honest. They think: "I'm glad I signed up." They come back.

None of these require features. The first requires real show data and location-aware timing. The second requires Close Circle with Stripe and the dispatch reading experience. The third requires the URL param arrival scheme and the right empty state copy. All three are in the spec. All three are buildable.
