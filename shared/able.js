/* ═══════════════════════════════════════════════════════════════
   ABLE — Shared JS v2
   Data model, localStorage helpers, and utilities.
   Imported by every page.
═══════════════════════════════════════════════════════════════ */
'use strict';

/* ── Constants ──────────────────────────────────────────────── */
var ABLE_VERSION = '2.0';
var ABLE_KEY     = 'able_v2_profile';
var ABLE_EDIT_KEY = 'able_v2_edit';

/* ── Default profile data model ─────────────────────────────── */
var ABLE_DEFAULT = {

  artist: {
    name:            '',
    handle:          '',
    bio:             '',
    avatarUrl:       '',
    heroImageUrl:    '',
    location:        '',
    genres:          []
  },

  platforms: {
    primary:     'spotify',   /* spotify | apple | soundcloud */
    spotify:     '',
    apple:       '',
    soundcloud:  '',
    youtube:     '',
    bandcamp:    ''
  },

  social: {
    instagram:  '',
    tiktok:     '',
    twitter:    '',
    youtube:    '',
    facebook:   ''
  },

  appearance: {
    theme:       'warm',      /* warm | dark | minimal | bold | night | electric */
    accentColor: '#0891b2',
    heroStyle:   'color'      /* color | image */
  },

  /*
   * currentMode drives the entire profile.
   * One tap in the floating toolbar switches everything.
   */
  currentMode: 'live',       /* live | pre-release | gig | evergreen */

  modes: {
    live: {
      badgeText:  'New release out now',
      primary:    { label: 'Listen Now',       url: '', icon: 'play' },
      secondary:  { label: 'Get Tickets',      url: '', icon: 'ticket' }
    },
    'pre-release': {
      badgeText:  'Coming soon',
      primary:    { label: 'Pre-save now',     url: '', icon: 'save' },
      secondary:  { label: 'Notify me',        url: '#inner-circle', icon: 'bell' }
    },
    gig: {
      badgeText:  'On tour now',
      primary:    { label: 'Get Tickets',      url: '', icon: 'ticket' },
      secondary:  { label: 'Stream the album', url: '', icon: 'play' }
    },
    evergreen: {
      badgeText:  'Stream the music',
      primary:    { label: 'Stream now',       url: '', icon: 'play' },
      secondary:  null
    }
  },

  releases: [
    /*
     * {
     *   id:         string,
     *   title:      string,
     *   type:       'album' | 'ep' | 'single' | 'mixtape',
     *   year:       number,
     *   artworkUrl: string,
     *   featured:   boolean,          -- pinned to top of music section
     *   platforms: {
     *     spotify: string, apple: string, soundcloud: string, youtube: string
     *   },
     *   tracks: [{ title, duration, subtitle }],
     *   credits: [{ role, names: [{ name, count }] }]
     * }
     */
  ],

  events: [
    /*
     * {
     *   id:        string,
     *   date:      ISO string,
     *   venue:     string,
     *   city:      string,
     *   country:   string,
     *   ticketUrl: string,
     *   provider:  string,   -- dice | eventbrite | ra | ticketmaster | etc
     *   soldOut:   boolean
     * }
     */
  ],

  merch: {
    storeUrl:  '',
    provider:  '',            /* bandcamp | shopify | etsy | gumroad */
    products:  []
    /*
     * products: [{
     *   id:         string,
     *   name:       string,
     *   price:      string,   -- e.g. '£38'
     *   imageUrl:   string,
     *   productUrl: string,
     *   badge:      'new' | 'ltd' | '',
     *   preOrder:   boolean,
     *   preOrderDate: string
     * }]
     */
  },

  innerCircle: {
    enabled:      true,
    title:        'Get closer to the music',
    description:  'Early drops, behind-the-scenes content, and personal messages — direct from me, no algorithm.',
    perks:        ['Early access', 'Direct messages', 'First to know'],
    proofText:    '',
    /* TODO: replace with real email backend */
    formspreeId:  '',         /* Formspree form ID — artist adds in settings */
    signups:      []          /* localStorage stub — [{ email, timestamp }] */
  },

  calendar: {
    enabled:          true,
    googleCalendarId: ''      /* artist adds in settings */
  },

  credits: {
    enabled: true
    /* Credits pulled from releases[n].credits — no separate store */
  },

  support: {
    enabled:      false,
    title:        'Support the music',
    description:  'Every contribution goes directly to new music',
    tiers: [
      { id: 't1', name: 'Fan',          price: 3,  period: 'month', description: 'Exclusive updates & early access',                    featured: false },
      { id: 't2', name: 'Super Fan',    price: 8,  period: 'month', description: 'Merch discounts · BTS content · DMs',                featured: true  },
      { id: 't3', name: 'Ride or Die',  price: 20, period: 'month', description: 'Everything + signed merch + virtual hangout',         featured: false }
    ],
    tipsEnabled: true
  },

  about: {
    enabled: true,
    stats:   []              /* [{ label: 'Monthly listeners', value: '4.2M' }] */
  },

  settings: {
    onboardingComplete: false,
    editPin:            '',
    publishedAt:        null
  }

};

/* ── localStorage helpers ───────────────────────────────────── */

function ableSave(data) {
  try {
    localStorage.setItem(ABLE_KEY, JSON.stringify(data));
  } catch(e) {
    console.warn('[Able] Could not save to localStorage:', e);
  }
}

function ableLoad() {
  try {
    var raw = localStorage.getItem(ABLE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch(e) {
    return null;
  }
}

function ableInit() {
  var existing = ableLoad();
  if (existing) return existing;
  var fresh = JSON.parse(JSON.stringify(ABLE_DEFAULT));
  ableSave(fresh);
  return fresh;
}

function ableGet() {
  return ableLoad() || ableInit();
}

/*
 * ableSet('artist.name', 'Maya Rivers')
 * ableSet('appearance.theme', 'dark')
 * Saves to localStorage and returns updated profile.
 */
function ableSet(path, value) {
  var data = ableGet();
  var keys = path.split('.');
  var obj  = data;
  for (var i = 0; i < keys.length - 1; i++) {
    if (obj[keys[i]] === undefined) obj[keys[i]] = {};
    obj = obj[keys[i]];
  }
  obj[keys[keys.length - 1]] = value;
  ableSave(data);
  return data;
}

/* ── Edit mode ──────────────────────────────────────────────── */

function ableIsEditMode() {
  try {
    return localStorage.getItem(ABLE_EDIT_KEY) === 'true';
  } catch(e) { return false; }
}

function ableSetEditMode(val) {
  try {
    localStorage.setItem(ABLE_EDIT_KEY, val ? 'true' : 'false');
  } catch(e) {}
}

/* ── Theme + mode application ───────────────────────────────── */

function ableApplyTheme(profile) {
  var body = document.body;
  if (!body) return;
  body.dataset.theme = (profile.appearance && profile.appearance.theme) || 'warm';
  body.dataset.mode  = profile.currentMode || 'live';
  if (profile.appearance && profile.appearance.accentColor) {
    document.documentElement.style.setProperty('--accent', profile.appearance.accentColor);
    /* Derive accent-dark (slightly darker) */
    document.documentElement.style.setProperty('--accent-dark', profile.appearance.accentColor);
  }
}

/* ── Utility: toast notification ────────────────────────────── */

var _toastTimer;
function notify(msg, duration) {
  duration = duration || 2600;
  var el = document.getElementById('able-toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { el.classList.remove('show'); }, duration);
}

/* ── Utility: safe render ───────────────────────────────────── */
/*
 * Wrap every section render in safeRender().
 * One broken section never crashes the whole page.
 */
function safeRender(name, fn) {
  try {
    fn();
  } catch(e) {
    console.warn('[Able] Section "' + name + '" render error:', e);
  }
}

/* ── Utility: date formatting ───────────────────────────────── */

var MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var DAYS_SHORT   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function fmtDate(isoString) {
  var d = new Date(isoString);
  return {
    d:     d,
    mo:    MONTHS_SHORT[d.getMonth()],
    moLong:MONTHS_LONG[d.getMonth()],
    dy:    d.getDate(),
    yr:    d.getFullYear()
  };
}

function isUpcoming(isoString) {
  return new Date(isoString) >= new Date();
}

/* ── Utility: generate ID ───────────────────────────────────── */

function ableId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ── Utility: handle slug from name ────────────────────────── */

function nameToHandle(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 30);
}

/* ── Utility: detect ticket provider from URL ───────────────── */

function detectTicketProvider(url) {
  if (!url) return '';
  var u = url.toLowerCase();
  if (u.includes('dice.fm'))        return 'Dice';
  if (u.includes('eventbrite'))     return 'Eventbrite';
  if (u.includes('resident-advisor') || u.includes('ra.co')) return 'RA';
  if (u.includes('ticketmaster'))   return 'Ticketmaster';
  if (u.includes('seetickets'))     return 'See Tickets';
  if (u.includes('skiddle'))        return 'Skiddle';
  if (u.includes('songkick'))       return 'Songkick';
  if (u.includes('bandsintown'))    return 'Bandsintown';
  return 'Tickets';
}

/* ── Utility: detect merch provider from URL ────────────────── */

function detectMerchProvider(url) {
  if (!url) return '';
  var u = url.toLowerCase();
  if (u.includes('bandcamp'))  return 'Bandcamp';
  if (u.includes('shopify'))   return 'Shopify';
  if (u.includes('etsy'))      return 'Etsy';
  if (u.includes('gumroad'))   return 'Gumroad';
  if (u.includes('bigcartel')) return 'Big Cartel';
  return 'Store';
}

/* ── Appearance quiz → theme mapping ───────────────────────── */
/*
 * Called at end of onboarding quiz.
 * answers = { genre, feel, style, vibe }
 * Returns a theme name string.
 */
function quizToTheme(answers) {
  var genre = answers.genre || '';
  var feel  = answers.feel  || '';
  var vibe  = answers.vibe  || '';

  /* Explicit vibe overrides everything */
  if (vibe === 'dark')     return 'dark';
  if (vibe === 'minimal')  return 'minimal';
  if (vibe === 'bold')     return 'bold';
  if (vibe === 'night')    return 'night';
  if (vibe === 'electric') return 'electric';
  if (vibe === 'warm')     return 'warm';

  /* Genre + feel combos */
  if (genre === 'electronic' && feel === 'dark')      return 'electric';
  if (genre === 'electronic' && feel === 'energy')    return 'bold';
  if (genre === 'electronic')                         return 'night';
  if (genre === 'hiphop'     && feel === 'dark')      return 'night';
  if (genre === 'hiphop'     && feel === 'warm')      return 'bold';
  if (genre === 'hiphop')                             return 'dark';
  if (genre === 'pop'        && feel === 'energy')    return 'bold';
  if (genre === 'pop'        && feel === 'clean')     return 'minimal';
  if (genre === 'rnb'        && feel === 'dark')      return 'dark';
  if (genre === 'rnb')                                return 'warm';
  if (genre === 'indie'      && feel === 'experimental') return 'minimal';
  if (genre === 'indie')                              return 'warm';

  return 'warm'; /* safe fallback */
}

/* ── Scroll: fade-in observer ───────────────────────────────── */
/*
 * Call initFadeIn() on any page that uses .fade-in elements.
 */
function initFadeIn() {
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    io.observe(el);
  });
}

/* ── Scroll progress bar ────────────────────────────────────── */

function initScrollProgress() {
  var bar = document.getElementById('pgbar');
  if (!bar) return;
  window.addEventListener('scroll', function() {
    var doc = document.documentElement;
    var pct = (doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

/* ── Sticky header shadow ───────────────────────────────────── */

function initStickyHeader() {
  var hdr = document.getElementById('able-hdr');
  if (!hdr) return;
  window.addEventListener('scroll', function() {
    hdr.classList.toggle('stuck', document.documentElement.scrollTop > 10);
  }, { passive: true });
}

/* ── Google Calendar URL builder ────────────────────────────── */

function gcalURL(event, artistName) {
  var d   = new Date(event.date);
  var end = new Date(d.getTime() + 3 * 3600000);
  var fmt = function(dt) {
    var p = function(n) { return String(n).padStart(2,'0'); };
    return dt.getFullYear() + p(dt.getMonth()+1) + p(dt.getDate()) + 'T' + p(dt.getHours()) + p(dt.getMinutes()) + '00';
  };
  return 'https://www.google.com/calendar/render?action=TEMPLATE'
    + '&text='     + encodeURIComponent((artistName || 'Artist') + ' @ ' + event.venue)
    + '&dates='    + fmt(d) + '/' + fmt(end)
    + '&location=' + encodeURIComponent(event.city || '')
    + '&details='  + encodeURIComponent('Tickets: ' + (event.ticketUrl || ''));
}

/* ── ICS download (Apple / iCal) ────────────────────────────── */

function downloadICS(event, artistName) {
  var d   = new Date(event.date);
  var end = new Date(d.getTime() + 3 * 3600000);
  var fmt = function(dt) {
    var p = function(n) { return String(n).padStart(2,'0'); };
    return dt.getFullYear() + p(dt.getMonth()+1) + p(dt.getDate()) + 'T' + p(dt.getHours()) + p(dt.getMinutes()) + '00';
  };
  var ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Able//Artist Page//EN',
    'BEGIN:VEVENT',
    'DTSTART:'  + fmt(d),
    'DTEND:'    + fmt(end),
    'SUMMARY:'  + (artistName || 'Artist') + ' @ ' + event.venue,
    'LOCATION:' + (event.city || ''),
    'DESCRIPTION:Tickets: ' + (event.ticketUrl || ''),
    'UID:'      + event.id + '@able.to',
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  var blob = new Blob([ics], { type: 'text/calendar' });
  var url  = URL.createObjectURL(blob);
  var a    = document.createElement('a');
  a.href = url;
  a.download = 'show-' + event.id + '.ics';
  a.click();
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

/* ── SVG icons ──────────────────────────────────────────────── */
/*
 * Central icon library — keeps markup clean.
 * Usage: ableIcon('play')
 */
var ABLE_ICONS = {
  play:     '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  ticket:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/></svg>',
  save:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>',
  bell:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  mail:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  share:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  chart:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  eye:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  edit:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
  check:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>',
  x:        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
  heart:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  star:     '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  spotify:  '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'
};

function ableIcon(name) {
  return ABLE_ICONS[name] || '';
}

/* ── Able logo SVG ──────────────────────────────────────────── */

var ABLE_LOGO_SVG = '<svg width="11" height="14" viewBox="0 0 15 18" fill="none" aria-hidden="true"><rect x="0" y="10" width="3.5" height="8" rx="1.75" fill="currentColor" opacity=".55"/><rect x="5.75" y="5" width="3.5" height="13" rx="1.75" fill="currentColor" opacity=".75"/><rect x="11.5" y="0" width="3.5" height="18" rx="1.75" fill="currentColor"/></svg>';
