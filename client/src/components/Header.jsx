import React from "react";
import logo from "../assets/logo.png";
import "../styles/header.css";

function Header() {
  const userRole = localStorage.getItem("userRole");
  console.log("Role", userRole);
  return (
    <div className="header-div">
      <img className="logo" src={logo} alt="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a className="link-item" href="/">
              HOME
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="link-item">
              MATCHUP
            </a>
          </li>
          <li className="list-item">
            <a className="link-item" href="#">
              BOOKING
            </a>
          </li>
          <li className="list-item">
            <a className="link-item" href="#">
              CHAT
            </a>
          </li>
          {userRole ? (
            <li>
              <a href="#" className="log-out-link">
                LOG OUT
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="log-out-link">
                LOG IN
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
