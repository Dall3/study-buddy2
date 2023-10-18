/*
Localhost:3000/Subject/:subjectId
*/
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";


function SubjectLandingPage() {
  const { subjectId } = useParams();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
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
    fetch(`http://localhost:5000/subjects/${subjectId}/courses`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, [subjectId]);

  const addCourse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/subjects/${subjectId}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCourse }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Failed to add course:", response.status);
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
        const response = await fetch(`http://localhost:5000/courses/${courseId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // Reload the page to remove the deleted course
            window.location.reload();
        } else {
            console.error("Failed to delete course:", response.status);
        }
    } catch (error) {
        console.error("Error deleting course:", error);
    }
}

return (
  <div className="catalog-container">
    <h2>Subject: {subjectName}</h2>
    <div className="catalog-input-container">
      <label htmlFor="new-course-field">New Course:</label>
      <input
        id="new-course-field"
        type="text"
        value={newCourse}
        onChange={(e) => setNewCourse(e.target.value)}
        className="catalog-input-field"
      />
      <button type="button" onClick={addCourse} className="catalog-create-button">
        Add Course
      </button>
    </div>
    <h2 className="catalog-subtitle">Courses:</h2>
    <ul className="catalog-list">
      {courses.map((course) => (
        <li key={course.id} className="catalog-list-item">
          {course.name}
          <div className="catalog-buttons">
            <Link to={`/subject/${subjectId}/courses/${course.id}/${course.name}`} className="catalog-link">
              <button className="catalog-view-button">View</button>
            </Link>
            <button onClick={() => deleteCourse(course.id)} className="catalog-delete-button">Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default SubjectLandingPage;


/* 
{courses.map((course) => (
        <li key={course.id}>
            {course.name}
            <Link to={`/subject/${subjectId}/flashcards/create`}>
            <button>Create Flashcard</button>
          </Link>
            <button onClick={() => deleteCourse(course.id)}>Delete</button>
        </li>
        ))}
*/