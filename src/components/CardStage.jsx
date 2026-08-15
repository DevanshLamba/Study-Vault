import React, { useState, useEffect, useRef } from 'react';
import SubjectCard from './SubjectCard';
import './CardStage.css';

/**
 * CardStage — 3D Infinite Circular Orbit
 *
 * Cards orbit a central invisible point clockwise continuously.
 * Uses a high-performance requestAnimationFrame loop to calculate
 * 3D positions, scale, opacity, and filters, ensuring perfect fluidity.
 */
export default function CardStage({ subjects, onSelectSubject, hidden }) {
  const [entered, setEntered] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [activeIndexState, setActiveIndexState] = useState(0);

  // Animation Refs
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const rotationRef = useRef(0);
  const isHoveredRef = useRef(false);
  const activeIndexRef = useRef(0);
  const cardRefs = useRef([]);

  // Tweening Refs
  const isTweeningRef = useRef(false);
  const targetRotationRef = useRef(0);

  // Configuration - Tighter Orbit Cluster
  const N = subjects.length;
  const RADIUS_X = 170; // Much tighter horizontal spread (was 400)
  const RADIUS_Z = 160; // Tighter depth spread (was 250)
  const BASE_SPEED = 0.025; // 360 deg / ~14 seconds
  const HOVER_SPEED_MULTI = 0.25;

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 80);
    const t2 = setTimeout(() => setHeaderVisible(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Main rAF Loop
  const animate = (time) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;
      
      // 1. Update global rotation
      if (isTweeningRef.current) {
        // Smooth ease-out to target
        const diff = targetRotationRef.current - rotationRef.current;
        if (diff > 0.2) {
          // Tween speed based on remaining distance, clamped
          rotationRef.current += diff * 0.05; 
        } else {
          rotationRef.current = targetRotationRef.current;
          isTweeningRef.current = false;
        }
      } else {
        // Continuous auto-rotation
        const speed = isHoveredRef.current ? (BASE_SPEED * HOVER_SPEED_MULTI) : BASE_SPEED;
        rotationRef.current += deltaTime * speed;
      }

      const currentRot = rotationRef.current;

      // 2. Find closest active card
      let newActive = 0;
      let minDiff = Infinity;
      for (let i = 0; i < N; i++) {
        const baseAngle = i * (360 / N);
        let theta = (baseAngle - currentRot) % 360;
        if (theta < -180) theta += 360;
        if (theta > 180) theta -= 360;
        
        if (Math.abs(theta) < minDiff) {
          minDiff = Math.abs(theta);
          newActive = i;
        }
      }

      if (newActive !== activeIndexRef.current) {
        activeIndexRef.current = newActive;
        setActiveIndexState(newActive);
      }

      // 3. Update DOM nodes natively for 60fps performance
      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        
        const baseAngle = i * (360 / N);
        let theta = (baseAngle - currentRot) % 360;
        if (theta < -180) theta += 360;
        if (theta > 180) theta -= 360;

        const rad = theta * (Math.PI / 180);
        
        // Orbital positions
        const x = Math.sin(rad) * RADIUS_X;
        const z = Math.cos(rad) * RADIUS_Z;
        
        // Normalized depth: 0 (back) to 1 (front)
        const zNorm = (z + RADIUS_Z) / (2 * RADIUS_Z); 
        
        // Visual hierarchy based on depth - Optically scaled up ~12%
        // Max scale (front) = 1.12, Min scale (back) = 0.784
        const scale = 0.784 + (0.336 * zNorm); 
        const opacity = 0.25 + (0.75 * Math.pow(zNorm, 1.2)); // Slightly more visible at back
        const blurAmount = (1 - zNorm) * 4;
        const brightness = 0.65 + (0.35 * zNorm);

        // Apply styles natively
        card.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = `blur(${blurAmount.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
        card.style.zIndex = Math.round(zNorm * 100);
      }
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const handleCardClick = (i, subject) => {
    if (i === activeIndexState && !isTweeningRef.current) {
      // If it's already the active (front) card and settled, open dashboard
      onSelectSubject(subject);
    } else {
      // Tween this card to the front CLOCKWISE
      const baseAngle = i * (360 / N);
      let currentMod = rotationRef.current % 360;
      if (currentMod < 0) currentMod += 360;
      
      let diff = baseAngle - currentMod;
      // Force strictly clockwise rotation
      if (diff <= 0) diff += 360; 

      targetRotationRef.current = rotationRef.current + diff;
      isTweeningRef.current = true;
    }
  };

  return (
    <div 
      className={`card-stage-root ${hidden ? 'card-stage--hidden' : ''}`}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      {/* Background atmosphere */}
      <div className="card-stage-bg">
        <div className="card-stage-bg-orb card-stage-bg-orb--1" />
        <div className="card-stage-bg-orb card-stage-bg-orb--2" />
      </div>

      <div className="card-stage-hud-corners">
        <div className="cs-hud-corner cs-hud-corner--tl" />
        <div className="cs-hud-corner cs-hud-corner--tr" />
        <div className="cs-hud-corner cs-hud-corner--bl" />
        <div className="cs-hud-corner cs-hud-corner--br" />
      </div>

      {/* ── Header ───────────────────────────────────────────── */}
      <header className={`vault-header ${headerVisible ? 'vault-header--visible' : ''}`}>
        <div className="vault-header-inner">
          <div className="vault-header-eyebrow">
            <span className="vault-header-tag">KNOWLEDGE VAULT</span>
            <span className="vault-header-dot" />
            <span className="vault-header-tag">DEVANSH LAMBA</span>
          </div>
          <h1 className="vault-header-title">Select a Subject</h1>
          <p className="vault-header-subtitle">
            Choose your area of study to begin the session.
          </p>
        </div>
      </header>

      {/* ── 3D Orbital Viewport ──────────────────────────────── */}
      <div className={`card-orbit-viewport ${entered ? 'card-orbit-viewport--entered' : ''}`}>
        <div className="card-orbit-stage">
          {subjects.map((subject, i) => {
            const isActive = activeIndexState === i;
            return (
              <div
                key={subject.id}
                ref={(el) => (cardRefs.current[i] = el)}
                className={`orbit-slot ${isActive ? 'orbit-slot--active' : ''}`}
                onClick={() => handleCardClick(i, subject)}
              >
                <SubjectCard
                  subject={subject}
                  isCenter={isActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Footer HUD ───────────────────────────────────────── */}
      <footer className={`vault-footer ${headerVisible ? 'vault-footer--visible' : ''}`}>
        <span className="vault-footer-text">
          {N} SUBJECTS · CONTINUOUS ORBIT · CLICK CENTER TO ENTER
        </span>

        <div className="vault-footer-socials">
          <a href="https://instagram.com/dvnshlamba" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile: @dvnshlamba">
            Instagram · @dvnshlamba
          </a>
          <a href="https://github.com/devanshlamba" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile: devanshlamba">
            GitHub · devanshlamba
          </a>
          <a href="https://www.linkedin.com/in/devanshlamba/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile: Devansh Lamba">
            LinkedIn · Devansh Lamba
          </a>
        </div>

        <div className="vault-footer-copyright">
          © 2026 Devansh Lamba. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
