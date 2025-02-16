import { Types } from "mongoose";
import ChatModel from "../model/Chat.js";
import EventEmitter from "events";

const chatEvents = new EventEmitter();

const socketService = (io) =>{
     io.on("connection", (socket) => {
        console.log("a user connected");
    socket.on("message", ({ room, msg, sender, reciever }) => {
      console.log({ room, msg });
      socket.to(room).emit("message", msg);
      chatEvents.emit("saveMessage", { msg, sender, reciever, room });
    });
  
    socket.on("join-room", async (room, userId, myUserId) => {
      socket.join(room);
      try {
        const existingRoom = await ChatModel.findOne({
          senderId: new Types.ObjectId(userId),
          receiverId: new Types.ObjectId(myUserId),
          roomId: room,
          type: "Room-joined message",
        });
  
        if (!existingRoom) {
          await ChatModel.create({
            senderId: new Types.ObjectId(userId),
            receiverId: new Types.ObjectId(myUserId),
            roomId: room,
            message: `You have matched with user: ${userId}`,
            type: "Room-joined message",
          });
        }
      } catch (error) {
        console.log("Error creating message", error);
      }
    });
  
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

chatEvents.on("saveMessage", async ({ msg, sender, reciever, room }) => {
    try{
    await ChatModel.create({
      senderId: sender,
      receiverId: reciever,
      roomId: room,
      message: msg,
      type: "Normal Message",
    });
    console.log("message saved");
    }catch(error){
        console.log("Error saving message", error)
    }
  });

export default socketService;