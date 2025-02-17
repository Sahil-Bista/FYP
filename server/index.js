import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConnection.js";
import app from "./app.js";
import socketSetUp from "./config/socket.js";

dotenv.config();
const port = 3001;

connectDB();

const server = http.createServer(app);
socketSetUp(server);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});