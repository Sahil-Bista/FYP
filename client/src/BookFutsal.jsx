import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function PopupGfg({ futsalId }) {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact_number, setContact_Number] = useState("");
  const [game_date, setGame_date] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [team_size, setTeam_size] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3001/book`,
        {
          futsalId,
          first_name,
          last_name,
          address,
          email,
          contact_number,
          game_date,
          startTime,
          endTime,
          team_size,
        },
        { withCredentials: true }
      )
      .then((result) => {
        const team_size = result.data.booking
          ? result.data.booking.team_size
          : null;
        console.log("Hllo");
        if (team_size === "Half-full") {
          return navigate(`/bookingList/${futsalId}`);
        }
        const bookingId = result.data.booking ? result.data.booking._id : null;
        if (bookingId) {
          console.log(bookingId);
          navigate(`/payment/${bookingId}`);
        } else {
          console.error("Booking ID not found in the response.");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <Popup
        trigger={
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
          >
            {" "}
            BOOK NOW{" "}
          </button>
        }
        modal
        nested
      >
        {(close) => (
          <div
            style={{
              width: "1000px",
              height: "430px",
              backgroundColor: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                padding: "30px",
                position: "relative",
                left: "30px",
              }}
            >
              <form>
                <div style={{ marginBottom: "30px" }}>
                  <h2 style={{ color: "white" }}>Book your game!!</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "150px",
                    justifyContent: "space-around",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      placeholder="Enter your first name here"
                      name="first_name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      placeholder="Enter your last name here"
                      name="last_name"
                      id="last_name"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      placeholder="Enter your address here"
                      name="address"
                      id="address"
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "150px",
                    justifyContent: "space-around",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      placeholder="Enter your email here"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="contact_number">Contact Number</label>
                    <input
                      placeholder="Contact Number"
                      name="contact_number"
                      onChange={(e) => setContact_Number(e.target.value)}
                      required
                    ></input>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="team_size">Team Size</label>
                    <select
                      style={{
                        height: "30px",
                        width: "190px",
                      }}
                      name="team_size"
                      onChange={(e) => setTeam_size(e.target.value)}
                      required
                    >
                      <option value="Full">Full</option>
                      <option value="Half-full">Half-full</option>
                    </select>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "150px",
                    justifyContent: "space-around",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="date">Date</label>
                    <Calendar
                      style={{ height: "30px", width: "190px" }}
                      name="date"
                      value={game_date}
                      onChange={(e) => setGame_date(e.target.value)}
                      showIcon
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="start">Start Time</label>
                    <Calendar
                      style={{ height: "30px", width: "190px" }}
                      name="start"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      timeOnly
                      showIcon
                      icon="pi pi-clock"
                      hideOnRangeSelection
                      stepMinute={60}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "white",
                      gap: "4px",
                    }}
                  >
                    <label htmlFor="end">End time</label>
                    <Calendar
                      style={{ height: "30px", width: "190px" }}
                      name="end"
                      value={endTime}
                      onChange={(e) => setEndTime(e.value)}
                      timeOnly
                      showIcon
                      icon="pi pi-clock"
                      hideOnRangeSelection
                      stepMinute={60}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <button
                    style={{
                      width: "120px",
                      minWidth: "100px",
                      height: "42px",
                      border: "1px solid #7C7C7C",
                      borderRadius: "40px",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    type="Submit"
                    onClick={handleSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </form>
            </div>
            <div>
              <button
                style={{
                  position: "absolute",
                  top: "35px",
                  right: "70px",
                  color: "white",
                  backgroundColor: "black",
                  border: "1px solid black",
                  fontSize: "25px",
                }}
                onClick={() => close()}
              >
                {" "}
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
}
