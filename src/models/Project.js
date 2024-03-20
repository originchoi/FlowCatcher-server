const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectName: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^[A-Za-z0-9가-힣]+$/.test(v);
      },
      message: "영문자(대소문자), 숫자, 한글만 사용할 수 있습니다.",
    },
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
