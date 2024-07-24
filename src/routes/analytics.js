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

router.get("/:projectid/conversion", async function (req, res, next) {
  const { projectid } = req.params;
  const { goalPage } = req.query;

  try {
    const sessionsWithPageViews = await Session.find({ projectId: projectid })
      .populate("pageViews")
      .lean();

    const totalSessions = sessionsWithPageViews.length;
    const sessionsWithGoalPage = sessionsWithPageViews.filter((session) =>
      session.pageViews.some((pageView) => pageView.pageTitle === goalPage),
    );

    const conversionCount = sessionsWithGoalPage.length;
    const conversionRate = (conversionCount / totalSessions) * 100;

    res.json({ totalSessions, conversionCount, conversionRate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
