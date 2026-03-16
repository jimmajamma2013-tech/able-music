# ABLE Copy System — Master Spec
**Created: 2026-03-15 | Authority: DEFINITIVE**

> This is the single authoritative voice guide for all copy on the ABLE platform. If a per-page COPY.md conflicts with this document, this document wins. If a developer writes copy not covered here, they must check it against the governing principle in section 2.1.
>
> This spec is written to be usable by a contractor who has never read any other ABLE document. It contains everything they need.

---

## 2.1 The governing principle

The artist-fan relationship belongs to them, not to ABLE. ABLE's copy serves as a door — it opens, it's clear, then it gets out of the way. Every word asks: **does this serve the artist or ABLE's ego?**

ABLE is not a marketing platform. It is not a SaaS product. It is a place for artists to be themselves and for fans to stay close. The copy must always feel like it was written by someone who has been in the room — not a startup trying to sound cool.

**The test for any piece of copy:**
1. Would an artist with real credibility be embarrassed if this appeared on their page?
2. Does this sound like a form, a startup, or a hustle? If yes, rewrite it.
3. Read it aloud. If you would not say this to a friend in the music industry, it is wrong.

---

## 2.2 Voice register table

This is the single most important reference. Every context has a register. Do not confuse them.

| Context | Who is speaking | Register | Example |
|---|---|---|---|
| Artist profile — body | The artist | Direct, first-person, their own voice | "I've been working on this for two years. It's done." |
| Artist profile — defaults | ABLE writing in the artist's voice | Understated, warm, short | "Stay close." |
| Artist profile — fan CTAs | The fan speaking | First-person, low-pressure | "I'm in." / "Count me in." |
| Admin greeting | ABLE to the artist | Warm, one beat, professional | "Good to see you, James." |
| Admin sub-greeting | ABLE, contextual, specific | Observational, direct | "3 days until Somewhere Else drops." |
| Admin nudge | ABLE, honest peer | Specific, no hyperbole | "3 fans this week — that's new. Send them something." |
| Admin empty state | ABLE | Honest, specific, no placeholder feel | "Playing anywhere soon? Your fans want to know →" |
| Admin confirmation toast | ABLE | Brief, matter-of-fact | "Saved." |
| Fan dashboard | ABLE writing about artists | Anticipatory, specific, present tense | "Something new from Nadia today." |
| Fan dashboard empty | ABLE | Honest, not apologetic | "You're here because of an artist. Find them — or find someone new." |
| Landing page — headline | ABLE, confident | Direct statement, no hype | "100 real fans beat 10,000 strangers." |
| Landing page — body | ABLE | Inside knowledge, industry fluency | "What does it know about your release dropping in 3 days?" |
| Landing page — CTA | ABLE | First-person, specific about value | "Your page is free →" |
| Onboarding | ABLE | Patient, direct, human | "What do you go by?" |
| Error states | ABLE | Calm, specific, gives a path forward | "Couldn't reach Spotify right now. Enter your name below and we'll carry on." |
| Confirmation emails | ABLE writing on behalf of artist | Artist-voiced, not platform-voiced | "[Artist Name] asked me to check this is actually you." |
| Tier gate copy | ABLE | Specific about what the artist gains, no pressure | "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up. From £19/month." |

---

## 2.3 Banned phrases — master list

These phrases are banned from all user-facing copy on ABLE. No exceptions. If a banned phrase is found in built code, it must be replaced before shipping.

### Category 1: Growth/marketing language
- "Turn fans into superfans"
- "Grow your audience" → say "reach people who care" or just describe the action
- "Monetise your fanbase" / "Monetize" → say "let people support you directly"
- "Engage your followers" / "Engage with your fans" → say "stay close to the people who show up"
- "Going viral" / "Viral" → never
- "Boost your profile" / "Supercharge" / "Level up" / "Skyrocket"
- "Leverage" / "Unlock" / "Power up"
- "Audience growth" / "Audience building"

### Category 2: Platform/corporate language
- "Content creator" → say "artist"
- "Content" (when referring to music, updates, or art) → say "music", "update", "message from the artist"
- "Followers" → say "people who follow them" or "your fans"
- "Superfan" — internal vocabulary only, never user-facing
- "CRM" / "Fan CRM" → say "your list" or "the people who signed up"
- "Dashboard" in page titles or UI labels → the page title is never "Dashboard"; the home screen is just "Home" or unlabelled
- "Mailing list" → say "your fans" or "the people who signed up"
- "Newsletter" → say "keep them in the loop" or "write to them"
- "Feed" (for the fan page) → say "Following" or "The artists you're following"
- "Subscribers" → say "fans" or "people on your list"
- "Community" (when it means "audience") → say "your fans" or "the people who show up"
- "Journey" / "Experience" / "Ecosystem"
- "Profile" (when talking to fans — they should never know they're on a "profile")

### Category 3: SaaS micro-copy
- "Welcome aboard!" / "You're all set!" / "You're good to go!"
- "Get started!" / "Get started" as a CTA
- "Almost there!" — banned even without the exclamation mark
- "Let's go!" / "Let's get started!"
- "Sign up" as a CTA label → say "I'm in" / "Stay close" / "Count me in"
- "Submit" as a button label → say what the action actually does
- "Next" as a button label in onboarding → say what happens next ("Continue →" is the minimum; specific is better)
- Generic "Learn more" → say what they'll learn
- "Find out more" → same
- "Explore" as a primary CTA

### Category 4: Punctuation and register
- Exclamation marks on admin/dashboard copy — zero exceptions
- Exclamation marks in any ABLE-written copy (artist can use them in their own content)
- "Trending" → never on ABLE
- "Recommended for you" → say "Because you follow [Artist]" or "Similar sound"
- "People like you" / "Users like you" → never
- Any price shown with pence (£4.99 → show as £5)
- Emoji in admin/dashboard copy unless the artist set them in their own content
- "Fans" used as a vanity metric ("Your fan count is growing") → say "people" or show the number

### Category 5: Artist-profile specific bans
- "Subscribe to updates" → "Stay close."
- "Get notified" → anything in the artist's voice
- "Join the list" → it's their list, not the platform's
- "Follow" (as a CTA on the artist's page) → never; the artist has followers, they are not followed on ABLE
- "You're all set!" as a post-sign-up confirmation → "You're in."
- "Welcome!" as a post-sign-up response → "You're in. I'll keep you close."
- "Exclusive content" → say what it actually is ("new music before it's out", "first shot at tickets")
- "Join the community" → "Join the circle" or nothing
- "Become a supporter" → "Come closer"
- "Premium access" / "Exclusive benefits" / "Exclusive access"
- "Unlock" preceding anything
- Section headers in third person ("Music", "Events") — default is first person ("My music", "Shows")

---

## 2.4 Artist default copy

These are the strings that appear on a brand-new artist's page before they have customised anything. They must feel like the artist chose them, not like ABLE filled in a placeholder.

**The golden rule for defaults:** every default must be plausibly the artist's own voice. If a fan read it, they should believe the artist typed it.

### Hero section
| Element | Default | Notes |
|---|---|---|
| Artist name | Empty — show nothing | Never "Artist Name" or any placeholder |
| Tagline / bio | Empty — show nothing | Empty is correct. No placeholder text to fans. |
| Hero CTA (primary) | "My music" | Or "Listen", "Stream", "Hear this" — all acceptable |
| Hero CTA (secondary) | "Stay close" | Scrolls to fan sign-up |

### Fan sign-up module
| Element | Default | Notes |
|---|---|---|
| Heading | "Stay close." | Period is intentional. Display font, large. |
| Subtext | "Just your email. I'll reach out when something's actually happening." | Artist-voiced |
| Input placeholder | "Your email" | Not "Email address", not "you@email.com" |
| Submit button | "I'm in" | First-person fan voice |
| Trust line | "Just [Artist Name]. No spam." | Dynamic — uses artist name |
| Post-submit toast | "You're in." | Period. No exclamation. |
| Post-submit module text | "You're in. I'll keep you close." | Artist-voiced confirmation |

### Snap cards
Default: no snap cards. The snap cards row is hidden if empty. Never show a placeholder snap card with ABLE-written text.

### Section headers (when sections exist)
| Section | Default |
|---|---|
| Music | "My music" |
| Events | "Shows" |
| Merch | "Stuff" |
| Recommendations | "Artists I believe in" |

### Made with ABLE footer
```
Made with ABLE
```
Style: small, quiet, never competing. This is the only place ABLE's name appears on an artist's page. It is never "Powered by ABLE" or "Built on ABLE".

---

## 2.5 Page-by-page copy rules

### able-v7.html — Artist public profile

1. This page speaks in the **artist's voice**. ABLE is invisible.
2. All defaults must feel artist-written, not ABLE-generated.
3. Fan CTAs are **fan first-person** ("I'm in", not "Sign up").
4. Empty sections are hidden — never show "nothing here yet" to fans.
5. Owner-mode copy is the exception — the artist sees edit prompts, fans never do.
6. The word "profile" never appears to fans. The word "dashboard" never appears anywhere.
7. Auto-save toast: "Saved." — period, lowercase 's' after initial.
8. Share confirmation toast: "Copied." — period.
9. The `og:description` default is: `"Music, shows, and more — direct from [Artist Name]."` — never "Artist profile powered by ABLE".

### admin.html — Artist dashboard

1. ABLE speaks to the artist like a **smart manager, not a SaaS product**.
2. Greeting: "Good to see you, [First Name]." — warm, one beat, done. No sub-line on day 1 except "Your page is live."
3. Never use "Dashboard" in any visible copy. The page title is "ABLE" or "[Name] — ABLE". Never "Dashboard — ABLE".
4. Stat labels are single words: "Visits", "Clicks", "Fans", "Click rate" — not "Link clicks" or "Fans joined".
5. Tier gate copy always says what the artist gets, then the price. Never just "Upgrade".
6. Destructive action copy (delete, reset): calm and specific. "This removes your page and all fan data. This cannot be undone." — no dramatic styling.
7. Export copy: "Export as CSV →" — always available, always visible.
8. Toast copy: "Saved." for most saves. More specific where warranted (e.g., "Show added.").

### start.html — Onboarding wizard

1. Questions, not labels. "What do you go by?" not "Artist Name:".
2. CTAs are specific to the action. "Continue →" minimum. "Build my page →" on the final step.
3. No "Next", "Submit", "OK", "Done" as button labels.
4. Error states are never red unless it is genuinely an error. Import failures are amber.
5. Trust lines are specific: "No card. No catch. Your page is free." — not "Risk-free".
6. The done screen headline is exactly: "Your page is live." — period, this phrase, no variants.
7. "Almost there" is banned even without an exclamation mark.

### landing.html — Marketing landing page

1. Speaks to a sceptical, intelligent, independent artist.
2. Never uses industry growth-speak.
3. Primary CTA: "Your page is free →" — first-person, specific.
4. Social proof: real numbers only. No inflated stats. No "Most popular" tier badge.
5. FAQ answers are short and direct. "Yes. Free forever." not "Absolutely, our free tier is..."
6. The FAQ section title is: "Questions." — single word, period.
7. Footer authenticity line: written in first person from the founder, not corporate voice.

### fan.html — Fan dashboard (Phase 2)

1. ABLE is invisible. The artists are visible.
2. "Following" not "Feed". "Me" not "Profile". "Updates from your artists" not "Notifications".
3. Empty states acknowledge reality without spin: "Nothing new today." is correct. "You're all caught up!" is not.
4. Dates and times are specific: "Tonight, 11pm" not "Upcoming event".
5. Artist voice > platform voice. Dispatch copy appears verbatim from the artist.
6. No follower counts, no trending, no engagement signals.

---

## 2.6 Tone calibration examples

Ten before/after rewrites. These are the definitive test for whether new copy fits ABLE's voice. If a contractor is unsure about a line, they should check it against these examples.

### 1. Fan sign-up heading
**Before:** "Subscribe to get updates from this artist"
**After:** "Stay close."
**Why:** "Stay close" is the artist speaking to someone they value. "Subscribe to get updates" is a platform managing a transaction.

### 2. Post-sign-up confirmation
**Before:** "You're subscribed! We'll send you updates."
**After:** "You're in. I'll keep you close."
**Why:** First person, artist-voiced. The artist is speaking directly. "Subscribed" is a platform category. "You're in" is human.

### 3. Admin greeting
**Before:** "Welcome back, James! You're on a roll — 3 new fans this week."
**After:** "Good to see you, James. 3 fans this week — that's new."
**Why:** "Welcome back" is SaaS filler. "You're on a roll" is the voice of a cheerleader. The after version is warm but not sycophantic.

### 4. Tier gate copy
**Before:** "Upgrade to Pro to unlock full analytics and email broadcasts."
**After:** "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up. From £19/month."
**Why:** "Upgrade to unlock" is the model where the platform withholds things until you pay. The after version describes what the artist actually gets and why it matters. "Unlock" is banned.

### 5. Empty fan list
**Before:** "No fans yet. Share your page to start building your audience."
**After:** "When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way."
**Why:** "Start building your audience" is growth-speak. The after version is honest about what the list is and why it matters — without making the artist feel like a failure for not having fans yet.

### 6. Error state — email invalid
**Before:** "Error: Please enter a valid email address."
**After:** "Check your email address."
**Why:** "Error:" is cold. "Please enter a valid" is form language. The after version is calm, specific, and doesn't apologise.

### 7. Empty events section — admin
**Before:** "No shows added yet. Click the + button to add a show."
**After:** "Playing anywhere soon? Your fans want to know →"
**Why:** The before is documentation. The after is a reason to act. It connects the empty state to why the feature exists.

### 8. Onboarding done screen
**Before:** "You're all set! Your profile is live. Start sharing your page to get your first fans."
**After:** "Your page is live."
**Why:** "You're all set!" is banned. "Start sharing your page to get your first fans" is growth-speak. "Your page is live." says the only thing that matters. Full stop. Done.

### 9. Close Circle invitation
**Before:** "Become a supporter and get exclusive content, early access, and premium benefits."
**After:** "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere. £5 a month. You can leave whenever."
**Why:** "Exclusive content" and "premium benefits" are subscription product language. The after version describes specifically what happens, honestly, without pressure or corporate vocabulary.

### 10. Toast — profile saved
**Before:** "Profile saved successfully!"
**After:** "Saved."
**Why:** "Successfully" is redundant — if it saved, it saved. The exclamation mark is banned in admin. The period is intentional. The word is enough.

---

## 2.6b Campaign state copy — exact strings for every surface

Each of the 4 campaign states has specific copy across every surface it appears on. These are locked strings — do not paraphrase or abbreviate.

### State: `profile` (default)

| Surface | Copy |
|---|---|
| Page hero label | _(none — artist name and bio only)_ |
| Admin Campaign HQ state pill | "Live" _(the page is live; this is the default)_ |
| Admin Campaign HQ description | "Your page is live. Put the link in your bio." |
| Fan sign-up heading (default) | "Stay close." |
| Fan sign-up sub | "Just your email. I'll reach out when something's actually happening." |

### State: `pre-release`

| Surface | Copy |
|---|---|
| Page hero label | "[Release title] — [N] days" (e.g. "Echoes — 3 days") |
| Page hero CTA primary | "Pre-save [Release title]" |
| Page countdown label | "Until [Release title]" |
| Admin Campaign HQ state pill | "Pre-release" |
| Admin Campaign HQ description | "[Release title] drops on [Date]. Pre-release mode is on." |
| Fan sign-up heading | "You signed up right before something." |
| Fan sign-up sub | "[Release title] comes out in [N] days. You'll hear it first." |
| Fan confirmation email subject | "[Release title] — [N] days" |

### State: `live`

| Surface | Copy |
|---|---|
| Page hero label | "[Release title] — out now" |
| Page hero CTA primary | "Stream [Release title]" |
| Admin Campaign HQ state pill | "Live" _(release window active)_ |
| Admin Campaign HQ description | "[Release title] is out. You have [N] days in live mode." |
| Fan sign-up heading | "Stay close." |
| Fan sign-up sub | "[Release title] is out. You can stream it from here." |
| Fan confirmation email subject | "[Release title] is out" |

### State: `gig`

| Surface | Copy |
|---|---|
| Page hero label | "On tonight" |
| Page hero CTA primary | "Get tickets" |
| Page venue/time line | "[Venue], [City]. Doors [Time]." |
| Admin Campaign HQ state pill | "Gig mode" |
| Admin Campaign HQ description | "Your page is in gig mode. It auto-resets in [N] hours." |
| Admin gig mode countdown | "Resets in [Nh Nm]" |
| Fan sign-up heading | "I'm playing tonight." |
| Fan sign-up sub | "Sign up and I'll keep you close after the show." |
| Fan confirmation email subject | "Tonight at [Venue]" |

---

## 2.7 Additional rules for contractor use

### Length hierarchy
- **Toast:** 1–4 words. No exceptions.
- **Nudge:** 1 sentence + a link. No more.
- **Section empty state:** 1–2 sentences. Not a paragraph.
- **Tier gate:** 2–3 sentences + price + CTA. Not a feature list.
- **Hero copy (profile):** 1 line for the name. 1 line for location/genre. 1–2 sentences for bio. No more on the hero.
- **Onboarding steps:** 1 question + 1 sub-line. Nothing else.

### Punctuation rules
- Periods on short standalone statements: "Saved." / "Your page is live." / "You're in."
- Em dash (—) for asides and lists within sentences: "Your list. Your relationship. No algorithm in the way."
- Arrow (→) on CTAs that navigate or go deeper: "Export as CSV →" / "See what's included →"
- No colons on button labels
- No exclamation marks in any ABLE-written copy
- Ellipsis (...) only on actively loading states ("Checking...")
- Commas are specific — if you can replace a comma with a period, use the period

### Writing for mobile
- Mobile users scan, not read. The first two words of every label carry the full load.
- Test every line at 320px. If it wraps awkwardly, rewrite it, do not shrink the font.
- Short labels win: "Visits" not "Page visits this week". The context makes the short label clear.

### What to do if you're unsure
1. Read it aloud as if you are talking to a musician who is serious about their work
2. Check it against the banned phrases list in section 2.3
3. Check it against the register table in section 2.2
4. Check it against the calibration examples in section 2.6
5. If still unsure: write it shorter. Shorter is almost always better on ABLE.

---

## §7 Copy patterns that work — with examples from the product

These are live strings from across the ABLE platform that have been through the full voice audit. They are the reference standard. When writing new copy, compare it to these.

---

### Pattern 1: The honest zero state

The empty state is not a failure. Treat it as a fact.

**Fan list — no fans yet:**
> "When fans sign up on your page, they'll appear here. Your list. Your relationship. No algorithm in the way."

**Events section — no shows added:**
> "Playing anywhere soon? Your fans want to know →"

**Fan dashboard — nothing new from followed artists:**
> "Nothing new from your artists today."

**Why these work:** They name reality without apologising for it or spinning it. They state the situation, then give a reason to care.

---

### Pattern 2: The single true thing

The best ABLE copy makes one true statement and stops. It does not explain itself.

**Hero headline:** `100 real fans beat 10,000 strangers.`
**Saved toast:** `Saved.`
**Done screen:** `Your page is live.`
**First fan milestone:** `Your first fan. This is how every list starts.`
**Post-sign-up:** `You're in.`

**Why these work:** There is nothing to add. Explanation would dilute them. The period is doing work — it closes the thought before the reader can doubt it.

---

### Pattern 3: Name what they actually get

Tier gates and upgrade prompts always name the specific thing, then the price. Never abstract value.

**Broadcasts gate:**
> "Write to your fans directly. Not a broadcast. Not a newsletter. Just you and the people who signed up. From £19/month."

**Close Circle invitation:**
> "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets, occasional messages that don't go everywhere. £5 a month. You can leave whenever."

**Fan list export gate:**
> "Download your full fan list with source data — which platform sent each fan, when they signed up. From £19/month."

**Why these work:** The feature is described as the artist experiences it, not as a product SKU. "Write to your fans directly" is more honest than "Email broadcasting". The price appears last, after the value is clear.

---

### Pattern 4: Context-aware nudges

A nudge that reads the artist's actual situation lands. A nudge that fires on a timer doesn't.

**Zero views after 24 hours:**
> "Your page is live at ablemusic.co/[slug]. Have you shared it yet?"

**Views with no sign-ups after 3 days:**
> "You've had [N] visitors. None have signed up yet. That usually means: the sign-up form is below the fold, or the page doesn't have enough content yet to earn it. The most common fix: add a photo and a bio."

**Artist approaching fan cap:**
> "You have [N] fans. The free tier holds up to 100. When you hit 100, sign-ups will stop."

**Why these work:** They state the specific situation first. They give a reason for it. They give one clear action. No pep talk, no manufactured urgency.

---

### Pattern 5: The artist-voiced default

Defaults on the artist profile must feel like the artist typed them, not like ABLE filled in a placeholder.

**Fan sign-up heading:** `Stay close.`
**Fan sign-up sub:** `Just your email. I'll reach out when something's actually happening.`
**Gig mode fan sign-up heading:** `I'm playing tonight.`
**Pre-release fan sign-up heading:** `You signed up right before something.`
**Post-submit module:** `You're in. I'll keep you close.`

**Why these work:** First person. Specific to the moment. Short. The fan reads them and hears the artist, not a platform.

---

### Pattern 6: Fan-first CTAs

Fan CTAs are in the fan's voice. The fan is making a choice, not receiving an action.

**Fan sign-up button:** `I'm in`
**Close Circle join:** `Come closer`
**Close Circle non-join:** `Keep as is`
**PWA prompt — accept:** `Add`
**PWA prompt — decline:** `Not now`
**Push notification — accept:** `Turn on`

**Why these work:** The fan is speaking as themselves. "I'm in" is a commitment the fan makes willingly. "Come closer" is a direction the fan chooses to move, not a product action done to them.

---

### Pattern 7: Milestone copy — warm but not sycophantic

Fan milestones in the admin are the warmest copy on the platform. They acknowledge the moment without celebrating it for ABLE's benefit.

| Milestone | Copy |
|---|---|
| First fan | "Your first fan. This is how every list starts." |
| 3 fans | "3 people who showed up. They came because of you." |
| 10 fans | "10 fans. A real group. Someone in that list will come to your show." |
| 50 fans | "50 fans. You're past the point where this is an experiment." |
| 100 fans | "100 fans. A real list. These people chose to hear from you directly." |

**Why these work:** Each one names the number, then says one true thing about what that number means for a working artist — without cheerleading, without attributing the success to ABLE.

---

### Pattern 8: Notification copy — specific and immediate

Fan notifications name the artist, the action, and the detail. They read like something a person sent, not an alert.

**New release:**
> "[Artist name] just dropped [Release title]."

**Show tonight:**
> "[Artist name] is playing tonight at [Venue], [City]. Doors [time]."

**Pre-release countdown (< 7 days):**
> "[Release title] by [Artist name] drops in [N] days."

**Why these work:** The subject of each sentence is the artist, not the platform. "Nova Reign just dropped Somewhere Else." is a sentence a person might say. "New music has been added from an artist you follow." is not.

---

### Pattern 9: Confirmation email voice

Confirmation emails are sent by ABLE but voiced as the artist. ABLE's branding appears only in the footer.

**Fan confirmation subject (pre-release state):**
> "[Release title] — [N] days"

**Fan confirmation body:**
> "[Artist Name] asked me to check this is actually you.
> [Confirm →]
> If you didn't sign up, ignore this."

**Artist welcome subject:**
> "Your ABLE page is live."

**Why these work:** "Asked me to check" positions ABLE as a messenger, not a platform. The confirmation is framed as the artist verifying the relationship, not a system verifying an account.

---

### Pattern 10: The gig mode tonight note

The tonight note in gig mode is mandatory artist-written copy. It is the most human moment on the platform. Examples of what it should sound like:

> "I've been looking forward to this for months. The room is small. It's going to be good."
> "Playing [venue] tonight. Doors at 8. Come early."
> "This might be my favourite venue I've ever played. Come if you can."

**Why these work:** They are written by the artist before the show, while they still care about it. They are not event listings. They are someone talking to another person. ABLE does not generate them. ABLE protects the space for them.
