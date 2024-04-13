const jwt = require("jsonwebtoken");
const { verifyAccessToken, verifyRefreshToken } = require("../utils/jwtUtils");
const User = require("../models/User");

jest.mock("jsonwebtoken");
jest.mock("../models/User");

describe("Auth Function Tests", () => {
  describe("verifyAccessToken", () => {
    it("validates a valid access token", () => {
      const mockUser = { userId: "origin" };

      jwt.verify.mockImplementation(() => mockUser);

      const result = verifyAccessToken("valid.token");

      expect(result).toEqual({ isValidate: true, userId: mockUser.userId });
      expect(jwt.verify).toHaveBeenCalledWith(
        "valid.token",
        process.env.JWT_SECRET_KEY
      );
    });

    it("handles an error for a invalid access token", () => {
      const errorMessage = "invalid token";

      jwt.verify.mockImplementation(() => {
        throw new Error(errorMessage);
      });

      const result = verifyAccessToken("invalid.token");

      expect(result).toEqual({ isValidate: false, message: errorMessage });
    });
  });

  describe("verifyRefreshToken", () => {
    it("returns true for a valid refresh token and matching user", async () => {
      const userId = "origin";
      const token = "valid.refresh.token";

      User.findById.mockResolvedValue({ refreshToken: token });
      jwt.verify.mockImplementation(() => {});

      const isValid = await verifyRefreshToken(token, userId);

      expect(isValid).toBe(true);
      expect(User.findById).toHaveBeenCalledWith(userId);
      expect(jwt.verify).toHaveBeenCalledWith(
        token,
        process.env.JWT_SECRET_KEY
      );
    });

    it("returns false for a valid refresh token but non-matching user", async () => {
      const userId = "origin";
      const token = "valid.refresh.token";

      User.findById.mockResolvedValue({ refreshToken: "different.token" });

      const isValid = await verifyRefreshToken(token, userId);

      expect(isValid).toBe(false);
    });

    it("returns false for an invalid refresh token", async () => {
      const userId = "origin";
      const token = "invalid.refresh.token";

      User.findById.mockResolvedValue({ refreshToken: token });
      jwt.verify.mockImplementation(() => {
        throw new Error("invalid token");
      });

      const isValid = await verifyRefreshToken(token, userId);

      expect(isValid).toBe(false);
    });
  });
});
