const dotenv = require("dotenv")
const express = require("express");
const router = express.Router();
const multer = require("multer");
const PetSchema = require("../models/PetModel/petmodel")
dotenv.config();
const { refreshController } = require("../controllers/refreshController");
// const { isAuthenticated } = require("../middleware/auth");
const {
  createUser,
  loginUser,
  userProfile,
  logOut,
} = require("../controllers/user.controller");
const {
  insertParentDetails, cloudinaryParentUpload
} = require("../controllers/parentRegisterCOntroller")
const { imageUpload, cloudinaryUpload } = require("../controllers/PetRegisterController")
const { getData } = require("../retrieveData/retrieve")

// Routes created
router.get("/retrieve/:id", getData)
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshController);
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails )

router.post("/petUpload", cloudinaryUpload.single("image_url"), imageUpload);
router.post("/parentUpload", cloudinaryParentUpload.single("image_urls"), insertParentDetails);







const {createDummyData} = require("../DummyData/dummyPetDetails")

// Dummy details router
router.get("/dummypet", createDummyData)


module.exports = router;
