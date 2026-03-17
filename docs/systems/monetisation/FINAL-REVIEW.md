# ABLE — Monetisation: Final Review Gate
**System:** Monetisation
**Date:** 2026-03-16

---

## Quality gate — 5 test questions

Before any monetisation feature ships, it must pass all five of these. A single "No" is a build blocker.

---

### Question 1: Does the artist know exactly what ABLE earns before any transaction?

**Test:** Go through the Support Pack setup flow. Before the artist clicks "Enable payments," can they see — in plain English, with actual numbers — exactly what ABLE's fee is and what they will receive?

**Pass criteria:**
- Fee shown as a specific example (e.g. "On a £10 payment, you receive £9.16. ABLE takes £0.50. Stripe takes £0.34.")
- Copy uses "you receive" not "ABLE takes X%" as the lead
- No modal, no footnote, no terms-of-service link as the disclosure mechanism — the fee is shown inline in the setup flow itself
- Artist must not be able to complete setup without having seen the fee breakdown

**Fail criteria:**
- Fee only in terms of service
- Only percentage shown, not the actual amount
- Fee shown after setup, not before

---

### Question 2: Is ABLE's take rate below every named competitor?

**Test:** Pull the current publicly stated rates for Patreon, Bandcamp, Gumroad, and Ko-fi. Compare to ABLE's rates.

**Pass criteria:**
- ABLE Support Pack commission (5%) is below Patreon standard (8%), Gumroad (10%), Ko-fi (0% — cannot beat this, but Ko-fi charges a platform fee), Bandcamp (15%)
- ABLE Close Circle commission (8%) is at or below Patreon standard
- If any competitor has lowered their rate since this doc was written, update this file and re-evaluate ABLE's rate

**Fail criteria:**
- Any ABLE rate exceeds a comparable competitor rate for the same transaction type
- The comparison has not been reviewed in the past 6 months

---

### Question 3: Does the "Made with ABLE" loop create measurable organic acquisition?

**Test:** Open a Free tier artist profile in Playwright. Check: is the footer line present? Does it link to `ablemusic.co?ref=[handle]`? Is the click event tracked in analytics?

**Pass criteria:**
- Footer line visible on Free profiles, invisible on paid profiles
- Link includes `?ref=[handle]` query parameter
- Referral source tracked in ABLE acquisition analytics
- Attribution persists through the registration flow (referral handle stored on new account creation)

**Fail criteria:**
- Footer missing from Free profiles
- Footer present on paid profiles
- No referral tracking

---

### Question 4: Is the Stripe Connect fee split automatic and transparent in the earnings dashboard?

**Test:** Complete a test payment via Stripe test mode. Open the artist's earnings dashboard. Can the artist see: gross payment, ABLE fee, Stripe fee, and net received — per transaction and in total?

**Pass criteria:**
- Every transaction in earnings dashboard shows four fields: Gross / ABLE fee / Stripe fee / Net
- Running total shows: "You've received £[total] from fan support"
- Payout schedule is shown: "Stripe pays out every 7 days to your connected bank account"
- Failed payments are shown with clear status (not hidden)

**Fail criteria:**
- Only the net shown (artist cannot see how fees were calculated)
- Dashboard shows gross only, fees hidden
- No failed payment visibility

---

### Question 5: Is the copy free of extractive framing?

**Test:** Read every piece of copy in the payment flow (admin setup, fan payment screen, artist earnings dashboard, confirmation emails) against the banned phrase list.

**Pass criteria:**
- "Monetise your fans" does not appear anywhere
- "Revenue stream" does not appear in artist-facing copy
- "We only earn when you earn" appears in the admin setup flow for Support Packs
- Fan payment screen has the artist's name as the seller, not ABLE
- Earnings dashboard uses "what you've earned" not "transaction volume"
- All confirmation copy is warm and specific ("You're supporting Maya at Inner Circle — stems and demos from every release") not generic ("Payment confirmed")

**Fail criteria:**
- Any banned phrase found in production copy
- Fan payment screen shows ABLE branding more prominently than artist branding
- Earnings dashboard uses financial SaaS language instead of artist-appropriate language

---

## Sign-off

All five questions must be answered "Yes" before any transaction feature ships to production. Document the test results here before each release:

| Version | Date | Q1 | Q2 | Q3 | Q4 | Q5 | Sign-off |
|---|---|---|---|---|---|---|---|
| Phase 2 launch | TBD | — | — | — | — | — | — |
