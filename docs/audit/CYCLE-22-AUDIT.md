# ABLE — Cycle 22 Audit
**Generated: 2026-03-17 | Targeting Supabase validation, freelancer-start.html onboarding, fan.html Supabase realtime, and admin UX polish**
**Scores entering Cycle 22: Artist profile 9.7 · Admin 9.9 · Landing 9.9 · Onboarding 9.9 · Fan dashboard 9.75 · Freelancer profile 9.0 · Analytics system 9.4**

---

## Target dimensions this cycle

| Dimension | Entering score | Target | Why now |
|---|---|---|---|
| A — Supabase production | 7.5/10 | 8.5/10 | Manual smoke tests from C21 Wave 2 still outstanding — fan sync, RLS, magic link, session expiry |
| B — Freelancer onboarding | 8.5/10 | 9.0/10 | `freelancer-start.html` 4-step wizard: role, credits, rate card, preview |
| C — Fan dashboard depth | 9.75/10 | 9.8/10 | Supabase realtime feed, geo distance estimate, fan profile page |
| D — Admin polish | 9.9/10 | 9.95/10 | Sparkline tooltip, analytics CSV export, gig countdown precision, hour heatmap |
| E — Cross-page quality | 9.79/10 | 9.82/10 | 375px audit, VoiceOver pass, Lighthouse baseline, missing artwork fallbacks |

---

## Dimension A — Supabase production readiness
*Score: 7.5/10 → target 8.5/10. Manual validation tasks carried from C21.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 1 | Fan sync smoke test: manually verify `sbSyncFanSignup()` writes to `fans` table — confirm insert succeeds with correct `profile_id`, `email`, `source`, `ts` | V8 | 5 | 2 | H | 1 |
| 2 | Profile sync smoke test: verify `syncProfile()` in admin.html updates `profiles.name` + `profiles.accent` in Supabase | ADM | 5 | 2 | H | 1 |
| 3 | RLS insert test: confirm unauthenticated insert to `fans` is rejected (403) by Supabase RLS policy | DB | 5 | 1 | L | 1 |
| 4 | Magic link flow: verify `supabase.auth.signInWithOtp()` sends email and creates valid session on admin.html onboarding | ADM | 5 | 3 | H | 2 |
| 5 | Session expiry handling: when Supabase session expires mid-session — verify banner shows and re-auth works | ADM | 4 | 2 | M | 2 |
| 6 | Fan count consistency: verify `fans.count` in Supabase matches `able_fans` localStorage length after sign-up | V8 | 4 | 2 | M | 2 |
| 7 | RESEND_API_KEY confirm: verify env var is set in Netlify dashboard, send test email via confirmation endpoint | OPS | 5 | 1 | L | 1 |
| 8 | Fan confirmation email delivery: verify `/.netlify/functions/send-confirmation` sends to correct fan email | OPS | 4 | 2 | H | 2 |
| 9 | Supabase anon key rotation: check if current key (sb_publishable_pRmYph3...) is still valid — refresh if needed | OPS | 5 | 1 | L | 1 |
| 10 | Slug uniqueness constraint: verify `profiles.slug` has UNIQUE index in Supabase — collision causes silent auth failure | DB | 5 | 1 | L | 1 |

---

## Dimension B — Freelancer onboarding
*Score: 8.5/10 → target 9.0/10. Create `freelancer-start.html` 4-step wizard.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 11 | `freelancer-start.html` Step 1: role selector — Mixer, Producer, Mastering, Video, Photography, Other; writes `able_freelancer_profile.role` | NEW | 5 | 3 | M | 2 |
| 12 | Step 2: credits entry — add up to 5 release credits (title, artist name, role) before confirming; same asymmetry rule from freelancer.html | NEW | 5 | 2 | M | 2 |
| 13 | Step 3: rate card — rate input, availability toggle, short bio (max 200 chars); all write to `able_freelancer_profile` | NEW | 4 | 2 | M | 2 |
| 14 | Step 4: preview — live preview of freelancer.html with entered data; "Go live" button saves and redirects | NEW | 5 | 2 | M | 2 |
| 15 | Freelancer onboarding OG: `og:title` = `"Build your professional profile on ABLE"` on freelancer-start.html | NEW | 3 | 1 | L | 1 |
| 16 | Freelancer admin `freelancerEnabled` toggle: in admin.html settings — "Enable professional layer" toggle writes `profile.freelancerEnabled = true` | ADM | 4 | 1 | L | 1 |
| 17 | Freelancer profile link from artist page: when `profile.freelancerEnabled` — add small "Also a professional on ABLE" link in artist profile footer | V8 | 3 | 1 | L | 2 |
| 18 | Freelancer enquiry delivery: enquiries submitted via `freelancer.html` sheet — write to `able_freelancer_profile.enquiries` and show toast with email prompt | FL | 4 | 1 | L | 1 |
| 19 | Freelancer `discovered-via` link verified: when artist credits a freelancer (confirmed: true, handle set) — release card links to `freelancer.html?handle=[handle]` | V8 | 4 | 1 | L | 1 |
| 20 | Freelancer profile JSON-LD verified: `Person` schema with `jobTitle`, `knowsAbout` matches current `able_freelancer_profile` data on load | FL | 3 | 1 | L | 1 |

---

## Dimension C — Fan dashboard depth
*Score: 9.75/10 → target 9.8/10. Supabase realtime, geo, fan profile.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 21 | Fan feed Supabase realtime: subscribe to `able_v3_profile` changes via Supabase realtime — update feed without page reload | FAN | 5 | 3 | H | 2 |
| 22 | Fan location estimate: use `navigator.geolocation` + Haversine to show `"~2.3km from the venue"` on event cards when artist has a show | FAN | 4 | 2 | M | 2 |
| 23 | Fan profile page: minimal fan self-view — artists followed, recent sign-up dates, "Manage preferences" link | FAN | 3 | 2 | M | 2 |
| 24 | Fan "You were first" badge: when fan was among first 10 sign-ups for an artist — show `"First 10"` badge on artist card | FAN | 3 | 2 | M | 2 |
| 25 | Fan revisit same channel: when returning fan (SESSION_SOURCE matches prior `signupSource`) — log `revisit_same_channel: true` | FAN | 3 | 1 | L | 1 |
| 26 | Fan feed empty state artwork: empty state shows artist's artwork (from profile) not just initials | FAN | 2 | 1 | L | 1 |
| 27 | Fan notification opt-in: when fan is on fan.html — prompt "Get notified when [Name] posts?" — writes to `able_fans[].notifications: true` | FAN | 4 | 2 | M | 2 |
| 28 | Fan dark mode: fan.html inherits theme from artist profile (if fan visits single-artist view) | FAN | 2 | 1 | L | 2 |
| 29 | Fan referral source display: fan.html shows `"You found [Name] via Instagram"` when `signupSource` stored | FAN | 3 | 1 | L | 1 |
| 30 | Fan close circle badge: when fan is in close circle — show `"Close circle"` chip on artist card in fan.html | FAN | 3 | 1 | L | 1 |

---

## Dimension D — Admin analytics polish
*Score: 9.9/10 → target 9.95/10. Sparkline tooltip, CSV export, hour heatmap.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 31 | Sparkline tooltip: on canvas tap — show `"N views on [Day]"` tooltip for each bar (tap/mouseover) | ADM | 3 | 2 | M | 2 |
| 32 | Analytics CSV export: export raw click events as CSV (label, type, ts, source, zone) — Artist Pro gate | ADM | 4 | 2 | M | 2 |
| 33 | Click heatmap by hour: group clicks by hour of day (0–23), show 24-bar chart in Pro analytics gate preview | ADM | 3 | 2 | M | 2 |
| 34 | Gig mode countdown precision: gig timer shows `"X hours Y minutes"` below gig strip when < 4h remaining — verify C21 #26 correct | ADM | 2 | 1 | L | 1 |
| 35 | Release card missing artwork: when `rel.artworkUrl` is missing — show `--color-card` placeholder with music note icon — verify C21 noted | ADM | 3 | 1 | L | 1 |
| 36 | Analytics CTR by state — empty state: when only one state has data, hide bar entirely (not show 0%) | ADM | 2 | 1 | L | 1 |
| 37 | Sparkline canvas `aria-label` updates with range: when 30d — `"Daily page views over the last 30 days"` | ADM | 2 | 1 | L | 1 |
| 38 | Admin CRM search — result count: show `"3 fans match"` below search input when active | ADM | 2 | 1 | L | 1 |
| 39 | Freelancer admin tab — `freelancerEnabled` toggle in settings: when toggled on, tab reveals without page reload | ADM | 4 | 1 | L | 1 |
| 40 | Admin snap card sheet title: `openAdminSheet` for snap card edit should show card's own title in sheet header (not just icon) | ADM | 2 | 1 | L | 1 |

---

## Dimension E — Cross-page quality
*Score: 9.79/10 → target 9.82/10. 375px audit, VoiceOver, Lighthouse.*

| # | Improvement | Page | Impact | Effort | Risk | Wave |
|---|---|---|---|---|---|---|---|
| 41 | 375px audit — freelancer.html: verify no horizontal scroll, all tap targets ≥ 44px, credit rows readable | FL | 4 | 1 | L | 1 |
| 42 | 375px audit — admin freelancer page: verify rate card, credits list, enquiries all render correctly at 375px | ADM | 3 | 1 | L | 1 |
| 43 | 375px audit — landing.html professionals section: verify 2 cards stack correctly, no overflow | LND | 3 | 1 | L | 1 |
| 44 | VoiceOver — freelancer.html: confirm credits list `aria-label` on confirmed/pending, enquiry form labels, sheet close | FL | 4 | 2 | M | 2 |
| 45 | VoiceOver — fan echo nudge: `#fan-optin-nudge` should have `role="status"` so screen readers announce it when shown | V8 | 3 | 1 | L | 1 |
| 46 | Lighthouse — able-v7.html baseline: capture pre-Supabase Lighthouse score (Performance / Accessibility / Best Practices / SEO) | V8 | 3 | 1 | L | 1 |
| 47 | Lighthouse — admin.html baseline: capture admin dashboard Lighthouse score | ADM | 3 | 1 | L | 1 |
| 48 | Privacy policy page: `privacy.html` exists (created in C20?) — verify it loads and has meaningful content for fan sign-up link | OPS | 4 | 1 | L | 1 |
| 49 | Terms page: `terms.html` — verify it exists and loads for artist onboarding link | OPS | 3 | 1 | L | 1 |
| 50 | Playwright smoke test: navigate able-v7.html → sign up as fan → check echo copy; navigate admin.html → analytics → sparkline visible | AUTO | 5 | 2 | L | 1 |

---

## Execution sequence

**Wave 1 (do first — highest impact × lowest effort):**
#7 (RESEND_API_KEY — manual) → #9 (anon key check — manual) → #10 (slug uniqueness — manual) → #15 (freelancer-start OG) → #16 (freelancerEnabled toggle in settings) → #18 (enquiry delivery) → #19 (discovered-via link) → #20 (JSON-LD verify) → #25 (revisit same channel) → #26 (fan feed empty artwork) → #29 (fan referral source) → #30 (fan CC badge) → #34 (gig countdown verify) → #35 (missing artwork verify) → #36 (CTR empty state) → #37 (sparkline aria-label) → #38 (CRM search count) → #39 (freelancer tab toggle in settings) → #40 (snap card sheet title) → #41 (375px freelancer.html) → #42 (375px admin freelancer) → #43 (375px landing pros) → #45 (echo nudge role=status) → #46 (Lighthouse V8) → #47 (Lighthouse admin) → #48 (privacy.html verify) → #49 (terms.html verify) → #50 (Playwright smoke)

**Wave 2 (after Wave 1 committed):**
#1 (fan sync smoke — manual), #2 (profile sync smoke — manual), #3 (RLS test — manual), #4 (magic link — manual), #5 (session expiry — manual), #6 (fan count sync — manual), #8 (email delivery — manual), #11 (freelancer-start Step 1), #12 (Step 2 credits), #13 (Step 3 rate card), #14 (Step 4 preview), #17 (pro layer artist link), #21 (fan realtime), #22 (geo distance), #23 (fan profile page), #24 (first-10 badge), #27 (fan notify opt-in), #28 (fan dark mode), #31 (sparkline tooltip), #32 (analytics CSV), #33 (hour heatmap), #44 (VoiceOver freelancer)

**Wave 3 (polish):**
Full Playwright audit across all 6 pages · VoiceOver on real device · Lighthouse compare (before/after Supabase) · MASTER-SCORECARD update for C22
