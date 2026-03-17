# ABLE — JavaScript Rules
**Vanilla JS, no bundler, single-HTML-file architecture. These rules are non-negotiable.**

---

## Declarations

**Use `const` by default. Use `let` only when the value will be reassigned. Never use `var`.**

```javascript
// correct
const profile = safeLS('able_v3_profile', {});
let countdown = 14;

// wrong
var artist = 'Maya'; // no var — scoping surprises, no block scope
```

---

## Modern JS — always use

- Arrow functions: `const doThing = (x) => x * 2`
- Template literals: `` `Hello, ${name}` `` — never string concatenation
- Destructuring: `const { name, bio, accent } = profile`
- Optional chaining: `profile?.release?.date` — never `profile && profile.release && ...`
- Nullish coalescing: `profile?.accent ?? '#e05242'`
- Spread: `const updated = { ...profile, accent: newHex }`
- Array methods: `map`, `filter`, `find`, `some`, `every` over `for` loops where readable

---

## No import/export

ABLE has no bundler. All JS is inline `<script>` blocks or loaded via CDN `<script src="...">`.

```javascript
// wrong — no module bundler
import { renderPills } from './shared/pills.js';
export function renderProfile() { ... }

// correct — everything is global within the file's <script> block
function renderProfile() { ... }
```

CDN libraries (Supabase, PostHog) are loaded via `<script src>` before the main `<script>` block.

---

## Initialisation

**Always wrap DOM-touching initialisation in `DOMContentLoaded`.**

```javascript
// correct
document.addEventListener('DOMContentLoaded', () => {
  const profile = getProfile();
  renderProfile(profile);
});

// wrong — DOM not ready when script runs inline
const el = document.getElementById('hero-name'); // may be null
```

---

## localStorage — always use safeLS / setLS wrappers

Every file defines `safeLS(key, fallback)` and `setLS(key, val)`. Use them everywhere.

```javascript
// correct
const profile = safeLS('able_v3_profile', {});
setLS('able_v3_profile', { ...profile, accent: newHex });

// wrong — naked localStorage calls
const profile = JSON.parse(localStorage.getItem('able_v3_profile')); // throws if null or corrupt
localStorage.setItem('able_tier', tier); // no error handling
```

The standard implementations:
```javascript
function safeLS(key, fallback = null) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

function setLS(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); }
  catch (e) { console.warn('localStorage write failed:', key, e); }
}
```

---

## Event listeners — name your handlers

```javascript
// correct — debuggable in DevTools, removable
function handleFanSubmit(e) {
  e.preventDefault();
  submitFanEmail();
}
document.getElementById('fan-form').addEventListener('submit', handleFanSubmit);

// acceptable for simple one-liners
btn.addEventListener('click', () => openSheet());

// wrong for complex handlers
document.getElementById('fan-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // 30 lines of logic...
});
```

---

## Async — async/await, never raw Promises

```javascript
// correct
async function loadSpotifyData(url) {
  try {
    const res = await fetch(`/.netlify/functions/spotify-import?url=${encodeURIComponent(url)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error('Spotify import failed:', e.message);
    showToast('Import failed. Try again.', 'red');
    return null;
  }
}

// wrong — unhandled rejection
fetch('/api/data').then(r => r.json()).then(data => render(data));
// (no .catch — if this throws, nothing happens visibly)
```

---

## Error handling — never swallow silently

```javascript
// correct — log + surface to user
catch (e) {
  console.error('saveProfile failed:', e);
  showToast('Could not save. Try again.', 'red');
}

// wrong — silent swallow
catch (e) {
  // nothing
}

// wrong — overly broad
catch (e) {
  console.log('error'); // no context, not useful
}
```

---

## DOM updates — security

```javascript
// correct — safe for user-supplied text
el.textContent = profile.name;

// correct — safe for ABLE-controlled HTML strings only
el.innerHTML = renderReleaseCard(release); // only if release data is from localStorage, not raw user input

// wrong — XSS risk if content from URL params or user input
el.innerHTML = urlParam; // never this

// always escape user input before innerHTML
function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
```

---

## Animations — CSS first, JS for spring/complex only

```javascript
// prefer CSS transitions
// el.style.opacity = 1; // ok if toggling a class is insufficient

// correct JS animation — use requestAnimationFrame
function animateCounter(el, target, duration) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// wrong — setInterval for visual updates
setInterval(() => { el.textContent = Math.round(...); }, 16);
```

---

## Performance

**Debounce scroll and resize handlers.** ABLE has scroll-triggered animations in able-v7.html.

```javascript
function debounce(fn, delay) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
}
window.addEventListener('resize', debounce(onResize, 150));
```

**Never create DOM nodes in a tight loop.** Build HTML strings and set `innerHTML` once:
```javascript
// correct — one innerHTML write
const html = items.map(item => `<div class="row">${escHtml(item.name)}</div>`).join('');
container.innerHTML = html;

// wrong — DOM thrashing
items.forEach(item => {
  const div = document.createElement('div');
  div.textContent = item.name;
  container.appendChild(div); // layout recalculated each time
});
```

---

## Parse-check after every edit

After editing any `<script>` block, run:

```bash
node -e "
const fs=require('fs');
const html=fs.readFileSync('able-v7.html','utf8');
const blocks=html.match(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi)||[];
let ok=0,fail=0;
blocks.forEach((b,i)=>{
  const src=b.replace(/<\/?script[^>]*>/gi,'');
  try{new Function(src);ok++;}catch(e){console.error('Block',i+1,':',e.message);fail++;}
});
console.log(ok,'ok,',fail,'failed');
"
```

Zero failures = safe to commit.

---

## Never

- `eval()` — ever
- `document.write()` — ever
- `innerHTML` with URL parameters or raw user input
- Global variable pollution — wrap in IIFE or use `const`/`let` at module scope
- `setTimeout(fn, 0)` as a hack to fix timing — find the root cause
- `!important` in JS-applied styles — use CSS specificity correctly
