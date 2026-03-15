---
title: ABLE Onboarding Wizard — Copy Document
file: start.html
date: 2026-03-15
status: APPROVED FOR BUILD
stage: 5 of 8 (Copy before design — every word locked)
---

> Every word in this document is final. If a word needs to change, update this file first, then the build. Copy does not get revised in the HTML.

---

## Copy Rules

1. No exclamation marks. Ever.
2. No "Sign up", "Get started", "Unlock", "Grow your audience", "Content creator", "Almost there"
3. Questions, not labels — "What do you go by?" not "Artist Name"
4. Trust lines use specific claims, not platitudes — "No card. No catch." not "Risk-free"
5. CTAs are specific to the action — not "Next", not "Submit"
6. Read every line aloud. If it sounds like a form, rewrite it.
7. First person on the artist's page. Direct address in the wizard.
8. Nothing sounds like SaaS. Nothing sounds like a marketing platform.
9. The tone is: patient, direct, confident.

---

## Global Elements

### Browser tab title
*Shown in the browser tab throughout the wizard*

```
Set up your ABLE page — able.fm
```

### Progress indicator format
*Top of viewport, every screen except 0 and Done*

```
Step [N] of 7
```

*Note: "Step 1 of 7" through "Step 7 of 7". Step 0 (Hook) and Step 8 (Done) show no step counter. "Almost there" is banned — the number is honest and specific enough.*

### Back button label
*Top-left on screens 1–7. Not shown on Screen 0 or Screen 8.*

```
← Back
```

*No tooltip. No "Go back". Just ← Back.*

### Progress bar
*2px, accent colour, top of viewport. No label. The bar speaks for itself.*

---

## Screen 0 — Hook / Import

*Purpose: Earn trust before asking for anything. The import is the product's first proof. This screen sets the tone for everything.*

---

### Headline
*Barlow Condensed 700, 58px desktop / 44px mobile. Centre-aligned. The first thing they read.*

```
Your page.
Set up in 5 minutes.
```

*Line break is intentional — "Your page." lands first, then the promise.*

---

### Sub-headline
*16px, line-height 1.6, muted. Tells them exactly what to do.*

```
Paste your Spotify or Linktree link — we'll build the rest.
```

---

### Input placeholder
*Cycles every 3 seconds with crossfade opacity. Gives examples without instructing.*

```
Cycle 1: linktr.ee/yourname
Cycle 2: open.spotify.com/artist/...
Cycle 3: soundcloud.com/yourname
```

---

### Input label (screen-reader only, visually hidden)
*Accessibility label — not displayed*

```
Paste a link to your artist profile
```

---

### "Start from scratch" link
*Below the input. Subdued — it is the lesser path. Text link, not a button.*

```
Start from scratch →
```

*This must look secondary to the import input. The import is the recommended path.*

---

### Trust line
*12px, muted, below the "Start from scratch" link. Removes the primary fear.*

```
No card. No catch. Your page is free.
```

---

### "Works with" clarification
*12px, even more muted, below trust line. For Amir — the artist who doesn't have Spotify.*

```
Works with Spotify, Linktree, SoundCloud, Bandcamp, YouTube — or nothing at all.
```

---

### Import detection states

#### Detecting (spinner visible in input)
*Shown immediately after paste, while the API call runs*

```
Checking...
```

#### Spotify artist found — SUCCESS
*Green, instant. The single most important moment in the entire wizard.*

```
We found [Artist Name] on Spotify ✓
```

*Example: "We found Declan Forde on Spotify ✓"*
*Colour: success green. Bold artist name. The checkmark is part of the copy.*

#### Linktree found — SUCCESS
*Green, instant.*

```
We found [N] links on your Linktree ✓
```

*Example: "We found 6 links on your Linktree ✓"*

#### Spotify track URL (not artist)
*Amber — not an error, just a redirect*

```
That's a track link — do you have an artist profile URL instead?
```

*Below that, smaller:*

```
No artist profile yet? Start from scratch →
```

#### Unknown URL — neutral accept
*No colour. Just confirmation that it was received.*

```
Got it — we'll add that as a link on your page.
```

#### Spotify API failure — graceful fallback
*Amber. Never red — this is not their fault.*

```
Couldn't reach Spotify right now. Enter your name below and we'll carry on.
```

*Below that, the name input appears inline — no new screen, no disruption.*

#### Linktree import failure — graceful fallback
*Amber.*

```
Couldn't read your Linktree — it might be set to private.
Add your links manually →
```

*"Add your links manually →" is a link that advances to Screen 5 (Links) directly.*

#### Completely unrecognised input (not a URL)
*Shown if they type text rather than pasting a URL*

```
That doesn't look like a link — try pasting a URL, or start from scratch →
```

---

### "Start from scratch" flow (Amir's path)

*When they tap "Start from scratch →", the import input dismisses and a name input takes its place. No new screen — just a smooth swap.*

#### Replacement headline
```
What's your artist name?
```

#### Replacement sub
```
Type your name and we'll take it from there.
```

#### Input placeholder
```
Your name here
```

#### Continue button (on this sub-flow)
```
Continue →
```

---

## Screen 1 — Name

*Purpose: Confirm or enter artist name. Pre-filled from Spotify import if available. Fastest screen in the flow.*

---

### Step counter
```
Step 1 of 7
```

---

### Headline / Question
*Large, direct. If pre-filled, this feels like a confirmation — not a question.*

```
What do you go by?
```

---

### Sub-headline
*Gives permission — no wrong answer.*

```
Your artist name, your real name, or whatever your fans know you as.
```

---

### Input

**Placeholder text (shown only if field is empty):**
```
Your name here
```

**Pre-filled state (Spotify import):**
*Input is populated with Spotify artist name. Field is editable.*

**Field label (screen-reader only):**
```
Artist name
```

---

### Continue button
```
Continue →
```

*Enter key also advances.*

---

### Micro-copy below the input
*Only shown when the field has been pre-filled from Spotify. 12px, muted.*

```
From your Spotify profile — edit if needed.
```

---

### Error state — empty field
*Shown if they tap Continue without entering anything.*

```
We need a name to put on your page.
```

---

## Screen 2 — Vibe / Genre

*Purpose: Set the starting feel of the page. Pre-selected from Spotify genre data where available. The artist name cards ("Wet Leg, The Smile, Yard Act") do the work — not the category labels.*

---

### Step counter
```
Step 2 of 7
```

---

### Headline / Question
```
What kind of music do you make?
```

---

### Sub-headline
```
This sets the starting feel of your page. You can change everything later.
```

---

### Vibe card copy

*Each card: vibe name + example artists (2–3 names). These are the real emotional anchors.*

#### Electronic
```
Electronic
BICEP · Four Tet · Floating Points
```

#### Hip-Hop / Rap
```
Hip-Hop / Rap
Little Simz · Loyle Carner · slowthai
```

#### Indie / Alternative
```
Indie / Alternative
Wet Leg · The Smile · Yard Act
```

#### R&B / Soul
```
R&B / Soul
Cleo Sol · Sampha · Greentea Peng
```

#### Singer-Songwriter
```
Singer-Songwriter
Phoebe Bridgers · Novo Amor · Ethan Gruska
```

#### Dance / Club
```
Dance / Club
Peggy Gou · Mall Grab · Special Interest
```

#### Other
```
Something else
I'll set it myself
```

*"Something else" is the label. "I'll set it myself" is the sub-line. Not "Other" — that feels like a form residue.*

---

### Pre-selected state micro-copy
*12px, muted, below the cards. Only shown if Spotify genre mapping produced a pre-selection.*

```
Based on your Spotify genres — change it if it doesn't fit.
```

---

### Continue button
```
Continue →
```

---

### No "Skip" on this screen
*There is no skip. "Something else — I'll set it myself" is the escape hatch.*

---

## Screen 3 — Accent Colour

*Purpose: Choose the accent colour. Pre-suggested based on vibe. Live preview shows every tap immediately.*

---

### Step counter
```
Step 3 of 7
```

---

### Headline / Question
```
Pick a colour that feels like you.
```

---

### Sub-headline
```
This becomes your accent — buttons, links, highlights. Change it any time.
```

---

### Contextual copy below colour strip
*Makes the choice feel meaningful, not cosmetic. 13px, slightly muted.*

```
This is the colour your fans will tap to stream, sign up, or get tickets.
```

---

### "Choose your own" option label
*Below the 8 preset swatches. Opens native colour picker.*

```
Choose your own →
```

---

### Pre-selected state micro-copy
*12px, muted. Only shown if a colour was pre-suggested from vibe.*

```
Suggested for your vibe — swap it if you want something different.
```

---

### Continue button
```
Continue →
```

---

## Screen 4 — Theme

*Purpose: Choose the page feel. Four visual options. Dark is pre-selected — it is the right default for most artists.*

---

### Step counter
```
Step 4 of 7
```

---

### Headline / Question
```
How should your page feel?
```

---

### Sub-headline
```
You're choosing the atmosphere. What's right for your music?
```

---

### Theme card copy

*Each card: name + one-line description. The description does not say "great for X artists" — that's presumptuous.*

#### Dark
```
Dark
Midnight black. Focused, editorial. Works for almost everything.
```

#### Light
```
Light
Clean and warm. Lets your artwork do the talking.
```

#### Glass
```
Glass
Your artwork bleeds through the background. Immersive. Needs strong imagery.
```

#### Contrast
```
Contrast
Pure black, maximum clarity. Nothing in the way.
```

---

### Glass theme note
*Small, 12px, below the Glass card only. Manages expectations.*

```
Glass works best with a high-resolution artwork image.
```

---

### Continue button
```
Continue →
```

---

## Screen 5 — Links

*This screen has two versions: import confirmation (Journey 1/2) and manual entry (Journey 3).*

---

### Step counter
```
Step 5 of 7
```

---

### VERSION A — Import confirmation (Spotify or Linktree was imported)

#### Headline
```
Here's what we found.
```

#### Sub-headline (Spotify import)
```
Your Spotify link is in. Add more if you want — or carry on.
```

#### Sub-headline (Linktree import)
```
Your [N] links are all here. Remove any you don't want.
```

#### Link list items

Each link shown as a row with a badge:

```
✓ Spotify           [music]
✓ Apple Music       [music]
✓ Instagram         [social]
✓ YouTube           [video]
✓ Bandcamp          [music]
○ yourwebsite.com   [link]
```

*Checkmark = confirmed platform. Circle = accepted as custom link.*
*Each row has a remove button (×) — they can deselect any they don't want.*

#### "Add another link" option
*Below the list. Subtle.*

```
+ Add another link
```

#### Continue button
```
Continue →
```

---

### VERSION B — Manual link entry (no import, Journey 3)

#### Headline
```
Where can fans find your music?
```

#### Sub-headline
```
Paste a link — we'll figure out what platform it is.
```

#### Input placeholder
```
Paste a link here
```

#### Platform detection chips
*Appear below the input as links are added. Each chip shows platform name.*

```
Spotify ✓
SoundCloud ✓
Bandcamp ✓
```

#### "Add another" link
*Appears after first link is added.*

```
+ Add another link
```

#### Empty state — no links added yet
*Below input, 12px, muted. Reassurance.*

```
No links yet — that's fine. You can always add them from your dashboard.
```

#### Maximum links reached (6)
*12px, muted.*

```
That's 6 links — enough for now. You can manage them from your dashboard.
```

#### Continue button
```
Continue →
```

---

### Linktree switcher reassurance
*Only shown for Journey 2 (Linktree importer). 12px, muted, bottom of screen.*

```
Your Linktree link still works while you're getting set up.
```

---

## Screen 6 — Fan CTA

*Purpose: Choose the primary call to action that fans see when they land on the artist's page. This is the product's core value — capturing real people who care. No skip.*

---

### Step counter
```
Step 6 of 7
```

---

### Headline / Question
```
What do you want fans to do when they land on your page?
```

---

### Sub-headline
```
One action. What matters most right now?
```

---

### Choice cards

*Each card: the CTA text fans will see (large) + a one-line description of when to use it (small). The live preview updates to show the exact CTA text as they tap each option.*

#### Stay close
```
"Stay close."
For artists who want a low-pressure sign-up — no pitch, just presence.
```

#### Stay in the loop
```
"Stay in the loop."
For artists with a regular release cadence — consistent, ongoing.
```

#### Hear it first
```
"Hear it first."
For artists building pre-release momentum — the next thing is coming.
```

#### Support me directly
```
"Support me directly."
For artists with Bandcamp, Patreon, or Ko-fi — make it easy to contribute.
```

---

### Live preview label
*Below the preview phone, 11px, muted. Confirms what they're seeing.*

```
This is what your fans will see.
```

---

### No "Skip" on this screen
*Fan capture is the core value. There is no skip. "Stay close" is the lowest-pressure option.*

---

### Continue button
```
Continue →
```

---

## Screen 7 — Current Moment

*Purpose: Set the campaign state. This is the last question before the page is built. The button copy changes on this screen — "Build my page →" — because this tap is the payoff.*

---

### Step counter
```
Step 7 of 7
```

---

### Headline / Question
```
What's happening right now?
```

---

### Sub-headline
```
Your page shifts with your moment. This changes the whole front-page experience.
```

---

### Choice cards

*Each card: a first-person description of the moment. These are not modes — they are moments.*

#### Just being an artist
```
Just me, being an artist.
No campaign. Your latest music, your links, your fans.
```

#### Something's coming
```
Something's coming.
Set a release date — your page goes into countdown mode.
```

#### Music just dropped
```
Music just dropped.
Link the track — it goes front and centre. Fans can stream straight away.
```

#### Playing tonight
```
Playing tonight.
Tickets front and centre. Lasts 24 hours, then resets.
```

---

### Sub-inputs (appear inline when a choice is selected — no new screen)

#### "Something's coming" — date picker
```
Release date:
[date input]
```

*Placeholder text inside date input:*
```
When does it drop?
```

*Below the date input, 12px, muted:*
```
A countdown appears on your page from now until the day it arrives.
```

#### "Music just dropped" — track URL
```
Track link:
[URL input]
```

*Placeholder:*
```
Paste your Spotify, SoundCloud, or YouTube link
```

*Below the URL input, 12px, muted:*
```
The player goes straight to the top of your page.
```

#### "Playing tonight" — venue + time (both optional)
```
Venue (optional):
[text input — placeholder: e.g. The Brudenell Social Club]

Show time (optional):
[time input — placeholder: e.g. 8pm]
```

*Below both inputs, 12px, muted:*
```
Leave these blank if you want — your fans just need to know you're on.
```

---

### Live preview behaviour
*12px, muted, below preview. Changes to reflect the chosen state.*

**Just me, being an artist:**
```
Profile mode — your page as it is.
```

**Something's coming:**
```
Pre-release mode — your fans see the countdown.
```

**Music just dropped:**
```
Live mode — track top of page, stream CTA prominent.
```

**Playing tonight:**
```
Gig mode — tickets first, on for 24 hours.
```

---

### Build button
*This is the payoff tap. The copy changes from "Continue →" to something that signals what happens next.*

```
Build my page →
```

---

## Screen 8 — Done

*Purpose: Land the moment. The page is live. This is not a form completion — it is the product delivering on its promise. Copy must feel like the end of something real, not the end of a sign-up.*

---

### No step counter on this screen.

---

### Headline
*Barlow Condensed 700, 60px. Spring entrance animation. The biggest type on the screen. Nothing else competes.*

```
Your page is live.
```

---

### URL line
*The artist's actual slug, displayed as a real URL. Editable inline with a pencil icon.*

```
ablemusic.co/[artist-slug]
```

*Pencil icon (✎) after the slug — tapping it makes the slug inline-editable.*

*If slug auto-generated, small 12px label below:*
```
Edit your URL →
```

---

### Linktree switcher addition
*Only shown for Journey 2. Appears below the URL line. 15px.*

```
Your [N] Linktree links are all here.
```

*Example: "Your 6 Linktree links are all here."*

---

### Primary CTA
*Large, accent fill, full-width on mobile.*

```
Go to my page →
```

*Opens able-v7.html in the same tab (it is now their page).*

---

### Secondary CTA
*Ghost button, below primary.*

```
Open my dashboard →
```

*Opens admin.html.*

---

### Share section headline
*Small, 13px, above the share icons. Low-key — not a push.*

```
Share it while you're here.
```

---

### Share option labels
*Below each share icon*

```
Instagram story
Copy link
Twitter / X
```

---

### Trust moment
*12px, muted, bottom of screen. The last thing they read.*

```
This page costs £0. It will never charge you to exist.
```

---

### Secondary trust line
*11px, even more muted, below the trust moment. For anyone who is still uncertain.*

```
No contract. Cancel any time. Free forever on the free plan.
```

---

## Live Preview — Empty States

*Copy shown in the live preview panel before each field is populated.*

---

### Before name is entered
*In the preview, where the artist name would be.*

```
Your name
```

---

### Before vibe is selected
*Where the genre/sub-line would be.*

```
Your genre
```

---

### Before accent is chosen
*No text — default accent colour (#e05242) is shown.*

---

### Before theme is chosen
*Default Dark theme is pre-applied. No empty state needed.*

---

### Preview panel label
*Below the preview phone, from Screen 1 onward. 11px, muted.*

```
Your page is taking shape.
```

*This label does not change as screens progress. It is the constant caption.*

---

### Preview panel label — once name is entered
*Replaces "Your page is taking shape." after Screen 1 is completed.*

```
This is [Artist Name]'s page.
```

*Example: "This is Declan Forde's page."*

---

## Error / Fallback States (Global)

*These apply to any network failure, API timeout, or unexpected state across all screens.*

---

### Generic network error
*Shown inline below the affected field. Never a modal. Never full-screen.*

```
Something went wrong — check your connection and try again.
```

---

### API timeout (> 5 seconds)
*Shown while spinner is still visible.*

```
Taking longer than usual...
```

*If it exceeds 10 seconds, the spinner resolves to:*

```
That's taking too long. Carry on without the import →
```

*"Carry on without the import →" advances to Screen 1 with a blank name field.*

---

### Paste detection failure (URL not parseable)
```
We couldn't read that link — try pasting again, or start from scratch →
```

---

### Session recovery (wizard abandoned and returned)
*Shown at the top of the screen the user was on when they left. 12px, muted.*

```
Picking up where you left off.
```

---

## Copy Audit Checklist

Run this before any copy is marked final or entered into build.

- [ ] Zero exclamation marks in the entire document
- [ ] "Sign up", "Get started", "Unlock", "Grow your audience", "Content creator", "Almost there" — none of these appear anywhere
- [ ] Every CTA is specific to its action (no "Next", no "Submit", no "OK")
- [ ] Every error state has a path forward — no dead ends
- [ ] Import confirmation copy uses artist name dynamically ("We found [Name] on Spotify ✓")
- [ ] Screen 8 headline is "Your page is live." — this exact phrase, full stop, no variants
- [ ] Trust lines use specific claims ("No card. No catch." / "This page costs £0.")
- [ ] Linktree switcher copy appears on Screen 5 and Screen 8 for Journey 2 only
- [ ] "Build my page →" appears only on Screen 7 (not "Continue →")
- [ ] "Go to my page →" appears only on Screen 8 (not "View my page" or "See my page")
- [ ] All sub-inputs (date picker, track URL, venue) have placeholder text that reads as a human would say it
- [ ] Glass theme note ("works best with high-resolution artwork") is present on Screen 4
- [ ] "Your Linktree link still works while you're getting set up." is present on Screen 5 for Journey 2
- [ ] Empty state in preview reads "Your page is taking shape." before name is entered, then "This is [Name]'s page." after
- [ ] Back button reads "← Back" — nothing else
- [ ] Browser tab title reads "Set up your ABLE page — able.fm" throughout
- [ ] Progress counter is "Step N of 7" — not "Step N of 8" (Screen 0 and Screen 8 are outside the count)
- [ ] "Something else — I'll set it myself" is the label for the catch-all vibe card, not "Other"
- [ ] No copy sounds like SaaS. Read every screen aloud and ask: does this sound like a form?
