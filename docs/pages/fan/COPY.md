# fan.html — Complete Copy Reference
**Last updated: 2026-03-16**
**Stage 5 of the 8-stage strategy process**

Every word for fan.html. Not aspirational direction — the actual copy, string by string.

---

## Voice principle

fan.html sounds like it was written by artists and people who love music. Not by a platform.

The fan is not being managed. They are staying close to something they care about. Every line must reflect this.

---

## Voice rules

**Never write:**
- "Your feed" → say "The artists you're following"
- "Posted" → say "dropped", "released", "just shared", "playing tonight"
- "Content" → say "music", "show", "update from the artist", "message"
- "Followers" → say "people who follow them"
- "Trending" → never
- "Going viral" → never
- "Recommended for you" → say "Because you follow [Artist]" or "Similar sound"
- "Engage" → never
- "Notifications" in a sterile sense → say "Updates from your artists"
- Exclamation marks
- "Subscribe", "upgrade", "premium", "tier", "plan"
- "All caught up!" → say "— you're up to date —"
- "Welcome back!" → say nothing, or "Good to see you, [Name]."
- "We think you'll love" → never

**Always write:**
- Specific and honest. "Nothing new today." not "All quiet on the western front."
- Direct. "Tendai is playing Manchester on the 22nd." not "A show has been added in your area."
- In the tone of the artist, not the platform. Show copy comes from the artist. Dispatch copy is the artist.
- Dates and times are specific. "Tonight, 11pm" not "Upcoming event."
- Empty states acknowledge reality — they don't spin it.

---

## Page title

```
ABLE
```

Not "ABLE — Your feed." Not "ABLE — Home." Not "ABLE — Fan Dashboard." Just: `ABLE`.

---

## Document title for browser tabs

```html
<title>ABLE</title>
```

---

## Header copy

### Phase 2 (when auth exists — first-name known)

Time-based greeting:
- 05:00–11:59: `Good morning, [Name].`
- 12:00–17:59: `Good afternoon, [Name].`
- 18:00–04:59: `Good evening, [Name].`

### V1 (no auth — no greeting)

No greeting copy needed. The ABLE wordmark is sufficient. Do not render "Hello," "Welcome," or "Hi" — they add nothing and feel generic.

### Conditional sub-greeting (show only when TRUE)

```javascript
// Priority order — show the highest-priority one, never both
if (showTonight > 0) {
  subGreeting = `${getShowTonightArtistName()} is playing near you tonight.`;
} else if (todayCount > 1) {
  subGreeting = `${todayCount} new things from your artists today.`;
} else if (todayCount === 1) {
  subGreeting = `Something new from ${getFirstTodayArtistName()} today.`;
} else if (preReleaseCount > 0) {
  subGreeting = `${getNextReleaseArtistName()} drops in ${getDaysUntilRelease()} days.`;
} else {
  subGreeting = null; // render nothing — do not manufacture context
}
```

**Rule:** Never show a sub-greeting when there is nothing genuinely new. Silence is better than fabricated urgency.

---

## Content tabs

```
Following    Discover    Near me
```

"Following" not "Feed" or "Home." "Near me" not "Shows" or "Local." These are correct. Keep them.

---

## Bottom tab bar labels

```
Following    Artists    Me
```

Tab 1: "Following" — not "Feed"
Tab 2: "Artists" — the fan's followed artist list
Tab 3: "Me" — settings and preferences

---

## Following view — section labels

```
COUNTING DOWN               ← pre-release strip header (only when true)
TODAY                       ← 24-hour window
THIS WEEK                   ← 2–7 days
```

These are uppercase label caps, letter-spacing: 0.06em, small font size (11px), `color-text-3`.

---

## Pre-release countdown strip

```
COUNTING DOWN
[Artist name] — [Release title] · [N days] / [N hours]
→ Pre-save
```

Strip uses the artist's accent colour as left border, same visual language as feed items.

If more than 3 pre-release strips: `And [N] more upcoming releases →` — collapses the rest.

---

## Feed item type badges

| Type | Badge copy |
|---|---|
| release | New music |
| event | Show |
| merch | Merch |
| snap card | From the artist |

"From the artist" for snap cards. Not "Update." "Update" is generic SaaS. "From the artist" tells you exactly what it is.

---

## Feed item subtitles

These come from artist data, formatted as:
- **Release:** `New single` / `New EP · [N] tracks` / `New album · [N] tracks`
- **Show:** `[Venue] · [City] · [Time]`
- **Merch:** `[Item name]`
- **Snap:** First line of the artist's message, truncated at 80 chars. No reformatting — these are the artist's words.

---

## The "Tonight" badge

When a show item is within today (same calendar day):

Badge label: `Tonight`
Colour: warm amber `#f4b942` (same amber as admin.html accent — urgency without alarm)
Animation: subtle pulse, `prefers-reduced-motion` respected — disables the pulse, keeps the amber

---

## Caught-up state

```
— you're up to date —
```

Decorative rule on each side. Lowercase. No celebration. No congratulation.

Sub-line: Omit entirely in v1. When Supabase is live, add: `Refreshed just now` — only when a real fetch has completed.

**Never:** "You're all caught up!" — this is SaaS. It belongs on an email client.

---

## EMPTY STATES — The most important copy on fan.html

This is where fan dashboards fail. When there is nothing to show, most platforms show either a blank screen or a generic cheerful message. Both are wrong.

The empty state is the moment of maximum vulnerability for the fan relationship. They just signed up. They gave their email. They came here expecting something. What they find is silence.

The copy must make them feel: **"I'm glad I signed up. Something good is coming."**

Not: "Come back later." Not: "Nothing here yet!" Not a blank screen.

---

### Scenario A: First visit — just arrived from artist sign-up

Context: `fan_first_visit_artist` is set. The fan just signed up through an artist's page. This is their first time on fan.html. The artist has nothing new today.

```
You followed [Artist name].

They're here when they have something to share.

While you're here —
```

Followed immediately by the cold-start discovery row (see Cold-start section below).

**Why this works:** "You followed [Artist name]" confirms who brought them here — the relationship is named. "They're here when they have something to share" — this sets an honest expectation without implying the artist will be absent. It is patient, not apologetic. "While you're here —" opens the door to discovery without insisting on it.

---

### Scenario A2: First visit — artist has something in the feed

Context: First visit, but the artist does have recent items.

```
You followed [Artist name]. Here's what they've shared.
```

Then: feed items from the artist. Then: cold-start discovery row below.

---

### Scenario B: Returning fan — nothing new today but has followed artists

Context: Fan has followed artists. They have visited before. Nothing new today.

**If last item was yesterday:**
```
Nothing new today. [Artist name] shared something yesterday.
```

**If last item was 2–6 days ago:**
```
Nothing new from your artists today.
```

**If last item was 7+ days ago:**
```
It's been a quiet week. Your artists will be back.
```

**If fan follows only one artist:**
```
Nothing new from [Artist name] today.
```

**Rule:** Never show "Nothing new today." in isolation without context when context is available. If you know when something last happened, say it. Vagueness feels like the platform not caring. Specificity feels like the platform paying attention.

---

### Scenario C: Returning fan — no artists followed (empty list, cleared localStorage or new device)

```
Your following list is empty.

Find artists from their pages, or look through Discover.

→ Discover artists
```

No emoji. No apology. No cheerfulness. Direct CTA to Discover.

---

### What never appears in any empty state:

- Emoji (too playful for ABLE's register in this context)
- "All caught up!"
- "Come back soon!"
- "Nothing here yet — but great things are coming!"
- "You're all set!"
- Any manufactured urgency
- Any guilt about not following more artists

---

## Cold-start suggestion row

Shown on first visit when fan follows exactly one artist. Shown inline in the Following view below the feed.

**Label:**
```
Because you follow [Artist name] —
```

**Artist card reason strings (pick the most accurate — use the first that applies):**
1. `Produced [Artist name]'s last record` (credit connection — most specific)
2. `Co-wrote with [Artist name]` (writing credit)
3. `Also from [City]` (location match)
4. `Same sound` (shared genre — use only if no more specific reason)
5. `New to ABLE` (recently joined — use only as last resort)

**Never:**
- "You might like"
- "Recommended for you"
- "People like you also follow"
- "Trending in [Genre]"
- Any engagement-based signal
- Follower counts

---

## Near me view

### Location display (location stored)

```
[City], [Country] · Change city
```

"Change city" not "Change." "Change city" tells you what you're changing.

### Location prompt (no location stored — first visit to Near me)

```
Where are you based?

We'll tell you when your artists are playing near you.

[Enter your city]
```

One input. No account required. Saves to `fan_location` in localStorage. No GPS request. No drama.

### "Set your city" inline (location bar when not set, fan hasn't seen the prompt yet)

```
Set your city →
```

Tapping opens the inline input. No redirect.

### Show section labels

```
TONIGHT        ← shows within today (calendar day)
THIS WEEK      ← shows within 7 days, beyond today
COMING UP      ← shows beyond 7 days
```

### Show item with gig mode "Tonight note"

When an artist has set a Tonight note in gig mode:
```
[Artist name]
[Venue] · [City] · Tonight, [Time]
"[Artist's own words — e.g. 'The room is small. It's going to be good.']"
[Tonight →]
```

The Tonight note is shown in quotes. These are the artist's words — not ABLE's formatting of them. They render exactly as written.

### No shows from followed artists in this city

```
None of your artists are playing in [City] soon.

But there are [N] shows nearby from artists you might like. →
```

### No shows at all in this city

```
No shows near [City] right now.

We check Ticketmaster — shows get added as artists announce them.
```

### Ticket button

```
Tickets
```

No arrow needed. "Tickets" is clear and sufficient.

---

## Discover view

### Filter pill labels

```
Connected    New to ABLE    By sound    Just dropped
```

Default: Connected (most ABLE-specific, most differentiated)

**Not:** "Emerging" (implies velocity ranking), "By vibe" (less specific than "By sound"), "Trending" (never)

### Connected filter section label

```
Artists connected to yours
```

Not: "Connected to artists you follow" (wordy) or "Recommended artists" (algorithmic)

### Artist card reason strings (Connected filter)

- `Producer on [Artist name]` — e.g. "Producer on Nova Reign"
- `Mixed [Artist name]'s last record`
- `Co-wrote with [Artist name]`
- `Also from [City]`

These come from the credits network. Specific, honest, no algorithmic implication.

### New to ABLE filter section label

```
New to ABLE
```

No further label needed. The filter name is the label.

Artist card reason strings for New to ABLE:
- `New this month`
- `Based in [City]` (when city matches fan's location)
- `Similar sound to [Artist name they follow]`

### By sound filter section label

```
[Genre] — artists who sound like yours
```

### Just dropped filter section label

```
New this week
```

Keep — this is correct.

### Creatives section label

```
The people behind the music
```

Sub-label:
```
Producers, mixers, and collaborators who worked on music from artists you follow.
```

This section only appears on the Connected filter. It is the credits-discovery feature. The label explains what it is.

---

## Notification panel (Phase 2)

### Panel title

```
Updates from your artists
```

Not "Notifications." Not "Activity." "Updates from your artists" — specific about the source.

### Empty state

```
Nothing new right now.
```

### Notification types and copy

**New release:**
```
[Artist name] just dropped [Release title].
[Relative time — e.g. "2 hours ago"]
```

**Show tonight:**
```
[Artist name] is playing tonight at [Venue], [City]. Doors [time].
```

**Show this week:**
```
[Artist name] is playing in [City] on [Day]. [Venue].
```

**Pre-release countdown (first appearance when < 7 days):**
```
[Release title] by [Artist name] drops in [N] days.
```

**Close Circle dispatch:**
```
[Artist name] sent something to their close circle.
[First 20 words of dispatch]...
```

**Post-show:**
```
Hope last night was good. [Artist name]'s next date is [date].
```

**Rule:** Maximum 1 push notification per day. Only send notifications for: show tonight, new release. Never for: platform updates, marketing, generic "check in" prompts.

---

## Close Circle section (Phase 2)

### Section header

```
Close circle
```

Lowercase. This is personal, not a section title. Lowercase signals intimacy. An uppercase "Close Circle" section header feels institutional.

### Per-artist supporter block

**Supporting state label:**
```
Supporting since [Month Year]
```

Example: "Supporting since December 2025"

**Latest dispatch label:**
```
[Month Day] — [First sentence of dispatch]
```

When tapped: opens full dispatch as readable text in a bottom sheet. No social metadata. No like button. No comment section. It is a letter.

**Early access indicator on release item:**
```
You heard this [N] days before it was public.
```

Example: "You heard this 3 days before it was public."

Small, muted (`color-text-2`). Not a badge or a trophy. A quiet statement of fact.

**Supporter when artist is quiet:**
```
Nothing new from [Artist name] in a while. Your close circle membership is still active — they'll be back.
```

This is load-bearing copy. It holds the relationship during creative silence without guilt, pressure, or apology. The fan's decision to stay is valid. The artist's silence is not betrayal. The copy holds both truths simultaneously.

### Close Circle invitation (non-supporter, after 14+ days of following)

```
Some fans go a bit further.

They hear new music before it's out, get first access to shows, and occasionally get a message that doesn't go everywhere.

It's £5 a month, directly to [Artist name].

Keep things as they are, or come closer.
```

Two options:
- `Keep as is` — secondary, muted, smaller
- `Come closer` — primary, artist's accent colour, standard weight

**Never:**
- "Join now"
- "Subscribe"
- "Become a supporter"
- "Upgrade"
- "Don't miss out"
- Any urgency framing

**Why this works:** "Some fans go a bit further" — it acknowledges that not everyone wants this, which is honest. "They hear new music before it's out" — specific value, not a feature list. "It's £5 a month, directly to [Artist name]" — the price is transparent and the destination is named. "Keep things as they are, or come closer" — this is a choice, not a pitch. The fan is not being pressured. They are being offered a door.

---

## Fan settings / Me tab (Phase 2)

### Me tab title

```
You
```

Not "Profile." Not "Settings." Not "Account." "You" — this is the right register for ABLE. The page is about the fan, in the fan's voice.

### Following section

```
The [N] artists you follow
```

Not "[N] artists" or "Following ([N])."

### Notifications section

```
Updates from your artists
```

Toggle label per artist: `Updates from [Artist name]`

### Your data section

```
Your list is yours.

Everything you've signed up for on ABLE belongs to the artist you signed up through, not to us. You can export your data or delete your account at any time.
```

### Export button

```
Download your following list
```

### Account deletion

```
Stop using ABLE
```

Not "Delete account." "Stop using ABLE" removes the dramatic permanence framing without creating false hope that it's reversible. If a confirmation dialog is needed: "Are you sure? Your following list and preferences will be removed."

---

## Error states

**Failed to load feed:**
```
Couldn't reach the server.
Showing what we have cached.
```

Not "Error loading data." Not an error modal. A small inline notice at the top of Following, muted, honest.

**Failed to load shows:**
```
Can't load shows right now. Try again.
```

**Artist profile unavailable:**
```
This artist's page isn't available right now.
```

**No internet:**
```
You're offline.
Showing your last update.
```

---

## PWA add-to-home-screen prompt (Phase 2, P2.2)

Triggered after 3rd visit, shown once:

```
Add ABLE to your home screen?

One tap to see what's new from your artists.

[Add]     [Not now]
```

"Not now" not "No." "Not now" implies the fan might want it later. "No" is a rejection. The difference matters for how the fan feels about the ask.

---

## Push notification opt-in (Phase 2, P2.4)

Triggered after 2+ followed artists and 3+ visits:

```
Get notified when [Artist name] drops something.

We'll only message you when something real happens.

[Turn on]     [Not now]
```

"We'll only message you when something real happens" — this is a promise. It sets expectations correctly. A fan who opts in because of this promise and then receives a generic promotional message will feel betrayed. The copy creates an obligation on the product.

---

## Principles summary

1. The fan is not being managed. They are staying close to something they care about.
2. The platform is invisible. The artists are visible.
3. Honest > cheerful. "Nothing new today." > "You're all caught up!"
4. Specific > general. "Tendai is playing Manchester on the 22nd." > "A show is coming up in your area."
5. Artist voice > platform voice. When a dispatch appears, it is the artist's words. ABLE does not rephrase them.
6. No "feed". No "content". No "engagement". No "followers".
7. The empty state is not a failure state. It is an honest state. Treat it as such.
8. The first line a new fan reads is the most important line on the entire page. Write it accordingly.
