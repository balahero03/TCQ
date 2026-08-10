import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AUDIENCES = [
  {
    id: 'schools',
    emoji: 'ðŸŽ“',
    label: 'Schools, Colleges & Learning Spaces',
    hook: 'Got students who ask too many questions? Good.',
    intro: 'If you run a school, college or alternative learning space',
    cta: "Let's make learning more curious.",
    bullets: [
      'Host quizzes and knowledge experiences',
      'Curate learning spaces and experiences within your existing thematics',
      'Moderate conversations with students',
      'Teach real-life skills through projects and experiences beyond the exam',
      'Design alternative learning programmes and syllabi',
    ],
    expanded:
      "Bring us in to host quizzes, curate learning experiences, moderate conversations, introduce real-life skills through projects, or build an alternative programme around something worth knowing. We work with educational spaces to create experiences that give students more reasons to ask, explore and think.",
    accentColor: '#D58F6B',
  },
  {
    id: 'brands',
    emoji: 'âœ¦',
    label: 'Brands & Companies',
    hook: "Want to meet your audience somewhere more interesting than an ad?",
    intro: "If you're a brand or company looking to find your audience",
    cta: "Let's build something people want to be part of.",
    bullets: [
      'Create integrated physical and digital campaigns',
      'Collaborate with existing events around your brand or USP',
      'Set up focus groups and community conversations',
      'Curate learning festivals of interest',
      'Tap into our organically built community',
    ],
    expanded:
      "Let's build experiences around what your brand stands for. We can create physical or digital campaigns, collaborate around events, conduct focus groups, curate learning festivals and bring our community into the mix. Finding your audience is just the beginning. Making yourself immortal in their shared lives on the other hand.....",
    accentColor: '#E8C4A0',
  },
  {
    id: 'events',
    emoji: 'â—Ž',
    label: 'Event Organisers & Cultural Curators',
    hook: 'Making something worth knowing about?',
    intro: "If you're creating a knowledge-led event or experience in Chennai",
    cta: "Let's help more people discover it.",
    bullets: [
      'Collaborate with you as a publicity partner',
      'Market your event or festival through our audiences',
      'Create long-form pre- and post-event stories and reviews through TCQ Writes',
    ],
    expanded:
      "From publicity partnerships and audience outreach to long-form stories and reviews through TCQ Writes, we can help your experience travel further.",
    accentColor: '#C4956A',
  },
  {
    id: 'curious',
    emoji: '?',
    label: 'Curious People of Chennai',
    hook: "You're already one of us.",
    intro: "If you're a curious citizen of Chennai",
    cta: "Come be part of the community.",
    bullets: [
      'Follow us on social media for events, stories and collaborations.',
      'Join our WhatsApp groups and meet fellow curious people.',
      "Be around for one of our events, you won't regret it. Or bring us something interesting.",
    ],
    expanded:
      "Follow TCQ on social media, join our WhatsApp groups, come to our events and find people who are just as curious about the world as you are.",
    accentColor: '#D58F6B',
  },
];

const POETIC_LINES = [
  'A question.',
  'A half-formed idea.',
  'A brand looking for its people.',
  'A school looking to do things differently.',
  'An event that deserves a bigger audience.',
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

      {/* â”€â”€ HERO HEADER â”€â”€ */}
      <div style={{
        padding: 'clamp(80px, 10vh, 120px) 6vw clamp(50px, 6vh, 80px)',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2.5rem', height: '2px', background: '#D58F6B' }} />
            <span style={{
              fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.3em', textTransform: 'uppercase', color: '#D58F6B',
            }}>
              Collaborate With TCQ
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#F7E7C4',
            margin: '0 0 1.5rem',
          }}>
            What Could We{' '}
            <span style={{
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#D58F6B',
            }}>
              Make Together?
            </span>
          </h2>

          <p style={{
            fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
            color: 'rgba(247,231,196,0.65)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            You came here. You like us. Join the party.
          </p>
        </motion.div>
      </div>

      {/* â”€â”€ AUDIENCE TABS + PANEL â”€â”€ */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 6vw',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Tab row */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          borderBottom: '1px solid rgba(247,231,196,0.1)',
          paddingBottom: '0',
        }}>
          {AUDIENCES.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.85rem 1.4rem',
                fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
                fontWeight: active === i ? 700 : 400,
                color: active === i ? '#D58F6B' : 'rgba(247,231,196,0.45)',
                borderBottom: active === i ? '2px solid #D58F6B' : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'all 0.25s',
                letterSpacing: '0.01em',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (active !== i) e.currentTarget.style.color = 'rgba(247,231,196,0.75)'; }}
              onMouseLeave={e => { if (active !== i) e.currentTarget.style.color = 'rgba(247,231,196,0.45)'; }}
            >
              {a.label}
            </button>
          ))}
        </div>

        {/* Active Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(2rem, 5vw, 5rem)',
              alignItems: 'start',
              padding: 'clamp(2rem, 4vh, 3.5rem) 0 clamp(3rem, 6vh, 5rem)',
            }}
          >
            {/* Left: intro + bullets */}
            <div>
              <p style={{
                fontSize: 'clamp(0.78rem, 1vw, 0.85rem)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: AUDIENCES[active].accentColor,
                fontWeight: 700,
                marginBottom: '1rem',
              }}>
                {AUDIENCES[active].intro}
              </p>
              <h3 style={{
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                color: '#F7E7C4',
                lineHeight: 1.2,
                marginBottom: '2rem',
                letterSpacing: '-0.01em',
              }}>
                {AUDIENCES[active].cta}
              </h3>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {AUDIENCES[active].bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem',
                      fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                      color: 'rgba(247,231,196,0.85)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{
                      width: '6px', height: '6px',
                      borderRadius: '50%',
                      background: AUDIENCES[active].accentColor,
                      flexShrink: 0,
                      marginTop: '0.5em',
                    }} />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Right: hook + expanded desc */}
            <div style={{
              background: 'rgba(247,231,196,0.04)',
              border: '1px solid rgba(247,231,196,0.08)',
              borderRadius: '20px',
              padding: 'clamp(1.8rem, 3vw, 2.8rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}>
              <span style={{
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                lineHeight: 1,
                display: 'block',
                marginBottom: '0.25rem',
                opacity: 0.6,
              }}>
                {AUDIENCES[active].emoji}
              </span>
              <h4 style={{
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                color: '#F7E7C4',
                lineHeight: 1.3,
                margin: 0,
              }}>
                {AUDIENCES[active].hook}
              </h4>
              <div style={{ width: '2.5rem', height: '2px', background: AUDIENCES[active].accentColor }} />
              <p style={{
                fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                color: 'rgba(247,231,196,0.7)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {AUDIENCES[active].expanded}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* â”€â”€ POETIC INTERLUDE â”€â”€ */}
      <div style={{
        borderTop: '1px solid rgba(247,231,196,0.08)',
        borderBottom: '1px solid rgba(247,231,196,0.08)',
        padding: 'clamp(4rem, 8vh, 6rem) 6vw',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'center',
        }}>
          {/* Left: lines */}
          <div>
            {POETIC_LINES.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: i === 0 ? 'rgba(247,231,196,0.9)' : `rgba(247,231,196,${0.9 - i * 0.1})`,
                  lineHeight: 1.3,
                  margin: '0 0 0.5rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Right: sign off */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
              color: '#D58F6B',
              fontStyle: 'italic',
              lineHeight: 1.6,
              margin: '0 0 2rem',
            }}>
              We like starting there.
            </p>
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#D58F6B',
                color: '#2e1c1c',
                padding: '14px 28px',
                borderRadius: '4px',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'background 0.25s, gap 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c07a55'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#D58F6B'; }}
            >
              Get in touch â†’
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 820px) {
          #collaborate [style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #collaborate button {
            font-size: 0.78rem !important;
            padding: 0.6rem 0.9rem !important;
          }
        }
      `}</style>
    </section>
  );
}


