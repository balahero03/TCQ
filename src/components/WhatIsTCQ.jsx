import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

export default function WhatIsTCQ() {
  const containerRef = useRef(null);

  return (
    <section id="about-tcq" ref={containerRef} style={{
      background: '#FAF3E6',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`

        .tcq-section-grid {
          width: 100%;
        }

        /* ── TOP BAND ── fills the upper viewport ── */
        .tcq-top-band {
          position: relative;
          min-height: 50vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(60px, 8vh, 100px) 6vw;
          border-bottom: 1px solid rgba(56,37,37,0.08);
        }

        /* ════════ HEADING — clean editorial statement ════════ */
        .tcq-hero {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* small eyebrow label above the heading */
        .tcq-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: clamp(1.5rem, 4vh, 3rem);
        }
        .tcq-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--orange-deep);
          font-weight: 700;
        }

        /* the heading itself — one tight refined statement */
        .tcq-heading {
          margin: 0;
          padding: 0;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: clamp(3.2rem, 7.6vw, 7.6rem);
          line-height: 1.12;
          color: #382525;
        }
        /* the accent phrase in Newsreader italic — restrained serif highlight.
           "the Curiosity Quotient?" is long enough that it must be free to
           wrap at any viewport width — never force it onto one line. */
        .tcq-heading .accent {
          font-family: 'Newsreader', Georgia, serif;
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.02em;
          color: var(--orange-deep);
          font-size: 1em;
          line-height: normal;
          display: inline-block;
          padding: 0.1em 0.1em 0.4em 0.1em;
          white-space: normal;
        }

        /* ── BOTTOM BAND: content grid ── */
        .tcq-bottom-band {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: auto;
        }
        .tcq-content-col {
          padding: 4vh 5vw;
          font-family: 'Outfit', sans-serif;
          font-size: var(--fs-body);
          line-height: 1.85;
          color: #5a3e3e;
          border-right: 1px solid rgba(56,37,37,0.08);
        }
        .tcq-content-col:last-child { border-right: none; }
        .tcq-content-col--intro {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 1.5rem;
        }
        .tcq-ask-list {
          margin: 0 0 0 1.5rem;
          padding: 0;
          color: #5a3e3e;
          font-size: var(--fs-body);
          line-height: 1.6;
        }
        .tcq-ask-list li { padding-bottom: 1.2rem; }
        .tcq-ask-list li::marker { color: #D58F6B; }
        .tcq-content-col p { margin: 0 0 1rem; }
        .tcq-content-col p.lead {
          font-weight: 600;
          color: #382525;
          font-size: clamp(1.25rem, 1.8vw, 1.7rem);
          line-height: 1.3;
          margin-bottom: 1.8rem;
        }
        /* ── inline stats strip at bottom of right column ── */
        .tcq-stats-strip {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(56,37,37,0.1);
        }
        .tcq-strip-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 80px;
        }
        .tcq-strip-stat--center {
          align-items: center;
          flex: 1;
          padding: 0 0.5rem;
        }
        .tcq-strip-num {
          font-size: clamp(1.4rem, 2.2vw, 2rem);
          font-weight: 800;
          color: #382525;
          line-height: 1;
        }
        .tcq-strip-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--orange-deep);
          font-weight: 700;
          margin-top: 0.2rem;
        }
        .tcq-strip-badge {
          width: clamp(52px, 5vw, 72px);
          height: clamp(52px, 5vw, 72px);
        }
        .tcq-strip-badge svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }

        .tcq-dopamine-text {
          background: linear-gradient(90deg, #382525 0%, #D58F6B 50%, #382525 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          /* Heading block: no half-screen band, same gutter as every section */
          .tcq-top-band {
            min-height: 0;
            padding: var(--m-section-y) var(--m-gutter) 1.5rem;
            border-bottom: none;
          }
          .tcq-heading > span { margin-top: 0 !important; }
          .tcq-heading .accent { padding: 0.05em 0 0.15em; line-height: 1.1; }
          .tcq-bottom-band {
            grid-template-columns: 1fr;
          }
          .tcq-content-col {
            border-right: none;
            padding: 0 var(--m-gutter) 2rem;
            line-height: 1.7;
          }
          .tcq-content-col:last-child { padding-bottom: var(--m-section-y); }
          .tcq-content-col--intro { gap: 1rem; }
          .tcq-content-col p.lead { font-size: 1.25rem; margin-bottom: 1.25rem; }
          .tcq-ask-list { margin-left: 1.1rem; }
          .tcq-ask-list li { padding-bottom: 0.75rem; }
          .tcq-content-col--intro > p {
            padding-bottom: 2rem;
            border-bottom: 1px solid rgba(56,37,37,0.08);
          }
          /* Stats: three equal, centred columns */
          .tcq-stats-strip {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
          }
          .tcq-strip-stat,
          .tcq-strip-stat--center {
            align-items: center !important;
            min-width: 0;
            padding: 0;
            text-align: center;
          }
        }
      `}</style>

      <div className="tcq-section-grid">

        {/* ─── TOP BAND ─── */}
        <div className="tcq-top-band">

          <motion.div
            className="tcq-hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1, margin: '0px' }}
          >
            <motion.div
              className="tcq-eyebrow-row m-eyebrow"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <span className="dot-line" aria-hidden="true" />
              <span className="tcq-eyebrow">About TCQ</span>
            </motion.div>

            <h2 className="tcq-heading m-title">
              <motion.span
                style={{ display: 'inline-block', position: 'relative', zIndex: 2 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                WHAT IS
              </motion.span>
              <br />
              <motion.span
                style={{ display: 'inline-block', position: 'relative', zIndex: 1, marginTop: '-0.3em' }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <span className="accent">The Curiosity Quotient?</span>
              </motion.span>
            </h2>
          </motion.div>
        </div>

        {/* ─── BOTTOM BAND ─── */}
        <div className="tcq-bottom-band">

          <ScrollReveal delay={0.2} className="tcq-content-col tcq-content-col--intro">
            <div>
              <p className="lead tcq-dopamine-text">
                TCQ began in 2023 with a very practical ask:
              </p>
              <ul className="tcq-ask-list">
                <li>That learning shouldn’t have to end with a degree.</li>
                <li>That curiosity shouldn’t have to be a solitary pursuit.</li>
                <li>And that curious people deserve a place to come home to.</li>
              </ul>
            </div>
            <p style={{ margin: 0, color: '#5a3e3e' }}>
              There wasn't anything around, so we started building one.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="tcq-content-col">
            <p>
              What began with a quiz slowly became a gathering of people who liked knowing things simply because they were interesting. Over time, that grew into a community of more than 2,000 curious people, brought together by conversations, question marks, rabbit holes and the occasional obsession with something wonderfully niche.
            </p>
            <p>
              Since then, TCQ has found its way into classrooms, auditoriums, cafés, galleries, streets and screens. We’ve built quizzes, started discussions, brought unlikely people together, explored new corners of the city and made room for new people that deserved to be seen and heard.
            </p>
            <p>
              We’re still figuring out how to bracket it into one title. That, perhaps, is the point.
            </p>

            {/* Stats strip */}
            <div className="tcq-stats-strip">
              <div className="tcq-strip-stat">
                <div className="tcq-strip-num"><CountUp to={5} /></div>
                <div className="tcq-strip-label">Wings</div>
              </div>

              <div className="tcq-strip-stat tcq-strip-stat--center">
                <div className="tcq-strip-num">2023</div>
                <div className="tcq-strip-label">Found</div>
              </div>

              <div className="tcq-strip-stat" style={{ alignItems: 'flex-end' }}>
                <div className="tcq-strip-num"><CountUp to={2000} suffix="+" /></div>
                <div className="tcq-strip-label">Curious Cats</div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
