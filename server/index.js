import http from "http";
import express from "express";
import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { fileURLToPath } from 'url';
import path from "path";
import cors from "cors";
import authentication from './middlewares/authentication.js'
import cookieParser from "cookie-parser";
import { login, signup } from "./controllers/usercontroller.js";
import UserModel from "./model/User.js";
import ChatModel from "./model/Chat.js";
import EventEmitter from "events";
import { createFutsal, upload } from "./controllers/futsalController.js";
import { createBooking, deleteBooking } from "./controllers/BookingController.js";
import {checkPaymentStatus, initiatePayment} from "./controllers/paymentController.js"
import futsalModel from "./model/Futsal.js";
import bookingModel from "./model/Booking.js";
import PaymentModel from "./model/payment.js";
dotenv.config();


const port = 3001;


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // allow credentials
}));
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
//so it returns path like server/index.js
const __dirname = path.dirname(__filename);
// this returns only upto server and then it is attached to uploads

app.use('/uploads', express.static(path.join(__dirname,'uploads')));
//This basically helps in serving the file to the frontend

mongoose.connect("mongodb://127.0.0.1:27017/user");

const chatEvents = new EventEmitter()

io.on("connection", (socket) => {
  socket.on("message", ({room,msg, sender, reciever}) => {
    console.log({room,msg});
    socket.to(room).emit("message",msg);
    chatEvents.emit('saveMessage', {msg, sender, reciever})
  });

  socket.on("join-room",(room)=>{
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

chatEvents.on('saveMessage', async ({msg, sender, reciever}) => {
  await ChatModel.create({
    senderId: sender,
    receiverId: reciever,
    message: msg
  })
})


app.post("/login", login);

app.post("/register", signup);


app.get('/all-users',authentication,async (req,res)=>{
  const users = await UserModel.find({_id: {$ne: new Types.ObjectId(req.userId)}})
  res.json(users)
})

app.get('/all-futsals',authentication,async(req,res)=>{
  const futsals = await futsalModel.find({});
  res.json(futsals)
})

app.get('/all-bookings/:futsalId',authentication,async(req,res)=>{
  const logged_in_user_id = req.userId;
  const {futsalId} = req.params;
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
  return res.send(bookingList);
})


app.get('/message/:userId',authentication,async (req,res)=>{
  const {userId} = req.params
  const myId = req.userId
  const chats = await ChatModel.find({
    receiverId: {$in: [new Types.ObjectId(userId), new Types.ObjectId(myId)]},
    senderId: {$in: [new Types.ObjectId(userId), new Types.ObjectId(myId)]}
  })
  res.json(chats)
})

app.get('/user/:userId',async (req,res)=>{
  const {userId} = req.params
  const user = await UserModel.findById(userId)
  res.json(user)
})


app.post("/addFutsal",upload.single("image"), createFutsal);

app.post("/check-payment-status",checkPaymentStatus)

app.post("/esewa-payment/:bookingId",initiatePayment)

app.post("/book/:futsalId",authentication,createBooking);

app.post("/deleteBooking/:bookingId",authentication,deleteBooking);


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



