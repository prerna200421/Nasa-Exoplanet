import { NavLink } from "react-router-dom";
import "../pages/styles/AppNavBar.css"; // Make sure you create this file for styles

const links = [
  {
    value: "Home",
    link: "/"
  },
  {
    value: "Quiz",
    link: "/quiz/start"
  },
  {
    value: "Storytelling",
    link: "/storytelling"
  },
  {
    value: "Game",
    link: "/game"
  },
  {
    value: "Draw",
    link: "/draw"
  },
  {
    value: "Resources",
    link: "/resources"
  }
];

export default function AppNavbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        { links.map((val, i) => <NavLink key= {i} 
          className={({ isActive }) => (isActive ? "active" : "")}
          to= {val.link} >{val.value} </NavLink>) }
      </ul>
    </nav>
  );
}
