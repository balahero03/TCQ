import { motion } from 'framer-motion';
import './WingsBrandsSection.css';

/* No real partner logos yet — these are placeholder slots (same convention
   as wingsData.js `ph()` and WhoIsBehind's `img: null`). Replace `name` with
   the real brand and drop a logo file in src/assets/brands/<file> when ready;
   swap the placeholder tile for an <img> once real assets exist. */
const BRAND_SLOTS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: null, // e.g. 'Acme Co.' once confirmed
}));

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function BrandTile({ slot }) {
  return (
    <motion.div className="wbs-tile" variants={tileVariants}>
      {slot.name ? (
        <span className="wbs-tile-name">{slot.name}</span>
      ) : (
        <>
          <span className="wbs-tile-icon" aria-hidden="true">✦</span>
          <span className="wbs-tile-label">Logo soon</span>
        </>
      )}
    </motion.div>
  );
}

export default function WingsBrandsSection() {
  // Duplicate the slots so the marquee track can loop seamlessly at -50%.
  const marqueeSlots = [...BRAND_SLOTS, ...BRAND_SLOTS];

  return (
    <section className="wbs-section" id="brands">
      <div className="wbs-glow" />

      <div className="wbs-header">
        <span className="wbs-eyebrow">Our Partners</span>
        <h2 className="wbs-title">
          Brands we've<br /><span className="wbs-title-accent">worked with</span>
        </h2>
        <p className="wbs-sub">
          Logos land here as partnerships are confirmed — for now, here's a seat
          held open for each one.
        </p>
      </div>

      {/* Featured grid — staggers in on scroll */}
      <motion.div
        className="wbs-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {BRAND_SLOTS.slice(0, 6).map((slot) => (
          <BrandTile key={slot.id} slot={slot} />
        ))}
      </motion.div>

      {/* Endless marquee strip — a second, livelier read of the same slots */}
      <div className="wbs-marquee-wrap">
        <div className="wbs-marquee-track">
          {marqueeSlots.map((slot, i) => (
            <div className="wbs-marquee-tile" key={`${slot.id}-${i}`} aria-hidden={i >= BRAND_SLOTS.length}>
              <span className="wbs-marquee-icon" aria-hidden="true">✦</span>
              <span className="wbs-marquee-label">Logo soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
