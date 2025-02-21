import "../styles/ErrorPage.css";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="main-background-div">
      <div className="black-blur-overlay"></div>

      <div className="page-not-found-content">
        <h1 className="page-not-found-heading">Page Not Found</h1>
        <p className="page-not-found-paragraph">
          Oops! The page you are looking for does not exist.
        </p>
        <NavLink className="back-to-home" to="/">
          Go Back Home
        </NavLink>
      </div>
    </div>
  );
}
