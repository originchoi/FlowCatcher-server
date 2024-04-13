const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const CONFIG = require("../constants/config");

async function connectExpress(app) {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || /^https:\/\/.+/.test(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"), false);
        }
      },
      credentials: true,
    }),
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
}

module.exports = connectExpress;
