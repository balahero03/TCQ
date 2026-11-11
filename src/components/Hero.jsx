import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import logoIconImg from '../assets/brand/logo-icon-brown.webp';
import logoWordmarkImg from '../assets/brand/logo-wordmark-brown.webp';
import TrueFocus from './TrueFocus';
import CatHeroAnimation from './CatHeroAnimation';
import BlurText from './BlurText';
import { EXPLORE_PAGE } from '../seo/pages';
import './Hero.css';

export default function Hero({ logoLanded }) {
  const ref = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const startDelay = 500;

  // Smooth-scroll to a section by id, closing the mobile menu if open.
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      if (target._scrollTrigger) {
        window.scrollTo({
          top: target._scrollTrigger.start,
          behavior: 'smooth'
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // ── Cursor parallax: normalised mouse position (-0.5 … 0.5) ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const handleMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Cursor parallax on the cat drawing
  const catX = useTransform(sx, (v) => v * 28);
  const catY = useTransform(sy, (v) => v * 22);

  return (
    <section ref={ref} className="hero-section" onMouseMove={handleMouseMove}>
      {/* Solid cream background only: no gradient wash or glow orbs */}
      <div className="hero-divider" />

      {/* ── Full-section cat backdrop ── */}
      <motion.div
        className="hero-cat-backdrop"
        style={{ x: catX, y: catY }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 5 }}
        >
          <CatHeroAnimation />
        </motion.div>
        <div className="hero-cat-fade" />
      </motion.div>

      <header className="hero-header">
        <motion.img
          src={logoIconImg}
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: logoLanded ? 1 : 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hero-logo"
        />
        <motion.img
          src={logoWordmarkImg}
          alt="The Curiosity Quotient"
          className="hero-wordmark"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: logoLanded ? 1 : 0, x: logoLanded ? 0 : -8 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        />
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-nav"
        >
          <TrueFocus
            sentence="Who's behind TCQ|What we do|Explore|Collaborate|Contact"
            separator="|"
            links={{ Explore: `/${EXPLORE_PAGE.slug}` }}
            manualMode
            blurAmount={0}
            borderColor="#D58F6B"
            glowColor="rgba(213, 143, 107, 0.3)"
            animationDuration={0.3}
          />
        </motion.nav>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="mobile-menu-btn"
              style={{ position: 'absolute', top: '24px', right: '40px', display: 'block' }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <a href="#who-s-behind-tcq" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); scrollToSection('who-s-behind-tcq'); }}>Who's behind TCQ</a>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <a href="#what-we-do" className="mobile-menu-link" style={{ marginBottom: '4px' }} onClick={(e) => { e.preventDefault(); scrollToSection('what-we-do'); }}>What we do</a>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <a href="#wing-01" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-01'); }}>— Quizzes</a>
                <a href="#wing-02" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-02'); }}>— Circles</a>
                <a href="#wing-03" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-03'); }}>— Collabs</a>
                <a href="#wing-04" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-04'); }}>— Writes</a>
                <a href="#wing-05" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-05'); }}>— Teaches</a>
              </div>
            </div>

            <a href={`/${EXPLORE_PAGE.slug}`} className="mobile-menu-link">Explore</a>
            <a href="#collaborate" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); scrollToSection('collaborate'); }}>Collaborate</a>
            <a href="#contact" className="mobile-menu-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hero-main">
        <div className="hero-left-column">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: startDelay / 1000 }}
            className="hero-typography-container"
          >
            <motion.div
              className="hero-mobile-eyebrow"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (startDelay - 100) / 1000 }}
            >
              <span className="dot-line" aria-hidden="true" />
              <span className="hero-eyebrow-text">The Curiosity Quotient</span>
            </motion.div>

            <h1 className="hero-heading">
              <BlurText text="Making" className="hero-heading-making" initialDelay={startDelay} delay={0} initialBlur="blur(30px)" />
              <BlurText text="Curiosity" className="hero-heading-curiosity hero-curiosity-shimmer" initialDelay={startDelay + 250} delay={0} initialBlur="blur(30px)" />
              <BlurText text="Social" className="hero-heading-social" initialDelay={startDelay + 500} delay={0} initialBlur="blur(30px)" />
            </h1>

            <motion.div
              className="hero-mobile-content-card"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8, delay: (startDelay + 250) / 1000, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero-text-wrapper">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: (startDelay + 300) / 1000 }}
                  className="hero-paragraph"
                >
                  <span className="hero-question-highlight">
                    What if every question was an invitation to discover a new world?
                  </span>
                  The Curiosity Quotient (TCQ) is your gateway to all those worlds under one roof, bringing together knowledge, culture and people to create experiences that make learning feel less like learning and more like discovery.
                  <br /><br />
                  At its heart, TCQ is a culture space. A place for ideas to meet people, for communities to find each other, and for healthy cultures to grow, evolve and discover their place in the microcosm called Chennai.
                </motion.p>
              </div>

              <div className="hero-button-container">
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: (startDelay + 400) / 1000, duration: 0.5 }}
                  className="explore-button"
                  onClick={() => scrollToSection('about-tcq')}
                >
                  Explore TCQ
                </motion.button>
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: (startDelay + 480) / 1000, duration: 0.5 }}
                  className="explore-button-secondary"
                  onClick={() => scrollToSection('who-s-behind-tcq')}
                >
                  Who's behind TCQ
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
