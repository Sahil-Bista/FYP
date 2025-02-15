import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import VendorHeader from "../components/VendorHeader";
import Footer from "../components/Footer";
import EditFutsal from "../components/EditFutsal";
import "../styles/myFutsal.css";

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
      <div className="primary">
        <div className="background"></div>
        <div className="black-overlay"></div>
        <div className="reference-div">
          <div className="header">
            <VendorHeader />
          </div>

          {myFutsal.length > 0 ? (
            <div className="futsal">
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
                  <div className="content-div" key={_id}>
                    <div className="image-contain">
                      <img
                        src={`http://localhost:3001/${image}`}
                        alt={futsal_name}
                        className="image"
                      />
                    </div>
                    <div className="futsal-content">
                      <div className="futsal-name">
                        <h3>{futsal_name}</h3>
                      </div>
                      <a className="futsal-address" href={address_link}>
                        <i className="fa-solid fa-location-pin"></i>
                        {futsal_address}{" "}
                      </a>
                      <p className="futsal-description">{futsal_description}</p>
                    </div>
                    <div className="buttons-div">
                      <div>
                        <button
                          className={isOpen ? "open-button" : "closed-button"}
                          onClick={() => toggleStatus(_id)}
                        >
                          {isOpen ? "OPEN" : "CLOSED"}
                        </button>
                      </div>
                      <div>
                        <EditFutsal futsalId={_id} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="else">
              <p>Your futsal is yet to be reviewed by the admin</p>
              <p>Thank you for your patience!</p>
            </div>
          )}
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
