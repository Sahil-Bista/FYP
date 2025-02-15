import React from "react";
import logo from "./assets/logo.png";
import "../styles/header.css";

function Header() {
  return (
    <div className="header-div">
      <img src={logo} alt="logo" className="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a href="#" className="home-link">
              HOME
            </a>
          </li>
          <li className="list-item">
            <a href="/futsal" className="link-item">
              FUTSALS
            </a>
          </li>
          <li className="list-item">
            <a href="/pending-futsals" className="link-item">
              PENDING FUTSALS
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="link-item">
              CHAT
            </a>
          </li>
          <li>
            <a href="#" className="log-out-link">
              LOG OUT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
