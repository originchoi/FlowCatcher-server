const index = require("../routes/index");
const authRouter = require("../routes/auth");

function connectRouters(app) {
  app.use("/", index);
  app.use("/auth", authRouter);
}

module.exports = connectRouters;
