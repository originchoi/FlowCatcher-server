const express = require("express");
const connectLoaders = require("./src/loaders/index");

const app = express();

(async () => {
  await connectLoaders(app);
})();

module.exports = app;
