const dotenv = require("dotenv")
const express = require("express");
const router = express.Router();
const multer = require("multer");
const PetSchema = require("../models/petmodel");
dotenv.config();
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
const {imageUpload, cloudinaryUpload } = require("../controllers/PetRegisterController")
const {getData} = require("../retrieveData/retrieve")

// Routes created
router.get("/retrieve/:id", getData)
router.post("/register", createUser);
router.post("/login", loginUser);
// router.post("/refresh", refreshController);
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails )

router.post("/upload", cloudinaryUpload.single("image_url"), imageUpload);
module.exports = router;
