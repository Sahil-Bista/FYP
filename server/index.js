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
import { createFutsal, upload, getAllFutsals,editStatus, getVendorSpecificFutsal, deleteFutsal, getFutsalById, editFutsal } from "./controllers/futsalController.js";
import { createBooking, deleteBooking, getFilteredBooking, getParticularBooking } from "./controllers/BookingController.js";
import {checkPaymentStatus, initiatePayment} from "./controllers/paymentController.js"
import futsalModel from "./model/Futsal.js";
import bookingModel from "./model/Booking.js";
import PaymentModel from "./model/payment.js";
import { auth } from "google-auth-library";
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

app.get('/pending-futsals',authentication,async(req,res)=>{
  const futsals = await futsalModel.find({isValid:false});
  res.json(futsals);
})

app.get('/futsal/:user',authentication, getVendorSpecificFutsal)

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

app.get('/booking/:bookingId', authentication, getParticularBooking)

app.post('/searchBookings/:futsalId',authentication, getFilteredBooking)


app.post("/validateFutsal/:futsalId", authentication, async(req,res)=>{
  try{
    const {futsalId} = req.params;
    const futsal = await futsalModel.findOne({_id: futsalId});
    if(!futsal){
      return res.status(404).json({ error: "Futsal not found" });
    }
    const updatedFutsal = await futsalModel.findByIdAndUpdate(futsalId, {isValid :true}, {new:true});
    const vendor = futsal.vendorId;
    const user = await UserModel.findByIdAndUpdate({_id:vendor},{role:"VENDOR"},{new:true}); 
    return res.status(200).json({ msg: "Futsal updated successfully", updatedFutsal });
  }catch(error){
    console.log(error);
    return res.status(500),json({error});
  }
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

app.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
});

app.get('/room/:myUserId', async(req,res)=>{
  const {myUserId} = req.params;
  const userInvolvedMessages = await ChatModel.find({
    $and: [
      { 
        $or: [
          { senderId: new Types.ObjectId(myUserId) },
          { receiverId: new Types.ObjectId(myUserId) }
        ]
      },
      { type: "Room-joined message"}
    ]
  });
  const matchedUserIds = userInvolvedMessages.reduce((uniqueUserIds, message) => {
    const otherUserId = message.senderId.toString() === myUserId 
      ? message.receiverId.toString() 
      : message.senderId.toString();

    if (!uniqueUserIds.includes(otherUserId)) {
      uniqueUserIds.push(otherUserId);
    }

    return uniqueUserIds;
  }, []);

  // Fetch details of the matched users
  const matchedUsers = await UserModel.find({ _id: { $in: matchedUserIds } }).exec();

  // Respond with the list of matched users
  res.json(matchedUsers);
})

app.post("/chat/search",authentication, async (req, res) => {
  try {
    const myUserId = req.userId;
    const { searchQuery } = req.body;
    const user = searchQuery.trim();
    if (!user) {
      return res.status(400).json({ error: "User name is required" });
    }
    const foundUser = await UserModel.find({
      name: { $regex: new RegExp(user, "i") },
    });
    const foundUserIds = foundUser.map(user => user._id.toString());
    const userInvolvedMessages = await ChatModel.find({
      $and: [
        { 
          $or: [
            { senderId: new Types.ObjectId(myUserId) },
            { receiverId: new Types.ObjectId(myUserId) }
          ]
        },
        { type: "Room-joined message"}
      ]
    });
    const matchedUserIds = userInvolvedMessages.reduce((uniqueUserIds, message) => {
      const otherUserId = message.senderId.toString() === myUserId 
        ? message.receiverId.toString() 
        : message.senderId.toString();
  
      if (!uniqueUserIds.includes(otherUserId)) {
        uniqueUserIds.push(otherUserId);
      }
      return uniqueUserIds;
    }, []);
    const matchedUserIdsWithChat = foundUserIds
    .filter(userId => matchedUserIds.includes(userId))
    .map(userId => new Types.ObjectId(userId))
    console.log("matchedUserIdsWithChat",matchedUserIdsWithChat);
    const foundUsers = [];
    for (var mUsers of matchedUserIdsWithChat){
      const mUsersFull = await UserModel.find({_id:mUsers})
      for (var element of mUsersFull){
        foundUsers.push(element);
      }
    }
    console.log("foundUser", foundUsers)
    res.json(foundUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

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



