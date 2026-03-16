# ABLE Build-Your-Own — Final Review
**Created: 2026-03-16 | Authority: primary**

> An honest scoring of the build-your-own strategy. Where does it hold up? Where are the real risks? Which tools justify the build investment and which are marginal cases?

---

## The one-sentence verdict

For 12 of the 15 tools, the build-your-own case is clear and the payback is fast. For 3 tools (OG Image Generator, A/B Test Engine, Competitor Tracker), the case is marginal — not because they're wrong decisions, but because the build time is better spent on the core product until a larger user base justifies the investment.

---

## The honest rule

> Only build something yourself when the build time pays back in less than 3 months vs paying for the alternative.

For the purposes of this review: James's time is valued at £75/hour (a conservative freelance rate). Claude Code reduces effective build time by approximately 70% — a task that would take a solo developer 10 hours takes James approximately 3 hours of direction and review. The "build time cost" column below reflects the real time cost, not the nominal estimate.

---

## Tool-by-tool scoring

### Tool 1: ABLE Analytics Dashboard (vs Mixpanel $25/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £25 |
| Build time cost | 3 hours = ~£225 effective |
| Payback period | 9 months (pure cost) |
| Integration advantage | Extreme — Mixpanel cannot show campaign-state conversion rates |
| Data privacy advantage | High — no fan behaviour data leaving ABLE's stack |
| Maintenance burden | Low — reads from localStorage/Supabase, no external API |

**Verdict: Strong build case.** The cost payback alone is borderline (9 months). But the integration advantage — campaign-state analytics that Mixpanel simply cannot provide — makes this essential, not optional. This is not a Mixpanel replacement; it is a better tool for a different job.

**Score: 9/10. Build.**

---

### Tool 2: ABLE Artist Health Monitor (vs Baremetrics $50/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £50 |
| Build time cost | 4 hours = ~£300 effective |
| Payback period | 6 months |
| Integration advantage | High — Baremetrics has no concept of "artist hasn't had a page view in 14 days" |
| Data privacy advantage | Medium — Baremetrics only sees Stripe data, not artist behaviour |
| Maintenance burden | Low-medium — Supabase queries, Netlify function, Telegram hook |

**Verdict: Good build case.** 6-month payback is acceptable. The music-specific signals (at-risk artists, fan capture trends, artists near tier upgrade) are worth more than the cost saving. Baremetrics at $50/month is pricing for B2B SaaS metrics — ABLE's needs are narrower and more specific.

**Risk:** If Supabase schema changes, the health monitor queries need updating. Low-frequency risk but worth noting.

**Score: 8/10. Build — but P2, not P0.**

---

### Tool 3: ABLE Fan CRM (vs Mailchimp $35/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £35 (scales to £100+ at volume) |
| Build time cost | 3 hours for completion = ~£225 effective |
| Payback period | 6.5 months (rising payback as audience grows) |
| Integration advantage | Maximum — fan CRM is the core product value |
| Data privacy advantage | Maximum — fan emails should never leave ABLE's stack |
| Maintenance burden | Very low — extends existing admin.html code |

**Verdict: Non-negotiable build.** This is the strongest build case in the entire list. Fan emails in Mailchimp contradicts ABLE's core product promise ("your list, your relationship"). The privacy argument alone justifies the build, independent of cost. The fact that the build is already 40% complete makes it even more obvious.

**Score: 10/10. Build. Highest priority in P1.**

---

### Tool 4: ABLE Email Composer (vs ConvertKit $29/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £29 |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | 5 months |
| Integration advantage | High — fan segments from Tool 3 feed directly into the composer |
| Data privacy advantage | High — email content and fan list never leave ABLE's stack |
| Maintenance burden | Low — Resend API is stable, minimal maintenance |

**Verdict: Strong build case.** The simplicity of ABLE's email composer is a feature, not a limitation. ConvertKit's visual builder encourages artists to produce newsletter-style emails that do not match the direct, personal ABLE voice. Forced plain text is better for the artist-fan relationship. The integration with the Fan CRM (fan segments) is the deciding factor.

**Risk:** Resend API changes could require updates. Low probability; Resend has been stable.

**Score: 8/10. Build.**

---

### Tool 5: ABLE Link Rotator (vs Linktree Pro $9/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £9 (per artist — plus this is the core product) |
| Build time cost | Ongoing |
| Payback period | N/A — this is the product |
| Integration advantage | Maximum — this IS ABLE |
| Data privacy advantage | Maximum |
| Maintenance burden | Ongoing (core product maintenance) |

**Verdict: Not a build-vs-buy decision. This is the product.** Every hour spent on `able-v7.html` is an hour spent on the thing ABLE sells. The framing here is motivational: ABLE is not building a "good enough" Linktree. It is building something that understands music release cycles, fan capture, and campaign state in a way Linktree structurally cannot.

**Score: 10/10. Build (this is the mission).**

---

### Tool 6: ABLE Social Media Preview Generator (vs Canva Pro £13/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £13 |
| Build time cost | 45 minutes = ~£56 effective |
| Payback period | 4 months |
| Integration advantage | High — genre hashtag bank pulls from artist's profile |
| Data privacy advantage | Low — Canva doesn't see sensitive data |
| Maintenance burden | Very low — static HTML, no API calls |

**Verdict: Obvious build.** 45 minutes of build time for a tool with 4-month payback and ongoing daily utility for artists. Canva Pro is for image design. ABLE's tool is for caption writing — a completely different use case. The genre-aware hashtag bank is a genuine advantage that Canva cannot replicate.

**Score: 9/10. Build. Quickest win in the list.**

---

### Tool 7: ABLE OG Image Generator (vs Cloudinary $89/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £89 |
| Build time cost | 3 hours = ~£225 effective |
| Payback period | 2.5 months |
| Integration advantage | High — campaign-state-aware OG cards |
| Data privacy advantage | Low |
| Maintenance burden | Medium — Satori dependency, Netlify function, caching |

**Verdict: Good build case, but not urgent.** The 2.5-month payback is excellent. The campaign-state-aware OG cards are genuinely better than anything Cloudinary produces. The risk is maintenance: Satori is a dependency that could change, and the Netlify function needs to be fast (OG images are fetched on social network crawlers, which time out quickly). This is a P2 build because the payback is fast but the urgency is low before artists are actively sharing at scale.

**Risk:** Vercel's Satori is MIT-licenced but actively maintained by Vercel for their own product — not a stability risk. Netlify function cold-start latency could cause OG images to fail on first share if the function isn't warmed. Add a `Cache-Control: public, max-age=86400` header to mitigate.

**Score: 7/10. Build — P2.**

---

### Tool 8: ABLE Uptime + Health Page (vs Statuspage.io $79/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £79 |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | 2 months |
| Integration advantage | High — custom ABLE service checks, not generic Atlassian branding |
| Data privacy advantage | Low |
| Maintenance burden | Very low — GitHub Action runs independently, static HTML page |

**Verdict: Strongest cost case in the list.** £79/month for Statuspage.io is absurd for what it does. Two hours of build time, static HTML, a GitHub Action, and a JSON file. Payback in 2 months. Maintenance is essentially zero (GitHub Actions run without intervention). This is the clearest build-your-own decision: the complexity of the alternative is entirely artificial.

**Score: 9/10. Build. P0.**

---

### Tool 9: ABLE Lead Tracker (vs HubSpot CRM $45/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £45 |
| Build time cost | 1 hour = ~£75 effective |
| Payback period | 1.7 months |
| Integration advantage | High — Supabase table maps to artist sign-up flow |
| Data privacy advantage | Low |
| Maintenance burden | Very low |

**Verdict: Obvious build.** 1 hour of build time for a tool that pays back in under 2 months. HubSpot CRM's overhead (contact enrichment, deal pipelines, email sequences, meeting scheduling) is irrelevant for ABLE's sales motion. A Supabase table and a 200-line HTML view is the entire spec. The simplicity is the point.

**Score: 9/10. Build. P0.**

---

### Tool 10: ABLE A/B Test Engine (vs Optimizely $40/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £40 |
| Build time cost | 1.5 hours = ~£112 effective |
| Payback period | 3 months |
| Integration advantage | High — URL param + PostHog feature flag is perfectly adequate |
| Data privacy advantage | Low |
| Maintenance burden | Low |

**Verdict: Good build case, marginal urgency.** 3-month payback is at the edge of the rule. The tool itself is genuinely simple: URL param, PostHog event, conversion tracking. The risk is that A/B tests are only statistically valid with sufficient traffic. Before 50 artists with combined meaningful traffic, the test results will be too noisy to trust — making this a P2 tool by traffic constraint, not by build difficulty.

**Score: 7/10. Build — P2, when traffic justifies it.**

---

### Tool 11: ABLE Artist Onboarding Tracker (vs Intercom $39/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £39 |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | 4 months |
| Integration advantage | High — Supabase view knows exactly which onboarding steps each artist has completed |
| Data privacy advantage | Medium — Intercom would see artist onboarding behaviour |
| Maintenance burden | Low-medium — n8n workflow needs monitoring |

**Verdict: Good build case.** The Intercom alternative is priced for a support team using live chat. ABLE's onboarding nudge system is 5 emails triggered by Supabase events — not live chat infrastructure. The Supabase view gives better insight into exactly where artists drop off than any Intercom analytics dashboard. The n8n workflow requires monitoring but is not fragile.

**Risk:** n8n workflows can fail silently. The error logging from Tool 12 should cover this — any n8n failures should log to Supabase.

**Score: 8/10. Build — P1.**

---

### Tool 12: ABLE Error Monitor (vs Sentry $26/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £26 |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | 6 months |
| Integration advantage | Maximum — ABLE-specific context (campaign state, artist slug) in every error |
| Data privacy advantage | High — Sentry would receive stack traces that may include localStorage data |
| Maintenance burden | Low |

**Verdict: Build, and build first.** The cost payback is the weakest of the list (6 months). But the integration advantage is irreplaceable: a Sentry error report says "TypeError: Cannot read property 'stateOverride' of null at line 247". ABLE's error report says "TypeError: Cannot read property 'stateOverride' of null — page: able-v7.html, artist: maya-solis, campaign_state: pre-release, source: ig". That context cuts debugging time from 30 minutes to 2 minutes. Worth 6 months of Sentry fees, by any measure.

**Score: 9/10. Build. P0 — first in the build queue.**

---

### Tool 13: ABLE Press Kit Generator (vs presskit.io $15/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £15 |
| Build time cost | 1 hour = ~£75 effective |
| Payback period | 5 months |
| Integration advantage | High — pulls data directly from artist's existing profile |
| Data privacy advantage | Low |
| Maintenance burden | Very low |

**Verdict: Clear build.** 1 hour of build time. The press kit generator is differentiated not by cost but by accuracy: the artist's bio, artwork, stats, and contact info are already correct in ABLE — no data entry needed. That is a better product outcome than presskit.io, which requires artists to enter their information again in a separate tool.

**Score: 9/10. Build — P2.**

---

### Tool 14: ABLE Competitor Tracker (vs Crayon/manual monitoring)

| Factor | Assessment |
|---|---|
| Monthly saving | N/A (Crayon is enterprise-priced, ABLE won't pay for it) — saves time vs manual checking |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | Measured in time saved, not money. Saves 30 min/week of manual checking = £150/month of time at £75/hr |
| Integration advantage | N/A |
| Data privacy advantage | N/A |
| Maintenance burden | Low — n8n workflow, weekly trigger |

**Verdict: Build for time saving, not cost.** The cost comparison is not against Crayon — it's against manual weekly checking. Checking 5 competitor homepages weekly takes 30 minutes. At £75/hour that is £150/month of James's time on a low-value task. The n8n workflow automates it entirely. Worth building once you have n8n set up (which is needed for other tools anyway).

**Risk:** Websites sometimes change layout in ways that break diff detection (A/B testing their own site, personalisation). Hash-based detection will generate false positives occasionally. The Telegram message should say "possible change — verify manually" not "confirmed change".

**Score: 8/10. Build — P2, once n8n is live.**

---

### Tool 15: ABLE Financial Dashboard (vs Baremetrics $50/month)

| Factor | Assessment |
|---|---|
| Monthly saving | £50 |
| Build time cost | 2 hours = ~£150 effective |
| Payback period | 3 months |
| Integration advantage | Medium — Stripe API is the same data source Baremetrics uses |
| Data privacy advantage | High — Stripe data stays in ABLE's stack |
| Maintenance burden | Low — Stripe API is extremely stable |

**Verdict: Build.** 3-month payback. The tool is literally 3 Stripe API calls and a chart. Baremetrics adds cohort analysis and LTV modelling on top — neither is urgent at early stage. The Netlify function keeps the Stripe secret key server-side (the correct approach). Worth building as soon as Stripe is integrated, which is a P2 dependency anyway.

**Score: 8/10. Build — P2, after Stripe integration.**

---

## Aggregate scoring table

| # | Tool | Score | Phase | Monthly saving | Build time |
|---|---|---|---|---|---|
| 1 | Analytics Dashboard | 9/10 | P1 | £25 | 3h |
| 2 | Artist Health Monitor | 8/10 | P2 | £50 | 4h |
| 3 | Fan CRM | 10/10 | P1 | £35–100 | 3h |
| 4 | Email Composer | 8/10 | P1 | £29 | 2h |
| 5 | Link Rotator | 10/10 | P0 (the product) | N/A | Ongoing |
| 6 | Social Preview Generator | 9/10 | P1 | £13 | 45min |
| 7 | OG Image Generator | 7/10 | P2 | £89 | 3h |
| 8 | Uptime + Health Page | 9/10 | P0 | £79 | 2h |
| 9 | Lead Tracker | 9/10 | P0 | £45 | 1h |
| 10 | A/B Test Engine | 7/10 | P2 | £40 | 1.5h |
| 11 | Onboarding Tracker | 8/10 | P1 | £39 | 2h |
| 12 | Error Monitor | 9/10 | P0 | £26 | 2h |
| 13 | Press Kit Generator | 9/10 | P2 | £15 | 1h |
| 14 | Competitor Tracker | 8/10 | P2 | time savings | 2h |
| 15 | Financial Dashboard | 8/10 | P2 | £50 | 2h |
| **Total** | | **8.7/10 avg** | | **~£535/month** | **~30h** |

---

## The real risks

### Risk 1: Maintenance creep
The most real risk in the entire strategy. Every tool built is a tool that needs maintaining. When Supabase changes an API, the health monitor breaks. When Resend changes their batch send endpoint, the email composer breaks. When n8n updates its HTTP module, the competitor tracker breaks.

**Mitigation:** Each tool should be built as simple as possible — no unnecessary abstraction, no dependencies beyond what the spec requires. The simpler the tool, the less it breaks. Tools 6, 8, 9, 13 are one-file HTML pages with no external state — they will not break. Tools 2, 11, 14 use n8n and Supabase — they need monitoring.

**The honest rule:** Never build a tool unless you will maintain it. A broken internal tool is worse than no tool — it creates confusion about what state the system is in. If a tool stops being maintained, take it offline or delete it. Do not let it decay in place.

---

### Risk 2: Feature creep in the tools themselves
Each tool's 10/10 spec is tempting. The press kit generator at 10/10 has Puppeteer, password protection, social proof sections, and view tracking. The V1 spec is one Netlify function and a `window.print()` CSS.

**Mitigation:** The PATH-TO-10 build sequence is the authority. Build the MVP. Ship it. Use it. Add the 10/10 features only when the MVP is demonstrably insufficient for the actual use case. Most of the time, the MVP will be sufficient indefinitely.

---

### Risk 3: Build-your-own becomes a distraction from the product
The 15 tools above could absorb 30 hours of development time. That is 30 hours not spent on `able-v7.html`, `admin.html`, `start.html`, or `landing.html`. Before 10 artists are paying for ABLE, none of these tools are more important than the core product.

**Mitigation:** The P0 tools (Error Monitor, Uptime Page, Lead Tracker) take 5 hours and directly support the launch. Everything else waits until after the first 10 artists are onboarded. The build-your-own strategy is a second-phase efficiency play, not a pre-launch priority.

---

### Risk 4: The economic case is optimistic
The "£535/month in SaaS costs replaced" figure assumes ABLE would have paid for all 15 tools simultaneously. In practice, some of these tools would not be purchased until the platform has scale. The true saving at early stage is closer to £150–200/month (Error Monitor substitute, Fan CRM substitute, Lead Tracker substitute, Uptime Page substitute).

**Mitigation:** This is the honest version. The strategic argument does not depend on the headline saving — it depends on the integration advantage and data privacy benefits, which are real regardless of cost comparison.

---

## Final verdict

The build-your-own strategy is correct for ABLE. The reasons are, in order of importance:

1. **Fan emails should not be in Mailchimp.** Full stop. This is a product philosophy decision.
2. **Music-specific analytics cannot be bought.** No generic tool knows about campaign states and release cycles.
3. **The economics are sound.** 30 hours of Claude Code-assisted build time replaces £535/month of SaaS spend within a year.
4. **Simple tools don't break.** A single HTML file reading from localStorage has no operational risk.

The strategy fails if: tools are over-engineered, maintenance is neglected, or build-your-own time displaces core product development. Guard against all three by building the simplest version first, monitoring what breaks, and remembering that the product ships before any of these tools are started.

---

*See also:*
- `docs/systems/build-your-own/ANALYSIS.md` — the case for build vs buy
- `docs/systems/build-your-own/SPEC.md` — full specs for all 15 tools
- `docs/systems/build-your-own/PATH-TO-10.md` — build order
