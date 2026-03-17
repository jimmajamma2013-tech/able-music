# ABLE UX Specification — Canonical Reference
**Date: 2026-03-16**
**Status: ACTIVE — read before making any UX decision**
**Authority: V6_BUILD_AUTHORITY.md (all resolved decisions), COPY_AND_DESIGN_PHILOSOPHY.md (voice and register)**

This is what every developer reads before building UX. It is not aspirational. Every requirement here is either implemented, in the build queue, or a known V1 scope decision. Where implementation status matters, it is noted.

---

## Part 1: User Mental Models

Before touching the product, each user type carries a set of expectations. Building against these — rather than against an abstract user requirements document — produces UX that feels inevitable.

### Artist mental model

"This is my page. I put a link to it everywhere. Fans land here. They find out what I'm working on, hear my music, see where I'm playing. If they want to stay in touch, they leave their email. Simple."

What follows from this model:
- The artist thinks of the page as their thing, not ABLE's thing. ABLE should be invisible.
- They expect the page to reflect whatever they are currently doing — not be static.
- They expect to control it in minutes, not hours. Any complexity that adds time without visible payoff will be abandoned.
- They expect to own the output — the fan list, the data, the ability to leave.

### Fan mental model

"I tapped this link because I liked something this artist did. I want to hear more music, maybe find out when they're playing, and if it's worth it, leave my email so they can reach me directly."

What follows from this model:
- The fan has already done the hard work of caring. ABLE must not waste that.
- They are on their phone, probably standing up, probably between other things. Clarity beats completeness.
- They have a low threshold for "this feels like a marketing page" and will bounce if triggered.
- Giving an email is a meaningful act for them. It should feel like giving a number to someone who deserves it, not filling in a form.

### Freelancer mental model

"This is my professional profile. It shows my work, my credits, and how to hire me. I found it because someone I worked with credited me on ABLE."

What follows from this model:
- Discovery is entirely credit-based — the freelancer does not market themselves through ABLE.
- The profile needs to communicate credibility and availability at a glance.
- The booking inquiry is the primary action — it should be obvious and low-friction.
- Note: `freelancer.html` is Phase 2. These principles inform when it is built.

---

## Part 2: Journey Maps

### Artist first session — step by step

**1. Lands on able.fm (or able-v7.html demo link in artist bio)**

The entry point is either the landing page (from word-of-mouth, Instagram ad, another artist's "Made with ABLE" footer) or directly viewing another artist's ABLE page and then navigating to create their own. Both paths arrive at `start.html`.

**2. start.html — Step 1: Identity**

The artist sees a split screen: left is a form, right is a live phone preview.
- They enter their artist name. The hero of the preview phone updates on every keystroke.
- Eyebrow copy: "Who are you?" — direct, not corporate.
- They select their genre/vibe. The preview phone changes its display font, accent colour defaults, and motion personality.
- They write (or paste) their bio. 2–3 sentences is enough. The preview shows how it truncates.
- At no point is there a progress metaphor that makes this feel like bureaucracy.

**3. start.html — Step 2: Look**

- They see 8 accent colour presets + custom hex. They select one. The entire preview phone repaints in <100ms — this is the delight moment.
- They select a theme (Dark/Light/Glass/Contrast). Preview updates.
- A "where this appears" section shows: the primary CTA button filled in their colour, a Quick Action pill outlined in their colour, the fan sign-up button.
- The artist understands what "accent colour" means without reading a tooltip.

**4. start.html — Step 3: Links**

- They add their Spotify URL (or paste any streaming link). The preview shows the platform pill appear.
- They add their primary CTA: the type (Stream / Pre-save / Get tickets / Buy merch) and the URL.
- If they enter a Spotify artist URL, the Spotify import function should auto-populate: artist name, latest release, genre. This is AS-01 and currently requires completing.
- Optional fields for secondary CTA and additional platform links.

**5. Done screen**

- Profile is written to `able_v3_profile` in localStorage.
- Done screen shows: a rendered preview of their profile, a copy-link button, and the instruction "Paste this link in your Instagram bio."
- Copy of the URL to clipboard with 2s "Copied" confirmation.
- A second CTA: "Open admin to manage your page" — this is their path to ongoing management.
- The emotional tone here: "your page is live." Not "setup complete." The payoff is that the page exists and is real.

**6. First view of live profile (able-v7.html)**

- The page renders immediately from localStorage — no network request required.
- The artist sees their name in their display font at hero scale. If the page state is `profile` mode, they see their latest release and primary streaming CTA.
- They scroll through: Quick Action pills, fan sign-up section, Listen section.
- The feeling should be: "this actually looks like something I'd put in my bio."

**7. First visit to admin (admin.html)**

- They navigate from the Done screen or by appending `/admin` to their URL.
- The admin greets: "Good to see you, [Name]."
- Campaign HQ is the first section. It shows current state ("Profile mode"), gives access to release date, gig mode toggle, and a first-run checklist.
- First-run checklist: "Share your page" (copy link), "Add a release," "Activate gig mode." These are the three things that make the product work.
- No overwhelming dashboard. The default view is a single column of Campaign HQ + fan list + basic stats.

**8. First fan sign-up notification**

- In V1: the artist checks their admin fan list and sees a row they don't recognise — an email address, a source (`instagram`, `direct`), a timestamp.
- This is the proof moment. One fan they don't know personally.
- The admin should surface this specifically: a nudge the first time a fan signs up from a new source. "Someone found you from Instagram. First fan from there."
- In V2: push notification or email to the artist.

---

### Fan journey — step by step

**1. Tap link in artist's Instagram bio**

The fan is on their phone. They just saw a reel, or they were already following this artist and are visiting for the first time. They tap the bio link from the Instagram app. They land on `able-v7.html` in an in-app browser or Safari.

Context they carry: they know the artist, they are already interested, they have a short attention span.

**2. Above the fold: the first 5 seconds**

The fan sees:
- The artist's name in the hero, in the correct display font for the vibe. Uppercase for Electronic/Hip-hop/Rock, styled serif italic for R&B, clean weight for Indie.
- The campaign state badge. If it is gig mode: a pulsing deep red "On tonight" chip. If pre-release: a yellow countdown chip. If live: a red "Out now" chip. If profile mode: a cyan chip with the artist's genre/location.
- The hero artwork (if set) — the full-width top card, artwork extraction feeding warmth into the background gradient behind the name.
- The primary CTA: accent-filled, full width, specific. "Listen on Spotify" or "Get tickets" or "Pre-save on Apple Music" — never a generic label.

The fan does not yet see the sign-up form. They see: who this artist is, what state they are in right now, and the one most important action.

**3. Scrolling — fold by fold**

- Below the hero CTAs: Quick Action pills (up to 4 visible). Horizontal scrollable row.
- Below the pills: Fan sign-up section (screenful 3). Artist name, heading contextualised to state ("Stay close." in profile mode, "[Title] drops [date]. Hear it early." in pre-release), email input, CTA button.
- Below fan sign-up: Listen section. Release cards with embedded Spotify/SoundCloud player. The content is playable inline — not a link to another tab.
- Below Listen: Shows section (if shows exist and are upcoming).
- Below Shows: Snap cards (artist updates, scrollable horizontal strip).
- Below Snap cards: Merch section (if configured), Support section (if configured).
- Page bottom: secondary fan sign-up catch, footer ("Made with ABLE" on free tier), "Your list. Export any time."

**4. The sign-up moment**

The fan has now:
- Heard the name, seen the state, understood who this artist is.
- Possibly tapped the primary CTA (gone to Spotify, come back, or listened inline).
- Read the artist bio.
- Hit the sign-up section.

The trigger that makes them sign up is one of:
- There is a real release date. "Hear it early" is a specific, honest value.
- There is a show tonight and they are not going — they want to know next time.
- They are already a fan and signing up is the obvious way to stay close.
- The copy sounds like the artist, not like a marketing form.

The form: email input only. `type="email"`, `autocomplete="email"`, `inputmode="email"`. CTA button at 44px minimum height. Button text is first-person ("I'm in" / "Send it to me" / "Let me know" / "Tell me more") — varies by campaign state.

The consent: a pre-checked checkbox visible below the input (GDPR compliant, explicit consent). Copy: "I agree to receive occasional emails from [Artist Name]. Just them. No third parties." — artist voice, not legal language.

**5. After the sign-up**

Immediate: spinner (optimistic, fires before any server response) → checkmark → confetti burst (40 particles, accent + white) → echo message below the form: "We've got you — [email] is on [Artist Name]'s list."

Within 30 seconds (V1 full build): a confirmation email arrives. Subject: "You're on [Artist Name]'s list." From: "[Artist Name] via ABLE." Body is artist-voice, includes their artwork, includes what to expect, includes a one-click unsubscribe. This email is the bridge between the sign-up moment and the next time the artist reaches out.

V1 limitation: if the Supabase/Netlify email function is not wired, the fan receives no email. This is a soft launch blocker — the confirmation email must be live before public launch.

**After leaving the page:**
- The fan goes back to Instagram, back to their day.
- They will return when the artist sends them something worth returning to.
- V2 brings `fan.html` — a personal dashboard where they can see all artists they follow, upcoming shows in their city, and new releases. V1 does not have this.

---

## Part 3: Interaction Principles

These are the 8 UX laws ABLE follows. They are not aspirational. Every build decision should be checked against them.

**1. One primary action per screen.**
Every page, every section, every modal has one obvious action. If two actions compete visually at the same weight, remove the weaker one or move it below the fold. The fan sign-up section has one field and one button. The hero has one primary CTA and one ghost secondary — the hierarchy is unambiguous.

**2. Max 3 taps to any critical action.**
From any state on any page: fan can sign up in 1 tap (field pre-focused on scroll) → email entry → submit = 2 actions. Artist can activate gig mode from admin home in 2 taps. Artist can access fan list in 1 tap. If any critical action requires 4+ taps, redesign the flow.

**3. Every destructive action has confirmation.**
Deleting a snap card, deactivating gig mode, clearing fan data, exporting and deleting the fan list — all require a two-step confirmation. The confirmation copy is specific: "Delete this snap card? Your fans won't see it." Not "Are you sure?"

**4. Every async action has visible feedback (loading state → success/error).**
Loading state: spinner or skeleton appears before any network call completes. Success state: checkmark + specific confirmation copy. Error state: inline message, not a modal alert. Never let an async action complete silently — success and failure must both be communicated.

**5. Empty states teach, they don't abandon.**
When there is no content in a section (no releases, no shows, no snap cards), the section is either hidden entirely (fan view) or replaced with a teaching empty state (admin view). Teaching empty states show what the section will look like when populated, and offer a direct path to add the first item. "No shows added yet. Add one and it'll appear here." — specific, not "No data."

**6. The fold is precious. Only the most important thing goes above it.**
On able-v7.html: the hero occupies the first screen. The artist's name, the campaign state, and the primary CTA are the only things above the fold. Nothing else. The sign-up form is at screenful 3. The fan must first understand who the artist is before being asked for anything.

**7. Copy is UX. Every label is a design decision.**
The difference between "Subscribe" and "I'm in" is a conversion difference. The difference between "Analytics" and "How it's going" is a trust difference. Every piece of text on the platform — placeholder, label, toast, button, empty state — must be checked against COPY_AND_DESIGN_PHILOSOPHY.md before shipping. Placeholder text is not decoration. It sets tone.

**8. Mobile-first means mobile-only in design, then progressive enhancement.**
Design at 375px. Every layout decision, every tap target, every font size, every interactive affordance is designed for iPhone first. Desktop is then enhanced with more information density and more efficient layouts. Not the reverse. An admin dashboard that works perfectly at 1280px but breaks at 375px is wrong — artists check their stats on their phones.

---

## Part 4: Page-by-Page UX Requirements

### able-v7.html (artist public profile — fan-facing)

**Primary user goal:** Fan wants to hear the music, find out what's happening, and optionally stay close via email.

**Critical above-the-fold requirement:** Artist name (in correct display font for vibe), campaign state badge, hero artwork (or gradient fallback), primary CTA (accent-filled, specific label). Nothing else above the fold on first load. Fan must understand "who is this" before they see any ask.

**Max tap count to primary action:** 1 tap (primary CTA is visible and tappable without scrolling). Fan sign-up is max 3 taps (scroll to screenful 3 → tap email field → type email → tap submit).

**Empty state spec (fan view):**
- No releases: Music section hidden entirely. Page renders: hero, bio, quick action pills, fan sign-up, snap cards (if any), support (if configured).
- No shows: Shows section hidden. No "no shows" placeholder.
- No snap cards: Snap card strip hidden.
- No merch: Merch section hidden.
- Artist with zero content (name + bio only): page renders hero + bio + fan sign-up only. This must look intentional, not broken.

**Loading state spec:**
- Warm visit (localStorage exists): render immediately. No visible loading. LCP from localStorage is <100ms.
- Cold visit (no localStorage, no handle): skeleton screens for hero, CTA zone, fan capture. Skeleton shimmer (unison, no stagger). Skeleton resolves when either localStorage or Supabase data arrives.
- Image loading: accent gradient placeholder at full dimensions, real image fades in over 200ms (blur-up). No blank rectangles.
- Iframe embeds: `loading="lazy"`, render placeholder with artist colour gradient until intersection observer triggers load.

**Error state spec:**
- Fan sign-up bad email: red border + shake animation on submit. Error suppresses on retype. Error message: "Check that email — something looks off." Not "Invalid email format."
- Fan sign-up network failure: optimistic UI fires anyway (confetti, echo). Error is silent to fan. Attempt queued for retry when online. Log failure to console.
- Profile not found (no localStorage, no handle in URL): show a minimal ABLE-branded 404 state with a link to able.fm. Not a blank screen.

---

### admin.html (artist dashboard)

**Primary user goal:** Artist wants to understand what's happening with their page and make changes when something needs updating.

**Critical above-the-fold requirement:** Greeting with artist name, current campaign state (profile/pre-release/live/gig), fan count (number of people on their list), and the first-run checklist (if not dismissed). The artist should be able to answer "is anything wrong?" in 3 seconds on page load.

**Max tap count to primary action:**
- Check fan count: visible on home screen.
- Toggle gig mode: Campaign HQ → gig toggle = 2 taps.
- Set release date: Campaign HQ → date field = 2 taps.
- View fan list: sidebar "Fans" = 1 tap.
- Add a snap card: sidebar "Snap Cards" → "Add" button = 2 taps.

**Empty state spec (admin view):**
- Fan list empty: "No fans yet. When someone signs up, they'll appear here." Below: a prompt with the artist's page URL to share. Specific, not generic.
- Snap cards empty: "Nothing posted yet." with "Post your first update" CTA.
- Shows empty: "No shows listed. Add one and it'll appear on your profile." with "Add a show" CTA.
- Broadcasts empty (free tier): blurred preview of the broadcast compose screen, overlay: "Send an email to your list. [N] people are waiting to hear from you. Artist plan — £9/mo." — specific count, specific price, specific action. Never "Upgrade to unlock."
- Stats all zero (new artist): stat cards show "0" with a specific nudge: "Share your page to start seeing numbers." Not empty skeleton after data has loaded.

**Loading state spec:**
- Stat cards: skeleton shimmer while localStorage/Supabase loads. Skeleton shape must approximate real content (number width, label width).
- Fan list: skeleton rows (3 placeholder rows) while list loads.
- No blocking load for any page section. Everything loads independently.

**Error state spec:**
- Save failure (Supabase): toast "Didn't save — try again?" with a retry button. Human copy, not HTTP status code.
- Gig mode toggle failure: "Gig mode didn't activate — check your connection." Toast persists until dismissed.
- Export failure: "Couldn't generate the file. Try refreshing." Not a silent download that never appears.

---

### start.html (onboarding wizard)

**Primary user goal:** Artist wants to get a page that looks genuinely good in their Instagram bio before they lose interest.

**Critical above-the-fold requirement:** On step 1: artist name field pre-focused, live preview phone visible and updating. The artist should see their name in a hero-scale display font within 10 seconds of landing on the page. This is the proof-of-concept that earns the next step.

**Max tap count to primary action:** First payoff (seeing their name on the preview phone) = 1 field entry, zero taps. Profile live = 3 steps × average 2 inputs per step = 6 inputs, 3 "Next" taps.

**Empty state spec:** Not applicable — onboarding begins empty and fills up.

**Loading state spec:**
- Spotify import: when artist enters a Spotify URL, show an inline spinner next to the field for up to 5 seconds, then either populate the fields or silently continue to manual entry. Never block the wizard on a failed import.
- Preview phone: renders from form state, no network dependency. Always current.

**Error state spec:**
- Required field left empty on "Next": inline error on the specific field. "Add your artist name to continue." Not a modal. Not a generic "Please fill in all required fields."
- Spotify import failure: silent continuation. The wizard does not communicate the failure — it simply stays in manual entry mode. If the artist notices nothing populated, the field has a hint: "Didn't find anything — enter manually below."

---

### landing.html (marketing page)

**Primary user goal:** Artist who doesn't yet have an ABLE page wants to understand what it is, see it in action, and create one.

**Critical above-the-fold requirement:** Hero headline ("When they click, be ready."), sub-copy (what it does in one sentence), primary CTA ("Get your page — it's free"), secondary CTA ("See a live example"). Zero navigation links above the fold. The artist must be able to answer "what is this?" in 5 seconds.

**Max tap count to primary action:** Sign up = 1 tap (primary CTA in hero). See live example = 1 tap (secondary CTA in hero).

**Empty state spec:** Not applicable — landing page is static content.

**Loading state spec:** Page must render above the fold from HTML + inline critical CSS alone. No render-blocking resources. OG image must be deterministic (static generation at Netlify function layer for correct social preview cards).

**Error state spec:** Contact form (if present) follows same pattern as admin saves. The landing page has no forms in the primary hero flow.

---

## Part 5: Fan Sign-Up UX Spec

This section is the single most important UX specification in the product. Fan sign-up is the primary conversion event. Every decision flows from making it frictionless and honest.

### Trigger moment

The fan encounters the sign-up section after:
1. They have seen the artist's name and state (above the fold).
2. They have seen the hero CTAs (Spotify embed, ticket link, pre-save).
3. They have seen the Quick Action pills.

This is screenful 3. At this point the fan has had approximately 30–60 seconds of context. They know who the artist is and whether they are interested. The sign-up is the formalisation of interest that already exists — not a pitch to create interest.

A second sign-up section appears at the bottom of the page above the footer. This serves fans who scrolled through everything before deciding. The copy at the bottom uses a shorter, simpler version: "Want to stay close? Leave your email." — no state-specific elaboration needed.

### Sign-up form requirements

**Fields:** Email only. No name field on first ask (name can be collected progressively in V2 fan dashboard). No phone number. No country. Exactly one field.

**Input attributes (non-negotiable for mobile conversion):**
```html
<input type="email" inputmode="email" autocomplete="email" autocapitalize="off"
       aria-label="Your email address" placeholder="Your email">
```

**Button minimum height:** 44px. Full width of the form container.

**GDPR consent:** A checkbox below the email input. Must be unchecked by default. Label: "I agree to receive occasional emails from [Artist Name]. Just them. No third parties." — first-person artist voice, not legal boilerplate.

**Stored on submit:**
```javascript
{
  email: string,
  ts: ISO string,
  source: 'instagram' | 'tiktok' | 'youtube' | 'direct' | 'qr' | 'email' | 'other',
  consent: true,
  consentMethod: 'explicit_checkbox',
  double_opted_in: false  // updated to true when fan confirms email
}
```

### State-specific copy (copy these exact strings — do not improvise)

**Profile state (no active release):**
- Heading: "Stay close."
- Subtext: "I'll only reach out when something's actually happening."
- Button: "I'm in"

**Pre-release state (release date set, release in future):**
- Heading: "[Release title] drops [date]. Hear it early."
- Subtext: "Leave your email. I'll send it to you before it's anywhere else."
- Button: "Send it to me"

**Live state (within 14 days of release):**
- Heading: "[Release title] is out now."
- Subtext: "If you want the story behind it — what I was thinking, what went wrong, what surprised me — leave your email."
- Button: "Tell me more"

**Gig state (tonight toggle active):**
- Heading: "I'm playing tonight."
- Subtext: "Leave your email and I'll let you know next time I'm coming to you."
- Button: "Let me know"

### Confirmation message (exact copy)

After submit, the echo message below the form reads:
> "We've got you — [email] is on [Artist Name]'s list."

This appears after the checkmark animation. It persists on the page (does not disappear). The email field is replaced by this message — the form does not reset and invite a second submission.

### Email confirmation (V1 full build)

Sent within 30 seconds of sign-up via Netlify function → Resend → artist's ABLE sending domain.

- Subject: "You're on [Artist Name]'s list."
- From display name: "[Artist Name] via ABLE"
- From address: no-reply@mail.ablemusic.co (V1) / [artist-slug]@mail.ablemusic.co (V2)
- Body: artist artwork image at top. One paragraph in artist voice. "I'll be in touch when something's worth sharing." One-click unsubscribe link at the bottom.
- This email is not a double opt-in confirmation — it is a welcome email. Single opt-in is the correct default for ABLE (see research: 2026-03-15-fan-signup-conversion.md). The `double_opted_in` field tracks confirmation if the artist later configures it.

### GDPR compliance checklist

- [ ] Consent checkbox unchecked by default
- [ ] Checkbox label attributes the consent to the specific artist, not ABLE
- [ ] `consent: true` written to fan record only after checkbox is checked and form submitted
- [ ] `consentMethod: 'explicit_checkbox'` written to fan record
- [ ] IP address stored as SHA-256 hash only (never raw IP)
- [ ] Timestamp stored in UTC ISO format
- [ ] One-click unsubscribe in all artist emails
- [ ] Fan can request deletion via email — handled by platform admin PA-03
- [ ] Unconfirmed fans shown with `○` marker in fan list, excluded from broadcasts

---

## Part 6: Campaign State Communication Spec

For each of the four states — what the fan sees, the exact copy, the CTA action, and the tone.

### Profile state (default)

**When:** No release date set, or more than 14 days post-release.
**Fan sees:** Artist name, genre/location chip (cyan `--color-state-prof`), hero artwork or gradient, bio, primary streaming CTA.
**Primary CTA copy:** "Listen on Spotify" / "Stream [Release title]" — streams the most recent release.
**Secondary CTA copy:** "Follow on Instagram" or next most relevant platform link.
**Fan sign-up heading:** "Stay close."
**Tone:** This is who I am and what I've made. Come in.

### Pre-release state

**When:** Release date set, release date is in the future.
**Fan sees:** Artist name, amber/yellow countdown chip (`--color-state-pre`), release artwork, countdown display:
- More than 14 days away: "Dropping [Month Day]" — date only, no granular countdown
- 14 days or fewer: "[N] days to go"
- 24 hours or fewer: "[H]h [M]m to go" — hours and minutes
**Primary CTA copy:** "Pre-save on [Platform]" or "Save for later" if no pre-save link.
**Secondary CTA:** Platform streaming link for previous release (keep fans listening now).
**Fan sign-up heading:** "[Release title] drops [date]. Hear it early."
**Tone:** Something is coming. The anticipation is real. This is the moment to get close.

### Live state

**When:** Release date reached, within 14 days of release.
**Fan sees:** Artist name, red "Out now" chip (`--color-state-live`), release artwork prominently in hero top card.
**Primary CTA copy:** "Stream [Release title]" — sends to preferred streaming platform.
**Secondary CTA:** "Add to library" or secondary platform.
**Fan sign-up heading:** "[Release title] is out now."
**Tone:** This is happening. Peak momentum. The music exists in the world right now.

### Gig state (24hr manual toggle)

**When:** Artist has manually toggled gig mode, within 24-hour window.
**Fan sees:** Artist name, pulsing deep red "On tonight" chip (`--color-state-gig` = `#8b1e1e`). The pulsing dot is a `scale(1)→scale(1.4)` 2s infinite animation — communicates urgency without shouting.
**Top card:** Tonight note (artist-written free text, 2–3 sentences). This is the most important piece of content in gig mode.
**Primary CTA:** "Get tickets" — links directly to ticket URL. One tap, no intermediary page.
**Below CTA:** Venue, doors time, city. These are load-bearing for the fan who already has a ticket.
**Fan sign-up heading:** "I'm playing tonight."
**Tone:** The urgency is real. The room is small. Tonight matters. Come if you can — and if you can't, stay for next time.

---

## Part 7: Error State Copy Reference

All error states in ABLE must use this register: human, specific, not apologetic, gives next action.

| Context | Wrong copy | Right copy |
|---|---|---|
| Email field — invalid format | "Invalid email address" | "Check that email — something looks off." |
| Fan sign-up network error | "Error: failed to save" | (Silent — optimistic UI fires regardless) |
| Admin save failure | "Error 422" | "Didn't save — try again?" |
| Gig mode toggle failure | "Error activating gig mode" | "Gig mode didn't activate — check your connection." |
| Export failure | "Download failed" | "Couldn't generate the file. Try refreshing." |
| Spotify import failure | "Import failed" | (Silent — continue to manual entry) |
| Profile not found | "404 Not Found" | "This page doesn't exist — but yours could." (with link to sign up) |
| Empty Discover on fan.html | "No artists to show" | "Your following list is empty. Find artists from their pages, or look through Discover." |

---

*Last updated: 2026-03-16*
*Cross-reference: `docs/systems/ux/ANALYSIS.md`, `docs/systems/ux/PATH-TO-10.md`, `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`, `docs/USER-STORIES.md`*
