import React, { useRef, useEffect, useState } from 'react';
import './IntroVideo.css';

/**
 * IntroVideo
 *
 * `main.mp4` fills the entire viewport — it IS the world.
 * No container, no frame, no margins.
 *
 * Fires `onVideoEnd` on the native `ended` event. No timers.
 * `fading` prop triggers the cinematic exit scale+fade.
 */
export default function IntroVideo({ onVideoEnd, fading }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded  = () => onVideoEnd();
    const handleReady  = () => setVideoReady(true);
    const handleError  = () => setVideoError(true);

    video.addEventListener('ended',   handleEnded);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('error',   handleError);

    return () => {
      video.removeEventListener('ended',   handleEnded);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('error',   handleError);
    };
  }, [onVideoEnd]);

  return (
    <div className={`intro-video-wrapper ${fading ? 'intro-video--fading' : ''}`}>

      {videoError ? (
        /* ── Fallback: video file not present yet ── */
        <div className="intro-video-placeholder">
          <div className="placeholder-book">
            <div className="placeholder-book-cover">
              <div className="placeholder-book-spine" />
              <div className="placeholder-book-title">
                <span className="placeholder-book-title-main">THE STUDY VAULT</span>
                <span className="placeholder-book-title-sub">DEVANSH LAMBA</span>
              </div>
            </div>
          </div>
          <button
            className="placeholder-skip-btn"
            onClick={onVideoEnd}
          >
            Enter the Vault →
          </button>
          <p className="placeholder-hint">
            Place <code>main.mp4</code> in <code>public/video/</code> to see the intro.
          </p>
        </div>
      ) : (
        /* ── Full-viewport video ── */
        <video
          ref={videoRef}
          className={`intro-video-player ${videoReady ? 'intro-video-player--visible' : ''}`}
          src="/video/main.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
        />
      )}

      {/* Soft radial vignette — blends video edges into the env colour */}
      <div className="intro-video-vignette" />

      {/* Subtle cool-blue scanlines */}
      <div className="intro-video-scanlines" />

      {/* HUD corner brackets */}
      <div className={`intro-video-hud-corners ${videoReady ? 'intro-video-hud-corners--visible' : ''}`}>
        <div className="hud-corner hud-corner--tl" />
        <div className="hud-corner hud-corner--tr" />
        <div className="hud-corner hud-corner--bl" />
        <div className="hud-corner hud-corner--br" />
      </div>

      {/* Bottom HUD label */}
      <div className={`intro-video-hud ${videoReady ? 'intro-video-hud--visible' : ''}`}>
        <span className="hud-label">THE STUDY VAULT</span>
        <span className="hud-divider" />
        <span className="hud-label">DEVANSH LAMBA</span>
      </div>
    </div>
  );
}
