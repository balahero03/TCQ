import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';
import BlurText from './BlurText';
import TrueFocus from './TrueFocus';
import confetti from 'canvas-confetti';
import './Hero.css'; // Responsive styles

export default function Hero({ logoLanded }) {
  const ref = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // We delay the text animations so they occur EXACTLY as the intro overlay fades away
  const startDelay = 500;

  return (
    <section ref={ref} className="hero-section">
      {/* Clean Horizontal Rule for Header */}
      <div className="hero-divider" />

      {/* ══════════════════════════════════
          HEADER
         ══════════════════════════════════ */}
      <header className="hero-header">
        {/* Logo — permanent, fades in when flying lands */}
        <motion.img
          src={logoImg}
          alt="TCQ Logo"
          initial={{ opacity: 0 }}
          animate={{ opacity: logoLanded ? 1 : 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="hero-logo"
        />

        {/* Nav links (Desktop) */}
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hero-nav"
        >
          <TrueFocus
            sentence="Who's behind TCQ|What we do|Contact"
            separator="|"
            manualMode={false}
            blurAmount={2}
            borderColor="#8D424E"
            glowColor="rgba(141, 66, 78, 0.3)"
            animationDuration={0.8}
            pauseBetweenAnimations={1.5}
          />
        </motion.nav>

        {/* Mobile Burger Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              className="mobile-menu-btn" 
              style={{ position: 'absolute', top: '24px', right: '40px', display: 'block' }}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <a href="#" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Who's behind TCQ</a>
            <a href="#" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>What we do</a>
            <a href="#" className="mobile-menu-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════
          MAIN CONTENT - Left (Wider) & Right Split
         ══════════════════════════════════ */}
      <div className="hero-main">

        {/* LEFT COLUMN: Typography */}
        <div className="hero-left-column">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: startDelay / 1000 }}
            className="hero-typography-container"
          >
            <h1 className="hero-heading">
              <BlurText
                text="Making"
                initialDelay={startDelay}
                delay={0}
                initialBlur="blur(30px)"
                style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)', fontWeight: 600, display: 'block', margin: 0, padding: 0 }}
              />
              <BlurText
                text="curiosity"
                initialDelay={startDelay + 250}
                delay={0}
                initialBlur="blur(30px)"
                style={{
                  fontSize: 'clamp(3rem, 9vw, 8.5rem)',
                  fontWeight: 400,
                  fontFamily: "'Georgia', 'Playfair Display', serif",
                  fontStyle: 'italic',
                  color: '#8D424E',
                  display: 'block',
                  margin: 0,
                  padding: 0
                }}
              />
              <BlurText
                text="social."
                initialDelay={startDelay + 500}
                delay={0}
                initialBlur="blur(30px)"
                style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)', fontWeight: 600, display: 'block', margin: 0, padding: 0 }}
              />
            </h1>

            <div className="hero-text-wrapper">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (startDelay + 300) / 1000 }}
                className="hero-paragraph"
              >
                Feeling lost in solitary learning? The Curiosity Quotient (TCQ) brings knowledge, culture, and people together to create experiences that make learning fun.
              </motion.p>
            </div>

            <div className="hero-button-container">
              <motion.button
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ delay: (startDelay + 400) / 1000, duration: 0.5 }}
                className="explore-button"
              >
                <span style={{ color: '#E6BABE', fontSize: '1.2rem', lineHeight: 1 }}>+</span> Explore TCQ
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Quiz Card (Stacked Effect) */}
        <div className="hero-right-column">
          <QuizCard startDelay={startDelay} />
        </div>

      </div>
    </section>
  );
}

/* ── Interactive 5-Question Quiz Component ── */
function QuizCard({ startDelay }) {
  const questions = [
    {
      question: "Pulitzer Prize-winning author Thomas L. Friedman coined the term 'Curiosity Quotient' to describe what?",
      options: [
        "A person's ability to retain trivia",
        "Motivation to learn regardless of IQ",
        "The social aspect of modern education",
        "An algorithm for predicting success"
      ],
      correctIndex: 1,
      fact: "TCQ combines this concept with 'Typical Chennai Question', a term of pride in local quizzing circles!"
    },
    {
      question: "Which of the following is considered a core element of making learning 'social' at TCQ?",
      options: [
        "Studying alone in a library",
        "Passive video lectures",
        "Spaces where knowledge, culture, and people collide",
        "Standardized written exams"
      ],
      correctIndex: 2,
      fact: "TCQ brings people together through lectures, quizzes, workshops, and experimental formats."
    },
    {
      question: "Since its founding in 2023, how many individuals have joined the TCQ community?",
      options: [
        "Around 500",
        "Over 1,000",
        "More than 2,000",
        "Exactly 5,000"
      ],
      correctIndex: 2,
      fact: "The community has rapidly grown to over 2,000 individuals thriving on knowledge!"
    },
    {
      question: "What is the primary mission of The Curiosity Quotient?",
      options: [
        "To make learning fun",
        "To replace traditional schools",
        "To publish a new encyclopedia",
        "To build a trivia app"
      ],
      correctIndex: 0,
      fact: "As TCQ expands across physical spaces and digital platforms, making learning fun remains the core mission."
    },
    {
      question: "In the context of TCQ, what does a 'Typical Chennai Question' represent?",
      options: [
        "A question with no answer",
        "A term of pride where the answer is decipherable",
        "A mathematically complex puzzle",
        "A question about Chennai's geography"
      ],
      correctIndex: 1,
      fact: "A 'Typical Chennai Question' is famous in quizzing for being highly workable and decipherable from clues!"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentIndex];

  const handleSelect = (idx) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    if (selectedOption === q.correctIndex) {
      setScore(s => s + 1);
      // Fire beautiful color ribbon rain for correct answers!
      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.1 },
        colors: ['#8D424E', '#1F090C', '#E6BABE', '#BE5C6C'],
        startVelocity: 45,
        gravity: 0.8,
        ticks: 300,
        shapes: ['square', 'circle']
      });
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 1, delay: (startDelay + 500) / 1000, ease: [0.16, 1, 0.3, 1] }}
      className="quiz-card-wrapper"
    >
      {/* Background Stack Paper 2 (Bottom) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(31, 9, 12, 0.1)',
        borderRadius: '16px',
        transform: 'rotate(-4deg) translateY(12px)',
        zIndex: 1,
        boxShadow: '0 10px 20px rgba(31, 9, 12, 0.02)',
      }} />

      {/* Background Stack Paper 1 (Middle) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#FAF7F8',
        border: '1px solid rgba(31, 9, 12, 0.08)',
        borderRadius: '16px',
        transform: 'rotate(3deg) translateY(6px)',
        zIndex: 2,
        boxShadow: '0 10px 20px rgba(31, 9, 12, 0.03)',
      }} />

      {/* Main Foreground Card */}
      <div className="quiz-card-inner">

        {isFinished ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1F090C', marginBottom: '16px' }}>Quiz Complete!</h3>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#8D424E', marginBottom: '24px' }}>
              {score} <span style={{ fontSize: '1.5rem', color: '#A0A4A6' }}>/ {questions.length}</span>
            </div>
            <p style={{ textAlign: 'center', color: '#595F61', marginBottom: '32px' }}>
              {score === 5 ? "Perfect score! You truly have a high Curiosity Quotient." : "Great job! Keep exploring and making learning social."}
            </p>
            <button
              onClick={handleRestart}
              style={{
                padding: '14px 28px',
                backgroundColor: '#1F090C',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: '#8D424E', textTransform: 'uppercase' }}>Daily TCQ</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#A0A4A6' }}>
                  {String(currentIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.5, color: '#1F090C', marginBottom: '32px' }}>
                {q.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {q.options.map((opt, idx) => {
                  let bgColor = '#FFFFFF';
                  let borderColor = 'rgba(31, 9, 12, 0.15)';
                  let textColor = '#383B3D';

                  if (isSubmitted) {
                    if (idx === q.correctIndex) {
                      bgColor = '#8D424E'; // Brand primary
                      borderColor = '#8D424E';
                      textColor = '#FFFFFF';
                    } else if (idx === selectedOption) {
                      bgColor = '#F7EAEB';
                      borderColor = '#E6BABE';
                      textColor = '#1F090C';
                    }
                  } else if (selectedOption === idx) {
                    borderColor = '#8D424E';
                    textColor = '#1F090C';
                    bgColor = '#F7EAEB';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '14px 20px',
                        borderRadius: '8px',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        color: textColor,
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        cursor: isSubmitted ? 'default' : 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOption === null}
                  style={{
                    marginTop: '32px',
                    padding: '16px',
                    backgroundColor: selectedOption !== null ? '#1F090C' : '#E0E3E5',
                    color: selectedOption !== null ? '#FFFFFF' : '#A0A4A6',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: selectedOption !== null ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ fontSize: '0.9rem', color: '#595F61', lineHeight: 1.5 }}
                  >
                    <span style={{
                      color: selectedOption === q.correctIndex ? '#2e7d32' : '#8D424E',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      {selectedOption === q.correctIndex ? "Correct!" : "Not quite!"}
                    </span>
                    <strong>Fun Fact:</strong> {q.fact}
                  </motion.div>
                  <button
                    onClick={handleNext}
                    style={{
                      padding: '16px',
                      backgroundColor: '#1F090C',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {currentIndex < questions.length - 1 ? 'Next Question →' : 'See Results'}
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
