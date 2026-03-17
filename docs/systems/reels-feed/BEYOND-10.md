# Reels Feed (Clips) — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is when a fan opens the clip before they've finished reading the notification — because the thumbnail made them curious before they knew what the clip was.

---

## Moment 1: The Thumbnail That Demands to Be Tapped

**What it is:** The clip card on the artist profile autoplays muted with a looping 2-second preview on hover/focus — and the fan taps to unmute not because they were asked to, but because the thumbnail was specific enough to make them want to hear what was happening.

**Why it's 20/10:** The difference between a clip section that converts and one that doesn't is whether the thumbnail communicates something honest and specific about the clip's content — not a promotional still, not a logo card, but a frame that looks like the clip itself. A 30-second studio session filmed on an iPhone in bad light with the artist talking over a rough mix is more compelling than a polished visual if the thumbnail captures the raw energy of the moment. The autoplay muted preview (2 seconds, looping) makes this visceral before the fan decides whether to commit to the full clip. Curiosity does the work.

**Exact implementation:**

Clip card in `able-v7.html` — hover/focus autoplay muted loop, triggered only when the clip is a YouTube Short or TikTok embed with a previewable thumbnail:

```js
// Clip card — hover preview pattern
card.addEventListener('mouseenter', () => {
  if (card.dataset.embedUrl && !card.classList.contains('playing')) {
    // Show a looping 2s GIF-style preview via YouTube's thumbnail API
    // or swap the static thumbnail for a short video element
    const preview = card.querySelector('.clip-preview-video')
    if (preview) {
      preview.play()
      preview.loop = true
    }
  }
})
card.addEventListener('mouseleave', () => {
  const preview = card.querySelector('.clip-preview-video')
  if (preview && !card.classList.contains('playing')) {
    preview.pause()
    preview.currentTime = 0
  }
})
```

For thumbnails where video preview is not available, the static thumbnail caption rule:

The clip caption (max 280 chars) is truncated to 60 chars on the card — enough to be intriguing, not enough to explain everything. Artists should be prompted, at caption write-time, with the copy hint: "Write what you'd say if a fan tapped you on the shoulder and asked what you're working on."

Tap-to-unmute UX — on tap, the card expands to full-screen player. The muted state is indicated by a small speaker icon (crossed) at the top right of the card, 24×24px. No text. No "Tap to unmute" instruction. The icon communicates it.

---

## Moment 2: The Full-Screen Player That Feels Native

**What it is:** The full-screen clip player opens with a spring-up animation, respects swipe-down to dismiss at any velocity, and closes without navigating away from the artist's page.

**Why it's 20/10:** A clip player that navigates to a new page breaks the artist's page flow. A clip player that requires a back button breaks mobile UX. A clip player with a close button that only responds to a precise tap fails on a moving device. The 20/10 version dismisses on swipe-down at any velocity above the threshold — it meets the fan where they are, on a phone, with one thumb, possibly on a bus. The spring-up open animation and the swipe-down dismiss together produce the feeling of a native app because they match the exact gestural model iOS and Android have trained users to expect.

**Exact implementation:**

Full-screen player modal — JS swipe handler:

```js
// Full-screen clip player — swipe-down dismiss
const DISMISS_THRESHOLD_PX  = 80   // px moved before dismiss triggers
const DISMISS_VELOCITY_PX_MS = 0.4 // px/ms — fast swipe triggers dismiss immediately

let touchStartY = 0
let touchStartTime = 0

player.addEventListener('touchstart', (e) => {
  touchStartY    = e.touches[0].clientY
  touchStartTime = Date.now()
}, { passive: true })

player.addEventListener('touchmove', (e) => {
  const deltaY = e.touches[0].clientY - touchStartY
  if (deltaY > 0) {
    player.style.transform = `translateY(${deltaY}px)`
    player.style.opacity   = String(1 - deltaY / 400)
  }
}, { passive: true })

player.addEventListener('touchend', (e) => {
  const deltaY   = e.changedTouches[0].clientY - touchStartY
  const velocity = deltaY / (Date.now() - touchStartTime)

  if (deltaY > DISMISS_THRESHOLD_PX || velocity > DISMISS_VELOCITY_PX_MS) {
    closePlayerWithAnimation()
  } else {
    // Snap back with spring
    player.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease'
    player.style.transform  = 'translateY(0)'
    player.style.opacity    = '1'
  }
})

function closePlayerWithAnimation() {
  player.style.transition = 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.22s ease'
  player.style.transform  = 'translateY(100%)'
  player.style.opacity    = '0'
  setTimeout(() => {
    player.classList.remove('open')
    player.style.cssText = ''
    // Pause the embed iframe
    const iframe = player.querySelector('iframe')
    if (iframe) iframe.src = iframe.src
  }, 280)
}
```

The spring constant (`0.34, 1.56, 0.64, 1`) is the same spring used across all ABLE interactions — the snap-back to position uses the same easing as every other spring in the product. The player does not feel different from the rest of the UI because it isn't.

---

## Moment 3: The CTA Already Visible When the Clip Ends

**What it is:** When a clip ends (or when the fan swipes down to dismiss), the full-screen player closes and the artist's primary CTA is immediately visible without any scrolling — because the clip opened from the correct scroll position and returns the fan to it on dismiss.

**Why it's 20/10:** A clip that ends and leaves the fan looking at a blank black modal is a conversion that didn't happen. A clip that ends and returns the fan to the exact point in the profile where the clip card was — with the hero CTA or fan sign-up visible in the viewport — removes one step from the fan-to-sign-up journey. The clip does not need to be the last thing the fan sees before they decide to sign up. It just needs to end somewhere that makes signing up the natural next action, not a navigation exercise.

**Exact implementation:**

Clip card placement in `able-v7.html` — the Clips section is positioned after the fan sign-up CTA section, not before it:

```
Page scroll order:
1. Hero card (artist name, artwork, campaign state)
2. Hero CTAs (primary + secondary)
3. Fan sign-up CTA (email input) ← THIS IS ABOVE CLIPS
4. Clips section
5. Music section
6. Events
```

This means that when the full-screen player opens and closes, the fan sign-up form is visible above the scroll position — a short scroll up after the player closes brings it into view.

On player close — scroll restore:

```js
let scrollBeforeOpen = 0

function openPlayer(clipEl) {
  scrollBeforeOpen = window.scrollY
  // ... open player
}

function closePlayerWithAnimation() {
  // ... close animation
  setTimeout(() => {
    window.scrollTo({ top: scrollBeforeOpen, behavior: 'instant' })
    // The fan is back where they were. The clip card is visible.
    // If the fan CTA is above this point, it's visible with a short upward scroll.
  }, 280) // after animation completes
}
```

After the player closes, the clip card itself shows a played state — a subtle indicator (reduced opacity, small play count, or a "Watched" text in the caption area at 60% opacity) that confirms the fan saw it. This is not required but signals that ABLE is paying attention to the fan's journey, not just the artist's content.

---

## The 20/10 test

A fan opens a clip from a notification, watches it to the end, dismisses with a swipe, finds the artist's sign-up form in their viewport without scrolling, and signs up. The clip was the reason. ABLE connected the dots.

---

*See also: `docs/systems/reels-feed/SPEC.md` — full clips system spec and data model*
*See also: `docs/systems/reels-feed/PATH-TO-10.md` — phase progression and build order*
