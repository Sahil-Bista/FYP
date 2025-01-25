import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AdminHeader from "./AdminHeader";
import VendorHeader from "./VendorHeader";

function Home() {
  const user = localStorage.getItem("userRole");
  console.log(user);
  const navigate = useNavigate();
  return (
    <>
      <div>
        {user === "ADMIN" ? (
          <div>
            <AdminHeader />
          </div>
        ) : user === "VENDOR" || user === "PENDING_VENDOR" ? (
          <div>
            <VendorHeader />
          </div>
        ) : (
          <div>
            <Header />
          </div>
        )}
      </div>
      <div>
        <button onClick={() => navigate("/futsal")}>Book Now</button>
      </div>
    </>
  );
}

export default Home;
