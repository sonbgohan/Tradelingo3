// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Import components
import SpaceBackground from './components/SpaceBackground';
import Home from './pages/Home';
import LevelPage from './pages/LevelPage';

// Import utils
import { initializeProgress } from './utils/progress';

// Main App component
function App() {
  // Initialize progress if not already in localStorage
  useEffect(() => {
    initializeProgress();
  }, []);

  return (
    <Router>
      <div className="app">
        <SpaceBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/level/:levelId" element={<LevelPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
