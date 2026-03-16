# ABLE — Email System Specification
**Date: 2026-03-15**
**Status: Canonical spec — pre-implementation**

---

## Principles (read before every email you write)

1. The fan confirmation email is from the artist. ABLE is in the footer, quietly.
2. The artist welcome email is warm, one beat, specific to what they just built.
3. No exclamation marks. No "You're all set." No "Welcome aboard."
4. Subject lines are human. They do not sound like a marketing automation system.
5. Unsubscribe is always present and works. Compliance is non-negotiable.
6. If the email could have been sent by any other platform, rewrite it.

---

## Personalisation tokens

These tokens are available at send time from localStorage data. They map 1:1 to Supabase fields when the backend lands.

| Token | Source | Notes |
|---|---|---|
| `{{artist_name}}` | `able_v3_profile.name` | Required on all emails |
| `{{artist_slug}}` | `able_v3_profile.slug` | URL-safe version of name |
| `{{release_title}}` | `able_v3_profile.releaseTitle` | Optional — may be empty |
| `{{release_date}}` | `able_v3_profile.releaseDate` | ISO date string |
| `{{release_date_formatted}}` | derived | e.g. "March 18" |
| `{{days_until_release}}` | derived at send time | integer |
| `{{venue_name}}` | `able_shows[0].venue` | Gig state only |
| `{{show_date}}` | `able_shows[0].date` | Gig state only |
| `{{fan_name}}` | `able_fans[n].name` | Optional — only if captured in sign-up form |
| `{{fan_email}}` | `able_fans[n].email` | Required for unsubscribe |
| `{{page_url}}` | derived | `ablemusic.co/{{artist_slug}}?ref=email` |
| `{{unsubscribe_url}}` | Resend native | Auto-generated per recipient |
| `{{fan_dashboard_url}}` | static | `ablemusic.co/fan` |

---

## Email 1: Fan Confirmation

### Overview

This email is sent within 60 seconds of a fan signing up from an artist's profile page. It must feel like the artist wrote it. ABLE's name appears only in the footer. The body content changes based on which page state the artist was in when the fan signed up — the state is captured at sign-up time and stored alongside the fan record.

### Trigger

Fan submits email in the sign-up form on able-v7.html. The Netlify function receives: `{ artist_slug, fan_email, fan_name (optional), page_state, release_title (if applicable), release_date (if applicable), venue_name (if gig), source }`.

### From name

`{{artist_name}}`

The email should appear to come from the artist. Not "ABLE" or "ABLE Music" or "[Artist] via ABLE." The artist's name is the from-name. This is the standard for artist-owned fan relationships.

When Supabase auth is live and artists have verified domains: use the artist's own sending domain if configured. Default fallback: `nadia@mail.ablemusic.co` with display name `Nadia`.

### Subject line formula

The subject line should be short, specific, and feel personal — not automated.

**Profile state:** `[Artist name] — you're in the loop`
**Pre-release state:** `[Release title] — [N] days`
**Live state:** `[Release title] is out`
**Gig state:** `Tonight at [Venue name]`

Examples:
- `Nadia — you're in the loop`
- `Echoes — 3 days`
- `Echoes is out`
- `Tonight at The Jazz Café`

Subject line rules:
- No "Re:", no emoji, no brackets except as shown
- Never "Welcome", "Confirmation", "You've subscribed"
- The pre-release subject line is the release title + countdown — immediate, specific
- The live state subject is a statement, not an announcement

### Footer (all states)

```
—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

The unsubscribe link is Resend-native and fires a webhook that removes the fan from `able_fans` for that artist. No ABLE branding beyond "Powered by ABLE" in small text. No social links in the footer — this is the artist's email, not ABLE's newsletter.

---

### Full email bodies — all 4 states

---

#### STATE 1: Profile (default — artist active, no active campaign)

**Subject:** `Nadia — you're in the loop`
**From:** `Nadia`

---

Hey —

It's Nadia.

You signed up, so I'll keep you in the loop. That means new music when I drop it, shows when I'm playing near you, and anything else I think is worth sharing.

Nothing else, nothing automated. Just me.

[See my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** The phrase "nothing automated" is load-bearing. It is technically a lie once this is sent via Resend, but in spirit it is true: the content of the email is entirely the artist's, the list is the artist's, and no platform is mediating the relationship. The copy is honest about what the fan is signing up for. It doesn't oversell. It doesn't thank them for signing up (that's platform language).

---

#### STATE 2: Pre-release (release date set in the future)

**Subject:** `Echoes — 3 days`
**From:** `Nadia`

---

Hey —

It's Nadia. You signed up right before something.

Echoes comes out in 3 days — March 18th. Pre-save it now if you want it to land in your library the moment it's out.

[Pre-save Echoes →]({{presave_url}})

I'll be in touch when it's live.

[See what's coming →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** "You signed up right before something" — this is the single most important sentence in this variant. It creates a sense of timing, of the fan arriving at the right moment. It is not manufactured urgency — the release date is real. The pre-save CTA is the primary action. The page link is secondary. No padding, no explanation of ABLE.

Note on token: `{{presave_url}}` comes from `able_v3_profile.presaveUrl` if set. If not set, omit the pre-save paragraph and go straight to the page link.

---

#### STATE 3: Live (release date reached, within 14-day live window)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out today.

[Stream it →]({{stream_url}})

I put a lot of time into this one. I hope it lands the way it's meant to.

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** The line "I put a lot of time into this one. I hope it lands the way it's meant to." — this is placeholder artist voice. In the final system, this line should come from the artist's profile — a short "release note" field in admin.html where the artist can write one or two sentences about the record. If they haven't filled it in, the paragraph is omitted. The default body without it:

---

Hey —

It's Nadia. Echoes is out.

[Stream it →]({{stream_url}})

[Listen on my page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Note on stream_url:** This is `able_v3_profile.streamUrl` — the primary streaming platform URL. If not set, only the page link is shown.

---

#### STATE 4: Gig (24-hour gig mode active)

**Subject:** `Tonight at The Jazz Café`
**From:** `Nadia`

---

Hey —

It's Nadia. I'm playing tonight.

The Jazz Café, London. Doors at 7:30.

[Tickets →]({{ticket_url}})

See you there.

[My page →]({{page_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Guidance:** This is the shortest email in the system. That is correct. When an artist is playing tonight, there is one thing the fan needs: the ticket link. Everything else is noise. "See you there" is warm and confident without being saccharine. The fan got an email that says exactly what they needed to know — and nothing else.

Note: `{{ticket_url}}` from `able_shows[0].ticketUrl`. If no ticket URL, replace with: "There may still be tickets at the door." and omit the ticket link button.

---

## Email 2: Artist Welcome

### Overview

Sent within 5 minutes of wizard completion on start.html. The trigger is the wizard Done screen reaching a final state — the artist has a live page. This email confirms the page is live, gives them the direct URL, and has one next step.

### Trigger

start.html Done screen rendered, `able_v3_profile` written to localStorage with `slug` field populated.

### From name

`ABLE`

### Subject line

`Your page is live, [Artist name]`

Example: `Your page is live, Nadia`

No exclamation mark. Statement, not celebration.

### Full email body

**Subject:** `Your page is live, Nadia`
**From:** `ABLE`

---

Good to see you here.

Your page is live at ablemusic.co/nadia.

The next thing: put that URL in your Instagram bio. That's where your fans will start finding you.

When you're ready, your dashboard is where you run everything.

[Open your dashboard →]({{dashboard_url}})

—

ABLE · ablemusic.co

---

**Guidance:** "Good to see you here" echoes the dashboard greeting style ("Good to see you, Nadia.") — ABLE's register is warm, one beat. "The next thing" is a single actionable step, not a checklist. The email is under 60 words. That is the target.

---

## Email 3: Release Reminder Broadcast (artist-initiated)

### Overview

Artist taps "Email your fans" from admin.html after setting release to Live state. This is a one-time broadcast to all fans in `able_fans`. The artist can write a short personal note (optional) or send the default. This is a Phase 1 feature.

### Trigger

Artist-initiated via admin.html CTA. Available only when page state is `live`. Sends once — ABLE prevents a second send within the same 14-day live window.

### From name

`{{artist_name}}`

### Subject line

`{{release_title}} is out`

Example: `Echoes is out`

### Full email body (default — no artist note added)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out today.

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

### Full email body (with artist note — artist writes 1-3 sentences in admin.html)

**Subject:** `Echoes is out`
**From:** `Nadia`

---

Hey —

It's Nadia. Echoes is out.

[ARTIST NOTE APPEARS HERE — verbatim, no editing by ABLE]

[Stream it →]({{stream_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

**Admin.html copy for the artist note field:**
Label: `Say something (optional)`
Placeholder: `This is what you'd say to them in person.`
Character limit: 280 — enough for two honest sentences, not enough for a marketing paragraph.

---

## Email 4: Gig Reminder Broadcast (artist-initiated)

### Overview

Artist taps "Remind your fans" from admin.html on the day of a show, after activating gig mode. Sends to all fans in `able_fans`. Optional short note.

### Trigger

Artist-initiated from admin.html gig mode panel. Available only when gig mode is active. Sends once per gig mode activation.

### From name

`{{artist_name}}`

### Subject line

`Tonight at {{venue_name}}`

Example: `Tonight at The Jazz Café`

### Full email body

**Subject:** `Tonight at The Jazz Café`
**From:** `Nadia`

---

Hey —

Nadia here. Playing tonight at The Jazz Café, London.

Doors 7:30. A few tickets left.

[Get tickets →]({{ticket_url}})

—

Powered by ABLE · ablemusic.co
[Unsubscribe]

---

---

## Email 5: Magic Link Auth

### Overview

Sent by Supabase when an artist (or fan) requests a login link. ABLE must configure a custom HTML template in Supabase's email settings — the Supabase default is unusable at ABLE's quality standard.

### Trigger

Supabase auth: `signInWithOtp({ email })` call.

### From name

`ABLE`

### Subject line

`Your ABLE link`

### Full email body

**Subject:** `Your ABLE link`
**From:** `ABLE`

---

Here's your sign-in link. It's valid for 10 minutes.

[Sign in to ABLE →]({{supabase_magic_link}})

If you didn't request this, ignore it.

—

ABLE · ablemusic.co

---

**Guidance:** No "Welcome back." No "For your security." No "This link will expire soon — act now." Just the link, a time limit, and a reassurance. The link button label is "Sign in to ABLE" — not "Click here" or "Log in" or "Access your account." Specific and calm.

---

## Delivery architecture

### Stack

- **Sending:** Resend.com (recommended)
  - Free tier: 100 emails/day, 3,000/month — sufficient for early beta
  - API: simple POST, excellent deliverability, React Email compatible
  - Dashboard: per-email delivery tracking, bounce handling
- **Function:** Netlify serverless function at `netlify/functions/fan-confirmation.js`
- **Trigger:** called from able-v7.html sign-up submit handler via `fetch('/api/fan-confirmation', { method: 'POST', body: JSON.stringify(payload) })`
- **Template rendering:** server-side in the Netlify function — no client-side token replacement

### Function interface: `fan-confirmation.js`

**Request body:**
```json
{
  "fan_email": "fan@example.com",
  "fan_name": "Alex",
  "artist_name": "Nadia",
  "artist_slug": "nadia",
  "page_state": "pre-release",
  "release_title": "Echoes",
  "release_date": "2026-03-18",
  "presave_url": "https://distrokid.com/hyperfollow/nadia/echoes",
  "stream_url": "https://open.spotify.com/album/xxx",
  "venue_name": null,
  "ticket_url": null,
  "source": "ig"
}
```

**Response:**
```json
{ "success": true, "message_id": "resend_msg_xxx" }
```

**Error response:**
```json
{ "success": false, "error": "invalid_email" }
```

### DNS requirements (sending domain: mail.ablemusic.co)

These must be set before any email is sent to real users:
- `SPF`: `v=spf1 include:_spf.resend.com ~all`
- `DKIM`: Resend-generated CNAME records
- `DMARC`: `v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co` (monitor mode initially)
- `MX` (for replies): not required for transactional email, but recommended for the artist's replies to reach someone

### Source tracking

All links in emails include `?ref=email`. This maps to `source: 'email'` in the `SOURCE_VALUES` canonical list from CROSS_PAGE_JOURNEYS.md.

Fan dashboard link: `ablemusic.co/fan?ref=email-confirm`

This allows admin.html analytics to show "came from confirmation email" as a source in the click breakdown.

---

## Compliance

### GDPR

- Sign-up form must include: `[Artist name] will send you occasional updates. Powered by ABLE.` — below the submit button, in small text. This constitutes informed consent for the artist's communications.
- Consent timestamp must be recorded: `able_fans` record should include `consent_ts` (ISO timestamp) and `consent_source` (e.g. "profile-signup-ig").
- Every email must have a working unsubscribe. Resend handles this natively via `unsubscribe_url` token.
- Fan data belongs to the artist. ABLE does not cross-promote fans from artist A to artist B.

### CAN-SPAM (US)

- Physical address: include in footer as "ABLE Labs Ltd · [address]" once company is incorporated. Until then: not sending to US users at volume.
- Unsubscribe must be honoured within 10 business days. Resend's webhook-to-remove pattern achieves this instantly.
- Subject line must not be deceptive. All subject lines in this spec are honest.
