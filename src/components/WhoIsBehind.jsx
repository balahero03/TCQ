import { useRef, useEffect, useMemo, useState, useCallback } from 'react';
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
  {
    year: '2019',
    role: 'Red Bull',
    sub: 'Student Brand Manager',
    desc: 'Worked on bringing the Red Bull brand to life on campus through events, identifying emerging trends and incubating them within the Red Bull ecosystem.',
    img: null,
  },
  {
    year: '2020',
    role: 'Fully Filmy',
    sub: 'Content Creator & Writer',
    desc: 'Created and hosted content for Fully Filmy\'s YouTube channel, writing across film analysis, social and cultural commentary, and brand merchandising.',
    img: null,
  },
  {
    year: '2021',
    role: 'Greater Chennai Corporation',
    sub: 'Medical Officer',
    desc: 'Worked as a Medical Officer during the COVID-19 pandemic, overseeing vaccination camps and telemedicine services, while triaging newly diagnosed COVID-19 patients in Wards 133 and 135, GCC Zone 10.',
    img: null,
  },
  {
    year: '2023',
    role: 'JioCinema',
    sub: 'Fan Commentator, IPL 2023',
    desc: 'Covered all Chennai Super Kings matches and the playoffs as a fan commentator in both Tamil and English.',
    img: null,
  },
  {
    year: '2024',
    role: 'Ravichandran Ashwin',
    sub: 'Subtitle Translator',
    desc: 'Translated subtitles for cricketer Ravichandran Ashwin\'s YouTube channel.',
    img: null,
  },
  {
    year: '2025',
    role: 'Sri Ramachandra Hospital',
    sub: 'MD Preventive & Social Medicine',
    desc: 'Pursuing an MD in Preventive and Social Medicine, with a focus on lifestyle medicine, health economics and medical research, while exploring ways to make health and healthcare systems more accessible to the masses.',
    img: null,
  },
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

      // The rocket simply rides the path to the bottom and stays there —
      // no scale-up, blur, or fade-off. It remains visible at the end of
      // the line, having flown over the whole timeline.

    }, pinRef);

    return () => ctx.revert();
  }, [nodes, step]);

  return (
    <div style={{ background: '#F7E7C4' }}>
      <div ref={pinRef} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', fontFamily: "'Outfit', sans-serif" }}>
        
        {/* Scrolling Canvas (220vh gives HUGE gaps between nodes) */}
        <div ref={scrollContentRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '220vh', willChange: 'transform', overflow: 'hidden' }}>
          
          {/* Title Header matching WhatIsTCQ style - now scrolls away naturally */}
          <div style={{ position: 'absolute', top: '7vh', left: '5vw', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '2rem', height: '2px', background: '#D58F6B' }} />
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#D58F6B', fontWeight: 700 }}>
                Journey
              </div>
            </div>
            <div style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: '#382525', letterSpacing: '-0.04em', lineHeight: 1 }}>
              The Journey <span style={{ fontFamily: "'Newsreader', Georgia, serif", fontStyle: 'italic', fontWeight: 400, color: '#D58F6B' }}>So Far</span>
            </div>
          </div>

          {/* Dynamic Wavy SVG Background */}
          {/* Removed SVG filter: drop-shadow for massive performance boost and stutter elimination */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
            {/* Subtle background track */}
            <path d={pathData} fill="none" stroke="rgba(56,37,37,0.08)" strokeWidth="0.3" />
            
            {/* Decorative dashed background track (Widened dashes dramatically to eliminate GPU rendering lag) */}
            <path d={pathData} fill="none" stroke="rgba(56,37,37,0.08)" strokeWidth="0.2" strokeDasharray="16 24" transform="translate(1.5, 0)" />

            {/* Active animated stroke (Hardware Accelerated) */}
            <path 
              ref={pathRef} 
              d={pathData} 
              fill="none" 
              stroke="#382525" 
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
              <ellipse cx="16" cy="18" rx="8" ry="12" fill="rgba(56,37,37,0.2)" />
              {/* Glow */}
              <ellipse cx="16" cy="16" rx="14" ry="14" fill="rgba(213,143,107,0.12)" />
              
              {/* Animated Engine Flame */}
              <g className="rocket-flame" style={{ transformOrigin: "16px 26px" }}>
                 <path d="M 12 26 C 12 26 16 36 20 26 Z" fill="#E67E22" />
                 <path d="M 14 26 C 14 26 16 32 18 26 Z" fill="#F1C40F" />
              </g>

              {/* Spacecraft Body */}
              <path d="M 16 2 C 16 2 24 10 24 20 C 24 26 16 28 16 28 C 16 28 8 26 8 20 C 8 10 16 2 16 2 Z" fill="#382525" />
              
              {/* Left Fin */}
              <path d="M 8 20 L 2 28 L 10 25 Z" fill="#D58F6B" stroke="#382525" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              {/* Right Fin */}
              <path d="M 24 20 L 30 28 L 22 25 Z" fill="#D58F6B" stroke="#382525" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Window */}
              <circle cx="16" cy="14" r="3.5" fill="#FFFFFF" />
              <circle cx="16" cy="14" r="2" fill="rgba(56,37,37,0.3)" />
              
              {/* Nose cone tip */}
              <path d="M 16 2 L 14 7 Q 16 8 18 7 Z" fill="#D58F6B" />
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
                    background: 'linear-gradient(135deg, #382525 30%, #D58F6B 100%)',
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

                  <h3 style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', color: '#382525', marginBottom: '0.3rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {node.data.role}
                  </h3>
                  <div style={{ fontSize: 'clamp(0.78rem, 1vw, 0.9rem)', color: '#D58F6B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.7rem' }}>
                    {node.data.sub}
                  </div>
                  <div style={{ width: 40, height: 3, background: 'linear-gradient(90deg, #382525, #D58F6B)', marginBottom: '0.8rem', borderRadius: 2 }} />
                  <p style={{ color: '#5a3e3e', fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)', lineHeight: 1.7, margin: 0 }}>
                    {node.data.desc || node.data.sub}
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

// ─── Flip Card Component ────────────────────────────────────────────────────
function ProfileFlipCard() {
  const [flipped, setFlipped] = useState(false);
  const lastTap = useRef(0);

  // Desktop: hover flip
  const handleMouseEnter = () => setFlipped(true);
  const handleMouseLeave = () => setFlipped(false);

  // Mobile: double-tap to flip
  const handleTouchEnd = useCallback((e) => {
    const now = Date.now();
    if (now - lastTap.current < 350) {
      e.preventDefault();
      setFlipped(f => !f);
    }
    lastTap.current = now;
  }, []);

  return (
    <div
      className="pfc-scene"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
    >
      <div className={`pfc-card${flipped ? ' pfc-flipped' : ''}`}>
        {/* ── FRONT ── */}
        <div className="pfc-face pfc-front">
          {/* 120° simulated directional light overlay */}
          <div className="pfc-light" />
          {/* Subtle inner shimmer border */}
          <div className="pfc-shimmer" />

          <div className="pfc-front-content">
            {/* Section tag */}
            <div className="pfc-tag">
              <span className="pfc-tag-dot" />
              Who Is Behind
            </div>

            {/* Big stacked heading */}
            <h2 className="pfc-heading">
              <span className="pfc-heading-line">WHO IS</span>
              <span className="pfc-heading-line">BEHIND</span>
              <span className="pfc-heading-accent">TCQ?</span>
            </h2>

            {/* Divider */}
            <div className="pfc-divider" />

            {/* Name & tagline */}
            <p className="pfc-name">Dr. Vishnu Aravind, MBBS, MD</p>
            <p className="pfc-tagline">
              Scientist by the day. Artist also by the day.<br />Sleep is for the night.
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="pfc-face pfc-back">
          {/* Inner wrapper fills the face and provides a positioning context */}
          <div className="pfc-back-inner">
            <img
              src={drVishnuImg}
              alt="Dr. Vishnu Aravind"
              className="pfc-back-img"
            />
            {/* 120° light sheen over photo */}
            <div className="pfc-light pfc-light-back" />
            {/* Bottom gradient name plate */}
            <div className="pfc-back-overlay">
              <p className="pfc-back-name">Dr. Vishnu Aravind</p>
              <p className="pfc-back-sub">Founder, TCQ</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dashed-line annotation ── */}
      {/* The label sits bottom-right; the arrow curves UP-LEFT to point at the card */}
      <div className="pfc-annotation" aria-hidden="true">
        <svg
          className="pfc-annotation-svg"
          viewBox="0 0 90 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved dashed path: starts at label (right, bottom) → curves up-left to card edge */}
          <path
            className="pfc-annotation-path"
            d="M 80 60 C 70 60, 30 55, 18 30 C 10 14, 14 6, 20 4"
            stroke="#D58F6B"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead pointing UP at the card */}
          <path
            d="M 14 10 L 20 4 L 26 10"
            stroke="#D58F6B"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        {/* Desktop hint */}
        <span className="pfc-annotation-text pfc-desktop-hint">hover to flip</span>
        {/* Mobile hint */}
        <span className="pfc-annotation-text pfc-mobile-hint">double‑tap to flip</span>
      </div>
    </div>
  );
}

export default function WhoIsBehind() {
  const sectionRef = useRef(null);

  return (
    <section id="who-s-behind-tcq" ref={sectionRef} style={{ background: '#F7E7C4', paddingBottom: 0, fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'clip' }}>

      <style>{`
        /* ════════════════════════════════════════════════
           WIB – Two-column layout
           Left : ProfileFlipCard
           Right: CardSwap deck
        ════════════════════════════════════════════════ */
        .wib-container {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: clamp(80px, 10vh, 120px) 6vw;
          overflow: hidden;
        }
        .wib-grid {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(3rem, 5vw, 6rem);
          align-items: center;
        }
        .wib-left-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .wib-right-col {
          height: clamp(420px, 38vw, 560px);
          position: relative;
        }

        /* ─── Flip Card Scene ─── */
        .pfc-scene {
          perspective: 1200px;
          width: clamp(300px, 36vw, 480px);
          height: clamp(380px, 46vw, 580px);
          position: relative;
          cursor: pointer;
          /* Shadow lives here — NOT on pfc-card.
             CSS filter on a preserve-3d element collapses the 3D context. */
          filter: drop-shadow(0 28px 50px rgba(56,37,37,0.28));
        }
        .pfc-card {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition: transform 0.75s cubic-bezier(0.4, 0.2, 0.2, 1);
          border-radius: 28px;
          /* NO filter here — it would break preserve-3d */
        }
        .pfc-card.pfc-flipped {
          transform: rotateY(180deg);
        }
        .pfc-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 28px;
          overflow: hidden;
        }

        /* ─── FRONT face ─── */
        .pfc-front {
          background: linear-gradient(
            148deg,
            #4a2e2e 0%,
            #382525 35%,
            #2a1a1a 65%,
            #512e1a 100%
          );
          border: 1px solid rgba(213,143,107,0.25);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        /* 120-degree directional light: light source upper-left at ~120° */
        .pfc-light {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          pointer-events: none;
          /* Radial gradient emanating from upper-left (120° means light comes from upper-left) */
          background: radial-gradient(
            ellipse 90% 70% at 18% 14%,
            rgba(247, 231, 196, 0.13) 0%,
            rgba(213, 143, 107, 0.07) 30%,
            transparent 70%
          );
          z-index: 1;
        }
        .pfc-light-back {
          background: radial-gradient(
            ellipse 90% 70% at 18% 14%,
            rgba(247, 231, 196, 0.18) 0%,
            rgba(213, 143, 107, 0.08) 30%,
            transparent 65%
          );
        }

        /* Subtle shimmer border */
        .pfc-shimmer {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          pointer-events: none;
          background: linear-gradient(
            120deg,
            rgba(247,231,196,0.18) 0%,
            transparent 40%,
            transparent 70%,
            rgba(213,143,107,0.10) 100%
          );
          z-index: 2;
        }

        .pfc-front-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: clamp(2rem, 5vw, 3rem);
          justify-content: center;
        }

        /* Section tag */
        .pfc-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.68rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #D58F6B;
          font-weight: 700;
          margin-bottom: 1.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .pfc-tag-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #D58F6B;
          flex-shrink: 0;
        }

        /* Heading */
        .pfc-heading {
          display: flex;
          flex-direction: column;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin-bottom: 1.6rem;
        }
        .pfc-heading-line {
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          color: #F7E7C4;
          display: block;
        }
        .pfc-heading-accent {
          font-size: clamp(2.8rem, 6.5vw, 5rem);
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #D58F6B;
          display: block;
        }

        /* Divider */
        .pfc-divider {
          width: 48px;
          height: 3px;
          background: linear-gradient(90deg, #D58F6B, rgba(213,143,107,0.2));
          border-radius: 2px;
          margin-bottom: 1.4rem;
        }

        /* Name & tagline */
        .pfc-name {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 700;
          color: #F7E7C4;
          letter-spacing: 0.01em;
          margin-bottom: 0.5rem;
          font-family: 'Outfit', sans-serif;
        }
        .pfc-tagline {
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          color: rgba(247,231,196,0.65);
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          line-height: 1.6;
        }

        /* ─── BACK face ─── */
        /* .pfc-face gives: position:absolute; inset:0  — do NOT override position here */
        .pfc-back {
          transform: rotateY(180deg);
          border: 1px solid rgba(213,143,107,0.2);
          border-radius: 28px;
          background: #1a0f0f;
        }
        /* Inner wrapper provides the sizing + positioning context */
        .pfc-back-inner {
          position: absolute;
          inset: 0;
          border-radius: 26px;
          overflow: hidden;
        }
        .pfc-back-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        /* light sheen — stacks on top of image */
        .pfc-back .pfc-light {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .pfc-back-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem clamp(1.5rem, 4vw, 2.5rem);
          background: linear-gradient(to top, rgba(42,26,26,0.92) 0%, rgba(42,26,26,0.6) 50%, transparent 100%);
          z-index: 2;
          border-radius: 0 0 28px 28px;
        }
        .pfc-back-name {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 800;
          color: #F7E7C4;
          margin-bottom: 0.25rem;
        }
        .pfc-back-sub {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-size: clamp(0.85rem, 1.4vw, 0.95rem);
          color: #D58F6B;
        }

        /* ─── Dashed-line annotation ─── */
        /* Label + arrow sit below-right of the card; arrow curves up-left to point at it */
        @keyframes pfc-annotate-bob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes pfc-dash-march {
          to { stroke-dashoffset: -18; }
        }
        .pfc-annotation {
          position: absolute;
          /* Just below the card's bottom-right corner */
          bottom: -62px;
          right: -4px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 4px;
          pointer-events: none;
          z-index: 10;
          animation: pfc-annotate-bob 2.8s ease-in-out infinite;
        }
        .pfc-annotation-svg {
          width: 90px;
          height: 70px;
          overflow: visible;
          flex-shrink: 0;
        }
        /* Marching dashes animation */
        .pfc-annotation-path {
          animation: pfc-dash-march 0.9s linear infinite;
        }
        .pfc-annotation-text {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-size: 0.8rem;
          color: rgba(213,143,107,0.8);
          letter-spacing: 0.02em;
          white-space: nowrap;
          /* Sit at the same baseline as the SVG bottom */
          align-self: flex-end;
          padding-bottom: 2px;
        }

        /* show/hide hints by device */
        .pfc-mobile-hint { display: none; }
        @media (hover: none) and (pointer: coarse) {
          .pfc-desktop-hint { display: none; }
          .pfc-mobile-hint  { display: inline; }
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .wib-grid {
            grid-template-columns: 1fr;
            justify-items: center;
          }
          .wib-right-col {
            width: 100%;
            max-width: 520px;
            height: 420px;
          }
          .pfc-scene {
            width: clamp(280px, 80vw, 420px);
            height: clamp(340px, 55vw, 480px);
          }
        }
        @media (max-width: 600px) {
          .wib-container {
            padding: 90px 5vw 50px;
            min-height: auto;
          }
          .wib-right-col {
            height: 360px;
          }
          .pfc-scene {
            width: 88vw;
            height: 60vw;
            min-height: 320px;
          }
          .pfc-annotation {
            bottom: -40px;
          }
        }

        /* ─── Organic Timeline Styles (unchanged) ─── */
        @keyframes pillPulse {
          0%   { box-shadow: 0 0 0 0   rgba(56,37,37,0.3); }
          100% { box-shadow: 0 0 0 8px rgba(56,37,37,0);   }
        }
        .content-inner {
          padding: 2.5rem;
          background: rgba(247,231,196,0.98);
          border-radius: 24px;
          border: 1px solid rgba(56,37,37,0.12);
          box-shadow: 0 12px 30px rgba(56,37,37,0.07);
          transform: translateY(-50%);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .content-inner:hover {
          transform: translateY(-52%) scale(1.03);
          box-shadow: 0 20px 40px rgba(56,37,37,0.12);
          border-color: rgba(56,37,37,0.3);
        }
        .organic-image-frame {
          width: clamp(180px, 22vw, 300px);
          aspect-ratio: 4 / 3;
          transform: translateY(-50%) rotate(-2deg);
          border-radius: 18px;
          overflow: hidden;
          background: #F7E7C4;
          border: 1px solid rgba(56,37,37,0.12);
          box-shadow: 0 12px 30px rgba(56,37,37,0.08);
          transition: transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275), box-shadow 0.4s ease;
          cursor: default;
        }
        .organic-image-frame:hover {
          transform: translateY(-50%) rotate(0deg) scale(1.04);
          box-shadow: 0 20px 40px rgba(56,37,37,0.15);
        }
        .organic-image-frame img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 12px; display: block;
        }
        .organic-image-ph {
          width: 100%; height: 100%; border-radius: 12px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.5rem; color: rgba(56,37,37,0.55);
          background:
            repeating-linear-gradient(45deg, rgba(56,37,37,0.04) 0 10px, rgba(56,37,37,0.08) 10px 20px),
            #E8D0A0;
          border: 1.5px dashed rgba(56,37,37,0.25);
        }
        .organic-image-ph-label {
          font-family: 'Outfit', sans-serif; font-weight: 700;
          font-size: 0.75rem; letter-spacing: 0.15em; color: rgba(56,37,37,0.5);
        }
        @media (max-width: 768px) { .organic-image { display: none; } }
        .year-pill {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 16px; background: #382525; border-radius: 40px;
          border: 1.5px solid rgba(213,143,107,0.5);
          box-shadow: 0 4px 16px rgba(56,37,37,0.2);
          animation: pillPulse 2s infinite; white-space: nowrap;
        }
        .year-pill-text {
          color: #F7E7C4; font-weight: 700; font-size: 0.95rem;
          letter-spacing: 0.15em; text-transform: uppercase; font-family: 'Outfit', sans-serif;
        }
        .year-pill-dot {
          display: inline-block; width: 5px; height: 5px;
          border-radius: 50%; background: #D58F6B; opacity: 0.7;
        }
        @keyframes flameFlicker {
          0%   { transform: scaleY(1);   opacity: 1;   }
          50%  { transform: scaleY(1.3); opacity: 0.8; }
          100% { transform: scaleY(0.9); opacity: 1;   }
        }
        .rocket-flame { animation: flameFlicker 0.1s infinite alternate; }
        .burst-particle {
          position: absolute; top: 50%; left: 50%;
          width: 8px; height: 8px; background: #D58F6B; border-radius: 50%;
          transform: translate(-50%, -50%); opacity: 0; pointer-events: none; z-index: -1;
        }
      `}</style>

      {/* ── Two-column intro ── */}
      <div className="wib-container">
        <div className="wib-grid">

          {/* Left: Flip Card */}
          <div className="wib-left-col">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              <ProfileFlipCard />
            </motion.div>
          </div>

          {/* Right: CardSwap */}
          <div className="wib-right-col">
            <CardSwap
              width="100%"
              height="100%"
              cardDistance={55}
              verticalDistance={65}
              delay={2500}
              pauseOnHover={true}
              easing="linear"
            >
              <Card style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#382525', color: '#F7E7C4' }}>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', marginBottom: '1rem', fontWeight: 800, color: '#F7E7C4' }}>The Roots</h3>
                <p style={{ lineHeight: 1.7, opacity: 0.9, fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
                  I was born in Chennai, grew up with the internet, and somehow ended up studying medicine. Along the way, I developed a habit that has proved considerably harder to cure by my own standards: asking questions.
                </p>
                <p style={{ lineHeight: 1.7, opacity: 0.85, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', marginTop: '0.75rem' }}>
                  One answer usually leads to another question. One niche leads to another. One interesting idea leads to the urge to share it with someone else. And then, one random morning, it became TCQ.
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F7E7C4', color: '#382525' }}>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', marginBottom: '1rem', fontWeight: 800, color: '#382525' }}>The Journey</h3>
                <p style={{ lineHeight: 1.7, opacity: 0.9, fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
                  Medicine gave me a way of understanding people. Marketing, business and media gave me ways of understanding attention, stories and ideas. Together, they gave me a way of thinking: break things down to a science, understand what people need, find what makes an idea interesting, and make it accessible to the society to end up building cultures.
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.75rem, 5vw, 2.75rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#382525', color: '#F7E7C4' }}>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', marginBottom: '1rem', fontWeight: 800, color: '#F7E7C4' }}>The Vision</h3>
                <p style={{ lineHeight: 1.7, opacity: 0.9, fontSize: 'clamp(0.9rem, 3vw, 1.05rem)' }}>
                  TCQ is an extension of my way of thinking. We connect people to ideas they might not have discovered otherwise. We help schools and colleges open up new worlds for their students. We work with startups, brands and organisations to find interesting ways to connect with their audiences.
                </p>
                <p style={{ lineHeight: 1.7, opacity: 0.85, fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)', marginTop: '0.75rem' }}>
                  Sometimes that means a quiz. Sometimes a workshop. Sometimes a campaign, a community, or something that doesn't have a name yet. And the more nameless things we create, the better.
                </p>
              </Card>
            </CardSwap>
          </div>

        </div>
      </div>

      <OrganicTimeline />
    </section>
  );
}
