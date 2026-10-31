import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * BlurText — words or characters animate in from a direction with blur.
 *
 * Props:
 *   text          — string to render
 *   delay         — ms between each token (default 80)
 *   animateBy     — "words" | "characters"
 *   direction     — "top" | "bottom" | "left" | "right"
 *   className     — optional CSS class
 *   onAnimationComplete — fires when last token finishes
 *   style         — inline styles passed to the wrapper
 */
export default function BlurText({
  text = '',
  delay = 80,
  initialDelay = 0,
  animateBy = 'words',
  direction = 'top',
  className = '',
  onAnimationComplete,
  style = {},
  initialBlur = 'blur(12px)',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-50px' });
  const [completed, setCompleted] = useState(0);
  const [prevInView, setPrevInView] = useState(inView);

  // Re-arm the completion counter whenever visibility flips.
  if (inView !== prevInView) {
    setPrevInView(inView);
    setCompleted(0);
  }

  const tokens =
    animateBy === 'characters'
      ? text.split('')
      : text.split(' ');

  const offset = 24;
  const directionMap = {
    top: { y: -offset, x: 0 },
    bottom: { y: offset, x: 0 },
    left: { y: 0, x: -offset },
    right: { y: 0, x: offset },
  };
  const { x: dx, y: dy } = directionMap[direction] || directionMap.top;

  const settled = completed >= tokens.length;

  useEffect(() => {
    if (settled && onAnimationComplete) onAnimationComplete();
  }, [settled, onAnimationComplete]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: 'inline-flex',
        flexWrap: 'wrap',
        gap: animateBy === 'characters' ? 0 : '0.3em',
        ...style,
      }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          initial={{ opacity: 0, filter: initialBlur, x: dx, y: dy }}
          animate={
            inView
              ? { opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }
              : { opacity: 0, filter: initialBlur, x: dx, y: dy }
          }
          transition={{
            duration: 0.8,
            delay: (initialDelay / 1000) + (i * (delay / 1000)),
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={() => {
            // Only the entrance counts — the blur-out on exit shouldn't settle.
            if (inView) setCompleted((c) => c + 1);
          }}
          style={{
            display: 'inline-block',
            ...(settled ? { filter: 'none', willChange: 'auto' } : { willChange: 'transform, filter, opacity' }),
          }}
        >
          {animateBy === 'characters' && token === ' ' ? '\u00A0' : token}
        </motion.span>
      ))}
    </span>
  );
}
