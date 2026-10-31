# The Curiosity Quotient

The website for The Curiosity Quotient (TCQ), a Chennai culture space. It's a single-page, animation-driven React site with no backend.

## Getting started

Requires Node.js.

```bash
npm install
npm run dev
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Vite dev server |
| `npm run build` | Builds for production into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Editing content

Site content lives in the components rather than a CMS:

- **Wings, events and photos:** `src/components/wingsData.js`, with photos in `src/assets/wings/<wing>/<event>/`
- **Journey timeline:** `timeline` in `src/components/WhoIsBehind.jsx`
- **Partner logos:** `BRAND_SLOTS` in `src/components/WingsBrandsSection.jsx`, with logos in `src/assets/partners/`
- **Collaboration options:** `AUDIENCES` in `src/components/CallOutSection.jsx`
- **Contact details and social links:** `src/components/Contact.jsx`

The intro plays once per browser tab. To see it again, open the site in a new tab.

See `CLAUDE.md` for architecture notes and animation conventions.
