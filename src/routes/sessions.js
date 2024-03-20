const express = require("express");

const router = express.Router();

const verifyApiKey = require("../middlewares/verifyApiKey");
const Session = require("../models/Session");

router.post("/sessions", verifyApiKey, async function (req, res, next) {
  const { projectId } = req.body;

  try {
    const newSession = new Session({ projectId });
    const savedSession = await newSession.save();

    res.status(201).json({ sessionId: savedSession._id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
