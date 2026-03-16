# ABLE — Legal/Compliance: Final Review
**Created: 2026-03-16 | Spec completeness: 8.5/10**

---

## Is ABLE GDPR compliant today?

No.

This is the honest answer. ABLE is not GDPR compliant in its current state. The gaps are:

**1. No consent disclosure on fan sign-up**
The fan email sign-up form on `able-v7.html` collects email addresses without any visible consent text. Under UK GDPR Article 7, consent must be informed — the data subject must know who is collecting their data and why. Currently, a fan who types their email has no indication that:
- The artist (not ABLE) will use this email to contact them
- ABLE stores it on the artist's behalf
- They can unsubscribe at any time

This is the most urgent gap. Every fan email collected before P0.1 is implemented is technically non-compliant.

**2. No privacy policy exists**
UK GDPR Articles 13 and 14 require a privacy notice when collecting personal data. No `/privacy.html` exists. No privacy policy is linked from any page. An artist cannot tell their fans "read our privacy policy" because there is nothing to read.

**3. No terms of service**
No `/terms.html` exists. The absence of terms means there is no documented relationship between ABLE and its users, no content policy, and no defined process for data subject rights.

**4. No mechanism for data subject rights**
GDPR grants data subjects the right to access, erasure, portability, and objection. None of these rights have an exercisable mechanism. There is no email address, form, or process for a fan to request their data be deleted.

**5. No Data Protection Officer or contact point**
For most small organisations, a DPO is not required. But a privacy contact address is required under Article 13(1)(a). There is no `privacy@ablemusic.co` or equivalent.

---

## What's the gap between the spec and genuine compliance?

The spec (SPEC.md, PATH-TO-10.md) documents the full compliance roadmap. If every item in the spec is implemented, ABLE reaches approximately 8.5/10 compliance — full functional compliance for a UK SaaS at V1 scale, with the remaining 1.5 points requiring external legal review.

The gap between "spec written" and "compliant" is:
- P0 items (consent line, privacy policy) need to be built and live
- P1 items (terms of service, deletion request flow) need to follow
- ICO registration (£40/year) needs to happen
- External GDPR review (not a lawyer — a privacy specialist) at pre-Series A

The spec is complete and actionable. The gap is execution, not planning.

---

## What is the single highest-risk compliance issue?

**Fan emails collected before GDPR consent is implemented.**

This is the most acute risk. If an artist puts their ABLE link in their bio before P0.1 (consent line on fan sign-up form) is implemented, every fan email collected is a non-compliant data capture. The volume compounds with each artist who goes live.

The exposure:
- ICO can fine organisations up to £17.5m or 4% of global annual turnover for serious breaches
- At ABLE's current scale (zero revenue, UK-registered company not yet incorporated) the fine would be proportionate and small — but the reputational damage to a platform that is explicitly built on fan trust is disproportionately large
- An artist who discovers their ABLE page was collecting non-compliant emails may lose trust in the platform entirely

**The fix is one change to `able-v7.html`: add the consent disclosure line below the email input.** This is a morning of work, not a compliance project. It is the single most urgent action in this entire document.

---

## Cookie banner: is one required?

No, for ABLE's current architecture. This is not a loophole — it reflects what the law actually says.

PECR (Privacy and Electronic Communications Regulations) requires consent for cookies and similar technologies used for non-strictly-necessary purposes. ABLE uses localStorage. The ICO's guidance distinguishes localStorage from cookies: localStorage is exempt from PECR consent requirements when used solely for the service the user has requested.

ABLE's current localStorage keys:
- `able_v3_profile` — stores the artist's profile. Strictly necessary.
- `able_fans` — stores fan sign-ups. Strictly necessary for the service.
- `able_clicks`, `able_views` — analytics used to show the artist their own data. Strong case for strictly necessary (not shared with third parties, not used for profiling).
- `able_dismissed_nudges`, `able_starred_fans`, `able_gig_expires` — UI preferences. Strictly necessary.

**The exception: third-party embeds.** Spotify and YouTube iFrames on `able-v7.html` set third-party cookies. If these load automatically on page load, a cookie notice may be required. If they load lazily (only on user interaction), the exposure is significantly reduced. Audit and confirm which approach the current implementation uses.

**When Supabase auth is added:** Supabase JS v2 uses localStorage for session persistence by default. If this changes to cookies, reassess.

**Recommendation:** No banner required today. Add the cookie assessment as a P2 item before Supabase auth ships.

---

## Privacy policy: what must be in it

**For UK users (UK GDPR, post-Brexit):**
UK GDPR Articles 13 and 14 require:
- Identity and contact details of the data controller (ABLE Labs Ltd or the artist, depending on framing)
- What data is collected (email, timestamp, source attribution)
- Legal basis for processing (consent, Article 6(1)(a))
- Retention period (or criteria for determining it — "until the artist closes their account or the fan requests deletion")
- Data subject rights: access, erasure, portability, restriction, objection
- Right to complain to the ICO (ico.org.uk)
- Whether data is transferred outside the UK (Supabase may host in the EU — clarify)

**For EU users (GDPR — same principles as UK GDPR):**
Same requirements. ABLE must also clarify its supervisory authority (ICO for UK organisations processing EU data, subject to international transfer adequacy rules post-Brexit).

**For US users (CAN-SPAM + CCPA in California):**
- CAN-SPAM: Applies to commercial emails. Requires honest sender identification, working unsubscribe mechanism, physical mailing address.
- CCPA (California Consumer Privacy Act): Applies if ABLE does business in California and meets thresholds (100,000+ consumers/year OR 25%+ of revenue from selling data). At V1 scale, CCPA compliance is not required. However, a "Do Not Sell My Personal Information" clause in the privacy policy signals good faith and is low-cost to include.

**Recommended privacy policy structure:**
1. Who we are (ABLE Labs Ltd, UK, contact: privacy@ablemusic.co)
2. What data we collect (email, timestamp, source; and separately: artist profile data)
3. Why we collect it and legal basis
4. Who can access your data (the artist whose page you signed up on; ABLE as processor)
5. How long we keep it
6. Your rights (access, erasure, portability, objection)
7. Cookies and localStorage (what we use and why no banner is required)
8. Changes to this policy
9. How to contact us / complain to the ICO

---

## Terms of service: must-have clauses for a UK SaaS

**Must-have:**
1. Service description — what ABLE is and is not (a tool, not a publisher or payment processor)
2. User obligations — artists: no illegal content, they are responsible for their fan communications
3. Fan data ownership — artists own their fan email lists; ABLE is a processor, not a controller
4. ABLE's 0% model — no revenue cut on fan transactions; Stripe processing fees apply
5. Service availability — no uptime SLA on free tier
6. Account suspension — ABLE may suspend for Terms violations; appeal mechanism exists
7. Content policy — prohibited content list (CSAM, illegal material, fraud, spam)
8. Governing law — England and Wales
9. Dispute resolution — informal first, then courts in England
10. Changes to terms — 30 days notice for material changes; continued use = acceptance

**Recommended additions:**
- ABLE is not responsible for the content artists post on their profiles
- ABLE does not endorse or verify any artist claims
- The fan relationship is between the artist and the fan — ABLE facilitates, does not participate

---

## P0 fixes: must be done before first real artist signs up

1. **GDPR consent line on fan sign-up form** (`able-v7.html`) — one morning of work
2. **Privacy policy page** (`/privacy.html`) — use the copy from SPEC.md §2; linked from all footers
3. **Privacy contact email** (`privacy@ablemusic.co`) — required under GDPR, takes 15 minutes to create

---

## P1 fixes: must be done before public launch

1. **Terms of service page** (`/terms.html`) — must be live before any paid tier
2. **Data deletion request flow** — `privacy@ablemusic.co` monitored; manual process documented internally
3. **Fan ownership note in admin.html** — "These emails are yours. ABLE never contacts your fans without your permission." — trust signal and legal statement
4. **CAN-SPAM physical address in email footer** — required once emails are sent to US-based fans and ABLE Labs Ltd has a registered address
5. **Unsubscribe webhook** — when Resend is wired; sets `unsubscribedAt` on fan records

---

## Recommendation

James needs to write the privacy policy and terms of service before any real user signs up. Not draft them — write and publish them.

The spec in SPEC.md §2 and §3 contains the full copy framework. The privacy policy can be written in 90 minutes from the template. The terms of service can be written in 2 hours. Neither requires a lawyer at this stage — the ICO has guidance and templates, the spec has the structure, and a real legal review can happen at P3.

The document that blocks the most is the consent line on the fan sign-up form. That is a single `<p>` tag in `able-v7.html`. It should be added before any artist puts their ABLE link anywhere public.

---

## Score summary

| Dimension | Analysis score | Score with SPEC implemented |
|---|---|---|
| GDPR / UK GDPR | 2/10 | 8/10 |
| CAN-SPAM / PECR | 3/10 | 8/10 |
| Terms of service | 0/10 | 8/10 |
| Privacy policy | 0/10 | 8/10 |
| Cookie compliance | 7/10 | 8/10 |
| 0% cut model framing | 4/10 | 9/10 |
| Content moderation | 1/10 | 6/10 |

**Spec-complete score: 8.5/10**

The remaining 1.5:
- ICO registration (£40/year, Tier 1) — 0.3
- External GDPR review by qualified privacy specialist — 0.7
- Formal legal review of terms and privacy policy language — 0.5

These require a real lawyer or privacy specialist. They cannot be achieved through spec writing. They are correctly deferred to P3 — but do not use P3 timing as an excuse to delay P0.
