import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import OptionWheel from './OptionWheel';
import './BrandsSection.css';

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  {
    name: 'Google',
    sector: 'Technology',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg',
    // brightness(0) → pure black, then colorize to #4285F4 (Google blue)
    filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(1352%) hue-rotate(198deg) brightness(103%) contrast(96%)',
  },
  {
    name: 'Amazon',
    sector: 'E-commerce & Cloud',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg',
    filter: 'brightness(0) saturate(100%) invert(60%) sepia(80%) saturate(700%) hue-rotate(1deg) brightness(103%) contrast(102%)',
  },
  {
    name: 'Tesla',
    sector: 'Electric Vehicles',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/tesla.svg',
    filter: 'brightness(0) saturate(100%) invert(13%) sepia(85%) saturate(5000%) hue-rotate(2deg) brightness(95%) contrast(120%)',
  },
  {
    name: 'Nike',
    sector: 'Sportswear',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/nike.svg',
    filter: 'brightness(0) saturate(100%)',
  },
  {
    name: 'Apple',
    sector: 'Consumer Technology',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apple.svg',
    filter: 'brightness(0) saturate(100%) invert(35%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(80%) contrast(90%)',
  },
  {
    name: 'Spotify',
    sector: 'Music Streaming',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/spotify.svg',
    filter: 'brightness(0) saturate(100%) invert(55%) sepia(69%) saturate(450%) hue-rotate(93deg) brightness(95%) contrast(90%)',
  },
  {
    name: 'Netflix',
    sector: 'Entertainment',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/netflix.svg',
    filter: 'brightness(0) saturate(100%) invert(12%) sepia(99%) saturate(5000%) hue-rotate(355deg) brightness(100%) contrast(115%)',
  },
  {
    name: 'Adobe',
    sector: 'Creative Software',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg',
    filter: 'brightness(0) saturate(100%) invert(15%) sepia(99%) saturate(7000%) hue-rotate(5deg) brightness(105%) contrast(120%)',
  },
  {
    name: 'Airbnb',
    sector: 'Travel & Hospitality',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/airbnb.svg',
    filter: 'brightness(0) saturate(100%) invert(47%) sepia(78%) saturate(700%) hue-rotate(316deg) brightness(100%) contrast(105%)',
  },
  {
    name: 'Notion',
    sector: 'Productivity',
    logo: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/notion.svg',
    filter: 'brightness(0) saturate(100%)',
  },
];



export default function BrandsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const active = BRANDS[activeIdx];

  // Pin section and drive the wheel from scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${BRANDS.length * 220}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.max(Math.round(self.progress * (BRANDS.length - 1)), 0),
            BRANDS.length - 1
          );
          setActiveIdx(idx);
          // Keep the left wheel in sync with scroll position
          wheelRef.current?.goTo(idx);
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // When user drags/clicks the wheel, sync the right side
  const handleWheelChange = (idx) => {
    setActiveIdx(idx);
  };

  return (
    <section className="bs-section" id="brands" ref={sectionRef}>

      <div className="bs-glow" />

      {/* ── Header ── */}
      <div className="bs-header">
        <span className="bs-eyebrow-top">Our Partners</span>
        <h2 className="bs-title">Brands We've<br />Worked With</h2>
      </div>

      {/* ── Left: OptionWheel ── */}
      <div className="bs-wheel-col">
        <OptionWheel
          ref={wheelRef}
          items={BRANDS.map(b => b.name)}
          defaultSelected={0}
          textColor="rgba(56,37,37,0.28)"
          activeColor="#382525"
          side="left"
          fontSize={3}
          spacing={1.4}
          curve={1}
          tilt={6}
          blur={2}
          fade={0.25}
          minOpacity={0.04}
          smoothing={200}
          inset={48}
          loop={false}
          draggable
          onChange={handleWheelChange}
        />
      </div>

      {/* ── Right: logo + sector ── */}
      <div className="bs-right-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.name}
            className="bs-right-inner"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              className="bs-logo-img"
              src={active.logo}
              alt={`${active.name} logo`}
              style={{ '--brand-color': active.color }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
  );
}
