require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");




const PetSchema = require("../models/PetModel/petmodel")
const { refreshController } = require("../controllers/refreshController");
const {
  getValue,
  filterByCity,
  updateLocation,
  userUpdate,
} = require("../controllers/user.controller");
const { insertParentDetails, cloudinaryParentUpload  } = require("../controllers/ParentController/parentRegisterController")
const {
  PetRegisterImageUpload,
  cloudinaryPetUpload,
  UpdateReadyToMeet,
} = require("../controllers/PetController/PetRegisterController");
const { getData } = require("../retrieveData/retrieve")
const { checkJwt } = require("../middleware/auth");
const {
  postControl,
  checkUserRegisterPet,
} = require("../controllers/postController");




// Routes created
router.get("/retrieve/:id", getData)
router.post("/refresh", refreshController);
router.post(
  "/petUpload",
  cloudinaryPetUpload.array("image_url"),
  PetRegisterImageUpload
);
router.post("/parentUpload", cloudinaryParentUpload.single("image_urls"), insertParentDetails);
router.post("/getData", getValue);
router.post("/userUpdate", userUpdate);
router.post("/locationUpdate",updateLocation);
router.post("/filterData", filterByCity);
router.post("/UpdateReadyToMeet", UpdateReadyToMeet);
router.post("/postData", postControl);
router.post("/PetDetailCheck", checkUserRegisterPet);

// checkJwt,
const { createDummyData } = require("../DummyData/dummyPetDetails")
// Dummy details router
router.get("/dummypet", createDummyData)


module.exports = router;





//  const { isAuthenticated } = require("../middleware/auth");
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails)