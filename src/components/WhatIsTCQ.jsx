import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

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
          min-height: 68vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(80px, 10vh, 120px) 6vw;
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
          font-size: clamp(3rem, 7vw, 7rem);
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
          min-height: 38vh;
        }
        .tcq-content-col {
          padding: 5vh 5vw;
          font-family: 'Outfit', sans-serif;
          font-size: clamp(0.95rem, 1.3vw, 1.1rem);
          line-height: 1.75;
          color: #5a3e3e;
          border-right: 1px solid rgba(56,37,37,0.08);
        }
        .tcq-content-col:last-child { border-right: none; }
        .tcq-content-col p { margin: 0 0 1rem; }
        .tcq-content-col p.lead {
          font-weight: 600;
          color: #382525;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          margin-bottom: 1.25rem;
        }
        .tcq-stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
          border-top: 1px solid rgba(56,37,37,0.1);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }
        .tcq-stat-num {
          font-size: clamp(1.4rem, 2vw, 2rem);
          font-weight: 800;
          color: #382525;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .tcq-stat-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #D58F6B;
          font-weight: 700;
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
        
        .tcq-stats > div {
          transition: transform 0.3s ease, text-shadow 0.3s ease;
          cursor: pointer;
        }
        .tcq-stats > div:hover {
          transform: translateY(-5px);
        }
        .tcq-stats > div:hover .tcq-stat-num {
          text-shadow: 0 0 15px rgba(213, 143, 107, 0.4);
          color: #D58F6B;
          transition: color 0.3s ease, text-shadow 0.3s ease;
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

          <ScrollReveal delay={0.2} className="tcq-content-col">
            <p className="lead tcq-dopamine-text">
              TCQ began in 2023 with a slightly unreasonable yet very practical ask:
            </p>
            <ul style={{ margin: '0 0 1.5rem 1.5rem', color: '#5a3e3e', fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', lineHeight: 1.6 }}>
              <li style={{ paddingBottom: '0.4rem' }}>That learning shouldn’t have to end with a degree.</li>
              <li style={{ paddingBottom: '0.4rem' }}>That curiosity shouldn’t have to be a solitary pursuit.</li>
              <li style={{ paddingBottom: '0.4rem' }}>And that curious people deserve a place to come home to.</li>
            </ul>
            <p>
              There wasn’t anything around, so we started building one.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="tcq-content-col">
            <p>
              Through quizzes, lectures, workshops, conversations and experiments, TCQ has grown into a community of more than 2,000 people brought together by a shared love for curiosity and one simple instinct: the desire to know more. Today, we take that instinct into physical spaces and digital platforms, develop new ways to experience ideas, and collaborate with brands, creators and organisations to turn those ideas into experiences.
            </p>
            <p>
              We celebrate new communities and go beyond simply creating experiential marketing campaigns. We create stories that people will never forget.
            </p>
            <div className="tcq-stats">
              <div>
                <div className="tcq-stat-num"><CountUp to={5} suffix="+" /></div>
                <div className="tcq-stat-label">Wings</div>
              </div>
              <div>
                <div className="tcq-stat-num"><CountUp to={2023} /></div>
                <div className="tcq-stat-label">Found In</div>
              </div>
              <div>
                <div className="tcq-stat-num"><CountUp to={2000} suffix="+" /></div>
                <div className="tcq-stat-label">Curious Cats</div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
