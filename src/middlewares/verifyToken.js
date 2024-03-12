const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../utils/jwtUtils");

const { ONE_HOUR_IN_MILLISECONDS } = require("../constants/jwtConstants");

async function verifyToken(req, res, next) {
  try {
    const { accessToken } = req.cookies;

    if (accessToken) {
      const accessResult = verifyAccessToken(accessToken);
      const decodedToken = jwt.decode(accessToken);

      const user = await User.findById(decodedToken.userId).lean();

      const refreshResult = await verifyRefreshToken(
        user.refreshToken,
        decodedToken.userId,
      );

      if (!accessResult.type && accessResult.message === "jwt expired") {
        if (!refreshResult) {
          return next();
        }

        const newAccessToken = generateAccessToken(decodedToken.userId);

        res.status(201).cookie("accessToken", newAccessToken, {
          maxAge: ONE_HOUR_IN_MILLISECONDS,
          httpOnly: true,
        });

        req.user = decodedToken.userId;

        return next();
      }
      req.user = decodedToken.userId;

      return next();
    }

    return next();
  } catch (error) {
    error.message = "Unauthorized";
    error.status = 401;

    return next(error);
  }
}

module.exports = verifyToken;
