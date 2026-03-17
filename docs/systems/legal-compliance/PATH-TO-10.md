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

### P0.1 — GDPR consent disclosure on fan sign-up form

**File:** `able-v7.html` — the fan sign-up section
**Exact location:** Search for the fan email `<input>` element in able-v7.html. Add the consent paragraph immediately after the input field and before the submit button. It must be visible without any scrolling within the sign-up form.

**This is not a checkbox. It is a disclosure paragraph.** UK GDPR and PECR accept the act of typing an email and tapping a clearly-labelled submit button as a valid affirmative act, provided the purpose is stated clearly and specifically before the button is tapped. A checkbox is only required if the consent is bundled with other purposes (e.g., signing up AND agreeing to a newsletter). Here the purpose is single and clear: the artist will contact you about their music.

**Exact HTML to add (3 lines):**
```html
<p class="signup-consent" style="font-size:11px;color:rgba(255,255,255,0.5);margin:8px 0 0;text-align:center;line-height:1.4;">
  By signing up, <span class="consent-artist-name">this artist</span> can contact you about their music.
  They own your contact details — ABLE stores them on their behalf. Unsubscribe anytime.
</p>
```

**JavaScript to populate the artist name (add near the sign-up form initialisation):**
```javascript
(function() {
  var p = JSON.parse(localStorage.getItem('able_v3_profile') || '{}');
  var els = document.querySelectorAll('.consent-artist-name');
  els.forEach(function(el) { if (p.name) el.textContent = p.name; });
})();
```

**Updated fan record on submit — add these fields to whatever object is being pushed to `able_fans`:**
```javascript
optIn:          true,
consentVersion: '2026-03-16',   // ISO date of this consent copy — update if copy changes
consentSource:  'profile-signup-' + (source || 'direct'),
```

**What this achieves:** Every fan record written after this change has a documented consent timestamp (the `ts` field), the version of the copy they saw, and their opt-in status. This is the minimum for a valid UK GDPR consent record.

**Ticket:** `p0-gdpr-consent-form`

---

### P0.2 — Privacy policy page

**File to create:** `/privacy.html`

The full policy copy is in `SPEC.md §2` — use it verbatim. Do not paraphrase it.
Static page, ABLE header (wordmark only), no nav, no artist-specific content.

**Key clauses that must appear (do not omit any of these):**
1. What is collected: email address, sign-up timestamp, source attribution — and nothing else
2. Who controls it: the artist, not ABLE (ABLE is processor; artist is controller)
3. Purpose: artist sends updates about their music — that is the only stated purpose
4. Access: only the artist; ABLE staff only on technical support request
5. Retention: until artist deletes account or fan requests deletion
6. Rights: access, erasure, portability, objection — contact `privacy@ablemusic.co`
7. Right to complain: ico.org.uk
8. Third-party embeds: Spotify/YouTube may set cookies when embeds are loaded
9. Last updated: `[DATE]` — replace with actual publication date

**Footer link to add to these 4 files:**
```html
<a href="/privacy.html" style="color:inherit;opacity:0.5;text-decoration:none;">Privacy</a>
```

Add to: `able-v7.html`, `admin.html`, `start.html`, `landing.html`

**After this page is live, the privacy contact address `privacy@ablemusic.co` must be monitored. A fan who emails it requesting erasure has a 30-day legal deadline.**

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

The full terms copy is in `SPEC.md §3` — use it verbatim.
Same design approach as `/privacy.html`: ABLE header (wordmark), no nav, no artist-specific content.

**The 10 key clauses that must appear in the terms — do not omit any:**

1. **ABLE is a tool, not a publisher.** "ABLE provides infrastructure. Artists provide content. ABLE does not editorially control what artists post."
2. **Artist content responsibility.** Artists agree: no illegal content, they own/have rights to all uploaded material.
3. **Fan data ownership.** "When a fan signs up on your ABLE page, they are giving their contact details to you, not to ABLE. ABLE stores those details on your behalf."
4. **Artist's data protection obligation.** "You are responsible for complying with data protection law when contacting your fans."
5. **ABLE's 0% cut.** "ABLE takes 0% of any transactions between you and your fans. Stripe's processing fee applies (typically 1.4% + 20p for UK/EU cards). ABLE receives none of it."
6. **Subscription fees.** "Free: £0. Artist: £9/mo. Artist Pro: £19/mo. Label: £49/mo."
7. **Service availability.** "No uptime guarantee on free tier. We will notify you before any material changes to the service."
8. **Prohibited content.** "ABLE will remove content that is illegal under UK law, infringes third-party intellectual property, or is reported and verified as harmful."
9. **Governing law.** "England and Wales."
10. **Changes to terms.** "We will notify you by email at least 14 days before material changes take effect. Continued use constitutes acceptance."

**Footer link to add alongside Privacy:**
```html
<a href="/terms.html" style="color:inherit;opacity:0.5;text-decoration:none;">Terms</a>
```

Add to: `able-v7.html`, `admin.html`, `start.html`, `landing.html`

**Ticket:** `p1-terms-page`

---

### P1.2 — Data deletion request flow

**What:** A live email address `privacy@ablemusic.co` that someone on the ABLE team monitors. Process documented in `SPEC.md §6`.

No automation required at this stage — manual process is sufficient below 1,000 users.

**The fan deletion SQL query — must be tested before launch, not after:**

When a fan emails `privacy@ablemusic.co` requesting erasure (GDPR Right to Erasure), this is the query that must be run in Supabase against the `fans` table. It performs a soft delete: all PII fields are nulled, the row is retained for audit purposes, and `deleted_at` is set.

```sql
-- GDPR Right to Erasure — run for each artist_id that holds a record for this email
-- Replace 'fan@example.com' with the actual requesting fan email
-- Run in Supabase SQL editor or via admin Netlify function

UPDATE fans
SET
  email           = NULL,
  name            = NULL,
  notes           = NULL,
  tags            = '{}',
  deleted_at      = NOW(),
  optIn           = FALSE,
  unsubscribedAt  = NOW()
WHERE email = 'fan@example.com'
  AND deleted_at IS NULL;

-- Verify the deletion:
SELECT id, email, deleted_at FROM fans
WHERE id IN (
  SELECT id FROM fans WHERE email IS NULL AND deleted_at IS NOT NULL
  ORDER BY deleted_at DESC LIMIT 10
);
```

**In localStorage phase (pre-Supabase):** Run this JavaScript in the browser console on the artist's admin page:

```javascript
// localStorage phase erasure — replaces the record with a tombstone
var fans = JSON.parse(localStorage.getItem('able_fans') || '[]');
var email = 'fan@example.com'; // replace with actual email
fans = fans.map(function(f) {
  if (f.email === email) {
    return { deleted_at: Date.now(), optIn: false }; // PII stripped
  }
  return f;
});
localStorage.setItem('able_fans', JSON.stringify(fans));
// Also remove from starred list:
var starred = JSON.parse(localStorage.getItem('able_starred_fans') || '[]');
localStorage.setItem('able_starred_fans', JSON.stringify(starred.filter(function(e) { return e !== email; })));
console.log('Done. Record tombstoned for: ' + email);
```

**Response to the fan:** Must be sent within 30 days. Template:

```
Subject: Your data deletion request — ABLE

Hi,

Your contact details have been removed from ABLE's systems. The artist you signed up with no longer has access to your email address.

If you signed up with multiple artists on ABLE and would like your data removed from all of them, reply to this email with the artist names or page URLs.

ABLE Labs Ltd · privacy@ablemusic.co
```

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
