# ABLE Free Stack — Path to 10
**System:** Free stack implementation priority
**Last updated:** 2026-03-16
**Status:** Definitive

---

## Framing

Three phases, each with a clear milestone:

- **P0 — Before first artist:** Must be running before any artist touches ABLE. These are the foundation tools — without them, things break silently or James loses important data.
- **P1 — Before 10 artists:** Important but not launch-blocking. First 10 artists will stress-test the product and surface issues — these tools help James respond faster.
- **P2 — Before 50 artists:** Scale and efficiency tools. Nice to have at 10 artists, necessary at 50.

Total time to implement P0 tools: approximately 8–10 hours.
Total time to implement all 25 tools: approximately 25–30 hours.

---

## P0 — Before first artist

These 7 tools must be running before ABLE is shared with anyone.

---

### P0.1 — Supabase free tier (Tool 3)
**Why P0:** Without a database, every artist's data is only in their browser localStorage. One browser clear = everything gone. Supabase is the foundation.
**Time:** 2–3 hours
**Blockers:** None. Project already created.
**Steps:**
1. Create schema: `profiles`, `fans`, `clicks`, `views`, `events`, `releases`
2. Enable magic link auth
3. Add Row Level Security policies
4. Add CDN script to able-v7.html, admin.html, start.html
5. Migrate localStorage data to Supabase on login
**Done when:** An artist can sign up, set up their profile, and log back in on a different browser.

---

### P0.2 — UptimeRobot free tier (Tool 7)
**Why P0:** The Supabase free tier pauses after 1 week of inactivity. UptimeRobot prevents this automatically. Also tells James if the site goes down before artists report it.
**Time:** 20 minutes
**Blockers:** None.
**Steps:**
1. Sign up at uptimerobot.com
2. Add monitors: able.fm, able.fm/admin.html, Supabase project URL
3. Set 5-minute check interval
4. Configure email alerts to james@able.fm
**Done when:** Three green monitors visible in UptimeRobot dashboard.

---

### P0.3 — Sentry free tier (Tool 6)
**Why P0:** JavaScript errors on able-v7.html and admin.html will be invisible without monitoring. An artist could have a broken sign-up flow and James won't know until they email.
**Time:** 30 minutes
**Blockers:** None.
**Steps:**
1. Sign up at sentry.io
2. Create 3 projects: ABLE Profile, ABLE Admin, ABLE Start
3. Add Sentry CDN + init script to each file
4. Configure alert: email on new error type (not every occurrence)
**Done when:** Sentry dashboard shows active monitoring for all 3 files with no unresolved errors.

---

### P0.4 — PostHog free tier (Tool 4)
**Why P0:** Without analytics, there is no signal on what's working. Which CTAs do fans tap? Where do artists drop off in onboarding? This data drives all future product decisions.
**Time:** 1 hour
**Blockers:** None.
**Steps:**
1. Sign up at eu.posthog.com (EU Cloud — GDPR compliant)
2. Add PostHog snippet to able-v7.html, admin.html, start.html, landing.html
3. Define 8 core events:
   - `fan_signup` — fan email captured on able-v7.html
   - `cta_click` — any CTA tapped, with label and type properties
   - `page_view` — with `source` UTM parameter
   - `onboarding_complete` — artist finishes start.html wizard
   - `admin_open` — artist opens admin.html
   - `campaign_state_change` — artist changes profile state in Campaign HQ
   - `artist_signup` — artist completes initial sign-up
   - `share_profile` — artist taps share on their profile URL
4. Create funnel: Landing → Profile → Fan sign-up
**Done when:** PostHog dashboard shows live event stream when James navigates the site.

---

### P0.5 — Resend free tier (Tool 5)
**Why P0:** Fan sign-up confirmation emails must send immediately. If a fan signs up and gets no confirmation, trust is lost. Magic link auth also depends on Resend.
**Time:** 1 hour
**Blockers:** DNS access to able.fm domain.
**Steps:**
1. Sign up at resend.com
2. Add SPF, DKIM DNS records for able.fm
3. Create Netlify Function `send-email.js`
4. Wire to Supabase auth (magic link) and fan sign-up events
5. Send first test email to james@able.fm
**Done when:** Fan sign-up triggers confirmation email within 30 seconds. Magic link auth works.

---

### P0.6 — OG image generation (Tool 11)
**Why P0:** Every artist will share their profile link on Instagram and TikTok within hours of signing up. If the OG image is blank or shows a generic placeholder, it looks unfinished. First impressions are on the line.
**Time:** 3 hours
**Blockers:** Netlify deployment working. Barlow Condensed font file available for Satori.
**Steps:**
1. Create `netlify/functions/og-image.js` with Satori
2. Bundle Barlow Condensed font as base64 in the function
3. Accept `?artist=`, `?accent=`, `?artwork=` query params
4. Set able-v7.html meta og:image to `/.netlify/functions/og-image?...` with artist data
5. Test with opengraph.xyz and Twitter Card Validator
**Done when:** Pasting an artist profile URL into Twitter's card validator shows correct artist name, artwork, and ABLE branding.

---

### P0.7 — Netlify `_redirects` (Tool 12)
**Why P0:** Artist vanity links (`able.fm/mira`) must work before artists share them. This is a 10-minute task but must be done before any artist gets their link.
**Time:** 10 minutes
**Blockers:** None.
**Steps:**
1. Verify `_redirects` file exists at repo root
2. Add placeholder for first 5 beta artists
3. Document the naming convention: `/[first-name]` for personal brands, `/[artist-name]` for act names
4. Confirm Netlify deploys the redirect immediately (< 60 seconds)
**Done when:** `able.fm/mira` redirects to the correct artist profile.

---

## P1 — Before 10 artists

These tools become important once multiple artists are using ABLE. The product is proven enough to need better operational support.

---

### P1.1 — Tally.so forms (Tool 13)
**Why P1:** At 10 artists, James needs a structured way to collect feedback — not ad hoc DMs. Tally forms embedded on admin.html and a standalone feedback link.
**Time:** 45 minutes
**Priority note:** Also useful as a pre-launch waitlist (Tool 24) — can implement both at once.

---

### P1.2 — Linear (Tool 14)
**Why P1:** At 10 artists, bug reports and feature requests start stacking up. A proper issue tracker prevents things falling through the cracks. Not needed for 1–3 artists.
**Time:** 1 hour
**Priority note:** Import open `docs/STATUS.md` items as Linear issues.

---

### P1.3 — A/B testing via PostHog flags (Tool 21)
**Why P1:** With 10 artists and their fans using the platform, there's enough traffic to test hypotheses. Landing page copy, fan sign-up CTA wording, profile layout variants.
**Time:** 1 hour (extends P0.4 PostHog setup)

---

### P1.4 — FAQ / help page (Tool 23)
**Why P1:** At 10 artists, the same questions will repeat. A JSON-driven FAQ on able.fm/help reduces email volume significantly.
**Time:** 2 hours

---

### P1.5 — Social media graphics templates (Tool 18)
**Why P1:** At 10 artists, ABLE needs consistent social presence to attract artists 11–50. The HTML/CSS template system makes this scalable.
**Time:** 4 hours (build all 5 templates)

---

### P1.6 — Buffer free tier (Tool 8)
**Why P1:** Manual social posting is fine for the first week. By artist 10, having a content queue saves 30–45 minutes per week.
**Time:** 30 minutes

---

### P1.7 — Social proof widget (Tool 25)
**Why P1:** At 10 artists, there are real testimonials to collect and display. The Supabase-powered widget on landing.html converts new artist sign-ups.
**Time:** 2 hours

---

## P2 — Before 50 artists

These tools are about operational efficiency at scale. The product works without them; they make the work less manual.

---

### P2.1 — Wave Accounting (Tool 19)
**Why P2:** Before any artist pays for a subscription, there's nothing to invoice. Set up Wave when the first paid subscription is confirmed.
**Time:** 45 minutes

---

### P2.2 — Contract management (Tool 20)
**Why P2:** First advisor agreements and any beta artist early-access agreements. Before 50 artists, 3 DocuSign requests/month is adequate.
**Time:** 2 hours (template writing + setup)

---

### P2.3 — Own status page (Tool 22)
**Why P2:** At 50 artists, platform downtime affects real people's links. A status page gives artists a place to check rather than emailing James.
**Time:** 1 hour

---

### P2.4 — Loom + YouTube explainers (Tool 17)
**Why P2:** Product walkthroughs help artists self-serve onboarding. Not needed for the first 10 artists James can personally onboard. Critical at 50.
**Time:** 2 hours (record + embed)

---

### P2.5 — Canva free tier (Tool 9)
**Why P2:** For launch announcement graphics and artist spotlight posts that fall outside the HTML/CSS template scope. Low priority — the HTML/CSS templates (Tool 18, P1.5) cover most needs.
**Time:** 1 hour

---

### P2.6 — Loom screen recording (Tool 10)
**Why P2:** Demo videos for investors and advisors become useful at the stage where fundraising conversations begin. Not needed pre-traction.
**Time:** 15 minutes (install) + ongoing recording time

---

### P2.7 — Documentation maintenance (Tool 15)
**Why P2:** Already in use. The P2 action is to audit the docs/ structure at the 50-artist milestone — prune outdated specs, update STATUS.md, add new system docs.
**Time:** 2 hours (quarterly docs audit)

---

### P2.8 — Tally.so waitlist form (Tool 24)
**Why P2:** If ABLE is adding a waiting list (rather than open sign-up), this goes live at the 50-artist milestone to manage growth. Could also be P0 if launching with a waitlist.
**Time:** 1 hour

---

## Figma (Tool 1) — ongoing

Figma is ongoing from day one. No specific milestone — use it whenever building mockups or design explorations. The free tier is a permanent tool, not a transition.

---

## Implementation schedule

| Phase | Tools | Total time | Target date |
|---|---|---|---|
| P0 — before first artist | Tools 3, 4, 5, 6, 7, 11, 12 | 8–10 hours | This week |
| P1 — before 10 artists | Tools 8, 13, 14, 18, 21, 23, 25 | 11–13 hours | Within 2 weeks of first artist |
| P2 — before 50 artists | Tools 9, 10, 15, 17, 19, 20, 22, 24 | 10–12 hours | Within 6 weeks of first artist |
| Ongoing | Tool 1 (Figma) | N/A | Always active |

**Total implementation time:** 29–35 hours across 6–8 weeks.

---

## What "done" looks like

At P0 complete:
- Artists can sign up and their data persists in Supabase
- JavaScript errors surface in Sentry before artists report them
- Fan sign-up confirmation emails send within 30 seconds
- PostHog is tracking funnels
- Shared profile links show correct OG images on social
- UptimeRobot prevents Supabase pausing and alerts on downtime

At P1 complete:
- 10 artists have consistent, on-brand social assets to promote their pages
- A structured feedback loop is running (Tally forms)
- Content is scheduled a week ahead in Buffer
- First A/B test is running on landing.html copy
- Early testimonials are live on landing.html

At P2 complete:
- ABLE has a public status page
- Contracts and invoicing are handled without paying for software
- Product walkthroughs help artists self-serve
- Operations run smoothly at 50 artists with <5 hours/week of James's time on admin
