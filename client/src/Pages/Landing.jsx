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
  console.log("landing", userRole);

  return (
    <div>
      <div className="section-1">
        <div className="header">
          {userRole === "ADMIN" ? <AdminHeader /> : <Header />}
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
              <h2 className="card-heading">ABOUT RIVALS FUTSAL</h2>
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
              <h2 className="card-heading">BOOK WITH US</h2>
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
              <h2 className="card-heading">MATCHUPS</h2>
              <div className="content-button">
                <p className="card-description">
                  Insufficient team members? We have got you covered. Just go
                  through the booking list of the futsal you want to play in.
                  Check in on other teams with insufficient players that are
                  waiting to play at the same time and hit the match button.
                </p>
                <button className="card-button">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-1"></div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
