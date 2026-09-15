import { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import logoImg from '../assets/logo.png';
import TrueFocus from './TrueFocus';
import BlobCursor from './BlobCursor';
import CatHeroAnimation from './CatHeroAnimation';
import BlurText from './BlurText';
import './Hero.css';

// Two sparkle silhouettes: a classic 5-point star and a slim 4-point diamond twinkle
const SPARKLE_PATHS = [
  'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  'M12 0C12 6.5 12.5 9 12.5 9C12.5 9 15 9.5 21.5 12C15 14.5 12.5 15 12.5 15C12.5 15 12 17.5 12 24C12 17.5 11.5 15 11.5 15C11.5 15 9 14.5 2.5 12C9 9.5 11.5 9 11.5 9C11.5 9 12 6.5 12 0Z',
];

const SPARKLE_COLORS = ['#382525', '#D58F6B', '#E8D0A0', '#D58F6B'];

const SPARKLES = [
  { top: '10%', left: '52%', size: 14, dur: 3.1, delay: 0.0, rot: 1, c: 1, shape: 1 },
  { top: '18%', left: '68%', size: 24, dur: 3.8, delay: 0.7, rot: -1, c: 0, shape: 0 },
  { top: '14%', left: '86%', size: 12, dur: 2.6, delay: 1.6, rot: 1, c: 2, shape: 1 },
  { top: '30%', left: '96%', size: 18, dur: 3.4, delay: 0.3, rot: -1, c: 2, shape: 0 },
  { top: '40%', left: '58%', size: 10, dur: 2.9, delay: 2.1, rot: 1, c: 3, shape: 1 },
  { top: '46%', left: '84%', size: 22, dur: 4.1, delay: 1.1, rot: -1, c: 1, shape: 0 },
  { top: '58%', left: '95%', size: 15, dur: 3.3, delay: 2.6, rot: 1, c: 0, shape: 1 },
  { top: '64%', left: '66%', size: 13, dur: 2.7, delay: 0.9, rot: -1, c: 3, shape: 1 },
  { top: '72%', left: '88%', size: 20, dur: 3.9, delay: 1.8, rot: 1, c: 2, shape: 0 },
  { top: '80%', left: '58%', size: 11, dur: 3.0, delay: 0.5, rot: -1, c: 1, shape: 1 },
  { top: '24%', left: '58%', size: 8, dur: 2.4, delay: 2.9, rot: 1, c: 3, shape: 1 },
  { top: '52%', left: '70%', size: 9, dur: 2.5, delay: 1.4, rot: -1, c: 0, shape: 1 },
];

// A handful of tiny soft dust specks scattered through the same field, for ambient depth
const DUST = [
  { top: '22%', left: '76%', size: 4, dur: 4.5, delay: 0.2 },
  { top: '36%', left: '62%', size: 3, dur: 5.2, delay: 1.7 },
  { top: '54%', left: '90%', size: 5, dur: 4.8, delay: 0.9 },
  { top: '68%', left: '76%', size: 3, dur: 5.6, delay: 2.4 },
  { top: '12%', left: '92%', size: 4, dur: 4.2, delay: 1.2 },
  { top: '76%', left: '96%', size: 3, dur: 5.0, delay: 0.6 },
];

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

  // Different parallax depths for layered movement
  const orb1X = useTransform(sx, (v) => v * 60);
  const orb1Y = useTransform(sy, (v) => v * 60);
  const orb2X = useTransform(sx, (v) => v * -45);
  const orb2Y = useTransform(sy, (v) => v * -45);
  const catX = useTransform(sx, (v) => v * 28);
  const catY = useTransform(sy, (v) => v * 22);

  return (
    <section ref={ref} className="hero-section" onMouseMove={handleMouseMove}>
      {/* ── Breathing gradient wash ── */}
      <div className="hero-gradient-wash" />
<div className="hero-divider" />

      {/* ── Ambient floating glow orbs (cursor parallax) ── */}
      <motion.div className="hero-orb hero-orb-1" style={{ x: orb1X, y: orb1Y }} />
      <motion.div className="hero-orb hero-orb-2" style={{ x: orb2X, y: orb2Y }} />

      {/* ── Soft ambient dust specks (depth layer behind the sparkles) ── */}
      {DUST.map((d, i) => (
        <motion.span
          key={`dust-${i}`}
          className="hero-dust"
          style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.6, 1, 0.6],
          }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Twinkling sparkle stars (mixed 5-point / 4-point shapes) ── */}
      {SPARKLES.map((s, i) => (
        <motion.svg
          key={i}
          className="hero-sparkle"
          viewBox="0 0 24 24"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size, color: SPARKLE_COLORS[s.c] }}
          animate={{
            opacity: [0, 1, 0.3, 0],
            scale: [0.15, 1.2, 0.65, 0.15],
            rotate: [0, s.rot * 60, s.rot * 150],
            y: [0, -14, 0],
          }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d={SPARKLE_PATHS[s.shape]} fill="currentColor" />
        </motion.svg>
      ))}

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
          src={logoImg}
          alt="TCQ Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: logoLanded ? 1 : 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hero-logo"
        />
        <motion.span
          className="hero-wordmark"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: logoLanded ? 1 : 0, x: logoLanded ? 0 : -8 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.15 }}
        >
        The Curiosity Quotient
        </motion.span>
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-nav"
        >
          <TrueFocus
            sentence="Who's behind TCQ|What we do|Collaborate|Contact"
            separator="|"
            manualMode={false}
            blurAmount={2}
            borderColor="#8D424E"
            glowColor="rgba(141, 66, 78, 0.3)"
            animationDuration={0.8}
            pauseBetweenAnimations={1.5}
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
                <a href="#wing-01" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-01'); }}>— For Brands</a>
                <a href="#wing-02" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-02'); }}>— Quizzes</a>
                <a href="#wing-03" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-03'); }}>— Circles</a>
                <a href="#wing-04" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-04'); }}>— Writes</a>
                <a href="#wing-05" className="mobile-menu-link" style={{ fontSize: '1.25rem', color: '#D58F6B', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); scrollToSection('wing-05'); }}>— Teaches</a>
              </div>
            </div>

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
              <span className="hero-eyebrow-spark">✦</span>
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
                    What if every question on your mind was an invitation to discover a new world?
                  </span>
                  The Curiosity Quotient is a gateway to those worlds — bringing together knowledge, culture and people to create experiences that make learning feel less like learning and more like discovery. From conversations to events and content, to giving new cultures and brands a voice, we give your ideas a Petri dish to grow in, evolve, and become experiences worth having with the community.
                </motion.p>
              </div>

              <div className="hero-button-container">
                <motion.button
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ delay: (startDelay + 400) / 1000, duration: 0.5 }}
                  className="explore-button"
                  onClick={() => scrollToSection('what-we-do')}
                >
                  Explore TCQ
                  <span className="btn-arrow" style={{ color: '#E6BABE', fontSize: '1rem', lineHeight: 1 }}>→</span>
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
