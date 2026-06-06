import { motion } from 'framer-motion';

const ScrollFloat = ({
  text,
  delay = 0,
  stagger = 0.1,
  duration = 1.2,
  style = {},
  className = ""
}) => {
  const words = text.split(' ');
  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block', marginRight: index !== words.length - 1 ? '0.3em' : '0' }}>
          <motion.span
            initial={{ opacity: 0, y: 60, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px' }}
            transition={{
              duration: duration,
              delay: delay + index * stagger,
              ease: [0.2, 0.65, 0.3, 0.9],
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default ScrollFloat;
