import { motion } from 'framer-motion';
import './WingsBrandsSection.css';

import kynLogo from '../assets/partners/kyn.png';
import kisCafeLogo from '../assets/partners/kis-cafe.jpg';
import mopVaishnavLogo from '../assets/partners/mop-vaishnav.jpg';
import kraftCollectiveLogo from '../assets/partners/kraft-collective.png';
import skySecretsLogo from '../assets/partners/sky-secrets.png';
import goetheInstitutLogo from '../assets/partners/goethe-institut.png';
import chennaiQuizFactoryLogo from '../assets/partners/chennai-quiz-factory.jpeg';
import watsonsLogo from '../assets/partners/watsons.jpeg';
import lecturesOnTheRocksLogo from '../assets/partners/lectures-on-the-rocks.png';
import litArcadeLogo from '../assets/partners/lit-arcade.png';
import bertyAshleyLogo from '../assets/partners/berty-ashley-think-tank.jpg';
import instinctsSsnLogo from '../assets/partners/instincts-ssn.png';

const BRAND_SLOTS = [
  { id: 1, name: 'Kyn', logo: kynLogo },
  { id: 2, name: 'KIS Cafe', logo: kisCafeLogo },
  { id: 3, name: 'MOP Vaishnav College', logo: mopVaishnavLogo },
  { id: 4, name: 'Kraft Collective', logo: kraftCollectiveLogo },
  { id: 5, name: 'Sky Secrets', logo: skySecretsLogo },
  { id: 6, name: 'Goethe-Institut', logo: goetheInstitutLogo },
  { id: 7, name: 'Chennai Quiz Factory', logo: chennaiQuizFactoryLogo },
  { id: 8, name: "Watson's — The Neighbourhood Bar", logo: watsonsLogo },
  { id: 9, name: 'Lectures on the Rocks', logo: lecturesOnTheRocksLogo },
  { id: 10, name: 'Lit Arcade', logo: litArcadeLogo },
  { id: 11, name: 'Berty Ashley Think Tank', logo: bertyAshleyLogo },
  { id: 12, name: "Instincts '26, SSN", logo: instinctsSsnLogo },
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
        <img src={slot.logo} alt={`${slot.name} logo`} style={{ maxWidth: '90%', maxHeight: '64px', objectFit: 'contain' }} />
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
                  <img src={slot.logo} alt="" style={{ height: '28px', objectFit: 'contain', opacity: 0.85 }} />
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
