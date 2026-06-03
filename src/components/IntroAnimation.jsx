import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('cats'); // cats | line | logo | done

  useEffect(() => {
    // cats draw for 2.2s, then transition to line
    const t1 = setTimeout(() => setPhase('line'), 2400);
    // line visible alone for 1.2s, then show logo
    const t2 = setTimeout(() => setPhase('logo'), 3700);
    // logo holds for 1.8s, then complete
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 5800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#6B2737',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Cat SVG — draws in, fades out */}
          <AnimatePresence>
            {phase === 'cats' && (
              <motion.div
                key="cats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                style={{ position: 'absolute' }}
              >
                <CatsSVG />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Moving line — appears after cats, stays during logo */}
          {(phase === 'line' || phase === 'logo') && (
            <motion.div
              key="line"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.35, transition: { duration: 0.9, ease: 'easeOut' } }}
              style={{
                position: 'absolute',
                bottom: '15%',
                left: 0, right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, #F0EAE2 30%, #F0EAE2 70%, transparent)',
                transformOrigin: 'left',
              }}
            />
          )}

          {/* Pulsing dot that travels along the line */}
          {(phase === 'line' || phase === 'logo') && (
            <motion.div
              key="dot"
              initial={{ left: '0%', opacity: 0 }}
              animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0], transition: { duration: 2.2, ease: 'easeInOut', repeat: Infinity } }}
              style={{
                position: 'absolute',
                bottom: 'calc(15% - 3px)',
                width: 6, height: 6,
                borderRadius: '50%',
                background: '#F0EAE2',
                boxShadow: '0 0 10px #F0EAE2, 0 0 20px #F0EAE2',
              }}
            />
          )}

          {/* Logo reveal */}
          {phase === 'logo' && (
            <motion.div
              key="logo"
              initial={{ opacity: 0, scale: 0.6, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
              style={{ display: 'flex', alignItems: 'center', gap: '2rem', zIndex: 2 }}
            >
              <TCQLogoSVG size={100} color="#F0EAE2" />
              <div style={{ color: '#F0EAE2', textAlign: 'left' }}>
                <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, fontSize: '1.1rem', letterSpacing: '0.35em', textTransform: 'uppercase', lineHeight: 1.6 }}>
                  THE<br />CURIOSITY<br />QUOTIENT
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CatsSVG() {
  return (
    <svg
      viewBox="0 0 700 200"
      width="560"
      height="160"
      fill="none"
      stroke="#F0EAE2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Cat 1 */}
      <motion.path
        d="M60,160 Q55,140 50,130 Q45,115 55,108 Q48,95 55,88 Q65,80 75,88 Q82,95 75,108 Q85,115 80,130 Q75,140 70,160 Z"
        strokeDasharray="300" strokeDashoffset="300"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0 }}
      />
      <motion.path d="M55,88 L50,75 L62,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.3 }} />
      <motion.path d="M75,88 L80,75 L68,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.3 }} />
      <motion.circle cx="63" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
      <motion.circle cx="73" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} />
      <motion.path d="M65,106 Q68,110 71,106" strokeDasharray="20" strokeDashoffset="20"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.3, delay: 1.1 }} />
      <motion.path d="M55,160 Q65,155 75,160" strokeDasharray="40" strokeDashoffset="40"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 1.4 }} />
      {/* tail */}
      <motion.path d="M60,160 Q45,170 40,165 Q35,160 42,155"
        strokeDasharray="80" strokeDashoffset="80"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.8, delay: 1.5 }} />

      {/* Cat 2 */}
      <motion.path
        d="M160,160 Q155,140 150,130 Q145,115 155,108 Q148,95 155,88 Q165,80 175,88 Q182,95 175,108 Q185,115 180,130 Q175,140 170,160 Z"
        strokeDasharray="300" strokeDashoffset="300"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.15 }}
      />
      <motion.path d="M155,88 L150,75 L162,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.45 }} />
      <motion.path d="M175,88 L180,75 L168,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.45 }} />
      <motion.circle cx="163" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />
      <motion.circle cx="173" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />
      <motion.path d="M165,106 Q168,110 171,106" strokeDasharray="20" strokeDashoffset="20"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.3, delay: 1.2 }} />
      <motion.path d="M155,160 Q165,155 175,160" strokeDasharray="40" strokeDashoffset="40"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 1.5 }} />
      <motion.path d="M170,160 Q185,168 188,162 Q191,155 183,152"
        strokeDasharray="80" strokeDashoffset="80"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.8, delay: 1.6 }} />

      {/* Cat 3 */}
      <motion.path
        d="M270,160 Q265,140 260,130 Q255,115 265,108 Q258,95 265,88 Q275,80 285,88 Q292,95 285,108 Q295,115 290,130 Q285,140 280,160 Z"
        strokeDasharray="300" strokeDashoffset="300"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.path d="M265,88 L260,75 L272,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.6 }} />
      <motion.path d="M285,88 L290,75 L278,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.6 }} />
      <motion.circle cx="272" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
      <motion.circle cx="282" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} />
      <motion.path d="M274,106 Q277,110 280,106" strokeDasharray="20" strokeDashoffset="20"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.3, delay: 1.3 }} />
      <motion.path d="M265,160 Q275,155 285,160" strokeDasharray="40" strokeDashoffset="40"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 1.6 }} />
      <motion.path d="M270,160 Q255,170 250,164 Q246,157 254,153"
        strokeDasharray="80" strokeDashoffset="80"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.8, delay: 1.7 }} />

      {/* Cat 4 */}
      <motion.path
        d="M380,160 Q375,140 370,130 Q365,115 375,108 Q368,95 375,88 Q385,80 395,88 Q402,95 395,108 Q405,115 400,130 Q395,140 390,160 Z"
        strokeDasharray="300" strokeDashoffset="300"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.45 }}
      />
      <motion.path d="M375,88 L370,75 L382,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.75 }} />
      <motion.path d="M395,88 L400,75 L388,85" strokeDasharray="60" strokeDashoffset="60"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.5, delay: 0.75 }} />
      <motion.circle cx="382" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} />
      <motion.circle cx="392" cy="100" r="2" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} />
      <motion.path d="M384,106 Q387,110 390,106" strokeDasharray="20" strokeDashoffset="20"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.3, delay: 1.4 }} />
      <motion.path d="M375,160 Q385,155 395,160" strokeDasharray="40" strokeDashoffset="40"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 1.7 }} />
      <motion.path d="M388,160 Q403,170 406,164 Q409,157 401,153"
        strokeDasharray="80" strokeDashoffset="80"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.8, delay: 1.8 }} />

      {/* Cat 5 - small with question mark tail */}
      <motion.path
        d="M490,165 Q487,152 484,144 Q481,133 488,127 Q483,117 488,111 Q495,104 502,111 Q508,117 502,127 Q510,133 507,144 Q504,152 500,165 Z"
        strokeDasharray="250" strokeDashoffset="250"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.6 }}
      />
      <motion.path d="M488,111 L484,100 L493,108" strokeDasharray="50" strokeDashoffset="50"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 0.9 }} />
      <motion.path d="M502,111 L506,100 L497,108" strokeDasharray="50" strokeDashoffset="50"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 0.4, delay: 0.9 }} />
      <motion.circle cx="493" cy="121" r="1.5" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
      <motion.circle cx="501" cy="121" r="1.5" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} />
      {/* question mark tail */}
      <motion.path d="M497,165 Q516,173 522,162 Q528,150 518,142 Q510,136 500,140 Q494,144 496,152"
        strokeDasharray="120" strokeDashoffset="120"
        animate={{ strokeDashoffset: 0 }} transition={{ duration: 1, delay: 1.9 }} />
      <motion.circle cx="496" cy="158" r="2.5" fill="#F0EAE2" stroke="none"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} />

      {/* ground line connecting all */}
      <motion.line x1="30" y1="162" x2="540" y2="162"
        strokeDasharray="520" strokeDashoffset="520"
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
      />
    </svg>
  );
}

export function TCQLogoSVG({ size = 80, color = '#F0EAE2' }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
      {/* Circle arc (open at bottom right) */}
      <path
        d="M 90,60 A 36,36 0 1,1 80,90"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* Book/fan pages */}
      <g transform="translate(72, 82)" stroke={color} strokeWidth="1.5" strokeLinecap="round">
        <line x1="0" y1="0" x2="-18" y2="-8" />
        <line x1="0" y1="0" x2="-20" y2="-4" />
        <line x1="0" y1="0" x2="-20" y2="1" />
        <line x1="0" y1="0" x2="-18" y2="6" />
        <line x1="0" y1="0" x2="-14" y2="11" />
        <line x1="0" y1="0" x2="-9" y2="14" />
        <line x1="0" y1="0" x2="-3" y2="16" />
      </g>
    </svg>
  );
}
