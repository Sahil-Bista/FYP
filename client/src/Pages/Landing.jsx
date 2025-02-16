import React from "react";
import "../styles/landing.css";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import VendorHeader from "../components/VendorHeader";
import AdminHeader from "../components/AdminHeader";

const LandingPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  console.log(userRole);
  console.log(userRole === "VENDOR" || "PENDING_VENDOR");

  return (
    <div>
      <div className="section-1">
        <div className="header">
          {userRole === "ADMIN" ? (
            <AdminHeader />
          ) : userRole === "VENDOR" || userRole === "PENDING_VENDOR" ? (
            <VendorHeader />
          ) : (
            <Header />
          )}
        </div>
        <div className="image-foreground-text">
          <h1 className="app-name">
            RIVALS<br></br>FUTSAL
          </h1>
          <p className="quote">
            SAME GAME <br></br> FOR THE NEXT <br></br> GENERATION
          </p>
        </div>
        <div className="overlay-1"></div>
      </div>
      <div className="section-2">
        <div className="overlay-2"></div>
        <div className="card-row-1">
          <div className="cards">
            <div>
              <img src={card1} alt="Card 1" className="card-image" />
            </div>
            <div className="card-content">
              <h2 className="card-heading">About Rivals Futsal</h2>
              <div className="content-button">
                <p className="card-description">
                  Rival Futsal brings the thrill of futsal to you! Book our
                  high-quality court for your next match, gather your team, and
                  enjoy a seamless playing experience. Convenient, quick, and
                  built for passionate players!
                </p>
                <button className="card-button">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-row-2">
          <div className="cards">
            <div>
              <img src={card2} alt="Card 2" className="card-image" />
            </div>
            <div className="card-content">
              <h2 className="card-heading">Book With Us</h2>
              <div className="content-button">
                <p className="card-description">
                  Booking at Rival Futsal is quick and easy! Simply select your
                  preferred date and time for the court, invite your team, and
                  confirm your booking. Once it's set, you're ready to enjoy the
                  game.
                </p>
                <button
                  className="card-button book-now"
                  onClick={() => navigate("/futsal")}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card-row-3">
          <div className="cards">
            <div>
              <img src={card3} alt="Card 3" className="card-image" />
            </div>
            <div className="card-content">
              <h2 className="card-heading">MatchUps</h2>
              <div className="content-button">
                <p className="card-description">
                  Challenge other teams to a match and put your skills to the
                  test! After booking the court, simply browse available teams
                  and send a matchup request. Once accepted, your match is
                  set—get ready to play and compete!
                </p>
                <button className="card-button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-1"></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
