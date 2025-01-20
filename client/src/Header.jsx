import React from "react";
import logo from "./assets/logo.png";

function Header() {
  return (
    <header
      style={{ backgroundColor: "#000", padding: "10px 0", position: "sticky" }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
        }}
      >
        <div>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "40px",
              marginLeft: "20px",
            }}
          />
        </div>
        <div>
          <nav>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                position: "absolute",
                right: "30px",
                top: "10px",
              }}
            >
              <li style={{ marginRight: "20px" }}>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  HOME
                </a>
              </li>
              <li style={{ marginRight: "20px" }}>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  MATCHUP
                </a>
              </li>
              <li style={{ marginRight: "20px" }}>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  BOOKING
                </a>
              </li>
              <li style={{ marginRight: "20px" }}>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  CHAT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                    background: "#121212",
                    padding: "10px 20px",
                    border: "1px white solid",
                    borderRadius: "40px",
                    fontSize: 14,
                  }}
                >
                  LOG OUT
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
