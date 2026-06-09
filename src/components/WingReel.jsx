import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WINGS } from './wingsData';
import './WingReel.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Static scatter positions for the 5 cards (% of the play area) ──
   Each card also carries a "depth" — nearer cards (bigger depth) react
   more strongly to the cursor, giving a parallax/magnetic feel. */
const CARD_LAYOUT = [
  { x: 16, y: 14, r: -7, depth: 1.0 },
  { x: 60, y: 8,  r: 6,  depth: 0.7 },
  { x: 8,  y: 56, r: 5,  depth: 0.85 },
  { x: 52, y: 52, r: -5, depth: 1.15 },
  { x: 34, y: 80, r: 8,  depth: 0.6 },
];

function MagneticCard({ wing, layout, mx, my }) {
  // pull toward the cursor, scaled by the card's depth
  const tx = useTransform(mx, (v) => v * 40 * layout.depth);
  const ty = useTransform(my, (v) => v * 40 * layout.depth);
  const x = useSpring(tx, { stiffness: 120, damping: 16, mass: 0.5 });
  const y = useSpring(ty, { stiffness: 120, damping: 16, mass: 0.5 });

  return (
    <motion.div
      className="wr-mcard"
      style={{
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        x,
        y,
        rotate: layout.r,
        zIndex: Math.round(layout.depth * 10),
      }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="wr-mcard-no">{wing.no}</span>
      <span className="wr-mcard-name">{wing.title}</span>
      <span className="wr-mcard-tag">{wing.tag}</span>
      <span className="wr-mcard-spark" aria-hidden="true">✦</span>
    </motion.div>
  );
}

function MagneticCards() {
  const areaRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="wr-magnet"
      ref={areaRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {WINGS.map((w, i) => (
        <MagneticCard key={w.id} wing={w} layout={CARD_LAYOUT[i]} mx={mx} my={my} />
      ))}
    </div>
  );
}

/* A single photo frame: placeholder until a real `src` is provided.
   Tilts in 3D toward the cursor and brightens under the spotlight. */
function PhotoFrame({ photo, idx, label }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', `${-py * 10}deg`);
    el.style.setProperty('--ry', `${px * 12}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <figure
      ref={ref}
      className="wr-frame"
      style={{ aspectRatio: photo.w / photo.h, '--i': idx }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {photo.src ? (
        <img src={photo.src} alt={label} loading="lazy" />
      ) : (
        <div className="wr-placeholder">
          <span className="wr-ph-icon" aria-hidden="true">✦</span>
          <span className="wr-ph-label">{label}</span>
        </div>
      )}
      <div className="wr-frame-sheen" />
    </figure>
  );
}

function EventPanel({ event, index }) {
  return (
    <div className="wr-panel wr-event" data-layout={event.layout}>
      <div className={`wr-photos wr-photos--${event.layout}`}>
        {event.photos.map((p, i) => (
          <PhotoFrame key={i} photo={p} idx={i} label={event.name} />
        ))}
      </div>

      <figcaption className="wr-caption">
        <span className="wr-caption-index">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h3 className="wr-caption-title">{event.name}</h3>
          <p className="wr-caption-venue">{event.venue}</p>
        </div>
      </figcaption>
    </div>
  );
}

function WingTitlePanel({ wing }) {
  return (
    <div className="wr-panel wr-wingtitle" data-wing={wing.no}>
      <span className="wr-ghost-no">{wing.no}</span>
      <div className="wr-intro-inner">
        <span className="wr-tag">{wing.tag}</span>
        <h2 className="wr-title">{wing.title}</h2>
        <p className="wr-blurb">{wing.blurb}</p>
      </div>
    </div>
  );
}

export default function WingReel() {
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const [spot, setSpot] = useState({ x: 50, y: 50, on: false });
  const [activeWing, setActiveWing] = useState(0); // index into WINGS

  // ── Horizontal scroll-driven track (pin the screen, translate sideways) ──
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 820px)').matches;
    if (reduce || isMobile) return; // mobile falls back to native horizontal swipe (CSS)

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, { x: () => -distance(), ease: 'none' });

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight}`,
        pin: true,
        scrub: 0.6,
        animation: tween,
        invalidateOnRefresh: true,
      });

      // Update the active-wing indicator as each wing-title panel reaches centre
      const titles = gsap.utils.toArray('.wr-wingtitle');
      titles.forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          containerAnimation: tween,
          start: 'left center',
          end: 'right center',
          onToggle: (self) => { if (self.isActive) setActiveWing(i); },
        });
      });
    }, pinRef);

    return () => ctx.revert();
  }, []);

  // ── Cursor spotlight position (whole section) ──
  const onSpot = (e) => {
    const r = pinRef.current?.getBoundingClientRect();
    if (!r) return;
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
      on: true,
    });
  };

  return (
    <>
      {/* ════════ Opening: its own vertical page (normal scroll) ════════ */}
      <section className="wr-opening-page">
        <div className="wr-opening">
          <span className="wr-opening-eyebrow">What we do</span>
          <h2 className="wr-opening-title">
            Five wings,
            <br />
            <span className="wr-opening-accent">one curiosity.</span>
          </h2>
          <p className="wr-opening-sub">
            End-to-end experiences designed to make curiosity social. Say hello
            to the five wings of TCQ.
          </p>
          <span className="wr-scroll-hint">
            scroll to explore <span aria-hidden="true">↓</span>
          </span>
        </div>

        {/* Right side: magnetic wing cards that drift toward the cursor */}
        <MagneticCards />
      </section>

      {/* ════════ Pinned horizontal reel of the five wings ════════ */}
      <section
        className="wr-section"
        ref={pinRef}
        onMouseMove={onSpot}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      >
        {/* cursor spotlight wash */}
        <div
          className="wr-spotlight"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(214,131,139,0.16), transparent 70%)`,
          }}
        />

        {/* the connecting thread runs through the whole reel */}
        <div className="wr-thread" />

        {/* fixed wing progress indicator */}
        <div className="wr-indicator" aria-hidden="true">
          <span className="wr-indicator-no">{WINGS[activeWing].no}</span>
          <span className="wr-indicator-name">{WINGS[activeWing].title}</span>
          <div className="wr-indicator-dots">
            {WINGS.map((w, i) => (
              <span key={w.id} className={i === activeWing ? 'on' : ''} />
            ))}
          </div>
        </div>

        <div className="wr-track" ref={trackRef}>
          {/* ── Each wing: title panel, then its event panels ── */}
          {WINGS.map((wing) => (
            <div className="wr-winggroup" key={wing.id}>
              <WingTitlePanel wing={wing} />
              {wing.events.map((ev, i) => (
                <EventPanel key={ev.name} event={ev} index={i} />
              ))}
            </div>
          ))}

          {/* ── Closing cap ── */}
          <div className="wr-panel wr-endcap">
            <span className="wr-endcap-word">make curiosity social</span>
          </div>
        </div>
      </section>
    </>
  );
}
