# ABLE — Monetisation System Spec
**System:** Monetisation
**Version:** 1.0
**Date:** 2026-03-16
**Status:** ACTIVE — primary authority for all monetisation decisions

---

## 0. Principles (read before everything else)

**ABLE is not a marketing tool. It is not a payment intermediary. It is the cleanest connection between artist and fan.**

The monetisation strategy follows directly from this. We do not capture value by being in the way. We capture value by making the connection so good that artists pay for it, and by creating transaction infrastructure that earns a fair, transparent fee that is always below the competition.

### The five core principles

1. **SaaS first** — subscription revenue is the primary and most stable revenue stream. Transaction commission is a differentiator and a secondary revenue stream, not the business model.
2. **We only earn when you earn** — all commission is percentage-based on actual transactions. No setup fees, no minimum commission, no fee if the artist earns nothing.
3. **Always below the competition** — ABLE's take rate must always be below Spotify (30%), Bandcamp (15%), and Patreon (8–12%). Our ceiling is 8% on any transaction type.
4. **Fee before transaction** — the artist sees ABLE's fee before any transaction is enabled. The fan sees any ABLE fee before any payment is made. No surprises. Ever.
5. **The artist's money goes to the artist** — external links (Spotify, Bandcamp, Bandsintown) are never described as ABLE monetisation. They are the artist's revenue streams. ABLE facilitates the click. That is all.

---

## 1. What the artist's external links are (and are not)

**External links are not ABLE monetisation.** They are the artist's revenue channels, displayed on ABLE's platform. When a fan clicks a Spotify link, that is Spotify's user. When a fan buys a Bandcamp download, that is Bandcamp's transaction. ABLE captures the click event for analytics. ABLE earns nothing.

This is intentional positioning:
- **Artist trust** — artists do not feel that ABLE is taking a cut of revenue they weren't expecting to share
- **Regulatory simplicity** — no payment flows means no Stripe, no KYC, no PCI compliance in V1
- **Honest differentiation** — ABLE is not trying to become an app store on top of artists' existing channels

**Never call external links "monetisation" in copy or documentation.** They are "links," "connections," "channels," or "where your music lives."

---

## 2. Revenue phases

### Phase 1 — V1 (current)

**Revenue type:** SaaS subscriptions only
**ABLE revenue per artist:** £0–£49/month depending on tier
**ABLE revenue from transactions:** £0

This is correct and intentional. Artists are in an early trust phase with ABLE. Asking for a commission before we have earned that trust would damage the relationship and position ABLE as extractive. The V6_BUILD_AUTHORITY.md records that support packs in V1 take 0% ABLE commission. This is a strategic decision, not an oversight.

**What exists in Phase 1:**
- Subscription billing via Stripe (subscriptions, not Connect)
- Free / Artist £9 / Artist Pro £19 / Label £49
- Annual billing at 17% discount ("2 months free")
- Auto-trial triggers: release date set → 14-day Artist trial, gig mode activated → 14-day Artist trial
- "Made with ABLE" footer on Free profiles → organic acquisition loop

**What does not exist in Phase 1:**
- Any transaction commission
- Stripe Connect
- Affiliate tracking

---

### Phase 2 — Commission layer (when Stripe Connect is integrated)

**Revenue type:** SaaS + transaction commission
**Expected timing:** After V1 subscription billing is stable and at least 200 paying artists on platform

Commission is introduced as a feature, not a fee increase. The framing is: "You can now accept fan payments directly through your ABLE page. We take 5% so we can keep building this. Stripe charges their standard fee on top of that."

#### 2.1 Support Packs

Artist creates a support tier at a price they set. Fan pays. ABLE facilitates.

| Price point | ABLE take | Stripe fee (UK cards) | Artist receives |
|---|---|---|---|
| £5 | £0.25 | ~£0.27 | ~£4.48 |
| £10 | £0.50 | ~£0.34 | ~£9.16 |
| £20 | £1.00 | ~£0.48 | ~£18.52 |
| £50 | £2.50 | ~£0.90 | ~£46.60 |

**ABLE take rate: 5%**. This is below Patreon (8%), Gumroad (10%), and Bandcamp (15% post-Epic). This is the stated maximum for Support Pack commission.

**Types:**
- One-time drop — tied to a release (£3–£50 range)
- Monthly supporter — ongoing access (£3–£20/month)
- Lifetime fan — one-off (£50–£200)

**Artist tier gates:**
- Free: Support Packs not available
- Artist (£9/mo): 1 price point, 1 pack type
- Artist Pro (£19/mo): multiple price points, all pack types
- Label: inherits Artist Pro

**Stripe Connect architecture:**
- Artist onboards to Stripe Connect (Express) — takes ~3 minutes
- ABLE creates Stripe Product + Price via API on artist's behalf
- Fan pays → Stripe processes → ABLE application fee deducted automatically at split
- Artist receives remainder to their Stripe Express account automatically
- No artist invoicing. No manual reconciliation. Automatic.
- ABLE never holds artist funds. Stripe holds briefly during processing. Artist's money is in their Stripe account.
- ABLE never charges a setup fee or monthly fee for Stripe Connect access. It is included in Artist and Artist Pro tiers.

#### 2.2 Close Circle subscriptions

Close Circle is a fan membership system. Artist creates a tier (e.g. "Inner Circle — £5/month"), fans pay monthly to unlock exclusive content and closeness signals.

| Monthly tier price | ABLE take | Stripe fee | Artist receives |
|---|---|---|---|
| £3/month | £0.24 | ~£0.24 | ~£2.52 |
| £5/month | £0.40 | ~£0.27 | ~£4.33 |
| £10/month | £0.80 | ~£0.34 | ~£8.86 |
| £15/month | £1.20 | ~£0.41 | ~£13.39 |

**ABLE take rate: 8%**. This is the ceiling. Below Patreon's standard rate. Rationale: monthly subscriptions require more infrastructure (subscription management, dunning, failed payments, cancellations) than one-time payments.

**Artist tier gates:**
- Free: not available
- Artist (£9/mo): 1 tier, 50 fans max
- Artist Pro (£19/mo): unlimited tiers, unlimited fans

#### 2.3 Ticket affiliate commission

If ABLE drives a click to a Bandsintown or Dice ticket page that converts to a sale, ABLE may negotiate an affiliate split.

**Target rate:** 0.5–2% of ticket face value
**Mechanism:** Affiliate link wrapping on ticket CTAs (transparent to fan and artist)
**Disclosure:** Noted in ABLE terms of service and admin dashboard
**Dependency:** Requires negotiated affiliate relationships with each ticketing platform. This is a BD task, not an engineering task.

Current status: not live. Revenue from this is low-signal (most tickets are at low value, ABLE drives a portion of clicks, not all convert). Treat as upside, not a revenue line to build business assumptions around.

#### 2.4 Merch commission (platform-integrated only)

If an artist uses an ABLE-native merch integration (Phase 2: Fourthwall, Printful), ABLE takes a 2–3% referral. This only applies to ABLE-managed merch catalogue — not to external Shopify links where ABLE is just a link.

**ABLE take rate: 2–3%**
**Applies to:** ABLE-integrated merch only
**Does not apply to:** external merch store links

---

### Phase 3 — Platform layer (Artist Pro + Label scale)

**Revenue type:** SaaS (mature) + transaction commission + API monetisation

At scale, the SaaS model dominates. Transaction commission adds meaningful secondary revenue. API access unlocks a third stream.

#### 3.1 Email broadcast

Included in Artist Pro at £19/mo. Not billed per-send. The value is the tier upgrade it drives.

Future consideration: if ABLE's email delivery infrastructure scales, there may be value in offering a broadcast-only tier at ~£7/month for artists who only want email — but this fragments the tier structure and should be resisted unless data shows high demand.

#### 3.2 Analytics API

Label tier (£49/mo) includes read-only API access to aggregate analytics across roster. This is a genuine value-add for label A&R teams.

Future: API access as a standalone product (£20/mo) for tools and analytics companies that want to build on ABLE data. Requires sufficient artist base to make the data valuable.

---

## 3. Revenue model projections

These are conservative and honest. They are not pitch-deck numbers.

### V1 — SaaS only

| Artists | Mix assumption | Monthly MRR |
|---|---|---|
| 100 | 60% Free, 30% Artist, 10% Artist Pro | £2,970 |
| 500 | 55% Free, 35% Artist, 10% Artist Pro | £15,200 |
| 1,000 | 50% Free, 35% Artist, 15% Artist Pro | £32,850 |
| 5,000 | 45% Free, 35% Artist, 15% Artist Pro, 5% Label | £175,050 |
| 10,000 | 40% Free, 35% Artist, 18% Artist Pro, 7% Label | £388,500 |

Assumptions: Monthly billing only. No annual discount applied. No churn modelling. These are "what if all these users were paying at current rates" snapshots.

### V2 — SaaS + Support Packs

Estimate: 15% of Artist and Artist Pro users enable Support Packs in their first year. Average monthly gross per artist using Support Packs: £24 (3 fans × average £8 payment).

| Artists with Support Packs | Monthly gross | ABLE commission (5%) |
|---|---|---|
| 100 | £2,400 | £120 |
| 500 | £12,000 | £600 |
| 5,000 | £120,000 | £6,000 |
| 20,000 | £480,000 | £24,000 |

**The commission revenue is meaningful at scale, but it is not the business model.** At 5,000 artists with Support Packs, commission adds £6k/month to what is already £175k/month SaaS. It is a feature differentiator that justifies the tier upgrade more than it generates standalone revenue.

### Close Circle (Phase 2)

Estimate: 8% of Artist Pro users launch a Close Circle. Average monthly subscription value per fan: £5. Average fans per active Close Circle: 18.

| Artist Pro users with Close Circle | Monthly gross | ABLE commission (8%) |
|---|---|---|
| 50 | £4,500 | £360 |
| 200 | £18,000 | £1,440 |
| 1,000 | £90,000 | £7,200 |

Again: supplementary revenue, not the core model.

### The honest picture

At 10,000 artists across all tiers with Phase 2 transaction features live:
- SaaS MRR: ~£388k
- Transaction commission: ~£30–50k/month
- Total: ~£420–440k/month gross
- Less Stripe fees, Supabase, Resend, Netlify, other infra: ~15–20% of revenue
- Net monthly: ~£350–370k

This is a real business. The path there requires disciplined artist acquisition, low churn, and operational efficiency. It does not require a high transaction take rate.

---

## 4. Stripe Connect architecture (technical spec)

### 4.1 Onboarding flow

1. Artist navigates to Support Packs setup in admin.html
2. ABLE presents: "Accept fan payments directly. We take 5% — you keep the rest. Stripe's standard fee (1.4% + 20p for UK cards) applies on top."
3. Artist clicks "Set up payments"
4. ABLE calls Stripe Connect (Express) → account link generated
5. Artist completes Stripe KYC (~3 minutes: email, bank account, identity verification)
6. Artist returns to ABLE dashboard — payments enabled indicator shown
7. ABLE stores `stripe_connect_account_id` in artist's Supabase profile record

### 4.2 Product and Price creation

When artist creates a Support Pack:
```
POST /functions/v1/create-stripe-product
{
  artistHandle: "...",
  packLabel: "Inner Circle",
  price: 1000,  // in pence
  currency: "gbp",
  type: "one_time" | "recurring",
  interval: "month" | null
}
```
Server creates `product` and `price` on the artist's connected Stripe account. Returns `stripe_price_id`. Stored in `able_v3_profile.support.packs[n].stripe_price_id`.

### 4.3 Payment flow

1. Fan taps Support Pack card
2. Card lifts `translateY(-4px)`, accent border appears
3. "Support at Inner Circle — £10" CTA activates
4. Bottom sheet slides up with Stripe Payment Element (embedded, not redirect)
5. Fan enters card details — Stripe handles everything
6. On success: confetti, card glow, checkmark
7. Confirmation copy: "You're supporting [Artist] at Inner Circle. [Pack description]. Thank you." — specific, warm, no marketing language.

### 4.4 Fee architecture

```
Fan pays £10.00
→ Stripe processes: £10.00
→ Stripe fee deducted: ~£0.34 (1.4% + 20p, UK cards)
→ ABLE application fee deducted: £0.50 (5% of £10)
→ Artist receives: £9.16 to their Stripe Express account
→ ABLE receives: £0.50 to ABLE's Stripe account
```

No additional ABLE fees. No monthly fee for using the payment feature (it is included in Artist tier). No minimum payout threshold imposed by ABLE (Stripe has its own thresholds).

### 4.5 Recurring subscription management

For monthly fan subscriptions (Close Circle):
- Stripe Subscription object created on fan's first payment
- Subscription managed entirely via Stripe (cancellation, failed payment retries, dunning)
- ABLE webhook listens for: `invoice.paid`, `customer.subscription.deleted`, `invoice.payment_failed`
- On `invoice.paid`: update fan's Close Circle access in Supabase
- On `subscription.deleted`: revoke access, send ABLE-branded "access ended" email
- On `payment_failed`: send ABLE-branded "payment didn't go through" email to fan (not from artist — this is ABLE infrastructure)

---

## 5. Copy rules for monetisation

These rules apply to every screen, email, and notification that touches money.

**Never say:**
- "Monetise your fans" — say "let people support you directly"
- "Revenue stream" in copy facing artists — say "what you earn"
- "We take [X]%" without context — always show what the artist receives, not just the take
- "Upgrade to accept payments" — say "enable fan support — [setup takes 3 minutes]"
- "Transaction fee" — say "our share" or "ABLE's 5%"

**Always say:**
- "You keep [£X] from every [£Y] payment"
- "We only earn when you earn"
- "No monthly fee for payments — just our 5% when a fan supports you"
- "Your money is in your Stripe account within 2–7 days" (Stripe's standard payout schedule)
- Show the fee as a specific amount, not a percentage, wherever possible (£0.50 not "5%")

**Fee disclosure timing:**
- Before the artist enables Support Packs: full fee breakdown shown
- On each transaction in artist's earnings dashboard: show gross, Stripe fee, ABLE fee, net
- On the fan payment screen: no ABLE branding on the payment page — the artist is the seller, not ABLE
- On artist's Stripe dashboard (separate from ABLE): Stripe will show the ABLE application fee as a separate line item

---

## 6. "Made with ABLE" acquisition loop

**This is the primary V1 organic acquisition mechanism.** Free tier profiles show a quiet footer line: "Made with ABLE." One line. Minimal styling. `var(--color-text-3)` — the lightest text token.

When a fan lands on a profile and sees this:
1. They click
2. They land on able.fm (landing page or artist signup)
3. Some percentage become artists themselves

**Implementation rules:**
- Free tier only. Any paid tier removes it. No exceptions.
- Link goes to `able.fm?ref=[artistHandle]` — tracks which artist's profile drove the acquisition
- Not a banner. Not a logo. One line of text.
- Never present it to the artist as advertising. It is the cost of the free tier — earned through traffic routing.
- Never make it bigger, bolder, or more prominent than the current spec.

**Analytics:**
- Track: "Made with ABLE" clicks (source = `footer_attribution`)
- Track: referral → registration conversion rate
- Track: referral → paid conversion rate (which artists' audiences convert best)
- This data is used to identify high-value artist audiences for targeted acquisition

---

## 7. Freelancer tier monetisation

**Unresolved in V1.** Two options under consideration:

**Option A: Freelancers are free** — Freelancers join at no cost. Their value to ABLE is the credits ecosystem they create, which drives artist acquisition and retention. The discovery flywheel they power is worth more than a subscription fee.

**Option B: Freelancers pay a separate tier** — "Professional" tier at £9/month (same as Artist). Feature gates: unlimited portfolio items, verified credit badge, booking enquiry relay, rate card, analytics on enquiry volume.

**Recommendation: Option A for V1.** The freelancer ecosystem must reach a critical mass before monetising it. Charging freelancers in Phase 1 would slow adoption of the credits system, which would reduce the platform value for artists. Free freelancer profiles with a Premium Freelancer upgrade at Phase 2 is the correct sequencing. Review at 500 active freelancer profiles.

**Phase 2 freelancer monetisation:**
- Booking deposit facilitation (Phase 2): ABLE charges 3% on booking deposits processed through ABLE's Stripe infrastructure. Freelancer sets deposit amount. Client pays. ABLE takes 3%.
- "Pro" freelancer tier (Phase 2): £9/month — unlocks analytics, featured placement in credits discovery, priority booking queue, custom domain slug.

---

## 8. What is out of scope (and why)

**Advertising:** ABLE will not serve advertising. The positioning — "a place for artists to be themselves" — is incompatible with third-party ad placement. Any advertising revenue would be smaller than the trust damage. This is a permanent decision.

**Data sale:** ABLE will not sell artist or fan data to third parties. This is a legal, ethical, and positioning constraint. All data is used only to improve ABLE products and to give artists insight into their own audience. This is also permanent.

**ABLE as a ticketing platform:** ABLE surfaces ticket links and may take affiliate commission on clicks. ABLE does not become a ticketing platform itself. The infrastructure complexity and competition (Eventbrite, Ticketmaster, Dice) makes this inadvisable. The conduit principle applies: facilitate the click to the best ticketing platform, don't become one.

**Tip jars on free tier:** No payment facilitation on Free. The risk of enabling payments for free users is financial abuse (account chargebacks, fraud). All transaction features require at minimum the Artist tier (£9/month).

---

*Authority: this file is the canonical monetisation spec. For tier gate details, see `docs/systems/tiers/SPEC.md`. For Close Circle spec, see `docs/v6/operational/CLOSE_CIRCLE_SPEC.md`. For Stripe integration technical details, see `docs/v6/operational/BACKEND_SCHEMA.md`.*
