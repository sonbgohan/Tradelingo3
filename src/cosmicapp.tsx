import { useState, useEffect } from 'react';

const App = () => {
  const [stars, setStars] = useState([]);
  const [particles, setParticles] = useState([]);
  
  // Generate stars for background
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 100; i++) {
      const size = Math.random() < 0.5 ? 'small' : Math.random() < 0.5 ? 'medium' : 'large';
      const twinkle = Math.random() < 0.7;
      const speed = Math.random() < 0.3 ? 'slow' : Math.random() < 0.7 ? '' : 'fast';
      
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        twinkle,
        speed
      });
    }
    setStars(newStars);
    
    // Generate floating particles
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      const size = 20 + Math.random() * 60;
      const speed = Math.random() < 0.3 ? 'float-slow' : Math.random() < 0.7 ? 'float' : 'float-fast';
      
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        speed
      });
    }
    setParticles(newParticles);
  }, []);
  
  // Calculate rocket position
  const [rocketPos, setRocketPos] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setRocketPos(prev => (prev >= 100 ? 0 : prev + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Demo levels data
  const levels = [
    {
      id: 1,
      title: "Trading Basics",
      progress: 75,
      unlocked: true,
      lessons: 10,
      completedLessons: 7,
      x: 25,
      y: 30
    },
    {
      id: 2,
      title: "Advanced Strategies",
      progress: 20,
      unlocked: true,
      lessons: 8,
      completedLessons: 2,
      x: 70,
      y: 60
    }
  ];

  return (
    <div className="app">
      {/* Stars background */}
      <div className="stars">
        {stars.map(star => (
          <div 
            key={star.id}
            className={`star ${star.size} ${star.twinkle ? `twinkle ${star.speed}` : ''}`}
            style={{ left: `${star.x}%`, top: `${star.y}%` }}
          />
        ))}
      </div>
      
      {/* Floating particles */}
      <div className="particles">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className={`particle ${particle.speed}`}
            style={{ 
              left: `${particle.x}%`, 
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>
      
      <div className="home-container">
        <header>
          <h1 className="app-logo">TRADELINGO</h1>
          <p>Master trading in a cosmic journey through space</p>
        </header>
        
        <div className="world-map">
          {/* Level paths */}
          <svg className="level-paths" viewBox="0 0 100 100">
            <path 
              d="M30,35 Q50,45 65,55" 
              className="level-path"
            />
            
            {/* Animated rocket */}
            <g 
              transform={`translate(${getPointOnPath(rocketPos, 30, 35, 65, 55).x}, ${getPointOnPath(rocketPos, 30, 35, 65, 55).y}) rotate(${getPointOnPath(rocketPos, 30, 35, 65, 55).angle})`}
              style={{ transformOrigin: 'center' }}
            >
              <path 
                d="M-8,0 L0,-12 L8,0 L0,6 Z" 
                fill="#6ee7b7" 
                filter="drop-shadow(0 0 5px rgba(110, 231, 183, 0.8))"
              />
              <path 
                d="M-5,3 L-7,10 L0,6 L7,10 L5,3 Z" 
                fill="#ef4444" 
                filter="drop-shadow(0 0 3px rgba(239, 68, 68, 0.8))"
              />
              <path 
                d="M-7,10 L-5,15 L0,7 L5,15 L7,10 Z" 
                fill="#f59e0b" 
                filter="drop-shadow(0 0 8px rgba(245, 158, 11, 0.9))"
              />
            </g>
          </svg>
          
          {/* Planet levels */}
          {levels.map(level => (
            <div 
              key={level.id}
              className={`level-node ${level.unlocked ? 'unlocked' : 'locked'}`}
              style={{ 
                left: `${level.x}%`, 
                top: `${level.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <PlanetLevel 
                title={level.title}
                progress={level.progress}
                completed={level.completedLessons}
                total={level.lessons}
              />
              
              {!level.unlocked && (
                <div className="lock-overlay">
                  <i className="fas fa-lock"></i>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Calculate position along a quadratic bezier path
function getPointOnPath(percent, x1, y1, x2, y2) {
  const t = percent / 100;
  
  // Control point (adjust for curve shape)
  const cpX = (x1 + x2) / 2;
  const cpY = (y1 + y2) / 2 + 10;
  
  // Quadratic bezier formula
  const x = Math.pow(1-t, 2) * x1 + 2 * (1-t) * t * cpX + Math.pow(t, 2) * x2;
  const y = Math.pow(1-t, 2) * y1 + 2 * (1-t) * t * cpY + Math.pow(t, 2) * y2;
  
  // Calculate angle for rocket rotation
  // Tangent to the curve: the derivative of the curve equation
  const dx = 2 * (1-t) * (cpX - x1) + 2 * t * (x2 - cpX);
  const dy = 2 * (1-t) * (cpY - y1) + 2 * t * (y2 - cpY);
  const angle = Math.atan2(dy, dx) * 180 / Math.PI;
  
  return { x, y, angle };
}

// Planet Level Component
const PlanetLevel = ({ title, progress, completed, total }) => {
  // Generate random craters and features for planet
  const [features, setFeatures] = useState([]);
  
  useEffect(() => {
    const newFeatures = [];
    for (let i = 0; i < 8; i++) {
      newFeatures.push({
        id: i,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 3 + Math.random() * 12,
        opacity: 0.1 + Math.random() * 0.3
      });
    }
    setFeatures(newFeatures);
  }, []);

  return (
    <div className="planet-level">
      <div className="planet-container">
        <div className="planet" style={{
          background: `radial-gradient(circle at 30% 30%, 
            rgba(110, 231, 183, 0.8) 0%, 
            rgba(14, 116, 144, 0.6) 70%, 
            rgba(15, 23, 42, 0.9) 100%)`
        }}>
          {/* Planet features */}
          {features.map(feature => (
            <div 
              key={feature.id} 
              className="feature"
              style={{
                left: `${feature.x}%`,
                top: `${feature.y}%`,
                width: `${feature.size}px`,
                height: `${feature.size}px`,
                opacity: feature.opacity,
                borderRadius: '50%',
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.2)'
              }}
            />
          ))}
          
          {/* Progress indicator in planet center */}
          <div className="planet-progress">
            <div className="progress-text">{progress}%</div>
          </div>
        </div>
        
        {/* Planet glow */}
        <div className="planet-glow"></div>
      </div>
      
      <div className="planet-info">
        <h3>{title}</h3>
        <p>{completed}/{total} lessons completed</p>
      </div>
    </div>
  );
};

export default function() {
  return (
    <>
      <style>{`
        /* Space theme styling */
        :root {
          --primary-color: #6ee7b7;
          --dark-bg: #0a0d20;
          --card-bg: #141b33;
          --text-light: #e2e8f0;
          --text-secondary: #94a3b8;
          --success-color: #10b981;
          --locked-color: #64748b;
          --path-color: #34d399;
        }
        
        .app {
          width: 100%;
          min-height: 100vh;
          position: relative;
          background: linear-gradient(125deg, #0f172a 0%, #020617 100%);
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          color: var(--text-light);
        }
        
        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(76, 29, 149, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.15) 0%, transparent 40%);
          z-index: 0;
        }
        
        /* Stars animation */
        @keyframes twinkle {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        .stars {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: #fff;
          border-radius: 50%;
        }
        
        .star.small {
          width: 1px;
          height: 1px;
        }
        
        .star.medium {
          width: 2px;
          height: 2px;
        }
        
        .star.large {
          width: 3px;
          height: 3px;
          box-shadow: 0 0 4px 1px rgba(255, 255, 255, 0.7);
        }
        
        .star.twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }
        
        .star.slow {
          animation-duration: 5s;
        }
        
        .star.fast {
          animation-duration: 2s;
        }
        
        /* Floating particles */
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .particle {
          position: absolute;
          opacity: 0.2;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(110, 231, 183, 0.8) 0%, transparent 70%);
        }
        
        .particle.float {
          animation: float 15s infinite ease-in-out;
        }
        
        .particle.float-slow {
          animation-duration: 25s;
        }
        
        .particle.float-fast {
          animation-duration: 10s;
        }
        
        /* Futuristic TradeLingo Logo */
        .app-logo {
          font-size: 3.5rem;
          font-weight: 900;
          letter-spacing: 4px;
          margin-bottom: 10px;
          text-shadow: 0 0 10px rgba(110, 231, 183, 0.5),
                      0 0 20px rgba(110, 231, 183, 0.3);
          color: transparent;
          background: linear-gradient(135deg, #6ee7b7 0%, #14b8a6 50%, #0ea5e9 100%);
          background-clip: text;
          -webkit-background-clip: text;
          position: relative;
          font-family: 'Segoe UI', 'Roboto', sans-serif;
          text-transform: uppercase;
        }
        
        /* Add a glow effect around text */
        .app-logo::after {
          content: 'TRADELINGO';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          color: rgba(110, 231, 183, 0.1);
          filter: blur(8px);
        }
        
        header p {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }
        
        /* World map styles */
        .world-map {
          position: relative;
          height: 500px;
          margin: 0 auto;
          max-width: 800px;
        }
        
        /* Level paths */
        .level-paths {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .level-path {
          stroke: var(--path-color);
          stroke-width: 4;
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 8;
          filter: drop-shadow(0 0 4px rgba(52, 211, 153, 0.5));
          animation: dash 30s linear infinite;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        
        /* Planet level styling */
        .level-node {
          position: absolute;
          width: 250px;
          background-color: transparent;
          border-radius: 12px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
          z-index: 2;
        }
        
        .level-node.unlocked:hover {
          transform: translate(-50%, -50%) scale(1.05);
        }
        
        .level-node.locked {
          opacity: 0.7;
          filter: grayscale(70%);
          cursor: not-allowed;
        }
        
        .planet-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin-bottom: 15px;
        }
        
        .planet {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5),
                    0 0 30px rgba(110, 231, 183, 0.6);
          animation: rotate 30s linear infinite;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .planet-progress {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(110, 231, 183, 0.8);
          box-shadow: 0 0 10px rgba(110, 231, 183, 0.5);
        }
        
        .progress-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .planet-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          background: transparent;
          box-shadow: 0 0 40px rgba(110, 231, 183, 0.4);
          z-index: -1;
        }
        
        .planet-info {
          text-align: center;
        }
        
        .planet-info h3 {
          margin: 0;
          margin-bottom: 5px;
          color: var(--text-light);
          font-size: 1.1rem;
        }
        
        .planet-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        
        .lock-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        
        .lock-overlay i {
          font-size: 40px;
          color: var(--locked-color);
          opacity: 0.8;
          filter: drop-shadow(0 0 5px rgba(100, 116, 139, 0.5));
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .world-map {
            height: 700px;
          }
          
          .level-node {
            width: 200px;
          }
          
          .planet-container {
            width: 100px;
            height: 100px;
          }
          
          .app-logo {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
        }
      `}</style>
      <App />
    </>
  );
}
