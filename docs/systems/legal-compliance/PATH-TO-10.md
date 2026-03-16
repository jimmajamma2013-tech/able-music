# ABLE — Legal/Compliance: Path to 10
**Created: 2026-03-16 | System: Legal / Compliance**

---

## Priority levels

- **P0** — Pre-launch blockers. Do not collect real fan emails without these.
- **P1** — Pre-scale. Required before any marketing or paid tier launch.
- **P2** — Pre-payment. Required before Stripe integration.
- **P3** — Future. Requires legal counsel or external audit.

---

## P0 — Must be done before real users

### P0.1 — GDPR consent line on fan sign-up form

**File:** `able-v7.html` — the fan sign-up section

**What to add:**

Below the email input, above or alongside the submit button, add:

```html
<p class="signup-consent">
  By signing up, <span id="consentArtistName">this artist</span> can contact
  you about their music. They own your contact details — ABLE stores them
  on their behalf. Unsubscribe anytime.
</p>
```

```javascript
// Populate artist name from profile
const profile = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
const consentEl = document.getElementById('consentArtistName');
if (consentEl && profile.name) consentEl.textContent = profile.name;
```

**Write to able_fans on submit:**

```javascript
fans.push({
  email:          emailValue,
  ts:             Date.now(),
  source:         source,
  optIn:          true,
  consentVersion: '2026-03-16',
  consentSource:  `profile-signup-${source}`,
});
```

**Ticket:** `p0-gdpr-consent-form`

---

### P0.2 — Privacy policy page

**File to create:** `/privacy.html`

Use the copy in `SPEC.md §2`. Static page, ABLE header, minimal styling.

Footer link text: `Privacy`

**Add to footers of:**
- `able-v7.html`
- `admin.html`
- `start.html`
- `landing.html`

```html
<a href="/privacy.html">Privacy</a>
```

**Ticket:** `p0-privacy-page`

---

### P0.3 — Unsubscribe in all outbound emails

**File:** `netlify/functions/fan-confirmation.js` (when Resend is wired)

Every email template in `docs/systems/email/SPEC.md` already includes the unsubscribe footer. When Resend is connected, ensure:

1. Resend unsubscribe header is set: `List-Unsubscribe` header included in all sends
2. Unsubscribe webhook endpoint exists: `netlify/functions/fan-unsubscribe.js`
3. Webhook sets `unsubscribedAt` on the fan record

**Ticket:** `p0-unsubscribe-webhook`

---

## P1 — Pre-scale / pre-paid-tier

### P1.1 — Terms of service page

**File to create:** `/terms.html`

Use the copy in `SPEC.md §3`. Same design approach as `/privacy.html`.

Add `Terms` link to all page footers alongside `Privacy`.

**Ticket:** `p1-terms-page`

---

### P1.2 — Data deletion request flow

**What:** A live email address `privacy@ablemusic.co` that someone on the ABLE team monitors. Process documented in `SPEC.md §6`.

No automation required at this stage — manual process is sufficient below 1,000 users.

**Ticket:** `p1-deletion-request-flow`

---

### P1.3 — Fan ownership note in admin.html

The admin DESIGN-SPEC already includes this copy:

```html
<p class="fan-ownership-note">
  These emails are yours. ABLE never contacts your fans without your permission.
</p>
```

Verify this is implemented in `admin.html` — it is both a trust signal and a legal statement.

**Ticket:** `p1-fan-ownership-note-verify`

---

### P1.4 — CAN-SPAM physical address in email footer

**When:** Before sending any emails to US-based fans, or when ABLE Labs Ltd is incorporated with a registered address.

Update the email footer template:

```
—

Powered by ABLE · ablemusic.co
ABLE Labs Ltd · [registered address]
[Unsubscribe]
```

**Ticket:** `p1-can-spam-address`

---

## P2 — Pre-payment (before Stripe)

### P2.1 — Cookie assessment for Supabase auth

When Supabase auth (`signInWithOtp`) is added, determine whether session tokens are stored in cookies or localStorage:

- If cookies: document in privacy policy under "Cookies" section. Strictly necessary — no banner required.
- If localStorage: no change required.

Supabase JS client v2 uses localStorage by default for session persistence. Confirm this remains the case when auth is wired.

**Ticket:** `p2-supabase-auth-cookie-audit`

---

### P2.2 — Stripe SCA compliance

When Stripe is integrated:

- Use Stripe Payment Intents API (not legacy Charges API) — this enables automatic SCA/3DS2
- Do not use Stripe Checkout if customisation is required; use Stripe Elements
- ABLE's liability: SAQ-A PCI tier (no card data touches ABLE servers)
- Document in terms of service: billing terms, refund policy, what subscription fees cover

**Ticket:** `p2-stripe-sca-compliance`

---

### P2.3 — Stripe Connect for fan-to-artist payments

When artist support packs (fan tipping) or direct sales are added:

- Use Stripe Connect (Express accounts) so fan payments go directly to artist's bank
- ABLE never holds artist money
- Platform fee: 0% (ABLE's model)
- Stripe Connect Express: artist onboards via Stripe's hosted flow
- Update terms of service: "ABLE is not a payment processor. Payments are processed by Stripe."

**Ticket:** `p2-stripe-connect`

---

## P3 — Future (requires external counsel)

### P3.1 — GDPR Data Protection Impact Assessment (DPIA)

**When:** Before processing data at scale (10,000+ fans in the system), or before adding any features that involve sensitive data (location, listening behaviour, financial data).

A DPIA is required under GDPR Article 35 when processing is likely to result in a high risk to individuals. The fan data ABLE holds is not inherently high-risk, but a DPIA should be performed before:
- Building the fan.html location feature
- Adding any AI or profiling features
- Cross-referencing fan data across artists

**Ticket:** `p3-dpia`

---

### P3.2 — Data Processing Agreement (DPA) template

**When:** Before any enterprise or Label tier customers sign up.

ABLE is a data processor for artists (the data controllers). A formal DPA must be offered to artists at Label tier. This sets out:
- ABLE's obligations as processor
- Sub-processors ABLE uses (Supabase, Resend, Netlify)
- International transfer safeguards (if any data leaves the UK/EEA)
- Breach notification obligations

**Ticket:** `p3-dpa-template`

---

### P3.3 — ICO registration

ABLE Labs Ltd should register with the Information Commissioner's Office (ICO) as a data controller. This is required for any UK organisation that processes personal data, with limited exemptions.

Fee: £40/year (Tier 1 for small organisations).

**Ticket:** `p3-ico-registration`

---

### P3.4 — Full GDPR audit

**When:** Before Series A fundraising or any enterprise client due diligence.

Engage a GDPR specialist (not a law firm — a specialist privacy consultant is more cost-effective). Audit covers:
- Consent mechanisms
- Data flows
- Sub-processor agreements
- Retention schedules
- DSAR (Data Subject Access Request) process
- Breach response plan

This is what takes the score from 8.5/10 to 10/10.

**Ticket:** `p3-gdpr-audit`

---

## Score trajectory

| Stage | Score | Key gap remaining |
|---|---|---|
| Current | 2/10 | No consent line, no privacy policy, no terms |
| P0 complete | 6/10 | Terms of service, physical address, DPA |
| P1 complete | 7.5/10 | Stripe compliance, cookie audit |
| P2 complete | 8/10 | External audit, ICO registration, DPA |
| P3 complete | 9.5/10 | GDPR audit by external counsel |
| External audit | 10/10 | Requires real legal review |
