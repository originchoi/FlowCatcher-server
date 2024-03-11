const index = require("../routes/index");

function connectRouters(app) {
  app.use("/", index);
}

module.exports = connectRouters;
