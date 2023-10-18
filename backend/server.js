/*
Main file for express.js to start the backend
*/

const express = require("express");
const cors = require("cors"); // Cross-domain-requests : e.g. frontend on 3000 and backend 5000 so that they can communicate with each other, because the browser blocks it otherwise
const db = require("./db");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

/*
db.exec(`
  DROP TABLE IF EXISTS subjects;
  DROP TABLE IF EXISTS courses;
  DROP TABLE IF EXISTS flashcards;
`, (err) => {
  if (err) {
    console.error("Error dropping tables:", err);
  } else {
    console.log("Tables dropped successfully");
  }
});
*/

// Subject router
const subjectsRouter = require("./Routes/subjectRoutes");
app.use("/", subjectsRouter);

// Flashcards router
const flashcardsRouter = require("./Routes/flashcardsRoute");
app.use("/", flashcardsRouter);

// Course router
const coursesRouter = require("./Routes/courseRoutes");
app.use("/", coursesRouter);  

// Multer's disk storage engine
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads/'),

  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage: storage }).single('image');

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).send({ error: err.message });
    } else {
      if (req.file === undefined) {
        res.status(400).send({ error: 'No file selected' });
      } else {
        res.send({ imageUrl: `/uploads/${req.file.filename}` });
      }
    }
  });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });