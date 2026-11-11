// Header and footer shared by the plain pages: the "What we do" hub and each wing page.
import { EXPLORE_PAGE, WING_PAGES } from '../seo/pages';
import logoIconBrown from '../assets/brand/logo-icon-brown.webp';
import logoWordmarkBrown from '../assets/brand/logo-wordmark-brown.webp';
import logoLockupWhite from '../assets/brand/logo-lockup-white.webp';

export const EMAIL = 'thecuriosityquotient@gmail.com';
export const WHATSAPP = 'https://api.whatsapp.com/send?phone=918754400743';
const SOCIALS = [
  ['Instagram', 'https://instagram.com/tcq_india'],
  ['LinkedIn', 'https://www.linkedin.com/company/the-curiosity-quotient'],
  ['Substack', 'https://thecuriosityquotient.substack.com/'],
  ['YouTube', 'https://youtube.com/@thecuriosityquotientindia'],
];

// `current` is the slug of the page being shown, to mark its nav link.
export function SiteHeader({ current }) {
  const mark = (slug) => (slug === current ? 'page' : undefined);
  return (
    <header className="wp-header">
      <a href="/" className="wp-logo" aria-label="The Curiosity Quotient home">
        <img src={logoIconBrown} alt="" className="wp-logo-icon" />
        <img src={logoWordmarkBrown} alt="The Curiosity Quotient" className="wp-logo-word" />
      </a>
      <nav className="wp-nav" aria-label="Site">
        <a href={`/${EXPLORE_PAGE.slug}`} className="wp-nav-explore" aria-current={mark(EXPLORE_PAGE.slug)}>Explore</a>
        {WING_PAGES.map((p) => (
          <a key={p.slug} href={`/${p.slug}`} aria-current={mark(p.slug)}>{p.wing}</a>
        ))}
        <a href="/#contact" className="wp-nav-cta">Contact</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="wp-footer">
      <img src={logoLockupWhite} alt="The Curiosity Quotient" className="wp-footer-logo" loading="lazy" />
      <div className="wp-footer-cols">
        <div>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="tel:+918754400743">+91 87544 00743</a>
          <span>Chennai, Tamil Nadu, India</span>
        </div>
        <div>
          <a href={`/${EXPLORE_PAGE.slug}`}>{EXPLORE_PAGE.name}</a>
          {WING_PAGES.map((p) => <a key={p.slug} href={`/${p.slug}`}>{p.wing}</a>)}
        </div>
        <div>
          {SOCIALS.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
          ))}
        </div>
      </div>
      <p className="wp-footer-note">© {new Date().getFullYear()} The Curiosity Quotient · <a href="/">Making Curiosity Social</a></p>
    </footer>
  );
}

export function SiteTagline() {
  return (
    <p className="wp-tagline">
      <a href="/">Making Curiosity Social</a>
    </p>
  );
}
