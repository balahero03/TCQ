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
    tag: 'EXPERIENCES FOR CULTURE',
    title: 'For Brands',
    byline: 'Transform your brand into a story people want to be part of.',
    blurb:
      'We craft immersive experiences that connect brands with audiences through authentic engagement. By blending curiosity-driven content with live and digital platforms, we create moments that resonate, inspire action, and build lasting communities around what your brand stands for.',
    events: [
      {
        name: 'Typical Chennai Quiz',
        venue: 'For KYN app, 2025',
        layout: 'split',
        photos: [ph(3, 4), ph(16, 9)],
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
        layout: 'collage',
        photos: [ph(16, 10), ph(3, 4)],
      },
    ],
  },
  {
    id: 2,
    no: '02',
    tag: 'LEARNING AS PLAY',
    title: 'Quizzes',
    byline: 'Knowledge wrapped in curiosity. Competition wrapped in community.',
    blurb:
      'Quizzes are where learning becomes fun, where strangers become friends, and where the desire to know more becomes contagious. From school competitions to brand collaborations, we design quiz experiences that challenge minds, spark conversations, and leave people wanting more.',
    events: [
      {
        name: '6 to 60 Quizzes',
        venue: '15 weeks of endless curiosity at KIS Cafe',
        layout: 'fan',
        photos: [ph(3, 4), ph(3, 4), ph(3, 4)],
      },
      {
        name: 'Abuzz 2025',
        venue: 'Inter-school Quiz Finals — PSBB Group of Schools',
        layout: 'strip',
        photos: [ph(1, 1), ph(1, 1), ph(1, 1)],
      },
      {
        name: "Fundamavan '26",
        venue: 'SSN Instincts Flagship General Quiz',
        layout: 'fan',
        photos: [ph(3, 4), ph(4, 3), ph(16, 9)],
      },
    ],
  },
  {
    id: 3,
    no: '03',
    tag: 'CONVERSATIONS & CULTURE',
    title: 'Circles',
    byline: 'Where ideas collide and communities form.',
    blurb:
      'An intimate platform where diverse minds gather to explore unexpected intersections. Our monthly Circles blend lectures, performances, and workshops with unfiltered conversations—creating spaces where niche knowledge becomes shared culture and strangers leave as part of something larger.',
    events: [
      {
        name: 'Circles, Season One',
        venue: 'Indie Music · Stargazing · Madras History · an Umpire\'s POV of cricket',
        layout: 'split',
        photos: [ph(3, 4), ph(16, 9)],
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
    tag: 'STORIES WORTH SHARING',
    title: 'Writes',
    byline: 'The city\'s stories, told by people who get it.',
    blurb:
      'A newsletter that digs deeper into Chennai\'s cultural landscape—uncovering hidden artists, emerging ideas, and untold stories. We celebrate the independent spirit and creativity that define our city, connecting readers with the people and experiences that make life interesting.',
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
    tag: 'LEARNING REIMAGINED',
    title: 'Teaches',
    byline: 'Curiosity as a superpower. Knowledge as adventure.',
    blurb:
      'We partner with educational institutions to transform how students learn and think. Through quizzes, workshops, and creative experiences, we help young minds explore beyond textbooks, develop critical thinking, and discover that learning can be as thrilling as it is rewarding.',
    events: [
      {
        name: 'Intellect Club',
        venue: 'MOP Vaishnav College for Women, 2024–2026',
        layout: 'collage',
        photos: [ph(16, 10), ph(3, 4)],
      },
      {
        name: 'Anti-Drug Awareness Programme',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'strip',
        photos: [ph(1, 1), ph(1, 1), ph(1, 1)],
      },
    ],
  },
];
