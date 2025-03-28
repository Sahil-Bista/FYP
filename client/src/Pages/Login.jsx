import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import playerImage from "../assets/Fairplay.jpg";
import Logo from "../assets/logo.png";
import "../styles/login.css";
import { LoginForm } from "../components/loginform";
import { ForgetPassword } from "../components/ForgetPassword";

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
            <img src={Logo} alt="logo" className="logos" />
          </div>
          <h1 className="futsals-name">
            <center>RIVALS FUTSAL</center>
          </h1>
          <h2 className="sign-in-text">
            <center>Sign In</center>
          </h2>
          <LoginForm />
          <div className="login-links">
            <span className="not-registered-text">
              <ForgetPassword />
            </span>
            <span className="not-registered-text">
              <Link className="register-link" to="/register">
                Register Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
