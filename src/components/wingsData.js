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
    byline: 'You know the Business. We know the Chemistry.',
    blurb:
      'We help brands build communities through curiosity. By turning knowledge into interactive live and digital experiences, we connect brands organically with the culture, interests and people around them.',
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
    tag: 'TCQ QUIZZES',
    title: 'Quizzes',
    byline: 'Is this a puzzle or a story? It\'s both.',
    blurb:
      'Nearly 15 years of quizzing taught us something simple: learning is at its best when there\'s no red pen involved. Quizzing forms part of TCQ\'s foundation, but our formats don\'t stop at questions and answers. We take our way of finding, shaping and telling stories into brand identities and collaborations, and we will continue to push ourselves into unknown territories. After all, the unknown isn\'t a destination, it is an invitation.',
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
    tag: 'TCQ CIRCLES',
    title: 'Circles',
    byline: 'One shape. Multiple sizes. No sides.',
    blurb:
      'Our flagship monthly live series is where lectures meet conversations, workshops meet performances, and the experimental meets the mainstream.\n\nWith a limited audience and a deliberately eclectic mix of subjects, each edition brings people and ideas from different fields together to explore new niches and unexpected connections.',
    events: [
      {
        name: 'Circles, Season One',
        venue: 'Indie Music · Stargazing · Madras History · an Umpire\u2019s POV of cricket',
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
    tag: 'TCQ WRITES',
    title: 'Writes',
    byline: 'Liberté, égalité, most importantly fraternité.',
    blurb:
      'A newsletter for the Chennai you might not know yet. We go looking for the stories, events, artists, ideas and experiences that slip past the mainstream, working with independent brands, small businesses and creators along the way. A little bit of the city you know. A lot of the city you haven\'t discovered yet.',
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
    byline: 'The world is our classroom, a classroom to the world.',
    blurb:
      'We work with schools and colleges to take learning beyond the classroom through quizzing, public speaking and the performing arts. Our programmes give students room to question, think, perform and explore, helping make curiosity a part of how they learn, not just what they learn.',
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
