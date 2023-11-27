const express = require("express");
const {
  createUser,
  loginUser,
  userProfile,
  logOut,
} = require("../controllers/user.controller");
const { refreshController } = require("../controllers/refreshController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

// Routes created

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshController);
// router.get('/me', isAuthenticated, userProfile)
// router.post('/logout', isAuthenticated, logOut)

module.exports = router;
