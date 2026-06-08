import { useState, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import WhatWeDo from './components/WhatWeDo';
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
            blobType="circle"
            fillColor="#FFFFFF"
            trailCount={3}
            sizes={[55, 38, 38]}
            innerSizes={[60, 14, 14]}
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
        <main>
          <Hero logoLanded={logoLanded} />
          <WhatIsTCQ />
          <WhoIsBehind />
          <WhatWeDo />
          <Contact />
        </main>
        </>
      )}
    </>
  );
}

export default App;
