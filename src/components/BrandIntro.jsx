import React from 'react';
import './BrandIntro.css';

/**
 * BrandIntro
 *
 * A lightweight, CSS-animated wordmark that replaces the old video intro.
 * Follows a precise 1.5s timeline before triggering a fast ZOOP exit.
 */
export default function BrandIntro({ isZooping }) {
  return (
    <div className="brand-intro-root">
      <div className={`brand-intro-content ${isZooping ? 'brand-intro-content--zooping' : ''}`}>
        <div className="brand-wordmark">
          Study Vault
          <div className="brand-subtitle">by Devansh Lamba</div>
        </div>
      </div>
    </div>
  );
}
