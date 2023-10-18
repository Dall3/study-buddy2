/*
Localhost:3000/Subject/:subjectId/courses/:courseId
*/
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Flashcard.css";
import "./Catalog.css";

function CourseLandingPage() {
  const { subjectId, courseId, courseName } = useParams();
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    // Fetch flashcards for the current course based on subjectId and courseId
    fetch(`http://localhost:5000/flashcards?subjectId=${subjectId}&courseId=${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched flashcards:", data); 
        setFlashcards(data);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, [subjectId, courseId]);

  const deleteFlashcard = async (id) => {
      const response = await fetch(`http://localhost:5000/flashcards/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update UI after deleting a flashcard without making new server fetch
        setFlashcards((prevFlashcards) =>
          prevFlashcards.filter((flashcard) => flashcard.id !== id)
        );
      } else {
        console.error("Failed to delete flashcard:", response.status);
      }
  };

  return (
    <div className="catalog-container">
      <h2>Course: {courseName}</h2>
      <Link to={`/subject/${subjectId}/courses/${courseId}/create-flashcard`}>
        <button className="catalog-create-button">Create Flashcard</button>
      </Link>
      <h2>Flashcards in Course:</h2>
      <ul className="catalog-list">
        {flashcards.map((flashcard) => (
          <li key={flashcard.id} className="catalog-list-item">
            <div className="flashcard">
              <p>Question: {flashcard.question}</p>
              <p>Answer: {flashcard.answer}</p>
              <img
                src={flashcard.image}
                alt="Flashcard"
                className="small-image" 
              />
              <div className="flashcard-buttons">
                <Link to={`/subject/${subjectId}/courses/${courseId}/${courseName}/edit/${flashcard.id}`}>
                  <button className="catalog-select-button">Edit</button>
                </Link>
                <button className="catalog-delete-button" onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseLandingPage;
