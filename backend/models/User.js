const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  socketId: String,
  lat: Number,
  lng: Number,
});

module.exports = mongoose.model("User", userSchema);
