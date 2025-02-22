import React from "react";
import "../styles/Footer.css";

const AdminFooter = () => {
  return (
    <>
      <div></div>
      <footer className="footer-main-div">
        <div className="footer-content-div">
          <div className="footer-app-name-div" style={{ flex: "1" }}>
            <p className="footer-app-name">
              RIVALS <br></br>FUTSAL
            </p>
            <div>
              <ul className="footer-navigation-bar">
                <li className="footer-list-item">
                  <a href="/admin-landing" className="footer-link">
                    HOME
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="/futsal" className="footer-link">
                    FUTSALS
                  </a>
                </li>
                <li className="footer-list-item">
                  <a href="pending-futsals" className="footer-link">
                    PENDING FUTSALS
                  </a>
                </li>
                <li className="footer-list-item">
                  <a className="footer-link" href="#">
                    PRIVACY
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="social-divs">
            <ul className="socials-nav-bar">
              <li className="socials-list-item">
                <a href="#" className="socials-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="socials-list-item">
                <a href="#" className="socials-icon">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="socials-list-item">
                <a href="#" className="socials-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-div">
          &copy; 2024 RIVALS FUTSAL. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;
