import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer";
import FutsalBook from "../components/FutsalBook.jsx";
import "../styles/FutsalList.css";

function Futsal() {
  const userRole = localStorage.getItem("userRole");
  const [futsals, setFutsals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedFutsal, setSearchedFutsal] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!searchQuery.trim()) {
        const result = await axios.get("http://localhost:3001/api/futsal", {
          withCredentials: true,
        });
        setFutsals(result.data);
      } else {
        const result = await axios.post(
          `http://localhost:3001/api/futsal/searchFutsal`,
          { searchQuery },
          { withCredentials: true }
        );
        setSearchedFutsal(result.data.data);
      }
    } catch (err) {
      console.log("Error getting futsals", err);
    }
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:3001/api/futsal/deleteFutsal/${_id}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data.message);
        setFutsals((futsals) => futsals.filter((futsal) => futsal._id !== _id));
      })
      .catch((err) => {
        console.log("Error deleting futsal:", err.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/futsal", { withCredentials: true })
      .then((result) => {
        console.log(result.data);
        setFutsals(result.data.futsals);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="parent-div">
      <div className="background"></div>
      <div className="black-overlay"></div>
      <div className="reference">
        <div className="header">
          <Header />
        </div>
        <div className="header-search-input-div">
          <div className="page-header-div">FUTSAL AVAILABLE FOR BOOKING</div>
          <div className="search-input-icon">
            <input
              className="search-input"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchedFutsal([]);
              }}
              value={searchQuery}
              placeholder="Search futsal by name,address"
            />
            <button onClick={handleSubmit} className="search-icon">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <br></br>
        <div className="row-separation">
          <div className="horizontal-row">
            {(searchQuery.trim() && searchedFutsal.length > 0
              ? searchedFutsal
              : futsals
            ).map(
              ({
                futsal_name,
                _id,
                image,
                futsal_address,
                futsal_description,
                address_link,
                isOpen,
              }) => (
                <div className="card" key={_id}>
                  <div className="image-container">
                    {image && (
                      <img
                        src={`http://localhost:3001/${image}`}
                        alt={futsal_name}
                        className="image"
                      />
                    )}
                  </div>
                  <div style={{ marginBottom: "10px", paddingBottom: "3px" }}>
                    <div className="futsal-info-container">
                      <h4 className="futsall-name">{futsal_name}</h4>
                      <a className="futsal-addresss" href={address_link}>
                        <i className="fa-solid fa-location-pin"></i>
                        &nbsp;
                        {futsal_address}{" "}
                      </a>
                      <p className="description"> {futsal_description}</p>
                      {isOpen === false ? (
                        <p className="closed">Futsal Closed For Today</p>
                      ) : (
                        <p></p>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="button-div">
                      {userRole === "ADMIN" ? (
                        <button
                          className="delete-button"
                          onClick={() => {
                            handleDelete(_id);
                          }}
                        >
                          Remove
                        </button>
                      ) : (
                        <FutsalBook futsalId={_id} />
                      )}
                      <button
                        className="view-button"
                        onClick={() => navigate(`/bookingList/${_id}`)}
                      >
                        VIEW BOOKINGS
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Futsal;
