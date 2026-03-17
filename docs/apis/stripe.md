# ABLE — Stripe Integration Spec
**Created: 2026-03-16 | Covers: Close Circle payments + ABLE subscription billing**

> Stripe is not integrated yet. This spec defines the two use cases, the recommended implementation path, and the decisions that need to be made before building. A developer reading this file can implement both flows end-to-end.

---

## Two separate use cases

### Use case 1: Close Circle — fan pays artist directly

A fan pays an artist for access to their Close Circle (exclusive content tier). The money goes to the artist. ABLE takes 0%. Stripe takes their standard fee (1.5% + 20p for UK cards, or 2.9% + 30¢ for US).

This is not a subscription — it is a one-time or recurring payment from a fan to a specific artist, mediated by ABLE's platform.

### Use case 2: ABLE subscriptions — artist pays ABLE

Artists pay ABLE for access to paid tiers (Artist £9/mo, Artist Pro £19/mo, Label £49/mo). Standard SaaS subscription billing.

These are independent. They use different Stripe products (Payment Intents vs Subscriptions) and different recipient accounts.

---

## Auth

- **Publishable key** (`pk_live_...`): safe to include in client-side HTML. Used only by `Stripe.js` to mount the payment form — card data never touches ABLE's servers.
- **Secret key** (`sk_live_...`): Netlify function only. Never in HTML files. Never in `git`.
- **Webhook secret** (`whsec_...`): used to verify that webhook POST bodies genuinely came from Stripe. Never in HTML files.

---

## Use case 1: Close Circle payment flow

```
1. Fan taps "Join Close Circle" on artist's profile (able-v7.html)
2. Client loads Stripe.js: <script src="https://js.stripe.com/v3/"></script>
3. Client calls Netlify function: POST /.netlify/functions/create-payment-intent
   Body: { artistId, tierId, fanEmail }
4. Function creates Stripe Payment Intent (server-side)
   → stripe.paymentIntents.create({ amount, currency: 'gbp', metadata: { artistId } })
5. Function returns { clientSecret } to client
6. Client mounts Stripe's Card Element with clientSecret — fan enters card details
7. Fan taps "Pay" → Stripe handles tokenisation; no card data reaches ABLE
8. Stripe webhook fires payment_intent.succeeded → POST /.netlify/functions/stripe-webhook
9. Webhook handler verifies signature, then:
   → Updates fan record in Supabase: tier = 'supporter'
   → Triggers fan confirmation email (optional — Phase 2)
10. Artist receives payout via Stripe
```

---

## Use case 2: ABLE subscription billing flow

```
1. Artist taps "Upgrade" in admin.html
2. Client calls Netlify function: POST /.netlify/functions/create-checkout-session
   Body: { artistId, priceId } (priceId = Stripe Price object for the chosen tier)
3. Function creates Stripe Checkout session (server-side):
   → stripe.checkout.sessions.create({ mode: 'subscription', priceId, ... })
4. Function returns { sessionUrl } — redirect to Stripe-hosted checkout page
5. Artist completes payment on Stripe's page
6. Stripe redirects artist back to admin.html?checkout=success
7. Stripe webhook fires customer.subscription.created
8. Webhook handler verifies signature, then:
   → Updates profile.tier in Supabase to match the purchased tier
9. On subscription renewal: Stripe handles recurring charge automatically
10. Webhook fires customer.subscription.deleted on cancellation:
    → Webhook handler downgrades profile.tier to 'free' in Supabase
```

---

## Webhook events to handle

These are the only Stripe webhook events ABLE needs to listen to. Register them in the Stripe Dashboard → Developers → Webhooks.

| Event | Handler action |
|---|---|
| `payment_intent.succeeded` | Mark fan as supporter in Supabase (`fans` table, `tier` column) |
| `payment_intent.payment_failed` | Log failure; optionally notify fan via email |
| `customer.subscription.created` | Set artist tier in Supabase `profiles.tier` to match purchased plan |
| `customer.subscription.updated` | Re-sync tier in case of plan change |
| `customer.subscription.deleted` | Downgrade `profiles.tier` to `'free'` in Supabase |
| `invoice.payment_failed` | Email artist warning: "Your ABLE subscription payment failed." |

**Webhook verification (mandatory):**
```javascript
const sig = event.headers['stripe-signature'];
const webhookEvent = stripe.webhooks.constructEvent(event.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
// If this throws, reject the request — it is not from Stripe
```

---

## Stripe Connect vs direct charge: key V1 decision

For Close Circle payments, ABLE needs to decide how the money reaches the artist.

**Option A: Direct charge to ABLE (recommended for V1)**
- Fan pays ABLE's Stripe account
- ABLE transfers to artist weekly via Stripe Payouts
- ABLE's account is the merchant of record
- Simpler setup (artists just give ABLE their bank details, or use Stripe Express)
- Regulatory note: ABLE is temporarily holding money on behalf of artists — this may require FCA payment institution registration in the UK if volumes grow

**Option B: Stripe Connect (recommended for V2)**
- Artists connect their own Stripe account to ABLE via Stripe Connect Onboarding
- Fan pays directly into the artist's Stripe account
- ABLE never holds money — platform fee is charged as a Stripe application fee
- More complex setup (artist must complete Stripe KYC)
- Cleaner legally: ABLE is not a payment intermediary

**V1 decision: use Direct charge.** Switch to Stripe Connect in V2 once the product is validated.

---

## Price IDs (create these in Stripe Dashboard before writing code)

| Tier | Monthly price | Stripe Price ID | Notes |
|---|---|---|---|
| Artist | £9/mo | `price_artist_gbp_monthly` | Create in Stripe Dashboard |
| Artist Pro | £19/mo | `price_pro_gbp_monthly` | Create in Stripe Dashboard |
| Label | £49/mo | `price_label_gbp_monthly` | Create in Stripe Dashboard |

---

## Required environment variables

```
STRIPE_PUBLISHABLE_KEY   → Stripe Dashboard → Developers → API Keys (safe in HTML)
STRIPE_SECRET_KEY        → Stripe Dashboard → Developers → API Keys (Netlify env only)
STRIPE_WEBHOOK_SECRET    → Stripe Dashboard → Developers → Webhooks → Your endpoint → Signing secret
```

---

## Current score and path to complete

**Score: 0/10 → 8/10**

V1 (no Stripe at all):
- Close Circle is specced in the UI but the payment flow is not wired
- Subscription billing shows prices but has no checkout flow

V2 — integrate subscription billing first:
1. Create Stripe account for ABLE
2. Create Product + Price objects for Artist/Pro/Label tiers in Stripe Dashboard
3. Build `create-checkout-session.js` Netlify function
4. Wire upgrade buttons in admin.html to call the function and redirect to Stripe checkout
5. Build `stripe-webhook.js` handler for subscription events
6. Set `profiles.tier` in Supabase from webhook handler

V3 — integrate Close Circle:
1. Build `create-payment-intent.js` Netlify function
2. Add `Stripe.js` and Card Element to able-v7.html Close Circle section
3. Handle `payment_intent.succeeded` in webhook handler → update fan tier in Supabase
4. In V2: migrate to Stripe Connect for direct artist payouts
