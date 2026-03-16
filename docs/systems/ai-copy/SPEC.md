# ABLE — AI Copy System: Canonical Spec
**Created: 2026-03-16 | Authority doc for all AI copy decisions**

> This is the canonical specification for the AI copy generation system. It defines input contracts, prompt templates, output format, rate limiting, and fallback behaviour. All implementation must follow this document.

---

## 1. Overview

The AI copy system (`netlify/functions/ai-copy.js`) generates contextually aware copy suggestions for artists. Three modes:

- **bio** — single-line artist bio (up to 3 options)
- **cta** — button label suggestions for a specific CTA type
- **caption** — social media caption options for the artist's current campaign state

The system is not a content generator. It is a mirror — it reflects the artist's existing voice back to them in a usable form. Every suggestion must sound like the artist wrote it, not like ABLE wrote it for them.

---

## 2. Input contract

### Request body

```typescript
interface AICopyRequest {
  // Required
  mode:       'bio' | 'cta' | 'caption';
  artistName: string;

  // Artist identity context (pass as many as available)
  genre?:         string;              // freeform genre string from profile
  vibeId?:        VibeId;             // canonical vibe ID (see §3)
  feel?:          'raw' | 'refined' | 'intimate' | 'expansive';
  bio?:           string;             // existing bio — pass full text, not truncated
  tone?:          string;             // freeform mood/tone from wizard keywords field

  // Mode-specific
  keywords?:      string;             // bio mode: 3 words / mood / references
  ctaType?:       CTAType;            // cta mode
  cardContent?:   string;             // caption mode: snap card content
  campaignState?: CampaignState;      // caption mode
  releaseTitle?:  string;             // caption + bio mode
  releaseFormat?: 'single' | 'ep' | 'album' | 'mixtape';  // caption mode
}

type VibeId = 'electronic' | 'hiphop' | 'rnb' | 'indie' | 'pop' | 'rock' | 'acoustic';

type CTAType = 'stream' | 'presave' | 'tickets' | 'merch' | 'support' | 'follow';

type CampaignState = 'profile' | 'pre-release' | 'live' | 'gig';
```

### Model routing

| Mode | Model | Rationale |
|---|---|---|
| `bio` | `claude-sonnet-4-6` | Bio is the most visible copy on the artist's page. Quality matters more than speed. |
| `cta` | `claude-haiku-4-5-20251001` | 2–4 words. High throughput. Fast feedback loop. |
| `caption` | `claude-haiku-4-5-20251001` | Social captions are low-stakes. Artists iterate quickly. Speed preferred. |

---

## 3. System prompt template

The system prompt must be constructed at call time, not stored as a static string. It incorporates:
1. The ABLE copy philosophy (invariant)
2. Vibe-specific register context (from `vibeId`)
3. Feel context (from `feel`)
4. Three before/after calibration examples (invariant)

### Base system prompt

```
You are a copy assistant for ABLE, a platform for independent musicians.

Your job is to help artists write honest, direct copy in their own voice — not in the voice of a marketing platform.

## ABLE copy philosophy

Direct and specific. Never marketing-speak.
Sounds like the artist themselves — not a brand, not a platform.
UK English spelling throughout.
Short is better. One strong sentence beats three weak ones.
No exclamation marks on professional copy.

## Banned phrases — never generate these or any close variant

- "grow your audience" → say "reach people who care"
- "superfan" or "turn fans into [anything]" → say "the people who show up"
- "monetise" or "monetize" → say "let people support you"
- "content creator" → say "artist"
- "going viral" → never mention this
- "engage your followers" → say "stay close to the people who show up"
- "boost" or "level up" → say what the actual effect is
- "exclusive content" → describe what it actually is
- Generic SaaS phrases: "Get started", "You're all set", "Unlock"

## Calibration examples

These examples define the register. Copy that feels like the "before" column is wrong. Copy that feels like the "after" column is right.

BEFORE: "Subscribe to get updates from this artist"
AFTER: "Stay close."

BEFORE: "Welcome back! You're on a roll — 3 new fans this week. Keep it up!"
AFTER: "Good to see you, James. 3 fans this week — that's new."

BEFORE: "Join [Artist]'s inner circle for exclusive content, early access to new music, and premium fan perks."
AFTER: "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets."

## Output format

Return EXACTLY 3 numbered suggestions, one per line, nothing else:
1. [suggestion]
2. [suggestion]
3. [suggestion]
```

### Vibe context block (appended when `vibeId` is provided)

```
## This artist's vibe: {{VIBE_NAME}}

{{VIBE_REGISTER_DESCRIPTION}}
```

Vibe register descriptions:

| vibeId | VIBE_NAME | VIBE_REGISTER_DESCRIPTION |
|---|---|---|
| `electronic` | Electronic / Club | Minimal, precise, technical vocabulary used sparingly. Copy suggests atmosphere, not emotion. Lowercase styling often fits. Short fragments work. |
| `hiphop` | Hip Hop / Rap | Direct, assertive, confident. Can be elliptical. Cultural specificity is good — generic hip-hop phrases are not. Avoid "bars", "spitting", "fire". |
| `rnb` | R&B / Soul | Intimate, emotional, personal. First person feels natural. Vulnerability is strength. Avoid clichés — "smooth", "silky", "sultry" are all banned. |
| `indie` | Indie / Alt | Conversational, self-aware, a little understated. Irony is allowed when it's earned. Specific over general. |
| `pop` | Pop | Clear, accessible, warm. Hooks are okay. Avoid trying to sound alternative — lean into directness. |
| `rock` | Rock / Metal | Strong verbs. Minimal adjectives. Conviction without explaining itself. |
| `acoustic` | Acoustic / Folk | Narrative, unhurried, specific. Named places and times over generic imagery. Seasonal references can work. |

### Feel context block (appended when `feel` is provided)

```
## This artist's feel: {{FEEL_NAME}}

{{FEEL_DESCRIPTION}}
```

Feel descriptions:

| feel | FEEL_NAME | FEEL_DESCRIPTION |
|---|---|---|
| `raw` | Raw | Unpolished on purpose. Directness over polish. Fragments and run-ons can be right. Don't smooth the edges. |
| `refined` | Refined | Precise word choice. Every word earns its place. Nothing excessive. A sense of control and intention. |
| `intimate` | Intimate | Close, personal, addressed directly. "You" is natural. Feels like a conversation, not a broadcast. |
| `expansive` | Expansive | Broader scope, larger imagery. Suggests worlds and atmospheres. But still specific — not vague. |

---

## 4. Output format — structured JSON

The function must return a structured response, not a flat string array:

```typescript
interface AICopyResponse {
  suggestions: CopySuggestion[];
  mode:        'bio' | 'cta' | 'caption';
  model:       string;
}

interface CopySuggestion {
  text:       string;
  confidence: number;    // 0.0–1.0. Computed heuristically — see §4.1
  label?:     string;    // Optional: "more direct" | "more personal" | "more specific"
}
```

**Example response (bio mode):**
```json
{
  "suggestions": [
    { "text": "Making music in the space between grief and gratitude.", "confidence": 0.9, "label": "most specific" },
    { "text": "Solo project out of Glasgow. Acoustic but not quiet.", "confidence": 0.8, "label": "more direct" },
    { "text": "Three records in. Still figuring it out, mostly in the open.", "confidence": 0.7, "label": "more personal" }
  ],
  "mode": "bio",
  "model": "claude-sonnet-4-6"
}
```

### 4.1 Confidence heuristic

Confidence is not reported by Claude — it is computed post-parse based on output characteristics:

| Signal | Adjustment |
|---|---|
| Suggestion contains a banned phrase | −0.4 (also flag for retry) |
| Suggestion is longer than mode maximum | −0.2 |
| Suggestion contains an exclamation mark | −0.3 |
| Suggestion is shorter than 3 words (bio/caption mode) | −0.2 |
| Suggestion is numbered 1 in Claude's output | +0.1 (model typically leads with strongest output) |
| Suggestion appears to use artist name appropriately | +0.1 |

Start all suggestions at 0.8 and apply adjustments. Floor at 0.1. Cap at 0.95 (reserve 1.0 for human-written defaults).

---

## 5. Voice calibration — banned phrase detection

After parsing suggestions from Claude's response, run each suggestion through a banned phrase check before returning:

```javascript
const BANNED_PATTERNS = [
  /\bgrow your audience\b/i,
  /\bsuperfan/i,
  /\bturn (?:your )?fans into\b/i,
  /\bmonetis[e|z]\b/i,
  /\bcontent creator\b/i,
  /\bgoing viral\b/i,
  /\bengage your\b/i,
  /\bboost your\b/i,
  /\blevel up\b/i,
  /\bexclusive content\b/i,
  /\bunlock\b/i,
  /\bget started\b/i,
  /\byou're all set\b/i,
  /\bsuperfan\b/i,
  /!/,   // exclamation marks
];

function hasBannedPhrase(text) {
  return BANNED_PATTERNS.some(p => p.test(text));
}
```

If a suggestion contains a banned phrase:
- Apply the −0.4 confidence penalty
- Do not retry automatically (cost risk)
- Log the violation server-side: `console.warn('Banned phrase in suggestion:', text)`
- Return the suggestion with lowered confidence — the UI can decide whether to surface it

If all three suggestions contain banned phrases, return a 422 error with `{ error: 'generation_quality_failure', fallback: getFallbackSuggestions(mode, vibeId, ctaType) }`.

---

## 6. Rate limiting

### Server-side (Netlify function)

Rate limiting is implemented using a Netlify Blobs counter keyed on `artistId`. If Netlify Blobs are not available, fall back to IP-based limiting.

```
Limit: 10 requests per artist per day (rolling 24 hours)
Key:   artist_id from request body (required for rate limiting)
```

If `artistId` is not provided, fall back to IP-based rate limiting:
```
Limit: 20 requests per IP per day
Key:   client IP from event.headers['x-forwarded-for']
```

When limit is exceeded:
```json
HTTP 429
{ "error": "Daily suggestion limit reached. Try again tomorrow." }
```

Include header: `Retry-After: [seconds until midnight UTC]`

### Client-side (localStorage)

Track daily usage in localStorage as a supplementary check (not the primary gate):

```javascript
const RATE_KEY = 'able_ai_copy_usage';

function checkClientRateLimit() {
  const today = new Date().toDateString();
  const usage = JSON.parse(localStorage.getItem(RATE_KEY) || '{}');
  if (usage.date !== today) return { allowed: true, remaining: 10 };
  return {
    allowed: usage.count < 10,
    remaining: Math.max(0, 10 - usage.count)
  };
}

function incrementClientRateLimit() {
  const today = new Date().toDateString();
  const usage = JSON.parse(localStorage.getItem(RATE_KEY) || '{}');
  const count = usage.date === today ? usage.count + 1 : 1;
  localStorage.setItem(RATE_KEY, JSON.stringify({ date: today, count }));
}
```

Surface remaining count in the UI: "3 suggestions left today" once the artist is below 5.

---

## 7. Fallback suggestions — human-written defaults

When the Claude API is unavailable (any non-200 response), return `{ fallback: true, suggestions: [...] }` from a curated defaults bank. The UI must handle `fallback: true` by showing a subtle indicator ("These are starting points — edit them to sound like you.").

### Bio fallbacks by vibe

```javascript
const BIO_FALLBACKS = {
  electronic: [
    { text: "Making club music that works better in the dark.", confidence: 1.0 },
    { text: "Producer. DJ. Working in the space between techno and silence.", confidence: 1.0 },
    { text: "Electronic music built for rooms and headphones, in that order.", confidence: 1.0 },
  ],
  hiphop: [
    { text: "Writing since I was fourteen. Recording since I could afford to.", confidence: 1.0 },
    { text: "Independent. Everything made here.", confidence: 1.0 },
    { text: "Hip hop from [city]. No features I can't stand behind.", confidence: 1.0 },
  ],
  rnb: [
    { text: "Songs about the things that stay with you.", confidence: 1.0 },
    { text: "Soul music written at 2am and recorded the next morning.", confidence: 1.0 },
    { text: "R&B singer. Making it personal on purpose.", confidence: 1.0 },
  ],
  indie: [
    { text: "Three-piece from [city]. We've been at this for a while.", confidence: 1.0 },
    { text: "Indie music made in a flat and occasionally a proper studio.", confidence: 1.0 },
    { text: "Writing songs about what I actually notice. That's the whole brief.", confidence: 1.0 },
  ],
  pop: [
    { text: "Pop music that takes itself just seriously enough.", confidence: 1.0 },
    { text: "Songs you'll know by the second listen.", confidence: 1.0 },
    { text: "Pop with an edge. Or edges with some pop. Depends on the day.", confidence: 1.0 },
  ],
  rock: [
    { text: "Four-piece. Loud when it needs to be.", confidence: 1.0 },
    { text: "Rock music. No irony.", confidence: 1.0 },
    { text: "We've been playing together since school. Still figuring out the rest.", confidence: 1.0 },
  ],
  acoustic: [
    { text: "Songs written on trains, in kitchens, mostly at night.", confidence: 1.0 },
    { text: "Acoustic music. The words matter here.", confidence: 1.0 },
    { text: "Fingerpicking and stories. Playing them wherever people will have me.", confidence: 1.0 },
  ],
  default: [
    { text: "Independent artist. Making music on my own terms.", confidence: 1.0 },
    { text: "Writing and recording in [city]. This is where I put it.", confidence: 1.0 },
    { text: "Music that matters to me. Hopefully to you too.", confidence: 1.0 },
  ],
};
```

### CTA fallbacks by type

```javascript
const CTA_FALLBACKS = {
  stream:  ["Listen now", "Stream it", "Hear it"],
  presave: ["Pre-save now", "Save before it drops", "Be first"],
  tickets: ["Get tickets", "Come to the show", "Book your spot"],
  merch:   ["Get the merch", "Pick something up", "Wear it"],
  support: ["Support the work", "Back this", "Stand behind it"],
  follow:  ["Stay close", "Keep up", "Follow along"],
};
```

### Caption fallbacks

Caption fallbacks are generic enough to require editing — that is intentional. They signal to the artist that they need to personalise, rather than offering something that could ship unchanged.

```javascript
const CAPTION_FALLBACKS = {
  'pre-release': [
    { text: "Something new is coming. Date in the link.", confidence: 1.0 },
    { text: "I've been sitting on this one for a while. It's nearly ready.", confidence: 1.0 },
    { text: "Pre-save opens today. Link in bio if you want to be first.", confidence: 1.0 },
  ],
  'live': [
    { text: "It's out. Go hear it — link in bio.", confidence: 1.0 },
    { text: "New music today. Took longer than expected and that's fine.", confidence: 1.0 },
    { text: "This one's done. Link in bio, as always.", confidence: 1.0 },
  ],
  'gig': [
    { text: "Playing tonight. Doors at [time]. Come if you can.", confidence: 1.0 },
    { text: "Show tonight. Last few tickets in the link.", confidence: 1.0 },
    { text: "On tonight at [venue]. If you're around — come.", confidence: 1.0 },
  ],
  default: [
    { text: "New music in the link. Worth a few minutes of your time.", confidence: 1.0 },
    { text: "Come find out what I've been working on. Link in bio.", confidence: 1.0 },
    { text: "Everything's at the link. Start with the music.", confidence: 1.0 },
  ],
};
```

---

## 8. Learning from accepted suggestions

When an artist accepts a suggestion (copies it to clipboard, applies it to their profile, or selects it in the wizard), that event is recorded in localStorage and optionally in Supabase.

### localStorage key

```javascript
// Key: able_ai_copy_accepted
// Value: AcceptedCopy[]

interface AcceptedCopy {
  mode:       string;
  text:       string;
  vibeId?:    string;
  feel?:      string;
  ts:         number;  // Unix timestamp
}
```

### Future use

On subsequent bio mode calls for the same artist, pass the most recently accepted bio as `existingAcceptedBio` context. This gives the model a style sample to match:

```
The artist previously liked this bio: "[accepted text]"
New suggestions should match its register and tone without repeating it.
```

This does not require Supabase in Phase 1 — localStorage is sufficient for single-device use.

---

## 9. Error responses

| Code | Condition | Response body |
|---|---|---|
| 400 | Missing `mode` or `artistName` | `{ error: "mode and artistName required" }` |
| 400 | Invalid JSON body | `{ error: "Invalid JSON" }` |
| 405 | Non-POST method | `{ error: "Method not allowed" }` |
| 422 | All suggestions contain banned phrases | `{ error: "generation_quality_failure", fallback: [...] }` |
| 429 | Rate limit exceeded | `{ error: "Daily suggestion limit reached. Try again tomorrow.", retryAfter: N }` |
| 503 | `ANTHROPIC_API_KEY` not set | `{ error: "AI copy not configured", fallback: [...] }` |
| 502 | Anthropic API returned non-200 | `{ error: "AI service temporarily unavailable", fallback: [...] }` |
| 500 | Parse failure — no suggestions extracted | `{ error: "Could not parse suggestions", fallback: [...] }` |

Note: all error responses above `400` include a `fallback` array of curated human-written defaults where applicable. The client must handle `fallback` being present and show it with the appropriate indicator.

---

## 10. Integration checklist

When implementing the client-side integration:

- [ ] Pass `vibeId` and `feel` from the artist's stored profile, not just `genre`
- [ ] Pass the full `bio` text (not truncated)
- [ ] Use `artistId` in the request body for server-side rate limiting
- [ ] Check client-side rate limit before making the request
- [ ] Handle `fallback: true` in the response with a subtle UI indicator
- [ ] Record accepted suggestions to `able_ai_copy_accepted`
- [ ] Model split: bio mode → specify Sonnet in request or handle server-side routing
- [ ] Surface `confidence` scores visually (a lighter label or sorted order)
- [ ] Never auto-apply a suggestion — always require the artist to explicitly select it
