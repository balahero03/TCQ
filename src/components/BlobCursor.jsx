import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

/**
 * Dot → line cursor.
 * At rest it is a small dot. While the pointer moves it stretches into a
 * line (capsule) along the direction of travel, scaled by velocity, then
 * eases back to a dot when movement stops.
 */
export default function BlobCursor({
  fillColor = '#FFFFFF',
  dotSize = 12,        // resting dot diameter (px)
  maxStretch = 7,      // max length multiplier at high speed
  speedRef = 55,       // px/frame that maps to full stretch
  followDuration = 0.18,
  zIndex = 9999,
}) {
  const dotRef = useRef(null);

  useEffect(() => {
    const el = dotRef.current;
    if (!el) return;

    // Honour reduced-motion / touch: plain following dot, no stretch.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let lastX = window.innerWidth / 2;
    let lastY = window.innerHeight / 2;
    let stretchQuick;
    let angleQuick;

    // Centre the element on the pointer; GSAP composes this with x/y/rotation/scaleX.
    gsap.set(el, { xPercent: -50, yPercent: -50, x: lastX, y: lastY });

    // Quick-setters for cheap per-frame writes.
    const xTo = gsap.quickTo(el, 'x', { duration: followDuration, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: followDuration, ease: 'power3.out' });
    stretchQuick = gsap.quickTo(el, 'scaleX', { duration: 0.25, ease: 'power2.out' });
    angleQuick = gsap.quickTo(el, 'rotation', { duration: 0.1, ease: 'power2.out' });

    let lastMoveT = 0;

    const onMove = (clientX, clientY) => {
      xTo(clientX);
      yTo(clientY);

      if (reduce) return;

      const now = performance.now();
      const dx = clientX - lastX;
      const dy = clientY - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.5) {
        // Point the capsule along the travel direction.
        angleQuick((Math.atan2(dy, dx) * 180) / Math.PI);
        // Stretch proportional to speed, capped.
        const stretch = 1 + Math.min(dist / speedRef, 1) * (maxStretch - 1);
        stretchQuick(stretch);
      }

      lastX = clientX;
      lastY = clientY;
      lastMoveT = now;
    };

    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    // When the pointer goes idle, relax the line back into a dot.
    let raf;
    const tick = () => {
      if (!reduce && performance.now() - lastMoveT > 60) {
        stretchQuick(1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(raf);
    };
  }, [followDuration, maxStretch, speedRef]);

  return (
    <div className="cursor-container" style={{ zIndex }}>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: fillColor,
        }}
      />
    </div>
  );
}
