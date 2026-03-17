# Free Stack — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the stack that James can hand to a technical advisor and they say "I would have chosen exactly these tools" — and then six months pass without a single unplanned cost, a single painful migration, or a single vendor lock-in moment.

---

## Moment 1: The Zero-Downtime Tool Migration

**What it is:** The Resend → Buttondown transition — or any equivalent free-tier-to-next-tier tool swap — completes with zero disruption to artist fan lists, zero failed emails, and zero changes visible to any artist or fan.

**Why it's 20/10:** Every founder has a story about a tool migration that broke something. A GDPR deletion request arriving during a Mailchimp → Klaviyo migration. A fan confirmation email that silently stopped sending because of a Resend API key rotation. The 20/10 version of this stack is one where the migration path is specified before the migration is needed — written down, tested in staging, and ready to execute when the trigger condition is hit (daily sends consistently approaching 100).

**Exact implementation:**

The Resend → Buttondown migration runbook. Write this now. Execute it when the time comes.

```markdown
## Email Migration Runbook — Resend (transactional) → Resend + Buttondown (broadcasts)

### Trigger condition
Daily fan confirmation sends consistently above 80/day for 7 consecutive days.

### What changes
- Transactional emails (fan confirmations, magic links): remain on Resend
- Broadcast emails (artist newsletters to fan lists): move to Buttondown
- No change to ABLE codebase — only the Netlify Function that sends broadcast emails changes

### Migration steps (estimated 2 hours, zero downtime)

1. Create Buttondown account at buttondown.email
2. Create one Buttondown list per artist (use artist slug as list identifier)
3. Import artist fan lists from Supabase — CSV export per artist
4. Verify subscriber counts match between Supabase and Buttondown before proceeding
5. Update `netlify/functions/send-broadcast.js` to call Buttondown API instead of Resend for
   broadcast-type sends:
   ```js
   // Before: Resend bulk send
   // After:
   const response = await fetch('https://api.buttondown.email/v1/emails', {
     method: 'POST',
     headers: { Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}` },
     body: JSON.stringify({ subject, body, included_tags: [artistSlug] })
   });
   ```
6. Send test broadcast to james@able.fm from one artist's list
7. Verify test email arrives, unsubscribe link works, list updates correctly in Buttondown
8. Deploy updated function
9. Monitor for 48 hours: check Sentry for errors on broadcast sends

### Rollback procedure
If step 8 produces errors: revert `send-broadcast.js` to Resend version (git revert).
Fan lists are unchanged — Supabase is the source of truth.
No artist knows anything happened.

### Post-migration
Remove Buttondown import step from this runbook — Buttondown now receives new subscribers
via Netlify Function webhook on fan sign-up, same as Resend did.
```

The key insight: the runbook exists before the migration is needed. The migration is never urgent. It is never done under pressure. The vendor transition is boring — which is exactly right.

---

## Moment 2: The Supabase Dashboard as Investor-Grade Data

**What it is:** A single PostHog dashboard view — built from the free-tier events already being captured — that shows every metric an early investor would ask for: MAU, fan sign-up rate, activation rate (artist goes live within 48 hours of sign-up), retention (artist logs into admin.html week 2+), and "Made with ABLE" conversion rate.

**Why it's 20/10:** An investor meeting where James pulls up a PostHog dashboard and says "here are the 6 metrics I track" is a different conversation from "I have some stats in a spreadsheet." The 20/10 quality is not that the metrics are impressive — they might not be, at the stage the meeting happens. The quality is that James is tracking exactly the right metrics, has been tracking them since day one, and can show a trend line, not a snapshot. That demonstrates product discipline, not just product.

**Exact implementation:**

PostHog dashboard spec — create at `eu.posthog.com` once PostHog is live.

Dashboard name: "ABLE — 6 Core Metrics"

| Panel name | Event / query | Why it's here |
|---|---|---|
| Monthly Active Artists | Unique `distinct_id` on `admin_open` event in last 30 days | The MAU number investors ask for |
| Fan sign-ups (7-day rolling) | Count of `fan_signup` events, rolling 7-day window | Leading indicator of artist page traffic |
| Artist activation rate | % of `artist_signup` events followed by `fan_signup` within 48h | Proves onboarding works |
| Week 2 retention | % of artists who have `admin_open` in week 1 AND week 2 | The retention signal that matters most at early stage |
| "Made with ABLE" conversion | `page_view` events where `utm_source=able-footer` → `artist_signup` | The PLG loop made visible |
| Paid upgrade rate | `upgrade_to_paid` event count / `artist_signup` count (last 30 days) | The commercial signal |

PostHog query for the activation rate funnel:
```javascript
// In PostHog's Funnel query builder:
// Step 1: event = 'artist_signup'
// Step 2: event = 'fan_signup', within 48 hours of step 1
// Conversion window: 48 hours
// Group by: nothing (all artists)
```

The dashboard is free to build, free to maintain, and produces the exact data an investor would pay Mixpanel £40/month to get. The 20/10 moment is when an investor asks "can I see retention?" and James answers by sharing a URL.

---

## Moment 3: The Stack Audit That Confirms £0

**What it is:** A 15-minute quarterly audit — a script that checks every tool in the free stack against its current usage, confirms James is within free-tier limits, and surfaces the one tool closest to its upgrade trigger.

**Why it's 20/10:** The enemy of a free stack is gradual drift. A tool's free tier quietly becomes insufficient — 97 out of 100 Resend emails per day, Supabase at 460MB of 500MB — and the first warning is a failed send or a paused project. The 20/10 version of this stack is one where no limit is ever hit unexpectedly. The audit runs quarterly. It takes 15 minutes. James knows exactly where he stands.

**Exact implementation:**

`docs/systems/free-stack/AUDIT-TEMPLATE.md` — copy and complete quarterly.

```markdown
## Free Stack Quarterly Audit — [DATE]

### Resend (100 emails/day, 3,000/month)
- Emails sent today: [check Resend dashboard]
- Emails sent this month: [check Resend dashboard]
- 7-day peak: [highest single day in last 7 days]
- Upgrade trigger: "If daily sends approach 80 for 3 consecutive days"
- Status: [ ] Below trigger / [ ] Near trigger — act within 2 weeks

### Supabase (500MB database, 2GB storage, 50k MAU)
- Database size: [run: SELECT pg_size_pretty(pg_database_size(current_database()));]
- Storage used: [check Supabase storage dashboard]
- MAU: [check Supabase auth dashboard]
- Upgrade trigger: "Database > 400MB OR storage > 1.5GB OR MAU > 40,000"
- Status: [ ] Below trigger / [ ] Near trigger

### Netlify (100GB bandwidth/month, 125k function invocations/month)
- Bandwidth this month: [check Netlify dashboard → Usage]
- Function invocations: [check Netlify dashboard → Functions]
- Upgrade trigger: "Bandwidth > 80GB/month OR functions > 100k/month"
- Status: [ ] Below trigger / [ ] Near trigger

### PostHog (1M events/month)
- Events this month: [check PostHog → Settings → Usage]
- Upgrade trigger: "Events > 800k/month"
- Status: [ ] Below trigger / [ ] Near trigger

### Total monthly cost this quarter: £[X]
### Nearest upgrade trigger: [tool name] at [current/limit]
### Projected month when trigger will be hit (if growth continues): [month]
### Action required: [none / upgrade [tool] within [timeframe]]
```

The 20/10 quality: James never reads a "your project has been paused" email from Supabase. He never gets a Sentry alert about a failed email send because Resend's daily limit was hit. The audit makes those events impossible, not just unlikely.

---

## The 20/10 Test

Six months in, James checks his Stripe billing page and his tool invoice total and both say exactly the same thing: the stack is performing at the level of tools costing £500/month, for £0/month — and no tool has ever hit a limit that caused a user-visible failure.
