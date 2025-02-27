import React from "react";
import logo from "../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router";
import "../styles/chatHeader.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
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

  const handleChatNavigation = async () => {
    if (userRole) {
      navigate("/chat");
    } else {
      toast.info("Log in first to get started with chats");
    }
  };

  const userRole = localStorage.getItem("userRole");
  console.log("Role", userRole);
  return (
    <div className="header-div">
      <img className="logo" src={logo} alt="logo"></img>
      <nav>
        <ul className="navigation-list">
          <li className="list-item">
            <a className="link-item" href="/">
              HOME
            </a>
          </li>
          <li className="list-item">
            <a href="/futsal" className="link-item">
              FUTSALS
            </a>
          </li>
          <li className="list-item">
            <a className="link-item" onClick={handleChatNavigation}>
              CHAT
            </a>
          </li>
          {userRole ? (
            <li>
              <a className="log-out-link" onClick={handleSubmit}>
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

export default Header;
