# ABLE v5 — Research Addendum
**Added: 2026-03-13 | Supplements: V5_MASTER_BRIEF.md and V5_BUILD_PROMPT.md**
**Authority rank: 2 — subordinate only to V6_BUILD_AUTHORITY.md**

> **Status:** Active addendum. Where this document conflicts with `V6_BUILD_AUTHORITY.md`, that document wins. Known superseded items in this document: Pop vibe font (§1 — Nunito option removed, Barlow Condensed only), body font (Plus Jakarta Sans → DM Sans per §2.11 of authority doc). All other sections remain active corrections.

This document records corrections, gaps, and detail that were not captured in earlier briefs. Read it after V5_MASTER_BRIEF.md and before touching code.

---

## 1. Vibe font corrections (VISUAL_SYSTEM.md is authoritative)

V5_BUILD_PROMPT.md contains some font and accent discrepancies. The table below is correct:

| Vibe | Display font | Primary accent | Alt accent | r-mult |
|---|---|---|---|---|
| Electronic/Club | Barlow Condensed 700 | `#06b6d4` cyan | `#f4b942` amber | 0.6 |
| Hip Hop/Rap | **Oswald 700** (not Bebas Neue) | `#f4b942` gold | `#e05242` red | 0.7 |
| R&B/Soul | Cormorant Garamond 600 italic | **`#e06b7a` rose** (not ochre) | `#f4b942` warm gold | 1.2 |
| Indie/Alt | **Space Grotesk 700** (not Barlow) | `#7ec88a` sage | muted rose | 1.0 |
| Pop | Barlow Condensed 700 (**Nunito option superseded by V6_BUILD_AUTHORITY.md §2.9**) | **`#9b7cf4` indigo** (not amber) | `#e06b7a` rose | 1.4 |
| Rock/Metal | **Oswald 700** (not Barlow) | `#e05242` red | white | 0.6 |
| Acoustic/Folk | Lora 700 serif | **`#d4a96a` warm ochre** | `#7ec88a` sage | 1.3 |

Each vibe also sets its own copy tone:
- Electronic: "Hear it." / "On now." / "Get in."
- Hip Hop: "Get the tape." / "Stream it." (direct, possessive)
- R&B: "Come listen." / "It's out." (intimate, inviting)
- Indie: "New one's up." / "Come if you're near." (low-key, genuine)
- Pop: "Stream now." / "We're going on tour." (energetic, inclusive)
- Rock: "Tickets." / "New record out." (blunt, no fluff)
- Folk: "New song — hope it finds you well." (warm, personal)

---

## 2. "Mid" theme does not exist

CLAUDE.md mentions "Mid" as one of the themes. It is not defined anywhere else and is not implemented. The four themes are: **Dark, Light, Glass, Contrast**. Remove any reference to "Mid."

---

## 3. Landing page headline — use the newer copy

Current `landing.html` uses "THE PAGE THAT PAYS." The COPY_AND_DESIGN_PHILOSOPHY.md (written after the landing page) recommends:

**Headline:** "When they click, be ready."
**Sub:** "Your ABLE page knows what's happening — a new release, a show tonight, or just you as you are. One link that's always the right one."
**Primary CTA:** "Get your page — it's free"
**Secondary CTA:** "See a live example"

"The page that pays" is transactional and wrong register. "When they click, be ready." is smarter, implies intelligence, works for all campaign states.

---

## 4. Micro-interaction priority matrix — what to build in what order

From the full 9-file micro-interaction library. 100 interactions are documented. Build in this order:

### Must build (highest impact, lowest complexity):
1. Scale-down `0.97` press + spring-back on ALL interactive elements
2. Tab indicator slides (spring curve) — never jumps
3. Staggered card bloom on scroll entry (50–60ms stagger per item)
4. Hero name slides up from `translateY(24px)` on load
5. Shimmer skeleton before content loads (1.5s left→right loop)
6. Email field focus glow ring (accent colour, `box-shadow: 0 0 0 3px var(--color-accent-soft)`)
7. Submit: loading spinner → checkmark morph → confetti (20 particles) → "We've got [email]" echo
8. Error shake (4px horizontal × 3)
9. Campaign state crossfade (fade out 150ms, new content slides up 250ms)
10. Gig live pulsing dot (`#8b1e1e` deep red, `scale(1)→scale(1.4)`, 2s loop)
11. Scroll-to-top when re-tapping active tab
12. Lazy image fade-in (blur-up pattern, not blank→sharp jump)
13. Panel slide-up bottom sheet
14. Copy-link flash (accent colour 300ms, text→"Copied")
15. Stats counter animation (count up from 0 on admin load)
16. Fan count pop when new sign-up arrives

### Build second (polish pass):
- Swipe-to-dismiss panels
- Gig mode activation flash (3× accent pulse box-shadow)
- Countdown digit flip (`rotateX(-90deg)` exit, `rotateX(0)` entrance, `perspective(300px)`)
- Tab icon scale `1.0→1.15` on active
- Platform pill wave entrance (left-to-right, 60ms stagger, spring bounce)

### Skip for now:
- Scroll-velocity based blur (GPU too expensive on mid-range Android)
- Force-touch / long-press preview (complexity vs. discoverability ratio wrong)
- Night mode ambient shift (removes artist colour control)

### Non-negotiable rule on all animations:
Only animate `opacity` and `transform`. Never animate `width`, `height`, `top`, `left`, `box-shadow` directly. For shadow animations: animate `opacity` on a pseudo-element containing the shadow. This keeps 60fps on mid-range Android (target: Pixel 5a / Samsung Galaxy A42).

Add `prefers-reduced-motion` fallbacks for every animation — disable all motion, maintain state changes as instant crossfades.

---

## 5. Gig mode — clarifications from brainstorm

- Gig mode auto-expires to **profile state** at 24 hours. Artist does not need to manually turn it off.
- Admin shows a **thin progress ring** countdown on the gig mode toggle so artist sees how much time remains.
- Artist can extend gig mode manually (another 24h toggle).
- The "On tonight" badge in gig state should use deep red `#8b1e1e` — this colour appears **only in gig state**, nowhere else. That restraint is what makes it mean something.

---

## 6. Superfan system — full detail

### Five tiers:
1. **Listener** — signed up, visited the page
2. **Fan** — clicked a CTA, returned ≥1 time
3. **Supporter** — bought something (merch, ticket, tip)
4. **Superfan** — multiple purchases + opened emails + shared the link
5. **Inner Circle** — artist-granted, or unlocked via exclusive purchase tier

### What fans unlock (artist configures):
- Early ticket access before public sale
- Exclusive stems, instrumentals, voice notes
- Private listening party invites
- Name in release credits
- DM access window (timed)
- Physical mail (postcard, signed print)

### Fan-facing visibility:
Fans see **their tier** and **what unlocks next** — not their score. No raw numbers. Fans don't know they're being scored; they feel progression without surveillance.

### Launch Squad mechanic (pre-release):
Artist selects top superfans → sends them: early listen link, shareable card pack, suggested captions, countdown reminder. On release day, one-tap share options. Artist sees who shared and what drove sign-ups. Fans get "Helped launch [release]" badge. This is built from existing fan CRM data — no additional data model needed.

---

## 7. Organic growth loops — build these in, not as features

These compound over time without paid acquisition:

**Collab credit trail:** Artist credits producer on release → credit is a live link to producer's ABLE profile → fans of the track discover the producer.

**Recommendation graph:** Artist A recommends Artist B → B gets "Recommended by A" badge → B's fans discover A. Graph builds itself.

**Fan share mechanic:** Fan shares artist page with their fan ID in the URL → 3+ sign-ups via that share → "Amplifier" badge on fan profile. Artist sees "Top 5 fans who brought you new fans this month."

**QR at gigs:** Every artist gets a custom colour QR code → "Scan to follow" on backdrop/merch/handout → highest-converting offline touchpoint.

**OG preview:** Share link shows "On ABLE" in the OG meta → every share is a passive ABLE impression.

**Free tier footer:** "Made with ABLE" in `var(--color-text-3)` at bottom of free artist pages. Removed on Pro. Tasteful, not a banner.

---

## 8. Ecosytem features — what's coming and when

### Coming in Phase 2 (do not build in v5, but architect to support):

**Rooms** (Artist Pro): Async-first private space. Artist posts voice notes, text, photos — "dispatches." Fans react + reply. Tipping via "Stage Can" (named after the music venue tip jar — keep this name). Whisper API transcribes voice notes for reading-preference fans. The architecture needs: room_id, dispatch_id, reaction model.

**Press Pack** (`ablemusic.co/name/press`): Auto-generated from existing profile data. No new data model needed. Needs a clean URL route and render layer. Artist Pro only.

**Story Mode**: Video assembled from profile data (photo + artwork + 30s track snippet + show date + fan count). Download as 1080×1920 MP4. Start with Bannerbear/Creatomate API, build native later.

**Ablers referral programme**: `ablemusic.co/ref/[code]` referral links, 20–30% commission for 6–12 months. Stripe Connect for payouts. Natural ablers: music YouTubers, production schools, indie blogs, venue social accounts.

---

## 9. v3 current state — what screenshots show

Visual quality is 8.5/10. The design system is working.

**What works:** Dark navy hero with gradient-faded artwork, working 4 themes, clean typography hierarchy, correct CTA structure (filled primary + ghost secondary), platform pills, music cards, events, functioning tab bar with active dot, safe-area management, no horizontal scroll.

**What's incomplete or missing from the screenshots:**
- Micro-interactions not implemented yet (no bloom, no bounce, no confetti — architecture there, not wired)
- No skeleton screens visible on first load
- Merch section partially implemented
- Support section needs tier selection UI
- Fan capture form not visible on home tab
- No bottom sheet panel animations shown

This is not a design failure — it is the execution gap that v5 closes.

---

## 10. Admin.html — what it needs to contain

Design spec is not formally written for admin. Based on all docs, it must contain:

**Campaign HQ:**
- State toggle: Profile / Pre-release / Live / Gig
- Gig mode: on/off toggle + progress ring (24h countdown) + extend button
- Release date setter (date input → auto-switch to pre-release → live states)
- "Your page is in [state] mode" — written in artist voice

**Analytics:**
- "People who came to your page this week" (not "Page views")
- CTA click counts by button
- Fan sign-up rate
- Source breakdown (Instagram, TikTok, direct, etc.)
- Stats count up from 0 on load (animation required)

**Fan list:**
- "People who signed up" (not "Subscribers" or "Leads")
- Email, join date, source, superfan tier
- Export as CSV — on every tier, always
- Segmentation: all / superfans / by source / inactive 60+ days

**Snap cards editor:**
- Create / publish / delete
- Types in v3 MVP: Release, Event, Merch, Text update
- Types in Phase 2: Collab, Kickstarter, Charity, Story Mode

**Profile settings:**
- Name, bio, vibe, accent colour, hero artwork, links
- Colour picker with vibe-aware accent suggestions

**Connections:**
- Spotify OAuth → pulls artist photo, name, top tracks, monthly listeners
- Bandsintown → pulls all upcoming events auto-populate Shows section
- YouTube → pulls latest video, thumbnail, embed
- Connection status badge + spinner on connection loading

**Link copy button:**
- Shows `ablemusic.co/[name]` URL
- One-tap copy → accent flash for 300ms → "Copied"

**QR code:**
- Custom colour QR matching artist accent
- Download PNG button

---

## 11. Brainstorm decisions — settled, do not revisit

These were debated and closed in the 2026-03-13 brainstorm:

| Decision | Resolution |
|---|---|
| Algorithmic discovery? | No. ABLE is not a feed. |
| Show follower counts? | No. Superfan tiers only. |
| Paid promotions inside platform? | No. Breaks artist-fan trust. |
| Wizard mandatory? | Yes, but max 90 seconds. |
| Freelancer profiles separate? | Separate onboarding, discovered via artist credits. |
| Fan-to-fan community? | Deferred. Rooms are artist→fan only. |
| Superfan score transparent? | Tier visible, score hidden. |
| Admin and profile same file? | **Superseded.** V6 decision: admin is a **slide-up panel on able-v6.html** (not a separate page). See V6_BUILD_AUTHORITY.md §6.4. |
| TikTok embeds? | Yes, Phase 2. Snap cards can contain iframe embeds. |
| Gig mode expiry manual or auto? | Auto-expire to profile at 24h. Manual extend available. |

---

## 12. Key data points to bake into copy and design decisions

From USER_RESEARCH.md and Spotify/Luminate 2025 data:
- Pre-saves convert to streams at **3:1 ratio** vs. non-presaved releases
- Artists with <5k followers who build email lists see **40% higher ticket conversion**
- **2% of fans are superfans** who drive 18% of streams and 50% of ticket sales
- **57% of page viewing time** is above the fold — hero CTA must be visible without scrolling at 375×667px (iPhone SE viewport)
- Email autofill has **45% higher conversion** than typed email — `type="email"`, `autocomplete="email"`, `inputmode="email"` are non-negotiable
- Fan capture form should appear at **screenful 3** (not top of page) — fans who scrolled that far have earned the right to be asked

---

---

## 13. Canonical pricing (single source of truth — supersedes all other files)

There is a conflict between `landing.html` (£7/mo) and `PLATFORM_STRATEGY.md` (£9/mo). The correct prices are:

| Tier | Price | Notes |
|---|---|---|
| Free | £0 | Always free. 100 fan sign-ups, 1 snap card, 7-day analytics |
| Artist | **£9/mo** | Billed monthly. £90/yr if annual option offered. |
| Artist Pro | **£19/mo** | Billed monthly. £190/yr annual. |
| Label | **£49/mo** | Up to 10 artist pages, team access, API. |

**`landing.html` must be updated to £9/mo.** Any file showing £7 is wrong. Do not use £7 anywhere.

Annual billing: offer it (save ~17%) but do not complicate the pricing page. Monthly price is the headline. Annual is a "want to save?" option below.

Free tier fan cap: 100 sign-ups. When hit, show the artist: "You've captured 100 fans. Upgrade to Artist to keep growing — your list, no cap." Never delete fans above the cap — just stop capturing new ones until upgrade.

---

## 14. Support pack purchase flow (full UX spec)

**Payment provider: Stripe.** No other provider considered. Reasons: industry standard, best mobile web checkout (Stripe Payment Element), webhook reliability, free tier available, 1.4% + 20p per transaction (UK cards).

### The purchase flow (fan perspective)

1. Fan taps a support pack tier on the artist's profile
2. **Tier card lifts** (`translateY(-4px)`, accent border, `0.12` opacity accent glow) — see micro-interaction #42
3. CTA button below activates: "Support at [Tier Name] — £[price]"
4. Fan taps CTA → **bottom sheet slides up** with Stripe Payment Element embedded
5. Sheet shows: artist name, tier name, price, what's included (1-line description)
6. Stripe Payment Element: card / Apple Pay / Google Pay — Stripe handles the UI
7. On payment success: sheet closes → **confetti burst** (accent + gold) → card glows with full accent border → checkmark appears on tier card
8. Confirmation copy: "You're supporting [Artist Name] at [Tier]. **[Tier description].** Thank you." — specific, warm, not generic
9. Artist receives Stripe webhook → `support_purchases` record created → fan's superfan score updated (+200 pts)

### The purchase flow (artist perspective — setup)

In admin.html → Support tab:

```
Support packs
──────────────────────────────────────────────────
[+ Add a support pack]

   Listener Pack             £5/mo     ☑ Active
   "Thank you for being here"
   Includes: early demo access
   Stripe: price_123...      [ Edit ]  [ Remove ]

   Inner Circle              £15/mo    ☑ Active
   "You keep this going"
   Includes: stems, DM window, credits
   Stripe: price_456...      [ Edit ]  [ Remove ]
```

- "Add a pack" opens a sheet: name, description, price, type (one-time / monthly / lifetime), what's included (free text)
- On save: ABLE creates a Stripe Product + Price via API, stores `stripe_price_id`
- Artist never needs to log into Stripe — ABLE handles it
- Refunds: artist can issue via admin; ABLE passes to Stripe API
- Payout: Stripe Connect. Artist connects their bank via Stripe onboarding. ABLE takes 0% platform cut on support packs (this is a differentiator — say it). Stripe takes their standard fee (1.4% + 20p UK cards).

**The "0% platform cut" message should appear:**
- On the support packs section of the artist profile (subtle, below the packs)
- On the landing page pricing section
- In the admin.html support tab setup flow

---

## 15. Fan capture — double opt-in (GDPR compliance)

Double opt-in is required for fans in the EU/UK. ABLE must implement it correctly.

### Flow

1. Fan enters email and taps "Stay close."
2. Optimistic UI: confetti fires immediately, "We've got you — [email] is on [Artist]'s list." — fan feels confirmed.
3. In background: fan record created with `double_opted_in: false`. Confirmation email sent via Resend.
4. Confirmation email:
   - Subject: "Confirm you want updates from [Artist Name]"
   - Body: "You signed up to hear from [Artist] on ABLE. Tap below to confirm." + confirm button
   - Artist name, artwork if available
   - No marketing language. Plain, honest.
5. Fan taps confirm link → `GET /api/fan/verify?token=...` → `double_opted_in: true`, `opted_in_at` timestamp set
6. Fan redirected to artist profile with `?confirmed=1` → brief "You're confirmed" toast (2s, bottom of screen)

### What happens to fans who don't confirm

- Stored with `double_opted_in: false`
- Cannot be included in email broadcasts (Resend/CAN-SPAM compliance)
- Still counted in fan total (they did sign up — just unconfirmed)
- Reminder email after 7 days: "Still want to hear from [Artist]?" — once only, no further chasing
- After 30 days unconfirmed: soft-delete the record (GDPR — no consent = no storage)

### Artist-facing distinction

In fan list, unconfirmed fans show with a `○` (open circle) instead of `●` (filled). Tooltip: "Awaiting email confirmation."

Analytics note: "X fans on your list. [Y] confirmed for emails." — honest distinction, never hidden.

### GDPR record-keeping

For each confirmed fan, store:
- IP hash at time of opt-in (SHA-256, never raw IP)
- Timestamp of confirmation
- Method: 'double_optin_email'

This is sufficient for a GDPR audit. Artist never sees the IP hash — it's an internal compliance field.

---

## 16. AI features — rate limiting and cost model

**Provider:** Claude API (Anthropic). Model: `claude-haiku-4-5` for real-time suggestions (fast, cheap). `claude-sonnet-4-6` for longer generation tasks (bio writer).

### Cost estimates per request (2026 pricing)
| Feature | Model | Avg tokens | Cost/request |
|---|---|---|---|
| Bio writer | Sonnet | ~400 in, ~150 out | ~£0.004 |
| CTA variants (3×) | Haiku | ~200 in, ~60 out | ~£0.0004 |
| Snap card copy | Haiku | ~250 in, ~80 out | ~£0.0005 |
| Caption generator | Haiku | ~200 in, ~120 out | ~£0.0005 |

Monthly cost per active Artist Pro user generating 5 suggestions/day: ~£0.30/month. Well within the £19/mo tier margin.

### Rate limits (enforced at Worker level)

| Feature | Limit | Reset |
|---|---|---|
| Bio writer | 10 requests/day | midnight UTC |
| CTA variants | 30 requests/day | midnight UTC |
| Snap card copy | 20 requests/day | midnight UTC |
| Caption generator | 20 requests/day | midnight UTC |

Free tier: no AI features. Artist tier: CTA variants + caption generator only. Artist Pro: all features.

### System prompt for all ABLE AI requests

All Claude API calls include this system prompt prefix:
```
You are a copy assistant for ABLE, a platform for independent musicians.
Write in the artist's voice: first person, honest, direct, no marketing language.
Never use: "superfans", "monetise", "grow your audience", "content creator",
"going viral", exclamation marks, generic SaaS phrases.
Write short. Say one true thing. Stop.
```

This ensures outputs match ABLE's copy philosophy without needing per-request policing.

---

## 17. Android back gesture and navigation spec

The back gesture on Android (swipe from left edge) and back button must be handled correctly.

### Bottom sheet panels (booking enquiry, fan list, etc.)
- Back gesture / back button → **closes the sheet** (not back-navigates to previous page)
- Implementation: push a history entry when sheet opens (`history.pushState({panel: 'fanList'}, '')`)
- `window.addEventListener('popstate', ...)` → if `event.state?.panel` exists, close that panel
- Sheet closes with `--ease-accel 250ms` (exits faster than it entered)

### Tab navigation
- Back gesture from a non-home tab → return to Home tab (not browser back)
- Tap Home tab icon → scroll-to-top if already on Home
- Back gesture from Home tab → exit app (browser handles this — do not intercept)

### Deep-linked sections (`ablemusic.co/handle#music`, `#shows`)
- Direct deep link → renders the profile, scrolls to the section
- Back gesture from a deep-linked section → closes deep link state, stays on profile (does not navigate to referring page)
- History: do NOT push a new history entry for section scrolls — they are in-page navigation

### The rule
- **Never use `history.back()`** to navigate within ABLE. It unpredictably exits the profile.
- **Always use `history.pushState()`** when opening a panel (so back gesture closes the panel, not the page).
- Tab switches do NOT push history entries — they are not navigable via back button.

---

## 18. Reduced-motion budget

`prefers-reduced-motion: reduce` is set by a significant portion of users (estimates: 10–20% of iOS users have it enabled). Respect it. But don't eliminate all motion — some state feedback is necessary for usability.

### What to skip entirely (remove animation, show final state)
- Hero name slide-up entrance (show immediately)
- Staggered card bloom (all cards appear at once, no stagger)
- Platform pill shimmer (skip entirely)
- Confetti burst (skip — show success state immediately)
- Artist name gloss pass (skip)
- Stats counter animation (show final number immediately)
- Countdown digit flip (show current value, no rotate)

### What to keep (necessary for usability — use instant crossfade instead)
- Campaign state change: 0ms crossfade instead of 150ms+250ms fade sequence
- Tab indicator: instant jump to new position (no spring slide)
- Theme switch: instant colour change (no fade)
- Error shake: replace with instant red border (no translateX shake)
- Panel slide-up: appear instantly (no translate — just opacity 0→1, 80ms)
- Loading spinner: keep (it communicates that something is happening — no alternative)
- Skeleton shimmer: replace with static skeleton (no moving gradient)

### Implementation
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
Then use JS to check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` for animations that can't be overridden by CSS (Web Animations API, canvas-based confetti, etc.).

---

## 19. Analytics — query reference for admin dashboard

> **PostgreSQL adaptation required.** The queries below were written for Cloudflare D1/SQLite. The v6 backend is Supabase (PostgreSQL). Key differences: `strftime('%s','now','-7 days') * 1000` → `EXTRACT(EPOCH FROM NOW() - INTERVAL '7 days') * 1000`; `DATE(ts/1000, 'unixepoch')` → `DATE(TO_TIMESTAMP(ts/1000))`; `?` placeholders → `$1`, `$2`, etc. The query logic and aggregations are correct — only the syntax needs adapting.

The admin analytics tab shows pre-computed aggregates. These are the exact queries that power each stat (logic is correct; see PostgreSQL note above for syntax adaptation).

### Views this week
```sql
SELECT COUNT(*) as total,
       COUNT(DISTINCT DATE(ts/1000, 'unixepoch')) as days_with_views
FROM views
WHERE profile_id = ?
  AND ts > (strftime('%s','now','-7 days') * 1000)
```

### Views by source (pie chart)
```sql
SELECT COALESCE(source, 'direct') as source, COUNT(*) as count
FROM views
WHERE profile_id = ? AND ts > (strftime('%s','now','-30 days') * 1000)
GROUP BY source
ORDER BY count DESC
```

### CTA clicks by type (bar chart)
```sql
SELECT label, type, COUNT(*) as clicks
FROM clicks
WHERE profile_id = ? AND ts > (strftime('%s','now','-30 days') * 1000)
GROUP BY label, type
ORDER BY clicks DESC
LIMIT 10
```

### Fan sign-ups over time (sparkline)
```sql
SELECT DATE(ts/1000, 'unixepoch') as day, COUNT(*) as signups
FROM fans
WHERE profile_id = ?
  AND ts > (strftime('%s','now','-30 days') * 1000)
GROUP BY day
ORDER BY day ASC
```

### Conversion rate (views → fan sign-ups, 7-day)
```sql
-- Run separately and divide in JS
SELECT COUNT(*) FROM views WHERE profile_id = ? AND ts > (strftime('%s','now','-7 days') * 1000);
SELECT COUNT(*) FROM fans  WHERE profile_id = ? AND ts > (strftime('%s','now','-7 days') * 1000);
-- conversion_rate = fans_7d / views_7d * 100
```

### Top superfans (for fan list default sort)
```sql
SELECT email, tier, decayed_score, last_activity, source
FROM fans
WHERE profile_id = ?
ORDER BY decayed_score DESC
LIMIT 50
```

### Pre-backend (localStorage) equivalents
All of the above are computable from the `able_fans`, `able_clicks`, `able_views` arrays — filter by `ts` and aggregate with `Array.reduce()`. The queries above document the intended logic; the localStorage implementation mirrors it.

---

## 20. Competitive moat — why ABLE is defensible

This section exists so the team (and any investor) can articulate why ABLE is not just a "better Linktree." Four structural moats:

### Moat 1: Data ownership as product philosophy
No competitor has made data portability a core product promise. Linktree, Beacons, and Koji all hold fan data. ABLE does not. Every fan list is exportable, always. This creates trust that compounds: artists who trust ABLE stay; artists who leave take their list with them (which is fine — they'll come back because no other platform offers this). This is a trust moat, not a feature moat. It cannot be easily copied because it requires giving up control.

### Moat 2: The credits graph
As more artists join ABLE and credit their collaborators, the credits graph becomes an asset unique to ABLE. A producer credited on 40 releases across 40 ABLE artists becomes discoverable through all 40. No other platform has this. LinkedIn has endorsements (gameable, not tied to real work). DistroKid has ISRC metadata (backend only, not consumer-facing). ABLE makes credits a live, fan-visible discovery layer. Network effect: the more artists, the more credits; the more credits, the more freelancers join; the more freelancers, the more artists.

### Moat 3: Campaign states (the intelligent page)
No other platform changes what it shows based on where an artist is in their cycle. A Linktree bio link looks the same the day of a release as it does six months later. ABLE's page is alive. The fan who arrives the night before a release sees a countdown. The fan who arrives on show night sees tickets. This is not a feature — it is a fundamentally different product model. It takes significant engineering to do correctly (state logic, Spotify polling, Bandsintown sync) and creates genuine value that can't be replicated by adding a feature to Linktree.

### Moat 4: The superfan system
Knowing who your 1,000 true fans are is worth more to an artist than knowing you have 50,000 Instagram followers. No current platform gives artists this. Spotify Wrapped is annual and artist-side. Instagram shows follower counts. ABLE shows the artist their 50 most engaged fans, what they've done, and what they're likely to do next. Once an artist has 6 months of superfan data, they will not migrate to a platform that has zero of that history.

---

---

## 21. Fan Email Capture — Data-Backed Design Decisions

*Source: GetResponse (multi-industry study), Omnisend (1.24B popup displays, 2025), ContentVerve/WordStream A/B test data, Baymard Institute, Buffer, Smart Blogger, Kit, MailerLite, Bandzoogle*

---

### Conversion benchmarks

| Traffic type | Realistic conversion |
|---|---|
| Cold / discovery (first-time arrival) | 1–3% |
| Warm social traffic (fans from a post they liked) | 5–15% |
| Superfan / direct ask (artist tells audience to sign up) | 20%+ with incentive |
| **Arts & Entertainment landing page average (GetResponse)** | **12.77%** — use as target |

---

### CTA copy — verified findings

**First-person copy outperforms second-person by ~90%** (ContentVerve A/B test, cited by WordStream). Changing "Get your free template" → "Get my free template" = +90% clicks. Applied to ABLE:

| Do not use | Use instead |
|---|---|
| "Sign up" | "I'm in" |
| "Subscribe" | "Count me in" |
| "Get updates" | "Stay close" |
| "Join the list" | "Let's stay close" |

The trust line: "Just [Artist Name]. No spam." — not legal boilerplate. Artist voice.

---

### Form placement

- **Primary:** Directly below the hero/top card — after the fan has seen who this person is, before content sections. Emotional hook is established, intent is up.
- **Secondary:** Bottom of page after all content — deliberate catch-all for fans who scrolled everything.
- **Never:** Pop-up on first visit. Content-gating on first visit. Music fans need to hear before they commit.

Smart Blogger research: forms with prominent above-fold placement improve conversion "by as much as 43%" vs buried forms. But "above fold" on ABLE means the hero, not the form — the artist must land first.

---

### Single field vs multi-field

Counter-intuitive: 2-field forms (email + name) slightly outperform 1-field on landing pages (GetResponse: 11.26% vs 12.73%). However on **mobile inline forms** the difference is negligible; the cliff appears only at 4+ fields.

**ABLE recommendation:** Email only by default. Optional name field the artist can enable in settings. Never 3+ fields on the fan-facing form. Baymard: "14% of users abandon if any field feels unnecessary."

**Non-negotiable:** `type="email"`, `autocomplete="email"`, `inputmode="email"`. Auto-capitalise off. 44px+ button. These directly affect mobile conversion.

---

### Incentives

Omnisend 2025 (1.24B displays): popups with an offer converted at **2.4% vs 1.7%** without — a **41% relative lift**. In music context, strongest incentive = unreleased track / exclusive demo. Second = early access / pre-save. Weakest = "be first to know" (honest but converts less). Overly transactional incentives attract email harvesters; relationship framing produces smaller but higher-quality lists.

---

### Trust signals that move the needle (ranked)

1. Artist name in the CTA copy — "Join Mara's list" outperforms "Join the list"
2. Artist-authored copy that sounds like a person, not a form
3. No subscriber count unless large (>5,000) — Buffer A/B: no-count version outperformed count version
4. "Just [Name]. No spam." in artist voice
5. Privacy policy link — required for GDPR but don't feature it prominently

---

## 22. Creator Pricing Psychology — Specific Upgrade Triggers

*Source: Lenny's Newsletter (1,000+ SaaS products), Kit pricing analysis, Mailchimp, Big Cartel, Patreon, Substack, DistroKid, Influencer Marketing Hub, Signalfire, MusicIndustryBlog*

---

### Freemium-to-paid baseline

Lenny's Newsletter benchmarks:
- Freemium self-serve: 3–5% good, 6–8% great conversion
- Free trial products: 8–12% good, 15–25% great (2–3× the rate of freemium)

**ABLE realistic expectation:** 3–6% of active free users upgrade to Artist (£9/mo). 1,000 active free users → 30–60 paying customers. The conversion window is fans 60–100 on the free tier — that's when the emotion shifts from "interesting tool" to "I need this to work."

---

### The 5 upgrade trigger moments (in priority order)

**1. Hitting the 100-fan limit — the highest-intent moment.**
An artist at 95 fans has validated the product. They know it works. Never surface this as a sudden wall. Show "78/100 fans captured" as a progress bar from fan 1. At 95, the emotion is pride, not frustration. Message at the limit:

> "Your list is full. These are 100 people who asked to hear from you. Don't leave them waiting."

Never: "Upgrade to continue."

**2. Setting a release date / activating pre-release mode.**
Peak emotional stakes. Artist is preparing to put music into the world. Trigger a **14-day Artist tier trial** automatically at this moment. A free-trial model outperforms a hard limit when the artist is in a high-stakes preparation window.

**3. Activating gig mode.**
Same pattern. Show is happening. Stakes are high. Same 14-day trial trigger.

**4. First CTA click data.**
When an artist sees "12 people tapped your Spotify link today," they have proof. A gentle upgrade prompt here outperforms cold upgrade prompts significantly. The emotion is "it's working."

**5. Wanting to send an email broadcast.**
"You have 67 people waiting to hear your news. Send them something." Pure capability-gap trigger.

---

### Pricing language that works vs doesn't

| Works | Doesn't work |
|---|---|
| "Send your record to the 87 people who asked for it" | "Unlock email broadcasts" |
| "You have 23 fans in Manchester — upgrade to see who they are" | "Advanced analytics" |
| "Your list is full — these people want to hear from you" | "Upgrade to continue" |
| Identity upgrade: "You're treating this seriously now" | "Grow your audience" |

Never: exclamation marks. SaaS urgency. "Maximise conversions." These confirmed to underperform with this audience.

---

### Annual vs monthly

UK indie artists on irregular income strongly prefer **monthly billing** despite higher total cost — it preserves cash flow optionality. Always offer both. Default to monthly on the pricing page. Show annual as "want to save 2 months?" option. Annual billing reduces churn 30–50% for those who choose it, but forcing it reduces sign-ups.

---

### The "replace, not add" framing

Artists have subscription fatigue (~£30–80/mo already spent on digital tools). ABLE must position as **replacing** something: ABLE Artist replaces Linktree Pro (£8/mo) + basic email tool (£10/mo). Net saving, more capability. This is the correct objection handler for "I already pay too many subscriptions."

---

## 23. Artist Email Broadcasts — Performance Data

*Source: MailerLite 2025 (3.6M campaigns), Campaign Monitor 2022 (100B+ emails), HubSpot A/B testing, practitioner research*

---

### The benchmark

**Music and musicians: 45.93% open rate** (MailerLite 2025, post-Apple Mail Privacy Protection). Median all industries: 43.46%. Arts/Artist: 49.23%.

Music fans who signed up for an artist's list are a fundamentally different audience from subscribers who joined for a discount. The relationship baseline is higher.

Unsubscribe rate for music: **0.23%** — lower than most industries at equivalent frequencies. Music fans are a high-loyalty audience who want regular contact when the content is genuine.

---

### Plain text vs HTML (settled question)

HubSpot A/B testing: **plain text wins every time.** In some tests, even a single image reduced click rate. HTML emails route to Gmail's Promotional tab, reducing organic opens.

For artists the effect is amplified: plain text signals "personal correspondence from a person I care about." HTML with a logo and footer icons signals "brand newsletter."

**ABLE broadcast format:** Default to near-plain-text. One optional hero image. Artist name as the "From" field, not "ABLE" or "noreply@". No marketing chrome.

---

### Frequency

- **Minimum:** Once a month. Longer creates spam-report risk when they finally hear from the artist.
- **Optimal:** 2–4x per month (bi-weekly recommended starting cadence)
- **Upper ceiling:** Weekly only if quality is consistently high
- Event-driven spikes acceptable: 3 emails in a week around a release is fine

The variable is frequency vs. value, not frequency alone. Weekly with substance outperforms monthly with a Spotify link.

---

### Subject lines

- **6–10 words** = highest open rate
- **Conversational beats announcement** every time: "I wrote this at 3am in a parking lot" outperforms "New track out now"
- **Emojis:** +3% open rate (MailerLite 2025) — marginal but consistent
- **23% of opens occur within the first hour** — timing matters

---

### Content ranking by engagement

1. Behind-the-scenes / process (exclusively available from the artist — #1 by far)
2. Personal updates with stakes ("I took a break because I was burning out and here's what I did")
3. Show announcements told as a story ("I'm nervous about this one")
4. New music reveals with context ("this is the track I almost didn't release")
5. Fan recognition / community
6. Early or exclusive access

---

### Mobile opens

SuperOffice: **81% of all emails opened on mobile.** For music fans (younger, mobile-first), this is likely higher. Every ABLE broadcast decision assumes mobile-first: single column, 16px+ body text, one tappable CTA, nothing that requires desktop.

---

### ABLE broadcast product implications

- Default format: near-plain-text
- Subject line prompt: show examples — "I finished the record last night" not "New release announcement"
- Content prompts: "What are you working on? / What happened this week?" — not "Write your newsletter"
- Always show mobile preview before send
- Default: Thursday 10 AM recipient timezone
- Unsubscribe signal: if >0.5% unsubscribes on a send, surface it: "This one had more unsubscribes than usual. Shorter, more personal sends tend to perform better."
- "From" field: always the artist's name

---

## 24. Mobile Page Speed — Conversion Data

*Source: Google/SOASTA neural network study (Think with Google), Deloitte "Milliseconds Make Millions", web.dev Core Web Vitals, BBC, Lighthouse scoring guide, Felix Krause Instagram in-app browser research, Statcounter*

---

### The core numbers

| Load time vs 1s baseline | Bounce probability increase |
|---|---|
| 1s → 3s | +32% |
| 1s → 5s | +90% |
| 1s → 6s | +106% |

**53% of mobile visitors abandon a page taking more than 3 seconds to load** (Google/SOASTA). BBC: **10% more users lost per additional second**. Deloitte: **0.1 second improvement = 8.4% conversion increase** (retail).

---

### ABLE's structural advantage — protect it

Linktree and Beacons are React SPAs. Their mobile Lighthouse scores are typically 50–65 (orange). LCP commonly 3–4 seconds due to JS hydration overhead.

`able-v3.html` is a single plain HTML file. No hydration. No bundle parsing. No framework routing. Structural ability to hit Lighthouse 90+ on mobile.

**This is a genuine competitive advantage. Never add a JS framework to able-v3.html. The absence of React is a performance feature.**

---

### Performance targets

| Metric | ABLE target | Google "good" threshold |
|---|---|---|
| LCP | ≤ 1.5s | ≤ 2.5s |
| INP | ≤ 200ms | ≤ 200ms |
| CLS | ≤ 0.05 | ≤ 0.1 |
| Total page weight (excl. hero image) | < 200KB | — |
| Hero image (WebP) | < 100KB | — |
| HTTP requests | < 30 | < 50 |
| Lighthouse mobile score | 90+ | — |

ABLE's targets are more aggressive than Google's "good" threshold to account for in-app browser overhead.

---

### The Instagram in-app browser problem

**95%+ of link-in-bio traffic is mobile.** A significant portion arrives via Instagram's in-app browser (WKWebView on iOS) — which:
- Has NO cache sharing with Safari. Every load is cold.
- Instagram injects `pcm.js` (Facebook pixel) on every page, adding a synchronous JS evaluation step
- TikTok uses a custom WebView that does not share Chrome's cache

Treat every link-in-bio load as worst-case cold load on a mid-range device.

**Specific optimisations:**
1. Hero image must be in **initial HTML**, not JS-injected (browser fetches it immediately)
2. Inline critical CSS or defer with `media` attribute
3. `defer` or `async` on all non-essential JS
4. No third-party scripts in `<head>` — load after first paint
5. `rel="preconnect"` for CDN origins
6. `font-display: swap`
7. Hero image as WebP, `fetchpriority="high"` — **do NOT lazy-load the LCP image**
8. No render-blocking CSS

---

### Traffic and scroll depth

- **95%+** of link-in-bio traffic is mobile (design, test, measure for mobile first)
- Fold 1: ~100% of visitors see this
- Fold 2: ~50–60%
- Fold 3 (~75% down): ~20–30%
- Bottom: ~10–20%

This directly justifies the ABLE CTA architecture: hero CTAs must capture the majority use case because most fans will not scroll past fold 2. The fan capture form in fold 3 is correct — only fans who consumed the full page have earned the ask.

---

## 25. Platform Trust — How to Win in the UK Indie Music Community

*Source: Bandcamp/DistroKid/SubmitHub growth history, Help Musicians UK charity records, Featured Artists Coalition documentation, UK music press landscape research*

---

### The trust template: Bandcamp, SubmitHub, DistroKid

All three grew the same way: made a product demonstrably on the artist's side, were honest about what it was and wasn't, let artists spread the word.

**Bandcamp:** Radical pricing transparency (15% → 10% after $5k). Bandcamp Daily real editorial. Bandcamp Fridays (waived fees COVID). No algorithm. "They actually give you the money" is a recommendation that spreads itself.

**SubmitHub:** Built in public (founder blogged every decision and metric). Mandatory feedback on rejections (every rejection has value). Published acceptance rates. Trusted because it was honest, not because it marketed itself.

**DistroKid:** Pricing so obviously better that the math was the marketing. "I release 6 things a year. DistroKid costs me $20. TuneCore costs me $120." Made the recommender look clever for switching.

---

### The 5 triggers that make artists recommend a tool

1. **They felt respected, not managed.** "They actually get what it's like to be a musician" is the most powerful endorsement. All three platforms earned this before they had scale.

2. **They got a specific, talkable win.** "I got 47 fan sign-ups from one Instagram link" is a recommendation. "The dashboard is clean" is not. ABLE's first win must be specific and quantifiable.

3. **The pricing felt like the platform was on their side.** Artists feel clever for choosing ABLE: "It replaces two tools I was paying for."

4. **They saw it on another artist's bio.** Primary discovery mechanism for link-in-bio tools. Every ABLE profile seen by thousands before any press. The profile page IS the advertisement — it must look noticeably better than a Linktree page.

5. **Personal relationship with the founder.** Artists who have spoken to a real person at a company recommend it. "I messaged them and they fixed it in two days" is an extraordinary endorsement.

---

### UK organisations to pursue (in priority order)

**Help Musicians UK**
- 100-year-old charity. Royal patron (King Charles III). Genuinely trusted — not perceived as commercial.
- Provides career development, Music Minds Matter mental health support, hardship assistance, development grants
- **Approach:** Go as a resource, not a sponsor. Ask what their artists struggle with around digital presence. Offer workshops. Earn the mention. A Help Musicians recommendation is worth more than any paid press.

**Featured Artists Coalition (FAC)**
- Founded 2009, represents featured performers (Ed O'Brien, Billy Bragg, Annie Lennox)
- Active in UK parliamentary hearings on streaming economics. Their core message: artists should own their relationship with their audience — identical to ABLE's philosophy.
- **Approach:** Harder to earn but highly valuable. Get on their radar through member artists using ABLE.

---

### Events where the right 500 people are

| Event | Why it matters for ABLE |
|---|---|
| **The Great Escape** (Brighton, May) | Every UK A&R person, manager, tastemaker. Launch moment for emerging UK artists. |
| **SXSW London** (Shoreditch, June) | Tech + music intersection. Artist-fan relationships and data ownership are natural session topics. |
| **Liverpool Sound City** (May) | Grassroots emerging artists with development programs. ABLE's exact demographic. |
| **Independent Venue Week** (January) | Grassroots live circuit. Associating ABLE with independent venues is a genuine trust signal. |

---

### Publications that matter to UK indie artists

| Publication | Why / ABLE angle |
|---|---|
| **DIY Magazine** | Covers Class of 2026 emerging acts. Read by artists themselves. "How artists connect directly with fans" angle. |
| **Loud and Quiet** | Independent, membership-funded, ideologically aligned. Partners with Primavera, End of the Road. Pitch as partner not advertiser. |
| **The Line of Best Fit** | 15+ years, trusted discovery voice. Same angle as DIY. |
| **Gigslutz** | Artists say it feels like being interviewed by a best mate. Trusted because not corporate. Natural editorial partner. |

---

### Online communities where word-of-mouth happens

- **r/WeAreTheMusicMakers** — most active music production Reddit, hundreds of thousands of members, constant "which link-in-bio should I use" discussions. Primary word-of-mouth channel.
- **r/MusicPromotion** — exactly where tools get discussed and recommended
- DIY Magazine Discord, genre-specific Discord servers (shoegaze, UK hiphop, bedroom pop)

**The pattern:** Recommendations are peer-to-peer, triggered by someone asking a direct question. ABLE needs enough positive artist experiences that they volunteer a recommendation when asked.

---

### Building in public

Jason Grishkoff (SubmitHub) is the template. He blogged every metric, every decision, every thing that didn't work. He was a music fan who built a tool — not a tech founder who entered music.

For ABLE: post monthly — how many artists, most-tapped CTA, one artist story. Share decisions NOT built and why. Write in first person, not as a SaaS newsletter but as a music person who cares about artists.

---

*Addendum updated: 2026-03-13. Sections 21–25 added from parallel agent research: fan email capture conversion data, creator pricing psychology, email broadcast performance data, mobile page speed conversion data, UK indie music trust-building research.*

*Addendum updated: 2026-03-13. Sections 13–20 added to cover: canonical pricing, support pack purchase flow, GDPR double opt-in, AI rate limiting and cost model, Android navigation, reduced-motion budget, analytics queries, competitive moat.*

*Original addendum written: 2026-03-13. All items verified against: VISUAL_SYSTEM.md, PLATFORM_STRATEGY.md, ECOSYSTEM_AND_PARTNERSHIPS.md, DISCOVERY_AND_GROWTH.md, MASTER_PLAN.md, USER_RESEARCH.md, docs/micro-interactions/ (9 files), docs/brainstorms/2026-03-13-top-minds-insights.md, design-references/*.html, all root screenshots.*
