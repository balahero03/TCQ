import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlobCursor from './BlobCursor';
import drVishnuImg from '../assets/dr_vishnu_aravind.jpg';
import CardSwap, { Card } from './CardSwap';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: '2019', role: 'Red Bull', sub: 'Marketing Ambassador' },
  { year: '2020', role: 'Fully Filmy', sub: 'Content Creator' },
  { year: '2021', role: 'Greater Chennai Corporation', sub: 'Medical Officer during Pandemic' },
  { year: '2023', role: 'Jio Cinemas', sub: 'Fan Commentator for IPL' },
  { year: '2024', role: "R Ashwin's Youtube", sub: 'Content Team' },
  { year: '2025', role: 'Sri Ramachandra Hospital', sub: 'M.D. Preventive Medicine' },
];

function OrganicTimeline() {
  const pinRef = useRef(null);
  const scrollContentRef = useRef(null);
  const pathRef = useRef(null);
  const nodesRef = useRef([]);

  // Calculate layout parameters
  const step = 100 / (timeline.length + 1); // vertical percentage spacing
  
  // Dynamically generate the smooth wavy SVG path and node coordinates
  const { pathData, nodes } = useMemo(() => {
    const d = [`M 50 0`];
    const n = [];
    
    timeline.forEach((item, i) => {
      const isNodeLeft = i % 2 === 0;
      const x = isNodeLeft ? 30 : 70; // Left or Right peak (less extreme width)
      const y = (i + 1) * step;
      
      const prevX = i === 0 ? 50 : (isNodeLeft ? 70 : 30);
      const prevY = i === 0 ? 0 : i * step;
      
      // Smooth cubic bezier curve to next point
      d.push(`C ${prevX} ${prevY + step/2}, ${x} ${y - step/2}, ${x} ${y}`);
      n.push({ x, y, isNodeLeft, data: item });
    });
    
    // Line exiting the bottom
    const lastX = n[n.length - 1].x;
    const lastY = n[n.length - 1].y;
    d.push(`C ${lastX} ${lastY + step/2}, 50 ${lastY + step/2}, 50 100`);
    
    return { pathData: d.join(" "), nodes: n };
  }, []);

  useEffect(() => {
    // GSAP Context for React 18 strict-mode safety
    let ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();
      
      // Setup dash array for DrawSVG effect
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      // Initial state for nodes and content to hide them before scroll
      nodesRef.current.forEach(el => {
        if (!el) return;
        gsap.set(el.querySelector('.organic-node'), { scale: 0, opacity: 0 });
        gsap.set(el.querySelector('.organic-content'), { opacity: 0, y: 30 });
      });

      // Master Timeline for ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${timeline.length * 800}`, // Long scroll distance for scrubbing
          scrub: true, // Direct tracking instead of 1s lag smoothing
          pin: true, // Lock the screen while animating
        }
      });

      // 1. Camera Pan: move the 220vh tall content up by 120vh so we reach the bottom perfectly
      tl.to(scrollContentRef.current, { y: "-120vh", ease: "none", duration: 1 }, 0);

      // 2. Draw the line down over the entire scroll duration
      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      // 3. Trigger node and content reveals exactly when the line reaches them
      nodesRef.current.forEach((el, i) => {
        if (!el) return;
        const nodePoint = el.querySelector('.organic-node');
        const content = el.querySelector('.organic-content');
        
        // Time on the timeline (0 to 1) matches the percentage position.
        const progressTime = (i + 1) * step / 100;

        // Pop the hand-drawn node
        tl.to(nodePoint, {
          scale: 1,
          opacity: 1,
          duration: 0.08,
          ease: "back.out(2)",
        }, progressTime - 0.05);

        // Drift and fade in the content
        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.12,
          ease: "power2.out",
        }, progressTime - 0.03);
      });

    }, pinRef);

    return () => ctx.revert();
  }, [nodes, step]);

  return (
    <div style={{ background: '#FFFFFF' }}>
      <div ref={pinRef} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
        
        {/* Scrolling Canvas (220vh gives HUGE gaps between nodes) */}
        <div ref={scrollContentRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '220vh', willChange: 'transform' }}>
          
          {/* Title Header matching WhatIsTCQ style - now scrolls away naturally */}
          <div style={{ position: 'absolute', top: '7vh', left: '5vw', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '2rem', height: '2px', background: '#8D424E' }} />
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8D424E', fontWeight: 700 }}>
                Journey
              </div>
            </div>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#1F090C', letterSpacing: '-0.04em', lineHeight: 1, textTransform: 'uppercase' }}>
              A Timeline
            </div>
          </div>

          {/* Dynamic Wavy SVG Background */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            {/* Subtle background track */}
            <path d={pathData} fill="none" stroke="rgba(141,66,78,0.1)" strokeWidth="0.5" />
            
            {/* Active animated stroke (vectorEffect removed for 10x performance boost) */}
            <path 
              ref={pathRef} 
              d={pathData} 
              fill="none" 
              stroke="#8D424E" 
              strokeWidth="1.5" 
              strokeLinecap="round"
            />
          </svg>

          {/* Nodes & Alternating Content Blocks */}
          {nodes.map((node, i) => (
            <div
              key={i}
              ref={el => nodesRef.current[i] = el}
              style={{
                position: 'absolute',
                top: `${node.y}%`,
                left: 0,
                width: '100%',
                zIndex: 2,
              }}
            >
              {/* Central Organic Node */}
              <div
                className="organic-node"
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 100,
                  height: 60,
                  background: '#8D424E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  letterSpacing: '0.05em',
                  // Hand-drawn morphing oval shape
                  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                  // Removed box shadow for pure performance
                }}
              >
                {node.data.year}
              </div>

              {/* Alternating Content Block */}
              <div
                className="organic-content"
                style={{
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  // Switch sides based on node position
                  left: node.isNodeLeft ? `${node.x + 8}%` : 'auto',
                  right: !node.isNodeLeft ? `${100 - node.x + 8}%` : 'auto',
                  width: 'clamp(280px, 35vw, 420px)',
                  padding: '2.5rem',
                  background: '#FFFFFF',
                  borderRadius: 24,
                  border: '1px solid rgba(31,9,12,0.1)',
                  // Removed box shadow for pure performance
                  zIndex: 10,
                }}
              >
                <h3 style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)', color: '#1F090C', marginBottom: '0.6rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  {node.data.role}
                </h3>
                <div style={{ width: 40, height: 3, background: '#8D424E', marginBottom: '1rem', borderRadius: 2 }} />
                <p style={{ color: '#383B3D', fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', lineHeight: 1.75, margin: 0 }}>
                  {node.data.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

      {/* GSAP Organic Timeline */}
      <OrganicTimeline />
    </section>
  );
}
