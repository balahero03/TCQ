import { motion } from 'framer-motion';
import { TCQLogoSVG } from './IntroAnimation';

export default function Contact() {
  return (
    <section style={{ background: '#fff' }}>

      {/* CTA block */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 6vw 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B2737', fontWeight: 600 }}>
            Let's Connect
          </span>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 800, letterSpacing: '-0.04em',
            color: '#1a1a1a', marginTop: '1rem', marginBottom: '1.5rem',
            lineHeight: 1.05,
          }}>
            THINK<br />WITH US
          </h2>
          <p style={{
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: '#666', maxWidth: 480, margin: '0 auto 3rem',
            lineHeight: 1.7,
          }}>
            Ready to make curiosity social? Reach out and let's build something remarkable together.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            {[
              { label: 'Vishnu Aravind', icon: '○' },
              { label: 'thecuriosityquotient@gmail.com', icon: '◎', href: 'mailto:thecuriosityquotient@gmail.com' },
              { label: '+91 87544 00743', icon: '◌', href: 'tel:+918754400743' },
              { label: 'linktr.ee/tcq_india', icon: '◉', href: '#' },
            ].map(({ label, icon, href }) => (
              <motion.div
                key={label}
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 400 }}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
              >
                <span style={{ color: '#6B2737', fontSize: '1.1rem' }}>{icon}</span>
                {href ? (
                  <a href={href} style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#1a1a1a',
                    textDecoration: 'none', fontWeight: 500,
                    borderBottom: '1px solid rgba(107,39,55,0.3)',
                    transition: 'border-color 0.2s',
                  }}>
                    {label}
                  </a>
                ) : (
                  <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: '#1a1a1a', fontWeight: 500 }}>
                    {label}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#6B2737', padding: '4rem 6vw', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(240,234,226,0.06) 0%, transparent 60%)',
        }} />

        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '2rem', position: 'relative',
        }}>
          {/* Left: tagline */}
          <div>
            <p style={{
              color: 'rgba(240,234,226,0.7)',
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              fontStyle: 'italic',
              maxWidth: 380,
              lineHeight: 1.6,
            }}>
              Curiosity never killed the cat,<br />it raised a family of cats instead.
            </p>
          </div>

          {/* Center: cats SVG */}
          <FooterCatsSVG />

          {/* Right: logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <TCQLogoSVG size={50} color="#F0EAE2" />
            <div style={{ color: '#F0EAE2', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', lineHeight: 1.6, opacity: 0.8 }}>
              The<br />Curiosity<br />Quotient
            </div>
          </div>
        </div>

        <div style={{
          maxWidth: 1200, margin: '2rem auto 0',
          borderTop: '1px solid rgba(240,234,226,0.15)',
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span style={{ color: 'rgba(240,234,226,0.4)', fontSize: '0.75rem' }}>
            © 2025 The Curiosity Quotient. Chennai.
          </span>
          <span style={{ color: 'rgba(240,234,226,0.4)', fontSize: '0.75rem' }}>
            CQ + PQ &gt; IQ
          </span>
        </div>
      </footer>
    </section>
  );
}

function FooterCatsSVG() {
  return (
    <svg viewBox="0 0 440 130" width="320" height="95" fill="none" stroke="rgba(240,234,226,0.55)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      {/* 4 cats + question tail */}
      {[0, 90, 180, 270].map((ox, ci) => (
        <g key={ci} transform={`translate(${ox}, 0)`}>
          <path d={`M40,100 Q37,88 34,82 Q31,73 38,68 Q33,60 38,55 Q45,50 52,55 Q58,60 52,68 Q59,73 57,82 Q54,88 51,100 Z`} />
          <path d="M38,55 L34,46 L43,52" />
          <path d="M52,55 L56,46 L47,52" />
          <circle cx="43" cy="63" r="1.5" fill="rgba(240,234,226,0.55)" stroke="none" />
          <circle cx="51" cy="63" r="1.5" fill="rgba(240,234,226,0.55)" stroke="none" />
          <path d="M44,68 Q47,71 50,68" />
        </g>
      ))}
      {/* tiny cat with ? tail */}
      <g transform="translate(360, 8)">
        <path d="M35,92 Q33,82 31,76 Q29,68 34,63 Q30,57 34,52 Q39,47 45,52 Q50,57 45,63 Q50,68 48,76 Q46,82 44,92 Z" />
        <path d="M34,52 L30,44 L38,50" />
        <path d="M45,52 L49,44 L41,50" />
        <circle cx="37" cy="59" r="1.2" fill="rgba(240,234,226,0.55)" stroke="none" />
        <circle cx="43" cy="59" r="1.2" fill="rgba(240,234,226,0.55)" stroke="none" />
        <path d="M40,92 Q52,99 57,90 Q62,80 54,73 Q47,68 40,72 Q36,76 38,83" />
        <circle cx="38" cy="89" r="2" fill="rgba(240,234,226,0.55)" stroke="none" />
      </g>
      {/* ground line */}
      <line x1="20" y1="101" x2="420" y2="101" />
    </svg>
  );
}
