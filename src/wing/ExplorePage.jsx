// "What we do" hub (/what-we-do): one card per wing, each leading to its own page.
import { WINGS } from '../components/wingsData';
import { EXPLORE_PAGE, WING_PAGES } from '../seo/pages';
import { SiteHeader, SiteTagline } from './PageChrome';
import './WingPage.css';

// Pair each wing page with its WINGS entry (tag, blurb, cover photo).
const WINGS_WITH_PAGES = WING_PAGES.map((page) => {
  const wing = WINGS.find((w) => w.title === page.wing);
  const cover = wing.events.flatMap((e) => e.photos).find((p) => p.src);
  return { page, wing, cover };
});

export default function ExplorePage() {
  return (
    <div className="wp">
      <SiteHeader current={EXPLORE_PAGE.slug} />

      <main>
        <section className="wp-hero">
          <nav className="wp-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">{EXPLORE_PAGE.name}</span>
          </nav>
          <p className="wp-eyebrow"><span className="dot-line" aria-hidden="true" />{EXPLORE_PAGE.name}</p>
          <h1 className="wp-h1">
            Five wings, <em>one curiosity.</em>
          </h1>
          <p className="wp-lede">{EXPLORE_PAGE.lede}</p>
        </section>

        <section className="wx-wings" aria-label="The five wings">
          {WINGS_WITH_PAGES.map(({ page, wing, cover }, i) => (
            <article key={page.slug} className="wx-wing">
              <a href={`/${page.slug}`} className="wx-wing-media" tabIndex={-1} aria-hidden="true">
                {cover && (
                  <img src={cover.src} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
                )}
                <span className="wx-wing-no">{wing.no}</span>
              </a>
              <div className="wx-wing-body">
                <p className="wp-eyebrow"><span className="dot-line" aria-hidden="true" />{wing.tag}</p>
                <h2 className="wx-wing-title"><a href={`/${page.slug}`}>{wing.title}</a></h2>
                <p className="wp-body">{wing.blurb}</p>
                <ul className="wx-wing-offers">
                  {page.offers.slice(0, 3).map((o) => <li key={o}><span className="wp-dot" aria-hidden="true" />{o}</li>)}
                </ul>
                <a className="outline-btn wx-wing-cta" href={`/${page.slug}`}>Explore {wing.title}</a>
              </div>
            </article>
          ))}
        </section>

      </main>

      <SiteTagline />
    </div>
  );
}
