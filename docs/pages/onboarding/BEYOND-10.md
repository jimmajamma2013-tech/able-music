# Onboarding — Beyond 10
*What happens when this is not just good but genuinely extraordinary.*

## Current ceiling: 9.5/10 (post-Supabase, with Spotify import)
## 20/10 vision: The artist finishes onboarding and sees a phone showing their actual page — their name, their vibe, their colours — and understands in an instant that this product was made for exactly them.

---

## The 3 things that would make this legendary

---

### 1. The done screen that shows them, not a demo

**What it is:**
The done screen is not a mockup. It is not a generic demo. It is not a Figma template with "Artist Name" in the hero.

The done screen shows a phone frame at approximately 260px wide by 560px tall. Inside the phone frame is a live, rendered version of `able-v7.html` — scaled to fit the frame via `transform: scale(0.67)` and `transform-origin: top left`. The page is their actual page. It shows:

- Their name in the hero (from the name they entered in step 1)
- Their vibe's font and colour scheme (from the vibe they selected in step 2)
- Their accent colour (from the colour preset they chose, or the colour they picked)
- The state they set up: if they added a release date, the page shows in pre-release mode with the countdown already running; if they added a show, the page shows the shows section
- Their hero CTA copy if they wrote it; the default "My music" / "Stay close." if they didn't

Everything the artist built in the wizard is visible, live, on a phone, on the done screen.

To the left of the phone (or above it on narrower screens): three words. That is all.

> Your page is live.

Below the three words: their URL. `ablemusic.co/[slug]` — or whatever the URL scheme resolves to. A single "Copy link" button.

Nothing else. No checklist. No tutorial. No "here's what to do next." No confetti. The phone shows their work. The three words confirm it happened. The URL is what they need to put in their bio. They know what to do.

**Why it matters:**
The done screen is the moment of completion. The artist has just spent 3–5 minutes building something. The most powerful possible confirmation is not words about what happened — it is showing them what happened. The phone showing their actual page, in their actual colours, with their actual name, is the answer to the question every artist is asking at the end of onboarding: "Does it look like me?"

The answer is visual, not verbal. They see it and they know immediately whether it looks like them. If it does, they are converted. If it doesn't, they want to change something — which is fine, because the edit mode exists and the URL is there. But the act of seeing it, specifically, is what creates the emotional landing that onboarding requires.

Most onboarding done screens are congratulations mechanisms. They exist to make the new user feel good about having completed the process. ABLE's done screen is a reveal mechanism. It exists to show the artist something true: this is what you made.

**Why no competitor has it:**
Linktree's done screen shows a static mockup with their own branding prominent. Beacons shows a thumbnail. Every other link-in-bio wizard ends with a congratulatory screen that is about the platform's success (you're here, welcome) rather than the artist's output (here is what you built). Rendering the artist's actual live page in a phone frame on the done screen requires: a fully functional profile rendering system that can run with only wizard-input data, a scaled iframe implementation (same-origin, so no CORS), and the design conviction to make the done screen about the artist rather than about ABLE. No competitor has all three.

**How to build it:**
The phone frame: `<div class="done-phone-frame">` containing an `<iframe id="donePreview" src="able-v7.html" tabindex="-1" aria-hidden="true">`. Scale: the iframe renders at 390px wide; the phone frame is 260px wide; `transform: scale(0.667)` on the iframe with `transform-origin: top left`. The iframe reads from localStorage — the wizard writes to `able_v3_profile` on each step, so by the time the done screen renders, the profile is already there.

CSS:
```css
.done-phone-frame {
  width: 260px; height: 560px;
  border-radius: 36px; overflow: hidden;
  border: 8px solid rgba(255,255,255,0.12);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.8);
  flex-shrink: 0;
}
.done-phone-frame iframe {
  width: 390px; height: 844px;
  transform: scale(0.667);
  transform-origin: top left;
  border: none; pointer-events: none;
}
```

The three words: `<h1 class="done-headline">Your page is live.</h1>` — display font, large. The URL: `<p class="done-url">ablemusic.co/[slug]</p>`. The copy button: `<button class="done-copy-btn">Copy link</button>`. No other elements. Build time: 3 hours.

---

### 2. The wizard that personalises its questions based on what it learns

**What it is:**
Most onboarding wizards ask every artist the same questions. The 20/10 wizard remembers what it just learned and adjusts.

When the artist types their name and the Spotify import fires, pulling their artist name, latest release, genre, and links — the wizard does not continue asking questions about things it now knows. If the import found a release, it skips the "do you have something to share?" step. If the import found genre, it pre-selects the closest vibe. The wizard collapses from 8 questions to 3–4 because 4–5 have been answered already.

More subtly: the wizard's question copy adapts to what it knows. Before the import: "What do you go by?" After the import resolves with the artist's name: the wizard does not re-ask for their name — it shows it back to them: "We found you. Is this right?" and shows the artist's profile image, name, and latest release from Spotify. They confirm or correct. That is the entirety of step 1 once the import works.

Additionally, the vibe selection screen adapts based on the genre the import found. If the Spotify import returns genre: "electronic", the vibe grid pre-highlights "electronic" with a ring — it has not selected it, it has suggested it. The artist can confirm with one tap or choose a different vibe. The copy above the grid changes from "What's your sound?" to "This sounds right — or pick something else." Not arrogant, but confident. The import earned a recommendation.

**Why it matters:**
Every additional question in an onboarding wizard is a percentage of sign-up completions lost. The Spotify import is designed to reduce questions. But reducing questions is only half the job — the other half is making the wizard feel like it knows you from the first moment it does. When the wizard shows the artist their own Spotify profile image and says "Is this right?" after they paste a URL, the tone of the entire onboarding shifts. This is not a product asking for information. This is a product that went and found information and is now checking in with the artist. That is a fundamentally different dynamic.

**Why no competitor has it:**
The Spotify import-based adaptive wizard requires: a Spotify metadata fetch that can run client-side (via the oEmbed proxy — already specced in the ABLE system), question-skipping logic based on which import fields were populated, and copy that responds to the confidence level of the import result. No competitor has built adaptive onboarding for artist profiles because building artist-specific import infrastructure is nontrivial. Linktree has "auto-complete from Instagram" but it is not music-aware — it does not know about genres, release dates, or what vibe means.

**How to build it:**
Extend the wizard's `state` object with an `importConfidence` field. When Spotify import fires: populate `importConfidence.name`, `importConfidence.genre`, `importConfidence.release`, `importConfidence.links`. The `advanceToNextQuestion()` function skips questions where `importConfidence[field]` is high. The vibe grid `applyVibePreselection(genre)` function maps `spotifyGenre` to ABLE vibe using a lookup table:
```javascript
const GENRE_TO_VIBE = {
  'electronic': 'electronic', 'house': 'electronic', 'techno': 'electronic',
  'hip-hop': 'hiphop', 'rap': 'hiphop',
  'r&b': 'rnb', 'soul': 'rnb',
  'indie': 'indie', 'alternative': 'indie',
  'pop': 'pop',
  'rock': 'rock', 'punk': 'rock', 'metal': 'rock',
  'acoustic': 'acoustic', 'folk': 'acoustic', 'country': 'acoustic',
};
```
Build time: 4 hours (building on the existing import infrastructure).

---

### 3. The building animation as a three-act narrative

**What it is:**
The transition from the wizard's final step to the done screen is not a spinner. It is not a progress bar. It is three sequential statements that appear over 3 seconds, each one completing a task the product is doing on behalf of the artist:

- **0s → 1s:** "Adding your name..." — the first line fades in. The artist's name appears in small type below: `[Artist Name]`. This is not generic. It is their name.
- **1s → 2s:** "Setting your colour..." — the first line gets a small ✓ in accent colour. The second line fades in. A small colour swatch appears to the right: the artist's chosen accent.
- **2s → 3s:** "Your page is live." — the second line gets a ✓. The third line fades in at slightly larger type. After 300ms, the done screen enters.

The copy is specific to the artist's inputs: if they entered the colour themselves rather than choosing a preset, "Setting your colour..." feels earned. If the Spotify import populated the release, there is a fourth step: "Pulling your music..." (briefly, 400ms) before "Your page is live." Each step is doing real work and naming it.

This is not theatre for its own sake. Research from Harvard Business School on "labor illusion" (TurboTax, Kayak, Domino's) shows that showing visible steps during a completion process increases perceived quality and satisfaction independent of actual wait time. The three-act building animation transforms the done moment from "it happened" to "it was built." The artist feels the product working on their behalf.

**Why it matters:**
The done screen is the last thing the onboarding does. The building animation is what comes immediately before. The quality of the done screen moment is partly determined by what leads into it. If the artist goes from answering questions to immediately seeing the done screen — there is no transition, no landing. The 3-second building animation creates the pause that makes the reveal feel earned. The artist has time to anticipate. The phone appears having been prepared.

**Why no competitor has it:**
Every onboarding done screen in this category is either: a loading spinner while something fires, or an immediate transition with no preparation. The labor-illusion building sequence requires: specific, accurate copy about real actions being taken (not fake progress), artist-specific details surfaced in each step (their name, their colour), and the conviction that slowing down slightly at the end of onboarding increases — not decreases — conversion. That conviction is counterintuitive and therefore absent from most products optimised for funnel metrics.

**How to build it:**
```javascript
async function runBuildAnimation(profile) {
  const steps = [
    { text: `Adding your name…`, detail: profile.name, duration: 1000 },
    { text: `Setting your colour…`, detail: null, swatch: profile.accent, duration: 1000 },
    profile.release?.url ? { text: `Pulling your music…`, detail: null, duration: 400 } : null,
    { text: `Your page is live.`, detail: null, duration: 800, final: true },
  ].filter(Boolean);

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    renderBuildStep(step, i, i > 0); // second param: mark previous step complete
    if (!step.final) await delay(step.duration);
  }

  await delay(300);
  transitionToDoneScreen();
}
```
CSS: each step fades in at `opacity: 0 → 1` over 200ms. The ✓ mark uses the artist's accent colour. The detail text (artist name, colour swatch) renders at 12px muted below the main step text. Build time: 2.5 hours.

---

## The one moment

An artist finishes the wizard. They have been sceptical throughout — they have tried Linktree, they have tried Beacons, they didn't finish the onboarding on either. This one felt different: fewer questions, it already knew their Spotify profile, the vibe selection understood something about what their music sounds like.

The building animation runs. Three lines appear: their name, their colour, their music. Then the done screen.

They see a phone. On the phone: their name in the font they chose. Their accent colour. Their face in the artwork. Their latest single in the music section. "Your page is live." to the left of the phone.

They stare at it for four seconds. Then they tap "Copy link." They open Instagram. They paste it in their bio. They close Instagram. They go back to the page and look at the phone again.

They did not do this on Linktree. They did not do this on Beacons. They did this here because this is the first product that showed them their page on their screen before they even left the setup flow.

---

## What competitors would have to become to match this

**Linktree** would have to build artist-specific data infrastructure — Spotify import, genre-to-vibe mapping, release date awareness — and then redesign their done screen around the output rather than the platform. Their done screen currently features their own branding prominently. Switching to "here is what you built" requires the product belief that the artist's output matters more than the platform's brand. Linktree's business model (brand deals, sponsored content in the discovery feed) depends on platform prominence. They cannot make the done screen about the artist without undermining their own visibility.

**Beacons** has a more personalised feel than Linktree. But their onboarding is a form — a long one. They add features rather than reducing friction. Their done screen is a completion confirmation, not a reveal. Building an adaptive wizard that skips questions based on import results would require a significant rethink of their architecture.

**Koji** is a web app builder that went too broad. Their onboarding is generic. Their done screen is a link tree with widgets. Not a comparison.

---

## The 20/10 build spec

**Changes:**
- Done screen: replace any congratulatory copy with `"Your page is live."` (three words, nothing else)
- Done screen: add scaled phone frame showing the actual `able-v7.html` rendered with artist's data
- Done screen: add URL display and single "Copy link" action — no other elements
- Building animation: replace spinner/immediate transition with three sequential labelled steps, artist-name and accent-colour specific
- Wizard question adaptation: skip questions where Spotify import has provided high-confidence data
- Vibe preselection: pre-highlight (not pre-select) the vibe that best matches the imported genre
- Vibe question copy: "This sounds right — or pick something else." when a vibe has been suggested; "What's your sound?" when no suggestion is available

**Removes:**
- Any post-wizard checklist or "here's what to do next" copy
- Any platform congratulations language ("You're all set", "Welcome aboard")
- Generic done screen mockup (replaced by live artist's page in phone frame)
- Spinner during page-build transition (replaced by three-act narrative animation)

**Does not change:**
- The three-step wizard structure (identity → vibe → first action)
- The live preview phone that updates throughout the wizard
- The Spotify import URL flow (paste URL → auto-populate)
- The step count (three or four steps maximum — never more)
