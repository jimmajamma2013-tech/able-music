# ABLE — Email System Analysis
**Date: 2026-03-16**
**Overall score: 4.0/10**
**Status: Pre-implementation. Nothing is actually sent yet.**

---

## What actually works (honest assessment)

Nothing is automated. No email is sent by ABLE under any circumstance. When a fan signs up on able-v7.html, they see optimistic UI ("You're in. I'll keep you close.") and nothing else happens. There is no Netlify function. There is no Resend account. There are no DNS records. The sign-up ceremony is a promise that is currently unfulfilled on the backend.

The specs are complete. `docs/systems/email/SPEC.md` has full email body copy for all four page states (profile, pre-release, live, gig), the artist welcome email, release broadcast, gig broadcast, and magic link auth. `docs/systems/notifications/EMAIL-TEMPLATES.md` has 18 templates written in full. The architecture decisions are correct. The problem is that none of it is wired.

---

## Dimension scores

### 1. Fan confirmation — voice/tone: 2/10

Nothing is sent, so the score is a floor. The spec for what *should* be sent is complete (SPEC.md §1, EMAIL-TEMPLATES.md T01–T04). Each of the four page states has a distinct email body, written in the artist's voice, with the artist's name as the from-name. The copy is correct: "Hey —", "It's Nadia.", no "Welcome" or "You're all set", no platform-voice language. If someone wired a basic Resend.com call tomorrow with a generic "Thanks for signing up" body, it would actively harm the product. Score: 2 (principle and copy are right, zero delivery infrastructure exists, risk of default-SaaS fallback is real).

---

### 2. Fan confirmation — timing/delivery: 0/10

60-second delivery is the stated target. There is no Netlify function. No Resend.com account. No email infrastructure. The fan gets nothing. Score: 0 (no implementation, no partial credit).

---

### 3. Fan confirmation — content (page state reference): 2/10

Four state-specific email bodies are fully written in SPEC.md and EMAIL-TEMPLATES.md:
- Profile state: "It's Nadia. You signed up, so I'll keep you in the loop."
- Pre-release state: "You signed up right before something. [Release title] comes out in [N] days."
- Live state: "[Release title] is out today."
- Gig state: "I'm playing tonight. [Venue]. Doors at [time]."

Each body is distinctive and references real data from `able_v3_profile`. None of them send. Score: 2 (spec is complete and excellent, nothing is implemented).

---

### 4. Fan confirmation — DNS and sending infrastructure: 0/10

The DNS records required to send from `mail.ablemusic.co` are documented in SPEC.md §4:
- SPF: `v=spf1 include:_spf.resend.com ~all`
- DKIM: Resend-generated CNAME records (retrieved from Resend dashboard after domain registration)
- DMARC: `v=DMARC1; p=none; rua=mailto:dmarc@ablemusic.co`

None of these records are configured. The domain `ablemusic.co` has not been connected to Resend. There is no Resend account. Score: 0.

---

### 5. Unsubscribe mechanism: 0/10

No unsubscribe mechanism exists. `able_fans` stores email addresses with no mechanism for removal. Resend's native unsubscribe handling (which writes a webhook back to ABLE) is the correct architecture, but it is not wired. An email blast without a functioning unsubscribe link is a GDPR violation. Score: 0.

---

### 6. GDPR consent recording: 0/10

The sign-up form on able-v7.html does not show a consent notice. `able_fans` records do not include `consent_ts` or `consent_source`. GDPR requires: lawful basis for processing, right to erasure, transparent purpose stated before or at the point of consent. None of these are in place. SPEC.md §5 and PATH-TO-10.md §P0.4–P0.5 specify exactly how to fix this (consent line, consent timestamp). Score: 0 — this is the most serious gap if emails are ever sent at volume.

---

### 7. GDPR delete flow: 0/10

There is no "forget me" mechanism for fans. A fan who wishes to be removed from an artist's list has no in-product path. The closest mechanism would be an unsubscribe link in an email, but no emails are sent. There is no admin fan list delete action. There is no API endpoint to handle a deletion request. Score: 0.

---

### 8. Artist welcome email: 2/10

The spec is complete (SPEC.md §2, EMAIL-TEMPLATES.md T05). Subject: "Your page is live, [Artist name]." From: ABLE. Body is under 60 words. One next step. Copy is in the correct register ("Good to see you here."). No implementation exists — no Netlify function, no trigger from start.html wizard completion, no artist email capture in the wizard (the email field is not yet added to start.html). Score: 2 (spec complete, zero infrastructure).

---

### 9. Artist broadcast capability: 0/10

No broadcast system exists. admin.html has no "Email your fans" CTA. The data is available (`able_fans` stores all sign-ups), but there is no mechanism for an artist to trigger a broadcast. Score: 0.

---

### 10. Magic link auth email: 3/10

Supabase auth is not yet wired into the product. When it is, Supabase handles magic link delivery natively. The risk is that the default Supabase email template is generic and Supabase-branded. ABLE must configure a custom HTML template in Supabase's email settings. The spec is written (SPEC.md §5, EMAIL-TEMPLATES.md T09). Subject: "Your ABLE link." Body: 3 lines, one button. Supabase's SMTP can be pointed at Resend for consistent deliverability. Score: 3 (spec written, Supabase will handle mechanism once auth is wired, but template is unconfigured and default is embarrassing).

---

## Overall: 4.0/10

The score is generous. It reflects that ABLE has thought carefully about what the email system should feel like and that the specs are complete. The `docs/systems/notifications/EMAIL-TEMPLATES.md` file contains 18 fully written templates. The `docs/systems/email/SPEC.md` has the complete delivery architecture. The GDPR requirements are understood. None of it works.

The score does not reflect any actual email being sent.

---

## Key risks if unaddressed

1. **Voice failure**: the first email sent is a Supabase notification or a generic Resend test — immediately breaks the "artist wrote this" illusion, likely never recovered.
2. **GDPR exposure**: sending to `able_fans` without documented consent basis and a functioning unsubscribe mechanism is a regulatory liability. Small now (localStorage, no real sends). Serious the moment Supabase is wired and the first broadcast goes out.
3. **Timing failure**: 60-second delivery is the spec. If the function is slow or batched, fans receive the email hours later — the warmth of the moment is gone.
4. **Missing artist welcome**: artists complete the wizard, nothing arrives, the product feels unfinished. Low cost to fix. High cost to ignore.
5. **Critical dependency on lead generation**: the email P0 must be live before the first outreach DM is sent to an artist. Without it, the first fan who signs up gets no confirmation and the artist gets no notification. This is the weakest link in the entire acquisition and retention chain.

---

## The most important email in the entire system

The fan confirmation email (T01–T04) is the most important email ABLE will ever send. It is sent within 60 seconds of a fan signing up. It is the first time the fan hears from the artist after expressing interest. It either sounds like the artist wrote it, or it sounds like a platform. If it sounds like a platform, the artist loses credibility with their fan at the most important moment. If it sounds like the artist, it closes the loop between the sign-up ceremony ("You're in. I'll keep you close.") and a real email that makes the fan feel seen.

Every other email in the system builds on this foundation. The artist welcome, the broadcast, the magic link — they all matter. But the fan confirmation is the one that happens the most, at the most critical moment, to the most important audience.

**Build this first. Build nothing else in the email system until it works.**
