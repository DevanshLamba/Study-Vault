import React, { useState, useCallback } from 'react';
import IntroVideo from './components/IntroVideo';
import CardStage from './components/CardStage';
import Dashboard from './components/Dashboard';
import { subjects } from './data/subjects';
import './App.css';

/**
 * App — top-level state machine.
 *
 *  'video'      → showing main.mp4
 *  'transition' → brief cinematic crossfade (200 ms)
 *  'cards'      → interactive card stage
 *  'dashboard'  → subject study dashboard
 */
export default function App() {
  const [phase, setPhase] = useState('video');
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleVideoEnd = useCallback(() => {
    setPhase('transition');
    // After a brief pause, switch to cards
    setTimeout(() => setPhase('cards'), 350);
  }, []);

  const handleSelectSubject = useCallback((subject) => {
    setSelectedSubject(subject);
    setPhase('dashboard');
  }, []);

  const handleBackToCards = useCallback(() => {
    setSelectedSubject(null);
    setPhase('cards');
  }, []);

  return (
    <div className="app-root">
      {/* ── Intro Video ─────────────────────────────────────── */}
      {(phase === 'video' || phase === 'transition') && (
        <IntroVideo
          onVideoEnd={handleVideoEnd}
          fading={phase === 'transition'}
        />
      )}

      {/* ── Card Stage ──────────────────────────────────────── */}
      {(phase === 'cards' || phase === 'dashboard') && (
        <CardStage
          subjects={subjects}
          onSelectSubject={handleSelectSubject}
          hidden={phase === 'dashboard'}
        />
      )}

      {/* ── Dashboard ───────────────────────────────────────── */}
      {phase === 'dashboard' && selectedSubject && (
        <Dashboard
          subject={selectedSubject}
          onBack={handleBackToCards}
        />
      )}
    </div>
  );
}
