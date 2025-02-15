import React from "react";
import logo from "../assets/logo.png";
import "../styles/header.css";

export default function VendorHeader() {
  return (
    <div className="header-div">
      <img src={logo} alt="logo" className="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a href="#" className="link-item">
              HOME
            </a>
          </li>
          <li className="list-item">
            <a href="#" className="link-item">
              BOOKINGS
            </a>
          </li>
          <li className="list-item">
            <a href="/my-futsal" className="link-item">
              MY FUTSAL
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
