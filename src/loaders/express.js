const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const CONFIG = require("../constants/config");

async function connectExpress(app) {
  app.use(
    cors({
      origin: CONFIG.CLIENT_URL,
      credentials: true,
    }),
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
}

module.exports = connectExpress;
