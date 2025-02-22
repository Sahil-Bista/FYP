import React from "react";
import "../styles/landing.css";
import card1 from "../assets/card1.jpg";
import card2 from "../assets/card2.jpg";
import card3 from "../assets/card3.jpg";
import { useNavigate } from "react-router";
import VendorFooter from "../components/VendorFooter";
import AdminHeader from "../components/AdminHeader";
import AdminFooter from "../components/AdminFooter";

const AdminLandingPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  console.log("landing", userRole);

  return (
    <div>
      <div className="section-1">
        <div className="header">
          <AdminHeader />
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
              <h2 className="card-heading">FUTSALS</h2>
              <div className="content-button">
                <p className="card-description">
                  Admin can have their own control over the futsals present in
                  the system. Admins can view the list of futsals and delete any
                  futsals in required cases.
                </p>
                <button
                  className="card-button"
                  onClick={() => navigate("/futsal")}
                >
                  VIEW FUTSALS
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
              <h2 className="card-heading">PENDING-FUTSALS</h2>
              <div className="content-button">
                <p className="card-description">
                  Admin can view requests from vendors to add futsal here. Admin
                  would be provided with special details like the vendor's phone
                  number to make contact. After verifying, admin can either save
                  the futsal to the website or delete the request.
                </p>
                <button
                  className="card-button book-now"
                  onClick={() => navigate("/pending-futsals")}
                >
                  VIEW LIST
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-1"></div>
      </div>
      <div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLandingPage;
