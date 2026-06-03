import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const services = [
  {
    num: '01',
    title: 'TCQ',
    subtitle: 'FOR BRANDS',
    body: `Our collaboration with brands has enabled them to build meaningful communities and
connect with their audiences through highly engaging, interactive, learning-led
experiences. Community encounters in real spaces offer a deeper and longer-lasting
impact than the short-lived nature of modern marketing.

We curate the right partnerships, foster collaborations within our network, and design
both live and digital formats centered on knowledge. Our evergrowing community
further amplifies reach, remaining our greatest strength.`,
    accent: true,
  },
  {
    num: '02',
    title: 'TCQ',
    subtitle: 'QUIZZES',
    body: `At TCQ, every question blends a puzzle with a story, so participants leave not just
with results, but with stories they remember for life.

With nearly 15 years of experience, we also specialize in marketing and seamlessly
integrating brands into our quizzes, expanding into innovative formats.`,
    accent: false,
  },
  {
    num: '03',
    title: 'TCQ',
    subtitle: 'CIRCLES',
    body: `TCQ Circles is our flagship monthly live event series featuring lectures, panel
discussions, interviews, workshops, and curated performances that are experimental
to the mainstream. Designed for a limited audience, it serves as a platform where
diverse fields intersect and engage with new niches.

Our first season in 2025 was a crazy mix of unexplored topics and conversations,
kickstarting a culture of curiosity.`,
    accent: true,
  },
  {
    num: '04',
    title: 'TCQ',
    subtitle: 'WRITES',
    body: `TCQ Writes is our newsletter, run by a dedicated team that lets you experience the
city vicariously, celebrating Chennai as the melting pot of cultures and new
experiences. We spotlight events and stories often overlooked by mainstream media,
presenting them in the most impactful format — blogging.

We have collaborated with small brands and artists, continually seeking out voices
that represent the city in its truest form.`,
    accent: false,
  },
  {
    num: '05',
    title: 'TCQ',
    subtitle: 'TEACHES',
    body: `TCQ's origins lie in working with schools and colleges to cultivate healthier learning
practices and essential skills, including a foundation in quizzing, public speaking,
and the performing arts by partnering with prestigious institutions across Chennai.

Through this, we ensure that curiosity and critical thinking are nurtured from a young
age, and continue for the rest of their lives.`,
    accent: true,
  },
];

export default function Services() {
  return (
    <section style={{ background: '#faf9f8', padding: '120px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '5rem' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B2737', fontWeight: 600 }}>
            What We Do
          </span>
          <h2 style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800,
            letterSpacing: '-0.03em', color: '#1a1a1a', marginTop: '0.75rem',
          }}>
            Our Formats
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr 1.2fr' : '1.2fr 1fr',
        gap: '4vw',
        alignItems: 'center',
      }}
    >
      {/* Number + label block */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div style={{
          background: '#6B2737',
          borderRadius: '4px',
          padding: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 20% 80%, rgba(240,234,226,0.12) 0%, transparent 60%)',
            }}
          />
          <div style={{
            fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 900, color: 'rgba(240,234,226,0.2)',
            lineHeight: 1, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.05em',
            position: 'relative',
          }}>
            {service.num}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900,
              color: '#F0EAE2', lineHeight: 1, letterSpacing: '-0.03em',
            }}>
              {service.title}
            </div>
            <div style={{
              fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'rgba(240,234,226,0.6)', marginTop: '6px',
            }}>
              {service.subtitle}
            </div>
          </div>
        </div>
      </div>

      {/* Text block */}
      <div style={{ order: isEven ? 1 : 0 }}>
        <p style={{
          fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
          lineHeight: 1.85,
          color: '#444',
          whiteSpace: 'pre-line',
        }}>
          {service.body}
        </p>
      </div>
    </motion.div>
  );
}
