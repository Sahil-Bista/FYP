import bookingModel from "../model/Booking.js";
import PaymentModel from "../model/payment.js";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import UserModel from "../model/User.js";

const createBooking = async (req, res) => {
try{
  const { futsalId } = req.params;
  const {
    first_name,
    last_name,
    address,
    gender,
    email,
    contact_number,
    game_date,
    startTime,
    endTime,
    team_size,
  } = req.body;

  const logged_in_user_id = req.userId;

  const verified_user = await UserModel.findOne({
    _id : logged_in_user_id
  });
  const verified_email = verified_user.email;

  if(!verified_email){
    return res.status(201).json({ message: "Your email id seems incorrect"});
  }

  if(verified_email !== email){
    console.log("email not verified")
    return res.status(201).json({ message: "You can only book games with email Id used for logging in."});
  }

  const gameDate = new Date(game_date);
  gameDate.setUTCHours(0, 0, 0, 0);  // Set time to 00:00:00

  const starttimePart = startTime.split("T")[1].split("Z")[0]; // This gives you "06:15:03.123"
  const startTimeParts = starttimePart.split(":");
  const startTimeDate = new Date(Date.UTC(2004, 10, 6, parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0, 0));

  const endtimePart = endTime.split("T")[1].split("Z")[0];
  const endTimeParts = endtimePart.split(":");
  const endTimeDate = new Date(Date.UTC(2004, 10, 6, parseInt(endTimeParts[0]), parseInt(endTimeParts[1]), 0, 0));
  
  const alreadyBooked = await bookingModel.find({
    game_date: gameDate, 
    $or: [
      { 
        startTime: { $lt: endTimeDate }, 
        endTime: { $gt: startTimeDate }  
      },
      { 
        startTime: { $lte: startTimeDate }, 
        endTime: { $gte: endTimeDate } 
      }
    ]
  });
  
  if(alreadyBooked.length>0){
    console.log("alreadyBooked LOL")
    return res.status(201).json({ message: "The time is not available"});
  }

  const booking_status = team_size === "Full" ? "Payment pending" : "Waiting to match";
  const booking = await bookingModel.create({
    userId : `${logged_in_user_id}`,
    futsalId : `${futsalId}`,
    first_name : `${first_name}`,
    last_name: `${last_name}`,
    address : `${address}`,
    gender : `${gender}`,
    email : `${email}`,
    contact_Number : `${contact_number}`,
    game_date : `${gameDate}`,
    startTime : `${startTimeDate}`,
    endTime : `${endTimeDate}`,
    team_size :`${team_size}`,
    booking_status : `${booking_status}`
 });
 res.status(201).json({ message: "Booking created successfully", booking });
}catch(error){
    console.log(error);
    res.status(500).json({ message: "Error creating bookings" });
}
};

const confirmBooking = async(req,res)=>{
    try{
    const {booking_id} = req.params;
    const {amount,  team_code, user_id} = req.body;
    const transaction_code = uuidv4();
    const payment = await PaymentModel.create({
        user_id : `${user_id}`,
        booking_id : `${booking_id}`,
        amount : `${amount}`,
        transaction_code : `${transaction_code}`,
        team_code : `${team_code}`
    })

    const updatedBooking = await bookingModel.findByIdAndUpdate(
        booking_id,  
        { booking_status: "Booked" },  
        { new: true }  
      );
  
      if (!updatedBooking) {
        return res.status(404).json({
          message: "Booking not found.",
        });
      }
  
      res.status(201).json({
        message: "Payment successful and booking status updated.",
        payment,
        updatedBooking,
      });
    
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error making payment" });
    }
}

export {createBooking, confirmBooking};
