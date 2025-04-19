import express from "express";
import { Server } from "socket.io";
import http from "http";
import ACTION from "./actions.js"; // Add .js extension

const app = express();
const server = http.createServer(app);

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

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome lyno code server Server");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
