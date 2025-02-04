import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import backgroundImage from "./assets/background.jpg";
import VendorHeader from "./VendorHeader";
import Footer from "./Footer";
import EditFutsal from "./EDitFutsal";

export default function MyFutsal() {
  const [myFutsal, setMyFutsal] = useState([]);
  const user = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/futsal/${user}`, {
        withCredentials: true,
      })
      .then((result) => {
        if (result.status === 200) {
          console.log(result.data.futsal);
          setMyFutsal(result.data.futsal);
        }
        if (result.status === 202) {
          navigate(`/futsals/${user}`);
        }
        if (result.status === 201) {
          setMyFutsal([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleStatus = (_id) => {
    const futsalId = _id;
    axios
      .patch(
        `http://localhost:3001/futsal/editStatus/${futsalId}`,
        {},
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result.data.futsal);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
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
            minWidth: "100vh",
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
            <VendorHeader />
          </div>

          <br></br>

          {myFutsal.length > 0 ? (
            <div
              className="futsal"
              style={{
                position: "relative",
                width: "1050px",
                height: "800px",
                left: "175px",
                top: "0px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "40px",
                marginBottom: "20px",
              }}
            >
              {myFutsal.map(
                ({
                  futsal_name,
                  _id,
                  image,
                  futsal_address,
                  futsal_description,
                  address_link,
                  futsal_contact,
                  isOpen,
                }) => (
                  <div key={_id}>
                    <img
                      src={`http://localhost:3001/${image}`}
                      alt={futsal_name}
                      style={{
                        position: "absolute",
                        width: "937px",
                        height: "544px",
                        left: "51px",
                        top: "45px",
                        borderRadius: "12px",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "1205px",
                        height: "146px",
                        left: "50px",
                        top: "610px",
                        color: "white",
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: "16px",
                          fontSize: "24px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {futsal_name}
                      </h3>
                      <a
                        style={{
                          fontSize: "16px",
                          color: "white",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                        href={address_link}
                      >
                        <i className="fa-solid fa-location-pin"></i>
                        {futsal_address}{" "}
                      </a>
                      <p
                        style={{
                          marginBottom: "0px",
                          fontSize: "16px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                      >
                        {futsal_description}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        width: "1000px",
                        position: "absolute",
                        top: "720px",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        padding: "12px",
                        gap: "4px",
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: isOpen ? "green" : "red",
                          width: "100px",
                          minWidth: "100px",
                          height: "35px",
                          border: "1px solid #7C7C7C",
                          borderRadius: "40px",
                          fontSize: "14px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 500,
                        }}
                        onClick={() => toggleStatus(_id)}
                      >
                        {isOpen ? "OPEN" : "CLOSED"}
                      </button>
                      <EditFutsal futsalId={_id} />
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                backgroundColor: "#000",
                color: "white",
                border: "1px solid #555",
                textAlign: "center",
                justifySelf: "center",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "20px",
                padding: "25px",
                margin: "20px auto",
                height: "223px",
                width: "40%",
                opacity: "0.5",
              }}
            >
              <p>Your futsal is yet to be reviewed by the admin</p>
              <p>Thank you for your patience!</p>
            </div>
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}
