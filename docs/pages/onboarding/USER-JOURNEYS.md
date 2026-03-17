# Onboarding — User Journey Maps
**Stage 4 of the ABLE Build Process**
**Created: 2026-03-15**

> Onboarding has one primary user type and two variants. Unlike the landing page (3 journeys), this is about one person at different entry points.

---

## THE ONE USER

Every person who hits start.html is an artist who has decided to try ABLE. The landing page already filtered them. They're here because something resonated.

**What they've just done:** Clicked `Your page is free →` or `Paste your Linktree →` from the landing page.

**What they expect:** Something fast. A page that looks good at the end. No tricks.

**What they fear:**
- Wasting 20 minutes on something that looks generic
- Being asked for a card before they've seen anything
- Not knowing what to do next
- Their page looking bad when it's done

---

## JOURNEY 1 — THE SPOTIFY ARTIST

### The person

**Declan, 26, Manchester.** Has a Spotify for Artists page. 2,400 monthly listeners. Knows his Spotify artist URL. Clicked `Your page is free →` from the landing page hero. Arrived with mild curiosity, slight scepticism.

---

### Step 0 — The hook screen

*Moment:* Lands on start.html. Sees: `Your page. Set up in 5 minutes.` and a large input field: `Paste your Spotify or Linktree link here...`

*Emotion:* "OK. So I paste my Spotify link. Let's see if this actually works."

*Action:* Opens Spotify for Artists on another tab. Copies his artist URL. Pastes it.

*What happens:* Input detects `open.spotify.com/artist/` → calls Spotify API → returns his name, avatar, top genres.

*Feedback shown:* `We found Declan Forde on Spotify ✓` — in green, instant.

*Emotion shift:* **"Oh. It actually found me."** This is the single highest-value moment in onboarding. The scepticism drops. He leans in.

*Decision point 1:* Does the import work, or does it fail silently?
→ Works: he's hooked. Continue.
→ Fails/no feedback: he assumes ABLE is broken and leaves. This is a hard drop-off with no recovery.

**ABLE must:** Show visible, instant confirmation. Never fail silently. If Spotify API fails, show graceful fallback: `"Couldn't reach Spotify right now — enter your name below instead →"` — keep him moving.

---

### Step 1 — Name

*Moment:* Advances to Screen 1. Sees: `What do you go by?` — input is pre-filled with `Declan Forde` from the Spotify import.

*Emotion:* "It already knows my name. I barely had to do anything."

*Action:* Glances at it, confirms it's right. Presses Enter or taps Continue.

*Time on screen:* 3–5 seconds. Pre-filled = instant advance.

*Decision point 2:* Is the pre-filled name correct?
→ Yes: instant advance, momentum maintained
→ No (Spotify has a different stage name): edits it — friction here is acceptable, it's a one-time correction

**ABLE must:** Pre-fill from import. If pre-filled, auto-focus Continue button so Enter key advances instantly.

---

### Step 2 — Vibe

*Moment:* Screen 2. `What kind of music do you make?` Seven vibe cards. His Spotify genres were `indie rock`, `post-punk` — ABLE pre-selects `Indie / Alternative`.

*Emotion:* "That's right. How did it know?" He glances at the cards. Sees `Wet Leg, The Smile, Yard Act` under Indie/Alternative. Recognises his peers. Feels seen.

*Action:* The pre-selection is correct. He taps Continue without changing anything.

*If no pre-selection:* He looks at the cards, picks his closest genre, advances. Still fast — visual cards are quicker than a dropdown.

**ABLE must:** Map Spotify genres to vibe cards (defined in SPEC.md). Show real artist names under each card — this is the "they understand my world" moment.

---

### Step 3 — Accent colour

*Moment:* Screen 3. `Pick a colour that feels like you.` Swatches shown, pre-selected based on his vibe (Indie → green `#78c47b`).

*Live preview:* The phone preview on the right shows his name, his vibe — and the CTA button is now green. He can see it.

*Emotion:* "OK I can actually see what this is going to look like. The button is green. That's… actually kind of me."

*Action:* Considers for 5–10 seconds. Maybe taps a different swatch to see it change. Settles on green or a slight variant. Advances.

*Decision point 3:* Does the live preview update instantly?
→ Yes: this is the magic moment. Every tap changes his page in real time.
→ No (laggy or broken): the trust built in Step 0 starts to erode.

**ABLE must:** Preview updates on every tap, debounced 0ms — instant. This is non-negotiable.

---

### Step 4 — Theme

*Moment:* Screen 4. `How should your page feel?` Four theme cards with visual previews.

*Emotion:* "Dark is obvious for me. But I want to see what Glass looks like."

*Action:* Taps Glass. Preview shifts to glass theme. Sees his artwork bleeding through. Considers. Switches back to Dark. Advances.

*Time on screen:* 15–30 seconds. Longest stop so far — visual decision.

**ABLE must:** Each theme card shows a real visual preview, not a colour swatch. Glass preview shows sample artwork bleeding through.

---

### Step 5 — Links (skipped — import handled this)

*Moment:* Because Declan did a Spotify import, his Spotify link is already in his profile. Screen 5 shows a confirmation: `We found your Spotify link ✓` + option to add more.

*Emotion:* "Done. Don't need to add anything else right now."

*Action:* Advances without adding anything.

*If he wants to add more:* Input field lets him paste another URL. He adds his Instagram. Advances.

**ABLE must:** If Spotify import happened, show confirmation of what was found — not a blank link input.

---

### Step 6 — Fan capture CTA

*Moment:* Screen 6. `What do you want fans to do when they land on your page?` Four choices.

*Emotion:* "Stay close is subtle. Hear it first is more my vibe right now — I've got something coming."

*Action:* Taps `Hear it first →`. Preview updates — the fan sign-up button on his page now reads `Hear it first →`.

*Live preview:* This is visible. He can see the exact words his fans will see.

**ABLE must:** Preview shows the exact CTA text updating. Artists need to see what fans will read.

---

### Step 7 — Current moment

*Moment:* Screen 7. `What's happening right now?` Four choices.

*Emotion:* "I've got a single coming out in 3 weeks. That's pre-release."

*Action:* Taps `Something's coming →`. A date picker slides in below. He picks his release date.

*Preview:* Phone shows pre-release state — countdown timer starts, artwork dims, `Hear it first →` CTA is now prominent.

*Emotion shift:* **"That's my page. That's what my fans are going to see."** The product has delivered on its promise.

**ABLE must:** Date picker appears inline (no new screen). Countdown shows in preview immediately on date selection.

---

### Screen 8 — Done

*Moment:* `Your page is live.` Large, confident. `ablemusic.co/declan-forde` shown with a pencil icon (editable).

*Emotion:* "That was actually 4 minutes. And it looks like mine."

*Actions available:*
- `Go to my page →` — opens able-v7.html
- `Open my dashboard →` — opens admin.html
- Share icons (Instagram story, copy link)

*Decision point — the real test:* Does he share it immediately, or does he feel it needs more work?

→ Shares immediately: the product has delivered. He's a user.
→ Goes to dashboard to polish: also good — he's engaged.
→ Closes the tab: the page wasn't compelling enough. Likely the import didn't land or the preview wasn't working.

**ABLE must:** The Done screen must feel like a celebration, not a form completion. `Your page is live.` in large type, spring entrance. The slug must look like a real, shareable URL.

---

### Journey 1 summary

| Screen | Key moment | Drop risk | What ABLE must nail |
|---|---|---|---|
| 0 | Spotify import confirmation | HIGH — silent failure = immediate drop | Instant, visible confirmation |
| 1 | Pre-filled name | LOW | Auto-focus continue |
| 2 | Vibe pre-selected + real artists shown | LOW | Artist names on cards |
| 3 | Live preview updates on colour tap | MEDIUM | Zero-lag preview update |
| 4 | Glass theme preview | LOW | Real visual previews |
| 5 | Import confirmation (not blank form) | MEDIUM | Show what was found |
| 6 | Fan CTA visible in preview | LOW | Exact copy visible |
| 7 | Date picker inline, countdown appears | MEDIUM | Inline date, real countdown |
| 8 | "Your page is live" landing | HIGH — low energy = closed tab | Ceremony, large type |

**Completion rate target:** 80%+ from Screen 0 to Screen 8. Each silent failure or laggy preview costs 15–20%.

---

## JOURNEY 2 — THE LINKTREE SWITCHER

### The person

**Sofia, 24, London.** Has `linktr.ee/sofiaokeke` with 8 links. Clicked `Paste your Linktree — we'll import your links →` from the landing page comparison section. Arrived at `start.html?import=linktree`.

**Critical difference from Journey 1:** Sofia already knows what ABLE is. She's not exploring — she's switching. The question is whether the import works cleanly.

---

### Step 0 — The hook (pre-activated)

*Moment:* Because she came from `?import=linktree`, the input is pre-focused with placeholder: `Paste your Linktree URL...`

*Emotion:* "OK. Let me see if it actually imports my links."

*Action:* Pastes `linktr.ee/sofiaokeke`.

*What happens:* `linktree-import` Netlify function fetches the page, parses links, returns: Spotify, Apple Music, YouTube, Instagram, Bandcamp, SoundCloud.

*Feedback:* `We found 6 links on your Linktree ✓ — bringing them in now.`

*Emotion shift:* **"OK. That actually found everything."** Trust established.

*Decision point 1:* Does the import work?
→ Works: she's committed. The hard part (re-entering links) is gone.
→ Fails (Linktree page private/blocked): `"Couldn't read your Linktree — it might be set to private. Add your links manually →"` — keep her moving, don't dead-end.

---

### Steps 1–4 — Same as Journey 1 but faster

Sofia moves through Name → Vibe → Colour → Theme quickly. She knows her identity — she's not discovering anything, just confirming.

**Key difference:** She's less interested in the live preview because she already knows what an ABLE page looks like (she came from one). The import confirmation is what matters to her.

---

### Step 5 — Link confirmation (critical for Sofia)

*Moment:* Screen 5 shows all 6 imported links with badges:
```
✓ Spotify              [music]
✓ Apple Music          [music]
✓ YouTube              [video]
✓ Instagram            [social]
✓ Bandcamp             [music]
✓ SoundCloud           [music]
```

*Emotion:* "That's everything. I don't need to add anything."

*Action:* Confirms and advances. Optionally removes one she doesn't want.

*Decision point 2:* Are the platform badges correct?
→ Yes: instant advance
→ Wrong label: she edits. Acceptable friction — she controls the outcome.

**ABLE must:** Show checkboxes — she can deselect any link she doesn't want. Don't force all or nothing.

---

### Steps 6–7 — Fan capture + moment

Sofia picks her CTA and current moment. Same as Declan.

**One addition for Sofia:** On Screen 7, a small note:
`"Your Linktree link still works while you're getting set up."` — 12px, muted.

This removes the last fear: losing her bio link before she's ready to switch.

---

### Screen 8 — Done (with explicit switcher message)

For Sofia (detected as Linktree importer), the Done screen adds one line below the URL:
`Your 6 Linktree links are all here. ablemusic.co/sofiaokeke is ready.`

*Emotion:* "Everything transferred. I can update my bio link now."

---

### Journey 2 summary

Sofia's critical path has 2 moments that can make or break it:
1. The Linktree import working (Screen 0)
2. Seeing all her links correctly listed (Screen 5)

Everything else is the same as Journey 1. The import is the product promise. If it doesn't deliver, she's gone.

---

## JOURNEY 3 — STARTING FROM SCRATCH

### The person

**Amir, 22, Bristol.** Has no Spotify for Artists account yet. Uses SoundCloud and Bandcamp. Clicked `Start from scratch →` (text link below the import input on Screen 0).

---

### Step 0 — The hook (no import)

*Moment:* Taps `Start from scratch →`. The import input dismisses. A new prompt appears:
`What's your artist name?` — large input field.

*Emotion:* Slight friction vs. import users — he knows this will take longer. But he chose this.

*Action:* Types his name. Advances.

**ABLE must:** `Start from scratch` is a text link, not a button. It should feel like a lesser path (which it is — import is faster) without being hidden. The import is the recommended path; scratch is the fallback.

---

### Steps 1–7 — Full manual flow

Amir goes through all 8 screens with no pre-fills. Each screen is one question. Fast by design.

**Key difference:** Live preview starts with generic placeholder copy until he answers each question. Each answer makes it more his.

At Step 5 (Links): He pastes his SoundCloud URL. Detected as SoundCloud. Pastes Bandcamp URL. Both appear with correct badges. He doesn't have Spotify — that's fine.

**ABLE must:** `Works with SoundCloud, Bandcamp, YouTube — or nothing at all.` must be visible somewhere on Screen 0 or 1. Amir must know from the start that Spotify isn't required.

---

### Screen 8 — Done

Same as other journeys. His page is live. No Spotify — no problem. His SoundCloud and Bandcamp links are on his page, styled correctly.

---

## CROSS-JOURNEY INSIGHTS

### The single highest-leverage moment

**Screen 0 import confirmation.** `We found [Name] on Spotify ✓` / `We found 6 links on your Linktree ✓`

This moment does more conversion work than all other screens combined. It proves the product is real, fast, and smart before the artist has made a single choice. If this fails, the completion rate drops by 40–60%.

**The import must be the most technically reliable thing in the entire codebase. P0. Non-negotiable.**

### The live preview's role

The preview isn't just a nice-to-have. It's what turns abstract choices (colour, theme, CTA copy) into concrete decisions. Without it, the artist is filling in a form. With it, they're building something they can see.

**Every preview update must be instant.** Not 500ms debounced. Not after a network call. Instant CSS variable updates on every tap.

### What kills completion

In order of impact:
1. Silent import failure (Screen 0) — 40–60% drop
2. Laggy or broken preview — 20–30% drop
3. Too many choices at once (multiple questions per screen) — 15–25% drop
4. No "your old link still works" reassurance for switchers — 10–15% drop for Journey 2
5. Generic empty state on Done screen — 5–10% drop (tab closed before sharing)

### The 5-minute promise

The landing page says `From zero to live in under 5 minutes.` The onboarding must deliver this.

Measured time (8 screens):
- Screen 0 with Spotify import: 20–30 seconds
- Screen 1 (name pre-filled): 3–5 seconds
- Screen 2 (vibe pre-selected): 5–10 seconds
- Screen 3 (colour): 10–20 seconds
- Screen 4 (theme): 15–30 seconds
- Screen 5 (links confirmation): 10–20 seconds
- Screen 6 (CTA): 10–15 seconds
- Screen 7 (moment): 20–40 seconds
- Screen 8 (done): 0 seconds — landing

**Total: ~2–3 minutes with import. 3–4 minutes from scratch.**

The 5-minute promise is true. It must stay true. Do not add screens.
