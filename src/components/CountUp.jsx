import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = ''
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.1 });

  useEffect(() => {
    if (!inView) {
      setCount(from);
      return;
    }
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / (duration * 1000), 1);
      
      // Ease out expo
      const ease = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const current = from + (to - from) * ease;
      
      setCount(current);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(to);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, to, from, duration]);

  // format with commas if it's an integer >= 1000
  const formatNumber = (num) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
