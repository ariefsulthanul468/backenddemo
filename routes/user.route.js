require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");




const PetSchema = require("../models/PetModel/petmodel")
const { refreshController } = require("../controllers/refreshController");
const { createUser, loginUser, userProfile, logOut, sample } = require("../controllers/user.controller");
const { insertParentDetails, cloudinaryParentUpload } = require("../controllers/ParentController/parentRegisterController")
const { imageUpload, cloudinaryUpload } = require("../controllers/PetController/PetRegisterController")
const { getData } = require("../retrieveData/retrieve")
const { checkJwt } = require("../middleware/auth");




// Routes created
router.get("/retrieve/:id", getData)
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/refresh", refreshController);
router.post("/petUpload", cloudinaryUpload.single("image_url"), imageUpload);
router.post("/parentUpload", cloudinaryParentUpload.single("image_urls"), insertParentDetails);
router.get("/get", checkJwt, sample);



const { createDummyData } = require("../DummyData/dummyPetDetails")
// Dummy details router
router.get("/dummypet", createDummyData)


module.exports = router;





//  const { isAuthenticated } = require("../middleware/auth");
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails )