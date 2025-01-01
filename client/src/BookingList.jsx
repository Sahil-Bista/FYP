import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function BookingList() {
  const { futsalId } = useParams();
  const [pendingbookings, setPendingBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/all-bookings/${futsalId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
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
        navigate(`/bookingList/${futsalId}`);
      }
    } catch (error) {
      console.log("error sending request", error);
    }
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
    <div>
      {pendingbookings.map(
        ({
          first_name,
          last_name,
          _id,
          email,
          game_date,
          startTime,
          endTime,
          userId,
          team_size,
        }) => (
          <div key={_id} style={{ marginBottom: "10px" }}>
            <span style={{ display: "block", cursor: "pointer" }}>
              {first_name} {last_name} {email}{" "}
              {new Date(
                new Date(game_date).setDate(new Date(game_date).getDate() + 1)
              ).toLocaleDateString()}{" "}
              {new Date(startTime).toLocaleTimeString()}{" "}
              {new Date(endTime).toLocaleTimeString()}
              {team_size === "Half-full" ? (
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => navigate(`/chat/${userId}`)}
                >
                  Match with opponent
                </button>
              ) : null}
              <button key={_id} onClick={(e) => handleEdit(e, _id)}>
                {" "}
                Edit{" "}
              </button>
              <button key={_id} onClick={(e) => handleDelete(e, _id)}>
                Delete
              </button>
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default BookingList;
