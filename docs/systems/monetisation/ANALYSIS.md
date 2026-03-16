# ABLE — Monetisation: 20-Angle Analysis
**System:** Monetisation
**Date:** 2026-03-16
**Current state score:** See individual ratings below.
**Target:** 10/10

---

## How to read this

Each angle is scored 1–10 for current state. Scores are honest. A 3 means we are genuinely at 3. The purpose is to locate where the gaps are, not to optimise appearance.

---

## Angle 1: Revenue model clarity
**Current score: 7/10**

The model is clear in intent but under-documented in practice. SaaS subscriptions are the primary revenue stream. Commission on transactions is aspirational but not yet live. The vision is coherent: "we only earn when you earn" as a complement to subscription income. What's missing: a written single-page revenue model document that any new developer or investor could read in two minutes and understand exactly what ABLE charges for, when, and why.

**Gap:** No canonical REVENUE_MODEL.md exists. The V6_BUILD_AUTHORITY.md resolves that support packs take 0% from artist revenue. This conflicts with this document's commission strategy for Support Packs. See SPEC.md §2 for resolution.

---

## Angle 2: Transaction revenue (current)
**Current score: 1/10**

All current monetisation of artist-to-fan transactions is external links. Artist drops a Bandcamp link. Fan clicks. Bandcamp captures the purchase. ABLE captures nothing — not the click, not the sale, not the attribution. This is correct positioning for V1 (artists must trust us before we take a cut), but it means 100% of the value created by ABLE's routing is given away.

**Gap:** No Stripe Connect. No split mechanism. No ability to capture commission even if we wanted to.

---

## Angle 3: Subscription revenue
**Current score: 6/10**

Tier structure exists. Prices are set (Free / £9 / £19 / £49). The value proposition per tier is reasonably differentiated. What exists: the pricing table. What doesn't exist: a billing system (no Stripe subscriptions wired), trial mechanics, upgrade-trigger moments that are event-driven, churn prediction, or win-back flows.

**Gap:** Tiers are documented; billing infrastructure is not yet built. V1 is still purely local-first (localStorage) with no payment taking place.

---

## Angle 4: Take rate honesty
**Current score: 9/10**

The philosophy is excellent: ABLE's take rate must be below every major competitor. Spotify: 30% effective. Bandcamp: 15% (was 10% before Epic acquisition). Patreon: 8–12%. ABLE's target: 5% on Support Packs, 8% on Close Circle monthly subscriptions. This is documented in the V6_BUILD_AUTHORITY.md (0% on support packs in v1). The commission rates in Phase 2 must be introduced carefully and with complete transparency.

**Gap:** The 0% in v6 may not survive commercially. The resolution in SPEC.md §2 is honest about this tension.

---

## Angle 5: "Made with ABLE" organic loop
**Current score: 5/10**

Free tier profiles show a quiet footer line: "Made with ABLE." This is documented in V6_BUILD_AUTHORITY.md §12. It is the primary organic acquisition loop — fan lands on artist profile, sees the footer, becomes an artist. This is real and has worked for every link-in-bio tool (Linktree grew almost entirely through this mechanism).

**Gap:** Not yet implemented in able-v7.html in a measurable way. No tracking of "Made with ABLE" click → registration conversion. No A/B testing of copy variants.

---

## Angle 6: Fan-facing Support Packs
**Current score: 3/10**

Support Packs are specced (V6_BUILD_AUTHORITY.md §10, PLATFORM_STRATEGY.md). They allow artists to offer tiered fan support at artist-set prices. The spec is solid: one-time drop, monthly supporter, lifetime fan. Stripe Connect is specified. The fan experience (card lift, payment element bottom sheet, confirmation copy) is detailed.

**Gap:** Not built. No Stripe Connect integration. No Product/Price creation via API. No payout flow. Fully aspirational in current state.

---

## Angle 7: Close Circle subscriptions
**Current score: 2/10**

Close Circle is specced as a monthly fan subscription managed through ABLE. One tier on Artist plan (50 fans max), unlimited tiers on Artist Pro. ABLE takes 8% of Close Circle revenue.

**Gap:** Not built. Spec exists in CLOSE_CIRCLE_SPEC.md. No payment infrastructure. No fan-facing subscription management. No artist-facing subscription dashboard.

---

## Angle 8: Affiliate / referral on external links
**Current score: 0/10**

ABLE currently routes fans to Bandsintown, Spotify, Bandcamp, and other external platforms. No affiliate tracking or commission capture exists. The opportunity exists: Bandsintown has an affiliate program. Bandcamp does not. Spotify does not (for link clicks).

**Gap:** No affiliate link wrapping, no click-to-conversion tracking beyond the initial click event stored in able_clicks. This is genuinely £0 revenue and requires negotiation with platforms to monetise.

---

## Angle 9: Merch commission
**Current score: 0/10**

Merch links route fans directly to Shopify stores, Printful, or other providers. ABLE captures 0%. No merch integration beyond a link.

**Gap:** Phase 2: if ABLE integrates a native merch store (Fourthwall/Printful via API), a 2–3% referral commission becomes structurally possible. Currently no infrastructure.

---

## Angle 10: Email broadcast revenue (indirect)
**Current score: 4/10**

Email broadcasts are an Artist Pro feature (£19/mo). The feature itself is a tier gate — driving upgrades from Artist. The indirect revenue here is subscription uplift, not per-email billing. The value is real: artists who broadcast see higher retention (they're more invested in their fan list), which means lower churn.

**Gap:** Broadcast feature is specced but the upgrade trigger ("you have 67 people waiting to hear your news") is not fully wired in the admin dashboard. The connection between broadcast capability and Artist Pro upsell is not explicitly surfaced in the UI.

---

## Angle 11: Annual vs monthly conversion
**Current score: 3/10**

Annual billing (saving 2 months) is documented. "2 months free" framing is specified. Monthly is the headline price.

**Gap:** Annual billing is entirely unbuilt. No toggle on pricing UI. No Stripe subscription with annual cadence. The 17% revenue concentration effect of annual billing (lower churn, better cash flow) is not captured at all.

---

## Angle 12: Label tier value density
**Current score: 5/10**

Label tier (£49/mo) is specced: 10 artist pages, team access, aggregate analytics, bulk broadcasts, white-label emails. Price is competitive vs competitors (Beacons, Bio.fm Pro teams).

**Gap:** Label tier features mostly inherit from Artist Pro. The genuinely differentiated Label features (aggregate analytics, team access, bulk broadcasts) are not yet built. The per-artist cost for a 10-artist label (£4.90/artist/month) is compelling — this angle is not made explicit in the pricing presentation.

---

## Angle 13: Freelancer revenue
**Current score: 1/10**

Freelancer profiles are a Phase 13 feature. No monetisation is specified for freelancer accounts in current docs. The question of whether freelancers pay a subscription, pay per booking, or are free has not been resolved.

**Gap:** No pricing for freelancer tier. Freelancers may be free (funded by the organic growth they drive for the platform) or paid (funded by their own commercial value). See SPEC.md in freelancer-auth for recommended resolution.

---

## Angle 14: Platform positioning vs competitors
**Current score: 7/10**

ABLE positioning: replaces Linktree Pro (£8/mo) + a basic email tool (£10/mo) = net saving at £9/mo with more capability. This is a strong angle and is documented in V6_BUILD_AUTHORITY.md §9.3.

**Gap:** The competitor comparison is documented but not surfaced in landing.html in a compelling, specific way. "We're cheaper than two tools you're already paying for" needs to be on the landing page with named competitors and real price comparisons.

---

## Angle 15: Trial mechanics
**Current score: 3/10**

Two auto-trial triggers are documented: setting a release date → 14-day Artist trial, activating gig mode → 14-day Artist trial. These are high-intent moments.

**Gap:** Trials are not built. No Stripe trial subscription creation. No trial expiry notification flow. No win-back email if trial doesn't convert. The three highest-converting upgrade moments (100-fan limit, release date, gig mode) are partially identified but not all wired.

---

## Angle 16: Churn prevention
**Current score: 2/10**

No churn prevention infrastructure exists. No usage-based health score. No "you haven't posted a snap card in 6 weeks — your fans miss hearing from you" nudge. No exit survey. No pause-subscription option (which reduces cancellation significantly).

**Gap:** Churn is the silent killer of SaaS. An artist who cancels because they "aren't using it much" often has a dormant fan list that represents real future value. Churn prevention is not specced anywhere.

---

## Angle 17: Transparent fee display
**Current score: 5/10**

The philosophy is documented: fees are shown before any transaction. "We only earn when you earn." Never surprise an artist with a fee they didn't expect.

**Gap:** No UI exists for fee display (no transactions are live). When Stripe Connect is integrated, fee disclosure must appear on: the admin Support Pack setup screen, the artist's earnings dashboard, each transaction record, and the fan payment confirmation.

---

## Angle 18: Revenue diversification
**Current score: 3/10**

Current revenue model is 100% dependent on artist SaaS subscriptions. No transaction revenue, no affiliate income, no API monetisation, no advertising (not appropriate for ABLE's positioning), no data product.

**Gap:** This is appropriate for V1 (focus) but needs a Phase 2 diversification plan. Support Packs + Close Circle = transaction revenue. Label API access = API monetisation. Artist success consulting (high-value service layer) = potential future offering.

---

## Angle 19: Unit economics
**Current score: 2/10**

No unit economics have been documented. CAC (customer acquisition cost), LTV (lifetime value), payback period, and ARPU (average revenue per user) are not calculated anywhere.

**Gap:** Without unit economics, it is impossible to make rational decisions about how much to spend acquiring artists, whether the tier pricing is right, or when the business becomes self-sustaining. See PATH-TO-10.md for the unit economics model.

---

## Angle 20: "We only earn when you earn" copy and philosophy
**Current score: 8/10**

This principle is articulated clearly and is aligned with ABLE's anti-platform positioning. It differentiates ABLE from Spotify (30%), Patreon (8–12%), YouTube (45%), and Bandcamp (15%). The take rate ambition is honest and specific.

**Gap:** The phrase "we only earn when you earn" needs to appear explicitly on: the Support Pack setup flow in admin.html, the landing page pricing section, and the freelancer booking enquiry spec. Currently it lives only in docs.

---

## Summary scorecard

| Angle | Score |
|---|---|
| Revenue model clarity | 7 |
| Transaction revenue (current) | 1 |
| Subscription revenue | 6 |
| Take rate honesty | 9 |
| "Made with ABLE" loop | 5 |
| Fan-facing Support Packs | 3 |
| Close Circle subscriptions | 2 |
| Affiliate / referral | 0 |
| Merch commission | 0 |
| Email broadcast revenue (indirect) | 4 |
| Annual vs monthly conversion | 3 |
| Label tier value density | 5 |
| Freelancer revenue | 1 |
| Platform positioning | 7 |
| Trial mechanics | 3 |
| Churn prevention | 2 |
| Transparent fee display | 5 |
| Revenue diversification | 3 |
| Unit economics | 2 |
| "We only earn when you earn" | 8 |

**Average: 3.8/10**

The average is low because most of the aspirational architecture is unbuilt. That is honest and expected for a V1 product. The philosophy and vision score well. The infrastructure does not yet exist.
