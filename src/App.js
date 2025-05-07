import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// Verbeterde import - zorg ervoor dat het pad correct is
import { initCosmicElements } from './components/cosmic_tradelingo';

// Track user progress in localStorage
const getUserProgress = () => {
  const savedProgress = localStorage.getItem('tradeLingo_progress');
  return savedProgress ? JSON.parse(savedProgress) : {
    completedLessons: [],
    quizScores: {},
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
    icon: 'chart-line',
    nextLevel: 'level2',
    position: { top: 100, left: 100 },
    lessons: [
      { 
        id: 'basics1',
        title: "What is Trading?", 
        description: "Introduction to financial markets and trading",
        content: [
          {
            type: "text",
            value: "Trading is the process of buying and selling financial assets with the goal of making a profit. Traders participate in various markets like stocks, forex, cryptocurrencies, and commodities, analyzing price movements to make informed decisions."
          },
          {
            type: "text",
            value: "Unlike long-term investors who might hold assets for years, traders often operate on shorter timeframes, from minutes to months, trying to capitalize on price fluctuations."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading chart showing buy and sell points",
            caption: "Example of trading decisions on a price chart"
          },
          {
            type: "text",
            value: "Trading involves different strategies including day trading (completing all trades within a single day), swing trading (holding positions for several days or weeks), and position trading (holding for weeks or months)."
          }
        ],
        quiz: {
          title: "Test Your Understanding",
          questions: [
            {
              id: "q1",
              question: "What is the main goal of trading?",
              options: [
                "To own a part of a company long-term",
                "To make a profit from price movements",
                "To support businesses you believe in",
                "To diversify your portfolio"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "How does trading differ from long-term investing?",
              options: [
                "Trading involves only stocks, while investing involves all assets",
                "Trading requires more capital than investing",
                "Trading typically uses shorter timeframes to capitalize on price movements",
                "Trading is risk-free compared to investing"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "Which of the following is NOT a common trading timeframe?",
              options: [
                "Day trading",
                "Swing trading",
                "Position trading",
                "Decade trading"
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      { 
        id: 'basics2',
        title: "How Does Trading Work?", 
        description: "Understanding the mechanics of trading",
        content: [
          {
            type: "text",
            value: "Trading works through exchanges and marketplaces where buyers and sellers come together to transact. Modern trading is primarily electronic, happening through online platforms provided by brokers or exchanges."
          },
          {
            type: "text",
            value: "When you place a trade, you're essentially placing an order to buy or sell an asset at a specific price. This order goes to the exchange where it's matched with a counterparty willing to take the other side of your trade."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trading process flow diagram",
            caption: "The flow of a typical trade from order placement to execution"
          },
          {
            type: "text",
            value: "Trading can be done in two directions: going 'long' (buying first, then selling later at a hopefully higher price) or going 'short' (selling borrowed assets first, then buying them back later at a hopefully lower price)."
          },
          {
            type: "text",
            value: "Most trading platforms allow you to use leverage (borrowed funds) to control larger positions than your account balance would normally allow. This amplifies both potential profits and losses."
          }
        ],
        quiz: {
          title: "How Trading Works Quiz",
          questions: [
            {
              id: "q1",
              question: "What happens when you place a trade order?",
              options: [
                "Your order is automatically executed at your desired price",
                "Your order goes to an exchange to be matched with a counterparty",
                "A broker buys the asset from their inventory to sell to you",
                "The asset is created at the moment you place the order"
              ],
              correctAnswer: 1
            },
            {
              id: "q2",
              question: "What does 'going long' in trading mean?",
              options: [
                "Trading with long-term goals in mind",
                "Using a long and complex trading strategy",
                "Buying first and selling later, hoping prices rise",
                "Trading with a large amount of capital"
              ],
              correctAnswer: 2
            },
            {
              id: "q3",
              question: "What effect does leverage have on trading?",
              options: [
                "It guarantees profits regardless of market movements",
                "It reduces the risk of trading completely",
                "It allows trading larger positions than your capital alone permits",
                "It slows down the execution of trades"
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      { 
        id: 'basics3',
        title: "What Does a Trader Do?", 
        description: "The day-to-day activities of a trader",
        content: [
          {
            type: "text",
            value: "Traders analyze markets to identify opportunities for profitable trades. This involves studying price charts, economic news, company reports, and other factors that might affect asset prices."
          },
          {
            type: "text",
            value: "A typical trader's day often starts with reviewing overnight market movements and news that could impact their trading plans. They'll check their existing positions and adjust their strategy accordingly."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Trader at desk with multiple screens",
            caption: "A trader monitors multiple markets and data sources simultaneously"
          },
          {
            type: "text",
            value: "Traders develop and follow trading plans to guide their decisions. These plans include entry and exit points, risk management rules, and criteria for identifying good trade setups."
          },
          {
            type: "text",
            value: "Record-keeping is crucial for traders. They track their trades, analyze their performance, identify patterns in their winning and losing trades, and continuously work to improve their strategy."
          },
          {
            type: "text",
            value: "Successful traders spend significant time on risk management, ensuring they don't risk too much on any single trade and that their overall risk exposure is controlled."
          }
        ],
        quiz: {
          title: "Trader Activities Quiz",
          questions: [
            {
              id: "q1",
              question: "What do traders analyze to find trading opportunities?",
              options: [
                "Only company financial statements",
                "Only technical chart patterns",
                "Price charts, news, reports, and other market-moving factors",
                "Only the advice of other traders"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "Why is record-keeping important for traders?",
              options: [
                "It's only required for tax purposes",
                "To track performance and improve trading strategies",
                "It's not important; successful traders rely on intuition",
                "Only to impress other traders with their results"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is a key aspect of a trading plan?",
              options: [
                "A guarantee of profits",
                "A list of hot stock tips from friends",
                "Entry and exit points, risk management rules",
                "Predictions about market crashes"
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  level2: {
    id: 'level2',
    title: 'Technical Analysis',
    icon: 'analytics',
    nextLevel: null, // Last level for now
    position: { top: 250, left: 450 },
    lessons: [
      { 
        id: 'tech1',
        title: "Chart Types", 
        description: "Understanding different chart representations",
        content: [
          {
            type: "text",
            value: "Charts are visual representations of price movements over time. There are several types of charts traders use to analyze markets."
          },
          {
            type: "text",
            value: "Line charts are the simplest form, showing a single line connecting closing prices. They provide a clean overview of price movement but lack detail about price action within each period."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Line chart example",
            caption: "Example of a simple line chart showing price movement"
          },
          {
            type: "text",
            value: "Candlestick charts show opening, closing, high, and low prices for each time period. They form patterns that traders use to predict future price movements."
          },
          {
            type: "image",
            src: "/api/placeholder/600/400",
            alt: "Candlestick chart explained",
            caption: "Anatomy of a candlestick chart with bullish and bearish candles"
          },
          {
            type: "text",
            value: "Bar charts (OHLC charts) also display opening, high, low, and closing prices, but in a different format than candlesticks. They use vertical bars with small horizontal lines."
          }
        ],
        quiz: {
          title: "Chart Types Quiz",
          questions: [
            {
              id: "q1",
              question: "What information does a line chart typically show?",
              options: [
                "Opening, high, low, and closing prices",
                "Only opening and closing prices",
                "Only closing prices connected by a line",
                "Trading volume and price averages"
              ],
              correctAnswer: 2
            },
            {
              id: "q2",
              question: "Which chart type shows opening, closing, high, and low prices in a format that makes patterns easier to identify?",
              options: [
                "Point and figure charts",
                "Candlestick charts",
                "Line charts",
                "Scatter plots"
              ],
              correctAnswer: 1
            },
            {
              id: "q3",
              question: "What is a limitation of line charts compared to candlestick charts?",
              options: [
                "Line charts cannot show long time periods",
                "Line charts are more complex to read",
                "Line charts lack detail about price action within each period",
                "Line charts cannot be used for technical analysis"
              ],
              correctAnswer: 2
            }
          ]
        }
      }
    ]
  }
};

// Define the connections between levels
const levelConnections = [
  { from: 'level1', to: 'level2' }
];

// Generate space background elements
const generateStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const size = Math.random() < 0.6 ? 'small' : Math.random() < 0.9 ? 'medium' : 'large';
    const twinkle = Math.random() < 0.7;
    const speed = Math.random() < 0.33 ? 'slow' : Math.random() < 0.66 ? '' : 'fast';
    
    stars.push({
      id: `star-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      twinkle,
      speed
    });
  }
  return stars;
};

const generateParticles = (count) => {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const size = Math.floor(Math.random() * 150) + 50;
    const speed = Math.random() < 0.33 ? 'float-slow' : Math.random() < 0.66 ? 'float' : 'float-fast';
    
    particles.push({
      id: `particle-${i}`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      speed,
      delay: Math.random() * 5
    });
  }
  return particles;
};

// Space background component
const SpaceBackground = () => {
  const [stars] = useState(() => generateStars(150));
  const [particles] = useState(() => generateParticles(10));
  
  return (
    <>
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.size} ${star.twinkle ? 'twinkle' : ''} ${star.speed}`}
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </div>
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle ${particle.speed}`}
            style={{ 
              top: particle.top, 
              left: particle.left,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

// Quiz component
const Quiz = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionId, optionIndex) => {
    if (!submitted) {
      setAnswers({
        ...answers,
        [questionId]: optionIndex
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    
    // Pass score back to parent
    onComplete(finalScore);
  };

  const handleTryAgain = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="quiz-container">
      <h3>{submitted ? `Your Score: ${score}%` : "Quiz"}</h3>
      
      {questions.map((question, index) => (
        <div key={question.id} className="quiz-question">
          <p className="question-text">{`${index + 1}. ${question.question}`}</p>
          <div className="options-container">
            {question.options.map((option, optionIndex) => (
              <div 
                key={optionIndex}
                className={`option ${
                  submitted 
                    ? optionIndex === question.correctAnswer 
                      ? "correct" 
                      : answers[question.id] === optionIndex 
                        ? "incorrect" 
                        : "" 
                    : answers[question.id] === optionIndex 
                      ? "selected" 
                      : ""
                }`}
                onClick={() => handleAnswerSelect(question.id, optionIndex)}
              >
                {option}
                {submitted && optionIndex === question.correctAnswer && (
                  <span className="check-icon"><i className="fas fa-check"></i></span>
                )}
                {submitted && answers[question.id] === optionIndex && optionIndex !== question.correctAnswer && (
                  <span className="cross-icon"><i className="fas fa-times"></i></span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="quiz-actions">
        {!submitted ? (
          <button className="submit-button" onClick={handleSubmit}>Submit Answers</button>
        ) : (
          <div className="post-submit-actions">
            <button className="try-again-button" onClick={handleTryAgain}>Try Again</button>
            {score >= 70 && (
              <button className="continue-button" onClick={() => onComplete(score, true)}>
                Continue to Next Lesson
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Home component
const Home = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  
  // Apply cosmic elements with debugging
  useEffect(() => {
    console.log("Home component gemonteerd, kosmische elementen voorbereiden...");
    
    const timeoutId = setTimeout(() => {
      console.log("Timeout voorbij, initCosmicElements aanroepen...");
      try {
        if (typeof initCosmicElements === 'function') {
          console.log("initCosmicElements is een functie, nu aanroepen");
          initCosmicElements();
        } else {
          console.error("FOUT: initCosmicElements is GEEN functie!", typeof initCosmicElements);
          console.error("Waarde van initCosmicElements:", initCosmicElements);
        }
      } catch (err) {
        console.error("Fout bij aanroepen van initCosmicElements:", err);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
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

  const getLevelConnectionPath = (from, to) => {
    const fromLevel = courseStructure[from];
    const toLevel = courseStructure[to];
    
    // Calculate the center points of each level node
    const fromCenterX = fromLevel.position.left + 125; // Half of the width
    const fromCenterY = fromLevel.position.top + 50;  // Half of the height
    
    const toCenterX = toLevel.position.left + 125;
    const toCenterY = toLevel.position.top + 50;
    
    const pathString = `M${fromCenterX},${fromCenterY} Q${(fromCenterX + toCenterX) / 2},${(fromCenterY + toCenterY) / 2 - 50} ${toCenterX},${toCenterY}`;
    return pathString;
  };

  return (
    <div className="home-container">
      <header>
        <h1>TRADELINGO</h1>
        <p>Master trading in a cosmic journey through space</p>
      </header>
      
      <div className="world-map">
        {/* Path connections between levels */}
        <svg className="level-paths" width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="none">
          {levelConnections.map((connection, index) => {
            const isPathUnlocked = progress.unlockedLevels.includes(connection.to);
            return (
              <path 
                key={index} 
                d={getLevelConnectionPath(connection.from, connection.to)} 
                className="level-path" 
                style={{ 
                  opacity: isPathUnlocked ? 1 : 0.4,
                  strokeDasharray: isPathUnlocked ? "8" : "8",
                  animation: isPathUnlocked ? "dash 30s linear infinite" : "none"
                }}
              />
            );
          })}
        </svg>
        
        {/* Level nodes */}
        {Object.keys(courseStructure).map((levelId) => {
          const level = courseStructure[levelId];
          const isUnlocked = progress.unlockedLevels.includes(levelId);
          const levelProgress = getLevelProgress(levelId);
          
          return (
            <div 
              key={levelId} 
              className={`level-node ${isUnlocked ? 'unlocked' : 'locked'}`}
              onClick={() => isUnlocked && handleNavigation(levelId)}
              style={{ top: `${level.position.top}px`, left: `${level.position.left}px` }}
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
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Apply cosmic elements with debugging
  useEffect(() => {
    console.log("LevelPage component gemonteerd, kosmische elementen voorbereiden...");
    
    const timeoutId = setTimeout(() => {
      console.log("Timeout voorbij, initCosmicElements aanroepen...");
      try {
        if (typeof initCosmicElements === 'function') {
          console.log("initCosmicElements is een functie, nu aanroepen");
          initCosmicElements();
        } else {
          console.error("FOUT: initCosmicElements is GEEN functie!", typeof initCosmicElements);
          console.error("Waarde van initCosmicElements:", initCosmicElements);
        }
      } catch (err) {
        console.error("Fout bij aanroepen van initCosmicElements:", err);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, []);
  
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
      setShowQuiz(false);
    }
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setShowQuiz(false);
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, continueToNext = false) => {
    const newProgress = { ...progress };
    
    // Save the quiz score
    if (!newProgress.quizScores) {
      newProgress.quizScores = {};
    }
    
    newProgress.quizScores[activeLesson.id] = score;
    
    // Mark lesson as completed if score is above 70%
    if (score >= 70 && !newProgress.completedLessons.includes(activeLesson.id)) {
      newProgress.completedLessons.push(activeLesson.id);
      
      // Check if all lessons in this level are completed
      const allCompleted = level.lessons.every(lesson => 
        newProgress.completedLessons.includes(lesson.id)
      );
      
      // Unlock next level if exists
      if (allCompleted && level.nextLevel && !newProgress.unlockedLevels.includes(level.nextLevel)) {
        newProgress.unlockedLevels.push(level.nextLevel);
      }
    }
    
    setProgress(newProgress);
    saveUserProgress(newProgress);
    
    if (continueToNext && activeLesson.index < level.lessons.length - 1) {
      // Move to the next lesson
      const nextLesson = level.lessons[activeLesson.index + 1];
      setActiveLesson({...nextLesson, index: activeLesson.index + 1});
      setShowQuiz(false);
    }
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
          const quizScore = progress.quizScores && progress.quizScores[lesson.id];
          
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
                {quizScore !== undefined && (
                  <div className="quiz-score">
                    Quiz Score: {quizScore}%
                  </div>
                )}
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
              {!showQuiz ? (
                <>
                  {activeLesson.content.map((item, index) => {
                    if (item.type === "text") {
                      return <p key={index}>{item.value}</p>;
                    } else if (item.type === "image") {
                      return (
                        <div key={index} className="lesson-image-container">
                          <img 
                            src={item.src} 
                            alt={item.alt} 
                            className="lesson-image" 
                          />
                          {item.caption && (
                            <p className="image-caption">{item.caption}</p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })}
                  <div className="lesson-actions">
                    {progress.completedLessons.includes(activeLesson.id) ? (
                      <div className="completion-badge">
                        <i className="fas fa-trophy"></i>
                        <p>Completed</p>
                      </div>
                    ) : (
                      <button 
                        className="start-quiz-button"
                        onClick={startQuiz}
                      >
                        Start Quiz
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <Quiz 
                  questions={activeLesson.quiz.questions} 
                  onComplete={handleQuizComplete} 
                />
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
    console.log("App component gemonteerd, localStorage controleren...");
    
    if (!localStorage.getItem('tradeLingo_progress')) {
      console.log("Geen localStorage data gevonden, initiële data aanmaken");
      const initialProgress = {
        completedLessons: [],
        quizScores: {},
        unlockedLevels: ['level1']
      };
      localStorage.setItem('tradeLingo_progress', JSON.stringify(initialProgress));
    } else {
      console.log("Bestaande localStorage data gevonden");
    }
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
