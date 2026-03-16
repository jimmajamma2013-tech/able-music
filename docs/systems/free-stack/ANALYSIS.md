# ABLE Free Stack — Analysis
**System:** Free stack audit
**Last updated:** 2026-03-16
**Status:** Complete

---

## What this document is

An honest audit of every software category ABLE needs at the pre-revenue stage. For each category: what the paid option costs, what the free equivalent is, and an honest verdict on whether it holds up.

The frame: James is a solo founder with £0 MRR. Every pound spent is a pound that doesn't extend the runway. The goal is to defer all software spend until paying customers justify it — not to use free tools forever, but to not spend money before the business makes money.

---

## Audit methodology

Each tool is scored on three axes:
- **Capability match** — does the free tier do what ABLE actually needs right now?
- **Upgrade pressure** — how soon does the free tier become a constraint?
- **Switching cost** — if the free tool hits its limit, how painful is the migration?

Score: 1–5 per axis. 13+ = use free tier confidently. 10–12 = use but plan upgrade. <10 = pay now or find a better free option.

---

## Category audits

### 1. Design — Figma

**Current situation:** Figma free tier (3 projects, unlimited viewers).
**Paid alternative:** Figma Professional (£11/seat/month), Sketch (£79/year), Adobe XD (£22/month in Creative Cloud).
**What ABLE actually needs:** Mockups, component exploration, sharing with advisors or future hires for review. Not production code — ABLE is a single-file HTML project.
**Verdict:** Free tier is completely sufficient. 3 projects covers: (1) marketing/brand, (2) product screens, (3) scratchpad. No reason to pay until hiring a second designer.
**Scores:** Capability 5 / Upgrade pressure 4 / Switching cost 4 = **13/15 — use free tier**

---

### 2. Hosting — Netlify

**Current situation:** Netlify free tier (100GB bandwidth/month, 300 build minutes/month).
**Paid alternative:** Netlify Pro (£15/month), Vercel Pro (£16/month).
**What ABLE needs:** Static HTML hosting, custom domain, HTTPS, Netlify Functions for serverless ops. No build pipeline needed (no bundler).
**Verdict:** Free tier will cover ABLE until thousands of daily active users. 100GB/month is roughly 50,000 visits at 2MB per page. Netlify Functions free tier (125k invocations/month) covers all lightweight API calls at launch.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 3 = **13/15 — use free tier**

---

### 3. Database + Auth — Supabase

**Current situation:** Planned. Supabase free tier (500MB database, 2GB storage, 50MB file uploads, 50,000 monthly active users).
**Paid alternative:** Supabase Pro (£22/month), Firebase Blaze (pay-as-you-go, typically £30–80/month at small scale), PlanetScale (£26/month).
**What ABLE needs:** Auth (magic link), artists table, fans table, events, clicks, releases. Supabase free tier limits are generous.
**Critical caveat:** Free tier projects pause after 1 week of inactivity. This is a real risk during early development. Mitigate by keeping a cron job pinging the database (easily done with UptimeRobot).
**Verdict:** Use free tier. The pause-on-inactivity issue is the only serious concern and it's solvable for free.
**Scores:** Capability 5 / Upgrade pressure 4 / Switching cost 2 = **11/15 — use but plan upgrade at ~1,000 MAU**

---

### 4. Analytics — PostHog

**Current situation:** Not yet implemented.
**Paid alternative:** Mixpanel Growth (£17/month), Amplitude Growth (£40/month), Heap (£hundreds/month).
**What ABLE needs:** Page views, CTA click events, funnel tracking (fan sign-up rate), feature flag support for A/B testing.
**PostHog free tier:** 1 million events/month, feature flags, session replay (up to 5,000 recordings/month), EU cloud available (important for UK GDPR compliance).
**Verdict:** PostHog is arguably better than Mixpanel for a solo technical founder — it's open-source, self-hostable, and the EU cloud avoids US data transfer issues. The free tier is extremely generous. Use this and don't look back until 1M events/month.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 3 = **13/15 — use free tier**

---

### 5. Email — Resend

**Current situation:** Not yet implemented. Planned for fan capture confirmations + artist onboarding.
**Paid alternative:** Mailchimp Essentials (£9/month), Klaviyo (£20+/month), SendGrid Essentials (£14/month).
**What ABLE needs at launch:** Transactional emails (fan sign-up confirmation, artist welcome, magic link auth). 100 emails/day is ~3,000/month — enough for first 1,000 fans.
**Resend free tier:** 100 emails/day, 3,000/month. Custom domain sending (important for deliverability).
**Critical note:** Resend is developer-focused — it's a REST API, not a marketing platform. For broadcast emails (newsletters, new drop alerts), a separate marketing tool is needed later. For now, Resend handles all transactional needs.
**Verdict:** Use for launch. The 100/day cap is fine until ABLE has real traction.
**Scores:** Capability 4 / Upgrade pressure 3 / Switching cost 3 = **10/15 — use, plan Resend Pro at 100+ artists**

---

### 6. Error monitoring — Sentry

**Current situation:** No error monitoring.
**Paid alternative:** Sentry Team (£20/month), Bugsnag (£36/month), Rollbar (£19/month).
**What ABLE needs:** JS error tracking on able-v7.html, admin.html, start.html. Alert on new errors. Source map support (less critical without a build pipeline).
**Sentry free tier:** 5,000 errors/month, 10,000 performance transactions/month, 1 user.
**Verdict:** 5,000 errors/month is orders of magnitude more than a pre-revenue product will generate. The 1-user limit is fine for a solo founder. Use Sentry free tier until revenue justifies Team plan.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 3 = **13/15 — use free tier**

---

### 7. Uptime monitoring — UptimeRobot

**Current situation:** No uptime monitoring.
**Paid alternative:** StatusCake Business (£16/month), Pingdom (£10/month), Better Uptime (£20/month).
**What ABLE needs:** Know when able.fm goes down. Alert via email. Secondary benefit: ping Supabase to prevent free-tier pausing.
**UptimeRobot free tier:** 50 monitors, 5-minute check intervals, email + Slack alerts.
**Verdict:** 5-minute intervals are fine for a solo product where the only person receiving alerts is James. The Supabase anti-pause ping is a bonus use. Completely adequate pre-revenue.
**Scores:** Capability 4 / Upgrade pressure 5 / Switching cost 5 = **14/15 — use free tier**

---

### 8. Social scheduling — Buffer

**Current situation:** Posting manually.
**Paid alternative:** Hootsuite Professional (£49/month), Later (£16/month), Sprout Social (£169/month — absurd).
**What ABLE needs:** Queue posts across Instagram + TikTok + LinkedIn. Write a week of content in one session, schedule it out.
**Buffer free tier:** 3 channels, 10 queued posts per channel, basic analytics.
**Verdict:** 3 channels and 10 posts covers the launch phase. The constraint is the queue limit (10 posts) — fine if James batches content once a week. No analytics depth but PostHog covers the actual conversion tracking.
**Scores:** Capability 3 / Upgrade pressure 3 / Switching cost 4 = **10/15 — use, upgrade to Buffer Essentials (£5/month) at consistent posting volume**

---

### 9. Image creation — Canva

**Current situation:** Ad hoc design work, no consistent tool.
**Paid alternative:** Canva Pro (£10.99/month), Adobe Express Premium (£9.99/month), Adobe Illustrator (£22/month).
**What ABLE needs:** Social graphics, cover art mockups for artists, launch announcement assets. Not product UI (that's Figma).
**Canva free tier:** Unlimited designs, limited templates (many are Pro-gated), no background remover, limited font choices.
**Verdict:** Free tier is workable for scrappy launch assets. The better long-term approach is the HTML/CSS social graphics template (Tool 18 in SPEC.md) — build once, generate infinitely for free. Canva free is a bridge.
**Scores:** Capability 3 / Upgrade pressure 3 / Switching cost 5 = **11/15 — use, plan to replace with own templates**

---

### 10. Screen recording — Loom

**Current situation:** No screen recording tool.
**Paid alternative:** Loom Business (£8/month), Camtasia (£199/year), ScreenFlow (£99 one-off).
**What ABLE needs:** Short explainer videos for landing page, product walkthroughs for artist onboarding, async demos for potential investors or advisors.
**Loom free tier:** 25 videos, 5-minute limit per video, basic controls.
**Verdict:** 25 videos and 5-minute clips cover launch. The real constraint is 5 minutes — product demos need to be tight anyway. If more is needed, archive old videos. Free tier is adequate for months.
**Scores:** Capability 4 / Upgrade pressure 3 / Switching cost 4 = **11/15 — use free tier, upgrade when more than 25 active videos needed**

---

### 11. OG image generation

**Current situation:** No dynamic OG images — all pages share one static og.png.
**Paid alternative:** Cloudinary (£80/month for transformations at scale), Imgix (£10/month), Bannerbear (£29/month).
**What ABLE needs:** Per-artist OG images (artist name, artwork, platform branding) generated at share time. Critical for social sharing of artist profile links.
**Free approach:** Netlify Function using Satori (Vercel's OG image library, runs in Node) — generates SVG → PNG at request time. Zero ongoing cost, fully customisable.
**Verdict:** Build it once. £0 forever (within Netlify Function invocation limits). Better than any paid tool because it reads from ABLE's own data.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 1 = **11/15 — build it**

---

### 12. Link shortening

**Current situation:** Full URLs used everywhere.
**Paid alternative:** Bitly Starter (£8/month), Rebrandly (£9/month), Short.io (£15/month).
**What ABLE needs:** Clean short links for artist profiles, UTM tracking for social posts.
**Free approach:** Netlify `_redirects` file — add a line like `/j/mira → https://able.fm/mira 301`. Free, instant, custom domain, no dashboard needed.
**Verdict:** The `_redirects` approach is simpler than any third-party tool. The only loss is click analytics per short link — PostHog UTM tracking covers this adequately.
**Scores:** Capability 4 / Upgrade pressure 5 / Switching cost 1 = **10/15 — build it (it's 2 lines in a file)**

---

### 13. Forms + surveys — Tally.so

**Current situation:** No form tool.
**Paid alternative:** Typeform Business (£42/month), JotForm (£24/month), SurveyMonkey (£36/month).
**What ABLE needs:** Artist waitlist sign-up, fan feedback surveys, NPS collection.
**Tally free tier:** Unlimited forms, unlimited responses, custom domain embed, logic branching, file uploads, payment collection (via Stripe). Genuinely better than Typeform's free tier.
**Verdict:** Tally is the best-value free form tool available. The free tier has no meaningful limits for ABLE's scale. Use it immediately.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 4 = **14/15 — use free tier**

---

### 14. Project management — Linear

**Current situation:** Ad hoc task tracking.
**Paid alternative:** Linear Standard (£7/month), Jira (£7/month per user), Notion (£7/month per user).
**What ABLE needs:** Issue tracking, sprint planning, roadmap visibility. Solo use for now, but will need to share with contractors/advisors.
**Linear free tier:** Unlimited issues, cycles, projects. Guest access. Free until team exceeds 250 members (irrelevant for James).
**Verdict:** Linear is genuinely free for solo founders and small teams. Better UX than Jira, better for engineering tasks than Notion. Use it.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 3 = **13/15 — use free tier**

---

### 15. Documentation — this repo's docs/ folder

**Current situation:** Already using `docs/` in the repo. Working well.
**Paid alternative:** Notion (£7/month per user), Confluence (£5/month), GitBook (£6/month).
**What ABLE needs:** Product specs, decision logs, build context, system docs.
**Free approach:** Markdown in `docs/` — already the approach, already working. Free forever.
**Verdict:** The existing docs/ structure is better than Notion for a solo technical founder — it's version-controlled, always in sync with the code, and searchable via grep/ripgrep. No reason to introduce a separate tool.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 1 = **11/15 — already doing this right**

---

### 16. Customer support

**Current situation:** Not yet needed. No artists on platform.
**Paid alternative:** Intercom (£74/month), Zendesk Suite (£49/month), Freshdesk Growth (£12/month).
**What ABLE needs at launch:** Answer artist questions, triage problems, track recurring issues.
**Free approach:** hello@able.fm → Notion template for tracking open issues + resolution notes. Under 50 artists, email handles everything. A JSON-driven FAQ page on the site reduces email volume.
**Verdict:** No support tool needed until 50+ artists. Email + a good FAQ is better than a half-configured Intercom instance for a pre-traction product.
**Scores:** Capability 4 / Upgrade pressure 3 / Switching cost 5 = **12/15 — email is right for now**

---

### 17. Video explainers

**Current situation:** No hosted video on landing page.
**Paid alternative:** Wistia (£68/month for 10 videos), Vimeo Pro (£15/month), YouTube (free but branded with competitor suggestions).
**What ABLE needs:** Clean embedded explainer video on landing.html. No competitor suggestions, no Wistia branding on free tier.
**Free approach:** Loom free tier (5-minute cap works for landing page video) embedded on own page. For longer content: unlisted YouTube with nocookie embed.
**Verdict:** Loom for short product demos. Unlisted YouTube for longer content. Neither costs anything. Wistia is genuinely better for brand presentation but the £68/month cost is unjustifiable at £0 MRR.
**Scores:** Capability 3 / Upgrade pressure 3 / Switching cost 4 = **10/15 — use Loom + YouTube until £1k MRR**

---

### 18. Social media graphics — own HTML/CSS templates

**Current situation:** No system for consistent social assets.
**Paid alternative:** Canva Pro (£10.99/month), Adobe Express Premium (£9.99/month).
**What ABLE needs:** Weekly Instagram posts, story templates, artist spotlight graphics. Consistent look.
**Free approach:** Build 3–5 HTML/CSS template files. Screenshot with Playwright or browser dev tools. £0, infinite uses, full brand control.
**Verdict:** This is the highest-leverage DIY in the list. One afternoon of work creates an infinite supply of on-brand assets. Canva templates will never match the precision of custom HTML/CSS.
**Scores:** Capability 5 / Upgrade pressure 5 / Switching cost 1 = **11/15 — build it once, use forever**

---

### 19. Invoicing — Wave Accounting

**Current situation:** No invoicing tool.
**Paid alternative:** FreshBooks Lite (£13/month), QuickBooks Simple Start (£12/month), Xero Starter (£15/month).
**What ABLE needs:** Send invoices for ABLE subscriptions (until Stripe billing is automated), track basic income/expenses for UK sole trader / Ltd.
**Wave free tier:** Truly free — unlimited invoices, unlimited clients, basic bookkeeping, receipt scanning. They make money on payment processing fees (optional). UK compliant.
**Verdict:** Wave is genuinely the best free invoicing tool for UK sole traders. The only catch is that UK bank reconciliation is less polished than Xero, but for the scale of a pre-revenue founder it's irrelevant.
**Scores:** Capability 5 / Upgrade pressure 4 / Switching cost 3 = **12/15 — use free tier until accountant recommends otherwise**

---

### 20. Contract management — Plain text + DocuSign free tier

**Current situation:** No contract system.
**Paid alternative:** HelloSign (£13/month), PandaDoc (£19/month), DocuSign Standard (£12/month).
**What ABLE needs:** Artist terms of service acceptance, freelancer NDAs, advisor agreements.
**Free approach:** Plain text agreements in docs/legal/ (version-controlled). DocuSign free tier: 3 signature requests per month. For ToS: checkbox acceptance logged in Supabase (legally valid with IP + timestamp).
**Verdict:** 3 DocuSign requests per month covers advisor agreements and one-off contracts. ToS acceptance at sign-up is the right legal approach anyway — not DocuSign. The plain text + Supabase checkbox approach is sound for a pre-revenue UK product.
**Scores:** Capability 4 / Upgrade pressure 4 / Switching cost 3 = **11/15 — use free tier**

---

## Summary scorecard

| Category | Free tool | Score | Verdict |
|---|---|---|---|
| Design | Figma free | 13/15 | Use confidently |
| Hosting | Netlify free | 13/15 | Use confidently |
| Database + Auth | Supabase free | 11/15 | Use, watch limits |
| Analytics | PostHog free | 13/15 | Use confidently |
| Email | Resend free | 10/15 | Use, plan upgrade |
| Error monitoring | Sentry free | 13/15 | Use confidently |
| Uptime monitoring | UptimeRobot free | 14/15 | Use confidently |
| Social scheduling | Buffer free | 10/15 | Use, tight limits |
| Image creation | Canva free | 11/15 | Use, replace with DIY |
| Screen recording | Loom free | 11/15 | Use, watch video count |
| OG images | Netlify + Satori | 11/15 | Build it |
| Link shortening | Netlify `_redirects` | 10/15 | Build it |
| Forms + surveys | Tally.so free | 14/15 | Use confidently |
| Project management | Linear free | 13/15 | Use confidently |
| Documentation | docs/ folder | 11/15 | Already doing this |
| Customer support | Email + Notion | 12/15 | Right for now |
| Video explainers | Loom + YouTube | 10/15 | Use, upgrade at £1k MRR |
| Social graphics | HTML/CSS templates | 11/15 | Build it |
| Invoicing | Wave Accounting | 12/15 | Use free tier |
| Contracts | Plain text + DocuSign | 11/15 | Use free tier |

**Total monthly software cost at £0 MRR: £0**

---

## What the analysis reveals

The single most important insight: ABLE is a static-first product with no build pipeline. This dramatically reduces the surface area of tools needed compared to a typical SaaS startup. There is no CI/CD pipeline to manage, no npm ecosystem to audit, no Docker containers to monitor.

The tools most likely to hit free limits first:
1. **Supabase** — pauses on inactivity (solvable). Hits paid tier at ~50,000 MAU (not a near-term concern).
2. **Resend** — 100 emails/day cap will be reached when fan sign-ups accelerate.
3. **Loom** — 25 video limit is the tightest free cap in the list.
4. **Buffer** — 10 queued posts per channel is a workflow constraint, not a capability gap.

The tools where the DIY approach is strictly better than any paid option:
- **OG image generation** — custom Netlify Function produces better, more on-brand images than Cloudinary templates.
- **Link shortening** — Netlify `_redirects` is zero latency, custom domain, no vendor dependency.
- **Social media graphics** — HTML/CSS templates produce pixel-perfect assets with full brand control.
- **Documentation** — version-controlled Markdown is better than Notion for a code-first project.
