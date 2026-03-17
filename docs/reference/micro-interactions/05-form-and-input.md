# 05 — Form & Input Interactions (61–70)

ABLE has two critical forms: the fan email capture on the public profile, and the wizard inputs in start.html. Both have different goals but the same rule: every moment of friction should feel like an invitation, not an obstacle.

---

## 61. Email Field Focus Glow — Accent Border on Focus
**Verdict: [BUILD] — the lowest-cost form improvement**

**What it is:** When the fan taps the email input in the fan capture section, the border transitions from a subtle neutral to the artist's accent colour. The glow expands slightly: a `box-shadow` in the accent colour at low opacity blooms around the field.

**Trigger → Rule → Feedback:**
- Trigger: `focus` event on the input
- Rule: `border-color: var(--color-accent)`, `box-shadow: 0 0 0 3px rgba(accent, 0.2)`
- Feedback: the field "wakes up" — communicating it's ready to receive input

**Implementation:**
```css
.fan-email-input {
  border: 1.5px solid var(--color-border);
  transition: border-color 150ms var(--ease-standard),
              box-shadow 150ms var(--ease-standard);
}
.fan-email-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.18);
  outline: none;
}
```

**ABLE thoughts:** The default browser blue focus ring is a trust-breaking moment on ABLE's dark navy profile page. It says "this is a generic web form." The accent-coloured glow says "this is ABLE's form, this is this artist's form." It costs 8 lines of CSS and has a tangible effect on form conversion — fans who see their interaction reflected in the artist's colour feel more connected to the action they're about to take. Paul Kinlan's research (DESIGN_RESEARCH_2026, #32): email forms with `autocomplete="email"` get 45% higher conversion. The focus glow pairs with that: the visual quality of the focus state reinforces that this is a well-made form worth completing.

---

## 62. Floating Label — Label Rises on Focus and Input
**Verdict: [CONSIDER] — elegant but may conflict with ABLE's minimal form design**

**What it is:** The email field's placeholder label ("Your email") starts positioned inside the field. On focus or when the user starts typing, it floats upward and shrinks, sitting above the field.

**Trigger → Rule → Feedback:**
- Trigger: `focus` on input, or `input.value.length > 0`
- Rule: label transitions `top: 50% → top: -8px`, `font-size: 1rem → 0.75rem`
- Feedback: the label makes room for the user's input while remaining visible

**Implementation:**
```css
.form-group { position: relative; }
.form-label {
  position: absolute;
  top: 50%; transform: translateY(-50%);
  left: 14px;
  font-size: 1rem;
  color: var(--color-text-secondary);
  transition: top 150ms var(--ease-standard),
              font-size 150ms var(--ease-standard),
              color 150ms var(--ease-standard);
  pointer-events: none;
}
.form-group:focus-within .form-label,
.form-group.has-value .form-label {
  top: -8px; transform: translateY(0);
  font-size: 0.75rem;
  color: var(--color-accent);
}
```

**ABLE thoughts:** Floating labels are a polarising pattern. They're elegant in isolation but can confuse users who lose track of what field they're filling in (the label is no longer in the field). For a single email field (which is what ABLE's fan capture is), the floating label is overkill — there's only one field, so label confusion doesn't apply. However, for the wizard (`start.html`) which has multiple fields per step, floating labels do help. Recommendation: use standard above-field labels for the fan capture (simpler, less JS), use floating labels in the wizard where multi-field layouts benefit from them.

---

## 63. Character Count Fade-In — Appears When Approaching Limit
**Verdict: [CONSIDER] — admin.html only**

**What it is:** In text fields with character limits (bio field in admin.html, snap card caption), a character count appears in the bottom-right corner of the field — but only once the user is within 40 characters of the limit. It fades in to avoid distracting early typers.

**Trigger → Rule → Feedback:**
- Trigger: `input.value.length > (maxLength - 40)`
- Rule: counter fades in from opacity 0; colour transitions from neutral → amber → red as limit approaches
- Feedback: the limit becomes visible only when relevant

**ABLE thoughts:** The progressive disclosure principle (DESIGN_RESEARCH_2026, #45): show information only when it's needed. A character count visible from the first keystroke creates unnecessary cognitive load. The count only matters when you're close to the limit. The colour progression (neutral → amber → red) uses ABLE's state colours intentionally: amber is the admin accent (`#f4b942`), red is urgency (`#e05242`). An artist approaching their bio character limit sees the familiar admin amber and knows "I'm getting close." This uses the colour system's semantics correctly.

---

## 64. Submit Button Loading State — Spinner to Checkmark
**Verdict: [BUILD] — the most important form feedback moment**

**What it is:** When the fan submits the email capture form, the button immediately transitions to a loading state: text fades out, a small spinner appears. On success (within ~500ms, even if mocked), the spinner transitions to a checkmark. The button stays in the success state for 2 seconds, then the surrounding form transitions to a success state.

**Trigger → Rule → Feedback:**
- Trigger: form `submit` event
- Rule: button → spinner (instant), then on success → checkmark (300ms), then success message
- Feedback: the fan knows immediately that something is happening, then that it succeeded

**Implementation:**
```css
.submit-btn { position: relative; overflow: hidden; }
.submit-btn .btn-text   { transition: opacity 150ms var(--ease-standard); }
.submit-btn .btn-spinner { position: absolute; opacity: 0; transition: opacity 150ms; }
.submit-btn .btn-check  { position: absolute; opacity: 0; transition: opacity 150ms; }
.submit-btn.loading .btn-text    { opacity: 0; }
.submit-btn.loading .btn-spinner { opacity: 1; }
.submit-btn.success .btn-spinner { opacity: 0; }
.submit-btn.success .btn-check   { opacity: 1; }
```

**ABLE thoughts:** The Doherty Threshold (DESIGN_RESEARCH_2026, #60): feedback must start within 100ms of the action. The spinner must appear on the same frame as the form submit — before any network request has resolved. The checkmark is the second moment: success confirmed. For the fan email capture, the "success" can be optimistic: assume success and show the checkmark immediately (if the API call fails, handle it gracefully with an error state). The fan's momentum is more important than waiting for a server confirmation. Peak-end rule (#57): the checkmark moment is the "peak" of the fan's engagement with this form.

---

## 65. Error Shake Animation — Validation Feedback
**Verdict: [BUILD] — the standard for form validation feedback**

**What it is:** If the fan submits the email field with an invalid email address, the input shakes horizontally — a brief, left-right oscillation that communicates "no, try again" in physical terms.

**Implementation:**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-8px); }
  40%       { transform: translateX(8px); }
  60%       { transform: translateX(-5px); }
  80%       { transform: translateX(5px); }
}
.input-error {
  animation: shake 400ms cubic-bezier(0.36, 0.07, 0.19, 0.97);
  border-color: var(--color-live-dot, #ef4444);
}
```

**ABLE thoughts:** The shake animation is the standard for inline form validation — it's been in use since the early iPhone era because it works. It doesn't require the fan to read an error message: the physical shake communicates "wrong" at an almost reflex level. The border turning red simultaneously gives the visual signal. The important addition: after the shake, show a brief error hint below the field ("Check that email address") in a small, dim text. The shake is the immediate physical feedback; the text is the recovery instruction. Both are needed. Suppress the error if the fan starts typing again — they don't need the red border while they're in the middle of correcting.

---

## 66. Success State Morph — Submit Button Becomes Confirmation
**Verdict: [BUILD] — the "you did a good thing" moment**

**What it is:** On successful fan sign-up, the submit button morphs: its width transitions from full-width to a circular checkmark badge, the background transitions from accent to a success green (or stays accent with a checkmark icon), and the fan's email is displayed back to them above the button.

**Trigger → Rule → Feedback:**
- Trigger: API success callback
- Rule: button width: `100% → 56px` (the height — making it square/circular), text fades out, icon fades in
- Feedback: the form "collapses" into a confirmation badge — the job is done, nothing more is needed

**ABLE thoughts:** The Peak-End Rule (DESIGN_RESEARCH_2026, #57): the fan sign-up confirmation is the peak moment of their visit. It must feel warm and personal. The morphing button communicates completion without requiring an entirely new UI state. Show their email back: "We've got you — we'll reach out to [email@example.com] when something happens." The Recognition vs. Recall principle (#47): seeing their email back confirms the action without the fan having to remember if they typed it correctly. Don't navigate to a confirmation page. Stay on the profile. The artist's page is where they just made a commitment — they should stay in that space.

---

## 67. Autocomplete Accent Highlight — Autofill Suggestion in Accent
**Verdict: [CONSIDER] — browser-controlled, limited customisation**

**What it is:** When the browser offers an autocomplete suggestion for the email field, the suggestion text appears in the artist's accent colour rather than the default grey.

**Implementation:**
```css
/* WebKit-specific autocomplete styling */
input:-webkit-autofill {
  -webkit-text-fill-color: var(--color-text) !important;
  box-shadow: 0 0 0 40px var(--color-card) inset !important; /* prevent yellow autofill bg */
}
/* Custom dropdown overlay for suggestion */
```

**ABLE thoughts:** Browser autocomplete styling is notoriously hard to override. The default iOS autofill turns the input background yellow, which destroys the dark theme. The `box-shadow: inset` trick is the standard fix — it covers the browser's background with the card colour. The accent-coloured suggestion text is a nice detail if achievable, but the baseline is simply: don't let the browser autofill break the dark theme. The `-webkit-autofill` fix is a must-build for the dark theme to hold on iOS Safari. The accent colouring of suggestions is optional polish.

---

## 68. Field Clear Button Reveal — X Appears When Content Present
**Verdict: [CONSIDER] — small but useful UX improvement**

**What it is:** After the fan types in the email field (and before they submit), a small `×` icon appears on the right side of the field. Tapping it clears the field with a brief "clear" animation — the text exits left as the X button pulses.

**Trigger → Rule → Feedback:**
- Trigger: `input.value.length > 0`
- Rule: X button fades in from `opacity: 0`; on click, input is cleared and X fades out
- Feedback: fan can quickly start over without having to triple-tap to select all

**ABLE thoughts:** The email capture form is single-field, so the clear button's value is limited but real. A fan who types their email incorrectly, catches the mistake, and wants to start fresh benefits from the clear button. Without it, they'd triple-tap the field, wait for the selection handles, and delete. With it, one tap resets. This is Smashing Magazine's "Law of Locality" principle (#23): the control is adjacent to the thing it affects. The X is inside the field, next to the thing it clears. The reveal-on-content behaviour means it's not cluttering the empty state.

---

## 69. Paste Detection — Flash Highlight on Paste
**Verdict: [BUILD] — small confirmation that paste worked**

**What it is:** When a fan pastes their email into the input (common on mobile, where they've copied from their password manager), the field briefly highlights — a gentle flash of the accent colour in the background — confirming the paste was received.

**Trigger → Rule → Feedback:**
- Trigger: `paste` event on the input
- Rule: flash the input background from transparent to `rgba(accent, 0.08)` and back over 400ms
- Feedback: the fan knows their paste was successful

**Implementation:**
```js
emailInput.addEventListener('paste', () => {
  emailInput.classList.add('paste-flash');
  emailInput.addEventListener('animationend', () => {
    emailInput.classList.remove('paste-flash');
  }, { once: true });
});
```
```css
@keyframes pasteFlash {
  0%   { background: transparent; }
  30%  { background: rgba(var(--color-accent-rgb), 0.1); }
  100% { background: transparent; }
}
.paste-flash { animation: pasteFlash 400ms var(--ease-standard); }
```

**ABLE thoughts:** On mobile, paste from password manager (1Password, Apple Keychain, Bitwarden) is the most common way fans fill email fields. The paste event fires, content appears, and the fan wants confirmation. The flash is 400ms — visible but not distracting. It doesn't compete with the focus glow (#61) because they don't happen simultaneously (focus precedes paste). This is one of those micro-interactions that converts nobody — but it signals "this form was made with care" to the 60% of fans who paste their email.

---

## 70. Wizard Step Progress — Spring Fill on Advance
**Verdict: [BUILD] — essential for completion rate in start.html**

**What it is:** The wizard progress indicator in start.html fills as the artist advances through steps. The fill uses the spring easing curve so it slightly overshoots the target fill width then settles — a satisfying, physical advancement.

**Trigger → Rule → Feedback:**
- Trigger: wizard advances to next step
- Rule: progress bar width transitions from current to new percentage with spring curve
- Feedback: the bar fills with momentum, communicating forward progress

**Implementation:**
```css
.progress-fill {
  height: 3px;
  background: var(--color-accent);
  transition: width 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**ABLE thoughts:** The Goal-Gradient Effect (DESIGN_RESEARCH_2026, #58): motivation increases as users approach a goal. A progress bar that visibly advances — and does so with satisfying physical momentum — creates the sense that the goal is getting closer. The spring overshoot makes the advance feel like the bar "wants" to reach 100%. The bar should be thin (3px) and positioned at the very top of the screen — it shouldn't compete with the wizard content, just sit there quietly indicating progress. Step 1 of 4 = 25% filled. The artist arrives at 100% and sees their page — the bar has done its job and should fade out (`opacity: 0`) at the final step.
