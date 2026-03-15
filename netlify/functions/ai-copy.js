/**
 * ABLE — AI Copy Generator
 * Netlify serverless function: /.netlify/functions/ai-copy
 *
 * Generates copy suggestions in the artist's voice using Claude Haiku.
 * Three modes: bio, cta, caption.
 *
 * POST body (JSON):
 *   mode        — 'bio' | 'cta' | 'caption'
 *   artistName  — artist display name
 *   genre       — genre / vibe string (e.g. 'Electronic', 'R&B / Soul')
 *   bio         — existing bio text (for context)
 *   keywords    — freeform: 3 words, mood, references (mode: bio)
 *   ctaType     — 'stream' | 'presave' | 'tickets' | 'merch' | 'support' (mode: cta)
 *   cardContent — snap card title / body (mode: caption)
 *   campaignState — 'profile' | 'pre-release' | 'live' | 'gig' (mode: caption)
 *   releaseTitle  — optional release title for context
 *
 * Returns: { suggestions: string[] }  (always 3 suggestions)
 *
 * Env vars: ANTHROPIC_API_KEY
 *
 * Rate limiting: 1 call per session enforced client-side (honour system).
 * Server-side: no additional rate limiting at this tier — rely on Anthropic quotas.
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

const CLAUDE_MODEL = 'claude-haiku-4-5-20251001';

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return json(503, { error: 'AI copy not configured' });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (_) {
    return json(400, { error: 'Invalid JSON' });
  }

  const { mode, artistName, genre, bio, keywords, ctaType, cardContent, campaignState, releaseTitle } = body;
  if (!mode || !artistName) {
    return json(400, { error: 'mode and artistName required' });
  }

  const prompt = buildPrompt({ mode, artistName, genre, bio, keywords, ctaType, cardContent, campaignState, releaseTitle });

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      CLAUDE_MODEL,
        max_tokens: 512,
        messages:   [{ role: 'user', content: prompt }],
        system:     SYSTEM_PROMPT,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error('Anthropic error:', err);
      return json(502, { error: 'AI service temporarily unavailable' });
    }

    const data = await res.json();
    const text = (data.content && data.content[0] && data.content[0].text) || '';

    const suggestions = parseSuggestions(text);
    if (!suggestions.length) {
      return json(500, { error: 'Could not parse suggestions from response' });
    }

    return json(200, { suggestions });

  } catch (e) {
    console.error('ai-copy error:', e.message);
    return json(500, { error: 'Internal error' });
  }
};

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are a copy assistant for ABLE, a platform for independent musicians. Your job is to help artists write honest, direct copy in their own voice.

ABLE's copy philosophy:
- Direct, specific, human — never marketing-speak
- Sounds like the artist themselves, not a brand
- No exclamation marks on professional copy
- Never say: "superfan", "grow your audience", "content creator", "going viral", "monetise", "engage"
- Do say: specific, honest, in-the-moment
- Short is better. One strong sentence beats three weak ones.
- UK English spelling.

Return EXACTLY 3 numbered suggestions, one per line, nothing else:
1. [suggestion]
2. [suggestion]
3. [suggestion]`;

// ── Prompt builders ───────────────────────────────────────────────────────────

function buildPrompt({ mode, artistName, genre, bio, keywords, ctaType, cardContent, campaignState, releaseTitle }) {
  const genreContext = genre ? ` (${genre})` : '';
  const bioContext   = bio   ? ` Current bio: "${bio.slice(0, 120)}"` : '';

  if (mode === 'bio') {
    const kwContext = keywords ? ` Keywords/mood: "${keywords}".` : '';
    return `Write a 1-line bio for ${artistName}${genreContext}.${kwContext}${bioContext}

The bio should be 1 sentence, max 20 words, in first person if it flows naturally, otherwise third person. Captures their sound and feel — not a list of achievements.

Return 3 options, numbered 1. 2. 3.`;
  }

  if (mode === 'cta') {
    const typeMap = {
      stream:  'streaming (like "Stream Now" but more distinctive)',
      presave:  'pre-saving a release before it drops',
      tickets: 'buying tickets to a show',
      merch:   'buying merch',
      support: 'supporting the artist directly (like Patreon but more personal)',
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
  // Matches: "1. text" or "1) text" or "**1.** text"
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const suggestions = [];
  for (const line of lines) {
    const match = line.match(/^(?:\*{0,2})(\d)\.\s*(?:\*{0,2})\s*(.+)$/) || line.match(/^(\d)\)\s*(.+)$/);
    if (match && match[2]) {
      suggestions.push(match[2].replace(/\*+/g, '').trim());
    }
  }
  // Fallback: if no numbered lines found, split by double newline
  if (!suggestions.length) {
    const chunks = text.split(/\n\n+/).map(c => c.trim()).filter(c => c.length > 3 && c.length < 300);
    return chunks.slice(0, 3);
  }
  return suggestions.slice(0, 3);
}

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
