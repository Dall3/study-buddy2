import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Catalog/Catalog.css";

const QuizLandingPage = () => {
  const [courses, setCourses] = useState([]);

  // Fetch the list of available courses for the quiz
  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  return (
    <div className="catalog-container">
      <h2>Course Selection</h2>
      <ul className="catalog-list">
        {courses.map((course) => (
          <li key={course.id} className="catalog-list-item">
            <Link to={`/quiz/${course.id}`} className="catalog-link">
              Start Quiz for {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizLandingPage;
