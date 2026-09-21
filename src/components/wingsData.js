// ─────────────────────────────────────────────────────────────
// TCQ Wings data (from the portfolio deck).
//
//   ph(w, h)        → placeholder with an aspect hint (src: null)
//   img(src, w, h)  → real photo, src is an imported asset
//   layout 'fan'    → overlapping polaroid cluster (works for 2–3)
//   layout 'hero'   → one cinematic frame
//   layout 'grid'   → contact-sheet grid (used for Writes' 6 cards)
// ─────────────────────────────────────────────────────────────

import tcq05 from '../assets/wings/for-brands/typical-chennai-quiz/tcq-05.jpg';
import tcq20 from '../assets/wings/for-brands/typical-chennai-quiz/tcq-20.jpg';

import sixToSixty04 from '../assets/wings/quizzes/6-to-60/six-to-60-04.jpg';
import sixToSixty06 from '../assets/wings/quizzes/6-to-60/six-to-60-06.jpg';
import sixToSixty08 from '../assets/wings/quizzes/6-to-60/six-to-60-08.jpg';
import sixToSixty12 from '../assets/wings/quizzes/6-to-60/six-to-60-12.jpg';
import sixToSixty13 from '../assets/wings/quizzes/6-to-60/six-to-60-13.jpg';
import sixToSixty14 from '../assets/wings/quizzes/6-to-60/six-to-60-14.jpg';

import fundamavan01 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-01.jpg';
import fundamavan06 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-06.jpg';
import fundamavan07 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-07.jpg';

import circles01 from '../assets/wings/circles/season-one/circles-01.jpg';
import circles02 from '../assets/wings/circles/season-one/circles-02.jpg';

import berty01 from '../assets/wings/circles/berty-ashley/berty-01.jpg';
import berty02 from '../assets/wings/circles/berty-ashley/berty-02.jpg';
import berty03 from '../assets/wings/circles/berty-ashley/berty-03.jpg';

import intellect03 from '../assets/wings/teaches/intellect-club/intellect-03.jpg';
import intellect09 from '../assets/wings/teaches/intellect-club/intellect-09.jpg';

import heritage01 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-01.jpg';
import heritage02 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-02.jpg';
import heritage03 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-03.jpg';

import antiDrug05 from '../assets/wings/teaches/anti-drug-awareness/heritage-05.jpg';
import antiDrug06 from '../assets/wings/teaches/anti-drug-awareness/heritage-06.jpg';
import antiDrug07 from '../assets/wings/teaches/anti-drug-awareness/heritage-07.jpg';

import goetheWorkshop01 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-01.jpg';
import goetheWorkshop02 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-02.jpg';
import goetheWorkshop03 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-03.jpg';

const ph = (w, h) => ({ src: null, w, h });
const img = (src, w, h) => ({ src, w, h });

// All wing photos, keyed by path, for building each event's full gallery set.
const ALL_PHOTOS = import.meta.glob('../assets/wings/**/*.jpg', { eager: true, import: 'default' });

// Returns every photo in a wing/event folder as { src, w, h } (aspect from natural size unknown at build time, default 4:3).
function galleryFrom(folder) {
  return Object.entries(ALL_PHOTOS)
    .filter(([path]) => path.includes(`/assets/wings/${folder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src]) => img(src, 4, 3));
}

export const WINGS = [
  {
    id: 1,
    no: '01',
    tag: 'EXPERIENCES FOR CULTURE',
    title: 'For Brands',
    blurb:
      'Your stories already exist in 4D. We turn them into 5D experiences for people to decipher with that one extra dimension that we care about the most - Discovery.',
    events: [
      {
        name: 'Typical Chennai Quiz',
        venue: 'For KYN app, 2025',
        layout: 'split',
        photos: [img(tcq05, 3, 4), img(tcq20, 16, 9)],
        galleryPhotos: galleryFrom('for-brands/typical-chennai-quiz'),
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
      {
        name: 'How to Name It?',
        venue: 'An exclusive Ilaiyaraaja fan tribe, for KYN',
        layout: 'collage',
        photos: [ph(16, 10), ph(3, 4)],
      },
      {
        name: 'Madras D-Coded',
        venue: 'A 40-day campaign of puzzles on Madras and its journey to Chennai',
        layout: 'fan',
        photos: [ph(3, 4), ph(4, 3), ph(3, 4)],
      },
    ],
  },
  {
    id: 2,
    no: '02',
    tag: 'LEARNING AS PLAY',
    title: 'Quizzes',
    blurb:
      'This is where TCQ was born. The Typical Chennai Question is what gave us our name. No matter how TCQ evolves, quizzes will always be our first language.',
    events: [
      {
        name: '6 to 60 Quizzes',
        venue: '15 weeks of endless curiosity at KIS Cafe',
        layout: 'fan',
        photos: [img(sixToSixty04, 3, 4), img(sixToSixty06, 3, 4), img(sixToSixty08, 3, 4)],
        galleryPhotos: galleryFrom('quizzes/6-to-60'),
      },
      {
        name: 'Abuzz 2025',
        venue: 'Inter-school Quiz Finals — PSBB Group of Schools',
        layout: 'strip',
        photos: [img(sixToSixty12, 1, 1), img(sixToSixty13, 1, 1), img(sixToSixty14, 1, 1)],
      },
      {
        name: "Fundamavan '26",
        venue: 'SSN Instincts Flagship General Quiz',
        layout: 'fan',
        photos: [img(fundamavan07, 3, 4), img(fundamavan01, 4, 3), img(fundamavan06, 16, 9)],
        galleryPhotos: galleryFrom('quizzes/fundamavan-ssn'),
      },
      {
        name: 'The Hungry Quiz',
        venue: 'Part of the Unavu Project, Kraft Collective, 2026',
        layout: 'strip',
        photos: [ph(1, 1), ph(1, 1), ph(1, 1)],
      },
      {
        name: 'Comics Quiz',
        venue: 'La Nuit Blanche, Alliance Française Chennai, 2026',
        layout: 'strip',
        photos: [ph(1, 1), ph(1, 1), ph(1, 1)],
      },
    ],
  },
  {
    id: 3,
    no: '03',
    tag: 'CONVERSATIONS & CULTURE',
    title: 'Circles',
    blurb:
      'The crossroads of Chennai\'s communities. A place for people with shared interests to find each other, bring their worlds along, and have conversations that might not happen anywhere else.',
    events: [
      {
        name: 'Circles, Season One',
        venue: 'Indie Music · Stargazing · Madras History · an Umpire\'s POV of cricket',
        layout: 'split',
        photos: [img(circles01, 3, 4), img(circles02, 16, 9)],
        galleryPhotos: galleryFrom('circles/season-one'),
      },
      {
        name: 'Hysterically Speaking / Vinyl Destination',
        venue: 'Two unique experiences with Berty Ashley',
        layout: 'fan',
        photos: [img(berty03, 3, 4), img(berty01, 4, 3), img(berty02, 3, 4)],
        galleryPhotos: galleryFrom('circles/berty-ashley'),
      },
    ],
  },
  {
    id: 4,
    no: '04',
    tag: 'STORIES WORTH SHARING',
    title: 'Writes',
    blurb:
      'Millennial long-form content about Chennai—its newest cultures, icons, trends, and everything in between. Published on our Substack for those who like going beyond the scroll.',
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
    blurb:
      'Schools beyond exams. Colleges beyond degrees. We bring the world outside the syllabus into the classroom through people, ideas and experiences that make learning feel a little more alive.',
    events: [
      {
        name: 'Intellect Club',
        venue: 'MOP Vaishnav College for Women, 2024–2026',
        layout: 'collage',
        photos: [img(intellect03, 16, 10), img(intellect09, 3, 4)],
        galleryPhotos: galleryFrom('teaches/intellect-club'),
      },
      {
        name: 'Anti-Drug Awareness Programme',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'strip',
        photos: [img(antiDrug05, 3, 4), img(antiDrug06, 4, 3), img(antiDrug07, 3, 4)],
        galleryPhotos: galleryFrom('teaches/anti-drug-awareness'),
      },
      {
        name: 'Heritage Walk at The Hindu Offices',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'strip',
        photos: [img(heritage01, 4, 3), img(heritage02, 3, 4), img(heritage03, 3, 4)],
        galleryPhotos: galleryFrom('teaches/heritage-walk-hindu-offices'),
      },
      {
        name: 'What? Why? Wow — A Beginner\'s Workshop on the Art of Quizzing',
        venue: 'Goethe-Institut Chennai, 2026',
        layout: 'fan',
        photos: [img(goetheWorkshop01, 3, 4), img(goetheWorkshop02, 3, 4), img(goetheWorkshop03, 3, 4)],
        galleryPhotos: galleryFrom('teaches/goethe-quizzing-workshop'),
      },
    ],
  },
];
