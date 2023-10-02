// FlashcardList.js

import React, { useState, useEffect } from "react";
import "./FlashcardList.css";

function FlashcardList() {
    const [flashcards, setFlashcards] = useState([]);
  
    useEffect(() => {
      // Fetch flashcards from the server when the component mounts
      fetch("http://localhost:5000/flashcards")
        .then((response) => response.json())
        .then((data) => setFlashcards(data))
        .catch((error) => console.error("Error fetching flashcards:", error));
    }, []); // Empty dependency array means this effect runs once when the component mounts
  
    return (
        <div className="flashcard-list">
          <h2>Flashcard List</h2>
          <ul>
            {flashcards.map((flashcard) => (
              <li key={flashcard.id}>
                <strong>Question:</strong> {flashcard.question} | <strong>Answer:</strong> {flashcard.answer} | 
                <strong>Subject:</strong> {flashcard.subject} | <strong>Course:</strong> {flashcard.course} | 
                <strong>Category:</strong> {flashcard.category} | 
              </li>
            ))}
          </ul>
        </div>
      );
    }
  
  export default FlashcardList;


