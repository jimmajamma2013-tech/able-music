# ABLE — Legal/Compliance Specification
**Created: 2026-03-16 | System: Legal / Compliance**
**Scope: Minimum viable legal for V1 launch**

---

## Principles

1. Legal compliance is a feature, not a bureaucratic overhead. It is part of the trust proposition.
2. ABLE's privacy stance — "Your data. Your relationship." — is a legal commitment, not just copy.
3. Privacy policy and terms of service must be written in plain English. If a fan cannot read it in 90 seconds, it is not good enough.
4. Compliance must not create friction that undermines the fan sign-up experience. The consent line on the sign-up form is minimal, honest, and placed where it belongs.

---

## 1. GDPR Consent on Fan Sign-up Form

### Placement

Below the email input on `able-v7.html`, above or alongside the submit button.

### Copy

```
By signing up, [Artist Name] can contact you about their music.
[Artist Name] owns your contact details — ABLE stores them on their behalf.
Unsubscribe anytime.
```

Where `[Artist Name]` is populated from `able_v3_profile.name`.

Personalised example:
```
By signing up, Nadia can contact you about her music.
Nadia owns your contact details — ABLE stores them on her behalf.
Unsubscribe anytime.
```

### Design requirements

- Font size: 11px, colour: `rgba(text, 0.55)` — present but not dominant
- Must not be hidden, greyed out to invisible, or require scrolling to see
- Must appear before the submit button is tapped — not in a modal afterwards
- No checkbox required (signing up is the affirmative act; PECR and UK GDPR accept this for first-party marketing consent when the purpose is clear and specific)

### Data requirements

When a fan submits the form, write to `able_fans`:
```javascript
{
  email:          'fan@example.com',
  ts:             Date.now(),           // Unix ms
  source:         'ig',                 // from ?src= param
  optIn:          true,                 // always true if they submit the form with consent line present
  consentVersion: '2026-03-16',         // ISO date of the consent copy version
  consentSource:  'profile-signup-ig',  // 'profile-signup-' + source
}
```

`consentVersion` is important: if the consent copy ever changes, the version tells you which copy each fan consented to.

---

## 2. Privacy Policy Page — `/privacy.html`

### Purpose

Required under UK GDPR Articles 13 and 14. Must be linked from the footer of every ABLE page. Must be readable by a non-lawyer.

### Target length

400 words maximum. If it can't fit, the policy is too complicated.

### Structure and copy

---

**Privacy — ABLE**

**What ABLE collects**

When you sign up to hear from an artist on ABLE, we store your email address, the date you signed up, and where you came from (e.g. Instagram). That is all.

We do not collect your IP address. We do not set tracking cookies. We do not build advertising profiles. We use your browser's local storage to run the service — this is not shared with any third party.

**Who controls your data**

The artist whose page you signed up on controls your contact details. ABLE stores them on the artist's behalf but cannot contact you without the artist's permission. Your relationship is with the artist.

**Why we collect it**

So the artist can send you updates about their music, shows, and releases. That is the only purpose.

**Who can see it**

Only the artist you signed up with. ABLE staff can access data only in the event of a technical support request, using a restricted internal tool. We do not share, sell, or cross-promote fan data between artists.

**How long we keep it**

Until the artist deletes their account or you ask us to delete your data. If an artist's account is closed, we delete their fan data within 30 days.

**Your rights**

You have the right to:
- Access a copy of your data (email us at privacy@ablemusic.co)
- Delete your data (same address — we act within 30 days)
- Unsubscribe from an artist's updates (every email has an unsubscribe link)
- Complain to the Information Commissioner's Office (ico.org.uk) if you believe your rights have been violated

**Cookies**

ABLE does not use tracking cookies. We use browser local storage to run the service (saving your preferences, recording sign-ups). This data stays on your device until cleared. When you sign in to ABLE, a secure authentication token is stored in your browser — this is strictly necessary for the service to work.

**Third-party embeds**

Artist pages may include embedded music players (Spotify, YouTube). These are loaded only when you interact with them. When they load, those platforms may set their own cookies — their privacy policies apply.

**Contact**

ABLE Labs Ltd · privacy@ablemusic.co

*Last updated: [DATE]*

---

### Implementation notes

- Create as `/privacy.html` — a standalone static page, minimal design, ABLE header, no artist-specific data
- Link as `Privacy` in the footer of `able-v7.html`, `admin.html`, `start.html`, `landing.html`
- `[DATE]` should be the actual publication date, updated whenever the policy changes
- When a material change is made, increment `consentVersion` in the fan sign-up handler

---

## 3. Terms of Service Page — `/terms.html`

### Purpose

Sets out what ABLE is, what artists and users agree to, and what ABLE's responsibilities are. Primarily protects ABLE from liability for artist-posted content. Also clearly states the 0% model.

### Target length

600 words maximum.

### Structure and copy

---

**Terms of Service — ABLE**

**What ABLE is**

ABLE is a platform that lets artists build a page for their fans. ABLE provides the infrastructure. Artists provide the content. ABLE is a tool, not a publisher — we do not editorially control what artists post on their pages.

**Artist agreement**

By creating an ABLE page, you agree:

- You will not post illegal content of any kind, including but not limited to content that infringes copyright, promotes violence, or exploits minors
- You own or have the right to use all content you upload (artwork, audio, video, images)
- You are responsible for every communication you send to your fans through ABLE
- Your fans' contact details are your responsibility — you must comply with data protection law when contacting them
- You are responsible for any transactions between you and your fans; ABLE is not a party to those transactions

**Fan sign-up**

When a fan signs up on your ABLE page, they are giving their contact details to you, not to ABLE. ABLE stores those details on your behalf. You must treat them accordingly.

**How ABLE works financially**

ABLE charges a monthly subscription fee for paid tiers (Artist: £9/mo, Artist Pro: £19/mo, Label: £49/mo). The free tier is free.

ABLE takes 0% of any transactions between you and your fans. When fans buy merchandise, tickets, or support packs through links on your ABLE page, the full amount goes to you minus Stripe's processing fee (typically 1.4% + 20p for UK/EU cards). ABLE receives none of it.

**What ABLE provides**

- A hosted page at ablemusic.co/[your-slug]
- Storage of your profile data and fan sign-up list
- Email delivery via our sending infrastructure
- Analytics on your page visits and fan sign-ups

ABLE provides the service on a best-efforts basis. We do not guarantee uptime on the free tier. We will notify you before any material changes to the service.

**Prohibited content**

ABLE will remove content that:
- Is illegal under UK law
- Infringes a third party's intellectual property rights
- Is reported and verified as harmful

If your account is suspended for prohibited content, you can appeal by emailing support@ablemusic.co within 14 days.

**Limitation of liability**

ABLE is not liable for the content artists post on their pages, the communications artists send to their fans, or any transactions between artists and fans. ABLE's liability to you is limited to the subscription fees you have paid in the preceding 12 months.

**Governing law**

These terms are governed by the laws of England and Wales. Any disputes will be resolved in the courts of England and Wales.

**Changes to these terms**

If we make material changes to these terms, we will notify you by email at least 14 days before those changes take effect. Continued use of ABLE after that date constitutes acceptance.

**Contact**

ABLE Labs Ltd · support@ablemusic.co

*Last updated: [DATE]*

---

### Implementation notes

- Create as `/terms.html` — standalone static page, same design approach as privacy.html
- Link as `Terms` in the footer of every page alongside `Privacy`
- "ABLE Labs Ltd" is the trading entity — update if the legal entity name changes

---

## 4. localStorage vs Cookies — Compliance Position

### ABLE's current position

ABLE uses browser localStorage for all client-side storage. LocalStorage is not governed by PECR's cookie consent requirements because:

1. PECR applies to "cookies or similar technologies" that store or access information on a device for purposes that are not strictly necessary
2. ABLE's localStorage usage (profile data, fan sign-ups, analytics events, UI preferences) is all strictly necessary for the service to function
3. LocalStorage does not enable cross-site tracking — it is origin-bound and cannot be read by other websites

**Conclusion: No cookie banner is required for localStorage-only storage.**

### When a cookie banner will be required

Reassess when:
1. **Supabase auth is added**: Supabase auth uses a session token that may be stored in a cookie (depending on implementation). If a cookie is set, it must be assessed against the strictly necessary exemption. Auth tokens are strictly necessary — no banner required, but the cookie must be documented in the privacy policy.
2. **Third-party analytics added**: If any third-party analytics (Google Analytics, Mixpanel, etc.) is added, a cookie banner is required immediately.
3. **Advertising or retargeting**: Never on ABLE. This would fundamentally contradict the product's values.

### Third-party embed position

Spotify and YouTube embeds set cookies when loaded. Mitigation:
- Load embeds only on user interaction (click to load), not on page load
- This is already the correct UX approach (embeds that autoload are bad mobile UX regardless of compliance)
- If embeds load on page load, a cookie banner is required

---

## 5. Unsubscribe Architecture

### Requirement

Every email sent to a fan must include a working unsubscribe link. This is required by:
- PECR (UK)
- CAN-SPAM (US)
- ABLE's own privacy commitments

### Footer template

Every outbound fan email must include:

```
—

Powered by ABLE · ablemusic.co
[Unsubscribe]
```

Where `[Unsubscribe]` is a Resend-native unsubscribe link that fires a webhook.

### Unsubscribe webhook handler

When Resend fires the unsubscribe webhook:

1. Locate the fan record in `able_fans` by email + artist_slug
2. Set `unsubscribedAt: Date.now()` on the record (soft delete — never hard-delete)
3. Do not remove the record from the database — the unsubscribe itself is a data point
4. The artist's fan list in admin.html should show unsubscribed fans with a visual indicator ("Unsubscribed") and exclude them from broadcast counts
5. If the fan signs up again in future, clear `unsubscribedAt` and record a new `ts`

### Tombstone retention policy

Unsubscribed fan records are retained indefinitely in the soft-deleted state. This is required to:
- Prevent re-adding a fan who has unsubscribed
- Provide an audit trail of consent and withdrawal

ABLE does not hard-delete unsubscribed fan records unless:
- The fan submits a GDPR Right to Erasure request directly to ABLE
- The artist deletes their entire account (all data deleted within 30 days)

### In localStorage (pre-Supabase)

```javascript
// On unsubscribe webhook (handled server-side in Netlify function):
// Update the fan record in Supabase (post-migration)
// In localStorage phase: mark as unsubscribed
const fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
const idx = fans.findIndex(f => f.email === fanEmail);
if (idx !== -1) {
  fans[idx].unsubscribedAt = Date.now();
  localStorage.setItem('able_fans', JSON.stringify(fans));
}
```

---

## 6. Data Deletion Request Flow

### Fan-initiated deletion (GDPR Right to Erasure)

Fan emails `privacy@ablemusic.co` with subject: "Delete my data"

Process:
1. ABLE identifies all artist accounts that hold a record for that email address
2. Soft-delete all records: set `deleted_at` on each fan row
3. Confirm deletion to the fan within 30 days
4. Do not notify the artist — the artist's analytics counts may change but individual data is not their right to retain against a deletion request

### Artist-initiated fan deletion

Artist can delete individual fan records from admin.html. This is a soft delete (`deleted_at` set). If the fan has a GDPR erasure request, the hard delete is triggered separately by ABLE's privacy process.

### Artist account deletion

When an artist closes their ABLE account:
1. All fan data associated with that account is scheduled for deletion within 30 days
2. Artist receives a final CSV export of their fan list before deletion (they own this data — they may want to migrate it)
3. After 30 days, all rows in `fans`, `clicks`, `views`, `events`, `profiles` are hard-deleted

---

## Summary — minimum viable legal checklist for V1 launch

- [ ] Consent line added to fan sign-up form on `able-v7.html`
- [ ] `optIn` and `consentVersion` fields written to `able_fans` on sign-up
- [ ] `/privacy.html` created and linked from all page footers
- [ ] `/terms.html` created and linked from all page footers
- [ ] Unsubscribe link present in all outbound fan emails (Resend-native)
- [ ] Unsubscribe webhook handler implemented
- [ ] Data deletion request email address (`privacy@ablemusic.co`) active
