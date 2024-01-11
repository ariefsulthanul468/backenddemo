require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { refreshController } = require("../controllers/refreshController");
const {
  getValue,
  filterByCity,
  updateLocation,
  userUpdate,
} = require("../controllers/user.controller");
const { insertParentDetails, cloudinaryParentUpload  } = require("../controllers/parentRegisterController")
const {
  PetRegisterImageUpload,
  UpdateReadyToMeet,
  petDetail,
  filterPet,
  imageGet,
} = require("../controllers/PetRegisterController");
const { getData } = require("../retrieveData/retrieve")
const { checkJwt } = require("../middleware/auth");
const {
  postControl,
  checkUserRegisterPet,
} = require("../controllers/postController");
const { upload, compressAndSave } = require("../utils/imageUpload");


// compressAndSave; 
// Routes created
router.get("/retrieve/:id", getData)
router.post("/refresh", refreshController);
router.post(
  "/petRegister",
  upload.array("image", 5),
  compressAndSave,
  PetRegisterImageUpload
);
router.post("/parentUpload",insertParentDetails);
router.post("/getData", getValue);
router.post("/userUpdate", userUpdate);
router.post("/locationUpdate",updateLocation);
router.post("/filterData", filterByCity);
router.post("/UpdateReadyToMet", UpdateReadyToMeet);
router.post("/postData", postControl);
router.post("/PetDetailCheck", checkUserRegisterPet);
router.get("/petData", petDetail);
router.post("/Pet/Preparance", filterPet);
router.get("/getImage/:petId", imageGet);



// checkJwt,
const { createDummyData } = require("../DummyData/dummyPetDetails")
// Dummy details router
router.get("/dummypet", createDummyData)


module.exports = router;


//  const { isAuthenticated } = require("../middleware/auth");
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails)