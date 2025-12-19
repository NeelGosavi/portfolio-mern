// src/components/Navbar.jsx
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Neel Gosavi</h2>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a
              href="/Neel_Gosavi_Resume.pdf"
              download
            >
              Resume
            </a>
         </li>
      </ul>
    </nav>
  );
}

export default Navbar;
