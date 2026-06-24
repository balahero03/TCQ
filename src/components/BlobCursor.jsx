import { useRef, useEffect } from 'react';
import './BlobCursor.css';

/**
 * Drawing-trail cursor.
 * A small dot leads the pointer; as it moves it DRAWS a line along its path
 * that lives on screen and keeps growing while there is movement, then
 * gently fades when movement stops. The trail persists through scrolling.
 */
export default function BlobCursor({
  fillColor = '#FFFFFF',
  dotSize = 10,
  lineWidth = 3,
  fade = 0.06,        // 0 = trail never fades, higher = shorter-lived line
  zIndex = 9999,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let px = x;
    let py = y;
    let drew = false;

    const onMove = (cx, cy) => {
      x = cx;
      y = cy;
      drew = true;
    };
    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let raf;
    const tick = () => {
      // Fade the whole canvas a touch so the drawn line keeps "living"
      // and trails away gradually instead of staying forever.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = `rgba(0,0,0,${fade})`;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'source-over';

      // Draw the new segment of the path the cursor just travelled.
      if (drew && !reduce) {
        ctx.strokeStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // The leading dot.
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();

      px = x;
      py = y;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [fillColor, dotSize, lineWidth, fade]);

  return (
    <div className="cursor-container" style={{ zIndex }}>
      <canvas ref={canvasRef} className="cursor-canvas" />
    </div>
  );
}
