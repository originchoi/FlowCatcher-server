const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");

const { ONE_HOUR_IN_MILLISECONDS } = require("../constants/jwtConstants");

exports.signIn = async function (req, res, next) {
  const { email, photoURL, displayName } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        photoURL,
        displayName,
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;

    await user.save();

    res.status(201).cookie("accessToken", accessToken, {
      maxAge: ONE_HOUR_IN_MILLISECONDS,
      httpOnly: true,
    });

    res.send({ result: "ok", message: "login successful!", user });
  } catch (error) {
    console.log(error);
  }
};

exports.signOut = async function (req, res, next) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.send({ result: "ok", message: "logout successful" });
};

exports.check = async function (req, res, next) {
  if (!req.user) {
    res.status(200).json({ result: false });
    return;
  }

  const user = await User.findById(req.user).lean();

  res.status(200).json({ result: true, user });
};
