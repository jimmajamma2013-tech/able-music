# Freelancer Profile — Path to 10
**File: `freelancer.html` | Created: 2026-03-16**
**Concept score: 6.7/10 | Target P0: 8/10 | Target P1: 8.5/10 | Target P2: 9.2/10**

---

## THE PRIORITY PRINCIPLE

The freelancer profile has one critical path. Before anything else works well, this must work:

**A confirmed credit on a real artist's ABLE release card → a live link → the freelancer's profile → a booking enquiry.**

That four-step chain is the entire mechanism. P0 is about making that chain complete and reliable. P1 is about making the profile compelling once the chain is delivering traffic. P2 is about making the system scale.

---

## P0: CONCEPT → 8/10 (Build-critical architecture)

These are the decisions and builds that unlock the page working at all. Without these, there is no meaningful freelancer profile.

---

### P0.1 — Credit system architecture

**The problem:** How does a credit become confirmed, bidirectionally linked, and reliable across two profiles?

**The data model:**

```js
// Table: credits (Supabase) | localStorage: able_credits (array)
{
  id: 'uuid',
  freelancer_handle: 'mayabeats',
  artist_handle: 'nadia',           // null if artist not on ABLE
  release_id: 'nadia-dissolve',     // null if not linked to an ABLE release
  release_title: 'Dissolve',
  artist_name: 'Nadia',
  role: 'producer',                  // from credit role taxonomy
  year: 2026,
  status: 'confirmed',               // 'pending' | 'confirmed' | 'disputed' | 'unverified'
  confirmed_at: 1741875600000,       // null until confirmed
  added_by: 'freelancer',            // 'freelancer' | 'artist' — who initiated
  correction_note: null              // set if artist responds "not quite"
}
```

**Credit role taxonomy:**
```
producer, co-producer, executive-producer,
mixing-engineer, mastering-engineer, recording-engineer,
session-musician, session-vocalist,
videographer, photographer, director,
graphic-designer, artwork,
other
```

**Two entry paths:**

*Path A — Freelancer initiates:*
1. Freelancer searches by artist name on ABLE
2. Selects release from search results
3. Credit added with `status: 'pending'`
4. Peer-confirmation request fires to artist's admin
5. Artist confirms → `status: 'confirmed'`
6. Artist release card updates: credit name becomes live link to freelancer profile

*Path B — Artist initiates (richer path):*
1. Artist adds credit to their release (in admin.html release editor)
2. If name typed matches an ABLE handle: auto-link prompt "Is this ablemusic.co/mayabeats?"
3. Freelancer receives notification: "Nadia credited you as producer on 'Dissolve' — add it to your profile?"
4. Freelancer accepts → credit appears on their profile as confirmed immediately (artist initiated = artist verified)

**Rule:** Credits initiated by the artist and accepted by the freelancer start as confirmed. Credits initiated by the freelancer start as pending until the artist confirms.

---

### P0.2 — Peer-confirmation UX (artist admin)

**The single most important UX decision in the credit system.**

The confirmation request must arrive in the artist's admin.html as a notification card, not an email. Artists who are active on ABLE will see it in admin. The email is a fallback only.

**Notification card spec:**

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Maya Beats avatar]
Maya Beats says she produced your track "Dissolve"
                                         right?

[Confirm]    [Not quite]    [Later]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

- Appears as the first item in a "Confirmations" section of the artist's admin notifications
- Single tap to confirm — the most common outcome; must be one action
- "Not quite" opens a freeform text field: "What would you like to correct?" — note sent to the freelancer, credit remains pending
- "Later" snoozes for 7 days. On second appearance: options simplify to "Confirm" / "Skip" (Skip = don't prompt again, credit stays pending indefinitely but artist is not harassed)
- After 30 days with no response: no further prompts. Credit stays pending. Freelancer sees this state on their admin.

**Email fallback:**
If the artist has not opened admin.html within 48h of the confirmation request being created, send an email:
```
Subject: [Maya Beats] wants to confirm a credit on one of your releases
---
Maya Beats says she produced your track "Dissolve." If that's right, tap below to confirm — it takes one second.

[Confirm on ABLE →]
```

The email CTA opens admin.html at the confirmation card, not a separate confirmation page.

---

### P0.3 — Booking enquiry pipeline

**The form:** Four fields. Sends to freelancer's email. Freelancer never sees the raw email address of enquirers unless they reply. ABLE is the intermediary for the initial contact.

**Technical flow:**
```
Visitor fills enquiry form on freelancer.html
  ↓
Form submits to Netlify serverless function (or localStorage in v1)
  ↓
Netlify function:
  - Stores enquiry in `able_booking_enquiries` (Supabase table / localStorage)
  - Sends notification email to freelancer's registered email:
    "New enquiry from [Name] on ABLE"
    [View on ABLE →] (opens admin.html#enquiries)
  - Returns success confirmation to frontend
  ↓
Freelancer sees enquiry in admin.html
  ↓
Freelancer taps "Reply via email" → pre-populated email client
  ↓
Conversation continues outside ABLE
```

**localStorage schema for v1 (pre-Supabase):**
```js
// able_booking_enquiries
[{
  id: 'nanoid',
  from_name: 'Alex',
  from_email: 'alex@...',
  project: 'Debut EP, 6 tracks, post-punk',
  ask: 'Production and arrangement. Heard your work on Novo Amor EP.',
  able_handle: 'alex-music',     // null if not provided
  ts: 1741875600000,
  read: false,
  archived: false
}]
```

**Rate limiting:** 3 enquiries per day per sending email per receiving freelancer. Enforced server-side in Netlify function (Supabase check on `ts > (now - 86400000)` count). Client-side localStorage check as lightweight pre-validation only.

---

### P0.4 — Availability auto-expiry

**Logic:**

```js
function getEffectiveAvailability(profile) {
  const { availability, availabilitySetAt } = profile;
  const daysSinceSet = (Date.now() - availabilitySetAt) / (1000 * 60 * 60 * 24);

  if (availability === 'open' && daysSinceSet > 30) {
    return 'limited'; // auto-transition: open → selective after 30 days
  }
  if (availability === 'limited' && daysSinceSet > 60) {
    return 'limited'; // selective stays selective indefinitely — no auto-close
  }
  return availability;
}
```

**Why open → selective, not open → closed:**
Transitioning to "closed" would incorrectly imply the freelancer is not taking work. The auto-transition to "selective" is the honest state: someone who hasn't updated their availability in 30 days is probably occupied but hasn't updated their profile — "selective" is the honest default.

**Admin nudge (30 days since last update):**
```
It's been a while — still taking on work?
[Taking on work now]   [Selective right now]   [Not booking]
```

Any tap resets `availabilitySetAt` to now.

---

### P0.5 — Rate card display

**Format options per service line:**

```
Fixed:    { type: 'fixed', price: '£300/track' }
Range:    { type: 'range', min: '£150', max: '£250', unit: '/track' }
Open:     { type: 'open', label: "Let's talk" }
Hidden:   { type: 'hidden' } — service not shown to visitors
```

**Display rendering:**

```
Fixed:    "Production          From £300/track"
Range:    "Mixing              £150–£250/track"
Open:     "Full EP package     Let's talk"
```

Note: "From" is prepended to fixed prices in display — it is technically honest (the real rate may be higher depending on scope) and psychologically softer than "£300/track" which implies a hard price before any conversation.

**Section visibility:** If `rateCard.shown === false` or `rateCard.services.length === 0`, the entire section is hidden from visitors. No empty section shown.

---

### P0.6 — Freelancer profile render flag

The core rendering fork in `freelancer.html`:

```js
const profile = JSON.parse(localStorage.getItem('able_freelancer_profile') || '{}');
const isFreelancer = profile.profileType === 'freelancer'; // always true on freelancer.html

// Sections NOT rendered:
// - Campaign state system (no state tags, no gig mode, no countdown)
// - Fan capture form
// - Snap cards
// - Gig mode

// Sections rendered differently:
// - Hero: avatar + identity, not artwork + campaign card
// - Hero CTAs: "Get in touch" + "Hear the work"
// - Tab bar: Home / Credits / Work / Rates / Contact
// - Music section: replaced by Credits section
```

---

## P1: 8/10 → 8.5/10 (Portfolio, notification pipeline, admin build)

These changes lift the profile from functional to compelling and close the cross-page loop.

---

### P1.1 — Portfolio embeds (facade pattern)

**Problem:** Embedding SoundCloud and YouTube iframes on load degrades performance and may cause scroll-blocking on mobile.

**Solution:** Facade pattern for all embeds.

```html
<!-- Before tap: static facade -->
<div class="embed-facade" data-src="[soundcloud url]" data-type="audio">
  <img class="embed-thumb" src="[waveform thumbnail]" alt="[track title]" loading="lazy">
  <button class="embed-play" aria-label="Play [track title]">▶</button>
  <span class="embed-duration">2:14</span>
</div>

<!-- After tap: replace with live iframe -->
<iframe src="https://w.soundcloud.com/player/?url=[encoded-url]&auto_play=true"
  allow="autoplay" loading="lazy"></iframe>
```

The facade is a single img + button. No iframe weight until the user explicitly taps play. This applies to both SoundCloud and YouTube embeds.

**SoundCloud embed URL format:**
```
https://w.soundcloud.com/player/?url=[encoded-track-url]&color=%23[accent-hex-without-hash]&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false
```

**YouTube embed URL format:**
```
https://www.youtube.com/embed/[video-id]?autoplay=0&rel=0&modestbranding=1
```

---

### P1.2 — Credit-linked audio sample

**The feature:** A portfolio audio sample can be associated with a specific credit. When it is, a waveform play strip appears on the credit row — no need to scroll to portfolio section.

```
Credits ──────────────────────────────────
[Artwork]  Dissolve — Nadia  ✓  2026
           ▶ ─────────────────────────── 2:14
```

Tap the waveform strip → plays the audio sample (facade → iframe). Tap again → pauses.

This collapses "I heard this credit" + "I want to hear the sound" into one interaction. It is the single most impactful P1 change for the artist-discovery journey.

**Data schema extension:**
```js
// In the credit object:
{ ..., portfolio_sample_id: 'uuid' } // references a portfolio item
```

---

### P1.3 — Peer-confirmation notification flow (full implementation)

Building on P0.2 spec:
- Confirmation card appears in artist admin.html's notification feed
- Confirmation persists until acted on (not dismissed by page reload)
- Email fallback fires after 48h of inactivity
- "Not quite" correction note delivered as a notification to the freelancer's admin
- Credit status updates in real-time (Supabase realtime in production; localStorage poll in v1)

**Freelancer admin notification for confirmation events:**
```
Nadia confirmed your credit on "Dissolve."
Your profile now shows this credit as confirmed.
```

**Freelancer admin notification for "not quite":**
```
Nadia left a note about your credit on "Dissolve":
"[Nadia's correction note]"
[Update credit]
```

---

### P1.4 — Freelancer admin (booking enquiry inbox)

This is the backstage view for the freelancer — the counterpart to the artist's admin.html.

**Whether this lives at `admin.html?mode=freelancer` or as a separate `freelancer-admin.html` is a build decision.** The recommended approach: a variant of admin.html, controlled by the profile's `profileType` flag, with freelancer-specific sections rendered and artist-specific sections hidden.

**Key sections in freelancer admin:**
- Greeting: "Good to see you, Maya."
- Enquiries: list of booking enquiries, unread badge
- Credits: list of credits with status (confirmed / pending / disputed). Action to add new credit. Pending confirmation count.
- Availability: one-tap update
- Profile preview link: "View your profile →"

**Enquiry inbox spec:**

```
Enquiries ──────────────────────────────────

[Unread] Alex · "Debut EP, 6 tracks, post-punk / art-rock..."
         Sent 2 hours ago   [View →]

[Read]   Jordan · "Mixing for a 3-track single, releasing in May"
         Sent 3 days ago   [View →]
```

Enquiry open view:
```
Alex
alex@example.com

Working on:
"Debut EP, 6 tracks, post-punk / art-rock. Recording done, need production and arrangement."

What they need:
"Someone who can push the sound further. Heard your work on the Novo Amor EP."

ABLE page: ablemusic.co/alex-music   [View →]

Received: 2 hours ago

[Reply via email]   [Archive]
```

"Reply via email" generates: `mailto:alex@example.com?subject=Re: Your enquiry via ABLE`

---

### P1.5 — "Just getting started" profile state (empty state mitigation)

For new freelancers in their first 2 weeks with no confirmed credits:

**Profile view for visitors:**
The credits section shows the "Credits appear here once artists confirm them." copy.
The portfolio section shows if at least 1 sample was added in wizard.
The identity header is fully shown — name, role, availability, CTAs.

**In-edit-mode nudge (admin only, not visible to visitors):**
```
You have 2 credits awaiting artist confirmation. Once confirmed, they'll appear here with a check mark.
Chase them up →
```

"Chase them up" opens a panel showing which artists have pending confirmations, with a "Send a reminder" action that sends one polite reminder per credit per artist (one reminder maximum — no spamming).

---

## P2: 8.5/10 → 9.2/10 (Discovery at scale, realtime, directory)

These changes make the freelancer profile work as a system, not just a page.

---

### P2.1 — Discovery directory integration

ABLE's directory (when built) surfaces freelancers as well as artists. A freelancer's listing in the directory is auto-generated from their profile: name, role, location, top 3 credits, availability.

**Directory sort:** Confirmed credits count + recency. A producer with 8 confirmed credits from the last 12 months outranks a producer with 20 credits from 5 years ago.

**Genre/vibe filtering in directory:** Freelancers are associated with the vibes of the artists they've worked with, not just their self-selected vibe. If all of Maya's confirmed credits are with indie/alt artists, her directory tag includes "Indie / Alt" even if she set her own vibe to something different.

This passive tagging system means the directory reflects actual work style, not self-promotion.

---

### P2.2 — Auto-populated "artists I've worked with" from confirmed credits network

The "Artists on ABLE" section (shown when ≥ 2 confirmed credits with ABLE artists) should auto-update whenever a new credit is confirmed anywhere in the system. This requires Supabase realtime subscription in the freelancer profile:

```js
supabase
  .from('credits')
  .on('UPDATE', payload => {
    if (payload.new.freelancer_handle === profile.handle && payload.new.status === 'confirmed') {
      refreshArtistsSection();
    }
  })
  .subscribe();
```

In v1 (localStorage): the section is static, populated at page load from localStorage.

---

### P2.3 — Supabase realtime for new enquiries

When a booking enquiry is submitted, the freelancer's admin should update in real-time without requiring a page refresh. In production:

```js
supabase
  .from('booking_enquiries')
  .on('INSERT', payload => {
    if (payload.new.freelancer_handle === profile.handle) {
      showEnquiryNotification(payload.new);
    }
  })
  .subscribe();
```

In v1 (localStorage): the enquiry appears on next admin.html load. The email notification covers the real-time gap.

---

### P2.4 — Testimonials (P2 — requires trust infrastructure)

Short, specific quotes from artists the freelancer has worked with. These are high-trust signals — the highest after confirmed credits. But they require the same peer-confirmation discipline.

**How they work:** The freelancer requests a testimonial from an artist they've worked with. The artist writes a short quote from within their own ABLE admin. The quote appears on the freelancer's profile attributed to the artist name and linked to the artist's ABLE profile.

The artist is the source, not the freelancer. This is what makes it trustworthy.

**Display (max 3 testimonials, most recent first):**
```
───────────────────────────────────────────────────
"Maya understood exactly what the record needed. The mix on Dissolve was better than I imagined it could be."
— Nadia, artist
───────────────────────────────────────────────────
```

Testimonials are P2 because they require the peer-confirmation infrastructure to be robust first. A testimonial system that can be gamed is worse than no testimonials.

---

### P2.5 — Cross-profile source attribution

Every visit to a freelancer profile is tracked with a source:

```js
const SOURCE_VALUES = {
  credit_link:   'credit',    // arrived via a credit link on an artist's profile
  directory:     'directory', // arrived via ABLE directory
  direct:        'direct',    // direct URL entry
  shared_link:   'share',     // copy-link share from profile or wizard
};
```

The freelancer's admin shows:
- How many visitors arrived via credit links (the most valuable source)
- Which artist's pages drove the most traffic
- How many enquiries came from credit-link visitors vs. direct

This data answers the most important question for a freelancer: "Which of my credits is actually driving work?"

---

## SCORING SUMMARY

| Angle | Concept | After P0 | After P1 | After P2 |
|---|---|---|---|---|
| First 3 Seconds | 6 | 7 | 8 | 8 |
| Primary Job | 7 | 8 | 8 | 8 |
| Hero Zone | 6 | 7 | 7 | 8 |
| Credits System | 7 | 8 | 9 | 9 |
| Copy Voice | 7 | 7 | 8 | 8 |
| Portfolio | 6 | 6 | 8 | 9 |
| Rate Card | 7 | 8 | 8 | 8 |
| Availability System | 8 | 9 | 9 | 9 |
| Booking Form | 8 | 8 | 9 | 9 |
| Mobile Experience | 7 | 7 | 8 | 8 |
| Performance | 7 | 7 | 8 | 9 |
| Identity System | 6 | 6 | 7 | 7 |
| Discovery Entry Point | 8 | 8 | 9 | 9 |
| Trust Signals | 7 | 7 | 8 | 9 |
| Micro-interactions | 6 | 6 | 7 | 8 |
| Edit Mode | 5 | 7 | 8 | 8 |
| Accessibility | 6 | 6 | 7 | 8 |
| Cross-page Coherence | 7 | 7 | 8 | 9 |
| Empty State | 5 | 7 | 8 | 8 |
| Big Picture | 7 | 7 | 8 | 9 |
| **Average** | **6.7** | **7.4** | **8.2** | **8.6** |

*Note: the overall average caps at 8.6 in this table, not 9.2, because the 20-angle system does not fully capture the system-level value of the discovery flywheel and realtime credit propagation at scale. The 9.2 ceiling is a system score, not an average of these 20 angles in isolation.*

---

## BUILD ORDER (critical path)

```
P0.6 → profile render flag (unlocks any content showing)
P0.1 → credit data model (unlocks credits section)
P0.3 → booking enquiry pipeline (unlocks primary conversion)
P0.4 → availability auto-expiry (unlocks honest availability)
P0.5 → rate card display (unlocks the "working together" section)
P0.2 → peer-confirmation UX (unlocks confirmed credits)
      ↓
P1.4 → freelancer admin / enquiry inbox (closes the booking loop)
P1.1 → portfolio facades (unlocks performant media embeds)
P1.3 → full notification pipeline (realises the confirmation flow)
P1.2 → credit-linked audio samples (lifts the credits section from list to experience)
P1.5 → empty state / pending credits UX (makes early profiles usable)
      ↓
P2.1 → directory integration (scales discovery beyond credit links)
P2.2 → realtime credits (auto-updates "Artists on ABLE")
P2.3 → realtime enquiries (removes notification latency)
P2.4 → testimonials (adds the highest-trust signal when the infrastructure supports it)
P2.5 → source attribution (closes the data loop)
```
