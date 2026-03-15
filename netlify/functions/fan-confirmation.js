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
 *   ABLE_FROM_EMAIL  — verified Resend sender, e.g. noreply@able.fm
 *   ABLE_BASE_URL    — e.g. https://able.fm
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const apiKey   = process.env.RESEND_API_KEY;
  const fromAddr = process.env.ABLE_FROM_EMAIL || 'noreply@able.fm';
  const baseUrl  = process.env.ABLE_BASE_URL   || 'https://able.fm';

  if (!apiKey) {
    // Resend not configured — log and return OK (non-fatal)
    console.warn('fan-confirmation: RESEND_API_KEY not set — email skipped');
    return json(200, { sent: false, reason: 'email_not_configured' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'Invalid JSON body' });
  }

  const { fanEmail, artistName, artistSlug, campaignState, accentHex, releaseTitle } = body;

  if (!fanEmail || !fanEmail.includes('@')) {
    return json(400, { error: 'fanEmail required' });
  }
  if (!artistName) {
    return json(400, { error: 'artistName required' });
  }

  const accent  = accentHex || '#f4b942';
  const name    = artistName;
  const slug    = artistSlug || '';
  const state   = campaignState || 'profile';
  const profile = slug ? `${baseUrl}/${slug}` : baseUrl;

  // ── Copy per campaign state ──────────────────────────────────────────────
  let subject, headingLine, bodyLine;

  if (state === 'pre-release') {
    const title = releaseTitle ? `"${releaseTitle}"` : 'something new';
    subject     = `${name} — you're on the list`;
    headingLine = `${name} is working on ${title}.`;
    bodyLine    = `You asked to be the first to know. You will be.`;
  } else if (state === 'live') {
    const title = releaseTitle ? `"${releaseTitle}"` : 'the release';
    subject     = `${name} just added you to their list`;
    headingLine = `${name} dropped ${title}.`;
    bodyLine    = `You're on their list now. You'll hear directly about what's next.`;
  } else if (state === 'gig') {
    subject     = `${name} — you're on the list for tonight`;
    headingLine = `${name} is playing tonight.`;
    bodyLine    = `You're on their list. More shows will come directly to you.`;
  } else {
    // profile (default)
    subject     = `${name} — you're on their list`;
    headingLine = `You're on ${name}'s list.`;
    bodyLine    = `No noise. Just the things that matter — direct from them, when they happen.`;
  }

  const html = buildEmail({ name, accent, profile, headingLine, bodyLine });

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
      return json(502, { error: 'Email delivery failed', detail: data.message || '' });
    }

    return json(200, { sent: true, id: data.id });
  } catch (e) {
    console.error('fan-confirmation fetch error:', e.message);
    return json(500, { error: 'Internal error sending email' });
  }
};

// ── Email template ──────────────────────────────────────────────────────────

function buildEmail({ name, accent, profile, headingLine, bodyLine }) {
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
              <a href="${esc(profile)}" style="display:inline-block;padding:12px 24px;background:${esc(accent)};color:${esc(textOnAccent)};font-size:14px;font-weight:700;text-decoration:none;border-radius:10px;">See ${esc(name)}'s page →</a>

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
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getLuminance(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
