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

// Level page component
const LevelPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(getUserProgress());
  const [showPopup, setShowPopup] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  // Effect voor het toepassen van kosmische elementen
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      initCosmicElements();
    }, 300);
    
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
