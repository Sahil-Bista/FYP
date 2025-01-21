import React from "react";

const Footer = () => {
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(180deg, #141414 20%, rgba(20, 20, 20, 0.8) 40%, rgba(20, 20, 20, 0.6) 60%, rgba(20, 20, 20, 0.6) 84.25%, rgba(20, 20, 20, 0.2) 95%, rgba(20, 20, 20, 0) 100%)",
          transform: "rotate(180deg)",
          position: "relative",
          height: "40px",
          width: "100%",
          zIndex: "0",
        }}
      ></div>
      <footer
        style={{
          backgroundColor: "#111",
          color: "#fff",
          padding: "20px 0",
        }}
      >
        <div
          style={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginLeft: "50px",
          }}
        >
          <div style={{ flex: "1" }}>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "30px",
                marginLeft: "32px",
              }}
            >
              RIVALS <br></br>FUTSAL
            </p>
            <div>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                }}
              >
                <li style={{ marginRight: "70px" }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    BOOKING
                  </a>
                </li>
                <li style={{ marginRight: "70px" }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    CONTACT US
                  </a>
                </li>
                <li style={{ marginRight: "70px" }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    MATCH UPS
                  </a>
                </li>
                <li style={{ marginRight: "70px" }}>
                  <a href="#" style={{ color: "#fff", textDecoration: "none" }}>
                    PRIVACY
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                marginTop: "20px",
                marginRight: "100px",
              }}
            >
              <li style={{ marginLeft: "30px" }}>
                <a href="#" style={{ color: "#fff", fontSize: "1.8rem" }}>
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li style={{ marginLeft: "30px" }}>
                <a href="#" style={{ color: "#fff", fontSize: "1.8rem" }}>
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li style={{ marginLeft: "30px" }}>
                <a href="#" style={{ color: "#fff", fontSize: "1.8rem" }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "0.8rem",
            marginLeft: "80px",
          }}
        >
          &copy; 2024 RIVALS FUTSAL. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
