import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/futsal")}>Book Now</button>
    </div>
  );
}

export default Home;
