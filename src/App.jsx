import { useState, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import Services from './components/Services';
import Contact from './components/Contact';
import BlobCursor from './components/BlobCursor';
import './App.css';

function App() {
  // showContent: render Hero behind the fading overlay as logo starts flying
  const [showContent, setShowContent] = useState(false);
  // logoLanded: flying logo has reached top-left → reveal Hero's own logo
  const [logoLanded, setLogoLanded] = useState(false);

  const handleStartFly = useCallback(() => setShowContent(true), []);
  const handleLanded = useCallback(() => setLogoLanded(true), []);

  return (
    <>
      <IntroAnimation
        onStartFly={handleStartFly}
        onLanded={handleLanded}
      />
      
      {/* Global Blob Cursor for invert effect */}
      <BlobCursor
        blobType="circle"
        fillColor="#FFFFFF"
        trailCount={3}
        sizes={[87, 60, 60]}
        innerSizes={[100, 20, 20]}
        innerColor="#FFFFFF"
        opacities={[1, 1, 1]}
        shadowColor="#FFFFFF"
        shadowBlur={23}
        shadowOffsetX={27}
        shadowOffsetY={13}
        filterStdDeviation={30}
        useFilter={true}
        fastDuration={0.1}
        slowDuration={0.54}
        zIndex={9999}
      />

      {showContent && (
        <main>
          <Hero logoLanded={logoLanded} />
          <WhatIsTCQ />
          <WhoIsBehind />
          <Services />
          <Contact />
        </main>
      )}
    </>
  );
}

export default App;
