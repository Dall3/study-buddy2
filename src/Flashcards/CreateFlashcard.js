import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CreateFlashcard() {
  const { subjectId, courseId } = useParams();
  const navigate = useNavigate();
  const [subjectName, setSubjectName] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [image, setImage] = useState("");

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setImage(data.imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  const addFlashcard = async () => {
    const newFlashcard = {
      question,
      answer,
      image,
      subjectId,
      courseId,
    };

    try {
      const response = await fetch("http://localhost:5000/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });

      if (response.ok) {
        // Clear the input fields
        setQuestion("");
        setAnswer("");
        setImage("");

        navigate(`/subject/${subjectId}/courses/${courseId}/${subjectName}`);
      } else {
        alert("Failed to add flashcard. Please try again.");
      }
    } catch (error) {
      console.error("Error adding flashcard:", error);
      alert("An error occurred while adding the flashcard. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create Flashcard</h2>
      <form>
        <label htmlFor="question-field">Question:</label>
        <input
          id="question-field"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <label htmlFor="answer-field">Answer:</label>
        <input
          id="answer-field"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <label htmlFor="image-field">Image:</label>
        <input
          id="image-field"
          type="file"
          onChange={handleImageUpload}
        />

        <button type="button" onClick={addFlashcard}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateFlashcard;
