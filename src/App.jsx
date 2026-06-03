import { useState } from 'react';
import IntroAnimation from './components/IntroAnimation';
import Hero from './components/Hero';
import WhatIsTCQ from './components/WhatIsTCQ';
import WhoIsBehind from './components/WhoIsBehind';
import Services from './components/Services';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <IntroAnimation onComplete={() => setIntroComplete(true)} />
      {introComplete && (
        <main>
          <Hero />
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
