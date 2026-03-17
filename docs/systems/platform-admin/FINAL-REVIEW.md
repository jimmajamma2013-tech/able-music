# ABLE Platform Admin — Final Review
**Created: 2026-03-16 | Status: ACTIVE**

---

## The honest answer to the obvious question

Does James need a custom admin UI before the first artist signs up? No. The SQL query library is real operational capability. It is not a consolation prize or a temporary workaround — it is a deliberate choice to build the minimum that actually works rather than polish UI that nobody needs yet.

The time to build `platform-admin.html` is when running SQL queries starts to feel risky at the volume of tasks needed. At 50 artists, it still does not. At 100+ artists with paying subscribers, GDPR requests arriving, and support emails coming in, it absolutely does.

---

## Does the V1 SQL library give James everything he needs at launch?

**For the first 50 artists: yes.**

Specifically, V1 SQL gives James the ability to:

- See every artist, their tier, their fan count, and when they last used the product — one query, runs in under a second
- Suspend or delete an artist in under 5 minutes, including understanding the scope of what will be deleted before doing it
- Respond to a GDPR deletion request within the 30-day legal window — find by email, review all records, delete with one query
- Override any artist's tier manually — for manual upgrades, beta testers, error correction
- View platform growth (artists by tier, signups by day, total fans) without leaving Supabase
- See which artists are getting the most fan sign-ups
- Diagnose an artist-reported issue by pulling all their data in one query

What V1 SQL does NOT give him:
- A Stripe-linked view of who is paying and who has lapsed
- Any visibility into failed payments without opening Stripe
- Content moderation capability
- A way to impersonate an artist to debug their experience
- Automated alerts when something goes wrong

None of those are P0 requirements. They become important when ABLE has paying subscribers and active content. Build them then.

---

## What can go wrong if this isn't built?

These are the failure modes if James goes to first artist without even the SQL library being tested and ready.

### 1. A GDPR deletion request arrives on day 3

An artist or fan emails asking for their data to be deleted. Under GDPR (UK GDPR post-Brexit has the same requirements), James has 30 days. Without the SQL library tested and ready, this means:

- James opens Supabase and tries to find the records manually
- He checks `fans`, misses `fan_actions`, misses `support_purchases`
- He deletes some records but not all
- That is a GDPR compliance failure
- Fine: up to £17.5m or 4% of global turnover for serious infringements, or up to £8.7m or 2% for minor ones

The SQL library takes this risk from "scramble and hope" to "run four queries and done." This is not theoretical. GDPR requests are common.

### 2. An artist posts something harmful

Without moderation tooling, the only way James knows about inappropriate content is a user report. If that report arrives at a weekend or while he's unavailable, the content stays live. At launch with a small user base this is low probability. At 500 artists it is a near-certainty.

This is a P2 concern, not P0. The risk is accepted at launch. The mitigation is: Terms of Service that allow James to remove content, and being responsive to reports. Build the moderation queue at P2.

### 3. A subscription payment fails silently

An artist pays for Pro. Their Stripe payment card expires. Stripe retries, fails, marks the subscription as `past_due`. ABLE has no webhook handler for this event yet. The artist continues using Pro features. Revenue is silently lost.

This is a billing architecture gap, not an admin gap. The fix is: Stripe webhook handler that sets `profiles.tier = 'free'` on subscription cancellation. This should be built when the first paid subscription is live — before platform-admin.html, before most of the SQL library.

### 4. An artist reports a bug and James can't reproduce it

No impersonation tool. James asks the artist to describe what they see. The artist is confused. The bug takes three emails to diagnose. At 10 artists, fine. At 100, unsustainable.

P1 admin page with "view profile" link addresses 70% of this. True impersonation (session-based, with token) is P2.

### 5. James doesn't know if the platform is growing

No metric. No number. Every week is a guess about whether ABLE is working. The platform summary query (`admin: platform summary`) takes 30 seconds to run in Supabase. Not running it regularly is just a choice.

---

## What is the minimum viable admin before the first real artist signs up?

**Three things. That is all.**

1. **The SQL query library saved in Supabase** — copy all queries from `SPEC.md` into saved queries in the Supabase SQL editor. Name them. Test them. Done. 20 minutes.

2. **`ADMIN_SECRET` and `SUPABASE_SERVICE_KEY` set in Netlify env vars** — required before deploying `admin-stats.js` and `admin-artist.js`. 10 minutes.

3. **`admin_actions` table and `status` column created in Supabase** — needed for the tier-override and suspension logic to work cleanly. Run the two `ALTER TABLE` / `CREATE TABLE` statements from `SPEC.md`. 5 minutes.

Total: 35 minutes. No code changes. No new files built. Those three things take the score from 0 to 6/10 and mean James can manage the platform operationally from day one.

---

## V1 scope confirmed

**V1 = SQL library + Supabase dashboard is sufficient for the first 50 artists.**

This is not a compromise. The Supabase dashboard is a capable admin interface for someone who knows what SQL to run. The queries in `SPEC.md` turn it from "browse tables and hope" into "run a named query and act."

The case for building `platform-admin.html` earlier than P1 (10 paying artists) would have to be: James is spending more than 2 hours per week on admin tasks that a UI would automate. Until that threshold, the SQL library is the right tool.

---

## Final scores

| Dimension | V1 SQL library | P1 HTML admin | P2 full build |
|---|---|---|---|
| Artist management | 5/10 | 9/10 | 10/10 |
| Fan management | 6/10 | 8/10 | 10/10 |
| Platform analytics | 5/10 | 7/10 | 10/10 |
| Billing management | 1/10 | 3/10 | 9/10 |
| Content moderation | 0/10 | 0/10 | 9/10 |
| Feature flags | 0/10 | 0/10 | 9/10 |
| Impersonation | 0/10 | 2/10 | 9/10 |
| Support management | 2/10 | 5/10 | 8/10 |
| Operational visibility | 2/10 | 4/10 | 8/10 |
| Legal compliance | 6/10 | 8/10 | 10/10 |
| **Overall** | **7/10** | **8/10** | **10/10** |

**V1 final score: 7/10**

7/10 is the right score for a working SQL library. It gives James real operational control — not polished, not convenient, but complete for the tasks that actually matter at launch. The missing 3 points are the UI polish and advanced capabilities that belong at P1 and P2. They are not needed yet.

---

## The one non-negotiable

Before the first real artist signs up, there must be a tested, working path to GDPR fan deletion. Not a plan. Not a note in a doc. An actual query that has been run against the real database and confirmed to delete all records for a test fan email.

Everything else in this document can wait. That cannot.

If a GDPR request arrives and James cannot fulfil it quickly, confidently, and completely — that is a legal problem, not a product problem. The SQL library solves it. Test it first.

---

*Review this document when: the first artist signs up (check V1 is in place), the first paying subscription goes live (check Stripe webhook), the first GDPR request arrives (check the delete query still works), and at 50 artists (decide whether P1 HTML admin is now needed).*
