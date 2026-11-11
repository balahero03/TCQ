# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TCQ ("The Curiosity Quotient") is a single-page marketing/portfolio site for a Chennai-based events brand. It is a heavily animation-driven React landing page — most of the engineering effort lives in scroll/cursor choreography, not data or business logic. There is no backend, router, or test suite.

## Commands

- `npm run dev` — Vite dev server with HMR (primary workflow)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over all `.{js,jsx}` files (no autofix script; run `npx eslint . --fix` to apply)

## Architecture

### Page composition
[src/App.jsx](src/App.jsx) is the whole app. It gates everything behind a two-phase reveal:
1. `IntroAnimation` plays a full-screen overlay sequence and fires `onStartFly` / `onLanded` callbacks.
2. Only after `onStartFly` does `App` mount the actual page (`BlobCursor` + `<main>` with sections in fixed order: `Hero` → `WhatIsTCQ` → `WhoIsBehind` → `WingReel` → `CallOutSection` → `WingsBrandsSection` → `Contact`).

`App` skips the intro entirely (mounting the page immediately) when the URL has a hash, for `prefers-reduced-motion`, or once it has played in the tab (`sessionStorage`). Clicking the overlay or pressing Escape jumps to the fly phase. **To re-test the intro, open a new tab.**

`WingsBrandsSection.jsx`/`.css` (a "Brands We've Worked With" logo grid + marquee) holds real partner logos in `BRAND_SLOTS`, imported from `src/assets/partners/`.

The intro→hero handoff is deliberately seamless: the flying logo icon lands exactly where Hero renders its own icon (`top:24, left:24`, plus the header's 2px border-top) — `onLanded` flips `logoLanded` so Hero reveals its logo precisely as the flying clone disappears. **When touching the intro or Hero header positioning, keep these coordinates in sync** ([IntroAnimation.jsx](src/components/IntroAnimation.jsx) `TARGET`, [Hero.css](src/components/Hero.css) `--logo-top`/`--logo-left`/`--logo-h` on `.hero-header`).

All branding uses the official TCQ logo files (originals in `images-raw/brand/`, cropped tight into `src/assets/brand/`): `logo-icon-brown`/`logo-icon-white` (icon only), `logo-wordmark-brown` (the wordmark only, placed beside the icon in Hero using the lockup's own proportions), `logo-lockup-white` (footer) and `logo-icon-white` (intro, beside the wordmark typed in Outfit in cream `#FAF3E6`). Don't recolour or thicken them with CSS filters.

Body text uses two shared sizes from `src/index.css`: `--fs-body` (section paragraphs) and `--fs-body-sm` (text inside fixed-size cards). Use these rather than adding new paragraph sizes.

### SEO and the wing pages
Besides the animated homepage there are five plain landing pages, one per wing (`/quizzes`, `/circles`, `/collabs`, `/writes`, `/teaches`), built from the single template [wing.html](wing.html) → [src/wing/](src/wing/) (`WingPage` reads events/photos from `wingsData.js`, reuses `GalleryModal`). Their SEO copy (title, description, h1, body, offers, FAQs, keywords) and the homepage's title/description/keywords live in [src/seo/pages.js](src/seo/pages.js); `pages.js[].wing` must match a `WINGS[].title`.

[seo.config.js](seo.config.js) is a Vite plugin that fills `<!--seo-head-->` (title, meta, OG/Twitter, canonical, JSON-LD: Organization, Person, WebSite, Service, BreadcrumbList, FAQPage) and the wing pages' `<!--seo-fallback-->`, writes `dist/<slug>.html` per wing, and emits `robots.txt`, `sitemap.xml` (with every wing photo) and `llms.txt`. It reads wing events by regex from `wingsData.js` and fails the build if a wing has none, so keep the `name:` / `venue:` pair format. In dev, `/quizzes` etc. are served from `wing.html`.

`SITE_URL=https://tcqindia.com` is committed in `.env` (not a secret); optional `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` there add verification meta tags. [vercel.json](vercel.json) serves `/<slug>` via `cleanUrls`, 308-redirects `www.` to the apex, caches `/assets/*` immutably and adds security headers; `public/404.html` is the not-found page. [index.html](index.html) keeps `#seo-fallback`, a hand-written plain-HTML copy of the homepage content for crawlers and no-JS visitors that React replaces on mount: **when you change homepage copy, update it too.** `App` skips the intro for bot user agents. Fonts load non-blocking from the HTML; don't add `@import`s for them. Vercel Analytics + Speed Insights are mounted via `src/Analytics.jsx`. Share card and icons in `public/` come from `node scripts/make-seo-images.mjs`.

### Two animation systems — know which one owns a property
The codebase mixes **framer-motion** and **GSAP ScrollTrigger**, intentionally split by job:
- **framer-motion** — entrance/in-view reveals, cursor parallax (`useMotionValue`/`useSpring`/`useTransform`), hover springs, the intro sequence. Used in `Hero`, `Contact`, `WhatIsTCQ`, `CallOutSection`, `WingsBrandsSection`, the magnetic cards in `WingReel`.
- **GSAP ScrollTrigger** (+ `MotionPathPlugin`) — anything that pins a section and scrubs to scroll: the `WhoIsBehind` rocket-along-a-path organic timeline and every `WingReel` horizontal reel. `CardSwap` (used inside `WhoIsBehind`) also uses plain GSAP timelines for its card-stack rotation, independent of scroll.

A recurring, load-bearing convention in [WingReel.jsx](src/components/WingReel.jsx): **CSS owns each photo frame's `transform` (cursor-tilt hover); GSAP only animates `opacity` on those frames.** Writing transforms from GSAP there will fight the CSS. The `gsap.fromTo(..., { immediateRender: false })` pattern is used throughout so panels are never left stuck invisible — preserve it.

### WingReel scroll model (the most intricate component)
Each of the 5 wings is its own pinned, horizontally-scrubbing reel. Direction alternates (boustrophedon/snake): even-index wings travel left→right, odd-index wings are laid out `row-reverse` and travel right→left. Stacked pinned sections shift each other's scroll measurements, so the component calls `ScrollTrigger.refresh()` on a timeout. `prefers-reduced-motion` bails out of GSAP entirely and falls back to native sideways scrolling (CSS at the end of `WingReel.css`); mobile still pins and scrubs, with its own sizing under `@media (max-width: 820px)`. Guard new scroll logic with the same reduced-motion `matchMedia` check — `WhoIsBehind` and `CardSwap` do too. Magnetic wing-preview cards (`MagneticCard`/`MagneticCards`) on the reel's opening page scroll-jump straight to a wing's `id="wing-XX"` section on click.

### Content lives in module-level data arrays
Editable site content is **not** in a CMS or JSON files — it's `const` arrays at the top of components:
- [src/components/wingsData.js](src/components/wingsData.js) — the five wings (`WINGS`), their events, and photos. Real photos live in `src/assets/wings/<wing>/<event>/`, imported per event and wrapped with `img(src, w, h)`; `ph(w, h)` (`src: null`) remains available for an event whose photos haven't landed yet. `galleryFrom(folder)` (via `import.meta.glob`) pulls every photo in an event's asset folder into `galleryPhotos`, shown in `GalleryModal`'s full gallery view. Layout per event is `'row'` (uniform square thumbnails) | `'grid'` (Writes' uncropped 4:5 article cards), styled by `.wr-photos--*` in [WingReel.css](src/components/WingReel.css).
- `timeline` in [WhoIsBehind.jsx](src/components/WhoIsBehind.jsx) (the "Journey So Far" organic path) — entries have real logos imported from `src/assets/timeline/`. `SPARKLES`/`DUST` in [Hero.jsx](src/components/Hero.jsx), `AUDIENCES` in [CallOutSection.jsx](src/components/CallOutSection.jsx), `BRAND_SLOTS` in [WingsBrandsSection.jsx](src/components/WingsBrandsSection.jsx).

`GalleryModal.jsx` renders the per-event photo lightbox opened from `WingReel`'s "Explore images" buttons; it shows only real photos and opens a per-photo lightbox on click.

### Reusable "design" components
Several components under `src/components/` are generic, self-contained animation primitives reused across sections: `BlobCursor`, `TrueFocus`, `CardSwap` (each with a paired `.css`), `BlurText`, `ScrollReveal`, `CountUp`. Treat these as a local mini-library — prefer composing them over re-implementing similar effects.

## Conventions

- **Styling is mixed**: paired `ComponentName.css` files, large inline `style={{}}` objects, and occasional inline `<style>` blocks (e.g. `WhoIsBehind`, `WhatIsTCQ`, `Contact`, `CallOutSection` inject `<style>` blocks for keyframes/selectors that inline `style={{}}` can't express). There is no CSS framework or CSS-in-JS library. Match whatever the surrounding component already uses.
- **Brand palette** (recurring hex values, defined as CSS custom properties in [src/index.css](src/index.css) `:root`): `#382525` (brown/near-black), `#D58F6B` (orange, primary accent), `#FAF3E6`/`#F2E7D3` (cream light/dark), `#A85A36` (`--orange-deep`, small orange text on cream). Darker maroon tones (`#2e1c1c`, `#4a3030`) appear in `Contact`/`CallOutSection` for contrast sections. Reuse these rather than introducing new colors.
- **Shared UI classes** in `src/index.css`: `.dot-line` (the cursor's dot-and-line motif; use instead of dashes and arrows, `--reverse` points left) and `.outline-btn` (the site's outlined button).
- Fonts (loaded via Google Fonts `@import` in `index.css` and re-imported locally by a couple of components): `Outfit` (body/UI), `Newsreader` (italic serif accent headings/quotes).
- React 19 + Vite 8, ESLint flat config. The `react-hooks` exhaustive-deps rule is on — keep effect/callback dependency arrays correct, especially in the GSAP `useEffect`s where they control re-init.
