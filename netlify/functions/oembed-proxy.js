/**
 * ABLE — oEmbed Proxy
 * Netlify serverless function: /.netlify/functions/oembed-proxy
 *
 * Proxies oEmbed requests to bypass browser CORS restrictions.
 * Supports: Spotify, SoundCloud, Vimeo, YouTube
 *
 * GET ?url=<encoded-media-url>
 *
 * Returns: oEmbed JSON (title, thumbnail_url, author_name, etc.)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

const OEMBED_ENDPOINTS = [
  { hosts: new Set(['youtube.com','www.youtube.com','youtu.be','m.youtube.com']), base: 'https://www.youtube.com/oembed' },
  { hosts: new Set(['spotify.com','open.spotify.com']),                          base: 'https://open.spotify.com/oembed' },
  { hosts: new Set(['soundcloud.com','www.soundcloud.com','m.soundcloud.com']),  base: 'https://soundcloud.com/oembed' },
  { hosts: new Set(['vimeo.com','www.vimeo.com','player.vimeo.com']),            base: 'https://vimeo.com/api/oembed.json' },
  { hosts: new Set(['mixcloud.com','www.mixcloud.com']),                         base: 'https://www.mixcloud.com/oembed/' },
];

function isSafeMediaUrl(urlString) {
  try {
    const { hostname, protocol } = new URL(urlString);
    if (protocol !== 'https:') return false;
    return OEMBED_ENDPOINTS.some(e => e.hosts.has(hostname));
  } catch {
    return false;
  }
}

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  // Support both GET (?url=...) and POST ({ url: '...' })
  let rawUrl;
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      rawUrl = body.url;
    } catch (_) {
      return json(400, { error: 'Invalid JSON body' });
    }
  } else {
    rawUrl = event.queryStringParameters?.url;
  }
  if (!rawUrl) return json(400, { error: 'url param required' });

  let mediaUrl;
  try {
    mediaUrl = decodeURIComponent(rawUrl);
    if (!mediaUrl.startsWith('http')) mediaUrl = 'https://' + mediaUrl;
  } catch (_) {
    return json(400, { error: 'Invalid url' });
  }

  if (!isSafeMediaUrl(mediaUrl)) return json(400, { error: 'URL not from an allowed provider' });

  const { hostname } = new URL(mediaUrl);
  const endpoint = OEMBED_ENDPOINTS.find(e => e.hosts.has(hostname));
  if (!endpoint) return json(404, { error: 'No oEmbed provider for this URL' });

  const oembedUrl = `${endpoint.base}?url=${encodeURIComponent(mediaUrl)}&format=json`;

  try {
    const res = await fetch(oembedUrl, {
      headers: { 'User-Agent': 'ABLE/1.0 (ablemusic.co)' },
    });
    if (!res.ok) return json(res.status, { error: `Provider returned ${res.status}` });
    const data = await res.json();
    return json(200, data);
  } catch (e) {
    console.error('oembed-proxy error:', e.message);
    return json(502, { error: 'Could not fetch oEmbed data' });
  }
};

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
