import { useState, useCallback } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import Services from './components/Services';
import Contact from './components/Contact';
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
