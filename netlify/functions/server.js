import express from "express";
import { Server } from "socket.io";
import serverless from "serverless-http";
import ACTION from "../../../src/actions.js";

const app = express();
const userSocketMap = {};

const handler = serverless(app);

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on(ACTION.JOIN, ({ roomId, userName }) => {
    userSocketMap[socket.id] = { userName, roomId };
    socket.join(roomId);
    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
      (id) => {
        return { socketId: id, userName: userSocketMap[id]?.userName };
      }
    );
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTION.JOINED, {
        socketId: socket.id,
        clients,
        userName,
      });
    });
  });
});

export { handler };