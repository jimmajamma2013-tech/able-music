# ABLE — Email System Path to 10
**Date: 2026-03-16**
**Current: 4.0/10 → Target: 9.5/10 (spec-complete) → 10 (live + audited)**

---

## Critical dependency

**Email P0 must be live before the first outreach DM is sent to an artist.**

When the first DM goes out ("Here's your ABLE page — take a look"), artists will try it. Some will sign up as fans under test conditions. Some real fans will sign up. If no confirmation email arrives, or if it arrives as a generic Resend test email or a Supabase notification, the artist will see that and it will undermine trust before the product has a chance to demonstrate its value.

The entire lead generation system depends on this working correctly. Do not send the first outreach DM until the fan confirmation email is tested end-to-end with a real email address.

---

## P0 — Score: 4.0 → 8.0
**Goal: Fan confirmation email fully specced, wired, and sending. DNS live. GDPR baseline in place.**

This is the only thing that matters before anything else. A fan signs up. An email arrives within 60 seconds. It sounds like the artist wrote it.

---

### P0.1 — Resend account setup

1. Create Resend account at resend.com
2. Add domain `mail.ablemusic.co` in Resend dashboard → Domains
3. Resend will provide CNAME records for DKIM — copy these ready for P0.3
4. Generate API key — store as Netlify environment variable `RESEND_API_KEY`

**Note:** Resend free tier is 100 emails/day, 3,000/month. Sufficient for beta. No credit card required initially.

---

### P0.2 — Netlify function: `fan-confirmation.js`

Create `netlify/functions/fan-confirmation.js`. This is the server-side function that receives fan sign-up data, selects the correct email template based on `page_state`, and calls the Resend API.

**Full function structure:**

```javascript
// netlify/functions/fan-confirmation.js
// POST body: { fan_email, fan_name, artist_name, artist_slug, page_state,
//              release_title, release_date, presave_url, stream_url,
//              venue_name, ticket_url, source }

const { Resend } = require('resend');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405 };

  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'invalid_body' }) };
  }

  if (!data.fan_email || !data.artist_name || !data.artist_slug) {
    return { statusCode: 400, body: JSON.stringify({ error: 'missing_required_fields' }) };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, html } = buildEmail(data);

  try {
    const result = await resend.emails.send({
      from: `${data.artist_name} <${data.artist_slug}@mail.ablemusic.co>`,
      to: data.fan_email,
      subject,
      html,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message_id: result.id })
    };
  } catch (err) {
    console.error('Resend error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'send_failed' })
    };
  }
};
```

**The `buildEmail(data)` function** switches on `data.page_state` and uses the four body templates from `docs/systems/email/SPEC.md` and `docs/systems/notifications/EMAIL-TEMPLATES.md`. Exact copy:

**Profile state (T01):**
```javascript
case 'profile':
  subject = `${data.artist_name} — you're in the loop`;
  html = `
    <p>Hey —</p>
    <p>It's ${data.artist_name}.</p>
    <p>You signed up, so I'll keep you in the loop. That means new music when I drop it,
    shows when I'm playing near you, and anything else I think is worth sharing.</p>
    <p>Nothing else, nothing automated. Just me.</p>
    <p><a href="${pageUrl(data)}">See my page →</a></p>
    ${footer()}
  `;
```

**Pre-release state (T02):**
```javascript
case 'pre-release':
  const daysUntil = daysUntilRelease(data.release_date);
  subject = `${data.release_title} — ${daysUntil} day${daysUntil === 1 ? '' : 's'}`;
  html = `
    <p>Hey —</p>
    <p>It's ${data.artist_name}. You signed up right before something.</p>
    <p>${data.release_title} comes out in ${daysUntil} day${daysUntil === 1 ? '' : 's'} — ${formatDate(data.release_date)}.
    ${data.presave_url ? `Pre-save it now if you want it to land in your library the moment it's out.` : ''}</p>
    ${data.presave_url ? `<p><a href="${data.presave_url}">Pre-save ${data.release_title} →</a></p>` : ''}
    <p>I'll be in touch when it's live.</p>
    <p><a href="${pageUrl(data)}">See what's coming →</a></p>
    ${footer()}
  `;
```

**Live state (T03):**
```javascript
case 'live':
  subject = `${data.release_title} is out`;
  html = `
    <p>Hey —</p>
    <p>It's ${data.artist_name}. ${data.release_title} is out today.</p>
    ${data.stream_url ? `<p><a href="${data.stream_url}">Stream it →</a></p>` : ''}
    <p><a href="${pageUrl(data)}">Listen on my page →</a></p>
    ${footer()}
  `;
```

**Gig state (T04):**
```javascript
case 'gig':
  subject = `Tonight at ${data.venue_name}`;
  html = `
    <p>Hey —</p>
    <p>It's ${data.artist_name}. I'm playing tonight.</p>
    <p>${data.venue_name}${data.venue_city ? `, ${data.venue_city}` : ''}. ${data.doors_time ? `Doors at ${data.doors_time}.` : ''}</p>
    ${data.ticket_url ? `<p><a href="${data.ticket_url}">Tickets →</a></p>` : '<p>There may still be tickets at the door.</p>'}
    <p>See you there.</p>
    <p><a href="${pageUrl(data)}">My page →</a></p>
    ${footer()}
  `;
```

**Helper functions:**
```javascript
function pageUrl(data) {
  return `https://ablemusic.co/${data.artist_slug}?ref=email`;
}

function footer() {
  return `
    <p>—</p>
    <p style="font-size:12px;color:#888;">
      Powered by ABLE · <a href="https://ablemusic.co">ablemusic.co</a>
      &nbsp;&nbsp;<a href="{{unsubscribe_url}}">Unsubscribe</a>
    </p>
  `;
}

function daysUntilRelease(isoDate) {
  const now = new Date();
  const release = new Date(isoDate);
  return Math.max(1, Math.ceil((release - now) / 86400000));
}

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}
```

**Environment variable required:**
- `RESEND_API_KEY` — set in Netlify dashboard → Site settings → Environment variables. Never in code.

---

### P0.3 — DNS records for mail.ablemusic.co

These must be set before any email is sent to real users. Without them, emails fail DKIM/SPF checks and land in spam or are rejected.

**Set these DNS records at your domain registrar or Cloudflare:**

**SPF record:**
```
Type: TXT
Name: @ (or ablemusic.co)
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

**DKIM records (CNAME — Resend provides the exact values after you add the domain):**
```
Type: CNAME
Name: resend._domainkey.mail     (Resend provides exact name)
Value: [provided by Resend dashboard after domain add]
TTL: 3600
```
Resend typically provides 3 CNAME records for DKIM. Add all of them.

**DMARC record:**
```
Type: TXT
Name: _dmarc.mail              (or _dmarc.mail.ablemusic.co)
Value: v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co
TTL: 3600
```

Start with `p=none` (monitor mode). After 30 days of clean sending, move to `p=quarantine`. After 90 days, `p=reject`.

**Verify all records are live:**
1. Resend dashboard → Domains → your domain → all records show green checkmarks
2. Use MXToolbox (mxtoolbox.com/SuperTool.aspx) to verify SPF and DMARC
3. Send a test email to a Mail Tester address (mail-tester.com) and confirm score ≥ 8/10

---

### P0.4 — Consent field in able_fans

Add `consent_ts` and `consent_source` to every new fan record written to `able_fans`:

```javascript
const fanRecord = {
  email,
  ts: Date.now(),
  source: urlParams.get('src') || 'direct',
  consent_ts: new Date().toISOString(),
  consent_source: `profile-signup-${urlParams.get('src') || 'direct'}`
};
```

This provides the GDPR audit trail showing when consent was given and from which context.

---

### P0.5 — Consent notice on sign-up form (able-v7.html)

Add below the submit button on the fan sign-up form. Use the same small text treatment as existing form helper text:

```html
<p class="signup-consent-notice">
  <span id="consentArtistName">{{artist_name}}</span> will send you occasional updates.
  Powered by ABLE.
</p>
```

CSS:
```css
.signup-consent-notice {
  font-size: 11px;
  color: var(--color-text-3);
  margin: 6px 0 0;
  text-align: center;
  line-height: 1.4;
}
```

This is the GDPR consent notice. It must be visible before the fan submits the form, not hidden below the fold.

---

### P0.6 — able-v7.html sign-up handler update

After the fan signs up and the optimistic UI fires, call the Netlify function. This is fire-and-forget — the UI does not wait for email delivery:

```javascript
// After writing to able_fans localStorage, call the email function
// Fire and forget — never block the UI on email delivery
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
    venue_city: gigActive ? shows[0]?.city : null,
    doors_time: gigActive ? shows[0]?.doorsTime : null,
    ticket_url: gigActive ? shows[0]?.ticketUrl : null,
    source: urlParams.get('src') || 'direct'
  })
}).catch(() => {}); // Email delivery failure is silent to the fan — logged in Resend dashboard
```

---

### P0 quality gates

- [ ] Fan signs up → email arrives in inbox within 60 seconds
- [ ] Email from-name is the artist's name, not "ABLE"
- [ ] Four page states produce four different email bodies
- [ ] Pre-release state email contains release title and countdown
- [ ] Gig state email contains venue name and ticket link (or "door" fallback)
- [ ] Footer contains working unsubscribe link (Resend-native)
- [ ] `?ref=email` tracked in admin analytics when fan returns via email link
- [ ] All three DNS records verified in Resend dashboard (green checkmarks)
- [ ] Consent line present on sign-up form before submit button
- [ ] `consent_ts` and `consent_source` written to `able_fans` records
- [ ] Test email scores ≥ 8/10 on mail-tester.com

---

## P1 — Score: 8.0 → 8.5
**Goal: Artist welcome email. Release broadcast. Magic link auth email.**

---

### P1.1 — Artist welcome email

Create `netlify/functions/artist-welcome.js`.

Trigger: start.html Done screen fires after writing `able_v3_profile` to localStorage. The artist must have entered their email address in the wizard (add email field to start.html Screen 1, between name and accent colour — required field).

Payload: `{ artist_name, artist_slug, artist_email }`

**Exact email copy (from EMAIL-TEMPLATES.md T05):**

```
Subject: Your page is live, [Artist name]
From: ABLE

Good to see you here.

Your page is live at ablemusic.co/[slug].

The next thing: put that URL in your Instagram bio. That's where your fans will start finding you.

When you're ready, your dashboard is where you run everything.

[Open your dashboard →](https://ablemusic.co/admin)

—

ABLE · ablemusic.co
```

No exclamation mark. Statement, not celebration. Under 60 words. One next step.

---

### P1.2 — Release reminder broadcast

Add "Email your fans" CTA to admin.html Campaign HQ panel, visible only when `page_state === 'live'`.

Admin copy:
- Label: `Your fans are waiting. Send them a note.`
- Button: `Email your fans →`

On tap: bottom sheet with optional note field (label: `Say something (optional)`, placeholder: `This is what you'd say to them in person.`, 280 char max), preview of subject line, recipient count, send button.

Netlify function: `netlify/functions/artist-broadcast.js` — loops through `able_fans` and sends one email per fan, rate-limited to 10/second.

Send-once enforcement: write `able_broadcast_sent_[release_slug]` to localStorage after send. If that key exists, the CTA shows "Sent on [date]" instead.

**Exact email copy (from EMAIL-TEMPLATES.md T06 — default, no artist note):**

```
Subject: [Release title] is out
From: [Artist name]

Hey —

It's [Artist name]. [Release title] is out today.

[Stream it →]

—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

---

### P1.3 — Magic link auth email (Supabase custom template)

Configure in Supabase dashboard → Auth → Email Templates → Magic Link.

Replace default template with the copy from EMAIL-TEMPLATES.md T09:

```
Subject: Your ABLE link
From: ABLE

Here's your sign-in link. It's valid for 10 minutes.

[Sign in to ABLE →]

If you didn't request this, ignore it.

—

ABLE · ablemusic.co
```

Configure Supabase to send through Resend SMTP for consistent deliverability:
- Host: `smtp.resend.com`
- Port: 465
- User: `resend`
- Password: Resend API key (same as `RESEND_API_KEY`)

---

### P1 quality gates

- [ ] Artist completes wizard → welcome email arrives within 5 minutes
- [ ] "Email your fans" CTA visible in admin.html live state
- [ ] Broadcast sends to all fans in able_fans
- [ ] Send-once enforcement works (no duplicate broadcasts)
- [ ] Magic link email uses ABLE template, not Supabase default
- [ ] Magic link sends from mail.ablemusic.co (not Supabase's default domain)

---

## P2 — Score: 8.5 → 9.5
**Goal: Gig reminder broadcast. Fan-name personalisation. Supabase migration path.**

---

### P2.1 — Gig reminder broadcast

Add "Remind your fans" CTA to admin.html gig mode panel.

Same pattern as release broadcast: bottom sheet, optional note, recipient count, send once per gig activation.

Netlify function: `netlify/functions/gig-broadcast.js` — reuses broadcast pattern from P1.2.

**Exact email copy (from EMAIL-TEMPLATES.md T08):**

```
Subject: Tonight at [Venue name]
From: [Artist name]

Hey —

[Artist name] here. Playing tonight at [Venue], [City].

Doors [time]. A few tickets left.

[Get tickets →]

—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

---

### P2.2 — Fan-name personalisation

Add optional name field to sign-up form on able-v7.html. Two-step: email first, then "What should I call you?" as a secondary field with a Skip option.

When `fan_name` is available, the greeting becomes: `Hey [Fan name] —`
When not available: `Hey —`

This is the only use of fan name in the email body.

---

### P2.3 — Supabase migration path

When Supabase auth is live:
- `able_fans` localStorage data flushes to `fans` table on first artist login
- `fan-confirmation.js` reads from Supabase instead of receiving all data from client
- Artist email stored in Supabase `profiles` table
- Broadcast functions query `fans` table directly via Supabase service key
- Client fires event → Netlify function → Supabase for all data → Resend for send

This removes the risk of a client sending a crafted payload to spoof the artist name or page state in the email.

---

### P2 quality gates

- [ ] Gig reminder broadcast builds and sends correctly
- [ ] Fan name appears in greeting when captured
- [ ] Supabase migration path documented in `docs/systems/email/MIGRATION.md`
- [ ] Resend → Supabase data flow verified in staging before flush

---

## What gets to 10

10 requires four things that cannot be achieved by spec alone:

1. **Verified deliverability at volume** — sending 500+ emails per month, Resend inbox placement rate above 95% measured over 30 days. Domain reputation is built over time, not configured once.

2. **Artist broadcast rate above 40%** — if fewer than 40% of artists who have fans are using the broadcast feature, the system is failing. 10/10 means artists are comfortable and motivated to send.

3. **Full compliance audit** — legal review of consent notice, GDPR Article 13 privacy notice, unsubscribe honour rate tracked, DPA in place with Resend as sub-processor.

4. **DKIM alignment confirmed** — mail from `nadia@mail.ablemusic.co` passes DKIM, SPF, and DMARC checks in a third-party inbox tester (Mail Tester, GlockApps) with a score of 10/10. DMARC policy moved from `p=none` to `p=quarantine` after 90 days of clean sending.
