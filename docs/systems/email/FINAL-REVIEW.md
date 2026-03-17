# ABLE — Email System Final Review
**Date: 2026-03-15**
**Current score: 4.0/10 (pre-implementation)**
**Post-P0 target: 7.0/10**
**Post-P1 target: 8.5/10**
**Post-P2 target: 9.5/10**
**Ceiling: 10/10 (live infrastructure + compliance audit)**

---

## Dimension scores — after full P0–P2 implementation

| # | Dimension | Current | Post-P0 | Post-P1 | Post-P2 |
|---|---|---|---|---|---|
| 1 | Fan confirmation — voice/tone | 2 | 8 | 8 | 9 |
| 2 | Fan confirmation — timing/delivery | 1 | 8 | 8 | 9 |
| 3 | Fan confirmation — content/release state | 2 | 9 | 9 | 9 |
| 4 | Fan confirmation — fan.html invitation | 2 | 7 | 7 | 8 |
| 5 | Artist welcome | 2 | 2 | 9 | 9 |
| 6 | Release/gig broadcast | 2 | 2 | 8 | 9.5 |
| 7 | Magic link auth | 3 | 3 | 8 | 8 |
| 8 | Unsubscribe/compliance | 2 | 6 | 7 | 8 |
| 9 | Personalisation depth | 4 | 6 | 7 | 9 |
| 10 | Technical architecture | 3 | 8 | 9 | 9.5 |
| | **Overall** | **4.0** | **7.0** | **8.5** | **9.5** |

---

## Dimension commentary — post-P2 state

### 1. Fan confirmation — voice/tone: 9/10

After P0, four email bodies are live, each sounding like the artist and not like a platform. The "Hey —" opener, the artist's name in the from-field, the absence of "Welcome" or "You're all set" — these are enforced at the template level. P2 adds fan-name personalisation which lifts the greeting from generic to specific. Ceiling is 9 because the artist note field (the one line of genuinely personal copy per email) depends on artists actually writing it — default body is good, but not as good as an artist who wrote a two-sentence release note.

### 2. Fan confirmation — timing/delivery: 9/10

P0 wires the Netlify function and Resend. 60-second delivery is achievable and tested. Post-P2 score of 9 reflects confirmed delivery infrastructure with DKIM/SPF/DMARC in place. The remaining point requires 30 days of deliverability data at volume — inbox placement rates fluctuate on new domains.

### 3. Fan confirmation — content/release state: 9/10

Four state variants are fully specced in SPEC.md. Each references the correct data: countdown in pre-release, stream link in live, venue and ticket in gig. The pre-release email includes a pre-save CTA only if the artist has set a presave URL — no empty buttons. This is the most technically complete dimension after P0.

### 4. Fan confirmation — fan.html invitation: 8/10

The footer has "Powered by ABLE · ablemusic.co" and the page link includes `?ref=email`. A dedicated fan.html invitation in the email footer ("See all the artists you follow →") is included in the profile-state email specifically — it appears less intrusive in profile state than in live/gig states where the primary action should dominate. Post-P2 score of 8: the invitation is there, it tracks, but it's not yet personalised (it doesn't know which artists the fan follows beyond the one they just signed up through).

### 5. Artist welcome: 9/10

After P1, the welcome email sends within 5 minutes of wizard completion. It names the artist's page URL specifically. It has one next step. It uses the ABLE copy register ("Good to see you here. Your page is live at ablemusic.co/nadia."). The remaining point: the welcome email cannot yet reference what CTAs the artist set up, what their release date is, or what their vibe is — it is artist-name personalised but not deeply context-aware. That requires more fields at sign-up and is a Phase 2 concern.

### 6. Release/gig broadcast: 9.5/10

After P2, artists can broadcast to their entire fan list from admin.html in two taps. The copy guidance is enforced at the UI level (the admin.html note field character limit and placeholder copy prevent over-writing). Send-once enforcement prevents accidental re-sends. The 0.5 gap to 10: the system cannot currently send to fans who signed up after the initial broadcast was sent. A "catch-up send" to late sign-ups within the live window is a future feature.

### 7. Magic link auth: 8/10

After P1, the magic link email uses ABLE's custom template. Subject is `Your ABLE link`. Body is three lines. From-domain is mail.ablemusic.co. The gap to 9 is Supabase's limited customisation of magic link email — the link expiry time is set by Supabase config, not editable per-send. The gap to 10 is using a purpose-built auth email provider (Postmark or Resend with custom auth flow) instead of Supabase's built-in email — a Phase 3 consideration.

### 8. Unsubscribe/compliance: 8/10

After P0: consent line on sign-up form, consent timestamp recorded in fan record, Resend-native unsubscribe in every email. After P1: Supabase migration path ensures unsubscribe webhooks update the database. The gap to 9: no formal privacy notice linked from the sign-up form yet (GDPR Article 13 requires accessible privacy policy — add `Privacy policy` link to sign-up form footer alongside consent line). The gap to 10: legal audit, DPA in place, tested erasure flow ("forget me" from fan settings).

### 9. Personalisation depth: 9/10

After P2: artist name, release title, release date, countdown, venue, ticket URL, stream URL, and fan name are all in-scope tokens. Each of the four page states produces a meaningfully different email. Artist note field allows one-line of genuine artist voice per broadcast. The gap to 10: no location-based personalisation (fan's city matching venue city in gig emails), no open-rate-based personalisation, no timing personalisation (send at the fan's local morning rather than at sign-up time). These are Phase 3.

### 10. Technical architecture: 9.5/10

After P2: Resend.com for delivery, Netlify functions for trigger logic, Supabase for data source (post-migration), DKIM/SPF/DMARC verified, `?ref=email` source tracking wired into admin analytics. Rate limiting on broadcasts to respect Resend's free tier. The gap to 10: no retry logic on failed sends, no bounce handling back to admin.html (hard bounces should mark fans as undeliverable in admin fan list), no email preview in admin.html before broadcast send.

---

## What makes this 10

### 1. Verified deliverability at volume

Resend inbox placement rate above 95%, measured over 30 days of real sends to real fans. Domain reputation (`mail.ablemusic.co`) has been warmed appropriately. Bounce rate below 2%. Spam complaint rate below 0.1%.

### 2. Full compliance audit

A qualified data protection solicitor has reviewed: the consent notice, the privacy policy linked from sign-up, the GDPR Article 13 disclosure, the unsubscribe flow, the data retention policy, and the DPA with Resend as a sub-processor. A CAN-SPAM review confirms physical address in footer (once ABLE Labs Ltd is incorporated). The audit is documented.

### 3. Artist broadcast rate above 40%

More than 40% of artists with at least 10 fans are using the broadcast feature (release or gig). This is measured in admin analytics. It confirms that the feature is discoverable, the copy guidance is working, and artists trust ABLE to send on their behalf. Below 40% means the UX is failing or the feature is not being surfaced correctly.

### 4. DKIM alignment confirmed across clients

Mail from `nadia@mail.ablemusic.co` scores 10/10 on Mail Tester. Inbox placement in Gmail, Apple Mail, and Outlook tested monthly. DMARC policy moved from `p=none` to `p=quarantine` after 90 days of clean sending, and to `p=reject` after 180 days.

### 5. Bounce handling in admin.html

Hard bounces are surfaced in the fan list in admin.html — a fan with an undeliverable address is marked with a quiet indicator ("Email bounced") so the artist knows their list hygiene. ABLE does not silently continue sending to bounced addresses.

---

## Final assessment

The email system is currently the largest unbuilt gap in the fan journey. Everything else in the fan sign-up flow is designed and partially built — the optimistic UI ("You're in. I'll keep you close.") exists, the fan data is stored, the admin fan list shows the sign-ups. The email is the one moment that should close the loop between a fan signing up and a fan feeling genuinely close to an artist — and it doesn't exist yet.

The good news: the spec is clear, the architecture is standard, and the copy philosophy is already well-established. P0 is a one-sprint piece of work: Netlify function, Resend account, DNS records, four email templates. Once that's done, every fan who signs up gets something that actually sounds like the artist wrote it. That is a significant product moment that most link-in-bio tools have never solved.

Build P0. Then everything else follows.
