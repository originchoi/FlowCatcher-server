const express = require("express");

const router = express.Router();
const crypto = require("crypto");

const Project = require("../models/Project");
const Session = require("../models/Session");
const PageView = require("../models/PageView");

const { validateProjectName } = require("../utils/validationUtils");

router.post("/:userid/projects", async function (req, res, next) {
  const { userid } = req.params;
  const { projectName } = req.body;
  const errorMessage = validateProjectName(projectName);

  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const apiKey = crypto.randomUUID();

    const newProject = new Project({
      userId: userid,
      projectName,
      apiKey,
    });

    const savedProject = await newProject.save();

    return res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:userid/projects", async function (req, res, next) {
  try {
    const { userid } = req.params;
    const projects = await Project.find({ userId: userid });

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/:userid/projects/:projectid", async function (req, res, next) {
  try {
    const { projectid } = req.params;

    const sessions = await Session.find({ projectId: projectid });
    const sessionIds = sessions.map((session) => session._id);

    await PageView.deleteMany({ sessionId: { $in: sessionIds } });
    await Session.deleteMany({ _id: { $in: sessionIds } });
    await Project.findByIdAndDelete(projectid);

    return res.status(200).json({ message: "API key has been deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
