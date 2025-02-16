import axios from "axios";
import { generateUniqueId } from "../../utils/utils";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "../styles/PaymentForm.css";

export default function PaymentForm() {
  const { bookingId } = useParams();
  const [amount, setAmount] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/booking/${bookingId}`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data.booking.booking_amount);
        setAmount(result.data.booking.booking_amount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/api/payment/esewa-payment/${bookingId}`,
        {
          amount,
          productId: generateUniqueId(),
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.log("Error initiating payment:", error);
    }
  };
  return (
    <form className="entire-form">
      <h1 className="form-heading">PAYMENT FORM</h1>

      <div className="amount-input-div">
        <input
          className="amount-input"
          name="amount"
          type="number"
          value={amount}
          required
          placeholder="500"
          readOnly
        />
      </div>

      <button className="pay-button" onClick={handlePayment} type="submit">
        MAKE PAYMENT
      </button>
    </form>
  );
}
