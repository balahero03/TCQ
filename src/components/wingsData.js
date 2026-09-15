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

import heritage01 from '../assets/wings/teaches/heritage-walk-ethiraj/heritage-01.jpg';
import heritage02 from '../assets/wings/teaches/heritage-walk-ethiraj/heritage-02.jpg';
import heritage03 from '../assets/wings/teaches/heritage-walk-ethiraj/heritage-03.jpg';

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
    byline: 'Transform your brand into a story people want to be part of.',
    blurb:
      'We craft immersive experiences that connect brands with audiences through authentic engagement. By blending curiosity-driven content with live and digital platforms, we create moments that resonate, inspire action, and build lasting communities around what your brand stands for.',
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
        photos: [img(intellect03, 16, 10), img(intellect09, 3, 4)],
        galleryPhotos: galleryFrom('teaches/intellect-club'),
      },
      {
        name: 'Anti-Drug Awareness Programme',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'strip',
        photos: [img(heritage01, 1, 1), img(heritage02, 1, 1), img(heritage03, 1, 1)],
        galleryPhotos: galleryFrom('teaches/heritage-walk-ethiraj'),
      },
    ],
  },
];
