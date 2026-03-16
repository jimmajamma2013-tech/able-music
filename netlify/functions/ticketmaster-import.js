/**
 * ABLE — Ticketmaster Import
 * Netlify serverless function: /.netlify/functions/ticketmaster-import
 *
 * Fetches upcoming shows for an artist from the Ticketmaster Discovery API.
 * Single platform-wide API key — no per-artist setup required.
 * Spec: docs/systems/integrations/SPEC.md §2.1
 *
 * POST { artistName: "Nova Reign" }
 * Returns: { artistName, shows: [...], source: 'ticketmaster', attribution }
 *
 * Environment variable: TICKETMASTER_API_KEY
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

  let artistName;
  try {
    const body = JSON.parse(event.body || '{}');
    artistName = (body.artistName || '').trim();
  } catch {
    return json(400, { error: 'Invalid request body', code: 'BAD_REQUEST' });
  }

  if (!artistName) {
    return json(400, { error: 'artistName is required', code: 'BAD_REQUEST' });
  }

  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) {
    return json(500, { error: 'API key not configured', code: 'CONFIG_ERROR' });
  }

  // Step 1: Resolve artist to Ticketmaster attractionId
  let searchData;
  try {
    const searchUrl = new URL('https://app.ticketmaster.com/discovery/v2/attractions.json');
    searchUrl.searchParams.set('keyword', artistName);
    searchUrl.searchParams.set('classificationName', 'music');
    searchUrl.searchParams.set('apikey', apiKey);

    const searchRes = await fetch(searchUrl.toString());
    if (!searchRes.ok) {
      return json(502, { error: 'Ticketmaster search failed', code: 'SEARCH_FAILED' });
    }
    searchData = await searchRes.json();
  } catch {
    return json(502, { error: 'Could not reach Ticketmaster', code: 'FETCH_FAILED' });
  }

  const attractions = searchData?._embedded?.attractions || [];
  if (attractions.length === 0) {
    return json(404, { error: 'Artist not found on Ticketmaster', code: 'NOT_FOUND' });
  }

  // Pick the best match — first result (Ticketmaster ranks by relevance)
  const attraction = attractions[0];
  const attractionId = attraction.id;

  // Step 2: Get upcoming events for this artist
  let eventsData;
  try {
    const eventsUrl = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
    eventsUrl.searchParams.set('attractionId', attractionId);
    eventsUrl.searchParams.set('countryCode', 'GB');
    eventsUrl.searchParams.set('sort', 'date,asc');
    eventsUrl.searchParams.set('size', '20');
    eventsUrl.searchParams.set('apikey', apiKey);

    const eventsRes = await fetch(eventsUrl.toString());
    if (!eventsRes.ok) {
      return json(502, { error: 'Ticketmaster events fetch failed', code: 'EVENTS_FAILED' });
    }
    eventsData = await eventsRes.json();
  } catch {
    return json(502, { error: 'Could not reach Ticketmaster', code: 'FETCH_FAILED' });
  }

  const events = eventsData?._embedded?.events || [];

  // Map to able_shows format
  const shows = events.map(ev => {
    const venue = ev._embedded?.venues?.[0];
    return {
      venue:     venue?.name || 'TBC',
      city:      venue?.city?.name || '',
      country:   venue?.country?.name || '',
      date:      ev.dates?.start?.localDate || '',
      doorsTime: ev.dates?.start?.localTime || '',
      ticketUrl: ev.url || '',
      featured:  false,
      source:    'ticketmaster',
    };
  });

  return json(200, {
    artistName: attraction.name,
    shows,
    source: 'ticketmaster',
    attribution: 'Shows via Ticketmaster',
  });
};

function json(status, body) {
  return { statusCode: status, headers: CORS_HEADERS, body: JSON.stringify(body) };
}
