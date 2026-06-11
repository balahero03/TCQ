import { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import drVishnuImg from '../assets/dr_vishnu_aravind.jpg';
import CardSwap, { Card } from './CardSwap';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// `img: null` is a placeholder — drop a real image in (import from
// ../assets/timeline/<file> and replace null) and it appears automatically
// in the open space beside each milestone as it unlocks.
const timeline = [
  { year: '2019', role: 'Red Bull', sub: 'Marketing Ambassador', img: null },
  { year: '2020', role: 'Fully Filmy', sub: 'Content Creator', img: null },
  { year: '2021', role: 'Greater Chennai Corporation', sub: 'Medical Officer during Pandemic', img: null },
  { year: '2023', role: 'Jio Cinemas', sub: 'Fan Commentator for IPL', img: null },
  { year: '2024', role: "R Ashwin's Youtube", sub: 'Content Team', img: null },
  { year: '2025', role: 'Sri Ramachandra Hospital', sub: 'M.D. Preventive Medicine', img: null },
];

function OrganicTimeline() {
  const pinRef = useRef(null);
  const scrollContentRef = useRef(null);
  const pathRef = useRef(null);
  const runnerRef = useRef(null);
  const nodesRef = useRef([]);

  // Calculate layout parameters
  const step = 100 / (timeline.length + 1); // vertical percentage spacing
  
  // Dynamically generate the smooth wavy SVG path and node coordinates
  const { pathData, nodes } = useMemo(() => {
    const d = [`M 50 0`];
    const n = [];

    timeline.forEach((item, i) => {
      const isNodeLeft = i % 2 === 0;
      const x = isNodeLeft ? 25 : 75; // Increased width (wider path)
      const y = (i + 1) * step;
      
      const prevX = i === 0 ? 50 : (isNodeLeft ? 75 : 25);
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
  }, [step]);

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
        const img = el.querySelector('.organic-image');
        if (img) gsap.set(img, { opacity: 0, y: 30, scale: 0.85 });
      });

      // Master Timeline for ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${timeline.length * 800}`, // Long scroll distance for scrubbing
          scrub: 0.5, // 0.5 gives a tight, extremely responsive but smoothed scroll feel
          pin: true, // Lock the screen while animating
        }
      });

      // 1. Camera Pan: move the 220vh tall content up by 120vh so we reach the bottom perfectly
      tl.to(scrollContentRef.current, { y: "-120vh", ease: "none", duration: 1 }, 0);

      // 2. Draw the line down over the entire scroll duration
      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0);

      // 3. Animate spacecraft along the path in sync with drawing
      gsap.set(runnerRef.current, { opacity: 1 });
      tl.to(runnerRef.current, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5], // Center the spacecraft on the line
          autoRotate: 90, // Points the nose of the upward-facing rocket down the path
          start: 0,
          end: 1,
        },
        ease: "none",
        duration: 1,
      }, 0);

      // 4. Trigger node and content reveals exactly when the line reaches them
      nodesRef.current.forEach((el, i) => {
        if (!el) return;
        const nodePoint = el.querySelector('.organic-node');
        const content = el.querySelector('.organic-content');
        const image = el.querySelector('.organic-image');
        const particles = el.querySelectorAll('.burst-particle');
        
        // Time on the timeline (0 to 1) matches the percentage position.
        const progressTime = (i + 1) * step / 100;

        // Celebration Particle Burst!
        if (particles.length > 0) {
          tl.fromTo(particles, 
            { opacity: 1, scale: 1.5, x: "-50%", y: "-50%" },
            { 
              opacity: 0, 
              scale: 0.2,
              x: (idx, target) => {
                const angle = parseInt(target.getAttribute('data-angle'));
                return `calc(-50% + ${Math.cos(angle * Math.PI / 180) * 50}px)`;
              },
              y: (idx, target) => {
                const angle = parseInt(target.getAttribute('data-angle'));
                return `calc(-50% + ${Math.sin(angle * Math.PI / 180) * 50}px)`;
              },
              ease: "power2.out", 
              duration: 0.1 
            }, 
            progressTime - 0.02
          );
        }

        // Pop the hand-drawn node
        tl.to(nodePoint, {
          scale: 1,
          opacity: 1,
          ease: "back.out(2)",
          duration: 0.05
        }, progressTime - 0.02);

        // Slide in the content block
        tl.to(content, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.1
        }, progressTime - 0.02);

        // Reveal the milestone image in the open space opposite the content
        if (image) {
          tl.to(image, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.6)",
            duration: 0.12
          }, progressTime - 0.02);
        }
      });

      // 5. Final Cinematic U-Turn Fly-Off Sequence
      // Break away, perform a swooping 180-degree U-turn, and blast off to the top-left
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      tl.to(runnerRef.current, {
        motionPath: {
          path: [
            { x: `+=${ww * 0.10}`, y: `+=${wh * 0.15}` }, // Drop down and right (anticipation)
            { x: `+=${ww * 0.30}`, y: `-=${wh * 0.10}` }, // Sweep wide to the right and turn up
            { x: 0,                y: `-=${wh * 0.50}` }, // Cross back over the center
            { x: `-=${ww * 1.5}`,  y: `-=${wh * 1.5}` }   // Warp speed out top-left
          ],
          curviness: 1.5,
          autoRotate: 90 // Seamlessly tracks the 180-degree curve
        },
        scale: 150, // Massive cinematic scale
        filter: "blur(20px)", // Realistic motion blur
        ease: "power4.in", // Smooth entry, extreme exit velocity
        duration: 0.45 // Cinematic duration
      }, ">");

      // Fade out at the absolute last moment
      tl.to(runnerRef.current, {
        opacity: 0,
        ease: "power2.in",
        duration: 0.05
      }, "<0.40");

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
          {/* Removed SVG filter: drop-shadow for massive performance boost and stutter elimination */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            {/* Subtle background track */}
            <path d={pathData} fill="none" stroke="rgba(141,66,78,0.1)" strokeWidth="0.3" />
            
            {/* Decorative dashed background track (Widened dashes dramatically to eliminate GPU rendering lag) */}
            <path d={pathData} fill="none" stroke="rgba(141,66,78,0.1)" strokeWidth="0.2" strokeDasharray="16 24" transform="translate(1.5, 0)" />

            {/* Active animated stroke (Hardware Accelerated) */}
            <path 
              ref={pathRef} 
              d={pathData} 
              fill="none" 
              stroke="#8D424E" 
              strokeWidth="0.8" 
              strokeLinecap="round"
              style={{ willChange: 'stroke-dashoffset, stroke-dasharray' }}
            />
          </svg>

          {/* 3D Spacecraft traveling along the path */}
          <div 
            ref={runnerRef} 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '36px', 
              height: '36px',
              zIndex: 30,
              opacity: 0,
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform' // Forces GPU acceleration
            }}
          >
            <svg viewBox="0 0 32 32" width="100%" height="100%" style={{ overflow: 'visible' }}>
              {/* Spacecraft drop shadow */}
              <ellipse cx="16" cy="18" rx="8" ry="12" fill="rgba(141,66,78,0.25)" />
              {/* Glow */}
              <ellipse cx="16" cy="16" rx="14" ry="14" fill="rgba(141,66,78,0.15)" />
              
              {/* Animated Engine Flame */}
              <g className="rocket-flame" style={{ transformOrigin: "16px 26px" }}>
                 <path d="M 12 26 C 12 26 16 36 20 26 Z" fill="#E67E22" />
                 <path d="M 14 26 C 14 26 16 32 18 26 Z" fill="#F1C40F" />
              </g>

              {/* Spacecraft Body */}
              <path d="M 16 2 C 16 2 24 10 24 20 C 24 26 16 28 16 28 C 16 28 8 26 8 20 C 8 10 16 2 16 2 Z" fill="#1F090C" />
              
              {/* Left Fin */}
              <path d="M 8 20 L 2 28 L 10 25 Z" fill="#8D424E" stroke="#1F090C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Right Fin */}
              <path d="M 24 20 L 30 28 L 22 25 Z" fill="#8D424E" stroke="#1F090C" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Window */}
              <circle cx="16" cy="14" r="3.5" fill="#FFFFFF" />
              <circle cx="16" cy="14" r="2" fill="rgba(141,66,78,0.4)" />
              
              {/* Nose cone tip */}
              <path d="M 16 2 L 14 7 Q 16 8 18 7 Z" fill="#8D424E" />
            </svg>
          </div>

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
              {/* Central Year Node - Sleek Pill Badge */}
              <div
                className="organic-node"
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                }}
              >
                <div className="organic-node-container" style={{ transform: node.isNodeLeft ? 'translateX(-50%)' : 'translateX(50%)' }}>
                  <div className="organic-node">
                    {/* Particle Burst Celebration */}
                    <div className="burst-particle" data-angle="0" />
                    <div className="burst-particle" data-angle="45" />
                    <div className="burst-particle" data-angle="90" />
                    <div className="burst-particle" data-angle="135" />
                    <div className="burst-particle" data-angle="180" />
                    <div className="burst-particle" data-angle="225" />
                    <div className="burst-particle" data-angle="270" />
                    <div className="burst-particle" data-angle="315" />
                    
                    <div className="year-pill">
                      <span className="year-pill-dot" />
                      <span className="year-pill-text">{node.data.year}</span>
                      <span className="year-pill-dot" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternating Content Block */}
              <div
                className="organic-content"
                style={{
                  position: 'absolute',
                  top: '50%',
                  // Switch sides based on node position - closer gap to path
                  left: node.isNodeLeft ? `${node.x + 8}%` : 'auto',
                  right: !node.isNodeLeft ? `${100 - node.x + 8}%` : 'auto',
                  width: 'clamp(280px, 35vw, 420px)',
                  zIndex: 10,
                }}
              >
                <div className="content-inner">
                  {/* Bold Year Number Accent */}
                  <div style={{
                    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                    fontWeight: 900,
                    background: 'linear-gradient(135deg, #8D424E 30%, #d27786 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    marginBottom: '0.5rem',
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {node.data.year}
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', color: '#1F090C', marginBottom: '0.6rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {node.data.role}
                  </h3>
                  <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg, #8D424E, #d27786)', marginBottom: '0.8rem', borderRadius: 2 }} />
                  <p style={{ color: '#666', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', lineHeight: 1.7, margin: 0 }}>
                    {node.data.sub}
                  </p>
                </div>
              </div>

              {/* Milestone image — sits in the open space opposite the content,
                  reveals in sync with the node unlock. */}
              <div
                className="organic-image"
                style={{
                  position: 'absolute',
                  top: '50%',
                  // Mirror of the content block: opposite side of the node.
                  right: node.isNodeLeft ? `${100 - node.x + 8}%` : 'auto',
                  left: !node.isNodeLeft ? `${node.x + 8}%` : 'auto',
                  zIndex: 9,
                }}
              >
                <div className="organic-image-frame">
                  {node.data.img ? (
                    <img src={node.data.img} alt={node.data.role} loading="lazy" />
                  ) : (
                    <div className="organic-image-ph">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                      <span className="organic-image-ph-label">{node.data.year}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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

export default function WhoIsBehind() {
  const sectionRef = useRef(null);

  return (
    <section id="who-s-behind-tcq" ref={sectionRef} style={{ background: '#F7EAEB', paddingBottom: 0, fontFamily: "'Inter', sans-serif", position: 'relative', overflow: 'clip' }}>

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

        /* New Joyful Timeline Styles */
        @keyframes floatSlow {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes floatFast {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-15deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes pillPulse {
          0% { box-shadow: 0 0 0 0 rgba(141,66,78,0.3); }
          100% { box-shadow: 0 0 0 8px rgba(141,66,78,0); }
        }
        .joy-bg-el {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        .content-inner {
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.98); /* Less transparency, removed backdrop-filter for scroll performance */
          border-radius: 24px;
          border: 1px solid rgba(141,66,78,0.15);
          box-shadow: 0 12px 30px rgba(141, 66, 78, 0.08);
          transform: translateY(-50%);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .content-inner:hover {
          transform: translateY(-52%) scale(1.03);
          box-shadow: 0 20px 40px rgba(141, 66, 78, 0.15);
          border-color: rgba(141, 66, 78, 0.4);
        }

        /* Milestone image placeholder (opposite side of the content) */
        .organic-image-frame {
          width: clamp(150px, 18vw, 240px);
          aspect-ratio: 4 / 3;
          transform: translateY(-50%) rotate(-2deg);
          border-radius: 18px;
          overflow: hidden;
          background: #FFFFFF;
          padding: 8px;
          border: 1px solid rgba(141,66,78,0.15);
          box-shadow: 0 12px 30px rgba(141, 66, 78, 0.1);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          cursor: default;
        }
        .organic-image-frame:hover {
          transform: translateY(-50%) rotate(0deg) scale(1.04);
          box-shadow: 0 20px 40px rgba(141, 66, 78, 0.18);
        }
        .organic-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          display: block;
        }
        .organic-image-ph {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: rgba(141,66,78,0.55);
          background:
            repeating-linear-gradient(45deg, rgba(141,66,78,0.05) 0 10px, rgba(141,66,78,0.09) 10px 20px),
            #F7EAEB;
          border: 1.5px dashed rgba(141,66,78,0.3);
        }
        .organic-image-ph-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: rgba(141,66,78,0.6);
        }

        /* On mobile the path collapses — hide the side image to avoid overlap */
        @media (max-width: 768px) {
          .organic-image { display: none; }
        }
        .year-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          background: #1F090C;
          border-radius: 40px;
          border: 1.5px solid rgba(141,66,78,0.5);
          box-shadow: 0 4px 16px rgba(141,66,78,0.25);
          animation: pillPulse 2s infinite;
          white-space: nowrap;
        }
        .year-pill-text {
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: 'Outfit', sans-serif;
        }
        .year-pill-dot {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #8D424E;
          opacity: 0.7;
        }

        /* Spacecraft & Particles */
        @keyframes flameFlicker {
          0% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(1.3); opacity: 0.8; }
          100% { transform: scaleY(0.9); opacity: 1; }
        }
        .rocket-flame {
          animation: flameFlicker 0.1s infinite alternate;
        }
        .burst-particle {
          position: absolute;
          top: 50%; 
          left: 50%;
          width: 8px; 
          height: 8px;
          background: #8D424E;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          pointer-events: none;
          z-index: -1;
        }
      `}</style>

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
