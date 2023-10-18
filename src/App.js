import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import "./global.css";

import Home from "./Home/Home";
import About from "./About/About";
import CreateFlashcard from "./Flashcards/CreateFlashcard";
import EditFlashcard from "./Flashcards/EditFlashcard";
import CatalogPage from "./Catalog/Catalog";
import CourseLandingPage from "./Catalog/CoursePage";
import SubjectLandingPage from "./Catalog/SubjectPage";
import QuizLandingPage from './Quiz/QuizPage';
import Quiz from "./Quiz/Quiz";
import StudyLandingPage from "./Quiz/StudyPage";
import Studymode from "./Quiz/Studymode";
import Registration from "./firestore/Registration";
import Login from "./firestore/Login";
import Profile from "./firestore/Profile";
import Layout from './Meny/Layout'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/home" element={<Layout> <Home /> </Layout>} />
          <Route path="/about" element={<Layout> <About /> </Layout>} />
          <Route
            path="/subject/:subjectId/courses/:courseId/create-flashcard"
            element={<Layout> <CreateFlashcard /> </Layout>}
          />
          <Route path="subject/:subjectId/courses/:courseId/:courseName/edit/:flashcardId" element={<Layout> <EditFlashcard /> </Layout>} />
          <Route path="/catalog" element={<Layout> <CatalogPage /> </Layout>} />
          <Route
            path="/subject/:subjectId"
            element={<Layout> <SubjectLandingPage /> </Layout>}
          />
          <Route
            path="/subject/:subjectId/courses/:courseId/:courseName"
            element={<Layout> <CourseLandingPage /> </Layout>}
          />
          <Route path="/quiz" element={<Layout> <QuizLandingPage /> </Layout>} />
          <Route path="/quiz/:courseId" element={<Layout> <Quiz /> </Layout>} />
          <Route path="/study" element={<Layout> <StudyLandingPage /> </Layout>} />
          <Route path="/study/:courseId" element={<Layout> <Studymode /> </Layout>} />
          <Route path="/profile" element={<Layout> <Profile /> </Layout>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
