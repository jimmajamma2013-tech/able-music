# ABLE — Email System Path to 10
**Date: 2026-03-15**
**Current: 4.0/10 → Target: 9.5/10 (spec-complete) → 10 (live + audited)**

---

## P0 — Score: 4.0 → 7.0
**Goal: Fan confirmation email fully specced and wired. First email actually sends.**

This is the only thing that matters before anything else. A fan signs up, an email arrives within 60 seconds, it sounds like the artist wrote it.

---

### P0.1 — Netlify function: `fan-confirmation.js`

Create `netlify/functions/fan-confirmation.js`.

**Interface (full spec in SPEC.md):**

```javascript
// netlify/functions/fan-confirmation.js
// POST body: { fan_email, fan_name, artist_name, artist_slug, page_state,
//              release_title, release_date, presave_url, stream_url,
//              venue_name, ticket_url, source }

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  const data = JSON.parse(event.body);

  // Select template based on page_state
  const { subject, html } = buildEmail(data);

  const result = await resend.emails.send({
    from: `${data.artist_name} <${data.artist_slug}@mail.ablemusic.co>`,
    to: data.fan_email,
    subject,
    html,
    headers: { 'List-Unsubscribe': `<{{unsubscribe_url}}>` }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message_id: result.id })
  };
};
```

The `buildEmail(data)` function switches on `data.page_state` and uses the four body templates defined in SPEC.md.

**Environment variable required:**
- `RESEND_API_KEY` — set in Netlify dashboard, never in code

---

### P0.2 — able-v7.html sign-up handler update

After the fan signs up and the optimistic UI fires ("You're in. I'll keep you close."), the handler must call the Netlify function.

```javascript
// After writing to able_fans localStorage:
fetch('/.netlify/functions/fan-confirmation', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fan_email: email,
    fan_name: name || null,
    artist_name: profile.name,
    artist_slug: profile.slug,
    page_state: profile.stateOverride || computedState,
    release_title: profile.releaseTitle || null,
    release_date: profile.releaseDate || null,
    presave_url: profile.presaveUrl || null,
    stream_url: profile.streamUrl || null,
    venue_name: gigActive ? shows[0]?.venue : null,
    ticket_url: gigActive ? shows[0]?.ticketUrl : null,
    source: urlParams.get('src') || 'direct'
  })
}).catch(() => {}); // fire and forget — UI doesn't wait for delivery
```

The `.catch(() => {})` is intentional — the UI experience is already complete. Email delivery failure is silent to the fan. It is logged in Resend's dashboard.

---

### P0.3 — DNS setup for mail.ablemusic.co

Before any email is sent to real users:
1. Add SPF record: `v=spf1 include:_spf.resend.com ~all`
2. Add Resend DKIM CNAME records (Resend dashboard → Domains → Add)
3. Add DMARC record: `v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co`
4. Verify all three records are live in Resend dashboard before first send

---

### P0.4 — Consent field in able_fans

Add `consent_ts` and `consent_source` to every new fan record:

```javascript
const fanRecord = {
  email,
  ts: Date.now(),
  source: urlParams.get('src') || 'direct',
  consent_ts: new Date().toISOString(),
  consent_source: `profile-signup-${urlParams.get('src') || 'direct'}`
};
```

---

### P0.5 — Sign-up form consent line

Add below the submit button on able-v7.html:

```
[Artist name] will send you occasional updates. Powered by ABLE.
```

In the same small text treatment as existing form helper text. This is the GDPR consent notice.

---

### P0.6 — Source tracking: `?ref=email`

All links in the fan confirmation email append `?ref=email`. When able-v7.html loads with `?ref=email` in the URL, it writes `source: 'email'` into the page view event in `able_views`.

This allows admin.html to show "came back via email" in the source breakdown — closing the loop between fan sign-up and return visit.

---

### P0 quality gates

- [ ] Fan signs up → email arrives within 60 seconds
- [ ] Email from-name is the artist's name, not "ABLE"
- [ ] Four page states produce four different email bodies
- [ ] Pre-release state email contains release title and countdown
- [ ] Gig state email contains venue name and ticket link
- [ ] Unsubscribe link is present and functional
- [ ] `?ref=email` tracked in admin analytics
- [ ] DNS records verified in Resend dashboard
- [ ] Consent line present on sign-up form

---

## P1 — Score: 7.0 → 8.5
**Goal: Artist welcome email. Release broadcast. Magic link auth email.**

---

### P1.1 — Artist welcome email

Create `netlify/functions/artist-welcome.js`.

Trigger: start.html Done screen fires `fetch('/.netlify/functions/artist-welcome', { ... })` after writing `able_v3_profile` to localStorage.

Payload: `{ artist_name, artist_slug, artist_email }` — artist email captured in start.html wizard (add email field to wizard Screen 1 or between Screen 3 and Screen 4).

Email spec: full copy in SPEC.md (Email 2). Subject: `Your page is live, [Artist name]`. From: `ABLE`. Body: 40-60 words, one next step, dashboard link.

---

### P1.2 — Release reminder broadcast

Add "Email your fans" CTA to admin.html Campaign HQ panel, visible when `page_state === 'live'`.

Admin copy: `Your fans are waiting. Send them a note.`
Button: `Email your fans →`

On tap: bottom sheet opens with:
- Optional note field (label: `Say something (optional)`, placeholder: `This is what you'd say to them in person.`, 280 char max)
- Preview of subject line: `Echoes is out`
- Recipient count: `Sending to [N] fans`
- Send button: `Send`

Netlify function: `netlify/functions/artist-broadcast.js`

This function loops through `able_fans` records (or queries Supabase `fans` table when live) and sends one email per fan, rate-limited to 10/second to stay within Resend free tier.

Send-once enforcement: write `able_broadcast_sent_[release_slug]` to localStorage after send. If that key exists, the "Email your fans" CTA shows as "Sent on [date]" instead.

---

### P1.3 — Magic link auth email (Supabase custom template)

Configure in Supabase dashboard → Auth → Email Templates → Magic Link.

Replace default template with the copy from SPEC.md (Email 5). Subject: `Your ABLE link`. Body: 3 lines, one button.

Custom SMTP: configure Supabase to send through Resend SMTP (`smtp.resend.com`) for consistent sending domain and deliverability.

Supabase SMTP settings:
- Host: `smtp.resend.com`
- Port: 465
- User: `resend`
- Password: Resend API key

---

### P1 quality gates

- [ ] Artist completes wizard → welcome email arrives within 5 minutes
- [ ] "Email your fans" CTA visible in admin.html live state
- [ ] Broadcast sends to all fans in able_fans
- [ ] Send-once enforcement works (no duplicate broadcasts)
- [ ] Magic link email uses ABLE template, not Supabase default
- [ ] Magic link from-domain is mail.ablemusic.co

---

## P2 — Score: 8.5 → 9.5
**Goal: Gig reminder broadcast. Fan-name personalisation. Subject line quality. Supabase migration path.**

---

### P2.1 — Gig reminder broadcast

Add "Remind your fans" CTA to admin.html gig mode panel.

Same pattern as release broadcast: bottom sheet, optional note, recipient count, send once per gig activation.

Netlify function: `netlify/functions/gig-broadcast.js` — reuses broadcast pattern from P1.2.

Subject: `Tonight at [Venue]`. Body: the gig state email copy from SPEC.md (Email 4).

---

### P2.2 — Fan-name personalisation

This requires adding a name field to the sign-up form on able-v7.html.

The UX trade-off is real: adding a name field increases friction. The recommendation is an optional name field that appears after the email is entered (two-step: email first, then "What should I call you?" as a secondary field with a Skip option). This is the standard for warm sign-up flows.

When `fan_name` is available, the greeting becomes: `Hey [Fan name] —`
When not available: `Hey —`

This is the only use of fan name. Do not use it elsewhere in the email — "Hey Alex, I just wanted to say thanks for signing up" is exactly the platform-voice creep this system is designed to avoid.

---

### P2.3 — Subject line A/B variants

For the profile state confirmation, two variants to test:

A: `[Artist name] — you're in the loop`
B: `[Artist name]`

Variant B is more minimal. The artist's name alone as a subject line is extremely uncommon in email — it will either have a very high or a very low open rate. Worth testing.

Resend supports batch sends with variant tagging. At ~100+ fan sign-ups per artist, statistical significance is reachable within a few weeks.

---

### P2.4 — Supabase migration path

When Supabase auth is live:
- `able_fans` localStorage data flushes to `fans` table on first artist login
- `netlify/functions/fan-confirmation.js` reads from Supabase instead of receiving all data from client (reduces trust boundary — client should not be the source of truth for what email is sent)
- Artist email (for welcome) stored in Supabase `profiles` table, not in a Netlify function payload
- Broadcast functions query `fans` table directly via Supabase service key

The architectural shift: client fires event → Netlify function → Supabase for all artist/fan data → Resend for send.

This removes the risk of a client sending a crafted payload to spoof the artist name or page state in the email.

---

### P2 quality gates

- [ ] Gig reminder broadcast builds and sends correctly
- [ ] Fan name appears in greeting when captured
- [ ] A/B subject line testing wired via Resend batch API
- [ ] Supabase migration path documented in `docs/systems/email/MIGRATION.md`
- [ ] Resend → Supabase data flow verified in staging

---

## What gets to 10

10 requires four things that cannot be achieved by spec alone:

1. **Verified deliverability at volume** — sending 500+ emails per month, Resend inbox placement rate above 95% measured over 30 days. Domain reputation is built over time, not configured once.

2. **Artist broadcast rate above 40%** — if fewer than 40% of artists who have fans are using the broadcast feature, the system is failing. 10/10 means artists are comfortable and motivated to send. This requires good UX in admin.html and trust that ABLE isn't spamming on their behalf.

3. **Full compliance audit** — legal review of the consent notice, GDPR Article 13 privacy notice, unsubscribe honour rate tracked, DPA (Data Processing Agreement) in place.

4. **DKIM alignment confirmed** — mail from `nadia@mail.ablemusic.co` passes DKIM, SPF, and DMARC checks in a third-party inbox tester (Mail Tester, GlockApps, or similar) with a score of 10/10.
