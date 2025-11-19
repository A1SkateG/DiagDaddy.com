import React from 'react';
import '../styles/Page.css';

/**
 * Training Center dashboard placeholder page. This page will eventually host
 * the training scenarios and practice modules for diagnosing motorcycle faults.
 */
export default function TrainingCenter() {
  return (
    <section className="page container">
      <h1 className="page__title">Training Center</h1>
      <p className="page__subtitle">
        Here you’ll find interactive diagnostic scenarios that mirror real shop work. Choose a brand, pick a symptom
        and work through step‑by‑step troubleshooting. Your score is based on accuracy and speed.
      </p>
      <p>
        This section is under development. In the future, you’ll be able to select a motorcycle brand and model,
        begin a diagnostic session and track your progress. Stay tuned!
      </p>
    </section>
  );
}