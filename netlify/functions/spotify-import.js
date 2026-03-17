/**
 * ABLE — Spotify Import Function
 * Netlify serverless function: /.netlify/functions/spotify-import
 *
 * Accepts: ?url=https://open.spotify.com/artist/{id}
 * Returns: JSON profile data assembled from Spotify + Last.fm + Ticketmaster
 *
 * Env vars required:
 *   SPOTIFY_CLIENT_ID
 *   SPOTIFY_CLIENT_SECRET
 *   LASTFM_API_KEY
 *   TICKETMASTER_API_KEY (optional — shows enrichment)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async function (event) {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS_HEADERS, body: '' };
  }

  const url = (event.queryStringParameters || {}).url || '';
  if (!url) {
    return json(400, { error: 'url param required' });
  }

  // ── 1. Extract Spotify artist ID ──────────────────────────────────────
  const artistId = extractSpotifyArtistId(url);
  if (!artistId) {
    return json(400, { error: 'Could not find a Spotify artist URL. Try opening your Spotify profile in a browser and copying the URL from the address bar.' });
  }

  // ── 2. Spotify access token (Client Credentials) ─────────────────────
  let spotifyToken;
  try {
    spotifyToken = await getSpotifyToken();
  } catch (e) {
    return json(500, { error: 'Could not connect to Spotify right now. Try again in a moment.' });
  }

  // ── 3. Fetch Spotify artist data ──────────────────────────────────────
  let artist, topTracks, albums;
  try {
    [artist, topTracks, albums] = await Promise.all([
      spotifyFetch(`/v1/artists/${artistId}`, spotifyToken),
      spotifyFetch(`/v1/artists/${artistId}/top-tracks?market=GB`, spotifyToken),
      spotifyFetch(`/v1/artists/${artistId}/albums?include_groups=album,single&market=GB&limit=6`, spotifyToken),
    ]);
  } catch (e) {
    return json(500, { error: 'Could not load artist data from Spotify. Check the URL and try again.' });
  }

  if (!artist || !artist.name) {
    return json(404, { error: 'Artist not found on Spotify.' });
  }

  // ── 4. Last.fm enrichment (bio + listener count) ──────────────────────
  let lastfmData = null;
  if (process.env.LASTFM_API_KEY) {
    try {
      lastfmData = await lastfmFetch(artist.name);
    } catch (_) {
      // Last.fm failure is non-fatal — continue without it
    }
  }

  // ── 5. Ticketmaster shows (non-fatal) ─────────────────────────────────
  let shows = [];
  if (process.env.TICKETMASTER_API_KEY) {
    try {
      shows = await ticketmasterFetch(artist.name);
    } catch (_) {
      // Non-fatal
    }
  }

  // ── 6. Assemble profile data ──────────────────────────────────────────
  const primaryImage = pickBestImage(artist.images);
  const genres = (artist.genres || []).slice(0, 3);

  // Map Spotify genres → ABLE vibes
  const vibe = mapGenreToVibe(genres);

  // Top track for CTA pre-fill
  const topTrack = (topTracks.tracks || [])[0];

  // Releases for admin
  const releases = (albums.items || []).slice(0, 4).map(a => ({
    title:       a.name,
    type:        a.album_type,
    releaseDate: a.release_date,
    artwork:     pickBestImage(a.images),
    spotifyUrl:  (a.external_urls || {}).spotify || '',
    artistId:    artistId,
  }));

  // Bio from Last.fm (strip HTML tags, trim to 280 chars)
  const bio = lastfmData
    ? stripHtml((lastfmData.artist && lastfmData.artist.bio && lastfmData.artist.bio.summary) || '').slice(0, 280)
    : '';

  const listeners = lastfmData
    ? parseInt((lastfmData.artist && lastfmData.artist.stats && lastfmData.artist.stats.listeners) || '0', 10)
    : null;

  const result = {
    // Core identity
    name:       artist.name,
    spotifyId:  artistId,
    spotifyUrl: (artist.external_urls || {}).spotify || '',
    photo:      primaryImage,
    genres,
    vibe,

    // Bio
    bio,
    listeners,

    // CTA suggestion
    ctaPrimary: topTrack
      ? { label: 'Stream Now', url: (topTrack.external_urls || {}).spotify || '' }
      : null,

    // Releases
    releases,

    // Shows
    shows,

    // Platforms pre-fill
    platforms: [
      { id: 'spotify', url: (artist.external_urls || {}).spotify || '', label: 'Spotify' },
    ],
  };

  return json(200, result);
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}

function extractSpotifyArtistId(url) {
  // Handles: https://open.spotify.com/artist/4Z8W4fKeB5YxbusRsdQVPb
  // Also handles: spotify:artist:4Z8W4fKeB5YxbusRsdQVPb
  const webMatch = url.match(/open\.spotify\.com\/artist\/([A-Za-z0-9]+)/);
  if (webMatch) return webMatch[1];
  const uriMatch = url.match(/spotify:artist:([A-Za-z0-9]+)/);
  if (uriMatch) return uriMatch[1];
  return null;
}

async function getSpotifyToken() {
  const clientId     = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }
  const encoded = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encoded}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error(`Spotify token error: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

async function spotifyFetch(path, token) {
  const res = await fetch(`https://api.spotify.com${path}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Spotify API error: ${res.status} ${path}`);
  return res.json();
}

async function lastfmFetch(artistName) {
  const key = process.env.LASTFM_API_KEY;
  const encoded = encodeURIComponent(artistName);
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encoded}&api_key=${key}&format=json&autocorrect=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Last.fm error: ${res.status}`);
  return res.json();
}

async function ticketmasterFetch(artistName) {
  const key     = process.env.TICKETMASTER_API_KEY;
  const encoded = encodeURIComponent(artistName);
  const url     = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encoded}&countryCode=GB&classificationName=music&size=6&apikey=${key}`;
  const res     = await fetch(url);
  if (!res.ok) throw new Error(`Ticketmaster error: ${res.status}`);
  const data    = await res.json();
  const events  = ((data._embedded || {}).events || []);
  return events.map(ev => {
    const venue  = ((ev._embedded || {}).venues || [])[0] || {};
    const date   = (ev.dates && ev.dates.start) || {};
    return {
      id:        ev.id,
      title:     ev.name,
      venue:     venue.name || '',
      city:      (venue.city || {}).name || '',
      date:      date.localDate || '',
      time:      date.localTime || '',
      ticketUrl: (ev.url || ''),
      source:    'ticketmaster',
    };
  });
}

function pickBestImage(images) {
  if (!images || !images.length) return '';
  // Sort by width descending, pick one around 300–640px for thumbnails
  const sorted = [...images].sort((a, b) => (b.width || 0) - (a.width || 0));
  const preferred = sorted.find(i => i.width >= 300 && i.width <= 640);
  return (preferred || sorted[0]).url;
}

const VIBE_MAP = {
  electronic:   ['electronic', 'dance', 'edm', 'house', 'techno', 'drum and bass', 'dubstep', 'ambient'],
  hiphop:       ['hip hop', 'rap', 'trap', 'grime', 'uk hip hop', 'drill'],
  rnb:          ['r&b', 'soul', 'neo soul', 'contemporary r&b', 'funk'],
  indie:        ['indie', 'alternative', 'indie rock', 'indie pop', 'shoegaze', 'post-punk'],
  pop:          ['pop', 'synth-pop', 'electropop', 'dream pop'],
  rock:         ['rock', 'punk', 'metal', 'hard rock', 'grunge', 'classic rock'],
  acoustic:     ['folk', 'acoustic', 'singer-songwriter', 'country', 'bluegrass', 'roots'],
};

function mapGenreToVibe(genres) {
  if (!genres || !genres.length) return '';
  const lower = genres.map(g => g.toLowerCase());
  for (const [vibe, keywords] of Object.entries(VIBE_MAP)) {
    if (lower.some(g => keywords.some(k => g.includes(k)))) {
      return vibe;
    }
  }
  return '';
}

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
