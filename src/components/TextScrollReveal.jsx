import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Word = ({ children, progress, range }) => {
  // opacity transitions from 0.15 to 1 as scroll progress goes from range[0] to range[1]
  const opacity = useTransform(progress, range, [0.15, 1], { clamp: true });
  
  return (
    <motion.span style={{ opacity, display: 'inline-block' }}>
      {children}
    </motion.span>
  );
};

export default function TextScrollReveal({ text, className, style, scrollYProgress }) {
  const localRef = useRef(null);

  const { scrollYProgress: localProgress } = useScroll({
    target: localRef,
    offset: ['start 85%', 'end 50%'],
  });

  const progress = scrollYProgress || localProgress;

  const words = text.split(' ');

  return (
    <span
      ref={localRef}
      className={className}
      style={{
        ...style,
      }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <React.Fragment key={i}>
            <Word progress={progress} range={[start, end]}>
              {word}
            </Word>
            {i < words.length - 1 && ' '}
          </React.Fragment>
        );
      })}
    </span>
  );
}
