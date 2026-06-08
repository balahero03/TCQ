import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const services = [
  {
    id: 1,
    tag: "TCQ FOR BRANDS",
    title: "For Brands",
    description: "We help brands build meaningful communities through highly engaging, interactive, learning-led experiences. We curate partnerships, foster collaborations, and design live and digital formats centred on knowledge."
  },
  {
    id: 2,
    tag: "TCQ QUIZZES",
    title: "Quizzes",
    description: "Every question blends a puzzle with a story, so participants leave not just with results, but with stories they remember for life. With nearly 15 years of experience, we specialise in marketing and seamlessly integrating brands into our quizzes."
  },
  {
    id: 3,
    tag: "TCQ CIRCLES",
    title: "Circles",
    description: "Our flagship monthly live event series featuring lectures, panel discussions, interviews, workshops, and curated performances. Designed for a limited audience where diverse fields intersect and engage with new niches."
  },
  {
    id: 4,
    tag: "TCQ WRITES",
    title: "Writes",
    description: "Our newsletter celebrating Chennai as the melting pot of cultures and new experiences. We spotlight events and stories often overlooked by mainstream media, collaborating with small brands and artists."
  },
  {
    id: 5,
    tag: "TCQ TEACHES",
    title: "Teaches",
    description: "We work with schools and colleges to cultivate healthier learning practices — quizzing, public speaking, and performing arts — partnering with prestigious institutions across Chennai to nurture curiosity from a young age."
  }
];

const WhatWeDo = () => {
  return (
    <div style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      fontFamily: "'Outfit', sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* ── Large Blurred Background Typography (absolute, stays inside this section only) ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: 'clamp(5rem, 15vw, 16rem)',
          fontWeight: 900,
          color: 'rgba(31, 9, 12, 0.04)',
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          filter: 'blur(5px)',
          textTransform: 'uppercase'
        }}>
          <div>WHAT</div>
          <div>WE DO</div>
        </div>
      </div>

      {/* ── Section Heading ── */}
      <div style={{ 
        textAlign: 'center', 
        padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 2rem) clamp(1.5rem, 3vh, 3rem)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: 'clamp(0.5rem, 1.5vw, 1rem)', 
          marginBottom: '0.75rem' 
        }}>
          <div style={{ width: 'clamp(1rem, 3vw, 2rem)', height: '2px', background: '#8D424E' }} />
          <div style={{ 
            fontSize: 'clamp(0.65rem, 1vw, 0.85rem)', 
            letterSpacing: '0.25em', 
            textTransform: 'uppercase', 
            color: '#8D424E', 
            fontWeight: 700 
          }}>
            Our Services
          </div>
          <div style={{ width: 'clamp(1rem, 3vw, 2rem)', height: '2px', background: '#8D424E' }} />
        </div>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
          fontWeight: 900,
          color: '#1F090C',
          letterSpacing: '-0.04em',
          margin: '0 0 0.5rem 0',
          lineHeight: 1
        }}>
          What We Do
        </h2>
        <p style={{
          fontSize: 'clamp(0.9rem, 1.3vw, 1.15rem)',
          color: 'rgba(31, 9, 12, 0.5)',
          maxWidth: '500px',
          margin: '0.75rem auto 0',
          lineHeight: 1.6,
          padding: '0 1rem'
        }}>
          End-to-end experiences designed to make curiosity social.
        </p>
      </div>

      {/* ── ScrollStack Cards ── */}
      <div style={{ 
        width: '100%', 
        maxWidth: '750px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 1,
        padding: '0 clamp(1rem, 3vw, 1.5rem)'
      }}>
        <ScrollStack
          itemDistance={60}
          itemScale={0.02}
          itemStackDistance={25}
          stackPosition="20%"
          scaleEndPosition="10%"
          baseScale={0.88}
          scaleDuration={0.5}
          rotationAmount={-1.5}
          blurAmount={0}
          useWindowScroll={true}
        >
          {services.map((service, index) => (
            <ScrollStackItem key={service.id}>
              <div style={{
                background: '#F7EAEB',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '12px',
                padding: 'clamp(2rem, 4vw, 4rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                boxShadow: '0 4px 20px rgba(31, 9, 12, 0.08)',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}>

                {/* Large number in top-right */}
                <div style={{
                  position: 'absolute',
                  top: 'clamp(1.2rem, 2.5vw, 2.5rem)',
                  right: 'clamp(1.5rem, 3vw, 3rem)',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight: 900,
                  color: 'rgba(31, 9, 12, 0.08)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em'
                }}>
                  0{index + 1}
                </div>

                {/* Content at bottom */}
                <div>
                  {/* Wing tag */}
                  <div style={{
                    display: 'inline-block',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#8D424E',
                    background: 'rgba(141,66,78,0.08)',
                    padding: '4px 10px',
                    borderRadius: '3px',
                    marginBottom: '0.9rem'
                  }}>
                    {service.tag}
                  </div>
                  <h3 style={{
                    fontSize: 'clamp(1.6rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#1F090C',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    margin: '0 0 0.75rem 0',
                    fontFamily: "'Outfit', sans-serif"
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(0.8rem, 1.1vw, 1.05rem)',
                    lineHeight: 1.5,
                    color: 'rgba(31, 9, 12, 0.5)',
                    margin: 0,
                    fontWeight: 400,
                    maxWidth: '400px'
                  }}>
                    {service.description}
                  </p>
                </div>

              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

    </div>
  );
};

export default WhatWeDo;
