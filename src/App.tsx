import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Spinner from './components/Spinner';

const SearchPage = lazy(() => import('./pages/SearchPage.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const NotFound = lazy(() => import('./pages/NotFound.tsx'));

function AppContent() {
  return (
    <BrowserRouter basename="/react-rss/">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function App() {
  return <AppContent />;
}

export default App;
