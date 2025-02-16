import http from "http";
import express, { raw } from "express";
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
import { createFutsal, upload, getAllFutsals,editStatus, getVendorSpecificFutsal, deleteFutsal, getFutsalById, editFutsal, getPendingFutsals, validateFutsal } from "./controllers/futsalController.js";
import { createBooking, deleteBooking, getFilteredBooking, getFutsalSpecificBooking, getParticularBooking } from "./controllers/BookingController.js";
import {checkPaymentStatus, initiatePayment} from "./controllers/paymentController.js"
import futsalModel from "./model/Futsal.js";
import bookingModel from "./model/Booking.js";
import PaymentModel from "./model/payment.js";
import { findConnectedUsers, findUsersMessages, searchChatMembers } from "./controllers/chatcontroller.js";
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
  socket.on("message", ({room, msg, sender, reciever}) => {
    console.log({room,msg});
    socket.to(room).emit("message",msg);
    chatEvents.emit('saveMessage', {msg, sender, reciever,room})
  });

  socket.on("join-room",async (room,userId,myUserId)=>{
    socket.join(room);
    try{
      const existingRoom = await ChatModel.findOne({
        senderId: new Types.ObjectId(userId),
        receiverId: new Types.ObjectId(myUserId),
        roomId: room,
        type: "Room-joined message",
      });

      if(!existingRoom){
      await ChatModel.create({
        senderId :  new Types.ObjectId(userId),
        receiverId : new Types.ObjectId(myUserId),
        roomId: room,
        message: `You have matched with user: ${userId}`,
        type:"Room-joined message"
      })
    }
    }catch(error){
      console.log("Error creating message",error);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

chatEvents.on('saveMessage', async ({msg, sender, reciever,room}) => {
  await ChatModel.create({
    senderId: sender,
    receiverId: reciever,
    roomId: room,
    message: msg,
    type: "Normal Message"
  })
})


app.post("/login", login);

app.post("/register/:userRole", signup);


app.get('/all-users',authentication,async (req,res)=>{
  const users = await UserModel.find({_id: {$ne: new Types.ObjectId(req.userId)}})
  res.json(users)
})

app.get('/pending-futsals',authentication,getPendingFutsals)

app.get('/futsal/:user',authentication, getVendorSpecificFutsal)

app.get('/all-bookings/:futsalId',authentication,getFutsalSpecificBooking)

app.get('/booking/:bookingId', authentication, getParticularBooking)

app.post('/searchBookings/:futsalId',authentication, getFilteredBooking)

app.post("/validateFutsal/:futsalId", authentication,validateFutsal)

app.get('/message/:userId',authentication,findUsersMessages)

app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

app.get('/room/:myUserId', authentication, findConnectedUsers)

app.post("/chat/search",authentication, searchChatMembers);

app.get("/futsal", authentication, getAllFutsals)

app.get("/futsals/:futsalId", authentication, getFutsalById)

app.patch("/futsal/:futsalId", authentication, editFutsal)

app.delete("/deleteFutsal/:futsalId", authentication, deleteFutsal)

app.post("/addFutsal/:userId",upload.single("image"), createFutsal);

app.patch("/futsal/editStatus/:futsalId", authentication, editStatus)

app.post("/check-payment-status",checkPaymentStatus)

app.post("/esewa-payment/:bookingId",initiatePayment)

app.post("/book",authentication,createBooking);

app.post("/deleteBooking/:bookingId",authentication,deleteBooking);


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



