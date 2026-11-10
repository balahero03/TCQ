import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const AUDIENCES = [
  {
    id: 'schools',
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
    label: 'Curious People of Chennai',
    hook: "You're already one of us.\nJoin the community.",
    bullets: [
      'Follow us on social media for events and collaborations',
      'Join our WhatsApp groups and meet fellow curious people',
      'Attend our events and bring something interesting',
    ],
    accentColor: '#D58F6B',
  },
];

// Hairline colour shared by every rule in this section (tab underline,
// bullet separator, and the lines above and below the icon row).
const RULE_COLOR = 'rgba(250, 243, 230, 0.15)';

// The "We like starting there." row: each starter gets a simple line icon.
const STARTERS = [
  {
    text: 'A question.',
    icon: (<><path d="M7.5 8a4.5 4.5 0 1 1 6.6 4c-1.3.7-2.1 1.7-2.1 3.2V16" /><path d="M12 20.5h.01" /></>),
  },
  {
    text: 'A half-formed idea.',
    icon: (<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>),
  },
  {
    text: 'A brand looking for its people.',
    icon: (<><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>),
  },
  {
    text: 'A school looking to do things differently.',
    icon: (<><path d="M22 10v6" /><path d="M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>),
  },
  {
    text: 'An event that deserves a bigger audience.',
    icon: (<><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></>),
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
        color: '#FAF3E6',
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
          <span className="dot-line" aria-hidden="true" />
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
          color: '#FAF3E6',
          margin: '0 0 1rem',
        }}>
          What Could We Make Together?
        </h2>

        <p style={{
          fontSize: 'var(--fs-body)',
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
          display: 'grid',
          gridTemplateColumns: `repeat(${AUDIENCES.length}, 1fr)`,
          marginBottom: '3rem',
          borderBottom: `1px solid ${RULE_COLOR}`,
          paddingBottom: '1rem',
        }}>
          {AUDIENCES.map((audience, idx) => (
            <button
              key={audience.id}
              onClick={() => setActive(idx)}
              style={{
                background: 'none',
                border: 'none',
                color: active === idx ? '#D58F6B' : 'rgba(250, 243, 230, 0.6)',
                fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                fontWeight: active === idx ? 600 : 400,
                cursor: 'pointer',
                padding: '0 0 0.5rem 0',
                transition: 'all 0.3s ease',
                fontFamily: "'Outfit', sans-serif",
                textTransform: 'capitalize',
                textAlign: 'left',
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
              color: '#FAF3E6',
              marginBottom: '1.5rem',
              fontStyle: 'italic',
              fontFamily: "'Newsreader', Georgia, serif",
              whiteSpace: 'pre-line', // hooks can force a line break with \n
            }}>
              {AUDIENCES[active].hook}
            </h3>

            <button
              className="outline-btn"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              style={{ color: '#FAF3E6' }}
            >
              Get in touch
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
              // Same faded cream and 1px weight as the section's horizontal rules
              borderLeft: `1px solid ${RULE_COLOR}`,
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
                    fontSize: 'var(--fs-body)',
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
            borderTop: `1px solid ${RULE_COLOR}`,
          }}
        >
          {/* Horizontal timeline */}
          <div className="callout-lines" style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            alignItems: 'flex-start',
          }}>
            {STARTERS.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  {/* Orange line-drawing icon: no circle, fill or second colour */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D58F6B"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{
                      width: 'clamp(2rem, 3vw, 2.5rem)',
                      height: 'clamp(2rem, 3vw, 2.5rem)',
                      marginBottom: '0.8rem',
                    }}
                  >
                    {item.icon}
                  </svg>

                  {/* Text */}
                  <p style={{
                    fontSize: 'clamp(0.75rem, 0.95vw, 0.95rem)',
                    lineHeight: 1.4,
                    color: '#FAF3E6',
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

          {/* CLOSING STATEMENT - Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              marginTop: 'clamp(1.5rem, 3vh, 2.5rem)',
              paddingTop: '1.5rem',
              borderTop: `1px solid ${RULE_COLOR}`,
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
