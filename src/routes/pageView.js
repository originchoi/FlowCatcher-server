const express = require("express");

const router = express.Router();

const PageView = require("../models/PageView");
const Session = require("../models/Session");

router.post("/pageviews", async function (req, res, next) {
  try {
    const { sessionId, url, pageTitle, referrer } = req.body;
    const newPageView = new PageView({
      sessionId,
      url,
      pageTitle,
      referrer,
    });
    const savedPageView = await newPageView.save();

    await Session.findByIdAndUpdate(sessionId, { lastUpdated: new Date() });

    res.status(201).json(savedPageView);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
