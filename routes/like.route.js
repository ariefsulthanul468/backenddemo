const express = require("express")
const router = express.Router()
const {
  likedPost,
  likedUser,
  likedPostDetail,
} = require("../controllers/likeController");


router.post("/likedPost",likedPost);
router.get("/likedPostDetail", likedPostDetail);
router.post("/likedUser", likedUser);


module.exports = router;