# Placeholder-First UX
**Date:** 2026-03-15
**Status:** Approved for implementation

---

## The core UX shift

Most tools greet new users with a blank page and a blinking cursor. ABLE cannot do that. An artist's first impression of their own page needs to feel like walking into a finished room they just haven't moved into yet — not a construction site with scaffolding everywhere.

This is the "furnished room" principle. Every section ships pre-populated. The top card has a Reel slot. The music section has tracks. The merch section has products. The snap strip has updates. None of it is real. All of it is real-looking.

The editing experience is not "build from scratch." It is "swap your stuff in." Artists understand what they're making because they can already see it. This is not decoration — it is the primary teaching mechanism. No tooltip, no walkthrough, no onboarding email can do what a fully-dressed example does.

The shift is hard. It requires intentional placeholder content at every level: the wizard preview phone, the live profile in owner mode, and every empty state. Placeholder content must look like real content, sound like it was written by a person who knows music, and point directly to the right place in the dashboard to replace it.

---

## What this means for the demo phone (start.html wizard preview)

The preview phone on the right side of the wizard is the most important piece of UI in the onboarding flow. Every second an artist spends on that screen, they are deciding whether ABLE is worth their time.

It needs to look like a real artist page. Not a wireframe. Not a gradient with some labels. A page they could imagine posting in their bio link today.

### The hero / top card

The hero slot is where an Instagram Reel goes. Right now it shows a colour gradient. That is not good enough. The artist needs to see:

- A vertical video-style crop (portrait aspect — makes the Reel framing unmistakable)
- A centred play button with a frosted-glass circle treatment
- An "IG REEL" badge in the top-right corner — the Instagram gradient icon, small, unmistakable
- A label below the play button: "Your Reel or artwork goes here"

The artist should look at this and immediately understand: "Oh, I paste my Reel link and it shows up like that." No copy required. The visual makes the argument.

### Snap card strip

Show 2-3 snap cards in the phone body. Each card is a portrait-ratio tile with a gradient background and a one-line text overlay. Placeholder copy should be specific enough to feel real:

- "Your first update"
- "New track dropping soon"
- "Tour date"

These read as "this is what a snap card looks like." They are not grey boxes. They have actual visual character — the gradient, the scrim, the text treatment.

### Music section

Show a compact track list with placeholder tracks that look like real songs. Two rows:

- Thumbnail square (gradient, styled like album art)
- Track name: "Golden Hour"
- Sub-line: "2.4M streams"

Second row:
- Track name: "Sundown"
- Sub-line: "1.1M streams"

Real-sounding names. Real-looking numbers. The artist understands what they're making.

### Merch strip

Show two product cards. Not text labels. Actual product-feeling tiles:

- A hoodie card: 👕 emoji as product image (scales cleanly at phone size), "Classic Hoodie", "£45"
- A cap card: 🧢 emoji, "Fitted Cap", "£28"

Prices feel real. Names feel real. The artist sees their merch page already exists — it just needs their products.

### The whole phone

The artist should read the preview phone as: "This is exactly what my page looks like. I just need to drop my content in." Not "this is a demo of what it might look like one day."

Live updates as they type. Name field updates the artist name in the hero in real time. Accent colour ripples through every element. They are building something real, right now, in front of them.

---

## What this means for the live profile (able-v3.html)

The profile page has two audiences: the artist (owner) and their fans. These two should have a completely different experience when a section is empty.

**Fans** should see a clean page with only real content. No empty sections. No placeholder text. If the artist hasn't added music, the music section doesn't exist for fans. They see a tight, confident page.

**The owner** gets a different page. When a section has no real content, they see a placeholder state that:

1. Is clearly not live content — greyed out, 40% opacity, dashed border
2. Tells them exactly what goes there in plain language
3. Points them to the right place in the dashboard to fix it

### Placeholder copy — the standard

Every placeholder message has two parts: what goes there, and where to go to add it.

**Music placeholder:**
> Your music goes here. Paste a Spotify, YouTube or SoundCloud link.
> [Add music in your dashboard →]

**Events placeholder:**
> Got a gig coming up? Your show dates go here — tickets go front and centre.
> [Add a show →]

**Snap cards placeholder:**
> Post updates to your fans. A snippet, a link, a note — sits at the top of your page.
> [Add an update →]

These are not system messages. They read like a person who knows what the artist is trying to do. Direct. Specific. No "Nothing here yet."

### Owner detection

Use the same localStorage check already in place for the edit button: if `able_v3_profile` or `able_profile` is present in localStorage, the user is the owner. Placeholder sections are `opacity:0; pointer-events:none` by default and become `owner-visible` via a class addition in JS. Fans see nothing.

### Placeholder visual system

```css
.v3-ph {
  /* The outer container */
  border: 1.5px dashed rgba(138,180,206,.2);
  opacity: 0;  /* hidden by default */
  /* shown only when .owner-visible is added by JS */
}
.v3-ph.owner-visible { opacity: 1; pointer-events: auto; }
```

The dashed border is a strong signal: "this is a slot, not content." The opacity makes it feel like a ghost — present but not permanent. The CTA underneath it is the direct action. No friction.

---

## What this means for onboarding tone

The wizard is asking for data. It should not feel like that. A form asks for data. A stylist asks questions.

Every field label should read like a question a person is asking:

- Not: "ARTIST NAME" → Yes: "What do people call you?"
- Not: "BIO" → Yes: "Sum yourself up in one line."
- Not: "PRIMARY CTA" → Yes: "What's the most important thing a fan can do right now?"

The preview phone should animate and update live. Every keystroke in the name field should update the hero. Every colour pick should ripple through the phone in real time. Every CTA selection should show it in the preview button.

The artist should feel like they're styling their page in real time, not filling in a form that will eventually generate something.

The closing line when they reach the end: **"Your page is already beautiful. All we need now is your stuff."**

This is not marketing copy. It is factually true — because the placeholder-first system means their page is already dressed and waiting.

---

## The hard UX rules

These are not guidelines. They are constraints.

1. **No "Nothing here yet."** Every empty state either shows a smart owner-visible placeholder or hides the section entirely for fans.

2. **Placeholders are strictly owner-only.** No fan should ever see a placeholder. The JS check is the gate.

3. **Placeholder content uses real names and real-sounding details.** "Golden Hour" not "Track Name." "£45" not "$XX." "Classic Hoodie" not "Product Title."

4. **The IG Reel slot is the highest-priority placeholder.** It is the centrepiece of the top card. It must be unmistakable: play button, gradient crop, IG badge. If someone lands on the preview phone and doesn't immediately understand "I paste an IG Reel link here," the implementation has failed.

5. **Every placeholder has one CTA.** One. It goes directly to the right place in admin.html. Not the dashboard home. The exact section.

6. **The placeholder visual system must survive all four themes.** Dark, Light, Glass, Contrast. Test it. The dashed border and opacity approach works across all themes by design — it uses relative opacity, not hard-coded colours.

---

## Naming and copy rules for placeholders

The voice in placeholder copy is the same as the rest of ABLE: first-person music industry, direct, specific.

**Never:**
- "Upload your content here"
- "No events found"
- "This section is empty"
- "[Artist Name]"
- "Lorem ipsum"

**Always:**
- "Your Reel goes here — paste an IG link from your dashboard"
- "Got a gig coming up? Add the date and your tickets go straight to the top."
- "Your merch will show here when you add products"
- Specific, real-sounding placeholder text in demo content

The test: could a label executive landing on the placeholder page mistake it for a live page? If yes, the placeholder content is good enough. If no, make it more real.

---

## The philosophical line

ABLE's promise is: no algorithm, no middleman. The artist owns the relationship with their fans directly.

Placeholder-first UX reinforces this at the product level. The tools are laid out ready to use. The room is furnished. The artist's job is not to figure out what ABLE does — it's to move their stuff in.

The empty state is not a void. It is a prepared space.

This is a hard shift from the standard SaaS playbook of "get them signed up, then let them discover features." On ABLE, the artist's page is complete from day one. It just needs them.

**Implementation is not a polish pass. It is a fundamental UX change.** Every section of the product — wizard, profile, dashboard — needs placeholder content that is intelligent, contextual, and real-looking. Grey boxes are not acceptable. "Nothing here yet" is not acceptable. A blank void is not acceptable.

The artist should feel, on day one, that their page is already worth sharing.
