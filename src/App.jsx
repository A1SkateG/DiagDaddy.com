import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import TrainingCenter from './pages/TrainingCenter';
import LearningCenter from './pages/LearningCenter';
import CompetitiveLearning from './pages/CompetitiveLearning';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

/**
 * Main application component. Defines the global layout and page routing.
 */
export default function App() {
  return (
    <>
      <NavBar />
      <main style={{ paddingTop: '64px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<TrainingCenter />} />
          <Route path="/learning" element={<LearningCenter />} />
          <Route path="/leaderboards" element={<CompetitiveLearning />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback route could display a 404 page */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </>
  );
}