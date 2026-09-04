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
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const leftX = isMobile ? 35 : 25;
    const rightX = isMobile ? 65 : 75;

    const d = [`M 50 -10`];
    const n = [];

    timeline.forEach((item, i) => {
      const isNodeLeft = i % 2 === 0;
      const x = isNodeLeft ? leftX : rightX;
      const y = (i + 1) * step;
      
      const prevX = i === 0 ? 50 : (isNodeLeft ? rightX : leftX);
      const prevY = i === 0 ? -10 : i * step;
      
      // Smooth cubic bezier curve to next point
      d.push(`C ${prevX} ${prevY + step/2}, ${x} ${y - step/2}, ${x} ${y}`);
      n.push({ x, y, isNodeLeft, data: item });
    });

    // Line exiting the bottom off-screen
    const lastX = n[n.length - 1].x;
    const lastY = n[n.length - 1].y;
    d.push(`C ${lastX} ${lastY + step/2}, 50 ${lastY + step/2}, 50 110`);

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

      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      const endScroll = isMobile ? timeline.length * 360 : timeline.length * 800;
      const cameraY = isMobile ? '-65vh' : '-120vh';

      // Master Timeline for ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${endScroll}`, // Tighter scroll distance for mobile
          scrub: 0.5, // 0.5 gives a tight, extremely responsive but smoothed scroll feel
          pin: true, // Lock the screen while animating
        }
      });

      // 1. Camera Pan: move content up so we reach the bottom perfectly
      tl.to(scrollContentRef.current, { y: cameraY, ease: "none", duration: 1 }, 0);

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
        
        // Calculate precise trigger time based on path length weighting.
        // The first and last curves have half the horizontal width, so they are shorter.
        // We use an empirical weight of 0.6 for the edges and 1.0 for the middle segments.
        const edgeWeight = 0.6;
        const totalWeight = (edgeWeight * 2) + (timeline.length - 1);
        const currentWeight = edgeWeight + (i * 1.0);
        const progressTime = currentWeight / totalWeight;

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
              duration: 0.05 
            }, 
            progressTime - 0.01
          );
        }

        // Pop the hand-drawn node
        tl.to(nodePoint, {
          scale: 1,
          opacity: 1,
          ease: "back.out(2)",
          duration: 0.03
        }, progressTime - 0.01);

        // Slide in the content block rapidly
        tl.to(content, {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          duration: 0.04
        }, progressTime - 0.01);

        // Reveal the milestone image
        if (image) {
          tl.to(image, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "back.out(1.6)",
            duration: 0.05
          }, progressTime - 0.01);
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
        
        {/* Scrolling Canvas */}
        <div ref={scrollContentRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '165vh' : '220vh', willChange: 'transform', overflow: 'hidden' }}>
          
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
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none', overflow: 'visible' }}>
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
                  width: 'clamp(320px, 45vw, 550px)',
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

                  {/* Milestone image inside card on mobile */}
                  <div className="organic-image-mobile">
                    <div className="organic-image-frame-mobile">
                      {node.data.img ? (
                        <img src={node.data.img} alt={node.data.role} loading="lazy" />
                      ) : (
                        <div className="organic-image-ph">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          <span className="organic-image-ph-label">{node.data.year}</span>
                        </div>
                      )}
                    </div>
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



export default function WhoIsBehind() {
  const sectionRef = useRef(null);

  return (
    <section id="who-s-behind-tcq" ref={sectionRef} style={{ background: '#F7E7C4', paddingBottom: 0, fontFamily: "'Outfit', sans-serif", position: 'relative', overflow: 'clip' }}>

      <style>{`
        /* Restructured layout */
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
          max-width: 2000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: clamp(2rem, 3.5vw, 4.5rem);
          align-items: center;
        }
        .wib-left-col {
          display: block;
        }
        .wib-right-col {
          height: clamp(420px, 34vw, 520px);
          position: relative;
        }

        /* ── Static Photo Card ── */
        .pfc-card {
          width: 100%;
          height: clamp(420px, 34vw, 520px);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          cursor: default;
          box-shadow:
            0 8px 16px rgba(56,37,37,0.14),
            0 24px 48px rgba(56,37,37,0.2),
            0 40px 80px rgba(56,37,37,0.16);
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        /* Full-bleed background image */
        .pfc-bg-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Layered gradient overlay */
        .pfc-overlay {
          position: absolute;
          inset: 0;
          background:
            /* Bottom dark scrim for text legibility */
            linear-gradient(
              to top,
              rgba(38,20,20,0.92) 0%,
              rgba(38,20,20,0.55) 40%,
              rgba(38,20,20,0.1)  65%,
              transparent 80%
            ),
            /* 120° top-light specular */
            radial-gradient(
              ellipse 70% 55% at 18% 0%,
              rgba(213,143,107,0.18) 0%,
              transparent 65%
            );
          pointer-events: none;
        }

        /* Text pinned to bottom-left */
        .pfc-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(2rem, 4vw, 3rem);
          color: #F7E7C4;
        }
        .pfc-heading {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 0 0 1.25rem 0;
          display: flex;
          flex-direction: column;
        }
        .pfc-heading span {
          font-size: clamp(2.4rem, 4.2vw, 3.8rem);
          display: block;
          color: #F7E7C4;
        }
        .pfc-heading .pfc-accent {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: #D58F6B;
          margin-top: 2px;
        }
        .pfc-divider {
          width: 48px;
          height: 2px;
          background: linear-gradient(90deg, rgba(213,143,107,0.9), rgba(213,143,107,0));
          margin-bottom: 1rem;
        }
        .pfc-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: clamp(1rem, 1.6vw, 1.35rem);
          color: #F7E7C4;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }
        .pfc-tagline {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-size: clamp(0.9rem, 1.2vw, 1.05rem);
          color: rgba(247,231,196,0.75);
          margin: 0;
          line-height: 1.55;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .wib-grid { grid-template-columns: 1fr; gap: 4rem; }
          .wib-right-col { max-width: 600px; width: 100%; margin: 0 auto; height: 440px; }
        }
        @media (max-width: 768px) {
          .wib-container { padding: 80px 6vw 60px; min-height: auto; }
          .pfc-card { max-width: 480px; margin: 0 auto; height: 420px; }
          .wib-right-col { max-width: 100%; width: 100%; margin: 3rem auto 1.5rem; height: 450px; display: flex; justify-content: center; align-items: center; }
        }
        @media (max-width: 480px) {
          .pfc-card { height: 360px; }
          .wib-right-col { height: 420px; margin: 3.5rem auto 2rem; }
        }

        .wib-profile-card {
          width: 100%;
          height: clamp(420px, 34vw, 520px);
          /* Sharp corners matching CardSwap cards */
          border-radius: 0;
          overflow: hidden;
          /* Flat dark brown — same base as CardSwap dark cards */
          background: #382525;
          display: flex;
          position: relative;
          /* Bold border matching CardSwap's 4px solid currentColor */
          border: 4px solid #382525;
          box-sizing: border-box;
          /* Layered shadow: lift + warm ambient glow */
          box-shadow:
            0 8px 16px rgba(56, 37, 37, 0.14),
            0 24px 48px rgba(56, 37, 37, 0.22),
            0 40px 80px rgba(56, 37, 37, 0.18);
          transition: box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Left accent strip — gradient bookmark, like a spine */
        .wib-profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 100%;
          background: linear-gradient(180deg, #D58F6B 0%, #8a4020 50%, #D58F6B 100%);
          z-index: 5;
        }

        /* 120° top-light: radial specular highlight from upper-left */
        .wib-profile-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 65% 50% at 15% 0%,
              rgba(255, 255, 255, 0.12) 0%,
              rgba(255, 230, 180, 0.05) 45%,
              transparent 70%
            );
          pointer-events: none;
          z-index: 2;
        }

        .wib-profile-card:hover {
          box-shadow:
            0 12px 24px rgba(56, 37, 37, 0.18),
            0 32px 64px rgba(56, 37, 37, 0.28),
            0 60px 100px rgba(56, 37, 37, 0.22),
            0 0 0 1px rgba(213, 143, 107, 0.3);
        }
        
        .wib-profile-content {
          flex: 1;
          /* Indent past the accent strip */
          padding: clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2.5rem) clamp(2rem, 4vw, 3rem) clamp(2.2rem, 4.5vw, 3.2rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #F7E7C4;
          position: relative;
          z-index: 4;
        }
        
        .wib-profile-content h2 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          margin: 0 0 1.5rem 0;
          /* Match CardSwap header font size */
          font-size: clamp(1.9rem, 3.2vw, 3rem);
          display: flex;
          flex-direction: column;
          color: #F7E7C4;
        }
        
        .wib-profile-content h2 span {
          display: block;
        }
        
        .wib-profile-content h2 .pfc-accent {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          /* Copper accent for the italic — same as CardSwap accent usage */
          color: #D58F6B;
          margin-top: 2px;
        }

        /* Thin copper divider — matching the CardSwap inner dividers */
        .wib-profile-divider {
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #D58F6B 0%, rgba(213,143,107,0.2) 100%);
          margin-bottom: 1.25rem;
        }
        
        .wib-profile-bio h3 {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          /* Match CardSwap h3 sizing */
          font-size: clamp(1rem, 1.6vw, 1.35rem);
          margin: 0 0 10px 0;
          line-height: 1.3;
          color: #F7E7C4;
          letter-spacing: -0.01em;
        }
        
        .wib-profile-bio p {
          font-family: 'Newsreader', Georgia, serif;
          font-style: italic;
          font-size: clamp(0.9rem, 1.2vw, 1.05rem);
          line-height: 1.65;
          /* Slightly muted cream — matching CardSwap p opacity: 0.9 effect */
          color: rgba(247, 231, 196, 0.82);
          margin: 0;
        }
        
        /* Image column — wider for breathing room */
        .wib-profile-image {
          flex: 1.4;
          height: 100%;
          position: relative;
          z-index: 1;
        }

        /* Warm vignette on left edge to blend into the dark card base */
        .wib-profile-image::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(56, 37, 37, 0.7) 0%,
            rgba(56, 37, 37, 0.1) 30%,
            transparent 55%
          );
          z-index: 1;
          pointer-events: none;
        }
        
        .wib-profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wib-profile-card:hover .wib-profile-image img {
          transform: scale(1.04);
        }

        /* Responsive Styles */
        @media (max-width: 1100px) {
          .wib-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .wib-right-col {
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .wib-container {
            padding: 80px 6vw 60px;
            min-height: auto;
          }
          .wib-profile-card {
            flex-direction: column;
            height: auto;
          }
          .wib-profile-image {
            height: 400px;
          }
          .wib-profile-content {
            gap: 1.5rem;
            padding: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .wib-profile-image {
            height: 300px;
          }
          .wib-right-col {
            height: 340px;
          }
        }

        /* New Joyful Timeline Styles */
        @keyframes floatSlow {
          0% { transform: translate(-50%, 0) rotate(0deg); }
          50% { transform: translate(-50%, -6px) rotate(1deg); }
          100% { transform: translate(-50%, 0) rotate(0deg); }
        }
        @keyframes floatFast {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-15deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes pillPulse {
          0% { box-shadow: 0 0 0 0 rgba(56,37,37,0.3); }
          100% { box-shadow: 0 0 0 8px rgba(56,37,37,0); }
        }
        .joy-bg-el {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }
        .content-inner {
          padding: 1.5rem 2.2rem;
          background: rgba(247, 231, 196, 0.98);
          border-radius: 24px;
          border: 1px solid rgba(56,37,37,0.12);
          box-shadow: 0 12px 30px rgba(56, 37, 37, 0.07);
          transform: translateY(-50%);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .content-inner:hover {
          transform: translateY(-52%) scale(1.03);
          box-shadow: 0 20px 40px rgba(56, 37, 37, 0.12);
          border-color: rgba(56, 37, 37, 0.3);
        }

        /* Milestone image placeholder (opposite side of the content) */
        .organic-image-frame {
          width: clamp(180px, 22vw, 300px);
          aspect-ratio: 4 / 3;
          transform: translateY(-50%) rotate(-2deg);
          border-radius: 18px;
          overflow: hidden;
          background: #F7E7C4;
          border: 1px solid rgba(56,37,37,0.12);
          box-shadow: 0 12px 30px rgba(56, 37, 37, 0.08);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
          cursor: default;
        }
        .organic-image-frame:hover {
          transform: translateY(-50%) rotate(0deg) scale(1.04);
          box-shadow: 0 20px 40px rgba(56, 37, 37, 0.15);
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
          color: rgba(56,37,37,0.55);
          background:
            repeating-linear-gradient(45deg, rgba(56,37,37,0.04) 0 10px, rgba(56,37,37,0.08) 10px 20px),
            #E8D0A0;
          border: 1.5px dashed rgba(56,37,37,0.25);
        }
        .organic-image-ph-label {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          color: rgba(56,37,37,0.5);
        }

        .organic-image-mobile { display: none; }

        /* On mobile the path collapses — hide the side image, scale down cards & nodes, enforce left/right side spacing */
        @media (max-width: 768px) {
          .organic-image { display: none; }
          .organic-image-mobile {
            display: block;
            width: 100%;
            margin-bottom: 0.65rem;
          }
          .organic-image-frame-mobile {
            width: 100%;
            aspect-ratio: 16 / 9;
            max-height: 125px;
            border-radius: 10px;
            overflow: hidden;
            background: #F7E7C4;
            border: 1px solid rgba(56,37,37,0.12);
            box-shadow: 0 4px 14px rgba(56, 37, 37, 0.08);
          }
          .organic-image-frame-mobile img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .organic-content {
            width: clamp(185px, 52vw, 260px) !important;
            max-width: calc(100vw - 75px) !important;
          }
          .content-inner {
            padding: 0.95rem 1.15rem;
            border-radius: 15px;
          }
          .year-pill {
            padding: 4px 10px;
            gap: 4px;
          }
          .year-pill-text {
            font-size: 0.76rem;
            letter-spacing: 0.1em;
          }
          .year-pill-dot {
            width: 4px;
            height: 4px;
          }
        }
        .year-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 16px;
          background: #382525;
          border-radius: 40px;
          border: 1.5px solid rgba(213,143,107,0.5);
          box-shadow: 0 4px 16px rgba(56,37,37,0.2);
          animation: pillPulse 2s infinite;
          white-space: nowrap;
        }
        .year-pill-text {
          color: #F7E7C4;
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
          background: #D58F6B;
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
          background: #D58F6B;
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

          {/* Left Column (restructured: sub-split layout with card and photo) */}
          <div className="wib-left-col">
            <motion.div
              className="pfc-card"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.97 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.85, 
                    ease: [0.16, 1, 0.3, 1],
                    staggerChildren: 0.12,
                    delayChildren: 0.2
                  }
                },
                hover: {
                  y: -6,
                  scale: 1.012,
                  boxShadow: "0 12px 24px rgba(56,37,37,0.18), 0 32px 60px rgba(56,37,37,0.26), 0 60px 100px rgba(56,37,37,0.2)",
                  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                }
              }}
            >
              {/* Full-bleed background photo */}
              <motion.img
                src={drVishnuImg}
                alt="Dr. Vishnu Aravind"
                className="pfc-bg-img"
                loading="lazy"
                variants={{
                  hover: { scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
                }}
              />

              {/* Gradient overlay */}
              <div className="pfc-overlay" />

              {/* Text overlaid at bottom */}
              <div className="pfc-text">
                <motion.h2 
                  className="pfc-heading"
                >
                  <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>WHOIS</motion.span>
                  <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>BEHIND</motion.span>
                  <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="pfc-accent">TCQ?</motion.span>
                </motion.h2>
                <motion.div 
                  className="pfc-divider" 
                  variants={{ hidden: { scaleX: 0, opacity: 0, transformOrigin: 'left' }, visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                />
                <motion.p 
                  className="pfc-name"
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  Dr. Vishnu Aravind, MBBS, MD
                </motion.p>
                <motion.p 
                  className="pfc-tagline"
                  variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
                >
                  Scientist by the day. Artist also by the day.<br />
                  Sleep is for the night.
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: CardSwap (existing) */}
          <div className="wib-right-col">
            <CardSwap
              width="min(86vw, 460px)"
              height="clamp(380px, 42vh, 480px)"
              cardDistance={44}
              verticalDistance={54}
              delay={2500}
              pauseOnHover={true}
              easing="linear"
            >
              <Card style={{ padding: 'clamp(1.5rem, 4vw, 2.25rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#382525', color: '#F7E7C4' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.65rem)', marginBottom: '0.85rem', fontWeight: 800, color: '#F7E7C4' }}>The Roots</h3>
                <p style={{ lineHeight: 1.65, opacity: 0.9, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>
                  I was born in Chennai, grew up with the internet, and somehow ended up studying medicine. Along the way, I developed a habit that has proved considerably harder to cure by my own standards: asking questions.
                </p>
                <p style={{ lineHeight: 1.65, opacity: 0.85, fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)', marginTop: '0.6rem' }}>
                  One answer usually leads to another question. One niche leads to another. One interesting idea leads to the urge to share it with someone else. And then, one random morning, it became TCQ.
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.5rem, 4vw, 2.25rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#F7E7C4', color: '#382525' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.65rem)', marginBottom: '0.85rem', fontWeight: 800, color: '#382525' }}>The Journey</h3>
                <p style={{ lineHeight: 1.65, opacity: 0.9, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>
                  Medicine gave me a way of understanding people. Marketing, business and media gave me ways of understanding attention, stories and ideas. Together, they gave me a way of thinking: break things down to a science, understand what people need, find what makes an idea interesting, and make it accessible to the society to end up building cultures.
                </p>
              </Card>
              <Card style={{ padding: 'clamp(1.5rem, 4vw, 2.25rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#382525', color: '#F7E7C4' }}>
                <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.65rem)', marginBottom: '0.85rem', fontWeight: 800, color: '#F7E7C4' }}>The Vision</h3>
                <p style={{ lineHeight: 1.65, opacity: 0.9, fontSize: 'clamp(0.8rem, 2vw, 0.95rem)' }}>
                  TCQ is an extension of my way of thinking. We connect people to ideas they might not have discovered otherwise. We help schools and colleges open up new worlds for their students. We work with startups, brands and organisations to find interesting ways to connect with their audiences.
                </p>
                <p style={{ lineHeight: 1.65, opacity: 0.85, fontSize: 'clamp(0.75rem, 1.8vw, 0.9rem)', marginTop: '0.6rem' }}>
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
