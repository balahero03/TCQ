import { motion } from 'framer-motion';
import './BrandsSection.css';

const BRANDS = [
  {
    name: 'Google',
    sector: 'Technology',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg',
  },
  {
    name: 'Amazon',
    sector: 'E-commerce & Cloud',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg',
  },
  {
    name: 'Tesla',
    sector: 'Electric Vehicles',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tesla.svg',
  },
  {
    name: 'Nike',
    sector: 'Sportswear',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nike.svg',
  },
  {
    name: 'Apple',
    sector: 'Consumer Technology',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apple.svg',
  },
  {
    name: 'Spotify',
    sector: 'Music Streaming',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg',
  },
  {
    name: 'Netflix',
    sector: 'Entertainment',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netflix.svg',
  },
  {
    name: 'Adobe',
    sector: 'Creative Software',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg',
  },
  {
    name: 'Airbnb',
    sector: 'Travel & Hospitality',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/airbnb.svg',
  },
  {
    name: 'Notion',
    sector: 'Productivity',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg',
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function BrandCard({ brand }) {
  return (
    <motion.div className="bs-card" variants={cardVariants}>
      <div className="bs-card-glow" />
      <img
        className="bs-card-logo"
        src={brand.logo}
        alt={`${brand.name} logo`}
        loading="lazy"
      />
      <div className="bs-card-meta">
        <span className="bs-card-name">{brand.name}</span>
        <span className="bs-card-sector">{brand.sector}</span>
      </div>
    </motion.div>
  );
}

export default function BrandsSection() {
  return (
    <section className="bs-section" id="brands">
      <div className="bs-glow" />

      <div className="bs-header">
        <span className="bs-eyebrow-top">Our Partners</span>
        <h2 className="bs-title">Brands We've<br />Worked With</h2>
        <span className="bs-count">{BRANDS.length}+ collaborations and counting</span>
      </div>

      <motion.div
        className="bs-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        {BRANDS.map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </motion.div>
    </section>
  );
}
