const express = require("express");
const db = require("../db");
const router = express.Router();

// Create table for flashcards
db.run(`
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY,
    question TEXT,
    answer TEXT,
    image TEXT,
    subject_id INTEGER,
    course_id INTEGER,
    FOREIGN KEY (subject_id) REFERENCES subjects(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  )
`);

// Route to get flashcards by subjectId and courseId
router.get("/flashcards", (req, res, next) => {
  try {
    const { subjectId, courseId } = req.query;

    let query;
    let params;

    if (subjectId && courseId) {
      // Fetch flashcards with both subjectId and courseId
      query = "SELECT * FROM flashcards WHERE subject_id = ? AND course_id = ?";
      params = [subjectId, courseId];
    } else if (subjectId) {
      // Fetch flashcards with only subjectId
      query = "SELECT * FROM flashcards WHERE subject_id = ?";
      params = [subjectId];
    } else if (courseId) {
      // Fetch flashcards with only courseId
      query = "SELECT * FROM flashcards WHERE course_id = ?";
      params = [courseId];
    } else {
      // If no subjectId or courseId provided, return all flashcards
      query = "SELECT * FROM flashcards";
      params = [];
    }

    db.all(query, params, (err, flashcards) => {
      if (err) {
        console.error("Error fetching flashcards:", err);
        next(err);
      } else {
        res.json(flashcards);
      }
    });
  } catch (error) {
    next(error);
  }
});

// Route to post a new flashcard into the database
router.post("/flashcards", (req, res, next) => {
  const { question, answer, image, subjectId, courseId } = req.body;

  try {
    const query =
      "INSERT INTO flashcards (question, answer, image, subject_id, course_id) VALUES (?, ?, ?, ?, ?)";
    db.run(
      query,
      [question, answer, image, subjectId, courseId],
      function (err) {
        if (err) {
          console.error("Error adding flashcard:", err);
          res.status(500).json({ error: "Error in flashcardsRoute, post." });
        } else {
          res.status(200).json({ message: "Flashcard added successfully" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

router.delete("/flashcards/:id", (req, res, next) => {
  const id = req.params.id;

  try {
    db.run("DELETE FROM flashcards WHERE id = ?", id, (err) => {
      if (err) {
        console.error("Error deleting flashcard:", err);
        res.status(500).json({ error: "Error in flashcardsRoute delete." });
      } else {
        res.status(200).json({ message: "Flashcard deleted successfully" });
      }
    });
  } catch (error) {
    next(error);
  }
});

router.put("/flashcards/:id", (req, res, next) => {
  const id = req.params.id;
  const { question, answer, image, subject_id, course_id } = req.body;

  try {
    const query =
      "UPDATE flashcards SET question=?, answer=?, image=?, subject_id=?, course_id=? WHERE id=?";
    db.run(
      query,
      [question, answer, image, subject_id, course_id, id],
      (err) => {
        if (err) {
          console.error("Error updating flashcard:", err);
          res.status(500).json({ error: "Error in flashcardsRoute." });
        } else {
          res.status(200).json({ message: "Flashcard updated successfully" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
