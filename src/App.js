import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import Menu from "./Meny/Menu";
import Home from "./Home/Home";
import About from "./About/About";
import CreateFlashcard from "./Flashcards/Create/CreateFlashcard";
import FlashcardList from "./Flashcards/List/FlashcardList";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Menu">
          <Menu />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-flashcard" element={<CreateFlashcard />} />
          <Route path="/flashcard-list" element={<FlashcardList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
