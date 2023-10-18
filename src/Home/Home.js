import React from "react";
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header>
        <h1>Welcome to Study Buddy</h1>
        <p>Your go-to platform for effective learning!</p>
      </header>

      <section className="features">
        <div className="feature">
          <img src="Flashcard2.JPG" alt="Flashcards" />
          <h2>Flashcards</h2>
          <p>Create your own flashcards.</p>
        </div>
        <div className="feature">
          <img src="quiz.jpg" alt="Quiz" />
          <h2>Quiz Mode</h2>
          <p>Test your knowledge with quizzes.</p>
        </div>
        <div className="feature">
          <img src="study.JPG" alt="Flashcards" />
          <h2>Study Mode</h2>
          <p>Study with your Flashcards.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;