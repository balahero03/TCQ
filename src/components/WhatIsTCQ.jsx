import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function WhatIsTCQ() {
  return (
    <section style={{ background: '#fff', padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>

        {/* Top label row */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: '3rem' }}>
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#6B2737', fontWeight: 600,
          }}>
            Founded 2023 · Chennai
          </span>
        </motion.div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'center' }}>

          {/* Left: text */}
          <div>
            <motion.h2 {...fadeUp(0.1)} style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#1a1a1a',
              marginBottom: '2rem',
            }}>
              WHAT IS<br />
              <span style={{ color: '#6B2737' }}>TCQ?</span>
            </motion.h2>

            <motion.p {...fadeUp(0.2)} style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
              lineHeight: 1.85,
              color: '#444',
              maxWidth: 520,
            }}>
              The Curiosity Quotient (TCQ), founded in 2023, is driven by an idea to make curiosity
              social. At a time when entertainment dominates attention and learning feels
              increasingly solitary, we bring the two together, creating experiences in spaces where
              knowledge, culture, and people collide. Through lectures and quizzes to workshops
              and experimental formats, we have now become a community of more than 2,000
              individuals thriving on knowledge. As TCQ expands across physical spaces, digital
              platforms, and new formats, we continue on our mission to make learning fun.
            </motion.p>

            {/* Stats row */}
            <motion.div {...fadeUp(0.35)} style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
              {[
                { num: '2,000+', label: 'Community Members' },
                { num: '2023', label: 'Founded' },
                { num: '5+', label: 'Event Formats' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: '#6B2737', lineHeight: 1 }}>
                    {num}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: maroon block with TCQ label */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              background: '#6B2737',
              borderRadius: '4px',
              padding: '4rem 3.5rem',
              color: '#F0EAE2',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Background pattern */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(240,234,226,0.06) 0%, transparent 60%)',
              }} />

              <div style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.7, marginBottom: '0.75rem', position: 'relative' }}>
                WHAT IS
              </div>
              <div style={{
                fontSize: 'clamp(5rem, 10vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                position: 'relative',
              }}>
                TCQ
              </div>
              <div style={{
                marginTop: '2rem',
                fontSize: '0.85rem',
                lineHeight: 1.7,
                opacity: 0.75,
                position: 'relative',
              }}>
                Making curiosity social — one question at a time.
              </div>
            </div>

            {/* Floating accent */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: -20, right: -20,
                width: 80, height: 80,
                borderRadius: '50%',
                border: '2px solid rgba(107,39,55,0.2)',
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
