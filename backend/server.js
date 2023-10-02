/*
File for express.js to handle connections to studybuddy.db
*/

const express = require("express");
const cors = require("cors"); // Cross-domain-requests : e.g. frontend on 3000 and backend 5000 so that they can communicate with each other, because the browser blocks it otherwise
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

//Connect to SQLite database
const db = new sqlite3.Database('studybuddy.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database');
    }
});

// Create flashcards table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS flashcards (
    id INTEGER PRIMARY KEY,
    question TEXT,
    answer TEXT,
    subject TEXT,
    course TEXT,
    image TEXT,
    category TEXT
  )
`);



// Routes
app.get("/", (req, res) => {
    res.send("Hello,  Express");
});

// Route to get all flashcards from the database
app.get("/flashcards", (req, res) => {
    // SQL query
    const query = "SELECT * FROM flashcards";

    // Execute query
    db.all(query, (err, rows) => {
        if (err) {
            console.error("Error fetching flashcards:", err);
        } else {
            res.json(rows);
        }
    });
})

// Route to post a new flashcard into the database
app.post("/flashcards", (req, res) => {
    // Extract data from the request
    const { question, answer, subject, course, image, category } = req.body;

    // SQL query
    const query = "INSERT INTO flashcards (question, answer, subject, course, image, category) VALUES (?, ?, ?, ?, ?, ?)";
    
    // Execute query
    db.run(query, [question, answer, subject, course, image, category], (err) => {
        if (err) {
            return console.error("Error adding flashcard:", err);
        } else {
            res.json({ message: "Flashcard added successfully"})
        }
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });