# ABLE Free Stack — Spec
**System:** 25 tools to build and launch ABLE without paying for software
**Last updated:** 2026-03-16
**Status:** Definitive

---

## Overview

25 tools. £0/month at launch. Each entry specifies exactly what it replaces, why it works at this stage, how to set it up, and when to upgrade.

---

## Tool 1: Figma free tier

**Replaces:** Sketch (£79/year), Adobe XD (£22/month via Creative Cloud), paid Figma
**What it is:** Browser-based design tool with a free tier allowing 3 active projects.
**Why it works for ABLE at this stage:** 3 projects covers all of ABLE's design surface area — product screens, brand/marketing, scratchpad. No second designer, no reason to pay.
**How to set it up:**
1. Sign up at figma.com with a work email
2. Create 3 projects: "ABLE Product", "ABLE Brand", "Scratchpad"
3. Invite advisors/reviewers as view-only (free, unlimited viewers)
4. Use Figma's Dev Mode free tier to extract CSS values — not used for production code, but useful for design QA
**Free tier limits:** 3 drafts / projects. Hits a wall when a second designer joins (need Figma Professional at £11/seat/month). Version history limited to 30 days.
**Cross-links:** `docs/systems/DESIGN_SYSTEM_SPEC.md`, `docs/v6/core/VISUAL_SYSTEM.md`
**Time to implement:** 15 minutes

---

## Tool 2: Netlify free tier

**Replaces:** Paid VPS (£5–20/month), paid Vercel, AWS Amplify
**What it is:** Static site hosting with serverless functions, custom domain, HTTPS, and a generous free tier.
**Why it works for ABLE at this stage:** ABLE has no build pipeline. It's HTML files. Netlify's free tier — 100GB bandwidth/month, 300 build minutes/month, 125,000 function invocations/month — is massively overpowered for a pre-revenue product.
**How to set it up:**
1. Connect GitHub repo to Netlify via netlify.com → "New site from Git"
2. Set publish directory to `/` (root — no build step)
3. Add custom domain (able.fm or ablemusic.co) → Netlify auto-provisions SSL
4. Add `netlify.toml` at repo root for redirect rules and function config
5. Create `netlify/functions/` folder for serverless functions (OG images, email triggers, etc.)
**Free tier limits:** 100GB bandwidth/month — roughly 50,000 page visits at 2MB/page. 125k function invocations/month. Build minutes irrelevant without a build step. Upgrade to Netlify Pro (£15/month) when consistently exceeding bandwidth.
**Cross-links:** `docs/systems/seo-og/SPEC.md`, `docs/systems/email/SPEC.md`
**Time to implement:** Already in use — 0 minutes

---

## Tool 3: Supabase free tier

**Replaces:** Firebase paid (Blaze plan, typically £30–80/month), PlanetScale (£26/month), Auth0 (£19/month for auth alone)
**What it is:** Open-source Firebase alternative — PostgreSQL database, auth, storage, and Edge Functions on a generous free tier.
**Why it works for ABLE at this stage:** All ABLE's localStorage keys map 1:1 to Supabase tables. Free tier gives 500MB database, 2GB storage, 50,000 MAU — enough for first 1,000+ artists and their fans.
**How to set it up:**
1. Project already created: `https://jgspraqrnjrerzhnnhtb.supabase.co`
2. Add CDN to HTML files: `<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>`
3. Create tables matching localStorage keys: `profiles`, `fans`, `clicks`, `views`, `events`, `releases`
4. Enable magic link auth in Supabase Auth settings
5. Set up UptimeRobot to ping the project URL every 5 minutes to prevent free-tier pausing (see Tool 7)
6. Add Row Level Security (RLS) policies — each artist can only read/write their own data
**Free tier limits:** Projects pause after 1 week of inactivity (mitigated by UptimeRobot ping). 500MB database limit. 2 free projects total per account. Upgrade to Pro (£22/month) at sustained usage or when approaching 500MB.
**Cross-links:** `docs/systems/data-architecture/SPEC.md`, `CLAUDE.md` (Supabase section)
**Time to implement:** 2–3 hours (schema setup + RLS policies)

---

## Tool 4: PostHog free tier (EU Cloud)

**Replaces:** Mixpanel Growth (£17/month), Amplitude Growth (£40/month), Heap (£hundreds/month), Google Analytics (free but GDPR-problematic)
**What it is:** Open-source product analytics with session replay, feature flags, A/B testing, and funnel analysis — all on one free tier.
**Why it works for ABLE at this stage:** 1 million events/month free covers thousands of daily active users. EU Cloud means no US data transfer issues — straightforward UK GDPR compliance. Feature flags enable A/B testing without a separate tool.
**How to set it up:**
1. Sign up at eu.posthog.com (EU Cloud, not US)
2. Add snippet to all HTML files in `<head>`:
   ```html
   <script>
     !function(t,e){...}(window, document);
     posthog.init('YOUR_KEY', {api_host: 'https://eu.i.posthog.com'})
   </script>
   ```
3. Add custom events in able-v7.html for: fan sign-up, CTA clicks, page views by source
4. Add events in admin.html for: dashboard section views, campaign state changes
5. Create funnels: Landing → Profile → CTA click → Fan sign-up
6. Set up PostHog feature flags for A/B testing (replaces Tool 21)
**Free tier limits:** 1M events/month. 5,000 session recordings/month. Free forever for these limits — PostHog only charges above 1M events. Realistically not a concern until hundreds of thousands of MAU.
**Cross-links:** `docs/systems/analytics/SPEC.md`
**Time to implement:** 1 hour (snippet install + initial event mapping)

---

## Tool 5: Resend free tier

**Replaces:** Mailchimp Essentials (£9/month), Klaviyo base (£20/month), SendGrid Essentials (£14/month)
**What it is:** Developer-first transactional email API. Send emails via REST or SDK. Clean, well-documented, modern.
**Why it works for ABLE at this stage:** ABLE's email needs at launch are entirely transactional: fan sign-up confirmations, magic link auth emails, artist welcome emails. 100 emails/day = ~3,000/month = enough for first 1,000 fans.
**How to set it up:**
1. Sign up at resend.com
2. Add DNS records to verify able.fm domain (SPF, DKIM) — takes 15 minutes
3. Create API key → store in Netlify environment variable `RESEND_API_KEY`
4. Create Netlify Function `netlify/functions/send-email.js`:
   ```js
   const { Resend } = require('resend');
   const resend = new Resend(process.env.RESEND_API_KEY);
   exports.handler = async (event) => {
     const { to, subject, html } = JSON.parse(event.body);
     await resend.emails.send({ from: 'hello@able.fm', to, subject, html });
     return { statusCode: 200 };
   };
   ```
5. Trigger from fan sign-up form on able-v7.html
**Free tier limits:** 100 emails/day, 3,000/month. Upgrade to Resend Pro (£18/month) when daily sends consistently approach 100. For broadcast/marketing emails, use a separate tool (Buttondown free tier: up to 100 subscribers free, then £9/month).
**Cross-links:** `docs/systems/email/SPEC.md`
**Time to implement:** 1 hour

---

## Tool 6: Sentry free tier

**Replaces:** Bugsnag Team (£36/month), Rollbar Bootstrap (£19/month), paid Datadog error tracking
**What it is:** Error monitoring and performance tracking for front-end and serverless JavaScript.
**Why it works for ABLE at this stage:** 5,000 errors/month is more than a pre-revenue product will generate. 1 user is fine for a solo founder. Sentry catches JavaScript errors on able-v7.html, admin.html, and Netlify Functions before artists report them.
**How to set it up:**
1. Sign up at sentry.io → create a "JavaScript" project
2. Add Sentry CDN to all active HTML files:
   ```html
   <script src="https://browser.sentry-cdn.com/7.x.x/bundle.min.js" crossorigin="anonymous"></script>
   <script>
     Sentry.init({ dsn: 'YOUR_DSN', tracesSampleRate: 0.1 });
   </script>
   ```
3. Create separate projects for: ABLE Profile, ABLE Admin, ABLE Start
4. Set up Slack or email alerts for new error types (not every occurrence — too noisy)
5. Group recurring errors by type to identify systemic issues
**Free tier limits:** 5,000 errors/month, 10,000 performance transactions. 1 user on free tier. Upgrade to Sentry Team (£20/month) when a second developer joins or error volume exceeds limits.
**Cross-links:** `docs/systems/error-states/SPEC.md`
**Time to implement:** 30 minutes

---

## Tool 7: UptimeRobot free tier

**Replaces:** StatusCake Business (£16/month), Pingdom (£10/month), Better Uptime (£20/month)
**What it is:** Uptime monitoring with configurable check intervals, multi-channel alerts, and a public status page.
**Why it works for ABLE at this stage:** 5-minute check intervals catch outages within 5 minutes. 50 monitors is more than enough. Email alerts reach James immediately. Secondary use: ping Supabase every 5 minutes to prevent free-tier project pausing.
**How to set it up:**
1. Sign up at uptimerobot.com
2. Create monitors for:
   - `https://able.fm` (main domain)
   - `https://able.fm/admin.html`
   - `https://jgspraqrnjrerzhnnhtb.supabase.co/health` (Supabase keep-alive ping)
3. Set alert contact to james@able.fm
4. Enable public status page at `uptimerobot.com/dashboard` → share URL with artists if needed
5. Set keyword monitoring on able.fm to check for "ABLE" in page content (catches blank page errors)
**Free tier limits:** 5-minute minimum check interval (paid plans offer 1-minute). 50 monitors. Free tier includes basic public status page. Upgrade only if 1-minute response time is critical — unlikely pre-launch.
**Cross-links:** `docs/systems/data-architecture/SPEC.md` (Supabase section)
**Time to implement:** 20 minutes

---

## Tool 8: Buffer free tier

**Replaces:** Hootsuite Professional (£49/month), Later Pro (£16/month), Sprout Social (£169/month)
**What it is:** Social media scheduling with a queue-based system. Write content in batches, schedule across channels.
**Why it works for ABLE at this stage:** 3 channels (Instagram, TikTok, LinkedIn) and 10 queued posts per channel is enough for weekly batching. Write Monday's posts on Sunday, schedule and forget.
**How to set it up:**
1. Sign up at buffer.com
2. Connect Instagram Business, TikTok, LinkedIn
3. Set a posting schedule: Instagram 3x/week, LinkedIn 2x/week, TikTok 3x/week
4. Write posts in bulk on Sunday. Buffer auto-posts at scheduled times.
5. For Instagram Stories and Reels (not well supported by Buffer free), post manually
**Free tier limits:** 3 channels, 10 queued posts per channel. No bulk scheduling import. No analytics (use PostHog UTM parameters instead). Upgrade to Buffer Essentials (£5/month) for 10 channels and 100 posts — worth it at consistent posting volume.
**Cross-links:** `docs/systems/social-media/` (if exists), `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md`
**Time to implement:** 30 minutes

---

## Tool 9: Canva free tier

**Replaces:** Canva Pro (£10.99/month), Adobe Express Premium (£9.99/month), Adobe Illustrator (£22/month)
**What it is:** Browser-based design tool with thousands of templates for social posts, stories, presentations, and documents.
**Why it works for ABLE at this stage:** For launch assets (announcement graphics, event posters, social banners), Canva free is adequate. Not the permanent solution — that's Tool 18 (own HTML/CSS templates) — but immediately useful for scrappy launch content.
**How to set it up:**
1. Sign up at canva.com with a personal email
2. Create a Brand Kit folder with ABLE colours (#0d0e1a, #f4b942, #e05242) and DM Sans font
3. Create templates for: Instagram post (1080×1080), Instagram story (1080×1920), LinkedIn post (1200×627)
4. Use "Make a copy" to reuse templates — don't edit originals
5. Export as PNG (not JPG — keeps transparency for overlays)
**Free tier limits:** Pro templates are paywalled. No background remover. Limited font options (DM Sans is available free). Brand Kit is limited on free tier. Partially superseded by Tool 18 once HTML/CSS templates are built.
**Cross-links:** `docs/systems/brand-identity/`
**Time to implement:** 1 hour (initial template creation)

---

## Tool 10: Loom free tier

**Replaces:** Camtasia (£199/year), ScreenFlow (£99 one-off), Wistia (£68/month for basic video hosting)
**What it is:** Screen + webcam recording tool with cloud hosting and shareable links.
**Why it works for ABLE at this stage:** Product demos for artists, walkthrough videos for landing.html, async explanations for advisors and investors. Loom's 5-minute cap forces brevity, which is actually better for landing page videos.
**How to set it up:**
1. Install Loom desktop app at loom.com
2. Record with "Screen + Cam" mode for product demos, "Screen only" for tutorials
3. Trim in Loom's basic editor (free)
4. Embed on landing.html using Loom's iframe embed code
5. For videos over 5 minutes: use unlisted YouTube instead (see Tool 17)
**Free tier limits:** 25 videos total, 5-minute cap per video. Upgrade to Loom Starter (£8/month) when video library exceeds 25 or longer demos are needed.
**Cross-links:** `docs/systems/explainers/SPEC.md`
**Time to implement:** 15 minutes (install + first recording)

---

## Tool 11: OG image generation — Netlify Function + Satori

**Replaces:** Cloudinary (£80/month for paid transformations), Bannerbear (£29/month), Imgix (£10/month)
**What it is:** A Netlify serverless function that generates dynamic Open Graph images for artist profile pages using the Satori library (SVG-to-PNG in Node).
**Why it works for ABLE at this stage:** Every artist profile shared on social should show the artist's name, artwork, and ABLE branding — not a generic og.png. This function generates it on demand. £0 cost, full brand control.
**How to set it up:**
1. Create `netlify/functions/og-image.js`:
   ```js
   const satori = require('satori');
   const { Resvg } = require('@resvg/resvg-js');

   exports.handler = async (event) => {
     const { name, accent, artwork } = event.queryStringParameters;
     const svg = await satori(
       { type: 'div', props: { style: { background: '#0d0e1a', width: 1200, height: 630, display: 'flex', alignItems: 'center', padding: 60 }, children: [
         { type: 'img', props: { src: artwork, width: 400, height: 400, style: { borderRadius: 8 } } },
         { type: 'div', props: { style: { marginLeft: 48 }, children: [
           { type: 'h1', props: { style: { color: accent, fontSize: 72, fontFamily: 'Barlow Condensed' }, children: name } },
           { type: 'p', props: { style: { color: '#ffffff', opacity: 0.6 }, children: 'able.fm' } }
         ]}}
       ]}}
     }, { width: 1200, height: 630, fonts: [] });
     const resvg = new Resvg(svg);
     return { statusCode: 200, headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' }, body: resvg.render().asPng().toString('base64'), isBase64Encoded: true };
   };
   ```
2. In able-v7.html, set meta og:image to `/.netlify/functions/og-image?name=${artist}&accent=${accent}&artwork=${artwork}`
3. Test with opengraph.xyz
**Free tier limits:** 125,000 Netlify Function invocations/month on free tier. At 1 social share per profile = 1 invocation. No realistic limit for years.
**Cross-links:** `docs/systems/seo-og/SPEC.md`
**Time to implement:** 3 hours

---

## Tool 12: Link shortening — Netlify `_redirects`

**Replaces:** Bitly Starter (£8/month), Rebrandly Pro (£9/month), Short.io (£15/month)
**What it is:** A `_redirects` file in the Netlify root that handles custom short URL redirects on the able.fm domain.
**Why it works for ABLE at this stage:** No vendor dependency, zero latency (Netlify CDN handles the redirect), custom able.fm domain, UTM parameters preserved. Two lines of text replaces an £8/month subscription.
**How to set it up:**
1. Create `_redirects` at repo root if not already present
2. Add artist short links:
   ```
   /mira     https://able.fm/mira-johnson    301
   /j/drops  https://able.fm/j/drops?utm_source=bio&utm_medium=instagram  302
   ```
3. For analytics: append UTM parameters to destination URLs. PostHog captures UTM source/medium automatically.
4. For vanity links in social bio: use `/[artist-slug]` — clean, memorable, no third-party tracking pixels
5. Commit changes to deploy instantly (Netlify deploys in < 60 seconds for static changes)
**Free tier limits:** None — this is a static file, not a service. No click analytics per link (use PostHog UTMs instead). If per-link click counts are needed, upgrade to Bitly Starter (£8/month) — but UTM tracking in PostHog is superior.
**Cross-links:** `docs/systems/seo-og/SPEC.md`, `docs/systems/analytics/SPEC.md`
**Time to implement:** 10 minutes

---

## Tool 13: Tally.so free tier

**Replaces:** Typeform Business (£42/month), JotForm Professional (£24/month), SurveyMonkey Advantage (£36/month)
**What it is:** Modern form builder with logic branching, file uploads, payment collection, and unlimited responses — all free.
**Why it works for ABLE at this stage:** Artist waitlist, fan feedback surveys, NPS collection, beta application forms. Tally's free tier has no response limits — Typeform's free tier caps at 10 responses per form per month (useless).
**How to set it up:**
1. Sign up at tally.so
2. Create forms:
   - Artist early access waitlist (name, email, genre, Instagram handle)
   - Post-onboarding artist survey (5 questions, logic-branched)
   - Fan feedback form (embedded on able-v7.html)
   - Bug report form (embedded on admin.html footer)
3. Embed via Tally's iframe embed or popup trigger
4. Connect to Resend via Tally webhooks (Zapier-free) for confirmation emails
5. Export responses as CSV weekly for tracking
**Free tier limits:** Unlimited forms, unlimited responses. Custom domain is a Pro feature (£24/month) — fine for now, Tally's own domain is acceptable. Webhooks are free. Upgrade if custom domain embed is needed.
**Cross-links:** `docs/systems/email/SPEC.md`, `docs/systems/data-architecture/SPEC.md`
**Time to implement:** 45 minutes (all forms built and embedded)

---

## Tool 14: Linear free tier

**Replaces:** Linear Standard (£7/month, not needed solo), Jira (£7/month per user), Notion as task tracker (£7/month)
**What it is:** Engineering-focused issue tracker with cycles (sprints), roadmaps, and a genuinely fast UI.
**Why it works for ABLE at this stage:** Linear free tier is unlimited for solo use. Issues, labels, milestones, cycles — everything needed to track the ABLE build. Better UX than Jira. More structured than Notion for task tracking.
**How to set it up:**
1. Sign up at linear.app
2. Create workspace "ABLE"
3. Create teams: "Product" (able-v7, admin, start, landing), "Systems" (email, analytics, OG, etc.), "Marketing"
4. Import current `docs/STATUS.md` open items as issues
5. Set up cycles (2-week sprints)
6. Link issues to GitHub commits via Linear's GitHub integration (free)
**Free tier limits:** Unlimited issues, cycles, and projects. Free until team exceeds 250 members. No guest access restrictions. Effectively free forever for ABLE.
**Cross-links:** `docs/STATUS.md`, `docs/MASTER-CHECKLIST.md`
**Time to implement:** 1 hour (initial setup + issue import)

---

## Tool 15: Documentation — docs/ folder

**Replaces:** Notion workspace (£7/month per user), Confluence (£5/month per user), GitBook (£6/month)
**What it is:** Markdown files in the `docs/` directory of the ABLE repo — version-controlled, searchable, always in sync with the code.
**Why it works for ABLE at this stage:** Already in use and working well. Every spec, decision log, system design, and build authority doc is in `docs/`. It's searchable via grep/ripgrep, editable in any text editor, and co-located with the code it describes. No context switch, no separate tool to maintain.
**How to set it up:**
1. Already set up. See `docs/FILE-STRUCTURE.md` for navigation.
2. Maintain the `docs/STATUS.md` as the single source of truth for build state.
3. Follow the `ANALYSIS.md → SPEC.md → PATH-TO-10.md → FINAL-REVIEW.md` pattern for all new systems.
4. Update `CONTEXT.md` authority table when new system docs are created.
5. Index all docs in `docs/INDEX.md` for discoverability.
**Free tier limits:** None — files in a git repo are free forever.
**Cross-links:** `CONTEXT.md`, `docs/FILE-STRUCTURE.md`, `docs/INDEX.md`
**Time to implement:** Already done

---

## Tool 16: Customer support — email + Notion template

**Replaces:** Intercom (£74/month), Zendesk Suite (£49/month), Freshdesk Growth (£12/month), Help Scout (£16/month)
**What it is:** A hello@able.fm email inbox for artist support, paired with a simple Notion template for tracking recurring issues and resolutions.
**Why it works for ABLE at this stage:** Under 50 artists, there are maybe 2–5 support queries per week. A dedicated inbox with a Notion tracking template handles this trivially. Intercom at £74/month is a premium tool designed for thousands of users. It's genuinely wasteful before product-market fit.
**How to set it up:**
1. Set up hello@able.fm in Google Workspace (or Fastmail, £3/month if on budget) — or use a Netlify contact form that emails to a personal address
2. Create a Notion template with columns: Issue, Artist, Date, Status, Resolution, Pattern (recurring?)
3. Log every support query. After 20 queries, patterns will emerge → inform FAQ (Tool 23)
4. Create a public FAQ page at able.fm/help — static HTML, no tool needed
5. Auto-respond with a Tally form acknowledgement using Resend (Tool 5)
**Free tier limits:** Email inbox is effectively free. Notion personal free tier: unlimited pages, limited collaboration. Breaks down at 50+ support queries/week or when a second person handles support — hire a VA or upgrade to Freshdesk free (10 agents, 1 mailbox) first.
**Cross-links:** `docs/systems/complaint-resolution/`, `docs/systems/artist-success/`
**Time to implement:** 30 minutes

---

## Tool 17: Video explainers — Loom free tier + YouTube unlisted

**Replaces:** Wistia (£68/month for 10 videos + analytics), Vimeo Pro (£15/month), paid Cloudflare Stream
**What it is:** Product explainer videos hosted on Loom (short, < 5 min) or YouTube unlisted (longer content) and embedded directly on ABLE pages.
**Why it works for ABLE at this stage:** Landing page explainer: 60–90 seconds, Loom free. Artist onboarding walkthrough: 3–4 minutes, Loom free. Full feature tour: YouTube unlisted with `?rel=0&modestbranding=1` to minimise YouTube branding.
**How to set it up:**
1. Record landing page explainer in Loom (60–90 seconds, screencap + webcam)
2. Embed in landing.html hero section:
   ```html
   <iframe src="https://www.loom.com/embed/YOUR_ID?hide_owner=true&hide_share=true&hide_title=true" frameborder="0" allowfullscreen></iframe>
   ```
3. For YouTube embed (longer content): upload as Unlisted, embed with `?rel=0&modestbranding=1&autoplay=0`
4. Do not autoplay videos — intrusive on a profile page
5. Add a text fallback beneath every embed for slow connections
**Free tier limits:** Loom: 25 videos, 5 min/video. YouTube: unlimited, free, but adds "More videos" after playback — use `?rel=0` to minimise. Upgrade to Wistia (£68/month) only when brand presentation at scale justifies it.
**Cross-links:** `docs/systems/explainers/SPEC.md`
**Time to implement:** 2 hours (record + embed)

---

## Tool 18: Social media graphics — own HTML/CSS templates

**Replaces:** Canva Pro (£10.99/month), Adobe Express Premium (£9.99/month), custom design work (£50+/asset)
**What it is:** A set of HTML/CSS template files in `social-templates/` that render on-brand social graphics — screenshotted via Playwright or browser dev tools for export.
**Why it works for ABLE at this stage:** One afternoon of work creates pixel-perfect, infinitely reusable, on-brand social assets. The templates use ABLE's actual design tokens — colours, fonts, spacing — so they're always consistent. Canva can't match this precision.
**How to set it up:**
1. Create `social-templates/` folder at repo root
2. Build 5 template files:
   - `ig-post.html` — 1080×1080 Instagram square post
   - `ig-story.html` — 1080×1920 Instagram story
   - `linkedin-post.html` — 1200×627 LinkedIn banner
   - `artist-spotlight.html` — 1080×1080 artist feature card
   - `drop-announcement.html` — 1080×1080 new release card
3. Each template accepts URL query params: `?artist=Mira&release=Hollow+Ground&accent=%23e05242`
4. Screenshot with Playwright:
   ```js
   await page.goto('file://social-templates/ig-post.html?artist=Mira');
   await page.setViewportSize({ width: 1080, height: 1080 });
   await page.screenshot({ path: 'exports/mira-ig.png', fullPage: false });
   ```
5. Export PNG. Done. No third-party tool, no subscription, no brand inconsistency.
**Free tier limits:** None — static HTML files in the repo. Zero cost forever.
**Cross-links:** `docs/systems/brand-identity/`, `docs/systems/instagram-strategy/INSTAGRAM-DATA-AND-LEADS.md`
**Time to implement:** 4 hours (build all 5 templates)

---

## Tool 19: Wave Accounting (free forever)

**Replaces:** FreshBooks Lite (£13/month), QuickBooks Simple Start (£12/month), Xero Starter (£15/month), Sage Accounting (£12/month)
**What it is:** Free cloud accounting software for sole traders and small businesses. Truly free — no trial, no expiry, no hidden tier.
**Why it works for ABLE at this stage:** ABLE is pre-revenue. Wave handles invoicing, basic bookkeeping, and income/expense tracking for a UK sole trader. It's adequate until revenues justify a proper accountant recommending Xero.
**How to set it up:**
1. Sign up at waveapps.com with a business email
2. Set up business as "ABLE Music Ltd" or sole trader (James Cuthbert trading as ABLE)
3. Create invoice templates with ABLE branding
4. Add bank account manually (or via Wave's bank connection feature)
5. Log income and expenses monthly — takes 30 minutes/month
6. Use Wave's UK invoice templates (HMRC-compliant)
7. Export P&L at year end for accountant / self-assessment
**Free tier limits:** Truly free for invoicing and accounting. Wave charges 1.4% + 20p per card transaction if using Wave Payments (optional). UK bank feeds are limited — manual import via CSV is fine for low transaction volume. Upgrade to Xero Starter (£15/month) when working with an accountant or needing Making Tax Digital (MTD) compliance.
**Cross-links:** `docs/systems/accounting/`
**Time to implement:** 45 minutes

---

## Tool 20: Contract management — plain text + DocuSign free tier

**Replaces:** HelloSign (£13/month), PandaDoc Essentials (£19/month), DocuSign Standard (£12/month), Ironclad
**What it is:** Plain text agreements stored in `docs/legal/` (version-controlled), with DocuSign free tier for the few contracts requiring a signature.
**Why it works for ABLE at this stage:** Most "contracts" for ABLE are actually ToS acceptance at sign-up — handled by a Supabase-logged checkbox with IP and timestamp (legally valid under UK Electronic Communications Act 2000). Advisor agreements, NDAs, and freelancer contracts (3/month) use DocuSign free tier.
**How to set it up:**
1. Create `docs/legal/` folder (if not exists)
2. Add standard templates: `tos.md`, `privacy-policy.md`, `advisor-nda.md`, `freelancer-agreement.md`
3. Sign up at docusign.com — free tier includes 3 signature requests/month
4. For artist ToS: add checkbox to start.html sign-up flow → log to Supabase `profiles.tos_accepted_at` with IP
5. For GDPR: add `privacy-policy.md` to legal folder + link from able.fm/privacy
6. For advisor agreements: use DocuSign free tier (3/month covers the realistic advisor pipeline)
**Free tier limits:** DocuSign free: 3 signature requests/month. Upgrade to DocuSign Personal (£10/month, 5/month) or HelloSign (£13/month, unlimited) when pipeline exceeds 3 signed docs/month. ToS acceptance via checkbox is unlimited and free forever.
**Cross-links:** `docs/systems/legal-compliance/`
**Time to implement:** 2 hours (templates + Supabase ToS logging)

---

## Bonus Tool 21: A/B testing — PostHog feature flags + `?variant=` URL param

**Replaces:** Optimizely (£hundreds/month), VWO (£130/month), Google Optimize (discontinued), Unbounce (£74/month)
**What it is:** PostHog's free-tier feature flags combined with a simple `?variant=` URL query parameter for routing different versions of the landing page or profile page.
**Why it works for ABLE at this stage:** A/B testing at pre-revenue scale is: "Does version A or version B get more fan sign-ups?" PostHog feature flags handle this with zero extra tooling. The `?variant=b` approach lets James manually split traffic via different social post links and compare funnel metrics in PostHog.
**How to set it up:**
1. In PostHog: Create Feature Flag "landing-hero-test" with 50/50 split
2. In landing.html:
   ```js
   const variant = posthog.getFeatureFlag('landing-hero-test');
   if (variant === 'test') { document.getElementById('hero-cta').textContent = 'Claim your page'; }
   ```
3. For manual URL-based split: read `new URL(location).searchParams.get('variant')` → apply different copy/layout
4. Track conversion events in PostHog by variant → compare funnel
**Free tier limits:** PostHog feature flags are free up to 1M flag evaluations/month. Effectively unlimited for ABLE.
**Cross-links:** `docs/systems/analytics/SPEC.md`
**Time to implement:** 1 hour

---

## Bonus Tool 22: Status page — own static HTML

**Replaces:** Statuspage.io (£79/month), BetterUptime Status Page (£20/month), Instatus (£16/month)
**What it is:** A static HTML page at able.fm/status that shows current platform status, updated manually or via a Netlify Function reading from UptimeRobot's API.
**Why it works for ABLE at this stage:** Artists and fans don't need a polished Statuspage — they need a URL they can visit when something feels wrong. A static page with a last-updated timestamp and a green/yellow/red indicator is adequate. UptimeRobot's public status page is also free and linkable.
**How to set it up:**
1. Create `status.html` at repo root
2. Display: overall status (Operational / Degraded / Down), last checked timestamp, UptimeRobot embed or link
3. UptimeRobot free public status page: share the direct UptimeRobot URL as `able.fm/status` redirect in `_redirects`
4. For incidents: update a `status.json` file in the repo → Netlify Function reads it → status.html displays it
**Free tier limits:** None. Static HTML is free forever.
**Cross-links:** `docs/systems/error-states/SPEC.md`
**Time to implement:** 1 hour

---

## Bonus Tool 23: FAQ / chatbot — own JSON-driven component

**Replaces:** Intercom chat widget (£74/month), Drift (£40/month), Freshdesk Messaging (£12/month)
**What it is:** A JSON file (`faq.json`) that drives an accordion FAQ component on able.fm/help — no back-end, no vendor, no tracking pixels from third parties.
**Why it works for ABLE at this stage:** Under 50 artists, the top 10 questions are knowable and answerable in a well-designed FAQ page. This reduces support email volume by 60–80% without paying for a chatbot. The JSON structure means it's trivial to add, edit, or reorder questions.
**How to set it up:**
1. Create `faq.json` at repo root:
   ```json
   [
     { "q": "How do I connect my Spotify?", "a": "Go to your dashboard → Connections → Spotify. We pull your latest releases automatically.", "category": "setup" },
     { "q": "Can fans sign up without an email?", "a": "Not yet. Email is the only contact method for now — no social login at this stage.", "category": "fans" }
   ]
   ```
2. Build `help.html` with a JS accordion component that reads from `faq.json`
3. Add category filter pills (Setup / Fans / Billing / Technical)
4. Add "Still stuck? Email hello@able.fm" as a fallback CTA
5. Update `faq.json` based on actual support queries — 1 hour per month
**Free tier limits:** None. Static files are free forever.
**Cross-links:** `docs/systems/complaint-resolution/`
**Time to implement:** 2 hours

---

## Bonus Tool 24: Email capture pre-launch — Tally.so waitlist form

**Replaces:** Mailchimp landing pages (£9/month), ConvertKit (£25/month), Carrd Pro (£9/year), Unbounce (£74/month)
**What it is:** A Tally.so form embedded on landing.html (or as a standalone Tally page) for capturing artist and fan waitlist sign-ups before ABLE is publicly live.
**Why it works for ABLE at this stage:** Tally free tier has no response limits. The form collects name, email, genre, and Instagram handle — exactly what's needed to qualify the waitlist and segment by artist type. Responses export to CSV for manual follow-up.
**How to set it up:**
1. In Tally: create "ABLE Early Access" form with fields: name, email, "Are you an artist or fan?", genre (conditional on artist), Instagram handle
2. Add logic: artists → thank you screen with "We'll be in touch within 48 hours"; fans → "Tell your favourite artist about ABLE"
3. Embed on landing.html above fold as a popup or inline
4. Set up Tally webhook → Resend confirmation email via Netlify Function
5. Review responses weekly. Personally email the first 50 artists.
**Free tier limits:** Tally free: unlimited responses. The manual follow-up process is the constraint, not the tool.
**Cross-links:** `docs/systems/email/SPEC.md`, `docs/systems/growth-loop/`
**Time to implement:** 1 hour

---

## Bonus Tool 25: Social proof widget — own component reading from Supabase

**Replaces:** Testimonial.to (£20/month), Senja (£17/month), EmbedSocial (£29/month)
**What it is:** A simple JavaScript component on landing.html that reads fan or artist testimonials from a Supabase table and renders them inline — no vendor, no tracking pixels.
**Why it works for ABLE at this stage:** Social proof is critical for artist sign-up conversion. "7 artists are already using ABLE" or "Mira's fans signed up 3× faster after she set up her page" — these statements, pulled from real Supabase data, are more credible than anything a paid testimonials tool generates. The component is 30 lines of JavaScript.
**How to set it up:**
1. Create `testimonials` table in Supabase: `{ id, quote, artist_name, genre, approved, ts }`
2. Manually add first 5–10 testimonials after beta launch (ask artists directly)
3. Build JS component in landing.html:
   ```js
   const { data } = await supabase.from('testimonials').select('*').eq('approved', true).limit(6);
   data.forEach(t => renderTestimonialCard(t));
   ```
4. Rotate testimonials client-side with a simple CSS animation (no library needed)
5. Add a Tally form for artist testimonial submission → manually approve in Supabase dashboard
**Free tier limits:** Supabase free tier query limits are generous (unlimited reads on free tier, just storage/MAU limits). This component costs nothing extra.
**Cross-links:** `docs/pages/landing/DESIGN-SPEC.md`, `docs/systems/data-architecture/SPEC.md`
**Time to implement:** 2 hours

---

## Complete tool list summary

| # | Tool | Replaces | Monthly saving |
|---|---|---|---|
| 1 | Figma free | Sketch/Adobe XD | £7–22/month |
| 2 | Netlify free | Paid hosting | £5–20/month |
| 3 | Supabase free | Firebase/Auth0 | £30–80/month |
| 4 | PostHog free | Mixpanel/Amplitude | £17–40/month |
| 5 | Resend free | Mailchimp/Klaviyo | £9–20/month |
| 6 | Sentry free | Bugsnag/Rollbar | £19–36/month |
| 7 | UptimeRobot free | StatusCake/Pingdom | £10–16/month |
| 8 | Buffer free | Hootsuite/Later | £16–49/month |
| 9 | Canva free | Adobe Express | £10/month |
| 10 | Loom free | Camtasia/ScreenFlow | £8–17/month |
| 11 | Netlify + Satori | Cloudinary/Bannerbear | £29–80/month |
| 12 | Netlify `_redirects` | Bitly/Rebrandly | £8–15/month |
| 13 | Tally.so free | Typeform/JotForm | £24–42/month |
| 14 | Linear free | Linear Standard/Jira | £7/month |
| 15 | docs/ folder | Notion/Confluence | £7/month |
| 16 | Email + Notion | Intercom/Zendesk | £49–74/month |
| 17 | Loom + YouTube | Wistia/Vimeo | £15–68/month |
| 18 | HTML/CSS templates | Canva Pro | £11/month |
| 19 | Wave Accounting | FreshBooks/Xero | £12–15/month |
| 20 | Plain text + DocuSign | HelloSign/PandaDoc | £13–19/month |
| 21 | PostHog flags | Optimizely/VWO | £130+/month |
| 22 | Own status page | Statuspage.io | £16–79/month |
| 23 | JSON FAQ component | Intercom chat | £40–74/month |
| 24 | Tally.so waitlist | ConvertKit/Mailchimp | £9–25/month |
| 25 | Supabase testimonials | Testimonial.to/Senja | £17–29/month |

**Total saving vs. paid alternatives: £536–£927/month**
**Total cost with this stack: £0/month**
