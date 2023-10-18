import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./StudyMode.css";
import "../Catalog/Flashcard.css";

function StudyMode() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { courseId } = useParams();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    // Fetch flashcards for the selected courseId
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

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  if (!flashcards || flashcards.length === 0) {
    return <div className="study-mode">No flashcards available.</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="study-mode">
      {flashcards.length === 0 ? (
        <div>No flashcards available.</div>
      ) : (
        <>
          <div className="flashcard" onClick={handleNext}>
            <div className="flashcard-content">
              <p className="question">{currentCard.question}</p>
              <p className="answer">{currentCard.answer}</p>
            </div>
          </div>
          <div className="study-mode-controls">
            <button onClick={handlePrev} disabled={currentCardIndex === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentCardIndex === flashcards.length - 1}>
              Next
            </button>
            {currentCardIndex === flashcards.length - 1 && (
              <div>
                <p>All flashcards have been cycled through.</p>
                <Link to="/study">
                  <button>Back to Study Landing Page</button>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default StudyMode;
