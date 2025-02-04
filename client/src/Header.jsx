import React from "react";
import logo from "./assets/logo.png";

function Header() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 30px",
        gap: "60px",
        position: "sticky",
        width: "100%",
        height: "82px",
        background:
          "linear-gradient(180deg, #141414 32.52%, rgba(20, 20, 20, 0.8) 40%, rgba(20, 20, 20, 0.6) 60%, rgba(20, 20, 20, 0.6) 84.25%, rgba(20, 20, 20, 0.2) 95.81%, rgba(20, 20, 20, 0) 100%)",
        zIndex: "10",
      }}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          height: "35px",
          width: "40px",
        }}
      ></img>
      <nav>
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            margin: "0",
            padding: "0",
          }}
        >
          <li style={{ marginRight: "20px" }}>
            <a
              href="/home"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
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
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
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
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
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
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
              }}
            >
              CHAT
            </a>
          </li>
          <li>
            <a
              href="#"
              style={{
                fontSize: "14px",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                color: "#fff",
                textDecoration: "none",
                background: "#121212",
                padding: "10px 20px",
                border: "1px white solid",
                borderRadius: "40px",
              }}
            >
              LOG OUT
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
