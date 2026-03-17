# Dimension H8 — Image Optimisation
**Category:** Security, Data & Performance
**Phase:** 8

Images are the largest single contributor to page weight on most music platforms. ABLE serves artwork from Unsplash (placeholder), Spotify CDN (`i.scdn.co`), and user uploads (pending Supabase storage). Static assets include OG images, PWA icons, and the ABLE logo. The target is: WebP with JPEG fallback for all photography, correct `?w=` and `?q=` parameters on CDN images, and no unoptimised full-resolution images loading on mobile.

## 100 Improvement Points

| # | Improvement | Page | Impact | Effort | Risk |Wave |
|---|---|---|---|---|---|---|
| 1 | Verify that `og-landing.jpg` exists in the project root or a known path — it is referenced in landing.html OG meta tags | landing.html | 4 | 1 | M | 1 |
| 2 | Measure the file size of `og-landing.jpg` — OG images should be 1200×630px and under 300KB | landing.html | 4 | 1 | M | 1 |
| 3 | Convert `og-landing.jpg` to WebP format: `og-landing.webp` — save the JPEG as a fallback | landing.html | 4 | 2 | M | 1 |
| 4 | Update the OG meta tag `content` attribute to reference the WebP version: `og-landing.webp` — note: some OG scrapers still prefer JPEG; test with a real OG debugger | landing.html | 3 | 1 | M | 2 |
| 5 | Verify that `icon-192.png` exists for the PWA manifest | all pages | 4 | 1 | M | 1 |
| 6 | Verify that `icon-512.png` exists for the PWA manifest | all pages | 4 | 1 | M | 1 |
| 7 | Verify that `icon-192.png` is exactly 192×192px — incorrect dimensions cause the browser to reject or rescale the icon | all pages | 4 | 1 | M | 1 |
| 8 | Verify that `icon-512.png` is exactly 512×512px | all pages | 4 | 1 | M | 1 |
| 9 | Verify that PWA icons are not blurry — they should be exported at 2× resolution and down-sampled by the browser, but the source must be crisp | all pages | 3 | 1 | M | 1 |
| 10 | Note: PNG is the correct format for PWA icons — WebP is not universally supported as a manifest icon; PNG must be kept | all pages | 3 | 1 | L | 2 |
| 11 | Add a 180×180px Apple Touch Icon (`apple-touch-icon.png`) — required for iOS home screen add | all pages | 3 | 1 | L | 2 |
| 12 | Add `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` to all active pages | all pages | 3 | 1 | L | 2 |
| 13 | Verify the Unsplash placeholder artwork URLs in `able-v8.html` use `?w=` and `?q=` parameters — e.g. `https://images.unsplash.com/photo-ID?w=800&q=80` | able-v8.html | 5 | 1 | M | 1 |
| 14 | Set the Unsplash `?w=` parameter to match the maximum rendered width of the hero artwork — on mobile (390px), a 2× retina display needs 780px; set `?w=800` | able-v8.html | 5 | 1 | M | 1 |
| 15 | Set the Unsplash `?q=` parameter to 75–80 for a good quality/size balance | able-v8.html | 4 | 1 | M | 1 |
| 16 | Add `&fm=webp` to the Unsplash URL — Unsplash supports format negotiation via the `fm` parameter | able-v8.html | 5 | 1 | M | 1 |
| 17 | Add `&auto=format` to the Unsplash URL — this allows Unsplash to serve WebP to supporting browsers automatically | able-v8.html | 4 | 1 | M | 1 |
| 18 | Use `<picture>` element with `<source type="image/webp">` and `<img>` fallback for the hero artwork — allows browsers that support WebP to get WebP; others get JPEG | able-v8.html | 4 | 3 | M | 2 |
| 19 | Use responsive `srcset` for the hero artwork — load 400w, 800w, 1200w versions for different viewport widths and pixel densities | able-v8.html | 5 | 3 | M | 2 |
| 20 | Add the `sizes` attribute to the hero `<img>` — e.g. `sizes="(max-width: 430px) 100vw, 430px"` | able-v8.html | 4 | 2 | M | 2 |
| 21 | Verify the Spotify album artwork URL from `spotify-import.js` — `pickBestImage()` selects an image between 300–640px wide; verify this is appropriate for all render contexts | able-v8.html | 4 | 1 | M | 1 |
| 22 | Verify the Spotify image CDN (`i.scdn.co`) does not support WebP — if it does not, JPEG is the correct format | able-v8.html | 3 | 1 | L | 2 |
| 23 | Ensure Spotify artwork images are sized at most at their rendered width × 2 for retina — for a 200px thumbnail, request a 400px image | able-v8.html | 4 | 2 | M | 2 |
| 24 | Audit all Spotify artwork renders in `admin.html` — release thumbnails in the campaign HQ must also be correctly sized | admin.html | 4 | 1 | M | 1 |
| 25 | Verify the Spotify `pickBestImage()` function in `spotify-import.js` — it returns the first image between 300–640px or falls back to the largest; this is a good strategy for thumbnails but may be too large for small admin thumbnails | netlify/functions/spotify-import.js | 3 | 1 | L | 2 |
| 26 | Add a separate `pickThumbnailImage()` function for admin thumbnail contexts (100–200px) to avoid loading a 640px image into a 100px slot | netlify/functions/spotify-import.js | 3 | 3 | L | 3 |
| 27 | Verify snap card images in `able-v8.html` — snap card images should be constrained to their rendered size (approximately 80px × 80px) | able-v8.html | 4 | 1 | M | 1 |
| 28 | Add `loading="lazy"` to all snap card images | able-v8.html | 4 | 1 | M | 1 |
| 29 | Add `loading="lazy"` to all merch product images | able-v8.html | 4 | 1 | M | 1 |
| 30 | Verify merch product images have explicit `width` and `height` attributes to prevent CLS | able-v8.html | 4 | 1 | M | 1 |
| 31 | Verify the video thumbnail for the top card video section — if a YouTube embed, the thumbnail is loaded by YouTube's iframe; if a custom image, it must be optimised | able-v8.html | 4 | 1 | M | 1 |
| 32 | Add a `poster` attribute to any `<video>` elements in `able-v8.html` — the poster image prevents a blank frame on load | able-v8.html | 4 | 1 | M | 1 |
| 33 | Verify the background artwork for the Glass theme — this is a full-screen background image and is the single largest image on the page | able-v8.html | 5 | 2 | M | 1 |
| 34 | For the Glass theme background, use the Unsplash URL with `?w=1200&q=70&fm=webp` — a slightly lower quality is acceptable for a blurred background | able-v8.html | 5 | 1 | M | 1 |
| 35 | Lazy-load the Glass theme background image — it is only needed when the Glass theme is active | able-v8.html | 4 | 2 | M | 2 |
| 36 | Verify the ABLE logo is an inline SVG — inline SVG has no additional HTTP request and can be themed with CSS | all pages | 3 | 1 | L | 1 |
| 37 | Verify `able-logo-instagram.svg` file size — it appears as an untracked file in git status; ensure it is under 10KB | project root | 3 | 1 | L | 2 |
| 38 | Verify that the `_icon-gen.html` file (untracked) does not accidentally load large images that end up as part of the build | project root | 2 | 1 | L | 3 |
| 39 | Audit `landing.html` images — the marketing page may have hero artwork or lifestyle photography that needs optimisation | landing.html | 4 | 1 | M | 1 |
| 40 | Verify all `<img>` tags on `landing.html` have `alt` attributes — required for accessibility and SEO | landing.html | 4 | 1 | M | 1 |
| 41 | Verify all `<img>` tags on `able-v8.html` have `alt` attributes or `aria-hidden="true"` for decorative images | able-v8.html | 4 | 1 | M | 1 |
| 42 | Verify all `<img>` tags on `admin.html` have appropriate `alt` attributes | admin.html | 3 | 1 | M | 1 |
| 43 | Verify all `<img>` tags on `start.html` have appropriate `alt` attributes | start.html | 3 | 1 | M | 1 |
| 44 | Verify all `<img>` tags on `fan.html` have appropriate `alt` attributes | fan.html | 3 | 1 | M | 1 |
| 45 | Plan the user-uploaded profile avatar storage — when Supabase Storage is added, set a maximum upload size of 5MB and a server-side resize to 800×800px WebP | admin.html | 4 | 3 | M | 2 |
| 46 | Plan the user-uploaded artwork storage — maximum 10MB upload, resize to 1200×1200px WebP for hero, 400×400px for thumbnails | admin.html | 4 | 3 | M | 2 |
| 47 | Add client-side upload size validation in `admin.html` — reject images over 10MB before the upload begins | admin.html | 4 | 2 | M | 2 |
| 48 | Add client-side image type validation — accept JPEG, PNG, WebP, HEIC (for iOS camera photos) | admin.html | 3 | 2 | M | 2 |
| 49 | Plan the Netlify function for image processing — use `sharp` npm package in a Netlify function to resize and convert uploaded images to WebP | netlify/functions/ | 4 | 5 | M | 4 |
| 50 | Consider using Supabase Storage transformations (available on the Pro plan) instead of a custom `sharp` function | netlify/functions/ | 3 | 2 | M | 4 |
| 51 | Verify that `fan.html` artist artwork (loaded when a fan views their followed artists) is sized correctly | fan.html | 4 | 1 | M | 1 |
| 52 | Verify `mockups/admin-mockup.html` (in git status as untracked) is not serving large unoptimised images | mockups/ | 2 | 1 | L | 4 |
| 53 | Verify `mockups/freelancer-mockup.html` is not serving large unoptimised images | mockups/ | 2 | 1 | L | 4 |
| 54 | Audit `design-references/able-synthesis.html` — it appears in the file tree and may contain large image references | design-references/ | 2 | 1 | L | 4 |
| 55 | Verify the OG image for `able-v8.html` (artist profile page) — it should be a dynamic OG image based on the artist's artwork and name, or a static fallback | able-v8.html | 4 | 2 | M | 2 |
| 56 | Plan a dynamic OG image generator — use a Netlify function with `@vercel/og` or a canvas API to generate per-artist OG images | netlify/functions/ | 3 | 5 | M | 4 |
| 57 | In the short term, use a generic ABLE OG image as fallback for all artist profile pages | able-v8.html | 3 | 1 | L | 2 |
| 58 | Verify the OG image for `admin.html` — admin page should not have a shareable OG image; add `<meta name="robots" content="noindex">` | admin.html | 3 | 1 | M | 2 |
| 59 | Verify the OG image for `start.html` — onboarding page should have a minimal OG image or no indexing | start.html | 3 | 1 | M | 2 |
| 60 | Verify the OG image for `fan.html` — should have an ABLE-branded OG image | fan.html | 3 | 1 | M | 2 |
| 61 | Measure the total image bytes loaded on `able-v8.html` using DevTools Network panel with throttling — record the baseline | able-v8.html | 5 | 1 | M | 1 |
| 62 | Set a performance budget for `able-v8.html`: total image bytes under 200KB for above-the-fold images on a cold load | able-v8.html | 5 | 1 | M | 1 |
| 63 | Verify that `<picture>` elements with `<source type="image/avif">` are considered for next-generation format support — AVIF offers 50% better compression than WebP but has slightly less browser support | able-v8.html | 3 | 3 | L | 3 |
| 64 | Verify that the hero artwork does not use `position: absolute` with a background image — `<img>` elements are prioritised by the browser's preloader; background images are not | able-v8.html | 4 | 1 | M | 1 |
| 65 | Verify that all `background-image: url(...)` in CSS reference optimised images — CSS background images bypass the browser preloader | all pages | 4 | 2 | M | 1 |
| 66 | Add `content-visibility: auto` to off-screen sections in `able-v8.html` — this allows the browser to skip rendering off-screen content, improving FCP | able-v8.html | 4 | 2 | M | 2 |
| 67 | Test `content-visibility: auto` on iOS Safari — its support was added in Safari 16.4; verify it works on the minimum supported iOS version | able-v8.html | 3 | 2 | M | 2 |
| 68 | Verify that the `privacy.html` and `terms.html` pages (untracked, in git status) do not accidentally include large images | privacy.html | 2 | 1 | L | 4 |
| 69 | Add a `decoding="async"` attribute to all non-critical `<img>` tags — this allows the browser to decode images off the main thread | all pages | 4 | 1 | M | 1 |
| 70 | Add `decoding="sync"` or omit `decoding` for the hero artwork `<img>` — the hero image must be decoded immediately to avoid a blank hero flash | able-v8.html | 4 | 1 | M | 1 |
| 71 | Check whether any inline SVGs in `able-v8.html` contain base64-encoded images (data URIs) — these inflate the HTML file size and should be extracted to separate files | able-v8.html | 3 | 2 | M | 2 |
| 72 | Optimise any inline SVG icons — run them through SVGO to reduce unnecessary path data | all pages | 3 | 2 | L | 3 |
| 73 | Verify the `instagram-snapshot.md` and `tiktok-snapshot.md` (untracked files) do not reference any images that could end up in the build | project root | 2 | 1 | L | 4 |
| 74 | Run an image audit with Lighthouse on the deployed site — the "Efficiently encode images" and "Serve images in modern formats" opportunities should both show 0 savings | able-v8.html | 5 | 1 | M | 2 |
| 75 | Run an image audit on `landing.html` with Lighthouse | landing.html | 4 | 1 | M | 2 |
| 76 | Verify the `logo-preview.html` (untracked) does not load large unoptimised images | project root | 2 | 1 | L | 4 |
| 77 | Set a maximum image dimension for the hero artwork — cap at 1200px wide; larger images provide no visual benefit on mobile | able-v8.html | 4 | 1 | M | 1 |
| 78 | Implement lazy loading for artist avatars in the `admin.html` fan list — if fan avatars are added in future, each will need lazy loading | admin.html | 3 | 1 | L | 3 |
| 79 | Verify that the `video-explainer/` directory (untracked) does not contain any large video or image files that are referenced in active pages | project root | 3 | 1 | M | 1 |
| 80 | Set a maximum video file size for any hosted videos — use a CDN or YouTube embed instead of self-hosted video files | all pages | 4 | 1 | M | 1 |
| 81 | Verify the `prefers-reduced-data` media query is not needed — if an artist uploads a video for their top card, consider respecting `prefers-reduced-data: reduce` by showing the poster image instead | able-v8.html | 3 | 2 | L | 4 |
| 82 | Audit all images used in the `mockups/` directory for file size — they should not be committed if they are large | mockups/ | 2 | 1 | L | 4 |
| 83 | Confirm that WebP fallback JPEGs are in place for all WebP images — Safari below 14 and older browsers need JPEG fallback (though these are rare in ABLE's target market) | all pages | 3 | 2 | L | 3 |
| 84 | Verify that JPEG fallbacks are served via `<picture>` elements, not by sending both formats as separate requests | all pages | 4 | 2 | M | 2 |
| 85 | Run a network waterfall analysis for `able-v8.html` — identify any image that loads more than 500ms after the HTML response | able-v8.html | 4 | 2 | M | 2 |
| 86 | Verify that Netlify CDN correctly sets `Content-Type: image/webp` for WebP files — some CDNs serve WebP with `image/jpeg` content type | netlify.toml | 3 | 1 | M | 2 |
| 87 | Add a `Cache-Control: public, max-age=31536000, immutable` header for all image files (currently the `netlify.toml` only specifies CSS and JS) | netlify.toml | 4 | 1 | M | 1 |
| 88 | Add explicit cache headers for `.webp`, `.png`, `.jpg`, `.svg` file patterns in `netlify.toml` | netlify.toml | 4 | 1 | M | 1 |
| 89 | Verify the ABLE logo SVG does not have hard-coded colours that conflict with the `--color-accent` token when used inline | all pages | 3 | 1 | L | 2 |
| 90 | Test all image renders on an OLED display — OLED screens show banding on low-quality images more visibly than LCD screens; the premium ABLE audience uses OLED iPhones | able-v8.html | 3 | 2 | M | 3 |
| 91 | Verify that AVIF format is considered for static OG images — AVIF can reduce OG image size by 60–70% vs JPEG | landing.html | 3 | 3 | L | 3 |
| 92 | Set up an image optimisation script (`scripts/optimise-images.sh`) using `cwebp` and `cjpeg` for converting static assets | project root | 3 | 3 | L | 3 |
| 93 | Document the image optimisation workflow in `CLAUDE.md`: "All new static images must be WebP with JPEG fallback, max 300KB for full-page images, max 50KB for thumbnails" | CLAUDE.md | 3 | 1 | L | 3 |
| 94 | Verify that the `fan.html` near-me feature does not load a map image — if a map is embedded, it must use lazy loading and the tile images must use WebP | fan.html | 3 | 1 | M | 2 |
| 95 | Verify that OG images for all four active pages meet Twitter's minimum dimensions (800×418px) and Facebook's (1200×630px) | all pages | 4 | 1 | M | 1 |
| 96 | Test OG image loading via Twitter Card Validator and Facebook Sharing Debugger after deployment | all pages | 4 | 1 | M | 2 |
| 97 | Confirm that all image CDN URLs in the codebase point to HTTPS endpoints — no HTTP image URLs | all pages | 4 | 1 | M | 1 |
| 98 | Add image dimension documentation to `docs/systems/design/IMAGE-SPECS.md` — define every image dimension and format in the product | docs/ | 3 | 2 | L | 3 |
| 99 | Run a final image optimisation check as part of the Netlify deployment preview — verify no Lighthouse "serve images in modern format" warnings remain | all pages | 4 | 2 | M | 2 |
| 100 | Mark this dimension complete in `docs/STATUS.md` once all hero artwork uses `?fm=webp`, Lighthouse image audit passes, and cache headers for images are set | docs/STATUS.md | 2 | 1 | L | 4 |

## Wave Summary

| Wave | Focus | Items |
|---|---|---|
| 1 | Critical — Unsplash WebP params, hero image sizing, PWA icon verification, lazy loading, cache headers | 1–20, 27–32, 36, 39–44, 54, 59–65, 69–70, 77, 79, 87–88, 95, 97 |
| 2 | Core optimisation — picture elements, srcset, Glass theme background, OG images | 18–20, 21–26, 33–35, 45–48, 55–60, 66–68, 71, 74–75, 83–86 |
| 3 | Advanced format support and documentation | 49–51, 63, 72, 80–81, 83–84, 89–94, 98 |
| 4 | Nice-to-have — AVIF, dynamic OG, image processing pipeline | 50, 56, 91–92 |
