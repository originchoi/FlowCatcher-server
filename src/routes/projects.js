const express = require("express");
const crypto = require("crypto");
const Project = require("../models/Project");

const router = express.Router();

router.post("/:userid/projects", async function (req, res, next) {
  try {
    const { userid } = req.params;
    const { projectName } = req.body;
    const apiKey = crypto.randomUUID();

    const newProject = new Project({
      userId: userid,
      projectName,
      apiKey,
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/:userid/projects", async function (req, res, next) {
  try {
    const { userid } = req.params;
    const projects = await Project.find({ userId: userid });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:userid/projects/:projectid", async function (req, res, next) {
  try {
    const { projectid } = req.params;

    await Project.findByIdAndDelete(projectid);

    res.status(200).json({ message: "API key has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
