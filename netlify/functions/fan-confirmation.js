/**
 * ABLE — Fan Confirmation Email
 * Netlify serverless function: /.netlify/functions/fan-confirmation
 *
 * Called after fan signs up on an artist's profile.
 * Sends a confirmation email in the artist's voice via Resend.
 *
 * Body (POST, JSON):
 *   fanEmail    — fan's email address
 *   artistName  — artist display name
 *   artistSlug  — artist handle (for profile URL)
 *   campaignState — 'profile' | 'pre-release' | 'live' | 'gig'
 *   accentHex   — artist accent colour (#rrggbb)
 *   releaseTitle — optional, for pre-release / live states
 *
 * Env vars:
 *   RESEND_API_KEY
 *   ABLE_FROM_EMAIL  — verified Resend sender, e.g. noreply@ablemusic.co
 *   ABLE_BASE_URL    — e.g. https://ablemusic.co
 */

// #P8-72: restrict CORS to known origins — fan emails are sensitive data
const ALLOWED_ORIGINS = new Set([
  'https://ablemusic.co',
  'https://www.ablemusic.co',
  'https://ablemusic.netlify.app',
]);
function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : 'https://ablemusic.co';
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };
}

exports.handler = async function (event) {
  const origin = event.headers && (event.headers.origin || event.headers.Origin) || '';
  const hdrs = corsHeaders(origin);
  // Scoped response helper that always includes the correct CORS headers for this request
  const respond = (status, body) => json(status, body, hdrs);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: hdrs, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return respond(405, { error: 'Method not allowed' });
  }

  const apiKey   = process.env.RESEND_API_KEY;
  const fromAddr = process.env.ABLE_FROM_EMAIL || 'noreply@ablemusic.co';
  const baseUrl  = process.env.ABLE_BASE_URL   || 'https://ablemusic.co';

  if (!apiKey) {
    // Resend not configured — log and return OK (non-fatal)
    console.warn('fan-confirmation: RESEND_API_KEY not set — email skipped');
    return respond(200, { sent: false, reason: 'email_not_configured' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return respond(400, { error: 'Invalid JSON body' });
  }

  const { fanEmail, artistName, artistSlug, campaignState, accentHex, releaseTitle } = body;

  // ── Input validation (H5) ─────────────────────────────────────────────────
  const VALID_STATES = new Set(['profile', 'pre-release', 'live', 'gig']);

  // Type guards
  if (typeof fanEmail !== 'string')   return respond(400, { error: 'fanEmail must be a string' });
  if (typeof artistName !== 'string') return respond(400, { error: 'artistName must be a string' });
  if (artistSlug   !== undefined && typeof artistSlug   !== 'string') return respond(400, { error: 'artistSlug must be a string' });
  if (accentHex    !== undefined && typeof accentHex    !== 'string') return respond(400, { error: 'accentHex must be a string' });
  if (releaseTitle !== undefined && typeof releaseTitle !== 'string') return respond(400, { error: 'releaseTitle must be a string' });

  // fanEmail: RFC-compliant length checks + no control chars
  if (!fanEmail || fanEmail.length < 6 || fanEmail.length > 254) return respond(400, { error: 'fanEmail invalid length' });
  if (/[\x00-\x1F\x7F\n\r]/.test(fanEmail))                     return respond(400, { error: 'fanEmail contains invalid characters' });
  if (!/^[^\s@]{1,64}@[^\s@]{1,255}$/.test(fanEmail))           return respond(400, { error: 'fanEmail invalid format' });

  // artistName: trim + length
  const trimmedName = artistName.trim();
  if (!trimmedName || trimmedName.length > 100) return respond(400, { error: 'artistName invalid' });

  // Optional field validation
  if (artistSlug && !/^[a-z0-9-]{1,60}$/.test(artistSlug))        return respond(400, { error: 'artistSlug invalid format' });
  if (accentHex  && !/^#[0-9a-fA-F]{6}$/.test(accentHex))         return respond(400, { error: 'accentHex invalid format' });
  if (releaseTitle && releaseTitle.length > 200)                   return respond(400, { error: 'releaseTitle too long' });

  const accent      = (accentHex && /^#[0-9a-fA-F]{6}$/.test(accentHex)) ? accentHex : '#f4b942';
  const name        = trimmedName;
  const slug        = artistSlug || '';
  const state       = VALID_STATES.has(campaignState) ? campaignState : 'profile';
  const profile     = slug ? `${baseUrl}/${slug}` : baseUrl;
  const fanDashboard = slug
    ? `${baseUrl}/fan.html?artist=${encodeURIComponent(slug)}&ref=email-confirm`
    : `${baseUrl}/fan.html`;

  // ── Copy per campaign state ──────────────────────────────────────────────
  let subject, headingLine, bodyLine;

  if (state === 'pre-release') {
    const title = releaseTitle ? `"${releaseTitle}"` : 'something new';
    subject     = `${name} noted you down`;
    headingLine = `${name} is working on ${title}.`;
    bodyLine    = `You asked to be the first to know. You will be.`;
  } else if (state === 'live') {
    const title = releaseTitle ? `"${releaseTitle}"` : 'the release';
    subject     = `${name} noted you down`;
    headingLine = `${name} dropped ${title}.`;
    bodyLine    = `You're on their list now. You'll hear directly about what's next.`;
  } else if (state === 'gig') {
    subject     = `${name} noted you down for tonight`;
    headingLine = `${name} is playing tonight.`;
    bodyLine    = `You're on their list. More shows will come directly to you.`;
  } else {
    // profile (default)
    subject     = `${name} noted you down`;
    headingLine = `You're on ${name}'s list.`;
    bodyLine    = `No noise. Just the things that matter — direct from them, when they happen.`;
  }

  const html = buildEmail({ name, accent, profile, fanDashboard, headingLine, bodyLine });

  // ── Send via Resend ───────────────────────────────────────────────────────
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    `${name} via ABLE <${fromAddr}>`,
        to:      [fanEmail],
        subject,
        html,
        tags: [
          { name: 'type',         value: 'fan-confirmation' },
          { name: 'artist_slug',  value: slug || 'unknown'  },
          { name: 'campaign_state', value: state },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend error:', JSON.stringify(data));
      return respond(502, { error: 'Email delivery failed', detail: data.message || '' });
    }

    return respond(200, { sent: true, id: data.id });
  } catch (e) {
    console.error('fan-confirmation fetch error:', e.message);
    return respond(500, { error: 'Internal error sending email' });
  }
};

// ── Email template ──────────────────────────────────────────────────────────

function buildEmail({ name, accent, profile, fanDashboard, headingLine, bodyLine }) {
  // Determine text color for accent bg (simple luminance check)
  const textOnAccent = getLuminance(accent) > 0.4 ? '#000000' : '#ffffff';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(headingLine)}</title>
</head>
<body style="margin:0;padding:0;background:#0d0e1a;font-family:'DM Sans',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0d0e1a;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="100%" style="max-width:480px;" cellpadding="0" cellspacing="0">

          <!-- Accent bar -->
          <tr>
            <td style="height:3px;background:${esc(accent)};border-radius:2px 2px 0 0;"></td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#12152a;border-radius:0 0 16px 16px;padding:40px 36px;">

              <!-- Artist name pill -->
              <p style="margin:0 0 28px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${esc(accent)};">${esc(name)}</p>

              <!-- Heading -->
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:700;color:#f0ede8;line-height:1.25;">${esc(headingLine)}</h1>

              <!-- Body -->
              <p style="margin:0 0 32px;font-size:15px;color:rgba(240,237,232,0.62);line-height:1.6;">${esc(bodyLine)}</p>

              <!-- CTA -->
              <a href="${esc(fanDashboard)}" style="display:inline-block;padding:12px 24px;background:${esc(accent)};color:${esc(textOnAccent)};font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">${esc(name)}'s page →</a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;font-size:11px;color:rgba(240,237,232,0.28);">You signed up on <a href="${esc(profile)}" style="color:rgba(240,237,232,0.28);">ABLE</a>. This is not a marketing list.<br>You'll only hear from ${esc(name)} directly.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function getLuminance(hex) {
  let c = hex.replace('#', '');
  // Expand 3-digit shorthand (#abc → aabbcc) to prevent NaN from short slices
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function json(status, body, headers) {
  return { statusCode: status, headers: headers || {}, body: JSON.stringify(body) };
}
