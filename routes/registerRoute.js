const express = require("express");
const router = express.Router();
const { generateOtp, verifyOtp, ResendOtp, } = require("../controllers/registerController");
const sendOtp = require("../utils/sendOtp")


router.post("/generateOtp", generateOtp);

router.post("/verifyOTP", verifyOtp);
router.post("/ResendOTP", ResendOtp);

module.exports = router;
