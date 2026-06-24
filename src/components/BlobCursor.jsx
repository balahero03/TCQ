import { useRef, useEffect } from 'react';
import './BlobCursor.css';

/**
 * Smooth trail cursor.
 * A small dot leads the pointer and drags a single smooth line behind it.
 * The canvas is fully cleared every frame and the trail is redrawn from a
 * buffer of recent points, so nothing static is ever left behind. Points
 * expire by age, giving a flexible line that follows and tapers cleanly.
 */
export default function BlobCursor({
  fillColor = '#FFFFFF',
  dotSize = 10,
  lineWidth = 3,
  trailLength = 18,   // how many recent points form the line (longer = longer trail)
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

    // Fixed-length follower chain: each node eases toward the node ahead of
    // it (node 0 eases toward the live pointer). Because every node only ever
    // moves a fraction toward its neighbour, consecutive nodes stay close —
    // the line can NEVER break or dash no matter how fast you move.
    const nodes = Array.from({ length: trailLength }, () => ({ x, y }));

    const onMove = (cx, cy) => {
      x = cx;
      y = cy;
    };
    const handleMouseMove = (e) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let raf;
    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Fully clear — no residue ever stays on screen.
      ctx.clearRect(0, 0, w, h);

      if (!reduce) {
        // Advance the chain: head chases the pointer, each node chases the
        // previous node. 0.4 = springiness (higher snaps tighter to cursor).
        nodes[0].x += (x - nodes[0].x) * 0.4;
        nodes[0].y += (y - nodes[0].y) * 0.4;
        for (let i = 1; i < nodes.length; i++) {
          nodes[i].x += (nodes[i - 1].x - nodes[i].x) * 0.4;
          nodes[i].y += (nodes[i - 1].y - nodes[i].y) * 0.4;
        }

        // ONE continuous smooth path through all nodes (midpoint spline).
        ctx.strokeStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i < nodes.length - 1; i++) {
          const mx = (nodes[i].x + nodes[i + 1].x) / 2;
          const my = (nodes[i].y + nodes[i + 1].y) / 2;
          ctx.quadraticCurveTo(nodes[i].x, nodes[i].y, mx, my);
        }
        ctx.stroke();
      }

      // The leading dot, always at the live pointer.
      ctx.fillStyle = fillColor;
      ctx.beginPath();
      ctx.arc(x, y, dotSize / 2, 0, Math.PI * 2);
      ctx.fill();

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
  }, [fillColor, dotSize, lineWidth, trailLength]);

  return (
    <div className="cursor-container" style={{ zIndex }}>
      <canvas ref={canvasRef} className="cursor-canvas" />
    </div>
  );
}
