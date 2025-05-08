import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';

// Kosmische elementen functionaliteit
const initCosmicElements = () => {
  console.log("Kosmische elementen initialiseren...");
  
  // Functie om de titel te vervangen door een beter logo
  const replaceTitleWithLogo = () => {
    const headerTitle = document.querySelector('header h1');
    if (!headerTitle) return;
    
    const logoContainer = document.createElement('div');
    logoContainer.className = 'logo-container';
    logoContainer.innerHTML = `
      <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" class="tradelingo-logo">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="50%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g transform="translate(30, 60) rotate(-30)" filter="url(#neonGlow)">
          <path d="M0,0 L15,40 L0,55 L-15,40 Z" fill="url(#logoGradient)" />
          <circle cx="0" cy="15" r="5" fill="white" fillOpacity="0.8" />
          <path d="M-10,40 L0,60 L10,40" fill="#f59e0b" filter="url(#glow)" />
        </g>
        
        <g filter="url(#neonGlow)">
          <text x="75" y="80" fontFamily="Arial" fontWeight="bold" fontSize="60" fill="url(#logoGradient)">TRADE</text>
          <text x="260" y="80" fontFamily="Arial" fontWeight="bold" fontSize="60" fill="url(#logoGradient)">LINGO</text>
        </g>
        
        <path d="M75,90 L355,90" stroke="url(#logoGradient)" strokeWidth="2" strokeDasharray="5,5" />
        
        <polyline points="380,60 390,50 400,65 410,45 420,55 430,40" 
          stroke="url(#logoGradient)" strokeWidth="3" fill="none" filter="url(#neonGlow)" />
        
        <circle cx="450" cy="50" r="15" fill="none" stroke="url(#logoGradient)" strokeWidth="2" />
        <circle cx="450" cy="50" r="10" fill="url(#logoGradient)" fillOpacity="0.3" />
        <circle cx="450" cy="50" r="5" fill="url(#logoGradient)" fillOpacity="0.5" />
      </svg>
    `;
    
    headerTitle.innerHTML = '';
    headerTitle.appendChild(logoContainer);
  };
  
  // Functie om levels te transformeren naar planeten
  const transformLevelsToPlanets = () => {
    const levelNodes = document.querySelectorAll('.level-node');
    
    levelNodes.forEach((node, index) => {
      // Check of de node al is getransformeerd
      if (node.querySelector('.planet-container')) return;
      
      // Haal bestaande elementen op
      const levelIcon = node.querySelector('.level-icon');
      const levelInfo = node.querySelector('.level-info');
      if (!levelIcon) return;
      
      // Haal voortgangspercentage op
      const progressBar = node.querySelector('.progress-bar .progress');
      const progressStyle = progressBar ? progressBar.style.width : '0%';
      const progressPercentage = parseInt(progressStyle) || 0;
      
      // Maak planeet container
      const planetContainer = document.createElement('div');
      planetContainer.className = 'planet-container';
      
      // Maak planeet
      const planet = document.createElement('div');
      planet.className = 'planet';
      
      // Voeg voortgangsindicator toe in het midden van de planeet
      const planetProgress = document.createElement('div');
      planetProgress.className = 'planet-progress';
      
      const progressText = document.createElement('div');
      progressText.className = 'progress-text';
      progressText.textContent = `${progressPercentage}%`;
      
      planetProgress.appendChild(progressText);
      planet.appendChild(planetProgress);
      
      // Voeg planeetkenmerken toe (kraters)
      for (let i = 0; i < 8; i++) {
        const feature = document.createElement('div');
        feature.className = 'planet-feature';
        
        // Willekeurige positie binnen de planeet
        feature.style.left = `${15 + Math.random() * 70}%`;
        feature.style.top = `${15 + Math.random() * 70}%`;
        
        // Willekeurige grootte
        const featureSize = 3 + Math.random() * 12;
        feature.style.width = `${featureSize}px`;
        feature.style.height = `${featureSize}px`;
        
        // Willekeurige transparantie
        feature.style.opacity = 0.1 + Math.random() * 0.3;
        
        planet.appendChild(feature);
      }
      
      // Voeg gloed-effect toe
      const planetGlow = document.createElement('div');
      planetGlow.className = 'planet-glow';
      
      // Plaats alles samen
      planetContainer.appendChild(planet);
      planetContainer.appendChild(planetGlow);

      // Voeg draaiende raket toe aan actieve planeet
      const isUnlocked = !node.classList.contains('locked');
      const isActive = progressPercentage > 0 && progressPercentage < 100;
      
      if (isUnlocked && isActive) {
        const orbitingRocket = document.createElement('div');
        orbitingRocket.className = 'orbiting-rocket';
        
        const rocketBody = document.createElement('div');
        rocketBody.className = 'rocket-body';
        
        const rocketShape = document.createElement('div');
        rocketShape.className = 'rocket-shape';
        
        const rocketWindow = document.createElement('div');
        rocketWindow.className = 'rocket-window';
        
        const rocketFlame = document.createElement('div');
        rocketFlame.className = 'rocket-flame';
        
        rocketBody.appendChild(rocketShape);
        rocketBody.appendChild(rocketWindow);
        rocketBody.appendChild(rocketFlame);
        orbitingRocket.appendChild(rocketBody);
        
        planetContainer.appendChild(orbitingRocket);
      }
      
      // Vervang level icon met planeet
      try {
        node.replaceChild(planetContainer, levelIcon);
        
        // Pas de layout aan naar verticaal
        node.style.flexDirection = 'column';
        node.style.alignItems = 'center';
        
        // Pas text alignment aan
        if (levelInfo) {
          levelInfo.style.textAlign = 'center';
        }
      } catch (err) {
        console.error('Fout bij vervangen van level icon:', err);
      }
    });
  };

  // Functie om raket toe te voegen aan paden
  const addRocketToPath = () => {
    // Verwijder bestaande raketten om dubbele elementen te voorkomen
    document.querySelectorAll('.rocket').forEach(r => r.remove());
    
    const paths = document.querySelectorAll('.level-path');
    if (!paths || paths.length === 0) return;
    
    paths.forEach((path, index) => {
      // Controleer of pad actief is (niet uitgegrijsd)
      const pathStyle = window.getComputedStyle(path);
      const isPathActive = pathStyle.opacity !== '0.4' && pathStyle.opacity > 0.5;
      
      if (!isPathActive) return;
      
      // Maak raket element
      const rocket = document.createElement('div');
      rocket.className = 'rocket';
      rocket.id = `rocket-${index}`;
      
      const rocketBody = document.createElement('div');
      rocketBody.className = 'rocket-body';
      
      const rocketShape = document.createElement('div');
      rocketShape.className = 'rocket-shape';
      
      const rocketWindow = document.createElement('div');
      rocketWindow.className = 'rocket-window';
      
      const rocketFlame = document.createElement('div');
      rocketFlame.className = 'rocket-flame';
      
      rocketBody.appendChild(rocketShape);
      rocketBody.appendChild(rocketWindow);
      rocketBody.appendChild(rocketFlame);
      rocket.appendChild(rocketBody);
      
      // Voeg raket toe aan de DOM
      const worldMap = document.querySelector('.world-map');
      if (worldMap) {
        worldMap.appendChild(rocket);
        
        // Start animatie
        animateRocketAlongPath(rocket, path, worldMap);
      }
    });
  };
  
  // Functie om raket langs pad te animeren
  const animateRocketAlongPath = (rocket, path, worldMap) => {
    if (!rocket || !path || !worldMap) return;
    
    let progress = 0;
    const speed = 0.5;
    
    const pathRect = path.getBoundingClientRect();
    const mapRect = worldMap.getBoundingClientRect();
    
    // Bepaal het start- en eindpunt van het pad
    const startX = pathRect.left - mapRect.left;
    const startY = pathRect.top - mapRect.top;
    const endX = pathRect.right - mapRect.left;
    const endY = pathRect.bottom - mapRect.top;
    
    // Middenpunt voor een gebogen pad
    const midX = (startX + endX) / 2;
    const midY = startY - 50;
    
    const animate = () => {
      // Update voortgang
      progress += speed;
      if (progress > 100) progress = 0;
      
      const t = progress / 100;
      
      // Bereken quadratische bezier curve punt
      const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * midX + t * t * endX;
      const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * midY + t * t * endY;
      
      // Bereken een punt iets verder op de curve voor de rotatie
      const tAhead = Math.min(t + 0.01, 1);
      const xAhead = (1 - tAhead) * (1 - tAhead) * startX + 2 * (1 - tAhead) * tAhead * midX + tAhead * tAhead * endX;
      const yAhead = (1 - tAhead) * (1 - tAhead) * startY + 2 * (1 - tAhead) * tAhead * midY + tAhead * tAhead * endY;
      
      // Bereken rotatie hoek
      const angle = Math.atan2(yAhead - y, xAhead - x) * 180 / Math.PI;
      
      // Positioneer de raket
      rocket.style.transform = `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
      rocket.style.display = 'block';
      
      // Volgende frame
      requestAnimationFrame(animate);
    };
    
    // Start animatie
    requestAnimationFrame(animate);
  };
  
  // Voer alles uit met vertragingen om de DOM te laten laden
  setTimeout(() => {
    replaceTitleWithLogo();
    
    setTimeout(() => {
      transformLevelsToPlanets();
      
      setTimeout(() => {
        addRocketToPath();
      }, 500);
    }, 300);
  }, 200);
};

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

// Define course structure with lesson content
const courseStructure = {
  level1: {
    id: 'level1',
    title: 'What is Trading?',
    icon: 'chart-line',
    nextLevel: 'level2',
    position: { top: 100, left: 100 },
    lessons: [
      {
        id: 'lesson1_1',
        title: 'Introduction to Trading',
        description: 'Learn the basic concepts of trading in financial markets',
        content: [
          {
            type: 'text',
            value: 'Trading is the process of buying and selling financial instruments like stocks, bonds, currencies, commodities, and derivatives with the goal of generating a profit. It involves the transfer of assets between parties, typically facilitated by exchanges or over-the-counter markets.'
          },
          {
            type: 'text',
            value: 'Unlike long-term investing, trading often involves shorter timeframes and more frequent transactions. Traders aim to capitalize on price movements in the market, whether prices are rising (going long) or falling (going short).'
          },
          {
            type: 'image',
            src: 'https://via.placeholder.com/600x300',
            alt: 'Trading concept illustration',
            caption: 'Trading involves analyzing markets and executing transactions at optimal times'
          },
          {
            type: 'text',
            value: 'Various factors influence trading decisions, including technical analysis (studying price charts and patterns), fundamental analysis (evaluating economic indicators and company financials), and market sentiment (gauging investor emotions and behavior).'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q1_1',
              question: 'What is the primary goal of trading?',
              options: [
                'Long-term wealth preservation',
                'Generating profits from price movements',
                'Avoiding market volatility',
                'Collecting dividends only'
              ],
              correctAnswer: 1
            },
            {
              id: 'q1_2',
              question: 'Which of these is NOT typically used in trading decision-making?',
              options: [
                'Technical analysis',
                'Fundamental analysis',
                'Market sentiment',
                'Astrological charts'
              ],
              correctAnswer: 3
            },
            {
              id: 'q1_3',
              question: 'What does "going short" mean in trading?',
              options: [
                'Making quick trades',
                'Trading small amounts',
                'Profiting from falling prices',
                'Trading for less than one hour'
              ],
              correctAnswer: 2
            }
          ]
        }
      },
      {
        id: 'lesson1_2',
        title: 'Types of Financial Markets',
        description: 'Explore different financial markets and their characteristics',
        content: [
          {
            type: 'text',
            value: 'Financial markets are platforms where buyers and sellers can trade securities, commodities, and other financial instruments. These markets play a crucial role in allocating resources and facilitating economic growth.'
          },
          {
            type: 'text',
            value: 'Stock markets are perhaps the most well-known type of financial market. They enable companies to raise capital by selling shares to investors who become partial owners. Examples include the New York Stock Exchange (NYSE) and NASDAQ.'
          },
          {
            type: 'text',
            value: 'Bond markets (or debt markets) allow entities to issue debt securities to raise funds. Investors who purchase bonds are essentially lending money to the issuer in exchange for regular interest payments and the return of principal at maturity.'
          },
          {
            type: 'text',
            value: 'Foreign exchange (forex) markets facilitate the trading of currencies. With a daily trading volume exceeding $6 trillion, the forex market is the largest and most liquid financial market in the world.'
          },
          {
            type: 'image',
            src: 'https://via.placeholder.com/600x300',
            alt: 'Different financial markets',
            caption: 'Major financial markets include stock, bond, forex, and commodity markets'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q2_1',
              question: 'Which market has the highest daily trading volume?',
              options: [
                'Stock market',
                'Bond market',
                'Forex market',
                'Cryptocurrency market'
              ],
              correctAnswer: 2
            },
            {
              id: 'q2_2',
              question: 'What do investors receive when they purchase shares in the stock market?',
              options: [
                'A loan agreement with the company',
                'Partial ownership in the company',
                'Regular interest payments',
                'A physical certificate only'
              ],
              correctAnswer: 1
            },
            {
              id: 'q2_3',
              question: 'What is the primary function of financial markets?',
              options: [
                'To regulate company operations',
                'To collect taxes for governments',
                'To allocate resources and facilitate economic growth',
                'To prevent financial crises'
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
    title: 'Financial Markets',
    icon: 'analytics',
    nextLevel: null, // Last level for now
    position: { top: 250, left: 450 },
    lessons: [
      {
        id: 'lesson2_1',
        title: 'Stock Markets Explained',
        description: 'Understand how stock markets function and how to participate',
        content: [
          {
            type: 'text',
            value: 'Stock markets are organized marketplaces where shares of publicly traded companies are bought and sold. These markets can be physical locations (like the NYSE trading floor) or electronic networks (like NASDAQ).'
          },
          {
            type: 'text',
            value: 'When companies want to raise capital, they can issue shares through an Initial Public Offering (IPO). After the IPO, these shares trade on secondary markets where investors buy and sell them based on their perceived value.'
          },
          {
            type: 'text',
            value: 'Stock prices are determined by supply and demand dynamics. When more investors want to buy a stock than sell it, the price typically rises. Conversely, when more investors want to sell than buy, the price usually falls.'
          },
          {
            type: 'image',
            src: 'https://via.placeholder.com/600x300',
            alt: 'Stock market trading',
            caption: 'Modern stock trading happens primarily through electronic networks'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q3_1',
              question: 'What is an IPO?',
              options: [
                'International Portfolio Optimization',
                'Initial Public Offering',
                'Internal Price Oscillation',
                'Investor Protection Order'
              ],
              correctAnswer: 1
            },
            {
              id: 'q3_2',
              question: 'What happens to a stock\'s price when more investors want to sell it than buy it?',
              options: [
                'The price typically rises',
                'The price remains stable',
                'The price typically falls',
                'Trading gets suspended'
              ],
              correctAnswer: 2
            },
            {
              id: 'q3_3',
              question: 'Which of these is NOT a major stock exchange?',
              options: [
                'NYSE (New York Stock Exchange)',
                'NASDAQ',
                'LSE (London Stock Exchange)',
                'IMF (International Monetary Fund)'
              ],
              correctAnswer: 3
            }
          ]
        }
      },
      {
        id: 'lesson2_2',
        title: 'Bond Markets and Debt Securities',
        description: 'Learn about bonds, treasuries, and other debt instruments',
        content: [
          {
            type: 'text',
            value: 'Bond markets, also known as debt markets or fixed-income markets, allow governments, municipalities, and corporations to issue debt securities to raise capital. Investors who buy bonds are essentially lending money to the issuer.'
          },
          {
            type: 'text',
            value: 'Bonds typically pay regular interest (known as coupon payments) and return the principal amount at maturity. They are generally considered less risky than stocks, though the risk level varies depending on the issuer\'s creditworthiness.'
          },
          {
            type: 'text',
            value: 'Government bonds, such as U.S. Treasury securities, are backed by the full faith and credit of the issuing government and are considered among the safest investments. Corporate bonds, issued by companies, generally offer higher yields but come with higher risk.'
          },
          {
            type: 'image',
            src: 'https://via.placeholder.com/600x300',
            alt: 'Bond market illustration',
            caption: 'Bonds trade in various markets with different characteristics and risk profiles'
          }
        ],
        quiz: {
          questions: [
            {
              id: 'q4_1',
              question: 'What is a coupon payment in bond investing?',
              options: [
                'A discount voucher for purchasing more bonds',
                'The regular interest payment made to bondholders',
                'The fee charged by brokers for bond transactions',
                'The principal amount returned at maturity'
              ],
              correctAnswer: 1
            },
            {
              id: 'q4_2',
              question: 'Which type of bonds are generally considered the safest?',
              options: [
                'Corporate bonds',
                'Municipal bonds',
                'Junk bonds',
                'Government treasury bonds'
              ],
              correctAnswer: 3
            },
            {
              id: 'q4_3',
              question: 'What happens to existing bonds when interest rates rise?',
              options: [
                'Their prices typically rise',
                'Their prices typically fall',
                'Their coupon rates automatically adjust upward',
                'They automatically mature earlier'
              ],
              correctAnswer: 1
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
  
  // Direct aanroepen van de kosmische elementen
  useEffect(() => {
    const timer = setTimeout(() => {
      initCosmicElements();
    }, 500);
    return () => clearTimeout(timer);
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
  
  // Ook op de level pagina de kosmische elementen toepassen
  useEffect(() => {
    const timer = setTimeout(() => {
      initCosmicElements();
    }, 500);
    return () => clearTimeout(timer);
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
    if (!localStorage.getItem('tradeLingo_progress')) {
      const initialProgress = {
        completedLessons: [],
        quizScores: {},
        unlockedLevels: ['level1']
      };
      localStorage.setItem('tradeLingo_progress', JSON.stringify(initialProgress));
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
