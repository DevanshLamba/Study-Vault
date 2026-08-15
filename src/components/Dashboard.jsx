import React, { useState, useEffect } from 'react';
import './Dashboard.css';

/**
 * Dashboard — subject study dashboard.
 * Slides in from the right over the card stage.
 * All data comes from the `subject` prop — nothing is hardcoded.
 *
 * Topic shape: { name: string, github: string }
 */
export default function Dashboard({ subject, onBack }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 40);
    return () => clearTimeout(t);
  }, []);

  const totalCount = subject.topics.length;

  // Progress ring
  const RADIUS = 44;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const progressOffset = CIRCUMFERENCE - (subject.progress / 100) * CIRCUMFERENCE;

  const handleBack = () => {
    setVisible(false);
    setTimeout(onBack, 400);
  };

  return (
    <div
      className={`dashboard-overlay ${visible ? 'dashboard-overlay--visible' : ''}`}
      role="main"
      aria-label={`${subject.fullName} Study Dashboard`}
    >
      <div className="dashboard-panel">

        {/* ── Back button ──────────────────────────────────── */}
        <button
          className="dashboard-back-btn"
          onClick={handleBack}
          aria-label="Back to subject selection"
        >
          <span className="back-arrow">←</span>
          <span>Back to Vault</span>
        </button>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="dashboard-layout">

          {/* LEFT — identity + progress ───────────────────── */}
          <div className="dashboard-left">
            <div
              className="dashboard-identity-card"
              style={{
                '--accent':    subject.accentColor || 'var(--accent)',
                '--accent-bg': `${subject.accentColor || '#c9a96e'}18`,
              }}
            >
              <div className="dashboard-identity-bar" />

              <div className="dashboard-identity-icon">{subject.icon}</div>

              <div className="dashboard-identity-names">
                <h1 className="dashboard-short-name">{subject.name}</h1>
                <p className="dashboard-full-name">{subject.fullName}</p>
              </div>

              <p className="dashboard-desc">{subject.description}</p>

              {/* Large progress ring */}
              <div className="dashboard-progress-section">
                <div className="dashboard-progress-ring-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r={RADIUS} fill="none" stroke="var(--surface-3)" strokeWidth="5" />
                    <circle
                      cx="55" cy="55" r={RADIUS}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      strokeDashoffset={progressOffset}
                      transform="rotate(-90 55 55)"
                      className="dashboard-progress-arc"
                    />
                  </svg>
                  <div className="dashboard-progress-center">
                    <span className="dashboard-progress-value">{subject.progress}%</span>
                    <span className="dashboard-progress-caption">complete</span>
                  </div>
                </div>
                <div className="dashboard-progress-stats">
                  <div className="dashboard-stat">
                    <span className="dashboard-stat-value">{totalCount}</span>
                    <span className="dashboard-stat-label">Topics</span>
                  </div>
                  <div className="dashboard-stat-divider" />
                  <div className="dashboard-stat">
                    <span className="dashboard-stat-value">{subject.progress}%</span>
                    <span className="dashboard-stat-label">Progress</span>
                  </div>
                </div>
              </div>

              {/* Main repo button */}
              {subject.repo && (
                <a
                  href={subject.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dashboard-repo-btn"
                  id={`repo-btn-${subject.id}`}
                >
                  <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                  Open Repository
                  <span className="repo-btn-arrow">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* RIGHT — topics list ───────────────────────────── */}
          <div className="dashboard-right">
            <section className="dashboard-section" aria-labelledby="topics-heading">
              <h2 className="dashboard-section-heading" id="topics-heading">
                <span className="section-heading-line" />
                Topics
              </h2>

              <ul className="dashboard-topics-list" role="list">
                {subject.topics.map((topic, i) => (
                  <li
                    key={topic.name}
                    className="dashboard-topic-item"
                    style={{ '--item-delay': `${i * 40}ms` }}
                  >
                    {/* Index number */}
                    <span className="topic-index" aria-hidden>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Topic name */}
                    <span className="topic-name">{topic.name}</span>

                    {/* Per-topic GitHub link */}
                    {topic.github && (
                      <a
                        href={topic.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="topic-github-btn"
                        id={`topic-${subject.id}-${i}`}
                        aria-label={`Open ${topic.name} on GitHub`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden>
                          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
