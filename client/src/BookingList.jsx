import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/all-bookings", { withCredentials: true })
      .then((result) => {
        setBookings(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {bookings.map(
        ({
          first_name,
          last_name,
          _id,
          email,
          game_date,
          startTime,
          endTime,
          userId,
        }) => (
          <div key={_id} style={{ marginBottom: "10px" }}>
            <span
              style={{ display: "block", cursor: "pointer" }}
              onClick={() => navigate(`/chat/${userId}`)}
            >
              {first_name} {last_name} {email}{" "}
              {/* Format game_date to local time */}
              {new Date(
                new Date(game_date).setDate(new Date(game_date).getDate() + 1)
              ).toLocaleDateString()}{" "}
              {/* Format startTime to local time */}
              {new Date(startTime).toLocaleTimeString()}{" "}
              {/* Format endTime to local time */}
              {new Date(endTime).toLocaleTimeString()}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() =>
                  console.log(`Button clicked for ${first_name} ${last_name}`)
                }
              >
                Click Me
              </button>
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default BookingList;
