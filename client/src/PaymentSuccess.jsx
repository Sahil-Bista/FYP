import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { tokendecode } from "../utils/utils";

const Success = () => {
  const [futsalId, setFutsalId] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  const decoded = tokendecode(token);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/check-payment-status",
        {
          product_id: decoded.transaction_uuid,
        }
      );
      if (response.status === 200) {
        setFutsalId(response.data);
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };
  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !isSuccess) return <>Loading...</>;
  if (!isLoading && !isSuccess)
    return (
      <>
        <h1>Oops!..Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <button onClick={() => navigate("/home")} className="go-home-button">
          Go to Homepage
        </button>
      </>
    );

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your booking has been completed.</p>
      <button
        onClick={() => navigate(`/bookingList/${futsalId}`)}
        className="go-home-button"
      >
        View List
      </button>
    </div>
  );
};

export default Success;
