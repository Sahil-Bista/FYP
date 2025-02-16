import React from "react";
import logo from "../assets/logo.png";
import "../styles/chatHeader.css";

function ChatHeader() {
  return (
    <div className="chat-header-div">
      <img className="logo" src={logo} alt="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a className="link-item" href="/home">
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
          <li>
            <a className="log-out-link" href="#">
              LOG OUT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ChatHeader;
