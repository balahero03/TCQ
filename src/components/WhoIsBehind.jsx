import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import BlobCursor from './BlobCursor';
import drVishnuImg from '../assets/dr_vishnu_aravind.jpg';
import CardSwap, { Card } from './CardSwap';

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
  const introContainerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(null);

  // Horizontal scroll via vertical scroll for timeline
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Vertical scroll progress for sticky text reveal
  const { scrollYProgress: introProgress } = useScroll({
    target: introContainerRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-55%']);

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

  const Word = ({ word, index, style }) => (
    <motion.span
      custom={index}
      variants={wordVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: '0px' }}
      style={{ display: 'inline-block', ...style }}
    >
      {word}
    </motion.span>
  );

  return (
    <section ref={sectionRef} style={{ background: '#F7EAEB', paddingBottom: 0, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'clip' }}>

      <style>{`
        .wib-container {
          position: relative;
          z-index: 1;
          padding: 120px 6vw 80px;
          overflow: hidden;
        }
        .wib-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 5vw;
          align-items: center;
        }
        .wib-left-col {
          flex: 1 1 400px;
        }
        .wib-right-col {
          flex: 1 1 450px;
          height: 500px;
          position: relative;
        }
        
        @media (max-width: 768px) {
          .wib-container {
            padding: 80px 5vw 40px;
          }
          .wib-grid {
            gap: 4rem;
          }
          .wib-left-col {
            flex: 1 1 100%;
          }
          .wib-right-col {
            flex: 1 1 100%;
            height: 450px; 
            margin-top: 2rem;
          }
        }

        @media (max-width: 480px) {
          .wib-container {
            padding: 60px 5vw 30px;
          }
          .wib-right-col {
            height: 420px; 
            margin-top: 1rem;
          }
        }
      `}</style>

      <BlobCursor
        blobType="circle"
        fillColor="rgba(141, 66, 78, 0.08)"
        innerColor="rgba(141, 66, 78, 0.15)"
        shadowColor="rgba(141, 66, 78, 0.1)"
        zIndex={0}
      />

      {/* Static intro block with CardSwap */}
      <div className="wib-container">
        <div className="wib-grid">
          
          {/* Left: Heading & Profile Pic */}
          <div className="wib-left-col">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              src={drVishnuImg}
              alt="Dr. Vishnu Aravind"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '1.5rem',
                border: '3px solid #8D424E',
                boxShadow: '0 8px 24px rgba(141, 66, 78, 0.25)'
              }}
            />
            <h2
              style={{
                fontSize: 'clamp(2.8rem, 10vw, 7rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#1F090C',
                marginBottom: '3rem',
              }}
            >
              <div style={{ display: 'block', marginBottom: '0.06em' }}>
                <Word word="WHO" index={0} style={{ marginRight: '0.2em' }} />
                <Word word="IS" index={1} />
              </div>
              <div style={{ display: 'block', marginBottom: '0.06em' }}>
                <Word word="BEHIND" index={2} />
              </div>
              <div style={{ display: 'block' }}>
                <Word word="TCQ?" index={3} style={{ 
                  color: '#8D424E', 
                  fontFamily: "'Georgia', 'Playfair Display', serif", 
                  fontStyle: 'italic',
                  fontWeight: 400
                }} />
              </div>
            </h2>

            <div>
              <div style={{ fontWeight: 800, fontSize: '1.3rem', letterSpacing: '0.02em', color: '#1F090C' }}>
                Dr. VISHNU ARAVIND, MBBS, MD
              </div>
              <div style={{ fontSize: '0.85rem', color: '#8D424E', marginTop: '4px', fontStyle: 'italic', fontFamily: "'Georgia', 'Playfair Display', serif" }}>
                Scientist outside. Artist inside.
              </div>
            </div>
          </div>

          {/* Right: CardSwap */}
          <div className="wib-right-col">
            <CardSwap
              width="100%"
              height="100%"
              cardDistance={60}
              verticalDistance={70}
              delay={2500}
              pauseOnHover={true}
              easing="linear"
            >
              <Card style={{ padding: 'clamp(1.5rem, 6vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#1F090C', color: '#F7EAEB' }}>
                <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', marginBottom: '1rem', fontWeight: 800, color: '#F7EAEB' }}>The Roots</h3>
                <p style={{ lineHeight: 1.6, opacity: 0.9, fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                  "Born in the cultural hub of Chennai at the dawn of the millennium and growing up as part of the first generation with technology in our laps, it has been a habit since childhood to seek questions and answers in the living world."
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.5rem, 6vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F7EAEB', color: '#1F090C' }}>
                <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', marginBottom: '1rem', fontWeight: 800, color: '#1F090C' }}>The Journey</h3>
                <p style={{ lineHeight: 1.6, opacity: 0.9, fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                  "The roles I've undertaken, apart from medicine, have been in exploration of this very idea, and I believe they have helped me gain valuable experience in branding and marketing my passions."
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.5rem, 6vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#8D424E', color: '#F7EAEB' }}>
                <h3 style={{ fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', marginBottom: '1rem', fontWeight: 800, color: '#F7EAEB' }}>The Vision</h3>
                <p style={{ lineHeight: 1.6, opacity: 0.9, fontSize: 'clamp(0.95rem, 4vw, 1.1rem)' }}>
                  "The Curiosity Quotient is an extension of me and the way I work — connecting people, making them explore niches, and creating new ones."
                </p>
              </Card>
            </CardSwap>
          </div>

        </div>
      </div>

      {/* Horizontal scrolling timeline */}
      <div style={{ position: 'relative', zIndex: 1, background: '#1F090C', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw', marginBottom: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}
          >
            Journey
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}
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
                viewport={{ once: false, amount: 0.1, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onHoverStart={() => setActiveIdx(i)}
                onHoverEnd={() => setActiveIdx(null)}
                style={{
                  width: 200,
                  flexShrink: 0,
                  paddingRight: '3rem',
                  borderRight: i < timeline.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  paddingLeft: i === 0 ? 0 : '3rem',
                  cursor: 'default',
                }}
              >
                {/* Year */}
                <motion.div
                  animate={{ color: activeIdx === i ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}
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
                  animate={{ background: activeIdx === i ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}
                  style={{ width: 8, height: 8, borderRadius: '50%', marginBottom: '1rem' }}
                />

                {/* Role */}
                <motion.div
                  animate={{ opacity: activeIdx === i ? 1 : 0.7 }}
                  style={{ fontWeight: 700, fontSize: '0.95rem', color: '#FFFFFF', lineHeight: 1.3, marginBottom: '4px' }}
                >
                  {item.role}
                </motion.div>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 }}>
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline base line */}
        <div style={{ maxWidth: 'calc(6 * 200px + 5 * 6rem)', margin: '1.5rem 6vw 0', height: '1px', background: 'rgba(255,255,255,0.15)' }} />
      </div>
    </section>
  );
}
