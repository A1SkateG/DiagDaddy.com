import React from 'react';
import '../styles/Page.css';

/**
 * Learning Center page placeholder. This page will eventually host educational content
 * including wiring diagrams, component breakdowns and service procedures.
 */
export default function LearningCenter() {
  return (
    <section className="page container">
      <h1 className="page__title">Learning Center</h1>
      <p className="page__subtitle">
        Deep dive into the systems that make motorcycles tick. Explore wiring diagrams, component locations
        and service procedures. This resource is your reference library when working through training scenarios.
      </p>
      <p>
        This section is under development. It will soon contain interactive schematics, searchable parts
        descriptions and step‑by‑step guides for troubleshooting. Check back soon!
      </p>
    </section>
  );
}