# Tools and APIs — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is infrastructure so well-assembled that a new developer reads the schema, runs the setup, and ships a working feature before lunch — without asking a single question.

---

## Moment 1: The Supabase Schema That Documents the Product

**What it is:** The Supabase `profiles` table has column comments on every non-obvious field. Not documentation comments — product comments. `state_override` has a comment that reads: "One of: profile, pre-release, live, gig. Null means auto-computed from release_date. See campaign state machine spec." `accent_color` has: "Artist-chosen hex. Runs through every button and highlight on their page. This is identity." A developer who opens the Supabase table editor and reads the column sidebar understands what ABLE is as a product — not just what the field stores.

**Why it's 20/10:** Schema comments are almost always "stores the user's email address" — they restate the field name. The 20/10 version is comments that explain why the field exists and what its constraints mean. A developer who understands the product from the schema writes better code than one who understands the schema from the code. The schema is the source of truth. Make it also be the source of understanding.

**Exact implementation:**

In the Supabase SQL editor, run column comments after table creation. Template:

```sql
-- profiles table column comments
COMMENT ON COLUMN profiles.state_override IS
  'One of: profile, pre-release, live, gig. NULL = auto-computed from release_date.
   See docs/systems/data-architecture/SPEC.md §Campaign State Machine.
   Never write "active" or "inactive" here — those are not valid states.';

COMMENT ON COLUMN profiles.accent_color IS
  'Artist-chosen hex code, e.g. #e05242. Runs through every button, highlight, and glow
   on their public profile page (able-v7.html). This is the artist''s identity in one
   variable. Default: #e05242 (ABLE red). Do not normalise to lowercase — store as entered.';

COMMENT ON COLUMN profiles.tier IS
  'One of: free, artist, artist-pro, label. Must match able_tier localStorage key.
   Default: free. Updated by Stripe webhook on subscription events.
   See docs/systems/tiers/SPEC.md for full feature matrix per tier.';

COMMENT ON COLUMN fans.source IS
  'Where the fan signed up. One of: direct, instagram, tiktok, youtube, qr, email, other.
   Populated from UTM parameter utm_source on the artist''s profile URL.
   NULL = source unknown (pre-UTM era fans or direct bookmark).';

COMMENT ON COLUMN fans.artist_id IS
  'FK → profiles.id. This fan belongs to this artist.
   Artist owns this relationship — not ABLE. Fan data must be deletable by artist request.
   See GDPR deletion flow: docs/systems/legal-compliance/SPEC.md §Fan Deletion.';
```

This takes 2 hours to write comprehensively across all tables. It pays back on every new developer or AI agent that ever touches the schema.

---

## Moment 2: The Stripe Webhook That Never Drops

**What it is:** The Netlify function handling Stripe webhooks has three properties that make it robust beyond what most implementations achieve: (1) it logs every event to a Supabase `stripe_events` table before attempting to process it, so a failed processing attempt can always be replayed; (2) it uses Stripe's event idempotency — if the same event ID arrives twice (Stripe retries on 5xx), the second attempt is a no-op; (3) it sends a Telegram alert to James for any event that lands in an unexpected state, so no webhook failure is silent.

**Why it's 20/10:** The standard Stripe webhook implementation processes and returns 200 — if the processing fails midway, the event is lost. The 20/10 version treats the event log as the source of truth, not the function execution. An artist who upgrades gets their tier updated within 5 seconds, every time, with no exceptions and no manual intervention. A webhook that has failed twice in the last 90 days means two artists had a broken experience. The event log means you know about it before they do.

**Exact implementation:**

```javascript
// netlify/functions/stripe-webhook.js
exports.handler = async (event) => {
  const sig  = event.headers['stripe-signature']
  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return { statusCode: 400, body: `Webhook error: ${err.message}` }
  }

  // Step 1: Log before processing (idempotent insert — ignore duplicate event IDs)
  const { error: logError } = await supabase
    .from('stripe_events')
    .upsert({
      id:           stripeEvent.id,
      type:         stripeEvent.type,
      raw:          stripeEvent,
      processed:    false,
      received_at:  new Date().toISOString(),
    }, { onConflict: 'id', ignoreDuplicates: true })

  if (logError) {
    // If we can't log, still return 200 to prevent Stripe retry storm
    // But alert James immediately
    await sendTelegramAlert(`[ABLE] Stripe event log failed: ${stripeEvent.id} (${stripeEvent.type})`)
    return { statusCode: 200, body: 'Logged with warning' }
  }

  // Step 2: Process
  let processingError = null
  try {
    await processStripeEvent(stripeEvent)
  } catch (err) {
    processingError = err
    await sendTelegramAlert(
      `[ABLE] Stripe processing failed: ${stripeEvent.id} (${stripeEvent.type})\n${err.message}`
    )
  }

  // Step 3: Mark processed (even if failed — so replay is deliberate, not accidental)
  await supabase
    .from('stripe_events')
    .update({
      processed:     !processingError,
      processed_at:  new Date().toISOString(),
      error:         processingError?.message || null,
    })
    .eq('id', stripeEvent.id)

  return { statusCode: 200, body: 'OK' }
}
```

`stripe_events` table schema: `id text PRIMARY KEY` (Stripe event ID — the natural idempotency key), `type text`, `raw jsonb`, `processed boolean DEFAULT false`, `processed_at timestamptz`, `error text`, `received_at timestamptz DEFAULT now()`.

Any unprocessed events older than 24 hours trigger an n8n scheduled alert: "N Stripe events unprocessed. Review stripe_events table."

---

## Moment 3: The PostHog Dashboard That Tells the Story in Two Minutes

**What it is:** The PostHog dashboard has exactly four panels, in order: (1) Funnel: landing.html → start.html completion → first fan sign-up → first paid subscription — this one view shows where artists drop off; (2) Fan capture rate: new fans per day across all artist pages — this is the platform's health metric; (3) Feature usage: which sections of admin.html are opened most — this is the product roadmap in data form; (4) Revenue funnel: Free → Artist trial → Artist paid — conversion rate at each step.

No bounce rate. No session duration. No heatmaps. No demographics. Four panels. Two minutes to read.

**Why it's 20/10:** Most analytics dashboards accumulate panels until they are unreadable. The 20/10 version has strong opinions about what matters and omits everything else. James should be able to open PostHog on his phone between artist conversations and understand what is happening before his coffee gets cold. If a panel doesn't change what he does that week, it has no place in the dashboard. The discipline of removing panels is harder than adding them and worth more.

**Exact implementation:**

PostHog custom dashboard setup — four insight definitions:

```
Panel 1 — Onboarding Funnel
Type: Funnel
Steps:
  1. $pageview where $current_url contains 'landing.html'
  2. $pageview where $current_url contains 'start.html'
  3. Custom event: wizard_completed
  4. Custom event: fan_signup_received (any artist page)
  5. Custom event: subscription_started
Breakdown: none
Date range: Last 30 days

Panel 2 — Fan Capture Rate
Type: Trend
Event: fan_signup_received
Aggregation: Total count per day
Date range: Last 30 days
Display: Line chart

Panel 3 — Admin Feature Adoption
Type: Bar chart
Events (each as a separate series):
  - admin_fans_opened
  - admin_analytics_opened
  - admin_campaign_hq_opened
  - admin_broadcasts_opened
  - admin_snap_cards_opened
Aggregation: Unique users per week
Date range: Last 4 weeks

Panel 4 — Revenue Funnel
Type: Funnel
Steps:
  1. account_created (any tier)
  2. subscription_trial_started
  3. subscription_paid_first_charge
Date range: Last 90 days
```

Custom events fired from `able-v7.html` and `admin.html`:
- `fan_signup_received` — fired on every fan form submission (with `artistId` property)
- `wizard_completed` — fired on the done screen render in `start.html`
- `admin_[section]_opened` — fired when each admin section tab is first rendered in a session
- `subscription_trial_started` / `subscription_paid_first_charge` — fired by the Stripe webhook Netlify function, recorded via PostHog server-side API

---

## The 20/10 Test

You know it crossed from excellent to extraordinary when a developer who has never seen ABLE reads the Supabase schema, understands the product, sets up the local environment in 20 minutes, and ships their first feature without asking a single question — because the schema told them what it needed to.
