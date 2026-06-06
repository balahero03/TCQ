import { motion } from 'framer-motion';

const ScrollReveal = ({
  children,
  delay = 0,
  duration = 1.2,
  style = {},
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: false, amount: 0.1, margin: '0px' }}
      transition={{ duration: duration, delay: delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
