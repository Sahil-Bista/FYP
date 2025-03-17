import React from "react";
import logo from "../assets/logo.png";
import "../styles/header.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminHeader() {
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await axios
      .post(
        `http://localhost:3001/api/user/logout`,
        {},
        { withCredentials: true }
      )
      .then((result) => {
        console.log(result);
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        toast.success("user logged out successfully", {
          theme: "dark",
          autoClose: 5000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(result);
        toast.error("Error logging out", { theme: "dark", autoClose: 5000 });
      });
  };

  const userRole = localStorage.getItem("userRole");
  console.log("Role", userRole);
  return (
    <div className="header-div">
      <img src={logo} alt="logo" className="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a href="/admin-landing" className="link-item">
              HOME
            </a>
          </li>
          <li className="list-item">
            <a href="/futsal" className="link-item">
              FUTSALS
            </a>
          </li>
          <li className="list-item">
            <a href="/pending-futsals" className="link-item">
              PENDING FUTSALS
            </a>
          </li>
          {userRole ? (
            <li>
              <a onClick={handleSubmit} className="log-out-link">
                LOG OUT
              </a>
            </li>
          ) : (
            <li>
              <a href="/login" className="log-out-link">
                LOG IN
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default AdminHeader;
