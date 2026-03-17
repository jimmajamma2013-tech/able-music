/**
 * ABLE — Artist Welcome Email
 * Netlify serverless function: /.netlify/functions/artist-welcome
 *
 * Called from start.html Done screen after wizard completion.
 * Sends a single welcome email to the artist in ABLE's voice.
 * Under 60 words total. Direct. No filler.
 *
 * Body (POST, JSON):
 *   artistEmail — artist's email address
 *   artistName  — artist display name
 *   artistSlug  — handle (for profile + admin URLs)
 *   profileUrl  — full URL to their live page
 *
 * Env vars:
 *   RESEND_API_KEY
 *   ABLE_FROM_EMAIL  — e.g. hello@ablemusic.co
 *   ABLE_BASE_URL    — e.g. https://ablemusic.co
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
  const fromAddr = process.env.ABLE_FROM_EMAIL || 'hello@ablemusic.co';
  const baseUrl  = process.env.ABLE_BASE_URL   || 'https://ablemusic.co';

  if (!apiKey) {
    console.warn('artist-welcome: RESEND_API_KEY not set — email skipped');
    return json(200, { sent: false, reason: 'email_not_configured' });
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (_) {
    return json(400, { error: 'invalid_body' });
  }

  const { artistEmail, artistName, artistSlug } = body;
  if (!artistEmail || !artistName) {
    return json(400, { error: 'missing_required_fields' });
  }

  const profileUrl = body.profileUrl || `${baseUrl}/${artistSlug || ''}`;
  const adminUrl   = `${baseUrl}/admin.html?ref=email-welcome`;
  const firstName  = (artistName || '').split(' ')[0] || artistName;

  const subject = `Your ABLE page is live, ${firstName}.`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
<style>
  body { margin:0; padding:0; background:#f5f5f5; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
  .wrap { max-width:520px; margin:40px auto; background:#ffffff; border-radius:8px; overflow:hidden; }
  .header { background:#0d0e1a; padding:32px 40px 24px; }
  .wordmark { color:#ffffff; font-size:14px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; }
  .body { padding:32px 40px 24px; color:#1a1a1a; }
  h1 { font-size:22px; font-weight:700; margin:0 0 16px; color:#0d0e1a; line-height:1.3; }
  p { font-size:15px; line-height:1.7; color:#444; margin:0 0 16px; }
  .cta { display:inline-block; background:#0d0e1a; color:#ffffff; text-decoration:none; padding:13px 24px; border-radius:8px; font-size:14px; font-weight:600; margin:8px 0 24px; }
  .link-row { margin-top:8px; }
  .link-row a { color:#555; font-size:13px; }
  .footer { padding:16px 40px 24px; border-top:1px solid #eee; }
  .footer p { font-size:12px; color:#888; margin:0; line-height:1.6; }
  @media (max-width:600px) {
    .wrap { margin:0; border-radius:0; }
    .header, .body, .footer { padding:24px; }
  }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <div class="wordmark">ABLE</div>
  </div>
  <div class="body">
    <h1>Your page is live.</h1>
    <p>Anyone with the link can find you now. Share it in your Instagram and TikTok bio — that's where it does the most work.</p>
    <p>Your page: <a href="${profileUrl}" style="color:#0d0e1a;font-weight:600;">${profileUrl.replace(/^https?:\/\//, '')}</a></p>
    <a class="cta" href="${adminUrl}">Go to your dashboard →</a>
    <div class="link-row">
      <a href="${profileUrl}">View your live page</a>
    </div>
  </div>
  <div class="footer">
    <p>You're receiving this because you created an ABLE page. This is the only welcome email we send.<br>
    Questions? Reply to this email.</p>
  </div>
</div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `ABLE <${fromAddr}>`,
        to:   artistEmail,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('artist-welcome: Resend error', res.status, err);
      return json(500, { error: 'send_failed', status: res.status });
    }

    const data = await res.json();
    return json(200, { sent: true, message_id: data.id });

  } catch (err) {
    console.error('artist-welcome: fetch error', err.message);
    return json(500, { error: 'network_error', message: err.message });
  }
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: CORS_HEADERS,
    body: JSON.stringify(body),
  };
}
