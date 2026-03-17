/**
 * ABLE — AI Copy Generator
 * Netlify serverless function: /.netlify/functions/ai-copy
 *
 * Generates copy suggestions in the artist's voice using Claude.
 * Three modes: bio, cta, caption.
 *
 * POST body (JSON):
 *   mode          — 'bio' | 'cta' | 'caption'
 *   artistName    — artist display name
 *   genre         — genre / vibe string (e.g. 'Electronic', 'R&B / Soul')
 *   vibeId        — canonical vibe ID (see SPEC.md §3)
 *   feel          — 'raw' | 'refined' | 'intimate' | 'expansive'
 *   bio           — existing bio text (full text, not truncated)
 *   keywords      — freeform: 3 words, mood, references (bio mode)
 *   ctaType       — 'stream' | 'presave' | 'tickets' | 'merch' | 'support' | 'follow' (cta mode)
 *   cardContent   — snap card title / body (caption mode)
 *   campaignState — 'profile' | 'pre-release' | 'live' | 'gig' (caption mode)
 *   releaseTitle  — optional release title for context
 *
 * Returns: { suggestions: string[], model: string, fallback?: true }
 *
 * Env vars: ANTHROPIC_API_KEY
 *
 * Rate limiting: 20 requests per IP per 24 hours (in-memory, resets on cold start).
 * Note: Netlify cold starts reset the in-memory counter — documented limitation.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// Model routing per mode (SPEC.md §2)
const MODELS = {
  bio:     'claude-sonnet-4-6',
  cta:     'claude-haiku-4-5-20251001',
  caption: 'claude-haiku-4-5-20251001',
};

// ── In-memory IP rate limiting ────────────────────────────────────────────────
// Resets on cold start — documented limitation. Acceptable for low-traffic beta.
const RATE_LIMIT   = 20;
const RATE_WINDOW  = 24 * 60 * 60 * 1000; // 24 hours in ms
const ipCounters   = new Map(); // { ip: { count, resetAt } }

function checkRateLimit(ip) {
  const now  = Date.now();
  const data = ipCounters.get(ip);
  if (!data || now >= data.resetAt) {
    ipCounters.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  if (data.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((data.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }
  data.count += 1;
  return { allowed: true, remaining: RATE_LIMIT - data.count };
}

// ── Banned phrase detection (SPEC.md §5) ─────────────────────────────────────
const BANNED_PATTERNS = [
  /\bgrow your audience\b/i,
  /\bsuperfan/i,
  /\bturn (?:your )?fans into\b/i,
  /\bmonetis[ez]\b/i,
  /\bcontent creator\b/i,
  /\bgoing viral\b/i,
  /\bengage your\b/i,
  /\bboost your\b/i,
  /\blevel up\b/i,
  /\bexclusive content\b/i,
  /\bunlock\b/i,
  /\bget started\b/i,
  /\byou'?re all set\b/i,
  /!/,
];

function hasBannedPhrase(text) {
  return BANNED_PATTERNS.some(p => p.test(text));
}

// ── Fallback suggestions (SPEC.md §7) ────────────────────────────────────────
const BIO_FALLBACKS = {
  electronic: [
    'Making club music that works better in the dark.',
    'Producer. DJ. Working in the space between techno and silence.',
    'Electronic music built for rooms and headphones, in that order.',
  ],
  hiphop: [
    'Writing since I was fourteen. Recording since I could afford to.',
    'Independent. Everything made here.',
    'Hip hop. No features I can\'t stand behind.',
  ],
  rnb: [
    'Songs about the things that stay with you.',
    'Soul music written at 2am and recorded the next morning.',
    'R&B singer. Making it personal on purpose.',
  ],
  indie: [
    'We\'ve been at this for a while.',
    'Indie music made in a flat and occasionally a proper studio.',
    'Writing songs about what I actually notice. That\'s the whole brief.',
  ],
  pop: [
    'Pop music that takes itself just seriously enough.',
    'Songs you\'ll know by the second listen.',
    'Pop with an edge. Or edges with some pop. Depends on the day.',
  ],
  rock: [
    'Loud when it needs to be.',
    'Rock music. No irony.',
    'We\'ve been playing together since school. Still figuring out the rest.',
  ],
  acoustic: [
    'Songs written on trains, in kitchens, mostly at night.',
    'Acoustic music. The words matter here.',
    'Fingerpicking and stories. Playing them wherever people will have me.',
  ],
  default: [
    'Independent artist. Making music on my own terms.',
    'Writing and recording. This is where I put it.',
    'Music that matters to me. Hopefully to you too.',
  ],
};

const CTA_FALLBACKS = {
  stream:  ['Listen now', 'Stream it', 'Hear it'],
  presave: ['Pre-save now', 'Save before it drops', 'Be first'],
  tickets: ['Get tickets', 'Come to the show', 'Book your spot'],
  merch:   ['Get the merch', 'Pick something up', 'Wear it'],
  support: ['Support the work', 'Back this', 'Stand behind it'],
  follow:  ['Stay close', 'Keep up', 'Follow along'],
  default: ['Take a listen', 'Hear it', 'Have a look'],
};

const CAPTION_FALLBACKS = {
  'pre-release': [
    'Something new is coming. Date in the link.',
    'Working on something. Link in bio when it\'s ready.',
    'New music soon. Follow to hear it first.',
  ],
  live: [
    'It\'s out. Link in bio.',
    'New music. Go listen — link in bio.',
    'Out now. You can find it in the link.',
  ],
  gig: [
    'Playing tonight. Details in the link.',
    'I\'m on tonight — come down if you\'re around.',
    'Show tonight. Grab a ticket in the link.',
  ],
  profile: [
    'New page, same music. Link in bio.',
    'You can find everything in the link.',
    'All my music and upcoming shows — link in bio.',
  ],
};

function getFallbackSuggestions(mode, vibeId, ctaType, campaignState) {
  if (mode === 'bio') {
    const bank = BIO_FALLBACKS[vibeId] || BIO_FALLBACKS.default;
    return bank.slice(0, 3);
  }
  if (mode === 'cta') {
    const bank = CTA_FALLBACKS[ctaType] || CTA_FALLBACKS.default;
    return bank.slice(0, 3);
  }
  if (mode === 'caption') {
    const bank = CAPTION_FALLBACKS[campaignState] || CAPTION_FALLBACKS.profile;
    return bank.slice(0, 3);
  }
  return ['Add your own copy here.', 'Something worth saying.', 'Your words.'];
}

// ── System prompt builder (SPEC.md §3) ───────────────────────────────────────
const VIBE_CONTEXT = {
  electronic: { name: 'Electronic / Club', description: 'Minimal, precise, technical vocabulary used sparingly. Copy suggests atmosphere, not emotion. Lowercase styling often fits. Short fragments work.' },
  hiphop:     { name: 'Hip Hop / Rap',      description: 'Direct, assertive, confident. Can be elliptical. Cultural specificity is good — generic hip-hop phrases are not. Avoid "bars", "spitting", "fire".' },
  rnb:        { name: 'R&B / Soul',          description: 'Intimate, emotional, personal. First person feels natural. Vulnerability is strength. Avoid clichés — "smooth", "silky", "sultry" are banned.' },
  indie:      { name: 'Indie / Alt',         description: 'Conversational, self-aware, a little understated. Irony is allowed when it\'s earned. Specific over general.' },
  pop:        { name: 'Pop',                 description: 'Clear, accessible, warm. Hooks are okay. Avoid trying to sound alternative — lean into directness.' },
  rock:       { name: 'Rock / Metal',        description: 'Strong verbs. Minimal adjectives. Conviction without explaining itself.' },
  acoustic:   { name: 'Acoustic / Folk',     description: 'Narrative, unhurried, specific. Named places and times over generic imagery. Seasonal references can work.' },
};

const FEEL_CONTEXT = {
  raw:      { name: 'Raw',      description: 'Unpolished on purpose. Directness over polish. Fragments and run-ons can be right. Don\'t smooth the edges.' },
  refined:  { name: 'Refined',  description: 'Precise word choice. Every word earns its place. Nothing excessive. A sense of control and intention.' },
  intimate: { name: 'Intimate', description: 'Close, personal, addressed directly. "You" is natural. Feels like a conversation, not a broadcast.' },
  expansive:{ name: 'Expansive',description: 'Broader scope, larger imagery. Suggests worlds and atmospheres. But still specific — not vague.' },
};

function buildSystemPrompt(vibeId, feel) {
  let prompt = `You are a copy assistant for ABLE, a platform for independent musicians.

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

BEFORE: "Subscribe to get updates from this artist"
AFTER: "Stay close."

BEFORE: "Welcome back! You're on a roll — 3 new fans this week. Keep it up!"
AFTER: "Good to see you, James. 3 fans this week — that's new."

BEFORE: "Join [Artist]'s inner circle for exclusive content, early access to new music, and premium fan perks."
AFTER: "Stay closer. A small group of people get things a bit earlier — new music before it's out, first shot at tickets."`;

  if (vibeId && VIBE_CONTEXT[vibeId]) {
    const v = VIBE_CONTEXT[vibeId];
    prompt += `\n\n## This artist's vibe: ${v.name}\n\n${v.description}`;
  }

  if (feel && FEEL_CONTEXT[feel]) {
    const f = FEEL_CONTEXT[feel];
    prompt += `\n\n## This artist's feel: ${f.name}\n\n${f.description}`;
  }

  prompt += `\n\n## Output format\n\nReturn EXACTLY 3 numbered suggestions, one per line, nothing else:\n1. [suggestion]\n2. [suggestion]\n3. [suggestion]`;

  return prompt;
}

// ── Main handler ──────────────────────────────────────────────────────────────

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  // IP rate limiting
  const ip = (event.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    return {
      statusCode: 429,
      headers: {
        ...CORS_HEADERS,
        'Retry-After': String(rateCheck.retryAfter),
      },
      body: JSON.stringify({ error: 'Daily suggestion limit reached. Try again tomorrow.' }),
    };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // API not configured — return fallback suggestions
    let body2 = {};
    try { body2 = JSON.parse(event.body || '{}'); } catch (_) {}
    const { mode = 'bio', vibeId, ctaType, campaignState } = body2;
    const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
    return json(503, {
      error: 'AI copy not configured',
      fallback: true,
      suggestions: fallbacks,
    });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) {
    return json(400, { error: 'Invalid JSON' });
  }

  const { mode, artistName, genre, vibeId, feel, bio, keywords, ctaType, cardContent, campaignState, releaseTitle } = body;
  if (!mode || !artistName) {
    return json(400, { error: 'mode and artistName required' });
  }

  const model = MODELS[mode] || MODELS.caption;
  const systemPrompt = buildSystemPrompt(vibeId, feel);
  const userPrompt = buildPrompt({ mode, artistName, genre, bio, keywords, ctaType, cardContent, campaignState, releaseTitle });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model,
        max_tokens: 512,
        messages:   [{ role: 'user', content: userPrompt }],
        system:     systemPrompt,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Anthropic error:', err);
      // Return fallbacks on API failure
      const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
      return json(200, { suggestions: fallbacks, model, fallback: true });
    }

    const data = await res.json();
    const text = (data.content && data.content[0] && data.content[0].text) || '';

    let suggestions = parseSuggestions(text);
    if (!suggestions.length) {
      const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
      return json(200, { suggestions: fallbacks, model, fallback: true });
    }

    // Banned phrase filter — log violations, drop offending suggestions (P0.5)
    const clean = [];
    for (const s of suggestions) {
      if (hasBannedPhrase(s)) {
        console.warn('ai-copy: banned phrase in suggestion:', s);
      } else {
        clean.push(s);
      }
    }

    // If all suggestions were banned, return 422 with fallbacks
    if (clean.length === 0) {
      console.warn('ai-copy: all suggestions contained banned phrases — returning fallbacks');
      const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
      return json(422, {
        error: 'generation_quality_failure',
        fallback: true,
        suggestions: fallbacks,
      });
    }

    // Pad to 3 with fallbacks if some suggestions were dropped
    if (clean.length < 3) {
      const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
      while (clean.length < 3) {
        clean.push(fallbacks[clean.length] || fallbacks[0]);
      }
    }

    return json(200, { suggestions: clean, model });

  } catch (e) {
    console.error('ai-copy error:', e.message);
    const fallbacks = getFallbackSuggestions(mode, vibeId, ctaType, campaignState);
    return json(200, { suggestions: fallbacks, model: model || 'fallback', fallback: true });
  }
};

// ── Prompt builders ───────────────────────────────────────────────────────────

function buildPrompt({ mode, artistName, genre, bio, keywords, ctaType, cardContent, campaignState, releaseTitle }) {
  const genreContext = genre ? ` (${genre})` : '';
  const bioContext   = bio   ? ` Current bio: "${bio.slice(0, 280)}"` : '';

  if (mode === 'bio') {
    const kwContext = keywords ? ` Keywords/mood: "${keywords}".` : '';
    return `Write a 1-line bio for ${artistName}${genreContext}.${kwContext}${bioContext}

The bio should be 1 sentence, max 20 words, in first person if it flows naturally, otherwise third person. Captures their sound and feel — not a list of achievements.

Return 3 options, numbered 1. 2. 3.`;
  }

  if (mode === 'cta') {
    const typeMap = {
      stream:  'streaming (like "Stream Now" but more distinctive)',
      presave: 'pre-saving a release before it drops',
      tickets: 'buying tickets to a show',
      merch:   'buying merch',
      support: 'supporting the artist directly',
      follow:  'following / staying connected',
    };
    const ctaDesc = typeMap[ctaType] || ctaType || 'a call to action';
    return `Write 3 CTA button labels for ${artistName}${genreContext} for ${ctaDesc}.${bioContext}

Requirements:
- 2–4 words each
- Sounds like the artist is speaking it personally
- Direct, specific — not generic
- No exclamation marks

Return 3 options, numbered 1. 2. 3.`;
  }

  if (mode === 'caption') {
    const stateContext = campaignState === 'pre-release' ? ' They have a release coming.'
      : campaignState === 'live'        ? ` Their ${releaseTitle || 'release'} just dropped.`
      : campaignState === 'gig'         ? ' They are playing a show tonight.'
      : '';
    const cardCtx = cardContent ? ` The post is about: "${cardContent.slice(0, 100)}"` : '';
    return `Write 3 social media captions for ${artistName}${genreContext} to share this with their followers.${stateContext}${cardCtx}

Requirements:
- Instagram/TikTok style — personal voice, not brand voice
- 1–3 sentences each
- Include a call to action (visit their page, listen, come to the show)
- No hashtags in the suggestions (artist can add their own)
- No exclamation marks unless it's genuinely exciting copy

Return 3 options, numbered 1. 2. 3.`;
  }

  return `Write 3 short copy suggestions for ${artistName}${genreContext} for: ${mode}.${bioContext}
Return 3 options, numbered 1. 2. 3.`;
}

// ── Response parser ───────────────────────────────────────────────────────────

function parseSuggestions(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const suggestions = [];
  for (const line of lines) {
    const match = line.match(/^(?:\*{0,2})(\d)\.\s*(?:\*{0,2})\s*(.+)$/) || line.match(/^(\d)\)\s*(.+)$/);
    if (match && match[2]) {
      suggestions.push(match[2].replace(/\*+/g, '').trim());
    }
  }
  if (!suggestions.length) {
    const chunks = text.split(/\n\n+/).map(c => c.trim()).filter(c => c.length > 3 && c.length < 300);
    return chunks.slice(0, 3);
  }
  return suggestions.slice(0, 3);
}

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
