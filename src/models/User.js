const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
    require: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
