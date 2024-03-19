const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema({
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  referrer: {
    type: String,
  },
});

module.exports = mongoose.model("PageView", pageViewSchema);
