const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/registerController");
const router = express.Router();

router.post("/generateOTP", generateOtp);
router.post("/verifyOTP", verifyOtp);

module.exports = router;
