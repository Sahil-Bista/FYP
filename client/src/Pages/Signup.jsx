import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playerImage from "../assets/Fairplay.jpg";
import Logo from "../assets/logo.png";
import "../styles/signup.css";
import { SignUp } from "../components/signupform";

function Signup() {
  return (
    <div className="main-div">
      <div className="player-image-container">
        <img src={playerImage} alt="Image Container" className="player-image" />
      </div>
      <div className="signup-form">
        <ToastContainer />
        <div>
          <div className="logo-container">
            <img src={Logo} alt="logo" className="logos" />
          </div>
          <h1 className="futsals-name">
            <center>RIVALS FUTSAL</center>
          </h1>
          <h2 className="sign-up-text">
            <center>Sign Up</center>
          </h2>
          <SignUp />
          <span
            style={{
              color: "white",
              fontSize: "12px",
              paddingLeft: "4px",
              paddingBottom: "30px",
            }}
          >
            Already have an account?{" "}
            <Link style={{ color: "white" }} to="/login">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
