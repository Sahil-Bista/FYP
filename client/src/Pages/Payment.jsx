import { useNavigate } from "react-router";
import "../styles/Payment.css";

import PaymentForm from "../components/PaymentForm";

const Payment = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/futsal");
  };

  return (
    <div className="main-page-div">
      <div className="blurred-black-overlay"></div>
      <div className="pop-up-like-div">
        <div className="image-div">
          <div className="image-div-overlay" />
        </div>
        <div className="right-form-div">
          <button className="crosss-button" onClick={handleClick}>
            &times;
          </button>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default Payment;
