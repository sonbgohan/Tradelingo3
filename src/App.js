import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Homepage component
const Home = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <header>
        <h1>TradeLingo</h1>
        <p>Learn trading step by step</p>
      </header>
      
      <div className="course-grid">
        <div className="course-card" onClick={() => handleNavigation('/master')}>
          <div className="course-icon">
            <i className="fas fa-crown"></i>
          </div>
          <div className="course-info">
            <h2>TradeMaster</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '20%' }}></div>
            </div>
            <p>1/5</p>
          </div>
        </div>
        
        <div className="course-card" onClick={() => handleNavigation('/basics')}>
          <div className="course-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="course-info">
            <h2>Trading Basics</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '60%' }}></div>
            </div>
            <p>3/5</p>
          </div>
        </div>
        
        <div className="course-card" onClick={() => handleNavigation('/technical')}>
          <div className="course-icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <div className="course-info">
            <h2>Technical Analysis</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
            <p>0/8</p>
          </div>
        </div>
        
        <div className="course-card" onClick={() => handleNavigation('/fundamental')}>
          <div className="course-icon">
            <i className="fas fa-building"></i>
          </div>
          <div className="course-info">
            <h2>Fundamental Analysis</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
            <p>0/6</p>
          </div>
        </div>
        
        <div className="course-card" onClick={() => handleNavigation('/strategies')}>
          <div className="course-icon">
            <i className="fas fa-chess"></i>
          </div>
          <div className="course-info">
            <h2>Trading Strategies</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
            <p>0/10</p>
          </div>
        </div>
        
        <div className="course-card" onClick={() => handleNavigation('/advanced')}>
          <div className="course-icon">
            <i className="fas fa-brain"></i>
          </div>
          <div className="course-info">
            <h2>Advanced Concepts</h2>
            <div className="progress-bar">
              <div className="progress" style={{ width: '0%' }}></div>
            </div>
            <p>0/12</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Course pages components
const CourseTemplate = ({ title, lessons, icon }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  
  const openLesson = (lesson) => {
    setActiveLesson(lesson);
    setShowPopup(true);
  };
  
  const closePopup = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="course-page">
      <header>
        <Link to="/" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1>{title} <i className={`fas ${icon}`}></i></h1>
      </header>
      
      <div className="lesson-list">
        {lessons.map((lesson, index) => (
          <div 
            key={index} 
            className={`lesson-card ${lesson.completed ? 'completed' : ''}`}
            onClick={() => openLesson(lesson)}
          >
            <div className="lesson-number">{index + 1}</div>
            <div className="lesson-details">
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </div>
            <div className="lesson-status">
              {lesson.completed ? (
                <i className="fas fa-check-circle"></i>
              ) : (
                <i className="fas fa-lock"></i>
              )}
            </div>
          </div>
        ))}
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
              {activeLesson.completed ? (
                <div className="completion-badge">
                  <i className="fas fa-trophy"></i>
                  <p>Completed</p>
                </div>
              ) : (
                <button className="mark-complete-button">
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

// Sample data for each course
const tradeMasterLessons = [
  { 
    title: "Introduction to Trading", 
    description: "Learn the basics of financial markets",
    completed: true,
    content: "Trading is the act of buying and selling assets in financial markets. In this lesson, we'll introduce you to the concepts of trading, different markets, and basic terminology."
  },
  { 
    title: "Risk Management", 
    description: "How to protect your capital",
    completed: false,
    content: "Risk management is crucial for long-term success in trading. This lesson covers stop losses, position sizing, and portfolio diversity."
  },
  // More lessons...
];

const basicLessons = [
  { 
    title: "What are Financial Markets?", 
    description: "Understanding different market types",
    completed: true,
    content: "Financial markets are places where traders buy and sell assets like stocks, bonds, currencies, and commodities. Each market has its own characteristics and trading hours."
  },
  { 
    title: "Assets and Instruments", 
    description: "Stocks, Forex, Crypto, and more",
    completed: true,
    content: "Different trading instruments include stocks, bonds, forex pairs, cryptocurrencies, and derivatives. Each has unique properties and trading requirements."
  },
  { 
    title: "Understanding Charts", 
    description: "How to read price data",
    completed: true,
    content: "Charts display price movements over time. This lesson covers candlestick charts, line charts, time frames, and basic chart reading."
  },
  // More lessons...
];

const technicalLessons = [
  { 
    title: "Support and Resistance", 
    description: "Finding key price levels",
    completed: false,
    content: "Support and resistance are price levels where markets tend to reverse. Learning to identify these levels is essential for timing entries and exits."
  },
  // More lessons...
];

const fundamentalLessons = [
  { 
    title: "Economic Indicators", 
    description: "GDP, inflation, employment data",
    completed: false,
    content: "Economic indicators give insight into a country's economic health. Understanding how these affect markets is crucial for fundamental analysis."
  },
  // More lessons...
];

const strategyLessons = [
  { 
    title: "Trend Following", 
    description: "Trading with the trend",
    completed: false,
    content: "Trend following strategies aim to identify and ride market trends. This lesson covers trend identification, entries, and exits."
  },
  // More lessons...
];

const advancedLessons = [
  { 
    title: "Market Psychology", 
    description: "Understanding fear and greed",
    completed: false,
    content: "Market psychology plays a huge role in price movements. This lesson explores how emotions affect markets and how to use this knowledge in your trading."
  },
  // More lessons...
];

// Course page components
const TradeMaster = () => {
  return <CourseTemplate title="TradeMaster" lessons={tradeMasterLessons} icon="fa-crown" />;
};

const Basics = () => {
  return <CourseTemplate title="Trading Basics" lessons={basicLessons} icon="fa-book" />;
};

const Technical = () => {
  return <CourseTemplate title="Technical Analysis" lessons={technicalLessons} icon="fa-chart-line" />;
};

const Fundamental = () => {
  return <CourseTemplate title="Fundamental Analysis" lessons={fundamentalLessons} icon="fa-building" />;
};

const Strategies = () => {
  return <CourseTemplate title="Trading Strategies" lessons={strategyLessons} icon="fa-chess" />;
};

const Advanced = () => {
  return <CourseTemplate title="Advanced Concepts" lessons={advancedLessons} icon="fa-brain" />;
};

// Main App component
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/master" element={<TradeMaster />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/technical" element={<Technical />} />
          <Route path="/fundamental" element={<Fundamental />} />
          <Route path="/strategies" element={<Strategies />} />
          <Route path="/advanced" element={<Advanced />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
