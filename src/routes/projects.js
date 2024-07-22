const express = require("express");

const router = express.Router();
const dns = require("dns").promises;

const Project = require("../models/Project");
const Session = require("../models/Session");
const PageView = require("../models/PageView");

const { validateProjectName } = require("../utils/validationUtils");
const { generateScriptCode } = require("../utils/generateScriptCode");

async function checkDomainExistence(domain) {
  if (!domain) return false;

  try {
    await dns.lookup(domain);
    return true;
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      return false;
    }
    throw error;
  }
}

router.post("/:userid/projects", async function (req, res, next) {
  const { userid } = req.params;
  const { projectName } = req.body;
  const errorMessage = validateProjectName(projectName);

  if (errorMessage) {
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const newProject = new Project({
      userId: userid,
      projectName,
    });
    const savedProject = await newProject.save();
    const scriptCode = generateScriptCode({
      projectId: savedProject._id.toString(),
    });

    return res.status(201).json({
      project: savedProject,
      scriptCode,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/:userid/projects", async function (req, res, next) {
  try {
    const { userid } = req.params;
    const projects = await Project.find({ userId: userid });

    return res.status(200).json(projects);
  } catch (error) {
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

    return res.status(200).json({ message: "Project has been deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get("/domains/validate", async function (req, res) {
  const { domain } = req.query;
  const isValid = await checkDomainExistence(domain);

  res.json({ isValid });
});

module.exports = router;
