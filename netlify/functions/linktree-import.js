/**
 * ABLE — Linktree Import
 * Netlify serverless function: /.netlify/functions/linktree-import
 *
 * Fetches a public Linktree page and extracts link titles + URLs.
 * No Linktree API needed — pages are public HTML with embedded __NEXT_DATA__.
 *
 * POST { url: "https://linktr.ee/username" }
 * Returns: { links: [{ title, url, platform }], source: 'linktree' }
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  let ltUrl;
  try {
    const body = JSON.parse(event.body || '{}');
    ltUrl = (body.url || '').trim();
  } catch {
    return json(400, { error: 'Invalid body', code: 'BAD_REQUEST' });
  }

  // Normalise: add https if missing
  if (ltUrl && !ltUrl.startsWith('http')) ltUrl = 'https://' + ltUrl;

  // Validate it's a Linktree URL
  if (!/^https?:\/\/(www\.)?linktr\.ee\//.test(ltUrl)) {
    return json(400, { error: 'Not a Linktree URL', code: 'NOT_LINKTREE' });
  }

  let html;
  try {
    const res = await fetch(ltUrl, {
      headers: {
        'User-Agent': 'ABLE/1.0 (ablemusic.co) contact@ablemusic.co',
        'Accept': 'text/html',
      },
    });
    if (!res.ok) {
      return json(404, { error: 'Linktree page not found', code: 'NOT_FOUND' });
    }
    html = await res.text();
  } catch {
    return json(502, { error: 'Could not fetch Linktree page', code: 'FETCH_FAILED' });
  }

  // Linktree embeds link data in a __NEXT_DATA__ JSON script tag.
  const nextDataMatch = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/.exec(html);

  if (!nextDataMatch) {
    return json(422, { error: 'Could not parse Linktree page', code: 'PARSE_FAILED' });
  }

  let links = [];
  let profileName = '';
  try {
    const nextData = JSON.parse(nextDataMatch[1]);
    // Path may vary across Linktree versions — check multiple locations
    const rawLinks =
      nextData?.props?.pageProps?.account?.links ||
      nextData?.props?.pageProps?.links ||
      [];

    profileName =
      nextData?.props?.pageProps?.account?.name ||
      nextData?.props?.pageProps?.name ||
      '';

    links = rawLinks
      .filter(l => l.url && l.title)
      .map(l => ({
        title:    l.title,
        url:      l.url,
        platform: detectPlatform(l.url),
      }));
  } catch {
    return json(422, { error: 'Could not read links from Linktree page', code: 'PARSE_FAILED' });
  }

  return json(200, { links, name: profileName, source: 'linktree' });
};

function detectPlatform(url) {
  const u = url.toLowerCase();
  if (u.includes('spotify.com'))    return 'spotify';
  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube';
  if (u.includes('instagram.com'))  return 'instagram';
  if (u.includes('tiktok.com'))     return 'tiktok';
  if (u.includes('soundcloud.com')) return 'soundcloud';
  if (u.includes('bandcamp.com'))   return 'bandcamp';
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter';
  if (u.includes('discord.gg'))     return 'discord';
  if (u.includes('facebook.com'))   return 'facebook';
  if (u.includes('apple.com/music') || u.includes('music.apple.com')) return 'apple';
  return 'link';
}

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
