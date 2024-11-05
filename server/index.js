import http from "http";
import express from "express";
import mongoose, { Types } from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cors from "cors";
import authentication from './middlewares/authentication.js'
import cookieParser from "cookie-parser";
import { login, signup } from "./controllers/usercontroller.js";
import UserModel from "./model/User.js";
import ChatModel from "./model/Chat.js";
import EventEmitter from "events";

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

app.get('/secret',authentication,(req,res)=>{
  res.send("Secret page");
})

app.get('/all-users',authentication,async (req,res)=>{
  const users = await UserModel.find({_id: {$ne: new Types.ObjectId(req.userId)}})

  res.json(users)
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

app.get('/user/:userId',authentication,async (req,res)=>{
  const {userId} = req.params
  const user = await UserModel.findById(userId)
  res.json(user)
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

