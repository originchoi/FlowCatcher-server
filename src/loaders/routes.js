const index = require("../routes/index");
const authRouter = require("../routes/auth");
const projecstRouter = require("../routes/projects");
const sessionRouter = require("../routes/sessions");
const pageViewsRouter = require("../routes/pageView");
const analyticsRouter = require("../routes/analytics");

function connectRouters(app) {
  app.use("/", index);
  app.use("/auth", authRouter);
  app.use("/users", projecstRouter);
  app.use("/api", sessionRouter);
  app.use("/api", pageViewsRouter);
  app.use("/analytics", analyticsRouter);
}

module.exports = connectRouters;
