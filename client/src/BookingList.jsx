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
import "./styles/BookingList.css";

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
    <div className="primary-div">
      <div className="background"></div>

      <div className="black-overlay"></div>
      <div className="reference-div">
        <div className="Header">
          <Header />
        </div>
        <div className="page-heading">WEEKLY BOOKING LIST</div>
        <div className="search-row">
          <Calendar
            className="custom-calendar"
            name="date"
            value={game_date}
            onChange={(e) => setGame_date(e.value)}
            showIcon
            required
          />
          <Calendar
            className="custom-calendar"
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
            className="custom-calendar"
            required
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
            className="status search"
            placeholder="Select Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option>Select Status</option>
            <option value="Booked">Booked</option>
            <option value="Waiting to match">Waiting to Match</option>
          </select>
          <button className="button-submit" onClick={handleSubmit}>
            Search
          </button>
          <button className="button-clear" onClick={handleClear}>
            Clear
          </button>
        </div>
        <br></br>
        <div className="Table-div">
          <table className="table">
            <thead>
              <tr className="table-row">
                <th className="table-heading-1">Name</th>
                <th className="table-heading-2">Date</th>
                <th className="table-heading-3">Time</th>
                <th className="table-heading-4">Status</th>
                <th className="table-heading-5">Actions</th>
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
                    <tr className="table-data-row" key={_id}>
                      <td className="player-name">
                        {first_name} {last_name}
                      </td>
                      <td className="game-date">
                        {new Date(game_date).toISOString().split("T")[0]}
                      </td>
                      <td className="time">
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
                      <td className="booking-status">{booking_status}</td>
                      <td className="buttons-td">
                        {team_size === "Half-full" && (
                          <button
                            className="match-button"
                            onClick={() => navigate(`/chat/${userId}`)}
                          >
                            Match
                          </button>
                        )}
                        {userId === loggedInUserId && (
                          <>
                            <button
                              className="edit-booking-button"
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
