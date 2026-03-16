# Error States — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is an error state so well-handled that the user does not realise an error occurred — or, when they do, the message treats them as an intelligent adult and tells them exactly what to do next.

---

## Moment 1: The Unconfigured Profile Page

**What it is:** When an artist shares their ABLE link before completing setup, or a fan stumbles on an early URL, the page does not show a broken layout, a JavaScript error, or a generic 404. It shows a single, calm sentence: "This page isn't set up yet." with a quiet path forward for the artist.

**Why it's 20/10:** A broken page when a fan arrives is a first impression that cannot be recovered. But a page that shows "This page isn't set up yet" with no panic, no explanation, and no ABLE branding does something harder: it communicates that the platform was designed with this scenario in mind. The copy is non-committal — it does not assume the visitor is a fan or an artist. It is honest about the state. It feels like a thoughtful human wrote it for this exact moment, not like an error handler that forgot to add a fallback string.

**Exact implementation:**

```javascript
// At the top of able-v7.html init sequence, before any rendering
function initPage() {
  migrateLegacyProfileKey(); // P0 — ensures able_profile → able_v3_profile

  const profile = safeGet('able_v3_profile', null);

  // Null check — no profile, or profile exists but has no name (incomplete setup)
  if (!profile || !profile.name) {
    document.getElementById('profileNotConfigured').hidden = false;
    document.getElementById('mainContent').hidden = true;
    return; // Hard stop — do not render anything else
  }

  // Profile is valid — continue with normal init
  renderProfile(profile);
}
```

```html
<!-- In able-v7.html body — hidden by default, shown only on null profile -->
<div id="profileNotConfigured" hidden class="profile-not-configured">
  <p class="pnc-headline">This page isn't set up yet.</p>
  <p class="pnc-body">
    If you're the artist, <a href="/start.html">set up your page here</a>.
  </p>
</div>
```

```css
.profile-not-configured {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 32px 24px;
  text-align: center;
}

.pnc-headline {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.pnc-body {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  margin: 0;
}

.pnc-body a {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: underline;
}
```

No ABLE logo. No error icon. No explanation of what localStorage is. Just the sentence, and a quiet link for whoever needs it.

---

## Moment 2: The Duplicate Sign-Up Reassurance

**What it is:** When a fan tries to sign up to an artist's list and they are already on it, the form does not show an error. It shows a green message: "You're already on the list." — and nothing else. No suggestions to check their email. No instructions to unsubscribe and re-subscribe. Just confirmation that they are close to this artist.

**Why it's 20/10:** Every other platform handles a duplicate sign-up as an error. It's not an error. A fan signing up twice means they wanted to make sure they were in. The correct emotional register is reassurance, not correction. The green colour (not amber, not red — green, the same as success) signals: you are good. The artist has you. The form settling into this state without drama, without redirecting the fan, without asking them to do anything — that is the experience of a platform that understands the human moment it's handling.

**Exact implementation:**

```javascript
// In fan sign-up handler — able-v7.html
function validateFanSignUp(email) {
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fans = safeGet('able_fans', []);

  if (!email || !email.trim()) {
    return { valid: false, message: "Drop your email here and I'll keep you close.", tone: 'default' };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { valid: false, message: "That doesn't look right — try a different email?", tone: 'error' };
  }

  const alreadySignedUp = fans.some(
    f => f.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (alreadySignedUp) {
    // This is not an error — render in green, no further action needed
    return { valid: false, message: "You're already on the list.", tone: 'success' };
  }

  return { valid: true };
}

// Render the inline message with tone-appropriate colour
function showSignUpMessage(result) {
  const msgEl = document.getElementById('signupMessage');
  msgEl.textContent = result.message;
  msgEl.className = `signup-message signup-message--${result.tone}`;
  msgEl.hidden = false;
}
```

```css
.signup-message { font-size: 12px; margin-top: 8px; text-align: center; }
.signup-message--default { color: var(--color-text-3); }
.signup-message--error   { color: var(--color-error, #e05242); }
.signup-message--success { color: #34c759; }
```

---

## Moment 3: The localStorage Corruption Recovery

**What it is:** When `safeGet('able_v3_profile', null)` returns `null` because the data is corrupted (not just absent), admin.html shows a specific nudge — not a blank dashboard, not a generic "something went wrong" — that says: "Your profile data may be incomplete. You can re-run setup or reach us directly." The nudge includes a link to start.html and a mailto link.

**Why it's 20/10:** localStorage corruption is rare but devastating when it happens. An artist who has spent 30 minutes building their profile, saved it, and reopened admin the next day to find it empty is close to churning. The recovery nudge does four things: (1) it acknowledges what happened without blame, (2) it offers a concrete path forward, (3) it offers a human path forward (reach us directly — not a help centre, a person), and (4) it does not delete anything. The data may still be recoverable if the artist sends the raw localStorage dump. ABLE should know this and say so. A message that says "we can try to recover it" at the moment of loss is the difference between churning and staying.

**Exact implementation:**

```javascript
// In admin.html init — called if safeGet returns null AND the key exists but is corrupt
function checkForCorruptProfile() {
  const raw = localStorage.getItem('able_v3_profile');
  if (!raw) return; // Key doesn't exist — not corruption, just new user

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    // Key exists but is not valid JSON — this is corruption
    showCorruptionNudge();
  }
}

function showCorruptionNudge() {
  const nudge = document.getElementById('corruptionNudge');
  if (nudge) nudge.hidden = false;
}
```

```html
<!-- admin.html — hidden by default, shown only on confirmed corruption -->
<div id="corruptionNudge" hidden class="state-error" style="margin: 16px; border-radius: 8px;">
  <p class="state-error__text">
    Your profile data may be incomplete — something went wrong loading it.
  </p>
  <p class="state-error__action">
    <a href="/start.html">Re-run setup</a> to rebuild your profile,
    or <a href="mailto:hello@ablemusic.co?subject=Profile data issue">reach us directly</a> —
    we may be able to recover it.
  </p>
</div>
```

The mailto subject pre-fills with "Profile data issue." The artist does not need to explain anything. They send the email. ABLE responds. That is what "we can try to recover it" looks like in practice.

---

## The 20/10 test

You know the error state system has crossed into extraordinary when an artist hits a problem, reads the message, knows exactly what to do, and does not lose trust in the platform — because the message treated them like a person, not a user session.
