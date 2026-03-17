# ABLE Build-Your-Own — Path to 10
**Created: 2026-03-16 | Authority: primary**

> Build order for all 15 tools. Organised by phase: P0 (before launch), P1 (before 10 paying artists), P2 (before 50 paying artists). Honest time estimates. No wishful thinking.

---

## The governing constraint

Before any of these tools get built, the product ships. The artist profile (`able-v7.html`), admin dashboard, onboarding wizard, and landing page are the P0 build. These 15 tools exist to support a working product — not to delay it.

The build sequence below assumes the core product is live. Start building tools when artists are using the product, not before.

---

## Phase 0 — Before launch (build these first, they cost almost nothing)

These tools take minimal time and unblock everything else. Build them in the final week before launch.

### P0.1 — Tool 12: ABLE Error Monitor
**Time:** 2 hours
**Why first:** Before anyone uses the product, put the error net in place. A `window.onerror` handler on all 4 active pages takes 30 minutes to write and catches everything from day one. The Supabase `errors` table and Netlify function take another 90 minutes. Done. If the launch has bugs, you'll know immediately.

**Exact build sequence:**
1. Write the `window.onerror` + `window.onunhandledrejection` handler as a shared snippet in `shared/able.js`
2. Create the Netlify function `/.netlify/functions/log-error` — validates input, inserts to Supabase
3. Create the `errors` table in Supabase: `id, ts, page, message, stack, artist_slug, campaign_state, user_agent`
4. Add Telegram alert to the Netlify function: if error fires, `curl` the Telegram bot
5. Add a simple error log view to `ops.html` (or a standalone `errors.html` — password-protected)

**Time breakdown:** 30min (JS handler) + 45min (Netlify function + Supabase table) + 30min (Telegram alert) + 15min (error log UI) = **2 hours**

---

### P0.2 — Tool 8: ABLE Uptime + Health Page
**Time:** 2 hours
**Why second:** Before launch, create the status page. If Supabase goes down on launch day, artists will ask "is ABLE broken or is it my setup?" The status page answers that question in 3 seconds. It also makes ABLE look like a serious product.

**Exact build sequence:**
1. Create `status.html` — a static page that loads `status.json` and renders it
2. Write the GitHub Action (`.github/workflows/status-check.yml`) — pings the 3 status APIs, writes `status.json`
3. Set the GitHub Action schedule: `cron: '*/5 * * * *'` (every 5 minutes)
4. Add `status.ablemusic.co` subdomain in Netlify pointing to the repo's `public/status.json` path
5. Add Telegram alert: if any status changes from `operational` → send message

**Time breakdown:** 45min (status.html UI) + 45min (GitHub Action) + 30min (domain setup + Telegram) = **2 hours**

---

### P0.3 — Tool 9: ABLE Lead Tracker
**Time:** 1 hour
**Why third:** When the first artists start signing up, track where they came from. This is a 1-hour build and the information it captures (source, status, notes) is irreplaceable if you don't capture it from day one.

**Exact build sequence:**
1. Create Supabase `leads` table: `id, name, instagram_handle, source, status, last_contact_ts, notes, artist_created_at`
2. Add a simple form + table to `ops.html` — add lead manually, update status by clicking a pill
3. No n8n integration yet (P1) — manual entry only at this stage

**Time breakdown:** 20min (Supabase table) + 40min (HTML form + table in ops.html) = **1 hour**

**Total P0 time: 5 hours.** These are the safety net and instrumentation before launch. Non-negotiable.

---

## Phase 1 — Before 10 paying artists

Once the product is live and the first artists are on it, these tools become immediately valuable. Build them in order.

### P1.1 — Tool 3: ABLE Fan CRM (complete it)
**Time:** 3 hours
**Why first in P1:** The fan CRM is partially built in `admin.html`. Complete it now — because the first 10 artists will all ask "how do I see my fans?" and the answer needs to be excellent. Add `campaignState` to fan records, add filter pills, add CSV export, add the GDPR delete button. This is finishing existing work, not starting new work.

**Prerequisite:** The fan list in `admin.html` must be live first.

**Build sequence:**
1. Add `campaignState` field to fan records written in `able-v7.html` — read `able_v3_profile.stateOverride` at sign-up time, store it
2. Add filter pills to the fan list section: All / Starred / From Instagram / From TikTok / From a show
3. Add per-fan delete button (with confirmation modal)
4. Add CSV export function — `exportFansCSV()` is already specced in `docs/systems/analytics/SPEC.md §2.7`
5. Add fan count by source summary line above the list

**Time breakdown:** 45min (campaignState capture) + 60min (filter pills) + 30min (delete + CSV export) + 45min (polish + test) = **3 hours**

---

### P1.2 — Tool 1: ABLE Analytics Dashboard
**Time:** 3 hours
**Why second:** The first 10 artists will all ask "is my page working?" The analytics dashboard answers that. The event schemas are already specced. This is a display layer over data that already exists.

**Build sequence:**
1. Implement `getStats(days)` from `docs/systems/analytics/SPEC.md §2.4` — copy the function directly into `shared/able.js`
2. Implement `rotateEvents()` retention function — also in `shared/able.js`
3. Build the stats section in `admin.html`: 4 stat cards (Views 7d, Fans 7d, Click rate, Top source)
4. Add time window toggle: 7d / 30d / All time — stores preference in localStorage
5. Add source breakdown bars (already in admin DESIGN-SPEC)
6. Add conversion rate as a stat card: `fans / views * 100`

**Time breakdown:** 45min (getStats + rotateEvents in shared/able.js) + 90min (admin UI — stat cards, toggle, bars) + 45min (test with real data) = **3 hours**

---

### P1.3 — Tool 4: ABLE Email Composer
**Time:** 2 hours
**Why third:** The first artists to capture fans will immediately want to email them. Resend is already in the tech stack plan. This is a form + an API call. The ABLE voice means plain text beats Mailchimp templates every time — so the simplicity is a feature.

**Build sequence:**
1. Add Resend API key to Netlify environment variables
2. Create Netlify function `/.netlify/functions/send-email` — accepts `{subject, body, to: [emails]}`, calls Resend batch send API
3. Add "Write to your fans" section in `admin.html` — subject field, body textarea, character counter, recipient count, preview panel
4. Wire the Send button to the Netlify function
5. Add sent log to localStorage: `{ts, subject, recipientCount}`

**Time breakdown:** 20min (Netlify function) + 90min (admin UI section) + 10min (sent log) = **2 hours**

---

### P1.4 — Tool 6: ABLE Social Media Preview Generator
**Time:** 45 minutes
**Why fourth:** Easy win. 45 minutes. Artists who post about their ABLE page will use this. A character counter and genre-relevant hashtags is a tiny time investment with immediate daily utility.

**Build sequence:**
1. Add a `social-preview.html` file (linked from `admin.html` as "Write a post")
2. Platform selector, character counter per platform, hashtag bank object (keyed by genre)
3. Copy-to-clipboard button
4. Optionally: add it as a section within admin.html instead of a separate file

**Time breakdown:** 45 minutes total.

---

### P1.5 — Tool 11: ABLE Artist Onboarding Tracker
**Time:** 2 hours
**Why fifth:** With 10 artists onboarding, you'll start to see where they get stuck. The PostHog events are already being captured. The Supabase view is a simple SQL query. The n8n nudges prevent silent churn before it happens.

**Build sequence:**
1. Create Supabase view `onboarding_progress` — joins `profiles` with PostHog event counts (or a `onboarding_steps` column in `profiles` JSON)
2. Create n8n workflow: daily check → find incomplete artists → trigger Resend nudge
3. Add onboarding completion table to `ops.html`

**Time breakdown:** 45min (Supabase view) + 60min (n8n workflow) + 15min (ops.html table) = **2 hours**

**Total P1 time: approximately 11 hours.** Spread over a week at launch pace, this is achievable.

---

## Phase 2 — Before 50 paying artists

These tools become valuable at scale. They are not urgent before you have 10 paying artists.

### P2.1 — Tool 7: ABLE OG Image Generator
**Time:** 3 hours
**Why P2:** OG images matter for social sharing — which matters more when more artists are actively sharing their pages. At 5 artists, you can use a static placeholder. At 50, each artist's page should look correct when shared on Twitter or iMessage.

**Prerequisite:** Supabase backend must be live (function needs to query profiles by slug).

---

### P2.2 — Tool 2: ABLE Artist Health Monitor
**Time:** 4 hours
**Why P2:** At 10 artists, you know who is active by watching the numbers manually. At 50, you cannot. The health monitor flags at-risk artists automatically — the investment becomes worth it when manual monitoring is no longer viable.

**Prerequisite:** Supabase backend live; Stripe integration live (for tier data).

---

### P2.3 — Tool 15: ABLE Financial Dashboard
**Time:** 2 hours
**Why P2:** You need MRR data when you have meaningful MRR. Before 10 paying artists, the numbers are small enough to track manually. At 50 paying artists, a dashboard saves time daily.

**Prerequisite:** Stripe integration live.

---

### P2.4 — Tool 13: ABLE Press Kit Generator
**Time:** 1 hour
**Why P2:** Artists who are actively gigging and pitching press need this. Before 50 artists, the demand is there but limited. At scale, one-click press kit generation becomes a genuine differentiator vs Linktree.

**Prerequisite:** Supabase backend live.

---

### P2.5 — Tool 14: ABLE Competitor Tracker
**Time:** 2 hours
**Why P2:** Competitive monitoring is worthwhile once ABLE has enough paying artists that competitor moves matter. Before launch, you know the competitors well. At scale, you need automated alerts.

**Prerequisite:** n8n live; Telegram bot configured.

---

### P2.6 — Tool 10: ABLE A/B Test Engine
**Time:** 1.5 hours
**Why P2:** A/B testing is only meaningful when you have enough traffic to reach statistical significance quickly. At 50 artists with combined daily traffic, you can run a test and get a clear signal within a week. Before that, the sample sizes are too small to trust.

**Prerequisite:** PostHog live with real traffic data.

---

### P2.7 — Tool 5 (completed): Link Rotator
**This is the product.** It is never "done". The P2 goal is `able-v7.html` scoring 10/10 on the 20-angle review in `docs/pages/profile/SPEC.md`.

---

## Summary: full build timeline

| Phase | Tools | Time | Trigger |
|---|---|---|---|
| P0 (pre-launch) | Error Monitor, Uptime Page, Lead Tracker | 5 hours | Final week before launch |
| P1 (before 10 artists) | Fan CRM (complete), Analytics Dashboard, Email Composer, Social Preview, Onboarding Tracker | 11 hours | Week 1–2 post-launch |
| P2 (before 50 artists) | OG Images, Health Monitor, Financial Dashboard, Press Kit, Competitor Tracker, A/B Engine | 13.5 hours | Month 2–3 |

**Total across all 15 tools:** approximately 30 hours of build time to replace ~£450/month of SaaS spend.

At Claude Code velocity, 30 hours of AI-assisted build time is realistic in 2–3 weeks of part-time sessions. The payback on that investment is 30 days, after which every month the stack runs costs £0 in tool fees.

---

## What not to build (ever)

Three tools explicitly excluded:

**A custom email delivery system.** Resend handles SPF/DKIM/DMARC, IP reputation, and bounce handling. This is not something to rebuild. Pay Resend.

**A custom authentication system.** Supabase Auth handles magic links, session management, and security best practices. This is not something to rebuild. Pay Supabase.

**A custom payment processor.** Stripe handles PCI DSS, fraud, SCA, and cross-border tax. This is not something to rebuild. Pay Stripe.

The rule: when the failure mode is catastrophic (artists lose revenue, fans lose access, data is compromised), buy the certified solution. The 15 tools above are all low-blast-radius. None of them handle money, authentication, or email delivery directly.

---

*See also:*
- `docs/systems/build-your-own/SPEC.md` — full tool specs
- `docs/systems/build-your-own/FINAL-REVIEW.md` — honest scoring of the strategy
- `docs/STATUS.md` — current build state
