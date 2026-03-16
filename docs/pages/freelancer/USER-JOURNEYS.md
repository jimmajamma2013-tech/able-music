# Freelancer Profile — User Journeys
**File: `freelancer.html` | Created: 2026-03-16**

> Four distinct journeys: discovery via credit, artist discovery, freelancer setup, and the returning freelancer managing enquiries. These are different people with different intentions. The page has to serve all of them.

---

## JOURNEY 1 — DISCOVERY VIA CREDIT

**Who:** A music fan who just played a track on an artist's ABLE page and noticed the production credit at the bottom of the release card.

**Entry point:** An artist's ABLE profile (`ablemusic.co/nadia`) — the Music section, a release card. The card shows "Produced by Maya Beats" with "Maya Beats" as a live link.

**Intent:** Curiosity. Not hiring. Not shopping. Following the sound.

---

```
[ablemusic.co/nadia — Music section]
  Release card: "Dissolve — Single"
  Credits line: "Produced by Maya Beats ●" (● = live link indicator)
  Fan taps "Maya Beats"
         ↓
[Transition — shared element: the credit text animates to the freelancer name header]
[ablemusic.co/mayabeats — freelancer.html]

  First thing they see above the fold:
  Maya's name (display font, amber accent)
  "Producer · Manchester"
  Availability chip: "Taking on work now"
  Two CTAs: "Get in touch" / "Hear the work"

  Fan scrolls to credits:
  "Dissolve — Nadia ✓ 2026" — the track they just came from
  "After Hours — Cleo Sol ✓ 2025"
  "Unravel EP — Novo Amor ✓ 2025"
  Fan recognises Novo Amor → "I know that record. She made that."

  Fan scrolls to portfolio:
  Waveform: "Dissolve — stem mix preview" → taps → plays 2:14
  "Oh. That's the sound."

  Fan does not tap "Get in touch" — they're not hiring
  Fan may tap the ABLE-attributed artist in credits (Novo Amor) → returns to ABLE ecosystem
  Fan may not do anything further — but they have heard the work
```

**Key quality gate:** The credit that brought them here ("Dissolve — Nadia") must appear in the credits section and must be immediately recognisable. The fan should feel confirmed: "Yes, this is the person who made that."

**What ABLE must not do here:**
- Push a "Sign up to follow Maya" CTA. This is not a social network. There is no following mechanism for freelancers.
- Show any "upgrade" or monetisation prompt to the fan visitor.
- Interrupt the curiosity flow with any registration gate.

**This journey converts at 0%** in the traditional sense. No booking. No sign-up. But it is the awareness layer — the fan who comes back in 5 years as an artist looking to make a record knows the name.

---

## JOURNEY 2 — ARTIST DISCOVERY

**Who:** An independent artist who is planning their next EP and is looking for a producer with a specific sound. They heard the name "Maya Beats" via word of mouth, saw it on a credit trail, or found the profile through ABLE's directory.

**Entry point:** Multiple possible — credit link from another ABLE artist's page, directory search, or a link someone sent them.

**Intent:** Commercial evaluation. They are deciding whether to reach out.

---

```
[Entry — credit link from ablemusic.co/jordanr Release card]
  "Produced by Maya Beats ●"
  Artist taps link
         ↓
[ablemusic.co/mayabeats — freelancer.html]

  Artist reads identity header in 5 seconds:
  "Producer · Manchester. OK."
  Availability chip: green — "Taking on work now." "Good."

  Artist goes straight to credits:
  "Dissolve — Nadia ✓" — "I know Nadia's music. This is the right vibe."
  "Jordan R. — Dream in Blue ✓" — "That's why I was sent here."
  "Cleo Sol — After Hours ✓" — "She worked with Cleo Sol. That calibrates this."

  Artist scrolls to portfolio:
  Plays "Dissolve — stem mix preview" — 2:14
  "Yes. That's the production style I want."

  Artist scrolls to "Working together":
  "Production: From £300/track"
  "Mixing: £150–£250/track"
  "Response time: Usually within 2 days"
  "OK. Affordable range. Fast reply. Let's go."

  Artist taps "Get in touch":
  Bottom sheet opens:
    Your name: James
    Your email: james@...
    What you're working on: Debut EP, 5 tracks, indie folk/alternative
    What you need: Production. I want something that sounds like your work on Dissolve.
    Your ABLE page (optional): ablemusic.co/james-music

  Artist taps "Send"
  Confirmation: "Sent. Maya will get back to you."

         ↓
[Maya's admin — booking enquiry notification]
  "New enquiry: James" — project description visible
  "View their ABLE page →" — Maya taps, sees James's ABLE profile
  Maya understands: indie folk, just starting out, 5-track EP, clearly serious
  Maya replies via email: "Hey James, I'd love to hear more..."
```

**Key quality gates:**
- Credits are the decision-making section. The artist must find credits that calibrate the producer's level within 30 seconds of landing.
- Portfolio audio must be listenable without friction — no login, no app install, just tap and play.
- Rate card must reduce anxiety ("Am I in the right price range?") without triggering negotiation dynamics.
- The ABLE page field in the booking form must translate directly to "Maya can see your page" — not just display an empty link.

**What would break this journey:**
- No confirmed credits → artist has no way to calibrate
- Portfolio links broken (SoundCloud removed the track) → trust collapses
- Rate card hidden → artist doesn't know if they can afford to reach out, doesn't try
- Booking form has a budget dropdown → artist pre-qualifies themselves out or lowballs

---

## JOURNEY 3 — FREELANCER SETUP

**Who:** Maya, a producer who has been making records in Manchester for 3 years. She has solid credits — she just hasn't had a place to put them where anyone would find them. An artist she worked with got an ABLE profile and mentioned the freelancer feature.

**Goal:** Live, credible profile within 10 minutes. Credits pending confirmation. One portfolio sample showing.

**Entry point:** `landing.html` — "Are you a music professional?" section → "Set up your profile →"

---

```
[landing.html]
  Maya sees: "Music professionals: producers, engineers, session musicians — your work deserves a professional home."
  Maya taps: "Set up a freelancer profile →"
         ↓
[freelancer-start.html — wizard]

  Step 1: What do you do?
  Maya selects: Producer (tap) + Mixer (tap)
  "Producer · Mixer"
  Vibe suggestion (based on role): "Hip Hop / Electronic — does that feel right?"
  Maya changes to: "Indie / Alt" (because most of her work is indie bands)
  Accent colour auto-sets to sage green. She changes it to amber.
  "Next →"

  Step 2: Add your credits
  Field: "Search for a release or artist name"
  Maya types: "Nadia"
  ABLE matches: "Nadia — Dissolve (Single, 2026)" — she confirms credits match
  Maya taps: [✓ "Dissolve — Single"] [✓ "Echoes — Single"]
  ABLE: "We'll ask Nadia to confirm these. You'll be notified when she does."
  Maya types: "Jordan R." → finds "Dream in Blue" → confirms
  "Next →"

  Step 3: Add a work sample
  Maya pastes: "https://soundcloud.com/mayabeats/dissolve-stem-preview"
  Label field: "Production and arrangement for Nadia's debut single"
  Preview appears: SoundCloud waveform embed
  "Next →"

  Step 4: Set availability
  Maya selects: "Taking on work now"
  Booking preference: "Use ABLE's enquiry form" (default) — she keeps this
  "Next →"

  Done screen:
  "Your profile is live at ablemusic.co/mayabeats"
  [Copy link] [Share on Instagram] [Share on WhatsApp]
  "Add to your email signature:"
  "Maya Beats · Producer · Mixer · ablemusic.co/mayabeats" [Copy]

  Maya copies the email signature text immediately — high-value action.
  Maya taps "Open my profile →"
         ↓
[ablemusic.co/mayabeats — freelancer.html]
  Maya sees her profile:
  Name: Maya Beats
  Producer · Mixer · Manchester
  Availability: Taking on work now (green)
  Credits: "Dissolve — Nadia" (unverified, no ✓ yet), "Dream in Blue — Jordan R." (unverified)
  Portfolio: 1 SoundCloud embed

  Maya thinks: "Not much yet. But it's real and it's live."
```

---

**Parallel flow — credit confirmation (artist side):**
```
[admin.html — Nadia is checking her dashboard]
  Notification card: "Maya Beats says she produced your track 'Dissolve' — right?"
  [Confirm] [Not quite] [Ask me later]

  Nadia taps "Confirm"
         ↓
[Maya's profile — credit updates]
  "Dissolve — Nadia ✓ 2026" — confirmed, ✓ badge appears
  Nadia's release card on her ABLE page now shows: "Produced by Maya Beats ●" (live link)
  Maya's "Artists on ABLE" section appears (≥ 1 confirmed credit now)

  If Maya has notifications: "Nadia confirmed your credit on 'Dissolve'."
  The credit discovery flywheel starts here.
```

**Key quality gates:**
- Wizard credit search must find real ABLE artist profiles quickly — if Maya types a name and nothing comes up, the highest-value step in the wizard fails silently
- Peer-confirmation request must reach the artist in a format they'll actually act on (admin notification, not buried email)
- "Your profile is live" — the done screen must feel real. The profile URL should be genuinely live and shareable from this moment.
- Email signature copy should be functional — one tap, copied, done

**Time target:** 10 minutes from landing to live profile with at least 1 pending credit and 1 portfolio sample.

---

## JOURNEY 4 — RETURNING FREELANCER (ENQUIRY MANAGEMENT)

**Who:** Maya, 3 months after setting up her profile. She has 6 confirmed credits. She receives a new booking enquiry.

**Entry point:** Email notification ("You have a new enquiry on ABLE") or direct admin.html open.

---

```
[Push notification or email]
  "New enquiry from Alex on ABLE"
  Maya taps notification
         ↓
[admin.html — freelancer mode]

  Greeting: "Good to see you, Maya."
  Notification badge: "1 new enquiry"

  Maya taps to open the enquiry:
  ──────────────────────────────────────
  Alex
  alex@...
  "Working on: Debut EP, 6 tracks, post-punk / art-rock. Recording done, need production and arrangement."
  "What you need: Someone who can push the sound further. Heard your work on the Novo Amor EP."
  ABLE page: ablemusic.co/alex-music
  ──────────────────────────────────────
  [View Alex's ABLE page →]  [Reply]  [Decline]

  Maya taps "View Alex's ABLE page →"
  → Opens ablemusic.co/alex-music in a new tab
  Maya sees: Alex's music, their aesthetic, their credits, their recent release
  "Post-punk, art-rock. This is interesting. The Novo Amor mention means they have ears."
  Maya taps [Reply]
  → Opens email client with pre-filled "To: alex@..." and subject "Re: Your enquiry via ABLE"

  Maya writes a real reply. Not a template. Not a CRM response.
  The conversation begins outside ABLE from this moment.
```

---

**Secondary returning freelancer flow — credit management:**

```
[admin.html — freelancer mode]
  Maya is adding a new credit for a recent project:
  "Add credit" → search for artist → "Jordan R. — Night Bloom EP (2026)"
  Maya adds: role = "Mixing Engineer"
  Credit shows as unverified on her profile immediately
  Jordan R. receives confirmation request in their admin

  Two weeks later, Jordan confirms:
  Maya gets notification: "Jordan R. confirmed your credit on 'Night Bloom EP'"
  Profile updates: credit now shows ✓
  Jordan's release card now shows: "Mixed by Maya Beats ●"
  New passive acquisition channel live.
```

---

**Tertiary returning freelancer flow — availability management:**

```
[admin.html — freelancer mode]
  Gentle nudge (30 days since last availability update):
  "It's been a while — still taking on work?"
  [Taking on work now] [Selective right now] [Not booking]

  Maya is busy with a big project: selects "Selective right now"
  Availability chip on profile updates immediately to amber
  Auto-expiry clock resets: will prompt again in 30 days
```

**Key quality gates:**
- Enquiry notification must reach Maya before she forgets about ABLE (push/email within 2 minutes of form submission)
- "View their ABLE page" must work — if the enquirer provided an ABLE handle that is real, it must open correctly
- Reply flow must drop into a real email client — ABLE should never try to be the inbox
- Availability nudge must be warm and specific, never a system alert: "It's been a while — still taking on work?" not "Your availability status has not been updated in 30 days."

---

## CROSS-JOURNEY SUMMARY

| Journey | Primary emotion | Primary action | Critical dependency |
|---|---|---|---|
| Fan discovery via credit | Curiosity | Portfolio browse | Credit is confirmed and linked from artist page |
| Artist discovery | Commercial evaluation | "Get in touch" tap | Credits calibrate the freelancer's level; portfolio proves the sound |
| Freelancer setup | Getting something real up fast | Wizard completion → profile live | Credit search finds artists on ABLE; peer confirmation request fires |
| Returning freelancer | Business management | Review enquiry → reply via email | Enquiry notification is timely; ABLE page link in enquiry adds context |

The entire system depends on one thing working first: **confirmed credits at the intersection of a real artist's release card and a live freelancer profile.** That link is the engine. Everything else is conversion infrastructure built around it.
