# ABLE — Email Templates
**Status: Canonical copy — pre-implementation**
**Created: 2026-03-16**

> Every email template in the ABLE system, written in full with subject line, preview text, body, CTAs, and guidance notes.
>
> Implements the principles in `docs/systems/email/SPEC.md`.
> Triggered by events documented in `NOTIFICATIONS.md`.
>
> **Copy rule:** Implement exactly from this document. Do not invent new copy in code. If a scenario needs new copy, update this document first.

---

## Template reference index

| # | Template | Trigger | From | Priority |
|---|---|---|---|---|
| T01 | Fan Confirmation — Profile state | Fan signs up, page state = profile | Artist name | P0 |
| T02 | Fan Confirmation — Pre-release state | Fan signs up, page state = pre-release | Artist name | P0 |
| T03 | Fan Confirmation — Live state | Fan signs up, page state = live | Artist name | P0 |
| T04 | Fan Confirmation — Gig state | Fan signs up, page state = gig | Artist name | P0 |
| T05 | Artist Welcome | Wizard completed | ABLE | P0 |
| T06 | Release Broadcast (default) | Artist broadcasts release, no note | Artist name | P1 |
| T07 | Release Broadcast (with artist note) | Artist broadcasts release, with note | Artist name | P1 |
| T08 | Gig Reminder Broadcast | Artist broadcasts show reminder | Artist name | P1 |
| T09 | Magic Link — Sign in | Artist or fan requests login | ABLE | P0 |
| T10 | Credit Verification — To professional | Artist adds credit with handle | ABLE Credit Verification | P0 |
| T11 | Credit Request — From professional (to artist) | Professional self-claims credit | ABLE Credit Verification | P0 |
| T12 | Credit Expiry Reminder — 5 days | 25 days after credit request, no response | ABLE | P2 |
| T13 | Close Circle — Fan joins | Fan completes Close Circle payment | ABLE | P0 |
| T14 | Close Circle — Fan cancels | Fan cancels Close Circle subscription | ABLE | P0 |
| T15 | Free Tier Fan Cap — Warning (80 fans) | (none — in-app only, no email) | — | — |
| T16 | Free Tier Fan Cap — Full (100 fans) | Fan count hits 100 on Free tier | ABLE | P0 |
| T17 | Release Countdown — 7 days | 7 days before `release_date` | ABLE | P1 |
| T18 | Monthly Digest | 1st of month, Artist Pro only | ABLE | P2 |

---

## Standard footer (all emails)

All ABLE emails use the same footer block. Copy it exactly. Do not vary it per template.

```
—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

For system emails (from ABLE, not artist):
```
—

ABLE · ablemusic.co
[Manage email preferences]
```

For GDPR compliance: the [Unsubscribe] link is Resend-native. The [Manage email preferences] link routes to `ablemusic.co/settings/notifications`.

Physical address (add once company is incorporated):
```
ABLE Labs Ltd · [address]
```

---

## T01 — Fan Confirmation: Profile state

**Trigger:** Fan signs up, page state = `profile`
**From:** `{{artist_name}}` (display name, e.g. "Nadia")
**From address:** `nadia@mail.ablemusic.co` (artist-specific alias)
**Reply-to:** null (no reply address — this is an artist-controlled list)
**Subject:** `{{artist_name}} — you're in the loop`
**Preview text:** `I'll keep you posted.`

---

Hey —

It's {{artist_name}}.

You signed up, so I'll keep you in the loop. That means new music when I drop it, shows when I'm playing near you, and anything else I think is worth sharing.

Nothing else, nothing automated. Just me.

[See my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- The phrase "nothing automated" is load-bearing. It is technically a slight exaggeration (this email was sent by a server) but in spirit true — the artist wrote the words, owns the list, and has no platform mediating the relationship. Do not change this line.
- No "thanks for signing up." No "Welcome to [artist]'s community." Those are platform phrases. This is the artist writing to someone who showed up.
- `{{page_url}}` = `ablemusic.co/{{artist_slug}}?ref=email-confirm`

---

## T02 — Fan Confirmation: Pre-release state

**Trigger:** Fan signs up, page state = `pre-release`
**From:** `{{artist_name}}`
**Subject:** `{{release_title}} — {{days_until_release}} days`
**Preview text:** `You signed up right before something.`

---

Hey —

It's {{artist_name}}. You signed up right before something.

{{release_title}} comes out in {{days_until_release}} days — {{release_date_formatted}}. Pre-save it now if you want it to land in your library the moment it's out.

[Pre-save {{release_title}} →]({{presave_url}})

I'll be in touch when it's live.

[See what's coming →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- "You signed up right before something" — single most important sentence in this variant. It creates a sense of timing. Do not change it.
- `{{presave_url}}` from `able_v3_profile.presaveUrl`. If not set: omit the pre-save paragraph entirely. Go straight to `[See what's coming →]`.
- If `days_until_release = 1`: "1 day — {{release_date_formatted}}." Change "days" to "day".
- `{{page_url}}` = `ablemusic.co/{{artist_slug}}?ref=email-confirm`

---

## T03 — Fan Confirmation: Live state

**Trigger:** Fan signs up, page state = `live` (within 14-day live window)
**From:** `{{artist_name}}`
**Subject:** `{{release_title}} is out`
**Preview text:** `It dropped today.`

**Variant A (artist has written a release note in admin.html):**

---

Hey —

It's {{artist_name}}. {{release_title}} is out today.

[Stream it →]({{stream_url}})

{{release_note}}

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Variant B (no release note set):**

---

Hey —

It's {{artist_name}}. {{release_title}} is out.

[Stream it →]({{stream_url}})

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- `{{release_note}}` is a short artist-written field in admin.html — max 280 chars. Label: "Say something about this release (optional)". Placeholder: "What would you say if you were handing them the record?" If empty: use Variant B.
- `{{stream_url}}` from `able_v3_profile.streamUrl`. If not set: omit the [Stream it →] button. Show only [Listen on my page →].
- Variant B is the default. Variant A requires the release note field to be non-empty.

---

## T04 — Fan Confirmation: Gig state

**Trigger:** Fan signs up, page state = `gig` (within 24-hour gig mode window)
**From:** `{{artist_name}}`
**Subject:** `Tonight at {{venue_name}}`
**Preview text:** `Doors at {{doors_time}}.`

---

Hey —

It's {{artist_name}}. I'm playing tonight.

{{venue_name}}, {{venue_city}}. Doors at {{doors_time}}.

[Tickets →]({{ticket_url}})

See you there.

[My page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- This is the shortest email in the system. That is correct. On show night, there is one thing. Do not add copy.
- `{{ticket_url}}` from `able_shows[0].ticketUrl`. If no ticket URL: replace with "There may still be tickets at the door." and omit the [Tickets →] button.
- If `venue_city` is not set: omit city from the venue line. Show only `{{venue_name}}.`
- "See you there" — warm, confident, not gushing. Do not change this line.

---

## T05 — Artist Welcome

**Trigger:** start.html Done screen renders. `able_v3_profile.slug` is set.
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `Your page is live, {{artist_name}}`
**Preview text:** `ablemusic.co/{{artist_slug}}`

---

Good to see you here.

Your page is live at ablemusic.co/{{artist_slug}}.

The next thing: put that URL in your Instagram bio. That's where your fans will start finding you.

When you're ready, your dashboard is where you run everything.

[Open your dashboard →]({{dashboard_url}})

—

ABLE · ablemusic.co

---

**Implementation notes:**
- "Good to see you here" — this is ABLE's register. Warm, one beat. Not "Welcome aboard." Not "You're all set." Not "Congratulations, you're live."
- "The next thing" — one actionable step. Not a checklist. Not a list of "5 things to do to get started."
- Under 60 words. That is the target for this email. Every word earns its place.
- No Powered by ABLE footer with unsubscribe — this is a system transactional email, not a marketing email. Uses the system footer: `ABLE · ablemusic.co`.
- `{{dashboard_url}}` = `ablemusic.co/admin?ref=email-welcome`

---

## T06 — Release Broadcast (default, no artist note)

**Trigger:** Artist taps "Email your fans" in admin.html when page state = `live`. No note written.
**From:** `{{artist_name}}`
**Subject:** `{{release_title}} is out`
**Preview text:** `Out today.`

---

Hey —

It's {{artist_name}}. {{release_title}} is out today.

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- This is the absolute minimum. It does the job. A fan who signed up gets the news and the link. Nothing more.
- Rate limit: one send per 14-day live window per release.
- Segment: all fans with `optIn: true` and `unsubscribed_at: null`.

---

## T07 — Release Broadcast (with artist note)

**Trigger:** Artist taps "Email your fans" in admin.html when page state = `live`. Artist has written a note in the "Say something" field.
**From:** `{{artist_name}}`
**Subject:** `{{release_title}} is out`
**Preview text:** `Out today.`

---

Hey —

It's {{artist_name}}. {{release_title}} is out.

{{artist_note}}

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Implementation notes:**
- `{{artist_note}}` is rendered verbatim — no editing, no formatting, no HTML. The artist writes in plain text.
- Max 280 characters for the note. This is enforced in admin.html.
- Admin copy for the field: Label: `Say something (optional)` · Placeholder: `This is what you'd say to them in person.` · Limit: 280 chars shown as counter.
- The note appears between the release statement and the stream CTA. This placement ensures the CTA is never buried.

---

## T08 — Gig Reminder Broadcast

**Trigger:** Artist taps "Remind your fans" from admin.html gig mode panel.
**From:** `{{artist_name}}`
**Subject:** `Tonight at {{venue_name}}`
**Preview text:** `Doors {{doors_time}}.`

---

Hey —

{{artist_name}} here. Playing tonight at {{venue_name}}, {{venue_city}}.

Doors {{doors_time}}. {{ticket_availability_line}}

[Get tickets →]({{ticket_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Token notes:**
- `{{ticket_availability_line}}` — optional artist-written field (max 60 chars). Example: "A few tickets left." If not set: omit this line entirely.
- If no `ticket_url`: replace [Get tickets →] with "See you there." and omit the button.
- Rate limit: one send per gig mode activation.

---

## T09 — Magic Link: Sign in

**Trigger:** `supabase.auth.signInWithOtp({ email })` call.
**From:** `ABLE`
**From address:** `auth@ablemusic.co`
**Subject:** `Your ABLE link`
**Preview text:** `Sign in — valid for 10 minutes.`

---

Here's your sign-in link. It's valid for 10 minutes.

[Sign in to ABLE →]({{supabase_magic_link}})

If you didn't request this, ignore it.

—

ABLE · ablemusic.co

---

**Implementation notes:**
- No "Welcome back." No "For your security, this link expires." No urgency.
- "Sign in to ABLE" is the button label. Not "Click here." Not "Access your account." Not "Log in."
- This must be configured as a custom Supabase email template to replace the Supabase default. The default is not acceptable at ABLE's quality standard.
- This email has no unsubscribe — it is a transactional auth email, not a marketing email.

---

## T10 — Credit Verification: To professional (artist-initiated)

**Trigger:** Artist adds a credit on a release using a professional's ABLE handle.
**From:** `ABLE — Credit Verification`
**From address:** `credits@ablemusic.co`
**Subject:** `{{artist_name}} worked with you on {{release_title}}`
**Preview text:** `Confirm this credit to add it to your profile.`

---

{{professional_name}} —

{{artist_name}} has credited you as {{credit_role}} on {{release_title}}.

If that's right, confirm it — the credit will appear on your profile with a verified mark.

[Yes, that's right →]({{confirm_url}})

[Not sure →]({{query_url}})

If you confirm, the credit appears on your ABLE profile as:
"{{credit_role}} — {{release_title}} by {{artist_name}}"

You have 30 days to respond before this request expires.

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Token notes:**
- `{{confirm_url}}` — magic link that directly confirms the credit and redirects to the professional's admin profile. No login required for this action. The link is single-use, expires with the 30-day window.
- `{{query_url}}` — redirects to admin with a message thread open (Phase 2) or a "contact the artist" prompt (v1: links to artist's profile page).
- `{{credit_role}}` — the role as entered by the artist, e.g. "Mixing Engineer", "Producer".

---

## T11 — Credit Request: From professional (to artist)

**Trigger:** Professional claims a credit on a release during onboarding or admin.
**From:** `ABLE — Credit Verification`
**From address:** `credits@ablemusic.co`
**Subject:** `{{professional_name}} says they worked with you on {{release_title}}`
**Preview text:** `Confirm to add a verified credit to their profile.`

---

{{artist_name}} —

{{professional_name}} has added a credit on {{release_title}} — {{credit_role}}.

If that's right, confirm it. It adds a verified credit to their profile and helps them get discovered through your music.

[Yes, that's right →]({{confirm_url}})

[That's not right →]({{decline_url}})

You have 30 days to respond. If you don't, the credit stays unverified on their profile.

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Token notes:**
- `{{confirm_url}}` — magic link that confirms the credit. Single-use, 30-day expiry.
- `{{decline_url}}` — magic link that declines and removes the credit from the professional's profile.

---

## T12 — Credit Expiry Reminder (5 days before expiry)

**Trigger:** Day 25 of a 30-day credit confirmation window with no response.
**To:** The person who has not yet responded (professional or artist depending on flow).
**From:** `ABLE`
**From address:** `credits@ablemusic.co`
**Subject:** `Credit request expiring soon — {{artist_name}} · {{release_title}}`
**Preview text:** `5 days left to respond.`

---

A credit request is expiring soon.

{{requesting_party}} credited you as {{credit_role}} on {{release_title}} by {{artist_name}}.

You have 5 days to respond before this request expires. After that, you'll need to ask them to resend it.

[Confirm now →]({{confirm_url}})

[Not me →]({{decline_url}})

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Implementation notes:**
- One reminder only. Not a series. Day 25, one email, done. No daily nudges.
- `{{requesting_party}}` — "Nadia" (artist) or "Jake Barlow" (professional) depending on which flow initiated the request.

---

## T13 — Close Circle: Fan joins

**Trigger:** Fan completes Close Circle join flow (payment processed by Stripe).
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `You're in {{artist_name}}'s close circle`
**Preview text:** `Close circle is active.`

---

Close circle is active.

You'll get early access to {{artist_name}}'s music and closer moments when they happen.

Nothing else. No schedule, no feed. Just what {{artist_name}} wants to share.

[{{artist_name}}'s page →]({{page_url}})

—

ABLE · ablemusic.co
[Manage close circle →]({{billing_portal_url}})

---

**Implementation notes:**
- "Close circle is active." — statement. Not "Welcome to the close circle!" Not "You're in!" Not "Subscription confirmed."
- "Nothing else. No schedule, no feed." — this manages expectations honestly. The fan is not signing up for a content feed. They are choosing to stay close. If the artist goes quiet for three months and releases something, the fan should feel that was always the deal.
- `{{billing_portal_url}}` — Stripe Customer Portal link (allows fan to cancel, update payment).
- No price mentioned in this email. The fan agreed to the price before payment — repeating it here adds anxiety. Omit.

---

## T14 — Close Circle: Fan cancels

**Trigger:** Fan cancels Close Circle subscription via Stripe billing portal.
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `Close circle cancelled`
**Preview text:** `Your access has ended.`

---

Your close circle access with {{artist_name}} has ended.

Thanks for supporting them.

You can still follow {{artist_name}} at ablemusic.co/{{artist_slug}}.

—

ABLE · ablemusic.co

---

**Implementation notes:**
- No guilt mechanics. No "We're sorry to see you go." No "Are you sure? You could pause instead." No re-engagement CTA.
- "Thanks for supporting them." — genuine. The fan chose to be close for a time. That's real. Acknowledge it without manufacturing emotion.
- The profile link is provided quietly. The fan may stay as a regular follower. That is fine. There is no pressure.
- This email is sent by Stripe's webhook via a Netlify function — it fires when `customer.subscription.deleted` event is received.

---

## T15 — Free Tier Fan Cap: Warning (80 fans)

**No email.** In-app notification only. See `NOTIFICATIONS.md` §6.1.

---

## T16 — Free Tier Fan Cap: Full (100 fans reached)

**Trigger:** Fan count on Free tier reaches 100.
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `Your fan list is full`
**Preview text:** `New fans can't sign up right now.`

---

Your fan list has reached the 100-fan limit on the Free tier.

New fans visiting your page can't sign up until you upgrade or make room.

Artist tier removes this limit, unlocks broadcasts, and lets you email your fans directly.

[See what's included →]({{pricing_url}})

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Implementation notes:**
- Sent once only. Not a daily reminder.
- No urgency language. No "Act now." No "Fans are being turned away every day."
- `{{pricing_url}}` = `ablemusic.co/pricing?ref=email-tier-cap`

---

## T17 — Release Countdown: 7 days

**Trigger:** `release_date - now = 7 days` (n8n daily schedule check).
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `{{release_title}} — one week`
**Preview text:** `Check your pre-save link is live.`

---

One week until {{release_title}}.

Make sure your pre-save link is live on your page. Fans who visit before the drop need somewhere to go.

[Check your page →]({{page_url}})
[Open dashboard →]({{dashboard_url}})

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Implementation notes:**
- Calm and practical. Not "You're almost there!" Not "The big day is coming!"
- One week is the appropriate point to remind — enough time to set up a pre-save if they haven't.
- `{{page_url}}` = `ablemusic.co/{{artist_slug}}` (so the artist can see what their fans see)
- `{{dashboard_url}}` = `ablemusic.co/admin?ref=email-release-7d`

---

## T18 — Monthly Digest (Artist Pro only)

**Trigger:** 1st of each month, for all Artist Pro accounts.
**From:** `ABLE`
**From address:** `hello@ablemusic.co`
**Subject:** `Your ABLE month — {{month}} {{year}}`
**Preview text:** `{{page_views}} views · {{new_fans}} new fans`

---

{{month}} for {{artist_name}}.

Page views: {{page_views}}
New fans: {{new_fans}}
Total fans: {{total_fans}}

Top CTA: {{top_cta_label}} ({{top_cta_clicks}} clicks)

{{broadcast_line}}

{{editorial_line}}

[Open your dashboard →]({{dashboard_url}})

—

ABLE · ablemusic.co
[Manage email preferences]

---

**Token notes:**

`{{broadcast_line}}` — conditional:
- If broadcasts sent this month: `Broadcasts: {{broadcast_count}} sent · {{broadcast_open_rate}}% opened`
- If none sent: omit this line entirely.

`{{editorial_line}}` — one short, honest line of context from ABLE. Written programmatically from the data. Examples:
- "Steady month. Your pre-save page saw the most traffic."
- "Quiet month. Your fans are still there."
- "Big one — new fans up 340% vs last month. The TikTok timing helped."
- "{{new_fans}} new fans. No broadcasts yet — they're waiting to hear from you."

This line must feel human. It is not a data point — it is ABLE noticing what happened. If no interesting pattern exists: "{{month}} was quiet. Your page had {{page_views}} views." That honesty is the point.

---

## Copy reference — admin.html notification bell

Notification copy (the in-app versions of the above triggers). These are written in this document to keep all copy in one canonical place.

| Trigger | Copy | Sub-copy |
|---|---|---|
| Fan signs up | `Someone signed up.` | `[email] · via [source]` |
| Fan milestone: 1 | `Your first fan just signed up.` | `[email] · via [source]` |
| Fan milestone: 10 | `10 people are following your journey.` | `That's a small room full.` |
| Fan milestone: 100 | `100 fans.` | `That's a sold-out small venue.` |
| Fan milestone: 1,000 | `1,000 people signed up to follow you.` | `That matters.` |
| Email bounce | `Email to [address] didn't deliver.` | `This fan's email may be invalid.` |
| Credit sent to professional | `Credit request sent to [name].` | `They have 30 days to confirm.` |
| Credit confirmed | `[Name] confirmed your credit.` | `[Role] on [Release] is now verified on their profile.` |
| Credit declined | `[Name] declined the credit on [Release].` | `You can try again or remove the request.` |
| Credit expired | `The credit request for [Name] on [Release] has expired.` | `You can resend or remove the credit.` |
| Professional claims credit | `[Name] added a credit to [Release].` | `Confirm if that's right.` |
| Release in 7 days | `Your release is in 7 days.` | `Make sure your pre-save CTA is set.` |
| Release goes live | `It's out. [Release] is live.` | `Your page has switched to Live mode.` |
| Live window closing | `Your page returns to profile mode tomorrow.` | `The stream CTA stays, but the Live card steps back.` |
| Gig mode: 2h warning | `Your show starts in 2 hours.` | `Gig mode activates at [time].` |
| Gig mode: deactivated | `Your page has returned to profile mode.` | `Gig mode ran for [N] hours.` |
| Fan cap: 80 | `You're 20 fans away from the Free tier limit.` | `Your next fans won't be added unless you upgrade.` |
| Fan cap: 100 | `Your fan list is full on the Free tier.` | `New fans are not being added. Upgrade to continue.` |
| Someone joins Close Circle | `Someone joined your close circle.` | `[N] supporters now.` |
| Someone leaves Close Circle | `Someone left your close circle.` | `You now have [N] supporters.` |
| Broadcast sent (confirmation) | `Your message was sent.` | `[N] people will receive it.` |
| Day 3 nudge | `Your page has had [X] views.` | `Add a release to give people something to stream.` |
| Day 7 nudge | `Artists with a release date set get more sign-ups.` | `Even if it's months away — a date gives people something to follow.` |
| Day 14 nudge | `You've had [N] people sign up.` | `You haven't written to them yet. When you're ready, you can.` |

---

*All email copy is written here and implemented from here. Engineers should not write email copy independently — pull from this document.*
