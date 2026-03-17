# ABLE Free Stack — Final Review
**System:** Honest limits, upgrade triggers, and cost projections
**Last updated:** 2026-03-16
**Status:** Definitive

---

## What this document is

An honest assessment of where each "free" tool in the ABLE stack has real limitations, what breaks at 50 vs 500 artists, and what the upgrade triggers look like in plain numbers. No optimism. No wishful thinking.

The goal: James should be able to look at this document at any MRR milestone and know exactly which tools to upgrade and why.

---

## Honest limit analysis by tool

### Supabase free tier
**Real limitation:** Free tier projects pause after 1 week of inactivity. This is mitigated by UptimeRobot pings, but the mitigation only works if UptimeRobot is configured correctly before Supabase goes idle.
**50 artists:** Completely fine. 50 artists with 50 fans each = 2,500 records. Storage is negligible.
**500 artists:** Starting to approach meaningful territory. 500 artists × 200 fans each = 100,000 fan records. Still within 500MB storage limit if fan records are lean (email + timestamp + source = ~100 bytes each = 10MB for 100k fans). Database size is fine; MAU limit (50,000) becomes relevant if fan engagement is high.
**Upgrade trigger:** When MAU exceeds 40,000 (early warning at 35,000) OR when database approaches 400MB. Supabase Pro at £22/month gives 8GB storage and no pausing — worth it immediately at first paying customer.
**Risk level:** Medium. The inactivity pause is the only near-term risk and it's controllable.

---

### Resend free tier
**Real limitation:** 100 emails/day hard cap. Not a soft limit — emails will fail silently if the cap is hit without proper error handling.
**50 artists:** At 50 artists with 50 fans each, 2,500 fans total. If ABLE sends one email to all fans for a new drop: 2,500 emails = 25 days at the free tier rate. This is already breaking the free tier for broadcast use.
**Critical clarification:** Resend free is for transactional emails only (magic link, fan sign-up confirmation). Broadcast emails (new drop alerts, newsletter) require a separate tool — either Resend Pro or a dedicated broadcast tool like Buttondown.
**500 artists:** Transactional email volume (sign-ups, auth) will easily exceed 100/day during any growth period.
**Upgrade trigger:** When daily transactional emails reliably approach 80/day (early warning). For broadcast: upgrade immediately at first send to a list >100. Resend Pro: £18/month for 50,000 emails/month.
**Risk level:** High for broadcast. Low for transactional at launch.

---

### Netlify free tier
**Real limitation:** 100GB bandwidth/month and 125,000 serverless function invocations/month.
**50 artists:** 50 artists + their fans browsing = maybe 500–1,000 page views/day. At 2MB/page = 2GB/month. Completely fine.
**500 artists:** 500 artists with active fan bases could mean 50,000 page views/day. At 2MB/page = 3TB/month. This blows through Netlify free at scale. However, 500 active artist profiles with 50k daily page views implies significant traction — at that point, paying £15/month for Netlify Pro is trivial.
**OG function invocations:** If every profile share triggers an OG image request, 500 artists sharing daily = 500 requests/day = 15,000/month. Well within 125k free tier.
**Upgrade trigger:** When monthly bandwidth consistently exceeds 80GB. Netlify Pro at £15/month gives 400GB.
**Risk level:** Low. Free tier is very generous for a static-first product.

---

### PostHog free tier
**Real limitation:** 1 million events/month. 5,000 session recordings/month.
**50 artists:** 50 artists and their fans generating events. If each fan visit generates 10 events (page view, CTA impressions, CTA clicks, scroll depth): 10,000 fans × 10 events = 100,000 events/month. Tiny.
**500 artists:** 500 artists, 100,000 fans, 10 events each = 1,000,000 events/month. Right at the free tier limit.
**Session recordings:** At 5,000/month, this caps out at 167 session recordings/day — fine for a product with 10k–50k monthly users.
**Upgrade trigger:** When monthly events consistently approach 800,000. PostHog paid tier: pay-as-you-go above 1M events, approximately £50/month at 2M events.
**Risk level:** Low. This limit only becomes relevant at meaningful scale — by which point ABLE has revenue.

---

### Buffer free tier
**Real limitation:** 3 channels, 10 queued posts per channel. Not a capability limit but a workflow constraint.
**50 artists:** This is a personal content tool for James (not for artists). 3 channels (Instagram, TikTok, LinkedIn) and 10 queued posts each = 30 posts queued. That's 10 days of 3 posts/day. The constraint is that James has to refill the queue every 10 days.
**500 artists:** Buffer is still a personal tool. The scale of ABLE doesn't affect Buffer.
**Upgrade trigger:** When consistent multi-platform posting makes the queue refill frustrating. Buffer Essentials: £5/month for 10 channels and 100 posts — worth it immediately if social posting is a weekly habit.
**Risk level:** Low. The cost to upgrade is trivial (£5/month).

---

### Loom free tier
**Real limitation:** 25 videos total, 5-minute cap per video. The 25-video hard limit is the tightest free cap in the entire stack.
**50 artists:** At 25 videos, James can have: 1 landing page explainer, 1 onboarding walkthrough, 1 admin tutorial, 3–5 advisor demos, and 15–20 artist welcome recordings. Runs out within 3 months of active use.
**Mitigation:** Archive old videos by downloading the MP4 (Loom free allows download) and re-hosting on YouTube or a private folder. The 25 active videos limit, not a total limit.
**500 artists:** By 500 artists, ABLE needs professional video production. Wistia (£68/month) or Vimeo Pro (£15/month) becomes appropriate.
**Upgrade trigger:** When active video count reaches 20 (early warning). Loom Starter: £8/month — immediate value.
**Risk level:** Medium. The 25-video cap will be hit faster than expected.

---

### Sentry free tier
**Real limitation:** 5,000 errors/month, 1 user.
**50 artists:** Unless the product has serious bugs, 5,000 errors/month is extremely unlikely with 50 artists.
**500 artists:** Higher user volume means more error diversity. 500 artists and their fans using the product daily could generate more error events during incidents. Still manageable at typical error rates.
**Upgrade trigger:** When a second developer joins (1-user limit) or when error volume exceeds 4,000/month. Sentry Team: £20/month.
**Risk level:** Low. The 1-user limit is the only near-term concern.

---

### DocuSign free tier
**Real limitation:** 3 signature requests per month.
**50 artists:** Most contracts are artist ToS acceptance (handled by checkbox in Supabase — not DocuSign). 3 signature requests/month covers: 1–2 advisor agreements + 1 freelancer contract/month.
**500 artists:** By 500 artists, all artist agreements should be automated as ToS checkbox acceptance. DocuSign is for advisor/investor/contractor agreements only.
**Upgrade trigger:** When signature requests consistently exceed 3/month. HelloSign (£13/month, unlimited requests) is the upgrade path.
**Risk level:** Low for the use case described.

---

### Wave Accounting
**Real limitation:** UK bank feed quality is limited. Manual CSV import required for some UK banks.
**50 artists:** Fine. If ABLE has 50 artists on a paid tier at £9/month = £450 MRR. Wave handles this easily.
**500 artists:** At £9/month × 500 = £4,500 MRR, Wave starts showing limitations — limited VAT/Making Tax Digital support, no payroll (irrelevant until hiring), no Stripe integration (relevant when subscription billing is automated).
**Upgrade trigger:** When MTD VAT filing is required OR when annual revenue exceeds £30,000 and an accountant recommends Xero. Xero Starter: £15/month.
**Risk level:** Low. Wave is adequate until real accounting complexity.

---

## Tools with no meaningful limits at ABLE's scale

These free tools will never be upgrade-forced by ABLE's growth:

- **Netlify `_redirects`** — static file, unlimited
- **docs/ folder** — static markdown, unlimited
- **Social media graphic templates** — static HTML, unlimited
- **Own status page** — static HTML, unlimited
- **Own FAQ component** — static JSON, unlimited
- **Linear free tier** — unlimited for solo use, free until 250+ team members
- **UptimeRobot free tier** — 50 monitors is more than ABLE will ever need
- **PostHog feature flags** — 1M evaluations/month, will never be hit pre-scale

---

## Cost table

### At £0 MRR (pre-revenue)

| Tool | Monthly cost |
|---|---|
| All 25 tools | £0 |
| **Total** | **£0/month** |

No exceptions. Every tool listed in SPEC.md has a free tier that covers pre-revenue usage.

---

### At £1k MRR (~111 artists on Free tier, ~110 on Paid at £9/month)

At this stage, ABLE has real users. The tools that need upgrading:

| Tool | Reason to upgrade | Monthly cost |
|---|---|---|
| Supabase Pro | First paying customers justify not risking the free tier pause | £22 |
| Resend Pro | Daily transactional emails will approach 100/day during growth periods | £18 |
| Loom Starter | Video library will exceed 25 active videos within 3 months | £8 |
| Buffer Essentials | Weekly content scheduling is a real habit by this point | £5 |
| **Total** | | **£53/month** |

Note: At £1k MRR, £53/month tooling spend is 5.3% of revenue — well within acceptable range.

---

### At £5k MRR (~277 artists on Artist tier at £9/month + some on Artist Pro at £19/month)

At this stage, ABLE is a real product with real operational demands.

| Tool | Reason to upgrade | Monthly cost |
|---|---|---|
| Supabase Pro | Already upgraded at £1k MRR | £22 |
| Resend Pro | Already upgraded at £1k MRR | £18 |
| Loom Starter | Already upgraded at £1k MRR | £8 |
| Buffer Essentials | Already upgraded at £1k MRR | £5 |
| Netlify Pro | Bandwidth approaching 100GB/month with growing artist base | £15 |
| PostHog paid | Approaching 1M events/month with active fan base | ~£50 |
| Wistia / Vimeo Pro | Professional video hosting for landing page at this revenue level | £15 |
| Freshdesk Growth | Email support is insufficient at 277+ artists; a lightweight ticket system helps | £12 |
| Xero Starter | MTD VAT likely required by this revenue level; accountant recommendation | £15 |
| **Total** | | **£160/month** |

Note: At £5k MRR, £160/month tooling spend is 3.2% of revenue — healthy and sustainable.

---

## Upgrade decision framework

When to upgrade a tool:

1. **When the free tier creates a customer-facing risk.** A paused Supabase project is customer-facing (artists can't log in). A 25-video Loom limit is not customer-facing (only James sees it).
2. **When working around the limit costs more in James's time than the upgrade.** If Buffer's 10-post queue means refilling it twice a week (20 minutes/week = 80 minutes/month), and upgrading costs £5/month, the upgrade is worth it if James's time is worth more than £3.75/hour.
3. **When the free tool's quality gap starts affecting product quality.** Loom's free embed adds "Try Loom" branding — fine at £0 MRR, looks unprofessional at £5k MRR.
4. **Never upgrade to justify spending money.** Only upgrade when the specific limit or quality issue is actually felt.

---

## The tools James should upgrade first, in order

1. **Supabase Pro (£22/month)** — as soon as the first artist pays. Eliminates the inactivity pause risk entirely.
2. **Resend Pro (£18/month)** — as soon as daily email sends approach 80/day.
3. **Loom Starter (£8/month)** — when active video count hits 20.
4. **Buffer Essentials (£5/month)** — when the queue refill becomes a weekly friction point.
5. **Netlify Pro (£15/month)** — when monthly bandwidth exceeds 80GB.

**First upgrade spend: £48/month.** These 5 tools, in this order, are the only justified upgrades before £2k MRR.

---

## What this stack proves

A solo founder can build and launch a real SaaS product — with error monitoring, analytics, email, database, auth, OG images, uptime monitoring, link shortening, forms, scheduling, documentation, contracts, and invoicing — for £0/month.

The tools that cost money at scale (Supabase Pro, Resend Pro) are the tools that are already doing real work. Paying for them is paying for infrastructure that earns its keep.

The tools that never need upgrading (docs/ folder, Netlify `_redirects`, HTML/CSS templates, Linear) are the ones where the DIY approach is strictly superior to any paid alternative.

The total upgrade bill at £5k MRR (£160/month, 3.2% of revenue) is proof that software costs are not the constraint on ABLE's economics. Distribution and product quality are the constraints. Keep the tooling lean and spend the saved money on things that actually drive growth.
