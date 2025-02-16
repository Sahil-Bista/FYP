import { Router } from "express";
import {
  findConnectedUsers,
  findUsersMessages,
  searchChatMembers,
} from "../controllers/chatcontroller.js";
import authentication from "../middlewares/authentication.js";

export const chatRouter = Router();

chatRouter.get("/message/:userId", authentication, findUsersMessages);

chatRouter.get("/room/:myUserId", authentication, findConnectedUsers);

chatRouter.post("/search", authentication, searchChatMembers);