import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./Editflash.css";

function EditFlashcard() {
  const { flashcardId } = useParams();
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const navigate = useNavigate();
  const { subjectId, courseId } = useParams();
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/subjects/${subjectId}`)
      .then((response) => response.json())
      .then((data) => {
        // Extract the subject name from the array
        const subject = data[0];
        if (subject) {
          console.log("Fetched subject name:", subject.name);
          setSubjectName(subject.name);
        } else {
          console.error("Subject not found for ID:", subjectId);
        }
      })
      .catch((error) => {
        console.error("Error fetching subject name:", error);
      });
  }, [subjectId]);

  useEffect(() => {
    // Fetch the flashcard data for the specified flashcardId
    const fetchFlashcard = async () => {
      try {
        const response = await fetch(`http://localhost:5000/flashcards/${flashcardId}`);
        if (response.ok) {
          const flashcardData = await response.json();
          setEditedQuestion(flashcardData.question);
          setEditedAnswer(flashcardData.answer);
        } else {
          console.error(`Failed to fetch flashcard with ID ${flashcardId}`);
        }
      } catch (error) {
        console.error(`Error fetching flashcard with ID ${flashcardId}:`, error);
      }
    };

    fetchFlashcard();
  }, [flashcardId]);

    // Function to handle save action
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5000/flashcards/${flashcardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: editedQuestion,
          answer: editedAnswer,
          course_id: courseId,
          subject_id: subjectId,
        }),
      });

      if (response.ok) {
        navigate(`/subject/${subjectId}/courses/${courseId}/${subjectName}`);
        // Flashcard updated successfully
        console.log("Edited"); 
      } else {
        console.error(`Failed to update flashcard with ID ${flashcardId}`);
      }
    } catch (error) {
      console.error(`Error updating flashcard with ID ${flashcardId}:`, error);
    }
  };

  return (
    <div className="edit-flashcard">
      <h2>Edit flashcard</h2>
      <form>
        <label htmlFor="edited-question-field">Question:</label>
        <input
          id="edited-question-field"
          type="text"
          value={editedQuestion}
          onChange={(e) => setEditedQuestion(e.target.value)}
        />

        <label htmlFor="edited-answer-field">Answer:</label>
        <input
          id="edited-answer-field"
          type="text"
          value={editedAnswer}
          onChange={(e) => setEditedAnswer(e.target.value)}
        />

        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditFlashcard;
