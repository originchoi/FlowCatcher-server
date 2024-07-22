const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

async function connectExpress(app) {
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || /^(https?:\/\/).+$/.test(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"), false);
        }
      },
      credentials: true,
    }),
  );
  app.use("/track", express.static(path.join(__dirname, "../../track")));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
}

module.exports = connectExpress;
