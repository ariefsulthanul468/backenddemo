const express = require("express");

const { refreshController } = require("../controllers/refreshController");
const { isAuthenticated } = require("../middleware/auth");
const {
  insertParentDetails 
} = require("../controllers/parentRegisterCOntroller")
const insertPetDetils = require("../controllers/PetRegisterController")
const router = express.Router();

// Routes created
console.log(insertPetDetils )

router.post("/parentdetails",insertParentDetails)
router.post("/petdetils", insertPetDetils)
// router.get('/me', isAuthenticated, userProfile)
// router.post('/logout', isAuthenticated, logOut)

module.exports = router;
