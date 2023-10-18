import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Catalog/Catalog.css";

function StudyLandingPage() {
  const [courses, setCourses] = useState([]);

  // Fetch the list of available courses for the quiz
  useEffect(() => {
    // Replace this fetch call with your actual API endpoint
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
      <h2>Select a Course to Study:</h2>
      <ul className="catalog-list">
        {courses.map((course) => (
          <li key={course.id} className="catalog-list-item">
            <Link to={`/study/${course.id}`} className="catalog-link">
              Start Studying {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyLandingPage;
