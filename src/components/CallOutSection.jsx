import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AUDIENCES = [
  {
    id: 'schools',
    emoji: '🎓',
    label: 'Schools, Colleges & Learning Spaces',
    hook: 'Got students who ask too many questions? Good.',
    bullets: [
      'Host quizzes and knowledge experiences',
      'Curate learning spaces and experiences',
      'Moderate conversations with students',
      'Teach real-life skills through projects',
      'Design alternative learning programmes',
    ],
    accentColor: '#D58F6B',
  },
  {
    id: 'brands',
    emoji: '✦',
    label: 'Brands & Companies',
    hook: "Want to meet your audience somewhere more interesting than an ad?",
    bullets: [
      'Create integrated physical and digital campaigns',
      'Collaborate with existing events around your brand',
      'Set up focus groups and community conversations',
      'Curate learning festivals of interest',
      'Tap into our organically built community',
    ],
    accentColor: '#E8C4A0',
  },
  {
    id: 'events',
    emoji: '◎',
    label: 'Event Organisers & Cultural Curators',
    hook: 'Making something worth knowing about?',
    bullets: [
      'Collaborate with you as a publicity partner',
      'Market your event through our audiences',
      'Create long-form pre- and post-event stories',
    ],
    accentColor: '#C4956A',
  },
  {
    id: 'curious',
    emoji: '?',
    label: 'Curious People of Chennai',
    hook: "You're already one of us. Join the community.",
    bullets: [
      'Follow us on social media for events and collaborations',
      'Join our WhatsApp groups and meet fellow curious people',
      'Attend our events and bring something interesting',
    ],
    accentColor: '#D58F6B',
  },
];

export default function CallOutSection() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);

  return (
    <section
      id="collaborate"
      ref={containerRef}
      style={{
        background: '#2e1c1c',
        color: '#F7E7C4',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(60px, 10vh, 100px) 6vw',
      }}
    >
      {/* Ambient glow orbs */}
      <div style={{
        position: 'absolute', width: 500, height: 500,
        borderRadius: '50%', top: '-15%', right: '-10%',
        background: 'radial-gradient(circle, rgba(213,143,107,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        borderRadius: '50%', bottom: '10%', left: '-8%',
        background: 'radial-gradient(circle, rgba(213,143,107,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
          <div style={{ width: '2.5rem', height: '2px', background: '#D58F6B' }} />
          <span style={{
            fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D58F6B',
          }}>
            Collaborate With TCQ
          </span>
        </div>

        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          color: '#F7E7C4',
          margin: '0 0 1rem',
        }}>
          What Could We{' '}
          <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#D58F6B' }}>Make Together?</span>
        </h2>

        <p style={{
          fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
          lineHeight: 1.6,
          color: '#D3B8A8',
          marginBottom: '3rem',
          maxWidth: '600px',
        }}>
          You came here. You like us. Join the party.
        </p>
      </motion.div>

      {/* TABS + CONTENT GRID */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>

        {/* TABS */}
        <div style={{
          display: 'flex',
          gap: 'clamp(1rem, 2vw, 2rem)',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(247, 231, 196, 0.15)',
          paddingBottom: '1rem',
          flexWrap: 'wrap',
        }}>
          {AUDIENCES.map((audience, idx) => (
            <button
              key={audience.id}
              onClick={() => setActive(idx)}
              style={{
                background: 'none',
                border: 'none',
                color: active === idx ? '#D58F6B' : 'rgba(247, 231, 196, 0.6)',
                fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                fontWeight: active === idx ? 600 : 400,
                cursor: 'pointer',
                padding: '0 0 0.5rem 0',
                borderBottom: active === idx ? `2px solid #D58F6B` : 'none',
                transition: 'all 0.3s ease',
                fontFamily: "'Outfit', sans-serif",
                textTransform: 'capitalize',
                whiteSpace: 'nowrap',
              }}
            >
              {audience.label.split(' &')[0]}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'start',
        }}>
          {/* LEFT: Hook + CTA */}
          <motion.div
            key={`content-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              paddingRight: 'clamp(1rem, 3vw, 2rem)',
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 600,
              lineHeight: 1.3,
              color: '#F7E7C4',
              marginBottom: '1.5rem',
              fontStyle: 'italic',
              fontFamily: "'Newsreader', Georgia, serif",
            }}>
              {AUDIENCES[active].hook}
            </h3>

            <button style={{
              background: '#D58F6B',
              color: '#2e1c1c',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#E8A47E';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#D58F6B';
              e.target.style.transform = 'translateY(0)';
            }}
            >
              Get in touch →
            </button>
          </motion.div>

          {/* RIGHT: Bullet points */}
          <motion.div
            key={`bullets-${active}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              paddingLeft: 'clamp(1rem, 3vw, 2rem)',
              borderLeft: `2px solid ${AUDIENCES[active].accentColor}`,
            }}
          >
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {AUDIENCES[active].bullets.map((bullet, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  style={{
                    fontSize: 'clamp(0.9rem, 1.1vw, 1rem)',
                    lineHeight: 1.6,
                    color: '#D3B8A8',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{
                    color: AUDIENCES[active].accentColor,
                    marginTop: '0.25rem',
                    fontWeight: 'bold',
                  }}>
                    •
                  </span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* POETIC LINES - BOTTOM - HORIZONTAL TIMELINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            marginTop: 'clamp(3rem, 6vh, 4rem)',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(247, 231, 196, 0.15)',
          }}
        >
          {/* Horizontal timeline */}
          <div style={{
            position: 'relative',
            display: 'flex',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            alignItems: 'flex-start',
            overflow: 'hidden',
          }}>
            {/* Items */}
            <div style={{
              display: 'flex',
              gap: 'clamp(0.5rem, 2vw, 1rem)',
              width: '100%',
            }}>
              {[
                { text: 'A question.', emoji: '?' },
                { text: 'A half-formed idea.', emoji: '💭' },
                { text: 'A brand looking for its people.', emoji: '✦' },
                { text: 'A school looking to do things differently.', emoji: '🎓' },
                { text: 'An event that deserves a bigger audience.', emoji: '◎' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{
                    flex: '1 1 auto',
                    minWidth: 'clamp(100px, 18vw, 180px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Dot indicator */}
                  <div style={{
                    width: 'clamp(2.8rem, 5vw, 3.5rem)',
                    height: 'clamp(2.8rem, 5vw, 3.5rem)',
                    borderRadius: '50%',
                    background: 'rgba(213, 143, 107, 0.15)',
                    border: '2px solid #D58F6B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                    marginBottom: '0.8rem',
                  }}>
                    {item.emoji}
                  </div>

                  {/* Text */}
                  <p style={{
                    fontSize: 'clamp(0.75rem, 0.95vw, 0.95rem)',
                    lineHeight: 1.4,
                    color: '#F7E7C4',
                    fontStyle: 'italic',
                    margin: 0,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CLOSING STATEMENT - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(213, 143, 107, 0.3)',
              textAlign: 'center',
            }}
          >
            <p style={{
              fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
              lineHeight: 1.6,
              color: '#D58F6B',
              fontStyle: 'italic',
              fontWeight: 600,
              margin: 0,
            }}>
              We like starting there.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
