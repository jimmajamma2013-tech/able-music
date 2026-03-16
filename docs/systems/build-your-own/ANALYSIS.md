# ABLE Build-Your-Own — Analysis
**Created: 2026-03-16 | Authority: primary**

> The question is not "can we build this ourselves?" The answer is almost always yes. The question is: "should we?" This document gives ABLE a clear framework for making that call — and audits the 15 most relevant tools against it.

---

## The SaaS tax: what it costs to be a customer

At £5,000 MRR, a typical early-stage SaaS product carries a tool stack that looks something like this:

| Tool | Purpose | Cost/month |
|---|---|---|
| Mixpanel | Product analytics | $25 |
| Mailchimp | Email marketing | $35 |
| ConvertKit | Email broadcasts | $29 |
| HubSpot CRM | Lead tracking | $45 |
| Baremetrics | Revenue analytics | $50 |
| Statuspage | Uptime monitor | $79 |
| Intercom | Onboarding + support | $39 |
| Cloudinary | Image transforms | $89 |
| Sentry | Error monitoring | $26 |
| Optimizely | A/B testing | $40 |
| Canva Pro | Social graphics | $13 |
| Linktree Pro | Link management | $9 |
| presskit.io | Press kits | $15 |
| **Total** | | **~£450/month** |

At £5k MRR that is 9% of gross revenue going to tools. At £10k MRR it is 4.5%. At £20k MRR it is 2.25%. The SaaS tax is regressive — it hurts the most when you can least afford it.

More importantly: none of these tools were built for what ABLE does. Every one was built for a generic use case by a team of 10+ engineers who needed the tool to work for a marketing agency, a B2B SaaS company, a DTC brand, and an independent musician simultaneously. The result is tools with enormous surface areas that ABLE uses at 5% capacity and pays 100% of the price for.

---

## The compounding problem

SaaS tools don't just cost money. They cost:

**Integration friction.** Every tool is another login, another webhook, another API key stored somewhere, another place a fan's email might live. The more tools, the more places something can break silently.

**Data gravity.** Fan emails in Mailchimp are Mailchimp's leverage. Event data in Mixpanel is Mixpanel's leverage. The moment you want to do something those tools don't support — cross-reference fan sign-up source with which campaign state was active at the time — you are stuck unless you export and manipulate data yourself.

**UX mismatch.** ABLE's design system is precise. The admin dashboard uses `--bg: #09090f`, Amber `#f4b942`, Plus Jakarta Sans. Every embedded third-party widget breaks that. Mailchimp's "fan list" page is not ABLE's fan list page. Artists using ABLE deserve a coherent experience, not a patchwork.

**Vendor risk.** Mailchimp has been acquired twice. ConvertKit renamed to Kit and shifted focus. Baremetrics was acquired by Stripe. Any of the tools in the stack above could be sunset, acquired, repriced, or changed to require a higher tier at any moment.

---

## Where build-your-own wins

Building your own beats buying when **all three of these are true**:

1. The tool's core function is simple enough to implement in hours, not weeks
2. The tool requires deep integration with ABLE's specific data model
3. The UI needs to feel like ABLE, not like a third-party embed

The best build-your-own opportunities share additional characteristics:

**The data is sensitive.** Fan emails should never touch Mailchimp. They are the artist's relationship — the most valuable thing on the platform. Routing them through a third party is a liability: GDPR risk, data breach risk, and the risk that Mailchimp uses that data to build its own musician product one day.

**The generic version is mostly infrastructure you don't need.** Mixpanel has cohort analysis, A/B test instrumentation, funnel visualisation, custom dashboards, team roles, and a Salesforce integration. ABLE needs: fans/day chart, CTA tap-through rate, source breakdown. Three things. Mixpanel is 3% of the surface area at 100% of the price.

**The build time is short relative to the payback period.** A tool that costs £30/month pays back a 4-hour build in 8 days. If that tool also integrates better with ABLE's data model and has no privacy trade-offs — the build-your-own wins on every dimension.

**ABLE has Claude Code.** This is not a standard solo founder situation. With Claude Code, a 4-hour build estimate is real. A conventional team's "3-day build" is ABLE's "2-hour build". This changes the economics of every make-vs-buy decision materially.

---

## Where buying beats building

Building your own loses decisively when:

**The tool's complexity is genuine, not artificial.** Stripe handles PCI DSS compliance, bank-level fraud detection, cross-border tax, SCA authentication, chargeback management, and webhook reliability at millions of events per second. This took Stripe a decade and hundreds of engineers. Do not rebuild Stripe. Pay for Stripe.

**Regulatory compliance is load-bearing.** Stripe is PCI DSS Level 1 certified. Resend is SOC 2 Type II. Supabase is GDPR compliant with EU data residency. These certifications took years and audits to earn. When you build your own email delivery from scratch, you are not SOC 2 certified. For anything touching payments, EU data rights, or authentication: buy the certified tool.

**The integration surface is large and actively maintained.** Supabase integrates with 40+ auth providers, has a CDN, Realtime engine, edge functions, and a team of engineers pushing updates weekly. The value is not just the technology — it is the ongoing maintenance. Same with Netlify: their global CDN, atomic deploys, and form handling would take months to replicate.

**The tool requires operational expertise to run.** Running your own email delivery (SMTP servers, SPF/DKIM/DMARC, IP reputation management, bounce handling) is a full-time job. Resend solved this. Pay £20/month and focus on the product.

**The failure mode is catastrophic.** If ABLE's custom A/B test engine breaks, a few data points are lost. If ABLE's custom payment processor breaks, artists lose revenue and trust. The blast radius of failure should inform the build-vs-buy decision. Build your own for low-blast-radius tools. Buy for high-blast-radius tools.

---

## The honest decision matrix

A clear rule: **only build something yourself when the build time pays back in less than 3 months vs paying for the alternative.**

Secondary filters (any single one can tip the decision):
- Fan emails or sensitive artist data are involved → build
- The tool's UI needs to match ABLE's design system → build
- The generic tool's feature set is >80% irrelevant to ABLE → build
- The tool requires regulatory certification → buy
- The tool requires ongoing infra maintenance → buy
- The failure mode is payment/auth/data loss → buy

---

## ABLE's current build-vs-buy audit (20 dimensions)

| # | Tool/Decision | Currently | Verdict | Score (build wins = high) |
|---|---|---|---|---|
| 1 | Analytics (Mixpanel) | Not implemented | Build | 9/10 |
| 2 | Fan CRM (Mailchimp) | Partial in admin.html | Build | 10/10 |
| 3 | Email broadcasts (ConvertKit) | Not implemented | Build | 8/10 |
| 4 | Revenue analytics (Baremetrics) | Not implemented | Build | 8/10 |
| 5 | Uptime page (Statuspage) | Not implemented | Build | 9/10 |
| 6 | Onboarding tracker (Intercom) | Not implemented | Build | 8/10 |
| 7 | OG image gen (Cloudinary) | Not implemented | Build | 7/10 |
| 8 | Error monitoring (Sentry) | Not implemented | Build | 7/10 |
| 9 | A/B testing (Optimizely) | Not implemented | Build | 8/10 |
| 10 | Social preview (Canva Pro) | Not implemented | Build | 9/10 |
| 11 | Press kit (presskit.io) | Not implemented | Build | 9/10 |
| 12 | Lead tracker (HubSpot CRM) | Not implemented | Build | 7/10 |
| 13 | Competitor tracker (Crayon) | Not implemented | Build | 10/10 |
| 14 | Link rotation (Linktree Pro) | This IS the product | Build (it's ABLE itself) | 10/10 |
| 15 | Financial dashboard (ProfitWell) | Not implemented | Build | 7/10 |
| 16 | Payment processing (Stripe) | Not implemented | **Buy** | 1/10 |
| 17 | Email delivery (Resend/SendGrid) | Not implemented | **Buy** | 2/10 |
| 18 | Auth (Supabase Auth) | Not implemented | **Buy** | 1/10 |
| 19 | Database (Supabase) | Not implemented | **Buy** | 1/10 |
| 20 | Hosting (Netlify) | Active | **Buy** | 1/10 |

**Summary:** 15 build, 5 buy. The 5 "buy" decisions are load-bearing infrastructure. The 15 "build" decisions are tools ABLE can own completely — at zero recurring cost, with better integration, and with UI that matches the product.

---

## Why this matters more for ABLE than for most startups

Most startups get to a point where they can afford the SaaS stack and the tool cost becomes irrelevant relative to revenue. ABLE's path is different for two reasons:

**1. The fan email list is the core product value.** Artists on ABLE are not using it for generic marketing. The fan list is the relationship. Routing it through Mailchimp is not just a cost question — it is a product philosophy question. ABLE's whole premise is that artists own their relationship directly. Mailchimp in the stack contradicts that premise.

**2. The build-your-own tools compound into competitive moats.** When ABLE's analytics dashboard is purpose-built for music — showing which campaign state (pre-release vs live vs gig) converts fans at the highest rate — that is intelligence no generic analytics tool can provide. When ABLE's press kit generator pulls directly from the artist's profile data, the output is accurate by default in a way a Canva template never is. Each purpose-built tool is better not just because it's cheaper, but because it knows things about the music context that a generic tool cannot.

---

*See also:*
- `docs/systems/build-your-own/SPEC.md` — full spec for all 15 tools
- `docs/systems/build-your-own/PATH-TO-10.md` — build order
- `docs/systems/build-your-own/FINAL-REVIEW.md` — honest scoring of the strategy
