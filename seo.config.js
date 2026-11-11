// Build-time SEO for tcqindia.com.
//
// Pages: the animated homepage (index.html) plus one landing page per wing
// (/quizzes, /circles, /collabs, /writes, /teaches), all built from wing.html.
// Copy for every page lives in src/seo/pages.js; events come from wingsData.js.
//
// This plugin:
//   • fills <!--seo-head--> in each page: title, description, keywords, Open Graph,
//     Twitter, canonical, search-console verification and JSON-LD structured data
//   • fills <!--seo-fallback--> on wing pages with crawlable HTML of the page's content
//   • writes dist/<slug>.html per wing (served at /<slug> by vercel.json cleanUrls)
//   • emits robots.txt, sitemap.xml (with every photo) and llms.txt
//
// Absolute URLs come from SITE_URL (.env). Optional: GOOGLE_SITE_VERIFICATION and
// BING_SITE_VERIFICATION add the search consoles' <meta> verification tags.
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';
import { HOME, WING_PAGES } from './src/seo/pages.js';

const SITE = {
  name: 'The Curiosity Quotient',
  shortName: 'TCQ',
  slogan: 'Making Curiosity Social',
  foundingDate: '2023',
  email: 'thecuriosityquotient@gmail.com',
  telephone: '+91-87544-00743',
  founder: 'Dr. Vishnu Aravind',
  sameAs: [
    'https://instagram.com/tcq_india',
    'https://www.linkedin.com/company/the-curiosity-quotient',
    'https://thecuriosityquotient.substack.com/',
    'https://youtube.com/@thecuriosityquotientindia',
  ],
};

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Events per wing, read from wingsData.js without importing it (it imports images). ──
function readWingEvents(root) {
  const src = fs.readFileSync(path.join(root, 'src/components/wingsData.js'), 'utf8');
  const STR = String.raw`(?:'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)")`;
  const unq = (a, b) => (a ?? b).replace(/\\(.)/g, '$1');
  const blocks = src.slice(src.indexOf('export const WINGS')).split(/\n {2}\{\n {4}id:/).slice(1);
  const byWing = {};
  for (const block of blocks) {
    const t = block.match(new RegExp(String.raw`title:\s*${STR}`));
    if (!t) continue;
    const events = [];
    const re = new RegExp(String.raw`name:\s*${STR},\s*\n\s*venue:\s*${STR}`, 'g');
    for (const m of block.matchAll(re)) events.push({ name: unq(m[1], m[2]), venue: unq(m[3], m[4]) });
    byWing[unq(t[1], t[2])] = events;
  }
  for (const p of WING_PAGES) {
    if (!byWing[p.wing]?.length) throw new Error(`[tcq-seo] no events found in wingsData.js for wing "${p.wing}"`);
  }
  return byWing;
}

// ── Structured data ──
function organization(url) {
  return {
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: SITE.name,
    alternateName: [SITE.shortName, 'TCQ India', 'TCQ Chennai'],
    url: `${url}/`,
    logo: { '@type': 'ImageObject', url: `${url}/icon-512.png`, width: 512, height: 512 },
    image: `${url}/og-image.png`,
    description: HOME.description,
    slogan: SITE.slogan,
    foundingDate: SITE.foundingDate,
    foundingLocation: { '@type': 'Place', name: 'Chennai, Tamil Nadu, India' },
    email: SITE.email,
    telephone: SITE.telephone,
    address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', addressCountry: 'IN' },
    areaServed: { '@type': 'City', name: 'Chennai' },
    founder: { '@id': `${url}/#founder` },
    knowsAbout: ['Quizzing', 'Community building', 'Experiential marketing', 'Education', 'Chennai culture', 'Madras history'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: SITE.email,
      telephone: SITE.telephone,
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
    sameAs: SITE.sameAs,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'What we do',
      itemListElement: WING_PAGES.map((p) => ({
        '@type': 'Offer',
        itemOffered: { '@id': `${url}/${p.slug}#service` },
      })),
    },
  };
}

function founder(url) {
  return {
    '@type': 'Person',
    '@id': `${url}/#founder`,
    name: SITE.founder,
    honorificPrefix: 'Dr.',
    honorificSuffix: 'MBBS, MD',
    jobTitle: 'Founder',
    worksFor: { '@id': `${url}/#organization` },
    homeLocation: { '@type': 'Place', name: 'Chennai' },
  };
}

function website(url) {
  return {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    url: `${url}/`,
    name: SITE.name,
    alternateName: SITE.shortName,
    inLanguage: 'en-IN',
    publisher: { '@id': `${url}/#organization` },
  };
}

function homeGraph(url) {
  return [
    organization(url),
    founder(url),
    website(url),
    {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url: `${url}/`,
      name: HOME.title,
      description: HOME.description,
      isPartOf: { '@id': `${url}/#website` },
      about: { '@id': `${url}/#organization` },
      primaryImageOfPage: `${url}/og-image.png`,
      inLanguage: 'en-IN',
    },
    {
      '@type': 'ItemList',
      name: 'Five wings of The Curiosity Quotient',
      itemListElement: WING_PAGES.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.wing, url: `${url}/${p.slug}` })),
    },
  ];
}

function wingGraph(url, page, events) {
  const pageUrl = `${url}/${page.slug}`;
  return [
    organization(url),
    founder(url),
    website(url),
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${url}/#website` },
      about: { '@id': `${pageUrl}#service` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: `${page.wing} by ${SITE.name}`,
      serviceType: page.h1,
      description: page.description,
      url: pageUrl,
      provider: { '@id': `${url}/#organization` },
      areaServed: { '@type': 'City', name: 'Chennai' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: page.wing,
        itemListElement: page.offers.map((o) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: o } })),
      },
      subjectOf: events.map((e) => ({ '@type': 'CreativeWork', name: e.name, description: e.venue })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${url}/` },
        { '@type': 'ListItem', position: 2, name: page.wing, item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
}

// ── <head> ──
function headHtml({ title, description, keywords, pagePath, graph, ogTitle }, env) {
  const { url, google, bing } = env;
  const pageUrl = url ? `${url}${pagePath}` : '';
  const lines = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="keywords" content="${esc(keywords.join(', '))}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `<meta name="author" content="${SITE.name}" />`,
    '<meta name="geo.region" content="IN-TN" />',
    '<meta name="geo.placename" content="Chennai" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:title" content="${esc(ogTitle || title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(ogTitle || title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
  ];
  if (google) lines.push(`<meta name="google-site-verification" content="${esc(google)}" />`);
  if (bing) lines.push(`<meta name="msvalidate.01" content="${esc(bing)}" />`);
  if (url) {
    lines.push(
      `<link rel="canonical" href="${pageUrl}" />`,
      `<link rel="alternate" hreflang="en-IN" href="${pageUrl}" />`,
      `<link rel="alternate" hreflang="x-default" href="${pageUrl}" />`,
      `<meta property="og:url" content="${pageUrl}" />`,
      `<meta property="og:image" content="${url}/og-image.png" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${SITE.name} logo" />`,
      `<meta name="twitter:image" content="${url}/og-image.png" />`,
      `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph(url) }).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return lines.map((l) => `    ${l}`).join('\n');
}

const homeHead = (env) =>
  headHtml({ ...HOME, pagePath: '/', graph: homeGraph, ogTitle: `${SITE.name} (TCQ) — ${SITE.slogan}` }, env);

const wingHead = (page, events, env) =>
  headHtml(
    {
      title: page.title,
      description: page.description,
      keywords: [...page.keywords, 'The Curiosity Quotient', 'TCQ Chennai'],
      pagePath: `/${page.slug}`,
      graph: (url) => wingGraph(url, page, events),
    },
    env,
  );

// Crawlable copy of a wing page; React replaces it on mount (same pattern as index.html).
function wingFallback(page, events) {
  const others = WING_PAGES.filter((p) => p.slug !== page.slug);
  return `
      <div id="seo-fallback" style="max-width:760px;margin:0 auto;padding:48px 20px;font-family:Outfit,system-ui,sans-serif;color:#382525;background:#FAF3E6;line-height:1.6">
        <header>
          <p><a href="/"><strong>The Curiosity Quotient</strong></a></p>
          <nav aria-label="What we do">${WING_PAGES.map((p) => `<a href="/${p.slug}">${esc(p.wing)}</a>`).join(' · ')} · <a href="/#contact">Contact</a></nav>
        </header>
        <main>
          <nav aria-label="Breadcrumb"><a href="/">Home</a> / ${esc(page.wing)}</nav>
          <h1>${esc(page.h1)}</h1>
          <p><em>${esc(page.lede)}</em></p>
          ${page.body.map((b) => `<p>${esc(b)}</p>`).join('\n          ')}
          <h2>What we do in ${esc(page.wing)}</h2>
          <ul>${page.offers.map((o) => `<li>${esc(o)}</li>`).join('')}</ul>
          <h2>Past events and projects</h2>
          ${events.map((e) => `<h3>${esc(e.name)}</h3><p>${esc(e.venue)}</p>`).join('\n          ')}
          <h2>Questions people ask</h2>
          ${page.faqs.map(([q, a]) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`).join('\n          ')}
          <h2>What could we make together?</h2>
          <p>Email <a href="mailto:${SITE.email}">${SITE.email}</a> or call <a href="tel:+918754400743">+91 87544 00743</a>.</p>
          <h2>Explore the other wings</h2>
          <ul>${others.map((p) => `<li><a href="/${p.slug}">${esc(p.wing)}: ${esc(p.h1)}</a></li>`).join('')}</ul>
        </main>
        <footer><p>The Curiosity Quotient · Chennai, Tamil Nadu, India · ${SITE.sameAs.map((s) => `<a href="${s}">${s.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>`).join(' · ')}</p></footer>
      </div>
    `;
}

const fillWing = (html, page, events, env) =>
  html.replace('<!--seo-head-->', wingHead(page, events, env).trimStart()).replace('<!--seo-fallback-->', wingFallback(page, events));

export default function seo() {
  let root = process.cwd();
  let env = { url: '', google: '', bing: '' };
  let events = {};

  return {
    name: 'tcq-seo',

    config(config, { command }) {
      if (command !== 'build') return;
      const r = config.root || process.cwd();
      return {
        build: {
          rollupOptions: {
            input: { main: path.resolve(r, 'index.html'), wing: path.resolve(r, 'wing.html') },
          },
        },
      };
    },

    configResolved(config) {
      root = config.root;
      const e = loadEnv(config.mode, root, '');
      env = {
        url: (e.SITE_URL || '').trim().replace(/\/+$/, ''),
        google: (e.GOOGLE_SITE_VERIFICATION || '').trim(),
        bing: (e.BING_SITE_VERIFICATION || '').trim(),
      };
      if (env.url && !/^https?:\/\//.test(env.url)) throw new Error(`SITE_URL must start with http(s)://, got "${env.url}"`);
      if (config.command === 'build' && !env.url) {
        config.logger.warn('\n[tcq-seo] SITE_URL is not set: canonical, og:image, JSON-LD and sitemap.xml are skipped.\n');
      }
      events = readWingEvents(root);
    },

    // Dev: serve wing.html at /quizzes, /circles, …
    configureServer(server) {
      const re = new RegExp(`^/(${WING_PAGES.map((p) => p.slug).join('|')})/?(\\?.*)?$`);
      server.middlewares.use((req, _res, next) => {
        if (re.test(req.url)) req.url = '/wing.html';
        next();
      });
    },

    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        if (!ctx.filename.endsWith('wing.html')) return html.replace('<!--seo-head-->', homeHead(env).trimStart());
        // Dev: fill for the requested wing. Build: left for generateBundle, which writes one file per wing.
        if (!ctx.server) return html;
        const slug = (ctx.originalUrl || '').replace(/^\/+|\/?(\?.*)?$/g, '');
        const page = WING_PAGES.find((p) => p.slug === slug) || WING_PAGES[0];
        return fillWing(html, page, events[page.wing], env);
      },
    },

    generateBundle: {
      order: 'post',
      handler(_opts, bundle) {
        // One HTML file per wing from the built template.
        const tpl = bundle['wing.html'];
        if (tpl) {
          const html = String(tpl.source);
          delete bundle['wing.html'];
          for (const page of WING_PAGES) {
            this.emitFile({ type: 'asset', fileName: `${page.slug}.html`, source: fillWing(html, page, events[page.wing], env) });
          }
        }

        const robots = ['User-agent: *', 'Allow: /', ''];
        if (env.url) robots.push(`Sitemap: ${env.url}/sitemap.xml`, '');
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') });

        if (!env.url) return;
        const { url } = env;

        // Photos per wing folder (src/assets/wings/<slug>/…) for the image sitemap.
        const photos = {};
        for (const out of Object.values(bundle)) {
          if (out.type !== 'asset') continue;
          const orig = (out.originalFileNames || []).find((f) => f.includes('assets/wings/'));
          const m = orig && orig.match(/assets\/wings\/([^/]+)\//);
          if (m) (photos[m[1]] ||= []).push(`${url}/${out.fileName}`);
        }

        const today = new Date().toISOString().slice(0, 10);
        const entry = (loc, priority, imgs = []) =>
          `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n` +
          imgs.map((i) => `    <image:image><image:loc>${i}</image:loc></image:image>\n`).join('') +
          '  </url>';
        const sitemap = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
          entry(`${url}/`, '1.0', [`${url}/og-image.png`]),
          ...WING_PAGES.map((p) => entry(`${url}/${p.slug}`, '0.8', (photos[p.slug] || []).sort())),
          '</urlset>',
          '',
        ].join('\n');
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });

        // llms.txt: a plain-text map of the site for AI assistants and answer engines.
        const llms = [
          `# ${SITE.name} (TCQ)`,
          '',
          `> ${HOME.description}`,
          '',
          `TCQ is a culture space in Chennai, India, founded in ${SITE.foundingDate} by ${SITE.founder}. Slogan: "${SITE.slogan}". It has five wings: ${WING_PAGES.map((p) => p.wing).join(', ')}.`,
          '',
          '## Pages',
          '',
          `- [Home](${url}/): ${HOME.description}`,
          ...WING_PAGES.map((p) => `- [${p.wing}](${url}/${p.slug}): ${p.description}`),
          '',
          ...WING_PAGES.flatMap((p) => [
            `## ${p.wing}`,
            '',
            p.lede,
            '',
            ...events[p.wing].map((e) => `- ${e.name}: ${e.venue}`),
            '',
          ]),
          '## Contact',
          '',
          `- Email: ${SITE.email}`,
          `- Phone / WhatsApp: ${SITE.telephone}`,
          ...SITE.sameAs.map((s) => `- ${s}`),
          '',
        ].join('\n');
        this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms });
      },
    },
  };
}
