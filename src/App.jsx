import React, { useState, useCallback, useEffect } from 'react';
import BrandIntro from './components/BrandIntro';
import CardStage from './components/CardStage';
import Dashboard from './components/Dashboard';
import { subjects } from './data/subjects';
import './App.css';

/**
 * App — top-level state machine.
 *
 *  'branding'   → showing text-based brand animation
 *  'transition' → fast zoop crossfade
 *  'cards'      → interactive card stage
 *  'dashboard'  → subject study dashboard
 */
export default function App() {
  const [phase, setPhase] = useState('branding');
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Orchestrate the intro sequence timeline
  useEffect(() => {
    // Trigger the ZOOP transition at 1.2s
    const zoopTimer = setTimeout(() => setPhase('transition'), 1200);
    // Fully switch to cards stage at 1.6s
    const endTimer = setTimeout(() => setPhase('cards'), 1600);
    
    return () => {
      clearTimeout(zoopTimer);
      clearTimeout(endTimer);
    };
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
      {/* ── Brand Intro ─────────────────────────────────────── */}
      {(phase === 'branding' || phase === 'transition') && (
        <BrandIntro isZooping={phase === 'transition'} />
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
