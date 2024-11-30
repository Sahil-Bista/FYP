import mongoose,{Types} from "mongoose";
import futsalModel from "./Futsal.js";
import UserModel from "./User.js";

const bookingSchema = new mongoose.Schema({
    userId : {
        type : Types.ObjectId,
        ref : UserModel
    },
    futsalId :{
        type : Types.ObjectId,
        ref : futsalModel
    },
    first_name : String,
    last_name : String,
    address : String,
    gender : String,
    email : String,
    contact_Number : Number,
    game_date : Date,
    startTime : Date,
    endTime : Date,
    team_size : String,
    booking_status: String
})

const bookingModel = mongoose.model("booking",bookingSchema);

export default bookingModel;