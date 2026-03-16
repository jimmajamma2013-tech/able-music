# ABLE — Legal/Compliance Analysis
**Created: 2026-03-16 | System: Legal / Compliance**
**Current score: 2/10 | Target: 8.5/10 (10 requires legal counsel + GDPR audit)**

---

## Scoring methodology

Each dimension is scored 0–10 on what currently exists in the codebase and specs. "Currently exists" means implemented and live — not specced or planned.

---

## 1. GDPR / UK GDPR — Score: 2/10

**What GDPR/UK GDPR requires for ABLE:**

Fan emails are personal data under Article 4(1). The lawful basis for collecting and processing them is consent (Article 6(1)(a)). For that consent to be valid under Article 7, it must be:
- Freely given (fans are not coerced)
- Specific (they know what they're signing up for)
- Informed (they know who is collecting data and why)
- Unambiguous (a clear affirmative act — typing an email counts)

**Current state:**

The fan sign-up form on `able-v7.html` collects email addresses. There is no consent text below the form. The data architecture spec (`docs/systems/data-architecture/SPEC.md`, Part 4) documents the consent audit requirements and specifies that `optIn: boolean` and `consent_ts` must be recorded — but this is not yet implemented. The `able_fans` records currently contain `{email, ts, source}` only. No consent timestamp, no opt-in flag.

**Gap:**
- No consent line on sign-up form
- No `optIn` flag being written
- No privacy policy page exists at any URL
- No right to deletion mechanism (no way for a fan to request removal)
- No right to portability mechanism (CSV export exists for artist, not for individual fan SAR)
- No data processor agreement (ABLE processes fan data on behalf of artists — this relationship must be documented)

**Score rationale:** The data architecture spec correctly identifies and documents the GDPR obligations. The intention is right. The implementation is not there yet. 2/10 reflects good intent with zero live compliance.

---

## 2. CAN-SPAM / PECR — Score: 3/10

**What applies:**

- **PECR (Privacy and Electronic Communications Regulations)** applies to UK users. It governs direct marketing by email. Key rule: you need prior consent before sending marketing emails to individuals.
- **CAN-SPAM** applies to US recipients. It does not require prior consent (opt-out model) but requires: clear sender identity, honest subject lines, physical address in footer, working unsubscribe honoured within 10 business days.

**Current state:**

The email spec (`docs/systems/email/SPEC.md`) is well-written and compliance-aware:
- Unsubscribe is specified for all email types
- Subject line rules prohibit deceptive copy
- CAN-SPAM physical address requirement is noted (deferred until incorporation)
- GDPR consent requirement is noted in the compliance section

The email spec is thorough and correct. However it is pre-implementation — no emails are currently being sent, no Resend account is wired up, no DNS records are set.

**Gap:**
- Resend not connected
- DNS records (SPF, DKIM, DMARC) not configured
- No physical address in footer (pre-incorporation)
- No sending domain verified
- CAN-SPAM does not require consent, but PECR does for UK marketing emails — need to confirm fan opt-in before any broadcast

**Score rationale:** The spec is correct, 3/10 reflects that the compliance thinking is solid but nothing is live.

---

## 3. Terms of Service — Score: 0/10

**What a V1 ToS must cover for ABLE:**

- What ABLE is and is not (a tool, not a publisher)
- What artists agree to: no illegal content, they own their data, they are responsible for their communications to fans
- What fans agree to when signing up via an artist page (they are giving their email to the artist, not to ABLE)
- ABLE's 0% cut model: ABLE takes no revenue share; Stripe processing fees apply to transactions
- Service availability (no uptime guarantee for free tier)
- Account suspension criteria
- Governing law (England and Wales, given UK GDPR applicability)
- How disputes are resolved
- How the terms can be changed (notice period)

**Current state:** No terms of service page exists. No `/terms.html` file. No terms linked from any page.

**Score rationale:** 0/10. Nothing exists.

---

## 4. Privacy Policy — Score: 0/10

**What a V1 privacy policy must cover:**

Under UK GDPR Articles 13 and 14, when collecting personal data, ABLE must provide:
- Identity of the data controller (ABLE Labs Ltd, or the artist — dual controller situation)
- What data is collected (email address, sign-up timestamp, source attribution)
- Why it is collected (artist-fan communication)
- Legal basis (consent)
- Who it is shared with (not shared; artist has sole access via RLS)
- How long it is kept (until artist deletes or account closed; fan SAR right)
- Rights of the data subject: access, erasure, portability, objection
- How to exercise those rights (contact mechanism)
- Right to complain to the ICO

**Current state:** No privacy policy page exists. No `/privacy.html` file. The data architecture spec (Part 4) documents the privacy principles correctly but this is not a public-facing document.

**Score rationale:** 0/10. Nothing exists. This is a blocking issue before any real users sign up.

---

## 5. Stripe / Payment Compliance — Score: N/A (not yet applicable)

**What will be required when payments are added:**

- **PCI DSS**: ABLE should never handle raw card numbers. Stripe handles card data directly; ABLE uses Stripe Elements or Stripe Checkout. This means ABLE is SAQ-A compliant (lowest PCI tier) if Stripe is integrated correctly.
- **Strong Customer Authentication (SCA)**: UK/EU requirement for online card payments. Stripe handles SCA via 3D Secure 2. ABLE must ensure Stripe's payment intent flow is used (not legacy charge API) to get SCA automatically.
- **Refund and dispute policy**: Must be stated for any paid plan.
- **ABLE's 0% model**: Must be clearly framed. ABLE charges a subscription fee (£9/mo, £19/mo) but takes no cut of fan transactions. Processing fees are Stripe's (typically 1.4% + 20p for EU cards). This must be stated transparently in billing terms.

**Current state:** No payments exist. Stripe not integrated. This dimension is rated N/A — it becomes P2 the moment any paid tier goes live.

---

## 6. ABLE's 0% Cut Model — Legal Framing — Score: 4/10

**The claim:**

ABLE takes 0% of fan transactions. Artists receive the full amount minus Stripe's processing fee. This is a differentiator and must be stated clearly in:
- Marketing copy (landing.html)
- Terms of service
- Billing/pricing pages

**Current state:**

The tier system in `CLAUDE.md` documents the pricing model. The 0% positioning is implicit in the product design. However:
- No legal statement of this exists anywhere
- The distinction between ABLE's subscription fee and transaction fees is not documented publicly
- When artists use support packs (Artist Pro tier), the flow of money needs to be documented: fan pays → Stripe → artist's Stripe Connect account. ABLE receives nothing from this transaction.

**Gap:**
- No pricing terms page
- No Stripe Connect account setup specced (required for fan-to-artist payments)
- No legal language distinguishing ABLE's subscription fees from transaction fees

**Score rationale:** 4/10 — the model is correctly designed but not legally documented anywhere.

---

## 7. Content Moderation — Score: 1/10

**The question:** What happens if an artist posts illegal content on their ABLE page?

**Relevant law:**

- **Online Safety Act 2023 (UK)**: ABLE is likely a user-to-consumer service. Artists post content (artwork, bios, snap cards, links). If this content is illegal (e.g., CSAM, terrorist content, fraud), ABLE has obligations. However, at sub-threshold scale (pre-1m users), requirements are lighter — but a basic moderation policy is still required.
- **ECHR / Human Rights**: Content removal must be proportionate and subject to appeal.
- **Liability shield**: ABLE is not a publisher — it does not editorially control content. But if ABLE has actual knowledge of illegal content and fails to remove it, it loses the hosting exemption under the E-Commerce Directive (and its UK successor).

**Current state:**

No content moderation policy exists. No reporting mechanism exists. No terms of service (which would be the place to define prohibited content) exists.

**Gap:**
- No prohibited content list
- No reporting mechanism for illegal content
- No takedown process
- No terms of service defining ABLE's response

**Score rationale:** 1/10. The product is not yet at scale, but the gap exists from the first user. Terms of service is the minimum viable response here.

---

## 8. Cookie Compliance — Score: 7/10

**The question:** Does ABLE use cookies? Is a cookie banner required?

**PECR applies to cookies and similar technologies.** The key question is whether the technology "stores or accesses information on a user's device."

**localStorage analysis:**

localStorage is a client-side storage mechanism. Under PECR, the key question is whether it is used for tracking or analytics purposes that would require consent. The ICO's current guidance is that:

- localStorage used solely for the purpose of the service the user has requested (e.g., saving their profile, remembering their preferences) is exempt from the PECR consent requirement under the "strictly necessary" exemption.
- localStorage used for tracking or analytics may require consent.

**ABLE's localStorage usage:**
- `able_v3_profile`: stores the artist's profile. Strictly necessary.
- `able_fans`: stores fan sign-ups. Strictly necessary for the service.
- `able_clicks`, `able_views`: analytics events. These are analytics — they could be argued as requiring consent, but since they are used solely to show the artist their own data (not shared with third parties, not used for profiling), a strong case exists for strict necessity.
- `able_dismissed_nudges`, `able_starred_fans`: UI preferences. Strictly necessary.

**Third-party scripts:**

Spotify and YouTube embeds on `able-v7.html` set third-party cookies. This likely requires a cookie banner if those embeds are loaded on page load. If they are loaded only after user interaction (lazy-loaded on tap), the privacy exposure is reduced.

**Current state:** No cookie banner exists. No cookie audit has been performed. The localStorage analysis above is preliminary.

**Gap:**
- No audit of third-party cookies set by Spotify/YouTube embeds
- No cookie banner (may not be required for localStorage, but likely required once Supabase auth adds auth tokens)
- No cookie policy

**Score rationale:** 7/10 — localStorage-only storage is likely compliant without a banner. The embed situation needs an audit. Supabase auth will require reassessment.

---

## Summary scorecard

| Dimension | Score | Blocking for launch? |
|---|---|---|
| GDPR / UK GDPR | 2/10 | Yes — fan emails collected with no consent |
| CAN-SPAM / PECR | 3/10 | Yes — before any email is sent |
| Terms of service | 0/10 | Yes — before any paid tier |
| Privacy policy | 0/10 | Yes — before any real users |
| Stripe / payments | N/A | Not yet applicable |
| 0% cut model framing | 4/10 | Before any paid tier |
| Content moderation | 1/10 | Before scaling |
| Cookie compliance | 7/10 | Likely fine; reassess with Supabase auth |

**Overall: 2/10**

The data architecture and email specs contain the right thinking. The gap is that none of it is implemented publicly. The first three items (GDPR consent, privacy policy, ToS) are pre-launch blockers.
