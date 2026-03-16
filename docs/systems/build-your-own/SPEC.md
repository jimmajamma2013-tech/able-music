# ABLE Build-Your-Own — Spec
**Created: 2026-03-16 | Authority: primary**

> Specs for 15 purpose-built tools ABLE should build for itself. Each one competes with a market-leading paid product and wins on specificity, not on cost alone.

---

## Tool 1: ABLE Analytics Dashboard
**Beats:** Mixpanel ($25/month)
**Market alternative cost:** $25/month (Free tier limited to 20M events/month, then $28+)
**Build time:** 3 hours
**Why ABLE's version wins:** Mixpanel knows nothing about campaign states, release dates, gig mode, or pre-save CTAs. ABLE's version can show: "Your pre-release state converts fans at 6.2% vs 2.1% in profile state" — that sentence is impossible in Mixpanel without substantial custom event architecture. ABLE has the data already; this is just a display layer.

**Tech stack:**
- Single `analytics.html` file, no dependencies except Chart.js (CDN, free)
- Reads directly from `able_views`, `able_clicks`, `able_fans` localStorage keys (or Supabase via the JS CDN once backend is live)
- PostHog EU Cloud for team-level funnel analytics (free tier: 1M events/month)
- Chart.js for sparklines and source breakdown bars

**MVP spec (V1):**
- Four stat cards: Views (7d), Fans (7d), CTA click rate (7d), Top source
- Source breakdown bar chart (IG / TikTok / QR / Direct / Other)
- Campaign state performance table: pre-release / live / gig / profile — fan conversion rate per state
- Time window toggle: 7d / 30d / All time
- All reads from localStorage. Static HTML file. Works offline.

**10/10 spec:**
- All V1 features, plus:
- Fans/day sparkline with 7-day rolling average
- Top CTA this week with tap count and click-through rate
- Source trend: Instagram traffic this week vs last week (+ or - %)
- Artist cohort view (Supabase query): which onboarding week retains best?
- Campaign state timeline: visual representation of when state changed and fan counts at each transition
- PostHog funnel: wizard start → profile live → first fan → first share
- Export: download full analytics report as CSV (views + clicks + fans)
- GDPR-compliant: no PII in PostHog events (no emails, no IPs)

**Cross-links:**
- `docs/systems/analytics/SPEC.md` — canonical event schemas and aggregation functions
- `docs/pages/admin/DESIGN-SPEC.md` — stat card UI design
- `docs/systems/data-architecture/SPEC.md` — localStorage keys

---

## Tool 2: ABLE Artist Health Monitor
**Beats:** Baremetrics ($50/month)
**Market alternative cost:** $50/month minimum (Baremetrics Metrics)
**Build time:** 4 hours
**Why ABLE's version wins:** Baremetrics is built for SaaS subscription analytics — churn cohorts, MRR movements, LTV calculations for B2B. ABLE's version surfaces music-specific signals: which artists haven't had a page view in 14 days (at-risk of churning), which artists are on the free tier but have captured 80+ fans (upgrade prompt territory), which artists have the platform live but haven't shared their link publicly yet.

**Tech stack:**
- Single `health.html` file or a section within a private `ops.html` page
- Supabase JS CDN: queries the `profiles`, `fans`, `views` tables
- Netlify function: `/.netlify/functions/health-summary` — runs Supabase queries, returns JSON
- No charting library needed for V1 — just a styled table
- Protected by a simple password gate (not Netlify auth — just `?token=` check against an env var)

**MVP spec (V1):**
- Artist table: name, tier, signup date, last page view date, fan count, CTA last tapped
- Red/amber/green status: green (active last 7d), amber (8–14d no views), red (14d+ no views)
- At-risk artists section: artists where `last_view_ts < 14 days ago`
- Weekly fan captures across all artists: total fans this week
- Auto-refreshes every hour via `setInterval` + `fetch` to the Netlify function

**10/10 spec:**
- All V1 features, plus:
- MRR by tier: Free / Artist / Artist Pro / Label — sum per tier, change this month
- Churn events this month: artist cancelled, last active date, fan count at churn (signal for win-back)
- Artists at upgrade inflection: free tier + 80+ fans + no page state change in 30d (they've outgrown free)
- Artist activation funnel: wizard complete → profile live → first fan → first share → first email sent
- Telegram message on: new artist sign-up, churn event, artist hitting fan milestone
- Health score per artist (0–100) based on: recency of activity, fan growth rate, CTA engagement

**Cross-links:**
- `docs/systems/ai-workflow/AI-WORKFLOW.md` — Telegram notification system
- `docs/systems/tier-gates/SPEC.md` — tier definitions and gates
- `docs/systems/data-architecture/SPEC.md`

---

## Tool 3: ABLE Fan CRM
**Beats:** Mailchimp ($30–100/month)
**Market alternative cost:** $35/month at 500 contacts, scales to $100+ at 5k
**Build time:** Already ~40% built in admin.html. Full V1: 3 hours.
**Why ABLE's version wins:** Mailchimp is a generic email marketing platform. It does not know about gig mode, campaign states, or the fact that a fan who signed up during the pre-release period is different from one who signed up after a show. ABLE's version captures the campaign state at sign-up time. That context — "42 fans signed up during my pre-save campaign, 8 came from a gig QR code" — is irreplaceable intelligence for understanding which moments of an artist's career generate the most connection. Mailchimp cannot tell you that. Ever.

**Tech stack:**
- Built directly into `admin.html` — the fan list section already exists
- localStorage: `able_fans` key stores `[{email, ts, source, campaignState, starred}]`
- Add `campaignState` field to fan records when captured: read `able_v3_profile.stateOverride` at sign-up time
- No external dependency. No API calls. No data leaving the artist's browser until Supabase flush.

**MVP spec (V1):**
- Fan list with: email, date joined, source badge (IG / TT / QR / Direct), campaign state at sign-up
- Star/unstar fan (stored in `able_starred_fans`)
- Filter pills: All / Starred / From Instagram / From TikTok / From a show (QR)
- Sort: newest first / oldest first / starred first
- Export as CSV: email, date_joined, source, campaign_state
- Fan count by source: "42 from Instagram, 8 from a gig QR code, 3 direct"
- GDPR delete: per-fan delete button — removes email from `able_fans` permanently

**10/10 spec:**
- All V1 features, plus:
- Bulk actions: export selected, delete selected (with confirmation)
- Search: fuzzy match on email address
- Fan segments: auto-generated — "Gig fans" (signed up via QR), "Pre-save fans" (signed up in pre-release state), "Social fans" (IG + TT combined)
- Fan timeline: when did each fan join, what was the artist doing at that moment?
- Email broadcast integration (Tool 4): select fans by segment, write and send via Resend
- Supabase sync: fan list synced to `fans` table with RLS — artist sees only their own fans

**Cross-links:**
- `docs/systems/analytics/SPEC.md` — fan event schema
- `docs/pages/admin/DESIGN-SPEC.md` — fan list UI design
- `docs/systems/email/SPEC.md` — broadcast email system

---

## Tool 4: ABLE Email Composer
**Beats:** ConvertKit ($29/month)
**Market alternative cost:** $29/month for Creator plan (300 subscribers free, then $29)
**Build time:** 2 hours
**Why ABLE's version wins:** ConvertKit has a visual email builder, template library, automation sequences, landing pages, and a commerce system. ABLE artists need exactly one thing: a text box, a preview, a "Send to all fans" button, and a Resend API call. The visual builder is noise. The automation sequences are irrelevant. The template library produces emails that look like newsletters, not messages from an artist. ABLE's composer outputs plain text with one optional image — the format that actually gets opened and replied to.

**Tech stack:**
- Section within `admin.html` (not a separate file — artists don't need to leave their dashboard)
- Resend API: `POST https://api.resend.com/emails` — single API call, no SDK needed
- `fetch()` from the browser directly to Resend (Resend supports CORS for client-side sends from verified domains)
- Fan list read from `able_fans` localStorage (or Supabase when backend live)
- HTML template: artist name as sender, ABLE footer with unsubscribe link (required)

**MVP spec (V1):**
- Subject line field (max 60 chars, character counter)
- Body textarea (plain text, max 800 chars — forced brevity is a feature)
- Recipient preview: "Sending to 147 fans"
- Character count: "You've written 230 characters. Short enough to feel personal."
- Preview panel: renders a faithful preview of the email as it will appear in inbox
- Send button: fires the Resend API batch send, shows success/failure state
- Sent log: timestamp, subject line, recipient count — stored in localStorage

**10/10 spec:**
- All V1 features, plus:
- Segment selector: send to all fans / pre-save fans / gig fans / starred fans only
- Optional image attachment: drag a JPG/PNG, uploads to Supabase Storage, embeds as inline image
- Open rate tracking: Resend provides open/click data — surface it in the sent log
- Unsubscribe handling: Resend webhook → removes fan from `able_fans` automatically
- Scheduling: send now / send at a specific time (Netlify scheduled function)
- Copy suggestions: "Your last email got 34% open rate. Subject lines with the artist's first name get 12% higher open rates on ABLE." (PostHog-derived insight)

**Cross-links:**
- `docs/systems/email/SPEC.md` — full email system spec
- `docs/systems/build-your-own/Tool 3` (Fan CRM) — fan segments used here
- `docs/systems/data-architecture/SPEC.md`

---

## Tool 5: ABLE Link Rotator
**Beats:** Linktree Pro ($9/month)
**Market alternative cost:** $9/month (Linktree Pro)
**Build time:** This is the product itself. Cost: £0, already building it.
**Why ABLE's version wins:** Linktree doesn't know about campaign states. It can't auto-rotate the hero CTA when a release date arrives. It can't show a countdown. It can't capture fan emails with source attribution. ABLE is a Linktree replacement that understands the music release cycle. This tool is not something to build — it is the reason ABLE exists. The metric here is not build time but shipping velocity: every improvement to `able-v7.html` is an improvement to the core "link rotator" that Linktree charges for.

**Tech stack:** `able-v7.html` — the active artist profile page

**MVP spec (V1):** Current `able-v7.html` state — campaign states, hero CTAs, fan capture

**10/10 spec:** See `docs/pages/profile/SPEC.md` — target score 9.7/10

**Cross-links:**
- `docs/pages/profile/SPEC.md`
- `docs/systems/CROSS_PAGE_JOURNEYS.md`

---

## Tool 6: ABLE Social Media Preview Generator
**Beats:** Canva Pro ($13/month)
**Market alternative cost:** $13/month
**Build time:** 45 minutes
**Why ABLE's version wins:** Canva Pro is a general design tool. An artist using ABLE to write an Instagram post doesn't need a full design suite — they need: a text field, a character counter, and a hashtag bank from their genre. ABLE's version is opinionated: it knows the approved hashtag list per genre, it warns when the caption is too long for TikTok vs Instagram, and it outputs copy that is ready to paste. Canva generates images. ABLE generates words — which is what artists actually need most.

**Tech stack:**
- Single `social-preview.html` file (or a section within `admin.html`)
- Zero external dependencies
- Genre-specific hashtag banks: read from `able_v3_profile.genre` and output relevant tags
- Character counter per platform: Instagram (2,200), TikTok (2,200), Twitter/X (280)
- Copy-to-clipboard: `navigator.clipboard.writeText()`

**MVP spec (V1):**
- Post text area with live character counter
- Platform selector: Instagram / TikTok / Twitter/X
- Character limit warning: amber at 80%, red at 100%
- Hashtag bank: 8–12 genre-relevant hashtags pulled from a local lookup object keyed by genre
- CTA suggestion: pulls the artist's current primary CTA URL from `able_v3_profile` and appends "link in bio"
- Copy button: copies the full post text + hashtags to clipboard
- Preview pane: shows the post as it will look in a feed (approximate, font + spacing only)

**10/10 spec:**
- All V1 features, plus:
- Saved drafts: store up to 10 recent posts in localStorage
- Platform-specific formatting: Instagram allows line breaks; TikTok hashtags go at the end; Twitter strips to first 280 chars
- Best-time suggestions: "Based on ABLE data, artists in your genre get most engagement when posting on Thursday 18:00–20:00."
- Post history: when did you last post? How long since your last Instagram update? (passive nudge to stay consistent)
- A/B caption tester: write two versions, ABLE tracks which one gets more CTA taps (integrates with Tool 10)

**Cross-links:**
- `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md`
- `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`

---

## Tool 7: ABLE OG Image Generator
**Beats:** Cloudinary ($89/month for transformation quotas)
**Market alternative cost:** $89/month (Cloudinary Plus) or custom image pipeline
**Build time:** 3 hours
**Why ABLE's version wins:** Cloudinary is a CDN and transformation service for arbitrary images. ABLE needs one thing: a 1200×630 OG card per artist that pulls their name, genre, and artwork. Satori (from Vercel, free, MIT licence) generates PNG from HTML + CSS on a Netlify edge function. No CDN contract, no per-transformation billing, no vendor lock-in. The output is branded consistently with ABLE's visual system.

**Tech stack:**
- Netlify function: `/.netlify/functions/og-image`
- Satori (npm, MIT licence): converts JSX/HTML to SVG → PNG
- Input: `?artist=slug` → fetches `profiles` row from Supabase → renders PNG
- Output: `Content-Type: image/png` — Netlify caches at edge
- ABLE OG card design: artist artwork (blurred, full background), artist name (Barlow Condensed 72px white), genre pill, ABLE logo mark bottom-right

**MVP spec (V1):**
- Netlify function reads artist profile from Supabase by slug
- Renders: background (artwork or gradient fallback), name, genre, "on ABLE" tagline
- Returns PNG with Cache-Control: 86400 (1 day)
- `able-v7.html` sets `<meta property="og:image" content="/.netlify/functions/og-image?artist=slug">`

**10/10 spec:**
- All V1 features, plus:
- Campaign-state-aware: pre-release card shows countdown ("Out in 3 days"), live card shows "New release", gig card shows "Playing tonight"
- Accent colour from artist profile baked into card design
- Artist-uploadable custom OG: override the generated card with a custom image for a specific release
- Twitter Card support: separate 1200×600 card format
- Automated regeneration: n8n triggers a cache bust when `stateOverride` changes

**Cross-links:**
- `docs/systems/seo-og/SPEC.md` — full OG and SEO spec
- `docs/pages/profile/SPEC.md`

---

## Tool 8: ABLE Uptime + Health Page
**Beats:** Statuspage.io ($79/month)
**Market alternative cost:** $79/month (Atlassian Statuspage Starter)
**Build time:** 2 hours
**Why ABLE's version wins:** Statuspage.io is a hosted service for enterprise incident communication. ABLE needs: a page that shows green/amber/red for Supabase, Netlify, and Resend — the three external services artists depend on. Atlassian charges $79/month for a page that any artist can read. ABLE can build the same thing with a GitHub Action pinging three health endpoints every 5 minutes and writing a JSON file to the repo.

**Tech stack:**
- GitHub Action: runs every 5 minutes, pings `https://status.supabase.com/api/v2/status.json`, `https://www.netlifystatus.com/api/v2/status.json`, `https://status.resend.com/api/v2/status.json`
- Writes result to `public/status.json` in the repo
- Commits and pushes (triggers a Netlify deploy of the status page)
- `status.html`: reads `status.json` on load, renders green/amber/red indicators
- Incident log: the git history of `status.json` is the incident log

**MVP spec (V1):**
- Three service indicators: Supabase / Netlify / Resend — green (operational) / amber (degraded) / red (outage)
- Last checked timestamp: "Checked 3 minutes ago"
- Overall status banner: "All systems operational" / "Degraded performance on Supabase" / "Incident in progress"
- Public URL: `status.ablemusic.co` — artists and their fans can check it

**10/10 spec:**
- All V1 features, plus:
- ABLE-specific health checks: Supabase realtime subscription test, Resend API call test, Netlify function response time
- 30-day uptime % per service
- Telegram alert: if any service goes red, send immediate Telegram message
- Incident history: last 90 days of incidents with start time, end time, affected service
- Subscribe to updates: fan/artist can enter email, Resend sends notification when incident starts/resolves

**Cross-links:**
- `docs/systems/ai-workflow/AI-WORKFLOW.md` — Telegram alerts
- `docs/systems/ai-workflow/TELEGRAM-SETUP.md`

---

## Tool 9: ABLE Lead Tracker
**Beats:** HubSpot CRM ($45/month)
**Market alternative cost:** $45/month (HubSpot Starter)
**Build time:** 1 hour (Supabase table + simple HTML view)
**Why ABLE's version wins:** HubSpot is a full sales CRM designed for B2B pipeline management with deal stages, contact enrichment, email sequences, and meeting scheduling. ABLE's sales motion is simple: someone hears about ABLE, DMs on Instagram, signs up or doesn't. The full lead lifecycle fits in 6 fields: name, source, status, last-contact-date, notes, artist-page-created. A single Supabase table and a 200-line HTML file covers 100% of ABLE's actual sales process.

**Tech stack:**
- Supabase table: `leads` — `{id, name, instagram_handle, source, status, last_contact_ts, notes, artist_created_at}`
- Status values: `cold / warm / hot / converted / churned`
- `ops.html` section: a simple table view of the leads table with inline edit on status and notes
- n8n: when a new Instagram DM arrives from an unknown handle, auto-create a `cold` lead row
- Password-protected (same token approach as Tool 2)

**MVP spec (V1):**
- Leads table: handle, source, status pill (colour-coded), last contact date, notes (inline editable)
- Add lead manually: form with handle, source, initial notes
- Status change: click to cycle through cold → warm → hot → converted
- Filter by status: show only hot leads, show all, show converted
- Count by status: "3 hot, 8 warm, 12 cold, 24 converted" — top-line summary

**10/10 spec:**
- All V1 features, plus:
- n8n integration: Instagram DM → auto-create lead with handle and message preview
- Auto-status: if a lead hasn't been contacted in 30 days, automatically move to `cold`
- Telegram nudge: "3 warm leads haven't been contacted in 14 days." (weekly, Monday)
- Conversion tracking: when a lead becomes an artist (Supabase `profiles` row created), link lead row to artist profile
- Source analytics: which channels (Instagram DM, referral, organic) convert at highest rate?

**Cross-links:**
- `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md`
- `docs/systems/ai-workflow/AI-WORKFLOW.md`

---

## Tool 10: ABLE A/B Test Engine
**Beats:** Optimizely ($40/month)
**Market alternative cost:** $40/month (Optimizely Web Experimentation)
**Build time:** 1.5 hours
**Why ABLE's version wins:** Optimizely has a visual editor, multi-variate testing, statistical significance calculator, audience targeting, and an enterprise dashboard. ABLE needs: if `?variant=b` is in the URL, show the B version of one element and log which variant was seen. That is the entire use case. 95% of Optimizely's infrastructure is for multi-team enterprise testing at scale. ABLE's entire test surface is: "Does 'Pre-save now' convert better than 'Save for later'?"

**Tech stack:**
- URL param: `?variant=b` (artists share the B-variant link)
- JS snippet in `able-v7.html`: reads `URLSearchParams.get('variant')`, adjusts one element (CTA text, hero image, page state)
- PostHog feature flag: `posthog.isFeatureEnabled('variant-b')` — PostHog controls 50/50 traffic split when using the flag version
- Event logging: `posthog.capture('variant_seen', { variant: 'b', element: 'hero-cta' })`
- Results: read directly from PostHog dashboard — no custom UI needed for V1

**MVP spec (V1):**
- `?variant=a` and `?variant=b` URL params supported on `able-v7.html`
- One configurable test element per experiment (hero CTA text is the primary use case)
- Variant logged to PostHog on page load
- Conversion logged to PostHog when fan signs up: `{ variant, converted: true }`
- Admin UI: show current test name, variant split, conversion rate per variant

**10/10 spec:**
- All V1 features, plus:
- PostHog feature flags: automatic 50/50 traffic split without URL param needed
- Multiple simultaneous tests: CTA text AND hero image, each tracked independently
- Statistical significance indicator: "Test B is 94% likely to be better — need 6 more conversions to confirm"
- One-click winner: "Set winner as default" button — updates `able_v3_profile.heroCTA` to the winning variant
- Test history: log of past tests, results, and what was changed as a result

**Cross-links:**
- `docs/systems/analytics/SPEC.md` — PostHog event schemas
- `docs/pages/profile/SPEC.md`

---

## Tool 11: ABLE Artist Onboarding Tracker
**Beats:** Intercom ($39/month) for onboarding
**Market alternative cost:** $39/month (Intercom Starter)
**Build time:** 2 hours
**Why ABLE's version wins:** Intercom is a customer support and messaging platform that includes onboarding flows as a secondary feature. ABLE's onboarding needs are specific: 5 steps, triggered by Supabase events, nudges sent by n8n via Resend. The Intercom overhead (live chat infrastructure, conversation inbox, contact management, the full support product) is irrelevant. ABLE's tracker is a Supabase view and a n8n workflow.

**Tech stack:**
- Supabase view: `onboarding_progress` — joins `profiles` table with a JSON column `{wizard_complete, first_fan, first_share, first_view_from_outside, first_email_sent}`
- n8n workflow: checks the view daily, finds artists with incomplete steps, triggers Resend email nudge
- `ops.html` section: table showing onboarding completion % per artist — useful for identifying where artists get stuck
- PostHog: `wizard_step_complete` events already specced in `analytics/SPEC.md`

**MVP spec (V1):**
- Supabase view: 5 boolean columns per artist (wizard / fan / share / outside-view / email)
- Onboarding completion % per artist
- n8n: if artist completed wizard but has no fans after 7 days → send "Share your link" nudge via Resend
- n8n: if artist has fans but hasn't sent an email after 14 days → send "Your fans are waiting" nudge
- Dashboard view in `ops.html`: table of artists, completion %, days since signup

**10/10 spec:**
- All V1 features, plus:
- Step-level funnel in PostHog: where exactly in the wizard do artists drop off?
- Personalised nudges: nudge copy references the artist's name and their specific incomplete step
- In-app nudges: ABLE admin surfaces the next step inline (not email — in the dashboard itself)
- Time-based escalation: artist stuck for 30 days → flag for personal outreach (not automated)
- Onboarding health score: % of artists who completed all 5 steps within 14 days (target: 80%)

**Cross-links:**
- `docs/pages/onboarding/DESIGN-SPEC.md`
- `docs/systems/email/SPEC.md`
- `docs/systems/analytics/SPEC.md`

---

## Tool 12: ABLE Error Monitor
**Beats:** Sentry (free tier capped at 5k errors/month, then $26+)
**Market alternative cost:** $26/month (Sentry Team) at scale
**Build time:** 2 hours
**Why ABLE's version wins:** Sentry is an excellent tool. But its free tier caps at 5,000 errors/month and strips features. More importantly: Sentry error reports contain no ABLE-specific context — they don't know which campaign state the page was in, which artist it was, or which localStorage data was present when the error occurred. ABLE's version captures exactly the context that matters for debugging music-platform errors. And it costs nothing.

**Tech stack:**
- `window.onerror` + `window.onunhandledrejection` handlers added to `able-v7.html`, `admin.html`, `start.html`, `landing.html`
- Each handler POSTs to a Netlify function: `/.netlify/functions/log-error`
- Netlify function writes to Supabase `errors` table
- Error row includes: `{ts, page, message, stack, artistSlug, campaignState, source, userAgent, appVersion}`
- `ops.html` section: error log table, sorted by recency, filterable by page

**MVP spec (V1):**
- `window.onerror` handler on all 4 active HTML files
- Netlify function: validates and writes to `errors` table
- ABLE-specific context captured: page name, campaign state from `able_v3_profile`, artist slug
- `ops.html` error log: message, page, artist, timestamp, stack trace (expandable)
- Telegram alert: if error count exceeds 10 in 1 hour → "Error spike on [page]: [count] errors in the last hour"

**10/10 spec:**
- All V1 features, plus:
- Error grouping: deduplicate repeated identical errors (same message + same line) into a single "issue" with occurrence count
- Error resolved: mark an issue as fixed — stops alerting until the error recurs
- Source maps: Netlify function maps minified stack traces to readable line numbers (requires source map upload on deploy)
- Release tracking: tag errors with the git commit SHA at deploy time — immediately know which deploy introduced an error
- PostHog integration: when an error fires, capture a PostHog event — cross-reference errors with user behaviour

**Cross-links:**
- `docs/systems/ai-workflow/TELEGRAM-SETUP.md`
- `docs/systems/data-architecture/SPEC.md`

---

## Tool 13: ABLE Press Kit Generator
**Beats:** presskit.io ($15/month)
**Market alternative cost:** $15/month
**Build time:** 1 hour
**Why ABLE's version wins:** presskit.io generates a hosted press kit page. ABLE can generate a downloadable PDF and a hosted page — pulling directly from the artist's existing profile data. The data is already correct because it is the same data that powers their live page. No separate input. No separate login. One click in `admin.html` → press kit ready to send.

**Tech stack:**
- Netlify function: `/.netlify/functions/press-kit?artist=slug`
- Reads from Supabase `profiles` table
- Generates an HTML page with: artist name, bio, genre, high-res artwork link, recent releases, stats (fans, page views), booking contact
- `window.print()` CSS: `@media print` styles the HTML as a clean one-page PDF
- Optionally: Puppeteer on the Netlify function generates the PDF server-side and returns it as a download
- Resend: artist can email the press kit URL directly from `admin.html` to a contact

**MVP spec (V1):**
- Netlify function: reads profile, renders HTML press kit page
- Artist stats: fans captured, page views (30d), top source channel
- Bio pulled from `able_v3_profile.bio` — no separate input
- Artwork at full resolution (Supabase Storage URL)
- "Copy press kit link" button in `admin.html`
- "Email press kit" button: opens the ABLE Email Composer (Tool 4) pre-filled with press kit URL

**10/10 spec:**
- All V1 features, plus:
- PDF download: server-side Puppeteer on Netlify function — returns actual PDF file
- Social proof section: "X fans across Instagram and ABLE, Y monthly Spotify listeners" (Spotify data from import)
- EPK format: includes rider info, technical requirements, promo photos (multiple)
- Password-protected option: artist can set a password for the press kit link
- View tracking: when a press kit link is opened, log it to Supabase and notify artist via Telegram

**Cross-links:**
- `docs/systems/spotify-import/SPEC.md`
- `docs/systems/email/SPEC.md`

---

## Tool 14: ABLE Competitor Tracker
**Beats:** Crayon ($1,500+/month enterprise)
**Market alternative cost:** Crayon starts at enterprise pricing; Klue $500+/month. Irrelevant at ABLE's scale, but the need is real.
**Build time:** 2 hours (n8n + Telegram)
**Why ABLE's version wins:** Enterprise competitive intelligence tools are built for large teams monitoring hundreds of competitors. ABLE has 5 direct competitors (Linktree, Beacons, Feature.fm, LayloFM, ToneDen) and needs to know one thing: did anything change on their homepage this week? A n8n workflow, a website change detector, and a Telegram message. That is the entire spec.

**Tech stack:**
- n8n: scheduled trigger every Sunday 09:00
- HTTP Request node: fetch homepage HTML for each competitor
- Hash the content: `SHA256(innerText)` — compare against last week's stored hash
- Supabase: `competitor_snapshots` table — stores `{competitor, hash, snapshot_date}`
- If hash changed: extract the diff (changed text sections), send Telegram message: "Beacons updated their homepage. Changed text: [...]"
- Optional: Claude API (Haiku, cheap) to summarise what changed in plain English

**MVP spec (V1):**
- 5 competitors monitored: Linktree, Beacons, Feature.fm, LayloFM, ToneDen
- Weekly check (Sunday 09:00 n8n trigger)
- Hash comparison: if homepage text changed, send Telegram
- Telegram message format: "Competitor change: [name] — homepage text changed. Review: [URL]"
- Supabase log: every weekly check logged with hash, whether change detected

**10/10 spec:**
- All V1 features, plus:
- Pricing page monitoring: separate check on `/pricing` page for each competitor
- Feature page monitoring: `/features` and `/for-artists` pages
- Claude Haiku summary: "Beacons added a new section about 'AI-generated bio' in their features list."
- Monthly digest: summary of all competitor changes in the past month, sent to Telegram Monday morning
- New competitor alerts: track any new "link in bio for musicians" tools appearing in Google results (Google Alerts API or Perplexity API)
- Manual snapshot: trigger an immediate check from `ops.html` without waiting for Sunday

**Cross-links:**
- `docs/systems/ai-workflow/AI-WORKFLOW.md`
- `docs/systems/ai-workflow/TELEGRAM-SETUP.md`

---

## Tool 15: ABLE Financial Dashboard
**Beats:** ProfitWell / Baremetrics ($50/month)
**Market alternative cost:** $50/month (Baremetrics) or ProfitWell (free but Paddle-only)
**Build time:** 2 hours
**Why ABLE's version wins:** Baremetrics pulls MRR data from Stripe and adds cohort analysis, LTV calculation, and churn modelling. ABLE at early stage needs: MRR today, new subs today, churn events this week, projected end-of-month MRR. That is 3 Stripe API calls and a chart. Baremetrics charges $50/month to make those 3 API calls and format them nicely. ABLE can format them more nicely, for zero recurring cost, in a file that matches its own design system.

**Tech stack:**
- Single `finances.html` file — password-protected with `?token=` env var check
- Stripe.js CDN: `https://js.stripe.com/v3/` — client-side Stripe API access
- Stripe Restricted API Key: read-only, scoped to `subscriptions:read` and `charges:read` — safe to use client-side
- Chart.js: MRR by month sparkline
- Netlify function: `/.netlify/functions/mrr-summary` — server-side Stripe queries (keeps the secret key server-side)

**MVP spec (V1):**
- MRR card: current MRR in GBP
- New subscriptions today: Artist + Artist Pro + Label — count and £ value
- Churn this week: cancelled subscriptions, MRR lost
- Active subscribers by tier: Free / Artist / Artist Pro / Label — bar chart
- Projected end-of-month MRR: current MRR × (days remaining in month ÷ 30) + actuals so far
- Auto-refreshes every 30 minutes

**10/10 spec:**
- All V1 features, plus:
- MRR growth rate: this month vs last month (% change)
- Churn rate: % of paying artists who cancelled this month
- LTV estimate: average subscription length × average tier price
- Failed payment monitor: Stripe charges that failed in the last 7 days — with retry status
- Telegram daily digest integration: MRR and new subs included in the 08:00 morning digest
- Annual recurring revenue (ARR): MRR × 12 — top-line number for planning

**Cross-links:**
- `docs/systems/ai-workflow/AI-WORKFLOW.md` — Telegram digest
- `docs/systems/tier-gates/SPEC.md` — tier definitions and pricing

---

*See also:*
- `docs/systems/build-your-own/ANALYSIS.md` — why build vs buy
- `docs/systems/build-your-own/PATH-TO-10.md` — build order
- `docs/systems/build-your-own/FINAL-REVIEW.md` — honest scoring
