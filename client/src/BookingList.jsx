import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import backgroundImage from "./assets/background.jpg";
import Header from "./Header";
import Footer from "./Footer";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function BookingLis() {
  const { futsalId } = useParams();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [game_date, setGame_date] = useState();
  const [status, setStatus] = useState();
  const loggedInUserId = localStorage.getItem("userId");
  console.log(loggedInUserId);
  const [pendingbookings, setPendingBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/all-bookings/${futsalId}`, {
        withCredentials: true,
      })
      .then((result) => {
        setPendingBookings(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (e, _id) => {
    const bookingId = _id;
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/deleteBooking/${bookingId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setPendingBookings((Bookings) =>
          Bookings.filter((booking) => booking._id !== _id)
        );
        navigate(`/bookingList/${futsalId}`);
      }
    } catch (error) {
      console.log("error sending request", error);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const params = new URLSearchParams();
    if (game_date) params.append("gameDate", game_date);
    if (startTime) params.append("startTime", startTime);
    if (endTime) params.append("endTime", endTime);
    if (status) params.append("status", status);
    axios
      .post(
        `http://localhost:3001/searchBookings/${futsalId}/?${params.toString()}`,
        {},
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        setPendingBookings(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClear = (e) => {
    //To also clear the input fields
    setGame_date("");
    setStartTime("");
    setEndTime("");
    setStatus("");
    axios
      .get(`http://localhost:3001/all-bookings/${futsalId}`, {
        withCredentials: true,
      })
      .then((result) => {
        setPendingBookings(result.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = async (e, _id) => {
    const bookingId = _id;
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/editBooking/${bookingId}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        navigate(`/editBookingList/${bookingId}`);
      }
    } catch (error) {
      console.log("error sending request", error);
    }
  };

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
        <div
          style={{
            color: "white",
            fontSize: "28px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            display: "flex",
            width: "90%",
            margin: "auto",
            justifyContent: "space-between",
            paddingBottom: "20px",
          }}
        >
          WEEKLY BOOKING LIST
        </div>
        <div
          style={{
            display: "flex",
            width: "90%",
            margin: " auto",
            justifyContent: "space-between",
          }}
        >
          <Calendar
            className="custom-calendar"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
              width: "250px",
              height: "35px",
            }}
            name="date"
            value={game_date}
            onChange={(e) => setGame_date(e.value)}
            showIcon
            required
          />
          <Calendar
            style={{
              width: "250px",
              minWidth: "100px",
              height: "35px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
            }}
            name="start"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            timeOnly
            showIcon
            icon="pi pi-clock"
            hideOnRangeSelection
            stepMinute={60}
            required
            minDate={new Date(new Date().setHours(6, 0, 0, 0))}
            maxDate={new Date(new Date().setHours(20, 0, 0, 0))}
          />
          <Calendar
            required
            style={{
              width: "250px",
              minWidth: "100px",
              height: "35px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
            }}
            name="end"
            value={endTime}
            onChange={(e) => setEndTime(e.value)}
            timeOnly
            showIcon
            icon="pi pi-clock"
            hideOnRangeSelection
            stepMinute={60}
            minDate={new Date(new Date().setHours(7, 0, 0, 0))}
            maxDate={new Date(new Date().setHours(21, 0, 0, 0))}
          />
          <select
            style={{
              width: "250px",
              minWidth: "100px",
              height: "35px",
              background: "rgba(255, 255, 255, 0.2)",
              border: "1px solid #7C7C7C",
              borderRadius: "40px",
            }}
            placeholder="Select Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Booked">Booked</option>
            <option value="Waiting to match">Waiting to Match</option>
          </select>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleClear}>Clear</button>
        </div>
        <br></br>
        <div
          className="Table"
          style={{
            width: "90%",
            margin: " 0px auto",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 10px", // Add row spacing
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr
                style={{
                  background:
                    "linear-gradient(180deg, #141414 20%, rgba(20, 20, 20, 0.8) 40%, rgba(20, 20, 20, 0.6) 60%, rgba(20, 20, 20, 0.6) 84.25%, rgba(20, 20, 20, 0.2) 95%, rgba(20, 20, 20, 0) 100%)",
                  color: "white",
                  height: "50px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: "600",
                }}
              >
                <th
                  style={{ padding: "10px", textAlign: "left", width: "25%" }}
                >
                  Name
                </th>
                <th
                  style={{ padding: "10px", textAlign: "left", width: "20%" }}
                >
                  Date
                </th>
                <th
                  style={{ padding: "10px", textAlign: "left", width: "20%" }}
                >
                  Time
                </th>
                <th
                  style={{ padding: "10px", textAlign: "left", width: "15%" }}
                >
                  Status
                </th>
                <th
                  style={{ padding: "10px", textAlign: "left", width: "15%" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingbookings &&
                pendingbookings.map(
                  ({
                    first_name,
                    last_name,
                    _id,
                    game_date,
                    startTime,
                    endTime,
                    userId,
                    team_size,
                    booking_status,
                  }) => (
                    <tr
                      key={_id}
                      style={{
                        backgroundColor: "#FFFFFF",
                        opacity: "0.5",
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          wordBreak: "break-word",
                          // boxSizing: "border-box",
                          paddingLeft: "20px", // Add left padding to cells
                        }}
                      >
                        {first_name} {last_name}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          boxSizing: "border-box",
                        }}
                      >
                        {new Date(game_date).toISOString().split("T")[0]}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          boxSizing: "border-box",
                        }}
                      >
                        {new Date(startTime)
                          .toISOString()
                          .split("T")[1]
                          .slice(0, 5)}{" "}
                        -
                        {new Date(endTime)
                          .toISOString()
                          .split("T")[1]
                          .slice(0, 5)}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          boxSizing: "border-box",
                        }}
                      >
                        {booking_status}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          boxSizing: "border-box",
                          paddingRight: "20px", // Add right padding to cells
                        }}
                      >
                        {team_size === "Half-full" && (
                          <button
                            style={{ marginRight: "5px" }}
                            onClick={() => navigate(`/chat/${userId}`)}
                          >
                            Match
                          </button>
                        )}
                        {userId === loggedInUserId && (
                          <>
                            <button
                              style={{ marginRight: "5px" }}
                              onClick={(e) => handleEdit(e, _id)}
                            >
                              Edit
                            </button>
                            <button onClick={(e) => handleDelete(e, _id)}>
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
