import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// Track user progress in localStorage
const getUserProgress = () => {
  const savedProgress = localStorage.getItem('tradeLingo_progress');
  return savedProgress ? JSON.parse(savedProgress) : {
    completedLessons: [],
    unlockedLevels: ['level1']
  };
};

const saveUserProgress = (progress) => {
  localStorage.setItem('tradeLingo_progress', JSON.stringify(progress));
};

// Define course structure
const courseStructure = {
  level1: {
    id: 'level1',
    title: 'Trading Basics',
    icon: 'book',
    nextLevel: 'level2',
    lessons: [
      { 
        id: 'basics1',
        title: "What are Financial Markets?", 
        description: "Understanding different market types",
        content: "Financial markets are places where traders buy and sell assets like stocks, bonds, currencies, and commodities. Each market has its own characteristics and trading hours."
      },
      { 
        id: 'basics2',
        title: "Assets and Instruments", 
        description: "Stocks, Forex, Crypto, and more",
        content: "Different trading instruments include stocks, bonds, forex pairs, cryptocurrencies, and derivatives. Each has unique properties and trading requirements."
      },
      { 
        id: 'basics3',
        title: "Understanding Charts", 
        description: "How to read price data",
        content: "Charts display price movements over time. This lesson covers candlestick charts, line charts, time frames, and basic chart reading."
      }
    ]
  },
  level2: {
    id: 'level2',
    title: 'Technical Analysis',
    icon: 'chart-line',
    nextLevel: null, // Last level for now
    lessons: [
      { 
        id: 'tech1',
        title: "Support and Resistance", 
        description: "Finding key price levels",
        content: "Support and resistance are price levels where markets tend to reverse. Learning to identify these levels is essential for timing entries and exits."
      },
      { 
        id: 'tech2',
        title: "Trend Lines", 
        description: "Drawing and using trend lines",
        content: "Trend lines connect price points and help identify the direction of the market. They can be used to spot potential breakouts or reversals."
      }
    ]
  }
};

// Homepage component
const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  
  const handleNavigation = (levelId) => {
    if (progress.unlockedLevels.includes(levelId)) {
      navigate(`/level/${levelId}`);
    }
  };

  const getLevelProgress = (levelId) => {
    const level = courseStructure[levelId];
    const completedInLevel = level.lessons.filter(lesson => 
      progress.completedLessons.includes(lesson.id)
    ).length;
    
    return {
      completed: completedInLevel,
      total: level.lessons.length,
      percentage: (completedInLevel / level.lessons.length) * 100
    };
  };

  return (
    <div className="home-container">
      <header>
        <h1>TradeLingo</h1>
        <p>Learn trading step by step</p>
      </header>
      
      <div className="world-map">
        {Object.keys(courseStructure).map((levelId, index) => {
          const level = courseStructure[levelId];
          const isUnlocked = progress.unlockedLevels.includes(levelId);
          const levelProgress = getLevelProgress(levelId);
          
          return (
            <div 
              key={levelId} 
              className={`level-node ${isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => isUnlocked && handleNavigation(levelId)}
              style={{ top: `${100 + (index * 100)}px`, left: `${150 + (index * 100)}px` }}
            >
              <div className="level-icon">
                <i className={`fas fa-${level.icon}`}></i>
              </div>
              <div className="level-info">
                <h2>{level.title}</h2>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${levelProgress.percentage}%` }}></div>
                </div>
                <p>{levelProgress.completed}/{levelProgress.total}</p>
              </div>
              {!isUnlocked && <div className="lock-overlay"><i className="fas fa-lock"></i></div>}
            </div>
          );
        })}
        
        {/* Path connections between levels */}
        <svg className="level-paths">
          <path d="M250,150 L350,250" className="level-path" />
        </svg>
      </div>
    </div>
  );
};

// Level page component
const LevelPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  const [showPopup, setShowPopup] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  
  // Get level ID from URL
  const pathParts = window.location.pathname.split('/');
  const levelId = pathParts[pathParts.length - 1];
  const level = courseStructure[levelId];
  
  // Redirect if level doesn't exist or is not unlocked
  if (!level || !progress.unlockedLevels.includes(levelId)) {
    return <Navigate to="/" />;
  }
  
  const openLesson = (lesson, index) => {
    // Check if previous lessons are completed
    const previousLessonsCompleted = level.lessons
      .slice(0, index)
      .every(prevLesson => progress.completedLessons.includes(prevLesson.id));
      
    if (previousLessonsCompleted || progress.completedLessons.includes(lesson.id)) {
      setActiveLesson({...lesson, index});
      setShowPopup(true);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };

  const completeLesson = (lessonId) => {
    const newProgress = { ...progress };
    
    if (!newProgress.completedLessons.includes(lessonId)) {
      newProgress.completedLessons.push(lessonId);
      
      // Check if all lessons in this level are completed
      const allCompleted = level.lessons.every(lesson => 
        newProgress.completedLessons.includes(lesson.id)
      );
      
      // Unlock next level if exists
      if (allCompleted && level.nextLevel && !newProgress.unlockedLevels.includes(level.nextLevel)) {
        newProgress.unlockedLevels.push(level.nextLevel);
      }
      
      setProgress(newProgress);
      saveUserProgress(newProgress);
    }
    
    closePopup();
  };
  
  const isLessonAvailable = (index) => {
    if (index === 0) return true;
    
    // Check if all previous lessons are completed
    return level.lessons
      .slice(0, index)
      .every(lesson => progress.completedLessons.includes(lesson.id));
  };
  
  return (
    <div className="level-page">
      <header>
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1>{level.title} <i className={`fas fa-${level.icon}`}></i></h1>
      </header>
      
      <div className="lesson-list">
        {level.lessons.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const isAvailable = isLessonAvailable(index);
          
          return (
            <div 
              key={lesson.id} 
              className={`lesson-card ${isCompleted ? 'completed' : ''} ${!isAvailable ? 'locked' : ''}`}
              onClick={() => isAvailable && openLesson(lesson, index)}
            >
              <div className="lesson-number">{index + 1}</div>
              <div className="lesson-details">
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              <div className="lesson-status">
                {isCompleted ? (
                  <i className="fas fa-check-circle"></i>
                ) : !isAvailable ? (
                  <i className="fas fa-lock"></i>
                ) : (
                  <i className="fas fa-circle-notch"></i>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {showPopup && activeLesson && (
        <div className="lesson-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h2>{activeLesson.title}</h2>
              <button className="close-button" onClick={closePopup}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="popup-body">
              <p>{activeLesson.content}</p>
              {progress.completedLessons.includes(activeLesson.id) ? (
                <div className="completion-badge">
                  <i className="fas fa-trophy"></i>
                  <p>Completed</p>
                </div>
              ) : (
                <button 
                  className="mark-complete-button"
                  onClick={() => completeLesson(activeLesson.id)}
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App component
function App() {
  // Initialize progress if not already in localStorage
  useEffect(() => {
    if (!localStorage.getItem('tradeLingo_progress')) {
      const initialProgress = {
        completedLessons: [],
        unlockedLevels: ['level1']
      };
      localStorage.setItem('tradeLingo_progress', JSON.stringify(initialProgress));
    }
  }, []);

  return (
    <Router>
      <div className="app">
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
