import { motion } from 'framer-motion';
import './WingsBrandsSection.css';

const BRAND_SLOTS = [
  { id: 1, name: 'Google', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg' },
  { id: 2, name: 'Amazon', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg' },
  { id: 3, name: 'Tesla', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tesla.svg' },
  { id: 4, name: 'Nike', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nike.svg' },
  { id: 5, name: 'Apple', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apple.svg' },
  { id: 6, name: 'Spotify', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg' },
  { id: 7, name: 'Netflix', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netflix.svg' },
  { id: 8, name: 'Adobe', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg' },
  { id: 9, name: 'Airbnb', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/airbnb.svg' },
  { id: 10, name: 'Notion', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg' },
];

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
      {slot.logo ? (
        <img src={slot.logo} alt={`${slot.name} logo`} style={{ maxWidth: '80px', maxHeight: '40px', filter: 'brightness(0) opacity(0.7)' }} />
      ) : slot.name ? (
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
          Here are some of the amazing partners we have collaborated with to build impactful experiences.
        </p>
      </div>

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

      <div className="wbs-marquee-wrap">
        <div className="wbs-marquee-track">
          {marqueeSlots.map((slot, i) => (
            <div className="wbs-marquee-tile" key={`${slot.id}-${i}`} aria-hidden={i >= BRAND_SLOTS.length} style={{ gap: '1rem' }}>
              {slot.logo ? (
                <>
                  <img src={slot.logo} alt="" style={{ height: '24px', filter: 'brightness(0) opacity(0.5)' }} />
                  <span className="wbs-marquee-label">{slot.name}</span>
                </>
              ) : (
                <>
                  <span className="wbs-marquee-icon" aria-hidden="true">✦</span>
                  <span className="wbs-marquee-label">{slot.name || 'Logo soon'}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
