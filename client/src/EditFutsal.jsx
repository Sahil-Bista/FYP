import React from "react";
import Popup from "reactjs-popup";
import { useState, useEffect } from "react";
import "reactjs-popup/dist/index.css";
import axios from "axios";

export default function EditFutsal({ futsalId }) {
  const [futsalName, setFutsalName] = useState("");
  const [futsalAddress, setFutsalAddress] = useState("");
  const [addressLink, setAddressLink] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const [futsalContact, setFutsalContact] = useState("");

  const updatedData = {
    futsal_name: futsalName,
    futsal_address: futsalAddress,
    address_link: addressLink,
    futsal_description: futsalDescription,
    futsal_contact: futsalContact,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/futsals/${futsalId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
        setFutsalName(result.data.futsal.futsal_name);
        setFutsalAddress(result.data.futsal.futsal_address);
        setAddressLink(result.data.futsal.address_link);
        setFutsalDescription(result.data.futsal.futsal_description);
        setFutsalContact(result.data.futsal.futsal_contact);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [futsalId]);

  const handleSubmit = (e, close) => {
    e.preventDefault();

    // Make the PATCH request with the 'multipart/form-data' content type header
    axios
      .patch(`http://localhost:3001/futsal/${futsalId}`, updatedData, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
        close();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-div">
      <Popup
        contentStyle={{
          position: "absolute",
          width: "740px",
          height: "570px",
          background: "#030400",
          display: "flex",
          justifyContent: "center",
          left: "350px",
          top: "50px",
        }}
        trigger={
          <button
            style={{
              width: "150px",
              minWidth: "100px",
              height: "35px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
              color: "White",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            {" "}
            EDIT FUTSAL{" "}
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <form onSubmit={(e) => handleSubmit(e, close)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "25px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ color: "white" }}> &nbsp; Edit Futsal</h2>
              </div>
              <div
                style={{
                  marginRight: "30px",
                  fontSize: "24px",
                  color: "white",
                }}
              >
                <button
                  type="button"
                  onClick={close}
                  style={{
                    border: "1px solid #7C7C7C",
                    borderRadius: "40px",
                    color: "white",
                    backgroundColor: "black",
                    cursor: "pointer",
                  }}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
            </div>
            <div
              className="input fields container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "10px",
                margin: "10px",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "170px",
                  marginBottom: "10px",
                  width: "570px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0px",
                    gap: "4px",
                    color: "white",
                  }}
                >
                  <label htmlFor="name">Futsal Name</label>
                  <input
                    style={{ width: "210px" }}
                    type="text"
                    placeholder="Enter Futsal Name"
                    id="name"
                    name="futsal_name"
                    onChange={(e) => setFutsalName(e.target.value)}
                    value={futsalName}
                    required
                  ></input>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "4px",
                    color: "white",
                  }}
                >
                  <label htmlFor="address">Futsal Address</label>
                  <input
                    style={{ width: "250px" }}
                    type="text"
                    id="address"
                    placeholder="Enter Futsal Address"
                    name="futsal_address"
                    onChange={(e) => setFutsalAddress(e.target.value)}
                    value={futsalAddress}
                    required
                  ></input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "150px",
                  justifyContent: "space-around",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "4px",
                    color: "white",
                  }}
                >
                  <label htmlFor="contact">Contact Number</label>
                  <input
                    maxLength={10}
                    style={{ width: "630px" }}
                    type="text"
                    id="contact"
                    placeholder="Enter Futsal address link"
                    value={futsalContact}
                    onChange={(e) => setFutsalContact(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "150px",
                  justifyContent: "space-around",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "0px",
                    gap: "4px",
                    color: "white",
                  }}
                >
                  <label htmlFor="link">Address link(from google maps)</label>
                  <input
                    style={{ width: "630px" }}
                    type="text"
                    id="link"
                    placeholder="Enter Futsal address link"
                    name="address_link"
                    value={addressLink}
                    onChange={(e) => setAddressLink(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "4px",
                  color: "white",
                  marginBottom: "20px",
                }}
              >
                <label htmlFor="description"> Description </label>
                <textarea
                  maxLength={50}
                  style={{ width: "630px", height: "90px" }}
                  id="description"
                  placeholder="Enter Futsal Description"
                  name="futsal_description"
                  onChange={(e) => setFutsalDescription(e.target.value)}
                  value={futsalDescription}
                  required
                ></textarea>
              </div>
              <div
                style={{
                  marginRight: "30px",
                  fontSize: "24px",
                  color: "white",
                }}
              >
                <button
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </Popup>
    </div>
  );
}
