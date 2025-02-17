import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  if (!token) {
    toast.error("Invalid payment token.");
    navigate("/home");
    return;
  }

  const handleFailure = () => {
    toast.error("Payment failed! Please try again.");
    navigate("/home");
  };

  useEffect(() => {
    handleFailure();
  }, []);

  return null;
};

export default PaymentFailure;
