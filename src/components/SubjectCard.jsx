import React, { useRef, useState, useCallback } from 'react';
import './SubjectCard.css';

/**
 * SubjectCard — single reusable interactive subject card.
 *
 * Receives all data via `subject` prop. Nothing is hardcoded here.
 * Mouse-move creates subtle 3D parallax tilt (±6°).
 */
export default function SubjectCard({ subject, isCenter, onClick }) {
  const totalCount = subject.topics.length;

  // Progress ring geometry
  const RADIUS = 22;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progressOffset = CIRCUMFERENCE - (subject.progress / 100) * CIRCUMFERENCE;

  return (
    <div
      className={`subject-card ${isCenter ? 'subject-card--active' : ''}`}
      style={{
        '--accent':    subject.accentColor || 'var(--accent)',
        '--accent-bg': `${subject.accentColor || '#c9a96e'}18`,
      }}
      role="button"
      tabIndex={isCenter ? 0 : -1}
      aria-label={`Open ${subject.name} — ${subject.fullName}`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* Inner */}
      <div className="subject-card-inner">

        {/* ── Accent top bar ───────────────────────────────── */}
        <div className="subject-card-accent-bar" />

        {/* ── HUD corner marks ─────────────────────────────── */}
        <div className="subject-card-corner subject-card-corner--tl" />
        <div className="subject-card-corner subject-card-corner--tr" />
        <div className="subject-card-corner subject-card-corner--bl" />
        <div className="subject-card-corner subject-card-corner--br" />

        {/* ── Header row ───────────────────────────────────── */}
        <div className="subject-card-header">
          <div className="subject-card-icon" aria-hidden>
            {subject.icon}
          </div>
          <div className="subject-card-progress-ring">
            <svg width="56" height="56" viewBox="0 0 56 56" aria-label={`${subject.progress}% complete`}>
              {/* Track */}
              <circle
                cx="28" cy="28" r={RADIUS}
                fill="none"
                stroke="var(--surface-3)"
                strokeWidth="3"
              />
              {/* Progress arc */}
              <circle
                cx="28" cy="28" r={RADIUS}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={progressOffset}
                transform="rotate(-90 28 28)"
                className="progress-arc"
              />
            </svg>
            <span className="subject-card-progress-label">{subject.progress}%</span>
          </div>
        </div>

        {/* ── Subject name ─────────────────────────────────── */}
        <div className="subject-card-names">
          <h2 className="subject-card-shortname">{subject.name}</h2>
          <p className="subject-card-fullname">{subject.fullName}</p>
        </div>

        {/* ── Description ──────────────────────────────────── */}
        <p className="subject-card-desc">{subject.description}</p>

        {/* ── Topic pills ──────────────────────────────────── */}
        <div className="subject-card-topics">
          {subject.topics.slice(0, 3).map((topic) => (
            <span key={topic.name} className="topic-pill">
              {topic.name}
            </span>
          ))}
          {totalCount > 3 && (
            <span className="topic-pill topic-pill--more">
              +{totalCount - 3} more
            </span>
          )}
        </div>

        {/* ── Footer ───────────────────────────────────────── */}
        <div className="subject-card-footer">
          <span className="subject-card-stat">
            {totalCount} topics
          </span>
          <span className="subject-card-cta">
            Open →
          </span>
        </div>

        {/* Shimmer overlay */}
        <div className="subject-card-shimmer" aria-hidden />
      </div>
    </div>
  );
}
