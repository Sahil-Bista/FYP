import React from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import { useNavigate } from "react-router";
import "reactjs-popup/dist/index.css";

export default function AddFutsal() {
  const [image, setImage] = useState(null);
  const [futsalName, setFutsalName] = useState("");
  const [futsalAddress, setFutsalAddress] = useState("");
  const [addressLink, setAddressLink] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image); // assuming 'image' is a file input
    formData.append("futsalName", futsalName);
    formData.append("addressLink", addressLink);
    formData.append("futsalAddress", futsalAddress);
    formData.append("futsalDescription", futsalDescription);

    // Make the POST request with the 'multipart/form-data' content type header
    axios
      .post("http://localhost:3001/addFutsal", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/futsal");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="main-div">
      <h4>Add Futsal Pop Up</h4>
      <Popup
        contentStyle={{
          position: "absolute",
          width: "1052px",
          height: "725px",
          left: "calc(50% - 1052px/2)",
          top: "calc(50% - 685px/2 - 278px)",
          background: "#030400",
          borderRadius: "8px",
        }}
        trigger={<button> Add Futsal </button>}
        position="right center"
      >
        {(close) => (
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "25px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2 style={{ color: "white" }}> &nbsp; Add Futsal</h2>
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
                  <i class="fa-solid fa-x"></i>
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "0px",
                  gap: "4px",
                  color: "white",
                }}
              >
                <label for="image">Add Picture</label>
                <input
                  style={{
                    width: "996px",
                    height: "52px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
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
                <label for="name">Futsal Name</label>
                <input
                  style={{
                    width: "996px",
                    height: "52px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  type="text"
                  placeholder="Enter Futsal Name"
                  id="name"
                  name="futsal_name"
                  onChange={(e) => setFutsalName(e.target.value)}
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
                <label for="address">Futsal Address</label>
                <input
                  style={{
                    width: "996px",
                    height: "52px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  type="text"
                  id="address"
                  placeholder="Enter Futsal Address"
                  name="futsal_address"
                  onChange={(e) => setFutsalAddress(e.target.value)}
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
                <label for="link">Address link(from google maps)</label>
                <input
                  style={{
                    width: "996px",
                    height: "52px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  type="text"
                  id="link"
                  placeholder="Enter Futsal address link"
                  name="address_link"
                  onChange={(e) => setAddressLink(e.target.value)}
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
                <label for="description"> Description </label>
                <textarea
                  style={{
                    width: "996px",
                    height: "140px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid #FFFFFF",
                    borderRadius: "8px",
                  }}
                  id="description"
                  placeholder="Enter Futsal Description"
                  name="futsal_description"
                  onChange={(e) => setFutsalDescription(e.target.value)}
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
                <button>Save</button>
              </div>
            </div>
          </form>
        )}
      </Popup>
    </div>
  );
}
