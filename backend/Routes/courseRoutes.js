const express = require("express");
const db = require("../db");
const router = express.Router();

// Create table for courses
db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    subject_id INTEGER,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
  )
`);

router.get("/courses", (req, res) => {
  const query = "SELECT * FROM courses";

  db.all(query, (err, rows) => {
    if (err) {
      console.error("Error fetching all courses:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

// Route to get all courses
router.get("/subjects/:subjectId/courses", (req, res) => {
  const subjectId = req.params.subjectId;

  // SQL query to fetch courses of a specific subject
  const query = "SELECT * FROM courses WHERE subject_id = ?";

  // Execute query
  db.all(query, [subjectId], (err, rows) => {
    if (err) {
      console.error("Error fetching courses:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

// Route to add a new course
router.post("/subjects/:subjectId/courses", (req, res) => {
  const subjectId = req.params.subjectId;
  const { name } = req.body;

  // SQL query to add a course under a specific subject
  const query = "INSERT INTO courses (name, subject_id) VALUES (?, ?)";

  // Execute query
  db.run(query, [name, subjectId], (err) => {
    if (err) {
      console.error("Error adding course:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json({ message: "Course added successfully" });
    }
  });
});

// DELETE route to delete a course by its ID
router.delete("/courses/:id", async (req, res, next) => {
  const courseId = req.params.id;
  try {
      // Delete the course with the specified ID
      await db.run("DELETE FROM courses WHERE id = ?", courseId);

      res.send("Course deleted successfully");
  } catch (error) {
      next(error);
  }
});


// Route to update a course
router.put("/courses/:id", (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  // Your logic to update the course with the given ID in the database
  db.run(
    "UPDATE courses SET name=? WHERE id=?",
    [name, id],
    (err) => {
      if (err) {
        console.error("Error updating course:", err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send("Course updated successfully");
      }
    }
  );
});


// Route to fetch flashcards by course ID
router.get("/courses/:courseId/flashcards", (req, res) => {
  const courseId = req.params.courseId;

  // Fetch flashcards associated with the courseId from the database
  db.all("SELECT * FROM flashcards WHERE course_id = ?", [courseId], (err, rows) => {
    if (err) {
      console.error("Error fetching flashcards:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
