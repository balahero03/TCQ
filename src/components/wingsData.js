// ─────────────────────────────────────────────────────────────
// TCQ Wings data (from the portfolio deck).
//
// Photos are placeholders for now. When real images land in
// src/assets/wings/<wing>/<file>, import them and replace the
// `src: null` fields below with the imported asset.
//
//   ph(w, h)        → single placeholder with an aspect hint
//   layout 'fan'    → overlapping polaroid cluster (works for 2–3)
//   layout 'hero'   → one cinematic frame
//   layout 'grid'   → contact-sheet grid (used for Writes' 6 cards)
// ─────────────────────────────────────────────────────────────

const ph = (w, h) => ({ src: null, w, h });

export const WINGS = [
  {
    id: 1,
    no: '01',
    tag: 'TCQ FOR BRANDS',
    title: 'For Brands',
    blurb:
      'We help brands build meaningful communities through highly engaging, interactive, learning-led experiences — curating partnerships and designing live and digital formats centred on knowledge.',
    events: [
      {
        name: 'Typical Chennai Quiz',
        venue: 'For KYN app, 2025',
        layout: 'fan',
        photos: [ph(4, 3), ph(3, 4), ph(4, 3)],
      },
      {
        name: 'Walls on Wheels',
        venue: 'For Five Feet Collective — a mural workshop',
        layout: 'hero',
        photos: [ph(16, 9)],
      },
      {
        name: 'TCQ Jams',
        venue: 'For KIS Cafe, a music-themed cafe at Adyar',
        layout: 'fan',
        photos: [ph(3, 4), ph(3, 4), ph(3, 4)],
      },
    ],
  },
  {
    id: 2,
    no: '02',
    tag: 'TCQ QUIZZES',
    title: 'Quizzes',
    blurb:
      'Every question blends a puzzle with a story, so participants leave not just with results but with stories they remember for life. With nearly 15 years of experience, we specialise in marketing and seamlessly integrating brands into our quizzes.',
    events: [
      {
        name: "Fundamavan '26",
        venue: 'SSN Instincts Flagship General Quiz',
        layout: 'fan',
        photos: [ph(3, 4), ph(4, 3), ph(16, 9)],
      },
      {
        name: 'Abuzz 2025',
        venue: 'Inter-school Quiz Finals — PSBB Group of Schools',
        layout: 'fan',
        photos: [ph(4, 3), ph(4, 3), ph(16, 9)],
      },
      {
        name: '6 to 60 Quizzes',
        venue: '15 weeks of endless curiosity at KIS Cafe',
        layout: 'fan',
        photos: [ph(3, 4), ph(3, 4), ph(3, 4)],
      },
    ],
  },
  {
    id: 3,
    no: '03',
    tag: 'TCQ CIRCLES',
    title: 'Circles',
    blurb:
      'Our flagship monthly live event series — lectures, panel discussions, interviews, workshops and curated performances, experimental to the mainstream. Designed for a limited audience where diverse fields intersect and engage with new niches.',
    events: [
      {
        name: 'Circles, Season One',
        venue: 'Indie Music · Stargazing · Madras History · an Umpire’s POV of cricket',
        layout: 'fan',
        photos: [ph(3, 4), ph(4, 3), ph(3, 4)],
      },
      {
        name: 'Hysterically Speaking / Vinyl Destination',
        venue: 'Two unique experiences with Berty Ashley',
        layout: 'fan',
        photos: [ph(3, 4), ph(4, 3), ph(3, 4)],
      },
    ],
  },
  {
    id: 4,
    no: '04',
    tag: 'TCQ WRITES',
    title: 'Writes',
    blurb:
      'Our newsletter, run by a dedicated team, celebrating Chennai as a melting pot of cultures and new experiences. We spotlight events and stories overlooked by mainstream media — collaborating with small brands and artists, seeking voices that represent the city in its truest form.',
    events: [
      {
        name: 'From our Substack',
        venue: 'thecuriosityquotient.substack.com',
        layout: 'grid',
        photos: [
          ph(3, 4), ph(3, 4), ph(3, 4),
          ph(3, 4), ph(3, 4), ph(3, 4),
        ],
      },
    ],
  },
  {
    id: 5,
    no: '05',
    tag: 'TCQ TEACHES',
    title: 'Teaches',
    blurb:
      'We work with schools and colleges to cultivate healthier learning practices — quizzing, public speaking and the performing arts — partnering with prestigious institutions across Chennai to nurture curiosity and critical thinking from a young age.',
    events: [
      {
        name: 'Intellect Club',
        venue: 'MOP Vaishnav College for Women, 2024–2026',
        layout: 'fan',
        photos: [ph(4, 3), ph(3, 4), ph(4, 3)],
      },
      {
        name: 'Anti-Drug Awareness Programme',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'fan',
        photos: [ph(3, 4), ph(16, 9), ph(3, 4)],
      },
    ],
  },
];
