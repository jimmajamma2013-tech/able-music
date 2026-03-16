# ABLE — Killer Features: Beyond 10
**Created: 2026-03-16 | Status: ACTIVE — 20/10 vision spec**

---

The question is not "what does a great feature look like?" The question is: what feature makes an artist say "ABLE predicted something I didn't know I needed"?

There are two answers. Both are specced in full below.

---

## Feature 1: The "Tonight" Push

### The moment

An artist has a show tonight. Gig mode auto-activates at doors time — that is already the 10/10 feature. The 20/10 feature is what happens to the fans.

ABLE knows which fans signed up at which moment, because `momentId` is attached to every fan record at sign-up. When a fan signs up on an artist's page during gig mode at a specific venue, that `momentId` references the show. When the artist plays that venue again, ABLE can look up every fan whose sign-up is linked to a previous show at this venue and send them a notification that is not generic.

**The notification does not say:** "Tendai is playing tonight at Hoxton Hall."

**The notification says:** "Tendai is playing tonight. You've seen her before."

That is the whole message. Seven words on the first line. One factual detail that changes everything: *you've seen her before.* ABLE is not telling the fan something they didn't know — it is acknowledging something about them. The product is treating the fan as a person with a history, not as a subscriber in a list.

### Data model requirements

Fan records in `able_fans` already carry `source` (the `?ref=` attribution string). The `momentId` extension adds one additional field:

```json
{
  "email": "fan@example.com",
  "ts": 1741900000,
  "source": "hoxton-feb26",
  "momentId": "show_hoxton_20260214",
  "momentType": "gig"
}
```

`momentId` is a string that references a specific show from `able_shows`. Format: `show_{venueSlug}_{YYYYMMDD}`.

When gig mode is triggered for a new show at the same venue, the notification system runs a query: find all fans where `momentId` contains the venue slug. These are fans who were captured at this venue before. They get the personal message. Everyone else — fans who signed up via TikTok, via a link in the bio, via another show at another venue — gets the standard message: "Tendai is playing tonight at Hoxton Hall."

The difference in the message is one sentence. The difference in what it communicates is the difference between a broadcast and a memory.

### Notification copy — full set

**Fans who were captured at this exact venue before:**
> "Tendai is playing tonight. You've seen her before."
> Hoxton Hall · Doors 7:30pm · [Tickets]

**Fans who were captured at a different show (different venue):**
> "Tendai is playing tonight."
> Hoxton Hall · Doors 7:30pm · [Tickets]

**Fans who signed up via social (no momentId):**
> "Tendai is playing tonight."
> Hoxton Hall · Doors 7:30pm · [Tickets]

The personal detail only fires when it is earned by the data. ABLE never fabricates familiarity.

### When this gets built

This requires push notification infrastructure (PWA or native). The `momentId` data model should be implemented now — it costs nothing to add the field and start capturing it. The notification layer that reads it comes when push is built. The investment is a field in the schema. The payoff is a notification experience that no ticketing platform, no social platform, no music tool in existence is currently capable of delivering.

---

## Feature 2: The Release Moment

### The moment

A release date is set. The page enters pre-release mode. The countdown runs. And then — at the exact second `releaseDate` passes — the page crosses from pre-release to live.

Currently this transition is a background state change. The page just updates the next time it is loaded. That is the 8/10 version. The 20/10 version is: the transition is a product moment. The page transforms.

An artist who set their release for midnight on a Friday, and is watching their own page as it happens, sees this:

### Animation spec — exact sequence

**T-60 seconds (final minute begins):**
- Countdown changes from `MM:SS` to `SS` only — seconds displayed alone, filling the same space the full countdown used
- Font-weight of the countdown transitions from `600` to `800` — heavier, more deliberate
- Ambient glow on the hero card begins a slow intensification: `box-shadow` opacity increases from `0.3` to `0.6` over 60 seconds, eased linearly
- No sudden change. The weight builds. The page is leaning in.

**T-10 seconds:**
- Countdown switches to full viewport numbers — the seconds count occupies the centre of the screen at `clamp(72px, 20vw, 120px)` font size
- Background glow at full intensity
- Subtle vignette appears around the edges of the hero card

**T-0 — the moment:**

```
Phase 1 (0ms–600ms):
  - Countdown fades out: opacity 1 → 0, scale 1 → 1.08
  - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

Phase 2 (400ms–900ms):
  - Hero artwork/video scales in: scale 0.92 → 1.0
  - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — spring
  - Opacity 0 → 1

Phase 3 (700ms–1200ms):
  - CTA changes from "Be first to hear" → "Stream now" (or artist's configured primary CTA)
  - CTA fades in: opacity 0 → 1, translateY 8px → 0
  - Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)

Phase 4 (1000ms–1400ms):
  - Track embed fades in if embed URL is set
  - Background glow begins slow fade to normal intensity over 2s

Phase 5 (1400ms–2000ms):
  - Everything settles. The page is now in live state.
  - No confetti. No banner. No congratulations.
  - The page simply is.
```

Total duration: 2 seconds. One beat of controlled transformation.

### Why no confetti

Confetti is for apps that do not trust their product to be the spectacle. The artwork becoming real, the countdown becoming the track — that is the spectacle. ABLE's job is to choreograph the reveal, not celebrate it.

### Who sees this

Most fans will never see the T-0 transition. The ones who are watching — the devoted early listeners who set an alarm, who have the page open in their browser, who have been refreshing since 11:58pm — will see it happen in real time. They will screenshot it. They will share it. This is not a feature for scale. It is a feature for devotion. It is the product saying: if you are here at the moment it happens, the moment will reward you.

### Implementation notes

- All phases use CSS transitions on existing properties — no new DOM elements required
- `stateOverride` triggers a JS class swap on `<body>`: `body.pre-release → body.live`
- The animation sequence is driven by a `setInterval` polling loop (checking `Date.now()` against `releaseDate` timestamp) — no server involvement
- Final 60-second sequence starts: `if (msRemaining <= 60000) activateClimaxMode()`
- The T-0 class swap: `body.classList.replace('pre-release', 'live')`
- Animation classes: `.release-moment-phase-1`, `.release-moment-phase-2`, etc., applied sequentially with `setTimeout`

---

*These two features share a philosophy: the most important moments in an artist's career should feel like moments. Not state changes. Not background updates. Moments. ABLE is the only platform that has the data to know when those moments are happening and the technical position to respond to them in real time.*
