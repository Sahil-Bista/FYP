import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    team_captain_name : String,
    address : String,
    gender : String,
    email : String,
    contact_number : Number,
    game_date : Date,
    time : String,
    team_size : String,
    status : String
})

const bookingModel = mongoose.model("Booking",bookingSchema);

export default bookingModel;