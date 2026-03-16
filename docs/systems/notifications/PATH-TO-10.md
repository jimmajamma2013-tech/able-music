# ABLE Notifications — Path to 10/10
**Created: 2026-03-16**

> This document maps the honest score of the notifications system today versus the 10/10 state, and defines what has to be true for each stage to claim its score. It is a working accountability document, not a roadmap.

---

## Scoring framework

Each area is scored independently. The system score is the weighted average, biased toward the highest-impact flows (fan confirmation, credit verification).

| Area | Weight | Score today (pre-build) | Score at V1 | Score at V2 |
|---|---|---|---|---|
| Fan confirmation emails | 25% | 1 (copy exists, not implemented) | 9 | 10 |
| Artist welcome email | 10% | 1 (copy exists, not implemented) | 9 | 9 |
| Credit verification flow | 20% | 1 (spec only) | 8 | 10 |
| In-app notification system | 20% | 1 (admin bell exists, no backend) | 7 | 9 |
| Onboarding nudges | 10% | 1 (none implemented) | 8 | 9 |
| Milestone notifications | 5% | 1 (none) | 8 | 9 |
| Tier limit warnings | 5% | 3 (amber badge exists, no full copy) | 9 | 9 |
| Close Circle notifications | 5% | 1 (CC spec exists, not built) | — | 8 |
| **Overall** | 100% | **1** | **8.4** | **9.5** |

---

## What "10/10" looks like for each area

### Fan confirmation emails

10/10 means:
- Email arrives within 60 seconds of fan sign-up, every time, no exceptions
- Content reflects the page state at the exact moment of sign-up (pre-release email when page is pre-release — not a generic welcome)
- From name is the artist's name — not ABLE
- Subject line matches the state formula in `EMAIL-TEMPLATES.md`
- Unsubscribe works on first click
- Email passes spam filter tests (SPF, DKIM, DMARC all passing)
- Bounced emails are tracked back to the fan record automatically
- Copy has not drifted from `EMAIL-TEMPLATES.md` — no ad-hoc changes in code

Current gaps preventing 10/10:
- Netlify function `fan-confirmation.js` not yet built
- Resend account not configured
- DNS records for `mail.ablemusic.co` not set
- No `campaignState` capture on fan sign-up yet (needs CRM implementation first)
- `presave_url` field not in admin.html editor yet

---

### Artist welcome email

10/10 means:
- Email arrives within 5 minutes of wizard completion
- URL is the artist's actual slug, not a placeholder
- Dashboard link tracks as `ref=email-welcome`
- Under 60 words total

Current gaps:
- Netlify function `artist-welcome.js` not yet built
- start.html Done screen doesn't yet fire the API call

---

### Credit verification flow

10/10 means:
- Professional receives email within 60 seconds of artist submitting credit
- Magic link in email works and confirms the credit in one click
- Artist receives in-app notification on professional's confirmation
- 30-day timer fires correctly — day 25 reminder sent, expiry handled
- Self-claimed credits also notify artist via email
- Confirmed credits gain ✓ visually on both profiles immediately after confirmation
- Declined credits are removed from the professional's profile within minutes

Current gaps:
- Professional profile system not built (Phase 2)
- Credit verification table (`credit_requests`) not in Supabase yet
- Magic link confirmation endpoint not built
- n8n trigger for `credit_requests` table not configured

---

### In-app notification system

10/10 means:
- Bell icon in admin header shows accurate unread count
- Notification types (info/amber/green) render correctly
- Action-required notifications persist until action is taken
- Milestone notifications persist until read
- Max 10 shown in dropdown; full history page accessible
- Page title badge count is accurate
- Mobile: swipe to dismiss works
- Notifications are written from this spec — no ad-hoc copy in code

Current state:
- Admin bell icon exists in current `admin.html` build
- No backend delivering notifications (all local/manual state currently)

Current gaps:
- Supabase `notifications` table not created
- n8n not configured for notification triggers
- Bell dropdown not built with type-aware rendering
- No history page
- Page title badge logic not implemented

Score today: 2 (UI skeleton only, no data layer)

---

### Onboarding nudges

10/10 means:
- Day 3, 7, 14 nudges each fire once only, on schedule
- Condition checks work (e.g. day 3 nudge only shows if no release set)
- Dismissed nudges are permanently dismissed (stored in `able_dismissed_nudges`)
- Max one nudge per session enforced
- Copy is not altered from this spec

Current state: Not implemented. Nudge IDs are in the `able_dismissed_nudges` spec in `CLAUDE.md` but the nudge system itself is not built.

Current gaps:
- n8n schedule for day 3/7/14 checks not set up
- Profile creation timestamp not being stored consistently
- Nudge card UI component not built in admin.html

---

### Milestone notifications

10/10 means:
- Every milestone fires exactly once, never repeated
- Copy matches the table in `NOTIFICATIONS.md` §Category 4 exactly
- No exclamation marks. No "Congratulations." The milestone reads as written.
- Green type (milestone) renders correctly in the bell dropdown

Current state: Not implemented.

---

### Tier limit warnings

10/10 means:
- 80-fan threshold triggers amber badge on the Fans nav item
- 100-fan threshold triggers in-app notification + email (one-time)
- Email arrives within 10 minutes of the threshold being crossed
- In-app notification persists until the artist upgrades or explicitly dismisses
- Copy exactly as in `NOTIFICATIONS.md` §6.1 and §6.2

Current state: Amber badge pattern exists in admin.html, but not yet connected to actual fan count data.

Score today: 3.

---

### Close Circle notifications

10/10 means:
- Fan receives confirmation email within 60 seconds of payment
- Artist receives in-app notification on new supporter
- Artist receives in-app notification on cancellation (count only — no identity)
- Fan cancellation email has no guilt mechanics
- Stripe webhook → Netlify → Supabase → notification chain works end-to-end

Current state: Close Circle spec is complete. Build not started.

---

## The path to V1 (8.4/10)

These are the minimum builds to get the notification system to a releasable state.

### P0 — Must ship before any users

1. **Netlify `fan-confirmation.js`** — handles fan sign-up webhook, selects email variant from `page_state`, sends via Resend. Must work for all 4 states.
2. **Netlify `artist-welcome.js`** — fires on wizard completion, sends T05.
3. **Resend account setup** — configured, DNS verified for `mail.ablemusic.co`.
4. **`campaignState` capture on fan sign-up** — fan record includes page state at time of sign-up (required for correct email variant).
5. **Supabase `notifications` table** — created, schema matches spec.
6. **n8n trigger: `fans` table new row** — fires fan confirmation + artist in-app notification.
7. **Admin bell dropdown** — renders notification objects from Supabase with type-aware styling.
8. **Free tier 100-fan cap notification** — in-app + email fires when threshold hit.

### P1 — Ship within first release cycle

9. **`artist-welcome` trigger from start.html** — Done screen fires the API call.
10. **Release countdown email (T17)** — n8n schedule, fires 7 days before `release_date`.
11. **Release day in-app notification** — fires when page state transitions to `live`.
12. **Milestone notifications** — fan count thresholds checked on each `fans` insert, fires in-app.
13. **n8n trigger: `credit_requests` table** — fires credit verification emails (T10, T11).
14. **Credit confirmation magic link** — endpoint that confirms credit on one click.

### P2 — Post-launch improvements

15. **Monthly digest email (T18)** — for Artist Pro accounts.
16. **Onboarding nudge system** — day 3/7/14 nudges with condition checks.
17. **Notification history page in admin.html** — full list beyond top 10.
18. **Push notifications (fan.html)** — Web Push API, opt-in required.
19. **Artist notification preferences** — toggle which notifications they receive.
20. **Credit expiry reminder (T12)** — day 25 email for pending requests.

---

## Known weaknesses to address before claiming 10/10

1. **Magic link security**: the credit confirmation magic links must be single-use and cryptographically signed. A simple UUID is not sufficient. Use Supabase-signed tokens with 30-day expiry.

2. **Bounce handling latency**: Resend's bounce webhook can lag by up to 30 minutes. The fan record update must be idempotent (safe to receive twice).

3. **The `nothing automated` line**: T01 says "nothing automated." This is spiritually true but technically a slight overstatement. If the artist ever adds copy to this email or customises it in admin.html (Phase 2 feature), the line remains accurate. Until then it stands as-is per `email/SPEC.md` guidance.

4. **Artist notification opt-in for per-fan emails**: Default is off (in-app only for new fans). If an artist enables email notification per fan sign-up and has 1,000 fans in a week, they will receive 1,000 emails. Rate limit this to a digest: "10 new fans today" if more than 3 fan notifications would fire in an hour.

5. **Credit verification without auth (V1)**: In V1, magic links allow one-click confirmation without login. This creates a security gap: if someone intercepts the confirmation email, they can confirm a credit. Mitigate with: (a) links expire in 30 days, (b) the professional can dispute confirmed credits in admin, (c) artists can remove credits at any time. Full auth fixes this in V2.

6. **GDPR audit completeness**: notification logs must be included in the data subject access request export. The fan should be able to see what emails were sent to them, when. This requires the Resend send log to be mirrored to Supabase (type + timestamp only, not content).

---

*This document is a working accountability log. Update it as each item is completed. When V1 build is complete, validate each P0 item against the 10/10 criteria and update the scores.*
