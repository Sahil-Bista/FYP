import crypto from "crypto";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";
import PaymentModel from '../model/payment.js';
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
  
function safeStringify(obj) {
    const cache = new Set();
    const jsonString = JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return; // Discard circular reference
        }
        cache.add(value);
      }
      return value;
    });
    return jsonString;
  }
  // Learn this ******************************

  const initiatePayment = async (req, res) => {
    const { amount , productId} = req.body;
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ error: "Invalid bookingId format" });
    }

    const stringAmout = String(amount);
    let paymentData = {
        amount : stringAmout,
        tax_amount: "0",
        total_amount: stringAmout,
        transaction_uuid: productId,
        product_code: process.env.MERCHANT_ID,
        product_service_charge:"0",
        failure_url: process.env.FAILURE_URL,
        product_delivery_charge: "0",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: process.env.SUCCESS_URL,
    };

    const data = `total_amount=${paymentData.total_amount},transaction_uuid=${paymentData.transaction_uuid},product_code=${paymentData.product_code}`;
    const hash = CryptoJS.HmacSHA256(data, process.env.SECRET); 
    const signature = CryptoJS.enc.Base64.stringify(hash);
    paymentData = { ...paymentData, signature };
  
    try {
        const payment = await axios.post(process.env.ESEWAPAYMENT_URL,null,{
          params : paymentData,
        });
        const reqPayment = JSON.parse(safeStringify(payment));
        if (reqPayment.status === 200) {
           const Payment = await PaymentModel.create({
            booking_id : bookingId,
            product_id : productId,
            amount:amount,
           });

          return res.send({
            url: reqPayment.request.res.responseUrl,
          });
         

        }
    } catch (error) {
        console.error("Error initiating payment:",error);
      }
};


const checkPaymentStatus = async(req,res) =>{
  const {product_id} = req.body;
  try{
    const transaction = await PaymentModel.findOne({product_id});
    if(!transaction){
      return res.status(400).json({ message: "Transaction not found" });
    }
    const paymentData = {
      product_code : process.env.MERCHANT_ID,
      total_amount : transaction.amount,
      transaction_uuid : transaction.product_id,
    };
    const response = await axios.get(
      process.env.ESEWAPAYMENT_STATUS_CHECK_URL,
      {
        params : paymentData,
      }
    );
    const paymentStatusCheck = JSON.parse(safeStringify(response));
    if(paymentStatusCheck.status = 200){
      transaction.status = paymentStatusCheck.data.status;
      await transaction.save();
      res
        .status(200)
        .json({ message: "Transaction status updated successfully" });
    }
  }catch(error){
    console.error("Error updating transaction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export {checkPaymentStatus,initiatePayment}