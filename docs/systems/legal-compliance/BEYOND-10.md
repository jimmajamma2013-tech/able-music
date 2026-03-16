# Legal Compliance — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the privacy policy a fan actually reads, the GDPR deletion that completes in 47 seconds and sends a human confirmation, and the legal setup that means James never loses sleep over compliance because the system handles it correctly by design.

---

## Moment 1: The Privacy Policy a Fan Actually Reads

**What it is:** A `/privacy.html` page written in plain English — under 400 words, no legalese, specific about exactly what ABLE collects and why — that a fan who has just signed up on an artist's page reads voluntarily because it does not feel like a legal document.

**Why it's 20/10:** Privacy policies are legal requirements. They are almost universally written by lawyers for other lawyers, which means the people they are supposed to inform — fans — never read them. A 20/10 privacy policy is one where the gap between "legally compliant" and "genuinely readable" does not exist. The copy philosophy that governs ABLE's product copy governs the privacy policy: direct, honest, specific. When a fan reads ABLE's privacy policy and thinks "that's exactly what I thought it would say," the trust is earned.

**Exact implementation:**

The full policy copy is already specified in `SPEC.md §2`. The 20/10 additions are structural — making it read rather than scan:

`/privacy.html` design:
- One column, max 580px wide, centred
- `DM Sans` 16px body, 1.6 line-height
- No boxes, no icons, no sidebars — prose, not a document template
- One horizontal rule between the header and the first paragraph
- Anchor links from a 3-line table of contents at the top (What we collect / Your rights / Contact)

Opening paragraph (replaces the generic policy opening):
```
ABLE is a tool for artists. When you sign up on an artist's page, you are sharing your
email address with that artist — not with a platform, not with advertisers, not with
anyone who will profit from knowing it. This page explains exactly what that means.
```

The "Your rights" section — written for a person, not a legal review:
```
Your data belongs to you. If you want to see what we hold: email privacy@ablemusic.co.
If you want it deleted: same address. We act within 30 days. Not 90 days. Thirty.

If you signed up with multiple artists on ABLE and want all records removed, tell us
which artists. We'll remove all of them.
```

The cookie section — honest and specific:
```
We do not use tracking cookies. We use your browser's local storage to run the service —
this is the same mechanism every web app uses to remember your preferences. It cannot
be read by other websites.

Spotify and YouTube players on artist pages may load their own cookies when you interact
with them. We load those players only when you tap them — they do not load automatically.
```

The 20/10 quality: after reading this policy, a fan should be able to answer all five of the most likely questions (what do they have, who sees it, why do they have it, how do I delete it, what about cookies) without re-reading. The policy is not designed to be referenced — it is designed to be understood once and trusted.

---

## Moment 2: The GDPR Deletion That Completes in 47 Seconds

**What it is:** A fan emails `privacy@ablemusic.co` requesting deletion of their data. They receive a confirmation within 30 days. The 20/10 version is a deletion that is actioned within 24 hours and confirmed to the fan within an hour of the action completing — with a human response, not an automated acknowledgement.

**Why it's 20/10:** Most data deletion requests are handled slowly because the process is unclear, the tooling is manual, and the person responsible treats it as an administrative task. A 20/10 deletion experience leaves the fan feeling that ABLE took their request seriously — not because they had to, but because they wanted to. That feeling is the legal compliance becoming a trust signal. The fan who received that response will remember ABLE as a company that respected them. They may sign up with a different artist on ABLE in the future.

**Exact implementation:**

The deletion process — designed to take under 47 seconds of action time once the email is seen:

**Step 1 — Supabase deletion query (run in Supabase SQL editor or via admin function):**
```sql
-- GDPR Right to Erasure — soft delete
-- Replace 'fan@example.com' with actual requesting email
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

-- Returns rows affected — confirm > 0 before replying
```

**Step 2 — Reply to the fan (template, but written to feel personal):**
```
Subject: Your data has been removed — ABLE

[First name / Hi],

Done. Your contact details have been removed from ABLE's systems. The artist whose page
you signed up with can no longer see your email address or contact you through ABLE.

If you signed up with other artists on ABLE and would like those records removed too,
reply with their names or page URLs and I'll handle them within the same day.

James
ABLE · privacy@ablemusic.co
```

What this response does that a legal template doesn't:
- "Done." as the first word — the action has already happened
- Specific: "can no longer see your email address or contact you through ABLE" — not "your data has been processed per GDPR Article 17"
- Offers to handle multiple records proactively — the fan does not have to ask
- Signed by James, not by "The ABLE Privacy Team"

The 47 seconds: run the SQL query (10 seconds), compose the reply using the template (30 seconds), send (5 seconds), file the request as resolved (2 seconds). The number is not a target — it is a demonstration that the process is designed to be fast, not just compliant.

---

## Moment 3: The Legal Setup That Removes Anxiety

**What it is:** The complete P0 and P1 legal checklist completed before the first real fan email is collected — consent line on the form, privacy policy live, unsubscribe working, deletion flow documented — so that James never has a conversation with a beta artist or investor where the legal question has a vague answer.

**Why it's 20/10:** Legal compliance is not glamorous. The 20/10 version of this moment is not a legal achievement — it is a psychological one. When James can say "we have GDPR consent on every sign-up, a compliant privacy policy, a working deletion flow, and we're registered with the ICO" without hesitation, the legal system is doing its second job: eliminating the background anxiety of "we might be doing this wrong." That elimination of anxiety frees up cognitive space for everything else. That is why this is 20/10.

**Exact implementation:**

The legal anxiety elimination checklist — complete all of these before the Phase 1 beta:

```markdown
## Legal: Zero-Anxiety Checklist

### Consent
- [ ] Consent disclosure paragraph on fan sign-up form in able-v7.html
      Copy: "By signing up, [Artist Name] can contact you about their music.
             They own your contact details — ABLE stores them on their behalf. Unsubscribe anytime."
- [ ] `optIn: true` and `consentVersion: '[date]'` written to every fan record on sign-up
- [ ] Tested: consent line is visible without scrolling on iPhone SE (375px), iPhone 15 Pro (393px), Pixel 7 (412px)

### Policies
- [ ] `/privacy.html` live and linked from footer of all 4 pages
- [ ] `/terms.html` live and linked from footer alongside privacy
- [ ] Both pages tested on mobile — no horizontal scroll, no small-font issues

### Unsubscribe
- [ ] Every outbound fan email includes Resend-native unsubscribe link
- [ ] Unsubscribe webhook endpoint live: `netlify/functions/fan-unsubscribe.js`
- [ ] Tested: fan unsubscribes → `unsubscribedAt` set on record → fan excluded from broadcast counts in admin.html

### Deletion
- [ ] `privacy@ablemusic.co` email address active and monitored
- [ ] GDPR deletion SQL query saved and tested on a dummy record
- [ ] Fan deletion confirmed to produce correct tombstone (email = NULL, deleted_at = NOW())
- [ ] James has read the response template and is comfortable sending it

### Ownership statement
- [ ] Admin.html fan list includes: "These emails are yours. ABLE never contacts your fans without your permission."
- [ ] This statement is visible without scrolling on the fan list view

### ICO
- [ ] ICO registration initiated at ico.org.uk (£40/year for Tier 1) — can be started before revenue
```

When every item above is checked, the legal system has done its job: not because everything is perfect (it won't be — P3 items like the DPIA and full external audit remain), but because no user will experience a legal failure, no investor question about GDPR will produce uncertainty, and no sleep will be lost about whether fan data is being handled correctly.

The 20/10 quality is the absence of a problem that would otherwise exist. The fan never knows how carefully their consent was recorded. The artist never knows that ABLE thought hard about who controls their fan data. James never gets the "we received a complaint" email from the ICO. The legal system being 20/10 means none of those things ever happen.

---

## The 20/10 Test

A technically sophisticated early artist asks James in conversation: "What happens to my fans' data if I leave ABLE?" James answers without hesitation: "You get a CSV export of the full list, and we delete everything from our systems within 30 days. The fans gave their details to you — you take them with you." The answer is specific, immediate, and reassuring. That is the legal compliance system working at 20/10.
