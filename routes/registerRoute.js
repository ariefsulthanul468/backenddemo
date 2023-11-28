const express = require("express");
const {
  generateOtp,
  verifyOtp,
  ResendOtp,
} = require("../controllers/registerController");
const router = express.Router();

router.post("/generateOTP", generateOtp);
router.post("/verifyOTP", verifyOtp);
router.post("/ResendOTP", ResendOtp);

module.exports = router;
