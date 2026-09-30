import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import logoImg from '../assets/logo.webp';

export default function WhatIsTCQ() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} style={{
      background: '#F7E7C4',
      fontFamily: "'Outfit', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Newsreader:ital,wght@0,400;0,700;1,400;1,700&display=swap');

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

        .tcq-founded-badge {
          position: absolute;
          top: clamp(28px, 4vh, 52px);
          right: 6vw;
          width: clamp(104px, 9vw, 136px);
          height: clamp(104px, 9vw, 136px);
          filter: drop-shadow(0 10px 24px rgba(56, 37, 37, 0.18));
        }
        .tcq-founded-badge svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }
        .tcq-founded-orbit {
          animation: tcq-badge-spin 28s linear infinite;
          transform-origin: 50px 50px;
        }
        @keyframes tcq-badge-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 900px) {
          .tcq-founded-badge {
            display: none;
          }
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
        .tcq-eyebrow-rule {
          width: 2.5rem;
          height: 2px;
          background: #D58F6B;
        }
        .tcq-eyebrow {
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #D58F6B;
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
          background: linear-gradient(120deg, #382525 0%, #D58F6B 60%, #382525 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
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
          font-size: clamp(1rem, 1.25vw, 1.2rem);
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
          font-size: clamp(1.1rem, 1.6vw, 1.45rem);
          line-height: 1.5;
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
          color: #D58F6B;
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
          .tcq-top-band {
            padding: 10vw 5vw 5vw;
          }
          .tcq-bold-word {
            font-size: clamp(2rem, 11vw, 5rem);
          }
          .tcq-cursive-word {
            font-size: clamp(1.8rem, 9vw, 4rem);
          }
          .tcq-bottom-band {
            grid-template-columns: 1fr;
          }
          .tcq-content-col {
            border-right: none;
            border-bottom: 1px solid rgba(56,37,37,0.08);
            padding: 6vw 5vw;
          }
          .tcq-content-col:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="tcq-section-grid">

        {/* ─── TOP BAND ─── */}
        <div className="tcq-top-band">

          <motion.div
            className="tcq-founded-badge"
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="tcq-badge-arc" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
              </defs>

              {/* dashed orbit ring */}
              <circle
                className="tcq-founded-orbit"
                cx="50" cy="50" r="42"
                fill="none"
                stroke="#382525"
                strokeOpacity="0.22"
                strokeWidth="1"
                strokeDasharray="1 5"
                strokeLinecap="round"
              />

              {/* orbiting label */}
              <g className="tcq-founded-orbit">
                <text fontFamily="'Outfit', sans-serif" fontSize="7" fontWeight="700" letterSpacing="2.5" fill="#382525">
                  <textPath href="#tcq-badge-arc" startOffset="0%">
                    EST · 2023 · CHENNAI ·
                  </textPath>
                </text>
              </g>

              {/* solid medallion behind the logo */}
              <circle cx="50" cy="50" r="29" fill="#D58F6B" />
              <clipPath id="tcq-badge-clip">
                <circle cx="50" cy="50" r="29" />
              </clipPath>
              <image
                href={logoImg}
                x="24" y="24"
                width="52" height="52"
                clipPath="url(#tcq-badge-clip)"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          </motion.div>

          <motion.div
            className="tcq-hero"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1, margin: '0px' }}
          >
            <motion.div
              className="tcq-eyebrow-row"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <span className="tcq-eyebrow-rule" />
              <span className="tcq-eyebrow">About TCQ</span>
            </motion.div>

            <h2 className="tcq-heading">
              <motion.span
                style={{ display: 'inline-block', position: 'relative', zIndex: 2 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                What is
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
              We’re still figuring out on how to bracket it into one title. That, perhaps, is the point.
            </p>

            {/* Stats strip */}
            <div className="tcq-stats-strip">
              <div className="tcq-strip-stat">
                <div className="tcq-strip-num"><CountUp to={5} suffix="+" /></div>
                <div className="tcq-strip-label">Wings</div>
              </div>

              <div className="tcq-strip-stat tcq-strip-stat--center">
                <div className="tcq-strip-label" style={{ marginTop: 0, marginBottom: '0.2rem' }}>Found In</div>
                <div className="tcq-strip-num">2023</div>
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
