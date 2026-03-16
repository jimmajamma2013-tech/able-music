# AI Copy — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when an artist reads a suggested bio, pauses, and says "how did it know?" — not because the AI guessed at them, but because the inputs were specific enough that the output could only have been written for them.

---

## Moment 1: The Bio That Sounds Like the Artist

**What it is:** An indie artist from Glasgow, three records deep, writes their first bio on ABLE. They tap "Suggest bio." Three options appear. Option 2 reads: "Solo project out of Glasgow. Acoustic but not quiet." They use it unchanged. They don't say "I'll edit this later." They say "that's it."

**Why it's 20/10:** This is not a time-saving feature. It is a mirror. The artist sees themselves reflected back in words they could have written but didn't. That experience creates trust in ABLE at a level that no feature list can. The artist talks about it. Not "ABLE suggested a bio" — "ABLE somehow knew."

**Exact implementation:**

The prompt structure that produces this result uses four inputs, not one. Most bio generators use genre only. ABLE uses:
- `vibeId`: `indie` → triggers the vibe register block: "Conversational, self-aware, a little understated. Irony is allowed when it's earned. Specific over general."
- `feel`: `raw` → triggers the feel block: "Unpolished on purpose. Directness over polish. Fragments and run-ons can be right."
- `bio`: the artist's existing bio (even a draft, even rough) → passed as full text so the model can match their register
- `keyReleases`: `["So Long for Now", "The Hollow Ground", "Careful"]` → release titles carry character

The specific prompt addition that unlocks specificity: "Use the artist's existing bio as a register sample — match the voice, not the content. Write something that could only be about this specific artist, not about indie music in general."

The fallback for acoustic/indie that demonstrates the register (these ship as confidence: 1.0 because they were written by a human):
```javascript
{ text: "Songs written on trains, in kitchens, mostly at night.", confidence: 1.0 }
```

That line is the standard. Any AI-generated bio for an acoustic/folk artist must feel at least this specific. If the confidence heuristic scores it below 0.7, do not surface it first.

The client-side implementation that closes the loop: when an artist uses a suggestion unchanged (copies it directly, does not edit before applying), log `{ accepted: true, edited: false }` to `able_ai_copy_accepted`. This data is the 20/10 validation signal. When `edited: false` acceptance rate exceeds 30%, the system has earned the "how did it know" response.

---

## Moment 2: The Release Caption That Gets Used

**What it is:** An artist in pre-release mode, 3 days from their drop, opens admin.html to set their page to live mode. Before they do, they tap the caption suggestion button. Three Instagram caption options appear. One reads: "I've been sitting on this one for a while. It's nearly ready." They copy it, post it to their story, and their fans engage — replies saying "can't wait" from people who haven't interacted in months. The caption felt like the artist. Because it was.

**Why it's 20/10:** Copy that performs in the wild. Not copy that sounds good in the admin dashboard — copy that actually gets posted, actually gets read, actually gets a response. This closes the loop from "AI suggestion" to "real fan engagement."

**Exact implementation:**

The caption mode uses campaign state as a first-class input. This is the key architectural decision that makes captions feel timely rather than generic:

```javascript
// In the caption prompt:
const campaignContext = {
  'pre-release': `The artist is 3 days from release.
    The fan doesn't have the music yet.
    The caption should create anticipation without over-promising.
    It should sound like the artist, not like a promotional announcement.
    Do not use the word "dropping", "banger", or any music industry promotion language.`,
  'live': `The release is out today or just came out.
    The caption should mark the moment without hyperbole.
    "It's out. Go hear it." is better than a paragraph of explanation.`,
  'gig': `The artist is playing tonight.
    The caption should feel urgent and specific — venue, time, invitation.
    Not promotional. Direct. "Playing tonight. Doors at [time]. Come if you can."`,
};
```

The `releaseTitle` input is what makes the suggestion specific rather than generic. When it is provided, the prompt includes: "The release is called '[title]'. The caption can reference this specifically — but only if it sounds natural in the artist's voice. If the title is unusual or evocative, it may carry the caption. If it is functional (a person's name, a common word), use it sparingly."

The caption fallback that demonstrates the 20/10 standard for `pre-release`:
```javascript
{ text: "I've been sitting on this one for a while. It's nearly ready.", confidence: 1.0 }
```

That's the bar. Generated suggestions must feel at least this human.

The attribution feature (Phase 2) that closes the loop: when an artist copies a caption and later logs a new fan batch that arrived in the 48 hours after the post time, the system can surface: "The caption from [date] may have driven [N] new fans." Not confirmed attribution — approximate signal. But it completes the narrative from "suggested copy" to "real-world outcome."

---

## Moment 3: The CTA That Converts

**What it is:** An artist sets up a pre-save CTA. The default label is "Pre-save now." They tap the CTA suggest button. Three options appear: "Save before it drops", "Be first", and a third variant generated specifically for their vibe (electronic): "Save it. Out Friday." They try "Be first." Over the next week, their pre-save conversion rate is 12% vs the platform median of 7%.

**Why it's 20/10:** Short copy with measurable impact. The artist did not have to think. They got three options in 2 seconds, picked one, and it worked harder than the default. This is the moment where AI copy moves from "useful feature" to "genuine competitive advantage."

**Exact implementation:**

CTA mode uses `claude-haiku-4-5-20251001` for speed — the feedback loop must feel instant. The prompt for CTA mode:

```
Write exactly 3 button label options for a [ctaType] CTA on an artist's music page.
Rules:
- Maximum 4 words per label
- No verbs that sound like commands ("Click", "Tap")
- Direct action words preferred ("Save", "Listen", "Come")
- Never use: "Unlock", "Discover", "Explore", "Get started"
- Vibe context for this artist: [vibeId register description]

The three options should feel meaningfully different from each other:
1. Most direct (function over style)
2. More personal (addresses the fan directly — "you" is allowed)
3. Most specific to this artist's vibe/genre (can be unconventional if it fits)
```

The vibe-specific CTA examples that represent the 20/10 standard:

| vibeId | ctaType | 20/10 CTA suggestion |
|---|---|---|
| `electronic` | `presave` | "Save it." |
| `hiphop` | `stream` | "Hear it first" |
| `rnb` | `follow` | "Stay close" |
| `indie` | `tickets` | "Come to the show" |
| `acoustic` | `support` | "Back the work" |

The client-side confidence display: surface options in order of confidence score with a subtle label. Not a number — a label. "Most direct" / "More personal" / "Most specific." The artist picks with taste, not with metrics. The labels inform without overriding instinct.

The A/B signal (Phase 2): when Supabase is live, track which CTA label variant was selected and correlate with click-through rate. Over 200+ artists, pattern emerges: which label style converts best for which vibe. This data improves the confidence heuristic — not by overriding artist choice, but by surfacing the highest-probability option first.

---

## The 20/10 test

You know the AI copy system has crossed from excellent to extraordinary when an artist screenshots their ABLE bio, posts it to their story, and tags ABLE — not because we asked them to, but because they thought their fans would appreciate how good it was.
