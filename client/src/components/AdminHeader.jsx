import React from "react";
import logo from "../assets/logo.png";
import "../styles/header.css";

function AdminHeader() {
  const userRole = localStorage.getItem("userRole");
  console.log("Role", userRole);
  return (
    <div className="header-div">
      <img src={logo} alt="logo" className="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a href="/admin-landing" className="link-item">
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

export default AdminHeader;
