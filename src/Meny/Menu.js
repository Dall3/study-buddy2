import React from 'react';
import { Link } from 'react-router-dom';
import "./Menu.css";


function Menu() {

  return (
    <ul className="menu">
      <li><Link to="/home">| Home |</Link></li>
      <li><Link to="/catalog">Create Subject |</Link></li>
      <li><Link to="/quiz">Quiz Mode |</Link></li>
      <li><Link to="/study">Study Mode |</Link></li>
      <li><Link to="/profile">Profile |</Link></li>
      <li><Link to="/">Log out |</Link></li>
    </ul>
  );
}

export default Menu;