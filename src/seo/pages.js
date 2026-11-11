// SEO copy for the per-wing landing pages (/quizzes, /circles, …).
//
// Plain data with no asset imports, so it is read both by the React wing page
// (src/wing/) and, at build time in Node, by seo.config.js to write each page's
// <head> and its crawlable HTML. Events and photos come from wingsData.js;
// `wing` here must match a WINGS[].title there.
//
// Keep claims factual: everything here restates what the homepage already says.

export const HOME = {
  title: 'The Curiosity Quotient (TCQ) | Quizzes, Workshops & Culture Events in Chennai',
  description:
    'The Curiosity Quotient (TCQ) is a Chennai culture space making curiosity social: quiz events, community circles, brand collaborations, long-form writing and workshops for schools and colleges. 2,000+ curious people since 2023.',
  keywords: [
    'The Curiosity Quotient', 'TCQ', 'TCQ Chennai', 'TCQ India', 'quiz events Chennai',
    'quiz company Chennai', 'quizmaster Chennai', 'school quiz Chennai', 'college quiz Chennai',
    'corporate quiz Chennai', 'workshops for schools Chennai', 'community events Chennai',
    'brand activation Chennai', 'culture space Chennai', 'things to do in Chennai',
    'Dr. Vishnu Aravind',
  ],
};

// The "What we do" hub (/what-we-do): an overview of the five wings that links
// into each wing page. Reached from "Explore" in the site nav.
export const EXPLORE_PAGE = {
  slug: 'what-we-do',
  name: 'What we do',
  title: 'What We Do | Quizzes, Circles, Collabs, Writes & Teaches by TCQ Chennai',
  description:
    'Explore the five wings of The Curiosity Quotient (TCQ) in Chennai: quiz events, community circles, brand collaborations, long-form writing about the city, and workshops for schools and colleges.',
  h1: 'Five wings, one curiosity.',
  lede: 'End-to-end experiences designed to make curiosity social. Say hello to the five wings of TCQ.',
  keywords: [
    'what TCQ does', 'TCQ services', 'quiz events Chennai', 'community events Chennai',
    'brand activation Chennai', 'Chennai culture writing', 'workshops for schools Chennai',
    'things to do in Chennai',
  ],
};

export const WING_PAGES = [
  {
    slug: 'quizzes',
    wing: 'Quizzes',
    title: 'Quiz Events & Quizmasters in Chennai | Quizzes by The Curiosity Quotient (TCQ)',
    description:
      'Quiz events in Chennai for cafés, schools, colleges, fests and brands. TCQ hosts and writes quizzes, from inter-school finals and college flagship quizzes to Chennai-themed pop-culture and food quizzes.',
    h1: 'Quiz events in Chennai',
    lede: 'This is where TCQ was born. The Typical Chennai Question gave us our name, and quizzes will always be our first language.',
    body: [
      'The Curiosity Quotient writes and hosts quizzes across Chennai: weekly café quizzes open to anyone, inter-school finals, college fest flagship quizzes and themed quizzes built around a brand or a cause.',
      'Our quizzes are made to be played, not just answered. Questions are written so that people who know a little can still work their way to the answer, and everyone leaves knowing something they did not walk in with.',
    ],
    offers: [
      'Open quizzes for cafés and community venues',
      'Inter-school and inter-college quiz competitions',
      'Flagship general quizzes for college fests',
      'Themed quizzes for brands, apps and campaigns',
      'Quizzing workshops for beginners',
    ],
    keywords: ['quiz events Chennai', 'quizmaster Chennai', 'quiz company Chennai', 'school quiz competition Chennai', 'college quiz Chennai', 'corporate quiz Chennai', 'pub quiz Chennai', 'general quiz Chennai'],
    faqs: [
      ['Does TCQ host quizzes for schools and colleges?', 'Yes. TCQ has hosted inter-school quiz finals for the PSBB Group of Schools and the flagship general quiz at SSN Instincts, and runs quizzing workshops for students.'],
      ['Can TCQ create a quiz for a brand or an app?', 'Yes. The Typical Chennai Quiz 2025 was made for the KYN app, and The Hungry Quiz was part of the Unavu Project by Kraft Collective.'],
      ['Are there public quizzes anyone can attend?', 'Yes. 6 to 60 Quizzes ran for 15 weeks at KIS Cafe. Follow TCQ on Instagram or join the WhatsApp community to hear about the next one.'],
      ['How do I book TCQ for a quiz?', 'Email thecuriosityquotient@gmail.com or message +91 87544 00743 on WhatsApp with your audience, date and venue.'],
    ],
  },
  {
    slug: 'circles',
    wing: 'Circles',
    title: 'Community Meetups & Conversations in Chennai | Circles by TCQ',
    description:
      'Circles by The Curiosity Quotient bring Chennai’s communities together: meetups and conversations on indie music, stargazing, Madras history, cricket and more, for people with shared interests.',
    h1: 'Community circles in Chennai',
    lede: 'The crossroads of Chennai’s communities. A place for people with shared interests to find each other, bring their worlds along, and have conversations that might not happen anywhere else.',
    body: [
      'Each Circle is a small gathering around one interest, led by people who live and breathe it. Season One covered indie music, stargazing, Madras history and an umpire’s view of cricket.',
      'Circles are for anyone curious about the city and the people in it. They are a good way to meet new people in Chennai without small talk: you arrive with a shared interest and leave with a few new ones.',
    ],
    offers: [
      'Interest-led community meetups',
      'Conversations with niche experts and enthusiasts',
      'Experiences with guest hosts, such as Berty Ashley',
      'A WhatsApp community of curious people in Chennai',
    ],
    keywords: ['community events Chennai', 'meetups in Chennai', 'things to do in Chennai this weekend', 'Madras history talk', 'stargazing Chennai', 'indie music Chennai', 'Berty Ashley Chennai'],
    faqs: [
      ['What happens at a TCQ Circle?', 'A host who knows a subject well leads an informal conversation with a small group who share the interest. Season One covered indie music, stargazing, Madras history and cricket umpiring.'],
      ['Who can attend Circles?', 'Anyone curious. Circles are announced on TCQ’s Instagram and WhatsApp community.'],
      ['Can I host a Circle about my community or interest?', 'Yes. Write to thecuriosityquotient@gmail.com with the subject you would like to bring.'],
    ],
  },
  {
    slug: 'collabs',
    wing: 'Collabs',
    title: 'Brand Collaborations & Experiential Campaigns in Chennai | Collabs by TCQ',
    description:
      'TCQ turns brand and cultural stories into discovery-led experiences in Chennai: puzzle campaigns, fan experiences and workshops for brands, apps, collectives and cultural organisations.',
    h1: 'Brand collaborations and cultural experiences in Chennai',
    lede: 'Your stories already exist in 4D. We turn them into 5D experiences with the one extra dimension we care about most: discovery.',
    body: [
      'TCQ works with brands, apps and cultural organisations to build experiences their audiences want to take part in, rather than scroll past. Past collaborations include a mural workshop for Five Feet Collective, an Ilaiyaraaja fan experience for KYN, and Madras D-Coded, a 40-day puzzle campaign on Madras and its journey to Chennai.',
      'Every collab starts with the story you already have and the people you want to reach, and ends with something they remember finding out for themselves.',
    ],
    offers: [
      'Integrated physical and digital campaigns',
      'Puzzle and discovery campaigns',
      'Fan and community experiences',
      'Focus groups and community conversations',
      'Publicity partnerships for events',
    ],
    keywords: ['brand activation Chennai', 'experiential marketing Chennai', 'community marketing Chennai', 'brand collaboration Chennai', 'event marketing Chennai', 'Madras D-Coded'],
    faqs: [
      ['What kind of brands does TCQ collaborate with?', 'Brands, apps, cafés, collectives and cultural organisations that want to reach curious audiences in Chennai, such as KYN, Kraft Collective and Five Feet Collective.'],
      ['Can TCQ promote an event we are organising?', 'Yes. TCQ partners with event organisers as a publicity partner, markets events to its community and writes long-form stories before and after the event.'],
      ['How do we start a collaboration?', 'Email thecuriosityquotient@gmail.com with what you are making and who it is for.'],
    ],
  },
  {
    slug: 'writes',
    wing: 'Writes',
    title: 'Chennai Culture Writing & Long-Form Stories | Writes by TCQ',
    description:
      'Long-form writing about Chennai: its newest cultures, icons, trends and everything in between, published on The Curiosity Quotient’s Substack.',
    h1: 'Long-form writing about Chennai',
    lede: 'Millennial long-form content about Chennai: its newest cultures, icons, trends, and everything in between. Published on our Substack for those who like going beyond the scroll.',
    body: [
      'TCQ Writes covers the Chennai that is still being made: new scenes, people worth knowing and the stories behind things the city takes for granted.',
      'Read and subscribe free at thecuriosityquotient.substack.com.',
    ],
    offers: [
      'Long-form essays on Chennai’s culture',
      'Stories about the city’s new icons and trends',
      'Pre- and post-event stories for partners',
    ],
    keywords: ['Chennai culture blog', 'Chennai Substack', 'Chennai stories', 'Madras culture writing', 'Chennai newsletter'],
    faqs: [
      ['Where can I read TCQ’s writing?', 'On Substack at thecuriosityquotient.substack.com, where you can subscribe for free.'],
      ['Can TCQ write about our event or project?', 'Yes. TCQ writes long-form stories before and after events for its partners. Email thecuriosityquotient@gmail.com.'],
    ],
    externalUrl: 'https://thecuriosityquotient.substack.com/',
  },
  {
    slug: 'teaches',
    wing: 'Teaches',
    title: 'Workshops for Schools & Colleges in Chennai | Teaches by TCQ',
    description:
      'Workshops and learning programmes for schools and colleges in Chennai: student clubs, resume building, awareness programmes and quizzing workshops that bring the world outside the syllabus into the classroom.',
    h1: 'Workshops for schools and colleges in Chennai',
    lede: 'Schools beyond exams. Colleges beyond degrees. We bring the world outside the syllabus into the classroom through people, ideas and experiences that make learning feel a little more alive.',
    body: [
      'TCQ designs learning experiences with schools and colleges across Chennai: long-running student clubs, skill workshops, awareness programmes and beginner workshops on the art of quizzing.',
      'Programmes so far include the Intellect Club at MOP Vaishnav College for Women (2024–2026), resume building and anti-drug awareness programmes at Ethiraj College for Women, and a quizzing workshop at Goethe-Institut Chennai.',
    ],
    offers: [
      'Student clubs and year-long programmes',
      'Real-life skills workshops, such as resume building',
      'Awareness programmes for students',
      'Quizzing workshops for beginners',
      'Alternative learning programmes designed with your institution',
    ],
    keywords: ['workshops for schools Chennai', 'college workshops Chennai', 'student workshops Chennai', 'resume building workshop Chennai', 'quizzing workshop', 'alternative learning Chennai', 'educational programmes Chennai'],
    faqs: [
      ['What workshops does TCQ run for colleges?', 'Student clubs such as the Intellect Club at MOP Vaishnav College for Women, resume building and awareness programmes at Ethiraj College for Women, and quizzing workshops.'],
      ['Can TCQ design a programme for our school?', 'Yes. TCQ designs quizzes, workshops, moderated conversations and alternative learning programmes with schools and colleges.'],
      ['How do we invite TCQ to our institution?', 'Email thecuriosityquotient@gmail.com or message +91 87544 00743 on WhatsApp.'],
    ],
  },
];

export const wingPageBySlug = (slug) => WING_PAGES.find((p) => p.slug === slug);
