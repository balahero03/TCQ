// ─────────────────────────────────────────────────────────────
// TCQ Wings data (from the portfolio deck).
//
//   ph(w, h)        → placeholder with an aspect hint (src: null)
//   img(src, w, h)  → real photo, src is an imported asset
//   layout 'row'    → uniform square thumbnails in a straight row
//   layout 'grid'   → full-bleed article cards, uncropped (Writes)
//   hideIndex       → no event number in the caption
// ─────────────────────────────────────────────────────────────

import sixToSixtyThumb from '../assets/wings/quizzes/6-to-60/six-to-60-thumb.webp';

import abuzz02 from '../assets/wings/quizzes/abuzz-psbb/abuzz-02.webp';
import abuzz03 from '../assets/wings/quizzes/abuzz-psbb/abuzz-03.webp';
import abuzz04 from '../assets/wings/quizzes/abuzz-psbb/abuzz-04.webp';

import fundamavan01 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-01.webp';
import fundamavan06 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-06.webp';
import fundamavan07 from '../assets/wings/quizzes/fundamavan-ssn/fundamavan-07.webp';

import tcq02 from '../assets/wings/quizzes/typical-chennai-quiz/tcq-02.webp';
import tcq09 from '../assets/wings/quizzes/typical-chennai-quiz/tcq-09.webp';
import tcq25 from '../assets/wings/quizzes/typical-chennai-quiz/tcq-25.webp';

import circles01 from '../assets/wings/circles/season-one/circles-01.webp';
import circles03 from '../assets/wings/circles/season-one/circles-03.webp';

import berty01 from '../assets/wings/circles/berty-ashley/berty-01.webp';
import berty02 from '../assets/wings/circles/berty-ashley/berty-02.webp';
import berty03 from '../assets/wings/circles/berty-ashley/berty-03.webp';
import berty04 from '../assets/wings/circles/berty-ashley/berty-04.webp';
import berty05 from '../assets/wings/circles/berty-ashley/berty-05.webp';

import intellect03 from '../assets/wings/teaches/intellect-club/intellect-03.webp';
import intellect09 from '../assets/wings/teaches/intellect-club/intellect-09.webp';

import antiDrug01 from '../assets/wings/teaches/anti-drug-awareness/anti-drug-01.webp';
import antiDrug02 from '../assets/wings/teaches/anti-drug-awareness/anti-drug-02.webp';
import heritage05 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-05.webp';
import heritage06 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-06.webp';
import heritage07 from '../assets/wings/teaches/heritage-walk-hindu-offices/heritage-07.webp';

import goetheWorkshop01 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-01.webp';
import goetheWorkshop02 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-02.webp';
import goetheWorkshop03 from '../assets/wings/teaches/goethe-quizzing-workshop/goethe-workshop-03.webp';

import resume02 from '../assets/wings/teaches/resume-building/resume-02.webp';
import resume03 from '../assets/wings/teaches/resume-building/resume-03.webp';
import resume04 from '../assets/wings/teaches/resume-building/resume-04.webp';

import writes01 from '../assets/wings/writes/substack/writes-01.webp';
import writes02 from '../assets/wings/writes/substack/writes-02.webp';
import writes03 from '../assets/wings/writes/substack/writes-03.webp';
import writes04 from '../assets/wings/writes/substack/writes-04.webp';
import writes05 from '../assets/wings/writes/substack/writes-05.webp';
import writes06 from '../assets/wings/writes/substack/writes-06.webp';

import hungryQuiz01 from '../assets/wings/quizzes/hungry-quiz/hungry-quiz-01.webp';
import hungryQuiz03 from '../assets/wings/quizzes/hungry-quiz/hungry-quiz-03.webp';
import hungryQuiz06 from '../assets/wings/quizzes/hungry-quiz/hungry-quiz-06.webp';

import wallsOnWheels02 from '../assets/wings/collabs/walls-on-wheels/walls-on-wheels-02.webp';
import wallsOnWheels04 from '../assets/wings/collabs/walls-on-wheels/walls-on-wheels-04.webp';

import howToNameIt01 from '../assets/wings/collabs/how-to-name-it/gnanipazham-01.webp';
import howToNameIt02 from '../assets/wings/collabs/how-to-name-it/hidden-cassette-01.webp';

import madrasDCoded06 from '../assets/wings/collabs/madras-d-coded/madras-d-coded-06.webp';
import madrasDCoded01 from '../assets/wings/collabs/madras-d-coded/madras-d-coded-01.webp';
import madrasDCoded08 from '../assets/wings/collabs/madras-d-coded/madras-d-coded-08.webp';

// eslint-disable-next-line no-unused-vars -- kept for events whose photos haven't landed yet
const ph = (w, h) => ({ src: null, w, h });
const img = (src, w, h) => ({ src, w, h });

// All wing photos, keyed by path, for building each event's full gallery set.
const ALL_PHOTOS = import.meta.glob('../assets/wings/**/*.webp', { eager: true, import: 'default' });

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
    tag: 'LEARNING AS PLAY',
    title: 'Quizzes',
    blurb:
      'This is where TCQ was born. The Typical Chennai Question is what gave us our name. No matter how TCQ evolves, quizzes will always be our first language.',
    events: [
      {
        name: '6 to 60 Quizzes',
        venue: '15 weeks of endless curiosity at KIS Cafe',
        layout: 'row',
        photos: [img(sixToSixtyThumb, 1, 1)],
        galleryPhotos: galleryFrom('quizzes/6-to-60'),
      },
      {
        name: 'Abuzz 2025',
        venue: 'Inter-school Quiz Finals — PSBB Group of Schools',
        layout: 'row',
        photos: [img(abuzz02, 16, 9), img(abuzz03, 16, 9), img(abuzz04, 16, 9)],
        galleryPhotos: galleryFrom('quizzes/abuzz-psbb'),
      },
      {
        name: "Fundamavan '26",
        venue: 'SSN Instincts Flagship General Quiz',
        layout: 'row',
        photos: [img(fundamavan07, 3, 4), img(fundamavan01, 4, 3), img(fundamavan06, 16, 9)],
        galleryPhotos: galleryFrom('quizzes/fundamavan-ssn'),
      },
      {
        name: 'Typical Chennai Quiz 2025',
        venue: 'For KYN app, 2025',
        layout: 'row',
        photos: [img(tcq09, 3, 2), img(tcq02, 3, 2), img(tcq25, 3, 2)],
        galleryPhotos: galleryFrom('quizzes/typical-chennai-quiz'),
      },
      {
        name: 'The Hungry Quiz',
        venue: 'Part of the Unavu Project, Kraft Collective, 2026',
        layout: 'row',
        photos: [img(hungryQuiz01, 3, 4), img(hungryQuiz03, 3, 4), img(hungryQuiz06, 3, 4)],
        galleryPhotos: galleryFrom('quizzes/hungry-quiz'),
      },
    ],
  },
  {
    id: 2,
    no: '02',
    tag: 'CONVERSATIONS & CULTURE',
    title: 'Circles',
    blurb:
      'The crossroads of Chennai’s communities. A place for people with shared interests to find each other, bring their worlds along, and have conversations that might not happen anywhere else.',
    events: [
      {
        name: 'Circles, Season One',
        venue: 'Indie Music · Stargazing · Madras History · an Umpire\'s POV of cricket',
        layout: 'row',
        photos: [img(circles01, 3, 4), img(circles03, 16, 9)],
        galleryPhotos: galleryFrom('circles/season-one'),
      },
      {
        name: 'Hysterically Speaking / Vinyl Destination',
        venue: 'Two unique experiences with Berty Ashley',
        layout: 'row',
        photos: [img(berty03, 3, 4), img(berty01, 4, 3), img(berty02, 3, 4), img(berty04, 16, 9), img(berty05, 16, 9)],
        galleryPhotos: galleryFrom('circles/berty-ashley'),
      },
    ],
  },
  {
    id: 3,
    no: '03',
    tag: 'EXPERIENCES FOR CULTURE',
    title: 'Collabs',
    blurb:
      'Your stories already exist in 4D. We turn them into 5D experiences for people to decipher with that one extra dimension that we care about the most - Discovery',
    events: [
      {
        name: 'Walls on Wheels',
        venue: 'For Five Feet Collective — a mural workshop',
        layout: 'row',
        photos: [img(wallsOnWheels04, 16, 9), img(wallsOnWheels02, 4, 3)],
        galleryPhotos: galleryFrom('collabs/walls-on-wheels'),
      },
      {
        name: 'How to Name It?',
        venue: 'An exclusive Ilaiyaraaja fan tribe, for KYN',
        layout: 'row',
        photos: [img(howToNameIt01, 1, 1), img(howToNameIt02, 1, 1)],
        galleryPhotos: galleryFrom('collabs/how-to-name-it'),
      },
      {
        name: 'Madras D-Coded',
        venue: 'A 40-day campaign of puzzles on Madras and its journey to Chennai',
        layout: 'row',
        photos: [img(madrasDCoded06, 4, 5), img(madrasDCoded01, 3, 4), img(madrasDCoded08, 3, 4)],
        galleryPhotos: galleryFrom('collabs/madras-d-coded'),
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
        hideIndex: true,
        photos: [
          img(writes01, 3, 4),
          img(writes02, 3, 4),
          img(writes03, 3, 4),
          img(writes04, 3, 4),
          img(writes05, 3, 4),
          img(writes06, 3, 4),
        ],
        galleryPhotos: galleryFrom('writes/substack'),
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
        layout: 'row',
        photos: [img(intellect03, 16, 10), img(intellect09, 3, 4)],
        galleryPhotos: galleryFrom('teaches/intellect-club'),
      },
      {
        name: 'Resume Building Workshop',
        venue: 'Ethiraj College for Women, 2024',
        layout: 'row',
        photos: [img(resume02, 3, 2), img(resume03, 3, 2), img(resume04, 3, 2)],
        galleryPhotos: galleryFrom('teaches/resume-building'),
      },
      {
        name: 'Anti-Drug Awareness Programme',
        venue: 'Ethiraj College for Women, 2025',
        layout: 'row',
        photos: [img(antiDrug01, 9, 16), img(antiDrug02, 9, 16)],
        galleryPhotos: [
          ...galleryFrom('teaches/anti-drug-awareness'),
          img(heritage05, 4, 3),
          img(heritage06, 4, 3),
          img(heritage07, 4, 3),
        ],
      },
      {
        name: 'What? Why? Wow — A Beginner\'s Workshop on the Art of Quizzing',
        venue: 'Goethe-Institut Chennai, 2026',
        layout: 'row',
        photos: [img(goetheWorkshop01, 3, 4), img(goetheWorkshop02, 3, 4), img(goetheWorkshop03, 3, 4)],
        galleryPhotos: galleryFrom('teaches/goethe-quizzing-workshop'),
      },
    ],
  },
];
