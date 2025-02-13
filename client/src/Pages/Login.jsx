import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playerImage from "../assets/Fairplay.jpg";
import Logo from "../assets/logo.png";
import "../styles/login.css";
import { LoginForm } from "../components/loginform";

function Login() {
  return (
    <div className="main-div">
      <div className="player-image-container">
        <img src={playerImage} alt="Image Container" className="player-image" />
      </div>
      <div className="login-form">
        <ToastContainer />
        <div>
          <div className="logo-container">
            {" "}
            <img src={Logo} alt="logo" className="logo" />
          </div>
          <h1 className="futsal-name">
            <center>RIVALS FUTSAL</center>
          </h1>
          <h2 className="sign-in-text">
            <center>Sign In</center>
          </h2>
          <LoginForm />
          <span className="not-registered-text">
            Not registered yet?{" "}
            <Link className="link" to="/registerAs">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
