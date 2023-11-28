const express = require("express");
const router = express.Router();
// const { refreshController } = require("../controllers/refreshController");
// const { isAuthenticated } = require("../middleware/auth");
const {
  createUser,
  loginUser,
  userProfile,
  logOut,
} = require("../controllers/user.controller");
const {
  insertParentDetails 
} = require("../controllers/parentRegisterCOntroller")
const {insertPetDetails} = require("../controllers/PetRegisterController")


// Routes created

router.post("/register", createUser);
router.post("/login", loginUser);
// router.post("/refresh", refreshController);
router.post("/parentdetails",insertParentDetails)
router.post("/petdetails",insertPetDetails )
// router.get('/me', isAuthenticated, userProfile)
// router.post('/logout', isAuthenticated, logOut)

module.exports = router;
