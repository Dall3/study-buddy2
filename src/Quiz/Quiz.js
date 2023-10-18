import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../Catalog/Catalog.css";

function Quiz() {
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch(`http://localhost:5000/flashcards?courseId=${courseId}`);
        if (response.ok) {
          const flashcardsData = await response.json();
          setFlashcards(flashcardsData);
        } else {
          console.error("Failed to fetch flashcards:", response.status);
        }
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [courseId]);

  const currentFlashcard = flashcards[currentFlashcardIndex];

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex + 1 < flashcards.length) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setUserAnswer('');
      setIsAnswerCorrect(null);
    } else {
      // Quiz completed
      setQuizCompleted(true);
    }
  };

  const checkAnswer = () => {
    if (currentFlashcard && userAnswer.toLowerCase() === currentFlashcard.answer.toLowerCase()) {
      setIsAnswerCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsAnswerCorrect(false);
      setIncorrectAnswers(incorrectAnswers + 1);
    }
  };

  return (
    <div className="catalog-container">
      {currentFlashcard && !quizCompleted && (
        <div>
          <h2>Question:</h2>
          <p>{currentFlashcard.question}</p>
          <input
            type="text"
            placeholder="Your Answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="catalog-input-field" 
          />
          <button onClick={checkAnswer} className="catalog-create-button"> 
            Check Answer
          </button>
          {(isAnswerCorrect === true) && (
            <div>
              <p>Correct</p>
              <button onClick={handleNextFlashcard} className="catalog-create-button"> 
                Next Question
              </button>
            </div>
          )}
          {(isAnswerCorrect === false) && (
            <div>
              <p>Wrong Answer</p>
              <p>Correct Answer: {currentFlashcard.answer}</p>
              <button onClick={handleNextFlashcard} className="catalog-create-button">
                Next Question
              </button>
            </div>
          )}
        </div>
      )}
      {quizCompleted && (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Incorrect Answers: {incorrectAnswers}</p>
          <Link to={`/quiz`}>
                  <button className="catalog-select-button">Back to quiz</button>
                </Link>
        </div>
      )}
    </div>
  );
}

export default Quiz;
