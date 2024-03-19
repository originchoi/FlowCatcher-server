/* eslint-disable consistent-return */

const Project = require("../models/Project");

async function verifyApiKey(req, res, next) {
  const { apiKey, userId } = req.body;

  try {
    const project = await Project.findOne({ userId, apiKey });

    if (!project) {
      return res.status(403).json({ message: "Invalid API key or userId" });
    }

    return next();
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: error.message });
  }
}

module.exports = verifyApiKey;
