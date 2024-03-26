const express = require("express");

const router = express.Router();
const Session = require("../models/Session");

router.get("/:projectid/behavior", async function (req, res, next) {
  const { projectid } = req.params;

  try {
    const sessionsWithPageViews = await Session.find({ projectId: projectid })
      .populate("pageViews")
      .lean();

    res.json(sessionsWithPageViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
