const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const CONFIG = require("../constants/config");

async function connectExpress(app) {
  app.use(
    cors({
      origin: [CONFIG.CLIENT_URL, CONFIG.TEST_URL_1, CONFIG.TEST_URL_2],
      credentials: true,
    }),
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
}

module.exports = connectExpress;
