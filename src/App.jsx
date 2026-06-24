import { useState, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import WingReel from './components/WingReel';
import Contact from './components/Contact';
import BlobCursor from './components/BlobCursor';
import './App.css';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [logoLanded, setLogoLanded] = useState(false);

  const handleStartFly = useCallback(() => setShowContent(true), []);
  const handleLanded = useCallback(() => setLogoLanded(true), []);

  return (
    <>
      <IntroAnimation
        onStartFly={handleStartFly}
        onLanded={handleLanded}
      />

      {showContent && (
        <>
          <BlobCursor
            fillColor="#FFFFFF"
            dotSize={18}
            lineWidth={4}
            trailLength={18}
            zIndex={9999}
          />
        <main>
          <Hero logoLanded={logoLanded} />
          <WhatIsTCQ />
          <WhoIsBehind />
          <WingReel />
          <Contact />
        </main>
        </>
      )}
    </>
  );
}

export default App;
