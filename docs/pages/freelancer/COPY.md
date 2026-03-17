# Freelancer Profile — Copy Specification
**File: `freelancer.html` | Created: 2026-03-16**

> Complete copy for every string on the freelancer profile and its related admin views. Register: professional but human. Direct. The freelancer's own voice where possible. Evidence over self-description.

---

## COPY PHILOSOPHY (FREELANCER CONTEXT)

The freelancer profile sits in a different register from the artist profile. The artist profile is emotional — it is the artist's world, their voice, their relationship with fans. The freelancer profile is professional — it is evidence of work, accessibility, and trustworthiness.

The risk is drifting toward LinkedIn register ("I am a passionate music professional with 10+ years of industry experience") or SaaS product copy ("Streamline your bookings with ABLE's professional freelancer profile").

**The right register:**
- First person where the freelancer speaks, but spare — fewer words carry more weight
- Credits are the evidence. Copy supplements, not substitutes.
- "Taking on work now" sounds like a person. "Available for hire" sounds like a job listing.
- "Get in touch" sounds like a conversation starting. "Book now" sounds like a hotel.
- Rate card: specific numbers over vague qualifiers. "From £300/track" over "Competitive rates."

**What never appears on this page:**
- "Industry professional"
- "Passionate"
- "Competitive rates" / "rates vary depending on project scope"
- "Monetise your skills"
- "Grow your network"
- "Leverage your credits"
- "Content creator"
- "Going viral"
- Exclamation marks

---

## IDENTITY HEADER

### Availability chip states
```
Taking on work now
Selective right now
Not booking at the moment
```

Notes:
- "Taking on work now" — present tense active. Not "Available" (job listing). Not "Open for business" (corner shop).
- "Selective right now" — honest. Implies they're good enough to be selective. Doesn't say "limited availability" which sounds like airline seats.
- "Not booking at the moment" — personal. Not "Currently unavailable" (out-of-office).

### Hero CTAs

**Primary:**
```
Get in touch
```

**Secondary:**
```
Hear the work
```

Notes:
- "Get in touch" — starts a conversation. "Book now" closes one before it starts.
- "Hear the work" — imperative but inviting. "Listen to samples" is clinical. "Check my portfolio" is self-promotional.

---

## CREDITS SECTION

### Section header
```
Credits
```

Not "My credits" — the section heading belongs to the page, not needs qualification. "Credits" is the industry term. Use it.

### Confirmed credit row
```
[Artwork]   [Release title]   [Artist name]   ✓   [Year]
```

### Unverified credit row (visual distinction — lower opacity)
```
[Artwork]   [Release title]   [Artist name]       [Year]
```

### Credit expansion
```
Show all [N] credits
```

When expanded:
```
Hide credits
```

### Credit tap destination (confirmed, artist on ABLE)
Navigates to artist ABLE profile. No overlay. Just the profile.

### Empty state (no credits yet)
```
Credits appear here once artists confirm them.
```

Sub-copy (edit mode / admin only):
```
Add a credit below, and we'll ask the artist to confirm it. Once confirmed, it becomes a live link on their page — and here.
```

### Pending credits state (credits added but not yet confirmed)
```
1 credit awaiting confirmation
```
or
```
3 credits awaiting confirmation
```

Admin sub-copy:
```
We've sent confirmation requests. These will show with a check mark once confirmed.
```

---

## ARTISTS ON ABLE SECTION

### Section header
```
Artists on ABLE
```

Not "Clients" — too transactional.
Not "Collaborators" — too vague.
"Artists on ABLE" is specific to the platform context and says exactly what it is.

### Empty state (hidden to visitors — only shown in edit mode)
```
This section appears once you have 2 or more confirmed credits with ABLE artists.
```

---

## PORTFOLIO SECTION

### Section header
```
Work
```

Not "Portfolio" (sounds like a school project). Not "Samples" (sounds like a Spotify short clip). "Work" is what it is.

### Audio item (default label if freelancer doesn't add one)
```
[Release title]
```

### Audio item with custom label
```
[Release title]
[Freelancer's one-line label]
```

Example:
```
Dissolve
Production and arrangement for Nadia's debut single
```

### Video item label
```
[Release or project title]
[Optional one-line label]
```

### Photo grid (for photographers/videographers)
```
[Alt text required — describe the image for accessibility]
```

### Empty state (edit mode only)
```
Add a SoundCloud or YouTube link to share your work.
```

Sub-copy:
```
Pick your 2–3 best pieces. Visitors decide with their ears, not their eyes.
```

Notes on that sub-copy: this is edit-mode guidance, not visible to profile visitors. It nudges the freelancer toward curation (2–3 best) rather than bulk upload.

---

## RATE CARD SECTION

### Section header
```
Working together
```

Not "Pricing" (checkout page energy). Not "Services" (HR department). "Working together" frames the rate card as the start of a conversation.

### Service + price display
```
[Service name]        [Price format]
```

Examples:
```
Production            From £300/track
Mixing                £150–£250/track
Stem mixing           £80/track
Full EP package       Let's talk
```

"Let's talk" — correct for services where the scope varies too much for a number. Better than "POA" (sounds classified ad), "Quote on request" (formal), or "Get in touch" (duplicates the CTA).

### Response time
```
Response time         Usually within 2 days
```

or

```
Response time         Usually same day
```

Or if not set: omitted entirely. The field only shows value if it's accurate.

### Availability in rate card section

The availability shown in the rate card section is the same state as the chip in the header — presented as a text line here for scanning in context:

```
Availability          Taking on work now
```

or

```
Availability          Selective right now
```

or

```
Availability          Not booking at the moment
```

### Empty rate card state (edit mode only)
```
Add your rates below. Specific numbers ("From £300/track") build more trust than "competitive rates."
```

Notes: this is edit-mode guidance. It nudges toward specificity.

---

## BOOKING FORM (BOTTOM SHEET)

### Sheet header
```
Get in touch with [Name]
```

Example: "Get in touch with Maya"

Using the freelancer's name makes it feel personal, not functional. It's reaching out to a person.

### Field labels
```
Your name
Your email
What you're working on
What you need
Your ABLE page (optional)
```

Notes:
- "Your name" not "Name" — the possessive makes it warmer, slightly more personal
- "What you're working on" not "Project description" or "Project brief" — the artist is working on something; this field invites them to share it in their own words
- "What you need" not "Service required" — "service required" is a helpdesk form; "what you need" is a human question
- "Your ABLE page (optional): ablemusic.co/ [  ]" — the "ablemusic.co/" prefix is pre-filled so the artist only types their handle. This is practical and signals ABLE's identity without being intrusive.

### ABLE page field placeholder
```
ablemusic.co/ [your-handle]
```

### Submit button
```
Send
```

Not "Submit" — "submit" is a form action. "Send" is what you do with a message.

### Success state
```
Sent. [Name] will get back to you.
```

Example: "Sent. Maya will get back to you."

Uses the freelancer's name again. Implies a real person will read this. Not a ticket system.

Not:
- "Your enquiry has been submitted" — IT support ticket
- "We'll be in touch shortly" — "We" is wrong; it's Maya, not ABLE
- "Thanks for reaching out" — generic and hollow

### Rate limit hit
```
Maya receives a lot of enquiries. Try again tomorrow.
```

Notes: honest and human. The freelancer's name in the message is warmer than a system error. "Try again tomorrow" is accurate and plain. Not "You have reached the maximum number of enquiries for today."

---

## PEER CONFIRMATION FLOW (ARTIST ADMIN — seen by the artist, not the freelancer)

### Notification card in admin.html
```
[Name] says they worked on your track "[Release title]" — right?
```

Example:
```
Maya Beats says she produced your track "Dissolve" — right?
```

### Confirmation options
```
[Confirm]    [Not quite]    [Ask me later]
```

Notes:
- "Confirm" — direct. One word. No ceremony.
- "Not quite" — softer than "Reject" or "Deny." Opens a correction flow without the confrontational energy of a dispute.
- "Ask me later" — honest. Artists are busy. This is not a trick; it snoozes for 7 days.

### "Not quite" correction field
```
What would you like to correct?
```

Sub-copy:
```
We'll let Maya know.
```

Simple. No blame. The artist may have had a slightly different role description in mind. The correction is passed to the freelancer.

### Snooze behaviour (Ask me later — second notification, 7 days later)
```
Just checking back in: Maya Beats says she worked on "Dissolve." Confirm or skip?
```

```
[Confirm]    [Skip]
```

Notes: "Skip" replaces "Not quite" and "Ask me later" on the second notification — simpler choice, respects the artist's time. After "Skip", the credit remains unverified and no further prompts are sent.

### Confirmation success (artist view, after tapping Confirm)
```
Done. Maya's credit is confirmed.
```

Simple, warm. The action is acknowledged. No fanfare.

### Freelancer notification (received when a credit is confirmed)
```
[Artist name] confirmed your credit on "[Release title]."
```

Example:
```
Nadia confirmed your credit on "Dissolve."
```

No "Congratulations!" No exclamation mark. Just the fact. The freelancer knows what it means.

---

## EMPTY STATE (NEW FREELANCER — visible to visitors during first 1–4 weeks)

### Credits section empty state (visible to visitors, no credits at all)
```
Credits appear here once artists confirm them.
```

This is all. No "No credits yet." No "Be the first to confirm a credit." Just the honest state.

### Profile in early build (optional first-person bio field — freelancer written)

This is not system-generated copy. It is a text field the freelancer fills in during wizard or in admin. The wizard placeholder copy:

```
One line about your work. What do you make? What does it sound like?
Example: "I make records. Primarily indie and alternative — anything with space and texture."
```

Notes: the example models the right register without being prescriptive. It shows first-person, specific, sound-focused.

---

## FREELANCER ADMIN — BOOKING ENQUIRIES

### Section header in admin
```
Enquiries
```

Not "Bookings" (premature — the booking hasn't happened yet). Not "Messages" (too generic). "Enquiries" is accurate: these are people enquiring.

### Unread enquiry badge
```
[N] new
```

Example: "3 new"

### Enquiry card header
```
[Name] — [Project description, truncated to ~60 chars]
```

### Enquiry open / full view
```
[Name]
[Email]
Working on: [Their project description]
What they need: [Their ask]
ABLE page: ablemusic.co/[handle]  [View →]

[Reply via email]    [Mark as read]    [Archive]
```

### "Reply via email" action
Opens email client with pre-filled:
- To: the enquirer's email
- Subject: "Re: Your enquiry via ABLE"

ABLE steps back from this moment. The conversation is between Maya and the enquirer.

### Empty enquiries state
```
No enquiries yet.
```

Sub-copy:
```
When artists get in touch via your profile, they'll appear here.
```

---

## FREELANCER ADMIN — AVAILABILITY NUDGE

### Auto-expiry transition notification (30 days since last update)
```
It's been a while — still taking on work?
```

Options:
```
[Taking on work now]    [Selective right now]    [Not booking]
```

Notes: This should appear as a gentle card in admin, not an email alert. It is framed as a check-in, not an alarm. "Still taking on work?" sounds like a colleague asking, not a system enforcing.

---

## FOOTER / ATTRIBUTION

Same as artist profile:
```
Made with ABLE
```

Small. Bottom of page. One line. Not a banner. Not a link to a marketing page. ABLE disappears.

---

## META / OG COPY

### Page title (browser tab / OG)
```
[Name] — [Role] | ABLE
```

Example: "Maya Beats — Producer | ABLE"

### OG description
```
[Name] is a [role] based in [location].
```

Example: "Maya Beats is a Producer based in Manchester."

No superlatives. No "leading" or "acclaimed." The credits speak. The meta description does not.

### OG image
The freelancer's avatar (if set) or an ABLE-generated card showing name, role, and location against the freelancer's accent colour.

---

## WIZARD (FREELANCER-START.HTML)

### Step 1 header
```
What do you do?
```

Sub-copy:
```
Select everything that applies.
```

### Step 2 header
```
Add your credits
```

Sub-copy:
```
Search for releases you've worked on. We'll ask the artist to confirm.
```

Search placeholder:
```
Artist name or release title
```

No results found:
```
No matches on ABLE yet. You can add unverified credits — they'll show on your profile until the artist confirms.
```

### Step 3 header
```
Add a work sample
```

Sub-copy:
```
Paste a SoundCloud or YouTube link. Pick your best one.
```

URL field placeholder:
```
soundcloud.com/... or youtube.com/...
```

Label field:
```
One line of context (optional)
```

Label placeholder:
```
e.g. "Production and arrangement for Nadia's debut single"
```

### Step 4 header
```
Are you taking on work?
```

Options:
```
Taking on work now
Selective right now
Not booking at the moment
```

Sub-copy below options:
```
Your availability will show on your profile. You can update it anytime. It auto-updates after 30 days to keep things honest.
```

Notes: the "auto-updates after 30 days" line is mentioned here so the freelancer understands and expects the auto-expiry — it should not feel like a system doing something to them later without warning.

### Booking preference (Step 4, below availability)
```
How do you want people to reach you?
```

```
○  Use ABLE's enquiry form (recommended)
○  Link to my own booking page
```

If "own booking page" selected: field for URL. Placeholder: "calendly.com/mayabeats or any URL"

### Done screen header
```
Your profile is live.
```

Not "You're all set!" Not "Congratulations!" — those are hollow SaaS phrases. "Your profile is live." is the fact, stated plainly.

URL display:
```
ablemusic.co/[handle]
```

Share options label:
```
Share it
```

Email signature block:
```
Add to your email signature:
[Name] · [Role(s)] · ablemusic.co/[handle]
[Copy]
```

After copy:
```
Copied.
```

Call to see profile:
```
Open my profile →
```
