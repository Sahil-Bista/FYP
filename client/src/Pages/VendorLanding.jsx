import React from "react";
import "../styles/landing.css";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import { useNavigate } from "react-router";
import VendorHeader from "../components/VendorHeader";
import VendorFooter from "../components/VendorFooter";

const VendorLandingPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  console.log("landing", userRole);

  return (
    <div>
      <div className="section-1">
        <div className="header">
          <VendorHeader />
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
                  Rivals Futsal is a platform designed to connect futsal vendors
                  and players. We help vendors list and manage their futsal
                  courts, while players can easily find and book the perfect
                  spot. Join us to take your futsal bookings to a whole new
                  level!
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
              <h2 className="card-heading">MY FUTSAL</h2>
              <div className="content-button">
                <p className="card-description">
                  Vendors can have control over thier specific futsals. In case
                  of manual bookings, vendor can add the booking, can edit thier
                  futsal's description in case of any changes and also mark
                  thier futsal closed in unavoidable circumstances.
                </p>
                <button
                  className="card-button"
                  onClick={() => navigate("/my-futsal")}
                >
                  MY FUTSAL
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
              <h2 className="card-heading">BOOKINGS</h2>
              <div className="content-button">
                <p className="card-description">
                  Futsal onwers can view their bookings here! Owners can also
                  remove the bookings and search for specific bookings based on
                  date , time and status. No more need ot manage your bookings
                  in your old-fashioned registers.
                </p>
                <button
                  className="card-button book-now"
                  onClick={() => navigate("/my-bookings")}
                >
                  MY BOOKINGS
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-1"></div>
      </div>
      <div>
        <VendorFooter />
      </div>
    </div>
  );
};

export default VendorLandingPage;
