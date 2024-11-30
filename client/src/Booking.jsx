import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export function Booking() {
  const { futsalId } = useParams();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
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
        `http://localhost:3001/book/${futsalId}`,
        {
          first_name,
          last_name,
          address,
          gender,
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
        if (team_size === "Half-full") {
          console.log(result.data.booking);
          return navigate(`/bookingList`);
        }
        const bookingId = result.data.booking ? result.data.booking._id : null; // Ensure it's a string
        if (bookingId) {
          console.log(bookingId);
          // Proceed with navigation if bookingId is valid
          navigate(`/payment/${bookingId}`);
        } else {
          console.error("Booking ID not found in the response.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Enter your name here"
          name="first_name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        ></input>
        <input
          type="text"
          placeholder="Enter your name here"
          name="last_name"
          onChange={(e) => setLastName(e.target.value)}
          required
        ></input>
        <input
          type="text"
          placeholder="Enter your address here"
          name="address"
          onChange={(e) => setAddress(e.target.value)}
          required
        ></input>
        <input
          placeholder="Enter your gender here"
          name="gender"
          onChange={(e) => setGender(e.target.value)}
          required
        ></input>
        <input
          placeholder="Enter your email here"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          placeholder="Contact Number"
          name="contact_number"
          onChange={(e) => setContact_Number(e.target.value)}
          required
        ></input>
        <label htmlFor="date">Date</label>
        <Calendar
          name="date"
          value={game_date}
          onChange={(e) => setGame_date(e.target.value)}
          showIcon
        />
        <label htmlFor="start">Start Time</label>
        <Calendar
          name="start"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          timeOnly
          showIcon
          icon="pi pi-clock"
          hideOnRangeSelection
          stepMinute={60}
        />
        <label htmlFor="end">End time</label>
        <Calendar
          name="end"
          value={endTime}
          onChange={(e) => setEndTime(e.value)}
          timeOnly
          showIcon
          icon="pi pi-clock"
          hideOnRangeSelection
          stepMinute={60}
        />
        <label htmlFor="team_size">Team Size</label>
        <select
          name="team_size"
          onChange={(e) => setTeam_size(e.target.value)}
          required
        >
          <option value="Full">Full</option>
          <option value="Half-full">Half-full</option>
        </select>
        <button type="Submit" onClick={handleSubmit}>
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
