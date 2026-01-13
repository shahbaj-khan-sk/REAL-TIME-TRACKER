const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

connectDB();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendLocation", async (data) => {
    await User.findOneAndUpdate(
      { socketId: socket.id },
      { ...data, socketId: socket.id },
      { upsert: true }
    );

    const users = await User.find();
    io.emit("receiveLocation", users);
  });

  socket.on("disconnect", async () => {
    await User.deleteOne({ socketId: socket.id });
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
