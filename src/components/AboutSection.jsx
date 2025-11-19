import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/AboutSection.css';

/**
 * About section describing Diag‑Daddy's mission and summarising the three core areas.
 */
export default function AboutSection() {
  return (
    <section className="about-section container" id="about">
      <h2 className="section-title">What is Diag‑Daddy?</h2>
      <p className="section-subtitle">
        Diag‑Daddy is your training ground for motorcycle diagnostics. Practice real‑world fault finding, study
        underlying systems and compete against others—all without putting a motorcycle on a lift.
      </p>
      <div className="about-grid">
        <article className="about-card">
          <h3>Training Center Dashboard</h3>
          <p>
            Guided diagnostic workflows mirror shop work: from intake and symptom gathering through wiring checks and
            final repair. Practice at your own pace or race the clock.
          </p>
          <Link to="/training" className="card-link">
            Visit Training Center →
          </Link>
        </article>
        <article className="about-card">
          <h3>Learning Center Dashboard</h3>
          <p>
            Study reference materials: wiring diagrams, component descriptions and step‑by‑step procedures. Build a
            deep understanding that supports your practice scenarios.
          </p>
          <Link to="/learning" className="card-link">
            Explore Learning Center →
          </Link>
        </article>
        <article className="about-card">
          <h3>Competitive Learning Dashboard</h3>
          <p>
            Challenge yourself and others with timed scenarios and leaderboards. See how you stack up on speed,
            accuracy and consistency.
          </p>
          <Link to="/leaderboards" className="card-link">
            View Leaderboards →
          </Link>
        </article>
      </div>
    </section>
  );
}