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
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

const OEMBED_ENDPOINTS = [
  { test: /youtube\.com|youtu\.be/,    base: 'https://www.youtube.com/oembed' },
  { test: /spotify\.com/,              base: 'https://open.spotify.com/oembed' },
  { test: /soundcloud\.com/,           base: 'https://soundcloud.com/oembed' },
  { test: /vimeo\.com/,                base: 'https://vimeo.com/api/oembed.json' },
];

exports.handler = async function (event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }
  if (event.httpMethod !== 'GET') {
    return json(405, { error: 'Method not allowed' });
  }

  const rawUrl = event.queryStringParameters?.url;
  if (!rawUrl) return json(400, { error: 'url param required' });

  let mediaUrl;
  try {
    mediaUrl = decodeURIComponent(rawUrl);
    if (!mediaUrl.startsWith('http')) mediaUrl = 'https://' + mediaUrl;
  } catch (_) {
    return json(400, { error: 'Invalid url' });
  }

  const endpoint = OEMBED_ENDPOINTS.find(e => e.test.test(mediaUrl));
  if (!endpoint) return json(404, { error: 'No oEmbed provider for this URL' });

  const oembedUrl = `${endpoint.base}?url=${encodeURIComponent(mediaUrl)}&format=json`;

  try {
    const res = await fetch(oembedUrl, {
      headers: { 'User-Agent': 'ABLE/1.0 (able.fm)' },
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
