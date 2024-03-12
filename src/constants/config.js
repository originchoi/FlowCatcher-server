require("dotenv").config();

const CONFIG = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = CONFIG;
