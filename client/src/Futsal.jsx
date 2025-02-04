import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import backgroundImage from "./assets/background.jpg";
import VendorHeader from "./VendorHeader";
import Footer from "./Footer";

export default function Futsals() {
  const [image, setImage] = useState(null);
  const [futsalName, setFutsalName] = useState("");
  const [futsalAddress, setFutsalAddress] = useState("");
  const [addressLink, setAddressLink] = useState("");
  const [futsalDescription, setFutsalDescription] = useState("");
  const [futsalContact, setFutsalContact] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("futsalName", futsalName);
    formData.append("addressLink", addressLink);
    formData.append("futsalAddress", futsalAddress);
    formData.append("futsalDescription", futsalDescription);
    formData.append("futsalContact", futsalContact);

    axios
      .post(`http://localhost:3001/addFutsal/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // This is required for file uploads
        },
      })
      .then((result) => {
        console.log(result);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
        // position: "absolute",
        zIndex: "0",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
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
          flex: "1",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
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
          <div
            className="content"
            style={{
              position: "relative",
              left: "375px",
              top: "0px",
              width: "750px",
              height: "550px",
              backgroundColor: "black",
              opacity: 0.7,
              zIndex: "2",
            }}
          >
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "25px",
                  justifyContent: "space-between",
                  marginBottom: "15x",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: "white",
                      marginLeft: "40px",
                    }}
                  >
                    {" "}
                    &nbsp; Enter Futsal Details Below:
                  </h2>
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
                  marginLeft: "50px",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "87px",
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
                    <label htmlFor="image">Add Picture: </label>
                    <input
                      // style={{ width: "100px" }}
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
                      padding: "0px",
                      gap: "4px",
                      color: "white",
                    }}
                  >
                    <label htmlFor="contact">Contact Number: </label>
                    <input
                      style={{ width: "250px" }}
                      placeholder="Enter you contact Number here"
                      type="text"
                      id="contact"
                      name="contact"
                      maxLength={10}
                      onChange={(e) => setFutsalContact(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
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
                    required
                  ></textarea>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "20px",
                    color: "white",
                  }}
                >
                  <button>Add Futsal</button>
                </div>
              </div>
            </form>
          </div>
          <div
            style={{
              position: "relative",
              bottom: 0,
            }}
          >
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
