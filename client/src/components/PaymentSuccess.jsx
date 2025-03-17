import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { tokendecode } from "../../utils/utils";
import { toast } from "react-toastify";

const Success = () => {
  const [futsalId, setFutsalId] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  if (!token) {
    toast.error("Invalid payment token.");
    navigate("/");
    return;
  }

  const decoded = tokendecode(token);

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/payment/check-payment-status",
        {
          product_id: decoded.transaction_uuid,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setFutsalId(response.data);
        toast.success("Payment successful! Your booking is confirmed");
        navigate(`/bookingList/${response.data}`);
      }
    } catch (error) {
      toast.error("Payment confirmation failed! Please try again");
      navigate(`/`);
    }
  };
  useEffect(() => {
    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Success;
