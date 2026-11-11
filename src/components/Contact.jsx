import { motion } from 'framer-motion';
import logoLockupImg from '../assets/brand/logo-lockup-white.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Per-letter pop for the big word
const letterContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const letter = {
  hidden: { opacity: 0, y: '60%', rotate: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { type: 'spring', stiffness: 280, damping: 18 },
  },
};

const lineIcon = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 };
const solidIcon = { width: 24, height: 24, viewBox: '0 0 24 24', fill: 'currentColor' };

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/tcq_india',
    icon: (
      <svg {...lineIcon}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=918754400743',
    icon: <svg {...solidIcon}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/the-curiosity-quotient',
    icon: (
      <svg {...lineIcon}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:thecuriosityquotient@gmail.com',
    icon: (
      <svg {...lineIcon}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Substack',
    href: 'https://thecuriosityquotient.substack.com/',
    icon: <svg {...solidIcon}><path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" /></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@thecuriosityquotientindia?si=PZKQmduBIacDRWfr',
    icon: (
      <svg {...lineIcon}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
        background:
          'radial-gradient(120% 90% at 50% -10%, #3d2929 0%, #2e1c1c 45%, #1a0f0f 100%)',
        color: '#FAF3E6',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <style>{`
        @keyframes ctf-float-a {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(40px,-30px) scale(1.12); }
        }
        @keyframes ctf-float-b {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-50px,25px) scale(1.08); }
        }
        @keyframes ctf-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ctf-marquee-group { display: inline-flex; align-items: center; }
        @keyframes ctf-ghost {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .ctf-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          pointer-events: none;
          z-index: 0;
        }

        .ctf-link {
          position: relative;
          color: #F0EAE2;
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .ctf-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -3px;
          width: 100%; height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .ctf-link:hover::after { transform: scaleX(1); }

        .ctf-marquee-wrap {
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: clamp(0.6rem, 1.6vh, 1.2rem) 0;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
                  mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent);
        }
        .ctf-marquee-track {
          display: inline-flex;
          white-space: nowrap;
          animation: ctf-marquee 40s linear infinite;
          will-change: transform;
        }
        .ctf-marquee-wrap:hover .ctf-marquee-track { animation-play-state: paused; }
        .ctf-marquee-item {
          font-size: clamp(1rem, 2.2vw, 1.7rem);
          font-weight: 700;
          letter-spacing: -0.01em;
          color: rgba(240,234,226,0.9);
          padding: 0 1.4rem;
        }
        .ctf-marquee-item .soft {
          color: rgba(240,234,226,0.4);
          font-weight: 300;
          font-style: italic;
        }
        .ctf-marquee-dot {
          flex-shrink: 0;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #D58F6B;
          margin: 0 0.4rem;
        }

        /* Info row + bottom bar use exactly two text sizes:
           --ctf-fs (all content) and --ctf-fs-sm (column labels, copyright).
           The footer logo's height is tied to --ctf-fs so its wordmark capitals
           match the "CQ + PQ > IQ" line (wordmark cap height = 0.143 × logo
           height; Outfit cap height ≈ 0.7em). --ctf-gap spaces every stacked item. */
        /* Side gutter for every footer block; phones share the site-wide one. */
        #contact { --ctf-gutter: 8vw; }
        @media (max-width: 768px) {
          #contact { --ctf-gutter: var(--m-gutter); }
        }

        .ctf-row, .ctf-bottom {
          --ctf-fs: 1.125rem;
          --ctf-fs-sm: 0.75rem;
          --ctf-gap: 0.6rem;
          --ctf-logo-h: calc(var(--ctf-fs) * 0.7 / 0.143);
        }
        .ctf-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 3rem;
          align-items: start;
          padding: clamp(1.5rem, 3vh, 2.5rem) var(--ctf-gutter);
          border-top: 1px solid rgba(240,234,226,0.12);
          position: relative;
          z-index: 2;
        }
        .ctf-col-label {
          font-size: var(--ctf-fs-sm);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(240,234,226,0.45);
          margin-bottom: 1.4rem;
        }
        .ctf-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #F0EAE2;
          font-size: 0.9rem;
          text-decoration: none;
          border: 1px solid rgba(240,234,226,0.25);
          border-radius: 100px;
          padding: 0.55rem 1.2rem;
          width: fit-content;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ctf-pill:hover {
          background: rgba(240,234,226,0.1);
          border-color: rgba(240,234,226,0.55);
          transform: translateY(-2px);
        }
        .ctf-credit-link {
          color: rgba(240,234,226,0.6);
          font-size: var(--ctf-fs);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: color 0.25s;
        }
        .ctf-credit-link:hover { color: #F0EAE2; }

        .ctf-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #FAF3E6;
          transition: color 0.25s ease;
        }
        .ctf-social:hover { color: #D58F6B; }

        @media (max-width: 820px) {
          .ctf-row {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>

      {/* ── Ambient floating glow orbs ── */}
      <div className="ctf-orb" style={{ width: 360, height: 360, top: '-8%', left: '-6%', background: 'rgba(213,143,107,0.18)', animation: 'ctf-float-a 14s ease-in-out infinite' }} />
      <div className="ctf-orb" style={{ width: 300, height: 300, bottom: '4%', right: '8%', background: 'rgba(74,48,48,0.6)', animation: 'ctf-float-b 18s ease-in-out infinite' }} />

      {/* ── Giant animated ghost wordmark ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(9rem, 26vw, 26rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            whiteSpace: 'nowrap',
            lineHeight: 0.8,
            userSelect: 'none',
            transform: 'translateY(18%)',
            background: 'linear-gradient(90deg, rgba(240,234,226,0.02), rgba(240,234,226,0.07), rgba(240,234,226,0.02))',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: 'ctf-ghost 8s ease-in-out infinite',
          }}
        >
          TCQ
        </span>
      </div>

      {/* ════════ HERO CTA — head of the footer ════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
          padding: 'clamp(3rem, 8vh, 6rem) var(--ctf-gutter) clamp(1.5rem, 3vh, 2.5rem)',
          textAlign: 'center',
        }}
      >
        <motion.h2
          variants={letterContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#FAF3E6',
            margin: 0,
            lineHeight: 0.92,
          }}
        >
          <span style={{ display: 'inline-block' }}>
            {'THINK'.split('').map((c, i) => (
              <motion.span key={i} variants={letter} style={{ display: 'inline-block' }}>
                {c}
              </motion.span>
            ))}
          </span>
          <br />
          <motion.span
            variants={fadeUp}
            custom={4}
            style={{
              display: 'inline-block',
              fontStyle: 'italic',
              fontWeight: 400,
              fontFamily: "'Newsreader', Georgia, serif",
              color: '#D58F6B',
            }}
          >
            with us
          </motion.span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={6}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            fontSize: 'var(--fs-body)',
            color: 'rgba(240,234,226,0.7)',
            maxWidth: 520,
            margin: '1.2rem auto 0',
            lineHeight: 1.6,
          }}
        >
          Ready to make curiosity social? Reach out and let's build something
          remarkable together.
        </motion.p>

        <motion.a
          href="mailto:thecuriosityquotient@gmail.com"
          className="outline-btn"
          variants={fadeUp}
          custom={7}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{ color: '#FAF3E6', marginTop: '1.8rem' }}
        >
          Start a conversation
        </motion.a>
      </div>

      {/* ════════ Kinetic tagline marquee (endless) ════════ */}
      <div className="ctf-marquee-wrap">
        <div className="ctf-marquee-track">
          {Array.from({ length: 8 }).map((_, dup) => (
            <span key={dup} className="ctf-marquee-group" aria-hidden={dup !== 0}>
              <span className="ctf-marquee-item">
                Curiosity never killed a cat — <span className="soft">it raised a family of cats instead.</span>
              </span>
              <span className="ctf-marquee-dot" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* ════════ Info row: brand · reach · credit ════════ */}
      <div className="ctf-row">
        {/* Brand: the formula spans exactly the logo's width (fit-content
            wrapper), its parts spread evenly so both edges line up. */}
        <div style={{ alignSelf: 'center', width: 'fit-content' }}>
          {/* Official lockup (icon + wordmark) from the brand PNG, cropped tight */}
          <img
            src={logoLockupImg}
            alt="The Curiosity Quotient"
            style={{ display: 'block', height: 'var(--ctf-logo-h)', width: 'auto', marginBottom: 'var(--ctf-gap)' }}
          />
          <div
            aria-label="CQ + PQ > IQ"
            style={{ display: 'flex', justifyContent: 'space-between', color: '#D58F6B', fontSize: 'var(--ctf-fs)', fontWeight: 700, letterSpacing: '0.1em', lineHeight: 1 }}
          >
            {['CQ', '+', 'PQ', '>', 'IQ'].map((part, i, all) => (
              // the last part drops its trailing letter-spacing so it ends flush
              <span key={i} aria-hidden="true" style={i === all.length - 1 ? { marginRight: '-0.1em' } : undefined}>
                {part}
              </span>
            ))}
          </div>
        </div>

        {/* Reach us */}
        <div>
          <div className="ctf-col-label">Reach us</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ctf-gap)' }}>
            <div style={{ color:'white', fontSize: 'var(--ctf-fs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Vishnu Aravind
            </div>
            <a href="mailto:thecuriosityquotient@gmail.com" className="ctf-link" style={{ fontSize: 'var(--ctf-fs)' }}>
              thecuriosityquotient@gmail.com
            </a>
            <a href="tel:+918754400743" className="ctf-link" style={{ fontSize: 'var(--ctf-fs)', color: 'rgba(240,234,226,0.75)' }}>
              +91 87544 00743
            </a>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="ctf-social"
                  {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Crafted by */}
        <div>
          <div className="ctf-col-label">Crafted by</div>
          <div style={{ fontSize: 'var(--ctf-fs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--ctf-gap)' }}>
            VoidTheory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ctf-gap)' }}>
            <a href="https://instagram.com/voidtheory_it" target="_blank" rel="noopener noreferrer" className="ctf-credit-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
              @voidtheory_it
            </a>
            <a href="mailto:voidtheoryit@gmail.com" className="ctf-credit-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
              voidtheoryit@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ════════ Bottom bar ════════ */}
      <div
        className="ctf-bottom"
        style={{
          borderTop: '1px solid rgba(240,234,226,0.1)',
          padding: '1.5rem var(--ctf-gutter)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ color: 'rgba(240,234,226,0.35)', fontSize: 'var(--ctf-fs-sm)' }}>
          © {new Date().getFullYear()} The Curiosity Quotient. Chennai.
        </span>
      </div>
    </section>
  );
}
