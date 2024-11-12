import bookingModel from "../model/Booking.js";

const preBookingconfirmation = async(req,res)=>{
    try{
        const {team_captain_name ,address ,gender ,email,contact_number,game_date ,time ,team_size } = req.body;
        const existingBooking = await bookingModel.findOne({ game_date, time, status:"pending" });
        console.log(existingBooking);
        if (existingBooking) {
            return res.status(400).json({
                message: "This time slot is already booked. Please choose a different time."
            });
        }
        const booking = await bookingModel.create({
            team_captain_name : `${team_captain_name}`,
            address : `${address}`,
            gender : `${gender}`,
            email : `${email}`,
            contact_number : `${contact_number}`,
            game_date : `${game_date}`,
            time : `${time}`,
            team_size : `${team_size}`,
            status : "pending"
        });
        res.status(201).json({ message : "Booking created successfully", booking});
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error creating booking" })
    }
}

export  {preBookingconfirmation};