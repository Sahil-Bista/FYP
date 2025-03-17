import { Types } from "mongoose";
import bookingModel from "../model/Booking.js";
import futsalModel from "../model/Futsal.js";
import PaymentModel from "../model/payment.js";
import UserModel from "../model/User.js";

const createBooking = async (req, res) => {
  try {
    const {
      futsalId,
      first_name,
      last_name,
      address,
      email,
      contact_number,
      game_date,
      startTime,
      endTime,
      team_size,
    } = req.body;

    const logged_in_user_id = req.userId;
    if(!logged_in_user_id){
      res.status(404).json({message:"User unauthorized"})
    }
    const contact_Number_Validity = /^98\d{8}$/.test(contact_number);
    if(!contact_Number_Validity){
      console.log("Must start with 98 and be upto 10 digits");
      return res.status(400).json({message:"Invalid contact number"});
    }

    const verified_user = await UserModel.findOne({
      _id: logged_in_user_id,
    });
    const verified_email = verified_user.email;

    if (!verified_email) {
      return res.status(400).json({ message: "Your email id seems incorrect" });
    }

    if (verified_email !== email) {
      console.log("email not verified");
      return res
        .status(400)
        .json({
          message: "You can only book games with email Id used for logging in.",
        });
    }

    const gameDate = new Date(game_date);
    gameDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
    gameDate.setDate(gameDate.getDate() + 1); // This was done because while logging the date was seen one day earlier than the input date

    const starttimePart = startTime.split("T")[1].split("Z")[0]; // This gives you "06:00:00.000"
    const startTimeParts = starttimePart.split(":");
    const endtimePart = endTime.split("T")[1].split("Z")[0];
    const endTimeParts = endtimePart.split(":");
    //Subtracted 12 hours 30 minutes to be able to operate on the exact input time as the time it was showing while logging was 12 hours 30 minutes ahead of the input time
    const startTimeDate = new Date(
      2004,
      10,
      6,
      parseInt(startTimeParts[0]) - 12,
      parseInt(startTimeParts[1]) - 30,
      0,
      0
    );
    const endTimeDate = new Date(
      2004,
      10,
      6,
      parseInt(endTimeParts[0] - 12),
      parseInt(endTimeParts[1] - 30),
      0,
      0
    );

    const gameDuration = endTimeDate - startTimeDate;
    if(gameDuration < 3600000){
      console.log("Less than 1 hour cannot be the game time")
      return res.status(400).json({message : "Game duration cannot be less than an hour"})
    }

    if (team_size === "Half-full" && gameDuration > 3600000) {
      return res
        .status(400)
        .json({
          message:
            "You cannot book for more than an hour with half-full team size",
        });
    }

    const amount = gameDuration * (500 / 3600000);

    const gameStartTimeDate = new Date(
      gameDate.getFullYear(),
      gameDate.getMonth(),
      gameDate.getDate(),
      parseInt(startTimeParts[0] - 12),
      parseInt(startTimeParts[1] - 30),
      0,
      0
    );

    const currentDate = new Date();

    const finalLocalCurrentDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      parseInt(currentDate.getHours() + 5),
      parseInt(currentDate.getMinutes() + 45),
      0,
      0
    );

    const timeGap = gameStartTimeDate - finalLocalCurrentDateTime;
   
    if (timeGap <= 3600000) {
      console.log(
        "The booking time must be at least an hour away from now"
      );
      return res
        .status(400)
        .json({
          message:
            "The current time must be at least an hour before the game start time.",
        });
    }

    const alreadyBooked = await bookingModel.findOne({
      futsalId: futsalId,
      game_date: gameDate,
      booking_status : "Booked",
      $or: [
        {
          startTime: { $lt: endTimeDate },
          endTime: { $gt: startTimeDate },
        },
        {
          startTime: { $lte: startTimeDate },
          endTime: { $gte: endTimeDate },
        },
      ],
    });

    console.log("ok",alreadyBooked);

    if (alreadyBooked) {
      console.log("Hello");
        return res.status(400).json({ message: "This time slot is already booked" });
    }
    const booking_status =
      team_size === "Full" ? "Payment pending" : "Waiting to match";
    const booking = await bookingModel.create({
      userId: `${logged_in_user_id}`,
      futsalId: `${futsalId}`,
      first_name: `${first_name}`,
      last_name: `${last_name}`,
      address: `${address}`,
      email: `${email}`,
      contact_Number: `${contact_number}`,
      game_date: `${gameDate}`,
      startTime: `${startTimeDate}`,
      endTime: `${endTimeDate}`,
      team_size: `${team_size}`,
      booking_status: `${booking_status}`,
      booking_amount: `${amount}`,
    });
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating bookings" });
  }
};

const editBooking = async (req, res) => {
  try{
  const userId = req.userId;
  console.log("hello");
  const {bookingId} = req.params;
  const {first_name, last_name, contact_number,game_date, startTime, endTime} = req.body.updatedData;
  const {futsalId} = req.body;

  const booking = await bookingModel.findOne({_id:bookingId});
  if(!booking){
    return res.status(400).json({message:"Booking bot found"});
  }
  const bookerId = booking.userId;

  if(bookerId.toString() !== userId){
    return res.status(401).json({message:"User not authorized for this process"});
  }

  const gameDate = new Date(game_date);
  gameDate.setHours(0, 0, 0, 0); // Set time to 00:00:00
  gameDate.setDate(gameDate.getDate() + 1); // This was done because while logging the date was seen one day earlier than the input date

  const starttimePart = startTime.split("T")[1].split("Z")[0]; // This gives you "06:00:00.000"
  const startTimeParts = starttimePart.split(":");
  const endtimePart = endTime.split("T")[1].split("Z")[0];
  const endTimeParts = endtimePart.split(":");
  //Subtracted 12 hours 30 minutes to be able to operate on the exact input time as the time it was showing while logging was 12 hours 30 minutes ahead of the input time
  const startTimeDate = new Date(
    2004,
    10,
    6,
    parseInt(startTimeParts[0]-12) ,
    parseInt(startTimeParts[1]-30) ,
    0,
    0
  );
  const endTimeDate = new Date(
    2004,
    10,
    6,
    parseInt(endTimeParts[0] -12),
    parseInt(endTimeParts[1]-30),
    0,
    0
  );

  const gameDuration = endTimeDate - startTimeDate;
  if(gameDuration < 3600000){
    console.log("Less than 1 hour cannot be the game time")
    return res.status(400).json({message : "Game duration cannot be less than an hour"})
  }

  const gameStartTimeDate = new Date(
    gameDate.getFullYear(),
    gameDate.getMonth(),
    gameDate.getDate(),
    parseInt(startTimeParts[0] - 12),
    parseInt(startTimeParts[1] - 30),
    0,
    0
  );

  const currentDate = new Date();

  const finalLocalCurrentDateTime = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    parseInt(currentDate.getHours() + 5),
    parseInt(currentDate.getMinutes() + 45),
    0,
    0
  );

  const timeGap = gameStartTimeDate - finalLocalCurrentDateTime;
 
  if (timeGap <= 3600000) {
    console.log(
      "The booking time must be at least an hour away from now"
    );
    return res
      .status(400)
      .json({
        message:
          "The current time must be at least an hour before the game start time.",
    });
  }

  const alreadyBooked = await bookingModel.findOne({
    futsalId: futsalId,
    game_date: gameDate,
    booking_status : "Booked",
    $or: [
      {
        startTime: { $lt: endTimeDate },
        endTime: { $gt: startTimeDate },
      },
      {
        startTime: { $lte: startTimeDate },
        endTime: { $gte: endTimeDate },
      },
    ],
  });

  if (alreadyBooked) {
    console.log("Hello");
      return res.status(400).json({ message: "This time slot is already booked" });
  }

  const finalUpdatedData = {
    first_name: first_name,
      last_name: last_name,
      contact_number: contact_number,
      game_date: gameDate,
      startTime: startTimeDate,
      endTime: endTimeDate,
  }
  const updatedBooking = await bookingModel.findByIdAndUpdate(
    bookingId,
    finalUpdatedData,
    {
      new: true,
    }
  );

  if (!updatedBooking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  res
    .status(200)
    .json({ message: "Futsal updated successfully", booking: updatedBooking , timeGap});
} catch (error) {
  console.log(error);
  res.status(500).json({ message: "Internal server error" });
}
};

const deleteBooking = async (req, res) => {
  try {
    const logged_in_user_id = req.userId;
    const logged_in_user_role = req.userRole;
    console.log(logged_in_user_role);
    const { bookingId } = req.params;
    const booking = await bookingModel.findOne({ _id: bookingId });
    const booking_email = booking?.email || null;
    const booker_user = await UserModel.findOne({ email: booking_email });
    const booker_user_id = booker_user?._id || null;
    const futsal_id = booking?.futsalId || null;
    const bookedfutsal = await futsalModel.findOne({_id:futsal_id});
    const vendorId = bookedfutsal?.vendorId;
    if (logged_in_user_id == booker_user_id || logged_in_user_id == vendorId) {
      const deleted_bookig = await bookingModel.deleteOne({ _id: bookingId });
      console.log(deleted_bookig);
      return res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      return res.status(403).json({
        message: "You are not authorized to delete this booking",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting bookings" });
  }
};

const getParticularBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingModel.findOne({ _id: bookingId });
    if (!booking) {
      return res.status(401).json({ msg: "Booking not found" });
    }
    return res.status(200).json({msg:"Booking", booking})
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating bookings" });
  }
};

const getFilteredBooking = async(req,res)=>{
  try{
    const {futsalId} = req.params;
    const logged_in_user_id = req.userId;
    if(Object.keys(req.query).length === 0){
      const futsal = await futsalModel.findOne({_id:futsalId});
      const futsal_id = futsal?._id || null;
      const bookings = await bookingModel.find({futsalId : futsal_id});
      const bookingList = [];
      for(const booking of bookings){
        const booking_payment = await PaymentModel.findOne({booking_id : booking._id});
        const booking_payment_status = booking_payment?.status || null;
        if(booking_payment_status === "COMPLETE" || (booking.team_size==="Half-full" && booking.userId != logged_in_user_id)){
          bookingList.push(booking);
        }
      }
      return res.status(200).send(bookingList);
    }else{
      let query = { futsalId }
      console.log("query",query);
      if (req.query.gameDate) {
        const gameDate = new Date(req.query.gameDate);
        gameDate.setHours(0, 0, 0, 0); 
        gameDate.setDate(gameDate.getDate() + 1); 
        query.game_date = gameDate;
        console.log(gameDate);
      }
      if (req.query.startTime) 
        {const starttimePart = req.query.startTime.split(" ")[4];  
        const startTimeParts = starttimePart.split(":");
        const startTimeDate = new Date(
          Date.UTC(
          //utc MA LAGNA PARYO ETAA CHAI
          2004,
          10,
          5,
          parseInt(startTimeParts[0]), //- 12
          parseInt(startTimeParts[1]), // - 30,
          0,
          0
          )
        );
        query.startTime = { $gte: new Date(startTimeDate) };
      }
      if (req.query.endTime)
        {
        const endtimePart = req.query.endTime.split(" ")[4]; // This gives you "06:00:00.000"
        const endTimeParts = endtimePart.split(":");
        console.log("endTmeParts",endTimeParts)
        const endTimeDate = new Date(
          Date.UTC(
          2004,
          10,
          5,
          parseInt(endTimeParts[0]) , //-12
          parseInt(endTimeParts[1]) , //-30
          0,
          0
          )
        );
        // console.log(endTimeDate);
        query.endTime = { $lte: endTimeDate }; };
      if (req.query.status) query.booking_status = req.query.status;
      console.log("final",query);
       const bookingList = await bookingModel.find(query);
      //  console.log(bookingList);
      res.status(200).send(bookingList);
    }
  }catch(error){
    console.log("Error ir fetching bookings",error)
    res.status(500).send(error);
  }
}

const getFutsalSpecificBooking = async (req,res) =>{
  try{
  const logged_in_user_id = req.userId;
  const {futsalId} = req.params;
  const futsal = await futsalModel.findOne({_id:futsalId});
  const futsal_id = futsal?._id || null;
  const bookings = await bookingModel.find({futsalId : futsal_id});
  const bookingList = [];
  for(const booking of bookings){
    const booking_status = booking?.booking_status || null;
    if(booking_status === "Booked" || (booking.team_size==="Half-full" && booking.userId != logged_in_user_id)){
      bookingList.push(booking);
    }
  }
  return res.send(bookingList);
}catch{
  console.log("Error ir fetching bookings",error)
  res.status(500).send(error);
}
}

const getVendorSpecificFutsalBookings = async(req,res)=>{
  try{
    const {userId} = req.params;
    console.log(userId,"vendor");
    const vendorFutsal = await futsalModel.findOne({vendorId:userId});
    if(!vendorFutsal){
      return res.status(401).json({msg:"Your do not have a futsal registered to edit thier bookings"});
    }
    const futsalId = vendorFutsal._id;
    console.log("futsal",futsalId);
    const bookings = await bookingModel.find({
      futsalId: futsalId,
      booking_status: { $in: ["Booked", "Waiting to match"] },
    });
    return res.status(200).send(bookings);
  }catch(err){
    console.log("Error ir fetching bookings",err)
    res.status(500).send(err);
  }
}

export {getVendorSpecificFutsalBookings, getFutsalSpecificBooking,createBooking, deleteBooking, getParticularBooking, editBooking,getFilteredBooking };


