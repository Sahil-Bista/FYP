import { Server } from "socket.io";
import socketService from "../services/socketService.js";

const socketSetUp = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  socketService(io);
};

export default socketSetUp;
