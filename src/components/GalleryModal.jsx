import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const getCols = () => (window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 3 : 4);

/* ── Generates a set of varied placeholder tiles for the gallery.
   Each tile gets a random aspect ratio drawn from a curated set so
   the masonry columns feel authentically editorial. ── */
const ASPECT_POOL = [
  { w: 3, h: 4 },   // portrait standard
  { w: 4, h: 3 },   // landscape standard
  { w: 1, h: 1 },   // square
  { w: 2, h: 3 },   // tall portrait
  { w: 16, h: 9 },  // cinematic
  { w: 3, h: 2 },   // wide landscape
];

function makeTiles(photos, count = 12) {
  const tiles = [];
  // First: the real event photos
  photos.forEach((p, i) => tiles.push({ ...p, key: `real-${i}` }));
  // Then: fill to `count` with placeholder tiles cycling through aspect pool
  for (let i = tiles.length; i < count; i++) {
    const aspect = ASPECT_POOL[i % ASPECT_POOL.length];
    tiles.push({ src: null, w: aspect.w, h: aspect.h, key: `ph-${i}` });
  }
  return tiles;
}

/* ── Pinterest masonry: distributes tiles across N columns,
   placing each tile into the shortest column. ── */
function buildColumns(tiles, cols) {
  const columns = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);

  tiles.forEach((tile) => {
    const shortest = heights.indexOf(Math.min(...heights));
    columns[shortest].push(tile);
    heights[shortest] += tile.h / tile.w; // add normalised height
  });

  return columns;
}

function GalleryTile({ tile, index, onOpen }) {
  const isPlaceholder = !tile.src;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(tile)}
      style={{
        width: '100%',
        aspectRatio: `${tile.w} / ${tile.h}`,
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'zoom-in',
        marginBottom: '14px',
        background: isPlaceholder
          ? 'linear-gradient(135deg, #E8D0A0 0%, #F7E7C4 50%, #E8D0A0 100%)'
          : 'transparent',
        border: isPlaceholder ? '1px solid rgba(56,37,37,0.08)' : 'none',
        boxShadow: '0 4px 18px rgba(56,37,37,0.08)',
        position: 'relative',
        flexShrink: 0,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(56,37,37,0.16)' }}
    >
      {tile.src ? (
        <img
          src={tile.src}
          alt="Gallery photo"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            color: 'rgba(56,37,37,0.35)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <span style={{ fontSize: '0.65rem', fontFamily: "'Outfit', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
            Photo
          </span>
        </div>
      )}
    </motion.div>
  );
}

export default function GalleryModal({ event, onClose }) {
  const [cols, setCols] = useState(getCols);

  /* Close on Escape; keep column count in sync with viewport while open */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    const onResize = () => setCols(getCols());
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const tiles = makeTiles(event.photos, 14);
  const columns = buildColumns(tiles, cols);

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="gallery-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200000,
          background: 'rgba(56, 37, 37, 0.88)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          overflowY: 'auto',
          cursor: 'pointer',
        }}
      >
        {/* ── Panel ── */}
        <motion.div
          key="gallery-panel"
          initial={{ y: '6%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '6%', opacity: 0 }}
          transition={{ type: 'spring', damping: 26, stiffness: 160 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            minHeight: '100dvh',
            margin: '0 auto',
            maxWidth: '1200px',
            padding: 'clamp(2rem, 6vw, 4rem)',
            cursor: 'default',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
            gap: '1rem',
          }}>
            <div>
              <span style={{
                display: 'block',
                fontSize: '0.7rem',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D58F6B',
                marginBottom: '0.4rem',
              }}>
                Gallery
              </span>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
                color: '#F7E7C4',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {event.name}
              </h2>
              <p style={{
                fontFamily: "'Newsreader', Georgia, serif",
                fontStyle: 'italic',
                fontSize: '1rem',
                color: 'rgba(247,231,196,0.6)',
                marginTop: '0.3rem',
              }}>
                {event.venue}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(247,231,196,0.08)',
                border: '1px solid rgba(247,231,196,0.15)',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                color: '#F7E7C4',
                fontSize: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(213,143,107,0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(247,231,196,0.08)'}
            >
              &times;
            </button>
          </div>

          {/* Pinterest Masonry Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '14px',
            alignItems: 'start',
          }}>
            {columns.map((col, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column' }}>
                {col.map((tile, ti) => (
                  <GalleryTile
                    key={tile.key}
                    tile={tile}
                    index={ci * 4 + ti}
                    onOpen={() => {}}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p style={{
            textAlign: 'center',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.8rem',
            color: 'rgba(247,231,196,0.3)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '3rem',
            paddingBottom: '2rem',
          }}>
            More photos coming soon
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
