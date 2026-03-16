# ABLE — Anthropic API (AI Copy) Spec
**Created: 2026-03-16 | Covers: bio suggestions, CTA labels, social captions**

> The AI copy system generates contextually aware suggestions for artists. It is a mirror, not a ghostwriter — it reflects the artist's existing voice back to them in a usable form. The Netlify function is already built at `netlify/functions/ai-copy.js`. This file covers the integration spec, model routing, and what to expect from the system.

---

## What we use it for

Three generation modes, all artist-triggered (never automatic):

| Mode | Output | Where used in product |
|---|---|---|
| `bio` | 3 alternative bio suggestions | admin.html → Profile section → "Suggest alternatives" |
| `cta` | 3 button label options for a specific CTA type | admin.html → CTA editor → "Suggest labels" |
| `caption` | 3 social caption options for current campaign state | admin.html → Broadcast section (Phase 2) |

**What it is NOT used for:**
- Not for generating an entire profile automatically
- Not for rewriting copy without the artist seeing and approving
- Not triggered without explicit artist action (never runs on save, on load, or in the background)

---

## Auth

```
x-api-key: {ANTHROPIC_API_KEY}
anthropic-version: 2023-06-01
Content-Type: application/json
```

Server-side only. The API key lives in `ANTHROPIC_API_KEY` Netlify environment variable. It never appears in client-side HTML.

---

## Model routing

Different modes use different models based on the quality/speed tradeoff.

| Mode | Model | Reason |
|---|---|---|
| `bio` | `claude-sonnet-4-6` | Bio is the most visible copy on the artist's page. Quality over speed. |
| `cta` | `claude-haiku-4-5-20251001` | 2–4 words per suggestion. High throughput. Artists iterate quickly. |
| `caption` | `claude-haiku-4-5-20251001` | Social captions are low-stakes. Speed preferred over precision. |

---

## Netlify function interface (`netlify/functions/ai-copy.js`)

**Request:**
```javascript
POST /.netlify/functions/ai-copy
{
  "mode": "bio",           // 'bio' | 'cta' | 'caption'
  "artistName": "Nadia",
  "genre": "UK hip hop",   // optional — freeform
  "vibeId": "hiphop",      // optional — canonical vibe ID
  "bio": "Current bio text for the artist",  // bio mode: existing copy to improve
  "keywords": "direct, honest, London",      // bio mode: artist's own words
  "ctaType": "presave",    // cta mode: CTA type being labelled
  "releaseTitle": "Echoes",                  // cta + bio mode
  "campaignState": "pre-release"             // caption mode
}
```

**Success response:**
```javascript
{
  "suggestions": [
    "I make music in East London. Echoes is my next thing.",
    "UK hip hop from East London. Been making music for 8 years.",
    "Nadia Rose. London-based. Echoes drops March 18."
  ]
}
```

**Error response:**
```javascript
{ "error": "rate_limited" }  // or "auth_failed" | "timeout"
```

The full prompt spec — including system prompt, vibe-specific register context, and before/after calibration examples — is in `docs/systems/ai-copy/SPEC.md`.

---

## Copy philosophy enforcement (critical)

The Anthropic prompt is the mechanism that keeps AI suggestions aligned with ABLE's voice. The system prompt always includes:

1. A statement of what ABLE copy is (direct, specific, never marketing-speak)
2. A list of banned phrases (see `docs/v6/core/COPY_AND_DESIGN_PHILOSOPHY.md`)
3. Three before/after calibration examples that show the transformation from generic to ABLE voice
4. Vibe-specific register context based on the artist's `vibeId`

**If AI suggestions start sounding generic or promotional, the system prompt needs calibration — not the UI.** Test prompts manually in the Anthropic Console before deploying updates.

---

## Rate limiting in the UI

The `ai-copy.js` function should rate-limit calls to prevent cost runaway. Reasonable limits:
- 10 calls per artist per hour (enforced via Supabase or a simple in-memory counter)
- 3 suggestions per call (not 10 — more options increases decision paralysis)
- If rate limit hit: show "Take a moment. Come back to this." — not "Limit reached. Upgrade."

---

## Cost estimate

| Model | Cost per 1k input tokens | Cost per 1k output tokens | Estimated per call |
|---|---|---|---|
| `claude-sonnet-4-6` (bio) | ~$0.003 | ~$0.015 | ~$0.005 per bio call |
| `claude-haiku-4-5-20251001` (cta/caption) | ~$0.00025 | ~$0.00125 | ~$0.0003 per cta/caption call |

At 1,000 artist calls per month (optimistic V1 usage), total AI cost: < $5/month. Not worth optimising for until usage is 100x higher.

---

## UX contract

The admin.html UI for AI copy suggestions must follow these rules to match the spec in `docs/systems/ai-copy/SPEC.md`:

1. Artist triggers the call explicitly (button tap, not automatic)
2. Loading state: spinner or subtle animation — max 3 seconds for haiku, max 8 seconds for sonnet
3. Suggestions render as 3 tappable options — artist taps one to apply, or ignores all
4. Applied suggestion can be edited immediately after selection — it is a starting point, not a final answer
5. "Regenerate" option available if all 3 are wrong (counts as a new call against rate limit)
6. Never auto-apply a suggestion without the artist tapping it

---

## Required environment variables

```
ANTHROPIC_API_KEY  → Anthropic Console → API Keys → Create key
```

---

## Current score and path to complete

**Score: 6/10 → 9/10**

What's done: `ai-copy.js` function is built. Model routing is specced. Prompt templates are in `docs/systems/ai-copy/SPEC.md`.

What's needed:
1. Add `ANTHROPIC_API_KEY` to Netlify environment variables
2. Test the function for each of the 3 modes with real artist data
3. Calibrate the system prompt against 5 real artist bios — compare output to what an editor would write
4. Build the UI in admin.html (suggestion panel, tap-to-apply, edit-after-apply, regenerate)
5. Add rate limiting (simple session-based counter is sufficient for V1)
