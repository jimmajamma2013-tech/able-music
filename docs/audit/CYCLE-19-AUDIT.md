# ABLE — Cycle 19 Audit
**Generated: 2026-03-17 | Targeting fan dashboard polish, analytics event gaps, landing conversion, copy system, and G-series product logic fixes**
**Scores entering Cycle 19: Fan dashboard 9.7 · Artist profile 9.6 · Landing 9.8 · Onboarding 9.9 · Accessibility 9.5 · Admin 9.9**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Fan dashboard | 9.7/10 | 9.8/10 | Geo filter (#9), new-drop badge (#10) from C18W2 still unimplemented |
| B — Analytics fidelity | 8.5/10 | 9.0/10 | G8 audit: hero CTA, gig toggle, fan sign-up events missing or incomplete |
| C — Source attribution | 8.5/10 | 9.0/10 | G9: getUtmSource() undefined fallback, session caching absent |
| D — Copy system | 9.3/10 | 9.5/10 | D10: snap-card/Updates vocabulary locked in; D6 admin fan-list empty state variants |
| E — Landing conversion | 9.8/10 | 9.9/10 | Hero sub-copy pain-first rewrite; CTA hierarchy final check |

---

## Dimension A — Fan dashboard
*Score: 9.7/10 → target 9.8/10. Carry-forward from C18W2.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | "New drop" badge on artist card in Following tab: when followed artist has a release newer than `fan_last_visit` — show `New drop` pill on their card | FAN | 4 | 2 | M | 1 |
| 2 | Near me geo filter: when user grants geolocation — show "Near me" toggle in Coming Up tab that filters shows within 50 miles using Haversine distance | FAN | 5 | 3 | M | 2 |
| 3 | For you tab empty improvement: when `able_fan_following` is empty — show "Follow artists by visiting their pages and signing up." with link to `landing.html` | FAN | 3 | 1 | L | 1 |
| 4 | Feed item source label: when `item.source` is set — show a small "via [source]" label below the feed item timestamp | FAN | 3 | 1 | L | 1 |
| 5 | Following tab artist card skeleton: when `able_fan_following` is loading — show 3 skeleton cards (shimmer) before real data renders | FAN | 3 | 2 | M | 2 |
| 6 | Fan name personalisation on "For you" tab: when `localStorage.getItem('fan_name')` is set — show "For you, [Name]." as tab heading | FAN | 3 | 1 | L | 1 |
| 7 | Near me tab shows count badge: once geo is granted and shows filtered — show "(N)" count next to "Near me" tab label | FAN | 3 | 1 | L | 2 |
| 8 | Feed item artwork: when `item.artworkUrl` is set — show a 48×48 thumbnail beside the feed item title (same pattern as artist card avatar) | FAN | 3 | 1 | L | 1 |
| 9 | Pull-to-refresh hint text: add `aria-label="Pull down to refresh"` to the scroll container top edge — no gesture change, just label for SR | FAN | 2 | 1 | L | 1 |
| 10 | Empty Near me state: when geo granted but no shows within 50 miles — show "No shows near you in the next 3 months." with "Expand radius →" link | FAN | 3 | 1 | L | 2 |

---

## Dimension B — Analytics event fidelity
*Score: 8.5/10 → target 9.0/10. G8 audit gaps: missing events on hero CTAs, gig toggle, fan sign-up, admin preview contamination.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | Hero CTA primary `trackClick`: verify `trackClick(label, 'cta', 'hero')` fires on every hero CTA tap — currently `js-cta-primary` clicks may not fire in all states | V8 | 5 | 1 | L | 1 |
| 12 | Fan sign-up `trackFan` + `trackClick`: verify `trackClick('fan-signup', 'fan', 'capture')` fires immediately after successful sign-up, before echo state | V8 | 5 | 1 | L | 1 |
| 13 | Gig toggle analytics: when admin flips gig toggle ON — fire `trackClick('gig-mode-on', 'admin', 'campaign')` and when flipped OFF — fire `trackClick('gig-mode-off', 'admin', 'campaign')` | ADM | 4 | 1 | L | 1 |
| 14 | Campaign state change analytics: when admin saves a state override — fire `trackClick('state-override-' + state, 'admin', 'campaign')` | ADM | 4 | 1 | L | 1 |
| 15 | Admin preview contamination: `isOwnerVisit()` must suppress all `trackView`, `trackClick` events — add guard at top of both tracking functions | V8 | 5 | 1 | L | 1 |
| 16 | Platform pill tap tracking: each platform pill click should fire `trackClick(platform, 'platform', 'pills')` — currently only Hero CTAs and section buttons are tracked | V8 | 4 | 1 | L | 1 |
| 17 | Support pack tap tracking: `trackClick(pack.label, 'support', 'support-section')` is referenced but verify it fires on actual link click not just button click | V8 | 3 | 1 | L | 1 |
| 18 | Merch item tap tracking: when a merch card is tapped — fire `trackClick(item.name, 'merch', 'merch-section')` | V8 | 3 | 1 | L | 1 |
| 19 | World map cell tap tracking: when a wm-cell with moments is tapped — fire `trackClick(dateStr, 'calendar', 'world-map')` | V8 | 3 | 1 | L | 1 |
| 20 | `trackView` deduplication: verify `trackView` only fires once per page load, not on every tab switch (currently `renderFanCapture` may re-fire on state changes) | V8 | 4 | 1 | L | 1 |

---

## Dimension C — Source attribution
*Score: 8.5/10 → target 9.0/10. G9 audit: resolveSource() gaps, session caching, XSS sanitisation.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | `getUtmSource()` undefined fallback: when `URLSearchParams.get('utm_source')` returns null AND `document.referrer` is empty — return `'direct'` not `undefined` | V8 ADM | 5 | 1 | L | 1 |
| 22 | Session source caching: set `sessionStorage.setItem('_able_src', resolvedSource)` on first page load — all subsequent events use cached source not re-resolved | V8 | 4 | 1 | L | 1 |
| 23 | Source normalisation: map `'ig'` → `'instagram'`, `'tt'` → `'tiktok'`, `'yt'` → `'youtube'`, `'sc'` → `'soundcloud'` before storing — currently unnormalised sources pollute admin breakdown | V8 | 4 | 1 | L | 1 |
| 24 | Source XSS sanitisation: `resolvedSource` must be passed through `escHtml()` before being stored in localStorage or displayed in admin — currently raw query param value | V8 ADM | 5 | 1 | L | 1 |
| 25 | TikTok in-app browser referrer: when `navigator.userAgent` contains `TikTok` — set source to `'tiktok'` even when referrer is blank (in-app browsers strip referrers) | V8 | 4 | 1 | L | 1 |
| 26 | Instagram in-app browser referrer: same pattern — `Instagram` in UA → `'instagram'` | V8 | 4 | 1 | L | 1 |
| 27 | Admin source breakdown display: in stats page — show top 5 sources by fan sign-up count in a simple list (already computed, not displayed) | ADM | 4 | 2 | M | 2 |
| 28 | `?ref=` parameter support: `?ref=newsletter` should be treated as source — currently only `?utm_source=` and `?source=` are read | V8 | 3 | 1 | L | 1 |
| 29 | Source on fan sign-up echo: when fan sees echo state — record whether the sign-up source matches current session source (returning-via-same-channel metric) | V8 | 3 | 2 | M | 2 |
| 30 | `history.replaceState` URL cleanup: after capturing `utm_source`, remove it from the URL bar to prevent accidental sharing with tracking params | V8 | 3 | 1 | L | 2 |

---

## Dimension D — Copy system
*Score: 9.3/10 → target 9.5/10. D10 vocabulary resolved; D6/D7 spot fixes.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Hero sub short copy: current "Release day. Gig night. What's next. Every fan email is yours. Forever." — rewrite to pain-first: "Your fans land on a link tree that hasn't changed since your last release." (then ABLE as solution) | LND | 4 | 1 | L | 1 |
| 32 | Admin fan-list empty secondary copy: `'When fans sign up on your page, they\'ll appear here.'` at line 5339 — extend to full spec copy: `'Your list. Your relationship. No algorithm in the way.'` | ADM | 3 | 1 | L | 1 |
| 33 | Shows empty state copy: `'ABLE will surface it'` (platform voice) → `'It'll appear here automatically.'` (neutral) | ADM V8 | 3 | 1 | L | 1 |
| 34 | World map empty state: `'No upcoming moments yet'` uses the internal term "moments" → `'Nothing coming up. Add a show, drop, or session.'` | ADM | 3 | 1 | L | 1 |
| 35 | Start.html Spotify fallback error: when Spotify fetch fails — show `'We couldn't reach Spotify right now — you can still set everything up manually.'` not a generic fallback | STR | 4 | 1 | L | 1 |
| 36 | Landing pricing CTA audit: verify none of the pricing card CTAs use `'Get started'` (banned) — should be `'Your page is free →'`, `'Start Artist →'`, `'Start Pro →'`, `'Talk to us →'` | LND | 3 | 1 | L | 1 |
| 37 | Admin gig hint copy: `'Flip this on show day — puts tickets front and centre. Auto-expires in 24 hrs.'` — change "Flip" to "Switch" (less colloquial for international artists) | ADM | 2 | 1 | L | 1 |
| 38 | Fan capture heading when live: `'[Title] is out now.'` — verify the period is present (no exclamation mark) and title is not truncated at <30 chars | V8 | 3 | 1 | L | 1 |
| 39 | Admin toast copy — milestone: when artist hits 50 fans — show `'50 fans. That's a real audience now.'` (currently shows generic milestone toast) | ADM | 3 | 1 | L | 1 |
| 40 | Credit confirmation copy: `'Confirmed credit'` aria-label on the checkmark — change to `'Confirmed by [name]'` when `rec.confirmedBy` is set | V8 | 3 | 1 | L | 2 |

---

## Dimension E — Landing conversion
*Score: 9.8/10 → target 9.9/10. Final polish: pain-first hero, CTA hierarchy, social proof specificity.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | Hero sub-short pain-first rewrite: `'Release day. Gig night. What's next. Every fan email is yours. Forever.'` is product-first → change to `'Your fans leave your link in bio and never come back. Give them somewhere worth returning to.'` | LND | 5 | 1 | M | 1 |
| 42 | Social proof specificity: `'Join 1,200+ artists already on ABLE.'` — when possible, add `'across 40+ countries'` to add scope | LND | 3 | 1 | L | 1 |
| 43 | Testimonial placement: move the testimonial block above the pricing section — currently below it, but social proof works better immediately before the purchase decision | LND | 4 | 1 | L | 1 |
| 44 | Second CTA button copy: `'See a live example'` → `'See LUNA's page →'` — named artist is more credible than generic "example" | LND | 4 | 1 | L | 1 |
| 45 | FAQ expansion persistence: when a FAQ item is opened — persist its `open` state through scroll (currently `<details>` native; confirm no scroll-jank on mobile) | LND | 3 | 1 | L | 1 |
| 46 | Feature section hover lift parity: each feature card `.feature-card` should match the `.pricing-card:hover` lift (4px translateY + shadow) — currently inconsistent | LND | 3 | 1 | L | 1 |
| 47 | Marquee ticker pause on hover: `animation-play-state: paused` on hover — standard pattern for moving content accessibility | LND | 3 | 1 | L | 1 |
| 48 | OG image verify: confirm `og:image` at `<meta property="og:image" content="/og-default.jpg">` resolves on ablemusic.co — file exists locally, verify Netlify serves it | LND | 4 | 1 | L | 1 |
| 49 | Pricing card border on featured: `pricing-card--featured` should have `border: 1.5px solid var(--accent)` not just the `::before` gradient top — match design spec | LND | 3 | 1 | L | 1 |
| 50 | Footer schema: add `<script type="application/ld+json">` `Organization` schema with `name`, `url`, `logo`, `sameAs` (Spotify for Artists, Instagram) to landing footer | LND | 4 | 1 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#1 (new drop badge) → #3 (for you empty improvement) → #4 (feed source label) → #6 (fan name personalisation) → #8 (feed item artwork) → #9 (pull-to-refresh aria) → #11 (hero CTA trackClick) → #12 (fan sign-up trackFan) → #13 (gig toggle analytics) → #14 (campaign state analytics) → #15 (owner preview contamination guard) → #16 (platform pill tracking) → #17 (support pack tracking verify) → #18 (merch tracking) → #19 (wm cell tracking) → #20 (trackView dedup) → #21 (getUtmSource fallback) → #22 (session source cache) → #23 (source normalisation) → #24 (source XSS guard) → #25 (TikTok UA detect) → #26 (Instagram UA detect) → #28 (?ref= support) → #31 (hero sub pain-first) → #32 (fan-list secondary copy) → #33 (shows empty copy) → #34 (wm empty copy) → #35 (Spotify error copy) → #36 (pricing CTA audit) → #37 (gig hint copy) → #38 (fan capture heading verify) → #39 (milestone toast copy) → #41 (hero sub rewrite) → #42 (social proof scope) → #44 (second CTA copy) → #45 (FAQ persistence) → #46 (feature card hover) → #47 (marquee pause) → #48 (OG image verify) → #49 (pricing border) → #50 (footer schema)

**Wave 2 (after Wave 1 committed):**
#2 (near me geo), #5 (following skeleton), #7 (near me count badge), #10 (near me empty state), #27 (admin source breakdown), #29 (fan echo source match), #30 (history.replaceState cleanup), #40 (credit confirmed-by copy), #43 (testimonial placement)

**Wave 3 (polish):**
Playwright smoke test · Manual 375px · VoiceOver on real device
