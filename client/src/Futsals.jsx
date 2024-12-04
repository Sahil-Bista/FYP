import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Futsal() {
  const [futsals, setFutsals] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/all-futsals", { withCredentials: true })
      .then((result) => {
        setFutsals(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {futsals.map(
        ({ futsal_name, _id, image, futsal_address, futsal_description }) => (
          <span
            style={{
              display: "flex",
              margin: "10px",
              flexDirection: "column",
              flexWrap: "nowrap",
            }}
            key={_id}
          >
            <div style={{ display: "flex" }}>
              <div>
                <h3>{futsal_name}</h3>
                <h4> {futsal_address} </h4>
                <p> {futsal_description}</p>
              </div>
              <div>
                {/* Check if the image exists and render the actual image */}
                {image && (
                  <img
                    src={`http://localhost:3001/${image}`}
                    alt={futsal_name}
                    style={{ width: "100px", height: "auto" }}
                  />
                )}
              </div>
            </div>
            <button onClick={() => navigate(`/booking/${_id}`)}>
              Book Now
            </button>
            <button onClick={() => navigate(`/bookingList/${_id}`)}>
              View Bookings
            </button>
          </span>
        )
      )}
    </div>
  );
}

export default Futsal;
