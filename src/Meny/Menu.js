import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";

function Menu() {
  return (
    <ul className="menu">
      <li><Link to="/">| Home |</Link></li>
      <li><Link to="/about">About |</Link></li>
      <li><Link to="/create-flashcard">Create Flashcard |</Link></li>
      <li><Link to="/flashcard-list">All Flashcards |</Link></li>
      <li><Link to="#">Quiz Mode |</Link></li>
      <li><Link to="#">Study Mode |</Link></li>
    </ul>
  );
}

export default Menu;