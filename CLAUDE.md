# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

TCQ ("The Curiosity Quotient") is a single-page marketing/portfolio site for a Chennai-based events brand. It is a heavily animation-driven React landing page — most of the engineering effort lives in scroll/cursor choreography, not data or business logic. There is no backend, router, or test suite.

## Commands

- `npm run dev` — Vite dev server with HMR (primary workflow)
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over all `.{js,jsx}` files (no autofix script; run `npx eslint . --fix` to apply)

The `*.cjs` scripts at the repo root (`trace.cjs`, `invert.cjs`, `bbox_logo.cjs`, `trace_logo.cjs`, `check_svg.cjs`) are **one-off asset-generation tools**, not part of the app build. They use `potrace`/`jimp` to convert PNGs in `src/assets/` into SVGs (e.g. the hand-drawn cat outline). Run them directly with `node trace.cjs` only when regenerating those traced assets; the generated SVGs are committed.

## Architecture

### Page composition
[src/App.jsx](src/App.jsx) is the whole app. It gates everything behind a two-phase reveal:
1. `IntroAnimation` plays a full-screen overlay sequence and fires `onStartFly` / `onLanded` callbacks.
2. Only after `onStartFly` does `App` mount the actual page (`BlobCursor` + `<main>` with sections in fixed order: `Hero` → `WhatIsTCQ` → `WhoIsBehind` → `WingReel` → `WingsBrandsSection` → `CallOutSection` → `Contact`).

`WingsBrandsSection.jsx`/`.css` (a "Brands We've Worked With" logo grid + marquee) **is mounted**, but its `BRAND_SLOTS` data is still fabricated placeholder content (Google, Amazon, Tesla, Nike, Apple, Spotify, Netflix, Adobe, Airbnb, Notion) pulling logos from a third-party CDN (`cdn.jsdelivr.net/npm/simple-icons`). Treat this the same as any other placeholder data field — replace with real partner names/logos before this goes live, and don't add more fabricated brands to the list. `BrandsSection.jsx`/`.css` is an older, unused predecessor of this component still sitting in the repo — don't mount it.

The intro→hero handoff is deliberately seamless: the flying logo lands at the exact coordinates (`top:24, left:24`) where Hero renders its own logo — `onLanded` flips `logoLanded` so Hero reveals its logo precisely as the flying clone disappears. **When touching the intro or Hero header positioning, keep these coordinates in sync** ([IntroAnimation.jsx](src/components/IntroAnimation.jsx) `TARGET`, [Hero.css](src/components/Hero.css) `.hero-logo`).

### Two animation systems — know which one owns a property
The codebase mixes **framer-motion** and **GSAP ScrollTrigger**, intentionally split by job:
- **framer-motion** — entrance/in-view reveals, cursor parallax (`useMotionValue`/`useSpring`/`useTransform`), hover springs, the intro sequence. Used in `Hero`, `Contact`, `WhatIsTCQ`, `CallOutSection`, `WingsBrandsSection`, the magnetic cards in `WingReel`.
- **GSAP ScrollTrigger** (+ `MotionPathPlugin`) — anything that pins a section and scrubs to scroll: the `WhoIsBehind` rocket-along-a-path organic timeline and every `WingReel` horizontal reel. `CardSwap` (used inside `WhoIsBehind`) also uses plain GSAP timelines for its card-stack rotation, independent of scroll.

A recurring, load-bearing convention in [WingReel.jsx](src/components/WingReel.jsx): **CSS owns each photo frame's `transform`/`filter` (polaroid fan rotation + cursor-tilt hover); GSAP only animates `opacity` on those frames.** Writing transforms from GSAP there will fight the CSS. The `gsap.fromTo(..., { immediateRender: false })` pattern is used throughout so panels are never left stuck invisible — preserve it.

### WingReel scroll model (the most intricate component)
Each of the 5 wings is its own pinned, horizontally-scrubbing reel. Direction alternates (boustrophedon/snake): even-index wings travel left→right, odd-index wings are laid out `row-reverse` and travel right→left. Stacked pinned sections shift each other's scroll measurements, so the component calls `ScrollTrigger.refresh()` on a timeout + `window.load`. Mobile and `prefers-reduced-motion` bail out of GSAP entirely and fall back to native CSS swipe — guard new scroll logic with the same `matchMedia` checks. Magnetic wing-preview cards (`MagneticCard`/`MagneticCards`) on the reel's opening page scroll-jump straight to a wing's `id="wing-XX"` section on click.

### Content lives in module-level data arrays
Editable site content is **not** in a CMS or JSON files — it's `const` arrays at the top of components:
- [src/components/wingsData.js](src/components/wingsData.js) — the five wings (`WINGS`), their events, and photo placeholders. Photos are `ph(w, h)` placeholders with `src: null`; real images go in `src/assets/wings/<wing>/` and replace the `src`. Layout per event is `'fan'` | `'hero'` | `'grid'` | `'split'` | `'collage'` | `'strip'` (each has matching `.wr-photos--*` CSS in [WingReel.css](src/components/WingReel.css)).
- `timeline` in [WhoIsBehind.jsx](src/components/WhoIsBehind.jsx) (the "Journey So Far" organic path — `img: null` placeholders throughout, same replace-with-real-asset pattern as wing photos), `SPARKLES`/`CAT_PATH` in [Hero.jsx](src/components/Hero.jsx), `AUDIENCES`/`POETIC_LINES` in [CallOutSection.jsx](src/components/CallOutSection.jsx), `BRAND_SLOTS` in [WingsBrandsSection.jsx](src/components/WingsBrandsSection.jsx) (see placeholder-data note above).

`GalleryModal.jsx` renders the per-event photo lightbox opened from `WingReel`'s "Explore images" buttons; `OptionWheel.jsx` is a standalone scroll/drag picker widget (not currently used by any mounted section — dead code unless something starts importing it).

### Reusable "design" components
Several components under `src/components/` are generic, self-contained animation primitives reused across sections, each with a paired `.css`: `BlobCursor`, `TrueFocus`, `BlurText`, `ScrollReveal`, `CountUp`, `CardSwap`. Treat these as a local mini-library — prefer composing them over re-implementing similar effects.

## Conventions

- **Styling is mixed**: paired `ComponentName.css` files, large inline `style={{}}` objects, and occasional inline `<style>` blocks (e.g. `WhoIsBehind`, `WhatIsTCQ`, `Contact`, `CallOutSection` inject `<style>` blocks for keyframes/selectors that inline `style={{}}` can't express). There is no CSS framework or CSS-in-JS library. Match whatever the surrounding component already uses.
- **Brand palette** (recurring hex values, defined as CSS custom properties in [src/index.css](src/index.css) `:root`): `#382525` (brown/near-black), `#D58F6B` (orange, primary accent), `#F7E7C4`/`#E8D0A0` (cream light/dark). Darker maroon tones (`#2e1c1c`, `#4a3030`) appear in `Contact`/`CallOutSection` for contrast sections. Reuse these rather than introducing new colors.
- Fonts (loaded via Google Fonts `@import` in `index.css` and re-imported locally by a couple of components): `Outfit` (body/UI), `Fredoka` (intro wordmark), `Newsreader` (italic serif accent headings/quotes).
- React 19 + Vite 8, ESLint flat config. The `react-hooks` exhaustive-deps rule is on — keep effect/callback dependency arrays correct, especially in the GSAP `useEffect`s where they control re-init.
