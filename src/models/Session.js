const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  pageViews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PageView",
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
