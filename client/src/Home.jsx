import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/all-users", { withCredentials: true })
      .then((result) => {
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {users.map(({ name, _id }) => (
        <span
          style={{ display: "block" }}
          onClick={() => navigate(`/chat/${_id}`)}
          key={_id}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

export default Home;
