# Artist Profile — User Journeys
**File: `able-v7.html` | Created: 2026-03-15**

---

## JOURNEY 1 — New Fan from Instagram (First Visit, No Artist Context)

### Who they are
They saw a clip on Instagram Reels or TikTok. The artist was in the comments. They tapped the bio. They have no idea what ABLE is. They probably have 4 minutes before they scroll away.

### What they expect
They expect a link-in-bio page. They expect links. They don't expect to be moved.

### What happens (current state)

**1. The page loads**
The hero fills their screen: artist name in large display type, artwork (if set), two CTAs. No navigation chrome. No ABLE branding at the top. Just the artist.

If the artist set their vibe to R&B and accent to rose, the page glows subtly in rose tones with a serif italic name — it already feels specific, personal.

If the artist is empty-state, they see placeholder text and a gradient. It looks abandoned.

**2. They read the name. They look at the artwork.**
The name is 80px Barlow Condensed (or the artist's vibe font). It takes up the full viewport width. Below it: location, genre pill. Below that: two CTAs.

In `live` mode: "Stream now" (accent fill) and "About me" (ghost).
In `pre-release`: "Pre-save — drops [date]" and "My music" (ghost).
In `gig`: "Get tickets" (accent fill) and "I'm playing tonight [venue]" (ghost).

**3. Their eye catches the artwork. They're considering.**
A 30-second window. They look at the snap cards if visible. They scroll slightly to see if there's more.

**4. They see the fan sign-up**
Heading: artist's name or "Stay close" in display font. Subtext: "Just your email. I'll reach out when something's actually happening." One field. First-person button: "I'm in."

If this is a good artist and they liked what they saw, they enter their email. The confetti fires. Toast: "You're in."

**V8 gap:** The confirmation email never arrives. The relationship starts but doesn't complete.

**5. They scroll more. They might stream.**
They tap "Stream now" and leave the page to Spotify or Apple Music. Or they tap the YouTube embed and watch in-page.

**6. They leave**
Without the confirmation email landing, the chance of them remembering to come back is low. The artist has a localStorage entry, not a real fan.

### What journey 1 should feel like (V8 target)
The fan arrives and within 5 seconds knows: this is an artist worth paying attention to. The page feels like the artist's space, not a platform template. They sign up. Within 2 minutes, a confirmation email arrives with the artist's name in the subject line. They confirm. The relationship is live.

### Moment of truth
The fan sign-up moment. Currently 7/10 on UI, 0/10 on completion. The confirmation email is everything.

---

## JOURNEY 2 — Returning Fan (Visited Before, Came Back)

### Who they are
They signed up 3 weeks ago. Maybe they got a confirmation email (V8). Maybe they're just back because they liked the page. They remember the artist.

### What they expect
Something new. Something to act on. A sense that the artist is alive and active.

### What happens

**1. The page loads with fresh context**
If the artist is in `live` mode (post recent release), the hero shows the new album art and a "Stream now" CTA. This is exactly what the returning fan wants.

If the artist is in `profile` mode (quiet period), they see the artist's latest snap card and their standard profile.

**2. They scan for what's new**
They look at snap cards (the artist's voice posts). They check the events section. They look at releases.

**3. The page doesn't know they've been here before**
There is currently no returning-fan personalisation. Every visit is the same. A fan who signed up 3 weeks ago sees the exact same page as a first-time visitor. This is an intentional constraint at V1 — personalisation comes via `fan.html`, not the public profile.

**4. They might sign up Close Circle if they're engaged**
If they've been following for a few weeks and genuinely love the artist, the Close Circle section might convert them. "Stay closer. A small group of people get things a bit earlier — new music before it's out." £5 a month. "You can leave whenever."

**5. What V8 improves for returning fans**
The fan.html dashboard (Phase 2) becomes their home — shows from artists they follow, new drops, Today strip. The public profile page itself doesn't need to personalise — that's the dashboard's job. The profile's job is to be the artist's world, fresh and honest.

### Moment of truth
The snap cards and Music section. Does the artist have something new to show? Is the page active and alive? An empty snap cards section and a 2-year-old release date signal an abandoned page.

---

## JOURNEY 3 — Gig Night Fan (Artist Is Playing Tonight)

### Who they are
They saw the artist is playing tonight. Maybe the artist put it in their story. Maybe a friend tagged them. They tapped the link.

### What the page is in right now: gig mode

**1. The hero is transformed**
- "On tonight" chip pulsing in accent colour
- Venue + time in the hero (not just in Events)
- Ticket CTA is primary: "Get tickets" (or "Tickets — £[price]")
- Secondary CTA: "Stay close" (sign-up) — for people who can't make it

**V8 addition — Tonight note:**
Above the ticket CTA, a 2–3 sentence note written by the artist themselves:
> "I've been looking forward to this one for a while. The room is small. If you can make it, come find me after."

This single addition transforms the gig mode from a functional CTA page into a human communication. The fan who reads it feels addressed personally.

**2. They tap "Get tickets"**
Opens the ticket link (Ticketmaster, Dice, Eventbrite, etc.) in a new tab. The transaction happens off ABLE. When they return, the profile is still there.

**3. If they can't make it**
The secondary CTA is "Stay close" — the fan sign-up. This fan is high-intent: they wanted to come but can't. They're exactly the kind of person who will sign up. The copy should acknowledge this: "Can't make it? Stay close. I'll let you know when the next one is."

**V8 addition — Going tonight tap:**
A lightweight counter: "12 people going tonight." A fan can tap to add themselves. Creates social proof without manufactured scarcity. The artist sees this in their admin as an attendance signal.

**4. Post-show state (V8 addition)**
After the show-end time (set by artist when activating gig mode), the page shifts:
- Ticket CTA becomes "Stay close" (primary)
- Tonight note becomes a brief post-show note (if artist set one, or defaults to "Good night.")
- Merch CTA appears in the secondary position
- "Catch the next one" tertiary ghost CTA

Post-concert depression is real. Fans are in peak emotional receptivity for 24–72h after a great show. The post-show state captures this window.

### Moment of truth
The tonight note. A personalised message from the artist about tonight beats a generic ticket button every time.

---

## JOURNEY 4 — Pre-release Fan (Artist Dropping Something Next Week)

### Who they are
The artist posted "dropping in 7 days." The fan tapped the link. They're curious, excited, might pre-save.

### What the page is: pre-release mode

**1. The hero shows the countdown**
Large countdown timer: days / hours / minutes. Below it, the release title and a brief description if set. Primary CTA: "Pre-save" (Spotify pre-save link). Secondary CTA: "My music" (existing releases).

**2. They pre-save**
Tapping pre-save opens Spotify's pre-save flow in a new tab. ABLE doesn't natively intercept this (yet). The pre-save is recorded by Spotify.

**V8 opportunity — native pre-save capture:**
Build pre-save as a native ABLE feature: fan taps "Pre-save" on the profile → ABLE flow asks for email + Spotify auth → both pre-save AND email sign-up happen simultaneously. This would transform the pre-release state into the most powerful fan capture moment on the page.

**3. They want to know more**
They scroll to see the existing music. Snap cards might hint at the new release. The artist's bio might reference the upcoming release.

**4. The countdown creates behaviour**
If they come back on release day, the page auto-switches to `live` mode. The release is now streamable. The pre-save fans are first. This is the page state machine working as intended.

**5. The anticipation register**
Currently: the countdown is functional. The copy is generic ("drops on [date]").

What it should feel like: the countdown should feel like anticipation, not a logistics fact. The artist should be able to write a brief note about the release (similar to the tonight note in gig mode). Something like: "This one took two years. It's done. [Date]."

### Moment of truth
The final 24 hours. The page should shift register in the last day — larger countdown digits, different background treatment, maybe a colour shift toward the release artwork. The fan who lands in the last 24h is highly motivated. The page should meet them at that energy level.

---

## JOURNEY 5 — Artist Owner (They Open Their Own Page)

### Who they are
They are the artist. They set this page up through `start.html`. Or they went directly to admin and published it. Now they're looking at their own page.

### What they expect
Their page to look right. Some way to edit it. A way to share it.

### What happens (owner view)

**1. The page detects owner mode**
The artist's handle matches the localStorage profile. The owner mode activates: a floating edit pill appears at the bottom of the screen.

**2. They see their own page**
In fan view, with the overlay of owner affordances. Dashed rings appear around editable zones. The edit pill is visible.

**3. They tap to edit something**
Tapping the hero zone opens the edit panel for identity/top card. Tapping the name opens the name editor. Tapping a CTA opens the CTA editor.

**Current gap:** Not every zone is editable from the profile. Shows and releases require going to admin. This is confusing — they're on their page but can't edit a show from it.

**V8 plan:** All 6 zones editable from the profile page itself. Identity, CTAs, quick actions, sections, snap cards, shows/releases. Auto-save on field blur (debounced 800ms).

**4. They tap "My admin →"**
A link in the edit panel or the floating pill takes them to admin. The view transition fires if in Chrome 126+: the ABLE logo flies from the profile to the admin topbar.

**5. They share their page**
QR code is available (accent-coloured). URL copy button is available. They paste it in their Instagram bio and switch back to the page to verify it looks right.

### What the artist should feel when they look at their own page
Proud. Not anxious. The page should feel like a deliberate expression of who they are as an artist — not a form they filled in.

The empty-state fix matters most here. An artist who finishes onboarding and lands on their empty page should feel like the profile is waiting to be filled — not like they're staring at a template.

### Moment of truth
The first time they see their page after onboarding. The `@view-transition: artist-name` — their name flying from the Done screen preview in `start.html` to the profile hero — is a single animation that either makes this moment magic or just navigates. It must fire.
