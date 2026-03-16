# ABLE — Email System Analysis
**Date: 2026-03-15**
**Overall score: 4.0/10**
**Status: Pre-implementation. Nothing is actually sent yet.**

---

## Dimension scores

### 1. Fan confirmation — voice/tone: 2/10

Nothing is sent, so the score is a floor. But the spec for what *should* be sent doesn't exist either. The only reference is a line in CROSS_PAGE_JOURNEYS.md: "Confirmation email: sounds like the artist wrote it." That's a principle, not a spec. There is no defined from-name, no copy template, no handling of the four page states. If someone wired a basic Resend.com call tomorrow with a generic "Thanks for signing up" body, it would actively harm the product — it would be exactly the kind of platform-voice email ABLE is trying not to be. Score: 2 (principle stated, nothing built, risk of default-SaaS fallback is high).

### 2. Fan confirmation — timing/delivery: 1/10

60-second delivery is the stated target. There is no Netlify function, no Resend.com account, no email infrastructure at all. The sign-up ceremony is optimistic UI ("You're in. I'll keep you close.") — which is correct — but there is no backend leg to that promise. Score: 1 (requirement stated, zero infrastructure exists).

### 3. Fan confirmation — content (release state reference): 2/10

The spec in CROSS_PAGE_JOURNEYS.md notes that the confirmation email should "reference the release if the artist is in pre-release/live state." Nothing more is defined. There are four page states (profile, pre-release, live, gig) and the email body should differ meaningfully for each. Currently there are no body variants, no token list, no conditional logic defined. Score: 2 (awareness of the requirement, no spec).

### 4. Fan confirmation — fan.html invitation: 2/10

CROSS_PAGE_JOURNEYS.md mentions the confirmation email footer should carry "See all the artists you follow →" — a link to fan.html. This is the right instinct: the email is the first moment a fan could be invited into the broader platform without it feeling like a platform push. But there is no spec for how to do this without it sounding like a marketing upsell. The line between "artist wrote this" and "ABLE added a button at the bottom" is delicate and unresolved. Score: 2 (goal identified, not specced, risk of clunky execution).

### 5. Artist welcome — does it reinforce what they built: 2/10

No artist welcome email exists. The onboarding wizard (start.html) ends with a Done screen. There is no follow-up. The ideal email would arrive within a few minutes of wizard completion, name the artist's page specifically ("Your page is live. ablemusic.co/nadia"), give one concrete next step (share your link), and feel like a quiet confirmation rather than an onboarding flow. Currently: nothing. Score: 2 (gap identified, zero spec or infrastructure).

### 6. Release/gig emails — artist broadcast capability: 2/10

No broadcast system exists. admin.html has no "Email your fans" CTA. The data is available (able_fans stores all sign-ups), but there is no mechanism for an artist to trigger a broadcast — neither a UI affordance nor a backend function. The gig reminder and release reminder email types are mentioned in this strategy brief as requirements; they do not appear anywhere else in existing docs. Score: 2 (requirement raised here for the first time, nothing built or specced prior).

### 7. Magic link auth email: 3/10

Supabase auth is not yet wired into the product. When it is, Supabase handles magic link delivery natively. The risk is that the default Supabase magic link email looks like every other Supabase project — plain, generic, branded by Supabase in the footer. ABLE will need a custom email template in Supabase's email editor (HTML template, custom from-domain). The architecture exists (Supabase supports custom SMTP and custom templates), but ABLE has not configured it. Score: 3 (Supabase will handle the mechanism, but the template is unspecced and unconfigured; default would be embarrassing).

### 8. Unsubscribe/compliance — GDPR and CAN-SPAM: 2/10

No unsubscribe mechanism. No opt-in language on the sign-up form. able_fans stores emails without a consent timestamp or consent source. GDPR requires: lawful basis (legitimate interest or explicit consent), right to erasure, transparent purpose. CAN-SPAM requires: physical address, unsubscribe mechanism, honest subject line. The fan sign-up form copy ("Stay close. I'll keep you in the loop.") implies consent, but implied is not explicit. Score: 2 (no compliance architecture, no unsubscribe, no consent recording — this is the most serious gap if emails are ever sent at volume).

### 9. Personalisation depth: 4/10

The raw ingredients for personalisation are good. able_fans stores email, timestamp, and source. able_v3_profile stores artist name, release title, release date, page state, accent colour. The fan's name is not currently captured in the sign-up form. The plan to make the email sound like the artist wrote it is inherently a personalisation system — each email is artist-specific. But the personalisation is at the level of "per-artist template" rather than "per-fan." Fan-name personalisation requires adding a name field to the sign-up form, which is a UX trade-off (friction vs. warmth). Score: 4 (data is partially there, token system not defined, fan-name capture not built, but artist-level personalisation is achievable with current data).

### 10. Technical architecture: 3/10

The correct architecture is clear: fan sign-up triggers a Netlify serverless function → function calls Resend.com API → email delivered within 60 seconds. Resend.com is the right tool: it has generous free tier, clean API, excellent deliverability, and React Email for templates. Netlify functions are already the hosting plan. The Supabase project is set up and the anon key is available. None of this is wired together. There is no `netlify/functions/fan-confirmation.js` file, no Resend API key, no DNS records (DKIM, SPF, DMARC) for the sending domain. Score: 3 (architecture is decidable and correct, zero implementation exists).

---

## Overall: 4.0/10

The score is generous. It reflects that ABLE has thought about what the email system should feel like (artist voice, not platform voice) and that the data architecture could support a good email system. It does not reflect any actual email being sent. The single most important gap is the fan confirmation email: it is the product's first communication with a fan, it must sound like the artist, and it doesn't exist yet in any form. Build this first.

---

## Key risks if unaddressed

1. **Voice failure**: first email sent is a Supabase notification or a generic Resend test — immediately breaks the "artist wrote this" illusion, never recovered.
2. **Compliance exposure**: sending to able_fans without documented consent basis and an unsubscribe mechanism is a GDPR liability. Small now (localStorage, no real sends). Serious the moment Supabase is wired up and the first broadcast goes out.
3. **Timing failure**: 60-second delivery is the spec. If the function is slow or batched, fans receive the confirmation email hours later — the warmth of the moment is gone.
4. **Missing artist welcome**: artists complete the wizard, nothing arrives, the product feels unfinished. Low cost to fix. High cost to ignore.
