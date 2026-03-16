# ABLE — Email (Resend) Spec
**Created: 2026-03-16 | Covers: fan confirmation, magic link, artist broadcasts**

> Resend handles all transactional email for ABLE. The canonical copy and template spec for every email is in `docs/systems/email/SPEC.md`. This file covers the API integration: auth, request format, delivery architecture, and compliance requirements. A developer reading this file has everything needed to implement or debug any ABLE email.

---

## What we use it for

1. **Fan confirmation email** — sent within 60 seconds of a fan signing up on an artist's profile page. From name is the artist. Content changes based on the artist's current campaign state.
2. **Magic link auth email** — Supabase sends this natively, but ABLE customises the template via Supabase's email settings to match ABLE voice.
3. **Artist broadcasts** — artist-initiated emails to their full fan list (Pro tier). Built in admin.html, sent via Resend. Phase 2.

---

## Auth

All Resend API calls require:
```
Authorization: Bearer {RESEND_API_KEY}
```

This header is added server-side inside Netlify functions only. The API key must never appear in client-side HTML, JS, or anywhere git-tracked.

Resend API base URL: `https://api.resend.com`

---

## Email 1: Fan confirmation (`netlify/functions/fan-confirmation.js`)

### Status: Built — needs `RESEND_API_KEY` in Netlify env to activate

The function is at `netlify/functions/fan-confirmation.js`. It sends different copy depending on the artist's active campaign state.

**Called from:** `able-v7.html` sign-up submit handler
```javascript
fetch('/.netlify/functions/fan-confirmation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fan_email:     'fan@example.com',
    fan_name:      'Alex',            // optional
    artist_name:   'Nadia',
    artist_slug:   'nadia',
    page_state:    'pre-release',     // 'profile'|'pre-release'|'live'|'gig'
    release_title: 'Echoes',          // optional
    release_date:  '2026-03-18',      // optional, ISO date
    presave_url:   'https://...',     // optional
    stream_url:    'https://...',     // optional
    venue_name:    null,              // gig state only
    ticket_url:    null,              // gig state only
    source:        'ig',              // SourceValue from data-architecture SPEC
  })
})
```

**Resend API call inside the function:**
```javascript
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from:    `${artistName} <${fromAddr}>`,  // artist name as from-name
    to:      [fanEmail],
    subject: subjectLine,                     // varies by campaign state
    html:    htmlBody,                        // rendered server-side
  }),
});
```

**Subject line formula by campaign state:**
| State | Subject | Example |
|---|---|---|
| `profile` | `{artistName} — you're in the loop` | `Nadia — you're in the loop` |
| `pre-release` | `{releaseTitle} — {N} days` | `Echoes — 3 days` |
| `live` | `{releaseTitle} is out` | `Echoes is out` |
| `gig` | `Tonight at {venueName}` | `Tonight at The Jazz Café` |

Full email copy for all 4 states is in `docs/systems/email/SPEC.md §3`.

---

## Email 2: Magic link auth

Supabase Auth sends this natively when `supabase.auth.signInWithOtp({ email })` is called. ABLE does not call Resend directly for this email.

However, Supabase's default email template is generic and does not match ABLE's voice. It must be replaced. Template is configured in Supabase Dashboard → Authentication → Email Templates.

**Correct copy for the magic link email:**

Subject: `Your ABLE link`
From: `ABLE`

Body:
```
Here's your sign-in link. It's valid for 10 minutes.

[Sign in to ABLE →] ({{ .ConfirmationURL }})

If you didn't request this, ignore it.

—

ABLE · ablemusic.co
```

Do not use Supabase's default "Confirm your account" or "Welcome" language. See `docs/systems/email/SPEC.md §5` for guidance.

---

## Email 3: Artist broadcasts (Phase 2)

Artist writes a short message in admin.html (Pro tier feature). ABLE sends it to all fans in the artist's `able_fans` array (or Supabase `fans` table once live).

**Rate limits to know:**
| Resend tier | Limit | Applies when |
|---|---|---|
| Free | 100 emails/day, 3,000/month | Early beta (sufficient for < 100 fans per artist) |
| Paid ($20/mo) | 50,000 emails/day | Needed once any artist has > 100 fans |

For a 2,000-fan list, a single broadcast is 2,000 emails. This requires Resend paid tier.

**Broadcast function (not yet built):** `netlify/functions/fan-broadcast.js`

Broadcasts must only send to fans who have `optIn: true` in their fan record. This is a legal requirement (GDPR consent), not an optional filter.

---

## DNS requirements (required before sending to real users)

These DNS records must be set on the `ablemusic.co` domain before any email is sent in production. Without them, emails will land in spam or be rejected.

| Record type | Value |
|---|---|
| SPF | `v=spf1 include:_spf.resend.com ~all` |
| DKIM | CNAME records provided by Resend Dashboard (3 records) |
| DMARC | `v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co` (monitor mode initially) |

Sending domain: `mail.ablemusic.co`. From addresses: `noreply@ablemusic.co` (platform), `{name}@mail.ablemusic.co` (artist fan emails).

---

## GDPR compliance requirements

Every email ABLE sends must meet these requirements. Non-negotiable before any email goes to a real user.

1. **Unsubscribe link** — present in every email, honoured immediately. Resend handles the `{{unsubscribe_url}}` token natively; the webhook removes the fan from `able_fans` and sets `unsubscribed_at` in the Supabase `fans` table.
2. **Physical address** — `ABLE Labs Ltd · [registered address]` in email footers. Cannot be added until the company is incorporated. Do not send volume email to real users before this.
3. **Consent on record** — fan sign-up form must display: `[Artist name] will send you occasional updates. Powered by ABLE.` The fan record must store `optIn: true` and `consent_ts` (ISO timestamp).
4. **No cross-artist marketing** — ABLE must never use a fan's email (signed up for Artist A) to contact them about Artist B or ABLE's own promotions. This is a product commitment, not just a legal one.

---

## Required environment variables

```
RESEND_API_KEY    → Resend Dashboard → API Keys → Create API key
ABLE_FROM_EMAIL   → Set to: noreply@ablemusic.co
ABLE_BASE_URL     → Set to: https://ablemusic.co
```

---

## Current score and path to complete

**Score: 7/10 → 9/10**

What's done: `fan-confirmation.js` is built, email copy for all 4 states is specced.

What's needed:
1. Add `RESEND_API_KEY` to Netlify environment variables
2. Deploy and test with a real email address for each of the 4 campaign states
3. Replace Supabase default magic link template with the ABLE-voice copy above
4. Set up DNS records on `mail.ablemusic.co`
5. Build `fan-broadcast.js` for Phase 2 artist-initiated broadcasts (Pro tier only)
