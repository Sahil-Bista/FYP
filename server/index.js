import http from "http";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import authentication from "./middlewares/authentication.js";
import cookieParser from "cookie-parser";

import {
  checkPaymentStatus,
  initiatePayment,
} from "./controllers/paymentController.js";
import {
  findConnectedUsers,
  findUsersMessages,
  searchChatMembers,
} from "./controllers/chatcontroller.js";
import routesSetup from "./routes/index.js";

import socketService from "./services/socketService.js";

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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow credentials
  })
);
app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
//so it returns path like server/index.js
const __dirname = path.dirname(__filename);
// this returns only upto server and then it is attached to uploads

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//This basically helps in serving the file to the frontend

mongoose.connect("mongodb://127.0.0.1:27017/user");



routesSetup(app);

app.get("/message/:userId", authentication, findUsersMessages);

app.get("/room/:myUserId", authentication, findConnectedUsers);

app.post("/chat/search", authentication, searchChatMembers);

app.post("/check-payment-status", checkPaymentStatus);

app.post("/esewa-payment/:bookingId", initiatePayment);

socketService(io);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
