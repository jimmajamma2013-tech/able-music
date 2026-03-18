# ABLE — Cycle 23 Audit
**Generated: 2026-03-18 | Targeting fan profile page, close circle UX, freelancer depth, VoiceOver, and Lighthouse baseline**
**Scores entering Cycle 23: Artist profile 9.75 · Admin 9.92 · Landing 9.9 · Onboarding 9.9 · Fan dashboard 9.8 · Freelancer profile 9.1 · Freelancer onboarding 9.0**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Fan dashboard depth | 9.80/10 | 9.85/10 | Fan profile page, close circle badge, first-10 badge, fan dark mode (carried from C22 Wave 2) |
| B — Freelancer depth | 9.1/10 | 9.3/10 | Rate card auto-expiry, discovered-via routing, freelancer analytics stub, freelancer-start preview fidelity |
| C — Accessibility | 9.60/10 | 9.75/10 | VoiceOver pass on freelancer.html, Lighthouse baselines, keyboard nav audit across all 6 pages |
| D — Artist profile polish | 9.75/10 | 9.80/10 | Close circle badge on fan cards, fan count milestone nudge, Spotify embed fallback, pre-release countdown precision |
| E — Admin UX depth | 9.92/10 | 9.95/10 | Hour heatmap peak annotation, CSV export field expand, fan dark mode toggle, settings UX improvements |

---

## Dimension A — Fan dashboard depth
*Score: 9.80/10 → target 9.85/10. Fan profile page, first-10 badge, close circle, dark mode.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan profile page: minimal self-view — name, artists followed (count + avatars), sign-up dates, "Manage preferences" link with notification toggle and unfollow | FAN | 4 | 3 | M | 2 |
| 2 | "First 10" badge: when fan was among first 10 sign-ups for an artist — show `"First 10"` badge on artist card in fan.html | FAN | 3 | 2 | M | 2 |
| 3 | Close circle badge: when fan is in close circle tier — show `"Close circle"` chip on artist card | FAN | 3 | 1 | L | 1 |
| 4 | Fan dark mode: fan.html inherits accent + theme token from the artist's profile when visiting single-artist context (URL param `?artist=slug`) | FAN | 2 | 2 | M | 2 |
| 5 | Fan "Artists" tab: render followed artist card grid in the Artists nav tab (currently no content) — avatar, name, genre, follow date | FAN | 4 | 2 | M | 1 |
| 6 | Fan "Me" tab: show fan email (from `sessionStorage able_this_fan_email`), followed count, notification status summary | FAN | 3 | 2 | M | 1 |
| 7 | Fan revisit streak: show "You've visited 3 days in a row" in the Me tab when `fan_last_visit` streak detectable | FAN | 2 | 1 | L | 2 |
| 8 | Fan geo: persist geo across sessions — show "You're ~1.2km from Fabric" on Near Me event cards when cached lat/lng exists (verify C22 #22 correct) | FAN | 3 | 1 | L | 1 |
| 9 | Fan notification opt-in: verify "Notify me" button correctly persists `notifications: true` across sessions — confirm `able_fan_following` write works | FAN | 3 | 1 | L | 1 |
| 10 | Fan pre-release strip: when followed artist has upcoming release date — show countdown strip in feed ("Luna Waves drops in 3 days") | FAN | 4 | 2 | M | 2 |

---

## Dimension B — Freelancer depth
*Score: 9.1/10 → target 9.3/10. Rate card expiry, analytics stub, profile page improvements.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Rate card auto-expiry: rate card shows expiry warning when `rateCard` hasn't been updated in > 90 days — "Last updated X months ago" below rate | FL | 3 | 2 | L | 1 |
| 12 | Discovered-via routing verify: when artist credits a freelancer (confirmed, handle set) — tapping credit links to `freelancer.html?handle=[handle]`; freelancer.html reads `?handle` param | FL | 5 | 2 | M | 1 |
| 13 | freelancer.html `?handle` param: read `URLSearchParams('handle')` on load; use to look up `able_freelancer_profiles[handle]` in localStorage; fall back to demo data | FL | 5 | 2 | M | 1 |
| 14 | Freelancer profile view count: track profile views in `able_fl_views` array; show "X profile views this week" in admin freelancer page | FL/ADM | 3 | 2 | L | 2 |
| 15 | Freelancer-start preview fidelity: Step 4 preview should show artist's actual name (from `able_v3_profile`) or prompt for name if not set | FST | 3 | 1 | L | 1 |
| 16 | Freelancer enquiry email field: add email field to enquiry form in freelancer.html (currently 4 fields: name, project, budget, message — add email) | FL | 4 | 1 | L | 1 |
| 17 | Freelancer portfolio embed: if `portfolio[0].embedUrl` is set — render an actual iframe embed in the portfolio section | FL | 4 | 2 | M | 2 |
| 18 | Freelancer rate card formatting: show rates as individual line items (split by `\n`) with slight visual separation | FL | 2 | 1 | L | 1 |
| 19 | Freelancer-start.html: name input in Step 3 (currently only bio + rate + availability) — prompt for name if `able_v3_profile.name` not set | FST | 3 | 1 | L | 1 |
| 20 | Freelancer artists strip: on freelancer.html — "Artists on ABLE" strip renders artists from `credits[].handle` that have confirmed ABLE profiles (currently static demo) | FL | 3 | 2 | M | 2 |

---

## Dimension C — Accessibility
*Score: 9.60/10 → target 9.75/10. VoiceOver pass, Lighthouse, keyboard nav.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | VoiceOver — freelancer.html: credits list `aria-label` on confirmed/pending; enquiry form labels; sheet close; availability chip group | FL | 5 | 2 | M | 1 |
| 22 | VoiceOver — freelancer-start.html: role grid `role=listbox` + options; step transitions announced; progress bar; nav buttons | FST | 4 | 2 | M | 1 |
| 23 | Lighthouse — able-v8.html: capture Performance / Accessibility / Best Practices / SEO baseline score (Playwright) | V8 | 3 | 1 | L | 1 |
| 24 | Lighthouse — admin.html: capture admin dashboard Lighthouse score | ADM | 3 | 1 | L | 1 |
| 25 | Keyboard nav — fan.html: verify tab order: Following → Discover → Near me tabs; artist card focus; follow button; notification nudge dismiss | FAN | 4 | 2 | M | 1 |
| 26 | Keyboard nav — freelancer.html: enquiry sheet trap + dismiss; portfolio embed skip; credits list navigation | FL | 3 | 2 | M | 2 |
| 27 | Skip link: add `<a href="#main" class="sr-only">Skip to main content</a>` to freelancer.html (missing from V1 shell) | FL | 3 | 1 | L | 1 |
| 28 | Focus visible: verify `:focus-visible` styles on fan.html artist cards, follow buttons, and tab controls at 2px+ offset | FAN | 3 | 1 | L | 1 |
| 29 | Reduced motion: verify sparkline tooltip + hour heatmap tooltip transitions respect `prefers-reduced-motion` | ADM | 2 | 1 | L | 1 |
| 30 | `lang` attribute: verify `lang="en"` present on freelancer-start.html and freelancer.html `<html>` element | FL/FST | 2 | 1 | L | 1 |

---

## Dimension D — Artist profile polish
*Score: 9.75/10 → target 9.80/10. Close circle badge, fan milestones, Spotify fallback.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Close circle badge on fan sign-up: when artist has close circle enabled — show `"Close circle"` option in fan sign-up form (checkbox or separate CTA) | V8 | 4 | 2 | M | 2 |
| 32 | Fan count milestone nudge: admin shows `"You just hit 50 fans — "` nudge when fan count crosses 10, 50, 100 milestones for the first time | ADM | 3 | 2 | M | 2 |
| 33 | Pre-release countdown precision: verify countdown shows `"X days Y hours"` when < 48h remaining (C21 carry-over) | V8 | 3 | 1 | L | 1 |
| 34 | Spotify embed fallback: when Spotify iframe fails to load — show `"Open on Spotify →"` link instead of broken embed | V8 | 4 | 2 | M | 2 |
| 35 | Release card artwork: when `profile.release.artworkUrl` missing — show music note icon placeholder in release section | V8 | 3 | 1 | L | 1 |
| 36 | CTA dedup audit: run global URL dedup check — verify same URL cannot appear in both Hero CTAs and Quick Action pills simultaneously | V8 | 4 | 1 | L | 1 |
| 37 | Fan sign-up form label: `aria-label` on email input should read `"Your email — [Artist] will keep your details safe"` | V8 | 3 | 1 | L | 1 |
| 38 | Profile link share: when sharing profile link from admin — copy URL should resolve to `https://ablemusic.co/[slug]` not local path | ADM | 3 | 1 | L | 1 |
| 39 | Snap card reorder: verify ↑↓ buttons on snap cards work correctly after C21 #29 was already confirmed — Playwright automated check | ADM | 2 | 1 | L | 1 |
| 40 | Hero CTA button text overflow: verify CTA button text doesn't overflow at 375px with long URL labels | V8 | 3 | 1 | L | 1 |

---

## Dimension E — Admin UX depth
*Score: 9.92/10 → target 9.95/10. Analytics improvements, settings, fan dark mode toggle.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Hour heatmap peak annotation: show `"Peak: 9pm"` label below heatmap at peak hour when data available | ADM | 3 | 1 | L | 1 |
| 42 | CSV export field expand: add `utm_medium`, `utm_campaign`, `double_opted_in` fields to analytics CSV export | ADM | 3 | 1 | L | 1 |
| 43 | Fan dark mode toggle: in settings — `"Enable dark mode for fan sign-up form"` switch that sets `profile.fanFormDark = true`; applies `color-scheme: dark` class to fan capture section | ADM | 2 | 1 | L | 2 |
| 44 | Settings page search: add a search/filter input at top of settings sheet that filters visible settings rows in real-time | ADM | 2 | 2 | L | 2 |
| 45 | Admin nudge dismiss persistence: verify dismissed nudges in `able_dismissed_nudges` are respected across sessions — nudge never re-appears | ADM | 3 | 1 | L | 1 |
| 46 | Gig mode countdown badge: on admin home stats row — show `"Gig in Xh Ym"` chip when gig mode is active with time remaining | ADM | 3 | 1 | L | 1 |
| 47 | Fan CRM bulk export: export full fan list as CSV with all fields (email, ts, source, utm_medium, campaign, confirmed, level) — verify C20 CRM export correct | ADM | 3 | 1 | L | 1 |
| 48 | Analytics range persistence: verify `_analyticsRangeDays` restores correctly from sessionStorage on tab switch (C21 #25 already implemented — confirm works) | ADM | 2 | 1 | L | 1 |
| 49 | Freelancer enquiry count badge: when new enquiries exist in `able_fl_enquiries` — show count badge on Professional tab in sidebar | ADM | 3 | 1 | L | 1 |
| 50 | Playwright end-to-end: navigate able-v8.html → sign up as fan → verify echo; admin.html → analytics → sparkline tooltip → click bar → tooltip appears | AUTO | 5 | 2 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#3 (close circle badge) → #5 (fan Artists tab) → #6 (fan Me tab) → #8 (geo verify) → #9 (notify verify) → #11 (rate card expiry) → #12 (discovered-via verify) → #13 (freelancer ?handle param) → #15 (start preview name) → #16 (enquiry email field) → #18 (rate card formatting) → #19 (start name input) → #21 (VoiceOver FL) → #22 (VoiceOver FST) → #23 (Lighthouse V8) → #24 (Lighthouse admin) → #25 (keyboard fan.html) → #27 (freelancer skip link) → #28 (focus visible fan) → #29 (reduced motion) → #30 (lang attr) → #33 (countdown precision) → #35 (release artwork fallback) → #36 (CTA dedup) → #37 (fan form aria) → #38 (profile link share) → #39 (snap reorder confirm) → #40 (hero CTA overflow) → #41 (heatmap peak label) → #42 (CSV fields expand) → #45 (nudge dismiss) → #46 (gig countdown badge) → #47 (fan CRM export verify) → #48 (range persistence) → #49 (enquiry count badge) → #50 (Playwright E2E)

**Wave 2 (after Wave 1 committed):**
#1 (fan profile page), #2 (first-10 badge), #4 (fan dark mode), #7 (revisit streak), #10 (pre-release strip), #14 (FL view count), #17 (portfolio embed), #20 (FL artists strip), #26 (keyboard FL), #31 (close circle sign-up), #32 (fan count milestone), #34 (Spotify fallback), #43 (fan dark mode toggle), #44 (settings search)

**Wave 3 (polish):**
VoiceOver on real device (freelancer.html + fan.html) · Lighthouse compare before/after Wave 1 · MASTER-SCORECARD update for C23 · Full Playwright audit across all 7 pages
