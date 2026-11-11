import { createRoot } from 'react-dom/client';
import '../index.css';
import WingPage from './WingPage.jsx';
import Analytics from '../Analytics.jsx';

// One bundle serves every wing page; the slug comes from the URL (/quizzes → 'quizzes').
const slug = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0];

createRoot(document.getElementById('root')).render(
  <>
    <WingPage slug={slug} />
    <Analytics />
  </>,
);
