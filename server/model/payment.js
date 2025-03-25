import mongoose, { Types } from "mongoose";
import bookingModel from "./Booking.js";

const paymentSchema = new mongoose.Schema({
    booking_id:{
        type : Types.ObjectId,
        ref : bookingModel,
        required : true,
    },
   product_id : {
    type : String,
    required : true,
   },
   amount : {
    type : Number,
    required : true,
   },
   status : {
    type : String,
    required: true,
    enum: ["PENDING", "COMPLETE", "FAILED", "REFUNDED"], 
    default: "PENDING",
   }
},
{
    timestamps : true,
}
)

const PaymentModel = mongoose.model("payment",paymentSchema);

export default PaymentModel;