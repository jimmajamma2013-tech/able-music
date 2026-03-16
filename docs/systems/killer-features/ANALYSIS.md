# ABLE — Killer Features: Analysis
**Created: 2026-03-16 | Status: ACTIVE — strategy doc, not superseded**

---

## What this document is

Eight features that could make ABLE genuinely 10x better. Not features for the sake of features — each one removes a real friction point that artists experience today, or adds a capability no current tool in this category provides well. Scored by current state (0–10) and potential impact (0–10).

The scoring is honest. Several of these are 0/10 today because they simply don't exist yet, not because the execution is bad.

---

## Feature 1 — Auto-gig mode from calendar

**Current: 0/10 | Potential impact: 10/10**

### What's broken today

Gig mode is a manual 24-hour toggle in admin. An artist playing Manchester tonight has to remember to flip it on before they leave the house, remember to flip it off the next morning, and hope they didn't forget either way. In practice, they forget. The feature exists; it just doesn't work when it needs to.

The irony: gig mode is the most time-critical state in the entire page system. "On tonight" is only valuable for approximately 6 hours. A manual toggle that relies on artist memory is the wrong activation mechanism for a time-critical feature.

### Why the potential is 10/10

Every show in `able_shows` already has a `date`, a `doorsTime`, and a `venue`. Everything required to auto-activate is already in the data model. The logic is trivial. The impact for artists is enormous — their most important fans find out about tonight's show whether or not the artist remembered to tap a button in a dashboard app.

This is the rarest kind of feature: zero new data required, near-zero complexity, maximum real-world benefit.

### Why it's still 0/10

Nobody built it yet. There is no `setInterval` watching `able_shows` against the current time. Auto-deactivation after the show ends is also unbuilt.

---

## Feature 2 — Deep link campaigns

**Current: 0/10 | Potential impact: 8/10**

### What's broken today

Artists share their ABLE link in Stories. The link always opens at the top of the page. If the artist is talking about their vinyl restock in the caption, the fan still lands on the hero and has to scroll to merch. That scroll — however short — costs conversions. More importantly: there's no way for an artist to know which post or story drove the traffic. All clicks look identical in analytics.

### Why the potential is 8/10

`?campaign=vinyl-restock` in the URL can do three things at once:
1. Auto-scroll the page to the relevant section on load
2. Show a campaign-specific message in the hero (contextual, not generic)
3. Tag all fan sign-ups and CTA clicks with the campaign source for analytics

Artists in an active release cycle share 3–5 different links per week. Each one can now be tracked, contextualised, and measured.

### Why it's 8/10 not 10/10

The core profile page is still the right destination for most traffic. Deep links are a precision tool — valuable but not universal. Artists need to learn to use them, and the value compounds with time as analytics data builds up.

---

## Feature 3 — True Spotify pre-save

**Current: 0/10 | Potential impact: 9/10**

### What's broken today

Pre-release mode collects emails. That's it. An artist dropping an album in 3 weeks sends fans to an ABLE page with a countdown and a form. The fan types their email. The artist has a list. The fan never actually pre-saved the album. On release day, the artist still has to email the list and ask them to go to Spotify and press the button themselves.

Pre-saves on other platforms (DistroKid's pre-save tool, Toneden, Submithub) require Spotify OAuth. ABLE can do this too. The current implementation is just email collection wearing a pre-save costume.

### Why the potential is 9/10

Pre-saves are one of the most concrete asks an artist can make of a fan before release. A real Spotify pre-save means:
- The album auto-appears in the fan's Saved albums on release day
- Spotify counts it as an early engagement signal (algorithmic benefit)
- The artist can see how many actual pre-saves, not just emails

Spotify OAuth is the gating dependency, which moves this to V2. But the delta between "email collected" and "real pre-save submitted" is enormous for the artist's release outcome.

### Why it's 9/10 not 10/10

OAuth setup is non-trivial. Some artists don't release on Spotify. Apple Music pre-saves (via their API) would be required for completeness. This is a V2 feature done properly — V1 email collection is not the same thing, even though it serves a partial purpose.

---

## Feature 4 — "Tonight" draft automation

**Current: 0/10 | Potential impact: 8/10**

### What's broken today

The night before a show, or the morning of, an artist needs to post. They open their notes app, write something, copy it, post it. Then they need to update their ABLE page (which they probably don't). The show information is already in `able_shows` — venue, doors time, ticket URL — but ABLE never turns that into usable content.

An artist playing tonight has already loaded that information into ABLE when they added the show. The pre-written snap card draft sitting in admin, ready to approve with one tap, is the last 10% of work that ABLE could remove.

### Why the potential is 8/10

Content generation for specific moments (show night, release day, milestone fans) removes the cognitive load that causes artists to disengage from their ABLE page. If the page does the work, the artist stays in the loop.

The snap card draft writes itself from existing data. The copy is done. The artist approves or edits. One tap to publish.

---

## Feature 5 — Fan location heatmap (opt-in)

**Current: 0/10 | Potential impact: 8/10**

### What's broken today

An artist with 800 fans on their list has no idea where those people are. They're planning a headline tour and routing it blind. They might have 200 fans in Manchester and 15 in Leeds, but without data they book equally sized venues in both cities, or route inefficiently.

The data exists — fans sign up, and with opt-in geolocation (city-level, not exact), ABLE could surface "47 of your fans are in Manchester, 23 in London, 18 in Bristol." That changes routing decisions. That changes which cities get promoted on social. That makes the list useful as a business intelligence tool, not just a contact list.

### Why it's a V2 feature

Requires Supabase to store location data properly, aggregate it server-side, and display it on a dashboard. Doing this with localStorage alone is architecturally wrong — you need aggregate data across all fan sign-ups, and that data lives in a database, not a browser. The UX is also non-trivial — a heatmap component needs to work on mobile without being a tiny unreadable blot.

### Why 8/10 not 10/10

Opt-in rates will vary. Some fans won't share location. The data is directional, not precise. But directional is enough to be genuinely useful for tour routing and promotional targeting.

---

## Feature 6 — "Seen by" read receipts on snap cards

**Current: 0/10 | Potential impact: 7/10**

### What's broken today

An artist posts a snap card. They have no idea if anyone saw it. They don't know if 2 people read it or 200. The snap card is a one-way broadcast with no signal returning. This makes the feature feel inert — posting into a void.

"Seen by 340 fans" on each snap card in admin view would change how artists use the feature. It gives them feedback. It tells them which types of updates people actually read, which in turn tells them what to post more of.

### Why 7/10 not higher

This requires view tracking per snap card (a new event type on top of existing `able_views`), which means a schema change. It's not trivial. And "seen by" metrics can be discouraging if the number is low — artists with small audiences might see "Seen by 4 fans" and feel deflated, when 4 engaged fans is actually excellent relative to their audience size. The display needs to be careful about absolute vs relative framing.

---

## Feature 7 — One-tap release announcement

**Current: 0/10 | Potential impact: 9/10**

### What's broken today

An artist marks a release as live in admin. ABLE knows this. The artist has a fan list. The artist has a snap card system. None of this is connected to each other. The artist then manually:
- Posts on Instagram
- Sends an email to their list (if they remember)
- Adds a snap card to their ABLE page (maybe)

This is three separate tasks that all say the same thing. ABLE has all the data needed to draft all three. The artist should be asked once, approve once, and it's done.

### Why the potential is 9/10

The release moment is the most valuable moment in an artist's ABLE lifecycle. Getting the announcement right — to the right people, through the right channels — is exactly what ABLE should be doing automatically. A one-tap announcement that generates the snap card draft, the email draft, and the Instagram caption is the kind of feature that makes artists say "I can't imagine doing this without ABLE now."

### V1 vs V2 scope

V1 can generate the snap card draft and the Instagram/TikTok caption copy (no API needed — just text generation from the release data). V2 adds the email broadcast trigger (requires Resend integration) and the option to schedule.

---

## Feature 8 — QR code for gig-mode URL

**Current: 0/10 | Potential impact: 7/10**

### What's broken today

Artists put flyers up before a show. QR codes on flyers are common and expected. Currently an artist has no obvious way to generate a clean QR code for their ABLE page — and if they did, it would link to the profile state, not the gig-mode state.

A QR code that generates instantly in admin, links directly to the artist's ABLE page with `?mode=gig` in the URL, and updates in real-time to surface the show on arrival — that's a printable asset with genuine physical-world utility.

### Why 7/10 not higher

QR code generation is trivial (a JavaScript library, one function). The physical-world use case is real but limited — only useful for artists who do flyers, which is not every artist on the platform. The delta between a standard QR code and an ABLE-generated gig-mode QR code is useful but not transformative.

---

## Summary scoring table

| Feature | Current | Potential | V1 feasible? | Backend required? |
|---|---|---|---|---|
| Auto-gig from calendar | 0/10 | 10/10 | Yes | No |
| Deep link campaigns | 0/10 | 8/10 | Yes | No |
| True Spotify pre-save | 0/10 | 9/10 | Partial | Yes (Spotify OAuth) |
| Tonight draft automation | 0/10 | 8/10 | Yes | No |
| Fan location heatmap | 0/10 | 8/10 | No | Yes (Supabase) |
| Snap card read receipts | 0/10 | 7/10 | Partial | Partial |
| One-tap release announcement | 0/10 | 9/10 | Yes | No (V1 drafts only) |
| QR code gig-mode | 0/10 | 7/10 | Yes | No |

---

*Next: See `SPEC.md` for exact implementation specification of each feature.*
*See `PATH-TO-10.md` for implementation path and scoring milestones.*
*See `FINAL-REVIEW.md` for V1 build sequencing recommendation.*
