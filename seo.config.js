// Build-time SEO for the single-page site.
//
// Everything that needs an absolute URL (canonical, og:url, og:image, JSON-LD,
// sitemap.xml) is generated from SITE_URL, read from the environment or a .env file:
//   SITE_URL=https://example.com npm run build
// Without SITE_URL the build still works but skips those tags and the sitemap,
// and prints a warning: never ship a production build without it.
import { loadEnv } from 'vite';

export const SITE = {
  name: 'The Curiosity Quotient',
  shortName: 'TCQ',
  description:
    'The Curiosity Quotient (TCQ) is a Chennai culture space bringing together knowledge, culture and people through quizzes, community circles, brand collabs, writing and learning experiences for schools and colleges.',
  foundingDate: '2023',
  email: 'thecuriosityquotient@gmail.com',
  telephone: '+91-87544-00743',
  founder: { name: 'Dr. Vishnu Aravind', jobTitle: 'Founder' },
  sameAs: [
    'https://instagram.com/tcq_india',
    'https://www.linkedin.com/company/the-curiosity-quotient',
    'https://thecuriosityquotient.substack.com/',
    'https://youtube.com/@thecuriosityquotientindia',
  ],
  // The five wings, used as the organisation's offer catalogue.
  services: [
    ['Quizzes', 'Quizzes for cafés, schools, colleges and brands across Chennai.'],
    ['Circles', 'Community conversations where people with shared interests find each other.'],
    ['Collabs', 'Discovery-led experiences and campaigns for brands and cultural organisations.'],
    ['Writes', 'Long-form writing about Chennai’s newest cultures, icons and trends on Substack.'],
    ['Teaches', 'Workshops and learning programmes for schools and colleges beyond the syllabus.'],
  ],
};

function jsonLd(url) {
  const org = `${url}/#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: `${url}/`,
        logo: { '@type': 'ImageObject', url: `${url}/icon-512.png`, width: 512, height: 512 },
        image: `${url}/og-image.png`,
        description: SITE.description,
        slogan: 'Making Curiosity Social',
        foundingDate: SITE.foundingDate,
        email: SITE.email,
        telephone: SITE.telephone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        areaServed: { '@type': 'City', name: 'Chennai' },
        founder: { '@type': 'Person', name: SITE.founder.name, jobTitle: SITE.founder.jobTitle },
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
          itemListElement: SITE.services.map(([name, description]) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name, description, areaServed: 'Chennai' },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url: `${url}/`,
        name: SITE.name,
        alternateName: SITE.shortName,
        inLanguage: 'en-IN',
        publisher: { '@id': org },
      },
    ],
  };
}

export default function seo() {
  let siteUrl = '';
  let isBuild = false;

  return {
    name: 'tcq-seo',
    configResolved(config) {
      isBuild = config.command === 'build';
      const env = loadEnv(config.mode, config.root, '');
      siteUrl = (env.SITE_URL || '').trim().replace(/\/+$/, '');
      if (siteUrl && !/^https?:\/\//.test(siteUrl)) {
        throw new Error(`SITE_URL must start with http(s)://, got "${siteUrl}"`);
      }
      if (isBuild && !siteUrl) {
        config.logger.warn(
          '\n[tcq-seo] SITE_URL is not set: canonical, og:url, og:image, JSON-LD and sitemap.xml are skipped.\n' +
            '          Set it in .env or the environment before a production build.\n',
        );
      }
    },
    transformIndexHtml() {
      if (!siteUrl) return [];
      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' });
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
        meta({ property: 'og:url', content: `${siteUrl}/` }),
        meta({ property: 'og:image', content: `${siteUrl}/og-image.png` }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: 'The Curiosity Quotient logo' }),
        meta({ name: 'twitter:image', content: `${siteUrl}/og-image.png` }),
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd(siteUrl)),
          injectTo: 'head',
        },
      ];
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ''];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, '');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') });

      if (!siteUrl) return;
      const lastmod = new Date().toISOString().slice(0, 10);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
    },
  };
}
