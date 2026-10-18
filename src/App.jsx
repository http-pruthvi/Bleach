import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProgressBar } from './components/ProgressBar';
import { GlobalSearch } from './components/GlobalSearch';
import { ThemeProvider } from './context/ThemeContext';
import { TransitionProvider } from './context/TransitionContext';
import { TransitionStage } from './components/TransitionStage';

const Character = lazy(() => import('./pages/Character').then(m => ({ default: m.Character })));
const Gotei13Chart = lazy(() => import('./pages/Gotei13Chart').then(m => ({ default: m.Gotei13Chart })));
const ThemeGallery = lazy(() => import('./pages/ThemeGallery').then(m => ({ default: m.ThemeGallery })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));
import { EasterEggKon } from './components/EasterEggKon';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="app-root">
      <ProgressBar />
      <TransitionStage />
      <GlobalSearch isOpen={isSearchOpen} onClose={setIsSearchOpen} />
      <EasterEggKon />

      <Suspense fallback={<div className="page-loader" style={{ minHeight: '100vh', background: '#ff5a0a', color: '#0c0c0c', display: 'grid', placeItems: 'center', fontFamily: "'Dela Gothic One', sans-serif" }}>INITIALIZING ARCHIVE...</div>}>
        <Routes>
          <Route path="/" element={<Home onOpenSearch={() => setIsSearchOpen(true)} />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/gotei13" element={<Gotei13Chart />} />
          <Route path="/themes" element={<ThemeGallery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}
