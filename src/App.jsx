import { useState, useCallback, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import WingReel from './components/WingReel';
import WingsBrandsSection from './components/WingsBrandsSection';
import CallOutSection from './components/CallOutSection';
import Contact from './components/Contact';
import BlobCursor from './components/BlobCursor';
import './App.css';

const INTRO_SEEN_KEY = 'tcq-intro-seen';

// Always open at the top on reload, as the intro did; hash links scroll below.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

// The intro plays once per tab session, and never for reduced motion or deep links.
function shouldSkipIntro() {
  if (window.location.hash) return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function App() {
  const [skipIntro] = useState(shouldSkipIntro);
  const [showContent, setShowContent] = useState(skipIntro);
  const [logoLanded, setLogoLanded] = useState(skipIntro);

  const handleStartFly = useCallback(() => setShowContent(true), []);
  const handleLanded = useCallback(() => {
    setLogoLanded(true);
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      // Storage blocked: the intro just plays again next load.
    }
  }, []);

  // Deep links: the page didn't exist when the browser looked for the hash, and
  // pinned sections need WingReel's ScrollTrigger refresh before they can be measured.
  useEffect(() => {
    if (!window.location.hash) return;
    const t = setTimeout(() => {
      const el = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (!el) return;
      const top = el._scrollTrigger ? el._scrollTrigger.start : window.scrollY + el.getBoundingClientRect().top;
      window.scrollTo({ top, behavior: 'instant' });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {!skipIntro && (
        <IntroAnimation
          onStartFly={handleStartFly}
          onLanded={handleLanded}
        />
      )}

      {showContent && (
        <>
          <BlobCursor
            fillColor="#D58F6B"
            dotSize={9}
            lineWidth={2}
            trailLength={18}
            zIndex={9999}
            hideOver=".focus-word, .ctf-social"
          />
        <main>
          <Hero logoLanded={logoLanded} />
          <WhatIsTCQ />
          <WhoIsBehind />
          <WingReel />
          <CallOutSection />
          <WingsBrandsSection />
          <Contact />
        </main>
        </>
      )}
    </MotionConfig>
  );
}

export default App;
