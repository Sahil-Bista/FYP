import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import backgroundImage from "./assets/background.jpg";
import AddFutsal from "./AddFutsal";

function Futsal() {
  const [futsals, setFutsals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/all-futsals", { withCredentials: true })
      .then((result) => {
        setFutsals(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          position: "absolute",
          zIndex: "0",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.68)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "relative",
          zIndex: "2",
        }}
      >
        <div
          className="Header"
          style={{
            position: "sticky",
            top: 0,
            zIndex: "10",
          }}
        >
          <Header />
        </div>
        <div style={{ color: "white", marginLeft: "30px", fontSize: "28px" }}>
          FUTSAL AVAILABLE FOR BOOKING
        </div>
        <br></br>
        <div
          className="row-separations"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="horizontal-row"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              gap: "15px",
            }}
          >
            {futsals.map(
              ({
                futsal_name,
                _id,
                image,
                futsal_address,
                futsal_description,
                address_link,
              }) => (
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    padding: "20px",
                    gap: "10px",
                    width: "390.33px",
                    height: "300px",
                    background: "rgba(0, 0, 0, 0.4)",
                    borderRadius: "40px",
                    flex: "none",
                    order: "0",
                    flexGrow: "0",
                  }}
                  key={_id}
                >
                  <div
                    className="image-container"
                    style={{
                      width: "349.33px",
                      minHeight: "150px",
                      borderRadius: "12px",
                    }}
                  >
                    {image && (
                      <img
                        src={`http://localhost:3001/${image}`}
                        alt={futsal_name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ marginBottom: "10px", paddingBottom: "3px" }}>
                    <div style={{ color: "white" }}>
                      <h4 style={{ marginBottom: "4px", color: "#DCDCDC" }}>
                        {futsal_name}
                      </h4>
                      <a
                        style={{ fontSize: "16px", color: "white" }}
                        href={address_link}
                      >
                        <i className="fa-solid fa-location-pin"></i>
                        {futsal_address}{" "}
                      </a>
                      <p style={{ fontSize: "16px" }}> {futsal_description}</p>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        right: "15px",
                        bottom: "0px",
                        paddingBottom: "10px",
                      }}
                    >
                      <button
                        style={{
                          boxSizing: "border-box",
                          minWidth: "100px",
                          height: "35px",
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "1px solid #7C7C7C",
                          borderRadius: "40px",
                          color: "white",
                          fontSize: "14px",
                          marginRight: "5px",
                        }}
                        onClick={() => navigate(`/booking/${_id}`)}
                      >
                        BOOK NOW
                      </button>
                      <button
                        style={{
                          boxSizing: "border-box",
                          width: "120px",
                          minWidth: "100px",
                          height: "35px",
                          background: "rgba(255, 255, 255, 0.2)",
                          border: "1px solid #7C7C7C",
                          borderRadius: "40px",
                          color: "white",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate(`/bookingList/${_id}`)}
                      >
                        VIEW BOOKINGS
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Futsal;
