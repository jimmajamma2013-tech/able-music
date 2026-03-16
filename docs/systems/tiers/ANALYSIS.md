# ABLE — Tier System: Analysis
**Date: 2026-03-16 | Status: Pre-billing | Analyst: Claude Code**

---

## Overview

The tier specification is one of the most thoroughly considered commercial documents in the ABLE system. The philosophy is sound, the feature gates are specific and honest, the upgrade trigger moments are psychologically well-designed, and the downgrade/pause behaviour is unusually artist-respecting. The gap is not conceptual — it is entirely operational: zero billing infrastructure exists. This analysis assesses the commercial logic, identifies risks in the pricing model, evaluates the conversion assumptions, and examines where the spec's ambitions may diverge from what's achievable at ABLE's current stage.

---

## 1. Tier Philosophy — Score: 10/10

The foundational principle — "tiers are a natural progression, not a lock-and-key" — is the most important sentence in the spec. It prevents the tier system from being designed as a frustration mechanism and keeps it as a value progression.

**What is exceptional:**
- Free is a complete product, not a demo. This is structurally necessary for the "Made with ABLE" acquisition loop: if Free is crippled, no artist recommends it, and the loop collapses.
- "Gate design rule: always show a blurred preview with one specific value sentence." This is the difference between a gate that converts and one that alienates. Generic "upgrade to access this feature" gates create resentment. Specific "see which release brought each fan in" gates create desire.
- "One upgrade nudge per session, maximum." This is product restraint that most SaaS products fail at. The one-nudge-per-session rule prevents the artist from feeling sold to and maintains the trust that the rest of the product builds.

**The 100-fan cap is the correct Free-tier gate.** It is specific, visible (the progress bar), and reached at exactly the moment when the artist has proof that ABLE works. An artist who has 100 fans has seen the product work. Their upgrade intent is at its highest. The cap hits at the best possible moment for conversion.

---

## 2. Tier Structure Assessment

### Free — Score: 9/10

The Free tier gives artists the campaign state system, fan capture, basic analytics, one snap card, and the Spotify/YouTube embeds. This is a complete product for an artist at the beginning of their ABLE journey.

**What is strong:** Four campaign states on Free is an unusual decision. Many SaaS products would gate this as the key paid feature. Giving it free makes the product's core thesis accessible to every artist, which is necessary for the "Made with ABLE" acquisition loop to work. Visitors to a Free-tier artist's page still see a page that changes — still experience the product's differentiation.

**The risk:** 100-fan cap is correct. But the spec gives Free artists "all four themes and all seven vibes." This is generous and appropriate, but it means an Artist-tier artist's page can look identical to a Free-tier artist's page from a visitor's perspective. The visual differentiation comes from fan count and snap cards, not from the page's appearance. This is correct philosophically but makes the Free-to-Artist upgrade less visually compelling than it could be.

**Missing from spec:** No "export fans as CSV" is listed as an explicit Free-tier feature. The spec mentions it for Artist Pro under "CSV export: always available." This needs clarification: can Free artists export their 100-fan list? The philosophy document says "fan data is the artist's data, always" — which implies yes. The spec should make this explicit to avoid artist confusion and support tickets.

### Artist — Score: 9/10

The Artist tier at £9/month is correctly positioned. Unlimited fans, 5 snap cards, source breakdown, 1 broadcast per month, Bandsintown sync, basic AI features. The fan source breakdown alone ("see which release brought each fan in") is the conversion argument.

**The broadcast limit (1/month, 500 recipients) is the critical pricing psychology question.** For most artists, 1 broadcast per month is sufficient — they don't have enough content to justify more. But for an artist in active campaign mode (release week, tour announcement), 1 broadcast per month is a genuine constraint. The spec handles this correctly by placing unlimited broadcasts on Artist Pro — the artist who needs more broadcasts is the artist who is deep enough in campaign mode to benefit from the full CRM.

**The quarterly Spotify sync on Artist vs. daily Bandsintown sync is a gap.** An artist doing an active release campaign needs their Spotify data fresh more than quarterly. Consider changing Spotify sync to monthly on Artist. Quarterly is long enough to feel broken.

### Artist Pro — Score: 9/10

£19/month for the full CRM, unlimited broadcasts to 2,000 fans, segmentation, lifetime analytics, geo breakdown, and the complete Close Circle system. The value proposition is clear.

**The 2,000 broadcast recipient cap is the spec's own identified risk.** The PATH-TO-10 notes this correctly: artists with large lists (20,000+) would find this constraining. The resolution options are: (a) a per-send add-on above 2,000, (b) a higher tier with unlimited, or (c) ABLE taking the position that artists with 20,000+ email subscribers need enterprise Mailchimp infrastructure, not a £19/month music tool. Option (c) is defensible for now — the target Artist Pro user has 200–2,000 fans, not 20,000. Revisit at scale.

**The read-only API at Artist Pro is correctly placed.** An artist with enough technical sophistication to use the API is also likely to be on Artist Pro for other reasons. The 100 requests/day limit is appropriate.

### Label — Score: 8/10

£49/month for 10 artist sub-accounts is £4.90/artist vs. £19/artist standalone — a compelling value argument for any manager with 5+ clients.

**The honest ceiling (from PATH-TO-10) is important:** Label will fill slowly at launch. Managers are conservative technology adopters. The first Label accounts will be manager/artist combos, not actual labels. This is correct and acceptable.

**What is missing from the Label spec:** No trial period is mentioned. Artist and Artist Pro have a 14-day trial triggered by upgrade moments. Label should have a similar trial — a manager who isn't sure ABLE is right for their roster needs to try it before committing £490/year. A 14-day Label trial would accelerate adoption significantly.

**The account manager promise is a capacity risk.** At launch with 0 Label accounts, a "dedicated account manager" costs nothing. At 100 Label accounts, this is a meaningful support commitment. The spec should define what "dedicated account manager" actually means in practice (a named person, or a priority queue?).

---

## 3. Pricing Psychology Assessment

**Monthly headline, annual as option: correct.** Independent artists on variable income need the flexibility of monthly billing. Making annual the default creates immediate cancellation intent from artists who had a bad month and can't justify paying upfront. "2 months free" is more tangible and converts better than "save 16.7%."

**The pricing ladder is well-designed:**
- Free → Artist: £9/month. The jump is specific and affordable. For a UK independent artist who gigs occasionally, £9/month is less than a pint.
- Artist → Artist Pro: £10/month premium. The delta is small relative to the feature jump (full CRM, unlimited broadcasts). The spec correctly notes the trigger is "CRM curiosity" — the artist who has 200+ fans and wants to know who they are.
- Artist Pro → Label: £30/month premium for 10 artist accounts. The jump is large in absolute terms but small per artist. This requires a specific decision by a specific type of user (manager/label) — it is not an incremental upgrade.

**Annual pricing psychology:** At £90/year for Artist, the artist has paid for 10 months upfront. The commitment signals intent. The spec's rule — "never default to annual; monthly optionality is important" — is correct and unusual in SaaS, where annual-first is the default growth hack. This is a product values choice.

---

## 4. Feature Gate Logic — Score: 9/10

The gold lock CSS spec is production-ready. The amber key icon (not a padlock) is a deliberate framing choice that deserves analysis: a key says "you can open this," a padlock says "you're locked out." The distinction matters in user psychology. Artists respond to access framing, not restriction framing.

**The gate copy table is the strongest part of this spec.** Specific examples:

- "Know your 23 fans in Manchester before the show. Artist Pro." — This is specific to the data ABLE already has. The number is made up for the example but it feels real because it's a plausible real number.
- "Send your record to the 67 people who asked for it. Artist." — "People who asked for it" is better than "your fans" — it reframes the value from ABLE's perspective (converting) to the artist's perspective (fulfilling a request).

**The copy rule "never use the word 'upgrade'"** is exceptional product discipline. Most SaaS products use "upgrade" because it's the obvious word. ABLE avoids it because the word frames the product as a hierarchy to climb rather than as a set of capabilities to access when ready.

---

## 5. Upgrade Trigger Moments — Score: 9/10

The seven triggers are correctly designed around the moments of highest intent.

**Trigger 1 (100-fan limit) is the highest-value trigger.** The artist who has 100 fans has proven ABLE works for them. The progress bar building from fan 1 is the mechanism that makes this trigger land — the artist has been watching the bar fill and mentally preparing for the moment it does.

**Trigger 2 and 3 (release date set, gig mode) sharing the same 14-day trial is correct.** Both represent an artist in preparation mode. The trial auto-creates a Stripe subscription — this is aggressive but appropriate. The 14-day window is enough to experience the value; the artist who doesn't convert after 14 days of a release campaign is unlikely to convert without experiencing it.

**Trigger 7 (CRM curiosity on Artist) is the most technically interesting.** The gate overlay uses city-specific data from the artist's actual fan geo data if available: "You have 14 fans in [city]. Artist Pro shows you who they are." This is the kind of personalised gate that feels less like an upsell and more like a revelation. The artist didn't know they had 14 fans in a specific city until ABLE told them. Now they want to know more.

**Gap: No trigger for the Spotify/Bandsintown sync frequency difference.** An artist who connects Bandsintown and waits months for their Spotify to update quarterly may not understand that daily sync is an Artist Pro feature. A subtle notification in admin: "Your Spotify data was last updated [X days ago]. Artist Pro syncs daily — see your latest releases and stats without waiting." This is a trigger the spec misses.

---

## 6. Conversion Rate Assumptions — Score: 7/10

The spec does not explicitly state conversion rate targets. Based on the PATH-TO-10 and the upgrade trigger design, the implied targets are:

- Free → Artist: 8–12% within 90 days (industry benchmark for freemium music tools)
- Artist → Artist Pro: 20–30% within 6 months (depth-of-use signal)
- Artist/Pro → Label: specific, relationship-driven — not a funnel metric

**The honest assessment:** An 8–12% Free → Artist conversion rate is achievable if:
1. The 100-fan cap is hit within 90 days — which requires the artist to actively promote their page
2. The upgrade trigger fires correctly at fan 95/100
3. The pricing page is compelling and friction-free

Artists who never promote their page will never hit the 100-fan cap and will never feel the upgrade trigger. The conversion rate depends as much on artist activation (are they actually using the product?) as on the gate design.

**What the spec doesn't address:** Conversion from artist sign-up to any paid tier is the primary commercial metric. A 90-day conversion analysis — what percentage of artists who sign up in Month 1 are paying by Day 90 — should be the first metrics report James runs after billing is live.

---

## 7. Churn Risk Assessment

| Tier | Primary churn cause | Churn mitigation in spec |
|---|---|---|
| Artist | "I'm not actively releasing / gigging" | Pause option (1 month, profile stays live) |
| Artist Pro | Broadcast cap (2,000 fans hit ceiling) | Partial — needs per-send add-on option |
| Label | Manager churns one artist from roster | Not addressed — partial account churn |
| Any paid | Month of inactivity / health crisis | Pause option handles this |

**The pause option is the best churn reduction feature in the spec.** An artist who pauses for a month and returns has LTV comparable to one who never paused. An artist who cancels has dramatically lower return LTV. The pause must be in the cancellation flow — not in settings — or it will be missed.

**Health crisis / financial hardship scenario:** Artists are not always in financially stable positions. A musician who loses their day job may cancel the subscription even if they love the product. The spec's pause option addresses one month. A hardship pause (3 months, one per lifetime) would retain artists through difficult periods at negligible revenue cost. Not in the spec; worth adding.

**The "data preserved on downgrade" commitment is the most important churn retention mechanism.** An artist who knows their fan list is preserved when they downgrade is less afraid to leave — but they also have less reason to leave permanently. "Your 340 fans are safe here" is the reason to come back.

---

## 8. Billing Implementation Priority

The PATH-TO-10 correctly identifies the 6-step path from 0 to billing-complete. In order of commercial urgency:

1. **Stripe subscriptions + tier enforcement** — zero revenue without this. No softcoding around it.
2. **Gold lock UI** — visible gates convert browsers to upgraders. Every gated feature is a conversion opportunity currently being missed.
3. **Upgrade trigger moments** — especially the 100-fan cap, which is the highest-intent trigger.
4. **Annual billing + trial management** — adds 16% more revenue per conversion and reduces monthly churn.
5. **Churn prediction / win-back** — valuable but secondary to getting billing live.
6. **Label tier + team access** — last to implement because Label accounts are last to arrive.

**The server-side tier enforcement (FINAL-REVIEW Question 2) is non-negotiable.** A localStorage-only tier check that can be bypassed by editing browser storage is a security failure. Supabase RLS (Row Level Security) policies must enforce the tier on every API call. This requires the Supabase backend to be live before billing is meaningful.

---

## 9. Label Tier Commercial Assessment

The Label tier economics are compelling on paper. But at launch, the addressable market is narrower than the spec suggests.

**Target Label accounts at Year 1:**
- Indie managers with 3–5 artists: 50–100 potential accounts in the UK market
- Small collectives (5–10 artists sharing costs): 20–50 potential accounts
- Actual small independent labels: maybe 10–20 accounts at ABLE's scale

**The Label tier will not materially contribute to MRR until ABLE has 500+ active Artist/Artist Pro accounts.** The reason: Label accounts are sold through artist relationships. A manager signs up for Label because one of their artists is already on ABLE and mentions it. The Artist base is the top of the Label funnel.

**The white-label email sending (custom sending domain) is currently Phase 2.** This is the feature Label accounts will ask for most — managers want fan emails to come from their artists' domains, not from `mail.ablemusic.co`. This needs to be on the shipping roadmap for Label V1, not deferred.

---

## 10. Priority Gaps

| Gap | Severity | Action |
|---|---|---|
| Zero billing infrastructure | Critical | Ship Stripe subscriptions as next major build |
| Free-tier CSV export not explicit | Medium | Clarify in spec: yes, always, this is artist's data |
| Spotify quarterly sync too infrequent on Artist | Medium | Change to monthly sync on Artist |
| Label trial period missing | Medium | Add 14-day Label trial to spec |
| Hardship pause (3-month) missing | Low | Add to spec as edge case |
| Trigger for sync frequency difference missing | Low | Add as upgrade trigger 8 |
| Label white-label email as Phase 2 | Medium | Move to Label V1 scope |
| Broadcast 2,000 cap scaling path | Medium | Add per-send add-on pricing to spec |

**The single most important next action for the tier system:** implement the 100-fan cap enforcement in able-v7.html (Step 0 in PATH-TO-10.md — no billing required, just a localStorage check). This is the one tier gate that must exist before billing ships, because without it, free-tier and paid-tier artists have identical capabilities. The fan cap is what makes the upgrade trigger land.

After the cap: ship Stripe billing. The spec is complete and correct. The delay is purely implementation. Every day without billing is a day without revenue from artists who are ready to pay.

---

## 11. Gold lock CSS implementation status

The gold lock CSS spec exists in SPEC.md §3 and is production-ready. It is not yet implemented in admin.html. Every gated feature currently shows either nothing or a placeholder.

**The gold lock overlay component needs to be built once and reused.** The CSS is spec'd in SPEC.md §3. The copy table is in SPEC.md §3. The one-nudge-per-session rule is in SPEC.md §3. Build the component, then apply it to each gated feature in turn.

**Priority order for gold lock implementation:**
1. Fan source breakdown (Artist gate) — visible on the Fans page, high traffic area
2. Email broadcast (Artist gate) — artists will try this early
3. Fan CRM / campaign breakdown (Artist Pro gate) — highest value, most compelling blurred preview
4. Stats beyond 30 days (Artist gate)
5. Second snap card (Artist gate)

Each gate needs a blurred placeholder that looks real. Using actual numbers from the artist's existing data (e.g., fan count) in the overlay copy makes the gates feel personal rather than generic.

---

## Summary

The tier specification is at 9/10 for design quality. The pricing psychology is correct, the gate copy is specific and honest, the upgrade triggers are well-timed, and the downgrade behaviour is unusually artist-respecting. The operational score is 0/10 because no billing exists. The path from 0 to 10 is the PATH-TO-10 document's 6-step plan — the spec is not holding anything back. Build the billing.
