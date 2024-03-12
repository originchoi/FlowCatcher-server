const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");

router.get("/check", verifyToken, authController.check);
router.post("/signIn", authController.signIn);
router.get("/signOut", authController.signOut);

module.exports = router;
