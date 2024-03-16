const index = require("../routes/index");
const authRouter = require("../routes/auth");
const projecstRouter = require("../routes/projects");

function connectRouters(app) {
  app.use("/", index);
  app.use("/auth", authRouter);
  app.use("/users", projecstRouter);
}

module.exports = connectRouters;
