const express = require("express")
const router = express.Router()
const { likedPost, likedUser } = require("../controllers/likeController");


router.post("/likedPost",likedPost)
router.post("/likedUser", likedUser);


module.exports = router;