import React from 'react';
import { Link } from 'react-router-dom';
import InteractiveModel from './InteractiveModel';
import AboutSection from './AboutSection';

import '../styles/Home.css';

/**
 * Home page component that includes the hero section, interactive 3D model and about section.
 */
export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__content container">
          <h1 className="hero__title">Motorcycle Diagnostic Training</h1>
          <p className="hero__subtitle">
            Build repeatable diagnostic habits and compare your progress—no real bike required.
          </p>
          <Link to="/signin" className="btn hero__cta">
            Start Training
          </Link>
        </div>
      </section>

      {/* 3D Interactive Model Section */}
      <section className="model-section container">
        <h2 className="section-title">3D Interactive Motorcycle Model</h2>
        <p className="section-subtitle">
          Rotate the bike, hover to highlight components, and click to isolate individual parts. Explore how each system
          connects to training and learning modules.
        </p>
        <InteractiveModel />
      </section>

      {/* About Section */}
      <AboutSection />
    </div>
  );
}