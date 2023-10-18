/*
File for handling everything with the subject table
*/

const express = require("express");
const db = require("../db");
const router = express.Router();

// Create table for subjects
db.run(`
  CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY,
    name TEXT
  )
`);


// Route to get a subject by ID
router.get("/subjects/:id", (req, res) => {
  const subjectID = req.params.id;

  const query = "SELECT * FROM subjects WHERE id = ?";

  db.all(query, [subjectID], (err, rows) => {
    if(err) {
      console.error("Error fetching subject by ID:", err);
    } else {
      res.json(rows);
    }
  })
})

// Route to get subjects
router.get("/subjects", (req, res) => {
  const query = "SELECT * FROM subjects";

  db.all(query, (err, rows) => {
    if(err) {
      console.error("Error fetching all subjects", err);
    } else {
      res.json(rows);
    }
  })
})


// Route to add a new subject
router.post("/subjects", (req, res) => {
  const { name } = req.body;

  const query = "INSERT INTO subjects (name) VALUES (?)";

  db.run(query, [name], (err) => {
      if (err) {
          return console.error("Error adding subject", err);
      } else {
          res.json({ message: "Subject added successfully" });
      }
  });
});


// Route to delete a subject by ID
router.delete("/subjects/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM subjects WHERE id = ?";

  db.run(query, id, (err) => {
    if (err) {
      console.error("Error deleting subject:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send("Subject deleted successfully");
    }
  });
});

// Route to delete a subject and associated courses
router.delete("/subjects/:id", (req, res) => {
  const subjectId = req.params.id;

  const deleteSubjectQuery = "DELETE FROM subjects WHERE id = ?";
  const deleteCoursesQuery = "DELETE FROM courses WHERE subject_id = ?";

  db.run(deleteCoursesQuery, [subjectId], (err) => {
    if (err) {
      console.error("Error deleting courses:", err);
      res.status(500).send("Internal Server Error");
    } else {
      db.run(deleteSubjectQuery, [subjectId], (err) => {
        if (err) {
          console.error("Error deleting subject:", err);
          res.status(500).send("Internal Server Error");
        } else {
          res.status(204).send(); // Send a success response
        }
      });
    }
  });
});

module.exports = router;
