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
      {futsals.map(({ futsal_name, _id }) => (
        <span key={_id} onClick={() => navigate(`/booking/${_id}`)}>
          {futsal_name}
        </span>
      ))}
    </div>
  );
}

export default Futsal;
