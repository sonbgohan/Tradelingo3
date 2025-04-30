import React, { useState, useEffect } from 'react';
import './App.css';
import { levels } from './data/levels';

function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [unlockedLevels, setUnlockedLevels] = useState(1); // Always start with first level unlocked
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState('');

  useEffect(() => {
    // Load user progress from localStorage
    const savedUnlockedLevels = localStorage.getItem('unlockedLevels');
    if (savedUnlockedLevels) {
      setUnlockedLevels(parseInt(savedUnlockedLevels, 10));
    }
  }, []);

  const saveProgress = (newUnlockedLevel) => {
    localStorage.setItem('unlockedLevels', newUnlockedLevel.toString());
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setQuizAnswers({});
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionIndex]: answerIndex
    });
  };

  const calculateScore = () => {
    const currentLevel = levels[currentLevelIndex];
    let correctAnswers = 0;
    
    currentLevel.quiz.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / currentLevel.quiz.length) * 100;
    setQuizScore(score);
    return score;
  };

  const handleCompleteQuiz = () => {
    const score = calculateScore();
    setQuizCompleted(true);
    
    // If score >= 80%, unlock next level
    if (score >= 80 && currentLevelIndex + 1 >= unlockedLevels) {
      const newUnlockedLevel = currentLevelIndex + 2; // +2 because we're 0-indexed but display as 1-indexed
      setUnlockedLevels(newUnlockedLevel);
      saveProgress(newUnlockedLevel);
    }
  };

  const handleLevelSelect = (index) => {
    // Only allow selecting unlocked levels
    if (index < unlockedLevels) {
      setCurrentLevelIndex(index);
      setShowQuiz(false);
      setQuizCompleted(false);
      window.scrollTo(0, 0);
    }
  };

  const openImagePopup = (imageSrc) => {
    setPopupImage(imageSrc);
    setShowPopup(true);
  };

  const closeImagePopup = () => {
    setShowPopup(false);
  };

  const renderLevelPath = () => {
    return (
      <div className="level-path-container">
        <div className="level-path">
          {levels.map((level, index) => {
            const isUnlocked = index < unlockedLevels;
            const isCurrent = index === currentLevelIndex;
            return (
              <div 
                key={index}
                className={`level-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
                onClick={() => handleLevelSelect(index)}
              >
                <div className="level-number">{index + 1}</div>
                <div className="level-title">{isUnlocked ? level.title : '???'}</div>
                {index < levels.length - 1 && <div className={`level-connector ${index < unlockedLevels - 1 ? 'unlocked' : 'locked'}`}></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const currentLevel = levels[currentLevelIndex];

  return (
    <div className="app">
      <header className="app-header">
        <h1>TradeLingo: The Future of Trading Education</h1>
        <div className="progress-indicator">
          <div className="progress-text">Progress: {Math.round((unlockedLevels - 1) / levels.length * 100)}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(unlockedLevels - 1) / levels.length * 100}%` }}></div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {renderLevelPath()}

        <div className="level-content">
          <h2 className="level-title">Level {currentLevelIndex + 1}: {currentLevel.title}</h2>
          
          {!showQuiz ? (
            <div className="level-lesson">
              <div className="lesson-content">
                {currentLevel.content.map((item, index) => {
                  if (item.type === 'text') {
                    return <p key={index}>{item.value}</p>;
                  } else if (item.type === 'image') {
                    return (
                      <div key={index} className="lesson-image-container">
                        <img 
                          src={item.value} 
                          alt={item.alt || `Image for ${currentLevel.title}`} 
                          className="lesson-image"
                          onClick={() => openImagePopup(item.value)}
                        />
                        {item.caption && <p className="image-caption">{item.caption}</p>}
                      </div>
                    );
                  } else if (item.type === 'subheading') {
                    return <h3 key={index}>{item.value}</h3>;
                  } else if (item.type === 'list') {
                    return (
                      <ul key={index} className="lesson-list">
                        {item.items.map((listItem, listItemIndex) => (
                          <li key={listItemIndex}>{listItem}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
              <button className="quiz-button" onClick={handleStartQuiz}>Test Your Knowledge</button>
            </div>
          ) : (
            <div className="quiz-container">
              <h3>Quiz: {currentLevel.title}</h3>
              
              {!quizCompleted ? (
                <>
                  {currentLevel.quiz.map((question, qIndex) => (
                    <div key={qIndex} className="quiz-question">
                      <p className="question-text">{question.question}</p>
                      
                      {question.image && (
                        <div className="question-image-container">
                          <img 
                            src={question.image} 
                            alt={`Question ${qIndex + 1}`} 
                            className="question-image"
                            onClick={() => openImagePopup(question.image)}
                          />
                        </div>
                      )}
                      
                      <div className="answer-options">
                        {question.answers.map((answer, aIndex) => (
                          <div 
                            key={aIndex}
                            className={`answer-option ${quizAnswers[qIndex] === aIndex ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(qIndex, aIndex)}
                          >
                            {answer}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    className="submit-quiz-button"
                    disabled={Object.keys(quizAnswers).length !== currentLevel.quiz.length}
                    onClick={handleCompleteQuiz}
                  >
                    Submit Answers
                  </button>
                </>
              ) : (
                <div className="quiz-results">
                  <div className={`score-display ${quizScore >= 80 ? 'passed' : 'failed'}`}>
                    <div className="score-number">{Math.round(quizScore)}%</div>
                    <div className="score-text">
                      {quizScore >= 80 
                        ? `Congratulations! You've mastered this level.${
                            currentLevelIndex + 1 >= unlockedLevels ? ' The next level has been unlocked!' : ''
                          }` 
                        : 'You need to score at least 80% to advance. Try again!'}
                    </div>
                  </div>
                  
                  <div className="quiz-answers-review">
                    <h4>Review Your Answers:</h4>
                    {currentLevel.quiz.map((question, qIndex) => (
                      <div key={qIndex} className="reviewed-question">
                        <p>{question.question}</p>
                        <div className={`reviewed-answer ${
                          quizAnswers[qIndex] === question.correctAnswer ? 'correct' : 'incorrect'
                        }`}>
                          Your answer: {question.answers[quizAnswers[qIndex]]}
                          {quizAnswers[qIndex] !== question.correctAnswer && (
                            <div className="correct-answer">
                              Correct answer: {question.answers[question.correctAnswer]}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="quiz-actions">
                    <button 
                      className="return-button"
                      onClick={() => setShowQuiz(false)}
                    >
                      Return to Lesson
                    </button>
                    <button 
                      className="retry-button"
                      onClick={handleStartQuiz}
                    >
                      Retry Quiz
                    </button>
                    {quizScore >= 80 && currentLevelIndex < levels.length - 1 && (
                      <button 
                        className="next-level-button"
                        onClick={() => {
                          if (currentLevelIndex + 1 < unlockedLevels) {
                            setCurrentLevelIndex(currentLevelIndex + 1);
                            setShowQuiz(false);
                            setQuizCompleted(false);
                            window.scrollTo(0, 0);
                          }
                        }}
                      >
                        Next Level
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <div className="image-popup" onClick={closeImagePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeImagePopup}>×</button>
            <img src={popupImage} alt="Expanded view" className="popup-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
