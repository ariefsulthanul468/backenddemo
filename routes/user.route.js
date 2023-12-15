require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");




const PetSchema = require("../models/PetModel/petmodel")
const { refreshController } = require("../controllers/refreshController");
const {
  createUser,
  loginUser,
  userProfile,
  logOut,
  getValue,
  sample,
  filterByCity,
} = require("../controllers/user.controller");
const { insertParentDetails, cloudinaryParentUpload  } = require("../controllers/ParentController/parentRegisterController")
const {
  PetRegisterImageUpload,
  cloudinaryPetUpload,
} = require("../controllers/PetController/PetRegisterController");
const { getData } = require("../retrieveData/retrieve")
const { checkJwt } = require("../middleware/auth");




// Routes created
router.get("/retrieve/:id", getData)
router.post("/refresh", refreshController);
router.post(
  "/petUpload",
  cloudinaryPetUpload.single("image_url"),
  PetRegisterImageUpload
);
router.post("/parentUpload", cloudinaryParentUpload.single("image_urls"), insertParentDetails);
router.post("/getData", getValue);
// router.post("/userUpdate", userUpdate);
router.post("/filterData", filterByCity);



// checkJwt,
const { createDummyData } = require("../DummyData/dummyPetDetails")
// Dummy details router
router.get("/dummypet", createDummyData)


module.exports = router;





//  const { isAuthenticated } = require("../middleware/auth");
// router.post("/parentdetails",insertParentDetails)
// router.post("/petdetails",insertPetDetails)