# Landing Page — User Journey Maps
**Created: 2026-03-15**
**Three journeys. Every step. Every emotion. Every decision point.**

> These are not features. These are the stories of real people. Every design decision on the landing page should serve one of these three people.

---

## HOW TO READ THIS

Each journey has:
- **The person** — who they are, what they know, what they fear
- **The path** — every step they take, including the ones that happen before they land on ABLE
- **The emotions** — what they feel at each step
- **The decision points** — where they could drop or convert
- **What ABLE must do** — exactly what the page/product must deliver at each moment

---

## JOURNEY 1 — THE NEW ARTIST (Starting fresh)

### The person

**Declan, 26, Manchester.**
Makes post-punk. 3 years playing, 1 year releasing. 2,400 Instagram followers, 800 Spotify listeners. Has a Linktree that links to Spotify and Instagram. Knows it's not doing much but hasn't found a reason to change it. Heard about ABLE from a producer he respects on Twitter.

**What he already believes:**
- His music is good and deserves more attention
- Most "music marketing" tools are designed for pop/TikTok artists, not him
- He's suspicious of anything that sounds like "grow your audience fast"
- He values authenticity over reach

**What he fears:**
- Wasting an evening setting something up that looks bad
- Looking try-hard or like he's using a generic template
- Losing control of how he presents himself
- Giving away his email and getting marketing spam

---

### The path

**Step 1 — First contact (before landing on ABLE)**

*Moment:* Reading Twitter at 11pm. Sees a producer he respects tweet: "switched my link in bio to @ablemusic — it shifts to release mode automatically when my track drops. pretty useful."

*Emotion:* Mild curiosity, slight scepticism. "What does 'shifts to release mode' mean? Probably just a redesigned Linktree."

*What ABLE needs to have done here:* Nothing — this is organic word of mouth. The fact that a peer used it is the signal he'll act on.

---

**Step 2 — Arrives at ablemusic.co**

*Moment:* Types ablemusic.co. Lands on the hero.

*First 3 seconds:*
- Sees: `For independent artists` (eyebrow)
- Reads: `100 real fans beat 10,000 strangers.` (headline)
- Sees: A phone with something playing on it

*Emotion:* "OK. That headline is different. Not 'grow your fanbase', not 'connect with fans'. And that phone looks real — there's actually music playing in it."

*Decision point 1:* Does he keep reading or close the tab?
→ He keeps reading if: the headline resonated AND the demo looks real.
→ He closes if: the demo looks fake, or the page looks like generic SaaS.

*What ABLE must deliver:*
- Demo phone must look like a real device with real content playing
- Headline must be the largest, most confident text on the page
- No exclamation marks, no generic marketing language in the first scroll

---

**Step 3 — Scrolls to the demo section**

*Moment:* Presses "Profile" → "Pre-release" → sees a countdown timer appear.

*Emotion:* "Oh. The page actually changed. That's not just a CSS trick — the whole layout shifted. The countdown is ticking. I've never seen that from Linktree."

*Decision point 2:* Does he feel the concept?
→ He gets it if: the state transition is smooth, the countdown is real, and the labels make sense.
→ He doesn't get it if: the demo feels mechanical, the transitions are janky, or the labels are jargon ("campaign states").

*What ABLE must deliver:*
- Cross-fade state transitions at 300ms — smooth enough to feel alive
- Countdown timer actually ticking in the demo (JavaScript, not static)
- State labels in plain English: "Something's coming" not "Pre-release mode"
- The quiet line below: `Artists don't change their Linktree on release day. ABLE changes for you.`

---

**Step 4 — Reads the Linktree comparison**

*Moment:* Scrolls to Section 4. Sees: `You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?`

*Emotion:* "That's... exactly my situation. I've had it for 2 years. And it doesn't know anything about my upcoming release. It just shows the same links it always does."

*Decision point 3:* Does the comparison land?
→ It lands if: the comparison feels true to his experience, not like a sales pitch against a competitor.
→ It doesn't if: it feels aggressive, or if the comparison exaggerates Linktree's failures.

*What ABLE must deliver:*
- The comparison must be factual, not sneering
- Four rows max — each one a real, specific difference he recognises from his life
- The tone: "here's the gap, you already know it exists"

---

**Step 5 — Reads fan ownership section**

*Moment:* `Every email is yours. Forever.`

*Emotion:* "That's the thing that always worried me about these platforms. What happens if they fold? This is actually answering that."

*What ABLE must deliver:*
- This section must feel like a values statement, not a feature description
- `If ABLE closes tomorrow — you export your list and leave with everything.` — this specific sentence is the trust builder
- No CTA here. Let it land.

---

**Step 6 — Clicks "Your page is free →"**

*Moment:* Returns to hero CTA. Clicks.

*Emotion:* "Alright. It's free, no card, takes 5 minutes. I'll at least see what mine looks like."

*What ABLE must deliver:*
- CTA must feel substantial — 52px height, weighted, accent fill
- Trust line below: `No card required. Free forever.`
- The click goes to start.html — and that experience must deliver on the promise

---

**Step 7 — Onboarding (continuation into start.html)**

*Moment:* Pastes his Spotify link. Sees: "We found Declan Forde on Spotify ✓"

*Emotion:* "Oh — it knows my name. And it's pulling in my artwork. This is actually smart."

*What this means for the landing page:*
The landing page promise — "Paste your Spotify or Linktree link — we'll build the rest" — must be TRUE. If onboarding delivers on it, the conversion is complete. If it doesn't (blank form, no import), the landing page has lied to him.

**This is why the Spotify import function is P0 — not P1.**

---

### Journey 1 summary — what the landing page must do

| Step | What must happen | Angle it serves |
|---|---|---|
| First 3 seconds | Demo phone real, headline dominant | 1, 2, 20 |
| Demo | States switch smoothly, countdown ticks | 2, 16 |
| Linktree comparison | Factual, specific, resonant | 6 |
| Fan ownership | Values statement, no CTA | 14, 10 |
| CTA | Weighted, trusted, clear | 4 |
| Onboarding handoff | Promise must be kept | 12 |

---

## JOURNEY 2 — THE LINKTREE SWITCHER

### The person

**Sofia, 24, London.**
Makes R&B/soul. Has been releasing for 18 months. 6,800 Instagram followers, 1,200 Spotify monthly listeners. Has a Linktree with 8 links. Her biggest pain point: she just put out a single and her Linktree still looks exactly the same as it did 3 months ago. She updated one link manually but keeps forgetting to move things around. Landed on ABLE from clicking "Made with ABLE" on a friend's profile.

**What she already believes:**
- Linktree works but she knows it's not doing the best job
- She wishes her page knew she just dropped something
- She's heard of Beacons but found it confusing and overwhelming

**What she fears:**
- Re-entering all her links manually — too much friction
- New tool being "worse" in some way she hasn't anticipated
- Losing her Linktree URL (her Instagram bio has had it for 18 months)

---

### The path

**Step 1 — Arrives from an artist profile**

*Moment:* Was on a friend's ABLE page. Saw "Made with ABLE" in the footer. Tapped it.

*Emotion:* "Oh, this is what they used to make that page. Their page looked good actually."

*Critical difference from Journey 1:* Sofia has already seen a real ABLE artist profile. She knows what the output looks like. She doesn't need convincing the product is real — she's seen it. She needs convincing to switch.

*What ABLE must deliver at this moment:*
The landing page must recognise that some visitors arrive having already seen the product. The hero needs to serve both: first-time arrivals (convince) and product-aware arrivals (convert). The Linktree comparison section is the primary message for Sofia.

---

**Step 2 — Scans the hero**

*Moment:* Reads headline. Sees demo phone.

*Emotion:* "Yeah I know what it is, I just came from one. What I need to know is whether it's worth switching from Linktree."

*Decision point 1:* Does she scroll past the hero quickly?
→ Yes, she will. The hero is for first-timers. Sofia will scroll.
→ The page must have a clear visual path that takes her to the comparison section.

*What ABLE must deliver:*
- Section 4 must be reachable without too much friction — visible on first scroll past the demo
- The headline of Section 4 (`You've had a Linktree for 2 years`) must catch her eye as she scrolls

---

**Step 3 — Hits the Linktree comparison**

*Moment:* Reads: `You've had a Linktree for 2 years. What does it know about your release dropping in 3 days?`

*Emotion:* "OK. That's literally what happened to me last week. I dropped my single and Linktree was just sitting there like nothing happened."

*Decision point 2:* Does she click the import CTA?

The import CTA — `Paste your Linktree — we'll import your links →` — is the single most important element for Sofia. It removes her biggest fear (re-entering everything manually) in one line.

→ She clicks if: the button copy specifically names what she gets (her links, imported)
→ She hesitates if: she's not sure what "import" means or whether her links will work properly
→ She doesn't click if: there's no import option and she has to start from scratch

*What ABLE must deliver:*
- Import CTA must be a ghost button (distinct from primary CTA) — visible but not shouting
- The small copy below the button is essential: `Spotify, Apple Music, YouTube, Bandcamp — anything we recognise becomes a native ABLE link.`
- The button must link to `start.html?import=linktree` and that parameter must activate the import flow immediately

---

**Step 4 — Onboarding (continuation)**

*Moment:* Pastes her `linktr.ee/sofiaokeke` URL. Sees her 8 links appear with platform badges.

*Emotion:* "Oh wow — it found all of them. Spotify is marked as music, Instagram is social. I just need to confirm these and I'm done."

*Decision point 3:* Does she trust the import?

→ She trusts it if: the links she recognises are correctly labelled
→ She doesn't if: a link is wrong or missing and there's no way to add it manually

*What ABLE must deliver (onboarding, not landing page):*
- Show each imported link with its detected type
- Allow removing any link she doesn't want
- Allow adding a manual link if one was missed
- `Import [N] links →` CTA — clear, specific count

---

### Journey 2 summary — the switcher's critical path

The switcher's journey through the landing page is faster and more direct than the new artist's. She doesn't need to be sold on the concept — she needs one specific message:

> "Your links come with you. It takes 3 minutes."

Every element on the page that serves Sofia is:
1. Linktree comparison section (primary)
2. Import CTA (the conversion moment)
3. Trust signals (fan data ownership — she wants to know her fans don't get left behind)
4. `No card required` (removes last hesitation)

**What the landing page must NOT do to Sofia:**
- Make her read 6 sections before she finds the comparison
- Hide the import CTA in body copy
- Force her to re-enter her links

---

## JOURNEY 3 — THE FAN

### The person

**Marcus, 21, Bristol.**
Not a musician. Went to a gig last week. The artist (who uses ABLE) mentioned their ABLE page from the stage: "Go to my page, sign up for updates." Marcus opened it on his phone during the show, signed up. Today, he went back to the page and saw "Made with ABLE" in the footer. Tapped it out of curiosity.

**What he already believes:**
- He's on this page by accident
- He's not trying to sign up for a music marketing tool
- He might be interested if ABLE has a fan-facing experience

**What he fears:**
- Being treated like an artist when he's not one
- Being forced into a sign-up flow for a product that's not for him

---

### The path

**Step 1 — Lands on the hero**

*Moment:* Lands on ablemusic.co. Reads: `For independent artists`. Reads: `100 real fans beat 10,000 strangers.`

*Emotion:* "This is for artists. I'm not an artist. What is this?"

*Decision point:* Does he leave immediately?
→ He might. The hero is explicitly for artists.
→ He stays if: there's a signal somewhere that this is the right place to discover more artists.

*What ABLE must deliver for Marcus:*
The landing page primary job is artist acquisition — it should NOT be redesigned for fans. But one line in the footer is enough: `Not an artist? Find artists on ABLE →`

Marcus will scroll the page briefly, get to the footer, see that line, and click. That's the entire fan journey through the landing page. It's one line, it's right, and it's all it needs to be.

---

**Step 2 — Footer**

*Moment:* Sees: `Not an artist? Find artists on ABLE →`

*Emotion:* "OK so there's something for fans too. Let me see."

*Decision point:* Does he click?
→ Yes, if the link is there. He has no reason not to.
→ The destination (fan.html or a discovery page) is what does the job from here.

*What ABLE must deliver:*
- One line in the footer
- Clear link to the fan experience
- No more than that — do not build a fan section into the landing page

---

### Journey 3 summary

The fan's landing page journey is:
1. Land on hero (clearly for artists)
2. Scroll to footer
3. Find `Not an artist? Find artists on ABLE →`
4. Click through to fan.html

**This is correct. Do not over-engineer it.**

The fan's real experience is on the artist's ABLE profile page (able-v7.html), not on the landing page. The landing page job is artist acquisition. One footer line handles the fan entry point correctly.

---

## CROSS-JOURNEY INSIGHTS

### What all three journeys share

1. **The demo must work.** All three visitors scroll past the demo. For Journey 1, it's the conversion moment. For Journey 2, it's confirmation she already made the right choice. For Journey 3, it's what the artist who sent him here is using. A broken demo loses all three.

2. **Speed matters.** Journey 1 has patience — he's genuinely curious. Journey 2 has very little patience — she's already decided she might switch, she just needs one confirmation. Journey 3 has almost no patience — he's here by accident. The page must deliver value at every scroll depth, not just at the bottom.

3. **Trust is different for each.**
   - Journey 1: trusts the concept if the demo is real and the copy sounds honest
   - Journey 2: trusts the product if the import works and her data is safe
   - Journey 3: doesn't need trust — she just needs a door

### The critical gap between journeys 1 and 2

Journey 1 (new artist) enters through the hero and goes top-to-bottom.
Journey 2 (switcher) enters through the hero but needs Section 4 quickly.

The page architecture must serve both — and it does, because Section 4 (Linktree comparison) comes before the trust/feature sections. The switcher finds her section before she gives up. The new artist builds through every section and reaches the CTA having heard the full argument.

**This ordering is correct. Do not change it.**

---

## HOW THIS MAPS TO THE BUILD

| Page element | Journey 1 | Journey 2 | Journey 3 |
|---|---|---|---|
| Eyebrow: "For independent artists" | Filters in ✓ | Confirms ✓ | Filters out (correctly) |
| Hero headline | Conversion hook ✓ | Quick scan ✓ | Irrelevant |
| Demo section | Core conversion ✓ | Confirmation ✓ | Irrelevant |
| Linktree comparison | Strong persuasion ✓ | **Primary conversion** ✓ | Irrelevant |
| Import CTA | Bonus feature | **Decision moment** ✓ | Irrelevant |
| Fan ownership section | Trust builder ✓ | Confirms data safety ✓ | Irrelevant |
| How it works | Removes friction ✓ | Quick scan ✓ | Irrelevant |
| Pricing | Confirms free ✓ | Confirms cost ✓ | Irrelevant |
| FAQ | Final objection removal ✓ | Quick check ✓ | Irrelevant |
| Footer fan line | Irrelevant | Irrelevant | **Only thing that matters** ✓ |
