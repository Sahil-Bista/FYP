import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import { generateUniqueId } from "../utils/utils";
import { useParams } from "react-router";

const Payment = () => {
  const { bookingId } = useParams();
  const amount = 500;
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/esewa-payment/${bookingId}`,
        {
          amount,
          productId: generateUniqueId(),
        }
      );
      console.log(bookingId);
      window.location.href = response.data.url;
      //Changes the url of the current browser window for effective navigarion
    } catch (error) {
      console.log("Error initiating payment:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handlePayment}>
        <h1>Payment Form</h1>
        <div>
          <input
            name="amount"
            type="number"
            value={amount}
            required
            placeholder="500"
            readOnly
          />
        </div>
        <button type="submit">Make payment</button>
      </form>
    </div>
  );
};

export default Payment;
