import React from 'react';
import '../styles/Page.css';

/**
 * Competitive Learning / Leaderboards page placeholder. This area will host timed
 * challenges and display leaderboards ranking users by performance metrics.
 */
export default function CompetitiveLearning() {
  return (
    <section className="page container">
      <h1 className="page__title">Leaderboards &amp; Competitive Learning</h1>
      <p className="page__subtitle">
        Put your skills to the test in timed diagnostic challenges. Compare scores with friends, classmates
        and technicians around the world. Climb the leaderboard by diagnosing faults quickly and accurately.
      </p>
      <p>
        Leaderboards and competitive learning features are under construction. When complete you’ll see
        rankings across different systems and difficulty levels. Stay tuned for updates!
      </p>
    </section>
  );
}