import { useState, lazy, Suspense } from 'react';
import { WINGS } from '../components/wingsData';
import { EXPLORE_PAGE, WING_PAGES } from '../seo/pages';
import { SiteHeader, SiteTagline } from './PageChrome';
import './WingPage.css';

const GalleryModal = lazy(() => import('../components/GalleryModal'));

function EventCard({ event, index, hideIndex }) {
  const [open, setOpen] = useState(false);
  const photos = event.photos.filter((p) => p.src);
  const more = (event.galleryPhotos?.length || 0) > photos.length;

  return (
    <article className="wp-event">
      <header className="wp-event-head">
        {!hideIndex && <span className="wp-event-no">{String(index + 1).padStart(2, '0')}</span>}
        <div>
          <h3 className="wp-event-name">{event.name}</h3>
          <p className="wp-event-venue">{event.venue}</p>
        </div>
      </header>
      {photos.length > 0 && (
        <div className={`wp-photos wp-photos--${event.layout}`}>
          {photos.map((p, i) => (
            <img
              key={i}
              src={p.src}
              alt={`${event.name}, photo ${i + 1}`}
              loading={index === 0 && i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              style={{ aspectRatio: event.layout === 'grid' ? '4 / 5' : `${p.w} / ${p.h}` }}
            />
          ))}
        </div>
      )}
      {more && (
        <button type="button" className="outline-btn wp-event-btn" onClick={() => setOpen(true)}>
          View all {event.galleryPhotos.length} photos
        </button>
      )}
      {open && (
        <Suspense fallback={null}>
          <GalleryModal event={event} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </article>
  );
}

export default function WingPage({ slug }) {
  const page = WING_PAGES.find((p) => p.slug === slug);
  const wing = WINGS.find((w) => w.title === page?.wing);
  if (!page || !wing) return null;
  const others = WING_PAGES.filter((p) => p.slug !== slug);

  return (
    <div className="wp">
      <SiteHeader current={slug} />

      <main>
        <section className="wp-hero">
          <nav className="wp-crumbs" aria-label="Breadcrumb">
            <a href="/">Home</a> <span aria-hidden="true">/</span> <a href={`/${EXPLORE_PAGE.slug}`}>{EXPLORE_PAGE.name}</a>{' '}
            <span aria-hidden="true">/</span> <span aria-current="page">{wing.title}</span>
          </nav>
          <p className="wp-eyebrow"><span className="dot-line" aria-hidden="true" />Wing {wing.no} · {wing.tag}</p>
          <h1 className="wp-h1">
            {page.h1.split(' ').slice(0, -1).join(' ')}{' '}
            <em>{page.h1.split(' ').slice(-1)}</em>
          </h1>
          <p className="wp-lede">{page.lede}</p>
          {page.body.map((para) => <p key={para} className="wp-body">{para}</p>)}
          <div className="wp-hero-ctas">
            <a className="outline-btn" href="/#collaborate">Plan something with us</a>
            {page.externalUrl && (
              <a className="outline-btn" href={page.externalUrl} target="_blank" rel="noopener noreferrer">Read on Substack</a>
            )}
          </div>
        </section>

        <section className="wp-offers" aria-labelledby="wp-offers-title">
          <h2 id="wp-offers-title" className="wp-h2">What we do in {wing.title}</h2>
          <ul>
            {page.offers.map((o) => <li key={o}><span className="wp-dot" aria-hidden="true" />{o}</li>)}
          </ul>
        </section>

        <section className="wp-events" aria-labelledby="wp-events-title">
          <h2 id="wp-events-title" className="wp-h2">{wing.events.length > 1 ? 'Past events and projects' : 'Recent work'}</h2>
          {wing.events.map((ev, i) => (
            <EventCard key={ev.name} event={ev} index={i} hideIndex={ev.hideIndex} />
          ))}
        </section>

        <section className="wp-faq" aria-labelledby="wp-faq-title">
          <h2 id="wp-faq-title" className="wp-h2">Questions people ask</h2>
          {page.faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>


        <nav className="wp-others" aria-label="Other wings">
          <h2 className="wp-h2">Explore the other wings</h2>
          <p className="wp-others-all"><a href={`/${EXPLORE_PAGE.slug}`}>See all five wings <span className="dot-line" aria-hidden="true" /></a></p>
          <ul>
            {others.map((p) => (
              <li key={p.slug}>
                <a href={`/${p.slug}`}>
                  <span className="wp-others-name">{p.wing}</span>
                  <span className="wp-others-desc">{p.h1}</span>
                  <span className="dot-line" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <SiteTagline />
    </div>
  );
}
