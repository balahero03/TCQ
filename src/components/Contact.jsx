import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';

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
        color: '#F7E7C4',
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
        @keyframes ctf-shine {
          0% { background-position: -120% 0; }
          60%,100% { background-position: 220% 0; }
        }
        @keyframes ctf-ghost {
          0%,100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes ctf-pulse {
          0% { box-shadow: 0 0 0 0 rgba(120,220,180,0.5); }
          100% { box-shadow: 0 0 0 9px rgba(120,220,180,0); }
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
        .ctf-marquee-star { color: #D58F6B; padding: 0 0.4rem; }

        .ctf-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 3rem;
          align-items: start;
          padding: clamp(1.5rem, 3vh, 2.5rem) 8vw;
          border-top: 1px solid rgba(240,234,226,0.12);
          position: relative;
          z-index: 2;
        }
        .ctf-col-label {
          font-size: 0.65rem;
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
          font-size: 0.9rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.45rem;
          transition: color 0.25s;
        }
        .ctf-credit-link:hover { color: #F0EAE2; }

        .ctf-cta {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .ctf-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.7) 50%, transparent 70%);
          background-size: 220% 100%;
          animation: ctf-shine 3.5s ease-in-out infinite;
          z-index: -1;
        }

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
          padding: 'clamp(3rem, 8vh, 6rem) 8vw clamp(1.5rem, 3vh, 2.5rem)',
          textAlign: 'center',
        }}
      >
        {/* live status chip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,234,226,0.7)',
            fontWeight: 600,
            marginBottom: '1.4rem',
            padding: '0.4rem 0.95rem',
            border: '1px solid rgba(240,234,226,0.2)',
            borderRadius: 100,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#8ee0b0',
              animation: 'ctf-pulse 1.8s infinite',
            }}
          />
          Open for collaborations
        </motion.div>

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
            color: '#F7E7C4',
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
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
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
          className="ctf-cta"
          variants={fadeUp}
          custom={7}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginTop: '1.8rem',
            padding: '0.85rem 2rem',
            background: '#F7E7C4',
            color: '#382525',
            fontWeight: 700,
            fontSize: '1rem',
            borderRadius: '100px',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          Start a conversation
          <motion.span
            aria-hidden="true"
            style={{ fontSize: '1.1rem', lineHeight: 1 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
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
              <span className="ctf-marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ Info row: brand · reach · credit ════════ */}
      <div className="ctf-row">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.1rem' }}>
            <img src={logoImg} alt="TCQ" style={{ height: 44, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            <div style={{ fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', lineHeight: 1.5, opacity: 0.8 }}>
              The<br />Curiosity<br />Quotient
            </div>
          </div>
          <p style={{ color: 'rgba(240,234,226,0.55)', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 280, margin: 0 }}>
            Making curiosity social since 2023. Quizzes, circles, and stories
            that bring knowledge and people together.
          </p>
        </div>

        {/* Reach us */}
        <div>
          <div className="ctf-col-label">Reach us</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ color: 'rgba(240,234,226,0.45)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Vishnu Aravind
            </div>
            <a href="mailto:thecuriosityquotient@gmail.com" className="ctf-link" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)' }}>
              thecuriosityquotient@gmail.com
            </a>
            <a href="tel:+918754400743" className="ctf-link" style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', color: 'rgba(240,234,226,0.75)' }}>
              +91 87544 00743
            </a>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {/* Instagram */}
              <a href="https://instagram.com/tcq_india" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>

              {/* WhatsApp */}
              <a href="https://api.whatsapp.com/send?phone=918754400743" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <path d="M3 21l1.65-5.27A9 9 0 1 1 20 10.07a9 9 0 0 1-6.68 8.66L3 21"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/the-curiosity-quotient" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* Email */}
              <a href="mailto:thecuriosityquotient@gmail.com" aria-label="Email" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </a>

              {/* Substack */}
              <a href="https://thecuriosityquotient.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="Substack" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <path d="M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"></path>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com/@thecuriosityquotientindia?si=PZKQmduBIacDRWfr" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s ease',
                opacity: 0.7,
              }}
              onMouseEnter={(e) => { e.target.style.opacity = '1'; }}
              onMouseLeave={(e) => { e.target.style.opacity = '0.7'; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" color="#F7E7C4">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Crafted by */}
        <div>
          <div className="ctf-col-label">Crafted by</div>
          <div style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.9rem' }}>
            VoidTheory
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
        style={{
          borderTop: '1px solid rgba(240,234,226,0.1)',
          padding: '1.5rem 8vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span style={{ color: 'rgba(240,234,226,0.35)', fontSize: '0.78rem' }}>
          © 2025 The Curiosity Quotient. Chennai.
        </span>
        <span style={{ color: 'rgba(240,234,226,0.35)', fontSize: '0.78rem', letterSpacing: '0.15em' }}>
          CQ + PQ &gt; IQ
        </span>
      </div>
    </section>
  );
}
