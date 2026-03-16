# Digital Media — Beyond 10
**Version: 1.0 | 2026-03-16**

> 20/10 is the press kit that opens and tells the story before a single word is read, the product demo video shot on a real artist's real page, and the screenshot that makes another developer ask how it was built.

---

## Moment 1: The Press Kit That Tells the Story in 8 Seconds

**What it is:** A single PDF (or linked web page) that a music journalist opens and immediately understands three things: what ABLE is, why it matters to independent artists right now, and what the specific story angle is — without reading more than two sentences.

**Why it's 20/10:** Most press kits are company brochures. They describe features and milestones. A 20/10 press kit is a story brief. The journalist opens it and feels the story already forming. The assets serve the story — they don't replace it. A journalist who receives ABLE's press kit should be able to pitch their editor the story idea in under 60 seconds.

**Exact implementation:**

Structure (single PDF, 4 pages, or equivalent web page at `able.fm/press`):

**Page 1 — The one-line story:**
```
"Independent artists lose their fans the moment they post a link.
ABLE is the first link-in-bio that keeps them."
```
Below that, one paragraph. No bullet points. No feature list:
```
ABLE gives independent musicians a profile page that knows where they are in their
release cycle — pre-release, live, or on tonight — and changes automatically.
When a fan taps the link and signs up, that contact belongs to the artist. Not
to a platform. Not to an algorithm. The artist owns it.
```

**Page 2 — The founder story (3 sentences):**
```
James Cuthbert is a musician who stopped being able to perform after a herniated disk
injury. He built ABLE because he needed it. It took 6 months and AI agents writing most
of the code to get it to the point where it's worth sharing.
```

**Page 3 — The numbers that matter (when they exist):**
- Artists on the platform (real number)
- Fan sign-ups captured across all pages (real number)
- "Made with ABLE" footer clicks that converted to new artist sign-ups (real number)
- One artist quote (real, un-embellished, their words exactly)

**Page 4 — Assets:**
- ABLE wordmark (SVG, white and dark versions)
- Two screenshots: the artist's public profile on mobile, the admin dashboard fan list
- Contact: james@able.fm · able.fm/press

**File naming:**
- `ABLE-press-kit-v[date].pdf`
- `ABLE-wordmark-white.svg`
- `ABLE-wordmark-dark.svg`
- `ABLE-screenshot-profile-mobile.png` (390px viewport, 844px height, Retina 2x)
- `ABLE-screenshot-admin-fans.png`

The Playwright commands to generate the two canonical screenshots:
```javascript
// Profile screenshot
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('https://able.fm/[artist-slug]');
await page.waitForTimeout(800); // let entrance animations settle
await page.screenshot({ path: 'press/ABLE-screenshot-profile-mobile.png', deviceScaleFactor: 2 });

// Admin fan list screenshot
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('https://able.fm/admin.html');
// navigate to fan list section
await page.screenshot({ path: 'press/ABLE-screenshot-admin-fans.png', deviceScaleFactor: 2 });
```

---

## Moment 2: The Product Demo That Uses a Real Artist's Real Page

**What it is:** A 90-second screen recording — no voiceover, no captions explaining features — that shows a real independent artist's ABLE page being viewed by a fan, then shows the artist opening their admin dashboard and seeing that fan in the list.

**Why it's 20/10:** Every other product demo shows a mockup. It shows a perfect-looking page with a fictional artist and a fictional fan list. ABLE's demo shows a real page — the artist's real bio, their actual release, their actual upcoming show. The demo shows the fan typing their email, hitting submit, and the artist's admin panel updating in real time. The 20/10 moment is when a viewer watching the demo realises they're watching something that is already real, not a simulation of what could be real.

**Exact implementation:**

Recording spec:
- Tool: Loom free tier (fits in 5-minute cap at 90-second target)
- Device: iPhone or Playwright emulating iPhone 15 Pro (390px viewport)
- No voiceover — music underneath if possible (royalty-free or James's own work)
- No cursor highlight or click indicators — the interaction should feel native, not screenshotted

Shot list (90 seconds total):
1. (0–10s) Bio link in Instagram. Tap. ABLE profile loads.
2. (10–25s) Scroll through the artist's page — artwork, release card, upcoming show, fan sign-up form.
3. (25–40s) Fan types email into sign-up form. Taps submit. Confirmation message appears.
4. (40–55s) Cut to: artist opens admin.html on phone. The fan list shows the new sign-up — email, timestamp, source "ig".
5. (55–70s) Artist changes campaign state to "gig mode". Page switches immediately — tickets front and centre, "on tonight" tag visible.
6. (70–90s) Hold on profile page in gig mode. Fade to ABLE wordmark. URL: able.fm

The sign-up in shots 1–4 must be a real sign-up. If using a real artist's page for the demo, coordinate with them. The fan email can be a test address (`demo@able.fm`) — the realness is in the artist's actual page and actual admin dashboard, not in the specific fan email.

---

## Moment 3: The Screenshot That Makes Another Developer Stop

**What it is:** A single screenshot — shared on Twitter/X or in a developer community — that shows ABLE's CSS token system in action: one variable change, entire page rebranded, captured side-by-side.

**Why it's 20/10:** Most developer shareables are code snippets or architecture diagrams. A side-by-side screenshot of a music artist's profile page in four completely different colour schemes — all generated from four one-line CSS variable changes — shows craft that is immediately legible to any front-end developer. It is shareable without explanation. The quality is visible, not described. This is the kind of screenshot that gets reshared by CSS accounts, developer community moderators, and music tech newsletters simultaneously.

**Exact implementation:**

Generate 4 screenshots at 390×844px, each with a different `--color-accent`:

```javascript
const accents = [
  { name: 'ember',   value: '#e05242' },
  { name: 'cobalt',  value: '#3b7ff5' },
  { name: 'sage',    value: '#4a8c6e' },
  { name: 'amber',   value: '#f4a942' },
];

for (const { name, value } of accents) {
  await page.evaluate((v) => {
    document.documentElement.style.setProperty('--color-accent', v);
    // also set RGB for glow variants
    const r = parseInt(v.slice(1,3),16), g = parseInt(v.slice(3,5),16), b = parseInt(v.slice(5,7),16);
    document.documentElement.style.setProperty('--color-accent-rgb', `${r},${g},${b}`);
  }, value);
  await page.waitForTimeout(100);
  await page.screenshot({ path: `screenshots/accent-${name}.png` });
}
```

Compose into a 2×2 grid in Figma or via an HTML composite template. Caption:
```
One CSS variable. Four complete profiles.
Each artist on ABLE sets their own accent. The whole page follows.
No template restrictions. No preset palettes.
```

This is the screenshot that demonstrates, without explanation, why ABLE's design system is different from a theme-switcher.

---

## The 20/10 Test

A music journalist opens the press kit and can pitch the story to their editor before they finish the first page. A developer watches the product demo and asks "how did they build that?" before the 90 seconds is up. A designer sees the token screenshot and shares it without adding any commentary — because the image speaks for itself.
