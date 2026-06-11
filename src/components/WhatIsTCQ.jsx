import { useRef } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';

const wordVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(5px)' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      delay: i * 0.12,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  }),
};

const Word = ({ word, index }) => (
  <motion.span
    custom={index}
    variants={wordVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.1, margin: '0px' }}
    style={{ display: 'inline-block' }}
  >
    {word}
  </motion.span>
);

export default function WhatIsTCQ() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} style={{
      background: '#FFFFFF',
      fontFamily: "'Inter', sans-serif",
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

        .tcq-section-grid {
          width: 100%;
        }

        /* ── TOP BAND ── */
        .tcq-top-band {
          padding: 7vh 5vw 3vh 5vw;
          border-bottom: 1px solid rgba(31,9,12,0.08);
        }

        .tcq-eyebrow-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 5vh;
        }
        .tcq-eyebrow-rule {
          width: 2rem;
          height: 2px;
          background: #8D424E;
          flex-shrink: 0;
        }
        .tcq-eyebrow {
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #8D424E;
          font-weight: 700;
        }

        /* ── Heading: words flow freely, line-by-line ── */
        .tcq-heading {
          margin: 0;
          padding: 0;
        }

        /* Each line is a row */
        .tcq-heading-line {
          display: block;
          line-height: 0.88;
          margin-bottom: 0.06em;
        }

        /* Bold sans-serif words */
        .tcq-bold-word {
          font-size: clamp(2.5rem, 9.5vw, 11rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: #1F090C;
          display: inline-block;
          margin-right: 0.2em;
        }
        .tcq-bold-word:last-child {
          margin-right: 0;
        }

        /* Pacifico line — its own dedicated row, pushed right */
        .tcq-cursive-line {
          display: flex;
          justify-content: flex-end;
          padding-right: 1vw;
          margin-top: 0.05em;
        }
        .tcq-cursive-word {
          font-family: 'Pacifico', cursive;
          font-size: clamp(2.2rem, 8.5vw, 10rem);
          font-weight: 400;
          color: #8D424E;
          letter-spacing: -0.01em;
          line-height: 1;
          display: inline-block;
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
          color: #383B3D;
          border-right: 1px solid rgba(31,9,12,0.08);
        }
        .tcq-content-col:last-child { border-right: none; }
        .tcq-content-col p { margin: 0 0 1rem; }
        .tcq-content-col p.lead {
          font-weight: 600;
          color: #1F090C;
          font-size: clamp(1rem, 1.5vw, 1.2rem);
          margin-bottom: 1.25rem;
        }
        .tcq-stats {
          display: flex;
          gap: 2.5rem;
          flex-wrap: wrap;
          border-top: 1px solid rgba(31,9,12,0.1);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }
        .tcq-stat-num {
          font-size: clamp(1.4rem, 2vw, 2rem);
          font-weight: 800;
          color: #1F090C;
          line-height: 1;
          margin-bottom: 0.2rem;
        }
        .tcq-stat-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8D424E;
          font-weight: 700;
        }
        
        .tcq-dopamine-text {
          background: linear-gradient(90deg, #8D424E 0%, #D8838B 50%, #8D424E 100%);
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
          text-shadow: 0 0 15px rgba(141, 66, 78, 0.4);
          color: #8D424E;
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
            font-size: clamp(1.8rem, 10vw, 4.5rem);
          }
          .tcq-cursive-line {
            justify-content: flex-start;
          }
          .tcq-bottom-band {
            grid-template-columns: 1fr;
          }
          .tcq-content-col {
            border-right: none;
            border-bottom: 1px solid rgba(31,9,12,0.08);
            padding: 6vw 5vw;
          }
          .tcq-content-col:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="tcq-section-grid">

        {/* ─── TOP BAND ─── */}
        <div className="tcq-top-band">



          <h2 className="tcq-heading">

            {/* Line 1: WHAT IS */}
            <span className="tcq-heading-line">
              {['WHAT', 'IS'].map((w, i) => (
                <span key={w} className="tcq-bold-word">
                  <Word word={w} index={i} />
                </span>
              ))}
            </span>

            {/* Line 2: THE */}
            <span className="tcq-heading-line">
              <span className="tcq-bold-word">
                <Word word="THE" index={2} />
              </span>
            </span>

            {/* Line 3: CURIOSITY */}
            <span className="tcq-heading-line">
              <span className="tcq-bold-word">
                <Word word="CURIOSITY" index={3} />
              </span>
            </span>

            {/* Line 4: Pacifico "Quotient?" — right-aligned, its own row */}
            <span className="tcq-cursive-line">
              <motion.span
                className="tcq-cursive-word"
                initial={{ opacity: 0, x: 40, rotate: 6 }}
                whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                viewport={{ once: false, amount: 0.1, margin: '0px' }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Quotient?
              </motion.span>
            </span>

          </h2>
        </div>

        {/* ─── BOTTOM BAND ─── */}
        <div className="tcq-bottom-band">

          <ScrollReveal delay={0.2} className="tcq-content-col">
            <p className="lead tcq-dopamine-text">
              The Curiosity Quotient (TCQ), founded in 2023, is driven by an idea to make curiosity social.
            </p>
            <p>
              At a time when entertainment dominates attention and learning feels increasingly solitary, we bring the two together — creating experiences where knowledge, culture, and people collide.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="tcq-content-col">
            <p>
              Through lectures and quizzes to workshops and experimental formats, we have become a community thriving on knowledge. As TCQ expands across spaces and platforms, we continue our mission to make learning fun.
            </p>
            <div className="tcq-stats">
              <div>
                <div className="tcq-stat-num"><CountUp to={2000} suffix="+" /></div>
                <div className="tcq-stat-label">Community</div>
              </div>
              <div>
                <div className="tcq-stat-num"><CountUp to={5} suffix="+" /></div>
                <div className="tcq-stat-label">Formats</div>
              </div>
              <div>
                <div className="tcq-stat-num"><CountUp to={2023} /></div>
                <div className="tcq-stat-label">Founded</div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
