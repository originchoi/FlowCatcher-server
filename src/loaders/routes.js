const index = require("../routes/index");
const authRouter = require("../routes/auth");
const projecstRouter = require("../routes/projects");
const sessionRouter = require("../routes/sessions");

function connectRouters(app) {
  app.use("/", index);
  app.use("/auth", authRouter);
  app.use("/users", projecstRouter);
  app.use("/api", sessionRouter);
}

module.exports = connectRouters;
