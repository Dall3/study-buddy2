/*
File for creating a flashcard and adding to database
*/

import React from "react";
import { useState } from "react";

import "./CreateFlashcard.css";

function CreateFlashcard({ onAddFlashcard }) {
  // State to manage input values
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  // Function to handle adding a flashcard
  const addFlashcard = async () => {
    // Create a new flashcard object
    const newFlashcard = {
      question: question,
      answer: answer,
      subject: subject,
      course: course,
      image: image,
      category: category
    };

    // Send a POST request to the server to add the flashcard
    const response = await fetch("http://localhost:5000/flashcards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFlashcard),
    });

    // Check if the request was successful
    if (response.ok) {
      // Clear the input fields
      setQuestion("");
      setAnswer("");
      setSubject("");
      setCourse("");
      setImage("");
      setCategory("");
    } else {
      // Log an error if the request fails
      console.error("Failed to add flashcard:");
      // Handle the error as needed
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
        ></input>

        <label htmlFor="answer-field">Answer:</label>
        <input
          id="answer-field"
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></input>

        <label htmlFor="subject-field">Subject:</label>
        <input
          id="subject-field"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        ></input>

        <label htmlFor="course-field">Course:</label>
        <input
          id="course-field"
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        ></input>

        <label htmlFor="course-field">Image:</label>
        <input
          id="image-field"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>

        <label htmlFor="course-field">Category:</label>
        <input
          id="category-field"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></input>

        <button type="button" onClick={addFlashcard}>
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateFlashcard;