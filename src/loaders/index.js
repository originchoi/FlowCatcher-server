const connectExpress = require("./express");
const connectRouters = require("./routes");
const connectMongoose = require("./mongoose");
const connectErrorHandler = require("./errorHandler");

async function connectLoaders(app) {
  await connectMongoose();
  await connectExpress(app);

  connectRouters(app);

  await connectErrorHandler(app);
}

module.exports = connectLoaders;
