> **REFERENCE** — This file informs product, design, and build thinking but does not override the v6 authority chain. See `docs/v6/00_AUTHORITY_ORDER.md` for precedence rules.

---

# ABLE Design Research — World's Best Designers, UI Experts & UX Experts
**Compiled: March 2026 | Purpose: Extract best practices for ABLE's artist profile, admin dashboard, and onboarding**

This document synthesises research from 30+ primary sources — designer portfolios, Nielsen Norman Group studies, Laws of UX, Refactoring UI, Smashing Magazine, Codrops, and direct site research. Each entry is filtered for direct applicability to ABLE's core design challenges: a premium dark-mode mobile artist profile, fan capture mechanics, campaign state transitions, and a 4-theme design system.

---

## Section 1 — Top Designers: Key Insights for ABLE

### 1. Dieter Rams
**Core principle:** "Less but better" — remove anything that does not serve a clear function. Complexity is a failure of design, not a sign of effort.
**ABLE application:** Every element on the artist profile must earn its place. The hero card, CTA zone, platform pills, and music section are all justified. The moment decorative chrome competes with the artist's artwork or name, it has failed. When reviewing new features, ask: does this serve the artist's goal (capture fans, communicate current state) or the fan's goal (understand who this person is and what they want me to do)?

### 2. Jony Ive (Apple 1997–2019)
**Core principle:** Materials communicate values. Surfaces, weight, and finish convey quality before a user reads a single word. On digital products this translates to: spacing, type weight, and depth (shadow/blur) are your materials.
**ABLE application:** The Glass theme's `backdrop-filter: blur(28px) saturate(180%)` is the closest ABLE gets to material quality. It must feel premium, not gimmicky. Ive's lesson: the blur layer should feel like frosted aluminium, not a CSS trick. Ensure the blur radius and saturation are tuned so content behind is legible at all opacity levels. Never let the glass effect obscure the artist's artwork — the art is the product.

### 3. Stefan Sagmeister
**Core principle:** Design with feeling. Typography, layout, and colour are not neutral — they express emotional states. The most memorable design work is autobiographical and personal.
**ABLE application:** Each artist's accent colour `--color-accent` should feel like it belongs to *that artist*, not to ABLE. The accent must permeate enough of the UI (CTAs, active tabs, pill backgrounds, section dividers) that the page reads as the artist's identity, not a template. Sagmeister would say: if 20 artist profiles look interchangeable at a glance, the system has failed.

### 4. Paula Scher (Pentagram)
**Core principle:** Typography is image. Large, confident typographic choices communicate before content is read. She uses scale and weight as emotional instruments, not just hierarchy signals.
**ABLE application:** The artist name rendered in `'Barlow Condensed'` in the hero is the single most impactful typographic decision on the page. Make it enormous. It should be the first thing a fan sees when the page loads. Resist the temptation to shrink it for layout convenience — the name IS the design. On mobile at 375px, the artist name should span nearly the full width.

### 5. Massimo Vignelli
**Core principle:** "The life of a designer is a life of fight. Fight against the ugliness." He believed in a reduced palette of typefaces (he used primarily Helvetica and Bodoni), believing discipline in typography produces clarity across all media.
**ABLE application:** ABLE uses two typefaces: DM Sans (body) and Barlow Condensed (display). This is correct — never add a third. Within DM Sans, hierarchy is achieved through weight (400/500/600/700) and size alone. Mixing a third font for section headers or labels is a regression. Every typographic variation must be a token, not a one-off.

### 6. Jessica Walsh (Sagmeister & Walsh / &Walsh)
**Core principle:** Bold, emotionally direct work speaks to people, not at them. She embraces colour, physicality, and surprise as tools for genuine connection.
**ABLE application:** ABLE's coral accent `#e05242` is bold. Do not soften it. Walsh would argue that timid design communicates timidity. The fan-capture CTA ("Stay close.") and the hero CTA should be unapologetically prominent. An artist who works hard deserves a page that fights for their attention with the same energy they put into their music.

### 7. Milton Glaser
**Core principle:** "To design is to communicate clearly by whatever means you can control or master." Great design reduces complexity to its essential symbol — the I ❤ NY being the canonical example.
**ABLE application:** The gig mode indicator ("on tonight") is ABLE's closest equivalent to a symbol that needs to communicate instantly. It should be unmissable — a coloured tag, a pulsing dot, or an accent-coloured chip. A fan who lands at 7pm and sees an artist is playing tonight should understand that within 2 seconds, without reading anything.

### 8. Pentagram (collective)
**Core principle:** Work is signed by partners, not a corporate identity. Each partner brings a distinct voice. The collective creates space for difference within a shared standard of quality.
**ABLE application:** The tier system (Free / Artist / Artist Pro / Label) is analogous. Each tier's artist page must be recognisably ABLE — same dark navy, same tab bar, same token system — but the *density* and *richness* of the features should communicate the tier. Pro pages feel more complete, not just "more buttons".

### 9. Frank Chimero
**Core principle:** "The web's grain" — design should follow the natural properties of its medium, not fight them. Scrolling is natural on mobile; tapping is natural; transitions between states should feel native.
**ABLE application:** The artist profile's tab navigation is correct — it uses the natural scroll-then-stick pattern mobile users expect. Resist adding any interaction that fights the native scroll: no horizontal scroll traps, no momentum blocking, no overflow hidden that clips content unexpectedly. Let the medium breathe.

### 10. Jason Santa Maria
**Core principle:** Typography carries meaning at every level of detail. Baseline grids, kerning, and hierarchy are not finishing touches — they are the primary communication layer.
**ABLE application:** The DM Sans body font should be set at exactly 15–16px on mobile (never below 14px), with `line-height: 1.5` for body copy. Section labels (Music, Events, Merch) should be in all-caps DM Sans 11–12px with tracked letter-spacing (`letter-spacing: 0.08em`) to differentiate them from body copy. These micro-decisions compound into a product that feels considered.

### 11. Tobias Ahlin
**Core principle:** Animations should feel *physically grounded* — different properties (x, y, scale, opacity) should animate with different timing functions to produce curved, natural paths rather than robotic linear motion.
**ABLE application:** ABLE's spring easing `cubic-bezier(0.34,1.56,0.64,1)` is correct for bouncy entrance animations (panels sliding up, CTAs appearing). However, do not apply the same spring easing to *everything* — content that slides in from below should use a deceleration curve `(0.25,0.46,0.45,0.94)`, while CTAs that "pop" benefit from the spring. Layering easing types makes the UI feel alive rather than mechanical.

### 12. John Allsopp ("A Dao of Web Design")
**Core principle:** The web is inherently flexible; designing as if it were a fixed canvas produces brittle, exclusionary products. Embrace the grain of the medium.
**ABLE application:** ABLE is built for 375px minimum but fans will arrive on phones from 320px to 430px. The design must not break at 320px or at 600px (small tablets). Use fluid spacing (`clamp()`, percentage widths, `max-width` containers) rather than pixel-perfect breakpoints. Every text size and spacing unit should be proportional, not arbitrary.

### 13. Codrops / Creative UI Community
**Core principle:** The most memorable digital experiences use scroll-triggered animation, 3D transforms, and layered motion to create depth and immersion — but only when those effects serve the content narrative.
**ABLE application:** Scroll-based entrance animations on the music section cards (staggered fade-up) and album artwork (scale from 0.95 to 1.0 on entry) would elevate the premium feel without harming performance. A blurry text reveal on the artist bio could work well. Avoid 3D carousel effects — album art is sacred and should be presented flat, with square proportions.

### 14. Google Material Design Team
**Core principle:** "Flat 2.0" — visual simplicity does not require sacrificing affordance signals. Subtle elevation (shadows, surface layers) communicates hierarchy and interactivity without skeuomorphism.
**ABLE application:** The card-based layout (`--color-card: #12152a`) already does this correctly. Ensure every interactive card has a subtle `box-shadow` or `border` that distinguishes it from non-interactive surfaces. On the Glass theme, use `backdrop-filter` only on floating panels — static sections should use `--color-card` with no blur to avoid performance cost.

### 15. Vercel Design Team
**Core principle:** "We design systems and systemize designs." Their Geist design system shows that a globally distributed 31-person team produces consistency through tokens and documentation, not meetings.
**ABLE application:** ABLE's token system (`--color-bg`, `--color-card`, `--color-accent`, `--font`, `--font-display`) is the right foundation. Document what each token is for and what it is NOT for — e.g. `--color-accent` is for primary actions and artist identity, not for decorative borders or background fills. Token discipline is what allows 4 themes to work.

### 16. Linear Design Team
**Core principle:** Quality software emerges from process discipline and cross-functional transparency, not aesthetic decisions alone. Each design decision must be tied to a user outcome.
**ABLE application:** The campaign state system (profile / pre-release / live / gig) is a perfect example of design-as-logic. The visual change between states is not decoration — it communicates a different artist intent. Ensure the state transition is perceptible within 200ms of the page loading (immediate system status visibility), with no layout shift.

### 17. Airbnb Design Team (pre-2024)
**Core principle:** Trust is built through photography, specificity, and human faces — not abstract value propositions. Their breakthrough was replacing generic stock imagery with real photos from real hosts.
**ABLE application:** Artist photos and artwork are the trust anchors on ABLE. Avoid placeholder silhouettes or empty states on profile load — skeleton screens should approximate the *shape* of an artist photo (square or 4:3 card), not a grey rectangle. When no photo exists, use the artist's accent colour as the placeholder background with their initials in Barlow Condensed.

### 18. Stripe Design Team
**Core principle:** Developer and business products can be as beautiful as consumer apps. Precision, documentation quality, and visual order communicate competence.
**ABLE application:** The admin dashboard (`admin.html`) should feel this way. Artists are running a micro-business from their dashboard. The amber accent `#f4b942` on dark `#09090f` is the right signal: warm, professional, human. Charts and stats should be precise — exact numbers, not approximations. "127 fans" not "100+ fans".

### 19. Spotify Design Team
**Core principle:** Artwork is the primary visual element. Album artwork creates an emotional anchor for every music interaction. UI chrome should recede behind the art.
**ABLE application:** On the Music section, the track art / release artwork should be the dominant visual — full-bleed or near-full-bleed depending on context. The play button, title, and metadata should overlay or sit adjacent, but the artwork pixel area should be at least 3x larger than any text element. This is non-negotiable for a music product.

### 20. Dan Mall
**Core principle:** Design systems are only valuable if people adopt them. Adoption comes from ease-of-navigation and clear examples, not theoretical completeness.
**ABLE application:** ABLE's CSS token system should be commented with usage examples directly in the file. Every `--color-*` variable should have a comment explaining where it is used and what it communicates. This is not documentation overhead — it is what makes the system maintainable when returning to the file after 3 months.

---

## Section 2 — Top UI Experts: Key Insights for ABLE

### 21. Adam Wathan & Steve Schoger (Refactoring UI)
**Core principle:** "Design with tactics, not talent." De-emphasising secondary elements is more powerful than emphasising primary ones. Hierarchy through subtraction is more effective than hierarchy through addition.
**Specific technique:** Start every component with generous whitespace, then reduce. Never start with tight spacing and try to add breathing room later — you end up with visual claustrophobia.
**ABLE application:** The fan capture card at the bottom of the profile is a critical conversion surface. It must have generous internal padding (min 24px), the CTA button should span the full card width, and the label ("Stay close.") should be the *only* text above the fold of the card. Strip the surrounding context — isolation elevates importance.

### 22. Adam Wathan & Steve Schoger — Colour Technique
**Core principle:** Visual hierarchy uses grey text far too little. Most of a card's information should be in a tertiary grey (50–60% opacity on dark backgrounds), with only the primary information at full white.
**ABLE application:** On track listing cards: track title = full white. Artist name = 70% opacity. Duration = 50% opacity. Platform badges = 60% opacity. This three-tier grey system creates instant scannable hierarchy without any size changes.

### 23. Erik Kennedy (Learn UI Design)
**Core principle:** "Law of Locality" — controls should be adjacent to the elements they affect. Users should not need to look away from the content to find the control for it.
**Specific technique:** Colour system built from one base colour using HSB shifts: darker variations = lower brightness + higher saturation; lighter variations = higher brightness + lower saturation.
**ABLE application:** The colour shift technique directly applies to ABLE's accent generation. For the artist's accent colour at any hue, the primary CTA button background should be the base accent. The button's hover/active state should be 10% brightness reduction + 8% saturation increase. Disabled state: base hue + 60% brightness + 20% saturation. This produces cohesive colour states without needing a designer every time.

### 24. Vitaly Friedman (Smashing Magazine)
**Core principle:** Accessible touch targets are non-negotiable, not a nice-to-have. The `44px × 44px` minimum (Apple HIG) is a floor, not a target.
**Specific technique:** When visual elements cannot be made 44px (e.g. small icons, close buttons), extend the hit target invisibly using `padding` or `::after` pseudo-elements.
**ABLE application:** Every tab in the bottom tab bar, every quick-action pill, every CTA button must meet 44px minimum. The "overflow toggle" for platform pills (the +N button) is especially at risk of being too small. Verify with `outline: 1px solid red` in dev mode on each interactive element. The platform pills should be `min-height: 44px` even if the visual chip appears shorter.

### 25. Tobiasz Ahlin — Performance-First Animation
**Core principle:** Never animate `box-shadow` directly — it triggers layout recalculation. Use `opacity` on a pseudo-element containing the shadow to achieve smooth shadow animations.
**ABLE application:** The glass card hover states and CTA button press states should use `opacity` transitions on shadow layers, not direct `box-shadow` transitions. This keeps animations at 60fps on mid-range Android phones, which is the target fan demographic.

### 26. Brad Frost (Atomic Design)
**Core principle:** Design systems should be built bottom-up: atoms (tokens, single elements) → molecules (input + label) → organisms (form, card) → templates → pages.
**ABLE application:** ABLE's HTML is a single-file monolith, which is correct for the current stage. But the *thinking* should still be atomic: every component (snap card, platform pill, CTA button, section header) should be independently reusable with the same HTML/CSS pattern. When the same component appears twice with slightly different markup, consolidate immediately.

### 27. Jen Simmons (CSS Grid / Intrinsic Design)
**Core principle:** "Intrinsic design" uses CSS tools that let content determine its layout rather than imposing a fixed grid. Content finds its natural shape.
**ABLE application:** The bento grid for events and merch should use `auto-fill` and `minmax()` so items reflow naturally at different screen widths without breakpoints. At 375px, two columns. At 600px+, three columns. Never hardcode `width: calc(50% - 8px)` for a two-column grid — let the grid algorithm do it with `grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))`.

### 28. Leah Verou (CSS Houdini / Custom Properties)
**Core principle:** CSS custom properties (variables) are not just for theming — they enable component-level logic that was previously only possible in JavaScript.
**ABLE application:** ABLE's 4-theme system should use a single `data-theme` attribute on `<body>` or `<div id="shell">`, with all four themes defined as CSS variable overrides. Switching themes is then one DOM attribute change — no class toggling, no JS style manipulation. This also means theme can be inherited by nested components automatically.

### 29. Material Design 3 (Google)
**Core principle:** Dynamic colour generation from a single source colour using tonal palettes. One accent colour generates 5 tonal variants (container, on-container, primary, on-primary, outline) automatically.
**ABLE application:** ABLE does not need M3's full tonal system, but the *principle* is valuable: from `--color-accent`, generate: (1) the CTA button background, (2) the active tab indicator colour, (3) the platform pill active border, (4) the section divider accent, (5) the focus ring. All five should be derived from one value — either the accent itself or opacity/brightness shifts of it. Never hardcode a second "accent-adjacent" colour.

### 30. Ryan Singer (Basecamp / Shape Up)
**Core principle:** Fixed time, variable scope. Ship something real rather than a complete-but-late feature. Every design decision should answer "does this make the core job-to-be-done easier?"
**ABLE application:** ABLE's Campaign HQ (state system) is the core JTBD for artists. Every feature added to the profile or dashboard should be evaluated against: "does this help the artist communicate their current state to fans, or capture fans who land on the page?" If the answer is no, it is scope to cut.

### 31. James Gilmore & B. Joseph Pine (Experience Economy — applied to digital UI)
**Core principle:** Products compete on commodities, goods, then services, then experiences. The premium tier is the experience layer — distinctive, memorable, personal.
**ABLE application:** Free tier users get a functional profile. Artist Pro users should feel that their page is *performing* something when a fan visits. The pre-release countdown, the "on tonight" gig tag, the animated hero — these are experience layer features. They are the reason the Pro tier is worth paying for. Design them to feel dramatically different from a blank Free profile.

### 32. Paul Kinlan (Google Chrome DevRel)
**Core principle:** Autofill has a 45% higher conversion rate on mobile checkout. Any form that requires typing should be autofill-optimised: `autocomplete` attributes, correct `type` attributes, minimal field count.
**ABLE application:** The fan capture email form is the most business-critical form on the site. It must have `type="email"`, `autocomplete="email"`, and `inputmode="email"`. It should be a single field with a single button. No confirm-email field. No name field unless the artist explicitly requests it. Every extra field reduces conversion.

### 33. UX Movement Principles
**Core principle:** Top-aligned labels reduce form completion time compared to side-aligned labels. Optional fields should be marked optional, not required fields marked required — it reduces perceived burden.
**ABLE application:** The artist onboarding wizard (`start.html`) should use stacked label-above-input patterns on mobile. The label should be visually lighter than the input value (60% opacity label, full-white value). Mark optional fields as "(optional)" in small text — not required fields with asterisks.

### 34. Awwwards / Codrops — Scroll Animation Community
**Core principle:** Staggered entrance animations create the perception that a page has depth and care behind it. Each card entering 50–80ms after the previous creates a wave of arrival.
**ABLE application:** Platform pills, track cards, and event cards should all have entrance animations with staggered delays: first item at 0ms, second at 60ms, third at 120ms, etc. Total animation time per item: 300ms with the spring easing. This creates a "bloom" effect when the fan first loads the page — the content appears to assemble itself around them.

### 35. CSS Tricks / Modern CSS Community
**Core principle:** CSS `clamp()` for fluid typography eliminates the "breakpoint jump" where text size changes abruptly. Text should scale smoothly across the full viewport width range.
**ABLE application:** The artist name in the hero should use `font-size: clamp(2.5rem, 8vw, 5rem)`. The section titles should use `clamp(1.25rem, 4vw, 2rem)`. Body copy at `clamp(0.875rem, 2vw, 1rem)`. This means at 320px the artist name is readable and at 430px it dominates — the same HTML, no JS needed.

---

## Section 3 — Top UX Experts: Key Insights for ABLE

### 36. Jakob Nielsen (Nielsen Norman Group)
**Core principle:** The 10 Usability Heuristics have not changed since 1994 because they reflect human psychology, not technology trends. The most frequently violated are: visibility of system status, user control and freedom, and recognition over recall.
**Specific technique:** Visibility of system status — "the design should always keep users informed about what is going on, through appropriate feedback within a reasonable time."
**ABLE application:** Campaign state changes (pre-release → live → gig → profile) are system status changes. When an artist switches from profile to gig mode, the visual change must be immediate and unmistakable — not a subtle colour shift. The fan should see a visually different page. A banner, a changed hero, a pulsing indicator — something that says "this page has a current state that matters."

### 37. Don Norman (The Design of Everyday Things)
**Core principle:** "Design for people the way they are, not how you want them to be." Affordances (what an object allows) are less important than signifiers (what an object communicates it allows). If users can't see how to interact with something, the affordance is irrelevant.
**Specific technique:** Emotional design has three levels — visceral (appearance), behavioural (how it works), and reflective (what it means to own/use it).
**ABLE application:** ABLE operates at all three levels. Visceral: the dark navy + coral accent must feel premium and music-world native on first load. Behavioural: CTAs must be immediately obvious as tappable. Reflective: artists should feel that having a ABLE profile means something — they chose quality over convenience. Copy and design decisions at the reflective level are the hardest and most important.

### 38. Don Norman — Signifiers vs Affordances
**Core principle:** The flat design trend removed visual signifiers (3D buttons, blue underlines) without replacing them, causing users to miss interactive elements. Every interactive element must have at least one visible signifier of its interactivity.
**ABLE application:** Platform pills that are tappable must look tappable. Add a subtle right-arrow icon, a slight background fill, or a border that communicates "this opens something." The ghost CTAs (secondary buttons with only a border) are at risk — on the Glass theme, a border-only button can disappear into the blurred background. Ensure ghost CTAs have `backdrop-filter: blur(4px)` on the glass theme to separate them from the background.

### 39. Steve Krug ("Don't Make Me Think")
**Core principle:** Every question a user has to ask themselves while using a product saps their cognitive goodwill. The goal is to eliminate questions, not answer them.
**Specific technique:** The "trunk test" — at any point in the product, a user should be able to answer: Where am I? What can I do here? Where can I go from here?
**ABLE application:** Apply the trunk test to every state of the artist profile. In pre-release state: Where am I? (An artist's profile.) What can I do? (Pre-save, get notified.) Where can I go? (Music, Events, Support tabs.) In gig state: Where am I? Same artist. What can I do? Buy tickets. Where can I go? Same tabs. Each state passes the test — ensure any new feature additions do not blur these answers.

### 40. Luke Wroblewski (Mobile First)
**Core principle:** Mobile forces design discipline. The constraint of a small screen is not a limitation — it is a filter that removes everything that isn't essential, producing a better product for all contexts.
**Specific technique:** Design for mobile first, then scale up. Mobile constraints naturally reveal the hierarchy of importance.
**ABLE application:** Every new feature for ABLE must be designed at 375px first. If it doesn't fit or feel essential at 375px, it is not essential at all. The admin dashboard is the most at-risk surface — it tries to show stats, fan list, campaign HQ, and snap cards on one screen. Each section should be a full-bleed panel that users scroll through, not a cramped grid of widgets.

### 41. Jared Spool (UIE)
**Core principle:** Users form expectations from prior experiences — their "experience vocabulary" shapes how they interpret every new interface. Interfaces that match common patterns are learned instantly; interfaces that invent new patterns require learning investment.
**ABLE application:** The bottom tab bar pattern is a strong convention on iOS (Home, Music, Events, Merch, Support) — familiar from Spotify, Apple Music, Instagram. Do not deviate from it without strong reason. Fans arriving from an Instagram bio link will immediately understand the tab bar. An inventor navigation pattern (e.g. a radial menu, a swipe-based nav) would require learning investment fans will not make.

### 42. Bruce Tognazzini (AskTog — First Principles of Interaction Design)
**Core principle:** Fitts's Law — the time to acquire a target is a function of distance and size. Large, close targets are acquired faster. The most important actions on a page should be the largest and most centrally positioned.
**ABLE application:** The primary hero CTA (e.g. "Pre-save" / "Stream now" / "Get tickets") should be the largest, most visually prominent button on the page — full-width at 375px, accent fill, minimum 56px height (not 44px — primary CTAs should exceed minimum). Secondary CTA (ghost button) should be slightly smaller: 48px height. This size differential communicates priority through Fitts's Law.

### 43. Kara Pernice (Nielsen Norman Group)
**Core principle:** Eye-tracking research shows that 57% of viewing time occurs above the fold, and 65% of total attention is concentrated in the top 40% of a page. Content priority must be rigidly enforced.
**ABLE application:** The artist's primary CTA must appear before the fold on first load at 375px. The hero card (artist name, campaign state badge, primary CTA) must fit within the first ~600px of content. If the hero CTA requires scrolling to reach, conversion will drop significantly. Run a regular check: load the page at 375×667px (iPhone SE viewport) and verify the primary CTA is visible without scrolling.

### 44. Nielsen Norman Group — Aesthetic-Usability Effect
**Core principle:** Users perceive visually attractive products as more usable, even when they are not. Beautiful design generates tolerance for minor usability issues and encourages users to persist through friction.
**ABLE application:** ABLE's premium dark aesthetic is a strategic asset, not just branding. A fan who lands on a beautifully designed artist page will forgive a slightly slow load time, a slightly confusing CTA label, or a slightly cramped layout — up to a point. This does not justify usability debt; it means ABLE gets more credit from the aesthetic investment. Maintain the aesthetic standard rigorously — one misaligned element or jarring colour breaks the tolerance effect.

### 45. Nielsen Norman Group — Progressive Disclosure
**Core principle:** Show users only the most important options initially. Offer secondary options on request. Avoid more than two levels of disclosure — three levels becomes unmangeable.
**ABLE application:** Platform pills: show 4 primary platforms (Spotify, Apple Music, Instagram, YouTube) by default, with a "+3 more" overflow toggle. The overflow toggle reveals the remaining pills inline (not a modal) with a smooth expand animation. Do not pre-show all 7 platforms — this violates progressive disclosure and reduces the perceived importance of each platform.

### 46. Nielsen Norman Group — Chunking
**Core principle:** Breaking content into meaningful, bounded groups reduces cognitive load and improves scan speed. Chunk sizes of 3–5 items are optimal.
**ABLE application:** The snap cards section should show a maximum of 3 cards visible at once (the fourth partially visible to signal scrollability). Event listings: maximum 3 upcoming events before a "see all" affordance. Track listings: maximum 3–5 before a "more" expansion. This chunking creates a page that feels manageable rather than overwhelming, while signalling there is depth.

### 47. Nielsen Norman Group — Recognition vs Recall
**Core principle:** Interfaces that require users to recall information from memory fail. Interfaces that let users recognise information from visible options succeed.
**ABLE application:** Fan sign-up confirmation should be immediately visible in the UI after submission — a success state with the fan's email shown back to them ("We've got you — checking [email@example.com] for updates"). This uses recognition (they see their email) rather than recall (they have to remember if they signed up). Also: recently viewed artist profile via ABLE should be bookmarked/saved state if the fan visits again — show them their saved artists via recognition, not ask them to remember URLs.

### 48. Nielsen Norman Group — Microinteractions
**Core principle:** Microinteractions communicate system status, express brand personality, and differentiate experiences. They work by triggering → rules → feedback → loops.
**Specific applications:** LinkedIn pull-to-refresh; Apple birthday balloons; Xbox power-on sound.
**ABLE application:** Three microinteractions ABLE should implement: (1) Fan sign-up success — a brief burst animation (confetti, or a ripple from the button) acknowledging the signup. (2) CTA tap feedback — a 100ms scale-down on press (`transform: scale(0.97)`) and a 150ms spring-back. (3) Tab switch — active tab dot slides to the new position using a spring-eased `left` or `transform: translateX()` transition. These three microinteractions make the product feel alive.

### 49. Nielsen Norman Group — Dark Mode Research
**Core principle:** Dark mode generally does not improve readability for normal-vision users but has strong preference signals in specific contexts: music apps, entertainment, night-time use. Offering a choice respects user preference.
**ABLE application:** ABLE's default should remain Dark (navy) because the audience (music fans, late-night listeners) strongly prefer dark interfaces for entertainment contexts. The Light theme should be accessible via a toggle on the artist profile, but the *default* state should be Dark. Never force Light mode on any artist page — artists chose ABLE partly for its aesthetic.

### 50. Nielsen Norman Group — Touch Target Research
**Core principle:** Minimum physical touch target: 1cm × 1cm. Recommended spacing between adjacent targets: minimum 8px. Primary actions benefit from targets significantly above the minimum.
**ABLE application:** Audit checklist: (1) Platform pills: minimum `height: 44px` even if visual height is less — use padding. (2) Tab bar icons: `48px × 48px` hit target. (3) Close/dismiss buttons: never less than 44px, and never in the top-left corner (hard to reach). (4) "More" overflow toggles: `min-width: 44px`. Use `min-height: 44px; padding: 8px;` on all interactive elements as a global baseline.

### 51. Nielsen Norman Group — Scrolling & Attention
**Core principle:** 57% of viewing time is above the fold; engagement drops after two screenfuls. Content in the third screenful and beyond has significantly lower attention.
**ABLE application:** Page content order priority: (1) Artist name + campaign state + hero CTA — must be above fold. (2) Platform pills + quick actions — screenful 1. (3) Music section — screenful 2. (4) Events and Merch — screenful 3+. Fan capture email form — screenful 3 (this is deliberate — only fans who scrolled that far have earned the right to be asked for their email; cold-asked email forms at page load convert poorly and damage trust).

### 52. Nielsen Norman Group — Cards Component
**Core principle:** Cards work best for browsing heterogeneous content. They are poor for search results or comparison tasks. Each card should be an entry point to richer content, not a complete information unit.
**ABLE application:** Snap cards, event cards, and merch cards all fit the browsing pattern correctly. Each snap card should be a summary that pulls the fan toward a deeper interaction (e.g. tapping opens a panel or navigates). The card should show: image, title, and one CTA. Three pieces of information maximum on a card face.

### 53. Nielsen Norman Group — Trustworthy Design
**Core principle:** Trust is built through four factors: professional design quality, upfront disclosure, current/correct content, and external validation (third-party press, social links).
**ABLE application:** Every artist profile must feel built with intention. Misaligned elements, missing artwork, empty sections, and placeholder copy destroy trust — not just in the artist, but in ABLE. The empty state for sections (no events listed, no merch listed) must be designed, not left as blank space. "No shows announced yet" in light text is better than nothing. Also: the artist's external links (press, social) are trust signals for the fan — make platform pills prominent.

### 54. Nielsen Norman Group — Skeleton Screens
**Core principle:** Skeleton screens are optimal for full-page loads of 2–10 seconds. They reduce perceived wait time by showing the page structure before content arrives. Avoid skeleton screens for loads under 1 second (unnecessary) or over 10 seconds (use a progress indicator instead).
**ABLE application:** The artist profile should show a skeleton screen on first load: a dark grey rectangle for the hero artwork area, two grey pill shapes for the CTAs, and three grey lines for the artist name and bio. Animate with a shimmer effect (left-to-right gradient sweep, 1.5s loop). When content loads, cross-fade the skeleton to the real content with a 200ms opacity transition.

### 55. Nielsen Norman Group — Visual Hierarchy (5 Principles)
**Core principles:** Scale, Visual Hierarchy, Balance, Contrast, Gestalt Proximity.
**ABLE application:** ABLE's visual hierarchy checklist: (1) Scale — artist name > section titles > labels > metadata. Verify at 375px that this ratio is maintained. (2) Balance — asymmetric balance is correct for a music product (energetic, not static). (3) Contrast — white text on `#0d0e1a` must meet WCAG AA (4.5:1 for body, 3:1 for large text). (4) Contrast accent — coral `#e05242` on navy must meet 3:1 for the CTA. (5) Proximity — platform pills should be grouped visually apart from hero CTAs. Section content should be visually indented or separated from section headers.

### 56. Laws of UX — Hick's Law
**Core principle:** Decision time increases proportionally with the number of choices. Reducing options to 2–3 meaningful choices produces faster, more confident decisions.
**ABLE application:** Hero CTAs: maximum 2. Quick action pills: maximum 4 visible (6 on wider screens). Section actions: maximum 2 per section. These caps are not arbitrary — they directly apply Hick's Law. The global CTA dedupe rule (same URL cannot appear in two zones) prevents artificial choice multiplication.

### 57. Laws of UX — Peak-End Rule
**Core principle:** Users judge an experience primarily by its most intense moment (peak) and its final moment (end), not by the average of all moments.
**ABLE application:** The peak of the fan's profile visit should be the artist CTA interaction — when they tap "Pre-save" or "Stay close", that moment should feel rewarding and responsive. The end should be the fan capture success state — a warm, human confirmation that makes them feel seen. Never end a positive fan action with a generic "Success" toast. "You're on [Artist Name]'s list." is a peak-end moment. Design it with care.

### 58. Laws of UX — Goal-Gradient Effect
**Core principle:** Motivation increases as users approach a goal. Perceived progress increases the likelihood of completing a task.
**ABLE application:** The artist onboarding wizard (`start.html`) should show a progress indicator (step 1 of 4, step 2 of 4, etc.) that fills or advances with each completed step. As artists approach completion, the "complete" button should become more prominent. This principle is why multi-step forms with visible progress outperform single long forms for completion rates.

### 59. Laws of UX — Von Restorff Effect
**Core principle:** Distinctive items are remembered and noticed more than similar ones. One visually unique element in a group captures attention disproportionately.
**ABLE application:** The gig mode state should be the most visually distinctive thing on the profile when active. A pulsing accent dot, a bright "tonight" badge, or a full-bleed accent-coloured hero strip — something that cannot be missed among the standard dark navy layout. This is the one moment when visual restraint should give way to deliberate loudness.

### 60. Laws of UX — Doherty Threshold
**Core principle:** Productivity soars when a computer and user interact at under 400ms. Responses above 400ms break perceived flow and feel "slow".
**ABLE application:** CTA button tap feedback must occur within 100ms (scale feedback, colour change). Page state transitions (tab switches, panel opens) must begin within 100ms of the tap, even if the animation takes 300ms to complete. Never delay animation start to "wait for data" — show the transition immediately and load data in the background. Any perceived latency above 400ms on a CTA tap will be felt as the product being broken.

---

## Design Patterns ABLE Should Adopt

1. **Accent-derived colour system:** Generate all 5 interactive colour states (default, hover, active, disabled, focus) from a single `--color-accent` using HSB brightness/saturation shifts.

2. **Layered easing vocabulary:** Spring `cubic-bezier(0.34,1.56,0.64,1)` for entrances and bouncy elements. Deceleration `(0.25,0.46,0.45,0.94)` for content sliding in. Linear for progress and skeletons.

3. **Staggered entrance animations:** 60ms delay between successive cards/pills/items. Max 6 items animated = 300ms total stagger. Beyond 6 items, reset stagger offset.

4. **Thumb-zone aware layout:** Primary CTAs in the lower 60% of the screen. Navigation at the very bottom (thumb rest position). Close/dismiss buttons in the lower half, never top-right.

5. **Empty state design:** Every section must have a designed empty state (not blank space). Use 60%-opacity body copy with a relevant, human message.

6. **Skeleton screen on load:** Full-page skeleton for first load, matching the approximate shape of the loaded content.

7. **Two-typeface discipline:** DM Sans + Barlow Condensed only. Hierarchy through weight, size, opacity, and letter-spacing — never a third typeface.

8. **Three-tier grey hierarchy on dark:** Full white (primary content), 70% opacity (secondary labels), 50% opacity (metadata/tertiary). Never rely on size alone for hierarchy on dark backgrounds.

9. **Fan capture email form minimum:** `type="email"`, `autocomplete="email"`, `inputmode="email"`, single field + single button, no confirm-email field.

10. **Tab bar with animated active indicator:** The active state indicator (dot, line, or fill) should animate to the new position on tab change — not jump. Spring easing, 200ms.

---

## Design Patterns ABLE Should Avoid

1. **Three or more CTA zones competing for attention:** Hero, pills, and section actions are the three zones. A fourth zone (e.g. a floating sticky button) cannibalises the others.

2. **Glass effect on scrollable content sections:** Backdrop-filter on full-page scrollable sections is expensive. Use glass only for floating modals, bottom sheets, and the top bar when scrolled.

3. **Pure black (#000000) backgrounds:** #09090f (admin) and #0d0e1a (profile) are correct. Pure black creates harsh contrast that reads as low-quality on OLED screens.

4. **Generic placeholder copy:** "Artist Name", "Track Title", "Your bio here" in live profiles signals a template, not a product. All placeholder states should be designed with real-feeling placeholder content.

5. **Horizontal scroll traps:** Any horizontally scrollable element (platform pills, snap cards) must not trap the vertical scroll. Use `overflow-x: auto; overflow-y: hidden` carefully, and test on iOS Safari.

6. **Top-right dismiss buttons on mobile:** Hard to reach with right thumb. Place close/dismiss at bottom-center or bottom-right of panels and modals.

7. **More than two levels of disclosure:** Main content → expanded section is acceptable. Main content → expanded section → deeper panel is the limit. Three levels of nesting creates navigational confusion.

8. **Loading states that delay animation start:** Begin transitions immediately on tap, even before data. Load data in the background. Never make the user wait for a network response before any visual feedback.

9. **Identical visual weight for all interactive elements:** Not every button should look the same. Hierarchy must be visible: primary (accent fill) > secondary (ghost) > tertiary (text only). A page with three accent-filled buttons has no primary action.

10. **Animations that serve the designer, not the user:** 3D album art carousels, parallax hero sections, and particle effects are for award sites. ABLE is where fans come to support artists. Every animation should feel earned, not decorative.

---

## Source Index

| Source | URL |
|---|---|
| Nielsen Norman Group — 10 Heuristics | https://www.nngroup.com/articles/ten-usability-heuristics/ |
| Nielsen Norman Group — Mobile UX | https://www.nngroup.com/articles/mobile-ux/ |
| Nielsen Norman Group — Touch Targets | https://www.nngroup.com/articles/touch-target-size/ |
| Nielsen Norman Group — Aesthetic-Usability | https://www.nngroup.com/articles/aesthetic-usability-effect/ |
| Nielsen Norman Group — Progressive Disclosure | https://www.nngroup.com/articles/progressive-disclosure/ |
| Nielsen Norman Group — Trustworthy Design | https://www.nngroup.com/articles/trustworthy-design/ |
| Nielsen Norman Group — Scrolling & Attention | https://www.nngroup.com/articles/scrolling-and-attention/ |
| Nielsen Norman Group — Microinteractions | https://www.nngroup.com/articles/microinteractions/ |
| Nielsen Norman Group — Skeleton Screens | https://www.nngroup.com/articles/skeleton-screens/ |
| Nielsen Norman Group — Cards Component | https://www.nngroup.com/articles/cards-component/ |
| Nielsen Norman Group — Visual Design Principles | https://www.nngroup.com/articles/principles-visual-design/ |
| Nielsen Norman Group — Signal-to-Noise | https://www.nngroup.com/articles/signal-noise-ratio/ |
| Nielsen Norman Group — Gestalt Proximity | https://www.nngroup.com/articles/gestalt-proximity/ |
| Nielsen Norman Group — Recognition vs Recall | https://www.nngroup.com/articles/recognition-and-recall/ |
| Nielsen Norman Group — Chunking | https://www.nngroup.com/articles/chunking/ |
| Nielsen Norman Group — Flat Design | https://www.nngroup.com/articles/flat-design/ |
| Nielsen Norman Group — Dark Mode | https://www.nngroup.com/articles/dark-mode/ |
| Nielsen Norman Group — Confirmation Dialogs | https://www.nngroup.com/articles/confirmation-dialog/ |
| Laws of UX | https://lawsofux.com/ |
| Refactoring UI | https://refactoringui.com/ |
| Learn UI Design Blog | https://learnui.design/blog/ |
| Smashing Magazine — Thumb Zone | https://www.smashingmagazine.com/2016/09/the-thumb-zone-designing-for-mobile-users/ |
| Smashing Magazine — Mobile Articles | https://www.smashingmagazine.com/category/mobile/ |
| UX Movement | https://uxmovement.com/ |
| Don Norman — jnd.org | https://jnd.org/ |
| Frank Chimero Blog | https://frankchimero.com/blog/ |
| Jason Santa Maria | https://v5.jasonsantamaria.com/articles/ |
| Tobias Ahlin Blog | https://tobiasahlin.com/blog/ |
| A Dao of Web Design | https://alistapart.com/article/dao/ |
| Codrops Playground | https://tympanus.net/codrops/category/playground/ |
| Pentagram Work | https://www.pentagram.com/work |
| Vercel Design | https://vercel.com/design |
| Linear Method | https://linear.app/method |
| Dan Mall Articles | https://danmall.com/articles/ |
| Jonas Downey | https://www.jonas.do/ |
| Paul Kinlan | https://paul.kinlan.me/ |
| Google Design Library | https://design.google/library/ |
| IxDF — UX Design | https://ixdf.org/literature/topics/ux-design |
| UserOnboard | https://useronboard.com/ |
