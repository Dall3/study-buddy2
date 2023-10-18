/*
Localhost:3000/catalog
*/
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Catalog.css";

function Catalog() {
  const [subject, setSubject] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/subjects")
      .then((response) => response.json())
      .then((data) => setSubject(data))
      .catch((error) => console.error("Error fetching subjects:", error));
  }, []);

  const addSubject = async () => {
      const response = await fetch("http://localhost:5000/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newSubject }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Error in Catalog, addSubject");
      }
  };

  const deleteSubject = async (subjectId) => {
        const response = await fetch(`http://localhost:5000/subjects/${subjectId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            // Reload the page to remove the deleted subject and its courses
            window.location.reload();
        } else {
            console.error("Failed to delete subject:", response.status);
        }
  };


return (
  <div className="catalog-container">
    <h2>Subjects</h2>
    <div className="catalog-input-container">
      <label htmlFor="new-subject-field">Create new subject:</label>
      <input
        id="new-subject-field"
        className="catalog-input-field"
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
      />
      <button className="catalog-create-button" type="button" onClick={addSubject}>
        Create
      </button>
    </div>
    <h2>Created Subjects</h2>
    <ul className="catalog-list">
      {subject.map((subject) => (
        <li key={subject.id} className="catalog-list-item">
          {subject.name}
          <div>
            <button onClick={() => navigate(`/subject/${subject.id}`)}>Select</button>
            <button onClick={() => deleteSubject(subject.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default Catalog;
