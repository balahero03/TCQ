import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const timeline = [
  { year: '2019', role: 'Red Bull', sub: 'Marketing Ambassador' },
  { year: '2020', role: 'Fully Filmy', sub: 'Content Creator' },
  { year: '2021', role: 'Greater Chennai Corporation', sub: 'Medical Officer during Pandemic' },
  { year: '2023', role: 'Jio Cinemas', sub: 'Fan Commentator for IPL' },
  { year: '2024', role: "R Ashwin's Youtube", sub: 'Content Team' },
  { year: '2025', role: 'Sri Ramachandra Hospital', sub: 'M.D. Preventive Medicine' },
];

export default function WhoIsBehind() {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  // Horizontal scroll via vertical scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

  return (
    <section ref={sectionRef} style={{ background: '#fff', paddingBottom: 0 }}>

      {/* Static intro block */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 6vw 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5vw', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#1a1a1a',
                marginBottom: '2rem',
              }}
            >
              WHO IS<br />BEHIND<br /><span style={{ color: '#6B2737' }}>TCQ?</span>
            </motion.h2>

            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                width: 180, height: 220,
                background: 'linear-gradient(135deg, #e8e0d8 0%, #d5cac0 100%)',
                borderRadius: '4px',
                marginBottom: '1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#9a8a7a', fontSize: '0.75rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', border: '1px solid #ccc',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <span>Dr. Vishnu Aravind</span>
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(107,39,55,0.85)',
                padding: '8px 12px',
                color: '#F0EAE2', fontSize: '0.65rem', letterSpacing: '0.05em',
                textAlign: 'center',
              }}>
                Photo Placeholder
              </div>
            </motion.div>
          </div>

          {/* Right: quote + name */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{
                borderLeft: '3px solid #6B2737',
                paddingLeft: '1.5rem',
                marginBottom: '2.5rem',
              }}>
                <p style={{
                  fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                  lineHeight: 1.85,
                  color: '#444',
                  fontStyle: 'italic',
                }}>
                  "Born in the cultural hub of Chennai at the dawn of the millennium and growing up
                  as part of the first generation with technology in our laps, it has been a habit
                  since childhood to seek questions and answers in the living world. The roles I've
                  undertaken, apart from medicine, have been in exploration of this very idea, and I
                  believe they have helped me gain valuable experience in branding and marketing my
                  passions. The Curiosity Quotient is an extension of me and the way I work —
                  connecting people, making them explore niches, and creating new ones."
                </p>
              </div>

              <div>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.02em', color: '#1a1a1a' }}>
                  Dr. VISHNU ARAVIND, MBBS, MD
                </div>
                <div style={{ fontSize: '0.85rem', color: '#6B2737', marginTop: '4px', fontStyle: 'italic' }}>
                  Scientist outside. Artist inside.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling timeline */}
      <div style={{ background: '#6B2737', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw', marginBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(240,234,226,0.6)', marginBottom: '0.5rem' }}
          >
            Journey
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#F0EAE2', letterSpacing: '-0.02em' }}
          >
            A Timeline
          </motion.div>
        </div>

        {/* Timeline track */}
        <div style={{ overflowX: 'auto', paddingBottom: '20px' }} className="timeline-scroll">
          <motion.div
            ref={trackRef}
            style={{ display: 'flex', gap: '0', padding: '0 6vw', width: 'max-content' }}
          >
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setActiveIdx(i)}
                onHoverEnd={() => setActiveIdx(null)}
                style={{
                  width: 200,
                  flexShrink: 0,
                  paddingRight: '3rem',
                  borderRight: i < timeline.length - 1 ? '1px solid rgba(240,234,226,0.15)' : 'none',
                  paddingLeft: i === 0 ? 0 : '3rem',
                  cursor: 'default',
                }}
              >
                {/* Year */}
                <motion.div
                  animate={{ color: activeIdx === i ? '#F0EAE2' : 'rgba(240,234,226,0.4)' }}
                  style={{
                    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    marginBottom: '1rem',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {item.year}
                </motion.div>

                {/* Dot */}
                <motion.div
                  animate={{ background: activeIdx === i ? '#F0EAE2' : 'rgba(240,234,226,0.4)' }}
                  style={{ width: 8, height: 8, borderRadius: '50%', marginBottom: '1rem' }}
                />

                {/* Role */}
                <motion.div
                  animate={{ opacity: activeIdx === i ? 1 : 0.7 }}
                  style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F0EAE2', lineHeight: 1.3, marginBottom: '4px' }}
                >
                  {item.role}
                </motion.div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(240,234,226,0.55)', lineHeight: 1.4 }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline base line */}
        <div style={{ maxWidth: 'calc(6 * 200px + 5 * 6rem)', margin: '1.5rem 6vw 0', height: '1px', background: 'rgba(240,234,226,0.15)' }} />
      </div>
    </section>
  );
}
