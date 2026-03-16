# ABLE — Explainer System: Final Review
**Date: 2026-03-16 | Status: ACTIVE**

> This document answers three questions: Does ABLE's explainer system match its voice? Where would an artist be genuinely confused with no help? And does the product pass the 5-minute independent setup test?

---

## Question 1: Does the explainer system match ABLE's voice?

**Yes, with one structural caveat.**

The copy philosophy (COPY_AND_DESIGN_PHILOSOPHY.md) is clear and consistently applied to all wizard and profile copy. The onboarding COPY.md is excellent — patient, direct, confident, no SaaS residue. The register is right: informed artist, not novice being hand-held.

The structural caveat: the explainer system described in this spec was *not previously documented as a system*. Individual screens had good copy; admin.html had almost none. The voice was consistent where explainers existed. The gap was in coverage — large portions of the product had no explainer copy at all, not bad copy.

**The specific strengths:**
- Wizard copy avoids the trap of over-explaining what the artist is doing. It trusts them. "Pick a colour that feels like you" is better than "Choose your brand's primary colour to ensure visual consistency across your artist page."
- Error states never blame the artist and always have a path forward. "Couldn't reach Spotify right now. Enter your name below and we'll carry on." is exactly right.
- The "what we don't import" transparency section (SPEC.md §7.9 of spotify-import) is a notable example of ABLE's voice applied to explainers: honest about limitations, matter-of-fact, no apology.

**One area that risks voice drift:**
The orientation cards (Type 2) walk close to the line of "telling artists what to do." The copy for each card has been written with this in mind — it describes what the feature is and how artists typically use it, without instructing the artist to use it. But in implementation, if cards are shown too early or appear too often, they will feel patronising regardless of the copy quality. The `able_dismissed_nudges` dismissal system must be respected without exceptions.

---

## Question 2: Where would an artist be genuinely confused with no guidance?

Enumerated, in order of likelihood:

### 1. Campaign states / page state system — HIGH RISK

An artist who completes the wizard and then visits admin.html will encounter "Campaign HQ" with four states: Profile, Pre-release, Live, Gig. Unless they selected a specific state in Screen 7 of the wizard, they have no context for what this system means or why their page looks the way it does.

**Current state:** One sentence tooltip is now specced. Not yet implemented.
**Risk:** Moderate — the wizard does introduce the four states on Screen 7, so artists who completed the wizard have some context. Artists who went directly to admin.html (e.g. via an invite link) have none.

### 2. Close Circle / Supporter setup — HIGH RISK

The Close Circle section in admin.html currently has no orientation. An artist who opens this section sees fields for a monthly amount and a supporter description with no explanation of what ABLE takes, how payment works, or whether this is safe to set up.

**Current state:** Orientation card now specced. Not yet implemented.
**Risk:** High — this involves money. Artists need to know ABLE takes nothing before they'll proceed. A blank screen here loses trust.

### 3. Fan capture vs. social following — MEDIUM RISK

Artists who are used to Instagram and TikTok may not understand the distinction between social followers (platform-owned) and fan sign-ups (artist-owned). The wizard introduces this distinction on Screen 6 ("you get their email — that's yours"), but it's subtle. An artist who breezes through Screen 6 and sees a fan sign up may not understand why this is different from a Twitter follower.

**Current state:** Context line specced for Screen 6 ("you get their email — that's yours to keep — no platform in the way"). Not yet implemented.
**Risk:** Low-medium — the wizard Screen 6 improvement addresses this. The concept is present; the copy just needs to make the distinction explicit.

### 4. Gig mode 24-hour reset — MEDIUM RISK

An artist who activates gig mode before a show and wakes up the next day to find their page back to normal may be confused about whether something went wrong. The 24-hour auto-reset is a feature, but only if the artist knows about it.

**Current state:** The gig mode tooltip says "Lasts 24 hours, then resets automatically." The wizard Screen 7 card copy also says "lasts 24 hours, then resets." This is adequately covered in spec.
**Risk:** Low — this is well-documented in copy spec. Risk is in whether it's actually implemented in the UI.

### 5. "What's a snap card?" — MEDIUM RISK

Artists familiar with social media will understand stories and posts. A "snap card" is neither — it's a persistent short-form update on their ABLE page. The name is not self-explanatory.

**Current state:** Snap card tooltip and orientation card both specced.
**Risk:** Low once specced copy is implemented.

### 6. The difference between links (platform pills) and CTAs — LOW-MEDIUM RISK

The wizard distinguishes between platform links (Spotify, Apple Music etc.) and the primary CTA (what fans should *do*). An artist might conflate these — "I added my Spotify link, isn't that the CTA?"

**Current state:** The wizard structure separates these across different screens (Screen 5 for links, Screen 6 for CTA) which helps. No explicit explainer for the distinction.
**Risk:** Low in the wizard flow where the separation is structural. Higher in admin.html where both are managed from the same area.

### 7. Why their page looks different after setting a release date — LOW RISK

An artist who sets a release date on Screen 7 and shares their page will see a countdown instead of their usual profile. If they didn't understand what pre-release mode meant, this will be surprising.

**Current state:** Screen 7 card copy ("Set a release date — your page goes into countdown mode") addresses this directly. The wizard preview shows the countdown state visually.
**Risk:** Low — the wizard covers this well if the artist pays attention to the preview.

---

## Question 3: The 5-minute test

**The scenario:** A 22-year-old indie artist — let's say she's been making bedroom pop for two years, has a modest following on Instagram and TikTok, has a Linktree (four links: Spotify, SoundCloud, Instagram, Bandcamp) but is frustrated that it doesn't reflect her aesthetic. She's not technical. She's heard about ABLE from another artist.

**The journey:**

**Step 1 — Landing on start.html (Screen 0)**

She sees "Your page. Set up in 5 minutes." and a single input. She pastes her Linktree link. The product pulls her four links. She sees "We found 4 links on your Linktree ✓" in green.

*No confusion here. This works.*

**Step 2 — Screen 1 (Name)**

Her artist name isn't on Linktree metadata — field is blank. She types her name. Easy.

*No confusion here.*

**Step 3 — Screen 2 (Vibe)**

She sees the vibe cards. She's indie/bedroom pop. "Indie / Alternative — Wet Leg · The Smile · Yard Act" maps. She taps it. Sub-heading says "Based on your Spotify genres — change it if it doesn't fit" — wait, this appears even though she used Linktree, not Spotify. She wasn't imported from Spotify.

**Potential issue:** The "Based on your Spotify genres" micro-copy appears only when Spotify genre matching produces a pre-selection. If she used Linktree and no genre was detected, the cards should have no pre-selection and no "Based on your Spotify genres" line. This is correctly defined in the COPY.md spec — the pre-selected state micro-copy is shown "only if Spotify genre mapping produced a pre-selection." Implementation must respect this conditional.

*If implemented correctly: no confusion. If micro-copy appears erroneously: mild confusion.*

**Step 4 — Screens 3 and 4 (Colour and Theme)**

Colour strip with swatches. She picks a dusty rose that matches her latest cover art. Theme: Dark. The live preview on the right updates instantly. She's into it.

*No confusion here. The visual feedback is the explainer.*

**Step 5 — Screen 5 (Links)**

Her four Linktree links are shown. She removes the SoundCloud (she hasn't posted there in a year). Three links remain.

*No confusion here.*

**Step 6 — Screen 6 (Fan CTA)**

She sees four options: "Stay close." / "Stay in the loop." / "Hear it first." / "Support me directly."

**This is the most important moment.** She doesn't immediately understand what this means. She's used to Instagram followers and email newsletter sign-ups, but "Stay close." as a product concept is new.

*Without the context line:* She might pick "Stay in the loop" because it sounds familiar (like a newsletter), without understanding that this is a fan sign-up that goes to her own list — not a platform's list.

*With the context line* ("When a fan taps this on your page, they sign up. You get their email. That's yours to keep — no platform in the way."):

She pauses, reads it, and gets it. "Oh, it's like an email list but they sign up from my page." She picks "Stay close." because she's not actively releasing right now and the low-pressure framing feels right.

**This context line is essential.** Without it, she understands the mechanics (which CTA appears on her page) but not the value (she owns this relationship). The difference matters — if she doesn't understand the value, she won't think to check her fan list when someone signs up, and she won't understand why ABLE is different from a simple link tree.

**Step 7 — Screen 7 (Current Moment)**

She sees four states. She's not releasing anything right now — she picks "Just me, being an artist."

*The context line above the cards ("your page reconfigures itself") helps if she's curious about the other modes. Without it, she just picks "Just me" and moves on — which is fine.*

**Step 8 — Screen 8 (Done)**

"Your page is live." Her URL: ablemusic.co/[her-name]

She taps "Go to my page →" and sees her page for the first time. Dark theme, dusty rose accent, her four links, "Stay close." at the bottom.

She takes a screenshot and puts the URL in her Instagram bio.

*No confusion here. This moment is well-designed.*

---

**Verdict: She gets there. With caveats.**

With the explainer system at current state (5.5/10), she completes the wizard and has a live page in about 4 minutes. She understands the surface mechanics.

What she probably doesn't yet understand:
- Why the fan sign-up is different from an Instagram follow (she will understand this when her first fan signs up and she sees a real email address in her dashboard)
- What the campaign state system is and when to use it (she'll understand this when she has a release coming)
- What her dashboard can do for her beyond checking fan numbers

None of these are blocking. She achieves the 5-minute goal. But she's leaving value on the table because she doesn't have the mental model for what ABLE's campaign state system unlocks.

**The context line on Screen 6 is the single highest-value explainer change in the entire product** — because it's the moment where the fundamental ABLE value proposition (you own your fan relationships) is either understood or missed.

---

## Final Score: 5.5/10 current — projected 9/10 after P1+P2

### Why not 10/10 yet?

10/10 requires:

1. The tooltip system built and deployed in admin.html (P1.2)
2. The orientation cards built and deployed in admin.html (P1.3)
3. The Screen 6 and Screen 7 context lines in the wizard (P1.1)
4. The import explainer collapsible panel (P2.3)
5. Actual user testing with one or two real artists to find the gaps that can't be found from reading specs

The specs are there. The copy is written. The build is what remains.

**The explainer system as documented is ready for build.** Every tooltip, every card, every context line has exact copy. The component specs are sufficient to implement without questions. The score of 10/10 is achievable.
