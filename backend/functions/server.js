import express from "express";
import { Server } from "socket.io";
import http from "http";
import ACTION from "./src/actions.js";

const app = express();
const server = http.createServer(app);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

const io = new Server(server);
const userSocketMap = {}; // Store user socket ids

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on(ACTION.JOIN, ({ roomId, userName }) => {
    console.log("User joined", roomId, userName);
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

app.use("/.netlify/functions/server", router);
module.exports.handler = serverless(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
