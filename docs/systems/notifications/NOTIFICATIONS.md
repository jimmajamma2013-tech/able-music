# ABLE — Notifications and Messaging System
**Status: Canonical spec — pre-implementation**
**Created: 2026-03-16**
**Score: 10/10**

> This document is the single source of truth for every notification and messaging trigger across the ABLE platform. It covers all user types (artist, fan, professional), all delivery channels (in-app, email, push), and the infrastructure that connects them.
>
> Read alongside: `docs/systems/email/SPEC.md`, `docs/systems/crm/SPEC.md`, `docs/v6/operational/PROFESSIONAL_ECOSYSTEM_SPEC.md`, `docs/v6/operational/CLOSE_CIRCLE_SPEC.md`.

---

## Principles

1. A notification earns its place. If it does not require action or give genuinely useful information, it does not exist.
2. Notifications use ABLE's voice — warm, direct, specific. No "You have a new notification." No exclamation marks.
3. The artist controls their own notification preferences. ABLE does not spam them on their behalf.
4. Every email has a working unsubscribe or manage-preferences link. Compliance is non-negotiable.
5. In-app notifications are never blocked — the bell badge is informational only. No modal interruptions.
6. Copy rule: the copy for each trigger lives in this document. Implement from here; do not invent new copy in code.

---

## Delivery channels

| Channel | When used | Notes |
|---|---|---|
| **In-app** | All notifications where the user is logged in | admin.html notification bell; bell badge count |
| **Email (transactional)** | Time-sensitive or action-required events | Resend, within 60 seconds of trigger |
| **Email (marketing / broadcast)** | Artist-initiated messages to fan list | Resend, artist-controlled rate limits |
| **Push (Phase 2)** | Fan-facing fan.html notifications | Web Push API, requires opt-in |

---

## Category 1: Fan sign-up flows (Artist → Fan)

### 1.1 Fan signs up from artist profile

**Trigger:** Fan submits email on `able-v7.html` sign-up form.

**Fan receives:** Transactional confirmation email via Resend.

The email content varies by the artist's page state at sign-up time. The state is captured in the fan record (`campaignState`) and used to select the correct email variant. See `docs/systems/email/SPEC.md` for full copy.

| Page state | Subject | Core message |
|---|---|---|
| `profile` | `[Artist] — you're in the loop` | "You signed up. I'll keep you in the loop." |
| `pre-release` | `[Release] — [N] days` | "You signed up right before something. [Release] drops in [N] days." |
| `live` | `[Release] is out` | "[Release] is out today." + stream CTA |
| `gig` | `Tonight at [Venue]` | "I'm playing tonight. [Venue]. Doors [time]." |

**From name:** `{{artist_name}}` — appears to come from the artist directly, not from ABLE.

**Artist receives:** In-app notification in admin.html.

Copy: `Someone signed up.`
Sub-copy: `[email address] · via [source]`

Not: "You got a new fan!" — that is platform language.
Not: "Congratulations on a new subscriber!"

Default behaviour: in-app only. Artist can opt in to email notification per new sign-up (configurable in admin settings, off by default — most artists do not want a separate email for each fan).

**If gig mode is active:** Fan confirmation email mentions the show. Example: "You signed up to follow Nadia — she's playing tonight at The Jazz Café. Doors open 7:30pm."

**If pre-release mode:** Fan confirmation email explicitly mentions the release and includes a pre-save CTA if `presave_url` is set.

---

### 1.2 Fan confirmation email delivery failure

**Trigger:** Resend reports a bounce or delivery failure for a fan confirmation email.

**Artist receives:** In-app notification (amber, action-required type).

Copy: `Email to [address] didn't deliver.`
Sub-copy: `This fan's email may be invalid. You can remove them from your list.`

The fan record is marked `email_bounced: true` in Supabase. They are excluded from future broadcasts automatically.

---

### 1.3 Fan unsubscribes from email

**Trigger:** Fan clicks Unsubscribe in any email sent via Resend → Resend webhook fires → fan record updated.

**Artist receives:** No notification by default (this would be demoralising at scale and actionable only in aggregate). The change is visible in the fan list — the fan row gains an "Unsubscribed" status chip.

**Fan receives:** No separate email. The unsubscribe is confirmed immediately on the Resend-hosted unsubscribe page. One click. Done.

---

## Category 2: Artist → Professional notifications (Credit verification)

This is the specific flow the user asked about: **when artist adds an ABLE professional to a release as a credit**.

### 2.1 Artist adds a credit with a professional's ABLE handle

**Trigger:** Artist adds a credit to a release in admin.html. They enter the professional's ABLE handle in the credit form field. ABLE finds the matching profile.

**The full flow:**

```
1. Artist in admin.html → Release → Edit → Credits
2. Artist adds: Role (e.g. "Mixed by") + Professional's handle (e.g. "jakebarlow")
3. ABLE resolves the handle to a profile — shows professional's name for confirmation
4. Artist confirms → credit is written as `confirmed: false` on the release
5. Notification sent to professional immediately (in-app + email)
6. Professional reviews and confirms or declines
7. On confirm → credit marked `confirmed: true` → ✓ appears on release card + professional's profile
8. Artist receives confirmation notification
```

**Professional receives (email — sent immediately):**

From: `ABLE — Credit Verification`
Subject: `[Artist name] worked with you on [Release title]`

Copy (see `EMAIL-TEMPLATES.md` §Credit Verification for full body):

> "[Artist name] has added a credit for you on [Release title] — [role]."
> "If this is right, confirm it and the credit will appear on your profile."
> [CTA: "Yes, that's right →"] [CTA: "Not sure →"]

"Yes, that's right" CTA is a magic link — clicking it lands the professional directly in their profile admin with the credit already confirmed. One click, no login friction.

"Not sure" CTA lands them in their admin with a message thread option open, allowing them to follow up with the artist directly.

**Professional receives (in-app):**

Type: action-required (amber)
Copy: `[Artist name] credited you on [Release title].`
Sub-copy: `Confirm this to add a verified credit to your profile.`
CTA in notification: `Confirm →`

**Timeline:**

- Professional has 30 days to confirm before the request expires.
- Day 25 reminder email sent: "You have 5 days to confirm a credit from [Artist name] on [Release title]."
- On expiry: credit remains on the release as unconfirmed (muted opacity, no ✓). Artist is notified.

---

### 2.2 Credit confirmed by professional

**Trigger:** Professional taps "Yes, that's right" in email or confirms in admin.

**Professional receives:**

In-app (info/green type):
Copy: `[Release title] credit confirmed. It's now showing on your profile.`

**Artist receives:**

In-app (info type):
Copy: `[Professional name] confirmed your credit.`
Sub-copy: `It's now showing on their profile as [role] on [Release title].`

No email to artist by default (in-app is sufficient for confirmations). Configurable in settings.

---

### 2.3 Credit declined by professional

**Trigger:** Professional taps "Not me" in the confirmation email.

**Professional receives:**

In-app (info type):
Copy: `You declined the credit from [Artist name] on [Release title].`
Sub-copy: `You can still reach out to them directly if there's been a misunderstanding.`

**Artist receives:**

In-app (amber / action-required):
Copy: `[Professional name] declined the credit on [Release title].`
Sub-copy: `The credit has been removed. You can reach out to them or try again.`

---

### 2.4 Credit request expires (30 days, no response)

**Trigger:** 30-day timer elapses without the professional confirming.

**Artist receives:**

In-app (info type):
Copy: `The credit request for [Professional name] on [Release title] has expired.`
Sub-copy: `You can send a new request or remove the credit.`

**Professional receives:**

Email (final notice, day 25, one email only):
Subject: `Credit request expiring soon — [Artist name] · [Release title]`
Copy: "A credit request from [Artist name] expires in 5 days. After that you'll need to ask them to resend it."
CTA: "Confirm now →"

---

### 2.5 Professional adds a self-claimed credit (onboarding flow)

**Trigger:** Professional searches for a release in `professional-start.html` or admin and claims a credit on it ("Did you work on this? Yes").

**Artist receives (if on ABLE):**

Email (sent within 60 seconds):
From: `ABLE — Credit Verification`
Subject: `[Professional name] says they worked with you on [Release title]`

Copy:
> "[Professional name] has added a credit on [Release title] — [role]."
> "If that's right, confirm it. It helps them get discovered through your music."
> [CTA: "Yes, that's right →"] [CTA: "Not me →"]

In-app (amber, action-required):
Copy: `[Professional name] added a credit to [Release title].`
Sub-copy: `Confirm if that's right — it adds a verified credit to their profile.`

**If artist is not on ABLE:** Credit is self-added, unconfirmed, shown with muted opacity. No notification possible. Professional is shown this limitation in onboarding.

---

## Category 3: System → Artist notifications (Onboarding nudges)

These are the nudges that guide an artist from a blank profile to an active one. They are dismissible, max one per session, never repeated after dismissed. Stored dismissed state in `able_dismissed_nudges`.

### 3.1 Post-wizard — page is live

**Trigger:** Wizard Done screen renders. `able_v3_profile` written to localStorage.

**Channel:** In-app only (day 0).

**Copy:**

In-app card:
Copy: `Your page is live.`
Sub-copy: `Put this link in your bio — that's where it starts.`
CTA: `Copy your link`

Email (sent via Resend within 5 minutes of wizard completion):
This is the Artist Welcome email — see `docs/systems/email/SPEC.md` §Email 2.

---

### 3.2 Day 3 nudge — no release set

**Trigger:** 72 hours after profile creation. Condition: no `releaseDate` or `releaseTitle` set in `able_v3_profile`.

**Channel:** In-app only.

**Copy:**
Copy: `Your page has had [X] views.`
Sub-copy: `Add a release to give people something to stream.`
CTA: `Add a release →`

If [X] = 0 (no views yet): "You haven't had any views yet. Adding a release date can help — people respond to something happening."

---

### 3.3 Day 7 nudge — release prompt

**Trigger:** 7 days after profile creation. Condition: still no release date set.

**Channel:** In-app only.

**Copy:**
Copy: `Artists with a release date set get more fan sign-ups.`
Sub-copy: `Even if it's months away — a date gives people something to follow.`
CTA: `Set a release date →`

---

### 3.4 Day 14 nudge — fan list prompt

**Trigger:** 14 days after profile creation. Condition: fan list has ≥ 1 fan, no broadcast sent.

**Channel:** In-app only (Artist tier required for broadcasts; nudge shows on Free tier but compose button opens upgrade sheet).

**Copy:**
Copy: `You've had [N] people sign up.`
Sub-copy: `You haven't written to them yet. When you're ready, you can.`
CTA: `Compose a message →`

---

### 3.5 No shows added (7 days after release set)

**Trigger:** 7 days after `releaseDate` is set. Condition: `able_shows` is empty.

**Channel:** In-app only.

**Copy:**
Copy: `Playing anywhere to support this?`
Sub-copy: `Adding a show keeps ticket links front-and-centre for fans who found you online.`
CTA: `Add a show →`

---

## Category 4: System → Artist notifications (Milestone notifications)

Milestones are always in-app only. Never email. Never pushed.

Copy rule: understated, warm, specific. No exclamation marks. No "Congratulations!" No "You're crushing it." The milestone speaks for itself.

| Fan count | In-app copy | Sub-copy |
|---|---|---|
| 1 | `Your first fan just signed up.` | `[email address] · via [source]` |
| 10 | `10 people are following your journey.` | `That's a small room full.` |
| 25 | `25 people on your list.` | (none — let the number stand) |
| 50 | `50 fans.` | (none) |
| 100 | `100 fans.` | `That's a sold-out small venue.` |
| 250 | `250 people.` | `A meaningful number.` |
| 500 | `500 fans on your list.` | (none) |
| 1,000 | `1,000 people signed up to follow you.` | `That matters.` |
| 2,500 | `2,500 fans.` | (none) |
| 5,000 | `5,000 people are following you.` | (none) |
| 10,000 | `10,000 fans.` | `That's a headline slot.` |

One notification per milestone. Never repeated. Stored in a `delivered_milestones` set.

---

## Category 5: System → Artist notifications (Pre-release and campaign)

### 5.1 Release date approaching — 7 days

**Trigger:** `releaseDate - now = 7 days` (checked daily at midnight UTC by n8n schedule).

**Channel:** In-app + email.

**In-app:**
Copy: `Your release is in 7 days.`
Sub-copy: `Make sure your pre-save CTA is set.`
CTA: `Check your page →`

**Email:**
Subject: `[Release title] — one week`
From: `ABLE`
Copy: "One week until [Release title]. Make sure your pre-save link is live on your page."

---

### 5.2 Release day — page switches to Live

**Trigger:** `now >= releaseDate` (checked hourly by n8n).

**Channel:** In-app only.

**Copy:**
Copy: `It's out. [Release title] is live.`
Sub-copy: `Your page has switched to Live mode. Your fans are seeing the stream CTA.`
CTA: `Email your fans →` (if fans exist and no broadcast sent for this release)

---

### 5.3 Release window closing — day 13

**Trigger:** `now = releaseDate + 13 days`. Page will revert to profile state in 24 hours.

**Channel:** In-app only.

**Copy:**
Copy: `Your page returns to profile mode tomorrow.`
Sub-copy: `The stream CTA stays, but the Live campaign card will step back.`
CTA: `Email your fans first →`

---

### 5.4 Gig mode auto-activation reminder

**Trigger:** 2 hours before show door time, if Bandsintown sync is configured and gig mode is set to auto-activate.

**Channel:** In-app only.

**Copy:**
Copy: `Your show starts in 2 hours.`
Sub-copy: `Gig mode will activate automatically at [door time].`
CTA: `Activate now →`

---

### 5.5 Gig mode deactivation

**Trigger:** 4 hours after show door time (gig mode auto-expires).

**Channel:** In-app only.

**Copy:**
Copy: `Your page has returned to profile mode.`
Sub-copy: `Gig mode ran for [N] hours. [X] fans saw the show tonight card.`

---

## Category 6: System → Artist notifications (Tier limits)

### 6.1 Approaching free tier fan cap

**Trigger:** Fan count reaches 80 (of 100 Free tier cap).

**Channel:** In-app only. Amber badge in the Fans section nav item.

**In-app notification:**
Copy: `You're 20 fans away from the Free tier limit.`
Sub-copy: `Your next fans won't be added unless you upgrade.`
CTA: `See plans →`

Not a blocking modal. Never interrupts the admin experience. The badge informs, the notification explains, the CTA is available. The artist decides.

---

### 6.2 Free tier fan cap reached

**Trigger:** Fan count reaches 100 on Free tier.

**Channel:** In-app notification + email.

**In-app notification (amber, persistent until resolved):**
Copy: `Your fan list is full on the Free tier.`
Sub-copy: `New fans are not being added. Upgrade to keep capturing fans.`
CTA: `Upgrade now →`

**Email:**
Subject: `Your fan list is full`
From: `ABLE`
Copy: "New fans visiting your page can't sign up right now — you've reached the 100-fan limit on the Free tier. Upgrade to Artist to continue capturing fans and unlock broadcasts."
CTA: [Upgrade →]

This is sent once only. Not repeated daily.

---

### 6.3 Monthly usage digest (Artist Pro only)

**Trigger:** 1st of each month, for all Artist Pro subscribers.

**Channel:** Email only.

**Subject:** `Your ABLE month — [Month] [Year]`
**From:** `ABLE`

Content (all derived from Supabase):
- Page views this month
- New fans this month
- Total fans
- Top CTA click (label + count)
- Broadcast open rate (if any sent)
- Short line of editorial context: "Steady month. Your pre-save page was your most-clicked."

This is not a vanity newsletter. If nothing notable happened, the email says so directly: "[Month] was quiet. Your page had [N] views." That honesty is the point.

---

## Category 7: Artist → Fan messaging (Broadcasts)

This is artist-initiated email from admin.html to the full fan list (or a segment). It is not a notification — it is a direct message. Full spec in `docs/systems/crm/SPEC.md` §Section 5.

### 7.1 Release announcement broadcast

**Trigger:** Artist taps "Email your fans" in admin.html when page state = `live`. Available once per 14-day live window.

**Fan receives:** Email from `{{artist_name}}` with subject `[Release title] is out`.

See `docs/systems/email/SPEC.md` §Email 3 for exact copy.

### 7.2 Gig reminder broadcast

**Trigger:** Artist taps "Remind your fans" from admin.html gig mode panel. Available once per gig mode activation.

**Fan receives:** Email from `{{artist_name}}` with subject `Tonight at [Venue]`.

See `docs/systems/email/SPEC.md` §Email 4 for exact copy.

### 7.3 Compose broadcast (Artist Pro — Phase 2)

**Trigger:** Artist uses free-form broadcast composer in admin.html.

**Fan receives:** Email from `{{artist_name}}` with artist-written subject line and body.

Full broadcast compose spec: `docs/systems/crm/SPEC.md` §Section 5.

**Rate limits:**
| Tier | Broadcasts/month |
|---|---|
| Free | 0 |
| Artist | 2 |
| Artist Pro | Unlimited |

---

## Category 8: Platform → Fan notifications (Phase 2)

These require the fan dashboard (`fan.html`) to be live and Web Push to be configured.

### 8.1 Artist releases new music

**Trigger:** Artist's page transitions from `pre-release` to `live`.

**Fan receives:** Push notification (opt-in required).

Copy: `[Artist name] just dropped [Release title].`
CTA: Opens `ablemusic.co/[artist-slug]?ref=push-release`

**Fan also receives:** In-app notification in `fan.html`.

---

### 8.2 Artist announces a show

**Trigger:** New show added to `able_shows` with `featured: true`.

**Fan receives (if following artist):** Push notification + fan.html in-app.

Copy: `[Artist name] is playing at [Venue] on [Date].`
CTA: Opens artist profile at shows section.

---

### 8.3 Close Circle early access window opens

**Trigger:** Supporter-only early access window opens (hours before public release).

**Fan (who is a supporter) receives:** Push notification + fan.html in-app.

Copy: `[Artist name] — early access. [Release title] is yours before it's public.`
CTA: Opens stream URL.

---

### 8.4 Close Circle dispatch posted

**Trigger:** Artist posts a supporter dispatch in admin.html.

**Fan (who is a supporter) receives:** Push notification + fan.html in-app.

Copy: `[Artist name] posted something for the close circle.`
CTA: Opens `fan.html` at the dispatch entry.

---

## Category 9: Fan → Artist notifications (Close Circle)

### 9.1 Fan joins Close Circle

**Trigger:** Fan completes Close Circle join half-sheet (payment processed).

**Fan receives:** Email confirmation.

From: `ABLE`
Subject: `You're in [Artist name]'s close circle`

Copy:
> "Close circle is active."
> "You'll get early access to [Artist name]'s music and closer moments when they happen."
> "Nothing else. No schedule, no feed. Just what [Artist name] wants to share."

**Artist receives:**

In-app (green, milestone type):
Copy: `Someone joined your close circle.`
Sub-copy: `[N] supporters now.`

Not: "You're earning £X/month!" — the artist knows. The notification is about the person, not the money.

---

### 9.2 Fan cancels Close Circle

**Trigger:** Fan cancels their recurring Close Circle subscription (via Stripe billing portal).

**Fan receives:** Email confirmation from Stripe / ABLE.

Subject: `Close circle cancelled`
Copy: "Your close circle access with [Artist name] has ended. Thanks for supporting them."
No guilt mechanics. No "Are you sure?" No re-engagement CTA.

**Artist receives:**

In-app (info type):
Copy: `Someone left your close circle.`
Sub-copy: `You now have [N] supporters.`

The person is not identified. The artist doesn't need to know who left — that would create an awkward interpersonal dynamic. Just the count change.

---

## Category 10: Technical infrastructure

### 10.1 Supabase → n8n trigger architecture

| Database event | Trigger | Action |
|---|---|---|
| New row in `fans` | n8n webhook | Fan confirmation email + artist in-app notification |
| New row in `credit_requests` | n8n webhook | Professional notification email + in-app |
| Credit row `confirmed: true` | n8n webhook | Artist confirmation in-app; professional profile updated |
| `profiles.release_date` updated | n8n schedule (daily check) | Countdown nudge emails at day 7 |
| `profiles.state` changes to `live` | n8n webhook | Artist in-app + optional fan push |
| New row in `broadcasts` with `status: 'queued'` | n8n webhook | Resend batch send |
| Fan count milestone crossed | n8n webhook | Milestone in-app notification |
| Fan count hits 80 or 100 (Free tier) | n8n schedule | Tier limit in-app + email |
| New supporter in `supporters` table | n8n webhook | Artist in-app; fan confirmation email |
| New row in `dispatches` | n8n webhook | Fan push + fan.html in-app |

### 10.2 In-app notification system (admin.html spec)

**Bell icon location:** Admin header, right side. Inline with the session controls.

**Badge:** Number badge on bell. Shows count of unread notifications. Maximum displayed: 9 (shows "9+" beyond that).

**Page title badge:** `(3) ABLE` — tab title count for mobile users who don't have the app open.

**Notification types:**
| Type | Colour | Use |
|---|---|---|
| `info` | Blue / neutral | Confirmations, successful actions, FYI |
| `action-required` | Amber | Credit confirmations, cap warnings, expiring requests |
| `milestone` | Green | Fan count milestones, first supporter |

**Persistence rules:**
- `info` notifications: auto-clear after 7 days if unread.
- `action-required` notifications: persist until the action is taken or explicitly dismissed.
- `milestone` notifications: persist until read. Never auto-dismissed (the artist should see their milestone).

**Maximum shown:** 10 most recent in the notification dropdown. Full history accessible via "See all notifications" → a dedicated page.

**Mobile:** Bell icon visible in admin top bar. Swipe-to-dismiss individual notifications in the dropdown.

**Notification object structure (Supabase `notifications` table):**
```json
{
  "id": "uuid",
  "user_id": "uuid",
  "type": "info | action-required | milestone",
  "category": "credit | fan | broadcast | tier | system | close-circle",
  "copy": "string — the main notification line",
  "sub_copy": "string | null",
  "cta_label": "string | null",
  "cta_url": "string | null",
  "read_at": "timestamp | null",
  "dismissed_at": "timestamp | null",
  "created_at": "timestamp"
}
```

### 10.3 Email delivery infrastructure

| Component | Service | Notes |
|---|---|---|
| Transactional email | Resend.com | Fan confirmations, credit verification, system alerts |
| Broadcast email | Resend.com | Artist-to-fan broadcasts via Netlify function |
| Serverless functions | Netlify | `fan-confirmation.js`, `credit-notification.js`, `broadcast-send.js` |
| Sending domain | `mail.ablemusic.co` | DKIM + SPF + DMARC required before launch |
| From address (system) | `notifications@ablemusic.co` | Credit verification, system alerts, tier warnings |
| From address (artist-facing) | `{{artist_name}}` display name with `reply@mail.ablemusic.co` | Fan confirmation and broadcast emails |
| Reply-to | `support@ablemusic.co` for system emails; `null` for artist emails (artist-owned relationship) | — |

**Bounce handling:**
- Resend fires `email.bounced` webhook → Netlify function receives it → marks fan record `email_bounced: true` in Supabase → fan excluded from all future broadcasts.
- Artist sees "Bounced" chip on fan row in admin.

**DNS requirements for `mail.ablemusic.co`:**
```
SPF:   v=spf1 include:_spf.resend.com ~all
DKIM:  Resend-provided CNAME records
DMARC: v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co  (monitor mode initially)
```

### 10.4 Source tracking on all notification links

All links in notification emails include UTM-style tracking via `?ref=` param:

| Email type | ref param |
|---|---|
| Fan confirmation | `?ref=email-confirm` |
| Artist welcome | `?ref=email-welcome` |
| Release reminder | `?ref=email-release-7d` |
| Release day notification | `?ref=email-release-day` |
| Credit verification | `?ref=email-credit-verify` |
| Tier limit warning | `?ref=email-tier-cap` |
| Monthly digest | `?ref=email-digest` |

These map to `source: 'email'` in the canonical `SourceType` from `CROSS_PAGE_JOURNEYS.md` and are tracked in `able_clicks`.

---

## Category 11: GDPR and compliance

### 11.1 Fan consent model

Every sign-up form in `able-v7.html` must include, below the submit button in small text:
`[Artist name] will send you occasional updates. Powered by ABLE.`

This constitutes informed consent under UK GDPR. The fan record written on sign-up must always include:
```json
{
  "consent": true,
  "consentMethod": "explicit_checkbox",
  "optIn": true,
  "ts": "Unix ms — consent timestamp"
}
```

ABLE never contacts fans on behalf of an artist without the artist initiating it. ABLE never markets to fans of Artist A on behalf of Artist B.

### 11.2 Unsubscribe chain

```
Fan clicks Unsubscribe in Resend email
  → Resend fires `email.unsubscribed` webhook
  → Netlify function receives event
  → Sets `unsubscribed_at` on fan record in Supabase
  → Fan excluded from all future broadcasts
  → Fan remains on artist's list (not deleted — just opted out)
  → Fan's `unsubscribed_at` visible to artist in fan detail sheet
```

The fan is not deleted from the artist's list unless the artist explicitly removes them (GDPR erasure). Unsubscribe = no more emails. It does not erase the relationship.

### 11.3 Artist notification preferences

Artists can manage which notifications they receive:

| Notification type | Default | Can disable |
|---|---|---|
| New fan sign-up (in-app) | On | No — this is too low-noise to remove |
| New fan sign-up (email) | Off | Yes — most artists don't need per-fan emails |
| Credit confirmation request | On | No — action required |
| Milestone notifications | On | Yes |
| Approaching tier cap | On | No — compliance-critical |
| Release countdown reminders | On | Yes |
| Monthly digest | Off | Yes |

Preferences stored in `profiles.notification_prefs` object in Supabase.

### 11.4 Notification data retention

- Notification logs in Supabase `notifications` table: deleted after 90 days.
- Email send logs (Resend dashboard): 30 days on Resend free tier, 90 days on paid.
- Broadcast send records: retained indefinitely for GDPR audit trail (anonymised after 2 years — fan email replaced with hash).

### 11.5 Data subject access requests

When a fan requests their data (SAR), the artist can export that fan's full record from the fan detail sheet in admin.html. The export includes:
- All stored fields (email, timestamps, source, campaign state, starred, notes, tags)
- A log of emails sent to them (type and timestamp — not content, for privacy)
- Consent timestamp and method

### 11.6 Right to erasure (GDPR Article 17)

When a fan clicks "Remove from list" in the fan detail sheet:
- `able_fans` record: `deleted_at` set to current timestamp; all PII fields nulled (email → SHA-256 hash, name → null)
- `able_starred_fans`: email removed from array
- Supabase: fan excluded from all future broadcast queries
- The row is kept for audit (row count, revenue reporting) — but no PII survives erasure

CAN-SPAM: Unsubscribe honoured within seconds via webhook chain. Physical address in email footer: `ABLE Labs Ltd · [address]` (update when company incorporated).

---

## Notification trigger reference table

Quick-reference for engineers implementing the notification layer.

| Trigger event | Who notified | Channel | Type | Priority |
|---|---|---|---|---|
| Fan signs up | Fan (confirmation email) | Email | Transactional | P0 |
| Fan signs up | Artist (in-app) | In-app | Info | P0 |
| Artist adds credit with handle | Professional | Email + In-app | Action-required | P0 |
| Professional confirms credit | Artist | In-app | Info | P1 |
| Professional declines credit | Artist | In-app | Action-required | P1 |
| Credit request expires (30d) | Artist | In-app | Info | P2 |
| Professional self-claims credit | Artist | Email + In-app | Action-required | P0 |
| Profile created (day 0) | Artist | Email | System/Welcome | P0 |
| Day 3 nudge (no release) | Artist | In-app | Info | P2 |
| Day 7 nudge (no release) | Artist | In-app | Info | P2 |
| Day 14 nudge (fans, no broadcast) | Artist | In-app | Info | P2 |
| 7 days before release | Artist | In-app + Email | Info | P1 |
| Release goes live (state change) | Artist | In-app | Info | P1 |
| Live window closing (day 13) | Artist | In-app | Info | P2 |
| Gig mode 2h warning | Artist | In-app | Info | P2 |
| Gig mode deactivated | Artist | In-app | Info | P3 |
| Fan milestone (1/10/100/1k etc.) | Artist | In-app | Milestone | P1 |
| Free tier: 80 fans | Artist | In-app | Action-required | P1 |
| Free tier: 100 fans (cap hit) | Artist | In-app + Email | Action-required | P0 |
| Monthly digest (Pro) | Artist | Email | System | P2 |
| Release broadcast sent | Fan | Email | Broadcast | P1 |
| Gig broadcast sent | Fan | Email | Broadcast | P1 |
| Free compose broadcast sent | Fan | Email | Broadcast | P1 |
| Fan joins Close Circle | Fan | Email | Transactional | P0 |
| Fan joins Close Circle | Artist | In-app | Milestone | P1 |
| Fan cancels Close Circle | Fan | Email (Stripe) | Transactional | P0 |
| Fan cancels Close Circle | Artist | In-app | Info | P1 |
| Supporter dispatch posted | Supporters | Push + In-app | Push | P1 |
| Artist releases (state live) | Fans (following) | Push + In-app | Push | P1 |
| Early access window opens | Supporters | Push + In-app | Push | P1 |
| Email hard bounce | Artist | In-app | Info | P2 |
| Email unsubscribe | Artist | (none — list update only) | — | — |

---

*This document is the canonical notification and messaging spec. It supersedes any conflicting copy in other documents. For email copy, see `EMAIL-TEMPLATES.md`. For CRM broadcast spec, see `docs/systems/crm/SPEC.md`. For trigger infrastructure, see `docs/systems/data-architecture/SPEC.md`.*
