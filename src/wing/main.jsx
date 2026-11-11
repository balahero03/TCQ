import { createRoot } from 'react-dom/client';
import '../index.css';
import WingPage from './WingPage.jsx';
import ExplorePage from './ExplorePage.jsx';
import { EXPLORE_PAGE } from '../seo/pages';
import Analytics from '../Analytics.jsx';

// One bundle serves the "What we do" hub and every wing page; the slug comes
// from the URL (/what-we-do → hub, /quizzes → 'quizzes').
const slug = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];

createRoot(document.getElementById('root')).render(
  <>
    {slug === EXPLORE_PAGE.slug ? <ExplorePage /> : <WingPage slug={slug} />}
    <Analytics />
  </>,
);
