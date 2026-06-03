import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TCQLogoSVG } from './IntroAnimation';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        minHeight: '100vh',
        background: '#6B2737',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px',
      }} />

      {/* Animated radial glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: '60vw', height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,234,226,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <motion.div style={{ y, opacity, display: 'flex', alignItems: 'center', gap: '2.5rem', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <TCQLogoSVG size={120} color="#F0EAE2" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ color: '#F0EAE2', textAlign: 'left' }}
        >
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            letterSpacing: '0.35em',
            lineHeight: 1.5,
            textTransform: 'uppercase',
          }}>
            THE<br />CURIOSITY<br />QUOTIENT
          </div>
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.9 }}
        style={{
          position: 'absolute', bottom: '12%',
          color: 'rgba(240,234,226,0.55)',
          fontStyle: 'italic',
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          letterSpacing: '0.1em',
          zIndex: 1,
        }}
      >
        Curiosity never killed the cat, it raised a family of cats instead.
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute', bottom: '5%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'rgba(240,234,226,0.4)', fontSize: '0.65rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', zIndex: 1,
        }}
      >
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 30, background: 'rgba(240,234,226,0.4)' }}
        />
      </motion.div>
    </section>
  );
}
